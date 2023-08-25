import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Typography.module.css';
export const Typography = ({ className, weight, Component = 'span', normalize, getRootRef, ...restProps })=>/*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        ref: getRootRef,
        className: classNames(className, normalize && styles['Typography--normalize'], weight && ({
            '1': styles['Typography--weight-1'],
            '2': styles['Typography--weight-2'],
            '3': styles['Typography--weight-3']
        })[weight])
    });

//# sourceMappingURL=Typography.js.map