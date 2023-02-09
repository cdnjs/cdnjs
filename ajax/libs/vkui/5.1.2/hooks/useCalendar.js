import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import { subMonths, addMonths, isSameDay, isBefore, endOfDay, isAfter, startOfDay } from '../lib/date';
export function useCalendar(_ref) {
  var _ref2;
  var value = _ref.value,
    disablePast = _ref.disablePast,
    disableFuture = _ref.disableFuture,
    shouldDisableDate = _ref.shouldDisableDate,
    onHeaderChange = _ref.onHeaderChange,
    onNextMonth = _ref.onNextMonth,
    onPrevMonth = _ref.onPrevMonth;
  var _React$useState = React.useState((_ref2 = Array.isArray(value) ? value[0] : value) !== null && _ref2 !== void 0 ? _ref2 : new Date()),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    viewDate = _React$useState2[0],
    setViewDate = _React$useState2[1];
  var _React$useState3 = React.useState(),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedDay = _React$useState4[0],
    setFocusedDay = _React$useState4[1];
  var setPrevMonth = React.useCallback(function () {
    onPrevMonth === null || onPrevMonth === void 0 ? void 0 : onPrevMonth();
    setViewDate(subMonths(viewDate, 1));
  }, [viewDate, onPrevMonth]);
  var setNextMonth = React.useCallback(function () {
    onNextMonth === null || onNextMonth === void 0 ? void 0 : onNextMonth();
    setViewDate(addMonths(viewDate, 1));
  }, [viewDate, onNextMonth]);
  var handleSetViewDate = React.useCallback(function (value) {
    onHeaderChange === null || onHeaderChange === void 0 ? void 0 : onHeaderChange(value);
    setViewDate(value);
  }, [onHeaderChange]);
  var isDayFocused = React.useCallback(function (day) {
    return Boolean(focusedDay && isSameDay(day, focusedDay));
  }, [focusedDay]);
  var isDayDisabled = React.useCallback(function (day) {
    var now = new Date();
    var disabled = false;
    if (disablePast) {
      disabled = isBefore(endOfDay(day), now);
    }
    if (disableFuture) {
      disabled = isAfter(startOfDay(day), now);
    }
    if (shouldDisableDate) {
      disabled = shouldDisableDate(day);
    }
    return disabled;
  }, [disableFuture, disablePast, shouldDisableDate]);
  var resetSelectedDay = React.useCallback(function () {
    setFocusedDay(undefined);
  }, [setFocusedDay]);
  return {
    viewDate: viewDate,
    setViewDate: handleSetViewDate,
    setPrevMonth: setPrevMonth,
    setNextMonth: setNextMonth,
    focusedDay: focusedDay,
    setFocusedDay: setFocusedDay,
    isDayFocused: isDayFocused,
    isDayDisabled: isDayDisabled,
    resetSelectedDay: resetSelectedDay
  };
}
//# sourceMappingURL=useCalendar.js.map