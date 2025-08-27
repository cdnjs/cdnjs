'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { hasReactNode } from "@vkontakte/vkjs";
import { Clickable } from "../../Clickable/Clickable.js";
import { Headline } from "../../Typography/Headline/Headline.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
export const SegmentedControlOption = ({ getRef, children, getRootRef, before, rootProps, inputProps })=>/*#__PURE__*/ _jsxs(Clickable, _object_spread_props(_object_spread({
        Component: "label",
        baseClassName: "vkuiSegmentedControlOption__host",
        hoverClassName: "vkuiSegmentedControlOption__hover",
        activeClassName: "vkuiSegmentedControlOption__hover",
        getRootRef: getRootRef
    }, rootProps), {
        children: [
            inputProps && /*#__PURE__*/ _jsx(VisuallyHidden, _object_spread_props(_object_spread({}, inputProps), {
                Component: "input",
                getRootRef: getRef,
                type: "radio"
            })),
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: "vkuiSegmentedControlOption__before",
                children: before
            }),
            /*#__PURE__*/ _jsx(Headline, {
                level: "2",
                weight: "2",
                children: children
            })
        ]
    }));

//# sourceMappingURL=SegmentedControlOption.js.map