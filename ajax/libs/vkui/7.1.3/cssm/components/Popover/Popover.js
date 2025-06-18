'use client';
import { jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { usePatchChildren } from "../../hooks/usePatchChildren.js";
import { usePopover } from "./usePopover.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export const Popover = ({ children, ...restProps })=>{
    const { anchorRef, anchorProps: referenceProps, popover } = usePopover(restProps);
    const [, child] = usePatchChildren(children, referenceProps, anchorRef);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            child,
            popover
        ]
    });
};

//# sourceMappingURL=Popover.js.map