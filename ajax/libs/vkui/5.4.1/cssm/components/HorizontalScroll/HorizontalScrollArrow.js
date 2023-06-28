import * as React from 'react';
import { Icon16Chevron, Icon16ChevronLeft, Icon24Chevron, Icon24ChevronCompactLeft } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import styles from './HorizontalScrollArrow.module.css';
export const HorizontalScrollArrow = ({ size ='l' , offsetY , direction , onClick , className , ...restProps })=>{
    let ArrowIcon;
    if (size === 'm') {
        ArrowIcon = direction === 'left' ? Icon16ChevronLeft : Icon16Chevron;
    } else {
        ArrowIcon = direction === 'left' ? Icon24ChevronCompactLeft : Icon24Chevron;
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        Component: "button",
        hasHover: false,
        hasActive: false,
        className: classNames(styles['HorizontalScrollArrow'], {
            m: styles['HorizontalScrollArrow--size-m'],
            l: styles['HorizontalScrollArrow--size-l']
        }[size], {
            left: styles['HorizontalScrollArrow--direction-left'],
            right: styles['HorizontalScrollArrow--direction-right']
        }[direction], className),
        onClick: onClick
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['HorizontalScrollArrow__icon'],
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, /*#__PURE__*/ React.createElement(ArrowIcon, null)));
};

//# sourceMappingURL=HorizontalScrollArrow.js.map