import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["name", "min", "max", "dayPlaceholder", "monthPlaceholder", "yearPlaceholder", "popupDirection", "defaultValue", "monthNames", "day", "month", "year", "onDateChange", "disabled", "className"],
  _excluded2 = ["min", "max", "dayPlaceholder", "monthPlaceholder", "yearPlaceholder", "popupDirection", "defaultValue", "day", "month", "year", "onDateChange"],
  _excluded3 = ["defaultValue"];
import * as React from 'react';
import { classNames, leadingZero } from '@vkontakte/vkjs';
import { Input } from '../Input/Input';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { range } from '../../helpers/range';
import "./DatePicker.module.css";
var DefaultMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
// Переводим state к формату гг-мм-дд
function convertToInputFormat(_ref) {
  var _ref$day = _ref.day,
    day = _ref$day === void 0 ? 0 : _ref$day,
    _ref$month = _ref.month,
    month = _ref$month === void 0 ? 0 : _ref$month,
    _ref$year = _ref.year,
    year = _ref$year === void 0 ? 0 : _ref$year;
  return "".concat(year, "-").concat(leadingZero(month), "-").concat(leadingZero(day));
}

// Переводим дату формата гг-мм-дд к объекту
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
var DatePickerCustom = function DatePickerCustom(_ref2) {
  var name = _ref2.name,
    _ref2$min = _ref2.min,
    min = _ref2$min === void 0 ? {
      day: 0,
      month: 0,
      year: 0
    } : _ref2$min,
    _ref2$max = _ref2.max,
    max = _ref2$max === void 0 ? {
      day: 31,
      month: 12,
      year: 2100
    } : _ref2$max,
    dayPlaceholder = _ref2.dayPlaceholder,
    monthPlaceholder = _ref2.monthPlaceholder,
    yearPlaceholder = _ref2.yearPlaceholder,
    popupDirection = _ref2.popupDirection,
    defaultValue = _ref2.defaultValue,
    monthNames = _ref2.monthNames,
    _ref2$day = _ref2.day,
    day = _ref2$day === void 0 ? 0 : _ref2$day,
    _ref2$month = _ref2.month,
    month = _ref2$month === void 0 ? 0 : _ref2$month,
    _ref2$year = _ref2.year,
    year = _ref2$year === void 0 ? 0 : _ref2$year,
    onDateChange = _ref2.onDateChange,
    disabled = _ref2.disabled,
    className = _ref2.className,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var onSelectChange = function onSelectChange(e) {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(_defineProperty({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames("vkuiDatePicker", className)
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiDatePicker__container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiDatePicker__day"
  }, /*#__PURE__*/React.createElement(CustomSelect, {
    name: "day",
    value: day,
    options: dayOptions,
    placeholder: dayPlaceholder,
    popupDirection: popupDirection,
    onChange: onSelectChange,
    disabled: disabled
  })), /*#__PURE__*/React.createElement("div", {
    className: "vkuiDatePicker__month"
  }, /*#__PURE__*/React.createElement(CustomSelect, {
    className: "vkuiDatePicker__monthSelect",
    name: "month",
    value: month,
    options: monthOptions,
    placeholder: monthPlaceholder,
    popupDirection: popupDirection,
    onChange: onSelectChange,
    disabled: disabled
  })), /*#__PURE__*/React.createElement("div", {
    className: "vkuiDatePicker__year"
  }, /*#__PURE__*/React.createElement(CustomSelect, {
    name: "year",
    value: year,
    options: yearOptions,
    placeholder: yearPlaceholder,
    popupDirection: popupDirection,
    onChange: onSelectChange,
    disabled: disabled
  }))), /*#__PURE__*/React.createElement("input", {
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
  var _ref3$min = _ref3.min,
    min = _ref3$min === void 0 ? {
      day: 0,
      month: 0,
      year: 0
    } : _ref3$min,
    _ref3$max = _ref3.max,
    max = _ref3$max === void 0 ? {
      day: 31,
      month: 12,
      year: 2100
    } : _ref3$max,
    dayPlaceholder = _ref3.dayPlaceholder,
    monthPlaceholder = _ref3.monthPlaceholder,
    yearPlaceholder = _ref3.yearPlaceholder,
    popupDirection = _ref3.popupDirection,
    defaultValue = _ref3.defaultValue,
    day = _ref3.day,
    month = _ref3.month,
    year = _ref3.year,
    onDateChange = _ref3.onDateChange,
    restProps = _objectWithoutProperties(_ref3, _excluded2);
  var defProps = day && month && year ? {
    defaultValue: convertToInputFormat({
      day: day,
      month: month,
      year: year
    })
  } : {};
  var onStringChange = React.useCallback(function (e) {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(parseInputDate(e.currentTarget.value));
  }, [onDateChange]);
  return /*#__PURE__*/React.createElement(Input, _extends({}, restProps, {
    type: "date",
    onChange: onStringChange,
    min: convertToInputFormat(min),
    max: convertToInputFormat(max)
  }, defProps));
};

/**
 * @see https://vkcom.github.io/VKUI/#/DatePicker
 */
export var DatePicker = function DatePicker(_ref4) {
  var defaultValue = _ref4.defaultValue,
    props = _objectWithoutProperties(_ref4, _excluded3);
  var hasPointer = useAdaptivityHasPointer();
  var _React$useState = React.useState(function () {
      return {
        day: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.day) || 0,
        month: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.month) || 0,
        year: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.year) || 0
      };
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var onDateChange = React.useCallback(function (update) {
    setValue(update);
    props.onDateChange && props.onDateChange(_objectSpread({}, update));
  }, [props]);
  var Cmp = hasPointer ? DatePickerCustom : DatePickerNative;
  return /*#__PURE__*/React.createElement(Cmp, _extends({}, props, value, {
    onDateChange: onDateChange
  }));
};
//# sourceMappingURL=DatePicker.js.map