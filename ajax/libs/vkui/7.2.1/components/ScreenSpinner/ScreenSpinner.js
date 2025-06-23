'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper.js";
import { ScreenSpinnerContainer } from "./ScreenSpinnerContainer.js";
import { ScreenSpinnerLoader } from "./ScreenSpinnerLoader.js";
import { ScreenSpinnerSwapIcon } from "./ScreenSpinnerSwapIcon.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */ export const ScreenSpinner = (_param)=>{
    var { style, className, state = 'loading', onClick, cancelLabel, mode, label, customIcon, usePortal } = _param, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "state",
        "onClick",
        "cancelLabel",
        "mode",
        "label",
        "customIcon",
        "usePortal"
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
ScreenSpinner.displayName = 'ScreenSpinner';
ScreenSpinner.Container = ScreenSpinnerContainer;
ScreenSpinner.Container.displayName = 'ScreenSpinner.Container';
ScreenSpinner.Loader = ScreenSpinnerLoader;
ScreenSpinner.Loader.displayName = 'ScreenSpinner.Loader';
ScreenSpinner.SwapIcon = ScreenSpinnerSwapIcon;
ScreenSpinner.SwapIcon.displayName = 'ScreenSpinner.SwapIcon';

//# sourceMappingURL=ScreenSpinner.js.map