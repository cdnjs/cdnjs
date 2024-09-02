import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Spacing.module.css';
export const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--Spacing_gap';
export const sizesClassNames = {
    '3xs': styles['Spacing--3xs'],
    '2xs': styles['Spacing--2xs'],
    'xs': styles['Spacing--xs'],
    's': styles['Spacing--s'],
    'm': styles['Spacing--m'],
    'l': styles['Spacing--l'],
    'xl': styles['Spacing--xl'],
    '2xl': styles['Spacing--2xl'],
    '3xl': styles['Spacing--3xl'],
    '4xl': styles['Spacing--4xl']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = ({ size = 'm', style, className, ...restProps })=>{
    if (typeof size === 'string') {
        className = className ? classNames(sizesClassNames[size], className) : sizesClassNames[size];
    } else {
        if (style) {
            // @ts-expect-error: TS7053 В React.CSSProperties не учитывается Custom Properties
            style[CUSTOM_CSS_TOKEN_FOR_USER_GAP] = size;
        } else {
            // @ts-expect-error: TS2353 В React.CSSProperties не учитывается Custom Properties
            style = {
                [CUSTOM_CSS_TOKEN_FOR_USER_GAP]: size
            };
        }
    }
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        style: style,
        className: className,
        baseClassName: styles['Spacing']
    });
};

//# sourceMappingURL=Spacing.js.map