"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _isWebColor = _interopRequireDefault(require("../isWebColor"));

var _processColor = _interopRequireDefault(require("../../exports/processColor"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const normalizeColor = function normalizeColor(color, opacity) {
  if (opacity === void 0) {
    opacity = 1;
  }

  if (color == null) return;

  if (typeof color === 'string' && (0, _isWebColor.default)(color)) {
    return color;
  }

  const colorInt = (0, _processColor.default)(color);

  if (colorInt != null) {
    const r = colorInt >> 16 & 255;
    const g = colorInt >> 8 & 255;
    const b = colorInt & 255;
    const a = (colorInt >> 24 & 255) / 255;
    const alpha = (a * opacity).toFixed(2);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }
};

var _default = normalizeColor;
exports.default = _default;
module.exports = exports.default;