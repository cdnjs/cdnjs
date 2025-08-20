"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.atomic = atomic;
exports.classic = classic;
exports.inline = inline;
exports.stringifyValueWithProperty = stringifyValueWithProperty;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _createReactDOMStyle = _interopRequireDefault(require("./createReactDOMStyle"));
var _hash = _interopRequireDefault(require("./hash"));
var _hyphenateStyleName = _interopRequireDefault(require("./hyphenateStyleName"));
var _normalizeValueWithProperty = _interopRequireDefault(require("./normalizeValueWithProperty"));
var _prefixStyles = _interopRequireDefault(require("../../../modules/prefixStyles"));
var _excluded = ["animationKeyframes"];
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var cache = new Map();
var emptyObject = {};
var classicGroup = 1;
var atomicGroup = 3;
var customGroup = {
  borderColor: 2,
  borderRadius: 2,
  borderStyle: 2,
  borderWidth: 2,
  display: 2,
  flex: 2,
  inset: 2,
  margin: 2,
  overflow: 2,
  overscrollBehavior: 2,
  padding: 2,
  insetBlock: 2.1,
  insetInline: 2.1,
  marginInline: 2.1,
  marginBlock: 2.1,
  paddingInline: 2.1,
  paddingBlock: 2.1,
  borderBlockStartColor: 2.2,
  borderBlockStartStyle: 2.2,
  borderBlockStartWidth: 2.2,
  borderBlockEndColor: 2.2,
  borderBlockEndStyle: 2.2,
  borderBlockEndWidth: 2.2,
  borderInlineStartColor: 2.2,
  borderInlineStartStyle: 2.2,
  borderInlineStartWidth: 2.2,
  borderInlineEndColor: 2.2,
  borderInlineEndStyle: 2.2,
  borderInlineEndWidth: 2.2,
  borderEndStartRadius: 2.2,
  borderEndEndRadius: 2.2,
  borderStartStartRadius: 2.2,
  borderStartEndRadius: 2.2,
  insetBlockEnd: 2.2,
  insetBlockStart: 2.2,
  insetInlineEnd: 2.2,
  insetInlineStart: 2.2,
  marginBlockStart: 2.2,
  marginBlockEnd: 2.2,
  marginInlineStart: 2.2,
  marginInlineEnd: 2.2,
  paddingBlockStart: 2.2,
  paddingBlockEnd: 2.2,
  paddingInlineStart: 2.2,
  paddingInlineEnd: 2.2
};
var borderTopLeftRadius = 'borderTopLeftRadius';
var borderTopRightRadius = 'borderTopRightRadius';
var borderBottomLeftRadius = 'borderBottomLeftRadius';
var borderBottomRightRadius = 'borderBottomRightRadius';
var borderLeftColor = 'borderLeftColor';
var borderLeftStyle = 'borderLeftStyle';
var borderLeftWidth = 'borderLeftWidth';
var borderRightColor = 'borderRightColor';
var borderRightStyle = 'borderRightStyle';
var borderRightWidth = 'borderRightWidth';
var right = 'right';
var marginLeft = 'marginLeft';
var marginRight = 'marginRight';
var paddingLeft = 'paddingLeft';
var paddingRight = 'paddingRight';
var left = 'left';

// Map of LTR property names to their BiDi equivalent.
var PROPERTIES_FLIP = {
  [borderTopLeftRadius]: borderTopRightRadius,
  [borderTopRightRadius]: borderTopLeftRadius,
  [borderBottomLeftRadius]: borderBottomRightRadius,
  [borderBottomRightRadius]: borderBottomLeftRadius,
  [borderLeftColor]: borderRightColor,
  [borderLeftStyle]: borderRightStyle,
  [borderLeftWidth]: borderRightWidth,
  [borderRightColor]: borderLeftColor,
  [borderRightStyle]: borderLeftStyle,
  [borderRightWidth]: borderLeftWidth,
  [left]: right,
  [marginLeft]: marginRight,
  [marginRight]: marginLeft,
  [paddingLeft]: paddingRight,
  [paddingRight]: paddingLeft,
  [right]: left
};

// Map of I18N property names to their LTR equivalent.
var PROPERTIES_I18N = {
  borderStartStartRadius: borderTopLeftRadius,
  borderStartEndRadius: borderTopRightRadius,
  borderEndStartRadius: borderBottomLeftRadius,
  borderEndEndRadius: borderBottomRightRadius,
  borderInlineStartColor: borderLeftColor,
  borderInlineStartStyle: borderLeftStyle,
  borderInlineStartWidth: borderLeftWidth,
  borderInlineEndColor: borderRightColor,
  borderInlineEndStyle: borderRightStyle,
  borderInlineEndWidth: borderRightWidth,
  insetInlineEnd: right,
  insetInlineStart: left,
  marginInlineStart: marginLeft,
  marginInlineEnd: marginRight,
  paddingInlineStart: paddingLeft,
  paddingInlineEnd: paddingRight
};
var PROPERTIES_VALUE = ['clear', 'float', 'textAlign'];
function atomic(style) {
  var compiledStyle = {
    $$css: true
  };
  var compiledRules = [];
  function atomicCompile(srcProp, prop, value) {
    var valueString = stringifyValueWithProperty(value, prop);
    var cacheKey = prop + valueString;
    var cachedResult = cache.get(cacheKey);
    var identifier;
    if (cachedResult != null) {
      identifier = cachedResult[0];
      compiledRules.push(cachedResult[1]);
    } else {
      var v = srcProp !== prop ? cacheKey : valueString;
      identifier = createIdentifier('r', srcProp, v);
      var order = customGroup[srcProp] || atomicGroup;
      var rules = createAtomicRules(identifier, prop, value);
      var orderedRules = [rules, order];
      compiledRules.push(orderedRules);
      cache.set(cacheKey, [identifier, orderedRules]);
    }
    return identifier;
  }
  Object.keys(style).sort().forEach(srcProp => {
    var value = style[srcProp];
    if (value != null) {
      var localizeableValue;
      // BiDi flip values
      if (PROPERTIES_VALUE.indexOf(srcProp) > -1) {
        var _left = atomicCompile(srcProp, srcProp, 'left');
        var _right = atomicCompile(srcProp, srcProp, 'right');
        if (value === 'start') {
          localizeableValue = [_left, _right];
        } else if (value === 'end') {
          localizeableValue = [_right, _left];
        }
      }
      // BiDi flip properties
      var propPolyfill = PROPERTIES_I18N[srcProp];
      if (propPolyfill != null) {
        var ltr = atomicCompile(srcProp, propPolyfill, value);
        var rtl = atomicCompile(srcProp, PROPERTIES_FLIP[propPolyfill], value);
        localizeableValue = [ltr, rtl];
      }
      // BiDi flip transitionProperty value
      if (srcProp === 'transitionProperty') {
        var values = Array.isArray(value) ? value : [value];
        var polyfillIndices = [];
        for (var i = 0; i < values.length; i++) {
          var val = values[i];
          if (typeof val === 'string' && PROPERTIES_I18N[val] != null) {
            polyfillIndices.push(i);
          }
        }
        if (polyfillIndices.length > 0) {
          var ltrPolyfillValues = [...values];
          var rtlPolyfillValues = [...values];
          polyfillIndices.forEach(i => {
            var ltrVal = ltrPolyfillValues[i];
            if (typeof ltrVal === 'string') {
              var ltrPolyfill = PROPERTIES_I18N[ltrVal];
              var rtlPolyfill = PROPERTIES_FLIP[ltrPolyfill];
              ltrPolyfillValues[i] = ltrPolyfill;
              rtlPolyfillValues[i] = rtlPolyfill;
              var _ltr = atomicCompile(srcProp, srcProp, ltrPolyfillValues);
              var _rtl = atomicCompile(srcProp, srcProp, rtlPolyfillValues);
              localizeableValue = [_ltr, _rtl];
            }
          });
        }
      }
      if (localizeableValue == null) {
        localizeableValue = atomicCompile(srcProp, srcProp, value);
      } else {
        compiledStyle['$$css$localize'] = true;
      }
      compiledStyle[srcProp] = localizeableValue;
    }
  });
  return [compiledStyle, compiledRules];
}

/**
 * Compile simple style object to classic CSS rules.
 * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */
function classic(style, name) {
  var compiledStyle = {
    $$css: true
  };
  var compiledRules = [];
  var animationKeyframes = style.animationKeyframes,
    rest = (0, _objectWithoutPropertiesLoose2.default)(style, _excluded);
  var identifier = createIdentifier('css', name, JSON.stringify(style));
  var selector = "." + identifier;
  var animationName;
  if (animationKeyframes != null) {
    var _processKeyframesValu = processKeyframesValue(animationKeyframes),
      animationNames = _processKeyframesValu[0],
      keyframesRules = _processKeyframesValu[1];
    animationName = animationNames.join(',');
    compiledRules.push(...keyframesRules);
  }
  var block = createDeclarationBlock((0, _objectSpread2.default)((0, _objectSpread2.default)({}, rest), {}, {
    animationName
  }));
  compiledRules.push("" + selector + block);
  compiledStyle[identifier] = identifier;
  return [compiledStyle, [[compiledRules, classicGroup]]];
}

/**
 * Compile simple style object to inline DOM styles.
 * No support for 'animationKeyframes', 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */
function inline(originalStyle, isRTL) {
  var style = originalStyle || emptyObject;
  var frozenProps = {};
  var nextStyle = {};
  var _loop = function _loop() {
    var originalValue = style[originalProp];
    var prop = originalProp;
    var value = originalValue;
    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      return "continue";
    }

    // BiDi flip values
    if (PROPERTIES_VALUE.indexOf(originalProp) > -1) {
      if (originalValue === 'start') {
        value = isRTL ? 'right' : 'left';
      } else if (originalValue === 'end') {
        value = isRTL ? 'left' : 'right';
      }
    }
    // BiDi flip properties
    var propPolyfill = PROPERTIES_I18N[originalProp];
    if (propPolyfill != null) {
      prop = isRTL ? PROPERTIES_FLIP[propPolyfill] : propPolyfill;
    }
    // BiDi flip transitionProperty value
    if (originalProp === 'transitionProperty') {
      // $FlowFixMe
      var originalValues = Array.isArray(originalValue) ? originalValue : [originalValue];
      originalValues.forEach((val, i) => {
        if (typeof val === 'string') {
          var valuePolyfill = PROPERTIES_I18N[val];
          if (valuePolyfill != null) {
            originalValues[i] = isRTL ? PROPERTIES_FLIP[valuePolyfill] : valuePolyfill;
            value = originalValues.join(' ');
          }
        }
      });
    }

    // Create finalized style
    if (!frozenProps[prop]) {
      nextStyle[prop] = value;
    }
    if (prop === originalProp) {
      frozenProps[prop] = true;
    }

    //    if (PROPERTIES_I18N.hasOwnProperty(originalProp)) {
    //    frozenProps[prop] = true;
    //}
  };
  for (var originalProp in style) {
    var _ret = _loop();
    if (_ret === "continue") continue;
  }
  return (0, _createReactDOMStyle.default)(nextStyle, true);
}

/**
 * Create a value string that normalizes different input values with a common
 * output.
 */
function stringifyValueWithProperty(value, property) {
  // e.g., 0 => '0px', 'black' => 'rgba(0,0,0,1)'
  var normalizedValue = (0, _normalizeValueWithProperty.default)(value, property);
  return typeof normalizedValue !== 'string' ? JSON.stringify(normalizedValue || '') : normalizedValue;
}

/**
 * Create the Atomic CSS rules needed for a given StyleSheet rule.
 * Translates StyleSheet declarations to CSS.
 */
function createAtomicRules(identifier, property, value) {
  var rules = [];
  var selector = "." + identifier;

  // Handle non-standard properties and object values that require multiple
  // CSS rules to be created.
  switch (property) {
    case 'animationKeyframes':
      {
        var _processKeyframesValu2 = processKeyframesValue(value),
          animationNames = _processKeyframesValu2[0],
          keyframesRules = _processKeyframesValu2[1];
        var block = createDeclarationBlock({
          animationName: animationNames.join(',')
        });
        rules.push("" + selector + block, ...keyframesRules);
        break;
      }

    // Equivalent to using '::placeholder'
    case 'placeholderTextColor':
      {
        var _block = createDeclarationBlock({
          color: value,
          opacity: 1
        });
        rules.push(selector + "::-webkit-input-placeholder" + _block, selector + "::-moz-placeholder" + _block, selector + ":-ms-input-placeholder" + _block, selector + "::placeholder" + _block);
        break;
      }

    // Polyfill for additional 'pointer-events' values
    // See d13f78622b233a0afc0c7a200c0a0792c8ca9e58
    // See https://reactnative.dev/docs/view#pointerevents
    case 'pointerEvents':
      {
        var finalValue = value;
        if (value === 'auto') {
          finalValue = 'auto!important';
        } else if (value === 'none') {
          finalValue = 'none!important';
          var _block2 = createDeclarationBlock({
            pointerEvents: 'none'
          });
          rules.push(selector + " * " + _block2);
        } else if (value === 'box-none') {
          finalValue = 'none!important';
          var _block3 = createDeclarationBlock({
            pointerEvents: 'auto'
          });
          rules.push(selector + " * " + _block3);
        } else if (value === 'box-only') {
          finalValue = 'auto!important';
          var _block4 = createDeclarationBlock({
            pointerEvents: 'none'
          });
          rules.push(selector + " * " + _block4);
        }
        var _block5 = createDeclarationBlock({
          pointerEvents: finalValue
        });
        rules.push("" + selector + _block5);
        break;
      }

    // Polyfill for draft spec
    // https://drafts.csswg.org/css-scrollbars-1/
    case 'scrollbarWidth':
      {
        if (value === 'none') {
          rules.push(selector + "::-webkit-scrollbar{display:none}");
        }
        var _block6 = createDeclarationBlock({
          scrollbarWidth: value
        });
        rules.push("" + selector + _block6);
        break;
      }
    default:
      {
        var _block7 = createDeclarationBlock({
          [property]: value
        });
        rules.push("" + selector + _block7);
        break;
      }
  }
  return rules;
}

/**
 * Creates a CSS declaration block from a StyleSheet object.
 */
function createDeclarationBlock(style) {
  var domStyle = (0, _prefixStyles.default)((0, _createReactDOMStyle.default)(style));
  var declarationsString = Object.keys(domStyle).map(property => {
    var value = domStyle[property];
    var prop = (0, _hyphenateStyleName.default)(property);
    // The prefixer may return an array of values:
    // { display: [ '-webkit-flex', 'flex' ] }
    // to represent "fallback" declarations
    // { display: -webkit-flex; display: flex; }
    if (Array.isArray(value)) {
      return value.map(v => prop + ":" + v).join(';');
    } else {
      return prop + ":" + value;
    }
  })
  // Once properties are hyphenated, this will put the vendor
  // prefixed and short-form properties first in the list.
  .sort().join(';');
  return "{" + declarationsString + ";}";
}

/**
 * An identifier is associated with a unique set of styles.
 */
function createIdentifier(prefix, name, key) {
  var hashedString = (0, _hash.default)(name + key);
  return process.env.NODE_ENV !== 'production' ? prefix + "-" + name + "-" + hashedString : prefix + "-" + hashedString;
}

/**
 * Create individual CSS keyframes rules.
 */
function createKeyframes(keyframes) {
  var prefixes = ['-webkit-', ''];
  var identifier = createIdentifier('r', 'animation', JSON.stringify(keyframes));
  var steps = '{' + Object.keys(keyframes).map(stepName => {
    var rule = keyframes[stepName];
    var block = createDeclarationBlock(rule);
    return "" + stepName + block;
  }).join('') + '}';
  var rules = prefixes.map(prefix => {
    return "@" + prefix + "keyframes " + identifier + steps;
  });
  return [identifier, rules];
}

/**
 * Create CSS keyframes rules and names from a StyleSheet keyframes object.
 */
function processKeyframesValue(keyframesValue) {
  if (typeof keyframesValue === 'number') {
    throw new Error("Invalid CSS keyframes type: " + typeof keyframesValue);
  }
  var animationNames = [];
  var rules = [];
  var value = Array.isArray(keyframesValue) ? keyframesValue : [keyframesValue];
  value.forEach(keyframes => {
    if (typeof keyframes === 'string') {
      // Support external animation libraries (identifiers only)
      animationNames.push(keyframes);
    } else {
      // Create rules for each of the keyframes
      var _createKeyframes = createKeyframes(keyframes),
        identifier = _createKeyframes[0],
        keyframesRules = _createKeyframes[1];
      animationNames.push(identifier);
      rules.push(...keyframesRules);
    }
  });
  return [animationNames, rules];
}