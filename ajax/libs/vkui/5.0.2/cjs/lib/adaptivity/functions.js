"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSizeX = getSizeX;
exports.getSizeY = getSizeY;
exports.getViewHeightByMediaQueries = getViewHeightByMediaQueries;
exports.getViewWidthByMediaQueries = getViewWidthByMediaQueries;
exports.tryToCheckIsDesktop = tryToCheckIsDesktop;
var _platform = require("../platform");
var _constants = require("./constants");
function getViewWidthByMediaQueries(mediaQueries) {
  /* eslint-disable no-restricted-properties */
  if (mediaQueries.desktopPlus.matches) {
    return _constants.ViewWidth.DESKTOP;
  }
  if (mediaQueries.tablet.matches) {
    return _constants.ViewWidth.TABLET;
  }
  if (mediaQueries.smallTablet.matches) {
    return _constants.ViewWidth.SMALL_TABLET;
  }
  if (mediaQueries.mobile.matches) {
    return _constants.ViewWidth.MOBILE;
  }
  /* eslint-enable no-restricted-properties */
  return _constants.ViewWidth.SMALL_MOBILE;
}
function getViewHeightByMediaQueries(mediaQueries) {
  /* eslint-disable no-restricted-properties */
  if (mediaQueries.mediumHeight.matches) {
    return _constants.ViewHeight.MEDIUM;
  }
  if (mediaQueries.mobileLandscapeHeight.matches) {
    return _constants.ViewHeight.SMALL;
  }
  /* eslint-enable no-restricted-properties */
  return _constants.ViewHeight.EXTRA_SMALL;
}
function getSizeX(viewWidth) {
  return viewWidth <= _constants.ViewWidth.MOBILE ? _constants.SizeType.COMPACT : _constants.SizeType.REGULAR;
}
function getSizeY(viewWidth, viewHeight, hasPointer) {
  if (viewWidth >= _constants.ViewWidth.SMALL_TABLET && hasPointer || viewHeight <= _constants.ViewHeight.EXTRA_SMALL) {
    return _constants.SizeType.COMPACT;
  }
  return _constants.SizeType.REGULAR;
}

/**
 * Проверка на Desktop.
 *
 * Функция гарантировано вернёт `boolean` или `null` в зависимости от условий.
 *
 * Возвращаем `null` в случае, если у нас недостаточно данных, чтобы определить платформу.
 *
 * ⚠️ При передаче Platform.VKCOM всегда будет возвращать `true`.
 */

// prettier-ignore
function tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform) {
  // см. https://github.com/VKCOM/VKUI/pull/2473
  var IS_VKCOM_CRUTCH = platform === _platform.Platform.VKCOM;
  if ((viewWidth === undefined || hasPointer === undefined) && (viewWidth === undefined || viewHeight === undefined) || hasPointer === undefined && viewHeight === undefined) {
    return IS_VKCOM_CRUTCH ? true : null;
  }
  var widthIsLikeDesktop = viewWidth >= _constants.ViewWidth.SMALL_TABLET;
  var otherParametersIsLikeDesktop = hasPointer || (viewHeight !== undefined ? viewHeight >= _constants.ViewHeight.MEDIUM : false);
  return widthIsLikeDesktop && otherParametersIsLikeDesktop || IS_VKCOM_CRUTCH;
}
//# sourceMappingURL=functions.js.map