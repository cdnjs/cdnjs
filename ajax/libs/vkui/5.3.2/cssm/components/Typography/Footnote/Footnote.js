import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Footnote.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */ export const Footnote = ({ className , children , weight , caps , Component ='span' , ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        className: classNames(className, styles['Footnote'], caps && styles['Footnote--caps'], weight && ({
            '1': styles['Footnote--weight-1'],
            '2': styles['Footnote--weight-2'],
            '3': styles['Footnote--weight-3']
        })[weight])
    }, children);
};

//# sourceMappingURL=Footnote.js.map