import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./PopoutWrapper.module.css";
const stylesAlignX = {
    center: styles.alignXCenter,
    left: styles.alignXLeft,
    right: styles.alignXRight
};
const stylesAlignY = {
    center: styles.alignYCenter,
    top: styles.alignYTop,
    bottom: styles.alignYBottom
};
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = ({ alignY = 'center', alignX = 'center', closing = false, noBackground = false, fixed = true, children, onClick, ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, stylesAlignY[alignY], stylesAlignX[alignX], closing ? styles.closing : styles.opened, fixed && styles.fixed, !noBackground && styles.masked),
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles.container,
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: styles.overlay,
                    onClick: onClick
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: styles.content,
                    children: children
                })
            ]
        })
    });
};

//# sourceMappingURL=PopoutWrapper.js.map