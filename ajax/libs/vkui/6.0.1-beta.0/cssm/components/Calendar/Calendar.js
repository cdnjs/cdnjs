import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useCalendar } from '../../hooks/useCalendar';
import { clamp, isFirstDay, isLastDay, navigateDate, setTimeEqual } from '../../lib/calendar';
import { isSameDay, isSameMonth } from '../../lib/date';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../lib/warnOnce';
import { CalendarDays } from '../CalendarDays/CalendarDays';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { CalendarTime } from '../CalendarTime/CalendarTime';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Calendar.module.css';
const warn = warnOnce('Calendar');
/**
 * @see https://vkcom.github.io/VKUI/#/Calendar
 */ export const Calendar = ({ value, onChange, disablePast, disableFuture, shouldDisableDate, onClose, enableTime = false, doneButtonText, weekStartsOn = 1, disablePickers, changeHoursLabel = 'Изменить час', changeMinutesLabel = 'Изменить минуту', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', showNeighboringMonth, changeDayLabel = 'Изменить день', size = 'm', viewDate: externalViewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, prevMonthProps, nextMonthProps, dayProps, listenDayChangesForUpdate, minDateTime, maxDateTime, ...props })=>{
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, resetSelectedDay } = useCalendar({
        value,
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
        if (value) {
            setViewDate(value);
        }
    }, [
        value
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
        const newFocusedDay = navigateDate(focusedDay ?? value, event.key);
        if (newFocusedDay && !isSameMonth(newFocusedDay, viewDate)) {
            setViewDate(newFocusedDay);
        }
        setFocusedDay(newFocusedDay);
    }, [
        focusedDay,
        setFocusedDay,
        setViewDate,
        value,
        viewDate
    ]);
    const onDayChange = React.useCallback((date)=>{
        let actualDate = setTimeEqual(date, value);
        if (minDateTime || maxDateTime) {
            actualDate = clamp(actualDate, {
                min: minDateTime,
                max: maxDateTime
            });
        }
        onChange?.(actualDate);
    }, [
        value,
        onChange,
        maxDateTime,
        minDateTime
    ]);
    const isDayActive = React.useCallback((day)=>Boolean(value && isSameDay(day, value)), [
        value
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...props,
        baseClassName: classNames(styles['Calendar'], size === 's' && styles['Calendar--size-s'])
    }, /*#__PURE__*/ React.createElement(CalendarHeader, {
        viewDate: externalViewDate || viewDate,
        onChange: setViewDate,
        onNextMonth: setNextMonth,
        onPrevMonth: setPrevMonth,
        disablePickers: disablePickers || size === 's',
        className: styles['Calendar__header'],
        prevMonthLabel: prevMonthLabel,
        nextMonthLabel: nextMonthLabel,
        changeMonthLabel: changeMonthLabel,
        changeYearLabel: changeYearLabel,
        prevMonthIcon: prevMonthIcon,
        nextMonthIcon: nextMonthIcon,
        prevMonthProps: prevMonthProps,
        nextMonthProps: nextMonthProps
    }), /*#__PURE__*/ React.createElement(CalendarDays, {
        viewDate: externalViewDate || viewDate,
        value: value,
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
        listenDayChangesForUpdate: listenDayChangesForUpdate
    }), enableTime && value && size !== 's' && /*#__PURE__*/ React.createElement("div", {
        className: styles['Calendar__time']
    }, /*#__PURE__*/ React.createElement(CalendarTime, {
        value: value,
        onChange: onChange,
        onClose: onClose,
        doneButtonText: doneButtonText,
        changeHoursLabel: changeHoursLabel,
        changeMinutesLabel: changeMinutesLabel,
        isDayDisabled: minDateTime || maxDateTime ? isDayDisabled : undefined
    })));
};

//# sourceMappingURL=Calendar.js.map