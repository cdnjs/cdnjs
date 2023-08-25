import * as React from 'react';
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, startOfDay, subMonths } from '../lib/date';
export function useCalendar({ value, disablePast, disableFuture, shouldDisableDate, onHeaderChange, onNextMonth, onPrevMonth }) {
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
    const isDayDisabled = React.useCallback((day)=>{
        const now = new Date();
        let disabled = false;
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