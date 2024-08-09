import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useCalendar } from "../../hooks/useCalendar";
import { clamp, isFirstDay, isLastDay, navigateDate, setTimeEqual } from "../../lib/calendar";
import { isSameDay, isSameMonth } from "../../lib/date";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { warnOnce } from "../../lib/warnOnce";
import { CalendarDays } from "../CalendarDays/CalendarDays";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader";
import { CalendarTime } from "../CalendarTime/CalendarTime";
import { RootComponent } from "../RootComponent/RootComponent";
var warn = warnOnce("Calendar");
/**
 * @see https://vkcom.github.io/VKUI/#/Calendar
 */ export var Calendar = function(_param) {
    var value = _param.value, onChange = _param.onChange, disablePast = _param.disablePast, disableFuture = _param.disableFuture, shouldDisableDate = _param.shouldDisableDate, onClose = _param.onClose, _param_enableTime = _param.enableTime, enableTime = _param_enableTime === void 0 ? false : _param_enableTime, doneButtonText = _param.doneButtonText, _param_weekStartsOn = _param.weekStartsOn, weekStartsOn = _param_weekStartsOn === void 0 ? 1 : _param_weekStartsOn, disablePickers = _param.disablePickers, changeHoursAriaLabel = _param.changeHoursAriaLabel, changeMinutesAriaLabel = _param.changeMinutesAriaLabel, prevMonthAriaLabel = _param.prevMonthAriaLabel, nextMonthAriaLabel = _param.nextMonthAriaLabel, changeMonthAriaLabel = _param.changeMonthAriaLabel, changeYearAriaLabel = _param.changeYearAriaLabel, showNeighboringMonth = _param.showNeighboringMonth, _param_changeDayAriaLabel = _param.changeDayAriaLabel, changeDayAriaLabel = _param_changeDayAriaLabel === void 0 ? "Изменить день" : _param_changeDayAriaLabel, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, externalViewDate = _param.viewDate, onHeaderChange = _param.onHeaderChange, onNextMonth = _param.onNextMonth, onPrevMonth = _param.onPrevMonth, prevMonthIcon = _param.prevMonthIcon, nextMonthIcon = _param.nextMonthIcon, prevMonthProps = _param.prevMonthProps, nextMonthProps = _param.nextMonthProps, dayProps = _param.dayProps, listenDayChangesForUpdate = _param.listenDayChangesForUpdate, minDateTime = _param.minDateTime, maxDateTime = _param.maxDateTime, props = _object_without_properties(_param, [
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
        "changeHoursAriaLabel",
        "changeMinutesAriaLabel",
        "prevMonthAriaLabel",
        "nextMonthAriaLabel",
        "changeMonthAriaLabel",
        "changeYearAriaLabel",
        "showNeighboringMonth",
        "changeDayAriaLabel",
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
        "minDateTime",
        "maxDateTime"
    ]);
    var _useCalendar = useCalendar({
        value: value,
        disableFuture: disableFuture,
        disablePast: disablePast,
        shouldDisableDate: shouldDisableDate,
        onHeaderChange: onHeaderChange,
        onNextMonth: onNextMonth,
        onPrevMonth: onPrevMonth,
        minDateTime: minDateTime,
        maxDateTime: maxDateTime
    }), viewDate = _useCalendar.viewDate, setViewDate = _useCalendar.setViewDate, setPrevMonth = _useCalendar.setPrevMonth, setNextMonth = _useCalendar.setNextMonth, focusedDay = _useCalendar.focusedDay, setFocusedDay = _useCalendar.setFocusedDay, isDayFocused = _useCalendar.isDayFocused, isDayDisabled = _useCalendar.isDayDisabled, resetSelectedDay = _useCalendar.resetSelectedDay;
    useIsomorphicLayoutEffect(function() {
        if (value) {
            setViewDate(value);
        }
    }, [
        value
    ]);
    if (process.env.NODE_ENV === "development" && !disablePickers && size === "s") {
        warn("Нельзя включить селекты выбора месяца/года, если размер календаря 's'", "error");
    }
    if (process.env.NODE_ENV === "development" && enableTime && size === "s") {
        warn("Нельзя включить выбор времени, если размер календаря 's'", "error");
    }
    var handleKeyDown = React.useCallback(function(event) {
        if ([
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].includes(event.key)) {
            event.preventDefault();
        }
        var newFocusedDay = navigateDate(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value, event.key);
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
    var onDayChange = React.useCallback(function(date) {
        var actualDate = setTimeEqual(date, value);
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
    var isDayActive = React.useCallback(function(day) {
        return Boolean(value && isSameDay(day, value));
    }, [
        value
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: classNames("vkuiCalendar", size === "s" && "vkuiCalendar--size-s")
    }), /*#__PURE__*/ React.createElement(CalendarHeader, {
        viewDate: externalViewDate || viewDate,
        onChange: setViewDate,
        onNextMonth: setNextMonth,
        onPrevMonth: setPrevMonth,
        disablePickers: disablePickers || size === "s",
        className: "vkuiCalendar__header",
        prevMonthAriaLabel: prevMonthAriaLabel,
        nextMonthAriaLabel: nextMonthAriaLabel,
        changeMonthAriaLabel: changeMonthAriaLabel,
        changeYearAriaLabel: changeYearAriaLabel,
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
        "aria-label": changeDayAriaLabel,
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
    }), enableTime && value && size !== "s" && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendar__time"
    }, /*#__PURE__*/ React.createElement(CalendarTime, {
        value: value,
        onChange: onChange,
        onClose: onClose,
        doneButtonText: doneButtonText,
        changeHoursAriaLabel: changeHoursAriaLabel,
        changeMinutesAriaLabel: changeMinutesAriaLabel,
        isDayDisabled: minDateTime || maxDateTime ? isDayDisabled : undefined
    })));
};

//# sourceMappingURL=Calendar.js.map