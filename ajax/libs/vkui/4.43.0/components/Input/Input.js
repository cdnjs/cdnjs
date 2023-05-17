import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["type", "align", "getRef", "className", "getRootRef", "sizeY", "style", "before", "after", "status"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { FormField } from "../FormField/FormField";
import { withAdaptivity } from "../../hoc/withAdaptivity";
var InputComponent = function InputComponent(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? "text" : _ref$type,
    align = _ref.align,
    getRef = _ref.getRef,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    sizeY = _ref.sizeY,
    style = _ref.style,
    before = _ref.before,
    after = _ref.after,
    status = _ref.status,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement(FormField, {
    vkuiClass: classNames("Input", !!align && "Input--".concat(align), "Input--sizeY-".concat(sizeY),
    // TODO v5.0.0 поправить под новую адаптивность
    before && "Input--hasBefore", after && "Input--hasAfter"),
    style: style,
    className: className,
    getRootRef: getRootRef,
    before: before,
    after: after,
    disabled: restProps.disabled,
    status: status
  }, createScopedElement("input", _extends({}, restProps, {
    type: type,
    vkuiClass: "Input__el",
    ref: getRef
  })));
};

/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */
export var Input = withAdaptivity(InputComponent, {
  sizeY: true
});
Input.displayName = "Input";
//# sourceMappingURL=Input.js.map