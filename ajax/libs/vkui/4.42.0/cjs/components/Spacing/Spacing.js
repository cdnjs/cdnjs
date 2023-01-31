"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spacing = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _excluded = ["size", "separator", "style"];
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */
var Spacing = function Spacing(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 8 : _ref$size,
    separator = _ref.separator,
    style = _ref.style,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var styles = (0, _objectSpread2.default)({
    height: size
  }, style);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    "aria-hidden": "true",
    vkuiClass: (0, _classNames.classNames)("Spacing", !!separator && "Spacing--separator", (separator === true || separator === "center") && "Spacing--separator-center", separator === "top" && "Spacing--separator-top", separator === "bottom" && "Spacing--separator-bottom"),
    style: styles
  }));
};
exports.Spacing = Spacing;
//# sourceMappingURL=Spacing.js.map