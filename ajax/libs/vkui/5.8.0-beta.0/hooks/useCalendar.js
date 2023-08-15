import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, startOfDay, subMonths } from "../lib/date";
export function useCalendar(param) {
    var value = param.value, disablePast = param.disablePast, disableFuture = param.disableFuture, shouldDisableDate = param.shouldDisableDate, onHeaderChange = param.onHeaderChange, onNextMonth = param.onNextMonth, onPrevMonth = param.onPrevMonth;
    var _ref;
    var _React_useState = _sliced_to_array(React.useState((_ref = Array.isArray(value) ? value[0] : value) !== null && _ref !== void 0 ? _ref : new Date()), 2), viewDate = _React_useState[0], setViewDate = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(), 2), focusedDay = _React_useState1[0], setFocusedDay = _React_useState1[1];
    var setPrevMonth = React.useCallback(function() {
        var _onPrevMonth;
        (_onPrevMonth = onPrevMonth) === null || _onPrevMonth === void 0 ? void 0 : _onPrevMonth();
        setViewDate(subMonths(viewDate, 1));
    }, [
        viewDate,
        onPrevMonth
    ]);
    var setNextMonth = React.useCallback(function() {
        var _onNextMonth;
        (_onNextMonth = onNextMonth) === null || _onNextMonth === void 0 ? void 0 : _onNextMonth();
        setViewDate(addMonths(viewDate, 1));
    }, [
        viewDate,
        onNextMonth
    ]);
    var handleSetViewDate = React.useCallback(function(value) {
        var _onHeaderChange;
        (_onHeaderChange = onHeaderChange) === null || _onHeaderChange === void 0 ? void 0 : _onHeaderChange(value);
        setViewDate(value);
    }, [
        onHeaderChange
    ]);
    var isDayFocused = React.useCallback(function(day) {
        return Boolean(focusedDay && isSameDay(day, focusedDay));
    }, [
        focusedDay
    ]);
    var isDayDisabled = React.useCallback(function(day) {
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
    }, [
        disableFuture,
        disablePast,
        shouldDisableDate
    ]);
    var resetSelectedDay = React.useCallback(function() {
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