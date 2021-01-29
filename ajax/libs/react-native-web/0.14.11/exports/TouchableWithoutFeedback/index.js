/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { useMemo, useRef } from 'react';
import pick from '../../modules/pick';
import useMergeRefs from '../../modules/useMergeRefs';
import usePressEvents from '../../modules/usePressEvents';
var forwardPropsList = {
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityState: true,
  accessibilityValue: true,
  accessible: true,
  children: true,
  disabled: true,
  focusable: true,
  importantForAccessibility: true,
  nativeID: true,
  onBlur: true,
  onFocus: true,
  onLayout: true,
  testID: true
};

var pickProps = function pickProps(props) {
  return pick(props, forwardPropsList);
};

function TouchableWithoutFeedback(props, forwardedRef) {
  var accessible = props.accessible,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      delayLongPress = props.delayLongPress,
      disabled = props.disabled,
      focusable = props.focusable,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      rejectResponderTermination = props.rejectResponderTermination;
  var hostRef = useRef(null);
  var pressConfig = useMemo(function () {
    return {
      cancelable: !rejectResponderTermination,
      disabled: disabled,
      delayLongPress: delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      onLongPress: onLongPress,
      onPress: onPress,
      onPressStart: onPressIn,
      onPressEnd: onPressOut
    };
  }, [disabled, delayPressIn, delayPressOut, delayLongPress, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination]);
  var pressEventHandlers = usePressEvents(hostRef, pressConfig);
  var element = React.Children.only(props.children);
  var children = [element.props.children];
  var supportedProps = pickProps(props);
  supportedProps.accessible = accessible !== false;
  supportedProps.accessibilityState = _objectSpread({
    disabled: disabled
  }, props.accessibilityState);
  supportedProps.focusable = focusable !== false && onPress !== undefined;
  supportedProps.ref = useMergeRefs(forwardedRef, hostRef, element.ref);
  var elementProps = Object.assign(supportedProps, pressEventHandlers);
  return React.cloneElement.apply(React, [element, elementProps].concat(children));
}

var MemoedTouchableWithoutFeedback = React.memo(React.forwardRef(TouchableWithoutFeedback));
MemoedTouchableWithoutFeedback.displayName = 'TouchableWithoutFeedback';
export default MemoedTouchableWithoutFeedback;