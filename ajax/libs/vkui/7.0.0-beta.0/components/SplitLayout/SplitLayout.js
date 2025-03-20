import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { PopoutRoot } from "../PopoutRoot/PopoutRoot.js";
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */ export const SplitLayout = (_param)=>{
    var { popout, modal, header, children, getRootRef, getRef, className, center } = _param, restProps = _object_without_properties(_param, [
        "popout",
        "modal",
        "header",
        "children",
        "getRootRef",
        "getRef",
        "className",
        "center"
    ]);
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs(PopoutRoot, {
        className: classNames("vkuiSplitLayout__host", platform === 'ios' && "vkuiSplitLayout__ios"),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef,
        children: [
            header,
            /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({}, restProps), {
                ref: getRef,
                className: classNames("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__innerHeader", center && "vkuiSplitLayout__innerCenter", className),
                children: children
            }))
        ]
    });
};

//# sourceMappingURL=SplitLayout.js.map