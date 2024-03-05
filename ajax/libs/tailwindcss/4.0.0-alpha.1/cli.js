#!/usr/bin/env node
'use strict';

var parse = require('mri');
var watcher = require('@parcel/watcher');
var oxide = require('@tailwindcss/oxide');
var fs = require('fs');
var fs$1 = require('fs/promises');
var path3 = require('path');
var postcss = require('postcss');
var atImport = require('postcss-import');
var lightningcss = require('lightningcss');
var pc = require('picocolors');
var module$1 = require('module');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var parse__default = /*#__PURE__*/_interopDefault(parse);
var watcher__default = /*#__PURE__*/_interopDefault(watcher);
var fs__default = /*#__PURE__*/_interopDefault(fs$1);
var path3__default = /*#__PURE__*/_interopDefault(path3);
var postcss__default = /*#__PURE__*/_interopDefault(postcss);
var atImport__default = /*#__PURE__*/_interopDefault(atImport);
var pc__default = /*#__PURE__*/_interopDefault(pc);

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
function args(options2, argv = process.argv.slice(2)) {
  let parsed = parse__default.default(argv);
  let result = {
    _: parsed._
  };
  for (let [
    flag,
    { type, alias, default: defaultValue = type === "boolean" ? false : null }
  ] of Object.entries(options2)) {
    result[flag] = defaultValue;
    if (alias) {
      let key = alias.slice(1);
      if (parsed[key] !== void 0) {
        result[flag] = convert(parsed[key], type);
      }
    }
    {
      let key = flag.slice(2);
      if (parsed[key] !== void 0) {
        result[flag] = convert(parsed[key], type);
      }
    }
  }
  return result;
}
function convert(value, type) {
  switch (type) {
    case "string":
      return convertString(value);
    case "boolean":
      return convertBoolean(value);
    case "number":
      return convertNumber(value);
    case "boolean | string":
      return convertBoolean(value) ?? convertString(value);
    case "number | string":
      return convertNumber(value) ?? convertString(value);
    case "boolean | number":
      return convertBoolean(value) ?? convertNumber(value);
    case "boolean | number | string":
      return convertBoolean(value) ?? convertNumber(value) ?? convertString(value);
    default:
      throw new Error(`Unhandled type: ${type}`);
  }
}
function convertBoolean(value) {
  if (value === true || value === false) {
    return value;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
}
function convertNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  {
    let valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber)) {
      return valueAsNumber;
    }
  }
}
function convertString(value) {
  return `${value}`;
}

// package.json
var version = "4.0.0-alpha.1";

// src/ast.ts
function rule(selector, nodes) {
  return {
    kind: "rule",
    selector,
    nodes
  };
}
function decl(property2, value) {
  return {
    kind: "declaration",
    property: property2,
    value,
    important: false
  };
}
function comment(value) {
  return {
    kind: "comment",
    value
  };
}
function walk(ast, visit) {
  for (let i = 0; i < ast.length; i++) {
    let node = ast[i];
    let shouldContinue = visit(node, {
      replaceWith(newNode) {
        ast.splice(i, 1, ...Array.isArray(newNode) ? newNode : [newNode]);
        i--;
      }
    });
    if (shouldContinue === false)
      return;
    if (node.kind === "rule") {
      walk(node.nodes, visit);
    }
  }
}
function toCss(ast) {
  let atRoots = "";
  let seenAtProperties = /* @__PURE__ */ new Set();
  function stringify(node, depth = 0) {
    let css3 = "";
    let indent2 = "  ".repeat(depth);
    if (node.kind === "rule") {
      if (node.selector === "@at-root") {
        for (let child of node.nodes) {
          atRoots += stringify(child, 0);
        }
        return css3;
      }
      if (node.selector[0] === "@" && node.nodes.length === 0) {
        return `${indent2}${node.selector};
`;
      }
      if (node.selector[0] === "@" && node.selector.startsWith("@property ") && depth === 0) {
        if (seenAtProperties.has(node.selector)) {
          return "";
        }
        seenAtProperties.add(node.selector);
      }
      css3 += `${indent2}${node.selector} {
`;
      for (let child of node.nodes) {
        css3 += stringify(child, depth + 1);
      }
      css3 += `${indent2}}
`;
    } else if (node.kind === "comment") {
      css3 += `${indent2}/*${node.value}*/
`;
    } else if (node.property !== "--tw-sort" && node.value !== void 0 && node.value !== null) {
      css3 += `${indent2}${node.property}: ${node.value}${node.important ? "!important" : ""};
`;
    }
    return css3;
  }
  let css2 = "";
  for (let node of ast) {
    let result = stringify(node);
    if (result !== "") {
      css2 += result;
    }
  }
  return `${css2}${atRoots}`;
}

// src/utils/math-operators.ts
var mathFunctions = [
  "calc",
  "min",
  "max",
  "clamp",
  "mod",
  "rem",
  "sin",
  "cos",
  "tan",
  "asin",
  "acos",
  "atan",
  "atan2",
  "pow",
  "sqrt",
  "hypot",
  "log",
  "exp",
  "round"
];
function hasMathFn(input) {
  return input.indexOf("(") !== -1 && mathFunctions.some((fn) => input.includes(`${fn}(`));
}
function addWhitespaceAroundMathOperators(input) {
  if (input.indexOf("(") === -1) {
    return input;
  }
  if (!mathFunctions.some((fn) => input.includes(fn))) {
    return input;
  }
  let result = "";
  let formattable = [];
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (char === "(") {
      result += char;
      let start = i;
      for (let j = i - 1; j >= 0; j--) {
        let inner = input.charCodeAt(j);
        if (inner >= 48 && inner <= 57) {
          start = j;
        } else if (inner >= 97 && inner <= 122) {
          start = j;
        } else {
          break;
        }
      }
      let fn = input.slice(start, i);
      if (mathFunctions.includes(fn)) {
        formattable.unshift(true);
        continue;
      } else if (formattable[0] && fn === "") {
        formattable.unshift(true);
        continue;
      }
      formattable.unshift(false);
      continue;
    } else if (char === ")") {
      result += char;
      formattable.shift();
    } else if (char === "," && formattable[0]) {
      result += `, `;
      continue;
    } else if (char === " " && formattable[0] && result[result.length - 1] === " ") {
      continue;
    } else if ((char === "+" || char === "*" || char === "/" || char === "-") && formattable[0]) {
      let trimmed = result.trimEnd();
      let prev = trimmed[trimmed.length - 1];
      if (prev === "+" || prev === "*" || prev === "/" || prev === "-") {
        result += char;
        continue;
      } else if (prev === "(" || prev === ",") {
        result += char;
        continue;
      } else if (input[i - 1] === " ") {
        result += `${char} `;
      } else {
        result += ` ${char} `;
      }
    } else if (formattable[0] && input.startsWith("to-zero", i)) {
      let start = i;
      i += 7;
      result += input.slice(start, i + 1);
    } else {
      result += char;
    }
  }
  return result;
}

// src/utils/decode-arbitrary-value.ts
function decodeArbitraryValue(input) {
  if (input.startsWith("url(")) {
    return input;
  }
  input = convertUnderscoresToWhitespace(input);
  input = addWhitespaceAroundMathOperators(input);
  return input;
}
function convertUnderscoresToWhitespace(input) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (char === "\\" && input[i + 1] === "_") {
      output += "_";
      i += 1;
    } else if (char === "_") {
      output += " ";
    } else {
      output += char;
    }
  }
  return output;
}

// src/utils/segment.ts
function segment(input, separator) {
  let closingBracketStack = "";
  let parts = [];
  let lastPos = 0;
  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];
    if (closingBracketStack.length === 0 && char === separator) {
      parts.push(input.slice(lastPos, idx));
      lastPos = idx + 1;
      continue;
    }
    switch (char) {
      case "\\":
        idx += 1;
        break;
      case "(":
        closingBracketStack += ")";
        break;
      case "[":
        closingBracketStack += "]";
        break;
      case "{":
        closingBracketStack += "}";
        break;
      case ")":
      case "]":
      case "}":
        if (closingBracketStack.length > 0 && char === closingBracketStack[closingBracketStack.length - 1]) {
          closingBracketStack = closingBracketStack.slice(0, closingBracketStack.length - 1);
        }
        break;
    }
  }
  parts.push(input.slice(lastPos));
  return parts;
}

// src/candidate.ts
function parseCandidate(input, utilities, parsedVariants) {
  let rawVariants = segment(input, ":");
  let base = rawVariants.pop();
  let parsedCandidateVariants = [];
  for (let variant of rawVariants) {
    let parsedVariant = parsedVariants.get(variant);
    if (parsedVariant === null)
      return null;
    switch (variant) {
      case "after":
      case "backdrop":
      case "before":
      case "first-letter":
      case "first-line":
      case "marker":
      case "placeholder":
      case "selection":
        parsedCandidateVariants.unshift(parsedVariant);
        break;
      default:
        parsedCandidateVariants.push(parsedVariant);
    }
  }
  let state = {
    important: false,
    negative: false
  };
  if (base[base.length - 1] === "!") {
    state.important = true;
    base = base.slice(0, -1);
  }
  if (base[0] === "[") {
    let [baseWithoutModifier, modifierSegment2 = null] = segment(base, "/");
    if (baseWithoutModifier[baseWithoutModifier.length - 1] !== "]")
      return null;
    let charCode = baseWithoutModifier.charCodeAt(1);
    if (charCode !== 45 && !(charCode >= 97 && charCode <= 122))
      return null;
    baseWithoutModifier = baseWithoutModifier.slice(1, -1);
    let idx = baseWithoutModifier.indexOf(":");
    if (idx === -1 || idx === 0 || idx === baseWithoutModifier.length - 1)
      return null;
    let property2 = baseWithoutModifier.slice(0, idx);
    let value2 = decodeArbitraryValue(baseWithoutModifier.slice(idx + 1));
    return {
      kind: "arbitrary",
      property: property2,
      value: value2,
      modifier: modifierSegment2 === null ? null : parseModifier(modifierSegment2),
      variants: parsedCandidateVariants,
      important: state.important
    };
  }
  if (base[0] === "-") {
    state.negative = true;
    base = base.slice(1);
  }
  let [root, value] = findRoot(base, utilities);
  let modifierSegment = null;
  if (root === null && base.includes("/")) {
    let [rootWithoutModifier, rootModifierSegment = null] = segment(base, "/");
    modifierSegment = rootModifierSegment;
    [root, value] = findRoot(rootWithoutModifier, utilities);
  }
  if (root === null)
    return null;
  let kind = utilities.kind(root);
  if (kind === "static") {
    if (value !== null)
      return null;
    return {
      kind: "static",
      root,
      variants: parsedCandidateVariants,
      negative: state.negative,
      important: state.important
    };
  }
  let candidate = {
    kind: "functional",
    root,
    modifier: modifierSegment === null ? null : parseModifier(modifierSegment),
    value: null,
    variants: parsedCandidateVariants,
    negative: state.negative,
    important: state.important
  };
  if (value === null)
    return candidate;
  {
    let [valueWithoutModifier, modifierSegment2 = null] = segment(value, "/");
    if (modifierSegment2 !== null) {
      candidate.modifier = parseModifier(modifierSegment2);
    }
    let startArbitraryIdx = valueWithoutModifier.indexOf("[");
    let valueIsArbitrary = startArbitraryIdx !== -1;
    if (valueIsArbitrary) {
      let arbitraryValue = valueWithoutModifier.slice(startArbitraryIdx + 1, -1);
      let typehint = "";
      for (let i = 0; i < arbitraryValue.length; i++) {
        let code = arbitraryValue.charCodeAt(i);
        if (code === 58) {
          typehint = arbitraryValue.slice(0, i);
          arbitraryValue = arbitraryValue.slice(i + 1);
          break;
        }
        if (code === 45 || code >= 97 && code <= 122) {
          continue;
        }
        break;
      }
      let dashedIdent = null;
      if (arbitraryValue[0] === "-" && arbitraryValue[1] === "-") {
        dashedIdent = arbitraryValue;
        arbitraryValue = `var(${arbitraryValue})`;
      } else {
        arbitraryValue = decodeArbitraryValue(arbitraryValue);
      }
      candidate.value = {
        kind: "arbitrary",
        dataType: typehint || null,
        value: arbitraryValue,
        dashedIdent
      };
    } else {
      let fraction = modifierSegment2 === null || candidate.modifier?.kind === "arbitrary" ? null : value.slice(valueWithoutModifier.lastIndexOf("-") + 1);
      candidate.value = {
        kind: "named",
        value: valueWithoutModifier,
        fraction
      };
    }
  }
  return candidate;
}
function parseModifier(modifier) {
  if (modifier[0] === "[" && modifier[modifier.length - 1] === "]") {
    let arbitraryValue = modifier.slice(1, -1);
    let dashedIdent = null;
    if (arbitraryValue[0] === "-" && arbitraryValue[1] === "-") {
      dashedIdent = arbitraryValue;
      arbitraryValue = `var(${arbitraryValue})`;
    } else {
      arbitraryValue = decodeArbitraryValue(arbitraryValue);
    }
    return {
      kind: "arbitrary",
      value: arbitraryValue,
      dashedIdent
    };
  }
  return {
    kind: "named",
    value: modifier
  };
}
function parseVariant(variant, variants, parsedVariants) {
  if (variant[0] === "[" && variant[variant.length - 1] === "]") {
    if (variant[1] === "@" && variant.includes("&"))
      return null;
    let selector = decodeArbitraryValue(variant.slice(1, -1));
    if (selector[0] !== "@") {
      if (!selector.includes("&")) {
        selector = `&:is(${selector})`;
      }
    }
    return {
      kind: "arbitrary",
      selector,
      compounds: true
    };
  }
  {
    let [variantWithoutModifier, modifier = null, additionalModifier] = segment(variant, "/");
    if (additionalModifier)
      return null;
    let [root, value] = findRoot(variantWithoutModifier, variants);
    if (root === null)
      return null;
    switch (variants.kind(root)) {
      case "static": {
        if (value !== null)
          return null;
        return {
          kind: "static",
          root,
          compounds: variants.compounds(root)
        };
      }
      case "functional": {
        if (value === null)
          return null;
        if (value[0] === "[" && value[value.length - 1] === "]") {
          return {
            kind: "functional",
            root,
            modifier: modifier === null ? null : parseModifier(modifier),
            value: {
              kind: "arbitrary",
              value: decodeArbitraryValue(value.slice(1, -1))
            },
            compounds: variants.compounds(root)
          };
        }
        return {
          kind: "functional",
          root,
          modifier: modifier === null ? null : parseModifier(modifier),
          value: { kind: "named", value },
          compounds: variants.compounds(root)
        };
      }
      case "compound": {
        if (value === null)
          return null;
        let subVariant = parsedVariants.get(value);
        if (subVariant === null)
          return null;
        if (subVariant.compounds === false)
          return null;
        return {
          kind: "compound",
          root,
          modifier: modifier === null ? null : { kind: "named", value: modifier },
          variant: subVariant,
          compounds: variants.compounds(root)
        };
      }
    }
  }
  return null;
}
function findRoot(input, lookup) {
  if (lookup.has(input))
    return [input, null];
  let idx = input.lastIndexOf("-");
  if (idx === -1) {
    if (input[0] === "@" && lookup.has("@")) {
      return ["@", input.slice(1)];
    }
    return [null, null];
  }
  do {
    let maybeRoot = input.slice(0, idx);
    if (lookup.has(maybeRoot)) {
      return [maybeRoot, input.slice(idx + 1)];
    }
    idx = input.lastIndexOf("-", idx - 1);
  } while (idx > 0);
  return [null, null];
}

// src/utils/default-map.ts
var DefaultMap = class extends Map {
  constructor(factory) {
    super();
    this.factory = factory;
  }
  get(key) {
    let value = super.get(key);
    if (value === void 0) {
      value = this.factory(key, this);
      this.set(key, value);
    }
    return value;
  }
};

// src/intellisense.ts
function getClassList(design) {
  let list = [];
  for (let [utility, fn] of design.utilities.entries()) {
    if (typeof utility !== "string") {
      continue;
    }
    if (fn.kind === "static") {
      list.push([utility, { modifiers: [] }]);
      continue;
    }
    let completions = design.utilities.getCompletions(utility);
    for (let group of completions) {
      for (let value of group.values) {
        let name = value === null ? utility : `${utility}-${value}`;
        list.push([name, { modifiers: group.modifiers }]);
        if (group.supportsNegative) {
          list.push([`-${name}`, { modifiers: group.modifiers }]);
        }
      }
    }
  }
  list.sort((a, b) => a[0].localeCompare(b[0]));
  return list;
}
function getVariants(design) {
  let list = [];
  let parsedVariants = new DefaultMap(
    (variant, map) => parseVariant(variant, design.variants, map)
  );
  for (let [root, variant] of design.variants.entries()) {
    let selectors2 = function({ value, modifier } = {}) {
      let name = root;
      if (value)
        name += `-${value}`;
      if (modifier)
        name += `/${modifier}`;
      let variant2 = parsedVariants.get(name);
      if (!variant2)
        return [];
      let node = rule(".__placeholder__", [decl("color", "red")]);
      if (applyVariant(node, variant2, design.variants) === null) {
        return [];
      }
      let selectors3 = [];
      for (let child of node.nodes) {
        if (child.kind === "rule") {
          selectors3.push(child.selector);
        }
      }
      return selectors3;
    };
    if (variant.kind === "arbitrary")
      continue;
    let values = design.variants.getCompletions(root);
    switch (variant.kind) {
      case "static": {
        list.push({
          name: root,
          values,
          isArbitrary: false,
          hasDash: true,
          selectors: selectors2
        });
        break;
      }
      case "functional": {
        list.push({
          name: root,
          values,
          isArbitrary: true,
          hasDash: true,
          selectors: selectors2
        });
        break;
      }
      case "compound": {
        list.push({
          name: root,
          values,
          isArbitrary: true,
          hasDash: true,
          selectors: selectors2
        });
        break;
      }
    }
  }
  return list;
}

// src/sort.ts
function getClassOrder(design, classes) {
  let { astNodes, nodeSorting } = compileCandidates(Array.from(classes), design, {
    throwOnInvalidCandidate: false
  });
  let sorted = new Map(classes.map((className) => [className, null]));
  let idx = 0n;
  for (let node of astNodes) {
    let candidate = nodeSorting.get(node)?.candidate;
    if (!candidate)
      continue;
    sorted.set(candidate, sorted.get(candidate) ?? idx++);
  }
  return classes.map((className) => [
    //
    className,
    sorted.get(className) ?? null
  ]);
}

// src/utils/is-color.ts
var NAMED_COLORS = [
  // CSS Level 1 colors
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
  // CSS Level 2/3 colors
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
  // Keywords
  "transparent",
  "currentcolor",
  // System colors
  "canvas",
  "canvastext",
  "linktext",
  "visitedtext",
  "activetext",
  "buttonface",
  "buttontext",
  "buttonborder",
  "field",
  "fieldtext",
  "highlight",
  "highlighttext",
  "selecteditem",
  "selecteditemtext",
  "mark",
  "marktext",
  "graytext",
  "accentcolor",
  "accentcolortext"
];
var IS_COLOR_FN = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i;
function isColor(value) {
  return value.charCodeAt(0) === 35 || IS_COLOR_FN.test(value) || NAMED_COLORS.includes(value.toLowerCase());
}

// src/utils/infer-data-type.ts
var checks = {
  color: isColor,
  length: isLength,
  percentage: isPercentage,
  number: isNumber,
  url: isUrl,
  position: isBackgroundPosition,
  "bg-size": isBackgroundSize,
  "line-width": isLineWidth,
  image: isImage,
  "family-name": isFamilyName,
  "generic-name": isGenericName,
  "absolute-size": isAbsoluteSize,
  "relative-size": isRelativeSize
};
function inferDataType(value, types) {
  if (value.startsWith("var("))
    return null;
  for (let type of types) {
    if (checks[type]?.(value)) {
      return type;
    }
  }
  return null;
}
var IS_URL = /^url\(.*\)$/;
function isUrl(value) {
  return IS_URL.test(value);
}
function isLineWidth(value) {
  return value === "thin" || value === "medium" || value === "thick";
}
var IS_IMAGE_FN = /^(?:element|image|cross-fade|image-set)\(/;
var IS_GRADIENT_FN = /^(repeating-)?(conic|linear|radial)-gradient\(/;
function isImage(value) {
  let count = 0;
  for (let part of segment(value, ",")) {
    if (part.startsWith("var("))
      continue;
    if (isUrl(part)) {
      count += 1;
      continue;
    }
    if (IS_GRADIENT_FN.test(part)) {
      count += 1;
      continue;
    }
    if (IS_IMAGE_FN.test(part)) {
      count += 1;
      continue;
    }
    return false;
  }
  return count > 0;
}
function isGenericName(value) {
  return value === "serif" || value === "sans-serif" || value === "monospace" || value === "cursive" || value === "fantasy" || value === "system-ui" || value === "ui-serif" || value === "ui-sans-serif" || value === "ui-monospace" || value === "ui-rounded" || value === "math" || value === "emoji" || value === "fangsong";
}
function isFamilyName(value) {
  let count = 0;
  for (let part of segment(value, ",")) {
    let char = part.charCodeAt(0);
    if (char >= 48 && char <= 57)
      return false;
    if (part.startsWith("var("))
      continue;
    count += 1;
  }
  return count > 0;
}
function isAbsoluteSize(value) {
  return value === "xx-small" || value === "x-small" || value === "small" || value === "medium" || value === "large" || value === "x-large" || value === "xx-large" || value === "xxx-large";
}
function isRelativeSize(value) {
  return value === "larger" || value === "smaller";
}
var HAS_NUMBER = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/;
var IS_NUMBER = new RegExp(`^${HAS_NUMBER.source}$`);
function isNumber(value) {
  return IS_NUMBER.test(value) || hasMathFn(value);
}
var IS_PERCENTAGE = new RegExp(`^${HAS_NUMBER.source}%$`);
function isPercentage(value) {
  return IS_PERCENTAGE.test(value) || hasMathFn(value);
}
var LENGTH_UNITS = [
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "px",
  "em",
  "ex",
  "ch",
  "rem",
  "lh",
  "rlh",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "vb",
  "vi",
  "svw",
  "svh",
  "lvw",
  "lvh",
  "dvw",
  "dvh",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax"
];
var IS_LENGTH = new RegExp(`^${HAS_NUMBER.source}(${LENGTH_UNITS.join("|")})$`);
function isLength(value) {
  return IS_LENGTH.test(value) || hasMathFn(value);
}
function isBackgroundPosition(value) {
  let count = 0;
  for (let part of segment(value, " ")) {
    if (part === "center" || part === "top" || part === "right" || part === "bottom" || part === "left") {
      count += 1;
      continue;
    }
    if (part.startsWith("var("))
      continue;
    if (isLength(part) || isPercentage(part)) {
      count += 1;
      continue;
    }
    return false;
  }
  return count > 0;
}
function isBackgroundSize(value) {
  let count = 0;
  for (let size of segment(value, ",")) {
    if (size === "cover" || size === "contain") {
      count += 1;
      continue;
    }
    let values = segment(size, " ");
    if (values.length !== 1 && values.length !== 2) {
      return false;
    }
    if (values.every((value2) => value2 === "auto" || isLength(value2) || isPercentage(value2))) {
      count += 1;
      continue;
    }
  }
  return count > 0;
}

// src/utils/replace-shadow-colors.ts
var KEYWORDS = /* @__PURE__ */ new Set(["inset", "inherit", "initial", "revert", "unset"]);
var LENGTH = /^-?(\d+|\.\d+)(.*?)$/g;
function replaceShadowColors(input, replacement) {
  for (let shadow of segment(input, ",")) {
    let parts = segment(shadow, " ").filter((part) => part.trim() !== "");
    let color = null;
    let offsetX = null;
    let offsetY = null;
    for (let part of parts) {
      if (KEYWORDS.has(part)) {
        continue;
      } else if (LENGTH.test(part)) {
        if (offsetX === null) {
          offsetX = part;
        } else if (offsetY === null) {
          offsetY = part;
        }
        LENGTH.lastIndex = 0;
      } else if (color === null) {
        color = part;
      }
    }
    if (offsetX !== null && offsetY !== null && color !== null) {
      input = input.replace(color, replacement);
    }
  }
  return input;
}

// src/utilities.ts
var ARBITRARY_VARIANT = Symbol("ARBITRARY_VARIANT");
var Utilities = class {
  utilities = /* @__PURE__ */ new Map();
  completions = /* @__PURE__ */ new Map();
  static(name, compileFn) {
    this.set(name, { kind: "static", compileFn });
  }
  functional(name, compileFn) {
    this.set(name, { kind: "functional", compileFn });
  }
  arbitrary(compileFn) {
    this.set(ARBITRARY_VARIANT, { kind: "arbitrary", compileFn });
  }
  has(name) {
    return this.utilities.has(name);
  }
  get(name) {
    return this.utilities.get(name);
  }
  kind(name) {
    return this.utilities.get(name).kind;
  }
  getCompletions(name) {
    return this.completions.get(name)?.() ?? [];
  }
  suggest(name, groups) {
    this.completions.set(name, groups);
  }
  keys() {
    return this.utilities.keys();
  }
  entries() {
    return this.utilities.entries();
  }
  getArbitrary() {
    return this.get(ARBITRARY_VARIANT).compileFn;
  }
  set(name, { kind, compileFn }) {
    this.utilities.set(name, {
      kind,
      compileFn
    });
  }
};
function atRoot(rules) {
  return rule("@at-root", rules);
}
function property(ident, initialValue, syntax) {
  return rule(`@property ${ident}`, [
    decl("syntax", syntax ? `"${syntax}"` : `"*"`),
    decl("inherits", "false"),
    // If there's no initial value, it's important that we omit it rather than
    // use an empty value. Safari currently doesn't support an empty
    // `initial-value` properly, so we have to design how we use things around
    // the guaranteed invalid value instead, which is how `initial-value`
    // behaves when omitted.
    ...initialValue ? [decl("initial-value", initialValue)] : []
  ]);
}
function withAlpha(value, alpha) {
  if (alpha === null)
    return value;
  let alphaAsNumber = Number(alpha);
  if (!Number.isNaN(alphaAsNumber)) {
    alpha = `${alphaAsNumber * 100}%`;
  }
  return `color-mix(in srgb, ${value} ${alpha}, transparent)`;
}
function asColor(value, modifier, theme) {
  if (!modifier)
    return value;
  if (modifier.kind === "arbitrary") {
    return withAlpha(value, modifier.value);
  }
  let alpha = theme.resolve(modifier.value, ["--opacity"]);
  if (alpha) {
    return withAlpha(value, alpha);
  }
  if (Number.isNaN(Number(modifier.value))) {
    return null;
  }
  return withAlpha(value, `${modifier.value}%`);
}
function withNegative(value, candidate) {
  return candidate.negative ? `calc(${value} * -1)` : value;
}
function resolveThemeColor(candidate, theme, themeKeys) {
  let value = null;
  switch (candidate.value.value) {
    case "transparent": {
      value = "transparent";
      break;
    }
    case "current": {
      value = "currentColor";
      break;
    }
    default: {
      value = theme.resolve(candidate.value.value, themeKeys);
      break;
    }
  }
  return value ? asColor(value, candidate.modifier, theme) : null;
}
function createUtilities(theme) {
  let utilities = new Utilities();
  utilities.arbitrary((candidate) => {
    let value = candidate.value;
    if (candidate.modifier) {
      value = asColor(value, candidate.modifier, theme);
    }
    if (value === null)
      return;
    return [decl(candidate.property, value)];
  });
  function suggest(classRoot, defns) {
    function* resolve2(themeKeys) {
      for (let value of theme.keysInNamespaces(themeKeys)) {
        yield value.replaceAll("_", ".");
      }
    }
    utilities.suggest(classRoot, () => {
      let groups = [];
      for (let defn of defns()) {
        if (typeof defn === "string") {
          groups.push({ values: [defn], modifiers: [] });
          continue;
        }
        let values = [
          ...defn.values ?? [],
          ...resolve2(defn.valueThemeKeys ?? [])
        ];
        let modifiers = [...defn.modifiers ?? [], ...resolve2(defn.modifierThemeKeys ?? [])];
        if (defn.hasDefaultValue) {
          values.unshift(null);
        }
        groups.push({ supportsNegative: defn.supportsNegative, values, modifiers });
      }
      return groups;
    });
  }
  function staticUtility(className, declarations) {
    utilities.static(className, (candidate) => {
      if (candidate.negative)
        return;
      return declarations.map((node) => {
        return typeof node === "function" ? node() : decl(node[0], node[1]);
      });
    });
  }
  function functionalUtility(classRoot, desc) {
    utilities.functional(classRoot, (candidate) => {
      if (candidate.negative && !desc.supportsNegative)
        return;
      let value = null;
      if (!candidate.value) {
        value = desc.defaultValue ?? theme.get(desc.themeKeys);
      } else if (candidate.value.kind === "arbitrary") {
        value = candidate.value.value;
      } else {
        value = theme.resolve(candidate.value.fraction ?? candidate.value.value, desc.themeKeys);
        if (value === null && desc.supportsFractions && candidate.value.fraction) {
          value = `calc(${candidate.value.fraction} * 100%)`;
        }
        if (value === null && desc.handleBareValue) {
          value = desc.handleBareValue(candidate.value);
        }
      }
      if (value === null)
        return;
      return desc.handle(withNegative(value, candidate));
    });
    suggest(classRoot, () => [
      {
        supportsNegative: desc.supportsNegative,
        valueThemeKeys: desc.themeKeys,
        hasDefaultValue: desc.defaultValue !== void 0 && desc.defaultValue !== null
      }
    ]);
  }
  function colorUtility(classRoot, desc) {
    utilities.functional(classRoot, (candidate) => {
      if (!candidate.value)
        return;
      if (candidate.negative)
        return;
      let value = null;
      if (candidate.value.kind === "arbitrary") {
        value = candidate.value.value;
        value = asColor(value, candidate.modifier, theme);
      } else {
        value = resolveThemeColor(candidate, theme, desc.themeKeys);
      }
      if (value === null)
        return;
      return desc.handle(value);
    });
    suggest(classRoot, () => [
      {
        values: ["current", "transparent"],
        valueThemeKeys: desc.themeKeys,
        modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
        modifierThemeKeys: ["--opacity"]
      }
    ]);
  }
  staticUtility("sr-only", [
    ["position", "absolute"],
    ["width", "1px"],
    ["height", "1px"],
    ["padding", "0"],
    ["margin", "-1px"],
    ["overflow", "hidden"],
    ["clip", "rect(0, 0, 0, 0)"],
    ["white-space", "nowrap"],
    ["border-width", "0"]
  ]);
  staticUtility("not-sr-only", [
    ["position", "static"],
    ["width", "auto"],
    ["height", "auto"],
    ["padding", "0"],
    ["margin", "0"],
    ["overflow", "visible"],
    ["clip", "auto"],
    ["white-space", "normal"]
  ]);
  staticUtility("pointer-events-none", [["pointer-events", "none"]]);
  staticUtility("pointer-events-auto", [["pointer-events", "auto"]]);
  staticUtility("visible", [["visibility", "visible"]]);
  staticUtility("invisible", [["visibility", "hidden"]]);
  staticUtility("collapse", [["visibility", "collapse"]]);
  staticUtility("static", [["position", "static"]]);
  staticUtility("fixed", [["position", "fixed"]]);
  staticUtility("absolute", [["position", "absolute"]]);
  staticUtility("relative", [["position", "relative"]]);
  staticUtility("sticky", [["position", "sticky"]]);
  staticUtility("inset-auto", [["inset", "auto"]]);
  utilities.static("inset-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("inset", value)];
  });
  functionalUtility("inset", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [decl("inset", value)]
  });
  staticUtility("inset-x-auto", [
    ["--tw-sort", "inset-inline"],
    ["right", "auto"],
    ["left", "auto"]
  ]);
  utilities.static("inset-x-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("--tw-sort", "inset-inline"), decl("right", value), decl("left", value)];
  });
  functionalUtility("inset-x", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [
      decl("--tw-sort", "inset-inline"),
      decl("right", value),
      decl("left", value)
    ]
  });
  staticUtility("inset-y-auto", [
    ["--tw-sort", "inset-block"],
    ["top", "auto"],
    ["bottom", "auto"]
  ]);
  utilities.static("inset-y-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("--tw-sort", "inset-block"), decl("top", value), decl("bottom", value)];
  });
  functionalUtility("inset-y", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [
      decl("--tw-sort", "inset-block"),
      decl("top", value),
      decl("bottom", value)
    ]
  });
  staticUtility("start-auto", [["inset-inline-start", "auto"]]);
  utilities.static("start-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("inset-inline-start", value)];
  });
  functionalUtility("start", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [decl("inset-inline-start", value)]
  });
  staticUtility("end-auto", [["inset-inline-end", "auto"]]);
  utilities.static("end-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("inset-inline-end", value)];
  });
  functionalUtility("end", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [decl("inset-inline-end", value)]
  });
  staticUtility("top-auto", [["top", "auto"]]);
  utilities.static("top-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("top", value)];
  });
  functionalUtility("top", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [decl("top", value)]
  });
  staticUtility("right-auto", [["right", "auto"]]);
  utilities.static("right-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("right", value)];
  });
  functionalUtility("right", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [decl("right", value)]
  });
  staticUtility("bottom-auto", [["bottom", "auto"]]);
  utilities.static("bottom-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("bottom", value)];
  });
  functionalUtility("bottom", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [decl("bottom", value)]
  });
  staticUtility("left-auto", [["left", "auto"]]);
  utilities.static("left-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [decl("left", value)];
  });
  functionalUtility("left", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--inset", "--spacing"],
    handle: (value) => [decl("left", value)]
  });
  staticUtility("isolate", [["isolation", "isolate"]]);
  staticUtility("isolation-auto", [["isolation", "auto"]]);
  staticUtility("z-auto", [["z-index", "auto"]]);
  functionalUtility("z", {
    supportsNegative: true,
    handleBareValue: ({ value }) => value,
    themeKeys: ["--z-index"],
    handle: (value) => [decl("z-index", value)]
  });
  suggest("z", () => [
    {
      supportsNegative: true,
      values: ["0", "10", "20", "30", "40", "50"],
      valueThemeKeys: ["--z-index"]
    }
  ]);
  staticUtility("order-first", [["order", "calc(-infinity)"]]);
  staticUtility("order-last", [["order", "calc(infinity)"]]);
  staticUtility("order-none", [["order", "0"]]);
  functionalUtility("order", {
    supportsNegative: true,
    handleBareValue: ({ value }) => value,
    themeKeys: ["--order"],
    handle: (value) => [decl("order", value)]
  });
  suggest("order", () => [
    {
      supportsNegative: true,
      values: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--order"]
    }
  ]);
  staticUtility("col-auto", [["grid-column", "auto"]]);
  functionalUtility("col", {
    themeKeys: ["--grid-column"],
    handle: (value) => [decl("grid-column", value)]
  });
  staticUtility("col-span-full", [["grid-column", "1 / -1"]]);
  functionalUtility("col-span", {
    themeKeys: [],
    handleBareValue: ({ value }) => value,
    handle: (value) => [decl("grid-column", `span ${value} / span ${value}`)]
  });
  staticUtility("col-start-auto", [["grid-column-start", "auto"]]);
  functionalUtility("col-start", {
    handleBareValue: ({ value }) => value,
    themeKeys: ["--grid-column-start"],
    handle: (value) => [decl("grid-column-start", value)]
  });
  staticUtility("col-end-auto", [["grid-column-end", "auto"]]);
  functionalUtility("col-end", {
    handleBareValue: ({ value }) => value,
    themeKeys: ["--grid-column-end"],
    handle: (value) => [decl("grid-column-end", value)]
  });
  suggest("col-span", () => [
    {
      values: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      valueThemeKeys: []
    }
  ]);
  suggest("col-start", () => [
    {
      values: Array.from({ length: 13 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--grid-column-start"]
    }
  ]);
  suggest("col-end", () => [
    {
      values: Array.from({ length: 13 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--grid-column-end"]
    }
  ]);
  staticUtility("row-auto", [["grid-row", "auto"]]);
  functionalUtility("row", {
    themeKeys: ["--grid-row"],
    handle: (value) => [decl("grid-row", value)]
  });
  staticUtility("row-span-full", [["grid-row", "1 / -1"]]);
  functionalUtility("row-span", {
    themeKeys: [],
    handleBareValue: ({ value }) => value,
    handle: (value) => [decl("grid-row", `span ${value} / span ${value}`)]
  });
  staticUtility("row-start-auto", [["grid-row-start", "auto"]]);
  functionalUtility("row-start", {
    handleBareValue: ({ value }) => value,
    themeKeys: ["--grid-row-start"],
    handle: (value) => [decl("grid-row-start", value)]
  });
  staticUtility("row-end-auto", [["grid-row-end", "auto"]]);
  functionalUtility("row-end", {
    handleBareValue: ({ value }) => value,
    themeKeys: ["--grid-row-end"],
    handle: (value) => [decl("grid-row-end", value)]
  });
  suggest("row-span", () => [
    {
      values: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      valueThemeKeys: []
    }
  ]);
  suggest("row-start", () => [
    {
      values: Array.from({ length: 13 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--grid-row-start"]
    }
  ]);
  suggest("row-end", () => [
    {
      values: Array.from({ length: 13 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--grid-row-end"]
    }
  ]);
  staticUtility("float-start", [["float", "start"]]);
  staticUtility("float-end", [["float", "end"]]);
  staticUtility("float-right", [["float", "right"]]);
  staticUtility("float-left", [["float", "left"]]);
  staticUtility("float-none", [["float", "none"]]);
  staticUtility("clear-start", [["clear", "start"]]);
  staticUtility("clear-end", [["clear", "end"]]);
  staticUtility("clear-right", [["clear", "right"]]);
  staticUtility("clear-left", [["clear", "left"]]);
  staticUtility("clear-both", [["clear", "both"]]);
  staticUtility("clear-none", [["clear", "none"]]);
  for (let [namespace, properties, sort] of [
    ["m", ["margin"]],
    ["mx", ["margin-left", "margin-right"], "margin-inline"],
    ["my", ["margin-top", "margin-bottom"], "margin-block"],
    ["ms", ["margin-inline-start"]],
    ["me", ["margin-inline-end"]],
    ["mt", ["margin-top"]],
    ["mr", ["margin-right"]],
    ["mb", ["margin-bottom"]],
    ["ml", ["margin-left"]]
  ]) {
    staticUtility(
      `${namespace}-auto`,
      properties.map((property2) => [property2, "auto"])
    );
    functionalUtility(namespace, {
      supportsNegative: true,
      themeKeys: ["--margin", "--spacing"],
      handle: (value) => [
        ...sort ? [decl("--tw-sort", sort)] : [],
        ...properties.map((property2) => decl(property2, value))
      ]
    });
  }
  staticUtility("box-border", [["box-sizing", "border-box"]]);
  staticUtility("box-content", [["box-sizing", "content-box"]]);
  staticUtility("line-clamp-none", [
    ["overlow", "visible"],
    ["display", "block"],
    ["-webkit-box-orient", "horizonal"],
    ["-webkit-line-clamp", "none"]
  ]);
  functionalUtility("line-clamp", {
    themeKeys: ["--line-clamp"],
    handleBareValue: ({ value }) => value,
    handle: (value) => [
      decl("overlow", "hidden"),
      decl("display", "-webkit-box"),
      decl("-webkit-box-orient", "vertical"),
      decl("-webkit-line-clamp", value)
    ]
  });
  suggest("line-clamp", () => [
    {
      values: ["1", "2", "3", "4", "5", "6"],
      valueThemeKeys: ["--line-clamp"]
    }
  ]);
  staticUtility("block", [["display", "block"]]);
  staticUtility("inline-block", [["display", "inline-block"]]);
  staticUtility("inline", [["display", "inline"]]);
  staticUtility("hidden", [["display", "none"]]);
  staticUtility("inline-flex", [["display", "inline-flex"]]);
  staticUtility("table", [["display", "table"]]);
  staticUtility("inline-table", [["display", "inline-table"]]);
  staticUtility("table-caption", [["display", "table-caption"]]);
  staticUtility("table-cell", [["display", "table-cell"]]);
  staticUtility("table-column", [["display", "table-column"]]);
  staticUtility("table-column-group", [["display", "table-column-group"]]);
  staticUtility("table-footer-group", [["display", "table-footer-group"]]);
  staticUtility("table-header-group", [["display", "table-header-group"]]);
  staticUtility("table-row-group", [["display", "table-row-group"]]);
  staticUtility("table-row", [["display", "table-row"]]);
  staticUtility("flow-root", [["display", "flow-root"]]);
  staticUtility("grid", [["display", "grid"]]);
  staticUtility("inline-grid", [["display", "inline-grid"]]);
  staticUtility("contents", [["display", "contents"]]);
  staticUtility("list-item", [["display", "list-item"]]);
  staticUtility("aspect-auto", [["aspect-ratio", "auto"]]);
  staticUtility("aspect-square", [["aspect-ratio", "1 / 1"]]);
  staticUtility("aspect-video", [["aspect-ratio", "16 / 9"]]);
  functionalUtility("aspect", {
    themeKeys: ["--aspect-ratio"],
    handleBareValue: ({ fraction }) => fraction,
    handle: (value) => [decl("aspect-ratio", value)]
  });
  for (let [key, value] of [
    ["auto", "auto"],
    ["full", "100%"],
    ["min", "min-content"],
    ["max", "max-content"],
    ["fit", "fit-content"]
  ]) {
    staticUtility(`size-${key}`, [
      ["--tw-sort", "size"],
      ["width", value],
      ["height", value]
    ]);
  }
  functionalUtility("size", {
    supportsFractions: true,
    themeKeys: ["--size", "--spacing"],
    handle: (value) => [decl("--tw-sort", "size"), decl("width", value), decl("height", value)]
  });
  for (let [key, value] of [
    ["auto", "auto"],
    ["full", "100%"],
    ["screen", "100vw"],
    ["svw", "100svw"],
    ["lvw", "100lvw"],
    ["dvw", "100dvw"],
    ["min", "min-content"],
    ["max", "max-content"],
    ["fit", "fit-content"]
  ]) {
    staticUtility(`w-${key}`, [["width", value]]);
  }
  functionalUtility("w", {
    supportsFractions: true,
    themeKeys: ["--width", "--spacing"],
    handle: (value) => [decl("width", value)]
  });
  for (let [key, value] of [
    ["auto", "auto"],
    ["full", "100%"],
    ["min", "min-content"],
    ["max", "max-content"],
    ["fit", "fit-content"]
  ]) {
    staticUtility(`min-w-${key}`, [["min-width", value]]);
  }
  functionalUtility("min-w", {
    themeKeys: ["--min-width", "--width", "--spacing"],
    handle: (value) => [decl("min-width", value)]
  });
  for (let [key, value] of [
    ["none", "none"],
    ["full", "100%"],
    ["min", "min-content"],
    ["max", "max-content"],
    ["fit", "fit-content"]
  ]) {
    staticUtility(`max-w-${key}`, [["max-width", value]]);
  }
  functionalUtility("max-w", {
    themeKeys: ["--max-width", "--width", "--spacing"],
    handle: (value) => [decl("max-width", value)]
  });
  for (let [key, value] of [
    ["auto", "auto"],
    ["full", "100%"],
    ["screen", "100vh"],
    ["svh", "100svh"],
    ["lvh", "100lvh"],
    ["dvh", "100dvh"],
    ["min", "min-content"],
    ["max", "max-content"],
    ["fit", "fit-content"]
  ]) {
    staticUtility(`h-${key}`, [["height", value]]);
  }
  functionalUtility("h", {
    supportsFractions: true,
    themeKeys: ["--height", "--spacing"],
    handle: (value) => [decl("height", value)]
  });
  for (let [key, value] of [
    ["auto", "auto"],
    ["full", "100%"],
    ["screen", "100vh"],
    ["svh", "100svh"],
    ["lvh", "100lvh"],
    ["dvh", "100dvh"],
    ["min", "min-content"],
    ["max", "max-content"],
    ["fit", "fit-content"]
  ]) {
    staticUtility(`min-h-${key}`, [["min-height", value]]);
  }
  functionalUtility("min-h", {
    themeKeys: ["--min-height", "--spacing"],
    handle: (value) => [decl("min-height", value)]
  });
  for (let [key, value] of [
    ["none", "none"],
    ["full", "100%"],
    ["screen", "100vh"],
    ["svh", "100svh"],
    ["lvh", "100lvh"],
    ["dvh", "100dvh"],
    ["min", "min-content"],
    ["max", "max-content"],
    ["fit", "fit-content"]
  ]) {
    staticUtility(`max-h-${key}`, [["max-height", value]]);
  }
  functionalUtility("max-h", {
    themeKeys: ["--max-height", "--spacing"],
    handle: (value) => [decl("max-height", value)]
  });
  staticUtility("flex-auto", [["flex", "auto"]]);
  staticUtility("flex-initial", [["flex", "0 auto"]]);
  staticUtility("flex-none", [["flex", "none"]]);
  utilities.functional("flex", (candidate) => {
    if (candidate.negative)
      return;
    if (!candidate.value) {
      return [decl("display", "flex")];
    }
    if (candidate.value.kind === "arbitrary") {
      return [decl("flex", candidate.value.value)];
    }
    if (candidate.value.fraction) {
      return [decl("flex", `calc(${candidate.value.fraction} * 100%)`)];
    }
    return [decl("flex", candidate.value.value)];
  });
  functionalUtility("shrink", {
    defaultValue: "1",
    themeKeys: [],
    handleBareValue: ({ value }) => value,
    handle: (value) => [decl("flex-shrink", value)]
  });
  functionalUtility("grow", {
    defaultValue: "1",
    themeKeys: [],
    handleBareValue: ({ value }) => value,
    handle: (value) => [decl("flex-grow", value)]
  });
  suggest("shrink", () => [
    {
      values: ["0"],
      valueThemeKeys: [],
      hasDefaultValue: true
    }
  ]);
  suggest("grow", () => [
    {
      values: ["0"],
      valueThemeKeys: [],
      hasDefaultValue: true
    }
  ]);
  staticUtility("basis-auto", [["flex-basis", "auto"]]);
  staticUtility("basis-full", [["flex-basis", "100%"]]);
  functionalUtility("basis", {
    supportsFractions: true,
    themeKeys: ["--flex-basis", "--width", "--spacing"],
    handle: (value) => [decl("flex-basis", value)]
  });
  staticUtility("table-auto", [["table-layout", "auto"]]);
  staticUtility("table-fixed", [["table-layout", "fixed"]]);
  staticUtility("caption-top", [["caption-side", "top"]]);
  staticUtility("caption-bottom", [["caption-side", "bottom"]]);
  staticUtility("border-collapse", [["border-collapse", "collapse"]]);
  staticUtility("border-separate", [["border-collapse", "separate"]]);
  let borderSpacingProperties = () => atRoot([
    property("--tw-border-spacing-x", "0", "<length>"),
    property("--tw-border-spacing-y", "0", "<length>")
  ]);
  functionalUtility("border-spacing", {
    themeKeys: ["--border-spacing", "--spacing"],
    handle: (value) => [
      borderSpacingProperties(),
      decl("--tw-border-spacing-x", value),
      decl("--tw-border-spacing-y", value),
      decl("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")
    ]
  });
  functionalUtility("border-spacing-x", {
    themeKeys: ["--border-spacing", "--spacing"],
    handle: (value) => [
      borderSpacingProperties(),
      decl("--tw-border-spacing-x", value),
      decl("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")
    ]
  });
  functionalUtility("border-spacing-y", {
    themeKeys: ["--border-spacing", "--spacing"],
    handle: (value) => [
      borderSpacingProperties(),
      decl("--tw-border-spacing-y", value),
      decl("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")
    ]
  });
  staticUtility("origin-center", [["transform-origin", "center"]]);
  staticUtility("origin-top", [["transform-origin", "top"]]);
  staticUtility("origin-top-right", [["transform-origin", "top right"]]);
  staticUtility("origin-right", [["transform-origin", "right"]]);
  staticUtility("origin-bottom-right", [["transform-origin", "bottom right"]]);
  staticUtility("origin-bottom", [["transform-origin", "bottom"]]);
  staticUtility("origin-bottom-left", [["transform-origin", "bottom left"]]);
  staticUtility("origin-left", [["transform-origin", "left"]]);
  staticUtility("origin-top-left", [["transform-origin", "top left"]]);
  functionalUtility("origin", {
    themeKeys: ["--transform-origin"],
    handle: (value) => [decl("transform-origin", value)]
  });
  let translateProperties = () => atRoot([
    property("--tw-translate-x", "0", "<length-percentage>"),
    property("--tw-translate-y", "0", "<length-percentage>")
  ]);
  utilities.static("translate-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [
      translateProperties(),
      decl("--tw-translate-x", value),
      decl("--tw-translate-y", value),
      decl("translate", "var(--tw-translate-x) var(--tw-translate-y)")
    ];
  });
  functionalUtility("translate", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--translate", "--spacing"],
    handle: (value) => [
      translateProperties(),
      decl("--tw-translate-x", value),
      decl("--tw-translate-y", value),
      decl("translate", "var(--tw-translate-x) var(--tw-translate-y)")
    ]
  });
  utilities.static("translate-x-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [
      translateProperties(),
      decl("--tw-translate-x", value),
      decl("translate", "var(--tw-translate-x) var(--tw-translate-y)")
    ];
  });
  functionalUtility("translate-x", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--translate", "--spacing"],
    handle: (value) => [
      translateProperties(),
      decl("--tw-translate-x", value),
      decl("translate", "var(--tw-translate-x) var(--tw-translate-y)")
    ]
  });
  utilities.static("translate-y-full", (candidate) => {
    let value = candidate.negative ? "-100%" : "100%";
    return [
      translateProperties(),
      decl("--tw-translate-y", value),
      decl("translate", "var(--tw-translate-x) var(--tw-translate-y)")
    ];
  });
  functionalUtility("translate-y", {
    supportsNegative: true,
    supportsFractions: true,
    themeKeys: ["--translate", "--spacing"],
    handle: (value) => [
      translateProperties(),
      decl("--tw-translate-y", value),
      decl("translate", "var(--tw-translate-x) var(--tw-translate-y)")
    ]
  });
  functionalUtility("rotate", {
    supportsNegative: true,
    themeKeys: ["--rotate"],
    handleBareValue: ({ value }) => `${value}deg`,
    handle: (value) => [decl("rotate", value)]
  });
  suggest("rotate", () => [
    {
      supportsNegative: true,
      values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
      valueThemeKeys: ["--rotate"]
    }
  ]);
  let skewProperties = () => atRoot([property("--tw-skew-x", "0deg", "<angle>"), property("--tw-skew-y", "0deg", "<angle>")]);
  functionalUtility("skew", {
    supportsNegative: true,
    themeKeys: ["--skew"],
    handleBareValue: ({ value }) => `${value}deg`,
    handle: (value) => [
      skewProperties(),
      decl("--tw-skew-x", value),
      decl("--tw-skew-y", value),
      decl("transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))")
    ]
  });
  functionalUtility("skew-x", {
    supportsNegative: true,
    themeKeys: ["--skew"],
    handleBareValue: ({ value }) => `${value}deg`,
    handle: (value) => [
      skewProperties(),
      decl("--tw-skew-x", value),
      decl("transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))")
    ]
  });
  functionalUtility("skew-y", {
    supportsNegative: true,
    themeKeys: ["--skew"],
    handleBareValue: ({ value }) => `${value}deg`,
    handle: (value) => [
      skewProperties(),
      decl("--tw-skew-y", value),
      decl("transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))")
    ]
  });
  suggest("skew", () => [
    {
      supportsNegative: true,
      values: ["0", "1", "2", "3", "6", "12"],
      valueThemeKeys: ["--skew"]
    }
  ]);
  suggest("skew-x", () => [
    {
      supportsNegative: true,
      values: ["0", "1", "2", "3", "6", "12"],
      valueThemeKeys: ["--skew"]
    }
  ]);
  suggest("skew-y", () => [
    {
      supportsNegative: true,
      values: ["0", "1", "2", "3", "6", "12"],
      valueThemeKeys: ["--skew"]
    }
  ]);
  let scaleProperties = () => atRoot([property("--tw-scale-x", "1", "<number>"), property("--tw-scale-y", "1", "<number>")]);
  functionalUtility("scale", {
    supportsNegative: true,
    themeKeys: ["--scale"],
    handleBareValue: ({ value }) => `${value}%`,
    handle: (value) => [
      scaleProperties(),
      decl("--tw-scale-x", value),
      decl("--tw-scale-y", value),
      decl("scale", "var(--tw-scale-x) var(--tw-scale-y)")
    ]
  });
  functionalUtility("scale-x", {
    supportsNegative: true,
    themeKeys: ["--scale"],
    handleBareValue: ({ value }) => `${value}%`,
    handle: (value) => [
      scaleProperties(),
      decl("--tw-scale-x", value),
      decl("scale", "var(--tw-scale-x) var(--tw-scale-y)")
    ]
  });
  functionalUtility("scale-y", {
    supportsNegative: true,
    themeKeys: ["--scale"],
    handleBareValue: ({ value }) => `${value}%`,
    handle: (value) => [
      scaleProperties(),
      decl("--tw-scale-y", value),
      decl("scale", "var(--tw-scale-x) var(--tw-scale-y)")
    ]
  });
  suggest("scale", () => [
    {
      supportsNegative: true,
      values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"],
      valueThemeKeys: ["--scale"]
    }
  ]);
  suggest("scale-x", () => [
    {
      supportsNegative: true,
      values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"],
      valueThemeKeys: ["--scale"]
    }
  ]);
  suggest("scale-y", () => [
    {
      supportsNegative: true,
      values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"],
      valueThemeKeys: ["--scale"]
    }
  ]);
  staticUtility("transform", [
    skewProperties,
    ["transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))"]
  ]);
  staticUtility("transform-cpu", [["transform", "translate(0,0)"]]);
  staticUtility("transform-gpu", [["transform", "translate(0,0,0)"]]);
  staticUtility("transform-none", [
    ["translate", "none"],
    ["rotate", "none"],
    ["scale", "none"],
    ["transform", "none"]
  ]);
  for (let value of [
    "auto",
    "default",
    "pointer",
    "wait",
    "text",
    "move",
    "help",
    "not-allowed",
    "none",
    "context-menu",
    "progress",
    "cell",
    "crosshair",
    "vertical-text",
    "alias",
    "copy",
    "no-drop",
    "grab",
    "grabbing",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "zoom-in",
    "zoom-out"
  ]) {
    staticUtility(`cursor-${value}`, [["cursor", value]]);
  }
  functionalUtility("cursor", {
    themeKeys: ["--cursor"],
    handle: (value) => [decl("cursor", value)]
  });
  for (let value of ["auto", "none", "manipulation"]) {
    staticUtility(`touch-${value}`, [["touch-action", value]]);
  }
  let touchProperties = () => atRoot([property("--tw-pan-x"), property("--tw-pan-y"), property("--tw-pinch-zoom")]);
  for (let value of ["x", "left", "right"]) {
    staticUtility(`touch-pan-${value}`, [
      touchProperties,
      ["--tw-pan-x", `pan-${value}`],
      ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]
    ]);
  }
  for (let value of ["y", "up", "down"]) {
    staticUtility(`touch-pan-${value}`, [
      touchProperties,
      ["--tw-pan-y", `pan-${value}`],
      ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]
    ]);
  }
  staticUtility("touch-pinch-zoom", [
    touchProperties,
    ["--tw-pinch-zoom", `pinch-zoom`],
    ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]
  ]);
  for (let value of ["none", "text", "all", "auto"]) {
    staticUtility(`select-${value}`, [
      ["-webkit-user-select", value],
      ["user-select", value]
    ]);
  }
  staticUtility("resize-none", [["resize", "none"]]);
  staticUtility("resize-both", [["resize", "both"]]);
  staticUtility("resize-x", [["resize", "horizontal"]]);
  staticUtility("resize-y", [["resize", "vertical"]]);
  staticUtility("snap-none", [["scroll-snap-type", "none"]]);
  let snapProperties = () => atRoot([property("--tw-scroll-snap-strictness", "proximity", "*")]);
  for (let value of ["x", "y", "both"]) {
    staticUtility(`snap-${value}`, [
      snapProperties,
      ["scroll-snap-type", `${value} var(--tw-scroll-snap-strictness)`]
    ]);
  }
  staticUtility("snap-mandatory", [snapProperties, ["--tw-scroll-snap-strictness", "mandatory"]]);
  staticUtility("snap-proximity", [snapProperties, ["--tw-scroll-snap-strictness", "proximity"]]);
  staticUtility("snap-align-none", [["scroll-snap-align", "none"]]);
  staticUtility("snap-start", [["scroll-snap-align", "start"]]);
  staticUtility("snap-end", [["scroll-snap-align", "end"]]);
  staticUtility("snap-center", [["scroll-snap-align", "center"]]);
  staticUtility("snap-normal", [["scroll-snap-stop", "normal"]]);
  staticUtility("snap-always", [["scroll-snap-stop", "always"]]);
  functionalUtility("scroll-m", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin", value)]
  });
  functionalUtility("scroll-mx", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-left", value), decl("scroll-margin-right", value)]
  });
  functionalUtility("scroll-my", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-top", value), decl("scroll-margin-bottom", value)]
  });
  functionalUtility("scroll-ms", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-inline-start", value)]
  });
  functionalUtility("scroll-me", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-inline-end", value)]
  });
  functionalUtility("scroll-mt", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-top", value)]
  });
  functionalUtility("scroll-mr", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-right", value)]
  });
  functionalUtility("scroll-mb", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-bottom", value)]
  });
  functionalUtility("scroll-ml", {
    supportsNegative: true,
    themeKeys: ["--scroll-margin", "--spacing"],
    handle: (value) => [decl("scroll-margin-left", value)]
  });
  functionalUtility("scroll-p", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding", value)]
  });
  functionalUtility("scroll-px", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-left", value), decl("scroll-padding-right", value)]
  });
  functionalUtility("scroll-py", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-top", value), decl("scroll-padding-bottom", value)]
  });
  functionalUtility("scroll-ps", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-inline-start", value)]
  });
  functionalUtility("scroll-pe", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-inline-end", value)]
  });
  functionalUtility("scroll-pt", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-top", value)]
  });
  functionalUtility("scroll-pr", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-right", value)]
  });
  functionalUtility("scroll-pb", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-bottom", value)]
  });
  functionalUtility("scroll-pl", {
    supportsNegative: true,
    themeKeys: ["--scroll-padding", "--spacing"],
    handle: (value) => [decl("scroll-padding-left", value)]
  });
  staticUtility("list-inside", [["list-style-position", "inside"]]);
  staticUtility("list-outside", [["list-style-position", "outside"]]);
  staticUtility("list-none", [["list-style-type", "none"]]);
  staticUtility("list-disc", [["list-style-type", "disc"]]);
  staticUtility("list-decimal", [["list-style-type", "decimal"]]);
  functionalUtility("list", {
    themeKeys: ["--list-style-type"],
    handle: (value) => [decl("list-style-type", value)]
  });
  staticUtility("list-image-none", [["list-style-image", "none"]]);
  functionalUtility("list-image", {
    themeKeys: ["--list-style-image"],
    handle: (value) => [decl("list-style-image", value)]
  });
  staticUtility("appearance-none", [["appearance", "none"]]);
  staticUtility("appearance-auto", [["appearance", "auto"]]);
  staticUtility("columns-auto", [["columns", "auto"]]);
  functionalUtility("columns", {
    themeKeys: ["--columns", "--width"],
    handleBareValue: ({ value }) => value,
    handle: (value) => [decl("columns", value)]
  });
  suggest("columns", () => [
    {
      values: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--columns", "--width"]
    }
  ]);
  for (let value of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) {
    staticUtility(`break-before-${value}`, [["break-before", value]]);
  }
  for (let value of ["auto", "avoid", "avoid-page", "avoid-column"]) {
    staticUtility(`break-inside-${value}`, [["break-inside", value]]);
  }
  for (let value of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) {
    staticUtility(`break-after-${value}`, [["break-after", value]]);
  }
  staticUtility("grid-flow-row", [["grid-auto-flow", "row"]]);
  staticUtility("grid-flow-col", [["grid-auto-flow", "column"]]);
  staticUtility("grid-flow-dense", [["grid-auto-flow", "dense"]]);
  staticUtility("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]);
  staticUtility("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]);
  staticUtility("auto-cols-auto", [["grid-auto-columns", "auto"]]);
  staticUtility("auto-cols-min", [["grid-auto-columns", "min-content"]]);
  staticUtility("auto-cols-max", [["grid-auto-columns", "max-content"]]);
  staticUtility("auto-cols-fr", [["grid-auto-columns", "minmax(0, 1fr)"]]);
  functionalUtility("auto-cols", {
    themeKeys: ["--grid-auto-columns"],
    handle: (value) => [decl("grid-auto-columns", value)]
  });
  staticUtility("auto-rows-auto", [["grid-auto-rows", "auto"]]);
  staticUtility("auto-rows-min", [["grid-auto-rows", "min-content"]]);
  staticUtility("auto-rows-max", [["grid-auto-rows", "max-content"]]);
  staticUtility("auto-rows-fr", [["grid-auto-rows", "minmax(0, 1fr)"]]);
  functionalUtility("auto-rows", {
    themeKeys: ["--grid-auto-rows"],
    handle: (value) => [decl("grid-auto-rows", value)]
  });
  staticUtility("grid-cols-none", [["grid-template-columns", "none"]]);
  staticUtility("grid-cols-subgrid", [["grid-template-columns", "subgrid"]]);
  functionalUtility("grid-cols", {
    themeKeys: ["--grid-template-columns"],
    handleBareValue: ({ value }) => `repeat(${value}, minmax(0, 1fr))`,
    handle: (value) => [decl("grid-template-columns", value)]
  });
  staticUtility("grid-rows-none", [["grid-template-rows", "none"]]);
  staticUtility("grid-rows-subgrid", [["grid-template-rows", "subgrid"]]);
  functionalUtility("grid-rows", {
    themeKeys: ["--grid-template-rows"],
    handleBareValue: ({ value }) => `repeat(${value}, minmax(0, 1fr))`,
    handle: (value) => [decl("grid-template-rows", value)]
  });
  suggest("grid-cols", () => [
    {
      values: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--grid-template-columns"]
    }
  ]);
  suggest("grid-rows", () => [
    {
      values: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      valueThemeKeys: ["--grid-template-rows"]
    }
  ]);
  staticUtility("flex-row", [["flex-direction", "row"]]);
  staticUtility("flex-row-reverse", [["flex-direction", "row-reverse"]]);
  staticUtility("flex-col", [["flex-direction", "column"]]);
  staticUtility("flex-col-reverse", [["flex-direction", "column-reverse"]]);
  staticUtility("flex-wrap", [["flex-wrap", "wrap"]]);
  staticUtility("flex-nowrap", [["flex-wrap", "nowrap"]]);
  staticUtility("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]);
  staticUtility("place-content-center", [["place-content", "center"]]);
  staticUtility("place-content-start", [["place-content", "start"]]);
  staticUtility("place-content-end", [["place-content", "end"]]);
  staticUtility("place-content-between", [["place-content", "between"]]);
  staticUtility("place-content-around", [["place-content", "around"]]);
  staticUtility("place-content-evenly", [["place-content", "evenly"]]);
  staticUtility("place-content-baseline", [["place-content", "baseline"]]);
  staticUtility("place-content-stretch", [["place-content", "stretch"]]);
  staticUtility("place-items-center", [["place-items", "center"]]);
  staticUtility("place-items-start", [["place-items", "start"]]);
  staticUtility("place-items-end", [["place-items", "end"]]);
  staticUtility("place-items-baseline", [["place-items", "baseline"]]);
  staticUtility("place-items-stretch", [["place-items", "stretch"]]);
  staticUtility("content-normal", [["align-content", "normal"]]);
  staticUtility("content-center", [["align-content", "center"]]);
  staticUtility("content-start", [["align-content", "flex-start"]]);
  staticUtility("content-end", [["align-content", "flex-end"]]);
  staticUtility("content-between", [["align-content", "space-between"]]);
  staticUtility("content-around", [["align-content", "space-around"]]);
  staticUtility("content-evenly", [["align-content", "space-evenly"]]);
  staticUtility("content-baseline", [["align-content", "baseline"]]);
  staticUtility("content-stretch", [["align-content", "stretch"]]);
  staticUtility("items-center", [["align-items", "center"]]);
  staticUtility("items-start", [["align-items", "flex-start"]]);
  staticUtility("items-end", [["align-items", "flex-end"]]);
  staticUtility("items-baseline", [["align-items", "baseline"]]);
  staticUtility("items-stretch", [["align-items", "stretch"]]);
  staticUtility("justify-normal", [["justify-content", "normal"]]);
  staticUtility("justify-center", [["justify-content", "center"]]);
  staticUtility("justify-start", [["justify-content", "flex-start"]]);
  staticUtility("justify-end", [["justify-content", "flex-end"]]);
  staticUtility("justify-between", [["justify-content", "space-between"]]);
  staticUtility("justify-around", [["justify-content", "space-around"]]);
  staticUtility("justify-evenly", [["justify-content", "space-evenly"]]);
  staticUtility("justify-baseline", [["justify-content", "baseline"]]);
  staticUtility("justify-stretch", [["justify-content", "stretch"]]);
  staticUtility("justify-items-normal", [["justify-items", "normal"]]);
  staticUtility("justify-items-center", [["justify-items", "center"]]);
  staticUtility("justify-items-start", [["justify-items", "start"]]);
  staticUtility("justify-items-end", [["justify-items", "end"]]);
  staticUtility("justify-items-stretch", [["justify-items", "stretch"]]);
  functionalUtility("gap", {
    themeKeys: ["--gap", "--spacing"],
    handle: (value) => [decl("gap", value)]
  });
  functionalUtility("gap-x", {
    themeKeys: ["--gap", "--spacing"],
    handle: (value) => [decl("column-gap", value)]
  });
  functionalUtility("gap-y", {
    themeKeys: ["--gap", "--spacing"],
    handle: (value) => [decl("row-gap", value)]
  });
  functionalUtility("space-x", {
    supportsNegative: true,
    themeKeys: ["--space", "--spacing"],
    handle: (value) => [
      atRoot([property("--tw-space-x-reverse", "0", "<number>")]),
      rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
        decl("--tw-sort", "row-gap"),
        decl("margin-inline-end", `calc(${value} * var(--tw-space-x-reverse))`),
        decl("margin-inline-start", `calc(${value} * calc(1 - var(--tw-space-x-reverse)))`)
      ])
    ]
  });
  functionalUtility("space-y", {
    supportsNegative: true,
    themeKeys: ["--space", "--spacing"],
    handle: (value) => [
      atRoot([property("--tw-space-y-reverse", "0", "<number>")]),
      rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
        decl("--tw-sort", "column-gap"),
        decl("margin-bottom", `calc(${value} * var(--tw-space-y-reverse))`),
        decl("margin-top", `calc(${value} * calc(1 - var(--tw-space-y-reverse)))`)
      ])
    ]
  });
  staticUtility("space-x-reverse", [
    () => atRoot([property("--tw-space-x-reverse", "0", "<number>")]),
    () => rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
      decl("--tw-sort", "row-gap"),
      decl("--tw-space-x-reverse", "1")
    ])
  ]);
  staticUtility("space-y-reverse", [
    () => atRoot([property("--tw-space-y-reverse", "0", "<number>")]),
    () => rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
      decl("--tw-sort", "column-gap"),
      decl("--tw-space-y-reverse", "1")
    ])
  ]);
  colorUtility("accent", {
    themeKeys: ["--accent-color", "--color"],
    handle: (value) => [decl("accent-color", value)]
  });
  colorUtility("caret", {
    themeKeys: ["--caret-color", "--color"],
    handle: (value) => [decl("caret-color", value)]
  });
  colorUtility("divide", {
    themeKeys: ["--divide-color", "--color"],
    handle: (value) => [
      rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
        decl("--tw-sort", "divide-color"),
        decl("border-color", value)
      ])
    ]
  });
  staticUtility("place-self-auto", [["place-self", "auto"]]);
  staticUtility("place-self-start", [["place-self", "start"]]);
  staticUtility("place-self-end", [["place-self", "end"]]);
  staticUtility("place-self-center", [["place-self", "center"]]);
  staticUtility("place-self-stretch", [["place-self", "stretch"]]);
  staticUtility("self-auto", [["align-self", "auto"]]);
  staticUtility("self-start", [["align-self", "flex-start"]]);
  staticUtility("self-end", [["align-self", "flex-end"]]);
  staticUtility("self-center", [["align-self", "center"]]);
  staticUtility("self-stretch", [["align-self", "stretch"]]);
  staticUtility("self-baseline", [["align-self", "baseline"]]);
  staticUtility("justify-self-auto", [["justify-self", "auto"]]);
  staticUtility("justify-self-start", [["justify-self", "flex-start"]]);
  staticUtility("justify-self-end", [["justify-self", "flex-end"]]);
  staticUtility("justify-self-center", [["justify-self", "center"]]);
  staticUtility("justify-self-stretch", [["justify-self", "stretch"]]);
  for (let value of ["auto", "hidden", "clip", "visible", "scroll"]) {
    staticUtility(`overflow-${value}`, [["overflow", value]]);
    staticUtility(`overflow-x-${value}`, [["overflow-x", value]]);
    staticUtility(`overflow-y-${value}`, [["overflow-y", value]]);
  }
  for (let value of ["auto", "contain", "none"]) {
    staticUtility(`overscroll-${value}`, [["overscroll-behavior", value]]);
    staticUtility(`overscroll-x-${value}`, [["overscroll-behavior-x", value]]);
    staticUtility(`overscroll-y-${value}`, [["overscroll-behavior-y", value]]);
  }
  staticUtility("scroll-auto", [["scroll-behavior", "auto"]]);
  staticUtility("scroll-smooth", [["scroll-behavior", "smooth"]]);
  staticUtility("truncate", [
    ["overflow", "hidden"],
    ["text-overflow", "ellipsis"],
    ["white-space", "nowrap"]
  ]);
  staticUtility("text-ellipsis", [["text-overflow", "ellipsis"]]);
  staticUtility("text-clip", [["text-overflow", "clip"]]);
  staticUtility("hyphens-none", [
    ["-webkit-hyphens", "none"],
    ["hyphens", "none"]
  ]);
  staticUtility("hyphens-manual", [
    ["-webkit-hyphens", "manual"],
    ["hyphens", "manual"]
  ]);
  staticUtility("hyphens-auto", [
    ["-webkit-hyphens", "auto"],
    ["hyphens", "auto"]
  ]);
  staticUtility("whitespace-normal", [["white-space", "normal"]]);
  staticUtility("whitespace-nowrap", [["white-space", "nowrap"]]);
  staticUtility("whitespace-pre", [["white-space", "pre"]]);
  staticUtility("whitespace-pre-line", [["white-space", "pre-line"]]);
  staticUtility("whitespace-pre-wrap", [["white-space", "pre-wrap"]]);
  staticUtility("whitespace-break-spaces", [["white-space", "break-spaces"]]);
  staticUtility("text-wrap", [["text-wrap", "wrap"]]);
  staticUtility("text-nowrap", [["text-wrap", "nowrap"]]);
  staticUtility("text-balance", [["text-wrap", "balance"]]);
  staticUtility("text-pretty", [["text-wrap", "pretty"]]);
  staticUtility("break-normal", [
    ["overflow-wrap", "normal"],
    ["word-break", "normal"]
  ]);
  staticUtility("break-words", [["overflow-wrap", "break-word"]]);
  staticUtility("break-all", [["word-break", "break-all"]]);
  staticUtility("break-keep", [["word-break", "break-keep"]]);
  functionalUtility("rounded", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-radius", value)]
  });
  functionalUtility("rounded-s", {
    themeKeys: ["--radius"],
    handle: (value) => [
      decl("border-start-start-radius", value),
      decl("border-end-start-radius", value)
    ]
  });
  functionalUtility("rounded-e", {
    themeKeys: ["--radius"],
    handle: (value) => [
      decl("border-start-end-radius", value),
      decl("border-end-end-radius", value)
    ]
  });
  functionalUtility("rounded-t", {
    themeKeys: ["--radius"],
    handle: (value) => [
      decl("border-top-left-radius", value),
      decl("border-top-right-radius", value)
    ]
  });
  functionalUtility("rounded-r", {
    themeKeys: ["--radius"],
    handle: (value) => [
      decl("border-top-right-radius", value),
      decl("border-bottom-right-radius", value)
    ]
  });
  functionalUtility("rounded-b", {
    themeKeys: ["--radius"],
    handle: (value) => [
      decl("border-bottom-right-radius", value),
      decl("border-bottom-left-radius", value)
    ]
  });
  functionalUtility("rounded-l", {
    themeKeys: ["--radius"],
    handle: (value) => [
      decl("border-top-left-radius", value),
      decl("border-bottom-left-radius", value)
    ]
  });
  functionalUtility("rounded-ss", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-start-start-radius", value)]
  });
  functionalUtility("rounded-se", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-start-end-radius", value)]
  });
  functionalUtility("rounded-ee", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-end-end-radius", value)]
  });
  functionalUtility("rounded-es", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-end-start-radius", value)]
  });
  functionalUtility("rounded-tl", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-top-left-radius", value)]
  });
  functionalUtility("rounded-tr", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-top-right-radius", value)]
  });
  functionalUtility("rounded-br", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-bottom-right-radius", value)]
  });
  functionalUtility("rounded-bl", {
    themeKeys: ["--radius"],
    handle: (value) => [decl("border-bottom-left-radius", value)]
  });
  staticUtility("border-solid", [
    ["--tw-border-style", "solid"],
    ["border-style", "solid"]
  ]);
  staticUtility("border-dashed", [
    ["--tw-border-style", "dashed"],
    ["border-style", "dashed"]
  ]);
  staticUtility("border-dotted", [
    ["--tw-border-style", "dotted"],
    ["border-style", "dotted"]
  ]);
  staticUtility("border-double", [
    ["--tw-border-style", "double"],
    ["border-style", "double"]
  ]);
  staticUtility("border-hidden", [
    ["--tw-border-style", "hidden"],
    ["border-style", "hidden"]
  ]);
  staticUtility("border-none", [
    ["--tw-border-style", "none"],
    ["border-style", "none"]
  ]);
  {
    let borderSideUtility2 = function(classRoot, desc) {
      utilities.functional(classRoot, (candidate) => {
        if (candidate.negative)
          return;
        if (!candidate.value) {
          let value = theme.get(["--default-border-width"]) ?? "1px";
          let decls = desc.width(value);
          if (!decls)
            return;
          return [borderProperties(), decl("border-style", "var(--tw-border-style)"), ...decls];
        }
        if (candidate.value.kind === "arbitrary") {
          let value = candidate.value.value;
          let type = candidate.value.dataType ?? inferDataType(value, ["color", "line-width", "length"]);
          switch (type) {
            case "line-width":
            case "length": {
              let decls = desc.width(value);
              if (!decls)
                return;
              return [borderProperties(), decl("border-style", "var(--tw-border-style)"), ...decls];
            }
            default: {
              value = asColor(value, candidate.modifier, theme);
              if (value === null)
                return;
              return desc.color(value);
            }
          }
        }
        {
          let value = resolveThemeColor(candidate, theme, ["--border-color", "--color"]);
          if (value) {
            return desc.color(value);
          }
        }
        {
          let value = theme.resolve(candidate.value.value, ["--border-width"]);
          if (value) {
            let decls = desc.width(value);
            if (!decls)
              return;
            return [borderProperties(), decl("border-style", "var(--tw-border-style)"), ...decls];
          }
          if (!Number.isNaN(Number(candidate.value.value))) {
            let decls = desc.width(`${candidate.value.value}px`);
            if (!decls)
              return;
            return [borderProperties(), decl("border-style", "var(--tw-border-style)"), ...decls];
          }
        }
      });
      suggest(classRoot, () => [
        {
          values: ["current", "transparent"],
          valueThemeKeys: ["--border-color", "--color"],
          modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
          modifierThemeKeys: ["--opacity"],
          hasDefaultValue: true
        },
        {
          values: [],
          valueThemeKeys: ["--border-width"]
        }
      ]);
    };
    let borderProperties = () => {
      return atRoot([property("--tw-border-style", "solid", "<custom-ident>")]);
    };
    borderSideUtility2("border", {
      width: (value) => [decl("border-width", value)],
      color: (value) => [decl("border-color", value)]
    });
    borderSideUtility2("border-x", {
      width: (value) => [decl("border-left-width", value), decl("border-right-width", value)],
      color: (value) => [decl("border-left-color", value), decl("border-right-color", value)]
    });
    borderSideUtility2("border-y", {
      width: (value) => [decl("border-top-width", value), decl("border-bottom-width", value)],
      color: (value) => [decl("border-top-color", value), decl("border-bottom-color", value)]
    });
    borderSideUtility2("border-s", {
      width: (value) => [decl("border-inline-start-width", value)],
      color: (value) => [decl("border-inline-start-color", value)]
    });
    borderSideUtility2("border-e", {
      width: (value) => [decl("border-inline-end-width", value)],
      color: (value) => [decl("border-inline-end-color", value)]
    });
    borderSideUtility2("border-t", {
      width: (value) => [decl("border-top-width", value)],
      color: (value) => [decl("border-top-color", value)]
    });
    borderSideUtility2("border-r", {
      width: (value) => [decl("border-right-width", value)],
      color: (value) => [decl("border-right-color", value)]
    });
    borderSideUtility2("border-b", {
      width: (value) => [decl("border-bottom-width", value)],
      color: (value) => [decl("border-bottom-color", value)]
    });
    borderSideUtility2("border-l", {
      width: (value) => [decl("border-left-width", value)],
      color: (value) => [decl("border-left-color", value)]
    });
    functionalUtility("divide-x", {
      defaultValue: theme.get(["--default-border-width"]) ?? "1px",
      themeKeys: ["--divide-width", "--border-width"],
      handleBareValue: ({ value }) => `${value}px`,
      handle: (value) => [
        atRoot([property("--tw-divide-x-reverse", "0", "<number>")]),
        rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
          decl("--tw-sort", "divide-x-width"),
          borderProperties(),
          decl("border-style", "var(--tw-border-style)"),
          decl("border-inline-end-width", `calc(${value} * var(--tw-divide-x-reverse))`),
          decl(
            "border-inline-start-width",
            `calc(${value} * calc(1 - var(--tw-divide-x-reverse)))`
          )
        ])
      ]
    });
    functionalUtility("divide-y", {
      defaultValue: theme.get(["--default-border-width"]) ?? "1px",
      themeKeys: ["--divide-width", "--border-width"],
      handleBareValue: ({ value }) => `${value}px`,
      handle: (value) => [
        atRoot([property("--tw-divide-y-reverse", "0", "<number>")]),
        rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
          decl("--tw-sort", "divide-y-width"),
          borderProperties(),
          decl("border-style", "var(--tw-border-style)"),
          decl("border-bottom-width", `calc(${value} * var(--tw-divide-y-reverse))`),
          decl("border-top-width", `calc(${value} * calc(1 - var(--tw-divide-y-reverse)))`)
        ])
      ]
    });
    suggest("divide-x", () => [
      {
        values: ["0", "2", "4", "8"],
        valueThemeKeys: ["--divide-width", "--border-width"],
        hasDefaultValue: true
      }
    ]);
    suggest("divide-y", () => [
      {
        values: ["0", "2", "4", "8"],
        valueThemeKeys: ["--divide-width", "--border-width"],
        hasDefaultValue: true
      }
    ]);
    staticUtility("divide-x-reverse", [
      () => atRoot([property("--tw-divide-x-reverse", "0", "<number>")]),
      () => rule(":where(& > :not([hidden]) ~ :not([hidden]))", [decl("--tw-divide-x-reverse", "1")])
    ]);
    staticUtility("divide-y-reverse", [
      () => atRoot([property("--tw-divide-y-reverse", "0", "<number>")]),
      () => rule(":where(& > :not([hidden]) ~ :not([hidden]))", [decl("--tw-divide-y-reverse", "1")])
    ]);
    for (let value of ["solid", "dashed", "dotted", "double", "none"]) {
      staticUtility(`divide-${value}`, [
        () => rule(":where(& > :not([hidden]) ~ :not([hidden]))", [
          decl("--tw-sort", "divide-style"),
          decl("--tw-border-style", value),
          decl("border-style", value)
        ])
      ]);
    }
  }
  staticUtility("bg-inherit", [["background-color", "inherit"]]);
  staticUtility("bg-transparent", [["background-color", "transparent"]]);
  staticUtility("bg-auto", [["background-size", "auto"]]);
  staticUtility("bg-cover", [["background-size", "cover"]]);
  staticUtility("bg-contain", [["background-size", "contain"]]);
  staticUtility("bg-fixed", [["background-attachment", "fixed"]]);
  staticUtility("bg-local", [["background-attachment", "local"]]);
  staticUtility("bg-scroll", [["background-attachment", "scroll"]]);
  staticUtility("bg-center", [["background-position", "center"]]);
  staticUtility("bg-top", [["background-position", "top"]]);
  staticUtility("bg-right-top", [["background-position", "right-top"]]);
  staticUtility("bg-right", [["background-position", "right"]]);
  staticUtility("bg-right-bottom", [["background-position", "right-bottom"]]);
  staticUtility("bg-bottom", [["background-position", "bottom"]]);
  staticUtility("bg-left-bottom", [["background-position", "left-bottom"]]);
  staticUtility("bg-left", [["background-position", "left"]]);
  staticUtility("bg-left-top", [["background-position", "left-top"]]);
  staticUtility("bg-repeat", [["background-repeat", "repeat"]]);
  staticUtility("bg-no-repeat", [["background-repeat", "no-repeat"]]);
  staticUtility("bg-repeat-x", [["background-repeat", "repeat-x"]]);
  staticUtility("bg-repeat-y", [["background-repeat", "repeat-y"]]);
  staticUtility("bg-round", [["background-repeat", "round"]]);
  staticUtility("bg-space", [["background-repeat", "space"]]);
  staticUtility("bg-none", [["background-image", "none"]]);
  for (let [value, direction] of [
    ["t", "top"],
    ["tr", "top right"],
    ["r", "right"],
    ["br", "bottom right"],
    ["b", "bottom"],
    ["bl", "bottom left"],
    ["l", "left"],
    ["tl", "top left"]
  ]) {
    staticUtility(`bg-gradient-to-${value}`, [
      ["background-image", `linear-gradient(to ${direction}, var(--tw-gradient-stops,))`]
    ]);
  }
  utilities.functional("bg", (candidate) => {
    if (candidate.negative || !candidate.value)
      return;
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, [
        "image",
        "color",
        "length",
        "percentage",
        "position",
        "bg-size",
        "url"
      ]);
      switch (type) {
        case "length":
        case "percentage":
        case "position": {
          return [decl("background-position", value)];
        }
        case "size":
        case "bg-size": {
          return [decl("background-size", value)];
        }
        case "image":
        case "url": {
          return [decl("background-image", value)];
        }
        default: {
          value = asColor(value, candidate.modifier, theme);
          if (value === null)
            return;
          return [decl("background-color", value)];
        }
      }
    }
    {
      let value = resolveThemeColor(candidate, theme, ["--background-color", "--color"]);
      if (value) {
        return [decl("background-color", value)];
      }
    }
    {
      let value = theme.resolve(candidate.value.value, ["--background-image"]);
      if (value) {
        return [decl("background-image", value)];
      }
    }
  });
  suggest("bg", () => [
    {
      values: ["current", "transparent"],
      valueThemeKeys: ["--background-color", "--color"],
      modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
      modifierThemeKeys: ["--opacity"]
    },
    {
      values: [],
      valueThemeKeys: ["--background-image"]
    }
  ]);
  let gradientStopProperties = () => {
    return atRoot([
      property("--tw-gradient-from", "#0000", "<color>"),
      property("--tw-gradient-to", "#0000", "<color>"),
      property("--tw-gradient-from", "transparent", "<color>"),
      property("--tw-gradient-via", "transparent", "<color>"),
      property("--tw-gradient-to", "transparent", "<color>"),
      property("--tw-gradient-stops"),
      property("--tw-gradient-via-stops"),
      property("--tw-gradient-from-position", "0%", "<length-percentage>"),
      property("--tw-gradient-via-position", "50%", "<length-percentage>"),
      property("--tw-gradient-to-position", "100%", "<length-percentage>")
    ]);
  };
  function gradientStopUtility(classRoot, desc) {
    utilities.functional(classRoot, (candidate) => {
      if (candidate.negative || !candidate.value)
        return;
      if (candidate.value.kind === "arbitrary") {
        let value = candidate.value.value;
        let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "percentage"]);
        switch (type) {
          case "length":
          case "percentage": {
            return desc.position(value);
          }
          default: {
            value = asColor(value, candidate.modifier, theme);
            if (value === null)
              return;
            return desc.color(value);
          }
        }
      }
      {
        let value = resolveThemeColor(candidate, theme, ["--background-color", "--color"]);
        if (value) {
          return desc.color(value);
        }
      }
      {
        let value = theme.resolve(candidate.value.value, ["--gradient-color-stop-positions"]);
        if (value) {
          return desc.position(value);
        } else if (candidate.value.value[candidate.value.value.length - 1] === "%") {
          return desc.position(candidate.value.value);
        }
      }
    });
    suggest(classRoot, () => [
      {
        values: ["current", "transparent"],
        valueThemeKeys: ["--background-color", "--color"],
        modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
        modifierThemeKeys: ["--opacity"]
      },
      {
        values: Array.from({ length: 21 }, (_, index) => `${index * 5}%`),
        valueThemeKeys: ["--gradient-color-stop-positions"]
      }
    ]);
  }
  gradientStopUtility("from", {
    color: (value) => [
      gradientStopProperties(),
      decl("--tw-sort", "--tw-gradient-from"),
      decl("--tw-gradient-from", value),
      decl(
        "--tw-gradient-stops",
        "var(--tw-gradient-via-stops, var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))"
      )
    ],
    position: (value) => [gradientStopProperties(), decl("--tw-gradient-from-position", value)]
  });
  staticUtility("via-none", [["--tw-gradient-via-stops", "initial"]]);
  gradientStopUtility("via", {
    color: (value) => [
      gradientStopProperties(),
      decl("--tw-sort", "--tw-gradient-via"),
      decl("--tw-gradient-via", value),
      decl(
        "--tw-gradient-via-stops",
        "var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)"
      ),
      decl("--tw-gradient-stops", "var(--tw-gradient-via-stops)")
    ],
    position: (value) => [gradientStopProperties(), decl("--tw-gradient-via-position", value)]
  });
  gradientStopUtility("to", {
    color: (value) => [
      gradientStopProperties(),
      decl("--tw-sort", "--tw-gradient-to"),
      decl("--tw-gradient-to", value),
      decl(
        "--tw-gradient-stops",
        "var(--tw-gradient-via-stops, var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))"
      )
    ],
    position: (value) => [gradientStopProperties(), decl("--tw-gradient-to-position", value)]
  });
  staticUtility("decoration-slice", [
    ["-webkit-box-decoration-break", "slice"],
    ["box-decoration-break", "slice"]
  ]);
  staticUtility("decoration-clone", [
    ["-webkit-box-decoration-break", "clone"],
    ["box-decoration-break", "clone"]
  ]);
  staticUtility("box-decoration-slice", [
    ["-webkit-box-decoration-break", "slice"],
    ["box-decoration-break", "slice"]
  ]);
  staticUtility("box-decoration-clone", [
    ["-webkit-box-decoration-break", "clone"],
    ["box-decoration-break", "clone"]
  ]);
  staticUtility("bg-clip-text", [["background-clip", "text"]]);
  staticUtility("bg-clip-border", [["background-clip", "border-box"]]);
  staticUtility("bg-clip-padding", [["background-clip", "padding-box"]]);
  staticUtility("bg-clip-content", [["background-clip", "content-box"]]);
  staticUtility("bg-origin-border", [["background-origin", "border-box"]]);
  staticUtility("bg-origin-padding", [["background-origin", "padding-box"]]);
  staticUtility("bg-origin-content", [["background-origin", "content-box"]]);
  for (let value of [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
  ]) {
    staticUtility(`bg-blend-${value}`, [["background-blend-mode", value]]);
    staticUtility(`mix-blend-${value}`, [["mix-blend-mode", value]]);
  }
  staticUtility("mix-blend-plus-darker", [["mix-blend-mode", "plus-darker"]]);
  staticUtility("mix-blend-plus-lighter", [["mix-blend-mode", "plus-lighter"]]);
  utilities.functional("fill", (candidate) => {
    if (candidate.negative || !candidate.value)
      return;
    if (candidate.value.kind === "arbitrary") {
      let value2 = asColor(candidate.value.value, candidate.modifier, theme);
      if (value2 === null)
        return;
      return [decl("fill", value2)];
    }
    let value = resolveThemeColor(candidate, theme, ["--fill", "--color"]);
    if (value) {
      return [decl("fill", value)];
    }
  });
  suggest("fill", () => [
    {
      values: ["current", "transparent"],
      valueThemeKeys: ["--fill", "--color"],
      modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
      modifierThemeKeys: ["--opacity"]
    }
  ]);
  staticUtility("stroke-none", [["stroke", "none"]]);
  utilities.functional("stroke", (candidate) => {
    if (candidate.negative || !candidate.value)
      return;
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color", "number", "length", "percentage"]);
      switch (type) {
        case "number":
        case "length":
        case "percentage": {
          return [decl("stroke-width", value)];
        }
        default: {
          value = asColor(candidate.value.value, candidate.modifier, theme);
          if (value === null)
            return;
          return [decl("stroke", value)];
        }
      }
    }
    {
      let value = resolveThemeColor(candidate, theme, ["--stroke", "--color"]);
      if (value) {
        return [decl("stroke", value)];
      }
    }
    {
      let value = theme.resolve(candidate.value.value, ["--stroke-width"]);
      if (value) {
        return [decl("stroke-width", value)];
      } else if (!Number.isNaN(Number(candidate.value.value))) {
        return [decl("stroke-width", candidate.value.value)];
      }
    }
  });
  suggest("stroke", () => [
    {
      values: ["current", "transparent"],
      valueThemeKeys: ["--stroke", "--color"],
      modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
      modifierThemeKeys: ["--opacity"]
    },
    {
      values: ["0", "1", "2", "3"],
      valueThemeKeys: ["--stroke-width"]
    }
  ]);
  staticUtility("object-contain", [["object-fit", "contain"]]);
  staticUtility("object-cover", [["object-fit", "cover"]]);
  staticUtility("object-fill", [["object-fit", "fill"]]);
  staticUtility("object-none", [["object-fit", "none"]]);
  staticUtility("object-scale-down", [["object-fit", "scale-down"]]);
  staticUtility("object-bottom", [["object-position", "bottom"]]);
  staticUtility("object-center", [["object-position", "center"]]);
  staticUtility("object-left", [["object-position", "left"]]);
  staticUtility("object-left-bottom", [["object-position", "left bottom"]]);
  staticUtility("object-left-top", [["object-position", "left top"]]);
  staticUtility("object-right", [["object-position", "right"]]);
  staticUtility("object-right-bottom", [["object-position", "right bottom"]]);
  staticUtility("object-right-top", [["object-position", "right top"]]);
  staticUtility("object-top", [["object-position", "top"]]);
  functionalUtility("object", {
    themeKeys: ["--object-position"],
    handle: (value) => [decl("object-position", value)]
  });
  functionalUtility("p", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding", value)]
  });
  functionalUtility("px", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-left", value), decl("padding-right", value)]
  });
  functionalUtility("py", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-top", value), decl("padding-bottom", value)]
  });
  functionalUtility("pt", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-top", value)]
  });
  functionalUtility("ps", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-inline-start", value)]
  });
  functionalUtility("pe", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-inline-end", value)]
  });
  functionalUtility("pr", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-right", value)]
  });
  functionalUtility("pb", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-bottom", value)]
  });
  functionalUtility("pl", {
    themeKeys: ["--padding", "--spacing"],
    handle: (value) => [decl("padding-left", value)]
  });
  staticUtility("text-left", [["text-align", "left"]]);
  staticUtility("text-center", [["text-align", "center"]]);
  staticUtility("text-right", [["text-align", "right"]]);
  staticUtility("text-justify", [["text-align", "justify"]]);
  staticUtility("text-start", [["text-align", "start"]]);
  staticUtility("text-end", [["text-align", "end"]]);
  functionalUtility("indent", {
    supportsNegative: true,
    themeKeys: ["--text-indent", "--spacing"],
    handle: (value) => [decl("text-indent", value)]
  });
  staticUtility("align-baseline", [["vertical-align", "baseline"]]);
  staticUtility("align-top", [["vertical-align", "top"]]);
  staticUtility("align-middle", [["vertical-align", "middle"]]);
  staticUtility("align-bottom", [["vertical-align", "bottom"]]);
  staticUtility("align-text-top", [["vertical-align", "text-top"]]);
  staticUtility("align-text-bottom", [["vertical-align", "text-bottom"]]);
  staticUtility("align-sub", [["vertical-align", "sub"]]);
  staticUtility("align-super", [["vertical-align", "super"]]);
  functionalUtility("align", {
    themeKeys: [],
    handle: (value) => [decl("vertical-align", value)]
  });
  utilities.functional("font", (candidate) => {
    if (candidate.negative || !candidate.value)
      return;
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["number", "generic-name", "family-name"]);
      switch (type) {
        case "generic-name":
        case "family-name": {
          return [decl("font-family", value)];
        }
        default: {
          return [decl("font-weight", value)];
        }
      }
    }
    {
      let value = theme.resolveWith(
        candidate.value.value,
        ["--font-family"],
        ["--font-feature-settings", "--font-variation-settings"]
      );
      if (value) {
        let [families, options2 = {}] = value;
        return [
          decl("font-family", families),
          decl("font-feature-settings", options2["--font-feature-settings"]),
          decl("font-variation-settings", options2["--font-variation-settings"])
        ];
      }
    }
    {
      let value = theme.resolve(candidate.value.value, ["--font-weight"]);
      if (value) {
        return [decl("font-weight", value)];
      }
      switch (candidate.value.value) {
        case "thin":
          value = "100";
          break;
        case "extralight":
          value = "200";
          break;
        case "light":
          value = "300";
          break;
        case "normal":
          value = "400";
          break;
        case "medium":
          value = "500";
          break;
        case "semibold":
          value = "600";
          break;
        case "bold":
          value = "700";
          break;
        case "extrabold":
          value = "800";
          break;
        case "black":
          value = "900";
          break;
      }
      if (value) {
        return [decl("font-weight", value)];
      }
    }
  });
  suggest("font", () => [
    {
      values: [],
      valueThemeKeys: ["--font-family"]
    },
    {
      values: [
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black"
      ],
      valueThemeKeys: ["--font-weight"]
    }
  ]);
  staticUtility("uppercase", [["text-transform", "uppercase"]]);
  staticUtility("lowercase", [["text-transform", "lowercase"]]);
  staticUtility("capitalize", [["text-transform", "capitalize"]]);
  staticUtility("normal-case", [["text-transform", "none"]]);
  staticUtility("italic", [["font-style", "italic"]]);
  staticUtility("not-italic", [["font-style", "normal"]]);
  staticUtility("underline", [["text-decoration-line", "underline"]]);
  staticUtility("overline", [["text-decoration-line", "overline"]]);
  staticUtility("line-through", [["text-decoration-line", "line-through"]]);
  staticUtility("no-underline", [["text-decoration-line", "none"]]);
  colorUtility("placeholder", {
    themeKeys: ["--background-color", "--color"],
    handle: (value) => [
      rule("&::placeholder", [decl("--tw-sort", "placeholder-color"), decl("color", value)])
    ]
  });
  staticUtility("decoration-solid", [["text-decoration-style", "solid"]]);
  staticUtility("decoration-double", [["text-decoration-style", "double"]]);
  staticUtility("decoration-dotted", [["text-decoration-style", "dotted"]]);
  staticUtility("decoration-dashed", [["text-decoration-style", "dashed"]]);
  staticUtility("decoration-wavy", [["text-decoration-style", "wavy"]]);
  staticUtility("decoration-auto", [["text-decoration-thickness", "auto"]]);
  staticUtility("decoration-from-font", [["text-decoration-thickness", "from-font"]]);
  utilities.functional("decoration", (candidate) => {
    if (candidate.negative || !candidate.value)
      return;
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "percentage"]);
      switch (type) {
        case "length":
        case "percentage": {
          return [decl("text-decoration-thickness", value)];
        }
        default: {
          value = asColor(value, candidate.modifier, theme);
          if (value === null)
            return;
          return [decl("text-decoration-color", value)];
        }
      }
    }
    {
      let value = theme.resolve(candidate.value.value, ["--text-decoration-thickness"]);
      if (value) {
        return [decl("text-decoration-thickness", value)];
      }
      if (!Number.isNaN(Number(candidate.value.value))) {
        return [decl("text-decoration-thickness", `${candidate.value.value}px`)];
      }
    }
    {
      let value = resolveThemeColor(candidate, theme, ["--text-decoration-color", "--color"]);
      if (value) {
        return [decl("text-decoration-color", value)];
      }
    }
  });
  suggest("decoration", () => [
    {
      values: ["current", "transparent"],
      valueThemeKeys: ["--text-decoration-color", "--color"],
      modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
      modifierThemeKeys: ["--opacity"]
    },
    {
      values: ["0", "1", "2"],
      valueThemeKeys: ["--text-decoration-thickness"]
    }
  ]);
  staticUtility("animate-none", [["animation", "none"]]);
  functionalUtility("animate", {
    themeKeys: ["--animate"],
    handle: (value) => [decl("animation", value)]
  });
  {
    let cssFilterValue = [
      "var(--tw-blur,)",
      "var(--tw-brightness,)",
      "var(--tw-contrast,)",
      "var(--tw-grayscale,)",
      "var(--tw-hue-rotate,)",
      "var(--tw-invert,)",
      "var(--tw-saturate,)",
      "var(--tw-sepia,)",
      "var(--tw-drop-shadow,)"
    ].join(" ");
    let cssBackdropFilterValue = [
      "var(--tw-backdrop-blur,)",
      "var(--tw-backdrop-brightness,)",
      "var(--tw-backdrop-contrast,)",
      "var(--tw-backdrop-grayscale,)",
      "var(--tw-backdrop-hue-rotate,)",
      "var(--tw-backdrop-invert,)",
      "var(--tw-backdrop-opacity,)",
      "var(--tw-backdrop-saturate,)",
      "var(--tw-backdrop-sepia,)"
    ].join(" ");
    let filterProperties = () => {
      return atRoot([
        property("--tw-blur"),
        property("--tw-brightness"),
        property("--tw-contrast"),
        property("--tw-grayscale"),
        property("--tw-hue-rotate"),
        property("--tw-invert"),
        property("--tw-opacity"),
        property("--tw-saturate"),
        property("--tw-sepia")
      ]);
    };
    let backdropFilterProperties = () => {
      return atRoot([
        property("--tw-backdrop-blur"),
        property("--tw-backdrop-brightness"),
        property("--tw-backdrop-contrast"),
        property("--tw-backdrop-grayscale"),
        property("--tw-backdrop-hue-rotate"),
        property("--tw-backdrop-invert"),
        property("--tw-backdrop-opacity"),
        property("--tw-backdrop-saturate"),
        property("--tw-backdrop-sepia")
      ]);
    };
    utilities.functional("filter", (candidate) => {
      if (candidate.negative)
        return;
      if (candidate.value === null) {
        return [filterProperties(), decl("filter", cssFilterValue)];
      }
      if (candidate.value.kind === "arbitrary") {
        return [decl("filter", candidate.value.value)];
      }
      switch (candidate.value.value) {
        case "none":
          return [decl("filter", "none")];
      }
    });
    utilities.functional("backdrop-filter", (candidate) => {
      if (candidate.negative)
        return;
      if (candidate.value === null) {
        return [
          backdropFilterProperties(),
          decl("-webkit-backdrop-filter", cssBackdropFilterValue),
          decl("backdrop-filter", cssBackdropFilterValue)
        ];
      }
      if (candidate.value.kind === "arbitrary") {
        return [
          decl("-webkit-backdrop-filter", candidate.value.value),
          decl("backdrop-filter", candidate.value.value)
        ];
      }
      switch (candidate.value.value) {
        case "none":
          return [decl("-webkit-backdrop-filter", "none"), decl("backdrop-filter", "none")];
      }
    });
    functionalUtility("blur", {
      themeKeys: ["--blur"],
      handle: (value) => [
        filterProperties(),
        decl("--tw-blur", `blur(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-blur", {
      themeKeys: ["--backdrop-blur", "--blur"],
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-blur", `blur(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    functionalUtility("brightness", {
      themeKeys: ["--brightness"],
      handleBareValue: ({ value }) => `${value}%`,
      handle: (value) => [
        filterProperties(),
        decl("--tw-brightness", `brightness(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-brightness", {
      themeKeys: ["--backdrop-brightness", "--brightness"],
      handleBareValue: ({ value }) => `${value}%`,
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-brightness", `brightness(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("brightness", () => [
      {
        values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"],
        valueThemeKeys: ["--brightness"]
      }
    ]);
    suggest("backdrop-brightness", () => [
      {
        values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"],
        valueThemeKeys: ["--backdrop-brightness", "--brightness"]
      }
    ]);
    functionalUtility("contrast", {
      themeKeys: ["--contrast"],
      handleBareValue: ({ value }) => `${value}%`,
      handle: (value) => [
        filterProperties(),
        decl("--tw-contrast", `contrast(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-contrast", {
      themeKeys: ["--backdrop-contrast", "--contrast"],
      handleBareValue: ({ value }) => `${value}%`,
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-contrast", `contrast(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("contrast", () => [
      {
        values: ["0", "50", "75", "100", "125", "150", "200"],
        valueThemeKeys: ["--contrast"]
      }
    ]);
    suggest("backdrop-contrast", () => [
      {
        values: ["0", "50", "75", "100", "125", "150", "200"],
        valueThemeKeys: ["--backdrop-contrast", "--contrast"]
      }
    ]);
    functionalUtility("grayscale", {
      themeKeys: ["--grayscale"],
      handleBareValue: ({ value }) => `${value}%`,
      defaultValue: "100%",
      handle: (value) => [
        filterProperties(),
        decl("--tw-grayscale", `grayscale(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-grayscale", {
      themeKeys: ["--backdrop-grayscale", "--grayscale"],
      handleBareValue: ({ value }) => `${value}%`,
      defaultValue: "100%",
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-grayscale", `grayscale(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("grayscale", () => [
      {
        values: ["0", "25", "50", "75", "100"],
        valueThemeKeys: ["--grayscale"],
        hasDefaultValue: true
      }
    ]);
    suggest("backdrop-grayscale", () => [
      {
        values: ["0", "25", "50", "75", "100"],
        valueThemeKeys: ["--backdrop-grayscale", "--grayscale"],
        hasDefaultValue: true
      }
    ]);
    functionalUtility("hue-rotate", {
      themeKeys: ["--hue-rotate"],
      handleBareValue: ({ value }) => `${value}deg`,
      handle: (value) => [
        filterProperties(),
        decl("--tw-hue-rotate", `hue-rotate(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-hue-rotate", {
      themeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
      handleBareValue: ({ value }) => `${value}deg`,
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-hue-rotate", `hue-rotate(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("hue-rotate", () => [
      {
        values: ["0", "15", "30", "60", "90", "180"],
        valueThemeKeys: ["--hue-rotate"]
      }
    ]);
    suggest("backdrop-hue-rotate", () => [
      {
        values: ["0", "15", "30", "60", "90", "180"],
        valueThemeKeys: ["--backdrop-hue-rotate", "--hue-rotate"]
      }
    ]);
    functionalUtility("invert", {
      themeKeys: ["--invert"],
      handleBareValue: ({ value }) => `${value}%`,
      defaultValue: "100%",
      handle: (value) => [
        filterProperties(),
        decl("--tw-invert", `invert(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-invert", {
      themeKeys: ["--backdrop-invert", "--invert"],
      handleBareValue: ({ value }) => `${value}%`,
      defaultValue: "100%",
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-invert", `invert(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("invert", () => [
      {
        values: ["0", "25", "50", "75", "100"],
        valueThemeKeys: ["--invert"],
        hasDefaultValue: true
      }
    ]);
    suggest("backdrop-invert", () => [
      {
        values: ["0", "25", "50", "75", "100"],
        valueThemeKeys: ["--backdrop-invert", "--invert"],
        hasDefaultValue: true
      }
    ]);
    functionalUtility("saturate", {
      themeKeys: ["--saturate"],
      handleBareValue: ({ value }) => `${value}%`,
      handle: (value) => [
        filterProperties(),
        decl("--tw-saturate", `saturate(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-saturate", {
      themeKeys: ["--backdrop-saturate", "--saturate"],
      handleBareValue: ({ value }) => `${value}%`,
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-saturate", `saturate(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("saturate", () => [
      {
        values: ["0", "50", "100", "150", "200"],
        valueThemeKeys: ["--saturate"]
      }
    ]);
    suggest("backdrop-saturate", () => [
      {
        values: ["0", "50", "100", "150", "200"],
        valueThemeKeys: ["--backdrop-saturate", "--saturate"]
      }
    ]);
    functionalUtility("sepia", {
      themeKeys: ["--sepia"],
      handleBareValue: ({ value }) => `${value}%`,
      defaultValue: "100%",
      handle: (value) => [
        filterProperties(),
        decl("--tw-sepia", `sepia(${value})`),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-sepia", {
      themeKeys: ["--backdrop-sepia", "--sepia"],
      handleBareValue: ({ value }) => `${value}%`,
      defaultValue: "100%",
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-sepia", `sepia(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("sepia", () => [
      {
        values: ["0", "50", "100"],
        valueThemeKeys: ["--sepia"],
        hasDefaultValue: true
      }
    ]);
    suggest("backdrop-sepia", () => [
      {
        values: ["0", "50", "100"],
        valueThemeKeys: ["--backdrop-sepia", "--sepia"],
        hasDefaultValue: true
      }
    ]);
    functionalUtility("drop-shadow", {
      themeKeys: ["--drop-shadow"],
      handle: (value) => [
        filterProperties(),
        decl(
          "--tw-drop-shadow",
          segment(value, ",").map((v) => `drop-shadow(${v})`).join(" ")
        ),
        decl("filter", cssFilterValue)
      ]
    });
    functionalUtility("backdrop-opacity", {
      themeKeys: ["--backdrop-opacity", "--opacity"],
      handleBareValue: ({ value }) => `${value}%`,
      handle: (value) => [
        backdropFilterProperties(),
        decl("--tw-backdrop-opacity", `opacity(${value})`),
        decl("-webkit-backdrop-filter", cssBackdropFilterValue),
        decl("backdrop-filter", cssBackdropFilterValue)
      ]
    });
    suggest("backdrop-opacity", () => [
      {
        values: Array.from({ length: 21 }, (_, i) => `${i * 5}`),
        valueThemeKeys: ["--backdrop-opacity", "--opacity"]
      }
    ]);
  }
  {
    let defaultTimingFunction = "var(--default-transition-timing-function)";
    let defaultDuration = "var(--default-transition-duration)";
    staticUtility("transition-none", [["transition-property", "none"]]);
    staticUtility("transition-all", [
      ["transition-property", "all"],
      ["transition-timing-function", defaultTimingFunction],
      ["transition-duration", defaultDuration]
    ]);
    staticUtility("transition-colors", [
      [
        "transition-property",
        "color, background-color, border-color, text-decoration-color, fill, stroke"
      ],
      ["transition-timing-function", defaultTimingFunction],
      ["transition-duration", defaultDuration]
    ]);
    staticUtility("transition-opacity", [
      ["transition-property", "opacity"],
      ["transition-timing-function", defaultTimingFunction],
      ["transition-duration", defaultDuration]
    ]);
    staticUtility("transition-shadow", [
      ["transition-property", "box-shadow"],
      ["transition-timing-function", defaultTimingFunction],
      ["transition-duration", defaultDuration]
    ]);
    staticUtility("transition-transform", [
      ["transition-property", "transform, translate, scale, rotate"],
      ["transition-timing-function", defaultTimingFunction],
      ["transition-duration", defaultDuration]
    ]);
    functionalUtility("transition", {
      defaultValue: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter",
      themeKeys: ["--transition-property"],
      handle: (value) => [
        decl("transition-property", value),
        decl("transition-timing-function", defaultTimingFunction),
        decl("transition-duration", defaultDuration)
      ]
    });
    functionalUtility("delay", {
      handleBareValue: ({ value }) => `${value}ms`,
      themeKeys: ["--transition-delay"],
      handle: (value) => [decl("transition-delay", value)]
    });
    utilities.functional("duration", (candidate) => {
      if (candidate.negative)
        return;
      if (!candidate.value)
        return;
      let value = null;
      if (candidate.value.kind === "arbitrary") {
        value = candidate.value.value;
      } else {
        value = theme.resolve(candidate.value.fraction ?? candidate.value.value, [
          "--transition-duration"
        ]);
        if (value === null && !Number.isNaN(Number(candidate.value.value))) {
          value = `${candidate.value.value}ms`;
        }
      }
      if (value === null)
        return;
      return [decl("transition-duration", value)];
    });
    suggest("delay", () => [
      {
        values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
        valueThemeKeys: ["--transition-delay"]
      }
    ]);
    suggest("duration", () => [
      {
        values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
        valueThemeKeys: ["--transition-duration"]
      }
    ]);
  }
  functionalUtility("ease", {
    themeKeys: ["--transition-timing-function"],
    handle: (value) => [decl("transition-timing-function", value)]
  });
  staticUtility("will-change-auto", [["will-change", "auto"]]);
  staticUtility("will-change-scroll", [["will-change", "scroll-position"]]);
  staticUtility("will-change-contents", [["will-change", "contents"]]);
  staticUtility("will-change-transform", [["will-change", "transform"]]);
  functionalUtility("will-change", {
    themeKeys: [],
    handle: (value) => [decl("will-change", value)]
  });
  staticUtility("content-none", [["content", "none"]]);
  functionalUtility("content", {
    themeKeys: [],
    handle: (value) => [
      atRoot([property("--tw-content", '""')]),
      decl("--tw-content", value),
      decl("content", "var(--tw-content)")
    ]
  });
  {
    let cssContainValue = "var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style)";
    let cssContainProperties = () => {
      return atRoot([
        property("--tw-contain-size"),
        property("--tw-contain-layout"),
        property("--tw-contain-paint"),
        property("--tw-contain-style")
      ]);
    };
    staticUtility("contain-none", [["contain", "none"]]);
    staticUtility("contain-content", [["contain", "content"]]);
    staticUtility("contain-strict", [["contain", "strict"]]);
    staticUtility("contain-size", [
      cssContainProperties,
      ["--tw-contain-size", "size"],
      ["contain", cssContainValue]
    ]);
    staticUtility("contain-inline-size", [
      cssContainProperties,
      ["--tw-contain-size", "inline-size"],
      ["contain", cssContainValue]
    ]);
    staticUtility("contain-layout", [
      cssContainProperties,
      ["--tw-contain-layout", "layout"],
      ["contain", cssContainValue]
    ]);
    staticUtility("contain-paint", [
      cssContainProperties,
      ["--tw-contain-paint", "paint"],
      ["contain", cssContainValue]
    ]);
    staticUtility("contain-style", [
      cssContainProperties,
      ["--tw-contain-style", "style"],
      ["contain", cssContainValue]
    ]);
    functionalUtility("contain", {
      themeKeys: [],
      handle: (value) => [decl("contain", value)]
    });
  }
  staticUtility("forced-color-adjust-none", [["forced-color-adjust", "none"]]);
  staticUtility("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]);
  functionalUtility("leading", {
    themeKeys: ["--line-height"],
    handle: (value) => [decl("line-height", value)]
  });
  functionalUtility("tracking", {
    supportsNegative: true,
    themeKeys: ["--letter-spacing"],
    handle: (value) => [decl("letter-spacing", value)]
  });
  staticUtility("antialiased", [
    ["-webkit-font-smoothing", "antialiased"],
    ["-moz-osx-font-smoothing", "grayscale"]
  ]);
  staticUtility("subpixel-antialiased", [
    ["-webkit-font-smoothing", "auto"],
    ["-moz-osx-font-smoothing", "auto"]
  ]);
  {
    let cssFontVariantNumericValue = "var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)";
    let fontVariantNumericProperties = () => {
      return atRoot([
        property("--tw-ordinal"),
        property("--tw-slashed-zero"),
        property("--tw-numeric-figure"),
        property("--tw-numeric-spacing"),
        property("--tw-numeric-fraction")
      ]);
    };
    staticUtility("normal-nums", [["font-variant-numeric", "normal"]]);
    staticUtility("ordinal", [
      fontVariantNumericProperties,
      ["--tw-ordinal", "ordinal"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
    staticUtility("slashed-zero", [
      fontVariantNumericProperties,
      ["--tw-slashed-zero", "slashed-zero"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
    staticUtility("lining-nums", [
      fontVariantNumericProperties,
      ["--tw-numeric-figure", "lining-nums"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
    staticUtility("oldstyle-nums", [
      fontVariantNumericProperties,
      ["--tw-numeric-figure", "oldstyle-nums"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
    staticUtility("proportional-nums", [
      fontVariantNumericProperties,
      ["--tw-numeric-spacing", "proportional-nums"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
    staticUtility("tabular-nums", [
      fontVariantNumericProperties,
      ["--tw-numeric-spacing", "tabular-nums"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
    staticUtility("diagonal-fractions", [
      fontVariantNumericProperties,
      ["--tw-numeric-fraction", "diagonal-fractions"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
    staticUtility("stacked-fractions", [
      fontVariantNumericProperties,
      ["--tw-numeric-fraction", "stacked-fractions"],
      ["font-variant-numeric", cssFontVariantNumericValue]
    ]);
  }
  {
    let outlineProperties = () => {
      return atRoot([property("--tw-outline-style", "solid", "<custom-ident>")]);
    };
    staticUtility("outline-none", [
      ["outline", "2px solid transparent"],
      ["outline-offset", "2px"]
    ]);
    staticUtility("outline-solid", [
      ["--tw-outline-style", "solid"],
      ["outline-style", "solid"]
    ]);
    staticUtility("outline-dashed", [
      ["--tw-outline-style", "dashed"],
      ["outline-style", "dashed"]
    ]);
    staticUtility("outline-dotted", [
      ["--tw-outline-style", "dotted"],
      ["outline-style", "dotted"]
    ]);
    staticUtility("outline-double", [
      ["--tw-outline-style", "double"],
      ["outline-style", "double"]
    ]);
    utilities.functional("outline", (candidate) => {
      if (candidate.negative)
        return;
      if (candidate.value === null) {
        return [
          outlineProperties(),
          decl("outline-style", "var(--tw-outline-style)"),
          decl("outline-width", "1px")
        ];
      }
      if (candidate.value.kind === "arbitrary") {
        let value = candidate.value.value;
        let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "number", "percentage"]);
        switch (type) {
          case "length":
          case "number":
          case "percentage": {
            return [
              outlineProperties(),
              decl("outline-style", "var(--tw-outline-style)"),
              decl("outline-width", value)
            ];
          }
          default: {
            value = asColor(value, candidate.modifier, theme);
            if (value === null)
              return;
            return [decl("outline-color", value)];
          }
        }
      }
      {
        let value = resolveThemeColor(candidate, theme, ["--outline-color", "--color"]);
        if (value) {
          return [decl("outline-color", value)];
        }
      }
      {
        let value = theme.resolve(candidate.value.value, ["--outline-width"]);
        if (value) {
          return [
            outlineProperties(),
            decl("outline-style", "var(--tw-outline-style)"),
            decl("outline-width", value)
          ];
        } else if (!Number.isNaN(Number(candidate.value.value))) {
          return [
            outlineProperties(),
            decl("outline-style", "var(--tw-outline-style)"),
            decl("outline-width", `${candidate.value.value}px`)
          ];
        }
      }
    });
    suggest("outline", () => [
      {
        values: ["current", "transparent"],
        valueThemeKeys: ["--outline-color", "--color"],
        modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
        modifierThemeKeys: ["--opacity"],
        hasDefaultValue: true
      },
      {
        values: ["0", "1", "2", "4", "8"],
        valueThemeKeys: ["--outline-width"]
      }
    ]);
    functionalUtility("outline-offset", {
      supportsNegative: true,
      themeKeys: ["--outline-offset"],
      handleBareValue: ({ value }) => `${value}px`,
      handle: (value) => [decl("outline-offset", value)]
    });
    suggest("outline-offset", () => [
      {
        values: ["0", "1", "2", "4", "8"],
        valueThemeKeys: ["--outline-offset"]
      }
    ]);
  }
  functionalUtility("opacity", {
    themeKeys: ["--opacity"],
    handleBareValue: ({ value }) => `${value}%`,
    handle: (value) => [decl("opacity", value)]
  });
  suggest("opacity", () => [
    {
      values: Array.from({ length: 21 }, (_, i) => `${i * 5}`),
      valueThemeKeys: ["--opacity"]
    }
  ]);
  staticUtility("underline-offset-auto", [["text-underline-offset", "auto"]]);
  functionalUtility("underline-offset", {
    supportsNegative: true,
    themeKeys: ["--text-underline-offset"],
    handleBareValue: ({ value }) => `${value}px`,
    handle: (value) => [decl("text-underline-offset", value)]
  });
  suggest("underline-offset", () => [
    {
      supportsNegative: true,
      values: ["0", "1", "2", "4", "8"],
      valueThemeKeys: ["--text-underline-offset"]
    }
  ]);
  utilities.functional("text", (candidate) => {
    if (candidate.negative || !candidate.value)
      return;
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "percentage", "absolute-size", "relative-size"]);
      switch (type) {
        case "size":
        case "length":
        case "percentage":
        case "absolute-size":
        case "relative-size": {
          if (candidate.modifier) {
            let modifier = candidate.modifier.kind === "arbitrary" ? candidate.modifier.value : theme.resolve(candidate.modifier.value, ["--line-height"]);
            if (modifier) {
              return [decl("font-size", value), decl("line-height", modifier)];
            }
          }
          return [decl("font-size", value)];
        }
        default: {
          value = asColor(value, candidate.modifier, theme);
          if (value === null)
            return;
          return [decl("color", value)];
        }
      }
    }
    {
      let value = resolveThemeColor(candidate, theme, ["--text-color", "--color"]);
      if (value) {
        return [decl("color", value)];
      }
    }
    {
      let value = theme.resolveWith(
        candidate.value.value,
        ["--font-size"],
        ["--line-height", "--letter-spacing", "--font-weight"]
      );
      if (value) {
        let [fontSize, options2 = {}] = Array.isArray(value) ? value : [value];
        if (candidate.modifier) {
          let modifier = candidate.modifier.kind === "arbitrary" ? candidate.modifier.value : theme.resolve(candidate.modifier.value, ["--line-height"]);
          let declarations = [decl("font-size", fontSize)];
          modifier && declarations.push(decl("line-height", modifier));
          return declarations;
        }
        if (typeof options2 === "string") {
          return [decl("font-size", fontSize), decl("line-height", options2)];
        }
        return [
          decl("font-size", fontSize),
          decl("line-height", options2["--line-height"]),
          decl("letter-spacing", options2["--letter-spacing"]),
          decl("font-weight", options2["--font-weight"])
        ];
      }
    }
  });
  suggest("text", () => [
    {
      values: ["current", "transparent"],
      valueThemeKeys: ["--text-color", "--color"],
      modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
      modifierThemeKeys: ["--opacity"]
    },
    {
      values: [],
      valueThemeKeys: ["--font-size"],
      modifiers: [],
      modifierThemeKeys: ["--line-height"]
    }
  ]);
  {
    let ringShadowValue2 = function(value) {
      return `var(--tw-ring-inset,) 0 0 0 calc(${value} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${defaultRingColor})`;
    }, insetRingShadowValue2 = function(value) {
      return `inset 0 0 0 ${value} var(--tw-inset-ring-color, currentColor)`;
    };
    let cssBoxShadowValue = [
      "var(--tw-inset-shadow)",
      "var(--tw-inset-ring-shadow)",
      "var(--tw-ring-offset-shadow)",
      "var(--tw-ring-shadow)",
      "var(--tw-shadow)"
    ].join(", ");
    let nullShadow = "0 0 #0000";
    let boxShadowProperties = () => {
      return atRoot([
        property("--tw-shadow", nullShadow),
        property("--tw-shadow-colored", nullShadow),
        property("--tw-inset-shadow", nullShadow),
        property("--tw-inset-shadow-colored", nullShadow),
        property("--tw-ring-color"),
        property("--tw-ring-shadow", nullShadow),
        property("--tw-inset-ring-color"),
        property("--tw-inset-ring-shadow", nullShadow),
        // Legacy
        property("--tw-ring-inset"),
        property("--tw-ring-offset-width", "0px", "<length>"),
        property("--tw-ring-offset-color", "#fff"),
        property("--tw-ring-offset-shadow", nullShadow)
      ]);
    };
    utilities.functional("shadow", (candidate) => {
      if (candidate.negative)
        return;
      if (!candidate.value) {
        let value = theme.get(["--shadow"]);
        if (value === null)
          return;
        return [
          boxShadowProperties(),
          decl("--tw-shadow", value),
          decl("--tw-shadow-colored", replaceShadowColors(value, "var(--tw-shadow-color)")),
          decl("box-shadow", cssBoxShadowValue)
        ];
      }
      if (candidate.value.kind === "arbitrary") {
        let value = candidate.value.value;
        let type = candidate.value.dataType ?? inferDataType(value, ["color"]);
        switch (type) {
          case "color": {
            value = asColor(value, candidate.modifier, theme);
            if (value === null)
              return;
            return [
              boxShadowProperties(),
              decl("--tw-shadow-color", value),
              decl("--tw-shadow", "var(--tw-shadow-colored)")
            ];
          }
          default: {
            return [
              boxShadowProperties(),
              decl("--tw-shadow", value),
              decl("--tw-shadow-colored", replaceShadowColors(value, "var(--tw-shadow-color)")),
              decl("box-shadow", cssBoxShadowValue)
            ];
          }
        }
      }
      switch (candidate.value.value) {
        case "none":
          return [
            boxShadowProperties(),
            decl("--tw-shadow", nullShadow),
            decl("--tw-shadow-colored", nullShadow),
            decl("box-shadow", cssBoxShadowValue)
          ];
      }
      {
        let value = theme.resolve(candidate.value.value, ["--shadow"]);
        if (value) {
          return [
            boxShadowProperties(),
            decl("--tw-shadow", value),
            decl("--tw-shadow-colored", replaceShadowColors(value, "var(--tw-shadow-color)")),
            decl("box-shadow", cssBoxShadowValue)
          ];
        }
      }
      {
        let value = resolveThemeColor(candidate, theme, ["--box-shadow-color", "--color"]);
        if (value) {
          return [
            boxShadowProperties(),
            decl("--tw-shadow-color", value),
            decl("--tw-shadow", "var(--tw-shadow-colored)")
          ];
        }
      }
    });
    suggest("shadow", () => [
      {
        values: ["current", "transparent"],
        valueThemeKeys: ["--box-shadow-color", "--color"],
        modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
        modifierThemeKeys: ["--opacity"]
      },
      {
        values: [],
        valueThemeKeys: ["--shadow"],
        hasDefaultValue: true
      }
    ]);
    utilities.functional("inset-shadow", (candidate) => {
      if (candidate.negative)
        return;
      if (!candidate.value) {
        let value = theme.get(["--inset-shadow"]);
        if (value === null)
          return;
        return [
          boxShadowProperties(),
          decl("--tw-inset-shadow", value),
          decl(
            "--tw-inset-shadow-colored",
            replaceShadowColors(value, "var(--tw-inset-shadow-color)")
          ),
          decl("box-shadow", cssBoxShadowValue)
        ];
      }
      if (candidate.value.kind === "arbitrary") {
        let value = candidate.value.value;
        let type = candidate.value.dataType ?? inferDataType(value, ["color"]);
        switch (type) {
          case "color": {
            value = asColor(value, candidate.modifier, theme);
            if (value === null)
              return;
            return [
              boxShadowProperties(),
              decl("--tw-inset-shadow-color", value),
              decl("--tw-inset-shadow", "var(--tw-inset-shadow-colored)")
            ];
          }
          default: {
            return [
              boxShadowProperties(),
              decl("--tw-inset-shadow", `inset ${value}`),
              decl(
                "--tw-inset-shadow-colored",
                replaceShadowColors(`inset ${value}`, "var(--tw-inset-shadow-color)")
              ),
              decl("box-shadow", cssBoxShadowValue)
            ];
          }
        }
      }
      switch (candidate.value.value) {
        case "none":
          return [
            boxShadowProperties(),
            decl("--tw-inset-shadow", nullShadow),
            decl("--tw-inset-shadow-colored", nullShadow),
            decl("box-shadow", cssBoxShadowValue)
          ];
      }
      {
        let value = theme.resolve(candidate.value.value, ["--inset-shadow"]);
        if (value) {
          return [
            boxShadowProperties(),
            decl("--tw-inset-shadow", value),
            decl(
              "--tw-inset-shadow-colored",
              replaceShadowColors(value, "var(--tw-inset-shadow-color)")
            ),
            decl("box-shadow", cssBoxShadowValue)
          ];
        }
      }
      {
        let value = resolveThemeColor(candidate, theme, ["--box-shadow-color", "--color"]);
        if (value) {
          return [
            boxShadowProperties(),
            decl("--tw-inset-shadow-color", value),
            decl("--tw-inset-shadow", "var(--tw-inset-shadow-colored)")
          ];
        }
      }
    });
    suggest("inset-shadow", () => [
      {
        values: ["current", "transparent"],
        valueThemeKeys: ["--box-shadow-color", "--color"],
        modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
        modifierThemeKeys: ["--opacity"]
      },
      {
        values: [],
        valueThemeKeys: ["--shadow"],
        hasDefaultValue: true
      }
    ]);
    staticUtility("ring-inset", [boxShadowProperties, ["--tw-ring-inset", "inset"]]);
    let defaultRingColor = theme.get(["--default-ring-color"]) ?? "currentColor";
    utilities.functional("ring", (candidate) => {
      if (candidate.negative)
        return;
      if (!candidate.value) {
        let value = theme.get(["--default-ring-width"]) ?? "1px";
        return [
          boxShadowProperties(),
          decl("--tw-ring-shadow", ringShadowValue2(value)),
          decl("box-shadow", cssBoxShadowValue)
        ];
      }
      if (candidate.value.kind === "arbitrary") {
        let value = candidate.value.value;
        let type = candidate.value.dataType ?? inferDataType(value, ["color", "length"]);
        switch (type) {
          case "length": {
            return [
              boxShadowProperties(),
              decl("--tw-ring-shadow", ringShadowValue2(value)),
              decl("box-shadow", cssBoxShadowValue)
            ];
          }
          default: {
            value = asColor(value, candidate.modifier, theme);
            if (value === null)
              return;
            return [decl("--tw-ring-color", value)];
          }
        }
      }
      {
        let value = resolveThemeColor(candidate, theme, ["--ring-color", "--color"]);
        if (value) {
          return [decl("--tw-ring-color", value)];
        }
      }
      {
        let value = theme.resolve(candidate.value.value, ["--ring-width"]);
        if (value === null && !Number.isNaN(Number(candidate.value.value))) {
          value = `${candidate.value.value}px`;
        }
        if (value) {
          return [
            boxShadowProperties(),
            decl("--tw-ring-shadow", ringShadowValue2(value)),
            decl("box-shadow", cssBoxShadowValue)
          ];
        }
      }
    });
    suggest("ring", () => [
      {
        values: ["current", "transparent"],
        valueThemeKeys: ["--ring-color", "--color"],
        modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
        modifierThemeKeys: ["--opacity"]
      },
      {
        values: ["0", "1", "2", "4", "8"],
        valueThemeKeys: ["--ring-width"],
        hasDefaultValue: true
      }
    ]);
    utilities.functional("inset-ring", (candidate) => {
      if (candidate.negative)
        return;
      if (!candidate.value) {
        return [
          boxShadowProperties(),
          decl("--tw-inset-ring-shadow", insetRingShadowValue2("1px")),
          decl("box-shadow", cssBoxShadowValue)
        ];
      }
      if (candidate.value.kind === "arbitrary") {
        let value = candidate.value.value;
        let type = candidate.value.dataType ?? inferDataType(value, ["color", "length"]);
        switch (type) {
          case "length": {
            return [
              boxShadowProperties(),
              decl("--tw-inset-ring-shadow", insetRingShadowValue2(value)),
              decl("box-shadow", cssBoxShadowValue)
            ];
          }
          default: {
            value = asColor(value, candidate.modifier, theme);
            if (value === null)
              return;
            return [decl("--tw-inset-ring-color", value)];
          }
        }
      }
      {
        let value = resolveThemeColor(candidate, theme, ["--ring-color", "--color"]);
        if (value) {
          return [decl("--tw-inset-ring-color", value)];
        }
      }
      {
        let value = theme.resolve(candidate.value.value, ["--ring-width"]);
        if (value === null && !Number.isNaN(Number(candidate.value.value))) {
          value = `${candidate.value.value}px`;
        }
        if (value) {
          return [
            boxShadowProperties(),
            decl("--tw-inset-ring-shadow", insetRingShadowValue2(value)),
            decl("box-shadow", cssBoxShadowValue)
          ];
        }
      }
    });
    suggest("inset-ring", () => [
      {
        values: ["current", "transparent"],
        valueThemeKeys: ["--ring-color", "--color"],
        modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
        modifierThemeKeys: ["--opacity"]
      },
      {
        values: ["0", "1", "2", "4", "8"],
        valueThemeKeys: ["--ring-width"],
        hasDefaultValue: true
      }
    ]);
    let ringOffsetShadowValue = "var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)";
    utilities.functional("ring-offset", (candidate) => {
      if (candidate.negative || !candidate.value)
        return;
      if (candidate.value.kind === "arbitrary") {
        let value = candidate.value.value;
        let type = candidate.value.dataType ?? inferDataType(value, ["color", "length"]);
        switch (type) {
          case "length": {
            return [
              decl("--tw-ring-offset-width", value),
              decl("--tw-ring-offset-shadow", ringOffsetShadowValue)
            ];
          }
          default: {
            value = asColor(value, candidate.modifier, theme);
            if (value === null)
              return;
            return [decl("--tw-ring-offset-color", value)];
          }
        }
      }
      {
        let value = theme.resolve(candidate.value.value, ["--ring-offset-width"]);
        if (value) {
          return [
            decl("--tw-ring-offset-width", value),
            decl("--tw-ring-offset-shadow", ringOffsetShadowValue)
          ];
        } else if (!Number.isNaN(Number(candidate.value.value))) {
          return [
            decl("--tw-ring-offset-width", `${candidate.value.value}px`),
            decl("--tw-ring-offset-shadow", ringOffsetShadowValue)
          ];
        }
      }
      {
        let value = resolveThemeColor(candidate, theme, ["--ring-offset-color", "--color"]);
        if (value) {
          return [decl("--tw-ring-offset-color", value)];
        }
      }
    });
  }
  suggest("ring-offset", () => [
    {
      values: ["current", "transparent"],
      valueThemeKeys: ["--ring-offset-color", "--color"],
      modifiers: Array.from({ length: 21 }, (_, index) => `${index * 5}`),
      modifierThemeKeys: ["--opacity"]
    },
    {
      values: ["0", "1", "2", "4", "8"],
      valueThemeKeys: ["--ring-offset-width"]
    }
  ]);
  utilities.functional("@container", (candidate) => {
    if (candidate.negative)
      return;
    let value = null;
    if (candidate.value === null) {
      value = "inline-size";
    } else if (candidate.value.kind === "arbitrary") {
      value = candidate.value.value;
    } else if (candidate.value.kind === "named" && candidate.value.value === "normal") {
      value = "normal";
    }
    if (value === null)
      return;
    if (candidate.modifier) {
      return [decl("container-type", value), decl("container-name", candidate.modifier.value)];
    }
    return [decl("container-type", value)];
  });
  suggest("@container", () => [
    {
      values: ["normal"],
      valueThemeKeys: [],
      hasDefaultValue: false
    }
  ]);
  return utilities;
}

// src/variants.ts
var Variants = class {
  compareFns = /* @__PURE__ */ new Map();
  variants = /* @__PURE__ */ new Map();
  completions = /* @__PURE__ */ new Map();
  /**
   * Registering a group of variants should result in the same sort number for
   * all the variants. This is to ensure that the variants are applied in the
   * correct order.
   */
  groupOrder = null;
  /**
   * Keep track of the last sort order instead of using the size of the map to
   * avoid unnecessarily skipping order numbers.
   */
  lastOrder = 0;
  static(name, applyFn, { compounds } = {}) {
    this.set(name, { kind: "static", applyFn, compounds: compounds ?? true });
  }
  functional(name, applyFn, { compounds } = {}) {
    this.set(name, { kind: "functional", applyFn, compounds: compounds ?? true });
  }
  compound(name, applyFn, { compounds } = {}) {
    this.set(name, { kind: "compound", applyFn, compounds: compounds ?? true });
  }
  group(fn, compareFn) {
    this.groupOrder = this.nextOrder();
    if (compareFn)
      this.compareFns.set(this.groupOrder, compareFn);
    fn();
    this.groupOrder = null;
  }
  has(name) {
    return this.variants.has(name);
  }
  get(name) {
    return this.variants.get(name);
  }
  kind(name) {
    return this.variants.get(name)?.kind;
  }
  compounds(name) {
    return this.variants.get(name)?.compounds;
  }
  suggest(name, suggestions) {
    this.completions.set(name, suggestions);
  }
  getCompletions(name) {
    return this.completions.get(name)?.() ?? [];
  }
  compare(a, z) {
    if (a === z)
      return 0;
    if (a === null)
      return -1;
    if (z === null)
      return 1;
    if (a.kind === "arbitrary" && z.kind === "arbitrary") {
      return a.selector.localeCompare(z.selector);
    } else if (a.kind === "arbitrary") {
      return 1;
    } else if (z.kind === "arbitrary") {
      return -1;
    }
    let aOrder = this.variants.get(a.root).order;
    let zOrder = this.variants.get(z.root).order;
    let orderedByVariant = aOrder - zOrder;
    if (orderedByVariant !== 0)
      return orderedByVariant;
    if (a.kind === "compound" && z.kind === "compound") {
      return this.compare(a.variant, z.variant);
    }
    let compareFn = this.compareFns.get(aOrder);
    if (compareFn === void 0)
      return 0;
    return compareFn(a, z);
  }
  keys() {
    return this.variants.keys();
  }
  entries() {
    return this.variants.entries();
  }
  set(name, { kind, applyFn, compounds }) {
    this.lastOrder = this.nextOrder();
    this.variants.set(name, {
      kind,
      applyFn,
      order: this.lastOrder,
      compounds
    });
  }
  nextOrder() {
    return this.groupOrder ?? this.lastOrder + 1;
  }
};
function createVariants(theme) {
  let variants = new Variants();
  function staticVariant(name, selectors, { compounds } = {}) {
    variants.static(
      name,
      (r) => {
        r.nodes = selectors.map((selector) => rule(selector, r.nodes));
      },
      { compounds }
    );
  }
  variants.static("force", () => {
  }, { compounds: false });
  staticVariant("*", ["& > *"], { compounds: false });
  variants.compound("not", (ruleNode) => {
    ruleNode.selector = `&:not(${ruleNode.selector.replace("&", "*")})`;
  });
  variants.compound("group", (ruleNode, variant) => {
    let groupSelector = variant.modifier ? `:where(.group\\/${variant.modifier.value})` : ":where(.group)";
    ruleNode.selector = ruleNode.selector.replace("&", groupSelector);
    ruleNode.selector = `&:is(${ruleNode.selector} *)`;
  });
  variants.suggest("group", () => {
    return Array.from(variants.keys()).filter((name) => {
      return variants.get(name)?.compounds ?? false;
    });
  });
  variants.compound("peer", (ruleNode, variant) => {
    let peerSelector = variant.modifier ? `:where(.peer\\/${variant.modifier.value})` : ":where(.peer)";
    ruleNode.selector = ruleNode.selector.replace("&", peerSelector);
    ruleNode.selector = `&:is(${ruleNode.selector} ~ *)`;
  });
  variants.suggest("peer", () => {
    return Array.from(variants.keys()).filter((name) => {
      return variants.get(name)?.compounds ?? false;
    });
  });
  staticVariant("first-letter", ["&::first-letter"], { compounds: false });
  staticVariant("first-line", ["&::first-line"], { compounds: false });
  staticVariant("marker", ["& *::marker", "&::marker"], { compounds: false });
  staticVariant("selection", ["& *::selection", "&::selection"], { compounds: false });
  staticVariant("file", ["&::file-selector-button"], { compounds: false });
  staticVariant("placeholder", ["&::placeholder"], { compounds: false });
  staticVariant("backdrop", ["&::backdrop"], { compounds: false });
  {
    let contentProperties2 = function() {
      return rule("@at-root", [
        rule("@property --tw-content", [
          decl("syntax", '"*"'),
          decl("initial-value", '""'),
          decl("inherits", "false")
        ])
      ]);
    };
    variants.static(
      "before",
      (v) => {
        v.nodes = [
          rule("&::before", [
            contentProperties2(),
            decl("content", "var(--tw-content)"),
            ...v.nodes
          ])
        ];
      },
      { compounds: false }
    );
    variants.static(
      "after",
      (v) => {
        v.nodes = [
          rule("&::after", [contentProperties2(), decl("content", "var(--tw-content)"), ...v.nodes])
        ];
      },
      { compounds: false }
    );
  }
  let pseudos = [
    // Positional
    ["first", "&:first-child"],
    ["last", "&:last-child"],
    ["only", "&:only-child"],
    ["odd", "&:nth-child(odd)"],
    ["even", "&:nth-child(even)"],
    ["first-of-type", "&:first-of-type"],
    ["last-of-type", "&:last-of-type"],
    ["only-of-type", "&:only-of-type"],
    // State
    // TODO: Remove alpha vars or no?
    ["visited", "&:visited"],
    ["target", "&:target"],
    ["open", "&[open]"],
    // Forms
    ["default", "&:default"],
    ["checked", "&:checked"],
    ["indeterminate", "&:indeterminate"],
    ["placeholder-shown", "&:placeholder-shown"],
    ["autofill", "&:autofill"],
    ["optional", "&:optional"],
    ["required", "&:required"],
    ["valid", "&:valid"],
    ["invalid", "&:invalid"],
    ["in-range", "&:in-range"],
    ["out-of-range", "&:out-of-range"],
    ["read-only", "&:read-only"],
    // Content
    ["empty", "&:empty"],
    // Interactive
    ["focus-within", "&:focus-within"],
    [
      "hover",
      "&:hover"
      // TODO: Update tests for this:
      // v => {
      //   v.nodes = [
      //     rule('@media (hover: hover) and (pointer: fine)', [
      //       rule('&:hover', v.nodes),
      //     ]),
      //   ]
      // }
    ],
    ["focus", "&:focus"],
    ["focus-visible", "&:focus-visible"],
    ["active", "&:active"],
    ["enabled", "&:enabled"],
    ["disabled", "&:disabled"]
  ];
  for (let [key, value] of pseudos) {
    staticVariant(key, [value]);
  }
  variants.compound("has", (ruleNode) => {
    ruleNode.selector = `&:has(${ruleNode.selector.replace("&", "*")})`;
  });
  variants.suggest("has", () => {
    return Array.from(variants.keys()).filter((name) => {
      return variants.get(name)?.compounds ?? false;
    });
  });
  variants.functional("aria", (ruleNode, variant) => {
    if (variant.value === null)
      return null;
    if (variant.value.kind === "arbitrary") {
      ruleNode.nodes = [rule(`&[aria-${variant.value.value}]`, ruleNode.nodes)];
    } else {
      ruleNode.nodes = [rule(`&[aria-${variant.value.value}="true"]`, ruleNode.nodes)];
    }
  });
  variants.suggest("aria", () => [
    "busy",
    "checked",
    "disabled",
    "expanded",
    "hidden",
    "pressed",
    "readonly",
    "required",
    "selected"
  ]);
  variants.functional("data", (ruleNode, variant) => {
    if (variant.value === null)
      return null;
    ruleNode.nodes = [rule(`&[data-${variant.value.value}]`, ruleNode.nodes)];
  });
  variants.functional(
    "supports",
    (ruleNode, variant) => {
      if (variant.value === null)
        return null;
      let value = variant.value.value;
      if (value === null)
        return null;
      if (/^\w*\s*\(/.test(value)) {
        let query = value.replace(/\b(and|or|not)\b/g, " $1 ");
        ruleNode.nodes = [rule(`@supports ${query}`, ruleNode.nodes)];
        return;
      }
      if (!value.includes(":")) {
        value = `${value}: var(--tw)`;
      }
      if (value[0] !== "(" || value[value.length - 1] !== ")") {
        value = `(${value})`;
      }
      ruleNode.nodes = [rule(`@supports ${value}`, ruleNode.nodes)];
    },
    { compounds: false }
  );
  staticVariant("motion-safe", ["@media (prefers-reduced-motion: no-preference)"], {
    compounds: false
  });
  staticVariant("motion-reduce", ["@media (prefers-reduced-motion: reduce)"], { compounds: false });
  staticVariant("contrast-more", ["@media (prefers-contrast: more)"], { compounds: false });
  staticVariant("contrast-less", ["@media (prefers-contrast: less)"], { compounds: false });
  {
    let compareBreakpoints2 = function(a, z, direction, lookup) {
      if (a === z)
        return 0;
      let aValue = lookup.get(a);
      if (aValue === null)
        return direction === "asc" ? -1 : 1;
      let zValue = lookup.get(z);
      if (zValue === null)
        return direction === "asc" ? 1 : -1;
      if (aValue === zValue)
        return 0;
      let aIsCssFunction = aValue.indexOf("(");
      let zIsCssFunction = zValue.indexOf("(");
      let aBucket = aIsCssFunction === -1 ? (
        // No CSS function found, bucket by unit instead
        aValue.replace(/[\d.]+/g, "")
      ) : (
        // CSS function found, bucket by function name
        aValue.slice(0, aIsCssFunction)
      );
      let zBucket = zIsCssFunction === -1 ? (
        // No CSS function found, bucket by unit
        zValue.replace(/[\d.]+/g, "")
      ) : (
        // CSS function found, bucket by function name
        zValue.slice(0, zIsCssFunction)
      );
      let order = (
        // Compare by bucket name
        aBucket.localeCompare(zBucket) || // If bucket names are the same, compare by value
        (direction === "asc" ? parseInt(aValue) - parseInt(zValue) : parseInt(zValue) - parseInt(aValue))
      );
      if (Number.isNaN(order)) {
        return aValue.localeCompare(zValue);
      }
      return order;
    };
    {
      let breakpoints = theme.namespace("--breakpoint");
      let resolvedBreakpoints = new DefaultMap((variant) => {
        switch (variant.kind) {
          case "static": {
            return breakpoints.get(variant.root) ?? null;
          }
          case "functional": {
            if (variant.value === null)
              return null;
            let value = null;
            if (variant.value.kind === "arbitrary") {
              value = variant.value.value;
            } else if (variant.value.kind === "named") {
              value = theme.resolve(variant.value.value, ["--breakpoint"]);
            }
            if (!value)
              return null;
            if (value.includes("var("))
              return null;
            return value;
          }
          case "arbitrary":
          case "compound":
            return null;
        }
      });
      variants.group(
        () => {
          variants.functional(
            "max",
            (ruleNode, variant) => {
              let value = resolvedBreakpoints.get(variant);
              if (value === null)
                return null;
              ruleNode.nodes = [rule(`@media (width < ${value})`, ruleNode.nodes)];
            },
            { compounds: false }
          );
        },
        (a, z) => compareBreakpoints2(a, z, "desc", resolvedBreakpoints)
      );
      variants.suggest(
        "max",
        () => Array.from(breakpoints.keys()).filter((key) => key !== null)
      );
      variants.group(
        () => {
          for (let [key, value] of theme.namespace("--breakpoint")) {
            if (key === null)
              continue;
            variants.static(
              key,
              (ruleNode) => {
                ruleNode.nodes = [rule(`@media (width >= ${value})`, ruleNode.nodes)];
              },
              { compounds: false }
            );
          }
          variants.functional(
            "min",
            (ruleNode, variant) => {
              let value = resolvedBreakpoints.get(variant);
              if (value === null)
                return null;
              ruleNode.nodes = [rule(`@media (width >= ${value})`, ruleNode.nodes)];
            },
            { compounds: false }
          );
        },
        (a, z) => compareBreakpoints2(a, z, "asc", resolvedBreakpoints)
      );
      variants.suggest(
        "min",
        () => Array.from(breakpoints.keys()).filter((key) => key !== null)
      );
    }
    {
      let widths = theme.namespace("--width");
      let resolvedWidths = new DefaultMap((variant) => {
        switch (variant.kind) {
          case "functional": {
            if (variant.value === null)
              return null;
            let value = null;
            if (variant.value.kind === "arbitrary") {
              value = variant.value.value;
            } else if (variant.value.kind === "named") {
              value = theme.resolve(variant.value.value, ["--width"]);
            }
            if (!value)
              return null;
            if (value.includes("var("))
              return null;
            return value;
          }
          case "static":
          case "arbitrary":
          case "compound":
            return null;
        }
      });
      variants.group(
        () => {
          variants.functional(
            "@max",
            (ruleNode, variant) => {
              let value = resolvedWidths.get(variant);
              if (value === null)
                return null;
              ruleNode.nodes = [
                rule(
                  variant.modifier ? `@container ${variant.modifier.value} (width < ${value})` : `@container (width < ${value})`,
                  ruleNode.nodes
                )
              ];
            },
            { compounds: false }
          );
        },
        (a, z) => compareBreakpoints2(a, z, "desc", resolvedWidths)
      );
      variants.suggest(
        "@max",
        () => Array.from(widths.keys()).filter((key) => key !== null)
      );
      variants.group(
        () => {
          variants.functional(
            "@",
            (ruleNode, variant) => {
              let value = resolvedWidths.get(variant);
              if (value === null)
                return null;
              ruleNode.nodes = [
                rule(
                  variant.modifier ? `@container ${variant.modifier.value} (width >= ${value})` : `@container (width >= ${value})`,
                  ruleNode.nodes
                )
              ];
            },
            { compounds: false }
          );
          variants.functional(
            "@min",
            (ruleNode, variant) => {
              let value = resolvedWidths.get(variant);
              if (value === null)
                return null;
              ruleNode.nodes = [
                rule(
                  variant.modifier ? `@container ${variant.modifier.value} (width >= ${value})` : `@container (width >= ${value})`,
                  ruleNode.nodes
                )
              ];
            },
            { compounds: false }
          );
        },
        (a, z) => compareBreakpoints2(a, z, "asc", resolvedWidths)
      );
      variants.suggest(
        "@min",
        () => Array.from(widths.keys()).filter((key) => key !== null)
      );
    }
  }
  staticVariant("portrait", ["@media (orientation: portrait)"], { compounds: false });
  staticVariant("landscape", ["@media (orientation: landscape)"], { compounds: false });
  staticVariant("ltr", ['&:where([dir="ltr"], [dir="ltr"] *)']);
  staticVariant("rtl", ['&:where([dir="rtl"], [dir="rtl"] *)']);
  staticVariant("dark", ["@media (prefers-color-scheme: dark)"], { compounds: false });
  staticVariant("print", ["@media print"], { compounds: false });
  staticVariant("forced-colors", ["@media (forced-colors: active)"], { compounds: false });
  return variants;
}

// src/design-system.ts
function buildDesignSystem(theme) {
  return {
    theme,
    utilities: createUtilities(theme),
    variants: createVariants(theme),
    candidatesToCss(classes) {
      let result = [];
      for (let className of classes) {
        let { astNodes } = compileCandidates([className], this, { throwOnInvalidCandidate: false });
        if (astNodes.length === 0) {
          result.push(null);
        } else {
          result.push(toCss(astNodes));
        }
      }
      return result;
    },
    getClassOrder(classes) {
      return getClassOrder(this, classes);
    },
    getClassList() {
      return getClassList(this);
    },
    getVariants() {
      return getVariants(this);
    }
  };
}

// src/property-order.ts
var property_order_default = [
  "container-type",
  "pointer-events",
  "visibility",
  "position",
  // How do we make `inset-x-0` come before `top-0`?
  "inset",
  "inset-inline",
  "inset-block",
  "inset-inline-start",
  "inset-inline-end",
  "top",
  "right",
  "bottom",
  "left",
  "isolation",
  "z-index",
  "order",
  "grid-column",
  "grid-column-start",
  "grid-column-end",
  "grid-row",
  "grid-row-start",
  "grid-row-end",
  "float",
  "clear",
  // How do we make `mx-0` come before `mt-0`?
  // Idea: `margin-x` property that we compile away with a Visitor plugin?
  "margin",
  "margin-inline",
  "margin-block",
  "margin-inline-start",
  "margin-inline-end",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "box-sizing",
  "display",
  "aspect-ratio",
  "height",
  "max-height",
  "min-height",
  "width",
  "max-width",
  "min-width",
  "flex",
  "flex-shrink",
  "flex-grow",
  "flex-basis",
  "table-layout",
  "caption-side",
  "border-collapse",
  // There's no `border-spacing-x` property, we use variables, how to sort?
  "border-spacing",
  // '--tw-border-spacing-x',
  // '--tw-border-spacing-y',
  "transform-origin",
  // '--tw-translate-x',
  // '--tw-translate-y',
  "translate",
  "rotate",
  // '--tw-rotate',
  "--tw-skew-x",
  "--tw-skew-y",
  "scale",
  // '--tw-scale-x',
  // '--tw-scale-y',
  "transform",
  "animation",
  "cursor",
  "touch-action",
  "--tw-pan-x",
  "--tw-pan-y",
  "--tw-pinch-zoom",
  "resize",
  "scroll-snap-type",
  "--tw-scroll-snap-strictness",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-margin",
  "scroll-margin-inline-start",
  "scroll-margin-inline-end",
  "scroll-margin-top",
  "scroll-margin-right",
  "scroll-margin-bottom",
  "scroll-margin-left",
  "scroll-padding",
  "scroll-padding-inline-start",
  "scroll-padding-inline-end",
  "scroll-padding-top",
  "scroll-padding-right",
  "scroll-padding-bottom",
  "scroll-padding-left",
  "list-style-position",
  "list-style-type",
  "list-style-image",
  "appearance",
  "columns",
  "break-before",
  "break-inside",
  "break-after",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-template-columns",
  "grid-template-rows",
  "flex-direction",
  "flex-wrap",
  "place-content",
  "place-items",
  "align-content",
  "align-items",
  "justify-content",
  "justify-items",
  "gap",
  "column-gap",
  "row-gap",
  "--tw-space-x-reverse",
  "--tw-space-y-reverse",
  // Is there a more "real" property we could use for this?
  "divide-x-width",
  "divide-y-width",
  "--tw-divide-y-reverse",
  "divide-style",
  "divide-color",
  "--tw-divide-opacity",
  "place-self",
  "align-self",
  "justify-self",
  "overflow",
  "overflow-x",
  "overflow-y",
  "overscroll-behavior",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "scroll-behavior",
  "text-overflow",
  "hyphens",
  "white-space",
  "text-wrap",
  "overflow-wrap",
  "work-break",
  "border-radius",
  "border-start-radius",
  // Not real
  "border-end-radius",
  // Not real
  "border-top-radius",
  // Not real
  "border-right-radius",
  // Not real
  "border-bottom-radius",
  // Not real
  "border-left-radius",
  // Not real
  "border-start-start-radius",
  "border-start-end-radius",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "border-width",
  "border-inline-width",
  // Not real
  "border-inline-start-width",
  "border-inline-end-width",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "border-style",
  "border-color",
  "border-x-color",
  // Not real
  "border-y-color",
  // Not real
  "border-inline-start-color",
  "border-inline-end-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "--tw-border-opacity",
  "background-color",
  "--tw-bg-opacity",
  "background-image",
  "--tw-gradient-stops",
  "--tw-gradient-via-stops",
  "--tw-gradient-from",
  "--tw-gradient-from-position",
  "--tw-gradient-via",
  "--tw-gradient-via-position",
  "--tw-gradient-to",
  "--tw-gradient-to-position",
  "box-decoration-break",
  "background-size",
  "background-attachment",
  "background-clip",
  "background-position",
  "background-repeat",
  "background-origin",
  "fill",
  "stroke",
  "stroke-width",
  "object-fit",
  "object-position",
  "padding",
  "padding-inline",
  "padding-block",
  "padding-inline-start",
  "padding-inline-end",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "text-align",
  "text-indent",
  "vertical-align",
  "font-family",
  "font-size",
  "font-weight",
  "text-transform",
  "font-style",
  "font-variant-numeric",
  "line-height",
  "letter-spacing",
  "color",
  "--tw-text-opacity",
  "text-decoration-line",
  "text-decoration-color",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-underline-offset",
  "-webkit-font-smoothing",
  "placeholder-color",
  // Not real
  "--tw-placeholder-opacity",
  "caret-color",
  "accent-color",
  "opacity",
  "background-blend-mode",
  "mix-blend-mode",
  "box-shadow",
  "--tw-shadow",
  "--tw-shadow-color",
  "--tw-ring-shadow",
  "--tw-ring-color",
  "--tw-inset-shadow",
  "--tw-inset-shadow-color",
  "--tw-inset-ring-shadow",
  "--tw-inset-ring-color",
  "--tw-ring-opacity",
  "--tw-ring-offset-width",
  "--tw-ring-offset-color",
  "outline",
  "outline-width",
  "outline-offset",
  "outline-color",
  "--tw-blur",
  "--tw-brightness",
  "--tw-contast",
  "--tw-drop-shadow",
  "--tw-grayscale",
  "--tw-hue-rotate",
  "--tw-invert",
  "--tw-saturate",
  "--tw-sepia",
  "filter",
  "--tw-backdrop-blur",
  "--tw-backdrop-brightness",
  "--tw-backdrop-contast",
  "--tw-backdrop-grayscale",
  "--tw-backdrop-hue-rotate",
  "--tw-backdrop-invert",
  "--tw-backdrop-opacity",
  "--tw-backdrop-saturate",
  "--tw-backdrop-sepia",
  "backdrop-filter",
  "transition-property",
  "transition-delay",
  "transition-duration",
  "transition-timing-function",
  "will-change",
  "contain",
  "content",
  "forced-color-adjust"
];

// src/utils/escape.ts
function escape(value) {
  if (arguments.length == 0) {
    throw new TypeError("`CSS.escape` requires an argument.");
  }
  var string = String(value);
  var length = string.length;
  var index = -1;
  var codeUnit;
  var result = "";
  var firstCodeUnit = string.charCodeAt(0);
  if (
    // If the character is the first character and is a `-` (U+002D), and
    // there is no second character, […]
    length == 1 && firstCodeUnit == 45
  ) {
    return "\\" + string;
  }
  while (++index < length) {
    codeUnit = string.charCodeAt(index);
    if (codeUnit == 0) {
      result += "\uFFFD";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      index == 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45
    ) {
      result += "\\" + codeUnit.toString(16) + " ";
      continue;
    }
    if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
      result += string.charAt(index);
      continue;
    }
    result += "\\" + string.charAt(index);
  }
  return result;
}

// src/compile.ts
function compileCandidates(rawCandidates, designSystem, { throwOnInvalidCandidate = false } = {}) {
  rawCandidates.sort();
  let nodeSorting = /* @__PURE__ */ new Map();
  let astNodes = [];
  let parsedVariants = new DefaultMap((variant, map) => {
    return parseVariant(variant, designSystem.variants, map);
  });
  let candidates = /* @__PURE__ */ new Map();
  for (let rawCandidate of rawCandidates) {
    let candidate = parseCandidate(rawCandidate, designSystem.utilities, parsedVariants);
    if (candidate === null) {
      if (throwOnInvalidCandidate) {
        throw new Error(`Cannot apply unknown utility class: ${rawCandidate}`);
      }
      continue;
    }
    candidates.set(candidate, rawCandidate);
  }
  let variants = Array.from(parsedVariants.values()).sort((a, z) => {
    return designSystem.variants.compare(a, z);
  });
  next:
    for (let [candidate, rawCandidate] of candidates) {
      let nodes = [];
      if (candidate.kind === "arbitrary") {
        let compileFn = designSystem.utilities.getArbitrary();
        let compiledNodes = compileFn(candidate);
        if (compiledNodes === void 0) {
          if (throwOnInvalidCandidate) {
            throw new Error(`Cannot apply unknown utility class: ${rawCandidate}`);
          }
          continue next;
        }
        nodes = compiledNodes;
      } else if (candidate.kind === "static" || candidate.kind === "functional") {
        let { compileFn } = designSystem.utilities.get(candidate.root);
        let compiledNodes = compileFn(candidate);
        if (compiledNodes === void 0) {
          if (throwOnInvalidCandidate) {
            throw new Error(`Cannot apply unknown utility class: ${rawCandidate}`);
          }
          continue next;
        }
        nodes = compiledNodes;
      }
      let propertySort = getPropertySort(nodes);
      if (candidate.important) {
        applyImportant(nodes);
      }
      let node = {
        kind: "rule",
        selector: `.${escape(rawCandidate)}`,
        nodes
      };
      let variantOrder = 0n;
      for (let variant of candidate.variants) {
        let result = applyVariant(node, variant, designSystem.variants);
        if (result === null) {
          if (throwOnInvalidCandidate) {
            throw new Error(`Cannot apply unknown utility class: ${rawCandidate}`);
          }
          continue next;
        }
        variantOrder |= 1n << BigInt(variants.indexOf(variant));
      }
      nodeSorting.set(node, {
        properties: propertySort,
        variants: variantOrder,
        candidate: rawCandidate
      });
      astNodes.push(node);
    }
  astNodes.sort((a, z) => {
    let aSorting = nodeSorting.get(a);
    let zSorting = nodeSorting.get(z);
    if (aSorting.variants - zSorting.variants !== 0n) {
      return Number(aSorting.variants - zSorting.variants);
    }
    let offset = 0;
    while (aSorting.properties.length < offset && zSorting.properties.length < offset && aSorting.properties[offset] === zSorting.properties[offset]) {
      offset += 1;
    }
    return (
      // Sort by lowest property index first
      (aSorting.properties[offset] ?? Infinity) - (zSorting.properties[offset] ?? Infinity) || // Sort by most properties first, then by least properties
      zSorting.properties.length - aSorting.properties.length
    );
  });
  return {
    astNodes,
    nodeSorting
  };
}
function applyVariant(node, variant, variants) {
  if (variant.kind === "arbitrary") {
    node.nodes = [rule(variant.selector, node.nodes)];
    return;
  }
  let { applyFn } = variants.get(variant.root);
  if (variant.kind === "compound") {
    let result2 = applyVariant(node, variant.variant, variants);
    if (result2 === null)
      return null;
    for (let child of node.nodes) {
      if (child.kind !== "rule")
        return null;
      let result3 = applyFn(child, variant);
      if (result3 === null)
        return null;
    }
    return;
  }
  let result = applyFn(node, variant);
  if (result === null)
    return null;
}
function applyImportant(ast) {
  for (let node of ast) {
    if (node.kind === "rule" && node.selector === "@at-root") {
      continue;
    }
    if (node.kind === "declaration") {
      node.important = true;
    } else if (node.kind === "rule") {
      applyImportant(node.nodes);
    }
  }
}
function getPropertySort(nodes) {
  let propertySort = /* @__PURE__ */ new Set();
  let q = nodes.slice();
  while (q.length > 0) {
    let node = q.shift();
    if (node.kind === "declaration") {
      if (node.property === "--tw-sort") {
        let idx2 = property_order_default.indexOf(node.value);
        if (idx2 !== -1) {
          propertySort.add(idx2);
          break;
        }
      }
      let idx = property_order_default.indexOf(node.property);
      if (idx !== -1)
        propertySort.add(idx);
    } else if (node.kind === "rule") {
      if (node.selector === "@at-root")
        continue;
      for (let child of node.nodes) {
        q.push(child);
      }
    }
  }
  return Array.from(propertySort).sort((a, z) => a - z);
}

// src/css-parser.ts
function parse2(input) {
  let ast = [];
  let licenseComments = [];
  let stack = [];
  let parent = null;
  let node = null;
  let current = "";
  let closingBracketStack = "";
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (char === "\\") {
      current += input.slice(i, i + 2);
      i += 1;
    } else if (char === "/" && input[i + 1] === "*") {
      let start = i;
      for (let j = i + 2; j < input.length; j++) {
        if (input[j] === "\\") {
          j += 1;
        } else if (input[j] === "*" && input[j + 1] === "/") {
          i = j + 1;
          break;
        }
      }
      let commentString = input.slice(start, i + 1);
      if (commentString[2] === "!") {
        licenseComments.push(comment(commentString.slice(2, -2)));
      }
    } else if (char === '"' || char === "'") {
      let start = i;
      for (let j = i + 1; j < input.length; j++) {
        if (input[j] === "\\") {
          j += 1;
        } else if (input[j] === char) {
          i = j;
          break;
        } else if (input[j] === ";" && input[j + 1] === "\n") {
          throw new Error(`Unterminated string: ${input.slice(start, j + 1) + char}`);
        } else if (input[j] === "\n") {
          throw new Error(`Unterminated string: ${input.slice(start, j) + char}`);
        }
      }
      current += input.slice(start, i + 1);
    } else if ((char === " " || char === "\n" || char === "	") && (input[i + 1] === " " || input[i + 1] === "\n" || input[i + 1] === "	")) {
      continue;
    } else if (char === "-" && input[i + 1] === "-" && current.length === 0) {
      let closingBracketStack2 = "";
      let start = i;
      let colonIdx = -1;
      for (let j = i + 2; j < input.length; j++) {
        if (input[j] === "\\") {
          j += 1;
        } else if (input[j] === "/" && input[j + 1] === "*") {
          for (let k = j + 2; k < input.length; k++) {
            if (input[k] === "\\") {
              k += 1;
            } else if (input[k] === "*" && input[k + 1] === "/") {
              j = k + 1;
              break;
            }
          }
        } else if (colonIdx === -1 && input[j] === ":") {
          colonIdx = current.length + j - start;
        } else if (input[j] === ";" && closingBracketStack2.length === 0) {
          current += input.slice(start, j);
          i = j;
          break;
        } else if (input[j] === "(") {
          closingBracketStack2 += ")";
        } else if (input[j] === "[") {
          closingBracketStack2 += "]";
        } else if (input[j] === "{") {
          closingBracketStack2 += "}";
        } else if ((input[j] === "}" || input.length - 1 === j) && closingBracketStack2.length === 0) {
          i = j - 1;
          current += input.slice(start, j);
          break;
        } else if (input[j] === ")" || input[j] === "]" || input[j] === "}") {
          if (closingBracketStack2.length > 0 && input[j] === closingBracketStack2[closingBracketStack2.length - 1]) {
            closingBracketStack2 = closingBracketStack2.slice(0, -1);
          }
        }
      }
      let declaration = parseDeclaration(current, colonIdx);
      if (parent) {
        parent.nodes.push(declaration);
      } else {
        ast.push(declaration);
      }
      current = "";
    } else if (char === ";" && current[0] === "@") {
      node = rule(current, []);
      if (parent) {
        parent.nodes.push(node);
      } else {
        ast.push(node);
      }
      current = "";
      node = null;
    } else if (char === ";") {
      let declaration = parseDeclaration(current);
      if (parent) {
        parent.nodes.push(declaration);
      } else {
        ast.push(declaration);
      }
      current = "";
    } else if (char === "{") {
      closingBracketStack += "}";
      node = rule(current.trim(), []);
      if (parent) {
        parent.nodes.push(node);
      }
      stack.push(parent);
      parent = node;
      current = "";
      node = null;
    } else if (char === "}") {
      if (closingBracketStack === "") {
        throw new Error("Missing opening {");
      }
      closingBracketStack = closingBracketStack.slice(0, -1);
      if (current.length > 0) {
        if (current[0] === "@") {
          node = rule(current.trim(), []);
          if (parent) {
            parent.nodes.push(node);
          } else {
            ast.push(node);
          }
          current = "";
          node = null;
        } else {
          let colonIdx = current.indexOf(":");
          if (parent) {
            let importantIdx = current.indexOf("!important", colonIdx + 1);
            parent.nodes.push({
              kind: "declaration",
              property: current.slice(0, colonIdx).trim(),
              value: current.slice(colonIdx + 1, importantIdx === -1 ? current.length : importantIdx).trim(),
              important: importantIdx !== -1
            });
          }
        }
      }
      let grandParent = stack.pop() ?? null;
      if (grandParent === null && parent) {
        ast.push(parent);
      }
      parent = grandParent;
      current = "";
      node = null;
    } else {
      if (current.length === 0 && (char === " " || char === "\n" || char === "	")) {
        continue;
      }
      current += char;
    }
  }
  if (closingBracketStack.length > 0 && parent) {
    throw new Error(`Missing closing } at ${parent.selector}`);
  }
  if (licenseComments.length > 0) {
    return licenseComments.concat(ast);
  }
  return ast;
}
function parseDeclaration(current, colonIdx = current.indexOf(":")) {
  let importantIdx = current.indexOf("!important", colonIdx + 1);
  return {
    kind: "declaration",
    property: current.slice(0, colonIdx).trim(),
    value: current.slice(colonIdx + 1, importantIdx === -1 ? current.length : importantIdx).trim(),
    important: importantIdx !== -1
  };
}

// src/theme.ts
var Theme = class {
  constructor(values = /* @__PURE__ */ new Map()) {
    this.values = values;
  }
  add(key, value) {
    if (key.endsWith("-*")) {
      if (value !== "initial") {
        throw new Error(`Invalid theme value \`${value}\` for namespace \`${key}\``);
      }
      if (key === "--*") {
        this.values.clear();
      } else {
        this.clearNamespace(key.slice(0, -2));
      }
    }
    if (value === "initial") {
      this.values.delete(key);
    } else {
      this.values.set(key, value);
    }
  }
  keysInNamespaces(themeKeys) {
    let keys = [];
    for (let prefix of themeKeys) {
      let namespace = `${prefix}-`;
      for (let key of this.values.keys()) {
        if (key.startsWith(namespace)) {
          if (key.indexOf("--", 2) !== -1) {
            continue;
          }
          keys.push(key.slice(namespace.length));
        }
      }
    }
    return keys;
  }
  get(themeKeys) {
    for (let key of themeKeys) {
      let value = this.values.get(key);
      if (value) {
        return value;
      }
    }
    return null;
  }
  entries() {
    return this.values.entries();
  }
  clearNamespace(namespace) {
    for (let key of this.values.keys()) {
      if (key.startsWith(namespace)) {
        this.values.delete(key);
      }
    }
  }
  resolveKey(candidateValue, themeKeys) {
    for (let key of themeKeys) {
      let themeKey = escape(`${key}-${candidateValue.replaceAll(".", "_")}`);
      if (this.values.has(themeKey)) {
        return themeKey;
      }
    }
    return null;
  }
  resolve(candidateValue, themeKeys) {
    let themeKey = this.resolveKey(candidateValue, themeKeys);
    if (!themeKey)
      return null;
    return this.values.get(themeKey);
  }
  resolveWith(candidateValue, themeKeys, nestedKeys = []) {
    let themeKey = this.resolveKey(candidateValue, themeKeys);
    if (!themeKey)
      return null;
    let extra = {};
    for (let name of nestedKeys) {
      let nestedValue = this.values.get(`${themeKey}${name}`);
      if (nestedValue) {
        extra[name] = nestedValue;
      }
    }
    return [this.values.get(themeKey), extra];
  }
  namespace(namespace) {
    let values = /* @__PURE__ */ new Map();
    let prefix = `${namespace}-`;
    for (let [key, value] of this.values) {
      if (key === namespace) {
        values.set(null, value);
      } else if (key.startsWith(prefix)) {
        values.set(key.slice(prefix.length), value);
      }
    }
    return values;
  }
};

// src/index.ts
function compile(css2, rawCandidates) {
  let ast = parse2(css2);
  {
    ast.unshift(comment(`! tailwindcss v${version} | MIT License | https://tailwindcss.com `));
  }
  let theme = new Theme();
  let firstThemeRule = null;
  let keyframesRules = [];
  walk(ast, (node, { replaceWith }) => {
    if (node.kind !== "rule")
      return;
    if (node.selector !== "@theme")
      return;
    walk([node], (node2, { replaceWith: replaceWith2 }) => {
      if (node2.kind === "rule" && node2.selector.startsWith("@keyframes ")) {
        keyframesRules.push(node2);
        replaceWith2([]);
        return;
      }
      if (node2.kind !== "declaration")
        return;
      if (!node2.property.startsWith("--"))
        return;
      theme.add(node2.property, node2.value);
    });
    if (!firstThemeRule) {
      firstThemeRule = node;
    } else {
      replaceWith([]);
    }
  });
  if (firstThemeRule) {
    firstThemeRule = firstThemeRule;
    firstThemeRule.selector = ":root";
    let nodes = [];
    for (let [key, value] of theme.entries()) {
      nodes.push(decl(key, value));
    }
    if (keyframesRules.length > 0) {
      let animationParts = [...theme.namespace("--animate").values()].flatMap(
        (animation) => animation.split(" ")
      );
      for (let keyframesRule of keyframesRules) {
        let keyframesName = keyframesRule.selector.slice(11);
        if (!animationParts.includes(keyframesName)) {
          continue;
        }
        nodes.push(
          Object.assign(keyframesRule, {
            selector: "@at-root",
            nodes: [rule(keyframesRule.selector, keyframesRule.nodes)]
          })
        );
      }
    }
    firstThemeRule.nodes = nodes;
  }
  let designSystem = buildDesignSystem(theme);
  walk(ast, (node, { replaceWith }) => {
    if (node.kind === "rule" && node.selector === "@tailwind utilities") {
      replaceWith(compileCandidates(rawCandidates, designSystem).astNodes);
      return false;
    }
  });
  if (css2.includes("@apply")) {
    walk(ast, (node, { replaceWith }) => {
      if (node.kind === "rule" && node.selector[0] === "@" && node.selector.startsWith("@apply")) {
        let candidates = node.selector.slice(
          7
          /* Ignore `@apply ` when parsing the selector */
        ).split(/\s+/g);
        {
          let candidateAst = compileCandidates(candidates, designSystem, {
            throwOnInvalidCandidate: true
          }).astNodes;
          let newNodes = [];
          for (let candidateNode of candidateAst) {
            if (candidateNode.kind === "rule" && candidateNode.selector[0] !== "@") {
              for (let child of candidateNode.nodes) {
                newNodes.push(child);
              }
            } else {
              newNodes.push(candidateNode);
            }
          }
          replaceWith(newNodes);
        }
      }
    });
  }
  if (css2.includes("@media reference")) {
    walk(ast, (node, { replaceWith }) => {
      if (node.kind === "rule" && node.selector === "@media reference") {
        replaceWith([]);
      }
    });
  }
  return toCss(ast);
}
function optimizeCss(input, { file = "input.css", minify = false } = {}) {
  return lightningcss.transform({
    filename: file,
    code: Buffer.from(input),
    minify,
    sourceMap: false,
    drafts: {
      customMedia: true
    },
    nonStandard: {
      deepSelectorCombinator: true
    },
    include: lightningcss.Features.Nesting,
    exclude: lightningcss.Features.LogicalProperties,
    targets: {
      safari: 16 << 16 | 4 << 8
    },
    errorRecovery: true
  }).code.toString();
}

// src/cli/utils/format-ns.ts
function formatNanoseconds(input) {
  let ns = typeof input === "number" ? BigInt(input) : input;
  if (ns < 1000n)
    return `${ns}ns`;
  ns /= 1000n;
  if (ns < 1000n)
    return `${ns}\xB5s`;
  ns /= 1000n;
  if (ns < 1000n)
    return `${ns}ms`;
  ns /= 1000n;
  if (ns < 60n)
    return `${ns}s`;
  ns /= 60n;
  if (ns < 60n)
    return `${ns}m`;
  ns /= 60n;
  if (ns < 24n)
    return `${ns}h`;
  ns /= 24n;
  return `${ns}d`;
}

// src/cli/utils/renderer.ts
var UI = {
  indent: 2
};
function header() {
  return `${pc__default.default.italic(pc__default.default.bold(pc__default.default.blue("\u2248")))} tailwindcss ${pc__default.default.blue(`v${version}`)}`;
}
function highlight(file) {
  return `${pc__default.default.dim(pc__default.default.blue("`"))}${pc__default.default.blue(file)}${pc__default.default.dim(pc__default.default.blue("`"))}`;
}
function relative(to, from = process.cwd(), { preferAbsoluteIfShorter = true } = {}) {
  let result = path3__default.default.relative(from, to);
  if (!result.startsWith("..")) {
    result = `.${path3__default.default.sep}${result}`;
  }
  if (preferAbsoluteIfShorter && result.length > to.length) {
    return to;
  }
  return result;
}
function wordWrap(text, width) {
  let words = text.split(" ");
  let lines = [];
  let line = "";
  let lineLength = 0;
  for (let word of words) {
    let wordLength = clearAnsiEscapes(word).length;
    if (lineLength + wordLength + 1 > width) {
      lines.push(line);
      line = "";
      lineLength = 0;
    }
    line += (lineLength ? " " : "") + word;
    lineLength += wordLength + (lineLength ? 1 : 0);
  }
  if (lineLength) {
    lines.push(line);
  }
  return lines;
}
var ESCAPE = /((?:\x9B|\x1B\[)[0-?]*[ -\/]*[@-~])/g;
function clearAnsiEscapes(input) {
  return input.replace(ESCAPE, "");
}
function formatDuration(ns) {
  let formatted = formatNanoseconds(ns);
  if (ns <= 50 * 1e6)
    return pc__default.default.green(formatted);
  if (ns <= 300 * 1e6)
    return pc__default.default.blue(formatted);
  if (ns <= 1e3 * 1e6)
    return pc__default.default.yellow(formatted);
  return pc__default.default.red(formatted);
}
function indent(value, offset = 0) {
  return `${" ".repeat(offset + UI.indent)}${value}`;
}
function eprintln(value = "") {
  process.stderr.write(`${value}
`);
}
function println(value = "") {
  process.stdout.write(`${value}
`);
}
var resolve = typeof __require?.resolve !== "undefined" ? __require.resolve : module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('out.js', document.baseURI).href))).resolve;
function drainStdin() {
  return new Promise((resolve2, reject) => {
    let result = "";
    process.stdin.on("data", (chunk) => {
      result += chunk;
    });
    process.stdin.on("end", () => resolve2(result));
    process.stdin.on("error", (err) => reject(err));
  });
}
async function outputFile(file, contents) {
  try {
    let currentContents = await fs__default.default.readFile(file, "utf8");
    if (currentContents === contents)
      return;
  } catch {
  }
  await fs__default.default.mkdir(path3__default.default.dirname(file), { recursive: true });
  await fs__default.default.writeFile(file, contents, "utf8");
}

// src/cli/commands/build/index.ts
var css = String.raw;
function options() {
  return {
    "--input": {
      type: "string",
      description: "Input file",
      alias: "-i"
    },
    "--output": {
      type: "string",
      description: "Output file",
      alias: "-o"
    },
    "--watch": {
      type: "boolean | string",
      description: "Watch for changes and rebuild as needed",
      alias: "-w"
    },
    "--minify": {
      type: "boolean",
      description: "Minify the output",
      alias: "-m"
    },
    "--cwd": {
      type: "string",
      description: "The current working directory",
      default: "."
    }
  };
}
async function handle(args2) {
  let base = path3__default.default.resolve(args2["--cwd"]);
  if (args2["--output"]) {
    args2["--output"] = path3__default.default.resolve(base, args2["--output"]);
  }
  if (args2["--input"] && args2["--input"] !== "-") {
    args2["--input"] = path3__default.default.resolve(base, args2["--input"]);
    if (!fs.existsSync(args2["--input"])) {
      eprintln(header());
      eprintln();
      eprintln(`Specified input file ${highlight(relative(args2["--input"]))} does not exist.`);
      process.exit(1);
    }
  }
  let start = process.hrtime.bigint();
  let { candidates } = oxide.scanDir({ base });
  let [input, cssImportPaths] = await handleImports(
    args2["--input"] ? args2["--input"] === "-" ? await drainStdin() : await fs__default.default.readFile(args2["--input"], "utf-8") : css`
          @import '${resolve("tailwindcss/index.css")}';
        `,
    args2["--input"] ?? base
  );
  let result = optimizeCss(compile(input, candidates), {
    file: args2["--input"] ?? "input.css",
    minify: args2["--minify"]
  });
  if (args2["--output"]) {
    await outputFile(args2["--output"], result);
  } else {
    println(result);
  }
  let end = process.hrtime.bigint();
  eprintln(header());
  eprintln();
  eprintln(`Done in ${formatDuration(end - start)}`);
  if (args2["--watch"]) {
    await watcher__default.default.subscribe(base, async (err, events) => {
      if (err) {
        console.error(err);
        return;
      }
      try {
        if (events.length === 1 && events[0].path === args2["--output"])
          return;
        let changedFiles = [];
        let rebuildStrategy = "incremental";
        for (let event of events) {
          if (event.type === "create" || event.type === "update") {
            changedFiles.push({
              file: event.path,
              extension: path3__default.default.extname(event.path).slice(1)
            });
          }
          if (cssImportPaths.includes(event.path)) {
            rebuildStrategy = "full";
            break;
          }
        }
        let start2 = process.hrtime.bigint();
        if (rebuildStrategy === "full") {
          oxide.clearCache();
          candidates = oxide.scanDir({ base }).candidates;
        } else if (rebuildStrategy === "incremental") {
          let uniqueCandidates = new Set(candidates);
          for (let candidate of oxide.scanFiles(changedFiles, oxide.IO.Sequential | oxide.Parsing.Sequential)) {
            uniqueCandidates.add(candidate);
          }
          candidates = Array.from(uniqueCandidates);
        }
        if (rebuildStrategy === "full") {
          ;
          [input, cssImportPaths] = await handleImports(
            args2["--input"] ? await fs__default.default.readFile(args2["--input"], "utf-8") : css`
                  @import '${resolve("tailwindcss/index.css")}';
                `,
            args2["--input"] ?? base
          );
        }
        let result2 = optimizeCss(compile(input, candidates), {
          file: args2["--input"] ?? "input.css",
          minify: args2["--minify"]
        });
        if (args2["--output"]) {
          await outputFile(args2["--output"], result2);
        } else {
          println(result2);
        }
        let end2 = process.hrtime.bigint();
        eprintln(`Done in ${formatDuration(end2 - start2)}`);
      } catch (err2) {
        if (err2 instanceof Error) {
          eprintln(err2.toString());
        }
      }
    });
    if (args2["--watch"] !== "always") {
      process.stdin.on("end", () => {
        process.exit(0);
      });
    }
    process.stdin.resume();
  }
}
function handleImports(input, file) {
  if (!input.includes("@import"))
    return [input, []];
  return postcss__default.default().use(atImport__default.default()).process(input, { from: file }).then((result) => [
    result.css,
    // Use `result.messages` to get the imported files. This also includes the
    // current file itself.
    result.messages.filter((msg) => msg.type === "postcss-import").map((msg) => msg.file)
  ]);
}
function help({
  invalid,
  usage,
  options: options2
}) {
  let width = process.stdout.columns;
  println(header());
  if (invalid) {
    println();
    println(`${pc__default.default.dim("Invalid command:")} ${invalid}`);
  }
  if (usage && usage.length > 0) {
    println();
    println(pc__default.default.dim("Usage:"));
    for (let [idx, example] of usage.entries()) {
      let command2 = example.slice(0, example.indexOf("["));
      let options3 = example.slice(example.indexOf("["));
      options3 = options3.replace(/\[.*?\]/g, (option) => pc__default.default.dim(option));
      let space = 1;
      let lines = wordWrap(options3, width - UI.indent - command2.length - space);
      if (lines.length > 1 && idx !== 0) {
        println();
      }
      println(indent(`${command2}${lines.shift()}`));
      for (let line of lines) {
        println(indent(line, command2.length));
      }
    }
  }
  if (options2) {
    let maxAliasLength = 0;
    for (let { alias } of Object.values(options2)) {
      if (alias) {
        maxAliasLength = Math.max(maxAliasLength, alias.length);
      }
    }
    let optionStrings = [];
    let maxOptionLength = 0;
    for (let [flag, { alias }] of Object.entries(options2)) {
      let option = [
        alias ? `${alias.padStart(maxAliasLength)}` : alias,
        alias ? flag : " ".repeat(
          maxAliasLength + 2
          /* `, `.length */
        ) + flag
      ].filter(Boolean).join(", ");
      optionStrings.push(option);
      maxOptionLength = Math.max(maxOptionLength, option.length);
    }
    println();
    println(pc__default.default.dim("Options:"));
    let minimumGap = 8;
    for (let { description, default: defaultValue = null } of Object.values(options2)) {
      let option = optionStrings.shift();
      let dotCount = minimumGap + (maxOptionLength - option.length);
      let spaces = 2;
      let availableWidth = width - option.length - dotCount - spaces - UI.indent;
      let lines = wordWrap(
        defaultValue !== null ? `${description} ${pc__default.default.dim(`[default:\u202F${highlight(`${defaultValue}`)}]`)}` : description,
        availableWidth
      );
      println(
        indent(`${pc__default.default.blue(option)} ${pc__default.default.dim(pc__default.default.gray("\xB7")).repeat(dotCount)} ${lines.shift()}`)
      );
      for (let line of lines) {
        println(indent(`${" ".repeat(option.length + dotCount + spaces)}${line}`));
      }
    }
  }
}

// src/cli/index.ts
var sharedOptions = {
  "--help": { type: "boolean", description: "Display usage information", alias: "-h" }
};
var shared = args(sharedOptions);
var command = shared._[0];
if (command) {
  help({
    invalid: command,
    usage: ["tailwindcss [options]"],
    options: { ...options(), ...sharedOptions }
  });
  process.exit(1);
}
if (process.stdout.isTTY && !process.argv.slice(2).includes("-o") || shared["--help"]) {
  help({
    usage: ["tailwindcss [--input input.css] [--output output.css] [--watch] [options\u2026]"],
    options: { ...options(), ...sharedOptions }
  });
  process.exit(0);
}
handle(args(options()));
