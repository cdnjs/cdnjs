"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _normalizeColors = _interopRequireDefault(require("@react-native/normalize-colors"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var processColor = color => {
  if (color === undefined || color === null) {
    return color;
  }

  // convert number and hex
  var int32Color = (0, _normalizeColors.default)(color);
  if (int32Color === undefined || int32Color === null) {
    return undefined;
  }
  int32Color = (int32Color << 24 | int32Color >>> 8) >>> 0;
  return int32Color;
};
var _default = exports.default = processColor;
module.exports = exports.default;