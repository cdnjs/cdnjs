import * as React from 'react';
import { isDayMinMaxRestricted } from '../lib/calendar';
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, startOfDay, subMonths } from '../lib/date';
export function useCalendar({ value, disablePast, disableFuture, shouldDisableDate, onHeaderChange, onNextMonth, onPrevMonth, minDateTime, maxDateTime }) {
    var _ref;
    const [viewDate, setViewDate] = React.useState((_ref = Array.isArray(value) ? value[0] : value) !== null && _ref !== void 0 ? _ref : new Date());
    const [focusedDay, setFocusedDay] = React.useState();
    const setPrevMonth = React.useCallback(()=>{
        onPrevMonth === null || onPrevMonth === void 0 ? void 0 : onPrevMonth();
        setViewDate(subMonths(viewDate, 1));
    }, [
        viewDate,
        onPrevMonth
    ]);
    const setNextMonth = React.useCallback(()=>{
        onNextMonth === null || onNextMonth === void 0 ? void 0 : onNextMonth();
        setViewDate(addMonths(viewDate, 1));
    }, [
        viewDate,
        onNextMonth
    ]);
    const handleSetViewDate = React.useCallback((value)=>{
        onHeaderChange === null || onHeaderChange === void 0 ? void 0 : onHeaderChange(value);
        setViewDate(value);
    }, [
        onHeaderChange
    ]);
    const isDayFocused = React.useCallback((day)=>Boolean(focusedDay && isSameDay(day, focusedDay)), [
        focusedDay
    ]);
    const isDayDisabled = React.useCallback((day, withTime)=>{
        const now = new Date();
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
    const resetSelectedDay = React.useCallback(()=>{
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