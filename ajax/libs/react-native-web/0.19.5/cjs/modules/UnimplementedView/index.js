"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
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
class UnimplementedView extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_View.default, {
      style: [unimplementedViewStyles, this.props.style]
    }, this.props.children);
  }
}
var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};
var _default = UnimplementedView;
exports.default = _default;
module.exports = exports.default;