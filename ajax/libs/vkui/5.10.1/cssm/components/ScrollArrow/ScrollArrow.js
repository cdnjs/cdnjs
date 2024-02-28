import * as React from 'react';
import { Icon16Chevron, Icon24Chevron } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './ScrollArrow.module.css';
const stylesSize = {
    m: styles['ScrollArrow--size-m'],
    l: styles['ScrollArrow--size-l']
};
const stylesDirection = {
    up: styles['ScrollArrow--direction-up'],
    right: styles['ScrollArrow--direction-right'],
    down: styles['ScrollArrow--direction-down'],
    left: styles['ScrollArrow--direction-left']
};
const ArrowIcon = ({ size })=>{
    let Icon = Icon24Chevron;
    if (size === 'm') {
        Icon = Icon16Chevron;
    }
    return /*#__PURE__*/ React.createElement(Icon, {
        className: styles['ScrollArrow__defaultIcon']
    });
};
/**
 * Компонент стрелки из HorizontalScroll
 *
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/ScrollArrow
 */ export const ScrollArrow = ({ size = 'l', offsetY, direction, children = /*#__PURE__*/ React.createElement(ArrowIcon, {
    size: size
}), ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        Component: "button",
        type: "button",
        baseClassName: classNames(styles['ScrollArrow'], stylesSize[size], stylesDirection[direction]),
        ...restProps
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['ScrollArrow__icon'],
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, children));
};

//# sourceMappingURL=ScrollArrow.js.map