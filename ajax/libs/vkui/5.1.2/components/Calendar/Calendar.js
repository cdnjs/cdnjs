import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "onChange", "disablePast", "disableFuture", "shouldDisableDate", "onClose", "enableTime", "doneButtonText", "weekStartsOn", "getRootRef", "disablePickers", "changeHoursAriaLabel", "changeMinutesAriaLabel", "prevMonthAriaLabel", "nextMonthAriaLabel", "changeMonthAriaLabel", "changeYearAriaLabel", "showNeighboringMonth", "changeDayAriaLabel", "size", "viewDate", "onHeaderChange", "onNextMonth", "onPrevMonth", "prevMonthIcon", "nextMonthIcon", "prevMonthProps", "nextMonthProps", "dayProps", "className", "listenDayChangesForUpdate"];
import * as React from 'react';
import { isSameMonth, isSameDay } from '../../lib/date';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { CalendarDays } from '../CalendarDays/CalendarDays';
import { CalendarTime } from '../CalendarTime/CalendarTime';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { navigateDate, setTimeEqual, isFirstDay, isLastDay } from '../../lib/calendar';
import { useCalendar } from '../../hooks/useCalendar';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../lib/warnOnce';
var warn = warnOnce('Calendar');

/**
 * @see https://vkcom.github.io/VKUI/#/Calendar
 */
export var Calendar = function Calendar(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    disablePast = _ref.disablePast,
    disableFuture = _ref.disableFuture,
    shouldDisableDate = _ref.shouldDisableDate,
    onClose = _ref.onClose,
    _ref$enableTime = _ref.enableTime,
    enableTime = _ref$enableTime === void 0 ? false : _ref$enableTime,
    doneButtonText = _ref.doneButtonText,
    _ref$weekStartsOn = _ref.weekStartsOn,
    weekStartsOn = _ref$weekStartsOn === void 0 ? 1 : _ref$weekStartsOn,
    getRootRef = _ref.getRootRef,
    disablePickers = _ref.disablePickers,
    changeHoursAriaLabel = _ref.changeHoursAriaLabel,
    changeMinutesAriaLabel = _ref.changeMinutesAriaLabel,
    prevMonthAriaLabel = _ref.prevMonthAriaLabel,
    nextMonthAriaLabel = _ref.nextMonthAriaLabel,
    changeMonthAriaLabel = _ref.changeMonthAriaLabel,
    changeYearAriaLabel = _ref.changeYearAriaLabel,
    showNeighboringMonth = _ref.showNeighboringMonth,
    _ref$changeDayAriaLab = _ref.changeDayAriaLabel,
    changeDayAriaLabel = _ref$changeDayAriaLab === void 0 ? 'Изменить день' : _ref$changeDayAriaLab,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'm' : _ref$size,
    externalViewDate = _ref.viewDate,
    onHeaderChange = _ref.onHeaderChange,
    onNextMonth = _ref.onNextMonth,
    onPrevMonth = _ref.onPrevMonth,
    prevMonthIcon = _ref.prevMonthIcon,
    nextMonthIcon = _ref.nextMonthIcon,
    prevMonthProps = _ref.prevMonthProps,
    nextMonthProps = _ref.nextMonthProps,
    dayProps = _ref.dayProps,
    className = _ref.className,
    listenDayChangesForUpdate = _ref.listenDayChangesForUpdate,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useCalendar = useCalendar({
      value: value,
      disableFuture: disableFuture,
      disablePast: disablePast,
      shouldDisableDate: shouldDisableDate,
      onHeaderChange: onHeaderChange,
      onNextMonth: onNextMonth,
      onPrevMonth: onPrevMonth
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
  useIsomorphicLayoutEffect(function () {
    if (value) {
      setViewDate(value);
    }
  }, [value]);
  if (process.env.NODE_ENV === 'development' && !disablePickers && size === 's') {
    warn("Нельзя включить селекты выбора месяца/года, если размер календаря 's'", 'error');
  }
  if (process.env.NODE_ENV === 'development' && enableTime && size === 's') {
    warn("Нельзя включить выбор времени, если размер календаря 's'", 'error');
  }
  var handleKeyDown = React.useCallback(function (event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
    var newFocusedDay = navigateDate(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value, event.key);
    if (newFocusedDay && !isSameMonth(newFocusedDay, viewDate)) {
      setViewDate(newFocusedDay);
    }
    setFocusedDay(newFocusedDay);
  }, [focusedDay, setFocusedDay, setViewDate, value, viewDate]);
  var onDayChange = React.useCallback(function (date) {
    onChange === null || onChange === void 0 ? void 0 : onChange(setTimeEqual(date, value));
  }, [value, onChange]);
  var isDayActive = React.useCallback(function (day) {
    return Boolean(value && isSameDay(day, value));
  }, [value]);
  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    ref: getRootRef,
    className: classNames("vkuiCalendar", styles["Calendar--size-".concat(size)], className)
  }), /*#__PURE__*/React.createElement(CalendarHeader, {
    viewDate: externalViewDate || viewDate,
    onChange: setViewDate,
    onNextMonth: setNextMonth,
    onPrevMonth: setPrevMonth,
    disablePickers: disablePickers || size === 's',
    className: "vkuiCalendar__header",
    prevMonthAriaLabel: prevMonthAriaLabel,
    nextMonthAriaLabel: nextMonthAriaLabel,
    changeMonthAriaLabel: changeMonthAriaLabel,
    changeYearAriaLabel: changeYearAriaLabel,
    prevMonthIcon: prevMonthIcon,
    nextMonthIcon: nextMonthIcon,
    prevMonthProps: prevMonthProps,
    nextMonthProps: nextMonthProps
  }), /*#__PURE__*/React.createElement(CalendarDays, {
    viewDate: externalViewDate || viewDate,
    value: value,
    weekStartsOn: weekStartsOn,
    isDayFocused: isDayFocused,
    tabIndex: 0,
    "aria-label": changeDayAriaLabel,
    onKeyDown: handleKeyDown,
    onDayChange: onDayChange,
    isDayActive: isDayActive,
    isDaySelectionStart: isFirstDay,
    isDaySelectionEnd: isLastDay,
    isDayDisabled: isDayDisabled,
    onBlur: resetSelectedDay,
    showNeighboringMonth: showNeighboringMonth,
    size: size,
    dayProps: dayProps,
    listenDayChangesForUpdate: listenDayChangesForUpdate
  }), enableTime && value && size !== 's' && /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendar__time"
  }, /*#__PURE__*/React.createElement(CalendarTime, {
    value: value,
    onChange: onChange,
    onClose: onClose,
    doneButtonText: doneButtonText,
    changeHoursAriaLabel: changeHoursAriaLabel,
    changeMinutesAriaLabel: changeMinutesAriaLabel
  })));
};
var styles = {
  "Calendar--size-s": "vkuiCalendar--size-s",
  "Calendar--size-m": "vkuiCalendar--size-m"
};
//# sourceMappingURL=Calendar.js.map