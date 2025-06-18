import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["style"];
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
function UnimplementedView(_ref) {
  var style = _ref.style,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(View, _extends({}, props, {
    style: [unimplementedViewStyles, style]
  }));
}
var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};
export default UnimplementedView;