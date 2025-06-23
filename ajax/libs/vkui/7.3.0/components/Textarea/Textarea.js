'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useResizeObserver } from "../../hooks/useResizeObserver.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { useDOM } from "../../lib/dom.js";
import { FormField } from "../FormField/FormField.js";
import { UnstyledTextField } from "../UnstyledTextField/UnstyledTextField.js";
import { useResizeTextarea } from "./useResizeTextarea.js";
const sizeYClassNames = {
    none: "vkuiTextarea__sizeYNone",
    compact: "vkuiTextarea__sizeYCompact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */ export const Textarea = (_param)=>{
    var { grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange, align, mode, after, before, afterAlign, beforeAlign, value } = _param, restProps = _object_without_properties(_param, [
        "grow",
        "style",
        "onResize",
        "className",
        "getRootRef",
        "getRef",
        "rows",
        "maxHeight",
        "status",
        "onChange",
        "align",
        "mode",
        "after",
        "before",
        "afterAlign",
        "beforeAlign",
        "value"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    const { window } = useDOM();
    const [refResizeTextarea, resize] = useResizeTextarea(onResize, grow);
    const elementRef = useExternRef(getRef, refResizeTextarea);
    React.useEffect(resize, [
        resize,
        sizeY,
        platform,
        value
    ]);
    useResizeObserver(window, resize);
    return /*#__PURE__*/ _jsx(FormField, {
        className: classNames("vkuiTextarea__host", sizeY !== 'regular' && sizeYClassNames[sizeY], align === 'right' && "vkuiTextarea__alignRight", align === 'center' && "vkuiTextarea__alignCenter", className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status,
        mode: mode,
        after: after,
        before: before,
        afterAlign: afterAlign,
        beforeAlign: beforeAlign,
        maxHeight: maxHeight,
        children: /*#__PURE__*/ _jsx(UnstyledTextField, _object_spread_props(_object_spread({}, restProps), {
            value: value,
            as: "textarea",
            rows: rows,
            className: "vkuiTextarea__el",
            onChange: callMultiple(onChange, resize),
            getRootRef: elementRef
        }))
    });
};

//# sourceMappingURL=Textarea.js.map