import * as React from 'react';
import { isDayMinMaxRestricted } from '../lib/calendar';
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, startOfDay, subMonths } from '../lib/date';
export function useCalendar({ value, disablePast, disableFuture, shouldDisableDate, onHeaderChange, onNextMonth, onPrevMonth, minDateTime, maxDateTime }) {
    const [viewDate, setViewDate] = React.useState((Array.isArray(value) ? value[0] : value) ?? new Date());
    const [focusedDay, setFocusedDay] = React.useState();
    const setPrevMonth = React.useCallback(()=>{
        onPrevMonth?.();
        setViewDate(subMonths(viewDate, 1));
    }, [
        viewDate,
        onPrevMonth
    ]);
    const setNextMonth = React.useCallback(()=>{
        onNextMonth?.();
        setViewDate(addMonths(viewDate, 1));
    }, [
        viewDate,
        onNextMonth
    ]);
    const handleSetViewDate = React.useCallback((value)=>{
        onHeaderChange?.(value);
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