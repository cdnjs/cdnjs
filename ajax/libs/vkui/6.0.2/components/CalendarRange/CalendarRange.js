import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { isFirstDay, isLastDay, navigateDate, setTimeEqual } from '../../lib/calendar';
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, isSameMonth, isWithinInterval, startOfDay } from '../../lib/date';
import { CalendarDays } from '../CalendarDays/CalendarDays';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { RootComponent } from '../RootComponent/RootComponent';
const getIsDaySelected = (day, value)=>{
    if (!(value === null || value === void 0 ? void 0 : value[0]) || !value[1]) {
        return false;
    }
    return Boolean(isWithinInterval(day, startOfDay(value[0]), endOfDay(value[1])));
};
/**
 * @see https://vkcom.github.io/VKUI/#/CalendarRange
 */ export const CalendarRange = (_param)=>{
    var { value, onChange, disablePast, disableFuture, shouldDisableDate, onClose, weekStartsOn = 1, disablePickers, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', changeDayLabel = 'Изменить день', prevMonthIcon, nextMonthIcon, listenDayChangesForUpdate } = _param, props = _object_without_properties(_param, [
        "value",
        "onChange",
        "disablePast",
        "disableFuture",
        "shouldDisableDate",
        "onClose",
        "weekStartsOn",
        "disablePickers",
        "prevMonthLabel",
        "nextMonthLabel",
        "changeMonthLabel",
        "changeYearLabel",
        "changeDayLabel",
        "prevMonthIcon",
        "nextMonthIcon",
        "listenDayChangesForUpdate"
    ]);
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, resetSelectedDay } = useCalendar({
        value,
        disableFuture,
        disablePast,
        shouldDisableDate
    });
    const [hintedDate, setHintedDate] = React.useState();
    const secondViewDate = addMonths(viewDate, 1);
    const handleKeyDown = React.useCallback((event)=>{
        if ([
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ].includes(event.key)) {
            event.preventDefault();
        }
        const newFocusedDay = navigateDate(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value === null || value === void 0 ? void 0 : value[1], event.key);
        if (newFocusedDay && !isSameMonth(newFocusedDay, viewDate) && !isSameMonth(newFocusedDay, addMonths(viewDate, 1))) {
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
    const getNewValue = React.useCallback((date)=>{
        const isValueEmpty = !value || value[0] === null && value[1] === null;
        if (isValueEmpty) {
            return [
                date,
                null
            ];
        }
        const start = value[0];
        const end = value[1];
        if (start && isSameDay(date, start) || end && isSameDay(date, end)) {
            return [
                setTimeEqual(date, start),
                setTimeEqual(date, end)
            ];
        } else if (start && isBefore(date, start)) {
            return [
                setTimeEqual(date, start),
                end
            ];
        } else if (start && isAfter(date, start)) {
            return [
                start,
                setTimeEqual(date, end)
            ];
        }
        return value;
    }, [
        value
    ]);
    const onDayChange = React.useCallback((date)=>{
        onChange === null || onChange === void 0 ? void 0 : onChange(getNewValue(date));
        setHintedDate(undefined);
    }, [
        onChange,
        getNewValue
    ]);
    const isDaySelected = React.useCallback((day)=>getIsDaySelected(day, value), [
        value
    ]);
    const isDayActive = React.useCallback((day)=>Boolean((value === null || value === void 0 ? void 0 : value[0]) && isSameDay(day, value[0]) || (value === null || value === void 0 ? void 0 : value[1]) && isSameDay(day, value[1])), [
        value
    ]);
    const isDaySelectionEnd = React.useCallback((day, dayOfWeek)=>Boolean(isLastDay(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[1]) && isSameDay(day, value[1])), [
        value
    ]);
    const isHintedDaySelectionEnd = React.useCallback((day, dayOfWeek)=>Boolean(isLastDay(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[1]) && isSameDay(day, hintedDate[1])), [
        hintedDate
    ]);
    const isDaySelectionStart = React.useCallback((day, dayOfWeek)=>Boolean(isFirstDay(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[0]) && isSameDay(day, value[0])), [
        value
    ]);
    const isHintedDaySelectionStart = React.useCallback((day, dayOfWeek)=>Boolean(isFirstDay(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[0]) && isSameDay(day, hintedDate[0])), [
        hintedDate
    ]);
    const onDayEnter = React.useCallback((date)=>setHintedDate(getNewValue(date)), [
        setHintedDate,
        getNewValue
    ]);
    const onDayLeave = React.useCallback(()=>setHintedDate(undefined), [
        setHintedDate
    ]);
    const isDayHinted = React.useCallback((day)=>getIsDaySelected(day, hintedDate), [
        hintedDate
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: "vkuiCalendarRange"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ React.createElement(CalendarHeader, {
        viewDate: viewDate,
        onChange: setViewDate,
        nextMonthHidden: true,
        onPrevMonth: setPrevMonth,
        disablePickers: disablePickers,
        className: "vkuiCalendarRange__header",
        prevMonthLabel: prevMonthLabel,
        nextMonthLabel: nextMonthLabel,
        changeMonthLabel: changeMonthLabel,
        changeYearLabel: changeYearLabel,
        prevMonthIcon: prevMonthIcon
    }), /*#__PURE__*/ React.createElement(CalendarDays, {
        viewDate: viewDate,
        value: value,
        weekStartsOn: weekStartsOn,
        onKeyDown: handleKeyDown,
        isDayFocused: isDayFocused,
        onDayChange: onDayChange,
        isDaySelected: isDaySelected,
        isDayActive: isDayActive,
        isDaySelectionEnd: isDaySelectionEnd,
        isDaySelectionStart: isDaySelectionStart,
        isDayHinted: isDayHinted,
        onDayEnter: onDayEnter,
        onDayLeave: onDayLeave,
        isHintedDaySelectionEnd: isHintedDaySelectionEnd,
        isHintedDaySelectionStart: isHintedDaySelectionStart,
        isDayDisabled: isDayDisabled,
        listenDayChangesForUpdate: listenDayChangesForUpdate,
        "aria-label": changeDayLabel
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ React.createElement(CalendarHeader, {
        viewDate: secondViewDate,
        onChange: setViewDate,
        prevMonthHidden: true,
        onNextMonth: setNextMonth,
        disablePickers: disablePickers,
        className: "vkuiCalendarRange__header",
        prevMonthLabel: prevMonthLabel,
        nextMonthLabel: nextMonthLabel,
        changeMonthLabel: changeMonthLabel,
        changeYearLabel: changeYearLabel,
        nextMonthIcon: nextMonthIcon
    }), /*#__PURE__*/ React.createElement(CalendarDays, {
        viewDate: secondViewDate,
        value: value,
        weekStartsOn: weekStartsOn,
        "aria-label": changeDayLabel,
        onKeyDown: handleKeyDown,
        isDayFocused: isDayFocused,
        onDayChange: onDayChange,
        isDaySelected: isDaySelected,
        isDayActive: isDayActive,
        isDaySelectionEnd: isDaySelectionEnd,
        isDaySelectionStart: isDaySelectionStart,
        isDayHinted: isDayHinted,
        onDayEnter: onDayEnter,
        onDayLeave: onDayLeave,
        isHintedDaySelectionEnd: isHintedDaySelectionEnd,
        isHintedDaySelectionStart: isHintedDaySelectionStart,
        isDayDisabled: isDayDisabled,
        listenDayChangesForUpdate: listenDayChangesForUpdate,
        tabIndex: 0,
        onBlur: resetSelectedDay
    })));
};

//# sourceMappingURL=CalendarRange.js.map