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

var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedTransform = _interopRequireDefault(require("./AnimatedTransform"));

var _AnimatedWithChildren2 = _interopRequireDefault(require("./AnimatedWithChildren"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

var _StyleSheet = _interopRequireDefault(require("../../../../exports/StyleSheet"));

var flattenStyle = _StyleSheet.default.flatten;

var AnimatedStyle = /*#__PURE__*/function (_AnimatedWithChildren) {
  (0, _inheritsLoose2.default)(AnimatedStyle, _AnimatedWithChildren);

  function AnimatedStyle(style) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    style = flattenStyle(style) || {};

    if (style.transform) {
      style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
        transform: new _AnimatedTransform.default(style.transform)
      });
    }

    _this._style = style;
    return _this;
  } // Recursively get values for nested styles (like iOS's shadowOffset)


  var _proto = AnimatedStyle.prototype;

  _proto._walkStyleAndGetValues = function _walkStyleAndGetValues(style) {
    var updatedStyle = {};

    for (var key in style) {
      var value = style[key];

      if (value instanceof _AnimatedNode.default) {
        if (!value.__isNative) {
          // We cannot use value of natively driven nodes this way as the value we have access from
          // JS may not be up to date.
          updatedStyle[key] = value.__getValue();
        }
      } else if (value && !Array.isArray(value) && typeof value === 'object') {
        // Support animating nested values (for example: shadowOffset.height)
        updatedStyle[key] = this._walkStyleAndGetValues(value);
      } else {
        updatedStyle[key] = value;
      }
    }

    return updatedStyle;
  };

  _proto.__getValue = function __getValue() {
    return this._walkStyleAndGetValues(this._style);
  } // Recursively get animated values for nested styles (like iOS's shadowOffset)
  ;

  _proto._walkStyleAndGetAnimatedValues = function _walkStyleAndGetAnimatedValues(style) {
    var updatedStyle = {};

    for (var key in style) {
      var value = style[key];

      if (value instanceof _AnimatedNode.default) {
        updatedStyle[key] = value.__getAnimatedValue();
      } else if (value && !Array.isArray(value) && typeof value === 'object') {
        // Support animating nested values (for example: shadowOffset.height)
        updatedStyle[key] = this._walkStyleAndGetAnimatedValues(value);
      }
    }

    return updatedStyle;
  };

  _proto.__getAnimatedValue = function __getAnimatedValue() {
    return this._walkStyleAndGetAnimatedValues(this._style);
  };

  _proto.__attach = function __attach() {
    for (var key in this._style) {
      var value = this._style[key];

      if (value instanceof _AnimatedNode.default) {
        value.__addChild(this);
      }
    }
  };

  _proto.__detach = function __detach() {
    for (var key in this._style) {
      var value = this._style[key];

      if (value instanceof _AnimatedNode.default) {
        value.__removeChild(this);
      }
    }

    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  _proto.__makeNative = function __makeNative() {
    for (var key in this._style) {
      var value = this._style[key];

      if (value instanceof _AnimatedNode.default) {
        value.__makeNative();
      }
    }

    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    var styleConfig = {};

    for (var styleKey in this._style) {
      if (this._style[styleKey] instanceof _AnimatedNode.default) {
        var style = this._style[styleKey];

        style.__makeNative();

        styleConfig[styleKey] = style.__getNativeTag();
      } // Non-animated styles are set using `setNativeProps`, no need
      // to pass those as a part of the node config

    }

    _NativeAnimatedHelper.default.validateStyles(styleConfig);

    return {
      type: 'style',
      style: styleConfig
    };
  };

  return AnimatedStyle;
}(_AnimatedWithChildren2.default);

var _default = AnimatedStyle;
exports.default = _default;
module.exports = exports.default;