/*!
  react-datepicker v8.2.1
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clsx = require('clsx');
var React = require('react');
var dateFns = require('date-fns');
var react = require('@floating-ui/react');
var ReactDOM = require('react-dom');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
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
    return (React__default.default.createElement("div", { className: className, role: "dialog", "aria-label": ariaLabel, "aria-modal": "true" }, children));
};

var useDetectClickOutside = function (onClickOutside, ignoreClass) {
    var ref = React.useRef(null);
    var onClickOutsideRef = React.useRef(onClickOutside);
    onClickOutsideRef.current = onClickOutside;
    var handleClickOutside = React.useCallback(function (event) {
        var _a;
        var target = (event.composed &&
            event.composedPath &&
            event
                .composedPath()
                .find(function (eventTarget) { return eventTarget instanceof Node; })) ||
            event.target;
        if (ref.current && !ref.current.contains(target)) {
            if (!(ignoreClass &&
                target instanceof HTMLElement &&
                target.classList.contains(ignoreClass))) {
                (_a = onClickOutsideRef.current) === null || _a === void 0 ? void 0 : _a.call(onClickOutsideRef, event);
            }
        }
    }, [ignoreClass]);
    React.useEffect(function () {
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
    return (React__default.default.createElement("div", { className: className, style: style, ref: function (node) {
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
// ** Date Constructors **
function newDate(value) {
    if (value == null) {
        return new Date();
    }
    var d = typeof value === "string" ? dateFns.parseISO(value) : dateFns.toDate(value);
    return isValid(d) ? d : new Date();
}
/**
 * Parses a date.
 *
 * @param value - The string representing the Date in a parsable form, e.g., ISO 1861
 * @param dateFormat - The date format.
 * @param locale - The locale.
 * @param strictParsing - The strict parsing flag.
 * @param refDate - The base date to be passed to date-fns parse() function.
 * @returns - The parsed date or null.
 */
function parseDate(value, dateFormat, locale, strictParsing, refDate) {
    if (refDate === void 0) { refDate = newDate(); }
    var localeObject = getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
    var formats = Array.isArray(dateFormat) ? dateFormat : [dateFormat];
    for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
        var format_1 = formats_1[_i];
        var parsedDate = dateFns.parse(value, format_1, refDate, {
            locale: localeObject,
            useAdditionalWeekYearTokens: true,
            useAdditionalDayOfYearTokens: true,
        });
        if (isValid(parsedDate) &&
            (!strictParsing || value === formatDate(parsedDate, format_1, locale))) {
            return parsedDate;
        }
    }
    return null;
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
    return dateFns.isValid(date) && !dateFns.isBefore(date, new Date("1/1/1800"));
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
        return dateFns.format(date, formatStr, {
            useAdditionalWeekYearTokens: true,
            useAdditionalDayOfYearTokens: true,
        });
    }
    var localeObj = locale ? getLocaleObject(locale) : undefined;
    if (locale && !localeObj) {
        console.warn("A locale object was not found for the provided string [\"".concat(locale, "\"]."));
    }
    localeObj = localeObj || getLocaleObject(getDefaultLocale());
    return dateFns.format(date, formatStr, {
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
    return dateFns.setHours(dateFns.setMinutes(dateFns.setSeconds(date, second), minute), hour);
}
/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
function getWeek(date) {
    return dateFns.getISOWeek(date);
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
    return dateFns.startOfDay(date);
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
    return dateFns.startOfWeek(date, {
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
    return dateFns.startOfMonth(date);
}
/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
function getStartOfYear(date) {
    return dateFns.startOfYear(date);
}
/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
function getStartOfQuarter(date) {
    return dateFns.startOfQuarter(date);
}
/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
function getStartOfToday() {
    return dateFns.startOfDay(newDate());
}
// *** End of ***
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
function getEndOfDay(date) {
    return dateFns.endOfDay(date);
}
/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
function getEndOfWeek(date) {
    return dateFns.endOfWeek(date);
}
/**
 * Gets the end of the month for a given date.
 *
 * @param date - The date.
 * @returns - The end of the month.
 */
function getEndOfMonth(date) {
    return dateFns.endOfMonth(date);
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
        return dateFns.isSameYear(date1, date2);
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
        return dateFns.isSameMonth(date1, date2);
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
        return dateFns.isSameQuarter(date1, date2);
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
        return dateFns.isSameDay(date1, date2);
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
        return dateFns.isEqual(date1, date2);
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
    var start = dateFns.startOfDay(startDate);
    var end = dateFns.endOfDay(endDate);
    try {
        valid = dateFns.isWithinInterval(day, { start: start, end: end });
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
    return formatDate(dateFns.setMonth(newDate(), month), "LLLL", locale);
}
/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
function getMonthShortInLocale(month, locale) {
    return formatDate(dateFns.setMonth(newDate(), month), "LLL", locale);
}
/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
function getQuarterShortInLocale(quarter, locale) {
    return formatDate(dateFns.setQuarter(newDate(), quarter), "QQQ", locale);
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
                return dateFns.isWithinInterval(day, { start: start, end: end });
            })) ||
        (includeDates &&
            !includeDates.some(function (includeDate) { return isSameDay(day, includeDate); })) ||
        (includeDateIntervals &&
            !includeDateIntervals.some(function (_a) {
                var start = _a.start, end = _a.end;
                return dateFns.isWithinInterval(day, { start: start, end: end });
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
            return dateFns.isWithinInterval(day, { start: start, end: end });
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
        minDate: minDate ? dateFns.startOfMonth(minDate) : undefined,
        maxDate: maxDate ? dateFns.endOfMonth(maxDate) : undefined,
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
    var startDateYear = dateFns.getYear(startDate);
    var startDateMonth = dateFns.getMonth(startDate);
    var endDateYear = dateFns.getYear(endDate);
    var endDateMonth = dateFns.getMonth(endDate);
    var dayYear = dateFns.getYear(day);
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
    if (!dateFns.isValid(start) || !dateFns.isValid(end))
        return false;
    var startYear = dateFns.getYear(start);
    var endYear = dateFns.getYear(end);
    return startYear <= year && endYear >= year;
}
function isYearDisabled(year, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
    var date = new Date(year, 0, 1);
    return (isOutOfBounds(date, {
        minDate: minDate ? dateFns.startOfYear(minDate) : undefined,
        maxDate: maxDate ? dateFns.endOfYear(maxDate) : undefined,
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
    var startDateYear = dateFns.getYear(startDate);
    var startDateQuarter = dateFns.getQuarter(startDate);
    var endDateYear = dateFns.getYear(endDate);
    var endDateQuarter = dateFns.getQuarter(endDate);
    var dayYear = dateFns.getYear(day);
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
    return ((_b = ((minDate && dateFns.differenceInCalendarDays(day, minDate) < 0) ||
        (maxDate && dateFns.differenceInCalendarDays(day, maxDate) > 0))) !== null && _b !== void 0 ? _b : false);
}
function isTimeInList(time, times) {
    return times.some(function (listTime) {
        return dateFns.getHours(listTime) === dateFns.getHours(time) &&
            dateFns.getMinutes(listTime) === dateFns.getMinutes(time) &&
            dateFns.getSeconds(listTime) === dateFns.getSeconds(time);
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
    baseTime = dateFns.setHours(baseTime, dateFns.getHours(time));
    baseTime = dateFns.setMinutes(baseTime, dateFns.getMinutes(time));
    baseTime = dateFns.setSeconds(baseTime, dateFns.getSeconds(time));
    var min = newDate();
    min = dateFns.setHours(min, dateFns.getHours(minTime));
    min = dateFns.setMinutes(min, dateFns.getMinutes(minTime));
    min = dateFns.setSeconds(min, dateFns.getSeconds(minTime));
    var max = newDate();
    max = dateFns.setHours(max, dateFns.getHours(maxTime));
    max = dateFns.setMinutes(max, dateFns.getMinutes(maxTime));
    max = dateFns.setSeconds(max, dateFns.getSeconds(maxTime));
    var valid;
    try {
        valid = !dateFns.isWithinInterval(baseTime, { start: min, end: max });
    }
    catch (err) {
        valid = false;
    }
    return valid;
}
function monthDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var previousMonth = dateFns.subMonths(day, 1);
    return ((minDate && dateFns.differenceInCalendarMonths(minDate, previousMonth) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return dateFns.differenceInCalendarMonths(includeDate, previousMonth) > 0;
            })) ||
        false);
}
function monthDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var nextMonth = dateFns.addMonths(day, 1);
    return ((maxDate && dateFns.differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) { return dateFns.differenceInCalendarMonths(nextMonth, includeDate) > 0; })) ||
        false);
}
function quarterDisabledBefore(date, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var firstDateOfYear = dateFns.startOfYear(date);
    var previousQuarter = dateFns.subQuarters(firstDateOfYear, 1);
    return ((minDate && dateFns.differenceInCalendarQuarters(minDate, previousQuarter) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return dateFns.differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
            })) ||
        false);
}
function quarterDisabledAfter(date, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var lastDateOfYear = dateFns.endOfYear(date);
    var nextQuarter = dateFns.addQuarters(lastDateOfYear, 1);
    return ((maxDate && dateFns.differenceInCalendarQuarters(nextQuarter, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return dateFns.differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
            })) ||
        false);
}
function yearDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, includeDates = _b.includeDates;
    var previousYear = dateFns.subYears(day, 1);
    return ((minDate && dateFns.differenceInCalendarYears(minDate, previousYear) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) {
                return dateFns.differenceInCalendarYears(includeDate, previousYear) > 0;
            })) ||
        false);
}
function yearsDisabledBefore(day, _a) {
    var _b = _a === void 0 ? {} : _a, minDate = _b.minDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
    var previousYear = getStartOfYear(dateFns.subYears(day, yearItemNumber));
    var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
    var minDateYear = minDate && dateFns.getYear(minDate);
    return (minDateYear && minDateYear > endPeriod) || false;
}
function yearDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, includeDates = _b.includeDates;
    var nextYear = dateFns.addYears(day, 1);
    return ((maxDate && dateFns.differenceInCalendarYears(nextYear, maxDate) > 0) ||
        (includeDates &&
            includeDates.every(function (includeDate) { return dateFns.differenceInCalendarYears(nextYear, includeDate) > 0; })) ||
        false);
}
function yearsDisabledAfter(day, _a) {
    var _b = _a === void 0 ? {} : _a, maxDate = _b.maxDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
    var nextYear = dateFns.addYears(day, yearItemNumber);
    var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
    var maxDateYear = maxDate && dateFns.getYear(maxDate);
    return (maxDateYear && maxDateYear < startPeriod) || false;
}
function getEffectiveMinDate(_a) {
    var minDate = _a.minDate, includeDates = _a.includeDates;
    if (includeDates && minDate) {
        var minDates = includeDates.filter(function (includeDate) { return dateFns.differenceInCalendarDays(includeDate, minDate) >= 0; });
        return dateFns.min(minDates);
    }
    else if (includeDates) {
        return dateFns.min(includeDates);
    }
    else {
        return minDate;
    }
}
function getEffectiveMaxDate(_a) {
    var maxDate = _a.maxDate, includeDates = _a.includeDates;
    if (includeDates && maxDate) {
        var maxDates = includeDates.filter(function (includeDate) { return dateFns.differenceInCalendarDays(includeDate, maxDate) <= 0; });
        return dateFns.max(maxDates);
    }
    else if (includeDates) {
        return dateFns.max(includeDates);
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
        if (dateFns.isDate(obj)) {
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
        if (!dateFns.isDate(dateObj)) {
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
            injectedTime = dateFns.addHours(injectedTime, dateFns.getHours(injectedTimeValue));
            injectedTime = dateFns.addMinutes(injectedTime, dateFns.getMinutes(injectedTimeValue));
            injectedTime = dateFns.addSeconds(injectedTime, dateFns.getSeconds(injectedTimeValue));
        }
        var nextTime = dateFns.addMinutes(startOfDay, (currentMultiplier + 1) * intervals);
        if (dateFns.isAfter(injectedTime, currentTime) &&
            dateFns.isBefore(injectedTime, nextTime) &&
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
    var endPeriod = Math.ceil(dateFns.getYear(date) / yearItemNumber) * yearItemNumber;
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
    return dateFns.toDate(d.getTime() - seconds * 1000 - milliseconds);
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
    if (!dateFns.isDate(date)) {
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
    if (!dateFns.isDate(date) || !dateFns.isDate(dateToCompare)) {
        throw new Error("Invalid date received");
    }
    var midnightDate = getMidnightDate(date);
    var midnightDateToCompare = getMidnightDate(dateToCompare);
    return dateFns.isBefore(midnightDate, midnightDateToCompare);
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
        _this.inputRef = React__default.default.createRef();
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
            return (React__default.default.createElement("input", { type: "time", className: "react-datepicker-time__input", placeholder: "Time", name: "time-input", ref: _this.inputRef, onClick: function () {
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
                (dateFns.isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))) {
                return isDayInRange(day, selectingDate, endDate);
            }
            if (selectsEnd &&
                startDate &&
                (dateFns.isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
                return isDayInRange(day, startDate, selectingDate);
            }
            if (selectsRange &&
                startDate &&
                !endDate &&
                (dateFns.isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
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
            var weekday = dateFns.getDay(_this.props.day);
            return weekday === 0 || weekday === 6;
        };
        _this.isAfterMonth = function () {
            return (_this.props.month !== undefined &&
                (_this.props.month + 1) % 12 === dateFns.getMonth(_this.props.day));
        };
        _this.isBeforeMonth = function () {
            return (_this.props.month !== undefined &&
                (dateFns.getMonth(_this.props.day) + 1) % 12 === _this.props.month);
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
                ? _this.props.renderDayContents(dateFns.getDate(_this.props.day), _this.props.day)
                : dateFns.getDate(_this.props.day);
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
        var _a = this.props, weekNumber = _a.weekNumber, isWeekDisabled = _a.isWeekDisabled, _b = _a.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? WeekNumber.defaultProps.ariaLabelPrefix : _b, onClick = _a.onClick;
        var weekNumberClasses = {
            "react-datepicker__week-number": true,
            "react-datepicker__week-number--clickable": !!onClick && !isWeekDisabled,
            "react-datepicker__week-number--selected": !!onClick && isSameDay(this.props.date, this.props.selected),
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
        _this.isWeekDisabled = function () {
            var startOfWeek = _this.startOfWeek();
            var endOfWeek = dateFns.addDays(startOfWeek, 6);
            var processingDate = new Date(startOfWeek);
            while (processingDate <= endOfWeek) {
                if (!_this.isDisabled(processingDate))
                    return false;
                processingDate = dateFns.addDays(processingDate, 1);
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
                days.push(React__default.default.createElement(WeekNumber, _assign({ key: "W" }, Week.defaultProps, _this.props, { weekNumber: weekNumber, isWeekDisabled: _this.isWeekDisabled(), date: startOfWeek, onClick: onClickAction })));
            }
            return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
                var day = dateFns.addDays(startOfWeek, offset);
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
            return isSameMonth(dateFns.setMonth(day, m), startDate);
        };
        _this.isRangeStartQuarter = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameQuarter(dateFns.setQuarter(day, q), startDate);
        };
        _this.isRangeEndMonth = function (m) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameMonth(dateFns.setMonth(day, m), endDate);
        };
        _this.isRangeEndQuarter = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate;
            if (!startDate || !endDate) {
                return false;
            }
            return isSameQuarter(dateFns.setQuarter(day, q), endDate);
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
            var _month = dateFns.setMonth(day, m);
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
            var _month = dateFns.setMonth(day, m);
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
            var endOfWeek = dateFns.addDays(startOfWeek, 6);
            return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
        };
        _this.isCurrentMonth = function (day, m) {
            return dateFns.getYear(day) === dateFns.getYear(newDate()) && m === dateFns.getMonth(newDate());
        };
        _this.isCurrentQuarter = function (day, q) {
            return dateFns.getYear(day) === dateFns.getYear(newDate()) && q === dateFns.getQuarter(newDate());
        };
        _this.isSelectedMonth = function (day, m, selected) {
            return dateFns.getMonth(selected) === m && dateFns.getYear(day) === dateFns.getYear(selected);
        };
        _this.isSelectMonthInList = function (day, m, selectedDates) {
            return selectedDates.some(function (selectedDate) {
                return _this.isSelectedMonth(day, m, selectedDate);
            });
        };
        _this.isSelectedQuarter = function (day, q, selected) {
            return dateFns.getQuarter(day) === q && dateFns.getYear(day) === dateFns.getYear(selected);
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
            while (true) {
                weeks.push(React__default.default.createElement(Week, _assign({}, _this.props, { ariaLabelPrefix: _this.props.weekAriaLabelPrefix, key: i, day: currentWeekStart, month: dateFns.getMonth(_this.props.day), onDayClick: _this.handleDayClick, onDayMouseEnter: _this.handleDayMouseEnter, selected: selected, preSelection: preSelection, showWeekNumber: _this.props.showWeekNumbers })));
                if (breakAfterNextPush)
                    break;
                i++;
                currentWeekStart = dateFns.addWeeks(currentWeekStart, 1);
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
                        newCalculatedDate = dateFns.addMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
                        newCalculatedMonth =
                            month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
                        break;
                    case KeyType.ArrowLeft:
                        newCalculatedDate = dateFns.subMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
                        newCalculatedMonth =
                            month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
                        break;
                    case KeyType.ArrowUp:
                        newCalculatedDate = dateFns.subMonths(date, verticalOffset);
                        newCalculatedMonth = ((_a = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[0]) === null || _a === void 0 ? void 0 : _a.includes(month))
                            ? month + 12 - verticalOffset
                            : month - verticalOffset;
                        break;
                    case KeyType.ArrowDown:
                        newCalculatedDate = dateFns.addMonths(date, verticalOffset);
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
            var labelDate = dateFns.setQuarter(_this.props.day, q);
            if (isQuarterDisabled(labelDate, _this.props)) {
                return;
            }
            _this.handleDayClick(getStartOfQuarter(labelDate), event);
        };
        _this.onQuarterMouseEnter = function (q) {
            var labelDate = dateFns.setQuarter(_this.props.day, q);
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
                        _this.handleQuarterNavigation(quarter === 4 ? 1 : quarter + 1, dateFns.addQuarters(_this.props.preSelection, 1));
                        break;
                    case KeyType.ArrowLeft:
                        if (!_this.props.preSelection) {
                            break;
                        }
                        _this.handleQuarterNavigation(quarter === 1 ? 4 : quarter - 1, dateFns.subQuarters(_this.props.preSelection, 1));
                        break;
                }
            }
        };
        _this.isMonthDisabledForLabelDate = function (month) {
            var _a;
            var _b = _this.props, day = _b.day, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
            var labelDate = dateFns.setMonth(day, month);
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
                ? monthClassName(dateFns.setMonth(day, m))
                : undefined;
            var selection = _this.getSelection();
            return clsx.clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
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
            var preSelectedMonth = dateFns.getMonth(_this.props.preSelection);
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
            var preSelectedQuarter = dateFns.getQuarter(_this.props.preSelection);
            var isCurrentQuarterDisabled = isQuarterDisabled(_this.props.day, _this.props);
            var tabIndex = q === preSelectedQuarter &&
                !(isCurrentQuarterDisabled || _this.props.disabledKeyboardNavigation)
                ? "0"
                : "-1";
            return tabIndex;
        };
        _this.getAriaLabel = function (month) {
            var _a = _this.props, _b = _a.chooseDayAriaLabelPrefix, chooseDayAriaLabelPrefix = _b === void 0 ? "Choose" : _b, _c = _a.disabledDayAriaLabelPrefix, disabledDayAriaLabelPrefix = _c === void 0 ? "Not available" : _c, day = _a.day, locale = _a.locale;
            var labelDate = dateFns.setMonth(day, month);
            var prefix = _this.isDisabled(labelDate) || _this.isExcluded(labelDate)
                ? disabledDayAriaLabelPrefix
                : chooseDayAriaLabelPrefix;
            return "".concat(prefix, " ").concat(formatDate(labelDate, "MMMM yyyy", locale));
        };
        _this.getQuarterClassNames = function (q) {
            var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate, selected = _a.selected, minDate = _a.minDate, maxDate = _a.maxDate, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate, preSelection = _a.preSelection, disabledKeyboardNavigation = _a.disabledKeyboardNavigation;
            var isDisabled = (minDate || maxDate || excludeDates || includeDates || filterDate) &&
                isQuarterDisabled(dateFns.setQuarter(day, q), _this.props);
            return clsx.clsx("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
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
                "react-datepicker__quarter-text--today": _this.isCurrentQuarter(day, q),
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
        return (React__default.default.createElement(ClickOutsideWrapper, { className: "react-datepicker__month-dropdown", onClickOutside: this.handleClickOutside }, this.renderOptions()));
    };
    return MonthDropdownOptions;
}(React.Component));

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
        _this.renderDropdown = function (monthNames) { return (React__default.default.createElement(MonthDropdownOptions, _assign({ key: "dropdown" }, _this.props, { monthNames: monthNames, onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
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
    while (!dateFns.isAfter(currDate, lastDate)) {
        list.push(newDate(currDate));
        currDate = dateFns.addMonths(currDate, 1);
    }
    return list;
}
var MonthYearDropdownOptions = /** @class */ (function (_super) {
    __extends(MonthYearDropdownOptions, _super);
    function MonthYearDropdownOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.renderOptions = function () {
            return _this.state.monthYearsList.map(function (monthYear) {
                var monthYearPoint = dateFns.getTime(monthYear);
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
        return (React__default.default.createElement(ClickOutsideWrapper, { className: dropdownClass, onClickOutside: this.handleClickOutside }, this.renderOptions()));
    };
    return MonthYearDropdownOptions;
}(React.Component));

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
            while (!dateFns.isAfter(currDate, lastDate)) {
                var timePoint = dateFns.getTime(currDate);
                options.push(React__default.default.createElement("option", { key: timePoint, value: timePoint }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
                currDate = dateFns.addMonths(currDate, 1);
            }
            return options;
        };
        _this.onSelectChange = function (event) {
            _this.onChange(parseInt(event.target.value));
        };
        _this.renderSelectMode = function () { return (React__default.default.createElement("select", { value: dateFns.getTime(getStartOfMonth(_this.props.date)), className: "react-datepicker__month-year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions())); };
        _this.renderReadView = function (visible) {
            var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
            return (React__default.default.createElement("div", { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-year-read-view", onClick: _this.toggleDropdown },
                React__default.default.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }),
                React__default.default.createElement("span", { className: "react-datepicker__month-year-read-view--selected-month-year" }, yearMonth)));
        };
        _this.renderDropdown = function () { return (React__default.default.createElement(MonthYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
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
                (dateFns.getHours(time) * 3600 + dateFns.getMinutes(time) * 60 + dateFns.getSeconds(time)) %
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
                var currentTime = dateFns.addMinutes(base, i * intervals);
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
        _this.renderTimeCaption = function () {
            if (_this.props.showTimeCaption === false) {
                return React__default.default.createElement(React__default.default.Fragment, null);
            }
            return (React__default.default.createElement("div", { className: "react-datepicker__header react-datepicker__header--time ".concat(_this.props.showTimeSelectOnly
                    ? "react-datepicker__header--time--only"
                    : ""), ref: function (header) {
                    _this.header = header;
                } },
                React__default.default.createElement("div", { className: "react-datepicker-time__header" }, _this.props.timeCaption)));
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
        return (React__default.default.createElement("div", { className: "react-datepicker__time-container ".concat(((_a = this.props.todayButton) !== null && _a !== void 0 ? _a : Time.defaultProps.todayButton)
                ? "react-datepicker__time-container--with-today-button"
                : "") },
            this.renderTimeCaption(),
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
        _this.isCurrentYear = function (y) { return y === dateFns.getYear(newDate()); };
        _this.isRangeStart = function (y) {
            return _this.props.startDate &&
                _this.props.endDate &&
                isSameYear(dateFns.setYear(newDate(), y), _this.props.startDate);
        };
        _this.isRangeEnd = function (y) {
            return _this.props.startDate &&
                _this.props.endDate &&
                isSameYear(dateFns.setYear(newDate(), y), _this.props.endDate);
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
            var _year = dateFns.setYear(newDate(), y);
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
            var _year = dateFns.setYear(newDate(), y);
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
            var date = getStartOfYear(dateFns.setYear(_this.props.date, y));
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
            _this.handleYearClick(getStartOfYear(dateFns.setYear(date, y)), event);
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
                        _this.handleYearNavigation(y + 1, dateFns.addYears(_this.props.preSelection, 1));
                        break;
                    case KeyType.ArrowLeft:
                        if (_this.props.preSelection == null) {
                            break;
                        }
                        _this.handleYearNavigation(y - 1, dateFns.subYears(_this.props.preSelection, 1));
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
                        _this.handleYearNavigation(newYear, dateFns.subYears(_this.props.preSelection, offset));
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
                        _this.handleYearNavigation(newYear, dateFns.addYears(_this.props.preSelection, offset));
                        break;
                    }
                }
            }
            handleOnKeyDown && handleOnKeyDown(event);
        };
        _this.getYearClassNames = function (y) {
            var _a = _this.props, date = _a.date, minDate = _a.minDate, maxDate = _a.maxDate, selected = _a.selected, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate, yearClassName = _a.yearClassName;
            return clsx.clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), date ? yearClassName === null || yearClassName === void 0 ? void 0 : yearClassName(dateFns.setYear(date, y)) : undefined, {
                "react-datepicker__year-text--selected": selected
                    ? y === dateFns.getYear(selected)
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
            var preSelected = dateFns.getYear(_this.props.preSelection);
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
        return (React__default.default.createElement("div", { className: "react-datepicker__year" },
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
            isInRange = dateFns.getYear(minDate) <= newYear;
        }
        if (maxDate && isInRange) {
            isInRange = dateFns.getYear(maxDate) >= newYear;
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
            var minYear = _this.props.minDate ? dateFns.getYear(_this.props.minDate) : null;
            var maxYear = _this.props.maxDate ? dateFns.getYear(_this.props.maxDate) : null;
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
        return (React__default.default.createElement(ClickOutsideWrapper, { className: dropdownClass, containerRef: this.dropdownRef, onClickOutside: this.handleClickOutside }, this.renderOptions()));
    };
    return YearDropdownOptions;
}(React.Component));

var YearDropdown = /** @class */ (function (_super) {
    __extends(YearDropdown, _super);
    function YearDropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownVisible: false,
        };
        _this.renderSelectOptions = function () {
            var minYear = _this.props.minDate
                ? dateFns.getYear(_this.props.minDate)
                : 1900;
            var maxYear = _this.props.maxDate
                ? dateFns.getYear(_this.props.maxDate)
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
        _this.renderDropdown = function () { return (React__default.default.createElement(YearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }))); };
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
                if (minDate && dateFns.isBefore(current, minDate)) {
                    return minDate;
                }
                else if (maxDate && dateFns.isAfter(current, maxDate)) {
                    return maxDate;
                }
            }
            return current;
        };
        _this.increaseMonth = function () {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: dateFns.addMonths(date, 1),
                });
            }, function () { return _this.handleMonthChange(_this.state.date); });
        };
        _this.decreaseMonth = function () {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: dateFns.subMonths(date, 1),
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
            _this.setState({ selectingDate: dateFns.setYear(newDate(), year) });
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
            var totalDays = dateFns.differenceInDays(endOfMonth, startOfMonth);
            var preSelectedDate = null;
            for (var dayIdx = 0; dayIdx <= totalDays; dayIdx++) {
                var processingDate = dateFns.addDays(startOfMonth, dayIdx);
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
                    date: dateFns.setYear(date, Number(year)),
                });
            }, function () { return _this.handleYearChange(_this.state.date); });
        };
        _this.changeMonth = function (month) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: dateFns.setMonth(date, Number(month)),
                });
            }, function () { return _this.handleMonthChange(_this.state.date); });
        };
        _this.changeMonthYear = function (monthYear) {
            _this.setState(function (_a) {
                var date = _a.date;
                return ({
                    date: dateFns.setYear(dateFns.setMonth(date, dateFns.getMonth(monthYear)), dateFns.getYear(monthYear)),
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
                var day = dateFns.addDays(startOfWeek, offset);
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
                    date: dateFns.subYears(date, _this.props.showYearPicker
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
            var fromMonthDate = dateFns.subMonths(_this.state.date, monthSelectedIn);
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
            return (React__default.default.createElement("button", { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel },
                React__default.default.createElement("span", { className: iconClasses.join(" ") }, isForYear ? previousYearButtonLabel : previousMonthButtonLabel)));
        };
        _this.increaseYear = function () {
            _this.setState(function (_a) {
                var _b;
                var date = _a.date;
                return ({
                    date: dateFns.addYears(date, _this.props.showYearPicker
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
            return (React__default.default.createElement(YearDropdown, _assign({}, Calendar.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeYear, year: dateFns.getYear(_this.state.date) })));
        };
        _this.renderMonthDropdown = function (overrideHide) {
            if (overrideHide === void 0) { overrideHide = false; }
            if (!_this.props.showMonthDropdown || overrideHide) {
                return;
            }
            return (React__default.default.createElement(MonthDropdown, _assign({}, Calendar.defaultProps, _this.props, { month: dateFns.getMonth(_this.state.date), onChange: _this.changeMonth })));
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
            return (React__default.default.createElement("div", { className: "react-datepicker__header react-datepicker-year-header" }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : dateFns.getYear(monthDate)));
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
                ? dateFns.addYears(_this.state.date, monthsToSubtract)
                : dateFns.subMonths(_this.state.date, monthsToSubtract);
            var monthSelectedIn = (_b = _this.props.monthSelectedIn) !== null && _b !== void 0 ? _b : monthsToSubtract;
            for (var i = 0; i < monthsShown; ++i) {
                var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
                var monthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
                    ? dateFns.addYears(fromMonthDate, monthsToAdd)
                    : dateFns.addMonths(fromMonthDate, monthsToAdd);
                var monthKey = "month-".concat(i);
                var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
                var monthShowsDuplicateDaysStart = i > 0;
                monthList.push(React__default.default.createElement("div", { key: monthKey, ref: function (div) {
                        _this.monthContainer = div !== null && div !== void 0 ? div : undefined;
                    }, className: "react-datepicker__month-container" },
                    _this.renderHeader({ monthDate: monthDate, i: i }),
                    React__default.default.createElement(Month, _assign({}, Calendar.defaultProps, _this.props, { containerRef: _this.containerRef, ariaLabelPrefix: _this.props.monthAriaLabelPrefix, day: monthDate, onDayClick: _this.handleDayClick, handleOnKeyDown: _this.props.handleOnDayKeyDown, handleOnMonthKeyDown: _this.props.handleOnKeyDown, onDayMouseEnter: _this.handleDayMouseEnter, onMouseLeave: _this.handleMonthMouseLeave, orderInDisplay: i, selectingDate: _this.state.selectingDate, monthShowsDuplicateDaysEnd: monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart: monthShowsDuplicateDaysStart }))));
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
                ariaLiveMessage = dateFns.getYear(_this.state.date);
            }
            else {
                ariaLiveMessage = "".concat(getMonthInLocale(dateFns.getMonth(_this.state.date), _this.props.locale), " ").concat(dateFns.getYear(_this.state.date));
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
        return (React__default.default.createElement(ClickOutsideWrapper, { onClickOutside: this.handleClickOutside, style: { display: "contents" }, ignoreClass: this.props.outsideClickIgnoreClass },
            React__default.default.createElement("div", { style: { display: "contents" }, ref: this.containerRef },
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
                    this.renderChildren()))));
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
        var iconElement_1 = icon;
        return React__default.default.cloneElement(iconElement_1, {
            className: "".concat(iconElement_1.props.className || "", " ").concat(defaultClass, " ").concat(className),
            onClick: function (event) {
                if (typeof iconElement_1.props.onClick === "function") {
                    iconElement_1.props.onClick(event);
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
// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
    if (date1 && date2) {
        return (dateFns.getMonth(date1) !== dateFns.getMonth(date2) || dateFns.getYear(date1) !== dateFns.getYear(date2));
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
            var boundedPreSelection = minDate && dateFns.isBefore(defaultPreSelection, getStartOfDay(minDate))
                ? minDate
                : maxDate && dateFns.isAfter(defaultPreSelection, getEndOfDay(maxDate))
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
            var _a, _b;
            (_b = (_a = _this.input) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a, { preventScroll: true });
        };
        _this.setBlur = function () {
            var _a, _b;
            (_b = (_a = _this.input) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
            _this.cancelFocusInput();
        };
        _this.deferBlur = function () {
            requestAnimationFrame(function () {
                _this.setBlur();
            });
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
                        !skipSetBlur && _this.deferBlur();
                        _this.setState({ inputValue: null });
                    });
                }
            });
        };
        _this.inputOk = function () { return dateFns.isDate(_this.state.preSelection); };
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
            if (!_this.state.preventFocus) {
                (_b = (_a = _this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                if (isOpenAllowed &&
                    !_this.props.preventOpenOnFocus &&
                    !_this.props.readOnly) {
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
            if (_this.state.open && _this.props.open === false) {
                _this.setOpen(false);
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
            var _a, _b, _c, _d, _e;
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
            var _f = _this.props, selectsRange = _f.selectsRange, startDate = _f.startDate, endDate = _f.endDate;
            var dateFormat = (_a = _this.props.dateFormat) !== null && _a !== void 0 ? _a : DatePicker.defaultProps.dateFormat;
            var strictParsing = (_b = _this.props.strictParsing) !== null && _b !== void 0 ? _b : DatePicker.defaultProps.strictParsing;
            var value = (event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : "";
            if (selectsRange) {
                var _g = value
                    .split("-", 2)
                    .map(function (val) { return val.trim(); }), valueStart = _g[0], valueEnd = _g[1];
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
                (_d = (_c = _this.props).onChange) === null || _d === void 0 ? void 0 : _d.call(_c, [startDateNew, endDateNew], event);
            }
            else {
                // not selectsRange
                var date = parseDate(value, dateFormat, _this.props.locale, strictParsing, (_e = _this.props.selected) !== null && _e !== void 0 ? _e : undefined);
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
                    isYearDisabled(dateFns.getYear(changedDate), _this.props)) {
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
                            hour: dateFns.getHours(_this.props.selected),
                            minute: dateFns.getMinutes(_this.props.selected),
                            second: dateFns.getSeconds(_this.props.selected),
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
            var hasMinDate = dateFns.isDate(_this.props.minDate);
            var hasMaxDate = dateFns.isDate(_this.props.maxDate);
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
                        dateFns.isAfter(date, minDateStartOfDay) ||
                            isEqual(dateStartOfDay, minDateStartOfDay);
                }
                else if (hasMaxDate) {
                    var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
                    isValidDateSelection =
                        dateFns.isBefore(date, maxDateEndOfDay) ||
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
                    hour: dateFns.getHours(time),
                    minute: dateFns.getMinutes(time),
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
                            ? dateFns.addWeeks(date, 1)
                            : dateFns.addDays(date, 1);
                        break;
                    case KeyType.ArrowLeft:
                        newCalculatedDate = showWeekPicker
                            ? dateFns.subWeeks(date, 1)
                            : dateFns.subDays(date, 1);
                        break;
                    case KeyType.ArrowUp:
                        newCalculatedDate = dateFns.subWeeks(date, 1);
                        break;
                    case KeyType.ArrowDown:
                        newCalculatedDate = dateFns.addWeeks(date, 1);
                        break;
                    case KeyType.PageUp:
                        newCalculatedDate = isShiftKeyActive
                            ? dateFns.subYears(date, 1)
                            : dateFns.subMonths(date, 1);
                        break;
                    case KeyType.PageDown:
                        newCalculatedDate = isShiftKeyActive
                            ? dateFns.addYears(date, 1)
                            : dateFns.addMonths(date, 1);
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
                var prevMonth = dateFns.getMonth(copy);
                var newMonth = dateFns.getMonth(newSelection);
                var prevYear = dateFns.getYear(copy);
                var newYear = dateFns.getYear(newSelection);
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
            return (React__default.default.createElement(Calendar, _assign({ showMonthYearDropdown: undefined, ref: function (elem) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLnRzeCIsIi4uL3NyYy9jbGlja19vdXRzaWRlX3dyYXBwZXIudHN4IiwiLi4vc3JjL2RhdGVfdXRpbHMudHMiLCIuLi9zcmMvaW5wdXRfdGltZS50c3giLCIuLi9zcmMvZGF5LnRzeCIsIi4uL3NyYy93ZWVrX251bWJlci50c3giLCIuLi9zcmMvd2Vlay50c3giLCIuLi9zcmMvbW9udGgudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd24udHN4IiwiLi4vc3JjL3RpbWUudHN4IiwiLi4vc3JjL3llYXIudHN4IiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvY2FsZW5kYXIudHN4IiwiLi4vc3JjL2NhbGVuZGFyX2ljb24udHN4IiwiLi4vc3JjL3BvcnRhbC50c3giLCIuLi9zcmMvdGFiX2xvb3AudHN4IiwiLi4vc3JjL3dpdGhfZmxvYXRpbmcudHN4IiwiLi4vc3JjL3BvcHBlcl9jb21wb25lbnQudHN4IiwiLi4vc3JjL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XHJcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xyXG4gICAgICAgIHJldHVybiBhcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3duS2V5cyhvKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9fZXh0ZW5kczogX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ246IF9fYXNzaWduLFxyXG4gICAgX19yZXN0OiBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlOiBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbTogX19wYXJhbSxcclxuICAgIF9fZXNEZWNvcmF0ZTogX19lc0RlY29yYXRlLFxyXG4gICAgX19ydW5Jbml0aWFsaXplcnM6IF9fcnVuSW5pdGlhbGl6ZXJzLFxyXG4gICAgX19wcm9wS2V5OiBfX3Byb3BLZXksXHJcbiAgICBfX3NldEZ1bmN0aW9uTmFtZTogX19zZXRGdW5jdGlvbk5hbWUsXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbiAgICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbjogX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXHJcbn07XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiZXh0ZW5kU3RhdGljcyIsImQiLCJiIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJBcnJheSIsInAiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfX2V4dGVuZHMiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwiX19hc3NpZ24iLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXBwbHkiLCJfX3NwcmVhZEFycmF5IiwidG8iLCJmcm9tIiwicGFjayIsImwiLCJhciIsInNsaWNlIiwiY29uY2F0IiwiU3VwcHJlc3NlZEVycm9yIiwiZXJyb3IiLCJzdXBwcmVzc2VkIiwibWVzc2FnZSIsImUiLCJFcnJvciIsIm5hbWUiLCJSZWFjdCIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlRWZmZWN0IiwicGFyc2VJU08iLCJ0b0RhdGUiLCJwYXJzZSIsImlzVmFsaWREYXRlIiwiaXNCZWZvcmUiLCJmb3JtYXQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwiZ2V0SVNPV2VlayIsInN0YXJ0T2ZEYXkiLCJzdGFydE9mV2VlayIsInN0YXJ0T2ZNb250aCIsInN0YXJ0T2ZZZWFyIiwic3RhcnRPZlF1YXJ0ZXIiLCJlbmRPZkRheSIsImVuZE9mV2VlayIsImVuZE9mTW9udGgiLCJkZklzU2FtZVllYXIiLCJkZklzU2FtZU1vbnRoIiwiZGZJc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVEYXkiLCJkZklzRXF1YWwiLCJpc1dpdGhpbkludGVydmFsIiwic2V0TW9udGgiLCJzZXRRdWFydGVyIiwiZ2V0WWVhciIsImdldE1vbnRoIiwiZW5kT2ZZZWFyIiwiZ2V0UXVhcnRlciIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJzdWJNb250aHMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyIsImFkZE1vbnRocyIsInN1YlF1YXJ0ZXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyIsImFkZFF1YXJ0ZXJzIiwic3ViWWVhcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIiwiYWRkWWVhcnMiLCJtaW4iLCJtYXgiLCJpc0RhdGUiLCJhZGRIb3VycyIsImFkZE1pbnV0ZXMiLCJhZGRTZWNvbmRzIiwiaXNBZnRlciIsImNsb25lRWxlbWVudCIsIkNvbXBvbmVudCIsImNyZWF0ZVJlZiIsImdldERheSIsImNsc3giLCJnZXREYXRlIiwiYWRkRGF5cyIsImFkZFdlZWtzIiwiZ2V0VGltZSIsInNldFllYXIiLCJkaWZmZXJlbmNlSW5EYXlzIiwiUmVhY3RET00iLCJ1c2VGbG9hdGluZyIsImF1dG9VcGRhdGUiLCJmbGlwIiwib2Zmc2V0IiwiYXJyb3ciLCJGbG9hdGluZ0Fycm93IiwiY3JlYXRlRWxlbWVudCIsInN1YldlZWtzIiwic3ViRGF5cyIsIlBvcHBlckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LEtBQUksQ0FBQyxVQUFVO2dCQUN2QixFQUFRLENBQUEsUUFBQSxHQUFFLEtBQUksQ0FBQyxZQUFZO2dCQUMzQixFQUFPLENBQUEsT0FBQSxHQUFFLEtBQUksQ0FBQyxZQUFZO2dCQUMxQixFQUFPLENBQUEsT0FBQSxHQUFFLEtBQUksQ0FBQyxXQUFXO2dCQUN6QixFQUFTLENBQUEsU0FBQSxHQUFFLEtBQUksQ0FBQyxjQUFjO0FBQzlCLGdCQUFBLEVBQUEsQ0FBQSxFQUFFLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2pCLGdCQUFBLEVBQUEsQ0FBQSxJQUFJLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO0FBQ3JCLGdCQUFBLEVBQUEsQ0FBQSxJQUFJLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO0FBQ3JCLGdCQUFBLEVBQUEsQ0FBQSxTQUFTLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQy9CLGdCQUFBLEVBQUEsQ0FBQSxXQUFXLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlO0FBQ3ZDLGdCQUFBLEVBQUEsQ0FBQSxRQUFRLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQzdCLGdCQUFBLEVBQUEsQ0FBQSxZQUFZLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO2dCQUNyQyxFQUFTLENBQUEsU0FBQSxHQUFFSSxTQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO0FBQ3ZELGdCQUFBLEVBQUEsQ0FBQSxLQUFLLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQ3ZCLGdCQUFBLEVBQUEsQ0FBQSxRQUFRLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQzdCLGdCQUFBLEVBQUEsQ0FBQSxRQUFRLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQzdCLGdCQUFBLEVBQUEsQ0FBQSxRQUFRLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQzdCLGdCQUFB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
