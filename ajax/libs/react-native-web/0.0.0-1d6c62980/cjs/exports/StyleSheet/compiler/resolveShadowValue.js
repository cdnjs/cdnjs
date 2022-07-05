"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _normalizeColor = _interopRequireDefault(require("./normalizeColor"));

var _normalizeValueWithProperty = _interopRequireDefault(require("./normalizeValueWithProperty"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const defaultOffset = {
  height: 0,
  width: 0
};

const resolveShadowValue = style => {
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

var _default = resolveShadowValue;
exports.default = _default;
module.exports = exports.default;