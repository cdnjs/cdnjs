"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = exports.cancelIdleCallback = void 0;

var _ExecutionEnvironment = _interopRequireDefault(require("fbjs/lib/ExecutionEnvironment"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const canUseDOM = _ExecutionEnvironment.default.canUseDOM;

const _requestIdleCallback = function _requestIdleCallback(cb, options) {
  return setTimeout(() => {
    const start = Date.now();
    cb({
      didTimeout: false,

      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }

    });
  }, 1);
};

const _cancelIdleCallback = function _cancelIdleCallback(id) {
  clearTimeout(id);
};

const isSupported = canUseDOM && typeof window.requestIdleCallback !== 'undefined';
const requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
const cancelIdleCallback = isSupported ? window.cancelIdleCallback : _cancelIdleCallback;
exports.cancelIdleCallback = cancelIdleCallback;
var _default = requestIdleCallback;
exports.default = _default;