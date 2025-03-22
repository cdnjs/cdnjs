/*!
  react-datepicker v7.5.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIudHN4IiwiLi4vc3JjL2NsaWNrX291dHNpZGVfd3JhcHBlci50c3giLCIuLi9zcmMvZGF0ZV91dGlscy50cyIsIi4uL3NyYy9pbnB1dF90aW1lLnRzeCIsIi4uL3NyYy9kYXkudHN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLnRzeCIsIi4uL3NyYy93ZWVrLnRzeCIsIi4uL3NyYy9tb250aC50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd24udHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvdGltZS50c3giLCIuLi9zcmMveWVhci50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLnRzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9jYWxlbmRhci50c3giLCIuLi9zcmMvY2FsZW5kYXJfaWNvbi50c3giLCIuLi9zcmMvcG9ydGFsLnRzeCIsIi4uL3NyYy90YWJfbG9vcC50c3giLCIuLi9zcmMvd2l0aF9mbG9hdGluZy50c3giLCIuLi9zcmMvcG9wcGVyX2NvbXBvbmVudC50c3giLCIuLi9zcmMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcclxuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbn07XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiZXh0ZW5kU3RhdGljcyIsImQiLCJiIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJBcnJheSIsInAiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfX2V4dGVuZHMiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwiX19hc3NpZ24iLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXBwbHkiLCJfX3NwcmVhZEFycmF5IiwidG8iLCJmcm9tIiwicGFjayIsImwiLCJhciIsInNsaWNlIiwiY29uY2F0IiwiU3VwcHJlc3NlZEVycm9yIiwiZXJyb3IiLCJzdXBwcmVzc2VkIiwibWVzc2FnZSIsImUiLCJFcnJvciIsIm5hbWUiLCJSZWFjdCIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlRWZmZWN0IiwicGFyc2VJU08iLCJ0b0RhdGUiLCJwYXJzZSIsImxvbmdGb3JtYXR0ZXJzIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRJU09XZWVrIiwic3RhcnRPZkRheSIsInN0YXJ0T2ZXZWVrIiwic3RhcnRPZk1vbnRoIiwic3RhcnRPZlllYXIiLCJzdGFydE9mUXVhcnRlciIsImVuZE9mRGF5IiwiZW5kT2ZXZWVrIiwiZW5kT2ZNb250aCIsImRmSXNTYW1lWWVhciIsImRmSXNTYW1lTW9udGgiLCJkZklzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZURheSIsImRmSXNFcXVhbCIsImlzV2l0aGluSW50ZXJ2YWwiLCJzZXRNb250aCIsInNldFF1YXJ0ZXIiLCJnZXRZZWFyIiwiZ2V0TW9udGgiLCJlbmRPZlllYXIiLCJnZXRRdWFydGVyIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiYWRkTW9udGhzIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwiYWRkUXVhcnRlcnMiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJhZGRZZWFycyIsIm1pbiIsIm1heCIsImlzRGF0ZSIsImFkZEhvdXJzIiwiYWRkTWludXRlcyIsImFkZFNlY29uZHMiLCJpc0FmdGVyIiwiY2xvbmVFbGVtZW50IiwiQ29tcG9uZW50IiwiY3JlYXRlUmVmIiwiZ2V0RGF5IiwiY2xzeCIsImdldERhdGUiLCJhZGREYXlzIiwiYWRkV2Vla3MiLCJnZXRUaW1lIiwic2V0WWVhciIsImRpZmZlcmVuY2VJbkRheXMiLCJSZWFjdERPTSIsInVzZUZsb2F0aW5nIiwiYXV0b1VwZGF0ZSIsImZsaXAiLCJvZmZzZXQiLCJhcnJvdyIsIkZsb2F0aW5nQXJyb3ciLCJjcmVhdGVFbGVtZW50Iiwic2V0Iiwic3ViV2Vla3MiLCJzdWJEYXlzIiwiUG9wcGVyQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQUE7SUFDQTtBQUNBO0lBQ0E7SUFDQTtBQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBLElBQUlBLGNBQWEs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QSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUN6QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFDbkMzRCxzQkFBQyxDQUFBLGFBQUEsQ0FBQSxPQUFPLElBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFBO29CQUM5Q0Esc0JBQ0UsQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLEVBQUEsU0FBUyxFQUFDLDBCQUEwQixFQUNwQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQ1osU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBRTlCLEVBQUEsUUFBUSxDQUNMLENBQ0UsSUFDUixJQUFJLENBQUM7SUFFVCxZQUFBLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQzFDLGVBQWUsSUFDYkEsc0JBQUMsQ0FBQSxhQUFBLENBQUEsTUFBTSxZQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQSxFQUFNLElBQUksQ0FBQyxLQUFLLEdBQ2xELGVBQWUsQ0FDVCxDQUNWLENBQUM7aUJBQ0g7SUFFRCxZQUFBLFFBQ0VBLHNCQUFBLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBO29CQUNHLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtvQkFDM0IsZUFBZSxDQUNaLEVBQ047YUFDSDtZQUVELFFBQ0VBLHFDQUFDNkUsaUJBQWUsRUFBQXJHLE9BQUEsQ0FBQSxFQUFBLEVBQ1YsSUFBSSxDQUFDLEtBQUssRUFDZCxFQUFBLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFDckMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUNsQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQzVDLGVBQWUsRUFBRSxRQUFRLEVBQ3pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQ3JDLENBQUEsQ0FBQSxFQUNGO1NBQ0gsQ0FBQTtRQUNILE9BQUMsVUFBQSxDQUFBO0lBQUQsQ0EzdUNBLENBQXdDZ0YsZUFBUyxDQTJ1Q2hELEVBQUE7SUFFRCxJQUFNLDBCQUEwQixHQUFHLE9BQU8sQ0FBQztJQUMzQyxJQUFNLDZCQUE2QixHQUFHLFVBQVU7Ozs7Ozs7Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
