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

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _AnimatedInterpolation = _interopRequireDefault(require("./AnimatedInterpolation"));

var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedWithChildren2 = _interopRequireDefault(require("./AnimatedWithChildren"));

var AnimatedModulo = /*#__PURE__*/function (_AnimatedWithChildren) {
  (0, _inheritsLoose2.default)(AnimatedModulo, _AnimatedWithChildren);

  function AnimatedModulo(a, modulus) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._a = a;
    _this._modulus = modulus;
    return _this;
  }

  var _proto = AnimatedModulo.prototype;

  _proto.__makeNative = function __makeNative() {
    this._a.__makeNative();

    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  _proto.__getValue = function __getValue() {
    return (this._a.__getValue() % this._modulus + this._modulus) % this._modulus;
  };

  _proto.interpolate = function interpolate(config) {
    return new _AnimatedInterpolation.default(this, config);
  };

  _proto.__attach = function __attach() {
    this._a.__addChild(this);
  };

  _proto.__detach = function __detach() {
    this._a.__removeChild(this);

    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    return {
      type: 'modulus',
      input: this._a.__getNativeTag(),
      modulus: this._modulus
    };
  };

  return AnimatedModulo;
}(_AnimatedWithChildren2.default);

var _default = AnimatedModulo;
exports.default = _default;
module.exports = exports.default;