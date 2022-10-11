"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityWithMediaQueries = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _vkjs = require("@vkontakte/vkjs");

var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");

var _getOrDefault = require("../helpers/getOrDefault");

var _adaptivity = require("../lib/adaptivity");

var _useMediaQueries = require("./useMediaQueries");

var _usePlatform = require("./usePlatform");

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
var useAdaptivityWithMediaQueries = function useAdaptivityWithMediaQueries() {
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
      viewWidthContext = _React$useContext.viewWidth,
      viewHeightContext = _React$useContext.viewHeight,
      sizeXContext = _React$useContext.sizeX,
      sizeYContext = _React$useContext.sizeY,
      hasMouseContext = _React$useContext.hasMouse,
      deviceHasHoverContext = _React$useContext.deviceHasHover;

  var platform = (0, _usePlatform.usePlatform)();
  var mediaQueries = (0, _useMediaQueries.useMediaQueries)();

  var _React$useState = React.useState(function () {
    return [(0, _getOrDefault.getOrDefault)(viewWidthContext, (0, _adaptivity.getViewWidthByMediaQueries)(mediaQueries)), (0, _getOrDefault.getOrDefault)(viewHeightContext, (0, _adaptivity.getViewHeightByMediaQueries)(mediaQueries))];
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      _React$useState2$ = (0, _slicedToArray2.default)(_React$useState2[0], 2),
      viewWidthLocal = _React$useState2$[0],
      viewHeightLocal = _React$useState2$[1],
      setViewSizeLocal = _React$useState2[1];

  var adaptivityProps = React.useMemo(function () {
    var hasMouse = (0, _getOrDefault.getOrDefault)(hasMouseContext, _vkjs.hasMouse);
    var deviceHasHover = (0, _getOrDefault.getOrDefault)(deviceHasHoverContext, _vkjs.hasHover);
    var viewWidth = (0, _getOrDefault.getOrDefault)(viewWidthContext, viewWidthLocal);
    var viewHeight = (0, _getOrDefault.getOrDefault)(viewHeightContext, viewHeightLocal);
    var sizeX = (0, _getOrDefault.getOrDefault)(sizeXContext, (0, _adaptivity.getSizeX)(viewWidth));
    var sizeY = (0, _getOrDefault.getOrDefault)(sizeYContext, (0, _adaptivity.getSizeY)(viewWidth, viewHeight, hasMouse));
    var isDesktop = (0, _adaptivity.checkIsDesktop)(viewWidth, viewHeight, hasMouse, platform);
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
        var newViewWidthLocal = (0, _getOrDefault.getOrDefault)(viewWidthContext, (0, _adaptivity.getViewWidthByMediaQueries)(mediaQueries));
        var newViewHeightLocal = (0, _getOrDefault.getOrDefault)(viewHeightContext, (0, _adaptivity.getViewHeightByMediaQueries)(mediaQueries));

        var _prevSizeLocal = (0, _slicedToArray2.default)(prevSizeLocal, 2),
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

exports.useAdaptivityWithMediaQueries = useAdaptivityWithMediaQueries;
//# sourceMappingURL=useAdaptivityWithMediaQueries.js.map