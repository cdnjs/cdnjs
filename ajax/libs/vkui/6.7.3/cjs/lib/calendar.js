"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_MAX_YEAR: function() {
        return DEFAULT_MAX_YEAR;
    },
    DEFAULT_MIN_YEAR: function() {
        return DEFAULT_MIN_YEAR;
    },
    clamp: function() {
        return clamp;
    },
    getDaysNames: function() {
        return getDaysNames;
    },
    getMonths: function() {
        return getMonths;
    },
    getWeeks: function() {
        return getWeeks;
    },
    getYears: function() {
        return getYears;
    },
    isDayMinMaxRestricted: function() {
        return isDayMinMaxRestricted;
    },
    isFirstDay: function() {
        return isFirstDay;
    },
    isLastDay: function() {
        return isLastDay;
    },
    navigateDate: function() {
        return navigateDate;
    },
    setTimeEqual: function() {
        return setTimeEqual;
    }
});
const _datefns = require("date-fns");
const _math = require("../helpers/math");
const DEFAULT_MAX_YEAR = 9999;
const DEFAULT_MIN_YEAR = 100;
const getYears = (currentYear, range)=>{
    const years = [];
    const minYear = (0, _math.clamp)(currentYear - range, DEFAULT_MIN_YEAR, DEFAULT_MAX_YEAR);
    const maxYear = (0, _math.clamp)(currentYear + range, DEFAULT_MIN_YEAR, DEFAULT_MAX_YEAR);
    for(let i = minYear; i <= maxYear; i++){
        years.push({
            label: String(i).padStart(4, '0'),
            value: i
        });
    }
    return years;
};
const getMonths = (locale)=>{
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
const getDaysNames = (now, weekStartsOn, locale)=>{
    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'short'
    });
    return (0, _datefns.eachDayOfInterval)({
        start: (0, _datefns.startOfWeek)(now, {
            weekStartsOn
        }),
        end: (0, _datefns.endOfWeek)(now, {
            weekStartsOn
        })
    }).map((day)=>formatter.format(day));
};
const navigateDate = (date, key)=>{
    let newDate = date !== null && date !== void 0 ? date : new Date();
    switch(key){
        case 'ArrowRight':
            newDate = (0, _datefns.addDays)(newDate, 1);
            break;
        case 'ArrowLeft':
            newDate = (0, _datefns.subDays)(newDate, 1);
            break;
        case 'ArrowUp':
            newDate = (0, _datefns.subWeeks)(newDate, 1);
            break;
        case 'ArrowDown':
            newDate = (0, _datefns.addWeeks)(newDate, 1);
            break;
    }
    return newDate;
};
const getWeeks = (viewDate, weekStartsOn)=>{
    const start = (0, _datefns.startOfWeek)((0, _datefns.startOfMonth)(viewDate), {
        weekStartsOn
    });
    const end = (0, _datefns.endOfWeek)((0, _datefns.endOfMonth)(viewDate), {
        weekStartsOn
    });
    let count = 0;
    let current = start;
    const nestedWeeks = [];
    let lastDay = null;
    while((0, _datefns.isBefore)(current, end)){
        const weekNumber = Math.floor(count / 7);
        nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
        const day = current.getDay();
        if (lastDay !== day) {
            lastDay = day;
            nestedWeeks[weekNumber].push(current);
            count += 1;
        }
        current = (0, _datefns.addDays)(current, 1);
    }
    return nestedWeeks;
};
const setTimeEqual = (to, from)=>{
    if (from) {
        to.setHours(from.getHours());
        to.setMinutes(from.getMinutes());
        to.setSeconds(from.getSeconds());
        to.setMilliseconds(from.getMilliseconds());
    }
    return to;
};
const isFirstDay = (day, dayOfWeek)=>dayOfWeek === 0 || (0, _datefns.isFirstDayOfMonth)(day);
const isLastDay = (day, dayOfWeek)=>dayOfWeek === 6 || (0, _datefns.isLastDayOfMonth)(day);
function clamp(day, options = {}) {
    const { min, max } = options;
    if (min && (0, _datefns.isBefore)(day, min)) {
        return min;
    }
    if (max && (0, _datefns.isAfter)(day, max)) {
        return max;
    }
    return day;
}
function isDayMinMaxRestricted(day, options = {}) {
    const { min, max, withTime = false } = options;
    if (!withTime && (min && (0, _datefns.isSameDay)(day, min) || max && (0, _datefns.isSameDay)(day, max))) {
        return false;
    }
    return Boolean(min && (0, _datefns.isBefore)(day, min) || max && (0, _datefns.isAfter)(day, max));
}

//# sourceMappingURL=calendar.js.map