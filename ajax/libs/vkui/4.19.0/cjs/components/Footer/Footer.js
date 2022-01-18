"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _excluded = ["children"];

var Footer = function Footer(_ref) {
  var children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_Caption.default, (0, _extends2.default)({
    Component: "footer"
  }, restProps, {
    level: "1",
    weight: "regular",
    vkuiClass: "Footer"
  }), children);
};

var _default = Footer;
exports.default = _default;
//# sourceMappingURL=Footer.js.map