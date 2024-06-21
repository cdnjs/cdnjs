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
var _AnimatedValue = _interopRequireDefault(require("./nodes/AnimatedValue"));
var _AnimatedValueXY = _interopRequireDefault(require("./nodes/AnimatedValueXY"));
var _createAnimatedComponent = _interopRequireDefault(require("./createAnimatedComponent"));
var _AnimatedColor = _interopRequireDefault(require("./nodes/AnimatedColor"));
/**
 * Animations are a source of flakiness in snapshot testing. This mock replaces
 * animation functions from AnimatedImplementation with empty animations for
 * predictability in tests. When possible the animation will run immediately
 * to the final state.
 */

// Prevent any callback invocation from recursively triggering another
// callback, which may trigger another animation
var inAnimationCallback = false;
function mockAnimationStart(start) {
  return callback => {
    var guardedCallback = callback == null ? callback : function () {
      if (inAnimationCallback) {
        console.warn('Ignoring recursive animation callback when running mock animations');
        return;
      }
      inAnimationCallback = true;
      try {
        callback(...arguments);
      } finally {
        inAnimationCallback = false;
      }
    };
    start(guardedCallback);
  };
}
var emptyAnimation = {
  start: () => {},
  stop: () => {},
  reset: () => {},
  _startNativeLoop: () => {},
  _isUsingNativeDriver: () => {
    return false;
  }
};
var mockCompositeAnimation = animations => (0, _objectSpread2.default)((0, _objectSpread2.default)({}, emptyAnimation), {}, {
  start: mockAnimationStart(callback => {
    animations.forEach(animation => animation.start());
    callback == null ? void 0 : callback({
      finished: true
    });
  })
});
var spring = function spring(value, config) {
  var anyValue = value;
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, emptyAnimation), {}, {
    start: mockAnimationStart(callback => {
      anyValue.setValue(config.toValue);
      callback == null ? void 0 : callback({
        finished: true
      });
    })
  });
};
var timing = function timing(value, config) {
  var anyValue = value;
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, emptyAnimation), {}, {
    start: mockAnimationStart(callback => {
      anyValue.setValue(config.toValue);
      callback == null ? void 0 : callback({
        finished: true
      });
    })
  });
};
var decay = function decay(value, config) {
  return emptyAnimation;
};
var sequence = function sequence(animations) {
  return mockCompositeAnimation(animations);
};
var parallel = function parallel(animations, config) {
  return mockCompositeAnimation(animations);
};
var delay = function delay(time) {
  return emptyAnimation;
};
var stagger = function stagger(time, animations) {
  return mockCompositeAnimation(animations);
};
var loop = function loop(animation, // $FlowFixMe[prop-missing]
_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$iterations = _ref.iterations,
    iterations = _ref$iterations === void 0 ? -1 : _ref$iterations;
  return emptyAnimation;
};
var _default = {
  Value: _AnimatedValue.default,
  ValueXY: _AnimatedValueXY.default,
  Color: _AnimatedColor.default,
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
  event: _AnimatedImplementation.default.event,
  createAnimatedComponent: _createAnimatedComponent.default,
  attachNativeEvent: _AnimatedEvent.attachNativeEvent,
  forkEvent: _AnimatedImplementation.default.forkEvent,
  unforkEvent: _AnimatedImplementation.default.unforkEvent,
  Event: _AnimatedEvent.AnimatedEvent
};
exports.default = _default;
module.exports = exports.default;