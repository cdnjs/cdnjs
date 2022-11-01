"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBaseOverlay = void 0;
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _classNames = require("../../../lib/classNames");
var _useAppearance = require("../../../hooks/useAppearance");
var _useAdaptivity2 = require("../../../hooks/useAdaptivity");
var _Tappable = require("../../Tappable/Tappable");
function getRelativeSizeOfIcon(imageSize) {
  if (imageSize <= 20) {
    return 12;
  } else if (imageSize <= 24) {
    return 16;
  } else if (imageSize <= 28) {
    return 18;
  } else if (imageSize <= 40) {
    return 20;
  } else if (imageSize <= 48) {
    return 24;
  } else if (imageSize <= 88) {
    return 28;
  }
  return 32;
}
var ImageBaseOverlay = function ImageBaseOverlay(_ref) {
  var imageSize = _ref.imageSize,
    className = _ref.className,
    themeProp = _ref.theme,
    visibilityProp = _ref.visibility,
    _ref$Icon = _ref.Icon,
    Icon = _ref$Icon === void 0 ? _icons.Icon28AddOutline : _ref$Icon,
    onClick = _ref.onClick;
  var appearance = (0, _useAppearance.useAppearance)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    hasMouse = _useAdaptivity.hasMouse;
  var theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
  var visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasMouse ? "on-hover" : "always";
  var iconSize = getRelativeSizeOfIcon(imageSize);
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, {
    type: "button",
    Component: "button",
    className: (0, _classNames.classNamesString)("vkuiImageBaseOverlay", visibility === "always" && "vkuiImageBaseOverlay--visible", theme === "light" && "vkuiImageBaseOverlay--theme-light", theme === "dark" && "vkuiImageBaseOverlay--theme-dark", className),
    hasHover: visibility === "on-hover",
    hoverMode: visibility === "on-hover" ? "vkuiImageBaseOverlay--visible" : undefined,
    focusVisibleMode: "vkuiImageBaseOverlay--focus-visible",
    hasActive: false,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon, {
    width: iconSize,
    height: iconSize,
    "aria-hidden": true
  }));
};
exports.ImageBaseOverlay = ImageBaseOverlay;
//# sourceMappingURL=ImageBaseOverlay.js.map