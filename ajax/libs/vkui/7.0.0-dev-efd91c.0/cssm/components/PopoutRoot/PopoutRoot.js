import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./PopoutRoot.module.css";
/**
 * @private
 */ export const PopoutRootPopout = ({ className, ...restProps })=>/*#__PURE__*/ _jsx("div", {
        className: classNames(styles.popout, className),
        ...restProps
    });
/**
 * @private
 */ export const PopoutRootModal = ({ className, ...restProps })=>/*#__PURE__*/ _jsx("div", {
        className: classNames(styles.modal, className),
        ...restProps
    });
/**
 * @private
 */ export const PopoutRoot = ({ popout, modal, children, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: styles.host,
        children: [
            children,
            /*#__PURE__*/ _jsxs(AppRootPortal, {
                children: [
                    !!popout && /*#__PURE__*/ _jsx(PopoutRootPopout, {
                        children: popout
                    }),
                    !!modal && /*#__PURE__*/ _jsx(PopoutRootModal, {
                        children: modal
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=PopoutRoot.js.map