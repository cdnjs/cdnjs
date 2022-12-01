import * as React from "react";
import { classNamesString } from "../../../lib/classNames";
import "./ImageBaseBadge.module.css";
function getRelativeSizeOfIcon(imageSize) {
  if (imageSize <= 36) {
    return 12;
  } else if (imageSize <= 48) {
    return 16;
  } else if (imageSize <= 64) {
    return 20;
  }
  return 24;
}
export var ImageBaseBadge = function ImageBaseBadge(_ref) {
  var imageSize = _ref.imageSize,
    _ref$background = _ref.background,
    background = _ref$background === void 0 ? "shadow" : _ref$background,
    className = _ref.className,
    Icon = _ref.Icon;
  var iconSize = getRelativeSizeOfIcon(imageSize);
  return /*#__PURE__*/React.createElement("div", {
    className: classNamesString("vkuiImageBaseBadge", styles["ImageBaseBadge--background-".concat(background)], className)
  }, /*#__PURE__*/React.createElement(Icon, {
    width: iconSize,
    height: iconSize,
    "aria-hidden": true
  }));
};
var styles = {
  "ImageBaseBadge--background-stroke": "vkuiImageBaseBadge--background-stroke",
  "ImageBaseBadge--background-shadow": "vkuiImageBaseBadge--background-shadow"
};
//# sourceMappingURL=ImageBaseBadge.js.map