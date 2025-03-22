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

var vibrate = pattern => {
  if ('vibrate' in window.navigator) {
    window.navigator.vibrate(pattern);
  }
};
var Vibration = {
  cancel() {
    vibrate(0);
  },
  vibrate(pattern) {
    if (pattern === void 0) {
      pattern = 400;
    }
    vibrate(pattern);
  }
};
var _default = exports.default = Vibration;
module.exports = exports.default;