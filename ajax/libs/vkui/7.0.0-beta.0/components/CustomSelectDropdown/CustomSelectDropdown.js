import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { CustomScrollView } from "../CustomScrollView/CustomScrollView.js";
import { Popper } from "../Popper/Popper.js";
import { Spinner } from "../Spinner/Spinner.js";
export const CustomSelectDropdown = (_param)=>{
    var { children, targetRef, scrollBoxRef, placement = 'bottom', fetching, offsetDistance = 0, autoWidth = false, forcePortal = true, autoHideScrollbar, autoHideScrollbarDelay, className, noMaxHeight = false, // CustomScrollView
    overscrollBehavior } = _param, restProps = _object_without_properties(_param, [
        "children",
        "targetRef",
        "scrollBoxRef",
        "placement",
        "fetching",
        "offsetDistance",
        "autoWidth",
        "forcePortal",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "className",
        "noMaxHeight",
        "overscrollBehavior"
    ]);
    return /*#__PURE__*/ _jsx(Popper, _object_spread_props(_object_spread({
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: !autoWidth,
        placement: placement,
        className: classNames("vkuiCustomSelectDropdown__host", 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (placement.includes('top') ? "vkuiCustomSelectDropdown__top" : "vkuiCustomSelectDropdown__bottom"), autoWidth && classNames("vkuiCustomSelectDropdown__wide", 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
        autoUpdateOnTargetResize: true
    }, restProps), {
        children: /*#__PURE__*/ _jsx(CustomScrollView, {
            boxRef: scrollBoxRef,
            className: noMaxHeight ? undefined : "vkuiCustomSelectDropdown__inWithMaxHeight",
            autoHideScrollbar: autoHideScrollbar,
            autoHideScrollbarDelay: autoHideScrollbarDelay,
            overscrollBehavior: overscrollBehavior,
            children: fetching ? /*#__PURE__*/ _jsx("div", {
                className: "vkuiCustomSelectDropdown__fetching",
                children: /*#__PURE__*/ _jsx(Spinner, {
                    size: "s"
                })
            }) : children
        })
    }));
};

//# sourceMappingURL=CustomSelectDropdown.js.map