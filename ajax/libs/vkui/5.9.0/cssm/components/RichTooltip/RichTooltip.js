import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { HoverPopper } from '../HoverPopper/HoverPopper';
import styles from './RichTooltip.module.css';
const stylesAppearance = {
    accent: styles['RichTooltip--appearance-accent'],
    white: styles['RichTooltip--appearance-white'],
    black: styles['RichTooltip--appearance-black'],
    inversion: styles['RichTooltip--appearance-inversion']
};
/**
 * @see https://vkcom.github.io/VKUI/#/RichTooltip
 */ export const RichTooltip = ({ children, arrow = true, appearance = 'neutral', className, ...popperProps })=>{
    return /*#__PURE__*/ React.createElement(HoverPopper, {
        className: classNames(styles['RichTooltip'], appearance !== 'neutral' && stylesAppearance[appearance], className),
        arrow: arrow,
        arrowClassName: styles['RichTooltip__arrow'],
        ...popperProps
    }, children);
};

//# sourceMappingURL=RichTooltip.js.map