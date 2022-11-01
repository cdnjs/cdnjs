"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BREAKPOINTS", {
  enumerable: true,
  get: function get() {
    return _breakpoints.BREAKPOINTS;
  }
});
Object.defineProperty(exports, "MEDIA_QUERIES", {
  enumerable: true,
  get: function get() {
    return _breakpoints.MEDIA_QUERIES;
  }
});
exports.ViewWidth = exports.ViewHeight = exports.SizeType = void 0;
exports.checkIsDesktop = checkIsDesktop;
exports.getSizeX = getSizeX;
exports.getSizeY = getSizeY;
exports.getViewHeightByMediaQueries = getViewHeightByMediaQueries;
exports.getViewWidthByMediaQueries = getViewWidthByMediaQueries;
var _breakpoints = require("../shared/breakpoints");
var _platform = require("./platform");
/**
 * Базовые параметры адаптивности.
 */
var ViewWidth;
exports.ViewWidth = ViewWidth;
(function (ViewWidth) {
  ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
  ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
  ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
  ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
  ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth || (exports.ViewWidth = ViewWidth = {}));
var ViewHeight;
exports.ViewHeight = ViewHeight;
(function (ViewHeight) {
  ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
  ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
  ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight || (exports.ViewHeight = ViewHeight = {}));
var SizeType;
/**
 * Брейкпоинты.
 */
exports.SizeType = SizeType;
(function (SizeType) {
  SizeType["COMPACT"] = "compact";
  SizeType["REGULAR"] = "regular";
})(SizeType || (exports.SizeType = SizeType = {}));
/**
 * Утилиты для определения текущих параметров адаптивности.
 */
function getViewWidthByMediaQueries(mediaQueries) {
  /* eslint-disable no-restricted-properties */
  if (mediaQueries.desktopPlus.matches) {
    return ViewWidth.DESKTOP;
  }
  if (mediaQueries.tablet.matches) {
    return ViewWidth.TABLET;
  }
  if (mediaQueries.smallTablet.matches) {
    return ViewWidth.SMALL_TABLET;
  }
  if (mediaQueries.mobile.matches) {
    return ViewWidth.MOBILE;
  }
  /* eslint-enable no-restricted-properties */
  return ViewWidth.SMALL_MOBILE;
}
function getViewHeightByMediaQueries(mediaQueries) {
  /* eslint-disable no-restricted-properties */
  if (mediaQueries.mediumHeight.matches) {
    return ViewHeight.MEDIUM;
  }
  if (mediaQueries.mobileLandscapeHeight.matches) {
    return ViewHeight.SMALL;
  }
  /* eslint-enable no-restricted-properties */
  return ViewHeight.EXTRA_SMALL;
}
function getSizeX(viewWidth) {
  return viewWidth <= ViewWidth.MOBILE ? SizeType.COMPACT : SizeType.REGULAR;
}
function getSizeY(viewWidth, viewHeight, hasMouse) {
  if (viewWidth >= ViewWidth.SMALL_TABLET && hasMouse || viewHeight <= ViewHeight.EXTRA_SMALL) {
    return SizeType.COMPACT;
  }
  return SizeType.REGULAR;
}
function checkIsDesktop(viewWidth, viewHeight, hasMouse, platform) {
  return viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM) || platform === _platform.Platform.VKCOM;
}
//# sourceMappingURL=adaptivity.js.map