import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["Component", "children", "getRootRef", "before", "after", "disabled", "mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import "./FormField.css";
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
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      before = _ref.before,
      after = _ref.after,
      disabled = _ref.disabled,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? FormFieldMode.default : _ref$mode,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

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
    vkuiClass: classNames(getClassName("FormField", platform), "FormField--".concat(mode), "FormField--sizeY-".concat(sizeY), disabled && "FormField--disabled", !disabled && hover && "FormField--hover")
  }), hasReactNode(before) && createScopedElement("div", {
    role: "presentation",
    vkuiClass: "FormField__before"
  }, before), children, hasReactNode(after) && createScopedElement("div", {
    role: "presentation",
    vkuiClass: "FormField__after"
  }, after), createScopedElement("div", {
    role: "presentation",
    vkuiClass: "FormField__border"
  }));
};
//# sourceMappingURL=FormField.js.map