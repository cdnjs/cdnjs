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
var _AnimatedEvent = require("../AnimatedEvent");
var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));
var _AnimatedStyle = _interopRequireDefault(require("./AnimatedStyle"));
var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
class AnimatedProps extends _AnimatedNode.default {
  constructor(props, callback) {
    super();
    if (props.style) {
      props = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
        style: new _AnimatedStyle.default(props.style)
      });
    }
    this._props = props;
    this._callback = callback;
    this.__attach();
  }
  __getValue() {
    var props = {};
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode.default) {
        if (!value.__isNative || value instanceof _AnimatedStyle.default) {
          // We cannot use value of natively driven nodes this way as the value we have access from
          // JS may not be up to date.
          props[key] = value.__getValue();
        }
      } else if (value instanceof _AnimatedEvent.AnimatedEvent) {
        props[key] = value.__getHandler();
      } else {
        props[key] = value;
      }
    }
    return props;
  }
  __getAnimatedValue() {
    var props = {};
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode.default) {
        props[key] = value.__getAnimatedValue();
      }
    }
    return props;
  }
  __attach() {
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode.default) {
        value.__addChild(this);
      }
    }
  }
  __detach() {
    if (this.__isNative && this._animatedView) {
      this.__disconnectAnimatedView();
    }
    this._animatedView = null;
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode.default) {
        value.__removeChild(this);
      }
    }
    super.__detach();
  }
  update() {
    this._callback();
  }
  __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;
      for (var key in this._props) {
        var value = this._props[key];
        if (value instanceof _AnimatedNode.default) {
          value.__makeNative();
        }
      }
      if (this._animatedView) {
        this.__connectAnimatedView();
      }
    }
  }
  setNativeView(animatedView) {
    if (this._animatedView === animatedView) {
      return;
    }
    this._animatedView = animatedView;
    if (this.__isNative) {
      this.__connectAnimatedView();
    }
  }
  __connectAnimatedView() {
    (0, _invariant.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = this._animatedView;
    (0, _invariant.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');
    _NativeAnimatedHelper.default.API.connectAnimatedNodeToView(this.__getNativeTag(), nativeViewTag);
  }
  __disconnectAnimatedView() {
    (0, _invariant.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = this._animatedView;
    (0, _invariant.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');
    _NativeAnimatedHelper.default.API.disconnectAnimatedNodeFromView(this.__getNativeTag(), nativeViewTag);
  }
  __restoreDefaultValues() {
    // When using the native driver, view properties need to be restored to
    // their default values manually since react no longer tracks them. This
    // is needed to handle cases where a prop driven by native animated is removed
    // after having been changed natively by an animation.
    if (this.__isNative) {
      _NativeAnimatedHelper.default.API.restoreDefaultValues(this.__getNativeTag());
    }
  }
  __getNativeConfig() {
    var propsConfig = {};
    for (var propKey in this._props) {
      var value = this._props[propKey];
      if (value instanceof _AnimatedNode.default) {
        value.__makeNative();
        propsConfig[propKey] = value.__getNativeTag();
      }
    }
    return {
      type: 'props',
      props: propsConfig
    };
  }
}
var _default = exports.default = AnimatedProps;
module.exports = exports.default;