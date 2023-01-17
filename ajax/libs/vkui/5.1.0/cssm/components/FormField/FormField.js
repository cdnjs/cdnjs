import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["Component", "status", "children", "getRootRef", "before", "after", "disabled", "mode", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import "./FormField.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */
export var FormField = function FormField(_ref) {
  var _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'div' : _ref$Component,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 'default' : _ref$status,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    before = _ref.before,
    after = _ref.after,
    disabled = _ref.disabled,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hover = _React$useState2[0],
    setHover = _React$useState2[1];
  var handleMouseEnter = function handleMouseEnter(e) {
    e.stopPropagation();
    setHover(true);
  };
  var handleMouseLeave = function handleMouseLeave(e) {
    e.stopPropagation();
    setHover(false);
  };
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "presentation"
  }, restProps, {
    ref: getRootRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: classNames("vkuiFormField", styles["FormField--mode-".concat(mode)], styles["FormField--status-".concat(status)], getSizeYClassName("vkuiFormField", sizeY), disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", className)
  }), before && /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    className: "vkuiFormField__before"
  }, before), children, after && /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    className: "vkuiFormField__after"
  }, after), /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    className: "vkuiFormField__border"
  }));
};
var styles = {
  "FormField--mode-default": "vkuiFormField--mode-default",
  "FormField--mode-plain": "vkuiFormField--mode-plain",
  "FormField--status-error": "vkuiFormField--status-error",
  "FormField--status-valid": "vkuiFormField--status-valid",
  "FormField--status-default": "vkuiFormField--status-default"
};
//# sourceMappingURL=FormField.js.map