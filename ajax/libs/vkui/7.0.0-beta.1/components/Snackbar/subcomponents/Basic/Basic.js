'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../../hooks/useAdaptivity.js";
import { RootComponent } from "../../../RootComponent/RootComponent.js";
import { Paragraph } from "../../../Typography/Paragraph/Paragraph.js";
import { Subhead } from "../../../Typography/Subhead/Subhead.js";
const stylesLayout = {
    none: "vkuiBasic__layoutNone",
    vertical: "vkuiBasic__layoutVertical",
    horizontal: "vkuiBasic__layoutHorizontal"
};
const sizeYClassNames = {
    none: "vkuiBasic__sizeYNone",
    regular: "vkuiBasic__sizeYRegular"
};
export function Basic(_param) {
    var { layout: layoutProps, action, after, before, mode, subtitle, children } = _param, restProps = _object_without_properties(_param, [
        "layout",
        "action",
        "after",
        "before",
        "mode",
        "subtitle",
        "children"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const layout = after || subtitle ? 'vertical' : 'none';
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiBasic__body", stylesLayout[layoutProps || layout], sizeY !== 'compact' && sizeYClassNames[sizeY], mode === 'dark' && "vkuiBasic__modeDark"),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "vkuiBasic__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiBasic__content",
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: "vkuiBasic__contentText",
                        children: children
                    }),
                    subtitle && !action && /*#__PURE__*/ _jsx(Subhead, {
                        className: "vkuiBasic__contentSubtitle",
                        children: subtitle
                    }),
                    action && !subtitle && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiBasic__action",
                        children: action
                    })
                ]
            }),
            after && /*#__PURE__*/ _jsx("div", {
                className: "vkuiBasic__after",
                children: after
            })
        ]
    }));
}

//# sourceMappingURL=Basic.js.map