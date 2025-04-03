'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { isSameDay, isSameMonth } from "date-fns";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useTodayDate } from "../../hooks/useTodayDate.js";
import { getDaysNames, getWeeks } from "../../lib/calendar.js";
import { CalendarDay } from "../CalendarDay/CalendarDay.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import styles from "./CalendarDays.module.css";
export const CalendarDays = ({ viewDate, value, weekStartsOn, onDayChange, isDaySelected, isDayActive, isDaySelectionEnd, isDaySelectionStart, onDayEnter, onDayLeave, isDayHinted, isHintedDaySelectionStart, isHintedDaySelectionEnd, isDayFocused, isDayDisabled, size, showNeighboringMonth = false, dayProps, listenDayChangesForUpdate = false, getRootRef, renderDayContent, dayTestId, ...props })=>{
    const { locale } = useConfigProvider();
    const ref = useExternRef(getRootRef);
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
        ref.current?.focus();
    }, [
        onDayChange,
        ref
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...props,
        baseClassName: styles.host,
        getRootRef: ref,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.row, size === 's' && styles.rowSizeS),
                children: daysNames.map((dayName)=>/*#__PURE__*/ _jsx(Footnote, {
                        className: styles.weekday,
                        children: dayName
                    }, dayName))
            }),
            weeks.map((week, i)=>/*#__PURE__*/ _jsx("div", {
                    className: classNames(styles.row, size === 's' && styles.rowSizeS),
                    children: week.map((day, i)=>{
                        const sameMonth = isSameMonth(day, viewDate);
                        return /*#__PURE__*/ _jsx(CalendarDay, {
                            day: day,
                            today: isSameDay(day, now),
                            active: isDayActive(day),
                            onChange: handleDayChange,
                            hidden: !showNeighboringMonth && !sameMonth,
                            disabled: isDayDisabled(day),
                            selectionStart: isDaySelectionStart(day, i),
                            selectionEnd: isDaySelectionEnd(day, i),
                            hintedSelectionStart: isHintedDaySelectionStart?.(day, i),
                            hintedSelectionEnd: isHintedDaySelectionEnd?.(day, i),
                            selected: isDaySelected?.(day),
                            focused: isDayFocused(day),
                            onEnter: onDayEnter,
                            onLeave: onDayLeave,
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
    });
};

//# sourceMappingURL=CalendarDays.js.map