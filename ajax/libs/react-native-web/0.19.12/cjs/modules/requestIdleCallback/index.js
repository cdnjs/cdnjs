"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = exports.cancelIdleCallback = void 0;
var _canUseDom = _interopRequireDefault(require("../canUseDom"));
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var _requestIdleCallback = function _requestIdleCallback(cb, options) {
  return setTimeout(() => {
    var start = Date.now();
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};
var _cancelIdleCallback = function _cancelIdleCallback(id) {
  clearTimeout(id);
};
var isSupported = _canUseDom.default && typeof window.requestIdleCallback !== 'undefined';
var requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
var cancelIdleCallback = isSupported ? window.cancelIdleCallback : _cancelIdleCallback;
exports.cancelIdleCallback = cancelIdleCallback;
var _default = requestIdleCallback;
exports.default = _default;