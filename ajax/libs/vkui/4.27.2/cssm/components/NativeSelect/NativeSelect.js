import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "defaultValue", "align", "placeholder", "children", "className", "getRef", "getRootRef", "disabled", "sizeX", "sizeY", "multiline"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { getClassName } from "../../helpers/getClassName";
import Headline from "../Typography/Headline/Headline";
import Text from "../Typography/Text/Text";
import { VKCOM } from "../../lib/platform";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import "../Select/Select.css";

var NativeSelect = function NativeSelect(_ref) {
  var _classNames;

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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      title = _React$useState2[0],
      setTitle = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      notSelected = _React$useState4[0],
      setNotSelected = _React$useState4[1];

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
      setNotSelected(selectedOption.value === "" && placeholder != null);
    }
  }, [value, children]);
  var TypographyComponent = platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;
  return createScopedElement(FormField, {
    Component: "label",
    vkuiClass: classNames(getClassName("Select", platform), (_classNames = {}, _defineProperty(_classNames, "Select--not-selected", notSelected), _defineProperty(_classNames, "Select--align-".concat(align), !!align), _defineProperty(_classNames, "Select--sizeX--".concat(sizeX), !!sizeX), _defineProperty(_classNames, "Select--sizeY--".concat(sizeY), !!sizeY), _defineProperty(_classNames, "Select--multiline", multiline), _classNames)),
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
  }, placeholder), children), createScopedElement(TypographyComponent, {
    Component: "div",
    weight: "regular",
    vkuiClass: "Select__container"
  }, createScopedElement("span", {
    vkuiClass: "Select__title"
  }, title)));
}; // eslint-disable-next-line import/no-default-export


export default withAdaptivity(NativeSelect, {
  sizeX: true,
  sizeY: true
});
//# sourceMappingURL=NativeSelect.js.map