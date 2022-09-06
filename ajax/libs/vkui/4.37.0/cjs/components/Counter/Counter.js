"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Counter = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _Caption = require("../Typography/Caption/Caption");

var _Headline = require("../Typography/Headline/Headline");

var _utils = require("../../lib/utils");

var _excluded = ["mode", "size", "children"];

/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */
var Counter = function Counter(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "secondary" : _ref$mode,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "m" : _ref$size,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (React.Children.count(children) === 0) {
    return null;
  }

  var CounterTypography = size === "s" ? _Caption.Caption : _Headline.Headline;
  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("Counter", "Counter--".concat(mode), "Counter--s-".concat(size))
  }), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)(CounterTypography, {
    Component: "span",
    vkuiClass: "Counter__in",
    level: "2"
  }, children));
};

exports.Counter = Counter;
//# sourceMappingURL=Counter.js.map