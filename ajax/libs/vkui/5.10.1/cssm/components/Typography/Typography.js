import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Typography.module.css';
const stylesWeight = {
    '1': styles['Typography--weight-1'],
    '2': styles['Typography--weight-2'],
    '3': styles['Typography--weight-3']
};
export const Typography = ({ weight, Component = 'span', normalize, ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, {
        Component: Component,
        baseClassName: classNames(styles['Typography'], normalize && styles['Typography--normalize'], weight && stylesWeight[weight]),
        ...restProps
    });

//# sourceMappingURL=Typography.js.map