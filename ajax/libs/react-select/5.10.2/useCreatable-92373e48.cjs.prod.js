'use strict';

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var index = require('./index-665c4ed8.cjs.prod.js');
var Select = require('./Select-8685a2b1.cjs.prod.js');

var _excluded = ["allowCreateWhileLoading", "createOptionPosition", "formatCreateLabel", "isValidNewOption", "getNewOptionData", "onCreateOption", "options", "onChange"];
var compareOption = function compareOption() {
  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : undefined;
  var accessors = arguments.length > 2 ? arguments[2] : undefined;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  var optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};
var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return "Create \"".concat(inputValue, "\"");
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions, accessors) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};
function useCreatable(_ref) {
  var _ref$allowCreateWhile = _ref.allowCreateWhileLoading,
    allowCreateWhileLoading = _ref$allowCreateWhile === void 0 ? false : _ref$allowCreateWhile,
    _ref$createOptionPosi = _ref.createOptionPosition,
    createOptionPosition = _ref$createOptionPosi === void 0 ? 'last' : _ref$createOptionPosi,
    _ref$formatCreateLabe = _ref.formatCreateLabel,
    formatCreateLabel = _ref$formatCreateLabe === void 0 ? builtins.formatCreateLabel : _ref$formatCreateLabe,
    _ref$isValidNewOption = _ref.isValidNewOption,
    isValidNewOption = _ref$isValidNewOption === void 0 ? builtins.isValidNewOption : _ref$isValidNewOption,
    _ref$getNewOptionData = _ref.getNewOptionData,
    getNewOptionData = _ref$getNewOptionData === void 0 ? builtins.getNewOptionData : _ref$getNewOptionData,
    onCreateOption = _ref.onCreateOption,
    _ref$options = _ref.options,
    propsOptions = _ref$options === void 0 ? [] : _ref$options,
    propsOnChange = _ref.onChange,
    restSelectProps = _objectWithoutProperties(_ref, _excluded);
  var _restSelectProps$getO = restSelectProps.getOptionValue,
    getOptionValue = _restSelectProps$getO === void 0 ? Select.getOptionValue : _restSelectProps$getO,
    _restSelectProps$getO2 = restSelectProps.getOptionLabel,
    getOptionLabel = _restSelectProps$getO2 === void 0 ? Select.getOptionLabel : _restSelectProps$getO2,
    inputValue = restSelectProps.inputValue,
    isLoading = restSelectProps.isLoading,
    isMulti = restSelectProps.isMulti,
    value = restSelectProps.value,
    name = restSelectProps.name;
  var newOption = React.useMemo(function () {
    return isValidNewOption(inputValue, index.cleanValue(value), propsOptions, {
      getOptionValue: getOptionValue,
      getOptionLabel: getOptionLabel
    }) ? getNewOptionData(inputValue, formatCreateLabel(inputValue)) : undefined;
  }, [formatCreateLabel, getNewOptionData, getOptionLabel, getOptionValue, inputValue, isValidNewOption, propsOptions, value]);
  var options = React.useMemo(function () {
    return (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(propsOptions)) : [].concat(_toConsumableArray(propsOptions), [newOption]) : propsOptions;
  }, [allowCreateWhileLoading, createOptionPosition, isLoading, newOption, propsOptions]);
  var onChange = React.useCallback(function (newValue, actionMeta) {
    if (actionMeta.action !== 'select-option') {
      return propsOnChange(newValue, actionMeta);
    }
    var valueArray = Array.isArray(newValue) ? newValue : [newValue];
    if (valueArray[valueArray.length - 1] === newOption) {
      if (onCreateOption) onCreateOption(inputValue);else {
        var newOptionData = getNewOptionData(inputValue, inputValue);
        var newActionMeta = {
          action: 'create-option',
          name: name,
          option: newOptionData
        };
        propsOnChange(index.valueTernary(isMulti, [].concat(_toConsumableArray(index.cleanValue(value)), [newOptionData]), newOptionData), newActionMeta);
      }
      return;
    }
    propsOnChange(newValue, actionMeta);
  }, [getNewOptionData, inputValue, isMulti, name, newOption, onCreateOption, propsOnChange, value]);
  return _objectSpread(_objectSpread({}, restSelectProps), {}, {
    options: options,
    onChange: onChange
  });
}

exports.useCreatable = useCreatable;
