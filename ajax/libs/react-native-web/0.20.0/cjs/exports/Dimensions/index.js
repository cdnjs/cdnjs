"use strict";
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var _canUseDom = _interopRequireDefault(require("../../modules/canUseDom"));
var dimensions = {
  window: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  },
  screen: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  }
};
var listeners = {};
var shouldInit = _canUseDom.default;
function update() {
  if (!_canUseDom.default) {
    return;
  }
  var win = window;
  var height;
  var width;

  /**
   * iOS does not update viewport dimensions on keyboard open/close.
   * window.visualViewport(https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)
   * is used instead of document.documentElement.clientHeight (which remains as a fallback)
   */
  if (win.visualViewport) {
    var visualViewport = win.visualViewport;
    /**
     * We are multiplying by scale because height and width from visual viewport
     * also react to pinch zoom, and become smaller when zoomed. But it is not desired
     * behaviour, since originally documentElement client height and width were used,
     * and they do not react to pinch zoom.
     */
    height = Math.round(visualViewport.height * visualViewport.scale);
    width = Math.round(visualViewport.width * visualViewport.scale);
  } else {
    var docEl = win.document.documentElement;
    height = docEl.clientHeight;
    width = docEl.clientWidth;
  }
  dimensions.window = {
    fontScale: 1,
    height,
    scale: win.devicePixelRatio || 1,
    width
  };
  dimensions.screen = {
    fontScale: 1,
    height: win.screen.height,
    scale: win.devicePixelRatio || 1,
    width: win.screen.width
  };
}
function handleResize() {
  update();
  if (Array.isArray(listeners['change'])) {
    listeners['change'].forEach(handler => handler(dimensions));
  }
}
class Dimensions {
  static get(dimension) {
    if (shouldInit) {
      shouldInit = false;
      update();
    }
    (0, _invariant.default)(dimensions[dimension], "No dimension set for key " + dimension);
    return dimensions[dimension];
  }
  static set(initialDimensions) {
    if (initialDimensions) {
      if (_canUseDom.default) {
        (0, _invariant.default)(false, 'Dimensions cannot be set in the browser');
      } else {
        if (initialDimensions.screen != null) {
          dimensions.screen = initialDimensions.screen;
        }
        if (initialDimensions.window != null) {
          dimensions.window = initialDimensions.window;
        }
      }
    }
  }
  static addEventListener(type, handler) {
    listeners[type] = listeners[type] || [];
    listeners[type].push(handler);
    return {
      remove: () => {
        this.removeEventListener(type, handler);
      }
    };
  }
  static removeEventListener(type, handler) {
    if (Array.isArray(listeners[type])) {
      listeners[type] = listeners[type].filter(_handler => _handler !== handler);
    }
  }
}
exports.default = Dimensions;
if (_canUseDom.default) {
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize, false);
  } else {
    window.addEventListener('resize', handleResize, false);
  }
}
module.exports = exports.default;