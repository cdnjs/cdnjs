"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdaptiveViewWidth = exports.getAdaptiveSizeType = exports.getAdaptiveDeviceType = void 0;
var _adaptivity = require("../../lib/adaptivity");
var getAdaptiveSizeType = function getAdaptiveSizeType(type, compactClassNames, regularClassNames) {
  return {
    compact: type === undefined ? compactClassNames.mq : type === _adaptivity.SizeType.COMPACT ? compactClassNames[type] : false,
    regular: type === undefined ? regularClassNames.mq : type === _adaptivity.SizeType.REGULAR ? regularClassNames[type] : false
  };
};
exports.getAdaptiveSizeType = getAdaptiveSizeType;
var getAdaptiveViewWidth = function getAdaptiveViewWidth(viewWidth, viewWidthClassNames) {
  return {
    tabletMinus: viewWidth === undefined ? viewWidthClassNames.tabletMinus.mq : viewWidth < _adaptivity.ViewWidth.TABLET ? viewWidthClassNames.tabletMinus.forced : false,
    tabletPlus: viewWidth === undefined ? viewWidthClassNames.tabletPlus.mq : viewWidth >= _adaptivity.ViewWidth.TABLET ? viewWidthClassNames.tabletPlus.forced : false
  };
};
exports.getAdaptiveViewWidth = getAdaptiveViewWidth;
var getAdaptiveDeviceType = function getAdaptiveDeviceType(viewWidth, viewHeight, hasPointer, platform, deviceTypeClassNames) {
  var isDesktop = (0, _adaptivity.tryToCheckIsDesktop)(viewWidth, viewHeight, hasPointer, platform);
  if (isDesktop === null) {
    return {
      mobile: deviceTypeClassNames.mobile.mq,
      desktop: deviceTypeClassNames.desktop.mq
    };
  }
  if (isDesktop) {
    return {
      mobile: false,
      desktop: deviceTypeClassNames.desktop.forced
    };
  }
  return {
    mobile: deviceTypeClassNames.mobile.forced,
    desktop: false
  };
};
exports.getAdaptiveDeviceType = getAdaptiveDeviceType;
//# sourceMappingURL=helpers.js.map