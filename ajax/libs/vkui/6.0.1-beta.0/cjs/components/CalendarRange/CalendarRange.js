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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useCalendar = require("../../hooks/useCalendar");
const _calendar = require("../../lib/calendar");
const _date = require("../../lib/date");
const _CalendarDays = require("../CalendarDays/CalendarDays");
const _CalendarHeader = require("../CalendarHeader/CalendarHeader");
const _RootComponent = require("../RootComponent/RootComponent");
const getIsDaySelected = (day, value)=>{
    if (!(value === null || value === void 0 ? void 0 : value[0]) || !value[1]) {
        return false;
    }
    return Boolean((0, _date.isWithinInterval)(day, (0, _date.startOfDay)(value[0]), (0, _date.endOfDay)(value[1])));
};
const CalendarRange = (_param)=>{
    var { value, onChange, disablePast, disableFuture, shouldDisableDate, onClose, weekStartsOn = 1, disablePickers, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', changeDayLabel = 'Изменить день', prevMonthIcon, nextMonthIcon, listenDayChangesForUpdate } = _param, props = _object_without_properties._(_param, [
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
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, resetSelectedDay } = (0, _useCalendar.useCalendar)({
        value,
        disableFuture,
        disablePast,
        shouldDisableDate
    });
    const [hintedDate, setHintedDate] = _react.useState();
    const secondViewDate = (0, _date.addMonths)(viewDate, 1);
    const handleKeyDown = _react.useCallback((event)=>{
        if ([
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ].includes(event.key)) {
            event.preventDefault();
        }
        const newFocusedDay = (0, _calendar.navigateDate)(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value === null || value === void 0 ? void 0 : value[1], event.key);
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
    const getNewValue = _react.useCallback((date)=>{
        const isValueEmpty = !value || value[0] === null && value[1] === null;
        if (isValueEmpty) {
            return [
                date,
                null
            ];
        }
        const start = value[0];
        const end = value[1];
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
    const onDayChange = _react.useCallback((date)=>{
        onChange === null || onChange === void 0 ? void 0 : onChange(getNewValue(date));
        setHintedDate(undefined);
    }, [
        onChange,
        getNewValue
    ]);
    const isDaySelected = _react.useCallback((day)=>getIsDaySelected(day, value), [
        value
    ]);
    const isDayActive = _react.useCallback((day)=>Boolean((value === null || value === void 0 ? void 0 : value[0]) && (0, _date.isSameDay)(day, value[0]) || (value === null || value === void 0 ? void 0 : value[1]) && (0, _date.isSameDay)(day, value[1])), [
        value
    ]);
    const isDaySelectionEnd = _react.useCallback((day, dayOfWeek)=>Boolean((0, _calendar.isLastDay)(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[1]) && (0, _date.isSameDay)(day, value[1])), [
        value
    ]);
    const isHintedDaySelectionEnd = _react.useCallback((day, dayOfWeek)=>Boolean((0, _calendar.isLastDay)(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[1]) && (0, _date.isSameDay)(day, hintedDate[1])), [
        hintedDate
    ]);
    const isDaySelectionStart = _react.useCallback((day, dayOfWeek)=>Boolean((0, _calendar.isFirstDay)(day, dayOfWeek) || (value === null || value === void 0 ? void 0 : value[0]) && (0, _date.isSameDay)(day, value[0])), [
        value
    ]);
    const isHintedDaySelectionStart = _react.useCallback((day, dayOfWeek)=>Boolean((0, _calendar.isFirstDay)(day, dayOfWeek) || (hintedDate === null || hintedDate === void 0 ? void 0 : hintedDate[0]) && (0, _date.isSameDay)(day, hintedDate[0])), [
        hintedDate
    ]);
    const onDayEnter = _react.useCallback((date)=>setHintedDate(getNewValue(date)), [
        setHintedDate,
        getNewValue
    ]);
    const onDayLeave = _react.useCallback(()=>setHintedDate(undefined), [
        setHintedDate
    ]);
    const isDayHinted = _react.useCallback((day)=>getIsDaySelected(day, hintedDate), [
        hintedDate
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: "vkuiCalendarRange"
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ _react.createElement(_CalendarHeader.CalendarHeader, {
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
        "aria-label": changeDayLabel
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarRange__inner"
    }, /*#__PURE__*/ _react.createElement(_CalendarHeader.CalendarHeader, {
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
    }), /*#__PURE__*/ _react.createElement(_CalendarDays.CalendarDays, {
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