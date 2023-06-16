import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Caption.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Caption
 */ export const Caption = ({ className , children , weight , level ='1' , caps , Component ='span' , ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        className: classNames(className, styles['Caption'], caps && styles['Caption--caps'], {
            '1': styles['Caption--level-1'],
            '2': styles['Caption--level-2'],
            '3': styles['Caption--level-3']
        }[level], weight && ({
            '1': styles['Caption--weight-1'],
            '2': styles['Caption--weight-2'],
            '3': styles['Caption--weight-3']
        })[weight])
    }, children);
};

//# sourceMappingURL=Caption.js.map