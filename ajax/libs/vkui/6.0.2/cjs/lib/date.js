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
    addDays: function() {
        return addDays;
    },
    addMonths: function() {
        return addMonths;
    },
    addWeeks: function() {
        return addWeeks;
    },
    eachDayOfInterval: function() {
        return eachDayOfInterval;
    },
    endOfDay: function() {
        return endOfDay;
    },
    endOfMonth: function() {
        return endOfMonth;
    },
    endOfWeek: function() {
        return endOfWeek;
    },
    format: function() {
        return format;
    },
    getMillisecondsToTomorrow: function() {
        return getMillisecondsToTomorrow;
    },
    isAfter: function() {
        return isAfter;
    },
    isBefore: function() {
        return isBefore;
    },
    isFirstDayOfMonth: function() {
        return isFirstDayOfMonth;
    },
    isLastDayOfMonth: function() {
        return isLastDayOfMonth;
    },
    isMatch: function() {
        return isMatch;
    },
    isSameDay: function() {
        return isSameDay;
    },
    isSameMonth: function() {
        return isSameMonth;
    },
    isWithinInterval: function() {
        return isWithinInterval;
    },
    parse: function() {
        return parse;
    },
    setHours: function() {
        return setHours;
    },
    setMinutes: function() {
        return setMinutes;
    },
    setMonth: function() {
        return setMonth;
    },
    setYear: function() {
        return setYear;
    },
    startOfDay: function() {
        return startOfDay;
    },
    startOfMonth: function() {
        return startOfMonth;
    },
    startOfWeek: function() {
        return startOfWeek;
    },
    subDays: function() {
        return subDays;
    },
    subMonths: function() {
        return subMonths;
    },
    subWeeks: function() {
        return subWeeks;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _dayjs = /*#__PURE__*/ _interop_require_default._(require("dayjs"));
function startOfDay(date) {
    return (0, _dayjs.default)(date).startOf('day').toDate();
}
function endOfDay(date) {
    return (0, _dayjs.default)(date).endOf('day').toDate();
}
function startOfWeek(date, weekStart = 0) {
    weekStart = weekStart % 7;
    const day = (0, _dayjs.default)(date);
    const weekDay = day.day();
    const diff = (weekDay < weekStart ? 7 : 0) + weekDay - weekStart;
    return day.date(day.date() - diff).toDate();
}
function endOfWeek(date, weekStart = 0) {
    const day = (0, _dayjs.default)(startOfWeek(date, weekStart));
    return day.date(day.date() + 6).toDate();
}
function startOfMonth(date) {
    return (0, _dayjs.default)(date).startOf('month').toDate();
}
function endOfMonth(date) {
    return (0, _dayjs.default)(date).endOf('month').toDate();
}
function isFirstDayOfMonth(date) {
    return (0, _dayjs.default)(date).date() === 1;
}
function isLastDayOfMonth(date) {
    // isSameDay -- shorter, but not exact with date-fns behavior
    // return isSameDay(date, dayjs(date).endOf("month"));
    return (0, _dayjs.default)(date).endOf('day').isSame((0, _dayjs.default)(date).endOf('month'));
}
function format(date, format) {
    return (0, _dayjs.default)(date).format(format);
}
function isBefore(date1, date2) {
    // Exactly as date-fns does
    // dayjs().isBefore() for slightly different approach
    return (0, _dayjs.default)(date1) < (0, _dayjs.default)(date2);
}
function isAfter(date1, date2) {
    return (0, _dayjs.default)(date1) > (0, _dayjs.default)(date2);
}
function isSameDay(date1, date2) {
    return (0, _dayjs.default)(date1).isSame(date2, 'day');
}
function isSameMonth(date1, date2) {
    return (0, _dayjs.default)(date1).isSame(date2, 'month');
}
function isWithinInterval(date, start, end) {
    const day = (0, _dayjs.default)(date);
    return day >= (0, _dayjs.default)(start) && day <= (0, _dayjs.default)(end);
}
function setMinutes(date, minute) {
    return (0, _dayjs.default)(date).set('minute', minute).toDate();
}
function setHours(date, hour) {
    return (0, _dayjs.default)(date).set('hour', hour).toDate();
}
function setMonth(date, month) {
    return (0, _dayjs.default)(date).set('month', month).toDate();
}
function setYear(date, year) {
    return (0, _dayjs.default)(date).set('year', year).toDate();
}
function addDays(date, day) {
    return (0, _dayjs.default)(date).add(day, 'day').toDate();
}
function subDays(date, day) {
    return (0, _dayjs.default)(date).subtract(day, 'day').toDate();
}
function addWeeks(date, week) {
    return (0, _dayjs.default)(date).add(week, 'week').toDate();
}
function subWeeks(date, week) {
    return (0, _dayjs.default)(date).subtract(week, 'week').toDate();
}
function addMonths(date, month) {
    return (0, _dayjs.default)(date).add(month, 'month').toDate();
}
function subMonths(date, month) {
    return (0, _dayjs.default)(date).subtract(month, 'month').toDate();
}
function eachDayOfInterval(start, end) {
    const dates = [];
    const startDate = (0, _dayjs.default)(start).toDate();
    const endDate = (0, _dayjs.default)(end).toDate();
    const endTime = endDate.getTime();
    const currentDate = startDate;
    currentDate.setHours(0, 0, 0, 0);
    while(currentDate.getTime() <= endTime){
        dates.push(new Date(currentDate.getTime()));
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(0, 0, 0, 0);
    }
    return dates;
}
function parse(input, format, referenceDate = new Date()) {
    const match2 = /^\d\d/; // 00 - 99
    const match4 = /^\d{4}/; // 0000 - 9999
    const entries = [
        [
            'YYYY',
            match4,
            (val)=>[
                    'Y',
                    +val,
                    true
                ]
        ],
        [
            'MM',
            match2,
            (val)=>{
                const numVal = +val;
                const okay = numVal > 0 && numVal <= 12;
                return [
                    'M',
                    numVal - 1,
                    okay
                ];
            }
        ],
        [
            'DD',
            match2,
            (val)=>[
                    'D',
                    +val,
                    true
                ]
        ],
        [
            'HH',
            match2,
            (val)=>{
                const numVal = parseInt(val, 10);
                const okay = numVal >= 0 && numVal < 24;
                return [
                    'h',
                    numVal,
                    okay
                ];
            }
        ],
        [
            'mm',
            match2,
            (val)=>{
                const numVal = parseInt(val, 10);
                const okay = numVal >= 0 && numVal < 60;
                return [
                    'm',
                    numVal,
                    okay
                ];
            }
        ]
    ];
    const superRegExp = new RegExp(entries.map((item)=>item[0]).join('|'), 'g');
    const store = {
        Y: referenceDate.getFullYear(),
        M: referenceDate.getMonth(),
        D: referenceDate.getDate(),
        h: referenceDate.getHours(),
        m: referenceDate.getMinutes(),
        s: referenceDate.getSeconds(),
        ms: referenceDate.getMilliseconds()
    };
    let prevInputIndex = 0;
    let lastNonFormatting = '';
    let lastFormatIndex = 0;
    let found = false;
    while(true){
        const match = superRegExp.exec(format);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const atIndex = superRegExp.lastIndex - length;
        const item = entries.find((item)=>item[0] === match[0]);
        lastNonFormatting = format.slice(lastFormatIndex, atIndex);
        lastFormatIndex = superRegExp.lastIndex;
        if (input.slice(prevInputIndex, prevInputIndex + lastNonFormatting.length) !== lastNonFormatting) {
            return new Date('');
        }
        const value = input.slice(prevInputIndex + lastNonFormatting.length).match(item[1]);
        if (!value) {
            return new Date('');
        }
        prevInputIndex = prevInputIndex + lastNonFormatting.length + value[0].length;
        const [key, newValue, okay] = item[2](value[0]);
        if (!okay) {
            return new Date('');
        }
        store[key] = newValue;
        found = true;
    }
    if (!found) {
        return new Date('');
    }
    const date = new Date(store.Y, store.M, store.D, store.h, store.m, store.s, store.ms);
    // Since days of months are dynamic, they can't be validated in entries,
    // so we check it here, in the finalized date
    if (date.getMonth() !== store.M || date.getDate() !== store.D) {
        return new Date('');
    }
    return date;
}
function isMatch(input, format) {
    return !isNaN(+parse(input, format));
}
function getMillisecondsToTomorrow(date) {
    return (0, _dayjs.default)(endOfDay(date)).diff((0, _dayjs.default)(date), 'ms');
}

//# sourceMappingURL=date.js.map