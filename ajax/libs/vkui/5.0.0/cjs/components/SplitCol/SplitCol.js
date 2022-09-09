"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSplitCol = exports.SplitColContext = exports.SplitCol = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

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

var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style", "autoSpaced", "stretchedOnMobile"];
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
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    vkuiClass: (0, _classNames.classNames)("SplitCol", (0, _getSizeXClassName.getSizeXClassName)("SplitCol", sizeX), (0, _getViewWidthClassName.getViewWidthClassName)("SplitCol", viewWidth), spaced && "SplitCol--spaced", spaced === undefined && "SplitCol--spaced-none", autoSpaced && "SplitCol--spaced-auto", fixed && "SplitCol--fixed", stretchedOnMobile && "SplitCol--stretched-on-mobile")
  }), (0, _jsxRuntime.createScopedElement)(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SplitCol__fixedInner"
  }, children) : children));
};

exports.SplitCol = SplitCol;
//# sourceMappingURL=SplitCol.js.map