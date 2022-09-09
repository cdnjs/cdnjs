import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "defaultValue", "align", "placeholder", "children", "className", "getRef", "getRootRef", "disabled", "multiline", "selectType", "status"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { getClassName } from "../../helpers/getClassName";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { SelectTypography } from "../Select/Select";
import "../Select/Select.css";

/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */
var NativeSelect = function NativeSelect(_ref) {
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
      multiline = _ref.multiline,
      _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? "default" : _ref$selectType,
      status = _ref.status,
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

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX,
      sizeY = _useAdaptivity.sizeY;

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
    vkuiClass: classNames(getClassName("Select", platform), empty && "Select--empty", multiline && "Select--multiline", align && "Select--align-".concat(align), getSizeXClassName("Select", sizeX), getSizeYClassName("Select", sizeY)),
    className: className,
    style: style,
    getRootRef: getRootRef,
    disabled: disabled,
    after: createScopedElement(DropdownIcon, null),
    status: status
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
    vkuiClass: "Select__title",
    selectType: selectType
  }, title)));
};

export { NativeSelect };
//# sourceMappingURL=NativeSelect.js.map