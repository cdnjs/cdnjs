import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { Clickable } from '../../Clickable/Clickable';
import { Headline } from '../../Typography/Headline/Headline';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = (_param)=>{
    var { getRef, className, style, children, getRootRef, before } = _param, restProps = _object_without_properties(_param, [
        "getRef",
        "className",
        "style",
        "children",
        "getRootRef",
        "before"
    ]);
    return /*#__PURE__*/ _jsxs(Clickable, {
        Component: "label",
        baseClassName: "vkuiSegmentedControlOption",
        hoverClassName: "vkuiSegmentedControlOption--hover",
        activeClassName: "vkuiSegmentedControlOption--hover",
        className: className,
        getRootRef: getRootRef,
        style: style,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
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
    });
};

//# sourceMappingURL=SegmentedControlOption.js.map