'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesAlignX = {
    center: "PopoutWrapper__alignXCenter--p9P-g",
    left: "PopoutWrapper__alignXLeft--Bisk9",
    right: "PopoutWrapper__alignXRight--s50R6"
};
const stylesAlignY = {
    center: "PopoutWrapper__alignYCenter--sPSP-",
    top: "PopoutWrapper__alignYTop--89xIy",
    bottom: "PopoutWrapper__alignYBottom--27Cr-"
};
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = (_param)=>{
    var { alignY = 'center', alignX = 'center', closing = false, noBackground = false, fixed = true, children, onClick } = _param, restProps = _object_without_properties(_param, [
        "alignY",
        "alignX",
        "closing",
        "noBackground",
        "fixed",
        "children",
        "onClick"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("PopoutWrapper__host--Ux0qG", stylesAlignY[alignY], stylesAlignX[alignX], closing ? "PopoutWrapper__closing--wvWOX" : "PopoutWrapper__opened--8EX7I", fixed && "PopoutWrapper__fixed--oQ-V6", !noBackground && "PopoutWrapper__masked--7-3GJ"),
        children: /*#__PURE__*/ _jsxs("div", {
            className: "PopoutWrapper__container--rV1-n",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "PopoutWrapper__overlay--BLlKB",
                    onClick: onClick
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: "PopoutWrapper__content--Rv14M",
                    children: children
                })
            ]
        })
    }));
};

//# sourceMappingURL=PopoutWrapper.js.map