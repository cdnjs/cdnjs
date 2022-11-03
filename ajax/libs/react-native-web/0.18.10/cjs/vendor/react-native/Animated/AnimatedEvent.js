/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.AnimatedEvent = void 0;
exports.attachNativeEvent = attachNativeEvent;

var _AnimatedValue = _interopRequireDefault(require("./nodes/AnimatedValue"));

var _NativeAnimatedHelper = _interopRequireWildcard(require("./NativeAnimatedHelper"));

var _findNodeHandle = _interopRequireDefault(require("../../../exports/findNodeHandle"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var __DEV__ = process.env.NODE_ENV !== 'production';

function attachNativeEvent(viewRef, eventName, argMapping) {
  // Find animated values in `argMapping` and create an array representing their
  // key path inside the `nativeEvent` object. Ex.: ['contentOffset', 'x'].
  var eventMappings = [];

  var traverse = (value, path) => {
    if (value instanceof _AnimatedValue.default) {
      value.__makeNative();

      eventMappings.push({
        nativeEventPath: path,
        animatedValueTag: value.__getNativeTag()
      });
    } else if (typeof value === 'object') {
      for (var _key in value) {
        traverse(value[_key], path.concat(_key));
      }
    }
  };

  (0, _invariant.default)(argMapping[0] && argMapping[0].nativeEvent, 'Native driven events only support animated values contained inside `nativeEvent`.'); // Assume that the event containing `nativeEvent` is always the first argument.

  traverse(argMapping[0].nativeEvent, []);
  var viewTag = (0, _findNodeHandle.default)(viewRef);

  if (viewTag != null) {
    eventMappings.forEach(mapping => {
      _NativeAnimatedHelper.default.API.addAnimatedEventToView(viewTag, eventName, mapping);
    });
  }

  return {
    detach() {
      if (viewTag != null) {
        eventMappings.forEach(mapping => {
          _NativeAnimatedHelper.default.API.removeAnimatedEventFromView(viewTag, eventName, // $FlowFixMe[incompatible-call]
          mapping.animatedValueTag);
        });
      }
    }

  };
}

function validateMapping(argMapping, args) {
  var validate = (recMapping, recEvt, key) => {
    if (recMapping instanceof _AnimatedValue.default) {
      (0, _invariant.default)(typeof recEvt === 'number', 'Bad mapping of event key ' + key + ', should be number but got ' + typeof recEvt);
      return;
    }

    if (typeof recEvt === 'number') {
      (0, _invariant.default)(recMapping instanceof _AnimatedValue.default, 'Bad mapping of type ' + typeof recMapping + ' for key ' + key + ', event value must map to AnimatedValue');
      return;
    }

    (0, _invariant.default)(typeof recMapping === 'object', 'Bad mapping of type ' + typeof recMapping + ' for key ' + key);
    (0, _invariant.default)(typeof recEvt === 'object', 'Bad event of type ' + typeof recEvt + ' for key ' + key);

    for (var mappingKey in recMapping) {
      validate(recMapping[mappingKey], recEvt[mappingKey], mappingKey);
    }
  };

  (0, _invariant.default)(args.length >= argMapping.length, 'Event has less arguments than mapping');
  argMapping.forEach((mapping, idx) => {
    validate(mapping, args[idx], 'arg' + idx);
  });
}

class AnimatedEvent {
  constructor(argMapping, config) {
    this._listeners = [];
    this._argMapping = argMapping;

    if (config == null) {
      console.warn('Animated.event now requires a second argument for options');
      config = {
        useNativeDriver: false
      };
    }

    if (config.listener) {
      this.__addListener(config.listener);
    }

    this._callListeners = this._callListeners.bind(this);
    this._attachedEvent = null;
    this.__isNative = (0, _NativeAnimatedHelper.shouldUseNativeDriver)(config);
  }

  __addListener(callback) {
    this._listeners.push(callback);
  }

  __removeListener(callback) {
    this._listeners = this._listeners.filter(listener => listener !== callback);
  }

  __attach(viewRef, eventName) {
    (0, _invariant.default)(this.__isNative, 'Only native driven events need to be attached.');
    this._attachedEvent = attachNativeEvent(viewRef, eventName, this._argMapping);
  }

  __detach(viewTag, eventName) {
    (0, _invariant.default)(this.__isNative, 'Only native driven events need to be detached.');
    this._attachedEvent && this._attachedEvent.detach();
  }

  __getHandler() {
    var _this = this;

    if (this.__isNative) {
      if (__DEV__) {
        var _validatedMapping = false;
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
          }

          if (!_validatedMapping) {
            validateMapping(_this._argMapping, args);
            _validatedMapping = true;
          }

          _this._callListeners(...args);
        };
      } else {
        return this._callListeners;
      }
    }

    var validatedMapping = false;
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (__DEV__ && !validatedMapping) {
        validateMapping(_this._argMapping, args);
        validatedMapping = true;
      }

      var traverse = (recMapping, recEvt, key) => {
        if (recMapping instanceof _AnimatedValue.default) {
          if (typeof recEvt === 'number') {
            recMapping.setValue(recEvt);
          }
        } else if (typeof recMapping === 'object') {
          for (var mappingKey in recMapping) {
            /* $FlowFixMe(>=0.120.0) This comment suppresses an error found
             * when Flow v0.120 was deployed. To see the error, delete this
             * comment and run Flow. */
            traverse(recMapping[mappingKey], recEvt[mappingKey], mappingKey);
          }
        }
      };

      _this._argMapping.forEach((mapping, idx) => {
        traverse(mapping, args[idx], 'arg' + idx);
      });

      _this._callListeners(...args);
    };
  }

  _callListeners() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
      args[_key4] = arguments[_key4];
    }

    this._listeners.forEach(listener => listener(...args));
  }

}

exports.AnimatedEvent = AnimatedEvent;