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
    none: "Select__sizeYNone--GT6mN",
    compact: "Select__sizeYCompact--4buaC"
};
/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
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
        className: classNames("Select__host--75d0g", sizeY !== 'regular' && sizeYClassNames[sizeY], !children && "Select__empty--KmYrm", multiline && "Select__multiline--hfSXV", align === 'center' && "Select__alignCenter--En5CZ", align === 'right' && "Select__alignRight--sxXgj", before && "Select__hasBefore--kS-rU", className),
        getRootRef: rootRef,
        onClick: disabled ? undefined : onClick,
        disabled: disabled,
        before: before,
        after: after,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsx("div", {
            className: "Select__container--a-BT8",
            children: /*#__PURE__*/ _jsx(SelectTypography, {
                selectType: selectType,
                className: "Select__title--fNe-i",
                children: title
            })
        })
    }));
};

//# sourceMappingURL=SelectMimicry.js.map