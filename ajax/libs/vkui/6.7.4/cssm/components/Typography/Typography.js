import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Typography.module.css';
const stylesWeight = {
    '1': styles['Typography--weight-1'],
    '2': styles['Typography--weight-2'],
    '3': styles['Typography--weight-3']
};
export const Typography = ({ weight, // TODO [>=7]: сделать по умолчанию false (нужен будет кодмод)
useAccentWeight = true, Component = 'span', normalize, inline, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        Component: Component,
        baseClassName: classNames(styles['Typography'], normalize && styles['Typography--normalize'], inline && styles['Typography--inline'], weight && stylesWeight[weight], weight && useAccentWeight && styles['Typography--accent']),
        ...restProps
    });

//# sourceMappingURL=Typography.js.map