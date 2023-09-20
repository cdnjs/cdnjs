/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import invariant from 'fbjs/lib/invariant';
import EventEmitter from '../../vendor/react-native/vendor/emitter/EventEmitter';
import canUseDOM from '../../modules/canUseDom';

// Android 4.4 browser
var isPrefixed = canUseDOM && !document.hasOwnProperty('hidden') && document.hasOwnProperty('webkitHidden');
var EVENT_TYPES = ['change', 'memoryWarning'];
var VISIBILITY_CHANGE_EVENT = isPrefixed ? 'webkitvisibilitychange' : 'visibilitychange';
var VISIBILITY_STATE_PROPERTY = isPrefixed ? 'webkitVisibilityState' : 'visibilityState';
var AppStates = {
  BACKGROUND: 'background',
  ACTIVE: 'active'
};
var changeEmitter = null;
export default class AppState {
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
      invariant(EVENT_TYPES.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
      if (type === 'change') {
        if (!changeEmitter) {
          changeEmitter = new EventEmitter();
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
}
AppState.isAvailable = canUseDOM && document[VISIBILITY_STATE_PROPERTY];