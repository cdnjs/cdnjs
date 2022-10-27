let active;
let registry = new Map(), escape = 'undefined' != typeof CSS && CSS.escape || // Simplified: escaping only special characters
// Needed for NodeJS and Edge <79 (https://caniuse.com/mdn-api_css_escape)
((className)=>className.// Simplifed escape testing only for chars that we know happen to be in tailwind directives
    replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, '\\$&').// If the character is the first character and is in the range [0-9] (2xl, ...)
    // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
    replace(/^\d/, '\\3$& '));
// Based on https://stackoverflow.com/a/52171480
function hash(value) {
    // eslint-disable-next-line no-var
    for(var h = 9, index = value.length; index--;)h = Math.imul(h ^ value.charCodeAt(index), 0x5f356495);
    return '#' + ((h ^ h >>> 9) >>> 0).toString(36);
}
function mql(screen, prefix = '@media ') {
    return prefix + asArray(screen).map((screen)=>{
        return 'string' == typeof screen && (screen = {
            min: screen
        }), screen.raw || Object.keys(screen).map((feature)=>`(${feature}-width:${screen[feature]})`).join(' and ');
    }).join(',');
}
function asArray(value = []) {
    return Array.isArray(value) ? value : null == value ? [] : [
        value
    ];
}
function identity(value) {
    return value;
}
function noop() {}
// no-op
function toClassName(rule) {
    return [
        ...rule.v,
        (rule.i ? '!' : '') + rule.n
    ].join(':');
}
// Based on https://github.com/kripod/otion
// License MIT
// export const enum Shifts {
//   darkMode = 30,
//   layer = 27,
//   screens = 26,
//   responsive = 22,
//   atRules = 18,
//   variants = 0,
// }
let Layer = {
    /**
   * 1. `default` (public)
   */ d: /* efaults */ 0,
    /* Shifts.layer */ /**
   * 2. `base` (public) —for things like reset rules or default styles applied to plain HTML elements.
   */ b: /* ase */ 134217728,
    /* Shifts.layer */ /**
   * 3. `components` (public, used by `style()`) — is for class-based styles that you want to be able to override with utilities.
   */ c: /* omponents */ 268435456,
    /* Shifts.layer */ // reserved for style():
    // - props: 0b011
    // - when: 0b100
    /**
   * 6. `shortcuts` (public, used by `apply()`) — `~(...)`
   */ s: /* hortcuts */ 671088640,
    /* Shifts.layer */ /**
   * 6. `utilities` (public) — for small, single-purpose classes
   */ u: /* tilities */ 805306368,
    /* Shifts.layer */ /**
   * 7. `overrides` (public, used by `css()`)
   */ o: /* verrides */ 939524096
};
/*
To set a bit: n |= mask;
To clear a bit: n &= ~mask;
To test if a bit is set: (n & mask)

Bit shifts for the primary bits:

| bits | trait                                                   | shift |
| ---- | ------------------------------------------------------- | ----- |
| 1    | dark mode                                               | 30    |
| 3    | layer: preflight, global, components, utilities, css    | 27    |
| 1    | screens: is this a responsive variation of a rule       | 26    |
| 4    | responsive based on min-width, max-width or width       | 22    |
| 4    | at-rules                                                | 18    |
| 18   | pseudo and group variants                               | 0     |

Layer: 0 - 7: 3 bits
  - defaults: 0 << 27
  - base: 1 << 27
  - components: 2 << 27
  - variants: 3 << 27
  - joints: 4 << 27
  - shortcuts: 5 << 27
  - utilities: 6 << 27
  - overrides: 7 << 27

These are calculated by serialize and added afterwards:

| bits | trait                               |
| ---- | ----------------------------------- |
| 4    | number of selectors (descending)    |
| 4    | number of declarations (descending) |
| 4    | greatest precedence of properties   |

These are added by shifting the primary bits using multiplication as js only
supports bit shift up to 32 bits.
*/ // Colon and dash count of string (ascending)
function seperatorPrecedence(string) {
    return string.match(/[-=:;]/g)?.length || 0;
}
function atRulePrecedence(css) {
    // 0=none, 1=sm, 2=md, 3=lg, 4=xl, 5=2xl, 6=??, 7=??
    // 0 - 15: 4 bits (max 150rem or 2250px)
    //  576px -> 3
    // 1536px -> 10
    //  36rem -> 3
    //  96rem -> 9
    return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(css) ? +RegExp.$1 / (RegExp.$2 ? 15 : 1) / 10 : 0, 15) << 22 | /* Shifts.responsive */ Math.min(seperatorPrecedence(css), 15) << 18;
}
/* Shifts.atRules */ // Pesudo variant presedence
// Chars 3 - 8: Uniquely identifies a pseudo selector
// represented as a bit set for each relevant value
// 18 bits: one for each variant plus one for unknown variants
//
// ':group-*' variants are normalized to their native pseudo class (':group-hover' -> ':hover')
// as they already have a higher selector presedence due to the add '.group' ('.group:hover .group-hover:...')
// Sources:
// - https://bitsofco.de/when-do-the-hover-focus-and-active-pseudo-classes-apply/#orderofstyleshoverthenfocusthenactive
// - https://developer.mozilla.org/docs/Web/CSS/:active#Active_links
// - https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L931
let PRECEDENCES_BY_PSEUDO_CLASS = [
    /* fi */ 'rst-c',
    /* hild: 0 */ /* la */ 'st-ch',
    /* ild: 1 */ // even and odd use: nth-child
    /* nt */ 'h-chi',
    /* ld: 2 */ /* an */ 'y-lin',
    /* k: 3 */ /* li */ 'nk',
    /* : 4 */ /* vi */ 'sited',
    /* : 5 */ /* ch */ 'ecked',
    /* : 6 */ /* em */ 'pty',
    /* : 7 */ /* re */ 'ad-on',
    /* ly: 8 */ /* fo */ 'cus-w',
    /* ithin : 9 */ /* ho */ 'ver',
    /* : 10 */ /* fo */ 'cus',
    /* : 11 */ /* fo */ 'cus-v',
    /* isible : 12 */ /* ac */ 'tive',
    /* : 13 */ /* di */ 'sable',
    /* d : 14 */ /* op */ 'tiona',
    /* l: 15 */ /* re */ 'quire'
];
/** The name to use for `&` expansion in selectors. Maybe empty for at-rules like `@import`, `@font-face`, `@media`, ... */ /** The calculated precedence taking all variants into account. */ /** The rulesets (selectors and at-rules). expanded variants `@media ...`, `@supports ...`, `&:focus`, `.dark &` */ /** Is this rule `!important` eg something like `!underline` or `!bg-red-500` or `!red-500` */ function convert({ n: name , i: important , v: variants = []  }, context, precedence, conditions) {
    name && (name = toClassName({
        n: name,
        i: important,
        v: variants
    }));
    conditions = [
        ...asArray(conditions)
    ];
    for (let variant of variants){
        let screen = context.theme('screens', variant);
        for (let condition of asArray(screen && mql(screen) || context.v(variant))){
            var /* d: 16 */ selector;
            conditions.push(condition);
            precedence |= screen ? 67108864 | /* Shifts.screens */ atRulePrecedence(condition) : 'dark' == variant ? 1073741824 : /* Shifts.darkMode */ '@' == condition[0] ? atRulePrecedence(condition) : (selector = condition, // use first found pseudo-class
            1 << ~(/:([a-z-]+)/.test(selector) && ~PRECEDENCES_BY_PSEUDO_CLASS.indexOf(RegExp.$1.slice(2, 7)) || -18));
        }
    }
    return {
        n: name,
        p: precedence,
        r: conditions,
        i: important
    };
}
function stringify$1(rule) {
    if (rule.d) {
        let groups = [], selector = replaceEach(// merge all conditions into a selector string
        rule.r.reduce((selector, condition)=>{
            return '@' == condition[0] ? (groups.push(condition), selector) : // Go over the selector and replace the matching multiple selectors if any
            condition ? replaceEach(selector, (selectorPart)=>replaceEach(condition, // If the current condition has a nested selector replace it
                (conditionPart)=>{
                    let mergeMatch = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(conditionPart);
                    if (mergeMatch) {
                        let selectorIndex = selectorPart.indexOf(mergeMatch[1]);
                        return ~selectorIndex ? // [':merge(.group):hover .rule', ':merge(.group):focus &'] -> ':merge(.group):focus:hover .rule'
                        // ':merge(.group)' + ':focus' + ':hover .rule'
                        selectorPart.slice(0, selectorIndex) + mergeMatch[0] + selectorPart.slice(selectorIndex + mergeMatch[1].length) : // [':merge(.peer):focus~&', ':merge(.group):hover &'] -> ':merge(.peer):focus~:merge(.group):hover &'
                        replaceReference(selectorPart, conditionPart);
                    }
                    // Return the current selector with the key matching multiple selectors if any
                    return replaceReference(conditionPart, selectorPart);
                })) : selector;
        }, '&'), // replace '&' with rule name or an empty string
        (selectorPart)=>replaceReference(selectorPart, rule.n ? '.' + escape(rule.n) : ''));
        return selector && groups.push(selector.replace(/:merge\((.+?)\)/g, '$1')), groups.reduceRight((body, grouping)=>grouping + '{' + body + '}', rule.d);
    }
}
function replaceEach(selector, iteratee) {
    return selector.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (_, selectorPart, comma)=>iteratee(selectorPart) + comma);
}
function replaceReference(selector, reference) {
    return selector.replace(/&/g, reference);
}
function define(className, layer, rules, useOrderOfRules) {
    var factory;
    return factory = (rule, context)=>{
        let { n: name , p: precedence , r: conditions , i: important  } = convert(rule, context, layer);
        return rules && translateWith(name, layer, rules, context, precedence, conditions, important, useOrderOfRules);
    }, registry.set(className, factory), className;
}
function format(rules, seperator = ',') {
    return rules.map(toClassName).join(seperator);
}
/**
   * The utility name including `-` if set, but without `!` and variants
   */ /**
   * All variants without trailing colon: `hover`, `after:`, `[...]`
   */ /**
   * Something like `!underline` or `!bg-red-500` or `!red-500`
   */ function createRule(active, current, loc) {
    if ('(' != active[active.length - 1]) {
        let variants = [], important = false, negated = false, name = '';
        for (let value of active)if (!('(' == value || /[~@]$/.test(value))) {
            if ('!' == value[0]) {
                value = value.slice(1);
                important = !important;
            }
            if (value.endsWith(':')) {
                variants['dark:' == value ? 'unshift' : 'push'](value.slice(0, -1));
                continue;
            }
            if ('-' == value[0]) {
                value = value.slice(1);
                negated = !negated;
            }
            value.endsWith('-') && (value = value.slice(0, -1));
            value && '&' != value && (name += (name && '-') + value);
        }
        if (name) {
            negated && (name = '-' + name);
            current[0].push({
                n: name,
                v: variants.filter(uniq),
                i: important
            });
        }
    }
}
function uniq(value, index, values) {
    return values.indexOf(value) == index;
}
let cache = new Map();
function parse(token) {
    let parsed = cache.get(token);
    if (!parsed) {
        // Stack of active groupings (`(`), variants, or nested (`~` or `@`)
        let active = [], // Stack of current rule list to put new rules in
        // the first `0` element is the current list
        current = [
            []
        ], startIndex = 0, skip = 0, comment = null, position = 0, // eslint-disable-next-line no-inner-declarations
        commit = (isRule, endOffset = 0)=>{
            if (startIndex != position) {
                active.push(token.slice(startIndex, position + endOffset));
                isRule && createRule(active, current);
            }
            startIndex = position + 1;
        };
        for(; position < token.length; position++){
            let char = token[position];
            if (skip) '\\' != token[position - 1] && (skip += +('[' == char) || -(']' == char));
            else if ('[' == char) // start to skip
            skip += 1;
            else if (comment) {
                if ('\\' != token[position - 1] && comment.test(token.slice(position))) {
                    comment = null;
                    startIndex = position + RegExp.lastMatch.length;
                }
            } else if ('/' == char && '\\' != token[position - 1] && ('*' == token[position + 1] || '/' == token[position + 1])) // multiline or single line comment
            comment = '*' == token[position + 1] ? /^\*\// : /^[\r\n]/;
            else if ('(' == char) {
                // hover:(...) or utilitity-(...)
                commit();
                active.push(char);
            } else if (':' == char) ':' != token[position + 1] && commit(false, 1);
            else if (/[\s,)]/.test(char)) {
                // whitespace, comma or closing brace
                commit(true);
                let lastGroup = active.lastIndexOf('(');
                if (')' == char) {
                    // Close nested block
                    let nested = active[lastGroup - 1];
                    if (/[~@]$/.test(nested)) {
                        let rules = current.shift();
                        active.length = lastGroup;
                        // remove variants that are already applied through active
                        createRule([
                            ...active,
                            '#'
                        ], current);
                        let { v  } = current[0].pop();
                        for (let rule of rules)// if a rule has dark we need to splice after the first entry eg dark
                        rule.v.splice(+('dark' == rule.v[0]) - +('dark' == v[0]), v.length);
                        createRule([
                            ...active,
                            define(// named nested
                            nested.length > 1 ? nested.slice(0, -1) + hash(JSON.stringify([
                                nested,
                                rules
                            ])) : nested + '(' + format(rules) + ')', Layer.s, rules, /@$/.test(nested))
                        ], current);
                    }
                    lastGroup = active.lastIndexOf('(', lastGroup - 1);
                }
                active.length = lastGroup + 1;
            } else /[~@]/.test(char) && '(' == token[position + 1] && // start nested block
            // ~(...) or button~(...)
            // @(...) or button@(...)
            current.unshift([]);
        }
        // Consume remaining stack
        commit(true);
        cache.set(token, parsed = current[0]);
    }
    return parsed;
}
let collator = new Intl.Collator('en', {
    numeric: true
});
/** The calculated precedence taking all variants into account. */ /* The precedence of the properties within {@link d}. */ /** The name to use for `&` expansion in selectors. Maybe empty for at-rules like `@import`, `@font-face`, `@media`, ... */ /**
 * Find the array index of where to add an element to keep it sorted.
 *
 * @returns The insertion index
 */ function sortedInsertionIndex(array, element) {
    // Find position using binary search
    // eslint-disable-next-line no-var
    for(var low = 0, high = array.length; low < high;){
        let pivot = high + low >> 1;
        0 >= compareTwindRules(array[pivot], element) ? low = pivot + 1 : high = pivot;
    }
    return high;
}
function compareTwindRules(a, b) {
    // base and overrides (css) layers are kept in order they are declared
    let layer = a.p & Layer.o;
    return layer == (b.p & Layer.o) && (layer == Layer.b || layer == Layer.o) ? 0 : a.p - b.p || a.o - b.o || collator.compare(a.n, b.n);
}
function merge(rules, name) {
    let current;
    // merge:
    // - same conditions
    // - replace name with hash of name + condititions + declarations
    // - precedence:
    //   - combine bits or use max precendence
    //   - set layer bit to merged
    let result = [];
    for (let rule of rules)// only merge rules with declarations and names (eg no global rules)
    if (rule.d && rule.n) {
        if (current?.p == rule.p && '' + current.r == '' + rule.r) {
            current.c = [
                current.c,
                rule.c
            ].filter(Boolean).join(' ');
            current.d = current.d + ';' + rule.d;
        } else // only set name for named rules eg not for global or className propagation rules
        result.push(current = {
            ...rule,
            n: rule.n && name
        });
    } else result.push({
        ...rule,
        n: rule.n && name
    });
    return result;
}
function translate(rules, context, precedence = Layer.u, conditions, important) {
    // Sorted by precedence
    let result = [];
    for (let rule of rules)for (let cssRule of function(rule, context, precedence, conditions, important) {
        rule = {
            ...rule,
            i: rule.i || important
        };
        let resolved = function(rule, context) {
            let factory = registry.get(rule.n);
            return factory ? factory(rule, context) : context.r(rule.n, 'dark' == rule.v[0]);
        }(rule, context);
        return resolved ? // a list of class names
        'string' == typeof resolved ? ({ r: conditions , p: precedence  } = convert(rule, context, precedence, conditions), merge(translate(parse(resolved), context, precedence, conditions, rule.i), rule.n)) : Array.isArray(resolved) ? resolved.map((rule)=>{
            var /* Shifts.layer */ /*
To have a predictable styling the styles must be ordered.

This order is represented by a precedence number. The lower values
are inserted before higher values. Meaning higher precedence styles
overwrite lower precedence styles.

Each rule has some traits that are put into a bit set which form
the precedence:

| bits | trait                                                |
| ---- | ---------------------------------------------------- |
| 1    | dark mode                                            |
| 2    | layer: preflight, global, components, utilities, css |
| 1    | screens: is this a responsive variation of a rule    |
| 5    | responsive based on min-width                        |
| 4    | at-rules                                             |
| 18   | pseudo and group variants                            |
| 4    | number of declarations (descending)                  |
| 4    | greatest precedence of properties                    |

**Dark Mode: 1 bit**

Flag for dark mode rules.

**Layer: 3 bits**

- defaults = 0: The preflight styles and any base styles registered by plugins.
- vase = 1: The global styles registered by plugins.
- components = 2
- variants = 3
- compounds = 4
- shortcuts = 5
- utilities = 6: Utility classes and any utility classes registered by plugins.
- css = 7: Styles generated by css

**Screens: 1 bit**

Flag for screen variants. They may not always have a `min-width` to be detected by _Responsive_ below.

**Responsive: 4 bits**

Based on extracted `min-width` value:

- 576px -> 3
- 1536px -> 10
- 36rem -> 3
- 96rem -> 9

**At-Rules: 4 bits**

Based on the count of special chars (`-:,`) within the at-rule.

**Pseudo and group variants: 18 bits**

Ensures predictable order of pseudo classes.

- https://bitsofco.de/when-do-the-hover-focus-and-active-pseudo-classes-apply/#orderofstyleshoverthenfocusthenactive
- https://developer.mozilla.org/docs/Web/CSS/:active#Active_links
- https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L718

**Number of declarations (descending): 4 bits**

Allows single declaration styles to overwrite styles from multi declaration styles.

**Greatest precedence of properties: 4 bits**

Ensure shorthand properties are inserted before longhand properties; eg longhand override shorthand
*/ precedence1, layer;
            return {
                o: 0,
                ...rule,
                r: [
                    ...asArray(conditions),
                    ...asArray(rule.r)
                ],
                p: (precedence1 = precedence, layer = rule.p ?? precedence, // Set layer (first reset, than set)
                precedence1 & ~Layer.o | layer)
            };
        }) : serialize(resolved, rule, context, precedence, conditions) : // propagate className as is
        [
            {
                c: toClassName(rule),
                p: 0,
                o: 0,
                r: []
            }
        ];
    }(rule, context, precedence, conditions, important))result.splice(sortedInsertionIndex(result, cssRule), 0, cssRule);
    return result;
}
function translateWith(name, layer, rules, context, precedence, conditions, important, useOrderOfRules) {
    return merge((useOrderOfRules ? rules.flatMap((rule)=>translate([
            rule
        ], context, precedence, conditions, important)) : translate(rules, context, precedence, conditions, important)).map((rule)=>{
        return(// do not move defaults
        // move only rules with a name unless they are in the base layer
        rule.p & Layer.o && (rule.n || layer == Layer.b) ? {
            ...rule,
            p: rule.p & ~Layer.o | layer,
            o: 0
        } : rule);
    }), name);
}
function parseColorComponent(chars, factor) {
    return Math.round(parseInt(chars, 16) * factor);
}
function toColorValue(color, options = {}) {
    if ('function' == typeof color) return color(options);
    let { opacityValue ='1' , opacityVariable  } = options, opacity = opacityVariable ? `var(${opacityVariable})` : opacityValue;
    if (color.includes('<alpha-value>')) return color.replace('<alpha-value>', opacity);
    // rgb hex: #0123 and #001122
    if ('#' == color[0] && (4 == color.length || 7 == color.length)) {
        let size = (color.length - 1) / 3, factor = [
            17,
            1,
            0.062272
        ][size - 1];
        return `rgba(${[
            parseColorComponent(color.substr(1, size), factor),
            parseColorComponent(color.substr(1 + size, size), factor),
            parseColorComponent(color.substr(1 + 2 * size, size), factor),
            opacity
        ]})`;
    }
    return '1' == opacity ? color : '0' == opacity ? '#0000' : // convert rgb and hsl to alpha variant
    color.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${opacity})`);
}
/**
 * Looks for a matching dark color within a [tailwind color palette](https://tailwindcss.com/docs/customizing-colors) (`50`, `100`, `200`, ..., `800`, `900`).
 *
 * ```js
 * defineConfig({
 *   darkColor: autoDarkColor,
 * })
 * ```
 *
 * **Note**: Does not work for arbitrary values like `[theme(colors.gray.500)]` or `[theme(colors.gray.500, #ccc)]`.
 *
 * @param section within theme to use
 * @param key of the light color or an arbitrary value
 * @param context to use
 * @returns the dark color if found
 */ function autoDarkColor(section, key, { theme  }) {
    return theme(section, // 50 -> 900, 100 -> 800, ..., 800 -> 100, 900 -> 50
    // key: gray-50, gray.50
    key = key.replace(/\d+$/, (shade)=>// ~~(parseInt(shade, 10) / 100): 50 -> 0, 900 -> 9
        100 * // (9 - 0) -> 900, (9 - 9) -> 50
        (9 - ~~(parseInt(shade, 10) / 100) || 0.5)));
}
function serialize(style, rule, context, precedence, conditions = []) {
    return function serialize$(style, { n: name , p: precedence , r: conditions = [] , i: important  }, context) {
        let rules = [], // The generated declaration block eg body of the css rule
        declarations = '', // This ensures that 'border-top-width' has a higher precedence than 'border-top'
        maxPropertyPrecedence = 0, // More specific utilities have less declarations and a higher precedence
        numberOfDeclarations = 0;
        for(let key in style || {}){
            var layer, // https://github.com/kripod/otion/blob/main/packages/otion/src/propertyMatchers.ts
            // "+1": [
            // 	/* ^border-.*(w|c|sty) */
            // 	"border-.*(width,color,style)",
            // 	/* ^[tlbr].{2,4}m?$ */
            // 	"top",
            // 	"left",
            // 	"bottom",
            // 	"right",
            // 	/* ^c.{7}$ */
            // 	"continue",
            // ],
            // "-1": [
            // 	/* ^[fl].{5}l */
            // 	"flex-flow",
            // 	"line-clamp",
            // 	/* ^g.{8}$ */
            // 	"grid-area",
            // 	/* ^pl */
            // 	"place-content",
            // 	"place-items",
            // 	"place-self",
            // ],
            // group: 1 => +1
            // group: 2 => -1
            // 0 - 15 => 4 bits
            // Ignore vendor prefixed and custom properties
            property;
            let value = style[key];
            if ('@' == key[0]) {
                // at rules: https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
                if (!value) continue;
                // @apply ...;
                if ('a' == key[1]) {
                    rules.push(...translateWith(name, precedence, parse('' + value), context, precedence, conditions, important, true));
                    continue;
                }
                // @layer <layer>
                if ('l' == key[1]) {
                    for (let css of asArray(value))rules.push(...serialize$(css, {
                        n: name,
                        p: (layer = Layer[key[7]], precedence & ~Layer.o | layer),
                        r: conditions,
                        i: important
                    }, context));
                    continue;
                }
                // @import
                if ('i' == key[1]) {
                    rules.push(...asArray(value).map((value)=>({
                            // before all layers
                            p: -1,
                            o: 0,
                            r: [],
                            d: key + ' ' + value
                        })));
                    continue;
                }
                // @keyframes
                if ('k' == key[1]) {
                    // Use defaults layer
                    rules.push({
                        p: Layer.d,
                        o: 0,
                        r: [
                            key
                        ],
                        d: serialize$(value, {
                            p: Layer.d
                        }, context).map(stringify$1).join('')
                    });
                    continue;
                }
                // @font-face
                // TODO @font-feature-values
                if ('f' == key[1]) {
                    // Use defaults layer
                    rules.push(...asArray(value).map((value)=>({
                            p: Layer.d,
                            o: 0,
                            r: [
                                key
                            ],
                            d: serialize$(value, {
                                p: Layer.d
                            }, context).map(stringify$1).join('')
                        })));
                    continue;
                }
            }
            // -> All other are handled below; same as selector
            // @media
            // @supports
            // selector
            if ('object' != typeof value || Array.isArray(value)) {
                if ('label' == key && value) name = value + hash(JSON.stringify([
                    precedence,
                    important,
                    style
                ]));
                else if (value || 0 === value) {
                    // property -> hyphenate
                    key = key.replace(/[A-Z]/g, (_)=>'-' + _.toLowerCase());
                    // Update precedence
                    numberOfDeclarations += 1;
                    maxPropertyPrecedence = Math.max(maxPropertyPrecedence, '-' == (property = key)[0] ? 0 : seperatorPrecedence(property) + (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7}$)|([fl].{5}l|g.{8}$|pl))/.test(property) ? +!!RegExp.$1 || /* +1 */ -!!RegExp.$2 : /* -1 */ 0) + 1);
                    declarations += (declarations ? ';' : '') + asArray(value).map((value)=>context.s(key, // support theme(...) function in values
                        // calc(100vh - theme('spacing.12'))
                        resolveThemeFunction('' + value, context.theme) + (important ? ' !important' : ''))).join(';');
                }
            } else // at-rule or non-global selector
            if ('@' == key[0] || key.includes('&')) {
                let rulePrecedence = precedence;
                if ('@' == key[0]) {
                    // Handle `@media screen(sm)` and `@media (screen(sm) or ...)`
                    key = key.replace(/\bscreen\(([^)]+)\)/g, (_, screenKey)=>{
                        let screen = context.theme('screens', screenKey);
                        return screen ? (rulePrecedence |= 67108864, /* Shifts.screens */ mql(screen, '')) : _;
                    });
                    rulePrecedence |= atRulePrecedence(key);
                }
                rules.push(...serialize$(value, {
                    n: name,
                    p: rulePrecedence,
                    r: [
                        ...conditions,
                        key
                    ],
                    i: important
                }, context));
            } else // global selector
            rules.push(...serialize$(value, {
                p: precedence,
                r: [
                    ...conditions,
                    key
                ]
            }, context));
        }
        return(// PERF: prevent unshift using `rules = [{}]` above and then `rules[0] = {...}`
        rules.unshift({
            n: name,
            p: precedence,
            o: // number of declarations (descending)
            Math.max(0, 15 - numberOfDeclarations) + // greatest precedence of properties
            // if there is no property precedence this is most likely a custom property only declaration
            // these have the highest precedence
            1.5 * Math.min(maxPropertyPrecedence || 15, 15),
            r: conditions,
            // stringified declarations
            d: declarations
        }), rules.sort(compareTwindRules));
    }(style, convert(rule, context, precedence, conditions), context);
}
function resolveThemeFunction(value, theme) {
    // support theme(...) function in values
    // calc(100vh - theme('spacing.12'))
    // theme('borderColor.DEFAULT', 'currentColor')
    // PERF: check for theme before running the regexp
    // if (value.includes('theme')) {
    return value.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g, (_, __, key, ___, defaultValue)=>{
        let value = theme(key, defaultValue);
        return 'function' == typeof value && /color|fill|stroke/i.test(key) ? toColorValue(value) : // TODO: warn if not a string
        '' + value;
    });
}
// }
// return value
function interleave(strings, interpolations, handle) {
    return interpolations.reduce((result, interpolation, index)=>result + handle(interpolation) + strings[index + 1], strings[0]);
}
function astish(strings, interpolations) {
    return Array.isArray(strings) ? astish$(interleave(strings, interpolations, (interpolation)=>null != interpolation && 'boolean' != typeof interpolation ? interpolation : '')) : 'string' == typeof strings ? astish$(strings) : [
        strings
    ];
}
// Based on https://github.com/cristianbote/goober/blob/master/src/core/astish.js
let newRule = / *(?:(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}))/g;
/**
 * Convert a css style string into a object
 */ function astish$(css) {
    let block;
    css = // Remove comments (multiline and single line)
    css.replace(/\/\*[^]*?\*\/|\s\s+|\n/gm, ' ');
    let tree = [
        {}
    ], rules = [
        tree[0]
    ], conditions = [];
    for(; block = newRule.exec(css);){
        // Remove the current entry
        if (block[4]) {
            tree.shift();
            conditions.shift();
        }
        if (block[3]) {
            // new nested
            conditions.unshift(block[3]);
            tree.unshift({});
            rules.push(conditions.reduce((body, condition)=>({
                    [condition]: body
                }), tree[0]));
        } else if (!block[4]) {
            // if we already have that property — start a new CSSObject
            if (tree[0][block[1]]) {
                tree.unshift({});
                rules.push(conditions.reduce((body, condition)=>({
                        [condition]: body
                    }), tree[0]));
            }
            tree[0][block[1]] = block[2];
        }
    }
    // console.log(rules)
    return rules;
}
function css(strings, ...interpolations) {
    var factory;
    let ast = astish(strings, interpolations), className = (ast.find((o)=>o.label)?.label || 'css') + hash(JSON.stringify(ast));
    return factory = (rule, context)=>merge(ast.flatMap((css)=>serialize(css, rule, context, Layer.o)), className), registry.set(className, factory), className;
}
let animation = /* #__PURE__ */ new Proxy(function animation(animation, waypoints) {
    return animation$('animation', animation, waypoints);
}, {
    get (target, name) {
        return name in target ? target[name] : function namedAnimation(animation, waypoints) {
            return animation$(name, animation, waypoints);
        };
    }
});
function animation$(label, animation, waypoints) {
    return {
        toString () {
            return css({
                label,
                '@layer components': {
                    ...'object' == typeof animation ? animation : {
                        animation
                    },
                    animationName: '' + waypoints
                }
            });
        }
    };
}
/** The found theme value */ // indirection wrapper to remove autocomplete functions from production bundles
// eslint-disable-next-line @typescript-eslint/ban-types
function match(pattern, // eslint-disable-next-line @typescript-eslint/ban-types
resolve, convert) {
    return [
        pattern,
        fromMatch(resolve, convert)
    ];
}
function fromMatch(resolve, convert) {
    return 'function' == typeof resolve ? resolve : 'string' == typeof resolve && /^[\w-]+$/.test(resolve) ? // a CSS property alias
    (match, context)=>({
            [resolve]: convert ? convert(match, context) : maybeNegate(match, 1)
        }) : (match)=>// CSSObject, shortcut or apply
        resolve || {
            [match[1]]: maybeNegate(match, 2)
        };
}
function maybeNegate(match, offset, value = match.slice(offset).find(Boolean) || match.$$ || match.input) {
    return '-' == match.input[0] ? `calc(${value} * -1)` : value;
}
function matchTheme(pattern, /** Theme section to use (default: `$1` — The first matched group) */ section, /** The css property (default: value of {@link section}) */ resolve, convert) {
    return [
        pattern,
        fromTheme(section, resolve, convert)
    ];
}
function fromTheme(/** Theme section to use (default: `$1` — The first matched group) */ section, /** The css property (default: value of {@link section}) */ resolve, convert) {
    let factory = 'string' == typeof resolve ? (match, context)=>({
            [resolve]: convert ? convert(match, context) : match._
        }) : resolve || (({ 1: $1 , _  }, context, section)=>({
            [$1 || section]: _
        }));
    return (match, context)=>{
        let themeSection = camelize(section || match[1]), value = context.theme(themeSection, match.$$) ?? arbitrary(match.$$, themeSection, context);
        if (null != value) return match._ = maybeNegate(match, 0, value), factory(match, context, themeSection);
    };
}
/** Theme section to use (default: `$0.replace('-', 'Color')` — The matched string with `Color` appended) */ /** The css property (default: value of {@link section}) */ /** `--tw-${$0}opacity` -> '--tw-text-opacity' */ /** `section.replace('Color', 'Opacity')` -> 'textOpacity' */ function matchColor(pattern, options = {}, resolve) {
    return [
        pattern,
        colorFromTheme(options, resolve)
    ];
}
function colorFromTheme(options = {}, resolve) {
    return (match, context)=>{
        // text- -> textColor
        // ring-offset(?:-|$) -> ringOffsetColor
        let { section =camelize(match[0]).replace('-', '') + 'Color'  } = options;
        // extract color and opacity
        // rose-500                  -> ['rose-500']
        // [hsl(0_100%_/_50%)]       -> ['[hsl(0_100%_/_50%)]']
        // indigo-500/100            -> ['indigo-500', '100']
        // [hsl(0_100%_/_50%)]/[.25] -> ['[hsl(0_100%_/_50%)]', '[.25]']
        if (!/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/.test(match.$$)) return;
        let { $1: colorMatch , $2: opacityMatch  } = RegExp, colorValue = context.theme(section, colorMatch) || arbitrary(colorMatch, section, context);
        if (!colorValue || 'object' == typeof colorValue) return;
        let { // text- -> --tw-text-opacity
        // ring-offset(?:-|$) -> --tw-ring-offset-opacity
        // TODO move this default into preset-tailwind?
        opacityVariable =`--tw-${match[0].replace(/-$/, '')}-opacity` , opacitySection =section.replace('Color', 'Opacity') , property =section , selector  } = options, opacityValue = context.theme(opacitySection, opacityMatch || 'DEFAULT') || opacityMatch && arbitrary(opacityMatch, opacitySection, context), // if (typeof color != 'string') {
        //   console.warn(`Invalid color ${colorMatch} (from ${match.input}):`, color)
        //   return
        // }
        create = resolve || (({ _  })=>{
            let properties = toCSS(property, _);
            return selector ? {
                [selector]: properties
            } : properties;
        });
        match._ = {
            value: toColorValue(colorValue, {
                opacityVariable: opacityVariable || void 0,
                opacityValue: opacityValue || void 0
            }),
            color: (options)=>toColorValue(colorValue, options),
            opacityVariable: opacityVariable || void 0,
            opacityValue: opacityValue || void 0
        };
        let properties = create(match, context);
        // auto support dark mode colors
        if (!match.dark) {
            let darkColorValue = context.d(section, colorMatch, colorValue);
            if (darkColorValue && darkColorValue !== colorValue) {
                match._ = {
                    value: toColorValue(darkColorValue, {
                        opacityVariable: opacityVariable || void 0,
                        opacityValue: opacityValue || '1'
                    }),
                    color: (options)=>toColorValue(darkColorValue, options),
                    opacityVariable: opacityVariable || void 0,
                    opacityValue: opacityValue || void 0
                };
                properties = {
                    '&': properties,
                    [context.v('dark')]: create(match, context)
                };
            }
        }
        return properties;
    };
}
function toCSS(property, value) {
    let properties = {};
    if ('string' == typeof value) properties[property] = value;
    else {
        value.opacityVariable && value.value.includes(value.opacityVariable) && (properties[value.opacityVariable] = value.opacityValue || '1');
        properties[property] = value.value;
    }
    return properties;
}
function arbitrary(value, section, context) {
    if ('[' == value[0] && ']' == value.slice(-1)) {
        value = normalize(resolveThemeFunction(value.slice(1, -1), context.theme));
        if (// Respect type hints from the user on ambiguous arbitrary values - https://tailwindcss.com/docs/adding-custom-styles#resolving-ambiguities
        !// If this is a color section and the value is a hex color, color function or color name
        (/color|fill|stroke/i.test(section) && !(/^color:/.test(value) || /^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(value)) || // url(, [a-z]-gradient(, image(, cross-fade(, image-set(
        /image/i.test(section) && !(/^image:/.test(value) || /^[a-z-]+\(/.test(value)) || // font-*
        // - fontWeight (type: ['lookup', 'number', 'any'])
        // - fontFamily (type: ['lookup', 'generic-name', 'family-name'])
        /weight/i.test(section) && !(/^(number|any):/.test(value) || /^\d+$/.test(value)) || // bg-*
        // - backgroundPosition (type: ['lookup', ['position', { preferOnConflict: true }]])
        // - backgroundSize (type: ['lookup', 'length', 'percentage', 'size'])
        /position/i.test(section) && /^(length|size):/.test(value))) // remove arbitrary type prefix — we do not need it but user may use it
        // https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/dataTypes.js
        // url, number, percentage, length, line-width, shadow, color, image, gradient, position, family-name, lookup, any, generic-name, absolute-size, relative-size
        return value.replace(/^[a-z-]+:/, '');
    }
}
function camelize(value) {
    return value.replace(/-./g, (x)=>x[1].toUpperCase());
}
function normalize(value) {
    return(// Keep raw strings if it starts with `url(`
    value.includes('url(') ? value.replace(/(.*?)(url\(.*?\))(.*?)/g, (_, before = '', url, after = '')=>normalize(before) + url + normalize(after)) : value.// Convert `_` to ` `, except for escaped underscores `\_`
    replace(/(^|[^\\])_+/g, (fullMatch, characterBefore)=>characterBefore + ' '.repeat(fullMatch.length - characterBefore.length)).replace(/\\_/g, '_').// Add spaces around operators inside math functions like calc() that do not follow an operator
    // or '('.
    replace(/(calc|min|max|clamp)\(.+\)/g, (match)=>match.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, '$1 $2 ')));
}
/** Allows to resolve theme values. */ let kAutocomplete = /* #__PURE__ */ Symbol();
function withAutocomplete(rule, autocomplete) {
    return rule;
}
function getAutocompleteProvider(resolver) {
    return resolver[kAutocomplete];
}
// based on https://github.com/lukeed/clsx and https://github.com/jorgebucaran/classcat
function interpolate(strings, interpolations) {
    return Array.isArray(strings) && Array.isArray(strings.raw) ? interleave(strings, interpolations, (value)=>toString(value).trim()) : interpolations.filter(Boolean).reduce((result, value)=>result + toString(value), strings ? toString(strings) : '');
}
function toString(value) {
    let tmp, result = '';
    if (value && 'object' == typeof value) {
        if (Array.isArray(value)) (tmp = interpolate(value[0], value.slice(1))) && (result += ' ' + tmp);
        else for(let key in value)value[key] && (result += ' ' + key);
    } else null != value && 'boolean' != typeof value && (result += ' ' + value);
    return result;
}
function cx(strings, ...interpolations) {
    return format(parse(interpolate(strings, interpolations)), ' ');
}
function defineConfig({ presets =[] , ...userConfig }) {
    // most user config values go first to have precendence over preset config
    // only `preflight` and `theme` are applied as last preset to override all presets
    let config = {
        preflight: false !== userConfig.preflight && [],
        darkMode: void 0,
        darkColor: void 0,
        theme: {},
        variants: asArray(userConfig.variants),
        rules: asArray(userConfig.rules),
        ignorelist: asArray(userConfig.ignorelist),
        hash: userConfig.hash,
        stringify: userConfig.stringify || noprefix
    };
    for (let preset of asArray([
        ...presets,
        {
            darkMode: userConfig.darkMode,
            darkColor: userConfig.darkColor,
            preflight: false !== userConfig.preflight && asArray(userConfig.preflight),
            theme: userConfig.theme,
            hash: userConfig.hash,
            stringify: userConfig.stringify
        }
    ])){
        let { preflight , darkMode =config.darkMode , darkColor =config.darkColor , theme , variants , rules , ignorelist , hash =config.hash , stringify =config.stringify  } = 'function' == typeof preset ? preset(config) : preset;
        config = {
            // values defined by user or previous presets take precedence
            preflight: false !== config.preflight && false !== preflight && [
                ...config.preflight,
                ...asArray(preflight)
            ],
            darkMode,
            darkColor,
            theme: {
                ...config.theme,
                ...theme,
                extend: {
                    ...config.theme.extend,
                    ...theme?.extend
                }
            },
            variants: [
                ...config.variants,
                ...asArray(variants)
            ],
            rules: [
                ...config.rules,
                ...asArray(rules)
            ],
            ignorelist: [
                ...config.ignorelist,
                ...asArray(ignorelist)
            ],
            hash,
            stringify
        };
    }
    return config;
}
function noprefix(property, value) {
    return property + ':' + value;
}
function find(value, list, cache, getResolver, context, isDark) {
    for (let item of list){
        let resolver = cache.get(item);
        resolver || cache.set(item, resolver = getResolver(item));
        let resolved = resolver(value, context, isDark);
        if (resolved) return resolved;
    }
}
function getVariantResolver(variant) {
    var resolve;
    return createResolve(variant[0], 'function' == typeof (resolve = variant[1]) ? resolve : ()=>resolve);
}
function getRuleResolver(rule) {
    var resolve, convert;
    return Array.isArray(rule) ? createResolve(rule[0], fromMatch(rule[1], rule[2])) : createResolve(rule, fromMatch(resolve, convert));
}
function createResolve(patterns, resolve) {
    return createRegExpExecutor(patterns, (value, condition, context, isDark)=>{
        let match = condition.exec(value);
        if (match) return(// MATCH.$_ = value
        match.$$ = value.slice(match[0].length), match.dark = isDark, resolve(match, context));
    });
}
function createRegExpExecutor(patterns, run) {
    let conditions = asArray(patterns).map(toCondition);
    return (value, context, isDark)=>{
        for (let condition of conditions){
            let result = run(value, condition, context, isDark);
            if (result) return result;
        }
    };
}
function toCondition(value) {
    // "visible" -> /^visible$/
    // "(float)-(left|right|none)" -> /^(float)-(left|right|none)$/
    // "auto-rows-" -> /^auto-rows-/
    // "gap(-|$)" -> /^gap(-|$)/
    return 'string' == typeof value ? RegExp('^' + value + (value.includes('$') || '-' == value.slice(-1) ? '' : '$')) : value;
}
function hashVars(value, h) {
    // PERF: check for --tw before running the regexp
    // if (value.includes('--tw')) {
    return value.replace(/--(tw(?:-[\w-]+)?)\b/g, (_, property)=>'--' + h(property).replace('#', ''));
}
// }
// return value
function twind(userConfig, sheet) {
    let config = defineConfig(userConfig), context = function({ theme , darkMode , darkColor , variants , rules , hash: hash$1 , stringify , ignorelist  }) {
        // Used to cache resolved rule values
        let variantCache = new Map(), // lazy created resolve functions
        variantResolvers = new Map(), // Used to cache resolved rule values
        ruleCache = new Map(), // lazy created resolve functions
        ruleResolvers = new Map(), ignored = createRegExpExecutor(ignorelist, (value, condition)=>condition.test(value));
        // add dark as last variant to allow user to override it
        // we can modify variants as it has been passed through defineConfig which already made a copy
        variants.push([
            'dark',
            Array.isArray(darkMode) || 'class' == darkMode ? `${asArray(darkMode)[1] || '.dark'} &` : 'string' == typeof darkMode && 'media' != darkMode ? darkMode : // a custom selector
            '@media (prefers-color-scheme:dark)'
        ]);
        let h = 'function' == typeof hash$1 ? (value)=>hash$1(value, hash) : hash$1 ? hash : identity;
        return {
            theme: function({ extend ={} , ...base }) {
                let resolved = {}, resolveContext = {
                    get colors () {
                        return theme('colors');
                    },
                    theme,
                    // Stub implementation as negated values are automatically infered and do _not_ need to be in the theme
                    negative () {
                        return {};
                    },
                    breakpoints (screens) {
                        let breakpoints = {};
                        for(let key in screens)'string' == typeof screens[key] && (breakpoints['screen-' + key] = screens[key]);
                        return breakpoints;
                    }
                };
                return theme;
                function theme(sectionKey, key, defaultValue, opacityValue) {
                    if (sectionKey) {
                        ({ 1: sectionKey , 2: opacityValue  } = // eslint-disable-next-line no-sparse-arrays
                        /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(sectionKey) || [
                            ,
                            sectionKey
                        ]);
                        if (/[.[]/.test(sectionKey)) {
                            let path = [];
                            // dotted deep access: colors.gray.500 or spacing[2.5]
                            sectionKey.replace(/\[([^\]]+)\]|([^.[]+)/g, (_, $1, $2 = $1)=>path.push($2));
                            sectionKey = path.shift();
                            defaultValue = key;
                            key = path.join('-');
                        }
                        let section = resolved[sectionKey] || // two-step deref to allow extend section to reference base section
                        Object.assign(Object.assign(// Make sure to not get into recursive calls
                        resolved[sectionKey] = {}, deref(base, sectionKey)), deref(extend, sectionKey));
                        if (null == key) return section;
                        let value = section[key || 'DEFAULT'] ?? defaultValue;
                        return opacityValue ? toColorValue(value, {
                            opacityValue: resolveThemeFunction(opacityValue, theme)
                        }) : value;
                    }
                    // Collect the whole theme
                    let result = {};
                    for (let section1 of [
                        ...Object.keys(base),
                        ...Object.keys(extend)
                    ])result[section1] = theme(section1);
                    return result;
                }
                function deref(source, section) {
                    let value = source[section];
                    return ('function' == typeof value && (value = value(resolveContext)), value && /color|fill|stroke/i.test(section)) ? function flattenColorPalette(colors, path = []) {
                        let flattend = {};
                        for(let key in colors){
                            let value = colors[key], keyPath = [
                                ...path,
                                key
                            ];
                            flattend[keyPath.join('-')] = value;
                            if ('DEFAULT' == key) {
                                keyPath = path;
                                flattend[path.join('-')] = value;
                            }
                            'object' == typeof value && Object.assign(flattend, flattenColorPalette(value, keyPath));
                        }
                        return flattend;
                    }(value) : value;
                }
            }(theme),
            e: escape,
            h,
            s (property, value) {
                // Hash/Tag tailwind custom properties during serialization
                return stringify(hashVars(property, h), hashVars(value, h), this);
            },
            d (section, key, color) {
                return darkColor?.(section, key, this, color);
            },
            v (value) {
                return variantCache.has(value) || variantCache.set(value, find(value, variants, variantResolvers, getVariantResolver, this) || '&:' + value), variantCache.get(value);
            },
            r (className, isDark) {
                let key = JSON.stringify([
                    className,
                    isDark
                ]);
                return ruleCache.has(key) || ruleCache.set(key, !ignored(className, this) && find(className, rules, ruleResolvers, getRuleResolver, this, isDark)), ruleCache.get(key);
            }
        };
    }(config), // Map of tokens to generated className
    cache = new Map(), // An array of precedence by index within the sheet
    // always sorted
    sortedPrecedences = [], // Cache for already inserted css rules
    // to prevent double insertions
    insertedRules = new Set();
    sheet.resume((className)=>cache.set(className, className), (cssText, rule)=>{
        sheet.insert(cssText, sortedPrecedences.length, rule);
        sortedPrecedences.push(rule);
        insertedRules.add(cssText);
    });
    function insert(rule) {
        let name = rule.n && context.h(rule.n), cssText = stringify$1(name ? {
            ...rule,
            n: name
        } : rule);
        // If not already inserted
        if (cssText && !insertedRules.has(cssText)) {
            // Mark rule as inserted
            insertedRules.add(cssText);
            // Find the correct position
            let index = sortedInsertionIndex(sortedPrecedences, rule);
            // Insert
            sheet.insert(cssText, index, rule);
            // Update sorted index
            sortedPrecedences.splice(index, 0, rule);
        }
        return name;
    }
    return Object.defineProperties(function tw(tokens) {
        if (!cache.size) for (let preflight of asArray(config.preflight)){
            'function' == typeof preflight && (preflight = preflight(context));
            preflight && ('string' == typeof preflight ? translateWith('', Layer.b, parse(preflight), context, Layer.b, [], false, true) : serialize(preflight, {}, context, Layer.b)).forEach(insert);
        }
        tokens = '' + tokens;
        let className = cache.get(tokens);
        if (!className) {
            let classNames = new Set();
            for (let rule of translate(parse(tokens), context))classNames.add(rule.c).add(insert(rule));
            className = [
                ...classNames
            ].filter(Boolean).join(' ');
            // Remember the generated class name
            cache.set(tokens, className).set(className, className);
        }
        return className;
    }, Object.getOwnPropertyDescriptors({
        get target () {
            return sheet.target;
        },
        theme: context.theme,
        config,
        snapshot () {
            let restoreSheet = sheet.snapshot(), insertedRules$ = new Set(insertedRules), cache$ = new Map(cache), sortedPrecedences$ = [
                ...sortedPrecedences
            ];
            return ()=>{
                restoreSheet();
                insertedRules = insertedRules$;
                cache = cache$;
                sortedPrecedences = sortedPrecedences$;
            };
        },
        clear () {
            sheet.clear();
            insertedRules = new Set();
            cache = new Map();
            sortedPrecedences = [];
        },
        destroy () {
            this.clear();
            sheet.destroy();
        }
    }));
}
/**
 * Determines if two class name strings contain the same classes.
 *
 * @param a first class names
 * @param b second class names
 * @returns are they different
 */ function changed(a, b) {
    return a != b && '' + a.split(' ').sort() != '' + b.split(' ').sort();
}
function observe(tw$1 = tw, target = 'undefined' != typeof document && document.documentElement) {
    if (!target) return tw$1;
    let observer = new MutationObserver(handleMutationRecords);
    observer.observe(target, {
        attributeFilter: [
            'class'
        ],
        subtree: true,
        childList: true
    });
    // handle class attribute on target
    handleClassAttributeChange(target);
    // handle children of target
    handleMutationRecords([
        {
            target,
            type: ''
        }
    ]);
    // monkey patch tw.destroy to disconnect this observer
    // eslint-disable-next-line @typescript-eslint/unbound-method
    let { destroy  } = tw$1;
    tw$1.destroy = ()=>{
        observer.disconnect();
        destroy.call(tw$1);
    };
    return tw$1;
    function handleMutationRecords(records) {
        for (let { type , target  } of records)if ('a' == type[0]) /* attribute */ // class attribute has been changed
        handleClassAttributeChange(target);
        else /* childList */ // some nodes have been added — find all with a class attribute
        for (let el of target.querySelectorAll('[class]'))handleClassAttributeChange(el);
        // remove pending mutations — these are triggered by updating the class attributes
        observer.takeRecords();
    }
    // XXX maybe we need to handle all pending mutations
    // observer.takeRecords().forEach(handleMutation)
    function handleClassAttributeChange(target) {
        let className;
        // Not using target.classList.value (not supported in all browsers) or target.class (this is an SVGAnimatedString for svg)
        let tokens = target.getAttribute('class');
        tokens && changed(tokens, className = tw$1(tokens)) && // Not using `target.className = ...` as that is read-only for SVGElements
        target.setAttribute('class', className);
    }
}
/**
 * Simplified MutationRecord which allows us to pass an
 * ArrayLike (compatible with Array and NodeList) `addedNodes` and
 * omit other properties we are not interested in.
 */ function getStyleElement(element) {
    let style = element || document.querySelector('style[data-twind]');
    if (!style || 'STYLE' != style.tagName) {
        (style = document.createElement('style')).dataset.twind = '';
        document.head.prepend(style);
    }
    return style;
}
function cssom(element) {
    let target = element?.cssRules ? element : getStyleElement(element).sheet;
    return {
        target,
        snapshot () {
            // collect current rules
            let rules = Array.from(target.cssRules, (rule)=>rule.cssText);
            return ()=>{
                // remove all existing rules
                this.clear();
                // add all snapshot rules back
                // eslint-disable-next-line @typescript-eslint/unbound-method
                rules.forEach(this.insert);
            };
        },
        clear () {
            // remove all added rules
            for(let index = target.cssRules.length; index--;)target.deleteRule(index);
        },
        destroy () {
            target.ownerNode?.remove();
        },
        insert (cssText, index) {
            try {
                // Insert
                target.insertRule(cssText, index);
            } catch (error) {
                // Empty rule to keep index valid — not using `*{}` as that would show up in all rules (DX)
                target.insertRule(':root{}', index);
                /:-[mwo]/.test(cssText);
            }
        },
        resume: noop
    };
}
function dom(element) {
    let target = getStyleElement(element);
    return {
        target,
        snapshot () {
            // collect current rules
            let rules = Array.from(target.childNodes, (node)=>node.textContent);
            return ()=>{
                // remove all existing rules
                this.clear();
                // add all snapshot rules back
                // eslint-disable-next-line @typescript-eslint/unbound-method
                rules.forEach(this.insert);
            };
        },
        clear () {
            target.textContent = '';
        },
        destroy () {
            target.remove();
        },
        insert (cssText, index) {
            target.insertBefore(document.createTextNode(cssText), target.childNodes[index] || null);
        },
        resume: noop
    };
}
function virtual(includeResumeData) {
    let target = [];
    return {
        target,
        snapshot () {
            // collect current rules
            let rules = [
                ...target
            ];
            return ()=>{
                // remove all existing rules and add all snapshot rules back
                target.splice(0, target.length, ...rules);
            };
        },
        clear () {
            target.length = 0;
        },
        destroy () {
            this.clear();
        },
        insert (css, index, rule) {
            target.splice(index, 0, includeResumeData ? `/*!${rule.p.toString(36)},${(2 * rule.o).toString(36)}${rule.n ? ',' + rule.n : ''}*/${css}` : css);
        },
        resume: noop
    };
}
/**
 * Returns a sheet useable in the current environment.
 *
 * @param useDOMSheet usually something like `process.env.NODE_ENV != 'production'` (default: browser={@link cssom}, server={@link virtual})
 * @param disableResume to not include or use resume data
 * @returns a sheet to use
 */ function getSheet(useDOMSheet, disableResume) {
    let sheet = 'undefined' == typeof document ? virtual(!disableResume) : useDOMSheet ? dom() : cssom();
    return disableResume || (sheet.resume = resume), sheet;
}
function stringify(target) {
    // string[] | CSSStyleSheet | HTMLStyleElement
    return(// prefer the raw text content of a CSSStyleSheet as it may include the resume data
    (target.ownerNode || target).textContent || (target.cssRules ? Array.from(target.cssRules, (rule)=>rule.cssText) : asArray(target)).join(''));
}
function resume(addClassName, insert) {
    // hydration from SSR sheet
    let textContent = stringify(this.target), RE = /\/\*!([\da-z]+),([\da-z]+)(?:,(.+?))?\*\//g;
    // only if this is a hydratable sheet
    if (RE.test(textContent)) {
        var match;
        let // 3. parse SSR styles
        lastMatch;
        // RE has global flag — reset index to get the first match as well
        RE.lastIndex = 0;
        // 1. start with a fresh sheet
        this.clear();
        // 2. add all existing class attributes to the token/className cache
        if ('undefined' != typeof document) for (let el of document.querySelectorAll('[class]'))addClassName(el.getAttribute('class'));
        for(; match = RE.exec(textContent), lastMatch && insert(// grep the cssText from the previous match end up to this match start
        textContent.slice(lastMatch.index + lastMatch[0].length, match?.index), {
            p: parseInt(lastMatch[1], 36),
            o: parseInt(lastMatch[2], 36) / 2,
            n: lastMatch[3]
        }), lastMatch = match;);
    }
}
/* no-op */ function auto(setup) {
    // If we run in the browser we call setup at latest when the body is inserted
    // This algorith works well for _normal_ scripts (`<script src="..."></script>`)
    // but not for modules because those are executed __after__ the DOM is ready
    // and we would have FOUC
    if ('undefined' != typeof document && document.currentScript) {
        let cancelAutoSetup = ()=>observer.disconnect(), observer = new MutationObserver((mutationsList)=>{
            for (let { target  } of mutationsList)// If we reach the body we immediately run the setup to prevent FOUC
            if (target === document.body) {
                setup();
                return cancelAutoSetup();
            }
        });
        return observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        }), cancelAutoSetup;
    }
    return noop;
}
/**
 * A proxy to the currently active Twind instance.
 */ let tw = /* #__PURE__ */ new Proxy(// just exposing the active as tw should work with most bundlers
// as ES module export can be re-assigned BUT some bundlers to not honor this
// -> using a delegation proxy here
noop, {
    apply (target, thisArg, args) {
        return active(args[0]);
    },
    get (target, property) {
        let value = (active || target)[property];
        return 'function' == typeof value ? value.bind(active) : value;
    }
});
/**
 * Manages a single Twind instance — works in browser, Node.js, Deno, workers...
 *
 * @param config
 * @param sheet
 * @param target
 * @returns
 */ function setup(config = {}, sheet = getSheet, target) {
    return active?.destroy(), active = observe(twind(config, 'function' == typeof sheet ? sheet() : sheet), target);
}
/**
 * Injects styles into the global scope and is useful for applications such as gloabl styles, CSS resets or font faces.
 *
 * It **does not** return a class name, but adds the styles within the base layer to the stylesheet directly.
 */ let injectGlobal = function(strings, ...interpolations) {
    ('function' == typeof this ? this : tw)(css({
        '@layer base': astish(strings, interpolations)
    }));
};
function install(config, isProduction = true) {
    let config$ = defineConfig(config);
    return setup({
        ...config$,
        // in production use short hashed class names
        hash: config$.hash ?? isProduction
    }, ()=>getSheet(!isProduction));
}
let keyframes = /* #__PURE__ */ function bind(thisArg) {
    return new Proxy(function keyframes(strings, ...interpolations) {
        return keyframes$(thisArg, '', strings, interpolations);
    }, {
        get (target, name) {
            return 'bind' === name ? bind : name in target ? target[name] : function namedKeyframes(strings, ...interpolations) {
                return keyframes$(thisArg, name, strings, interpolations);
            };
        }
    });
}();
function keyframes$(thisArg, name, strings, interpolations) {
    // lazy inject keyframes
    return {
        toString () {
            let ast = astish(strings, interpolations), keyframeName = escape(name + hash(JSON.stringify([
                name,
                ast
            ])));
            return(// lazy access tw
            ('function' == typeof thisArg ? thisArg : tw)(css({
                [`@keyframes ${keyframeName}`]: astish(strings, interpolations)
            })), keyframeName);
        }
    };
}
let apply = /* #__PURE__ */ nested('@'), shortcut = /* #__PURE__ */ nested('~');
function nested(marker) {
    return new Proxy(function nested(strings, ...interpolations) {
        return nested$('', strings, interpolations);
    }, {
        get (target, name) {
            return name in target ? target[name] : function namedNested(strings, ...interpolations) {
                return nested$(name, strings, interpolations);
            };
        }
    });
    function nested$(name, strings, interpolations) {
        return format(parse(name + marker + '(' + interpolate(strings, interpolations) + ')'));
    }
}
// Based on https://github.com/modulz/stitches
// No support for thunks yet — these may use props that are not in the generated class name
// and may therefore override each other
/**
 * Allows to extract the supported properties of a style function.
 *
 * Here is an example for `react`
 * ```js
 * import { HTMLAttributes } from "react";
 * import { style, PropsOf } from "twind";
 * const button = style({ ... })
 * type ButtonProps = PropsOf<typeof button>
 * export const Button = (props: ButtonProps & HTMLAttributes<HTMLButtonElement>) => {
 *   return <button className={style(props)} {...rest} />
 * }
 * ```
 */ /** initial breakpoint */ // TODO possible breakpoint from theme
/** initial breakpoint */ // eslint-disable-next-line @typescript-eslint/ban-types
/** Used as prefix */ /**
   * CSS Class associated with the current component.
   *
   * ```jsx
   * const button = style({
   *   base: css({
   *     color: "DarkSlateGray"
   *   })
   * })
   *
   * <div className={button()} />
   * ```
   * <br />
   */ /**
   * To be used as resolve within config.rules:
   *
   * ```js
   * {
   *   rules: [
   *     // label?prop=value&other=propValue
   *     // if the style has base eg no prop is required
   *     ['label(\\?.+)?', style( /* ... *\/ )],
   *
   *     // if the style requires at least one prop
   *     ['label\\?(.+)', style( /* ... *\/ )],
   *   ]
   * }
   * ```
   *
   * The first group is used to extract the props using {@link URLSearchParams}.
   */ /**
   * CSS Class associated with the current component.
   *
   * ```js
   * const button = style({
   *   base: css`
   *     color: "DarkSlateGray"
   *   `
   * })
   *
   * <div className={button.className} />
   * ```
   */ /**
   * CSS Selector associated with the current component.
   *
   * ```js
   * const button = style({
   *   base: css({
   *     color: "DarkSlateGray"
   *   })
   * })
   *
   * const Card = styled({
   *   base: css`
   *     & ${button.selector} {
   *       boxShadow: "0 0 0 5px"
   *     }
   *   `
   * })
   * ```
   */ let style = (base, config)=>'function' == typeof base ? createStyle(config, base) : createStyle(base);
function createStyle(config = {}, parent) {
    let { label ='style' , base , props: variants = {} , defaults: localDefaults , when =[]  } = config, defaults = {
        ...parent?.defaults,
        ...localDefaults
    }, id = hash(JSON.stringify([
        label,
        parent?.className,
        base,
        variants,
        defaults,
        when
    ])), // Layers:
    // component: 0b010
    // props: 0b011
    // when: 0b100
    className = register('', base || '', Layer.c);
    function register(mq, token, layer) {
        return define(// `<name>#<id>` or `<parent>~<name>#<id>`
        ((parent ? parent.className.replace(/#.+$/, '~') : '') + label + mq + id).replace(/[: ,()[\]]/, ''), layer, token && parse(token));
    }
    return Object.defineProperties(function style(allProps) {
        let isWithinRuleDeclaration, token;
        if (Array.isArray(allProps)) {
            isWithinRuleDeclaration = true;
            allProps = Object.fromEntries(new URLSearchParams(allProps[1]).entries());
        }
        let props = {
            ...defaults,
            ...allProps
        }, // If this style is used within config.rules we do NOT include the marker classes
        classNames = isWithinRuleDeclaration ? '' : (parent ? parent(props) + ' ' : '') + className;
        for(let variantKey in variants){
            let variant = variants[variantKey], propsValue = props[variantKey];
            if (propsValue === Object(propsValue)) {
                // inline responsive breakpoints
                let mq = '';
                token = '';
                for(let breakpoint in propsValue){
                    let breakpointToken = variant[propsValue[breakpoint]];
                    if (breakpointToken) {
                        mq += '@' + breakpoint + '-' + propsValue[breakpoint];
                        token += (token && ' ') + ('_' == breakpoint ? breakpointToken : breakpoint + ':(' + breakpointToken + ')');
                    }
                }
                token && (classNames += ' ' + register('--' + variantKey + '-' + mq, token, 402653184));
            } else (token = variant[propsValue]) && (classNames += ' ' + register('--' + variantKey + '-' + propsValue, token, 402653184));
        }
        return /* Shifts.layer */ when.forEach((match, index)=>{
            let mq = '';
            for(let variantKey in match[0]){
                let propsValue = props[variantKey];
                // TODO we ignore inline responsive breakpoints for now — what be the result??
                if (propsValue !== Object(propsValue) && '' + propsValue == '' + match[0][variantKey]) mq += (mq && '_') + variantKey + '-' + propsValue;
                else {
                    mq = '';
                    break;
                }
            }
            mq && (token = match[1]) && (classNames += ' ' + register('-' + index + '--' + mq, token, 536870912));
        }), /* Shifts.layer */ classNames;
    }, Object.getOwnPropertyDescriptors({
        className,
        defaults,
        selector: '.' + escape(className)
    }));
}
/**
 * Combines {@link tw} and {@link cx}.
 *
 * Using the default `tw` instance:
 *
 * ```js
 * import { tw } from 'twind'
 * tx`underline ${falsy && 'italic'}`
 * tx('underline', falsy && 'italic')
 * tx({'underline': true, 'italic': false})
 *
 * // using a custom twind instance
 * import { tw } from './custom/twind'
 * import { tw } from './custom/twind'
 * tx.bind(tw)
 * ```
 *
 * Using a custom `tw` instance:
 *
 * ```js
 * import { tx as tx$ } from 'twind'
 * import { tw } from './custom/twind'
 *
 * export const tx = tx$.bind(tw)
 *
 * tx`underline ${falsy && 'italic'}`
 * tx('underline', falsy && 'italic')
 * tx({'underline': true, 'italic': false})
 * ```
 *
 * @param this {@link Twind} instance to use (default: {@link tw})
 * @param strings
 * @param interpolations
 * @returns the class name
 */ let tx = function(strings, ...interpolations) {
    return ('function' == typeof this ? this : tw)(interpolate(strings, interpolations));
};
/**
 * Options for {@link inline}
 */ /**
   * {@link Twind} instance to use (default: {@link tw$ | module tw})
   */ /**
   * Allows to minify the resulting CSS.
   */ /**
   * Called to minify the CSS.
   *
   * @param css the CSS to minify
   * @param html the HTML that will be used — allows to only include above-the-fold CSS
   * @return the resulting CSS
   */ /**
 * Used for static HTML processing (usually to provide SSR support for your javascript-powered web apps)
 *
 * 1. parse the markup and process element classes with the provided Twind instance
 * 2. update the class attributes _if_ necessary
 * 3. inject a style element with the CSS as last element into the head
 * 4. return the HTML string with the final element classes
 *
 * ```js
 * import { inline } from 'twind'
 *
 * function render() {
 *   return inline(renderApp())
 * }
 * ```
 *
 * Minify CSS with [@parcel/css](https://www.npmjs.com/package/@parcel/css):
 *
 * ```js
 * import { inline } from 'twind'
 * import { transform } from '@parcel/css'
 *
 * function render() {
 *   return inline(renderApp(), { minify: (css) => transform({ filename: 'twind.css', code: Buffer.from(css), minify: true }) })
 * }
 * ```
 *
 * You can provide your own Twind instance:
 *
 * ```js
 * import { inline } from 'twind'
 * import { tw } from './custom/twind/instance'
 *
 * function render() {
 *   return inline(renderApp(), { tw })
 * }
 * ```
 *
 * @param markup HTML to process
 * @param tw a {@link Twind} instance
 * @returns the resulting HTML
 */ function inline(markup, options = {}) {
    let { tw: tw$1 = tw , minify =identity  } = 'function' == typeof options ? {
        tw: options
    } : options, { html , css  } = extract(markup, tw$1);
    // inject as last element into the head
    return html.replace('</head>', `<style data-twind>${minify(css, html)}</style></head>`);
}
/**
 * Result of {@link extract}
 */ /** The possibly modified HTML */ /** The generated CSS */ /**
 * Used for static HTML processing (usually to provide SSR support for your javascript-powered web apps)
 *
 * **Note**: Consider using {@link inline} instead.
 *
 * 1. parse the markup and process element classes with the provided Twind instance
 * 2. update the class attributes _if_ necessary
 * 3. return the HTML string with the final element classes
 *
 * ```js
 * import { extract } from 'twind'
 *
 * function render() {
 *   const { html, css } = extract(renderApp())
 *
 *   // inject as last element into the head
 *   return html.replace('</head>', `<style data-twind>${css}</style></head>`)
 * }
 * ```
 *
 * You can provide your own Twind instance:
 *
 * ```js
 * import { extract } from 'twind'
 * import { tw } from './custom/twind/instance'
 *
 * function render() {
 *   const { html, css } = extract(renderApp(), tw)
 *
 *   // inject as last element into the head
 *   return html.replace('</head>', `<style data-twind>${css}</style></head>`)
 * }
 * ```
 *
 * @param markup HTML to process
 * @param tw a {@link Twind} instance (default: twind managed tw)
 * @returns the possibly modified html and css
 */ function extract(html, tw$1 = tw) {
    let restore = tw$1.snapshot(), result = {
        html: consume(html, tw$1),
        css: stringify(tw$1.target)
    };
    return restore(), result;
}
/**
 * Used for static HTML processing (usually to provide SSR support for your javascript-powered web apps)
 *
 * **Note**: Consider using {@link inline} or {@link extract} instead.
 *
 * 1. parse the markup and process element classes with the provided Twind instance
 * 2. update the class attributes _if_ necessary
 * 3. return the HTML string with the final element classes
 *
 * ```js
 * import { consume, stringify, tw } from 'twind'
 *
 * function render() {
 *   const html = renderApp()
 *
 *   // remember global classes
 *   const restore = tw.snapshot()
 *
 *   // generated markup
 *   const markup = consume(html)
 *
 *   // create CSS
 *   const css = stringify(tw.target)
 *
 *   // restore global classes
 *   restore()
 *
 *   // inject as last element into the head
 *   return markup.replace('</head>', `<style data-twind>${css}</style></head>`)
 * }
 * ```
 *
 * You can provide your own Twind instance:
 *
 * ```js
 * import { consume, stringify } from 'twind'
 * import { tw } from './custom/twind/instance'
 *
 * function render() {
 *   const html = renderApp()
 *
 *   // remember global classes
 *   const restore = snapshot(tw.target)
 *
 *   // generated markup
 *   const markup = consume(html)
 *
 *   // restore global classes
 *   restore()
 *
 *   // create CSS
 *   const css = stringify(tw.target)
 *
 *   // inject as last element into the head
 *   return markup.replace('</head>', `<style data-twind>${css}</style></head>`)
 * }
 * ```
 *
 * @param markup HTML to process
 * @param tw a {@link Twind} instance
 * @returns possibly modified HTML
 */ function consume(markup, tw$1 = tw) {
    let result = '', lastChunkStart = 0;
    return !function(markup, onClass) {
        let mode = 1, startIndex = 0, quote = '', attributeName = '', commit = (currentIndex)=>{
            5 == mode && 'class' == attributeName && false === onClass(startIndex, currentIndex, quote) && (markup = '');
        };
        for(let position = 0; position < markup.length; position++){
            let char = markup[position];
            if (1 == mode) '<' == char && (mode = '!--' == markup.substr(position + 1, 3) ? 4 : 3);
            else if (4 == mode) '>' == char && '--' == markup.slice(position - 2, position) && (mode = 1);
            else if (quote) {
                if (char == quote && '\\' != markup[position - 1]) {
                    commit(position);
                    mode = 2;
                    quote = '';
                }
            } else if ('"' == char || "'" == char) {
                quote = char;
                startIndex += 1;
            } else if ('>' == char) {
                commit(position);
                mode = 1;
            } else if (mode) {
                // MODE_SLASH
                // Ignore everything until the tag ends
                if ('=' == char) {
                    attributeName = markup.slice(startIndex, position);
                    mode = 5;
                    startIndex = position + 1;
                } else if ('/' == char && (mode < 5 || '>' == markup[position + 1])) {
                    commit(position);
                    mode = // For now we are using a simple parser adapted from htm (https://github.com/developit/htm/blob/master/src/build.mjs)
                    // If we find any issues we can switch to something more sophisticated like
                    // - https://github.com/acrazing/html5parser
                    // - https://github.com/fb55/htmlparser2
                    0;
                } else if (/\s/.test(char)) {
                    // <a class=font-bold>
                    commit(position);
                    mode = 2;
                    startIndex = position + 1;
                }
            }
        }
    }(markup, (startIndex, endIndex, quote)=>{
        var quote1;
        let value = markup.slice(startIndex, endIndex), className = tw$1(// const value = markup.slice(startIndex, endIndex)
        // Lets handle some special react cases:
        //   * arbitrary values for `content-`
        //     <span class="before:content-[&#x27;asas&#x27;]"></span>
        //     <span class="before:content-[&quot;asas&quot;]"></span>
        //
        //   * self-referenced groups
        //     <span class="flex(&amp; col)"></span>
        //
        //     If a class name contains `'`, `"`, or `&` those will be replaced with HTML entities
        //     To fix this we replace those for depending on the actual symbol that is being used
        //     As an alternative we could always escape class names direcly in twind like react does
        //     but this works for now
        ('"' == (quote1 = quote) ? // `'` -> &#39; &apos; &#x27;
        value.replace(/(=|\[)(?:&#39;|&apos;|&#x27;)|(?:&#39;|&apos;|&#x27;)(])/g, "$1'$2") : "'" == quote1 ? // `"` -> &#34; &quot; &#x22;
        value.replace(/(=|\[)(?:&#34;|&quot;|&#x22;)|(?:&#34;|&quot;|&#x22;)(])/g, '$1"$2') : value).replace(/&amp;/g, '&'));
        // We only need to shift things around if we need to actually change the markup
        if (changed(value, className)) {
            // We've hit another mutation boundary
            // Add quote if necessary
            quote = quote ? '' : '"';
            result += markup.slice(lastChunkStart, startIndex) + quote + className + quote;
            lastChunkStart = endIndex;
        }
    }), // Combine the current result with the tail-end of the input
    result + markup.slice(lastChunkStart, markup.length);
}
export { animation, apply, arbitrary, asArray, auto, autoDarkColor, colorFromTheme, consume, css, cssom, cx, defineConfig, dom, escape, extract, fromMatch, fromTheme, getAutocompleteProvider, getSheet, hash, identity, injectGlobal, inline, install, keyframes, match, matchColor, matchTheme, mql, noop, normalize, observe, parse, setup, shortcut, stringify, style, toCSS, toColorValue, tw, twind, tx, virtual, withAutocomplete };
//# sourceMappingURL=twind.js.map
