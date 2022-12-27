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

var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedWithChildren = _interopRequireDefault(require("./AnimatedWithChildren"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

class AnimatedTransform extends _AnimatedWithChildren.default {
  constructor(transforms) {
    super();
    this._transforms = transforms;
  }

  __makeNative() {
    this._transforms.forEach(transform => {
      for (var key in transform) {
        var value = transform[key];

        if (value instanceof _AnimatedNode.default) {
          value.__makeNative();
        }
      }
    });

    super.__makeNative();
  }

  __getValue() {
    return this._transforms.map(transform => {
      var result = {};

      for (var key in transform) {
        var value = transform[key];

        if (value instanceof _AnimatedNode.default) {
          result[key] = value.__getValue();
        } else {
          result[key] = value;
        }
      }

      return result;
    });
  }

  __getAnimatedValue() {
    return this._transforms.map(transform => {
      var result = {};

      for (var key in transform) {
        var value = transform[key];

        if (value instanceof _AnimatedNode.default) {
          result[key] = value.__getAnimatedValue();
        } else {
          // All transform components needed to recompose matrix
          result[key] = value;
        }
      }

      return result;
    });
  }

  __attach() {
    this._transforms.forEach(transform => {
      for (var key in transform) {
        var value = transform[key];

        if (value instanceof _AnimatedNode.default) {
          value.__addChild(this);
        }
      }
    });
  }

  __detach() {
    this._transforms.forEach(transform => {
      for (var key in transform) {
        var value = transform[key];

        if (value instanceof _AnimatedNode.default) {
          value.__removeChild(this);
        }
      }
    });

    super.__detach();
  }

  __getNativeConfig() {
    var transConfigs = [];

    this._transforms.forEach(transform => {
      for (var key in transform) {
        var value = transform[key];

        if (value instanceof _AnimatedNode.default) {
          transConfigs.push({
            type: 'animated',
            property: key,
            nodeTag: value.__getNativeTag()
          });
        } else {
          transConfigs.push({
            type: 'static',
            property: key,
            value: _NativeAnimatedHelper.default.transformDataType(value)
          });
        }
      }
    });

    _NativeAnimatedHelper.default.validateTransform(transConfigs);

    return {
      type: 'transform',
      transforms: transConfigs
    };
  }

}

var _default = AnimatedTransform;
exports.default = _default;
module.exports = exports.default;