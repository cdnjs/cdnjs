'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { callMultiple } from "../../lib/callMultiple.js";
import { stopPropagation } from "../../lib/utils.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./InputLike.module.css";
const MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
    const result = [];
    for(let index = 0; index < length; index += 1){
        result.push(/*#__PURE__*/ _jsx("span", {
            className: styles.mask,
            children: MASK_SYMBOL
        }, index));
    }
    return result;
}
export const InputLike = ({ value, length, index, onElementSelect, onClick, onFocus, label, ...restProps })=>{
    const handleElementSelect = React.useCallback((event)=>{
        stopPropagation(event);
        onElementSelect?.(index);
    }, [
        index,
        onElementSelect
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, {
        Component: "span",
        baseClassName: value?.length === length ? styles.full : undefined,
        tabIndex: 0,
        onClick: callMultiple(onClick, handleElementSelect),
        onFocus: callMultiple(stopPropagation, onFocus),
        ...restProps,
        children: [
            label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: label
            }),
            value?.slice(0, length - 1),
            value?.slice(length - 1) && /*#__PURE__*/ _jsx("span", {
                className: styles.lastCharacter,
                children: value.slice(length - 1)
            }, index),
            getMaskElements(length - (value?.length ?? 0))
        ]
    });
};
InputLike.displayName = 'InputLike';

//# sourceMappingURL=InputLike.js.map