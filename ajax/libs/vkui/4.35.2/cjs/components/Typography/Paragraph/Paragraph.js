"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paragraph = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../../lib/classNames");

var _warnOnce = require("../../../lib/warnOnce");

var _excluded = ["Component", "getRootRef", "weight", "children"];
var warn = (0, _warnOnce.warnOnce)("Paragraph");
/**
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */

var Paragraph = function Paragraph(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      getRootRef = _ref.getRootRef,
      weight = _ref.weight,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
    warn("getRootRef может использоваться только с элементами DOM", "error");
  }

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Paragraph", weight && "Paragraph--w-".concat(weight))
  }), children);
};

exports.Paragraph = Paragraph;
//# sourceMappingURL=Paragraph.js.map