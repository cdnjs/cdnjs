"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalendar = useCalendar;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

function useCalendar(_ref) {
  var _ref2;

  var value = _ref.value,
      disablePast = _ref.disablePast,
      disableFuture = _ref.disableFuture,
      shouldDisableDate = _ref.shouldDisableDate;

  var _React$useState = React.useState((_ref2 = Array.isArray(value) ? value[0] : value) !== null && _ref2 !== void 0 ? _ref2 : new Date()),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      viewDate = _React$useState2[0],
      setViewDate = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      focusedDay = _React$useState4[0],
      setFocusedDay = _React$useState4[1];

  var setPrevMonth = React.useCallback(function () {
    return setViewDate((0, _dateFns.subMonths)(viewDate, 1));
  }, [viewDate]);
  var setNextMonth = React.useCallback(function () {
    return setViewDate((0, _dateFns.addMonths)(viewDate, 1));
  }, [viewDate]);
  var isDayFocused = React.useCallback(function (day) {
    return Boolean(focusedDay && (0, _dateFns.isSameDay)(day, focusedDay));
  }, [focusedDay]);
  var isDayDisabled = React.useCallback(function (day) {
    var now = new Date();
    var disabled = false;

    if (disablePast) {
      disabled = (0, _dateFns.isBefore)((0, _dateFns.endOfDay)(day), now);
    }

    if (disableFuture) {
      disabled = (0, _dateFns.isAfter)((0, _dateFns.startOfDay)(day), now);
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
    setViewDate: setViewDate,
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