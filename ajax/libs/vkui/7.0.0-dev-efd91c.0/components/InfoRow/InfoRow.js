import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Headline } from "../Typography/Headline/Headline.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */ export const InfoRow = (_param)=>{
    var { header, children, className } = _param, restProps = _object_without_properties(_param, [
        "header",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _jsxs(Headline, _object_spread_props(_object_spread({}, restProps), {
        Component: "span",
        className: classNames("vkuiInfoRow__host", className),
        weight: "3",
        children: [
            hasReactNode(header) && /*#__PURE__*/ _jsxs(Subhead, {
                Component: "strong",
                className: "vkuiInfoRow__header",
                children: [
                    header,
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: " "
                    })
                ]
            }),
            children
        ]
    }));
};

//# sourceMappingURL=InfoRow.js.map