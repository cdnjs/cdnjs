"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _normalizeValueWithProperty = _interopRequireDefault(require("./normalizeValueWithProperty"));
var _canUseDom = _interopRequireDefault(require("../../../modules/canUseDom"));
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different. It
 * gives giving precedence to the more specific style property. For example,
 * the value of `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutally exclusive style declarations by expanding all of
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longfrom equivalents.
 */

var emptyObject = {};
var supportsCSS3TextDecoration = !_canUseDom.default || window.CSS != null && window.CSS.supports != null && (window.CSS.supports('text-decoration-line', 'none') || window.CSS.supports('-webkit-text-decoration-line', 'none'));
var MONOSPACE_FONT_STACK = 'monospace,monospace';
var SYSTEM_FONT_STACK = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
var STYLE_SHORT_FORM_EXPANSIONS = {
  borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  borderBlockColor: ['borderTopColor', 'borderBottomColor'],
  borderInlineColor: ['borderRightColor', 'borderLeftColor'],
  borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  borderBlockStyle: ['borderTopStyle', 'borderBottomStyle'],
  borderInlineStyle: ['borderRightStyle', 'borderLeftStyle'],
  borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  borderBlockWidth: ['borderTopWidth', 'borderBottomWidth'],
  borderInlineWidth: ['borderRightWidth', 'borderLeftWidth'],
  insetBlock: ['top', 'bottom'],
  insetInline: ['left', 'right'],
  marginBlock: ['marginTop', 'marginBottom'],
  marginInline: ['marginRight', 'marginLeft'],
  paddingBlock: ['paddingTop', 'paddingBottom'],
  paddingInline: ['paddingRight', 'paddingLeft'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  borderBlockStartColor: ['borderTopColor'],
  borderBlockStartStyle: ['borderTopStyle'],
  borderBlockStartWidth: ['borderTopWidth'],
  borderBlockEndColor: ['borderBottomColor'],
  borderBlockEndStyle: ['borderBottomStyle'],
  borderBlockEndWidth: ['borderBottomWidth'],
  //borderInlineStartColor: ['borderLeftColor'],
  //borderInlineStartStyle: ['borderLeftStyle'],
  //borderInlineStartWidth: ['borderLeftWidth'],
  //borderInlineEndColor: ['borderRightColor'],
  //borderInlineEndStyle: ['borderRightStyle'],
  //borderInlineEndWidth: ['borderRightWidth'],
  borderEndStartRadius: ['borderBottomLeftRadius'],
  borderEndEndRadius: ['borderBottomRightRadius'],
  borderStartStartRadius: ['borderTopLeftRadius'],
  borderStartEndRadius: ['borderTopRightRadius'],
  insetBlockEnd: ['bottom'],
  insetBlockStart: ['top'],
  //insetInlineEnd: ['right'],
  //insetInlineStart: ['left'],
  marginBlockStart: ['marginTop'],
  marginBlockEnd: ['marginBottom'],
  //marginInlineStart: ['marginLeft'],
  //marginInlineEnd: ['marginRight'],
  paddingBlockStart: ['paddingTop'],
  paddingBlockEnd: ['paddingBottom']
  //paddingInlineStart: ['marginLeft'],
  //paddingInlineEnd: ['marginRight'],
};

/**
 * Reducer
 */

var createReactDOMStyle = (style, isInline) => {
  if (!style) {
    return emptyObject;
  }
  var resolvedStyle = {};
  var _loop = function _loop() {
    var value = style[prop];
    if (
    // Ignore everything with a null value
    value == null) {
      return "continue";
    }
    if (prop === 'backgroundClip') {
      // TODO: remove once this issue is fixed
      // https://github.com/rofrischmann/inline-style-prefixer/issues/159
      if (value === 'text') {
        resolvedStyle.backgroundClip = value;
        resolvedStyle.WebkitBackgroundClip = value;
      }
    } else if (prop === 'flex') {
      if (value === -1) {
        resolvedStyle.flexGrow = 0;
        resolvedStyle.flexShrink = 1;
        resolvedStyle.flexBasis = 'auto';
      } else {
        resolvedStyle.flex = value;
      }
    } else if (prop === 'font') {
      resolvedStyle[prop] = value.replace('System', SYSTEM_FONT_STACK);
    } else if (prop === 'fontFamily') {
      if (value.indexOf('System') > -1) {
        var stack = value.split(/,\s*/);
        stack[stack.indexOf('System')] = SYSTEM_FONT_STACK;
        resolvedStyle[prop] = stack.join(',');
      } else if (value === 'monospace') {
        resolvedStyle[prop] = MONOSPACE_FONT_STACK;
      } else {
        resolvedStyle[prop] = value;
      }
    } else if (prop === 'textDecorationLine') {
      // use 'text-decoration' for browsers that only support CSS2
      // text-decoration (e.g., IE, Edge)
      if (!supportsCSS3TextDecoration) {
        resolvedStyle.textDecoration = value;
      } else {
        resolvedStyle.textDecorationLine = value;
      }
    } else if (prop === 'writingDirection') {
      resolvedStyle.direction = value;
    } else {
      var _value = (0, _normalizeValueWithProperty.default)(style[prop], prop);
      var longFormProperties = STYLE_SHORT_FORM_EXPANSIONS[prop];
      if (isInline && prop === 'inset') {
        if (style.insetInline == null) {
          resolvedStyle.left = _value;
          resolvedStyle.right = _value;
        }
        if (style.insetBlock == null) {
          resolvedStyle.top = _value;
          resolvedStyle.bottom = _value;
        }
      } else if (isInline && prop === 'margin') {
        if (style.marginInline == null) {
          resolvedStyle.marginLeft = _value;
          resolvedStyle.marginRight = _value;
        }
        if (style.marginBlock == null) {
          resolvedStyle.marginTop = _value;
          resolvedStyle.marginBottom = _value;
        }
      } else if (isInline && prop === 'padding') {
        if (style.paddingInline == null) {
          resolvedStyle.paddingLeft = _value;
          resolvedStyle.paddingRight = _value;
        }
        if (style.paddingBlock == null) {
          resolvedStyle.paddingTop = _value;
          resolvedStyle.paddingBottom = _value;
        }
      } else if (longFormProperties) {
        longFormProperties.forEach((longForm, i) => {
          // The value of any longform property in the original styles takes
          // precedence over the shortform's value.
          if (style[longForm] == null) {
            resolvedStyle[longForm] = _value;
          }
        });
      } else {
        resolvedStyle[prop] = _value;
      }
    }
  };
  for (var prop in style) {
    var _ret = _loop();
    if (_ret === "continue") continue;
  }
  return resolvedStyle;
};
var _default = exports.default = createReactDOMStyle;
module.exports = exports.default;