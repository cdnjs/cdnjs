import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "Component", "getRef", "onSubmit", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayout
 */
export var FormLayout = function FormLayout(_ref) {
  var children = _ref.children,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'form' : _ref$Component,
    getRef = _ref.getRef,
    _ref$onSubmit = _ref.onSubmit,
    onSubmit = _ref$onSubmit === void 0 ? preventDefault : _ref$onSubmit,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    className: classNames("vkuiFormLayout", className),
    onSubmit: onSubmit,
    ref: getRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiFormLayout__container"
  }, children), Component === 'form' && /*#__PURE__*/React.createElement("input", {
    type: "submit",
    className: "vkuiFormLayout__submit",
    value: ""
  }));
};
//# sourceMappingURL=FormLayout.js.map