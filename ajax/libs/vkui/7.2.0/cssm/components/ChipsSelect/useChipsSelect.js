import * as React from "react";
import { isEqual } from "@vkontakte/vkjs";
import { defaultFilterFn } from "../../lib/select.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { transformValue, useChipsInput } from "../ChipsInput/useChipsInput.js";
import { DEFAULT_INPUT_VALUE, DEFAULT_VALUE, getNewOptionDataDefault, getOptionLabelDefault, getOptionValueDefault } from "../ChipsInputBase/constants.js";
import { DEFAULT_EMPTY_TEXT, DEFAULT_SELECTED_BEHAVIOR, isNotServicePreset } from "./constants.js";
export const useChipsSelect = ({ // common
disabled, // option
value: valueProp, defaultValue, onChange, getOptionLabel = getOptionLabelDefault, getOptionValue = getOptionValueDefault, getNewOptionData = getNewOptionDataDefault, // input
inputValue: inputValueProp, defaultInputValue = DEFAULT_INPUT_VALUE, onInputChange: onInputChangeProp, // dropdown
creatable = false, emptyText = DEFAULT_EMPTY_TEXT, filterFn = defaultFilterFn, sortFn = false, selectedBehavior = DEFAULT_SELECTED_BEHAVIOR, options: optionsProp = DEFAULT_VALUE, onClose, onOpen })=>{
    const { value, inputValue, onInputChange, ...restChipsInputProps } = useChipsInput({
        // option
        value: valueProp,
        defaultValue,
        onChange,
        getOptionValue,
        getOptionLabel,
        getNewOptionData,
        // input
        inputValue: inputValueProp,
        defaultInputValue,
        onInputChange: onInputChangeProp,
        // other
        disabled
    });
    // dropdown
    const [opened, setOpened] = React.useState(false);
    const [options, setOptions] = React.useState(()=>opened ? transformOptions({
            value,
            getOptionValue,
            getOptionLabel,
            inputValue,
            emptyText,
            creatable,
            filterFn,
            sortFn,
            options: optionsProp,
            selectedBehavior
        }) : []);
    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(0);
    const [focusedOption, setFocusedOption] = React.useState(null);
    const handleOpened = React.useCallback((isOpened)=>{
        isOpened ? onOpen?.() : onClose?.();
        setOpened(isOpened);
    }, [
        onOpen,
        onClose
    ]);
    const handleInputChange = React.useCallback((event)=>{
        onInputChange(event);
        if (!opened) {
            handleOpened(true);
            setFocusedOptionIndex(0);
        }
    }, [
        onInputChange,
        opened,
        handleOpened
    ]);
    useIsomorphicLayoutEffect(function handleDropdownOpen() {
        if (!opened) {
            return;
        }
        setOptions((prevOptions)=>{
            const nextOptions = transformOptions({
                value,
                getOptionValue,
                getOptionLabel,
                inputValue,
                emptyText,
                creatable,
                filterFn,
                sortFn,
                options: optionsProp,
                selectedBehavior
            });
            if (isEqual(prevOptions, nextOptions)) {
                return prevOptions;
            }
            return nextOptions;
        });
    }, [
        opened,
        value,
        getOptionLabel,
        getOptionValue,
        inputValue,
        optionsProp,
        creatable,
        selectedBehavior,
        filterFn,
        sortFn
    ]);
    return {
        ...restChipsInputProps,
        // options
        value,
        // input
        inputValue,
        onInputChange: handleInputChange,
        // dropdown states
        options,
        opened,
        setOpened: handleOpened,
        focusedOption,
        focusedOptionIndex,
        setFocusedOption,
        setFocusedOptionIndex
    };
};
function transformOptions({ value, getOptionValue = getOptionValueDefault, getOptionLabel = getOptionLabelDefault, inputValue = DEFAULT_INPUT_VALUE, emptyText = DEFAULT_EMPTY_TEXT, creatable = false, sortFn = false, filterFn = defaultFilterFn, options: optionsProp = DEFAULT_VALUE, selectedBehavior = DEFAULT_SELECTED_BEHAVIOR }) {
    const filteredOptionsProp = filterFn ? optionsProp.filter((option)=>filterFn(inputValue, option, getOptionLabel)) : optionsProp;
    if (filteredOptionsProp.length === 0) {
        if (inputValue !== DEFAULT_INPUT_VALUE && typeof creatable === 'string') {
            return [
                {
                    actionText: creatable
                }
            ];
        }
        return [
            {
                placeholder: emptyText
            }
        ];
    }
    if (sortFn) {
        filteredOptionsProp.sort((optionA, optionB)=>sortFn(optionA, optionB, inputValue));
    }
    const parsedOptions = transformValue(filteredOptionsProp, getOptionValue, getOptionLabel);
    if (selectedBehavior === 'hide') {
        const selected = value.map((item)=>item.value);
        return parsedOptions.filter((item)=>isNotServicePreset(item) ? !selected.includes(item.value) : false);
    }
    return parsedOptions;
}

//# sourceMappingURL=useChipsSelect.js.map