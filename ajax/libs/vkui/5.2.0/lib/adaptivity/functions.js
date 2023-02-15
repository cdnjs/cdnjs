import { Platform } from '../platform';
import { SizeType, ViewHeight, ViewWidth } from './constants';
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
export function getSizeY(viewWidth, viewHeight, hasPointer) {
  if (viewWidth >= ViewWidth.SMALL_TABLET && hasPointer || viewHeight <= ViewHeight.EXTRA_SMALL) {
    return SizeType.COMPACT;
  }
  return SizeType.REGULAR;
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
export function tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform) {
  // см. https://github.com/VKCOM/VKUI/pull/2473
  var IS_VKCOM_CRUTCH = platform === Platform.VKCOM;
  if ((viewWidth === undefined || hasPointer === undefined) && (viewWidth === undefined || viewHeight === undefined) || hasPointer === undefined && viewHeight === undefined) {
    return IS_VKCOM_CRUTCH ? true : null;
  }
  var widthIsLikeDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
  var otherParametersIsLikeDesktop = hasPointer || (viewHeight !== undefined ? viewHeight >= ViewHeight.MEDIUM : false);
  return widthIsLikeDesktop && otherParametersIsLikeDesktop || IS_VKCOM_CRUTCH;
}
//# sourceMappingURL=functions.js.map