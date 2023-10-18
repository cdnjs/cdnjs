import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
export var useChipsInput = function(props) {
    var value = props.value, getOptionValue = props.getOptionValue, onChange = props.onChange, onInputChange = props.onInputChange, getNewOptionData = props.getNewOptionData;
    var _React_useState = _sliced_to_array(React.useState(props.inputValue), 2), fieldValue = _React_useState[0], setFieldValue = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(value !== null && value !== void 0 ? value : []), 2), selectedOptions = _React_useState1[0], setSelectedOptions = _React_useState1[1];
    var clearInput = React.useCallback(function() {
        setFieldValue("");
        onInputChange({
            target: {
                value: ""
            }
        });
    }, [
        onInputChange
    ]);
    var handleInputChange = React.useCallback(function(e) {
        setFieldValue(e.target.value);
        onInputChange(e);
    }, [
        onInputChange
    ]);
    var toggleOption = React.useCallback(function(newOption, value) {
        var newSelectedOptions = selectedOptions.filter(function(option) {
            return getOptionValue(newOption) !== getOptionValue(option);
        });
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
    var addOption = React.useCallback(function(newOption) {
        return toggleOption(newOption, true);
    }, [
        toggleOption
    ]);
    var addOptionFromInput = React.useCallback(function() {
        var trimmedValue = fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.trim();
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
    var removeOption = React.useCallback(function(value) {
        toggleOption(getNewOptionData(undefined, value), false);
    }, [
        toggleOption,
        getNewOptionData
    ]);
    React.useEffect(function() {
        setSelectedOptions(value);
        return function() {
            return setSelectedOptions([]);
        };
    }, [
        props.value,
        value
    ]);
    React.useEffect(function() {
        setFieldValue(props.inputValue);
        return function() {
            return setFieldValue("");
        };
    }, [
        props.inputValue
    ]);
    return {
        fieldValue: fieldValue,
        setFieldValue: setFieldValue,
        selectedOptions: selectedOptions,
        setSelectedOptions: setSelectedOptions,
        clearInput: clearInput,
        toggleOption: toggleOption,
        addOption: addOption,
        addOptionFromInput: addOptionFromInput,
        removeOption: removeOption,
        handleInputChange: handleInputChange
    };
};

//# sourceMappingURL=useChipsInput.js.map