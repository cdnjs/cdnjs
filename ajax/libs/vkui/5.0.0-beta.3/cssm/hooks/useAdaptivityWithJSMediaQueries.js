import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { canUseDOM, hasMouse as hasMouseLib, hasHover as deviceHasHoverLib } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";
import { getOrDefault } from "../helpers/getOrDefault";
import { getViewWidthByMediaQueries, getViewHeightByMediaQueries, getSizeX, getSizeY, checkIsDesktop } from "../lib/adaptivity";
import { useMediaQueries } from "./useMediaQueries";
import { usePlatform } from "./usePlatform";
/**
 * Высчитывает и возвращает параметры адаптивности при изменении вьюпорта.
 *
 * Берёт в приоритет значения из `AdaptivityContext`.
 *
 * > ⚠ SSR
 * >
 * > Во избежания ошибок при гидрации, не используйте данный хук, если есть вероятность, что компонент будет отрендерен
 * > на стороне сервера.
 * >
 * > Лучше всего использовать для всплывающих окон, т.к. они вызываются только после загрузки
 * > страницы либо пользователем, либо программно.
 */
export var useAdaptivityWithJSMediaQueries = function useAdaptivityWithJSMediaQueries() {
  if (!canUseDOM) {
    console.error("[useAdaptivityWithJSMediaQueries] \u041F\u043E\u0445\u043E\u0436\u0435 \u0432\u044B \u043F\u044B\u0442\u0430\u0435\u0442\u0435\u0441\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0445\u0443\u043A \u0432\u043D\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.\n\n\u0412\u043E \u0438\u0437\u0431\u0435\u0436\u0430\u043D\u0438\u0435 \u043E\u0448\u0438\u0431\u043E\u043A \u043F\u0440\u0438 \u0433\u0438\u0434\u0440\u0430\u0446\u0438\u0438, \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F \u0438\u0437\u0431\u0435\u0433\u0430\u0442\u044C \u044D\u0442\u043E\u0433\u043E, \u0442.\u043A. \u043F\u0440\u0438 SSR \u043D\u0435\u0442 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430\u0445 \u044D\u043A\u0440\u0430\u043D\u0430.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 CSS Media Query \u0438\u043B\u0438 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0443 \u043F\u043E \u0442\u0438\u043F\u0443 https://github.com/artsy/fresnel.");
  }
  var _React$useContext = React.useContext(AdaptivityContext),
    viewWidthContext = _React$useContext.viewWidth,
    viewHeightContext = _React$useContext.viewHeight,
    sizeXContext = _React$useContext.sizeX,
    sizeYContext = _React$useContext.sizeY,
    hasMouseContext = _React$useContext.hasMouse,
    deviceHasHoverContext = _React$useContext.deviceHasHover;
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
    var hasMouse = getOrDefault(hasMouseContext, hasMouseLib);
    var deviceHasHover = getOrDefault(deviceHasHoverContext, deviceHasHoverLib);
    var viewWidth = getOrDefault(viewWidthContext, viewWidthLocal);
    var viewHeight = getOrDefault(viewHeightContext, viewHeightLocal);
    var sizeX = getOrDefault(sizeXContext, getSizeX(viewWidth));
    var sizeY = getOrDefault(sizeYContext, getSizeY(viewWidth, viewHeight, hasMouse));
    var isDesktop = checkIsDesktop(viewWidth, viewHeight, hasMouse, platform);
    return {
      viewWidth: viewWidth,
      viewHeight: viewHeight,
      sizeX: sizeX,
      sizeY: sizeY,
      hasMouse: hasMouse,
      deviceHasHover: deviceHasHover,
      isDesktop: isDesktop
    };
  }, [viewWidthLocal, viewHeightLocal, viewWidthContext, viewHeightContext, sizeXContext, sizeYContext, hasMouseContext, deviceHasHoverContext, platform]);
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
      mediaQueries.desktopPlus.addEventListener("change", handleMediaQuery);
      mediaQueries.tablet.addEventListener("change", handleMediaQuery);
      mediaQueries.smallTablet.addEventListener("change", handleMediaQuery);
      mediaQueries.mobile.addEventListener("change", handleMediaQuery);
    }
    if (!viewHeightContext) {
      mediaQueries.mediumHeight.addEventListener("change", handleMediaQuery);
      mediaQueries.mobileLandscapeHeight.addEventListener("change", handleMediaQuery);
    }
    return function () {
      mediaQueries.desktopPlus.removeEventListener("change", handleMediaQuery);
      mediaQueries.tablet.removeEventListener("change", handleMediaQuery);
      mediaQueries.smallTablet.removeEventListener("change", handleMediaQuery);
      mediaQueries.mobile.removeEventListener("change", handleMediaQuery);
      mediaQueries.mediumHeight.removeEventListener("change", handleMediaQuery);
      mediaQueries.mobileLandscapeHeight.removeEventListener("change", handleMediaQuery);
    };
  }, [mediaQueries, viewWidthContext, viewHeightContext]);
  return adaptivityProps;
};
//# sourceMappingURL=useAdaptivityWithJSMediaQueries.js.map