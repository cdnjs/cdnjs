import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["colors", "enabled", "onRefresh", "progressBackgroundColor", "progressViewOffset", "refreshing", "size", "tintColor", "title", "titleColor"];
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import View from '../View';
import React from 'react';
function RefreshControl(props) {
  var colors = props.colors,
    enabled = props.enabled,
    onRefresh = props.onRefresh,
    progressBackgroundColor = props.progressBackgroundColor,
    progressViewOffset = props.progressViewOffset,
    refreshing = props.refreshing,
    size = props.size,
    tintColor = props.tintColor,
    title = props.title,
    titleColor = props.titleColor,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement(View, rest);
}
export default RefreshControl;