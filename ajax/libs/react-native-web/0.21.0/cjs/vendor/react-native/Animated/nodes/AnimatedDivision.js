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
var _AnimatedInterpolation = _interopRequireDefault(require("./AnimatedInterpolation"));
var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));
var _AnimatedValue = _interopRequireDefault(require("./AnimatedValue"));
var _AnimatedWithChildren = _interopRequireDefault(require("./AnimatedWithChildren"));
class AnimatedDivision extends _AnimatedWithChildren.default {
  constructor(a, b) {
    super();
    this._warnedAboutDivideByZero = false;
    if (b === 0 || b instanceof _AnimatedNode.default && b.__getValue() === 0) {
      console.error('Detected potential division by zero in AnimatedDivision');
    }
    this._a = typeof a === 'number' ? new _AnimatedValue.default(a) : a;
    this._b = typeof b === 'number' ? new _AnimatedValue.default(b) : b;
  }
  __makeNative(platformConfig) {
    this._a.__makeNative(platformConfig);
    this._b.__makeNative(platformConfig);
    super.__makeNative(platformConfig);
  }
  __getValue() {
    var a = this._a.__getValue();
    var b = this._b.__getValue();
    if (b === 0) {
      // Prevent spamming the console/LogBox
      if (!this._warnedAboutDivideByZero) {
        console.error('Detected division by zero in AnimatedDivision');
        this._warnedAboutDivideByZero = true;
      }
      // Passing infinity/NaN to Fabric will cause a native crash
      return 0;
    }
    this._warnedAboutDivideByZero = false;
    return a / b;
  }
  interpolate(config) {
    return new _AnimatedInterpolation.default(this, config);
  }
  __attach() {
    this._a.__addChild(this);
    this._b.__addChild(this);
  }
  __detach() {
    this._a.__removeChild(this);
    this._b.__removeChild(this);
    super.__detach();
  }
  __getNativeConfig() {
    return {
      type: 'division',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  }
}
var _default = exports.default = AnimatedDivision;
module.exports = exports.default;