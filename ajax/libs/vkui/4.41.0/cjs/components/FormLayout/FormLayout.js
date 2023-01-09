"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormLayout = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _getClassName = require("../../helpers/getClassName");
var _usePlatform = require("../../hooks/usePlatform");
var _excluded = ["children", "Component", "getRef", "onSubmit"];
var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayout
 */
var FormLayout = function FormLayout(_ref) {
  var children = _ref.children,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? "form" : _ref$Component,
    getRef = _ref.getRef,
    _ref$onSubmit = _ref.onSubmit,
    onSubmit = _ref$onSubmit === void 0 ? preventDefault : _ref$onSubmit,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _getClassName.getClassName)("FormLayout", platform),
    onSubmit: onSubmit,
    ref: getRef
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "FormLayout__container"
  }, children), Component === "form" && (0, _jsxRuntime.createScopedElement)("input", {
    type: "submit",
    vkuiClass: "FormLayout__submit",
    value: ""
  }));
};
exports.FormLayout = FormLayout;
//# sourceMappingURL=FormLayout.js.map