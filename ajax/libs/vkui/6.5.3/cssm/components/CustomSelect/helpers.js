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
    return options.findIndex((item)=>{
        value = typeof item.value === 'number' ? Number(value) : value;
        return item.value === value;
    }) ?? -1;
}
export function calculateInputValueFromOptions(options = [], selectValue) {
    const selectedOption = options.find((option)=>option.value === selectValue);
    return selectedOption ? getTextFromChildren(selectedOption.label) : '';
}
export function defaultRenderOptionFn({ option, ...props }) {
    return /*#__PURE__*/ _jsx(CustomSelectOption, {
        ...props
    });
}

//# sourceMappingURL=helpers.js.map