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
import canUseDOM from '../../modules/canUseDom';
var initialURL = canUseDOM ? window.location.href : '';

class Linking {
  constructor() {
    this._eventCallbacks = {};

    this.addEventListener = (event, callback) => {
      if (!this._eventCallbacks[event]) {
        this._eventCallbacks[event] = [callback];
        return;
      }

      this._eventCallbacks[event].push(callback);
    };

    this.removeEventListener = (event, callback) => {
      var callbacks = this._eventCallbacks[event];
      var filteredCallbacks = callbacks.filter(c => c.toString() !== callback.toString());
      this._eventCallbacks[event] = filteredCallbacks;
    };
  }

  _dispatchEvent(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    var listeners = this._eventCallbacks[event];

    if (listeners != null && Array.isArray(listeners)) {
      listeners.map(listener => {
        listener(...data);
      });
    }
  }
  /**
   * Adds a event listener for the specified event. The callback will be called when the
   * said event is dispatched.
   */


  canOpenURL() {
    return Promise.resolve(true);
  }

  getInitialURL() {
    return Promise.resolve(initialURL);
  }
  /**
   * Try to open the given url in a secure fashion. The method returns a Promise object.
   * If a target is passed (including undefined) that target will be used, otherwise '_blank'.
   * If the url opens, the promise is resolved. If not, the promise is rejected.
   * Dispatches the `onOpen` event if `url` is opened successfully.
   */


  openURL(url, target) {
    if (arguments.length === 1) {
      target = '_blank';
    }

    try {
      open(url, target);

      this._dispatchEvent('onOpen', url);

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  _validateURL(url) {
    invariant(typeof url === 'string', 'Invalid URL: should be a string. Was: ' + url);
    invariant(url, 'Invalid URL: cannot be empty');
  }

}

var open = (url, target) => {
  if (canUseDOM) {
    var urlToOpen = new URL(url, window.location).toString();

    if (urlToOpen.indexOf('tel:') === 0) {
      window.location = urlToOpen;
    } else {
      window.open(urlToOpen, target, 'noopener');
    }
  }
};

export default new Linking();