/* eslint-disable jsdoc/require-jsdoc */ import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { CustomScrollView } from "../CustomScrollView/CustomScrollView.js";
import { Popper } from "../Popper/Popper.js";
import { Spinner } from "../Spinner/Spinner.js";
import styles from "./CustomSelectDropdown.module.css";
export const CustomSelectDropdown = ({ children, targetRef, scrollBoxRef, placement = 'bottom', fetching, offsetDistance = 0, autoWidth = false, forcePortal = true, className, noMaxHeight = false, // CustomScrollView
overscrollBehavior, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Popper, {
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: !autoWidth,
        placement: placement,
        className: classNames(styles.host, 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (placement.includes('top') ? styles.top : styles.bottom), autoWidth && classNames(styles.wide, 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
        autoUpdateOnTargetResize: true,
        flipMiddlewareFallbackAxisSideDirection: "none",
        ...restProps,
        children: /*#__PURE__*/ _jsx(CustomScrollView, {
            getRootRef: scrollBoxRef,
            className: noMaxHeight ? undefined : styles.inWithMaxHeight,
            overscrollBehavior: overscrollBehavior,
            tabIndex: -1,
            "aria-busy": fetching,
            children: fetching ? /*#__PURE__*/ _jsx("div", {
                className: styles.fetching,
                children: /*#__PURE__*/ _jsx(Spinner, {
                    size: "s"
                })
            }) : children
        })
    });
};

//# sourceMappingURL=CustomSelectDropdown.js.map