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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _AnimatedEvent = require("./AnimatedEvent");

var _AnimatedImplementation = _interopRequireDefault(require("./AnimatedImplementation"));

var _AnimatedInterpolation = _interopRequireDefault(require("./nodes/AnimatedInterpolation"));

var _AnimatedNode = _interopRequireDefault(require("./nodes/AnimatedNode"));

var _AnimatedProps = _interopRequireDefault(require("./nodes/AnimatedProps"));

var _AnimatedValue = _interopRequireDefault(require("./nodes/AnimatedValue"));

var _AnimatedValueXY = _interopRequireDefault(require("./nodes/AnimatedValueXY"));

var _createAnimatedComponent = _interopRequireDefault(require("./createAnimatedComponent"));

var emptyAnimation = {
  start: () => {},
  stop: () => {},
  reset: () => {},
  _startNativeLoop: () => {},
  _isUsingNativeDriver: () => {
    return false;
  }
};

var spring = function spring(value, config) {
  var anyValue = value;
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, emptyAnimation), {}, {
    start: callback => {
      anyValue.setValue(config.toValue);
      callback && callback({
        finished: true
      });
    }
  });
};

var timing = function timing(value, config) {
  var anyValue = value;
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, emptyAnimation), {}, {
    start: callback => {
      anyValue.setValue(config.toValue);
      callback && callback({
        finished: true
      });
    }
  });
};

var decay = function decay(value, config) {
  return emptyAnimation;
};

var sequence = function sequence(animations) {
  return emptyAnimation;
};

var parallel = function parallel(animations, config) {
  return emptyAnimation;
};

var delay = function delay(time) {
  return emptyAnimation;
};

var stagger = function stagger(time, animations) {
  return emptyAnimation;
};

var loop = function loop(animation, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$iterations = _ref.iterations,
      iterations = _ref$iterations === void 0 ? -1 : _ref$iterations;

  return emptyAnimation;
};

var event = function event(argMapping, config) {
  return null;
};

var _default = {
  Value: _AnimatedValue.default,
  ValueXY: _AnimatedValueXY.default,
  Interpolation: _AnimatedInterpolation.default,
  Node: _AnimatedNode.default,
  decay,
  timing,
  spring,
  add: _AnimatedImplementation.default.add,
  subtract: _AnimatedImplementation.default.subtract,
  divide: _AnimatedImplementation.default.divide,
  multiply: _AnimatedImplementation.default.multiply,
  modulo: _AnimatedImplementation.default.modulo,
  diffClamp: _AnimatedImplementation.default.diffClamp,
  delay,
  sequence,
  parallel,
  stagger,
  loop,
  event,
  createAnimatedComponent: _createAnimatedComponent.default,
  attachNativeEvent: _AnimatedEvent.attachNativeEvent,
  forkEvent: _AnimatedImplementation.default.forkEvent,
  unforkEvent: _AnimatedImplementation.default.unforkEvent,
  Event: _AnimatedEvent.AnimatedEvent,
  __PropsOnlyForTests: _AnimatedProps.default
};
exports.default = _default;
module.exports = exports.default;