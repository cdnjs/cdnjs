import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["alt", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "src", "srcSet", "useMap", "getRef", "size", "width", "height", "style", "className", "getRootRef", "withBorder", "fallbackIcon", "children", "aria-label", "onClick", "onLoad", "onError"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBaseBadge } from './ImageBaseBadge/ImageBaseBadge';
import { ImageBaseOverlay } from './ImageBaseOverlay/ImageBaseOverlay';
import { ImageBaseContext } from './context';
import { validateSize, validateFallbackIcon } from './validators';
export { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from './helpers';
export { ImageBaseContext };
/**
 * @see https://vkcom.github.io/VKUI/#/ImageBase
 */
export var ImageBase = function ImageBase(_ref) {
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
    _ref$withBorder = _ref.withBorder,
    withBorder = _ref$withBorder === void 0 ? true : _ref$withBorder,
    fallbackIconProp = _ref['fallbackIcon'],
    children = _ref.children,
    ariaLabel = _ref['aria-label'],
    onClick = _ref.onClick,
    onLoad = _ref.onLoad,
    onError = _ref.onError,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    loaded = _React$useState2[0],
    setLoaded = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    failed = _React$useState4[0],
    setFailed = _React$useState4[1];
  var hasSrc = src || srcSet;
  var needShowFallbackIcon = (failed || !hasSrc) && /*#__PURE__*/React.isValidElement(fallbackIconProp);
  var fallbackIcon = needShowFallbackIcon ? fallbackIconProp : null;
  if (process.env.NODE_ENV === 'development') {
    validateSize(size);
    if (fallbackIcon) {
      validateFallbackIcon(size, {
        name: 'fallbackIcon',
        value: fallbackIcon
      });
    }
  }
  var handleImageLoad = function handleImageLoad(event) {
    setLoaded(true);
    setFailed(false);
    onLoad === null || onLoad === void 0 ? void 0 : onLoad(event);
  };
  var handleImageError = function handleImageError(event) {
    setLoaded(false);
    setFailed(true);
    onError === null || onError === void 0 ? void 0 : onError(event);
  };
  return /*#__PURE__*/React.createElement(ImageBaseContext.Provider, {
    value: {
      size: size
    }
  }, /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: getRootRef,
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: size,
      height: size
    }),
    className: classNames(className, "vkuiImageBase", styles["ImageBase--size-".concat(size)], withBorder && "vkuiImageBase--withBorder", loaded && "vkuiImageBase--loaded"),
    role: hasSrc ? 'img' : 'presentation',
    "aria-label": ariaLabel,
    onClick: onClick
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
  }), fallbackIcon && /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiImageBase__fallback")
  }, fallbackIcon), children));
};
ImageBase.Badge = ImageBaseBadge;
ImageBase.Overlay = ImageBaseOverlay;
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