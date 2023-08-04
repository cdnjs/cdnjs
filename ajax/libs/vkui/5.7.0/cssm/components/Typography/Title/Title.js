import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
import styles from './Title.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Title
 */ export const Title = ({ className, level = '1', Component, normalize = true, ...restProps })=>{
    if (!Component) {
        Component = 'h' + level;
    }
    return /*#__PURE__*/ React.createElement(Typography, {
        Component: Component,
        normalize: normalize,
        className: classNames(className, {
            '1': styles['Title--level-1'],
            '2': styles['Title--level-2'],
            '3': styles['Title--level-3']
        }[level]),
        ...restProps
    });
};

//# sourceMappingURL=Title.js.map