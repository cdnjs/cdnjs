import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
import styles from './Caption.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Caption
 */ export const Caption = ({ className, level = '1', caps, Component = 'span', normalize = true, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Typography, {
        Component: Component,
        normalize: normalize,
        className: classNames(className, caps && styles['Caption--caps'], {
            '1': styles['Caption--level-1'],
            '2': styles['Caption--level-2'],
            '3': styles['Caption--level-3']
        }[level]),
        ...restProps
    });
};

//# sourceMappingURL=Caption.js.map