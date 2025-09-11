import * as React from "react";
import { findIndexAfter, findIndexBefore, findSelectedIndex } from "../helpers.js";
/* eslint-enable jsdoc/require-jsdoc */ export function useFocusedOptionController({ selectedOptionValue, filteredOptions, scrollToElement }) {
    const [focusedOptionValue, setFocusedOptionValue] = React.useState(null);
    const focusOptionByIndex = React.useCallback((index, scrollTo = true)=>{
        if (index === undefined || index < 0 || index > filteredOptions.length - 1) {
            return;
        }
        const option = filteredOptions[index];
        if (!option || option.disabled) {
            return;
        }
        if (scrollTo) {
            scrollToElement(index);
        }
        setFocusedOptionValue(option.value);
    }, [
        filteredOptions,
        scrollToElement
    ]);
    const resetFocusedOption = React.useCallback(()=>{
        setFocusedOptionValue(null);
    }, []);
    const focusOption = React.useCallback((type)=>{
        let index = findSelectedIndex(filteredOptions, focusedOptionValue);
        if (type === 'next') {
            const nextIndex = findIndexAfter(filteredOptions, index);
            index = nextIndex === -1 ? findIndexAfter(filteredOptions) : nextIndex; // Следующий за index или первый валидный до index
        } else if (type === 'prev') {
            const beforeIndex = findIndexBefore(filteredOptions, index);
            index = beforeIndex === -1 ? findIndexBefore(filteredOptions) : beforeIndex; // Предшествующий index или последний валидный после index
        }
        focusOptionByIndex(index);
    }, [
        filteredOptions,
        focusedOptionValue,
        focusOptionByIndex
    ]);
    const selectFocusedValue = React.useCallback(()=>setFocusedOptionValue(selectedOptionValue), [
        selectedOptionValue
    ]);
    return {
        focusedOptionValue,
        setFocusedOptionValue,
        focusOptionByIndex,
        resetFocusedOption,
        focusOption,
        selectFocusedValue
    };
}

//# sourceMappingURL=useFocusedOptionController.js.map