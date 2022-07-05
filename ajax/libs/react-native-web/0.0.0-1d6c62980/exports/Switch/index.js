import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
const _excluded = ["accessibilityLabel", "activeThumbColor", "activeTrackColor", "disabled", "onValueChange", "style", "thumbColor", "trackColor", "value"];

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
const emptyObject = {};
const thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
const thumbFocusedBoxShadow = thumbDefaultBoxShadow + ", 0 0 0 10px rgba(0,0,0,0.1)";
const defaultActiveTrackColor = '#A3D3CF';
const defaultTrackColor = '#939393';
const defaultDisabledTrackColor = '#D5D5D5';
const defaultActiveThumbColor = '#009688';
const defaultThumbColor = '#FAFAFA';
const defaultDisabledThumbColor = '#BDBDBD';
const Switch = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  const accessibilityLabel = props.accessibilityLabel,
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

  const thumbRef = React.useRef(null);

  function handleChange(event) {
    if (onValueChange != null) {
      onValueChange(event.nativeEvent.target.checked);
    }
  }

  function handleFocusState(event) {
    const isFocused = event.nativeEvent.type === 'focus';
    const boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;

    if (thumbRef.current != null) {
      thumbRef.current.style.boxShadow = boxShadow;
    }
  }

  const _StyleSheet$flatten = StyleSheet.flatten(style),
        styleHeight = _StyleSheet$flatten.height,
        styleWidth = _StyleSheet$flatten.width;

  const height = styleHeight || '20px';
  const minWidth = multiplyStyleLengthValue(height, 2);
  const width = styleWidth > minWidth ? styleWidth : minWidth;
  const trackBorderRadius = multiplyStyleLengthValue(height, 0.5);

  const trackCurrentColor = function () {
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

  const thumbCurrentColor = value ? activeThumbColor !== null && activeThumbColor !== void 0 ? activeThumbColor : defaultActiveThumbColor : thumbColor !== null && thumbColor !== void 0 ? thumbColor : defaultThumbColor;
  const thumbHeight = height;
  const thumbWidth = thumbHeight;
  const rootStyle = [styles.root, style, disabled && styles.cursorDefault, {
    height,
    width
  }];

  const disabledTrackColor = function () {
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

  const disabledThumbColor = function () {
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

  const trackStyle = [styles.track, {
    backgroundColor: disabled ? disabledTrackColor : trackCurrentColor,
    borderRadius: trackBorderRadius
  }];
  const thumbStyle = [styles.thumb, value && styles.thumbActive, {
    backgroundColor: disabled ? disabledThumbColor : thumbCurrentColor,
    height: thumbHeight,
    marginStart: value ? multiplyStyleLengthValue(thumbWidth, -1) : 0,
    width: thumbWidth
  }];
  const nativeControl = createElement('input', {
    accessibilityLabel,
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
const styles = StyleSheet.create({
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
    transform: [{
      translateZ: 0
    }],
    transitionDuration: '0.1s'
  },
  thumbActive: {
    start: '100%'
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