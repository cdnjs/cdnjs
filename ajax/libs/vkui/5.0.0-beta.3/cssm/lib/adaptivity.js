import { BREAKPOINTS, MEDIA_QUERIES } from "../shared/breakpoints";
import { Platform } from "./platform";

/**
 * Базовые параметры адаптивности.
 */
export var ViewWidth;
(function (ViewWidth) {
  ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
  ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
  ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
  ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
  ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth || (ViewWidth = {}));
export var ViewHeight;
(function (ViewHeight) {
  ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
  ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
  ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight || (ViewHeight = {}));
export var SizeType;

/**
 * Брейкпоинты.
 */
(function (SizeType) {
  SizeType["COMPACT"] = "compact";
  SizeType["REGULAR"] = "regular";
})(SizeType || (SizeType = {}));
export { BREAKPOINTS };

/**
 * Медиа выражения.
 */

export { MEDIA_QUERIES };

/**
 * Утилиты для определения текущих параметров адаптивности.
 */
export function getViewWidthByMediaQueries(mediaQueries) {
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
export function getViewHeightByMediaQueries(mediaQueries) {
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
export function getSizeX(viewWidth) {
  return viewWidth <= ViewWidth.MOBILE ? SizeType.COMPACT : SizeType.REGULAR;
}
export function getSizeY(viewWidth, viewHeight, hasMouse) {
  if (viewWidth >= ViewWidth.SMALL_TABLET && hasMouse || viewHeight <= ViewHeight.EXTRA_SMALL) {
    return SizeType.COMPACT;
  }
  return SizeType.REGULAR;
}
export function checkIsDesktop(viewWidth, viewHeight, hasMouse, platform) {
  return viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM) || platform === Platform.VKCOM;
}
//# sourceMappingURL=adaptivity.js.map