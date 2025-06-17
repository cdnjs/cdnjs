'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { isSameDay, isSameMonth } from "date-fns";
import { CalendarDirectionContext } from "../../context/CalendarDirectionContext.js";
import { useCalendar } from "../../hooks/useCalendar.js";
import { useDirection } from "../../hooks/useDirection.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { clamp, isFirstDay, isLastDay, navigateDate, setTimeEqual } from "../../lib/calendar.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { CalendarDays } from "../CalendarDays/CalendarDays.js";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader.js";
import { CalendarTime } from "../CalendarTime/CalendarTime.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const warn = warnOnce('Calendar');
/**
 * @see https://vkcom.github.io/VKUI/#/Calendar
 */ export const Calendar = (_param)=>{
    var { getRootRef, value, onChange, disablePast, disableFuture, shouldDisableDate, onDoneButtonClick, enableTime = false, doneButtonText, doneButtonDisabled, doneButtonShow, DoneButton, weekStartsOn = 1, disablePickers, changeHoursLabel = 'Изменить час', changeMinutesLabel = 'Изменить минуту', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', showNeighboringMonth, changeDayLabel = 'Изменить день', size = 'm', viewDate: externalViewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, prevMonthProps, nextMonthProps, dayProps, listenDayChangesForUpdate, renderDayContent, minDateTime, maxDateTime, minutesTestId, hoursTestId, doneButtonTestId, prevMonthButtonTestId, nextMonthButtonTestId, monthDropdownTestId, yearDropdownTestId, dayTestId } = _param, props = _object_without_properties(_param, [
        "getRootRef",
        "value",
        "onChange",
        "disablePast",
        "disableFuture",
        "shouldDisableDate",
        "onDoneButtonClick",
        "enableTime",
        "doneButtonText",
        "doneButtonDisabled",
        "doneButtonShow",
        "DoneButton",
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
        "maxDateTime",
        "minutesTestId",
        "hoursTestId",
        "doneButtonTestId",
        "prevMonthButtonTestId",
        "nextMonthButtonTestId",
        "monthDropdownTestId",
        "yearDropdownTestId",
        "dayTestId"
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
    const [directionRef, textDirection = 'ltr'] = useDirection();
    const rootRef = useExternRef(directionRef, getRootRef);
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
    const directionContextValue = React.useMemo(()=>({
            direction: textDirection
        }), [
        textDirection
    ]);
    return /*#__PURE__*/ _jsx(CalendarDirectionContext.Provider, {
        value: directionContextValue,
        children: /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, props), {
            baseClassName: classNames("vkuiCalendar__host", size === 's' && "vkuiCalendar__sizeS"),
            getRootRef: rootRef,
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
                    isYearDisabled: isYearDisabled,
                    nextMonthButtonTestId: nextMonthButtonTestId,
                    prevMonthButtonTestId: prevMonthButtonTestId,
                    monthDropdownTestId: monthDropdownTestId,
                    yearDropdownTestId: yearDropdownTestId
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
                    renderDayContent: renderDayContent,
                    dayTestId: dayTestId
                }),
                enableTime && value && size !== 's' && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiCalendar__time",
                    children: /*#__PURE__*/ _jsx(CalendarTime, {
                        value: value,
                        onChange: onChange,
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
        }))
    });
};

//# sourceMappingURL=Calendar.js.map