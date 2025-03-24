import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { hasReactNode } from "@vkontakte/vkjs";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const defaultScrollToLeft = (x)=>x - 240;
const defaultScrollToRight = (x)=>x + 240;
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */ export const SubnavigationBar = (_param)=>{
    var { fixed = false, children, showArrows = true, getScrollToLeft = defaultScrollToLeft, getScrollToRight = defaultScrollToRight, scrollAnimationDuration } = _param, restProps = _object_without_properties(_param, [
        "fixed",
        "children",
        "showArrows",
        "getScrollToLeft",
        "getScrollToRight",
        "scrollAnimationDuration"
    ]);
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseClassName: fixed && "SubnavigationBar__modeFixed--xzd0k"
    }, restProps), {
        children: /*#__PURE__*/ _jsx(ScrollWrapper, _object_spread_props(_object_spread({
            className: "SubnavigationBar__in--CKd7l"
        }, scrollWrapperProps), {
            children: /*#__PURE__*/ _jsx("ul", {
                className: "SubnavigationBar__scrollIn--i7NvV",
                children: React.Children.map(children, (child, idx)=>hasReactNode(child) ? /*#__PURE__*/ _jsx("li", {
                        className: "SubnavigationBar__item--dQ9cJ",
                        children: child
                    }, idx) : null)
            })
        }))
    }));
};

//# sourceMappingURL=SubnavigationBar.js.map