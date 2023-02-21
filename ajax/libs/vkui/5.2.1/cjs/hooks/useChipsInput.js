"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChipsInput = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var useChipsInput = function useChipsInput(props) {
  var value = props.value,
    getOptionValue = props.getOptionValue,
    onChange = props.onChange,
    onInputChange = props.onInputChange,
    getNewOptionData = props.getNewOptionData;
  var _React$useState = React.useState(props.inputValue),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    fieldValue = _React$useState2[0],
    setFieldValue = _React$useState2[1];
  var _React$useState3 = React.useState(value !== null && value !== void 0 ? value : []),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    selectedOptions = _React$useState4[0],
    setSelectedOptions = _React$useState4[1];
  var clearInput = React.useCallback(function () {
    setFieldValue('');
    onInputChange({
      target: {
        value: ''
      }
    });
  }, [onInputChange]);
  var handleInputChange = React.useCallback(function (e) {
    setFieldValue(e.target.value);
    onInputChange(e);
  }, [onInputChange]);
  var toggleOption = React.useCallback(function (newOption, value) {
    var newSelectedOptions = selectedOptions.filter(function (option) {
      return getOptionValue(newOption) !== getOptionValue(option);
    });
    if (value === true) {
      newSelectedOptions.push(newOption);
    }
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  }, [selectedOptions, getOptionValue, onChange]);
  var addOption = React.useCallback(function (newOption) {
    return toggleOption(newOption, true);
  }, [toggleOption]);
  var addOptionFromInput = React.useCallback(function () {
    var trimmedValue = fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.trim();
    if (trimmedValue) {
      addOption(getNewOptionData(undefined, trimmedValue));
      clearInput();
    }
  }, [addOption, clearInput, getNewOptionData, fieldValue]);
  var removeOption = React.useCallback(function (value) {
    toggleOption(getNewOptionData(undefined, value), false);
  }, [toggleOption, getNewOptionData]);
  React.useEffect(function () {
    setSelectedOptions(value);
    return function () {
      return setSelectedOptions([]);
    };
  }, [props.value, value]);
  React.useEffect(function () {
    setFieldValue(props.inputValue);
    return function () {
      return setFieldValue('');
    };
  }, [props.inputValue]);
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
exports.useChipsInput = useChipsInput;
//# sourceMappingURL=useChipsInput.js.map