import { SizeType, ViewWidth, tryToCheckIsDesktop } from '../../lib/adaptivity';
export var getAdaptiveSizeType = function getAdaptiveSizeType(type, compactClassNames, regularClassNames) {
  return {
    compact: type === undefined ? compactClassNames.mq : type === SizeType.COMPACT ? compactClassNames[type] : false,
    regular: type === undefined ? regularClassNames.mq : type === SizeType.REGULAR ? regularClassNames[type] : false
  };
};
export var getAdaptiveViewWidth = function getAdaptiveViewWidth(viewWidth, viewWidthClassNames) {
  return {
    tabletMinus: viewWidth === undefined ? viewWidthClassNames.tabletMinus.mq : viewWidth < ViewWidth.TABLET ? viewWidthClassNames.tabletMinus.forced : false,
    tabletPlus: viewWidth === undefined ? viewWidthClassNames.tabletPlus.mq : viewWidth >= ViewWidth.TABLET ? viewWidthClassNames.tabletPlus.forced : false
  };
};
export var getAdaptiveDeviceType = function getAdaptiveDeviceType(viewWidth, viewHeight, hasPointer, platform, deviceTypeClassNames) {
  var isDesktop = tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform);
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
//# sourceMappingURL=helpers.js.map