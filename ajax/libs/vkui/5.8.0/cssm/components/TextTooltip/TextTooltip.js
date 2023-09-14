import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { HoverPopper } from '../HoverPopper/HoverPopper';
import { Subhead } from '../Typography/Subhead/Subhead';
import styles from './TextTooltip.module.css';
const stylesAppearance = {
    accent: styles['TextTooltip--appearance-accent'],
    white: styles['TextTooltip--appearance-white'],
    black: styles['TextTooltip--appearance-black'],
    inversion: styles['TextTooltip--appearance-inversion']
};
/**
 * @see https://vkcom.github.io/VKUI/#/TextTooltip
 */ export const TextTooltip = ({ children, text, header, appearance = 'neutral', className, ...popperProps })=>{
    return /*#__PURE__*/ React.createElement(HoverPopper, {
        className: classNames(styles['TextTooltip'], appearance !== 'neutral' && stylesAppearance[appearance], className),
        arrow: true,
        arrowClassName: styles['TextTooltip__arrow'],
        content: /*#__PURE__*/ React.createElement(React.Fragment, null, hasReactNode(header) && /*#__PURE__*/ React.createElement(Subhead, {
            weight: "2"
        }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(Subhead, null, text)),
        ...popperProps
    }, children);
};

//# sourceMappingURL=TextTooltip.js.map