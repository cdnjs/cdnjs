"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _View = _interopRequireDefault(require("../View"));
var _excluded = ["animating", "color", "hidesWhenStopped", "size", "style"];
var createSvgCircle = style => /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "16",
  fill: "none",
  r: "14",
  strokeWidth: "4",
  style: style
});
var ActivityIndicator = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var _props$animating = props.animating,
    animating = _props$animating === void 0 ? true : _props$animating,
    _props$color = props.color,
    color = _props$color === void 0 ? '#1976D2' : _props$color,
    _props$hidesWhenStopp = props.hidesWhenStopped,
    hidesWhenStopped = _props$hidesWhenStopp === void 0 ? true : _props$hidesWhenStopp,
    _props$size = props.size,
    size = _props$size === void 0 ? 'small' : _props$size,
    style = props.style,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var svg = /*#__PURE__*/React.createElement("svg", {
    height: "100%",
    viewBox: "0 0 32 32",
    width: "100%"
  }, createSvgCircle({
    stroke: color,
    opacity: 0.2
  }), createSvgCircle({
    stroke: color,
    strokeDasharray: 80,
    strokeDashoffset: 60
  }));
  return /*#__PURE__*/React.createElement(_View.default, (0, _extends2.default)({}, other, {
    "aria-valuemax": 1,
    "aria-valuemin": 0,
    ref: forwardedRef,
    role: "progressbar",
    style: [styles.container, style]
  }), /*#__PURE__*/React.createElement(_View.default, {
    children: svg,
    style: [typeof size === 'number' ? {
      height: size,
      width: size
    } : indicatorSizes[size], styles.animation, !animating && styles.animationPause, !animating && hidesWhenStopped && styles.hidesWhenStopped]
  }));
});
ActivityIndicator.displayName = 'ActivityIndicator';
var styles = _StyleSheet.default.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hidesWhenStopped: {
    visibility: 'hidden'
  },
  animation: {
    animationDuration: '0.75s',
    animationKeyframes: [{
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  animationPause: {
    animationPlayState: 'paused'
  }
});
var indicatorSizes = _StyleSheet.default.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});
var _default = ActivityIndicator;
exports.default = _default;
module.exports = exports.default;