"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Caption = require("../Typography/Caption/Caption");

var _excluded = ["children"];

var Footer = function Footer(_ref) {
  var children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
    Component: "footer"
  }, restProps, {
    vkuiClass: "Footer"
  }), children);
};

exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map