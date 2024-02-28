import * as React from 'react';
export const useChipsInput = (props)=>{
    const { value, getOptionValue, onChange, onInputChange, getNewOptionData } = props;
    const [fieldValue, setFieldValue] = React.useState(props.inputValue);
    const [selectedOptions, setSelectedOptions] = React.useState(value ?? []);
    const clearInput = React.useCallback(()=>{
        setFieldValue('');
        onInputChange({
            target: {
                value: ''
            }
        });
    }, [
        onInputChange
    ]);
    const handleInputChange = React.useCallback((e)=>{
        setFieldValue(e.target.value);
        onInputChange(e);
    }, [
        onInputChange
    ]);
    const toggleOption = React.useCallback((newOption, value)=>{
        const newSelectedOptions = selectedOptions.filter((option)=>getOptionValue(newOption) !== getOptionValue(option));
        if (value === true) {
            newSelectedOptions.push(newOption);
        }
        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    }, [
        selectedOptions,
        getOptionValue,
        onChange
    ]);
    const addOption = React.useCallback((newOption)=>toggleOption(newOption, true), [
        toggleOption
    ]);
    const addOptionFromInput = React.useCallback(()=>{
        const trimmedValue = fieldValue?.trim();
        if (trimmedValue) {
            addOption(getNewOptionData(undefined, trimmedValue));
            clearInput();
        }
    }, [
        addOption,
        clearInput,
        getNewOptionData,
        fieldValue
    ]);
    const removeOption = React.useCallback((value)=>{
        toggleOption(getNewOptionData(undefined, value), false);
    }, [
        toggleOption,
        getNewOptionData
    ]);
    React.useEffect(()=>{
        setSelectedOptions(value);
        return ()=>setSelectedOptions([]);
    }, [
        props.value,
        value
    ]);
    React.useEffect(()=>{
        setFieldValue(props.inputValue);
        return ()=>setFieldValue('');
    }, [
        props.inputValue
    ]);
    return {
        fieldValue,
        setFieldValue,
        selectedOptions,
        setSelectedOptions,
        clearInput,
        toggleOption,
        addOption,
        addOptionFromInput,
        removeOption,
        handleInputChange
    };
};

//# sourceMappingURL=useChipsInput.js.map