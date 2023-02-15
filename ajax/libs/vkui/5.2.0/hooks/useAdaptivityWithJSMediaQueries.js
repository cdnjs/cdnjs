import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import { canUseDOM, hasMouse as hasPointerLib, hasHover as hasHoverLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { getOrDefault } from '../helpers/getOrDefault';
import { getViewWidthByMediaQueries, getViewHeightByMediaQueries, getSizeX, getSizeY, tryToCheckIsDesktop } from '../lib/adaptivity';
import { useMediaQueries } from './useMediaQueries';
import { usePlatform } from './usePlatform';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../lib/matchMedia';
/**
 * Высчитывает и возвращает параметры адаптивности при изменении вьюпорта.
 *
 * Берёт в приоритет значения из `AdaptivityContext`.
 *
 * > ⚠ SSR
 * >
 * > Во избежания ошибок при гидратации, не используйте данный хук, если есть вероятность, что компонент будет отрендерен
 * > на стороне сервера.
 * >
 * > Лучше всего использовать для всплывающих окон, т.к. они вызываются только после загрузки
 * > страницы либо пользователем, либо программно.
 */
export var useAdaptivityWithJSMediaQueries = function useAdaptivityWithJSMediaQueries() {
  if (!canUseDOM) {
    console.error("[useAdaptivityWithJSMediaQueries] \u041F\u043E\u0445\u043E\u0436\u0435, \u0432\u044B \u043F\u044B\u0442\u0430\u0435\u0442\u0435\u0441\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0445\u0443\u043A \u0432\u043D\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.\n\n\u041F\u043E\u0441\u0442\u0430\u0440\u0430\u0439\u0442\u0435\u0441\u044C \u044D\u0442\u043E\u0433\u043E \u0438\u0437\u0431\u0435\u0433\u0430\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u043D\u0435 \u0431\u044B\u043B\u043E \u043E\u0448\u0438\u0431\u043E\u043A \u043F\u0440\u0438 \u0433\u0438\u0434\u0440\u0430\u0442\u0430\u0446\u0438\u0438: \u043F\u0440\u0438 SSR \u043D\u0435\u0442 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430\u0445 \u044D\u043A\u0440\u0430\u043D\u0430.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 CSS Media Query \u0438\u043B\u0438 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0443 \u043F\u043E \u0442\u0438\u043F\u0443 https://github.com/artsy/fresnel.");
  }
  var _React$useContext = React.useContext(AdaptivityContext),
    viewWidthContext = _React$useContext.viewWidth,
    viewHeightContext = _React$useContext.viewHeight,
    sizeXContext = _React$useContext.sizeX,
    sizeYContext = _React$useContext.sizeY,
    hasPointerContext = _React$useContext.hasPointer,
    hasHoverContext = _React$useContext.hasHover;
  var platform = usePlatform();
  var mediaQueries = useMediaQueries();
  var _React$useState = React.useState(function () {
      return [getOrDefault(viewWidthContext, getViewWidthByMediaQueries(mediaQueries)), getOrDefault(viewHeightContext, getViewHeightByMediaQueries(mediaQueries))];
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    _React$useState2$ = _slicedToArray(_React$useState2[0], 2),
    viewWidthLocal = _React$useState2$[0],
    viewHeightLocal = _React$useState2$[1],
    setViewSizeLocal = _React$useState2[1];
  var adaptivityProps = React.useMemo(function () {
    var hasPointer = getOrDefault(hasPointerContext, hasPointerLib);
    var hasHover = getOrDefault(hasHoverContext, hasHoverLib);
    var viewWidth = getOrDefault(viewWidthContext, viewWidthLocal);
    var viewHeight = getOrDefault(viewHeightContext, viewHeightLocal);
    var sizeX = getOrDefault(sizeXContext, getSizeX(viewWidth));
    var sizeY = getOrDefault(sizeYContext, getSizeY(viewWidth, viewHeight, hasPointer));
    var isDesktop = tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform);
    return {
      viewWidth: viewWidth,
      viewHeight: viewHeight,
      sizeX: sizeX,
      sizeY: sizeY,
      hasPointer: hasPointer,
      hasHover: hasHover,
      isDesktop: isDesktop
    };
  }, [viewWidthLocal, viewHeightLocal, viewWidthContext, viewHeightContext, sizeXContext, sizeYContext, hasPointerContext, hasHoverContext, platform]);
  React.useEffect(function () {
    var handleMediaQuery = function handleMediaQuery() {
      setViewSizeLocal(function (prevSizeLocal) {
        var newViewWidthLocal = getOrDefault(viewWidthContext, getViewWidthByMediaQueries(mediaQueries));
        var newViewHeightLocal = getOrDefault(viewHeightContext, getViewHeightByMediaQueries(mediaQueries));
        var _prevSizeLocal = _slicedToArray(prevSizeLocal, 2),
          prevViewWidthLocal = _prevSizeLocal[0],
          prevViewHeightLocal = _prevSizeLocal[1];
        if (prevViewWidthLocal !== newViewWidthLocal || prevViewHeightLocal !== newViewHeightLocal) {
          return [newViewWidthLocal, newViewHeightLocal];
        }
        return prevSizeLocal;
      });
    };
    if (!viewWidthContext) {
      [mediaQueries.desktopPlus, mediaQueries.tablet, mediaQueries.smallTablet, mediaQueries.mobile].forEach(function (matchMediaListener) {
        return matchMediaListAddListener(matchMediaListener, handleMediaQuery);
      });
    }
    if (!viewHeightContext) {
      [mediaQueries.mediumHeight, mediaQueries.mobileLandscapeHeight].forEach(function (matchMediaListener) {
        return matchMediaListAddListener(matchMediaListener, handleMediaQuery);
      });
    }
    return function () {
      [mediaQueries.desktopPlus, mediaQueries.tablet, mediaQueries.smallTablet, mediaQueries.mobile, mediaQueries.mediumHeight, mediaQueries.mobileLandscapeHeight].forEach(function (matchMediaListener) {
        return matchMediaListRemoveListener(matchMediaListener, handleMediaQuery);
      });
    };
  }, [mediaQueries, viewWidthContext, viewHeightContext]);
  return adaptivityProps;
};
//# sourceMappingURL=useAdaptivityWithJSMediaQueries.js.map