import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './SubnavigationBar.module.css';
const defaultScrollToLeft = (x)=>x - 240;
const defaultScrollToRight = (x)=>x + 240;
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */ export const SubnavigationBar = ({ mode = 'overflow', children, showArrows = true, getScrollToLeft = defaultScrollToLeft, getScrollToRight = defaultScrollToRight, scrollAnimationDuration, ...restProps })=>{
    let ScrollWrapper;
    let scrollWrapperProps = {};
    if (mode === 'fixed') {
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
        baseClassName: mode === 'fixed' && styles['SubnavigationBar--mode-fixed'],
        ...restProps,
        children: /*#__PURE__*/ _jsx(ScrollWrapper, {
            className: styles['SubnavigationBar__in'],
            ...scrollWrapperProps,
            children: /*#__PURE__*/ _jsx("ul", {
                className: styles['SubnavigationBar__scrollIn'],
                children: React.Children.map(children, (child, idx)=>hasReactNode(child) ? /*#__PURE__*/ _jsx("li", {
                        className: styles['SubnavigationBar__item'],
                        children: child
                    }, idx) : null)
            })
        })
    });
};

//# sourceMappingURL=SubnavigationBar.js.map