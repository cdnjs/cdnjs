"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["children", "Component", "getRef", "onSubmit"];

var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};

var FormLayout = function FormLayout(props) {
  var children = props.children,
      Component = props.Component,
      getRef = props.getRef,
      onSubmit = props.onSubmit,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _getClassName.getClassName)('FormLayout', platform),
    onSubmit: onSubmit,
    ref: getRef
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "FormLayout__container"
  }, children), Component === 'form' && (0, _jsxRuntime.createScopedElement)("input", {
    type: "submit",
    vkuiClass: "FormLayout__submit",
    value: ""
  }));
};

FormLayout.defaultProps = {
  Component: 'form',
  onSubmit: preventDefault
};
var _default = FormLayout;
exports.default = _default;
//# sourceMappingURL=FormLayout.js.map