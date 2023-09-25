import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { isFirstDay, isLastDay, navigateDate, setTimeEqual } from "../../lib/calendar";
import { addMonths, endOfDay, isAfter, isBefore, isSameDay, isSameMonth, isWithinInterval, startOfDay } from "../../lib/date";
import { CalendarDays } from "../CalendarDays/CalendarDays";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader";
import { RootComponent } from "../RootComponent/RootComponent";
var getIsDaySelected = function(day, value) {
    var _value;
    if (!((_value = value) === null || _value === void 0 ? void 0 : _value[0]) || !value[1]) {
        return false;
    }
    return Boolean(isWithinInterval(day, startOfDay(value[0]), endOfDay(value[1])));
};
/**
 * @see https://vkcom.github.io/VKUI/#/CalendarRange
 */ export var CalendarRange = function(_param) {
    var value = _param.value, onChange = _param.onChange, disablePast = _param.disablePast, disableFuture = _param.disableFuture, shouldDisableDate = _param.shouldDisableDate, onClose = _param.onClose, _param_weekStartsOn = _param.weekStartsOn, weekStartsOn = _param_weekStartsOn === void 0 ? 1 : _param_weekStartsOn, getRootRef = _param.getRootRef, disablePickers = _param.disablePickers, prevMonthAriaLabel = _param.prevMonthAriaLabel, nextMonthAriaLabel = _param.nextMonthAriaLabel, changeMonthAriaLabel = _param.changeMonthAriaLabel, changeYearAriaLabel = _param.changeYearAriaLabel, _param_changeDayAriaLabel = _param.changeDayAriaLabel, changeDayAriaLabel = _param_changeDayAriaLabel === void 0 ? "Изменить день" : _param_changeDayAriaLabel, prevMonthIcon = _param.prevMonthIcon, nextMonthIcon = _param.nextMonthIcon, listenDayChangesForUpdate = _param.listenDayChangesForUpdate, props = _object_without_properties(_param, [
        "value",
        "onChange",
        "disablePast",
        "disableFuture",
        "shouldDisableDate",
        "onClose",
        "weekStartsOn",
        "getRootRef",
        "disablePickers",
        "prevMonthAriaLabel",
        "nextMonthAriaLabel",
        "changeMonthAriaLabel",
        "changeYearAriaLabel",
        "changeDayAriaLabel",
        "prevMonthIcon",
        "nextMonthIcon",
        "listenDayChangesForUpdate"
    ]);
    var _useCalendar = useCalendar({
        value: value,
        disableFuture: disableFuture,
        disablePast: disablePast,
        shouldDisableDate: shouldDisableDate
    }), viewDate = _useCalendar.viewDate, setViewDate = _useCalendar.setViewDate, setPrevMonth = _useCalendar.setPrevMonth, setNextMonth = _useCalendar.setNextMonth, focusedDay = _useCalendar.focusedDay, setFocusedDay = _useCalendar.setFocusedDay, isDayFocused = _useCalendar.isDayFocused, isDayDisabled = _useCalendar.isDayDisabled, resetSelectedDay = _useCalendar.resetSelectedDay;
    var _React_useState = _sliced_to_array(React.useState(), 2), hintedDate = _React_useState[0], setHintedDate = _React_useState[1];
    var secondViewDate = addMonths(viewDate, 1);
    var handleKeyDown = React.useCallback(function(event) {
        var _value;
        if ([
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].includes(event.key)) {
            event.preventDefault();
        }
        var newFocusedDay = navigateDate(focusedDay !== null && focusedDay !== void 0 ? focusedDay : (_value = value) === null || _value === void 0 ? void 0 : _value[1], event.key);
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
    var getNewValue = React.useCallback(function(date) {
        if (!value) {
            return [
                date,
                null
            ];
        }
        var start = value[0];
        var end = value[1];
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
    var onDayChange = React.useCallback(function(date) {
        var _onChange;
        (_onChange = onChange) === null || _onChange === void 0 ? void 0 : _onChange(getNewValue(date));
        setHintedDate(undefined);
    }, [
        onChange,
        getNewValue
    ]);
    var isDaySelected = React.useCallback(function(day) {
        return getIsDaySelected(day, value);
    }, [
        value
    ]);
    var isDayActive = React.useCallback(function(day) {
        var _value, _value1;
        return Boolean(((_value = value) === null || _value === void 0 ? void 0 : _value[0]) && isSameDay(day, value[0]) || ((_value1 = value) === null || _value1 === void 0 ? void 0 : _value1[1]) && isSameDay(day, value[1]));
    }, [
        value
    ]);
    var isDaySelectionEnd = React.useCallback(function(day, dayOfWeek) {
        var _value;
        return Boolean(isLastDay(day, dayOfWeek) || ((_value = value) === null || _value === void 0 ? void 0 : _value[1]) && isSameDay(day, value[1]));
    }, [
        value
    ]);
    var isHintedDaySelectionEnd = React.useCallback(function(day, dayOfWeek) {
        var _hintedDate;
        return Boolean(isLastDay(day, dayOfWeek) || ((_hintedDate = hintedDate) === null || _hintedDate === void 0 ? void 0 : _hintedDate[1]) && isSameDay(day, hintedDate[1]));
    }, [
        hintedDate
    ]);
    var isDaySelectionStart = React.useCallback(function(day, dayOfWeek) {
        var _value;
        return Boolean(isFirstDay(day, dayOfWeek) || ((_value = value) === null || _value === void 0 ? void 0 : _value[0]) && isSameDay(day, value[0]));
    }, [
        value
    ]);
    var isHintedDaySelectionStart = React.useCallback(function(day, dayOfWeek) {
        var _hintedDate;
        return Boolean(isFirstDay(day, dayOfWeek) || ((_hintedDate = hintedDate) === null || _hintedDate === void 0 ? void 0 : _hintedDate[0]) && isSameDay(day, hintedDate[0]));
    }, [
        hintedDate
    ]);
    var onDayEnter = React.useCallback(function(date) {
        return setHintedDate(getNewValue(date));
    }, [
        setHintedDate,
        getNewValue
    ]);
    var onDayLeave = React.useCallback(function() {
        return setHintedDate(undefined);
    }, [
        setHintedDate
    ]);
    var isDayHinted = React.useCallback(function(day) {
        return getIsDaySelected(day, hintedDate);
    }, [
        hintedDate
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: "vkuiCalendarRange"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ React.createElement(CalendarHeader, {
        viewDate: viewDate,
        onChange: setViewDate,
        nextMonth: false,
        onPrevMonth: setPrevMonth,
        disablePickers: disablePickers,
        className: "vkuiCalendarRange__header",
        prevMonthAriaLabel: prevMonthAriaLabel,
        nextMonthAriaLabel: nextMonthAriaLabel,
        changeMonthAriaLabel: changeMonthAriaLabel,
        changeYearAriaLabel: changeYearAriaLabel,
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
        "aria-label": changeDayAriaLabel
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ React.createElement(CalendarHeader, {
        viewDate: secondViewDate,
        onChange: setViewDate,
        prevMonth: false,
        onNextMonth: setNextMonth,
        disablePickers: disablePickers,
        className: "vkuiCalendarRange__header",
        prevMonthAriaLabel: prevMonthAriaLabel,
        nextMonthAriaLabel: nextMonthAriaLabel,
        changeMonthAriaLabel: changeMonthAriaLabel,
        changeYearAriaLabel: changeYearAriaLabel,
        nextMonthIcon: nextMonthIcon
    }), /*#__PURE__*/ React.createElement(CalendarDays, {
        viewDate: secondViewDate,
        value: value,
        weekStartsOn: weekStartsOn,
        "aria-label": changeDayAriaLabel,
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