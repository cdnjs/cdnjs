"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichTooltip = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _HoverPopper = require("../HoverPopper/HoverPopper");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["children", "arrow", "appearance", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/RichTooltip
 */
var RichTooltip = function RichTooltip(_ref) {
  var children = _ref.children,
    _ref$arrow = _ref.arrow,
    arrow = _ref$arrow === void 0 ? true : _ref$arrow,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'neutral' : _ref$appearance,
    className = _ref.className,
    popperProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_HoverPopper.HoverPopper, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiRichTooltip", styles["RichTooltip--appearance-".concat(appearance)], className),
    arrow: arrow,
    arrowClassName: "vkuiRichTooltip__arrow"
  }, popperProps), children);
};
exports.RichTooltip = RichTooltip;
var styles = {
  "RichTooltip--appearance-accent": "vkuiRichTooltip--appearance-accent",
  "RichTooltip--appearance-white": "vkuiRichTooltip--appearance-white",
  "RichTooltip--appearance-black": "vkuiRichTooltip--appearance-black",
  "RichTooltip--appearance-inversion": "vkuiRichTooltip--appearance-inversion",
  "RichTooltip--appearance-neutral": "vkuiRichTooltip--appearance-neutral"
};
//# sourceMappingURL=RichTooltip.js.map