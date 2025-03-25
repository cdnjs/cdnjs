import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { AdaptiveIconRenderer } from '../../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { RootComponent } from '../../RootComponent/RootComponent';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
function RadioIcon24(props) {
    return /*#__PURE__*/ _jsxs("svg", _object_spread_props(_object_spread({
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        "aria-hidden": true
    }, props), {
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
                className: "vkuiRadioInput__pin",
                fill: "currentColor"
            })
        ]
    }));
}
function RadioIcon20(props) {
    return /*#__PURE__*/ _jsxs("svg", _object_spread_props(_object_spread({
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        "aria-hidden": true
    }, props), {
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
                className: "vkuiRadioInput__pin",
                fill: "currentColor"
            })
        ]
    }));
}
function RadioIcon() {
    return /*#__PURE__*/ _jsx("div", {
        className: "vkuiRadioInput__icon",
        children: /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
            IconCompact: RadioIcon20,
            IconRegular: RadioIcon24
        })
    });
}
export function RadioInput(_param) {
    var { className, style, getRootRef, getRef } = _param, restProps = _object_without_properties(_param, [
        "className",
        "style",
        "getRootRef",
        "getRef"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, {
        className: className,
        style: style,
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
                Component: "input",
                type: "radio",
                baseClassName: "vkuiRadioInput__input",
                getRootRef: getRef
            })),
            /*#__PURE__*/ _jsx(RadioIcon, {})
        ]
    });
}

//# sourceMappingURL=RadioInput.js.map