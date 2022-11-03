"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _canUseDom = _interopRequireDefault(require("../../modules/canUseDom"));

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
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
  var docEl = win.document.documentElement;
  dimensions.window = {
    fontScale: 1,
    height: docEl.clientHeight,
    scale: win.devicePixelRatio || 1,
    width: docEl.clientWidth
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
  window.addEventListener('resize', handleResize, false);
}

module.exports = exports.default;