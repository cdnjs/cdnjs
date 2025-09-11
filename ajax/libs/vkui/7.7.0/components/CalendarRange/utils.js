import * as React from "react";
import { isSameDate } from "@vkontakte/vkjs";
import { Keys, pressedKey } from "../../lib/accessibility.js";
import { navigateDate, NAVIGATION_KEYS } from "../../lib/calendar.js";
import { isSameMonth, startOfMonth } from "../../lib/date.js";
import { isHTMLElement } from "../../lib/dom.js";
export function useCalendarKeyboardNavigation({ focusedDay, value, setFocusedDay, viewDates: [firstCalendarViewDate, secondCalendarViewDate], setViewDate }) {
    // соотвествует дню, на котором можно сфокусироваться с помощью Tab
    const [focusableDayOnFirstCalendar, setFocusableDayOnFirstCalendar] = React.useState();
    const [focusableDayOnSecondCalendar, setFocusableDayOnSecondCalendar] = React.useState();
    const handleCalendarKeyDown = React.useCallback((event, isFirst)=>{
        const key = pressedKey(event);
        if (!key) {
            return;
        }
        if (NAVIGATION_KEYS.includes(key)) {
            event.preventDefault();
            const newFocusedDay = navigateDate(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value === null || value === void 0 ? void 0 : value[0], key);
            if (newFocusedDay && !isSameMonth(newFocusedDay, firstCalendarViewDate) && !isSameMonth(newFocusedDay, secondCalendarViewDate)) {
                setViewDate(newFocusedDay);
            }
            if (isFirst) {
                if (isSameMonth(newFocusedDay, firstCalendarViewDate)) {
                    setFocusableDayOnFirstCalendar(newFocusedDay);
                } else if (newFocusedDay > firstCalendarViewDate) {
                    setFocusableDayOnSecondCalendar(newFocusedDay);
                }
            } else {
                if (isSameMonth(newFocusedDay, secondCalendarViewDate)) {
                    setFocusableDayOnSecondCalendar(newFocusedDay);
                } else if (newFocusedDay < secondCalendarViewDate) {
                    setFocusableDayOnFirstCalendar(newFocusedDay);
                }
            }
            setFocusedDay(newFocusedDay);
            return;
        }
        if (key === Keys.TAB) {
            setFocusedDay(undefined);
            if (isFirst) {
                setFocusableDayOnFirstCalendar(focusedDay);
            } else {
                setFocusableDayOnSecondCalendar(focusedDay);
            }
            return;
        }
        if ((key === Keys.ENTER || key === Keys.SPACE) && isHTMLElement(event.target)) {
            var _event_target_click, _event_target;
            event.preventDefault();
            (_event_target_click = (_event_target = event.target).click) === null || _event_target_click === void 0 ? void 0 : _event_target_click.call(_event_target);
        }
    }, [
        focusedDay,
        value,
        firstCalendarViewDate,
        secondCalendarViewDate,
        setFocusedDay,
        setViewDate
    ]);
    const handleFirstCalendarKeyDown = React.useCallback((event)=>{
        handleCalendarKeyDown(event, true);
    }, [
        handleCalendarKeyDown
    ]);
    const handleSecondCalendarKeyDown = React.useCallback((event)=>{
        handleCalendarKeyDown(event, false);
    }, [
        handleCalendarKeyDown
    ]);
    const handleDayFocus = React.useCallback((value)=>{
        if (isSameMonth(firstCalendarViewDate, value) && (!focusableDayOnFirstCalendar || !isSameDate(focusableDayOnFirstCalendar, value))) {
            setFocusableDayOnFirstCalendar(value);
        }
        if (isSameMonth(secondCalendarViewDate, value) && (!focusableDayOnSecondCalendar || !isSameDate(focusableDayOnSecondCalendar, value))) {
            setFocusableDayOnSecondCalendar(value);
        }
    }, [
        firstCalendarViewDate,
        focusableDayOnFirstCalendar,
        focusableDayOnSecondCalendar,
        secondCalendarViewDate
    ]);
    return {
        focusableDayOnFirstCalendar,
        focusableDayOnSecondCalendar,
        handleFirstCalendarKeyDown,
        handleSecondCalendarKeyDown,
        handleDayFocus
    };
}
/**
 * Возвращает функцию, которая позволяет проверить является ли день в календаре днём на который
 * можно попасть с помощью Tab.
 * Единственный день в таблице календаря у которого есть tabIndex="0"
 * Чтобы на него можно было попасть из заголовка календаря.
 */ export function useIsDayFocusable({ value, focusableDayOnFirstCalendar, focusableDayOnSecondCalendar, viewDate, isDayActive }) {
    const isValueVisibleOnCalendar = Boolean(value && (value[0] && isSameMonth(value[0], viewDate) || value[1] && isSameMonth(value[1], viewDate)));
    const isCalendarHasFocusableDay = Boolean(focusableDayOnFirstCalendar && isSameMonth(focusableDayOnFirstCalendar, viewDate) || focusableDayOnSecondCalendar && isSameMonth(focusableDayOnSecondCalendar, viewDate));
    const isDayFocusable = React.useCallback((day)=>{
        // если focusableDay день находится среди дней открытого сейчас месяца, то такой день получит tabIndex="0",
        if (isCalendarHasFocusableDay) {
            return Boolean(focusableDayOnFirstCalendar && isSameDate(focusableDayOnFirstCalendar, day) || focusableDayOnSecondCalendar && isSameDate(focusableDayOnSecondCalendar, day));
        }
        // при открытии календаря focusableDay не определён,
        // поэтому tabIndex="0" будет у дня, соответствующего дню в инпуте
        if (isValueVisibleOnCalendar) {
            return isDayActive(day);
        }
        // при переключении месяца любая навигация с помощью Tab начинается
        // с первого дня месяца.
        return isSameDate(startOfMonth(viewDate), day);
    }, [
        isCalendarHasFocusableDay,
        isValueVisibleOnCalendar,
        viewDate,
        isDayActive,
        focusableDayOnFirstCalendar,
        focusableDayOnSecondCalendar
    ]);
    return isDayFocusable;
}

//# sourceMappingURL=utils.js.map