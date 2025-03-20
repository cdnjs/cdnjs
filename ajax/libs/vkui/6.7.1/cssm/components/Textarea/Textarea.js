import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { callMultiple } from '../../lib/callMultiple';
import { useDOM } from '../../lib/dom';
import { FormField } from '../FormField/FormField';
import { UnstyledTextField } from '../UnstyledTextField/UnstyledTextField';
import { useResizeTextarea } from './useResizeTextarea';
import styles from './Textarea.module.css';
const sizeYClassNames = {
    none: styles['Textarea--sizeY-none'],
    compact: styles['Textarea--sizeY-compact']
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
    useGlobalEventListener(window, 'resize', resize);
    return /*#__PURE__*/ _jsx(FormField, {
        className: classNames(styles['Textarea'], sizeY !== 'regular' && sizeYClassNames[sizeY], align === 'right' && styles['Textarea--align-right'], align === 'center' && styles['Textarea--align-center'], className),
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
            className: styles['Textarea__el'],
            onChange: callMultiple(onChange, resize),
            getRootRef: elementRef
        })
    });
};

//# sourceMappingURL=Textarea.js.map