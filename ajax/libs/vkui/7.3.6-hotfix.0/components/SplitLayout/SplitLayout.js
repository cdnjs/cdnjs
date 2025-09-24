'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */ export const SplitLayout = (_param)=>{
    var { header, children, getRootRef, getRef, className, center, modal, popout } = _param, restProps = _object_without_properties(_param, [
        "header",
        "children",
        "getRootRef",
        "getRef",
        "className",
        "center",
        "modal",
        "popout"
    ]);
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames("vkuiSplitLayout__host", platform === 'ios' && "vkuiSplitLayout__ios"),
        ref: getRootRef,
        children: [
            header,
            /*#__PURE__*/ _jsxs("div", _object_spread_props(_object_spread({}, restProps), {
                ref: getRef,
                className: classNames("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__innerHeader", center && "vkuiSplitLayout__innerCenter", className),
                children: [
                    children,
                    modal,
                    popout
                ]
            }))
        ]
    });
};

//# sourceMappingURL=SplitLayout.js.map