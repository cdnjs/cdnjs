import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { callMultiple } from '../../lib/callMultiple';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
const sizeYClassNames = {
    none: "vkuiSelect--sizeY-none",
    ['compact']: "vkuiSelect--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */ const NativeSelect = (_param)=>{
    var { style, align, placeholder, children, className, getRef, getRootRef, disabled, multiline, selectType = 'default', status, icon = /*#__PURE__*/ React.createElement(DropdownIcon, null), before, onChange } = _param, restProps = _object_without_properties(_param, [
        "style",
        "align",
        "placeholder",
        "children",
        "className",
        "getRef",
        "getRootRef",
        "disabled",
        "multiline",
        "selectType",
        "status",
        "icon",
        "before",
        "onChange"
    ]);
    const [title, setTitle] = React.useState('');
    const [empty, setEmpty] = React.useState(false);
    const selectRef = useExternRef(getRef);
    const { sizeY = 'none' } = useAdaptivity();
    const checkSelectedOption = ()=>{
        var _selectRef_current;
        const selectedOption = (_selectRef_current = selectRef.current) === null || _selectRef_current === void 0 ? void 0 : _selectRef_current.options[selectRef.current.selectedIndex];
        if (selectedOption) {
            setTitle(selectedOption.text);
            setEmpty(selectedOption.value === '' && placeholder != null);
        }
    };
    useIsomorphicLayoutEffect(checkSelectedOption, [
        children
    ]);
    return /*#__PURE__*/ React.createElement(FormField, {
        Component: "div",
        className: classNames("vkuiSelect", 'vkuiInternalNativeSelect', before && "vkuiSelect--hasBefore", empty && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === 'center' && "vkuiSelect--align-center", align === 'right' && "vkuiSelect--align-right", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: disabled,
        before: before,
        after: icon,
        status: status,
        mode: getFormFieldModeFromSelectType(selectType)
    }, /*#__PURE__*/ React.createElement("select", _object_spread_props(_object_spread({}, restProps), {
        disabled: disabled,
        className: "vkuiSelect__el",
        onChange: callMultiple(onChange, checkSelectedOption),
        ref: selectRef
    }), placeholder && /*#__PURE__*/ React.createElement("option", {
        value: ""
    }, placeholder), children), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSelect__container",
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(SelectTypography, {
        className: "vkuiSelect__title",
        selectType: selectType
    }, title)));
};
export { NativeSelect };

//# sourceMappingURL=NativeSelect.js.map