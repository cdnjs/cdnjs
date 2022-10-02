"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Construction of the duration regex
const r = (name, unit) => `((?<${name}>-?\\d*[\\.,]?\\d+)${unit})?`;
const durationRegex = new RegExp([
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
    const match = durationRegex.exec(durationStr);
    if (!match || !match.groups) {
        throw exports.InvalidDurationError;
    }
    const { negativeStr, yearStr, monthStr, weekStr, hourStr, dayStr, minuteStr, secondStr } = match.groups;
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
const s = (n, s) => (n ? n + s : undefined);
function serialize(duration) {
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
        s(duration.years, 'Y'),
        s(duration.months, 'M'),
        s(duration.weeks, 'W'),
        s(duration.days, 'D'),
        (duration.hours || duration.minutes || duration.seconds) && 'T',
        s(duration.hours, 'H'),
        s(duration.minutes, 'M'),
        s(duration.seconds, 'S'),
    ].join('');
}
exports.serialize = serialize;
//# sourceMappingURL=index.js.map