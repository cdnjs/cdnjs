'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: "CustomScrollView__boxOverscrollBehaviorContain--ixgYp",
    none: "CustomScrollView__boxOverscrollBehaviorNone--MidPu"
};
/**
 * @see https://vkcom.github.io/VKUI/#/CustomScrollView
 */ export const CustomScrollView = (_param)=>{
    var { className, children, enableHorizontalScroll = false, onScroll, getRootRef, overscrollBehavior = 'auto', scrollbarHidden = false } = _param, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "enableHorizontalScroll",
        "onScroll",
        "getRootRef",
        "overscrollBehavior",
        "scrollbarHidden"
    ]);
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
        className: classNames(className, "CustomScrollView__host--RLAYb", enableHorizontalScroll && "CustomScrollView__horizontalScrollEnabled--BAPKP", overscrollBehaviorClassNames[overscrollBehavior], scrollbarHidden && "CustomScrollView__scrollbarHidden--Saf1J"),
        ref: getRootRef,
        onScroll: onScroll
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=CustomScrollView.js.map