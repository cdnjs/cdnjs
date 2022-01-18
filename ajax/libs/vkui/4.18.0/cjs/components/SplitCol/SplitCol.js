"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitCol = exports.SplitColContext = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style"];
var SplitColContext = /*#__PURE__*/React.createContext({
  colRef: null,
  animate: true
});
exports.SplitColContext = SplitColContext;

var SplitCol = function SplitCol(props) {
  var children = props.children,
      width = props.width,
      maxWidth = props.maxWidth,
      minWidth = props.minWidth,
      spaced = props.spaced,
      animate = props.animate,
      fixed = props.fixed,
      style = props.style,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var baseRef = React.useRef();
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
    vkuiClass: (0, _classNames.classNames)('SplitCol', {
      'SplitCol--spaced': spaced,
      'SplitCol--fixed': fixed
    })
  }), (0, _jsxRuntime.createScopedElement)(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SplitCol__fixedInner"
  }, children) : children));
};

exports.SplitCol = SplitCol;
SplitCol.defaultProps = {
  animate: false
};
//# sourceMappingURL=SplitCol.js.map