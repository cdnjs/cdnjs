'use client';
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useReferenceElement } from "../../hooks/useReferenceElement.js";
import { useTooltip } from "./useTooltip.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export const Tooltip = (_param)=>{
    var { children } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    const { anchorRef, anchorProps, tooltip } = useTooltip(restProps);
    const anchor = useReferenceElement(children, anchorProps, anchorRef);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            anchor,
            tooltip
        ]
    });
};

//# sourceMappingURL=Tooltip.js.map