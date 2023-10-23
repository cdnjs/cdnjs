import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Gradient.module.css';
const stylesMode = {
    tint: styles['Gradient--mode-tint'],
    black: styles['Gradient--mode-black'],
    white: styles['Gradient--mode-white']
};
const stylesTo = {
    top: styles['Gradient--to-top'],
    bottom: styles['Gradient--to-bottom']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export const Gradient = ({ mode = 'tint', to = 'top', ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        role: "presentation",
        ...restProps,
        baseClassName: classNames(stylesMode[mode], stylesTo[to])
    });
};

//# sourceMappingURL=Gradient.js.map