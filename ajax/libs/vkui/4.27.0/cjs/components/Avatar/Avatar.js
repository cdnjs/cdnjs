"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AVATAR_DEFAULT_SIZE = exports.AVATAR_DEFAULT_SHADOW = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _excluded = ["alt", "crossOrigin", "decoding", "height", "loading", "referrerPolicy", "sizes", "src", "srcSet", "useMap", "width", "getRef", "size", "shadow", "mode", "className", "children", "getRootRef", "style", "aria-label", "badge", "overlayIcon", "overlayMode", "overlayAction", "onClick"];
var AVATAR_DEFAULT_SIZE = 48;
exports.AVATAR_DEFAULT_SIZE = AVATAR_DEFAULT_SIZE;
var AVATAR_DEFAULT_SHADOW = true;
exports.AVATAR_DEFAULT_SHADOW = AVATAR_DEFAULT_SHADOW;

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
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? AVATAR_DEFAULT_SIZE : _ref$size,
      _ref$shadow = _ref.shadow,
      shadow = _ref$shadow === void 0 ? AVATAR_DEFAULT_SHADOW : _ref$shadow,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      className = _ref.className,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      style = _ref.style,
      ariaLabel = _ref["aria-label"],
      badge = _ref.badge,
      overlayIcon = _ref.overlayIcon,
      _ref$overlayMode = _ref.overlayMode,
      overlayMode = _ref$overlayMode === void 0 ? "light" : _ref$overlayMode,
      passedOverlayAction = _ref.overlayAction,
      onClick = _ref.onClick,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      hasMouse = _useAdaptivity.hasMouse;

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      failedImage = _React$useState2[0],
      setFailedImage = _React$useState2[1];

  var overlayAction = passedOverlayAction !== null && passedOverlayAction !== void 0 ? passedOverlayAction : hasMouse ? "hover" : "always";

  var onImageError = function onImageError() {
    setFailedImage(true);
  };

  var onImageLoad = function onImageLoad() {
    setFailedImage(false);
  };

  var borderRadius = "50%";

  switch (mode) {
    case "image":
      size < 64 && (borderRadius = 4);
      size >= 64 && size < 96 && (borderRadius = 6);
      size >= 96 && (borderRadius = 8);
      break;

    case "app":
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
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Avatar", platform), "Avatar--type-".concat(mode), "Avatar--sz-".concat(size), {
      "Avatar--shadow": shadow,
      "Avatar--failed": failedImage
    }),
    className: className,
    ref: getRootRef,
    role: hasSrc ? "img" : "presentation",
    "aria-label": alt || ariaLabel,
    onClick: !overlayIcon ? onClick : undefined,
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
  }, children), overlayIcon && (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    Component: "button",
    vkuiClass: (0, _classNames.classNames)("Avatar__overlay", {
      "Avatar__overlay--visible": overlayAction === "always",
      "Avatar__overlay--light": overlayMode === "light",
      "Avatar__overlay--dark": overlayMode === "dark"
    }),
    hoverMode: "Avatar__overlay--visible",
    focusVisibleMode: "Avatar__overlay--focus-visible",
    hasActive: false,
    onClick: onClick
  }, overlayIcon), badge && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)("Avatar__badge", {
      "Avatar__badge--large": size >= 96,
      "Avatar__badge--shadow": badge !== "online" && badge !== "online-mobile"
    })
  }, badge === "online" ? (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Avatar__badge-online"
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon12Circle, {
    width: size >= 72 ? 15 : 12,
    height: size >= 72 ? 15 : 12
  })) : badge === "online-mobile" ? (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Avatar__badge-online-mobile"
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon12OnlineMobile, {
    width: size >= 72 ? 9 : 8,
    height: size >= 72 ? 15 : 12
  })) : badge));
}; // eslint-disable-next-line import/no-default-export


var _default = Avatar;
exports.default = _default;
//# sourceMappingURL=Avatar.js.map