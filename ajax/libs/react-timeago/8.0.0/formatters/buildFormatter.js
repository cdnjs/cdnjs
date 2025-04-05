"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildFormatter;
var normalizeNumber = function normalizeNumber(numbers, value) {
  return numbers && numbers.length === 10 ? String(value).split('').map(function (digit) {
    return digit.match(/^[0-9]$/) ? numbers[parseInt(digit)] : digit;
  }).join('') : String(value);
};
var normalizeFn = function normalizeFn(value, distanceMillis, numbers) {
  return function (stringOrFn) {
    return typeof stringOrFn === 'function' ? stringOrFn(value, distanceMillis).replace(/%d/g, normalizeNumber(numbers, value)) : stringOrFn.replace(/%d/g, normalizeNumber(numbers, value));
  };
};
var pluralize = function pluralize(unit) {
  switch (unit) {
    case 'second':
      return 'seconds';
    case 'minute':
      return 'minutes';
    case 'hour':
      return 'hours';
    case 'day':
      return 'days';
    case 'week':
      return 'weeks';
    case 'month':
      return 'months';
    case 'year':
      return 'years';
    default:
      return unit;
  }
};
function buildFormatter(strings) {
  return function formatter(_value, _unit, suffix, epochMilliseconds, _nextFormmater, now) {
    var current = now();
    var value = _value;
    var unit = _unit;
    if (unit === 'week' && !strings.week && !strings.weeks) {
      var days = Math.round(Math.abs(epochMilliseconds - current) / (1000 * 60 * 60 * 24));
      value = days;
      unit = 'day';
    }
    var normalize = normalizeFn(value, current - epochMilliseconds, strings.numbers != null ? strings.numbers : undefined);
    var dateString = [];
    if (suffix === 'ago' && strings.prefixAgo) {
      dateString.push(normalize(strings.prefixAgo));
    }
    if (suffix === 'from now' && strings.prefixFromNow) {
      dateString.push(normalize(strings.prefixFromNow));
    }
    var isPlural = value > 1;
    if (isPlural) {
      var stringFn = strings[pluralize(unit)] || strings[unit] || '%d ' + unit;
      dateString.push(normalize(stringFn));
    } else {
      var _stringFn = strings[unit] || strings[pluralize(unit)] || '%d ' + unit;
      dateString.push(normalize(_stringFn));
    }
    if (suffix === 'ago' && strings.suffixAgo) {
      dateString.push(normalize(strings.suffixAgo));
    }
    if (suffix === 'from now' && strings.suffixFromNow) {
      dateString.push(normalize(strings.suffixFromNow));
    }
    var wordSeparator = typeof strings.wordSeparator === 'string' ? strings.wordSeparator : ' ';
    return dateString.join(wordSeparator);
  };
}