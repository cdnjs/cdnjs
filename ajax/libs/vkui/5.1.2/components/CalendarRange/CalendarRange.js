import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "onChange", "disablePast", "disableFuture", "shouldDisableDate", "onClose", "weekStartsOn", "getRootRef", "disablePickers", "prevMonthAriaLabel", "nextMonthAriaLabel", "changeMonthAriaLabel", "changeYearAriaLabel", "changeDayAriaLabel", "prevMonthIcon", "nextMonthIcon", "className", "listenDayChangesForUpdate"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { addMonths, isSameMonth, isSameDay, isBefore, isAfter, startOfDay, endOfDay, isWithinInterval } from '../../lib/date';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { CalendarDays } from '../CalendarDays/CalendarDays';
import { navigateDate, setTimeEqual, isLastDay, isFirstDay } from '../../lib/calendar';
import { useCalendar } from '../../hooks/useCalendar';
var getIsDaySelected = function getIsDaySelected(day, value) {
  if (!(value !== null && value !== void 0 && value[0]) || !value[1]) {
    return false;
  }
  return Boolean(isWithinInterval(day, startOfDay(value[0]), endOfDay(value[1])));
};

/**
 * @see https://vkcom.github.io/VKUI/#/CalendarRange
 */
export var CalendarRange = function CalendarRange(_ref) {
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
    props = _objectWithoutProperties(_ref, _excluded);
  var _useCalendar = useCalendar({
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
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hintedDate = _React$useState2[0],
    setHintedDate = _React$useState2[1];
  var secondViewDate = addMonths(viewDate, 1);
  var handleKeyDown = React.useCallback(function (event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
    var newFocusedDay = navigateDate(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value === null || value === void 0 ? void 0 : value[1], event.key);
    if (newFocusedDay && !isSameMonth(newFocusedDay, viewDate) && !isSameMonth(newFocusedDay, addMonths(viewDate, 1))) {
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
    if (start && isSameDay(date, start) || end && isSameDay(date, end)) {
      return [setTimeEqual(date, start), setTimeEqual(date, end)];
    } else if (start && isBefore(date, start)) {
      return [setTimeEqual(date, start), end];
    } else if (start && isAfter(date, start)) {
      return [start, setTimeEqual(date, end)];
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
    return Boolean((value === null || value === void 0 ? void 0 : value[0]) && isSameDay(day, value[0]) || (value === null || value === void 0 ? void 0 : value[1]) && isSameDay(day, value[1]));
  }, [value]);
  var isDaySelectionEnd = React.useCallback(function (day, dayOfWeek) {
    return Boolean(isLastDay(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[1]) && isSameDay(day, value[1]));
  }, [value]);
  var isHintedDaySelectionEnd = React.useCallback(function (day, dayOfWeek) {
    return Boolean(isLastDay(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[1]) && isSameDay(day, hintedDate[1]));
  }, [hintedDate]);
  var isDaySelectionStart = React.useCallback(function (day, dayOfWeek) {
    return Boolean(isFirstDay(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[0]) && isSameDay(day, value[0]));
  }, [value]);
  var isHintedDaySelectionStart = React.useCallback(function (day, dayOfWeek) {
    return Boolean(isFirstDay(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[0]) && isSameDay(day, hintedDate[0]));
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
  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    ref: getRootRef,
    className: classNames("vkuiCalendarRange", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarRange__inner"
  }, /*#__PURE__*/React.createElement(CalendarHeader, {
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
  }), /*#__PURE__*/React.createElement(CalendarDays, {
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
  }, /*#__PURE__*/React.createElement(CalendarHeader, {
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
  }), /*#__PURE__*/React.createElement(CalendarDays, {
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
//# sourceMappingURL=CalendarRange.js.map