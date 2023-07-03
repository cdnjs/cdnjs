import dayjs from 'dayjs';
export function startOfDay(date) {
    return dayjs(date).startOf('day').toDate();
}
export function endOfDay(date) {
    return dayjs(date).endOf('day').toDate();
}
export function startOfWeek(date, weekStart = 0) {
    weekStart = weekStart % 7;
    const day = dayjs(date);
    const weekDay = day.day();
    const diff = (weekDay < weekStart ? 7 : 0) + weekDay - weekStart;
    return day.date(day.date() - diff).toDate();
}
export function endOfWeek(date, weekStart = 0) {
    const day = dayjs(startOfWeek(date, weekStart));
    return day.date(day.date() + 6).toDate();
}
export function startOfMonth(date) {
    return dayjs(date).startOf('month').toDate();
}
export function endOfMonth(date) {
    return dayjs(date).endOf('month').toDate();
}
export function isFirstDayOfMonth(date) {
    return dayjs(date).date() === 1;
}
export function isLastDayOfMonth(date) {
    // isSameDay -- shorter, but not exact with date-fns behavior
    // return isSameDay(date, dayjs(date).endOf("month"));
    return dayjs(date).endOf('day').isSame(dayjs(date).endOf('month'));
}
export function format(date, format) {
    return dayjs(date).format(format);
}
export function isBefore(date1, date2) {
    // Exactly as date-fns does
    // dayjs().isBefore() for slightly different approach
    return dayjs(date1) < dayjs(date2);
}
export function isAfter(date1, date2) {
    return dayjs(date1) > dayjs(date2);
}
export function isSameDay(date1, date2) {
    return dayjs(date1).isSame(date2, 'day');
}
export function isSameMonth(date1, date2) {
    return dayjs(date1).isSame(date2, 'month');
}
export function isWithinInterval(date, start, end) {
    const day = dayjs(date);
    return day >= dayjs(start) && day <= dayjs(end);
}
export function setMinutes(date, minute) {
    return dayjs(date).set('minute', minute).toDate();
}
export function setHours(date, hour) {
    return dayjs(date).set('hour', hour).toDate();
}
export function setMonth(date, month) {
    return dayjs(date).set('month', month).toDate();
}
export function setYear(date, year) {
    return dayjs(date).set('year', year).toDate();
}
export function addDays(date, day) {
    return dayjs(date).add(day, 'day').toDate();
}
export function subDays(date, day) {
    return dayjs(date).subtract(day, 'day').toDate();
}
export function addWeeks(date, week) {
    return dayjs(date).add(week, 'week').toDate();
}
export function subWeeks(date, week) {
    return dayjs(date).subtract(week, 'week').toDate();
}
export function addMonths(date, month) {
    return dayjs(date).add(month, 'month').toDate();
}
export function subMonths(date, month) {
    return dayjs(date).subtract(month, 'month').toDate();
}
// Rip off date-fns
export function eachDayOfInterval(start, end) {
    const dates = [];
    const startDate = dayjs(start).toDate();
    const endDate = dayjs(end).toDate();
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
export function parse(input, format, referenceDate = new Date()) {
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
export function isMatch(input, format) {
    return !isNaN(+parse(input, format));
}
export function getMillisecondsToTomorrow(date) {
    return dayjs(endOfDay(date)).diff(dayjs(date), 'ms');
}

//# sourceMappingURL=date.js.map