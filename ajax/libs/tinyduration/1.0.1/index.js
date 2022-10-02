"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Construction of the duration regex
var r = function (name, unit) { return "((?<" + name + ">-?\\d*[\\.,]?\\d+)" + unit + ")?"; };
var durationRegex = new RegExp([
    '(?<negativeStr>-)?P',
    r('yearStr', 'Y'),
    r('monthStr', 'M'),
    r('weekStr', 'W'),
    r('dayStr', 'D'),
    '(T',
    r('hourStr', 'H'),
    r('minuteStr', 'M'),
    r('secondStr', 'S'),
    ')?',
].join(''));
function parseNum(s) {
    if (s === '' || s === undefined || s === null) {
        return undefined;
    }
    return parseFloat(s.replace(',', '.'));
}
exports.InvalidDurationError = new Error('Invalid duration');
function parse(durationStr) {
    var match = durationRegex.exec(durationStr);
    if (!match || !match.groups) {
        throw exports.InvalidDurationError;
    }
    var _a = match.groups, negativeStr = _a.negativeStr, yearStr = _a.yearStr, monthStr = _a.monthStr, weekStr = _a.weekStr, hourStr = _a.hourStr, dayStr = _a.dayStr, minuteStr = _a.minuteStr, secondStr = _a.secondStr;
    if (!yearStr && !monthStr && !weekStr && !hourStr && !dayStr && !minuteStr && !secondStr) {
        throw exports.InvalidDurationError;
    }
    return {
        negative: negativeStr === '-' || undefined,
        years: parseNum(yearStr),
        months: parseNum(monthStr),
        weeks: parseNum(weekStr),
        days: parseNum(dayStr),
        hours: parseNum(hourStr),
        minutes: parseNum(minuteStr),
        seconds: parseNum(secondStr),
    };
}
exports.parse = parse;
function toString(duration) {
    if (!duration.years &&
        !duration.months &&
        !duration.weeks &&
        !duration.days &&
        !duration.hours &&
        !duration.minutes &&
        !duration.seconds) {
        return 'PT0S';
    }
    return [
        duration.negative && '-',
        'P',
        duration.years && duration.years + 'Y',
        duration.months && duration.months + 'M',
        duration.weeks && duration.weeks + 'W',
        duration.days && duration.days + 'D',
        (duration.hours || duration.minutes || duration.seconds) && 'T',
        duration.hours && duration.hours + 'H',
        duration.minutes && duration.minutes + 'M',
        duration.seconds && duration.seconds + 'S',
    ].join('');
}
exports.toString = toString;
//# sourceMappingURL=index.js.map