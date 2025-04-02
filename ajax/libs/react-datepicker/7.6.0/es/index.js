/*!
  react-datepicker v7.6.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
import { clsx } from 'clsx';
import React, { useRef, useCallback, useEffect, cloneElement, Component, createRef, createElement } from 'react';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns/addDays';
import { addHours } from 'date-fns/addHours';
import { addMinutes } from 'date-fns/addMinutes';
import { addMonths } from 'date-fns/addMonths';
import { addQuarters } from 'date-fns/addQuarters';
import { addSeconds } from 'date-fns/addSeconds';
import { addWeeks } from 'date-fns/addWeeks';
import { addYears } from 'date-fns/addYears';
import { differenceInCalendarDays } from 'date-fns/differenceInCalendarDays';
import { differenceInCalendarMonths } from 'date-fns/differenceInCalendarMonths';
import { differenceInCalendarQuarters } from 'date-fns/differenceInCalendarQuarters';
import { differenceInCalendarYears } from 'date-fns/differenceInCalendarYears';
import { endOfDay } from 'date-fns/endOfDay';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfWeek } from 'date-fns/endOfWeek';
import { endOfYear } from 'date-fns/endOfYear';
import { longFormatters, format } from 'date-fns/format';
import { getDate } from 'date-fns/getDate';
import { getDay } from 'date-fns/getDay';
import { getHours } from 'date-fns/getHours';
import { getISOWeek } from 'date-fns/getISOWeek';
import { getMinutes } from 'date-fns/getMinutes';
import { getMonth } from 'date-fns/getMonth';
import { getQuarter } from 'date-fns/getQuarter';
import { getSeconds } from 'date-fns/getSeconds';
import { getTime } from 'date-fns/getTime';
import { getYear } from 'date-fns/getYear';
import { isAfter } from 'date-fns/isAfter';
import { isBefore } from 'date-fns/isBefore';
import { isDate } from 'date-fns/isDate';
import { isEqual as isEqual$1 } from 'date-fns/isEqual';
import { isSameDay as isSameDay$1 } from 'date-fns/isSameDay';
import { isSameMonth as isSameMonth$1 } from 'date-fns/isSameMonth';
import { isSameQuarter as isSameQuarter$1 } from 'date-fns/isSameQuarter';
import { isSameYear as isSameYear$1 } from 'date-fns/isSameYear';
import { isValid as isValid$1 } from 'date-fns/isValid';
import { isWithinInterval } from 'date-fns/isWithinInterval';
import { max } from 'date-fns/max';
import { min } from 'date-fns/min';
import { parse } from 'date-fns/parse';
import { parseISO } from 'date-fns/parseISO';
import { set } from 'date-fns/set';
import { setHours } from 'date-fns/setHours';
import { setMinutes } from 'date-fns/setMinutes';
import { setMonth } from 'date-fns/setMonth';
import { setQuarter } from 'date-fns/setQuarter';
import { setSeconds } from 'date-fns/setSeconds';
import { setYear } from 'date-fns/setYear';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfQuarter } from 'date-fns/startOfQuarter';
import { startOfWeek } from 'date-fns/startOfWeek';
import { startOfYear } from 'date-fns/startOfYear';
import { subDays } from 'date-fns/subDays';
import { subMonths } from 'date-fns/subMonths';
import { subQuarters } from 'date-fns/subQuarters';
import { subWeeks } from 'date-fns/subWeeks';
import { subYears } from 'date-fns/subYears';
import { toDate } from 'date-fns/toDate';
import { useFloating, autoUpdate, flip, offset, arrow, FloatingArrow } from '@floating-ui/react';
import ReactDOM from 'react-dom';

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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

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
    return (React.createElement("div", { className: className, role: "dialog", "aria-label": ariaLabel, "aria-modal": "true" }, children));
};

var useDetectClickOutside = function (onClickOutside, ignoreClass) {
    var ref = useRef(null);
    var onClickOutsideRef = useRef(onClickOutside);
    onClickOutsideRef.current = onClickOutside;
    var handleClickOutside = useCallback(function (event) {
        var _a;
        if (ref.current && !ref.current.contains(event.target)) {
            if (!(ignoreClass &&
                event.target instanceof HTMLElement &&
                event.target.classList.contains(ignoreClass))) {
                (_a = onClickOutsideRef.current) === null || _a === void 0 ? void 0 : _a.call(onClickOutsideRef, event);
            }
        }
    }, [ignoreClass]);
    useEffect(function () {
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);
    return ref;
};
var ClickOutsideWrapper = function (_a) {
    var children = _a.children, onClickOutside = _a.onClickOutside, className = _a.className, containerRef = _a.containerRef, style = _a.style, ignoreClass = _a.ignoreClass;
    var detectRef = useDetectClickOutside(onClickOutside, ignoreClass);
    return (React.createElement("div", { className: className, style: style, ref: function (node) {
            detectRef.current = node;
            if (containerRef) {
                containerRef.current = node;
            }
        } }, children));
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
    var d = typeof value === "string" ? parseISO(value) : toDate(value);
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
            var tryParseDate = parse(value, df, new Date(), {
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
    parsedDate = parse(value, dateFormat, new Date(), {
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
                var longFormatter = longFormatters[firstCharacter];
                return localeObject
                    ? longFormatter(substring, localeObject.formatLong)
                    : firstCharacter;
            }
            return substring;
        })
            .join("");
        if (value.length > 0) {
            parsedDate = parse(value, format_1.slice(0, value.length), new Date(), {
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
    return isValid$1(date) && !isBefore(date, minDate !== null && minDate !== void 0 ? minDate : new Date("1/1/1800"));
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
        return format(date, formatStr, {
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
    return format(date, formatStr, {
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
    return setHours(setMinutes(setSeconds(date, second), minute), hour);
}
/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
function getWeek(date) {
    return getISOWeek(date);
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
    return startOfDay(date);
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
    return startOfWeek(date, {
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
    return startOfMonth(date);
}
/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
function getStartOfYear(date) {
    return startOfYear(date);
}
/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
function getStartOfQuarter(date) {
    return startOfQuarter(date);
}
/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
function getStartOfToday() {
    return startOfDay(newDate());
}
// *** End of ***
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
function getEndOfDay(date) {
    return endOfDay(date);
}
/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
function getEndOfWeek(date) {
    return endOfWeek(date);
}
/**
 * Gets the end of the month for a given date.
 *
 * @param date - The date.
 * @returns - The end of the month.
 */
function getEndOfMonth(date) {
    return endOfMonth(date);
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
        return isSameYear$1(date1, date2);
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
        return isSameMonth$1(date1, date2);
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
        return isSameQuarter$1(date1, date2);
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
        return isSameDay$1(date1, date2);
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
        return isEqual$1(date1, date2);
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
    var start = startOfDay(startDate);
    var end = endOfDay(endDate);
    try {
        valid = isWithinInterval(day, { start: start, end: end });
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
    return formatDate(setMonth(newDate(), month), "LLLL", locale);
}
/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
function getMonthShortInLocale(month, locale) {
    return formatDate(setMonth(newDate(), month), "LLL", locale);
}
/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
function getQuarterShortInLocale(quarter, locale) {
    return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
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
                if (excludeDate instanceof Date) {
                    return isSameDay(day, excludeDate);
                }
                else {
                    return isSameDay(day, excludeDate.date);
                }
            })) ||
        (excludeDateIntervals &&
            excludeDateIntervals.some(function (_a) {
                var start = _a.start, end = _a.end;
                return isWithinInterval(day, { start: start, end: end });
            })) ||
        (includeDates &&
            !includeDates.some(function (includeDate) { return isSameDay(day, includeDate); })) ||
        (includeDateIntervals &&
            !includeDateIntervals.some(function (_a) {
                var start = _a.start, end = _a.end;
                return isWithinInterval(day, { start: start, end: end });
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
            return isWithinInterval(day, { start: start, end: end });
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
        minDate: minDate ? startOfMonth(minDate) : undefined,
        maxDate: maxDate ? endOfMonth(maxDate) : undefined,
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
    var startDateYear = getYear(startDate);
    var startDateMonth = getMonth(startDate);
    var endDateYear = getYear(endDate);
    var endDateMonth = getMonth(endDate);
    var dayYear = getYear(day);
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
    if (!isValid$1(start) || !isValid$1(end))
        return false;
    var startYear = getYear(start);
    var endYear = getYear(end);
    return startYear <= year && endYear >= year;
}
function isYearDisabled(year, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
    var date = new Date(year, 0, 1);
    return (isOutOfBounds(date, {
        minDate: minDate ? startOfYear(minDate) : undefined,
        maxDate: maxDate ? endOfYear(maxDate) : undefined,
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
    var startDateYear = getYear(startDate);
    var startDateQuarter = getQuarter(startDate);
    var endDateYear = getYear(endDate);
    var endDateQuarter = getQuarter(endDate);
    var dayYear = getYear(day);
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
    return ((_b = ((minDate && differenceInCalendarDays(day, minDate) < 0) ||
        (maxDate && differenceInCalendarDays(day, maxDate) > 0))) !== null && _b !== void 0 ? _b : false);
}
function isTimeInList(time, times) {
    return times.some(function (listTime) {
        return getHours(listTime) === getHours(time) &&
            getMinutes(listTime) === getMinutes(time) &&
            getSeconds(listTime) === getSeconds(time);
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
    baseTime = setHours(baseTime, getHours(time));
    baseTime = setMinutes(baseTime, getMinutes(time));
    baseTime = setSeconds(baseTime, getSeconds(time));
    var min = newDate();
    min = setHours(min, getHours(minTime));
    min = setMinutes(min, getMinutes(minTime));
    min = setSeconds(min, getSeconds(minTime));
    var max = newDate();
    max = setHours(max, getHours(maxTime));
    max = setMinutes(max, getMinutes(maxTime));
    max = setSeconds(max, getSeconds(maxTime));
    var valid;
    try {
        valid = !isWithinInterval(baseTime, { start: min, end: max });
    }
    catch (err) {
        valid = false;
    }
    return valid;
}
function monthDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var previousMonth = subMonths(day, 1);
    return ((minDate && differenceInCalendarMonths(minDate, previousMonth) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarMonths(includeDate, previousMonth) > 0;
            })) ||
        false);
}
function monthDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var nextMonth = addMonths(day, 1);
    return ((maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) { return differenceInCalendarMonths(nextMonth, includeDate) > 0; })) ||
        false);
}
function quarterDisabledBefore(date, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var firstDateOfYear = startOfYear(date);
    var previousQuarter = subQuarters(firstDateOfYear, 1);
    return ((minDate && differenceInCalendarQuarters(minDate, previousQuarter) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
            })) ||
        false);
}
function quarterDisabledAfter(date, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var lastDateOfYear = endOfYear(date);
    var nextQuarter = addQuarters(lastDateOfYear, 1);
    return ((maxDate && differenceInCalendarQuarters(nextQuarter, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
            })) ||
        false);
}
function yearDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var previousYear = subYears(day, 1);
    return ((minDate && differenceInCalendarYears(minDate, previousYear) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return differenceInCalendarYears(includeDate, previousYear) > 0;
            })) ||
        false);
}
function yearsDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
    var previousYear = getStartOfYear(subYears(day, yearItemNumber));
    var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
    var minDateYear = minDate && getYear(minDate);
    return (minDateYear && minDateYear > endPeriod) || false;
}
function yearDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var nextYear = addYears(day, 1);
    return ((maxDate && differenceInCalendarYears(nextYear, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) { return differenceInCalendarYears(nextYear, includeDate) > 0; })) ||
        false);
}
function yearsDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
    var nextYear = addYears(day, yearItemNumber);
    var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
    var maxDateYear = maxDate && getYear(maxDate);
    return (maxDateYear && maxDateYear < startPeriod) || false;
}
function getEffectiveMinDate(_a) {
    var minDate = _a.minDate, includeDates = _a.includeDates;
    if (includeDates && minDate) {
        var minDates = includeDates.filter(function (includeDate) { return differenceInCalendarDays(includeDate, minDate) >= 0; });
        return min(minDates);
    }
    else if (includeDates) {
        return min(includeDates);
    }
    else {
        return minDate;
    }
}
function getEffectiveMaxDate(_a) {
    var maxDate = _a.maxDate, includeDates = _a.includeDates;
    if (includeDates && maxDate) {
        var maxDates = includeDates.filter(function (includeDate) { return differenceInCalendarDays(includeDate, maxDate) <= 0; });
        return max(maxDates);
    }
    else if (includeDates) {
        return max(includeDates);
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
        if (isDate(obj)) {
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
        if (!isDate(dateObj)) {
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
            injectedTime = addHours(injectedTime, getHours(injectedTimeValue));
            injectedTime = addMinutes(injectedTime, getMinutes(injectedTimeValue));
            injectedTime = addSeconds(injectedTime, getSeconds(injectedTimeValue));
        }
        var nextTime = addMinutes(startOfDay, (currentMultiplier + 1) * intervals);
        if (isAfter(injectedTime, currentTime) &&
            isBefore(injectedTime, nextTime) &&
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
    var endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
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
    return toDate(d.getTime() - seconds * 1000 - milliseconds);
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
    if (!isDate(date)) {
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
    if (!isDate(date) || !isDate(dateToCompare)) {
        throw new Error("Invalid date received");
    }
    var midnightDate = getMidnightDate(date);
    var midnightDateToCompare = getMidnightDate(dateToCompare);
    return isBefore(midnightDate, midnightDateToCompare);
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
        _this.inputRef = React.createRef();
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
                return cloneElement(customTimeInput, {
                    date: date,
                    value: time,
                    onChange: _this.onTimeChange,
                });
            }
            return (React.createElement("input", { type: "time", className: "react-datepicker-time__input", placeholder: "Time", name: "time-input", ref: _this.inputRef, onClick: function () {
                    var _a;
                    (_a = _this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                }, required: true, value: time, onChange: function (event) {
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
        return (React.createElement("div", { className: "react-datepicker__input-time-container" },
            React.createElement("div", { className: "react-datepicker-time__caption" }, this.props.timeInputLabel),
            React.createElement("div", { className: "react-datepicker-time__input-container" },
                React.createElement("div", { className: "react-datepicker-time__input" }, this.renderTimeInput()))));
    };
    return InputTime;
}(Component));

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
        _this.dayEl = createRef();
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
            var isDisabled = _this.props.preSelection && _this.isDisabled(_this.props.preSelection);
            return (!isSelectedDate &&
                _this.isSameDayOrWeek(_this.props.preSelection) &&
                !isDisabled);
        };
        _this.isDisabled = function (day) {
            if (day === void 0) { day = _this.props.day; }
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
                (isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))) {
                return isDayInRange(day, selectingDate, endDate);
            }
            if (selectsEnd &&
                startDate &&
                (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
                return isDayInRange(day, startDate, selectingDate);
            }
            if (selectsRange &&
                startDate &&
                !endDate &&
                (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
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
            var weekday = getDay(_this.props.day);
            return weekday === 0 || weekday === 6;
        };
        _this.isAfterMonth = function () {
            return (_this.props.month !== undefined &&
                (_this.props.month + 1) % 12 === getMonth(_this.props.day));
        };
        _this.isBeforeMonth = function () {
            return (_this.props.month !== undefined &&
                (getMonth(_this.props.day) + 1) % 12 === _this.props.month);
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
            return clsx("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
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
                ? _this.props.renderDayContents(getDate(_this.props.day), _this.props.day)
                : getDate(_this.props.day);
        };
        _this.render = function () { return (
        // TODO: Use <option> instead of the "option" role to ensure accessibility across all devices.
        React.createElement("div", { ref: _this.dayEl, className: _this.getClassNames(_this.props.day), onKeyDown: _this.handleOnKeyDown, onClick: _this.handleClick, onMouseEnter: !_this.props.usePointerEvent ? _this.handleMouseEnter : undefined, onPointerEnter: _this.props.usePointerEvent ? _this.handleMouseEnter : undefined, tabIndex: _this.getTabIndex(), "aria-label": _this.getAriaLabel(), role: "option", title: _this.getTitle(), "aria-disabled": _this.isDisabled(), "aria-current": _this.isCurrentDay() ? "date" : undefined, "aria-selected": _this.isSelected() || _this.isInRange() },
            _this.renderDayContents(),
            _this.getTitle() !== "" && (React.createElement("span", { className: "overlay" }, _this.getTitle())))); };
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
}(Component));

var WeekNumber = /** @class */ (function (_super) {
    __extends(WeekNumber, _super);
    function WeekNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.weekNumberEl = createRef();
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
        var _a = this.props, weekNumber = _a.weekNumber, isWeekDisabled = _a.isWeekDisabled, _b = _a.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? WeekNumber.defaultProps.ariaLabelPrefix : _b, onClick = _a.onClick;
        var weekNumberClasses = {
            "react-datepicker__week-number": true,
            "react-datepicker__week-number--clickable": !!onClick && !isWeekDisabled,
            "react-datepicker__week-number--selected": !!onClick && isSameDay(this.props.date, this.props.selected),
        };
        return (React.createElement("div", { ref: this.weekNumberEl, className: clsx(weekNumberClasses), "aria-label": "".concat(ariaLabelPrefix, " ").concat(this.props.weekNumber), onClick: this.handleClick, onKeyDown: this.handleOnKeyDown, tabIndex: this.getTabIndex() }, weekNumber));
    };
    return WeekNumber;
}(Component));

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
        _this.isWeekDisabled = function () {
            var startOfWeek = _this.startOfWeek();
            var endOfWeek = addDays(startOfWeek, 6);
            var processingDate = new Date(startOfWeek);
            while (processingDate <= endOfWeek) {
                if (!_this.isDisabled(processingDate))
                    return false;
                processingDate = addDays(processingDate, 1);
            }
            return true;
        };
        _this.renderDays = function () {
            var startOfWeek = _this.startOfWeek();
            var days = [];
            var weekNumber = _this.formatWeekNumber(startOfWeek);
            if (_this.props.showWeekNumber) {
                var onClickAction = _this.props.onWeekSelect || _this.props.showWeekPicker
                    ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber)
                    : undefined;
                days.push(React.createElement(WeekNumber, _assign({ key: "W" }, Week.defaultProps, _this.props, { weekNumber: weekNumber, isWeekDisabled: _this.isWeekDisabled(), date: startOfWeek, onClick: onClickAction })));
            }
            return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
                var day = addDays(startOfWeek, offset);
                return (React.createElement(Day, _assign({}, Week.defaultProps, _this.props, { ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix, ariaLabelPrefixWhenDisabled: _this.props.disabledDayAriaLabelPrefix, key: day.valueOf(), day: day, onClick: _this.handleDayClick.bind(_this, day), onMouseEnter: _this.handleDayMouseEnter.bind(_this, day) })));
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
        return React.createElement("div", { className: clsx(weekNumberClasses) }, this.renderDays());
    };
    return Week;
}(Component));

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
        _this.MONTH_REFS = __spreadArray([], Array(12), true).map(function () { return createRef(); });
        _this.QUARTER_REFS = __spreadArray([], Array(4), true).map(function () { return createRef(); });
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
            return isSameMonth(setMonth(day, m), startDate);
        };
        _this.isRangeStartQuarter = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameQuarter(setQuarter(day, q), startDate);
        };
        _this.isRangeEndMonth = function (m) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameMonth(setMonth(day, m), endDate);
        };
        _this.isRangeEndQuarter = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameQuarter(setQuarter(day, q), endDate);
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
            var _month = setMonth(day, m);
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
            var _month = setMonth(day, m);
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
            var endOfWeek = addDays(startOfWeek, 6);
            return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
        };
        _this.isCurrentMonth = function (day, m) {
            return getYear(day) === getYear(newDate()) && m === getMonth(newDate());
        };
        _this.isCurrentQuarter = function (day, q) {
            return getYear(day) === getYear(newDate()) && q === getQuarter(newDate());
        };
        _this.isSelectedMonth = function (day, m, selected) {
            return getMonth(selected) === m && getYear(day) === getYear(selected);
        };
        _this.isSelectMonthInList = function (day, m, selectedDates) {
            return selectedDates.some(function (selectedDate) {
                return _this.isSelectedMonth(day, m, selectedDate);
            });
        };
        _this.isSelectedQuarter = function (day, q, selected) {
            return getQuarter(day) === q && getYear(day) === getYear(selected);
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
                weeks.push(React.createElement(Week, _assign({}, _this.props, { ariaLabelPrefix: _this.props.weekAriaLabelPrefix, key: i, day: currentWeekStart, month: getMonth(_this.props.day), onDayClick: _this.handleDayClick, onDayMouseEnter: _this.handleDayMouseEnter, selected: selected, preSelection: preSelection, showWeekNumber: _this.props.showWeekNumbers })));
                if (breakAfterNextPush)
                    break;
                i++;
                currentWeekStart = addWeeks(currentWeekStart, 1);
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
                        newCalculatedDate = addMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
                        newCalculatedMonth =
                            month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
                        break;
                    case KeyType.ArrowLeft:
                        newCalculatedDate = subMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
                        newCalculatedMonth =
                            month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
                        break;
                    case KeyType.ArrowUp:
                        newCalculatedDate = subMonths(date, verticalOffset);
                        newCalculatedMonth = ((_a = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[0]) === null || _a === void 0 ? void 0 : _a.includes(month))
                            ? month + 12 - verticalOffset
                            : month - verticalOffset;
                        break;
                    case KeyType.ArrowDown:
                        newCalculatedDate = addMonths(date, verticalOffset);
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
            var labelDate = setQuarter(_this.props.day, q);
            if (isQuarterDisabled(labelDate, _this.props)) {
                return;
            }
            _this.handleDayClick(getStartOfQuarter(labelDate), event);
        };
        _this.onQuarterMouseEnter = function (q) {
            var labelDate = setQuarter(_this.props.day, q);
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
                        _this.handleQuarterNavigation(quarter === 4 ? 1 : quarter + 1, addQuarters(_this.props.preSelection, 1));
                        break;
                    case KeyType.ArrowLeft:
                        if (!_this.props.preSelection) {
                            break;
                        }
                        _this.handleQuarterNavigation(quarter === 1 ? 4 : quarter - 1, subQuarters(_this.props.preSelection, 1));
                        break;
                }
            }
        };
        _this.isMonthDisabledForLabelDate = function (month) {
            var _a;
            var _b = _this.props, day = _b.day, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
            var labelDate = setMonth(day, month);
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
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate, preSelection = _a.preSelection, monthClassName = _a.monthClassName;
            var _monthClassName = monthClassName
                ? monthClassName(setMonth(day, m))
                : undefined;
            var selection = _this.getSelection();
            return clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
                "react-datepicker__month-text--disabled": _this.isMonthDisabled(m),
                "react-datepicker__month-text--selected": selection
                    ? _this.isSelectMonthInList(day, m, selection)
                    : undefined,
                "react-datepicker__month-text--keyboard-selected": !_this.props.disabledKeyboardNavigation &&
                    preSelection &&
                    _this.isSelectedMonth(day, m, preSelection) &&
                    !_this.isMonthDisabled(m),
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
            var preSelectedMonth = getMonth(_this.props.preSelection);
            var isPreSelectedMonthDisabled = _this.isMonthDisabledForLabelDate(preSelectedMonth).isDisabled;
            var tabIndex = m === preSelectedMonth &&
                !(isPreSelectedMonthDisabled || _this.props.disabledKeyboardNavigation)
                ? "0"
                : "-1";
            return tabIndex;
        };
        _this.getQuarterTabIndex = function (q) {
            if (_this.props.preSelection == null) {
                return "-1";
            }
            var preSelectedQuarter = getQuarter(_this.props.preSelection);
            var isCurrentQuarterDisabled = isQuarterDisabled(_this.props.day, _this.props);
            var tabIndex = q === preSelectedQuarter &&
                !(isCurrentQuarterDisabled || _this.props.disabledKeyboardNavigation)
                ? "0"
                : "-1";
            return tabIndex;
        };
        _this.getAriaLabel = function (month) {
            var _a = _this.props, _b = _a.chooseDayAriaLabelPrefix, chooseDayAriaLabelPrefix = _b === void 0 ? "Choose" : _b, _c = _a.disabledDayAriaLabelPrefix, disabledDayAriaLabelPrefix = _c === void 0 ? "Not available" : _c, day = _a.day, locale = _a.locale;
            var labelDate = setMonth(day, month);
            var prefix = _this.isDisabled(labelDate) || _this.isExcluded(labelDate)
                ? disabledDayAriaLabelPrefix
                : chooseDayAriaLabelPrefix;
            return "".concat(prefix, " ").concat(formatDate(labelDate, "MMMM yyyy", locale));
        };
        _this.getQuarterClassNames = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate, selected = _a.selected, minDate = _a.minDate, maxDate = _a.maxDate, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate, preSelection = _a.preSelection, disabledKeyboardNavigation = _a.disabledKeyboardNavigation;
            var isDisabled = (minDate || maxDate || excludeDates || includeDates || filterDate) &&
                isQuarterDisabled(setQuarter(day, q), _this.props);
            return clsx("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
                "react-datepicker__quarter-text--disabled": isDisabled,
                "react-datepicker__quarter-text--selected": selected
                    ? _this.isSelectedQuarter(day, q, selected)
                    : undefined,
                "react-datepicker__quarter-text--keyboard-selected": !disabledKeyboardNavigation &&
                    preSelection &&
                    _this.isSelectedQuarter(day, q, preSelection) &&
                    !isDisabled,
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
            return monthColumns === null || monthColumns === void 0 ? void 0 : monthColumns.map(function (month, i) { return (React.createElement("div", { className: "react-datepicker__month-wrapper", key: i }, month.map(function (m, j) { return (React.createElement("div", { ref: _this.MONTH_REFS[m], key: j, onClick: function (event) {
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
            return (React.createElement("div", { className: "react-datepicker__quarter-wrapper" }, quarters.map(function (q, j) { return (React.createElement("div", { key: j, ref: _this.QUARTER_REFS[j], role: "option", onClick: function (event) {
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
            return clsx("react-datepicker__month", {
                "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd),
            }, { "react-datepicker__monthPicker": showMonthYearPicker }, { "react-datepicker__quarterPicker": showQuarterYearPicker }, { "react-datepicker__weekPicker": showWeekPicker });
        };
        return _this;
    }
    Month.prototype.getSelection = function () {
        var _a = this.props, selected = _a.selected, selectedDates = _a.selectedDates, selectsMultiple = _a.selectsMultiple;
        if (selectsMultiple) {
            return selectedDates;
        }
        if (selected) {
            return [selected];
        }
        return undefined;
    };
    Month.prototype.render = function () {
        var _a = this.props, showMonthYearPicker = _a.showMonthYearPicker, showQuarterYearPicker = _a.showQuarterYearPicker, day = _a.day, _b = _a.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? "Month " : _b;
        var formattedAriaLabelPrefix = ariaLabelPrefix
            ? ariaLabelPrefix.trim() + " "
            : "";
        return (React.createElement("div", { className: this.getClassNames(), onMouseLeave: !this.props.usePointerEvent ? this.handleMouseLeave : undefined, onPointerLeave: this.props.usePointerEvent ? this.handleMouseLeave : undefined, "aria-label": "".concat(formattedAriaLabelPrefix).concat(formatDate(day, "MMMM, yyyy", this.props.locale)), role: "listbox" }, showMonthYearPicker
            ? this.renderMonths()
            : showQuarterYearPicker
                ? this.renderQuarters()
                : this.renderWeeks()));
    };
    return Month;
}(Component));

var MonthDropdownOptions = /** @class */ (function (_super) {
    __extends(MonthDropdownOptions, _super);
    function MonthDropdownOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSelectedMonth = function (i) { return _this.props.month === i; };
        _this.renderOptions = function () {
            return _this.props.monthNames.map(function (month, i) { return (React.createElement("div", { className: _this.isSelectedMonth(i)
                    ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
                    : "react-datepicker__month-option", key: month, onClick: _this.onChange.bind(_this, i), "aria-selected": _this.isSelectedMonth(i) ? "true" : undefined },
                _this.isSelectedMonth(i) ? (React.createElement("span", { className: "react-datepicker__month-option--selected" }, "\u2713")) : (""),
                month)); });
        };
        _this.onChange = function (month) { return _this.props.onChange(month); };
        _this.handleClickOutside = function () { return _this.props.onCancel(); };
        return _this;
    }
    MonthDropdownOptions.prototype.render = function () {
        return (React.createElement(ClickOutsideWrapper, { className: "react-datepicker__month-dropdown", onClickOutside: this.handleClickOutside }, this.renderOptions()));
    };
    return MonthDropdownOptions;
}(Component));

var MonthDropdown = /** @class */ (function (_super) {
    __extends(MonthDropdown, _super);
    function MonthDropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownVisible: false,
        };
        _this.renderSelectOptions = function (monthNames) {
            return monthNames.map(function (m, i) { return (React.createElement("option", { key: m, value: i }, m)); });
        };
        _this.renderSelectMode = function (monthNames) { return (React.createElement("select", { value: _this.props.month, className: "react-datepicker__month-select", onChange: function (e) { return _this.onChange(parseInt(e.target.value)); } }, _this.renderSelectOptions(monthNames))); };
        _this.renderReadView = function (visible, monthNames) { return (React.createElement("div", { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-read-view", onClick: _this.toggleDropdown },
            React.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }),
            React.createElement("span", { className: "react-datepicker__month-read-view--selected-month" }, monthNames[_this.props.month]))); };
        _this.renderDropdown = function (monthNames) { return (React.createElement(MonthDropdownOptions, _assign({ key: "dropdown" }, _this.props, { monthNames: monthNames, onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
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
        return (React.createElement("div", { className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown));
    };
    return MonthDropdown;
}(Component));

function generateMonthYears(minDate, maxDate) {
    var list = [];
    var currDate = getStartOfMonth(minDate);
    var lastDate = getStartOfMonth(maxDate);
    while (!isAfter(currDate, lastDate)) {
        list.push(newDate(currDate));
        currDate = addMonths(currDate, 1);
    }
    return list;
}
var MonthYearDropdownOptions = /** @class */ (function (_super) {
    __extends(MonthYearDropdownOptions, _super);
    function MonthYearDropdownOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.renderOptions = function () {
            return _this.state.monthYearsList.map(function (monthYear) {
                var monthYearPoint = getTime(monthYear);
                var isSameMonthYear = isSameYear(_this.props.date, monthYear) &&
                    isSameMonth(_this.props.date, monthYear);
                return (React.createElement("div", { className: isSameMonthYear
                        ? "react-datepicker__month-year-option--selected_month-year"
                        : "react-datepicker__month-year-option", key: monthYearPoint, onClick: _this.onChange.bind(_this, monthYearPoint), "aria-selected": isSameMonthYear ? "true" : undefined },
                    isSameMonthYear ? (React.createElement("span", { className: "react-datepicker__month-year-option--selected" }, "\u2713")) : (""),
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
        var dropdownClass = clsx({
            "react-datepicker__month-year-dropdown": true,
            "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown,
        });
        return (React.createElement(ClickOutsideWrapper, { className: dropdownClass, onClickOutside: this.handleClickOutside }, this.renderOptions()));
    };
    return MonthYearDropdownOptions;
}(Component));

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
            while (!isAfter(currDate, lastDate)) {
                var timePoint = getTime(currDate);
                options.push(React.createElement("option", { key: timePoint, value: timePoint }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
                currDate = addMonths(currDate, 1);
            }
            return options;
        };
        _this.onSelectChange = function (event) {
            _this.onChange(parseInt(event.target.value));
        };
        _this.renderSelectMode = function () { return (React.createElement("select", { value: getTime(getStartOfMonth(_this.props.date)), className: "react-datepicker__month-year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions())); };
        _this.renderReadView = function (visible) {
            var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
            return (React.createElement("div", { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-year-read-view", onClick: _this.toggleDropdown },
                React.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }),
                React.createElement("span", { className: "react-datepicker__month-year-read-view--selected-month-year" }, yearMonth)));
        };
        _this.renderDropdown = function () { return (React.createElement(MonthYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
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
        return (React.createElement("div", { className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown));
    };
    return MonthYearDropdown;
}(Component));

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
                (getHours(time) * 3600 + getMinutes(time) * 60 + getSeconds(time)) %
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
            var format = typeof _this.props.format === "string" ? _this.props.format : "p";
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
                var currentTime = addMinutes(base, i * intervals);
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
                return (React.createElement("li", { key: time.valueOf(), onClick: _this.handleClick.bind(_this, time), className: _this.liClasses(time), ref: function (li) {
                        if (time === timeToFocus) {
                            _this.centerLi = li;
                        }
                    }, onKeyDown: function (event) {
                        _this.handleOnKeyDown(event, time);
                    }, tabIndex: time === timeToFocus ? 0 : -1, role: "option", "aria-selected": _this.isSelectedTime(time) ? "true" : undefined, "aria-disabled": _this.isDisabledTime(time) ? "true" : undefined }, formatDate(time, format, _this.props.locale)));
            });
        };
        _this.renderTimeCaption = function () {
            if (_this.props.showTimeCaption === false) {
                return React.createElement(React.Fragment, null);
            }
            return (React.createElement("div", { className: "react-datepicker__header react-datepicker__header--time ".concat(_this.props.showTimeSelectOnly
                    ? "react-datepicker__header--time--only"
                    : ""), ref: function (header) {
                    _this.header = header;
                } },
                React.createElement("div", { className: "react-datepicker-time__header" }, _this.props.timeCaption)));
        };
        return _this;
    }
    Object.defineProperty(Time, "defaultProps", {
        get: function () {
            return {
                intervals: 30,
                todayButton: null,
                timeCaption: "Time",
                showTimeCaption: true,
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
        return (React.createElement("div", { className: "react-datepicker__time-container ".concat(((_a = this.props.todayButton) !== null && _a !== void 0 ? _a : Time.defaultProps.todayButton)
                ? "react-datepicker__time-container--with-today-button"
                : "") },
            this.renderTimeCaption(),
            React.createElement("div", { className: "react-datepicker__time" },
                React.createElement("div", { className: "react-datepicker__time-box" },
                    React.createElement("ul", { className: "react-datepicker__time-list", ref: function (list) {
                            _this.list = list;
                        }, style: height ? { height: height } : {}, role: "listbox", "aria-label": this.props.timeCaption }, this.renderTimes())))));
    };
    Time.calcCenterPosition = function (listHeight, centerLiRef) {
        return (centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2));
    };
    return Time;
}(Component));

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
            return createRef();
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
        _this.isCurrentYear = function (y) { return y === getYear(newDate()); };
        _this.isRangeStart = function (y) {
            return _this.props.startDate &&
                _this.props.endDate &&
                isSameYear(setYear(newDate(), y), _this.props.startDate);
        };
        _this.isRangeEnd = function (y) {
            return _this.props.startDate &&
                _this.props.endDate &&
                isSameYear(setYear(newDate(), y), _this.props.endDate);
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
            var _year = setYear(newDate(), y);
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
            var _year = setYear(newDate(), y);
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
            var _a = _this.props, minDate = _a.minDate, maxDate = _a.maxDate, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate;
            var date = getStartOfYear(setYear(_this.props.date, y));
            var isDisabled = (minDate || maxDate || excludeDates || includeDates || filterDate) &&
                isYearDisabled(y, _this.props);
            return (!_this.props.disabledKeyboardNavigation &&
                !_this.props.inline &&
                !isSameDay(date, getStartOfYear(_this.props.selected)) &&
                isSameDay(date, getStartOfYear(_this.props.preSelection)) &&
                !isDisabled);
        };
        _this.onYearClick = function (event, y) {
            var date = _this.props.date;
            if (date === undefined) {
                return;
            }
            _this.handleYearClick(getStartOfYear(setYear(date, y)), event);
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
                        _this.handleYearNavigation(y + 1, addYears(_this.props.preSelection, 1));
                        break;
                    case KeyType.ArrowLeft:
                        if (_this.props.preSelection == null) {
                            break;
                        }
                        _this.handleYearNavigation(y - 1, subYears(_this.props.preSelection, 1));
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
                        _this.handleYearNavigation(newYear, subYears(_this.props.preSelection, offset));
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
                        _this.handleYearNavigation(newYear, addYears(_this.props.preSelection, offset));
                        break;
                    }
                }
            }
            handleOnKeyDown && handleOnKeyDown(event);
        };
        _this.getYearClassNames = function (y) {
            var _a = _this.props, date = _a.date, minDate = _a.minDate, maxDate = _a.maxDate, selected = _a.selected, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate, yearClassName = _a.yearClassName;
            return clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), date ? yearClassName === null || yearClassName === void 0 ? void 0 : yearClassName(setYear(date, y)) : undefined, {
                "react-datepicker__year-text--selected": selected
                    ? y === getYear(selected)
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
            var preSelected = getYear(_this.props.preSelection);
            var isPreSelectedYearDisabled = isYearDisabled(y, _this.props);
            return y === preSelected && !isPreSelectedYearDisabled ? "0" : "-1";
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
            yearsList.push(React.createElement("div", { ref: this_1.YEAR_REFS[y - startPeriod], onClick: function (event) {
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
        return (React.createElement("div", { className: "react-datepicker__year" },
            React.createElement("div", { className: "react-datepicker__year-wrapper", onMouseLeave: !this.props.usePointerEvent
                    ? this.props.clearSelectingDate
                    : undefined, onPointerLeave: this.props.usePointerEvent
                    ? this.props.clearSelectingDate
                    : undefined }, yearsList)));
    };
    return Year;
}(Component));

function generateYears(year, noOfYear, minDate, maxDate) {
    var list = [];
    for (var i = 0; i < 2 * noOfYear + 1; i++) {
        var newYear = year + noOfYear - i;
        var isInRange = true;
        if (minDate) {
            isInRange = getYear(minDate) <= newYear;
        }
        if (maxDate && isInRange) {
            isInRange = getYear(maxDate) >= newYear;
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
            var options = _this.state.yearsList.map(function (year) { return (React.createElement("div", { className: selectedYear === year
                    ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                    : "react-datepicker__year-option", key: year, onClick: _this.onChange.bind(_this, year), "aria-selected": selectedYear === year ? "true" : undefined },
                selectedYear === year ? (React.createElement("span", { className: "react-datepicker__year-option--selected" }, "\u2713")) : (""),
                year)); });
            var minYear = _this.props.minDate ? getYear(_this.props.minDate) : null;
            var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : null;
            if (!maxYear || !_this.state.yearsList.find(function (year) { return year === maxYear; })) {
                options.unshift(React.createElement("div", { className: "react-datepicker__year-option", key: "upcoming", onClick: _this.incrementYears },
                    React.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" })));
            }
            if (!minYear || !_this.state.yearsList.find(function (year) { return year === minYear; })) {
                options.push(React.createElement("div", { className: "react-datepicker__year-option", key: "previous", onClick: _this.decrementYears },
                    React.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" })));
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
        _this.dropdownRef = createRef();
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
        var dropdownClass = clsx({
            "react-datepicker__year-dropdown": true,
            "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown,
        });
        return (React.createElement(ClickOutsideWrapper, { className: dropdownClass, containerRef: this.dropdownRef, onClickOutside: this.handleClickOutside }, this.renderOptions()));
    };
    return YearDropdownOptions;
}(Component));

var YearDropdown = /** @class */ (function (_super) {
    __extends(YearDropdown, _super);
    function YearDropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownVisible: false,
        };
        _this.renderSelectOptions = function () {
            var minYear = _this.props.minDate
                ? getYear(_this.props.minDate)
                : 1900;
            var maxYear = _this.props.maxDate
                ? getYear(_this.props.maxDate)
                : 2100;
            var options = [];
            for (var i = minYear; i <= maxYear; i++) {
                options.push(React.createElement("option", { key: i, value: i }, i));
            }
            return options;
        };
        _this.onSelectChange = function (event) {
            _this.onChange(parseInt(event.target.value));
        };
        _this.renderSelectMode = function () { return (React.createElement("select", { value: _this.props.year, className: "react-datepicker__year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions())); };
        _this.renderReadView = function (visible) { return (React.createElement("div", { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__year-read-view", onClick: function (event) {
                return _this.toggleDropdown(event);
            } },
            React.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }),
            React.createElement("span", { className: "react-datepicker__year-read-view--selected-year" }, _this.props.year))); };
        _this.renderDropdown = function () { return (React.createElement(YearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
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
            var _a;
            (_a = _this.onSelect) === null || _a === void 0 ? void 0 : _a.call(_this, date, event);
            _this.setOpen();
        };
        _this.onSelect = function (date, event) {
            var _a, _b;
            (_b = (_a = _this.props).onSelect) === null || _b === void 0 ? void 0 : _b.call(_a, date, event);
        };
        _this.setOpen = function () {
            var _a, _b;
            (_b = (_a = _this.props).setOpen) === null || _b === void 0 ? void 0 : _b.call(_a, true);
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
        return (React.createElement("div", { className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown));
    };
    return YearDropdown;
}(Component));

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
                if (minDate && isBefore(current, minDate)) {
                    return minDate;
                }
                else if (maxDate && isAfter(current, maxDate)) {
                    return maxDate;
                }
            }
            return current;
        };
        _this.increaseMonth = function () {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: addMonths(date, 1),
                });
            }, function () { return _this.handleMonthChange(_this.state.date); });
        };
        _this.decreaseMonth = function () {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: subMonths(date, 1),
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
            _this.setState({ selectingDate: setYear(newDate(), year) });
            !!_this.props.onYearMouseEnter && _this.props.onYearMouseEnter(event, year);
        };
        _this.handleYearMouseLeave = function (event, year) {
            !!_this.props.onYearMouseLeave && _this.props.onYearMouseLeave(event, year);
        };
        _this.handleYearChange = function (date) {
            var _a, _b, _c, _d;
            (_b = (_a = _this.props).onYearChange) === null || _b === void 0 ? void 0 : _b.call(_a, date);
            _this.setState({ isRenderAriaLiveMessage: true });
            if (_this.props.adjustDateOnChange) {
                _this.props.onSelect(date);
                (_d = (_c = _this.props).setOpen) === null || _d === void 0 ? void 0 : _d.call(_c, true);
            }
            _this.props.setPreSelection && _this.props.setPreSelection(date);
        };
        _this.getEnabledPreSelectionDateForMonth = function (date) {
            if (!isDayDisabled(date, _this.props)) {
                return date;
            }
            var startOfMonth = getStartOfMonth(date);
            var endOfMonth = getEndOfMonth(date);
            var totalDays = differenceInDays(endOfMonth, startOfMonth);
            var preSelectedDate = null;
            for (var dayIdx = 0; dayIdx <= totalDays; dayIdx++) {
                var processingDate = addDays(startOfMonth, dayIdx);
                if (!isDayDisabled(processingDate, _this.props)) {
                    preSelectedDate = processingDate;
                    break;
                }
            }
            return preSelectedDate;
        };
        _this.handleMonthChange = function (date) {
            var _a, _b, _c;
            var enabledPreSelectionDate = (_a = _this.getEnabledPreSelectionDateForMonth(date)) !== null && _a !== void 0 ? _a : date;
            _this.handleCustomMonthChange(enabledPreSelectionDate);
            if (_this.props.adjustDateOnChange) {
                _this.props.onSelect(enabledPreSelectionDate);
                (_c = (_b = _this.props).setOpen) === null || _c === void 0 ? void 0 : _c.call(_b, true);
            }
            _this.props.setPreSelection &&
                _this.props.setPreSelection(enabledPreSelectionDate);
        };
        _this.handleCustomMonthChange = function (date) {
            var _a, _b;
            (_b = (_a = _this.props).onMonthChange) === null || _b === void 0 ? void 0 : _b.call(_a, date);
            _this.setState({ isRenderAriaLiveMessage: true });
        };
        _this.handleMonthYearChange = function (date) {
            _this.handleYearChange(date);
            _this.handleMonthChange(date);
        };
        _this.changeYear = function (year) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: setYear(date, Number(year)),
                });
            }, function () { return _this.handleYearChange(_this.state.date); });
        };
        _this.changeMonth = function (month) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: setMonth(date, Number(month)),
                });
            }, function () { return _this.handleMonthChange(_this.state.date); });
        };
        _this.changeMonthYear = function (monthYear) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: setYear(setMonth(date, getMonth(monthYear)), getYear(monthYear)),
                });
            }, function () { return _this.handleMonthYearChange(_this.state.date); });
        };
        _this.header = function (date) {
            if (date === void 0) { date = _this.state.date; }
            var startOfWeek = getStartOfWeek(date, _this.props.locale, _this.props.calendarStartDay);
            var dayNames = [];
            if (_this.props.showWeekNumbers) {
                dayNames.push(React.createElement("div", { key: "W", className: "react-datepicker__day-name" }, _this.props.weekLabel || "#"));
            }
            return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
                var day = addDays(startOfWeek, offset);
                var weekDayName = _this.formatWeekday(day, _this.props.locale);
                var weekDayClassName = _this.props.weekDayClassName
                    ? _this.props.weekDayClassName(day)
                    : undefined;
                return (React.createElement("div", { key: offset, "aria-label": formatDate(day, "EEEE", _this.props.locale), className: clsx("react-datepicker__day-name", weekDayClassName) }, weekDayName));
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
                    date: subYears(date, _this.props.showYearPicker
                        ? ((_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar.defaultProps.yearItemNumber)
                        : 1),
                });
            }, function () { return _this.handleYearChange(_this.state.date); });
        };
        _this.clearSelectingDate = function () {
            _this.setState({ selectingDate: undefined });
        };
        _this.renderPreviousButton = function () {
            var _a, _b, _c;
            if (_this.props.renderCustomHeader) {
                return;
            }
            var monthsShown = (_a = _this.props.monthsShown) !== null && _a !== void 0 ? _a : Calendar.defaultProps.monthsShown;
            var monthsToSubtract = _this.props.showPreviousMonths
                ? monthsShown - 1
                : 0;
            var monthSelectedIn = (_b = _this.props.monthSelectedIn) !== null && _b !== void 0 ? _b : monthsToSubtract;
            var fromMonthDate = subMonths(_this.state.date, monthSelectedIn);
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
                    allPrevDaysDisabled = monthDisabledBefore(fromMonthDate, _this.props);
                    break;
            }
            if ((!((_c = _this.props.forceShowMonthNavigation) !== null && _c !== void 0 ? _c : Calendar.defaultProps.forceShowMonthNavigation) &&
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
            var _d = _this.props, _e = _d.previousMonthButtonLabel, previousMonthButtonLabel = _e === void 0 ? Calendar.defaultProps.previousMonthButtonLabel : _e, _f = _d.previousYearButtonLabel, previousYearButtonLabel = _f === void 0 ? Calendar.defaultProps.previousYearButtonLabel : _f;
            var _g = _this.props, _h = _g.previousMonthAriaLabel, previousMonthAriaLabel = _h === void 0 ? typeof previousMonthButtonLabel === "string"
                ? previousMonthButtonLabel
                : "Previous Month" : _h, _j = _g.previousYearAriaLabel, previousYearAriaLabel = _j === void 0 ? typeof previousYearButtonLabel === "string"
                ? previousYearButtonLabel
                : "Previous Year" : _j;
            return (React.createElement("button", { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel },
                React.createElement("span", { className: iconClasses.join(" ") }, isForYear ? previousYearButtonLabel : previousMonthButtonLabel)));
        };
        _this.increaseYear = function () {
            _this.setState(function (_a) {
                var _b;
                var date = _a.date;
                return ({
                    date: addYears(date, _this.props.showYearPicker
                        ? ((_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar.defaultProps.yearItemNumber)
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
            return (React.createElement("button", { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel },
                React.createElement("span", { className: iconClasses.join(" ") }, isForYear ? nextYearButtonLabel : nextMonthButtonLabel)));
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
            return (React.createElement("h2", { className: classes.join(" ") }, formatDate(date, _this.props.dateFormat, _this.props.locale)));
        };
        _this.renderYearDropdown = function (overrideHide) {
            if (overrideHide === void 0) { overrideHide = false; }
            if (!_this.props.showYearDropdown || overrideHide) {
                return;
            }
            return (React.createElement(YearDropdown, _assign({}, Calendar.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeYear, year: getYear(_this.state.date) })));
        };
        _this.renderMonthDropdown = function (overrideHide) {
            if (overrideHide === void 0) { overrideHide = false; }
            if (!_this.props.showMonthDropdown || overrideHide) {
                return;
            }
            return (React.createElement(MonthDropdown, _assign({}, Calendar.defaultProps, _this.props, { month: getMonth(_this.state.date), onChange: _this.changeMonth })));
        };
        _this.renderMonthYearDropdown = function (overrideHide) {
            if (overrideHide === void 0) { overrideHide = false; }
            if (!_this.props.showMonthYearDropdown || overrideHide) {
                return;
            }
            return (React.createElement(MonthYearDropdown, _assign({}, Calendar.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeMonthYear })));
        };
        _this.handleTodayButtonClick = function (event) {
            _this.props.onSelect(getStartOfToday(), event);
            _this.props.setPreSelection && _this.props.setPreSelection(getStartOfToday());
        };
        _this.renderTodayButton = function () {
            if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
                return;
            }
            return (React.createElement("div", { className: "react-datepicker__today-button", onClick: _this.handleTodayButtonClick }, _this.props.todayButton));
        };
        _this.renderDefaultHeader = function (_a) {
            var monthDate = _a.monthDate, i = _a.i;
            return (React.createElement("div", { className: "react-datepicker__header ".concat(_this.props.showTimeSelect
                    ? "react-datepicker__header--has-time-select"
                    : "") },
                _this.renderCurrentMonth(monthDate),
                React.createElement("div", { className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(_this.props.dropdownMode), onFocus: _this.handleDropdownFocus },
                    _this.renderMonthDropdown(i !== 0),
                    _this.renderMonthYearDropdown(i !== 0),
                    _this.renderYearDropdown(i !== 0)),
                React.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate))));
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
            return (React.createElement("div", { className: "react-datepicker__header react-datepicker__header--custom", onFocus: _this.props.onDropdownFocus }, (_b = (_a = _this.props).renderCustomHeader) === null || _b === void 0 ? void 0 :
                _b.call(_a, _assign(_assign({}, _this.state), { customHeaderCount: i, monthDate: monthDate, changeMonth: _this.changeMonth, changeYear: _this.changeYear, decreaseMonth: _this.decreaseMonth, increaseMonth: _this.increaseMonth, decreaseYear: _this.decreaseYear, increaseYear: _this.increaseYear, prevMonthButtonDisabled: prevMonthButtonDisabled, nextMonthButtonDisabled: nextMonthButtonDisabled, prevYearButtonDisabled: prevYearButtonDisabled, nextYearButtonDisabled: nextYearButtonDisabled })),
                showDayNames && (React.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate)))));
        };
        _this.renderYearHeader = function (_a) {
            var monthDate = _a.monthDate;
            var _b = _this.props, showYearPicker = _b.showYearPicker, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? Calendar.defaultProps.yearItemNumber : _c;
            var _d = getYearsPeriod(monthDate, yearItemNumber), startPeriod = _d.startPeriod, endPeriod = _d.endPeriod;
            return (React.createElement("div", { className: "react-datepicker__header react-datepicker-year-header" }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : getYear(monthDate)));
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
                ? addYears(_this.state.date, monthsToSubtract)
                : subMonths(_this.state.date, monthsToSubtract);
            var monthSelectedIn = (_b = _this.props.monthSelectedIn) !== null && _b !== void 0 ? _b : monthsToSubtract;
            for (var i = 0; i < monthsShown; ++i) {
                var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
                var monthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
                    ? addYears(fromMonthDate, monthsToAdd)
                    : addMonths(fromMonthDate, monthsToAdd);
                var monthKey = "month-".concat(i);
                var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
                var monthShowsDuplicateDaysStart = i > 0;
                monthList.push(React.createElement("div", { key: monthKey, ref: function (div) {
                        _this.monthContainer = div !== null && div !== void 0 ? div : undefined;
                    }, className: "react-datepicker__month-container" },
                    _this.renderHeader({ monthDate: monthDate, i: i }),
                    React.createElement(Month, _assign({}, Calendar.defaultProps, _this.props, { ariaLabelPrefix: _this.props.monthAriaLabelPrefix, day: monthDate, onDayClick: _this.handleDayClick, handleOnKeyDown: _this.props.handleOnDayKeyDown, handleOnMonthKeyDown: _this.props.handleOnKeyDown, onDayMouseEnter: _this.handleDayMouseEnter, onMouseLeave: _this.handleMonthMouseLeave, orderInDisplay: i, selectingDate: _this.state.selectingDate, monthShowsDuplicateDaysEnd: monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart: monthShowsDuplicateDaysStart }))));
            }
            return monthList;
        };
        _this.renderYears = function () {
            if (_this.props.showTimeSelectOnly) {
                return;
            }
            if (_this.props.showYearPicker) {
                return (React.createElement("div", { className: "react-datepicker__year--container" },
                    _this.renderHeader({ monthDate: _this.state.date }),
                    React.createElement(Year, _assign({}, Calendar.defaultProps, _this.props, { selectingDate: _this.state.selectingDate, date: _this.state.date, onDayClick: _this.handleDayClick, clearSelectingDate: _this.clearSelectingDate, onYearMouseEnter: _this.handleYearMouseEnter, onYearMouseLeave: _this.handleYearMouseLeave }))));
            }
            return;
        };
        _this.renderTimeSection = function () {
            if (_this.props.showTimeSelect &&
                (_this.state.monthContainer || _this.props.showTimeSelectOnly)) {
                return (React.createElement(Time, _assign({}, Calendar.defaultProps, _this.props, { onChange: _this.props.onTimeChange, format: _this.props.timeFormat, intervals: _this.props.timeIntervals, monthRef: _this.state.monthContainer })));
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
                return (React.createElement(InputTime, _assign({}, Calendar.defaultProps, _this.props, { date: time, timeString: timeString, onChange: _this.props.onTimeChange })));
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
                ariaLiveMessage = getYear(_this.state.date);
            }
            else {
                ariaLiveMessage = "".concat(getMonthInLocale(getMonth(_this.state.date), _this.props.locale), " ").concat(getYear(_this.state.date));
            }
            return (React.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, _this.state.isRenderAriaLiveMessage && ariaLiveMessage));
        };
        _this.renderChildren = function () {
            if (_this.props.children) {
                return (React.createElement("div", { className: "react-datepicker__children-container" }, _this.props.children));
            }
            return;
        };
        _this.containerRef = createRef();
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
        return (React.createElement(ClickOutsideWrapper, { onClickOutside: this.handleClickOutside, style: { display: "contents" }, containerRef: this.containerRef, ignoreClass: this.props.outsideClickIgnoreClass },
            React.createElement(Container, { className: clsx("react-datepicker", this.props.className, {
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
}(Component));

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
        return (React.createElement("i", { className: "".concat(defaultClass, " ").concat(icon, " ").concat(className), "aria-hidden": "true", onClick: onClick }));
    }
    if (React.isValidElement(icon)) {
        // Because we are checking that typeof icon is string first, we can safely cast icon as React.ReactElement on types level and code level
        return React.cloneElement(icon, {
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
    return (React.createElement("svg", { className: "".concat(defaultClass, " ").concat(className), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", onClick: onClick },
        React.createElement("path", { d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" })));
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
        return ReactDOM.createPortal(this.props.children, this.el);
    };
    return Portal;
}(Component));

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
        _this.tabLoopRef = createRef();
        return _this;
    }
    TabLoop.prototype.render = function () {
        var _a;
        if (!((_a = this.props.enableTabLoop) !== null && _a !== void 0 ? _a : TabLoop.defaultProps.enableTabLoop)) {
            return this.props.children;
        }
        return (React.createElement("div", { className: "react-datepicker__tab-loop", ref: this.tabLoopRef },
            React.createElement("div", { className: "react-datepicker__tab-loop__start", tabIndex: 0, onFocus: this.handleFocusStart }),
            this.props.children,
            React.createElement("div", { className: "react-datepicker__tab-loop__end", tabIndex: 0, onFocus: this.handleFocusEnd })));
    };
    TabLoop.defaultProps = {
        enableTabLoop: true,
    };
    return TabLoop;
}(Component));

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
        var arrowRef = useRef(null);
        var floatingProps = useFloating(_assign({ open: !hidePopper, whileElementsMounted: autoUpdate, placement: props.popperPlacement, middleware: __spreadArray([
                flip({ padding: 15 }),
                offset(10),
                arrow({ element: arrowRef })
            ], ((_a = props.popperModifiers) !== null && _a !== void 0 ? _a : []), true) }, props.popperProps));
        var componentProps = _assign(_assign({}, props), { hidePopper: hidePopper, popperProps: _assign(_assign({}, floatingProps), { arrowRef: arrowRef }) });
        return React.createElement(Component, _assign({}, componentProps));
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
            var classes = clsx("react-datepicker-popper", className);
            popper = (React.createElement(TabLoop, { enableTabLoop: enableTabLoop },
                React.createElement("div", { ref: popperProps.refs.setFloating, style: popperProps.floatingStyles, className: classes, "data-placement": popperProps.placement, onKeyDown: popperOnKeyDown },
                    popperComponent,
                    showArrow && (React.createElement(FloatingArrow, { ref: popperProps.arrowRef, context: popperProps.context, fill: "currentColor", strokeWidth: 1, height: 8, width: 16, style: { transform: "translateY(-1px)" }, className: "react-datepicker__triangle" })))));
        }
        if (this.props.popperContainer) {
            popper = createElement(this.props.popperContainer, {}, popper);
        }
        if (portalId && !hidePopper) {
            popper = (React.createElement(Portal, { portalId: portalId, portalHost: portalHost }, popper));
        }
        var wrapperClasses = clsx("react-datepicker-wrapper", wrapperClassName);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { ref: popperProps.refs.setReference, className: wrapperClasses }, targetComponent),
            popper));
    };
    return PopperComponent;
}(Component));
var PopperComponent$1 = withFloating(PopperComponent);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
    if (date1 && date2) {
        return (getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2));
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
            var boundedPreSelection = minDate && isBefore(defaultPreSelection, getStartOfDay(minDate))
                ? minDate
                : maxDate && isAfter(defaultPreSelection, getEndOfDay(maxDate))
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
        _this.safeFocus = function () {
            setTimeout(function () {
                var _a, _b;
                (_b = (_a = _this.input) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a, { preventScroll: true });
            }, 0);
        };
        _this.safeBlur = function () {
            setTimeout(function () {
                var _a, _b;
                (_b = (_a = _this.input) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
            }, 0);
        };
        _this.setFocus = function () {
            _this.safeFocus();
        };
        _this.setBlur = function () {
            _this.safeBlur();
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
        _this.inputOk = function () { return isDate(_this.state.preSelection); };
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
        // handleChange is called when user types in the textbox
        _this.handleChange = function () {
            var _a, _b;
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
            var _c = _this.props, _d = _c.dateFormat, dateFormat = _d === void 0 ? DatePicker.defaultProps.dateFormat : _d, _e = _c.strictParsing, strictParsing = _e === void 0 ? DatePicker.defaultProps.strictParsing : _e, selectsRange = _c.selectsRange, startDate = _c.startDate, endDate = _c.endDate;
            var value = (event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : "";
            if (selectsRange) {
                var _f = value
                    .split("-", 2)
                    .map(function (val) { return val.trim(); }), valueStart = _f[0], valueEnd = _f[1];
                var startDateNew = parseDate(valueStart !== null && valueStart !== void 0 ? valueStart : "", dateFormat, _this.props.locale, strictParsing);
                var endDateNew = parseDate(valueEnd !== null && valueEnd !== void 0 ? valueEnd : "", dateFormat, _this.props.locale, strictParsing);
                var startChanged = (startDate === null || startDate === void 0 ? void 0 : startDate.getTime()) !== (startDateNew === null || startDateNew === void 0 ? void 0 : startDateNew.getTime());
                var endChanged = (endDate === null || endDate === void 0 ? void 0 : endDate.getTime()) !== (endDateNew === null || endDateNew === void 0 ? void 0 : endDateNew.getTime());
                if (!startChanged && !endChanged) {
                    return;
                }
                if (startDateNew && isDayDisabled(startDateNew, _this.props)) {
                    return;
                }
                if (endDateNew && isDayDisabled(endDateNew, _this.props)) {
                    return;
                }
                (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, [startDateNew, endDateNew], event);
            }
            else {
                // not selectsRange
                var date = parseDate(value, dateFormat, _this.props.locale, strictParsing, _this.props.minDate);
                // Use date from `selected` prop when manipulating only time for input value
                if (_this.props.showTimeSelectOnly &&
                    _this.props.selected &&
                    date &&
                    !isSameDay(date, _this.props.selected)) {
                    date = set(_this.props.selected, {
                        hours: getHours(date),
                        minutes: getMinutes(date),
                        seconds: getSeconds(date),
                    });
                }
                // Update selection if either (1) date was successfully parsed, or (2) input field is empty
                if (date || !value) {
                    _this.setSelected(date, event, true);
                }
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
        // setSelected is called either from handleChange (user typed date into textbox and it was parsed) or handleSelect (user selected date from calendar using mouse or keyboard)
        _this.setSelected = function (date, event, keepInput, monthSelectedIn) {
            var _a, _b;
            var changedDate = date;
            // Early return if selected year/month/day is disabled
            if (_this.props.showYearPicker) {
                if (changedDate !== null &&
                    isYearDisabled(getYear(changedDate), _this.props)) {
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
            var _c = _this.props, onChange = _c.onChange, selectsRange = _c.selectsRange, startDate = _c.startDate, endDate = _c.endDate, selectsMultiple = _c.selectsMultiple, selectedDates = _c.selectedDates, minTime = _c.minTime, swapRange = _c.swapRange;
            if (!isEqual(_this.props.selected, changedDate) ||
                _this.props.allowSameDay ||
                selectsRange ||
                selectsMultiple) {
                if (changedDate !== null) {
                    // Preserve previously selected time if only date is currently being changed
                    if (_this.props.selected &&
                        (!keepInput ||
                            (!_this.props.showTimeSelect &&
                                !_this.props.showTimeSelectOnly &&
                                !_this.props.showTimeInput))) {
                        changedDate = setTime(changedDate, {
                            hour: getHours(_this.props.selected),
                            minute: getMinutes(_this.props.selected),
                            second: getSeconds(_this.props.selected),
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
                        onChange === null || onChange === void 0 ? void 0 : onChange([changedDate, null], event);
                    }
                    else if (hasStartRange) {
                        if (changedDate === null) {
                            onChange === null || onChange === void 0 ? void 0 : onChange([null, null], event);
                        }
                        else if (isDateBefore(changedDate, startDate)) {
                            if (swapRange) {
                                onChange === null || onChange === void 0 ? void 0 : onChange([changedDate, startDate], event);
                            }
                            else {
                                onChange === null || onChange === void 0 ? void 0 : onChange([changedDate, null], event);
                            }
                        }
                        else {
                            onChange === null || onChange === void 0 ? void 0 : onChange([startDate, changedDate], event);
                        }
                    }
                    if (isRangeFilled) {
                        onChange === null || onChange === void 0 ? void 0 : onChange([changedDate, null], event);
                    }
                }
                else if (selectsMultiple) {
                    if (changedDate !== null) {
                        if (!(selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.length)) {
                            onChange === null || onChange === void 0 ? void 0 : onChange([changedDate], event);
                        }
                        else {
                            var isChangedDateAlreadySelected = selectedDates.some(function (selectedDate) { return isSameDay(selectedDate, changedDate); });
                            if (isChangedDateAlreadySelected) {
                                var nextDates = selectedDates.filter(function (selectedDate) { return !isSameDay(selectedDate, changedDate); });
                                onChange === null || onChange === void 0 ? void 0 : onChange(nextDates, event);
                            }
                            else {
                                onChange === null || onChange === void 0 ? void 0 : onChange(__spreadArray(__spreadArray([], selectedDates, true), [changedDate], false), event);
                            }
                        }
                    }
                }
                else {
                    onChange === null || onChange === void 0 ? void 0 : onChange(changedDate, event);
                }
            }
            if (!keepInput) {
                (_b = (_a = _this.props).onSelect) === null || _b === void 0 ? void 0 : _b.call(_a, changedDate, event);
                _this.setState({ inputValue: null });
            }
        };
        // When checking preSelection via min/maxDate, times need to be manipulated via getStartOfDay/getEndOfDay
        _this.setPreSelection = function (date) {
            var hasMinDate = isDate(_this.props.minDate);
            var hasMaxDate = isDate(_this.props.maxDate);
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
                        isAfter(date, minDateStartOfDay) ||
                            isEqual(dateStartOfDay, minDateStartOfDay);
                }
                else if (hasMaxDate) {
                    var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
                    isValidDateSelection =
                        isBefore(date, maxDateEndOfDay) ||
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
            var _a, _b;
            if (_this.props.selectsRange || _this.props.selectsMultiple) {
                return;
            }
            var selected = _this.props.selected
                ? _this.props.selected
                : _this.getPreSelection();
            var changedDate = _this.props.selected
                ? time
                : setTime(selected, {
                    hour: getHours(time),
                    minute: getMinutes(time),
                });
            _this.setState({
                preSelection: changedDate,
            });
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, changedDate);
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
            var _a, _b, _c, _d, _e, _f;
            (_b = (_a = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            var eventKey = event.key;
            if (!_this.state.open &&
                !_this.props.inline &&
                !_this.props.preventOpenOnFocus) {
                if (eventKey === KeyType.ArrowDown ||
                    eventKey === KeyType.ArrowUp ||
                    eventKey === KeyType.Enter) {
                    (_c = _this.onInputClick) === null || _c === void 0 ? void 0 : _c.call(_this);
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
                    var selectedItem = ((_d = _this.calendar) === null || _d === void 0 ? void 0 : _d.containerRef.current) instanceof Element &&
                        _this.calendar.containerRef.current.querySelector(selectorString);
                    selectedItem instanceof HTMLElement &&
                        selectedItem.focus({ preventScroll: true });
                    return;
                }
                var copy = newDate(_this.state.preSelection);
                if (eventKey === KeyType.Enter) {
                    event.preventDefault();
                    event.target.blur();
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
                    event.target.blur();
                    _this.sendFocusBackToInput();
                    _this.setOpen(false);
                }
                else if (eventKey === KeyType.Tab) {
                    _this.setOpen(false);
                }
                if (!_this.inputOk()) {
                    (_f = (_e = _this.props).onInputError) === null || _f === void 0 ? void 0 : _f.call(_e, { code: 1, msg: INPUT_ERR_1 });
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
            var _a, _b, _c, _d, _e, _f;
            var _g = _this.props, minDate = _g.minDate, maxDate = _g.maxDate, disabledKeyboardNavigation = _g.disabledKeyboardNavigation, showWeekPicker = _g.showWeekPicker, shouldCloseOnSelect = _g.shouldCloseOnSelect, locale = _g.locale, calendarStartDay = _g.calendarStartDay, adjustDateOnChange = _g.adjustDateOnChange, inline = _g.inline;
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
                            ? addWeeks(date, 1)
                            : addDays(date, 1);
                        break;
                    case KeyType.ArrowLeft:
                        newCalculatedDate = showWeekPicker
                            ? subWeeks(date, 1)
                            : subDays(date, 1);
                        break;
                    case KeyType.ArrowUp:
                        newCalculatedDate = subWeeks(date, 1);
                        break;
                    case KeyType.ArrowDown:
                        newCalculatedDate = addWeeks(date, 1);
                        break;
                    case KeyType.PageUp:
                        newCalculatedDate = isShiftKeyActive
                            ? subYears(date, 1)
                            : subMonths(date, 1);
                        break;
                    case KeyType.PageDown:
                        newCalculatedDate = isShiftKeyActive
                            ? addYears(date, 1)
                            : addMonths(date, 1);
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
                (_f = (_e = _this.props).onInputError) === null || _f === void 0 ? void 0 : _f.call(_e, { code: 1, msg: INPUT_ERR_1 });
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
                var prevMonth = getMonth(copy);
                var newMonth = getMonth(newSelection);
                var prevYear = getYear(copy);
                var newYear = getYear(newSelection);
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
                onChange === null || onChange === void 0 ? void 0 : onChange([null, null], event);
            }
            else {
                onChange === null || onChange === void 0 ? void 0 : onChange(null, event);
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
            return (React.createElement(Calendar, _assign({ showMonthYearDropdown: undefined, ref: function (elem) {
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
            return (React.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, ariaLiveMessage));
        };
        _this.renderDateInput = function () {
            var _a, _b;
            var _c;
            var className = clsx(_this.props.className, (_a = {},
                _a[outsideClickIgnoreClass] = _this.state.open,
                _a));
            var customInput = _this.props.customInput || React.createElement("input", { type: "text" });
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
            return cloneElement(customInput, (_b = {},
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
                _b.className = clsx(customInput.props.className, className),
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
                return (React.createElement("button", { type: "button", className: clsx("react-datepicker__close-icon", clearButtonClassName, { "react-datepicker__close-icon--disabled": disabled }), disabled: disabled, "aria-label": ariaLabelClose, onClick: _this.onClearClick, title: clearButtonTitle, tabIndex: -1 }));
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
                disabled: false,
                disabledKeyboardNavigation: false,
                dropdownMode: "scroll",
                preventOpenOnFocus: false,
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
        return (React.createElement("div", { className: "react-datepicker__input-container".concat(showIcon ? " react-datepicker__view-calendar-icon" : "") },
            showIcon && (React.createElement(CalendarIcon, _assign({ icon: icon, className: clsx(calendarIconClassName, !calendarIconClassName && calendarIconClassname, open && "react-datepicker-ignore-onclickoutside") }, (toggleCalendarOnIconClick
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
            var portalContainer = this.state.open ? (React.createElement(TabLoop, { enableTabLoop: this.props.enableTabLoop },
                React.createElement("div", { className: "react-datepicker__portal", tabIndex: -1, onKeyDown: this.onPortalKeyDown }, calendar))) : null;
            if (this.state.open && this.props.portalId) {
                portalContainer = (React.createElement(Portal, _assign({ portalId: this.props.portalId }, this.props), portalContainer));
            }
            return (React.createElement("div", null,
                this.renderInputContainer(),
                portalContainer));
        }
        return (React.createElement(PopperComponent$1, _assign({}, this.props, { className: this.props.popperClassName, hidePopper: !this.isCalendarOpen(), targetComponent: this.renderInputContainer(), popperComponent: calendar, popperOnKeyDown: this.onPopperKeyDown, showArrow: this.props.showPopperArrow })));
    };
    return DatePicker;
}(Component));
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

export { CalendarContainer, DatePicker as default, getDefaultLocale, registerLocale, setDefaultLocale };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi8uLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLnRzeCIsIi4uLy4uL3NyYy9jbGlja19vdXRzaWRlX3dyYXBwZXIudHN4IiwiLi4vLi4vc3JjL2RhdGVfdXRpbHMudHMiLCIuLi8uLi9zcmMvaW5wdXRfdGltZS50c3giLCIuLi8uLi9zcmMvZGF5LnRzeCIsIi4uLy4uL3NyYy93ZWVrX251bWJlci50c3giLCIuLi8uLi9zcmMvd2Vlay50c3giLCIuLi8uLi9zcmMvbW9udGgudHN4IiwiLi4vLi4vc3JjL21vbnRoX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vLi4vc3JjL21vbnRoX2Ryb3Bkb3duLnRzeCIsIi4uLy4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd24udHN4IiwiLi4vLi4vc3JjL3RpbWUudHN4IiwiLi4vLi4vc3JjL3llYXIudHN4IiwiLi4vLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi8uLi9zcmMveWVhcl9kcm9wZG93bi50c3giLCIuLi8uLi9zcmMvY2FsZW5kYXIudHN4IiwiLi4vLi4vc3JjL2NhbGVuZGFyX2ljb24udHN4IiwiLi4vLi4vc3JjL3BvcnRhbC50c3giLCIuLi8uLi9zcmMvdGFiX2xvb3AudHN4IiwiLi4vLi4vc3JjL3dpdGhfZmxvYXRpbmcudHN4IiwiLi4vLi4vc3JjL3BvcHBlcl9jb21wb25lbnQudHN4IiwiLi4vLi4vc3JjL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XHJcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xyXG4gICAgICAgIHJldHVybiBhcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3duS2V5cyhvKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9fZXh0ZW5kczogX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ246IF9fYXNzaWduLFxyXG4gICAgX19yZXN0OiBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlOiBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbTogX19wYXJhbSxcclxuICAgIF9fZXNEZWNvcmF0ZTogX19lc0RlY29yYXRlLFxyXG4gICAgX19ydW5Jbml0aWFsaXplcnM6IF9fcnVuSW5pdGlhbGl6ZXJzLFxyXG4gICAgX19wcm9wS2V5OiBfX3Byb3BLZXksXHJcbiAgICBfX3NldEZ1bmN0aW9uTmFtZTogX19zZXRGdW5jdGlvbk5hbWUsXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbiAgICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbjogX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXHJcbn07XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiZXh0ZW5kU3RhdGljcyIsImQiLCJiIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJBcnJheSIsInAiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfX2V4dGVuZHMiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwiX19hc3NpZ24iLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXBwbHkiLCJfX3NwcmVhZEFycmF5IiwidG8iLCJmcm9tIiwicGFjayIsImwiLCJhciIsInNsaWNlIiwiY29uY2F0IiwiU3VwcHJlc3NlZEVycm9yIiwiZXJyb3IiLCJzdXBwcmVzc2VkIiwibWVzc2FnZSIsImUiLCJFcnJvciIsIm5hbWUiLCJpc1ZhbGlkRGF0ZSIsImRmSXNTYW1lWWVhciIsImRmSXNTYW1lTW9udGgiLCJkZklzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZURheSIsImRmSXNFcXVhbCIsIlBvcHBlckNvbXBvbmVudCJdLCJtYXBw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
