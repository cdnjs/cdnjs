"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChipsSelect = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelper"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _useChipsInput2 = require("./useChipsInput");
var _excluded = ["fieldValue", "selectedOptions"];
var useChipsSelect = function useChipsSelect(props) {
  var options = props.options,
    filterFn = props.filterFn,
    getOptionLabel = props.getOptionLabel,
    getOptionValue = props.getOptionValue;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    opened = _React$useState2[0],
    setOpened = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    focusedOptionIndex = _React$useState4[0],
    setFocusedOptionIndex = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
    focusedOption = _React$useState6[0],
    setFocusedOption = _React$useState6[1];
  var _useChipsInput = (0, _useChipsInput2.useChipsInput)(props),
    fieldValue = _useChipsInput.fieldValue,
    selectedOptions = _useChipsInput.selectedOptions,
    chipsInputState = (0, _objectWithoutProperties2.default)(_useChipsInput, _excluded);
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
    var _iterator = (0, _createForOfIteratorHelper2.default)(filteredSet),
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
    return (0, _toConsumableArray2.default)(filteredSet);
  }, [filteredOptions, selectedOptions, getOptionValue]);
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, chipsInputState), {}, {
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
exports.useChipsSelect = useChipsSelect;
//# sourceMappingURL=useChipsSelect.js.map