import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["aria-label", "accessibilityLabel", "activeThumbColor", "activeTrackColor", "disabled", "onValueChange", "style", "thumbColor", "trackColor", "value"];
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import * as React from 'react';
import createElement from '../createElement';
import multiplyStyleLengthValue from '../../modules/multiplyStyleLengthValue';
import StyleSheet from '../StyleSheet';
import View from '../View';
var emptyObject = {};
var thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
var thumbFocusedBoxShadow = thumbDefaultBoxShadow + ", 0 0 0 10px rgba(0,0,0,0.1)";
var defaultActiveTrackColor = '#A3D3CF';
var defaultTrackColor = '#939393';
var defaultDisabledTrackColor = '#D5D5D5';
var defaultActiveThumbColor = '#009688';
var defaultThumbColor = '#FAFAFA';
var defaultDisabledThumbColor = '#BDBDBD';
var Switch = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var ariaLabel = props['aria-label'],
    accessibilityLabel = props.accessibilityLabel,
    activeThumbColor = props.activeThumbColor,
    activeTrackColor = props.activeTrackColor,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    onValueChange = props.onValueChange,
    _props$style = props.style,
    style = _props$style === void 0 ? emptyObject : _props$style,
    thumbColor = props.thumbColor,
    trackColor = props.trackColor,
    _props$value = props.value,
    value = _props$value === void 0 ? false : _props$value,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var thumbRef = React.useRef(null);
  function handleChange(event) {
    if (onValueChange != null) {
      onValueChange(event.nativeEvent.target.checked);
    }
  }
  function handleFocusState(event) {
    var isFocused = event.nativeEvent.type === 'focus';
    var boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;
    if (thumbRef.current != null) {
      thumbRef.current.style.boxShadow = boxShadow;
    }
  }
  var _StyleSheet$flatten = StyleSheet.flatten(style),
    styleHeight = _StyleSheet$flatten.height,
    styleWidth = _StyleSheet$flatten.width;
  var height = styleHeight || '20px';
  var minWidth = multiplyStyleLengthValue(height, 2);
  var width = styleWidth > minWidth ? styleWidth : minWidth;
  var trackBorderRadius = multiplyStyleLengthValue(height, 0.5);
  var trackCurrentColor = function () {
    if (value === true) {
      if (trackColor != null && typeof trackColor === 'object') {
        return trackColor.true;
      } else {
        return activeTrackColor !== null && activeTrackColor !== void 0 ? activeTrackColor : defaultActiveTrackColor;
      }
    } else {
      if (trackColor != null && typeof trackColor === 'object') {
        return trackColor.false;
      } else {
        return trackColor !== null && trackColor !== void 0 ? trackColor : defaultTrackColor;
      }
    }
  }();
  var thumbCurrentColor = value ? activeThumbColor !== null && activeThumbColor !== void 0 ? activeThumbColor : defaultActiveThumbColor : thumbColor !== null && thumbColor !== void 0 ? thumbColor : defaultThumbColor;
  var thumbHeight = height;
  var thumbWidth = thumbHeight;
  var rootStyle = [styles.root, style, disabled && styles.cursorDefault, {
    height,
    width
  }];
  var disabledTrackColor = function () {
    if (value === true) {
      if (typeof activeTrackColor === 'string' && activeTrackColor != null || typeof trackColor === 'object' && trackColor != null && trackColor.true) {
        return trackCurrentColor;
      } else {
        return defaultDisabledTrackColor;
      }
    } else {
      if (typeof trackColor === 'string' && trackColor != null || typeof trackColor === 'object' && trackColor != null && trackColor.false) {
        return trackCurrentColor;
      } else {
        return defaultDisabledTrackColor;
      }
    }
  }();
  var disabledThumbColor = function () {
    if (value === true) {
      if (activeThumbColor == null) {
        return defaultDisabledThumbColor;
      } else {
        return thumbCurrentColor;
      }
    } else {
      if (thumbColor == null) {
        return defaultDisabledThumbColor;
      } else {
        return thumbCurrentColor;
      }
    }
  }();
  var trackStyle = [styles.track, {
    backgroundColor: disabled ? disabledTrackColor : trackCurrentColor,
    borderRadius: trackBorderRadius
  }];
  var thumbStyle = [styles.thumb, value && styles.thumbActive, {
    backgroundColor: disabled ? disabledThumbColor : thumbCurrentColor,
    height: thumbHeight,
    marginStart: value ? multiplyStyleLengthValue(thumbWidth, -1) : 0,
    width: thumbWidth
  }];
  var nativeControl = createElement('input', {
    'aria-label': ariaLabel || accessibilityLabel,
    checked: value,
    disabled: disabled,
    onBlur: handleFocusState,
    onChange: handleChange,
    onFocus: handleFocusState,
    ref: forwardedRef,
    style: [styles.nativeControl, styles.cursorInherit],
    type: 'checkbox',
    role: 'switch'
  });
  return /*#__PURE__*/React.createElement(View, _extends({}, other, {
    style: rootStyle
  }), /*#__PURE__*/React.createElement(View, {
    style: trackStyle
  }), /*#__PURE__*/React.createElement(View, {
    ref: thumbRef,
    style: thumbStyle
  }), nativeControl);
});
Switch.displayName = 'Switch';
var styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  track: _objectSpread(_objectSpread({
    forcedColorAdjust: 'none'
  }, StyleSheet.absoluteFillObject), {}, {
    height: '70%',
    margin: 'auto',
    transitionDuration: '0.1s',
    width: '100%'
  }),
  thumb: {
    forcedColorAdjust: 'none',
    alignSelf: 'flex-start',
    borderRadius: '100%',
    boxShadow: thumbDefaultBoxShadow,
    start: '0%',
    transform: 'translateZ(0)',
    transitionDuration: '0.1s'
  },
  thumbActive: {
    insetInlineStart: '100%'
  },
  nativeControl: _objectSpread(_objectSpread({}, StyleSheet.absoluteFillObject), {}, {
    height: '100%',
    margin: 0,
    appearance: 'none',
    padding: 0,
    width: '100%'
  })
});
export default Switch;