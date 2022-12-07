"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSplitCol = exports.SplitColContext = exports.SplitCol = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _getViewWidthClassName = require("../../helpers/getViewWidthClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _dom = require("../../lib/dom");
var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style", "autoSpaced", "stretchedOnMobile", "className"];
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
    _animate = props.animate,
    fixed = props.fixed,
    style = props.style,
    autoSpaced = props.autoSpaced,
    stretchedOnMobile = props.stretchedOnMobile,
    className = props.className,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var baseRef = React.useRef(null);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    viewWidth = _useAdaptivity.viewWidth,
    sizeX = _useAdaptivity.sizeX;
  var _React$useState = React.useState(Boolean(_animate)),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    animate = _React$useState2[0],
    setAnimate = _React$useState2[1];
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window;
  React.useEffect(function () {
    if (_animate === undefined) {
      setAnimate(viewWidth !== undefined ? viewWidth < _adaptivity.ViewWidth.TABLET : window.innerWidth < _adaptivity.BREAKPOINTS.SMALL_TABLET);
    } else {
      setAnimate(_animate);
    }
  }, [_animate, viewWidth, window]);
  var contextValue = React.useMemo(function () {
    return {
      colRef: baseRef,
      animate: animate
    };
  }, [baseRef, animate]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    className: (0, _classNames.classNamesString)("vkuiSplitCol", (0, _getSizeXClassName.getSizeXClassName)("vkuiSplitCol", sizeX), (0, _getViewWidthClassName.getViewWidthClassName)("vkuiSplitCol", viewWidth), spaced && "vkuiSplitCol--spaced", spaced === undefined && "vkuiSplitCol--spaced-none", autoSpaced && "vkuiSplitCol--spaced-auto", fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile", className)
  }), /*#__PURE__*/React.createElement(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiSplitCol__fixedInner"
  }, children) : children));
};
exports.SplitCol = SplitCol;
//# sourceMappingURL=SplitCol.js.map