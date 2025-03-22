"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = usePlatformMethods;
var _UIManager = _interopRequireDefault(require("../../exports/UIManager"));
var _useStable = _interopRequireDefault(require("../useStable"));
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */
function usePlatformMethods(_ref) {
  var pointerEvents = _ref.pointerEvents,
    style = _ref.style;
  // Avoid creating a new ref on every render.
  var ref = (0, _useStable.default)(() => hostNode => {
    if (hostNode != null) {
      hostNode.measure = callback => _UIManager.default.measure(hostNode, callback);
      hostNode.measureLayout = (relativeToNode, success, failure) => _UIManager.default.measureLayout(hostNode, relativeToNode, failure, success);
      hostNode.measureInWindow = callback => _UIManager.default.measureInWindow(hostNode, callback);
    }
  });
  return ref;
}
module.exports = exports.default;