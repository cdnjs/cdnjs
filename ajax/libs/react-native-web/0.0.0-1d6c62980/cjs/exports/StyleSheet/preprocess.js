"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.preprocess = exports.default = exports.createTextShadowValue = exports.createBoxShadowValue = void 0;

var _normalizeColor = _interopRequireDefault(require("./compiler/normalizeColor"));

var _normalizeValueWithProperty = _interopRequireDefault(require("./compiler/normalizeValueWithProperty"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const emptyObject = {};
/**
 * Shadows
 */

const defaultOffset = {
  height: 0,
  width: 0
};

const createBoxShadowValue = style => {
  const shadowColor = style.shadowColor,
        shadowOffset = style.shadowOffset,
        shadowOpacity = style.shadowOpacity,
        shadowRadius = style.shadowRadius;

  const _ref = shadowOffset || defaultOffset,
        height = _ref.height,
        width = _ref.width;

  const offsetX = (0, _normalizeValueWithProperty.default)(width);
  const offsetY = (0, _normalizeValueWithProperty.default)(height);
  const blurRadius = (0, _normalizeValueWithProperty.default)(shadowRadius || 0);
  const color = (0, _normalizeColor.default)(shadowColor || 'black', shadowOpacity);

  if (color != null && offsetX != null && offsetY != null && blurRadius != null) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};

exports.createBoxShadowValue = createBoxShadowValue;

const createTextShadowValue = style => {
  const textShadowColor = style.textShadowColor,
        textShadowOffset = style.textShadowOffset,
        textShadowRadius = style.textShadowRadius;

  const _ref2 = textShadowOffset || defaultOffset,
        height = _ref2.height,
        width = _ref2.width;

  const radius = textShadowRadius || 0;
  const offsetX = (0, _normalizeValueWithProperty.default)(width);
  const offsetY = (0, _normalizeValueWithProperty.default)(height);
  const blurRadius = (0, _normalizeValueWithProperty.default)(radius);
  const color = (0, _normalizeValueWithProperty.default)(textShadowColor, 'textShadowColor');

  if (color && (height !== 0 || width !== 0 || radius !== 0) && offsetX != null && offsetY != null && blurRadius != null) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};
/**
 * Preprocess styles
 */


exports.createTextShadowValue = createTextShadowValue;

const preprocess = originalStyle => {
  const style = originalStyle || emptyObject;
  const nextStyle = {};

  for (const originalProp in style) {
    const originalValue = style[originalProp];
    let prop = originalProp;
    let value = originalValue;

    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      continue;
    } // Convert shadow styles


    if (prop === 'shadowColor' || prop === 'shadowOffset' || prop === 'shadowOpacity' || prop === 'shadowRadius') {
      const boxShadowValue = createBoxShadowValue(style);

      if (boxShadowValue != null && nextStyle.boxShadow == null) {
        const boxShadow = style.boxShadow;
        prop = 'boxShadow';
        value = boxShadow ? boxShadow + ", " + boxShadowValue : boxShadowValue;
      } else {
        continue;
      }
    } // Convert text shadow styles


    if (prop === 'textShadowColor' || prop === 'textShadowOffset' || prop === 'textShadowRadius') {
      const textShadowValue = createTextShadowValue(style);

      if (textShadowValue != null && nextStyle.textShadow == null) {
        const textShadow = style.textShadow;
        prop = 'textShadow';
        value = textShadow ? textShadow + ", " + textShadowValue : textShadowValue;
      } else {
        continue;
      }
    }

    nextStyle[prop] = value;
  } // $FlowIgnore


  return nextStyle;
};

exports.preprocess = preprocess;
var _default = preprocess;
exports.default = _default;