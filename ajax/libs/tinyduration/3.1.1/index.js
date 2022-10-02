"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const units = [
    { unit: 'years', symbol: 'Y' },
    { unit: 'months', symbol: 'M' },
    { unit: 'weeks', symbol: 'W' },
    { unit: 'days', symbol: 'D' },
    { unit: 'hours', symbol: 'H' },
    { unit: 'minutes', symbol: 'M' },
    { unit: 'seconds', symbol: 'S' },
];
// Construction of the duration regex
const r = (name, unit) => `((?<${name}>-?\\d*[\\.,]?\\d+)${unit})?`;
const durationRegex = new RegExp([
    '(?<negative>-)?P',
    r('years', 'Y'),
    r('months', 'M'),
    r('weeks', 'W'),
    r('days', 'D'),
    '(T',
    r('hours', 'H'),
    r('minutes', 'M'),
    r('seconds', 'S'),
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
    let empty = true;
    const values = {};
    for (const { unit } of units) {
        if (match.groups[unit]) {
            empty = false;
            values[unit] = parseNum(match.groups[unit]);
        }
    }
    if (empty) {
        throw exports.InvalidDurationError;
    }
    const duration = values;
    if (match.groups.negative) {
        duration.negative = true;
    }
    return duration;
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