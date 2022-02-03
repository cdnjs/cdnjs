/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import normalizeColor from './normalizeColor';
import normalizeValueWithProperty from './normalizeValueWithProperty';
var emptyObject = {};
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
var left = 'left'; // Map of LTR property names to their BiDi equivalent.

var PROPERTIES_FLIP = {
  borderTopLeftRadius: borderTopRightRadius,
  borderTopRightRadius: borderTopLeftRadius,
  borderBottomLeftRadius: borderBottomRightRadius,
  borderBottomRightRadius: borderBottomLeftRadius,
  borderLeftColor: borderRightColor,
  borderLeftStyle: borderRightStyle,
  borderLeftWidth: borderRightWidth,
  borderRightColor: borderLeftColor,
  borderRightStyle: borderLeftStyle,
  borderRightWidth: borderLeftWidth,
  left: right,
  marginLeft: marginRight,
  marginRight: marginLeft,
  paddingLeft: paddingRight,
  paddingRight: paddingLeft,
  right: left
}; // Map of I18N property names to their LTR equivalent.

var PROPERTIES_I18N = {
  borderTopStartRadius: borderTopLeftRadius,
  borderTopEndRadius: borderTopRightRadius,
  borderBottomStartRadius: borderBottomLeftRadius,
  borderBottomEndRadius: borderBottomRightRadius,
  borderStartColor: borderLeftColor,
  borderStartStyle: borderLeftStyle,
  borderStartWidth: borderLeftWidth,
  borderEndColor: borderRightColor,
  borderEndStyle: borderRightStyle,
  borderEndWidth: borderRightWidth,
  end: right,
  marginStart: marginLeft,
  marginEnd: marginRight,
  paddingStart: paddingLeft,
  paddingEnd: paddingRight,
  start: left
};
var PROPERTIES_VALUE = {
  clear: true,
  float: true,
  textAlign: true
};
/**
 * Shadows
 */

var defaultOffset = {
  height: 0,
  width: 0
};
export var createBoxShadowValue = function createBoxShadowValue(style) {
  var shadowColor = style.shadowColor,
      shadowOffset = style.shadowOffset,
      shadowOpacity = style.shadowOpacity,
      shadowRadius = style.shadowRadius;

  var _ref = shadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;

  var offsetX = normalizeValueWithProperty(width);
  var offsetY = normalizeValueWithProperty(height);
  var blurRadius = normalizeValueWithProperty(shadowRadius || 0);
  var color = normalizeColor(shadowColor || 'black', shadowOpacity);

  if (color != null && offsetX != null && offsetY != null && blurRadius != null) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};
export var createTextShadowValue = function createTextShadowValue(style) {
  var textShadowColor = style.textShadowColor,
      textShadowOffset = style.textShadowOffset,
      textShadowRadius = style.textShadowRadius;

  var _ref2 = textShadowOffset || defaultOffset,
      height = _ref2.height,
      width = _ref2.width;

  var radius = textShadowRadius || 0;
  var offsetX = normalizeValueWithProperty(width);
  var offsetY = normalizeValueWithProperty(height);
  var blurRadius = normalizeValueWithProperty(radius);
  var color = normalizeValueWithProperty(textShadowColor, 'textShadowColor');

  if (color && (height !== 0 || width !== 0 || radius !== 0) && offsetX != null && offsetY != null && blurRadius != null) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};
/**
 * Preprocess styles
 */

var preprocess = function preprocess(originalStyle, isRTL) {
  var style = originalStyle || emptyObject;
  var frozenProps = {};
  var nextStyle = {};

  for (var originalProp in style) {
    var originalValue = style[originalProp];
    var prop = originalProp;
    var value = originalValue;

    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      continue;
    } // BiDi flip properties


    if (PROPERTIES_I18N.hasOwnProperty(originalProp)) {
      // convert start/end
      var convertedProp = PROPERTIES_I18N[originalProp];
      prop = isRTL ? PROPERTIES_FLIP[convertedProp] : convertedProp;
    } // BiDi flip values


    if (PROPERTIES_VALUE.hasOwnProperty(originalProp)) {
      if (originalValue === 'start') {
        value = isRTL ? 'right' : 'left';
      } else if (originalValue === 'end') {
        value = isRTL ? 'left' : 'right';
      }
    } // BiDi flip transitionProperty value


    if (prop === 'transitionProperty') {
      // BiDi flip properties
      if (PROPERTIES_I18N.hasOwnProperty(value)) {
        // convert start/end
        var convertedValue = PROPERTIES_I18N[originalValue];
        value = isRTL ? PROPERTIES_FLIP[convertedValue] : convertedValue;
      }
    } // Convert shadow styles


    if (prop === 'shadowColor' || prop === 'shadowOffset' || prop === 'shadowOpacity' || prop === 'shadowRadius') {
      var boxShadowValue = createBoxShadowValue(style);

      if (boxShadowValue != null && nextStyle.boxShadow == null) {
        var boxShadow = style.boxShadow;
        prop = 'boxShadow';
        value = boxShadow ? boxShadow + ", " + boxShadowValue : boxShadowValue;
      } else {
        continue;
      }
    } // Convert text shadow styles


    if (prop === 'textShadowColor' || prop === 'textShadowOffset' || prop === 'textShadowRadius') {
      var textShadowValue = createTextShadowValue(style);

      if (textShadowValue != null && nextStyle.textShadow == null) {
        var textShadow = style.textShadow;
        prop = 'textShadow';
        value = textShadow ? textShadow + ", " + textShadowValue : textShadowValue;
      } else {
        continue;
      }
    } // Create finalized style


    if (!frozenProps[prop]) {
      nextStyle[prop] = value;
    }

    if (PROPERTIES_I18N[originalProp]) {
      frozenProps[prop] = true;
    }
  } // $FlowIgnore


  return nextStyle;
};

export default preprocess;