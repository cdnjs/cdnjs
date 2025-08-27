'use client';
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
import styles from "./CalendarDays.module.css";
export const CalendarDays = ({ viewDate, value, weekStartsOn, onDayChange, isDaySelected, isDayActive, isDaySelectionEnd, isDaySelectionStart, onDayEnter, onDayLeave, onDayFocus, isDayHinted, isHintedDaySelectionStart, isHintedDaySelectionEnd, isDayFocused, isDayFocusable, isDayDisabled, size, showNeighboringMonth = false, dayProps, listenDayChangesForUpdate = false, getRootRef, renderDayContent, dayTestId, ...props })=>{
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
            /*#__PURE__*/ _jsxs(RootComponent, {
                role: "grid",
                ...props,
                baseClassName: styles.host,
                "aria-labelledby": viewDateLabelId,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        role: "row",
                        "aria-rowindex": 1,
                        className: classNames(styles.row, size === 's' && styles.rowSizeS),
                        children: daysNames.map(({ short: shortDayName, long: longDayName })=>/*#__PURE__*/ _jsx(Footnote, {
                                role: "columnheader",
                                "aria-label": longDayName,
                                className: styles.weekday,
                                children: shortDayName
                            }, shortDayName))
                    }),
                    weeks.map((week, i)=>/*#__PURE__*/ _jsx("div", {
                            role: "row",
                            "aria-rowindex": i + 2,
                            className: classNames(styles.row, size === 's' && styles.rowSizeS),
                            children: week.map((day, i)=>{
                                const sameMonth = isSameMonth(day, viewDate);
                                const isHidden = !showNeighboringMonth && !sameMonth;
                                const isToday = isSameDate(day, now);
                                const isActive = isDayActive(day);
                                const isFocused = isDayFocused(day);
                                return /*#__PURE__*/ _jsx(CalendarDay, {
                                    role: "gridcell",
                                    "aria-current": isToday ? 'date' : undefined,
                                    "aria-selected": isActive ? 'true' : 'false',
                                    "aria-colindex": i + 1,
                                    tabIndex: isDayFocusable?.(day) ? 0 : -1,
                                    day: day,
                                    today: isToday,
                                    active: isActive,
                                    onChange: handleDayChange,
                                    hidden: isHidden,
                                    disabled: isDayDisabled(day),
                                    selectionStart: isDaySelectionStart(day, i),
                                    selectionEnd: isDaySelectionEnd(day, i),
                                    hintedSelectionStart: isHintedDaySelectionStart?.(day, i),
                                    hintedSelectionEnd: isHintedDaySelectionEnd?.(day, i),
                                    selected: isDaySelected?.(day),
                                    focused: isFocused,
                                    onEnter: onDayEnter,
                                    onLeave: onDayLeave,
                                    onFocus: onDayFocus,
                                    hinted: isDayHinted?.(day),
                                    sameMonth: sameMonth,
                                    size: size,
                                    renderDayContent: renderDayContent,
                                    testId: dayTestId,
                                    ...dayProps,
                                    className: classNames(dayProps?.className, styles.rowDay)
                                }, day.toISOString());
                            })
                        }, i))
                ]
            })
        ]
    });
};

//# sourceMappingURL=CalendarDays.js.map