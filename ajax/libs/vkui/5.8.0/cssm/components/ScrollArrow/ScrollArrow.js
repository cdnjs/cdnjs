import * as React from 'react';
import { Icon16Chevron, Icon16ChevronLeft, Icon24Chevron, Icon24ChevronCompactLeft } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './ScrollArrow.module.css';
const stylesSize = {
    m: styles['ScrollArrow--size-m'],
    l: styles['ScrollArrow--size-l']
};
const stylesDirection = {
    left: styles['ScrollArrow--direction-left'],
    right: styles['ScrollArrow--direction-right']
};
const ArrowIcon = ({ size, direction })=>{
    if (size === 'm') {
        return direction === 'left' ? /*#__PURE__*/ React.createElement(Icon16ChevronLeft, null) : /*#__PURE__*/ React.createElement(Icon16Chevron, null);
    }
    return direction === 'left' ? /*#__PURE__*/ React.createElement(Icon24ChevronCompactLeft, null) : /*#__PURE__*/ React.createElement(Icon24Chevron, null);
};
/**
 * Компонент стрелки из HorizontalScroll
 *
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/ScrollArrow
 */ export const ScrollArrow = ({ size = 'l', offsetY, direction, children = /*#__PURE__*/ React.createElement(ArrowIcon, {
    direction: direction,
    size: size
}), ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        Component: "button",
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