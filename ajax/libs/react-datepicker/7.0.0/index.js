/*!
  react-datepicker v7.0.0
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
            if (typeof _this.props.onWeekSelect === "function") {
                _this.props.onWeekSelect(day, weekNumber, event);
            }
            if (_this.props.showWeekPicker) {
                _this.handleDayClick(day, event);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLnRzeCIsIi4uL3NyYy9kYXRlX3V0aWxzLnRzIiwiLi4vc3JjL2lucHV0X3RpbWUudHN4IiwiLi4vc3JjL2RheS50c3giLCIuLi9zcmMvd2Vla19udW1iZXIudHN4IiwiLi4vc3JjL3dlZWsudHN4IiwiLi4vc3JjL21vbnRoLnRzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi50c3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy90aW1lLnRzeCIsIi4uL3NyYy95ZWFyLnRzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL3llYXJfZHJvcGRvd24udHN4IiwiLi4vc3JjL2NhbGVuZGFyLnRzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLnRzeCIsIi4uL3NyYy9wb3J0YWwudHN4IiwiLi4vc3JjL3RhYl9sb29wLnRzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLnRzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LnRzeCIsIi4uL3NyYy9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAoZW52LnN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWMuYXN5bmMpIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG59O1xyXG4iLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJleHRlbmRTdGF0aWNzIiwiZCIsImIiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIl9fZXh0ZW5kcyIsIlR5cGVFcnJvciIsIlN0cmluZyIsIl9fIiwiY29uc3RydWN0b3IiLCJjcmVhdGUiLCJfX2Fzc2lnbiIsImFzc2lnbiIsInQiLCJzIiwiaSIsIm4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcHBseSIsIl9fc3ByZWFkQXJyYXkiLCJ0byIsImZyb20iLCJwYWNrIiwibCIsImFyIiwic2xpY2UiLCJjb25jYXQiLCJTdXBwcmVzc2VkRXJyb3IiLCJlcnJvciIsInN1cHByZXNzZWQiLCJtZXNzYWdlIiwiZSIsIkVycm9yIiwibmFtZSIsIlJlYWN0IiwicGFyc2VJU08iLCJ0b0RhdGUiLCJwYXJzZSIsImxvbmdGb3JtYXR0ZXJzIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRJU09XZWVrIiwic3RhcnRPZkRheSIsInN0YXJ0T2ZXZWVrIiwic3RhcnRPZk1vbnRoIiwic3RhcnRPZlllYXIiLCJzdGFydE9mUXVhcnRlciIsImVuZE9mRGF5IiwiZW5kT2ZXZWVrIiwiZGZJc1NhbWVZZWFyIiwiZGZJc1NhbWVNb250aCIsImRmSXNTYW1lUXVhcnRlciIsImRmSXNTYW1lRGF5IiwiZGZJc0VxdWFsIiwiaXNXaXRoaW5JbnRlcnZhbCIsInNldE1vbnRoIiwic2V0UXVhcnRlciIsImVuZE9mTW9udGgiLCJnZXRZZWFyIiwiZ2V0TW9udGgiLCJlbmRPZlllYXIiLCJnZXRRdWFydGVyIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiYWRkTW9udGhzIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwiYWRkUXVhcnRlcnMiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJhZGRZZWFycyIsIm1pbiIsIm1heCIsImlzRGF0ZSIsImFkZEhvdXJzIiwiYWRkTWludXRlcyIsImFkZFNlY29uZHMiLCJpc0FmdGVyIiwiY2xvbmVFbGVtZW50IiwiQ29tcG9uZW50IiwiY3JlYXRlUmVmIiwiZ2V0RGF5IiwiY2xzeCIsImdldERhdGUiLCJhZGREYXlzIiwiYWRkV2Vla3MiLCJvbkNsaWNrT3V0c2lkZSIsImdldFRpbWUiLCJzZXRZZWFyIiwiUmVhY3RET00iLCJ1c2VSZWYiLCJ1c2VGbG9hdGluZyIsImF1dG9VcGRhdGUiLCJmbGlwIiwib2Zmc2V0IiwiYXJyb3ciLCJGbG9hdGluZ0Fycm93IiwiY3JlYXRlRWxlbWVudCIsInNldCIsInN1YldlZWtzIiwic3ViRGF5cyIsIlBvcHBlckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSUEsY0FBYSxHQUFHLFNBQUFBLGNBQVNDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0FBQy9CRixFQUFBQSxjQUFhLEdBQUdHLE1BQU0sQ0FBQ0MsY0FBYyxJQUNoQztBQUFFQyxJQUFBQSxTQUFTLEVBQUUsRUFBQTtBQUFHLEdBQUMsWUFBWUMsS0FBSyxJQUFJLFVBQVVMLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQUVELENBQUMsQ0FBQ0ksU0FBUyxHQUFHSCxDQUFDLENBQUE7QUFBRSxHQUFFLElBQzVFLFVBQVVELENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQUUsS0FBSyxJQUFJSyxDQUFDLElBQUlMLENBQUMsRUFBRSxJQUFJQyxNQUFNLENBQUNLLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNSLENBQUMsRUFBRUssQ0FBQyxDQUFDLEVBQUVOLENBQUMsQ0FBQ00sQ0FBQyxDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxDQUFDLENBQUE7R0FBRyxDQUFBO0FBQ3JHLEVBQUEsT0FBT1AsY0FBYSxDQUFDQyxDQUFDLEVBQUVDLENB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QUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3pCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUNuQ3hELHNCQUFDLENBQUEsYUFBQSxDQUFBLE9BQU8sSUFBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUE7Z0JBQzlDQSxzQkFDRSxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxTQUFTLEVBQUMsMEJBQTBCLEVBQ3BDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFDWixTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFFOUIsRUFBQSxRQUFRLENBQ0wsQ0FDRSxJQUNSLElBQUksQ0FBQztBQUVULFlBQUEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDMUMsZUFBZSxJQUNiQSxzQkFBQyxDQUFBLGFBQUEsQ0FBQSxNQUFNLFlBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFBLEVBQU0sSUFBSSxDQUFDLEtBQUssR0FDbEQsZUFBZSxDQUNULENBQ1YsQ0FBQzthQUNIO0FBRUQsWUFBQSxRQUNFQSxzQkFBQSxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQTtnQkFDRyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzNCLGVBQWUsQ0FDWixFQUNOO1NBQ0g7UUFFRCxRQUNFQSxxQ0FBQzJFLGlCQUFlLEVBQUFuRyxPQUFBLENBQUEsRUFBQSxFQUNWLElBQUksQ0FBQyxLQUFLLEVBQ2QsRUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQ3JDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFDbEMsZUFBZSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUM1QyxlQUFlLEVBQUUsUUFBUSxFQUN6QixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUNyQyxDQUFBLENBQUEsRUFDRjtLQUNILENBQUE7SUFDSCxPQUFDLFVBQUEsQ0FBQTtBQUFELENBL3NDQSxDQUF3QzZFLGVBQVMsQ0Erc0NoRCxFQUFBO0FBRUQsSUFBTSwwQkFBMEIsR0FBRyxPQUFPLENBQUM7QUFDM0MsSUFBTSw2QkFBNkIsR0FBRyxVQUFVOzs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
