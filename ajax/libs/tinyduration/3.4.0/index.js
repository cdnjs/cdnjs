"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.parse = exports.MultipleFractionsError = exports.InvalidDurationError = void 0;
const DEFAULT_PARSE_CONFIG = {
    allowMultipleFractions: true,
};
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
    ')?', // end optional time
].join(''));
function parseNum(s) {
    if (s === '' || s === undefined || s === null) {
        return undefined;
    }
    return parseFloat(s.replace(',', '.'));
}
exports.InvalidDurationError = new Error('Invalid duration');
exports.MultipleFractionsError = new Error('Multiple fractions specified');
function parse(durationStr, config = DEFAULT_PARSE_CONFIG) {
    const match = durationRegex.exec(durationStr);
    if (!match || !match.groups) {
        throw exports.InvalidDurationError;
    }
    let empty = true;
    let decimalFractionCount = 0;
    const values = {};
    for (const { unit } of units) {
        if (match.groups[unit]) {
            empty = false;
            values[unit] = parseNum(match.groups[unit]);
            if (!config.allowMultipleFractions && !Number.isInteger(values[unit])) {
                decimalFractionCount++;
                if (decimalFractionCount > 1) {
                    throw exports.MultipleFractionsError;
                }
            }
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
const s = (number, component) => {
    if (!number) {
        return undefined;
    }
    let numberAsString = number.toString();
    const exponentIndex = numberAsString.indexOf('e');
    if (exponentIndex > -1) {
        const magnitude = parseInt(numberAsString.slice(exponentIndex + 2), 10);
        numberAsString = number.toFixed(magnitude + exponentIndex - 2);
    }
    return numberAsString + component;
};
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
    ]
        .filter(Boolean)
        .join('');
}
exports.serialize = serialize;
