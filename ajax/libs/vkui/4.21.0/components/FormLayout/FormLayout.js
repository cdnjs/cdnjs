import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "Component", "getRef", "onSubmit"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";

var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};

var FormLayout = function FormLayout(props) {
  var children = props.children,
      Component = props.Component,
      getRef = props.getRef,
      onSubmit = props.onSubmit,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: getClassName('FormLayout', platform),
    onSubmit: onSubmit,
    ref: getRef
  }), createScopedElement("div", {
    vkuiClass: "FormLayout__container"
  }, children), Component === 'form' && createScopedElement("input", {
    type: "submit",
    vkuiClass: "FormLayout__submit",
    value: ""
  }));
};

FormLayout.defaultProps = {
  Component: 'form',
  onSubmit: preventDefault
};
export default FormLayout;
//# sourceMappingURL=FormLayout.js.map