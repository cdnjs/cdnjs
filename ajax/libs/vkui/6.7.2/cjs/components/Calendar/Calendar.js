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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _datefns = require("date-fns");
const _useCalendar = require("../../hooks/useCalendar");
const _calendar = require("../../lib/calendar");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../lib/warnOnce");
const _CalendarDays = require("../CalendarDays/CalendarDays");
const _CalendarHeader = require("../CalendarHeader/CalendarHeader");
const _CalendarTime = require("../CalendarTime/CalendarTime");
const _RootComponent = require("../RootComponent/RootComponent");
const warn = (0, _warnOnce.warnOnce)('Calendar');
const Calendar = (_param)=>{
    var { value, onChange, disablePast, disableFuture, shouldDisableDate, onClose, enableTime = false, doneButtonText, weekStartsOn = 1, disablePickers, changeHoursLabel = 'Изменить час', changeMinutesLabel = 'Изменить минуту', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', showNeighboringMonth, changeDayLabel = 'Изменить день', size = 'm', viewDate: externalViewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, prevMonthProps, nextMonthProps, dayProps, listenDayChangesForUpdate, renderDayContent, minDateTime, maxDateTime } = _param, props = _object_without_properties._(_param, [
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
    const { viewDate, setViewDate, setPrevMonth, setNextMonth, focusedDay, setFocusedDay, isDayFocused, isDayDisabled, resetSelectedDay, isMonthDisabled, isYearDisabled } = (0, _useCalendar.useCalendar)({
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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
    const handleKeyDown = _react.useCallback((event)=>{
        if ([
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ].includes(event.key)) {
            event.preventDefault();
        }
        const newFocusedDay = (0, _calendar.navigateDate)(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value, event.key);
        if (newFocusedDay && !(0, _datefns.isSameMonth)(newFocusedDay, viewDate)) {
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
    const onDayChange = _react.useCallback((date)=>{
        let actualDate = (0, _calendar.setTimeEqual)(date, value);
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
    const isDayActive = _react.useCallback((day)=>Boolean(value && (0, _datefns.isSameDay)(day, value)), [
        value
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: (0, _vkjs.classNames)("vkuiCalendar", size === 's' && "vkuiCalendar--size-s"),
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_CalendarHeader.CalendarHeader, {
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_CalendarDays.CalendarDays, {
                viewDate: externalViewDate || viewDate,
                value: value,
                weekStartsOn: weekStartsOn,
                isDayFocused: isDayFocused,
                tabIndex: 0,
                "aria-label": changeDayLabel,
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
                listenDayChangesForUpdate: listenDayChangesForUpdate,
                renderDayContent: renderDayContent
            }),
            enableTime && value && size !== 's' && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiCalendar__time",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_CalendarTime.CalendarTime, {
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