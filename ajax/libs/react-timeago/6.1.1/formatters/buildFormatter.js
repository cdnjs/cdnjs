"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildFormatter;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// If the numbers array is present, format numbers with it,
// otherwise just cast the number to a string and return it
var normalizeNumber = function normalizeNumber(numbers, value) {
  return numbers && numbers.length === 10 ? String(value).split('').map(function (digit) {
    return digit.match(/^[0-9]$/) ? numbers[parseInt(digit)] : digit;
  }).join('') : String(value);
}; // Take a string or a function that takes number of days and returns a string
// and provide a uniform API to create string parts


var normalizeFn = function normalizeFn(value, distanceMillis, numbers) {
  return function (stringOrFn) {
    return typeof stringOrFn === 'function' ? stringOrFn(value, distanceMillis).replace(/%d/g, normalizeNumber(numbers, value)) : stringOrFn.replace(/%d/g, normalizeNumber(numbers, value));
  };
};

function buildFormatter(strings) {
  return function formatter(_value, _unit, suffix, epochMilliseconds, _nextFormmater, now) {
    var current = now();
    var value = _value;
    var unit = _unit; // convert weeks to days if strings don't handle weeks

    if (unit === 'week' && !strings.week && !strings.weeks) {
      var days = Math.round(Math.abs(epochMilliseconds - current) / (1000 * 60 * 60 * 24));
      value = days;
      unit = 'day';
    } // create a normalize function for given value


    var normalize = normalizeFn(value, current - epochMilliseconds, strings.numbers != null ? strings.numbers : undefined); // The eventual return value stored in an array so that the wordSeparator can be used

    var dateString = []; // handle prefixes

    if (suffix === 'ago' && strings.prefixAgo) {
      dateString.push(normalize(strings.prefixAgo));
    }

    if (suffix === 'from now' && strings.prefixFromNow) {
      dateString.push(normalize(strings.prefixFromNow));
    } // Handle Main number and unit


    var isPlural = value > 1;

    if (isPlural) {
      var stringFn = strings[unit + 's'] || strings[unit] || '%d ' + unit;
      dateString.push(normalize(stringFn));
    } else {
      var _stringFn = strings[unit] || strings[unit + 's'] || '%d ' + unit;

      dateString.push(normalize(_stringFn));
    } // Handle Suffixes


    if (suffix === 'ago' && strings.suffixAgo) {
      dateString.push(normalize(strings.suffixAgo));
    }

    if (suffix === 'from now' && strings.suffixFromNow) {
      dateString.push(normalize(strings.suffixFromNow));
    } // join the array into a string and return it


    var wordSeparator = typeof strings.wordSeparator === 'string' ? strings.wordSeparator : ' ';
    return dateString.join(wordSeparator);
  };
}