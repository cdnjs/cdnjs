'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { useExternRef } from "../../../hooks/useExternRef.js";
import { useFocusWithin } from "../../../hooks/useFocusWithin.js";
import { usePlatform } from "../../../hooks/usePlatform.js";
import { getFormFieldModeFromSelectType } from "../../../lib/select.js";
import { FormField } from "../../FormField/FormField.js";
import { SelectTypography } from "../../SelectTypography/SelectTypography.js";
import { Text } from "../../Typography/Text/Text.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
const sizeYClassNames = {
    none: "CustomSelectInput__sizeYNone--pVvSA",
    compact: "CustomSelectInput__sizeYCompact--Z5rfU"
};
/**
 * @since 5.10.0
 * @private
 */ export const CustomSelectInput = (_param)=>{
    var { align = 'left', getRef, className, getRootRef, style, before, after, status, children, placeholder, selectType = 'default', multiline, disabled, fetching, labelTextTestId } = _param, restProps = _object_without_properties(_param, [
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "children",
        "placeholder",
        "selectType",
        "multiline",
        "disabled",
        "fetching",
        "labelTextTestId"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const title = children || placeholder;
    const showLabelOrPlaceholder = !Boolean(restProps.value);
    const handleRootRef = useExternRef(getRootRef);
    const focusWithin = useFocusWithin(handleRootRef);
    const input = /*#__PURE__*/ _jsx(Text, _object_spread_props(_object_spread({
        type: "text"
    }, restProps), {
        disabled: disabled && !fetching,
        readOnly: restProps.readOnly || disabled && fetching,
        Component: "input",
        normalize: false,
        className: classNames("CustomSelectInput__el--ceT5C", (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && "CustomSelectInput__elCursorPointer--qU8Md"),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    }));
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        style: style,
        className: classNames("CustomSelectInput__host--bG9aB", align === 'right' && "CustomSelectInput__alignRight--Lm-na", align === 'center' && "CustomSelectInput__alignCenter--n8gD9", !children && "CustomSelectInput__empty---ALAr", multiline && "CustomSelectInput__multiline--l-kIr", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "CustomSelectInput__hasBefore--0VQHX", after && "CustomSelectInput__hasAfter--Sz23w", className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "CustomSelectInput__inputGroup--4U0iX",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: classNames("CustomSelectInput__container--c-jD3", className),
                    tabIndex: -1,
                    "aria-hidden": true,
                    "data-testid": labelTextTestId,
                    children: /*#__PURE__*/ _jsx(SelectTypography, {
                        selectType: selectType,
                        className: "CustomSelectInput__title--m-bai",
                        children: showLabelOrPlaceholder && title
                    })
                }),
                restProps.readOnly && platform === 'ios' ? /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: input
                }) : input
            ]
        })
    });
};

//# sourceMappingURL=CustomSelectInput.js.map