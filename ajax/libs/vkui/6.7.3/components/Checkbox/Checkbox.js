import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { SelectionControl } from '../SelectionControl/SelectionControl';
import { SelectionControlLabel } from '../SelectionControl/SelectionControlLabel/SelectionControlLabel';
import { CheckboxInput } from './CheckboxInput/CheckboxInput';
import { CheckboxSimple } from './CheckboxSimple/CheckboxSimple';
const CheckboxComponent = (_param)=>{
    var { children, className, style, getRootRef, description, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, titleAfter } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "style",
        "getRootRef",
        "description",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode",
        "titleAfter"
    ]);
    return /*#__PURE__*/ _jsxs(SelectionControl, {
        className: className,
        style: style,
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        children: [
            /*#__PURE__*/ _jsx(CheckboxInput, _object_spread({}, restProps)),
            /*#__PURE__*/ _jsx(SelectionControlLabel, {
                titleAfter: titleAfter,
                description: description,
                children: children
            })
        ]
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/Checkbox
 */ export const Checkbox = (props)=>{
    const simple = !(hasReactNode(props.children) || hasReactNode(props.description));
    if (simple) {
        return /*#__PURE__*/ _jsx(CheckboxSimple, _object_spread({}, props));
    }
    return /*#__PURE__*/ _jsx(CheckboxComponent, _object_spread({}, props));
};
Checkbox.Input = CheckboxInput;

//# sourceMappingURL=Checkbox.js.map