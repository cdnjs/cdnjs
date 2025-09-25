import * as React from "react";
import { isSameDate } from "@vkontakte/vkjs";
import { DEFAULT_MAX_YEAR, DEFAULT_MIN_YEAR, isDayMinMaxRestricted } from "../lib/calendar.js";
import { addMonths, endOfDay, startOfDay, subMonths } from "../lib/date.js";
export function useCalendar({ value, disablePast, disableFuture, shouldDisableDate, onHeaderChange, onNextMonth, onPrevMonth, minDateTime, maxDateTime }) {
    const [viewDate, setViewDate] = React.useState((Array.isArray(value) ? value[0] : value) ?? new Date());
    // соответствует дню, на котором сейчас есть фокус
    // меняется при переключении дней с помощью стрелок
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
    const isDayFocused = React.useCallback((day)=>Boolean(focusedDay && isSameDate(day, focusedDay)), [
        focusedDay
    ]);
    const isDayDisabled = React.useCallback((day, withTime)=>{
        const now = new Date();
        if (shouldDisableDate) {
            return shouldDisableDate(day);
        }
        if (disableFuture) {
            return startOfDay(day) > now;
        }
        if (disablePast) {
            return endOfDay(day) < now;
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
    const isMonthDisabled = React.useCallback((month, year)=>{
        const now = new Date();
        year = year || viewDate.getFullYear();
        const minMonth = minDateTime ? minDateTime.getMonth() : 0;
        const maxMonth = maxDateTime ? maxDateTime.getMonth() : 11;
        const minYear = minDateTime?.getFullYear() || DEFAULT_MIN_YEAR;
        const maxYear = maxDateTime?.getFullYear() || DEFAULT_MAX_YEAR;
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
    const isYearDisabled = React.useCallback((year)=>{
        const now = new Date();
        const minYear = minDateTime?.getFullYear() || DEFAULT_MIN_YEAR;
        const maxYear = maxDateTime?.getFullYear() || DEFAULT_MAX_YEAR;
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
    return {
        viewDate,
        setViewDate: handleSetViewDate,
        setPrevMonth,
        setNextMonth,
        focusedDay,
        setFocusedDay,
        isDayFocused,
        isDayDisabled,
        isMonthDisabled,
        isYearDisabled
    };
}

//# sourceMappingURL=useCalendar.js.map