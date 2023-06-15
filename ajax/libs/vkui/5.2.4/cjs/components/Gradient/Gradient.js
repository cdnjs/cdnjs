"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gradient = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["mode", "children", "to", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */
var Gradient = function Gradient(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'tint' : _ref$mode,
    children = _ref.children,
    _ref$to = _ref.to,
    to = _ref$to === void 0 ? 'top' : _ref$to,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    role: "presentation"
  }, restProps, {
    className: (0, _vkjs.classNames)("vkuiGradient", styles["Gradient--mode-".concat(mode)], styles["Gradient--to-".concat(to)], className)
  }), children);
};
exports.Gradient = Gradient;
var styles = {
  "Gradient--mode-tint": "vkuiGradient--mode-tint",
  "Gradient--mode-white": "vkuiGradient--mode-white",
  "Gradient--mode-black": "vkuiGradient--mode-black",
  "Gradient--to-top": "vkuiGradient--to-top",
  "Gradient--to-bottom": "vkuiGradient--to-bottom"
};
//# sourceMappingURL=Gradient.js.map