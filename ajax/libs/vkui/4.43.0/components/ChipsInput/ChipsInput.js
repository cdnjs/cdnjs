import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "className", "getRootRef", "before", "after", "status"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { FormField } from "../FormField/FormField";
import { ChipsInputBase } from "../ChipsInputBase/ChipsInputBase";
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */
export var ChipsInput = function ChipsInput(_ref) {
  var style = _ref.style,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    before = _ref.before,
    after = _ref.after,
    status = _ref.status,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement(FormField, {
    getRootRef: getRootRef,
    vkuiClass: "ChipsInput",
    className: className,
    style: style,
    disabled: restProps.disabled,
    before: before,
    after: after,
    role: "application",
    "aria-disabled": restProps.disabled,
    "aria-readonly": restProps.readOnly,
    status: status
  }, createScopedElement(ChipsInputBase, restProps));
};
//# sourceMappingURL=ChipsInput.js.map