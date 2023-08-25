"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useCalendar", {
    enumerable: true,
    get: function() {
        return useCalendar;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _date = require("../lib/date");
function useCalendar(param) {
    var value = param.value, disablePast = param.disablePast, disableFuture = param.disableFuture, shouldDisableDate = param.shouldDisableDate, onHeaderChange = param.onHeaderChange, onNextMonth = param.onNextMonth, onPrevMonth = param.onPrevMonth;
    var _ref;
    var _React_useState = _sliced_to_array._(_react.useState((_ref = Array.isArray(value) ? value[0] : value) !== null && _ref !== void 0 ? _ref : new Date()), 2), viewDate = _React_useState[0], setViewDate = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(), 2), focusedDay = _React_useState1[0], setFocusedDay = _React_useState1[1];
    var setPrevMonth = _react.useCallback(function() {
        var _onPrevMonth;
        (_onPrevMonth = onPrevMonth) === null || _onPrevMonth === void 0 ? void 0 : _onPrevMonth();
        setViewDate((0, _date.subMonths)(viewDate, 1));
    }, [
        viewDate,
        onPrevMonth
    ]);
    var setNextMonth = _react.useCallback(function() {
        var _onNextMonth;
        (_onNextMonth = onNextMonth) === null || _onNextMonth === void 0 ? void 0 : _onNextMonth();
        setViewDate((0, _date.addMonths)(viewDate, 1));
    }, [
        viewDate,
        onNextMonth
    ]);
    var handleSetViewDate = _react.useCallback(function(value) {
        var _onHeaderChange;
        (_onHeaderChange = onHeaderChange) === null || _onHeaderChange === void 0 ? void 0 : _onHeaderChange(value);
        setViewDate(value);
    }, [
        onHeaderChange
    ]);
    var isDayFocused = _react.useCallback(function(day) {
        return Boolean(focusedDay && (0, _date.isSameDay)(day, focusedDay));
    }, [
        focusedDay
    ]);
    var isDayDisabled = _react.useCallback(function(day) {
        var now = new Date();
        var disabled = false;
        if (disablePast) {
            disabled = (0, _date.isBefore)((0, _date.endOfDay)(day), now);
        }
        if (disableFuture) {
            disabled = (0, _date.isAfter)((0, _date.startOfDay)(day), now);
        }
        if (shouldDisableDate) {
            disabled = shouldDisableDate(day);
        }
        return disabled;
    }, [
        disableFuture,
        disablePast,
        shouldDisableDate
    ]);
    var resetSelectedDay = _react.useCallback(function() {
        setFocusedDay(undefined);
    }, [
        setFocusedDay
    ]);
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