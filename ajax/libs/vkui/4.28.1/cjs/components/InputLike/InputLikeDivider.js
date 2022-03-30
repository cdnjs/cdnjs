"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputLikeDivider = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _excluded = ["children"];

var InputLikeDivider = function InputLikeDivider(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({
    vkuiClass: "InputLikeDivider"
  }, props), children);
};

exports.InputLikeDivider = InputLikeDivider;
//# sourceMappingURL=InputLikeDivider.js.map