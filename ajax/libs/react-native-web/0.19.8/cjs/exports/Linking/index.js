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

var initialURL = _canUseDom.default ? window.location.href : '';
class Linking {
  constructor() {
    this._eventCallbacks = {};
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
  addEventListener(eventType, callback) {
    var _this = this;
    if (!_this._eventCallbacks[eventType]) {
      _this._eventCallbacks[eventType] = [callback];
    }
    _this._eventCallbacks[eventType].push(callback);
    return {
      remove() {
        var callbacks = _this._eventCallbacks[eventType];
        var filteredCallbacks = callbacks.filter(c => c.toString() !== callback.toString());
        _this._eventCallbacks[eventType] = filteredCallbacks;
      }
    };
  }

  /**
   * Removes a previously added event listener for the specified event. The callback must
   * be the same object as the one passed to `addEventListener`.
   */
  removeEventListener(eventType, callback) {
    console.error("Linking.removeEventListener('" + eventType + "', ...): Method has been " + 'deprecated. Please instead use `remove()` on the subscription ' + 'returned by `Linking.addEventListener`.');
    var callbacks = this._eventCallbacks[eventType];
    var filteredCallbacks = callbacks.filter(c => c.toString() !== callback.toString());
    this._eventCallbacks[eventType] = filteredCallbacks;
  }
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
    (0, _invariant.default)(typeof url === 'string', 'Invalid URL: should be a string. Was: ' + url);
    (0, _invariant.default)(url, 'Invalid URL: cannot be empty');
  }
}
var open = (url, target) => {
  if (_canUseDom.default) {
    var urlToOpen = new URL(url, window.location).toString();
    if (urlToOpen.indexOf('tel:') === 0) {
      window.location = urlToOpen;
    } else {
      window.open(urlToOpen, target, 'noopener');
    }
  }
};
var _default = new Linking();
exports.default = _default;
module.exports = exports.default;