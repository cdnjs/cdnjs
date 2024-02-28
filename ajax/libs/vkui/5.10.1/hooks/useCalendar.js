import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { isDayMinMaxRestricted } from "../lib/calendar";
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, startOfDay, subMonths } from "../lib/date";
export function useCalendar(param) {
    var value = param.value, disablePast = param.disablePast, disableFuture = param.disableFuture, shouldDisableDate = param.shouldDisableDate, onHeaderChange = param.onHeaderChange, onNextMonth = param.onNextMonth, onPrevMonth = param.onPrevMonth, minDateTime = param.minDateTime, maxDateTime = param.maxDateTime;
    var _ref;
    var _React_useState = _sliced_to_array(React.useState((_ref = Array.isArray(value) ? value[0] : value) !== null && _ref !== void 0 ? _ref : new Date()), 2), viewDate = _React_useState[0], setViewDate = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(), 2), focusedDay = _React_useState1[0], setFocusedDay = _React_useState1[1];
    var setPrevMonth = React.useCallback(function() {
        onPrevMonth === null || onPrevMonth === void 0 ? void 0 : onPrevMonth();
        setViewDate(subMonths(viewDate, 1));
    }, [
        viewDate,
        onPrevMonth
    ]);
    var setNextMonth = React.useCallback(function() {
        onNextMonth === null || onNextMonth === void 0 ? void 0 : onNextMonth();
        setViewDate(addMonths(viewDate, 1));
    }, [
        viewDate,
        onNextMonth
    ]);
    var handleSetViewDate = React.useCallback(function(value) {
        onHeaderChange === null || onHeaderChange === void 0 ? void 0 : onHeaderChange(value);
        setViewDate(value);
    }, [
        onHeaderChange
    ]);
    var isDayFocused = React.useCallback(function(day) {
        return Boolean(focusedDay && isSameDay(day, focusedDay));
    }, [
        focusedDay
    ]);
    var isDayDisabled = React.useCallback(function(day, withTime) {
        var now = new Date();
        if (shouldDisableDate) {
            return shouldDisableDate(day);
        }
        if (disableFuture) {
            return isAfter(startOfDay(day), now);
        }
        if (disablePast) {
            return isBefore(endOfDay(day), now);
        }
        if (minDateTime || maxDateTime) {
            return isDayMinMaxRestricted(day, {
                min: minDateTime,
                max: maxDateTime,
                withTime: withTime
            });
        }
        return false;
    }, [
        disableFuture,
        disablePast,
        shouldDisableDate,
        minDateTime,
        maxDateTime
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