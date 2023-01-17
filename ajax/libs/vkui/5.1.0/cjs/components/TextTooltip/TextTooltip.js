"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextTooltip = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _HoverPopper = require("../HoverPopper/HoverPopper");
var _Subhead = require("../Typography/Subhead/Subhead");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["children", "text", "header", "appearance", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/TextTooltip
 */
var TextTooltip = function TextTooltip(_ref) {
  var children = _ref.children,
    text = _ref.text,
    header = _ref.header,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'neutral' : _ref$appearance,
    className = _ref.className,
    popperProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_HoverPopper.HoverPopper, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiTextTooltip", styles["TextTooltip--appearance-".concat(appearance)], className),
    arrow: true,
    arrowClassName: "vkuiTextTooltip__arrow",
    content: /*#__PURE__*/React.createElement(React.Fragment, null, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
      weight: "2",
      className: "vkuiTextTooltip__header"
    }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
      className: "vkuiTextTooltip__text"
    }, text))
  }, popperProps), children);
};
exports.TextTooltip = TextTooltip;
var styles = {
  "TextTooltip--appearance-accent": "vkuiTextTooltip--appearance-accent",
  "TextTooltip--appearance-white": "vkuiTextTooltip--appearance-white",
  "TextTooltip--appearance-black": "vkuiTextTooltip--appearance-black",
  "TextTooltip--appearance-inversion": "vkuiTextTooltip--appearance-inversion",
  "TextTooltip--appearance-neutral": "vkuiTextTooltip--appearance-neutral"
};
//# sourceMappingURL=TextTooltip.js.map