import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "defaultValue", "align", "placeholder", "children", "className", "getRef", "getRootRef", "disabled", "multiline", "selectType", "status", "onChange", "value"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { FormField } from '../FormField/FormField';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { SelectTypography } from '../Select/Select';
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */
var NativeSelect = function NativeSelect(_ref) {
  var style = _ref.style,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? '' : _ref$defaultValue,
    align = _ref.align,
    placeholder = _ref.placeholder,
    children = _ref.children,
    className = _ref.className,
    getRef = _ref.getRef,
    getRootRef = _ref.getRootRef,
    disabled = _ref.disabled,
    multiline = _ref.multiline,
    _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    status = _ref.status,
    onChangeProp = _ref.onChange,
    valueProp = _ref.value,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    title = _React$useState2[0],
    setTitle = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    empty = _React$useState4[0],
    setEmpty = _React$useState4[1];
  var _useEnsuredControl = useEnsuredControl({
      defaultValue: defaultValue,
      disabled: disabled,
      onChange: onChangeProp,
      value: valueProp
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
      setEmpty(selectedOption.value === '' && placeholder != null);
    }
  }, [value, children]);
  return /*#__PURE__*/React.createElement(FormField, {
    Component: "label",
    className: classNames("vkuiSelect", getPlatformClassName("vkuiSelect", platform), empty && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align && styles["Select--align-".concat(align)], getSizeXClassName("vkuiSelect", sizeX), getSizeYClassName("vkuiSelect", sizeY), className),
    style: style,
    getRootRef: getRootRef,
    disabled: disabled,
    after: /*#__PURE__*/React.createElement(DropdownIcon, null),
    status: status
  }, /*#__PURE__*/React.createElement("select", _extends({}, restProps, {
    disabled: disabled,
    className: "vkuiSelect__el",
    onChange: onChange,
    value: value,
    ref: selectRef
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), children), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSelect__container"
  }, /*#__PURE__*/React.createElement(SelectTypography, {
    className: "vkuiSelect__title",
    selectType: selectType
  }, title)));
};
export { NativeSelect };
var styles = {
  "Select--align-right": "vkuiSelect--align-right",
  "Select--align-center": "vkuiSelect--align-center",
  "Select--align-left": "vkuiSelect--align-left"
};
//# sourceMappingURL=NativeSelect.js.map