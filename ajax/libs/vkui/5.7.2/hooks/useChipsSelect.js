import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as React from "react";
import { useChipsInput } from "./useChipsInput";
export var useChipsSelect = function(props) {
    var options = props.options, filterFn = props.filterFn, getOptionLabel = props.getOptionLabel, getOptionValue = props.getOptionValue, showSelected = props.showSelected;
    var _React_useState = _sliced_to_array(React.useState(false), 2), opened = _React_useState[0], setOpened = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(0), 2), focusedOptionIndex = _React_useState1[0], setFocusedOptionIndex = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState(null), 2), focusedOption = _React_useState2[0], setFocusedOption = _React_useState2[1];
    var _useChipsInput = useChipsInput(props), fieldValue = _useChipsInput.fieldValue, selectedOptions = _useChipsInput.selectedOptions, chipsInputState = _object_without_properties(_useChipsInput, [
        "fieldValue",
        "selectedOptions"
    ]);
    var handleInputChange = function(e) {
        if (!e) {
            return;
        }
        chipsInputState.handleInputChange(e);
        if (!opened) {
            setOpened(true);
            setFocusedOptionIndex(0);
        }
    };
    var filteredOptions = React.useMemo(function() {
        return filterFn ? options.filter(function(option) {
            return filterFn(fieldValue, option, getOptionLabel);
        }) : options;
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
        var filteredSet = new Set(filteredOptions);
        var selected = selectedOptions.map(function(item) {
            return getOptionValue(item);
        });
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = filteredSet[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var item = _step.value;
                if (selected.includes(getOptionValue(item))) {
                    filteredSet.delete(item);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return _to_consumable_array(filteredSet);
    }, [
        filteredOptions,
        selectedOptions,
        getOptionValue,
        showSelected
    ]);
    return _object_spread_props(_object_spread({}, chipsInputState), {
        fieldValue: fieldValue,
        handleInputChange: handleInputChange,
        opened: opened,
        setOpened: setOpened,
        filteredOptions: filteredOptions,
        focusedOptionIndex: focusedOptionIndex,
        setFocusedOptionIndex: setFocusedOptionIndex,
        focusedOption: focusedOption,
        setFocusedOption: setFocusedOption,
        selectedOptions: selectedOptions
    });
};

//# sourceMappingURL=useChipsSelect.js.map