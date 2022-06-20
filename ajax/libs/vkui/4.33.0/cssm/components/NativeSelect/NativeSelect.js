import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "defaultValue", "align", "placeholder", "children", "className", "getRef", "getRootRef", "disabled", "sizeX", "sizeY", "multiline", "selectType"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { getClassName } from "../../helpers/getClassName";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { SelectType, SelectTypography } from "../Select/Select";
import "../Select/Select.css";

var NativeSelectComponent = function NativeSelectComponent(_ref) {
  var style = _ref.style,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? "" : _ref$defaultValue,
      align = _ref.align,
      placeholder = _ref.placeholder,
      children = _ref.children,
      className = _ref.className,
      getRef = _ref.getRef,
      getRootRef = _ref.getRootRef,
      disabled = _ref.disabled,
      sizeX = _ref.sizeX,
      sizeY = _ref.sizeY,
      multiline = _ref.multiline,
      _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? SelectType.default : _ref$selectType,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      title = _React$useState2[0],
      setTitle = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      empty = _React$useState4[0],
      setEmpty = _React$useState4[1];

  var _useEnsuredControl = useEnsuredControl(restProps, {
    defaultValue: defaultValue
  }),
      _useEnsuredControl2 = _slicedToArray(_useEnsuredControl, 2),
      value = _useEnsuredControl2[0],
      onChange = _useEnsuredControl2[1];

  var selectRef = useExternRef(getRef);
  useIsomorphicLayoutEffect(function () {
    var _selectRef$current;

    var selectedOption = (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.options[selectRef.current.selectedIndex];

    if (selectedOption) {
      setTitle(selectedOption.text);
      setEmpty(selectedOption.value === "" && placeholder != null);
    }
  }, [value, children]);
  return createScopedElement(FormField, {
    Component: "label",
    vkuiClass: classNames(getClassName("Select", platform), "Select--".concat(selectType), empty && "Select--empty", multiline && "Select--multiline", align && "Select--align-".concat(align), "Select--sizeX-".concat(sizeX), "Select--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    getRootRef: getRootRef,
    disabled: disabled,
    after: createScopedElement(DropdownIcon, null)
  }, createScopedElement("select", _extends({}, restProps, {
    disabled: disabled,
    vkuiClass: "Select__el",
    onChange: onChange,
    value: value,
    ref: selectRef
  }), placeholder && createScopedElement("option", {
    value: ""
  }, placeholder), children), createScopedElement("div", {
    vkuiClass: "Select__container"
  }, createScopedElement(SelectTypography, {
    vkuiClass: "Select__title"
  }, title)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */


export var NativeSelect = withAdaptivity(NativeSelectComponent, {
  sizeX: true,
  sizeY: true
});
//# sourceMappingURL=NativeSelect.js.map