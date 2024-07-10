/*!
  react-datepicker v7.1.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clsx = require('clsx');
var React = require('react');
var onClickOutside = require('react-onclickoutside');
var addDays = require('date-fns/addDays');
var addHours = require('date-fns/addHours');
var addMinutes = require('date-fns/addMinutes');
var addMonths = require('date-fns/addMonths');
var addQuarters = require('date-fns/addQuarters');
var addSeconds = require('date-fns/addSeconds');
var addWeeks = require('date-fns/addWeeks');
var addYears = require('date-fns/addYears');
var differenceInCalendarDays = require('date-fns/differenceInCalendarDays');
var differenceInCalendarMonths = require('date-fns/differenceInCalendarMonths');
var differenceInCalendarQuarters = require('date-fns/differenceInCalendarQuarters');
var differenceInCalendarYears = require('date-fns/differenceInCalendarYears');
var endOfDay = require('date-fns/endOfDay');
var endOfMonth = require('date-fns/endOfMonth');
var endOfWeek = require('date-fns/endOfWeek');
var endOfYear = require('date-fns/endOfYear');
var format = require('date-fns/format');
var getDate = require('date-fns/getDate');
var getDay = require('date-fns/getDay');
var getHours = require('date-fns/getHours');
var getISOWeek = require('date-fns/getISOWeek');
var getMinutes = require('date-fns/getMinutes');
var getMonth = require('date-fns/getMonth');
var getQuarter = require('date-fns/getQuarter');
var getSeconds = require('date-fns/getSeconds');
var getTime = require('date-fns/getTime');
var getYear = require('date-fns/getYear');
var isAfter = require('date-fns/isAfter');
var isBefore = require('date-fns/isBefore');
var isDate = require('date-fns/isDate');
var isEqual$1 = require('date-fns/isEqual');
var isSameDay$1 = require('date-fns/isSameDay');
var isSameMonth$1 = require('date-fns/isSameMonth');
var isSameQuarter$1 = require('date-fns/isSameQuarter');
var isSameYear$1 = require('date-fns/isSameYear');
var isValid$1 = require('date-fns/isValid');
var isWithinInterval = require('date-fns/isWithinInterval');
var max = require('date-fns/max');
var min = require('date-fns/min');
var parse = require('date-fns/parse');
var parseISO = require('date-fns/parseISO');
var set = require('date-fns/set');
var setHours = require('date-fns/setHours');
var setMinutes = require('date-fns/setMinutes');
var setMonth = require('date-fns/setMonth');
var setQuarter = require('date-fns/setQuarter');
var setSeconds = require('date-fns/setSeconds');
var setYear = require('date-fns/setYear');
var startOfDay = require('date-fns/startOfDay');
var startOfMonth = require('date-fns/startOfMonth');
var startOfQuarter = require('date-fns/startOfQuarter');
var startOfWeek = require('date-fns/startOfWeek');
var startOfYear = require('date-fns/startOfYear');
var subDays = require('date-fns/subDays');
var subMonths = require('date-fns/subMonths');
var subQuarters = require('date-fns/subQuarters');
var subWeeks = require('date-fns/subWeeks');
var subYears = require('date-fns/subYears');
var toDate = require('date-fns/toDate');
var react = require('@floating-ui/react');
var ReactDOM = require('react-dom');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var onClickOutside__default = /*#__PURE__*/_interopDefaultCompat(onClickOutside);
var ReactDOM__default = /*#__PURE__*/_interopDefaultCompat(ReactDOM);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var CalendarContainer = function (_a) {
    var _b = _a.showTimeSelectOnly, showTimeSelectOnly = _b === void 0 ? false : _b, _c = _a.showTime, showTime = _c === void 0 ? false : _c, className = _a.className, children = _a.children;
    var ariaLabel = showTimeSelectOnly
        ? "Choose Time"
        : "Choose Date".concat(showTime ? " and Time" : "");
    return (React__default.default.createElement("div", { className: className, role: "dialog", "aria-label": ariaLabel, "aria-modal": "true" }, children));
};

var KeyType;
(function (KeyType) {
    KeyType["ArrowUp"] = "ArrowUp";
    KeyType["ArrowDown"] = "ArrowDown";
    KeyType["ArrowLeft"] = "ArrowLeft";
    KeyType["ArrowRight"] = "ArrowRight";
    KeyType["PageUp"] = "PageUp";
    KeyType["PageDown"] = "PageDown";
    KeyType["Home"] = "Home";
    KeyType["End"] = "End";
    KeyType["Enter"] = "Enter";
    KeyType["Space"] = " ";
    KeyType["Tab"] = "Tab";
    KeyType["Escape"] = "Escape";
    KeyType["Backspace"] = "Backspace";
    KeyType["X"] = "x";
})(KeyType || (KeyType = {}));
function getLocaleScope() {
    // Use this cast to avoid messing with users globalThis (like window) and the rest of keys in the globalThis object we don't care about
    var scope = (typeof window !== "undefined"
        ? window
        : globalThis);
    return scope;
}
var DEFAULT_YEAR_ITEM_NUMBER = 12;
// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
// ** Date Constructors **
function newDate(value) {
    if (value == null) {
        return new Date();
    }
    var d = typeof value === "string" ? parseISO.parseISO(value) : toDate.toDate(value);
    return isValid(d) ? d : new Date();
}
/**
 * Parses a date.
 *
 * @param value - The string representing the Date in a parsable form, e.g., ISO 1861
 * @param dateFormat - The date format.
 * @param locale - The locale.
 * @param strictParsing - The strict parsing flag.
 * @param minDate - The minimum date.
 * @returns - The parsed date or null.
 */
function parseDate(value, dateFormat, locale, strictParsing, minDate) {
    var _a;
    var parsedDate = null;
    var localeObject = getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
    var strictParsingValueMatch = true;
    if (Array.isArray(dateFormat)) {
        dateFormat.forEach(function (df) {
            var tryParseDate = parse.parse(value, df, new Date(), {
                locale: localeObject,
                useAdditionalWeekYearTokens: true,
                useAdditionalDayOfYearTokens: true,
            });
            if (strictParsing) {
                strictParsingValueMatch =
                    isValid(tryParseDate, minDate) &&
                        value === formatDate(tryParseDate, df, locale);
            }
            if (isValid(tryParseDate, minDate) && strictParsingValueMatch) {
                parsedDate = tryParseDate;
            }
        });
        return parsedDate;
    }
    parsedDate = parse.parse(value, dateFormat, new Date(), {
        locale: localeObject,
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true,
    });
    if (strictParsing) {
        strictParsingValueMatch =
            isValid(parsedDate) &&
                value === formatDate(parsedDate, dateFormat, locale);
    }
    else if (!isValid(parsedDate)) {
        var format_1 = ((_a = dateFormat.match(longFormattingTokensRegExp)) !== null && _a !== void 0 ? _a : [])
            .map(function (substring) {
            var firstCharacter = substring[0];
            if (firstCharacter === "p" || firstCharacter === "P") {
                // The type in date-fns is `Record<string, LongFormatter>` so we can do our firstCharacter a bit loos but I don't think that this is a good idea
                var longFormatter = format.longFormatters[firstCharacter];
                return localeObject
                    ? longFormatter(substring, localeObject.formatLong)
                    : firstCharacter;
            }
            return substring;
        })
            .join("");
        if (value.length > 0) {
            parsedDate = parse.parse(value, format_1.slice(0, value.length), new Date(), {
                useAdditionalWeekYearTokens: true,
                useAdditionalDayOfYearTokens: true,
            });
        }
        if (!isValid(parsedDate)) {
            parsedDate = new Date(value);
        }
    }
    return isValid(parsedDate) && strictParsingValueMatch ? parsedDate : null;
}
/**
 * Checks if a given date is valid and not before the minimum date.
 * @param date - The date to be checked.
 * @param minDate - The minimum date allowed. If not provided, defaults to "1/1/1800".
 * @returns A boolean value indicating whether the date is valid and not before the minimum date.
 */
function isValid(date, minDate) {
    /* the fallback date is essential to not break test case
     * `should auto update calendar when the updated date text is after props.minDate`
     * and backward compatibility respectfully
     */
    return isValid$1.isValid(date) && !isBefore.isBefore(date, minDate !== null && minDate !== void 0 ? minDate : new Date("1/1/1800"));
}
// ** Date Formatting **
/**
 * Formats a date.
 *
 * @param date - The date.
 * @param formatStr - The format string.
 * @param locale - The locale.
 * @returns - The formatted date.
 */
function formatDate(date, formatStr, locale) {
    if (locale === "en") {
        return format.format(date, formatStr, {
            useAdditionalWeekYearTokens: true,
            useAdditionalDayOfYearTokens: true,
        });
    }
    var localeObj = locale ? getLocaleObject(locale) : undefined;
    if (locale && !localeObj) {
        console.warn("A locale object was not found for the provided string [\"".concat(locale, "\"]."));
    }
    if (!localeObj &&
        !!getDefaultLocale() &&
        !!getLocaleObject(getDefaultLocale())) {
        localeObj = getLocaleObject(getDefaultLocale());
    }
    return format.format(date, formatStr, {
        locale: localeObj,
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true,
    });
}
/**
 * Safely formats a date.
 *
 * @param date - The date.
 * @param options - An object containing the dateFormat and locale.
 * @returns - The formatted date or an empty string.
 */
function safeDateFormat(date, _a) {
    var dateFormat = _a.dateFormat, locale = _a.locale;
    var formatStr = (Array.isArray(dateFormat) && dateFormat.length > 0
        ? dateFormat[0]
        : dateFormat); // Cast to string because it's impossible to get `string | string[] | undefined` here and typescript doesn't know that
    return (date && formatDate(date, formatStr, locale)) || "";
}
/**
 * Safely formats a date range.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @param props - The props.
 * @returns - The formatted date range or an empty string.
 */
function safeDateRangeFormat(startDate, endDate, props) {
    if (!startDate) {
        return "";
    }
    var formattedStartDate = safeDateFormat(startDate, props);
    var formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";
    return "".concat(formattedStartDate, " - ").concat(formattedEndDate);
}
/**
 * Safely formats multiple dates.
 *
 * @param dates - The dates.
 * @param props - The props.
 * @returns - The formatted dates or an empty string.
 */
function safeMultipleDatesFormat(dates, props) {
    if (!(dates === null || dates === void 0 ? void 0 : dates.length)) {
        return "";
    }
    var formattedFirstDate = dates[0] ? safeDateFormat(dates[0], props) : "";
    if (dates.length === 1) {
        return formattedFirstDate;
    }
    if (dates.length === 2 && dates[1]) {
        var formattedSecondDate = safeDateFormat(dates[1], props);
        return "".concat(formattedFirstDate, ", ").concat(formattedSecondDate);
    }
    var extraDatesCount = dates.length - 1;
    return "".concat(formattedFirstDate, " (+").concat(extraDatesCount, ")");
}
// ** Date Setters **
/**
 * Sets the time for a given date.
 *
 * @param date - The date.
 * @param time - An object containing the hour, minute, and second.
 * @returns - The date with the time set.
 */
function setTime(date, _a) {
    var _b = _a.hour, hour = _b === void 0 ? 0 : _b, _c = _a.minute, minute = _c === void 0 ? 0 : _c, _d = _a.second, second = _d === void 0 ? 0 : _d;
    return setHours.setHours(setMinutes.setMinutes(setSeconds.setSeconds(date, second), minute), hour);
}
/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
function getWeek(date) {
    return getISOWeek.getISOWeek(date);
}
/**
 * Gets the day of the week code for a given day.
 *
 * @param day - The day.
 * @param locale - The locale.
 * @returns - The day of the week code.
 */
function getDayOfWeekCode(day, locale) {
    return formatDate(day, "ddd", locale);
}
// *** Start of ***
/**
 * Gets the start of the day for a given date.
 *
 * @param date - The date.
 * @returns - The start of the day.
 */
function getStartOfDay(date) {
    return startOfDay.startOfDay(date);
}
/**
 * Gets the start of the week for a given date.
 *
 * @param date - The date.
 * @param locale - The locale.
 * @param calendarStartDay - The day the calendar starts on.
 * @returns - The start of the week.
 */
function getStartOfWeek(date, locale, calendarStartDay) {
    var localeObj = locale
        ? getLocaleObject(locale)
        : getLocaleObject(getDefaultLocale());
    return startOfWeek.startOfWeek(date, {
        locale: localeObj,
        weekStartsOn: calendarStartDay,
    });
}
/**
 * Gets the start of the month for a given date.
 *
 * @param date - The date.
 * @returns - The start of the month.
 */
function getStartOfMonth(date) {
    return startOfMonth.startOfMonth(date);
}
/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
function getStartOfYear(date) {
    return startOfYear.startOfYear(date);
}
/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
function getStartOfQuarter(date) {
    return startOfQuarter.startOfQuarter(date);
}
/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
function getStartOfToday() {
    return startOfDay.startOfDay(newDate());
}
// *** End of ***
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
function getEndOfDay(date) {
    return endOfDay.endOfDay(date);
}
/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
function getEndOfWeek(date) {
    return endOfWeek.endOfWeek(date);
}
/**
 * Checks if two dates are in the same year.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same year, false otherwise.
 */
function isSameYear(date1, date2) {
    if (date1 && date2) {
        return isSameYear$1.isSameYear(date1, date2);
    }
    else {
        return !date1 && !date2;
    }
}
/**
 * Checks if two dates are in the same month.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same month, false otherwise.
 */
function isSameMonth(date1, date2) {
    if (date1 && date2) {
        return isSameMonth$1.isSameMonth(date1, date2);
    }
    else {
        return !date1 && !date2;
    }
}
/**
 * Checks if two dates are in the same quarter.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same quarter, false otherwise.
 */
function isSameQuarter(date1, date2) {
    if (date1 && date2) {
        return isSameQuarter$1.isSameQuarter(date1, date2);
    }
    else {
        return !date1 && !date2;
    }
}
/**
 * Checks if two dates are on the same day.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are on the same day, false otherwise.
 */
function isSameDay(date1, date2) {
    if (date1 && date2) {
        return isSameDay$1.isSameDay(date1, date2);
    }
    else {
        return !date1 && !date2;
    }
}
/**
 * Checks if two dates are equal.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are equal, false otherwise.
 */
function isEqual(date1, date2) {
    if (date1 && date2) {
        return isEqual$1.isEqual(date1, date2);
    }
    else {
        return !date1 && !date2;
    }
}
/**
 * Checks if a day is within a date range.
 *
 * @param day - The day to check.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns - True if the day is within the range, false otherwise.
 */
function isDayInRange(day, startDate, endDate) {
    var valid;
    var start = startOfDay.startOfDay(startDate);
    var end = endOfDay.endOfDay(endDate);
    try {
        valid = isWithinInterval.isWithinInterval(day, { start: start, end: end });
    }
    catch (err) {
        valid = false;
    }
    return valid;
}
// ** Date Localization **
/**
 * Registers a locale.
 *
 * @param localeName - The name of the locale.
 * @param localeData - The data of the locale.
 */
function registerLocale(localeName, localeData) {
    var scope = getLocaleScope();
    if (!scope.__localeData__) {
        scope.__localeData__ = {};
    }
    scope.__localeData__[localeName] = localeData;
}
/**
 * Sets the default locale.
 *
 * @param localeName - The name of the locale.
 */
function setDefaultLocale(localeName) {
    var scope = getLocaleScope();
    scope.__localeId__ = localeName;
}
/**
 * Gets the default locale.
 *
 * @returns - The default locale.
 */
function getDefaultLocale() {
    var scope = getLocaleScope();
    return scope.__localeId__;
}
/**
 * Gets the locale object.
 *
 * @param localeSpec - The locale specification.
 * @returns - The locale object.
 */
function getLocaleObject(localeSpec) {
    if (typeof localeSpec === "string") {
        // Treat it as a locale name registered by registerLocale
        var scope = getLocaleScope();
        // Null was replaced with undefined to avoid type coercion
        return scope.__localeData__ ? scope.__localeData__[localeSpec] : undefined;
    }
    else {
        // Treat it as a raw date-fns locale object
        return localeSpec;
    }
}
/**
 * Formats the weekday in a given locale.
 *
 * @param date - The date to format.
 * @param formatFunc - The formatting function.
 * @param locale - The locale to use for formatting.
 * @returns - The formatted weekday.
 */
function getFormattedWeekdayInLocale(date, formatFunc, locale) {
    return formatFunc(formatDate(date, "EEEE", locale));
}
/**
 * Gets the minimum weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The minimum weekday.
 */
function getWeekdayMinInLocale(date, locale) {
    return formatDate(date, "EEEEEE", locale);
}
/**
 * Gets the short weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short weekday.
 */
function getWeekdayShortInLocale(date, locale) {
    return formatDate(date, "EEE", locale);
}
/**
 * Gets the month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The month.
 */
function getMonthInLocale(month, locale) {
    return formatDate(setMonth.setMonth(newDate(), month), "LLLL", locale);
}
/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
function getMonthShortInLocale(month, locale) {
    return formatDate(setMonth.setMonth(newDate(), month), "LLL", locale);
}
/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
function getQuarterShortInLocale(quarter, locale) {
    return formatDate(setQuarter.setQuarter(newDate(), quarter), "QQQ", locale);
}
/**
 * Checks if a day is disabled.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is disabled, false otherwise.
 */
function isDayDisabled(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, excludeDateIntervals = _b.excludeDateIntervals, includeDates = _b.includeDates, includeDateIntervals = _b.includeDateIntervals, filterDate = _b.filterDate;
    return (isOutOfBounds(day, { minDate: minDate, maxDate: maxDate }) ||
        (excludeDates &&
            excludeDates.some(function (excludeDate) {
                var _a;
                if (excludeDate instanceof Date) {
                    return isSameDay(day, excludeDate);
                }
                else {
                    return isSameDay(day, (_a = excludeDate.date) !== null && _a !== void 0 ? _a : new Date());
                }
            })) ||
        (excludeDateIntervals &&
            excludeDateIntervals.some(function (_a) {
                var start = _a.start, end = _a.end;
                return isWithinInterval.isWithinInterval(day, { start: start, end: end });
            })) ||
        (includeDates &&
            !includeDates.some(function (includeDate) { return isSameDay(day, includeDate); })) ||
        (includeDateIntervals &&
            !includeDateIntervals.some(function (_a) {
                var start = _a.start, end = _a.end;
                return isWithinInterval.isWithinInterval(day, { start: start, end: end });
            })) ||
        (filterDate && !filterDate(newDate(day))) ||
        false);
}
/**
 * Checks if a day is excluded.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is excluded, false otherwise.
 */
function isDayExcluded(day, _a) {
    var _b = _a === void 0 ? {} : _a, excludeDates = _b.excludeDates, excludeDateIntervals = _b.excludeDateIntervals;
    if (excludeDateIntervals && excludeDateIntervals.length > 0) {
        return excludeDateIntervals.some(function (_a) {
            var start = _a.start, end = _a.end;
            return isWithinInterval.isWithinInterval(day, { start: start, end: end });
        });
    }
    return ((excludeDates &&
        excludeDates.some(function (excludeDate) {
            var _a;
            if (excludeDate instanceof Date) {
                return isSameDay(day, excludeDate);
            }
            else {
                return isSameDay(day, (_a = excludeDate.date) !== null && _a !== void 0 ? _a : new Date());
            }
        })) ||
        false);
}
function isMonthDisabled(month, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
    return (isOutOfBounds(month, {
        minDate: minDate ? startOfMonth.startOfMonth(minDate) : undefined,
        maxDate: maxDate ? endOfMonth.endOfMonth(maxDate) : undefined,
    }) ||
        (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function (excludeDate) {
            return isSameMonth(month, excludeDate instanceof Date ? excludeDate : excludeDate.date);
        })) ||
        (includeDates &&
            !includeDates.some(function (includeDate) { return isSameMonth(month, includeDate); })) ||
        (filterDate && !filterDate(newDate(month))) ||
        false);
}
function isMonthInRange(startDate, endDate, m, day) {
    var startDateYear = getYear.getYear(startDate);
    var startDateMonth = getMonth.getMonth(startDate);
    var endDateYear = getYear.getYear(endDate);
    var endDateMonth = getMonth.getMonth(endDate);
    var dayYear = getYear.getYear(day);
    if (startDateYear === endDateYear && startDateYear === dayYear) {
        return startDateMonth <= m && m <= endDateMonth;
    }
    else if (startDateYear < endDateYear) {
        return ((dayYear === startDateYear && startDateMonth <= m) ||
            (dayYear === endDateYear && endDateMonth >= m) ||
            (dayYear < endDateYear && dayYear > startDateYear));
    }
    return false;
}
/**
 * To check if a date's month and year are disabled/excluded
 * @param date Date to check
 * @returns {boolean} true if month and year are disabled/excluded, false otherwise
 */
function isMonthYearDisabled(date, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
    return (isOutOfBounds(date, { minDate: minDate, maxDate: maxDate }) ||
        (excludeDates &&
            excludeDates.some(function (excludedDate) {
                return isSameMonth(excludedDate instanceof Date ? excludedDate : excludedDate.date, date);
            })) ||
        (includeDates &&
            !includeDates.some(function (includedDate) { return isSameMonth(includedDate, date); })) ||
        false);
}
function isQuarterDisabled(quarter, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
    return (isOutOfBounds(quarter, { minDate: minDate, maxDate: maxDate }) ||
        (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function (excludeDate) {
            return isSameQuarter(quarter, excludeDate instanceof Date ? excludeDate : excludeDate.date);
        })) ||
        (includeDates &&
            !includeDates.some(function (includeDate) {
                return isSameQuarter(quarter, includeDate);
            })) ||
        (filterDate && !filterDate(newDate(quarter))) ||
        false);
}
function isYearInRange(year, start, end) {
    if (!start || !end)
        return false;
    if (!isValid$1.isValid(start) || !isValid$1.isValid(end))
        return false;
    var startYear = getYear.getYear(start);
    var endYear = getYear.getYear(end);
    return startYear <= year && endYear >= year;
}
function isYearDisabled(year, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
    var date = new Date(year, 0, 1);
    return (isOutOfBounds(date, {
        minDate: minDate ? startOfYear.startOfYear(minDate) : undefined,
        maxDate: maxDate ? endOfYear.endOfYear(maxDate) : undefined,
    }) ||
        (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function (excludeDate) {
            return isSameYear(date, excludeDate instanceof Date ? excludeDate : excludeDate.date);
        })) ||
        (includeDates &&
            !includeDates.some(function (includeDate) { return isSameYear(date, includeDate); })) ||
        (filterDate && !filterDate(newDate(date))) ||
        false);
}
function isQuarterInRange(startDate, endDate, q, day) {
    var startDateYear = getYear.getYear(startDate);
    var startDateQuarter = getQuarter.getQuarter(startDate);
    var endDateYear = getYear.getYear(endDate);
    var endDateQuarter = getQuarter.getQuarter(endDate);
    var dayYear = getYear.getYear(day);
    if (startDateYear === endDateYear && startDateYear === dayYear) {
        return startDateQuarter <= q && q <= endDateQuarter;
    }
    else if (startDateYear < endDateYear) {
        return ((dayYear === startDateYear && startDateQuarter <= q) ||
            (dayYear === endDateYear && endDateQuarter >= q) ||
            (dayYear < endDateYear && dayYear > startDateYear));
    }
    return false;
}
function isOutOfBounds(day, _a) {
    var _b;
    var _c = _a === void 0 ? {} : _a, minDate = _c.minDate, maxDate = _c.maxDate;
    return ((_b = ((minDate && differenceInCalendarDays.differenceInCalendarDays(day, minDate) < 0) ||
        (maxDate && differenceInCalendarDays.differenceInCalendarDays(day, maxDate) > 0))) !== null && _b !== void 0 ? _b : false);
}
function isTimeInList(time, times) {
    return times.some(function (listTime) {
        return getHours.getHours(listTime) === getHours.getHours(time) &&
            getMinutes.getMinutes(listTime) === getMinutes.getMinutes(time) &&
            getSeconds.getSeconds(listTime) === getSeconds.getSeconds(time);
    });
}
function isTimeDisabled(time, _a) {
    var _b = _a === void 0 ? {} : _a, excludeTimes = _b.excludeTimes, includeTimes = _b.includeTimes, filterTime = _b.filterTime;
    return ((excludeTimes && isTimeInList(time, excludeTimes)) ||
        (includeTimes && !isTimeInList(time, includeTimes)) ||
        (filterTime && !filterTime(time)) ||
        false);
}
function isTimeInDisabledRange(time, _a) {
    var minTime = _a.minTime, maxTime = _a.maxTime;
    if (!minTime || !maxTime) {
        throw new Error("Both minTime and maxTime props required");
    }
    var baseTime = newDate();
    baseTime = setHours.setHours(baseTime, getHours.getHours(time));
    baseTime = setMinutes.setMinutes(baseTime, getMinutes.getMinutes(time));
    baseTime = setSeconds.setSeconds(baseTime, getSeconds.getSeconds(time));
    var min = newDate();
    min = setHours.setHours(min, getHours.getHours(minTime));
    min = setMinutes.setMinutes(min, getMinutes.getMinutes(minTime));
    min = setSeconds.setSeconds(min, getSeconds.getSeconds(minTime));
    var max = newDate();
    max = setHours.setHours(max, getHours.getHours(maxTime));
    max = setMinutes.setMinutes(max, getMinutes.getMinutes(maxTime));
    max = setSeconds.setSeconds(max, getSeconds.getSeconds(maxTime));
    var valid;
    try {
        valid = !isWithinInterval.isWithinInterval(baseTime, { start: min, end: max });
    }
    catch (err) {
        valid = false;
    }
    return valid;
}
function monthDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var previousMonth = subMonths.subMonths(day, 1);
    return ((minDate && differenceInCalendarMonths.differenceInCalendarMonths(minDate, previousMonth) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarMonths.differenceInCalendarMonths(includeDate, previousMonth) > 0;
            })) ||
        false);
}
function monthDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var nextMonth = addMonths.addMonths(day, 1);
    return ((maxDate && differenceInCalendarMonths.differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) { return differenceInCalendarMonths.differenceInCalendarMonths(nextMonth, includeDate) > 0; })) ||
        false);
}
function quarterDisabledBefore(date, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var firstDateOfYear = startOfYear.startOfYear(date);
    var previousQuarter = subQuarters.subQuarters(firstDateOfYear, 1);
    return ((minDate && differenceInCalendarQuarters.differenceInCalendarQuarters(minDate, previousQuarter) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarQuarters.differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
            })) ||
        false);
}
function quarterDisabledAfter(date, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var lastDateOfYear = endOfYear.endOfYear(date);
    var nextQuarter = addQuarters.addQuarters(lastDateOfYear, 1);
    return ((maxDate && differenceInCalendarQuarters.differenceInCalendarQuarters(nextQuarter, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarQuarters.differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
            })) ||
        false);
}
function yearDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var previousYear = subYears.subYears(day, 1);
    return ((minDate && differenceInCalendarYears.differenceInCalendarYears(minDate, previousYear) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarYears.differenceInCalendarYears(includeDate, previousYear) > 0;
            })) ||
        false);
}
function yearsDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
    var previousYear = getStartOfYear(subYears.subYears(day, yearItemNumber));
    var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
    var minDateYear = minDate && getYear.getYear(minDate);
    return (minDateYear && minDateYear > endPeriod) || false;
}
function yearDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var nextYear = addYears.addYears(day, 1);
    return ((maxDate && differenceInCalendarYears.differenceInCalendarYears(nextYear, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) { return differenceInCalendarYears.differenceInCalendarYears(nextYear, includeDate) > 0; })) ||
        false);
}
function yearsDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
    var nextYear = addYears.addYears(day, yearItemNumber);
    var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
    var maxDateYear = maxDate && getYear.getYear(maxDate);
    return (maxDateYear && maxDateYear < startPeriod) || false;
}
function getEffectiveMinDate(_a) {
    var minDate = _a.minDate, includeDates = _a.includeDates;
    if (includeDates && minDate) {
        var minDates = includeDates.filter(function (includeDate) { return differenceInCalendarDays.differenceInCalendarDays(includeDate, minDate) >= 0; });
        return min.min(minDates);
    }
    else if (includeDates) {
        return min.min(includeDates);
    }
    else {
        return minDate;
    }
}
function getEffectiveMaxDate(_a) {
    var maxDate = _a.maxDate, includeDates = _a.includeDates;
    if (includeDates && maxDate) {
        var maxDates = includeDates.filter(function (includeDate) { return differenceInCalendarDays.differenceInCalendarDays(includeDate, maxDate) <= 0; });
        return max.max(maxDates);
    }
    else if (includeDates) {
        return max.max(includeDates);
    }
    else {
        return maxDate;
    }
}
/**
 * Get a map of highlighted dates with their corresponding classes.
 * @param highlightDates The dates to highlight.
 * @param defaultClassName The default class to use for highlighting.
 * @returns A map with dates as keys and arrays of class names as values.
 */
function getHighLightDaysMap(highlightDates, defaultClassName) {
    var _a;
    if (highlightDates === void 0) { highlightDates = []; }
    if (defaultClassName === void 0) { defaultClassName = "react-datepicker__day--highlighted"; }
    var dateClasses = new Map();
    for (var i = 0, len = highlightDates.length; i < len; i++) {
        var obj = highlightDates[i];
        if (isDate.isDate(obj)) {
            var key = formatDate(obj, "MM.dd.yyyy");
            var classNamesArr = dateClasses.get(key) || [];
            if (!classNamesArr.includes(defaultClassName)) {
                classNamesArr.push(defaultClassName);
                dateClasses.set(key, classNamesArr);
            }
        }
        else if (typeof obj === "object") {
            var keys = Object.keys(obj);
            var className = (_a = keys[0]) !== null && _a !== void 0 ? _a : "";
            var arrOfDates = obj[className];
            if (typeof className === "string" && Array.isArray(arrOfDates)) {
                for (var k = 0, len_1 = arrOfDates.length; k < len_1; k++) {
                    var dateK = arrOfDates[k];
                    if (dateK) {
                        var key = formatDate(dateK, "MM.dd.yyyy");
                        var classNamesArr = dateClasses.get(key) || [];
                        if (!classNamesArr.includes(className)) {
                            classNamesArr.push(className);
                            dateClasses.set(key, classNamesArr);
                        }
                    }
                }
            }
        }
    }
    return dateClasses;
}
/**
 * Compare the two arrays
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @returns true, if the passed arrays are equal, false otherwise.
 */
function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.every(function (value, index) { return value === array2[index]; });
}
/**
 * Assign the custom class to each date
 * @param holidayDates array of object containing date and name of the holiday
 * @param defaultClassName className to be added.
 * @returns Map containing date as key and array of className and holiday name as value
 */
function getHolidaysMap(holidayDates, defaultClassName) {
    if (holidayDates === void 0) { holidayDates = []; }
    if (defaultClassName === void 0) { defaultClassName = "react-datepicker__day--holidays"; }
    var dateClasses = new Map();
    holidayDates.forEach(function (holiday) {
        var dateObj = holiday.date, holidayName = holiday.holidayName;
        if (!isDate.isDate(dateObj)) {
            return;
        }
        var key = formatDate(dateObj, "MM.dd.yyyy");
        var classNamesObj = dateClasses.get(key) || {
            className: "",
            holidayNames: [],
        };
        if ("className" in classNamesObj &&
            classNamesObj["className"] === defaultClassName &&
            arraysAreEqual(classNamesObj["holidayNames"], [holidayName])) {
            return;
        }
        classNamesObj["className"] = defaultClassName;
        var holidayNameArr = classNamesObj["holidayNames"];
        classNamesObj["holidayNames"] = holidayNameArr
            ? __spreadArray(__spreadArray([], holidayNameArr, true), [holidayName], false) : [holidayName];
        dateClasses.set(key, classNamesObj);
    });
    return dateClasses;
}
/**
 * Determines the times to inject after a given start of day, current time, and multiplier.
 * @param startOfDay The start of the day.
 * @param currentTime The current time.
 * @param currentMultiplier The current multiplier.
 * @param intervals The intervals.
 * @param injectedTimes The times to potentially inject.
 * @returns An array of times to inject.
 */
function timesToInjectAfter(startOfDay, currentTime, currentMultiplier, intervals, injectedTimes) {
    var l = injectedTimes.length;
    var times = [];
    for (var i = 0; i < l; i++) {
        var injectedTime = startOfDay;
        var injectedTimeValue = injectedTimes[i];
        if (injectedTimeValue) {
            injectedTime = addHours.addHours(injectedTime, getHours.getHours(injectedTimeValue));
            injectedTime = addMinutes.addMinutes(injectedTime, getMinutes.getMinutes(injectedTimeValue));
            injectedTime = addSeconds.addSeconds(injectedTime, getSeconds.getSeconds(injectedTimeValue));
        }
        var nextTime = addMinutes.addMinutes(startOfDay, (currentMultiplier + 1) * intervals);
        if (isAfter.isAfter(injectedTime, currentTime) &&
            isBefore.isBefore(injectedTime, nextTime) &&
            injectedTimeValue != undefined) {
            times.push(injectedTimeValue);
        }
    }
    return times;
}
/**
 * Adds a leading zero to a number if it's less than 10.
 * @param i The number to add a leading zero to.
 * @returns The number as a string, with a leading zero if it was less than 10.
 */
function addZero(i) {
    return i < 10 ? "0".concat(i) : "".concat(i);
}
/**
 * Gets the start and end years for a period.
 * @param date The date to get the period for.
 * @param yearItemNumber The number of years in the period. Defaults to DEFAULT_YEAR_ITEM_NUMBER.
 * @returns An object with the start and end years for the period.
 */
function getYearsPeriod(date, yearItemNumber) {
    if (yearItemNumber === void 0) { yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER; }
    var endPeriod = Math.ceil(getYear.getYear(date) / yearItemNumber) * yearItemNumber;
    var startPeriod = endPeriod - (yearItemNumber - 1);
    return { startPeriod: startPeriod, endPeriod: endPeriod };
}
/**
 * Gets the number of hours in a day.
 * @param d The date to get the number of hours for.
 * @returns The number of hours in the day.
 */
function getHoursInDay(d) {
    var startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var startOfTheNextDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 24);
    return Math.round((+startOfTheNextDay - +startOfDay) / 3600000);
}
/**
 * Returns the start of the minute for the given date
 *
 * NOTE: this function is a DST and timezone-safe analog of `date-fns/startOfMinute`
 * do not make changes unless you know what you're doing
 *
 * See comments on https://github.com/Hacker0x01/react-datepicker/pull/4244
 * for more details
 *
 * @param d date
 * @returns start of the minute
 */
function startOfMinute(d) {
    var seconds = d.getSeconds();
    var milliseconds = d.getMilliseconds();
    return toDate.toDate(d.getTime() - seconds * 1000 - milliseconds);
}
/**
 * Returns whether the given dates are in the same minute
 *
 * This function is a DST and timezone-safe analog of `date-fns/isSameMinute`
 *
 * @param d1
 * @param d2
 * @returns
 */
function isSameMinute(d1, d2) {
    return startOfMinute(d1).getTime() === startOfMinute(d2).getTime();
}
/**
 * Returns a new datetime object representing the input date with midnight time
 * @param date The date to get the midnight time for
 * @returns A new datetime object representing the input date with midnight time
 */
function getMidnightDate(date) {
    if (!isDate.isDate(date)) {
        throw new Error("Invalid date");
    }
    var dateWithoutTime = new Date(date);
    dateWithoutTime.setHours(0, 0, 0, 0);
    return dateWithoutTime;
}
/**
 * Is the first date before the second one?
 * @param date The date that should be before the other one to return true
 * @param dateToCompare The date to compare with
 * @returns The first date is before the second date
 *
 * Note:
 *  This function considers the mid-night of the given dates for comparison.
 *  It evaluates whether date is before dateToCompare based on their mid-night timestamps.
 */
function isDateBefore(date, dateToCompare) {
    if (!isDate.isDate(date) || !isDate.isDate(dateToCompare)) {
        throw new Error("Invalid date received");
    }
    var midnightDate = getMidnightDate(date);
    var midnightDateToCompare = getMidnightDate(dateToCompare);
    return isBefore.isBefore(midnightDate, midnightDateToCompare);
}
/**
 * Checks if the space key was pressed down.
 *
 * @param event - The keyboard event.
 * @returns - Returns true if the space key was pressed down, false otherwise.
 */
function isSpaceKeyDown(event) {
    return event.key === KeyType.Space;
}

/**
 * `InputTime` is a React component that manages time input.
 *
 * @component
 * @example
 * <InputTime timeString="12:00" />
 *
 * @param props - The properties that define the `InputTime` component.
 * @param props.onChange - Function that is called when the date changes.
 * @param props.date - The initial date value.
 * @param props.timeString - The initial time string value.
 * @param props.timeInputLabel - The label for the time input.
 * @param props.customTimeInput - An optional custom time input element.
 *
 * @returns The `InputTime` component.
 */
var InputTime = /** @class */ (function (_super) {
    __extends(InputTime, _super);
    function InputTime(props) {
        var _this = _super.call(this, props) || this;
        _this.onTimeChange = function (time) {
            var _a, _b;
            _this.setState({ time: time });
            var propDate = _this.props.date;
            var isPropDateValid = propDate instanceof Date && !isNaN(+propDate);
            var date = isPropDateValid ? propDate : new Date();
            if (time === null || time === void 0 ? void 0 : time.includes(":")) {
                var _c = time.split(":"), hours = _c[0], minutes = _c[1];
                date.setHours(Number(hours));
                date.setMinutes(Number(minutes));
            }
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, date);
        };
        _this.renderTimeInput = function () {
            var time = _this.state.time;
            var _a = _this.props, date = _a.date, timeString = _a.timeString, customTimeInput = _a.customTimeInput;
            if (customTimeInput) {
                return React.cloneElement(customTimeInput, {
                    date: date,
                    value: time,
                    onChange: _this.onTimeChange,
                });
            }
            return (React__default.default.createElement("input", { type: "time", className: "react-datepicker-time__input", placeholder: "Time", name: "time-input", required: true, value: time, onChange: function (event) {
                    _this.onTimeChange(event.target.value || timeString);
                } }));
        };
        _this.state = {
            time: _this.props.timeString,
        };
        return _this;
    }
    InputTime.getDerivedStateFromProps = function (props, state) {
        if (props.timeString !== state.time) {
            return {
                time: props.timeString,
            };
        }
        // Return null to indicate no change to state.
        return null;
    };
    InputTime.prototype.render = function () {
        return (React__default.default.createElement("div", { className: "react-datepicker__input-time-container" },
            React__default.default.createElement("div", { className: "react-datepicker-time__caption" }, this.props.timeInputLabel),
            React__default.default.createElement("div", { className: "react-datepicker-time__input-container" },
                React__default.default.createElement("div", { className: "react-datepicker-time__input" }, this.renderTimeInput()))));
    };
    return InputTime;
}(React.Component));

/**
 * `Day` is a React component that represents a single day in a date picker.
 * It handles the rendering and interaction of a day.
 *
 * @prop ariaLabelPrefixWhenEnabled - Aria label prefix when the day is enabled.
 * @prop ariaLabelPrefixWhenDisabled - Aria label prefix when the day is disabled.
 * @prop disabledKeyboardNavigation - Whether keyboard navigation is disabled.
 * @prop day - The day to be displayed.
 * @prop dayClassName - Function to customize the CSS class of the day.
 * @prop endDate - The end date in a range.
 * @prop highlightDates - Map of dates to be highlighted.
 * @prop holidays - Map of holiday dates.
 * @prop inline - Whether the date picker is inline.
 * @prop shouldFocusDayInline - Whether the day should be focused when date picker is inline.
 * @prop month - The month the day belongs to.
 * @prop onClick - Click event handler.
 * @prop onMouseEnter - Mouse enter event handler.
 * @prop handleOnKeyDown - Key down event handler.
 * @prop usePointerEvent - Whether to use pointer events.
 * @prop preSelection - The date that is currently selected.
 * @prop selected - The selected date.
 * @prop selectingDate - The date currently being selected.
 * @prop selectsEnd - Whether the day can be the end date in a range.
 * @prop selectsStart - Whether the day can be the start date in a range.
 * @prop selectsRange - Whether the day can be in a range.
 * @prop showWeekPicker - Whether to show week picker.
 * @prop showWeekNumber - Whether to show week numbers.
 * @prop selectsDisabledDaysInRange - Whether to select disabled days in a range.
 * @prop selectsMultiple - Whether to allow multiple date selection.
 * @prop selectedDates - Array of selected dates.
 * @prop startDate - The start date in a range.
 * @prop renderDayContents - Function to customize the rendering of the day's contents.
 * @prop containerRef - Ref for the container.
 * @prop excludeDates - Array of dates to be excluded.
 * @prop calendarStartDay - The start day of the week.
 * @prop locale - The locale object.
 * @prop monthShowsDuplicateDaysEnd - Whether to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Whether to show duplicate days at the start of the month.
 * @prop includeDates - Array of dates to be included.
 * @prop includeDateIntervals - Array of date intervals to be included.
 * @prop minDate - The minimum date that can be selected.
 * @prop maxDate - The maximum date that can be selected.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import Day from './day';
 *
 * function MyComponent() {
 *   const handleDayClick = (event) => {
 *     console.log('Day clicked', event);
 *   };
 *
 *   const handleDayMouseEnter = (event) => {
 *     console.log('Mouse entered day', event);
 *   };
 *
 *   const renderDayContents = (date) => {
 *     return <div>{date.getDate()}</div>;
 *   };
 *
 *   return (
 *     <Day
 *       day={new Date()}
 *       onClick={handleDayClick}
 *       onMouseEnter={handleDayMouseEnter}
 *       renderDayContents={renderDayContents}
 *     />
 *   );
 * }
 *
 * export default MyComponent;
 * ```
 */
var Day = /** @class */ (function (_super) {
    __extends(Day, _super);
    function Day() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dayEl = React.createRef();
        _this.handleClick = function (event) {
            if (!_this.isDisabled() && _this.props.onClick) {
                _this.props.onClick(event);
            }
        };
        _this.handleMouseEnter = function (event) {
            if (!_this.isDisabled() && _this.props.onMouseEnter) {
                _this.props.onMouseEnter(event);
            }
        };
        _this.handleOnKeyDown = function (event) {
            var _a, _b;
            var eventKey = event.key;
            if (eventKey === KeyType.Space) {
                event.preventDefault();
                event.key = KeyType.Enter;
            }
            (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        _this.isSameDay = function (other) {
            return isSameDay(_this.props.day, other);
        };
        _this.isKeyboardSelected = function () {
            var _a;
            if (_this.props.disabledKeyboardNavigation) {
                return false;
            }
            var isSelectedDate = _this.props.selectsMultiple
                ? (_a = _this.props.selectedDates) === null || _a === void 0 ? void 0 : _a.some(function (date) { return _this.isSameDayOrWeek(date); })
                : _this.isSameDayOrWeek(_this.props.selected);
            return !isSelectedDate && _this.isSameDayOrWeek(_this.props.preSelection);
        };
        _this.isDisabled = function () {
            // Almost all props previously were passed as this.props w/o proper typing with prop-types
            // after the migration to TS i made it explicit
            return isDayDisabled(_this.props.day, {
                minDate: _this.props.minDate,
                maxDate: _this.props.maxDate,
                excludeDates: _this.props.excludeDates,
                excludeDateIntervals: _this.props.excludeDateIntervals,
                includeDateIntervals: _this.props.includeDateIntervals,
                includeDates: _this.props.includeDates,
                filterDate: _this.props.filterDate,
            });
        };
        _this.isExcluded = function () {
            // Almost all props previously were passed as this.props w/o proper typing with prop-types
            // after the migration to TS i made it explicit
            return isDayExcluded(_this.props.day, {
                excludeDates: _this.props.excludeDates,
                excludeDateIntervals: _this.props.excludeDateIntervals,
            });
        };
        _this.isStartOfWeek = function () {
            return isSameDay(_this.props.day, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
        };
        _this.isSameWeek = function (other) {
            return _this.props.showWeekPicker &&
                isSameDay(other, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
        };
        _this.isSameDayOrWeek = function (other) {
            return _this.isSameDay(other) || _this.isSameWeek(other);
        };
        _this.getHighLightedClass = function () {
            var _a = _this.props, day = _a.day, highlightDates = _a.highlightDates;
            if (!highlightDates) {
                return false;
            }
            // Looking for className in the Map of {'day string, 'className'}
            var dayStr = formatDate(day, "MM.dd.yyyy");
            return highlightDates.get(dayStr);
        };
        // Function to return the array containing className associated to the date
        _this.getHolidaysClass = function () {
            var _a;
            var _b = _this.props, day = _b.day, holidays = _b.holidays;
            if (!holidays) {
                // For type consistency no other reasons
                return [undefined];
            }
            var dayStr = formatDate(day, "MM.dd.yyyy");
            // Looking for className in the Map of {day string: {className, holidayName}}
            if (holidays.has(dayStr)) {
                return [(_a = holidays.get(dayStr)) === null || _a === void 0 ? void 0 : _a.className];
            }
            // For type consistency no other reasons
            return [undefined];
        };
        _this.isInRange = function () {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isDayInRange(day, startDate, endDate);
        };
        _this.isInSelectingRange = function () {
            var _a;
            var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, selectsDisabledDaysInRange = _b.selectsDisabledDaysInRange, startDate = _b.startDate, endDate = _b.endDate;
            var selectingDate = (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection;
            if (!(selectsStart || selectsEnd || selectsRange) ||
                !selectingDate ||
                (!selectsDisabledDaysInRange && _this.isDisabled())) {
                return false;
            }
            if (selectsStart &&
                endDate &&
                (isBefore.isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))) {
                return isDayInRange(day, selectingDate, endDate);
            }
            if (selectsEnd &&
                startDate &&
                (isAfter.isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
                return isDayInRange(day, startDate, selectingDate);
            }
            if (selectsRange &&
                startDate &&
                !endDate &&
                (isAfter.isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
                return isDayInRange(day, startDate, selectingDate);
            }
            return false;
        };
        _this.isSelectingRangeStart = function () {
            var _a;
            if (!_this.isInSelectingRange()) {
                return false;
            }
            var _b = _this.props, day = _b.day, startDate = _b.startDate, selectsStart = _b.selectsStart;
            var selectingDate = (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection;
            if (selectsStart) {
                return isSameDay(day, selectingDate);
            }
            else {
                return isSameDay(day, startDate);
            }
        };
        _this.isSelectingRangeEnd = function () {
            var _a;
            if (!_this.isInSelectingRange()) {
                return false;
            }
            var _b = _this.props, day = _b.day, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
            var selectingDate = (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection;
            if (selectsEnd || selectsRange) {
                return isSameDay(day, selectingDate);
            }
            else {
                return isSameDay(day, endDate);
            }
        };
        _this.isRangeStart = function () {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameDay(startDate, day);
        };
        _this.isRangeEnd = function () {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameDay(endDate, day);
        };
        _this.isWeekend = function () {
            var weekday = getDay.getDay(_this.props.day);
            return weekday === 0 || weekday === 6;
        };
        _this.isAfterMonth = function () {
            return (_this.props.month !== undefined &&
                (_this.props.month + 1) % 12 === getMonth.getMonth(_this.props.day));
        };
        _this.isBeforeMonth = function () {
            return (_this.props.month !== undefined &&
                (getMonth.getMonth(_this.props.day) + 1) % 12 === _this.props.month);
        };
        _this.isCurrentDay = function () { return _this.isSameDay(newDate()); };
        _this.isSelected = function () {
            var _a;
            if (_this.props.selectsMultiple) {
                return (_a = _this.props.selectedDates) === null || _a === void 0 ? void 0 : _a.some(function (date) {
                    return _this.isSameDayOrWeek(date);
                });
            }
            return _this.isSameDayOrWeek(_this.props.selected);
        };
        _this.getClassNames = function (date) {
            var dayClassName = _this.props.dayClassName
                ? _this.props.dayClassName(date)
                : undefined;
            return clsx.clsx("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
                "react-datepicker__day--disabled": _this.isDisabled(),
                "react-datepicker__day--excluded": _this.isExcluded(),
                "react-datepicker__day--selected": _this.isSelected(),
                "react-datepicker__day--keyboard-selected": _this.isKeyboardSelected(),
                "react-datepicker__day--range-start": _this.isRangeStart(),
                "react-datepicker__day--range-end": _this.isRangeEnd(),
                "react-datepicker__day--in-range": _this.isInRange(),
                "react-datepicker__day--in-selecting-range": _this.isInSelectingRange(),
                "react-datepicker__day--selecting-range-start": _this.isSelectingRangeStart(),
                "react-datepicker__day--selecting-range-end": _this.isSelectingRangeEnd(),
                "react-datepicker__day--today": _this.isCurrentDay(),
                "react-datepicker__day--weekend": _this.isWeekend(),
                "react-datepicker__day--outside-month": _this.isAfterMonth() || _this.isBeforeMonth(),
            }, _this.getHighLightedClass(), _this.getHolidaysClass());
        };
        _this.getAriaLabel = function () {
            var _a = _this.props, day = _a.day, _b = _a.ariaLabelPrefixWhenEnabled, ariaLabelPrefixWhenEnabled = _b === void 0 ? "Choose" : _b, _c = _a.ariaLabelPrefixWhenDisabled, ariaLabelPrefixWhenDisabled = _c === void 0 ? "Not available" : _c;
            var prefix = _this.isDisabled() || _this.isExcluded()
                ? ariaLabelPrefixWhenDisabled
                : ariaLabelPrefixWhenEnabled;
            return "".concat(prefix, " ").concat(formatDate(day, "PPPP", _this.props.locale));
        };
        // A function to return the holiday's name as title's content
        _this.getTitle = function () {
            var _a = _this.props, day = _a.day, _b = _a.holidays, holidays = _b === void 0 ? new Map() : _b, excludeDates = _a.excludeDates;
            var compareDt = formatDate(day, "MM.dd.yyyy");
            var titles = [];
            if (holidays.has(compareDt)) {
                titles.push.apply(titles, holidays.get(compareDt).holidayNames);
            }
            if (_this.isExcluded()) {
                titles.push(excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.filter(function (excludeDate) {
                    if (excludeDate instanceof Date) {
                        return isSameDay(excludeDate, day);
                    }
                    return isSameDay(excludeDate === null || excludeDate === void 0 ? void 0 : excludeDate.date, day);
                }).map(function (excludeDate) {
                    if (excludeDate instanceof Date) {
                        return undefined;
                    }
                    return excludeDate === null || excludeDate === void 0 ? void 0 : excludeDate.message;
                }));
            }
            // I'm not sure that this is a right output, but all tests are green
            return titles.join(", ");
        };
        _this.getTabIndex = function () {
            var selectedDay = _this.props.selected;
            var preSelectionDay = _this.props.preSelection;
            var tabIndex = !(_this.props.showWeekPicker &&
                (_this.props.showWeekNumber || !_this.isStartOfWeek())) &&
                (_this.isKeyboardSelected() ||
                    (_this.isSameDay(selectedDay) &&
                        isSameDay(preSelectionDay, selectedDay)))
                ? 0
                : -1;
            return tabIndex;
        };
        // various cases when we need to apply focus to the preselected day
        // focus the day on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
        // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
        _this.handleFocusDay = function () {
            var _a;
            // only do this while the input isn't focused
            // otherwise, typing/backspacing the date manually may steal focus away from the input
            _this.shouldFocusDay() && ((_a = _this.dayEl.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true }));
        };
        _this.renderDayContents = function () {
            if (_this.props.monthShowsDuplicateDaysEnd && _this.isAfterMonth())
                return null;
            if (_this.props.monthShowsDuplicateDaysStart && _this.isBeforeMonth())
                return null;
            return _this.props.renderDayContents
                ? _this.props.renderDayContents(getDate.getDate(_this.props.day), _this.props.day)
                : getDate.getDate(_this.props.day);
        };
        _this.render = function () { return (
        // TODO: Use <option> instead of the "option" role to ensure accessibility across all devices.
        React__default.default.createElement("div", { ref: _this.dayEl, className: _this.getClassNames(_this.props.day), onKeyDown: _this.handleOnKeyDown, onClick: _this.handleClick, onMouseEnter: !_this.props.usePointerEvent ? _this.handleMouseEnter : undefined, onPointerEnter: _this.props.usePointerEvent ? _this.handleMouseEnter : undefined, tabIndex: _this.getTabIndex(), "aria-label": _this.getAriaLabel(), role: "option", title: _this.getTitle(), "aria-disabled": _this.isDisabled(), "aria-current": _this.isCurrentDay() ? "date" : undefined, "aria-selected": _this.isSelected() || _this.isInRange() },
            _this.renderDayContents(),
            _this.getTitle() !== "" && (React__default.default.createElement("span", { className: "overlay" }, _this.getTitle())))); };
        return _this;
    }
    Day.prototype.componentDidMount = function () {
        this.handleFocusDay();
    };
    Day.prototype.componentDidUpdate = function () {
        this.handleFocusDay();
    };
    Day.prototype.shouldFocusDay = function () {
        var shouldFocusDay = false;
        if (this.getTabIndex() === 0 && this.isSameDay(this.props.preSelection)) {
            // there is currently no activeElement and not inline
            if (!document.activeElement || document.activeElement === document.body) {
                shouldFocusDay = true;
            }
            // inline version:
            // do not focus on initial render to prevent autoFocus issue
            // focus after month has changed via keyboard
            if (this.props.inline && !this.props.shouldFocusDayInline) {
                shouldFocusDay = false;
            }
            if (this.isDayActiveElement()) {
                shouldFocusDay = true;
            }
            if (this.isDuplicateDay()) {
                shouldFocusDay = false;
            }
        }
        return shouldFocusDay;
    };
    // the activeElement is in the container, and it is another instance of Day
    Day.prototype.isDayActiveElement = function () {
        var _a, _b, _c;
        return (((_b = (_a = this.props.containerRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.contains(document.activeElement)) &&
            ((_c = document.activeElement) === null || _c === void 0 ? void 0 : _c.classList.contains("react-datepicker__day")));
    };
    Day.prototype.isDuplicateDay = function () {
        return (
        //day is one of the non rendered duplicate days
        (this.props.monthShowsDuplicateDaysEnd && this.isAfterMonth()) ||
            (this.props.monthShowsDuplicateDaysStart && this.isBeforeMonth()));
    };
    return Day;
}(React.Component));

var WeekNumber = /** @class */ (function (_super) {
    __extends(WeekNumber, _super);
    function WeekNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.weekNumberEl = React.createRef();
        _this.handleClick = function (event) {
            if (_this.props.onClick) {
                _this.props.onClick(event);
            }
        };
        _this.handleOnKeyDown = function (event) {
            var _a, _b;
            var eventKey = event.key;
            if (eventKey === KeyType.Space) {
                event.preventDefault();
                event.key = KeyType.Enter;
            }
            (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        _this.isKeyboardSelected = function () {
            return !_this.props.disabledKeyboardNavigation &&
                !isSameDay(_this.props.date, _this.props.selected) &&
                isSameDay(_this.props.date, _this.props.preSelection);
        };
        _this.getTabIndex = function () {
            return _this.props.showWeekPicker &&
                _this.props.showWeekNumber &&
                (_this.isKeyboardSelected() ||
                    (isSameDay(_this.props.date, _this.props.selected) &&
                        isSameDay(_this.props.preSelection, _this.props.selected)))
                ? 0
                : -1;
        };
        // various cases when we need to apply focus to the preselected week-number
        // focus the week-number on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
        // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
        _this.handleFocusWeekNumber = function (prevProps) {
            var shouldFocusWeekNumber = false;
            // only do this while the input isn't focused
            // otherwise, typing/backspacing the date manually may steal focus away from the input
            if (_this.getTabIndex() === 0 &&
                !(prevProps === null || prevProps === void 0 ? void 0 : prevProps.isInputFocused) &&
                isSameDay(_this.props.date, _this.props.preSelection)) {
                // there is currently no activeElement and not inline
                if (!document.activeElement || document.activeElement === document.body) {
                    shouldFocusWeekNumber = true;
                }
                // inline version:
                // do not focus on initial render to prevent autoFocus issue
                // focus after month has changed via keyboard
                if (_this.props.inline && !_this.props.shouldFocusDayInline) {
                    shouldFocusWeekNumber = false;
                }
                // the activeElement is in the container, and it is another instance of WeekNumber
                if (_this.props.containerRef &&
                    _this.props.containerRef.current &&
                    _this.props.containerRef.current.contains(document.activeElement) &&
                    document.activeElement &&
                    document.activeElement.classList.contains("react-datepicker__week-number")) {
                    shouldFocusWeekNumber = true;
                }
            }
            shouldFocusWeekNumber &&
                _this.weekNumberEl.current &&
                _this.weekNumberEl.current.focus({ preventScroll: true });
        };
        return _this;
    }
    Object.defineProperty(WeekNumber, "defaultProps", {
        get: function () {
            return {
                ariaLabelPrefix: "week ",
            };
        },
        enumerable: false,
        configurable: true
    });
    WeekNumber.prototype.componentDidMount = function () {
        this.handleFocusWeekNumber();
    };
    WeekNumber.prototype.componentDidUpdate = function (prevProps) {
        this.handleFocusWeekNumber(prevProps);
    };
    WeekNumber.prototype.render = function () {
        var _a = this.props, weekNumber = _a.weekNumber, _b = _a.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? WeekNumber.defaultProps.ariaLabelPrefix : _b, onClick = _a.onClick;
        var weekNumberClasses = {
            "react-datepicker__week-number": true,
            "react-datepicker__week-number--clickable": !!onClick,
            "react-datepicker__week-number--selected": !!onClick && isSameDay(this.props.date, this.props.selected),
            "react-datepicker__week-number--keyboard-selected": this.isKeyboardSelected(),
        };
        return (React__default.default.createElement("div", { ref: this.weekNumberEl, className: clsx.clsx(weekNumberClasses), "aria-label": "".concat(ariaLabelPrefix, " ").concat(this.props.weekNumber), onClick: this.handleClick, onKeyDown: this.handleOnKeyDown, tabIndex: this.getTabIndex() }, weekNumber));
    };
    return WeekNumber;
}(React.Component));

var Week = /** @class */ (function (_super) {
    __extends(Week, _super);
    function Week() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDisabled = function (day) {
            return isDayDisabled(day, {
                minDate: _this.props.minDate,
                maxDate: _this.props.maxDate,
                excludeDates: _this.props.excludeDates,
                excludeDateIntervals: _this.props.excludeDateIntervals,
                includeDateIntervals: _this.props.includeDateIntervals,
                includeDates: _this.props.includeDates,
                filterDate: _this.props.filterDate,
            });
        };
        _this.handleDayClick = function (day, event) {
            if (_this.props.onDayClick) {
                _this.props.onDayClick(day, event);
            }
        };
        _this.handleDayMouseEnter = function (day) {
            if (_this.props.onDayMouseEnter) {
                _this.props.onDayMouseEnter(day);
            }
        };
        _this.handleWeekClick = function (day, weekNumber, event) {
            var _a, _b, _c;
            var enabledWeekDay = new Date(day);
            for (var i = 0; i < 7; i++) {
                var processingDay = new Date(day);
                processingDay.setDate(processingDay.getDate() + i);
                var isEnabled = !_this.isDisabled(processingDay);
                if (isEnabled) {
                    enabledWeekDay = processingDay;
                    break;
                }
            }
            if (typeof _this.props.onWeekSelect === "function") {
                _this.props.onWeekSelect(enabledWeekDay, weekNumber, event);
            }
            if (_this.props.showWeekPicker) {
                _this.handleDayClick(enabledWeekDay, event);
            }
            if ((_a = _this.props.shouldCloseOnSelect) !== null && _a !== void 0 ? _a : Week.defaultProps.shouldCloseOnSelect) {
                (_c = (_b = _this.props).setOpen) === null || _c === void 0 ? void 0 : _c.call(_b, false);
            }
        };
        _this.formatWeekNumber = function (date) {
            if (_this.props.formatWeekNumber) {
                return _this.props.formatWeekNumber(date);
            }
            return getWeek(date);
        };
        _this.renderDays = function () {
            var startOfWeek = _this.startOfWeek();
            var days = [];
            var weekNumber = _this.formatWeekNumber(startOfWeek);
            if (_this.props.showWeekNumber) {
                var onClickAction = _this.props.onWeekSelect || _this.props.showWeekPicker
                    ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber)
                    : undefined;
                days.push(React__default.default.createElement(WeekNumber, _assign({ key: "W" }, Week.defaultProps, _this.props, { weekNumber: weekNumber, date: startOfWeek, onClick: onClickAction })));
            }
            return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
                var day = addDays.addDays(startOfWeek, offset);
                return (React__default.default.createElement(Day, _assign({}, Week.defaultProps, _this.props, { ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix, ariaLabelPrefixWhenDisabled: _this.props.disabledDayAriaLabelPrefix, key: day.valueOf(), day: day, onClick: _this.handleDayClick.bind(_this, day), onMouseEnter: _this.handleDayMouseEnter.bind(_this, day) })));
            }));
        };
        _this.startOfWeek = function () {
            return getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay);
        };
        _this.isKeyboardSelected = function () {
            return !_this.props.disabledKeyboardNavigation &&
                !isSameDay(_this.startOfWeek(), _this.props.selected) &&
                isSameDay(_this.startOfWeek(), _this.props.preSelection);
        };
        return _this;
    }
    Object.defineProperty(Week, "defaultProps", {
        get: function () {
            return {
                shouldCloseOnSelect: true,
            };
        },
        enumerable: false,
        configurable: true
    });
    Week.prototype.render = function () {
        var weekNumberClasses = {
            "react-datepicker__week": true,
            "react-datepicker__week--selected": isSameDay(this.startOfWeek(), this.props.selected),
            "react-datepicker__week--keyboard-selected": this.isKeyboardSelected(),
        };
        return React__default.default.createElement("div", { className: clsx.clsx(weekNumberClasses) }, this.renderDays());
    };
    return Week;
}(React.Component));

var _a;
var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;
var MONTH_COLUMNS_LAYOUT = {
    TWO_COLUMNS: "two_columns",
    THREE_COLUMNS: "three_columns",
    FOUR_COLUMNS: "four_columns",
};
var MONTH_COLUMNS = (_a = {},
    _a[MONTH_COLUMNS_LAYOUT.TWO_COLUMNS] = {
        grid: [
            [0, 1],
            [2, 3],
            [4, 5],
            [6, 7],
            [8, 9],
            [10, 11],
        ],
        verticalNavigationOffset: 2,
    },
    _a[MONTH_COLUMNS_LAYOUT.THREE_COLUMNS] = {
        grid: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [9, 10, 11],
        ],
        verticalNavigationOffset: 3,
    },
    _a[MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS] = {
        grid: [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
        ],
        verticalNavigationOffset: 4,
    },
    _a);
var MONTH_NAVIGATION_HORIZONTAL_OFFSET = 1;
function getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker) {
    if (showFourColumnMonthYearPicker) {
        return MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS;
    }
    if (showTwoColumnMonthYearPicker) {
        return MONTH_COLUMNS_LAYOUT.TWO_COLUMNS;
    }
    return MONTH_COLUMNS_LAYOUT.THREE_COLUMNS;
}
/**
 * `Month` is a React component that represents a month in a calendar.
 * It accepts a `MonthProps` object as props which provides various configurations and event handlers.
 *
 * @prop dayClassName - Function to determine the class name for a day.
 * @prop monthClassName - Function to determine the class name for a month.
 * @prop filterDate - Function to filter dates.
 * @prop formatWeekNumber - Function to format the week number.
 * @prop onDayClick - Function to handle day click events.
 * @prop onDayMouseEnter - Function to handle mouse enter events on a day.
 * @prop onMouseLeave - Function to handle mouse leave events.
 * @prop onWeekSelect - Function to handle week selection.
 * @prop setPreSelection - Function to set pre-selection.
 * @prop setOpen - Function to set open state.
 * @prop renderDayContents - Function to render day contents.
 * @prop renderMonthContent - Function to render month content.
 * @prop renderQuarterContent - Function to render quarter content.
 * @prop handleOnKeyDown - Function to handle key down events.
 * @prop handleOnMonthKeyDown - Function to handle key down events on a month.
 * @prop ariaLabelPrefix - Aria label prefix.
 * @prop chooseDayAriaLabelPrefix - Aria label prefix for choosing a day.
 * @prop disabledDayAriaLabelPrefix - Aria label prefix for disabled day.
 * @prop disabledKeyboardNavigation - Flag to disable keyboard navigation.
 * @prop day - The day.
 * @prop endDate - The end date.
 * @prop orderInDisplay - The order in display.
 * @prop excludeDates - Dates to exclude.
 * @prop excludeDateIntervals - Date intervals to exclude.
 * @prop fixedHeight - Flag to set fixed height.
 * @prop highlightDates - Dates to highlight.
 * @prop holidays - Holidays.
 * @prop includeDates - Dates to include.
 * @prop includeDateIntervals - Date intervals to include.
 * @prop inline - Flag to set inline.
 * @prop shouldFocusDayInline - Flag to set focus on day inline.
 * @prop locale - The locale.
 * @prop maxDate - The maximum date.
 * @prop minDate - The minimum date.
 * @prop usePointerEvent - Flag to use pointer event.
 * @prop peekNextMonth - Flag to peek next month.
 * @prop preSelection - The pre-selection.
 * @prop selected - The selected date.
 * @prop selectingDate - The selecting date.
 * @prop calendarStartDay - The calendar start day.
 * @prop selectsEnd - Flag to select end.
 * @prop selectsStart - Flag to select start.
 * @prop selectsRange - Flag to select range.
 * @prop selectsDisabledDaysInRange - Flag to select disabled days in range.
 * @prop selectsMultiple - Flag to select multiple.
 * @prop selectedDates - The selected dates.
 * @prop showWeekNumbers - Flag to show week numbers.
 * @prop startDate - The start date.
 * @prop shouldCloseOnSelect - Flag to close on select.
 * @prop showMonthYearPicker - Flag to show month year picker.
 * @prop showFullMonthYearPicker - Flag to show full month year picker.
 * @prop showTwoColumnMonthYearPicker - Flag to show two column month year picker.
 * @prop showFourColumnMonthYearPicker - Flag to show four column month year picker.
 * @prop showQuarterYearPicker - Flag to show quarter year picker.
 * @prop showWeekPicker - Flag to show week picker.
 * @prop isInputFocused - Flag to set input focus.
 * @prop weekAriaLabelPrefix - Aria label prefix for week.
 * @prop containerRef - The container reference.
 * @prop monthShowsDuplicateDaysEnd - Flag to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Flag to show duplicate days at the start of the month.
 *
 * @example
 * ```tsx
 * function App() {
 *  const handleDayClick = (date) => {
 *     console.log('Day clicked: ', date);
 *   };
 *
 *   const handleDayMouseEnter = (date) => {
 *     console.log('Mouse entered on day: ', date);
 *   };
 *
 *   return (
 *     <div>
 *       <Month
 *         day={new Date()}
 *         endDate={new Date()}
 *         onDayClick={handleDayClick}
 *         onDayMouseEnter={handleDayMouseEnter}
 *         disabledKeyboardNavigation={false}
 *         showWeekNumbers={true}
 *         showMonthYearPicker={false}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
var Month = /** @class */ (function (_super) {
    __extends(Month, _super);
    function Month() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MONTH_REFS = __spreadArray([], Array(12), true).map(function () { return React.createRef(); });
        _this.QUARTER_REFS = __spreadArray([], Array(4), true).map(function () { return React.createRef(); });
        _this.isDisabled = function (day) {
            // Almost all props previously were passed as this.props w/o proper typing with prop-types
            // after the migration to TS i made it explicit
            return isDayDisabled(day, {
                minDate: _this.props.minDate,
                maxDate: _this.props.maxDate,
                excludeDates: _this.props.excludeDates,
                excludeDateIntervals: _this.props.excludeDateIntervals,
                includeDateIntervals: _this.props.includeDateIntervals,
                includeDates: _this.props.includeDates,
                filterDate: _this.props.filterDate,
            });
        };
        _this.isExcluded = function (day) {
            // Almost all props previously were passed as this.props w/o proper typing with prop-types
            // after the migration to TS i made it explicit
            return isDayExcluded(day, {
                excludeDates: _this.props.excludeDates,
                excludeDateIntervals: _this.props.excludeDateIntervals,
            });
        };
        _this.handleDayClick = function (day, event) {
            var _a, _b;
            (_b = (_a = _this.props).onDayClick) === null || _b === void 0 ? void 0 : _b.call(_a, day, event, _this.props.orderInDisplay);
        };
        _this.handleDayMouseEnter = function (day) {
            var _a, _b;
            (_b = (_a = _this.props).onDayMouseEnter) === null || _b === void 0 ? void 0 : _b.call(_a, day);
        };
        _this.handleMouseLeave = function () {
            var _a, _b;
            (_b = (_a = _this.props).onMouseLeave) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        _this.isRangeStartMonth = function (m) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameMonth(setMonth.setMonth(day, m), startDate);
        };
        _this.isRangeStartQuarter = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameQuarter(setQuarter.setQuarter(day, q), startDate);
        };
        _this.isRangeEndMonth = function (m) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameMonth(setMonth.setMonth(day, m), endDate);
        };
        _this.isRangeEndQuarter = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameQuarter(setQuarter.setQuarter(day, q), endDate);
        };
        _this.isInSelectingRangeMonth = function (m) {
            var _a;
            var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, startDate = _b.startDate, endDate = _b.endDate;
            var selectingDate = (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection;
            if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
                return false;
            }
            if (selectsStart && endDate) {
                return isMonthInRange(selectingDate, endDate, m, day);
            }
            if (selectsEnd && startDate) {
                return isMonthInRange(startDate, selectingDate, m, day);
            }
            if (selectsRange && startDate && !endDate) {
                return isMonthInRange(startDate, selectingDate, m, day);
            }
            return false;
        };
        _this.isSelectingMonthRangeStart = function (m) {
            var _a;
            if (!_this.isInSelectingRangeMonth(m)) {
                return false;
            }
            var _b = _this.props, day = _b.day, startDate = _b.startDate, selectsStart = _b.selectsStart;
            var _month = setMonth.setMonth(day, m);
            var selectingDate = (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection;
            if (selectsStart) {
                return isSameMonth(_month, selectingDate);
            }
            else {
                return isSameMonth(_month, startDate);
            }
        };
        _this.isSelectingMonthRangeEnd = function (m) {
            var _a;
            if (!_this.isInSelectingRangeMonth(m)) {
                return false;
            }
            var _b = _this.props, day = _b.day, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
            var _month = setMonth.setMonth(day, m);
            var selectingDate = (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection;
            if (selectsEnd || selectsRange) {
                return isSameMonth(_month, selectingDate);
            }
            else {
                return isSameMonth(_month, endDate);
            }
        };
        _this.isInSelectingRangeQuarter = function (q) {
            var _a;
            var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, startDate = _b.startDate, endDate = _b.endDate;
            var selectingDate = (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection;
            if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
                return false;
            }
            if (selectsStart && endDate) {
                return isQuarterInRange(selectingDate, endDate, q, day);
            }
            if (selectsEnd && startDate) {
                return isQuarterInRange(startDate, selectingDate, q, day);
            }
            if (selectsRange && startDate && !endDate) {
                return isQuarterInRange(startDate, selectingDate, q, day);
            }
            return false;
        };
        _this.isWeekInMonth = function (startOfWeek) {
            var day = _this.props.day;
            var endOfWeek = addDays.addDays(startOfWeek, 6);
            return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
        };
        _this.isCurrentMonth = function (day, m) {
            return getYear.getYear(day) === getYear.getYear(newDate()) && m === getMonth.getMonth(newDate());
        };
        _this.isCurrentQuarter = function (day, q) {
            return getYear.getYear(day) === getYear.getYear(newDate()) && q === getQuarter.getQuarter(newDate());
        };
        _this.isSelectedMonth = function (day, m, selected) {
            return getMonth.getMonth(selected) === m && getYear.getYear(day) === getYear.getYear(selected);
        };
        _this.isSelectedQuarter = function (day, q, selected) {
            return getQuarter.getQuarter(day) === q && getYear.getYear(day) === getYear.getYear(selected);
        };
        _this.renderWeeks = function () {
            var weeks = [];
            var isFixedHeight = _this.props.fixedHeight;
            var i = 0;
            var breakAfterNextPush = false;
            var currentWeekStart = getStartOfWeek(getStartOfMonth(_this.props.day), _this.props.locale, _this.props.calendarStartDay);
            var isPreSelected = function (preSelection) {
                return _this.props.showWeekPicker
                    ? getStartOfWeek(preSelection, _this.props.locale, _this.props.calendarStartDay)
                    : _this.props.preSelection;
            };
            var isSelected = function (selected) {
                return _this.props.showWeekPicker
                    ? getStartOfWeek(selected, _this.props.locale, _this.props.calendarStartDay)
                    : _this.props.selected;
            };
            var selected = _this.props.selected
                ? isSelected(_this.props.selected)
                : undefined;
            var preSelection = _this.props.preSelection
                ? isPreSelected(_this.props.preSelection)
                : undefined;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                weeks.push(React__default.default.createElement(Week, _assign({}, _this.props, { ariaLabelPrefix: _this.props.weekAriaLabelPrefix, key: i, day: currentWeekStart, month: getMonth.getMonth(_this.props.day), onDayClick: _this.handleDayClick, onDayMouseEnter: _this.handleDayMouseEnter, selected: selected, preSelection: preSelection, showWeekNumber: _this.props.showWeekNumbers })));
                if (breakAfterNextPush)
                    break;
                i++;
                currentWeekStart = addWeeks.addWeeks(currentWeekStart, 1);
                // If one of these conditions is true, we will either break on this week
                // or break on the next week
                var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
                var isNonFixedAndOutOfMonth = !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);
                if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
                    if (_this.props.peekNextMonth) {
                        breakAfterNextPush = true;
                    }
                    else {
                        break;
                    }
                }
            }
            return weeks;
        };
        _this.onMonthClick = function (event, m) {
            var _a = _this.isMonthDisabledForLabelDate(m), isDisabled = _a.isDisabled, labelDate = _a.labelDate;
            if (isDisabled) {
                return;
            }
            _this.handleDayClick(getStartOfMonth(labelDate), event);
        };
        _this.onMonthMouseEnter = function (m) {
            var _a = _this.isMonthDisabledForLabelDate(m), isDisabled = _a.isDisabled, labelDate = _a.labelDate;
            if (isDisabled) {
                return;
            }
            _this.handleDayMouseEnter(getStartOfMonth(labelDate));
        };
        _this.handleMonthNavigation = function (newMonth, newDate) {
            var _a, _b, _c, _d;
            (_b = (_a = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a, newDate);
            (_d = (_c = _this.MONTH_REFS[newMonth]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
        };
        _this.handleKeyboardNavigation = function (event, eventKey, month) {
            var _a;
            var _b = _this.props, selected = _b.selected, preSelection = _b.preSelection, setPreSelection = _b.setPreSelection, minDate = _b.minDate, maxDate = _b.maxDate, showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker;
            if (!preSelection)
                return;
            var monthColumnsLayout = getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker);
            var verticalOffset = _this.getVerticalOffset(monthColumnsLayout);
            var monthsGrid = (_a = MONTH_COLUMNS[monthColumnsLayout]) === null || _a === void 0 ? void 0 : _a.grid;
            var calculateNewDateAndMonth = function (eventKey, date, month) {
                var _a, _b;
                var newCalculatedDate = date;
                var newCalculatedMonth = month;
                switch (eventKey) {
                    case KeyType.ArrowRight:
                        newCalculatedDate = addMonths.addMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
                        newCalculatedMonth =
                            month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
                        break;
                    case KeyType.ArrowLeft:
                        newCalculatedDate = subMonths.subMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
                        newCalculatedMonth =
                            month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
                        break;
                    case KeyType.ArrowUp:
                        newCalculatedDate = subMonths.subMonths(date, verticalOffset);
                        newCalculatedMonth = ((_a = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[0]) === null || _a === void 0 ? void 0 : _a.includes(month))
                            ? month + 12 - verticalOffset
                            : month - verticalOffset;
                        break;
                    case KeyType.ArrowDown:
                        newCalculatedDate = addMonths.addMonths(date, verticalOffset);
                        newCalculatedMonth = ((_b = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[monthsGrid.length - 1]) === null || _b === void 0 ? void 0 : _b.includes(month))
                            ? month - 12 + verticalOffset
                            : month + verticalOffset;
                        break;
                }
                return { newCalculatedDate: newCalculatedDate, newCalculatedMonth: newCalculatedMonth };
            };
            var getNewDateAndMonth = function (eventKey, selectedDate, month) {
                var MAX_ITERATIONS = 40;
                var eventKeyCopy = eventKey;
                var validDateFound = false;
                var iterations = 0;
                var _a = calculateNewDateAndMonth(eventKeyCopy, selectedDate, month), newCalculatedDate = _a.newCalculatedDate, newCalculatedMonth = _a.newCalculatedMonth;
                while (!validDateFound) {
                    if (iterations >= MAX_ITERATIONS) {
                        newCalculatedDate = selectedDate;
                        newCalculatedMonth = month;
                        break;
                    }
                    // if minDate exists and the new month is before the minimum month, it will try to find the next available month after
                    if (minDate && newCalculatedDate < minDate) {
                        eventKeyCopy = KeyType.ArrowRight;
                        var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate, newCalculatedMonth);
                        newCalculatedDate = obj.newCalculatedDate;
                        newCalculatedMonth = obj.newCalculatedMonth;
                    }
                    // if maxDate exists and the new month is after the maximum month, it will try to find the next available month before
                    if (maxDate && newCalculatedDate > maxDate) {
                        eventKeyCopy = KeyType.ArrowLeft;
                        var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate, newCalculatedMonth);
                        newCalculatedDate = obj.newCalculatedDate;
                        newCalculatedMonth = obj.newCalculatedMonth;
                    }
                    if (isMonthYearDisabled(newCalculatedDate, _this.props)) {
                        var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate, newCalculatedMonth);
                        newCalculatedDate = obj.newCalculatedDate;
                        newCalculatedMonth = obj.newCalculatedMonth;
                    }
                    else {
                        validDateFound = true;
                    }
                    iterations++;
                }
                return { newCalculatedDate: newCalculatedDate, newCalculatedMonth: newCalculatedMonth };
            };
            if (eventKey === KeyType.Enter) {
                if (!_this.isMonthDisabled(month)) {
                    _this.onMonthClick(event, month);
                    setPreSelection === null || setPreSelection === void 0 ? void 0 : setPreSelection(selected);
                }
                return;
            }
            var _c = getNewDateAndMonth(eventKey, preSelection, month), newCalculatedDate = _c.newCalculatedDate, newCalculatedMonth = _c.newCalculatedMonth;
            switch (eventKey) {
                case KeyType.ArrowRight:
                case KeyType.ArrowLeft:
                case KeyType.ArrowUp:
                case KeyType.ArrowDown:
                    _this.handleMonthNavigation(newCalculatedMonth, newCalculatedDate);
                    break;
            }
        };
        _this.getVerticalOffset = function (monthColumnsLayout) {
            var _a, _b;
            return (_b = (_a = MONTH_COLUMNS[monthColumnsLayout]) === null || _a === void 0 ? void 0 : _a.verticalNavigationOffset) !== null && _b !== void 0 ? _b : 0;
        };
        _this.onMonthKeyDown = function (event, month) {
            var _a = _this.props, disabledKeyboardNavigation = _a.disabledKeyboardNavigation, handleOnMonthKeyDown = _a.handleOnMonthKeyDown;
            var eventKey = event.key;
            if (eventKey !== KeyType.Tab) {
                // preventDefault on tab event blocks focus change
                event.preventDefault();
            }
            if (!disabledKeyboardNavigation) {
                _this.handleKeyboardNavigation(event, eventKey, month);
            }
            handleOnMonthKeyDown && handleOnMonthKeyDown(event);
        };
        _this.onQuarterClick = function (event, q) {
            var labelDate = setQuarter.setQuarter(_this.props.day, q);
            if (isQuarterDisabled(labelDate, _this.props)) {
                return;
            }
            _this.handleDayClick(getStartOfQuarter(labelDate), event);
        };
        _this.onQuarterMouseEnter = function (q) {
            var labelDate = setQuarter.setQuarter(_this.props.day, q);
            if (isQuarterDisabled(labelDate, _this.props)) {
                return;
            }
            _this.handleDayMouseEnter(getStartOfQuarter(labelDate));
        };
        _this.handleQuarterNavigation = function (newQuarter, newDate) {
            var _a, _b, _c, _d;
            if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) {
                return;
            }
            (_b = (_a = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a, newDate);
            (_d = (_c = _this.QUARTER_REFS[newQuarter - 1]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
        };
        _this.onQuarterKeyDown = function (event, quarter) {
            var _a, _b;
            var eventKey = event.key;
            if (!_this.props.disabledKeyboardNavigation) {
                switch (eventKey) {
                    case KeyType.Enter:
                        _this.onQuarterClick(event, quarter);
                        (_b = (_a = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props.selected);
                        break;
                    case KeyType.ArrowRight:
                        if (!_this.props.preSelection) {
                            break;
                        }
                        _this.handleQuarterNavigation(quarter === 4 ? 1 : quarter + 1, addQuarters.addQuarters(_this.props.preSelection, 1));
                        break;
                    case KeyType.ArrowLeft:
                        if (!_this.props.preSelection) {
                            break;
                        }
                        _this.handleQuarterNavigation(quarter === 1 ? 4 : quarter - 1, subQuarters.subQuarters(_this.props.preSelection, 1));
                        break;
                }
            }
        };
        _this.isMonthDisabledForLabelDate = function (month) {
            var _a;
            var _b = _this.props, day = _b.day, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
            var labelDate = setMonth.setMonth(day, month);
            return {
                isDisabled: (_a = ((minDate || maxDate || excludeDates || includeDates) &&
                    isMonthDisabled(labelDate, _this.props))) !== null && _a !== void 0 ? _a : false,
                labelDate: labelDate,
            };
        };
        _this.isMonthDisabled = function (month) {
            var isDisabled = _this.isMonthDisabledForLabelDate(month).isDisabled;
            return isDisabled;
        };
        _this.getMonthClassNames = function (m) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate, selected = _a.selected, preSelection = _a.preSelection, monthClassName = _a.monthClassName;
            var _monthClassName = monthClassName
                ? monthClassName(setMonth.setMonth(day, m))
                : undefined;
            return clsx.clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
                "react-datepicker__month-text--disabled": _this.isMonthDisabled(m),
                "react-datepicker__month-text--selected": selected
                    ? _this.isSelectedMonth(day, m, selected)
                    : undefined,
                "react-datepicker__month-text--keyboard-selected": !_this.props.disabledKeyboardNavigation &&
                    preSelection &&
                    _this.isSelectedMonth(day, m, preSelection),
                "react-datepicker__month-text--in-selecting-range": _this.isInSelectingRangeMonth(m),
                "react-datepicker__month-text--in-range": startDate && endDate
                    ? isMonthInRange(startDate, endDate, m, day)
                    : undefined,
                "react-datepicker__month-text--range-start": _this.isRangeStartMonth(m),
                "react-datepicker__month-text--range-end": _this.isRangeEndMonth(m),
                "react-datepicker__month-text--selecting-range-start": _this.isSelectingMonthRangeStart(m),
                "react-datepicker__month-text--selecting-range-end": _this.isSelectingMonthRangeEnd(m),
                "react-datepicker__month-text--today": _this.isCurrentMonth(day, m),
            });
        };
        _this.getTabIndex = function (m) {
            if (_this.props.preSelection == null) {
                return "-1";
            }
            var preSelectedMonth = getMonth.getMonth(_this.props.preSelection);
            var tabIndex = !_this.props.disabledKeyboardNavigation && m === preSelectedMonth
                ? "0"
                : "-1";
            return tabIndex;
        };
        _this.getQuarterTabIndex = function (q) {
            if (_this.props.preSelection == null) {
                return "-1";
            }
            var preSelectedQuarter = getQuarter.getQuarter(_this.props.preSelection);
            var tabIndex = !_this.props.disabledKeyboardNavigation && q === preSelectedQuarter
                ? "0"
                : "-1";
            return tabIndex;
        };
        _this.getAriaLabel = function (month) {
            var _a = _this.props, _b = _a.chooseDayAriaLabelPrefix, chooseDayAriaLabelPrefix = _b === void 0 ? "Choose" : _b, _c = _a.disabledDayAriaLabelPrefix, disabledDayAriaLabelPrefix = _c === void 0 ? "Not available" : _c, day = _a.day, locale = _a.locale;
            var labelDate = setMonth.setMonth(day, month);
            var prefix = _this.isDisabled(labelDate) || _this.isExcluded(labelDate)
                ? disabledDayAriaLabelPrefix
                : chooseDayAriaLabelPrefix;
            return "".concat(prefix, " ").concat(formatDate(labelDate, "MMMM yyyy", locale));
        };
        _this.getQuarterClassNames = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate, selected = _a.selected, minDate = _a.minDate, maxDate = _a.maxDate, preSelection = _a.preSelection, disabledKeyboardNavigation = _a.disabledKeyboardNavigation;
            return clsx.clsx("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
                "react-datepicker__quarter-text--disabled": (minDate || maxDate) &&
                    isQuarterDisabled(setQuarter.setQuarter(day, q), _this.props),
                "react-datepicker__quarter-text--selected": selected
                    ? _this.isSelectedQuarter(day, q, selected)
                    : undefined,
                "react-datepicker__quarter-text--keyboard-selected": !disabledKeyboardNavigation &&
                    preSelection &&
                    _this.isSelectedQuarter(day, q, preSelection),
                "react-datepicker__quarter-text--in-selecting-range": _this.isInSelectingRangeQuarter(q),
                "react-datepicker__quarter-text--in-range": startDate && endDate
                    ? isQuarterInRange(startDate, endDate, q, day)
                    : undefined,
                "react-datepicker__quarter-text--range-start": _this.isRangeStartQuarter(q),
                "react-datepicker__quarter-text--range-end": _this.isRangeEndQuarter(q),
            });
        };
        _this.getMonthContent = function (m) {
            var _a = _this.props, showFullMonthYearPicker = _a.showFullMonthYearPicker, renderMonthContent = _a.renderMonthContent, locale = _a.locale, day = _a.day;
            var shortMonthText = getMonthShortInLocale(m, locale);
            var fullMonthText = getMonthInLocale(m, locale);
            if (renderMonthContent) {
                return renderMonthContent(m, shortMonthText, fullMonthText, day);
            }
            return showFullMonthYearPicker ? fullMonthText : shortMonthText;
        };
        _this.getQuarterContent = function (q) {
            var _a;
            var _b = _this.props, renderQuarterContent = _b.renderQuarterContent, locale = _b.locale;
            var shortQuarter = getQuarterShortInLocale(q, locale);
            return (_a = renderQuarterContent === null || renderQuarterContent === void 0 ? void 0 : renderQuarterContent(q, shortQuarter)) !== null && _a !== void 0 ? _a : shortQuarter;
        };
        _this.renderMonths = function () {
            var _a;
            var _b = _this.props, showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker, showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker, day = _b.day, selected = _b.selected;
            var monthColumns = (_a = MONTH_COLUMNS[getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker)]) === null || _a === void 0 ? void 0 : _a.grid;
            return monthColumns === null || monthColumns === void 0 ? void 0 : monthColumns.map(function (month, i) { return (React__default.default.createElement("div", { className: "react-datepicker__month-wrapper", key: i }, month.map(function (m, j) { return (React__default.default.createElement("div", { ref: _this.MONTH_REFS[m], key: j, onClick: function (event) {
                    _this.onMonthClick(event, m);
                }, onKeyDown: function (event) {
                    if (isSpaceKeyDown(event)) {
                        event.preventDefault();
                        event.key = KeyType.Enter;
                    }
                    _this.onMonthKeyDown(event, m);
                }, onMouseEnter: !_this.props.usePointerEvent
                    ? function () { return _this.onMonthMouseEnter(m); }
                    : undefined, onPointerEnter: _this.props.usePointerEvent
                    ? function () { return _this.onMonthMouseEnter(m); }
                    : undefined, tabIndex: Number(_this.getTabIndex(m)), className: _this.getMonthClassNames(m), "aria-disabled": _this.isMonthDisabled(m), role: "option", "aria-label": _this.getAriaLabel(m), "aria-current": _this.isCurrentMonth(day, m) ? "date" : undefined, "aria-selected": selected ? _this.isSelectedMonth(day, m, selected) : undefined }, _this.getMonthContent(m))); }))); });
        };
        _this.renderQuarters = function () {
            var _a = _this.props, day = _a.day, selected = _a.selected;
            var quarters = [1, 2, 3, 4];
            return (React__default.default.createElement("div", { className: "react-datepicker__quarter-wrapper" }, quarters.map(function (q, j) { return (React__default.default.createElement("div", { key: j, ref: _this.QUARTER_REFS[j], role: "option", onClick: function (event) {
                    _this.onQuarterClick(event, q);
                }, onKeyDown: function (event) {
                    _this.onQuarterKeyDown(event, q);
                }, onMouseEnter: !_this.props.usePointerEvent
                    ? function () { return _this.onQuarterMouseEnter(q); }
                    : undefined, onPointerEnter: _this.props.usePointerEvent
                    ? function () { return _this.onQuarterMouseEnter(q); }
                    : undefined, className: _this.getQuarterClassNames(q), "aria-selected": selected ? _this.isSelectedQuarter(day, q, selected) : undefined, tabIndex: Number(_this.getQuarterTabIndex(q)), "aria-current": _this.isCurrentQuarter(day, q) ? "date" : undefined }, _this.getQuarterContent(q))); })));
        };
        _this.getClassNames = function () {
            var _a = _this.props, selectingDate = _a.selectingDate, selectsStart = _a.selectsStart, selectsEnd = _a.selectsEnd, showMonthYearPicker = _a.showMonthYearPicker, showQuarterYearPicker = _a.showQuarterYearPicker, showWeekPicker = _a.showWeekPicker;
            return clsx.clsx("react-datepicker__month", {
                "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd),
            }, { "react-datepicker__monthPicker": showMonthYearPicker }, { "react-datepicker__quarterPicker": showQuarterYearPicker }, { "react-datepicker__weekPicker": showWeekPicker });
        };
        return _this;
    }
    Month.prototype.render = function () {
        var _a = this.props, showMonthYearPicker = _a.showMonthYearPicker, showQuarterYearPicker = _a.showQuarterYearPicker, day = _a.day, _b = _a.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? "Month " : _b;
        var formattedAriaLabelPrefix = ariaLabelPrefix
            ? ariaLabelPrefix.trim() + " "
            : "";
        return (React__default.default.createElement("div", { className: this.getClassNames(), onMouseLeave: !this.props.usePointerEvent ? this.handleMouseLeave : undefined, onPointerLeave: this.props.usePointerEvent ? this.handleMouseLeave : undefined, "aria-label": "".concat(formattedAriaLabelPrefix).concat(formatDate(day, "MMMM, yyyy", this.props.locale)), role: "listbox" }, showMonthYearPicker
            ? this.renderMonths()
            : showQuarterYearPicker
                ? this.renderQuarters()
                : this.renderWeeks()));
    };
    return Month;
}(React.Component));

var MonthDropdownOptions = /** @class */ (function (_super) {
    __extends(MonthDropdownOptions, _super);
    function MonthDropdownOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSelectedMonth = function (i) { return _this.props.month === i; };
        _this.renderOptions = function () {
            return _this.props.monthNames.map(function (month, i) { return (React__default.default.createElement("div", { className: _this.isSelectedMonth(i)
                    ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
                    : "react-datepicker__month-option", key: month, onClick: _this.onChange.bind(_this, i), "aria-selected": _this.isSelectedMonth(i) ? "true" : undefined },
                _this.isSelectedMonth(i) ? (React__default.default.createElement("span", { className: "react-datepicker__month-option--selected" }, "\u2713")) : (""),
                month)); });
        };
        _this.onChange = function (month) { return _this.props.onChange(month); };
        _this.handleClickOutside = function () { return _this.props.onCancel(); };
        return _this;
    }
    MonthDropdownOptions.prototype.render = function () {
        return (React__default.default.createElement("div", { className: "react-datepicker__month-dropdown" }, this.renderOptions()));
    };
    return MonthDropdownOptions;
}(React.Component));

var WrappedMonthDropdownOptions = onClickOutside__default.default(MonthDropdownOptions);
var MonthDropdown = /** @class */ (function (_super) {
    __extends(MonthDropdown, _super);
    function MonthDropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownVisible: false,
        };
        _this.renderSelectOptions = function (monthNames) {
            return monthNames.map(function (m, i) { return (React__default.default.createElement("option", { key: m, value: i }, m)); });
        };
        _this.renderSelectMode = function (monthNames) { return (React__default.default.createElement("select", { value: _this.props.month, className: "react-datepicker__month-select", onChange: function (e) { return _this.onChange(parseInt(e.target.value)); } }, _this.renderSelectOptions(monthNames))); };
        _this.renderReadView = function (visible, monthNames) { return (React__default.default.createElement("div", { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-read-view", onClick: _this.toggleDropdown },
            React__default.default.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }),
            React__default.default.createElement("span", { className: "react-datepicker__month-read-view--selected-month" }, monthNames[_this.props.month]))); };
        _this.renderDropdown = function (monthNames) { return (React__default.default.createElement(WrappedMonthDropdownOptions, _assign({ key: "dropdown" }, _this.props, { monthNames: monthNames, onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
        _this.renderScrollMode = function (monthNames) {
            var dropdownVisible = _this.state.dropdownVisible;
            var result = [_this.renderReadView(!dropdownVisible, monthNames)];
            if (dropdownVisible) {
                result.unshift(_this.renderDropdown(monthNames));
            }
            return result;
        };
        _this.onChange = function (month) {
            _this.toggleDropdown();
            if (month !== _this.props.month) {
                _this.props.onChange(month);
            }
        };
        _this.toggleDropdown = function () {
            return _this.setState({
                dropdownVisible: !_this.state.dropdownVisible,
            });
        };
        return _this;
    }
    MonthDropdown.prototype.render = function () {
        var _this = this;
        var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown
            ? function (m) { return getMonthShortInLocale(m, _this.props.locale); }
            : function (m) { return getMonthInLocale(m, _this.props.locale); });
        var renderedDropdown;
        switch (this.props.dropdownMode) {
            case "scroll":
                renderedDropdown = this.renderScrollMode(monthNames);
                break;
            case "select":
                renderedDropdown = this.renderSelectMode(monthNames);
                break;
        }
        return (React__default.default.createElement("div", { className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown));
    };
    return MonthDropdown;
}(React.Component));

function generateMonthYears(minDate, maxDate) {
    var list = [];
    var currDate = getStartOfMonth(minDate);
    var lastDate = getStartOfMonth(maxDate);
    while (!isAfter.isAfter(currDate, lastDate)) {
        list.push(newDate(currDate));
        currDate = addMonths.addMonths(currDate, 1);
    }
    return list;
}
var MonthYearDropdownOptions = /** @class */ (function (_super) {
    __extends(MonthYearDropdownOptions, _super);
    function MonthYearDropdownOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.renderOptions = function () {
            return _this.state.monthYearsList.map(function (monthYear) {
                var monthYearPoint = getTime.getTime(monthYear);
                var isSameMonthYear = isSameYear(_this.props.date, monthYear) &&
                    isSameMonth(_this.props.date, monthYear);
                return (React__default.default.createElement("div", { className: isSameMonthYear
                        ? "react-datepicker__month-year-option--selected_month-year"
                        : "react-datepicker__month-year-option", key: monthYearPoint, onClick: _this.onChange.bind(_this, monthYearPoint), "aria-selected": isSameMonthYear ? "true" : undefined },
                    isSameMonthYear ? (React__default.default.createElement("span", { className: "react-datepicker__month-year-option--selected" }, "\u2713")) : (""),
                    formatDate(monthYear, _this.props.dateFormat, _this.props.locale)));
            });
        };
        _this.onChange = function (monthYear) { return _this.props.onChange(monthYear); };
        _this.handleClickOutside = function () {
            _this.props.onCancel();
        };
        _this.state = {
            monthYearsList: generateMonthYears(_this.props.minDate, _this.props.maxDate),
        };
        return _this;
    }
    MonthYearDropdownOptions.prototype.render = function () {
        var dropdownClass = clsx.clsx({
            "react-datepicker__month-year-dropdown": true,
            "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown,
        });
        return React__default.default.createElement("div", { className: dropdownClass }, this.renderOptions());
    };
    return MonthYearDropdownOptions;
}(React.Component));

var WrappedMonthYearDropdownOptions = onClickOutside__default.default(MonthYearDropdownOptions);
var MonthYearDropdown = /** @class */ (function (_super) {
    __extends(MonthYearDropdown, _super);
    function MonthYearDropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownVisible: false,
        };
        _this.renderSelectOptions = function () {
            var currDate = getStartOfMonth(_this.props.minDate);
            var lastDate = getStartOfMonth(_this.props.maxDate);
            var options = [];
            while (!isAfter.isAfter(currDate, lastDate)) {
                var timePoint = getTime.getTime(currDate);
                options.push(React__default.default.createElement("option", { key: timePoint, value: timePoint }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
                currDate = addMonths.addMonths(currDate, 1);
            }
            return options;
        };
        _this.onSelectChange = function (event) {
            _this.onChange(parseInt(event.target.value));
        };
        _this.renderSelectMode = function () { return (React__default.default.createElement("select", { value: getTime.getTime(getStartOfMonth(_this.props.date)), className: "react-datepicker__month-year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions())); };
        _this.renderReadView = function (visible) {
            var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
            return (React__default.default.createElement("div", { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-year-read-view", onClick: _this.toggleDropdown },
                React__default.default.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }),
                React__default.default.createElement("span", { className: "react-datepicker__month-year-read-view--selected-month-year" }, yearMonth)));
        };
        _this.renderDropdown = function () { return (React__default.default.createElement(WrappedMonthYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
        _this.renderScrollMode = function () {
            var dropdownVisible = _this.state.dropdownVisible;
            var result = [_this.renderReadView(!dropdownVisible)];
            if (dropdownVisible) {
                result.unshift(_this.renderDropdown());
            }
            return result;
        };
        _this.onChange = function (monthYearPoint) {
            _this.toggleDropdown();
            var changedDate = newDate(monthYearPoint);
            if (isSameYear(_this.props.date, changedDate) &&
                isSameMonth(_this.props.date, changedDate)) {
                return;
            }
            _this.props.onChange(changedDate);
        };
        _this.toggleDropdown = function () {
            return _this.setState({
                dropdownVisible: !_this.state.dropdownVisible,
            });
        };
        return _this;
    }
    MonthYearDropdown.prototype.render = function () {
        var renderedDropdown;
        switch (this.props.dropdownMode) {
            case "scroll":
                renderedDropdown = this.renderScrollMode();
                break;
            case "select":
                renderedDropdown = this.renderSelectMode();
                break;
        }
        return (React__default.default.createElement("div", { className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown));
    };
    return MonthYearDropdown;
}(React.Component));

var Time = /** @class */ (function (_super) {
    __extends(Time, _super);
    function Time() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            height: null,
        };
        _this.scrollToTheSelectedTime = function () {
            requestAnimationFrame(function () {
                var _a, _b, _c;
                if (!_this.list)
                    return;
                _this.list.scrollTop =
                    (_c = (_this.centerLi &&
                        Time.calcCenterPosition(_this.props.monthRef
                            ? _this.props.monthRef.clientHeight -
                                ((_b = (_a = _this.header) === null || _a === void 0 ? void 0 : _a.clientHeight) !== null && _b !== void 0 ? _b : 0)
                            : _this.list.clientHeight, _this.centerLi))) !== null && _c !== void 0 ? _c : 0;
            });
        };
        _this.handleClick = function (time) {
            var _a, _b;
            if (((_this.props.minTime || _this.props.maxTime) &&
                isTimeInDisabledRange(time, _this.props)) ||
                ((_this.props.excludeTimes ||
                    _this.props.includeTimes ||
                    _this.props.filterTime) &&
                    isTimeDisabled(time, _this.props))) {
                return;
            }
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, time);
        };
        _this.isSelectedTime = function (time) {
            return _this.props.selected && isSameMinute(_this.props.selected, time);
        };
        _this.isDisabledTime = function (time) {
            return ((_this.props.minTime || _this.props.maxTime) &&
                isTimeInDisabledRange(time, _this.props)) ||
                ((_this.props.excludeTimes ||
                    _this.props.includeTimes ||
                    _this.props.filterTime) &&
                    isTimeDisabled(time, _this.props));
        };
        _this.liClasses = function (time) {
            var _a;
            var classes = [
                "react-datepicker__time-list-item",
                _this.props.timeClassName ? _this.props.timeClassName(time) : undefined,
            ];
            if (_this.isSelectedTime(time)) {
                classes.push("react-datepicker__time-list-item--selected");
            }
            if (_this.isDisabledTime(time)) {
                classes.push("react-datepicker__time-list-item--disabled");
            }
            //convert this.props.intervals and the relevant time to seconds and check if it it's a clean multiple of the interval
            if (_this.props.injectTimes &&
                (getHours.getHours(time) * 3600 + getMinutes.getMinutes(time) * 60 + getSeconds.getSeconds(time)) %
                    (((_a = _this.props.intervals) !== null && _a !== void 0 ? _a : Time.defaultProps.intervals) * 60) !==
                    0) {
                classes.push("react-datepicker__time-list-item--injected");
            }
            return classes.join(" ");
        };
        _this.handleOnKeyDown = function (event, time) {
            var _a, _b;
            if (event.key === KeyType.Space) {
                event.preventDefault();
                event.key = KeyType.Enter;
            }
            if ((event.key === KeyType.ArrowUp || event.key === KeyType.ArrowLeft) &&
                event.target instanceof HTMLElement &&
                event.target.previousSibling) {
                event.preventDefault();
                event.target.previousSibling instanceof HTMLElement &&
                    event.target.previousSibling.focus();
            }
            if ((event.key === KeyType.ArrowDown || event.key === KeyType.ArrowRight) &&
                event.target instanceof HTMLElement &&
                event.target.nextSibling) {
                event.preventDefault();
                event.target.nextSibling instanceof HTMLElement &&
                    event.target.nextSibling.focus();
            }
            if (event.key === KeyType.Enter) {
                _this.handleClick(time);
            }
            (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        _this.renderTimes = function () {
            var _a;
            var times = [];
            var format = _this.props.format ? _this.props.format : "p";
            var intervals = (_a = _this.props.intervals) !== null && _a !== void 0 ? _a : Time.defaultProps.intervals;
            var activeDate = _this.props.selected || _this.props.openToDate || newDate();
            var base = getStartOfDay(activeDate);
            var sortedInjectTimes = _this.props.injectTimes &&
                _this.props.injectTimes.sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
            var minutesInDay = 60 * getHoursInDay(activeDate);
            var multiplier = minutesInDay / intervals;
            for (var i = 0; i < multiplier; i++) {
                var currentTime = addMinutes.addMinutes(base, i * intervals);
                times.push(currentTime);
                if (sortedInjectTimes) {
                    var timesToInject = timesToInjectAfter(base, currentTime, i, intervals, sortedInjectTimes);
                    times = times.concat(timesToInject);
                }
            }
            // Determine which time to focus and scroll into view when component mounts
            var timeToFocus = times.reduce(function (prev, time) {
                if (time.getTime() <= activeDate.getTime()) {
                    return time;
                }
                return prev;
            }, times[0]);
            return times.map(function (time) {
                return (React__default.default.createElement("li", { key: time.valueOf(), onClick: _this.handleClick.bind(_this, time), className: _this.liClasses(time), ref: function (li) {
                        if (time === timeToFocus) {
                            _this.centerLi = li;
                        }
                    }, onKeyDown: function (event) {
                        _this.handleOnKeyDown(event, time);
                    }, tabIndex: time === timeToFocus ? 0 : -1, role: "option", "aria-selected": _this.isSelectedTime(time) ? "true" : undefined, "aria-disabled": _this.isDisabledTime(time) ? "true" : undefined }, formatDate(time, format, _this.props.locale)));
            });
        };
        return _this;
    }
    Object.defineProperty(Time, "defaultProps", {
        get: function () {
            return {
                intervals: 30,
                todayButton: null,
                timeCaption: "Time",
            };
        },
        enumerable: false,
        configurable: true
    });
    Time.prototype.componentDidMount = function () {
        // code to ensure selected time will always be in focus within time window when it first appears
        this.scrollToTheSelectedTime();
        if (this.props.monthRef && this.header) {
            this.setState({
                height: this.props.monthRef.clientHeight - this.header.clientHeight,
            });
        }
    };
    Time.prototype.render = function () {
        var _this = this;
        var _a;
        var height = this.state.height;
        return (React__default.default.createElement("div", { className: "react-datepicker__time-container ".concat(((_a = this.props.todayButton) !== null && _a !== void 0 ? _a : Time.defaultProps.todayButton)
                ? "react-datepicker__time-container--with-today-button"
                : "") },
            React__default.default.createElement("div", { className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly
                    ? "react-datepicker__header--time--only"
                    : ""), ref: function (header) {
                    _this.header = header;
                } },
                React__default.default.createElement("div", { className: "react-datepicker-time__header" }, this.props.timeCaption)),
            React__default.default.createElement("div", { className: "react-datepicker__time" },
                React__default.default.createElement("div", { className: "react-datepicker__time-box" },
                    React__default.default.createElement("ul", { className: "react-datepicker__time-list", ref: function (list) {
                            _this.list = list;
                        }, style: height ? { height: height } : {}, role: "listbox", "aria-label": this.props.timeCaption }, this.renderTimes())))));
    };
    Time.calcCenterPosition = function (listHeight, centerLiRef) {
        return (centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2));
    };
    return Time;
}(React.Component));

var VERTICAL_NAVIGATION_OFFSET = 3;
/**
 * `Year` is a component that represents a year in a date picker.
 *
 * @class
 * @param {YearProps} props - The properties that define the `Year` component.
 * @property {VoidFunction} [props.clearSelectingDate] - Function to clear the selected date.
 * @property {Date} [props.date] - The currently selected date.
 * @property {boolean} [props.disabledKeyboardNavigation] - If true, keyboard navigation is disabled.
 * @property {Date} [props.endDate] - The end date in a range selection.
 * @property {(date: Date) => void} props.onDayClick - Function to handle day click events.
 * @property {Date} props.preSelection - The date that is currently in focus.
 * @property {(date: Date) => void} props.setPreSelection - Function to set the pre-selected date.
 * @property {{ [key: string]: any }} props.selected - The selected date(s).
 * @property {boolean} props.inline - If true, the date picker is displayed inline.
 * @property {Date} props.maxDate - The maximum selectable date.
 * @property {Date} props.minDate - The minimum selectable date.
 * @property {boolean} props.usePointerEvent - If true, pointer events are used instead of mouse events.
 * @property {(date: Date) => void} props.onYearMouseEnter - Function to handle mouse enter events on a year.
 * @property {(date: Date) => void} props.onYearMouseLeave - Function to handle mouse leave events on a year.
 */
var Year = /** @class */ (function (_super) {
    __extends(Year, _super);
    function Year(props) {
        var _this = _super.call(this, props) || this;
        _this.YEAR_REFS = __spreadArray([], Array(_this.props.yearItemNumber), true).map(function () {
            return React.createRef();
        });
        _this.isDisabled = function (date) {
            return isDayDisabled(date, {
                minDate: _this.props.minDate,
                maxDate: _this.props.maxDate,
                excludeDates: _this.props.excludeDates,
                includeDates: _this.props.includeDates,
                filterDate: _this.props.filterDate,
            });
        };
        _this.isExcluded = function (date) {
            return isDayExcluded(date, {
                excludeDates: _this.props.excludeDates,
            });
        };
        _this.selectingDate = function () { var _a; return (_a = _this.props.selectingDate) !== null && _a !== void 0 ? _a : _this.props.preSelection; };
        _this.updateFocusOnPaginate = function (refIndex) {
            var waitForReRender = function () {
                var _a, _b;
                (_b = (_a = _this.YEAR_REFS[refIndex]) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.focus();
            };
            window.requestAnimationFrame(waitForReRender);
        };
        _this.handleYearClick = function (day, event) {
            if (_this.props.onDayClick) {
                _this.props.onDayClick(day, event);
            }
        };
        _this.handleYearNavigation = function (newYear, newDate) {
            var _a, _b, _c, _d;
            var _e = _this.props, date = _e.date, yearItemNumber = _e.yearItemNumber;
            if (date === undefined || yearItemNumber === undefined) {
                return;
            }
            var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
            if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) {
                return;
            }
            (_b = (_a = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a, newDate);
            if (newYear - startPeriod < 0) {
                _this.updateFocusOnPaginate(yearItemNumber - (startPeriod - newYear));
            }
            else if (newYear - startPeriod >= yearItemNumber) {
                _this.updateFocusOnPaginate(Math.abs(yearItemNumber - (newYear - startPeriod)));
            }
            else
                (_d = (_c = _this.YEAR_REFS[newYear - startPeriod]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
        };
        _this.isSameDay = function (y, other) { return isSameDay(y, other); };
        _this.isCurrentYear = function (y) { return y === getYear.getYear(newDate()); };
        _this.isRangeStart = function (y) {
            return _this.props.startDate &&
                _this.props.endDate &&
                isSameYear(setYear.setYear(newDate(), y), _this.props.startDate);
        };
        _this.isRangeEnd = function (y) {
            return _this.props.startDate &&
                _this.props.endDate &&
                isSameYear(setYear.setYear(newDate(), y), _this.props.endDate);
        };
        _this.isInRange = function (y) {
            return isYearInRange(y, _this.props.startDate, _this.props.endDate);
        };
        _this.isInSelectingRange = function (y) {
            var _a = _this.props, selectsStart = _a.selectsStart, selectsEnd = _a.selectsEnd, selectsRange = _a.selectsRange, startDate = _a.startDate, endDate = _a.endDate;
            if (!(selectsStart || selectsEnd || selectsRange) ||
                !_this.selectingDate()) {
                return false;
            }
            if (selectsStart && endDate) {
                return isYearInRange(y, _this.selectingDate(), endDate);
            }
            if (selectsEnd && startDate) {
                return isYearInRange(y, startDate, _this.selectingDate());
            }
            if (selectsRange && startDate && !endDate) {
                return isYearInRange(y, startDate, _this.selectingDate());
            }
            return false;
        };
        _this.isSelectingRangeStart = function (y) {
            var _a;
            if (!_this.isInSelectingRange(y)) {
                return false;
            }
            var _b = _this.props, startDate = _b.startDate, selectsStart = _b.selectsStart;
            var _year = setYear.setYear(newDate(), y);
            if (selectsStart) {
                return isSameYear(_year, (_a = _this.selectingDate()) !== null && _a !== void 0 ? _a : null);
            }
            return isSameYear(_year, startDate !== null && startDate !== void 0 ? startDate : null);
        };
        _this.isSelectingRangeEnd = function (y) {
            var _a;
            if (!_this.isInSelectingRange(y)) {
                return false;
            }
            var _b = _this.props, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
            var _year = setYear.setYear(newDate(), y);
            if (selectsEnd || selectsRange) {
                return isSameYear(_year, (_a = _this.selectingDate()) !== null && _a !== void 0 ? _a : null);
            }
            return isSameYear(_year, endDate !== null && endDate !== void 0 ? endDate : null);
        };
        _this.isKeyboardSelected = function (y) {
            if (_this.props.date === undefined ||
                _this.props.selected == null ||
                _this.props.preSelection == null) {
                return;
            }
            var date = getStartOfYear(setYear.setYear(_this.props.date, y));
            return (!_this.props.disabledKeyboardNavigation &&
                !_this.props.inline &&
                !isSameDay(date, getStartOfYear(_this.props.selected)) &&
                isSameDay(date, getStartOfYear(_this.props.preSelection)));
        };
        _this.onYearClick = function (event, y) {
            var date = _this.props.date;
            if (date === undefined) {
                return;
            }
            _this.handleYearClick(getStartOfYear(setYear.setYear(date, y)), event);
        };
        _this.onYearKeyDown = function (event, y) {
            var _a, _b;
            var key = event.key;
            var _c = _this.props, date = _c.date, yearItemNumber = _c.yearItemNumber, handleOnKeyDown = _c.handleOnKeyDown;
            if (key !== KeyType.Tab) {
                // preventDefault on tab event blocks focus change
                event.preventDefault();
            }
            if (!_this.props.disabledKeyboardNavigation) {
                switch (key) {
                    case KeyType.Enter:
                        if (_this.props.selected == null) {
                            break;
                        }
                        _this.onYearClick(event, y);
                        (_b = (_a = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props.selected);
                        break;
                    case KeyType.ArrowRight:
                        if (_this.props.preSelection == null) {
                            break;
                        }
                        _this.handleYearNavigation(y + 1, addYears.addYears(_this.props.preSelection, 1));
                        break;
                    case KeyType.ArrowLeft:
                        if (_this.props.preSelection == null) {
                            break;
                        }
                        _this.handleYearNavigation(y - 1, subYears.subYears(_this.props.preSelection, 1));
                        break;
                    case KeyType.ArrowUp: {
                        if (date === undefined ||
                            yearItemNumber === undefined ||
                            _this.props.preSelection == null) {
                            break;
                        }
                        var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
                        var offset = VERTICAL_NAVIGATION_OFFSET;
                        var newYear = y - offset;
                        if (newYear < startPeriod) {
                            var leftOverOffset = yearItemNumber % offset;
                            if (y >= startPeriod && y < startPeriod + leftOverOffset) {
                                offset = leftOverOffset;
                            }
                            else {
                                offset += leftOverOffset;
                            }
                            newYear = y - offset;
                        }
                        _this.handleYearNavigation(newYear, subYears.subYears(_this.props.preSelection, offset));
                        break;
                    }
                    case KeyType.ArrowDown: {
                        if (date === undefined ||
                            yearItemNumber === undefined ||
                            _this.props.preSelection == null) {
                            break;
                        }
                        var endPeriod = getYearsPeriod(date, yearItemNumber).endPeriod;
                        var offset = VERTICAL_NAVIGATION_OFFSET;
                        var newYear = y + offset;
                        if (newYear > endPeriod) {
                            var leftOverOffset = yearItemNumber % offset;
                            if (y <= endPeriod && y > endPeriod - leftOverOffset) {
                                offset = leftOverOffset;
                            }
                            else {
                                offset += leftOverOffset;
                            }
                            newYear = y + offset;
                        }
                        _this.handleYearNavigation(newYear, addYears.addYears(_this.props.preSelection, offset));
                        break;
                    }
                }
            }
            handleOnKeyDown && handleOnKeyDown(event);
        };
        _this.getYearClassNames = function (y) {
            var _a = _this.props, date = _a.date, minDate = _a.minDate, maxDate = _a.maxDate, selected = _a.selected, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate, yearClassName = _a.yearClassName;
            return clsx.clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), date ? yearClassName === null || yearClassName === void 0 ? void 0 : yearClassName(setYear.setYear(date, y)) : undefined, {
                "react-datepicker__year-text--selected": selected
                    ? y === getYear.getYear(selected)
                    : undefined,
                "react-datepicker__year-text--disabled": (minDate || maxDate || excludeDates || includeDates || filterDate) &&
                    isYearDisabled(y, _this.props),
                "react-datepicker__year-text--keyboard-selected": _this.isKeyboardSelected(y),
                "react-datepicker__year-text--range-start": _this.isRangeStart(y),
                "react-datepicker__year-text--range-end": _this.isRangeEnd(y),
                "react-datepicker__year-text--in-range": _this.isInRange(y),
                "react-datepicker__year-text--in-selecting-range": _this.isInSelectingRange(y),
                "react-datepicker__year-text--selecting-range-start": _this.isSelectingRangeStart(y),
                "react-datepicker__year-text--selecting-range-end": _this.isSelectingRangeEnd(y),
                "react-datepicker__year-text--today": _this.isCurrentYear(y),
            });
        };
        _this.getYearTabIndex = function (y) {
            if (_this.props.disabledKeyboardNavigation ||
                _this.props.preSelection == null) {
                return "-1";
            }
            var preSelected = getYear.getYear(_this.props.preSelection);
            return y === preSelected ? "0" : "-1";
        };
        _this.getYearContainerClassNames = function () {
            var _a = _this.props, selectingDate = _a.selectingDate, selectsStart = _a.selectsStart, selectsEnd = _a.selectsEnd, selectsRange = _a.selectsRange;
            return clsx.clsx("react-datepicker__year", {
                "react-datepicker__year--selecting-range": selectingDate && (selectsStart || selectsEnd || selectsRange),
            });
        };
        _this.getYearContent = function (y) {
            return _this.props.renderYearContent ? _this.props.renderYearContent(y) : y;
        };
        return _this;
    }
    Year.prototype.render = function () {
        var _this = this;
        var yearsList = [];
        var _a = this.props, date = _a.date, yearItemNumber = _a.yearItemNumber, onYearMouseEnter = _a.onYearMouseEnter, onYearMouseLeave = _a.onYearMouseLeave;
        if (date === undefined) {
            return null;
        }
        var _b = getYearsPeriod(date, yearItemNumber), startPeriod = _b.startPeriod, endPeriod = _b.endPeriod;
        var _loop_1 = function (y) {
            yearsList.push(React__default.default.createElement("div", { ref: this_1.YEAR_REFS[y - startPeriod], onClick: function (event) {
                    _this.onYearClick(event, y);
                }, onKeyDown: function (event) {
                    if (isSpaceKeyDown(event)) {
                        event.preventDefault();
                        event.key = KeyType.Enter;
                    }
                    _this.onYearKeyDown(event, y);
                }, tabIndex: Number(this_1.getYearTabIndex(y)), className: this_1.getYearClassNames(y), onMouseEnter: !this_1.props.usePointerEvent
                    ? function (event) { return onYearMouseEnter(event, y); }
                    : undefined, onPointerEnter: this_1.props.usePointerEvent
                    ? function (event) { return onYearMouseEnter(event, y); }
                    : undefined, onMouseLeave: !this_1.props.usePointerEvent
                    ? function (event) { return onYearMouseLeave(event, y); }
                    : undefined, onPointerLeave: this_1.props.usePointerEvent
                    ? function (event) { return onYearMouseLeave(event, y); }
                    : undefined, key: y, "aria-current": this_1.isCurrentYear(y) ? "date" : undefined }, this_1.getYearContent(y)));
        };
        var this_1 = this;
        for (var y = startPeriod; y <= endPeriod; y++) {
            _loop_1(y);
        }
        return (React__default.default.createElement("div", { className: this.getYearContainerClassNames() },
            React__default.default.createElement("div", { className: "react-datepicker__year-wrapper", onMouseLeave: !this.props.usePointerEvent
                    ? this.props.clearSelectingDate
                    : undefined, onPointerLeave: this.props.usePointerEvent
                    ? this.props.clearSelectingDate
                    : undefined }, yearsList)));
    };
    return Year;
}(React.Component));

function generateYears(year, noOfYear, minDate, maxDate) {
    var list = [];
    for (var i = 0; i < 2 * noOfYear + 1; i++) {
        var newYear = year + noOfYear - i;
        var isInRange = true;
        if (minDate) {
            isInRange = getYear.getYear(minDate) <= newYear;
        }
        if (maxDate && isInRange) {
            isInRange = getYear.getYear(maxDate) >= newYear;
        }
        if (isInRange) {
            list.push(newYear);
        }
    }
    return list;
}
var YearDropdownOptions = /** @class */ (function (_super) {
    __extends(YearDropdownOptions, _super);
    function YearDropdownOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.renderOptions = function () {
            var selectedYear = _this.props.year;
            var options = _this.state.yearsList.map(function (year) { return (React__default.default.createElement("div", { className: selectedYear === year
                    ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                    : "react-datepicker__year-option", key: year, onClick: _this.onChange.bind(_this, year), "aria-selected": selectedYear === year ? "true" : undefined },
                selectedYear === year ? (React__default.default.createElement("span", { className: "react-datepicker__year-option--selected" }, "\u2713")) : (""),
                year)); });
            var minYear = _this.props.minDate ? getYear.getYear(_this.props.minDate) : null;
            var maxYear = _this.props.maxDate ? getYear.getYear(_this.props.maxDate) : null;
            if (!maxYear || !_this.state.yearsList.find(function (year) { return year === maxYear; })) {
                options.unshift(React__default.default.createElement("div", { className: "react-datepicker__year-option", key: "upcoming", onClick: _this.incrementYears },
                    React__default.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" })));
            }
            if (!minYear || !_this.state.yearsList.find(function (year) { return year === minYear; })) {
                options.push(React__default.default.createElement("div", { className: "react-datepicker__year-option", key: "previous", onClick: _this.decrementYears },
                    React__default.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" })));
            }
            return options;
        };
        _this.onChange = function (year) {
            _this.props.onChange(year);
        };
        _this.handleClickOutside = function () {
            _this.props.onCancel();
        };
        _this.shiftYears = function (amount) {
            var years = _this.state.yearsList.map(function (year) {
                return year + amount;
            });
            _this.setState({
                yearsList: years,
            });
        };
        _this.incrementYears = function () {
            return _this.shiftYears(1);
        };
        _this.decrementYears = function () {
            return _this.shiftYears(-1);
        };
        var yearDropdownItemNumber = props.yearDropdownItemNumber, scrollableYearDropdown = props.scrollableYearDropdown;
        var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
        _this.state = {
            yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate),
        };
        _this.dropdownRef = React.createRef();
        return _this;
    }
    YearDropdownOptions.prototype.componentDidMount = function () {
        var dropdownCurrent = this.dropdownRef.current;
        if (dropdownCurrent) {
            // Get array from HTMLCollection
            var dropdownCurrentChildren = dropdownCurrent.children
                ? Array.from(dropdownCurrent.children)
                : null;
            var selectedYearOptionEl = dropdownCurrentChildren
                ? dropdownCurrentChildren.find(function (childEl) { return childEl.ariaSelected; })
                : null;
            dropdownCurrent.scrollTop =
                selectedYearOptionEl && selectedYearOptionEl instanceof HTMLElement
                    ? selectedYearOptionEl.offsetTop +
                        (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) /
                            2
                    : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
        }
    };
    YearDropdownOptions.prototype.render = function () {
        var dropdownClass = clsx.clsx({
            "react-datepicker__year-dropdown": true,
            "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown,
        });
        return (React__default.default.createElement("div", { className: dropdownClass, ref: this.dropdownRef }, this.renderOptions()));
    };
    return YearDropdownOptions;
}(React.Component));

var WrappedYearDropdownOptions = onClickOutside__default.default(YearDropdownOptions);
var YearDropdown = /** @class */ (function (_super) {
    __extends(YearDropdown, _super);
    function YearDropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownVisible: false,
        };
        _this.renderSelectOptions = function () {
            var minYear = _this.props.minDate
                ? getYear.getYear(_this.props.minDate)
                : 1900;
            var maxYear = _this.props.maxDate
                ? getYear.getYear(_this.props.maxDate)
                : 2100;
            var options = [];
            for (var i = minYear; i <= maxYear; i++) {
                options.push(React__default.default.createElement("option", { key: i, value: i }, i));
            }
            return options;
        };
        _this.onSelectChange = function (event) {
            _this.onChange(parseInt(event.target.value));
        };
        _this.renderSelectMode = function () { return (React__default.default.createElement("select", { value: _this.props.year, className: "react-datepicker__year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions())); };
        _this.renderReadView = function (visible) { return (React__default.default.createElement("div", { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__year-read-view", onClick: function (event) {
                return _this.toggleDropdown(event);
            } },
            React__default.default.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }),
            React__default.default.createElement("span", { className: "react-datepicker__year-read-view--selected-year" }, _this.props.year))); };
        _this.renderDropdown = function () { return (React__default.default.createElement(WrappedYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
        _this.renderScrollMode = function () {
            var dropdownVisible = _this.state.dropdownVisible;
            var result = [_this.renderReadView(!dropdownVisible)];
            if (dropdownVisible) {
                result.unshift(_this.renderDropdown());
            }
            return result;
        };
        _this.onChange = function (year) {
            _this.toggleDropdown();
            if (year === _this.props.year)
                return;
            _this.props.onChange(year);
        };
        _this.toggleDropdown = function (event) {
            _this.setState({
                dropdownVisible: !_this.state.dropdownVisible,
            }, function () {
                if (_this.props.adjustDateOnChange) {
                    _this.handleYearChange(_this.props.date, event);
                }
            });
        };
        _this.handleYearChange = function (date, event) {
            _this.onSelect(date, event);
            _this.setOpen();
        };
        _this.onSelect = function (date, event) {
            if (_this.props.onSelect) {
                _this.props.onSelect(date, event);
            }
        };
        _this.setOpen = function () {
            if (_this.props.setOpen) {
                _this.props.setOpen(true);
            }
        };
        return _this;
    }
    YearDropdown.prototype.render = function () {
        var renderedDropdown;
        switch (this.props.dropdownMode) {
            case "scroll":
                renderedDropdown = this.renderScrollMode();
                break;
            case "select":
                renderedDropdown = this.renderSelectMode();
                break;
        }
        return (React__default.default.createElement("div", { className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown));
    };
    return YearDropdown;
}(React.Component));

var DROPDOWN_FOCUS_CLASSNAMES = [
    "react-datepicker__year-select",
    "react-datepicker__month-select",
    "react-datepicker__month-year-select",
];
var isDropdownSelect = function (element) {
    var classNames = (element.className || "").split(/\s+/);
    return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) { return classNames.indexOf(testClassname) >= 0; });
};
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this, props) || this;
        _this.monthContainer = undefined;
        _this.handleClickOutside = function (event) {
            _this.props.onClickOutside(event);
        };
        _this.setClickOutsideRef = function () {
            return _this.containerRef.current;
        };
        _this.handleDropdownFocus = function (event) {
            var _a, _b;
            if (isDropdownSelect(event.target)) {
                (_b = (_a = _this.props).onDropdownFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            }
        };
        _this.getDateInView = function () {
            var _a = _this.props, preSelection = _a.preSelection, selected = _a.selected, openToDate = _a.openToDate;
            var minDate = getEffectiveMinDate(_this.props);
            var maxDate = getEffectiveMaxDate(_this.props);
            var current = newDate();
            var initialDate = openToDate || selected || preSelection;
            if (initialDate) {
                return initialDate;
            }
            else {
                if (minDate && isBefore.isBefore(current, minDate)) {
                    return minDate;
                }
                else if (maxDate && isAfter.isAfter(current, maxDate)) {
                    return maxDate;
                }
            }
            return current;
        };
        _this.increaseMonth = function () {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: addMonths.addMonths(date, 1),
                });
            }, function () { return _this.handleMonthChange(_this.state.date); });
        };
        _this.decreaseMonth = function () {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: subMonths.subMonths(date, 1),
                });
            }, function () { return _this.handleMonthChange(_this.state.date); });
        };
        _this.handleDayClick = function (day, event, monthSelectedIn) {
            _this.props.onSelect(day, event, monthSelectedIn);
            _this.props.setPreSelection && _this.props.setPreSelection(day);
        };
        _this.handleDayMouseEnter = function (day) {
            _this.setState({ selectingDate: day });
            _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
        };
        _this.handleMonthMouseLeave = function () {
            _this.setState({ selectingDate: undefined });
            _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
        };
        _this.handleYearMouseEnter = function (event, year) {
            _this.setState({ selectingDate: setYear.setYear(newDate(), year) });
            !!_this.props.onYearMouseEnter && _this.props.onYearMouseEnter(event, year);
        };
        _this.handleYearMouseLeave = function (event, year) {
            !!_this.props.onYearMouseLeave && _this.props.onYearMouseLeave(event, year);
        };
        _this.handleYearChange = function (date) {
            if (_this.props.onYearChange) {
                _this.props.onYearChange(date);
                _this.setState({ isRenderAriaLiveMessage: true });
            }
            if (_this.props.adjustDateOnChange) {
                if (_this.props.onSelect) {
                    _this.props.onSelect(date);
                }
                if (_this.props.setOpen) {
                    _this.props.setOpen(true);
                }
            }
            _this.props.setPreSelection && _this.props.setPreSelection(date);
        };
        _this.handleMonthChange = function (date) {
            _this.handleCustomMonthChange(date);
            if (_this.props.adjustDateOnChange) {
                if (_this.props.onSelect) {
                    _this.props.onSelect(date);
                }
                if (_this.props.setOpen) {
                    _this.props.setOpen(true);
                }
            }
            _this.props.setPreSelection && _this.props.setPreSelection(date);
        };
        _this.handleCustomMonthChange = function (date) {
            if (_this.props.onMonthChange) {
                _this.props.onMonthChange(date);
                _this.setState({ isRenderAriaLiveMessage: true });
            }
        };
        _this.handleMonthYearChange = function (date) {
            _this.handleYearChange(date);
            _this.handleMonthChange(date);
        };
        _this.changeYear = function (year) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: setYear.setYear(date, Number(year)),
                });
            }, function () { return _this.handleYearChange(_this.state.date); });
        };
        _this.changeMonth = function (month) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: setMonth.setMonth(date, Number(month)),
                });
            }, function () { return _this.handleMonthChange(_this.state.date); });
        };
        _this.changeMonthYear = function (monthYear) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: setYear.setYear(setMonth.setMonth(date, getMonth.getMonth(monthYear)), getYear.getYear(monthYear)),
                });
            }, function () { return _this.handleMonthYearChange(_this.state.date); });
        };
        _this.header = function (date) {
            if (date === void 0) { date = _this.state.date; }
            var startOfWeek = getStartOfWeek(date, _this.props.locale, _this.props.calendarStartDay);
            var dayNames = [];
            if (_this.props.showWeekNumbers) {
                dayNames.push(React__default.default.createElement("div", { key: "W", className: "react-datepicker__day-name" }, _this.props.weekLabel || "#"));
            }
            return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
                var day = addDays.addDays(startOfWeek, offset);
                var weekDayName = _this.formatWeekday(day, _this.props.locale);
                var weekDayClassName = _this.props.weekDayClassName
                    ? _this.props.weekDayClassName(day)
                    : undefined;
                return (React__default.default.createElement("div", { key: offset, "aria-label": formatDate(day, "EEEE", _this.props.locale), className: clsx.clsx("react-datepicker__day-name", weekDayClassName) }, weekDayName));
            }));
        };
        _this.formatWeekday = function (day, locale) {
            if (_this.props.formatWeekDay) {
                return getFormattedWeekdayInLocale(day, _this.props.formatWeekDay, locale);
            }
            return _this.props.useWeekdaysShort
                ? getWeekdayShortInLocale(day, locale)
                : getWeekdayMinInLocale(day, locale);
        };
        _this.decreaseYear = function () {
            _this.setState(function (_a) {
                var _b;
                var date = _a.date;
                return ({
                    date: subYears.subYears(date, _this.props.showYearPicker
                        ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar.defaultProps.yearItemNumber
                        : 1),
                });
            }, function () { return _this.handleYearChange(_this.state.date); });
        };
        _this.clearSelectingDate = function () {
            _this.setState({ selectingDate: undefined });
        };
        _this.renderPreviousButton = function () {
            var _a;
            if (_this.props.renderCustomHeader) {
                return;
            }
            var allPrevDaysDisabled;
            switch (true) {
                case _this.props.showMonthYearPicker:
                    allPrevDaysDisabled = yearDisabledBefore(_this.state.date, _this.props);
                    break;
                case _this.props.showYearPicker:
                    allPrevDaysDisabled = yearsDisabledBefore(_this.state.date, _this.props);
                    break;
                case _this.props.showQuarterYearPicker:
                    allPrevDaysDisabled = quarterDisabledBefore(_this.state.date, _this.props);
                    break;
                default:
                    allPrevDaysDisabled = monthDisabledBefore(_this.state.date, _this.props);
                    break;
            }
            if ((!((_a = _this.props.forceShowMonthNavigation) !== null && _a !== void 0 ? _a : Calendar.defaultProps.forceShowMonthNavigation) &&
                !_this.props.showDisabledMonthNavigation &&
                allPrevDaysDisabled) ||
                _this.props.showTimeSelectOnly) {
                return;
            }
            var iconClasses = [
                "react-datepicker__navigation-icon",
                "react-datepicker__navigation-icon--previous",
            ];
            var classes = [
                "react-datepicker__navigation",
                "react-datepicker__navigation--previous",
            ];
            var clickHandler = _this.decreaseMonth;
            if (_this.props.showMonthYearPicker ||
                _this.props.showQuarterYearPicker ||
                _this.props.showYearPicker) {
                clickHandler = _this.decreaseYear;
            }
            if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
                classes.push("react-datepicker__navigation--previous--disabled");
                clickHandler = undefined;
            }
            var isForYear = _this.props.showMonthYearPicker ||
                _this.props.showQuarterYearPicker ||
                _this.props.showYearPicker;
            var _b = _this.props, _c = _b.previousMonthButtonLabel, previousMonthButtonLabel = _c === void 0 ? Calendar.defaultProps.previousMonthButtonLabel : _c, _d = _b.previousYearButtonLabel, previousYearButtonLabel = _d === void 0 ? Calendar.defaultProps.previousYearButtonLabel : _d;
            var _e = _this.props, _f = _e.previousMonthAriaLabel, previousMonthAriaLabel = _f === void 0 ? typeof previousMonthButtonLabel === "string"
                ? previousMonthButtonLabel
                : "Previous Month" : _f, _g = _e.previousYearAriaLabel, previousYearAriaLabel = _g === void 0 ? typeof previousYearButtonLabel === "string"
                ? previousYearButtonLabel
                : "Previous Year" : _g;
            return (React__default.default.createElement("button", { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel },
                React__default.default.createElement("span", { className: iconClasses.join(" ") }, isForYear ? previousYearButtonLabel : previousMonthButtonLabel)));
        };
        _this.increaseYear = function () {
            _this.setState(function (_a) {
                var _b;
                var date = _a.date;
                return ({
                    date: addYears.addYears(date, _this.props.showYearPicker
                        ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar.defaultProps.yearItemNumber
                        : 1),
                });
            }, function () { return _this.handleYearChange(_this.state.date); });
        };
        _this.renderNextButton = function () {
            var _a;
            if (_this.props.renderCustomHeader) {
                return;
            }
            var allNextDaysDisabled;
            switch (true) {
                case _this.props.showMonthYearPicker:
                    allNextDaysDisabled = yearDisabledAfter(_this.state.date, _this.props);
                    break;
                case _this.props.showYearPicker:
                    allNextDaysDisabled = yearsDisabledAfter(_this.state.date, _this.props);
                    break;
                case _this.props.showQuarterYearPicker:
                    allNextDaysDisabled = quarterDisabledAfter(_this.state.date, _this.props);
                    break;
                default:
                    allNextDaysDisabled = monthDisabledAfter(_this.state.date, _this.props);
                    break;
            }
            if ((!((_a = _this.props.forceShowMonthNavigation) !== null && _a !== void 0 ? _a : Calendar.defaultProps.forceShowMonthNavigation) &&
                !_this.props.showDisabledMonthNavigation &&
                allNextDaysDisabled) ||
                _this.props.showTimeSelectOnly) {
                return;
            }
            var classes = [
                "react-datepicker__navigation",
                "react-datepicker__navigation--next",
            ];
            var iconClasses = [
                "react-datepicker__navigation-icon",
                "react-datepicker__navigation-icon--next",
            ];
            if (_this.props.showTimeSelect) {
                classes.push("react-datepicker__navigation--next--with-time");
            }
            if (_this.props.todayButton) {
                classes.push("react-datepicker__navigation--next--with-today-button");
            }
            var clickHandler = _this.increaseMonth;
            if (_this.props.showMonthYearPicker ||
                _this.props.showQuarterYearPicker ||
                _this.props.showYearPicker) {
                clickHandler = _this.increaseYear;
            }
            if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
                classes.push("react-datepicker__navigation--next--disabled");
                clickHandler = undefined;
            }
            var isForYear = _this.props.showMonthYearPicker ||
                _this.props.showQuarterYearPicker ||
                _this.props.showYearPicker;
            var _b = _this.props, _c = _b.nextMonthButtonLabel, nextMonthButtonLabel = _c === void 0 ? Calendar.defaultProps.nextMonthButtonLabel : _c, _d = _b.nextYearButtonLabel, nextYearButtonLabel = _d === void 0 ? Calendar.defaultProps.nextYearButtonLabel : _d;
            var _e = _this.props, _f = _e.nextMonthAriaLabel, nextMonthAriaLabel = _f === void 0 ? typeof nextMonthButtonLabel === "string"
                ? nextMonthButtonLabel
                : "Next Month" : _f, _g = _e.nextYearAriaLabel, nextYearAriaLabel = _g === void 0 ? typeof nextYearButtonLabel === "string"
                ? nextYearButtonLabel
                : "Next Year" : _g;
            return (React__default.default.createElement("button", { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel },
                React__default.default.createElement("span", { className: iconClasses.join(" ") }, isForYear ? nextYearButtonLabel : nextMonthButtonLabel)));
        };
        _this.renderCurrentMonth = function (date) {
            if (date === void 0) { date = _this.state.date; }
            var classes = ["react-datepicker__current-month"];
            if (_this.props.showYearDropdown) {
                classes.push("react-datepicker__current-month--hasYearDropdown");
            }
            if (_this.props.showMonthDropdown) {
                classes.push("react-datepicker__current-month--hasMonthDropdown");
            }
            if (_this.props.showMonthYearDropdown) {
                classes.push("react-datepicker__current-month--hasMonthYearDropdown");
            }
            return (React__default.default.createElement("h2", { className: classes.join(" ") }, formatDate(date, _this.props.dateFormat, _this.props.locale)));
        };
        _this.renderYearDropdown = function (overrideHide) {
            if (overrideHide === void 0) { overrideHide = false; }
            if (!_this.props.showYearDropdown || overrideHide) {
                return;
            }
            return (React__default.default.createElement(YearDropdown, _assign({}, Calendar.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeYear, year: getYear.getYear(_this.state.date) })));
        };
        _this.renderMonthDropdown = function (overrideHide) {
            if (overrideHide === void 0) { overrideHide = false; }
            if (!_this.props.showMonthDropdown || overrideHide) {
                return;
            }
            return (React__default.default.createElement(MonthDropdown, _assign({}, Calendar.defaultProps, _this.props, { month: getMonth.getMonth(_this.state.date), onChange: _this.changeMonth })));
        };
        _this.renderMonthYearDropdown = function (overrideHide) {
            if (overrideHide === void 0) { overrideHide = false; }
            if (!_this.props.showMonthYearDropdown || overrideHide) {
                return;
            }
            return (React__default.default.createElement(MonthYearDropdown, _assign({}, Calendar.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeMonthYear })));
        };
        _this.handleTodayButtonClick = function (event) {
            _this.props.onSelect(getStartOfToday(), event);
            _this.props.setPreSelection && _this.props.setPreSelection(getStartOfToday());
        };
        _this.renderTodayButton = function () {
            if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
                return;
            }
            return (React__default.default.createElement("div", { className: "react-datepicker__today-button", onClick: _this.handleTodayButtonClick }, _this.props.todayButton));
        };
        _this.renderDefaultHeader = function (_a) {
            var monthDate = _a.monthDate, i = _a.i;
            return (React__default.default.createElement("div", { className: "react-datepicker__header ".concat(_this.props.showTimeSelect
                    ? "react-datepicker__header--has-time-select"
                    : "") },
                _this.renderCurrentMonth(monthDate),
                React__default.default.createElement("div", { className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(_this.props.dropdownMode), onFocus: _this.handleDropdownFocus },
                    _this.renderMonthDropdown(i !== 0),
                    _this.renderMonthYearDropdown(i !== 0),
                    _this.renderYearDropdown(i !== 0)),
                React__default.default.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate))));
        };
        _this.renderCustomHeader = function (headerArgs) {
            var _a, _b;
            var monthDate = headerArgs.monthDate, i = headerArgs.i;
            if ((_this.props.showTimeSelect && !_this.state.monthContainer) ||
                _this.props.showTimeSelectOnly) {
                return null;
            }
            var prevMonthButtonDisabled = monthDisabledBefore(_this.state.date, _this.props);
            var nextMonthButtonDisabled = monthDisabledAfter(_this.state.date, _this.props);
            var prevYearButtonDisabled = yearDisabledBefore(_this.state.date, _this.props);
            var nextYearButtonDisabled = yearDisabledAfter(_this.state.date, _this.props);
            var showDayNames = !_this.props.showMonthYearPicker &&
                !_this.props.showQuarterYearPicker &&
                !_this.props.showYearPicker;
            return (React__default.default.createElement("div", { className: "react-datepicker__header react-datepicker__header--custom", onFocus: _this.props.onDropdownFocus }, (_b = (_a = _this.props).renderCustomHeader) === null || _b === void 0 ? void 0 :
                _b.call(_a, _assign(_assign({}, _this.state), { customHeaderCount: i, monthDate: monthDate, changeMonth: _this.changeMonth, changeYear: _this.changeYear, decreaseMonth: _this.decreaseMonth, increaseMonth: _this.increaseMonth, decreaseYear: _this.decreaseYear, increaseYear: _this.increaseYear, prevMonthButtonDisabled: prevMonthButtonDisabled, nextMonthButtonDisabled: nextMonthButtonDisabled, prevYearButtonDisabled: prevYearButtonDisabled, nextYearButtonDisabled: nextYearButtonDisabled })),
                showDayNames && (React__default.default.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate)))));
        };
        _this.renderYearHeader = function (_a) {
            var monthDate = _a.monthDate;
            var _b = _this.props, showYearPicker = _b.showYearPicker, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? Calendar.defaultProps.yearItemNumber : _c;
            var _d = getYearsPeriod(monthDate, yearItemNumber), startPeriod = _d.startPeriod, endPeriod = _d.endPeriod;
            return (React__default.default.createElement("div", { className: "react-datepicker__header react-datepicker-year-header" }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : getYear.getYear(monthDate)));
        };
        _this.renderHeader = function (_a) {
            var monthDate = _a.monthDate, _b = _a.i, i = _b === void 0 ? 0 : _b;
            var headerArgs = { monthDate: monthDate, i: i };
            switch (true) {
                case _this.props.renderCustomHeader !== undefined:
                    return _this.renderCustomHeader(headerArgs);
                case _this.props.showMonthYearPicker ||
                    _this.props.showQuarterYearPicker ||
                    _this.props.showYearPicker:
                    return _this.renderYearHeader(headerArgs);
                default:
                    return _this.renderDefaultHeader(headerArgs);
            }
        };
        _this.renderMonths = function () {
            var _a, _b;
            if (_this.props.showTimeSelectOnly || _this.props.showYearPicker) {
                return;
            }
            var monthList = [];
            var monthsShown = (_a = _this.props.monthsShown) !== null && _a !== void 0 ? _a : Calendar.defaultProps.monthsShown;
            var monthsToSubtract = _this.props.showPreviousMonths
                ? monthsShown - 1
                : 0;
            var fromMonthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
                ? addYears.addYears(_this.state.date, monthsToSubtract)
                : subMonths.subMonths(_this.state.date, monthsToSubtract);
            var monthSelectedIn = (_b = _this.props.monthSelectedIn) !== null && _b !== void 0 ? _b : monthsToSubtract;
            for (var i = 0; i < monthsShown; ++i) {
                var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
                var monthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
                    ? addYears.addYears(fromMonthDate, monthsToAdd)
                    : addMonths.addMonths(fromMonthDate, monthsToAdd);
                var monthKey = "month-".concat(i);
                var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
                var monthShowsDuplicateDaysStart = i > 0;
                monthList.push(React__default.default.createElement("div", { key: monthKey, ref: function (div) {
                        _this.monthContainer = div !== null && div !== void 0 ? div : undefined;
                    }, className: "react-datepicker__month-container" },
                    _this.renderHeader({ monthDate: monthDate, i: i }),
                    React__default.default.createElement(Month, _assign({}, Calendar.defaultProps, _this.props, { ariaLabelPrefix: _this.props.monthAriaLabelPrefix, day: monthDate, onDayClick: _this.handleDayClick, handleOnKeyDown: _this.props.handleOnDayKeyDown, handleOnMonthKeyDown: _this.props.handleOnKeyDown, onDayMouseEnter: _this.handleDayMouseEnter, onMouseLeave: _this.handleMonthMouseLeave, orderInDisplay: i, selectingDate: _this.state.selectingDate, monthShowsDuplicateDaysEnd: monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart: monthShowsDuplicateDaysStart }))));
            }
            return monthList;
        };
        _this.renderYears = function () {
            if (_this.props.showTimeSelectOnly) {
                return;
            }
            if (_this.props.showYearPicker) {
                return (React__default.default.createElement("div", { className: "react-datepicker__year--container" },
                    _this.renderHeader({ monthDate: _this.state.date }),
                    React__default.default.createElement(Year, _assign({}, Calendar.defaultProps, _this.props, { selectingDate: _this.state.selectingDate, date: _this.state.date, onDayClick: _this.handleDayClick, clearSelectingDate: _this.clearSelectingDate, onYearMouseEnter: _this.handleYearMouseEnter, onYearMouseLeave: _this.handleYearMouseLeave }))));
            }
            return;
        };
        _this.renderTimeSection = function () {
            if (_this.props.showTimeSelect &&
                (_this.state.monthContainer || _this.props.showTimeSelectOnly)) {
                return (React__default.default.createElement(Time, _assign({}, Calendar.defaultProps, _this.props, { onChange: _this.props.onTimeChange, format: _this.props.timeFormat, intervals: _this.props.timeIntervals, monthRef: _this.state.monthContainer })));
            }
            return;
        };
        _this.renderInputTimeSection = function () {
            var time = _this.props.selected
                ? new Date(_this.props.selected)
                : undefined;
            var timeValid = time && isValid(time) && Boolean(_this.props.selected);
            var timeString = timeValid
                ? "".concat(addZero(time.getHours()), ":").concat(addZero(time.getMinutes()))
                : "";
            if (_this.props.showTimeInput) {
                return (React__default.default.createElement(InputTime, _assign({}, Calendar.defaultProps, _this.props, { date: time, timeString: timeString, onChange: _this.props.onTimeChange })));
            }
            return;
        };
        _this.renderAriaLiveRegion = function () {
            var _a;
            var _b = getYearsPeriod(_this.state.date, (_a = _this.props.yearItemNumber) !== null && _a !== void 0 ? _a : Calendar.defaultProps.yearItemNumber), startPeriod = _b.startPeriod, endPeriod = _b.endPeriod;
            var ariaLiveMessage;
            if (_this.props.showYearPicker) {
                ariaLiveMessage = "".concat(startPeriod, " - ").concat(endPeriod);
            }
            else if (_this.props.showMonthYearPicker ||
                _this.props.showQuarterYearPicker) {
                ariaLiveMessage = getYear.getYear(_this.state.date);
            }
            else {
                ariaLiveMessage = "".concat(getMonthInLocale(getMonth.getMonth(_this.state.date), _this.props.locale), " ").concat(getYear.getYear(_this.state.date));
            }
            return (React__default.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, _this.state.isRenderAriaLiveMessage && ariaLiveMessage));
        };
        _this.renderChildren = function () {
            if (_this.props.children) {
                return (React__default.default.createElement("div", { className: "react-datepicker__children-container" }, _this.props.children));
            }
            return;
        };
        _this.containerRef = React.createRef();
        _this.state = {
            date: _this.getDateInView(),
            selectingDate: undefined,
            monthContainer: undefined,
            isRenderAriaLiveMessage: false,
        };
        return _this;
    }
    Object.defineProperty(Calendar, "defaultProps", {
        get: function () {
            return {
                monthsShown: 1,
                forceShowMonthNavigation: false,
                timeCaption: "Time",
                previousYearButtonLabel: "Previous Year",
                nextYearButtonLabel: "Next Year",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next Month",
                yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
            };
        },
        enumerable: false,
        configurable: true
    });
    Calendar.prototype.componentDidMount = function () {
        var _this = this;
        // monthContainer height is needed in time component
        // to determine the height for the ul in the time component
        // setState here so height is given after final component
        // layout is rendered
        if (this.props.showTimeSelect) {
            this.assignMonthContainer = (function () {
                _this.setState({ monthContainer: _this.monthContainer });
            })();
        }
    };
    Calendar.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (this.props.preSelection &&
            (!isSameDay(this.props.preSelection, prevProps.preSelection) ||
                this.props.monthSelectedIn !== prevProps.monthSelectedIn)) {
            var hasMonthChanged_1 = !isSameMonth(this.state.date, this.props.preSelection);
            this.setState({
                date: this.props.preSelection,
            }, function () { return hasMonthChanged_1 && _this.handleCustomMonthChange(_this.state.date); });
        }
        else if (this.props.openToDate &&
            !isSameDay(this.props.openToDate, prevProps.openToDate)) {
            this.setState({
                date: this.props.openToDate,
            });
        }
    };
    Calendar.prototype.render = function () {
        var Container = this.props.container || CalendarContainer;
        return (React__default.default.createElement("div", { style: { display: "contents" }, ref: this.containerRef },
            React__default.default.createElement(Container, { className: clsx.clsx("react-datepicker", this.props.className, {
                    "react-datepicker--time-only": this.props.showTimeSelectOnly,
                }), showTime: this.props.showTimeSelect || this.props.showTimeInput, showTimeSelectOnly: this.props.showTimeSelectOnly },
                this.renderAriaLiveRegion(),
                this.renderPreviousButton(),
                this.renderNextButton(),
                this.renderMonths(),
                this.renderYears(),
                this.renderTodayButton(),
                this.renderTimeSection(),
                this.renderInputTimeSection(),
                this.renderChildren())));
    };
    return Calendar;
}(React.Component));

/**
 * `CalendarIcon` is a React component that renders an icon for a calendar.
 * The icon can be a string representing a CSS class, a React node, or a default SVG icon.
 *
 * @component
 * @prop  icon - The icon to be displayed. This can be a string representing a CSS class or a React node.
 * @prop  className - An optional string representing additional CSS classes to be applied to the icon.
 * @prop  onClick - An optional function to be called when the icon is clicked.
 *
 * @example
 * // To use a CSS class as the icon
 * <CalendarIcon icon="my-icon-class" onClick={myClickHandler} />
 *
 * @example
 * // To use a React node as the icon
 * <CalendarIcon icon={<MyIconComponent />} onClick={myClickHandler} />
 *
 * @returns  The `CalendarIcon` component.
 */
var CalendarIcon = function (_a) {
    var icon = _a.icon, _b = _a.className, className = _b === void 0 ? "" : _b, onClick = _a.onClick;
    var defaultClass = "react-datepicker__calendar-icon";
    if (typeof icon === "string") {
        return (React__default.default.createElement("i", { className: "".concat(defaultClass, " ").concat(icon, " ").concat(className), "aria-hidden": "true", onClick: onClick }));
    }
    if (React__default.default.isValidElement(icon)) {
        // Because we are checking that typeof icon is string first, we can safely cast icon as React.ReactElement on types level and code level
        return React__default.default.cloneElement(icon, {
            className: "".concat(icon.props.className || "", " ").concat(defaultClass, " ").concat(className),
            onClick: function (event) {
                if (typeof icon.props.onClick === "function") {
                    icon.props.onClick(event);
                }
                if (typeof onClick === "function") {
                    onClick(event);
                }
            },
        });
    }
    // Default SVG Icon
    return (React__default.default.createElement("svg", { className: "".concat(defaultClass, " ").concat(className), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", onClick: onClick },
        React__default.default.createElement("path", { d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" })));
};

/**
 * `Portal` is a React component that allows you to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @class
 * @param {PortalProps} props - The properties that define the `Portal` component.
 * @property {React.ReactNode} props.children - The children to be rendered into the `Portal`.
 * @property {string} props.portalId - The id of the DOM node into which the `Portal` will render.
 * @property {ShadowRoot} [props.portalHost] - The DOM node to host the `Portal`.
 */
var Portal = /** @class */ (function (_super) {
    __extends(Portal, _super);
    function Portal(props) {
        var _this = _super.call(this, props) || this;
        _this.portalRoot = null;
        _this.el = document.createElement("div");
        return _this;
    }
    Portal.prototype.componentDidMount = function () {
        this.portalRoot = (this.props.portalHost || document).getElementById(this.props.portalId);
        if (!this.portalRoot) {
            this.portalRoot = document.createElement("div");
            this.portalRoot.setAttribute("id", this.props.portalId);
            (this.props.portalHost || document.body).appendChild(this.portalRoot);
        }
        this.portalRoot.appendChild(this.el);
    };
    Portal.prototype.componentWillUnmount = function () {
        if (this.portalRoot) {
            this.portalRoot.removeChild(this.el);
        }
    };
    Portal.prototype.render = function () {
        return ReactDOM__default.default.createPortal(this.props.children, this.el);
    };
    return Portal;
}(React.Component));

var focusableElementsSelector = "[tabindex], a, button, input, select, textarea";
var focusableFilter = function (node) {
    if (node instanceof HTMLAnchorElement) {
        return node.tabIndex !== -1;
    }
    return !node.disabled && node.tabIndex !== -1;
};
/**
 * `TabLoop` is a React component that manages tabbing behavior for its children.
 *
 * TabLoop prevents the user from tabbing outside of the popper
 * It creates a tabindex loop so that "Tab" on the last element will focus the first element
 * and "Shift Tab" on the first element will focus the last element
 *
 * @component
 * @example
 * <TabLoop enableTabLoop={true}>
 *   <ChildComponent />
 * </TabLoop>
 *
 * @param props - The properties that define the `TabLoop` component.
 * @param props.children - The child components.
 * @param props.enableTabLoop - Whether to enable the tab loop.
 *
 * @returns The `TabLoop` component.
 */
var TabLoop = /** @class */ (function (_super) {
    __extends(TabLoop, _super);
    function TabLoop(props) {
        var _this = _super.call(this, props) || this;
        /**
         * `getTabChildren` is a method of the `TabLoop` class that retrieves all tabbable children of the component.
         *
         * This method uses the `tabbable` library to find all tabbable elements within the `TabLoop` component.
         * It then filters out any elements that are not visible.
         *
         * @returns An array of all tabbable and visible children of the `TabLoop` component.
         */
        _this.getTabChildren = function () {
            var _a;
            return Array.prototype.slice
                .call((_a = _this.tabLoopRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll(focusableElementsSelector), 1, -1)
                .filter(focusableFilter);
        };
        _this.handleFocusStart = function () {
            var tabChildren = _this.getTabChildren();
            tabChildren &&
                tabChildren.length > 1 &&
                tabChildren[tabChildren.length - 1].focus();
        };
        _this.handleFocusEnd = function () {
            var tabChildren = _this.getTabChildren();
            tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
        };
        _this.tabLoopRef = React.createRef();
        return _this;
    }
    TabLoop.prototype.render = function () {
        var _a;
        if (!((_a = this.props.enableTabLoop) !== null && _a !== void 0 ? _a : TabLoop.defaultProps.enableTabLoop)) {
            return this.props.children;
        }
        return (React__default.default.createElement("div", { className: "react-datepicker__tab-loop", ref: this.tabLoopRef },
            React__default.default.createElement("div", { className: "react-datepicker__tab-loop__start", tabIndex: 0, onFocus: this.handleFocusStart }),
            this.props.children,
            React__default.default.createElement("div", { className: "react-datepicker__tab-loop__end", tabIndex: 0, onFocus: this.handleFocusEnd })));
    };
    TabLoop.defaultProps = {
        enableTabLoop: true,
    };
    return TabLoop;
}(React.Component));

/**
 * `withFloating` is a higher-order component that adds floating behavior to a component.
 *
 * @param Component - The component to enhance.
 *
 * @example
 * const FloatingComponent = withFloating(MyComponent);
 * <FloatingComponent popperModifiers={[]} popperProps={{}} hidePopper={true} />
 *
 * @param popperModifiers - The modifiers to use for the popper.
 * @param popperProps - The props to pass to the popper.
 * @param hidePopper - Whether to hide the popper.
 * @param popperPlacement - The placement of the popper.
 *
 * @returns A new component with floating behavior.
 */
function withFloating(Component) {
    var WithFloating = function (props) {
        var _a;
        var hidePopper = typeof props.hidePopper === "boolean" ? props.hidePopper : true;
        var arrowRef = React.useRef(null);
        var floatingProps = react.useFloating(_assign({ open: !hidePopper, whileElementsMounted: react.autoUpdate, placement: props.popperPlacement, middleware: __spreadArray([
                react.flip({ padding: 15 }),
                react.offset(10),
                react.arrow({ element: arrowRef })
            ], ((_a = props.popperModifiers) !== null && _a !== void 0 ? _a : []), true) }, props.popperProps));
        var componentProps = _assign(_assign({}, props), { hidePopper: hidePopper, popperProps: _assign(_assign({}, floatingProps), { arrowRef: arrowRef }) });
        return React__default.default.createElement(Component, _assign({}, componentProps));
    };
    return WithFloating;
}

// Exported for testing purposes
var PopperComponent = /** @class */ (function (_super) {
    __extends(PopperComponent, _super);
    function PopperComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PopperComponent, "defaultProps", {
        get: function () {
            return {
                hidePopper: true,
            };
        },
        enumerable: false,
        configurable: true
    });
    PopperComponent.prototype.render = function () {
        var _a = this.props, className = _a.className, wrapperClassName = _a.wrapperClassName, _b = _a.hidePopper, hidePopper = _b === void 0 ? PopperComponent.defaultProps.hidePopper : _b, popperComponent = _a.popperComponent, targetComponent = _a.targetComponent, enableTabLoop = _a.enableTabLoop, popperOnKeyDown = _a.popperOnKeyDown, portalId = _a.portalId, portalHost = _a.portalHost, popperProps = _a.popperProps, showArrow = _a.showArrow;
        var popper = undefined;
        if (!hidePopper) {
            var classes = clsx.clsx("react-datepicker-popper", className);
            popper = (React__default.default.createElement(TabLoop, { enableTabLoop: enableTabLoop },
                React__default.default.createElement("div", { ref: popperProps.refs.setFloating, style: popperProps.floatingStyles, className: classes, "data-placement": popperProps.placement, onKeyDown: popperOnKeyDown },
                    popperComponent,
                    showArrow && (React__default.default.createElement(react.FloatingArrow, { ref: popperProps.arrowRef, context: popperProps.context, fill: "currentColor", strokeWidth: 1, height: 8, width: 16, style: { transform: "translateY(-1px)" }, className: "react-datepicker__triangle" })))));
        }
        if (this.props.popperContainer) {
            popper = React.createElement(this.props.popperContainer, {}, popper);
        }
        if (portalId && !hidePopper) {
            popper = (React__default.default.createElement(Portal, { portalId: portalId, portalHost: portalHost }, popper));
        }
        var wrapperClasses = clsx.clsx("react-datepicker-wrapper", wrapperClassName);
        return (React__default.default.createElement(React__default.default.Fragment, null,
            React__default.default.createElement("div", { ref: popperProps.refs.setReference, className: wrapperClasses }, targetComponent),
            popper));
    };
    return PopperComponent;
}(React.Component));
var PopperComponent$1 = withFloating(PopperComponent);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
var WrappedCalendar = onClickOutside__default.default(Calendar);
// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
    if (date1 && date2) {
        return (getMonth.getMonth(date1) !== getMonth.getMonth(date2) || getYear.getYear(date1) !== getYear.getYear(date2));
    }
    return date1 !== date2;
}
/**
 * General datepicker component.
 */
var INPUT_ERR_1 = "Date input not valid.";
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.calendar = null;
        _this.input = null;
        _this.getPreSelection = function () {
            return _this.props.openToDate
                ? _this.props.openToDate
                : _this.props.selectsEnd && _this.props.startDate
                    ? _this.props.startDate
                    : _this.props.selectsStart && _this.props.endDate
                        ? _this.props.endDate
                        : newDate();
        };
        // Convert the date from string format to standard Date format
        _this.modifyHolidays = function () {
            var _a;
            return (_a = _this.props.holidays) === null || _a === void 0 ? void 0 : _a.reduce(function (accumulator, holiday) {
                var date = new Date(holiday.date);
                if (!isValid(date)) {
                    return accumulator;
                }
                return __spreadArray(__spreadArray([], accumulator, true), [_assign(_assign({}, holiday), { date: date })], false);
            }, []);
        };
        _this.calcInitialState = function () {
            var _a;
            var defaultPreSelection = _this.getPreSelection();
            var minDate = getEffectiveMinDate(_this.props);
            var maxDate = getEffectiveMaxDate(_this.props);
            var boundedPreSelection = minDate && isBefore.isBefore(defaultPreSelection, getStartOfDay(minDate))
                ? minDate
                : maxDate && isAfter.isAfter(defaultPreSelection, getEndOfDay(maxDate))
                    ? maxDate
                    : defaultPreSelection;
            return {
                open: _this.props.startOpen || false,
                preventFocus: false,
                inputValue: null,
                preSelection: (_a = (_this.props.selectsRange
                    ? _this.props.startDate
                    : _this.props.selected)) !== null && _a !== void 0 ? _a : boundedPreSelection,
                // transforming highlighted days (perhaps nested array)
                // to flat Map for faster access in day.jsx
                highlightDates: getHighLightDaysMap(_this.props.highlightDates),
                focused: false,
                // used to focus day in inline version after month has changed, but not on
                // initial render
                shouldFocusDayInline: false,
                isRenderAriaLiveMessage: false,
                wasHidden: false,
            };
        };
        _this.resetHiddenStatus = function () {
            _this.setState(_assign(_assign({}, _this.state), { wasHidden: false }));
        };
        _this.setHiddenStatus = function () {
            _this.setState(_assign(_assign({}, _this.state), { wasHidden: true }));
        };
        _this.setHiddenStateOnVisibilityHidden = function () {
            if (document.visibilityState !== "hidden") {
                return;
            }
            _this.setHiddenStatus();
        };
        _this.clearPreventFocusTimeout = function () {
            if (_this.preventFocusTimeout) {
                clearTimeout(_this.preventFocusTimeout);
            }
        };
        _this.setFocus = function () {
            if (_this.input && _this.input.focus) {
                _this.input.focus({ preventScroll: true });
            }
        };
        _this.setBlur = function () {
            if (_this.input && _this.input.blur) {
                _this.input.blur();
            }
            _this.cancelFocusInput();
        };
        _this.setOpen = function (open, skipSetBlur) {
            if (skipSetBlur === void 0) { skipSetBlur = false; }
            _this.setState({
                open: open,
                preSelection: open && _this.state.open
                    ? _this.state.preSelection
                    : _this.calcInitialState().preSelection,
                lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE,
            }, function () {
                if (!open) {
                    _this.setState(function (prev) { return ({
                        focused: skipSetBlur ? prev.focused : false,
                    }); }, function () {
                        !skipSetBlur && _this.setBlur();
                        _this.setState({ inputValue: null });
                    });
                }
            });
        };
        _this.inputOk = function () { return isDate.isDate(_this.state.preSelection); };
        _this.isCalendarOpen = function () {
            return _this.props.open === undefined
                ? _this.state.open && !_this.props.disabled && !_this.props.readOnly
                : _this.props.open;
        };
        _this.handleFocus = function (event) {
            var _a, _b;
            var isAutoReFocus = _this.state.wasHidden;
            var isOpenAllowed = isAutoReFocus ? _this.state.open : true;
            if (isAutoReFocus) {
                _this.resetHiddenStatus();
            }
            if (!_this.state.preventFocus && isOpenAllowed) {
                (_b = (_a = _this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                if (!_this.props.preventOpenOnFocus && !_this.props.readOnly) {
                    _this.setOpen(true);
                }
            }
            _this.setState({ focused: true });
        };
        _this.sendFocusBackToInput = function () {
            // Clear previous timeout if it exists
            if (_this.preventFocusTimeout) {
                _this.clearPreventFocusTimeout();
            }
            // close the popper and refocus the input
            // stop the input from auto opening onFocus
            // setFocus to the input
            _this.setState({ preventFocus: true }, function () {
                _this.preventFocusTimeout = setTimeout(function () {
                    _this.setFocus();
                    _this.setState({ preventFocus: false });
                });
            });
        };
        _this.cancelFocusInput = function () {
            clearTimeout(_this.inputFocusTimeout);
            _this.inputFocusTimeout = undefined;
        };
        _this.deferFocusInput = function () {
            _this.cancelFocusInput();
            _this.inputFocusTimeout = setTimeout(function () { return _this.setFocus(); }, 1);
        };
        _this.handleDropdownFocus = function () {
            _this.cancelFocusInput();
        };
        _this.handleBlur = function (event) {
            var _a, _b;
            if (!_this.state.open || _this.props.withPortal || _this.props.showTimeInput) {
                (_b = (_a = _this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            }
            _this.setState({ focused: false });
        };
        _this.handleCalendarClickOutside = function (event) {
            var _a, _b;
            if (!_this.props.inline) {
                _this.setOpen(false);
            }
            (_b = (_a = _this.props).onClickOutside) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            if (_this.props.withPortal) {
                event.preventDefault();
            }
        };
        _this.handleChange = function () {
            var allArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                allArgs[_i] = arguments[_i];
            }
            var event = allArgs[0];
            if (_this.props.onChangeRaw) {
                _this.props.onChangeRaw.apply(_this, allArgs);
                if (!event ||
                    typeof event.isDefaultPrevented !== "function" ||
                    event.isDefaultPrevented()) {
                    return;
                }
            }
            _this.setState({
                inputValue: (event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : null,
                lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT,
            });
            var _a = _this.props, _b = _a.dateFormat, dateFormat = _b === void 0 ? DatePicker.defaultProps.dateFormat : _b, _c = _a.strictParsing, strictParsing = _c === void 0 ? DatePicker.defaultProps.strictParsing : _c;
            var date = parseDate((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : "", dateFormat, _this.props.locale, strictParsing, _this.props.minDate);
            // Use date from `selected` prop when manipulating only time for input value
            if (_this.props.showTimeSelectOnly &&
                _this.props.selected &&
                date &&
                !isSameDay(date, _this.props.selected)) {
                date = set.set(_this.props.selected, {
                    hours: getHours.getHours(date),
                    minutes: getMinutes.getMinutes(date),
                    seconds: getSeconds.getSeconds(date),
                });
            }
            if (date ||
                !((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement) ||
                !(event === null || event === void 0 ? void 0 : event.target.value)) {
                _this.setSelected(date, event, true);
            }
        };
        _this.handleSelect = function (date, event, monthSelectedIn) {
            if (_this.props.shouldCloseOnSelect && !_this.props.showTimeSelect) {
                // Preventing onFocus event to fix issue
                // https://github.com/Hacker0x01/react-datepicker/issues/628
                _this.sendFocusBackToInput();
            }
            if (_this.props.onChangeRaw) {
                _this.props.onChangeRaw(event);
            }
            _this.setSelected(date, event, false, monthSelectedIn);
            if (_this.props.showDateSelect) {
                _this.setState({ isRenderAriaLiveMessage: true });
            }
            if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
                _this.setPreSelection(date);
            }
            else if (!_this.props.inline) {
                if (!_this.props.selectsRange) {
                    _this.setOpen(false);
                }
                var _a = _this.props, startDate = _a.startDate, endDate = _a.endDate;
                if (startDate &&
                    !endDate &&
                    (_this.props.swapRange || !isDateBefore(date, startDate))) {
                    _this.setOpen(false);
                }
            }
        };
        _this.setSelected = function (date, event, keepInput, monthSelectedIn) {
            var changedDate = date;
            if (_this.props.showYearPicker) {
                if (changedDate !== null &&
                    isYearDisabled(getYear.getYear(changedDate), _this.props)) {
                    return;
                }
            }
            else if (_this.props.showMonthYearPicker) {
                if (changedDate !== null && isMonthDisabled(changedDate, _this.props)) {
                    return;
                }
            }
            else {
                if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
                    return;
                }
            }
            var _a = _this.props, onChange = _a.onChange, selectsRange = _a.selectsRange, startDate = _a.startDate, endDate = _a.endDate, selectsMultiple = _a.selectsMultiple, selectedDates = _a.selectedDates, minTime = _a.minTime, swapRange = _a.swapRange;
            if (!isEqual(_this.props.selected, changedDate) ||
                _this.props.allowSameDay ||
                selectsRange ||
                selectsMultiple) {
                if (changedDate !== null) {
                    if (_this.props.selected &&
                        (!keepInput ||
                            (!_this.props.showTimeSelect &&
                                !_this.props.showTimeSelectOnly &&
                                !_this.props.showTimeInput))) {
                        changedDate = setTime(changedDate, {
                            hour: getHours.getHours(_this.props.selected),
                            minute: getMinutes.getMinutes(_this.props.selected),
                            second: getSeconds.getSeconds(_this.props.selected),
                        });
                    }
                    // If minTime is present then set the time to minTime
                    if (!keepInput &&
                        (_this.props.showTimeSelect || _this.props.showTimeSelectOnly)) {
                        if (minTime) {
                            changedDate = setTime(changedDate, {
                                hour: minTime.getHours(),
                                minute: minTime.getMinutes(),
                                second: minTime.getSeconds(),
                            });
                        }
                    }
                    if (!_this.props.inline) {
                        _this.setState({
                            preSelection: changedDate,
                        });
                    }
                    if (!_this.props.focusSelectedMonth) {
                        _this.setState({ monthSelectedIn: monthSelectedIn });
                    }
                }
                if (selectsRange) {
                    var noRanges = !startDate && !endDate;
                    var hasStartRange = startDate && !endDate;
                    var isRangeFilled = startDate && endDate;
                    if (noRanges) {
                        onChange([changedDate, null], event);
                    }
                    else if (hasStartRange) {
                        if (changedDate === null) {
                            onChange([null, null], event);
                        }
                        else if (isDateBefore(changedDate, startDate)) {
                            if (swapRange) {
                                onChange([changedDate, startDate], event);
                            }
                            else {
                                onChange([changedDate, null], event);
                            }
                        }
                        else {
                            onChange([startDate, changedDate], event);
                        }
                    }
                    if (isRangeFilled) {
                        onChange([changedDate, null], event);
                    }
                }
                else if (selectsMultiple) {
                    if (changedDate !== null) {
                        if (!(selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.length)) {
                            onChange([changedDate], event);
                        }
                        else {
                            var isChangedDateAlreadySelected = selectedDates.some(function (selectedDate) { return isSameDay(selectedDate, changedDate); });
                            if (isChangedDateAlreadySelected) {
                                var nextDates = selectedDates.filter(function (selectedDate) { return !isSameDay(selectedDate, changedDate); });
                                onChange(nextDates, event);
                            }
                            else {
                                onChange(__spreadArray(__spreadArray([], selectedDates, true), [changedDate], false), event);
                            }
                        }
                    }
                }
                else {
                    onChange(changedDate, event);
                }
            }
            if (!keepInput) {
                _this.props.onSelect(changedDate, event);
                _this.setState({ inputValue: null });
            }
        };
        // When checking preSelection via min/maxDate, times need to be manipulated via getStartOfDay/getEndOfDay
        _this.setPreSelection = function (date) {
            var hasMinDate = isDate.isDate(_this.props.minDate);
            var hasMaxDate = isDate.isDate(_this.props.maxDate);
            var isValidDateSelection = true;
            if (date) {
                var dateStartOfDay = getStartOfDay(date);
                if (hasMinDate && hasMaxDate) {
                    // isDayInRange uses getStartOfDay internally, so not necessary to manipulate times here
                    isValidDateSelection = isDayInRange(date, _this.props.minDate, _this.props.maxDate);
                }
                else if (hasMinDate) {
                    var minDateStartOfDay = getStartOfDay(_this.props.minDate);
                    isValidDateSelection =
                        isAfter.isAfter(date, minDateStartOfDay) ||
                            isEqual(dateStartOfDay, minDateStartOfDay);
                }
                else if (hasMaxDate) {
                    var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
                    isValidDateSelection =
                        isBefore.isBefore(date, maxDateEndOfDay) ||
                            isEqual(dateStartOfDay, maxDateEndOfDay);
                }
            }
            if (isValidDateSelection) {
                _this.setState({
                    preSelection: date,
                });
            }
        };
        _this.toggleCalendar = function () {
            _this.setOpen(!_this.state.open);
        };
        _this.handleTimeChange = function (time) {
            if (_this.props.selectsRange || _this.props.selectsMultiple) {
                return;
            }
            var selected = _this.props.selected
                ? _this.props.selected
                : _this.getPreSelection();
            var changedDate = _this.props.selected
                ? time
                : setTime(selected, {
                    hour: getHours.getHours(time),
                    minute: getMinutes.getMinutes(time),
                });
            _this.setState({
                preSelection: changedDate,
            });
            _this.props.onChange(changedDate);
            if (_this.props.shouldCloseOnSelect && !_this.props.showTimeInput) {
                _this.sendFocusBackToInput();
                _this.setOpen(false);
            }
            if (_this.props.showTimeInput) {
                _this.setOpen(true);
            }
            if (_this.props.showTimeSelectOnly || _this.props.showTimeSelect) {
                _this.setState({ isRenderAriaLiveMessage: true });
            }
            _this.setState({ inputValue: null });
        };
        _this.onInputClick = function () {
            var _a, _b;
            if (!_this.props.disabled && !_this.props.readOnly) {
                _this.setOpen(true);
            }
            (_b = (_a = _this.props).onInputClick) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        _this.onInputKeyDown = function (event) {
            var _a, _b, _c, _d, _e;
            (_b = (_a = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            var eventKey = event.key;
            if (!_this.state.open &&
                !_this.props.inline &&
                !_this.props.preventOpenOnFocus) {
                if (eventKey === KeyType.ArrowDown ||
                    eventKey === KeyType.ArrowUp ||
                    eventKey === KeyType.Enter) {
                    _this.onInputClick();
                }
                return;
            }
            // if calendar is open, these keys will focus the selected item
            if (_this.state.open) {
                if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp) {
                    event.preventDefault();
                    var selectorString = _this.props.showTimeSelectOnly
                        ? ".react-datepicker__time-list-item[tabindex='0']"
                        : _this.props.showWeekPicker && _this.props.showWeekNumbers
                            ? '.react-datepicker__week-number[tabindex="0"]'
                            : _this.props.showFullMonthYearPicker ||
                                _this.props.showMonthYearPicker
                                ? '.react-datepicker__month-text[tabindex="0"]'
                                : '.react-datepicker__day[tabindex="0"]';
                    var selectedItem = ((_c = _this.calendar) === null || _c === void 0 ? void 0 : _c.componentNode) instanceof Element &&
                        _this.calendar.componentNode.querySelector(selectorString);
                    selectedItem instanceof HTMLElement &&
                        selectedItem.focus({ preventScroll: true });
                    return;
                }
                var copy = newDate(_this.state.preSelection);
                if (eventKey === KeyType.Enter) {
                    event.preventDefault();
                    if (_this.inputOk() &&
                        _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE) {
                        _this.handleSelect(copy, event);
                        !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
                    }
                    else {
                        _this.setOpen(false);
                    }
                }
                else if (eventKey === KeyType.Escape) {
                    event.preventDefault();
                    _this.sendFocusBackToInput();
                    _this.setOpen(false);
                }
                else if (eventKey === KeyType.Tab) {
                    _this.setOpen(false);
                }
                if (!_this.inputOk()) {
                    (_e = (_d = _this.props).onInputError) === null || _e === void 0 ? void 0 : _e.call(_d, { code: 1, msg: INPUT_ERR_1 });
                }
            }
        };
        _this.onPortalKeyDown = function (event) {
            var eventKey = event.key;
            if (eventKey === KeyType.Escape) {
                event.preventDefault();
                _this.setState({
                    preventFocus: true,
                }, function () {
                    _this.setOpen(false);
                    setTimeout(function () {
                        _this.setFocus();
                        _this.setState({ preventFocus: false });
                    });
                });
            }
        };
        // keyDown events passed down to day.jsx
        _this.onDayKeyDown = function (event) {
            var _a, _b, _c, _d;
            var _e = _this.props, minDate = _e.minDate, maxDate = _e.maxDate, disabledKeyboardNavigation = _e.disabledKeyboardNavigation, showWeekPicker = _e.showWeekPicker, shouldCloseOnSelect = _e.shouldCloseOnSelect, locale = _e.locale, calendarStartDay = _e.calendarStartDay, adjustDateOnChange = _e.adjustDateOnChange, inline = _e.inline;
            (_b = (_a = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            if (disabledKeyboardNavigation)
                return;
            var eventKey = event.key;
            var isShiftKeyActive = event.shiftKey;
            var copy = newDate(_this.state.preSelection);
            var calculateNewDate = function (eventKey, date) {
                var newCalculatedDate = date;
                switch (eventKey) {
                    case KeyType.ArrowRight:
                        newCalculatedDate = showWeekPicker
                            ? addWeeks.addWeeks(date, 1)
                            : addDays.addDays(date, 1);
                        break;
                    case KeyType.ArrowLeft:
                        newCalculatedDate = showWeekPicker
                            ? subWeeks.subWeeks(date, 1)
                            : subDays.subDays(date, 1);
                        break;
                    case KeyType.ArrowUp:
                        newCalculatedDate = subWeeks.subWeeks(date, 1);
                        break;
                    case KeyType.ArrowDown:
                        newCalculatedDate = addWeeks.addWeeks(date, 1);
                        break;
                    case KeyType.PageUp:
                        newCalculatedDate = isShiftKeyActive
                            ? subYears.subYears(date, 1)
                            : subMonths.subMonths(date, 1);
                        break;
                    case KeyType.PageDown:
                        newCalculatedDate = isShiftKeyActive
                            ? addYears.addYears(date, 1)
                            : addMonths.addMonths(date, 1);
                        break;
                    case KeyType.Home:
                        newCalculatedDate = getStartOfWeek(date, locale, calendarStartDay);
                        break;
                    case KeyType.End:
                        newCalculatedDate = getEndOfWeek(date);
                        break;
                }
                return newCalculatedDate;
            };
            var getNewDate = function (eventKey, date) {
                var MAX_ITERATIONS = 40;
                var eventKeyCopy = eventKey;
                var validDateFound = false;
                var iterations = 0;
                var newSelection = calculateNewDate(eventKey, date);
                while (!validDateFound) {
                    if (iterations >= MAX_ITERATIONS) {
                        newSelection = date;
                        break;
                    }
                    // if minDate exists and the new selection is before the min date, get the nearest date that isn't disabled
                    if (minDate && newSelection < minDate) {
                        eventKeyCopy = KeyType.ArrowRight;
                        newSelection = isDayDisabled(minDate, _this.props)
                            ? calculateNewDate(eventKeyCopy, newSelection)
                            : minDate;
                    }
                    // if maxDate exists and the new selection is after the max date, get the nearest date that isn't disabled
                    if (maxDate && newSelection > maxDate) {
                        eventKeyCopy = KeyType.ArrowLeft;
                        newSelection = isDayDisabled(maxDate, _this.props)
                            ? calculateNewDate(eventKeyCopy, newSelection)
                            : maxDate;
                    }
                    if (isDayDisabled(newSelection, _this.props)) {
                        // if PageUp and Home is pressed to a disabled date, it will try to find the next available date after
                        if (eventKeyCopy === KeyType.PageUp ||
                            eventKeyCopy === KeyType.Home) {
                            eventKeyCopy = KeyType.ArrowRight;
                        }
                        // if PageDown and End is pressed to a disabled date, it will try to find the next available date before
                        if (eventKeyCopy === KeyType.PageDown ||
                            eventKeyCopy === KeyType.End) {
                            eventKeyCopy = KeyType.ArrowLeft;
                        }
                        newSelection = calculateNewDate(eventKeyCopy, newSelection);
                    }
                    else {
                        validDateFound = true;
                    }
                    iterations++;
                }
                return newSelection;
            };
            if (eventKey === KeyType.Enter) {
                event.preventDefault();
                _this.handleSelect(copy, event);
                !shouldCloseOnSelect && _this.setPreSelection(copy);
                return;
            }
            else if (eventKey === KeyType.Escape) {
                event.preventDefault();
                _this.setOpen(false);
                if (!_this.inputOk()) {
                    (_d = (_c = _this.props).onInputError) === null || _d === void 0 ? void 0 : _d.call(_c, { code: 1, msg: INPUT_ERR_1 });
                }
                return;
            }
            var newSelection = null;
            switch (eventKey) {
                case KeyType.ArrowLeft:
                case KeyType.ArrowRight:
                case KeyType.ArrowUp:
                case KeyType.ArrowDown:
                case KeyType.PageUp:
                case KeyType.PageDown:
                case KeyType.Home:
                case KeyType.End:
                    newSelection = getNewDate(eventKey, copy);
                    break;
            }
            if (!newSelection) {
                if (_this.props.onInputError) {
                    _this.props.onInputError({ code: 1, msg: INPUT_ERR_1 });
                }
                return;
            }
            event.preventDefault();
            _this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
            if (adjustDateOnChange) {
                _this.setSelected(newSelection);
            }
            _this.setPreSelection(newSelection);
            // need to figure out whether month has changed to focus day in inline version
            if (inline) {
                var prevMonth = getMonth.getMonth(copy);
                var newMonth = getMonth.getMonth(newSelection);
                var prevYear = getYear.getYear(copy);
                var newYear = getYear.getYear(newSelection);
                if (prevMonth !== newMonth || prevYear !== newYear) {
                    // month has changed
                    _this.setState({ shouldFocusDayInline: true });
                }
                else {
                    // month hasn't changed
                    _this.setState({ shouldFocusDayInline: false });
                }
            }
        };
        // handle generic key down events in the popper that do not adjust or select dates
        // ex: while focusing prev and next month buttons
        _this.onPopperKeyDown = function (event) {
            var eventKey = event.key;
            if (eventKey === KeyType.Escape) {
                event.preventDefault();
                _this.sendFocusBackToInput();
            }
        };
        _this.onClearClick = function (event) {
            if (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                }
            }
            _this.sendFocusBackToInput();
            var _a = _this.props, selectsRange = _a.selectsRange, onChange = _a.onChange;
            if (selectsRange) {
                onChange([null, null], event);
            }
            else {
                onChange(null, event);
            }
            if (_this.props.selectsRange) {
                _this.props.onChange([null, null], event);
            }
            else {
                _this.props.onChange(null, event);
            }
            _this.setState({ inputValue: null });
        };
        _this.clear = function () {
            _this.onClearClick();
        };
        _this.onScroll = function (event) {
            if (typeof _this.props.closeOnScroll === "boolean" &&
                _this.props.closeOnScroll) {
                if (event.target === document ||
                    event.target === document.documentElement ||
                    event.target === document.body) {
                    _this.setOpen(false);
                }
            }
            else if (typeof _this.props.closeOnScroll === "function") {
                if (_this.props.closeOnScroll(event)) {
                    _this.setOpen(false);
                }
            }
        };
        _this.renderCalendar = function () {
            var _a, _b;
            if (!_this.props.inline && !_this.isCalendarOpen()) {
                return null;
            }
            return (React__default.default.createElement(WrappedCalendar, _assign({ ref: function (elem) {
                    _this.calendar = elem;
                } }, _this.props, _this.state, { setOpen: _this.setOpen, dateFormat: (_a = _this.props.dateFormatCalendar) !== null && _a !== void 0 ? _a : DatePicker.defaultProps.dateFormatCalendar, onSelect: _this.handleSelect, onClickOutside: _this.handleCalendarClickOutside, holidays: getHolidaysMap(_this.modifyHolidays()), outsideClickIgnoreClass: outsideClickIgnoreClass, onDropdownFocus: _this.handleDropdownFocus, onTimeChange: _this.handleTimeChange, className: _this.props.calendarClassName, container: _this.props.calendarContainer, handleOnKeyDown: _this.props.onKeyDown, handleOnDayKeyDown: _this.onDayKeyDown, setPreSelection: _this.setPreSelection, dropdownMode: (_b = _this.props.dropdownMode) !== null && _b !== void 0 ? _b : DatePicker.defaultProps.dropdownMode }), _this.props.children));
        };
        _this.renderAriaLiveRegion = function () {
            var _a = _this.props, _b = _a.dateFormat, dateFormat = _b === void 0 ? DatePicker.defaultProps.dateFormat : _b, locale = _a.locale;
            var isContainsTime = _this.props.showTimeInput || _this.props.showTimeSelect;
            var longDateFormat = isContainsTime ? "PPPPp" : "PPPP";
            var ariaLiveMessage;
            if (_this.props.selectsRange) {
                ariaLiveMessage = "Selected start date: ".concat(safeDateFormat(_this.props.startDate, {
                    dateFormat: longDateFormat,
                    locale: locale,
                }), ". ").concat(_this.props.endDate
                    ? "End date: " +
                        safeDateFormat(_this.props.endDate, {
                            dateFormat: longDateFormat,
                            locale: locale,
                        })
                    : "");
            }
            else {
                if (_this.props.showTimeSelectOnly) {
                    ariaLiveMessage = "Selected time: ".concat(safeDateFormat(_this.props.selected, { dateFormat: dateFormat, locale: locale }));
                }
                else if (_this.props.showYearPicker) {
                    ariaLiveMessage = "Selected year: ".concat(safeDateFormat(_this.props.selected, { dateFormat: "yyyy", locale: locale }));
                }
                else if (_this.props.showMonthYearPicker) {
                    ariaLiveMessage = "Selected month: ".concat(safeDateFormat(_this.props.selected, { dateFormat: "MMMM yyyy", locale: locale }));
                }
                else if (_this.props.showQuarterYearPicker) {
                    ariaLiveMessage = "Selected quarter: ".concat(safeDateFormat(_this.props.selected, {
                        dateFormat: "yyyy, QQQ",
                        locale: locale,
                    }));
                }
                else {
                    ariaLiveMessage = "Selected date: ".concat(safeDateFormat(_this.props.selected, {
                        dateFormat: longDateFormat,
                        locale: locale,
                    }));
                }
            }
            return (React__default.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, ariaLiveMessage));
        };
        _this.renderDateInput = function () {
            var _a, _b;
            var _c;
            var className = clsx.clsx(_this.props.className, (_a = {},
                _a[outsideClickIgnoreClass] = _this.state.open,
                _a));
            var customInput = _this.props.customInput || React__default.default.createElement("input", { type: "text" });
            var customInputRef = _this.props.customInputRef || "ref";
            var _d = _this.props, _e = _d.dateFormat, dateFormat = _e === void 0 ? DatePicker.defaultProps.dateFormat : _e, locale = _d.locale;
            var inputValue = typeof _this.props.value === "string"
                ? _this.props.value
                : typeof _this.state.inputValue === "string"
                    ? _this.state.inputValue
                    : _this.props.selectsRange
                        ? safeDateRangeFormat(_this.props.startDate, _this.props.endDate, {
                            dateFormat: dateFormat,
                            locale: locale,
                        })
                        : _this.props.selectsMultiple
                            ? safeMultipleDatesFormat((_c = _this.props.selectedDates) !== null && _c !== void 0 ? _c : [], {
                                dateFormat: dateFormat,
                                locale: locale,
                            })
                            : safeDateFormat(_this.props.selected, {
                                dateFormat: dateFormat,
                                locale: locale,
                            });
            return React.cloneElement(customInput, (_b = {},
                _b[customInputRef] = function (input) {
                    _this.input = input;
                },
                _b.value = inputValue,
                _b.onBlur = _this.handleBlur,
                _b.onChange = _this.handleChange,
                _b.onClick = _this.onInputClick,
                _b.onFocus = _this.handleFocus,
                _b.onKeyDown = _this.onInputKeyDown,
                _b.id = _this.props.id,
                _b.name = _this.props.name,
                _b.form = _this.props.form,
                _b.autoFocus = _this.props.autoFocus,
                _b.placeholder = _this.props.placeholderText,
                _b.disabled = _this.props.disabled,
                _b.autoComplete = _this.props.autoComplete,
                _b.className = clsx.clsx(customInput.props.className, className),
                _b.title = _this.props.title,
                _b.readOnly = _this.props.readOnly,
                _b.required = _this.props.required,
                _b.tabIndex = _this.props.tabIndex,
                _b["aria-describedby"] = _this.props.ariaDescribedBy,
                _b["aria-invalid"] = _this.props.ariaInvalid,
                _b["aria-labelledby"] = _this.props.ariaLabelledBy,
                _b["aria-required"] = _this.props.ariaRequired,
                _b));
        };
        _this.renderClearButton = function () {
            var _a = _this.props, isClearable = _a.isClearable, disabled = _a.disabled, selected = _a.selected, startDate = _a.startDate, endDate = _a.endDate, clearButtonTitle = _a.clearButtonTitle, _b = _a.clearButtonClassName, clearButtonClassName = _b === void 0 ? "" : _b, _c = _a.ariaLabelClose, ariaLabelClose = _c === void 0 ? "Close" : _c, selectedDates = _a.selectedDates;
            if (isClearable &&
                (selected != null ||
                    startDate != null ||
                    endDate != null ||
                    (selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.length))) {
                return (React__default.default.createElement("button", { type: "button", className: clsx.clsx("react-datepicker__close-icon", clearButtonClassName, { "react-datepicker__close-icon--disabled": disabled }), disabled: disabled, "aria-label": ariaLabelClose, onClick: _this.onClearClick, title: clearButtonTitle, tabIndex: -1 }));
            }
            else {
                return null;
            }
        };
        _this.state = _this.calcInitialState();
        _this.preventFocusTimeout = undefined;
        return _this;
    }
    Object.defineProperty(DatePicker, "defaultProps", {
        get: function () {
            return {
                allowSameDay: false,
                dateFormat: "MM/dd/yyyy",
                dateFormatCalendar: "LLLL yyyy",
                onChange: function () { },
                disabled: false,
                disabledKeyboardNavigation: false,
                dropdownMode: "scroll",
                onFocus: function () { },
                onBlur: function () { },
                onKeyDown: function () { },
                onInputClick: function () { },
                onSelect: function () { },
                onClickOutside: function () { },
                onMonthChange: function () { },
                onCalendarOpen: function () { },
                onCalendarClose: function () { },
                preventOpenOnFocus: false,
                onYearChange: function () { },
                onInputError: function () { },
                monthsShown: 1,
                readOnly: false,
                withPortal: false,
                selectsDisabledDaysInRange: false,
                shouldCloseOnSelect: true,
                showTimeSelect: false,
                showTimeInput: false,
                showPreviousMonths: false,
                showMonthYearPicker: false,
                showFullMonthYearPicker: false,
                showTwoColumnMonthYearPicker: false,
                showFourColumnMonthYearPicker: false,
                showYearPicker: false,
                showQuarterYearPicker: false,
                showWeekPicker: false,
                strictParsing: false,
                swapRange: false,
                timeIntervals: 30,
                timeCaption: "Time",
                previousMonthAriaLabel: "Previous Month",
                previousMonthButtonLabel: "Previous Month",
                nextMonthAriaLabel: "Next Month",
                nextMonthButtonLabel: "Next Month",
                previousYearAriaLabel: "Previous Year",
                previousYearButtonLabel: "Previous Year",
                nextYearAriaLabel: "Next Year",
                nextYearButtonLabel: "Next Year",
                timeInputLabel: "Time",
                enableTabLoop: true,
                yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
                focusSelectedMonth: false,
                showPopperArrow: true,
                excludeScrollbar: true,
                customTimeInput: null,
                calendarStartDay: undefined,
                toggleCalendarOnIconClick: false,
                usePointerEvent: false,
            };
        },
        enumerable: false,
        configurable: true
    });
    DatePicker.prototype.componentDidMount = function () {
        window.addEventListener("scroll", this.onScroll, true);
        document.addEventListener("visibilitychange", this.setHiddenStateOnVisibilityHidden);
    };
    DatePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b, _c, _d;
        if (prevProps.inline &&
            hasPreSelectionChanged(prevProps.selected, this.props.selected)) {
            this.setPreSelection(this.props.selected);
        }
        if (this.state.monthSelectedIn !== undefined &&
            prevProps.monthsShown !== this.props.monthsShown) {
            this.setState({ monthSelectedIn: 0 });
        }
        if (prevProps.highlightDates !== this.props.highlightDates) {
            this.setState({
                highlightDates: getHighLightDaysMap(this.props.highlightDates),
            });
        }
        if (!prevState.focused &&
            !isEqual(prevProps.selected, this.props.selected)) {
            this.setState({ inputValue: null });
        }
        if (prevState.open !== this.state.open) {
            if (prevState.open === false && this.state.open === true) {
                (_b = (_a = this.props).onCalendarOpen) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
            if (prevState.open === true && this.state.open === false) {
                (_d = (_c = this.props).onCalendarClose) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
        }
    };
    DatePicker.prototype.componentWillUnmount = function () {
        this.clearPreventFocusTimeout();
        window.removeEventListener("scroll", this.onScroll, true);
        document.removeEventListener("visibilitychange", this.setHiddenStateOnVisibilityHidden);
    };
    DatePicker.prototype.renderInputContainer = function () {
        var _a = this.props, showIcon = _a.showIcon, icon = _a.icon, calendarIconClassname = _a.calendarIconClassname, calendarIconClassName = _a.calendarIconClassName, toggleCalendarOnIconClick = _a.toggleCalendarOnIconClick;
        var open = this.state.open;
        if (calendarIconClassname) {
            console.warn("calendarIconClassname props is deprecated. should use calendarIconClassName props.");
        }
        return (React__default.default.createElement("div", { className: "react-datepicker__input-container".concat(showIcon ? " react-datepicker__view-calendar-icon" : "") },
            showIcon && (React__default.default.createElement(CalendarIcon, _assign({ icon: icon, className: clsx.clsx(calendarIconClassName, !calendarIconClassName && calendarIconClassname, open && "react-datepicker-ignore-onclickoutside") }, (toggleCalendarOnIconClick
                ? {
                    onClick: this.toggleCalendar,
                }
                : null)))),
            this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion(),
            this.renderDateInput(),
            this.renderClearButton()));
    };
    DatePicker.prototype.render = function () {
        var calendar = this.renderCalendar();
        if (this.props.inline)
            return calendar;
        if (this.props.withPortal) {
            var portalContainer = this.state.open ? (React__default.default.createElement(TabLoop, { enableTabLoop: this.props.enableTabLoop },
                React__default.default.createElement("div", { className: "react-datepicker__portal", tabIndex: -1, onKeyDown: this.onPortalKeyDown }, calendar))) : null;
            if (this.state.open && this.props.portalId) {
                portalContainer = (React__default.default.createElement(Portal, _assign({ portalId: this.props.portalId }, this.props), portalContainer));
            }
            return (React__default.default.createElement("div", null,
                this.renderInputContainer(),
                portalContainer));
        }
        return (React__default.default.createElement(PopperComponent$1, _assign({}, this.props, { className: this.props.popperClassName, hidePopper: !this.isCalendarOpen(), targetComponent: this.renderInputContainer(), popperComponent: calendar, popperOnKeyDown: this.onPopperKeyDown, showArrow: this.props.showPopperArrow })));
    };
    return DatePicker;
}(React.Component));
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

exports.CalendarContainer = CalendarContainer;
exports.default = DatePicker;
exports.getDefaultLocale = getDefaultLocale;
exports.registerLocale = registerLocale;
exports.setDefaultLocale = setDefaultLocale;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLnRzeCIsIi4uL3NyYy9kYXRlX3V0aWxzLnRzIiwiLi4vc3JjL2lucHV0X3RpbWUudHN4IiwiLi4vc3JjL2RheS50c3giLCIuLi9zcmMvd2Vla19udW1iZXIudHN4IiwiLi4vc3JjL3dlZWsudHN4IiwiLi4vc3JjL21vbnRoLnRzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi50c3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy90aW1lLnRzeCIsIi4uL3NyYy95ZWFyLnRzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL3llYXJfZHJvcGRvd24udHN4IiwiLi4vc3JjL2NhbGVuZGFyLnRzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLnRzeCIsIi4uL3NyYy9wb3J0YWwudHN4IiwiLi4vc3JjL3RhYl9sb29wLnRzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLnRzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LnRzeCIsIi4uL3NyYy9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAoZW52LnN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWMuYXN5bmMpIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG59O1xyXG4iLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJleHRlbmRTdGF0aWNzIiwiZCIsImIiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIl9fZXh0ZW5kcyIsIlR5cGVFcnJvciIsIlN0cmluZyIsIl9fIiwiY29uc3RydWN0b3IiLCJjcmVhdGUiLCJfX2Fzc2lnbiIsImFzc2lnbiIsInQiLCJzIiwiaSIsIm4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcHBseSIsIl9fc3ByZWFkQXJyYXkiLCJ0byIsImZyb20iLCJwYWNrIiwibCIsImFyIiwic2xpY2UiLCJjb25jYXQiLCJTdXBwcmVzc2VkRXJyb3IiLCJlcnJvciIsInN1cHByZXNzZWQiLCJtZXNzYWdlIiwiZSIsIkVycm9yIiwibmFtZSIsIlJlYWN0IiwicGFyc2VJU08iLCJ0b0RhdGUiLCJwYXJzZSIsImxvbmdGb3JtYXR0ZXJzIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRJU09XZWVrIiwic3RhcnRPZkRheSIsInN0YXJ0T2ZXZWVrIiwic3RhcnRPZk1vbnRoIiwic3RhcnRPZlllYXIiLCJzdGFydE9mUXVhcnRlciIsImVuZE9mRGF5IiwiZW5kT2ZXZWVrIiwiZGZJc1NhbWVZZWFyIiwiZGZJc1NhbWVNb250aCIsImRmSXNTYW1lUXVhcnRlciIsImRmSXNTYW1lRGF5IiwiZGZJc0VxdWFsIiwiaXNXaXRoaW5JbnRlcnZhbCIsInNldE1vbnRoIiwic2V0UXVhcnRlciIsImVuZE9mTW9udGgiLCJnZXRZZWFyIiwiZ2V0TW9udGgiLCJlbmRPZlllYXIiLCJnZXRRdWFydGVyIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiYWRkTW9udGhzIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwiYWRkUXVhcnRlcnMiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJhZGRZZWFycyIsIm1pbiIsIm1heCIsImlzRGF0ZSIsImFkZEhvdXJzIiwiYWRkTWludXRlcyIsImFkZFNlY29uZHMiLCJpc0FmdGVyIiwiY2xvbmVFbGVtZW50IiwiQ29tcG9uZW50IiwiY3JlYXRlUmVmIiwiZ2V0RGF5IiwiY2xzeCIsImdldERhdGUiLCJhZGREYXlzIiwiYWRkV2Vla3MiLCJvbkNsaWNrT3V0c2lkZSIsImdldFRpbWUiLCJzZXRZZWFyIiwiUmVhY3RET00iLCJ1c2VSZWYiLCJ1c2VGbG9hdGluZyIsImF1dG9VcGRhdGUiLCJmbGlwIiwib2Zmc2V0IiwiYXJyb3ciLCJGbG9hdGluZ0Fycm93IiwiY3JlYXRlRWxlbWVudCIsInNldCIsInN1YldlZWtzIiwic3ViRGF5cyIsIlBvcHBlckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSUEsY0FBYSxHQUFHLFNBQUFBLGNBQVNDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0FBQy9CRixFQUFBQSxjQUFhLEdBQUdHLE1BQU0sQ0FBQ0MsY0FBYyxJQUNoQztBQUFFQyxJQUFBQSxTQUFTLEVBQUUsRUFBQTtBQUFHLEdBQUMsWUFBWUMsS0FBSyxJQUFJLFVBQVVMLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQUVELENBQUMsQ0FBQ0ksU0FBUyxHQUFHSCxDQUFDLENBQUE7QUFBRSxHQUFFLElBQzVFLFVBQVVELENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQUUsS0FBSyxJQUFJSyxDQUFDLElBQUlMLENBQUMsRUFBRSxJQUFJQyxNQUFNLENBQUNLLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNSLENBQUMsRUFBRUssQ0FBQyxDQUFDLEVBQUVOLENBQUMsQ0FBQ00sQ0FBQyxDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxDQUFDLENBQUE7R0FBRyxDQUFBO0FBQ3JHLEVBQUEsT0FBT1AsY0FBYSxDQUFDQyxDQUFDLEVBQUVDLENB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
