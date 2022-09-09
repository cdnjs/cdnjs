"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBaseBadge = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _classNames = require("../../../lib/classNames");

var styles = {
  "ImageBaseBadge": "vkuiImageBaseBadge",
  "ImageBaseBadge--background-stroke": "vkuiImageBaseBadge--background-stroke",
  "ImageBaseBadge--background-shadow": "vkuiImageBaseBadge--background-shadow"
};

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

var ImageBaseBadge = function ImageBaseBadge(_ref) {
  var imageSize = _ref.imageSize,
      _ref$background = _ref.background,
      background = _ref$background === void 0 ? "shadow" : _ref$background,
      className = _ref.className,
      Icon = _ref.Icon;
  var iconSize = getRelativeSizeOfIcon(imageSize);
  return (0, _jsxRuntime.createScopedElement)("div", {
    className: (0, _classNames.classNamesString)(styles["ImageBaseBadge"], styles["ImageBaseBadge--background-".concat(background)], className)
  }, (0, _jsxRuntime.createScopedElement)(Icon, {
    width: iconSize,
    height: iconSize,
    "aria-hidden": true
  }));
};

exports.ImageBaseBadge = ImageBaseBadge;
//# sourceMappingURL=ImageBaseBadge.js.map