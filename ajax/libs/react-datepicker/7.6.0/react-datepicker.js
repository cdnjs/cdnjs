/*!
  react-datepicker v7.6.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('clsx'), require('react'), require('date-fns'), require('date-fns/addDays'), require('date-fns/addHours'), require('date-fns/addMinutes'), require('date-fns/addMonths'), require('date-fns/addQuarters'), require('date-fns/addSeconds'), require('date-fns/addWeeks'), require('date-fns/addYears'), require('date-fns/differenceInCalendarDays'), require('date-fns/differenceInCalendarMonths'), require('date-fns/differenceInCalendarQuarters'), require('date-fns/differenceInCalendarYears'), require('date-fns/endOfDay'), require('date-fns/endOfMonth'), require('date-fns/endOfWeek'), require('date-fns/endOfYear'), require('date-fns/format'), require('date-fns/getDate'), require('date-fns/getDay'), require('date-fns/getHours'), require('date-fns/getISOWeek'), require('date-fns/getMinutes'), require('date-fns/getMonth'), require('date-fns/getQuarter'), require('date-fns/getSeconds'), require('date-fns/getTime'), require('date-fns/getYear'), require('date-fns/isAfter'), require('date-fns/isBefore'), require('date-fns/isDate'), require('date-fns/isEqual'), require('date-fns/isSameDay'), require('date-fns/isSameMonth'), require('date-fns/isSameQuarter'), require('date-fns/isSameYear'), require('date-fns/isValid'), require('date-fns/isWithinInterval'), require('date-fns/max'), require('date-fns/min'), require('date-fns/parse'), require('date-fns/parseISO'), require('date-fns/set'), require('date-fns/setHours'), require('date-fns/setMinutes'), require('date-fns/setMonth'), require('date-fns/setQuarter'), require('date-fns/setSeconds'), require('date-fns/setYear'), require('date-fns/startOfDay'), require('date-fns/startOfMonth'), require('date-fns/startOfQuarter'), require('date-fns/startOfWeek'), require('date-fns/startOfYear'), require('date-fns/subDays'), require('date-fns/subMonths'), require('date-fns/subQuarters'), require('date-fns/subWeeks'), require('date-fns/subYears'), require('date-fns/toDate'), require('@floating-ui/react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['exports', 'clsx', 'react', 'date-fns', 'date-fns/addDays', 'date-fns/addHours', 'date-fns/addMinutes', 'date-fns/addMonths', 'date-fns/addQuarters', 'date-fns/addSeconds', 'date-fns/addWeeks', 'date-fns/addYears', 'date-fns/differenceInCalendarDays', 'date-fns/differenceInCalendarMonths', 'date-fns/differenceInCalendarQuarters', 'date-fns/differenceInCalendarYears', 'date-fns/endOfDay', 'date-fns/endOfMonth', 'date-fns/endOfWeek', 'date-fns/endOfYear', 'date-fns/format', 'date-fns/getDate', 'date-fns/getDay', 'date-fns/getHours', 'date-fns/getISOWeek', 'date-fns/getMinutes', 'date-fns/getMonth', 'date-fns/getQuarter', 'date-fns/getSeconds', 'date-fns/getTime', 'date-fns/getYear', 'date-fns/isAfter', 'date-fns/isBefore', 'date-fns/isDate', 'date-fns/isEqual', 'date-fns/isSameDay', 'date-fns/isSameMonth', 'date-fns/isSameQuarter', 'date-fns/isSameYear', 'date-fns/isValid', 'date-fns/isWithinInterval', 'date-fns/max', 'date-fns/min', 'date-fns/parse', 'date-fns/parseISO', 'date-fns/set', 'date-fns/setHours', 'date-fns/setMinutes', 'date-fns/setMonth', 'date-fns/setQuarter', 'date-fns/setSeconds', 'date-fns/setYear', 'date-fns/startOfDay', 'date-fns/startOfMonth', 'date-fns/startOfQuarter', 'date-fns/startOfWeek', 'date-fns/startOfYear', 'date-fns/subDays', 'date-fns/subMonths', 'date-fns/subQuarters', 'date-fns/subWeeks', 'date-fns/subYears', 'date-fns/toDate', '@floating-ui/react', 'react-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DatePicker = {}, global.clsx, global.React, global.dateFns, global.addDays, global.addHours, global.addMinutes, global.addMonths, global.addQuarters, global.addSeconds, global.addWeeks, global.addYears, global.differenceInCalendarDays, global.differenceInCalendarMonths, global.differenceInCalendarQuarters, global.differenceInCalendarYears, global.endOfDay, global.endOfMonth, global.endOfWeek, global.endOfYear, global.format, global.getDate, global.getDay, global.getHours, global.getISOWeek, global.getMinutes, global.getMonth, global.getQuarter, global.getSeconds, global.getTime, global.getYear, global.isAfter, global.isBefore, global.isDate, global.isEqual$1, global.isSameDay$1, global.isSameMonth$1, global.isSameQuarter$1, global.isSameYear$1, global.isValid$1, global.isWithinInterval, global.max, global.min, global.parse, global.parseISO, global.set, global.setHours, global.setMinutes, global.setMonth, global.setQuarter, global.setSeconds, global.setYear, global.startOfDay, global.startOfMonth, global.startOfQuarter, global.startOfWeek, global.startOfYear, global.subDays, global.subMonths, global.subQuarters, global.subWeeks, global.subYears, global.toDate, global.react, global.ReactDOM));
})(this, (function (exports, clsx, React, dateFns, addDays, addHours, addMinutes, addMonths, addQuarters, addSeconds, addWeeks, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarQuarters, differenceInCalendarYears, endOfDay, endOfMonth, endOfWeek, endOfYear, format, getDate, getDay, getHours, getISOWeek, getMinutes, getMonth, getQuarter, getSeconds, getTime, getYear, isAfter, isBefore, isDate, isEqual$1, isSameDay$1, isSameMonth$1, isSameQuarter$1, isSameYear$1, isValid$1, isWithinInterval, max, min, parse, parseISO, set, setHours, setMinutes, setMonth, setQuarter, setSeconds, setYear, startOfDay, startOfMonth, startOfQuarter, startOfWeek, startOfYear, subDays, subMonths, subQuarters, subWeeks, subYears, toDate, react, ReactDOM) { 'use strict';

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
            if (ref.current && !ref.current.contains(event.target)) {
                if (!(ignoreClass &&
                    event.target instanceof HTMLElement &&
                    event.target.classList.contains(ignoreClass))) {
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
     * Gets the end of the month for a given date.
     *
     * @param date - The date.
     * @returns - The end of the month.
     */
    function getEndOfMonth(date) {
        return endOfMonth.endOfMonth(date);
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
                var endOfWeek = addDays.addDays(startOfWeek, 6);
                var processingDate = new Date(startOfWeek);
                while (processingDate <= endOfWeek) {
                    if (!_this.isDisabled(processingDate))
                        return false;
                    processingDate = addDays.addDays(processingDate, 1);
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
            _this.isSelectMonthInList = function (day, m, selectedDates) {
                return selectedDates.some(function (selectedDate) {
                    return _this.isSelectedMonth(day, m, selectedDate);
                });
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
                var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate, preSelection = _a.preSelection, monthClassName = _a.monthClassName;
                var _monthClassName = monthClassName
                    ? monthClassName(setMonth.setMonth(day, m))
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
                var preSelectedMonth = getMonth.getMonth(_this.props.preSelection);
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
                var preSelectedQuarter = getQuarter.getQuarter(_this.props.preSelection);
                var isCurrentQuarterDisabled = isQuarterDisabled(_this.props.day, _this.props);
                var tabIndex = q === preSelectedQuarter &&
                    !(isCurrentQuarterDisabled || _this.props.disabledKeyboardNavigation)
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
                var _a = _this.props, day = _a.day, startDate = _a.startDate, endDate = _a.endDate, selected = _a.selected, minDate = _a.minDate, maxDate = _a.maxDate, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate, preSelection = _a.preSelection, disabledKeyboardNavigation = _a.disabledKeyboardNavigation;
                var isDisabled = (minDate || maxDate || excludeDates || includeDates || filterDate) &&
                    isQuarterDisabled(setQuarter.setQuarter(day, q), _this.props);
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
                var _a = _this.props, minDate = _a.minDate, maxDate = _a.maxDate, excludeDates = _a.excludeDates, includeDates = _a.includeDates, filterDate = _a.filterDate;
                var date = getStartOfYear(setYear.setYear(_this.props.date, y));
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
                    var processingDate = addDays.addDays(startOfMonth, dayIdx);
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
                var fromMonthDate = subMonths.subMonths(_this.state.date, monthSelectedIn);
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
                        date: addYears.addYears(date, _this.props.showYearPicker
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
            return (React__default.default.createElement(ClickOutsideWrapper, { onClickOutside: this.handleClickOutside, style: { display: "contents" }, containerRef: this.containerRef, ignoreClass: this.props.outsideClickIgnoreClass },
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
                        date = set.set(_this.props.selected, {
                            hours: getHours.getHours(date),
                            minutes: getMinutes.getMinutes(date),
                            seconds: getSeconds.getSeconds(date),
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
                        hour: getHours.getHours(time),
                        minute: getMinutes.getMinutes(time),
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

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIudHN4IiwiLi4vc3JjL2NsaWNrX291dHNpZGVfd3JhcHBlci50c3giLCIuLi9zcmMvZGF0ZV91dGlscy50cyIsIi4uL3NyYy9pbnB1dF90aW1lLnRzeCIsIi4uL3NyYy9kYXkudHN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLnRzeCIsIi4uL3NyYy93ZWVrLnRzeCIsIi4uL3NyYy9tb250aC50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd24udHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvdGltZS50c3giLCIuLi9zcmMveWVhci50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9jYWxlbmRhci50c3giLCIuLi9zcmMvY2FsZW5kYXJfaWNvbi50c3giLCIuLi9zcmMvcG9ydGFsLnRzeCIsIi4uL3NyYy90YWJfbG9vcC50c3giLCIuLi9zcmMvd2l0aF9mbG9hdGluZy50c3giLCIuLi9zcmMvcG9wcGVyX2NvbXBvbmVudC50c3giLCIuLi9zcmMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcclxuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcclxuICAgIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xyXG4gICAgICAgIHZhciBhciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XHJcbiAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBvd25LZXlzKG8pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XHJcbiAgICAgICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xyXG4gICAgZnVuY3Rpb24gZmFpbChlKSB7XHJcbiAgICAgICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xyXG4gICAgICAgIGVudi5oYXNFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB2YXIgciwgcyA9IDA7XHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgcyB8PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19lc0RlY29yYXRlOiBfX2VzRGVjb3JhdGUsXHJcbiAgICBfX3J1bkluaXRpYWxpemVyczogX19ydW5Jbml0aWFsaXplcnMsXHJcbiAgICBfX3Byb3BLZXk6IF9fcHJvcEtleSxcclxuICAgIF9fc2V0RnVuY3Rpb25OYW1lOiBfX3NldEZ1bmN0aW9uTmFtZSxcclxuICAgIF9fbWV0YWRhdGE6IF9fbWV0YWRhdGEsXHJcbiAgICBfX2F3YWl0ZXI6IF9fYXdhaXRlcixcclxuICAgIF9fZ2VuZXJhdG9yOiBfX2dlbmVyYXRvcixcclxuICAgIF9fY3JlYXRlQmluZGluZzogX19jcmVhdGVCaW5kaW5nLFxyXG4gICAgX19leHBvcnRTdGFyOiBfX2V4cG9ydFN0YXIsXHJcbiAgICBfX3ZhbHVlczogX192YWx1ZXMsXHJcbiAgICBfX3JlYWQ6IF9fcmVhZCxcclxuICAgIF9fc3ByZWFkOiBfX3NwcmVhZCxcclxuICAgIF9fc3ByZWFkQXJyYXlzOiBfX3NwcmVhZEFycmF5cyxcclxuICAgIF9fc3ByZWFkQXJyYXk6IF9fc3ByZWFkQXJyYXksXHJcbiAgICBfX2F3YWl0OiBfX2F3YWl0LFxyXG4gICAgX19hc3luY0dlbmVyYXRvcjogX19hc3luY0dlbmVyYXRvcixcclxuICAgIF9fYXN5bmNEZWxlZ2F0b3I6IF9fYXN5bmNEZWxlZ2F0b3IsXHJcbiAgICBfX2FzeW5jVmFsdWVzOiBfX2FzeW5jVmFsdWVzLFxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3Q6IF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxyXG4gICAgX19pbXBvcnRTdGFyOiBfX2ltcG9ydFN0YXIsXHJcbiAgICBfX2ltcG9ydERlZmF1bHQ6IF9faW1wb3J0RGVmYXVsdCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEluOiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXHJcbiAgICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZTogX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXHJcbiAgICBfX2Rpc3Bvc2VSZXNvdXJjZXM6IF9fZGlzcG9zZVJlc291cmNlcyxcclxuICAgIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uOiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcclxufTtcclxuIixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJleHRlbmRTdGF0aWNzIiwiZCIsImIiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIl9fZXh0ZW5kcyIsIlR5cGVFcnJvciIsIlN0cmluZyIsIl9fIiwiY29uc3RydWN0b3IiLCJjcmVhdGUiLCJfX2Fzc2lnbiIsImFzc2lnbiIsInQiLCJzIiwiaSIsIm4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcHBseSIsIl9fc3ByZWFkQXJyYXkiLCJ0byIsImZyb20iLCJwYWNrIiwibCIsImFyIiwic2xpY2UiLCJjb25jYXQiLCJTdXBwcmVzc2VkRXJyb3IiLCJlcnJvciIsInN1cHByZXNzZWQiLCJtZXNzYWdlIiwiZSIsIkVycm9yIiwibmFtZSIsIlJlYWN0IiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJwYXJzZUlTTyIsInRvRGF0ZSIsInBhcnNlIiwibG9uZ0Zvcm1hdHRlcnMiLCJpc1ZhbGlkRGF0ZSIsImlzQmVmb3JlIiwiZm9ybWF0Iiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsImdldElTT1dlZWsiLCJzdGFydE9mRGF5Iiwic3RhcnRPZldlZWsiLCJzdGFydE9mTW9udGgiLCJzdGFydE9mWWVhciIsInN0YXJ0T2ZRdWFydGVyIiwiZW5kT2ZEYXkiLCJlbmRPZldlZWsiLCJlbmRPZk1vbnRoIiwiZGZJc1NhbWVZZWFyIiwiZGZJc1NhbWVNb250aCIsImRmSXNTYW1lUXVhcnRlciIsImRmSXNTYW1lRGF5IiwiZGZJc0VxdWFsIiwiaXNXaXRoaW5JbnRlcnZhbCIsInNldE1vbnRoIiwic2V0UXVhcnRlciIsImdldFllYXIiLCJnZXRNb250aCIsImVuZE9mWWVhciIsImdldFF1YXJ0ZXIiLCJkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwic3ViTW9udGhzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMiLCJhZGRNb250aHMiLCJzdWJRdWFydGVycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMiLCJhZGRRdWFydGVycyIsInN1YlllYXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyIsImFkZFllYXJzIiwibWluIiwibWF4IiwiaXNEYXRlIiwiYWRkSG91cnMiLCJhZGRNaW51dGVzIiwiYWRkU2Vjb25kcyIsImlzQWZ0ZXIiLCJjbG9uZUVsZW1lbnQiLCJDb21wb25lbnQiLCJjcmVhdGVSZWYiLCJnZXREYXkiLCJjbHN4IiwiZ2V0RGF0ZSIsImFkZERheXMiLCJhZGRXZWVrcyIsImdldFRpbWUiLCJzZXRZZWFyIiwiZGlmZmVyZW5jZUluRGF5cyIsIlJlYWN0RE9NIiwidXNlRmxvYXRpbmciLCJhdXRvVXBkYXRlIiwiZmxpcCIsIm9mZnNldCIsImFycm93IiwiRmxvYXRpbmdBcnJvdyIsImNyZWF0ZUVsZW1lbnQiLCJzZXQiLCJzdWJXZWVrcyIsInN1YkRheXMiLCJQb3BwZXJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0lB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
