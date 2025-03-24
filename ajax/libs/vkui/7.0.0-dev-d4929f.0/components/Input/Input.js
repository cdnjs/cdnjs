'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { FormField } from "../FormField/FormField.js";
import { UnstyledTextField } from "../UnstyledTextField/UnstyledTextField.js";
const sizeYClassNames = {
    none: "Input__sizeYNone--hi0M-",
    compact: "Input__sizeYCompact--PpO8J"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */ export const Input = (_param)=>{
    var { type = 'text', align = 'left', getRef, className, getRootRef, style, before, after, status, mode } = _param, restProps = _object_without_properties(_param, [
        "type",
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "mode"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(FormField, {
        style: style,
        className: classNames("Input__host--IPiG1", align === 'right' && "Input__alignRight--ONgZw", align === 'center' && "Input__alignCenter--rIDoE", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "Input__hasBefore--oqHYP", after && "Input__hasAfter--BIFAJ", className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status,
        children: /*#__PURE__*/ _jsx(UnstyledTextField, _object_spread_props(_object_spread({}, restProps), {
            as: "input",
            type: type,
            className: "Input__el--mpRMr",
            getRootRef: getRef
        }))
    });
};

//# sourceMappingURL=Input.js.map