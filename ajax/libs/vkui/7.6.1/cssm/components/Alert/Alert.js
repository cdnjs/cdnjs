'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { warnOnce } from "../../lib/warnOnce.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper.js";
import { AlertBase } from "./AlertBase.js";
const warn = warnOnce('Alert');
/**
 * @see https://vkui.io/components/alert
 */ export const Alert = ({ usePortal, style, className, getRootRef, ...restProps })=>{
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
            children: /*#__PURE__*/ _jsx(AlertBase, {
                ...restProps,
                closing: closing,
                setClosing: setClosing
            })
        })
    });
};

//# sourceMappingURL=Alert.js.map