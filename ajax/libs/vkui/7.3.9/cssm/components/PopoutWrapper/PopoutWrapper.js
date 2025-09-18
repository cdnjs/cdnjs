'use client';
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
const stylesStrategy = {
    fixed: styles.fixed,
    absolute: styles.absolute,
    none: undefined
};
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = ({ alignY = 'center', alignX = 'center', closing = false, noBackground = false, strategy: strategyProp, // TODO [>=8]: удалить свойство
fixed = true, children, onClick, zIndex = 'var(--vkui--z_index_popout)', ...restProps })=>{
    const strategy = strategyProp || (fixed ? 'fixed' : 'none');
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, stylesAlignY[alignY], stylesAlignX[alignX], closing ? styles.closing : styles.opened, strategy && stylesStrategy[strategy], !noBackground && styles.masked),
        baseStyle: {
            zIndex
        },
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