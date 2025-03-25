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
const _datefns = require("date-fns");
const _calendar = require("../lib/calendar");
function useCalendar({ value, disablePast, disableFuture, shouldDisableDate, onHeaderChange, onNextMonth, onPrevMonth, minDateTime, maxDateTime }) {
    var _ref;
    const [viewDate, setViewDate] = _react.useState((_ref = Array.isArray(value) ? value[0] : value) !== null && _ref !== void 0 ? _ref : new Date());
    const [focusedDay, setFocusedDay] = _react.useState();
    const setPrevMonth = _react.useCallback(()=>{
        onPrevMonth === null || onPrevMonth === void 0 ? void 0 : onPrevMonth();
        setViewDate((0, _datefns.subMonths)(viewDate, 1));
    }, [
        viewDate,
        onPrevMonth
    ]);
    const setNextMonth = _react.useCallback(()=>{
        onNextMonth === null || onNextMonth === void 0 ? void 0 : onNextMonth();
        setViewDate((0, _datefns.addMonths)(viewDate, 1));
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
    const isDayFocused = _react.useCallback((day)=>Boolean(focusedDay && (0, _datefns.isSameDay)(day, focusedDay)), [
        focusedDay
    ]);
    const isDayDisabled = _react.useCallback((day, withTime)=>{
        const now = new Date();
        if (shouldDisableDate) {
            return shouldDisableDate(day);
        }
        if (disableFuture) {
            return (0, _datefns.isAfter)((0, _datefns.startOfDay)(day), now);
        }
        if (disablePast) {
            return (0, _datefns.isBefore)((0, _datefns.endOfDay)(day), now);
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
    const isMonthDisabled = _react.useCallback((month, year)=>{
        const now = new Date();
        year = year || viewDate.getFullYear();
        const minMonth = minDateTime ? minDateTime.getMonth() : 0;
        const maxMonth = maxDateTime ? maxDateTime.getMonth() : 11;
        const minYear = (minDateTime === null || minDateTime === void 0 ? void 0 : minDateTime.getFullYear()) || _calendar.DEFAULT_MIN_YEAR;
        const maxYear = (maxDateTime === null || maxDateTime === void 0 ? void 0 : maxDateTime.getFullYear()) || _calendar.DEFAULT_MAX_YEAR;
        let isDisabled = year >= minYear && year <= maxYear ? year === minYear && minMonth > month || year === maxYear && month > maxMonth : true;
        if (disableFuture) {
            isDisabled = isDisabled || (year === now.getFullYear() ? month > now.getMonth() : year > now.getFullYear());
        }
        if (disablePast) {
            isDisabled = isDisabled || (year === now.getFullYear() ? month < now.getMonth() : year < now.getFullYear());
        }
        return isDisabled;
    }, [
        disableFuture,
        disablePast,
        viewDate,
        minDateTime,
        maxDateTime
    ]);
    const isYearDisabled = _react.useCallback((year)=>{
        const now = new Date();
        const minYear = (minDateTime === null || minDateTime === void 0 ? void 0 : minDateTime.getFullYear()) || _calendar.DEFAULT_MIN_YEAR;
        const maxYear = (maxDateTime === null || maxDateTime === void 0 ? void 0 : maxDateTime.getFullYear()) || _calendar.DEFAULT_MAX_YEAR;
        let isDisabled = minYear > year || year > maxYear;
        if (disableFuture) {
            isDisabled = isDisabled || year > now.getFullYear();
        }
        if (disablePast) {
            isDisabled = isDisabled || year < now.getFullYear();
        }
        return isDisabled;
    }, [
        disableFuture,
        disablePast,
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
        resetSelectedDay,
        isMonthDisabled,
        isYearDisabled
    };
}

//# sourceMappingURL=useCalendar.js.map