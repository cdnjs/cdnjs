/*!
  react-datepicker v8.4.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('clsx'), require('react'), require('date-fns'), require('@floating-ui/react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['exports', 'clsx', 'react', 'date-fns', '@floating-ui/react', 'react-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DatePicker = {}, global.clsx, global.React, global.dateFns, global.FloatingUIReact, global.ReactDOM));
})(this, (function (exports, clsx, React, dateFns, react, ReactDOM) { 'use strict';

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
     * Used as a delimiter to separate two dates when formatting a date range
     */
    var DATE_RANGE_SEPARATOR = " - ";
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
        return "".concat(formattedStartDate).concat(DATE_RANGE_SEPARATOR).concat(formattedEndDate);
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
            _this.isMonthSelected = function () {
                var _a = _this.props, day = _a.day, selected = _a.selected, selectedDates = _a.selectedDates, selectsMultiple = _a.selectsMultiple;
                var monthIdx = dateFns.getMonth(day);
                if (selectsMultiple) {
                    return selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.some(function (date) {
                        return _this.isSelectedMonth(day, monthIdx, date);
                    });
                }
                return !!selected && _this.isSelectedMonth(day, monthIdx, selected);
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
                        !_this.isMonthSelected() &&
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
            this.observeDatePickerHeightChanges();
        };
        Time.prototype.componentWillUnmount = function () {
            var _a;
            (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
        Time.prototype.observeDatePickerHeightChanges = function () {
            var _this = this;
            var monthRef = this.props.monthRef;
            this.updateContainerHeight();
            if (monthRef) {
                this.resizeObserver = new ResizeObserver(function () {
                    _this.updateContainerHeight();
                });
                this.resizeObserver.observe(monthRef);
            }
        };
        Time.prototype.updateContainerHeight = function () {
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
            _this.isSelectedYear = function (year) {
                var _a = _this.props, selectsMultiple = _a.selectsMultiple, selected = _a.selected, selectedDates = _a.selectedDates;
                if (selectsMultiple) {
                    return selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.some(function (date) { return year === dateFns.getYear(date); });
                }
                return !!selected && year === dateFns.getYear(selected);
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
                var _a = _this.props, date = _a.date, minDate = _a.minDate, maxDate = _a.maxDate, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate, yearClassName = _a.yearClassName;
                return clsx.clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), date ? yearClassName === null || yearClassName === void 0 ? void 0 : yearClassName(dateFns.setYear(date, y)) : undefined, {
                    "react-datepicker__year-text--selected": _this.isSelectedYear(y),
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
                        .split(dateFormat.includes("-") ? DATE_RANGE_SEPARATOR : "-", 2)
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
                if (_this.props.readOnly)
                    return;
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
                if (_this.props.readOnly)
                    return;
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
                    _this.setOpen(false);
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
                var _a = _this.props, isClearable = _a.isClearable, disabled = _a.disabled, selected = _a.selected, startDate = _a.startDate, endDate = _a.endDate, clearButtonTitle = _a.clearButtonTitle, _b = _a.clearButtonClassName, clearButtonClassName = _b === void 0 ? "" : _b, _c = _a.ariaLabelClose, ariaLabelClose = _c === void 0 ? "Close" : _c, selectedDates = _a.selectedDates, readOnly = _a.readOnly;
                if (isClearable &&
                    !readOnly &&
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

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIudHN4IiwiLi4vc3JjL2NsaWNrX291dHNpZGVfd3JhcHBlci50c3giLCIuLi9zcmMvZGF0ZV91dGlscy50cyIsIi4uL3NyYy9pbnB1dF90aW1lLnRzeCIsIi4uL3NyYy9kYXkudHN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLnRzeCIsIi4uL3NyYy93ZWVrLnRzeCIsIi4uL3NyYy9tb250aC50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd24udHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvdGltZS50c3giLCIuLi9zcmMveWVhci50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9jYWxlbmRhci50c3giLCIuLi9zcmMvY2FsZW5kYXJfaWNvbi50c3giLCIuLi9zcmMvcG9ydGFsLnRzeCIsIi4uL3NyYy90YWJfbG9vcC50c3giLCIuLi9zcmMvd2l0aF9mbG9hdGluZy50c3giLCIuLi9zcmMvcG9wcGVyX2NvbXBvbmVudC50c3giLCIuLi9zcmMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcclxuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcclxuICAgIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xyXG4gICAgICAgIHZhciBhciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XHJcbiAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBvd25LZXlzKG8pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XHJcbiAgICAgICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xyXG4gICAgZnVuY3Rpb24gZmFpbChlKSB7XHJcbiAgICAgICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xyXG4gICAgICAgIGVudi5oYXNFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB2YXIgciwgcyA9IDA7XHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgcyB8PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19lc0RlY29yYXRlOiBfX2VzRGVjb3JhdGUsXHJcbiAgICBfX3J1bkluaXRpYWxpemVyczogX19ydW5Jbml0aWFsaXplcnMsXHJcbiAgICBfX3Byb3BLZXk6IF9fcHJvcEtleSxcclxuICAgIF9fc2V0RnVuY3Rpb25OYW1lOiBfX3NldEZ1bmN0aW9uTmFtZSxcclxuICAgIF9fbWV0YWRhdGE6IF9fbWV0YWRhdGEsXHJcbiAgICBfX2F3YWl0ZXI6IF9fYXdhaXRlcixcclxuICAgIF9fZ2VuZXJhdG9yOiBfX2dlbmVyYXRvcixcclxuICAgIF9fY3JlYXRlQmluZGluZzogX19jcmVhdGVCaW5kaW5nLFxyXG4gICAgX19leHBvcnRTdGFyOiBfX2V4cG9ydFN0YXIsXHJcbiAgICBfX3ZhbHVlczogX192YWx1ZXMsXHJcbiAgICBfX3JlYWQ6IF9fcmVhZCxcclxuICAgIF9fc3ByZWFkOiBfX3NwcmVhZCxcclxuICAgIF9fc3ByZWFkQXJyYXlzOiBfX3NwcmVhZEFycmF5cyxcclxuICAgIF9fc3ByZWFkQXJyYXk6IF9fc3ByZWFkQXJyYXksXHJcbiAgICBfX2F3YWl0OiBfX2F3YWl0LFxyXG4gICAgX19hc3luY0dlbmVyYXRvcjogX19hc3luY0dlbmVyYXRvcixcclxuICAgIF9fYXN5bmNEZWxlZ2F0b3I6IF9fYXN5bmNEZWxlZ2F0b3IsXHJcbiAgICBfX2FzeW5jVmFsdWVzOiBfX2FzeW5jVmFsdWVzLFxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3Q6IF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxyXG4gICAgX19pbXBvcnRTdGFyOiBfX2ltcG9ydFN0YXIsXHJcbiAgICBfX2ltcG9ydERlZmF1bHQ6IF9faW1wb3J0RGVmYXVsdCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEluOiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXHJcbiAgICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZTogX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXHJcbiAgICBfX2Rpc3Bvc2VSZXNvdXJjZXM6IF9fZGlzcG9zZVJlc291cmNlcyxcclxuICAgIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uOiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcclxufTtcclxuIixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJleHRlbmRTdGF0aWNzIiwiZCIsImIiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIl9fZXh0ZW5kcyIsIlR5cGVFcnJvciIsIlN0cmluZyIsIl9fIiwiY29uc3RydWN0b3IiLCJjcmVhdGUiLCJfX2Fzc2lnbiIsImFzc2lnbiIsInQiLCJzIiwiaSIsIm4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcHBseSIsIl9fc3ByZWFkQXJyYXkiLCJ0byIsImZyb20iLCJwYWNrIiwibCIsImFyIiwic2xpY2UiLCJjb25jYXQiLCJTdXBwcmVzc2VkRXJyb3IiLCJlcnJvciIsInN1cHByZXNzZWQiLCJtZXNzYWdlIiwiZSIsIkVycm9yIiwibmFtZSIsIlJlYWN0IiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJwYXJzZUlTTyIsInRvRGF0ZSIsInBhcnNlIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRJU09XZWVrIiwic3RhcnRPZkRheSIsInN0YXJ0T2ZXZWVrIiwic3RhcnRPZk1vbnRoIiwic3RhcnRPZlllYXIiLCJzdGFydE9mUXVhcnRlciIsImVuZE9mRGF5IiwiZW5kT2ZXZWVrIiwiZW5kT2ZNb250aCIsImRmSXNTYW1lWWVhciIsImRmSXNTYW1lTW9udGgiLCJkZklzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZURheSIsImRmSXNFcXVhbCIsImlzV2l0aGluSW50ZXJ2YWwiLCJzZXRNb250aCIsInNldFF1YXJ0ZXIiLCJnZXRZZWFyIiwiZ2V0TW9udGgiLCJlbmRPZlllYXIiLCJnZXRRdWFydGVyIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiYWRkTW9udGhzIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwiYWRkUXVhcnRlcnMiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJhZGRZZWFycyIsIm1pbiIsIm1heCIsImlzRGF0ZSIsImFkZEhvdXJzIiwiYWRkTWludXRlcyIsImFkZFNlY29uZHMiLCJpc0FmdGVyIiwiY2xvbmVFbGVtZW50IiwiQ29tcG9uZW50IiwiY3JlYXRlUmVmIiwiZ2V0RGF5IiwiY2xzeCIsImdldERhdGUiLCJhZGREYXlzIiwiYWRkV2Vla3MiLCJnZXRUaW1lIiwic2V0WWVhciIsImRpZmZlcmVuY2VJbkRheXMiLCJSZWFjdERPTSIsInVzZUZsb2F0aW5nIiwiYXV0b1VwZGF0ZSIsImZsaXAiLCJvZmZzZXQiLCJhcnJvdyIsIkZsb2F0aW5nQXJyb3ciLCJjcmVhdGVFbGVtZW50Iiwic3ViV2Vla3MiLCJzdWJEYXlzIiwiUG9wcGVyQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQUE7SUFDQTtBQUNBO0lBQ0E7SUFDQTtBQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7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
