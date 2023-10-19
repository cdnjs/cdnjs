import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Card.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */ export const Card = ({ mode = 'tint', ...restProps })=>{
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Card'], mode === 'outline' && styles['Card--mode-outline'], mode === 'shadow' && styles['Card--mode-shadow'], withBorder && styles['Card--withBorder'])
    });
};

//# sourceMappingURL=Card.js.map