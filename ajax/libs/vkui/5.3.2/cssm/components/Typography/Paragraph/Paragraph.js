import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Paragraph.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */ export const Paragraph = ({ className , Component ='span' , getRootRef , weight , children , ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        ref: getRootRef,
        className: classNames(className, styles['Paragraph'], weight && ({
            '1': styles['Paragraph--weight-1'],
            '2': styles['Paragraph--weight-2'],
            '3': styles['Paragraph--weight-3']
        })[weight])
    }, children);
};

//# sourceMappingURL=Paragraph.js.map