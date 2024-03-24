/*!
  react-datepicker v6.6.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('clsx'), require('date-fns/isDate'), require('date-fns/isValid'), require('date-fns/format'), require('date-fns/addMinutes'), require('date-fns/addHours'), require('date-fns/addDays'), require('date-fns/addWeeks'), require('date-fns/addMonths'), require('date-fns/addQuarters'), require('date-fns/addYears'), require('date-fns/subDays'), require('date-fns/subWeeks'), require('date-fns/subMonths'), require('date-fns/subQuarters'), require('date-fns/subYears'), require('date-fns/getSeconds'), require('date-fns/getMinutes'), require('date-fns/getHours'), require('date-fns/getDay'), require('date-fns/getDate'), require('date-fns/getISOWeek'), require('date-fns/getMonth'), require('date-fns/getQuarter'), require('date-fns/getYear'), require('date-fns/getTime'), require('date-fns/setSeconds'), require('date-fns/setMinutes'), require('date-fns/setHours'), require('date-fns/setMonth'), require('date-fns/setQuarter'), require('date-fns/setYear'), require('date-fns/min'), require('date-fns/max'), require('date-fns/differenceInCalendarDays'), require('date-fns/differenceInCalendarMonths'), require('date-fns/differenceInCalendarYears'), require('date-fns/startOfDay'), require('date-fns/startOfWeek'), require('date-fns/startOfMonth'), require('date-fns/startOfQuarter'), require('date-fns/startOfYear'), require('date-fns/endOfDay'), require('date-fns/endOfWeek'), require('date-fns/endOfMonth'), require('date-fns/endOfYear'), require('date-fns/isEqual'), require('date-fns/isSameDay'), require('date-fns/isSameMonth'), require('date-fns/isSameYear'), require('date-fns/isSameQuarter'), require('date-fns/isAfter'), require('date-fns/isBefore'), require('date-fns/isWithinInterval'), require('date-fns/toDate'), require('date-fns/parse'), require('date-fns/parseISO'), require('react-onclickoutside'), require('react-dom'), require('@floating-ui/react'), require('date-fns/set')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'clsx', 'date-fns/isDate', 'date-fns/isValid', 'date-fns/format', 'date-fns/addMinutes', 'date-fns/addHours', 'date-fns/addDays', 'date-fns/addWeeks', 'date-fns/addMonths', 'date-fns/addQuarters', 'date-fns/addYears', 'date-fns/subDays', 'date-fns/subWeeks', 'date-fns/subMonths', 'date-fns/subQuarters', 'date-fns/subYears', 'date-fns/getSeconds', 'date-fns/getMinutes', 'date-fns/getHours', 'date-fns/getDay', 'date-fns/getDate', 'date-fns/getISOWeek', 'date-fns/getMonth', 'date-fns/getQuarter', 'date-fns/getYear', 'date-fns/getTime', 'date-fns/setSeconds', 'date-fns/setMinutes', 'date-fns/setHours', 'date-fns/setMonth', 'date-fns/setQuarter', 'date-fns/setYear', 'date-fns/min', 'date-fns/max', 'date-fns/differenceInCalendarDays', 'date-fns/differenceInCalendarMonths', 'date-fns/differenceInCalendarYears', 'date-fns/startOfDay', 'date-fns/startOfWeek', 'date-fns/startOfMonth', 'date-fns/startOfQuarter', 'date-fns/startOfYear', 'date-fns/endOfDay', 'date-fns/endOfWeek', 'date-fns/endOfMonth', 'date-fns/endOfYear', 'date-fns/isEqual', 'date-fns/isSameDay', 'date-fns/isSameMonth', 'date-fns/isSameYear', 'date-fns/isSameQuarter', 'date-fns/isAfter', 'date-fns/isBefore', 'date-fns/isWithinInterval', 'date-fns/toDate', 'date-fns/parse', 'date-fns/parseISO', 'react-onclickoutside', 'react-dom', '@floating-ui/react', 'date-fns/set'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DatePicker = {}, global.React, global.PropTypes, global.clsx, global.isDate, global.isValid$1, global.format, global.addMinutes, global.addHours, global.addDays, global.addWeeks, global.addMonths, global.addQuarters, global.addYears, global.subDays, global.subWeeks, global.subMonths, global.subQuarters, global.subYears, global.getSeconds, global.getMinutes, global.getHours, global.getDay, global.getDate, global.getISOWeek, global.getMonth, global.getQuarter, global.getYear, global.getTime, global.setSeconds, global.setMinutes, global.setHours, global.setMonth, global.setQuarter, global.setYear, global.min, global.max, global.differenceInCalendarDays, global.differenceInCalendarMonths, global.differenceInCalendarYears, global.startOfDay, global.startOfWeek, global.startOfMonth, global.startOfQuarter, global.startOfYear, global.endOfDay, global.endOfWeek, global.endOfMonth, global.endOfYear, global.isEqual$1, global.isSameDay$1, global.isSameMonth$1, global.isSameYear$1, global.isSameQuarter$1, global.isAfter, global.isBefore, global.isWithinInterval, global.toDate, global.parse, global.parseISO, global.onClickOutside, global.ReactDOM, global.react, global.set));
})(this, (function (exports, React, propTypes, clsx, isDate, isValid$1, format, addMinutes, addHours, addDays, addWeeks, addMonths, addQuarters, addYears, subDays, subWeeks, subMonths, subQuarters, subYears, getSeconds, getMinutes, getHours, getDay, getDate, getISOWeek, getMonth, getQuarter, getYear, getTime, setSeconds, setMinutes, setHours, setMonth, setQuarter, setYear, min, max, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear, isEqual$1, isSameDay$1, isSameMonth$1, isSameYear$1, isSameQuarter$1, isAfter, isBefore, isWithinInterval, toDate, parse, parseISO, onClickOutside, ReactDOM, react, set) { 'use strict';

  function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefaultCompat(React);
  var onClickOutside__default = /*#__PURE__*/_interopDefaultCompat(onClickOutside);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultCompat(ReactDOM);

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var DEFAULT_YEAR_ITEM_NUMBER = 12;

  // This RegExp catches symbols escaped by quotes, and also
  // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

  // ** Date Constructors **

  function newDate(value) {
    var d = value ? typeof value === "string" || value instanceof String ? parseISO.parseISO(value) : toDate.toDate(value) : new Date();
    return isValid(d) ? d : null;
  }
  function parseDate(value, dateFormat, locale, strictParsing, minDate) {
    var parsedDate = null;
    var localeObject = getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
    var strictParsingValueMatch = true;
    if (Array.isArray(dateFormat)) {
      dateFormat.forEach(function (df) {
        var tryParseDate = parse.parse(value, df, new Date(), {
          locale: localeObject,
          useAdditionalWeekYearTokens: true,
          useAdditionalDayOfYearTokens: true
        });
        if (strictParsing) {
          strictParsingValueMatch = isValid(tryParseDate, minDate) && value === formatDate(tryParseDate, df, locale);
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
      useAdditionalDayOfYearTokens: true
    });
    if (strictParsing) {
      strictParsingValueMatch = isValid(parsedDate) && value === formatDate(parsedDate, dateFormat, locale);
    } else if (!isValid(parsedDate)) {
      dateFormat = dateFormat.match(longFormattingTokensRegExp).map(function (substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === "p" || firstCharacter === "P") {
          var longFormatter = format.longFormatters[firstCharacter];
          return localeObject ? longFormatter(substring, localeObject.formatLong) : firstCharacter;
        }
        return substring;
      }).join("");
      if (value.length > 0) {
        parsedDate = parse.parse(value, dateFormat.slice(0, value.length), new Date(), {
          useAdditionalWeekYearTokens: true,
          useAdditionalDayOfYearTokens: true
        });
      }
      if (!isValid(parsedDate)) {
        parsedDate = new Date(value);
      }
    }
    return isValid(parsedDate) && strictParsingValueMatch ? parsedDate : null;
  }
  function isValid(date, minDate) {
    minDate = minDate ? minDate : new Date("1/1/1000");
    return isValid$1.isValid(date) && !isBefore.isBefore(date, minDate);
  }

  // ** Date Formatting **

  function formatDate(date, formatStr, locale) {
    if (locale === "en") {
      return format.format(date, formatStr, {
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true
      });
    }
    var localeObj = getLocaleObject(locale);
    if (locale && !localeObj) {
      console.warn("A locale object was not found for the provided string [\"".concat(locale, "\"]."));
    }
    if (!localeObj && !!getDefaultLocale() && !!getLocaleObject(getDefaultLocale())) {
      localeObj = getLocaleObject(getDefaultLocale());
    }
    return format.format(date, formatStr, {
      locale: localeObj ? localeObj : null,
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true
    });
  }
  function safeDateFormat(date, _ref) {
    var dateFormat = _ref.dateFormat,
      locale = _ref.locale;
    return date && formatDate(date, Array.isArray(dateFormat) ? dateFormat[0] : dateFormat, locale) || "";
  }
  function safeDateRangeFormat(startDate, endDate, props) {
    if (!startDate) {
      return "";
    }
    var formattedStartDate = safeDateFormat(startDate, props);
    var formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";
    return "".concat(formattedStartDate, " - ").concat(formattedEndDate);
  }
  function safeMultipleDatesFormat(dates, props) {
    if (!(dates !== null && dates !== void 0 && dates.length)) {
      return "";
    }
    var formattedFirstDate = safeDateFormat(dates[0], props);
    if (dates.length === 1) {
      return formattedFirstDate;
    }
    if (dates.length === 2) {
      var formattedSecondDate = safeDateFormat(dates[1], props);
      return "".concat(formattedFirstDate, ", ").concat(formattedSecondDate);
    }
    var extraDatesCount = dates.length - 1;
    return "".concat(formattedFirstDate, " (+").concat(extraDatesCount, ")");
  }

  // ** Date Setters **

  function setTime(date, _ref2) {
    var _ref2$hour = _ref2.hour,
      hour = _ref2$hour === void 0 ? 0 : _ref2$hour,
      _ref2$minute = _ref2.minute,
      minute = _ref2$minute === void 0 ? 0 : _ref2$minute,
      _ref2$second = _ref2.second,
      second = _ref2$second === void 0 ? 0 : _ref2$second;
    return setHours.setHours(setMinutes.setMinutes(setSeconds.setSeconds(date, second), minute), hour);
  }
  function getWeek(date, locale) {
    var localeObj = locale && getLocaleObject(locale) || getDefaultLocale() && getLocaleObject(getDefaultLocale());
    return getISOWeek.getISOWeek(date, localeObj ? {
      locale: localeObj
    } : null);
  }
  function getDayOfWeekCode(day, locale) {
    return formatDate(day, "ddd", locale);
  }

  // *** Start of ***

  function getStartOfDay(date) {
    return startOfDay.startOfDay(date);
  }
  function getStartOfWeek(date, locale, calendarStartDay) {
    var localeObj = locale ? getLocaleObject(locale) : getLocaleObject(getDefaultLocale());
    return startOfWeek.startOfWeek(date, {
      locale: localeObj,
      weekStartsOn: calendarStartDay
    });
  }
  function getStartOfMonth(date) {
    return startOfMonth.startOfMonth(date);
  }
  function getStartOfYear(date) {
    return startOfYear.startOfYear(date);
  }
  function getStartOfQuarter(date) {
    return startOfQuarter.startOfQuarter(date);
  }
  function getStartOfToday() {
    return startOfDay.startOfDay(newDate());
  }

  // *** End of ***

  function getEndOfWeek(date) {
    return endOfWeek.endOfWeek(date);
  }
  function isSameYear(date1, date2) {
    if (date1 && date2) {
      return isSameYear$1.isSameYear(date1, date2);
    } else {
      return !date1 && !date2;
    }
  }
  function isSameMonth(date1, date2) {
    if (date1 && date2) {
      return isSameMonth$1.isSameMonth(date1, date2);
    } else {
      return !date1 && !date2;
    }
  }
  function isSameQuarter(date1, date2) {
    if (date1 && date2) {
      return isSameQuarter$1.isSameQuarter(date1, date2);
    } else {
      return !date1 && !date2;
    }
  }
  function isSameDay(date1, date2) {
    if (date1 && date2) {
      return isSameDay$1.isSameDay(date1, date2);
    } else {
      return !date1 && !date2;
    }
  }
  function isEqual(date1, date2) {
    if (date1 && date2) {
      return isEqual$1.isEqual(date1, date2);
    } else {
      return !date1 && !date2;
    }
  }
  function isDayInRange(day, startDate, endDate) {
    var valid;
    var start = startOfDay.startOfDay(startDate);
    var end = endOfDay.endOfDay(endDate);
    try {
      valid = isWithinInterval.isWithinInterval(day, {
        start: start,
        end: end
      });
    } catch (err) {
      valid = false;
    }
    return valid;
  }

  // ** Date Localization **

  function registerLocale(localeName, localeData) {
    var scope = typeof window !== "undefined" ? window : globalThis;
    if (!scope.__localeData__) {
      scope.__localeData__ = {};
    }
    scope.__localeData__[localeName] = localeData;
  }
  function setDefaultLocale(localeName) {
    var scope = typeof window !== "undefined" ? window : globalThis;
    scope.__localeId__ = localeName;
  }
  function getDefaultLocale() {
    var scope = typeof window !== "undefined" ? window : globalThis;
    return scope.__localeId__;
  }
  function getLocaleObject(localeSpec) {
    if (typeof localeSpec === "string") {
      // Treat it as a locale name registered by registerLocale
      var scope = typeof window !== "undefined" ? window : globalThis;
      return scope.__localeData__ ? scope.__localeData__[localeSpec] : null;
    } else {
      // Treat it as a raw date-fns locale object
      return localeSpec;
    }
  }
  function getFormattedWeekdayInLocale(date, formatFunc, locale) {
    return formatFunc(formatDate(date, "EEEE", locale));
  }
  function getWeekdayMinInLocale(date, locale) {
    return formatDate(date, "EEEEEE", locale);
  }
  function getWeekdayShortInLocale(date, locale) {
    return formatDate(date, "EEE", locale);
  }
  function getMonthInLocale(month, locale) {
    return formatDate(setMonth.setMonth(newDate(), month), "LLLL", locale);
  }
  function getMonthShortInLocale(month, locale) {
    return formatDate(setMonth.setMonth(newDate(), month), "LLL", locale);
  }
  function getQuarterShortInLocale(quarter, locale) {
    return formatDate(setQuarter.setQuarter(newDate(), quarter), "QQQ", locale);
  }

  // ** Utils for some components **

  function isDayDisabled(day) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref3.minDate,
      maxDate = _ref3.maxDate,
      excludeDates = _ref3.excludeDates,
      excludeDateIntervals = _ref3.excludeDateIntervals,
      includeDates = _ref3.includeDates,
      includeDateIntervals = _ref3.includeDateIntervals,
      filterDate = _ref3.filterDate;
    return isOutOfBounds(day, {
      minDate: minDate,
      maxDate: maxDate
    }) || excludeDates && excludeDates.some(function (excludeDate) {
      return isSameDay(day, excludeDate.date ? excludeDate.date : excludeDate);
    }) || excludeDateIntervals && excludeDateIntervals.some(function (_ref4) {
      var start = _ref4.start,
        end = _ref4.end;
      return isWithinInterval.isWithinInterval(day, {
        start: start,
        end: end
      });
    }) || includeDates && !includeDates.some(function (includeDate) {
      return isSameDay(day, includeDate);
    }) || includeDateIntervals && !includeDateIntervals.some(function (_ref5) {
      var start = _ref5.start,
        end = _ref5.end;
      return isWithinInterval.isWithinInterval(day, {
        start: start,
        end: end
      });
    }) || filterDate && !filterDate(newDate(day)) || false;
  }
  function isDayExcluded(day) {
    var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      excludeDates = _ref6.excludeDates,
      excludeDateIntervals = _ref6.excludeDateIntervals;
    if (excludeDateIntervals && excludeDateIntervals.length > 0) {
      return excludeDateIntervals.some(function (_ref7) {
        var start = _ref7.start,
          end = _ref7.end;
        return isWithinInterval.isWithinInterval(day, {
          start: start,
          end: end
        });
      });
    }
    return excludeDates && excludeDates.some(function (excludeDate) {
      return isSameDay(day, excludeDate.date ? excludeDate.date : excludeDate);
    }) || false;
  }
  function isMonthDisabled(month) {
    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref8.minDate,
      maxDate = _ref8.maxDate,
      excludeDates = _ref8.excludeDates,
      includeDates = _ref8.includeDates,
      filterDate = _ref8.filterDate;
    return isOutOfBounds(month, {
      minDate: startOfMonth.startOfMonth(minDate),
      maxDate: endOfMonth.endOfMonth(maxDate)
    }) || excludeDates && excludeDates.some(function (excludeDate) {
      return isSameMonth(month, excludeDate);
    }) || includeDates && !includeDates.some(function (includeDate) {
      return isSameMonth(month, includeDate);
    }) || filterDate && !filterDate(newDate(month)) || false;
  }
  function isMonthInRange(startDate, endDate, m, day) {
    var startDateYear = getYear.getYear(startDate);
    var startDateMonth = getMonth.getMonth(startDate);
    var endDateYear = getYear.getYear(endDate);
    var endDateMonth = getMonth.getMonth(endDate);
    var dayYear = getYear.getYear(day);
    if (startDateYear === endDateYear && startDateYear === dayYear) {
      return startDateMonth <= m && m <= endDateMonth;
    } else if (startDateYear < endDateYear) {
      return dayYear === startDateYear && startDateMonth <= m || dayYear === endDateYear && endDateMonth >= m || dayYear < endDateYear && dayYear > startDateYear;
    }
  }
  function isQuarterDisabled(quarter) {
    var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref9.minDate,
      maxDate = _ref9.maxDate,
      excludeDates = _ref9.excludeDates,
      includeDates = _ref9.includeDates,
      filterDate = _ref9.filterDate;
    return isOutOfBounds(quarter, {
      minDate: minDate,
      maxDate: maxDate
    }) || excludeDates && excludeDates.some(function (excludeDate) {
      return isSameQuarter(quarter, excludeDate);
    }) || includeDates && !includeDates.some(function (includeDate) {
      return isSameQuarter(quarter, includeDate);
    }) || filterDate && !filterDate(newDate(quarter)) || false;
  }

  /**
   * @param {number} year
   * @param {Date} start
   * @param {Date} end
   * @returns {boolean}
   */
  function isYearInRange(year, start, end) {
    if (!isValid$1.isValid(start) || !isValid$1.isValid(end)) return false;
    var startYear = getYear.getYear(start);
    var endYear = getYear.getYear(end);
    return startYear <= year && endYear >= year;
  }
  function isYearDisabled(year) {
    var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref10.minDate,
      maxDate = _ref10.maxDate,
      excludeDates = _ref10.excludeDates,
      includeDates = _ref10.includeDates,
      filterDate = _ref10.filterDate;
    var date = new Date(year, 0, 1);
    return isOutOfBounds(date, {
      minDate: startOfYear.startOfYear(minDate),
      maxDate: endOfYear.endOfYear(maxDate)
    }) || excludeDates && excludeDates.some(function (excludeDate) {
      return isSameYear(date, excludeDate);
    }) || includeDates && !includeDates.some(function (includeDate) {
      return isSameYear(date, includeDate);
    }) || filterDate && !filterDate(newDate(date)) || false;
  }
  function isQuarterInRange(startDate, endDate, q, day) {
    var startDateYear = getYear.getYear(startDate);
    var startDateQuarter = getQuarter.getQuarter(startDate);
    var endDateYear = getYear.getYear(endDate);
    var endDateQuarter = getQuarter.getQuarter(endDate);
    var dayYear = getYear.getYear(day);
    if (startDateYear === endDateYear && startDateYear === dayYear) {
      return startDateQuarter <= q && q <= endDateQuarter;
    } else if (startDateYear < endDateYear) {
      return dayYear === startDateYear && startDateQuarter <= q || dayYear === endDateYear && endDateQuarter >= q || dayYear < endDateYear && dayYear > startDateYear;
    }
  }
  function isOutOfBounds(day) {
    var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref11.minDate,
      maxDate = _ref11.maxDate;
    return minDate && differenceInCalendarDays.differenceInCalendarDays(day, minDate) < 0 || maxDate && differenceInCalendarDays.differenceInCalendarDays(day, maxDate) > 0;
  }
  function isTimeInList(time, times) {
    return times.some(function (listTime) {
      return getHours.getHours(listTime) === getHours.getHours(time) && getMinutes.getMinutes(listTime) === getMinutes.getMinutes(time);
    });
  }
  function isTimeDisabled(time) {
    var _ref12 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      excludeTimes = _ref12.excludeTimes,
      includeTimes = _ref12.includeTimes,
      filterTime = _ref12.filterTime;
    return excludeTimes && isTimeInList(time, excludeTimes) || includeTimes && !isTimeInList(time, includeTimes) || filterTime && !filterTime(time) || false;
  }
  function isTimeInDisabledRange(time, _ref13) {
    var minTime = _ref13.minTime,
      maxTime = _ref13.maxTime;
    if (!minTime || !maxTime) {
      throw new Error("Both minTime and maxTime props required");
    }
    var base = newDate();
    var baseTime = setHours.setHours(setMinutes.setMinutes(base, getMinutes.getMinutes(time)), getHours.getHours(time));
    var min = setHours.setHours(setMinutes.setMinutes(base, getMinutes.getMinutes(minTime)), getHours.getHours(minTime));
    var max = setHours.setHours(setMinutes.setMinutes(base, getMinutes.getMinutes(maxTime)), getHours.getHours(maxTime));
    var valid;
    try {
      valid = !isWithinInterval.isWithinInterval(baseTime, {
        start: min,
        end: max
      });
    } catch (err) {
      valid = false;
    }
    return valid;
  }
  function monthDisabledBefore(day) {
    var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref14.minDate,
      includeDates = _ref14.includeDates;
    var previousMonth = subMonths.subMonths(day, 1);
    return minDate && differenceInCalendarMonths.differenceInCalendarMonths(minDate, previousMonth) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarMonths.differenceInCalendarMonths(includeDate, previousMonth) > 0;
    }) || false;
  }
  function monthDisabledAfter(day) {
    var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref15.maxDate,
      includeDates = _ref15.includeDates;
    var nextMonth = addMonths.addMonths(day, 1);
    return maxDate && differenceInCalendarMonths.differenceInCalendarMonths(nextMonth, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarMonths.differenceInCalendarMonths(nextMonth, includeDate) > 0;
    }) || false;
  }
  function yearDisabledBefore(day) {
    var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref16.minDate,
      includeDates = _ref16.includeDates;
    var previousYear = subYears.subYears(day, 1);
    return minDate && differenceInCalendarYears.differenceInCalendarYears(minDate, previousYear) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarYears.differenceInCalendarYears(includeDate, previousYear) > 0;
    }) || false;
  }
  function yearsDisabledBefore(day) {
    var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref17.minDate,
      _ref17$yearItemNumber = _ref17.yearItemNumber,
      yearItemNumber = _ref17$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref17$yearItemNumber;
    var previousYear = getStartOfYear(subYears.subYears(day, yearItemNumber));
    var _getYearsPeriod = getYearsPeriod(previousYear, yearItemNumber),
      endPeriod = _getYearsPeriod.endPeriod;
    var minDateYear = minDate && getYear.getYear(minDate);
    return minDateYear && minDateYear > endPeriod || false;
  }
  function yearDisabledAfter(day) {
    var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref18.maxDate,
      includeDates = _ref18.includeDates;
    var nextYear = addYears.addYears(day, 1);
    return maxDate && differenceInCalendarYears.differenceInCalendarYears(nextYear, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarYears.differenceInCalendarYears(nextYear, includeDate) > 0;
    }) || false;
  }
  function yearsDisabledAfter(day) {
    var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref19.maxDate,
      _ref19$yearItemNumber = _ref19.yearItemNumber,
      yearItemNumber = _ref19$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref19$yearItemNumber;
    var nextYear = addYears.addYears(day, yearItemNumber);
    var _getYearsPeriod2 = getYearsPeriod(nextYear, yearItemNumber),
      startPeriod = _getYearsPeriod2.startPeriod;
    var maxDateYear = maxDate && getYear.getYear(maxDate);
    return maxDateYear && maxDateYear < startPeriod || false;
  }
  function getEffectiveMinDate(_ref20) {
    var minDate = _ref20.minDate,
      includeDates = _ref20.includeDates;
    if (includeDates && minDate) {
      var minDates = includeDates.filter(function (includeDate) {
        return differenceInCalendarDays.differenceInCalendarDays(includeDate, minDate) >= 0;
      });
      return min.min(minDates);
    } else if (includeDates) {
      return min.min(includeDates);
    } else {
      return minDate;
    }
  }
  function getEffectiveMaxDate(_ref21) {
    var maxDate = _ref21.maxDate,
      includeDates = _ref21.includeDates;
    if (includeDates && maxDate) {
      var maxDates = includeDates.filter(function (includeDate) {
        return differenceInCalendarDays.differenceInCalendarDays(includeDate, maxDate) <= 0;
      });
      return max.max(maxDates);
    } else if (includeDates) {
      return max.max(includeDates);
    } else {
      return maxDate;
    }
  }
  function getHightLightDaysMap() {
    var highlightDates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var defaultClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "react-datepicker__day--highlighted";
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
      } else if (_typeof(obj) === "object") {
        var keys = Object.keys(obj);
        var className = keys[0];
        var arrOfDates = obj[keys[0]];
        if (typeof className === "string" && arrOfDates.constructor === Array) {
          for (var k = 0, _len = arrOfDates.length; k < _len; k++) {
            var _key = formatDate(arrOfDates[k], "MM.dd.yyyy");
            var _classNamesArr = dateClasses.get(_key) || [];
            if (!_classNamesArr.includes(className)) {
              _classNamesArr.push(className);
              dateClasses.set(_key, _classNamesArr);
            }
          }
        }
      }
    }
    return dateClasses;
  }

  /**
   * Compare the two arrays
   * @param {Array} array1
   * @param {Array} array2
   * @returns {Boolean} true, if the passed array are equal, false otherwise
   */
  function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }
    return array1.every(function (value, index) {
      return value === array2[index];
    });
  }

  /**
   * Assign the custom class to each date
   * @param {Array} holidayDates array of object containing date and name of the holiday
   * @param {string} classname to be added.
   * @returns {Map} Map containing date as key and array of classname and holiday name as value
   */
  function getHolidaysMap() {
    var holidayDates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var defaultClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "react-datepicker__day--holidays";
    var dateClasses = new Map();
    holidayDates.forEach(function (holiday) {
      var dateObj = holiday.date,
        holidayName = holiday.holidayName;
      if (!isDate.isDate(dateObj)) {
        return;
      }
      var key = formatDate(dateObj, "MM.dd.yyyy");
      var classNamesObj = dateClasses.get(key) || {};
      if ("className" in classNamesObj && classNamesObj["className"] === defaultClassName && arraysAreEqual(classNamesObj["holidayNames"], [holidayName])) {
        return;
      }
      classNamesObj["className"] = defaultClassName;
      var holidayNameArr = classNamesObj["holidayNames"];
      classNamesObj["holidayNames"] = holidayNameArr ? [].concat(_toConsumableArray(holidayNameArr), [holidayName]) : [holidayName];
      dateClasses.set(key, classNamesObj);
    });
    return dateClasses;
  }
  function timesToInjectAfter(startOfDay, currentTime, currentMultiplier, intervals, injectedTimes) {
    var l = injectedTimes.length;
    var times = [];
    for (var i = 0; i < l; i++) {
      var injectedTime = addMinutes.addMinutes(addHours.addHours(startOfDay, getHours.getHours(injectedTimes[i])), getMinutes.getMinutes(injectedTimes[i]));
      var nextTime = addMinutes.addMinutes(startOfDay, (currentMultiplier + 1) * intervals);
      if (isAfter.isAfter(injectedTime, currentTime) && isBefore.isBefore(injectedTime, nextTime)) {
        times.push(injectedTimes[i]);
      }
    }
    return times;
  }
  function addZero(i) {
    return i < 10 ? "0".concat(i) : "".concat(i);
  }
  function getYearsPeriod(date) {
    var yearItemNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_YEAR_ITEM_NUMBER;
    var endPeriod = Math.ceil(getYear.getYear(date) / yearItemNumber) * yearItemNumber;
    var startPeriod = endPeriod - (yearItemNumber - 1);
    return {
      startPeriod: startPeriod,
      endPeriod: endPeriod
    };
  }
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
   * @param {Date} d date
   * @returns {Date} start of the minute
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
   * @param {Date} d1
   * @param {Date} d2
   * @returns {boolean}
   */
  function isSameMinute(d1, d2) {
    return startOfMinute(d1).getTime() === startOfMinute(d2).getTime();
  }

  /**
   * Returns a cloned date with midnight time (00:00:00)
   *
   * @param {Date} date The date for which midnight time is required
   * @param {Date} dateToCompare the date to compare with
   * @returns {Date} A new datetime object representing the input date with midnight time
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
   *
   * @param {Date} date The date that should be before the other one to return true
   * @param {Date} dateToCompare The date to compare with
   * @returns {boolean} The first date is before the second date
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
  function isSpaceKeyDown(event) {
    var SPACE_KEY = " ";
    return event.key === SPACE_KEY;
  }

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
  var YearDropdownOptions = /*#__PURE__*/function (_React$Component) {
    function YearDropdownOptions(props) {
      var _this;
      _classCallCheck(this, YearDropdownOptions);
      _this = _callSuper(this, YearDropdownOptions, [props]);
      _defineProperty(_this, "renderOptions", function () {
        var selectedYear = _this.props.year;
        var options = _this.state.yearsList.map(function (year) {
          return /*#__PURE__*/React__default.default.createElement("div", {
            className: selectedYear === year ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option",
            key: year,
            onClick: _this.onChange.bind(_this, year),
            "aria-selected": selectedYear === year ? "true" : undefined
          }, selectedYear === year ? /*#__PURE__*/React__default.default.createElement("span", {
            className: "react-datepicker__year-option--selected"
          }, "\u2713") : "", year);
        });
        var minYear = _this.props.minDate ? getYear.getYear(_this.props.minDate) : null;
        var maxYear = _this.props.maxDate ? getYear.getYear(_this.props.maxDate) : null;
        if (!maxYear || !_this.state.yearsList.find(function (year) {
          return year === maxYear;
        })) {
          options.unshift( /*#__PURE__*/React__default.default.createElement("div", {
            className: "react-datepicker__year-option",
            key: "upcoming",
            onClick: _this.incrementYears
          }, /*#__PURE__*/React__default.default.createElement("a", {
            className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"
          })));
        }
        if (!minYear || !_this.state.yearsList.find(function (year) {
          return year === minYear;
        })) {
          options.push( /*#__PURE__*/React__default.default.createElement("div", {
            className: "react-datepicker__year-option",
            key: "previous",
            onClick: _this.decrementYears
          }, /*#__PURE__*/React__default.default.createElement("a", {
            className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"
          })));
        }
        return options;
      });
      _defineProperty(_this, "onChange", function (year) {
        _this.props.onChange(year);
      });
      _defineProperty(_this, "handleClickOutside", function () {
        _this.props.onCancel();
      });
      _defineProperty(_this, "shiftYears", function (amount) {
        var years = _this.state.yearsList.map(function (year) {
          return year + amount;
        });
        _this.setState({
          yearsList: years
        });
      });
      _defineProperty(_this, "incrementYears", function () {
        return _this.shiftYears(1);
      });
      _defineProperty(_this, "decrementYears", function () {
        return _this.shiftYears(-1);
      });
      var yearDropdownItemNumber = props.yearDropdownItemNumber,
        scrollableYearDropdown = props.scrollableYearDropdown;
      var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
      _this.state = {
        yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate)
      };
      _this.dropdownRef = /*#__PURE__*/React.createRef();
      return _this;
    }
    _inherits(YearDropdownOptions, _React$Component);
    return _createClass(YearDropdownOptions, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var dropdownCurrent = this.dropdownRef.current;
        if (dropdownCurrent) {
          // Get array from HTMLCollection
          var dropdownCurrentChildren = dropdownCurrent.children ? Array.from(dropdownCurrent.children) : null;
          var selectedYearOptionEl = dropdownCurrentChildren ? dropdownCurrentChildren.find(function (childEl) {
            return childEl.ariaSelected;
          }) : null;
          dropdownCurrent.scrollTop = selectedYearOptionEl ? selectedYearOptionEl.offsetTop + (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) / 2 : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var dropdownClass = clsx.clsx({
          "react-datepicker__year-dropdown": true,
          "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown
        });
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: dropdownClass,
          ref: this.dropdownRef
        }, this.renderOptions());
      }
    }]);
  }(React__default.default.Component);

  var WrappedYearDropdownOptions = onClickOutside__default.default(YearDropdownOptions);
  var YearDropdown = /*#__PURE__*/function (_React$Component) {
    function YearDropdown() {
      var _this;
      _classCallCheck(this, YearDropdown);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, YearDropdown, [].concat(args));
      _defineProperty(_this, "state", {
        dropdownVisible: false
      });
      _defineProperty(_this, "renderSelectOptions", function () {
        var minYear = _this.props.minDate ? getYear.getYear(_this.props.minDate) : 1900;
        var maxYear = _this.props.maxDate ? getYear.getYear(_this.props.maxDate) : 2100;
        var options = [];
        for (var i = minYear; i <= maxYear; i++) {
          options.push( /*#__PURE__*/React__default.default.createElement("option", {
            key: i,
            value: i
          }, i));
        }
        return options;
      });
      _defineProperty(_this, "onSelectChange", function (e) {
        _this.onChange(e.target.value);
      });
      _defineProperty(_this, "renderSelectMode", function () {
        return /*#__PURE__*/React__default.default.createElement("select", {
          value: _this.props.year,
          className: "react-datepicker__year-select",
          onChange: _this.onSelectChange
        }, _this.renderSelectOptions());
      });
      _defineProperty(_this, "renderReadView", function (visible) {
        return /*#__PURE__*/React__default.default.createElement("div", {
          key: "read",
          style: {
            visibility: visible ? "visible" : "hidden"
          },
          className: "react-datepicker__year-read-view",
          onClick: function onClick(event) {
            return _this.toggleDropdown(event);
          }
        }, /*#__PURE__*/React__default.default.createElement("span", {
          className: "react-datepicker__year-read-view--down-arrow"
        }), /*#__PURE__*/React__default.default.createElement("span", {
          className: "react-datepicker__year-read-view--selected-year"
        }, _this.props.year));
      });
      _defineProperty(_this, "renderDropdown", function () {
        return /*#__PURE__*/React__default.default.createElement(WrappedYearDropdownOptions, {
          key: "dropdown",
          year: _this.props.year,
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          scrollableYearDropdown: _this.props.scrollableYearDropdown,
          yearDropdownItemNumber: _this.props.yearDropdownItemNumber
        });
      });
      _defineProperty(_this, "renderScrollMode", function () {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown());
        }
        return result;
      });
      _defineProperty(_this, "onChange", function (year) {
        _this.toggleDropdown();
        if (year === _this.props.year) return;
        _this.props.onChange(year);
      });
      _defineProperty(_this, "toggleDropdown", function (event) {
        _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        }, function () {
          if (_this.props.adjustDateOnChange) {
            _this.handleYearChange(_this.props.date, event);
          }
        });
      });
      _defineProperty(_this, "handleYearChange", function (date, event) {
        _this.onSelect(date, event);
        _this.setOpen();
      });
      _defineProperty(_this, "onSelect", function (date, event) {
        if (_this.props.onSelect) {
          _this.props.onSelect(date, event);
        }
      });
      _defineProperty(_this, "setOpen", function () {
        if (_this.props.setOpen) {
          _this.props.setOpen(true);
        }
      });
      return _this;
    }
    _inherits(YearDropdown, _React$Component);
    return _createClass(YearDropdown, [{
      key: "render",
      value: function render() {
        var renderedDropdown;
        switch (this.props.dropdownMode) {
          case "scroll":
            renderedDropdown = this.renderScrollMode();
            break;
          case "select":
            renderedDropdown = this.renderSelectMode();
            break;
        }
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode)
        }, renderedDropdown);
      }
    }]);
  }(React__default.default.Component);

  var MonthDropdownOptions = /*#__PURE__*/function (_React$Component) {
    function MonthDropdownOptions() {
      var _this;
      _classCallCheck(this, MonthDropdownOptions);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, MonthDropdownOptions, [].concat(args));
      _defineProperty(_this, "isSelectedMonth", function (i) {
        return _this.props.month === i;
      });
      _defineProperty(_this, "renderOptions", function () {
        return _this.props.monthNames.map(function (month, i) {
          return /*#__PURE__*/React__default.default.createElement("div", {
            className: _this.isSelectedMonth(i) ? "react-datepicker__month-option react-datepicker__month-option--selected_month" : "react-datepicker__month-option",
            key: month,
            onClick: _this.onChange.bind(_this, i),
            "aria-selected": _this.isSelectedMonth(i) ? "true" : undefined
          }, _this.isSelectedMonth(i) ? /*#__PURE__*/React__default.default.createElement("span", {
            className: "react-datepicker__month-option--selected"
          }, "\u2713") : "", month);
        });
      });
      _defineProperty(_this, "onChange", function (month) {
        return _this.props.onChange(month);
      });
      _defineProperty(_this, "handleClickOutside", function () {
        return _this.props.onCancel();
      });
      return _this;
    }
    _inherits(MonthDropdownOptions, _React$Component);
    return _createClass(MonthDropdownOptions, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__month-dropdown"
        }, this.renderOptions());
      }
    }]);
  }(React__default.default.Component);

  var WrappedMonthDropdownOptions = onClickOutside__default.default(MonthDropdownOptions);
  var MonthDropdown = /*#__PURE__*/function (_React$Component) {
    function MonthDropdown() {
      var _this;
      _classCallCheck(this, MonthDropdown);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, MonthDropdown, [].concat(args));
      _defineProperty(_this, "state", {
        dropdownVisible: false
      });
      _defineProperty(_this, "renderSelectOptions", function (monthNames) {
        return monthNames.map(function (M, i) {
          return /*#__PURE__*/React__default.default.createElement("option", {
            key: i,
            value: i
          }, M);
        });
      });
      _defineProperty(_this, "renderSelectMode", function (monthNames) {
        return /*#__PURE__*/React__default.default.createElement("select", {
          value: _this.props.month,
          className: "react-datepicker__month-select",
          onChange: function onChange(e) {
            return _this.onChange(e.target.value);
          }
        }, _this.renderSelectOptions(monthNames));
      });
      _defineProperty(_this, "renderReadView", function (visible, monthNames) {
        return /*#__PURE__*/React__default.default.createElement("div", {
          key: "read",
          style: {
            visibility: visible ? "visible" : "hidden"
          },
          className: "react-datepicker__month-read-view",
          onClick: _this.toggleDropdown
        }, /*#__PURE__*/React__default.default.createElement("span", {
          className: "react-datepicker__month-read-view--down-arrow"
        }), /*#__PURE__*/React__default.default.createElement("span", {
          className: "react-datepicker__month-read-view--selected-month"
        }, monthNames[_this.props.month]));
      });
      _defineProperty(_this, "renderDropdown", function (monthNames) {
        return /*#__PURE__*/React__default.default.createElement(WrappedMonthDropdownOptions, {
          key: "dropdown",
          month: _this.props.month,
          monthNames: monthNames,
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown
        });
      });
      _defineProperty(_this, "renderScrollMode", function (monthNames) {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible, monthNames)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown(monthNames));
        }
        return result;
      });
      _defineProperty(_this, "onChange", function (month) {
        _this.toggleDropdown();
        if (month !== _this.props.month) {
          _this.props.onChange(month);
        }
      });
      _defineProperty(_this, "toggleDropdown", function () {
        return _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        });
      });
      return _this;
    }
    _inherits(MonthDropdown, _React$Component);
    return _createClass(MonthDropdown, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function (M) {
          return getMonthShortInLocale(M, _this2.props.locale);
        } : function (M) {
          return getMonthInLocale(M, _this2.props.locale);
        });
        var renderedDropdown;
        switch (this.props.dropdownMode) {
          case "scroll":
            renderedDropdown = this.renderScrollMode(monthNames);
            break;
          case "select":
            renderedDropdown = this.renderSelectMode(monthNames);
            break;
        }
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode)
        }, renderedDropdown);
      }
    }]);
  }(React__default.default.Component);

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
  var MonthYearDropdownOptions = /*#__PURE__*/function (_React$Component) {
    function MonthYearDropdownOptions(props) {
      var _this;
      _classCallCheck(this, MonthYearDropdownOptions);
      _this = _callSuper(this, MonthYearDropdownOptions, [props]);
      _defineProperty(_this, "renderOptions", function () {
        return _this.state.monthYearsList.map(function (monthYear) {
          var monthYearPoint = getTime.getTime(monthYear);
          var isSameMonthYear = isSameYear(_this.props.date, monthYear) && isSameMonth(_this.props.date, monthYear);
          return /*#__PURE__*/React__default.default.createElement("div", {
            className: isSameMonthYear ? "react-datepicker__month-year-option--selected_month-year" : "react-datepicker__month-year-option",
            key: monthYearPoint,
            onClick: _this.onChange.bind(_this, monthYearPoint),
            "aria-selected": isSameMonthYear ? "true" : undefined
          }, isSameMonthYear ? /*#__PURE__*/React__default.default.createElement("span", {
            className: "react-datepicker__month-year-option--selected"
          }, "\u2713") : "", formatDate(monthYear, _this.props.dateFormat, _this.props.locale));
        });
      });
      _defineProperty(_this, "onChange", function (monthYear) {
        return _this.props.onChange(monthYear);
      });
      _defineProperty(_this, "handleClickOutside", function () {
        _this.props.onCancel();
      });
      _this.state = {
        monthYearsList: generateMonthYears(_this.props.minDate, _this.props.maxDate)
      };
      return _this;
    }
    _inherits(MonthYearDropdownOptions, _React$Component);
    return _createClass(MonthYearDropdownOptions, [{
      key: "render",
      value: function render() {
        var dropdownClass = clsx.clsx({
          "react-datepicker__month-year-dropdown": true,
          "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown
        });
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: dropdownClass
        }, this.renderOptions());
      }
    }]);
  }(React__default.default.Component);

  var WrappedMonthYearDropdownOptions = onClickOutside__default.default(MonthYearDropdownOptions);
  var MonthYearDropdown = /*#__PURE__*/function (_React$Component) {
    function MonthYearDropdown() {
      var _this;
      _classCallCheck(this, MonthYearDropdown);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, MonthYearDropdown, [].concat(args));
      _defineProperty(_this, "state", {
        dropdownVisible: false
      });
      _defineProperty(_this, "renderSelectOptions", function () {
        var currDate = getStartOfMonth(_this.props.minDate);
        var lastDate = getStartOfMonth(_this.props.maxDate);
        var options = [];
        while (!isAfter.isAfter(currDate, lastDate)) {
          var timePoint = getTime.getTime(currDate);
          options.push( /*#__PURE__*/React__default.default.createElement("option", {
            key: timePoint,
            value: timePoint
          }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
          currDate = addMonths.addMonths(currDate, 1);
        }
        return options;
      });
      _defineProperty(_this, "onSelectChange", function (e) {
        _this.onChange(e.target.value);
      });
      _defineProperty(_this, "renderSelectMode", function () {
        return /*#__PURE__*/React__default.default.createElement("select", {
          value: getTime.getTime(getStartOfMonth(_this.props.date)),
          className: "react-datepicker__month-year-select",
          onChange: _this.onSelectChange
        }, _this.renderSelectOptions());
      });
      _defineProperty(_this, "renderReadView", function (visible) {
        var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
        return /*#__PURE__*/React__default.default.createElement("div", {
          key: "read",
          style: {
            visibility: visible ? "visible" : "hidden"
          },
          className: "react-datepicker__month-year-read-view",
          onClick: function onClick(event) {
            return _this.toggleDropdown(event);
          }
        }, /*#__PURE__*/React__default.default.createElement("span", {
          className: "react-datepicker__month-year-read-view--down-arrow"
        }), /*#__PURE__*/React__default.default.createElement("span", {
          className: "react-datepicker__month-year-read-view--selected-month-year"
        }, yearMonth));
      });
      _defineProperty(_this, "renderDropdown", function () {
        return /*#__PURE__*/React__default.default.createElement(WrappedMonthYearDropdownOptions, {
          key: "dropdown",
          date: _this.props.date,
          dateFormat: _this.props.dateFormat,
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown,
          locale: _this.props.locale
        });
      });
      _defineProperty(_this, "renderScrollMode", function () {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown());
        }
        return result;
      });
      _defineProperty(_this, "onChange", function (monthYearPoint) {
        _this.toggleDropdown();
        var changedDate = newDate(parseInt(monthYearPoint));
        if (isSameYear(_this.props.date, changedDate) && isSameMonth(_this.props.date, changedDate)) {
          return;
        }
        _this.props.onChange(changedDate);
      });
      _defineProperty(_this, "toggleDropdown", function () {
        return _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        });
      });
      return _this;
    }
    _inherits(MonthYearDropdown, _React$Component);
    return _createClass(MonthYearDropdown, [{
      key: "render",
      value: function render() {
        var renderedDropdown;
        switch (this.props.dropdownMode) {
          case "scroll":
            renderedDropdown = this.renderScrollMode();
            break;
          case "select":
            renderedDropdown = this.renderSelectMode();
            break;
        }
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode)
        }, renderedDropdown);
      }
    }]);
  }(React__default.default.Component);

  var Day = /*#__PURE__*/function (_React$Component) {
    function Day() {
      var _this;
      _classCallCheck(this, Day);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, Day, [].concat(args));
      _defineProperty(_this, "dayEl", /*#__PURE__*/React__default.default.createRef());
      _defineProperty(_this, "handleClick", function (event) {
        if (!_this.isDisabled() && _this.props.onClick) {
          _this.props.onClick(event);
        }
      });
      _defineProperty(_this, "handleMouseEnter", function (event) {
        if (!_this.isDisabled() && _this.props.onMouseEnter) {
          _this.props.onMouseEnter(event);
        }
      });
      _defineProperty(_this, "handleOnKeyDown", function (event) {
        var eventKey = event.key;
        if (eventKey === " ") {
          event.preventDefault();
          event.key = "Enter";
        }
        _this.props.handleOnKeyDown(event);
      });
      _defineProperty(_this, "isSameDay", function (other) {
        return isSameDay(_this.props.day, other);
      });
      _defineProperty(_this, "isKeyboardSelected", function () {
        var _this$props$selectedD;
        if (_this.props.disabledKeyboardNavigation) {
          return false;
        }
        var isSelectedDate = _this.props.selectsMultiple ? (_this$props$selectedD = _this.props.selectedDates) === null || _this$props$selectedD === void 0 ? void 0 : _this$props$selectedD.some(function (date) {
          return _this.isSameDayOrWeek(date);
        }) : _this.isSameDayOrWeek(_this.props.selected);
        return !isSelectedDate && _this.isSameDayOrWeek(_this.props.preSelection);
      });
      _defineProperty(_this, "isDisabled", function () {
        return isDayDisabled(_this.props.day, _this.props);
      });
      _defineProperty(_this, "isExcluded", function () {
        return isDayExcluded(_this.props.day, _this.props);
      });
      _defineProperty(_this, "isStartOfWeek", function () {
        return isSameDay(_this.props.day, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
      });
      _defineProperty(_this, "isSameWeek", function (other) {
        return _this.props.showWeekPicker && isSameDay(other, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
      });
      _defineProperty(_this, "isSameDayOrWeek", function (other) {
        return _this.isSameDay(other) || _this.isSameWeek(other);
      });
      _defineProperty(_this, "getHighLightedClass", function () {
        var _this$props = _this.props,
          day = _this$props.day,
          highlightDates = _this$props.highlightDates;
        if (!highlightDates) {
          return false;
        }

        // Looking for className in the Map of {'day string, 'className'}
        var dayStr = formatDate(day, "MM.dd.yyyy");
        return highlightDates.get(dayStr);
      });
      // Function to return the array containing classname associated to the date
      _defineProperty(_this, "getHolidaysClass", function () {
        var _this$props2 = _this.props,
          day = _this$props2.day,
          holidays = _this$props2.holidays;
        if (!holidays) {
          return false;
        }
        var dayStr = formatDate(day, "MM.dd.yyyy");
        // Looking for className in the Map of {day string: {className, holidayName}}
        if (holidays.has(dayStr)) {
          return [holidays.get(dayStr).className];
        }
      });
      _defineProperty(_this, "isInRange", function () {
        var _this$props3 = _this.props,
          day = _this$props3.day,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isDayInRange(day, startDate, endDate);
      });
      _defineProperty(_this, "isInSelectingRange", function () {
        var _this$props$selecting;
        var _this$props4 = _this.props,
          day = _this$props4.day,
          selectsStart = _this$props4.selectsStart,
          selectsEnd = _this$props4.selectsEnd,
          selectsRange = _this$props4.selectsRange,
          selectsDisabledDaysInRange = _this$props4.selectsDisabledDaysInRange,
          startDate = _this$props4.startDate,
          endDate = _this$props4.endDate;
        var selectingDate = (_this$props$selecting = _this.props.selectingDate) !== null && _this$props$selecting !== void 0 ? _this$props$selecting : _this.props.preSelection;
        if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate || !selectsDisabledDaysInRange && _this.isDisabled()) {
          return false;
        }
        if (selectsStart && endDate && (isBefore.isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))) {
          return isDayInRange(day, selectingDate, endDate);
        }
        if (selectsEnd && startDate && (isAfter.isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
          return isDayInRange(day, startDate, selectingDate);
        }
        if (selectsRange && startDate && !endDate && (isAfter.isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
          return isDayInRange(day, startDate, selectingDate);
        }
        return false;
      });
      _defineProperty(_this, "isSelectingRangeStart", function () {
        var _this$props$selecting2;
        if (!_this.isInSelectingRange()) {
          return false;
        }
        var _this$props5 = _this.props,
          day = _this$props5.day,
          startDate = _this$props5.startDate,
          selectsStart = _this$props5.selectsStart;
        var selectingDate = (_this$props$selecting2 = _this.props.selectingDate) !== null && _this$props$selecting2 !== void 0 ? _this$props$selecting2 : _this.props.preSelection;
        if (selectsStart) {
          return isSameDay(day, selectingDate);
        } else {
          return isSameDay(day, startDate);
        }
      });
      _defineProperty(_this, "isSelectingRangeEnd", function () {
        var _this$props$selecting3;
        if (!_this.isInSelectingRange()) {
          return false;
        }
        var _this$props6 = _this.props,
          day = _this$props6.day,
          endDate = _this$props6.endDate,
          selectsEnd = _this$props6.selectsEnd,
          selectsRange = _this$props6.selectsRange;
        var selectingDate = (_this$props$selecting3 = _this.props.selectingDate) !== null && _this$props$selecting3 !== void 0 ? _this$props$selecting3 : _this.props.preSelection;
        if (selectsEnd || selectsRange) {
          return isSameDay(day, selectingDate);
        } else {
          return isSameDay(day, endDate);
        }
      });
      _defineProperty(_this, "isRangeStart", function () {
        var _this$props7 = _this.props,
          day = _this$props7.day,
          startDate = _this$props7.startDate,
          endDate = _this$props7.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameDay(startDate, day);
      });
      _defineProperty(_this, "isRangeEnd", function () {
        var _this$props8 = _this.props,
          day = _this$props8.day,
          startDate = _this$props8.startDate,
          endDate = _this$props8.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameDay(endDate, day);
      });
      _defineProperty(_this, "isWeekend", function () {
        var weekday = getDay.getDay(_this.props.day);
        return weekday === 0 || weekday === 6;
      });
      _defineProperty(_this, "isAfterMonth", function () {
        return _this.props.month !== undefined && (_this.props.month + 1) % 12 === getMonth.getMonth(_this.props.day);
      });
      _defineProperty(_this, "isBeforeMonth", function () {
        return _this.props.month !== undefined && (getMonth.getMonth(_this.props.day) + 1) % 12 === _this.props.month;
      });
      _defineProperty(_this, "isCurrentDay", function () {
        return _this.isSameDay(newDate());
      });
      _defineProperty(_this, "isSelected", function () {
        if (_this.props.selectsMultiple) {
          var _this$props$selectedD2;
          return (_this$props$selectedD2 = _this.props.selectedDates) === null || _this$props$selectedD2 === void 0 ? void 0 : _this$props$selectedD2.some(function (date) {
            return _this.isSameDayOrWeek(date);
          });
        }
        return _this.isSameDayOrWeek(_this.props.selected);
      });
      _defineProperty(_this, "getClassNames", function (date) {
        var dayClassName = _this.props.dayClassName ? _this.props.dayClassName(date) : undefined;
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
          "react-datepicker__day--outside-month": _this.isAfterMonth() || _this.isBeforeMonth()
        }, _this.getHighLightedClass("react-datepicker__day--highlighted"), _this.getHolidaysClass());
      });
      _defineProperty(_this, "getAriaLabel", function () {
        var _this$props9 = _this.props,
          day = _this$props9.day,
          _this$props9$ariaLabe = _this$props9.ariaLabelPrefixWhenEnabled,
          ariaLabelPrefixWhenEnabled = _this$props9$ariaLabe === void 0 ? "Choose" : _this$props9$ariaLabe,
          _this$props9$ariaLabe2 = _this$props9.ariaLabelPrefixWhenDisabled,
          ariaLabelPrefixWhenDisabled = _this$props9$ariaLabe2 === void 0 ? "Not available" : _this$props9$ariaLabe2;
        var prefix = _this.isDisabled() || _this.isExcluded() ? ariaLabelPrefixWhenDisabled : ariaLabelPrefixWhenEnabled;
        return "".concat(prefix, " ").concat(formatDate(day, "PPPP", _this.props.locale));
      });
      // A function to return the holiday's name as title's content
      _defineProperty(_this, "getTitle", function () {
        var _this$props10 = _this.props,
          day = _this$props10.day,
          _this$props10$holiday = _this$props10.holidays,
          holidays = _this$props10$holiday === void 0 ? new Map() : _this$props10$holiday,
          excludeDates = _this$props10.excludeDates;
        var compareDt = formatDate(day, "MM.dd.yyyy");
        var titles = [];
        if (holidays.has(compareDt)) {
          titles.push.apply(titles, _toConsumableArray(holidays.get(compareDt).holidayNames));
        }
        if (_this.isExcluded()) {
          titles.push(excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.filter(function (excludeDate) {
            return isSameDay(excludeDate.date ? excludeDate.date : excludeDate, day);
          }).map(function (excludeDate) {
            return excludeDate.message;
          }));
        }
        return titles.join(", ");
      });
      _defineProperty(_this, "getTabIndex", function (selected, preSelection) {
        var selectedDay = selected || _this.props.selected;
        var preSelectionDay = preSelection || _this.props.preSelection;
        var tabIndex = !(_this.props.showWeekPicker && (_this.props.showWeekNumber || !_this.isStartOfWeek())) && (_this.isKeyboardSelected() || _this.isSameDay(selectedDay) && isSameDay(preSelectionDay, selectedDay)) ? 0 : -1;
        return tabIndex;
      });
      // various cases when we need to apply focus to the preselected day
      // focus the day on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
      // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
      _defineProperty(_this, "handleFocusDay", function () {
        var _this$dayEl$current;
        var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var shouldFocusDay = false;
        // only do this while the input isn't focused
        // otherwise, typing/backspacing the date manually may steal focus away from the input
        if (_this.getTabIndex() === 0 && !prevProps.isInputFocused && _this.isSameDay(_this.props.preSelection)) {
          // there is currently no activeElement and not inline
          if (!document.activeElement || document.activeElement === document.body) {
            shouldFocusDay = true;
          }
          // inline version:
          // do not focus on initial render to prevent autoFocus issue
          // focus after month has changed via keyboard
          if (_this.props.inline && !_this.props.shouldFocusDayInline) {
            shouldFocusDay = false;
          }
          // the activeElement is in the container, and it is another instance of Day
          if (_this.props.containerRef && _this.props.containerRef.current && _this.props.containerRef.current.contains(document.activeElement) && document.activeElement.classList.contains("react-datepicker__day")) {
            shouldFocusDay = true;
          }
          //day is one of the non rendered duplicate days
          if (_this.props.monthShowsDuplicateDaysEnd && _this.isAfterMonth()) {
            shouldFocusDay = false;
          }
          if (_this.props.monthShowsDuplicateDaysStart && _this.isBeforeMonth()) {
            shouldFocusDay = false;
          }
        }
        shouldFocusDay && ((_this$dayEl$current = _this.dayEl.current) === null || _this$dayEl$current === void 0 ? void 0 : _this$dayEl$current.focus({
          preventScroll: true
        }));
      });
      _defineProperty(_this, "renderDayContents", function () {
        if (_this.props.monthShowsDuplicateDaysEnd && _this.isAfterMonth()) return null;
        if (_this.props.monthShowsDuplicateDaysStart && _this.isBeforeMonth()) return null;
        return _this.props.renderDayContents ? _this.props.renderDayContents(getDate.getDate(_this.props.day), _this.props.day) : getDate.getDate(_this.props.day);
      });
      _defineProperty(_this, "render", function () {
        return /*#__PURE__*/React__default.default.createElement("div", {
          ref: _this.dayEl,
          className: _this.getClassNames(_this.props.day),
          onKeyDown: _this.handleOnKeyDown,
          onClick: _this.handleClick,
          onMouseEnter: !_this.props.usePointerEvent ? _this.handleMouseEnter : undefined,
          onPointerEnter: _this.props.usePointerEvent ? _this.handleMouseEnter : undefined,
          tabIndex: _this.getTabIndex(),
          "aria-label": _this.getAriaLabel(),
          role: "option",
          title: _this.getTitle(),
          "aria-disabled": _this.isDisabled(),
          "aria-current": _this.isCurrentDay() ? "date" : undefined,
          "aria-selected": _this.isSelected() || _this.isInRange()
        }, _this.renderDayContents(), _this.getTitle() !== "" && /*#__PURE__*/React__default.default.createElement("span", {
          className: "overlay"
        }, _this.getTitle()));
      });
      return _this;
    }
    _inherits(Day, _React$Component);
    return _createClass(Day, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.handleFocusDay();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.handleFocusDay(prevProps);
      }
    }]);
  }(React__default.default.Component);

  var WeekNumber = /*#__PURE__*/function (_React$Component) {
    function WeekNumber() {
      var _this;
      _classCallCheck(this, WeekNumber);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, WeekNumber, [].concat(args));
      _defineProperty(_this, "weekNumberEl", /*#__PURE__*/React__default.default.createRef());
      _defineProperty(_this, "handleClick", function (event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
      });
      _defineProperty(_this, "handleOnKeyDown", function (event) {
        var eventKey = event.key;
        if (eventKey === " ") {
          event.preventDefault();
          event.key = "Enter";
        }
        _this.props.handleOnKeyDown(event);
      });
      _defineProperty(_this, "isKeyboardSelected", function () {
        return !_this.props.disabledKeyboardNavigation && !isSameDay(_this.props.date, _this.props.selected) && isSameDay(_this.props.date, _this.props.preSelection);
      });
      _defineProperty(_this, "getTabIndex", function () {
        return _this.props.showWeekPicker && _this.props.showWeekNumber && (_this.isKeyboardSelected() || isSameDay(_this.props.date, _this.props.selected) && isSameDay(_this.props.preSelection, _this.props.selected)) ? 0 : -1;
      });
      // various cases when we need to apply focus to the preselected week-number
      // focus the week-number on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
      // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
      _defineProperty(_this, "handleFocusWeekNumber", function () {
        var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var shouldFocusWeekNumber = false;
        // only do this while the input isn't focused
        // otherwise, typing/backspacing the date manually may steal focus away from the input
        if (_this.getTabIndex() === 0 && !prevProps.isInputFocused && isSameDay(_this.props.date, _this.props.preSelection)) {
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
          if (_this.props.containerRef && _this.props.containerRef.current && _this.props.containerRef.current.contains(document.activeElement) && document.activeElement && document.activeElement.classList.contains("react-datepicker__week-number")) {
            shouldFocusWeekNumber = true;
          }
        }
        shouldFocusWeekNumber && _this.weekNumberEl.current && _this.weekNumberEl.current.focus({
          preventScroll: true
        });
      });
      return _this;
    }
    _inherits(WeekNumber, _React$Component);
    return _createClass(WeekNumber, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.handleFocusWeekNumber();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.handleFocusWeekNumber(prevProps);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
          weekNumber = _this$props.weekNumber,
          _this$props$ariaLabel = _this$props.ariaLabelPrefix,
          ariaLabelPrefix = _this$props$ariaLabel === void 0 ? "week " : _this$props$ariaLabel,
          onClick = _this$props.onClick;
        var weekNumberClasses = {
          "react-datepicker__week-number": true,
          "react-datepicker__week-number--clickable": !!onClick,
          "react-datepicker__week-number--selected": !!onClick && isSameDay(this.props.date, this.props.selected),
          "react-datepicker__week-number--keyboard-selected": this.isKeyboardSelected()
        };
        return /*#__PURE__*/React__default.default.createElement("div", {
          ref: this.weekNumberEl,
          className: clsx.clsx(weekNumberClasses),
          "aria-label": "".concat(ariaLabelPrefix, " ").concat(this.props.weekNumber),
          onClick: this.handleClick,
          onKeyDown: this.handleOnKeyDown,
          tabIndex: this.getTabIndex()
        }, weekNumber);
      }
    }], [{
      key: "defaultProps",
      get: function get() {
        return {
          ariaLabelPrefix: "week "
        };
      }
    }]);
  }(React__default.default.Component);

  var Week = /*#__PURE__*/function (_React$Component) {
    function Week() {
      var _this;
      _classCallCheck(this, Week);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, Week, [].concat(args));
      _defineProperty(_this, "handleDayClick", function (day, event) {
        if (_this.props.onDayClick) {
          _this.props.onDayClick(day, event);
        }
      });
      _defineProperty(_this, "handleDayMouseEnter", function (day) {
        if (_this.props.onDayMouseEnter) {
          _this.props.onDayMouseEnter(day);
        }
      });
      _defineProperty(_this, "handleWeekClick", function (day, weekNumber, event) {
        if (typeof _this.props.onWeekSelect === "function") {
          _this.props.onWeekSelect(day, weekNumber, event);
        }
        if (_this.props.showWeekPicker) {
          _this.handleDayClick(day, event);
        }
        if (_this.props.shouldCloseOnSelect) {
          _this.props.setOpen(false);
        }
      });
      _defineProperty(_this, "formatWeekNumber", function (date) {
        if (_this.props.formatWeekNumber) {
          return _this.props.formatWeekNumber(date);
        }
        return getWeek(date);
      });
      _defineProperty(_this, "renderDays", function () {
        var startOfWeek = _this.startOfWeek();
        var days = [];
        var weekNumber = _this.formatWeekNumber(startOfWeek);
        if (_this.props.showWeekNumber) {
          var onClickAction = _this.props.onWeekSelect || _this.props.showWeekPicker ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber) : undefined;
          days.push( /*#__PURE__*/React__default.default.createElement(WeekNumber, {
            key: "W",
            weekNumber: weekNumber,
            date: startOfWeek,
            onClick: onClickAction,
            selected: _this.props.selected,
            preSelection: _this.props.preSelection,
            ariaLabelPrefix: _this.props.ariaLabelPrefix,
            showWeekPicker: _this.props.showWeekPicker,
            showWeekNumber: _this.props.showWeekNumber,
            disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
            handleOnKeyDown: _this.props.handleOnKeyDown,
            isInputFocused: _this.props.isInputFocused,
            containerRef: _this.props.containerRef
          }));
        }
        return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
          var day = addDays.addDays(startOfWeek, offset);
          return /*#__PURE__*/React__default.default.createElement(Day, {
            ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix,
            ariaLabelPrefixWhenDisabled: _this.props.disabledDayAriaLabelPrefix,
            key: day.valueOf(),
            day: day,
            month: _this.props.month,
            onClick: _this.handleDayClick.bind(_this, day),
            usePointerEvent: _this.props.usePointerEvent,
            onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
            minDate: _this.props.minDate,
            maxDate: _this.props.maxDate,
            calendarStartDay: _this.props.calendarStartDay,
            excludeDates: _this.props.excludeDates,
            excludeDateIntervals: _this.props.excludeDateIntervals,
            includeDates: _this.props.includeDates,
            includeDateIntervals: _this.props.includeDateIntervals,
            highlightDates: _this.props.highlightDates,
            holidays: _this.props.holidays,
            selectingDate: _this.props.selectingDate,
            filterDate: _this.props.filterDate,
            preSelection: _this.props.preSelection,
            selected: _this.props.selected,
            selectsStart: _this.props.selectsStart,
            selectsEnd: _this.props.selectsEnd,
            selectsRange: _this.props.selectsRange,
            showWeekPicker: _this.props.showWeekPicker,
            showWeekNumber: _this.props.showWeekNumber,
            selectsDisabledDaysInRange: _this.props.selectsDisabledDaysInRange,
            selectsMultiple: _this.props.selectsMultiple,
            selectedDates: _this.props.selectedDates,
            startDate: _this.props.startDate,
            endDate: _this.props.endDate,
            dayClassName: _this.props.dayClassName,
            renderDayContents: _this.props.renderDayContents,
            disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
            handleOnKeyDown: _this.props.handleOnKeyDown,
            isInputFocused: _this.props.isInputFocused,
            containerRef: _this.props.containerRef,
            inline: _this.props.inline,
            shouldFocusDayInline: _this.props.shouldFocusDayInline,
            monthShowsDuplicateDaysEnd: _this.props.monthShowsDuplicateDaysEnd,
            monthShowsDuplicateDaysStart: _this.props.monthShowsDuplicateDaysStart,
            locale: _this.props.locale
          });
        }));
      });
      _defineProperty(_this, "startOfWeek", function () {
        return getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay);
      });
      _defineProperty(_this, "isKeyboardSelected", function () {
        return !_this.props.disabledKeyboardNavigation && !isSameDay(_this.startOfWeek(), _this.props.selected) && isSameDay(_this.startOfWeek(), _this.props.preSelection);
      });
      return _this;
    }
    _inherits(Week, _React$Component);
    return _createClass(Week, [{
      key: "render",
      value: function render() {
        var weekNumberClasses = {
          "react-datepicker__week": true,
          "react-datepicker__week--selected": isSameDay(this.startOfWeek(), this.props.selected),
          "react-datepicker__week--keyboard-selected": this.isKeyboardSelected()
        };
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: clsx.clsx(weekNumberClasses)
        }, this.renderDays());
      }
    }], [{
      key: "defaultProps",
      get: function get() {
        return {
          shouldCloseOnSelect: true
        };
      }
    }]);
  }(React__default.default.Component);

  var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;
  var MONTH_COLUMNS_LAYOUT = {
    TWO_COLUMNS: "two_columns",
    THREE_COLUMNS: "three_columns",
    FOUR_COLUMNS: "four_columns"
  };
  var MONTH_COLUMNS = _defineProperty(_defineProperty(_defineProperty({}, MONTH_COLUMNS_LAYOUT.TWO_COLUMNS, {
    grid: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]],
    verticalNavigationOffset: 2
  }), MONTH_COLUMNS_LAYOUT.THREE_COLUMNS, {
    grid: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]],
    verticalNavigationOffset: 3
  }), MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS, {
    grid: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]],
    verticalNavigationOffset: 4
  });
  var MONTH_NAVIGATION_HORIZONTAL_OFFSET = 1;
  function getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker) {
    if (showFourColumnMonthYearPicker) return MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS;
    if (showTwoColumnMonthYearPicker) return MONTH_COLUMNS_LAYOUT.TWO_COLUMNS;
    return MONTH_COLUMNS_LAYOUT.THREE_COLUMNS;
  }
  var Month = /*#__PURE__*/function (_React$Component) {
    function Month() {
      var _this;
      _classCallCheck(this, Month);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, Month, [].concat(args));
      _defineProperty(_this, "MONTH_REFS", _toConsumableArray(Array(12)).map(function () {
        return /*#__PURE__*/React__default.default.createRef();
      }));
      _defineProperty(_this, "QUARTER_REFS", _toConsumableArray(Array(4)).map(function () {
        return /*#__PURE__*/React__default.default.createRef();
      }));
      _defineProperty(_this, "isDisabled", function (date) {
        return isDayDisabled(date, _this.props);
      });
      _defineProperty(_this, "isExcluded", function (date) {
        return isDayExcluded(date, _this.props);
      });
      _defineProperty(_this, "handleDayClick", function (day, event) {
        if (_this.props.onDayClick) {
          _this.props.onDayClick(day, event, _this.props.orderInDisplay);
        }
      });
      _defineProperty(_this, "handleDayMouseEnter", function (day) {
        if (_this.props.onDayMouseEnter) {
          _this.props.onDayMouseEnter(day);
        }
      });
      _defineProperty(_this, "handleMouseLeave", function () {
        if (_this.props.onMouseLeave) {
          _this.props.onMouseLeave();
        }
      });
      _defineProperty(_this, "isRangeStartMonth", function (m) {
        var _this$props = _this.props,
          day = _this$props.day,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameMonth(setMonth.setMonth(day, m), startDate);
      });
      _defineProperty(_this, "isRangeStartQuarter", function (q) {
        var _this$props2 = _this.props,
          day = _this$props2.day,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameQuarter(setQuarter.setQuarter(day, q), startDate);
      });
      _defineProperty(_this, "isRangeEndMonth", function (m) {
        var _this$props3 = _this.props,
          day = _this$props3.day,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameMonth(setMonth.setMonth(day, m), endDate);
      });
      _defineProperty(_this, "isRangeEndQuarter", function (q) {
        var _this$props4 = _this.props,
          day = _this$props4.day,
          startDate = _this$props4.startDate,
          endDate = _this$props4.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameQuarter(setQuarter.setQuarter(day, q), endDate);
      });
      _defineProperty(_this, "isInSelectingRangeMonth", function (m) {
        var _this$props$selecting;
        var _this$props5 = _this.props,
          day = _this$props5.day,
          selectsStart = _this$props5.selectsStart,
          selectsEnd = _this$props5.selectsEnd,
          selectsRange = _this$props5.selectsRange,
          startDate = _this$props5.startDate,
          endDate = _this$props5.endDate;
        var selectingDate = (_this$props$selecting = _this.props.selectingDate) !== null && _this$props$selecting !== void 0 ? _this$props$selecting : _this.props.preSelection;
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
      });
      _defineProperty(_this, "isSelectingMonthRangeStart", function (m) {
        var _this$props$selecting2;
        if (!_this.isInSelectingRangeMonth(m)) {
          return false;
        }
        var _this$props6 = _this.props,
          day = _this$props6.day,
          startDate = _this$props6.startDate,
          selectsStart = _this$props6.selectsStart;
        var _month = setMonth.setMonth(day, m);
        var selectingDate = (_this$props$selecting2 = _this.props.selectingDate) !== null && _this$props$selecting2 !== void 0 ? _this$props$selecting2 : _this.props.preSelection;
        if (selectsStart) {
          return isSameMonth(_month, selectingDate);
        } else {
          return isSameMonth(_month, startDate);
        }
      });
      _defineProperty(_this, "isSelectingMonthRangeEnd", function (m) {
        var _this$props$selecting3;
        if (!_this.isInSelectingRangeMonth(m)) {
          return false;
        }
        var _this$props7 = _this.props,
          day = _this$props7.day,
          endDate = _this$props7.endDate,
          selectsEnd = _this$props7.selectsEnd,
          selectsRange = _this$props7.selectsRange;
        var _month = setMonth.setMonth(day, m);
        var selectingDate = (_this$props$selecting3 = _this.props.selectingDate) !== null && _this$props$selecting3 !== void 0 ? _this$props$selecting3 : _this.props.preSelection;
        if (selectsEnd || selectsRange) {
          return isSameMonth(_month, selectingDate);
        } else {
          return isSameMonth(_month, endDate);
        }
      });
      _defineProperty(_this, "isInSelectingRangeQuarter", function (q) {
        var _this$props$selecting4;
        var _this$props8 = _this.props,
          day = _this$props8.day,
          selectsStart = _this$props8.selectsStart,
          selectsEnd = _this$props8.selectsEnd,
          selectsRange = _this$props8.selectsRange,
          startDate = _this$props8.startDate,
          endDate = _this$props8.endDate;
        var selectingDate = (_this$props$selecting4 = _this.props.selectingDate) !== null && _this$props$selecting4 !== void 0 ? _this$props$selecting4 : _this.props.preSelection;
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
      });
      _defineProperty(_this, "isWeekInMonth", function (startOfWeek) {
        var day = _this.props.day;
        var endOfWeek = addDays.addDays(startOfWeek, 6);
        return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
      });
      _defineProperty(_this, "isCurrentMonth", function (day, m) {
        return getYear.getYear(day) === getYear.getYear(newDate()) && m === getMonth.getMonth(newDate());
      });
      _defineProperty(_this, "isCurrentQuarter", function (day, q) {
        return getYear.getYear(day) === getYear.getYear(newDate()) && q === getQuarter.getQuarter(newDate());
      });
      _defineProperty(_this, "isSelectedMonth", function (day, m, selected) {
        return getMonth.getMonth(selected) === m && getYear.getYear(day) === getYear.getYear(selected);
      });
      _defineProperty(_this, "isSelectedQuarter", function (day, q, selected) {
        return getQuarter.getQuarter(day) === q && getYear.getYear(day) === getYear.getYear(selected);
      });
      _defineProperty(_this, "renderWeeks", function () {
        var weeks = [];
        var isFixedHeight = _this.props.fixedHeight;
        var i = 0;
        var breakAfterNextPush = false;
        var currentWeekStart = getStartOfWeek(getStartOfMonth(_this.props.day), _this.props.locale, _this.props.calendarStartDay);
        var selected = _this.props.showWeekPicker ? getStartOfWeek(_this.props.selected, _this.props.locale, _this.props.calendarStartDay) : _this.props.selected;
        var preSelection = _this.props.showWeekPicker ? getStartOfWeek(_this.props.preSelection, _this.props.locale, _this.props.calendarStartDay) : _this.props.preSelection;
        while (true) {
          weeks.push( /*#__PURE__*/React__default.default.createElement(Week, {
            ariaLabelPrefix: _this.props.weekAriaLabelPrefix,
            chooseDayAriaLabelPrefix: _this.props.chooseDayAriaLabelPrefix,
            disabledDayAriaLabelPrefix: _this.props.disabledDayAriaLabelPrefix,
            key: i,
            day: currentWeekStart,
            month: getMonth.getMonth(_this.props.day),
            onDayClick: _this.handleDayClick,
            usePointerEvent: _this.props.usePointerEvent,
            onDayMouseEnter: _this.handleDayMouseEnter,
            onWeekSelect: _this.props.onWeekSelect,
            formatWeekNumber: _this.props.formatWeekNumber,
            locale: _this.props.locale,
            minDate: _this.props.minDate,
            maxDate: _this.props.maxDate,
            excludeDates: _this.props.excludeDates,
            excludeDateIntervals: _this.props.excludeDateIntervals,
            includeDates: _this.props.includeDates,
            includeDateIntervals: _this.props.includeDateIntervals,
            inline: _this.props.inline,
            shouldFocusDayInline: _this.props.shouldFocusDayInline,
            highlightDates: _this.props.highlightDates,
            holidays: _this.props.holidays,
            selectingDate: _this.props.selectingDate,
            filterDate: _this.props.filterDate,
            preSelection: preSelection,
            selected: selected,
            selectsStart: _this.props.selectsStart,
            selectsEnd: _this.props.selectsEnd,
            selectsRange: _this.props.selectsRange,
            selectsDisabledDaysInRange: _this.props.selectsDisabledDaysInRange,
            selectsMultiple: _this.props.selectsMultiple,
            selectedDates: _this.props.selectedDates,
            showWeekNumber: _this.props.showWeekNumbers,
            showWeekPicker: _this.props.showWeekPicker,
            startDate: _this.props.startDate,
            endDate: _this.props.endDate,
            dayClassName: _this.props.dayClassName,
            setOpen: _this.props.setOpen,
            shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
            disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
            renderDayContents: _this.props.renderDayContents,
            handleOnKeyDown: _this.props.handleOnKeyDown,
            isInputFocused: _this.props.isInputFocused,
            containerRef: _this.props.containerRef,
            calendarStartDay: _this.props.calendarStartDay,
            monthShowsDuplicateDaysEnd: _this.props.monthShowsDuplicateDaysEnd,
            monthShowsDuplicateDaysStart: _this.props.monthShowsDuplicateDaysStart
          }));
          if (breakAfterNextPush) break;
          i++;
          currentWeekStart = addWeeks.addWeeks(currentWeekStart, 1);

          // If one of these conditions is true, we will either break on this week
          // or break on the next week
          var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
          var isNonFixedAndOutOfMonth = !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);
          if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
            if (_this.props.peekNextMonth) {
              breakAfterNextPush = true;
            } else {
              break;
            }
          }
        }
        return weeks;
      });
      _defineProperty(_this, "onMonthClick", function (e, m) {
        var labelDate = setMonth.setMonth(_this.props.day, m);
        if (isMonthDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayClick(getStartOfMonth(labelDate), e);
      });
      _defineProperty(_this, "onMonthMouseEnter", function (m) {
        var labelDate = setMonth.setMonth(_this.props.day, m);
        if (isMonthDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayMouseEnter(getStartOfMonth(labelDate));
      });
      _defineProperty(_this, "handleMonthNavigation", function (newMonth, newDate) {
        if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) return;
        _this.props.setPreSelection(newDate);
        _this.MONTH_REFS[newMonth].current && _this.MONTH_REFS[newMonth].current.focus();
      });
      _defineProperty(_this, "onMonthKeyDown", function (event, month) {
        var _this$props9 = _this.props,
          selected = _this$props9.selected,
          preSelection = _this$props9.preSelection,
          disabledKeyboardNavigation = _this$props9.disabledKeyboardNavigation,
          showTwoColumnMonthYearPicker = _this$props9.showTwoColumnMonthYearPicker,
          showFourColumnMonthYearPicker = _this$props9.showFourColumnMonthYearPicker,
          setPreSelection = _this$props9.setPreSelection,
          handleOnMonthKeyDown = _this$props9.handleOnMonthKeyDown;
        var eventKey = event.key;
        if (eventKey !== "Tab") {
          // preventDefault on tab event blocks focus change
          event.preventDefault();
        }
        if (!disabledKeyboardNavigation) {
          var monthColumnsLayout = getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker);
          var verticalOffset = MONTH_COLUMNS[monthColumnsLayout].verticalNavigationOffset;
          var monthsGrid = MONTH_COLUMNS[monthColumnsLayout].grid;
          switch (eventKey) {
            case "Enter":
              _this.onMonthClick(event, month);
              setPreSelection(selected);
              break;
            case "ArrowRight":
              _this.handleMonthNavigation(month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET, addMonths.addMonths(preSelection, MONTH_NAVIGATION_HORIZONTAL_OFFSET));
              break;
            case "ArrowLeft":
              _this.handleMonthNavigation(month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET, subMonths.subMonths(preSelection, MONTH_NAVIGATION_HORIZONTAL_OFFSET));
              break;
            case "ArrowUp":
              _this.handleMonthNavigation(
              // Check if month on the first row
              monthsGrid[0].includes(month) ? month + 12 - verticalOffset : month - verticalOffset, subMonths.subMonths(preSelection, verticalOffset));
              break;
            case "ArrowDown":
              _this.handleMonthNavigation(
              // Check if month on the last row
              monthsGrid[monthsGrid.length - 1].includes(month) ? month - 12 + verticalOffset : month + verticalOffset, addMonths.addMonths(preSelection, verticalOffset));
              break;
          }
        }
        handleOnMonthKeyDown && handleOnMonthKeyDown(event);
      });
      _defineProperty(_this, "onQuarterClick", function (e, q) {
        var labelDate = setQuarter.setQuarter(_this.props.day, q);
        if (isQuarterDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayClick(getStartOfQuarter(labelDate), e);
      });
      _defineProperty(_this, "onQuarterMouseEnter", function (q) {
        var labelDate = setQuarter.setQuarter(_this.props.day, q);
        if (isQuarterDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayMouseEnter(getStartOfQuarter(labelDate));
      });
      _defineProperty(_this, "handleQuarterNavigation", function (newQuarter, newDate) {
        if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) return;
        _this.props.setPreSelection(newDate);
        _this.QUARTER_REFS[newQuarter - 1].current && _this.QUARTER_REFS[newQuarter - 1].current.focus();
      });
      _defineProperty(_this, "onQuarterKeyDown", function (event, quarter) {
        var eventKey = event.key;
        if (!_this.props.disabledKeyboardNavigation) {
          switch (eventKey) {
            case "Enter":
              _this.onQuarterClick(event, quarter);
              _this.props.setPreSelection(_this.props.selected);
              break;
            case "ArrowRight":
              _this.handleQuarterNavigation(quarter === 4 ? 1 : quarter + 1, addQuarters.addQuarters(_this.props.preSelection, 1));
              break;
            case "ArrowLeft":
              _this.handleQuarterNavigation(quarter === 1 ? 4 : quarter - 1, subQuarters.subQuarters(_this.props.preSelection, 1));
              break;
          }
        }
      });
      _defineProperty(_this, "getMonthClassNames", function (m) {
        var _this$props10 = _this.props,
          day = _this$props10.day,
          startDate = _this$props10.startDate,
          endDate = _this$props10.endDate,
          selected = _this$props10.selected,
          minDate = _this$props10.minDate,
          maxDate = _this$props10.maxDate,
          preSelection = _this$props10.preSelection,
          monthClassName = _this$props10.monthClassName,
          excludeDates = _this$props10.excludeDates,
          includeDates = _this$props10.includeDates;
        var _monthClassName = monthClassName ? monthClassName(setMonth.setMonth(day, m)) : undefined;
        var labelDate = setMonth.setMonth(day, m);
        return clsx.clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
          "react-datepicker__month-text--disabled": (minDate || maxDate || excludeDates || includeDates) && isMonthDisabled(labelDate, _this.props),
          "react-datepicker__month-text--selected": _this.isSelectedMonth(day, m, selected),
          "react-datepicker__month-text--keyboard-selected": !_this.props.disabledKeyboardNavigation && _this.isSelectedMonth(day, m, preSelection),
          "react-datepicker__month-text--in-selecting-range": _this.isInSelectingRangeMonth(m),
          "react-datepicker__month-text--in-range": isMonthInRange(startDate, endDate, m, day),
          "react-datepicker__month-text--range-start": _this.isRangeStartMonth(m),
          "react-datepicker__month-text--range-end": _this.isRangeEndMonth(m),
          "react-datepicker__month-text--selecting-range-start": _this.isSelectingMonthRangeStart(m),
          "react-datepicker__month-text--selecting-range-end": _this.isSelectingMonthRangeEnd(m),
          "react-datepicker__month-text--today": _this.isCurrentMonth(day, m)
        });
      });
      _defineProperty(_this, "getTabIndex", function (m) {
        var preSelectedMonth = getMonth.getMonth(_this.props.preSelection);
        var tabIndex = !_this.props.disabledKeyboardNavigation && m === preSelectedMonth ? "0" : "-1";
        return tabIndex;
      });
      _defineProperty(_this, "getQuarterTabIndex", function (q) {
        var preSelectedQuarter = getQuarter.getQuarter(_this.props.preSelection);
        var tabIndex = !_this.props.disabledKeyboardNavigation && q === preSelectedQuarter ? "0" : "-1";
        return tabIndex;
      });
      _defineProperty(_this, "getAriaLabel", function (month) {
        var _this$props11 = _this.props,
          _this$props11$chooseD = _this$props11.chooseDayAriaLabelPrefix,
          chooseDayAriaLabelPrefix = _this$props11$chooseD === void 0 ? "Choose" : _this$props11$chooseD,
          _this$props11$disable = _this$props11.disabledDayAriaLabelPrefix,
          disabledDayAriaLabelPrefix = _this$props11$disable === void 0 ? "Not available" : _this$props11$disable,
          day = _this$props11.day;
        var labelDate = setMonth.setMonth(day, month);
        var prefix = _this.isDisabled(labelDate) || _this.isExcluded(labelDate) ? disabledDayAriaLabelPrefix : chooseDayAriaLabelPrefix;
        return "".concat(prefix, " ").concat(formatDate(labelDate, "MMMM yyyy"));
      });
      _defineProperty(_this, "getQuarterClassNames", function (q) {
        var _this$props12 = _this.props,
          day = _this$props12.day,
          startDate = _this$props12.startDate,
          endDate = _this$props12.endDate,
          selected = _this$props12.selected,
          minDate = _this$props12.minDate,
          maxDate = _this$props12.maxDate,
          preSelection = _this$props12.preSelection,
          disabledKeyboardNavigation = _this$props12.disabledKeyboardNavigation;
        return clsx.clsx("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
          "react-datepicker__quarter-text--disabled": (minDate || maxDate) && isQuarterDisabled(setQuarter.setQuarter(day, q), _this.props),
          "react-datepicker__quarter-text--selected": _this.isSelectedQuarter(day, q, selected),
          "react-datepicker__quarter-text--keyboard-selected": !disabledKeyboardNavigation && _this.isSelectedQuarter(day, q, preSelection),
          "react-datepicker__quarter-text--in-selecting-range": _this.isInSelectingRangeQuarter(q),
          "react-datepicker__quarter-text--in-range": isQuarterInRange(startDate, endDate, q, day),
          "react-datepicker__quarter-text--range-start": _this.isRangeStartQuarter(q),
          "react-datepicker__quarter-text--range-end": _this.isRangeEndQuarter(q)
        });
      });
      _defineProperty(_this, "getMonthContent", function (m) {
        var _this$props13 = _this.props,
          showFullMonthYearPicker = _this$props13.showFullMonthYearPicker,
          renderMonthContent = _this$props13.renderMonthContent,
          locale = _this$props13.locale,
          day = _this$props13.day;
        var shortMonthText = getMonthShortInLocale(m, locale);
        var fullMonthText = getMonthInLocale(m, locale);
        if (renderMonthContent) {
          return renderMonthContent(m, shortMonthText, fullMonthText, day);
        }
        return showFullMonthYearPicker ? fullMonthText : shortMonthText;
      });
      _defineProperty(_this, "getQuarterContent", function (q) {
        var _this$props14 = _this.props,
          renderQuarterContent = _this$props14.renderQuarterContent,
          locale = _this$props14.locale;
        var shortQuarter = getQuarterShortInLocale(q, locale);
        return renderQuarterContent ? renderQuarterContent(q, shortQuarter) : shortQuarter;
      });
      _defineProperty(_this, "renderMonths", function () {
        var _this$props15 = _this.props,
          showTwoColumnMonthYearPicker = _this$props15.showTwoColumnMonthYearPicker,
          showFourColumnMonthYearPicker = _this$props15.showFourColumnMonthYearPicker,
          day = _this$props15.day,
          selected = _this$props15.selected;
        var monthColumns = MONTH_COLUMNS[getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker)].grid;
        return monthColumns.map(function (month, i) {
          return /*#__PURE__*/React__default.default.createElement("div", {
            className: "react-datepicker__month-wrapper",
            key: i
          }, month.map(function (m, j) {
            return /*#__PURE__*/React__default.default.createElement("div", {
              ref: _this.MONTH_REFS[m],
              key: j,
              onClick: function onClick(ev) {
                _this.onMonthClick(ev, m);
              },
              onKeyDown: function onKeyDown(ev) {
                if (isSpaceKeyDown(ev)) {
                  ev.preventDefault();
                  ev.key = "Enter";
                }
                _this.onMonthKeyDown(ev, m);
              },
              onMouseEnter: !_this.props.usePointerEvent ? function () {
                return _this.onMonthMouseEnter(m);
              } : undefined,
              onPointerEnter: _this.props.usePointerEvent ? function () {
                return _this.onMonthMouseEnter(m);
              } : undefined,
              tabIndex: _this.getTabIndex(m),
              className: _this.getMonthClassNames(m),
              role: "option",
              "aria-label": _this.getAriaLabel(m),
              "aria-current": _this.isCurrentMonth(day, m) ? "date" : undefined,
              "aria-selected": _this.isSelectedMonth(day, m, selected)
            }, _this.getMonthContent(m));
          }));
        });
      });
      _defineProperty(_this, "renderQuarters", function () {
        var _this$props16 = _this.props,
          day = _this$props16.day,
          selected = _this$props16.selected;
        var quarters = [1, 2, 3, 4];
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__quarter-wrapper"
        }, quarters.map(function (q, j) {
          return /*#__PURE__*/React__default.default.createElement("div", {
            key: j,
            ref: _this.QUARTER_REFS[j],
            role: "option",
            onClick: function onClick(ev) {
              _this.onQuarterClick(ev, q);
            },
            onKeyDown: function onKeyDown(ev) {
              _this.onQuarterKeyDown(ev, q);
            },
            onMouseEnter: !_this.props.usePointerEvent ? function () {
              return _this.onQuarterMouseEnter(q);
            } : undefined,
            onPointerEnter: _this.props.usePointerEvent ? function () {
              return _this.onQuarterMouseEnter(q);
            } : undefined,
            className: _this.getQuarterClassNames(q),
            "aria-selected": _this.isSelectedQuarter(day, q, selected),
            tabIndex: _this.getQuarterTabIndex(q),
            "aria-current": _this.isCurrentQuarter(day, q) ? "date" : undefined
          }, _this.getQuarterContent(q));
        }));
      });
      _defineProperty(_this, "getClassNames", function () {
        var _this$props17 = _this.props,
          selectingDate = _this$props17.selectingDate,
          selectsStart = _this$props17.selectsStart,
          selectsEnd = _this$props17.selectsEnd,
          showMonthYearPicker = _this$props17.showMonthYearPicker,
          showQuarterYearPicker = _this$props17.showQuarterYearPicker,
          showWeekPicker = _this$props17.showWeekPicker;
        return clsx.clsx("react-datepicker__month", {
          "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd)
        }, {
          "react-datepicker__monthPicker": showMonthYearPicker
        }, {
          "react-datepicker__quarterPicker": showQuarterYearPicker
        }, {
          "react-datepicker__weekPicker": showWeekPicker
        });
      });
      return _this;
    }
    _inherits(Month, _React$Component);
    return _createClass(Month, [{
      key: "render",
      value: function render() {
        var _this$props18 = this.props,
          showMonthYearPicker = _this$props18.showMonthYearPicker,
          showQuarterYearPicker = _this$props18.showQuarterYearPicker,
          day = _this$props18.day,
          _this$props18$ariaLab = _this$props18.ariaLabelPrefix,
          ariaLabelPrefix = _this$props18$ariaLab === void 0 ? "Month " : _this$props18$ariaLab;
        var formattedAriaLabelPrefix = ariaLabelPrefix ? ariaLabelPrefix.trim() + " " : "";
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: this.getClassNames(),
          onMouseLeave: !this.props.usePointerEvent ? this.handleMouseLeave : undefined,
          onPointerLeave: this.props.usePointerEvent ? this.handleMouseLeave : undefined,
          "aria-label": "".concat(formattedAriaLabelPrefix).concat(formatDate(day, "MMMM, yyyy")),
          role: "listbox"
        }, showMonthYearPicker ? this.renderMonths() : showQuarterYearPicker ? this.renderQuarters() : this.renderWeeks());
      }
    }]);
  }(React__default.default.Component);

  var Time = /*#__PURE__*/function (_React$Component) {
    function Time() {
      var _this;
      _classCallCheck(this, Time);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, Time, [].concat(args));
      _defineProperty(_this, "state", {
        height: null
      });
      _defineProperty(_this, "scrollToTheSelectedTime", function () {
        requestAnimationFrame(function () {
          if (!_this.list) return;
          _this.list.scrollTop = _this.centerLi && Time.calcCenterPosition(_this.props.monthRef ? _this.props.monthRef.clientHeight - _this.header.clientHeight : _this.list.clientHeight, _this.centerLi);
        });
      });
      _defineProperty(_this, "handleClick", function (time) {
        if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || (_this.props.excludeTimes || _this.props.includeTimes || _this.props.filterTime) && isTimeDisabled(time, _this.props)) {
          return;
        }
        _this.props.onChange(time);
      });
      _defineProperty(_this, "isSelectedTime", function (time) {
        return _this.props.selected && isSameMinute(_this.props.selected, time);
      });
      _defineProperty(_this, "isDisabledTime", function (time) {
        return (_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || (_this.props.excludeTimes || _this.props.includeTimes || _this.props.filterTime) && isTimeDisabled(time, _this.props);
      });
      _defineProperty(_this, "liClasses", function (time) {
        var classes = ["react-datepicker__time-list-item", _this.props.timeClassName ? _this.props.timeClassName(time) : undefined];
        if (_this.isSelectedTime(time)) {
          classes.push("react-datepicker__time-list-item--selected");
        }
        if (_this.isDisabledTime(time)) {
          classes.push("react-datepicker__time-list-item--disabled");
        }
        if (_this.props.injectTimes && (getHours.getHours(time) * 60 + getMinutes.getMinutes(time)) % _this.props.intervals !== 0) {
          classes.push("react-datepicker__time-list-item--injected");
        }
        return classes.join(" ");
      });
      _defineProperty(_this, "handleOnKeyDown", function (event, time) {
        if (event.key === " ") {
          event.preventDefault();
          event.key = "Enter";
        }
        if ((event.key === "ArrowUp" || event.key === "ArrowLeft") && event.target.previousSibling) {
          event.preventDefault();
          event.target.previousSibling.focus();
        }
        if ((event.key === "ArrowDown" || event.key === "ArrowRight") && event.target.nextSibling) {
          event.preventDefault();
          event.target.nextSibling.focus();
        }
        if (event.key === "Enter") {
          _this.handleClick(time);
        }
        _this.props.handleOnKeyDown(event);
      });
      _defineProperty(_this, "renderTimes", function () {
        var times = [];
        var format = _this.props.format ? _this.props.format : "p";
        var intervals = _this.props.intervals;
        var activeDate = _this.props.selected || _this.props.openToDate || newDate();
        var base = getStartOfDay(activeDate);
        var sortedInjectTimes = _this.props.injectTimes && _this.props.injectTimes.sort(function (a, b) {
          return a - b;
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
        return times.map(function (time, i) {
          return /*#__PURE__*/React__default.default.createElement("li", {
            key: i,
            onClick: _this.handleClick.bind(_this, time),
            className: _this.liClasses(time),
            ref: function ref(li) {
              if (time === timeToFocus) {
                _this.centerLi = li;
              }
            },
            onKeyDown: function onKeyDown(ev) {
              _this.handleOnKeyDown(ev, time);
            },
            tabIndex: time === timeToFocus ? 0 : -1,
            role: "option",
            "aria-selected": _this.isSelectedTime(time) ? "true" : undefined,
            "aria-disabled": _this.isDisabledTime(time) ? "true" : undefined
          }, formatDate(time, format, _this.props.locale));
        });
      });
      return _this;
    }
    _inherits(Time, _React$Component);
    return _createClass(Time, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        // code to ensure selected time will always be in focus within time window when it first appears
        this.scrollToTheSelectedTime();
        if (this.props.monthRef && this.header) {
          this.setState({
            height: this.props.monthRef.clientHeight - this.header.clientHeight
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var height = this.state.height;
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__time-container ".concat(this.props.todayButton ? "react-datepicker__time-container--with-today-button" : "")
        }, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly ? "react-datepicker__header--time--only" : ""),
          ref: function ref(header) {
            _this2.header = header;
          }
        }, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker-time__header"
        }, this.props.timeCaption)), /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__time"
        }, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__time-box"
        }, /*#__PURE__*/React__default.default.createElement("ul", {
          className: "react-datepicker__time-list",
          ref: function ref(list) {
            _this2.list = list;
          },
          style: height ? {
            height: height
          } : {},
          role: "listbox",
          "aria-label": this.props.timeCaption
        }, this.renderTimes()))));
      }
    }], [{
      key: "defaultProps",
      get: function get() {
        return {
          intervals: 30,
          onTimeChange: function onTimeChange() {},
          todayButton: null,
          timeCaption: "Time"
        };
      }
    }]);
  }(React__default.default.Component);
  _defineProperty(Time, "calcCenterPosition", function (listHeight, centerLiRef) {
    return centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2);
  });

  var Year = /*#__PURE__*/function (_React$Component) {
    function Year(props) {
      var _this;
      _classCallCheck(this, Year);
      _this = _callSuper(this, Year, [props]);
      _defineProperty(_this, "YEAR_REFS", _toConsumableArray(Array(_this.props.yearItemNumber)).map(function () {
        return /*#__PURE__*/React__default.default.createRef();
      }));
      _defineProperty(_this, "isDisabled", function (date) {
        return isDayDisabled(date, _this.props);
      });
      _defineProperty(_this, "isExcluded", function (date) {
        return isDayExcluded(date, _this.props);
      });
      _defineProperty(_this, "selectingDate", function () {
        var _this$props$selecting;
        return (_this$props$selecting = _this.props.selectingDate) !== null && _this$props$selecting !== void 0 ? _this$props$selecting : _this.props.preSelection;
      });
      _defineProperty(_this, "updateFocusOnPaginate", function (refIndex) {
        var waitForReRender = function () {
          this.YEAR_REFS[refIndex].current.focus();
        }.bind(_this);
        window.requestAnimationFrame(waitForReRender);
      });
      _defineProperty(_this, "handleYearClick", function (day, event) {
        if (_this.props.onDayClick) {
          _this.props.onDayClick(day, event);
        }
      });
      _defineProperty(_this, "handleYearNavigation", function (newYear, newDate) {
        var _this$props = _this.props,
          date = _this$props.date,
          yearItemNumber = _this$props.yearItemNumber;
        var _utils$getYearsPeriod = getYearsPeriod(date, yearItemNumber),
          startPeriod = _utils$getYearsPeriod.startPeriod;
        if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) return;
        _this.props.setPreSelection(newDate);
        if (newYear - startPeriod === -1) {
          _this.updateFocusOnPaginate(yearItemNumber - 1);
        } else if (newYear - startPeriod === yearItemNumber) {
          _this.updateFocusOnPaginate(0);
        } else _this.YEAR_REFS[newYear - startPeriod].current.focus();
      });
      _defineProperty(_this, "isSameDay", function (y, other) {
        return isSameDay(y, other);
      });
      _defineProperty(_this, "isCurrentYear", function (y) {
        return y === getYear.getYear(newDate());
      });
      _defineProperty(_this, "isRangeStart", function (y) {
        return _this.props.startDate && _this.props.endDate && isSameYear(setYear.setYear(newDate(), y), _this.props.startDate);
      });
      _defineProperty(_this, "isRangeEnd", function (y) {
        return _this.props.startDate && _this.props.endDate && isSameYear(setYear.setYear(newDate(), y), _this.props.endDate);
      });
      _defineProperty(_this, "isInRange", function (y) {
        return isYearInRange(y, _this.props.startDate, _this.props.endDate);
      });
      _defineProperty(_this, "isInSelectingRange", function (y) {
        var _this$props2 = _this.props,
          selectsStart = _this$props2.selectsStart,
          selectsEnd = _this$props2.selectsEnd,
          selectsRange = _this$props2.selectsRange,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate;
        if (!(selectsStart || selectsEnd || selectsRange) || !_this.selectingDate()) {
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
      });
      _defineProperty(_this, "isSelectingRangeStart", function (y) {
        if (!_this.isInSelectingRange(y)) {
          return false;
        }
        var _this$props3 = _this.props,
          startDate = _this$props3.startDate,
          selectsStart = _this$props3.selectsStart;
        var _year = setYear.setYear(newDate(), y);
        if (selectsStart) {
          return isSameYear(_year, _this.selectingDate());
        }
        return isSameYear(_year, startDate);
      });
      _defineProperty(_this, "isSelectingRangeEnd", function (y) {
        if (!_this.isInSelectingRange(y)) {
          return false;
        }
        var _this$props4 = _this.props,
          endDate = _this$props4.endDate,
          selectsEnd = _this$props4.selectsEnd,
          selectsRange = _this$props4.selectsRange;
        var _year = setYear.setYear(newDate(), y);
        if (selectsEnd || selectsRange) {
          return isSameYear(_year, _this.selectingDate());
        }
        return isSameYear(_year, endDate);
      });
      _defineProperty(_this, "isKeyboardSelected", function (y) {
        var date = getStartOfYear(setYear.setYear(_this.props.date, y));
        return !_this.props.disabledKeyboardNavigation && !_this.props.inline && !isSameDay(date, getStartOfYear(_this.props.selected)) && isSameDay(date, getStartOfYear(_this.props.preSelection));
      });
      _defineProperty(_this, "onYearClick", function (e, y) {
        var date = _this.props.date;
        _this.handleYearClick(getStartOfYear(setYear.setYear(date, y)), e);
      });
      _defineProperty(_this, "onYearKeyDown", function (e, y) {
        var key = e.key;
        var handleOnKeyDown = _this.props.handleOnKeyDown;
        if (!_this.props.disabledKeyboardNavigation) {
          switch (key) {
            case "Enter":
              _this.onYearClick(e, y);
              _this.props.setPreSelection(_this.props.selected);
              break;
            case "ArrowRight":
              _this.handleYearNavigation(y + 1, addYears.addYears(_this.props.preSelection, 1));
              break;
            case "ArrowLeft":
              _this.handleYearNavigation(y - 1, subYears.subYears(_this.props.preSelection, 1));
              break;
          }
        }
        handleOnKeyDown && handleOnKeyDown(e);
      });
      _defineProperty(_this, "getYearClassNames", function (y) {
        var _this$props5 = _this.props,
          date = _this$props5.date,
          minDate = _this$props5.minDate,
          maxDate = _this$props5.maxDate,
          selected = _this$props5.selected,
          excludeDates = _this$props5.excludeDates,
          includeDates = _this$props5.includeDates,
          filterDate = _this$props5.filterDate,
          yearClassName = _this$props5.yearClassName;
        return clsx.clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), yearClassName ? yearClassName(setYear.setYear(date, y)) : undefined, {
          "react-datepicker__year-text--selected": y === getYear.getYear(selected),
          "react-datepicker__year-text--disabled": (minDate || maxDate || excludeDates || includeDates || filterDate) && isYearDisabled(y, _this.props),
          "react-datepicker__year-text--keyboard-selected": _this.isKeyboardSelected(y),
          "react-datepicker__year-text--range-start": _this.isRangeStart(y),
          "react-datepicker__year-text--range-end": _this.isRangeEnd(y),
          "react-datepicker__year-text--in-range": _this.isInRange(y),
          "react-datepicker__year-text--in-selecting-range": _this.isInSelectingRange(y),
          "react-datepicker__year-text--selecting-range-start": _this.isSelectingRangeStart(y),
          "react-datepicker__year-text--selecting-range-end": _this.isSelectingRangeEnd(y),
          "react-datepicker__year-text--today": _this.isCurrentYear(y)
        });
      });
      _defineProperty(_this, "getYearTabIndex", function (y) {
        if (_this.props.disabledKeyboardNavigation) return "-1";
        var preSelected = getYear.getYear(_this.props.preSelection);
        return y === preSelected ? "0" : "-1";
      });
      _defineProperty(_this, "getYearContainerClassNames", function () {
        var _this$props6 = _this.props,
          selectingDate = _this$props6.selectingDate,
          selectsStart = _this$props6.selectsStart,
          selectsEnd = _this$props6.selectsEnd,
          selectsRange = _this$props6.selectsRange;
        return clsx.clsx("react-datepicker__year", {
          "react-datepicker__year--selecting-range": selectingDate && (selectsStart || selectsEnd || selectsRange)
        });
      });
      _defineProperty(_this, "getYearContent", function (y) {
        return _this.props.renderYearContent ? _this.props.renderYearContent(y) : y;
      });
      return _this;
    }
    _inherits(Year, _React$Component);
    return _createClass(Year, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        var yearsList = [];
        var _this$props7 = this.props,
          date = _this$props7.date,
          yearItemNumber = _this$props7.yearItemNumber,
          onYearMouseEnter = _this$props7.onYearMouseEnter,
          onYearMouseLeave = _this$props7.onYearMouseLeave;
        var _utils$getYearsPeriod2 = getYearsPeriod(date, yearItemNumber),
          startPeriod = _utils$getYearsPeriod2.startPeriod,
          endPeriod = _utils$getYearsPeriod2.endPeriod;
        var _loop = function _loop(y) {
          yearsList.push( /*#__PURE__*/React__default.default.createElement("div", {
            ref: _this2.YEAR_REFS[y - startPeriod],
            onClick: function onClick(ev) {
              _this2.onYearClick(ev, y);
            },
            onKeyDown: function onKeyDown(ev) {
              if (isSpaceKeyDown(ev)) {
                ev.preventDefault();
                ev.key = "Enter";
              }
              _this2.onYearKeyDown(ev, y);
            },
            tabIndex: _this2.getYearTabIndex(y),
            className: _this2.getYearClassNames(y),
            onMouseEnter: !_this2.props.usePointerEvent ? function (ev) {
              return onYearMouseEnter(ev, y);
            } : undefined,
            onPointerEnter: _this2.props.usePointerEvent ? function (ev) {
              return onYearMouseEnter(ev, y);
            } : undefined,
            onMouseLeave: !_this2.props.usePointerEvent ? function (ev) {
              return onYearMouseLeave(ev, y);
            } : undefined,
            onPointerLeave: _this2.props.usePointerEvent ? function (ev) {
              return onYearMouseLeave(ev, y);
            } : undefined,
            key: y,
            "aria-current": _this2.isCurrentYear(y) ? "date" : undefined
          }, _this2.getYearContent(y)));
        };
        for (var y = startPeriod; y <= endPeriod; y++) {
          _loop(y);
        }
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: this.getYearContainerClassNames()
        }, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__year-wrapper",
          onMouseLeave: !this.props.usePointerEvent ? this.props.clearSelectingDate : undefined,
          onPointerLeave: this.props.usePointerEvent ? this.props.clearSelectingDate : undefined
        }, yearsList));
      }
    }]);
  }(React__default.default.Component);

  var inputTime = /*#__PURE__*/function (_React$Component) {
    function inputTime(props) {
      var _this;
      _classCallCheck(this, inputTime);
      _this = _callSuper(this, inputTime, [props]);
      _defineProperty(_this, "onTimeChange", function (time) {
        _this.setState({
          time: time
        });
        var propDate = _this.props.date;
        var isPropDateValid = propDate instanceof Date && !isNaN(propDate);
        var date = isPropDateValid ? propDate : new Date();
        date.setHours(time.split(":")[0]);
        date.setMinutes(time.split(":")[1]);
        _this.props.onChange(date);
      });
      _defineProperty(_this, "renderTimeInput", function () {
        var time = _this.state.time;
        var _this$props = _this.props,
          date = _this$props.date,
          timeString = _this$props.timeString,
          customTimeInput = _this$props.customTimeInput;
        if (customTimeInput) {
          return /*#__PURE__*/React__default.default.cloneElement(customTimeInput, {
            date: date,
            value: time,
            onChange: _this.onTimeChange
          });
        }
        return /*#__PURE__*/React__default.default.createElement("input", {
          type: "time",
          className: "react-datepicker-time__input",
          placeholder: "Time",
          name: "time-input",
          required: true,
          value: time,
          onChange: function onChange(ev) {
            _this.onTimeChange(ev.target.value || timeString);
          }
        });
      });
      _this.state = {
        time: _this.props.timeString
      };
      return _this;
    }
    _inherits(inputTime, _React$Component);
    return _createClass(inputTime, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__input-time-container"
        }, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker-time__caption"
        }, this.props.timeInputLabel), /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker-time__input-container"
        }, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker-time__input"
        }, this.renderTimeInput())));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        if (props.timeString !== state.time) {
          return {
            time: props.timeString
          };
        }

        // Return null to indicate no change to state.
        return null;
      }
    }]);
  }(React__default.default.Component);

  function CalendarContainer(_ref) {
    var _ref$showTimeSelectOn = _ref.showTimeSelectOnly,
      showTimeSelectOnly = _ref$showTimeSelectOn === void 0 ? false : _ref$showTimeSelectOn,
      _ref$showTime = _ref.showTime,
      showTime = _ref$showTime === void 0 ? false : _ref$showTime,
      className = _ref.className,
      children = _ref.children;
    var ariaLabel = showTimeSelectOnly ? "Choose Time" : "Choose Date".concat(showTime ? " and Time" : "");
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: className,
      role: "dialog",
      "aria-label": ariaLabel,
      "aria-modal": "true"
    }, children);
  }

  var DROPDOWN_FOCUS_CLASSNAMES = ["react-datepicker__year-select", "react-datepicker__month-select", "react-datepicker__month-year-select"];
  var isDropdownSelect = function isDropdownSelect() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var classNames = (element.className || "").split(/\s+/);
    return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
      return classNames.indexOf(testClassname) >= 0;
    });
  };
  var Calendar = /*#__PURE__*/function (_React$Component) {
    function Calendar(props) {
      var _this;
      _classCallCheck(this, Calendar);
      _this = _callSuper(this, Calendar, [props]);
      _defineProperty(_this, "handleClickOutside", function (event) {
        _this.props.onClickOutside(event);
      });
      _defineProperty(_this, "setClickOutsideRef", function () {
        return _this.containerRef.current;
      });
      _defineProperty(_this, "handleDropdownFocus", function (event) {
        if (isDropdownSelect(event.target)) {
          _this.props.onDropdownFocus();
        }
      });
      _defineProperty(_this, "getDateInView", function () {
        var _this$props = _this.props,
          preSelection = _this$props.preSelection,
          selected = _this$props.selected,
          openToDate = _this$props.openToDate;
        var minDate = getEffectiveMinDate(_this.props);
        var maxDate = getEffectiveMaxDate(_this.props);
        var current = newDate();
        var initialDate = openToDate || selected || preSelection;
        if (initialDate) {
          return initialDate;
        } else {
          if (minDate && isBefore.isBefore(current, minDate)) {
            return minDate;
          } else if (maxDate && isAfter.isAfter(current, maxDate)) {
            return maxDate;
          }
        }
        return current;
      });
      _defineProperty(_this, "increaseMonth", function () {
        _this.setState(function (_ref) {
          var date = _ref.date;
          return {
            date: addMonths.addMonths(date, 1)
          };
        }, function () {
          return _this.handleMonthChange(_this.state.date);
        });
      });
      _defineProperty(_this, "decreaseMonth", function () {
        _this.setState(function (_ref2) {
          var date = _ref2.date;
          return {
            date: subMonths.subMonths(date, 1)
          };
        }, function () {
          return _this.handleMonthChange(_this.state.date);
        });
      });
      _defineProperty(_this, "handleDayClick", function (day, event, monthSelectedIn) {
        _this.props.onSelect(day, event, monthSelectedIn);
        _this.props.setPreSelection && _this.props.setPreSelection(day);
      });
      _defineProperty(_this, "handleDayMouseEnter", function (day) {
        _this.setState({
          selectingDate: day
        });
        _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
      });
      _defineProperty(_this, "handleMonthMouseLeave", function () {
        _this.setState({
          selectingDate: null
        });
        _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
      });
      _defineProperty(_this, "handleYearMouseEnter", function (event, year) {
        _this.setState({
          selectingDate: setYear.setYear(newDate(), year)
        });
        !!_this.props.onYearMouseEnter && _this.props.onYearMouseEnter(event, year);
      });
      _defineProperty(_this, "handleYearMouseLeave", function (event, year) {
        !!_this.props.onYearMouseLeave && _this.props.onYearMouseLeave(event, year);
      });
      _defineProperty(_this, "handleYearChange", function (date) {
        if (_this.props.onYearChange) {
          _this.props.onYearChange(date);
          _this.setState({
            isRenderAriaLiveMessage: true
          });
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
      });
      _defineProperty(_this, "handleMonthChange", function (date) {
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
      });
      _defineProperty(_this, "handleCustomMonthChange", function (date) {
        if (_this.props.onMonthChange) {
          _this.props.onMonthChange(date);
          _this.setState({
            isRenderAriaLiveMessage: true
          });
        }
      });
      _defineProperty(_this, "handleMonthYearChange", function (date) {
        _this.handleYearChange(date);
        _this.handleMonthChange(date);
      });
      _defineProperty(_this, "changeYear", function (year) {
        _this.setState(function (_ref3) {
          var date = _ref3.date;
          return {
            date: setYear.setYear(date, year)
          };
        }, function () {
          return _this.handleYearChange(_this.state.date);
        });
      });
      _defineProperty(_this, "changeMonth", function (month) {
        _this.setState(function (_ref4) {
          var date = _ref4.date;
          return {
            date: setMonth.setMonth(date, month)
          };
        }, function () {
          return _this.handleMonthChange(_this.state.date);
        });
      });
      _defineProperty(_this, "changeMonthYear", function (monthYear) {
        _this.setState(function (_ref5) {
          var date = _ref5.date;
          return {
            date: setYear.setYear(setMonth.setMonth(date, getMonth.getMonth(monthYear)), getYear.getYear(monthYear))
          };
        }, function () {
          return _this.handleMonthYearChange(_this.state.date);
        });
      });
      _defineProperty(_this, "header", function () {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;
        var startOfWeek = getStartOfWeek(date, _this.props.locale, _this.props.calendarStartDay);
        var dayNames = [];
        if (_this.props.showWeekNumbers) {
          dayNames.push( /*#__PURE__*/React__default.default.createElement("div", {
            key: "W",
            className: "react-datepicker__day-name"
          }, _this.props.weekLabel || "#"));
        }
        return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
          var day = addDays.addDays(startOfWeek, offset);
          var weekDayName = _this.formatWeekday(day, _this.props.locale);
          var weekDayClassName = _this.props.weekDayClassName ? _this.props.weekDayClassName(day) : undefined;
          return /*#__PURE__*/React__default.default.createElement("div", {
            key: offset,
            className: clsx.clsx("react-datepicker__day-name", weekDayClassName)
          }, weekDayName);
        }));
      });
      _defineProperty(_this, "formatWeekday", function (day, locale) {
        if (_this.props.formatWeekDay) {
          return getFormattedWeekdayInLocale(day, _this.props.formatWeekDay, locale);
        }
        return _this.props.useWeekdaysShort ? getWeekdayShortInLocale(day, locale) : getWeekdayMinInLocale(day, locale);
      });
      _defineProperty(_this, "decreaseYear", function () {
        _this.setState(function (_ref6) {
          var date = _ref6.date;
          return {
            date: subYears.subYears(date, _this.props.showYearPicker ? _this.props.yearItemNumber : 1)
          };
        }, function () {
          return _this.handleYearChange(_this.state.date);
        });
      });
      _defineProperty(_this, "clearSelectingDate", function () {
        _this.setState({
          selectingDate: null
        });
      });
      _defineProperty(_this, "renderPreviousButton", function () {
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
          default:
            allPrevDaysDisabled = monthDisabledBefore(_this.state.date, _this.props);
            break;
        }
        if (!_this.props.forceShowMonthNavigation && !_this.props.showDisabledMonthNavigation && allPrevDaysDisabled || _this.props.showTimeSelectOnly) {
          return;
        }
        var iconClasses = ["react-datepicker__navigation-icon", "react-datepicker__navigation-icon--previous"];
        var classes = ["react-datepicker__navigation", "react-datepicker__navigation--previous"];
        var clickHandler = _this.decreaseMonth;
        if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
          clickHandler = _this.decreaseYear;
        }
        if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
          classes.push("react-datepicker__navigation--previous--disabled");
          clickHandler = null;
        }
        var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
        var _this$props2 = _this.props,
          previousMonthButtonLabel = _this$props2.previousMonthButtonLabel,
          previousYearButtonLabel = _this$props2.previousYearButtonLabel;
        var _this$props3 = _this.props,
          _this$props3$previous = _this$props3.previousMonthAriaLabel,
          previousMonthAriaLabel = _this$props3$previous === void 0 ? typeof previousMonthButtonLabel === "string" ? previousMonthButtonLabel : "Previous Month" : _this$props3$previous,
          _this$props3$previous2 = _this$props3.previousYearAriaLabel,
          previousYearAriaLabel = _this$props3$previous2 === void 0 ? typeof previousYearButtonLabel === "string" ? previousYearButtonLabel : "Previous Year" : _this$props3$previous2;
        return /*#__PURE__*/React__default.default.createElement("button", {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler,
          onKeyDown: _this.props.handleOnKeyDown,
          "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel
        }, /*#__PURE__*/React__default.default.createElement("span", {
          className: iconClasses.join(" ")
        }, isForYear ? _this.props.previousYearButtonLabel : _this.props.previousMonthButtonLabel));
      });
      _defineProperty(_this, "increaseYear", function () {
        _this.setState(function (_ref7) {
          var date = _ref7.date;
          return {
            date: addYears.addYears(date, _this.props.showYearPicker ? _this.props.yearItemNumber : 1)
          };
        }, function () {
          return _this.handleYearChange(_this.state.date);
        });
      });
      _defineProperty(_this, "renderNextButton", function () {
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
          default:
            allNextDaysDisabled = monthDisabledAfter(_this.state.date, _this.props);
            break;
        }
        if (!_this.props.forceShowMonthNavigation && !_this.props.showDisabledMonthNavigation && allNextDaysDisabled || _this.props.showTimeSelectOnly) {
          return;
        }
        var classes = ["react-datepicker__navigation", "react-datepicker__navigation--next"];
        var iconClasses = ["react-datepicker__navigation-icon", "react-datepicker__navigation-icon--next"];
        if (_this.props.showTimeSelect) {
          classes.push("react-datepicker__navigation--next--with-time");
        }
        if (_this.props.todayButton) {
          classes.push("react-datepicker__navigation--next--with-today-button");
        }
        var clickHandler = _this.increaseMonth;
        if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
          clickHandler = _this.increaseYear;
        }
        if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
          classes.push("react-datepicker__navigation--next--disabled");
          clickHandler = null;
        }
        var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
        var _this$props4 = _this.props,
          nextMonthButtonLabel = _this$props4.nextMonthButtonLabel,
          nextYearButtonLabel = _this$props4.nextYearButtonLabel;
        var _this$props5 = _this.props,
          _this$props5$nextMont = _this$props5.nextMonthAriaLabel,
          nextMonthAriaLabel = _this$props5$nextMont === void 0 ? typeof nextMonthButtonLabel === "string" ? nextMonthButtonLabel : "Next Month" : _this$props5$nextMont,
          _this$props5$nextYear = _this$props5.nextYearAriaLabel,
          nextYearAriaLabel = _this$props5$nextYear === void 0 ? typeof nextYearButtonLabel === "string" ? nextYearButtonLabel : "Next Year" : _this$props5$nextYear;
        return /*#__PURE__*/React__default.default.createElement("button", {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler,
          onKeyDown: _this.props.handleOnKeyDown,
          "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel
        }, /*#__PURE__*/React__default.default.createElement("span", {
          className: iconClasses.join(" ")
        }, isForYear ? _this.props.nextYearButtonLabel : _this.props.nextMonthButtonLabel));
      });
      _defineProperty(_this, "renderCurrentMonth", function () {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;
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
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: classes.join(" ")
        }, formatDate(date, _this.props.dateFormat, _this.props.locale));
      });
      _defineProperty(_this, "renderYearDropdown", function () {
        var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!_this.props.showYearDropdown || overrideHide) {
          return;
        }
        return /*#__PURE__*/React__default.default.createElement(YearDropdown, {
          adjustDateOnChange: _this.props.adjustDateOnChange,
          date: _this.state.date,
          onSelect: _this.props.onSelect,
          setOpen: _this.props.setOpen,
          dropdownMode: _this.props.dropdownMode,
          onChange: _this.changeYear,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          year: getYear.getYear(_this.state.date),
          scrollableYearDropdown: _this.props.scrollableYearDropdown,
          yearDropdownItemNumber: _this.props.yearDropdownItemNumber
        });
      });
      _defineProperty(_this, "renderMonthDropdown", function () {
        var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!_this.props.showMonthDropdown || overrideHide) {
          return;
        }
        return /*#__PURE__*/React__default.default.createElement(MonthDropdown, {
          dropdownMode: _this.props.dropdownMode,
          locale: _this.props.locale,
          onChange: _this.changeMonth,
          month: getMonth.getMonth(_this.state.date),
          useShortMonthInDropdown: _this.props.useShortMonthInDropdown
        });
      });
      _defineProperty(_this, "renderMonthYearDropdown", function () {
        var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!_this.props.showMonthYearDropdown || overrideHide) {
          return;
        }
        return /*#__PURE__*/React__default.default.createElement(MonthYearDropdown, {
          dropdownMode: _this.props.dropdownMode,
          locale: _this.props.locale,
          dateFormat: _this.props.dateFormat,
          onChange: _this.changeMonthYear,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          date: _this.state.date,
          scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown
        });
      });
      _defineProperty(_this, "handleTodayButtonClick", function (e) {
        _this.props.onSelect(getStartOfToday(), e);
        _this.props.setPreSelection && _this.props.setPreSelection(getStartOfToday());
      });
      _defineProperty(_this, "renderTodayButton", function () {
        if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
          return;
        }
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__today-button",
          onClick: function onClick(e) {
            return _this.handleTodayButtonClick(e);
          }
        }, _this.props.todayButton);
      });
      _defineProperty(_this, "renderDefaultHeader", function (_ref8) {
        var monthDate = _ref8.monthDate,
          i = _ref8.i;
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__header ".concat(_this.props.showTimeSelect ? "react-datepicker__header--has-time-select" : "")
        }, _this.renderCurrentMonth(monthDate), /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(_this.props.dropdownMode),
          onFocus: _this.handleDropdownFocus
        }, _this.renderMonthDropdown(i !== 0), _this.renderMonthYearDropdown(i !== 0), _this.renderYearDropdown(i !== 0)), /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__day-names"
        }, _this.header(monthDate)));
      });
      _defineProperty(_this, "renderCustomHeader", function () {
        var headerArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var monthDate = headerArgs.monthDate,
          i = headerArgs.i;
        if (_this.props.showTimeSelect && !_this.state.monthContainer || _this.props.showTimeSelectOnly) {
          return null;
        }
        var prevMonthButtonDisabled = monthDisabledBefore(_this.state.date, _this.props);
        var nextMonthButtonDisabled = monthDisabledAfter(_this.state.date, _this.props);
        var prevYearButtonDisabled = yearDisabledBefore(_this.state.date, _this.props);
        var nextYearButtonDisabled = yearDisabledAfter(_this.state.date, _this.props);
        var showDayNames = !_this.props.showMonthYearPicker && !_this.props.showQuarterYearPicker && !_this.props.showYearPicker;
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__header react-datepicker__header--custom",
          onFocus: _this.props.onDropdownFocus
        }, _this.props.renderCustomHeader(_objectSpread2(_objectSpread2({}, _this.state), {}, {
          customHeaderCount: i,
          monthDate: monthDate,
          changeMonth: _this.changeMonth,
          changeYear: _this.changeYear,
          decreaseMonth: _this.decreaseMonth,
          increaseMonth: _this.increaseMonth,
          decreaseYear: _this.decreaseYear,
          increaseYear: _this.increaseYear,
          prevMonthButtonDisabled: prevMonthButtonDisabled,
          nextMonthButtonDisabled: nextMonthButtonDisabled,
          prevYearButtonDisabled: prevYearButtonDisabled,
          nextYearButtonDisabled: nextYearButtonDisabled
        })), showDayNames && /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__day-names"
        }, _this.header(monthDate)));
      });
      _defineProperty(_this, "renderYearHeader", function (_ref9) {
        var monthDate = _ref9.monthDate;
        var _this$props6 = _this.props,
          showYearPicker = _this$props6.showYearPicker,
          yearItemNumber = _this$props6.yearItemNumber;
        var _getYearsPeriod = getYearsPeriod(monthDate, yearItemNumber),
          startPeriod = _getYearsPeriod.startPeriod,
          endPeriod = _getYearsPeriod.endPeriod;
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__header react-datepicker-year-header"
        }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : getYear.getYear(monthDate));
      });
      _defineProperty(_this, "renderHeader", function (headerArgs) {
        switch (true) {
          case _this.props.renderCustomHeader !== undefined:
            return _this.renderCustomHeader(headerArgs);
          case _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker:
            return _this.renderYearHeader(headerArgs);
          default:
            return _this.renderDefaultHeader(headerArgs);
        }
      });
      _defineProperty(_this, "renderMonths", function () {
        var _this$props$monthSele;
        if (_this.props.showTimeSelectOnly || _this.props.showYearPicker) {
          return;
        }
        var monthList = [];
        var monthsToSubtract = _this.props.showPreviousMonths ? _this.props.monthsShown - 1 : 0;
        var fromMonthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears.addYears(_this.state.date, monthsToSubtract) : subMonths.subMonths(_this.state.date, monthsToSubtract);
        var monthSelectedIn = (_this$props$monthSele = _this.props.monthSelectedIn) !== null && _this$props$monthSele !== void 0 ? _this$props$monthSele : monthsToSubtract;
        for (var i = 0; i < _this.props.monthsShown; ++i) {
          var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
          var monthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears.addYears(fromMonthDate, monthsToAdd) : addMonths.addMonths(fromMonthDate, monthsToAdd);
          var monthKey = "month-".concat(i);
          var monthShowsDuplicateDaysEnd = i < _this.props.monthsShown - 1;
          var monthShowsDuplicateDaysStart = i > 0;
          monthList.push( /*#__PURE__*/React__default.default.createElement("div", {
            key: monthKey,
            ref: function ref(div) {
              _this.monthContainer = div;
            },
            className: "react-datepicker__month-container"
          }, _this.renderHeader({
            monthDate: monthDate,
            i: i
          }), /*#__PURE__*/React__default.default.createElement(Month, {
            chooseDayAriaLabelPrefix: _this.props.chooseDayAriaLabelPrefix,
            disabledDayAriaLabelPrefix: _this.props.disabledDayAriaLabelPrefix,
            weekAriaLabelPrefix: _this.props.weekAriaLabelPrefix,
            ariaLabelPrefix: _this.props.monthAriaLabelPrefix,
            onChange: _this.changeMonthYear,
            day: monthDate,
            dayClassName: _this.props.dayClassName,
            calendarStartDay: _this.props.calendarStartDay,
            monthClassName: _this.props.monthClassName,
            onDayClick: _this.handleDayClick,
            handleOnKeyDown: _this.props.handleOnDayKeyDown,
            handleOnMonthKeyDown: _this.props.handleOnKeyDown,
            usePointerEvent: _this.props.usePointerEvent,
            onDayMouseEnter: _this.handleDayMouseEnter,
            onMouseLeave: _this.handleMonthMouseLeave,
            onWeekSelect: _this.props.onWeekSelect,
            orderInDisplay: i,
            formatWeekNumber: _this.props.formatWeekNumber,
            locale: _this.props.locale,
            minDate: _this.props.minDate,
            maxDate: _this.props.maxDate,
            excludeDates: _this.props.excludeDates,
            excludeDateIntervals: _this.props.excludeDateIntervals,
            highlightDates: _this.props.highlightDates,
            holidays: _this.props.holidays,
            selectingDate: _this.state.selectingDate,
            includeDates: _this.props.includeDates,
            includeDateIntervals: _this.props.includeDateIntervals,
            inline: _this.props.inline,
            shouldFocusDayInline: _this.props.shouldFocusDayInline,
            fixedHeight: _this.props.fixedHeight,
            filterDate: _this.props.filterDate,
            preSelection: _this.props.preSelection,
            setPreSelection: _this.props.setPreSelection,
            selected: _this.props.selected,
            selectsStart: _this.props.selectsStart,
            selectsEnd: _this.props.selectsEnd,
            selectsRange: _this.props.selectsRange,
            selectsDisabledDaysInRange: _this.props.selectsDisabledDaysInRange,
            selectsMultiple: _this.props.selectsMultiple,
            selectedDates: _this.props.selectedDates,
            showWeekNumbers: _this.props.showWeekNumbers,
            startDate: _this.props.startDate,
            endDate: _this.props.endDate,
            peekNextMonth: _this.props.peekNextMonth,
            setOpen: _this.props.setOpen,
            shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
            renderDayContents: _this.props.renderDayContents,
            renderMonthContent: _this.props.renderMonthContent,
            renderQuarterContent: _this.props.renderQuarterContent,
            renderYearContent: _this.props.renderYearContent,
            disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
            showMonthYearPicker: _this.props.showMonthYearPicker,
            showFullMonthYearPicker: _this.props.showFullMonthYearPicker,
            showTwoColumnMonthYearPicker: _this.props.showTwoColumnMonthYearPicker,
            showFourColumnMonthYearPicker: _this.props.showFourColumnMonthYearPicker,
            showYearPicker: _this.props.showYearPicker,
            showQuarterYearPicker: _this.props.showQuarterYearPicker,
            showWeekPicker: _this.props.showWeekPicker,
            isInputFocused: _this.props.isInputFocused,
            containerRef: _this.containerRef,
            monthShowsDuplicateDaysEnd: monthShowsDuplicateDaysEnd,
            monthShowsDuplicateDaysStart: monthShowsDuplicateDaysStart
          })));
        }
        return monthList;
      });
      _defineProperty(_this, "renderYears", function () {
        if (_this.props.showTimeSelectOnly) {
          return;
        }
        if (_this.props.showYearPicker) {
          return /*#__PURE__*/React__default.default.createElement("div", {
            className: "react-datepicker__year--container"
          }, _this.renderHeader({
            monthDate: _this.state.date
          }), /*#__PURE__*/React__default.default.createElement(Year, _extends({
            onDayClick: _this.handleDayClick,
            selectingDate: _this.state.selectingDate,
            clearSelectingDate: _this.clearSelectingDate,
            date: _this.state.date
          }, _this.props, {
            onYearMouseEnter: _this.handleYearMouseEnter,
            onYearMouseLeave: _this.handleYearMouseLeave
          })));
        }
      });
      _defineProperty(_this, "renderTimeSection", function () {
        if (_this.props.showTimeSelect && (_this.state.monthContainer || _this.props.showTimeSelectOnly)) {
          return /*#__PURE__*/React__default.default.createElement(Time, {
            selected: _this.props.selected,
            openToDate: _this.props.openToDate,
            onChange: _this.props.onTimeChange,
            timeClassName: _this.props.timeClassName,
            format: _this.props.timeFormat,
            includeTimes: _this.props.includeTimes,
            intervals: _this.props.timeIntervals,
            minTime: _this.props.minTime,
            maxTime: _this.props.maxTime,
            excludeTimes: _this.props.excludeTimes,
            filterTime: _this.props.filterTime,
            timeCaption: _this.props.timeCaption,
            todayButton: _this.props.todayButton,
            showMonthDropdown: _this.props.showMonthDropdown,
            showMonthYearDropdown: _this.props.showMonthYearDropdown,
            showYearDropdown: _this.props.showYearDropdown,
            withPortal: _this.props.withPortal,
            monthRef: _this.state.monthContainer,
            injectTimes: _this.props.injectTimes,
            locale: _this.props.locale,
            handleOnKeyDown: _this.props.handleOnKeyDown,
            showTimeSelectOnly: _this.props.showTimeSelectOnly
          });
        }
      });
      _defineProperty(_this, "renderInputTimeSection", function () {
        var time = new Date(_this.props.selected);
        var timeValid = isValid(time) && Boolean(_this.props.selected);
        var timeString = timeValid ? "".concat(addZero(time.getHours()), ":").concat(addZero(time.getMinutes())) : "";
        if (_this.props.showTimeInput) {
          return /*#__PURE__*/React__default.default.createElement(inputTime, {
            date: time,
            timeString: timeString,
            timeInputLabel: _this.props.timeInputLabel,
            onChange: _this.props.onTimeChange,
            customTimeInput: _this.props.customTimeInput
          });
        }
      });
      _defineProperty(_this, "renderAriaLiveRegion", function () {
        var _getYearsPeriod2 = getYearsPeriod(_this.state.date, _this.props.yearItemNumber),
          startPeriod = _getYearsPeriod2.startPeriod,
          endPeriod = _getYearsPeriod2.endPeriod;
        var ariaLiveMessage;
        if (_this.props.showYearPicker) {
          ariaLiveMessage = "".concat(startPeriod, " - ").concat(endPeriod);
        } else if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker) {
          ariaLiveMessage = getYear.getYear(_this.state.date);
        } else {
          ariaLiveMessage = "".concat(getMonthInLocale(getMonth.getMonth(_this.state.date), _this.props.locale), " ").concat(getYear.getYear(_this.state.date));
        }
        return /*#__PURE__*/React__default.default.createElement("span", {
          role: "alert",
          "aria-live": "polite",
          className: "react-datepicker__aria-live"
        }, _this.state.isRenderAriaLiveMessage && ariaLiveMessage);
      });
      _defineProperty(_this, "renderChildren", function () {
        if (_this.props.children) {
          return /*#__PURE__*/React__default.default.createElement("div", {
            className: "react-datepicker__children-container"
          }, _this.props.children);
        }
      });
      _this.containerRef = /*#__PURE__*/React__default.default.createRef();
      _this.state = {
        date: _this.getDateInView(),
        selectingDate: null,
        monthContainer: null,
        isRenderAriaLiveMessage: false
      };
      return _this;
    }
    _inherits(Calendar, _React$Component);
    return _createClass(Calendar, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        // monthContainer height is needed in time component
        // to determine the height for the ul in the time component
        // setState here so height is given after final component
        // layout is rendered
        if (this.props.showTimeSelect) {
          this.assignMonthContainer = function () {
            _this2.setState({
              monthContainer: _this2.monthContainer
            });
          }();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this3 = this;
        if (this.props.preSelection && (!isSameDay(this.props.preSelection, prevProps.preSelection) || this.props.monthSelectedIn !== prevProps.monthSelectedIn)) {
          var hasMonthChanged = !isSameMonth(this.state.date, this.props.preSelection);
          this.setState({
            date: this.props.preSelection
          }, function () {
            return hasMonthChanged && _this3.handleCustomMonthChange(_this3.state.date);
          });
        } else if (this.props.openToDate && !isSameDay(this.props.openToDate, prevProps.openToDate)) {
          this.setState({
            date: this.props.openToDate
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var Container = this.props.container || CalendarContainer;
        return /*#__PURE__*/React__default.default.createElement("div", {
          style: {
            display: "contents"
          },
          ref: this.containerRef
        }, /*#__PURE__*/React__default.default.createElement(Container, {
          className: clsx.clsx("react-datepicker", this.props.className, {
            "react-datepicker--time-only": this.props.showTimeSelectOnly
          }),
          showTime: this.props.showTimeSelect || this.props.showTimeInput,
          showTimeSelectOnly: this.props.showTimeSelectOnly
        }, this.renderAriaLiveRegion(), this.renderPreviousButton(), this.renderNextButton(), this.renderMonths(), this.renderYears(), this.renderTodayButton(), this.renderTimeSection(), this.renderInputTimeSection(), this.renderChildren()));
      }
    }], [{
      key: "defaultProps",
      get: function get() {
        return {
          onDropdownFocus: function onDropdownFocus() {},
          monthsShown: 1,
          forceShowMonthNavigation: false,
          timeCaption: "Time",
          previousYearButtonLabel: "Previous Year",
          nextYearButtonLabel: "Next Year",
          previousMonthButtonLabel: "Previous Month",
          nextMonthButtonLabel: "Next Month",
          customTimeInput: null,
          yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER
        };
      }
    }]);
  }(React__default.default.Component);

  var CalendarIcon = function CalendarIcon(_ref) {
    var icon = _ref.icon,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      _onClick = _ref.onClick;
    var defaultClass = "react-datepicker__calendar-icon";
    if ( /*#__PURE__*/React__default.default.isValidElement(icon)) {
      return /*#__PURE__*/React__default.default.cloneElement(icon, {
        className: "".concat(icon.props.className || "", " ").concat(defaultClass, " ").concat(className),
        onClick: function onClick(e) {
          if (typeof icon.props.onClick === "function") {
            icon.props.onClick(e);
          }
          if (typeof _onClick === "function") {
            _onClick(e);
          }
        }
      });
    }
    if (typeof icon === "string") {
      return /*#__PURE__*/React__default.default.createElement("i", {
        className: "".concat(defaultClass, " ").concat(icon, " ").concat(className),
        "aria-hidden": "true",
        onClick: _onClick
      });
    }

    // Default SVG Icon
    return /*#__PURE__*/React__default.default.createElement("svg", {
      className: "".concat(defaultClass, " ").concat(className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512",
      onClick: _onClick
    }, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"
    }));
  };
  var CalendarIcon$1 = CalendarIcon;

  var Portal = /*#__PURE__*/function (_React$Component) {
    function Portal(props) {
      var _this;
      _classCallCheck(this, Portal);
      _this = _callSuper(this, Portal, [props]);
      _this.el = document.createElement("div");
      return _this;
    }
    _inherits(Portal, _React$Component);
    return _createClass(Portal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.portalRoot = (this.props.portalHost || document).getElementById(this.props.portalId);
        if (!this.portalRoot) {
          this.portalRoot = document.createElement("div");
          this.portalRoot.setAttribute("id", this.props.portalId);
          (this.props.portalHost || document.body).appendChild(this.portalRoot);
        }
        this.portalRoot.appendChild(this.el);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.portalRoot.removeChild(this.el);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/ReactDOM__default.default.createPortal(this.props.children, this.el);
      }
    }]);
  }(React__default.default.Component);

  // TabLoop prevents the user from tabbing outside of the popper
  // It creates a tabindex loop so that "Tab" on the last element will focus the first element
  // and "Shift Tab" on the first element will focus the last element

  var focusableElementsSelector = "[tabindex], a, button, input, select, textarea";
  var focusableFilter = function focusableFilter(node) {
    return !node.disabled && node.tabIndex !== -1;
  };
  var TabLoop = /*#__PURE__*/function (_React$Component) {
    function TabLoop(props) {
      var _this;
      _classCallCheck(this, TabLoop);
      _this = _callSuper(this, TabLoop, [props]);
      // query all focusable elements
      // trim first and last because they are the focus guards
      _defineProperty(_this, "getTabChildren", function () {
        return Array.prototype.slice.call(_this.tabLoopRef.current.querySelectorAll(focusableElementsSelector), 1, -1).filter(focusableFilter);
      });
      _defineProperty(_this, "handleFocusStart", function () {
        var tabChildren = _this.getTabChildren();
        tabChildren && tabChildren.length > 1 && tabChildren[tabChildren.length - 1].focus();
      });
      _defineProperty(_this, "handleFocusEnd", function () {
        var tabChildren = _this.getTabChildren();
        tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
      });
      _this.tabLoopRef = /*#__PURE__*/React__default.default.createRef();
      return _this;
    }
    _inherits(TabLoop, _React$Component);
    return _createClass(TabLoop, [{
      key: "render",
      value: function render() {
        if (!this.props.enableTabLoop) {
          return this.props.children;
        }
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__tab-loop",
          ref: this.tabLoopRef
        }, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__tab-loop__start",
          tabIndex: "0",
          onFocus: this.handleFocusStart
        }), this.props.children, /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__tab-loop__end",
          tabIndex: "0",
          onFocus: this.handleFocusEnd
        }));
      }
    }], [{
      key: "defaultProps",
      get: function get() {
        return {
          enableTabLoop: true
        };
      }
    }]);
  }(React__default.default.Component);

  function withFloating(Component) {
    var WithFloating = function WithFloating(props) {
      var alt_props = _objectSpread2(_objectSpread2({}, props), {}, {
        popperModifiers: props.popperModifiers || [],
        popperProps: props.popperProps || {},
        hidePopper: typeof props.hidePopper === "boolean" ? props.hidePopper : true
      });
      var arrowRef = React__default.default.useRef();
      var floatingProps = react.useFloating(_objectSpread2({
        open: !alt_props.hidePopper,
        whileElementsMounted: react.autoUpdate,
        placement: alt_props.popperPlacement,
        middleware: [react.flip({
          padding: 15
        }), react.offset(10), react.arrow({
          element: arrowRef
        })].concat(_toConsumableArray(alt_props.popperModifiers))
      }, alt_props.popperProps));
      return /*#__PURE__*/React__default.default.createElement(Component, _extends({}, alt_props, {
        popperProps: _objectSpread2(_objectSpread2({}, floatingProps), {}, {
          arrowRef: arrowRef
        })
      }));
    };
    return WithFloating;
  }

  // Exported for testing purposes
  var PopperComponent = /*#__PURE__*/function (_React$Component) {
    function PopperComponent() {
      _classCallCheck(this, PopperComponent);
      return _callSuper(this, PopperComponent, arguments);
    }
    _inherits(PopperComponent, _React$Component);
    return _createClass(PopperComponent, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          className = _this$props.className,
          wrapperClassName = _this$props.wrapperClassName,
          hidePopper = _this$props.hidePopper,
          popperComponent = _this$props.popperComponent,
          targetComponent = _this$props.targetComponent,
          enableTabLoop = _this$props.enableTabLoop,
          popperOnKeyDown = _this$props.popperOnKeyDown,
          portalId = _this$props.portalId,
          portalHost = _this$props.portalHost,
          popperProps = _this$props.popperProps,
          showArrow = _this$props.showArrow;
        var popper;
        if (!hidePopper) {
          var classes = clsx.clsx("react-datepicker-popper", className);
          popper = /*#__PURE__*/React__default.default.createElement(TabLoop, {
            enableTabLoop: enableTabLoop
          }, /*#__PURE__*/React__default.default.createElement("div", {
            ref: popperProps.refs.setFloating,
            style: popperProps.floatingStyles,
            className: classes,
            "data-placement": popperProps.placement,
            onKeyDown: popperOnKeyDown
          }, popperComponent, showArrow && /*#__PURE__*/React__default.default.createElement(react.FloatingArrow, {
            ref: popperProps.arrowRef,
            context: popperProps.context,
            fill: "currentColor",
            strokeWidth: 1,
            height: 8,
            width: 16,
            style: {
              transform: "translateY(-1px)"
            },
            className: "react-datepicker__triangle"
          })));
        }
        if (this.props.popperContainer) {
          popper = /*#__PURE__*/React__default.default.createElement(this.props.popperContainer, {}, popper);
        }
        if (portalId && !hidePopper) {
          popper = /*#__PURE__*/React__default.default.createElement(Portal, {
            portalId: portalId,
            portalHost: portalHost
          }, popper);
        }
        var wrapperClasses = clsx.clsx("react-datepicker-wrapper", wrapperClassName);
        return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
          ref: popperProps.refs.setReference,
          className: wrapperClasses
        }, targetComponent), popper);
      }
    }], [{
      key: "defaultProps",
      get: function get() {
        return {
          hidePopper: true
        };
      }
    }]);
  }(React__default.default.Component);
  var PopperComponent$1 = withFloating(PopperComponent);

  var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
  var WrappedCalendar = onClickOutside__default.default(Calendar);

  // Compares dates year+month combinations
  function hasPreSelectionChanged(date1, date2) {
    if (date1 && date2) {
      return getMonth.getMonth(date1) !== getMonth.getMonth(date2) || getYear.getYear(date1) !== getYear.getYear(date2);
    }
    return date1 !== date2;
  }

  /**
   * General datepicker component.
   */
  var INPUT_ERR_1 = "Date input not valid.";
  var DatePicker = /*#__PURE__*/function (_React$Component) {
    function DatePicker(props) {
      var _this;
      _classCallCheck(this, DatePicker);
      _this = _callSuper(this, DatePicker, [props]);
      _defineProperty(_this, "getPreSelection", function () {
        return _this.props.openToDate ? _this.props.openToDate : _this.props.selectsEnd && _this.props.startDate ? _this.props.startDate : _this.props.selectsStart && _this.props.endDate ? _this.props.endDate : newDate();
      });
      // Convert the date from string format to standard Date format
      _defineProperty(_this, "modifyHolidays", function () {
        var _this$props$holidays;
        return (_this$props$holidays = _this.props.holidays) === null || _this$props$holidays === void 0 ? void 0 : _this$props$holidays.reduce(function (accumulator, holiday) {
          var date = new Date(holiday.date);
          if (!isValid$1.isValid(date)) {
            return accumulator;
          }
          return [].concat(_toConsumableArray(accumulator), [_objectSpread2(_objectSpread2({}, holiday), {}, {
            date: date
          })]);
        }, []);
      });
      _defineProperty(_this, "calcInitialState", function () {
        var _ref;
        var defaultPreSelection = _this.getPreSelection();
        var minDate = getEffectiveMinDate(_this.props);
        var maxDate = getEffectiveMaxDate(_this.props);
        var boundedPreSelection = minDate && isBefore.isBefore(defaultPreSelection, startOfDay.startOfDay(minDate)) ? minDate : maxDate && isAfter.isAfter(defaultPreSelection, endOfDay.endOfDay(maxDate)) ? maxDate : defaultPreSelection;
        return {
          open: _this.props.startOpen || false,
          preventFocus: false,
          preSelection: (_ref = _this.props.selectsRange ? _this.props.startDate : _this.props.selected) !== null && _ref !== void 0 ? _ref : boundedPreSelection,
          // transforming highlighted days (perhaps nested array)
          // to flat Map for faster access in day.jsx
          highlightDates: getHightLightDaysMap(_this.props.highlightDates),
          focused: false,
          // used to focus day in inline version after month has changed, but not on
          // initial render
          shouldFocusDayInline: false,
          isRenderAriaLiveMessage: false
        };
      });
      _defineProperty(_this, "clearPreventFocusTimeout", function () {
        if (_this.preventFocusTimeout) {
          clearTimeout(_this.preventFocusTimeout);
        }
      });
      _defineProperty(_this, "setFocus", function () {
        if (_this.input && _this.input.focus) {
          _this.input.focus({
            preventScroll: true
          });
        }
      });
      _defineProperty(_this, "setBlur", function () {
        if (_this.input && _this.input.blur) {
          _this.input.blur();
        }
        _this.cancelFocusInput();
      });
      _defineProperty(_this, "setOpen", function (open) {
        var skipSetBlur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        _this.setState({
          open: open,
          preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
        }, function () {
          if (!open) {
            _this.setState(function (prev) {
              return {
                focused: skipSetBlur ? prev.focused : false
              };
            }, function () {
              !skipSetBlur && _this.setBlur();
              _this.setState({
                inputValue: null
              });
            });
          }
        });
      });
      _defineProperty(_this, "inputOk", function () {
        return isDate.isDate(_this.state.preSelection);
      });
      _defineProperty(_this, "isCalendarOpen", function () {
        return _this.props.open === undefined ? _this.state.open && !_this.props.disabled && !_this.props.readOnly : _this.props.open;
      });
      _defineProperty(_this, "handleFocus", function (event) {
        if (!_this.state.preventFocus) {
          _this.props.onFocus(event);
          if (!_this.props.preventOpenOnFocus && !_this.props.readOnly) {
            _this.setOpen(true);
          }
        }
        _this.setState({
          focused: true
        });
      });
      _defineProperty(_this, "sendFocusBackToInput", function () {
        // Clear previous timeout if it exists
        if (_this.preventFocusTimeout) {
          _this.clearPreventFocusTimeout();
        }

        // close the popper and refocus the input
        // stop the input from auto opening onFocus
        // setFocus to the input
        _this.setState({
          preventFocus: true
        }, function () {
          _this.preventFocusTimeout = setTimeout(function () {
            _this.setFocus();
            _this.setState({
              preventFocus: false
            });
          });
        });
      });
      _defineProperty(_this, "cancelFocusInput", function () {
        clearTimeout(_this.inputFocusTimeout);
        _this.inputFocusTimeout = null;
      });
      _defineProperty(_this, "deferFocusInput", function () {
        _this.cancelFocusInput();
        _this.inputFocusTimeout = setTimeout(function () {
          return _this.setFocus();
        }, 1);
      });
      _defineProperty(_this, "handleDropdownFocus", function () {
        _this.cancelFocusInput();
      });
      _defineProperty(_this, "handleBlur", function (event) {
        if (!_this.state.open || _this.props.withPortal || _this.props.showTimeInput) {
          _this.props.onBlur(event);
        }
        _this.setState({
          focused: false
        });
      });
      _defineProperty(_this, "handleCalendarClickOutside", function (event) {
        if (!_this.props.inline) {
          _this.setOpen(false);
        }
        _this.props.onClickOutside(event);
        if (_this.props.withPortal) {
          event.preventDefault();
        }
      });
      _defineProperty(_this, "handleChange", function () {
        for (var _len = arguments.length, allArgs = new Array(_len), _key = 0; _key < _len; _key++) {
          allArgs[_key] = arguments[_key];
        }
        var event = allArgs[0];
        if (_this.props.onChangeRaw) {
          _this.props.onChangeRaw.apply(_this, allArgs);
          if (typeof event.isDefaultPrevented !== "function" || event.isDefaultPrevented()) {
            return;
          }
        }
        _this.setState({
          inputValue: event.target.value,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT
        });
        var date = parseDate(event.target.value, _this.props.dateFormat, _this.props.locale, _this.props.strictParsing, _this.props.minDate);
        // Use date from `selected` prop when manipulating only time for input value
        if (_this.props.showTimeSelectOnly && _this.props.selected && date && !isSameDay(date, _this.props.selected)) {
          date = set.set(_this.props.selected, {
            hours: getHours.getHours(date),
            minutes: getMinutes.getMinutes(date),
            seconds: getSeconds.getSeconds(date)
          });
        }
        if (date || !event.target.value) {
          _this.setSelected(date, event, true);
        }
      });
      _defineProperty(_this, "handleSelect", function (date, event, monthSelectedIn) {
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
          _this.setState({
            isRenderAriaLiveMessage: true
          });
        }
        if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
          _this.setPreSelection(date);
        } else if (!_this.props.inline) {
          if (!_this.props.selectsRange) {
            _this.setOpen(false);
          }
          var _this$props = _this.props,
            startDate = _this$props.startDate,
            endDate = _this$props.endDate;
          if (startDate && !endDate && !isDateBefore(date, startDate)) {
            _this.setOpen(false);
          }
        }
      });
      _defineProperty(_this, "setSelected", function (date, event, keepInput, monthSelectedIn) {
        var changedDate = date;
        if (_this.props.showYearPicker) {
          if (changedDate !== null && isYearDisabled(getYear.getYear(changedDate), _this.props)) {
            return;
          }
        } else if (_this.props.showMonthYearPicker) {
          if (changedDate !== null && isMonthDisabled(changedDate, _this.props)) {
            return;
          }
        } else {
          if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
            return;
          }
        }
        var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          selectsRange = _this$props2.selectsRange,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate,
          selectsMultiple = _this$props2.selectsMultiple,
          selectedDates = _this$props2.selectedDates,
          minTime = _this$props2.minTime;
        if (!isEqual(_this.props.selected, changedDate) || _this.props.allowSameDay || selectsRange || selectsMultiple) {
          if (changedDate !== null) {
            if (_this.props.selected && (!keepInput || !_this.props.showTimeSelect && !_this.props.showTimeSelectOnly && !_this.props.showTimeInput)) {
              changedDate = setTime(changedDate, {
                hour: getHours.getHours(_this.props.selected),
                minute: getMinutes.getMinutes(_this.props.selected),
                second: getSeconds.getSeconds(_this.props.selected)
              });
            }

            // If minTime is present then set the time to minTime
            if (!keepInput && (_this.props.showTimeSelect || _this.props.showTimeSelectOnly)) {
              if (minTime) {
                changedDate = setTime(changedDate, {
                  hour: minTime.getHours(),
                  minute: minTime.getMinutes(),
                  second: minTime.getSeconds()
                });
              }
            }
            if (!_this.props.inline) {
              _this.setState({
                preSelection: changedDate
              });
            }
            if (!_this.props.focusSelectedMonth) {
              _this.setState({
                monthSelectedIn: monthSelectedIn
              });
            }
          }
          if (selectsRange) {
            var noRanges = !startDate && !endDate;
            var hasStartRange = startDate && !endDate;
            var isRangeFilled = startDate && endDate;
            if (noRanges) {
              onChange([changedDate, null], event);
            } else if (hasStartRange) {
              if (changedDate === null) {
                onChange([null, null], event);
              } else if (isDateBefore(changedDate, startDate)) {
                onChange([changedDate, null], event);
              } else {
                onChange([startDate, changedDate], event);
              }
            }
            if (isRangeFilled) {
              onChange([changedDate, null], event);
            }
          } else if (selectsMultiple) {
            if (!(selectedDates !== null && selectedDates !== void 0 && selectedDates.length)) {
              onChange([changedDate], event);
            } else {
              var isChangedDateAlreadySelected = selectedDates.some(function (selectedDate) {
                return isSameDay(selectedDate, changedDate);
              });
              if (isChangedDateAlreadySelected) {
                var nextDates = selectedDates.filter(function (selectedDate) {
                  return !isSameDay(selectedDate, changedDate);
                });
                onChange(nextDates, event);
              } else {
                onChange([].concat(_toConsumableArray(selectedDates), [changedDate]), event);
              }
            }
          } else {
            onChange(changedDate, event);
          }
        }
        if (!keepInput) {
          _this.props.onSelect(changedDate, event);
          _this.setState({
            inputValue: null
          });
        }
      });
      // When checking preSelection via min/maxDate, times need to be manipulated via startOfDay/endOfDay
      _defineProperty(_this, "setPreSelection", function (date) {
        var hasMinDate = typeof _this.props.minDate !== "undefined";
        var hasMaxDate = typeof _this.props.maxDate !== "undefined";
        var isValidDateSelection = true;
        if (date) {
          var dateStartOfDay = startOfDay.startOfDay(date);
          if (hasMinDate && hasMaxDate) {
            // isDayInRange uses startOfDay internally, so not necessary to manipulate times here
            isValidDateSelection = isDayInRange(date, _this.props.minDate, _this.props.maxDate);
          } else if (hasMinDate) {
            var minDateStartOfDay = startOfDay.startOfDay(_this.props.minDate);
            isValidDateSelection = isAfter.isAfter(date, minDateStartOfDay) || isEqual(dateStartOfDay, minDateStartOfDay);
          } else if (hasMaxDate) {
            var maxDateEndOfDay = endOfDay.endOfDay(_this.props.maxDate);
            isValidDateSelection = isBefore.isBefore(date, maxDateEndOfDay) || isEqual(dateStartOfDay, maxDateEndOfDay);
          }
        }
        if (isValidDateSelection) {
          _this.setState({
            preSelection: date
          });
        }
      });
      _defineProperty(_this, "toggleCalendar", function () {
        _this.setOpen(!_this.state.open);
      });
      _defineProperty(_this, "handleTimeChange", function (time) {
        var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
        var changedDate = _this.props.selected ? time : setTime(selected, {
          hour: getHours.getHours(time),
          minute: getMinutes.getMinutes(time)
        });
        _this.setState({
          preSelection: changedDate
        });
        _this.props.onChange(changedDate);
        if (_this.props.shouldCloseOnSelect) {
          _this.sendFocusBackToInput();
          _this.setOpen(false);
        }
        if (_this.props.showTimeInput) {
          _this.setOpen(true);
        }
        if (_this.props.showTimeSelectOnly || _this.props.showTimeSelect) {
          _this.setState({
            isRenderAriaLiveMessage: true
          });
        }
        _this.setState({
          inputValue: null
        });
      });
      _defineProperty(_this, "onInputClick", function () {
        if (!_this.props.disabled && !_this.props.readOnly) {
          _this.setOpen(true);
        }
        _this.props.onInputClick();
      });
      _defineProperty(_this, "onInputKeyDown", function (event) {
        _this.props.onKeyDown(event);
        var eventKey = event.key;
        if (!_this.state.open && !_this.props.inline && !_this.props.preventOpenOnFocus) {
          if (eventKey === "ArrowDown" || eventKey === "ArrowUp" || eventKey === "Enter") {
            _this.onInputClick();
          }
          return;
        }

        // if calendar is open, these keys will focus the selected item
        if (_this.state.open) {
          if (eventKey === "ArrowDown" || eventKey === "ArrowUp") {
            event.preventDefault();
            var selectorString = _this.props.showWeekPicker && _this.props.showWeekNumbers ? '.react-datepicker__week-number[tabindex="0"]' : '.react-datepicker__day[tabindex="0"]';
            var selectedItem = _this.calendar.componentNode && _this.calendar.componentNode.querySelector(selectorString);
            selectedItem && selectedItem.focus({
              preventScroll: true
            });
            return;
          }
          var copy = newDate(_this.state.preSelection);
          if (eventKey === "Enter") {
            event.preventDefault();
            if (_this.inputOk() && _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE) {
              _this.handleSelect(copy, event);
              !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
            } else {
              _this.setOpen(false);
            }
          } else if (eventKey === "Escape") {
            event.preventDefault();
            _this.sendFocusBackToInput();
            _this.setOpen(false);
          } else if (eventKey === "Tab") {
            _this.setOpen(false);
          }
          if (!_this.inputOk()) {
            _this.props.onInputError({
              code: 1,
              msg: INPUT_ERR_1
            });
          }
        }
      });
      _defineProperty(_this, "onPortalKeyDown", function (event) {
        var eventKey = event.key;
        if (eventKey === "Escape") {
          event.preventDefault();
          _this.setState({
            preventFocus: true
          }, function () {
            _this.setOpen(false);
            setTimeout(function () {
              _this.setFocus();
              _this.setState({
                preventFocus: false
              });
            });
          });
        }
      });
      // keyDown events passed down to day.jsx
      _defineProperty(_this, "onDayKeyDown", function (event) {
        _this.props.onKeyDown(event);
        var eventKey = event.key;
        var isShiftKeyActive = event.shiftKey;
        var copy = newDate(_this.state.preSelection);
        if (eventKey === "Enter") {
          event.preventDefault();
          _this.handleSelect(copy, event);
          !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
        } else if (eventKey === "Escape") {
          event.preventDefault();
          _this.setOpen(false);
          if (!_this.inputOk()) {
            _this.props.onInputError({
              code: 1,
              msg: INPUT_ERR_1
            });
          }
        } else if (!_this.props.disabledKeyboardNavigation) {
          var newSelection;
          switch (eventKey) {
            case "ArrowLeft":
              if (_this.props.showWeekPicker) {
                newSelection = subWeeks.subWeeks(copy, 1);
              } else {
                newSelection = subDays.subDays(copy, 1);
              }
              break;
            case "ArrowRight":
              if (_this.props.showWeekPicker) {
                newSelection = addWeeks.addWeeks(copy, 1);
              } else {
                newSelection = addDays.addDays(copy, 1);
              }
              break;
            case "ArrowUp":
              newSelection = subWeeks.subWeeks(copy, 1);
              break;
            case "ArrowDown":
              newSelection = addWeeks.addWeeks(copy, 1);
              break;
            case "PageUp":
              newSelection = isShiftKeyActive ? subYears.subYears(copy, 1) : subMonths.subMonths(copy, 1);
              break;
            case "PageDown":
              newSelection = isShiftKeyActive ? addYears.addYears(copy, 1) : addMonths.addMonths(copy, 1);
              break;
            case "Home":
              newSelection = getStartOfWeek(copy, _this.props.locale, _this.props.calendarStartDay);
              break;
            case "End":
              newSelection = getEndOfWeek(copy);
              break;
            default:
              newSelection = null;
              break;
          }
          if (!newSelection) {
            if (_this.props.onInputError) {
              _this.props.onInputError({
                code: 1,
                msg: INPUT_ERR_1
              });
            }
            return;
          }
          event.preventDefault();
          _this.setState({
            lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
          });
          if (_this.props.adjustDateOnChange) {
            _this.setSelected(newSelection);
          }
          _this.setPreSelection(newSelection);
          // need to figure out whether month has changed to focus day in inline version
          if (_this.props.inline) {
            var prevMonth = getMonth.getMonth(copy);
            var newMonth = getMonth.getMonth(newSelection);
            var prevYear = getYear.getYear(copy);
            var newYear = getYear.getYear(newSelection);
            if (prevMonth !== newMonth || prevYear !== newYear) {
              // month has changed
              _this.setState({
                shouldFocusDayInline: true
              });
            } else {
              // month hasn't changed
              _this.setState({
                shouldFocusDayInline: false
              });
            }
          }
        }
      });
      // handle generic key down events in the popper that do not adjust or select dates
      // ex: while focusing prev and next month buttons
      _defineProperty(_this, "onPopperKeyDown", function (event) {
        var eventKey = event.key;
        if (eventKey === "Escape") {
          event.preventDefault();
          _this.sendFocusBackToInput();
        }
      });
      _defineProperty(_this, "onClearClick", function (event) {
        if (event) {
          if (event.preventDefault) {
            event.preventDefault();
          }
        }
        _this.sendFocusBackToInput();
        if (_this.props.selectsRange) {
          _this.props.onChange([null, null], event);
        } else {
          _this.props.onChange(null, event);
        }
        _this.setState({
          inputValue: null
        });
      });
      _defineProperty(_this, "clear", function () {
        _this.onClearClick();
      });
      _defineProperty(_this, "onScroll", function (event) {
        if (typeof _this.props.closeOnScroll === "boolean" && _this.props.closeOnScroll) {
          if (event.target === document || event.target === document.documentElement || event.target === document.body) {
            _this.setOpen(false);
          }
        } else if (typeof _this.props.closeOnScroll === "function") {
          if (_this.props.closeOnScroll(event)) {
            _this.setOpen(false);
          }
        }
      });
      _defineProperty(_this, "renderCalendar", function () {
        if (!_this.props.inline && !_this.isCalendarOpen()) {
          return null;
        }
        return /*#__PURE__*/React__default.default.createElement(WrappedCalendar, {
          ref: function ref(elem) {
            _this.calendar = elem;
          },
          locale: _this.props.locale,
          calendarStartDay: _this.props.calendarStartDay,
          chooseDayAriaLabelPrefix: _this.props.chooseDayAriaLabelPrefix,
          disabledDayAriaLabelPrefix: _this.props.disabledDayAriaLabelPrefix,
          weekAriaLabelPrefix: _this.props.weekAriaLabelPrefix,
          monthAriaLabelPrefix: _this.props.monthAriaLabelPrefix,
          adjustDateOnChange: _this.props.adjustDateOnChange,
          setOpen: _this.setOpen,
          shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
          dateFormat: _this.props.dateFormatCalendar,
          useWeekdaysShort: _this.props.useWeekdaysShort,
          formatWeekDay: _this.props.formatWeekDay,
          dropdownMode: _this.props.dropdownMode,
          selected: _this.props.selected,
          preSelection: _this.state.preSelection,
          onSelect: _this.handleSelect,
          onWeekSelect: _this.props.onWeekSelect,
          openToDate: _this.props.openToDate,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          selectsRange: _this.props.selectsRange,
          selectsMultiple: _this.props.selectsMultiple,
          selectedDates: _this.props.selectedDates,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals,
          filterDate: _this.props.filterDate,
          onClickOutside: _this.handleCalendarClickOutside,
          formatWeekNumber: _this.props.formatWeekNumber,
          highlightDates: _this.state.highlightDates,
          holidays: getHolidaysMap(_this.modifyHolidays()),
          includeDates: _this.props.includeDates,
          includeDateIntervals: _this.props.includeDateIntervals,
          includeTimes: _this.props.includeTimes,
          injectTimes: _this.props.injectTimes,
          inline: _this.props.inline,
          shouldFocusDayInline: _this.state.shouldFocusDayInline,
          peekNextMonth: _this.props.peekNextMonth,
          showMonthDropdown: _this.props.showMonthDropdown,
          showPreviousMonths: _this.props.showPreviousMonths,
          useShortMonthInDropdown: _this.props.useShortMonthInDropdown,
          showMonthYearDropdown: _this.props.showMonthYearDropdown,
          showWeekNumbers: _this.props.showWeekNumbers,
          showYearDropdown: _this.props.showYearDropdown,
          withPortal: _this.props.withPortal,
          forceShowMonthNavigation: _this.props.forceShowMonthNavigation,
          showDisabledMonthNavigation: _this.props.showDisabledMonthNavigation,
          scrollableYearDropdown: _this.props.scrollableYearDropdown,
          scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown,
          todayButton: _this.props.todayButton,
          weekLabel: _this.props.weekLabel,
          outsideClickIgnoreClass: outsideClickIgnoreClass,
          fixedHeight: _this.props.fixedHeight,
          monthsShown: _this.props.monthsShown,
          monthSelectedIn: _this.state.monthSelectedIn,
          onDropdownFocus: _this.handleDropdownFocus,
          onMonthChange: _this.props.onMonthChange,
          onYearChange: _this.props.onYearChange,
          dayClassName: _this.props.dayClassName,
          weekDayClassName: _this.props.weekDayClassName,
          monthClassName: _this.props.monthClassName,
          timeClassName: _this.props.timeClassName,
          showDateSelect: _this.props.showDateSelect,
          showTimeSelect: _this.props.showTimeSelect,
          showTimeSelectOnly: _this.props.showTimeSelectOnly,
          onTimeChange: _this.handleTimeChange,
          timeFormat: _this.props.timeFormat,
          timeIntervals: _this.props.timeIntervals,
          minTime: _this.props.minTime,
          maxTime: _this.props.maxTime,
          excludeTimes: _this.props.excludeTimes,
          filterTime: _this.props.filterTime,
          timeCaption: _this.props.timeCaption,
          className: _this.props.calendarClassName,
          container: _this.props.calendarContainer,
          yearItemNumber: _this.props.yearItemNumber,
          yearDropdownItemNumber: _this.props.yearDropdownItemNumber,
          previousMonthAriaLabel: _this.props.previousMonthAriaLabel,
          previousMonthButtonLabel: _this.props.previousMonthButtonLabel,
          nextMonthAriaLabel: _this.props.nextMonthAriaLabel,
          nextMonthButtonLabel: _this.props.nextMonthButtonLabel,
          previousYearAriaLabel: _this.props.previousYearAriaLabel,
          previousYearButtonLabel: _this.props.previousYearButtonLabel,
          nextYearAriaLabel: _this.props.nextYearAriaLabel,
          nextYearButtonLabel: _this.props.nextYearButtonLabel,
          timeInputLabel: _this.props.timeInputLabel,
          disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
          renderCustomHeader: _this.props.renderCustomHeader,
          popperProps: _this.props.popperProps,
          renderDayContents: _this.props.renderDayContents,
          renderMonthContent: _this.props.renderMonthContent,
          renderQuarterContent: _this.props.renderQuarterContent,
          renderYearContent: _this.props.renderYearContent,
          onDayMouseEnter: _this.props.onDayMouseEnter,
          onMonthMouseLeave: _this.props.onMonthMouseLeave,
          onYearMouseEnter: _this.props.onYearMouseEnter,
          onYearMouseLeave: _this.props.onYearMouseLeave,
          selectsDisabledDaysInRange: _this.props.selectsDisabledDaysInRange,
          showTimeInput: _this.props.showTimeInput,
          showMonthYearPicker: _this.props.showMonthYearPicker,
          showFullMonthYearPicker: _this.props.showFullMonthYearPicker,
          showTwoColumnMonthYearPicker: _this.props.showTwoColumnMonthYearPicker,
          showFourColumnMonthYearPicker: _this.props.showFourColumnMonthYearPicker,
          showYearPicker: _this.props.showYearPicker,
          showQuarterYearPicker: _this.props.showQuarterYearPicker,
          showWeekPicker: _this.props.showWeekPicker,
          excludeScrollbar: _this.props.excludeScrollbar,
          handleOnKeyDown: _this.props.onKeyDown,
          handleOnDayKeyDown: _this.onDayKeyDown,
          isInputFocused: _this.state.focused,
          customTimeInput: _this.props.customTimeInput,
          setPreSelection: _this.setPreSelection,
          usePointerEvent: _this.props.usePointerEvent,
          yearClassName: _this.props.yearClassName
        }, _this.props.children);
      });
      _defineProperty(_this, "renderAriaLiveRegion", function () {
        var _this$props3 = _this.props,
          dateFormat = _this$props3.dateFormat,
          locale = _this$props3.locale;
        var isContainsTime = _this.props.showTimeInput || _this.props.showTimeSelect;
        var longDateFormat = isContainsTime ? "PPPPp" : "PPPP";
        var ariaLiveMessage;
        if (_this.props.selectsRange) {
          ariaLiveMessage = "Selected start date: ".concat(safeDateFormat(_this.props.startDate, {
            dateFormat: longDateFormat,
            locale: locale
          }), ". ").concat(_this.props.endDate ? "End date: " + safeDateFormat(_this.props.endDate, {
            dateFormat: longDateFormat,
            locale: locale
          }) : "");
        } else {
          if (_this.props.showTimeSelectOnly) {
            ariaLiveMessage = "Selected time: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: dateFormat,
              locale: locale
            }));
          } else if (_this.props.showYearPicker) {
            ariaLiveMessage = "Selected year: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy",
              locale: locale
            }));
          } else if (_this.props.showMonthYearPicker) {
            ariaLiveMessage = "Selected month: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: "MMMM yyyy",
              locale: locale
            }));
          } else if (_this.props.showQuarterYearPicker) {
            ariaLiveMessage = "Selected quarter: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy, QQQ",
              locale: locale
            }));
          } else {
            ariaLiveMessage = "Selected date: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: longDateFormat,
              locale: locale
            }));
          }
        }
        return /*#__PURE__*/React__default.default.createElement("span", {
          role: "alert",
          "aria-live": "polite",
          className: "react-datepicker__aria-live"
        }, ariaLiveMessage);
      });
      _defineProperty(_this, "renderDateInput", function () {
        var _React$cloneElement;
        var className = clsx.clsx(_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));
        var customInput = _this.props.customInput || /*#__PURE__*/React__default.default.createElement("input", {
          type: "text"
        });
        var customInputRef = _this.props.customInputRef || "ref";
        var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : _this.props.selectsRange ? safeDateRangeFormat(_this.props.startDate, _this.props.endDate, _this.props) : _this.props.selectsMultiple ? safeMultipleDatesFormat(_this.props.selectedDates, _this.props) : safeDateFormat(_this.props.selected, _this.props);
        return /*#__PURE__*/React__default.default.cloneElement(customInput, (_React$cloneElement = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, customInputRef, function (input) {
          _this.input = input;
        }), "value", inputValue), "onBlur", _this.handleBlur), "onChange", _this.handleChange), "onClick", _this.onInputClick), "onFocus", _this.handleFocus), "onKeyDown", _this.onInputKeyDown), "id", _this.props.id), "name", _this.props.name), "form", _this.props.form), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "autoFocus", _this.props.autoFocus), "placeholder", _this.props.placeholderText), "disabled", _this.props.disabled), "autoComplete", _this.props.autoComplete), "className", clsx.clsx(customInput.props.className, className)), "title", _this.props.title), "readOnly", _this.props.readOnly), "required", _this.props.required), "tabIndex", _this.props.tabIndex), "aria-describedby", _this.props.ariaDescribedBy), _defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "aria-invalid", _this.props.ariaInvalid), "aria-labelledby", _this.props.ariaLabelledBy), "aria-required", _this.props.ariaRequired)));
      });
      _defineProperty(_this, "renderClearButton", function () {
        var _this$props4 = _this.props,
          isClearable = _this$props4.isClearable,
          disabled = _this$props4.disabled,
          selected = _this$props4.selected,
          startDate = _this$props4.startDate,
          endDate = _this$props4.endDate,
          clearButtonTitle = _this$props4.clearButtonTitle,
          _this$props4$clearBut = _this$props4.clearButtonClassName,
          clearButtonClassName = _this$props4$clearBut === void 0 ? "" : _this$props4$clearBut,
          _this$props4$ariaLabe = _this$props4.ariaLabelClose,
          ariaLabelClose = _this$props4$ariaLabe === void 0 ? "Close" : _this$props4$ariaLabe,
          selectedDates = _this$props4.selectedDates;
        if (isClearable && (selected != null || startDate != null || endDate != null || selectedDates !== null && selectedDates !== void 0 && selectedDates.length)) {
          return /*#__PURE__*/React__default.default.createElement("button", {
            type: "button",
            className: clsx.clsx("react-datepicker__close-icon", clearButtonClassName, {
              "react-datepicker__close-icon--disabled": disabled
            }),
            disabled: disabled,
            "aria-label": ariaLabelClose,
            onClick: _this.onClearClick,
            title: clearButtonTitle,
            tabIndex: -1
          });
        } else {
          return null;
        }
      });
      _this.state = _this.calcInitialState();
      _this.preventFocusTimeout = null;
      return _this;
    }
    _inherits(DatePicker, _React$Component);
    return _createClass(DatePicker, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        window.addEventListener("scroll", this.onScroll, true);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevProps.inline && hasPreSelectionChanged(prevProps.selected, this.props.selected)) {
          this.setPreSelection(this.props.selected);
        }
        if (this.state.monthSelectedIn !== undefined && prevProps.monthsShown !== this.props.monthsShown) {
          this.setState({
            monthSelectedIn: 0
          });
        }
        if (prevProps.highlightDates !== this.props.highlightDates) {
          this.setState({
            highlightDates: getHightLightDaysMap(this.props.highlightDates)
          });
        }
        if (!prevState.focused && !isEqual(prevProps.selected, this.props.selected)) {
          this.setState({
            inputValue: null
          });
        }
        if (prevState.open !== this.state.open) {
          if (prevState.open === false && this.state.open === true) {
            this.props.onCalendarOpen();
          }
          if (prevState.open === true && this.state.open === false) {
            this.props.onCalendarClose();
          }
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearPreventFocusTimeout();
        window.removeEventListener("scroll", this.onScroll, true);
      }
    }, {
      key: "renderInputContainer",
      value: function renderInputContainer() {
        var _this$props5 = this.props,
          showIcon = _this$props5.showIcon,
          icon = _this$props5.icon,
          calendarIconClassname = _this$props5.calendarIconClassname,
          toggleCalendarOnIconClick = _this$props5.toggleCalendarOnIconClick;
        var open = this.state.open;
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: "react-datepicker__input-container".concat(showIcon ? " react-datepicker__view-calendar-icon" : "")
        }, showIcon && /*#__PURE__*/React__default.default.createElement(CalendarIcon$1, _extends({
          icon: icon,
          className: "".concat(calendarIconClassname, " ").concat(open && "react-datepicker-ignore-onclickoutside")
        }, toggleCalendarOnIconClick ? {
          onClick: this.toggleCalendar
        } : null)), this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion(), this.renderDateInput(), this.renderClearButton());
      }
    }, {
      key: "render",
      value: function render() {
        var calendar = this.renderCalendar();
        if (this.props.inline) return calendar;
        if (this.props.withPortal) {
          var portalContainer = this.state.open ? /*#__PURE__*/React__default.default.createElement(TabLoop, {
            enableTabLoop: this.props.enableTabLoop
          }, /*#__PURE__*/React__default.default.createElement("div", {
            className: "react-datepicker__portal",
            tabIndex: -1,
            onKeyDown: this.onPortalKeyDown
          }, calendar)) : null;
          if (this.state.open && this.props.portalId) {
            portalContainer = /*#__PURE__*/React__default.default.createElement(Portal, {
              portalId: this.props.portalId,
              portalHost: this.props.portalHost
            }, portalContainer);
          }
          return /*#__PURE__*/React__default.default.createElement("div", null, this.renderInputContainer(), portalContainer);
        }
        return /*#__PURE__*/React__default.default.createElement(PopperComponent$1, {
          className: this.props.popperClassName,
          wrapperClassName: this.props.wrapperClassName,
          hidePopper: !this.isCalendarOpen(),
          portalId: this.props.portalId,
          portalHost: this.props.portalHost,
          popperModifiers: this.props.popperModifiers,
          targetComponent: this.renderInputContainer(),
          popperContainer: this.props.popperContainer,
          popperComponent: calendar,
          popperPlacement: this.props.popperPlacement,
          popperProps: this.props.popperProps,
          popperOnKeyDown: this.onPopperKeyDown,
          enableTabLoop: this.props.enableTabLoop,
          showArrow: this.props.showPopperArrow
        });
      }
    }], [{
      key: "defaultProps",
      get: function get() {
        return {
          allowSameDay: false,
          dateFormat: "MM/dd/yyyy",
          dateFormatCalendar: "LLLL yyyy",
          onChange: function onChange() {},
          disabled: false,
          disabledKeyboardNavigation: false,
          dropdownMode: "scroll",
          onFocus: function onFocus() {},
          onBlur: function onBlur() {},
          onKeyDown: function onKeyDown() {},
          onInputClick: function onInputClick() {},
          onSelect: function onSelect() {},
          onClickOutside: function onClickOutside() {},
          onMonthChange: function onMonthChange() {},
          onCalendarOpen: function onCalendarOpen() {},
          onCalendarClose: function onCalendarClose() {},
          preventOpenOnFocus: false,
          onYearChange: function onYearChange() {},
          onInputError: function onInputError() {},
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
          usePointerEvent: false
        };
      }
    }]);
  }(React__default.default.Component);
  var PRESELECT_CHANGE_VIA_INPUT = "input";
  var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

  exports.CalendarContainer = CalendarContainer;
  exports.default = DatePicker;
  exports.getDefaultLocale = getDefaultLocale;
  exports.registerLocale = registerLocale;
  exports.setDefaultLocale = setDefaultLocale;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGVfdXRpbHMuanMiLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9kYXkuanN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLmpzeCIsIi4uL3NyYy93ZWVrLmpzeCIsIi4uL3NyYy9tb250aC5qc3giLCIuLi9zcmMvdGltZS5qc3giLCIuLi9zcmMveWVhci5qc3giLCIuLi9zcmMvaW5wdXRUaW1lLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIuanN4IiwiLi4vc3JjL2NhbGVuZGFyLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLmpzeCIsIi4uL3NyYy9wb3J0YWwuanN4IiwiLi4vc3JjL3RhYl9sb29wLmpzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLmpzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LmpzeCIsIi4uL3NyYy9pbmRleC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSBcImRhdGUtZm5zL2lzRGF0ZVwiO1xuaW1wb3J0IHsgaXNWYWxpZCBhcyBpc1ZhbGlkRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGxvbmdGb3JtYXR0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2Zvcm1hdFwiO1xuaW1wb3J0IHsgYWRkTWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9hZGRNaW51dGVzXCI7XG5pbXBvcnQgeyBhZGRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9hZGRIb3Vyc1wiO1xuaW1wb3J0IHsgYWRkRGF5cyB9IGZyb20gXCJkYXRlLWZucy9hZGREYXlzXCI7XG5pbXBvcnQgeyBhZGRXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9hZGRXZWVrc1wiO1xuaW1wb3J0IHsgYWRkTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2FkZE1vbnRoc1wiO1xuaW1wb3J0IHsgYWRkUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkUXVhcnRlcnNcIjtcbmltcG9ydCB7IGFkZFllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFllYXJzXCI7XG5pbXBvcnQgeyBzdWJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL3N1YkRheXNcIjtcbmltcG9ydCB7IHN1YldlZWtzIH0gZnJvbSBcImRhdGUtZm5zL3N1YldlZWtzXCI7XG5pbXBvcnQgeyBzdWJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViTW9udGhzXCI7XG5pbXBvcnQgeyBzdWJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9zdWJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3ViWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViWWVhcnNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0U2Vjb25kc1wiO1xuaW1wb3J0IHsgZ2V0TWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9nZXRNaW51dGVzXCI7XG5pbXBvcnQgeyBnZXRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9nZXRIb3Vyc1wiO1xuaW1wb3J0IHsgZ2V0RGF5IH0gZnJvbSBcImRhdGUtZm5zL2dldERheVwiO1xuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXRlXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrIH0gZnJvbSBcImRhdGUtZm5zL2dldElTT1dlZWtcIjtcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2dldE1vbnRoXCI7XG5pbXBvcnQgeyBnZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2dldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0WWVhclwiO1xuaW1wb3J0IHsgZ2V0VGltZSB9IGZyb20gXCJkYXRlLWZucy9nZXRUaW1lXCI7XG5pbXBvcnQgeyBzZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL3NldFNlY29uZHNcIjtcbmltcG9ydCB7IHNldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0TWludXRlc1wiO1xuaW1wb3J0IHsgc2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0SG91cnNcIjtcbmltcG9ydCB7IHNldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3NldE1vbnRoXCI7XG5pbXBvcnQgeyBzZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3NldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IHNldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0WWVhclwiO1xuaW1wb3J0IHsgbWluIH0gZnJvbSBcImRhdGUtZm5zL21pblwiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcImRhdGUtZm5zL21heFwiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFyc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mV2Vla1wiO1xuaW1wb3J0IHsgc3RhcnRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZNb250aFwiO1xuaW1wb3J0IHsgc3RhcnRPZlF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlF1YXJ0ZXJcIjtcbmltcG9ydCB7IHN0YXJ0T2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZZZWFyXCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mV2Vla1wiO1xuaW1wb3J0IHsgZW5kT2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9lbmRPZk1vbnRoXCI7XG5pbXBvcnQgeyBlbmRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZZZWFyXCI7XG5pbXBvcnQgeyBpc0VxdWFsIGFzIGRmSXNFcXVhbCB9IGZyb20gXCJkYXRlLWZucy9pc0VxdWFsXCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgYXMgZGZJc1NhbWVEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lRGF5XCI7XG5pbXBvcnQgeyBpc1NhbWVNb250aCBhcyBkZklzU2FtZU1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZU1vbnRoXCI7XG5pbXBvcnQgeyBpc1NhbWVZZWFyIGFzIGRmSXNTYW1lWWVhciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVZZWFyXCI7XG5pbXBvcnQgeyBpc1NhbWVRdWFydGVyIGFzIGRmSXNTYW1lUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVRdWFydGVyXCI7XG5pbXBvcnQgeyBpc0FmdGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzQWZ0ZXJcIjtcbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSBcImRhdGUtZm5zL2lzQmVmb3JlXCI7XG5pbXBvcnQgeyBpc1dpdGhpbkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zL2lzV2l0aGluSW50ZXJ2YWxcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCJkYXRlLWZucy90b0RhdGVcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlXCI7XG5pbXBvcnQgeyBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZucy9wYXJzZUlTT1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSID0gMTI7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbmNvbnN0IGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1ArcCt8UCt8cCt8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vICoqIERhdGUgQ29uc3RydWN0b3JzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdEYXRlKHZhbHVlKSB7XG4gIGNvbnN0IGQgPSB2YWx1ZVxuICAgID8gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHBhcnNlSVNPKHZhbHVlKVxuICAgICAgOiB0b0RhdGUodmFsdWUpXG4gICAgOiBuZXcgRGF0ZSgpO1xuICByZXR1cm4gaXNWYWxpZChkKSA/IGQgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlKHZhbHVlLCBkYXRlRm9ybWF0LCBsb2NhbGUsIHN0cmljdFBhcnNpbmcsIG1pbkRhdGUpIHtcbiAgbGV0IHBhcnNlZERhdGUgPSBudWxsO1xuICBsZXQgbG9jYWxlT2JqZWN0ID1cbiAgICBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSB8fCBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgbGV0IHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID0gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkpIHtcbiAgICBkYXRlRm9ybWF0LmZvckVhY2goKGRmKSA9PiB7XG4gICAgICBsZXQgdHJ5UGFyc2VEYXRlID0gcGFyc2UodmFsdWUsIGRmLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgICAgICBpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiZcbiAgICAgICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZSh0cnlQYXJzZURhdGUsIGRmLCBsb2NhbGUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCkge1xuICAgICAgICBwYXJzZWREYXRlID0gdHJ5UGFyc2VEYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZWREYXRlO1xuICB9XG5cbiAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LCBuZXcgRGF0ZSgpLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xuXG4gIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgaXNWYWxpZChwYXJzZWREYXRlKSAmJlxuICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUocGFyc2VkRGF0ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlKTtcbiAgfSBlbHNlIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0XG4gICAgICAubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCJwXCIgfHwgZmlyc3RDaGFyYWN0ZXIgPT09IFwiUFwiKSB7XG4gICAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgICByZXR1cm4gbG9jYWxlT2JqZWN0XG4gICAgICAgICAgICA/IGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGVPYmplY3QuZm9ybWF0TG9uZylcbiAgICAgICAgICAgIDogZmlyc3RDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlwiKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSwgbmV3IERhdGUoKSwge1xuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPyBwYXJzZWREYXRlIDogbnVsbDtcbn1cblxuLy8gKiogRGF0ZSBcIlJlZmxlY3Rpb25cIiAqKlxuXG5leHBvcnQgeyBpc0RhdGUgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSwgbWluRGF0ZSkge1xuICBtaW5EYXRlID0gbWluRGF0ZSA/IG1pbkRhdGUgOiBuZXcgRGF0ZShcIjEvMS8xMDAwXCIpO1xuICByZXR1cm4gaXNWYWxpZERhdGUoZGF0ZSkgJiYgIWlzQmVmb3JlKGRhdGUsIG1pbkRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIEZvcm1hdHRpbmcgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0U3RyLCBsb2NhbGUpIHtcbiAgaWYgKGxvY2FsZSA9PT0gXCJlblwiKSB7XG4gICAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgfSk7XG4gIH1cbiAgbGV0IGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChsb2NhbGUpO1xuICBpZiAobG9jYWxlICYmICFsb2NhbGVPYmopIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgQSBsb2NhbGUgb2JqZWN0IHdhcyBub3QgZm91bmQgZm9yIHRoZSBwcm92aWRlZCBzdHJpbmcgW1wiJHtsb2NhbGV9XCJdLmAsXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgIWxvY2FsZU9iaiAmJlxuICAgICEhZ2V0RGVmYXVsdExvY2FsZSgpICYmXG4gICAgISFnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKVxuICApIHtcbiAgICBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqID8gbG9jYWxlT2JqIDogbnVsbCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZUZvcm1hdChkYXRlLCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9KSB7XG4gIHJldHVybiAoXG4gICAgKGRhdGUgJiZcbiAgICAgIGZvcm1hdERhdGUoXG4gICAgICAgIGRhdGUsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkgPyBkYXRlRm9ybWF0WzBdIDogZGF0ZUZvcm1hdCxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgKSkgfHxcbiAgICBcIlwiXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZVJhbmdlRm9ybWF0KHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcHJvcHMpIHtcbiAgaWYgKCFzdGFydERhdGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KHN0YXJ0RGF0ZSwgcHJvcHMpO1xuICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gZW5kRGF0ZSA/IHNhZmVEYXRlRm9ybWF0KGVuZERhdGUsIHByb3BzKSA6IFwiXCI7XG5cbiAgcmV0dXJuIGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZX0gLSAke2Zvcm1hdHRlZEVuZERhdGV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KGRhdGVzLCBwcm9wcykge1xuICBpZiAoIWRhdGVzPy5sZW5ndGgpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBjb25zdCBmb3JtYXR0ZWRGaXJzdERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1swXSwgcHJvcHMpO1xuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlZEZpcnN0RGF0ZTtcbiAgfVxuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kRGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzFdLCBwcm9wcyk7XG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0sICR7Zm9ybWF0dGVkU2Vjb25kRGF0ZX1gO1xuICB9XG5cbiAgY29uc3QgZXh0cmFEYXRlc0NvdW50ID0gZGF0ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0gKCske2V4dHJhRGF0ZXNDb3VudH0pYDtcbn1cblxuLy8gKiogRGF0ZSBTZXR0ZXJzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lKGRhdGUsIHsgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSkge1xuICByZXR1cm4gc2V0SG91cnMoc2V0TWludXRlcyhzZXRTZWNvbmRzKGRhdGUsIHNlY29uZCksIG1pbnV0ZSksIGhvdXIpO1xufVxuXG5leHBvcnQgeyBzZXRNaW51dGVzLCBzZXRIb3Vycywgc2V0TW9udGgsIHNldFF1YXJ0ZXIsIHNldFllYXIgfTtcblxuLy8gKiogRGF0ZSBHZXR0ZXJzICoqXG5cbi8vIGdldERheSBSZXR1cm5zIGRheSBvZiB3ZWVrLCBnZXREYXRlIHJldHVybnMgZGF5IG9mIG1vbnRoXG5leHBvcnQge1xuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgZ2V0TW9udGgsXG4gIGdldFF1YXJ0ZXIsXG4gIGdldFllYXIsXG4gIGdldERheSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0VGltZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIGxvY2FsZSkge1xuICBsZXQgbG9jYWxlT2JqID1cbiAgICAobG9jYWxlICYmIGdldExvY2FsZU9iamVjdChsb2NhbGUpKSB8fFxuICAgIChnZXREZWZhdWx0TG9jYWxlKCkgJiYgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSkpO1xuICByZXR1cm4gZ2V0SVNPV2VlayhkYXRlLCBsb2NhbGVPYmogPyB7IGxvY2FsZTogbG9jYWxlT2JqIH0gOiBudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2Vla0NvZGUoZGF5LCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF5LCBcImRkZFwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiogU3RhcnQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mRGF5KGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mV2VlayhkYXRlLCBsb2NhbGUsIGNhbGVuZGFyU3RhcnREYXkpIHtcbiAgbGV0IGxvY2FsZU9iaiA9IGxvY2FsZVxuICAgID8gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSlcbiAgICA6IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqLFxuICAgIHdlZWtTdGFydHNPbjogY2FsZW5kYXJTdGFydERheSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZk1vbnRoKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlllYXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlllYXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mUXVhcnRlcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mUXVhcnRlcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZUb2RheSgpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkobmV3RGF0ZSgpKTtcbn1cblxuLy8gKioqIEVuZCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mV2VlayhkYXRlKSB7XG4gIHJldHVybiBlbmRPZldlZWsoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mTW9udGgoZGF0ZSk7XG59XG5cbi8vICoqIERhdGUgTWF0aCAqKlxuXG4vLyAqKiogQWRkaXRpb24gKioqXG5cbmV4cG9ydCB7IGFkZE1pbnV0ZXMsIGFkZERheXMsIGFkZFdlZWtzLCBhZGRNb250aHMsIGFkZFF1YXJ0ZXJzLCBhZGRZZWFycyB9O1xuXG4vLyAqKiogU3VidHJhY3Rpb24gKioqXG5cbmV4cG9ydCB7IGFkZEhvdXJzLCBzdWJEYXlzLCBzdWJXZWVrcywgc3ViTW9udGhzLCBzdWJRdWFydGVycywgc3ViWWVhcnMgfTtcblxuLy8gKiogRGF0ZSBDb21wYXJpc29uICoqXG5cbmV4cG9ydCB7IGlzQmVmb3JlLCBpc0FmdGVyIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVZZWFyKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVZZWFyKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU1vbnRoKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVRdWFydGVyKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVRdWFydGVyKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURheShkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lRGF5KGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWwoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzRXF1YWwoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gIGxldCB2YWxpZDtcbiAgY29uc3Qgc3RhcnQgPSBzdGFydE9mRGF5KHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZCA9IGVuZE9mRGF5KGVuZERhdGUpO1xuXG4gIHRyeSB7XG4gICAgdmFsaWQgPSBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuLy8gKioqIERpZmZpbmcgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlzRGlmZihkYXRlMSwgZGF0ZTIpIHtcbiAgcmV0dXJuIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlMSwgZGF0ZTIpO1xufVxuXG4vLyAqKiBEYXRlIExvY2FsaXphdGlvbiAqKlxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJMb2NhbGUobG9jYWxlTmFtZSwgbG9jYWxlRGF0YSkge1xuICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuXG4gIGlmICghc2NvcGUuX19sb2NhbGVEYXRhX18pIHtcbiAgICBzY29wZS5fX2xvY2FsZURhdGFfXyA9IHt9O1xuICB9XG4gIHNjb3BlLl9fbG9jYWxlRGF0YV9fW2xvY2FsZU5hbWVdID0gbG9jYWxlRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRMb2NhbGUobG9jYWxlTmFtZSkge1xuICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuXG4gIHNjb3BlLl9fbG9jYWxlSWRfXyA9IGxvY2FsZU5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0TG9jYWxlKCkge1xuICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuXG4gIHJldHVybiBzY29wZS5fX2xvY2FsZUlkX187XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbGVPYmplY3QobG9jYWxlU3BlYykge1xuICBpZiAodHlwZW9mIGxvY2FsZVNwZWMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBUcmVhdCBpdCBhcyBhIGxvY2FsZSBuYW1lIHJlZ2lzdGVyZWQgYnkgcmVnaXN0ZXJMb2NhbGVcbiAgICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuICAgIHJldHVybiBzY29wZS5fX2xvY2FsZURhdGFfXyA/IHNjb3BlLl9fbG9jYWxlRGF0YV9fW2xvY2FsZVNwZWNdIDogbnVsbDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUcmVhdCBpdCBhcyBhIHJhdyBkYXRlLWZucyBsb2NhbGUgb2JqZWN0XG4gICAgcmV0dXJuIGxvY2FsZVNwZWM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZShkYXRlLCBmb3JtYXRGdW5jLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdEZ1bmMoZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVcIiwgbG9jYWxlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrZGF5TWluSW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZShkYXRlLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoSW5Mb2NhbGUobW9udGgsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShzZXRNb250aChuZXdEYXRlKCksIG1vbnRoKSwgXCJMTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aFNob3J0SW5Mb2NhbGUobW9udGgsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShzZXRNb250aChuZXdEYXRlKCksIG1vbnRoKSwgXCJMTExcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlKHF1YXJ0ZXIsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShzZXRRdWFydGVyKG5ld0RhdGUoKSwgcXVhcnRlciksIFwiUVFRXCIsIGxvY2FsZSk7XG59XG5cbi8vICoqIFV0aWxzIGZvciBzb21lIGNvbXBvbmVudHMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5RGlzYWJsZWQoXG4gIGRheSxcbiAge1xuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZSxcbiAgICBleGNsdWRlRGF0ZXMsXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHMsXG4gICAgaW5jbHVkZURhdGVzLFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGZpbHRlckRhdGUsXG4gIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZURheShkYXksIGV4Y2x1ZGVEYXRlLmRhdGUgPyBleGNsdWRlRGF0ZS5kYXRlIDogZXhjbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoZXhjbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgICBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pLFxuICAgICAgKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PiBpc1NhbWVEYXkoZGF5LCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZUludGVydmFscyAmJlxuICAgICAgIWluY2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgICBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pLFxuICAgICAgKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKGRheSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheUV4Y2x1ZGVkKFxuICBkYXksXG4gIHsgZXhjbHVkZURhdGVzLCBleGNsdWRlRGF0ZUludGVydmFscyB9ID0ge30sXG4pIHtcbiAgaWYgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gZXhjbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIChcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZURheShkYXksIGV4Y2x1ZGVEYXRlLmRhdGUgPyBleGNsdWRlRGF0ZS5kYXRlIDogZXhjbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb250aERpc2FibGVkKFxuICBtb250aCxcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKG1vbnRoLCB7XG4gICAgICBtaW5EYXRlOiBzdGFydE9mTW9udGgobWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiBlbmRPZk1vbnRoKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVNb250aChtb250aCwgZXhjbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PiBpc1NhbWVNb250aChtb250aCwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKG1vbnRoKSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgbSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZU1vbnRoID0gZ2V0TW9udGgoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVllYXIgPSBnZXRZZWFyKGVuZERhdGUpO1xuICBjb25zdCBlbmREYXRlTW9udGggPSBnZXRNb250aChlbmREYXRlKTtcbiAgY29uc3QgZGF5WWVhciA9IGdldFllYXIoZGF5KTtcbiAgaWYgKHN0YXJ0RGF0ZVllYXIgPT09IGVuZERhdGVZZWFyICYmIHN0YXJ0RGF0ZVllYXIgPT09IGRheVllYXIpIHtcbiAgICByZXR1cm4gc3RhcnREYXRlTW9udGggPD0gbSAmJiBtIDw9IGVuZERhdGVNb250aDtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlTW9udGggPD0gbSkgfHxcbiAgICAgIChkYXlZZWFyID09PSBlbmREYXRlWWVhciAmJiBlbmREYXRlTW9udGggPj0gbSkgfHxcbiAgICAgIChkYXlZZWFyIDwgZW5kRGF0ZVllYXIgJiYgZGF5WWVhciA+IHN0YXJ0RGF0ZVllYXIpXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNRdWFydGVyRGlzYWJsZWQoXG4gIHF1YXJ0ZXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhxdWFydGVyLCB7IG1pbkRhdGUsIG1heERhdGUgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZVF1YXJ0ZXIocXVhcnRlciwgZXhjbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGluY2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShxdWFydGVyKSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0geWVhclxuICogQHBhcmFtIHtEYXRlfSBzdGFydFxuICogQHBhcmFtIHtEYXRlfSBlbmRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFySW5SYW5nZSh5ZWFyLCBzdGFydCwgZW5kKSB7XG4gIGlmICghaXNWYWxpZERhdGUoc3RhcnQpIHx8ICFpc1ZhbGlkRGF0ZShlbmQpKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHN0YXJ0WWVhciA9IGdldFllYXIoc3RhcnQpO1xuICBjb25zdCBlbmRZZWFyID0gZ2V0WWVhcihlbmQpO1xuXG4gIHJldHVybiBzdGFydFllYXIgPD0geWVhciAmJiBlbmRZZWFyID49IHllYXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJEaXNhYmxlZChcbiAgeWVhcixcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHllYXIsIDAsIDEpO1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMoZGF0ZSwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZlllYXIobWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiBlbmRPZlllYXIobWF4RGF0ZSksXG4gICAgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+IGlzU2FtZVllYXIoZGF0ZSwgZXhjbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXRlKSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBlbmREYXRlLCBxLCBkYXkpIHtcbiAgY29uc3Qgc3RhcnREYXRlWWVhciA9IGdldFllYXIoc3RhcnREYXRlKTtcbiAgY29uc3Qgc3RhcnREYXRlUXVhcnRlciA9IGdldFF1YXJ0ZXIoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVllYXIgPSBnZXRZZWFyKGVuZERhdGUpO1xuICBjb25zdCBlbmREYXRlUXVhcnRlciA9IGdldFF1YXJ0ZXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZVF1YXJ0ZXIgPD0gcSAmJiBxIDw9IGVuZERhdGVRdWFydGVyO1xuICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZVllYXIgPCBlbmREYXRlWWVhcikge1xuICAgIHJldHVybiAoXG4gICAgICAoZGF5WWVhciA9PT0gc3RhcnREYXRlWWVhciAmJiBzdGFydERhdGVRdWFydGVyIDw9IHEpIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZVF1YXJ0ZXIgPj0gcSkgfHxcbiAgICAgIChkYXlZZWFyIDwgZW5kRGF0ZVllYXIgJiYgZGF5WWVhciA+IHN0YXJ0RGF0ZVllYXIpXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPdXRPZkJvdW5kcyhkYXksIHsgbWluRGF0ZSwgbWF4RGF0ZSB9ID0ge30pIHtcbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF5LCBtaW5EYXRlKSA8IDApIHx8XG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWF4RGF0ZSkgPiAwKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lSW5MaXN0KHRpbWUsIHRpbWVzKSB7XG4gIHJldHVybiB0aW1lcy5zb21lKFxuICAgIChsaXN0VGltZSkgPT5cbiAgICAgIGdldEhvdXJzKGxpc3RUaW1lKSA9PT0gZ2V0SG91cnModGltZSkgJiZcbiAgICAgIGdldE1pbnV0ZXMobGlzdFRpbWUpID09PSBnZXRNaW51dGVzKHRpbWUpLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lRGlzYWJsZWQoXG4gIHRpbWUsXG4gIHsgZXhjbHVkZVRpbWVzLCBpbmNsdWRlVGltZXMsIGZpbHRlclRpbWUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVUaW1lcyAmJiBpc1RpbWVJbkxpc3QodGltZSwgZXhjbHVkZVRpbWVzKSkgfHxcbiAgICAoaW5jbHVkZVRpbWVzICYmICFpc1RpbWVJbkxpc3QodGltZSwgaW5jbHVkZVRpbWVzKSkgfHxcbiAgICAoZmlsdGVyVGltZSAmJiAhZmlsdGVyVGltZSh0aW1lKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHsgbWluVGltZSwgbWF4VGltZSB9KSB7XG4gIGlmICghbWluVGltZSB8fCAhbWF4VGltZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJvdGggbWluVGltZSBhbmQgbWF4VGltZSBwcm9wcyByZXF1aXJlZFwiKTtcbiAgfVxuICBjb25zdCBiYXNlID0gbmV3RGF0ZSgpO1xuICBjb25zdCBiYXNlVGltZSA9IHNldEhvdXJzKHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyh0aW1lKSksIGdldEhvdXJzKHRpbWUpKTtcbiAgY29uc3QgbWluID0gc2V0SG91cnMoXG4gICAgc2V0TWludXRlcyhiYXNlLCBnZXRNaW51dGVzKG1pblRpbWUpKSxcbiAgICBnZXRIb3VycyhtaW5UaW1lKSxcbiAgKTtcbiAgY29uc3QgbWF4ID0gc2V0SG91cnMoXG4gICAgc2V0TWludXRlcyhiYXNlLCBnZXRNaW51dGVzKG1heFRpbWUpKSxcbiAgICBnZXRIb3VycyhtYXhUaW1lKSxcbiAgKTtcblxuICBsZXQgdmFsaWQ7XG4gIHRyeSB7XG4gICAgdmFsaWQgPSAhaXNXaXRoaW5JbnRlcnZhbChiYXNlVGltZSwgeyBzdGFydDogbWluLCBlbmQ6IG1heCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzTW9udGggPSBzdWJNb250aHMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhtaW5EYXRlLCBwcmV2aW91c01vbnRoKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMoaW5jbHVkZURhdGUsIHByZXZpb3VzTW9udGgpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbnRoRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0TW9udGggPSBhZGRNb250aHMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhuZXh0TW9udGgsIG1heERhdGUpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhckRpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IHN1YlllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhtaW5EYXRlLCBwcmV2aW91c1llYXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1llYXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJzRGlzYWJsZWRCZWZvcmUoXG4gIGRheSxcbiAgeyBtaW5EYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgcHJldmlvdXNZZWFyID0gZ2V0U3RhcnRPZlllYXIoc3ViWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcikpO1xuICBjb25zdCB7IGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QocHJldmlvdXNZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1pbkRhdGVZZWFyID0gbWluRGF0ZSAmJiBnZXRZZWFyKG1pbkRhdGUpO1xuICByZXR1cm4gKG1pbkRhdGVZZWFyICYmIG1pbkRhdGVZZWFyID4gZW5kUGVyaW9kKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobmV4dFllYXIsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQWZ0ZXIoXG4gIGRheSxcbiAgeyBtYXhEYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgbmV4dFllYXIgPSBhZGRZZWFycyhkYXksIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QobmV4dFllYXIsIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgbWF4RGF0ZVllYXIgPSBtYXhEYXRlICYmIGdldFllYXIobWF4RGF0ZSk7XG4gIHJldHVybiAobWF4RGF0ZVllYXIgJiYgbWF4RGF0ZVllYXIgPCBzdGFydFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNaW5EYXRlKHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtaW5EYXRlKSB7XG4gICAgbGV0IG1pbkRhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtaW5EYXRlKSA+PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1pbihtaW5EYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1pbihpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNYXhEYXRlKHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtYXhEYXRlKSB7XG4gICAgbGV0IG1heERhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtYXhEYXRlKSA8PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1heChtYXhEYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1heChpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaWdodExpZ2h0RGF5c01hcChcbiAgaGlnaGxpZ2h0RGF0ZXMgPSBbXSxcbiAgZGVmYXVsdENsYXNzTmFtZSA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiLFxuKSB7XG4gIGNvbnN0IGRhdGVDbGFzc2VzID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGlnaGxpZ2h0RGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBvYmogPSBoaWdobGlnaHREYXRlc1tpXTtcbiAgICBpZiAoaXNEYXRlKG9iaikpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUob2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoZGVmYXVsdENsYXNzTmFtZSkpIHtcbiAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGRlZmF1bHRDbGFzc05hbWUpO1xuICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0ga2V5c1swXTtcbiAgICAgIGNvbnN0IGFyck9mRGF0ZXMgPSBvYmpba2V5c1swXV07XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhcnJPZkRhdGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuID0gYXJyT2ZEYXRlcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoYXJyT2ZEYXRlc1trXSwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXNBcnIgPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG4vKipcbiAqIENvbXBhcmUgdGhlIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSwgaWYgdGhlIHBhc3NlZCBhcnJheSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlzQXJlRXF1YWwoYXJyYXkxLCBhcnJheTIpIHtcbiAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyYXkxLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBhcnJheTJbaW5kZXhdKTtcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIGN1c3RvbSBjbGFzcyB0byBlYWNoIGRhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGlkYXlEYXRlcyBhcnJheSBvZiBvYmplY3QgY29udGFpbmluZyBkYXRlIGFuZCBuYW1lIG9mIHRoZSBob2xpZGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NuYW1lIHRvIGJlIGFkZGVkLlxuICogQHJldHVybnMge01hcH0gTWFwIGNvbnRhaW5pbmcgZGF0ZSBhcyBrZXkgYW5kIGFycmF5IG9mIGNsYXNzbmFtZSBhbmQgaG9saWRheSBuYW1lIGFzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb2xpZGF5c01hcChcbiAgaG9saWRheURhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taG9saWRheXNcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgaG9saWRheURhdGVzLmZvckVhY2goKGhvbGlkYXkpID0+IHtcbiAgICBjb25zdCB7IGRhdGU6IGRhdGVPYmosIGhvbGlkYXlOYW1lIH0gPSBob2xpZGF5O1xuICAgIGlmICghaXNEYXRlKGRhdGVPYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gZm9ybWF0RGF0ZShkYXRlT2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgY2xhc3NOYW1lc09iaiA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IHt9O1xuICAgIGlmIChcbiAgICAgIFwiY2xhc3NOYW1lXCIgaW4gY2xhc3NOYW1lc09iaiAmJlxuICAgICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9PT0gZGVmYXVsdENsYXNzTmFtZSAmJlxuICAgICAgYXJyYXlzQXJlRXF1YWwoY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSwgW2hvbGlkYXlOYW1lXSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGFzc05hbWVzT2JqW1wiY2xhc3NOYW1lXCJdID0gZGVmYXVsdENsYXNzTmFtZTtcbiAgICBjb25zdCBob2xpZGF5TmFtZUFyciA9IGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl07XG4gICAgY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSA9IGhvbGlkYXlOYW1lQXJyXG4gICAgICA/IFsuLi5ob2xpZGF5TmFtZUFyciwgaG9saWRheU5hbWVdXG4gICAgICA6IFtob2xpZGF5TmFtZV07XG4gICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc09iaik7XG4gIH0pO1xuICByZXR1cm4gZGF0ZUNsYXNzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gIHN0YXJ0T2ZEYXksXG4gIGN1cnJlbnRUaW1lLFxuICBjdXJyZW50TXVsdGlwbGllcixcbiAgaW50ZXJ2YWxzLFxuICBpbmplY3RlZFRpbWVzLFxuKSB7XG4gIGNvbnN0IGwgPSBpbmplY3RlZFRpbWVzLmxlbmd0aDtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBpbmplY3RlZFRpbWUgPSBhZGRNaW51dGVzKFxuICAgICAgYWRkSG91cnMoc3RhcnRPZkRheSwgZ2V0SG91cnMoaW5qZWN0ZWRUaW1lc1tpXSkpLFxuICAgICAgZ2V0TWludXRlcyhpbmplY3RlZFRpbWVzW2ldKSxcbiAgICApO1xuICAgIGNvbnN0IG5leHRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIHN0YXJ0T2ZEYXksXG4gICAgICAoY3VycmVudE11bHRpcGxpZXIgKyAxKSAqIGludGVydmFscyxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgaXNBZnRlcihpbmplY3RlZFRpbWUsIGN1cnJlbnRUaW1lKSAmJlxuICAgICAgaXNCZWZvcmUoaW5qZWN0ZWRUaW1lLCBuZXh0VGltZSlcbiAgICApIHtcbiAgICAgIHRpbWVzLnB1c2goaW5qZWN0ZWRUaW1lc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRpbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWmVybyhpKSB7XG4gIHJldHVybiBpIDwgMTAgPyBgMCR7aX1gIDogYCR7aX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WWVhcnNQZXJpb2QoXG4gIGRhdGUsXG4gIHllYXJJdGVtTnVtYmVyID0gREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuKSB7XG4gIGNvbnN0IGVuZFBlcmlvZCA9IE1hdGguY2VpbChnZXRZZWFyKGRhdGUpIC8geWVhckl0ZW1OdW1iZXIpICogeWVhckl0ZW1OdW1iZXI7XG4gIGNvbnN0IHN0YXJ0UGVyaW9kID0gZW5kUGVyaW9kIC0gKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gIHJldHVybiB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzSW5EYXkoZCkge1xuICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKTtcbiAgY29uc3Qgc3RhcnRPZlRoZU5leHREYXkgPSBuZXcgRGF0ZShcbiAgICBkLmdldEZ1bGxZZWFyKCksXG4gICAgZC5nZXRNb250aCgpLFxuICAgIGQuZ2V0RGF0ZSgpLFxuICAgIDI0LFxuICApO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKCgrc3RhcnRPZlRoZU5leHREYXkgLSArc3RhcnRPZkRheSkgLyAzXzYwMF8wMDApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIHRoZSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlXG4gKlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL3N0YXJ0T2ZNaW51dGVgXG4gKiBkbyBub3QgbWFrZSBjaGFuZ2VzIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1xuICpcbiAqIFNlZSBjb21tZW50cyBvbiBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL3B1bGwvNDI0NFxuICogZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gc3RhcnQgb2YgdGhlIG1pbnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZk1pbnV0ZShkKSB7XG4gIGNvbnN0IHNlY29uZHMgPSBkLmdldFNlY29uZHMoKTtcbiAgY29uc3QgbWlsbGlzZWNvbmRzID0gZC5nZXRNaWxsaXNlY29uZHMoKTtcblxuICByZXR1cm4gdG9EYXRlKGQuZ2V0VGltZSgpIC0gc2Vjb25kcyAqIDEwMDAgLSBtaWxsaXNlY29uZHMpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIG1pbnV0ZVxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9pc1NhbWVNaW51dGVgXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkMVxuICogQHBhcmFtIHtEYXRlfSBkMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNaW51dGUoZDEsIGQyKSB7XG4gIHJldHVybiBzdGFydE9mTWludXRlKGQxKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZNaW51dGUoZDIpLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmVkIGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lICgwMDowMDowMClcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgZm9yIHdoaWNoIG1pZG5pZ2h0IHRpbWUgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtEYXRlfSBBIG5ldyBkYXRldGltZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlkbmlnaHREYXRlKGRhdGUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGVcIik7XG4gIH1cblxuICBjb25zdCBkYXRlV2l0aG91dFRpbWUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgZGF0ZVdpdGhvdXRUaW1lLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZVdpdGhvdXRUaW1lO1xufVxuXG4vKipcbiAqIElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSBUaGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUaGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKlxuICogTm90ZTpcbiAqICBUaGlzIGZ1bmN0aW9uIGNvbnNpZGVycyB0aGUgbWlkLW5pZ2h0IG9mIHRoZSBnaXZlbiBkYXRlcyBmb3IgY29tcGFyaXNvbi5cbiAqICBJdCBldmFsdWF0ZXMgd2hldGhlciBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlIGJhc2VkIG9uIHRoZWlyIG1pZC1uaWdodCB0aW1lc3RhbXBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlQmVmb3JlKGRhdGUsIGRhdGVUb0NvbXBhcmUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkgfHwgIWlzRGF0ZShkYXRlVG9Db21wYXJlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSByZWNlaXZlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlKTtcbiAgY29uc3QgbWlkbmlnaHREYXRlVG9Db21wYXJlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGVUb0NvbXBhcmUpO1xuXG4gIHJldHVybiBpc0JlZm9yZShtaWRuaWdodERhdGUsIG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NwYWNlS2V5RG93bihldmVudCkge1xuICBjb25zdCBTUEFDRV9LRVkgPSBcIiBcIjtcbiAgcmV0dXJuIGV2ZW50LmtleSA9PT0gU1BBQ0VfS0VZO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVllYXJzKHllYXIsIG5vT2ZZZWFyLCBtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogbm9PZlllYXIgKyAxOyBpKyspIHtcbiAgICBjb25zdCBuZXdZZWFyID0geWVhciArIG5vT2ZZZWFyIC0gaTtcbiAgICBsZXQgaXNJblJhbmdlID0gdHJ1ZTtcblxuICAgIGlmIChtaW5EYXRlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1pbkRhdGUpIDw9IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGUgJiYgaXNJblJhbmdlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1heERhdGUpID49IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKGlzSW5SYW5nZSkge1xuICAgICAgbGlzdC5wdXNoKG5ld1llYXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IHllYXJEcm9wZG93bkl0ZW1OdW1iZXIsIHNjcm9sbGFibGVZZWFyRHJvcGRvd24gfSA9IHByb3BzO1xuICAgIGNvbnN0IG5vT2ZZZWFyID1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXIgfHwgKHNjcm9sbGFibGVZZWFyRHJvcGRvd24gPyAxMCA6IDUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHllYXJzTGlzdDogZ2VuZXJhdGVZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy55ZWFyLFxuICAgICAgICBub09mWWVhcixcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gICAgdGhpcy5kcm9wZG93blJlZiA9IGNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZHJvcGRvd25DdXJyZW50ID0gdGhpcy5kcm9wZG93blJlZi5jdXJyZW50O1xuXG4gICAgaWYgKGRyb3Bkb3duQ3VycmVudCkge1xuICAgICAgLy8gR2V0IGFycmF5IGZyb20gSFRNTENvbGxlY3Rpb25cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuID0gZHJvcGRvd25DdXJyZW50LmNoaWxkcmVuXG4gICAgICAgID8gQXJyYXkuZnJvbShkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW4pXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkWWVhck9wdGlvbkVsID0gZHJvcGRvd25DdXJyZW50Q2hpbGRyZW5cbiAgICAgICAgPyBkcm9wZG93bkN1cnJlbnRDaGlsZHJlbi5maW5kKChjaGlsZEVsKSA9PiBjaGlsZEVsLmFyaWFTZWxlY3RlZClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBkcm9wZG93bkN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWRZZWFyT3B0aW9uRWxcbiAgICAgICAgPyBzZWxlY3RlZFllYXJPcHRpb25FbC5vZmZzZXRUb3AgK1xuICAgICAgICAgIChzZWxlY3RlZFllYXJPcHRpb25FbC5jbGllbnRIZWlnaHQgLSBkcm9wZG93bkN1cnJlbnQuY2xpZW50SGVpZ2h0KSAvIDJcbiAgICAgICAgOiAoZHJvcGRvd25DdXJyZW50LnNjcm9sbEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMjtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IHRoaXMucHJvcHMueWVhcjtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKCh5ZWFyKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgc2VsZWN0ZWRZZWFyID09PSB5ZWFyXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkX3llYXJcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e3llYXJ9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB5ZWFyKX1cbiAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWRZZWFyID09PSB5ZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHtzZWxlY3RlZFllYXIgPT09IHllYXIgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge3llYXJ9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcblxuICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLnByb3BzLm1pbkRhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWluRGF0ZSkgOiBudWxsO1xuICAgIGNvbnN0IG1heFllYXIgPSB0aGlzLnByb3BzLm1heERhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWF4RGF0ZSkgOiBudWxsO1xuXG4gICAgaWYgKCFtYXhZZWFyIHx8ICF0aGlzLnN0YXRlLnllYXJzTGlzdC5maW5kKCh5ZWFyKSA9PiB5ZWFyID09PSBtYXhZZWFyKSkge1xuICAgICAgb3B0aW9ucy51bnNoaWZ0KFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICAgIGtleT17XCJ1cGNvbWluZ1wifVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaW5jcmVtZW50WWVhcnN9XG4gICAgICAgID5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzLXVwY29taW5nXCIgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIW1pblllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1pblllYXIpKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInByZXZpb3VzXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5kZWNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtcHJldmlvdXNcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgc2hpZnRZZWFycyA9IChhbW91bnQpID0+IHtcbiAgICBjb25zdCB5ZWFycyA9IHRoaXMuc3RhdGUueWVhcnNMaXN0Lm1hcChmdW5jdGlvbiAoeWVhcikge1xuICAgICAgcmV0dXJuIHllYXIgKyBhbW91bnQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHllYXJzTGlzdDogeWVhcnMsXG4gICAgfSk7XG4gIH07XG5cbiAgaW5jcmVtZW50WWVhcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRZZWFycygxKTtcbiAgfTtcblxuICBkZWNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKC0xKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30gcmVmPXt0aGlzLmRyb3Bkb3duUmVmfT5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4veWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IDE5MDA7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IDIxMDA7XG5cbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IG1pblllYXI7IGkgPD0gbWF4WWVhcjsgaSsrKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17aX0+XG4gICAgICAgICAge2l9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQteWVhclwiPlxuICAgICAgICB7dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgeWVhcj17dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKHllYXIgPT09IHRoaXMucHJvcHMueWVhcikgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnByb3BzLmRhdGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSwgZXZlbnQpID0+IHtcbiAgICB0aGlzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB0aGlzLnNldE9wZW4oKTtcbiAgfTtcblxuICBvblNlbGVjdCA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0T3BlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG1vbnRoTmFtZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoaSkgPT4gdGhpcy5wcm9wcy5tb250aCA9PT0gaTtcblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1vbnRoTmFtZXMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGkpXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGhcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvblwiXG4gICAgICAgIH1cbiAgICAgICAga2V5PXttb250aH1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGkpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5pc1NlbGVjdGVkTW9udGgoaSkgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZFwiPuKckzwvc3Bhbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBcIlwiXG4gICAgICAgICl9XG4gICAgICAgIHttb250aH1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aERyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAobW9udGhOYW1lcykgPT5cbiAgICBtb250aE5hbWVzLm1hcCgoTSwgaSkgPT4gKFxuICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAge019XG4gICAgICA8L29wdGlvbj5cbiAgICApKTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKG1vbnRoTmFtZXMpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMobW9udGhOYW1lcyl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSwgbW9udGhOYW1lcykgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3XCJcbiAgICAgIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGhcIj5cbiAgICAgICAge21vbnRoTmFtZXNbdGhpcy5wcm9wcy5tb250aF19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgbW9udGhOYW1lcz17bW9udGhOYW1lc31cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKG1vbnRoTmFtZXMpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSwgbW9udGhOYW1lcyldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24obW9udGhOYW1lcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIGlmIChtb250aCAhPT0gdGhpcy5wcm9wcy5tb250aCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aCk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV0ubWFwKFxuICAgICAgdGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93blxuICAgICAgICA/IChNKSA9PiB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpXG4gICAgICAgIDogKE0pID0+IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpLFxuICAgICk7XG5cbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKG1vbnRoTmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgbmV3RGF0ZSxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVNb250aFllYXJzKG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtaW5EYXRlKTtcbiAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgobWF4RGF0ZSk7XG5cbiAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICBsaXN0LnB1c2gobmV3RGF0ZShjdXJyRGF0ZSkpO1xuXG4gICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtb250aFllYXJzTGlzdDogZ2VuZXJhdGVNb250aFllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubW9udGhZZWFyc0xpc3QubWFwKChtb250aFllYXIpID0+IHtcbiAgICAgIGNvbnN0IG1vbnRoWWVhclBvaW50ID0gZ2V0VGltZShtb250aFllYXIpO1xuICAgICAgY29uc3QgaXNTYW1lTW9udGhZZWFyID1cbiAgICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcikgJiZcbiAgICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBtb250aFllYXIpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgIGlzU2FtZU1vbnRoWWVhclxuICAgICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkX21vbnRoLXllYXJcIlxuICAgICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb25cIlxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e21vbnRoWWVhclBvaW50fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBtb250aFllYXJQb2ludCl9XG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTYW1lTW9udGhZZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNTYW1lTW9udGhZZWFyID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgIOKck1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShtb250aFllYXIsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoWWVhcik7XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfT57dGhpcy5yZW5kZXJPcHRpb25zKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9uc1wiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuaW1wb3J0IHtcbiAgYWRkTW9udGhzLFxuICBmb3JtYXREYXRlLFxuICBnZXRTdGFydE9mTW9udGgsXG4gIGlzQWZ0ZXIsXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBuZXdEYXRlLFxuICBnZXRUaW1lLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbnZhciBXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhZZWFyRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJvcGRvd25WaXNpYmxlOiBmYWxzZSxcbiAgfTtcblxuICByZW5kZXJTZWxlY3RPcHRpb25zID0gKCkgPT4ge1xuICAgIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgIGNvbnN0IGxhc3REYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICAgIGNvbnN0IHRpbWVQb2ludCA9IGdldFRpbWUoY3VyckRhdGUpO1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17dGltZVBvaW50fSB2YWx1ZT17dGltZVBvaW50fT5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShjdXJyRGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG5cbiAgICAgIGN1cnJEYXRlID0gYWRkTW9udGhzKGN1cnJEYXRlLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICBvblNlbGVjdENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0TW9kZSA9ICgpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17Z2V0VGltZShnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXRlKSl9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4ge1xuICAgIGNvbnN0IHllYXJNb250aCA9IGZvcm1hdERhdGUoXG4gICAgICB0aGlzLnByb3BzLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PVwicmVhZFwiXG4gICAgICAgIHN0eWxlPXt7IHZpc2liaWxpdHk6IHZpc2libGUgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXdcIlxuICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aC15ZWFyXCI+XG4gICAgICAgICAge3llYXJNb250aH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEcm9wZG93biA9ICgpID0+IChcbiAgICA8V3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyUG9pbnQpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICBjb25zdCBjaGFuZ2VkRGF0ZSA9IG5ld0RhdGUocGFyc2VJbnQobW9udGhZZWFyUG9pbnQpKTtcblxuICAgIGlmIChcbiAgICAgIGlzU2FtZVllYXIodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSkgJiZcbiAgICAgIGlzU2FtZU1vbnRoKHRoaXMucHJvcHMuZGF0ZSwgY2hhbmdlZERhdGUpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHtcbiAgZ2V0RGF5LFxuICBnZXRNb250aCxcbiAgZ2V0RGF0ZSxcbiAgbmV3RGF0ZSxcbiAgaXNTYW1lRGF5LFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUV4Y2x1ZGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGlzRXF1YWwsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBnZXREYXlPZldlZWtDb2RlLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZm9ybWF0RGF0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbk1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KHByZXZQcm9wcyk7XG4gIH1cblxuICBkYXlFbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VFbnRlcihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9IChvdGhlcikgPT4gaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF5LCBvdGhlcik7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTZWxlY3RlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+IHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpKVxuICAgICAgOiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcblxuICAgIHJldHVybiAhaXNTZWxlY3RlZERhdGUgJiYgdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICB9O1xuXG4gIGlzRGlzYWJsZWQgPSAoKSA9PiBpc0RheURpc2FibGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKCkgPT4gaXNEYXlFeGNsdWRlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNTdGFydE9mV2VlayA9ICgpID0+XG4gICAgaXNTYW1lRGF5KFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lV2VlayA9IChvdGhlcikgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgaXNTYW1lRGF5KFxuICAgICAgb3RoZXIsXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lRGF5T3JXZWVrID0gKG90aGVyKSA9PiB0aGlzLmlzU2FtZURheShvdGhlcikgfHwgdGhpcy5pc1NhbWVXZWVrKG90aGVyKTtcblxuICBnZXRIaWdoTGlnaHRlZENsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBoaWdobGlnaHREYXRlcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7J2RheSBzdHJpbmcsICdjbGFzc05hbWUnfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgcmV0dXJuIGhpZ2hsaWdodERhdGVzLmdldChkYXlTdHIpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJldHVybiB0aGUgYXJyYXkgY29udGFpbmluZyBjbGFzc25hbWUgYXNzb2NpYXRlZCB0byB0aGUgZGF0ZVxuICBnZXRIb2xpZGF5c0NsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhvbGlkYXlzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2Yge2RheSBzdHJpbmc6IHtjbGFzc05hbWUsIGhvbGlkYXlOYW1lfX1cbiAgICBpZiAoaG9saWRheXMuaGFzKGRheVN0cikpIHtcbiAgICAgIHJldHVybiBbaG9saWRheXMuZ2V0KGRheVN0cikuY2xhc3NOYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblJhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhc2VsZWN0aW5nRGF0ZSB8fFxuICAgICAgKCFzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSAmJiB0aGlzLmlzRGlzYWJsZWQoKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzU3RhcnQgJiZcbiAgICAgIGVuZERhdGUgJiZcbiAgICAgIChpc0JlZm9yZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNFbmQgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzUmFuZ2UgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgIWVuZERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShzdGFydERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoZW5kRGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1dlZWtlbmQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla2RheSA9IGdldERheSh0aGlzLnByb3BzLmRheSk7XG4gICAgcmV0dXJuIHdlZWtkYXkgPT09IDAgfHwgd2Vla2RheSA9PT0gNjtcbiAgfTtcblxuICBpc0FmdGVyTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKHRoaXMucHJvcHMubW9udGggKyAxKSAlIDEyID09PSBnZXRNb250aCh0aGlzLnByb3BzLmRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQmVmb3JlTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KSArIDEpICUgMTIgPT09IHRoaXMucHJvcHMubW9udGhcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudERheSA9ICgpID0+IHRoaXMuaXNTYW1lRGF5KG5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+XG4gICAgICAgIHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lXG4gICAgICA/IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lKGRhdGUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIsXG4gICAgICBkYXlDbGFzc05hbWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tXCIgKyBnZXREYXlPZldlZWtDb2RlKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWRpc2FibGVkXCI6IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZXhjbHVkZWRcIjogdGhpcy5pc0V4Y2x1ZGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXNlbGVjdGluZy1yYW5nZVwiOiB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50RGF5KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS13ZWVrZW5kXCI6IHRoaXMuaXNXZWVrZW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1vdXRzaWRlLW1vbnRoXCI6XG4gICAgICAgICAgdGhpcy5pc0FmdGVyTW9udGgoKSB8fCB0aGlzLmlzQmVmb3JlTW9udGgoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmdldEhpZ2hMaWdodGVkQ2xhc3MoXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhpZ2hsaWdodGVkXCIpLFxuICAgICAgdGhpcy5nZXRIb2xpZGF5c0NsYXNzKCksXG4gICAgKTtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQgPSBcIkNob29zZVwiLFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKCkgfHwgdGhpcy5pc0V4Y2x1ZGVkKClcbiAgICAgICAgPyBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWRcbiAgICAgICAgOiBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7Zm9ybWF0RGF0ZShkYXksIFwiUFBQUFwiLCB0aGlzLnByb3BzLmxvY2FsZSl9YDtcbiAgfTtcblxuICAvLyBBIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgaG9saWRheSdzIG5hbWUgYXMgdGl0bGUncyBjb250ZW50XG4gIGdldFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyA9IG5ldyBNYXAoKSwgZXhjbHVkZURhdGVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbXBhcmVEdCA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgdGl0bGVzID0gW107XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhjb21wYXJlRHQpKSB7XG4gICAgICB0aXRsZXMucHVzaCguLi5ob2xpZGF5cy5nZXQoY29tcGFyZUR0KS5ob2xpZGF5TmFtZXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0V4Y2x1ZGVkKCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKFxuICAgICAgICBleGNsdWRlRGF0ZXNcbiAgICAgICAgICA/LmZpbHRlcigoZXhjbHVkZURhdGUpID0+XG4gICAgICAgICAgICBpc1NhbWVEYXkoZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSwgZGF5KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLm1hcCgoZXhjbHVkZURhdGUpID0+IGV4Y2x1ZGVEYXRlLm1lc3NhZ2UpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlcy5qb2luKFwiLCBcIik7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAoc2VsZWN0ZWQsIHByZVNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gc2VsZWN0ZWQgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZDtcbiAgICBjb25zdCBwcmVTZWxlY3Rpb25EYXkgPSBwcmVTZWxlY3Rpb24gfHwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIShcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgICAgICAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlciB8fCAhdGhpcy5pc1N0YXJ0T2ZXZWVrKCkpXG4gICAgICApICYmXG4gICAgICAodGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSB8fFxuICAgICAgICAodGhpcy5pc1NhbWVEYXkoc2VsZWN0ZWREYXkpICYmXG4gICAgICAgICAgaXNTYW1lRGF5KHByZVNlbGVjdGlvbkRheSwgc2VsZWN0ZWREYXkpKSlcbiAgICAgICAgPyAwXG4gICAgICAgIDogLTE7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIGRheVxuICAvLyBmb2N1cyB0aGUgZGF5IG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNEYXkgPSAocHJldlByb3BzID0ge30pID0+IHtcbiAgICBsZXQgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgdGhpcy5pc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGUgYWN0aXZlRWxlbWVudCBpcyBpbiB0aGUgY29udGFpbmVyLCBhbmQgaXQgaXMgYW5vdGhlciBpbnN0YW5jZSBvZiBEYXlcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIpXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy9kYXkgaXMgb25lIG9mIHRoZSBub24gcmVuZGVyZWQgZHVwbGljYXRlIGRheXNcbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c0RheSAmJiB0aGlzLmRheUVsLmN1cnJlbnQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW5kZXJEYXlDb250ZW50cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzXG4gICAgICA/IHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHMoZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSksIHRoaXMucHJvcHMuZGF5KVxuICAgICAgOiBnZXREYXRlKHRoaXMucHJvcHMuZGF5KTtcbiAgfTtcblxuICByZW5kZXIgPSAoKSA9PiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt0aGlzLmRheUVsfVxuICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXModGhpcy5wcm9wcy5kYXkpfVxuICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbCgpfVxuICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICB0aXRsZT17dGhpcy5nZXRUaXRsZSgpfVxuICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc0Rpc2FibGVkKCl9XG4gICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50RGF5KCkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZCgpIHx8IHRoaXMuaXNJblJhbmdlKCl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyRGF5Q29udGVudHMoKX1cbiAgICAgIHt0aGlzLmdldFRpdGxlKCkgIT09IFwiXCIgJiYgKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvdmVybGF5XCI+e3RoaXMuZ2V0VGl0bGUoKX08L3NwYW4+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWtOdW1iZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJpYUxhYmVsUHJlZml4OiBcIndlZWsgXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2Vla051bWJlcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudCkgfSksXG4gICAgXSksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c1dlZWtOdW1iZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcihwcmV2UHJvcHMpO1xuICB9XG5cbiAgd2Vla051bWJlckVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIGdldFRhYkluZGV4ID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlciAmJlxuICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAoaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCB0aGlzLnByb3BzLnNlbGVjdGVkKSkpXG4gICAgICA/IDBcbiAgICAgIDogLTE7XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIHdlZWstbnVtYmVyXG4gIC8vIGZvY3VzIHRoZSB3ZWVrLW51bWJlciBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzV2Vla051bWJlciA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIFdlZWtOdW1iZXJcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHdlZWtOdW1iZXIsIGFyaWFMYWJlbFByZWZpeCA9IFwid2VlayBcIiwgb25DbGljayB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tY2xpY2thYmxlXCI6ICEhb25DbGljayxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLXNlbGVjdGVkXCI6XG4gICAgICAgICEhb25DbGljayAmJiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3RoaXMud2Vla051bWJlckVsfVxuICAgICAgICBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHthcmlhTGFiZWxQcmVmaXh9ICR7dGhpcy5wcm9wcy53ZWVrTnVtYmVyfWB9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICA+XG4gICAgICAgIHt3ZWVrTnVtYmVyfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IERheSBmcm9tIFwiLi9kYXlcIjtcbmltcG9ydCBXZWVrTnVtYmVyIGZyb20gXCIuL3dlZWtfbnVtYmVyXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuaW1wb3J0IHsgYWRkRGF5cywgZ2V0V2VlaywgZ2V0U3RhcnRPZldlZWssIGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VlayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgIH07XG4gIH1cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlV2Vla0NsaWNrID0gKGRheSwgd2Vla051bWJlciwgZXZlbnQpID0+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25XZWVrU2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0KGRheSwgd2Vla051bWJlciwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgdGhpcy5oYW5kbGVEYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0V2Vla051bWJlciA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcihkYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFdlZWsoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyRGF5cyA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IHRoaXMuc3RhcnRPZldlZWsoKTtcbiAgICBjb25zdCBkYXlzID0gW107XG4gICAgY29uc3Qgd2Vla051bWJlciA9IHRoaXMuZm9ybWF0V2Vla051bWJlcihzdGFydE9mV2Vlayk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2tBY3Rpb24gPVxuICAgICAgICB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICAgICAgPyB0aGlzLmhhbmRsZVdlZWtDbGljay5iaW5kKHRoaXMsIHN0YXJ0T2ZXZWVrLCB3ZWVrTnVtYmVyKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgZGF5cy5wdXNoKFxuICAgICAgICA8V2Vla051bWJlclxuICAgICAgICAgIGtleT1cIldcIlxuICAgICAgICAgIHdlZWtOdW1iZXI9e3dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGF0ZT17c3RhcnRPZldlZWt9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja0FjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5hcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAvPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxEYXlcbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkPXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGtleT17ZGF5LnZhbHVlT2YoKX1cbiAgICAgICAgICAgIGRheT17ZGF5fVxuICAgICAgICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlci5iaW5kKHRoaXMsIGRheSl9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBzdGFydE9mV2VlayA9ICgpID0+XG4gICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT5cbiAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICFpc1NhbWVEYXkodGhpcy5zdGFydE9mV2VlaygpLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgIGlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtcIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay0tc2VsZWN0ZWRcIjogaXNTYW1lRGF5KFxuICAgICAgICB0aGlzLnN0YXJ0T2ZXZWVrKCksXG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICApLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1rZXlib2FyZC1zZWxlY3RlZFwiOiB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbHN4KHdlZWtOdW1iZXJDbGFzc2VzKX0+e3RoaXMucmVuZGVyRGF5cygpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgV2VlayBmcm9tIFwiLi93ZWVrXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IEZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UID0gNjtcblxuY29uc3QgTU9OVEhfQ09MVU1OU19MQVlPVVQgPSB7XG4gIFRXT19DT0xVTU5TOiBcInR3b19jb2x1bW5zXCIsXG4gIFRIUkVFX0NPTFVNTlM6IFwidGhyZWVfY29sdW1uc1wiLFxuICBGT1VSX0NPTFVNTlM6IFwiZm91cl9jb2x1bW5zXCIsXG59O1xuY29uc3QgTU9OVEhfQ09MVU1OUyA9IHtcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULlRXT19DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxXSxcbiAgICAgIFsyLCAzXSxcbiAgICAgIFs0LCA1XSxcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs4LCA5XSxcbiAgICAgIFsxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAyLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVEhSRUVfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMl0sXG4gICAgICBbMywgNCwgNV0sXG4gICAgICBbNiwgNywgOF0sXG4gICAgICBbOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogMyxcbiAgfSxcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMiwgM10sXG4gICAgICBbNCwgNSwgNiwgN10sXG4gICAgICBbOCwgOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogNCxcbiAgfSxcbn07XG5jb25zdCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUID0gMTtcblxuZnVuY3Rpb24gZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbikge1xuICBpZiAoc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5GT1VSX0NPTFVNTlM7XG4gIGlmIChzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyKSByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlM7XG4gIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9yZGVySW5EaXNwbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBNT05USF9SRUZTID0gWy4uLkFycmF5KDEyKV0ubWFwKCgpID0+IFJlYWN0LmNyZWF0ZVJlZigpKTtcbiAgUVVBUlRFUl9SRUZTID0gWy4uLkFycmF5KDQpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50LCB0aGlzLnByb3BzLm9yZGVySW5EaXNwbGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlU3RhcnRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlRW5kTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKHV0aWxzLnNldE1vbnRoKGRheSwgbSksIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8ICFzZWxlY3RpbmdEYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0ID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCA9IChtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNXZWVrSW5Nb250aCA9IChzdGFydE9mV2VlaykgPT4ge1xuICAgIGNvbnN0IGRheSA9IHRoaXMucHJvcHMuZGF5O1xuICAgIGNvbnN0IGVuZE9mV2VlayA9IHV0aWxzLmFkZERheXMoc3RhcnRPZldlZWssIDYpO1xuICAgIHJldHVybiAoXG4gICAgICB1dGlscy5pc1NhbWVNb250aChzdGFydE9mV2VlaywgZGF5KSB8fCB1dGlscy5pc1NhbWVNb250aChlbmRPZldlZWssIGRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudE1vbnRoID0gKGRheSwgbSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIG0gPT09IHV0aWxzLmdldE1vbnRoKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNDdXJyZW50UXVhcnRlciA9IChkYXksIHEpID0+XG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHV0aWxzLm5ld0RhdGUoKSkgJiZcbiAgICBxID09PSB1dGlscy5nZXRRdWFydGVyKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZE1vbnRoID0gKGRheSwgbSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0TW9udGgoc2VsZWN0ZWQpID09PSBtICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICBpc1NlbGVjdGVkUXVhcnRlciA9IChkYXksIHEsIHNlbGVjdGVkKSA9PlxuICAgIHV0aWxzLmdldFF1YXJ0ZXIoZGF5KSA9PT0gcSAmJlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcihzZWxlY3RlZCk7XG5cbiAgcmVuZGVyV2Vla3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla3MgPSBbXTtcbiAgICB2YXIgaXNGaXhlZEhlaWdodCA9IHRoaXMucHJvcHMuZml4ZWRIZWlnaHQ7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IGZhbHNlO1xuICAgIGxldCBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICB1dGlscy5nZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXkpLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkO1xuXG4gICAgY29uc3QgcHJlU2VsZWN0aW9uID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgd2Vla3MucHVzaChcbiAgICAgICAgPFdlZWtcbiAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBkYXk9e2N1cnJlbnRXZWVrU3RhcnR9XG4gICAgICAgICAgbW9udGg9e3V0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMuZGF5KX1cbiAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgcHJlU2VsZWN0aW9uPXtwcmVTZWxlY3Rpb259XG4gICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgLz4sXG4gICAgICApO1xuXG4gICAgICBpZiAoYnJlYWtBZnRlck5leHRQdXNoKSBicmVhaztcblxuICAgICAgaSsrO1xuICAgICAgY3VycmVudFdlZWtTdGFydCA9IHV0aWxzLmFkZFdlZWtzKGN1cnJlbnRXZWVrU3RhcnQsIDEpO1xuXG4gICAgICAvLyBJZiBvbmUgb2YgdGhlc2UgY29uZGl0aW9ucyBpcyB0cnVlLCB3ZSB3aWxsIGVpdGhlciBicmVhayBvbiB0aGlzIHdlZWtcbiAgICAgIC8vIG9yIGJyZWFrIG9uIHRoZSBuZXh0IHdlZWtcbiAgICAgIGNvbnN0IGlzRml4ZWRBbmRGaW5hbFdlZWsgPVxuICAgICAgICBpc0ZpeGVkSGVpZ2h0ICYmIGkgPj0gRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQ7XG4gICAgICBjb25zdCBpc05vbkZpeGVkQW5kT3V0T2ZNb250aCA9XG4gICAgICAgICFpc0ZpeGVkSGVpZ2h0ICYmICF0aGlzLmlzV2Vla0luTW9udGgoY3VycmVudFdlZWtTdGFydCk7XG5cbiAgICAgIGlmIChpc0ZpeGVkQW5kRmluYWxXZWVrIHx8IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBlZWtOZXh0TW9udGgpIHtcbiAgICAgICAgICBicmVha0FmdGVyTmV4dFB1c2ggPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlZWtzO1xuICB9O1xuXG4gIG9uTW9udGhDbGljayA9IChlLCBtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlDbGljayh1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25Nb250aE1vdXNlRW50ZXIgPSAobSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKHRoaXMucHJvcHMuZGF5LCBtKTtcblxuICAgIGlmICh1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhOYXZpZ2F0aW9uID0gKG5ld01vbnRoLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLk1PTlRIX1JFRlNbbmV3TW9udGhdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIG9uTW9udGhLZXlEb3duID0gKGV2ZW50LCBtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24sXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzZXRQcmVTZWxlY3Rpb24sXG4gICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgIT09IFwiVGFiXCIpIHtcbiAgICAgIC8vIHByZXZlbnREZWZhdWx0IG9uIHRhYiBldmVudCBibG9ja3MgZm9jdXMgY2hhbmdlXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBtb250aENvbHVtbnNMYXlvdXQgPSBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0ID1cbiAgICAgICAgTU9OVEhfQ09MVU1OU1ttb250aENvbHVtbnNMYXlvdXRdLnZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDtcbiAgICAgIGNvbnN0IG1vbnRoc0dyaWQgPSBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0uZ3JpZDtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vbk1vbnRoQ2xpY2soZXZlbnQsIG1vbnRoKTtcbiAgICAgICAgICBzZXRQcmVTZWxlY3Rpb24oc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDExID8gMCA6IG1vbnRoICsgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG1vbnRoID09PSAwID8gMTEgOiBtb250aCAtIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGZpcnN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFswXS5pbmNsdWRlcyhtb250aClcbiAgICAgICAgICAgICAgPyBtb250aCArIDEyIC0gdmVydGljYWxPZmZzZXRcbiAgICAgICAgICAgICAgOiBtb250aCAtIHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgdXRpbHMuc3ViTW9udGhzKHByZVNlbGVjdGlvbiwgdmVydGljYWxPZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1vbnRoIG9uIHRoZSBsYXN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFttb250aHNHcmlkLmxlbmd0aCAtIDFdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoIC0gMTIgKyB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoICsgdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5hZGRNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbk1vbnRoS2V5RG93biAmJiBoYW5kbGVPbk1vbnRoS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgb25RdWFydGVyQ2xpY2sgPSAoZSwgcSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZRdWFydGVyKGxhYmVsRGF0ZSksIGUpO1xuICB9O1xuXG4gIG9uUXVhcnRlck1vdXNlRW50ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlUXVhcnRlck5hdmlnYXRpb24gPSAobmV3UXVhcnRlciwgbmV3RGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG4gICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuUVVBUlRFUl9SRUZTW25ld1F1YXJ0ZXIgLSAxXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25RdWFydGVyS2V5RG93biA9IChldmVudCwgcXVhcnRlcikgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2ZW50LCBxdWFydGVyKTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gNCA/IDEgOiBxdWFydGVyICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVRdWFydGVyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHF1YXJ0ZXIgPT09IDEgPyA0IDogcXVhcnRlciAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJRdWFydGVycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZ2V0TW9udGhDbGFzc05hbWVzID0gKG0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIG1vbnRoQ2xhc3NOYW1lLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aENsYXNzTmFtZSA9IG1vbnRoQ2xhc3NOYW1lXG4gICAgICA/IG1vbnRoQ2xhc3NOYW1lKHV0aWxzLnNldE1vbnRoKGRheSwgbSkpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtJHttfWAsXG4gICAgICBfbW9udGhDbGFzc05hbWUsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMpICYmXG4gICAgICAgICAgdXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkTW9udGgoXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIG0sXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzTW9udGhJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIG0sXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0TW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZE1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChtKSA9PiB7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWRNb250aCA9IHV0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBtID09PSBwcmVTZWxlY3RlZE1vbnRoXG4gICAgICAgID8gXCIwXCJcbiAgICAgICAgOiBcIi0xXCI7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgZ2V0UXVhcnRlclRhYkluZGV4ID0gKHEpID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBxID09PSBwcmVTZWxlY3RlZFF1YXJ0ZXJcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAobW9udGgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXggPSBcIkNob29zZVwiLFxuICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXggPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICAgIGRheSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbW9udGgpO1xuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQobGFiZWxEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobGFiZWxEYXRlKVxuICAgICAgICA/IGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4XG4gICAgICAgIDogY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4O1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHt1dGlscy5mb3JtYXREYXRlKGxhYmVsRGF0ZSwgXCJNTU1NIHl5eXlcIil9YDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ2xhc3NOYW1lcyA9IChxKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci0ke3F9YCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZCh1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgcSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHByZVNlbGVjdGlvbiksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1yYW5nZVwiOiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIHEsXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzUmFuZ2VTdGFydFF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kUXVhcnRlcihxKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRNb250aENvbnRlbnQgPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd0Z1bGxNb250aFllYXJQaWNrZXIsIHJlbmRlck1vbnRoQ29udGVudCwgbG9jYWxlLCBkYXkgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0TW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhTaG9ydEluTG9jYWxlKG0sIGxvY2FsZSk7XG4gICAgY29uc3QgZnVsbE1vbnRoVGV4dCA9IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBpZiAocmVuZGVyTW9udGhDb250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTW9udGhDb250ZW50KG0sIHNob3J0TW9udGhUZXh0LCBmdWxsTW9udGhUZXh0LCBkYXkpO1xuICAgIH1cbiAgICByZXR1cm4gc2hvd0Z1bGxNb250aFllYXJQaWNrZXIgPyBmdWxsTW9udGhUZXh0IDogc2hvcnRNb250aFRleHQ7XG4gIH07XG5cbiAgZ2V0UXVhcnRlckNvbnRlbnQgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgcmVuZGVyUXVhcnRlckNvbnRlbnQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG9ydFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxLCBsb2NhbGUpO1xuICAgIHJldHVybiByZW5kZXJRdWFydGVyQ29udGVudFxuICAgICAgPyByZW5kZXJRdWFydGVyQ29udGVudChxLCBzaG9ydFF1YXJ0ZXIpXG4gICAgICA6IHNob3J0UXVhcnRlcjtcbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgc2VsZWN0ZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtb250aENvbHVtbnMgPVxuICAgICAgTU9OVEhfQ09MVU1OU1tcbiAgICAgICAgZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIClcbiAgICAgIF0uZ3JpZDtcbiAgICByZXR1cm4gbW9udGhDb2x1bW5zLm1hcCgobW9udGgsIGkpID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtd3JhcHBlclwiIGtleT17aX0+XG4gICAgICAgIHttb250aC5tYXAoKG0sIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3RoaXMuTU9OVEhfUkVGU1ttXX1cbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoS2V5RG93bihldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uTW9udGhNb3VzZUVudGVyKG0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgobSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0TW9udGhDbGFzc05hbWVzKG0pfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbChtKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChkYXksIG0sIHNlbGVjdGVkKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRNb250aENvbnRlbnQobSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyUXVhcnRlcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdGVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHF1YXJ0ZXJzID0gWzEsIDIsIDMsIDRdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItd3JhcHBlclwiPlxuICAgICAgICB7cXVhcnRlcnMubWFwKChxLCBqKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgcmVmPXt0aGlzLlFVQVJURVJfUkVGU1tqXX1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXYsIHEpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyS2V5RG93bihldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vblF1YXJ0ZXJNb3VzZUVudGVyKHEpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRRdWFydGVyQ2xhc3NOYW1lcyhxKX1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoZGF5LCBxLCBzZWxlY3RlZCl9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRRdWFydGVyVGFiSW5kZXgocSl9XG4gICAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50UXVhcnRlcihkYXksIHEpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuZ2V0UXVhcnRlckNvbnRlbnQocSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBnZXRDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGluZ0RhdGUsXG4gICAgICBzZWxlY3RzU3RhcnQsXG4gICAgICBzZWxlY3RzRW5kLFxuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIHNob3dXZWVrUGlja2VyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoXCIsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kKSxcbiAgICAgIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhQaWNrZXJcIjogc2hvd01vbnRoWWVhclBpY2tlciB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXJQaWNrZXJcIjogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1BpY2tlclwiOiBzaG93V2Vla1BpY2tlciB9LFxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXggPSBcIk1vbnRoIFwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4ID0gYXJpYUxhYmVsUHJlZml4XG4gICAgICA/IGFyaWFMYWJlbFByZWZpeC50cmltKCkgKyBcIiBcIlxuICAgICAgOiBcIlwiO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHtmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXh9JHt1dGlscy5mb3JtYXREYXRlKGRheSwgXCJNTU1NLCB5eXl5XCIpfWB9XG4gICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgID5cbiAgICAgICAge3Nob3dNb250aFllYXJQaWNrZXJcbiAgICAgICAgICA/IHRoaXMucmVuZGVyTW9udGhzKClcbiAgICAgICAgICA6IHNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgICAgPyB0aGlzLnJlbmRlclF1YXJ0ZXJzKClcbiAgICAgICAgICAgIDogdGhpcy5yZW5kZXJXZWVrcygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHtcbiAgZ2V0SG91cnMsXG4gIGdldE1pbnV0ZXMsXG4gIG5ld0RhdGUsXG4gIGdldFN0YXJ0T2ZEYXksXG4gIGFkZE1pbnV0ZXMsXG4gIGZvcm1hdERhdGUsXG4gIGlzVGltZUluRGlzYWJsZWRSYW5nZSxcbiAgaXNUaW1lRGlzYWJsZWQsXG4gIHRpbWVzVG9JbmplY3RBZnRlcixcbiAgZ2V0SG91cnNJbkRheSxcbiAgaXNTYW1lTWludXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJ2YWxzOiAzMCxcbiAgICAgIG9uVGltZUNoYW5nZTogKCkgPT4ge30sXG4gICAgICB0b2RheUJ1dHRvbjogbnVsbCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNhbGNDZW50ZXJQb3NpdGlvbiA9IChsaXN0SGVpZ2h0LCBjZW50ZXJMaVJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICBjZW50ZXJMaVJlZi5vZmZzZXRUb3AgLSAobGlzdEhlaWdodCAvIDIgLSBjZW50ZXJMaVJlZi5jbGllbnRIZWlnaHQgLyAyKVxuICAgICk7XG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1vbnRoUmVmOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGhlaWdodDogbnVsbCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBjb2RlIHRvIGVuc3VyZSBzZWxlY3RlZCB0aW1lIHdpbGwgYWx3YXlzIGJlIGluIGZvY3VzIHdpdGhpbiB0aW1lIHdpbmRvdyB3aGVuIGl0IGZpcnN0IGFwcGVhcnNcbiAgICB0aGlzLnNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lKCk7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhSZWYgJiYgdGhpcy5oZWFkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMubW9udGhSZWYuY2xpZW50SGVpZ2h0IC0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUgPSAoKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5saXN0KSByZXR1cm47XG5cbiAgICAgIHRoaXMubGlzdC5zY3JvbGxUb3AgPVxuICAgICAgICB0aGlzLmNlbnRlckxpICYmXG4gICAgICAgIFRpbWUuY2FsY0NlbnRlclBvc2l0aW9uKFxuICAgICAgICAgIHRoaXMucHJvcHMubW9udGhSZWZcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5saXN0LmNsaWVudEhlaWdodCxcbiAgICAgICAgICB0aGlzLmNlbnRlckxpLFxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrID0gKHRpbWUpID0+IHtcbiAgICBpZiAoXG4gICAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICAgIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB0aGlzLnByb3BzKSkgfHxcbiAgICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJUaW1lKSAmJlxuICAgICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aW1lKTtcbiAgfTtcblxuICBpc1NlbGVjdGVkVGltZSA9ICh0aW1lKSA9PlxuICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiYgaXNTYW1lTWludXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRpbWUpO1xuXG4gIGlzRGlzYWJsZWRUaW1lID0gKHRpbWUpID0+XG4gICAgKCh0aGlzLnByb3BzLm1pblRpbWUgfHwgdGhpcy5wcm9wcy5tYXhUaW1lKSAmJlxuICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuaW5jbHVkZVRpbWVzIHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSk7XG5cbiAgbGlDbGFzc2VzID0gKHRpbWUpID0+IHtcbiAgICBsZXQgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW1cIixcbiAgICAgIHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSA/IHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSh0aW1lKSA6IHVuZGVmaW5lZCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWRpc2FibGVkXCIpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzICYmXG4gICAgICAoZ2V0SG91cnModGltZSkgKiA2MCArIGdldE1pbnV0ZXModGltZSkpICUgdGhpcy5wcm9wcy5pbnRlcnZhbHMgIT09IDBcbiAgICApIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1pbmplY3RlZFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKFwiIFwiKTtcbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQsIHRpbWUpID0+IHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmtleSA9IFwiRW50ZXJcIjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoZXZlbnQua2V5ID09PSBcIkFycm93VXBcIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dMZWZ0XCIpICYmXG4gICAgICBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZy5mb2N1cygpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpICYmXG4gICAgICBldmVudC50YXJnZXQubmV4dFNpYmxpbmdcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC50YXJnZXQubmV4dFNpYmxpbmcuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2xpY2sodGltZSk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICByZW5kZXJUaW1lcyA9ICgpID0+IHtcbiAgICBsZXQgdGltZXMgPSBbXTtcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLnByb3BzLmZvcm1hdCA/IHRoaXMucHJvcHMuZm9ybWF0IDogXCJwXCI7XG4gICAgY29uc3QgaW50ZXJ2YWxzID0gdGhpcy5wcm9wcy5pbnRlcnZhbHM7XG5cbiAgICBjb25zdCBhY3RpdmVEYXRlID1cbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgfHwgdGhpcy5wcm9wcy5vcGVuVG9EYXRlIHx8IG5ld0RhdGUoKTtcblxuICAgIGNvbnN0IGJhc2UgPSBnZXRTdGFydE9mRGF5KGFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IHNvcnRlZEluamVjdFRpbWVzID1cbiAgICAgIHRoaXMucHJvcHMuaW5qZWN0VGltZXMgJiZcbiAgICAgIHRoaXMucHJvcHMuaW5qZWN0VGltZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IG1pbnV0ZXNJbkRheSA9IDYwICogZ2V0SG91cnNJbkRheShhY3RpdmVEYXRlKTtcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gbWludXRlc0luRGF5IC8gaW50ZXJ2YWxzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdWx0aXBsaWVyOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gYWRkTWludXRlcyhiYXNlLCBpICogaW50ZXJ2YWxzKTtcbiAgICAgIHRpbWVzLnB1c2goY3VycmVudFRpbWUpO1xuXG4gICAgICBpZiAoc29ydGVkSW5qZWN0VGltZXMpIHtcbiAgICAgICAgY29uc3QgdGltZXNUb0luamVjdCA9IHRpbWVzVG9JbmplY3RBZnRlcihcbiAgICAgICAgICBiYXNlLFxuICAgICAgICAgIGN1cnJlbnRUaW1lLFxuICAgICAgICAgIGksXG4gICAgICAgICAgaW50ZXJ2YWxzLFxuICAgICAgICAgIHNvcnRlZEluamVjdFRpbWVzLFxuICAgICAgICApO1xuICAgICAgICB0aW1lcyA9IHRpbWVzLmNvbmNhdCh0aW1lc1RvSW5qZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgd2hpY2ggdGltZSB0byBmb2N1cyBhbmQgc2Nyb2xsIGludG8gdmlldyB3aGVuIGNvbXBvbmVudCBtb3VudHNcbiAgICBjb25zdCB0aW1lVG9Gb2N1cyA9IHRpbWVzLnJlZHVjZSgocHJldiwgdGltZSkgPT4ge1xuICAgICAgaWYgKHRpbWUuZ2V0VGltZSgpIDw9IGFjdGl2ZURhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgdGltZXNbMF0pO1xuXG4gICAgcmV0dXJuIHRpbWVzLm1hcCgodGltZSwgaSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGxpXG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB0aW1lKX1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMubGlDbGFzc2VzKHRpbWUpfVxuICAgICAgICAgIHJlZj17KGxpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGltZSA9PT0gdGltZVRvRm9jdXMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jZW50ZXJMaSA9IGxpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT25LZXlEb3duKGV2LCB0aW1lKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRhYkluZGV4PXt0aW1lID09PSB0aW1lVG9Gb2N1cyA/IDAgOiAtMX1cbiAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRUaW1lKHRpbWUpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc0Rpc2FibGVkVGltZSh0aW1lKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAge2Zvcm1hdERhdGUodGltZSwgZm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvbGk+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGhlaWdodCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtY29udGFpbmVyICR7XG4gICAgICAgICAgdGhpcy5wcm9wcy50b2RheUJ1dHRvblxuICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtY29udGFpbmVyLS13aXRoLXRvZGF5LWJ1dHRvblwiXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS10aW1lICR7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS10aW1lLS1vbmx5XCJcbiAgICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgICAgfWB9XG4gICAgICAgICAgcmVmPXsoaGVhZGVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2hlYWRlclwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtYm94XCI+XG4gICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0XCJcbiAgICAgICAgICAgICAgcmVmPXsobGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHN0eWxlPXtoZWlnaHQgPyB7IGhlaWdodCB9IDoge319XG4gICAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZXMoKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgZ2V0WWVhciwgbmV3RGF0ZSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGVhclNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldFByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgWUVBUl9SRUZTID0gWy4uLkFycmF5KHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIpXS5tYXAoKCkgPT5cbiAgICBSZWFjdC5jcmVhdGVSZWYoKSxcbiAgKTtcblxuICBpc0Rpc2FibGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RGlzYWJsZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNFeGNsdWRlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheUV4Y2x1ZGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIHNlbGVjdGluZ0RhdGUgPSAoKSA9PiB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgdXBkYXRlRm9jdXNPblBhZ2luYXRlID0gKHJlZkluZGV4KSA9PiB7XG4gICAgY29uc3Qgd2FpdEZvclJlUmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5ZRUFSX1JFRlNbcmVmSW5kZXhdLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdhaXRGb3JSZVJlbmRlcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVllYXJOYXZpZ2F0aW9uID0gKG5ld1llYXIsIG5ld0RhdGUpID0+IHtcbiAgICBjb25zdCB7IGRhdGUsIHllYXJJdGVtTnVtYmVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKGRhdGUsIHllYXJJdGVtTnVtYmVyKTtcblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG5cbiAgICBpZiAobmV3WWVhciAtIHN0YXJ0UGVyaW9kID09PSAtMSkge1xuICAgICAgdGhpcy51cGRhdGVGb2N1c09uUGFnaW5hdGUoeWVhckl0ZW1OdW1iZXIgLSAxKTtcbiAgICB9IGVsc2UgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA9PT0geWVhckl0ZW1OdW1iZXIpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKDApO1xuICAgIH0gZWxzZSB0aGlzLllFQVJfUkVGU1tuZXdZZWFyIC0gc3RhcnRQZXJpb2RdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBpc1NhbWVEYXkgPSAoeSwgb3RoZXIpID0+IHV0aWxzLmlzU2FtZURheSh5LCBvdGhlcik7XG5cbiAgaXNDdXJyZW50WWVhciA9ICh5KSA9PiB5ID09PSBnZXRZZWFyKG5ld0RhdGUoKSk7XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5zdGFydERhdGUpO1xuXG4gIGlzUmFuZ2VFbmQgPSAoeSkgPT5cbiAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSAmJlxuICAgIHRoaXMucHJvcHMuZW5kRGF0ZSAmJlxuICAgIHV0aWxzLmlzU2FtZVllYXIodXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5SYW5nZSA9ICh5KSA9PlxuICAgIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5wcm9wcy5zdGFydERhdGUsIHRoaXMucHJvcHMuZW5kRGF0ZSk7XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKHkpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhdGhpcy5zZWxlY3RpbmdEYXRlKClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCB0aGlzLnNlbGVjdGluZ0RhdGUoKSwgZW5kRGF0ZSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzUmFuZ2UgJiYgc3RhcnREYXRlICYmICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCBzdGFydERhdGUsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX3llYXIgPSB1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSk7XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlRW5kID0gKHkpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBlbmREYXRlLCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX3llYXIgPSB1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSk7XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoeSkgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSB1dGlscy5nZXRTdGFydE9mWWVhcih1dGlscy5zZXRZZWFyKHRoaXMucHJvcHMuZGF0ZSwgeSkpO1xuICAgIHJldHVybiAoXG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgIXRoaXMucHJvcHMuaW5saW5lICYmXG4gICAgICAhdXRpbHMuaXNTYW1lRGF5KGRhdGUsIHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHRoaXMucHJvcHMuc2VsZWN0ZWQpKSAmJlxuICAgICAgdXRpbHMuaXNTYW1lRGF5KGRhdGUsIHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKSlcbiAgICApO1xuICB9O1xuXG4gIG9uWWVhckNsaWNrID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGRhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5oYW5kbGVZZWFyQ2xpY2sodXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcihkYXRlLCB5KSksIGUpO1xuICB9O1xuXG4gIG9uWWVhcktleURvd24gPSAoZSwgeSkgPT4ge1xuICAgIGNvbnN0IHsga2V5IH0gPSBlO1xuICAgIGNvbnN0IHsgaGFuZGxlT25LZXlEb3duIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGUsIHkpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5ICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHkgLSAxLFxuICAgICAgICAgICAgdXRpbHMuc3ViWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT25LZXlEb3duICYmIGhhbmRsZU9uS2V5RG93bihlKTtcbiAgfTtcblxuICBnZXRZZWFyQ2xhc3NOYW1lcyA9ICh5KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0ZSxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBleGNsdWRlRGF0ZXMsXG4gICAgICBpbmNsdWRlRGF0ZXMsXG4gICAgICBmaWx0ZXJEYXRlLFxuICAgICAgeWVhckNsYXNzTmFtZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX195ZWFyLSR7eX1gLFxuICAgICAgeWVhckNsYXNzTmFtZSA/IHllYXJDbGFzc05hbWUodXRpbHMuc2V0WWVhcihkYXRlLCB5KSkgOiB1bmRlZmluZWQsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RlZFwiOiB5ID09PSBnZXRZZWFyKHNlbGVjdGVkKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSB8fCBleGNsdWRlRGF0ZXMgfHwgaW5jbHVkZURhdGVzIHx8IGZpbHRlckRhdGUpICYmXG4gICAgICAgICAgdXRpbHMuaXNZZWFyRGlzYWJsZWQoeSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZVN0YXJ0KHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZUVuZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50WWVhcih5KSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRZZWFyVGFiSW5kZXggPSAoeSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSByZXR1cm4gXCItMVwiO1xuICAgIGNvbnN0IHByZVNlbGVjdGVkID0gdXRpbHMuZ2V0WWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgICByZXR1cm4geSA9PT0gcHJlU2VsZWN0ZWQgPyBcIjBcIiA6IFwiLTFcIjtcbiAgfTtcblxuICBnZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGluZ0RhdGUsIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xzeChcInJlYWN0LWRhdGVwaWNrZXJfX3llYXJcIiwge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSxcbiAgICB9KTtcbiAgfTtcblxuICBnZXRZZWFyQ29udGVudCA9ICh5KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnQgPyB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50KHkpIDogeTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeWVhcnNMaXN0ID0gW107XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciwgb25ZZWFyTW91c2VFbnRlciwgb25ZZWFyTW91c2VMZWF2ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChcbiAgICAgIGRhdGUsXG4gICAgICB5ZWFySXRlbU51bWJlcixcbiAgICApO1xuXG4gICAgZm9yIChsZXQgeSA9IHN0YXJ0UGVyaW9kOyB5IDw9IGVuZFBlcmlvZDsgeSsrKSB7XG4gICAgICB5ZWFyc0xpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17dGhpcy5ZRUFSX1JFRlNbeSAtIHN0YXJ0UGVyaW9kXX1cbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25ZZWFyQ2xpY2soZXYsIHkpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1NwYWNlS2V5RG93bihldikpIHtcbiAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uWWVhcktleURvd24oZXYsIHkpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0WWVhclRhYkluZGV4KHkpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ2xhc3NOYW1lcyh5KX1cbiAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUVudGVyKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VMZWF2ZShldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17eX1cbiAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50WWVhcih5KSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMuZ2V0WWVhckNvbnRlbnQoeSl9XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldFllYXJDb250YWluZXJDbGFzc05hbWVzKCl9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci13cmFwcGVyXCJcbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNsZWFyU2VsZWN0aW5nRGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5ZWFyc0xpc3R9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbnB1dFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB0aW1lU3RyaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGltZTogdGhpcy5wcm9wcy50aW1lU3RyaW5nLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgIGlmIChwcm9wcy50aW1lU3RyaW5nICE9PSBzdGF0ZS50aW1lKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aW1lOiBwcm9wcy50aW1lU3RyaW5nLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gbnVsbCB0byBpbmRpY2F0ZSBubyBjaGFuZ2UgdG8gc3RhdGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvblRpbWVDaGFuZ2UgPSAodGltZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0aW1lIH0pO1xuXG4gICAgY29uc3QgeyBkYXRlOiBwcm9wRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc1Byb3BEYXRlVmFsaWQgPSBwcm9wRGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKHByb3BEYXRlKTtcbiAgICBjb25zdCBkYXRlID0gaXNQcm9wRGF0ZVZhbGlkID8gcHJvcERhdGUgOiBuZXcgRGF0ZSgpO1xuXG4gICAgZGF0ZS5zZXRIb3Vycyh0aW1lLnNwbGl0KFwiOlwiKVswXSk7XG4gICAgZGF0ZS5zZXRNaW51dGVzKHRpbWUuc3BsaXQoXCI6XCIpWzFdKTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyVGltZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdGltZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRhdGUsIHRpbWVTdHJpbmcsIGN1c3RvbVRpbWVJbnB1dCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChjdXN0b21UaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tVGltZUlucHV0LCB7XG4gICAgICAgIGRhdGUsXG4gICAgICAgIHZhbHVlOiB0aW1lLFxuICAgICAgICBvbkNoYW5nZTogdGhpcy5vblRpbWVDaGFuZ2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0aW1lXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVGltZVwiXG4gICAgICAgIG5hbWU9XCJ0aW1lLWlucHV0XCJcbiAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgdmFsdWU9e3RpbWV9XG4gICAgICAgIG9uQ2hhbmdlPXsoZXYpID0+IHtcbiAgICAgICAgICB0aGlzLm9uVGltZUNoYW5nZShldi50YXJnZXQudmFsdWUgfHwgdGltZVN0cmluZyk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2lucHV0LXRpbWUtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19jYXB0aW9uXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0XCI+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lSW5wdXQoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbGVuZGFyQ29udGFpbmVyKHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5ID0gZmFsc2UsXG4gIHNob3dUaW1lID0gZmFsc2UsXG4gIGNsYXNzTmFtZSxcbiAgY2hpbGRyZW4sXG59KSB7XG4gIGxldCBhcmlhTGFiZWwgPSBzaG93VGltZVNlbGVjdE9ubHlcbiAgICA/IFwiQ2hvb3NlIFRpbWVcIlxuICAgIDogYENob29zZSBEYXRlJHtzaG93VGltZSA/IFwiIGFuZCBUaW1lXCIgOiBcIlwifWA7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuQ2FsZW5kYXJDb250YWluZXIucHJvcFR5cGVzID0ge1xuICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICBzaG93VGltZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcbiIsImltcG9ydCBZZWFyRHJvcGRvd24gZnJvbSBcIi4veWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93biBmcm9tIFwiLi9tb250aF95ZWFyX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGggZnJvbSBcIi4vbW9udGhcIjtcbmltcG9ydCBUaW1lIGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCBZZWFyIGZyb20gXCIuL3llYXJcIjtcbmltcG9ydCBJbnB1dFRpbWUgZnJvbSBcIi4vaW5wdXRUaW1lXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBDYWxlbmRhckNvbnRhaW5lciBmcm9tIFwiLi9jYWxlbmRhcl9jb250YWluZXJcIjtcbmltcG9ydCB7XG4gIG5ld0RhdGUsXG4gIHNldE1vbnRoLFxuICBnZXRNb250aCxcbiAgYWRkTW9udGhzLFxuICBzdWJNb250aHMsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBnZXRTdGFydE9mVG9kYXksXG4gIGFkZERheXMsXG4gIGZvcm1hdERhdGUsXG4gIHNldFllYXIsXG4gIGdldFllYXIsXG4gIGlzQmVmb3JlLFxuICBhZGRZZWFycyxcbiAgc3ViWWVhcnMsXG4gIGlzQWZ0ZXIsXG4gIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZSxcbiAgZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlNaW5JbkxvY2FsZSxcbiAgaXNTYW1lRGF5LFxuICBpc1NhbWVNb250aCxcbiAgbW9udGhEaXNhYmxlZEJlZm9yZSxcbiAgbW9udGhEaXNhYmxlZEFmdGVyLFxuICB5ZWFyRGlzYWJsZWRCZWZvcmUsXG4gIHllYXJEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQWZ0ZXIsXG4gIHllYXJzRGlzYWJsZWRCZWZvcmUsXG4gIGdldEVmZmVjdGl2ZU1pbkRhdGUsXG4gIGdldEVmZmVjdGl2ZU1heERhdGUsXG4gIGFkZFplcm8sXG4gIGlzVmFsaWQsXG4gIGdldFllYXJzUGVyaW9kLFxuICBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gIGdldE1vbnRoSW5Mb2NhbGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUyA9IFtcbiAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiLFxuICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiLFxuICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItc2VsZWN0XCIsXG5dO1xuXG5jb25zdCBpc0Ryb3Bkb3duU2VsZWN0ID0gKGVsZW1lbnQgPSB7fSkgPT4ge1xuICBjb25zdCBjbGFzc05hbWVzID0gKGVsZW1lbnQuY2xhc3NOYW1lIHx8IFwiXCIpLnNwbGl0KC9cXHMrLyk7XG4gIHJldHVybiBEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTLnNvbWUoXG4gICAgKHRlc3RDbGFzc25hbWUpID0+IGNsYXNzTmFtZXMuaW5kZXhPZih0ZXN0Q2xhc3NuYW1lKSA+PSAwLFxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb25Ecm9wZG93bkZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIG1vbnRoc1Nob3duOiAxLFxuICAgICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIGN1c3RvbVRpbWVJbnB1dDogbnVsbCxcbiAgICAgIHllYXJJdGVtTnVtYmVyOiBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheV0pXG4gICAgICAuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdlZWtEYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoc1Nob3duOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1vbnRoU2VsZWN0ZWRJbjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DbGlja091dHNpZGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Nb250aENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRHJvcGRvd25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93VGltZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25UaW1lQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtaW5UaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhUaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJUaW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd01vbnRoRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dQcmV2aW91c01vbnRoczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcnM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlV2Vla2RheXNTaG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla0RheTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2l0aFBvcnRhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2Vla0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZW5kZXJDdXN0b21IZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93UG9wcGVyQXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25EYXlLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldFByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmNvbnRhaW5lclJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRhdGU6IHRoaXMuZ2V0RGF0ZUluVmlldygpLFxuICAgICAgc2VsZWN0aW5nRGF0ZTogbnVsbCxcbiAgICAgIG1vbnRoQ29udGFpbmVyOiBudWxsLFxuICAgICAgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBtb250aENvbnRhaW5lciBoZWlnaHQgaXMgbmVlZGVkIGluIHRpbWUgY29tcG9uZW50XG4gICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBoZWlnaHQgZm9yIHRoZSB1bCBpbiB0aGUgdGltZSBjb21wb25lbnRcbiAgICAvLyBzZXRTdGF0ZSBoZXJlIHNvIGhlaWdodCBpcyBnaXZlbiBhZnRlciBmaW5hbCBjb21wb25lbnRcbiAgICAvLyBsYXlvdXQgaXMgcmVuZGVyZWRcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5hc3NpZ25Nb250aENvbnRhaW5lciA9ICgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aENvbnRhaW5lcjogdGhpcy5tb250aENvbnRhaW5lciB9KTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uICYmXG4gICAgICAoIWlzU2FtZURheSh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgcHJldlByb3BzLnByZVNlbGVjdGlvbikgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5tb250aFNlbGVjdGVkSW4gIT09IHByZXZQcm9wcy5tb250aFNlbGVjdGVkSW4pXG4gICAgKSB7XG4gICAgICBjb25zdCBoYXNNb250aENoYW5nZWQgPSAhaXNTYW1lTW9udGgoXG4gICAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICApO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIGRhdGU6IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBoYXNNb250aENoYW5nZWQgJiYgdGhpcy5oYW5kbGVDdXN0b21Nb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5vcGVuVG9EYXRlICYmXG4gICAgICAhaXNTYW1lRGF5KHRoaXMucHJvcHMub3BlblRvRGF0ZSwgcHJldlByb3BzLm9wZW5Ub0RhdGUpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0ZTogdGhpcy5wcm9wcy5vcGVuVG9EYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrT3V0c2lkZShldmVudCk7XG4gIH07XG5cbiAgc2V0Q2xpY2tPdXRzaWRlUmVmID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50O1xuICB9O1xuXG4gIGhhbmRsZURyb3Bkb3duRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoaXNEcm9wZG93blNlbGVjdChldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRHJvcGRvd25Gb2N1cygpO1xuICAgIH1cbiAgfTtcblxuICBnZXREYXRlSW5WaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJlU2VsZWN0aW9uLCBzZWxlY3RlZCwgb3BlblRvRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtaW5EYXRlID0gZ2V0RWZmZWN0aXZlTWluRGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBtYXhEYXRlID0gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBjdXJyZW50ID0gbmV3RGF0ZSgpO1xuICAgIGNvbnN0IGluaXRpYWxEYXRlID0gb3BlblRvRGF0ZSB8fCBzZWxlY3RlZCB8fCBwcmVTZWxlY3Rpb247XG4gICAgaWYgKGluaXRpYWxEYXRlKSB7XG4gICAgICByZXR1cm4gaW5pdGlhbERhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtaW5EYXRlICYmIGlzQmVmb3JlKGN1cnJlbnQsIG1pbkRhdGUpKSB7XG4gICAgICAgIHJldHVybiBtaW5EYXRlO1xuICAgICAgfSBlbHNlIGlmIChtYXhEYXRlICYmIGlzQWZ0ZXIoY3VycmVudCwgbWF4RGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1heERhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9O1xuXG4gIGluY3JlYXNlTW9udGggPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogYWRkTW9udGhzKGRhdGUsIDEpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBkZWNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHN1Yk1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXksIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRheSk7XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogZGF5IH0pO1xuICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyICYmIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBudWxsIH0pO1xuICAgIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUgJiYgdGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZSgpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJNb3VzZUVudGVyID0gKGV2ZW50LCB5ZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IHNldFllYXIobmV3RGF0ZSgpLCB5ZWFyKSB9KTtcbiAgICAhIXRoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIoZXZlbnQsIHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJNb3VzZUxlYXZlID0gKGV2ZW50LCB5ZWFyKSA9PiB7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmUgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblllYXJDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKGRhdGUpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXRlKTtcbiAgfTtcblxuICBoYW5kbGVNb250aENoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgdGhpcy5oYW5kbGVDdXN0b21Nb250aENoYW5nZShkYXRlKTtcbiAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXRlKTtcbiAgfTtcblxuICBoYW5kbGVDdXN0b21Nb250aENoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb250aENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKGRhdGUpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb250aFllYXJDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZShkYXRlKTtcbiAgICB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKGRhdGUpO1xuICB9O1xuXG4gIGNoYW5nZVllYXIgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldFllYXIoZGF0ZSwgeWVhciksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2hhbmdlTW9udGggPSAobW9udGgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRNb250aChkYXRlLCBtb250aCksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoWWVhciA9IChtb250aFllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKHNldE1vbnRoKGRhdGUsIGdldE1vbnRoKG1vbnRoWWVhcikpLCBnZXRZZWFyKG1vbnRoWWVhcikpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgaGVhZGVyID0gKGRhdGUgPSB0aGlzLnN0YXRlLmRhdGUpID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgICBjb25zdCBkYXlOYW1lcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVycykge1xuICAgICAgZGF5TmFtZXMucHVzaChcbiAgICAgICAgPGRpdiBrZXk9XCJXXCIgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy53ZWVrTGFiZWwgfHwgXCIjXCJ9XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXlOYW1lcy5jb25jYXQoXG4gICAgICBbMCwgMSwgMiwgMywgNCwgNSwgNl0ubWFwKChvZmZzZXQpID0+IHtcbiAgICAgICAgY29uc3QgZGF5ID0gYWRkRGF5cyhzdGFydE9mV2Vlaywgb2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgd2Vla0RheU5hbWUgPSB0aGlzLmZvcm1hdFdlZWtkYXkoZGF5LCB0aGlzLnByb3BzLmxvY2FsZSk7XG5cbiAgICAgICAgY29uc3Qgd2Vla0RheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lKGRheSlcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17b2Zmc2V0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVcIiwgd2Vla0RheUNsYXNzTmFtZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3dlZWtEYXlOYW1lfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBmb3JtYXRXZWVrZGF5ID0gKGRheSwgbG9jYWxlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSkge1xuICAgICAgcmV0dXJuIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZShkYXksIHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSwgbG9jYWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydFxuICAgICAgPyBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZShkYXksIGxvY2FsZSlcbiAgICAgIDogZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRheSwgbG9jYWxlKTtcbiAgfTtcblxuICBkZWNyZWFzZVllYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViWWVhcnMoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyID8gdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlciA6IDEsXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2xlYXJTZWxlY3RpbmdEYXRlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBudWxsIH0pO1xuICB9O1xuXG4gIHJlbmRlclByZXZpb3VzQnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxQcmV2RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyc0Rpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxQcmV2RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91cy0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwsIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qge1xuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBwcmV2aW91c1llYXJBcmlhTGFiZWwgOiBwcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgaW5jcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZFllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck5leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbE5leHREYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHRcIixcbiAgICBdO1xuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10aW1lXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy50b2RheUJ1dHRvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10b2RheS1idXR0b25cIik7XG4gICAgfVxuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxOZXh0RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IG5leHRNb250aEJ1dHRvbkxhYmVsLCBuZXh0WWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0TW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0WWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IG5leHRZZWFyQXJpYUxhYmVsIDogbmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckN1cnJlbnRNb250aCA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGhcIl07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aERyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICB7Zm9ybWF0RGF0ZShkYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8WWVhckRyb3Bkb3duXG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9XG4gICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHllYXI9e2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aERyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRofVxuICAgICAgICBtb250aD17Z2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoWWVhckRyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVRvZGF5QnV0dG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZ2V0U3RhcnRPZlRvZGF5KCksIGUpO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGdldFN0YXJ0T2ZUb2RheSgpKTtcbiAgfTtcblxuICByZW5kZXJUb2RheUJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMudG9kYXlCdXR0b24gfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdG9kYXktYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlVG9kYXlCdXR0b25DbGljayhlKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRlZmF1bHRIZWFkZXIgPSAoeyBtb250aERhdGUsIGkgfSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciAke1xuICAgICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0XG4gICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0taGFzLXRpbWUtc2VsZWN0XCJcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlckN1cnJlbnRNb250aChtb250aERhdGUpfVxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24tLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aERyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aFllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckN1c3RvbUhlYWRlciA9IChoZWFkZXJBcmdzID0ge30pID0+IHtcbiAgICBjb25zdCB7IG1vbnRoRGF0ZSwgaSB9ID0gaGVhZGVyQXJncztcblxuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmICF0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgcHJldlllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHNob3dEYXlOYW1lcyA9XG4gICAgICAhdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tY3VzdG9tXCJcbiAgICAgICAgb25Gb2N1cz17dGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcih7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICBjdXN0b21IZWFkZXJDb3VudDogaSxcbiAgICAgICAgICBtb250aERhdGUsXG4gICAgICAgICAgY2hhbmdlTW9udGg6IHRoaXMuY2hhbmdlTW9udGgsXG4gICAgICAgICAgY2hhbmdlWWVhcjogdGhpcy5jaGFuZ2VZZWFyLFxuICAgICAgICAgIGRlY3JlYXNlTW9udGg6IHRoaXMuZGVjcmVhc2VNb250aCxcbiAgICAgICAgICBpbmNyZWFzZU1vbnRoOiB0aGlzLmluY3JlYXNlTW9udGgsXG4gICAgICAgICAgZGVjcmVhc2VZZWFyOiB0aGlzLmRlY3JlYXNlWWVhcixcbiAgICAgICAgICBpbmNyZWFzZVllYXI6IHRoaXMuaW5jcmVhc2VZZWFyLFxuICAgICAgICAgIHByZXZNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIHByZXZZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dFllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgfSl9XG4gICAgICAgIHtzaG93RGF5TmFtZXMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckhlYWRlciA9ICh7IG1vbnRoRGF0ZSB9KSA9PiB7XG4gICAgY29uc3QgeyBzaG93WWVhclBpY2tlciwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIG1vbnRoRGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXIteWVhci1oZWFkZXJcIj5cbiAgICAgICAge3Nob3dZZWFyUGlja2VyID8gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YCA6IGdldFllYXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyID0gKGhlYWRlckFyZ3MpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIgIT09IHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ3VzdG9tSGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyWWVhckhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRlZmF1bHRIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoTGlzdCA9IFtdO1xuICAgIGNvbnN0IG1vbnRoc1RvU3VidHJhY3QgPSB0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc1xuICAgICAgPyB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMVxuICAgICAgOiAwO1xuICAgIGNvbnN0IGZyb21Nb250aERhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgID8gYWRkWWVhcnModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KVxuICAgICAgICA6IHN1Yk1vbnRocyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpO1xuICAgIGNvbnN0IG1vbnRoU2VsZWN0ZWRJbiA9IHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluID8/IG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vbnRoc1RvQWRkID0gaSAtIG1vbnRoU2VsZWN0ZWRJbiArIG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgICBjb25zdCBtb250aERhdGUgPVxuICAgICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgICA/IGFkZFllYXJzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKVxuICAgICAgICAgIDogYWRkTW9udGhzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKTtcbiAgICAgIGNvbnN0IG1vbnRoS2V5ID0gYG1vbnRoLSR7aX1gO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgPSBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDE7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ID0gaSA+IDA7XG4gICAgICBtb250aExpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17bW9udGhLZXl9XG4gICAgICAgICAgcmVmPXsoZGl2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoQ29udGFpbmVyID0gZGl2O1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtY29udGFpbmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZSwgaSB9KX1cbiAgICAgICAgICA8TW9udGhcbiAgICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgICAgIGRheT17bW9udGhEYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbkRheUtleURvd259XG4gICAgICAgICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICAgIG9yZGVySW5EaXNwbGF5PXtpfVxuICAgICAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbW9udGhMaXN0O1xuICB9O1xuXG4gIHJlbmRlclllYXJzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGU6IHRoaXMuc3RhdGUuZGF0ZSB9KX1cbiAgICAgICAgICA8WWVhclxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW5nRGF0ZT17dGhpcy5jbGVhclNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLmhhbmRsZVllYXJNb3VzZUxlYXZlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyVGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgKHRoaXMuc3RhdGUubW9udGhDb250YWluZXIgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGltZVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICAgIGZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgICAgaW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgICAgbW9udGhSZWY9e3RoaXMuc3RhdGUubW9udGhDb250YWluZXJ9XG4gICAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dFRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lVmFsaWQgPSBpc1ZhbGlkKHRpbWUpICYmIEJvb2xlYW4odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVN0cmluZyA9IHRpbWVWYWxpZFxuICAgICAgPyBgJHthZGRaZXJvKHRpbWUuZ2V0SG91cnMoKSl9OiR7YWRkWmVybyh0aW1lLmdldE1pbnV0ZXMoKSl9YFxuICAgICAgOiBcIlwiO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnB1dFRpbWVcbiAgICAgICAgICBkYXRlPXt0aW1lfVxuICAgICAgICAgIHRpbWVTdHJpbmc9e3RpbWVTdHJpbmd9XG4gICAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YDtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gZ2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtnZXRNb250aEluTG9jYWxlKFxuICAgICAgICBnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICl9ICR7Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIGFyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNoaWxkcmVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2NoaWxkcmVuLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBDb250YWluZXIgPSB0aGlzLnByb3BzLmNvbnRhaW5lciB8fCBDYWxlbmRhckNvbnRhaW5lcjtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImNvbnRlbnRzXCIgfX0gcmVmPXt0aGlzLmNvbnRhaW5lclJlZn0+XG4gICAgICAgIDxDb250YWluZXJcbiAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXCJyZWFjdC1kYXRlcGlja2VyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXItLXRpbWUtb25seVwiOiB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBzaG93VGltZT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyUHJldmlvdXNCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJOZXh0QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTW9udGhzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyWWVhcnMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUb2RheUJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5jb25zdCBDYWxlbmRhckljb24gPSAoeyBpY29uLCBjbGFzc05hbWUgPSBcIlwiLCBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgZGVmYXVsdENsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyX19jYWxlbmRhci1pY29uXCI7XG5cbiAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGljb24pKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChpY29uLCB7XG4gICAgICBjbGFzc05hbWU6IGAke2ljb24ucHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJ9ICR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gLFxuICAgICAgb25DbGljazogKGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpY29uLnByb3BzLm9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGljb24ucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb25DbGljayhlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaWNvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8aVxuICAgICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtpY29ufSAke2NsYXNzTmFtZX1gfVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBTVkcgSWNvblxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gfVxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIlxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICA+XG4gICAgICA8cGF0aCBkPVwiTTk2IDMyVjY0SDQ4QzIxLjUgNjQgMCA4NS41IDAgMTEydjQ4SDQ0OFYxMTJjMC0yNi41LTIxLjUtNDgtNDgtNDhIMzUyVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjY0SDE2MFYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMlM5NiAxNC4zIDk2IDMyek00NDggMTkySDBWNDY0YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4SDQwMGMyNi41IDAgNDgtMjEuNSA0OC00OFYxOTJ6XCIgLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbkNhbGVuZGFySWNvbi5wcm9wVHlwZXMgPSB7XG4gIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWxlbmRhckljb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290ID0gKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudCkuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0aGlzLnByb3BzLnBvcnRhbElkLFxuICAgICk7XG4gICAgaWYgKCF0aGlzLnBvcnRhbFJvb3QpIHtcbiAgICAgIHRoaXMucG9ydGFsUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aGlzLnBvcnRhbFJvb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpcy5wcm9wcy5wb3J0YWxJZCk7XG4gICAgICAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHRoaXMucG9ydGFsUm9vdCk7XG4gICAgfVxuICAgIHRoaXMucG9ydGFsUm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdC5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3RET00uY3JlYXRlUG9ydGFsKHRoaXMucHJvcHMuY2hpbGRyZW4sIHRoaXMuZWwpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbi8vIFRhYkxvb3AgcHJldmVudHMgdGhlIHVzZXIgZnJvbSB0YWJiaW5nIG91dHNpZGUgb2YgdGhlIHBvcHBlclxuLy8gSXQgY3JlYXRlcyBhIHRhYmluZGV4IGxvb3Agc28gdGhhdCBcIlRhYlwiIG9uIHRoZSBsYXN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudFxuLy8gYW5kIFwiU2hpZnQgVGFiXCIgb24gdGhlIGZpcnN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgbGFzdCBlbGVtZW50XG5cbmNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPVxuICBcIlt0YWJpbmRleF0sIGEsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIjtcbmNvbnN0IGZvY3VzYWJsZUZpbHRlciA9IChub2RlKSA9PiAhbm9kZS5kaXNhYmxlZCAmJiBub2RlLnRhYkluZGV4ICE9PSAtMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiTG9vcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy50YWJMb29wUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gIH1cblxuICAvLyBxdWVyeSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzXG4gIC8vIHRyaW0gZmlyc3QgYW5kIGxhc3QgYmVjYXVzZSB0aGV5IGFyZSB0aGUgZm9jdXMgZ3VhcmRzXG4gIGdldFRhYkNoaWxkcmVuID0gKCkgPT5cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKFxuICAgICAgICB0aGlzLnRhYkxvb3BSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IpLFxuICAgICAgICAxLFxuICAgICAgICAtMSxcbiAgICAgIClcbiAgICAgIC5maWx0ZXIoZm9jdXNhYmxlRmlsdGVyKTtcblxuICBoYW5kbGVGb2N1c1N0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmXG4gICAgICB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmXG4gICAgICB0YWJDaGlsZHJlblt0YWJDaGlsZHJlbi5sZW5ndGggLSAxXS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUZvY3VzRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiYgdGFiQ2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcFwiIHJlZj17dGhpcy50YWJMb29wUmVmfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19zdGFydFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzU3RhcnR9XG4gICAgICAgIC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX2VuZFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzRW5kfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgdXNlRmxvYXRpbmcsXG4gIGFycm93LFxuICBvZmZzZXQsXG4gIGZsaXAsXG4gIGF1dG9VcGRhdGUsXG59IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyA9IFtcbiAgXCJ0b3Atc3RhcnRcIixcbiAgXCJ0b3AtZW5kXCIsXG4gIFwiYm90dG9tLXN0YXJ0XCIsXG4gIFwiYm90dG9tLWVuZFwiLFxuICBcInJpZ2h0LXN0YXJ0XCIsXG4gIFwicmlnaHQtZW5kXCIsXG4gIFwibGVmdC1zdGFydFwiLFxuICBcImxlZnQtZW5kXCIsXG4gIFwidG9wXCIsXG4gIFwicmlnaHRcIixcbiAgXCJib3R0b21cIixcbiAgXCJsZWZ0XCIsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoRmxvYXRpbmcoQ29tcG9uZW50KSB7XG4gIGNvbnN0IFdpdGhGbG9hdGluZyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IGFsdF9wcm9wcyA9IHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgcG9wcGVyTW9kaWZpZXJzOiBwcm9wcy5wb3BwZXJNb2RpZmllcnMgfHwgW10sXG4gICAgICBwb3BwZXJQcm9wczogcHJvcHMucG9wcGVyUHJvcHMgfHwge30sXG4gICAgICBoaWRlUG9wcGVyOlxuICAgICAgICB0eXBlb2YgcHJvcHMuaGlkZVBvcHBlciA9PT0gXCJib29sZWFuXCIgPyBwcm9wcy5oaWRlUG9wcGVyIDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGFycm93UmVmID0gUmVhY3QudXNlUmVmKCk7XG4gICAgY29uc3QgZmxvYXRpbmdQcm9wcyA9IHVzZUZsb2F0aW5nKHtcbiAgICAgIG9wZW46ICFhbHRfcHJvcHMuaGlkZVBvcHBlcixcbiAgICAgIHdoaWxlRWxlbWVudHNNb3VudGVkOiBhdXRvVXBkYXRlLFxuICAgICAgcGxhY2VtZW50OiBhbHRfcHJvcHMucG9wcGVyUGxhY2VtZW50LFxuICAgICAgbWlkZGxld2FyZTogW1xuICAgICAgICBmbGlwKHsgcGFkZGluZzogMTUgfSksXG4gICAgICAgIG9mZnNldCgxMCksXG4gICAgICAgIGFycm93KHsgZWxlbWVudDogYXJyb3dSZWYgfSksXG4gICAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJNb2RpZmllcnMsXG4gICAgICBdLFxuICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlclByb3BzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgey4uLmFsdF9wcm9wc30gcG9wcGVyUHJvcHM9e3sgLi4uZmxvYXRpbmdQcm9wcywgYXJyb3dSZWYgfX0gLz5cbiAgICApO1xuICB9O1xuXG4gIFdpdGhGbG9hdGluZy5wcm9wVHlwZXMgPSB7XG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSxcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHJldHVybiBXaXRoRmxvYXRpbmc7XG59XG4iLCJpbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IEZsb2F0aW5nQXJyb3cgfSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgVGFiTG9vcCBmcm9tIFwiLi90YWJfbG9vcFwiO1xuaW1wb3J0IFBvcnRhbCBmcm9tIFwiLi9wb3J0YWxcIjtcbmltcG9ydCB3aXRoRmxvYXRpbmcgZnJvbSBcIi4vd2l0aF9mbG9hdGluZ1wiO1xuXG4vLyBFeHBvcnRlZCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuZXhwb3J0IGNsYXNzIFBvcHBlckNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoaWRlUG9wcGVyOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlckNvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0YXJnZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlck9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0Fycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgd3JhcHBlckNsYXNzTmFtZSxcbiAgICAgIGhpZGVQb3BwZXIsXG4gICAgICBwb3BwZXJDb21wb25lbnQsXG4gICAgICB0YXJnZXRDb21wb25lbnQsXG4gICAgICBlbmFibGVUYWJMb29wLFxuICAgICAgcG9wcGVyT25LZXlEb3duLFxuICAgICAgcG9ydGFsSWQsXG4gICAgICBwb3J0YWxIb3N0LFxuICAgICAgcG9wcGVyUHJvcHMsXG4gICAgICBzaG93QXJyb3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQgcG9wcGVyO1xuXG4gICAgaWYgKCFoaWRlUG9wcGVyKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xzeChcInJlYWN0LWRhdGVwaWNrZXItcG9wcGVyXCIsIGNsYXNzTmFtZSk7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e2VuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRGbG9hdGluZ31cbiAgICAgICAgICAgIHN0eWxlPXtwb3BwZXJQcm9wcy5mbG9hdGluZ1N0eWxlc31cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlc31cbiAgICAgICAgICAgIGRhdGEtcGxhY2VtZW50PXtwb3BwZXJQcm9wcy5wbGFjZW1lbnR9XG4gICAgICAgICAgICBvbktleURvd249e3BvcHBlck9uS2V5RG93bn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9wcGVyQ29tcG9uZW50fVxuICAgICAgICAgICAge3Nob3dBcnJvdyAmJiAoXG4gICAgICAgICAgICAgIDxGbG9hdGluZ0Fycm93XG4gICAgICAgICAgICAgICAgcmVmPXtwb3BwZXJQcm9wcy5hcnJvd1JlZn1cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtwb3BwZXJQcm9wcy5jb250ZXh0fVxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIGhlaWdodD17OH1cbiAgICAgICAgICAgICAgICB3aWR0aD17MTZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTFweClcIiB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RyaWFuZ2xlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvVGFiTG9vcD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyKSB7XG4gICAgICBwb3BwZXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyLCB7fSwgcG9wcGVyKTtcbiAgICB9XG5cbiAgICBpZiAocG9ydGFsSWQgJiYgIWhpZGVQb3BwZXIpIHtcbiAgICAgIHBvcHBlciA9IChcbiAgICAgICAgPFBvcnRhbCBwb3J0YWxJZD17cG9ydGFsSWR9IHBvcnRhbEhvc3Q9e3BvcnRhbEhvc3R9PlxuICAgICAgICAgIHtwb3BwZXJ9XG4gICAgICAgIDwvUG9ydGFsPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXdyYXBwZXJcIiwgd3JhcHBlckNsYXNzTmFtZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8ZGl2IHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRSZWZlcmVuY2V9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzZXN9PlxuICAgICAgICAgIHt0YXJnZXRDb21wb25lbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cG9wcGVyfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhGbG9hdGluZyhQb3BwZXJDb21wb25lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gXCIuL2NhbGVuZGFyXCI7XG5pbXBvcnQgQ2FsZW5kYXJJY29uIGZyb20gXCIuL2NhbGVuZGFyX2ljb25cIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgUG9wcGVyQ29tcG9uZW50IGZyb20gXCIuL3BvcHBlcl9jb21wb25lbnRcIjtcbmltcG9ydCB7IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyB9IGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHsgc2V0IH0gZnJvbSBcImRhdGUtZm5zL3NldFwiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBpc0RhdGUsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBpc0VxdWFsLFxuICBzZXRUaW1lLFxuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgYWRkRGF5cyxcbiAgYWRkTW9udGhzLFxuICBhZGRXZWVrcyxcbiAgc3ViRGF5cyxcbiAgc3ViTW9udGhzLFxuICBzdWJXZWVrcyxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGdldEVmZmVjdGl2ZU1pbkRhdGUsXG4gIGdldEVmZmVjdGl2ZU1heERhdGUsXG4gIHBhcnNlRGF0ZSxcbiAgc2FmZURhdGVGb3JtYXQsXG4gIHNhZmVEYXRlUmFuZ2VGb3JtYXQsXG4gIGdldEhpZ2h0TGlnaHREYXlzTWFwLFxuICBnZXRZZWFyLFxuICBnZXRNb250aCxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldEVuZE9mV2VlayxcbiAgcmVnaXN0ZXJMb2NhbGUsXG4gIHNldERlZmF1bHRMb2NhbGUsXG4gIGdldERlZmF1bHRMb2NhbGUsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgaXNTYW1lRGF5LFxuICBpc01vbnRoRGlzYWJsZWQsXG4gIGlzWWVhckRpc2FibGVkLFxuICBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCxcbiAgZ2V0SG9saWRheXNNYXAsXG4gIGlzRGF0ZUJlZm9yZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYWxlbmRhckNvbnRhaW5lciB9IGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuXG5leHBvcnQgeyByZWdpc3RlckxvY2FsZSwgc2V0RGVmYXVsdExvY2FsZSwgZ2V0RGVmYXVsdExvY2FsZSB9O1xuXG5jb25zdCBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlci1pZ25vcmUtb25jbGlja291dHNpZGVcIjtcbmNvbnN0IFdyYXBwZWRDYWxlbmRhciA9IG9uQ2xpY2tPdXRzaWRlKENhbGVuZGFyKTtcblxuLy8gQ29tcGFyZXMgZGF0ZXMgeWVhcittb250aCBjb21iaW5hdGlvbnNcbmZ1bmN0aW9uIGhhc1ByZVNlbGVjdGlvbkNoYW5nZWQoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiAoXG4gICAgICBnZXRNb250aChkYXRlMSkgIT09IGdldE1vbnRoKGRhdGUyKSB8fCBnZXRZZWFyKGRhdGUxKSAhPT0gZ2V0WWVhcihkYXRlMilcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGRhdGUxICE9PSBkYXRlMjtcbn1cblxuLyoqXG4gKiBHZW5lcmFsIGRhdGVwaWNrZXIgY29tcG9uZW50LlxuICovXG5jb25zdCBJTlBVVF9FUlJfMSA9IFwiRGF0ZSBpbnB1dCBub3QgdmFsaWQuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVQaWNrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWxsb3dTYW1lRGF5OiBmYWxzZSxcbiAgICAgIGRhdGVGb3JtYXQ6IFwiTU0vZGQveXl5eVwiLFxuICAgICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBcIkxMTEwgeXl5eVwiLFxuICAgICAgb25DaGFuZ2UoKSB7fSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgIGRyb3Bkb3duTW9kZTogXCJzY3JvbGxcIixcbiAgICAgIG9uRm9jdXMoKSB7fSxcbiAgICAgIG9uQmx1cigpIHt9LFxuICAgICAgb25LZXlEb3duKCkge30sXG4gICAgICBvbklucHV0Q2xpY2soKSB7fSxcbiAgICAgIG9uU2VsZWN0KCkge30sXG4gICAgICBvbkNsaWNrT3V0c2lkZSgpIHt9LFxuICAgICAgb25Nb250aENoYW5nZSgpIHt9LFxuICAgICAgb25DYWxlbmRhck9wZW4oKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJDbG9zZSgpIHt9LFxuICAgICAgcHJldmVudE9wZW5PbkZvY3VzOiBmYWxzZSxcbiAgICAgIG9uWWVhckNoYW5nZSgpIHt9LFxuICAgICAgb25JbnB1dEVycm9yKCkge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgIHdpdGhQb3J0YWw6IGZhbHNlLFxuICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IGZhbHNlLFxuICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICAgIHNob3dUaW1lU2VsZWN0OiBmYWxzZSxcbiAgICAgIHNob3dUaW1lSW5wdXQ6IGZhbHNlLFxuICAgICAgc2hvd1ByZXZpb3VzTW9udGhzOiBmYWxzZSxcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93WWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1dlZWtQaWNrZXI6IGZhbHNlLFxuICAgICAgc3RyaWN0UGFyc2luZzogZmFsc2UsXG4gICAgICB0aW1lSW50ZXJ2YWxzOiAzMCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICB0aW1lSW5wdXRMYWJlbDogXCJUaW1lXCIsXG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgICAgeWVhckl0ZW1OdW1iZXI6IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgICAgIGZvY3VzU2VsZWN0ZWRNb250aDogZmFsc2UsXG4gICAgICBzaG93UG9wcGVyQXJyb3c6IHRydWUsXG4gICAgICBleGNsdWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgY3VzdG9tVGltZUlucHV0OiBudWxsLFxuICAgICAgY2FsZW5kYXJTdGFydERheTogdW5kZWZpbmVkLFxuICAgICAgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljazogZmFsc2UsXG4gICAgICB1c2VQb2ludGVyRXZlbnQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYWxsb3dTYW1lRGF5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhcmlhRGVzY3JpYmVkQnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUludmFsaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsQ2xvc2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsbGVkQnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYVJlcXVpcmVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF1dG9Db21wbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsb3NlT25TY3JvbGw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21JbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgY3VzdG9tSW5wdXRSZWY6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXNcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKSxcbiAgICBkYXRlRm9ybWF0Q2FsZW5kYXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljazogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgIF0pLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpY29uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICAgIGNhbGVuZGFySWNvbkNsYXNzbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DbGlja091dHNpZGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlUmF3OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0RXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2FsZW5kYXJPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNhbGVuZGFyQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHBsYWNlaG9sZGVyVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3BwZXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBvcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyTW9kaWZpZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSwgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSwgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcHJldmVudE9wZW5PbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZWFkT25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd01vbnRoRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dQcmV2aW91c01vbnRoczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcnM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0cmljdFBhcnNpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHN0YXJ0T3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFiSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEYXRlU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGNsZWFyQnV0dG9uVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xlYXJCdXR0b25DbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdyYXBwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93UG9wcGVyQXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNhbGNJbml0aWFsU3RhdGUoKTtcbiAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAoXG4gICAgICBwcmV2UHJvcHMuaW5saW5lICYmXG4gICAgICBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKHByZXZQcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwcmV2UHJvcHMubW9udGhzU2hvd24gIT09IHRoaXMucHJvcHMubW9udGhzU2hvd25cbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IDAgfSk7XG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMuaGlnaGxpZ2h0RGF0ZXMgIT09IHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoaWdobGlnaHREYXRlczogZ2V0SGlnaHRMaWdodERheXNNYXAodGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcyksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgIXByZXZTdGF0ZS5mb2N1c2VkICYmXG4gICAgICAhaXNFcXVhbChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJldlN0YXRlLm9wZW4gIT09IHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLm9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyT3BlbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldlN0YXRlLm9wZW4gPT09IHRydWUgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJDbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBnZXRQcmVTZWxlY3Rpb24gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZVxuICAgICAgPyB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzRW5kICYmIHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgID8gdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNTdGFydCAmJiB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA/IHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgIDogbmV3RGF0ZSgpO1xuXG4gIC8vIENvbnZlcnQgdGhlIGRhdGUgZnJvbSBzdHJpbmcgZm9ybWF0IHRvIHN0YW5kYXJkIERhdGUgZm9ybWF0XG4gIG1vZGlmeUhvbGlkYXlzID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLmhvbGlkYXlzPy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBob2xpZGF5KSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoaG9saWRheS5kYXRlKTtcbiAgICAgIGlmICghaXNWYWxpZChkYXRlKSkge1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbLi4uYWNjdW11bGF0b3IsIHsgLi4uaG9saWRheSwgZGF0ZSB9XTtcbiAgICB9LCBbXSk7XG5cbiAgY2FsY0luaXRpYWxTdGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UHJlU2VsZWN0aW9uID0gdGhpcy5nZXRQcmVTZWxlY3Rpb24oKTtcbiAgICBjb25zdCBtaW5EYXRlID0gZ2V0RWZmZWN0aXZlTWluRGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBtYXhEYXRlID0gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBib3VuZGVkUHJlU2VsZWN0aW9uID1cbiAgICAgIG1pbkRhdGUgJiYgaXNCZWZvcmUoZGVmYXVsdFByZVNlbGVjdGlvbiwgc3RhcnRPZkRheShtaW5EYXRlKSlcbiAgICAgICAgPyBtaW5EYXRlXG4gICAgICAgIDogbWF4RGF0ZSAmJiBpc0FmdGVyKGRlZmF1bHRQcmVTZWxlY3Rpb24sIGVuZE9mRGF5KG1heERhdGUpKVxuICAgICAgICAgID8gbWF4RGF0ZVxuICAgICAgICAgIDogZGVmYXVsdFByZVNlbGVjdGlvbjtcbiAgICByZXR1cm4ge1xuICAgICAgb3BlbjogdGhpcy5wcm9wcy5zdGFydE9wZW4gfHwgZmFsc2UsXG4gICAgICBwcmV2ZW50Rm9jdXM6IGZhbHNlLFxuICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkKSA/PyBib3VuZGVkUHJlU2VsZWN0aW9uLFxuICAgICAgLy8gdHJhbnNmb3JtaW5nIGhpZ2hsaWdodGVkIGRheXMgKHBlcmhhcHMgbmVzdGVkIGFycmF5KVxuICAgICAgLy8gdG8gZmxhdCBNYXAgZm9yIGZhc3RlciBhY2Nlc3MgaW4gZGF5LmpzeFxuICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAvLyB1c2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvbiBhZnRlciBtb250aCBoYXMgY2hhbmdlZCwgYnV0IG5vdCBvblxuICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9O1xuXG4gIGNsZWFyUHJldmVudEZvY3VzVGltZW91dCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0Rm9jdXMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5mb2N1cykge1xuICAgICAgdGhpcy5pbnB1dC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNldEJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5ibHVyKSB7XG4gICAgICB0aGlzLmlucHV0LmJsdXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBzZXRPcGVuID0gKG9wZW4sIHNraXBTZXRCbHVyID0gZmFsc2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBvcGVuOiBvcGVuLFxuICAgICAgICBwcmVTZWxlY3Rpb246XG4gICAgICAgICAgb3BlbiAmJiB0aGlzLnN0YXRlLm9wZW5cbiAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb25cbiAgICAgICAgICAgIDogdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCkucHJlU2VsZWN0aW9uLFxuICAgICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICghb3Blbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgZm9jdXNlZDogc2tpcFNldEJsdXIgPyBwcmV2LmZvY3VzZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAhc2tpcFNldEJsdXIgJiYgdGhpcy5zZXRCbHVyKCk7XG5cbiAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbiAgaW5wdXRPayA9ICgpID0+IGlzRGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG5cbiAgaXNDYWxlbmRhck9wZW4gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlbiA9PT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuc3RhdGUub3BlbiAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seVxuICAgICAgOiB0aGlzLnByb3BzLm9wZW47XG5cbiAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUucHJldmVudEZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1cyAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiB0cnVlIH0pO1xuICB9O1xuXG4gIHNlbmRGb2N1c0JhY2tUb0lucHV0ID0gKCkgPT4ge1xuICAgIC8vIENsZWFyIHByZXZpb3VzIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgdGhpcy5jbGVhclByZXZlbnRGb2N1c1RpbWVvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBjbG9zZSB0aGUgcG9wcGVyIGFuZCByZWZvY3VzIHRoZSBpbnB1dFxuICAgIC8vIHN0b3AgdGhlIGlucHV0IGZyb20gYXV0byBvcGVuaW5nIG9uRm9jdXNcbiAgICAvLyBzZXRGb2N1cyB0byB0aGUgaW5wdXRcbiAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiB0cnVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJldmVudEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IGZhbHNlIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2FuY2VsRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5pbnB1dEZvY3VzVGltZW91dCk7XG4gICAgdGhpcy5pbnB1dEZvY3VzVGltZW91dCA9IG51bGw7XG4gIH07XG5cbiAgZGVmZXJGb2N1c0lucHV0ID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0Rm9jdXMoKSwgMSk7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLm9wZW4gfHwgdGhpcy5wcm9wcy53aXRoUG9ydGFsIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmYWxzZSB9KTtcbiAgfTtcblxuICBoYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICguLi5hbGxBcmdzKSA9PiB7XG4gICAgbGV0IGV2ZW50ID0gYWxsQXJnc1swXTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdy5hcHBseSh0aGlzLCBhbGxBcmdzKTtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVULFxuICAgIH0pO1xuICAgIGxldCBkYXRlID0gcGFyc2VEYXRlKFxuICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLnN0cmljdFBhcnNpbmcsXG4gICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgKTtcbiAgICAvLyBVc2UgZGF0ZSBmcm9tIGBzZWxlY3RlZGAgcHJvcCB3aGVuIG1hbmlwdWxhdGluZyBvbmx5IHRpbWUgZm9yIGlucHV0IHZhbHVlXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiZcbiAgICAgIGRhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkoZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIGRhdGUgPSBzZXQodGhpcy5wcm9wcy5zZWxlY3RlZCwge1xuICAgICAgICBob3VyczogZ2V0SG91cnMoZGF0ZSksXG4gICAgICAgIG1pbnV0ZXM6IGdldE1pbnV0ZXMoZGF0ZSksXG4gICAgICAgIHNlY29uZHM6IGdldFNlY29uZHMoZGF0ZSksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGUgfHwgIWV2ZW50LnRhcmdldC52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdCA9IChkYXRlLCBldmVudCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgLy8gUHJldmVudGluZyBvbkZvY3VzIGV2ZW50IHRvIGZpeCBpc3N1ZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0hhY2tlcjB4MDEvcmVhY3QtZGF0ZXBpY2tlci9pc3N1ZXMvNjI4XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgZmFsc2UsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgIWlzRGF0ZUJlZm9yZShkYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHNldFNlbGVjdGVkID0gKGRhdGUsIGV2ZW50LCBrZWVwSW5wdXQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IGRhdGU7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICBpc1llYXJEaXNhYmxlZChnZXRZZWFyKGNoYW5nZWREYXRlKSwgdGhpcy5wcm9wcylcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIpIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc01vbnRoRGlzYWJsZWQoY2hhbmdlZERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsICYmIGlzRGF5RGlzYWJsZWQoY2hhbmdlZERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSxcbiAgICAgIHNlbGVjdHNSYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RzTXVsdGlwbGUsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgICAgbWluVGltZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICFpc0VxdWFsKHRoaXMucHJvcHMuc2VsZWN0ZWQsIGNoYW5nZWREYXRlKSB8fFxuICAgICAgdGhpcy5wcm9wcy5hbGxvd1NhbWVEYXkgfHxcbiAgICAgIHNlbGVjdHNSYW5nZSB8fFxuICAgICAgc2VsZWN0c011bHRpcGxlXG4gICAgKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiZcbiAgICAgICAgICAoIWtlZXBJbnB1dCB8fFxuICAgICAgICAgICAgKCF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICBob3VyOiBnZXRIb3Vycyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIG1pbnV0ZTogZ2V0TWludXRlcyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIHNlY29uZDogZ2V0U2Vjb25kcyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG1pblRpbWUgaXMgcHJlc2VudCB0aGVuIHNldCB0aGUgdGltZSB0byBtaW5UaW1lXG4gICAgICAgIGlmIChcbiAgICAgICAgICAha2VlcElucHV0ICYmXG4gICAgICAgICAgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChtaW5UaW1lKSB7XG4gICAgICAgICAgICBjaGFuZ2VkRGF0ZSA9IHNldFRpbWUoY2hhbmdlZERhdGUsIHtcbiAgICAgICAgICAgICAgaG91cjogbWluVGltZS5nZXRIb3VycygpLFxuICAgICAgICAgICAgICBtaW51dGU6IG1pblRpbWUuZ2V0TWludXRlcygpLFxuICAgICAgICAgICAgICBzZWNvbmQ6IG1pblRpbWUuZ2V0U2Vjb25kcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZm9jdXNTZWxlY3RlZE1vbnRoKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoU2VsZWN0ZWRJbjogbW9udGhTZWxlY3RlZEluIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIGNvbnN0IG5vUmFuZ2VzID0gIXN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZTtcbiAgICAgICAgY29uc3QgaGFzU3RhcnRSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZTtcbiAgICAgICAgY29uc3QgaXNSYW5nZUZpbGxlZCA9IHN0YXJ0RGF0ZSAmJiBlbmREYXRlO1xuICAgICAgICBpZiAobm9SYW5nZXMpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzU3RhcnRSYW5nZSkge1xuICAgICAgICAgIGlmIChjaGFuZ2VkRGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgb25DaGFuZ2UoW251bGwsIG51bGxdLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGVCZWZvcmUoY2hhbmdlZERhdGUsIHN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DaGFuZ2UoW3N0YXJ0RGF0ZSwgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JhbmdlRmlsbGVkKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdHNNdWx0aXBsZSkge1xuICAgICAgICBpZiAoIXNlbGVjdGVkRGF0ZXM/Lmxlbmd0aCkge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWREYXRlcy5zb21lKFxuICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgY2hhbmdlZERhdGUpLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgbmV4dERhdGVzID0gc2VsZWN0ZWREYXRlcy5maWx0ZXIoXG4gICAgICAgICAgICAgIChzZWxlY3RlZERhdGUpID0+ICFpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBvbkNoYW5nZShuZXh0RGF0ZXMsIGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DaGFuZ2UoWy4uLnNlbGVjdGVkRGF0ZXMsIGNoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25DaGFuZ2UoY2hhbmdlZERhdGUsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWtlZXBJbnB1dCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFdoZW4gY2hlY2tpbmcgcHJlU2VsZWN0aW9uIHZpYSBtaW4vbWF4RGF0ZSwgdGltZXMgbmVlZCB0byBiZSBtYW5pcHVsYXRlZCB2aWEgc3RhcnRPZkRheS9lbmRPZkRheVxuICBzZXRQcmVTZWxlY3Rpb24gPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGhhc01pbkRhdGUgPSB0eXBlb2YgdGhpcy5wcm9wcy5taW5EYXRlICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIGNvbnN0IGhhc01heERhdGUgPSB0eXBlb2YgdGhpcy5wcm9wcy5tYXhEYXRlICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIGxldCBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9IHRydWU7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRhdGVTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkYXRlKTtcbiAgICAgIGlmIChoYXNNaW5EYXRlICYmIGhhc01heERhdGUpIHtcbiAgICAgICAgLy8gaXNEYXlJblJhbmdlIHVzZXMgc3RhcnRPZkRheSBpbnRlcm5hbGx5LCBzbyBub3QgbmVjZXNzYXJ5IHRvIG1hbmlwdWxhdGUgdGltZXMgaGVyZVxuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9IGlzRGF5SW5SYW5nZShcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGhhc01pbkRhdGUpIHtcbiAgICAgICAgY29uc3QgbWluRGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0FmdGVyKGRhdGUsIG1pbkRhdGVTdGFydE9mRGF5KSB8fFxuICAgICAgICAgIGlzRXF1YWwoZGF0ZVN0YXJ0T2ZEYXksIG1pbkRhdGVTdGFydE9mRGF5KTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWF4RGF0ZSkge1xuICAgICAgICBjb25zdCBtYXhEYXRlRW5kT2ZEYXkgPSBlbmRPZkRheSh0aGlzLnByb3BzLm1heERhdGUpO1xuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9XG4gICAgICAgICAgaXNCZWZvcmUoZGF0ZSwgbWF4RGF0ZUVuZE9mRGF5KSB8fFxuICAgICAgICAgIGlzRXF1YWwoZGF0ZVN0YXJ0T2ZEYXksIG1heERhdGVFbmRPZkRheSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc1ZhbGlkRGF0ZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHByZVNlbGVjdGlvbjogZGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB0b2dnbGVDYWxlbmRhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldE9wZW4oIXRoaXMuc3RhdGUub3Blbik7XG4gIH07XG5cbiAgaGFuZGxlVGltZUNoYW5nZSA9ICh0aW1lKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA/IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgIDogdGhpcy5nZXRQcmVTZWxlY3Rpb24oKTtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA/IHRpbWVcbiAgICAgIDogc2V0VGltZShzZWxlY3RlZCwge1xuICAgICAgICAgIGhvdXI6IGdldEhvdXJzKHRpbWUpLFxuICAgICAgICAgIG1pbnV0ZTogZ2V0TWludXRlcyh0aW1lKSxcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgfSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIG9uSW5wdXRDbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uSW5wdXRDbGljaygpO1xuICB9O1xuXG4gIG9uSW5wdXRLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuc3RhdGUub3BlbiAmJlxuICAgICAgIXRoaXMucHJvcHMuaW5saW5lICYmXG4gICAgICAhdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXNcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiQXJyb3dEb3duXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiQXJyb3dVcFwiIHx8XG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkVudGVyXCJcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9uSW5wdXRDbGljaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIGNhbGVuZGFyIGlzIG9wZW4sIHRoZXNlIGtleXMgd2lsbCBmb2N1cyB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIGlmICh0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JTdHJpbmcgPVxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiYgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnNcbiAgICAgICAgICAgID8gJy5yZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclt0YWJpbmRleD1cIjBcIl0nXG4gICAgICAgICAgICA6ICcucmVhY3QtZGF0ZXBpY2tlcl9fZGF5W3RhYmluZGV4PVwiMFwiXSc7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9XG4gICAgICAgICAgdGhpcy5jYWxlbmRhci5jb21wb25lbnROb2RlICYmXG4gICAgICAgICAgdGhpcy5jYWxlbmRhci5jb21wb25lbnROb2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JTdHJpbmcpO1xuICAgICAgICBzZWxlY3RlZEl0ZW0gJiYgc2VsZWN0ZWRJdGVtLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvcHkgPSBuZXdEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcbiAgICAgIGlmIChldmVudEtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmlucHV0T2soKSAmJlxuICAgICAgICAgIHRoaXMuc3RhdGUubGFzdFByZVNlbGVjdENoYW5nZSA9PT0gUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEVcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3QoY29weSwgZXZlbnQpO1xuICAgICAgICAgICF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgdGhpcy5zZXRQcmVTZWxlY3Rpb24oY29weSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIlRhYlwiKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5pbnB1dE9rKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBvblBvcnRhbEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgcHJldmVudEZvY3VzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8ga2V5RG93biBldmVudHMgcGFzc2VkIGRvd24gdG8gZGF5LmpzeFxuICBvbkRheUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNTaGlmdEtleUFjdGl2ZSA9IGV2ZW50LnNoaWZ0S2V5O1xuXG4gICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3QoY29weSwgZXZlbnQpO1xuICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgbGV0IG5ld1NlbGVjdGlvbjtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViRGF5cyhjb3B5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZFdlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGREYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZFdlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUGFnZVVwXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBzdWJZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBzdWJNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlRG93blwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGlzU2hpZnRLZXlBY3RpdmVcbiAgICAgICAgICAgID8gYWRkWWVhcnMoY29weSwgMSlcbiAgICAgICAgICAgIDogYWRkTW9udGhzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiSG9tZVwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgICAgY29weSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJFbmRcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBnZXRFbmRPZldlZWsoY29weSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICghbmV3U2VsZWN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXRFcnJvcikge1xuICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFIH0pO1xuICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQobmV3U2VsZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKG5ld1NlbGVjdGlvbik7XG4gICAgICAvLyBuZWVkIHRvIGZpZ3VyZSBvdXQgd2hldGhlciBtb250aCBoYXMgY2hhbmdlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb25cbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgICBjb25zdCBwcmV2TW9udGggPSBnZXRNb250aChjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3TW9udGggPSBnZXRNb250aChuZXdTZWxlY3Rpb24pO1xuICAgICAgICBjb25zdCBwcmV2WWVhciA9IGdldFllYXIoY29weSk7XG4gICAgICAgIGNvbnN0IG5ld1llYXIgPSBnZXRZZWFyKG5ld1NlbGVjdGlvbik7XG5cbiAgICAgICAgaWYgKHByZXZNb250aCAhPT0gbmV3TW9udGggfHwgcHJldlllYXIgIT09IG5ld1llYXIpIHtcbiAgICAgICAgICAvLyBtb250aCBoYXMgY2hhbmdlZFxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG91bGRGb2N1c0RheUlubGluZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtb250aCBoYXNuJ3QgY2hhbmdlZFxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gaGFuZGxlIGdlbmVyaWMga2V5IGRvd24gZXZlbnRzIGluIHRoZSBwb3BwZXIgdGhhdCBkbyBub3QgYWRqdXN0IG9yIHNlbGVjdCBkYXRlc1xuICAvLyBleDogd2hpbGUgZm9jdXNpbmcgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zXG4gIG9uUG9wcGVyS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICB9XG4gIH07XG5cbiAgb25DbGVhckNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoW251bGwsIG51bGxdLCBldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobnVsbCwgZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgfTtcblxuICBjbGVhciA9ICgpID0+IHtcbiAgICB0aGlzLm9uQ2xlYXJDbGljaygpO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbCA9PT0gXCJib29sZWFuXCIgJiZcbiAgICAgIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbFxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50IHx8XG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8XG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckNhbGVuZGFyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMuaXNDYWxlbmRhck9wZW4oKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8V3JhcHBlZENhbGVuZGFyXG4gICAgICAgIHJlZj17KGVsZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gZWxlbTtcbiAgICAgICAgfX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgd2Vla0FyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBtb250aEFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgYWRqdXN0RGF0ZU9uQ2hhbmdlPXt0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZX1cbiAgICAgICAgc2V0T3Blbj17dGhpcy5zZXRPcGVufVxuICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdENhbGVuZGFyfVxuICAgICAgICB1c2VXZWVrZGF5c1Nob3J0PXt0aGlzLnByb3BzLnVzZVdlZWtkYXlzU2hvcnR9XG4gICAgICAgIGZvcm1hdFdlZWtEYXk9e3RoaXMucHJvcHMuZm9ybWF0V2Vla0RheX1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb259XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgb3BlblRvRGF0ZT17dGhpcy5wcm9wcy5vcGVuVG9EYXRlfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgb25DbGlja091dHNpZGU9e3RoaXMuaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGV9XG4gICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMuc3RhdGUuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgIGhvbGlkYXlzPXtnZXRIb2xpZGF5c01hcCh0aGlzLm1vZGlmeUhvbGlkYXlzKCkpfVxuICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgaW5jbHVkZVRpbWVzPXt0aGlzLnByb3BzLmluY2x1ZGVUaW1lc31cbiAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnN0YXRlLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICBwZWVrTmV4dE1vbnRoPXt0aGlzLnByb3BzLnBlZWtOZXh0TW9udGh9XG4gICAgICAgIHNob3dNb250aERyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3dufVxuICAgICAgICBzaG93UHJldmlvdXNNb250aHM9e3RoaXMucHJvcHMuc2hvd1ByZXZpb3VzTW9udGhzfVxuICAgICAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bj17dGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93bn1cbiAgICAgICAgc2hvd01vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgc2hvd1dlZWtOdW1iZXJzPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgc2hvd1llYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3dufVxuICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb259XG4gICAgICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb259XG4gICAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgdG9kYXlCdXR0b249e3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICAgIHdlZWtMYWJlbD17dGhpcy5wcm9wcy53ZWVrTGFiZWx9XG4gICAgICAgIG91dHNpZGVDbGlja0lnbm9yZUNsYXNzPXtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc31cbiAgICAgICAgZml4ZWRIZWlnaHQ9e3RoaXMucHJvcHMuZml4ZWRIZWlnaHR9XG4gICAgICAgIG1vbnRoc1Nob3duPXt0aGlzLnByb3BzLm1vbnRoc1Nob3dufVxuICAgICAgICBtb250aFNlbGVjdGVkSW49e3RoaXMuc3RhdGUubW9udGhTZWxlY3RlZElufVxuICAgICAgICBvbkRyb3Bkb3duRm9jdXM9e3RoaXMuaGFuZGxlRHJvcGRvd25Gb2N1c31cbiAgICAgICAgb25Nb250aENoYW5nZT17dGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlfVxuICAgICAgICBvblllYXJDaGFuZ2U9e3RoaXMucHJvcHMub25ZZWFyQ2hhbmdlfVxuICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICB3ZWVrRGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWV9XG4gICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICB0aW1lQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRpbWVDbGFzc05hbWV9XG4gICAgICAgIHNob3dEYXRlU2VsZWN0PXt0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdD17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdH1cbiAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgb25UaW1lQ2hhbmdlPXt0aGlzLmhhbmRsZVRpbWVDaGFuZ2V9XG4gICAgICAgIHRpbWVGb3JtYXQ9e3RoaXMucHJvcHMudGltZUZvcm1hdH1cbiAgICAgICAgdGltZUludGVydmFscz17dGhpcy5wcm9wcy50aW1lSW50ZXJ2YWxzfVxuICAgICAgICBtaW5UaW1lPXt0aGlzLnByb3BzLm1pblRpbWV9XG4gICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgZXhjbHVkZVRpbWVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lc31cbiAgICAgICAgZmlsdGVyVGltZT17dGhpcy5wcm9wcy5maWx0ZXJUaW1lfVxuICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNhbGVuZGFyQ2xhc3NOYW1lfVxuICAgICAgICBjb250YWluZXI9e3RoaXMucHJvcHMuY2FsZW5kYXJDb250YWluZXJ9XG4gICAgICAgIHllYXJJdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyfVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzTW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRNb250aEFyaWFMYWJlbH1cbiAgICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c1llYXJBcmlhTGFiZWx9XG4gICAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0WWVhckFyaWFMYWJlbD17dGhpcy5wcm9wcy5uZXh0WWVhckFyaWFMYWJlbH1cbiAgICAgICAgbmV4dFllYXJCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0WWVhckJ1dHRvbkxhYmVsfVxuICAgICAgICB0aW1lSW5wdXRMYWJlbD17dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgIHJlbmRlckN1c3RvbUhlYWRlcj17dGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXJ9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgcmVuZGVyTW9udGhDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlck1vbnRoQ29udGVudH1cbiAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgIHJlbmRlclllYXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50fVxuICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMucHJvcHMub25EYXlNb3VzZUVudGVyfVxuICAgICAgICBvbk1vbnRoTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZX1cbiAgICAgICAgb25ZZWFyTW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyfVxuICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmV9XG4gICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICBzaG93VGltZUlucHV0PXt0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgIHNob3dNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyfVxuICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgZXhjbHVkZVNjcm9sbGJhcj17dGhpcy5wcm9wcy5leGNsdWRlU2Nyb2xsYmFyfVxuICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMub25LZXlEb3dufVxuICAgICAgICBoYW5kbGVPbkRheUtleURvd249e3RoaXMub25EYXlLZXlEb3dufVxuICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5zdGF0ZS5mb2N1c2VkfVxuICAgICAgICBjdXN0b21UaW1lSW5wdXQ9e3RoaXMucHJvcHMuY3VzdG9tVGltZUlucHV0fVxuICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICB5ZWFyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnllYXJDbGFzc05hbWV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9XcmFwcGVkQ2FsZW5kYXI+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc0NvbnRhaW5zVGltZSA9XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdDtcbiAgICBjb25zdCBsb25nRGF0ZUZvcm1hdCA9IGlzQ29udGFpbnNUaW1lID8gXCJQUFBQcFwiIDogXCJQUFBQXCI7XG4gICAgbGV0IGFyaWFMaXZlTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHN0YXJ0IGRhdGU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgbG9jYWxlLFxuICAgICAgICB9LFxuICAgICAgKX0uICR7XG4gICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgID8gXCJFbmQgZGF0ZTogXCIgK1xuICAgICAgICAgICAgc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5lbmREYXRlLCB7XG4gICAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogXCJcIlxuICAgICAgfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgdGltZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgeWVhcjogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJ5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgbW9udGg6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQ6IFwiTU1NTSB5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBxdWFydGVyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogXCJ5eXl5LCBRUVFcIixcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fYXJpYS1saXZlXCJcbiAgICAgID5cbiAgICAgICAge2FyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRhdGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbHN4KHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICBbb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3NdOiB0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjdXN0b21JbnB1dCA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXQgfHwgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgLz47XG4gICAgY29uc3QgY3VzdG9tSW5wdXRSZWYgPSB0aGlzLnByb3BzLmN1c3RvbUlucHV0UmVmIHx8IFwicmVmXCI7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy52YWx1ZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgOiB0eXBlb2YgdGhpcy5zdGF0ZS5pbnB1dFZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgPyB0aGlzLnN0YXRlLmlucHV0VmFsdWVcbiAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgICA/IHNhZmVEYXRlUmFuZ2VGb3JtYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGVcbiAgICAgICAgICAgICAgPyBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXMsIHRoaXMucHJvcHMpXG4gICAgICAgICAgICAgIDogc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcyk7XG5cbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbUlucHV0LCB7XG4gICAgICBbY3VzdG9tSW5wdXRSZWZdOiAoaW5wdXQpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgfSxcbiAgICAgIHZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUJsdXIsXG4gICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uSW5wdXRDbGljayxcbiAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsXG4gICAgICBvbktleURvd246IHRoaXMub25JbnB1dEtleURvd24sXG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgIGZvcm06IHRoaXMucHJvcHMuZm9ybSxcbiAgICAgIGF1dG9Gb2N1czogdGhpcy5wcm9wcy5hdXRvRm9jdXMsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlclRleHQsXG4gICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgIGF1dG9Db21wbGV0ZTogdGhpcy5wcm9wcy5hdXRvQ29tcGxldGUsXG4gICAgICBjbGFzc05hbWU6IGNsc3goY3VzdG9tSW5wdXQucHJvcHMuY2xhc3NOYW1lLCBjbGFzc05hbWUpLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnByb3BzLnJlcXVpcmVkLFxuICAgICAgdGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXgsXG4gICAgICBcImFyaWEtZGVzY3JpYmVkYnlcIjogdGhpcy5wcm9wcy5hcmlhRGVzY3JpYmVkQnksXG4gICAgICBcImFyaWEtaW52YWxpZFwiOiB0aGlzLnByb3BzLmFyaWFJbnZhbGlkLFxuICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGhpcy5wcm9wcy5hcmlhTGFiZWxsZWRCeSxcbiAgICAgIFwiYXJpYS1yZXF1aXJlZFwiOiB0aGlzLnByb3BzLmFyaWFSZXF1aXJlZCxcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NsZWFyYWJsZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgY2xlYXJCdXR0b25UaXRsZSxcbiAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lID0gXCJcIixcbiAgICAgIGFyaWFMYWJlbENsb3NlID0gXCJDbG9zZVwiLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoXG4gICAgICBpc0NsZWFyYWJsZSAmJlxuICAgICAgKHNlbGVjdGVkICE9IG51bGwgfHxcbiAgICAgICAgc3RhcnREYXRlICE9IG51bGwgfHxcbiAgICAgICAgZW5kRGF0ZSAhPSBudWxsIHx8XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM/Lmxlbmd0aClcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb25cIixcbiAgICAgICAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lLFxuICAgICAgICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb24tLWRpc2FibGVkXCI6IGRpc2FibGVkIH0sXG4gICAgICAgICAgKX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsQ2xvc2V9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsZWFyQ2xpY2t9XG4gICAgICAgICAgdGl0bGU9e2NsZWFyQnV0dG9uVGl0bGV9XG4gICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcklucHV0Q29udGFpbmVyKCkge1xuICAgIGNvbnN0IHsgc2hvd0ljb24sIGljb24sIGNhbGVuZGFySWNvbkNsYXNzbmFtZSwgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBvcGVuIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtY29udGFpbmVyJHtcbiAgICAgICAgICBzaG93SWNvbiA/IFwiIHJlYWN0LWRhdGVwaWNrZXJfX3ZpZXctY2FsZW5kYXItaWNvblwiIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAge3Nob3dJY29uICYmIChcbiAgICAgICAgICA8Q2FsZW5kYXJJY29uXG4gICAgICAgICAgICBpY29uPXtpY29ufVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjYWxlbmRhckljb25DbGFzc25hbWV9ICR7XG4gICAgICAgICAgICAgIG9wZW4gJiYgXCJyZWFjdC1kYXRlcGlja2VyLWlnbm9yZS1vbmNsaWNrb3V0c2lkZVwiXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHsuLi4odG9nZ2xlQ2FsZW5kYXJPbkljb25DbGlja1xuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMudG9nZ2xlQ2FsZW5kYXIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGwpfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIHRoaXMucmVuZGVyQXJpYUxpdmVSZWdpb24oKX1cbiAgICAgICAge3RoaXMucmVuZGVyRGF0ZUlucHV0KCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNsZWFyQnV0dG9uKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNhbGVuZGFyID0gdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSByZXR1cm4gY2FsZW5kYXI7XG5cbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBsZXQgcG9ydGFsQ29udGFpbmVyID0gdGhpcy5zdGF0ZS5vcGVuID8gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3BvcnRhbFwiXG4gICAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25Qb3J0YWxLZXlEb3dufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjYWxlbmRhcn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UYWJMb29wPlxuICAgICAgKSA6IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnN0YXRlLm9wZW4gJiYgdGhpcy5wcm9wcy5wb3J0YWxJZCkge1xuICAgICAgICBwb3J0YWxDb250YWluZXIgPSAoXG4gICAgICAgICAgPFBvcnRhbFxuICAgICAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgICA8L1BvcnRhbD5cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICAgIHtwb3J0YWxDb250YWluZXJ9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcHBlckNvbXBvbmVudFxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMucG9wcGVyQ2xhc3NOYW1lfVxuICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLndyYXBwZXJDbGFzc05hbWV9XG4gICAgICAgIGhpZGVQb3BwZXI9eyF0aGlzLmlzQ2FsZW5kYXJPcGVuKCl9XG4gICAgICAgIHBvcnRhbElkPXt0aGlzLnByb3BzLnBvcnRhbElkfVxuICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgIHBvcHBlck1vZGlmaWVycz17dGhpcy5wcm9wcy5wb3BwZXJNb2RpZmllcnN9XG4gICAgICAgIHRhcmdldENvbXBvbmVudD17dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICBwb3BwZXJDb250YWluZXI9e3RoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyfVxuICAgICAgICBwb3BwZXJDb21wb25lbnQ9e2NhbGVuZGFyfVxuICAgICAgICBwb3BwZXJQbGFjZW1lbnQ9e3RoaXMucHJvcHMucG9wcGVyUGxhY2VtZW50fVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcG9wcGVyT25LZXlEb3duPXt0aGlzLm9uUG9wcGVyS2V5RG93bn1cbiAgICAgICAgZW5hYmxlVGFiTG9vcD17dGhpcy5wcm9wcy5lbmFibGVUYWJMb29wfVxuICAgICAgICBzaG93QXJyb3c9e3RoaXMucHJvcHMuc2hvd1BvcHBlckFycm93fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUID0gXCJpbnB1dFwiO1xuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgPSBcIm5hdmlnYXRlXCI7XG4iXSwibmFtZXMiOlsiREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSIiwibG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJuZXdEYXRlIiwidmFsdWUiLCJkIiwiU3RyaW5nIiwicGFyc2VJU08iLCJ0b0RhdGUiLCJEYXRlIiwiaXNWYWxpZCIsInBhcnNlRGF0ZSIsImRhdGVGb3JtYXQiLCJsb2NhbGUiLCJzdHJpY3RQYXJzaW5nIiwibWluRGF0ZSIsInBhcnNlZERhdGUiLCJsb2NhbGVPYmplY3QiLCJnZXRMb2NhbGVPYmplY3QiLCJnZXREZWZhdWx0TG9jYWxlIiwic3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2giLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiZGYiLCJ0cnlQYXJzZURhdGUiLCJwYXJzZSIsInVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyIsInVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMiLCJmb3JtYXREYXRlIiwibWF0Y2giLCJtYXAiLCJzdWJzdHJpbmciLCJmaXJzdENoYXJhY3RlciIsImxvbmdGb3JtYXR0ZXIiLCJsb25nRm9ybWF0dGVycyIsImZvcm1hdExvbmciLCJqb2luIiwibGVuZ3RoIiwic2xpY2UiLCJkYXRlIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdFN0ciIsImZvcm1hdCIsImxvY2FsZU9iaiIsImNvbnNvbGUiLCJ3YXJuIiwiY29uY2F0Iiwic2FmZURhdGVGb3JtYXQiLCJfcmVmIiwic2FmZURhdGVSYW5nZUZvcm1hdCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJwcm9wcyIsImZvcm1hdHRlZFN0YXJ0RGF0ZSIsImZvcm1hdHRlZEVuZERhdGUiLCJzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCIsImRhdGVzIiwiZm9ybWF0dGVkRmlyc3REYXRlIiwiZm9ybWF0dGVkU2Vjb25kRGF0ZSIsImV4dHJhRGF0ZXNDb3VudCIsInNldFRpbWUiLCJfcmVmMiIsIl9yZWYyJGhvdXIiLCJob3VyIiwiX3JlZjIkbWludXRlIiwibWludXRlIiwiX3JlZjIkc2Vjb25kIiwic2Vjb25kIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsImdldFdlZWsiLCJnZXRJU09XZWVrIiwiZ2V0RGF5T2ZXZWVrQ29kZSIsImRheSIsImdldFN0YXJ0T2ZEYXkiLCJzdGFydE9mRGF5IiwiZ2V0U3RhcnRPZldlZWsiLCJjYWxlbmRhclN0YXJ0RGF5Iiwic3RhcnRPZldlZWsiLCJ3ZWVrU3RhcnRzT24iLCJnZXRTdGFydE9mTW9udGgiLCJzdGFydE9mTW9udGgiLCJnZXRTdGFydE9mWWVhciIsInN0YXJ0T2ZZZWFyIiwiZ2V0U3RhcnRPZlF1YXJ0ZXIiLCJzdGFydE9mUXVhcnRlciIsImdldFN0YXJ0T2ZUb2RheSIsImdldEVuZE9mV2VlayIsImVuZE9mV2VlayIsImlzU2FtZVllYXIiLCJkYXRlMSIsImRhdGUyIiwiZGZJc1NhbWVZZWFyIiwiaXNTYW1lTW9udGgiLCJkZklzU2FtZU1vbnRoIiwiaXNTYW1lUXVhcnRlciIsImRmSXNTYW1lUXVhcnRlciIsImlzU2FtZURheSIsImRmSXNTYW1lRGF5IiwiaXNFcXVhbCIsImRmSXNFcXVhbCIsImlzRGF5SW5SYW5nZSIsInZhbGlkIiwic3RhcnQiLCJlbmQiLCJlbmRPZkRheSIsImlzV2l0aGluSW50ZXJ2YWwiLCJlcnIiLCJyZWdpc3RlckxvY2FsZSIsImxvY2FsZU5hbWUiLCJsb2NhbGVEYXRhIiwic2NvcGUiLCJ3aW5kb3ciLCJnbG9iYWxUaGlzIiwiX19sb2NhbGVEYXRhX18iLCJzZXREZWZhdWx0TG9jYWxlIiwiX19sb2NhbGVJZF9fIiwibG9jYWxlU3BlYyIsImdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZSIsImZvcm1hdEZ1bmMiLCJnZXRXZWVrZGF5TWluSW5Mb2NhbGUiLCJnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSIsImdldE1vbnRoSW5Mb2NhbGUiLCJtb250aCIsInNldE1vbnRoIiwiZ2V0TW9udGhTaG9ydEluTG9jYWxlIiwiZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUiLCJxdWFydGVyIiwic2V0UXVhcnRlciIsImlzRGF5RGlzYWJsZWQiLCJfcmVmMyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIm1heERhdGUiLCJleGNsdWRlRGF0ZXMiLCJleGNsdWRlRGF0ZUludGVydmFscyIsImluY2x1ZGVEYXRlcyIsImluY2x1ZGVEYXRlSW50ZXJ2YWxzIiwiZmlsdGVyRGF0ZSIsImlzT3V0T2ZCb3VuZHMiLCJzb21lIiwiZXhjbHVkZURhdGUiLCJfcmVmNCIsImluY2x1ZGVEYXRlIiwiX3JlZjUiLCJpc0RheUV4Y2x1ZGVkIiwiX3JlZjYiLCJfcmVmNyIsImlzTW9udGhEaXNhYmxlZCIsIl9yZWY4IiwiZW5kT2ZNb250aCIsImlzTW9udGhJblJhbmdlIiwibSIsInN0YXJ0RGF0ZVllYXIiLCJnZXRZZWFyIiwic3RhcnREYXRlTW9udGgiLCJnZXRNb250aCIsImVuZERhdGVZZWFyIiwiZW5kRGF0ZU1vbnRoIiwiZGF5WWVhciIsImlzUXVhcnRlckRpc2FibGVkIiwiX3JlZjkiLCJpc1llYXJJblJhbmdlIiwieWVhciIsInN0YXJ0WWVhciIsImVuZFllYXIiLCJpc1llYXJEaXNhYmxlZCIsIl9yZWYxMCIsImVuZE9mWWVhciIsImlzUXVhcnRlckluUmFuZ2UiLCJxIiwic3RhcnREYXRlUXVhcnRlciIsImdldFF1YXJ0ZXIiLCJlbmREYXRlUXVhcnRlciIsIl9yZWYxMSIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImlzVGltZUluTGlzdCIsInRpbWUiLCJ0aW1lcyIsImxpc3RUaW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiaXNUaW1lRGlzYWJsZWQiLCJfcmVmMTIiLCJleGNsdWRlVGltZXMiLCJpbmNsdWRlVGltZXMiLCJmaWx0ZXJUaW1lIiwiaXNUaW1lSW5EaXNhYmxlZFJhbmdlIiwiX3JlZjEzIiwibWluVGltZSIsIm1heFRpbWUiLCJFcnJvciIsImJhc2UiLCJiYXNlVGltZSIsIm1pbiIsIm1heCIsIm1vbnRoRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTQiLCJwcmV2aW91c01vbnRoIiwic3ViTW9udGhzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMiLCJldmVyeSIsIm1vbnRoRGlzYWJsZWRBZnRlciIsIl9yZWYxNSIsIm5leHRNb250aCIsImFkZE1vbnRocyIsInllYXJEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNiIsInByZXZpb3VzWWVhciIsInN1YlllYXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyIsInllYXJzRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTciLCJfcmVmMTckeWVhckl0ZW1OdW1iZXIiLCJ5ZWFySXRlbU51bWJlciIsIl9nZXRZZWFyc1BlcmlvZCIsImdldFllYXJzUGVyaW9kIiwiZW5kUGVyaW9kIiwibWluRGF0ZVllYXIiLCJ5ZWFyRGlzYWJsZWRBZnRlciIsIl9yZWYxOCIsIm5leHRZZWFyIiwiYWRkWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQWZ0ZXIiLCJfcmVmMTkiLCJfcmVmMTkkeWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QyIiwic3RhcnRQZXJpb2QiLCJtYXhEYXRlWWVhciIsImdldEVmZmVjdGl2ZU1pbkRhdGUiLCJfcmVmMjAiLCJtaW5EYXRlcyIsImZpbHRlciIsImdldEVmZmVjdGl2ZU1heERhdGUiLCJfcmVmMjEiLCJtYXhEYXRlcyIsImdldEhpZ2h0TGlnaHREYXlzTWFwIiwiaGlnaGxpZ2h0RGF0ZXMiLCJkZWZhdWx0Q2xhc3NOYW1lIiwiZGF0ZUNsYXNzZXMiLCJNYXAiLCJpIiwibGVuIiwib2JqIiwiaXNEYXRlIiwia2V5IiwiY2xhc3NOYW1lc0FyciIsImdldCIsImluY2x1ZGVzIiwicHVzaCIsInNldCIsIl90eXBlb2YiLCJrZXlzIiwiT2JqZWN0IiwiY2xhc3NOYW1lIiwiYXJyT2ZEYXRlcyIsImNvbnN0cnVjdG9yIiwiayIsImFycmF5c0FyZUVxdWFsIiwiYXJyYXkxIiwiYXJyYXkyIiwiaW5kZXgiLCJnZXRIb2xpZGF5c01hcCIsImhvbGlkYXlEYXRlcyIsImhvbGlkYXkiLCJkYXRlT2JqIiwiaG9saWRheU5hbWUiLCJjbGFzc05hbWVzT2JqIiwiaG9saWRheU5hbWVBcnIiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJ0aW1lc1RvSW5qZWN0QWZ0ZXIiLCJjdXJyZW50VGltZSIsImN1cnJlbnRNdWx0aXBsaWVyIiwiaW50ZXJ2YWxzIiwiaW5qZWN0ZWRUaW1lcyIsImwiLCJpbmplY3RlZFRpbWUiLCJhZGRNaW51dGVzIiwiYWRkSG91cnMiLCJuZXh0VGltZSIsImlzQWZ0ZXIiLCJhZGRaZXJvIiwiTWF0aCIsImNlaWwiLCJnZXRIb3Vyc0luRGF5IiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwic3RhcnRPZlRoZU5leHREYXkiLCJyb3VuZCIsInN0YXJ0T2ZNaW51dGUiLCJzZWNvbmRzIiwiZ2V0U2Vjb25kcyIsIm1pbGxpc2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsImdldFRpbWUiLCJpc1NhbWVNaW51dGUiLCJkMSIsImQyIiwiZ2V0TWlkbmlnaHREYXRlIiwiZGF0ZVdpdGhvdXRUaW1lIiwiaXNEYXRlQmVmb3JlIiwiZGF0ZVRvQ29tcGFyZSIsIm1pZG5pZ2h0RGF0ZSIsIm1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSIsImlzU3BhY2VLZXlEb3duIiwiZXZlbnQiLCJTUEFDRV9LRVkiLCJnZW5lcmF0ZVllYXJzIiwibm9PZlllYXIiLCJsaXN0IiwibmV3WWVhciIsImlzSW5SYW5nZSIsIlllYXJEcm9wZG93bk9wdGlvbnMiLCJfUmVhY3QkQ29tcG9uZW50IiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX2RlZmluZVByb3BlcnR5Iiwic2VsZWN0ZWRZZWFyIiwib3B0aW9ucyIsInN0YXRlIiwieWVhcnNMaXN0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwib25DbGljayIsIm9uQ2hhbmdlIiwiYmluZCIsIm1pblllYXIiLCJtYXhZZWFyIiwiZmluZCIsInVuc2hpZnQiLCJpbmNyZW1lbnRZZWFycyIsImRlY3JlbWVudFllYXJzIiwib25DYW5jZWwiLCJhbW91bnQiLCJ5ZWFycyIsInNldFN0YXRlIiwic2hpZnRZZWFycyIsInllYXJEcm9wZG93bkl0ZW1OdW1iZXIiLCJzY3JvbGxhYmxlWWVhckRyb3Bkb3duIiwiZHJvcGRvd25SZWYiLCJjcmVhdGVSZWYiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsImRyb3Bkb3duQ3VycmVudCIsImN1cnJlbnQiLCJkcm9wZG93bkN1cnJlbnRDaGlsZHJlbiIsImNoaWxkcmVuIiwiZnJvbSIsInNlbGVjdGVkWWVhck9wdGlvbkVsIiwiY2hpbGRFbCIsImFyaWFTZWxlY3RlZCIsInNjcm9sbFRvcCIsIm9mZnNldFRvcCIsImNsaWVudEhlaWdodCIsInNjcm9sbEhlaWdodCIsInJlbmRlciIsImRyb3Bkb3duQ2xhc3MiLCJjbHN4IiwicmVmIiwicmVuZGVyT3B0aW9ucyIsIkNvbXBvbmVudCIsIldyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zIiwib25DbGlja091dHNpZGUiLCJZZWFyRHJvcGRvd24iLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJkcm9wZG93blZpc2libGUiLCJlIiwidGFyZ2V0Iiwib25TZWxlY3RDaGFuZ2UiLCJyZW5kZXJTZWxlY3RPcHRpb25zIiwidmlzaWJsZSIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRvZ2dsZURyb3Bkb3duIiwicmVzdWx0IiwicmVuZGVyUmVhZFZpZXciLCJyZW5kZXJEcm9wZG93biIsImFkanVzdERhdGVPbkNoYW5nZSIsImhhbmRsZVllYXJDaGFuZ2UiLCJvblNlbGVjdCIsInNldE9wZW4iLCJyZW5kZXJlZERyb3Bkb3duIiwiZHJvcGRvd25Nb2RlIiwicmVuZGVyU2Nyb2xsTW9kZSIsInJlbmRlclNlbGVjdE1vZGUiLCJNb250aERyb3Bkb3duT3B0aW9ucyIsIm1vbnRoTmFtZXMiLCJpc1NlbGVjdGVkTW9udGgiLCJXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnMiLCJNb250aERyb3Bkb3duIiwiTSIsIl90aGlzMiIsInVzZVNob3J0TW9udGhJbkRyb3Bkb3duIiwidXRpbHMiLCJnZW5lcmF0ZU1vbnRoWWVhcnMiLCJjdXJyRGF0ZSIsImxhc3REYXRlIiwiTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwibW9udGhZZWFyc0xpc3QiLCJtb250aFllYXIiLCJtb250aFllYXJQb2ludCIsImlzU2FtZU1vbnRoWWVhciIsInNjcm9sbGFibGVNb250aFllYXJEcm9wZG93biIsIldyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJNb250aFllYXJEcm9wZG93biIsInRpbWVQb2ludCIsInllYXJNb250aCIsImNoYW5nZWREYXRlIiwicGFyc2VJbnQiLCJEYXkiLCJpc0Rpc2FibGVkIiwib25Nb3VzZUVudGVyIiwiZXZlbnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZU9uS2V5RG93biIsIm90aGVyIiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREIiwiZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24iLCJpc1NlbGVjdGVkRGF0ZSIsInNlbGVjdHNNdWx0aXBsZSIsInNlbGVjdGVkRGF0ZXMiLCJpc1NhbWVEYXlPcldlZWsiLCJzZWxlY3RlZCIsInByZVNlbGVjdGlvbiIsInNob3dXZWVrUGlja2VyIiwiaXNTYW1lV2VlayIsIl90aGlzJHByb3BzIiwiZGF5U3RyIiwiX3RoaXMkcHJvcHMyIiwiaG9saWRheXMiLCJoYXMiLCJfdGhpcyRwcm9wczMiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmciLCJfdGhpcyRwcm9wczQiLCJzZWxlY3RzU3RhcnQiLCJzZWxlY3RzRW5kIiwic2VsZWN0c1JhbmdlIiwic2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UiLCJzZWxlY3RpbmdEYXRlIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMiIsImlzSW5TZWxlY3RpbmdSYW5nZSIsIl90aGlzJHByb3BzNSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzMiLCJfdGhpcyRwcm9wczYiLCJfdGhpcyRwcm9wczciLCJfdGhpcyRwcm9wczgiLCJ3ZWVrZGF5IiwiZ2V0RGF5IiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREMiIsImRheUNsYXNzTmFtZSIsImlzRXhjbHVkZWQiLCJpc1NlbGVjdGVkIiwiaXNLZXlib2FyZFNlbGVjdGVkIiwiaXNSYW5nZVN0YXJ0IiwiaXNSYW5nZUVuZCIsImlzU2VsZWN0aW5nUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nUmFuZ2VFbmQiLCJpc0N1cnJlbnREYXkiLCJpc1dlZWtlbmQiLCJpc0FmdGVyTW9udGgiLCJpc0JlZm9yZU1vbnRoIiwiZ2V0SGlnaExpZ2h0ZWRDbGFzcyIsImdldEhvbGlkYXlzQ2xhc3MiLCJfdGhpcyRwcm9wczkiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCIsIl90aGlzJHByb3BzOSRhcmlhTGFiZTIiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQiLCJwcmVmaXgiLCJfdGhpcyRwcm9wczEwIiwiX3RoaXMkcHJvcHMxMCRob2xpZGF5IiwiY29tcGFyZUR0IiwidGl0bGVzIiwiYXBwbHkiLCJob2xpZGF5TmFtZXMiLCJtZXNzYWdlIiwic2VsZWN0ZWREYXkiLCJwcmVTZWxlY3Rpb25EYXkiLCJ0YWJJbmRleCIsInNob3dXZWVrTnVtYmVyIiwiaXNTdGFydE9mV2VlayIsIl90aGlzJGRheUVsJGN1cnJlbnQiLCJwcmV2UHJvcHMiLCJzaG91bGRGb2N1c0RheSIsImdldFRhYkluZGV4IiwiaXNJbnB1dEZvY3VzZWQiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJib2R5IiwiaW5saW5lIiwic2hvdWxkRm9jdXNEYXlJbmxpbmUiLCJjb250YWluZXJSZWYiLCJjb250YWlucyIsImNsYXNzTGlzdCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kIiwibW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCIsImRheUVsIiwiZm9jdXMiLCJwcmV2ZW50U2Nyb2xsIiwicmVuZGVyRGF5Q29udGVudHMiLCJnZXRDbGFzc05hbWVzIiwib25LZXlEb3duIiwiaGFuZGxlQ2xpY2siLCJ1c2VQb2ludGVyRXZlbnQiLCJoYW5kbGVNb3VzZUVudGVyIiwib25Qb2ludGVyRW50ZXIiLCJnZXRBcmlhTGFiZWwiLCJyb2xlIiwidGl0bGUiLCJnZXRUaXRsZSIsImhhbmRsZUZvY3VzRGF5IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiV2Vla051bWJlciIsInNob3VsZEZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXJFbCIsImhhbmRsZUZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXIiLCJfdGhpcyRwcm9wcyRhcmlhTGFiZWwiLCJhcmlhTGFiZWxQcmVmaXgiLCJ3ZWVrTnVtYmVyQ2xhc3NlcyIsIldlZWsiLCJvbkRheUNsaWNrIiwib25EYXlNb3VzZUVudGVyIiwib25XZWVrU2VsZWN0IiwiaGFuZGxlRGF5Q2xpY2siLCJzaG91bGRDbG9zZU9uU2VsZWN0IiwiZm9ybWF0V2Vla051bWJlciIsImRheXMiLCJvbkNsaWNrQWN0aW9uIiwiaGFuZGxlV2Vla0NsaWNrIiwib2Zmc2V0IiwiYWRkRGF5cyIsImNob29zZURheUFyaWFMYWJlbFByZWZpeCIsImRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4IiwidmFsdWVPZiIsImhhbmRsZURheU1vdXNlRW50ZXIiLCJyZW5kZXJEYXlzIiwiRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQiLCJNT05USF9DT0xVTU5TX0xBWU9VVCIsIlRXT19DT0xVTU5TIiwiVEhSRUVfQ09MVU1OUyIsIkZPVVJfQ09MVU1OUyIsIk1PTlRIX0NPTFVNTlMiLCJncmlkIiwidmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0IiwiTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCIsImdldE1vbnRoQ29sdW1uc0xheW91dCIsInNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyIiwic2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlciIsIk1vbnRoIiwib3JkZXJJbkRpc3BsYXkiLCJvbk1vdXNlTGVhdmUiLCJpc0luU2VsZWN0aW5nUmFuZ2VNb250aCIsIl9tb250aCIsIl90aGlzJHByb3BzJHNlbGVjdGluZzQiLCJ3ZWVrcyIsImlzRml4ZWRIZWlnaHQiLCJmaXhlZEhlaWdodCIsImJyZWFrQWZ0ZXJOZXh0UHVzaCIsImN1cnJlbnRXZWVrU3RhcnQiLCJ3ZWVrQXJpYUxhYmVsUHJlZml4Iiwic2hvd1dlZWtOdW1iZXJzIiwiaXNGaXhlZEFuZEZpbmFsV2VlayIsImlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoIiwiaXNXZWVrSW5Nb250aCIsInBlZWtOZXh0TW9udGgiLCJsYWJlbERhdGUiLCJuZXdNb250aCIsInNldFByZVNlbGVjdGlvbiIsIk1PTlRIX1JFRlMiLCJoYW5kbGVPbk1vbnRoS2V5RG93biIsIm1vbnRoQ29sdW1uc0xheW91dCIsInZlcnRpY2FsT2Zmc2V0IiwibW9udGhzR3JpZCIsIm9uTW9udGhDbGljayIsImhhbmRsZU1vbnRoTmF2aWdhdGlvbiIsIm5ld1F1YXJ0ZXIiLCJRVUFSVEVSX1JFRlMiLCJvblF1YXJ0ZXJDbGljayIsImhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uIiwibW9udGhDbGFzc05hbWUiLCJfbW9udGhDbGFzc05hbWUiLCJpc1JhbmdlU3RhcnRNb250aCIsImlzUmFuZ2VFbmRNb250aCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0IiwiaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kIiwiaXNDdXJyZW50TW9udGgiLCJwcmVTZWxlY3RlZE1vbnRoIiwicHJlU2VsZWN0ZWRRdWFydGVyIiwiX3RoaXMkcHJvcHMxMSIsIl90aGlzJHByb3BzMTEkY2hvb3NlRCIsIl90aGlzJHByb3BzMTEkZGlzYWJsZSIsIl90aGlzJHByb3BzMTIiLCJpc1NlbGVjdGVkUXVhcnRlciIsImlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIiLCJpc1JhbmdlU3RhcnRRdWFydGVyIiwiaXNSYW5nZUVuZFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczEzIiwic2hvd0Z1bGxNb250aFllYXJQaWNrZXIiLCJyZW5kZXJNb250aENvbnRlbnQiLCJzaG9ydE1vbnRoVGV4dCIsImZ1bGxNb250aFRleHQiLCJfdGhpcyRwcm9wczE0IiwicmVuZGVyUXVhcnRlckNvbnRlbnQiLCJzaG9ydFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczE1IiwibW9udGhDb2x1bW5zIiwiaiIsImV2Iiwib25Nb250aEtleURvd24iLCJvbk1vbnRoTW91c2VFbnRlciIsImdldE1vbnRoQ2xhc3NOYW1lcyIsImdldE1vbnRoQ29udGVudCIsIl90aGlzJHByb3BzMTYiLCJxdWFydGVycyIsIm9uUXVhcnRlcktleURvd24iLCJvblF1YXJ0ZXJNb3VzZUVudGVyIiwiZ2V0UXVhcnRlckNsYXNzTmFtZXMiLCJnZXRRdWFydGVyVGFiSW5kZXgiLCJpc0N1cnJlbnRRdWFydGVyIiwiZ2V0UXVhcnRlckNvbnRlbnQiLCJfdGhpcyRwcm9wczE3Iiwic2hvd01vbnRoWWVhclBpY2tlciIsInNob3dRdWFydGVyWWVhclBpY2tlciIsIl90aGlzJHByb3BzMTgiLCJfdGhpcyRwcm9wczE4JGFyaWFMYWIiLCJmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXgiLCJ0cmltIiwiaGFuZGxlTW91c2VMZWF2ZSIsIm9uUG9pbnRlckxlYXZlIiwicmVuZGVyTW9udGhzIiwicmVuZGVyUXVhcnRlcnMiLCJyZW5kZXJXZWVrcyIsIlRpbWUiLCJoZWlnaHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjZW50ZXJMaSIsImNhbGNDZW50ZXJQb3NpdGlvbiIsIm1vbnRoUmVmIiwiaGVhZGVyIiwiY2xhc3NlcyIsInRpbWVDbGFzc05hbWUiLCJpc1NlbGVjdGVkVGltZSIsImlzRGlzYWJsZWRUaW1lIiwiaW5qZWN0VGltZXMiLCJwcmV2aW91c1NpYmxpbmciLCJuZXh0U2libGluZyIsImFjdGl2ZURhdGUiLCJvcGVuVG9EYXRlIiwic29ydGVkSW5qZWN0VGltZXMiLCJzb3J0IiwiYSIsImIiLCJtaW51dGVzSW5EYXkiLCJtdWx0aXBsaWVyIiwidGltZXNUb0luamVjdCIsInRpbWVUb0ZvY3VzIiwicmVkdWNlIiwicHJldiIsImxpQ2xhc3NlcyIsImxpIiwic2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUiLCJ0b2RheUJ1dHRvbiIsInNob3dUaW1lU2VsZWN0T25seSIsInRpbWVDYXB0aW9uIiwicmVuZGVyVGltZXMiLCJvblRpbWVDaGFuZ2UiLCJsaXN0SGVpZ2h0IiwiY2VudGVyTGlSZWYiLCJZZWFyIiwicmVmSW5kZXgiLCJ3YWl0Rm9yUmVSZW5kZXIiLCJZRUFSX1JFRlMiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QiLCJ1cGRhdGVGb2N1c09uUGFnaW5hdGUiLCJ5IiwiX3llYXIiLCJoYW5kbGVZZWFyQ2xpY2siLCJvblllYXJDbGljayIsImhhbmRsZVllYXJOYXZpZ2F0aW9uIiwieWVhckNsYXNzTmFtZSIsImlzQ3VycmVudFllYXIiLCJwcmVTZWxlY3RlZCIsInJlbmRlclllYXJDb250ZW50Iiwib25ZZWFyTW91c2VFbnRlciIsIm9uWWVhck1vdXNlTGVhdmUiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QyIiwiX2xvb3AiLCJvblllYXJLZXlEb3duIiwiZ2V0WWVhclRhYkluZGV4IiwiZ2V0WWVhckNsYXNzTmFtZXMiLCJnZXRZZWFyQ29udGVudCIsImdldFllYXJDb250YWluZXJDbGFzc05hbWVzIiwiY2xlYXJTZWxlY3RpbmdEYXRlIiwiaW5wdXRUaW1lIiwicHJvcERhdGUiLCJpc1Byb3BEYXRlVmFsaWQiLCJpc05hTiIsInNwbGl0IiwidGltZVN0cmluZyIsImN1c3RvbVRpbWVJbnB1dCIsImNsb25lRWxlbWVudCIsInR5cGUiLCJwbGFjZWhvbGRlciIsIm5hbWUiLCJyZXF1aXJlZCIsInRpbWVJbnB1dExhYmVsIiwicmVuZGVyVGltZUlucHV0IiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwiQ2FsZW5kYXJDb250YWluZXIiLCJfcmVmJHNob3dUaW1lU2VsZWN0T24iLCJfcmVmJHNob3dUaW1lIiwic2hvd1RpbWUiLCJhcmlhTGFiZWwiLCJEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTIiwiaXNEcm9wZG93blNlbGVjdCIsImVsZW1lbnQiLCJjbGFzc05hbWVzIiwidGVzdENsYXNzbmFtZSIsImluZGV4T2YiLCJDYWxlbmRhciIsIm9uRHJvcGRvd25Gb2N1cyIsImluaXRpYWxEYXRlIiwiaGFuZGxlTW9udGhDaGFuZ2UiLCJtb250aFNlbGVjdGVkSW4iLCJvbk1vbnRoTW91c2VMZWF2ZSIsInNldFllYXIiLCJvblllYXJDaGFuZ2UiLCJpc1JlbmRlckFyaWFMaXZlTWVzc2FnZSIsImhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlIiwib25Nb250aENoYW5nZSIsImhhbmRsZU1vbnRoWWVhckNoYW5nZSIsImRheU5hbWVzIiwid2Vla0xhYmVsIiwid2Vla0RheU5hbWUiLCJmb3JtYXRXZWVrZGF5Iiwid2Vla0RheUNsYXNzTmFtZSIsImZvcm1hdFdlZWtEYXkiLCJ1c2VXZWVrZGF5c1Nob3J0Iiwic2hvd1llYXJQaWNrZXIiLCJyZW5kZXJDdXN0b21IZWFkZXIiLCJhbGxQcmV2RGF5c0Rpc2FibGVkIiwiZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uIiwic2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uIiwiaWNvbkNsYXNzZXMiLCJjbGlja0hhbmRsZXIiLCJkZWNyZWFzZU1vbnRoIiwiZGVjcmVhc2VZZWFyIiwiaXNGb3JZZWFyIiwicHJldmlvdXNNb250aEJ1dHRvbkxhYmVsIiwicHJldmlvdXNZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMiLCJwcmV2aW91c01vbnRoQXJpYUxhYmVsIiwiX3RoaXMkcHJvcHMzJHByZXZpb3VzMiIsInByZXZpb3VzWWVhckFyaWFMYWJlbCIsImFsbE5leHREYXlzRGlzYWJsZWQiLCJzaG93VGltZVNlbGVjdCIsImluY3JlYXNlTW9udGgiLCJpbmNyZWFzZVllYXIiLCJuZXh0TW9udGhCdXR0b25MYWJlbCIsIm5leHRZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dE1vbnQiLCJuZXh0TW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dFllYXIiLCJuZXh0WWVhckFyaWFMYWJlbCIsInNob3dZZWFyRHJvcGRvd24iLCJzaG93TW9udGhEcm9wZG93biIsInNob3dNb250aFllYXJEcm9wZG93biIsIm92ZXJyaWRlSGlkZSIsImNoYW5nZVllYXIiLCJjaGFuZ2VNb250aCIsImNoYW5nZU1vbnRoWWVhciIsImhhbmRsZVRvZGF5QnV0dG9uQ2xpY2siLCJtb250aERhdGUiLCJyZW5kZXJDdXJyZW50TW9udGgiLCJvbkZvY3VzIiwiaGFuZGxlRHJvcGRvd25Gb2N1cyIsInJlbmRlck1vbnRoRHJvcGRvd24iLCJyZW5kZXJNb250aFllYXJEcm9wZG93biIsInJlbmRlclllYXJEcm9wZG93biIsImhlYWRlckFyZ3MiLCJtb250aENvbnRhaW5lciIsInByZXZNb250aEJ1dHRvbkRpc2FibGVkIiwibmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQiLCJwcmV2WWVhckJ1dHRvbkRpc2FibGVkIiwibmV4dFllYXJCdXR0b25EaXNhYmxlZCIsInNob3dEYXlOYW1lcyIsIl9vYmplY3RTcHJlYWQiLCJjdXN0b21IZWFkZXJDb3VudCIsInJlbmRlclllYXJIZWFkZXIiLCJyZW5kZXJEZWZhdWx0SGVhZGVyIiwiX3RoaXMkcHJvcHMkbW9udGhTZWxlIiwibW9udGhMaXN0IiwibW9udGhzVG9TdWJ0cmFjdCIsInNob3dQcmV2aW91c01vbnRocyIsIm1vbnRoc1Nob3duIiwiZnJvbU1vbnRoRGF0ZSIsIm1vbnRoc1RvQWRkIiwibW9udGhLZXkiLCJkaXYiLCJyZW5kZXJIZWFkZXIiLCJtb250aEFyaWFMYWJlbFByZWZpeCIsImhhbmRsZU9uRGF5S2V5RG93biIsImhhbmRsZU1vbnRoTW91c2VMZWF2ZSIsIl9leHRlbmRzIiwiaGFuZGxlWWVhck1vdXNlRW50ZXIiLCJoYW5kbGVZZWFyTW91c2VMZWF2ZSIsInRpbWVGb3JtYXQiLCJ0aW1lSW50ZXJ2YWxzIiwid2l0aFBvcnRhbCIsInRpbWVWYWxpZCIsIkJvb2xlYW4iLCJzaG93VGltZUlucHV0IiwiSW5wdXRUaW1lIiwiYXJpYUxpdmVNZXNzYWdlIiwiZ2V0RGF0ZUluVmlldyIsImFzc2lnbk1vbnRoQ29udGFpbmVyIiwiX3RoaXMzIiwiaGFzTW9udGhDaGFuZ2VkIiwiQ29udGFpbmVyIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInJlbmRlckFyaWFMaXZlUmVnaW9uIiwicmVuZGVyUHJldmlvdXNCdXR0b24iLCJyZW5kZXJOZXh0QnV0dG9uIiwicmVuZGVyWWVhcnMiLCJyZW5kZXJUb2RheUJ1dHRvbiIsInJlbmRlclRpbWVTZWN0aW9uIiwicmVuZGVySW5wdXRUaW1lU2VjdGlvbiIsInJlbmRlckNoaWxkcmVuIiwiQ2FsZW5kYXJJY29uIiwiaWNvbiIsIl9yZWYkY2xhc3NOYW1lIiwiZGVmYXVsdENsYXNzIiwiaXNWYWxpZEVsZW1lbnQiLCJ4bWxucyIsInZpZXdCb3giLCJQb3J0YWwiLCJlbCIsInBvcnRhbFJvb3QiLCJwb3J0YWxIb3N0IiwiZ2V0RWxlbWVudEJ5SWQiLCJwb3J0YWxJZCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVDaGlsZCIsIlJlYWN0RE9NIiwiY3JlYXRlUG9ydGFsIiwiZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciIsImZvY3VzYWJsZUZpbHRlciIsIm5vZGUiLCJkaXNhYmxlZCIsIlRhYkxvb3AiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFiTG9vcFJlZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YWJDaGlsZHJlbiIsImdldFRhYkNoaWxkcmVuIiwiZW5hYmxlVGFiTG9vcCIsImhhbmRsZUZvY3VzU3RhcnQiLCJoYW5kbGVGb2N1c0VuZCIsIndpdGhGbG9hdGluZyIsIldpdGhGbG9hdGluZyIsImFsdF9wcm9wcyIsInBvcHBlck1vZGlmaWVycyIsInBvcHBlclByb3BzIiwiaGlkZVBvcHBlciIsImFycm93UmVmIiwidXNlUmVmIiwiZmxvYXRpbmdQcm9wcyIsInVzZUZsb2F0aW5nIiwib3BlbiIsIndoaWxlRWxlbWVudHNNb3VudGVkIiwiYXV0b1VwZGF0ZSIsInBsYWNlbWVudCIsInBvcHBlclBsYWNlbWVudCIsIm1pZGRsZXdhcmUiLCJmbGlwIiwicGFkZGluZyIsImFycm93IiwiUG9wcGVyQ29tcG9uZW50Iiwid3JhcHBlckNsYXNzTmFtZSIsInBvcHBlckNvbXBvbmVudCIsInRhcmdldENvbXBvbmVudCIsInBvcHBlck9uS2V5RG93biIsInNob3dBcnJvdyIsInBvcHBlciIsInJlZnMiLCJzZXRGbG9hdGluZyIsImZsb2F0aW5nU3R5bGVzIiwiRmxvYXRpbmdBcnJvdyIsImNvbnRleHQiLCJmaWxsIiwic3Ryb2tlV2lkdGgiLCJ3aWR0aCIsInRyYW5zZm9ybSIsInBvcHBlckNvbnRhaW5lciIsIndyYXBwZXJDbGFzc2VzIiwiRnJhZ21lbnQiLCJzZXRSZWZlcmVuY2UiLCJvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyIsIldyYXBwZWRDYWxlbmRhciIsImhhc1ByZVNlbGVjdGlvbkNoYW5nZWQiLCJJTlBVVF9FUlJfMSIsIkRhdGVQaWNrZXIiLCJfdGhpcyRwcm9wcyRob2xpZGF5cyIsImFjY3VtdWxhdG9yIiwiZGVmYXVsdFByZVNlbGVjdGlvbiIsImdldFByZVNlbGVjdGlvbiIsImJvdW5kZWRQcmVTZWxlY3Rpb24iLCJzdGFydE9wZW4iLCJwcmV2ZW50Rm9jdXMiLCJmb2N1c2VkIiwicHJldmVudEZvY3VzVGltZW91dCIsImNsZWFyVGltZW91dCIsImlucHV0IiwiYmx1ciIsImNhbmNlbEZvY3VzSW5wdXQiLCJza2lwU2V0Qmx1ciIsImNhbGNJbml0aWFsU3RhdGUiLCJsYXN0UHJlU2VsZWN0Q2hhbmdlIiwiUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUiLCJzZXRCbHVyIiwiaW5wdXRWYWx1ZSIsInJlYWRPbmx5IiwicHJldmVudE9wZW5PbkZvY3VzIiwiY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0Iiwic2V0VGltZW91dCIsInNldEZvY3VzIiwiaW5wdXRGb2N1c1RpbWVvdXQiLCJvbkJsdXIiLCJhbGxBcmdzIiwib25DaGFuZ2VSYXciLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCIsImhvdXJzIiwibWludXRlcyIsInNldFNlbGVjdGVkIiwic2VuZEZvY3VzQmFja1RvSW5wdXQiLCJzaG93RGF0ZVNlbGVjdCIsImtlZXBJbnB1dCIsImFsbG93U2FtZURheSIsImZvY3VzU2VsZWN0ZWRNb250aCIsIm5vUmFuZ2VzIiwiaGFzU3RhcnRSYW5nZSIsImlzUmFuZ2VGaWxsZWQiLCJpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkIiwic2VsZWN0ZWREYXRlIiwibmV4dERhdGVzIiwiaGFzTWluRGF0ZSIsImhhc01heERhdGUiLCJpc1ZhbGlkRGF0ZVNlbGVjdGlvbiIsImRhdGVTdGFydE9mRGF5IiwibWluRGF0ZVN0YXJ0T2ZEYXkiLCJtYXhEYXRlRW5kT2ZEYXkiLCJvbklucHV0Q2xpY2siLCJzZWxlY3RvclN0cmluZyIsInNlbGVjdGVkSXRlbSIsImNhbGVuZGFyIiwiY29tcG9uZW50Tm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjb3B5IiwiaW5wdXRPayIsImhhbmRsZVNlbGVjdCIsIm9uSW5wdXRFcnJvciIsImNvZGUiLCJtc2ciLCJpc1NoaWZ0S2V5QWN0aXZlIiwic2hpZnRLZXkiLCJuZXdTZWxlY3Rpb24iLCJzdWJXZWVrcyIsInN1YkRheXMiLCJhZGRXZWVrcyIsInByZXZNb250aCIsInByZXZZZWFyIiwib25DbGVhckNsaWNrIiwiY2xvc2VPblNjcm9sbCIsImRvY3VtZW50RWxlbWVudCIsImlzQ2FsZW5kYXJPcGVuIiwiZWxlbSIsImRhdGVGb3JtYXRDYWxlbmRhciIsImhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlIiwibW9kaWZ5SG9saWRheXMiLCJoYW5kbGVUaW1lQ2hhbmdlIiwiY2FsZW5kYXJDbGFzc05hbWUiLCJjYWxlbmRhckNvbnRhaW5lciIsImV4Y2x1ZGVTY3JvbGxiYXIiLCJvbkRheUtleURvd24iLCJpc0NvbnRhaW5zVGltZSIsImxvbmdEYXRlRm9ybWF0IiwiX1JlYWN0JGNsb25lRWxlbWVudCIsImN1c3RvbUlucHV0IiwiY3VzdG9tSW5wdXRSZWYiLCJoYW5kbGVCbHVyIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlRm9jdXMiLCJvbklucHV0S2V5RG93biIsImlkIiwiZm9ybSIsImF1dG9Gb2N1cyIsInBsYWNlaG9sZGVyVGV4dCIsImF1dG9Db21wbGV0ZSIsImFyaWFEZXNjcmliZWRCeSIsImFyaWFJbnZhbGlkIiwiYXJpYUxhYmVsbGVkQnkiLCJhcmlhUmVxdWlyZWQiLCJpc0NsZWFyYWJsZSIsImNsZWFyQnV0dG9uVGl0bGUiLCJfdGhpcyRwcm9wczQkY2xlYXJCdXQiLCJjbGVhckJ1dHRvbkNsYXNzTmFtZSIsIl90aGlzJHByb3BzNCRhcmlhTGFiZSIsImFyaWFMYWJlbENsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU2Nyb2xsIiwicHJldlN0YXRlIiwib25DYWxlbmRhck9wZW4iLCJvbkNhbGVuZGFyQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVySW5wdXRDb250YWluZXIiLCJzaG93SWNvbiIsImNhbGVuZGFySWNvbkNsYXNzbmFtZSIsInRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2siLCJ0b2dnbGVDYWxlbmRhciIsInJlbmRlckRhdGVJbnB1dCIsInJlbmRlckNsZWFyQnV0dG9uIiwicmVuZGVyQ2FsZW5kYXIiLCJwb3J0YWxDb250YWluZXIiLCJvblBvcnRhbEtleURvd24iLCJwb3BwZXJDbGFzc05hbWUiLCJvblBvcHBlcktleURvd24iLCJzaG93UG9wcGVyQXJyb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeURPLElBQU1BLHdCQUF3QixHQUFHLEVBQUUsQ0FBQTs7RUFFMUM7RUFDQTtFQUNBLElBQU1DLDBCQUEwQixHQUFHLG1DQUFtQyxDQUFBOztFQUV0RTs7RUFFTyxTQUFTQyxPQUFPQSxDQUFDQyxLQUFLLEVBQUU7SUFDN0IsSUFBTUMsQ0FBQyxHQUFHRCxLQUFLLEdBQ1gsT0FBT0EsS0FBSyxLQUFLLFFBQVEsSUFBSUEsS0FBSyxZQUFZRSxNQUFNLEdBQ2xEQyxpQkFBUSxDQUFDSCxLQUFLLENBQUMsR0FDZkksYUFBTSxDQUFDSixLQUFLLENBQUMsR0FDZixJQUFJSyxJQUFJLEVBQUUsQ0FBQTtFQUNkLEVBQUEsT0FBT0MsT0FBTyxDQUFDTCxDQUFDLENBQUMsR0FBR0EsQ0FB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
