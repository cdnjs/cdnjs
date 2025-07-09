'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { warnOnce } from "../../lib/warnOnce.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper.js";
import { AlertBase } from "./AlertBase.js";
const warn = warnOnce('Alert');
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */ export const Alert = (_param)=>{
    var { usePortal, style, className, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "usePortal",
        "style",
        "className",
        "getRootRef"
    ]);
    const [closing, setClosing] = React.useState(false);
    const close = React.useCallback(()=>{
        setClosing(true);
    }, []);
    useScrollLock();
    if (process.env.NODE_ENV === 'development' && !restProps.title && !restProps['aria-label'] && !restProps['aria-labelledby']) {
        warn('Если "title" не используется, то необходимо задать либо "aria-label", либо "aria-labelledby" (см. правило axe aria-dialog-name)');
    }
    return /*#__PURE__*/ _jsx(AppRootPortal, {
        usePortal: usePortal,
        children: /*#__PURE__*/ _jsx(PopoutWrapper, {
            className: className,
            closing: closing,
            style: style,
            onClick: close,
            getRootRef: getRootRef,
            strategy: "fixed",
            children: /*#__PURE__*/ _jsx(AlertBase, _object_spread_props(_object_spread({}, restProps), {
                closing: closing,
                setClosing: setClosing
            }))
        })
    });
};

//# sourceMappingURL=Alert.js.map