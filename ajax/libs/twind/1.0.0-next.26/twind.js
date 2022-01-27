function parseColorComponent(chars, factor) {
    return Math.round(parseInt(chars, 16) * factor);
}
function toColorValue(color, options = {}) {
    if (typeof color == 'function') {
        return color(options);
    }
    const { opacityValue ='1' , opacityVariable  } = options;
    const opacity = opacityVariable ? `var(${opacityVariable})` : opacityValue;
    if (opacity == '1') return color;
    if (opacity == '0') return '#0000';
    // rgb hex: #0123 and #001122
    if (color[0] == '#' && (color.length == 4 || color.length == 7)) {
        const size = (color.length - 1) / 3;
        const factor = [
            17,
            1,
            0.062272
        ][size - 1];
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `rgba(${[
            parseColorComponent(color.substr(1, size), factor),
            parseColorComponent(color.substr(1 + size, size), factor),
            parseColorComponent(color.substr(1 + 2 * size, size), factor),
            opacity, 
        ]})`;
    }
    return color;
}

/**
 * Determines if two class name strings contain the same classes.
 *
 * @param a first class names
 * @param b second class names
 * @returns are they different
 */ function changed(a, b) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return a != b && '' + a.split(' ').sort() != '' + b.split(' ').sort();
}

const escape = typeof CSS !== 'undefined' && CSS.escape || // Simplified: escaping only special characters
// Needed for NodeJS and Edge <79 (https://caniuse.com/mdn-api_css_escape)
((className)=>className// Simplifed escape testing only for chars that we know happen to be in tailwind directives
    .replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, '\\$&')// If the character is the first character and is in the range [0-9] (2xl, ...)
    // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
    .replace(/^\d/, '\\3$& ')
);
// Based on https://stackoverflow.com/a/52171480
function hash(value) {
    // eslint-disable-next-line no-var
    for(var h = 9, index = value.length; index--;){
        h = Math.imul(h ^ value.charCodeAt(index), 1597334677);
    }
    return '#' + ((h ^ h >>> 9) >>> 0).toString(36);
}
function mql(screen1, prefix = '@media ') {
    return prefix + asArray(screen1).map((screen)=>{
        if (typeof screen == 'string') {
            screen = {
                min: screen
            };
        }
        return screen.raw || Object.keys(screen).map((feature)=>`(${feature}-width:${screen[feature]})`
        ).join(' and ');
    }).join(',');
}
function asArray(value = []) {
    return Array.isArray(value) ? value : value == null ? [] : [
        value
    ];
}
function identity(value) {
    return value;
}
function noop() {
// no-op
}

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
const Layer = {
    /**
   * 1. `default` (public)
   */ d: 0 << 27 /* Shifts.layer */ ,
    /**
   * 2. `base` (public) —for things like reset rules or default styles applied to plain HTML elements.
   */ b: 1 << 27 /* Shifts.layer */ ,
    /**
   * 3. `components` (public, used by `style()`) — is for class-based styles that you want to be able to override with utilities.
   */ c: 2 << 27 /* Shifts.layer */ ,
    // reserved for style():
    // - props: 0b011
    // - when: 0b100
    /**
   * 6. `shortcuts` (public, used by `apply()`) — `~(...)`
   */ s: 5 << 27 /* Shifts.layer */ ,
    /**
   * 6. `utilities` (public) — for small, single-purpose classes
   */ u: 6 << 27 /* Shifts.layer */ ,
    /**
   * 7. `overrides` (public, used by `css()`)
   */ o: 7 << 27 /* Shifts.layer */ 
};
/*
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
*/ function moveToLayer(precedence, layer) {
    // Set layer (first reset, than set)
    return precedence & ~Layer.o | layer;
}
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
| 4    | number of selectors (descending) |
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
    return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(css) ? +RegExp.$1 / (RegExp.$2 ? 15 : 1) / 10 : 0, 15) << 22 | Math.min(seperatorPrecedence(css), 15) << 18;
}
// Pesudo variant presedence
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
const PRECEDENCES_BY_PSEUDO_CLASS = [
    /* fi */ 'rst-c' /* hild: 0 */ ,
    /* la */ 'st-ch' /* ild: 1 */ ,
    // even and odd use: nth-child
    /* nt */ 'h-chi' /* ld: 2 */ ,
    /* an */ 'y-lin' /* k: 3 */ ,
    /* li */ 'nk' /* : 4 */ ,
    /* vi */ 'sited' /* : 5 */ ,
    /* ch */ 'ecked' /* : 6 */ ,
    /* em */ 'pty' /* : 7 */ ,
    /* re */ 'ad-on' /* ly: 8 */ ,
    /* fo */ 'cus-w' /* ithin : 9 */ ,
    /* ho */ 'ver' /* : 10 */ ,
    /* fo */ 'cus' /* : 11 */ ,
    /* fo */ 'cus-v' /* isible : 12 */ ,
    /* ac */ 'tive' /* : 13 */ ,
    /* di */ 'sable' /* d : 14 */ ,
    /* op */ 'tiona' /* l: 15 */ ,
    /* re */ 'quire' /* d: 16 */ , 
];
function pseudoPrecedence(selector) {
    // use first found pseudo-class
    return 1 << ~(/:([a-z-]+)/.test(selector) && ~PRECEDENCES_BY_PSEUDO_CLASS.indexOf(RegExp.$1.slice(2, 7)) || ~17);
}
// https://github.com/kripod/otion/blob/main/packages/otion/src/propertyMatchers.ts
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
function declarationPropertyPrecedence(property) {
    return property[0] == '-' ? 0 : seperatorPrecedence(property) + (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7}$)|([fl].{5}l|g.{8}$|pl))/.test(property) ? +!!RegExp.$1 /* +1 */  || -!!RegExp.$2 /* -1 */  : 0) + 1;
}
function convert({ n: name , i: important , v: variants = []  }, context, precedence, conditions) {
    if (name) {
        name = toClassName({
            n: name,
            i: important,
            v: variants
        });
    }
    conditions = [
        ...asArray(conditions)
    ];
    for (const variant of variants){
        const screen = context.theme('screens', variant);
        const condition = screen && mql(screen) || context.v(variant);
        conditions.push(condition);
        precedence |= screen ? 1 << 26 | atRulePrecedence(condition) : variant == 'dark' ? 1 << 30 /* Shifts.darkMode */  : condition[0] == '@' ? atRulePrecedence(condition) : pseudoPrecedence(condition);
    }
    return {
        n: name,
        p: precedence,
        r: conditions,
        i: important
    };
}

const collator = new Intl.Collator('en', {
    numeric: true
});
/**
 * Find the array index of where to add an element to keep it sorted.
 *
 * @returns The insertion index
 */ function sortedInsertionIndex(array, element) {
    // Find position using binary search
    // eslint-disable-next-line no-var
    for(var low = 0, high = array.length; low < high;){
        const pivot = high + low >> 1;
        // Less-Then-Equal to add new equal element after all existing equal elements (stable sort)
        if (compareTwindRules(array[pivot], element) <= 0) {
            low = pivot + 1;
        } else {
            high = pivot;
        }
    }
    return high;
}
function compareTwindRules(a, b) {
    // base and overrides (css) layers are kept in order they are declared
    const layer = a.p & Layer.o;
    if (layer == (b.p & Layer.o) && (layer == Layer.b || layer == Layer.o)) {
        return 0;
    }
    return a.p - b.p || a.o - b.o || collator.compare(a.r, b.r) || collator.compare(a.n, b.n);
}

function stringify$1(rule) {
    if (rule.d) {
        const groups = [];
        const selector1 = rule.r.reduce((selector, condition)=>{
            if (condition[0] == '@') {
                groups.unshift(condition);
                return selector;
            }
            // Go over the selector and replace the matching multiple selectors if any
            return selector.replace(/^$| *((?:\\,|\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (_, selectorPart = _, comma1 = '')=>// Return the current selector with the key matching multiple selectors if any
                condition.replace(/ *((?:\\,|\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, // If the current condition has a nested selector replace it
                (_, conditionPart, comma = '')=>conditionPart.replace(/&/g, selectorPart) + comma
                ) + comma1
            );
        }, rule.n ? '.' + escape(rule.n) : '');
        if (selector1) {
            groups.push(selector1);
        }
        return groups.reduceRight((body, grouping)=>grouping + '{' + body + '}'
        , rule.d);
    }
}

function makeThemeFunction({ extend ={} , ...base }) {
    const resolved = {};
    const resolveContext = {
        colors: theme('colors'),
        theme,
        // Stub implementation as negated values are automatically infered and do _not_ need to be in the theme
        negative () {
            return {};
        },
        breakpoints (screens) {
            const breakpoints = {};
            for(const key in screens){
                if (typeof screens[key] == 'string') {
                    breakpoints['screen-' + key] = screens[key];
                }
            }
            return breakpoints;
        }
    };
    return theme;
    function theme(sectionKey, key, defaultValue) {
        if (sectionKey) {
            if (/[.[]/.test(sectionKey)) {
                const path = [];
                // dotted deep access: colors.gray.500 or or spacing[2.5]
                sectionKey.replace(/\[([^\]]+)\]|([^.[]+)/g, (_, $1, $2 = $1)=>path.push($2)
                );
                sectionKey = path.shift();
                defaultValue = key;
                key = path.join('-');
            }
            const section = resolved[sectionKey] || // two-step deref to allow extend section to reference base section
            Object.assign(Object.assign(// Make sure to not get into recursive calls
            (resolved[sectionKey] = {}), deref(base, sectionKey)), deref(extend, sectionKey));
            if (key == null) return section;
            return section[key || 'DEFAULT'] ?? defaultValue;
        }
        // Collect the whole theme
        const result = {};
        for(const section in base){
            result[section] = theme(section);
        }
        return result;
    }
    function deref(source, section) {
        let value = source[section];
        if (typeof value == 'function') {
            value = value(resolveContext);
        }
        if (value && /color/i.test(section)) {
            return flattenColorPalette(value);
        }
        return value;
    }
}
function flattenColorPalette(colors, path = []) {
    const flattend = {};
    for(const key in colors){
        const value = colors[key];
        const keyPath = key == 'DEFAULT' ? path : [
            ...path,
            key
        ];
        if (typeof value == 'object') {
            Object.assign(flattend, flattenColorPalette(value, keyPath));
        }
        flattend[keyPath.join('-')] = value;
        if (key == 'DEFAULT') {
            flattend[[
                ...path,
                key
            ].join('-')] = value;
        }
    }
    return flattend;
}

function createContext({ theme , darkMode , variants , rules , hash: hash$1 , stringify , ignorelist  }) {
    // Used to cache resolved rule values
    const variantCache = new Map();
    // lazy created resolve functions
    const variantResolvers = new Map();
    // Used to cache resolved rule values
    const ruleCache = new Map();
    // lazy created resolve functions
    const ruleResolvers = new Map();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const ignored = createRegExpExecutor(ignorelist, (value, condition)=>condition.test(value)
    );
    // add dark as last variant to allow user to override it
    // we can modify variants as it has been passed through defineConfig which already made a copy
    variants.push([
        'dark',
        darkMode == 'class' ? '.dark &' : typeof darkMode === 'string' && darkMode != 'media' ? darkMode // a custom selector
         : '@media (prefers-color-scheme:dark)', 
    ]);
    return {
        theme: makeThemeFunction(theme),
        e: escape,
        h: typeof hash$1 == 'function' ? (value)=>hash$1(value, hash)
         : hash$1 ? hash : identity,
        s (property, value) {
            return stringify(property, value, this);
        },
        v (value) {
            if (!variantCache.has(value)) {
                variantCache.set(value, find(value, variants, variantResolvers, getVariantResolver, this) || '&:' + value);
            }
            return variantCache.get(value);
        },
        r (value) {
            if (!ruleCache.has(value)) {
                ruleCache.set(value, // TODO console.warn(`[twind] unknown rule "${value}"`),
                !ignored(value, this) && find(value, rules, ruleResolvers, getRuleResolver, this));
            }
            return ruleCache.get(value);
        }
    };
}
function find(value, list, cache, getResolver, context) {
    for (const item of list){
        let resolver = cache.get(item);
        if (!resolver) {
            cache.set(item, resolver = getResolver(item));
        }
        const resolved = resolver(value, context);
        if (resolved) return resolved;
    }
}
function getVariantResolver(variant) {
    return createVariantFunction(variant[0], variant[1]);
}
function getRuleResolver(rule) {
    if (Array.isArray(rule)) {
        return createResolveFunction(rule[0], rule[1], rule[2]);
    }
    return createResolveFunction(rule);
}
function createVariantFunction(condition, resolve) {
    return createResolve(condition, typeof resolve == 'function' ? resolve : ()=>resolve
    );
}
function createResolveFunction(condition, resolve, convert) {
    // This is a shortcuts object
    if (Object.getPrototypeOf(condition) === Object.prototype) {
        return createExecutor(// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Object.keys(condition).map((key)=>{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            const value = condition[key];
            return createResolveFunction(key, typeof value == 'function' ? value : ()=>value
            );
        }), (value, resolver, context)=>{
            // We need to move the result into the shortcuts layer
            const resolved = resolver(value, context);
            // return resolved
            return resolved && {
                '@layer shortcuts': {
                    '@apply': resolved
                }
            };
        });
    }
    return createResolve(condition, !resolve ? (match)=>({
            [match[1]]: maybeNegate(match.input, match.slice(2).find(Boolean) || match.$$ || match.input)
        })
     : typeof resolve == 'string' ? (match, context)=>({
            [resolve]: convert ? convert(match, context) : maybeNegate(match.input, match.slice(1).find(Boolean) || match.$$ || match.input)
        })
     : typeof resolve == 'function' ? resolve : ()=>resolve
    );
}
function maybeNegate($_, value) {
    return $_[0] == '-' ? `calc(${value} * -1)` : value;
}
function createResolve(condition1, resolve) {
    return createRegExpExecutor(condition1, (value, condition, context)=>exec(value, condition, resolve, context)
    );
}
function exec(value, condition, resolve, context) {
    const match = condition.exec(value);
    if (match) {
        // MATCH.$_ = value
        match.$$ = value.slice(match[0].length);
        return resolve(match, context);
    }
}
function createRegExpExecutor(condition, run) {
    return createExecutor(asArray(condition).map(asRegExp), run);
}
function createExecutor(conditions, run) {
    return (value, context)=>{
        for (const condition of conditions){
            const result = run(value, condition, context);
            if (result) return result;
        }
    };
}
function asRegExp(value) {
    // "visible" -> /^visible$/
    // "(float)-(left|right|none)" -> /^(float)-(left|right|none)$/
    // "auto-rows-" -> /^auto-rows-/
    // "gap(-|$)" -> /^gap(-|$)/
    return typeof value == 'string' ? new RegExp('^' + value + (value.includes('$') || value.slice(-1) == '-' ? '' : '$')) : value;
}

const registry = new Map();
function register(className, factory) {
    registry.set(className, factory);
    return className;
}
function resolve(rule, context) {
    const factory = registry.get(rule.n);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    return factory ? factory(rule, context) : context.r(rule.n);
}

function define(className, layer, rules, useOrderOfRules) {
    return register(className, (rule, context)=>{
        const { n: name , p: precedence , r: conditions , i: important  } = convert(rule, context, layer);
        return rules && translateWith(name, layer, rules, context, precedence, conditions, important, useOrderOfRules);
    });
}

function format(rules, seperator = ',') {
    return rules.map(toClassName).join(seperator);
}

function createRule(active, current) {
    if (active[active.length - 1] != '(') {
        const variants = [];
        let important = false;
        let negated = false;
        let name = '';
        for (let value of active){
            if (value == '(' || /[~@]$/.test(value)) continue;
            if (value[0] == '!') {
                value = value.slice(1);
                important = !important;
            }
            if (value.endsWith(':')) {
                variants[value == 'dark:' ? 'unshift' : 'push'](value.slice(0, -1));
                continue;
            }
            if (value[0] == '-') {
                value = value.slice(1);
                negated = !negated;
            }
            if (value.endsWith('-')) {
                value = value.slice(0, -1);
            }
            if (value && value != '&') {
                name += (name && '-') + value;
            }
        }
        if (name) {
            if (negated) name = '-' + name;
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
// Remove comments (multiline and single line)
function removeComments(tokens) {
    return tokens.replace(/\/\*[^]*?\*\/|\/\/[^]*?$|\s\s+|\n/gm, ' ');
}
const cache = new Map();
function parse(token) {
    let parsed = cache.get(token);
    if (!parsed) {
        token = removeComments(token);
        // Stack of active groupings (`(`), variants, or nested (`~` or `@`)
        const active = [];
        // Stack of current rule list to put new rules in
        // the first `0` element is the current list
        const current = [
            []
        ];
        let startIndex = 0;
        let skip = 0;
        let position = 0;
        // eslint-disable-next-line no-inner-declarations
        const commit = (isRule, endOffset = 0)=>{
            if (startIndex != position) {
                active.push(token.slice(startIndex, position + endOffset));
                if (isRule) {
                    createRule(active, current);
                }
            }
            startIndex = position + 1;
        };
        for(; position < token.length; position++){
            const char = token[position];
            if (skip) {
                // within [...]
                // skip over until not skipping
                // ignore escaped chars
                if (token[position - 1] != '\\') {
                    skip += +(char == '[') || -(char == ']');
                }
            } else if (char == '[') {
                // start to skip
                skip += 1;
            } else if (char == '(') {
                // hover:(...) or utilitity-(...)
                commit();
                active.push(char);
            } else if (char == ':') {
                // hover: or after::
                if (token[position + 1] != ':') {
                    commit(false, 1);
                }
            } else if (/[\s,)]/.test(char)) {
                // whitespace, comma or closing brace
                commit(true);
                let lastGroup = active.lastIndexOf('(');
                if (char == ')') {
                    // Close nested block
                    const nested = active[lastGroup - 1];
                    if (/[~@]$/.test(nested)) {
                        const rules = current.shift();
                        active.length = lastGroup;
                        // remove variants that are already applied through active
                        createRule([
                            ...active,
                            '#'
                        ], current);
                        const { v  } = current[0].pop();
                        for (const rule of rules){
                            // if a rule has dark we need to splice after the first entry eg dark
                            rule.v.splice(+(rule.v[0] == 'dark') - +(v[0] == 'dark'), v.length);
                        }
                        createRule([
                            ...active,
                            define(// named nested
                            nested.length > 1 ? nested.slice(0, -1) + hash(JSON.stringify([
                                nested,
                                rules
                            ])) : nested + '(' + format(rules) + ')', Layer.s, rules, /@$/.test(nested)), 
                        ], current);
                    }
                    lastGroup = active.lastIndexOf('(', lastGroup - 1);
                }
                active.length = lastGroup + 1;
            } else if (/[~@]/.test(char) && token[position + 1] == '(') {
                // start nested block
                // ~(...) or button~(...)
                // @(...) or button@(...)
                current.unshift([]);
            }
        }
        // Consume remaining stack
        commit(true);
        cache.set(token, parsed = current[0]);
    }
    return parsed;
}

function serialize(style, rule, context, precedence, conditions = []) {
    return serialize$(style, convert(rule, context, precedence, conditions), context);
}
function serialize$(style, { n: name , p: precedence , r: conditions = [] , i: important  }, context) {
    const rules = [];
    // The generated declaration block eg body of the css rule
    let declarations = '';
    // This ensures that 'border-top-width' has a higher precedence than 'border-top'
    let maxPropertyPrecedence = 0;
    // More specific utilities have less declarations and a higher precedence
    let numberOfDeclarations = 0;
    for(let key in style || {}){
        const value1 = style[key];
        if (key[0] == '@') {
            if (!value1) continue;
            // at rules: https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
            switch(key[1]){
                // @apply ...;
                case 'a':
                    {
                        rules.push(...translateWith(name, precedence, parse(value1), context, precedence, conditions, important, true));
                        continue;
                    }
                // @layer <layer>
                case 'l':
                    {
                        for (const css of asArray(value1)){
                            rules.push(...serialize$(css, {
                                n: name,
                                p: moveToLayer(precedence, Layer[key[7]]),
                                r: conditions,
                                i: important
                            }, context));
                        }
                        continue;
                    }
                // @import
                case 'i':
                    {
                        rules.push({
                            // before all layers
                            p: -1,
                            o: 0,
                            r: [],
                            d: asArray(value1).filter(Boolean).map((value)=>key + ' ' + value
                            ).join(';')
                        });
                        continue;
                    }
                // @keyframes
                // @font-face
                // TODO @font-feature-values
                case 'k':
                case 'f':
                    {
                        // Use base layer
                        rules.push({
                            p: Layer.d,
                            o: 0,
                            r: [
                                key
                            ],
                            d: serialize$(value1, {
                                p: Layer.d
                            }, context).map(stringify$1).join('')
                        });
                        continue;
                    }
            }
        }
        // @media
        // @supports
        // selector
        if (typeof value1 == 'object' && !Array.isArray(value1)) {
            // at-rule or non-global selector
            if (key[0] == '@' || key.includes('&')) {
                let rulePrecedence = precedence;
                if (key[0] == '@') {
                    // Handle `@media screen(sm)` and `@media (screen(sm) or ...)`
                    key = key.replace(/\bscreen\(([^)]+)\)/g, (_, screenKey)=>{
                        const screen = context.theme('screens', screenKey);
                        if (screen) {
                            rulePrecedence |= 1 << 26 /* Shifts.screens */ ;
                            return mql(screen, '');
                        }
                        return _;
                    });
                    rulePrecedence |= atRulePrecedence(key);
                }
                rules.push(...serialize$(value1, {
                    n: name,
                    p: rulePrecedence,
                    r: [
                        ...conditions,
                        key
                    ],
                    i: important
                }, context));
            } else {
                // global selector
                rules.push(...serialize$(value1, {
                    p: precedence,
                    r: [
                        key
                    ]
                }, context));
            }
        } else if (key == 'label' && value1) {
            name = value1 + hash(JSON.stringify([
                precedence,
                important,
                style
            ]));
        } else if (value1 || value1 === 0) {
            // property -> hyphenate
            key = key.replace(/[A-Z]/g, '-$&').toLowerCase();
            // Update precedence
            numberOfDeclarations += 1;
            maxPropertyPrecedence = Math.max(maxPropertyPrecedence, declarationPropertyPrecedence(key));
            declarations += (declarations ? ';' : '') + asArray(value1).map((value)=>context.s(key, // support theme(...) function in values
                // calc(100vh - theme('spacing.12'))
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                resolveThemeFunction('' + value, context) + (important ? ' !important' : ''))
            ).join(';');
        }
    }
    rules.unshift({
        n: name && context.h(name),
        p: precedence,
        o: // number of declarations (descending)
        Math.max(0, 15 - numberOfDeclarations) + // greatest precedence of properties
        // if there is no property precedence this is most likely a custom property only declaration
        // these have the highest precedence
        Math.min(maxPropertyPrecedence || 15, 15) * 1.5,
        r: conditions,
        // stringified declarations
        d: declarations
    });
    // only keep layer bits for merging
    return rules.sort(compareTwindRules);
}
function resolveThemeFunction(value3, context) {
    // support theme(...) function in values
    // calc(100vh - theme('spacing.12'))
    // theme('borderColor.DEFAULT', 'currentColor')
    return value3.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g, (_, __, key, ___, value)=>context.theme(key, value)
    );
}

function merge(rules, name) {
    // merge:
    // - same conditions
    // - replace name with hash of name + condititions + declarations
    // - precedence:
    //   - combine bits or use max precendence
    //   - set layer bit to merged
    const result = [];
    let current;
    for (const rule of rules){
        if (!rule.d) {
            result.push({
                ...rule,
                n: rule.n && name
            });
        } else if (current?.p == rule.p && '' + current.r == '' + rule.r) {
            current.c = [
                current.c,
                rule.c
            ].filter(Boolean).join(' ');
            current.d = [
                current.d,
                rule.d
            ].filter(Boolean).join(';');
        } else {
            // only set name for named rules eg not for global or className propagation rules
            result.push(current = {
                ...rule,
                n: rule.n && name
            });
        }
    }
    return result;
}

function translate(rules, context, precedence = Layer.u, conditions, important) {
    // Sorted by precedence
    const result = [];
    for (const rule of rules){
        for (const cssRule of translate$(rule, context, precedence, conditions, important)){
            result.splice(sortedInsertionIndex(result, cssRule), 0, cssRule);
        }
    }
    return result;
}
function translate$(rule1, context, precedence, conditions, important) {
    rule1 = {
        ...rule1,
        i: rule1.i || important
    };
    const resolved = resolve(rule1, context);
    if (!resolved) {
        // propagate className as is
        return [
            {
                c: toClassName(rule1),
                p: 0,
                o: 0,
                r: []
            }
        ];
    }
    // a list of class names
    if (typeof resolved == 'string') {
        ({ r: conditions , p: precedence  } = convert(rule1, context, precedence, conditions));
        return merge(translate(parse(resolved), context, precedence, conditions, rule1.i), rule1.n);
    }
    if (Array.isArray(resolved)) {
        return resolved.map((rule)=>({
                o: 0,
                ...rule,
                r: [
                    ...asArray(conditions),
                    ...asArray(rule.r)
                ],
                p: moveToLayer(precedence, rule.p ?? precedence)
            })
        );
    }
    return serialize(resolved, rule1, context, precedence, conditions);
}
function translateWith(name, layer, rules, context, precedence, conditions, important, useOrderOfRules) {
    return merge((useOrderOfRules ? rules.flatMap((rule)=>translate([
            rule
        ], context, precedence, conditions, important)
    ) : translate(rules, context, precedence, conditions, important)).map((rule)=>// do not move defaults
        // move only rules with a name unless they are in the base layer
        rule.p & Layer.o && (rule.n || layer == Layer.b) ? {
            ...rule,
            p: moveToLayer(rule.p, layer),
            o: 0
        } : rule
    ), name);
}

function defineConfig({ presets =[] , ...userConfig }) {
    // most user config values go first to have precendence over preset config
    // only `preflight` and `theme` are applied as last preset to override all presets
    let config = {
        preflight: userConfig.preflight !== false && [],
        darkMode: undefined,
        theme: {},
        variants: asArray(userConfig.variants),
        rules: asArray(userConfig.rules),
        ignorelist: asArray(userConfig.ignorelist),
        hash: userConfig.hash,
        stringify: userConfig.stringify || noprefix
    };
    for (const preset of asArray([
        ...presets,
        {
            darkMode: userConfig.darkMode,
            preflight: userConfig.preflight !== false && asArray(userConfig.preflight),
            theme: userConfig.theme
        }, 
    ])){
        const { preflight , darkMode =config.darkMode , theme , variants , rules , hash =config.hash , ignorelist , stringify =config.stringify ,  } = typeof preset == 'function' ? preset(config) : preset;
        config = {
            // values defined by user or previous presets take precedence
            preflight: config.preflight !== false && preflight !== false && [
                ...config.preflight,
                ...asArray(preflight)
            ],
            darkMode,
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

function twind(userConfig, sheet) {
    const config = defineConfig(userConfig);
    const context = createContext(config);
    // Map of tokens to generated className
    const cache = new Map();
    // An array of precedence by index within the sheet
    // always sorted
    const sortedPrecedences = [];
    // Cache for already inserted css rules
    // to prevent double insertions
    const insertedRules = new Set();
    function insert(rule) {
        rule = {
            ...rule,
            n: rule.n && context.h(rule.n)
        };
        const css = stringify$1(rule);
        // If not already inserted
        if (css && !insertedRules.has(css)) {
            // Mark rule as inserted
            insertedRules.add(css);
            // Find the correct position
            const index = sortedInsertionIndex(sortedPrecedences, rule);
            // Insert
            sheet.insert(css, index, rule);
            // Update sorted index
            sortedPrecedences.splice(index, 0, rule);
        }
        return rule.n;
    }
    return Object.defineProperties(function tw(tokens) {
        if (!cache.size) {
            for (let preflight of asArray(config.preflight)){
                if (typeof preflight == 'function') {
                    preflight = preflight(context);
                }
                if (preflight) {
                    (typeof preflight == 'string' ? translateWith('', Layer.b, parse(preflight), context, Layer.b, [], false, true) : serialize(preflight, {}, context, Layer.b)).forEach(insert);
                }
            }
        }
        let className = cache.get(tokens);
        if (!className) {
            const classNames = new Set();
            for (const rule of translate(parse(tokens), context)){
                classNames.add(rule.c).add(insert(rule));
            }
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
        clear () {
            sheet.clear();
            insertedRules.clear();
            cache.clear();
            sortedPrecedences.length = 0;
        },
        destroy () {
            this.clear();
            sheet.destroy();
        }
    }));
}

function observe(tw$1 = tw, target1 = typeof document != 'undefined' && document.documentElement) {
    if (!target1) return tw$1;
    const observer = new MutationObserver(handleMutationRecords);
    observer.observe(target1, {
        attributeFilter: [
            'class'
        ],
        subtree: true,
        childList: true
    });
    // handle class attribute on target
    handleClassAttributeChange(target1);
    // handle children of target
    handleMutationRecords([
        {
            target: target1,
            type: ''
        }
    ]);
    // monkey patch tw.destroy to disconnect this observer
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { destroy  } = tw$1;
    tw$1.destroy = ()=>{
        observer.disconnect();
        destroy.call(tw$1);
    };
    return tw$1;
    function handleMutationRecords(records) {
        for (const { type , target  } of records){
            if (type[0] == 'a' /* attribute */ ) {
                // class attribute has been changed
                handleClassAttributeChange(target);
            } else {
                target.querySelectorAll('[class]').forEach(handleClassAttributeChange);
            }
        }
        // remove pending mutations — these are triggered by updating the class attributes
        observer.takeRecords();
    // XXX maybe we need to handle all pending mutations
    // observer.takeRecords().forEach(handleMutation)
    }
    function handleClassAttributeChange(target) {
        // Not using target.classList.value (not supported in all browsers) or target.class (this is an SVGAnimatedString for svg)
        const tokens = target.getAttribute('class');
        let className;
        // try do keep classNames unmodified
        if (tokens && changed(tokens, className = tw$1(tokens))) {
            // Not using `target.className = ...` as that is read-only for SVGElements
            target.setAttribute('class', className);
        }
    }
}

function createStyleElement(// 1. look for existing style element — usually from SSR
// 2. append to document.head — this assumes that document.head has at least one child node
referenceNode = document.querySelector('style[data-twind]') || document.head.lastChild) {
    // insert new style element after existing element which allows to override styles
    return referenceNode.parentNode.insertBefore(document.createElement('style'), referenceNode.nextSibling);
}
function cssom(target = createStyleElement().sheet) {
    return {
        target,
        clear () {
            // remove all added rules
            for(let index = target.cssRules.length; index--;){
                target.deleteRule(index);
            }
        },
        destroy () {
            target.ownerNode?.remove();
        },
        insert (css, index) {
            try {
                // Insert
                target.insertRule(css, index);
            } catch (error) {
                // Empty rule to keep index valid — not using `*{}` as that would show up in all rules (DX)
                target.insertRule(':root{}', index);
                // Some thrown errors are because of specific pseudo classes
                // lets filter them to prevent unnecessary warnings
                // ::-moz-focus-inner
                // :-moz-focusring
                if (!/:-[mwo]/.test(css)) {
                    console.warn(error, css);
                }
            }
        }
    };
}
function dom(target = createStyleElement()) {
    return {
        target,
        clear () {
            // remove all added nodes
            while(target.childNodes.length){
                target.removeChild(target.lastChild);
            }
        },
        destroy () {
            target.remove();
        },
        insert (css, index) {
            target.insertBefore(document.createTextNode(css), target.childNodes[index] || null);
        }
    };
}
function virtual(target = []) {
    return {
        target,
        clear () {
            target.length = 0;
        },
        destroy () {
            this.clear();
        },
        insert (css, index) {
            target.splice(index, 0, css);
        }
    };
}
function stringify(target) {
    // string[] | CSSStyleSheet | HTMLStyleElement
    return target.innerHTML || // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (target.cssRules ? Array.from(target.cssRules, (rule)=>rule.cssText
    ) : asArray(target)).join('');
}

function auto(setup1) {
    // If we run in the browser we call setup at latest when the body is inserted
    // This algorith works well for _normal_ scripts (`<script src="..."></script>`)
    // but not for modules because those are executed __after__ the DOM is ready
    // and we would have FOUC
    if (typeof document != 'undefined' && document.currentScript) {
        const cancelAutoSetup = ()=>observer.disconnect()
        ;
        const observer = new MutationObserver((mutationsList)=>{
            for (const { target  } of mutationsList){
                // If we reach the body we immediately run the setup to prevent FOUC
                if (target === document.body) {
                    setup1();
                    return cancelAutoSetup();
                }
            }
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        return cancelAutoSetup;
    }
    return noop;
}
/**
 * A proxy to the currently active Twind instance.
 */ const tw = /* @__PURE__ */ Object.defineProperties(function tw(...args) {
    return active(...args);
}, Object.getOwnPropertyDescriptors({
    get target () {
        return active.target;
    },
    theme (...args) {
        return active.theme(...args);
    },
    clear () {
        return active.clear();
    },
    destroy () {
        return active.destroy();
    }
}));
let active;
function setup(config = {}, sheet = typeof document != 'undefined' ? cssom() : virtual(), target) {
    const firstRun = !active;
    if (!firstRun) {
        active.destroy();
    }
    active = observe(twind(config, sheet), target);
    if (firstRun && typeof document != 'undefined') {
        // first run in browser
        // remove server-side generated style element
        // after `observe` twind has taken over and the SSR styles are no longer used
        document.querySelector('style[data-twind]')?.remove();
        // If they body was hidden autofocus the first element
        if (!document.activeElement) {
            document.querySelector('[autofocus]')?.focus();
        }
    }
    return active;
}

/**
 * Used for static HTML processing (usually to provide SSR support for your javascript-powered web apps)
 *
 * **Note**: Consider using {@link inject} or {@link extract} instead.
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
 *   // clear all styles — optional
 *   tw.clear()
 *
 *   // generated markup
 *   const markup = consume(html)
 *
 *   // create CSS
 *   const css = stringify(tw.target)
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
 *   // clear all styles — optional
 *   tw.clear()
 *
 *   // generated markup
 *   const markup = consume(html)
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
    let result = '';
    let lastChunkStart = 0;
    extract$1(markup, (startIndex, endIndex, quote)=>{
        const value = markup.slice(startIndex, endIndex);
        const className = tw$1(value);
        // We only need to shift things around if we need to actually change the markup
        if (changed(value, className)) {
            // We've hit another mutation boundary
            // Add quote if necessary
            quote = quote ? '' : '"';
            result += markup.slice(lastChunkStart, startIndex) + quote + className + quote;
            lastChunkStart = endIndex;
        }
    });
    // Combine the current result with the tail-end of the input
    return result + markup.slice(lastChunkStart, markup.length);
}
// For now we are using a simple parser adapted from htm (https://github.com/developit/htm/blob/master/src/build.mjs)
// If we find any issues we can switch to something more sophisticated like
// - https://github.com/acrazing/html5parser
// - https://github.com/fb55/htmlparser2
const MODE_SLASH = 0;
const MODE_TEXT = 1;
const MODE_WHITESPACE = 2;
const MODE_TAGNAME = 3;
const MODE_COMMENT = 4;
const MODE_ATTRIBUTE = 5;
function extract$1(markup, onClass) {
    let mode = MODE_TEXT;
    let startIndex = 0;
    let quote = '';
    let attributeName = '';
    const commit = (currentIndex)=>{
        if (mode == MODE_ATTRIBUTE && attributeName == 'class') {
            onClass(startIndex, currentIndex, quote);
        }
    };
    for(let position = 0; position < markup.length; position++){
        const char = markup[position];
        if (mode == MODE_TEXT) {
            if (char == '<') {
                mode = markup.substr(position + 1, 3) == '!--' ? MODE_COMMENT : MODE_TAGNAME;
            }
        } else if (mode == MODE_COMMENT) {
            // Ignore everything until the last three characters are '-', '-' and '>'
            if (char == '>' && markup.slice(position - 2, position) == '--') {
                mode = MODE_TEXT;
            }
        } else if (quote) {
            if (char == quote && markup[position - 1] != '\\') {
                commit(position);
                mode = MODE_WHITESPACE;
                quote = '';
            }
        } else if (char == '"' || char == "'") {
            quote = char;
            startIndex += 1;
        } else if (char == '>') {
            commit(position);
            mode = MODE_TEXT;
        } else if (!mode) ; else if (char == '=') {
            attributeName = markup.slice(startIndex, position);
            mode = MODE_ATTRIBUTE;
            startIndex = position + 1;
        } else if (char == '/' && (mode < MODE_ATTRIBUTE || markup[position + 1] == '>')) {
            commit(position);
            mode = MODE_SLASH;
        } else if (/\s/.test(char)) {
            // <a class=font-bold>
            commit(position);
            mode = MODE_WHITESPACE;
            startIndex = position + 1;
        }
    }
}

function interleave(strings, interpolations, handle) {
    return interpolations.reduce((result, interpolation, index)=>result + handle(interpolation) + strings[index + 1]
    , strings[0]);
}

function astish(strings, interpolations) {
    return Array.isArray(strings) ? astish$(interleave(strings, interpolations, (interpolation)=>interpolation != null && typeof interpolation != 'boolean' ? interpolation : ''
    )) : typeof strings == 'string' ? astish$(strings) : [
        strings
    ];
}
// Based on https://github.com/cristianbote/goober/blob/master/src/core/astish.js
const newRule = / *(?:(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}))/g;
/**
 * Convert a css style string into a object
 */ function astish$(css1) {
    css1 = removeComments(css1);
    const rules = [];
    const tree = [];
    let block1;
    while(block1 = newRule.exec(css1)){
        // Remove the current entry
        if (block1[4]) tree.pop();
        if (block1[3]) {
            // new nested
            tree.push(block1[3]);
        } else if (!block1[4]) {
            rules.push(tree.reduceRight((css, block)=>({
                    [block]: css
                })
            , {
                [block1[1]]: block1[2]
            }));
        }
    }
    return rules;
}

function css(strings, ...interpolations) {
    const ast = astish(strings, interpolations);
    const className = (ast.find((o)=>o.label
    )?.label || 'css') + hash(JSON.stringify(ast));
    return register(className, (rule, context)=>merge(ast.flatMap((css1)=>serialize(css1, rule, context, Layer.o)
        ), className)
    );
}

// based on https://github.com/lukeed/clsx and https://github.com/jorgebucaran/classcat
function interpolate(strings, interpolations) {
    return Array.isArray(strings) && Array.isArray(strings.raw) ? interleave(strings, interpolations, (value)=>toString(value).trim()
    ) : interpolations.filter(Boolean).reduce((result, value)=>result + toString(value)
    , strings ? toString(strings) : '');
}
function toString(value) {
    let result = '';
    let tmp;
    if (value && typeof value == 'object') {
        if (Array.isArray(value)) {
            if (tmp = interpolate(value[0], value.slice(1))) {
                result += ' ' + tmp;
            }
        } else {
            for(const key in value){
                if (value[key]) result += ' ' + key;
            }
        }
    } else if (value != null && typeof value != 'boolean') {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        result += ' ' + value;
    }
    return result;
}

function cx(strings, ...interpolations) {
    return format(parse(interpolate(strings, interpolations)), ' ');
}

/**
 * Used for static HTML processing (usually to provide SSR support for your javascript-powered web apps)
 *
 * **Note**: Consider using {@link inject} instead.
 *
 * **Note**: This {@link Twind.clear clears} the Twind instance before processing the HTML.
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
    tw$1.clear();
    return {
        html: consume(html, tw$1),
        css: stringify(tw$1.target)
    };
}

function injectGlobal(strings, ...interpolations) {
    const tw$1 = typeof this == 'function' ? this : tw;
    tw$1(css({
        '@layer base': astish(strings, interpolations)
    }));
}

/**
 * Used for static HTML processing (usually to provide SSR support for your javascript-powered web apps)
 *
 * **Note**: This {@link Twind.clear clears} the Twind instance before processing the HTML.
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
    const { tw: tw$1 =tw , minify =identity  } = typeof options == 'function' ? {
        tw: options
    } : options;
    const { html , css  } = extract(markup, tw$1);
    // inject as last element into the head
    return html.replace('</head>', `<style data-twind>${minify(css, html)}</style></head>`);
}

const keyframes = /* @__PURE__ */ bind();
function bind(thisArg) {
    return new Proxy(function keyframes(strings, ...interpolations) {
        return keyframes$(thisArg, '', strings, interpolations);
    }, {
        get (target, name) {
            if (name === 'bind') {
                return bind;
            }
            return function namedKeyframes(strings, ...interpolations) {
                return keyframes$(thisArg, name, strings, interpolations);
            };
        }
    });
}
function keyframes$(thisArg, name, strings, interpolations) {
    const ast = astish(strings, interpolations);
    const keyframeName = escape(name + hash(JSON.stringify([
        name,
        ast
    ])));
    // lazy inject keyframes
    return {
        toString () {
            // lazy access tw
            const tw$1 = typeof thisArg == 'function' ? thisArg : tw;
            tw$1(css({
                [`@keyframes ${keyframeName}`]: astish(strings, interpolations)
            }));
            return keyframeName;
        }
    };
}

const apply = /* @__PURE__ */ nested('@');
const shortcut = /* @__PURE__ */ nested('~');
function nested(marker) {
    return new Proxy(function nested(strings, ...interpolations) {
        return nested$('', strings, interpolations);
    }, {
        get (target, name) {
            return function namedNested(strings, ...interpolations) {
                return nested$(name, strings, interpolations);
            };
        }
    });
    function nested$(name, strings, interpolations) {
        return format(parse(name + marker + '(' + interpolate(strings, interpolations) + ')'));
    }
}

function fromTheme(/** Theme section to use (default: `$1` — The first matched group) */ section1, /** The css property (default: value of {@link section}) */ resolve, convert) {
    const factory = !resolve ? ({ 1: $1 , _  }, context, section)=>({
            [$1 || section]: _
        })
     : typeof resolve == 'string' ? (match, context)=>({
            [resolve]: convert ? convert(match, context) : match._
        })
     : resolve;
    return (match, context)=>{
        const themeSection = camelize(section1 || match[1]);
        const value = context.theme(themeSection, match.$$) ?? /** Arbitrary lookup type */ // https://github.com/tailwindlabs/tailwindcss/blob/875c850b37a57bc651e1fed91e3d89af11bdc79f/src/util/pluginUtils.js#L163
        // type?: 'lookup' | 'color' | 'line-width' | 'length' | 'any' | 'shadow'
        arbitrary(match.$$, themeSection, context);
        if (value != null) {
            match._ = match.input[0] == '-' ? `calc(${value} * -1)` : value;
            return factory(match, context, themeSection);
        }
    };
}
function colorFromTheme(options1 = {}, resolve) {
    return (match, context)=>{
        // text- -> textColor
        // ring-offset(?:-|$) -> ringOffsetColor
        const { section =camelize(match[0]).replace('-', '') + 'Color'  } = options1;
        // extract color and opacity
        // rose-500                  -> ['rose-500']
        // [hsl(0_100%_/_50%)]       -> ['[hsl(0_100%_/_50%)]']
        // indigo-500/100            -> ['indigo-500', '100']
        // [hsl(0_100%_/_50%)]/[.25] -> ['[hsl(0_100%_/_50%)]', '[.25]']
        // eslint-disable-next-line no-sparse-arrays
        if (!/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/.test(match.$$)) return;
        const { $1: colorMatch , $2: opacityMatch  } = RegExp;
        const colorValue = context.theme(section, colorMatch) || arbitrary(colorMatch, section, context);
        if (!colorValue) return;
        const { // text- -> --tw-text-opacity
        // ring-offset(?:-|$) -> --tw-ring-offset-opacity
        // TODO move this default into preset-tailwind?
        opacityVariable =`--tw-${match[0].replace(/-$/, '')}-opacity` , opacitySection =section.replace('Color', 'Opacity') , property =section , selector ,  } = options1;
        const opacityValue = context.theme(opacitySection, opacityMatch || 'DEFAULT') || opacityMatch && arbitrary(opacityMatch, opacitySection, context);
        const color = toColorValue(colorValue, {
            opacityVariable: opacityVariable || undefined,
            opacityValue: opacityValue || undefined
        });
        // if (typeof color != 'string') {
        //   console.warn(`Invalid color ${colorMatch} (from ${match.input}):`, color)
        //   return
        // }
        if (resolve) {
            match._ = {
                value: color,
                color: (options)=>toColorValue(colorValue, options)
            };
            return resolve(match, context);
        }
        const properties = {};
        if (opacityVariable && color.includes(opacityVariable)) {
            properties[opacityVariable] = opacityValue || '1';
        }
        properties[property] = color;
        return selector ? {
            [selector]: properties
        } : properties;
    };
}
function arbitrary(value, section, context) {
    if (value[0] == '[' && value.slice(-1) == ']') {
        value = resolveThemeFunction(value.slice(1, -1), context);
        // TODO remove arbitrary type prefix — we do not need it but user may use it
        // https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/dataTypes.js
        // url, number, percentage, length, line-width, shadow, color, image, gradient, position, family-name, lookup, any, generic-name, absolute-size, relative-size
        // If this is a color section and the value is a hex color, color function or color name
        if (/color|fill|stroke/i.test(section)) {
            if (/^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(value)) {
                return value;
            }
        } else if (/image/i.test(section)) {
            // url(, [a-z]-gradient(, image(, cross-fade(, image-set(
            if (/^[a-z-]+\(/.test(value)) {
                return value;
            }
        } else {
            // TODO how to differentiate arbitary values for
            // - backgroundSize vs backgroundPosition
            // - fontWeight vs fontFamily
            if (value.includes('calc(')) {
                value = value.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, '$1 $2 ');
            }
            // Convert `_` to ` `, except for escaped underscores `\_` but not between brackets
            return value.replace(/(^|[^\\])_+(?![^(]*\))/g, (fullMatch, characterBefore)=>characterBefore + ' '.repeat(fullMatch.length - 1)
            ).replace(/\\_(?![^(]*\))/g, '_');
        }
    }
}
function camelize(value) {
    return value.replace(/-./g, (x)=>x[1].toUpperCase()
    );
}

const style = (base, config)=>typeof base == 'function' ? createStyle(config, base) : createStyle(base)
;
function createStyle(config = {}, parent) {
    const { label ='style' , base , props: variants = {} , defaults: localDefaults , when =[]  } = config;
    const defaults = {
        ...parent?.defaults,
        ...localDefaults
    };
    const id = hash(JSON.stringify([
        label,
        parent?.className,
        base,
        variants,
        defaults,
        when
    ]));
    // Layers:
    // component: 0b010
    // props: 0b011
    // when: 0b100
    const className = register('', base || '', Layer.c);
    function register(mq, token, layer) {
        return define(// `<name>#<id>` or `<parent>~<name>#<id>`
        ((parent ? parent.className.replace(/#.+$/, '~') : '') + label + mq + id).replace(/[: ,()[\]]/, ''), layer, token && parse(token));
    }
    return Object.defineProperties(function style(allProps) {
        const props = {
            ...defaults,
            ...allProps
        };
        let classNames = (parent ? parent(props) + ' ' : '') + className;
        let token;
        for(const variantKey1 in variants){
            const variant = variants[variantKey1];
            const propsValue = props[variantKey1];
            if (propsValue === Object(propsValue)) {
                // inline responsive breakpoints
                let mq = '';
                token = '';
                for(const breakpoint in propsValue){
                    const breakpointToken = variant[propsValue[breakpoint]];
                    if (breakpointToken) {
                        mq += '@' + breakpoint + '-' + propsValue[breakpoint];
                        token += (token && ' ') + (breakpoint == '_' ? breakpointToken : breakpoint + ':(' + breakpointToken + ')');
                    }
                }
                if (token) {
                    classNames += ' ' + register('--' + variantKey1 + '-' + mq, token, 3 << 27 /* Shifts.layer */ );
                }
            } else if (token = variant[propsValue]) {
                classNames += ' ' + register('--' + variantKey1 + '-' + propsValue, token, 3 << 27 /* Shifts.layer */ );
            }
        }
        when.forEach((match, index)=>{
            let mq = '';
            for(const variantKey in match[0]){
                const propsValue = props[variantKey];
                // TODO we ignore inline responsive breakpoints for now — what be the result??
                if (propsValue !== Object(propsValue) && '' + propsValue == '' + match[0][variantKey]) {
                    mq += (mq && '_') + variantKey + '-' + propsValue;
                } else {
                    mq = '';
                    break;
                }
            }
            if (mq && (token = match[1])) {
                classNames += ' ' + register('-' + index + '--' + mq, token, 4 << 27 /* Shifts.layer */ );
            }
        });
        return classNames;
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
 */ function tx(strings, ...interpolations) {
    const tw$1 = typeof this == 'function' ? this : tw;
    return tw$1(interpolate(strings, interpolations));
}

export { apply, arbitrary, asArray, auto, colorFromTheme, consume, css, cssom, cx, defineConfig, dom, escape, extract, fromTheme, hash, identity, injectGlobal, inline, keyframes, mql, noop, observe, setup, shortcut, stringify, style, toColorValue, tw, twind, tx, virtual };
//# sourceMappingURL=twind.js.map
