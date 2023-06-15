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
var _vkjs = require("@vkontakte/vkjs");
var _Caption = require("../Typography/Caption/Caption");
var _Headline = require("../Typography/Headline/Headline");
var _excluded = ["mode", "size", "children", "className"];
var modeClassNames = {
  secondary: "vkuiCounter--mode-secondary",
  primary: "vkuiCounter--mode-primary",
  prominent: "vkuiCounter--mode-prominent",
  contrast: "vkuiCounter--mode-contrast",
  inherit: "vkuiCounter--mode-inherit"
};
var sizeClassNames = {
  s: "vkuiCounter--size-s",
  m: "vkuiCounter--size-m"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */
var Counter = function Counter(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'inherit' : _ref$mode,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'm' : _ref$size,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (React.Children.count(children) === 0) {
    return null;
  }
  var CounterTypography = size === 's' ? _Caption.Caption : _Headline.Headline;
  var counterLevel = size === 's' ? '1' : '2';
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiCounter", modeClassNames[mode], sizeClassNames[size], className)
  }), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/React.createElement(CounterTypography, {
    Component: "span",
    className: "vkuiCounter__in",
    level: counterLevel
  }, children));
};
exports.Counter = Counter;
//# sourceMappingURL=Counter.js.map