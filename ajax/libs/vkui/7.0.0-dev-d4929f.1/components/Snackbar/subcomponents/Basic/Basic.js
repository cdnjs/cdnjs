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
    none: "Basic__layoutNone--jdean",
    vertical: "Basic__layoutVertical--mDtlT",
    horizontal: "Basic__layoutHorizontal--OcfVm"
};
const sizeYClassNames = {
    none: "Basic__sizeYNone--m3pUc",
    regular: "Basic__sizeYRegular--Af8oM"
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
        baseClassName: classNames("Basic__body---GXGi", stylesLayout[layoutProps || layout], sizeY !== 'compact' && sizeYClassNames[sizeY], mode === 'dark' && "Basic__modeDark--mfhJx"),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "Basic__before--RG6Ve",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "Basic__content--k7sDc",
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: "Basic__contentText--NUvCo",
                        children: children
                    }),
                    subtitle && !action && /*#__PURE__*/ _jsx(Subhead, {
                        className: "Basic__contentSubtitle---q3Q-",
                        children: subtitle
                    }),
                    action && !subtitle && /*#__PURE__*/ _jsx("div", {
                        className: "Basic__action---iRXb",
                        children: action
                    })
                ]
            }),
            after && /*#__PURE__*/ _jsx("div", {
                className: "Basic__after--ud6mb",
                children: after
            })
        ]
    }));
}

//# sourceMappingURL=Basic.js.map