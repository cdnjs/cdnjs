'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { isSameDate } from "@vkontakte/vkjs";
import { useCalendar } from "../../hooks/useCalendar.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { isFirstDay, isLastDay } from "../../lib/calendar.js";
import { addMonths, endOfDay, isWithinInterval, MONDAY, startOfDay, subMonths } from "../../lib/date.js";
import { CalendarDays } from "../CalendarDays/CalendarDays.js";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { useCalendarKeyboardNavigation, useIsDayFocusable } from "./utils.js";
const getIsDaySelected = (day, value)=>{
    if (!(value === null || value === void 0 ? void 0 : value[0]) || !value[1]) {
        return false;
    }
    return isWithinInterval(day, [
        startOfDay(value[0]),
        endOfDay(value[1])
    ]);
};
/**
 * @see https://vkui.io/components/calendar-range
 */ export const CalendarRange = (_param)=>{
    var { 'value': valueProp, defaultValue, onChange, disablePast, disableFuture, shouldDisableDate, weekStartsOn = MONDAY, disablePickers, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', 'aria-label': ariaLabel = 'Календарь', prevMonthIcon, nextMonthIcon, listenDayChangesForUpdate, renderDayContent, dayTestId, leftPartHeaderTestsData, rightPartHeaderTestsData, getRootRef } = _param, props = _object_without_properties(_param, [
        'value',
        "defaultValue",
        "onChange",
        "disablePast",
        "disableFuture",
        "shouldDisableDate",
        "weekStartsOn",
        "disablePickers",
        "prevMonthLabel",
        "nextMonthLabel",
        "changeMonthLabel",
        "changeYearLabel",
        'aria-label',
        "prevMonthIcon",
        "nextMonthIcon",
        "listenDayChangesForUpdate",
        "renderDayContent",
        "dayTestId",
        "leftPartHeaderTestsData",
        "rightPartHeaderTestsData",
        "getRootRef"
    ]);
    const _onChange = React.useCallback((newValue)=>onChange === null || onChange === void 0 ? void 0 : onChange(newValue || undefined), [
        onChange
    ]);
    const [value, updateValue] = useCustomEnsuredControl({
        value: valueProp,
        defaultValue,
        onChange: _onChange
    });
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, isMonthDisabled, isYearDisabled } = useCalendar({
        value,
        disableFuture,
        disablePast,
        shouldDisableDate
    });
    const [hintedDate, setHintedDate] = React.useState();
    const secondViewDate = addMonths(viewDate, 1);
    const { focusableDayOnFirstCalendar, focusableDayOnSecondCalendar, handleFirstCalendarKeyDown, handleSecondCalendarKeyDown, handleDayFocus } = useCalendarKeyboardNavigation({
        focusedDay,
        setFocusedDay,
        value,
        viewDates: [
            viewDate,
            secondViewDate
        ],
        setViewDate
    });
    const getNewValue = React.useCallback((date)=>{
        const isValueEmpty = !value || value[0] === null && value[1] === null;
        const isRangeSelected = value && !!value[0] && !!value[1];
        if (isValueEmpty || isRangeSelected) {
            return [
                date,
                null
            ];
        }
        const [start] = value;
        if (start && isSameDate(date, start)) {
            return [
                startOfDay(start),
                endOfDay(start)
            ];
        } else if (start && date < start) {
            return [
                startOfDay(date),
                endOfDay(start)
            ];
        } else if (start && date > start) {
            return [
                start,
                endOfDay(date)
            ];
        }
        return value;
    }, [
        value
    ]);
    const onDayChange = React.useCallback((date)=>{
        updateValue(getNewValue(date));
        setHintedDate(undefined);
    }, [
        updateValue,
        getNewValue
    ]);
    const isDaySelected = React.useCallback((day)=>getIsDaySelected(day, value), [
        value
    ]);
    const isDayActive = React.useCallback((day)=>Boolean((value === null || value === void 0 ? void 0 : value[0]) && isSameDate(day, value[0]) || (value === null || value === void 0 ? void 0 : value[1]) && isSameDate(day, value[1])), [
        value
    ]);
    const isDaySelectionEnd = React.useCallback((day, dayOfWeek)=>Boolean(isLastDay(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[1]) && isSameDate(day, value[1])), [
        value
    ]);
    const isHintedDaySelectionEnd = React.useCallback((day, dayOfWeek)=>Boolean(isLastDay(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[1]) && isSameDate(day, hintedDate[1])), [
        hintedDate
    ]);
    const isDaySelectionStart = React.useCallback((day, dayOfWeek)=>Boolean(isFirstDay(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[0]) && isSameDate(day, value[0])), [
        value
    ]);
    const isHintedDaySelectionStart = React.useCallback((day, dayOfWeek)=>Boolean(isFirstDay(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[0]) && isSameDate(day, hintedDate[0])), [
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
    const onRightPartViewDateChange = React.useCallback((newDate)=>setViewDate(subMonths(newDate, 1)), [
        setViewDate
    ]);
    const isDayFocusableInFirstCalendar = useIsDayFocusable({
        value,
        focusableDayOnFirstCalendar,
        focusableDayOnSecondCalendar,
        viewDate,
        isDayActive
    });
    const isDayFocusableInSecondCalendar = useIsDayFocusable({
        value,
        focusableDayOnFirstCalendar,
        focusableDayOnSecondCalendar,
        viewDate: secondViewDate,
        isDayActive
    });
    const onDayFocus = React.useCallback((date)=>{
        if (focusedDay && isSameDate(focusedDay, date)) {
            return;
        }
        setFocusedDay(date);
        handleDayFocus(date);
    }, [
        focusedDay,
        handleDayFocus,
        setFocusedDay
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        "aria-label": ariaLabel
    }, props), {
        baseClassName: "vkuiCalendarRange__host",
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiCalendarRange__inner",
                children: [
                    /*#__PURE__*/ _jsx(CalendarHeader, _object_spread({
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
                        prevMonthIcon: prevMonthIcon,
                        isMonthDisabled: isMonthDisabled,
                        isYearDisabled: isYearDisabled
                    }, leftPartHeaderTestsData)),
                    /*#__PURE__*/ _jsx(CalendarDays, {
                        viewDate: viewDate,
                        value: value,
                        weekStartsOn: weekStartsOn,
                        onKeyDown: handleFirstCalendarKeyDown,
                        onDayFocus: onDayFocus,
                        isDayFocused: isDayFocused,
                        isDayFocusable: isDayFocusableInFirstCalendar,
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
                        renderDayContent: renderDayContent,
                        dayTestId: dayTestId
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiCalendarRange__inner",
                children: [
                    /*#__PURE__*/ _jsx(CalendarHeader, _object_spread({
                        viewDate: secondViewDate,
                        onChange: onRightPartViewDateChange,
                        prevMonthHidden: true,
                        onNextMonth: setNextMonth,
                        disablePickers: disablePickers,
                        className: "vkuiCalendarRange__header",
                        prevMonthLabel: prevMonthLabel,
                        nextMonthLabel: nextMonthLabel,
                        changeMonthLabel: changeMonthLabel,
                        changeYearLabel: changeYearLabel,
                        nextMonthIcon: nextMonthIcon,
                        isMonthDisabled: isMonthDisabled,
                        isYearDisabled: isYearDisabled
                    }, rightPartHeaderTestsData)),
                    /*#__PURE__*/ _jsx(CalendarDays, {
                        viewDate: secondViewDate,
                        value: value,
                        weekStartsOn: weekStartsOn,
                        onKeyDown: handleSecondCalendarKeyDown,
                        onDayFocus: onDayFocus,
                        isDayFocused: isDayFocused,
                        isDayFocusable: isDayFocusableInSecondCalendar,
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
                        renderDayContent: renderDayContent,
                        dayTestId: dayTestId
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=CalendarRange.js.map