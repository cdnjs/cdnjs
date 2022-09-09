import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["alt", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "src", "srcSet", "useMap", "getRef", "size", "width", "height", "style", "className", "getRootRef", "badge", "overlay", "FallbackIcon", "children", "aria-label", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { ImageBaseBadge } from "./ImageBaseBadge/ImageBaseBadge";
import { ImageBaseOverlay } from "./ImageBaseOverlay/ImageBaseOverlay";
var styles = {
  "ImageBase": "vkuiImageBase",
  "ImageBase__img": "vkuiImageBase__img",
  "ImageBase--loaded": "vkuiImageBase--loaded",
  "ImageBase__badge": "vkuiImageBase__badge",
  "ImageBase__badge--shift": "vkuiImageBase__badge--shift",
  "CellButton": "vkuiCellButton",
  "Icon": "vkuiIcon",
  "CellButton--mode-danger": "vkuiCellButton--mode-danger",
  "PanelHeader__before": "vkuiPanelHeader__before",
  "PanelHeader__after": "vkuiPanelHeader__after",
  "SimpleCell": "vkuiSimpleCell",
  "ImageBase--size-28": "vkuiImageBase--size-28",
  "ImageBase--size-32": "vkuiImageBase--size-32",
  "ImageBase--size-40": "vkuiImageBase--size-40",
  "ImageBase--size-48": "vkuiImageBase--size-48",
  "ImageBase--size-72": "vkuiImageBase--size-72",
  "SimpleCell--ios": "vkuiSimpleCell--ios",
  "SimpleCell--sizeY-compact": "vkuiSimpleCell--sizeY-compact",
  "SimpleCell--sizeY-none": "vkuiSimpleCell--sizeY-none"
};

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
      badgeProp = _ref.badge,
      overlayProp = _ref.overlay,
      FallbackIcon = _ref.FallbackIcon,
      children = _ref.children,
      ariaLabel = _ref["aria-label"],
      onClick = _ref.onClick,
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
  var needShowFallbackIcon = (failed || !hasSrc) && !children && FallbackIcon;
  var fallbackIconSize = needShowFallbackIcon ? getRelativeSizeOfFallbackIcon(size) : undefined;
  var fallbackIcon = needShowFallbackIcon ? createScopedElement(FallbackIcon, {
    width: fallbackIconSize,
    height: fallbackIconSize,
    "aria-hidden": true
  }) : null;
  var badgeComponent = size >= 24 && badgeProp ? createScopedElement(ImageBaseBadge, _extends({}, badgeProp, {
    imageSize: size
  })) : null;
  var overlayComponent = overlayProp ? createScopedElement(ImageBaseOverlay, _extends({}, typeof overlayProp === "boolean" ? undefined : overlayProp, {
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

  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: size,
      height: size
    }),
    className: classNamesString(className, styles["ImageBase"], styles["ImageBase--size-".concat(size)], loaded && styles["ImageBase--loaded"]),
    role: hasSrc ? "img" : "presentation",
    "aria-label": ariaLabel,
    onClick: overlayComponent ? undefined : onClick
  }), hasSrc && createScopedElement("img", {
    ref: getRef,
    alt: alt,
    className: styles["ImageBase__img"],
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
//# sourceMappingURL=ImageBase.js.map