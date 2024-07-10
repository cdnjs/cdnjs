import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { callMultiple } from '../../lib/callMultiple';
import { stopPropagation } from '../../lib/utils';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
    const result = [];
    for(let index = 0; index < length; index += 1){
        result.push(/*#__PURE__*/ _jsx("span", {
            className: "vkuiInputLike__mask",
            children: MASK_SYMBOL
        }, index));
    }
    return result;
}
export const InputLike = (_param)=>{
    var { value, length, index, onElementSelect, onClick, onFocus, label } = _param, restProps = _object_without_properties(_param, [
        "value",
        "length",
        "index",
        "onElementSelect",
        "onClick",
        "onFocus",
        "label"
    ]);
    const handleElementSelect = React.useCallback((event)=>{
        stopPropagation(event);
        onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
    }, [
        index,
        onElementSelect
    ]);
    var _value_length;
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: "span",
        baseClassName: (value === null || value === void 0 ? void 0 : value.length) === length ? "vkuiInputLike--full" : undefined,
        tabIndex: 0,
        onClick: callMultiple(onClick, handleElementSelect),
        onFocus: callMultiple(stopPropagation, onFocus)
    }, restProps), {
        children: [
            label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: label
            }),
            value === null || value === void 0 ? void 0 : value.slice(0, length - 1),
            (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && /*#__PURE__*/ _jsx("span", {
                className: "vkuiInputLike__last_character",
                children: value.slice(length - 1)
            }, index),
            getMaskElements(length - ((_value_length = value === null || value === void 0 ? void 0 : value.length) !== null && _value_length !== void 0 ? _value_length : 0))
        ]
    }));
};
InputLike.displayName = 'InputLike';

//# sourceMappingURL=InputLike.js.map