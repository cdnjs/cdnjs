"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityWithJSMediaQueries = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _getOrDefault = require("../helpers/getOrDefault");
var _adaptivity = require("../lib/adaptivity");
var _useMediaQueries = require("./useMediaQueries");
var _usePlatform = require("./usePlatform");
var _matchMedia = require("../lib/matchMedia");
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
var useAdaptivityWithJSMediaQueries = function useAdaptivityWithJSMediaQueries() {
  if (!_vkjs.canUseDOM) {
    console.error("[useAdaptivityWithJSMediaQueries] \u041F\u043E\u0445\u043E\u0436\u0435, \u0432\u044B \u043F\u044B\u0442\u0430\u0435\u0442\u0435\u0441\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0445\u0443\u043A \u0432\u043D\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.\n\n\u041F\u043E\u0441\u0442\u0430\u0440\u0430\u0439\u0442\u0435\u0441\u044C \u044D\u0442\u043E\u0433\u043E \u0438\u0437\u0431\u0435\u0433\u0430\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u043D\u0435 \u0431\u044B\u043B\u043E \u043E\u0448\u0438\u0431\u043E\u043A \u043F\u0440\u0438 \u0433\u0438\u0434\u0440\u0430\u0442\u0430\u0446\u0438\u0438: \u043F\u0440\u0438 SSR \u043D\u0435\u0442 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430\u0445 \u044D\u043A\u0440\u0430\u043D\u0430.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 CSS Media Query \u0438\u043B\u0438 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0443 \u043F\u043E \u0442\u0438\u043F\u0443 https://github.com/artsy/fresnel.");
  }
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
    viewWidthContext = _React$useContext.viewWidth,
    viewHeightContext = _React$useContext.viewHeight,
    sizeXContext = _React$useContext.sizeX,
    sizeYContext = _React$useContext.sizeY,
    hasPointerContext = _React$useContext.hasPointer,
    hasHoverContext = _React$useContext.hasHover;
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
  }, [viewWidthLocal, viewHeightLocal, viewWidthContext, viewHeightContext, sizeXContext, sizeYContext, hasPointerContext, hasHoverContext, platform]);
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
      [mediaQueries.desktopPlus, mediaQueries.tablet, mediaQueries.smallTablet, mediaQueries.mobile].forEach(function (matchMediaListener) {
        return (0, _matchMedia.matchMediaListAddListener)(matchMediaListener, handleMediaQuery);
      });
    }
    if (!viewHeightContext) {
      [mediaQueries.mediumHeight, mediaQueries.mobileLandscapeHeight].forEach(function (matchMediaListener) {
        return (0, _matchMedia.matchMediaListAddListener)(matchMediaListener, handleMediaQuery);
      });
    }
    return function () {
      [mediaQueries.desktopPlus, mediaQueries.tablet, mediaQueries.smallTablet, mediaQueries.mobile, mediaQueries.mediumHeight, mediaQueries.mobileLandscapeHeight].forEach(function (matchMediaListener) {
        return (0, _matchMedia.matchMediaListRemoveListener)(matchMediaListener, handleMediaQuery);
      });
    };
  }, [mediaQueries, viewWidthContext, viewHeightContext]);
  return adaptivityProps;
};
exports.useAdaptivityWithJSMediaQueries = useAdaptivityWithJSMediaQueries;
//# sourceMappingURL=useAdaptivityWithJSMediaQueries.js.map