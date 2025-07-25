"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _TextInputState = _interopRequireDefault(require("../TextInputState"));
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var dismissKeyboard = () => {
  _TextInputState.default.blurTextInput(_TextInputState.default.currentlyFocusedField());
};
var _default = exports.default = dismissKeyboard;
module.exports = exports.default;