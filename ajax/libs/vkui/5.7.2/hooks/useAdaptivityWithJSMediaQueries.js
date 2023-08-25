import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { canUseDOM, hasHover as hasHoverLib, hasMouse as hasPointerLib } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";
import { getOrDefault } from "../helpers/getOrDefault";
import { getSizeX, getSizeY, getViewHeightByMediaQueries, getViewWidthByMediaQueries, tryToCheckIsDesktop } from "../lib/adaptivity";
import { matchMediaListAddListener, matchMediaListRemoveListener } from "../lib/matchMedia";
import { useMediaQueries } from "./useMediaQueries";
import { usePlatform } from "./usePlatform";
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
 */ export var useAdaptivityWithJSMediaQueries = function() {
    if (!canUseDOM) {
        console.error("[useAdaptivityWithJSMediaQueries] Похоже, вы пытаетесь использовать хук вне браузера.\n\nПостарайтесь этого избегать, чтобы не было ошибок при гидратации: при SSR нет информации о размерах экрана.\n\nИспользуйте CSS Media Query или библиотеку по типу https://github.com/artsy/fresnel.");
    }
    var _React_useContext = React.useContext(AdaptivityContext), viewWidthContext = _React_useContext.viewWidth, viewHeightContext = _React_useContext.viewHeight, sizeXContext = _React_useContext.sizeX, sizeYContext = _React_useContext.sizeY, hasPointerContext = _React_useContext.hasPointer, hasHoverContext = _React_useContext.hasHover;
    var platform = usePlatform();
    var mediaQueries = useMediaQueries();
    var _React_useState = _sliced_to_array(React.useState(function() {
        return [
            getOrDefault(viewWidthContext, getViewWidthByMediaQueries(mediaQueries)),
            getOrDefault(viewHeightContext, getViewHeightByMediaQueries(mediaQueries))
        ];
    }), 2), _React_useState_ = _sliced_to_array(_React_useState[0], 2), viewWidthLocal = _React_useState_[0], viewHeightLocal = _React_useState_[1], setViewSizeLocal = _React_useState[1];
    var adaptivityProps = React.useMemo(function() {
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
    }, [
        viewWidthLocal,
        viewHeightLocal,
        viewWidthContext,
        viewHeightContext,
        sizeXContext,
        sizeYContext,
        hasPointerContext,
        hasHoverContext,
        platform
    ]);
    React.useEffect(function() {
        var handleMediaQuery = function() {
            setViewSizeLocal(function(prevSizeLocal) {
                var newViewWidthLocal = getOrDefault(viewWidthContext, getViewWidthByMediaQueries(mediaQueries));
                var newViewHeightLocal = getOrDefault(viewHeightContext, getViewHeightByMediaQueries(mediaQueries));
                var _prevSizeLocal = _sliced_to_array(prevSizeLocal, 2), prevViewWidthLocal = _prevSizeLocal[0], prevViewHeightLocal = _prevSizeLocal[1];
                if (prevViewWidthLocal !== newViewWidthLocal || prevViewHeightLocal !== newViewHeightLocal) {
                    return [
                        newViewWidthLocal,
                        newViewHeightLocal
                    ];
                }
                return prevSizeLocal;
            });
        };
        if (!viewWidthContext) {
            [
                mediaQueries.desktopPlus,
                mediaQueries.tablet,
                mediaQueries.smallTablet,
                mediaQueries.mobile
            ].forEach(function(matchMediaListener) {
                return matchMediaListAddListener(matchMediaListener, handleMediaQuery);
            });
        }
        if (!viewHeightContext) {
            [
                mediaQueries.mediumHeight,
                mediaQueries.mobileLandscapeHeight
            ].forEach(function(matchMediaListener) {
                return matchMediaListAddListener(matchMediaListener, handleMediaQuery);
            });
        }
        return function() {
            [
                mediaQueries.desktopPlus,
                mediaQueries.tablet,
                mediaQueries.smallTablet,
                mediaQueries.mobile,
                mediaQueries.mediumHeight,
                mediaQueries.mobileLandscapeHeight
            ].forEach(function(matchMediaListener) {
                return matchMediaListRemoveListener(matchMediaListener, handleMediaQuery);
            });
        };
    }, [
        mediaQueries,
        viewWidthContext,
        viewHeightContext
    ]);
    return adaptivityProps;
};

//# sourceMappingURL=useAdaptivityWithJSMediaQueries.js.map