/*!
  react-datepicker v7.1.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('clsx'), require('react'), require('react-onclickoutside'), require('date-fns/addDays'), require('date-fns/addHours'), require('date-fns/addMinutes'), require('date-fns/addMonths'), require('date-fns/addQuarters'), require('date-fns/addSeconds'), require('date-fns/addWeeks'), require('date-fns/addYears'), require('date-fns/differenceInCalendarDays'), require('date-fns/differenceInCalendarMonths'), require('date-fns/differenceInCalendarQuarters'), require('date-fns/differenceInCalendarYears'), require('date-fns/endOfDay'), require('date-fns/endOfMonth'), require('date-fns/endOfWeek'), require('date-fns/endOfYear'), require('date-fns/format'), require('date-fns/getDate'), require('date-fns/getDay'), require('date-fns/getHours'), require('date-fns/getISOWeek'), require('date-fns/getMinutes'), require('date-fns/getMonth'), require('date-fns/getQuarter'), require('date-fns/getSeconds'), require('date-fns/getTime'), require('date-fns/getYear'), require('date-fns/isAfter'), require('date-fns/isBefore'), require('date-fns/isDate'), require('date-fns/isEqual'), require('date-fns/isSameDay'), require('date-fns/isSameMonth'), require('date-fns/isSameQuarter'), require('date-fns/isSameYear'), require('date-fns/isValid'), require('date-fns/isWithinInterval'), require('date-fns/max'), require('date-fns/min'), require('date-fns/parse'), require('date-fns/parseISO'), require('date-fns/set'), require('date-fns/setHours'), require('date-fns/setMinutes'), require('date-fns/setMonth'), require('date-fns/setQuarter'), require('date-fns/setSeconds'), require('date-fns/setYear'), require('date-fns/startOfDay'), require('date-fns/startOfMonth'), require('date-fns/startOfQuarter'), require('date-fns/startOfWeek'), require('date-fns/startOfYear'), require('date-fns/subDays'), require('date-fns/subMonths'), require('date-fns/subQuarters'), require('date-fns/subWeeks'), require('date-fns/subYears'), require('date-fns/toDate'), require('@floating-ui/react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['exports', 'clsx', 'react', 'react-onclickoutside', 'date-fns/addDays', 'date-fns/addHours', 'date-fns/addMinutes', 'date-fns/addMonths', 'date-fns/addQuarters', 'date-fns/addSeconds', 'date-fns/addWeeks', 'date-fns/addYears', 'date-fns/differenceInCalendarDays', 'date-fns/differenceInCalendarMonths', 'date-fns/differenceInCalendarQuarters', 'date-fns/differenceInCalendarYears', 'date-fns/endOfDay', 'date-fns/endOfMonth', 'date-fns/endOfWeek', 'date-fns/endOfYear', 'date-fns/format', 'date-fns/getDate', 'date-fns/getDay', 'date-fns/getHours', 'date-fns/getISOWeek', 'date-fns/getMinutes', 'date-fns/getMonth', 'date-fns/getQuarter', 'date-fns/getSeconds', 'date-fns/getTime', 'date-fns/getYear', 'date-fns/isAfter', 'date-fns/isBefore', 'date-fns/isDate', 'date-fns/isEqual', 'date-fns/isSameDay', 'date-fns/isSameMonth', 'date-fns/isSameQuarter', 'date-fns/isSameYear', 'date-fns/isValid', 'date-fns/isWithinInterval', 'date-fns/max', 'date-fns/min', 'date-fns/parse', 'date-fns/parseISO', 'date-fns/set', 'date-fns/setHours', 'date-fns/setMinutes', 'date-fns/setMonth', 'date-fns/setQuarter', 'date-fns/setSeconds', 'date-fns/setYear', 'date-fns/startOfDay', 'date-fns/startOfMonth', 'date-fns/startOfQuarter', 'date-fns/startOfWeek', 'date-fns/startOfYear', 'date-fns/subDays', 'date-fns/subMonths', 'date-fns/subQuarters', 'date-fns/subWeeks', 'date-fns/subYears', 'date-fns/toDate', '@floating-ui/react', 'react-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DatePicker = {}, global.clsx, global.React, global.onClickOutside, global.addDays, global.addHours, global.addMinutes, global.addMonths, global.addQuarters, global.addSeconds, global.addWeeks, global.addYears, global.differenceInCalendarDays, global.differenceInCalendarMonths, global.differenceInCalendarQuarters, global.differenceInCalendarYears, global.endOfDay, global.endOfMonth, global.endOfWeek, global.endOfYear, global.format, global.getDate, global.getDay, global.getHours, global.getISOWeek, global.getMinutes, global.getMonth, global.getQuarter, global.getSeconds, global.getTime, global.getYear, global.isAfter, global.isBefore, global.isDate, global.isEqual$1, global.isSameDay$1, global.isSameMonth$1, global.isSameQuarter$1, global.isSameYear$1, global.isValid$1, global.isWithinInterval, global.max, global.min, global.parse, global.parseISO, global.set, global.setHours, global.setMinutes, global.setMonth, global.setQuarter, global.setSeconds, global.setYear, global.startOfDay, global.startOfMonth, global.startOfQuarter, global.startOfWeek, global.startOfYear, global.subDays, global.subMonths, global.subQuarters, global.subWeeks, global.subYears, global.toDate, global.react, global.ReactDOM));
})(this, (function (exports, clsx, React, onClickOutside, addDays, addHours, addMinutes, addMonths, addQuarters, addSeconds, addWeeks, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarQuarters, differenceInCalendarYears, endOfDay, endOfMonth, endOfWeek, endOfYear, format, getDate, getDay, getHours, getISOWeek, getMinutes, getMonth, getQuarter, getSeconds, getTime, getYear, isAfter, isBefore, isDate, isEqual$1, isSameDay$1, isSameMonth$1, isSameQuarter$1, isSameYear$1, isValid$1, isWithinInterval, max, min, parse, parseISO, set, setHours, setMinutes, setMonth, setQuarter, setSeconds, setYear, startOfDay, startOfMonth, startOfQuarter, startOfWeek, startOfYear, subDays, subMonths, subQuarters, subWeeks, subYears, toDate, react, ReactDOM) { 'use strict';

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

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIudHN4IiwiLi4vc3JjL2RhdGVfdXRpbHMudHMiLCIuLi9zcmMvaW5wdXRfdGltZS50c3giLCIuLi9zcmMvZGF5LnRzeCIsIi4uL3NyYy93ZWVrX251bWJlci50c3giLCIuLi9zcmMvd2Vlay50c3giLCIuLi9zcmMvbW9udGgudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd24udHN4IiwiLi4vc3JjL3RpbWUudHN4IiwiLi4vc3JjL3llYXIudHN4IiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvY2FsZW5kYXIudHN4IiwiLi4vc3JjL2NhbGVuZGFyX2ljb24udHN4IiwiLi4vc3JjL3BvcnRhbC50c3giLCIuLi9zcmMvdGFiX2xvb3AudHN4IiwiLi4vc3JjL3dpdGhfZmxvYXRpbmcudHN4IiwiLi4vc3JjL3BvcHBlcl9jb21wb25lbnQudHN4IiwiLi4vc3JjL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XHJcbiAgICAgICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xyXG4gICAgZnVuY3Rpb24gZmFpbChlKSB7XHJcbiAgICAgICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xyXG4gICAgICAgIGVudi5oYXNFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIHdoaWxlIChlbnYuc3RhY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciByZWMgPSBlbnYuc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVjLmRpc3Bvc2UgJiYgcmVjLmRpc3Bvc2UuY2FsbChyZWMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlYy5hc3luYykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbn07XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sIm5hbWVzIjpbImV4dGVuZFN0YXRpY3MiLCJkIiwiYiIsIk9iamVjdCIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiQXJyYXkiLCJwIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiX19leHRlbmRzIiwiVHlwZUVycm9yIiwiU3RyaW5nIiwiX18iLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIl9fYXNzaWduIiwiYXNzaWduIiwidCIsInMiLCJpIiwibiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFwcGx5IiwiX19zcHJlYWRBcnJheSIsInRvIiwiZnJvbSIsInBhY2siLCJsIiwiYXIiLCJzbGljZSIsImNvbmNhdCIsIlN1cHByZXNzZWRFcnJvciIsImVycm9yIiwic3VwcHJlc3NlZCIsIm1lc3NhZ2UiLCJlIiwiRXJyb3IiLCJuYW1lIiwiUmVhY3QiLCJwYXJzZUlTTyIsInRvRGF0ZSIsInBhcnNlIiwibG9uZ0Zvcm1hdHRlcnMiLCJpc1ZhbGlkRGF0ZSIsImlzQmVmb3JlIiwiZm9ybWF0Iiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsImdldElTT1dlZWsiLCJzdGFydE9mRGF5Iiwic3RhcnRPZldlZWsiLCJzdGFydE9mTW9udGgiLCJzdGFydE9mWWVhciIsInN0YXJ0T2ZRdWFydGVyIiwiZW5kT2ZEYXkiLCJlbmRPZldlZWsiLCJkZklzU2FtZVllYXIiLCJkZklzU2FtZU1vbnRoIiwiZGZJc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVEYXkiLCJkZklzRXF1YWwiLCJpc1dpdGhpbkludGVydmFsIiwic2V0TW9udGgiLCJzZXRRdWFydGVyIiwiZW5kT2ZNb250aCIsImdldFllYXIiLCJnZXRNb250aCIsImVuZE9mWWVhciIsImdldFF1YXJ0ZXIiLCJkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwic3ViTW9udGhzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMiLCJhZGRNb250aHMiLCJzdWJRdWFydGVycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMiLCJhZGRRdWFydGVycyIsInN1YlllYXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyIsImFkZFllYXJzIiwibWluIiwibWF4IiwiaXNEYXRlIiwiYWRkSG91cnMiLCJhZGRNaW51dGVzIiwiYWRkU2Vjb25kcyIsImlzQWZ0ZXIiLCJjbG9uZUVsZW1lbnQiLCJDb21wb25lbnQiLCJjcmVhdGVSZWYiLCJnZXREYXkiLCJjbHN4IiwiZ2V0RGF0ZSIsImFkZERheXMiLCJhZGRXZWVrcyIsIm9uQ2xpY2tPdXRzaWRlIiwiZ2V0VGltZSIsInNldFllYXIiLCJSZWFjdERPTSIsInVzZVJlZiIsInVzZUZsb2F0aW5nIiwiYXV0b1VwZGF0ZSIsImZsaXAiLCJvZmZzZXQiLCJhcnJvdyIsIkZsb2F0aW5nQXJyb3ciLCJjcmVhdGVFbGVtZW50Iiwic2V0Iiwic3ViV2Vla3MiLCJzdWJEYXlzIiwiUG9wcGVyQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUFBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQSxJQUFJQSxjQUFhLEdBQUcsU0FBQUEsY0FBU0MsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7SUFDL0JGLEVBQUFBLGNBQWEsR0FBR0csTUFBTSxDQUFDQyxjQUFjLElBQ2hDO0lBQUVDLElBQUFBLFNBQVMsRUFBRSxFQUFBO0lBQUcsR0FBQyxZQUFZQyxLQUFLLElBQUksVUFBVUwsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7UUFBRUQsQ0FBQyxDQUFDSSxTQUFTLEdBQUdILENBQUMsQ0FBQTtJQUFFLEdBQUUsSUFDNUUsVUFBVUQsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7UUFBRSxLQUFLLElBQUlLLENBQUMsSUFBSUwsQ0FBQyxFQUFFLElBQUlDLE1BQU0sQ0FBQ0ssU0FBUyxDQUFDQyxjQUFjLENBQUNDLElBQUksQ0FBQ1IsQ0FBQyxFQUFFSyxDQUFDLENBQUMsRUFBRU4sQ0FBQyxDQUFDTSxDQUFDLENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLENBQUMsQ0FBQTtPQUFHLENBQUE7SUFDckcsRUFBQSxPQUFPUCxjQUFhLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUE7SUFDOUIsQ0FBQyxDQUFBO0lBRU0sU0FBU1MsU0FBU0EsQ0FBQ1Ys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
