import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { hasMouse as hasMouseLib, hasHover as deviceHasHoverLib } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";
import { getOrDefault } from "../helpers/getOrDefault";
import { getViewWidthByMediaQueries, getViewHeightByMediaQueries, getSizeX, getSizeY, checkIsDesktop } from "../lib/adaptivity";
import { useMediaQueries } from "./useMediaQueries";
import { usePlatform } from "./usePlatform";

/**
 * Высчитывает и возвращает параметры адаптивности при изменении вьюпорта.
 *
 * Берёт в приоритет значения из `AdaptivityContext.
 *
 * > ⚠ SSR
 * >
 * > Во избежания ошибок при гидрации, не используйте данный хук, если есть вероятность, что компонент будет отрендерен
 * > на стороне сервера.
 * >
 * > Лучше всего использовать для всплывающих окон, т.к. они вызывается только после загрузки
 * > страницы либо пользователем, либо программно.
 */
export var useAdaptivityWithMediaQueries = function useAdaptivityWithMediaQueries() {
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
//# sourceMappingURL=useAdaptivityWithMediaQueries.js.map