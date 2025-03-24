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
    var { children, targetRef, scrollBoxRef, placement = 'bottom', fetching, offsetDistance = 0, autoWidth = false, forcePortal = true, className, noMaxHeight = false, // CustomScrollView
    overscrollBehavior } = _param, restProps = _object_without_properties(_param, [
        "children",
        "targetRef",
        "scrollBoxRef",
        "placement",
        "fetching",
        "offsetDistance",
        "autoWidth",
        "forcePortal",
        "className",
        "noMaxHeight",
        "overscrollBehavior"
    ]);
    return /*#__PURE__*/ _jsx(Popper, _object_spread_props(_object_spread({
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: !autoWidth,
        placement: placement,
        className: classNames("CustomSelectDropdown__host--Lh564", 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (placement.includes('top') ? "CustomSelectDropdown__top--whBVG" : "CustomSelectDropdown__bottom--kQqbg"), autoWidth && classNames("CustomSelectDropdown__wide---MsFA", 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
        autoUpdateOnTargetResize: true
    }, restProps), {
        children: /*#__PURE__*/ _jsx(CustomScrollView, {
            getRootRef: scrollBoxRef,
            className: noMaxHeight ? undefined : "CustomSelectDropdown__inWithMaxHeight--fsVOo",
            overscrollBehavior: overscrollBehavior,
            children: fetching ? /*#__PURE__*/ _jsx("div", {
                className: "CustomSelectDropdown__fetching--xYW0J",
                children: /*#__PURE__*/ _jsx(Spinner, {
                    size: "s"
                })
            }) : children
        })
    }));
};

//# sourceMappingURL=CustomSelectDropdown.js.map