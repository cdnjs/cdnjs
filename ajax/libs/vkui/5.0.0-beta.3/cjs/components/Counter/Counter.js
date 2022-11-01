"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Counter = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _Caption = require("../Typography/Caption/Caption");
var _Headline = require("../Typography/Headline/Headline");
var _utils = require("../../lib/utils");
var _excluded = ["mode", "size", "children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */
var Counter = function Counter(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "secondary" : _ref$mode,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "m" : _ref$size,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (React.Children.count(children) === 0) {
    return null;
  }
  var CounterTypography = size === "s" ? _Caption.Caption : _Headline.Headline;
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({}, restProps, {
    className: (0, _classNames.classNamesString)("vkuiCounter", styles["Counter--mode-".concat(mode)], styles["Counter--size-".concat(size)], className)
  }), (0, _utils.hasReactNode)(children) && /*#__PURE__*/React.createElement(CounterTypography, {
    Component: "span",
    className: "vkuiCounter__in",
    level: "2"
  }, children));
};
exports.Counter = Counter;
var styles = {
  "Counter--mode-primary": "vkuiCounter--mode-primary",
  "Counter--mode-secondary": "vkuiCounter--mode-secondary",
  "Counter--mode-prominent": "vkuiCounter--mode-prominent",
  "Counter--mode-contrast": "vkuiCounter--mode-contrast",
  "Counter--size-m": "vkuiCounter--size-m",
  "Counter--size-s": "vkuiCounter--size-s"
};
//# sourceMappingURL=Counter.js.map