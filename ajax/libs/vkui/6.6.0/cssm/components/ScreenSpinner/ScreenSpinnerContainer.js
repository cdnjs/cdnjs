import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
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
export const ScreenSpinnerContainer = ({ state = 'loading', mode = 'shadow', ...restProps })=>{
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state
        },
        children: /*#__PURE__*/ _jsx(RootComponent, {
            baseClassName: classNames(styles['ScreenSpinner'], modeClassNames[mode], state !== 'loading' && stateClassNames[state]),
            ...restProps
        })
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map