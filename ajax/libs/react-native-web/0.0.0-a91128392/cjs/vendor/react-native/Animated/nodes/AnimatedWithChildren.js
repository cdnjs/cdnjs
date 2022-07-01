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

var _createForOfIteratorHelperLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelperLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _AnimatedNode2 = _interopRequireDefault(require("./AnimatedNode"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

var AnimatedWithChildren = /*#__PURE__*/function (_AnimatedNode) {
  (0, _inheritsLoose2.default)(AnimatedWithChildren, _AnimatedNode);

  function AnimatedWithChildren() {
    var _this;

    _this = _AnimatedNode.call(this) || this;
    _this._children = [];
    return _this;
  }

  var _proto = AnimatedWithChildren.prototype;

  _proto.__makeNative = function __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;

      for (var _iterator = (0, _createForOfIteratorHelperLoose2.default)(this._children), _step; !(_step = _iterator()).done;) {
        var child = _step.value;

        child.__makeNative();

        _NativeAnimatedHelper.default.API.connectAnimatedNodes(this.__getNativeTag(), child.__getNativeTag());
      }
    }

    _AnimatedNode.prototype.__makeNative.call(this);
  };

  _proto.__addChild = function __addChild(child) {
    if (this._children.length === 0) {
      this.__attach();
    }

    this._children.push(child);

    if (this.__isNative) {
      // Only accept "native" animated nodes as children
      child.__makeNative();

      _NativeAnimatedHelper.default.API.connectAnimatedNodes(this.__getNativeTag(), child.__getNativeTag());
    }
  };

  _proto.__removeChild = function __removeChild(child) {
    var index = this._children.indexOf(child);

    if (index === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }

    if (this.__isNative && child.__isNative) {
      _NativeAnimatedHelper.default.API.disconnectAnimatedNodes(this.__getNativeTag(), child.__getNativeTag());
    }

    this._children.splice(index, 1);

    if (this._children.length === 0) {
      this.__detach();
    }
  };

  _proto.__getChildren = function __getChildren() {
    return this._children;
  };

  _proto.__callListeners = function __callListeners(value) {
    _AnimatedNode.prototype.__callListeners.call(this, value);

    if (!this.__isNative) {
      for (var _iterator2 = (0, _createForOfIteratorHelperLoose2.default)(this._children), _step2; !(_step2 = _iterator2()).done;) {
        var child = _step2.value;

        if (child.__getValue) {
          child.__callListeners(child.__getValue());
        }
      }
    }
  };

  return AnimatedWithChildren;
}(_AnimatedNode2.default);

var _default = AnimatedWithChildren;
exports.default = _default;
module.exports = exports.default;