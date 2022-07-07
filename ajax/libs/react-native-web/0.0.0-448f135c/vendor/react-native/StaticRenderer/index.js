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

import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import * as React from 'react';

var StaticRenderer = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(StaticRenderer, _React$Component);

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

export default StaticRenderer;