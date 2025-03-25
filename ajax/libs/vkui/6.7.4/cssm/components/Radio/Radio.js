import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { SelectionControl } from '../SelectionControl/SelectionControl';
import { SelectionControlLabel } from '../SelectionControl/SelectionControlLabel/SelectionControlLabel';
import { RadioInput } from './RadioInput/RadioInput';
import styles from './Radio.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */ export const Radio = ({ children, description, style, className, getRootRef, titleAfter, getRef, labelProps, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(SelectionControl, {
        style: style,
        className: classNames(styles['Radio'], className),
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        ...labelProps,
        children: [
            /*#__PURE__*/ _jsx(RadioInput, {
                ...restProps,
                getRef: getRef
            }),
            /*#__PURE__*/ _jsx(SelectionControlLabel, {
                titleAfter: titleAfter,
                description: description,
                children: children
            })
        ]
    });
};
Radio.Input = RadioInput;

//# sourceMappingURL=Radio.js.map