'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkui.io/components/modal-outside-button
 */ export const ModalOutsideButton = (_param)=>{
    var { children, 'aria-label': ariaLabel } = _param, restProps = _object_without_properties(_param, [
        "children",
        'aria-label'
    ]);
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        baseClassName: "vkuiModalOutsideButton__host",
        activeMode: "vkuiModalOutsideButton__active",
        hoverMode: "vkuiModalOutsideButton__hover"
    }, restProps), {
        children: [
            ariaLabel && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: ariaLabel
            }),
            children
        ]
    }));
};

//# sourceMappingURL=ModalOutsideButton.js.map