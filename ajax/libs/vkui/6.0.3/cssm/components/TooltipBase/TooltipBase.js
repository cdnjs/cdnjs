import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DefaultIcon } from '../FloatingArrow/DefaultIcon';
import { FloatingArrow } from '../FloatingArrow/FloatingArrow';
import { RootComponent } from '../RootComponent/RootComponent';
import { Subhead } from '../Typography/Subhead/Subhead';
import styles from './TooltipBase.module.css';
export const TOOLTIP_MAX_WIDTH = 220;
const stylesAppearance = {
    accent: styles['TooltipBase--appearance-accent'],
    white: styles['TooltipBase--appearance-white'],
    black: styles['TooltipBase--appearance-black'],
    inversion: styles['TooltipBase--appearance-inversion']
};
/**
 * Низкоуровневый компонент для отрисовки тултипа.
 * Примеры использования и Readme можно найти в документации Tooltip
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 * @private
 */ export const TooltipBase = ({ appearance = 'accent', arrowProps, ArrowIcon = DefaultIcon, text, header, maxWidth = TOOLTIP_MAX_WIDTH, className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['TooltipBase'], appearance !== 'neutral' && stylesAppearance[appearance], className),
        role: "tooltip"
    }, arrowProps && /*#__PURE__*/ React.createElement(FloatingArrow, {
        ...arrowProps,
        iconClassName: classNames(styles['TooltipBase__arrow'], arrowProps.iconClassName),
        Icon: ArrowIcon
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['TooltipBase__content'],
        style: maxWidth !== null ? {
            maxWidth
        } : undefined
    }, header && /*#__PURE__*/ React.createElement(Subhead, {
        weight: "2"
    }, header), text && /*#__PURE__*/ React.createElement(Subhead, null, text)));
};

//# sourceMappingURL=TooltipBase.js.map