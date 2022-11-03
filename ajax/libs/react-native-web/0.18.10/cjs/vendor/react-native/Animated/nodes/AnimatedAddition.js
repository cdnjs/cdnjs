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

class AnimatedAddition extends _AnimatedWithChildren.default {
  constructor(a, b) {
    super();
    this._a = typeof a === 'number' ? new _AnimatedValue.default(a) : a;
    this._b = typeof b === 'number' ? new _AnimatedValue.default(b) : b;
  }

  __makeNative() {
    this._a.__makeNative();

    this._b.__makeNative();

    super.__makeNative();
  }

  __getValue() {
    return this._a.__getValue() + this._b.__getValue();
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
      type: 'addition',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  }

}

var _default = AnimatedAddition;
exports.default = _default;
module.exports = exports.default;