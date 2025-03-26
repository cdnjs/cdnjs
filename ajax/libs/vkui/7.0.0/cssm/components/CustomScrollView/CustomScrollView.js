'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import styles from "./CustomScrollView.module.css";
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: styles.boxOverscrollBehaviorContain,
    none: styles.boxOverscrollBehaviorNone
};
/**
 * @see https://vkcom.github.io/VKUI/#/CustomScrollView
 */ export const CustomScrollView = ({ className, children, enableHorizontalScroll = false, onScroll, getRootRef, overscrollBehavior = 'auto', scrollbarHidden = false, ...restProps })=>{
    return /*#__PURE__*/ _jsx("div", {
        className: classNames(className, styles.host, enableHorizontalScroll && styles.horizontalScrollEnabled, overscrollBehaviorClassNames[overscrollBehavior], scrollbarHidden && styles.scrollbarHidden),
        ref: getRootRef,
        onScroll: onScroll,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=CustomScrollView.js.map