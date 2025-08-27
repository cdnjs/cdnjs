'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useAutoFocus } from "../../hooks/useAutoFocus.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { getFormFieldModeFromSelectType } from "../../lib/select.js";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon.js";
import { FormField } from "../FormField/FormField.js";
import { SelectTypography } from "../SelectTypography/SelectTypography.js";
const sizeYClassNames = {
    none: "vkuiSelect__sizeYNone",
    compact: "vkuiSelect__sizeYCompact"
};
/**
 * @see https://vkui.io/components/select-mimicry
 */ export const SelectMimicry = (_param)=>{
    var { tabIndex = 0, placeholder, children, align, getRootRef, multiline, disabled, onClick, before, after = /*#__PURE__*/ _jsx(DropdownIcon, {}), selectType = 'default', status, className, autoFocus } = _param, restProps = _object_without_properties(_param, [
        "tabIndex",
        "placeholder",
        "children",
        "align",
        "getRootRef",
        "multiline",
        "disabled",
        "onClick",
        "before",
        "after",
        "selectType",
        "status",
        "className",
        "autoFocus"
    ]);
    const rootRef = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const title = children || placeholder;
    useAutoFocus(rootRef, autoFocus);
    return /*#__PURE__*/ _jsx(FormField, _object_spread_props(_object_spread({}, restProps), {
        tabIndex: disabled ? undefined : tabIndex,
        className: classNames("vkuiSelect__host", sizeY !== 'regular' && sizeYClassNames[sizeY], !children && "vkuiSelect__empty", multiline && "vkuiSelect__multiline", align === 'center' && "vkuiSelect__alignCenter", align === 'right' && "vkuiSelect__alignRight", before && "vkuiSelect__hasBefore", className),
        getRootRef: rootRef,
        onClick: disabled ? undefined : onClick,
        disabled: disabled,
        before: before,
        after: after,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsx("div", {
            className: "vkuiSelect__container",
            children: /*#__PURE__*/ _jsx(SelectTypography, {
                selectType: selectType,
                className: "vkuiSelect__title",
                children: title
            })
        })
    }));
};

//# sourceMappingURL=SelectMimicry.js.map