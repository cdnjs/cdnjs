'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Cancel } from "@vkontakte/icons";
import { stopPropagation } from "../../lib/utils.js";
import { IconButton } from "../IconButton/IconButton.js";
export const CustomSelectClearButton = ({ className, onClick, ...restProps })=>{
    return /*#__PURE__*/ _jsx(IconButton, {
        Component: "button",
        label: "Очистить поле",
        onKeyDown: stopPropagation,
        type: "button",
        activeMode: "opacity",
        hoverMode: "opacity",
        ...restProps,
        className: className,
        onClick: (e)=>{
            stopPropagation(e);
            e.preventDefault();
            onClick();
        },
        children: /*#__PURE__*/ _jsx(Icon16Cancel, {})
    });
};

//# sourceMappingURL=CustomSelectClearButton.js.map