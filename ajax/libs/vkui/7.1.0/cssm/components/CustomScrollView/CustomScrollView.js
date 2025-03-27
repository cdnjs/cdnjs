'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import styles from "./CustomScrollView.module.css";
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: styles.overscrollBehaviorContain,
    none: styles.overscrollBehaviorNone
};
const scrollBehaviorClassNames = {
    auto: undefined,
    smooth: styles.scrollBehaviorSmooth
};
/**
 * @see https://vkcom.github.io/VKUI/#/CustomScrollView
 */ export const CustomScrollView = ({ className, children, enableHorizontalScroll = false, onScroll, getRootRef, overscrollBehavior = 'auto', scrollBehavior = 'auto', scrollbarHidden = false, ...restProps })=>{
    return /*#__PURE__*/ _jsx("div", {
        className: classNames(className, styles.host, enableHorizontalScroll && styles.horizontalScrollEnabled, overscrollBehaviorClassNames[overscrollBehavior], scrollBehaviorClassNames[scrollBehavior], scrollbarHidden && styles.scrollbarHidden),
        ref: getRootRef,
        onScroll: onScroll,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=CustomScrollView.js.map