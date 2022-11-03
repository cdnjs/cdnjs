"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _EventEmitter = _interopRequireDefault(require("../../vendor/react-native/emitter/_EventEmitter"));

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
// Android 4.4 browser
var isPrefixed = _canUseDom.default && !document.hasOwnProperty('hidden') && document.hasOwnProperty('webkitHidden');
var EVENT_TYPES = ['change', 'memoryWarning'];
var VISIBILITY_CHANGE_EVENT = isPrefixed ? 'webkitvisibilitychange' : 'visibilitychange';
var VISIBILITY_STATE_PROPERTY = isPrefixed ? 'webkitVisibilityState' : 'visibilityState';
var AppStates = {
  BACKGROUND: 'background',
  ACTIVE: 'active'
};
var changeEmitter = null;

class AppState {
  static get currentState() {
    if (!AppState.isAvailable) {
      return AppStates.ACTIVE;
    }

    switch (document[VISIBILITY_STATE_PROPERTY]) {
      case 'hidden':
      case 'prerender':
      case 'unloaded':
        return AppStates.BACKGROUND;

      default:
        return AppStates.ACTIVE;
    }
  }

  static addEventListener(type, handler) {
    if (AppState.isAvailable) {
      (0, _invariant.default)(EVENT_TYPES.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);

      if (type === 'change') {
        if (!changeEmitter) {
          changeEmitter = new _EventEmitter.default();
          document.addEventListener(VISIBILITY_CHANGE_EVENT, () => {
            if (changeEmitter) {
              changeEmitter.emit('change', AppState.currentState);
            }
          }, false);
        }

        return changeEmitter.addListener(type, handler);
      }
    }
  }

  static removeEventListener(type, handler) {
    if (AppState.isAvailable) {
      console.error("AppState.removeListener('" + type + "', ...): Method has been " + 'deprecated. Please instead use `remove()` on the subscription ' + 'returned by `AppState.addEventListener`.');
      (0, _invariant.default)(EVENT_TYPES.indexOf(type) !== -1, 'Trying to remove listener for unknown event: "%s"', type);

      if (type === 'change' && changeEmitter) {
        changeEmitter.removeListener(handler);
      }
    }
  }

}

exports.default = AppState;
AppState.isAvailable = _canUseDom.default && document[VISIBILITY_STATE_PROPERTY];
module.exports = exports.default;