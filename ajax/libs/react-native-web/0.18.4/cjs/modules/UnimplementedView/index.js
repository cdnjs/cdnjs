"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _View = _interopRequireDefault(require("../../exports/View"));

var _react = _interopRequireDefault(require("react"));

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Common implementation for a simple stubbed view.
 */
var UnimplementedView = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(UnimplementedView, _React$Component);

  function UnimplementedView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UnimplementedView.prototype;

  _proto.setNativeProps = function setNativeProps() {// Do nothing.
  };

  _proto.render = function render() {
    return /*#__PURE__*/_react.default.createElement(_View.default, {
      style: [unimplementedViewStyles, this.props.style]
    }, this.props.children);
  };

  return UnimplementedView;
}(_react.default.Component);

var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};
var _default = UnimplementedView;
exports.default = _default;
module.exports = exports.default;