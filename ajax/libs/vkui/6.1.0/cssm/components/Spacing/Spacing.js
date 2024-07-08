import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Spacing.module.css';
export const ALLOWED_SIZES = [
    '3xs',
    '2xs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl'
];
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = ({ size = 'm', style: styleProp, ...restProps })=>{
    const style = {
        ...getSizeStyle(size),
        ...styleProp
    };
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: styles['Spacing'],
        style: style
    });
};
function getSizeStyle(size) {
    const sizeValue = getSizeValue(size);
    return {
        height: sizeValue,
        padding: `calc(${sizeValue} / 2px) 0`
    };
}
function getSizeValue(size) {
    return typeof size === 'string' ? `var(--vkui--spacing_size_${size})` : size;
}

//# sourceMappingURL=Spacing.js.map