import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { getTextFromChildren } from '../../lib/children';
import { CustomSelectOption } from '../CustomSelectOption/CustomSelectOption';
export const findIndexAfter = (options = [], startIndex = -1)=>{
    if (startIndex >= options.length - 1) {
        return -1;
    }
    return options.findIndex((option, i)=>i > startIndex && !option.disabled);
};
export const findIndexBefore = (options = [], endIndex = options.length)=>{
    let result = -1;
    if (endIndex <= 0) {
        return result;
    }
    for(let i = endIndex - 1; i >= 0; i--){
        let option = options[i];
        if (!option.disabled) {
            result = i;
            break;
        }
    }
    return result;
};
export function findSelectedIndex(options = [], value, withClear) {
    if (withClear && value === '') {
        return -1;
    }
    var _options_findIndex;
    return (_options_findIndex = options.findIndex((item)=>{
        value = typeof item.value === 'number' ? Number(value) : value;
        return item.value === value;
    })) !== null && _options_findIndex !== void 0 ? _options_findIndex : -1;
}
export function calculateInputValueFromOptions(options = [], selectValue) {
    const selectedOption = options.find((option)=>option.value === selectValue);
    return selectedOption ? getTextFromChildren(selectedOption.label) : '';
}
export function defaultRenderOptionFn(_param) {
    var { option } = _param, props = _object_without_properties(_param, [
        "option"
    ]);
    return /*#__PURE__*/ _jsx(CustomSelectOption, _object_spread({}, props));
}

//# sourceMappingURL=helpers.js.map