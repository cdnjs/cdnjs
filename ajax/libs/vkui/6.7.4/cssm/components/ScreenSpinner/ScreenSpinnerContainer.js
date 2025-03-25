import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ScreenSpinnerContext } from './context';
import styles from './ScreenSpinner.module.css';
const stateClassNames = {
    cancelable: styles['ScreenSpinner--state-cancelable'],
    done: styles['ScreenSpinner--state-done'],
    error: styles['ScreenSpinner--state-error']
};
const modeClassNames = {
    shadow: styles['ScreenSpinner--mode-shadow'],
    overlay: styles['ScreenSpinner--mode-overlay']
};
export const ScreenSpinnerContainer = ({ state = 'loading', mode = 'shadow', caption, children, ...restProps })=>{
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state,
            caption
        },
        children: /*#__PURE__*/ _jsxs(RootComponent, {
            baseClassName: classNames(styles['ScreenSpinner'], modeClassNames[mode], state !== 'loading' && stateClassNames[state], hasReactNode(caption) && styles['ScreenSpinner--has-caption']),
            ...restProps,
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: styles['ScreenSpinner__icon-slot'],
                    children: children
                }),
                hasReactNode(caption) && /*#__PURE__*/ _jsx(Footnote, {
                    className: styles.ScreenSpinner__caption,
                    "aria-hidden": true,
                    children: caption
                })
            ]
        })
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map