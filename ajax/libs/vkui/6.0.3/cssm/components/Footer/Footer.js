import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './Footer.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Footer
 */ export const Footer = ({ children, className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Footnote, {
        Component: "footer",
        ...restProps,
        className: classNames(styles['Footer'], className)
    }, children);
};

//# sourceMappingURL=Footer.js.map