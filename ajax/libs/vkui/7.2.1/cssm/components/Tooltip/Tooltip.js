'use client';
import { jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useReferenceElement } from "../../hooks/useReferenceElement.js";
import { useTooltip } from "./useTooltip.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export const Tooltip = ({ children, ...restProps })=>{
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