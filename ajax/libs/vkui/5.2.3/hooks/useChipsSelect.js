import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _createForOfIteratorHelper from "@babel/runtime/helpers/createForOfIteratorHelper";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["fieldValue", "selectedOptions"];
import * as React from 'react';
import { useChipsInput } from './useChipsInput';
export var useChipsSelect = function useChipsSelect(props) {
  var options = props.options,
    filterFn = props.filterFn,
    getOptionLabel = props.getOptionLabel,
    getOptionValue = props.getOptionValue;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    opened = _React$useState2[0],
    setOpened = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedOptionIndex = _React$useState4[0],
    setFocusedOptionIndex = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focusedOption = _React$useState6[0],
    setFocusedOption = _React$useState6[1];
  var _useChipsInput = useChipsInput(props),
    fieldValue = _useChipsInput.fieldValue,
    selectedOptions = _useChipsInput.selectedOptions,
    chipsInputState = _objectWithoutProperties(_useChipsInput, _excluded);
  var handleInputChange = function handleInputChange(e) {
    if (!e) {
      return;
    }
    chipsInputState.handleInputChange(e);
    if (!opened) {
      setOpened(true);
      setFocusedOptionIndex(0);
    }
  };
  var filteredOptions = React.useMemo(function () {
    return filterFn ? options.filter(function (option) {
      return filterFn(fieldValue, option, getOptionLabel);
    }) : options;
  }, [options, filterFn, fieldValue, getOptionLabel]);
  filteredOptions = React.useMemo(function () {
    if (!filteredOptions.length) {
      return filteredOptions;
    }
    var filteredSet = new Set(filteredOptions);
    var selected = selectedOptions.map(function (item) {
      return getOptionValue(item);
    });
    var _iterator = _createForOfIteratorHelper(filteredSet),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (selected.includes(getOptionValue(item))) {
          filteredSet.delete(item);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _toConsumableArray(filteredSet);
  }, [filteredOptions, selectedOptions, getOptionValue]);
  return _objectSpread(_objectSpread({}, chipsInputState), {}, {
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