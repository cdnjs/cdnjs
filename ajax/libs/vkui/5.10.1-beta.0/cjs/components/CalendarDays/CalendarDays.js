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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _useTodayDate = require("../../hooks/useTodayDate");
var _calendar = require("../../lib/calendar");
var _date = require("../../lib/date");
var _CalendarDay = require("../CalendarDay/CalendarDay");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _RootComponent = require("../RootComponent/RootComponent");
var _Footnote = require("../Typography/Footnote/Footnote");
var CalendarDays = function(_param) {
    var viewDate = _param.viewDate, value = _param.value, weekStartsOn = _param.weekStartsOn, onDayChange = _param.onDayChange, isDaySelected = _param.isDaySelected, isDayActive = _param.isDayActive, isDaySelectionEnd = _param.isDaySelectionEnd, isDaySelectionStart = _param.isDaySelectionStart, onDayEnter = _param.onDayEnter, onDayLeave = _param.onDayLeave, isDayHinted = _param.isDayHinted, isHintedDaySelectionStart = _param.isHintedDaySelectionStart, isHintedDaySelectionEnd = _param.isHintedDaySelectionEnd, isDayFocused = _param.isDayFocused, isDayDisabled = _param.isDayDisabled, size = _param.size, _param_showNeighboringMonth = _param.showNeighboringMonth, showNeighboringMonth = _param_showNeighboringMonth === void 0 ? false : _param_showNeighboringMonth, dayProps = _param.dayProps, _param_listenDayChangesForUpdate = _param.listenDayChangesForUpdate, listenDayChangesForUpdate = _param_listenDayChangesForUpdate === void 0 ? false : _param_listenDayChangesForUpdate, getRootRef = _param.getRootRef, props = _object_without_properties._(_param, [
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
        "getRootRef"
    ]);
    var locale = (0, _ConfigProviderContext.useConfigProvider)().locale;
    var ref = (0, _useExternRef.useExternRef)(getRootRef);
    var now = (0, _useTodayDate.useTodayDate)(listenDayChangesForUpdate);
    var weeks = _react.useMemo(function() {
        return (0, _calendar.getWeeks)(viewDate, weekStartsOn);
    }, [
        weekStartsOn,
        viewDate
    ]);
    var daysNames = _react.useMemo(function() {
        return (0, _calendar.getDaysNames)(now, weekStartsOn, locale);
    }, [
        locale,
        now,
        weekStartsOn
    ]);
    var handleDayChange = _react.useCallback(function(date) {
        var _ref_current;
        onDayChange(date);
        (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
    }, [
        onDayChange,
        ref
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: "vkuiCalendarDays",
        getRootRef: ref
    }), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCalendarDays__row", size === "s" && "vkuiCalendarDays__row--size-s")
    }, daysNames.map(function(dayName) {
        return /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
            key: dayName,
            className: "vkuiCalendarDays__weekday"
        }, dayName);
    })), weeks.map(function(week, i) {
        return /*#__PURE__*/ _react.createElement("div", {
            className: (0, _vkjs.classNames)("vkuiCalendarDays__row", size === "s" && "vkuiCalendarDays__row--size-s"),
            key: i
        }, week.map(function(day, i) {
            var sameMonth = (0, _date.isSameMonth)(day, viewDate);
            return /*#__PURE__*/ _react.createElement(_CalendarDay.CalendarDay, _object_spread._({
                key: day.toISOString(),
                day: day,
                today: (0, _date.isSameDay)(day, now),
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
                size: size
            }, dayProps));
        }));
    }));
};

//# sourceMappingURL=CalendarDays.js.map