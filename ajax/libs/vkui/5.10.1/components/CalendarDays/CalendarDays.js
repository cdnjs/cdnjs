import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { useTodayDate } from "../../hooks/useTodayDate";
import { getDaysNames, getWeeks } from "../../lib/calendar";
import { isSameDay, isSameMonth } from "../../lib/date";
import { CalendarDay } from "../CalendarDay/CalendarDay";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { RootComponent } from "../RootComponent/RootComponent";
import { Footnote } from "../Typography/Footnote/Footnote";
export var CalendarDays = function(_param) {
    var viewDate = _param.viewDate, value = _param.value, weekStartsOn = _param.weekStartsOn, onDayChange = _param.onDayChange, isDaySelected = _param.isDaySelected, isDayActive = _param.isDayActive, isDaySelectionEnd = _param.isDaySelectionEnd, isDaySelectionStart = _param.isDaySelectionStart, onDayEnter = _param.onDayEnter, onDayLeave = _param.onDayLeave, isDayHinted = _param.isDayHinted, isHintedDaySelectionStart = _param.isHintedDaySelectionStart, isHintedDaySelectionEnd = _param.isHintedDaySelectionEnd, isDayFocused = _param.isDayFocused, isDayDisabled = _param.isDayDisabled, size = _param.size, _param_showNeighboringMonth = _param.showNeighboringMonth, showNeighboringMonth = _param_showNeighboringMonth === void 0 ? false : _param_showNeighboringMonth, dayProps = _param.dayProps, _param_listenDayChangesForUpdate = _param.listenDayChangesForUpdate, listenDayChangesForUpdate = _param_listenDayChangesForUpdate === void 0 ? false : _param_listenDayChangesForUpdate, getRootRef = _param.getRootRef, props = _object_without_properties(_param, [
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
    var locale = useConfigProvider().locale;
    var ref = useExternRef(getRootRef);
    var now = useTodayDate(listenDayChangesForUpdate);
    var weeks = React.useMemo(function() {
        return getWeeks(viewDate, weekStartsOn);
    }, [
        weekStartsOn,
        viewDate
    ]);
    var daysNames = React.useMemo(function() {
        return getDaysNames(now, weekStartsOn, locale);
    }, [
        locale,
        now,
        weekStartsOn
    ]);
    var handleDayChange = React.useCallback(function(date) {
        var _ref_current;
        onDayChange(date);
        (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
    }, [
        onDayChange,
        ref
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: "vkuiCalendarDays",
        getRootRef: ref
    }), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCalendarDays__row", size === "s" && "vkuiCalendarDays__row--size-s")
    }, daysNames.map(function(dayName) {
        return /*#__PURE__*/ React.createElement(Footnote, {
            key: dayName,
            className: "vkuiCalendarDays__weekday"
        }, dayName);
    })), weeks.map(function(week, i) {
        return /*#__PURE__*/ React.createElement("div", {
            className: classNames("vkuiCalendarDays__row", size === "s" && "vkuiCalendarDays__row--size-s"),
            key: i
        }, week.map(function(day, i) {
            var sameMonth = isSameMonth(day, viewDate);
            return /*#__PURE__*/ React.createElement(CalendarDay, _object_spread({
                key: day.toISOString(),
                day: day,
                today: isSameDay(day, now),
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