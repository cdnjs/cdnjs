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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { forwardRef, memo, useMemo, useState, useRef } from 'react';
import useMergeRefs from '../../modules/useMergeRefs';
import useHover from '../../modules/useHover';
import usePressEvents from '../../modules/usePressEvents';
import StyleSheet from '../StyleSheet';
import View from '../View';

/**
 * Component used to build display components that should respond to whether the
 * component is currently pressed or not.
 */
function Pressable(props, forwardedRef) {
  var accessible = props.accessible,
      children = props.children,
      delayLongPress = props.delayLongPress,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      disabled = props.disabled,
      focusable = props.focusable,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressMove = props.onPressMove,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      style = props.style,
      testOnly_pressed = props.testOnly_pressed,
      rest = _objectWithoutPropertiesLoose(props, ["accessible", "children", "delayLongPress", "delayPressIn", "delayPressOut", "disabled", "focusable", "onBlur", "onFocus", "onLongPress", "onPress", "onPressMove", "onPressIn", "onPressOut", "style", "testOnly_pressed"]);

  var _useForceableState = useForceableState(false),
      hovered = _useForceableState[0],
      setHovered = _useForceableState[1];

  var _useForceableState2 = useForceableState(false),
      focused = _useForceableState2[0],
      setFocused = _useForceableState2[1];

  var _useForceableState3 = useForceableState(testOnly_pressed === true),
      pressed = _useForceableState3[0],
      setPressed = _useForceableState3[1];

  var hostRef = useRef(null);
  var setRef = useMergeRefs(forwardedRef, hostRef);
  var pressConfig = useMemo(function () {
    return {
      delayLongPress: delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      disabled: disabled,
      onLongPress: onLongPress,
      onPress: onPress,
      onPressChange: setPressed,
      onPressStart: onPressIn,
      onPressMove: onPressMove,
      onPressEnd: onPressOut
    };
  }, [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressMove, onPressOut, setPressed]);
  var pressEventHandlers = usePressEvents(hostRef, pressConfig);
  useHover(hostRef, {
    contain: true,
    disabled: disabled,
    onHoverChange: setHovered
  });

  var accessibilityState = _objectSpread({
    disabled: disabled
  }, props.accessibilityState);

  var interactionState = {
    hovered: hovered,
    focused: focused,
    pressed: pressed
  };

  function createFocusHandler(callback, value) {
    return function (event) {
      if (event.nativeEvent.target === hostRef.current) {
        setFocused(value);

        if (callback != null) {
          callback(event);
        }
      }
    };
  }

  return React.createElement(View, _extends({}, rest, pressEventHandlers, {
    accessibilityState: accessibilityState,
    accessible: accessible !== false,
    focusable: focusable !== false,
    onBlur: createFocusHandler(onBlur, false),
    onFocus: createFocusHandler(onFocus, true),
    ref: setRef,
    style: [!disabled && styles.root, typeof style === 'function' ? style(interactionState) : style]
  }), typeof children === 'function' ? children(interactionState) : children);
}

function useForceableState(forced) {
  var _useState = useState(false),
      bool = _useState[0],
      setBool = _useState[1];

  return [bool || forced, setBool];
}

var styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});
var MemoedPressable = memo(forwardRef(Pressable));
MemoedPressable.displayName = 'Pressable';
export default MemoedPressable;