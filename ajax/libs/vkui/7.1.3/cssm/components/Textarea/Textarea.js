'use client';
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
import styles from "./Textarea.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */ export const Textarea = ({ grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange, align, mode, after, before, afterAlign, beforeAlign, value, ...restProps })=>{
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
        className: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], align === 'right' && styles.alignRight, align === 'center' && styles.alignCenter, className),
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
        children: /*#__PURE__*/ _jsx(UnstyledTextField, {
            ...restProps,
            value: value,
            as: "textarea",
            rows: rows,
            className: styles.el,
            onChange: callMultiple(onChange, resize),
            getRootRef: elementRef
        })
    });
};

//# sourceMappingURL=Textarea.js.map