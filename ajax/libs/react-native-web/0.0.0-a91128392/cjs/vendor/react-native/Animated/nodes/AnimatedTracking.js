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

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _AnimatedValue = _interopRequireDefault(require("./AnimatedValue"));

var _AnimatedNode2 = _interopRequireDefault(require("./AnimatedNode"));

var _NativeAnimatedHelper = require("../NativeAnimatedHelper");

var AnimatedTracking = /*#__PURE__*/function (_AnimatedNode) {
  (0, _inheritsLoose2.default)(AnimatedTracking, _AnimatedNode);

  function AnimatedTracking(value, parent, animationClass, animationConfig, callback) {
    var _this;

    _this = _AnimatedNode.call(this) || this;
    _this._value = value;
    _this._parent = parent;
    _this._animationClass = animationClass;
    _this._animationConfig = animationConfig;
    _this._useNativeDriver = (0, _NativeAnimatedHelper.shouldUseNativeDriver)(animationConfig);
    _this._callback = callback;

    _this.__attach();

    return _this;
  }

  var _proto = AnimatedTracking.prototype;

  _proto.__makeNative = function __makeNative() {
    this.__isNative = true;

    this._parent.__makeNative();

    _AnimatedNode.prototype.__makeNative.call(this);

    this._value.__makeNative();
  };

  _proto.__getValue = function __getValue() {
    return this._parent.__getValue();
  };

  _proto.__attach = function __attach() {
    this._parent.__addChild(this);

    if (this._useNativeDriver) {
      // when the tracking starts we need to convert this node to a "native node"
      // so that the parent node will be made "native" too. This is necessary as
      // if we don't do this `update` method will get called. At that point it
      // may be too late as it would mean the JS driver has already started
      // updating node values
      this.__makeNative();
    }
  };

  _proto.__detach = function __detach() {
    this._parent.__removeChild(this);

    _AnimatedNode.prototype.__detach.call(this);
  };

  _proto.update = function update() {
    this._value.animate(new this._animationClass((0, _objectSpread2.default)((0, _objectSpread2.default)({}, this._animationConfig), {}, {
      toValue: this._animationConfig.toValue.__getValue()
    })), this._callback);
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    var animation = new this._animationClass((0, _objectSpread2.default)((0, _objectSpread2.default)({}, this._animationConfig), {}, {
      // remove toValue from the config as it's a ref to Animated.Value
      toValue: undefined
    }));

    var animationConfig = animation.__getNativeAnimationConfig();

    return {
      type: 'tracking',
      animationId: (0, _NativeAnimatedHelper.generateNewAnimationId)(),
      animationConfig: animationConfig,
      toValue: this._parent.__getNativeTag(),
      value: this._value.__getNativeTag()
    };
  };

  return AnimatedTracking;
}(_AnimatedNode2.default);

var _default = AnimatedTracking;
exports.default = _default;
module.exports = exports.default;