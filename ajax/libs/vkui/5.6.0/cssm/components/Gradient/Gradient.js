import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Gradient.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export const Gradient = ({ mode = 'tint', children, to = 'top', className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement("div", {
        role: "presentation",
        ...restProps,
        className: classNames({
            tint: styles['Gradient--mode-tint'],
            black: styles['Gradient--mode-black'],
            white: styles['Gradient--mode-white']
        }[mode], {
            top: styles['Gradient--to-top'],
            bottom: styles['Gradient--to-bottom']
        }[to], className)
    }, children);
};

//# sourceMappingURL=Gradient.js.map