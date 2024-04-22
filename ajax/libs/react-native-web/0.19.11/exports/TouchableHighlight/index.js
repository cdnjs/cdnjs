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
var _excluded = ["activeOpacity", "children", "delayPressIn", "delayPressOut", "delayLongPress", "disabled", "focusable", "onHideUnderlay", "onLongPress", "onPress", "onPressIn", "onPressOut", "onShowUnderlay", "rejectResponderTermination", "style", "testOnly_pressed", "underlayColor"];
import * as React from 'react';
import { useCallback, useMemo, useState, useRef } from 'react';
import useMergeRefs from '../../modules/useMergeRefs';
import usePressEvents from '../../modules/usePressEvents';
import StyleSheet from '../StyleSheet';
import View from '../View';
import { warnOnce } from '../../modules/warnOnce';
function createExtraStyles(activeOpacity, underlayColor) {
  return {
    child: {
      opacity: activeOpacity !== null && activeOpacity !== void 0 ? activeOpacity : 0.85
    },
    underlay: {
      backgroundColor: underlayColor === undefined ? 'black' : underlayColor
    }
  };
}
function hasPressHandler(props) {
  return props.onPress != null || props.onPressIn != null || props.onPressOut != null || props.onLongPress != null;
}

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.
 *
 * The underlay comes from wrapping the child in a new View, which can affect
 * layout, and sometimes cause unwanted visual artifacts if not used correctly,
 * for example if the backgroundColor of the wrapped view isn't explicitly set
 * to an opaque color.
 *
 * TouchableHighlight must have one child (not zero or more than one).
 * If you wish to have several child components, wrap them in a View.
 */
function TouchableHighlight(props, forwardedRef) {
  warnOnce('TouchableHighlight', 'TouchableHighlight is deprecated. Please use Pressable.');
  var activeOpacity = props.activeOpacity,
    children = props.children,
    delayPressIn = props.delayPressIn,
    delayPressOut = props.delayPressOut,
    delayLongPress = props.delayLongPress,
    disabled = props.disabled,
    focusable = props.focusable,
    onHideUnderlay = props.onHideUnderlay,
    onLongPress = props.onLongPress,
    onPress = props.onPress,
    onPressIn = props.onPressIn,
    onPressOut = props.onPressOut,
    onShowUnderlay = props.onShowUnderlay,
    rejectResponderTermination = props.rejectResponderTermination,
    style = props.style,
    testOnly_pressed = props.testOnly_pressed,
    underlayColor = props.underlayColor,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var hostRef = useRef(null);
  var setRef = useMergeRefs(forwardedRef, hostRef);
  var _useState = useState(testOnly_pressed === true ? createExtraStyles(activeOpacity, underlayColor) : null),
    extraStyles = _useState[0],
    setExtraStyles = _useState[1];
  var showUnderlay = useCallback(() => {
    if (!hasPressHandler(props)) {
      return;
    }
    setExtraStyles(createExtraStyles(activeOpacity, underlayColor));
    if (onShowUnderlay != null) {
      onShowUnderlay();
    }
  }, [activeOpacity, onShowUnderlay, props, underlayColor]);
  var hideUnderlay = useCallback(() => {
    if (testOnly_pressed === true) {
      return;
    }
    if (hasPressHandler(props)) {
      setExtraStyles(null);
      if (onHideUnderlay != null) {
        onHideUnderlay();
      }
    }
  }, [onHideUnderlay, props, testOnly_pressed]);
  var pressConfig = useMemo(() => ({
    cancelable: !rejectResponderTermination,
    disabled,
    delayLongPress,
    delayPressStart: delayPressIn,
    delayPressEnd: delayPressOut,
    onLongPress,
    onPress,
    onPressStart(event) {
      showUnderlay();
      if (onPressIn != null) {
        onPressIn(event);
      }
    },
    onPressEnd(event) {
      hideUnderlay();
      if (onPressOut != null) {
        onPressOut(event);
      }
    }
  }), [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination, showUnderlay, hideUnderlay]);
  var pressEventHandlers = usePressEvents(hostRef, pressConfig);
  var child = React.Children.only(children);
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, pressEventHandlers, {
    accessibilityDisabled: disabled,
    focusable: !disabled && focusable !== false,
    pointerEvents: disabled ? 'box-none' : undefined,
    ref: setRef,
    style: [styles.root, style, !disabled && styles.actionable, extraStyles && extraStyles.underlay]
  }), /*#__PURE__*/React.cloneElement(child, {
    style: [child.props.style, extraStyles && extraStyles.child]
  }));
}
var styles = StyleSheet.create({
  root: {
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});
var MemoedTouchableHighlight = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(TouchableHighlight));
MemoedTouchableHighlight.displayName = 'TouchableHighlight';
export default MemoedTouchableHighlight;