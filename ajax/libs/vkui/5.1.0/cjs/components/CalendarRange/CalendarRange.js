"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarRange = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _date = require("../../lib/date");
var _CalendarHeader = require("../CalendarHeader/CalendarHeader");
var _CalendarDays = require("../CalendarDays/CalendarDays");
var _calendar = require("../../lib/calendar");
var _useCalendar2 = require("../../hooks/useCalendar");
var _excluded = ["value", "onChange", "disablePast", "disableFuture", "shouldDisableDate", "onClose", "weekStartsOn", "getRootRef", "disablePickers", "prevMonthAriaLabel", "nextMonthAriaLabel", "changeMonthAriaLabel", "changeYearAriaLabel", "changeDayAriaLabel", "prevMonthIcon", "nextMonthIcon", "className", "listenDayChangesForUpdate"];
var getIsDaySelected = function getIsDaySelected(day, value) {
  if (!(value !== null && value !== void 0 && value[0]) || !value[1]) {
    return false;
  }
  return Boolean((0, _date.isWithinInterval)(day, (0, _date.startOfDay)(value[0]), (0, _date.endOfDay)(value[1])));
};

/**
 * @see https://vkcom.github.io/VKUI/#/CalendarRange
 */
var CalendarRange = function CalendarRange(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    disablePast = _ref.disablePast,
    disableFuture = _ref.disableFuture,
    shouldDisableDate = _ref.shouldDisableDate,
    onClose = _ref.onClose,
    _ref$weekStartsOn = _ref.weekStartsOn,
    weekStartsOn = _ref$weekStartsOn === void 0 ? 1 : _ref$weekStartsOn,
    getRootRef = _ref.getRootRef,
    disablePickers = _ref.disablePickers,
    prevMonthAriaLabel = _ref.prevMonthAriaLabel,
    nextMonthAriaLabel = _ref.nextMonthAriaLabel,
    changeMonthAriaLabel = _ref.changeMonthAriaLabel,
    changeYearAriaLabel = _ref.changeYearAriaLabel,
    _ref$changeDayAriaLab = _ref.changeDayAriaLabel,
    changeDayAriaLabel = _ref$changeDayAriaLab === void 0 ? 'Изменить день' : _ref$changeDayAriaLab,
    prevMonthIcon = _ref.prevMonthIcon,
    nextMonthIcon = _ref.nextMonthIcon,
    className = _ref.className,
    listenDayChangesForUpdate = _ref.listenDayChangesForUpdate,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useCalendar = (0, _useCalendar2.useCalendar)({
      value: value,
      disableFuture: disableFuture,
      disablePast: disablePast,
      shouldDisableDate: shouldDisableDate
    }),
    viewDate = _useCalendar.viewDate,
    setViewDate = _useCalendar.setViewDate,
    setPrevMonth = _useCalendar.setPrevMonth,
    setNextMonth = _useCalendar.setNextMonth,
    focusedDay = _useCalendar.focusedDay,
    setFocusedDay = _useCalendar.setFocusedDay,
    isDayFocused = _useCalendar.isDayFocused,
    isDayDisabled = _useCalendar.isDayDisabled,
    resetSelectedDay = _useCalendar.resetSelectedDay;
  var _React$useState = React.useState(),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    hintedDate = _React$useState2[0],
    setHintedDate = _React$useState2[1];
  var secondViewDate = (0, _date.addMonths)(viewDate, 1);
  var handleKeyDown = React.useCallback(function (event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
    var newFocusedDay = (0, _calendar.navigateDate)(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value === null || value === void 0 ? void 0 : value[1], event.key);
    if (newFocusedDay && !(0, _date.isSameMonth)(newFocusedDay, viewDate) && !(0, _date.isSameMonth)(newFocusedDay, (0, _date.addMonths)(viewDate, 1))) {
      setViewDate(newFocusedDay);
    }
    setFocusedDay(newFocusedDay);
  }, [focusedDay, setFocusedDay, setViewDate, value, viewDate]);
  var getNewValue = React.useCallback(function (date) {
    if (!value) {
      return [date, null];
    }
    var start = value[0];
    var end = value[1];
    if (start && (0, _date.isSameDay)(date, start) || end && (0, _date.isSameDay)(date, end)) {
      return [(0, _calendar.setTimeEqual)(date, start), (0, _calendar.setTimeEqual)(date, end)];
    } else if (start && (0, _date.isBefore)(date, start)) {
      return [(0, _calendar.setTimeEqual)(date, start), end];
    } else if (start && (0, _date.isAfter)(date, start)) {
      return [start, (0, _calendar.setTimeEqual)(date, end)];
    }
    return value;
  }, [value]);
  var onDayChange = React.useCallback(function (date) {
    onChange === null || onChange === void 0 ? void 0 : onChange(getNewValue(date));
    setHintedDate(undefined);
  }, [onChange, getNewValue]);
  var isDaySelected = React.useCallback(function (day) {
    return getIsDaySelected(day, value);
  }, [value]);
  var isDayActive = React.useCallback(function (day) {
    return Boolean((value === null || value === void 0 ? void 0 : value[0]) && (0, _date.isSameDay)(day, value[0]) || (value === null || value === void 0 ? void 0 : value[1]) && (0, _date.isSameDay)(day, value[1]));
  }, [value]);
  var isDaySelectionEnd = React.useCallback(function (day, dayOfWeek) {
    return Boolean((0, _calendar.isLastDay)(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[1]) && (0, _date.isSameDay)(day, value[1]));
  }, [value]);
  var isHintedDaySelectionEnd = React.useCallback(function (day, dayOfWeek) {
    return Boolean((0, _calendar.isLastDay)(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[1]) && (0, _date.isSameDay)(day, hintedDate[1]));
  }, [hintedDate]);
  var isDaySelectionStart = React.useCallback(function (day, dayOfWeek) {
    return Boolean((0, _calendar.isFirstDay)(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[0]) && (0, _date.isSameDay)(day, value[0]));
  }, [value]);
  var isHintedDaySelectionStart = React.useCallback(function (day, dayOfWeek) {
    return Boolean((0, _calendar.isFirstDay)(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[0]) && (0, _date.isSameDay)(day, hintedDate[0]));
  }, [hintedDate]);
  var onDayEnter = React.useCallback(function (date) {
    return setHintedDate(getNewValue(date));
  }, [setHintedDate, getNewValue]);
  var onDayLeave = React.useCallback(function () {
    return setHintedDate(undefined);
  }, [setHintedDate]);
  var isDayHinted = React.useCallback(function (day) {
    return getIsDaySelected(day, hintedDate);
  }, [hintedDate]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, props, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiCalendarRange", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarRange__inner"
  }, /*#__PURE__*/React.createElement(_CalendarHeader.CalendarHeader, {
    viewDate: viewDate,
    onChange: setViewDate,
    nextMonth: false,
    onPrevMonth: setPrevMonth,
    disablePickers: disablePickers,
    className: "vkuiCalendarRange__header",
    prevMonthAriaLabel: prevMonthAriaLabel,
    nextMonthAriaLabel: nextMonthAriaLabel,
    changeMonthAriaLabel: changeMonthAriaLabel,
    changeYearAriaLabel: changeYearAriaLabel,
    prevMonthIcon: prevMonthIcon
  }), /*#__PURE__*/React.createElement(_CalendarDays.CalendarDays, {
    viewDate: viewDate,
    value: value,
    weekStartsOn: weekStartsOn,
    onKeyDown: handleKeyDown,
    isDayFocused: isDayFocused,
    onDayChange: onDayChange,
    isDaySelected: isDaySelected,
    isDayActive: isDayActive,
    isDaySelectionEnd: isDaySelectionEnd,
    isDaySelectionStart: isDaySelectionStart,
    isDayHinted: isDayHinted,
    onDayEnter: onDayEnter,
    onDayLeave: onDayLeave,
    isHintedDaySelectionEnd: isHintedDaySelectionEnd,
    isHintedDaySelectionStart: isHintedDaySelectionStart,
    isDayDisabled: isDayDisabled,
    listenDayChangesForUpdate: listenDayChangesForUpdate,
    "aria-label": changeDayAriaLabel
  })), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarRange__inner"
  }, /*#__PURE__*/React.createElement(_CalendarHeader.CalendarHeader, {
    viewDate: secondViewDate,
    onChange: setViewDate,
    prevMonth: false,
    onNextMonth: setNextMonth,
    disablePickers: disablePickers,
    className: "vkuiCalendarRange__header",
    prevMonthAriaLabel: prevMonthAriaLabel,
    nextMonthAriaLabel: nextMonthAriaLabel,
    changeMonthAriaLabel: changeMonthAriaLabel,
    changeYearAriaLabel: changeYearAriaLabel,
    nextMonthIcon: nextMonthIcon
  }), /*#__PURE__*/React.createElement(_CalendarDays.CalendarDays, {
    viewDate: secondViewDate,
    value: value,
    weekStartsOn: weekStartsOn,
    "aria-label": changeDayAriaLabel,
    onKeyDown: handleKeyDown,
    isDayFocused: isDayFocused,
    onDayChange: onDayChange,
    isDaySelected: isDaySelected,
    isDayActive: isDayActive,
    isDaySelectionEnd: isDaySelectionEnd,
    isDaySelectionStart: isDaySelectionStart,
    isDayHinted: isDayHinted,
    onDayEnter: onDayEnter,
    onDayLeave: onDayLeave,
    isHintedDaySelectionEnd: isHintedDaySelectionEnd,
    isHintedDaySelectionStart: isHintedDaySelectionStart,
    isDayDisabled: isDayDisabled,
    listenDayChangesForUpdate: listenDayChangesForUpdate,
    tabIndex: 0,
    onBlur: resetSelectedDay
  })));
};
exports.CalendarRange = CalendarRange;
//# sourceMappingURL=CalendarRange.js.map