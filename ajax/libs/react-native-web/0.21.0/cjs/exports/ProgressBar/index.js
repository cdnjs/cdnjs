"use strict";
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _View = _interopRequireDefault(require("../View"));
var _excluded = ["color", "indeterminate", "progress", "trackColor", "style"];
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
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var percentageProgress = progress * 100;
  var width = indeterminate ? '25%' : percentageProgress + "%";
  return /*#__PURE__*/React.createElement(_View.default, (0, _extends2.default)({}, other, {
    "aria-valuemax": 100,
    "aria-valuemin": 0,
    "aria-valuenow": indeterminate ? null : percentageProgress,
    ref: ref,
    role: "progressbar",
    style: [styles.track, style, {
      backgroundColor: trackColor
    }]
  }), /*#__PURE__*/React.createElement(_View.default, {
    style: [{
      backgroundColor: color,
      width
    }, styles.progress, indeterminate && styles.animation]
  }));
});
ProgressBar.displayName = 'ProgressBar';
var styles = _StyleSheet.default.create({
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
var _default = exports.default = ProgressBar;
module.exports = exports.default;