import { addDays, addWeeks, eachDayOfInterval, endOfMonth, endOfWeek, isAfter, isBefore, isFirstDayOfMonth, isLastDayOfMonth, isSameDay, startOfMonth, startOfWeek, subDays, subWeeks } from "./date";
export var getYears = function(currentYear, range) {
    var years = [];
    for(var i = currentYear - range; i <= currentYear + range; i++){
        years.push({
            label: String(i).padStart(4, "0"),
            value: i
        });
    }
    return years;
};
export var getMonths = function(locale) {
    var months = [];
    var formatter = new Intl.DateTimeFormat(locale, {
        month: "long"
    });
    for(var i = 0; i < 12; i++){
        months.push({
            label: formatter.format(new Date("1970-01-01").setMonth(i)),
            value: i
        });
    }
    return months;
};
export var getDaysNames = function(now, weekStartsOn, locale) {
    var formatter = new Intl.DateTimeFormat(locale, {
        weekday: "short"
    });
    return eachDayOfInterval(startOfWeek(now, weekStartsOn), endOfWeek(now, weekStartsOn)).map(function(day) {
        return formatter.format(day);
    });
};
export var navigateDate = function(date, key) {
    var newDate = date !== null && date !== void 0 ? date : new Date();
    switch(key){
        case "ArrowRight":
            newDate = addDays(newDate, 1);
            break;
        case "ArrowLeft":
            newDate = subDays(newDate, 1);
            break;
        case "ArrowUp":
            newDate = subWeeks(newDate, 1);
            break;
        case "ArrowDown":
            newDate = addWeeks(newDate, 1);
            break;
    }
    return newDate;
};
export var getWeeks = function(viewDate, weekStartsOn) {
    var start = startOfWeek(startOfMonth(viewDate), weekStartsOn);
    var end = endOfWeek(endOfMonth(viewDate), weekStartsOn);
    var count = 0;
    var current = start;
    var nestedWeeks = [];
    var lastDay = null;
    while(isBefore(current, end)){
        var weekNumber = Math.floor(count / 7);
        nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
        var day = current.getDay();
        if (lastDay !== day) {
            lastDay = day;
            nestedWeeks[weekNumber].push(current);
            count += 1;
        }
        current = addDays(current, 1);
    }
    return nestedWeeks;
};
export var setTimeEqual = function(to, from) {
    if (from) {
        to.setHours(from.getHours());
        to.setMinutes(from.getMinutes());
        to.setSeconds(from.getSeconds());
        to.setMilliseconds(from.getMilliseconds());
    }
    return to;
};
export var isFirstDay = function(day, dayOfWeek) {
    return dayOfWeek === 0 || isFirstDayOfMonth(day);
};
export var isLastDay = function(day, dayOfWeek) {
    return dayOfWeek === 6 || isLastDayOfMonth(day);
};
/**
 * Возвращает дату, ограниченную `min` и/или `max` значениями
 */ export function clamp(day) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var min = options.min, max = options.max;
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
 */ export function isDayMinMaxRestricted(day) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var min = options.min, max = options.max, _options_withTime = options.withTime, withTime = _options_withTime === void 0 ? false : _options_withTime;
    if (!withTime && (min && isSameDay(day, min) || max && isSameDay(day, max))) {
        return false;
    }
    return Boolean(min && isBefore(day, min) || max && isAfter(day, max));
}

//# sourceMappingURL=calendar.js.map