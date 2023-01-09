import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "sizeX", "sizeY", "before", "after", "selectType", "status"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { getFormFieldModeFromSelectType } from "../../lib/select";
import { SelectType, SelectTypography } from "../Select/Select";
import "../Select/Select.css";
var SelectMimicryComponent = function SelectMimicryComponent(_ref) {
  var _ref$tabIndex = _ref.tabIndex,
    tabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
    placeholder = _ref.placeholder,
    children = _ref.children,
    align = _ref.align,
    getRootRef = _ref.getRootRef,
    multiline = _ref.multiline,
    disabled = _ref.disabled,
    onClick = _ref.onClick,
    sizeX = _ref.sizeX,
    sizeY = _ref.sizeY,
    before = _ref.before,
    _ref$after = _ref.after,
    after = _ref$after === void 0 ? createScopedElement(DropdownIcon, null) : _ref$after,
    _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? SelectType.default : _ref$selectType,
    status = _ref.status,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var title = children || placeholder;
  return createScopedElement(FormField, _extends({}, restProps, {
    tabIndex: disabled ? undefined : tabIndex,
    vkuiClass: classNames(getClassName("Select", platform), "Select--".concat(selectType), !children && "Select--empty", multiline && "Select--multiline", align && "Select--align-".concat(align), "Select--sizeX-".concat(sizeX), // TODO v5.0.0 поправить под новую адаптивность
    "Select--sizeY-".concat(sizeY),
    // TODO v5.0.0 поправить под новую адаптивность
    before && "Select--hasBefore", after && "Select--hasAfter"),
    getRootRef: getRootRef,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    before: before,
    after: after,
    mode: getFormFieldModeFromSelectType(selectType),
    status: status
  }), createScopedElement("div", {
    vkuiClass: "Select__container"
  }, createScopedElement(SelectTypography, {
    selectType: selectType,
    vkuiClass: "Select__title"
  }, title)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
 */
export var SelectMimicry = withAdaptivity(SelectMimicryComponent, {
  sizeX: true,
  sizeY: true
});
SelectMimicry.displayName = "SelectMimicry";
//# sourceMappingURL=SelectMimicry.js.map