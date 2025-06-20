'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, isSameMonth, isWithinInterval, startOfDay, subMonths } from "date-fns";
import { useCalendar } from "../../hooks/useCalendar.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { isFirstDay, isLastDay, navigateDate } from "../../lib/calendar.js";
import { CalendarDays } from "../CalendarDays/CalendarDays.js";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const getIsDaySelected = (day, value)=>{
    if (!(value === null || value === void 0 ? void 0 : value[0]) || !value[1]) {
        return false;
    }
    return isWithinInterval(day, {
        start: startOfDay(value[0]),
        end: endOfDay(value[1])
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/CalendarRange
 */ export const CalendarRange = (_param)=>{
    var { value: valueProp, defaultValue, onChange, disablePast, disableFuture, shouldDisableDate, onClose, weekStartsOn = 1, disablePickers, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', changeDayLabel = 'Изменить день', prevMonthIcon, nextMonthIcon, listenDayChangesForUpdate, renderDayContent, dayTestId, leftPartHeaderTestsData, rightPartHeaderTestsData, getRootRef } = _param, props = _object_without_properties(_param, [
        "value",
        "defaultValue",
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
        "listenDayChangesForUpdate",
        "renderDayContent",
        "dayTestId",
        "leftPartHeaderTestsData",
        "rightPartHeaderTestsData",
        "getRootRef"
    ]);
    const [value, updateValue] = useCustomEnsuredControl({
        value: valueProp,
        defaultValue,
        onChange
    });
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, resetSelectedDay, isMonthDisabled, isYearDisabled } = useCalendar({
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
        const isRangeSelected = value && !!value[0] && !!value[1];
        if (isValueEmpty || isRangeSelected) {
            return [
                date,
                null
            ];
        }
        const [start] = value;
        if (start && isSameDay(date, start)) {
            return [
                startOfDay(start),
                endOfDay(start)
            ];
        } else if (start && isBefore(date, start)) {
            return [
                startOfDay(date),
                endOfDay(start)
            ];
        } else if (start && isAfter(date, start)) {
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
    const onRightPartViewDateChange = React.useCallback((newDate)=>setViewDate(subMonths(newDate, 1)), [
        setViewDate
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, props), {
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
                        renderDayContent: renderDayContent,
                        "aria-label": changeDayLabel,
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
                        renderDayContent: renderDayContent,
                        tabIndex: 0,
                        onBlur: resetSelectedDay,
                        dayTestId: dayTestId
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=CalendarRange.js.map