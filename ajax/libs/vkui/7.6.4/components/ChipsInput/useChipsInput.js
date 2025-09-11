import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as React from "react";
import { escapeRegExp } from "@vkontakte/vkjs";
import { useCustomEnsuredControl, useEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { useNativeFormResetListener } from "../../hooks/useNativeFormResetListener.js";
import { simulateReactInput } from "../../lib/react/index.js";
import { DEFAULT_INPUT_VALUE, DEFAULT_VALUE, getNewOptionDataDefault, getOptionLabelDefault, getOptionValueDefault } from "../ChipsInputBase/constants.js";
import { isValueLikeChipOptionObject } from "../ChipsInputBase/helpers.js";
export const transformValue = (value, getOptionValue, getOptionLabel)=>value.map((option)=>_object_spread_props(_object_spread({}, option), {
            label: getOptionLabel(option),
            value: getOptionValue(option)
        }));
function getRegExpFromArray(separators) {
    const validSeparators = separators.filter((s)=>s.length > 0);
    if (validSeparators.length === 0) {
        return null;
    }
    const escaped = validSeparators.map((s)=>escapeRegExp(s));
    return new RegExp(`(?:${escaped.join('|')})`);
}
function getRegexFromDelimiter(delimiter) {
    if (delimiter instanceof RegExp) {
        return delimiter;
    }
    if (typeof delimiter === 'string') {
        return new RegExp(escapeRegExp(delimiter));
    }
    return getRegExpFromArray(delimiter);
}
export const useChipsInput = ({ // option
value: valueProp, defaultValue = DEFAULT_VALUE, onChange, getOptionLabel = getOptionLabelDefault, getOptionValue = getOptionValueDefault, getNewOptionData = getNewOptionDataDefault, // input
inputValue: inputValueProp, defaultInputValue = DEFAULT_INPUT_VALUE, onInputChange: onInputChangeProp, // other
disabled, delimiter })=>{
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
        onChange: onInputChangeProp
    });
    const toggleOption = React.useCallback((nextValuesProp, isNewValue)=>{
        setValue((prevValue)=>{
            const resolvedNextOptionsSet = new Set();
            const resolvedNextOptions = nextValuesProp.map((option)=>{
                const isLikeObjectOption = isValueLikeChipOptionObject(option);
                const resolvedOption = isLikeObjectOption ? getNewOptionData(option.value, option.label) : getNewOptionData(option, typeof option === 'string' ? option : '');
                resolvedNextOptionsSet.add(resolvedOption.value);
                return isLikeObjectOption ? _object_spread({}, option, resolvedOption) : resolvedOption;
            });
            const nextValue = prevValue.filter((option)=>!resolvedNextOptionsSet.has(option.value));
            if (isNewValue) {
                nextValue.push(...resolvedNextOptions);
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
    const addOption = React.useCallback((newValue)=>toggleOption([
            newValue
        ], true), [
        toggleOption
    ]);
    const addOptions = React.useCallback((newValues)=>toggleOption(newValues, true), [
        toggleOption
    ]);
    const removeOption = React.useCallback((newValue)=>toggleOption([
            newValue
        ], false), [
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
    const reset = React.useCallback(()=>{
        setValue(defaultValue);
    }, [
        defaultValue,
        setValue
    ]);
    const clearOptions = React.useCallback(()=>{
        setValue(DEFAULT_VALUE);
        clearInput();
    }, [
        clearInput,
        setValue
    ]);
    const onInputChange = React.useCallback((e, canCreate = true)=>{
        const newInputValue = e.target.value;
        const delimiterRegex = delimiter ? getRegexFromDelimiter(delimiter) : null;
        if (!delimiterRegex || !delimiterRegex.test(newInputValue) || !canCreate) {
            setInputChange(e);
            return;
        }
        const values = newInputValue.trim().split(delimiterRegex).map((v)=>v.trim()).filter(Boolean);
        e.target.value = '';
        e.currentTarget.value = '';
        setInputChange(e);
        addOptions(values);
    }, [
        addOptions,
        delimiter,
        setInputChange
    ]);
    useNativeFormResetListener(inputRef, reset);
    return {
        value,
        addOption,
        addOptionFromInput,
        removeOption,
        inputRef,
        inputValue,
        onInputChange,
        clearInput,
        clearOptions
    };
};

//# sourceMappingURL=useChipsInput.js.map