import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiCustomSelectInput--sizeY-none",
    compact: "vkuiCustomSelectInput--sizeY-compact"
};
/**
 * @since 5.10.0
 * @private
 */ export const CustomSelectInput = (_param)=>{
    var { align = 'left', getRef, className, getRootRef, style, before, after, status, selectedOptionLabel, selectType = 'default', multiline, disabled, fetching, labelTextTestId, searchable } = _param, restInputProps = _object_without_properties(_param, [
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "selectedOptionLabel",
        "selectType",
        "multiline",
        "disabled",
        "fetching",
        "labelTextTestId",
        "searchable"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const handleRootRef = useExternRef(getRootRef);
    const platform = usePlatform();
    const input = /*#__PURE__*/ _jsx(SelectTypography, _object_spread_props(_object_spread({
        selectType: selectType,
        type: "text"
    }, restInputProps), {
        disabled: disabled && !fetching,
        readOnly: restInputProps.readOnly || !searchable || disabled && fetching,
        Component: "input",
        normalize: false,
        className: "vkuiCustomSelectInput__input",
        getRootRef: getRef
    }));
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        style: style,
        className: classNames("vkuiCustomSelectInput", align === 'right' && "vkuiCustomSelectInput--align-right", align === 'center' && "vkuiCustomSelectInput--align-center", !selectedOptionLabel && "vkuiCustomSelectInput--empty", multiline && "vkuiCustomSelectInput--multiline", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "vkuiCustomSelectInput--hasBefore", after && "vkuiCustomSelectInput--hasAfter", className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "vkuiCustomSelectInput__input-group",
            children: [
                !searchable && platform === 'ios' ? /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: input
                }) : input,
                /*#__PURE__*/ _jsx("div", {
                    className: classNames("vkuiCustomSelectInput__label-wrapper", className),
                    tabIndex: -1,
                    "aria-hidden": true,
                    "data-testid": labelTextTestId,
                    children: /*#__PURE__*/ _jsx(SelectTypography, {
                        selectType: selectType,
                        className: "vkuiCustomSelectInput__label",
                        children: selectedOptionLabel || restInputProps.placeholder
                    })
                })
            ]
        })
    });
};

//# sourceMappingURL=CustomSelectInput.js.map