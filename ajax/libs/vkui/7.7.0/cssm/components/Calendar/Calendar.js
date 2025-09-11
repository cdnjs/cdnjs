'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, isSameDate } from "@vkontakte/vkjs";
import { useCalendar } from "../../hooks/useCalendar.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { Keys, pressedKey } from "../../lib/accessibility.js";
import { clamp, isFirstDay, isLastDay, navigateDate, NAVIGATION_KEYS, setTimeEqual } from "../../lib/calendar.js";
import { convertDateFromTimeZone, convertDateToTimeZone, isSameMonth, startOfMonth } from "../../lib/date.js";
import { isHTMLElement } from "../../lib/dom.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { CalendarDays } from "../CalendarDays/CalendarDays.js";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader.js";
import { CalendarTime } from "../CalendarTime/CalendarTime.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Calendar.module.css";
const warn = warnOnce('Calendar');
/**
 * @see https://vkui.io/components/calendar
 */ export const Calendar = ({ getRootRef, 'value': valueProp, defaultValue, onChange, disablePast, disableFuture, shouldDisableDate, onDoneButtonClick, enableTime = false, doneButtonText, doneButtonDisabled, doneButtonShow, DoneButton, weekStartsOn = 1, disablePickers, 'aria-label': ariaLabel = 'Календарь', changeHoursLabel = 'Изменить час', changeMinutesLabel = 'Изменить минуту', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', showNeighboringMonth, size = 'm', 'viewDate': externalViewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, prevMonthProps, nextMonthProps, dayProps, listenDayChangesForUpdate, renderDayContent, minDateTime, maxDateTime, timezone, minutesTestId, hoursTestId, doneButtonTestId, prevMonthButtonTestId, nextMonthButtonTestId, monthDropdownTestId, yearDropdownTestId, dayTestId, ...props })=>{
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
    const timeZonedValue = React.useMemo(()=>convertDateToTimeZone(value, timezone), [
        timezone,
        value
    ]);
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, isMonthDisabled, isYearDisabled } = useCalendar({
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
    // соотвествует дню, на котором можно сфокусироваться с помощью Tab
    const [focusableDay, setFocusableDay] = React.useState();
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
        const key = pressedKey(event);
        if (key && NAVIGATION_KEYS.includes(key)) {
            event.preventDefault();
            const newFocusedDay = navigateDate(focusedDay ?? timeZonedValue, key);
            if (newFocusedDay && !isSameMonth(newFocusedDay, viewDate)) {
                setViewDate(newFocusedDay);
            }
            setFocusedDay(newFocusedDay);
            setFocusableDay(newFocusedDay);
            return;
        }
        if (key === Keys.TAB) {
            setFocusedDay(undefined);
            setFocusableDay(focusedDay);
            return;
        }
        if ((key === Keys.ENTER || key === Keys.SPACE) && isHTMLElement(event.target)) {
            event.preventDefault();
            event.target.click?.();
        }
    }, [
        focusedDay,
        setFocusedDay,
        setFocusableDay,
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
    const onDayFocus = React.useCallback((date)=>{
        if (focusedDay && isSameDate(focusedDay, date)) {
            return;
        }
        setFocusedDay(date);
        if (!focusableDay || !isSameDate(date, focusableDay)) {
            setFocusableDay(date);
        }
    }, [
        focusableDay,
        focusedDay,
        setFocusedDay
    ]);
    // activeDay это день в календаре соответствующий значению в инпуте
    const isDayActive = React.useCallback((day)=>Boolean(timeZonedValue && isSameDate(day, timeZonedValue)), [
        timeZonedValue
    ]);
    const isFocusableDayInViewDateMonth = focusableDay && isSameMonth(focusableDay, viewDate);
    const isInputValueDateInViewDateMonth = timeZonedValue && isSameMonth(timeZonedValue, viewDate);
    /**
   * Функция позволяет проверить является ли день в календаре днём на который
   * можно попасть с помощью Tab.
   * Единственный день в таблице календаря у которого есть tabIndex="0"
   * Чтобы на него можно было попасть из заголовка календаря.
   */ const isDayFocusable = React.useCallback((day)=>{
        // если focusableDay день находится среди дней открытого сейчас месяца, то такой день получит tabIndex="0",
        if (isFocusableDayInViewDateMonth) {
            return isSameDate(focusableDay, day);
        }
        // при открытии календаря focusableDay не определён,
        // поэтому tabIndex="0" будет у дня, соответствующего дню в инпуте
        if (isInputValueDateInViewDateMonth) {
            return isDayActive(day);
        }
        // при переключении месяца любая навигация с помощью Tab начинается
        // с первого дня месяца.
        return isSameDate(startOfMonth(viewDate), day);
    }, [
        focusableDay,
        viewDate,
        isDayActive,
        isFocusableDayInViewDateMonth,
        isInputValueDateInViewDateMonth
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, {
        "aria-label": ariaLabel,
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
                onKeyDown: handleKeyDown,
                onDayChange: onDayChange,
                isDayActive: isDayActive,
                onDayFocus: onDayFocus,
                isDayFocused: isDayFocused,
                isDayFocusable: isDayFocusable,
                isDaySelectionStart: isFirstDay,
                isDaySelectionEnd: isLastDay,
                isDayDisabled: isDayDisabled,
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