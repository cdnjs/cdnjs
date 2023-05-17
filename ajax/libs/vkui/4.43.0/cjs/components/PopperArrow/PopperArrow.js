"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperArrow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _jsxRuntime = require("../../lib/jsxRuntime");
var PopperArrow = function PopperArrow(_ref) {
  var style = _ref.style,
    attributes = _ref.attributes,
    arrowClassName = _ref.arrowClassName;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    style: style
  }, attributes, {
    vkuiClass: "PopperArrow",
    "data-popper-arrow": true
  }), (0, _jsxRuntime.createScopedElement)("svg", {
    vkuiClass: "PopperArrow__in",
    className: arrowClassName,
    width: "20",
    height: "8",
    viewBox: "0 0 20 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _jsxRuntime.createScopedElement)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 0C13 0 15.9999 8 20 8H0C3.9749 8 7 0 10 0Z",
    fill: "currentColor"
  })));
};
exports.PopperArrow = PopperArrow;
//# sourceMappingURL=PopperArrow.js.map