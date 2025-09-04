'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: "vkuiCustomScrollView__overscrollBehaviorContain",
    none: "vkuiCustomScrollView__overscrollBehaviorNone"
};
const scrollBehaviorClassNames = {
    auto: undefined,
    smooth: "vkuiCustomScrollView__scrollBehaviorSmooth"
};
/**
 * @see https://vkui.io/components/custom-scroll-view
 */ export const CustomScrollView = (_param)=>{
    var { className, children, enableHorizontalScroll = false, onScroll, getRootRef, overscrollBehavior = 'auto', scrollBehavior = 'auto', scrollbarHidden = false } = _param, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "enableHorizontalScroll",
        "onScroll",
        "getRootRef",
        "overscrollBehavior",
        "scrollBehavior",
        "scrollbarHidden"
    ]);
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
        className: classNames(className, "vkuiCustomScrollView__host", enableHorizontalScroll && "vkuiCustomScrollView__horizontalScrollEnabled", overscrollBehaviorClassNames[overscrollBehavior], scrollBehaviorClassNames[scrollBehavior], scrollbarHidden && "vkuiCustomScrollView__scrollbarHidden"),
        ref: getRootRef,
        onScroll: onScroll
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=CustomScrollView.js.map