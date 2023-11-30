import _extends from "@babel/runtime/helpers/extends";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

import * as React from 'react';
import SectionList from '../../../../exports/SectionList';
import createAnimatedComponent from '../createAnimatedComponent';
/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
var SectionListWithEventThrottle = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(SectionList, _extends({
  scrollEventThrottle: 0.0001
}, props, {
  ref: ref
})));
export default createAnimatedComponent(SectionListWithEventThrottle);