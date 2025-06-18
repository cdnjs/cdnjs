"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _View = _interopRequireDefault(require("../../exports/View"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["style"];
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
function UnimplementedView(_ref) {
  var style = _ref.style,
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_View.default, (0, _extends2.default)({}, props, {
    style: [unimplementedViewStyles, style]
  }));
}
var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};
var _default = exports.default = UnimplementedView;
module.exports = exports.default;