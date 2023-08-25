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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _getOrDefault = require("../helpers/getOrDefault");
var _adaptivity = require("../lib/adaptivity");
var _matchMedia = require("../lib/matchMedia");
var _useMediaQueries = require("./useMediaQueries");
var _usePlatform = require("./usePlatform");
var useAdaptivityWithJSMediaQueries = function() {
    if (!_vkjs.canUseDOM) {
        console.error("[useAdaptivityWithJSMediaQueries] Похоже, вы пытаетесь использовать хук вне браузера.\n\nПостарайтесь этого избегать, чтобы не было ошибок при гидратации: при SSR нет информации о размерах экрана.\n\nИспользуйте CSS Media Query или библиотеку по типу https://github.com/artsy/fresnel.");
    }
    var _React_useContext = _react.useContext(_AdaptivityContext.AdaptivityContext), viewWidthContext = _React_useContext.viewWidth, viewHeightContext = _React_useContext.viewHeight, sizeXContext = _React_useContext.sizeX, sizeYContext = _React_useContext.sizeY, hasPointerContext = _React_useContext.hasPointer, hasHoverContext = _React_useContext.hasHover;
    var platform = (0, _usePlatform.usePlatform)();
    var mediaQueries = (0, _useMediaQueries.useMediaQueries)();
    var _React_useState = _sliced_to_array._(_react.useState(function() {
        return [
            (0, _getOrDefault.getOrDefault)(viewWidthContext, (0, _adaptivity.getViewWidthByMediaQueries)(mediaQueries)),
            (0, _getOrDefault.getOrDefault)(viewHeightContext, (0, _adaptivity.getViewHeightByMediaQueries)(mediaQueries))
        ];
    }), 2), _React_useState_ = _sliced_to_array._(_React_useState[0], 2), viewWidthLocal = _React_useState_[0], viewHeightLocal = _React_useState_[1], setViewSizeLocal = _React_useState[1];
    var adaptivityProps = _react.useMemo(function() {
        var hasPointer = (0, _getOrDefault.getOrDefault)(hasPointerContext, _vkjs.hasMouse);
        var hasHover = (0, _getOrDefault.getOrDefault)(hasHoverContext, _vkjs.hasHover);
        var viewWidth = (0, _getOrDefault.getOrDefault)(viewWidthContext, viewWidthLocal);
        var viewHeight = (0, _getOrDefault.getOrDefault)(viewHeightContext, viewHeightLocal);
        var sizeX = (0, _getOrDefault.getOrDefault)(sizeXContext, (0, _adaptivity.getSizeX)(viewWidth));
        var sizeY = (0, _getOrDefault.getOrDefault)(sizeYContext, (0, _adaptivity.getSizeY)(viewWidth, viewHeight, hasPointer));
        var isDesktop = (0, _adaptivity.tryToCheckIsDesktop)(viewWidth, viewHeight, hasPointer, platform);
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
    _react.useEffect(function() {
        var handleMediaQuery = function() {
            setViewSizeLocal(function(prevSizeLocal) {
                var newViewWidthLocal = (0, _getOrDefault.getOrDefault)(viewWidthContext, (0, _adaptivity.getViewWidthByMediaQueries)(mediaQueries));
                var newViewHeightLocal = (0, _getOrDefault.getOrDefault)(viewHeightContext, (0, _adaptivity.getViewHeightByMediaQueries)(mediaQueries));
                var _prevSizeLocal = _sliced_to_array._(prevSizeLocal, 2), prevViewWidthLocal = _prevSizeLocal[0], prevViewHeightLocal = _prevSizeLocal[1];
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
                return (0, _matchMedia.matchMediaListAddListener)(matchMediaListener, handleMediaQuery);
            });
        }
        if (!viewHeightContext) {
            [
                mediaQueries.mediumHeight,
                mediaQueries.mobileLandscapeHeight
            ].forEach(function(matchMediaListener) {
                return (0, _matchMedia.matchMediaListAddListener)(matchMediaListener, handleMediaQuery);
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
                return (0, _matchMedia.matchMediaListRemoveListener)(matchMediaListener, handleMediaQuery);
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