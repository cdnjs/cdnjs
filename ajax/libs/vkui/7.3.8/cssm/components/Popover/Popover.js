'use client';
import { jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useReferenceElement } from "../../hooks/useReferenceElement.js";
import { usePopover } from "./usePopover.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export const Popover = ({ children, ...restProps })=>{
    const { anchorRef, anchorProps, popover } = usePopover(restProps);
    const reference = useReferenceElement(children, anchorProps, anchorRef);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            reference,
            popover
        ]
    });
};

//# sourceMappingURL=Popover.js.map