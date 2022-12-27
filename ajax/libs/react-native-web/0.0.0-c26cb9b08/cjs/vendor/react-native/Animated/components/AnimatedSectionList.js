"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _SectionList = _interopRequireDefault(require("../../../../exports/SectionList"));

var _createAnimatedComponent = _interopRequireDefault(require("../createAnimatedComponent"));

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
var SectionListWithEventThrottle = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(_SectionList.default, (0, _extends2.default)({
  scrollEventThrottle: 0.0001
}, props, {
  ref: ref
})));

var _default = (0, _createAnimatedComponent.default)(SectionListWithEventThrottle);

exports.default = _default;
module.exports = exports.default;