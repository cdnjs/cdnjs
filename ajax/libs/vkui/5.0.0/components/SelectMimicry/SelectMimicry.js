import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "before", "after", "selectType", "status"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { getFormFieldModeFromSelectType } from "../../lib/select";
import { SelectTypography } from "../Select/Select";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";

/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
 */
export var SelectMimicry = function SelectMimicry(_ref) {
  var _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
      placeholder = _ref.placeholder,
      children = _ref.children,
      align = _ref.align,
      getRootRef = _ref.getRootRef,
      multiline = _ref.multiline,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      before = _ref.before,
      _ref$after = _ref.after,
      after = _ref$after === void 0 ? createScopedElement(DropdownIcon, null) : _ref$after,
      _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? "default" : _ref$selectType,
      status = _ref.status,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX,
      sizeY = _useAdaptivity.sizeY;

  var title = children || placeholder;
  return createScopedElement(FormField, _extends({}, restProps, {
    tabIndex: disabled ? undefined : tabIndex,
    vkuiClass: classNames(getClassName("Select", platform), getSizeXClassName("Select", sizeX), getSizeYClassName("Select", sizeY), multiline && "Select--multiline", align && "Select--align-".concat(align), before && "Select--hasBefore", after && "Select--hasAfter"),
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
//# sourceMappingURL=SelectMimicry.js.map