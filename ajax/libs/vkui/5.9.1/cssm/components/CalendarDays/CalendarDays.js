import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useTodayDate } from '../../hooks/useTodayDate';
import { getDaysNames, getWeeks } from '../../lib/calendar';
import { isSameDay, isSameMonth } from '../../lib/date';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './CalendarDays.module.css';
export const CalendarDays = ({ viewDate, value, weekStartsOn, onDayChange, isDaySelected, isDayActive, isDaySelectionEnd, isDaySelectionStart, onDayEnter, onDayLeave, isDayHinted, isHintedDaySelectionStart, isHintedDaySelectionEnd, isDayFocused, isDayDisabled, size, showNeighboringMonth = false, dayProps, listenDayChangesForUpdate = false, getRootRef, ...props })=>{
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
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...props,
        baseClassName: styles['CalendarDays'],
        getRootRef: ref
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['CalendarDays__row'], size === 's' && styles['CalendarDays__row--size-s'])
    }, daysNames.map((dayName)=>/*#__PURE__*/ React.createElement(Footnote, {
            key: dayName,
            className: styles['CalendarDays__weekday']
        }, dayName))), weeks.map((week, i)=>/*#__PURE__*/ React.createElement("div", {
            className: classNames(styles['CalendarDays__row'], size === 's' && styles['CalendarDays__row--size-s']),
            key: i
        }, week.map((day, i)=>{
            const sameMonth = isSameMonth(day, viewDate);
            return /*#__PURE__*/ React.createElement(CalendarDay, {
                key: day.toISOString(),
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
                ...dayProps
            });
        }))));
};

//# sourceMappingURL=CalendarDays.js.map