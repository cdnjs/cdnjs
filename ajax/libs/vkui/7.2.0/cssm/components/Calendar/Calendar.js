'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { isSameDay, isSameMonth } from "date-fns";
import { useCalendar } from "../../hooks/useCalendar.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { clamp, isFirstDay, isLastDay, navigateDate, setTimeEqual } from "../../lib/calendar.js";
import { convertDateFromTimeZone, convertDateToTimeZone } from "../../lib/date.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { CalendarDays } from "../CalendarDays/CalendarDays.js";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader.js";
import { CalendarTime } from "../CalendarTime/CalendarTime.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Calendar.module.css";
const warn = warnOnce('Calendar');
/**
 * @see https://vkcom.github.io/VKUI/#/Calendar
 */ export const Calendar = ({ getRootRef, value: valueProp, defaultValue, onChange, disablePast, disableFuture, shouldDisableDate, onDoneButtonClick, enableTime = false, doneButtonText, doneButtonDisabled, doneButtonShow, DoneButton, weekStartsOn = 1, disablePickers, changeHoursLabel = 'Изменить час', changeMinutesLabel = 'Изменить минуту', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', showNeighboringMonth, changeDayLabel = 'Изменить день', size = 'm', viewDate: externalViewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, prevMonthProps, nextMonthProps, dayProps, listenDayChangesForUpdate, renderDayContent, minDateTime, maxDateTime, timezone, minutesTestId, hoursTestId, doneButtonTestId, prevMonthButtonTestId, nextMonthButtonTestId, monthDropdownTestId, yearDropdownTestId, dayTestId, ...props })=>{
    const _onChange = React.useCallback((date)=>{
        onChange?.(convertDateFromTimeZone(date, timezone) || undefined);
    }, [
        onChange,
        timezone
    ]);
    const [value, updateValue] = useCustomEnsuredControl({
        value: valueProp,
        defaultValue,
        onChange: _onChange
    });
    const timeZonedValue = React.useMemo(()=>convertDateToTimeZone(value, timezone) || undefined, [
        timezone,
        value
    ]);
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, resetSelectedDay, isMonthDisabled, isYearDisabled } = useCalendar({
        value: timeZonedValue,
        disableFuture,
        disablePast,
        shouldDisableDate,
        onHeaderChange,
        onNextMonth,
        onPrevMonth,
        minDateTime,
        maxDateTime
    });
    useIsomorphicLayoutEffect(()=>{
        if (timeZonedValue) {
            setViewDate(timeZonedValue);
        }
    }, [
        timeZonedValue
    ]);
    if (process.env.NODE_ENV === 'development' && !disablePickers && size === 's') {
        warn("Нельзя включить селекты выбора месяца/года, если размер календаря 's'", 'error');
    }
    if (process.env.NODE_ENV === 'development' && enableTime && size === 's') {
        warn("Нельзя включить выбор времени, если размер календаря 's'", 'error');
    }
    const handleKeyDown = React.useCallback((event)=>{
        if ([
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ].includes(event.key)) {
            event.preventDefault();
        }
        const newFocusedDay = navigateDate(focusedDay ?? timeZonedValue, event.key);
        if (newFocusedDay && !isSameMonth(newFocusedDay, viewDate)) {
            setViewDate(newFocusedDay);
        }
        setFocusedDay(newFocusedDay);
    }, [
        focusedDay,
        setFocusedDay,
        setViewDate,
        timeZonedValue,
        viewDate
    ]);
    const onDayChange = React.useCallback((date)=>{
        let actualDate = setTimeEqual(date, timeZonedValue);
        if (minDateTime || maxDateTime) {
            actualDate = clamp(actualDate, {
                min: minDateTime,
                max: maxDateTime
            });
        }
        updateValue(actualDate);
    }, [
        timeZonedValue,
        updateValue,
        maxDateTime,
        minDateTime
    ]);
    const isDayActive = React.useCallback((day)=>Boolean(timeZonedValue && isSameDay(day, timeZonedValue)), [
        timeZonedValue
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...props,
        baseClassName: classNames(styles.host, size === 's' && styles.sizeS),
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(CalendarHeader, {
                viewDate: externalViewDate || viewDate,
                onChange: setViewDate,
                onNextMonth: setNextMonth,
                onPrevMonth: setPrevMonth,
                disablePickers: disablePickers || size === 's',
                className: styles.header,
                prevMonthLabel: prevMonthLabel,
                nextMonthLabel: nextMonthLabel,
                changeMonthLabel: changeMonthLabel,
                changeYearLabel: changeYearLabel,
                prevMonthIcon: prevMonthIcon,
                nextMonthIcon: nextMonthIcon,
                prevMonthProps: prevMonthProps,
                nextMonthProps: nextMonthProps,
                isMonthDisabled: isMonthDisabled,
                isYearDisabled: isYearDisabled,
                nextMonthButtonTestId: nextMonthButtonTestId,
                prevMonthButtonTestId: prevMonthButtonTestId,
                monthDropdownTestId: monthDropdownTestId,
                yearDropdownTestId: yearDropdownTestId
            }),
            /*#__PURE__*/ _jsx(CalendarDays, {
                viewDate: externalViewDate || viewDate,
                value: timeZonedValue,
                weekStartsOn: weekStartsOn,
                isDayFocused: isDayFocused,
                tabIndex: 0,
                "aria-label": changeDayLabel,
                onKeyDown: handleKeyDown,
                onDayChange: onDayChange,
                isDayActive: isDayActive,
                isDaySelectionStart: isFirstDay,
                isDaySelectionEnd: isLastDay,
                isDayDisabled: isDayDisabled,
                onBlur: resetSelectedDay,
                showNeighboringMonth: showNeighboringMonth,
                size: size,
                dayProps: dayProps,
                listenDayChangesForUpdate: listenDayChangesForUpdate,
                renderDayContent: renderDayContent,
                dayTestId: dayTestId
            }),
            enableTime && timeZonedValue && size !== 's' && /*#__PURE__*/ _jsx("div", {
                className: styles.time,
                children: /*#__PURE__*/ _jsx(CalendarTime, {
                    value: timeZonedValue,
                    onChange: updateValue,
                    onDoneButtonClick: onDoneButtonClick,
                    doneButtonText: doneButtonText,
                    doneButtonDisabled: doneButtonDisabled,
                    doneButtonShow: doneButtonShow,
                    DoneButton: DoneButton,
                    changeHoursLabel: changeHoursLabel,
                    changeMinutesLabel: changeMinutesLabel,
                    isDayDisabled: minDateTime || maxDateTime ? isDayDisabled : undefined,
                    minutesTestId: minutesTestId,
                    hoursTestId: hoursTestId,
                    doneButtonTestId: doneButtonTestId
                })
            })
        ]
    });
};

//# sourceMappingURL=Calendar.js.map