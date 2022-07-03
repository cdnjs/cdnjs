"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _View = _interopRequireDefault(require("../View"));

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var KeyboardAvoidingView = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(KeyboardAvoidingView, _React$Component);

  function KeyboardAvoidingView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.frame = null;

    _this.onLayout = function (event) {
      _this.frame = event.nativeEvent.layout;
    };

    return _this;
  }

  var _proto = KeyboardAvoidingView.prototype;

  _proto.relativeKeyboardHeight = function relativeKeyboardHeight(keyboardFrame) {
    var frame = this.frame;

    if (!frame || !keyboardFrame) {
      return 0;
    }

    var keyboardY = keyboardFrame.screenY - (this.props.keyboardVerticalOffset || 0);
    return Math.max(frame.y + frame.height - keyboardY, 0);
  };

  _proto.onKeyboardChange = function onKeyboardChange(event) {};

  _proto.render = function render() {
    var _this$props = this.props,
        behavior = _this$props.behavior,
        contentContainerStyle = _this$props.contentContainerStyle,
        keyboardVerticalOffset = _this$props.keyboardVerticalOffset,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["behavior", "contentContainerStyle", "keyboardVerticalOffset"]);
    return /*#__PURE__*/React.createElement(_View.default, (0, _extends2.default)({
      onLayout: this.onLayout
    }, rest));
  };

  return KeyboardAvoidingView;
}(React.Component);

var _default = KeyboardAvoidingView;
exports.default = _default;
module.exports = exports.default;