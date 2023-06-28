import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Caption } from '../Typography/Caption/Caption';
import { Headline } from '../Typography/Headline/Headline';
import styles from './Counter.module.css';
const modeClassNames = {
    secondary: styles['Counter--mode-secondary'],
    primary: styles['Counter--mode-primary'],
    prominent: styles['Counter--mode-prominent'],
    contrast: styles['Counter--mode-contrast'],
    inherit: styles['Counter--mode-inherit']
};
const sizeClassNames = {
    s: styles['Counter--size-s'],
    m: styles['Counter--size-m']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */ export const Counter = ({ mode ='inherit' , size ='m' , children , className , ...restProps })=>{
    if (React.Children.count(children) === 0) {
        return null;
    }
    const CounterTypography = size === 's' ? Caption : Headline;
    const counterLevel = size === 's' ? '1' : '2';
    return /*#__PURE__*/ React.createElement("span", {
        ...restProps,
        className: classNames(styles['Counter'], modeClassNames[mode], sizeClassNames[size], className)
    }, hasReactNode(children) && /*#__PURE__*/ React.createElement(CounterTypography, {
        Component: "span",
        className: styles['Counter__in'],
        level: counterLevel
    }, children));
};

//# sourceMappingURL=Counter.js.map