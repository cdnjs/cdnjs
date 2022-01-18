"use strict";

var index = require("./index-30b509fd.cjs.prod.js"), _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray"), _objectWithoutProperties = require("@babel/runtime/helpers/objectWithoutProperties"), React = require("react"), base_dist_reactSelect = require("./Select-2097e639.cjs.prod.js");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var _toConsumableArray__default = _interopDefault(_toConsumableArray), _objectWithoutProperties__default = _interopDefault(_objectWithoutProperties), _excluded = [ "allowCreateWhileLoading", "createOptionPosition", "formatCreateLabel", "isValidNewOption", "getNewOptionData", "onCreateOption", "options", "onChange" ], compareOption = function() {
  var inputValue = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", option = arguments.length > 1 ? arguments[1] : void 0, accessors = arguments.length > 2 ? arguments[2] : void 0, candidate = String(inputValue).toLowerCase(), optionValue = String(accessors.getOptionValue(option)).toLowerCase(), optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
}, builtins = {
  formatCreateLabel: function(inputValue) {
    return 'Create "'.concat(inputValue, '"');
  },
  isValidNewOption: function(inputValue, selectValue, selectOptions, accessors) {
    return !(!inputValue || selectValue.some((function(option) {
      return compareOption(inputValue, option, accessors);
    })) || selectOptions.some((function(option) {
      return compareOption(inputValue, option, accessors);
    })));
  },
  getNewOptionData: function(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: !0
    };
  }
};

function useCreatable(_ref) {
  var _ref$allowCreateWhile = _ref.allowCreateWhileLoading, allowCreateWhileLoading = void 0 !== _ref$allowCreateWhile && _ref$allowCreateWhile, _ref$createOptionPosi = _ref.createOptionPosition, createOptionPosition = void 0 === _ref$createOptionPosi ? "last" : _ref$createOptionPosi, _ref$formatCreateLabe = _ref.formatCreateLabel, formatCreateLabel = void 0 === _ref$formatCreateLabe ? builtins.formatCreateLabel : _ref$formatCreateLabe, _ref$isValidNewOption = _ref.isValidNewOption, isValidNewOption = void 0 === _ref$isValidNewOption ? builtins.isValidNewOption : _ref$isValidNewOption, _ref$getNewOptionData = _ref.getNewOptionData, getNewOptionData = void 0 === _ref$getNewOptionData ? builtins.getNewOptionData : _ref$getNewOptionData, onCreateOption = _ref.onCreateOption, _ref$options = _ref.options, propsOptions = void 0 === _ref$options ? [] : _ref$options, propsOnChange = _ref.onChange, restSelectProps = _objectWithoutProperties__default.default(_ref, _excluded), _restSelectProps$getO = restSelectProps.getOptionValue, getOptionValue = void 0 === _restSelectProps$getO ? base_dist_reactSelect.getOptionValue : _restSelectProps$getO, _restSelectProps$getO2 = restSelectProps.getOptionLabel, getOptionLabel = void 0 === _restSelectProps$getO2 ? base_dist_reactSelect.getOptionLabel : _restSelectProps$getO2, inputValue = restSelectProps.inputValue, isLoading = restSelectProps.isLoading, isMulti = restSelectProps.isMulti, value = restSelectProps.value, name = restSelectProps.name, newOption = React.useMemo((function() {
    return isValidNewOption(inputValue, index.cleanValue(value), propsOptions, {
      getOptionValue: getOptionValue,
      getOptionLabel: getOptionLabel
    }) ? getNewOptionData(inputValue, formatCreateLabel(inputValue)) : void 0;
  }), [ formatCreateLabel, getNewOptionData, getOptionLabel, getOptionValue, inputValue, isValidNewOption, propsOptions, value ]), options = React.useMemo((function() {
    return !allowCreateWhileLoading && isLoading || !newOption ? propsOptions : "first" === createOptionPosition ? [ newOption ].concat(_toConsumableArray__default.default(propsOptions)) : [].concat(_toConsumableArray__default.default(propsOptions), [ newOption ]);
  }), [ allowCreateWhileLoading, createOptionPosition, isLoading, newOption, propsOptions ]), onChange = React.useCallback((function(newValue, actionMeta) {
    if ("select-option" !== actionMeta.action) return propsOnChange(newValue, actionMeta);
    var valueArray = Array.isArray(newValue) ? newValue : [ newValue ];
    if (valueArray[valueArray.length - 1] !== newOption) propsOnChange(newValue, actionMeta); else if (onCreateOption) onCreateOption(inputValue); else {
      var newOptionData = getNewOptionData(inputValue, inputValue), newActionMeta = {
        action: "create-option",
        name: name,
        option: newOptionData
      };
      propsOnChange(index.valueTernary(isMulti, [].concat(_toConsumableArray__default.default(index.cleanValue(value)), [ newOptionData ]), newOptionData), newActionMeta);
    }
  }), [ getNewOptionData, inputValue, isMulti, name, newOption, onCreateOption, propsOnChange, value ]);
  return index._objectSpread2(index._objectSpread2({}, restSelectProps), {}, {
    options: options,
    onChange: onChange
  });
}

exports.useCreatable = useCreatable;
