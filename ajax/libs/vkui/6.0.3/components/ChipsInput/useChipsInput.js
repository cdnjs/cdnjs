import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as React from 'react';
import { useCustomEnsuredControl, useEnsuredControl } from '../../hooks/useEnsuredControl';
import { simulateReactInput } from '../../lib/react';
import { DEFAULT_INPUT_VALUE, DEFAULT_VALUE, getNewOptionDataDefault, getOptionLabelDefault, getOptionValueDefault } from '../ChipsInputBase/constants';
import { isValueLikeChipOptionObject } from '../ChipsInputBase/helpers';
export const transformValue = (value, getOptionValue, getOptionLabel)=>value.map((option)=>_object_spread_props(_object_spread({}, option), {
            label: getOptionLabel(option),
            value: getOptionValue(option)
        }));
export const useChipsInput = ({ // option
value: valueProp, defaultValue = DEFAULT_VALUE, onChange, getOptionLabel = getOptionLabelDefault, getOptionValue = getOptionValueDefault, getNewOptionData = getNewOptionDataDefault, // input
inputValue: inputValueProp, defaultInputValue = DEFAULT_INPUT_VALUE, onInputChange, // other
disabled })=>{
    const [value, setValue] = useCustomEnsuredControl({
        disabled,
        value: valueProp ? transformValue(valueProp, getOptionValue, getOptionLabel) : undefined,
        defaultValue: transformValue(defaultValue, getOptionValue, getOptionLabel),
        onChange
    });
    const inputRef = React.useRef(null);
    const [inputValue, setInputChange] = useEnsuredControl({
        disabled,
        value: inputValueProp,
        defaultValue: defaultInputValue,
        onChange: onInputChange
    });
    const toggleOption = React.useCallback((nextValueProp, isNewValue)=>{
        setValue((prevValue)=>{
            const isLikeObjectOption = isValueLikeChipOptionObject(nextValueProp);
            const resolvedOption = isLikeObjectOption ? getNewOptionData(nextValueProp.value, nextValueProp.label) : getNewOptionData(nextValueProp, typeof nextValueProp === 'string' ? nextValueProp : '');
            const nextValue = prevValue.filter((option)=>resolvedOption.value !== option.value);
            if (isNewValue === true) {
                nextValue.push(isLikeObjectOption ? _object_spread({}, nextValueProp, resolvedOption) : resolvedOption);
            }
            return nextValue;
        });
    }, [
        setValue,
        getNewOptionData
    ]);
    const clearInput = React.useCallback(()=>{
        /* istanbul ignore if */ if (!inputRef.current) {
            return;
        }
        simulateReactInput(inputRef.current, '');
    }, [
        inputRef
    ]);
    const addOption = React.useCallback((newValue)=>toggleOption(newValue, true), [
        toggleOption
    ]);
    const removeOption = React.useCallback((newValue)=>toggleOption(newValue, false), [
        toggleOption
    ]);
    const addOptionFromInput = React.useCallback((inputValue)=>{
        const label = inputValue.trim();
        if (label) {
            addOption(label);
            clearInput();
        }
    }, [
        addOption,
        clearInput
    ]);
    return {
        value,
        addOption,
        addOptionFromInput,
        removeOption,
        inputRef,
        inputValue,
        onInputChange: setInputChange,
        clearInput
    };
};

//# sourceMappingURL=useChipsInput.js.map