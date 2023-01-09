import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "Component", "getRef", "onSubmit"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayout
 */
export var FormLayout = function FormLayout(_ref) {
  var children = _ref.children,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? "form" : _ref$Component,
    getRef = _ref.getRef,
    _ref$onSubmit = _ref.onSubmit,
    onSubmit = _ref$onSubmit === void 0 ? preventDefault : _ref$onSubmit,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: getClassName("FormLayout", platform),
    onSubmit: onSubmit,
    ref: getRef
  }), createScopedElement("div", {
    vkuiClass: "FormLayout__container"
  }, children), Component === "form" && createScopedElement("input", {
    type: "submit",
    vkuiClass: "FormLayout__submit",
    value: ""
  }));
};
//# sourceMappingURL=FormLayout.js.map