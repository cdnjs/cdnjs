/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import EventEmitter from '../emitter/EventEmitter';
import EventSubscriptionVendor from '../emitter/EventSubscriptionVendor';

var __DEV__ = process.env.NODE_ENV !== 'production';

function checkNativeEventModule(eventType) {
  if (eventType) {
    if (eventType.lastIndexOf('statusBar', 0) === 0) {
      throw new Error('`' + eventType + '` event should be registered via the StatusBarIOS module');
    }

    if (eventType.lastIndexOf('keyboard', 0) === 0) {
      throw new Error('`' + eventType + '` event should be registered via the Keyboard module');
    }

    if (eventType === 'appStateDidChange' || eventType === 'memoryWarning') {
      throw new Error('`' + eventType + '` event should be registered via the AppState module');
    }
  }
}
/**
 * Deprecated - subclass NativeEventEmitter to create granular event modules instead of
 * adding all event listeners directly to RCTDeviceEventEmitter.
 */


var RCTDeviceEventEmitter = /*#__PURE__*/function (_EventEmitter) {
  _inheritsLoose(RCTDeviceEventEmitter, _EventEmitter);

  function RCTDeviceEventEmitter() {
    var _this;

    var sharedSubscriber = new EventSubscriptionVendor();
    _this = _EventEmitter.call(this, sharedSubscriber) || this;
    _this.sharedSubscriber = sharedSubscriber;
    return _this;
  }

  var _proto = RCTDeviceEventEmitter.prototype;

  _proto.addListener = function addListener(eventType, listener, context) {
    if (__DEV__) {
      checkNativeEventModule(eventType);
    }

    return _EventEmitter.prototype.addListener.call(this, eventType, listener, context);
  };

  _proto.removeAllListeners = function removeAllListeners(eventType) {
    if (__DEV__) {
      checkNativeEventModule(eventType);
    }

    _EventEmitter.prototype.removeAllListeners.call(this, eventType);
  };

  _proto.removeSubscription = function removeSubscription(subscription) {
    if (subscription.emitter !== this) {
      subscription.emitter.removeSubscription(subscription);
    } else {
      _EventEmitter.prototype.removeSubscription.call(this, subscription);
    }
  };

  return RCTDeviceEventEmitter;
}(EventEmitter);

export default new RCTDeviceEventEmitter();