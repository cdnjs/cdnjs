import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Div.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Div
 */ export const Div = ({ children, getRootRef, className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        ref: getRootRef,
        className: classNames(styles['Div'], className)
    }, children);
};

//# sourceMappingURL=Div.js.map