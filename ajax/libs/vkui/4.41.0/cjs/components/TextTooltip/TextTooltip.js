"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextTooltip = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _HoverPopper = require("../HoverPopper/HoverPopper");
var _utils = require("../../lib/utils");
var _Subhead = require("../Typography/Subhead/Subhead");
var _prefixClass = require("../../lib/prefixClass");
var _classNames = require("../../lib/classNames");
var _excluded = ["children", "text", "header", "appearance"];
/**
 * @see https://vkcom.github.io/VKUI/#/TextTooltip
 */
var TextTooltip = function TextTooltip(_ref) {
  var children = _ref.children,
    text = _ref.text,
    header = _ref.header,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? "black" : _ref$appearance,
    popperProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_HoverPopper.HoverPopper, (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("TextTooltip", "TextTooltip--".concat(appearance)),
    arrow: true,
    arrowClassName: (0, _prefixClass.prefixClass)("TextTooltip__arrow"),
    content: (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
      weight: "2",
      vkuiClass: "TextTooltip__header"
    }, header), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
      vkuiClass: "TextTooltip__text"
    }, text))
  }, popperProps), children);
};
exports.TextTooltip = TextTooltip;
//# sourceMappingURL=TextTooltip.js.map