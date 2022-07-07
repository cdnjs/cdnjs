/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
'use strict';

import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["children", "delayLongPress", "delayPressIn", "delayPressOut", "disabled", "focusable", "onBlur", "onContextMenu", "onFocus", "onHoverIn", "onHoverOut", "onKeyDown", "onLongPress", "onPress", "onPressMove", "onPressIn", "onPressOut", "style", "testOnly_hovered", "testOnly_pressed"];
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
  var children = props.children,
      delayLongPress = props.delayLongPress,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      disabled = props.disabled,
      focusable = props.focusable,
      onBlur = props.onBlur,
      onContextMenu = props.onContextMenu,
      onFocus = props.onFocus,
      onHoverIn = props.onHoverIn,
      onHoverOut = props.onHoverOut,
      onKeyDown = props.onKeyDown,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressMove = props.onPressMove,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      style = props.style,
      testOnly_hovered = props.testOnly_hovered,
      testOnly_pressed = props.testOnly_pressed,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var _useForceableState = useForceableState(testOnly_hovered === true),
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
  var pressConfig = useMemo(() => ({
    delayLongPress,
    delayPressStart: delayPressIn,
    delayPressEnd: delayPressOut,
    disabled,
    onLongPress,
    onPress,
    onPressChange: setPressed,
    onPressStart: onPressIn,
    onPressMove,
    onPressEnd: onPressOut
  }), [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressMove, onPressOut, setPressed]);
  var pressEventHandlers = usePressEvents(hostRef, pressConfig);
  var onContextMenuPress = pressEventHandlers.onContextMenu,
      onKeyDownPress = pressEventHandlers.onKeyDown;
  useHover(hostRef, {
    contain: true,
    disabled,
    onHoverChange: setHovered,
    onHoverStart: onHoverIn,
    onHoverEnd: onHoverOut
  });
  var interactionState = {
    hovered,
    focused,
    pressed
  };
  var blurHandler = React.useCallback(e => {
    if (disabled) {
      return;
    }

    if (e.nativeEvent.target === hostRef.current) {
      setFocused(false);

      if (onBlur != null) {
        onBlur(e);
      }
    }
  }, [disabled, hostRef, setFocused, onBlur]);
  var focusHandler = React.useCallback(e => {
    if (disabled) {
      return;
    }

    if (e.nativeEvent.target === hostRef.current) {
      setFocused(true);

      if (onFocus != null) {
        onFocus(e);
      }
    }
  }, [disabled, hostRef, setFocused, onFocus]);
  var contextMenuHandler = React.useCallback(e => {
    if (onContextMenuPress != null) {
      onContextMenuPress(e);
    }

    if (onContextMenu != null) {
      onContextMenu(e);
    }
  }, [onContextMenu, onContextMenuPress]);
  var keyDownHandler = React.useCallback(e => {
    if (onKeyDownPress != null) {
      onKeyDownPress(e);
    }

    if (onKeyDown != null) {
      onKeyDown(e);
    }
  }, [onKeyDown, onKeyDownPress]);
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, pressEventHandlers, {
    accessibilityDisabled: disabled,
    focusable: !disabled && focusable !== false,
    onBlur: blurHandler,
    onContextMenu: contextMenuHandler,
    onFocus: focusHandler,
    onKeyDown: keyDownHandler,
    pointerEvents: disabled ? 'none' : rest.pointerEvents,
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
var MemoedPressable = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Pressable));
MemoedPressable.displayName = 'Pressable';
export default MemoedPressable;