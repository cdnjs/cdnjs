import { isSameDate } from "@vkontakte/vkjs";
import { clamp as clampNumber } from "../helpers/math.js";
import { Keys } from "./accessibility.js";
import { addDays, addMonths, addWeeks, eachDayOfInterval, endOfMonth, endOfWeek, isLastDayOfMonth, MONDAY, startOfMonth, startOfWeek, subDays, subMonths, subWeeks } from "./date.js";
export const DEFAULT_MAX_YEAR = 9999;
// 100 - из-за ограничений dayjs https://github.com/iamkun/dayjs/issues/2591
export const DEFAULT_MIN_YEAR = 100;
export const getYears = (currentYear, range)=>{
    const years = [];
    const minYear = clampNumber(currentYear - range, DEFAULT_MIN_YEAR, DEFAULT_MAX_YEAR);
    const maxYear = clampNumber(currentYear + range, DEFAULT_MIN_YEAR, DEFAULT_MAX_YEAR);
    for(let i = minYear; i <= maxYear; i++){
        years.push({
            label: String(i).padStart(4, '0'),
            value: i
        });
    }
    return years;
};
export const getMonths = (locale)=>{
    const months = [];
    const formatter = new Intl.DateTimeFormat(locale, {
        month: 'long'
    });
    for(let i = 0; i < 12; i++){
        months.push({
            label: formatter.format(new Date(2023, i, 15)),
            value: i
        });
    }
    return months;
};
export const getDaysNames = (now, weekStartsOn, locale)=>{
    const shortFormatter = new Intl.DateTimeFormat(locale, {
        weekday: 'short'
    });
    const longFormatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long'
    });
    return eachDayOfInterval(startOfWeek(now, {
        weekStartsOn
    }), endOfWeek(now, {
        weekStartsOn
    })).map((day)=>({
            short: shortFormatter.format(day),
            long: longFormatter.format(day)
        }));
};
export const NAVIGATION_KEYS = [
    Keys.ARROW_UP,
    Keys.ARROW_DOWN,
    Keys.ARROW_LEFT,
    Keys.ARROW_RIGHT,
    Keys.HOME,
    Keys.END,
    Keys.PAGE_UP,
    Keys.PAGE_DOWN
];
export const navigateDate = (date, key)=>{
    let newDate = date ?? new Date();
    switch(key){
        case Keys.ARROW_RIGHT:
            newDate = addDays(newDate, 1);
            break;
        case Keys.ARROW_LEFT:
            newDate = subDays(newDate, 1);
            break;
        case Keys.ARROW_UP:
            newDate = subWeeks(newDate, 1);
            break;
        case Keys.ARROW_DOWN:
            newDate = addWeeks(newDate, 1);
            break;
        case Keys.HOME:
            newDate = startOfWeek(newDate, {
                weekStartsOn: MONDAY
            });
            break;
        case Keys.END:
            newDate = endOfWeek(newDate, {
                weekStartsOn: MONDAY
            });
            break;
        case Keys.PAGE_UP:
            newDate = subMonths(newDate, 1);
            break;
        case Keys.PAGE_DOWN:
            newDate = addMonths(newDate, 1);
            break;
    }
    return newDate;
};
export const getWeeks = (viewDate, weekStartsOn)=>{
    const start = startOfWeek(startOfMonth(viewDate), {
        weekStartsOn
    });
    const end = endOfWeek(endOfMonth(viewDate), {
        weekStartsOn
    });
    let count = 0;
    let current = start;
    const nestedWeeks = [];
    let lastDay = null;
    while(current < end){
        const weekNumber = Math.floor(count / 7);
        nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
        const day = current.getDay();
        if (lastDay !== day) {
            lastDay = day;
            nestedWeeks[weekNumber].push(current);
            count += 1;
        }
        current = addDays(current, 1);
    }
    return nestedWeeks;
};
export const setTimeEqual = (to, from)=>{
    if (from) {
        to.setHours(from.getHours());
        to.setMinutes(from.getMinutes());
        to.setSeconds(from.getSeconds());
        to.setMilliseconds(from.getMilliseconds());
    }
    return to;
};
export const isFirstDay = (day, dayOfWeek)=>dayOfWeek === 0 || day.getDate() === 1;
export const isLastDay = (day, dayOfWeek)=>dayOfWeek === 6 || isLastDayOfMonth(day);
/**
 * Возвращает дату, ограниченную `min` и/или `max` значениями
 */ export function clamp(day, options = {}) {
    const { min, max } = options;
    if (min && day < min) {
        return min;
    }
    if (max && day > max) {
        return max;
    }
    return day;
}
/**
 * Позволяет определить удовлетворяет ли исходная дата заданным ограничения `min` и/или `max`
 */ export function isDayMinMaxRestricted(day, options = {}) {
    const { min, max, withTime = false } = options;
    if (!withTime && (min && isSameDate(day, min) || max && isSameDate(day, max))) {
        return false;
    }
    return Boolean(min && day < min || max && day > max);
}

//# sourceMappingURL=calendar.js.map