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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _calendar = require("../lib/calendar");
const _date = require("../lib/date");
function useCalendar({ value, disablePast, disableFuture, shouldDisableDate, onHeaderChange, onNextMonth, onPrevMonth, minDateTime, maxDateTime }) {
    var _ref;
    const [viewDate, setViewDate] = _react.useState((_ref = Array.isArray(value) ? value[0] : value) !== null && _ref !== void 0 ? _ref : new Date());
    const [focusedDay, setFocusedDay] = _react.useState();
    const setPrevMonth = _react.useCallback(()=>{
        onPrevMonth === null || onPrevMonth === void 0 ? void 0 : onPrevMonth();
        setViewDate((0, _date.subMonths)(viewDate, 1));
    }, [
        viewDate,
        onPrevMonth
    ]);
    const setNextMonth = _react.useCallback(()=>{
        onNextMonth === null || onNextMonth === void 0 ? void 0 : onNextMonth();
        setViewDate((0, _date.addMonths)(viewDate, 1));
    }, [
        viewDate,
        onNextMonth
    ]);
    const handleSetViewDate = _react.useCallback((value)=>{
        onHeaderChange === null || onHeaderChange === void 0 ? void 0 : onHeaderChange(value);
        setViewDate(value);
    }, [
        onHeaderChange
    ]);
    const isDayFocused = _react.useCallback((day)=>Boolean(focusedDay && (0, _date.isSameDay)(day, focusedDay)), [
        focusedDay
    ]);
    const isDayDisabled = _react.useCallback((day, withTime)=>{
        const now = new Date();
        if (shouldDisableDate) {
            return shouldDisableDate(day);
        }
        if (disableFuture) {
            return (0, _date.isAfter)((0, _date.startOfDay)(day), now);
        }
        if (disablePast) {
            return (0, _date.isBefore)((0, _date.endOfDay)(day), now);
        }
        if (minDateTime || maxDateTime) {
            return (0, _calendar.isDayMinMaxRestricted)(day, {
                min: minDateTime,
                max: maxDateTime,
                withTime
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
    const resetSelectedDay = _react.useCallback(()=>{
        setFocusedDay(undefined);
    }, [
        setFocusedDay
    ]);
    return {
        viewDate,
        setViewDate: handleSetViewDate,
        setPrevMonth,
        setNextMonth,
        focusedDay,
        setFocusedDay,
        isDayFocused,
        isDayDisabled,
        resetSelectedDay
    };
}

//# sourceMappingURL=useCalendar.js.map