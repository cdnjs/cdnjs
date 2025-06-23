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
    none: "vkuiCustomSelectInput__sizeYNone",
    compact: "vkuiCustomSelectInput__sizeYCompact"
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
        className: classNames("vkuiCustomSelectInput__el", (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && "vkuiCustomSelectInput__elCursorPointer"),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    }));
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        style: style,
        className: classNames("vkuiCustomSelectInput__host", align === 'right' && "vkuiCustomSelectInput__alignRight", align === 'center' && "vkuiCustomSelectInput__alignCenter", !children && "vkuiCustomSelectInput__empty", multiline && "vkuiCustomSelectInput__multiline", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "vkuiCustomSelectInput__hasBefore", after && "vkuiCustomSelectInput__hasAfter", className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "vkuiCustomSelectInput__inputGroup",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: classNames("vkuiCustomSelectInput__container", className),
                    tabIndex: -1,
                    "aria-hidden": true,
                    "data-testid": labelTextTestId,
                    children: /*#__PURE__*/ _jsx(SelectTypography, {
                        selectType: selectType,
                        className: "vkuiCustomSelectInput__title",
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