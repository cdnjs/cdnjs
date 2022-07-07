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

var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedTransform = _interopRequireDefault(require("./AnimatedTransform"));

var _AnimatedWithChildren = _interopRequireDefault(require("./AnimatedWithChildren"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

var _StyleSheet = _interopRequireDefault(require("../../../../exports/StyleSheet"));

var flattenStyle = _StyleSheet.default.flatten;

class AnimatedStyle extends _AnimatedWithChildren.default {
  constructor(style) {
    super();
    style = flattenStyle(style) || {};

    if (style.transform) {
      style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
        transform: new _AnimatedTransform.default(style.transform)
      });
    }

    this._style = style;
  } // Recursively get values for nested styles (like iOS's shadowOffset)


  _walkStyleAndGetValues(style) {
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
  }

  __getValue() {
    return this._walkStyleAndGetValues(this._style);
  } // Recursively get animated values for nested styles (like iOS's shadowOffset)


  _walkStyleAndGetAnimatedValues(style) {
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
  }

  __getAnimatedValue() {
    return this._walkStyleAndGetAnimatedValues(this._style);
  }

  __attach() {
    for (var key in this._style) {
      var value = this._style[key];

      if (value instanceof _AnimatedNode.default) {
        value.__addChild(this);
      }
    }
  }

  __detach() {
    for (var key in this._style) {
      var value = this._style[key];

      if (value instanceof _AnimatedNode.default) {
        value.__removeChild(this);
      }
    }

    super.__detach();
  }

  __makeNative() {
    for (var key in this._style) {
      var value = this._style[key];

      if (value instanceof _AnimatedNode.default) {
        value.__makeNative();
      }
    }

    super.__makeNative();
  }

  __getNativeConfig() {
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
  }

}

var _default = AnimatedStyle;
exports.default = _default;
module.exports = exports.default;