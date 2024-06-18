import { addDays, addWeeks, eachDayOfInterval, endOfMonth, endOfWeek, isAfter, isBefore, isFirstDayOfMonth, isLastDayOfMonth, isSameDay, startOfMonth, startOfWeek, subDays, subWeeks } from './date';
export const getYears = (currentYear, range)=>{
    const years = [];
    for(let i = currentYear - range; i <= currentYear + range; i++){
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
            label: formatter.format(new Date('1970-01-01').setMonth(i)),
            value: i
        });
    }
    return months;
};
export const getDaysNames = (now, weekStartsOn, locale)=>{
    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'short'
    });
    return eachDayOfInterval(startOfWeek(now, weekStartsOn), endOfWeek(now, weekStartsOn)).map((day)=>formatter.format(day));
};
export const navigateDate = (date, key)=>{
    let newDate = date !== null && date !== void 0 ? date : new Date();
    switch(key){
        case 'ArrowRight':
            newDate = addDays(newDate, 1);
            break;
        case 'ArrowLeft':
            newDate = subDays(newDate, 1);
            break;
        case 'ArrowUp':
            newDate = subWeeks(newDate, 1);
            break;
        case 'ArrowDown':
            newDate = addWeeks(newDate, 1);
            break;
    }
    return newDate;
};
export const getWeeks = (viewDate, weekStartsOn)=>{
    const start = startOfWeek(startOfMonth(viewDate), weekStartsOn);
    const end = endOfWeek(endOfMonth(viewDate), weekStartsOn);
    let count = 0;
    let current = start;
    const nestedWeeks = [];
    let lastDay = null;
    while(isBefore(current, end)){
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
export const isFirstDay = (day, dayOfWeek)=>dayOfWeek === 0 || isFirstDayOfMonth(day);
export const isLastDay = (day, dayOfWeek)=>dayOfWeek === 6 || isLastDayOfMonth(day);
/**
 * Возвращает дату, ограниченную `min` и/или `max` значениями
 */ export function clamp(day, options = {}) {
    const { min, max } = options;
    if (min && isBefore(day, min)) {
        return min;
    }
    if (max && isAfter(day, max)) {
        return max;
    }
    return day;
}
/**
 * Позволяет определить удовлетворяет ли исходная дата заданным ограничения `min` и/или `max`
 */ export function isDayMinMaxRestricted(day, options = {}) {
    const { min, max, withTime = false } = options;
    if (!withTime && (min && isSameDay(day, min) || max && isSameDay(day, max))) {
        return false;
    }
    return Boolean(min && isBefore(day, min) || max && isAfter(day, max));
}

//# sourceMappingURL=calendar.js.map