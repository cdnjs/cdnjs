import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { callMultiple } from '../../lib/callMultiple';
import { FormField } from '../FormField/FormField';
import { UnstyledTextField } from '../UnstyledTextField/UnstyledTextField';
import { useResizeTextarea } from './useResizeTextarea';
const sizeYClassNames = {
    none: "vkuiTextarea--sizeY-none",
    ['compact']: "vkuiTextarea--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */ export const Textarea = (_param)=>{
    var { grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange, align, mode } = _param, restProps = _object_without_properties(_param, [
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
        "mode"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const [refResizeTextarea, resize] = useResizeTextarea(onResize, grow);
    const elementRef = useExternRef(getRef, refResizeTextarea);
    React.useEffect(resize, [
        resize,
        sizeY
    ]);
    return /*#__PURE__*/ _jsx(FormField, {
        className: classNames("vkuiTextarea", sizeY !== 'regular' && sizeYClassNames[sizeY], align === 'right' && "vkuiTextarea--align-right", align === 'center' && "vkuiTextarea--align-center", className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status,
        mode: mode,
        children: /*#__PURE__*/ _jsx(UnstyledTextField, _object_spread_props(_object_spread({}, restProps), {
            as: "textarea",
            style: {
                maxHeight
            },
            rows: rows,
            className: "vkuiTextarea__el",
            onChange: callMultiple(onChange, resize),
            getRootRef: elementRef
        }))
    });
};

//# sourceMappingURL=Textarea.js.map