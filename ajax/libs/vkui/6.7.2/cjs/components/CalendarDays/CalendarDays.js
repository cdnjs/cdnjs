"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarDays", {
    enumerable: true,
    get: function() {
        return CalendarDays;
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
const _useExternRef = require("../../hooks/useExternRef");
const _useTodayDate = require("../../hooks/useTodayDate");
const _calendar = require("../../lib/calendar");
const _CalendarDay = require("../CalendarDay/CalendarDay");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _RootComponent = require("../RootComponent/RootComponent");
const _Footnote = require("../Typography/Footnote/Footnote");
const CalendarDays = (_param)=>{
    var { viewDate, value, weekStartsOn, onDayChange, isDaySelected, isDayActive, isDaySelectionEnd, isDaySelectionStart, onDayEnter, onDayLeave, isDayHinted, isHintedDaySelectionStart, isHintedDaySelectionEnd, isDayFocused, isDayDisabled, size, showNeighboringMonth = false, dayProps, listenDayChangesForUpdate = false, getRootRef, renderDayContent } = _param, props = _object_without_properties._(_param, [
        "viewDate",
        "value",
        "weekStartsOn",
        "onDayChange",
        "isDaySelected",
        "isDayActive",
        "isDaySelectionEnd",
        "isDaySelectionStart",
        "onDayEnter",
        "onDayLeave",
        "isDayHinted",
        "isHintedDaySelectionStart",
        "isHintedDaySelectionEnd",
        "isDayFocused",
        "isDayDisabled",
        "size",
        "showNeighboringMonth",
        "dayProps",
        "listenDayChangesForUpdate",
        "getRootRef",
        "renderDayContent"
    ]);
    const { locale } = (0, _ConfigProviderContext.useConfigProvider)();
    const ref = (0, _useExternRef.useExternRef)(getRootRef);
    const now = (0, _useTodayDate.useTodayDate)(listenDayChangesForUpdate);
    const weeks = _react.useMemo(()=>(0, _calendar.getWeeks)(viewDate, weekStartsOn), [
        weekStartsOn,
        viewDate
    ]);
    const daysNames = _react.useMemo(()=>(0, _calendar.getDaysNames)(now, weekStartsOn, locale), [
        locale,
        now,
        weekStartsOn
    ]);
    const handleDayChange = _react.useCallback((date)=>{
        var _ref_current;
        onDayChange(date);
        (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
    }, [
        onDayChange,
        ref
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: "vkuiCalendarDays",
        getRootRef: ref,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: (0, _vkjs.classNames)("vkuiCalendarDays__row", size === 's' && "vkuiCalendarDays__row--size-s"),
                children: daysNames.map((dayName)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                        className: "vkuiCalendarDays__weekday",
                        children: dayName
                    }, dayName))
            }),
            weeks.map((week, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: (0, _vkjs.classNames)("vkuiCalendarDays__row", size === 's' && "vkuiCalendarDays__row--size-s"),
                    children: week.map((day, i)=>{
                        const sameMonth = (0, _datefns.isSameMonth)(day, viewDate);
                        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_CalendarDay.CalendarDay, _object_spread._({
                            day: day,
                            today: (0, _datefns.isSameDay)(day, now),
                            active: isDayActive(day),
                            onChange: handleDayChange,
                            hidden: !showNeighboringMonth && !sameMonth,
                            disabled: isDayDisabled(day),
                            selectionStart: isDaySelectionStart(day, i),
                            selectionEnd: isDaySelectionEnd(day, i),
                            hintedSelectionStart: isHintedDaySelectionStart === null || isHintedDaySelectionStart === void 0 ? void 0 : isHintedDaySelectionStart(day, i),
                            hintedSelectionEnd: isHintedDaySelectionEnd === null || isHintedDaySelectionEnd === void 0 ? void 0 : isHintedDaySelectionEnd(day, i),
                            selected: isDaySelected === null || isDaySelected === void 0 ? void 0 : isDaySelected(day),
                            focused: isDayFocused(day),
                            onEnter: onDayEnter,
                            onLeave: onDayLeave,
                            hinted: isDayHinted === null || isDayHinted === void 0 ? void 0 : isDayHinted(day),
                            sameMonth: sameMonth,
                            size: size,
                            renderDayContent: renderDayContent
                        }, dayProps), day.toISOString());
                    })
                }, i))
        ]
    }));
};

//# sourceMappingURL=CalendarDays.js.map