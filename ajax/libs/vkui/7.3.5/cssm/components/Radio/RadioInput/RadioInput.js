'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { AdaptiveIconRenderer } from "../../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import styles from "./RadioInput.module.css";
function RadioIcon24(props) {
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        "aria-hidden": true,
        ...props,
        children: [
            /*#__PURE__*/ _jsx("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "2",
                fill: "none"
            }),
            /*#__PURE__*/ _jsx("circle", {
                cx: "12",
                cy: "12",
                r: "7",
                className: styles.pin,
                fill: "currentColor"
            })
        ]
    });
}
function RadioIcon20(props) {
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        "aria-hidden": true,
        ...props,
        children: [
            /*#__PURE__*/ _jsx("circle", {
                cx: "10",
                cy: "10",
                r: "7.75",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none"
            }),
            /*#__PURE__*/ _jsx("circle", {
                cx: "10",
                cy: "10",
                r: "5.5",
                className: styles.pin,
                fill: "currentColor"
            })
        ]
    });
}
function RadioIcon() {
    return /*#__PURE__*/ _jsx("div", {
        className: styles.icon,
        children: /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
            IconCompact: RadioIcon20,
            IconRegular: RadioIcon24
        })
    });
}
export function RadioInput({ className, style, getRootRef, getRef, ...restProps }) {
    return /*#__PURE__*/ _jsxs(RootComponent, {
        className: className,
        style: style,
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...restProps,
                Component: "input",
                type: "radio",
                baseClassName: styles.input,
                getRootRef: getRef
            }),
            /*#__PURE__*/ _jsx(RadioIcon, {})
        ]
    });
}

//# sourceMappingURL=RadioInput.js.map