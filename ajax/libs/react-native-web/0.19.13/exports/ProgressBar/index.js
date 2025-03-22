/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["color", "indeterminate", "progress", "trackColor", "style"];
import * as React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';
var ProgressBar = /*#__PURE__*/React.forwardRef((props, ref) => {
  var _props$color = props.color,
    color = _props$color === void 0 ? '#1976D2' : _props$color,
    _props$indeterminate = props.indeterminate,
    indeterminate = _props$indeterminate === void 0 ? false : _props$indeterminate,
    _props$progress = props.progress,
    progress = _props$progress === void 0 ? 0 : _props$progress,
    _props$trackColor = props.trackColor,
    trackColor = _props$trackColor === void 0 ? 'transparent' : _props$trackColor,
    style = props.style,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var percentageProgress = progress * 100;
  var width = indeterminate ? '25%' : percentageProgress + "%";
  return /*#__PURE__*/React.createElement(View, _extends({}, other, {
    "aria-valuemax": 100,
    "aria-valuemin": 0,
    "aria-valuenow": indeterminate ? null : percentageProgress,
    ref: ref,
    role: "progressbar",
    style: [styles.track, style, {
      backgroundColor: trackColor
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor: color,
      width
    }, styles.progress, indeterminate && styles.animation]
  }));
});
ProgressBar.displayName = 'ProgressBar';
var styles = StyleSheet.create({
  track: {
    forcedColorAdjust: 'none',
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    forcedColorAdjust: 'none',
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationKeyframes: [{
      '0%': {
        transform: 'translateX(-100%)'
      },
      '100%': {
        transform: 'translateX(400%)'
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});
export default ProgressBar;