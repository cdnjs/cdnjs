import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @private
 */ export const PopoutRootPopout = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx("div", _object_spread({
        className: classNames("vkuiPopoutRoot__popout", className)
    }, restProps));
};
/**
 * @private
 */ export const PopoutRootModal = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx("div", _object_spread({
        className: classNames("vkuiPopoutRoot__modal", className)
    }, restProps));
};
/**
 * @private
 */ export const PopoutRoot = (_param)=>{
    var { popout, modal, children } = _param, restProps = _object_without_properties(_param, [
        "popout",
        "modal",
        "children"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: "vkuiPopoutRoot",
        children: [
            children,
            /*#__PURE__*/ _jsxs(AppRootPortal, {
                children: [
                    !!popout && /*#__PURE__*/ _jsx(PopoutRootPopout, {
                        children: popout
                    }),
                    !!modal && /*#__PURE__*/ _jsx(PopoutRootModal, {
                        children: modal
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=PopoutRoot.js.map