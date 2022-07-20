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

class UnimplementedView extends React.Component {
  setNativeProps() {// Do nothing.
  }

  render() {
    return /*#__PURE__*/React.createElement(View, {
      style: [unimplementedViewStyles, this.props.style]
    }, this.props.children);
  }

}

var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};
export default UnimplementedView;