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
 * @format
 */

import useAnimatedProps from './useAnimatedProps';
import useMergeRefs from '../Utilities/useMergeRefs';
import StyleSheet from '../../../exports/StyleSheet';
import View from '../../../exports/View';
import * as React from 'react';
/**
 * Experimental implementation of `createAnimatedComponent` that is intended to
 * be compatible with concurrent rendering.
 */
export default function createAnimatedComponent(Component) {
  return /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
    var _useAnimatedProps = useAnimatedProps(props),
      reducedProps = _useAnimatedProps[0],
      callbackRef = _useAnimatedProps[1];
    var ref = useMergeRefs(callbackRef, forwardedRef);

    // Some components require explicit passthrough values for animation
    // to work properly. For example, if an animated component is
    // transformed and Pressable, onPress will not work after transform
    // without these passthrough values.
    // $FlowFixMe[prop-missing]
    var passthroughAnimatedPropExplicitValues = reducedProps.passthroughAnimatedPropExplicitValues,
      style = reducedProps.style;
    var _ref = passthroughAnimatedPropExplicitValues !== null && passthroughAnimatedPropExplicitValues !== void 0 ? passthroughAnimatedPropExplicitValues : {},
      passthroughStyle = _ref.style,
      passthroughProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    var mergedStyle = [style, passthroughStyle];
    return /*#__PURE__*/React.createElement(Component, _extends({}, reducedProps, passthroughProps, {
      style: mergedStyle,
      ref: ref
    }));
  });
}