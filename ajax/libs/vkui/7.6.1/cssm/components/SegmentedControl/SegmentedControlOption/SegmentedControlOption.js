'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { hasReactNode } from "@vkontakte/vkjs";
import { Clickable } from "../../Clickable/Clickable.js";
import { Headline } from "../../Typography/Headline/Headline.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import styles from "./SegmentedControlOption.module.css";
export const SegmentedControlOption = ({ getRef, children, getRootRef, before, rootProps, inputProps })=>/*#__PURE__*/ _jsxs(Clickable, {
        Component: "label",
        baseClassName: styles.host,
        hoverClassName: styles.hover,
        activeClassName: styles.hover,
        getRootRef: getRootRef,
        ...rootProps,
        children: [
            inputProps && /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...inputProps,
                Component: "input",
                getRootRef: getRef,
                type: "radio"
            }),
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsx(Headline, {
                level: "2",
                weight: "2",
                children: children
            })
        ]
    });

//# sourceMappingURL=SegmentedControlOption.js.map