"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _excluded = ["mode", "children", "to"];

var Gradient = function Gradient(_ref) {
  var mode = _ref.mode,
      children = _ref.children,
      to = _ref.to,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    role: "presentation"
  }, restProps, {
    vkuiClass: (0, _classNames.classNames)('Gradient', "Gradient--md-".concat(mode), "Gradient--to-".concat(to))
  }), children);
};

Gradient.defaultProps = {
  mode: 'tint',
  to: 'top'
};
var _default = Gradient;
exports.default = _default;
//# sourceMappingURL=Gradient.js.map