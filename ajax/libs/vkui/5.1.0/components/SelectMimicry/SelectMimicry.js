import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "before", "after", "selectType", "status", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { FormField } from '../FormField/FormField';
import { usePlatform } from '../../hooks/usePlatform';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { SelectTypography } from '../Select/Select';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
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
    after = _ref$after === void 0 ? /*#__PURE__*/React.createElement(DropdownIcon, null) : _ref$after,
    _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    status = _ref.status,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeX = _useAdaptivity.sizeX,
    sizeY = _useAdaptivity.sizeY;
  var title = children || placeholder;
  return /*#__PURE__*/React.createElement(FormField, _extends({}, restProps, {
    tabIndex: disabled ? undefined : tabIndex,
    className: classNames("vkuiSelect", getPlatformClassName("vkuiSelect", platform), getSizeXClassName("vkuiSelect", sizeX), getSizeYClassName("vkuiSelect", sizeY), multiline && "vkuiSelect--multiline", align && styles["Select--align-".concat(align)], before && "vkuiSelect--hasBefore", after && "vkuiSelect--hasAfter", className),
    getRootRef: getRootRef,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    before: before,
    after: after,
    mode: getFormFieldModeFromSelectType(selectType),
    status: status
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSelect__container"
  }, /*#__PURE__*/React.createElement(SelectTypography, {
    selectType: selectType,
    className: "vkuiSelect__title"
  }, title)));
};
var styles = {
  "Select--align-right": "vkuiSelect--align-right",
  "Select--align-center": "vkuiSelect--align-center",
  "Select--align-left": "vkuiSelect--align-left"
};
//# sourceMappingURL=SelectMimicry.js.map