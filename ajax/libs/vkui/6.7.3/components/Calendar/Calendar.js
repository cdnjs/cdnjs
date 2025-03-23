import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { isSameDay, isSameMonth } from 'date-fns';
import { useCalendar } from '../../hooks/useCalendar';
import { clamp, isFirstDay, isLastDay, navigateDate, setTimeEqual } from '../../lib/calendar';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../lib/warnOnce';
import { CalendarDays } from '../CalendarDays/CalendarDays';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { CalendarTime } from '../CalendarTime/CalendarTime';
import { RootComponent } from '../RootComponent/RootComponent';
const warn = warnOnce('Calendar');
/**
 * @see https://vkcom.github.io/VKUI/#/Calendar
 */ export const Calendar = (_param)=>{
    var { value, onChange, disablePast, disableFuture, shouldDisableDate, onClose, enableTime = false, doneButtonText, weekStartsOn = 1, disablePickers, changeHoursLabel = 'Изменить час', changeMinutesLabel = 'Изменить минуту', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', showNeighboringMonth, changeDayLabel = 'Изменить день', size = 'm', viewDate: externalViewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, prevMonthProps, nextMonthProps, dayProps, listenDayChangesForUpdate, renderDayContent, minDateTime, maxDateTime } = _param, props = _object_without_properties(_param, [
        "value",
        "onChange",
        "disablePast",
        "disableFuture",
        "shouldDisableDate",
        "onClose",
        "enableTime",
        "doneButtonText",
        "weekStartsOn",
        "disablePickers",
        "changeHoursLabel",
        "changeMinutesLabel",
        "prevMonthLabel",
        "nextMonthLabel",
        "changeMonthLabel",
        "changeYearLabel",
        "showNeighboringMonth",
        "changeDayLabel",
        "size",
        "viewDate",
        "onHeaderChange",
        "onNextMonth",
        "onPrevMonth",
        "prevMonthIcon",
        "nextMonthIcon",
        "prevMonthProps",
        "nextMonthProps",
        "dayProps",
        "listenDayChangesForUpdate",
        "renderDayContent",
        "minDateTime",
        "maxDateTime"
    ]);
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, resetSelectedDay, isMonthDisabled, isYearDisabled } = useCalendar({
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
        const newFocusedDay = navigateDate(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value, event.key);
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
        onChange === null || onChange === void 0 ? void 0 : onChange(actualDate);
    }, [
        value,
        onChange,
        maxDateTime,
        minDateTime
    ]);
    const isDayActive = React.useCallback((day)=>Boolean(value && isSameDay(day, value)), [
        value
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: classNames("vkuiCalendar", size === 's' && "vkuiCalendar--size-s"),
        children: [
            /*#__PURE__*/ _jsx(CalendarHeader, {
                viewDate: externalViewDate || viewDate,
                onChange: setViewDate,
                onNextMonth: setNextMonth,
                onPrevMonth: setPrevMonth,
                disablePickers: disablePickers || size === 's',
                className: "vkuiCalendar__header",
                prevMonthLabel: prevMonthLabel,
                nextMonthLabel: nextMonthLabel,
                changeMonthLabel: changeMonthLabel,
                changeYearLabel: changeYearLabel,
                prevMonthIcon: prevMonthIcon,
                nextMonthIcon: nextMonthIcon,
                prevMonthProps: prevMonthProps,
                nextMonthProps: nextMonthProps,
                isMonthDisabled: isMonthDisabled,
                isYearDisabled: isYearDisabled
            }),
            /*#__PURE__*/ _jsx(CalendarDays, {
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
                listenDayChangesForUpdate: listenDayChangesForUpdate,
                renderDayContent: renderDayContent
            }),
            enableTime && value && size !== 's' && /*#__PURE__*/ _jsx("div", {
                className: "vkuiCalendar__time",
                children: /*#__PURE__*/ _jsx(CalendarTime, {
                    value: value,
                    onChange: onChange,
                    onClose: onClose,
                    doneButtonText: doneButtonText,
                    changeHoursLabel: changeHoursLabel,
                    changeMinutesLabel: changeMinutesLabel,
                    isDayDisabled: minDateTime || maxDateTime ? isDayDisabled : undefined
                })
            })
        ]
    }));
};

//# sourceMappingURL=Calendar.js.map