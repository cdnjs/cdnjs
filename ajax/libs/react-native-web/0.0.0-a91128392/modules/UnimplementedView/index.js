import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import View from '../../exports/View';
import React from 'react';
/**
 * Common implementation for a simple stubbed view.
 */

var UnimplementedView = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(UnimplementedView, _React$Component);

  function UnimplementedView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UnimplementedView.prototype;

  _proto.setNativeProps = function setNativeProps() {// Do nothing.
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(View, {
      style: [unimplementedViewStyles, this.props.style]
    }, this.props.children);
  };

  return UnimplementedView;
}(React.Component);

var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};
export default UnimplementedView;