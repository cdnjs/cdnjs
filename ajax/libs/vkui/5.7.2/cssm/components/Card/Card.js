import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Card.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */ export const Card = ({ mode = 'tint', children, getRootRef, className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        ref: getRootRef,
        className: classNames(styles['Card'], mode === 'outline' && styles['Card--mode-outline'], mode === 'shadow' && styles['Card--mode-shadow'], className)
    }, children);
};

//# sourceMappingURL=Card.js.map