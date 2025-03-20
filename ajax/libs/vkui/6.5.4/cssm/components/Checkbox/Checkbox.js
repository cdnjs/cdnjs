import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { SelectionControl } from '../SelectionControl/SelectionControl';
import { SelectionControlLabel } from '../SelectionControl/SelectionControlLabel/SelectionControlLabel';
import { CheckboxInput } from './CheckboxInput/CheckboxInput';
import { CheckboxSimple } from './CheckboxSimple/CheckboxSimple';
const CheckboxComponent = ({ children, className, style, getRootRef, description, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, titleAfter, ...restProps })=>{
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
            /*#__PURE__*/ _jsx(CheckboxInput, {
                ...restProps
            }),
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
        return /*#__PURE__*/ _jsx(CheckboxSimple, {
            ...props
        });
    }
    return /*#__PURE__*/ _jsx(CheckboxComponent, {
        ...props
    });
};
Checkbox.Input = CheckboxInput;

//# sourceMappingURL=Checkbox.js.map