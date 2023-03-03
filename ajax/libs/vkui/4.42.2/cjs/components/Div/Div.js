"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Div = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _excluded = ["children", "getRootRef"];
/**
 * @see https://vkcom.github.io/VKUI/#/Div
 */
var Div = function Div(_ref) {
  var children = _ref.children,
    getRootRef = _ref.getRootRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: "Div"
  }), children);
};
exports.Div = Div;
//# sourceMappingURL=Div.js.map