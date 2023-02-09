"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSplitCol = exports.SplitColContext = exports.SplitCol = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _getViewWidthClassName = require("../../helpers/getViewWidthClassName");
var _useAdaptivity3 = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _useMediaQueries = require("../../hooks/useMediaQueries");
var _matchMedia = require("../../lib/matchMedia");
var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style", "autoSpaced", "stretchedOnMobile", "className"];
function useTransitionAnimate(animateProp) {
  var _useAdaptivity = (0, _useAdaptivity3.useAdaptivity)(),
    viewWidth = _useAdaptivity.viewWidth;
  var _React$useState = React.useState(Boolean(animateProp)),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    animate = _React$useState2[0],
    setAnimate = _React$useState2[1];
  var mediaQueries = (0, _useMediaQueries.useMediaQueries)();
  React.useEffect(function () {
    if (animateProp !== undefined) {
      setAnimate(animateProp);
      return;
    }
    if (viewWidth !== undefined) {
      setAnimate(viewWidth < _adaptivity.ViewWidth.TABLET);
      return;
    }

    // eslint-disable-next-line no-restricted-properties
    var listener = function listener() {
      return setAnimate(!mediaQueries.smallTabletPlus.matches);
    };
    listener();
    (0, _matchMedia.matchMediaListAddListener)(mediaQueries.smallTabletPlus, listener);
    return function () {
      (0, _matchMedia.matchMediaListRemoveListener)(mediaQueries.smallTabletPlus, listener);
    };
  }, [animateProp, viewWidth, mediaQueries]);
  return animate;
}
var SplitColContext = /*#__PURE__*/React.createContext({
  colRef: null,
  animate: true
});
exports.SplitColContext = SplitColContext;
var useSplitCol = function useSplitCol() {
  return React.useContext(SplitColContext);
};
exports.useSplitCol = useSplitCol;
/**
 * @see https://vkcom.github.io/VKUI/#/SplitCol
 */
var SplitCol = function SplitCol(props) {
  var children = props.children,
    width = props.width,
    maxWidth = props.maxWidth,
    minWidth = props.minWidth,
    spaced = props.spaced,
    animateProp = props.animate,
    fixed = props.fixed,
    style = props.style,
    autoSpaced = props.autoSpaced,
    stretchedOnMobile = props.stretchedOnMobile,
    className = props.className,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var baseRef = React.useRef(null);
  var _useAdaptivity2 = (0, _useAdaptivity3.useAdaptivity)(),
    viewWidth = _useAdaptivity2.viewWidth,
    sizeX = _useAdaptivity2.sizeX;
  var animate = useTransitionAnimate(animateProp);
  var contextValue = (0, _useObjectMemo.useObjectMemo)({
    colRef: baseRef,
    animate: animate
  });
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    className: (0, _vkjs.classNames)("vkuiSplitCol", (0, _getSizeXClassName.getSizeXClassName)("vkuiSplitCol", sizeX), (0, _getViewWidthClassName.getViewWidthClassName)("vkuiSplitCol", viewWidth), spaced && "vkuiSplitCol--spaced", spaced === undefined && "vkuiSplitCol--spaced-none", autoSpaced && "vkuiSplitCol--spaced-auto", fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile", className)
  }), /*#__PURE__*/React.createElement(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiSplitCol__fixedInner"
  }, children) : children));
};
exports.SplitCol = SplitCol;
//# sourceMappingURL=SplitCol.js.map