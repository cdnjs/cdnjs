/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var StaticRenderer = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(StaticRenderer, _React$Component);

  function StaticRenderer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = StaticRenderer.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  };

  _proto.render = function render() {
    return this.props.render();
  };

  return StaticRenderer;
}(React.Component);

var _default = StaticRenderer;
exports.default = _default;
module.exports = exports.default;