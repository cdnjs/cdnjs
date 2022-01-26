import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["alt", "crossOrigin", "decoding", "height", "loading", "referrerPolicy", "sizes", "src", "srcSet", "useMap", "width", "getRef", "size", "shadow", "mode", "className", "children", "getRootRef", "style", "aria-label", "badge", "overlayIcon", "overlayMode", "overlayAction", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Icon12Circle, Icon12OnlineMobile } from "@vkontakte/icons";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import Tappable from "../Tappable/Tappable";
export var AVATAR_DEFAULT_SIZE = 48;
export var AVATAR_DEFAULT_SHADOW = true;

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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      hasMouse = _useAdaptivity.hasMouse;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
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
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("Avatar", platform), "Avatar--type-".concat(mode), "Avatar--sz-".concat(size), {
      "Avatar--shadow": shadow,
      "Avatar--failed": failedImage
    }),
    className: className,
    ref: getRootRef,
    role: hasSrc ? "img" : "presentation",
    "aria-label": alt || ariaLabel,
    onClick: !overlayIcon ? onClick : undefined,
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: size,
      height: size,
      borderRadius: borderRadius
    })
  }), hasSrc && createScopedElement("img", {
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
  }), children && createScopedElement("div", {
    vkuiClass: "Avatar__children"
  }, children), overlayIcon && createScopedElement(Tappable, {
    Component: "button",
    vkuiClass: classNames("Avatar__overlay", {
      "Avatar__overlay--visible": overlayAction === "always",
      "Avatar__overlay--light": overlayMode === "light",
      "Avatar__overlay--dark": overlayMode === "dark"
    }),
    hoverMode: "Avatar__overlay--visible",
    focusVisibleMode: "Avatar__overlay--focus-visible",
    hasActive: false,
    onClick: onClick
  }, overlayIcon), badge && createScopedElement("div", {
    vkuiClass: classNames("Avatar__badge", {
      "Avatar__badge--large": size >= 96,
      "Avatar__badge--shadow": badge !== "online" && badge !== "online-mobile"
    })
  }, badge === "online" ? createScopedElement("div", {
    vkuiClass: "Avatar__badge-online"
  }, createScopedElement(Icon12Circle, {
    width: size >= 72 ? 15 : 12,
    height: size >= 72 ? 15 : 12
  })) : badge === "online-mobile" ? createScopedElement("div", {
    vkuiClass: "Avatar__badge-online-mobile"
  }, createScopedElement(Icon12OnlineMobile, {
    width: size >= 72 ? 9 : 8,
    height: size >= 72 ? 15 : 12
  })) : badge));
}; // eslint-disable-next-line import/no-default-export


export default Avatar;
//# sourceMappingURL=Avatar.js.map