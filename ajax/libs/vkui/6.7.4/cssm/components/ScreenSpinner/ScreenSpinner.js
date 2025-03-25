import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { ScreenSpinnerContainer } from './ScreenSpinnerContainer';
import { ScreenSpinnerLoader } from './ScreenSpinnerLoader';
import { ScreenSpinnerSwapIcon } from './ScreenSpinnerSwapIcon';
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */ export const ScreenSpinner = ({ style, className, state = 'loading', onClick, cancelLabel, mode, caption, ...restProps })=>{
    useScrollLock();
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        className: className,
        style: style,
        noBackground: true,
        children: /*#__PURE__*/ _jsxs(ScreenSpinnerContainer, {
            state: state,
            mode: mode,
            caption: caption,
            children: [
                /*#__PURE__*/ _jsx(ScreenSpinnerLoader, {
                    ...restProps
                }),
                /*#__PURE__*/ _jsx(ScreenSpinnerSwapIcon, {
                    onClick: onClick,
                    cancelLabel: cancelLabel
                })
            ]
        })
    });
};
ScreenSpinner.displayName = 'ScreenSpinner';
ScreenSpinner.Container = ScreenSpinnerContainer;
ScreenSpinner.Container.displayName = 'ScreenSpinner.Container';
ScreenSpinner.Loader = ScreenSpinnerLoader;
ScreenSpinner.Loader.displayName = 'ScreenSpinner.Loader';
ScreenSpinner.SwapIcon = ScreenSpinnerSwapIcon;
ScreenSpinner.SwapIcon.displayName = 'ScreenSpinner.SwapIcon';

//# sourceMappingURL=ScreenSpinner.js.map