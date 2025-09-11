import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { hasReactNode } from "@vkontakte/vkjs";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./SubnavigationBar.module.css";
const defaultScrollToLeft = (x)=>x - 240;
const defaultScrollToRight = (x)=>x + 240;
/**
 * @see https://vkui.io/components/subnavigation-bar
 */ export const SubnavigationBar = ({ fixed = false, children, showArrows = true, getScrollToLeft = defaultScrollToLeft, getScrollToRight = defaultScrollToRight, scrollAnimationDuration, ...restProps })=>{
    let ScrollWrapper;
    let scrollWrapperProps = {};
    if (fixed) {
        ScrollWrapper = 'div';
    } else {
        ScrollWrapper = HorizontalScroll;
        scrollWrapperProps = {
            showArrows,
            getScrollToLeft,
            getScrollToRight,
            scrollAnimationDuration
        };
    }
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: fixed && styles.modeFixed,
        ...restProps,
        children: /*#__PURE__*/ _jsx(ScrollWrapper, {
            className: styles.in,
            ...scrollWrapperProps,
            children: /*#__PURE__*/ _jsx("ul", {
                className: styles.scrollIn,
                children: React.Children.map(children, (child, idx)=>hasReactNode(child) ? /*#__PURE__*/ _jsx("li", {
                        className: styles.item,
                        children: child
                    }, idx) : null)
            })
        })
    });
};

//# sourceMappingURL=SubnavigationBar.js.map