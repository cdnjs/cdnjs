import * as React from 'react';
import { useChipsInput } from './useChipsInput';
export const useChipsSelect = (props)=>{
    const { options, filterFn, getOptionLabel, getOptionValue, showSelected } = props;
    const [opened, setOpened] = React.useState(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(0);
    const [focusedOption, setFocusedOption] = React.useState(null);
    const { fieldValue, selectedOptions, ...chipsInputState } = useChipsInput(props);
    const handleInputChange = (e)=>{
        if (!e) {
            return;
        }
        chipsInputState.handleInputChange(e);
        if (!opened) {
            setOpened(true);
            setFocusedOptionIndex(0);
        }
    };
    let filteredOptions = React.useMemo(()=>{
        return filterFn ? options.filter((option)=>filterFn(fieldValue, option, getOptionLabel)) : options;
    }, [
        options,
        filterFn,
        fieldValue,
        getOptionLabel
    ]);
    filteredOptions = React.useMemo(function filterOutSelectedIfNeeded() {
        if (!filteredOptions.length || showSelected) {
            return filteredOptions;
        }
        const filteredSet = new Set(filteredOptions);
        const selected = selectedOptions.map((item)=>getOptionValue(item));
        for (const item of filteredSet){
            if (selected.includes(getOptionValue(item))) {
                filteredSet.delete(item);
            }
        }
        return [
            ...filteredSet
        ];
    }, [
        filteredOptions,
        selectedOptions,
        getOptionValue,
        showSelected
    ]);
    return {
        ...chipsInputState,
        fieldValue,
        handleInputChange,
        opened,
        setOpened,
        filteredOptions,
        focusedOptionIndex,
        setFocusedOptionIndex,
        focusedOption,
        setFocusedOption,
        selectedOptions
    };
};

//# sourceMappingURL=useChipsSelect.js.map