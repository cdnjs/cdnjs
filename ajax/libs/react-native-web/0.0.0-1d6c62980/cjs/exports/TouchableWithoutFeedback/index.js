/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _pick = _interopRequireDefault(require("../../modules/pick"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

var _usePressEvents = _interopRequireDefault(require("../../modules/usePressEvents"));

const forwardPropsList = {
  accessibilityDisabled: true,
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityState: true,
  accessibilityValue: true,
  children: true,
  disabled: true,
  focusable: true,
  nativeID: true,
  onBlur: true,
  onFocus: true,
  onLayout: true,
  testID: true
};

const pickProps = props => (0, _pick.default)(props, forwardPropsList);

function TouchableWithoutFeedback(props, forwardedRef) {
  const delayPressIn = props.delayPressIn,
        delayPressOut = props.delayPressOut,
        delayLongPress = props.delayLongPress,
        disabled = props.disabled,
        focusable = props.focusable,
        onLongPress = props.onLongPress,
        onPress = props.onPress,
        onPressIn = props.onPressIn,
        onPressOut = props.onPressOut,
        rejectResponderTermination = props.rejectResponderTermination;
  const hostRef = (0, React.useRef)(null);
  const pressConfig = (0, React.useMemo)(() => ({
    cancelable: !rejectResponderTermination,
    disabled,
    delayLongPress,
    delayPressStart: delayPressIn,
    delayPressEnd: delayPressOut,
    onLongPress,
    onPress,
    onPressStart: onPressIn,
    onPressEnd: onPressOut
  }), [disabled, delayPressIn, delayPressOut, delayLongPress, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination]);
  const pressEventHandlers = (0, _usePressEvents.default)(hostRef, pressConfig);
  const element = React.Children.only(props.children);
  const children = [element.props.children];
  const supportedProps = pickProps(props);
  supportedProps.accessibilityDisabled = disabled;
  supportedProps.focusable = !disabled && focusable !== false;
  supportedProps.ref = (0, _useMergeRefs.default)(forwardedRef, hostRef, element.ref);
  const elementProps = Object.assign(supportedProps, pressEventHandlers);
  return /*#__PURE__*/React.cloneElement(element, elementProps, ...children);
}

const MemoedTouchableWithoutFeedback = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(TouchableWithoutFeedback));
MemoedTouchableWithoutFeedback.displayName = 'TouchableWithoutFeedback';
var _default = MemoedTouchableWithoutFeedback;
exports.default = _default;
module.exports = exports.default;