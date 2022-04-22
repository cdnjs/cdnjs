import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["type", "align", "getRef", "className", "getRootRef", "sizeY", "style", "after"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { FormField } from "../FormField/FormField";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import "./Input.css";

var InputComponent = function InputComponent(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? "text" : _ref$type,
      align = _ref.align,
      getRef = _ref.getRef,
      className = _ref.className,
      getRootRef = _ref.getRootRef,
      sizeY = _ref.sizeY,
      style = _ref.style,
      after = _ref.after,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(FormField, {
    vkuiClass: classNames(getClassName("Input", platform), !!align && "Input--".concat(align), "Input--sizeY-".concat(sizeY)),
    style: style,
    className: className,
    getRootRef: getRootRef,
    after: after,
    disabled: restProps.disabled
  }, createScopedElement("input", _extends({}, restProps, {
    type: type,
    vkuiClass: "Input__el",
    ref: getRef
  })));
};

export var Input = withAdaptivity(InputComponent, {
  sizeY: true
});
//# sourceMappingURL=Input.js.map