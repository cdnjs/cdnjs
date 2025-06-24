'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesAlignX = {
    center: "vkuiPopoutWrapper__alignXCenter",
    left: "vkuiPopoutWrapper__alignXLeft",
    right: "vkuiPopoutWrapper__alignXRight"
};
const stylesAlignY = {
    center: "vkuiPopoutWrapper__alignYCenter",
    top: "vkuiPopoutWrapper__alignYTop",
    bottom: "vkuiPopoutWrapper__alignYBottom"
};
const stylesStrategy = {
    fixed: "vkuiPopoutWrapper__fixed",
    absolute: "vkuiPopoutWrapper__absolute",
    none: undefined
};
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = (_param)=>{
    var { alignY = 'center', alignX = 'center', closing = false, noBackground = false, strategy: strategyProp, // TODO [>=8]: удалить свойство
    fixed = true, children, onClick, zIndex = 'var(--vkui--z_index_popout)' } = _param, restProps = _object_without_properties(_param, [
        "alignY",
        "alignX",
        "closing",
        "noBackground",
        "strategy",
        "fixed",
        "children",
        "onClick",
        "zIndex"
    ]);
    const strategy = strategyProp || (fixed ? 'fixed' : 'none');
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiPopoutWrapper__host", stylesAlignY[alignY], stylesAlignX[alignX], closing ? "vkuiPopoutWrapper__closing" : "vkuiPopoutWrapper__opened", strategy && stylesStrategy[strategy], !noBackground && "vkuiPopoutWrapper__masked"),
        baseStyle: {
            zIndex
        },
        children: /*#__PURE__*/ _jsxs("div", {
            className: "vkuiPopoutWrapper__container",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "vkuiPopoutWrapper__overlay",
                    onClick: onClick
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: "vkuiPopoutWrapper__content",
                    children: children
                })
            ]
        })
    }));
};

//# sourceMappingURL=PopoutWrapper.js.map