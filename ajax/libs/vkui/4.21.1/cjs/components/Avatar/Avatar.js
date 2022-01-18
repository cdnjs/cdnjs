"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["alt", "crossOrigin", "decoding", "height", "loading", "referrerPolicy", "sizes", "src", "srcSet", "useMap", "width", "getRef", "size", "shadow", "mode", "className", "children", "getRootRef", "style", "aria-label"];

var Avatar = function Avatar(_ref) {
  var alt = _ref.alt,
      crossOrigin = _ref.crossOrigin,
      decoding = _ref.decoding,
      height = _ref.height,
      loading = _ref.loading,
      referrerPolicy = _ref.referrerPolicy,
      sizes = _ref.sizes,
      src = _ref.src,
      srcSet = _ref.srcSet,
      useMap = _ref.useMap,
      width = _ref.width,
      getRef = _ref.getRef,
      size = _ref.size,
      shadow = _ref.shadow,
      mode = _ref.mode,
      className = _ref.className,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      style = _ref.style,
      ariaLabel = _ref['aria-label'],
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      failedImage = _React$useState2[0],
      setFailedImage = _React$useState2[1];

  var onImageError = function onImageError() {
    setFailedImage(true);
  };

  var onImageLoad = function onImageLoad() {
    setFailedImage(false);
  };

  var borderRadius = '50%';

  switch (mode) {
    case 'image':
      size < 64 && (borderRadius = 4);
      size >= 64 && size < 96 && (borderRadius = 6);
      size >= 96 && (borderRadius = 8);
      break;

    case 'app':
      size <= 40 && (borderRadius = 8);
      size > 40 && size < 56 && (borderRadius = 10);
      size >= 56 && size < 64 && (borderRadius = 12);
      size >= 64 && size < 84 && (borderRadius = 16);
      size >= 84 && (borderRadius = 18);
      break;

    default:
      break;
  }

  var hasSrc = src || srcSet;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Avatar', platform), "Avatar--type-".concat(mode), "Avatar--sz-".concat(size), {
      'Avatar--shadow': shadow,
      'Avatar--failed': failedImage
    }),
    className: className,
    ref: getRootRef,
    role: hasSrc ? 'img' : 'presentation',
    "aria-label": alt || ariaLabel,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: size,
      height: size,
      borderRadius: borderRadius
    })
  }), hasSrc && (0, _jsxRuntime.createScopedElement)("img", {
    crossOrigin: crossOrigin,
    decoding: decoding,
    height: height,
    loading: loading,
    referrerPolicy: referrerPolicy,
    sizes: sizes,
    src: src,
    srcSet: srcSet,
    useMap: useMap,
    width: width,
    ref: getRef,
    onError: onImageError,
    onLoad: onImageLoad,
    vkuiClass: "Avatar__img",
    alt: ""
  }), children && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Avatar__children"
  }, children));
};

Avatar.defaultProps = {
  size: 48,
  mode: 'default',
  shadow: true
};
var _default = Avatar;
exports.default = _default;
//# sourceMappingURL=Avatar.js.map