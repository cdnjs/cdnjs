"use strict";

exports.__esModule = true;
exports.default = void 0;
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function emptyFunction() {}
var BackHandler = {
  exitApp: emptyFunction,
  addEventListener() {
    console.error('BackHandler is not supported on web and should not be used.');
    return {
      remove: emptyFunction
    };
  },
  removeEventListener: emptyFunction
};
var _default = exports.default = BackHandler;
module.exports = exports.default;