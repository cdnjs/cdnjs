'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, isSameDate } from "@vkontakte/vkjs";
import { useTodayDate } from "../../hooks/useTodayDate.js";
import { getDaysNames, getWeeks } from "../../lib/calendar.js";
import { isSameMonth } from "../../lib/date.js";
import { CalendarDay } from "../CalendarDay/CalendarDay.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
export const CalendarDays = (_param)=>{
    var { viewDate, value, weekStartsOn, onDayChange, isDaySelected, isDayActive, isDaySelectionEnd, isDaySelectionStart, onDayEnter, onDayLeave, onDayFocus, isDayHinted, isHintedDaySelectionStart, isHintedDaySelectionEnd, isDayFocused, isDayFocusable, isDayDisabled, size, showNeighboringMonth = false, dayProps, listenDayChangesForUpdate = false, getRootRef, renderDayContent, dayTestId } = _param, props = _object_without_properties(_param, [
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
        "onDayFocus",
        "isDayHinted",
        "isHintedDaySelectionStart",
        "isHintedDaySelectionEnd",
        "isDayFocused",
        "isDayFocusable",
        "isDayDisabled",
        "size",
        "showNeighboringMonth",
        "dayProps",
        "listenDayChangesForUpdate",
        "getRootRef",
        "renderDayContent",
        "dayTestId"
    ]);
    const { locale } = useConfigProvider();
    const now = useTodayDate(listenDayChangesForUpdate);
    const weeks = React.useMemo(()=>getWeeks(viewDate, weekStartsOn), [
        weekStartsOn,
        viewDate
    ]);
    const daysNames = React.useMemo(()=>getDaysNames(now, weekStartsOn, locale), [
        locale,
        now,
        weekStartsOn
    ]);
    const handleDayChange = React.useCallback((date)=>{
        onDayChange(date);
    }, [
        onDayChange
    ]);
    const viewDateLabelId = React.useId();
    const currentMonthLabel = value ? new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long'
    }).format(viewDate) : null;
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                "aria-live": "polite",
                id: viewDateLabelId,
                children: currentMonthLabel
            }),
            /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
                role: "grid"
            }, props), {
                baseClassName: "vkuiCalendarDays__host",
                "aria-labelledby": viewDateLabelId,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        role: "row",
                        "aria-rowindex": 1,
                        className: classNames("vkuiCalendarDays__row", size === 's' && "vkuiCalendarDays__rowSizeS"),
                        children: daysNames.map(({ short: shortDayName, long: longDayName })=>/*#__PURE__*/ _jsx(Footnote, {
                                role: "columnheader",
                                "aria-label": longDayName,
                                className: "vkuiCalendarDays__weekday",
                                children: shortDayName
                            }, shortDayName))
                    }),
                    weeks.map((week, i)=>/*#__PURE__*/ _jsx("div", {
                            role: "row",
                            "aria-rowindex": i + 2,
                            className: classNames("vkuiCalendarDays__row", size === 's' && "vkuiCalendarDays__rowSizeS"),
                            children: week.map((day, i)=>{
                                const sameMonth = isSameMonth(day, viewDate);
                                const isHidden = !showNeighboringMonth && !sameMonth;
                                const isToday = isSameDate(day, now);
                                const isActive = isDayActive(day);
                                const isFocused = isDayFocused(day);
                                return /*#__PURE__*/ _jsx(CalendarDay, _object_spread_props(_object_spread({
                                    role: "gridcell",
                                    "aria-current": isToday ? 'date' : undefined,
                                    "aria-selected": isActive ? 'true' : 'false',
                                    "aria-colindex": i + 1,
                                    tabIndex: (isDayFocusable === null || isDayFocusable === void 0 ? void 0 : isDayFocusable(day)) ? 0 : -1,
                                    day: day,
                                    today: isToday,
                                    active: isActive,
                                    onChange: handleDayChange,
                                    hidden: isHidden,
                                    disabled: isDayDisabled(day),
                                    selectionStart: isDaySelectionStart(day, i),
                                    selectionEnd: isDaySelectionEnd(day, i),
                                    hintedSelectionStart: isHintedDaySelectionStart === null || isHintedDaySelectionStart === void 0 ? void 0 : isHintedDaySelectionStart(day, i),
                                    hintedSelectionEnd: isHintedDaySelectionEnd === null || isHintedDaySelectionEnd === void 0 ? void 0 : isHintedDaySelectionEnd(day, i),
                                    selected: isDaySelected === null || isDaySelected === void 0 ? void 0 : isDaySelected(day),
                                    focused: isFocused,
                                    onEnter: onDayEnter,
                                    onLeave: onDayLeave,
                                    onFocus: onDayFocus,
                                    hinted: isDayHinted === null || isDayHinted === void 0 ? void 0 : isDayHinted(day),
                                    sameMonth: sameMonth,
                                    size: size,
                                    renderDayContent: renderDayContent,
                                    testId: dayTestId
                                }, dayProps), {
                                    className: classNames(dayProps === null || dayProps === void 0 ? void 0 : dayProps.className, "vkuiCalendarDays__rowDay")
                                }), day.toISOString());
                            })
                        }, i))
                ]
            }))
        ]
    });
};

//# sourceMappingURL=CalendarDays.js.map