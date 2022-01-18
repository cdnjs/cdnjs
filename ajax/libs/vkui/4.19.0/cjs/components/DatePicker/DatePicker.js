"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _Input = _interopRequireDefault(require("../Input/Input"));

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _utils = require("../../lib/utils");

var _CustomSelect = _interopRequireDefault(require("../CustomSelect/CustomSelect"));

var _excluded = ["name", "min", "max", "dayPlaceholder", "monthPlaceholder", "yearPlaceholder", "popupDirection", "defaultValue", "hasMouse", "monthNames", "day", "month", "year", "onDateChange", "disabled"],
    _excluded2 = ["min", "max", "dayPlaceholder", "monthPlaceholder", "yearPlaceholder", "popupDirection", "defaultValue", "hasMouse", "day", "month", "year", "onDateChange"],
    _excluded3 = ["hasMouse", "defaultValue"];
var DefaultMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

// Переводим state к формату гг-мм-дд
function convertToInputFormat(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year;
  return "".concat(year, "-").concat((0, _utils.leadingZero)(month), "-").concat((0, _utils.leadingZero)(day));
} // Переводим дату формата гг-мм-дд к объекту


function parseInputDate(date) {
  var splited = date.split('-');
  return {
    day: Number(splited[2]),
    month: Number(splited[1]),
    year: Number(splited[0])
  };
}

function getMonthMaxDay(month, year) {
  return month ? new Date(year || 2016, month, 0).getDate() : 31;
}

var range = function range(start, end) {
  var swap = start > end;
  var arr = [];

  for (var i = Math.min(start, end); i <= Math.max(start, end); i++) {
    arr.push(i);
  }

  return swap ? arr.reverse() : arr;
};

var DatePickerCustom = function DatePickerCustom(_ref2) {
  var name = _ref2.name,
      min = _ref2.min,
      max = _ref2.max,
      dayPlaceholder = _ref2.dayPlaceholder,
      monthPlaceholder = _ref2.monthPlaceholder,
      yearPlaceholder = _ref2.yearPlaceholder,
      popupDirection = _ref2.popupDirection,
      defaultValue = _ref2.defaultValue,
      hasMouse = _ref2.hasMouse,
      monthNames = _ref2.monthNames,
      day = _ref2.day,
      month = _ref2.month,
      year = _ref2.year,
      onDateChange = _ref2.onDateChange,
      disabled = _ref2.disabled,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);

  var onSelectChange = function onSelectChange(e) {
    onDateChange((0, _defineProperty2.default)({
      day: day,
      month: month,
      year: year
    }, e.target.name, Number(e.target.value)));
  };

  var dayOptions = range(1, getMonthMaxDay(month, year)).map(function (value) {
    return {
      label: String(value),
      value: value
    };
  });
  var monthOptions = (monthNames || DefaultMonths).map(function (name, index) {
    return {
      label: name,
      value: index + 1
    };
  });
  var yearOptions = range(max.year, min.year).map(function (value) {
    return {
      label: String(value),
      value: value
    };
  });
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: "DatePicker"
  }, restProps), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "DatePicker__container"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "DatePicker__day"
  }, (0, _jsxRuntime.createScopedElement)(_CustomSelect.default, {
    name: "day",
    value: day,
    options: dayOptions,
    placeholder: dayPlaceholder,
    popupDirection: popupDirection,
    onChange: onSelectChange,
    disabled: disabled
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "DatePicker__month"
  }, (0, _jsxRuntime.createScopedElement)(_CustomSelect.default, {
    vkuiClass: "DatePicker__monthSelect",
    name: "month",
    value: month,
    options: monthOptions,
    placeholder: monthPlaceholder,
    popupDirection: popupDirection,
    onChange: onSelectChange,
    disabled: disabled
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "DatePicker__year"
  }, (0, _jsxRuntime.createScopedElement)(_CustomSelect.default, {
    name: "year",
    value: year,
    options: yearOptions,
    placeholder: yearPlaceholder,
    popupDirection: popupDirection,
    onChange: onSelectChange,
    disabled: disabled
  }))), (0, _jsxRuntime.createScopedElement)("input", {
    type: "hidden",
    name: name,
    value: convertToInputFormat({
      day: day,
      month: month,
      year: year
    })
  }));
};

var DatePickerNative = function DatePickerNative(_ref3) {
  var min = _ref3.min,
      max = _ref3.max,
      dayPlaceholder = _ref3.dayPlaceholder,
      monthPlaceholder = _ref3.monthPlaceholder,
      yearPlaceholder = _ref3.yearPlaceholder,
      popupDirection = _ref3.popupDirection,
      defaultValue = _ref3.defaultValue,
      hasMouse = _ref3.hasMouse,
      day = _ref3.day,
      month = _ref3.month,
      year = _ref3.year,
      onDateChange = _ref3.onDateChange,
      restProps = (0, _objectWithoutProperties2.default)(_ref3, _excluded2);
  var defProps = day && month && year ? {
    defaultValue: convertToInputFormat({
      day: day,
      month: month,
      year: year
    })
  } : {};
  var onStringChange = React.useCallback(function (e) {
    onDateChange(parseInputDate(e.currentTarget.value));
  }, [onDateChange]);
  return (0, _jsxRuntime.createScopedElement)(_Input.default, (0, _extends2.default)({}, restProps, {
    type: "date",
    onChange: onStringChange,
    min: convertToInputFormat(min),
    max: convertToInputFormat(max)
  }, defProps));
};

var DatePicker = function DatePicker(_ref4) {
  var hasMouse = _ref4.hasMouse,
      defaultValue = _ref4.defaultValue,
      props = (0, _objectWithoutProperties2.default)(_ref4, _excluded3);

  var _React$useState = React.useState(defaultValue || {
    day: 0,
    month: 0,
    year: 0
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var onDateChange = React.useCallback(function (update) {
    setValue(update);
    props.onDateChange && props.onDateChange((0, _objectSpread2.default)({}, update));
  }, [props.onDateChange]);
  var Cmp = hasMouse ? DatePickerCustom : DatePickerNative;
  return (0, _jsxRuntime.createScopedElement)(Cmp, (0, _extends2.default)({}, props, value, {
    onDateChange: onDateChange
  }));
};

DatePicker.defaultProps = {
  min: {
    day: 0,
    month: 0,
    year: 0
  },
  max: {
    day: 31,
    month: 12,
    year: 2100
  }
};

var _default = (0, _withAdaptivity.withAdaptivity)(DatePicker, {
  hasMouse: true
});

exports.default = _default;
//# sourceMappingURL=DatePicker.js.map