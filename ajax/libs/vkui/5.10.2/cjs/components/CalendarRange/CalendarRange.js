"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarRange", {
    enumerable: true,
    get: function() {
        return CalendarRange;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useCalendar = require("../../hooks/useCalendar");
var _calendar = require("../../lib/calendar");
var _date = require("../../lib/date");
var _CalendarDays = require("../CalendarDays/CalendarDays");
var _CalendarHeader = require("../CalendarHeader/CalendarHeader");
var _RootComponent = require("../RootComponent/RootComponent");
var getIsDaySelected = function(day, value) {
    if (!(value === null || value === void 0 ? void 0 : value[0]) || !value[1]) {
        return false;
    }
    return Boolean((0, _date.isWithinInterval)(day, (0, _date.startOfDay)(value[0]), (0, _date.endOfDay)(value[1])));
};
var CalendarRange = function(_param) {
    var value = _param.value, onChange = _param.onChange, disablePast = _param.disablePast, disableFuture = _param.disableFuture, shouldDisableDate = _param.shouldDisableDate, onClose = _param.onClose, _param_weekStartsOn = _param.weekStartsOn, weekStartsOn = _param_weekStartsOn === void 0 ? 1 : _param_weekStartsOn, disablePickers = _param.disablePickers, prevMonthAriaLabel = _param.prevMonthAriaLabel, nextMonthAriaLabel = _param.nextMonthAriaLabel, changeMonthAriaLabel = _param.changeMonthAriaLabel, changeYearAriaLabel = _param.changeYearAriaLabel, _param_changeDayAriaLabel = _param.changeDayAriaLabel, changeDayAriaLabel = _param_changeDayAriaLabel === void 0 ? "Изменить день" : _param_changeDayAriaLabel, prevMonthIcon = _param.prevMonthIcon, nextMonthIcon = _param.nextMonthIcon, listenDayChangesForUpdate = _param.listenDayChangesForUpdate, props = _object_without_properties._(_param, [
        "value",
        "onChange",
        "disablePast",
        "disableFuture",
        "shouldDisableDate",
        "onClose",
        "weekStartsOn",
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
    var _useCalendar1 = (0, _useCalendar.useCalendar)({
        value: value,
        disableFuture: disableFuture,
        disablePast: disablePast,
        shouldDisableDate: shouldDisableDate
    }), viewDate = _useCalendar1.viewDate, setViewDate = _useCalendar1.setViewDate, setPrevMonth = _useCalendar1.setPrevMonth, setNextMonth = _useCalendar1.setNextMonth, focusedDay = _useCalendar1.focusedDay, setFocusedDay = _useCalendar1.setFocusedDay, isDayFocused = _useCalendar1.isDayFocused, isDayDisabled = _useCalendar1.isDayDisabled, resetSelectedDay = _useCalendar1.resetSelectedDay;
    var _React_useState = _sliced_to_array._(_react.useState(), 2), hintedDate = _React_useState[0], setHintedDate = _React_useState[1];
    var secondViewDate = (0, _date.addMonths)(viewDate, 1);
    var handleKeyDown = _react.useCallback(function(event) {
        if ([
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].includes(event.key)) {
            event.preventDefault();
        }
        var newFocusedDay = (0, _calendar.navigateDate)(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value === null || value === void 0 ? void 0 : value[1], event.key);
        if (newFocusedDay && !(0, _date.isSameMonth)(newFocusedDay, viewDate) && !(0, _date.isSameMonth)(newFocusedDay, (0, _date.addMonths)(viewDate, 1))) {
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
    var getNewValue = _react.useCallback(function(date) {
        var isValueEmpty = !value || value[0] === null && value[1] === null;
        if (isValueEmpty) {
            return [
                date,
                null
            ];
        }
        var start = value[0];
        var end = value[1];
        if (start && (0, _date.isSameDay)(date, start) || end && (0, _date.isSameDay)(date, end)) {
            return [
                (0, _calendar.setTimeEqual)(date, start),
                (0, _calendar.setTimeEqual)(date, end)
            ];
        } else if (start && (0, _date.isBefore)(date, start)) {
            return [
                (0, _calendar.setTimeEqual)(date, start),
                end
            ];
        } else if (start && (0, _date.isAfter)(date, start)) {
            return [
                start,
                (0, _calendar.setTimeEqual)(date, end)
            ];
        }
        return value;
    }, [
        value
    ]);
    var onDayChange = _react.useCallback(function(date) {
        onChange === null || onChange === void 0 ? void 0 : onChange(getNewValue(date));
        setHintedDate(undefined);
    }, [
        onChange,
        getNewValue
    ]);
    var isDaySelected = _react.useCallback(function(day) {
        return getIsDaySelected(day, value);
    }, [
        value
    ]);
    var isDayActive = _react.useCallback(function(day) {
        return Boolean((value === null || value === void 0 ? void 0 : value[0]) && (0, _date.isSameDay)(day, value[0]) || (value === null || value === void 0 ? void 0 : value[1]) && (0, _date.isSameDay)(day, value[1]));
    }, [
        value
    ]);
    var isDaySelectionEnd = _react.useCallback(function(day, dayOfWeek) {
        return Boolean((0, _calendar.isLastDay)(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[1]) && (0, _date.isSameDay)(day, value[1]));
    }, [
        value
    ]);
    var isHintedDaySelectionEnd = _react.useCallback(function(day, dayOfWeek) {
        return Boolean((0, _calendar.isLastDay)(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[1]) && (0, _date.isSameDay)(day, hintedDate[1]));
    }, [
        hintedDate
    ]);
    var isDaySelectionStart = _react.useCallback(function(day, dayOfWeek) {
        return Boolean((0, _calendar.isFirstDay)(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[0]) && (0, _date.isSameDay)(day, value[0]));
    }, [
        value
    ]);
    var isHintedDaySelectionStart = _react.useCallback(function(day, dayOfWeek) {
        return Boolean((0, _calendar.isFirstDay)(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[0]) && (0, _date.isSameDay)(day, hintedDate[0]));
    }, [
        hintedDate
    ]);
    var onDayEnter = _react.useCallback(function(date) {
        return setHintedDate(getNewValue(date));
    }, [
        setHintedDate,
        getNewValue
    ]);
    var onDayLeave = _react.useCallback(function() {
        return setHintedDate(undefined);
    }, [
        setHintedDate
    ]);
    var isDayHinted = _react.useCallback(function(day) {
        return getIsDaySelected(day, hintedDate);
    }, [
        hintedDate
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: "vkuiCalendarRange"
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ _react.createElement(_CalendarHeader.CalendarHeader, {
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
    }), /*#__PURE__*/ _react.createElement(_CalendarDays.CalendarDays, {
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
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ _react.createElement(_CalendarHeader.CalendarHeader, {
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
    }), /*#__PURE__*/ _react.createElement(_CalendarDays.CalendarDays, {
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