"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = createAnimatedComponent;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _useAnimatedProps2 = _interopRequireDefault(require("./useAnimatedProps"));
var _useMergeRefs = _interopRequireDefault(require("../Utilities/useMergeRefs"));
var _StyleSheet = _interopRequireDefault(require("../../../exports/StyleSheet"));
var _View = _interopRequireDefault(require("../../../exports/View"));
var React = _interopRequireWildcard(require("react"));
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
/**
 * Experimental implementation of `createAnimatedComponent` that is intended to
 * be compatible with concurrent rendering.
 */
function createAnimatedComponent(Component) {
  return /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
    var _useAnimatedProps = (0, _useAnimatedProps2.default)(props),
      reducedProps = _useAnimatedProps[0],
      callbackRef = _useAnimatedProps[1];
    var ref = (0, _useMergeRefs.default)(callbackRef, forwardedRef);

    // Some components require explicit passthrough values for animation
    // to work properly. For example, if an animated component is
    // transformed and Pressable, onPress will not work after transform
    // without these passthrough values.
    // $FlowFixMe[prop-missing]
    var passthroughAnimatedPropExplicitValues = reducedProps.passthroughAnimatedPropExplicitValues,
      style = reducedProps.style;
    var _ref = passthroughAnimatedPropExplicitValues !== null && passthroughAnimatedPropExplicitValues !== void 0 ? passthroughAnimatedPropExplicitValues : {},
      passthroughStyle = _ref.style,
      passthroughProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
    var mergedStyle = [style, passthroughStyle];
    return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, reducedProps, passthroughProps, {
      style: mergedStyle,
      ref: ref
    }));
  });
}
module.exports = exports.default;