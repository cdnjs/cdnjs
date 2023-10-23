"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useChipsSelect", {
    enumerable: true,
    get: function() {
        return useChipsSelect;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useChipsInput = require("./useChipsInput");
var useChipsSelect = function(props) {
    var options = props.options, filterFn = props.filterFn, getOptionLabel = props.getOptionLabel, getOptionValue = props.getOptionValue, showSelected = props.showSelected;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), opened = _React_useState[0], setOpened = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(0), 2), focusedOptionIndex = _React_useState1[0], setFocusedOptionIndex = _React_useState1[1];
    var _React_useState2 = _sliced_to_array._(_react.useState(null), 2), focusedOption = _React_useState2[0], setFocusedOption = _React_useState2[1];
    var _useChipsInput1 = (0, _useChipsInput.useChipsInput)(props), fieldValue = _useChipsInput1.fieldValue, selectedOptions = _useChipsInput1.selectedOptions, chipsInputState = _object_without_properties._(_useChipsInput1, [
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
    var filteredOptions = _react.useMemo(function() {
        return filterFn ? options.filter(function(option) {
            return filterFn(fieldValue, option, getOptionLabel);
        }) : options;
    }, [
        options,
        filterFn,
        fieldValue,
        getOptionLabel
    ]);
    filteredOptions = _react.useMemo(function filterOutSelectedIfNeeded() {
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
        return _to_consumable_array._(filteredSet);
    }, [
        filteredOptions,
        selectedOptions,
        getOptionValue,
        showSelected
    ]);
    return _object_spread_props._(_object_spread._({}, chipsInputState), {
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