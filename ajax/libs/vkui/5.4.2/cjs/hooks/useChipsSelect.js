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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _toConsumableArray = require("@swc/helpers/lib/_to_consumable_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _useChipsInput = require("./useChipsInput");
var useChipsSelect = function(props) {
    var options = props.options, filterFn = props.filterFn, getOptionLabel = props.getOptionLabel, getOptionValue = props.getOptionValue;
    var _React_useState = _slicedToArray(_react.useState(false), 2), opened = _React_useState[0], setOpened = _React_useState[1];
    var _React_useState1 = _slicedToArray(_react.useState(0), 2), focusedOptionIndex = _React_useState1[0], setFocusedOptionIndex = _React_useState1[1];
    var _React_useState2 = _slicedToArray(_react.useState(null), 2), focusedOption = _React_useState2[0], setFocusedOption = _React_useState2[1];
    var _useChipsInput1 = (0, _useChipsInput.useChipsInput)(props), fieldValue = _useChipsInput1.fieldValue, selectedOptions = _useChipsInput1.selectedOptions, chipsInputState = _objectWithoutProperties(_useChipsInput1, [
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
    filteredOptions = _react.useMemo(function() {
        if (!filteredOptions.length) {
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
        return _toConsumableArray(filteredSet);
    }, [
        filteredOptions,
        selectedOptions,
        getOptionValue
    ]);
    return _objectSpreadProps(_objectSpread({}, chipsInputState), {
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