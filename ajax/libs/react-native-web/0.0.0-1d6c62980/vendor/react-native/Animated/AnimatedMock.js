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

import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import { AnimatedEvent, attachNativeEvent } from './AnimatedEvent';
import AnimatedImplementation from './AnimatedImplementation';
import AnimatedInterpolation from './nodes/AnimatedInterpolation';
import AnimatedNode from './nodes/AnimatedNode';
import AnimatedProps from './nodes/AnimatedProps';
import AnimatedValue from './nodes/AnimatedValue';
import AnimatedValueXY from './nodes/AnimatedValueXY';
import createAnimatedComponent from './createAnimatedComponent';
const emptyAnimation = {
  start: () => {},
  stop: () => {},
  reset: () => {},
  _startNativeLoop: () => {},
  _isUsingNativeDriver: () => {
    return false;
  }
};

const spring = function spring(value, config) {
  const anyValue = value;
  return _objectSpread(_objectSpread({}, emptyAnimation), {}, {
    start: callback => {
      anyValue.setValue(config.toValue);
      callback && callback({
        finished: true
      });
    }
  });
};

const timing = function timing(value, config) {
  const anyValue = value;
  return _objectSpread(_objectSpread({}, emptyAnimation), {}, {
    start: callback => {
      anyValue.setValue(config.toValue);
      callback && callback({
        finished: true
      });
    }
  });
};

const decay = function decay(value, config) {
  return emptyAnimation;
};

const sequence = function sequence(animations) {
  return emptyAnimation;
};

const parallel = function parallel(animations, config) {
  return emptyAnimation;
};

const delay = function delay(time) {
  return emptyAnimation;
};

const stagger = function stagger(time, animations) {
  return emptyAnimation;
};

const loop = function loop(animation, _temp) {
  let _ref = _temp === void 0 ? {} : _temp,
      _ref$iterations = _ref.iterations,
      iterations = _ref$iterations === void 0 ? -1 : _ref$iterations;

  return emptyAnimation;
};

const event = function event(argMapping, config) {
  return null;
};

export default {
  Value: AnimatedValue,
  ValueXY: AnimatedValueXY,
  Interpolation: AnimatedInterpolation,
  Node: AnimatedNode,
  decay,
  timing,
  spring,
  add: AnimatedImplementation.add,
  subtract: AnimatedImplementation.subtract,
  divide: AnimatedImplementation.divide,
  multiply: AnimatedImplementation.multiply,
  modulo: AnimatedImplementation.modulo,
  diffClamp: AnimatedImplementation.diffClamp,
  delay,
  sequence,
  parallel,
  stagger,
  loop,
  event,
  createAnimatedComponent,
  attachNativeEvent,
  forkEvent: AnimatedImplementation.forkEvent,
  unforkEvent: AnimatedImplementation.unforkEvent,
  Event: AnimatedEvent,
  __PropsOnlyForTests: AnimatedProps
};