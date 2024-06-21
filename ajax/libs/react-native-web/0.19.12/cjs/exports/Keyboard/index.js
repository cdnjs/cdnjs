"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _dismissKeyboard = _interopRequireDefault(require("../../modules/dismissKeyboard"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

// in the future we can use https://github.com/w3c/virtual-keyboard
var Keyboard = {
  isVisible() {
    return false;
  },
  addListener() {
    return {
      remove: () => {}
    };
  },
  dismiss() {
    (0, _dismissKeyboard.default)();
  },
  removeAllListeners() {},
  removeListener() {}
};
var _default = Keyboard;
exports.default = _default;
module.exports = exports.default;