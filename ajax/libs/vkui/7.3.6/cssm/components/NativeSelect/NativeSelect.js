'use client';
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
import styles from "../Select/Select.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
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
 */ export const NativeSelect = ({ style, align, placeholder, children, className, getRef, getRootRef, disabled, multiline, selectType = 'default', status, icon = /*#__PURE__*/ _jsx(DropdownIcon, {}), before, onChange, value, defaultValue, ...restProps })=>{
    const [title, setTitle] = React.useState('');
    const [empty, setEmpty] = React.useState(false);
    const selectRef = useExternRef(getRef);
    const { sizeY = 'none' } = useAdaptivity();
    const checkSelectedOption = ()=>{
        const selectedOption = selectRef.current?.options[selectRef.current.selectedIndex];
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
        onChange?.(e, newValue);
    };
    useIsomorphicLayoutEffect(checkSelectedOption, [
        children
    ]);
    return /*#__PURE__*/ _jsxs(FormField, {
        Component: "div",
        className: classNames(styles.host, 'vkuiInternalNativeSelect', before && styles.hasBefore, empty && styles.empty, multiline && styles.multiline, align === 'center' && styles.alignCenter, align === 'right' && styles.alignRight, sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: disabled,
        before: before,
        after: icon,
        status: status,
        mode: getFormFieldModeFromSelectType(selectType),
        children: [
            /*#__PURE__*/ _jsxs("select", {
                ...restProps,
                value: value !== undefined ? remapFromSelectValueToNativeValue(value) : value,
                defaultValue: defaultValue !== undefined ? remapFromSelectValueToNativeValue(defaultValue) : defaultValue,
                disabled: disabled,
                className: styles.el,
                onChange: callMultiple(_onChange, checkSelectedOption),
                ref: selectRef,
                children: [
                    placeholder && /*#__PURE__*/ _jsx("option", {
                        value: NOT_SELECTED.NATIVE,
                        children: placeholder
                    }),
                    children
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles.container,
                "aria-hidden": true,
                children: /*#__PURE__*/ _jsx(SelectTypography, {
                    className: styles.title,
                    selectType: selectType,
                    children: title
                })
            })
        ]
    });
};

//# sourceMappingURL=NativeSelect.js.map