'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./ModalOutsideButton.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalOutsideButton
 */ export const ModalOutsideButton = ({ children, 'aria-label': ariaLabel, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(Tappable, {
        baseClassName: styles.host,
        activeMode: styles.active,
        hoverMode: styles.hover,
        ...restProps,
        children: [
            ariaLabel && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: ariaLabel
            }),
            children
        ]
    });
};

//# sourceMappingURL=ModalOutsideButton.js.map