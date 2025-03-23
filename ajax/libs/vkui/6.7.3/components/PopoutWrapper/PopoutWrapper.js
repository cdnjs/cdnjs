import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
const stylesAlignX = {
    center: "vkuiPopoutWrapper--alignX-center",
    left: "vkuiPopoutWrapper--alignX-left",
    right: "vkuiPopoutWrapper--alignX-right"
};
const stylesAlignY = {
    center: "vkuiPopoutWrapper--alignY-center",
    top: "vkuiPopoutWrapper--alignY-top",
    bottom: "vkuiPopoutWrapper--alignY-bottom"
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
        baseClassName: classNames("vkuiPopoutWrapper", stylesAlignY[alignY], stylesAlignX[alignX], closing ? "vkuiPopoutWrapper--closing" : "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", !noBackground && "vkuiPopoutWrapper--masked"),
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