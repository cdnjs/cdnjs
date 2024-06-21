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

import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["activeOpacity", "delayPressIn", "delayPressOut", "delayLongPress", "disabled", "focusable", "onLongPress", "onPress", "onPressIn", "onPressOut", "rejectResponderTermination", "style"];
import * as React from 'react';
import { useCallback, useMemo, useState, useRef } from 'react';
import useMergeRefs from '../../modules/useMergeRefs';
import usePressEvents from '../../modules/usePressEvents';
import StyleSheet from '../StyleSheet';
import View from '../View';
import { warnOnce } from '../../modules/warnOnce';
/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 */
function TouchableOpacity(props, forwardedRef) {
  warnOnce('TouchableOpacity', 'TouchableOpacity is deprecated. Please use Pressable.');
  var activeOpacity = props.activeOpacity,
    delayPressIn = props.delayPressIn,
    delayPressOut = props.delayPressOut,
    delayLongPress = props.delayLongPress,
    disabled = props.disabled,
    focusable = props.focusable,
    onLongPress = props.onLongPress,
    onPress = props.onPress,
    onPressIn = props.onPressIn,
    onPressOut = props.onPressOut,
    rejectResponderTermination = props.rejectResponderTermination,
    style = props.style,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var hostRef = useRef(null);
  var setRef = useMergeRefs(forwardedRef, hostRef);
  var _useState = useState('0s'),
    duration = _useState[0],
    setDuration = _useState[1];
  var _useState2 = useState(null),
    opacityOverride = _useState2[0],
    setOpacityOverride = _useState2[1];
  var setOpacityTo = useCallback((value, duration) => {
    setOpacityOverride(value);
    setDuration(duration ? duration / 1000 + "s" : '0s');
  }, [setOpacityOverride, setDuration]);
  var setOpacityActive = useCallback(duration => {
    setOpacityTo(activeOpacity !== null && activeOpacity !== void 0 ? activeOpacity : 0.2, duration);
  }, [activeOpacity, setOpacityTo]);
  var setOpacityInactive = useCallback(duration => {
    setOpacityTo(null, duration);
  }, [setOpacityTo]);
  var pressConfig = useMemo(() => ({
    cancelable: !rejectResponderTermination,
    disabled,
    delayLongPress,
    delayPressStart: delayPressIn,
    delayPressEnd: delayPressOut,
    onLongPress,
    onPress,
    onPressStart(event) {
      var isGrant = event.dispatchConfig != null ? event.dispatchConfig.registrationName === 'onResponderGrant' : event.type === 'keydown';
      setOpacityActive(isGrant ? 0 : 150);
      if (onPressIn != null) {
        onPressIn(event);
      }
    },
    onPressEnd(event) {
      setOpacityInactive(250);
      if (onPressOut != null) {
        onPressOut(event);
      }
    }
  }), [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination, setOpacityActive, setOpacityInactive]);
  var pressEventHandlers = usePressEvents(hostRef, pressConfig);
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, pressEventHandlers, {
    accessibilityDisabled: disabled,
    focusable: !disabled && focusable !== false,
    pointerEvents: disabled ? 'box-none' : undefined,
    ref: setRef,
    style: [styles.root, !disabled && styles.actionable, style, opacityOverride != null && {
      opacity: opacityOverride
    }, {
      transitionDuration: duration
    }]
  }));
}
var styles = StyleSheet.create({
  root: {
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});
var MemoedTouchableOpacity = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(TouchableOpacity));
MemoedTouchableOpacity.displayName = 'TouchableOpacity';
export default MemoedTouchableOpacity;