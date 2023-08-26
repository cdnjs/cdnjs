/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import normalizeColor from './compiler/normalizeColor';
import normalizeValueWithProperty from './compiler/normalizeValueWithProperty';
import { warnOnce } from '../../modules/warnOnce';
var emptyObject = {};

/**
 * Shadows
 */

var defaultOffset = {
  height: 0,
  width: 0
};
export var createBoxShadowValue = style => {
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
export var createTextShadowValue = style => {
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

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
// { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
var mapTransform = transform => {
  var type = Object.keys(transform)[0];
  var value = transform[type];
  if (type === 'matrix' || type === 'matrix3d') {
    return type + "(" + value.join(',') + ")";
  } else {
    var normalizedValue = normalizeValueWithProperty(value, type);
    return type + "(" + normalizedValue + ")";
  }
};
export var createTransformValue = value => {
  return value.map(mapTransform).join(' ');
};
var PROPERTIES_STANDARD = {
  borderBottomEndRadius: 'borderEndEndRadius',
  borderBottomStartRadius: 'borderEndStartRadius',
  borderTopEndRadius: 'borderStartEndRadius',
  borderTopStartRadius: 'borderStartStartRadius',
  borderEndColor: 'borderInlineEndColor',
  borderEndStyle: 'borderInlineEndStyle',
  borderEndWidth: 'borderInlineEndWidth',
  borderStartColor: 'borderInlineStartColor',
  borderStartStyle: 'borderInlineStartStyle',
  borderStartWidth: 'borderInlineStartWidth',
  end: 'insetInlineEnd',
  marginEnd: 'marginInlineEnd',
  marginHorizontal: 'marginInline',
  marginStart: 'marginInlineStart',
  marginVertical: 'marginBlock',
  paddingEnd: 'paddingInlineEnd',
  paddingHorizontal: 'paddingInline',
  paddingStart: 'paddingInlineStart',
  paddingVertical: 'paddingBlock',
  start: 'insetInlineStart'
};
var ignoredProps = {
  elevation: true,
  overlayColor: true,
  resizeMode: true,
  tintColor: true
};

/**
 * Preprocess styles
 */
export var preprocess = function preprocess(originalStyle, options) {
  if (options === void 0) {
    options = {};
  }
  var style = originalStyle || emptyObject;
  var nextStyle = {};

  // Convert shadow styles
  if (options.shadow === true, style.shadowColor != null || style.shadowOffset != null || style.shadowOpacity != null || style.shadowRadius != null) {
    warnOnce('shadowStyles', "\"shadow*\" style props are deprecated. Use \"boxShadow\".");
    var boxShadowValue = createBoxShadowValue(style);
    if (boxShadowValue != null && nextStyle.boxShadow == null) {
      var boxShadow = style.boxShadow;
      var value = boxShadow ? boxShadow + ", " + boxShadowValue : boxShadowValue;
      nextStyle.boxShadow = value;
    }
  }

  // Convert text shadow styles
  if (options.textShadow === true, style.textShadowColor != null || style.textShadowOffset != null || style.textShadowRadius != null) {
    warnOnce('textShadowStyles', "\"textShadow*\" style props are deprecated. Use \"textShadow\".");
    var textShadowValue = createTextShadowValue(style);
    if (textShadowValue != null && nextStyle.textShadow == null) {
      var textShadow = style.textShadow;
      var _value = textShadow ? textShadow + ", " + textShadowValue : textShadowValue;
      nextStyle.textShadow = _value;
    }
  }
  for (var originalProp in style) {
    if (
    // Ignore some React Native styles
    ignoredProps[originalProp] != null || originalProp === 'shadowColor' || originalProp === 'shadowOffset' || originalProp === 'shadowOpacity' || originalProp === 'shadowRadius' || originalProp === 'textShadowColor' || originalProp === 'textShadowOffset' || originalProp === 'textShadowRadius') {
      continue;
    }
    var originalValue = style[originalProp];
    var prop = PROPERTIES_STANDARD[originalProp] || originalProp;
    var _value2 = originalValue;
    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || prop !== originalProp && style[prop] != null) {
      continue;
    }
    if (prop === 'aspectRatio' && typeof _value2 === 'number') {
      nextStyle[prop] = _value2.toString();
    } else if (prop === 'fontVariant') {
      if (Array.isArray(_value2) && _value2.length > 0) {
        warnOnce('fontVariant', '"fontVariant" style array value is deprecated. Use space-separated values.');
        _value2 = _value2.join(' ');
      }
      nextStyle[prop] = _value2;
    } else if (prop === 'textAlignVertical') {
      warnOnce('textAlignVertical', '"textAlignVertical" style is deprecated. Use "verticalAlign".');
      if (style.verticalAlign == null) {
        nextStyle.verticalAlign = _value2 === 'center' ? 'middle' : _value2;
      }
    } else if (prop === 'transform') {
      if (Array.isArray(_value2)) {
        warnOnce('transform', '"transform" style array value is deprecated. Use space-separated string functions, e.g., "scaleX(2) rotateX(15deg)".');
        _value2 = createTransformValue(_value2);
      }
      nextStyle.transform = _value2;
    } else {
      nextStyle[prop] = _value2;
    }
  }

  // $FlowIgnore
  return nextStyle;
};
export default preprocess;