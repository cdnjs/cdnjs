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

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

class StaticContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.shouldUpdate;
  }

  render() {
    var child = this.props.children;
    return child === null || child === false ? null : React.Children.only(child);
  }

}

var _default = StaticContainer;
exports.default = _default;
module.exports = exports.default;