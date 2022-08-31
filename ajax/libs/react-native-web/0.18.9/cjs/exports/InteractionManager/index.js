"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _requestIdleCallback = _interopRequireWildcard(require("../../modules/requestIdleCallback"));

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var InteractionManager = {
  Events: {
    interactionStart: 'interactionStart',
    interactionComplete: 'interactionComplete'
  },

  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(task) {
    var handle;
    var promise = new Promise(resolve => {
      handle = (0, _requestIdleCallback.default)(() => {
        if (task) {
          resolve(task());
        } else {
          resolve();
        }
      });
    });
    return {
      then: promise.then.bind(promise),
      done: promise.then.bind(promise),
      cancel: () => {
        (0, _requestIdleCallback.cancelIdleCallback)(handle);
      }
    };
  },

  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle() {
    return 1;
  },

  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle(handle) {
    (0, _invariant.default)(!!handle, 'Must provide a handle to clear.');
  },

  addListener: () => {}
};
var _default = InteractionManager;
exports.default = _default;
module.exports = exports.default;