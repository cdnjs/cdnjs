import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["align", "getRef", "className", "getRootRef", "sizeY", "style", "after"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { FormField } from "../FormField/FormField";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import "./Input.css";

var Input = function Input(_ref) {
  var align = _ref.align,
      getRef = _ref.getRef,
      className = _ref.className,
      getRootRef = _ref.getRootRef,
      sizeY = _ref.sizeY,
      style = _ref.style,
      after = _ref.after,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(FormField, {
    vkuiClass: classNames(getClassName('Input', platform), _defineProperty({}, "Input--".concat(align), !!align), "Input--sizeY-".concat(sizeY)),
    style: style,
    className: className,
    getRootRef: getRootRef,
    after: after,
    disabled: restProps.disabled
  }, createScopedElement("input", _extends({}, restProps, {
    vkuiClass: "Input__el",
    ref: getRef
  })));
};

Input.defaultProps = {
  type: 'text'
};
export default withAdaptivity(Input, {
  sizeY: true
});
//# sourceMappingURL=Input.js.map