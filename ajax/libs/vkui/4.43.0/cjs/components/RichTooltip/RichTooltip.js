"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichTooltip = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _HoverPopper = require("../HoverPopper/HoverPopper");
var _classNames = require("../../lib/classNames");
var _prefixClass = require("../../lib/prefixClass");
var _excluded = ["children", "arrow", "appearance"];
/**
 * @see https://vkcom.github.io/VKUI/#/RichTooltip
 */
var RichTooltip = function RichTooltip(_ref) {
  var children = _ref.children,
    _ref$arrow = _ref.arrow,
    arrow = _ref$arrow === void 0 ? true : _ref$arrow,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? "neutral" : _ref$appearance,
    popperProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_HoverPopper.HoverPopper, (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("RichTooltip", "RichTooltip--".concat(appearance)),
    arrow: arrow,
    arrowClassName: (0, _prefixClass.prefixClass)("RichTooltip__arrow")
  }, popperProps), children);
};
exports.RichTooltip = RichTooltip;
//# sourceMappingURL=RichTooltip.js.map