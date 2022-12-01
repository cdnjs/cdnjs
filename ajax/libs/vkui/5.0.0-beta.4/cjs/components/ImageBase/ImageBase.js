"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBase = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _ImageBaseBadge = require("./ImageBaseBadge/ImageBaseBadge");
var _ImageBaseOverlay = require("./ImageBaseOverlay/ImageBaseOverlay");
var _excluded = ["alt", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "src", "srcSet", "useMap", "getRef", "size", "width", "height", "style", "className", "getRootRef", "badge", "overlay", "withBorder", "FallbackIcon", "children", "aria-label", "onClick"];
function getRelativeSizeOfFallbackIcon(imageSize) {
  if (imageSize <= 20) {
    return 12;
  } else if (imageSize <= 28) {
    return 16;
  } else if (imageSize <= 32) {
    return 20;
  } else if (imageSize <= 44) {
    return 24;
  } else if (imageSize <= 64) {
    return 28;
  }
  return 36;
}
/**
 * @see https://vkcom.github.io/VKUI/#/ImageBase
 */
var ImageBase = function ImageBase(_ref) {
  var alt = _ref.alt,
    crossOrigin = _ref.crossOrigin,
    decoding = _ref.decoding,
    loading = _ref.loading,
    referrerPolicy = _ref.referrerPolicy,
    sizes = _ref.sizes,
    src = _ref.src,
    srcSet = _ref.srcSet,
    useMap = _ref.useMap,
    getRef = _ref.getRef,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 24 : _ref$size,
    width = _ref.width,
    height = _ref.height,
    style = _ref.style,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    badgeProp = _ref.badge,
    overlayProp = _ref.overlay,
    _ref$withBorder = _ref.withBorder,
    withBorder = _ref$withBorder === void 0 ? true : _ref$withBorder,
    FallbackIcon = _ref.FallbackIcon,
    children = _ref.children,
    ariaLabel = _ref["aria-label"],
    onClick = _ref.onClick,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    loaded = _React$useState2[0],
    setLoaded = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    failed = _React$useState4[0],
    setFailed = _React$useState4[1];
  var hasSrc = src || srcSet;
  var needShowFallbackIcon = (failed || !hasSrc) && !children && FallbackIcon;
  var fallbackIconSize = needShowFallbackIcon ? getRelativeSizeOfFallbackIcon(size) : undefined;
  var fallbackIcon = needShowFallbackIcon ? /*#__PURE__*/React.createElement(FallbackIcon, {
    width: fallbackIconSize,
    height: fallbackIconSize,
    "aria-hidden": true
  }) : null;
  var badgeComponent = size >= 24 && badgeProp ? /*#__PURE__*/React.createElement(_ImageBaseBadge.ImageBaseBadge, (0, _extends2.default)({}, badgeProp, {
    imageSize: size
  })) : null;
  var overlayComponent = overlayProp ? /*#__PURE__*/React.createElement(_ImageBaseOverlay.ImageBaseOverlay, (0, _extends2.default)({}, typeof overlayProp === "boolean" ? undefined : overlayProp, {
    imageSize: size,
    onClick: onClick
  })) : null;
  var handleImageLoad = function handleImageLoad() {
    setLoaded(true);
    setFailed(false);
  };
  var handleImageError = function handleImageError() {
    setLoaded(false);
    setFailed(true);
  };
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: size,
      height: size
    }),
    className: (0, _classNames.classNamesString)(className, "vkuiImageBase", styles["ImageBase--size-".concat(size)], withBorder && "vkuiImageBase--withBorder", loaded && "vkuiImageBase--loaded"),
    role: hasSrc ? "img" : "presentation",
    "aria-label": ariaLabel,
    onClick: overlayComponent ? undefined : onClick
  }), hasSrc && /*#__PURE__*/React.createElement("img", {
    ref: getRef,
    alt: alt,
    className: "vkuiImageBase__img",
    crossOrigin: crossOrigin,
    decoding: decoding,
    loading: loading,
    referrerPolicy: referrerPolicy,
    sizes: sizes,
    src: src,
    srcSet: srcSet,
    useMap: useMap,
    width: width,
    height: height,
    onLoad: handleImageLoad,
    onError: handleImageError
  }), children, fallbackIcon, overlayComponent, badgeComponent);
};
exports.ImageBase = ImageBase;
var styles = {
  "ImageBase--size-16": "vkuiImageBase--size-16",
  "ImageBase--size-20": "vkuiImageBase--size-20",
  "ImageBase--size-24": "vkuiImageBase--size-24",
  "ImageBase--size-28": "vkuiImageBase--size-28",
  "ImageBase--size-32": "vkuiImageBase--size-32",
  "ImageBase--size-36": "vkuiImageBase--size-36",
  "ImageBase--size-40": "vkuiImageBase--size-40",
  "ImageBase--size-44": "vkuiImageBase--size-44",
  "ImageBase--size-48": "vkuiImageBase--size-48",
  "ImageBase--size-56": "vkuiImageBase--size-56",
  "ImageBase--size-64": "vkuiImageBase--size-64",
  "ImageBase--size-72": "vkuiImageBase--size-72",
  "ImageBase--size-80": "vkuiImageBase--size-80",
  "ImageBase--size-88": "vkuiImageBase--size-88",
  "ImageBase--size-96": "vkuiImageBase--size-96"
};
//# sourceMappingURL=ImageBase.js.map