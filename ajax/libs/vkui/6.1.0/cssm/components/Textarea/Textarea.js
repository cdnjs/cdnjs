import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { callMultiple } from '../../lib/callMultiple';
import { FormField } from '../FormField/FormField';
import { UnstyledTextField } from '../UnstyledTextField/UnstyledTextField';
import styles from './Textarea.module.css';
const sizeYClassNames = {
    none: styles['Textarea--sizeY-none'],
    ['compact']: styles['Textarea--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */ export const Textarea = ({ grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange, align, mode, ...restProps })=>{
    const currentScrollHeight = React.useRef();
    const elementRef = useExternRef(getRef);
    const { sizeY = 'none' } = useAdaptivity();
    const autosizeInput = ()=>{
        const el = elementRef.current;
        if (grow && el?.offsetParent) {
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
        className: classNames(styles['Textarea'], sizeY !== 'regular' && sizeYClassNames[sizeY], align === 'right' && styles['Textarea--align-right'], align === 'center' && styles['Textarea--align-center'], className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status,
        mode: mode,
        children: /*#__PURE__*/ _jsx(UnstyledTextField, {
            ...restProps,
            as: "textarea",
            style: {
                maxHeight
            },
            rows: rows,
            className: styles['Textarea__el'],
            onChange: callMultiple(onChange, autosizeInput),
            getRootRef: elementRef
        })
    });
};

//# sourceMappingURL=Textarea.js.map