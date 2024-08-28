"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAdaptivityWithJSMediaQueries", {
    enumerable: true,
    get: function() {
        return useAdaptivityWithJSMediaQueries;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
const _getOrDefault = require("../helpers/getOrDefault");
const _adaptivity = require("../lib/adaptivity");
const _matchMedia = require("../lib/matchMedia");
const _useMediaQueries = require("./useMediaQueries");
const _usePlatform = require("./usePlatform");
const useAdaptivityWithJSMediaQueries = ()=>{
    if (!_vkjs.canUseDOM) {
        // eslint-disable-next-line no-console
        console.error(`[useAdaptivityWithJSMediaQueries] Похоже, вы пытаетесь использовать хук вне браузера.

Постарайтесь этого избегать, чтобы не было ошибок при гидратации: при SSR нет информации о размерах экрана.

Используйте CSS Media Query или библиотеку по типу https://github.com/artsy/fresnel.`);
    }
    const { viewWidth: viewWidthContext, viewHeight: viewHeightContext, sizeX: sizeXContext, sizeY: sizeYContext, hasPointer: hasPointerContext, hasHover: hasHoverContext } = _react.useContext(_AdaptivityContext.AdaptivityContext);
    const platform = (0, _usePlatform.usePlatform)();
    const mediaQueries = (0, _useMediaQueries.useMediaQueries)();
    const [[viewWidthLocal, viewHeightLocal], setViewSizeLocal] = _react.useState(()=>[
            (0, _getOrDefault.getOrDefault)(viewWidthContext, (0, _adaptivity.getViewWidthByMediaQueries)(mediaQueries)),
            (0, _getOrDefault.getOrDefault)(viewHeightContext, (0, _adaptivity.getViewHeightByMediaQueries)(mediaQueries))
        ]);
    const adaptivityProps = _react.useMemo(()=>{
        const hasPointer = (0, _getOrDefault.getOrDefault)(hasPointerContext, _vkjs.hasMouse);
        const hasHover = (0, _getOrDefault.getOrDefault)(hasHoverContext, _vkjs.hasHover);
        const viewWidth = (0, _getOrDefault.getOrDefault)(viewWidthContext, viewWidthLocal);
        const viewHeight = (0, _getOrDefault.getOrDefault)(viewHeightContext, viewHeightLocal);
        const sizeX = (0, _getOrDefault.getOrDefault)(sizeXContext, (0, _adaptivity.getSizeX)(viewWidth));
        const sizeY = (0, _getOrDefault.getOrDefault)(sizeYContext, (0, _adaptivity.getSizeY)(viewWidth, viewHeight, hasPointer));
        const isDesktop = (0, _adaptivity.tryToCheckIsDesktop)(viewWidth, viewHeight, hasPointer, platform);
        return {
            viewWidth,
            viewHeight,
            sizeX,
            sizeY,
            hasPointer,
            hasHover,
            isDesktop
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
    _react.useEffect(()=>{
        const handleMediaQuery = ()=>{
            setViewSizeLocal((prevSizeLocal)=>{
                const newViewWidthLocal = (0, _getOrDefault.getOrDefault)(viewWidthContext, (0, _adaptivity.getViewWidthByMediaQueries)(mediaQueries));
                const newViewHeightLocal = (0, _getOrDefault.getOrDefault)(viewHeightContext, (0, _adaptivity.getViewHeightByMediaQueries)(mediaQueries));
                const [prevViewWidthLocal, prevViewHeightLocal] = prevSizeLocal;
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
            ].forEach((matchMediaListener)=>(0, _matchMedia.matchMediaListAddListener)(matchMediaListener, handleMediaQuery));
        }
        if (!viewHeightContext) {
            [
                mediaQueries.mediumHeight,
                mediaQueries.mobileLandscapeHeight
            ].forEach((matchMediaListener)=>(0, _matchMedia.matchMediaListAddListener)(matchMediaListener, handleMediaQuery));
        }
        return ()=>{
            [
                mediaQueries.desktopPlus,
                mediaQueries.tablet,
                mediaQueries.smallTablet,
                mediaQueries.mobile,
                mediaQueries.mediumHeight,
                mediaQueries.mobileLandscapeHeight
            ].forEach((matchMediaListener)=>(0, _matchMedia.matchMediaListRemoveListener)(matchMediaListener, handleMediaQuery));
        };
    }, [
        mediaQueries,
        viewWidthContext,
        viewHeightContext
    ]);
    return adaptivityProps;
};

//# sourceMappingURL=useAdaptivityWithJSMediaQueries.js.map