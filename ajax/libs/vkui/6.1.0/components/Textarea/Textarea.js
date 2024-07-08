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
    const currentScrollHeight = React.useRef();
    const elementRef = useExternRef(getRef);
    const { sizeY = 'none' } = useAdaptivity();
    const autosizeInput = ()=>{
        const el = elementRef.current;
        if (grow && (el === null || el === void 0 ? void 0 : el.offsetParent)) {
            el.style.height = '';
            el.style.height = `${el.scrollHeight}px`;
            if (el.scrollHeight !== currentScrollHeight.current && onResize) {
                onResize(el);
                currentScrollHeight.current = el.scrollHeight;
            }
        }
    };
    React.useEffect(autosizeInput, [
        grow,
        sizeY,
        elementRef,
        onResize
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
            onChange: callMultiple(onChange, autosizeInput),
            getRootRef: elementRef
        }))
    });
};

//# sourceMappingURL=Textarea.js.map