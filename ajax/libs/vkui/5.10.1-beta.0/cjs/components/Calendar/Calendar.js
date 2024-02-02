"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Calendar", {
    enumerable: true,
    get: function() {
        return Calendar;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useCalendar = require("../../hooks/useCalendar");
var _calendar = require("../../lib/calendar");
var _date = require("../../lib/date");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _warnOnce = require("../../lib/warnOnce");
var _CalendarDays = require("../CalendarDays/CalendarDays");
var _CalendarHeader = require("../CalendarHeader/CalendarHeader");
var _CalendarTime = require("../CalendarTime/CalendarTime");
var _RootComponent = require("../RootComponent/RootComponent");
var warn = (0, _warnOnce.warnOnce)("Calendar");
var Calendar = function(_param) {
    var value = _param.value, onChange = _param.onChange, disablePast = _param.disablePast, disableFuture = _param.disableFuture, shouldDisableDate = _param.shouldDisableDate, onClose = _param.onClose, _param_enableTime = _param.enableTime, enableTime = _param_enableTime === void 0 ? false : _param_enableTime, doneButtonText = _param.doneButtonText, _param_weekStartsOn = _param.weekStartsOn, weekStartsOn = _param_weekStartsOn === void 0 ? 1 : _param_weekStartsOn, disablePickers = _param.disablePickers, changeHoursAriaLabel = _param.changeHoursAriaLabel, changeMinutesAriaLabel = _param.changeMinutesAriaLabel, prevMonthAriaLabel = _param.prevMonthAriaLabel, nextMonthAriaLabel = _param.nextMonthAriaLabel, changeMonthAriaLabel = _param.changeMonthAriaLabel, changeYearAriaLabel = _param.changeYearAriaLabel, showNeighboringMonth = _param.showNeighboringMonth, _param_changeDayAriaLabel = _param.changeDayAriaLabel, changeDayAriaLabel = _param_changeDayAriaLabel === void 0 ? "Изменить день" : _param_changeDayAriaLabel, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, externalViewDate = _param.viewDate, onHeaderChange = _param.onHeaderChange, onNextMonth = _param.onNextMonth, onPrevMonth = _param.onPrevMonth, prevMonthIcon = _param.prevMonthIcon, nextMonthIcon = _param.nextMonthIcon, prevMonthProps = _param.prevMonthProps, nextMonthProps = _param.nextMonthProps, dayProps = _param.dayProps, listenDayChangesForUpdate = _param.listenDayChangesForUpdate, minDateTime = _param.minDateTime, maxDateTime = _param.maxDateTime, props = _object_without_properties._(_param, [
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
    var _useCalendar1 = (0, _useCalendar.useCalendar)({
        value: value,
        disableFuture: disableFuture,
        disablePast: disablePast,
        shouldDisableDate: shouldDisableDate,
        onHeaderChange: onHeaderChange,
        onNextMonth: onNextMonth,
        onPrevMonth: onPrevMonth,
        minDateTime: minDateTime,
        maxDateTime: maxDateTime
    }), viewDate = _useCalendar1.viewDate, setViewDate = _useCalendar1.setViewDate, setPrevMonth = _useCalendar1.setPrevMonth, setNextMonth = _useCalendar1.setNextMonth, focusedDay = _useCalendar1.focusedDay, setFocusedDay = _useCalendar1.setFocusedDay, isDayFocused = _useCalendar1.isDayFocused, isDayDisabled = _useCalendar1.isDayDisabled, resetSelectedDay = _useCalendar1.resetSelectedDay;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
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
    var handleKeyDown = _react.useCallback(function(event) {
        if ([
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].includes(event.key)) {
            event.preventDefault();
        }
        var newFocusedDay = (0, _calendar.navigateDate)(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value, event.key);
        if (newFocusedDay && !(0, _date.isSameMonth)(newFocusedDay, viewDate)) {
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
    var onDayChange = _react.useCallback(function(date) {
        var actualDate = (0, _calendar.setTimeEqual)(date, value);
        if (minDateTime || maxDateTime) {
            actualDate = (0, _calendar.clamp)(actualDate, {
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
    var isDayActive = _react.useCallback(function(day) {
        return Boolean(value && (0, _date.isSameDay)(day, value));
    }, [
        value
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: (0, _vkjs.classNames)("vkuiCalendar", size === "s" && "vkuiCalendar--size-s")
    }), /*#__PURE__*/ _react.createElement(_CalendarHeader.CalendarHeader, {
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
    }), /*#__PURE__*/ _react.createElement(_CalendarDays.CalendarDays, {
        viewDate: externalViewDate || viewDate,
        value: value,
        weekStartsOn: weekStartsOn,
        isDayFocused: isDayFocused,
        tabIndex: 0,
        "aria-label": changeDayAriaLabel,
        onKeyDown: handleKeyDown,
        onDayChange: onDayChange,
        isDayActive: isDayActive,
        isDaySelectionStart: _calendar.isFirstDay,
        isDaySelectionEnd: _calendar.isLastDay,
        isDayDisabled: isDayDisabled,
        onBlur: resetSelectedDay,
        showNeighboringMonth: showNeighboringMonth,
        size: size,
        dayProps: dayProps,
        listenDayChangesForUpdate: listenDayChangesForUpdate
    }), enableTime && value && size !== "s" && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendar__time"
    }, /*#__PURE__*/ _react.createElement(_CalendarTime.CalendarTime, {
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