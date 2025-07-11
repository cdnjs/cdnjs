'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { getFormFieldModeFromSelectType } from "../../lib/select.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon.js";
import { FormField } from "../FormField/FormField.js";
import { SelectTypography } from "../SelectTypography/SelectTypography.js";
const sizeYClassNames = {
    none: "vkuiSelect__sizeYNone",
    compact: "vkuiSelect__sizeYCompact"
};
export const NOT_SELECTED = {
    NATIVE: '__vkui_internal_Select_not_selected__',
    CUSTOM: null
};
/**
 * @visibleName NativeSelect
 */ export const remapFromSelectValueToNativeValue = (value)=>value === NOT_SELECTED.CUSTOM ? NOT_SELECTED.NATIVE : value;
export const remapFromNativeValueToSelectValue = (value)=>value === NOT_SELECTED.NATIVE ? NOT_SELECTED.CUSTOM : value;
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */ export const NativeSelect = (_param)=>{
    var { style, align, placeholder, children, className, getRef, getRootRef, disabled, multiline, selectType = 'default', status, icon = /*#__PURE__*/ _jsx(DropdownIcon, {}), before, onChange, value, defaultValue } = _param, restProps = _object_without_properties(_param, [
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
        "onChange",
        "value",
        "defaultValue"
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
            setEmpty(selectedOption.value === NOT_SELECTED.NATIVE && placeholder != null);
        }
    };
    const _onChange = (e)=>{
        const newValue = remapFromNativeValueToSelectValue(e.target.value);
        if (e.target.value === NOT_SELECTED.NATIVE) {
            e.target.value = '';
        }
        if (e.currentTarget.value === NOT_SELECTED.NATIVE) {
            e.currentTarget.value = '';
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(e, newValue);
    };
    useIsomorphicLayoutEffect(checkSelectedOption, [
        children
    ]);
    return /*#__PURE__*/ _jsxs(FormField, {
        Component: "div",
        className: classNames("vkuiSelect__host", 'vkuiInternalNativeSelect', before && "vkuiSelect__hasBefore", empty && "vkuiSelect__empty", multiline && "vkuiSelect__multiline", align === 'center' && "vkuiSelect__alignCenter", align === 'right' && "vkuiSelect__alignRight", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: disabled,
        before: before,
        after: icon,
        status: status,
        mode: getFormFieldModeFromSelectType(selectType),
        children: [
            /*#__PURE__*/ _jsxs("select", _object_spread_props(_object_spread({}, restProps), {
                value: value !== undefined ? remapFromSelectValueToNativeValue(value) : value,
                defaultValue: defaultValue !== undefined ? remapFromSelectValueToNativeValue(defaultValue) : defaultValue,
                disabled: disabled,
                className: "vkuiSelect__el",
                onChange: callMultiple(_onChange, checkSelectedOption),
                ref: selectRef,
                children: [
                    placeholder && /*#__PURE__*/ _jsx("option", {
                        value: NOT_SELECTED.NATIVE,
                        children: placeholder
                    }),
                    children
                ]
            })),
            /*#__PURE__*/ _jsx("div", {
                className: "vkuiSelect__container",
                "aria-hidden": true,
                children: /*#__PURE__*/ _jsx(SelectTypography, {
                    className: "vkuiSelect__title",
                    selectType: selectType,
                    children: title
                })
            })
        ]
    });
};

//# sourceMappingURL=NativeSelect.js.map