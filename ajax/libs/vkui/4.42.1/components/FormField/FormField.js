import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["Component", "status", "children", "getRootRef", "before", "after", "disabled", "mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { useAdaptivity } from "../../hooks/useAdaptivity";
export var FormFieldMode = {
  default: "default",
  plain: "plain"
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */
export var FormField = function FormField(_ref) {
  var _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? "div" : _ref$Component,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? "default" : _ref$status,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    before = _ref.before,
    after = _ref.after,
    disabled = _ref.disabled,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? FormFieldMode.default : _ref$mode,
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
  return createScopedElement(Component, _extends({
    role: "presentation"
  }, restProps, {
    ref: getRootRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    vkuiClass: classNames("FormField", "FormField--".concat(mode), "FormField--status-".concat(status), "FormField--sizeY-".concat(sizeY),
    // TODO v5.0.0 поправить под новую адаптивность
    disabled && "FormField--disabled", !disabled && hover && "FormField--hover")
  }), before && createScopedElement("div", {
    role: "presentation",
    vkuiClass: "FormField__before"
  }, before), children, after && createScopedElement("div", {
    role: "presentation",
    vkuiClass: "FormField__after"
  }, after), createScopedElement("div", {
    role: "presentation",
    vkuiClass: "FormField__border"
  }));
};
//# sourceMappingURL=FormField.js.map