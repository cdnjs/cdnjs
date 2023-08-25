import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import { useExternRef } from '../../hooks/useExternRef';
import { SizeType } from '../../lib/adaptivity';
import { FormField } from '../FormField/FormField';
import { Text } from '../Typography/Text/Text';
import styles from './Textarea.module.css';
const sizeYClassNames = {
    none: styles['Textarea--sizeY-none'],
    [SizeType.COMPACT]: styles['Textarea--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */ export const Textarea = ({ defaultValue = '', grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange: onChangeProp, value: valueProp, ...restProps })=>{
    const [value, onChange] = useEnsuredControl({
        defaultValue,
        onChange: onChangeProp,
        value: valueProp
    });
    const currentScrollHeight = React.useRef();
    const elementRef = useExternRef(getRef);
    const { sizeY = 'none' } = useAdaptivity();
    // autosize input
    React.useEffect(()=>{
        const el = elementRef.current;
        if (grow && el?.offsetParent) {
            el.style.height = '';
            el.style.height = `${el.scrollHeight}px`;
            if (el.scrollHeight !== currentScrollHeight.current && onResize) {
                onResize(el);
                currentScrollHeight.current = el.scrollHeight;
            }
        }
    }, [
        grow,
        value,
        sizeY,
        elementRef,
        onResize
    ]);
    return /*#__PURE__*/ React.createElement(FormField, {
        className: classNames(styles['Textarea'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status
    }, /*#__PURE__*/ React.createElement(Text, {
        ...restProps,
        Component: "textarea",
        normalize: false,
        style: {
            maxHeight
        },
        rows: rows,
        className: styles['Textarea__el'],
        value: value,
        onChange: onChange,
        getRootRef: elementRef
    }));
};

//# sourceMappingURL=Textarea.js.map