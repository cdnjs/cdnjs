import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { SelectionControl } from '../SelectionControl/SelectionControl';
import { SelectionControlLabel } from '../SelectionControl/SelectionControlLabel/SelectionControlLabel';
import { RadioInput } from './RadioInput/RadioInput';
/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */ export const Radio = (_param)=>{
    var { children, description, style, className, getRootRef, titleAfter, getRef, labelProps, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode } = _param, restProps = _object_without_properties(_param, [
        "children",
        "description",
        "style",
        "className",
        "getRootRef",
        "titleAfter",
        "getRef",
        "labelProps",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode"
    ]);
    return /*#__PURE__*/ _jsxs(SelectionControl, _object_spread_props(_object_spread({
        style: style,
        className: classNames("vkuiRadio", className),
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode
    }, labelProps), {
        children: [
            /*#__PURE__*/ _jsx(RadioInput, _object_spread_props(_object_spread({}, restProps), {
                getRef: getRef
            })),
            /*#__PURE__*/ _jsx(SelectionControlLabel, {
                titleAfter: titleAfter,
                description: description,
                children: children
            })
        ]
    }));
};
Radio.Input = RadioInput;

//# sourceMappingURL=Radio.js.map