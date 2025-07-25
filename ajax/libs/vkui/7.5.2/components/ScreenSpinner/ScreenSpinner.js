'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper.js";
import { ScreenSpinnerContainer } from "./ScreenSpinnerContainer.js";
import { ScreenSpinnerLoader } from "./ScreenSpinnerLoader.js";
import { ScreenSpinnerSwapIcon } from "./ScreenSpinnerSwapIcon.js";
/**
 * @see https://vkui.io/components/screen-spinner
 */ export const ScreenSpinner = (_param)=>{
    var { style, className, state = 'loading', onClick, cancelLabel, mode, label, customIcon, usePortal, visibilityDelay } = _param, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "state",
        "onClick",
        "cancelLabel",
        "mode",
        "label",
        "customIcon",
        "usePortal",
        "visibilityDelay"
    ]);
    useScrollLock();
    return /*#__PURE__*/ _jsx(AppRootPortal, {
        usePortal: usePortal,
        children: /*#__PURE__*/ _jsx(PopoutWrapper, {
            className: className,
            style: style,
            noBackground: true,
            strategy: "fixed",
            children: /*#__PURE__*/ _jsxs(ScreenSpinnerContainer, {
                state: state,
                mode: mode,
                label: label,
                customIcon: customIcon,
                visibilityDelay: visibilityDelay,
                children: [
                    /*#__PURE__*/ _jsx(ScreenSpinnerLoader, _object_spread({}, restProps)),
                    /*#__PURE__*/ _jsx(ScreenSpinnerSwapIcon, {
                        onClick: onClick,
                        cancelLabel: cancelLabel
                    })
                ]
            })
        })
    });
};
ScreenSpinner.Container = ScreenSpinnerContainer;
ScreenSpinner.Loader = ScreenSpinnerLoader;
ScreenSpinner.SwapIcon = ScreenSpinnerSwapIcon;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(ScreenSpinner.Container, 'ScreenSpinner.Container');
    defineComponentDisplayNames(ScreenSpinner.Loader, 'ScreenSpinner.Loader');
    defineComponentDisplayNames(ScreenSpinner.SwapIcon, 'ScreenSpinner.SwapIcon');
}

//# sourceMappingURL=ScreenSpinner.js.map