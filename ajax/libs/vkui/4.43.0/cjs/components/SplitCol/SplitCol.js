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
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _ScrollContext = require("../AppRoot/ScrollContext");
var _classNames = require("../../lib/classNames");
var _utils = require("../../lib/utils");
var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style"];
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
var SplitCol = function SplitCol(_ref) {
  var children = _ref.children,
    width = _ref.width,
    maxWidth = _ref.maxWidth,
    minWidth = _ref.minWidth,
    spaced = _ref.spaced,
    _ref$animate = _ref.animate,
    animate = _ref$animate === void 0 ? false : _ref$animate,
    fixed = _ref.fixed,
    style = _ref.style,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var baseRef = React.useRef(null);
  var fixedInnerRef = React.useRef(null);
  var contextValue = React.useMemo(function () {
    return {
      colRef: baseRef,
      animate: animate
    };
  }, [baseRef, animate]);
  (0, _ScrollContext.useScrollLockEffect)(function () {
    var fixedInner = fixedInnerRef.current;
    if (!fixedInner) {
      return _utils.noop;
    }
    fixedInner.style.top = "".concat(fixedInner.offsetTop, "px");
    return function () {
      fixedInner.style.top = "";
    };
  }, [fixedInnerRef.current]);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    vkuiClass: (0, _classNames.classNames)("SplitCol", spaced && "SplitCol--spaced", fixed && "SplitCol--fixed")
  }), (0, _jsxRuntime.createScopedElement)(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? (0, _jsxRuntime.createScopedElement)("div", {
    ref: fixedInnerRef,
    vkuiClass: "SplitCol__fixedInner"
  }, children) : children));
};
exports.SplitCol = SplitCol;
//# sourceMappingURL=SplitCol.js.map