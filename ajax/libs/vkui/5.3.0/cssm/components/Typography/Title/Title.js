import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Title.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Title
 */ export const Title = ({ className , children , weight , level ='1' , Component , ...restProps })=>{
    if (!Component) {
        Component = 'h' + level;
    }
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        className: classNames(className, styles['Title'], {
            '1': styles['Title--level-1'],
            '2': styles['Title--level-2'],
            '3': styles['Title--level-3']
        }[level], weight && ({
            '1': styles['Title--weight-1'],
            '2': styles['Title--weight-2'],
            '3': styles['Title--weight-3']
        })[weight])
    }, children);
};

//# sourceMappingURL=Title.js.map