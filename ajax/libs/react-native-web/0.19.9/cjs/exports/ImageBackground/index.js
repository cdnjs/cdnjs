"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _Image = _interopRequireDefault(require("../Image"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _View = _interopRequireDefault(require("../View"));
var _excluded = ["children", "style", "imageStyle", "imageRef"];
var emptyObject = {};

/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */
var ImageBackground = /*#__PURE__*/(0, React.forwardRef)((props, forwardedRef) => {
  var children = props.children,
    _props$style = props.style,
    style = _props$style === void 0 ? emptyObject : _props$style,
    imageStyle = props.imageStyle,
    imageRef = props.imageRef,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _StyleSheet$flatten = _StyleSheet.default.flatten(style),
    height = _StyleSheet$flatten.height,
    width = _StyleSheet$flatten.width;
  return /*#__PURE__*/React.createElement(_View.default, {
    ref: forwardedRef,
    style: style
  }, /*#__PURE__*/React.createElement(_Image.default, (0, _extends2.default)({}, rest, {
    ref: imageRef,
    style: [{
      // Temporary Workaround:
      // Current (imperfect yet) implementation of <Image> overwrites width and height styles
      // (which is not quite correct), and these styles conflict with explicitly set styles
      // of <ImageBackground> and with our internal layout model here.
      // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
      // This workaround should be removed after implementing proper support of
      // intrinsic content size of the <Image>.
      width,
      height,
      zIndex: -1
    }, _StyleSheet.default.absoluteFill, imageStyle]
  })), children);
});
ImageBackground.displayName = 'ImageBackground';
var _default = ImageBackground;
exports.default = _default;
module.exports = exports.default;