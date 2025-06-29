'use client';
import { jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import styles from "./SplitLayout.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */ export const SplitLayout = ({ header, children, getRootRef, getRef, className, center, modal, popout, ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames(styles.host, platform === 'ios' && styles.ios),
        ref: getRootRef,
        children: [
            header,
            /*#__PURE__*/ _jsxs("div", {
                ...restProps,
                ref: getRef,
                className: classNames(styles.inner, !!header && styles.innerHeader, center && styles.innerCenter, className),
                children: [
                    children,
                    modal,
                    popout
                ]
            })
        ]
    });
};

//# sourceMappingURL=SplitLayout.js.map