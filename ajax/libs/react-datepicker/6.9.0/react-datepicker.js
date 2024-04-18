/*!
  react-datepicker v6.9.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('clsx'), require('date-fns/isDate'), require('date-fns/isValid'), require('date-fns/format'), require('date-fns/addMinutes'), require('date-fns/addHours'), require('date-fns/addDays'), require('date-fns/addWeeks'), require('date-fns/addMonths'), require('date-fns/addQuarters'), require('date-fns/addYears'), require('date-fns/subDays'), require('date-fns/subWeeks'), require('date-fns/subMonths'), require('date-fns/subQuarters'), require('date-fns/subYears'), require('date-fns/getSeconds'), require('date-fns/getMinutes'), require('date-fns/getHours'), require('date-fns/getDay'), require('date-fns/getDate'), require('date-fns/getISOWeek'), require('date-fns/getMonth'), require('date-fns/getQuarter'), require('date-fns/getYear'), require('date-fns/getTime'), require('date-fns/setSeconds'), require('date-fns/setMinutes'), require('date-fns/setHours'), require('date-fns/setMonth'), require('date-fns/setQuarter'), require('date-fns/setYear'), require('date-fns/min'), require('date-fns/max'), require('date-fns/differenceInCalendarDays'), require('date-fns/differenceInCalendarMonths'), require('date-fns/differenceInCalendarYears'), require('date-fns/differenceInCalendarQuarters'), require('date-fns/startOfDay'), require('date-fns/startOfWeek'), require('date-fns/startOfMonth'), require('date-fns/startOfQuarter'), require('date-fns/startOfYear'), require('date-fns/endOfDay'), require('date-fns/endOfWeek'), require('date-fns/endOfMonth'), require('date-fns/endOfYear'), require('date-fns/isEqual'), require('date-fns/isSameDay'), require('date-fns/isSameMonth'), require('date-fns/isSameYear'), require('date-fns/isSameQuarter'), require('date-fns/isAfter'), require('date-fns/isBefore'), require('date-fns/isWithinInterval'), require('date-fns/toDate'), require('date-fns/parse'), require('date-fns/parseISO'), require('date-fns'), require('react-onclickoutside'), require('react-dom'), require('@floating-ui/react'), require('date-fns/set')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'clsx', 'date-fns/isDate', 'date-fns/isValid', 'date-fns/format', 'date-fns/addMinutes', 'date-fns/addHours', 'date-fns/addDays', 'date-fns/addWeeks', 'date-fns/addMonths', 'date-fns/addQuarters', 'date-fns/addYears', 'date-fns/subDays', 'date-fns/subWeeks', 'date-fns/subMonths', 'date-fns/subQuarters', 'date-fns/subYears', 'date-fns/getSeconds', 'date-fns/getMinutes', 'date-fns/getHours', 'date-fns/getDay', 'date-fns/getDate', 'date-fns/getISOWeek', 'date-fns/getMonth', 'date-fns/getQuarter', 'date-fns/getYear', 'date-fns/getTime', 'date-fns/setSeconds', 'date-fns/setMinutes', 'date-fns/setHours', 'date-fns/setMonth', 'date-fns/setQuarter', 'date-fns/setYear', 'date-fns/min', 'date-fns/max', 'date-fns/differenceInCalendarDays', 'date-fns/differenceInCalendarMonths', 'date-fns/differenceInCalendarYears', 'date-fns/differenceInCalendarQuarters', 'date-fns/startOfDay', 'date-fns/startOfWeek', 'date-fns/startOfMonth', 'date-fns/startOfQuarter', 'date-fns/startOfYear', 'date-fns/endOfDay', 'date-fns/endOfWeek', 'date-fns/endOfMonth', 'date-fns/endOfYear', 'date-fns/isEqual', 'date-fns/isSameDay', 'date-fns/isSameMonth', 'date-fns/isSameYear', 'date-fns/isSameQuarter', 'date-fns/isAfter', 'date-fns/isBefore', 'date-fns/isWithinInterval', 'date-fns/toDate', 'date-fns/parse', 'date-fns/parseISO', 'date-fns', 'react-onclickoutside', 'react-dom', '@floating-ui/react', 'date-fns/set'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DatePicker = {}, global.React, global.PropTypes, global.clsx, global.isDate, global.isValid$1, global.format, global.addMinutes, global.addHours, global.addDays, global.addWeeks, global.addMonths, global.addQuarters, global.addYears, global.subDays, global.subWeeks, global.subMonths, global.subQuarters, global.subYears, global.getSeconds, global.getMinutes, global.getHours, global.getDay, global.getDate, global.getISOWeek, global.getMonth, global.getQuarter, global.getYear, global.getTime, global.setSeconds, global.setMinutes, global.setHours, global.setMonth, global.setQuarter, global.setYear, global.min, global.max, global.differenceInCalendarDays, global.differenceInCalendarMonths, global.differenceInCalendarYears, global.differenceInCalendarQuarters, global.startOfDay, global.startOfWeek, global.startOfMonth, global.startOfQuarter, global.startOfYear, global.endOfDay, global.endOfWeek, global.endOfMonth, global.endOfYear, global.isEqual$1, global.isSameDay$1, global.isSameMonth$1, global.isSameYear$1, global.isSameQuarter$1, global.isAfter, global.isBefore, global.isWithinInterval, global.toDate, global.parse, global.parseISO, global.dateFns, global.onClickOutside, global.ReactDOM, global.react, global.set));
})(this, (function (exports, React, propTypes, clsx, isDate, isValid$1, format, addMinutes, addHours, addDays, addWeeks, addMonths, addQuarters, addYears, subDays, subWeeks, subMonths, subQuarters, subYears, getSeconds, getMinutes, getHours, getDay, getDate, getISOWeek, getMonth, getQuarter, getYear, getTime, setSeconds, setMinutes, setHours, setMonth, setQuarter, setYear, min, max, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, differenceInCalendarQuarters, startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear, isEqual$1, isSameDay$1, isSameMonth$1, isSameYear$1, isSameQuarter$1, isAfter, isBefore, isWithinInterval, toDate, parse, parseISO, dateFns, onClickOutside, ReactDOM, react, set) { 'use strict';

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
      return getHours.getHours(listTime) === getHours.getHours(time) && getMinutes.getMinutes(listTime) === getMinutes.getMinutes(time) && getSeconds.getSeconds(listTime) === getSeconds.getSeconds(time);
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
  function quarterDisabledBefore(date) {
    var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref16.minDate,
      includeDates = _ref16.includeDates;
    var firstDateOfYear = startOfYear.startOfYear(date);
    var previousQuarter = subQuarters.subQuarters(firstDateOfYear, 1);
    return minDate && differenceInCalendarQuarters.differenceInCalendarQuarters(minDate, previousQuarter) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarQuarters.differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
    }) || false;
  }
  function quarterDisabledAfter(date) {
    var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref17.maxDate,
      includeDates = _ref17.includeDates;
    var lastDateOfYear = endOfYear.endOfYear(date);
    var nextQuarter = addQuarters.addQuarters(lastDateOfYear, 1);
    return maxDate && differenceInCalendarQuarters.differenceInCalendarQuarters(nextQuarter, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarQuarters.differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
    }) || false;
  }
  function yearDisabledBefore(day) {
    var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref18.minDate,
      includeDates = _ref18.includeDates;
    var previousYear = subYears.subYears(day, 1);
    return minDate && differenceInCalendarYears.differenceInCalendarYears(minDate, previousYear) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarYears.differenceInCalendarYears(includeDate, previousYear) > 0;
    }) || false;
  }
  function yearsDisabledBefore(day) {
    var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref19.minDate,
      _ref19$yearItemNumber = _ref19.yearItemNumber,
      yearItemNumber = _ref19$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref19$yearItemNumber;
    var previousYear = getStartOfYear(subYears.subYears(day, yearItemNumber));
    var _getYearsPeriod = getYearsPeriod(previousYear, yearItemNumber),
      endPeriod = _getYearsPeriod.endPeriod;
    var minDateYear = minDate && getYear.getYear(minDate);
    return minDateYear && minDateYear > endPeriod || false;
  }
  function yearDisabledAfter(day) {
    var _ref20 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref20.maxDate,
      includeDates = _ref20.includeDates;
    var nextYear = addYears.addYears(day, 1);
    return maxDate && differenceInCalendarYears.differenceInCalendarYears(nextYear, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
      return differenceInCalendarYears.differenceInCalendarYears(nextYear, includeDate) > 0;
    }) || false;
  }
  function yearsDisabledAfter(day) {
    var _ref21 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref21.maxDate,
      _ref21$yearItemNumber = _ref21.yearItemNumber,
      yearItemNumber = _ref21$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref21$yearItemNumber;
    var nextYear = addYears.addYears(day, yearItemNumber);
    var _getYearsPeriod2 = getYearsPeriod(nextYear, yearItemNumber),
      startPeriod = _getYearsPeriod2.startPeriod;
    var maxDateYear = maxDate && getYear.getYear(maxDate);
    return maxDateYear && maxDateYear < startPeriod || false;
  }
  function getEffectiveMinDate(_ref22) {
    var minDate = _ref22.minDate,
      includeDates = _ref22.includeDates;
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
  function getEffectiveMaxDate(_ref23) {
    var maxDate = _ref23.maxDate,
      includeDates = _ref23.includeDates;
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
      var injectedTime = startOfDay;
      injectedTime = addHours.addHours(injectedTime, getHours.getHours(injectedTimes[i]));
      injectedTime = addMinutes.addMinutes(injectedTime, getMinutes.getMinutes(injectedTimes[i]));
      injectedTime = dateFns.addSeconds(injectedTime, getSeconds.getSeconds(injectedTimes[i]));
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
      _defineProperty(_this, "isMonthDisabled", function (month) {
        var _this$props10 = _this.props,
          day = _this$props10.day,
          minDate = _this$props10.minDate,
          maxDate = _this$props10.maxDate,
          excludeDates = _this$props10.excludeDates,
          includeDates = _this$props10.includeDates;
        var labelDate = setMonth.setMonth(day, month);
        return (minDate || maxDate || excludeDates || includeDates) && isMonthDisabled(labelDate, _this.props);
      });
      _defineProperty(_this, "getMonthClassNames", function (m) {
        var _this$props11 = _this.props,
          day = _this$props11.day,
          startDate = _this$props11.startDate,
          endDate = _this$props11.endDate,
          selected = _this$props11.selected,
          preSelection = _this$props11.preSelection,
          monthClassName = _this$props11.monthClassName;
        var _monthClassName = monthClassName ? monthClassName(setMonth.setMonth(day, m)) : undefined;
        return clsx.clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
          "react-datepicker__month-text--disabled": _this.isMonthDisabled(m),
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
        var _this$props12 = _this.props,
          _this$props12$chooseD = _this$props12.chooseDayAriaLabelPrefix,
          chooseDayAriaLabelPrefix = _this$props12$chooseD === void 0 ? "Choose" : _this$props12$chooseD,
          _this$props12$disable = _this$props12.disabledDayAriaLabelPrefix,
          disabledDayAriaLabelPrefix = _this$props12$disable === void 0 ? "Not available" : _this$props12$disable,
          day = _this$props12.day,
          locale = _this$props12.locale;
        var labelDate = setMonth.setMonth(day, month);
        var prefix = _this.isDisabled(labelDate) || _this.isExcluded(labelDate) ? disabledDayAriaLabelPrefix : chooseDayAriaLabelPrefix;
        return "".concat(prefix, " ").concat(formatDate(labelDate, "MMMM yyyy", locale));
      });
      _defineProperty(_this, "getQuarterClassNames", function (q) {
        var _this$props13 = _this.props,
          day = _this$props13.day,
          startDate = _this$props13.startDate,
          endDate = _this$props13.endDate,
          selected = _this$props13.selected,
          minDate = _this$props13.minDate,
          maxDate = _this$props13.maxDate,
          preSelection = _this$props13.preSelection,
          disabledKeyboardNavigation = _this$props13.disabledKeyboardNavigation;
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
        var _this$props14 = _this.props,
          showFullMonthYearPicker = _this$props14.showFullMonthYearPicker,
          renderMonthContent = _this$props14.renderMonthContent,
          locale = _this$props14.locale,
          day = _this$props14.day;
        var shortMonthText = getMonthShortInLocale(m, locale);
        var fullMonthText = getMonthInLocale(m, locale);
        if (renderMonthContent) {
          return renderMonthContent(m, shortMonthText, fullMonthText, day);
        }
        return showFullMonthYearPicker ? fullMonthText : shortMonthText;
      });
      _defineProperty(_this, "getQuarterContent", function (q) {
        var _this$props15 = _this.props,
          renderQuarterContent = _this$props15.renderQuarterContent,
          locale = _this$props15.locale;
        var shortQuarter = getQuarterShortInLocale(q, locale);
        return renderQuarterContent ? renderQuarterContent(q, shortQuarter) : shortQuarter;
      });
      _defineProperty(_this, "renderMonths", function () {
        var _this$props16 = _this.props,
          showTwoColumnMonthYearPicker = _this$props16.showTwoColumnMonthYearPicker,
          showFourColumnMonthYearPicker = _this$props16.showFourColumnMonthYearPicker,
          day = _this$props16.day,
          selected = _this$props16.selected;
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
              "aria-disabled": _this.isMonthDisabled(m),
              role: "option",
              "aria-label": _this.getAriaLabel(m),
              "aria-current": _this.isCurrentMonth(day, m) ? "date" : undefined,
              "aria-selected": _this.isSelectedMonth(day, m, selected)
            }, _this.getMonthContent(m));
          }));
        });
      });
      _defineProperty(_this, "renderQuarters", function () {
        var _this$props17 = _this.props,
          day = _this$props17.day,
          selected = _this$props17.selected;
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
        var _this$props18 = _this.props,
          selectingDate = _this$props18.selectingDate,
          selectsStart = _this$props18.selectsStart,
          selectsEnd = _this$props18.selectsEnd,
          showMonthYearPicker = _this$props18.showMonthYearPicker,
          showQuarterYearPicker = _this$props18.showQuarterYearPicker,
          showWeekPicker = _this$props18.showWeekPicker;
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
        var _this$props19 = this.props,
          showMonthYearPicker = _this$props19.showMonthYearPicker,
          showQuarterYearPicker = _this$props19.showQuarterYearPicker,
          day = _this$props19.day,
          _this$props19$ariaLab = _this$props19.ariaLabelPrefix,
          ariaLabelPrefix = _this$props19$ariaLab === void 0 ? "Month " : _this$props19$ariaLab;
        var formattedAriaLabelPrefix = ariaLabelPrefix ? ariaLabelPrefix.trim() + " " : "";
        return /*#__PURE__*/React__default.default.createElement("div", {
          className: this.getClassNames(),
          onMouseLeave: !this.props.usePointerEvent ? this.handleMouseLeave : undefined,
          onPointerLeave: this.props.usePointerEvent ? this.handleMouseLeave : undefined,
          "aria-label": "".concat(formattedAriaLabelPrefix).concat(formatDate(day, "MMMM, yyyy", this.props.locale)),
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

        //convert this.props.intervals and the relevant time to seconds and check if it it's a clean multiple of the interval
        if (_this.props.injectTimes && (getHours.getHours(time) * 3600 + getMinutes.getMinutes(time) * 60 + dateFns.getSeconds(time)) % (_this.props.intervals * 60) !== 0) {
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

  var VERTICAL_NAVIGATION_OFFSET = 3;
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
        if (newYear - startPeriod < 0) {
          _this.updateFocusOnPaginate(yearItemNumber - (startPeriod - newYear));
        } else if (newYear - startPeriod >= yearItemNumber) {
          _this.updateFocusOnPaginate(Math.abs(yearItemNumber - (newYear - startPeriod)));
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
        var _this$props5 = _this.props,
          date = _this$props5.date,
          yearItemNumber = _this$props5.yearItemNumber,
          handleOnKeyDown = _this$props5.handleOnKeyDown;
        if (key !== "Tab") {
          // preventDefault on tab event blocks focus change
          e.preventDefault();
        }
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
            case "ArrowUp":
              {
                var _utils$getYearsPeriod2 = getYearsPeriod(date, yearItemNumber),
                  startPeriod = _utils$getYearsPeriod2.startPeriod;
                var offset = VERTICAL_NAVIGATION_OFFSET;
                var newYear = y - offset;
                if (newYear < startPeriod) {
                  var leftOverOffset = yearItemNumber % offset;
                  if (y >= startPeriod && y < startPeriod + leftOverOffset) {
                    offset = leftOverOffset;
                  } else {
                    offset += leftOverOffset;
                  }
                  newYear = y - offset;
                }
                _this.handleYearNavigation(newYear, subYears.subYears(_this.props.preSelection, offset));
                break;
              }
            case "ArrowDown":
              {
                var _utils$getYearsPeriod3 = getYearsPeriod(date, yearItemNumber),
                  endPeriod = _utils$getYearsPeriod3.endPeriod;
                var _offset = VERTICAL_NAVIGATION_OFFSET;
                var _newYear = y + _offset;
                if (_newYear > endPeriod) {
                  var _leftOverOffset = yearItemNumber % _offset;
                  if (y <= endPeriod && y > endPeriod - _leftOverOffset) {
                    _offset = _leftOverOffset;
                  } else {
                    _offset += _leftOverOffset;
                  }
                  _newYear = y + _offset;
                }
                _this.handleYearNavigation(_newYear, addYears.addYears(_this.props.preSelection, _offset));
                break;
              }
          }
        }
        handleOnKeyDown && handleOnKeyDown(e);
      });
      _defineProperty(_this, "getYearClassNames", function (y) {
        var _this$props6 = _this.props,
          date = _this$props6.date,
          minDate = _this$props6.minDate,
          maxDate = _this$props6.maxDate,
          selected = _this$props6.selected,
          excludeDates = _this$props6.excludeDates,
          includeDates = _this$props6.includeDates,
          filterDate = _this$props6.filterDate,
          yearClassName = _this$props6.yearClassName;
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
        var _this$props7 = _this.props,
          selectingDate = _this$props7.selectingDate,
          selectsStart = _this$props7.selectsStart,
          selectsEnd = _this$props7.selectsEnd,
          selectsRange = _this$props7.selectsRange;
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
        var _this$props8 = this.props,
          date = _this$props8.date,
          yearItemNumber = _this$props8.yearItemNumber,
          onYearMouseEnter = _this$props8.onYearMouseEnter,
          onYearMouseLeave = _this$props8.onYearMouseLeave;
        var _utils$getYearsPeriod4 = getYearsPeriod(date, yearItemNumber),
          startPeriod = _utils$getYearsPeriod4.startPeriod,
          endPeriod = _utils$getYearsPeriod4.endPeriod;
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
            "aria-label": formatDate(day, "EEEE", _this.props.locale),
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
          case _this.props.showQuarterYearPicker:
            allPrevDaysDisabled = quarterDisabledBefore(_this.state.date, _this.props);
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
          case _this.props.showQuarterYearPicker:
            allNextDaysDisabled = quarterDisabledAfter(_this.state.date, _this.props);
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
          if (startDate && !endDate && (_this.props.swapRange || !isDateBefore(date, startDate))) {
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
          minTime = _this$props2.minTime,
          swapRange = _this$props2.swapRange;
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
                if (swapRange) {
                  onChange([changedDate, startDate], event);
                } else {
                  onChange([changedDate, null], event);
                }
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
            var selectorString = _this.props.showWeekPicker && _this.props.showWeekNumbers ? '.react-datepicker__week-number[tabindex="0"]' : _this.props.showFullMonthYearPicker || _this.props.showMonthYearPicker ? '.react-datepicker__month-text[tabindex="0"]' : '.react-datepicker__day[tabindex="0"]';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGVfdXRpbHMuanMiLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9kYXkuanN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLmpzeCIsIi4uL3NyYy93ZWVrLmpzeCIsIi4uL3NyYy9tb250aC5qc3giLCIuLi9zcmMvdGltZS5qc3giLCIuLi9zcmMveWVhci5qc3giLCIuLi9zcmMvaW5wdXRUaW1lLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIuanN4IiwiLi4vc3JjL2NhbGVuZGFyLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLmpzeCIsIi4uL3NyYy9wb3J0YWwuanN4IiwiLi4vc3JjL3RhYl9sb29wLmpzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLmpzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LmpzeCIsIi4uL3NyYy9pbmRleC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSBcImRhdGUtZm5zL2lzRGF0ZVwiO1xuaW1wb3J0IHsgaXNWYWxpZCBhcyBpc1ZhbGlkRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGxvbmdGb3JtYXR0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2Zvcm1hdFwiO1xuaW1wb3J0IHsgYWRkTWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9hZGRNaW51dGVzXCI7XG5pbXBvcnQgeyBhZGRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9hZGRIb3Vyc1wiO1xuaW1wb3J0IHsgYWRkRGF5cyB9IGZyb20gXCJkYXRlLWZucy9hZGREYXlzXCI7XG5pbXBvcnQgeyBhZGRXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9hZGRXZWVrc1wiO1xuaW1wb3J0IHsgYWRkTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2FkZE1vbnRoc1wiO1xuaW1wb3J0IHsgYWRkUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkUXVhcnRlcnNcIjtcbmltcG9ydCB7IGFkZFllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFllYXJzXCI7XG5pbXBvcnQgeyBzdWJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL3N1YkRheXNcIjtcbmltcG9ydCB7IHN1YldlZWtzIH0gZnJvbSBcImRhdGUtZm5zL3N1YldlZWtzXCI7XG5pbXBvcnQgeyBzdWJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViTW9udGhzXCI7XG5pbXBvcnQgeyBzdWJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9zdWJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3ViWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViWWVhcnNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0U2Vjb25kc1wiO1xuaW1wb3J0IHsgZ2V0TWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9nZXRNaW51dGVzXCI7XG5pbXBvcnQgeyBnZXRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9nZXRIb3Vyc1wiO1xuaW1wb3J0IHsgZ2V0RGF5IH0gZnJvbSBcImRhdGUtZm5zL2dldERheVwiO1xuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXRlXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrIH0gZnJvbSBcImRhdGUtZm5zL2dldElTT1dlZWtcIjtcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2dldE1vbnRoXCI7XG5pbXBvcnQgeyBnZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2dldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0WWVhclwiO1xuaW1wb3J0IHsgZ2V0VGltZSB9IGZyb20gXCJkYXRlLWZucy9nZXRUaW1lXCI7XG5pbXBvcnQgeyBzZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL3NldFNlY29uZHNcIjtcbmltcG9ydCB7IHNldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0TWludXRlc1wiO1xuaW1wb3J0IHsgc2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0SG91cnNcIjtcbmltcG9ydCB7IHNldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3NldE1vbnRoXCI7XG5pbXBvcnQgeyBzZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3NldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IHNldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0WWVhclwiO1xuaW1wb3J0IHsgbWluIH0gZnJvbSBcImRhdGUtZm5zL21pblwiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcImRhdGUtZm5zL21heFwiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFyc1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZEYXlcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZXZWVrXCI7XG5pbXBvcnQgeyBzdGFydE9mTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZk1vbnRoXCI7XG5pbXBvcnQgeyBzdGFydE9mUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mUXVhcnRlclwiO1xuaW1wb3J0IHsgc3RhcnRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlllYXJcIjtcbmltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZldlZWsgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZXZWVrXCI7XG5pbXBvcnQgeyBlbmRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mTW9udGhcIjtcbmltcG9ydCB7IGVuZE9mWWVhciB9IGZyb20gXCJkYXRlLWZucy9lbmRPZlllYXJcIjtcbmltcG9ydCB7IGlzRXF1YWwgYXMgZGZJc0VxdWFsIH0gZnJvbSBcImRhdGUtZm5zL2lzRXF1YWxcIjtcbmltcG9ydCB7IGlzU2FtZURheSBhcyBkZklzU2FtZURheSB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVEYXlcIjtcbmltcG9ydCB7IGlzU2FtZU1vbnRoIGFzIGRmSXNTYW1lTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lTW9udGhcIjtcbmltcG9ydCB7IGlzU2FtZVllYXIgYXMgZGZJc1NhbWVZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVllYXJcIjtcbmltcG9ydCB7IGlzU2FtZVF1YXJ0ZXIgYXMgZGZJc1NhbWVRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVF1YXJ0ZXJcIjtcbmltcG9ydCB7IGlzQWZ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNBZnRlclwiO1xuaW1wb3J0IHsgaXNCZWZvcmUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNCZWZvcmVcIjtcbmltcG9ydCB7IGlzV2l0aGluSW50ZXJ2YWwgfSBmcm9tIFwiZGF0ZS1mbnMvaXNXaXRoaW5JbnRlcnZhbFwiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcImRhdGUtZm5zL3RvRGF0ZVwiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZGF0ZS1mbnMvcGFyc2VcIjtcbmltcG9ydCB7IHBhcnNlSVNPIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlSVNPXCI7XG5pbXBvcnQgeyBhZGRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgPSAxMjtcblxuLy8gVGhpcyBSZWdFeHAgY2F0Y2hlcyBzeW1ib2xzIGVzY2FwZWQgYnkgcXVvdGVzLCBhbmQgYWxzb1xuLy8gc2VxdWVuY2VzIG9mIHN5bWJvbHMgUCwgcCwgYW5kIHRoZSBjb21iaW5hdGlvbnMgbGlrZSBgUFBQUFBQUHBwcHBwYFxuY29uc3QgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcblxuLy8gKiogRGF0ZSBDb25zdHJ1Y3RvcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0RhdGUodmFsdWUpIHtcbiAgY29uc3QgZCA9IHZhbHVlXG4gICAgPyB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmdcbiAgICAgID8gcGFyc2VJU08odmFsdWUpXG4gICAgICA6IHRvRGF0ZSh2YWx1ZSlcbiAgICA6IG5ldyBEYXRlKCk7XG4gIHJldHVybiBpc1ZhbGlkKGQpID8gZCA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGUodmFsdWUsIGRhdGVGb3JtYXQsIGxvY2FsZSwgc3RyaWN0UGFyc2luZywgbWluRGF0ZSkge1xuICBsZXQgcGFyc2VkRGF0ZSA9IG51bGw7XG4gIGxldCBsb2NhbGVPYmplY3QgPVxuICAgIGdldExvY2FsZU9iamVjdChsb2NhbGUpIHx8IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICBsZXQgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPSB0cnVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSkge1xuICAgIGRhdGVGb3JtYXQuZm9yRWFjaCgoZGYpID0+IHtcbiAgICAgIGxldCB0cnlQYXJzZURhdGUgPSBwYXJzZSh2YWx1ZSwgZGYsIG5ldyBEYXRlKCksIHtcbiAgICAgICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICAgICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgICAgIGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJlxuICAgICAgICAgIHZhbHVlID09PSBmb3JtYXREYXRlKHRyeVBhcnNlRGF0ZSwgZGYsIGxvY2FsZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNWYWxpZCh0cnlQYXJzZURhdGUsIG1pbkRhdGUpICYmIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoKSB7XG4gICAgICAgIHBhcnNlZERhdGUgPSB0cnlQYXJzZURhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlZERhdGU7XG4gIH1cblxuICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQsIG5ldyBEYXRlKCksIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iamVjdCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG5cbiAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9XG4gICAgICBpc1ZhbGlkKHBhcnNlZERhdGUpICYmXG4gICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZShwYXJzZWREYXRlLCBkYXRlRm9ybWF0LCBsb2NhbGUpO1xuICB9IGVsc2UgaWYgKCFpc1ZhbGlkKHBhcnNlZERhdGUpKSB7XG4gICAgZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXRcbiAgICAgIC5tYXRjaChsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgICBjb25zdCBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcInBcIiB8fCBmaXJzdENoYXJhY3RlciA9PT0gXCJQXCIpIHtcbiAgICAgICAgICBjb25zdCBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgICAgIHJldHVybiBsb2NhbGVPYmplY3RcbiAgICAgICAgICAgID8gbG9uZ0Zvcm1hdHRlcihzdWJzdHJpbmcsIGxvY2FsZU9iamVjdC5mb3JtYXRMb25nKVxuICAgICAgICAgICAgOiBmaXJzdENoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgICAgfSlcbiAgICAgIC5qb2luKFwiXCIpO1xuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHBhcnNlZERhdGUgPSBwYXJzZSh2YWx1ZSwgZGF0ZUZvcm1hdC5zbGljZSgwLCB2YWx1ZS5sZW5ndGgpLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgICAgcGFyc2VkRGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXNWYWxpZChwYXJzZWREYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA/IHBhcnNlZERhdGUgOiBudWxsO1xufVxuXG4vLyAqKiBEYXRlIFwiUmVmbGVjdGlvblwiICoqXG5cbmV4cG9ydCB7IGlzRGF0ZSB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChkYXRlLCBtaW5EYXRlKSB7XG4gIG1pbkRhdGUgPSBtaW5EYXRlID8gbWluRGF0ZSA6IG5ldyBEYXRlKFwiMS8xLzEwMDBcIik7XG4gIHJldHVybiBpc1ZhbGlkRGF0ZShkYXRlKSAmJiAhaXNCZWZvcmUoZGF0ZSwgbWluRGF0ZSk7XG59XG5cbi8vICoqIERhdGUgRm9ybWF0dGluZyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXRTdHIsIGxvY2FsZSkge1xuICBpZiAobG9jYWxlID09PSBcImVuXCIpIHtcbiAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICBsZXQgbG9jYWxlT2JqID0gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSk7XG4gIGlmIChsb2NhbGUgJiYgIWxvY2FsZU9iaikge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBBIGxvY2FsZSBvYmplY3Qgd2FzIG5vdCBmb3VuZCBmb3IgdGhlIHByb3ZpZGVkIHN0cmluZyBbXCIke2xvY2FsZX1cIl0uYCxcbiAgICApO1xuICB9XG4gIGlmIChcbiAgICAhbG9jYWxlT2JqICYmXG4gICAgISFnZXREZWZhdWx0TG9jYWxlKCkgJiZcbiAgICAhIWdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpXG4gICkge1xuICAgIGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICB9XG4gIHJldHVybiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmogPyBsb2NhbGVPYmogOiBudWxsLFxuICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlRm9ybWF0KGRhdGUsIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0pIHtcbiAgcmV0dXJuIChcbiAgICAoZGF0ZSAmJlxuICAgICAgZm9ybWF0RGF0ZShcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSA/IGRhdGVGb3JtYXRbMF0gOiBkYXRlRm9ybWF0LFxuICAgICAgICBsb2NhbGUsXG4gICAgICApKSB8fFxuICAgIFwiXCJcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlUmFuZ2VGb3JtYXQoc3RhcnREYXRlLCBlbmREYXRlLCBwcm9wcykge1xuICBpZiAoIXN0YXJ0RGF0ZSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVkU3RhcnREYXRlID0gc2FmZURhdGVGb3JtYXQoc3RhcnREYXRlLCBwcm9wcyk7XG4gIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSBlbmREYXRlID8gc2FmZURhdGVGb3JtYXQoZW5kRGF0ZSwgcHJvcHMpIDogXCJcIjtcblxuICByZXR1cm4gYCR7Zm9ybWF0dGVkU3RhcnREYXRlfSAtICR7Zm9ybWF0dGVkRW5kRGF0ZX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQoZGF0ZXMsIHByb3BzKSB7XG4gIGlmICghZGF0ZXM/Lmxlbmd0aCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG4gIGNvbnN0IGZvcm1hdHRlZEZpcnN0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzBdLCBwcm9wcyk7XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkRmlyc3REYXRlO1xuICB9XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDIpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmREYXRlID0gc2FmZURhdGVGb3JtYXQoZGF0ZXNbMV0sIHByb3BzKTtcbiAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSwgJHtmb3JtYXR0ZWRTZWNvbmREYXRlfWA7XG4gIH1cblxuICBjb25zdCBleHRyYURhdGVzQ291bnQgPSBkYXRlcy5sZW5ndGggLSAxO1xuICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSAoKyR7ZXh0cmFEYXRlc0NvdW50fSlgO1xufVxuXG4vLyAqKiBEYXRlIFNldHRlcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWUoZGF0ZSwgeyBob3VyID0gMCwgbWludXRlID0gMCwgc2Vjb25kID0gMCB9KSB7XG4gIHJldHVybiBzZXRIb3VycyhzZXRNaW51dGVzKHNldFNlY29uZHMoZGF0ZSwgc2Vjb25kKSwgbWludXRlKSwgaG91cik7XG59XG5cbmV4cG9ydCB7IHNldE1pbnV0ZXMsIHNldEhvdXJzLCBzZXRNb250aCwgc2V0UXVhcnRlciwgc2V0WWVhciB9O1xuXG4vLyAqKiBEYXRlIEdldHRlcnMgKipcblxuLy8gZ2V0RGF5IFJldHVybnMgZGF5IG9mIHdlZWssIGdldERhdGUgcmV0dXJucyBkYXkgb2YgbW9udGhcbmV4cG9ydCB7XG4gIGdldFNlY29uZHMsXG4gIGdldE1pbnV0ZXMsXG4gIGdldEhvdXJzLFxuICBnZXRNb250aCxcbiAgZ2V0UXVhcnRlcixcbiAgZ2V0WWVhcixcbiAgZ2V0RGF5LFxuICBnZXREYXRlLFxuICBnZXRUaW1lLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWsoZGF0ZSwgbG9jYWxlKSB7XG4gIGxldCBsb2NhbGVPYmogPVxuICAgIChsb2NhbGUgJiYgZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSkpIHx8XG4gICAgKGdldERlZmF1bHRMb2NhbGUoKSAmJiBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKSk7XG4gIHJldHVybiBnZXRJU09XZWVrKGRhdGUsIGxvY2FsZU9iaiA/IHsgbG9jYWxlOiBsb2NhbGVPYmogfSA6IG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrQ29kZShkYXksIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXksIFwiZGRkXCIsIGxvY2FsZSk7XG59XG5cbi8vICoqKiBTdGFydCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZEYXkoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZkRheShkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZXZWVrKGRhdGUsIGxvY2FsZSwgY2FsZW5kYXJTdGFydERheSkge1xuICBsZXQgbG9jYWxlT2JqID0gbG9jYWxlXG4gICAgPyBnZXRMb2NhbGVPYmplY3QobG9jYWxlKVxuICAgIDogZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIHJldHVybiBzdGFydE9mV2VlayhkYXRlLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmosXG4gICAgd2Vla1N0YXJ0c09uOiBjYWxlbmRhclN0YXJ0RGF5LFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZNb250aChkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mTW9udGgoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mWWVhcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mWWVhcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZRdWFydGVyKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZRdWFydGVyKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlRvZGF5KCkge1xuICByZXR1cm4gc3RhcnRPZkRheShuZXdEYXRlKCkpO1xufVxuXG4vLyAqKiogRW5kIG9mICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kT2ZXZWVrKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mV2VlayhkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gZW5kT2ZNb250aChkYXRlKTtcbn1cblxuLy8gKiogRGF0ZSBNYXRoICoqXG5cbi8vICoqKiBBZGRpdGlvbiAqKipcblxuZXhwb3J0IHtcbiAgYWRkU2Vjb25kcyxcbiAgYWRkTWludXRlcyxcbiAgYWRkRGF5cyxcbiAgYWRkV2Vla3MsXG4gIGFkZE1vbnRocyxcbiAgYWRkUXVhcnRlcnMsXG4gIGFkZFllYXJzLFxufTtcblxuLy8gKioqIFN1YnRyYWN0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRIb3Vycywgc3ViRGF5cywgc3ViV2Vla3MsIHN1Yk1vbnRocywgc3ViUXVhcnRlcnMsIHN1YlllYXJzIH07XG5cbi8vICoqIERhdGUgQ29tcGFyaXNvbiAqKlxuXG5leHBvcnQgeyBpc0JlZm9yZSwgaXNBZnRlciB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZURheShkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc0VxdWFsKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZkRheShzdGFydERhdGUpO1xuICBjb25zdCBlbmQgPSBlbmRPZkRheShlbmREYXRlKTtcblxuICB0cnkge1xuICAgIHZhbGlkID0gaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbi8vICoqKiBEaWZmaW5nICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTEsIGRhdGUyKSB7XG4gIHJldHVybiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZTEsIGRhdGUyKTtcbn1cblxuLy8gKiogRGF0ZSBMb2NhbGl6YXRpb24gKipcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZU5hbWUsIGxvY2FsZURhdGEpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBpZiAoIXNjb3BlLl9fbG9jYWxlRGF0YV9fKSB7XG4gICAgc2NvcGUuX19sb2NhbGVEYXRhX18gPSB7fTtcbiAgfVxuICBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVOYW1lXSA9IGxvY2FsZURhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0TG9jYWxlKGxvY2FsZU5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBzY29wZS5fX2xvY2FsZUlkX18gPSBsb2NhbGVOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdExvY2FsZSgpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICByZXR1cm4gc2NvcGUuX19sb2NhbGVJZF9fO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZVNwZWMpIHtcbiAgaWYgKHR5cGVvZiBsb2NhbGVTcGVjID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSBsb2NhbGUgbmFtZSByZWdpc3RlcmVkIGJ5IHJlZ2lzdGVyTG9jYWxlXG4gICAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcbiAgICByZXR1cm4gc2NvcGUuX19sb2NhbGVEYXRhX18gPyBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVTcGVjXSA6IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSByYXcgZGF0ZS1mbnMgbG9jYWxlIG9iamVjdFxuICAgIHJldHVybiBsb2NhbGVTcGVjO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF0ZSwgZm9ybWF0RnVuYywgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXRGdW5jKGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFXCIsIGxvY2FsZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhTaG9ydEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxdWFydGVyLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0UXVhcnRlcihuZXdEYXRlKCksIHF1YXJ0ZXIpLCBcIlFRUVwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiBVdGlscyBmb3Igc29tZSBjb21wb25lbnRzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheURpc2FibGVkKFxuICBkYXksXG4gIHtcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICAgZXhjbHVkZURhdGVzLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGluY2x1ZGVEYXRlcyxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFscyxcbiAgICBmaWx0ZXJEYXRlLFxuICB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lRGF5KGRheSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXkpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlFeGNsdWRlZChcbiAgZGF5LFxuICB7IGV4Y2x1ZGVEYXRlcywgZXhjbHVkZURhdGVJbnRlcnZhbHMgfSA9IHt9LFxuKSB7XG4gIGlmIChleGNsdWRlRGF0ZUludGVydmFscyAmJiBleGNsdWRlRGF0ZUludGVydmFscy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhEaXNhYmxlZChcbiAgbW9udGgsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhtb250aCwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZk1vbnRoKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZNb250aChtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShtb250aCkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoSW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIG0sIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVNb250aCA9IGdldE1vbnRoKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZU1vbnRoID0gZ2V0TW9udGgoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZU1vbnRoIDw9IG0gJiYgbSA8PSBlbmREYXRlTW9udGg7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZU1vbnRoIDw9IG0pIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZU1vbnRoID49IG0pIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckRpc2FibGVkKFxuICBxdWFydGVyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMocXVhcnRlciwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBpbmNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUocXVhcnRlcikpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnRcbiAqIEBwYXJhbSB7RGF0ZX0gZW5kXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckluUmFuZ2UoeWVhciwgc3RhcnQsIGVuZCkge1xuICBpZiAoIWlzVmFsaWREYXRlKHN0YXJ0KSB8fCAhaXNWYWxpZERhdGUoZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzdGFydFllYXIgPSBnZXRZZWFyKHN0YXJ0KTtcbiAgY29uc3QgZW5kWWVhciA9IGdldFllYXIoZW5kKTtcblxuICByZXR1cm4gc3RhcnRZZWFyIDw9IHllYXIgJiYgZW5kWWVhciA+PSB5ZWFyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFyRGlzYWJsZWQoXG4gIHllYXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCAwLCAxKTtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRhdGUsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZZZWFyKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZZZWFyKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF0ZSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVRdWFydGVyIDw9IHEgJiYgcSA8PSBlbmREYXRlUXVhcnRlcjtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlUXVhcnRlciA8PSBxKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVRdWFydGVyID49IHEpIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSA9IHt9KSB7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWluRGF0ZSkgPCAwKSB8fFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1heERhdGUpID4gMClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluTGlzdCh0aW1lLCB0aW1lcykge1xuICByZXR1cm4gdGltZXMuc29tZShcbiAgICAobGlzdFRpbWUpID0+XG4gICAgICBnZXRIb3VycyhsaXN0VGltZSkgPT09IGdldEhvdXJzKHRpbWUpICYmXG4gICAgICBnZXRNaW51dGVzKGxpc3RUaW1lKSA9PT0gZ2V0TWludXRlcyh0aW1lKSAmJlxuICAgICAgZ2V0U2Vjb25kcyhsaXN0VGltZSkgPT09IGdldFNlY29uZHModGltZSksXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVEaXNhYmxlZChcbiAgdGltZSxcbiAgeyBleGNsdWRlVGltZXMsIGluY2x1ZGVUaW1lcywgZmlsdGVyVGltZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICAoZXhjbHVkZVRpbWVzICYmIGlzVGltZUluTGlzdCh0aW1lLCBleGNsdWRlVGltZXMpKSB8fFxuICAgIChpbmNsdWRlVGltZXMgJiYgIWlzVGltZUluTGlzdCh0aW1lLCBpbmNsdWRlVGltZXMpKSB8fFxuICAgIChmaWx0ZXJUaW1lICYmICFmaWx0ZXJUaW1lKHRpbWUpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgeyBtaW5UaW1lLCBtYXhUaW1lIH0pIHtcbiAgaWYgKCFtaW5UaW1lIHx8ICFtYXhUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQm90aCBtaW5UaW1lIGFuZCBtYXhUaW1lIHByb3BzIHJlcXVpcmVkXCIpO1xuICB9XG4gIGxldCBiYXNlVGltZSA9IG5ld0RhdGUoKTtcbiAgYmFzZVRpbWUgPSBzZXRIb3VycyhiYXNlVGltZSwgZ2V0SG91cnModGltZSkpO1xuICBiYXNlVGltZSA9IHNldE1pbnV0ZXMoYmFzZVRpbWUsIGdldE1pbnV0ZXModGltZSkpO1xuICBiYXNlVGltZSA9IHNldFNlY29uZHMoYmFzZVRpbWUsIGdldFNlY29uZHModGltZSkpO1xuXG4gIGxldCBtaW4gPSBuZXdEYXRlKCk7XG4gIG1pbiA9IHNldEhvdXJzKG1pbiwgZ2V0SG91cnMobWluVGltZSkpO1xuICBtaW4gPSBzZXRNaW51dGVzKG1pbiwgZ2V0TWludXRlcyhtaW5UaW1lKSk7XG4gIG1pbiA9IHNldFNlY29uZHMobWluLCBnZXRTZWNvbmRzKG1pblRpbWUpKTtcblxuICBsZXQgbWF4ID0gbmV3RGF0ZSgpO1xuICBtYXggPSBzZXRIb3VycyhtYXgsIGdldEhvdXJzKG1heFRpbWUpKTtcbiAgbWF4ID0gc2V0TWludXRlcyhtYXgsIGdldE1pbnV0ZXMobWF4VGltZSkpO1xuICBtYXggPSBzZXRTZWNvbmRzKG1heCwgZ2V0U2Vjb25kcyhtYXhUaW1lKSk7XG5cbiAgbGV0IHZhbGlkO1xuICB0cnkge1xuICAgIHZhbGlkID0gIWlzV2l0aGluSW50ZXJ2YWwoYmFzZVRpbWUsIHsgc3RhcnQ6IG1pbiwgZW5kOiBtYXggfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c01vbnRoID0gc3ViTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobWluRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGluY2x1ZGVEYXRlLCBwcmV2aW91c01vbnRoKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQWZ0ZXIoZGF5LCB7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEJlZm9yZShkYXRlLCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgZmlyc3REYXRlT2ZZZWFyID0gc3RhcnRPZlllYXIoZGF0ZSk7XG4gIGNvbnN0IHByZXZpb3VzUXVhcnRlciA9IHN1YlF1YXJ0ZXJzKGZpcnN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG1pbkRhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMoaW5jbHVkZURhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVhcnRlckRpc2FibGVkQWZ0ZXIoZGF0ZSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGxhc3REYXRlT2ZZZWFyID0gZW5kT2ZZZWFyKGRhdGUpO1xuICBjb25zdCBuZXh0UXVhcnRlciA9IGFkZFF1YXJ0ZXJzKGxhc3REYXRlT2ZZZWFyLCAxKTtcblxuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMobmV4dFF1YXJ0ZXIsIG1heERhdGUpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhckRpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IHN1YlllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhtaW5EYXRlLCBwcmV2aW91c1llYXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1llYXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJzRGlzYWJsZWRCZWZvcmUoXG4gIGRheSxcbiAgeyBtaW5EYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgcHJldmlvdXNZZWFyID0gZ2V0U3RhcnRPZlllYXIoc3ViWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcikpO1xuICBjb25zdCB7IGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QocHJldmlvdXNZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1pbkRhdGVZZWFyID0gbWluRGF0ZSAmJiBnZXRZZWFyKG1pbkRhdGUpO1xuICByZXR1cm4gKG1pbkRhdGVZZWFyICYmIG1pbkRhdGVZZWFyID4gZW5kUGVyaW9kKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobmV4dFllYXIsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQWZ0ZXIoXG4gIGRheSxcbiAgeyBtYXhEYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgbmV4dFllYXIgPSBhZGRZZWFycyhkYXksIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QobmV4dFllYXIsIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgbWF4RGF0ZVllYXIgPSBtYXhEYXRlICYmIGdldFllYXIobWF4RGF0ZSk7XG4gIHJldHVybiAobWF4RGF0ZVllYXIgJiYgbWF4RGF0ZVllYXIgPCBzdGFydFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNaW5EYXRlKHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtaW5EYXRlKSB7XG4gICAgbGV0IG1pbkRhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtaW5EYXRlKSA+PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1pbihtaW5EYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1pbihpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNYXhEYXRlKHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtYXhEYXRlKSB7XG4gICAgbGV0IG1heERhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtYXhEYXRlKSA8PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1heChtYXhEYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1heChpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaWdodExpZ2h0RGF5c01hcChcbiAgaGlnaGxpZ2h0RGF0ZXMgPSBbXSxcbiAgZGVmYXVsdENsYXNzTmFtZSA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiLFxuKSB7XG4gIGNvbnN0IGRhdGVDbGFzc2VzID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGlnaGxpZ2h0RGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBvYmogPSBoaWdobGlnaHREYXRlc1tpXTtcbiAgICBpZiAoaXNEYXRlKG9iaikpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUob2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoZGVmYXVsdENsYXNzTmFtZSkpIHtcbiAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGRlZmF1bHRDbGFzc05hbWUpO1xuICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0ga2V5c1swXTtcbiAgICAgIGNvbnN0IGFyck9mRGF0ZXMgPSBvYmpba2V5c1swXV07XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhcnJPZkRhdGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuID0gYXJyT2ZEYXRlcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoYXJyT2ZEYXRlc1trXSwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXNBcnIgPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG4vKipcbiAqIENvbXBhcmUgdGhlIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSwgaWYgdGhlIHBhc3NlZCBhcnJheSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlzQXJlRXF1YWwoYXJyYXkxLCBhcnJheTIpIHtcbiAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyYXkxLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBhcnJheTJbaW5kZXhdKTtcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIGN1c3RvbSBjbGFzcyB0byBlYWNoIGRhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGlkYXlEYXRlcyBhcnJheSBvZiBvYmplY3QgY29udGFpbmluZyBkYXRlIGFuZCBuYW1lIG9mIHRoZSBob2xpZGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NuYW1lIHRvIGJlIGFkZGVkLlxuICogQHJldHVybnMge01hcH0gTWFwIGNvbnRhaW5pbmcgZGF0ZSBhcyBrZXkgYW5kIGFycmF5IG9mIGNsYXNzbmFtZSBhbmQgaG9saWRheSBuYW1lIGFzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb2xpZGF5c01hcChcbiAgaG9saWRheURhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taG9saWRheXNcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgaG9saWRheURhdGVzLmZvckVhY2goKGhvbGlkYXkpID0+IHtcbiAgICBjb25zdCB7IGRhdGU6IGRhdGVPYmosIGhvbGlkYXlOYW1lIH0gPSBob2xpZGF5O1xuICAgIGlmICghaXNEYXRlKGRhdGVPYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gZm9ybWF0RGF0ZShkYXRlT2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgY2xhc3NOYW1lc09iaiA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IHt9O1xuICAgIGlmIChcbiAgICAgIFwiY2xhc3NOYW1lXCIgaW4gY2xhc3NOYW1lc09iaiAmJlxuICAgICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9PT0gZGVmYXVsdENsYXNzTmFtZSAmJlxuICAgICAgYXJyYXlzQXJlRXF1YWwoY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSwgW2hvbGlkYXlOYW1lXSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGFzc05hbWVzT2JqW1wiY2xhc3NOYW1lXCJdID0gZGVmYXVsdENsYXNzTmFtZTtcbiAgICBjb25zdCBob2xpZGF5TmFtZUFyciA9IGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl07XG4gICAgY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSA9IGhvbGlkYXlOYW1lQXJyXG4gICAgICA/IFsuLi5ob2xpZGF5TmFtZUFyciwgaG9saWRheU5hbWVdXG4gICAgICA6IFtob2xpZGF5TmFtZV07XG4gICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc09iaik7XG4gIH0pO1xuICByZXR1cm4gZGF0ZUNsYXNzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gIHN0YXJ0T2ZEYXksXG4gIGN1cnJlbnRUaW1lLFxuICBjdXJyZW50TXVsdGlwbGllcixcbiAgaW50ZXJ2YWxzLFxuICBpbmplY3RlZFRpbWVzLFxuKSB7XG4gIGNvbnN0IGwgPSBpbmplY3RlZFRpbWVzLmxlbmd0aDtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBsZXQgaW5qZWN0ZWRUaW1lID0gc3RhcnRPZkRheTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRIb3VycyhpbmplY3RlZFRpbWUsIGdldEhvdXJzKGluamVjdGVkVGltZXNbaV0pKTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRNaW51dGVzKGluamVjdGVkVGltZSwgZ2V0TWludXRlcyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkU2Vjb25kcyhpbmplY3RlZFRpbWUsIGdldFNlY29uZHMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuXG4gICAgY29uc3QgbmV4dFRpbWUgPSBhZGRNaW51dGVzKFxuICAgICAgc3RhcnRPZkRheSxcbiAgICAgIChjdXJyZW50TXVsdGlwbGllciArIDEpICogaW50ZXJ2YWxzLFxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICBpc0FmdGVyKGluamVjdGVkVGltZSwgY3VycmVudFRpbWUpICYmXG4gICAgICBpc0JlZm9yZShpbmplY3RlZFRpbWUsIG5leHRUaW1lKVxuICAgICkge1xuICAgICAgdGltZXMucHVzaChpbmplY3RlZFRpbWVzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGltZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRaZXJvKGkpIHtcbiAgcmV0dXJuIGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRZZWFyc1BlcmlvZChcbiAgZGF0ZSxcbiAgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4pIHtcbiAgY29uc3QgZW5kUGVyaW9kID0gTWF0aC5jZWlsKGdldFllYXIoZGF0ZSkgLyB5ZWFySXRlbU51bWJlcikgKiB5ZWFySXRlbU51bWJlcjtcbiAgY29uc3Qgc3RhcnRQZXJpb2QgPSBlbmRQZXJpb2QgLSAoeWVhckl0ZW1OdW1iZXIgLSAxKTtcbiAgcmV0dXJuIHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG91cnNJbkRheShkKSB7XG4gIGNvbnN0IHN0YXJ0T2ZEYXkgPSBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xuICBjb25zdCBzdGFydE9mVGhlTmV4dERheSA9IG5ldyBEYXRlKFxuICAgIGQuZ2V0RnVsbFllYXIoKSxcbiAgICBkLmdldE1vbnRoKCksXG4gICAgZC5nZXREYXRlKCksXG4gICAgMjQsXG4gICk7XG5cbiAgcmV0dXJuIE1hdGgucm91bmQoKCtzdGFydE9mVGhlTmV4dERheSAtICtzdGFydE9mRGF5KSAvIDNfNjAwXzAwMCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgdGhlIG1pbnV0ZSBmb3IgdGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIGlzIGEgRFNUIGFuZCB0aW1lem9uZS1zYWZlIGFuYWxvZyBvZiBgZGF0ZS1mbnMvc3RhcnRPZk1pbnV0ZWBcbiAqIGRvIG5vdCBtYWtlIGNoYW5nZXMgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nXG4gKlxuICogU2VlIGNvbW1lbnRzIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvcHVsbC80MjQ0XG4gKiBmb3IgbW9yZSBkZXRhaWxzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSBzdGFydCBvZiB0aGUgbWludXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mTWludXRlKGQpIHtcbiAgY29uc3Qgc2Vjb25kcyA9IGQuZ2V0U2Vjb25kcygpO1xuICBjb25zdCBtaWxsaXNlY29uZHMgPSBkLmdldE1pbGxpc2Vjb25kcygpO1xuXG4gIHJldHVybiB0b0RhdGUoZC5nZXRUaW1lKCkgLSBzZWNvbmRzICogMTAwMCAtIG1pbGxpc2Vjb25kcyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgbWludXRlXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL2lzU2FtZU1pbnV0ZWBcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGQxXG4gKiBAcGFyYW0ge0RhdGV9IGQyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU1pbnV0ZShkMSwgZDIpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZNaW51dGUoZDEpLmdldFRpbWUoKSA9PT0gc3RhcnRPZk1pbnV0ZShkMikuZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZWQgZGF0ZSB3aXRoIG1pZG5pZ2h0IHRpbWUgKDAwOjAwOjAwKVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSBmb3Igd2hpY2ggbWlkbmlnaHQgdGltZSBpcyByZXF1aXJlZFxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge0RhdGV9IEEgbmV3IGRhdGV0aW1lIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaWRuaWdodERhdGUoZGF0ZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZVwiKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVXaXRob3V0VGltZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBkYXRlV2l0aG91dFRpbWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlV2l0aG91dFRpbWU7XG59XG5cbi8qKlxuICogSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSB0aGF0IHNob3VsZCBiZSBiZWZvcmUgdGhlIG90aGVyIG9uZSB0byByZXR1cm4gdHJ1ZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIFRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge2Jvb2xlYW59IFRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIGRhdGVcbiAqXG4gKiBOb3RlOlxuICogIFRoaXMgZnVuY3Rpb24gY29uc2lkZXJzIHRoZSBtaWQtbmlnaHQgb2YgdGhlIGdpdmVuIGRhdGVzIGZvciBjb21wYXJpc29uLlxuICogIEl0IGV2YWx1YXRlcyB3aGV0aGVyIGRhdGUgaXMgYmVmb3JlIGRhdGVUb0NvbXBhcmUgYmFzZWQgb24gdGhlaXIgbWlkLW5pZ2h0IHRpbWVzdGFtcHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVCZWZvcmUoZGF0ZSwgZGF0ZVRvQ29tcGFyZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSB8fCAhaXNEYXRlKGRhdGVUb0NvbXBhcmUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIHJlY2VpdmVkXCIpO1xuICB9XG5cbiAgY29uc3QgbWlkbmlnaHREYXRlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGUpO1xuICBjb25zdCBtaWRuaWdodERhdGVUb0NvbXBhcmUgPSBnZXRNaWRuaWdodERhdGUoZGF0ZVRvQ29tcGFyZSk7XG5cbiAgcmV0dXJuIGlzQmVmb3JlKG1pZG5pZ2h0RGF0ZSwgbWlkbmlnaHREYXRlVG9Db21wYXJlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3BhY2VLZXlEb3duKGV2ZW50KSB7XG4gIGNvbnN0IFNQQUNFX0tFWSA9IFwiIFwiO1xuICByZXR1cm4gZXZlbnQua2V5ID09PSBTUEFDRV9LRVk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlWWVhcnMoeWVhciwgbm9PZlllYXIsIG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDIgKiBub09mWWVhciArIDE7IGkrKykge1xuICAgIGNvbnN0IG5ld1llYXIgPSB5ZWFyICsgbm9PZlllYXIgLSBpO1xuICAgIGxldCBpc0luUmFuZ2UgPSB0cnVlO1xuXG4gICAgaWYgKG1pbkRhdGUpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWluRGF0ZSkgPD0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAobWF4RGF0ZSAmJiBpc0luUmFuZ2UpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWF4RGF0ZSkgPj0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAoaXNJblJhbmdlKSB7XG4gICAgICBsaXN0LnB1c2gobmV3WWVhcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgeWVhckRyb3Bkb3duSXRlbU51bWJlciwgc2Nyb2xsYWJsZVllYXJEcm9wZG93biB9ID0gcHJvcHM7XG4gICAgY29uc3Qgbm9PZlllYXIgPVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlciB8fCAoc2Nyb2xsYWJsZVllYXJEcm9wZG93biA/IDEwIDogNSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgeWVhcnNMaXN0OiBnZW5lcmF0ZVllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLnllYXIsXG4gICAgICAgIG5vT2ZZZWFyLFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgICB0aGlzLmRyb3Bkb3duUmVmID0gY3JlYXRlUmVmKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBkcm9wZG93bkN1cnJlbnQgPSB0aGlzLmRyb3Bkb3duUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAoZHJvcGRvd25DdXJyZW50KSB7XG4gICAgICAvLyBHZXQgYXJyYXkgZnJvbSBIVE1MQ29sbGVjdGlvblxuICAgICAgY29uc3QgZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4gPSBkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW5cbiAgICAgICAgPyBBcnJheS5mcm9tKGRyb3Bkb3duQ3VycmVudC5jaGlsZHJlbilcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRZZWFyT3B0aW9uRWwgPSBkcm9wZG93bkN1cnJlbnRDaGlsZHJlblxuICAgICAgICA/IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuLmZpbmQoKGNoaWxkRWwpID0+IGNoaWxkRWwuYXJpYVNlbGVjdGVkKVxuICAgICAgICA6IG51bGw7XG5cbiAgICAgIGRyb3Bkb3duQ3VycmVudC5zY3JvbGxUb3AgPSBzZWxlY3RlZFllYXJPcHRpb25FbFxuICAgICAgICA/IHNlbGVjdGVkWWVhck9wdGlvbkVsLm9mZnNldFRvcCArXG4gICAgICAgICAgKHNlbGVjdGVkWWVhck9wdGlvbkVsLmNsaWVudEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMlxuICAgICAgICA6IChkcm9wZG93bkN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gZHJvcGRvd25DdXJyZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gdGhpcy5wcm9wcy55ZWFyO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnN0YXRlLnllYXJzTGlzdC5tYXAoKHllYXIpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICBzZWxlY3RlZFllYXIgPT09IHllYXJcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbiByZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfeWVhclwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICB9XG4gICAgICAgIGtleT17eWVhcn1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIHllYXIpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWxlY3RlZFllYXIgPT09IHllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgID5cbiAgICAgICAge3NlbGVjdGVkWWVhciA9PT0geWVhciA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj7inJM8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgXCJcIlxuICAgICAgICApfVxuICAgICAgICB7eWVhcn1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuXG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IG51bGw7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IG51bGw7XG5cbiAgICBpZiAoIW1heFllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1heFllYXIpKSB7XG4gICAgICBvcHRpb25zLnVuc2hpZnQoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInVwY29taW5nXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5pbmNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtdXBjb21pbmdcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghbWluWWVhciB8fCAhdGhpcy5zdGF0ZS55ZWFyc0xpc3QuZmluZCgoeWVhcikgPT4geWVhciA9PT0gbWluWWVhcikpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgICBrZXk9e1wicHJldmlvdXNcIn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmRlY3JlbWVudFllYXJzfVxuICAgICAgICA+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbiByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycyByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycy1wcmV2aW91c1wiIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICBzaGlmdFllYXJzID0gKGFtb3VudCkgPT4ge1xuICAgIGNvbnN0IHllYXJzID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKGZ1bmN0aW9uICh5ZWFyKSB7XG4gICAgICByZXR1cm4geWVhciArIGFtb3VudDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgeWVhcnNMaXN0OiB5ZWFycyxcbiAgICB9KTtcbiAgfTtcblxuICBpbmNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKDEpO1xuICB9O1xuXG4gIGRlY3JlbWVudFllYXJzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnNoaWZ0WWVhcnMoLTEpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfSByZWY9e3RoaXMuZHJvcGRvd25SZWZ9PlxuICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgWWVhckRyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoWWVhckRyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBtaW5ZZWFyID0gdGhpcy5wcm9wcy5taW5EYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1pbkRhdGUpIDogMTkwMDtcbiAgICBjb25zdCBtYXhZZWFyID0gdGhpcy5wcm9wcy5tYXhEYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1heERhdGUpIDogMjEwMDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gbWluWWVhcjsgaSA8PSBtYXhZZWFyOyBpKyspIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAgICB7aX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25TZWxlY3RDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAoKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e3RoaXMucHJvcHMueWVhcn1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlld1wiXG4gICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1zZWxlY3RlZC15ZWFyXCI+XG4gICAgICAgIHt0aGlzLnByb3BzLnllYXJ9XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAoKSA9PiAoXG4gICAgPFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICB5ZWFyPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcbiAgICBpZiAoeWVhciA9PT0gdGhpcy5wcm9wcy55ZWFyKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh5ZWFyKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMucHJvcHMuZGF0ZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIHRoaXMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIHRoaXMuc2V0T3BlbigpO1xuICB9O1xuXG4gIG9uU2VsZWN0ID0gKGRhdGUsIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRPcGVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbW9udGhOYW1lczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIGlzU2VsZWN0ZWRNb250aCA9IChpKSA9PiB0aGlzLnByb3BzLm1vbnRoID09PSBpO1xuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubW9udGhOYW1lcy5tYXAoKG1vbnRoLCBpKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoaSlcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZF9tb250aFwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e21vbnRofVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgaSl9XG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGkpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge21vbnRofVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGgpO1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHRoaXMucHJvcHMub25DYW5jZWwoKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd25cIj5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aERyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9IChtb250aE5hbWVzKSA9PlxuICAgIG1vbnRoTmFtZXMubWFwKChNLCBpKSA9PiAoXG4gICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2l9PlxuICAgICAgICB7TX1cbiAgICAgIDwvb3B0aW9uPlxuICAgICkpO1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucyhtb250aE5hbWVzKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlLCBtb250aE5hbWVzKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aFwiPlxuICAgICAgICB7bW9udGhOYW1lc1t0aGlzLnByb3BzLm1vbnRoXX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJEcm9wZG93biA9IChtb250aE5hbWVzKSA9PiAoXG4gICAgPFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICBtb250aE5hbWVzPXttb250aE5hbWVzfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAobW9udGhOYW1lcykgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlLCBtb250aE5hbWVzKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bihtb250aE5hbWVzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKG1vbnRoICE9PSB0aGlzLnByb3BzLm1vbnRoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXS5tYXAoXG4gICAgICB0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3duXG4gICAgICAgID8gKE0pID0+IHV0aWxzLmdldE1vbnRoU2hvcnRJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSlcbiAgICAgICAgOiAoTSkgPT4gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSksXG4gICAgKTtcblxuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZShtb250aE5hbWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7XG4gIGFkZE1vbnRocyxcbiAgZm9ybWF0RGF0ZSxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBuZXdEYXRlLFxuICBpc0FmdGVyLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lWWVhcixcbiAgZ2V0VGltZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU1vbnRoWWVhcnMobWluRGF0ZSwgbWF4RGF0ZSkge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKG1pbkRhdGUpO1xuICBjb25zdCBsYXN0RGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtYXhEYXRlKTtcblxuICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgIGxpc3QucHVzaChuZXdEYXRlKGN1cnJEYXRlKSk7XG5cbiAgICBjdXJyRGF0ZSA9IGFkZE1vbnRocyhjdXJyRGF0ZSwgMSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1vbnRoWWVhcnNMaXN0OiBnZW5lcmF0ZU1vbnRoWWVhcnMoXG4gICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tb250aFllYXJzTGlzdC5tYXAoKG1vbnRoWWVhcikgPT4ge1xuICAgICAgY29uc3QgbW9udGhZZWFyUG9pbnQgPSBnZXRUaW1lKG1vbnRoWWVhcik7XG4gICAgICBjb25zdCBpc1NhbWVNb250aFllYXIgPVxuICAgICAgICBpc1NhbWVZZWFyKHRoaXMucHJvcHMuZGF0ZSwgbW9udGhZZWFyKSAmJlxuICAgICAgICBpc1NhbWVNb250aCh0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgaXNTYW1lTW9udGhZZWFyXG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGgteWVhclwiXG4gICAgICAgICAgICAgIDogXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvblwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17bW9udGhZZWFyUG9pbnR9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIG1vbnRoWWVhclBvaW50KX1cbiAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc1NhbWVNb250aFllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1NhbWVNb250aFllYXIgPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAg4pyTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHtmb3JtYXREYXRlKG1vbnRoWWVhciwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXIpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGhZZWFyKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Ryb3Bkb3duQ2xhc3N9Pnt0aGlzLnJlbmRlck9wdGlvbnMoKX08L2Rpdj47XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIG5ld0RhdGUsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxudmFyIFdyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMgPSBvbkNsaWNrT3V0c2lkZShNb250aFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgICAgY29uc3QgdGltZVBvaW50ID0gZ2V0VGltZShjdXJyRGF0ZSk7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXt0aW1lUG9pbnR9IHZhbHVlPXt0aW1lUG9pbnR9PlxuICAgICAgICAgIHtmb3JtYXREYXRlKGN1cnJEYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcblxuICAgICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXtnZXRUaW1lKGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRhdGUpKX1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiB7XG4gICAgY29uc3QgeWVhck1vbnRoID0gZm9ybWF0RGF0ZShcbiAgICAgIHRoaXMucHJvcHMuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9XCJyZWFkXCJcbiAgICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlld1wiXG4gICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bihldmVudCl9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXctLXNlbGVjdGVkLW1vbnRoLXllYXJcIj5cbiAgICAgICAgICB7eWVhck1vbnRofVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICBkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG4gICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXJQb2ludCkgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblxuICAgIGNvbnN0IGNoYW5nZWREYXRlID0gbmV3RGF0ZShwYXJzZUludChtb250aFllYXJQb2ludCkpO1xuXG4gICAgaWYgKFxuICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIGNoYW5nZWREYXRlKSAmJlxuICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9ICgpID0+XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHJlbmRlcmVkRHJvcGRvd247XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRyb3Bkb3duTW9kZSkge1xuICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTY3JvbGxNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBnZXREYXksXG4gIGdldE1vbnRoLFxuICBnZXREYXRlLFxuICBuZXdEYXRlLFxuICBpc1NhbWVEYXksXG4gIGlzRGF5RGlzYWJsZWQsXG4gIGlzRGF5RXhjbHVkZWQsXG4gIGlzRGF5SW5SYW5nZSxcbiAgaXNFcXVhbCxcbiAgaXNCZWZvcmUsXG4gIGlzQWZ0ZXIsXG4gIGdldERheU9mV2Vla0NvZGUsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBmb3JtYXREYXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c0RheSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkocHJldlByb3BzKTtcbiAgfVxuXG4gIGRheUVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VFbnRlciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKCkgJiYgdGhpcy5wcm9wcy5vbk1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIiBcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmtleSA9IFwiRW50ZXJcIjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKG90aGVyKSA9PiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXksIG90aGVyKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1NlbGVjdGVkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlXG4gICAgICA/IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT4gdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSkpXG4gICAgICA6IHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuXG4gICAgcmV0dXJuICFpc1NlbGVjdGVkRGF0ZSAmJiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gIH07XG5cbiAgaXNEaXNhYmxlZCA9ICgpID0+IGlzRGF5RGlzYWJsZWQodGhpcy5wcm9wcy5kYXksIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoKSA9PiBpc0RheUV4Y2x1ZGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc1N0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBpc1NhbWVEYXkoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVXZWVrID0gKG90aGVyKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICBpc1NhbWVEYXkoXG4gICAgICBvdGhlcixcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVEYXlPcldlZWsgPSAob3RoZXIpID0+IHRoaXMuaXNTYW1lRGF5KG90aGVyKSB8fCB0aGlzLmlzU2FtZVdlZWsob3RoZXIpO1xuXG4gIGdldEhpZ2hMaWdodGVkQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhpZ2hsaWdodERhdGVzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFoaWdobGlnaHREYXRlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIExvb2tpbmcgZm9yIGNsYXNzTmFtZSBpbiB0aGUgTWFwIG9mIHsnZGF5IHN0cmluZywgJ2NsYXNzTmFtZSd9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICByZXR1cm4gaGlnaGxpZ2h0RGF0ZXMuZ2V0KGRheVN0cik7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBhcnJheSBjb250YWluaW5nIGNsYXNzbmFtZSBhc3NvY2lhdGVkIHRvIHRoZSBkYXRlXG4gIGdldEhvbGlkYXlzQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaG9saWRheXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7ZGF5IHN0cmluZzoge2NsYXNzTmFtZSwgaG9saWRheU5hbWV9fVxuICAgIGlmIChob2xpZGF5cy5oYXMoZGF5U3RyKSkge1xuICAgICAgcmV0dXJuIFtob2xpZGF5cy5nZXQoZGF5U3RyKS5jbGFzc05hbWVdO1xuICAgIH1cbiAgfTtcblxuICBpc0luUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc2VsZWN0c1N0YXJ0LFxuICAgICAgc2VsZWN0c0VuZCxcbiAgICAgIHNlbGVjdHNSYW5nZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICFzZWxlY3RpbmdEYXRlIHx8XG4gICAgICAoIXNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlICYmIHRoaXMuaXNEaXNhYmxlZCgpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNTdGFydCAmJlxuICAgICAgZW5kRGF0ZSAmJlxuICAgICAgKGlzQmVmb3JlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c0VuZCAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAoaXNBZnRlcihzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNSYW5nZSAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAhZW5kRGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYW1lRGF5KHN0YXJ0RGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1JhbmdlRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShlbmREYXRlLCBkYXkpO1xuICB9O1xuXG4gIGlzV2Vla2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrZGF5ID0gZ2V0RGF5KHRoaXMucHJvcHMuZGF5KTtcbiAgICByZXR1cm4gd2Vla2RheSA9PT0gMCB8fCB3ZWVrZGF5ID09PSA2O1xuICB9O1xuXG4gIGlzQWZ0ZXJNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAodGhpcy5wcm9wcy5tb250aCArIDEpICUgMTIgPT09IGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNCZWZvcmVNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAoZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpICsgMSkgJSAxMiA9PT0gdGhpcy5wcm9wcy5tb250aFxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50RGF5ID0gKCkgPT4gdGhpcy5pc1NhbWVEYXkobmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT5cbiAgICAgICAgdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gIH07XG5cbiAgZ2V0Q2xhc3NOYW1lcyA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgZGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWVcbiAgICAgID8gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWUoZGF0ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIixcbiAgICAgIGRheUNsYXNzTmFtZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1cIiArIGdldERheU9mV2Vla0NvZGUodGhpcy5wcm9wcy5kYXkpLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZGlzYWJsZWRcIjogdGhpcy5pc0Rpc2FibGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1leGNsdWRlZFwiOiB0aGlzLmlzRXhjbHVkZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjogdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tc2VsZWN0aW5nLXJhbmdlXCI6IHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnREYXkoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXdlZWtlbmRcIjogdGhpcy5pc1dlZWtlbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLW91dHNpZGUtbW9udGhcIjpcbiAgICAgICAgICB0aGlzLmlzQWZ0ZXJNb250aCgpIHx8IHRoaXMuaXNCZWZvcmVNb250aCgpLFxuICAgICAgfSxcbiAgICAgIHRoaXMuZ2V0SGlnaExpZ2h0ZWRDbGFzcyhcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIiksXG4gICAgICB0aGlzLmdldEhvbGlkYXlzQ2xhc3MoKSxcbiAgICApO1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCA9IFwiQ2hvb3NlXCIsXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQgPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQoKSB8fCB0aGlzLmlzRXhjbHVkZWQoKVxuICAgICAgICA/IGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZFxuICAgICAgICA6IGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkO1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHtmb3JtYXREYXRlKGRheSwgXCJQUFBQXCIsIHRoaXMucHJvcHMubG9jYWxlKX1gO1xuICB9O1xuXG4gIC8vIEEgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBob2xpZGF5J3MgbmFtZSBhcyB0aXRsZSdzIGNvbnRlbnRcbiAgZ2V0VGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzID0gbmV3IE1hcCgpLCBleGNsdWRlRGF0ZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29tcGFyZUR0ID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICBjb25zdCB0aXRsZXMgPSBbXTtcbiAgICBpZiAoaG9saWRheXMuaGFzKGNvbXBhcmVEdCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKC4uLmhvbGlkYXlzLmdldChjb21wYXJlRHQpLmhvbGlkYXlOYW1lcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRXhjbHVkZWQoKSkge1xuICAgICAgdGl0bGVzLnB1c2goXG4gICAgICAgIGV4Y2x1ZGVEYXRlc1xuICAgICAgICAgID8uZmlsdGVyKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICAgIGlzU2FtZURheShleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlLCBkYXkpLFxuICAgICAgICAgIClcbiAgICAgICAgICAubWFwKChleGNsdWRlRGF0ZSkgPT4gZXhjbHVkZURhdGUubWVzc2FnZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGVzLmpvaW4oXCIsIFwiKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChzZWxlY3RlZCwgcHJlU2VsZWN0aW9uKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSBzZWxlY3RlZCB8fCB0aGlzLnByb3BzLnNlbGVjdGVkO1xuICAgIGNvbnN0IHByZVNlbGVjdGlvbkRheSA9IHByZVNlbGVjdGlvbiB8fCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhKFxuICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgICAgICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyIHx8ICF0aGlzLmlzU3RhcnRPZldlZWsoKSlcbiAgICAgICkgJiZcbiAgICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAgICh0aGlzLmlzU2FtZURheShzZWxlY3RlZERheSkgJiZcbiAgICAgICAgICBpc1NhbWVEYXkocHJlU2VsZWN0aW9uRGF5LCBzZWxlY3RlZERheSkpKVxuICAgICAgICA/IDBcbiAgICAgICAgOiAtMTtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgZGF5XG4gIC8vIGZvY3VzIHRoZSBkYXkgb24gbW91bnQvdXBkYXRlIHNvIHRoYXQga2V5Ym9hcmQgbmF2aWdhdGlvbiB3b3JrcyB3aGlsZSBjeWNsaW5nIHRocm91Z2ggbW9udGhzIHdpdGggdXAgb3IgZG93biBrZXlzIChub3QgZm9yIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9ucylcbiAgLy8gcHJldmVudCBmb2N1cyBmb3IgdGhlc2UgYWN0aXZlRWxlbWVudCBjYXNlcyBzbyB3ZSBkb24ndCBwdWxsIGZvY3VzIGZyb20gdGhlIGlucHV0IGFzIHRoZSBjYWxlbmRhciBvcGVuc1xuICBoYW5kbGVGb2N1c0RheSA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICB0aGlzLmlzU2FtZURheSh0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBpbmxpbmUgdmVyc2lvbjpcbiAgICAgIC8vIGRvIG5vdCBmb2N1cyBvbiBpbml0aWFsIHJlbmRlciB0byBwcmV2ZW50IGF1dG9Gb2N1cyBpc3N1ZVxuICAgICAgLy8gZm9jdXMgYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQgdmlhIGtleWJvYXJkXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmUpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIERheVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIilcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvL2RheSBpcyBvbmUgb2YgdGhlIG5vbiByZW5kZXJlZCBkdXBsaWNhdGUgZGF5c1xuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgJiYgdGhpcy5pc0FmdGVyTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzRGF5ICYmIHRoaXMuZGF5RWwuY3VycmVudD8uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlckRheUNvbnRlbnRzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ICYmIHRoaXMuaXNCZWZvcmVNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHNcbiAgICAgID8gdGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50cyhnZXREYXRlKHRoaXMucHJvcHMuZGF5KSwgdGhpcy5wcm9wcy5kYXkpXG4gICAgICA6IGdldERhdGUodGhpcy5wcm9wcy5kYXkpO1xuICB9O1xuXG4gIHJlbmRlciA9ICgpID0+IChcbiAgICA8ZGl2XG4gICAgICByZWY9e3RoaXMuZGF5RWx9XG4gICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcyh0aGlzLnByb3BzLmRheSl9XG4gICAgICBvbktleURvd249e3RoaXMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKCl9XG4gICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgIHRpdGxlPXt0aGlzLmdldFRpdGxlKCl9XG4gICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWQoKX1cbiAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnREYXkoKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkKCkgfHwgdGhpcy5pc0luUmFuZ2UoKX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJEYXlDb250ZW50cygpfVxuICAgICAge3RoaXMuZ2V0VGl0bGUoKSAhPT0gXCJcIiAmJiAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm92ZXJsYXlcIj57dGhpcy5nZXRUaXRsZSgpfTwvc3Bhbj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vla051bWJlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhcmlhTGFiZWxQcmVmaXg6IFwid2VlayBcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB3ZWVrTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihFbGVtZW50KSB9KSxcbiAgICBdKSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNXZWVrTnVtYmVyKHByZXZQcm9wcyk7XG4gIH1cblxuICB3ZWVrTnVtYmVyRWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+XG4gICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAhaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgZ2V0VGFiSW5kZXggPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyICYmXG4gICAgKHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCkgfHxcbiAgICAgIChpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHRoaXMucHJvcHMuc2VsZWN0ZWQpKSlcbiAgICAgID8gMFxuICAgICAgOiAtMTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgd2Vlay1udW1iZXJcbiAgLy8gZm9jdXMgdGhlIHdlZWstbnVtYmVyIG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNXZWVrTnVtYmVyID0gKHByZXZQcm9wcyA9IHt9KSA9PiB7XG4gICAgbGV0IHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlIGFjdGl2ZUVsZW1lbnQgaXMgaW4gdGhlIGNvbnRhaW5lciwgYW5kIGl0IGlzIGFub3RoZXIgaW5zdGFuY2Ugb2YgV2Vla051bWJlclxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCIsXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzV2Vla051bWJlciAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudCAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2Vla051bWJlciwgYXJpYUxhYmVsUHJlZml4ID0gXCJ3ZWVrIFwiLCBvbkNsaWNrIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyLS1jbGlja2FibGVcIjogISFvbkNsaWNrLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tc2VsZWN0ZWRcIjpcbiAgICAgICAgISFvbkNsaWNrICYmIGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17dGhpcy53ZWVrTnVtYmVyRWx9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xzeCh3ZWVrTnVtYmVyQ2xhc3Nlcyl9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2FyaWFMYWJlbFByZWZpeH0gJHt0aGlzLnByb3BzLndlZWtOdW1iZXJ9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgID5cbiAgICAgICAge3dlZWtOdW1iZXJ9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgRGF5IGZyb20gXCIuL2RheVwiO1xuaW1wb3J0IFdlZWtOdW1iZXIgZnJvbSBcIi4vd2Vla19udW1iZXJcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuXG5pbXBvcnQgeyBhZGREYXlzLCBnZXRXZWVrLCBnZXRTdGFydE9mV2VlaywgaXNTYW1lRGF5IH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWVrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgfTtcbiAgfVxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVXZWVrQ2xpY2sgPSAoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICB0aGlzLmhhbmRsZURheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXRXZWVrTnVtYmVyID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKGRhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0V2VlayhkYXRlKTtcbiAgfTtcblxuICByZW5kZXJEYXlzID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gdGhpcy5zdGFydE9mV2VlaygpO1xuICAgIGNvbnN0IGRheXMgPSBbXTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyID0gdGhpcy5mb3JtYXRXZWVrTnVtYmVyKHN0YXJ0T2ZXZWVrKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcikge1xuICAgICAgY29uc3Qgb25DbGlja0FjdGlvbiA9XG4gICAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgICAgICA/IHRoaXMuaGFuZGxlV2Vla0NsaWNrLmJpbmQodGhpcywgc3RhcnRPZldlZWssIHdlZWtOdW1iZXIpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBkYXlzLnB1c2goXG4gICAgICAgIDxXZWVrTnVtYmVyXG4gICAgICAgICAga2V5PVwiV1wiXG4gICAgICAgICAgd2Vla051bWJlcj17d2Vla051bWJlcn1cbiAgICAgICAgICBkYXRlPXtzdGFydE9mV2Vla31cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQWN0aW9ufVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcn1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgIC8+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAga2V5PXtkYXkudmFsdWVPZigpfVxuICAgICAgICAgICAgZGF5PXtkYXl9XG4gICAgICAgICAgICBtb250aD17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2suYmluZCh0aGlzLCBkYXkpfVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIHN0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMuc3RhcnRPZldlZWsoKSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB3ZWVrTnVtYmVyQ2xhc3NlcyA9IHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1wiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1zZWxlY3RlZFwiOiBpc1NhbWVEYXkoXG4gICAgICAgIHRoaXMuc3RhcnRPZldlZWsoKSxcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfT57dGhpcy5yZW5kZXJEYXlzKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBXZWVrIGZyb20gXCIuL3dlZWtcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQgPSA2O1xuXG5jb25zdCBNT05USF9DT0xVTU5TX0xBWU9VVCA9IHtcbiAgVFdPX0NPTFVNTlM6IFwidHdvX2NvbHVtbnNcIixcbiAgVEhSRUVfQ09MVU1OUzogXCJ0aHJlZV9jb2x1bW5zXCIsXG4gIEZPVVJfQ09MVU1OUzogXCJmb3VyX2NvbHVtbnNcIixcbn07XG5jb25zdCBNT05USF9DT0xVTU5TID0ge1xuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzIsIDNdLFxuICAgICAgWzQsIDVdLFxuICAgICAgWzYsIDddLFxuICAgICAgWzgsIDldLFxuICAgICAgWzEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDIsXG4gIH0sXG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyXSxcbiAgICAgIFszLCA0LCA1XSxcbiAgICAgIFs2LCA3LCA4XSxcbiAgICAgIFs5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAzLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuRk9VUl9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyLCAzXSxcbiAgICAgIFs0LCA1LCA2LCA3XSxcbiAgICAgIFs4LCA5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiA0LFxuICB9LFxufTtcbmNvbnN0IE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQgPSAxO1xuXG5mdW5jdGlvbiBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuKSB7XG4gIGlmIChzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcikgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OUztcbiAgaWYgKHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5UV09fQ09MVU1OUztcbiAgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULlRIUkVFX0NPTFVNTlM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb3JkZXJJbkRpc3BsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25Nb250aEtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIE1PTlRIX1JFRlMgPSBbLi4uQXJyYXkoMTIpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuICBRVUFSVEVSX1JFRlMgPSBbLi4uQXJyYXkoNCldLm1hcCgoKSA9PiBSZWFjdC5jcmVhdGVSZWYoKSk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQsIHRoaXMucHJvcHMub3JkZXJJbkRpc3BsYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKCk7XG4gICAgfVxuICB9O1xuXG4gIGlzUmFuZ2VTdGFydE1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aCh1dGlscy5zZXRNb250aChkYXksIG0pLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VTdGFydFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQgPSAobSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aCA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKCEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fCAhc2VsZWN0aW5nRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1dlZWtJbk1vbnRoID0gKHN0YXJ0T2ZXZWVrKSA9PiB7XG4gICAgY29uc3QgZGF5ID0gdGhpcy5wcm9wcy5kYXk7XG4gICAgY29uc3QgZW5kT2ZXZWVrID0gdXRpbHMuYWRkRGF5cyhzdGFydE9mV2VlaywgNik7XG4gICAgcmV0dXJuIChcbiAgICAgIHV0aWxzLmlzU2FtZU1vbnRoKHN0YXJ0T2ZXZWVrLCBkYXkpIHx8IHV0aWxzLmlzU2FtZU1vbnRoKGVuZE9mV2VlaywgZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50TW9udGggPSAoZGF5LCBtKSA9PlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcih1dGlscy5uZXdEYXRlKCkpICYmXG4gICAgbSA9PT0gdXRpbHMuZ2V0TW9udGgodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc0N1cnJlbnRRdWFydGVyID0gKGRheSwgcSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIHEgPT09IHV0aWxzLmdldFF1YXJ0ZXIodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoZGF5LCBtLCBzZWxlY3RlZCkgPT5cbiAgICB1dGlscy5nZXRNb250aChzZWxlY3RlZCkgPT09IG0gJiZcbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIoc2VsZWN0ZWQpO1xuXG4gIGlzU2VsZWN0ZWRRdWFydGVyID0gKGRheSwgcSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0UXVhcnRlcihkYXkpID09PSBxICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICByZW5kZXJXZWVrcyA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrcyA9IFtdO1xuICAgIHZhciBpc0ZpeGVkSGVpZ2h0ID0gdGhpcy5wcm9wcy5maXhlZEhlaWdodDtcblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgYnJlYWtBZnRlck5leHRQdXNoID0gZmFsc2U7XG4gICAgbGV0IGN1cnJlbnRXZWVrU3RhcnQgPSB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgIHV0aWxzLmdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRheSksXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICApXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQ7XG5cbiAgICBjb25zdCBwcmVTZWxlY3Rpb24gPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB3ZWVrcy5wdXNoKFxuICAgICAgICA8V2Vla1xuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRheT17Y3VycmVudFdlZWtTdGFydH1cbiAgICAgICAgICBtb250aD17dXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpfVxuICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3ByZVNlbGVjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAvPixcbiAgICAgICk7XG5cbiAgICAgIGlmIChicmVha0FmdGVyTmV4dFB1c2gpIGJyZWFrO1xuXG4gICAgICBpKys7XG4gICAgICBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuYWRkV2Vla3MoY3VycmVudFdlZWtTdGFydCwgMSk7XG5cbiAgICAgIC8vIElmIG9uZSBvZiB0aGVzZSBjb25kaXRpb25zIGlzIHRydWUsIHdlIHdpbGwgZWl0aGVyIGJyZWFrIG9uIHRoaXMgd2Vla1xuICAgICAgLy8gb3IgYnJlYWsgb24gdGhlIG5leHQgd2Vla1xuICAgICAgY29uc3QgaXNGaXhlZEFuZEZpbmFsV2VlayA9XG4gICAgICAgIGlzRml4ZWRIZWlnaHQgJiYgaSA+PSBGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVDtcbiAgICAgIGNvbnN0IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoID1cbiAgICAgICAgIWlzRml4ZWRIZWlnaHQgJiYgIXRoaXMuaXNXZWVrSW5Nb250aChjdXJyZW50V2Vla1N0YXJ0KTtcblxuICAgICAgaWYgKGlzRml4ZWRBbmRGaW5hbFdlZWsgfHwgaXNOb25GaXhlZEFuZE91dE9mTW9udGgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGVla05leHRNb250aCkge1xuICAgICAgICAgIGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gd2Vla3M7XG4gIH07XG5cbiAgb25Nb250aENsaWNrID0gKGUsIG0pID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aCh0aGlzLnByb3BzLmRheSwgbSk7XG5cbiAgICBpZiAodXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpLCBlKTtcbiAgfTtcblxuICBvbk1vbnRoTW91c2VFbnRlciA9IChtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVNb250aE5hdmlnYXRpb24gPSAobmV3TW9udGgsIG5ld0RhdGUpID0+IHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudCAmJlxuICAgICAgdGhpcy5NT05USF9SRUZTW25ld01vbnRoXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25Nb250aEtleURvd24gPSAoZXZlbnQsIG1vbnRoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWQsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNldFByZVNlbGVjdGlvbixcbiAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSAhPT0gXCJUYWJcIikge1xuICAgICAgLy8gcHJldmVudERlZmF1bHQgb24gdGFiIGV2ZW50IGJsb2NrcyBmb2N1cyBjaGFuZ2VcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IG1vbnRoQ29sdW1uc0xheW91dCA9IGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICApO1xuICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQgPVxuICAgICAgICBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0udmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0O1xuICAgICAgY29uc3QgbW9udGhzR3JpZCA9IE1PTlRIX0NPTFVNTlNbbW9udGhDb2x1bW5zTGF5b3V0XS5ncmlkO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldmVudCwgbW9udGgpO1xuICAgICAgICAgIHNldFByZVNlbGVjdGlvbihzZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VULFxuICAgICAgICAgICAgdXRpbHMuYWRkTW9udGhzKHByZVNlbGVjdGlvbiwgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLnN1Yk1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBtb250aCBvbiB0aGUgZmlyc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkWzBdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoICsgMTIgLSB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoIC0gdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGxhc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkW21vbnRoc0dyaWQubGVuZ3RoIC0gMV0uaW5jbHVkZXMobW9udGgpXG4gICAgICAgICAgICAgID8gbW9udGggLSAxMiArIHZlcnRpY2FsT2Zmc2V0XG4gICAgICAgICAgICAgIDogbW9udGggKyB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIHZlcnRpY2FsT2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duICYmIGhhbmRsZU9uTW9udGhLZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBvblF1YXJ0ZXJDbGljayA9IChlLCBxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2sodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25RdWFydGVyTW91c2VFbnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mUXVhcnRlcihsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiA9IChuZXdRdWFydGVyLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLlFVQVJURVJfUkVGU1tuZXdRdWFydGVyIC0gMV0uY3VycmVudCAmJlxuICAgICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBvblF1YXJ0ZXJLZXlEb3duID0gKGV2ZW50LCBxdWFydGVyKSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXZlbnQsIHF1YXJ0ZXIpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlUXVhcnRlck5hdmlnYXRpb24oXG4gICAgICAgICAgICBxdWFydGVyID09PSA0ID8gMSA6IHF1YXJ0ZXIgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkUXVhcnRlcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gMSA/IDQgOiBxdWFydGVyIC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpc01vbnRoRGlzYWJsZWQgPSAobW9udGgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtb250aCk7XG4gICAgcmV0dXJuIChcbiAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcykgJiZcbiAgICAgIHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpXG4gICAgKTtcbiAgfTtcblxuICBnZXRNb250aENsYXNzTmFtZXMgPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGVkLCBwcmVTZWxlY3Rpb24sIG1vbnRoQ2xhc3NOYW1lIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGhDbGFzc05hbWUgPSBtb250aENsYXNzTmFtZVxuICAgICAgPyBtb250aENsYXNzTmFtZSh1dGlscy5zZXRNb250aChkYXksIG0pKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19tb250aC0ke219YCxcbiAgICAgIF9tb250aENsYXNzTmFtZSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1kaXNhYmxlZFwiOiB0aGlzLmlzTW9udGhEaXNhYmxlZChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRNb250aChcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgbSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBwcmVTZWxlY3Rpb24pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0taW4tcmFuZ2VcIjogdXRpbHMuaXNNb250aEluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgbSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnRNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFRhYkluZGV4ID0gKG0pID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZE1vbnRoID0gdXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIG0gPT09IHByZVNlbGVjdGVkTW9udGhcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRRdWFydGVyVGFiSW5kZXggPSAocSkgPT4ge1xuICAgIGNvbnN0IHByZVNlbGVjdGVkUXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIHEgPT09IHByZVNlbGVjdGVkUXVhcnRlclxuICAgICAgICA/IFwiMFwiXG4gICAgICAgIDogXCItMVwiO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9IChtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeCA9IFwiQ2hvb3NlXCIsXG4gICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCA9IFwiTm90IGF2YWlsYWJsZVwiLFxuICAgICAgZGF5LFxuICAgICAgbG9jYWxlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbW9udGgpO1xuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQobGFiZWxEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobGFiZWxEYXRlKVxuICAgICAgICA/IGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4XG4gICAgICAgIDogY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4O1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHt1dGlscy5mb3JtYXREYXRlKGxhYmVsRGF0ZSwgXCJNTU1NIHl5eXlcIiwgbG9jYWxlKX1gO1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJDbGFzc05hbWVzID0gKHEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLSR7cX1gLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBxLFxuICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzUXVhcnRlckluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgcSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNSYW5nZVN0YXJ0UXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmRRdWFydGVyKHEpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldE1vbnRoQ29udGVudCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBzaG93RnVsbE1vbnRoWWVhclBpY2tlciwgcmVuZGVyTW9udGhDb250ZW50LCBsb2NhbGUsIGRheSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvcnRNb250aFRleHQgPSB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBjb25zdCBmdWxsTW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShtLCBsb2NhbGUpO1xuICAgIGlmIChyZW5kZXJNb250aENvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNb250aENvbnRlbnQobSwgc2hvcnRNb250aFRleHQsIGZ1bGxNb250aFRleHQsIGRheSk7XG4gICAgfVxuICAgIHJldHVybiBzaG93RnVsbE1vbnRoWWVhclBpY2tlciA/IGZ1bGxNb250aFRleHQgOiBzaG9ydE1vbnRoVGV4dDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ29udGVudCA9IChxKSA9PiB7XG4gICAgY29uc3QgeyByZW5kZXJRdWFydGVyQ29udGVudCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0UXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlKHEsIGxvY2FsZSk7XG4gICAgcmV0dXJuIHJlbmRlclF1YXJ0ZXJDb250ZW50XG4gICAgICA/IHJlbmRlclF1YXJ0ZXJDb250ZW50KHEsIHNob3J0UXVhcnRlcilcbiAgICAgIDogc2hvcnRRdWFydGVyO1xuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBzZWxlY3RlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1vbnRoQ29sdW1ucyA9XG4gICAgICBNT05USF9DT0xVTU5TW1xuICAgICAgICBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgKVxuICAgICAgXS5ncmlkO1xuICAgIHJldHVybiBtb250aENvbHVtbnMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC13cmFwcGVyXCIga2V5PXtpfT5cbiAgICAgICAge21vbnRoLm1hcCgobSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17dGhpcy5NT05USF9SRUZTW21dfVxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25Nb250aENsaWNrKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhLZXlEb3duKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vbk1vbnRoTW91c2VFbnRlcihtKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleChtKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRNb250aENsYXNzTmFtZXMobSl9XG4gICAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzTW9udGhEaXNhYmxlZChtKX1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5nZXRBcmlhTGFiZWwobSl9XG4gICAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBzZWxlY3RlZCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuZ2V0TW9udGhDb250ZW50KG0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIHJlbmRlclF1YXJ0ZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBxdWFydGVycyA9IFsxLCAyLCAzLCA0XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXdyYXBwZXJcIj5cbiAgICAgICAge3F1YXJ0ZXJzLm1hcCgocSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIHJlZj17dGhpcy5RVUFSVEVSX1JFRlNbal19XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uUXVhcnRlcktleURvd24oZXYsIHEpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vblF1YXJ0ZXJNb3VzZUVudGVyKHEpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0UXVhcnRlckNsYXNzTmFtZXMocSl9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgc2VsZWN0ZWQpfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0UXVhcnRlclRhYkluZGV4KHEpfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFF1YXJ0ZXIoZGF5LCBxKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldFF1YXJ0ZXJDb250ZW50KHEpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgZ2V0Q2xhc3NOYW1lcyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RpbmdEYXRlLFxuICAgICAgc2VsZWN0c1N0YXJ0LFxuICAgICAgc2VsZWN0c0VuZCxcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXIsXG4gICAgICBzaG93V2Vla1BpY2tlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFwiLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLS1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICBzZWxlY3RpbmdEYXRlICYmIChzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCksXG4gICAgICB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoUGlja2VyXCI6IHNob3dNb250aFllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyUGlja2VyXCI6IHNob3dRdWFydGVyWWVhclBpY2tlciB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtQaWNrZXJcIjogc2hvd1dlZWtQaWNrZXIgfSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4ID0gXCJNb250aCBcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGZvcm1hdHRlZEFyaWFMYWJlbFByZWZpeCA9IGFyaWFMYWJlbFByZWZpeFxuICAgICAgPyBhcmlhTGFiZWxQcmVmaXgudHJpbSgpICsgXCIgXCJcbiAgICAgIDogXCJcIjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUxlYXZlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUxlYXZlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgYXJpYS1sYWJlbD17YCR7Zm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4fSR7dXRpbHMuZm9ybWF0RGF0ZShkYXksIFwiTU1NTSwgeXl5eVwiLCB0aGlzLnByb3BzLmxvY2FsZSl9YH1cbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgPlxuICAgICAgICB7c2hvd01vbnRoWWVhclBpY2tlclxuICAgICAgICAgID8gdGhpcy5yZW5kZXJNb250aHMoKVxuICAgICAgICAgIDogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgICA/IHRoaXMucmVuZGVyUXVhcnRlcnMoKVxuICAgICAgICAgICAgOiB0aGlzLnJlbmRlcldlZWtzKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge1xuICBnZXRIb3VycyxcbiAgZ2V0TWludXRlcyxcbiAgbmV3RGF0ZSxcbiAgZ2V0U3RhcnRPZkRheSxcbiAgYWRkTWludXRlcyxcbiAgZm9ybWF0RGF0ZSxcbiAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlLFxuICBpc1RpbWVEaXNhYmxlZCxcbiAgdGltZXNUb0luamVjdEFmdGVyLFxuICBnZXRIb3Vyc0luRGF5LFxuICBpc1NhbWVNaW51dGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcnZhbHM6IDMwLFxuICAgICAgb25UaW1lQ2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHRvZGF5QnV0dG9uOiBudWxsLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgY2FsY0NlbnRlclBvc2l0aW9uID0gKGxpc3RIZWlnaHQsIGNlbnRlckxpUmVmKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNlbnRlckxpUmVmLm9mZnNldFRvcCAtIChsaXN0SGVpZ2h0IC8gMiAtIGNlbnRlckxpUmVmLmNsaWVudEhlaWdodCAvIDIpXG4gICAgKTtcbiAgfTtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhSZWY6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaGVpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIGNvZGUgdG8gZW5zdXJlIHNlbGVjdGVkIHRpbWUgd2lsbCBhbHdheXMgYmUgaW4gZm9jdXMgd2l0aGluIHRpbWUgd2luZG93IHdoZW4gaXQgZmlyc3QgYXBwZWFyc1xuICAgIHRoaXMuc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFJlZiAmJiB0aGlzLmhlYWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSA9ICgpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybjtcblxuICAgICAgdGhpcy5saXN0LnNjcm9sbFRvcCA9XG4gICAgICAgIHRoaXMuY2VudGVyTGkgJiZcbiAgICAgICAgVGltZS5jYWxjQ2VudGVyUG9zaXRpb24oXG4gICAgICAgICAgdGhpcy5wcm9wcy5tb250aFJlZlxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm1vbnRoUmVmLmNsaWVudEhlaWdodCAtIHRoaXMuaGVhZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmxpc3QuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIHRoaXMuY2VudGVyTGksXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAodGltZSkgPT4ge1xuICAgIGlmIChcbiAgICAgICgodGhpcy5wcm9wcy5taW5UaW1lIHx8IHRoaXMucHJvcHMubWF4VGltZSkgJiZcbiAgICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmluY2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRpbWUpO1xuICB9O1xuXG4gIGlzU2VsZWN0ZWRUaW1lID0gKHRpbWUpID0+XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJiBpc1NhbWVNaW51dGUodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGltZSk7XG5cbiAgaXNEaXNhYmxlZFRpbWUgPSAodGltZSkgPT5cbiAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgdGhpcy5wcm9wcykpIHx8XG4gICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyVGltZSkgJiZcbiAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKTtcblxuICBsaUNsYXNzZXMgPSAodGltZSkgPT4ge1xuICAgIGxldCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbVwiLFxuICAgICAgdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lID8gdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lKHRpbWUpIDogdW5kZWZpbmVkLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0tZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgLy9jb252ZXJ0IHRoaXMucHJvcHMuaW50ZXJ2YWxzIGFuZCB0aGUgcmVsZXZhbnQgdGltZSB0byBzZWNvbmRzIGFuZCBjaGVjayBpZiBpdCBpdCdzIGEgY2xlYW4gbXVsdGlwbGUgb2YgdGhlIGludGVydmFsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgKGdldEhvdXJzKHRpbWUpICogMzYwMCArIGdldE1pbnV0ZXModGltZSkgKiA2MCArIGdldFNlY29uZHModGltZSkpICVcbiAgICAgICAgKHRoaXMucHJvcHMuaW50ZXJ2YWxzICogNjApICE9PVxuICAgICAgICAwXG4gICAgKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0taW5qZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50LCB0aW1lKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmcuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICB0aGlzLmhhbmRsZUNsaWNrKHRpbWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgcmVuZGVyVGltZXMgPSAoKSA9PiB7XG4gICAgbGV0IHRpbWVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQgPyB0aGlzLnByb3BzLmZvcm1hdCA6IFwicFwiO1xuICAgIGNvbnN0IGludGVydmFscyA9IHRoaXMucHJvcHMuaW50ZXJ2YWxzO1xuXG4gICAgY29uc3QgYWN0aXZlRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkIHx8IHRoaXMucHJvcHMub3BlblRvRGF0ZSB8fCBuZXdEYXRlKCk7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0U3RhcnRPZkRheShhY3RpdmVEYXRlKTtcbiAgICBjb25zdCBzb3J0ZWRJbmplY3RUaW1lcyA9XG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzICYmXG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtaW51dGVzSW5EYXkgPSA2MCAqIGdldEhvdXJzSW5EYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IG1pbnV0ZXNJbkRheSAvIGludGVydmFscztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlwbGllcjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGFkZE1pbnV0ZXMoYmFzZSwgaSAqIGludGVydmFscyk7XG4gICAgICB0aW1lcy5wdXNoKGN1cnJlbnRUaW1lKTtcblxuICAgICAgaWYgKHNvcnRlZEluamVjdFRpbWVzKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzVG9JbmplY3QgPSB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gICAgICAgICAgYmFzZSxcbiAgICAgICAgICBjdXJyZW50VGltZSxcbiAgICAgICAgICBpLFxuICAgICAgICAgIGludGVydmFscyxcbiAgICAgICAgICBzb3J0ZWRJbmplY3RUaW1lcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGltZXMgPSB0aW1lcy5jb25jYXQodGltZXNUb0luamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHRpbWUgdG8gZm9jdXMgYW5kIHNjcm9sbCBpbnRvIHZpZXcgd2hlbiBjb21wb25lbnQgbW91bnRzXG4gICAgY29uc3QgdGltZVRvRm9jdXMgPSB0aW1lcy5yZWR1Y2UoKHByZXYsIHRpbWUpID0+IHtcbiAgICAgIGlmICh0aW1lLmdldFRpbWUoKSA8PSBhY3RpdmVEYXRlLmdldFRpbWUoKSkge1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRpbWVzWzBdKTtcblxuICAgIHJldHVybiB0aW1lcy5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGltZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmxpQ2xhc3Nlcyh0aW1lKX1cbiAgICAgICAgICByZWY9eyhsaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWUgPT09IHRpbWVUb0ZvY3VzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VudGVyTGkgPSBsaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9uS2V5RG93bihldiwgdGltZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGltZSA9PT0gdGltZVRvRm9jdXMgPyAwIDogLTF9XG4gICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtmb3JtYXREYXRlKHRpbWUsIGZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lciAke1xuICAgICAgICAgIHRoaXMucHJvcHMudG9kYXlCdXR0b25cbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lci0td2l0aC10b2RheS1idXR0b25cIlxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZSAke1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZS0tb25seVwiXG4gICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgIH1gfVxuICAgICAgICAgIHJlZj17KGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19oZWFkZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWJveFwiPlxuICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdFwiXG4gICAgICAgICAgICAgIHJlZj17KGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBzdHlsZT17aGVpZ2h0ID8geyBoZWlnaHQgfSA6IHt9fVxuICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVzKCl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGdldFllYXIsIG5ld0RhdGUgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuY29uc3QgVkVSVElDQUxfTkFWSUdBVElPTl9PRkZTRVQgPSAzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGVhclNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldFByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgWUVBUl9SRUZTID0gWy4uLkFycmF5KHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIpXS5tYXAoKCkgPT5cbiAgICBSZWFjdC5jcmVhdGVSZWYoKSxcbiAgKTtcblxuICBpc0Rpc2FibGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RGlzYWJsZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNFeGNsdWRlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheUV4Y2x1ZGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIHNlbGVjdGluZ0RhdGUgPSAoKSA9PiB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgdXBkYXRlRm9jdXNPblBhZ2luYXRlID0gKHJlZkluZGV4KSA9PiB7XG4gICAgY29uc3Qgd2FpdEZvclJlUmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5ZRUFSX1JFRlNbcmVmSW5kZXhdLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdhaXRGb3JSZVJlbmRlcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVllYXJOYXZpZ2F0aW9uID0gKG5ld1llYXIsIG5ld0RhdGUpID0+IHtcbiAgICBjb25zdCB7IGRhdGUsIHllYXJJdGVtTnVtYmVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKGRhdGUsIHllYXJJdGVtTnVtYmVyKTtcblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG5cbiAgICBpZiAobmV3WWVhciAtIHN0YXJ0UGVyaW9kIDwgMCkge1xuICAgICAgdGhpcy51cGRhdGVGb2N1c09uUGFnaW5hdGUoeWVhckl0ZW1OdW1iZXIgLSAoc3RhcnRQZXJpb2QgLSBuZXdZZWFyKSk7XG4gICAgfSBlbHNlIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPj0geWVhckl0ZW1OdW1iZXIpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKFxuICAgICAgICBNYXRoLmFicyh5ZWFySXRlbU51bWJlciAtIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QpKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHRoaXMuWUVBUl9SRUZTW25ld1llYXIgLSBzdGFydFBlcmlvZF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9ICh5LCBvdGhlcikgPT4gdXRpbHMuaXNTYW1lRGF5KHksIG90aGVyKTtcblxuICBpc0N1cnJlbnRZZWFyID0gKHkpID0+IHkgPT09IGdldFllYXIobmV3RGF0ZSgpKTtcblxuICBpc1JhbmdlU3RhcnQgPSAoeSkgPT5cbiAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSAmJlxuICAgIHRoaXMucHJvcHMuZW5kRGF0ZSAmJlxuICAgIHV0aWxzLmlzU2FtZVllYXIodXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpLCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSk7XG5cbiAgaXNSYW5nZUVuZCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuZW5kRGF0ZSk7XG5cbiAgaXNJblJhbmdlID0gKHkpID0+XG4gICAgdXRpbHMuaXNZZWFySW5SYW5nZSh5LCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICF0aGlzLnNlbGVjdGluZ0RhdGUoKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMuc2VsZWN0aW5nRGF0ZSgpLCBlbmREYXRlKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCBzdGFydERhdGUsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKHkpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICh5KSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIodGhpcy5wcm9wcy5kYXRlLCB5KSk7XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5zZWxlY3RlZCkpICYmXG4gICAgICB1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pKVxuICAgICk7XG4gIH07XG5cbiAgb25ZZWFyQ2xpY2sgPSAoZSwgeSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLmhhbmRsZVllYXJDbGljayh1dGlscy5nZXRTdGFydE9mWWVhcih1dGlscy5zZXRZZWFyKGRhdGUsIHkpKSwgZSk7XG4gIH07XG5cbiAgb25ZZWFyS2V5RG93biA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBrZXkgfSA9IGU7XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciwgaGFuZGxlT25LZXlEb3duIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGtleSAhPT0gXCJUYWJcIikge1xuICAgICAgLy8gcHJldmVudERlZmF1bHQgb24gdGFiIGV2ZW50IGJsb2NrcyBmb2N1cyBjaGFuZ2VcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25ZZWFyQ2xpY2soZSwgeSk7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHkgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjoge1xuICAgICAgICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKGRhdGUsIHllYXJJdGVtTnVtYmVyKTtcbiAgICAgICAgICBsZXQgb2Zmc2V0ID0gVkVSVElDQUxfTkFWSUdBVElPTl9PRkZTRVQ7XG4gICAgICAgICAgbGV0IG5ld1llYXIgPSB5IC0gb2Zmc2V0O1xuXG4gICAgICAgICAgaWYgKG5ld1llYXIgPCBzdGFydFBlcmlvZCkge1xuICAgICAgICAgICAgY29uc3QgbGVmdE92ZXJPZmZzZXQgPSB5ZWFySXRlbU51bWJlciAlIG9mZnNldDtcblxuICAgICAgICAgICAgaWYgKHkgPj0gc3RhcnRQZXJpb2QgJiYgeSA8IHN0YXJ0UGVyaW9kICsgbGVmdE92ZXJPZmZzZXQpIHtcbiAgICAgICAgICAgICAgb2Zmc2V0ID0gbGVmdE92ZXJPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvZmZzZXQgKz0gbGVmdE92ZXJPZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1llYXIgPSB5IC0gb2Zmc2V0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICBuZXdZZWFyLFxuICAgICAgICAgICAgdXRpbHMuc3ViWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIG9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6IHtcbiAgICAgICAgICBjb25zdCB7IGVuZFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoZGF0ZSwgeWVhckl0ZW1OdW1iZXIpO1xuICAgICAgICAgIGxldCBvZmZzZXQgPSBWRVJUSUNBTF9OQVZJR0FUSU9OX09GRlNFVDtcbiAgICAgICAgICBsZXQgbmV3WWVhciA9IHkgKyBvZmZzZXQ7XG5cbiAgICAgICAgICBpZiAobmV3WWVhciA+IGVuZFBlcmlvZCkge1xuICAgICAgICAgICAgY29uc3QgbGVmdE92ZXJPZmZzZXQgPSB5ZWFySXRlbU51bWJlciAlIG9mZnNldDtcblxuICAgICAgICAgICAgaWYgKHkgPD0gZW5kUGVyaW9kICYmIHkgPiBlbmRQZXJpb2QgLSBsZWZ0T3Zlck9mZnNldCkge1xuICAgICAgICAgICAgICBvZmZzZXQgPSBsZWZ0T3Zlck9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9mZnNldCArPSBsZWZ0T3Zlck9mZnNldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3WWVhciA9IHkgKyBvZmZzZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG5ld1llYXIsXG4gICAgICAgICAgICB1dGlscy5hZGRZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgb2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT25LZXlEb3duICYmIGhhbmRsZU9uS2V5RG93bihlKTtcbiAgfTtcblxuICBnZXRZZWFyQ2xhc3NOYW1lcyA9ICh5KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0ZSxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBleGNsdWRlRGF0ZXMsXG4gICAgICBpbmNsdWRlRGF0ZXMsXG4gICAgICBmaWx0ZXJEYXRlLFxuICAgICAgeWVhckNsYXNzTmFtZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX195ZWFyLSR7eX1gLFxuICAgICAgeWVhckNsYXNzTmFtZSA/IHllYXJDbGFzc05hbWUodXRpbHMuc2V0WWVhcihkYXRlLCB5KSkgOiB1bmRlZmluZWQsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RlZFwiOiB5ID09PSBnZXRZZWFyKHNlbGVjdGVkKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSB8fCBleGNsdWRlRGF0ZXMgfHwgaW5jbHVkZURhdGVzIHx8IGZpbHRlckRhdGUpICYmXG4gICAgICAgICAgdXRpbHMuaXNZZWFyRGlzYWJsZWQoeSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZVN0YXJ0KHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZUVuZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50WWVhcih5KSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRZZWFyVGFiSW5kZXggPSAoeSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSByZXR1cm4gXCItMVwiO1xuICAgIGNvbnN0IHByZVNlbGVjdGVkID0gdXRpbHMuZ2V0WWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgICByZXR1cm4geSA9PT0gcHJlU2VsZWN0ZWQgPyBcIjBcIiA6IFwiLTFcIjtcbiAgfTtcblxuICBnZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGluZ0RhdGUsIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xzeChcInJlYWN0LWRhdGVwaWNrZXJfX3llYXJcIiwge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSxcbiAgICB9KTtcbiAgfTtcblxuICBnZXRZZWFyQ29udGVudCA9ICh5KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnQgPyB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50KHkpIDogeTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeWVhcnNMaXN0ID0gW107XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciwgb25ZZWFyTW91c2VFbnRlciwgb25ZZWFyTW91c2VMZWF2ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChcbiAgICAgIGRhdGUsXG4gICAgICB5ZWFySXRlbU51bWJlcixcbiAgICApO1xuXG4gICAgZm9yIChsZXQgeSA9IHN0YXJ0UGVyaW9kOyB5IDw9IGVuZFBlcmlvZDsgeSsrKSB7XG4gICAgICB5ZWFyc0xpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17dGhpcy5ZRUFSX1JFRlNbeSAtIHN0YXJ0UGVyaW9kXX1cbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25ZZWFyQ2xpY2soZXYsIHkpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1NwYWNlS2V5RG93bihldikpIHtcbiAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uWWVhcktleURvd24oZXYsIHkpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0WWVhclRhYkluZGV4KHkpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ2xhc3NOYW1lcyh5KX1cbiAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUVudGVyKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VMZWF2ZShldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17eX1cbiAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50WWVhcih5KSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMuZ2V0WWVhckNvbnRlbnQoeSl9XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldFllYXJDb250YWluZXJDbGFzc05hbWVzKCl9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci13cmFwcGVyXCJcbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNsZWFyU2VsZWN0aW5nRGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5ZWFyc0xpc3R9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbnB1dFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB0aW1lU3RyaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGltZTogdGhpcy5wcm9wcy50aW1lU3RyaW5nLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgIGlmIChwcm9wcy50aW1lU3RyaW5nICE9PSBzdGF0ZS50aW1lKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aW1lOiBwcm9wcy50aW1lU3RyaW5nLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gbnVsbCB0byBpbmRpY2F0ZSBubyBjaGFuZ2UgdG8gc3RhdGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvblRpbWVDaGFuZ2UgPSAodGltZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0aW1lIH0pO1xuXG4gICAgY29uc3QgeyBkYXRlOiBwcm9wRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc1Byb3BEYXRlVmFsaWQgPSBwcm9wRGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKHByb3BEYXRlKTtcbiAgICBjb25zdCBkYXRlID0gaXNQcm9wRGF0ZVZhbGlkID8gcHJvcERhdGUgOiBuZXcgRGF0ZSgpO1xuXG4gICAgZGF0ZS5zZXRIb3Vycyh0aW1lLnNwbGl0KFwiOlwiKVswXSk7XG4gICAgZGF0ZS5zZXRNaW51dGVzKHRpbWUuc3BsaXQoXCI6XCIpWzFdKTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyVGltZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdGltZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRhdGUsIHRpbWVTdHJpbmcsIGN1c3RvbVRpbWVJbnB1dCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChjdXN0b21UaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tVGltZUlucHV0LCB7XG4gICAgICAgIGRhdGUsXG4gICAgICAgIHZhbHVlOiB0aW1lLFxuICAgICAgICBvbkNoYW5nZTogdGhpcy5vblRpbWVDaGFuZ2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0aW1lXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVGltZVwiXG4gICAgICAgIG5hbWU9XCJ0aW1lLWlucHV0XCJcbiAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgdmFsdWU9e3RpbWV9XG4gICAgICAgIG9uQ2hhbmdlPXsoZXYpID0+IHtcbiAgICAgICAgICB0aGlzLm9uVGltZUNoYW5nZShldi50YXJnZXQudmFsdWUgfHwgdGltZVN0cmluZyk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2lucHV0LXRpbWUtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19jYXB0aW9uXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0XCI+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lSW5wdXQoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbGVuZGFyQ29udGFpbmVyKHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5ID0gZmFsc2UsXG4gIHNob3dUaW1lID0gZmFsc2UsXG4gIGNsYXNzTmFtZSxcbiAgY2hpbGRyZW4sXG59KSB7XG4gIGxldCBhcmlhTGFiZWwgPSBzaG93VGltZVNlbGVjdE9ubHlcbiAgICA/IFwiQ2hvb3NlIFRpbWVcIlxuICAgIDogYENob29zZSBEYXRlJHtzaG93VGltZSA/IFwiIGFuZCBUaW1lXCIgOiBcIlwifWA7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuQ2FsZW5kYXJDb250YWluZXIucHJvcFR5cGVzID0ge1xuICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICBzaG93VGltZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcbiIsImltcG9ydCBZZWFyRHJvcGRvd24gZnJvbSBcIi4veWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93biBmcm9tIFwiLi9tb250aF95ZWFyX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGggZnJvbSBcIi4vbW9udGhcIjtcbmltcG9ydCBUaW1lIGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCBZZWFyIGZyb20gXCIuL3llYXJcIjtcbmltcG9ydCBJbnB1dFRpbWUgZnJvbSBcIi4vaW5wdXRUaW1lXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBDYWxlbmRhckNvbnRhaW5lciBmcm9tIFwiLi9jYWxlbmRhcl9jb250YWluZXJcIjtcbmltcG9ydCB7XG4gIG5ld0RhdGUsXG4gIHNldE1vbnRoLFxuICBnZXRNb250aCxcbiAgYWRkTW9udGhzLFxuICBzdWJNb250aHMsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBnZXRTdGFydE9mVG9kYXksXG4gIGFkZERheXMsXG4gIGZvcm1hdERhdGUsXG4gIHNldFllYXIsXG4gIGdldFllYXIsXG4gIGlzQmVmb3JlLFxuICBhZGRZZWFycyxcbiAgc3ViWWVhcnMsXG4gIGlzQWZ0ZXIsXG4gIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZSxcbiAgZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlNaW5JbkxvY2FsZSxcbiAgaXNTYW1lRGF5LFxuICBpc1NhbWVNb250aCxcbiAgbW9udGhEaXNhYmxlZEJlZm9yZSxcbiAgbW9udGhEaXNhYmxlZEFmdGVyLFxuICB5ZWFyRGlzYWJsZWRCZWZvcmUsXG4gIHllYXJEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQWZ0ZXIsXG4gIHllYXJzRGlzYWJsZWRCZWZvcmUsXG4gIHF1YXJ0ZXJEaXNhYmxlZEJlZm9yZSxcbiAgcXVhcnRlckRpc2FibGVkQWZ0ZXIsXG4gIGdldEVmZmVjdGl2ZU1pbkRhdGUsXG4gIGdldEVmZmVjdGl2ZU1heERhdGUsXG4gIGFkZFplcm8sXG4gIGlzVmFsaWQsXG4gIGdldFllYXJzUGVyaW9kLFxuICBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gIGdldE1vbnRoSW5Mb2NhbGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUyA9IFtcbiAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiLFxuICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiLFxuICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItc2VsZWN0XCIsXG5dO1xuXG5jb25zdCBpc0Ryb3Bkb3duU2VsZWN0ID0gKGVsZW1lbnQgPSB7fSkgPT4ge1xuICBjb25zdCBjbGFzc05hbWVzID0gKGVsZW1lbnQuY2xhc3NOYW1lIHx8IFwiXCIpLnNwbGl0KC9cXHMrLyk7XG4gIHJldHVybiBEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTLnNvbWUoXG4gICAgKHRlc3RDbGFzc25hbWUpID0+IGNsYXNzTmFtZXMuaW5kZXhPZih0ZXN0Q2xhc3NuYW1lKSA+PSAwLFxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb25Ecm9wZG93bkZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIG1vbnRoc1Nob3duOiAxLFxuICAgICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIGN1c3RvbVRpbWVJbnB1dDogbnVsbCxcbiAgICAgIHllYXJJdGVtTnVtYmVyOiBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheV0pXG4gICAgICAuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdlZWtEYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoc1Nob3duOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1vbnRoU2VsZWN0ZWRJbjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DbGlja091dHNpZGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Nb250aENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRHJvcGRvd25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93VGltZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25UaW1lQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtaW5UaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhUaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJUaW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd01vbnRoRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dQcmV2aW91c01vbnRoczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcnM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlV2Vla2RheXNTaG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla0RheTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2l0aFBvcnRhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2Vla0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZW5kZXJDdXN0b21IZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93UG9wcGVyQXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25EYXlLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldFByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmNvbnRhaW5lclJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRhdGU6IHRoaXMuZ2V0RGF0ZUluVmlldygpLFxuICAgICAgc2VsZWN0aW5nRGF0ZTogbnVsbCxcbiAgICAgIG1vbnRoQ29udGFpbmVyOiBudWxsLFxuICAgICAgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBtb250aENvbnRhaW5lciBoZWlnaHQgaXMgbmVlZGVkIGluIHRpbWUgY29tcG9uZW50XG4gICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBoZWlnaHQgZm9yIHRoZSB1bCBpbiB0aGUgdGltZSBjb21wb25lbnRcbiAgICAvLyBzZXRTdGF0ZSBoZXJlIHNvIGhlaWdodCBpcyBnaXZlbiBhZnRlciBmaW5hbCBjb21wb25lbnRcbiAgICAvLyBsYXlvdXQgaXMgcmVuZGVyZWRcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5hc3NpZ25Nb250aENvbnRhaW5lciA9ICgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aENvbnRhaW5lcjogdGhpcy5tb250aENvbnRhaW5lciB9KTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uICYmXG4gICAgICAoIWlzU2FtZURheSh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgcHJldlByb3BzLnByZVNlbGVjdGlvbikgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5tb250aFNlbGVjdGVkSW4gIT09IHByZXZQcm9wcy5tb250aFNlbGVjdGVkSW4pXG4gICAgKSB7XG4gICAgICBjb25zdCBoYXNNb250aENoYW5nZWQgPSAhaXNTYW1lTW9udGgoXG4gICAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICApO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIGRhdGU6IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBoYXNNb250aENoYW5nZWQgJiYgdGhpcy5oYW5kbGVDdXN0b21Nb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5vcGVuVG9EYXRlICYmXG4gICAgICAhaXNTYW1lRGF5KHRoaXMucHJvcHMub3BlblRvRGF0ZSwgcHJldlByb3BzLm9wZW5Ub0RhdGUpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0ZTogdGhpcy5wcm9wcy5vcGVuVG9EYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrT3V0c2lkZShldmVudCk7XG4gIH07XG5cbiAgc2V0Q2xpY2tPdXRzaWRlUmVmID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50O1xuICB9O1xuXG4gIGhhbmRsZURyb3Bkb3duRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoaXNEcm9wZG93blNlbGVjdChldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRHJvcGRvd25Gb2N1cygpO1xuICAgIH1cbiAgfTtcblxuICBnZXREYXRlSW5WaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJlU2VsZWN0aW9uLCBzZWxlY3RlZCwgb3BlblRvRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtaW5EYXRlID0gZ2V0RWZmZWN0aXZlTWluRGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBtYXhEYXRlID0gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBjdXJyZW50ID0gbmV3RGF0ZSgpO1xuICAgIGNvbnN0IGluaXRpYWxEYXRlID0gb3BlblRvRGF0ZSB8fCBzZWxlY3RlZCB8fCBwcmVTZWxlY3Rpb247XG4gICAgaWYgKGluaXRpYWxEYXRlKSB7XG4gICAgICByZXR1cm4gaW5pdGlhbERhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtaW5EYXRlICYmIGlzQmVmb3JlKGN1cnJlbnQsIG1pbkRhdGUpKSB7XG4gICAgICAgIHJldHVybiBtaW5EYXRlO1xuICAgICAgfSBlbHNlIGlmIChtYXhEYXRlICYmIGlzQWZ0ZXIoY3VycmVudCwgbWF4RGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1heERhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9O1xuXG4gIGluY3JlYXNlTW9udGggPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogYWRkTW9udGhzKGRhdGUsIDEpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBkZWNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHN1Yk1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXksIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRheSk7XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogZGF5IH0pO1xuICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyICYmIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBudWxsIH0pO1xuICAgIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUgJiYgdGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZSgpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJNb3VzZUVudGVyID0gKGV2ZW50LCB5ZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IHNldFllYXIobmV3RGF0ZSgpLCB5ZWFyKSB9KTtcbiAgICAhIXRoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIoZXZlbnQsIHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJNb3VzZUxlYXZlID0gKGV2ZW50LCB5ZWFyKSA9PiB7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmUgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblllYXJDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKGRhdGUpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXRlKTtcbiAgfTtcblxuICBoYW5kbGVNb250aENoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgdGhpcy5oYW5kbGVDdXN0b21Nb250aENoYW5nZShkYXRlKTtcbiAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXRlKTtcbiAgfTtcblxuICBoYW5kbGVDdXN0b21Nb250aENoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb250aENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKGRhdGUpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb250aFllYXJDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZShkYXRlKTtcbiAgICB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKGRhdGUpO1xuICB9O1xuXG4gIGNoYW5nZVllYXIgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldFllYXIoZGF0ZSwgeWVhciksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2hhbmdlTW9udGggPSAobW9udGgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRNb250aChkYXRlLCBtb250aCksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoWWVhciA9IChtb250aFllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKHNldE1vbnRoKGRhdGUsIGdldE1vbnRoKG1vbnRoWWVhcikpLCBnZXRZZWFyKG1vbnRoWWVhcikpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgaGVhZGVyID0gKGRhdGUgPSB0aGlzLnN0YXRlLmRhdGUpID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgICBjb25zdCBkYXlOYW1lcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVycykge1xuICAgICAgZGF5TmFtZXMucHVzaChcbiAgICAgICAgPGRpdiBrZXk9XCJXXCIgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy53ZWVrTGFiZWwgfHwgXCIjXCJ9XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXlOYW1lcy5jb25jYXQoXG4gICAgICBbMCwgMSwgMiwgMywgNCwgNSwgNl0ubWFwKChvZmZzZXQpID0+IHtcbiAgICAgICAgY29uc3QgZGF5ID0gYWRkRGF5cyhzdGFydE9mV2Vlaywgb2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgd2Vla0RheU5hbWUgPSB0aGlzLmZvcm1hdFdlZWtkYXkoZGF5LCB0aGlzLnByb3BzLmxvY2FsZSk7XG5cbiAgICAgICAgY29uc3Qgd2Vla0RheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lKGRheSlcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17b2Zmc2V0fVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17Zm9ybWF0RGF0ZShkYXksIFwiRUVFRVwiLCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiLCB3ZWVrRGF5Q2xhc3NOYW1lKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7d2Vla0RheU5hbWV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGZvcm1hdFdlZWtkYXkgPSAoZGF5LCBsb2NhbGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5KSB7XG4gICAgICByZXR1cm4gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRheSwgdGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5LCBsb2NhbGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0XG4gICAgICA/IGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRheSwgbG9jYWxlKVxuICAgICAgOiBnZXRXZWVrZGF5TWluSW5Mb2NhbGUoZGF5LCBsb2NhbGUpO1xuICB9O1xuXG4gIGRlY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjbGVhclNlbGVjdGluZ0RhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gIH07XG5cbiAgcmVuZGVyUHJldmlvdXNCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbFByZXZEYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0gcXVhcnRlckRpc2FibGVkQmVmb3JlKFxuICAgICAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICghdGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgIXRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1wcmV2aW91c1wiLFxuICAgIF07XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsUHJldkRheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXMtLWRpc2FibGVkXCIpO1xuICAgICAgY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvclllYXIgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIGNvbnN0IHsgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsLCBwcmV2aW91c1llYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsID0gdHlwZW9mIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9XG4gICAgICAgIG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNGb3JZZWFyID8gcHJldmlvdXNZZWFyQXJpYUxhYmVsIDogcHJldmlvdXNNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLnByZXZpb3VzWWVhckJ1dHRvbkxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIGluY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxOZXh0RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSBxdWFydGVyRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBjb25zdCBpY29uQ2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvbi0tbmV4dFwiLFxuICAgIF07XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdGltZVwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMudG9kYXlCdXR0b24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdG9kYXktYnV0dG9uXCIpO1xuICAgIH1cblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsTmV4dERheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBuZXh0TW9udGhCdXR0b25MYWJlbCwgbmV4dFllYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dE1vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBuZXh0TW9udGhCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dFllYXJCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIk5leHQgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBuZXh0WWVhckFyaWFMYWJlbCA6IG5leHRNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDdXJyZW50TW9udGggPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoXCJdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzTW9udGhEcm9wZG93blwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aFllYXJEcm9wZG93blwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAge2Zvcm1hdERhdGUoZGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFllYXJEcm9wZG93blxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLnByb3BzLm9uU2VsZWN0fVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZVllYXJ9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICB5ZWFyPXtnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TW9udGhEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aH1cbiAgICAgICAgbW9udGg9e2dldE1vbnRoKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aFllYXJEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVUb2RheUJ1dHRvbkNsaWNrID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGdldFN0YXJ0T2ZUb2RheSgpLCBlKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihnZXRTdGFydE9mVG9kYXkoKSk7XG4gIH07XG5cbiAgcmVuZGVyVG9kYXlCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnRvZGF5QnV0dG9uIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RvZGF5LWJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVRvZGF5QnV0dG9uQ2xpY2soZSl9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEZWZhdWx0SGVhZGVyID0gKHsgbW9udGhEYXRlLCBpIH0pID0+IChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgJHtcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdFxuICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWhhcy10aW1lLXNlbGVjdFwiXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YH1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJDdXJyZW50TW9udGgobW9udGhEYXRlKX1cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyX19kcm9wZG93biByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRHJvcGRvd25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhZZWFyRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICAgIHt0aGlzLnJlbmRlclllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZXNcIj5cbiAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJDdXN0b21IZWFkZXIgPSAoaGVhZGVyQXJncyA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyBtb250aERhdGUsIGkgfSA9IGhlYWRlckFyZ3M7XG5cbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJiAhdGhpcy5zdGF0ZS5tb250aENvbnRhaW5lcikgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHByZXZZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0WWVhckJ1dHRvbkRpc2FibGVkID0geWVhckRpc2FibGVkQWZ0ZXIoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBzaG93RGF5TmFtZXMgPVxuICAgICAgIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciAmJlxuICAgICAgIXRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWN1c3RvbVwiXG4gICAgICAgIG9uRm9jdXM9e3RoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIoe1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgICAgY3VzdG9tSGVhZGVyQ291bnQ6IGksXG4gICAgICAgICAgbW9udGhEYXRlLFxuICAgICAgICAgIGNoYW5nZU1vbnRoOiB0aGlzLmNoYW5nZU1vbnRoLFxuICAgICAgICAgIGNoYW5nZVllYXI6IHRoaXMuY2hhbmdlWWVhcixcbiAgICAgICAgICBkZWNyZWFzZU1vbnRoOiB0aGlzLmRlY3JlYXNlTW9udGgsXG4gICAgICAgICAgaW5jcmVhc2VNb250aDogdGhpcy5pbmNyZWFzZU1vbnRoLFxuICAgICAgICAgIGRlY3JlYXNlWWVhcjogdGhpcy5kZWNyZWFzZVllYXIsXG4gICAgICAgICAgaW5jcmVhc2VZZWFyOiB0aGlzLmluY3JlYXNlWWVhcixcbiAgICAgICAgICBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBwcmV2WWVhckJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgIH0pfVxuICAgICAgICB7c2hvd0RheU5hbWVzICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJIZWFkZXIgPSAoeyBtb250aERhdGUgfSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd1llYXJQaWNrZXIsIHllYXJJdGVtTnVtYmVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBtb250aERhdGUsXG4gICAgICB5ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyLXllYXItaGVhZGVyXCI+XG4gICAgICAgIHtzaG93WWVhclBpY2tlciA/IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWAgOiBnZXRZZWFyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlciA9IChoZWFkZXJBcmdzKSA9PiB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyICE9PSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckN1c3RvbUhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlclllYXJIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEZWZhdWx0SGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtb250aExpc3QgPSBbXTtcbiAgICBjb25zdCBtb250aHNUb1N1YnRyYWN0ID0gdGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHNcbiAgICAgID8gdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDFcbiAgICAgIDogMDtcbiAgICBjb25zdCBmcm9tTW9udGhEYXRlID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fCB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICA/IGFkZFllYXJzKHRoaXMuc3RhdGUuZGF0ZSwgbW9udGhzVG9TdWJ0cmFjdClcbiAgICAgICAgOiBzdWJNb250aHModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KTtcbiAgICBjb25zdCBtb250aFNlbGVjdGVkSW4gPSB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiA/PyBtb250aHNUb1N1YnRyYWN0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93bjsgKytpKSB7XG4gICAgICBjb25zdCBtb250aHNUb0FkZCA9IGkgLSBtb250aFNlbGVjdGVkSW4gKyBtb250aHNUb1N1YnRyYWN0O1xuICAgICAgY29uc3QgbW9udGhEYXRlID1cbiAgICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgPyBhZGRZZWFycyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZClcbiAgICAgICAgICA6IGFkZE1vbnRocyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZCk7XG4gICAgICBjb25zdCBtb250aEtleSA9IGBtb250aC0ke2l9YDtcbiAgICAgIGNvbnN0IG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kID0gaSA8IHRoaXMucHJvcHMubW9udGhzU2hvd24gLSAxO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCA9IGkgPiAwO1xuICAgICAgbW9udGhMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e21vbnRoS2V5fVxuICAgICAgICAgIHJlZj17KGRpdikgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb250aENvbnRhaW5lciA9IGRpdjtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWNvbnRhaW5lclwiXG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGUsIGkgfSl9XG4gICAgICAgICAgPE1vbnRoXG4gICAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aFllYXJ9XG4gICAgICAgICAgICBkYXk9e21vbnRoRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25EYXlLZXlEb3dufVxuICAgICAgICAgICAgaGFuZGxlT25Nb250aEtleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vbnRoTW91c2VMZWF2ZX1cbiAgICAgICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgICAgICBvcmRlckluRGlzcGxheT17aX1cbiAgICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5zdGF0ZS5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgZml4ZWRIZWlnaHQ9e3RoaXMucHJvcHMuZml4ZWRIZWlnaHR9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgcmVuZGVyTW9udGhDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlck1vbnRoQ29udGVudH1cbiAgICAgICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICAgIHNob3dNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXttb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbnRoTGlzdDtcbiAgfTtcblxuICByZW5kZXJZZWFycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKHsgbW9udGhEYXRlOiB0aGlzLnN0YXRlLmRhdGUgfSl9XG4gICAgICAgICAgPFllYXJcbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBjbGVhclNlbGVjdGluZ0RhdGU9e3RoaXMuY2xlYXJTZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLmhhbmRsZVllYXJNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlclRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiZcbiAgICAgICh0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRpbWVcbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgICBmb3JtYXQ9e3RoaXMucHJvcHMudGltZUZvcm1hdH1cbiAgICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICAgIGludGVydmFscz17dGhpcy5wcm9wcy50aW1lSW50ZXJ2YWxzfVxuICAgICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgICAgZXhjbHVkZVRpbWVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lc31cbiAgICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgdG9kYXlCdXR0b249e3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgICAgc2hvd01vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICAgIG1vbnRoUmVmPXt0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyfVxuICAgICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRUaW1lU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVZhbGlkID0gaXNWYWxpZCh0aW1lKSAmJiBCb29sZWFuKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIGNvbnN0IHRpbWVTdHJpbmcgPSB0aW1lVmFsaWRcbiAgICAgID8gYCR7YWRkWmVybyh0aW1lLmdldEhvdXJzKCkpfToke2FkZFplcm8odGltZS5nZXRNaW51dGVzKCkpfWBcbiAgICAgIDogXCJcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW5wdXRUaW1lXG4gICAgICAgICAgZGF0ZT17dGltZX1cbiAgICAgICAgICB0aW1lU3RyaW5nPXt0aW1lU3RyaW5nfVxuICAgICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVGltZUNoYW5nZX1cbiAgICAgICAgICBjdXN0b21UaW1lSW5wdXQ9e3RoaXMucHJvcHMuY3VzdG9tVGltZUlucHV0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQXJpYUxpdmVSZWdpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWA7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGdldFllYXIodGhpcy5zdGF0ZS5kYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7Z2V0TW9udGhJbkxvY2FsZShcbiAgICAgICAgZ2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICApfSAke2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlbmRlckFyaWFMaXZlTWVzc2FnZSAmJiBhcmlhTGl2ZU1lc3NhZ2V9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDaGlsZHJlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19jaGlsZHJlbi1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgQ29udGFpbmVyID0gdGhpcy5wcm9wcy5jb250YWluZXIgfHwgQ2FsZW5kYXJDb250YWluZXI7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJjb250ZW50c1wiIH19IHJlZj17dGhpcy5jb250YWluZXJSZWZ9PlxuICAgICAgICA8Q29udGFpbmVyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFwicmVhY3QtZGF0ZXBpY2tlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyLS10aW1lLW9ubHlcIjogdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHksXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgc2hvd1RpbWU9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclByZXZpb3VzQnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTmV4dEJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck1vbnRocygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclllYXJzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyVG9kYXlCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0VGltZVNlY3Rpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY29uc3QgQ2FsZW5kYXJJY29uID0gKHsgaWNvbiwgY2xhc3NOYW1lID0gXCJcIiwgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2FsZW5kYXItaWNvblwiO1xuXG4gIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChpY29uKSkge1xuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoaWNvbiwge1xuICAgICAgY2xhc3NOYW1lOiBgJHtpY29uLnByb3BzLmNsYXNzTmFtZSB8fCBcIlwifSAke2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YCxcbiAgICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaWNvbi5wcm9wcy5vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpY29uLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG9uQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGljb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtkZWZhdWx0Q2xhc3N9ICR7aWNvbn0gJHtjbGFzc05hbWV9YH1cbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgU1ZHIEljb25cbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YH1cbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgdmlld0JveD1cIjAgMCA0NDggNTEyXCJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgPlxuICAgICAgPHBhdGggZD1cIk05NiAzMlY2NEg0OEMyMS41IDY0IDAgODUuNSAwIDExMnY0OEg0NDhWMTEyYzAtMjYuNS0yMS41LTQ4LTQ4LTQ4SDM1MlYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMlY2NEgxNjBWMzJjMC0xNy43LTE0LjMtMzItMzItMzJTOTYgMTQuMyA5NiAzMnpNNDQ4IDE5MkgwVjQ2NGMwIDI2LjUgMjEuNSA0OCA0OCA0OEg0MDBjMjYuNSAwIDQ4LTIxLjUgNDgtNDhWMTkyelwiIC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5DYWxlbmRhckljb24ucHJvcFR5cGVzID0ge1xuICBpY29uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXJJY29uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdCA9ICh0aGlzLnByb3BzLnBvcnRhbEhvc3QgfHwgZG9jdW1lbnQpLmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGhpcy5wcm9wcy5wb3J0YWxJZCxcbiAgICApO1xuICAgIGlmICghdGhpcy5wb3J0YWxSb290KSB7XG4gICAgICB0aGlzLnBvcnRhbFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5wb3J0YWxSb290LnNldEF0dHJpYnV0ZShcImlkXCIsIHRoaXMucHJvcHMucG9ydGFsSWQpO1xuICAgICAgKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZCh0aGlzLnBvcnRhbFJvb3QpO1xuICAgIH1cbiAgICB0aGlzLnBvcnRhbFJvb3QuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnBvcnRhbFJvb3QucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbCh0aGlzLnByb3BzLmNoaWxkcmVuLCB0aGlzLmVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG4vLyBUYWJMb29wIHByZXZlbnRzIHRoZSB1c2VyIGZyb20gdGFiYmluZyBvdXRzaWRlIG9mIHRoZSBwb3BwZXJcbi8vIEl0IGNyZWF0ZXMgYSB0YWJpbmRleCBsb29wIHNvIHRoYXQgXCJUYWJcIiBvbiB0aGUgbGFzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGZpcnN0IGVsZW1lbnRcbi8vIGFuZCBcIlNoaWZ0IFRhYlwiIG9uIHRoZSBmaXJzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGxhc3QgZWxlbWVudFxuXG5jb25zdCBmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yID1cbiAgXCJbdGFiaW5kZXhdLCBhLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCI7XG5jb25zdCBmb2N1c2FibGVGaWx0ZXIgPSAobm9kZSkgPT4gIW5vZGUuZGlzYWJsZWQgJiYgbm9kZS50YWJJbmRleCAhPT0gLTE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYkxvb3AgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMudGFiTG9vcFJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgLy8gcXVlcnkgYWxsIGZvY3VzYWJsZSBlbGVtZW50c1xuICAvLyB0cmltIGZpcnN0IGFuZCBsYXN0IGJlY2F1c2UgdGhleSBhcmUgdGhlIGZvY3VzIGd1YXJkc1xuICBnZXRUYWJDaGlsZHJlbiA9ICgpID0+XG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChcbiAgICAgICAgdGhpcy50YWJMb29wUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yKSxcbiAgICAgICAgMSxcbiAgICAgICAgLTEsXG4gICAgICApXG4gICAgICAuZmlsdGVyKGZvY3VzYWJsZUZpbHRlcik7XG5cbiAgaGFuZGxlRm9jdXNTdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJlxuICAgICAgdGFiQ2hpbGRyZW4ubGVuZ3RoID4gMSAmJlxuICAgICAgdGFiQ2hpbGRyZW5bdGFiQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgfTtcblxuICBoYW5kbGVGb2N1c0VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJiB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmIHRhYkNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5lbmFibGVUYWJMb29wKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BcIiByZWY9e3RoaXMudGFiTG9vcFJlZn0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcF9fc3RhcnRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c1N0YXJ0fVxuICAgICAgICAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19lbmRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c0VuZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIHVzZUZsb2F0aW5nLFxuICBhcnJvdyxcbiAgb2Zmc2V0LFxuICBmbGlwLFxuICBhdXRvVXBkYXRlLFxufSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgPSBbXG4gIFwidG9wLXN0YXJ0XCIsXG4gIFwidG9wLWVuZFwiLFxuICBcImJvdHRvbS1zdGFydFwiLFxuICBcImJvdHRvbS1lbmRcIixcbiAgXCJyaWdodC1zdGFydFwiLFxuICBcInJpZ2h0LWVuZFwiLFxuICBcImxlZnQtc3RhcnRcIixcbiAgXCJsZWZ0LWVuZFwiLFxuICBcInRvcFwiLFxuICBcInJpZ2h0XCIsXG4gIFwiYm90dG9tXCIsXG4gIFwibGVmdFwiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2l0aEZsb2F0aW5nKENvbXBvbmVudCkge1xuICBjb25zdCBXaXRoRmxvYXRpbmcgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBhbHRfcHJvcHMgPSB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIHBvcHBlck1vZGlmaWVyczogcHJvcHMucG9wcGVyTW9kaWZpZXJzIHx8IFtdLFxuICAgICAgcG9wcGVyUHJvcHM6IHByb3BzLnBvcHBlclByb3BzIHx8IHt9LFxuICAgICAgaGlkZVBvcHBlcjpcbiAgICAgICAgdHlwZW9mIHByb3BzLmhpZGVQb3BwZXIgPT09IFwiYm9vbGVhblwiID8gcHJvcHMuaGlkZVBvcHBlciA6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBhcnJvd1JlZiA9IFJlYWN0LnVzZVJlZigpO1xuICAgIGNvbnN0IGZsb2F0aW5nUHJvcHMgPSB1c2VGbG9hdGluZyh7XG4gICAgICBvcGVuOiAhYWx0X3Byb3BzLmhpZGVQb3BwZXIsXG4gICAgICB3aGlsZUVsZW1lbnRzTW91bnRlZDogYXV0b1VwZGF0ZSxcbiAgICAgIHBsYWNlbWVudDogYWx0X3Byb3BzLnBvcHBlclBsYWNlbWVudCxcbiAgICAgIG1pZGRsZXdhcmU6IFtcbiAgICAgICAgZmxpcCh7IHBhZGRpbmc6IDE1IH0pLFxuICAgICAgICBvZmZzZXQoMTApLFxuICAgICAgICBhcnJvdyh7IGVsZW1lbnQ6IGFycm93UmVmIH0pLFxuICAgICAgICAuLi5hbHRfcHJvcHMucG9wcGVyTW9kaWZpZXJzLFxuICAgICAgXSxcbiAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJQcm9wcyxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHsuLi5hbHRfcHJvcHN9IHBvcHBlclByb3BzPXt7IC4uLmZsb2F0aW5nUHJvcHMsIGFycm93UmVmIH19IC8+XG4gICAgKTtcbiAgfTtcblxuICBXaXRoRmxvYXRpbmcucHJvcFR5cGVzID0ge1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksXG4gICAgcG9wcGVyTW9kaWZpZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICByZXR1cm4gV2l0aEZsb2F0aW5nO1xufVxuIiwiaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBGbG9hdGluZ0Fycm93IH0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgd2l0aEZsb2F0aW5nIGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbmV4cG9ydCBjbGFzcyBQb3BwZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlkZVBvcHBlcjogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGFyZ2V0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgICBoaWRlUG9wcGVyLFxuICAgICAgcG9wcGVyQ29tcG9uZW50LFxuICAgICAgdGFyZ2V0Q29tcG9uZW50LFxuICAgICAgZW5hYmxlVGFiTG9vcCxcbiAgICAgIHBvcHBlck9uS2V5RG93bixcbiAgICAgIHBvcnRhbElkLFxuICAgICAgcG9ydGFsSG9zdCxcbiAgICAgIHBvcHBlclByb3BzLFxuICAgICAgc2hvd0Fycm93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHBvcHBlcjtcblxuICAgIGlmICghaGlkZVBvcHBlcikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXBvcHBlclwiLCBjbGFzc05hbWUpO1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXtlbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0RmxvYXRpbmd9XG4gICAgICAgICAgICBzdHlsZT17cG9wcGVyUHJvcHMuZmxvYXRpbmdTdHlsZXN9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICBkYXRhLXBsYWNlbWVudD17cG9wcGVyUHJvcHMucGxhY2VtZW50fVxuICAgICAgICAgICAgb25LZXlEb3duPXtwb3BwZXJPbktleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcHBlckNvbXBvbmVudH1cbiAgICAgICAgICAgIHtzaG93QXJyb3cgJiYgKFxuICAgICAgICAgICAgICA8RmxvYXRpbmdBcnJvd1xuICAgICAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMuYXJyb3dSZWZ9XG4gICAgICAgICAgICAgICAgY29udGV4dD17cG9wcGVyUHJvcHMuY29udGV4dH1cbiAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezh9XG4gICAgICAgICAgICAgICAgd2lkdGg9ezE2fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKC0xcHgpXCIgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190cmlhbmdsZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcikge1xuICAgICAgcG9wcGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lciwge30sIHBvcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbElkICYmICFoaWRlUG9wcGVyKSB7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxQb3J0YWwgcG9ydGFsSWQ9e3BvcnRhbElkfSBwb3J0YWxIb3N0PXtwb3J0YWxIb3N0fT5cbiAgICAgICAgICB7cG9wcGVyfVxuICAgICAgICA8L1BvcnRhbD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlci13cmFwcGVyXCIsIHdyYXBwZXJDbGFzc05hbWUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPGRpdiByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0UmVmZXJlbmNlfSBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc2VzfT5cbiAgICAgICAgICB7dGFyZ2V0Q29tcG9uZW50fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3BvcHBlcn1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoRmxvYXRpbmcoUG9wcGVyQ29tcG9uZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBDYWxlbmRhciBmcm9tIFwiLi9jYWxlbmRhclwiO1xuaW1wb3J0IENhbGVuZGFySWNvbiBmcm9tIFwiLi9jYWxlbmRhcl9pY29uXCI7XG5pbXBvcnQgUG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuaW1wb3J0IFBvcHBlckNvbXBvbmVudCBmcm9tIFwiLi9wb3BwZXJfY29tcG9uZW50XCI7XG5pbXBvcnQgeyBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgfSBmcm9tIFwiLi93aXRoX2Zsb2F0aW5nXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IHNldCB9IGZyb20gXCJkYXRlLWZucy9zZXRcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZEYXlcIjtcbmltcG9ydCB7IGlzVmFsaWQgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgaXNEYXRlLFxuICBpc0JlZm9yZSxcbiAgaXNBZnRlcixcbiAgaXNFcXVhbCxcbiAgc2V0VGltZSxcbiAgZ2V0U2Vjb25kcyxcbiAgZ2V0TWludXRlcyxcbiAgZ2V0SG91cnMsXG4gIGFkZERheXMsXG4gIGFkZE1vbnRocyxcbiAgYWRkV2Vla3MsXG4gIHN1YkRheXMsXG4gIHN1Yk1vbnRocyxcbiAgc3ViV2Vla3MsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNEYXlEaXNhYmxlZCxcbiAgaXNEYXlJblJhbmdlLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBwYXJzZURhdGUsXG4gIHNhZmVEYXRlRm9ybWF0LFxuICBzYWZlRGF0ZVJhbmdlRm9ybWF0LFxuICBnZXRIaWdodExpZ2h0RGF5c01hcCxcbiAgZ2V0WWVhcixcbiAgZ2V0TW9udGgsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBnZXRFbmRPZldlZWssXG4gIHJlZ2lzdGVyTG9jYWxlLFxuICBzZXREZWZhdWx0TG9jYWxlLFxuICBnZXREZWZhdWx0TG9jYWxlLFxuICBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gIGlzU2FtZURheSxcbiAgaXNNb250aERpc2FibGVkLFxuICBpc1llYXJEaXNhYmxlZCxcbiAgc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQsXG4gIGdldEhvbGlkYXlzTWFwLFxuICBpc0RhdGVCZWZvcmUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FsZW5kYXJDb250YWluZXIgfSBmcm9tIFwiLi9jYWxlbmRhcl9jb250YWluZXJcIjtcblxuZXhwb3J0IHsgcmVnaXN0ZXJMb2NhbGUsIHNldERlZmF1bHRMb2NhbGUsIGdldERlZmF1bHRMb2NhbGUgfTtcblxuY29uc3Qgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCI7XG5jb25zdCBXcmFwcGVkQ2FsZW5kYXIgPSBvbkNsaWNrT3V0c2lkZShDYWxlbmRhcik7XG5cbi8vIENvbXBhcmVzIGRhdGVzIHllYXIrbW9udGggY29tYmluYXRpb25zXG5mdW5jdGlvbiBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ2V0TW9udGgoZGF0ZTEpICE9PSBnZXRNb250aChkYXRlMikgfHwgZ2V0WWVhcihkYXRlMSkgIT09IGdldFllYXIoZGF0ZTIpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlMSAhPT0gZGF0ZTI7XG59XG5cbi8qKlxuICogR2VuZXJhbCBkYXRlcGlja2VyIGNvbXBvbmVudC5cbiAqL1xuY29uc3QgSU5QVVRfRVJSXzEgPSBcIkRhdGUgaW5wdXQgbm90IHZhbGlkLlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFsbG93U2FtZURheTogZmFsc2UsXG4gICAgICBkYXRlRm9ybWF0OiBcIk1NL2RkL3l5eXlcIixcbiAgICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogXCJMTExMIHl5eXlcIixcbiAgICAgIG9uQ2hhbmdlKCkge30sXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICBkcm9wZG93bk1vZGU6IFwic2Nyb2xsXCIsXG4gICAgICBvbkZvY3VzKCkge30sXG4gICAgICBvbkJsdXIoKSB7fSxcbiAgICAgIG9uS2V5RG93bigpIHt9LFxuICAgICAgb25JbnB1dENsaWNrKCkge30sXG4gICAgICBvblNlbGVjdCgpIHt9LFxuICAgICAgb25DbGlja091dHNpZGUoKSB7fSxcbiAgICAgIG9uTW9udGhDaGFuZ2UoKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJPcGVuKCkge30sXG4gICAgICBvbkNhbGVuZGFyQ2xvc2UoKSB7fSxcbiAgICAgIHByZXZlbnRPcGVuT25Gb2N1czogZmFsc2UsXG4gICAgICBvblllYXJDaGFuZ2UoKSB7fSxcbiAgICAgIG9uSW5wdXRFcnJvcigpIHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICB3aXRoUG9ydGFsOiBmYWxzZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBmYWxzZSxcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgICBzaG93VGltZVNlbGVjdDogZmFsc2UsXG4gICAgICBzaG93VGltZUlucHV0OiBmYWxzZSxcbiAgICAgIHNob3dQcmV2aW91c01vbnRoczogZmFsc2UsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1llYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dXZWVrUGlja2VyOiBmYWxzZSxcbiAgICAgIHN0cmljdFBhcnNpbmc6IGZhbHNlLFxuICAgICAgc3dhcFJhbmdlOiBmYWxzZSxcbiAgICAgIHRpbWVJbnRlcnZhbHM6IDMwLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIG5leHRZZWFyQXJpYUxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHRpbWVJbnB1dExhYmVsOiBcIlRpbWVcIixcbiAgICAgIGVuYWJsZVRhYkxvb3A6IHRydWUsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBmYWxzZSxcbiAgICAgIHNob3dQb3BwZXJBcnJvdzogdHJ1ZSxcbiAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICBjYWxlbmRhclN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBmYWxzZSxcbiAgICAgIHVzZVBvaW50ZXJFdmVudDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhbGxvd1NhbWVEYXk6IFByb3BUeXBlcy5ib29sLFxuICAgIGFyaWFEZXNjcmliZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhSW52YWxpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxDbG9zZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxsZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhUmVxdWlyZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2FsZW5kYXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FsZW5kYXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xvc2VPblNjcm9sbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1c3RvbUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBjdXN0b21JbnB1dFJlZjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlc1xuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheV0pLFxuICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdlZWtEYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm06IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzQ2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgXSksXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY2FsZW5kYXJJY29uQ2xhc3NuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoc1Nob3duOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2VSYXc6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DYWxlbmRhck9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2FsZW5kYXJDbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcGxhY2Vob2xkZXJUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwcmV2ZW50T3Blbk9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RyaWN0UGFyc2luZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3dhcFJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzdGFydE9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2l0aFBvcnRhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGF0ZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjbGVhckJ1dHRvblRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvY3VzU2VsZWN0ZWRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBleGNsdWRlU2Nyb2xsYmFyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCk7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKFxuICAgICAgcHJldlByb3BzLmlubGluZSAmJlxuICAgICAgaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcHJldlByb3BzLm1vbnRoc1Nob3duICE9PSB0aGlzLnByb3BzLm1vbnRoc1Nob3duXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiAwIH0pO1xuICAgIH1cbiAgICBpZiAocHJldlByb3BzLmhpZ2hsaWdodERhdGVzICE9PSB0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICFwcmV2U3RhdGUuZm9jdXNlZCAmJlxuICAgICAgIWlzRXF1YWwocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZTdGF0ZS5vcGVuICE9PSB0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gZmFsc2UgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhck9wZW4oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSB0cnVlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgZ2V0UHJlU2VsZWN0aW9uID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgID8gdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c0VuZCAmJiB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzU3RhcnQgJiYgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA6IG5ld0RhdGUoKTtcblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGZyb20gc3RyaW5nIGZvcm1hdCB0byBzdGFuZGFyZCBEYXRlIGZvcm1hdFxuICBtb2RpZnlIb2xpZGF5cyA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5ob2xpZGF5cz8ucmVkdWNlKChhY2N1bXVsYXRvciwgaG9saWRheSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGhvbGlkYXkuZGF0ZSk7XG4gICAgICBpZiAoIWlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gWy4uLmFjY3VtdWxhdG9yLCB7IC4uLmhvbGlkYXksIGRhdGUgfV07XG4gICAgfSwgW10pO1xuXG4gIGNhbGNJbml0aWFsU3RhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFByZVNlbGVjdGlvbiA9IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgYm91bmRlZFByZVNlbGVjdGlvbiA9XG4gICAgICBtaW5EYXRlICYmIGlzQmVmb3JlKGRlZmF1bHRQcmVTZWxlY3Rpb24sIHN0YXJ0T2ZEYXkobWluRGF0ZSkpXG4gICAgICAgID8gbWluRGF0ZVxuICAgICAgICA6IG1heERhdGUgJiYgaXNBZnRlcihkZWZhdWx0UHJlU2VsZWN0aW9uLCBlbmRPZkRheShtYXhEYXRlKSlcbiAgICAgICAgICA/IG1heERhdGVcbiAgICAgICAgICA6IGRlZmF1bHRQcmVTZWxlY3Rpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IHRoaXMucHJvcHMuc3RhcnRPcGVuIHx8IGZhbHNlLFxuICAgICAgcHJldmVudEZvY3VzOiBmYWxzZSxcbiAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZCkgPz8gYm91bmRlZFByZVNlbGVjdGlvbixcbiAgICAgIC8vIHRyYW5zZm9ybWluZyBoaWdobGlnaHRlZCBkYXlzIChwZXJoYXBzIG5lc3RlZCBhcnJheSlcbiAgICAgIC8vIHRvIGZsYXQgTWFwIGZvciBmYXN0ZXIgYWNjZXNzIGluIGRheS5qc3hcbiAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgLy8gdXNlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb24gYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQsIGJ1dCBub3Qgb25cbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfTtcblxuICBjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmVudEZvY3VzVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIHNldEZvY3VzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZm9jdXMpIHtcbiAgICAgIHRoaXMuaW5wdXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZXRCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuYmx1cikge1xuICAgICAgdGhpcy5pbnB1dC5ibHVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgc2V0T3BlbiA9IChvcGVuLCBza2lwU2V0Qmx1ciA9IGZhbHNlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgb3Blbjogb3BlbixcbiAgICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAgIG9wZW4gJiYgdGhpcy5zdGF0ZS5vcGVuXG4gICAgICAgICAgICA/IHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uXG4gICAgICAgICAgICA6IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpLnByZVNlbGVjdGlvbixcbiAgICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUsXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgIGZvY3VzZWQ6IHNraXBTZXRCbHVyID8gcHJldi5mb2N1c2VkIDogZmFsc2UsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgIXNraXBTZXRCbHVyICYmIHRoaXMuc2V0Qmx1cigpO1xuXG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG4gIGlucHV0T2sgPSAoKSA9PiBpc0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuXG4gIGlzQ2FsZW5kYXJPcGVuID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW4gPT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLnN0YXRlLm9wZW4gJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHlcbiAgICAgIDogdGhpcy5wcm9wcy5vcGVuO1xuXG4gIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnByZXZlbnRGb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXMgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTtcbiAgfTtcblxuICBzZW5kRm9jdXNCYWNrVG9JbnB1dCA9ICgpID0+IHtcbiAgICAvLyBDbGVhciBwcmV2aW91cyB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgdGhlIHBvcHBlciBhbmQgcmVmb2N1cyB0aGUgaW5wdXRcbiAgICAvLyBzdG9wIHRoZSBpbnB1dCBmcm9tIGF1dG8gb3BlbmluZyBvbkZvY3VzXG4gICAgLy8gc2V0Rm9jdXMgdG8gdGhlIGlucHV0XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogdHJ1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNhbmNlbEZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9O1xuXG4gIGRlZmVyRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldEZvY3VzKCksIDEpO1xuICB9O1xuXG4gIGhhbmRsZURyb3Bkb3duRm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgaGFuZGxlQmx1ciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5vcGVuIHx8IHRoaXMucHJvcHMud2l0aFBvcnRhbCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAoLi4uYWxsQXJncykgPT4ge1xuICAgIGxldCBldmVudCA9IGFsbEFyZ3NbMF07XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcuYXBwbHkodGhpcywgYWxsQXJncyk7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnB1dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCxcbiAgICB9KTtcbiAgICBsZXQgZGF0ZSA9IHBhcnNlRGF0ZShcbiAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5zdHJpY3RQYXJzaW5nLFxuICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICk7XG4gICAgLy8gVXNlIGRhdGUgZnJvbSBgc2VsZWN0ZWRgIHByb3Agd2hlbiBtYW5pcHVsYXRpbmcgb25seSB0aW1lIGZvciBpbnB1dCB2YWx1ZVxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICBkYXRlICYmXG4gICAgICAhaXNTYW1lRGF5KGRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICBkYXRlID0gc2V0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHtcbiAgICAgICAgaG91cnM6IGdldEhvdXJzKGRhdGUpLFxuICAgICAgICBtaW51dGVzOiBnZXRNaW51dGVzKGRhdGUpLFxuICAgICAgICBzZWNvbmRzOiBnZXRTZWNvbmRzKGRhdGUpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRlIHx8ICFldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3QgPSAoZGF0ZSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIC8vIFByZXZlbnRpbmcgb25Gb2N1cyBldmVudCB0byBmaXggaXNzdWVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvaXNzdWVzLzYyOFxuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdyhldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIGZhbHNlLCBtb250aFNlbGVjdGVkSW4pO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgICAhZW5kRGF0ZSAmJlxuICAgICAgICAodGhpcy5wcm9wcy5zd2FwUmFuZ2UgfHwgIWlzRGF0ZUJlZm9yZShkYXRlLCBzdGFydERhdGUpKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHNldFNlbGVjdGVkID0gKGRhdGUsIGV2ZW50LCBrZWVwSW5wdXQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IGRhdGU7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICBpc1llYXJEaXNhYmxlZChnZXRZZWFyKGNoYW5nZWREYXRlKSwgdGhpcy5wcm9wcylcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIpIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc01vbnRoRGlzYWJsZWQoY2hhbmdlZERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsICYmIGlzRGF5RGlzYWJsZWQoY2hhbmdlZERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSxcbiAgICAgIHNlbGVjdHNSYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RzTXVsdGlwbGUsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgICAgbWluVGltZSxcbiAgICAgIHN3YXBSYW5nZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICFpc0VxdWFsKHRoaXMucHJvcHMuc2VsZWN0ZWQsIGNoYW5nZWREYXRlKSB8fFxuICAgICAgdGhpcy5wcm9wcy5hbGxvd1NhbWVEYXkgfHxcbiAgICAgIHNlbGVjdHNSYW5nZSB8fFxuICAgICAgc2VsZWN0c011bHRpcGxlXG4gICAgKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiZcbiAgICAgICAgICAoIWtlZXBJbnB1dCB8fFxuICAgICAgICAgICAgKCF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICBob3VyOiBnZXRIb3Vycyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIG1pbnV0ZTogZ2V0TWludXRlcyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIHNlY29uZDogZ2V0U2Vjb25kcyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG1pblRpbWUgaXMgcHJlc2VudCB0aGVuIHNldCB0aGUgdGltZSB0byBtaW5UaW1lXG4gICAgICAgIGlmIChcbiAgICAgICAgICAha2VlcElucHV0ICYmXG4gICAgICAgICAgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChtaW5UaW1lKSB7XG4gICAgICAgICAgICBjaGFuZ2VkRGF0ZSA9IHNldFRpbWUoY2hhbmdlZERhdGUsIHtcbiAgICAgICAgICAgICAgaG91cjogbWluVGltZS5nZXRIb3VycygpLFxuICAgICAgICAgICAgICBtaW51dGU6IG1pblRpbWUuZ2V0TWludXRlcygpLFxuICAgICAgICAgICAgICBzZWNvbmQ6IG1pblRpbWUuZ2V0U2Vjb25kcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZm9jdXNTZWxlY3RlZE1vbnRoKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoU2VsZWN0ZWRJbjogbW9udGhTZWxlY3RlZEluIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIGNvbnN0IG5vUmFuZ2VzID0gIXN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZTtcbiAgICAgICAgY29uc3QgaGFzU3RhcnRSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZTtcbiAgICAgICAgY29uc3QgaXNSYW5nZUZpbGxlZCA9IHN0YXJ0RGF0ZSAmJiBlbmREYXRlO1xuICAgICAgICBpZiAobm9SYW5nZXMpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzU3RhcnRSYW5nZSkge1xuICAgICAgICAgIGlmIChjaGFuZ2VkRGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgb25DaGFuZ2UoW251bGwsIG51bGxdLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGVCZWZvcmUoY2hhbmdlZERhdGUsIHN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgIGlmIChzd2FwUmFuZ2UpIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBzdGFydERhdGVdLCBldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtzdGFydERhdGUsIGNoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSYW5nZUZpbGxlZCkge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKCFzZWxlY3RlZERhdGVzPy5sZW5ndGgpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZXMuc29tZShcbiAgICAgICAgICAgIChzZWxlY3RlZERhdGUpID0+IGlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHREYXRlcyA9IHNlbGVjdGVkRGF0ZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiAhaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgY2hhbmdlZERhdGUpLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgb25DaGFuZ2UobmV4dERhdGVzLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5zZWxlY3RlZERhdGVzLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uQ2hhbmdlKGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFrZWVwSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoY2hhbmdlZERhdGUsIGV2ZW50KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBXaGVuIGNoZWNraW5nIHByZVNlbGVjdGlvbiB2aWEgbWluL21heERhdGUsIHRpbWVzIG5lZWQgdG8gYmUgbWFuaXB1bGF0ZWQgdmlhIHN0YXJ0T2ZEYXkvZW5kT2ZEYXlcbiAgc2V0UHJlU2VsZWN0aW9uID0gKGRhdGUpID0+IHtcbiAgICBjb25zdCBoYXNNaW5EYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWluRGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBjb25zdCBoYXNNYXhEYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWF4RGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBsZXQgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSB0cnVlO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGF0ZSk7XG4gICAgICBpZiAoaGFzTWluRGF0ZSAmJiBoYXNNYXhEYXRlKSB7XG4gICAgICAgIC8vIGlzRGF5SW5SYW5nZSB1c2VzIHN0YXJ0T2ZEYXkgaW50ZXJuYWxseSwgc28gbm90IG5lY2Vzc2FyeSB0byBtYW5pcHVsYXRlIHRpbWVzIGhlcmVcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSBpc0RheUluUmFuZ2UoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChoYXNNaW5EYXRlKSB7XG4gICAgICAgIGNvbnN0IG1pbkRhdGVTdGFydE9mRGF5ID0gc3RhcnRPZkRheSh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9XG4gICAgICAgICAgaXNBZnRlcihkYXRlLCBtaW5EYXRlU3RhcnRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtaW5EYXRlU3RhcnRPZkRheSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc01heERhdGUpIHtcbiAgICAgICAgY29uc3QgbWF4RGF0ZUVuZE9mRGF5ID0gZW5kT2ZEYXkodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQmVmb3JlKGRhdGUsIG1heERhdGVFbmRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtYXhEYXRlRW5kT2ZEYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNWYWxpZERhdGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwcmVTZWxlY3Rpb246IGRhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRPcGVuKCF0aGlzLnN0YXRlLm9wZW4pO1xuICB9O1xuXG4gIGhhbmRsZVRpbWVDaGFuZ2UgPSAodGltZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA6IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgbGV0IGNoYW5nZWREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aW1lXG4gICAgICA6IHNldFRpbWUoc2VsZWN0ZWQsIHtcbiAgICAgICAgICBob3VyOiBnZXRIb3Vycyh0aW1lKSxcbiAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGltZSksXG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVTZWxlY3Rpb246IGNoYW5nZWREYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgfTtcblxuICBvbklucHV0Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbklucHV0Q2xpY2soKTtcbiAgfTtcblxuICBvbklucHV0S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLnN0YXRlLm9wZW4gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXRoaXMucHJvcHMucHJldmVudE9wZW5PbkZvY3VzXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8XG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93VXBcIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJFbnRlclwiXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5vbklucHV0Q2xpY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBjYWxlbmRhciBpcyBvcGVuLCB0aGVzZSBrZXlzIHdpbGwgZm9jdXMgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICBpZiAodGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnRLZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yU3RyaW5nID1cbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmIHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzXG4gICAgICAgICAgICA/ICcucmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXJbdGFiaW5kZXg9XCIwXCJdJ1xuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICAgID8gJy5yZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0W3RhYmluZGV4PVwiMFwiXSdcbiAgICAgICAgICAgICAgOiAnLnJlYWN0LWRhdGVwaWNrZXJfX2RheVt0YWJpbmRleD1cIjBcIl0nO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPVxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZSAmJlxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yU3RyaW5nKTtcbiAgICAgICAgc2VsZWN0ZWRJdGVtICYmIHNlbGVjdGVkSXRlbS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5pbnB1dE9rKCkgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLmxhc3RQcmVTZWxlY3RDaGFuZ2UgPT09IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJUYWJcIikge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25Qb3J0YWxLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHByZXZlbnRGb2N1czogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtleURvd24gZXZlbnRzIHBhc3NlZCBkb3duIHRvIGRheS5qc3hcbiAgb25EYXlLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzU2hpZnRLZXlBY3RpdmUgPSBldmVudC5zaGlmdEtleTtcblxuICAgIGNvbnN0IGNvcHkgPSBuZXdEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgdGhpcy5zZXRQcmVTZWxlY3Rpb24oY29weSk7XG4gICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIGlmICghdGhpcy5pbnB1dE9rKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGxldCBuZXdTZWxlY3Rpb247XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YkRheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkRGF5cyhjb3B5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGlzU2hpZnRLZXlBY3RpdmVcbiAgICAgICAgICAgID8gc3ViWWVhcnMoY29weSwgMSlcbiAgICAgICAgICAgIDogc3ViTW9udGhzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUGFnZURvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IGFkZFllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IGFkZE1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkhvbWVcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgICAgIGNvcHksXG4gICAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiRW5kXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0RW5kT2ZXZWVrKGNvcHkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoIW5ld1NlbGVjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0RXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSB9KTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkKG5ld1NlbGVjdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbihuZXdTZWxlY3Rpb24pO1xuICAgICAgLy8gbmVlZCB0byBmaWd1cmUgb3V0IHdoZXRoZXIgbW9udGggaGFzIGNoYW5nZWQgdG8gZm9jdXMgZGF5IGluIGlubGluZSB2ZXJzaW9uXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgY29uc3QgcHJldk1vbnRoID0gZ2V0TW9udGgoY29weSk7XG4gICAgICAgIGNvbnN0IG5ld01vbnRoID0gZ2V0TW9udGgobmV3U2VsZWN0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldlllYXIgPSBnZXRZZWFyKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdZZWFyID0gZ2V0WWVhcihuZXdTZWxlY3Rpb24pO1xuXG4gICAgICAgIGlmIChwcmV2TW9udGggIT09IG5ld01vbnRoIHx8IHByZXZZZWFyICE9PSBuZXdZZWFyKSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzIGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzbid0IGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGhhbmRsZSBnZW5lcmljIGtleSBkb3duIGV2ZW50cyBpbiB0aGUgcG9wcGVyIHRoYXQgZG8gbm90IGFkanVzdCBvciBzZWxlY3QgZGF0ZXNcbiAgLy8gZXg6IHdoaWxlIGZvY3VzaW5nIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9uc1xuICBvblBvcHBlcktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2xlYXJDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG51bGwsIGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgY2xlYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5vbkNsZWFyQ2xpY2soKTtcbiAgfTtcblxuICBvblNjcm9sbCA9IChldmVudCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiYm9vbGVhblwiICYmXG4gICAgICB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGxcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsKGV2ZW50KSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZW5kZXJDYWxlbmRhciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLmlzQ2FsZW5kYXJPcGVuKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFdyYXBwZWRDYWxlbmRhclxuICAgICAgICByZWY9eyhlbGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsZW07XG4gICAgICAgIH19XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgbW9udGhBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIHNldE9wZW49e3RoaXMuc2V0T3Blbn1cbiAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXRDYWxlbmRhcn1cbiAgICAgICAgdXNlV2Vla2RheXNTaG9ydD17dGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0fVxuICAgICAgICBmb3JtYXRXZWVrRGF5PXt0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXl9XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMuc3RhdGUucHJlU2VsZWN0aW9ufVxuICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlPXt0aGlzLmhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlfVxuICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnN0YXRlLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICBob2xpZGF5cz17Z2V0SG9saWRheXNNYXAodGhpcy5tb2RpZnlIb2xpZGF5cygpKX1cbiAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5zdGF0ZS5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgc2hvd1ByZXZpb3VzTW9udGhzPXt0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc31cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAgIHNob3dNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHRvZGF5QnV0dG9uPXt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgICB3ZWVrTGFiZWw9e3RoaXMucHJvcHMud2Vla0xhYmVsfVxuICAgICAgICBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcz17b3V0c2lkZUNsaWNrSWdub3JlQ2xhc3N9XG4gICAgICAgIGZpeGVkSGVpZ2h0PXt0aGlzLnByb3BzLmZpeGVkSGVpZ2h0fVxuICAgICAgICBtb250aHNTaG93bj17dGhpcy5wcm9wcy5tb250aHNTaG93bn1cbiAgICAgICAgbW9udGhTZWxlY3RlZEluPXt0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbn1cbiAgICAgICAgb25Ecm9wZG93bkZvY3VzPXt0aGlzLmhhbmRsZURyb3Bkb3duRm9jdXN9XG4gICAgICAgIG9uTW9udGhDaGFuZ2U9e3RoaXMucHJvcHMub25Nb250aENoYW5nZX1cbiAgICAgICAgb25ZZWFyQ2hhbmdlPXt0aGlzLnByb3BzLm9uWWVhckNoYW5nZX1cbiAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgd2Vla0RheUNsYXNzTmFtZT17dGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lfVxuICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICBzaG93RGF0ZVNlbGVjdD17dGhpcy5wcm9wcy5zaG93RGF0ZVNlbGVjdH1cbiAgICAgICAgc2hvd1RpbWVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIG9uVGltZUNoYW5nZT17dGhpcy5oYW5kbGVUaW1lQ2hhbmdlfVxuICAgICAgICB0aW1lRm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9XG4gICAgICAgIHRpbWVJbnRlcnZhbHM9e3RoaXMucHJvcHMudGltZUludGVydmFsc31cbiAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgIGV4Y2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5leGNsdWRlVGltZXN9XG4gICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jYWxlbmRhckNsYXNzTmFtZX1cbiAgICAgICAgY29udGFpbmVyPXt0aGlzLnByb3BzLmNhbGVuZGFyQ29udGFpbmVyfVxuICAgICAgICB5ZWFySXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzTW9udGhBcmlhTGFiZWx9XG4gICAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhBcmlhTGFiZWx9XG4gICAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c1llYXJCdXR0b25MYWJlbH1cbiAgICAgICAgbmV4dFllYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJBcmlhTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbH1cbiAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICByZW5kZXJDdXN0b21IZWFkZXI9e3RoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyfVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgIHJlbmRlck1vbnRoQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJNb250aENvbnRlbnR9XG4gICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcn1cbiAgICAgICAgb25Nb250aE1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmV9XG4gICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcn1cbiAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlfVxuICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgc2hvd1RpbWVJbnB1dD17dGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICBzaG93TW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI9e3RoaXMucHJvcHMuZXhjbHVkZVNjcm9sbGJhcn1cbiAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLm9uS2V5RG93bn1cbiAgICAgICAgaGFuZGxlT25EYXlLZXlEb3duPXt0aGlzLm9uRGF5S2V5RG93bn1cbiAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMuc3RhdGUuZm9jdXNlZH1cbiAgICAgICAgY3VzdG9tVGltZUlucHV0PXt0aGlzLnByb3BzLmN1c3RvbVRpbWVJbnB1dH1cbiAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgeWVhckNsYXNzTmFtZT17dGhpcy5wcm9wcy55ZWFyQ2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvV3JhcHBlZENhbGVuZGFyPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQXJpYUxpdmVSZWdpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNDb250YWluc1RpbWUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3Q7XG4gICAgY29uc3QgbG9uZ0RhdGVGb3JtYXQgPSBpc0NvbnRhaW5zVGltZSA/IFwiUFBQUHBcIiA6IFwiUFBQUFwiO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBzdGFydCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgfSxcbiAgICAgICl9LiAke1xuICAgICAgICB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA/IFwiRW5kIGRhdGU6IFwiICtcbiAgICAgICAgICAgIHNhZmVEYXRlRm9ybWF0KHRoaXMucHJvcHMuZW5kRGF0ZSwge1xuICAgICAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHRpbWU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHllYXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQ6IFwieXl5eVwiLCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIG1vbnRoOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcIk1NTU0geXl5eVwiLCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgcXVhcnRlcjogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6IFwieXl5eSwgUVFRXCIsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIGRhdGU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB9LFxuICAgICAgICApfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHthcmlhTGl2ZU1lc3NhZ2V9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xzeCh0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgW291dHNpZGVDbGlja0lnbm9yZUNsYXNzXTogdGhpcy5zdGF0ZS5vcGVuLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY3VzdG9tSW5wdXQgPSB0aGlzLnByb3BzLmN1c3RvbUlucHV0IHx8IDxpbnB1dCB0eXBlPVwidGV4dFwiIC8+O1xuICAgIGNvbnN0IGN1c3RvbUlucHV0UmVmID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dFJlZiB8fCBcInJlZlwiO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPVxuICAgICAgdHlwZW9mIHRoaXMucHJvcHMudmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyB0aGlzLnByb3BzLnZhbHVlXG4gICAgICAgIDogdHlwZW9mIHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgID8gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG4gICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNSYW5nZVxuICAgICAgICAgICAgPyBzYWZlRGF0ZVJhbmdlRm9ybWF0KFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlXG4gICAgICAgICAgICAgID8gc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQodGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzLCB0aGlzLnByb3BzKVxuICAgICAgICAgICAgICA6IHNhZmVEYXRlRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMpO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjdXN0b21JbnB1dCwge1xuICAgICAgW2N1c3RvbUlucHV0UmVmXTogKGlucHV0KSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgIH0sXG4gICAgICB2YWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVCbHVyLFxuICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgb25DbGljazogdGhpcy5vbklucHV0Q2xpY2ssXG4gICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzLFxuICAgICAgb25LZXlEb3duOiB0aGlzLm9uSW5wdXRLZXlEb3duLFxuICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICBmb3JtOiB0aGlzLnByb3BzLmZvcm0sXG4gICAgICBhdXRvRm9jdXM6IHRoaXMucHJvcHMuYXV0b0ZvY3VzLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXJUZXh0LFxuICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICBhdXRvQ29tcGxldGU6IHRoaXMucHJvcHMuYXV0b0NvbXBsZXRlLFxuICAgICAgY2xhc3NOYW1lOiBjbHN4KGN1c3RvbUlucHV0LnByb3BzLmNsYXNzTmFtZSwgY2xhc3NOYW1lKSxcbiAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXG4gICAgICByZXF1aXJlZDogdGhpcy5wcm9wcy5yZXF1aXJlZCxcbiAgICAgIHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxuICAgICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IHRoaXMucHJvcHMuYXJpYURlc2NyaWJlZEJ5LFxuICAgICAgXCJhcmlhLWludmFsaWRcIjogdGhpcy5wcm9wcy5hcmlhSW52YWxpZCxcbiAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRoaXMucHJvcHMuYXJpYUxhYmVsbGVkQnksXG4gICAgICBcImFyaWEtcmVxdWlyZWRcIjogdGhpcy5wcm9wcy5hcmlhUmVxdWlyZWQsXG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyQ2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDbGVhcmFibGUsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIGNsZWFyQnV0dG9uVGl0bGUsXG4gICAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZSA9IFwiXCIsXG4gICAgICBhcmlhTGFiZWxDbG9zZSA9IFwiQ2xvc2VcIixcbiAgICAgIHNlbGVjdGVkRGF0ZXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKFxuICAgICAgaXNDbGVhcmFibGUgJiZcbiAgICAgIChzZWxlY3RlZCAhPSBudWxsIHx8XG4gICAgICAgIHN0YXJ0RGF0ZSAhPSBudWxsIHx8XG4gICAgICAgIGVuZERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBzZWxlY3RlZERhdGVzPy5sZW5ndGgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFxuICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19jbG9zZS1pY29uXCIsXG4gICAgICAgICAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZSxcbiAgICAgICAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19jbG9zZS1pY29uLS1kaXNhYmxlZFwiOiBkaXNhYmxlZCB9LFxuICAgICAgICAgICl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbENsb3NlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGVhckNsaWNrfVxuICAgICAgICAgIHRpdGxlPXtjbGVhckJ1dHRvblRpdGxlfVxuICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dENvbnRhaW5lcigpIHtcbiAgICBjb25zdCB7IHNob3dJY29uLCBpY29uLCBjYWxlbmRhckljb25DbGFzc25hbWUsIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2sgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb3BlbiB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2lucHV0LWNvbnRhaW5lciR7XG4gICAgICAgICAgc2hvd0ljb24gPyBcIiByZWFjdC1kYXRlcGlja2VyX192aWV3LWNhbGVuZGFyLWljb25cIiA6IFwiXCJcbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIHtzaG93SWNvbiAmJiAoXG4gICAgICAgICAgPENhbGVuZGFySWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y2FsZW5kYXJJY29uQ2xhc3NuYW1lfSAke1xuICAgICAgICAgICAgICBvcGVuICYmIFwicmVhY3QtZGF0ZXBpY2tlci1pZ25vcmUtb25jbGlja291dHNpZGVcIlxuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB7Li4uKHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2tcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLnRvZ2dsZUNhbGVuZGFyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiBudWxsKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlbmRlckFyaWFMaXZlTWVzc2FnZSAmJiB0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckRhdGVJbnB1dCgpfVxuICAgICAgICB7dGhpcy5yZW5kZXJDbGVhckJ1dHRvbigpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjYWxlbmRhciA9IHRoaXMucmVuZGVyQ2FsZW5kYXIoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLmlubGluZSkgcmV0dXJuIGNhbGVuZGFyO1xuXG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFBvcnRhbCkge1xuICAgICAgbGV0IHBvcnRhbENvbnRhaW5lciA9IHRoaXMuc3RhdGUub3BlbiA/IChcbiAgICAgICAgPFRhYkxvb3AgZW5hYmxlVGFiTG9vcD17dGhpcy5wcm9wcy5lbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19wb3J0YWxcIlxuICAgICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uUG9ydGFsS2V5RG93bn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2FsZW5kYXJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvVGFiTG9vcD5cbiAgICAgICkgOiBudWxsO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5vcGVuICYmIHRoaXMucHJvcHMucG9ydGFsSWQpIHtcbiAgICAgICAgcG9ydGFsQ29udGFpbmVyID0gKFxuICAgICAgICAgIDxQb3J0YWxcbiAgICAgICAgICAgIHBvcnRhbElkPXt0aGlzLnByb3BzLnBvcnRhbElkfVxuICAgICAgICAgICAgcG9ydGFsSG9zdD17dGhpcy5wcm9wcy5wb3J0YWxIb3N0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3J0YWxDb250YWluZXJ9XG4gICAgICAgICAgPC9Qb3J0YWw+XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRDb250YWluZXIoKX1cbiAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxQb3BwZXJDb21wb25lbnRcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBvcHBlckNsYXNzTmFtZX1cbiAgICAgICAgd3JhcHBlckNsYXNzTmFtZT17dGhpcy5wcm9wcy53cmFwcGVyQ2xhc3NOYW1lfVxuICAgICAgICBoaWRlUG9wcGVyPXshdGhpcy5pc0NhbGVuZGFyT3BlbigpfVxuICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgcG9ydGFsSG9zdD17dGhpcy5wcm9wcy5wb3J0YWxIb3N0fVxuICAgICAgICBwb3BwZXJNb2RpZmllcnM9e3RoaXMucHJvcHMucG9wcGVyTW9kaWZpZXJzfVxuICAgICAgICB0YXJnZXRDb21wb25lbnQ9e3RoaXMucmVuZGVySW5wdXRDb250YWluZXIoKX1cbiAgICAgICAgcG9wcGVyQ29udGFpbmVyPXt0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcn1cbiAgICAgICAgcG9wcGVyQ29tcG9uZW50PXtjYWxlbmRhcn1cbiAgICAgICAgcG9wcGVyUGxhY2VtZW50PXt0aGlzLnByb3BzLnBvcHBlclBsYWNlbWVudH1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHBvcHBlck9uS2V5RG93bj17dGhpcy5vblBvcHBlcktleURvd259XG4gICAgICAgIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH1cbiAgICAgICAgc2hvd0Fycm93PXt0aGlzLnByb3BzLnNob3dQb3BwZXJBcnJvd31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCA9IFwiaW5wdXRcIjtcbmNvbnN0IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFID0gXCJuYXZpZ2F0ZVwiO1xuIl0sIm5hbWVzIjpbIkRFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiIsImxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwIiwibmV3RGF0ZSIsInZhbHVlIiwiZCIsIlN0cmluZyIsInBhcnNlSVNPIiwidG9EYXRlIiwiRGF0ZSIsImlzVmFsaWQiLCJwYXJzZURhdGUiLCJkYXRlRm9ybWF0IiwibG9jYWxlIiwic3RyaWN0UGFyc2luZyIsIm1pbkRhdGUiLCJwYXJzZWREYXRlIiwibG9jYWxlT2JqZWN0IiwiZ2V0TG9jYWxlT2JqZWN0IiwiZ2V0RGVmYXVsdExvY2FsZSIsInN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImRmIiwidHJ5UGFyc2VEYXRlIiwicGFyc2UiLCJ1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnMiLCJ1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zIiwiZm9ybWF0RGF0ZSIsIm1hdGNoIiwibWFwIiwic3Vic3RyaW5nIiwiZmlyc3RDaGFyYWN0ZXIiLCJsb25nRm9ybWF0dGVyIiwibG9uZ0Zvcm1hdHRlcnMiLCJmb3JtYXRMb25nIiwiam9pbiIsImxlbmd0aCIsInNsaWNlIiwiZGF0ZSIsImlzVmFsaWREYXRlIiwiaXNCZWZvcmUiLCJmb3JtYXRTdHIiLCJmb3JtYXQiLCJsb2NhbGVPYmoiLCJjb25zb2xlIiwid2FybiIsImNvbmNhdCIsInNhZmVEYXRlRm9ybWF0IiwiX3JlZiIsInNhZmVEYXRlUmFuZ2VGb3JtYXQiLCJzdGFydERhdGUiLCJlbmREYXRlIiwicHJvcHMiLCJmb3JtYXR0ZWRTdGFydERhdGUiLCJmb3JtYXR0ZWRFbmREYXRlIiwic2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQiLCJkYXRlcyIsImZvcm1hdHRlZEZpcnN0RGF0ZSIsImZvcm1hdHRlZFNlY29uZERhdGUiLCJleHRyYURhdGVzQ291bnQiLCJzZXRUaW1lIiwiX3JlZjIiLCJfcmVmMiRob3VyIiwiaG91ciIsIl9yZWYyJG1pbnV0ZSIsIm1pbnV0ZSIsIl9yZWYyJHNlY29uZCIsInNlY29uZCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRXZWVrIiwiZ2V0SVNPV2VlayIsImdldERheU9mV2Vla0NvZGUiLCJkYXkiLCJnZXRTdGFydE9mRGF5Iiwic3RhcnRPZkRheSIsImdldFN0YXJ0T2ZXZWVrIiwiY2FsZW5kYXJTdGFydERheSIsInN0YXJ0T2ZXZWVrIiwid2Vla1N0YXJ0c09uIiwiZ2V0U3RhcnRPZk1vbnRoIiwic3RhcnRPZk1vbnRoIiwiZ2V0U3RhcnRPZlllYXIiLCJzdGFydE9mWWVhciIsImdldFN0YXJ0T2ZRdWFydGVyIiwic3RhcnRPZlF1YXJ0ZXIiLCJnZXRTdGFydE9mVG9kYXkiLCJnZXRFbmRPZldlZWsiLCJlbmRPZldlZWsiLCJpc1NhbWVZZWFyIiwiZGF0ZTEiLCJkYXRlMiIsImRmSXNTYW1lWWVhciIsImlzU2FtZU1vbnRoIiwiZGZJc1NhbWVNb250aCIsImlzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZVF1YXJ0ZXIiLCJpc1NhbWVEYXkiLCJkZklzU2FtZURheSIsImlzRXF1YWwiLCJkZklzRXF1YWwiLCJpc0RheUluUmFuZ2UiLCJ2YWxpZCIsInN0YXJ0IiwiZW5kIiwiZW5kT2ZEYXkiLCJpc1dpdGhpbkludGVydmFsIiwiZXJyIiwicmVnaXN0ZXJMb2NhbGUiLCJsb2NhbGVOYW1lIiwibG9jYWxlRGF0YSIsInNjb3BlIiwid2luZG93IiwiZ2xvYmFsVGhpcyIsIl9fbG9jYWxlRGF0YV9fIiwic2V0RGVmYXVsdExvY2FsZSIsIl9fbG9jYWxlSWRfXyIsImxvY2FsZVNwZWMiLCJnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUiLCJmb3JtYXRGdW5jIiwiZ2V0V2Vla2RheU1pbkluTG9jYWxlIiwiZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUiLCJnZXRNb250aEluTG9jYWxlIiwibW9udGgiLCJzZXRNb250aCIsImdldE1vbnRoU2hvcnRJbkxvY2FsZSIsImdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlIiwicXVhcnRlciIsInNldFF1YXJ0ZXIiLCJpc0RheURpc2FibGVkIiwiX3JlZjMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJtYXhEYXRlIiwiZXhjbHVkZURhdGVzIiwiZXhjbHVkZURhdGVJbnRlcnZhbHMiLCJpbmNsdWRlRGF0ZXMiLCJpbmNsdWRlRGF0ZUludGVydmFscyIsImZpbHRlckRhdGUiLCJpc091dE9mQm91bmRzIiwic29tZSIsImV4Y2x1ZGVEYXRlIiwiX3JlZjQiLCJpbmNsdWRlRGF0ZSIsIl9yZWY1IiwiaXNEYXlFeGNsdWRlZCIsIl9yZWY2IiwiX3JlZjciLCJpc01vbnRoRGlzYWJsZWQiLCJfcmVmOCIsImVuZE9mTW9udGgiLCJpc01vbnRoSW5SYW5nZSIsIm0iLCJzdGFydERhdGVZZWFyIiwiZ2V0WWVhciIsInN0YXJ0RGF0ZU1vbnRoIiwiZ2V0TW9udGgiLCJlbmREYXRlWWVhciIsImVuZERhdGVNb250aCIsImRheVllYXIiLCJpc1F1YXJ0ZXJEaXNhYmxlZCIsIl9yZWY5IiwiaXNZZWFySW5SYW5nZSIsInllYXIiLCJzdGFydFllYXIiLCJlbmRZZWFyIiwiaXNZZWFyRGlzYWJsZWQiLCJfcmVmMTAiLCJlbmRPZlllYXIiLCJpc1F1YXJ0ZXJJblJhbmdlIiwicSIsInN0YXJ0RGF0ZVF1YXJ0ZXIiLCJnZXRRdWFydGVyIiwiZW5kRGF0ZVF1YXJ0ZXIiLCJfcmVmMTEiLCJkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMiLCJpc1RpbWVJbkxpc3QiLCJ0aW1lIiwidGltZXMiLCJsaXN0VGltZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJpc1RpbWVEaXNhYmxlZCIsIl9yZWYxMiIsImV4Y2x1ZGVUaW1lcyIsImluY2x1ZGVUaW1lcyIsImZpbHRlclRpbWUiLCJpc1RpbWVJbkRpc2FibGVkUmFuZ2UiLCJfcmVmMTMiLCJtaW5UaW1lIiwibWF4VGltZSIsIkVycm9yIiwiYmFzZVRpbWUiLCJtaW4iLCJtYXgiLCJtb250aERpc2FibGVkQmVmb3JlIiwiX3JlZjE0IiwicHJldmlvdXNNb250aCIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiZXZlcnkiLCJtb250aERpc2FibGVkQWZ0ZXIiLCJfcmVmMTUiLCJuZXh0TW9udGgiLCJhZGRNb250aHMiLCJxdWFydGVyRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTYiLCJmaXJzdERhdGVPZlllYXIiLCJwcmV2aW91c1F1YXJ0ZXIiLCJzdWJRdWFydGVycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMiLCJxdWFydGVyRGlzYWJsZWRBZnRlciIsIl9yZWYxNyIsImxhc3REYXRlT2ZZZWFyIiwibmV4dFF1YXJ0ZXIiLCJhZGRRdWFydGVycyIsInllYXJEaXNhYmxlZEJlZm9yZSIsIl9yZWYxOCIsInByZXZpb3VzWWVhciIsInN1YlllYXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyIsInllYXJzRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTkiLCJfcmVmMTkkeWVhckl0ZW1OdW1iZXIiLCJ5ZWFySXRlbU51bWJlciIsIl9nZXRZZWFyc1BlcmlvZCIsImdldFllYXJzUGVyaW9kIiwiZW5kUGVyaW9kIiwibWluRGF0ZVllYXIiLCJ5ZWFyRGlzYWJsZWRBZnRlciIsIl9yZWYyMCIsIm5leHRZZWFyIiwiYWRkWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQWZ0ZXIiLCJfcmVmMjEiLCJfcmVmMjEkeWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QyIiwic3RhcnRQZXJpb2QiLCJtYXhEYXRlWWVhciIsImdldEVmZmVjdGl2ZU1pbkRhdGUiLCJfcmVmMjIiLCJtaW5EYXRlcyIsImZpbHRlciIsImdldEVmZmVjdGl2ZU1heERhdGUiLCJfcmVmMjMiLCJtYXhEYXRlcyIsImdldEhpZ2h0TGlnaHREYXlzTWFwIiwiaGlnaGxpZ2h0RGF0ZXMiLCJkZWZhdWx0Q2xhc3NOYW1lIiwiZGF0ZUNsYXNzZXMiLCJNYXAiLCJpIiwibGVuIiwib2JqIiwiaXNEYXRlIiwia2V5IiwiY2xhc3NOYW1lc0FyciIsImdldCIsImluY2x1ZGVzIiwicHVzaCIsInNldCIsIl90eXBlb2YiLCJrZXlzIiwiT2JqZWN0IiwiY2xhc3NOYW1lIiwiYXJyT2ZEYXRlcyIsImNvbnN0cnVjdG9yIiwiayIsImFycmF5c0FyZUVxdWFsIiwiYXJyYXkxIiwiYXJyYXkyIiwiaW5kZXgiLCJnZXRIb2xpZGF5c01hcCIsImhvbGlkYXlEYXRlcyIsImhvbGlkYXkiLCJkYXRlT2JqIiwiaG9saWRheU5hbWUiLCJjbGFzc05hbWVzT2JqIiwiaG9saWRheU5hbWVBcnIiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJ0aW1lc1RvSW5qZWN0QWZ0ZXIiLCJjdXJyZW50VGltZSIsImN1cnJlbnRNdWx0aXBsaWVyIiwiaW50ZXJ2YWxzIiwiaW5qZWN0ZWRUaW1lcyIsImwiLCJpbmplY3RlZFRpbWUiLCJhZGRIb3VycyIsImFkZE1pbnV0ZXMiLCJhZGRTZWNvbmRzIiwibmV4dFRpbWUiLCJpc0FmdGVyIiwiYWRkWmVybyIsIk1hdGgiLCJjZWlsIiwiZ2V0SG91cnNJbkRheSIsImdldEZ1bGxZZWFyIiwiZ2V0RGF0ZSIsInN0YXJ0T2ZUaGVOZXh0RGF5Iiwicm91bmQiLCJzdGFydE9mTWludXRlIiwic2Vjb25kcyIsIm1pbGxpc2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsImdldFRpbWUiLCJpc1NhbWVNaW51dGUiLCJkMSIsImQyIiwiZ2V0TWlkbmlnaHREYXRlIiwiZGF0ZVdpdGhvdXRUaW1lIiwiaXNEYXRlQmVmb3JlIiwiZGF0ZVRvQ29tcGFyZSIsIm1pZG5pZ2h0RGF0ZSIsIm1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSIsImlzU3BhY2VLZXlEb3duIiwiZXZlbnQiLCJTUEFDRV9LRVkiLCJnZW5lcmF0ZVllYXJzIiwibm9PZlllYXIiLCJsaXN0IiwibmV3WWVhciIsImlzSW5SYW5nZSIsIlllYXJEcm9wZG93bk9wdGlvbnMiLCJfUmVhY3QkQ29tcG9uZW50IiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX2RlZmluZVByb3BlcnR5Iiwic2VsZWN0ZWRZZWFyIiwib3B0aW9ucyIsInN0YXRlIiwieWVhcnNMaXN0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwib25DbGljayIsIm9uQ2hhbmdlIiwiYmluZCIsIm1pblllYXIiLCJtYXhZZWFyIiwiZmluZCIsInVuc2hpZnQiLCJpbmNyZW1lbnRZZWFycyIsImRlY3JlbWVudFllYXJzIiwib25DYW5jZWwiLCJhbW91bnQiLCJ5ZWFycyIsInNldFN0YXRlIiwic2hpZnRZZWFycyIsInllYXJEcm9wZG93bkl0ZW1OdW1iZXIiLCJzY3JvbGxhYmxlWWVhckRyb3Bkb3duIiwiZHJvcGRvd25SZWYiLCJjcmVhdGVSZWYiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsImRyb3Bkb3duQ3VycmVudCIsImN1cnJlbnQiLCJkcm9wZG93bkN1cnJlbnRDaGlsZHJlbiIsImNoaWxkcmVuIiwiZnJvbSIsInNlbGVjdGVkWWVhck9wdGlvbkVsIiwiY2hpbGRFbCIsImFyaWFTZWxlY3RlZCIsInNjcm9sbFRvcCIsIm9mZnNldFRvcCIsImNsaWVudEhlaWdodCIsInNjcm9sbEhlaWdodCIsInJlbmRlciIsImRyb3Bkb3duQ2xhc3MiLCJjbHN4IiwicmVmIiwicmVuZGVyT3B0aW9ucyIsIkNvbXBvbmVudCIsIldyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zIiwib25DbGlja091dHNpZGUiLCJZZWFyRHJvcGRvd24iLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJkcm9wZG93blZpc2libGUiLCJlIiwidGFyZ2V0Iiwib25TZWxlY3RDaGFuZ2UiLCJyZW5kZXJTZWxlY3RPcHRpb25zIiwidmlzaWJsZSIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRvZ2dsZURyb3Bkb3duIiwicmVzdWx0IiwicmVuZGVyUmVhZFZpZXciLCJyZW5kZXJEcm9wZG93biIsImFkanVzdERhdGVPbkNoYW5nZSIsImhhbmRsZVllYXJDaGFuZ2UiLCJvblNlbGVjdCIsInNldE9wZW4iLCJyZW5kZXJlZERyb3Bkb3duIiwiZHJvcGRvd25Nb2RlIiwicmVuZGVyU2Nyb2xsTW9kZSIsInJlbmRlclNlbGVjdE1vZGUiLCJNb250aERyb3Bkb3duT3B0aW9ucyIsIm1vbnRoTmFtZXMiLCJpc1NlbGVjdGVkTW9udGgiLCJXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnMiLCJNb250aERyb3Bkb3duIiwiTSIsIl90aGlzMiIsInVzZVNob3J0TW9udGhJbkRyb3Bkb3duIiwidXRpbHMiLCJnZW5lcmF0ZU1vbnRoWWVhcnMiLCJjdXJyRGF0ZSIsImxhc3REYXRlIiwiTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwibW9udGhZZWFyc0xpc3QiLCJtb250aFllYXIiLCJtb250aFllYXJQb2ludCIsImlzU2FtZU1vbnRoWWVhciIsInNjcm9sbGFibGVNb250aFllYXJEcm9wZG93biIsIldyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJNb250aFllYXJEcm9wZG93biIsInRpbWVQb2ludCIsInllYXJNb250aCIsImNoYW5nZWREYXRlIiwicGFyc2VJbnQiLCJEYXkiLCJpc0Rpc2FibGVkIiwib25Nb3VzZUVudGVyIiwiZXZlbnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZU9uS2V5RG93biIsIm90aGVyIiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREIiwiZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24iLCJpc1NlbGVjdGVkRGF0ZSIsInNlbGVjdHNNdWx0aXBsZSIsInNlbGVjdGVkRGF0ZXMiLCJpc1NhbWVEYXlPcldlZWsiLCJzZWxlY3RlZCIsInByZVNlbGVjdGlvbiIsInNob3dXZWVrUGlja2VyIiwiaXNTYW1lV2VlayIsIl90aGlzJHByb3BzIiwiZGF5U3RyIiwiX3RoaXMkcHJvcHMyIiwiaG9saWRheXMiLCJoYXMiLCJfdGhpcyRwcm9wczMiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmciLCJfdGhpcyRwcm9wczQiLCJzZWxlY3RzU3RhcnQiLCJzZWxlY3RzRW5kIiwic2VsZWN0c1JhbmdlIiwic2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UiLCJzZWxlY3RpbmdEYXRlIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMiIsImlzSW5TZWxlY3RpbmdSYW5nZSIsIl90aGlzJHByb3BzNSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzMiLCJfdGhpcyRwcm9wczYiLCJfdGhpcyRwcm9wczciLCJfdGhpcyRwcm9wczgiLCJ3ZWVrZGF5IiwiZ2V0RGF5IiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREMiIsImRheUNsYXNzTmFtZSIsImlzRXhjbHVkZWQiLCJpc1NlbGVjdGVkIiwiaXNLZXlib2FyZFNlbGVjdGVkIiwiaXNSYW5nZVN0YXJ0IiwiaXNSYW5nZUVuZCIsImlzU2VsZWN0aW5nUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nUmFuZ2VFbmQiLCJpc0N1cnJlbnREYXkiLCJpc1dlZWtlbmQiLCJpc0FmdGVyTW9udGgiLCJpc0JlZm9yZU1vbnRoIiwiZ2V0SGlnaExpZ2h0ZWRDbGFzcyIsImdldEhvbGlkYXlzQ2xhc3MiLCJfdGhpcyRwcm9wczkiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCIsIl90aGlzJHByb3BzOSRhcmlhTGFiZTIiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQiLCJwcmVmaXgiLCJfdGhpcyRwcm9wczEwIiwiX3RoaXMkcHJvcHMxMCRob2xpZGF5IiwiY29tcGFyZUR0IiwidGl0bGVzIiwiYXBwbHkiLCJob2xpZGF5TmFtZXMiLCJtZXNzYWdlIiwic2VsZWN0ZWREYXkiLCJwcmVTZWxlY3Rpb25EYXkiLCJ0YWJJbmRleCIsInNob3dXZWVrTnVtYmVyIiwiaXNTdGFydE9mV2VlayIsIl90aGlzJGRheUVsJGN1cnJlbnQiLCJwcmV2UHJvcHMiLCJzaG91bGRGb2N1c0RheSIsImdldFRhYkluZGV4IiwiaXNJbnB1dEZvY3VzZWQiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJib2R5IiwiaW5saW5lIiwic2hvdWxkRm9jdXNEYXlJbmxpbmUiLCJjb250YWluZXJSZWYiLCJjb250YWlucyIsImNsYXNzTGlzdCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kIiwibW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCIsImRheUVsIiwiZm9jdXMiLCJwcmV2ZW50U2Nyb2xsIiwicmVuZGVyRGF5Q29udGVudHMiLCJnZXRDbGFzc05hbWVzIiwib25LZXlEb3duIiwiaGFuZGxlQ2xpY2siLCJ1c2VQb2ludGVyRXZlbnQiLCJoYW5kbGVNb3VzZUVudGVyIiwib25Qb2ludGVyRW50ZXIiLCJnZXRBcmlhTGFiZWwiLCJyb2xlIiwidGl0bGUiLCJnZXRUaXRsZSIsImhhbmRsZUZvY3VzRGF5IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiV2Vla051bWJlciIsInNob3VsZEZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXJFbCIsImhhbmRsZUZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXIiLCJfdGhpcyRwcm9wcyRhcmlhTGFiZWwiLCJhcmlhTGFiZWxQcmVmaXgiLCJ3ZWVrTnVtYmVyQ2xhc3NlcyIsIldlZWsiLCJvbkRheUNsaWNrIiwib25EYXlNb3VzZUVudGVyIiwib25XZWVrU2VsZWN0IiwiaGFuZGxlRGF5Q2xpY2siLCJzaG91bGRDbG9zZU9uU2VsZWN0IiwiZm9ybWF0V2Vla051bWJlciIsImRheXMiLCJvbkNsaWNrQWN0aW9uIiwiaGFuZGxlV2Vla0NsaWNrIiwib2Zmc2V0IiwiYWRkRGF5cyIsImNob29zZURheUFyaWFMYWJlbFByZWZpeCIsImRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4IiwidmFsdWVPZiIsImhhbmRsZURheU1vdXNlRW50ZXIiLCJyZW5kZXJEYXlzIiwiRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQiLCJNT05USF9DT0xVTU5TX0xBWU9VVCIsIlRXT19DT0xVTU5TIiwiVEhSRUVfQ09MVU1OUyIsIkZPVVJfQ09MVU1OUyIsIk1PTlRIX0NPTFVNTlMiLCJncmlkIiwidmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0IiwiTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCIsImdldE1vbnRoQ29sdW1uc0xheW91dCIsInNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyIiwic2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlciIsIk1vbnRoIiwib3JkZXJJbkRpc3BsYXkiLCJvbk1vdXNlTGVhdmUiLCJpc0luU2VsZWN0aW5nUmFuZ2VNb250aCIsIl9tb250aCIsIl90aGlzJHByb3BzJHNlbGVjdGluZzQiLCJ3ZWVrcyIsImlzRml4ZWRIZWlnaHQiLCJmaXhlZEhlaWdodCIsImJyZWFrQWZ0ZXJOZXh0UHVzaCIsImN1cnJlbnRXZWVrU3RhcnQiLCJ3ZWVrQXJpYUxhYmVsUHJlZml4Iiwic2hvd1dlZWtOdW1iZXJzIiwiaXNGaXhlZEFuZEZpbmFsV2VlayIsImlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoIiwiaXNXZWVrSW5Nb250aCIsInBlZWtOZXh0TW9udGgiLCJsYWJlbERhdGUiLCJuZXdNb250aCIsInNldFByZVNlbGVjdGlvbiIsIk1PTlRIX1JFRlMiLCJoYW5kbGVPbk1vbnRoS2V5RG93biIsIm1vbnRoQ29sdW1uc0xheW91dCIsInZlcnRpY2FsT2Zmc2V0IiwibW9udGhzR3JpZCIsIm9uTW9udGhDbGljayIsImhhbmRsZU1vbnRoTmF2aWdhdGlvbiIsIm5ld1F1YXJ0ZXIiLCJRVUFSVEVSX1JFRlMiLCJvblF1YXJ0ZXJDbGljayIsImhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uIiwiX3RoaXMkcHJvcHMxMSIsIm1vbnRoQ2xhc3NOYW1lIiwiX21vbnRoQ2xhc3NOYW1lIiwiaXNSYW5nZVN0YXJ0TW9udGgiLCJpc1JhbmdlRW5kTW9udGgiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCIsImlzQ3VycmVudE1vbnRoIiwicHJlU2VsZWN0ZWRNb250aCIsInByZVNlbGVjdGVkUXVhcnRlciIsIl90aGlzJHByb3BzMTIiLCJfdGhpcyRwcm9wczEyJGNob29zZUQiLCJfdGhpcyRwcm9wczEyJGRpc2FibGUiLCJfdGhpcyRwcm9wczEzIiwiaXNTZWxlY3RlZFF1YXJ0ZXIiLCJpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyIiwiaXNSYW5nZVN0YXJ0UXVhcnRlciIsImlzUmFuZ2VFbmRRdWFydGVyIiwiX3RoaXMkcHJvcHMxNCIsInNob3dGdWxsTW9udGhZZWFyUGlja2VyIiwicmVuZGVyTW9udGhDb250ZW50Iiwic2hvcnRNb250aFRleHQiLCJmdWxsTW9udGhUZXh0IiwiX3RoaXMkcHJvcHMxNSIsInJlbmRlclF1YXJ0ZXJDb250ZW50Iiwic2hvcnRRdWFydGVyIiwiX3RoaXMkcHJvcHMxNiIsIm1vbnRoQ29sdW1ucyIsImoiLCJldiIsIm9uTW9udGhLZXlEb3duIiwib25Nb250aE1vdXNlRW50ZXIiLCJnZXRNb250aENsYXNzTmFtZXMiLCJnZXRNb250aENvbnRlbnQiLCJfdGhpcyRwcm9wczE3IiwicXVhcnRlcnMiLCJvblF1YXJ0ZXJLZXlEb3duIiwib25RdWFydGVyTW91c2VFbnRlciIsImdldFF1YXJ0ZXJDbGFzc05hbWVzIiwiZ2V0UXVhcnRlclRhYkluZGV4IiwiaXNDdXJyZW50UXVhcnRlciIsImdldFF1YXJ0ZXJDb250ZW50IiwiX3RoaXMkcHJvcHMxOCIsInNob3dNb250aFllYXJQaWNrZXIiLCJzaG93UXVhcnRlclllYXJQaWNrZXIiLCJfdGhpcyRwcm9wczE5IiwiX3RoaXMkcHJvcHMxOSRhcmlhTGFiIiwiZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4IiwidHJpbSIsImhhbmRsZU1vdXNlTGVhdmUiLCJvblBvaW50ZXJMZWF2ZSIsInJlbmRlck1vbnRocyIsInJlbmRlclF1YXJ0ZXJzIiwicmVuZGVyV2Vla3MiLCJUaW1lIiwiaGVpZ2h0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2VudGVyTGkiLCJjYWxjQ2VudGVyUG9zaXRpb24iLCJtb250aFJlZiIsImhlYWRlciIsImNsYXNzZXMiLCJ0aW1lQ2xhc3NOYW1lIiwiaXNTZWxlY3RlZFRpbWUiLCJpc0Rpc2FibGVkVGltZSIsImluamVjdFRpbWVzIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJhY3RpdmVEYXRlIiwib3BlblRvRGF0ZSIsImJhc2UiLCJzb3J0ZWRJbmplY3RUaW1lcyIsInNvcnQiLCJhIiwiYiIsIm1pbnV0ZXNJbkRheSIsIm11bHRpcGxpZXIiLCJ0aW1lc1RvSW5qZWN0IiwidGltZVRvRm9jdXMiLCJyZWR1Y2UiLCJwcmV2IiwibGlDbGFzc2VzIiwibGkiLCJzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSIsInRvZGF5QnV0dG9uIiwic2hvd1RpbWVTZWxlY3RPbmx5IiwidGltZUNhcHRpb24iLCJyZW5kZXJUaW1lcyIsIm9uVGltZUNoYW5nZSIsImxpc3RIZWlnaHQiLCJjZW50ZXJMaVJlZiIsIlZFUlRJQ0FMX05BVklHQVRJT05fT0ZGU0VUIiwiWWVhciIsInJlZkluZGV4Iiwid2FpdEZvclJlUmVuZGVyIiwiWUVBUl9SRUZTIiwiX3V0aWxzJGdldFllYXJzUGVyaW9kIiwidXBkYXRlRm9jdXNPblBhZ2luYXRlIiwiYWJzIiwieSIsIl95ZWFyIiwiaGFuZGxlWWVhckNsaWNrIiwib25ZZWFyQ2xpY2siLCJoYW5kbGVZZWFyTmF2aWdhdGlvbiIsIl91dGlscyRnZXRZZWFyc1BlcmlvZDIiLCJsZWZ0T3Zlck9mZnNldCIsIl91dGlscyRnZXRZZWFyc1BlcmlvZDMiLCJ5ZWFyQ2xhc3NOYW1lIiwiaXNDdXJyZW50WWVhciIsInByZVNlbGVjdGVkIiwicmVuZGVyWWVhckNvbnRlbnQiLCJvblllYXJNb3VzZUVudGVyIiwib25ZZWFyTW91c2VMZWF2ZSIsIl91dGlscyRnZXRZZWFyc1BlcmlvZDQiLCJfbG9vcCIsIm9uWWVhcktleURvd24iLCJnZXRZZWFyVGFiSW5kZXgiLCJnZXRZZWFyQ2xhc3NOYW1lcyIsImdldFllYXJDb250ZW50IiwiZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMiLCJjbGVhclNlbGVjdGluZ0RhdGUiLCJpbnB1dFRpbWUiLCJwcm9wRGF0ZSIsImlzUHJvcERhdGVWYWxpZCIsImlzTmFOIiwic3BsaXQiLCJ0aW1lU3RyaW5nIiwiY3VzdG9tVGltZUlucHV0IiwiY2xvbmVFbGVtZW50IiwidHlwZSIsInBsYWNlaG9sZGVyIiwibmFtZSIsInJlcXVpcmVkIiwidGltZUlucHV0TGFiZWwiLCJyZW5kZXJUaW1lSW5wdXQiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJDYWxlbmRhckNvbnRhaW5lciIsIl9yZWYkc2hvd1RpbWVTZWxlY3RPbiIsIl9yZWYkc2hvd1RpbWUiLCJzaG93VGltZSIsImFyaWFMYWJlbCIsIkRST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMiLCJpc0Ryb3Bkb3duU2VsZWN0IiwiZWxlbWVudCIsImNsYXNzTmFtZXMiLCJ0ZXN0Q2xhc3NuYW1lIiwiaW5kZXhPZiIsIkNhbGVuZGFyIiwib25Ecm9wZG93bkZvY3VzIiwiaW5pdGlhbERhdGUiLCJoYW5kbGVNb250aENoYW5nZSIsIm1vbnRoU2VsZWN0ZWRJbiIsIm9uTW9udGhNb3VzZUxlYXZlIiwic2V0WWVhciIsIm9uWWVhckNoYW5nZSIsImlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlIiwiaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UiLCJvbk1vbnRoQ2hhbmdlIiwiaGFuZGxlTW9udGhZZWFyQ2hhbmdlIiwiZGF5TmFtZXMiLCJ3ZWVrTGFiZWwiLCJ3ZWVrRGF5TmFtZSIsImZvcm1hdFdlZWtkYXkiLCJ3ZWVrRGF5Q2xhc3NOYW1lIiwiZm9ybWF0V2Vla0RheSIsInVzZVdlZWtkYXlzU2hvcnQiLCJzaG93WWVhclBpY2tlciIsInJlbmRlckN1c3RvbUhlYWRlciIsImFsbFByZXZEYXlzRGlzYWJsZWQiLCJmb3JjZVNob3dNb250aE5hdmlnYXRpb24iLCJzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24iLCJpY29uQ2xhc3NlcyIsImNsaWNrSGFuZGxlciIsImRlY3JlYXNlTW9udGgiLCJkZWNyZWFzZVllYXIiLCJpc0ZvclllYXIiLCJwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwiLCJwcmV2aW91c1llYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91cyIsInByZXZpb3VzTW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMyIiwicHJldmlvdXNZZWFyQXJpYUxhYmVsIiwiYWxsTmV4dERheXNEaXNhYmxlZCIsInNob3dUaW1lU2VsZWN0IiwiaW5jcmVhc2VNb250aCIsImluY3JlYXNlWWVhciIsIm5leHRNb250aEJ1dHRvbkxhYmVsIiwibmV4dFllYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0TW9udCIsIm5leHRNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0WWVhciIsIm5leHRZZWFyQXJpYUxhYmVsIiwic2hvd1llYXJEcm9wZG93biIsInNob3dNb250aERyb3Bkb3duIiwic2hvd01vbnRoWWVhckRyb3Bkb3duIiwib3ZlcnJpZGVIaWRlIiwiY2hhbmdlWWVhciIsImNoYW5nZU1vbnRoIiwiY2hhbmdlTW9udGhZZWFyIiwiaGFuZGxlVG9kYXlCdXR0b25DbGljayIsIm1vbnRoRGF0ZSIsInJlbmRlckN1cnJlbnRNb250aCIsIm9uRm9jdXMiLCJoYW5kbGVEcm9wZG93bkZvY3VzIiwicmVuZGVyTW9udGhEcm9wZG93biIsInJlbmRlck1vbnRoWWVhckRyb3Bkb3duIiwicmVuZGVyWWVhckRyb3Bkb3duIiwiaGVhZGVyQXJncyIsIm1vbnRoQ29udGFpbmVyIiwicHJldk1vbnRoQnV0dG9uRGlzYWJsZWQiLCJuZXh0TW9udGhCdXR0b25EaXNhYmxlZCIsInByZXZZZWFyQnV0dG9uRGlzYWJsZWQiLCJuZXh0WWVhckJ1dHRvbkRpc2FibGVkIiwic2hvd0RheU5hbWVzIiwiX29iamVjdFNwcmVhZCIsImN1c3RvbUhlYWRlckNvdW50IiwicmVuZGVyWWVhckhlYWRlciIsInJlbmRlckRlZmF1bHRIZWFkZXIiLCJfdGhpcyRwcm9wcyRtb250aFNlbGUiLCJtb250aExpc3QiLCJtb250aHNUb1N1YnRyYWN0Iiwic2hvd1ByZXZpb3VzTW9udGhzIiwibW9udGhzU2hvd24iLCJmcm9tTW9udGhEYXRlIiwibW9udGhzVG9BZGQiLCJtb250aEtleSIsImRpdiIsInJlbmRlckhlYWRlciIsIm1vbnRoQXJpYUxhYmVsUHJlZml4IiwiaGFuZGxlT25EYXlLZXlEb3duIiwiaGFuZGxlTW9udGhNb3VzZUxlYXZlIiwiX2V4dGVuZHMiLCJoYW5kbGVZZWFyTW91c2VFbnRlciIsImhhbmRsZVllYXJNb3VzZUxlYXZlIiwidGltZUZvcm1hdCIsInRpbWVJbnRlcnZhbHMiLCJ3aXRoUG9ydGFsIiwidGltZVZhbGlkIiwiQm9vbGVhbiIsInNob3dUaW1lSW5wdXQiLCJJbnB1dFRpbWUiLCJhcmlhTGl2ZU1lc3NhZ2UiLCJnZXREYXRlSW5WaWV3IiwiYXNzaWduTW9udGhDb250YWluZXIiLCJfdGhpczMiLCJoYXNNb250aENoYW5nZWQiLCJDb250YWluZXIiLCJjb250YWluZXIiLCJkaXNwbGF5IiwicmVuZGVyQXJpYUxpdmVSZWdpb24iLCJyZW5kZXJQcmV2aW91c0J1dHRvbiIsInJlbmRlck5leHRCdXR0b24iLCJyZW5kZXJZZWFycyIsInJlbmRlclRvZGF5QnV0dG9uIiwicmVuZGVyVGltZVNlY3Rpb24iLCJyZW5kZXJJbnB1dFRpbWVTZWN0aW9uIiwicmVuZGVyQ2hpbGRyZW4iLCJDYWxlbmRhckljb24iLCJpY29uIiwiX3JlZiRjbGFzc05hbWUiLCJkZWZhdWx0Q2xhc3MiLCJpc1ZhbGlkRWxlbWVudCIsInhtbG5zIiwidmlld0JveCIsIlBvcnRhbCIsImVsIiwicG9ydGFsUm9vdCIsInBvcnRhbEhvc3QiLCJnZXRFbGVtZW50QnlJZCIsInBvcnRhbElkIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUNoaWxkIiwiUmVhY3RET00iLCJjcmVhdGVQb3J0YWwiLCJmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yIiwiZm9jdXNhYmxlRmlsdGVyIiwibm9kZSIsImRpc2FibGVkIiwiVGFiTG9vcCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YWJMb29wUmVmIiwicXVlcnlTZWxlY3RvckFsbCIsInRhYkNoaWxkcmVuIiwiZ2V0VGFiQ2hpbGRyZW4iLCJlbmFibGVUYWJMb29wIiwiaGFuZGxlRm9jdXNTdGFydCIsImhhbmRsZUZvY3VzRW5kIiwid2l0aEZsb2F0aW5nIiwiV2l0aEZsb2F0aW5nIiwiYWx0X3Byb3BzIiwicG9wcGVyTW9kaWZpZXJzIiwicG9wcGVyUHJvcHMiLCJoaWRlUG9wcGVyIiwiYXJyb3dSZWYiLCJ1c2VSZWYiLCJmbG9hdGluZ1Byb3BzIiwidXNlRmxvYXRpbmciLCJvcGVuIiwid2hpbGVFbGVtZW50c01vdW50ZWQiLCJhdXRvVXBkYXRlIiwicGxhY2VtZW50IiwicG9wcGVyUGxhY2VtZW50IiwibWlkZGxld2FyZSIsImZsaXAiLCJwYWRkaW5nIiwiYXJyb3ciLCJQb3BwZXJDb21wb25lbnQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwicG9wcGVyQ29tcG9uZW50IiwidGFyZ2V0Q29tcG9uZW50IiwicG9wcGVyT25LZXlEb3duIiwic2hvd0Fycm93IiwicG9wcGVyIiwicmVmcyIsInNldEZsb2F0aW5nIiwiZmxvYXRpbmdTdHlsZXMiLCJGbG9hdGluZ0Fycm93IiwiY29udGV4dCIsImZpbGwiLCJzdHJva2VXaWR0aCIsIndpZHRoIiwidHJhbnNmb3JtIiwicG9wcGVyQ29udGFpbmVyIiwid3JhcHBlckNsYXNzZXMiLCJGcmFnbWVudCIsInNldFJlZmVyZW5jZSIsIm91dHNpZGVDbGlja0lnbm9yZUNsYXNzIiwiV3JhcHBlZENhbGVuZGFyIiwiaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZCIsIklOUFVUX0VSUl8xIiwiRGF0ZVBpY2tlciIsIl90aGlzJHByb3BzJGhvbGlkYXlzIiwiYWNjdW11bGF0b3IiLCJkZWZhdWx0UHJlU2VsZWN0aW9uIiwiZ2V0UHJlU2VsZWN0aW9uIiwiYm91bmRlZFByZVNlbGVjdGlvbiIsInN0YXJ0T3BlbiIsInByZXZlbnRGb2N1cyIsImZvY3VzZWQiLCJwcmV2ZW50Rm9jdXNUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaW5wdXQiLCJibHVyIiwiY2FuY2VsRm9jdXNJbnB1dCIsInNraXBTZXRCbHVyIiwiY2FsY0luaXRpYWxTdGF0ZSIsImxhc3RQcmVTZWxlY3RDaGFuZ2UiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSIsInNldEJsdXIiLCJpbnB1dFZhbHVlIiwicmVhZE9ubHkiLCJwcmV2ZW50T3Blbk9uRm9jdXMiLCJjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2V0Rm9jdXMiLCJpbnB1dEZvY3VzVGltZW91dCIsIm9uQmx1ciIsImFsbEFyZ3MiLCJvbkNoYW5nZVJhdyIsImlzRGVmYXVsdFByZXZlbnRlZCIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUIiwiaG91cnMiLCJtaW51dGVzIiwic2V0U2VsZWN0ZWQiLCJzZW5kRm9jdXNCYWNrVG9JbnB1dCIsInNob3dEYXRlU2VsZWN0Iiwic3dhcFJhbmdlIiwia2VlcElucHV0IiwiYWxsb3dTYW1lRGF5IiwiZm9jdXNTZWxlY3RlZE1vbnRoIiwibm9SYW5nZXMiLCJoYXNTdGFydFJhbmdlIiwiaXNSYW5nZUZpbGxlZCIsImlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQiLCJzZWxlY3RlZERhdGUiLCJuZXh0RGF0ZXMiLCJoYXNNaW5EYXRlIiwiaGFzTWF4RGF0ZSIsImlzVmFsaWREYXRlU2VsZWN0aW9uIiwiZGF0ZVN0YXJ0T2ZEYXkiLCJtaW5EYXRlU3RhcnRPZkRheSIsIm1heERhdGVFbmRPZkRheSIsIm9uSW5wdXRDbGljayIsInNlbGVjdG9yU3RyaW5nIiwic2VsZWN0ZWRJdGVtIiwiY2FsZW5kYXIiLCJjb21wb25lbnROb2RlIiwicXVlcnlTZWxlY3RvciIsImNvcHkiLCJpbnB1dE9rIiwiaGFuZGxlU2VsZWN0Iiwib25JbnB1dEVycm9yIiwiY29kZSIsIm1zZyIsImlzU2hpZnRLZXlBY3RpdmUiLCJzaGlmdEtleSIsIm5ld1NlbGVjdGlvbiIsInN1YldlZWtzIiwic3ViRGF5cyIsImFkZFdlZWtzIiwicHJldk1vbnRoIiwicHJldlllYXIiLCJvbkNsZWFyQ2xpY2siLCJjbG9zZU9uU2Nyb2xsIiwiZG9jdW1lbnRFbGVtZW50IiwiaXNDYWxlbmRhck9wZW4iLCJlbGVtIiwiZGF0ZUZvcm1hdENhbGVuZGFyIiwiaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUiLCJtb2RpZnlIb2xpZGF5cyIsImhhbmRsZVRpbWVDaGFuZ2UiLCJjYWxlbmRhckNsYXNzTmFtZSIsImNhbGVuZGFyQ29udGFpbmVyIiwiZXhjbHVkZVNjcm9sbGJhciIsIm9uRGF5S2V5RG93biIsImlzQ29udGFpbnNUaW1lIiwibG9uZ0RhdGVGb3JtYXQiLCJfUmVhY3QkY2xvbmVFbGVtZW50IiwiY3VzdG9tSW5wdXQiLCJjdXN0b21JbnB1dFJlZiIsImhhbmRsZUJsdXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVGb2N1cyIsIm9uSW5wdXRLZXlEb3duIiwiaWQiLCJmb3JtIiwiYXV0b0ZvY3VzIiwicGxhY2Vob2xkZXJUZXh0IiwiYXV0b0NvbXBsZXRlIiwiYXJpYURlc2NyaWJlZEJ5IiwiYXJpYUludmFsaWQiLCJhcmlhTGFiZWxsZWRCeSIsImFyaWFSZXF1aXJlZCIsImlzQ2xlYXJhYmxlIiwiY2xlYXJCdXR0b25UaXRsZSIsIl90aGlzJHByb3BzNCRjbGVhckJ1dCIsImNsZWFyQnV0dG9uQ2xhc3NOYW1lIiwiX3RoaXMkcHJvcHM0JGFyaWFMYWJlIiwiYXJpYUxhYmVsQ2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25TY3JvbGwiLCJwcmV2U3RhdGUiLCJvbkNhbGVuZGFyT3BlbiIsIm9uQ2FsZW5kYXJDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJJbnB1dENvbnRhaW5lciIsInNob3dJY29uIiwiY2FsZW5kYXJJY29uQ2xhc3NuYW1lIiwidG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayIsInRvZ2dsZUNhbGVuZGFyIiwicmVuZGVyRGF0ZUlucHV0IiwicmVuZGVyQ2xlYXJCdXR0b24iLCJyZW5kZXJDYWxlbmRhciIsInBvcnRhbENvbnRhaW5lciIsIm9uUG9ydGFsS2V5RG93biIsInBvcHBlckNsYXNzTmFtZSIsIm9uUG9wcGVyS2V5RG93biIsInNob3dQb3BwZXJBcnJvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEyRE8sSUFBTUEsd0JBQXdCLEdBQUcsRUFBRSxDQUFBOztFQUUxQztFQUNBO0VBQ0EsSUFBTUMsMEJBQTBCLEdBQUcsbUNBQW1DLENBQUE7O0VBRXRFOztFQUVPLFNBQVNDLE9BQU9BLENBQUNDLEtBQUssRUFBRTtJQUM3QixJQUFNQyxDQUFDLEdBQUdELEtBQUssR0FDWCxPQUFPQSxLQUFLLEtBQUssUUFBUSxJQUFJQSxLQUFLLFlBQVlFLE1BQU0sR0FDbERDLGlCQUFRLENBQUNILEtBQUssQ0FBQyxHQUNmSSxhQUFNLENBQUNKLEtBQUssQ0FBQyxHQUNmLElBQUlLLElBQUksRUFBRSxDQUFBO0VBQ2QsRUFBQSxPQUFPQyxPQUFPLENBQUNMLENBQUMsQ0FBQyxHQUFHQSxDQUFDLEdBQUcsSUFBSSxDQUFBO0VBQzlCLENBQUE7RUFFTyxTQUFTTSxTQUFTQSxDQUFDUCxLQUFLLEVBQUVRLFVBQVUsRUFBRUMsTUFBTSxFQUFFQyxhQUFhLEVBQUVDLE9BQU8sRUFBRTtJQUMzRSxJQUFJQyxVQUFVLEdBQUcsSUFBSSxDQUFBO0VBQ3JCLEVBQUEsSUFBSUMsWUFBWSxHQUNkQyxlQUFlLENBQUNMLE1BQU0sQ0FBQyxJQUFJSyxlQUFlLENBQUNDLGdCQUFnQixFQUFFLENBQUMsQ0FBQTtJQUNoRSxJQUFJQyx1QkFBdUIsR0FBRyxJQUFJLENBQUE7RUFDbEMsRUFBQSxJQUFJQyxLQUFLLENBQUNDLE9BQU8sQ0FBQ1YsVUFBVSxDQUFDLEVBQUU7RUFDN0JBLElBQUFBLFVBQVUsQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLEVBQUUsRUFBSztFQUN6QixNQUFBLElBQUlDLFlBQVksR0FBR0MsV0FBSyxDQUFDdEIsS0FBSyxFQUFFb0IsRUFBRSxFQUFFLElBQUlmLElBQUksRUFBRSxFQUFFO0VBQzlDSSxRQUFBQSxNQUFNLEVBQUVJLFlBQVk7RUFDcEJVLFFBQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLFFBQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsT0FBQyxDQUFDLENBQUE7RUFDRixNQUFBLElBQUlkLGFBQWEsRUFBRTtFQUNqQk0sUUFBQUEsdUJBQXVCLEdBQ3JCVixPQUFPLENBQUNlLFlBQVksRUFBRVYsT0FBTyxDQUFDLElBQzlCWCxLQUFLLEtBQUt5QixVQUFVLENBQUNKLFlBQVksRUFBRUQsRUFBRSxFQUFFWCxNQUFNLENBQUMsQ0FBQTtFQUNsRCxPQUFBO1FBQ0EsSUFBSUgsT0FBTyxDQUFDZSxZQUFZLEVBQUVWLE9BQU8sQ0FBQyxJQUFJSyx1QkFBdUIsRUFBRTtFQUM3REosUUFBQUEsVUFBVSxHQUFHUyxZQUFZLENBQUE7RUFDM0IsT0FBQTtFQUNGLEtBQUMsQ0FBQyxDQUFBO0VBQ0YsSUFBQSxPQUFPVCxVQUFVLENBQUE7RUFDbkIsR0FBQTtJQUVBQSxVQUFVLEdBQUdVLFdBQUssQ0FBQ3RCLEtBQUssRUFBRVEsVUFBVSxFQUFFLElBQUlILElBQUksRUFBRSxFQUFFO0VBQ2hESSxJQUFBQSxNQUFNLEVBQUVJLFlBQVk7RUFDcEJVLElBQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLElBQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsR0FBQyxDQUFDLENBQUE7RUFFRixFQUFBLElBQUlkLGFBQWEsRUFBRTtFQUNqQk0sSUFBQUEsdUJBQXVCLEdBQ3JCVixPQUFPLENBQUNNLFVBQVUsQ0FBQyxJQUNuQlosS0FBSyxLQUFLeUIsVUFBVSxDQUFDYixVQUFVLEVBQUVKLFVBQVUsRUFBRUMsTUFBTSxDQUFDLENBQUE7RUFDeEQsR0FBQyxNQUFNLElBQUksQ0FBQ0gsT0FBTyxDQUFDTSxVQUFVLENBQUMsRUFBRTtFQUMvQkosSUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQ3BCa0IsS0FBSyxDQUFDNUIsMEJBQTBCLENBQUMsQ0FDakM2QixHQUFHLENBQUMsVUFBVUMsU0FBUyxFQUFFO0VBQ3hCLE1BQUEsSUFBTUMsY0FBYyxHQUFHRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDbkMsTUFBQSxJQUFJQyxjQUFjLEtBQUssR0FBRyxJQUFJQSxjQUFjLEtBQUssR0FBRyxFQUFFO0VBQ3BELFFBQUEsSUFBTUMsYUFBYSxHQUFHQyxxQkFBYyxDQUFDRixjQUFjLENBQUMsQ0FBQTtVQUNwRCxPQUFPaEIsWUFBWSxHQUNmaUIsYUFBYSxDQUFDRixTQUFTLEVBQUVmLFlBQVksQ0FBQ21CLFVBQVUsQ0FBQyxHQUNqREgsY0FBYyxDQUFBO0VBQ3BCLE9BQUE7RUFDQSxNQUFBLE9BQU9ELFNBQVMsQ0FBQTtFQUNsQixLQUFDLENBQUMsQ0FDREssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0VBRVgsSUFBQSxJQUFJakMsS0FBSyxDQUFDa0MsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwQnRCLFVBQVUsR0FBR1UsV0FBSyxDQUFDdEIsS0FBSyxFQUFFUSxVQUFVLENBQUMyQixLQUFLLENBQUMsQ0FBQyxFQUFFbkMsS0FBSyxDQUFDa0MsTUFBTSxDQUFDLEVBQUUsSUFBSTdCLElBQUksRUFBRSxFQUFFO0VBQ3ZFa0IsUUFBQUEsMkJBQTJCLEVBQUUsSUFBSTtFQUNqQ0MsUUFBQUEsNEJBQTRCLEVBQUUsSUFBQTtFQUNoQyxPQUFDLENBQUMsQ0FBQTtFQUNKLEtBQUE7RUFFQSxJQUFBLElBQUksQ0FBQ2xCLE9BQU8sQ0FBQ00sVUFBVSxDQUFDLEVBQUU7RUFDeEJBLE1BQUFBLFVBQVUsR0FBRyxJQUFJUCxJQUFJLENBQUNMLEtBQUssQ0FBQyxDQUFBO0VBQzlCLEtBQUE7RUFDRixHQUFBO0lBRUEsT0FBT00sT0FBTyxDQUFDTSxVQUFVLENBQUMsSUFBSUksdUJBQXVCLEdBQUdKLFVBQVUsR0FBRyxJQUFJLENBQUE7RUFDM0UsQ0FBQTtFQU1PLFNBQVNOLE9BQU9BLENBQUM4QixJQUFJLEVBQUV6QixPQUFPLEVBQUU7SUFDckNBLE9BQU8sR0FBR0EsT0FBTyxHQUFHQSxPQUFPLEdBQUcsSUFBSU4sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE9BQU9nQyxpQkFBVyxDQUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDRSxpQkFBUSxDQUFDRixJQUFJLEVBQUV6QixPQUFPLENBQUMsQ0FBQTtFQUN0RCxDQUFBOztFQUVBOztFQUVPLFNBQVNjLFVBQVVBLENBQUNXLElBQUksRUFBRUcsU0FBUyxFQUFFOUIsTUFBTSxFQUFFO0lBQ2xELElBQUlBLE1BQU0sS0FBSyxJQUFJLEVBQUU7RUFDbkIsSUFBQSxPQUFPK0IsYUFBTSxDQUFDSixJQUFJLEVBQUVHLFNBQVMsRUFBRTtFQUM3QmhCLE1BQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLE1BQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsS0FBQyxDQUFDLENBQUE7RUFDSixHQUFBO0VBQ0EsRUFBQSxJQUFJaUIsU0FBUyxHQUFHM0IsZUFBZSxDQUFDTCxNQUFNLENBQUMsQ0FBQTtFQUN2QyxFQUFBLElBQUlBLE1BQU0sSUFBSSxDQUFDZ0MsU0FBUyxFQUFFO0VBQ3hCQyxJQUFBQSxPQUFPLENBQUNDLElBQUksQ0FBQSwyREFBQSxDQUFBQyxNQUFBLENBQ2lEbkMsTUFBTSxTQUNuRSxDQUFDLENBQUE7RUFDSCxHQUFBO0VBQ0EsRUFBQSxJQUNFLENBQUNnQyxTQUFTLElBQ1YsQ0FBQyxDQUFDMUIsZ0JBQWdCLEVBQUUsSUFDcEIsQ0FBQyxDQUFDRCxlQUFlLENBQUNDLGdCQUFnQixFQUFFLENBQUMsRUFDckM7RUFDQTBCLElBQUFBLFNBQVMsR0FBRzNCLGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0VBQ2pELEdBQUE7RUFDQSxFQUFBLE9BQU95QixhQUFNLENBQUNKLElBQUksRUFBRUcsU0FBUyxFQUFFO0VBQzdCOUIsSUFBQUEsTUFBTSxFQUFFZ0MsU0FBUyxHQUFHQSxTQUFTLEdBQUcsSUFBSTtFQUNwQ2xCLElBQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLElBQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsR0FBQyxDQUFDLENBQUE7RUFDSixDQUFBO0VBRU8sU0FBU3FCLGNBQWNBLENBQUNULElBQUksRUFBQVUsSUFBQSxFQUEwQjtFQUFBLEVBQUEsSUFBdEJ0QyxVQUFVLEdBQUFzQyxJQUFBLENBQVZ0QyxVQUFVO01BQUVDLE1BQU0sR0FBQXFDLElBQUEsQ0FBTnJDLE1BQU0sQ0FBQTtJQUN2RCxPQUNHMkIsSUFBSSxJQUNIWCxVQUFVLENBQ1JXLElBQUksRUFDSm5CLEtBQUssQ0FBQ0MsT0FBTyxDQUFDVixVQUFVLENBQUMsR0FBR0EsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHQSxVQUFVLEVBQ3REQyxNQUNGLENBQUMsSUFDSCxFQUFFLENBQUE7RUFFTixDQUFBO0VBRU8sU0FBU3NDLG1CQUFtQkEsQ0FBQ0MsU0FBUyxFQUFFQyxPQUFPLEVBQUVDLEtBQUssRUFBRTtJQUM3RCxJQUFJLENBQUNGLFNBQVMsRUFBRTtFQUNkLElBQUEsT0FBTyxFQUFFLENBQUE7RUFDWCxHQUFBO0VBRUEsRUFBQSxJQUFNRyxrQkFBa0IsR0FBR04sY0FBYyxDQUFDRyxTQUFTLEVBQUVFLEtBQUssQ0FBQyxDQUFBO0lBQzNELElBQU1FLGdCQUFnQixHQUFHSCxPQUFPLEdBQUdKLGNBQWMsQ0FBQ0ksT0FBTyxFQUFFQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7RUFFdEUsRUFBQSxPQUFBLEVBQUEsQ0FBQU4sTUFBQSxDQUFVTyxrQkFBa0IsRUFBQVAsS0FBQUEsQ0FBQUEsQ0FBQUEsTUFBQSxDQUFNUSxnQkFBZ0IsQ0FBQSxDQUFBO0VBQ3BELENBQUE7RUFFTyxTQUFTQyx1QkFBdUJBLENBQUNDLEtBQUssRUFBRUosS0FBSyxFQUFFO0lBQ3BELElBQUksRUFBQ0ksS0FBSyxLQUFMQSxJQUFBQSxJQUFBQSxLQUFLLGVBQUxBLEtBQUssQ0FBRXBCLE1BQU0sQ0FBRSxFQUFBO0VBQ2xCLElBQUEsT0FBTyxFQUFFLENBQUE7RUFDWCxHQUFBO0lBQ0EsSUFBTXFCLGtCQUFrQixHQUFHVixjQUFjLENBQUNTLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUosS0FBSyxDQUFDLENBQUE7RUFDMUQsRUFBQSxJQUFJSSxLQUFLLENBQUNwQixNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ3RCLElBQUEsT0FBT3FCLGtCQUFrQixDQUFBO0VBQzNCLEdBQUE7RUFDQSxFQUFBLElBQUlELEtBQUssQ0FBQ3BCLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdEIsSUFBTXNCLG1CQUFtQixHQUFHWCxjQUFjLENBQUNTLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUosS0FBSyxDQUFDLENBQUE7RUFDM0QsSUFBQSxPQUFBLEVBQUEsQ0FBQU4sTUFBQSxDQUFVVyxrQkFBa0IsRUFBQVgsSUFBQUEsQ0FBQUEsQ0FBQUEsTUFBQSxDQUFLWSxtQkFBbUIsQ0FBQSxDQUFBO0VBQ3RELEdBQUE7RUFFQSxFQUFBLElBQU1DLGVBQWUsR0FBR0gsS0FBSyxDQUFDcEIsTUFBTSxHQUFHLENBQUMsQ0FBQTtFQUN4QyxFQUFBLE9BQUEsRUFBQSxDQUFBVSxNQUFBLENBQVVXLGtCQUFrQixFQUFBWCxLQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQU1hLGVBQWUsRUFBQSxHQUFBLENBQUEsQ0FBQTtFQUNuRCxDQUFBOztFQUVBOztFQUVPLFNBQVNDLE9BQU9BLENBQUN0QixJQUFJLEVBQUF1QixLQUFBLEVBQXdDO0VBQUEsRUFBQSxJQUFBQyxVQUFBLEdBQUFELEtBQUEsQ0FBcENFLElBQUk7RUFBSkEsSUFBQUEsSUFBSSxHQUFBRCxVQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsQ0FBQyxHQUFBQSxVQUFBO01BQUFFLFlBQUEsR0FBQUgsS0FBQSxDQUFFSSxNQUFNO0VBQU5BLElBQUFBLE1BQU0sR0FBQUQsWUFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLENBQUMsR0FBQUEsWUFBQTtNQUFBRSxZQUFBLEdBQUFMLEtBQUEsQ0FBRU0sTUFBTTtFQUFOQSxJQUFBQSxNQUFNLEdBQUFELFlBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxDQUFDLEdBQUFBLFlBQUEsQ0FBQTtFQUM5RCxFQUFBLE9BQU9FLGlCQUFRLENBQUNDLHFCQUFVLENBQUNDLHFCQUFVLENBQUNoQyxJQUFJLEVBQUU2QixNQUFNLENBQUMsRUFBRUYsTUFBTSxDQUFDLEVBQUVGLElBQUksQ0FBQyxDQUFBO0VBQ3JFLENBQUE7RUFtQk8sU0FBU1EsT0FBT0EsQ0FBQ2pDLElBQUksRUFBRTNCLE1BQU0sRUFBRTtFQUNwQyxFQUFBLElBQUlnQyxTQUFTLEdBQ1ZoQyxNQUFNLElBQUlLLGVBQWUsQ0FBQ0wsTUFBTSxDQUFDLElBQ2pDTSxnQkFBZ0IsRUFBRSxJQUFJRCxlQUFlLENBQUNDLGdCQUFnQixFQUFFLENBQUUsQ0FBQTtFQUM3RCxFQUFBLE9BQU91RCxxQkFBVSxDQUFDbEMsSUFBSSxFQUFFSyxTQUFTLEdBQUc7RUFBRWhDLElBQUFBLE1BQU0sRUFBRWdDLFNBQUFBO0tBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQTtFQUNuRSxDQUFBO0VBRU8sU0FBUzhCLGdCQUFnQkEsQ0FBQ0MsR0FBRyxFQUFFL0QsTUFBTSxFQUFFO0VBQzVDLEVBQUEsT0FBT2dCLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxLQUFLLEVBQUUvRCxNQUFNLENBQUMsQ0FBQTtFQUN2QyxDQUFBOztFQUVBOztFQUVPLFNBQVNnRSxhQUFhQSxDQUFDckMsSUFBSSxFQUFFO0lBQ2xDLE9BQU9zQyxxQkFBVSxDQUFDdEMsSUFBSSxDQUFDLENBQUE7RUFDekIsQ0FBQTtFQUVPLFNBQVN1QyxjQUFjQSxDQUFDdkMsSUFBSSxFQUFFM0IsTUFBTSxFQUFFbUUsZ0JBQWdCLEVBQUU7RUFDN0QsRUFBQSxJQUFJbkMsU0FBUyxHQUFHaEMsTUFBTSxHQUNsQkssZUFBZSxDQUFDTCxNQUFNLENBQUMsR0FDdkJLLGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZDLE9BQU84RCx1QkFBVyxDQUFDekMsSUFBSSxFQUFFO0VBQ3ZCM0IsSUFBQUEsTUFBTSxFQUFFZ0MsU0FBUztFQUNqQnFDLElBQUFBLFlBQVksRUFBRUYsZ0JBQUFBO0VBQ2hCLEdBQUMsQ0FBQyxDQUFBO0VBQ0osQ0FBQTtFQUVPLFNBQVNHLGVBQWVBLENBQUMzQyxJQUFJLEVBQUU7SUFDcEMsT0FBTzRDLHlCQUFZLENBQUM1QyxJQUFJLENBQUMsQ0FBQTtFQUMzQixDQUFBO0VBRU8sU0FBUzZDLGNBQWNBLENBQUM3QyxJQUFJLEVBQUU7SUFDbkMsT0FBTzhDLHVCQUFXLENBQUM5QyxJQUFJLENBQUMsQ0FBQTtFQUMxQixDQUFBO0VBRU8sU0FBUytDLGlCQUFpQkEsQ0FBQy9DLElBQUksRUFBRTtJQUN0QyxPQUFPZ0QsNkJBQWMsQ0FBQ2hELElBQUksQ0FBQyxDQUFBO0VBQzdCLENBQUE7RUFFTyxTQUFTaUQsZUFBZUEsR0FBRztFQUNoQyxFQUFBLE9BQU9YLHFCQUFVLENBQUMzRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0VBQzlCLENBQUE7O0VBRUE7O0VBRU8sU0FBU3VGLFlBQVlBLENBQUNsRCxJQUFJLEVBQUU7SUFDakMsT0FBT21ELG1CQUFTLENBQUNuRCxJQUFJLENBQUMsQ0FBQTtFQUN4QixDQUFBO0VBNEJPLFNBQVNvRCxVQUFVQSxDQUFDQyxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUN2QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9DLHVCQUFZLENBQUNGLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDbkMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTRSxXQUFXQSxDQUFDSCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUN4QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9HLHlCQUFhLENBQUNKLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDcEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTSSxhQUFhQSxDQUFDTCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUMxQyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9LLDZCQUFlLENBQUNOLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDdEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTTSxTQUFTQSxDQUFDUCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUN0QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9PLHFCQUFXLENBQUNSLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDbEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTUSxPQUFPQSxDQUFDVCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUNwQyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9TLGlCQUFTLENBQUNWLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDaEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTVSxZQUFZQSxDQUFDNUIsR0FBRyxFQUFFeEIsU0FBUyxFQUFFQyxPQUFPLEVBQUU7RUFDcEQsRUFBQSxJQUFJb0QsS0FBSyxDQUFBO0VBQ1QsRUFBQSxJQUFNQyxLQUFLLEdBQUc1QixxQkFBVSxDQUFDMUIsU0FBUyxDQUFDLENBQUE7RUFDbkMsRUFBQSxJQUFNdUQsR0FBRyxHQUFHQyxpQkFBUSxDQUFDdkQsT0FBTyxDQUFDLENBQUE7SUFFN0IsSUFBSTtFQUNGb0QsSUFBQUEsS0FBSyxHQUFHSSxpQ0FBZ0IsQ0FBQ2pDLEdBQUcsRUFBRTtFQUFFOEIsTUFBQUEsS0FBSyxFQUFMQSxLQUFLO0VBQUVDLE1BQUFBLEdBQUcsRUFBSEEsR0FBQUE7RUFBSSxLQUFDLENBQUMsQ0FBQTtLQUM5QyxDQUFDLE9BQU9HLEdBQUcsRUFBRTtFQUNaTCxJQUFBQSxLQUFLLEdBQUcsS0FBSyxDQUFBO0VBQ2YsR0FBQTtFQUNBLEVBQUEsT0FBT0EsS0FBSyxDQUFBO0VBQ2QsQ0FBQTs7RUFRQTs7RUFFTyxTQUFTTSxjQUFjQSxDQUFDQyxVQUFVLEVBQUVDLFVBQVUsRUFBRTtJQUNyRCxJQUFNQyxLQUFLLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxHQUFHQyxVQUFVLENBQUE7RUFFakUsRUFBQSxJQUFJLENBQUNGLEtBQUssQ0FBQ0csY0FBYyxFQUFFO0VBQ3pCSCxJQUFBQSxLQUFLLENBQUNHLGNBQWMsR0FBRyxFQUFFLENBQUE7RUFDM0IsR0FBQTtFQUNBSCxFQUFBQSxLQUFLLENBQUNHLGNBQWMsQ0FBQ0wsVUFBVSxDQUFDLEdBQUdDLFVBQVUsQ0FBQTtFQUMvQyxDQUFBO0VBRU8sU0FBU0ssZ0JBQWdCQSxDQUFDTixVQUFVLEVBQUU7SUFDM0MsSUFBTUUsS0FBSyxHQUFHLE9BQU9DLE1BQU0sS0FBSyxXQUFXLEdBQUdBLE1BQU0sR0FBR0MsVUFBVSxDQUFBO0lBRWpFRixLQUFLLENBQUNLLFlBQVksR0FBR1AsVUFBVSxDQUFBO0VBQ2pDLENBQUE7RUFFTyxTQUFTN0YsZ0JBQWdCQSxHQUFHO0lBQ2pDLElBQU0rRixLQUFLLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxHQUFHQyxVQUFVLENBQUE7SUFFakUsT0FBT0YsS0FBSyxDQUFDSyxZQUFZLENBQUE7RUFDM0IsQ0FBQTtFQUVPLFNBQVNyRyxlQUFlQSxDQUFDc0csVUFBVSxFQUFFO0VBQzFDLEVBQUEsSUFBSSxPQUFPQSxVQUFVLEtBQUssUUFBUSxFQUFFO0VBQ2xDO01BQ0EsSUFBTU4sS0FBSyxHQUFHLE9BQU9DLE1BQU0sS0FBSyxXQUFXLEdBQUdBLE1BQU0sR0FBR0MsVUFBVSxDQUFBO01BQ2pFLE9BQU9GLEtBQUssQ0FBQ0csY0FBYyxHQUFHSCxLQUFLLENBQUNHLGNBQWMsQ0FBQ0csVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFBO0VBQ3ZFLEdBQUMsTUFBTTtFQUNMO0VBQ0EsSUFBQSxPQUFPQSxVQUFVLENBQUE7RUFDbkIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTQywyQkFBMkJBLENBQUNqRixJQUFJLEVBQUVrRixVQUFVLEVBQUU3RyxNQUFNLEVBQUU7SUFDcEUsT0FBTzZHLFVBQVUsQ0FBQzdGLFVBQVUsQ0FBQ1csSUFBSSxFQUFFLE1BQU0sRUFBRTNCLE1BQU0sQ0FBQyxDQUFDLENBQUE7RUFDckQsQ0FBQTtFQUVPLFNBQVM4RyxxQkFBcUJBLENBQUNuRixJQUFJLEVBQUUzQixNQUFNLEVBQUU7RUFDbEQsRUFBQSxPQUFPZ0IsVUFBVSxDQUFDVyxJQUFJLEVBQUUsUUFBUSxFQUFFM0IsTUFBTSxDQUFDLENBQUE7RUFDM0MsQ0FBQTtFQUVPLFNBQVMrRyx1QkFBdUJBLENBQUNwRixJQUFJLEVBQUUzQixNQUFNLEVBQUU7RUFDcEQsRUFBQSxPQUFPZ0IsVUFBVSxDQUFDVyxJQUFJLEVBQUUsS0FBSyxFQUFFM0IsTUFBTSxDQUFDLENBQUE7RUFDeEMsQ0FBQTtFQUVPLFNBQVNnSCxnQkFBZ0JBLENBQUNDLEtBQUssRUFBRWpILE1BQU0sRUFBRTtFQUM5QyxFQUFBLE9BQU9nQixVQUFVLENBQUNrRyxpQkFBUSxDQUFDNUgsT0FBTyxFQUFFLEVBQUUySCxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUVqSCxNQUFNLENBQUMsQ0FBQTtFQUMvRCxDQUFBO0VBRU8sU0FBU21ILHFCQUFxQkEsQ0FBQ0YsS0FBSyxFQUFFakgsTUFBTSxFQUFFO0VBQ25ELEVBQUEsT0FBT2dCLFVBQVUsQ0FBQ2tHLGlCQUFRLENBQUM1SCxPQUFPLEVBQUUsRUFBRTJILEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRWpILE1BQU0sQ0FBQyxDQUFBO0VBQzlELENBQUE7RUFFTyxTQUFTb0gsdUJBQXVCQSxDQUFDQyxPQUFPLEVBQUVySCxNQUFNLEVBQUU7RUFDdkQsRUFBQSxPQUFPZ0IsVUFBVSxDQUFDc0cscUJBQVUsQ0FBQ2hJLE9BQU8sRUFBRSxFQUFFK0gsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFckgsTUFBTSxDQUFDLENBQUE7RUFDbEUsQ0FBQTs7RUFFQTs7RUFFTyxTQUFTdUgsYUFBYUEsQ0FDM0J4RCxHQUFHLEVBVUg7RUFBQSxFQUFBLElBQUF5RCxLQUFBLEdBQUFDLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQURJLEVBQUU7TUFQSnZILE9BQU8sR0FBQXNILEtBQUEsQ0FBUHRILE9BQU87TUFDUHlILE9BQU8sR0FBQUgsS0FBQSxDQUFQRyxPQUFPO01BQ1BDLFlBQVksR0FBQUosS0FBQSxDQUFaSSxZQUFZO01BQ1pDLG9CQUFvQixHQUFBTCxLQUFBLENBQXBCSyxvQkFBb0I7TUFDcEJDLFlBQVksR0FBQU4sS0FBQSxDQUFaTSxZQUFZO01BQ1pDLG9CQUFvQixHQUFBUCxLQUFBLENBQXBCTyxvQkFBb0I7TUFDcEJDLFVBQVUsR0FBQVIsS0FBQSxDQUFWUSxVQUFVLENBQUE7SUFHWixPQUNFQyxhQUFhLENBQUNsRSxHQUFHLEVBQUU7RUFBRTdELElBQUFBLE9BQU8sRUFBUEEsT0FBTztFQUFFeUgsSUFBQUEsT0FBTyxFQUFQQSxPQUFBQTtLQUFTLENBQUMsSUFDdkNDLFlBQVksSUFDWEEsWUFBWSxDQUFDTSxJQUFJLENBQUMsVUFBQ0MsV0FBVyxFQUFBO0VBQUEsSUFBQSxPQUM1QjVDLFNBQVMsQ0FBQ3hCLEdBQUcsRUFBRW9FLFdBQVcsQ0FBQ3hHLElBQUksR0FBR3dHLFdBQVcsQ0FBQ3hHLElBQUksR0FBR3dHLFdBQVcsQ0FBQyxDQUFBO0tBQ25FLENBQUUsSUFDSE4sb0JBQW9CLElBQ25CQSxvQkFBb0IsQ0FBQ0ssSUFBSSxDQUFDLFVBQUFFLEtBQUEsRUFBQTtFQUFBLElBQUEsSUFBR3ZDLEtBQUssR0FBQXVDLEtBQUEsQ0FBTHZDLEtBQUs7UUFBRUMsR0FBRyxHQUFBc0MsS0FBQSxDQUFIdEMsR0FBRyxDQUFBO01BQUEsT0FDckNFLGlDQUFnQixDQUFDakMsR0FBRyxFQUFFO0VBQUU4QixNQUFBQSxLQUFLLEVBQUxBLEtBQUs7RUFBRUMsTUFBQUEsR0FBRyxFQUFIQSxHQUFBQTtFQUFJLEtBQUMsQ0FBQyxDQUFBO0tBQ3ZDLENBQUUsSUFDSGdDLFlBQVksSUFDWCxDQUFDQSxZQUFZLENBQUNJLElBQUksQ0FBQyxVQUFDRyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUs5QyxTQUFTLENBQUN4QixHQUFHLEVBQUVzRSxXQUFXLENBQUMsQ0FBQTtLQUFFLENBQUEsSUFDbEVOLG9CQUFvQixJQUNuQixDQUFDQSxvQkFBb0IsQ0FBQ0csSUFBSSxDQUFDLFVBQUFJLEtBQUEsRUFBQTtFQUFBLElBQUEsSUFBR3pDLEtBQUssR0FBQXlDLEtBQUEsQ0FBTHpDLEtBQUs7UUFBRUMsR0FBRyxHQUFBd0MsS0FBQSxDQUFIeEMsR0FBRyxDQUFBO01BQUEsT0FDdENFLGlDQUFnQixDQUFDakMsR0FBRyxFQUFFO0VBQUU4QixNQUFBQSxLQUFLLEVBQUxBLEtBQUs7RUFBRUMsTUFBQUEsR0FBRyxFQUFIQSxHQUFBQTtFQUFJLEtBQUMsQ0FBQyxDQUFBO0VBQUEsR0FDdkMsQ0FBRSxJQUNIa0MsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQzFJLE9BQU8sQ0FBQ3lFLEdBQUcsQ0FBQyxDQUFFLElBQ3pDLEtBQUssQ0FBQTtFQUVULENBQUE7RUFFTyxTQUFTd0UsYUFBYUEsQ0FDM0J4RSxHQUFHLEVBRUg7RUFBQSxFQUFBLElBQUF5RSxLQUFBLEdBQUFmLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUR5QyxFQUFFO01BQXpDRyxZQUFZLEdBQUFZLEtBQUEsQ0FBWlosWUFBWTtNQUFFQyxvQkFBb0IsR0FBQVcsS0FBQSxDQUFwQlgsb0JBQW9CLENBQUE7RUFFcEMsRUFBQSxJQUFJQSxvQkFBb0IsSUFBSUEsb0JBQW9CLENBQUNwRyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0VBQzNELElBQUEsT0FBT29HLG9CQUFvQixDQUFDSyxJQUFJLENBQUMsVUFBQU8sS0FBQSxFQUFBO0VBQUEsTUFBQSxJQUFHNUMsS0FBSyxHQUFBNEMsS0FBQSxDQUFMNUMsS0FBSztVQUFFQyxHQUFHLEdBQUEyQyxLQUFBLENBQUgzQyxHQUFHLENBQUE7UUFBQSxPQUM1Q0UsaUNBQWdCLENBQUNqQyxHQUFHLEVBQUU7RUFBRThCLFFBQUFBLEtBQUssRUFBTEEsS0FBSztFQUFFQyxRQUFBQSxHQUFHLEVBQUhBLEdBQUFBO0VBQUksT0FBQyxDQUFDLENBQUE7RUFBQSxLQUN2QyxDQUFDLENBQUE7RUFDSCxHQUFBO0VBQ0EsRUFBQSxPQUNHOEIsWUFBWSxJQUNYQSxZQUFZLENBQUNNLElBQUksQ0FBQyxVQUFDQyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQzVCNUMsU0FBUyxDQUFDeEIsR0FBRyxFQUFFb0UsV0FBVyxDQUFDeEcsSUFBSSxHQUFHd0csV0FBVyxDQUFDeEcsSUFBSSxHQUFHd0csV0FBVyxDQUFDLENBQUE7S0FDbkUsQ0FBQyxJQUNILEtBQUssQ0FBQTtFQUVULENBQUE7RUFFTyxTQUFTTyxlQUFlQSxDQUM3QnpCLEtBQUssRUFFTDtFQUFBLEVBQUEsSUFBQTBCLEtBQUEsR0FBQWxCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUQrRCxFQUFFO01BQS9EdkgsT0FBTyxHQUFBeUksS0FBQSxDQUFQekksT0FBTztNQUFFeUgsT0FBTyxHQUFBZ0IsS0FBQSxDQUFQaEIsT0FBTztNQUFFQyxZQUFZLEdBQUFlLEtBQUEsQ0FBWmYsWUFBWTtNQUFFRSxZQUFZLEdBQUFhLEtBQUEsQ0FBWmIsWUFBWTtNQUFFRSxVQUFVLEdBQUFXLEtBQUEsQ0FBVlgsVUFBVSxDQUFBO0lBRTFELE9BQ0VDLGFBQWEsQ0FBQ2hCLEtBQUssRUFBRTtFQUNuQi9HLElBQUFBLE9BQU8sRUFBRXFFLHlCQUFZLENBQUNyRSxPQUFPLENBQUM7TUFDOUJ5SCxPQUFPLEVBQUVpQixxQkFBVSxDQUFDakIsT0FBTyxDQUFBO0tBQzVCLENBQUMsSUFDREMsWUFBWSxJQUNYQSxZQUFZLENBQUNNLElBQUksQ0FBQyxVQUFDQyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUtoRCxXQUFXLENBQUM4QixLQUFLLEVBQUVrQixXQUFXLENBQUMsQ0FBQTtLQUFFLENBQUEsSUFDckVMLFlBQVksSUFDWCxDQUFDQSxZQUFZLENBQUNJLElBQUksQ0FBQyxVQUFDRyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUtsRCxXQUFXLENBQUM4QixLQUFLLEVBQUVvQixXQUFXLENBQUMsQ0FBQTtFQUFBLEdBQUEsQ0FBRSxJQUN0RUwsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQzFJLE9BQU8sQ0FBQzJILEtBQUssQ0FBQyxDQUFFLElBQzNDLEtBQUssQ0FBQTtFQUVULENBQUE7RUFFTyxTQUFTNEIsY0FBY0EsQ0FBQ3RHLFNBQVMsRUFBRUMsT0FBTyxFQUFFc0csQ0FBQyxFQUFFL0UsR0FBRyxFQUFFO0VBQ3pELEVBQUEsSUFBTWdGLGFBQWEsR0FBR0MsZUFBTyxDQUFDekcsU0FBUyxDQUFDLENBQUE7RUFDeEMsRUFBQSxJQUFNMEcsY0FBYyxHQUFHQyxpQkFBUSxDQUFDM0csU0FBUyxDQUFDLENBQUE7RUFDMUMsRUFBQSxJQUFNNEcsV0FBVyxHQUFHSCxlQUFPLENBQUN4RyxPQUFPLENBQUMsQ0FBQTtFQUNwQyxFQUFBLElBQU00RyxZQUFZLEdBQUdGLGlCQUFRLENBQUMxRyxPQUFPLENBQUMsQ0FBQTtFQUN0QyxFQUFBLElBQU02RyxPQUFPLEdBQUdMLGVBQU8sQ0FBQ2pGLEdBQUcsQ0FBQyxDQUFBO0VBQzVCLEVBQUEsSUFBSWdGLGFBQWEsS0FBS0ksV0FBVyxJQUFJSixhQUFhLEtBQUtNLE9BQU8sRUFBRTtFQUM5RCxJQUFBLE9BQU9KLGNBQWMsSUFBSUgsQ0FBQyxJQUFJQSxDQUFDLElBQUlNLFlBQVksQ0FBQTtFQUNqRCxHQUFDLE1BQU0sSUFBSUwsYUFBYSxHQUFHSSxXQUFXLEVBQUU7TUFDdEMsT0FDR0UsT0FBTyxLQUFLTixhQUFhLElBQUlFLGNBQWMsSUFBSUgsQ0FBQyxJQUNoRE8sT0FBTyxLQUFLRixXQUFXLElBQUlDLFlBQVksSUFBSU4sQ0FBRSxJQUM3Q08sT0FBTyxHQUFHRixXQUFXLElBQUlFLE9BQU8sR0FBR04sYUFBYyxDQUFBO0VBRXRELEdBQUE7RUFDRixDQUFBO0VBRU8sU0FBU08saUJBQWlCQSxDQUMvQmpDLE9BQU8sRUFFUDtFQUFBLEVBQUEsSUFBQWtDLEtBQUEsR0FBQTlCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUQrRCxFQUFFO01BQS9EdkgsT0FBTyxHQUFBcUosS0FBQSxDQUFQckosT0FBTztNQUFFeUgsT0FBTyxHQUFBNEIsS0FBQSxDQUFQNUIsT0FBTztNQUFFQyxZQUFZLEdBQUEyQixLQUFBLENBQVozQixZQUFZO01BQUVFLFlBQVksR0FBQXlCLEtBQUEsQ0FBWnpCLFlBQVk7TUFBRUUsVUFBVSxHQUFBdUIsS0FBQSxDQUFWdkIsVUFBVSxDQUFBO0lBRTFELE9BQ0VDLGFBQWEsQ0FBQ1osT0FBTyxFQUFFO0VBQUVuSCxJQUFBQSxPQUFPLEVBQVBBLE9BQU87RUFBRXlILElBQUFBLE9BQU8sRUFBUEEsT0FBQUE7S0FBUyxDQUFDLElBQzNDQyxZQUFZLElBQ1hBLFlBQVksQ0FBQ00sSUFBSSxDQUFDLFVBQUNDLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDNUI5QyxhQUFhLENBQUNnQyxPQUFPLEVBQUVjLFdBQVcsQ0FBQyxDQUFBO0tBQ3JDLENBQUUsSUFDSEwsWUFBWSxJQUNYLENBQUNBLFlBQVksQ0FBQ0ksSUFBSSxDQUFDLFVBQUNHLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDN0JoRCxhQUFhLENBQUNnQyxPQUFPLEVBQUVnQixXQUFXLENBQUMsQ0FBQTtFQUFBLEdBQ3JDLENBQUUsSUFDSEwsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQzFJLE9BQU8sQ0FBQytILE9BQU8sQ0FBQyxDQUFFLElBQzdDLEtBQUssQ0FBQTtFQUVULENBQUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ08sU0FBU21DLGFBQWFBLENBQUNDLElBQUksRUFBRTVELEtBQUssRUFBRUMsR0FBRyxFQUFFO0VBQzlDLEVBQUEsSUFBSSxDQUFDbEUsaUJBQVcsQ0FBQ2lFLEtBQUssQ0FBQyxJQUFJLENBQUNqRSxpQkFBVyxDQUFDa0UsR0FBRyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUE7RUFDMUQsRUFBQSxJQUFNNEQsU0FBUyxHQUFHVixlQUFPLENBQUNuRCxLQUFLLENBQUMsQ0FBQTtFQUNoQyxFQUFBLElBQU04RCxPQUFPLEdBQUdYLGVBQU8sQ0FBQ2xELEdBQUcsQ0FBQyxDQUFBO0VBRTVCLEVBQUEsT0FBTzRELFNBQVMsSUFBSUQsSUFBSSxJQUFJRSxPQUFPLElBQUlGLElBQUksQ0FBQTtFQUM3QyxDQUFBO0VBRU8sU0FBU0csY0FBY0EsQ0FDNUJILElBQUksRUFFSjtFQUFBLEVBQUEsSUFBQUksTUFBQSxHQUFBcEMsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRCtELEVBQUU7TUFBL0R2SCxPQUFPLEdBQUEySixNQUFBLENBQVAzSixPQUFPO01BQUV5SCxPQUFPLEdBQUFrQyxNQUFBLENBQVBsQyxPQUFPO01BQUVDLFlBQVksR0FBQWlDLE1BQUEsQ0FBWmpDLFlBQVk7TUFBRUUsWUFBWSxHQUFBK0IsTUFBQSxDQUFaL0IsWUFBWTtNQUFFRSxVQUFVLEdBQUE2QixNQUFBLENBQVY3QixVQUFVLENBQUE7SUFFMUQsSUFBTXJHLElBQUksR0FBRyxJQUFJL0IsSUFBSSxDQUFDNkosSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNqQyxPQUNFeEIsYUFBYSxDQUFDdEcsSUFBSSxFQUFFO0VBQ2xCekIsSUFBQUEsT0FBTyxFQUFFdUUsdUJBQVcsQ0FBQ3ZFLE9BQU8sQ0FBQztNQUM3QnlILE9BQU8sRUFBRW1DLG1CQUFTLENBQUNuQyxPQUFPLENBQUE7S0FDM0IsQ0FBQyxJQUNEQyxZQUFZLElBQ1hBLFlBQVksQ0FBQ00sSUFBSSxDQUFDLFVBQUNDLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FBS3BELFVBQVUsQ0FBQ3BELElBQUksRUFBRXdHLFdBQVcsQ0FBQyxDQUFBO0tBQUUsQ0FBQSxJQUNuRUwsWUFBWSxJQUNYLENBQUNBLFlBQVksQ0FBQ0ksSUFBSSxDQUFDLFVBQUNHLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FBS3RELFVBQVUsQ0FBQ3BELElBQUksRUFBRTBHLFdBQVcsQ0FBQyxDQUFBO0VBQUEsR0FBQSxDQUFFLElBQ3BFTCxVQUFVLElBQUksQ0FBQ0EsVUFBVSxDQUFDMUksT0FBTyxDQUFDcUMsSUFBSSxDQUFDLENBQUUsSUFDMUMsS0FBSyxDQUFBO0VBRVQsQ0FBQTtFQUVPLFNBQVNvSSxnQkFBZ0JBLENBQUN4SCxTQUFTLEVBQUVDLE9BQU8sRUFBRXdILENBQUMsRUFBRWpHLEdBQUcsRUFBRTtFQUMzRCxFQUFBLElBQU1nRixhQUFhLEdBQUdDLGVBQU8sQ0FBQ3pHLFNBQVMsQ0FBQyxDQUFBO0VBQ3hDLEVBQUEsSUFBTTBILGdCQUFnQixHQUFHQyxxQkFBVSxDQUFDM0gsU0FBUyxDQUFDLENBQUE7RUFDOUMsRUFBQSxJQUFNNEcsV0FBVyxHQUFHSCxlQUFPLENBQUN4RyxPQUFPLENBQUMsQ0FBQTtFQUNwQyxFQUFBLElBQU0ySCxjQUFjLEdBQUdELHFCQUFVLENBQUMxSCxPQUFPLENBQUMsQ0FBQTtFQUMxQyxFQUFBLElBQU02RyxPQUFPLEdBQUdMLGVBQU8sQ0FBQ2pGLEdBQUcsQ0FBQyxDQUFBO0VBQzVCLEVBQUEsSUFBSWdGLGFBQWEsS0FBS0ksV0FBVyxJQUFJSixhQUFhLEtBQUtNLE9BQU8sRUFBRTtFQUM5RCxJQUFBLE9BQU9ZLGdCQUFnQixJQUFJRCxDQUFDLElBQUlBLENBQUMsSUFBSUcsY0FBYyxDQUFBO0VBQ3JELEdBQUMsTUFBTSxJQUFJcEIsYUFBYSxHQUFHSSxXQUFXLEVBQUU7TUFDdEMsT0FDR0UsT0FBTyxLQUFLTixhQUFhLElBQUlrQixnQkFBZ0IsSUFBSUQsQ0FBQyxJQUNsRFgsT0FBTyxLQUFLRixXQUFXLElBQUlnQixjQUFjLElBQUlILENBQUUsSUFDL0NYLE9BQU8sR0FBR0YsV0FBVyxJQUFJRSxPQUFPLEdBQUdOLGFBQWMsQ0FBQTtFQUV0RCxHQUFBO0VBQ0YsQ0FBQTtFQUVPLFNBQVNkLGFBQWFBLENBQUNsRSxHQUFHLEVBQTZCO0VBQUEsRUFBQSxJQUFBcUcsTUFBQSxHQUFBM0MsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUosRUFBRTtNQUF2QnZILE9BQU8sR0FBQWtLLE1BQUEsQ0FBUGxLLE9BQU87TUFBRXlILE9BQU8sR0FBQXlDLE1BQUEsQ0FBUHpDLE9BQU8sQ0FBQTtJQUNuRCxPQUNHekgsT0FBTyxJQUFJbUssaURBQXdCLENBQUN0RyxHQUFHLEVBQUU3RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQ3JEeUgsT0FBTyxJQUFJMEMsaURBQXdCLENBQUN0RyxHQUFHLEVBQUU0RCxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUE7RUFFM0QsQ0FBQTtFQUVPLFNBQVMyQyxZQUFZQSxDQUFDQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtFQUN4QyxFQUFBLE9BQU9BLEtBQUssQ0FBQ3RDLElBQUksQ0FDZixVQUFDdUMsUUFBUSxFQUFBO0VBQUEsSUFBQSxPQUNQQyxpQkFBUSxDQUFDRCxRQUFRLENBQUMsS0FBS0MsaUJBQVEsQ0FBQ0gsSUFBSSxDQUFDLElBQ3JDSSxxQkFBVSxDQUFDRixRQUFRLENBQUMsS0FBS0UscUJBQVUsQ0FBQ0osSUFBSSxDQUFDLElBQ3pDSyxxQkFBVSxDQUFDSCxRQUFRLENBQUMsS0FBS0cscUJBQVUsQ0FBQ0wsSUFBSSxDQUFDLENBQUE7RUFBQSxHQUM3QyxDQUFDLENBQUE7RUFDSCxDQUFBO0VBRU8sU0FBU00sY0FBY0EsQ0FDNUJOLElBQUksRUFFSjtFQUFBLEVBQUEsSUFBQU8sTUFBQSxHQUFBckQsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRDZDLEVBQUU7TUFBN0NzRCxZQUFZLEdBQUFELE1BQUEsQ0FBWkMsWUFBWTtNQUFFQyxZQUFZLEdBQUFGLE1BQUEsQ0FBWkUsWUFBWTtNQUFFQyxVQUFVLEdBQUFILE1BQUEsQ0FBVkcsVUFBVSxDQUFBO0lBRXhDLE9BQ0dGLFlBQVksSUFBSVQsWUFBWSxDQUFDQyxJQUFJLEVBQUVRLFlBQVksQ0FBQyxJQUNoREMsWUFBWSxJQUFJLENBQUNWLFlBQVksQ0FBQ0MsSUFBSSxFQUFFUyxZQUFZLENBQUUsSUFDbERDLFVBQVUsSUFBSSxDQUFDQSxVQUFVLENBQUNWLElBQUksQ0FBRSxJQUNqQyxLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU1cscUJBQXFCQSxDQUFDWCxJQUFJLEVBQUFZLE1BQUEsRUFBd0I7RUFBQSxFQUFBLElBQXBCQyxPQUFPLEdBQUFELE1BQUEsQ0FBUEMsT0FBTztNQUFFQyxPQUFPLEdBQUFGLE1BQUEsQ0FBUEUsT0FBTyxDQUFBO0VBQzVELEVBQUEsSUFBSSxDQUFDRCxPQUFPLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQ3hCLElBQUEsTUFBTSxJQUFJQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQTtFQUM1RCxHQUFBO0VBQ0EsRUFBQSxJQUFJQyxRQUFRLEdBQUdqTSxPQUFPLEVBQUUsQ0FBQTtJQUN4QmlNLFFBQVEsR0FBRzlILGlCQUFRLENBQUM4SCxRQUFRLEVBQUViLGlCQUFRLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUE7SUFDN0NnQixRQUFRLEdBQUc3SCxxQkFBVSxDQUFDNkgsUUFBUSxFQUFFWixxQkFBVSxDQUFDSixJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ2pEZ0IsUUFBUSxHQUFHNUgscUJBQVUsQ0FBQzRILFFBQVEsRUFBRVgscUJBQVUsQ0FBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQTtFQUVqRCxFQUFBLElBQUlpQixHQUFHLEdBQUdsTSxPQUFPLEVBQUUsQ0FBQTtJQUNuQmtNLEdBQUcsR0FBRy9ILGlCQUFRLENBQUMrSCxHQUFHLEVBQUVkLGlCQUFRLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDdENJLEdBQUcsR0FBRzlILHFCQUFVLENBQUM4SCxHQUFHLEVBQUViLHFCQUFVLENBQUNTLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDMUNJLEdBQUcsR0FBRzdILHFCQUFVLENBQUM2SCxHQUFHLEVBQUVaLHFCQUFVLENBQUNRLE9BQU8sQ0FBQyxDQUFDLENBQUE7RUFFMUMsRUFBQSxJQUFJSyxHQUFHLEdBQUduTSxPQUFPLEVBQUUsQ0FBQTtJQUNuQm1NLEdBQUcsR0FBR2hJLGlCQUFRLENBQUNnSSxHQUFHLEVBQUVmLGlCQUFRLENBQUNXLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDdENJLEdBQUcsR0FBRy9ILHFCQUFVLENBQUMrSCxHQUFHLEVBQUVkLHFCQUFVLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDMUNJLEdBQUcsR0FBRzlILHFCQUFVLENBQUM4SCxHQUFHLEVBQUViLHFCQUFVLENBQUNTLE9BQU8sQ0FBQyxDQUFDLENBQUE7RUFFMUMsRUFBQSxJQUFJekYsS0FBSyxDQUFBO0lBQ1QsSUFBSTtFQUNGQSxJQUFBQSxLQUFLLEdBQUcsQ0FBQ0ksaUNBQWdCLENBQUN1RixRQUFRLEVBQUU7RUFBRTFGLE1BQUFBLEtBQUssRUFBRTJGLEdBQUc7RUFBRTFGLE1BQUFBLEdBQUcsRUFBRTJGLEdBQUFBO0VBQUksS0FBQyxDQUFDLENBQUE7S0FDOUQsQ0FBQyxPQUFPeEYsR0FBRyxFQUFFO0VBQ1pMLElBQUFBLEtBQUssR0FBRyxLQUFLLENBQUE7RUFDZixHQUFBO0VBQ0EsRUFBQSxPQUFPQSxLQUFLLENBQUE7RUFDZCxDQUFBO0VBRU8sU0FBUzhGLG1CQUFtQkEsQ0FBQzNILEdBQUcsRUFBa0M7RUFBQSxFQUFBLElBQUE0SCxNQUFBLEdBQUFsRSxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO01BQTVCdkgsT0FBTyxHQUFBeUwsTUFBQSxDQUFQekwsT0FBTztNQUFFNEgsWUFBWSxHQUFBNkQsTUFBQSxDQUFaN0QsWUFBWSxDQUFBO0VBQzlELEVBQUEsSUFBTThELGFBQWEsR0FBR0MsbUJBQVMsQ0FBQzlILEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUN2QyxFQUFBLE9BQ0c3RCxPQUFPLElBQUk0TCxxREFBMEIsQ0FBQzVMLE9BQU8sRUFBRTBMLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFDakU5RCxZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDVnlELHFEQUEwQixDQUFDekQsV0FBVyxFQUFFdUQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzlELENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU0ksa0JBQWtCQSxDQUFDakksR0FBRyxFQUFrQztFQUFBLEVBQUEsSUFBQWtJLE1BQUEsR0FBQXhFLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7TUFBNUJFLE9BQU8sR0FBQXNFLE1BQUEsQ0FBUHRFLE9BQU87TUFBRUcsWUFBWSxHQUFBbUUsTUFBQSxDQUFabkUsWUFBWSxDQUFBO0VBQzdELEVBQUEsSUFBTW9FLFNBQVMsR0FBR0MsbUJBQVMsQ0FBQ3BJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNuQyxFQUFBLE9BQ0c0RCxPQUFPLElBQUltRSxxREFBMEIsQ0FBQ0ksU0FBUyxFQUFFdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUM3REcsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUt5RCxxREFBMEIsQ0FBQ0ksU0FBUyxFQUFFN0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3pFLENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBUytELHFCQUFxQkEsQ0FBQ3pLLElBQUksRUFBa0M7RUFBQSxFQUFBLElBQUEwSyxNQUFBLEdBQUE1RSxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO01BQTVCdkgsT0FBTyxHQUFBbU0sTUFBQSxDQUFQbk0sT0FBTztNQUFFNEgsWUFBWSxHQUFBdUUsTUFBQSxDQUFadkUsWUFBWSxDQUFBO0VBQ2pFLEVBQUEsSUFBTXdFLGVBQWUsR0FBRzdILHVCQUFXLENBQUM5QyxJQUFJLENBQUMsQ0FBQTtFQUN6QyxFQUFBLElBQU00SyxlQUFlLEdBQUdDLHVCQUFXLENBQUNGLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUV2RCxFQUFBLE9BQ0dwTSxPQUFPLElBQUl1TSx5REFBNEIsQ0FBQ3ZNLE9BQU8sRUFBRXFNLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFDckV6RSxZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDVm9FLHlEQUE0QixDQUFDcEUsV0FBVyxFQUFFa0UsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2xFLENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU0csb0JBQW9CQSxDQUFDL0ssSUFBSSxFQUFrQztFQUFBLEVBQUEsSUFBQWdMLE1BQUEsR0FBQWxGLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7TUFBNUJFLE9BQU8sR0FBQWdGLE1BQUEsQ0FBUGhGLE9BQU87TUFBRUcsWUFBWSxHQUFBNkUsTUFBQSxDQUFaN0UsWUFBWSxDQUFBO0VBQ2hFLEVBQUEsSUFBTThFLGNBQWMsR0FBRzlDLG1CQUFTLENBQUNuSSxJQUFJLENBQUMsQ0FBQTtFQUN0QyxFQUFBLElBQU1rTCxXQUFXLEdBQUdDLHVCQUFXLENBQUNGLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUVsRCxFQUFBLE9BQ0dqRixPQUFPLElBQUk4RSx5REFBNEIsQ0FBQ0ksV0FBVyxFQUFFbEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUNqRUcsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQ1ZvRSx5REFBNEIsQ0FBQ0ksV0FBVyxFQUFFeEUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzlELENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBUzBFLGtCQUFrQkEsQ0FBQ2hKLEdBQUcsRUFBa0M7RUFBQSxFQUFBLElBQUFpSixNQUFBLEdBQUF2RixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO01BQTVCdkgsT0FBTyxHQUFBOE0sTUFBQSxDQUFQOU0sT0FBTztNQUFFNEgsWUFBWSxHQUFBa0YsTUFBQSxDQUFabEYsWUFBWSxDQUFBO0VBQzdELEVBQUEsSUFBTW1GLFlBQVksR0FBR0MsaUJBQVEsQ0FBQ25KLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNyQyxFQUFBLE9BQ0c3RCxPQUFPLElBQUlpTixtREFBeUIsQ0FBQ2pOLE9BQU8sRUFBRStNLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFDL0RuRixZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDVjhFLG1EQUF5QixDQUFDOUUsV0FBVyxFQUFFNEUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzVELENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU0csbUJBQW1CQSxDQUNqQ3JKLEdBQUcsRUFFSDtFQUFBLEVBQUEsSUFBQXNKLE1BQUEsR0FBQTVGLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUR5RCxFQUFFO01BQXpEdkgsT0FBTyxHQUFBbU4sTUFBQSxDQUFQbk4sT0FBTztNQUFBb04scUJBQUEsR0FBQUQsTUFBQSxDQUFFRSxjQUFjO0VBQWRBLElBQUFBLGNBQWMsR0FBQUQscUJBQUEsS0FBR2xPLEtBQUFBLENBQUFBLEdBQUFBLHdCQUF3QixHQUFBa08scUJBQUEsQ0FBQTtJQUVwRCxJQUFNTCxZQUFZLEdBQUd6SSxjQUFjLENBQUMwSSxpQkFBUSxDQUFDbkosR0FBRyxFQUFFd0osY0FBYyxDQUFDLENBQUMsQ0FBQTtFQUNsRSxFQUFBLElBQUFDLGVBQUEsR0FBc0JDLGNBQWMsQ0FBQ1IsWUFBWSxFQUFFTSxjQUFjLENBQUM7TUFBMURHLFNBQVMsR0FBQUYsZUFBQSxDQUFURSxTQUFTLENBQUE7RUFDakIsRUFBQSxJQUFNQyxXQUFXLEdBQUd6TixPQUFPLElBQUk4SSxlQUFPLENBQUM5SSxPQUFPLENBQUMsQ0FBQTtFQUMvQyxFQUFBLE9BQVF5TixXQUFXLElBQUlBLFdBQVcsR0FBR0QsU0FBUyxJQUFLLEtBQUssQ0FBQTtFQUMxRCxDQUFBO0VBRU8sU0FBU0UsaUJBQWlCQSxDQUFDN0osR0FBRyxFQUFrQztFQUFBLEVBQUEsSUFBQThKLE1BQUEsR0FBQXBHLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7TUFBNUJFLE9BQU8sR0FBQWtHLE1BQUEsQ0FBUGxHLE9BQU87TUFBRUcsWUFBWSxHQUFBK0YsTUFBQSxDQUFaL0YsWUFBWSxDQUFBO0VBQzVELEVBQUEsSUFBTWdHLFFBQVEsR0FBR0MsaUJBQVEsQ0FBQ2hLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNqQyxFQUFBLE9BQ0c0RCxPQUFPLElBQUl3RixtREFBeUIsQ0FBQ1csUUFBUSxFQUFFbkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUMzREcsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUs4RSxtREFBeUIsQ0FBQ1csUUFBUSxFQUFFekYsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3ZFLENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBUzJGLGtCQUFrQkEsQ0FDaENqSyxHQUFHLEVBRUg7RUFBQSxFQUFBLElBQUFrSyxNQUFBLEdBQUF4RyxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FEeUQsRUFBRTtNQUF6REUsT0FBTyxHQUFBc0csTUFBQSxDQUFQdEcsT0FBTztNQUFBdUcscUJBQUEsR0FBQUQsTUFBQSxDQUFFVixjQUFjO0VBQWRBLElBQUFBLGNBQWMsR0FBQVcscUJBQUEsS0FBRzlPLEtBQUFBLENBQUFBLEdBQUFBLHdCQUF3QixHQUFBOE8scUJBQUEsQ0FBQTtFQUVwRCxFQUFBLElBQU1KLFFBQVEsR0FBR0MsaUJBQVEsQ0FBQ2hLLEdBQUcsRUFBRXdKLGNBQWMsQ0FBQyxDQUFBO0VBQzlDLEVBQUEsSUFBQVksZ0JBQUEsR0FBd0JWLGNBQWMsQ0FBQ0ssUUFBUSxFQUFFUCxjQUFjLENBQUM7TUFBeERhLFdBQVcsR0FBQUQsZ0JBQUEsQ0FBWEMsV0FBVyxDQUFBO0VBQ25CLEVBQUEsSUFBTUMsV0FBVyxHQUFHMUcsT0FBTyxJQUFJcUIsZUFBTyxDQUFDckIsT0FBTyxDQUFDLENBQUE7RUFDL0MsRUFBQSxPQUFRMEcsV0FBVyxJQUFJQSxXQUFXLEdBQUdELFdBQVcsSUFBSyxLQUFLLENBQUE7RUFDNUQsQ0FBQTtFQUVPLFNBQVNFLG1CQUFtQkEsQ0FBQUMsTUFBQSxFQUE0QjtFQUFBLEVBQUEsSUFBekJyTyxPQUFPLEdBQUFxTyxNQUFBLENBQVByTyxPQUFPO01BQUU0SCxZQUFZLEdBQUF5RyxNQUFBLENBQVp6RyxZQUFZLENBQUE7SUFDekQsSUFBSUEsWUFBWSxJQUFJNUgsT0FBTyxFQUFFO0VBQzNCLElBQUEsSUFBSXNPLFFBQVEsR0FBRzFHLFlBQVksQ0FBQzJHLE1BQU0sQ0FDaEMsVUFBQ3BHLFdBQVcsRUFBQTtFQUFBLE1BQUEsT0FBS2dDLGlEQUF3QixDQUFDaEMsV0FBVyxFQUFFbkksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQUEsS0FDdEUsQ0FBQyxDQUFBO01BQ0QsT0FBT3NMLE9BQUcsQ0FBQ2dELFFBQVEsQ0FBQyxDQUFBO0tBQ3JCLE1BQU0sSUFBSTFHLFlBQVksRUFBRTtNQUN2QixPQUFPMEQsT0FBRyxDQUFDMUQsWUFBWSxDQUFDLENBQUE7RUFDMUIsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPNUgsT0FBTyxDQUFBO0VBQ2hCLEdBQUE7RUFDRixDQUFBO0VBRU8sU0FBU3dPLG1CQUFtQkEsQ0FBQUMsTUFBQSxFQUE0QjtFQUFBLEVBQUEsSUFBekJoSCxPQUFPLEdBQUFnSCxNQUFBLENBQVBoSCxPQUFPO01BQUVHLFlBQVksR0FBQTZHLE1BQUEsQ0FBWjdHLFlBQVksQ0FBQTtJQUN6RCxJQUFJQSxZQUFZLElBQUlILE9BQU8sRUFBRTtFQUMzQixJQUFBLElBQUlpSCxRQUFRLEdBQUc5RyxZQUFZLENBQUMyRyxNQUFNLENBQ2hDLFVBQUNwRyxXQUFXLEVBQUE7RUFBQSxNQUFBLE9BQUtnQyxpREFBd0IsQ0FBQ2hDLFdBQVcsRUFBRVYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQUEsS0FDdEUsQ0FBQyxDQUFBO01BQ0QsT0FBTzhELE9BQUcsQ0FBQ21ELFFBQVEsQ0FBQyxDQUFBO0tBQ3JCLE1BQU0sSUFBSTlHLFlBQVksRUFBRTtNQUN2QixPQUFPMkQsT0FBRyxDQUFDM0QsWUFBWSxDQUFDLENBQUE7RUFDMUIsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPSCxPQUFPLENBQUE7RUFDaEIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTa0gsb0JBQW9CQSxHQUdsQztFQUFBLEVBQUEsSUFGQUMsY0FBYyxHQUFBckgsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO0VBQUEsRUFBQSxJQUNuQnNILGdCQUFnQixHQUFBdEgsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsb0NBQW9DLENBQUE7RUFFdkQsRUFBQSxJQUFNdUgsV0FBVyxHQUFHLElBQUlDLEdBQUcsRUFBRSxDQUFBO0VBQzdCLEVBQUEsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQyxHQUFHLEdBQUdMLGNBQWMsQ0FBQ3JOLE1BQU0sRUFBRXlOLENBQUMsR0FBR0MsR0FBRyxFQUFFRCxDQUFDLEVBQUUsRUFBRTtFQUN6RCxJQUFBLElBQU1FLEdBQUcsR0FBR04sY0FBYyxDQUFDSSxDQUFDLENBQUMsQ0FBQTtFQUM3QixJQUFBLElBQUlHLGFBQU0sQ0FBQ0QsR0FBRyxDQUFDLEVBQUU7RUFDZixNQUFBLElBQU1FLEdBQUcsR0FBR3RPLFVBQVUsQ0FBQ29PLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUN6QyxJQUFNRyxhQUFhLEdBQUdQLFdBQVcsQ0FBQ1EsR0FBRyxDQUFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7RUFDaEQsTUFBQSxJQUFJLENBQUNDLGFBQWEsQ0FBQ0UsUUFBUSxDQUFDVixnQkFBZ0IsQ0FBQyxFQUFFO0VBQzdDUSxRQUFBQSxhQUFhLENBQUNHLElBQUksQ0FBQ1gsZ0JBQWdCLENBQUMsQ0FBQTtFQUNwQ0MsUUFBQUEsV0FBVyxDQUFDVyxHQUFHLENBQUNMLEdBQUcsRUFBRUMsYUFBYSxDQUFDLENBQUE7RUFDckMsT0FBQTtFQUNGLEtBQUMsTUFBTSxJQUFJSyxPQUFBLENBQU9SLEdBQUcsQ0FBQSxLQUFLLFFBQVEsRUFBRTtFQUNsQyxNQUFBLElBQU1TLElBQUksR0FBR0MsTUFBTSxDQUFDRCxJQUFJLENBQUNULEdBQUcsQ0FBQyxDQUFBO0VBQzdCLE1BQUEsSUFBTVcsU0FBUyxHQUFHRixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekIsSUFBTUcsVUFBVSxHQUFHWixHQUFHLENBQUNTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksT0FBT0UsU0FBUyxLQUFLLFFBQVEsSUFBSUMsVUFBVSxDQUFDQyxXQUFXLEtBQUt6UCxLQUFLLEVBQUU7RUFDckUsUUFBQSxLQUFLLElBQUkwUCxDQUFDLEdBQUcsQ0FBQyxFQUFFZixJQUFHLEdBQUdhLFVBQVUsQ0FBQ3ZPLE1BQU0sRUFBRXlPLENBQUMsR0FBR2YsSUFBRyxFQUFFZSxDQUFDLEVBQUUsRUFBRTtZQUNyRCxJQUFNWixJQUFHLEdBQUd0TyxVQUFVLENBQUNnUCxVQUFVLENBQUNFLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFBO1lBQ25ELElBQU1YLGNBQWEsR0FBR1AsV0FBVyxDQUFDUSxHQUFHLENBQUNGLElBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtFQUNoRCxVQUFBLElBQUksQ0FBQ0MsY0FBYSxDQUFDRSxRQUFRLENBQUNNLFNBQVMsQ0FBQyxFQUFFO0VBQ3RDUixZQUFBQSxjQUFhLENBQUNHLElBQUksQ0FBQ0ssU0FBUyxDQUFDLENBQUE7RUFDN0JmLFlBQUFBLFdBQVcsQ0FBQ1csR0FBRyxDQUFDTCxJQUFHLEVBQUVDLGNBQWEsQ0FBQyxDQUFBO0VBQ3JDLFdBQUE7RUFDRixTQUFBO0VBQ0YsT0FBQTtFQUNGLEtBQUE7RUFDRixHQUFBO0VBQ0EsRUFBQSxPQUFPUCxXQUFXLENBQUE7RUFDcEIsQ0FBQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTbUIsY0FBY0EsQ0FBQ0MsTUFBTSxFQUFFQyxNQUFNLEVBQUU7RUFDN0MsRUFBQSxJQUFJRCxNQUFNLENBQUMzTyxNQUFNLEtBQUs0TyxNQUFNLENBQUM1TyxNQUFNLEVBQUU7RUFDbkMsSUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLEdBQUE7RUFFQSxFQUFBLE9BQU8yTyxNQUFNLENBQUNyRSxLQUFLLENBQUMsVUFBQ3hNLEtBQUssRUFBRStRLEtBQUssRUFBQTtFQUFBLElBQUEsT0FBSy9RLEtBQUssS0FBSzhRLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDLENBQUE7S0FBQyxDQUFBLENBQUE7RUFDaEUsQ0FBQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTQyxjQUFjQSxHQUc1QjtFQUFBLEVBQUEsSUFGQUMsWUFBWSxHQUFBL0ksU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO0VBQUEsRUFBQSxJQUNqQnNILGdCQUFnQixHQUFBdEgsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsaUNBQWlDLENBQUE7RUFFcEQsRUFBQSxJQUFNdUgsV0FBVyxHQUFHLElBQUlDLEdBQUcsRUFBRSxDQUFBO0VBQzdCdUIsRUFBQUEsWUFBWSxDQUFDOVAsT0FBTyxDQUFDLFVBQUMrUCxPQUFPLEVBQUs7RUFDaEMsSUFBQSxJQUFjQyxPQUFPLEdBQWtCRCxPQUFPLENBQXRDOU8sSUFBSTtRQUFXZ1AsV0FBVyxHQUFLRixPQUFPLENBQXZCRSxXQUFXLENBQUE7RUFDbEMsSUFBQSxJQUFJLENBQUN0QixhQUFNLENBQUNxQixPQUFPLENBQUMsRUFBRTtFQUNwQixNQUFBLE9BQUE7RUFDRixLQUFBO0VBRUEsSUFBQSxJQUFNcEIsR0FBRyxHQUFHdE8sVUFBVSxDQUFDMFAsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO01BQzdDLElBQU1FLGFBQWEsR0FBRzVCLFdBQVcsQ0FBQ1EsR0FBRyxDQUFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7TUFDaEQsSUFDRSxXQUFXLElBQUlzQixhQUFhLElBQzVCQSxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUs3QixnQkFBZ0IsSUFDL0NvQixjQUFjLENBQUNTLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDRCxXQUFXLENBQUMsQ0FBQyxFQUM1RDtFQUNBLE1BQUEsT0FBQTtFQUNGLEtBQUE7RUFFQUMsSUFBQUEsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHN0IsZ0JBQWdCLENBQUE7RUFDN0MsSUFBQSxJQUFNOEIsY0FBYyxHQUFHRCxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7RUFDcERBLElBQUFBLGFBQWEsQ0FBQyxjQUFjLENBQUMsR0FBR0MsY0FBYyxNQUFBMU8sTUFBQSxDQUFBMk8sa0JBQUEsQ0FDdENELGNBQWMsQ0FBRUYsRUFBQUEsQ0FBQUEsV0FBVyxDQUMvQixDQUFBLEdBQUEsQ0FBQ0EsV0FBVyxDQUFDLENBQUE7RUFDakIzQixJQUFBQSxXQUFXLENBQUNXLEdBQUcsQ0FBQ0wsR0FBRyxFQUFFc0IsYUFBYSxDQUFDLENBQUE7RUFDckMsR0FBQyxDQUFDLENBQUE7RUFDRixFQUFBLE9BQU81QixXQUFXLENBQUE7RUFDcEIsQ0FBQTtFQUVPLFNBQVMrQixrQkFBa0JBLENBQ2hDOU0sVUFBVSxFQUNWK00sV0FBVyxFQUNYQyxpQkFBaUIsRUFDakJDLFNBQVMsRUFDVEMsYUFBYSxFQUNiO0VBQ0EsRUFBQSxJQUFNQyxDQUFDLEdBQUdELGFBQWEsQ0FBQzFQLE1BQU0sQ0FBQTtJQUM5QixJQUFNK0ksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixLQUFLLElBQUkwRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdrQyxDQUFDLEVBQUVsQyxDQUFDLEVBQUUsRUFBRTtNQUMxQixJQUFJbUMsWUFBWSxHQUFHcE4sVUFBVSxDQUFBO0VBQzdCb04sSUFBQUEsWUFBWSxHQUFHQyxpQkFBUSxDQUFDRCxZQUFZLEVBQUUzRyxpQkFBUSxDQUFDeUcsYUFBYSxDQUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ2pFbUMsSUFBQUEsWUFBWSxHQUFHRSxxQkFBVSxDQUFDRixZQUFZLEVBQUUxRyxxQkFBVSxDQUFDd0csYUFBYSxDQUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3JFbUMsSUFBQUEsWUFBWSxHQUFHRyxrQkFBVSxDQUFDSCxZQUFZLEVBQUV6RyxxQkFBVSxDQUFDdUcsYUFBYSxDQUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBRXJFLElBQUEsSUFBTXVDLFFBQVEsR0FBR0YscUJBQVUsQ0FDekJ0TixVQUFVLEVBQ1YsQ0FBQ2dOLGlCQUFpQixHQUFHLENBQUMsSUFBSUMsU0FDNUIsQ0FBQyxDQUFBO0VBRUQsSUFBQSxJQUNFUSxlQUFPLENBQUNMLFlBQVksRUFBRUwsV0FBVyxDQUFDLElBQ2xDblAsaUJBQVEsQ0FBQ3dQLFlBQVksRUFBRUksUUFBUSxDQUFDLEVBQ2hDO0VBQ0FqSCxNQUFBQSxLQUFLLENBQUNrRixJQUFJLENBQUN5QixhQUFhLENBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQzlCLEtBQUE7RUFDRixHQUFBO0VBRUEsRUFBQSxPQUFPMUUsS0FBSyxDQUFBO0VBQ2QsQ0FBQTtFQUVPLFNBQVNtSCxPQUFPQSxDQUFDekMsQ0FBQyxFQUFFO0lBQ3pCLE9BQU9BLENBQUMsR0FBRyxFQUFFLEdBQUEvTSxHQUFBQSxDQUFBQSxNQUFBLENBQU8rTSxDQUFDLENBQUEvTSxHQUFBQSxFQUFBQSxDQUFBQSxNQUFBLENBQVErTSxDQUFDLENBQUUsQ0FBQTtFQUNsQyxDQUFBO0VBRU8sU0FBU3pCLGNBQWNBLENBQzVCOUwsSUFBSSxFQUVKO0VBQUEsRUFBQSxJQURBNEwsY0FBYyxHQUFBOUYsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUdySSx3QkFBd0IsQ0FBQTtFQUV6QyxFQUFBLElBQU1zTyxTQUFTLEdBQUdrRSxJQUFJLENBQUNDLElBQUksQ0FBQzdJLGVBQU8sQ0FBQ3JILElBQUksQ0FBQyxHQUFHNEwsY0FBYyxDQUFDLEdBQUdBLGNBQWMsQ0FBQTtFQUM1RSxFQUFBLElBQU1hLFdBQVcsR0FBR1YsU0FBUyxJQUFJSCxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEQsT0FBTztFQUFFYSxJQUFBQSxXQUFXLEVBQVhBLFdBQVc7RUFBRVYsSUFBQUEsU0FBUyxFQUFUQSxTQUFBQTtLQUFXLENBQUE7RUFDbkMsQ0FBQTtFQUVPLFNBQVNvRSxhQUFhQSxDQUFDdFMsQ0FBQyxFQUFFO0lBQy9CLElBQU15RSxVQUFVLEdBQUcsSUFBSXJFLElBQUksQ0FBQ0osQ0FBQyxDQUFDdVMsV0FBVyxFQUFFLEVBQUV2UyxDQUFDLENBQUMwSixRQUFRLEVBQUUsRUFBRTFKLENBQUMsQ0FBQ3dTLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDdkUsSUFBTUMsaUJBQWlCLEdBQUcsSUFBSXJTLElBQUksQ0FDaENKLENBQUMsQ0FBQ3VTLFdBQVcsRUFBRSxFQUNmdlMsQ0FBQyxDQUFDMEosUUFBUSxFQUFFLEVBQ1oxSixDQUFDLENBQUN3UyxPQUFPLEVBQUUsRUFDWCxFQUNGLENBQUMsQ0FBQTtFQUVELEVBQUEsT0FBT0osSUFBSSxDQUFDTSxLQUFLLENBQUMsQ0FBQyxDQUFDRCxpQkFBaUIsR0FBRyxDQUFDaE8sVUFBVSxJQUFJLE9BQVMsQ0FBQyxDQUFBO0VBQ25FLENBQUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ08sU0FBU2tPLGFBQWFBLENBQUMzUyxDQUFDLEVBQUU7RUFDL0IsRUFBQSxJQUFNNFMsT0FBTyxHQUFHNVMsQ0FBQyxDQUFDb0wsVUFBVSxFQUFFLENBQUE7RUFDOUIsRUFBQSxJQUFNeUgsWUFBWSxHQUFHN1MsQ0FBQyxDQUFDOFMsZUFBZSxFQUFFLENBQUE7RUFFeEMsRUFBQSxPQUFPM1MsYUFBTSxDQUFDSCxDQUFDLENBQUMrUyxPQUFPLEVBQUUsR0FBR0gsT0FBTyxHQUFHLElBQUksR0FBR0MsWUFBWSxDQUFDLENBQUE7RUFDNUQsQ0FBQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTRyxZQUFZQSxDQUFDQyxFQUFFLEVBQUVDLEVBQUUsRUFBRTtFQUNuQyxFQUFBLE9BQU9QLGFBQWEsQ0FBQ00sRUFBRSxDQUFDLENBQUNGLE9BQU8sRUFBRSxLQUFLSixhQUFhLENBQUNPLEVBQUUsQ0FBQyxDQUFDSCxPQUFPLEVBQUUsQ0FBQTtFQUNwRSxDQUFBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ08sU0FBU0ksZUFBZUEsQ0FBQ2hSLElBQUksRUFBRTtFQUNwQyxFQUFBLElBQUksQ0FBQzBOLGFBQU0sQ0FBQzFOLElBQUksQ0FBQyxFQUFFO0VBQ2pCLElBQUEsTUFBTSxJQUFJMkosS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0VBQ2pDLEdBQUE7RUFFQSxFQUFBLElBQU1zSCxlQUFlLEdBQUcsSUFBSWhULElBQUksQ0FBQytCLElBQUksQ0FBQyxDQUFBO0lBQ3RDaVIsZUFBZSxDQUFDblAsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ3BDLEVBQUEsT0FBT21QLGVBQWUsQ0FBQTtFQUN4QixDQUFBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTQyxZQUFZQSxDQUFDbFIsSUFBSSxFQUFFbVIsYUFBYSxFQUFFO0lBQ2hELElBQUksQ0FBQ3pELGFBQU0sQ0FBQzFOLElBQUksQ0FBQyxJQUFJLENBQUMwTixhQUFNLENBQUN5RCxhQUFhLENBQUMsRUFBRTtFQUMzQyxJQUFBLE1BQU0sSUFBSXhILEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0VBQzFDLEdBQUE7RUFFQSxFQUFBLElBQU15SCxZQUFZLEdBQUdKLGVBQWUsQ0FBQ2hSLElBQUksQ0FBQyxDQUFBO0VBQzFDLEVBQUEsSUFBTXFSLHFCQUFxQixHQUFHTCxlQUFlLENBQUNHLGFBQWEsQ0FBQyxDQUFBO0VBRTVELEVBQUEsT0FBT2pSLGlCQUFRLENBQUNrUixZQUFZLEVBQUVDLHFCQUFxQixDQUFDLENBQUE7RUFDdEQsQ0FBQTtFQUVPLFNBQVNDLGNBQWNBLENBQUNDLEtBQUssRUFBRTtJQUNwQyxJQUFNQyxTQUFTLEdBQUcsR0FBRyxDQUFBO0VBQ3JCLEVBQUEsT0FBT0QsS0FBSyxDQUFDNUQsR0FBRyxLQUFLNkQsU0FBUyxDQUFBO0VBQ2hDOztFQ3I5QkEsU0FBU0MsYUFBYUEsQ0FBQzNKLElBQUksRUFBRTRKLFFBQVEsRUFBRW5ULE9BQU8sRUFBRXlILE9BQU8sRUFBRTtJQUN2RCxJQUFNMkwsSUFBSSxHQUFHLEVBQUUsQ0FBQTtFQUNmLEVBQUEsS0FBSyxJQUFJcEUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLENBQUMsR0FBR21FLFFBQVEsR0FBRyxDQUFDLEVBQUVuRSxDQUFDLEVBQUUsRUFBRTtFQUN6QyxJQUFBLElBQU1xRSxPQUFPLEdBQUc5SixJQUFJLEdBQUc0SixRQUFRLEdBQUduRSxDQUFDLENBQUE7TUFDbkMsSUFBSXNFLFNBQVMsR0FBRyxJQUFJLENBQUE7RUFFcEIsSUFBQSxJQUFJdFQsT0FBTyxFQUFFO0VBQ1hzVCxNQUFBQSxTQUFTLEdBQUd4SyxlQUFPLENBQUM5SSxPQUFPLENBQUMsSUFBSXFULE9BQU8sQ0FBQTtFQUN6QyxLQUFBO01BRUEsSUFBSTVMLE9BQU8sSUFBSTZMLFNBQVMsRUFBRTtFQUN4QkEsTUFBQUEsU0FBUyxHQUFHeEssZUFBTyxDQUFDckIsT0FBTyxDQUFDLElBQUk0TCxPQUFPLENBQUE7RUFDekMsS0FBQTtFQUVBLElBQUEsSUFBSUMsU0FBUyxFQUFFO0VBQ2JGLE1BQUFBLElBQUksQ0FBQzVELElBQUksQ0FBQzZELE9BQU8sQ0FBQyxDQUFBO0VBQ3BCLEtBQUE7RUFDRixHQUFBO0VBRUEsRUFBQSxPQUFPRCxJQUFJLENBQUE7RUFDYixDQUFBO0VBQUMsSUFFb0JHLG1CQUFtQiwwQkFBQUMsZ0JBQUEsRUFBQTtJQVd0QyxTQUFBRCxtQkFBQUEsQ0FBWWhSLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFILG1CQUFBLENBQUEsQ0FBQTtFQUNqQkUsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUFKLElBQUFBLEVBQUFBLG1CQUFBLEdBQU1oUixLQUFLLENBQUEsQ0FBQSxDQUFBO01BQUVxUixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBbUNDLFlBQU07RUFDcEIsTUFBQSxJQUFNSSxZQUFZLEdBQUdKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dILElBQUksQ0FBQTtRQUNwQyxJQUFNdUssT0FBTyxHQUFHTCxLQUFBLENBQUtNLEtBQUssQ0FBQ0MsU0FBUyxDQUFDaFQsR0FBRyxDQUFDLFVBQUN1SSxJQUFJLEVBQUE7VUFBQSxvQkFDNUMwSyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxVQUFBQSxTQUFTLEVBQ1BnRSxZQUFZLEtBQUt0SyxJQUFJLEdBQ2pCLDRFQUE0RSxHQUM1RSwrQkFDTDtFQUNENkYsVUFBQUEsR0FBRyxFQUFFN0YsSUFBSztZQUNWNEssT0FBTyxFQUFFVixLQUFBLENBQUtXLFFBQVEsQ0FBQ0MsSUFBSSxDQUFBWixLQUFBLEVBQU9sSyxJQUFJLENBQUU7RUFDeEMsVUFBQSxlQUFBLEVBQWVzSyxZQUFZLEtBQUt0SyxJQUFJLEdBQUcsTUFBTSxHQUFHL0IsU0FBQUE7RUFBVSxTQUFBLEVBRXpEcU0sWUFBWSxLQUFLdEssSUFBSSxnQkFDcEIwSyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1yRSxVQUFBQSxTQUFTLEVBQUMseUNBQUE7RUFBeUMsU0FBQSxFQUFDLFFBQU8sQ0FBQyxHQUVsRSxFQUNELEVBQ0F0RyxJQUNFLENBQUMsQ0FBQTtFQUFBLE9BQ1AsQ0FBQyxDQUFBO0VBRUYsTUFBQSxJQUFNK0ssT0FBTyxHQUFHYixLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLEdBQUc4SSxlQUFPLENBQUMySyxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUE7RUFDdkUsTUFBQSxJQUFNdVUsT0FBTyxHQUFHZCxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFPLEdBQUdxQixlQUFPLENBQUMySyxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUE7RUFFdkUsTUFBQSxJQUFJLENBQUM4TSxPQUFPLElBQUksQ0FBQ2QsS0FBQSxDQUFLTSxLQUFLLENBQUNDLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDLFVBQUNqTCxJQUFJLEVBQUE7VUFBQSxPQUFLQSxJQUFJLEtBQUtnTCxPQUFPLENBQUE7RUFBQSxPQUFBLENBQUMsRUFBRTtFQUN0RVQsUUFBQUEsT0FBTyxDQUFDVyxPQUFPLGVBQ2JSLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFVBQUFBLFNBQVMsRUFBQywrQkFBK0I7RUFDekNULFVBQUFBLEdBQUcsRUFBRSxVQUFXO1lBQ2hCK0UsT0FBTyxFQUFFVixLQUFBLENBQUtpQixjQUFBQTtXQUVkVCxlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsR0FBQSxFQUFBO0VBQUdyRSxVQUFBQSxTQUFTLEVBQUMsK0dBQUE7V0FBaUgsQ0FDM0gsQ0FDUCxDQUFDLENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxJQUFJLENBQUN5RSxPQUFPLElBQUksQ0FBQ2IsS0FBQSxDQUFLTSxLQUFLLENBQUNDLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDLFVBQUNqTCxJQUFJLEVBQUE7VUFBQSxPQUFLQSxJQUFJLEtBQUsrSyxPQUFPLENBQUE7RUFBQSxPQUFBLENBQUMsRUFBRTtFQUN0RVIsUUFBQUEsT0FBTyxDQUFDdEUsSUFBSSxlQUNWeUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsVUFBQUEsU0FBUyxFQUFDLCtCQUErQjtFQUN6Q1QsVUFBQUEsR0FBRyxFQUFFLFVBQVc7WUFDaEIrRSxPQUFPLEVBQUVWLEtBQUEsQ0FBS2tCLGNBQUFBO1dBRWRWLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxHQUFBLEVBQUE7RUFBR3JFLFVBQUFBLFNBQVMsRUFBQywrR0FBQTtXQUFpSCxDQUMzSCxDQUNQLENBQUMsQ0FBQTtFQUNILE9BQUE7RUFFQSxNQUFBLE9BQU9pRSxPQUFPLENBQUE7T0FDZixDQUFBLENBQUE7RUFBQUYsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUNsSyxJQUFJLEVBQUs7RUFDbkJrSyxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUM3SyxJQUFJLENBQUMsQ0FBQTtPQUMxQixDQUFBLENBQUE7TUFBQXFLLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW9CLFlBQU07RUFDekJBLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FTLFFBQVEsRUFBRSxDQUFBO09BQ3RCLENBQUEsQ0FBQTtFQUFBaEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVksWUFBQSxFQUFBLFVBQUNvQixNQUFNLEVBQUs7RUFDdkIsTUFBQSxJQUFNQyxLQUFLLEdBQUdyQixLQUFBLENBQUtNLEtBQUssQ0FBQ0MsU0FBUyxDQUFDaFQsR0FBRyxDQUFDLFVBQVV1SSxJQUFJLEVBQUU7VUFDckQsT0FBT0EsSUFBSSxHQUFHc0wsTUFBTSxDQUFBO0VBQ3RCLE9BQUMsQ0FBQyxDQUFBO1FBRUZwQixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFDWmYsUUFBQUEsU0FBUyxFQUFFYyxLQUFBQTtFQUNiLE9BQUMsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO01BQUFsQixlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixZQUFNO0VBQ3JCLE1BQUEsT0FBT0EsS0FBQSxDQUFLdUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQzFCLENBQUEsQ0FBQTtNQUFBcEIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtFQUNyQixNQUFBLE9BQU9BLEtBQUEsQ0FBS3VCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQzNCLENBQUEsQ0FBQTtFQTlHQyxJQUFBLElBQVFDLHNCQUFzQixHQUE2QjFTLEtBQUssQ0FBeEQwUyxzQkFBc0I7UUFBRUMsc0JBQXNCLEdBQUszUyxLQUFLLENBQWhDMlMsc0JBQXNCLENBQUE7TUFDdEQsSUFBTS9CLFFBQVEsR0FDWjhCLHNCQUFzQixLQUFLQyxzQkFBc0IsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFFN0R6QixLQUFBLENBQUtNLEtBQUssR0FBRztRQUNYQyxTQUFTLEVBQUVkLGFBQWEsQ0FDdEJPLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dILElBQUksRUFDZjRKLFFBQVEsRUFDUk0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FBTyxFQUNsQnlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQ2IsQ0FBQTtPQUNELENBQUE7RUFDRGdNLElBQUFBLEtBQUEsQ0FBSzBCLFdBQVcsZ0JBQUdDLGVBQVMsRUFBRSxDQUFBO0VBQUMsSUFBQSxPQUFBM0IsS0FBQSxDQUFBO0VBQ2pDLEdBQUE7SUFBQzRCLFNBQUEsQ0FBQTlCLG1CQUFBLEVBQUFDLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUEvQixtQkFBQSxFQUFBLENBQUE7TUFBQW5FLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUFrVyxpQkFBQUEsR0FBb0I7RUFDbEIsTUFBQSxJQUFNQyxlQUFlLEdBQUcsSUFBSSxDQUFDTCxXQUFXLENBQUNNLE9BQU8sQ0FBQTtFQUVoRCxNQUFBLElBQUlELGVBQWUsRUFBRTtFQUNuQjtFQUNBLFFBQUEsSUFBTUUsdUJBQXVCLEdBQUdGLGVBQWUsQ0FBQ0csUUFBUSxHQUNwRHJWLEtBQUssQ0FBQ3NWLElBQUksQ0FBQ0osZUFBZSxDQUFDRyxRQUFRLENBQUMsR0FDcEMsSUFBSSxDQUFBO1VBQ1IsSUFBTUUsb0JBQW9CLEdBQUdILHVCQUF1QixHQUNoREEsdUJBQXVCLENBQUNsQixJQUFJLENBQUMsVUFBQ3NCLE9BQU8sRUFBQTtZQUFBLE9BQUtBLE9BQU8sQ0FBQ0MsWUFBWSxDQUFBO0VBQUEsU0FBQSxDQUFDLEdBQy9ELElBQUksQ0FBQTtFQUVSUCxRQUFBQSxlQUFlLENBQUNRLFNBQVMsR0FBR0gsb0JBQW9CLEdBQzVDQSxvQkFBb0IsQ0FBQ0ksU0FBUyxHQUM5QixDQUFDSixvQkFBb0IsQ0FBQ0ssWUFBWSxHQUFHVixlQUFlLENBQUNVLFlBQVksSUFBSSxDQUFDLEdBQ3RFLENBQUNWLGVBQWUsQ0FBQ1csWUFBWSxHQUFHWCxlQUFlLENBQUNVLFlBQVksSUFBSSxDQUFDLENBQUE7RUFDdkUsT0FBQTtFQUNGLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQTlHLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBZ0ZELFNBQUErVyxNQUFBQSxHQUFTO1FBQ1AsSUFBSUMsYUFBYSxHQUFHQyxTQUFJLENBQUM7RUFDdkIsUUFBQSxpQ0FBaUMsRUFBRSxJQUFJO0VBQ3ZDLFFBQUEsNkNBQTZDLEVBQzNDLElBQUksQ0FBQy9ULEtBQUssQ0FBQzJTLHNCQUFBQTtFQUNmLE9BQUMsQ0FBQyxDQUFBO1FBRUYsb0JBQ0VqQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUV3RyxhQUFjO1VBQUNFLEdBQUcsRUFBRSxJQUFJLENBQUNwQixXQUFBQTtFQUFZLE9BQUEsRUFDbEQsSUFBSSxDQUFDcUIsYUFBYSxFQUNoQixDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBekk4Q3ZDLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDckJoRSxJQUFNQywwQkFBMEIsR0FBR0MsK0JBQWMsQ0FBQ3BELG1CQUFtQixDQUFDLENBQUE7RUFBQyxJQUVsRHFELFlBQVksMEJBQUFwRCxnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBb0QsWUFBQSxHQUFBO0VBQUEsSUFBQSxJQUFBbkQsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQWtELFlBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxLQUFBLElBQUFDLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFpRCxZQUFBLEVBQUEzVSxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO01BQUFsRCxlQUFBLENBQUFILEtBQUEsRUFldkIsT0FBQSxFQUFBO0VBQ051RCxNQUFBQSxlQUFlLEVBQUUsS0FBQTtPQUNsQixDQUFBLENBQUE7TUFBQXBELGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHFCQUFBLEVBRXFCLFlBQU07RUFDMUIsTUFBQSxJQUFNYSxPQUFPLEdBQUdiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sR0FBRzhJLGVBQU8sQ0FBQzJLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtFQUN2RSxNQUFBLElBQU11VSxPQUFPLEdBQUdkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQU8sR0FBR3FCLGVBQU8sQ0FBQzJLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUV2RSxJQUFNcU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNsQixLQUFLLElBQUk5RSxDQUFDLEdBQUdzRixPQUFPLEVBQUV0RixDQUFDLElBQUl1RixPQUFPLEVBQUV2RixDQUFDLEVBQUUsRUFBRTtFQUN2QzhFLFFBQUFBLE9BQU8sQ0FBQ3RFLElBQUksZUFDVnlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFBUTlFLFVBQUFBLEdBQUcsRUFBRUosQ0FBRTtFQUFDM1AsVUFBQUEsS0FBSyxFQUFFMlAsQ0FBQUE7V0FDcEJBLEVBQUFBLENBQ0ssQ0FDVixDQUFDLENBQUE7RUFDSCxPQUFBO0VBQ0EsTUFBQSxPQUFPOEUsT0FBTyxDQUFBO09BQ2YsQ0FBQSxDQUFBO0VBQUFGLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUN3RCxDQUFDLEVBQUs7UUFDdEJ4RCxLQUFBLENBQUtXLFFBQVEsQ0FBQzZDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDN1gsS0FBSyxDQUFDLENBQUE7T0FDOUIsQ0FBQSxDQUFBO01BQUF1VSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxZQUFBO1FBQUEsb0JBQ2pCUSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0U3VSxRQUFBQSxLQUFLLEVBQUVvVSxLQUFBLENBQUtsUixLQUFLLENBQUNnSCxJQUFLO0VBQ3ZCc0csUUFBQUEsU0FBUyxFQUFDLCtCQUErQjtVQUN6Q3VFLFFBQVEsRUFBRVgsS0FBQSxDQUFLMEQsY0FBQUE7RUFBZSxPQUFBLEVBRTdCMUQsS0FBQSxDQUFLMkQsbUJBQW1CLEVBQ25CLENBQUMsQ0FBQTtPQUNWLENBQUEsQ0FBQTtFQUFBeEQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQzRELE9BQU8sRUFBQTtRQUFBLG9CQUN2QnBELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRTlFLFFBQUFBLEdBQUcsRUFBQyxNQUFNO0VBQ1ZrSSxRQUFBQSxLQUFLLEVBQUU7RUFBRUMsVUFBQUEsVUFBVSxFQUFFRixPQUFPLEdBQUcsU0FBUyxHQUFHLFFBQUE7V0FBVztFQUN0RHhILFFBQUFBLFNBQVMsRUFBQyxrQ0FBa0M7VUFDNUNzRSxPQUFPLEVBQUUsU0FBQUEsT0FBQUEsQ0FBQ25CLEtBQUssRUFBQTtFQUFBLFVBQUEsT0FBS1MsS0FBQSxDQUFLK0QsY0FBYyxDQUFDeEUsS0FBSyxDQUFDLENBQUE7RUFBQSxTQUFBO1NBRTlDaUIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNckUsUUFBQUEsU0FBUyxFQUFDLDhDQUFBO0VBQThDLE9BQUUsQ0FBQyxlQUNqRW9FLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyxpREFBQTtFQUFpRCxPQUFBLEVBQzlENEQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ0gsSUFDUixDQUNILENBQUMsQ0FBQTtPQUNQLENBQUEsQ0FBQTtNQUFBcUssZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsb0JBQ2ZRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3dDLDBCQUEwQixFQUFBO0VBQ3pCdEgsUUFBQUEsR0FBRyxFQUFDLFVBQVU7RUFDZDdGLFFBQUFBLElBQUksRUFBRWtLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dILElBQUs7VUFDdEI2SyxRQUFRLEVBQUVYLEtBQUEsQ0FBS1csUUFBUztVQUN4QlEsUUFBUSxFQUFFbkIsS0FBQSxDQUFLK0QsY0FBZTtFQUM5QnhYLFFBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO0VBQzVCeU4sUUFBQUEsc0JBQXNCLEVBQUV6QixLQUFBLENBQUtsUixLQUFLLENBQUMyUyxzQkFBdUI7RUFDMURELFFBQUFBLHNCQUFzQixFQUFFeEIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFMsc0JBQUFBO0VBQXVCLE9BQzNELENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtNQUFBckIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtFQUN2QixNQUFBLElBQVF1RCxlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7UUFDdkIsSUFBSVMsTUFBTSxHQUFHLENBQUNoRSxLQUFBLENBQUtpRSxjQUFjLENBQUMsQ0FBQ1YsZUFBZSxDQUFDLENBQUMsQ0FBQTtFQUNwRCxNQUFBLElBQUlBLGVBQWUsRUFBRTtVQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxFQUFFLENBQUMsQ0FBQTtFQUN2QyxPQUFBO0VBQ0EsTUFBQSxPQUFPRixNQUFNLENBQUE7T0FDZCxDQUFBLENBQUE7RUFBQTdELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDbEssSUFBSSxFQUFLO1FBQ25Ca0ssS0FBQSxDQUFLK0QsY0FBYyxFQUFFLENBQUE7RUFDckIsTUFBQSxJQUFJak8sSUFBSSxLQUFLa0ssS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ0gsSUFBSSxFQUFFLE9BQUE7RUFDOUJrSyxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUM3SyxJQUFJLENBQUMsQ0FBQTtPQUMxQixDQUFBLENBQUE7RUFBQXFLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztRQUMxQlMsS0FBQSxDQUFLc0IsUUFBUSxDQUNYO0VBQ0VpQyxRQUFBQSxlQUFlLEVBQUUsQ0FBQ3ZELEtBQUEsQ0FBS00sS0FBSyxDQUFDaUQsZUFBQUE7RUFDL0IsT0FBQyxFQUNELFlBQU07RUFDSixRQUFBLElBQUl2RCxLQUFBLENBQUtsUixLQUFLLENBQUNxVixrQkFBa0IsRUFBRTtZQUNqQ25FLEtBQUEsQ0FBS29FLGdCQUFnQixDQUFDcEUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQUV1UixLQUFLLENBQUMsQ0FBQTtFQUMvQyxTQUFBO0VBQ0YsT0FDRixDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7RUFBQVksSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsVUFBQ2hTLElBQUksRUFBRXVSLEtBQUssRUFBSztFQUNsQ1MsTUFBQUEsS0FBQSxDQUFLcUUsUUFBUSxDQUFDclcsSUFBSSxFQUFFdVIsS0FBSyxDQUFDLENBQUE7UUFDMUJTLEtBQUEsQ0FBS3NFLE9BQU8sRUFBRSxDQUFBO09BQ2YsQ0FBQSxDQUFBO0VBQUFuRSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxVQUFBLEVBRVUsVUFBQ2hTLElBQUksRUFBRXVSLEtBQUssRUFBSztFQUMxQixNQUFBLElBQUlTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsRUFBRTtVQUN2QnJFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsQ0FBQ3JXLElBQUksRUFBRXVSLEtBQUssQ0FBQyxDQUFBO0VBQ2xDLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQVksZUFBQSxDQUFBSCxLQUFBLEVBQUEsU0FBQSxFQUVTLFlBQU07RUFDZCxNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQU8sRUFBRTtFQUN0QnRFLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUMxQixPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBQUEsSUFBQSxPQUFBdEUsS0FBQSxDQUFBO0VBQUEsR0FBQTtJQUFBNEIsU0FBQSxDQUFBdUIsWUFBQSxFQUFBcEQsZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQXNCLFlBQUEsRUFBQSxDQUFBO01BQUF4SCxHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUErVyxNQUFBQSxHQUFTO0VBQ1AsTUFBQSxJQUFJNEIsZ0JBQWdCLENBQUE7RUFDcEIsTUFBQSxRQUFRLElBQUksQ0FBQ3pWLEtBQUssQ0FBQzBWLFlBQVk7RUFDN0IsUUFBQSxLQUFLLFFBQVE7RUFDWEQsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRSxnQkFBZ0IsRUFBRSxDQUFBO0VBQzFDLFVBQUEsTUFBQTtFQUNGLFFBQUEsS0FBSyxRQUFRO0VBQ1hGLFVBQUFBLGdCQUFnQixHQUFHLElBQUksQ0FBQ0csZ0JBQWdCLEVBQUUsQ0FBQTtFQUMxQyxVQUFBLE1BQUE7RUFDSixPQUFBO1FBRUEsb0JBQ0VsRSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLDBGQUFBNU4sTUFBQSxDQUEwRixJQUFJLENBQUNNLEtBQUssQ0FBQzBWLFlBQVksQ0FBQTtFQUFHLE9BQUEsRUFFNUhELGdCQUNFLENBQUMsQ0FBQTtFQUVWLEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0ExSXVDL0QsQ0FBQUEsc0JBQUssQ0FBQ3dDLFNBQVMsQ0FBQTs7RUNQdEIsSUFFZDJCLG9CQUFvQiwwQkFBQTVFLGdCQUFBLEVBQUE7RUFBQSxFQUFBLFNBQUE0RSxvQkFBQSxHQUFBO0VBQUEsSUFBQSxJQUFBM0UsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQTBFLG9CQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsS0FBQSxJQUFBdkIsSUFBQSxHQUFBdFAsU0FBQSxDQUFBaEcsTUFBQSxFQUFBdVYsSUFBQSxHQUFBeFcsSUFBQUEsS0FBQSxDQUFBdVcsSUFBQSxHQUFBRSxJQUFBLEdBQUEsQ0FBQSxFQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQSxFQUFBLEVBQUE7RUFBQUQsTUFBQUEsSUFBQSxDQUFBQyxJQUFBLENBQUF4UCxHQUFBQSxTQUFBLENBQUF3UCxJQUFBLENBQUEsQ0FBQTtFQUFBLEtBQUE7RUFBQXRELElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBLElBQUEsRUFBQXlFLG9CQUFBLEVBQUFuVyxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFRckIsaUJBQUEsRUFBQSxVQUFDekUsQ0FBQyxFQUFBO0VBQUEsTUFBQSxPQUFLeUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBSyxLQUFLaUksQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQTRFLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFL0IsWUFBTTtRQUNwQixPQUFPQSxLQUFBLENBQUtsUixLQUFLLENBQUM4VixVQUFVLENBQUNyWCxHQUFHLENBQUMsVUFBQytGLEtBQUssRUFBRWlJLENBQUMsRUFBQTtVQUFBLG9CQUN4Q2lGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7WUFDRXJFLFNBQVMsRUFDUDRELEtBQUEsQ0FBSzZFLGVBQWUsQ0FBQ3RKLENBQUMsQ0FBQyxHQUNuQiwrRUFBK0UsR0FDL0UsZ0NBQ0w7RUFDREksVUFBQUEsR0FBRyxFQUFFckksS0FBTTtZQUNYb04sT0FBTyxFQUFFVixLQUFBLENBQUtXLFFBQVEsQ0FBQ0MsSUFBSSxDQUFBWixLQUFBLEVBQU96RSxDQUFDLENBQUU7WUFDckMsZUFBZXlFLEVBQUFBLEtBQUEsQ0FBSzZFLGVBQWUsQ0FBQ3RKLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBR3hILFNBQUFBO1dBRWpEaU0sRUFBQUEsS0FBQSxDQUFLNkUsZUFBZSxDQUFDdEosQ0FBQyxDQUFDLGdCQUN0QmlGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFVBQUFBLFNBQVMsRUFBQywwQ0FBQTtFQUEwQyxTQUFBLEVBQUMsUUFBTyxDQUFDLEdBRW5FLEVBQ0QsRUFDQTlJLEtBQ0UsQ0FBQyxDQUFBO0VBQUEsT0FDUCxDQUFDLENBQUE7T0FDSCxDQUFBLENBQUE7RUFBQTZNLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDMU0sS0FBSyxFQUFBO0VBQUEsTUFBQSxPQUFLME0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlIsUUFBUSxDQUFDck4sS0FBSyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBNk0sZUFBQSxDQUFBSCxLQUFBLEVBRTNCLG9CQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsT0FBTUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcVMsUUFBUSxFQUFFLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQW5CLEtBQUEsQ0FBQTtFQUFBLEdBQUE7SUFBQTRCLFNBQUEsQ0FBQStDLG9CQUFBLEVBQUE1RSxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBOEMsb0JBQUEsRUFBQSxDQUFBO01BQUFoSixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUVoRCxTQUFBK1csTUFBQUEsR0FBUztRQUNQLG9CQUNFbkMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLGtDQUFBO0VBQWtDLE9BQUEsRUFDOUMsSUFBSSxDQUFDMkcsYUFBYSxFQUNoQixDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBMUMrQ3ZDLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDR2pFLElBQU04QiwyQkFBMkIsR0FBRzVCLCtCQUFjLENBQUN5QixvQkFBb0IsQ0FBQyxDQUFBO0VBQUMsSUFFcERJLGFBQWEsMEJBQUFoRixnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBZ0YsYUFBQSxHQUFBO0VBQUEsSUFBQSxJQUFBL0UsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQThFLGFBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxLQUFBLElBQUEzQixJQUFBLEdBQUF0UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF1VixJQUFBLEdBQUF4VyxJQUFBQSxLQUFBLENBQUF1VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtFQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXhQLEdBQUFBLFNBQUEsQ0FBQXdQLElBQUEsQ0FBQSxDQUFBO0VBQUEsS0FBQTtFQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBNkUsYUFBQSxFQUFBdlcsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBNlUsSUFBQSxDQUFBLENBQUEsQ0FBQTtNQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBU3hCLE9BQUEsRUFBQTtFQUNOdUQsTUFBQUEsZUFBZSxFQUFFLEtBQUE7T0FDbEIsQ0FBQSxDQUFBO0VBQUFwRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDNEUsVUFBVSxFQUFBO0VBQUEsTUFBQSxPQUMvQkEsVUFBVSxDQUFDclgsR0FBRyxDQUFDLFVBQUN5WCxDQUFDLEVBQUV6SixDQUFDLEVBQUE7VUFBQSxvQkFDbEJpRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVE5RSxVQUFBQSxHQUFHLEVBQUVKLENBQUU7RUFBQzNQLFVBQUFBLEtBQUssRUFBRTJQLENBQUFBO0VBQUUsU0FBQSxFQUN0QnlKLENBQ0ssQ0FBQyxDQUFBO0VBQUEsT0FDVixDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBN0UsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWUsa0JBQUEsRUFBQSxVQUFDNEUsVUFBVSxFQUFBO1FBQUEsb0JBQzVCcEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFN1UsUUFBQUEsS0FBSyxFQUFFb1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBTTtFQUN4QjhJLFFBQUFBLFNBQVMsRUFBQyxnQ0FBZ0M7VUFDMUN1RSxRQUFRLEVBQUUsU0FBQUEsUUFBQUEsQ0FBQzZDLENBQUMsRUFBQTtZQUFBLE9BQUt4RCxLQUFBLENBQUtXLFFBQVEsQ0FBQzZDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDN1gsS0FBSyxDQUFDLENBQUE7RUFBQSxTQUFBO0VBQUMsT0FBQSxFQUU5Q29VLEtBQUEsQ0FBSzJELG1CQUFtQixDQUFDaUIsVUFBVSxDQUM5QixDQUFDLENBQUE7T0FDVixDQUFBLENBQUE7RUFBQXpFLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFVBQUM0RCxPQUFPLEVBQUVnQixVQUFVLEVBQUE7UUFBQSxvQkFDbkNwRSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0U5RSxRQUFBQSxHQUFHLEVBQUMsTUFBTTtFQUNWa0ksUUFBQUEsS0FBSyxFQUFFO0VBQUVDLFVBQUFBLFVBQVUsRUFBRUYsT0FBTyxHQUFHLFNBQVMsR0FBRyxRQUFBO1dBQVc7RUFDdER4SCxRQUFBQSxTQUFTLEVBQUMsbUNBQW1DO1VBQzdDc0UsT0FBTyxFQUFFVixLQUFBLENBQUsrRCxjQUFBQTtTQUVkdkQsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNckUsUUFBQUEsU0FBUyxFQUFDLCtDQUFBO0VBQStDLE9BQUUsQ0FBQyxlQUNsRW9FLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyxtREFBQTtTQUNid0ksRUFBQUEsVUFBVSxDQUFDNUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBSyxDQUN4QixDQUNILENBQUMsQ0FBQTtPQUNQLENBQUEsQ0FBQTtFQUFBNk0sSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQzRFLFVBQVUsRUFBQTtFQUFBLE1BQUEsb0JBQzFCcEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUUsMkJBQTJCLEVBQUE7RUFDMUJuSixRQUFBQSxHQUFHLEVBQUMsVUFBVTtFQUNkckksUUFBQUEsS0FBSyxFQUFFME0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBTTtFQUN4QnNSLFFBQUFBLFVBQVUsRUFBRUEsVUFBVztVQUN2QmpFLFFBQVEsRUFBRVgsS0FBQSxDQUFLVyxRQUFTO1VBQ3hCUSxRQUFRLEVBQUVuQixLQUFBLENBQUsrRCxjQUFBQTtFQUFlLE9BQy9CLENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtFQUFBNUQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQzRFLFVBQVUsRUFBSztFQUNqQyxNQUFBLElBQVFyQixlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7RUFDdkIsTUFBQSxJQUFJUyxNQUFNLEdBQUcsQ0FBQ2hFLEtBQUEsQ0FBS2lFLGNBQWMsQ0FBQyxDQUFDVixlQUFlLEVBQUVxQixVQUFVLENBQUMsQ0FBQyxDQUFBO0VBQ2hFLE1BQUEsSUFBSXJCLGVBQWUsRUFBRTtVQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxDQUFDVSxVQUFVLENBQUMsQ0FBQyxDQUFBO0VBQ2pELE9BQUE7RUFDQSxNQUFBLE9BQU9aLE1BQU0sQ0FBQTtPQUNkLENBQUEsQ0FBQTtFQUFBN0QsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUMxTSxLQUFLLEVBQUs7UUFDcEIwTSxLQUFBLENBQUsrRCxjQUFjLEVBQUUsQ0FBQTtFQUNyQixNQUFBLElBQUl6USxLQUFLLEtBQUswTSxLQUFBLENBQUtsUixLQUFLLENBQUN3RSxLQUFLLEVBQUU7RUFDOUIwTSxRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUNyTixLQUFLLENBQUMsQ0FBQTtFQUM1QixPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUE2TSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxZQUFBO1FBQUEsT0FDZkEsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQ1ppQyxRQUFBQSxlQUFlLEVBQUUsQ0FBQ3ZELEtBQUEsQ0FBS00sS0FBSyxDQUFDaUQsZUFBQUE7RUFDL0IsT0FBQyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQXZELEtBQUEsQ0FBQTtFQUFBLEdBQUE7SUFBQTRCLFNBQUEsQ0FBQW1ELGFBQUEsRUFBQWhGLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUFrRCxhQUFBLEVBQUEsQ0FBQTtNQUFBcEosR0FBQSxFQUFBLFFBQUE7TUFBQS9QLEtBQUEsRUFFSixTQUFBK1csTUFBQUEsR0FBUztFQUFBLE1BQUEsSUFBQXNDLE1BQUEsR0FBQSxJQUFBLENBQUE7RUFDUCxNQUFBLElBQU1MLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUNyWCxHQUFHLENBQzNELElBQUksQ0FBQ3VCLEtBQUssQ0FBQ29XLHVCQUF1QixHQUM5QixVQUFDRixDQUFDLEVBQUE7VUFBQSxPQUFLRyxxQkFBMkIsQ0FBQ0gsQ0FBQyxFQUFFQyxNQUFJLENBQUNuVyxLQUFLLENBQUN6QyxNQUFNLENBQUMsQ0FBQTtFQUFBLE9BQUEsR0FDeEQsVUFBQzJZLENBQUMsRUFBQTtVQUFBLE9BQUtHLGdCQUFzQixDQUFDSCxDQUFDLEVBQUVDLE1BQUksQ0FBQ25XLEtBQUssQ0FBQ3pDLE1BQU0sQ0FBQyxDQUFBO0VBQUEsT0FDekQsQ0FBQyxDQUFBO0VBRUQsTUFBQSxJQUFJa1ksZ0JBQWdCLENBQUE7RUFDcEIsTUFBQSxRQUFRLElBQUksQ0FBQ3pWLEtBQUssQ0FBQzBWLFlBQVk7RUFDN0IsUUFBQSxLQUFLLFFBQVE7RUFDWEQsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRSxnQkFBZ0IsQ0FBQ0csVUFBVSxDQUFDLENBQUE7RUFDcEQsVUFBQSxNQUFBO0VBQ0YsUUFBQSxLQUFLLFFBQVE7RUFDWEwsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRyxnQkFBZ0IsQ0FBQ0UsVUFBVSxDQUFDLENBQUE7RUFDcEQsVUFBQSxNQUFBO0VBQ0osT0FBQTtRQUVBLG9CQUNFcEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsUUFBQUEsU0FBUyw0RkFBQTVOLE1BQUEsQ0FBNEYsSUFBSSxDQUFDTSxLQUFLLENBQUMwVixZQUFZLENBQUE7RUFBRyxPQUFBLEVBRTlIRCxnQkFDRSxDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBbkd3Qy9ELENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDTTFELFNBQVNvQyxrQkFBa0JBLENBQUM3WSxPQUFPLEVBQUV5SCxPQUFPLEVBQUU7SUFDNUMsSUFBTTJMLElBQUksR0FBRyxFQUFFLENBQUE7RUFFZixFQUFBLElBQUkwRixRQUFRLEdBQUcxVSxlQUFlLENBQUNwRSxPQUFPLENBQUMsQ0FBQTtFQUN2QyxFQUFBLElBQU0rWSxRQUFRLEdBQUczVSxlQUFlLENBQUNxRCxPQUFPLENBQUMsQ0FBQTtFQUV6QyxFQUFBLE9BQU8sQ0FBQytKLGVBQU8sQ0FBQ3NILFFBQVEsRUFBRUMsUUFBUSxDQUFDLEVBQUU7RUFDbkMzRixJQUFBQSxJQUFJLENBQUM1RCxJQUFJLENBQUNwUSxPQUFPLENBQUMwWixRQUFRLENBQUMsQ0FBQyxDQUFBO0VBRTVCQSxJQUFBQSxRQUFRLEdBQUc3TSxtQkFBUyxDQUFDNk0sUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ25DLEdBQUE7RUFDQSxFQUFBLE9BQU8xRixJQUFJLENBQUE7RUFDYixDQUFBO0VBQUMsSUFFb0I0Rix3QkFBd0IsMEJBQUF4RixnQkFBQSxFQUFBO0lBWTNDLFNBQUF3Rix3QkFBQUEsQ0FBWXpXLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFzRix3QkFBQSxDQUFBLENBQUE7RUFDakJ2RixJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQXFGLElBQUFBLEVBQUFBLHdCQUFBLEdBQU16VyxLQUFLLENBQUEsQ0FBQSxDQUFBO01BQUVxUixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBVUMsWUFBTTtRQUNwQixPQUFPQSxLQUFBLENBQUtNLEtBQUssQ0FBQ2tGLGNBQWMsQ0FBQ2pZLEdBQUcsQ0FBQyxVQUFDa1ksU0FBUyxFQUFLO0VBQ2xELFFBQUEsSUFBTUMsY0FBYyxHQUFHOUcsZUFBTyxDQUFDNkcsU0FBUyxDQUFDLENBQUE7VUFDekMsSUFBTUUsZUFBZSxHQUNuQnZVLFVBQVUsQ0FBQzRPLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxFQUFFeVgsU0FBUyxDQUFDLElBQ3RDalUsV0FBVyxDQUFDd08sS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQUV5WCxTQUFTLENBQUMsQ0FBQTtVQUV6QyxvQkFDRWpGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFVBQUFBLFNBQVMsRUFDUHVKLGVBQWUsR0FDWCwwREFBMEQsR0FDMUQscUNBQ0w7RUFDRGhLLFVBQUFBLEdBQUcsRUFBRStKLGNBQWU7WUFDcEJoRixPQUFPLEVBQUVWLEtBQUEsQ0FBS1csUUFBUSxDQUFDQyxJQUFJLENBQUFaLEtBQUEsRUFBTzBGLGNBQWMsQ0FBRTtZQUNsRCxlQUFlQyxFQUFBQSxlQUFlLEdBQUcsTUFBTSxHQUFHNVIsU0FBQUE7RUFBVSxTQUFBLEVBRW5ENFIsZUFBZSxnQkFDZG5GLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFVBQUFBLFNBQVMsRUFBQywrQ0FBQTtXQUFnRCxFQUFBLFFBRTFELENBQUMsR0FFUCxFQUNELEVBQ0EvTyxVQUFVLENBQUNvWSxTQUFTLEVBQUV6RixLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQUU0VCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQzVELENBQUMsQ0FBQTtFQUVWLE9BQUMsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO0VBQUE4VCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVSxVQUFBLEVBQUEsVUFBQ3lGLFNBQVMsRUFBQTtFQUFBLE1BQUEsT0FBS3pGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZSLFFBQVEsQ0FBQzhFLFNBQVMsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQXRGLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW5DLFlBQU07RUFDekJBLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FTLFFBQVEsRUFBRSxDQUFBO09BQ3RCLENBQUEsQ0FBQTtNQTNDQ25CLEtBQUEsQ0FBS00sS0FBSyxHQUFHO0VBQ1hrRixNQUFBQSxjQUFjLEVBQUVKLGtCQUFrQixDQUNoQ3BGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sRUFDbEJ5VCxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUNiLENBQUE7T0FDRCxDQUFBO0VBQUMsSUFBQSxPQUFBZ00sS0FBQSxDQUFBO0VBQ0osR0FBQTtJQUFDNEIsU0FBQSxDQUFBMkQsd0JBQUEsRUFBQXhGLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUEwRCx3QkFBQSxFQUFBLENBQUE7TUFBQTVKLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBdUNELFNBQUErVyxNQUFBQSxHQUFTO1FBQ1AsSUFBSUMsYUFBYSxHQUFHQyxTQUFJLENBQUM7RUFDdkIsUUFBQSx1Q0FBdUMsRUFBRSxJQUFJO0VBQzdDLFFBQUEsbURBQW1ELEVBQ2pELElBQUksQ0FBQy9ULEtBQUssQ0FBQzhXLDJCQUFBQTtFQUNmLE9BQUMsQ0FBQyxDQUFBO1FBRUYsb0JBQU9wRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUV3RyxhQUFBQTtFQUFjLE9BQUEsRUFBRSxJQUFJLENBQUNHLGFBQWEsRUFBUSxDQUFDLENBQUE7RUFDcEUsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQXBFbUR2QyxDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ2JyRSxJQUFJNkMsK0JBQStCLEdBQUczQywrQkFBYyxDQUFDcUMsd0JBQXdCLENBQUMsQ0FBQTtFQUFDLElBRTFETyxpQkFBaUIsMEJBQUEvRixnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBK0YsaUJBQUEsR0FBQTtFQUFBLElBQUEsSUFBQTlGLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUE2RixpQkFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQTFDLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUE0RixpQkFBQSxFQUFBdFgsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBNlUsSUFBQSxDQUFBLENBQUEsQ0FBQTtNQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBWTVCLE9BQUEsRUFBQTtFQUNOdUQsTUFBQUEsZUFBZSxFQUFFLEtBQUE7T0FDbEIsQ0FBQSxDQUFBO01BQUFwRCxlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUVxQixZQUFNO1FBQzFCLElBQUlxRixRQUFRLEdBQUcxVSxlQUFlLENBQUNxUCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLENBQUMsQ0FBQTtRQUNsRCxJQUFNK1ksUUFBUSxHQUFHM1UsZUFBZSxDQUFDcVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa0YsT0FBTyxDQUFDLENBQUE7UUFDcEQsSUFBTXFNLE9BQU8sR0FBRyxFQUFFLENBQUE7RUFFbEIsTUFBQSxPQUFPLENBQUN0QyxlQUFPLENBQUNzSCxRQUFRLEVBQUVDLFFBQVEsQ0FBQyxFQUFFO0VBQ25DLFFBQUEsSUFBTVMsU0FBUyxHQUFHbkgsZUFBTyxDQUFDeUcsUUFBUSxDQUFDLENBQUE7RUFDbkNoRixRQUFBQSxPQUFPLENBQUN0RSxJQUFJLGVBQ1Z5RSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVE5RSxVQUFBQSxHQUFHLEVBQUVvSyxTQUFVO0VBQUNuYSxVQUFBQSxLQUFLLEVBQUVtYSxTQUFBQTtFQUFVLFNBQUEsRUFDdEMxWSxVQUFVLENBQUNnWSxRQUFRLEVBQUVyRixLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQUU0VCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQ3hELENBQ1YsQ0FBQyxDQUFBO0VBRURnWixRQUFBQSxRQUFRLEdBQUc3TSxtQkFBUyxDQUFDNk0sUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ25DLE9BQUE7RUFFQSxNQUFBLE9BQU9oRixPQUFPLENBQUE7T0FDZixDQUFBLENBQUE7RUFBQUYsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQ3dELENBQUMsRUFBSztRQUN0QnhELEtBQUEsQ0FBS1csUUFBUSxDQUFDNkMsQ0FBQyxDQUFDQyxNQUFNLENBQUM3WCxLQUFLLENBQUMsQ0FBQTtPQUM5QixDQUFBLENBQUE7TUFBQXVVLGVBQUEsQ0FBQUgsS0FBQSxFQUVrQixrQkFBQSxFQUFBLFlBQUE7UUFBQSxvQkFDakJRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7VUFDRTdVLEtBQUssRUFBRWdULGVBQU8sQ0FBQ2pPLGVBQWUsQ0FBQ3FQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxDQUFDLENBQUU7RUFDakRvTyxRQUFBQSxTQUFTLEVBQUMscUNBQXFDO1VBQy9DdUUsUUFBUSxFQUFFWCxLQUFBLENBQUswRCxjQUFBQTtFQUFlLE9BQUEsRUFFN0IxRCxLQUFBLENBQUsyRCxtQkFBbUIsRUFDbkIsQ0FBQyxDQUFBO09BQ1YsQ0FBQSxDQUFBO0VBQUF4RCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxVQUFDNEQsT0FBTyxFQUFLO1FBQzVCLElBQU1vQyxTQUFTLEdBQUczWSxVQUFVLENBQzFCMlMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQ2ZnUyxLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQ3JCNFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFDYixDQUFDLENBQUE7UUFFRCxvQkFDRW1VLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRTlFLFFBQUFBLEdBQUcsRUFBQyxNQUFNO0VBQ1ZrSSxRQUFBQSxLQUFLLEVBQUU7RUFBRUMsVUFBQUEsVUFBVSxFQUFFRixPQUFPLEdBQUcsU0FBUyxHQUFHLFFBQUE7V0FBVztFQUN0RHhILFFBQUFBLFNBQVMsRUFBQyx3Q0FBd0M7VUFDbERzRSxPQUFPLEVBQUUsU0FBQUEsT0FBQUEsQ0FBQ25CLEtBQUssRUFBQTtFQUFBLFVBQUEsT0FBS1MsS0FBQSxDQUFLK0QsY0FBYyxDQUFDeEUsS0FBSyxDQUFDLENBQUE7RUFBQSxTQUFBO1NBRTlDaUIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNckUsUUFBQUEsU0FBUyxFQUFDLG9EQUFBO0VBQW9ELE9BQUUsQ0FBQyxlQUN2RW9FLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyw2REFBQTtTQUNiNEosRUFBQUEsU0FDRyxDQUNILENBQUMsQ0FBQTtPQUVULENBQUEsQ0FBQTtNQUFBN0YsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsb0JBQ2ZRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ29GLCtCQUErQixFQUFBO0VBQzlCbEssUUFBQUEsR0FBRyxFQUFDLFVBQVU7RUFDZDNOLFFBQUFBLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSztFQUN0QjVCLFFBQUFBLFVBQVUsRUFBRTRULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzFDLFVBQVc7VUFDbEN1VSxRQUFRLEVBQUVYLEtBQUEsQ0FBS1csUUFBUztVQUN4QlEsUUFBUSxFQUFFbkIsS0FBQSxDQUFLK0QsY0FBZTtFQUM5QnhYLFFBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO0VBQzVCNFIsUUFBQUEsMkJBQTJCLEVBQUU1RixLQUFBLENBQUtsUixLQUFLLENBQUM4VywyQkFBNEI7RUFDcEV2WixRQUFBQSxNQUFNLEVBQUUyVCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFBQTtFQUFPLE9BQzNCLENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtNQUFBOFQsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtFQUN2QixNQUFBLElBQVF1RCxlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7UUFDdkIsSUFBSVMsTUFBTSxHQUFHLENBQUNoRSxLQUFBLENBQUtpRSxjQUFjLENBQUMsQ0FBQ1YsZUFBZSxDQUFDLENBQUMsQ0FBQTtFQUNwRCxNQUFBLElBQUlBLGVBQWUsRUFBRTtVQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxFQUFFLENBQUMsQ0FBQTtFQUN2QyxPQUFBO0VBQ0EsTUFBQSxPQUFPRixNQUFNLENBQUE7T0FDZCxDQUFBLENBQUE7RUFBQTdELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDMEYsY0FBYyxFQUFLO1FBQzdCMUYsS0FBQSxDQUFLK0QsY0FBYyxFQUFFLENBQUE7UUFFckIsSUFBTWtDLFdBQVcsR0FBR3RhLE9BQU8sQ0FBQ3VhLFFBQVEsQ0FBQ1IsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUVyRCxJQUNFdFUsVUFBVSxDQUFDNE8sS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQUVpWSxXQUFXLENBQUMsSUFDeEN6VSxXQUFXLENBQUN3TyxLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRWlZLFdBQVcsQ0FBQyxFQUN6QztFQUNBLFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFFQWpHLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZSLFFBQVEsQ0FBQ3NGLFdBQVcsQ0FBQyxDQUFBO09BQ2pDLENBQUEsQ0FBQTtNQUFBOUYsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsWUFBQTtRQUFBLE9BQ2ZBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUNaaUMsUUFBQUEsZUFBZSxFQUFFLENBQUN2RCxLQUFBLENBQUtNLEtBQUssQ0FBQ2lELGVBQUFBO0VBQy9CLE9BQUMsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUF2RCxLQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE0QixTQUFBLENBQUFrRSxpQkFBQSxFQUFBL0YsZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQWlFLGlCQUFBLEVBQUEsQ0FBQTtNQUFBbkssR0FBQSxFQUFBLFFBQUE7TUFBQS9QLEtBQUEsRUFFSixTQUFBK1csTUFBQUEsR0FBUztFQUNQLE1BQUEsSUFBSTRCLGdCQUFnQixDQUFBO0VBQ3BCLE1BQUEsUUFBUSxJQUFJLENBQUN6VixLQUFLLENBQUMwVixZQUFZO0VBQzdCLFFBQUEsS0FBSyxRQUFRO0VBQ1hELFVBQUFBLGdCQUFnQixHQUFHLElBQUksQ0FBQ0UsZ0JBQWdCLEVBQUUsQ0FBQTtFQUMxQyxVQUFBLE1BQUE7RUFDRixRQUFBLEtBQUssUUFBUTtFQUNYRixVQUFBQSxnQkFBZ0IsR0FBRyxJQUFJLENBQUNHLGdCQUFnQixFQUFFLENBQUE7RUFDMUMsVUFBQSxNQUFBO0VBQ0osT0FBQTtRQUVBLG9CQUNFbEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsUUFBQUEsU0FBUyxzR0FBQTVOLE1BQUEsQ0FBc0csSUFBSSxDQUFDTSxLQUFLLENBQUMwVixZQUFZLENBQUE7RUFBRyxPQUFBLEVBRXhJRCxnQkFDRSxDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBcEk0Qy9ELENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDQ3hDLElBRURtRCxHQUFHLDBCQUFBcEcsZ0JBQUEsRUFBQTtFQUFBLEVBQUEsU0FBQW9HLEdBQUEsR0FBQTtFQUFBLElBQUEsSUFBQW5HLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFrRyxHQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsS0FBQSxJQUFBL0MsSUFBQSxHQUFBdFAsU0FBQSxDQUFBaEcsTUFBQSxFQUFBdVYsSUFBQSxHQUFBeFcsSUFBQUEsS0FBQSxDQUFBdVcsSUFBQSxHQUFBRSxJQUFBLEdBQUEsQ0FBQSxFQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQSxFQUFBLEVBQUE7RUFBQUQsTUFBQUEsSUFBQSxDQUFBQyxJQUFBLENBQUF4UCxHQUFBQSxTQUFBLENBQUF3UCxJQUFBLENBQUEsQ0FBQTtFQUFBLEtBQUE7RUFBQXRELElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBLElBQUEsRUFBQWlHLEdBQUEsRUFBQTNYLEVBQUFBLENBQUFBLE1BQUEsQ0FBQTZVLElBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQWxELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLE9BQUEsZUE0RGRRLHNCQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQSxDQUFBO0VBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFWCxhQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQ3ZCLE1BQUEsSUFBSSxDQUFDUyxLQUFBLENBQUtvRyxVQUFVLEVBQUUsSUFBSXBHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRSLE9BQU8sRUFBRTtFQUM1Q1YsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNFIsT0FBTyxDQUFDbkIsS0FBSyxDQUFDLENBQUE7RUFDM0IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDNUIsTUFBQSxJQUFJLENBQUNTLEtBQUEsQ0FBS29HLFVBQVUsRUFBRSxJQUFJcEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdVgsWUFBWSxFQUFFO0VBQ2pEckcsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdVgsWUFBWSxDQUFDOUcsS0FBSyxDQUFDLENBQUE7RUFDaEMsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDNUQsR0FBRyxDQUFBO1FBQzFCLElBQUkySyxRQUFRLEtBQUssR0FBRyxFQUFFO1VBQ3BCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7VUFDdEJoSCxLQUFLLENBQUM1RCxHQUFHLEdBQUcsT0FBTyxDQUFBO0VBQ3JCLE9BQUE7RUFFQXFFLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBYLGVBQWUsQ0FBQ2pILEtBQUssQ0FBQyxDQUFBO09BQ2xDLENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVyxXQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtRQUFBLE9BQUs3VSxTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQUVxVyxLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUF0RyxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVsQyxZQUFNO0VBQUEsTUFBQSxJQUFBMEcscUJBQUEsQ0FBQTtFQUN6QixNQUFBLElBQUkxRyxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsRUFBRTtFQUN6QyxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtRQUVBLElBQU1DLGNBQWMsR0FBRzVHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytYLGVBQWUsR0FBQUgsQ0FBQUEscUJBQUEsR0FDN0MxRyxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFhLE1BQUEsSUFBQSxJQUFBSixxQkFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUF4QkEscUJBQUEsQ0FBMEJuUyxJQUFJLENBQUMsVUFBQ3ZHLElBQUksRUFBQTtFQUFBLFFBQUEsT0FBS2dTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQy9ZLElBQUksQ0FBQyxDQUFBO1NBQUMsQ0FBQSxHQUNwRWdTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQy9HLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxDQUFBO0VBRTdDLE1BQUEsT0FBTyxDQUFDSixjQUFjLElBQUk1RyxLQUFBLENBQUsrRyxlQUFlLENBQUMvRyxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUMsQ0FBQTtPQUN4RSxDQUFBLENBQUE7TUFBQTlHLGVBQUEsQ0FBQUgsS0FBQSxFQUVZLFlBQUEsRUFBQSxZQUFBO1FBQUEsT0FBTXBNLGFBQWEsQ0FBQ29NLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsRUFBRTRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQXFSLGVBQUEsQ0FBQUgsS0FBQSxFQUUvQyxZQUFBLEVBQUEsWUFBQTtRQUFBLE9BQU1wTCxhQUFhLENBQUNvTCxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQUU0UCxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUFxUixlQUFBLENBQUFILEtBQUEsRUFFNUMsZUFBQSxFQUFBLFlBQUE7RUFBQSxNQUFBLE9BQ2RwTyxTQUFTLENBQ1BvTyxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQ2RHLGNBQWMsQ0FDWnlQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsRUFDZDRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakIyVCxLQUFBLENBQUtsUixLQUFLLENBQUMwQixnQkFDYixDQUNGLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUEyUCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVSxZQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtFQUFBLE1BQUEsT0FDakJ6RyxLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLElBQ3pCdFYsU0FBUyxDQUNQNlUsS0FBSyxFQUNMbFcsY0FBYyxDQUNaeVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUNkNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUNiLENBQ0YsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQTJQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVlLGlCQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtFQUFBLE1BQUEsT0FBS3pHLEtBQUEsQ0FBS3BPLFNBQVMsQ0FBQzZVLEtBQUssQ0FBQyxJQUFJekcsS0FBQSxDQUFLbUgsVUFBVSxDQUFDVixLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUF0RyxlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUV0RCxZQUFNO0VBQzFCLE1BQUEsSUFBQW9ILFdBQUEsR0FBZ0NwSCxLQUFBLENBQUtsUixLQUFLO1VBQWxDc0IsR0FBRyxHQUFBZ1gsV0FBQSxDQUFIaFgsR0FBRztVQUFFK0ssY0FBYyxHQUFBaU0sV0FBQSxDQUFkak0sY0FBYyxDQUFBO1FBRTNCLElBQUksQ0FBQ0EsY0FBYyxFQUFFO0VBQ25CLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBOztFQUVBO0VBQ0EsTUFBQSxJQUFNa00sTUFBTSxHQUFHaGEsVUFBVSxDQUFDK0MsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFBO0VBQzVDLE1BQUEsT0FBTytLLGNBQWMsQ0FBQ1UsR0FBRyxDQUFDd0wsTUFBTSxDQUFDLENBQUE7T0FDbEMsQ0FBQSxDQUFBO0VBRUQ7TUFBQWxILGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBQ21CLFlBQU07RUFDdkIsTUFBQSxJQUFBc0gsWUFBQSxHQUEwQnRILEtBQUEsQ0FBS2xSLEtBQUs7VUFBNUJzQixHQUFHLEdBQUFrWCxZQUFBLENBQUhsWCxHQUFHO1VBQUVtWCxRQUFRLEdBQUFELFlBQUEsQ0FBUkMsUUFBUSxDQUFBO1FBQ3JCLElBQUksQ0FBQ0EsUUFBUSxFQUFFO0VBQ2IsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFDQSxNQUFBLElBQU1GLE1BQU0sR0FBR2hhLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQTtFQUM1QztFQUNBLE1BQUEsSUFBSW1YLFFBQVEsQ0FBQ0MsR0FBRyxDQUFDSCxNQUFNLENBQUMsRUFBRTtVQUN4QixPQUFPLENBQUNFLFFBQVEsQ0FBQzFMLEdBQUcsQ0FBQ3dMLE1BQU0sQ0FBQyxDQUFDakwsU0FBUyxDQUFDLENBQUE7RUFDekMsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBK0QsZUFBQSxDQUFBSCxLQUFBLEVBQUEsV0FBQSxFQUVXLFlBQU07RUFDaEIsTUFBQSxJQUFBeUgsWUFBQSxHQUFvQ3pILEtBQUEsQ0FBS2xSLEtBQUs7VUFBdENzQixHQUFHLEdBQUFxWCxZQUFBLENBQUhyWCxHQUFHO1VBQUV4QixTQUFTLEdBQUE2WSxZQUFBLENBQVQ3WSxTQUFTO1VBQUVDLE9BQU8sR0FBQTRZLFlBQUEsQ0FBUDVZLE9BQU8sQ0FBQTtFQUMvQixNQUFBLElBQUksQ0FBQ0QsU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtFQUMxQixRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUNBLE1BQUEsT0FBT21ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRUMsT0FBTyxDQUFDLENBQUE7T0FDN0MsQ0FBQSxDQUFBO01BQUFzUixlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUFNO0VBQUEsTUFBQSxJQUFBMEgscUJBQUEsQ0FBQTtFQUN6QixNQUFBLElBQUFDLFlBQUEsR0FRSTNILEtBQUEsQ0FBS2xSLEtBQUs7VUFQWnNCLEdBQUcsR0FBQXVYLFlBQUEsQ0FBSHZYLEdBQUc7VUFDSHdYLFlBQVksR0FBQUQsWUFBQSxDQUFaQyxZQUFZO1VBQ1pDLFVBQVUsR0FBQUYsWUFBQSxDQUFWRSxVQUFVO1VBQ1ZDLFlBQVksR0FBQUgsWUFBQSxDQUFaRyxZQUFZO1VBQ1pDLDBCQUEwQixHQUFBSixZQUFBLENBQTFCSSwwQkFBMEI7VUFDMUJuWixTQUFTLEdBQUErWSxZQUFBLENBQVQvWSxTQUFTO1VBQ1RDLE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU8sQ0FBQTtFQUdULE1BQUEsSUFBTW1aLGFBQWEsR0FBQU4sQ0FBQUEscUJBQUEsR0FBRzFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQU4sSUFBQUEsSUFBQUEscUJBQUEsY0FBQUEscUJBQUEsR0FBSTFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtFQUV6RSxNQUFBLElBQ0UsRUFBRVcsWUFBWSxJQUFJQyxVQUFVLElBQUlDLFlBQVksQ0FBQyxJQUM3QyxDQUFDRSxhQUFhLElBQ2IsQ0FBQ0QsMEJBQTBCLElBQUkvSCxLQUFBLENBQUtvRyxVQUFVLEVBQUcsRUFDbEQ7RUFDQSxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUVBLE1BQUEsSUFDRXdCLFlBQVksSUFDWi9ZLE9BQU8sS0FDTlgsaUJBQVEsQ0FBQzhaLGFBQWEsRUFBRW5aLE9BQU8sQ0FBQyxJQUFJaUQsT0FBTyxDQUFDa1csYUFBYSxFQUFFblosT0FBTyxDQUFDLENBQUMsRUFDckU7RUFDQSxRQUFBLE9BQU9tRCxZQUFZLENBQUM1QixHQUFHLEVBQUU0WCxhQUFhLEVBQUVuWixPQUFPLENBQUMsQ0FBQTtFQUNsRCxPQUFBO0VBRUEsTUFBQSxJQUNFZ1osVUFBVSxJQUNWalosU0FBUyxLQUNSbVAsZUFBTyxDQUFDaUssYUFBYSxFQUFFcFosU0FBUyxDQUFDLElBQUlrRCxPQUFPLENBQUNrVyxhQUFhLEVBQUVwWixTQUFTLENBQUMsQ0FBQyxFQUN4RTtFQUNBLFFBQUEsT0FBT29ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRW9aLGFBQWEsQ0FBQyxDQUFBO0VBQ3BELE9BQUE7UUFFQSxJQUNFRixZQUFZLElBQ1psWixTQUFTLElBQ1QsQ0FBQ0MsT0FBTyxLQUNQa1AsZUFBTyxDQUFDaUssYUFBYSxFQUFFcFosU0FBUyxDQUFDLElBQUlrRCxPQUFPLENBQUNrVyxhQUFhLEVBQUVwWixTQUFTLENBQUMsQ0FBQyxFQUN4RTtFQUNBLFFBQUEsT0FBT29ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRW9aLGFBQWEsQ0FBQyxDQUFBO0VBQ3BELE9BQUE7RUFFQSxNQUFBLE9BQU8sS0FBSyxDQUFBO09BQ2IsQ0FBQSxDQUFBO01BQUE3SCxlQUFBLENBQUFILEtBQUEsRUFBQSx1QkFBQSxFQUV1QixZQUFNO0VBQUEsTUFBQSxJQUFBaUksc0JBQUEsQ0FBQTtFQUM1QixNQUFBLElBQUksQ0FBQ2pJLEtBQUEsQ0FBS2tJLGtCQUFrQixFQUFFLEVBQUU7RUFDOUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUFDLFlBQUEsR0FBeUNuSSxLQUFBLENBQUtsUixLQUFLO1VBQTNDc0IsR0FBRyxHQUFBK1gsWUFBQSxDQUFIL1gsR0FBRztVQUFFeEIsU0FBUyxHQUFBdVosWUFBQSxDQUFUdlosU0FBUztVQUFFZ1osWUFBWSxHQUFBTyxZQUFBLENBQVpQLFlBQVksQ0FBQTtFQUNwQyxNQUFBLElBQU1JLGFBQWEsR0FBQUMsQ0FBQUEsc0JBQUEsR0FBR2pJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQUMsSUFBQUEsSUFBQUEsc0JBQUEsY0FBQUEsc0JBQUEsR0FBSWpJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtFQUV6RSxNQUFBLElBQUlXLFlBQVksRUFBRTtFQUNoQixRQUFBLE9BQU9oVyxTQUFTLENBQUN4QixHQUFHLEVBQUU0WCxhQUFhLENBQUMsQ0FBQTtFQUN0QyxPQUFDLE1BQU07RUFDTCxRQUFBLE9BQU9wVyxTQUFTLENBQUN4QixHQUFHLEVBQUV4QixTQUFTLENBQUMsQ0FBQTtFQUNsQyxPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUF1UixlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUVxQixZQUFNO0VBQUEsTUFBQSxJQUFBb0ksc0JBQUEsQ0FBQTtFQUMxQixNQUFBLElBQUksQ0FBQ3BJLEtBQUEsQ0FBS2tJLGtCQUFrQixFQUFFLEVBQUU7RUFDOUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUFHLFlBQUEsR0FBbURySSxLQUFBLENBQUtsUixLQUFLO1VBQXJEc0IsR0FBRyxHQUFBaVksWUFBQSxDQUFIalksR0FBRztVQUFFdkIsT0FBTyxHQUFBd1osWUFBQSxDQUFQeFosT0FBTztVQUFFZ1osVUFBVSxHQUFBUSxZQUFBLENBQVZSLFVBQVU7VUFBRUMsWUFBWSxHQUFBTyxZQUFBLENBQVpQLFlBQVksQ0FBQTtFQUM5QyxNQUFBLElBQU1FLGFBQWEsR0FBQUksQ0FBQUEsc0JBQUEsR0FBR3BJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQUksSUFBQUEsSUFBQUEsc0JBQUEsY0FBQUEsc0JBQUEsR0FBSXBJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtRQUV6RSxJQUFJWSxVQUFVLElBQUlDLFlBQVksRUFBRTtFQUM5QixRQUFBLE9BQU9sVyxTQUFTLENBQUN4QixHQUFHLEVBQUU0WCxhQUFhLENBQUMsQ0FBQTtFQUN0QyxPQUFDLE1BQU07RUFDTCxRQUFBLE9BQU9wVyxTQUFTLENBQUN4QixHQUFHLEVBQUV2QixPQUFPLENBQUMsQ0FBQTtFQUNoQyxPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUFzUixlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBTTtFQUNuQixNQUFBLElBQUFzSSxZQUFBLEdBQW9DdEksS0FBQSxDQUFLbFIsS0FBSztVQUF0Q3NCLEdBQUcsR0FBQWtZLFlBQUEsQ0FBSGxZLEdBQUc7VUFBRXhCLFNBQVMsR0FBQTBaLFlBQUEsQ0FBVDFaLFNBQVM7VUFBRUMsT0FBTyxHQUFBeVosWUFBQSxDQUFQelosT0FBTyxDQUFBO0VBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBQ0EsTUFBQSxPQUFPK0MsU0FBUyxDQUFDaEQsU0FBUyxFQUFFd0IsR0FBRyxDQUFDLENBQUE7T0FDakMsQ0FBQSxDQUFBO01BQUErUCxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRVksWUFBTTtFQUNqQixNQUFBLElBQUF1SSxZQUFBLEdBQW9DdkksS0FBQSxDQUFLbFIsS0FBSztVQUF0Q3NCLEdBQUcsR0FBQW1ZLFlBQUEsQ0FBSG5ZLEdBQUc7VUFBRXhCLFNBQVMsR0FBQTJaLFlBQUEsQ0FBVDNaLFNBQVM7VUFBRUMsT0FBTyxHQUFBMFosWUFBQSxDQUFQMVosT0FBTyxDQUFBO0VBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBQ0EsTUFBQSxPQUFPK0MsU0FBUyxDQUFDL0MsT0FBTyxFQUFFdUIsR0FBRyxDQUFDLENBQUE7T0FDL0IsQ0FBQSxDQUFBO01BQUErUCxlQUFBLENBQUFILEtBQUEsRUFBQSxXQUFBLEVBRVcsWUFBTTtRQUNoQixJQUFNd0ksT0FBTyxHQUFHQyxhQUFNLENBQUN6SSxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUMsQ0FBQTtFQUN0QyxNQUFBLE9BQU9vWSxPQUFPLEtBQUssQ0FBQyxJQUFJQSxPQUFPLEtBQUssQ0FBQyxDQUFBO09BQ3RDLENBQUEsQ0FBQTtNQUFBckksZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07UUFDbkIsT0FDRUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBSyxLQUFLUyxTQUFTLElBQzlCLENBQUNpTSxLQUFBLENBQUtsUixLQUFLLENBQUN3RSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBS2lDLGlCQUFRLENBQUN5SyxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUMsQ0FBQTtPQUUzRCxDQUFBLENBQUE7TUFBQStQLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFZSxZQUFNO1FBQ3BCLE9BQ0VBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dFLEtBQUssS0FBS1MsU0FBUyxJQUM5QixDQUFDd0IsaUJBQVEsQ0FBQ3lLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUs0UCxLQUFBLENBQUtsUixLQUFLLENBQUN3RSxLQUFLLENBQUE7T0FFM0QsQ0FBQSxDQUFBO01BQUE2TSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsT0FBTUEsS0FBQSxDQUFLcE8sU0FBUyxDQUFDakcsT0FBTyxFQUFFLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUF3VSxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRWpDLFlBQU07RUFDakIsTUFBQSxJQUFJQSxLQUFBLENBQUtsUixLQUFLLENBQUMrWCxlQUFlLEVBQUU7RUFBQSxRQUFBLElBQUE2QixzQkFBQSxDQUFBO0VBQzlCLFFBQUEsT0FBQSxDQUFBQSxzQkFBQSxHQUFPMUksS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1ksYUFBYSxNQUFBNEIsSUFBQUEsSUFBQUEsc0JBQUEsdUJBQXhCQSxzQkFBQSxDQUEwQm5VLElBQUksQ0FBQyxVQUFDdkcsSUFBSSxFQUFBO0VBQUEsVUFBQSxPQUN6Q2dTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQy9ZLElBQUksQ0FBQyxDQUFBO0VBQUEsU0FDNUIsQ0FBQyxDQUFBO0VBQ0gsT0FBQTtRQUNBLE9BQU9nUyxLQUFBLENBQUsrRyxlQUFlLENBQUMvRyxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUMsQ0FBQTtPQUNqRCxDQUFBLENBQUE7RUFBQTdHLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVlLGVBQUEsRUFBQSxVQUFDaFMsSUFBSSxFQUFLO0VBQ3hCLE1BQUEsSUFBTTJhLFlBQVksR0FBRzNJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZaLFlBQVksR0FDeEMzSSxLQUFBLENBQUtsUixLQUFLLENBQUM2WixZQUFZLENBQUMzYSxJQUFJLENBQUMsR0FDN0IrRixTQUFTLENBQUE7RUFDYixNQUFBLE9BQU84TyxTQUFJLENBQ1QsdUJBQXVCLEVBQ3ZCOEYsWUFBWSxFQUNaLHlCQUF5QixHQUFHeFksZ0JBQWdCLENBQUM2UCxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUMsRUFDNUQ7RUFDRSxRQUFBLGlDQUFpQyxFQUFFNFAsS0FBQSxDQUFLb0csVUFBVSxFQUFFO0VBQ3BELFFBQUEsaUNBQWlDLEVBQUVwRyxLQUFBLENBQUs0SSxVQUFVLEVBQUU7RUFDcEQsUUFBQSxpQ0FBaUMsRUFBRTVJLEtBQUEsQ0FBSzZJLFVBQVUsRUFBRTtFQUNwRCxRQUFBLDBDQUEwQyxFQUFFN0ksS0FBQSxDQUFLOEksa0JBQWtCLEVBQUU7RUFDckUsUUFBQSxvQ0FBb0MsRUFBRTlJLEtBQUEsQ0FBSytJLFlBQVksRUFBRTtFQUN6RCxRQUFBLGtDQUFrQyxFQUFFL0ksS0FBQSxDQUFLZ0osVUFBVSxFQUFFO0VBQ3JELFFBQUEsaUNBQWlDLEVBQUVoSixLQUFBLENBQUtILFNBQVMsRUFBRTtFQUNuRCxRQUFBLDJDQUEyQyxFQUFFRyxLQUFBLENBQUtrSSxrQkFBa0IsRUFBRTtFQUN0RSxRQUFBLDhDQUE4QyxFQUM1Q2xJLEtBQUEsQ0FBS2lKLHFCQUFxQixFQUFFO0VBQzlCLFFBQUEsNENBQTRDLEVBQzFDakosS0FBQSxDQUFLa0osbUJBQW1CLEVBQUU7RUFDNUIsUUFBQSw4QkFBOEIsRUFBRWxKLEtBQUEsQ0FBS21KLFlBQVksRUFBRTtFQUNuRCxRQUFBLGdDQUFnQyxFQUFFbkosS0FBQSxDQUFLb0osU0FBUyxFQUFFO1VBQ2xELHNDQUFzQyxFQUNwQ3BKLEtBQUEsQ0FBS3FKLFlBQVksRUFBRSxJQUFJckosS0FBQSxDQUFLc0osYUFBYSxFQUFDO0VBQzlDLE9BQUMsRUFDRHRKLEtBQUEsQ0FBS3VKLG1CQUFtQixDQUFDLG9DQUFvQyxDQUFDLEVBQzlEdkosS0FBQSxDQUFLd0osZ0JBQWdCLEVBQ3ZCLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBckosZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07RUFDbkIsTUFBQSxJQUFBeUosWUFBQSxHQUlJekosS0FBQSxDQUFLbFIsS0FBSztVQUhac0IsR0FBRyxHQUFBcVosWUFBQSxDQUFIclosR0FBRztVQUFBc1oscUJBQUEsR0FBQUQsWUFBQSxDQUNIRSwwQkFBMEI7RUFBMUJBLFFBQUFBLDBCQUEwQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLFFBQVEsR0FBQUEscUJBQUE7VUFBQUUsc0JBQUEsR0FBQUgsWUFBQSxDQUNyQ0ksMkJBQTJCO0VBQTNCQSxRQUFBQSwyQkFBMkIsR0FBQUQsc0JBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxlQUFlLEdBQUFBLHNCQUFBLENBQUE7RUFHL0MsTUFBQSxJQUFNRSxNQUFNLEdBQ1Y5SixLQUFBLENBQUtvRyxVQUFVLEVBQUUsSUFBSXBHLEtBQUEsQ0FBSzRJLFVBQVUsRUFBRSxHQUNsQ2lCLDJCQUEyQixHQUMzQkYsMEJBQTBCLENBQUE7RUFFaEMsTUFBQSxPQUFBLEVBQUEsQ0FBQW5iLE1BQUEsQ0FBVXNiLE1BQU0sRUFBQXRiLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSW5CLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxNQUFNLEVBQUU0UCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQUMsQ0FBQSxDQUFBO09BQy9ELENBQUEsQ0FBQTtFQUVEO01BQUE4VCxlQUFBLENBQUFILEtBQUEsRUFBQSxVQUFBLEVBQ1csWUFBTTtFQUNmLE1BQUEsSUFBQStKLGFBQUEsR0FBb0QvSixLQUFBLENBQUtsUixLQUFLO1VBQXREc0IsR0FBRyxHQUFBMlosYUFBQSxDQUFIM1osR0FBRztVQUFBNFoscUJBQUEsR0FBQUQsYUFBQSxDQUFFeEMsUUFBUTtVQUFSQSxRQUFRLEdBQUF5QyxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLElBQUkxTyxHQUFHLEVBQUUsR0FBQTBPLHFCQUFBO1VBQUUvVixZQUFZLEdBQUE4VixhQUFBLENBQVo5VixZQUFZLENBQUE7RUFDL0MsTUFBQSxJQUFNZ1csU0FBUyxHQUFHNWMsVUFBVSxDQUFDK0MsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQy9DLElBQU04WixNQUFNLEdBQUcsRUFBRSxDQUFBO0VBQ2pCLE1BQUEsSUFBSTNDLFFBQVEsQ0FBQ0MsR0FBRyxDQUFDeUMsU0FBUyxDQUFDLEVBQUU7RUFDM0JDLFFBQUFBLE1BQU0sQ0FBQ25PLElBQUksQ0FBQW9PLEtBQUEsQ0FBWEQsTUFBTSxFQUFBL00sa0JBQUEsQ0FBU29LLFFBQVEsQ0FBQzFMLEdBQUcsQ0FBQ29PLFNBQVMsQ0FBQyxDQUFDRyxZQUFZLENBQUMsQ0FBQSxDQUFBO0VBQ3RELE9BQUE7RUFDQSxNQUFBLElBQUlwSyxLQUFBLENBQUs0SSxVQUFVLEVBQUUsRUFBRTtFQUNyQnNCLFFBQUFBLE1BQU0sQ0FBQ25PLElBQUksQ0FDVDlILFlBQVksS0FBWkEsSUFBQUEsSUFBQUEsWUFBWSxLQUFaQSxLQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxDQUFBQSxHQUFBQSxZQUFZLENBQ1I2RyxNQUFNLENBQUMsVUFBQ3RHLFdBQVcsRUFBQTtFQUFBLFVBQUEsT0FDbkI1QyxTQUFTLENBQUM0QyxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLEVBQUVwRSxHQUFHLENBQUMsQ0FBQTtFQUFBLFNBQ25FLENBQUMsQ0FDQTdDLEdBQUcsQ0FBQyxVQUFDaUgsV0FBVyxFQUFBO1lBQUEsT0FBS0EsV0FBVyxDQUFDNlYsT0FBTyxDQUFBO0VBQUEsU0FBQSxDQUM3QyxDQUFDLENBQUE7RUFDSCxPQUFBO0VBQ0EsTUFBQSxPQUFPSCxNQUFNLENBQUNyYyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7T0FDekIsQ0FBQSxDQUFBO0VBQUFzUyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsVUFBQ2dILFFBQVEsRUFBRUMsWUFBWSxFQUFLO1FBQ3hDLElBQU1xRCxXQUFXLEdBQUd0RCxRQUFRLElBQUloSCxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUE7UUFDbkQsSUFBTXVELGVBQWUsR0FBR3RELFlBQVksSUFBSWpILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtRQUMvRCxJQUFNdUQsUUFBUSxHQUNaLEVBQ0V4SyxLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLEtBQ3hCbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmIsY0FBYyxJQUFJLENBQUN6SyxLQUFBLENBQUswSyxhQUFhLEVBQUUsQ0FBQyxDQUNyRCxLQUNBMUssS0FBQSxDQUFLOEksa0JBQWtCLEVBQUUsSUFDdkI5SSxLQUFBLENBQUtwTyxTQUFTLENBQUMwWSxXQUFXLENBQUMsSUFDMUIxWSxTQUFTLENBQUMyWSxlQUFlLEVBQUVELFdBQVcsQ0FBRSxDQUFDLEdBQ3pDLENBQUMsR0FDRCxDQUFDLENBQUMsQ0FBQTtFQUVSLE1BQUEsT0FBT0UsUUFBUSxDQUFBO09BQ2hCLENBQUEsQ0FBQTtFQUVEO0VBQ0E7RUFDQTtNQUFBckssZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFDaUIsWUFBb0I7RUFBQSxNQUFBLElBQUEySyxtQkFBQSxDQUFBO0VBQUEsTUFBQSxJQUFuQkMsU0FBUyxHQUFBOVcsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO1FBQzlCLElBQUkrVyxjQUFjLEdBQUcsS0FBSyxDQUFBO0VBQzFCO0VBQ0E7UUFDQSxJQUNFN0ssS0FBQSxDQUFLOEssV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUN4QixDQUFDRixTQUFTLENBQUNHLGNBQWMsSUFDekIvSyxLQUFBLENBQUtwTyxTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUMsRUFDdkM7RUFDQTtFQUNBLFFBQUEsSUFBSSxDQUFDK0QsUUFBUSxDQUFDQyxhQUFhLElBQUlELFFBQVEsQ0FBQ0MsYUFBYSxLQUFLRCxRQUFRLENBQUNFLElBQUksRUFBRTtFQUN2RUwsVUFBQUEsY0FBYyxHQUFHLElBQUksQ0FBQTtFQUN2QixTQUFBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsUUFBQSxJQUFJN0ssS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxJQUFJLENBQUNuTCxLQUFBLENBQUtsUixLQUFLLENBQUNzYyxvQkFBb0IsRUFBRTtFQUN6RFAsVUFBQUEsY0FBYyxHQUFHLEtBQUssQ0FBQTtFQUN4QixTQUFBO0VBQ0E7RUFDQSxRQUFBLElBQ0U3SyxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFZLElBQ3ZCckwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdWMsWUFBWSxDQUFDckosT0FBTyxJQUMvQmhDLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VjLFlBQVksQ0FBQ3JKLE9BQU8sQ0FBQ3NKLFFBQVEsQ0FBQ04sUUFBUSxDQUFDQyxhQUFhLENBQUMsSUFDaEVELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDTSxTQUFTLENBQUNELFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUNsRTtFQUNBVCxVQUFBQSxjQUFjLEdBQUcsSUFBSSxDQUFBO0VBQ3ZCLFNBQUE7RUFDQTtVQUNBLElBQUk3SyxLQUFBLENBQUtsUixLQUFLLENBQUMwYywwQkFBMEIsSUFBSXhMLEtBQUEsQ0FBS3FKLFlBQVksRUFBRSxFQUFFO0VBQ2hFd0IsVUFBQUEsY0FBYyxHQUFHLEtBQUssQ0FBQTtFQUN4QixTQUFBO1VBQ0EsSUFBSTdLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJjLDRCQUE0QixJQUFJekwsS0FBQSxDQUFLc0osYUFBYSxFQUFFLEVBQUU7RUFDbkV1QixVQUFBQSxjQUFjLEdBQUcsS0FBSyxDQUFBO0VBQ3hCLFNBQUE7RUFDRixPQUFBO0VBRUFBLE1BQUFBLGNBQWMsS0FBQUYsQ0FBQUEsbUJBQUEsR0FBSTNLLEtBQUEsQ0FBSzBMLEtBQUssQ0FBQzFKLE9BQU8sTUFBQSxJQUFBLElBQUEySSxtQkFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFsQkEsbUJBQUEsQ0FBb0JnQixLQUFLLENBQUM7RUFBRUMsUUFBQUEsYUFBYSxFQUFFLElBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQSxDQUFBO09BQ3JFLENBQUEsQ0FBQTtNQUFBekwsZUFBQSxDQUFBSCxLQUFBLEVBQUEsbUJBQUEsRUFFbUIsWUFBTTtFQUN4QixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBjLDBCQUEwQixJQUFJeEwsS0FBQSxDQUFLcUosWUFBWSxFQUFFLEVBQzlELE9BQU8sSUFBSSxDQUFBO0VBQ2IsTUFBQSxJQUFJckosS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmMsNEJBQTRCLElBQUl6TCxLQUFBLENBQUtzSixhQUFhLEVBQUUsRUFDakUsT0FBTyxJQUFJLENBQUE7RUFDYixNQUFBLE9BQU90SixLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBaUIsR0FDL0I3TCxLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBaUIsQ0FBQ3hOLGVBQU8sQ0FBQzJCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsQ0FBQyxFQUFFNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLEdBQ3JFaU8sZUFBTyxDQUFDMkIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLENBQUE7T0FDNUIsQ0FBQSxDQUFBO01BQUErUCxlQUFBLENBQUFILEtBQUEsRUFFUSxRQUFBLEVBQUEsWUFBQTtRQUFBLG9CQUNQUSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQ0VxQyxHQUFHLEVBQUU5QyxLQUFBLENBQUswTCxLQUFNO1VBQ2hCdFAsU0FBUyxFQUFFNEQsS0FBQSxDQUFLOEwsYUFBYSxDQUFDOUwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFFO1VBQzlDMmIsU0FBUyxFQUFFL0wsS0FBQSxDQUFLd0csZUFBZ0I7VUFDaEM5RixPQUFPLEVBQUVWLEtBQUEsQ0FBS2dNLFdBQVk7RUFDMUIzRixRQUFBQSxZQUFZLEVBQ1YsQ0FBQ3JHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21kLGVBQWUsR0FBR2pNLEtBQUEsQ0FBS2tNLGdCQUFnQixHQUFHblksU0FDdkQ7VUFDRG9ZLGNBQWMsRUFDWm5NLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21kLGVBQWUsR0FBR2pNLEtBQUEsQ0FBS2tNLGdCQUFnQixHQUFHblksU0FDdEQ7RUFDRHlXLFFBQUFBLFFBQVEsRUFBRXhLLEtBQUEsQ0FBSzhLLFdBQVcsRUFBRztFQUM3QixRQUFBLFlBQUEsRUFBWTlLLEtBQUEsQ0FBS29NLFlBQVksRUFBRztFQUNoQ0MsUUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYkMsUUFBQUEsS0FBSyxFQUFFdE0sS0FBQSxDQUFLdU0sUUFBUSxFQUFHO0VBQ3ZCLFFBQUEsZUFBQSxFQUFldk0sS0FBQSxDQUFLb0csVUFBVSxFQUFHO1VBQ2pDLGNBQWNwRyxFQUFBQSxLQUFBLENBQUttSixZQUFZLEVBQUUsR0FBRyxNQUFNLEdBQUdwVixTQUFVO1VBQ3ZELGVBQWVpTSxFQUFBQSxLQUFBLENBQUs2SSxVQUFVLEVBQUUsSUFBSTdJLEtBQUEsQ0FBS0gsU0FBUyxFQUFDO0VBQUUsT0FBQSxFQUVwREcsS0FBQSxDQUFLNkwsaUJBQWlCLEVBQUUsRUFDeEI3TCxLQUFBLENBQUt1TSxRQUFRLEVBQUUsS0FBSyxFQUFFLGlCQUNyQi9MLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyxTQUFBO0VBQVMsT0FBQSxFQUFFNEQsS0FBQSxDQUFLdU0sUUFBUSxFQUFTLENBRWhELENBQUMsQ0FBQTtPQUNQLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQXZNLEtBQUEsQ0FBQTtFQUFBLEdBQUE7SUFBQTRCLFNBQUEsQ0FBQXVFLEdBQUEsRUFBQXBHLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUFzRSxHQUFBLEVBQUEsQ0FBQTtNQUFBeEssR0FBQSxFQUFBLG1CQUFBO01BQUEvUCxLQUFBLEVBeFlELFNBQUFrVyxpQkFBQUEsR0FBb0I7UUFDbEIsSUFBSSxDQUFDMEssY0FBYyxFQUFFLENBQUE7RUFDdkIsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBN1EsR0FBQSxFQUFBLG9CQUFBO0VBQUEvUCxJQUFBQSxLQUFBLEVBRUQsU0FBQTZnQixrQkFBbUI3QixDQUFBQSxTQUFTLEVBQUU7RUFDNUIsTUFBQSxJQUFJLENBQUM0QixjQUFjLENBQUM1QixTQUFTLENBQUMsQ0FBQTtFQUNoQyxLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBMUQ4QnBLLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDakJQLElBRXBCMEosVUFBVSwwQkFBQTNNLGdCQUFBLEVBQUE7RUFBQSxFQUFBLFNBQUEyTSxVQUFBLEdBQUE7RUFBQSxJQUFBLElBQUExTSxLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBeU0sVUFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQXRKLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUF3TSxVQUFBLEVBQUFsZSxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLGVBa0NkUSxzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUEsQ0FBQTtFQUFBeEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWxCLGFBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDdkIsTUFBQSxJQUFJUyxLQUFBLENBQUtsUixLQUFLLENBQUM0UixPQUFPLEVBQUU7RUFDdEJWLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRSLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQyxDQUFBO0VBQzNCLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQVksSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWlCLGlCQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQzNCLE1BQUEsSUFBTStHLFFBQVEsR0FBRy9HLEtBQUssQ0FBQzVELEdBQUcsQ0FBQTtRQUMxQixJQUFJMkssUUFBUSxLQUFLLEdBQUcsRUFBRTtVQUNwQi9HLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO1VBQ3RCaEgsS0FBSyxDQUFDNUQsR0FBRyxHQUFHLE9BQU8sQ0FBQTtFQUNyQixPQUFBO0VBRUFxRSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUMwWCxlQUFlLENBQUNqSCxLQUFLLENBQUMsQ0FBQTtPQUNsQyxDQUFBLENBQUE7TUFBQVksZUFBQSxDQUFBSCxLQUFBLEVBRW9CLG9CQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsT0FDbkIsQ0FBQ0EsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlgsMEJBQTBCLElBQ3RDLENBQUMvVSxTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxJQUNoRHBWLFNBQVMsQ0FBQ29PLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBOUcsZUFBQSxDQUFBSCxLQUFBLEVBRXZDLGFBQUEsRUFBQSxZQUFBO1FBQUEsT0FDWkEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBYyxJQUN6QmxILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJiLGNBQWMsS0FDeEJ6SyxLQUFBLENBQUs4SSxrQkFBa0IsRUFBRSxJQUN2QmxYLFNBQVMsQ0FBQ29PLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLElBQzlDcFYsU0FBUyxDQUFDb08sS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFFLENBQUMsR0FDekQsQ0FBQyxHQUNELENBQUMsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFFUjtFQUNBO0VBQ0E7TUFBQTdHLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHVCQUFBLEVBQ3dCLFlBQW9CO0VBQUEsTUFBQSxJQUFuQjRLLFNBQVMsR0FBQTlXLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEVBQUUsQ0FBQTtRQUNyQyxJQUFJNlkscUJBQXFCLEdBQUcsS0FBSyxDQUFBO0VBQ2pDO0VBQ0E7UUFDQSxJQUNFM00sS0FBQSxDQUFLOEssV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUN4QixDQUFDRixTQUFTLENBQUNHLGNBQWMsSUFDekJuWixTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQyxFQUNuRDtFQUNBO0VBQ0EsUUFBQSxJQUFJLENBQUMrRCxRQUFRLENBQUNDLGFBQWEsSUFBSUQsUUFBUSxDQUFDQyxhQUFhLEtBQUtELFFBQVEsQ0FBQ0UsSUFBSSxFQUFFO0VBQ3ZFeUIsVUFBQUEscUJBQXFCLEdBQUcsSUFBSSxDQUFBO0VBQzlCLFNBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQSxRQUFBLElBQUkzTSxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLElBQUksQ0FBQ25MLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NjLG9CQUFvQixFQUFFO0VBQ3pEdUIsVUFBQUEscUJBQXFCLEdBQUcsS0FBSyxDQUFBO0VBQy9CLFNBQUE7RUFDQTtFQUNBLFFBQUEsSUFDRTNNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VjLFlBQVksSUFDdkJyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFZLENBQUNySixPQUFPLElBQy9CaEMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdWMsWUFBWSxDQUFDckosT0FBTyxDQUFDc0osUUFBUSxDQUFDTixRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUNoRUQsUUFBUSxDQUFDQyxhQUFhLElBQ3RCRCxRQUFRLENBQUNDLGFBQWEsQ0FBQ00sU0FBUyxDQUFDRCxRQUFRLENBQ3ZDLCtCQUNGLENBQUMsRUFDRDtFQUNBcUIsVUFBQUEscUJBQXFCLEdBQUcsSUFBSSxDQUFBO0VBQzlCLFNBQUE7RUFDRixPQUFBO0VBRUFBLE1BQUFBLHFCQUFxQixJQUNuQjNNLEtBQUEsQ0FBSzRNLFlBQVksQ0FBQzVLLE9BQU8sSUFDekJoQyxLQUFBLENBQUs0TSxZQUFZLENBQUM1SyxPQUFPLENBQUMySixLQUFLLENBQUM7RUFBRUMsUUFBQUEsYUFBYSxFQUFFLElBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQTtPQUMzRCxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUE1TCxLQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE0QixTQUFBLENBQUE4SyxVQUFBLEVBQUEzTSxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBNkssVUFBQSxFQUFBLENBQUE7TUFBQS9RLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQS9FRCxTQUFBa1csaUJBQUFBLEdBQW9CO1FBQ2xCLElBQUksQ0FBQytLLHFCQUFxQixFQUFFLENBQUE7RUFDOUIsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBbFIsR0FBQSxFQUFBLG9CQUFBO0VBQUEvUCxJQUFBQSxLQUFBLEVBRUQsU0FBQTZnQixrQkFBbUI3QixDQUFBQSxTQUFTLEVBQUU7RUFDNUIsTUFBQSxJQUFJLENBQUNpQyxxQkFBcUIsQ0FBQ2pDLFNBQVMsQ0FBQyxDQUFBO0VBQ3ZDLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQWpQLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBMkVELFNBQUErVyxNQUFBQSxHQUFTO0VBQ1AsTUFBQSxJQUFBeUUsV0FBQSxHQUEyRCxJQUFJLENBQUN0WSxLQUFLO1VBQTdEZ2UsVUFBVSxHQUFBMUYsV0FBQSxDQUFWMEYsVUFBVTtVQUFBQyxxQkFBQSxHQUFBM0YsV0FBQSxDQUFFNEYsZUFBZTtFQUFmQSxRQUFBQSxlQUFlLEdBQUFELHFCQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsT0FBTyxHQUFBQSxxQkFBQTtVQUFFck0sT0FBTyxHQUFBMEcsV0FBQSxDQUFQMUcsT0FBTyxDQUFBO0VBRXRELE1BQUEsSUFBTXVNLGlCQUFpQixHQUFHO0VBQ3hCLFFBQUEsK0JBQStCLEVBQUUsSUFBSTtVQUNyQywwQ0FBMEMsRUFBRSxDQUFDLENBQUN2TSxPQUFPO0VBQ3JELFFBQUEseUNBQXlDLEVBQ3ZDLENBQUMsQ0FBQ0EsT0FBTyxJQUFJOU8sU0FBUyxDQUFDLElBQUksQ0FBQzlDLEtBQUssQ0FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQ2MsS0FBSyxDQUFDa1ksUUFBUSxDQUFDO0VBQzlELFFBQUEsa0RBQWtELEVBQ2hELElBQUksQ0FBQzhCLGtCQUFrQixFQUFDO1NBQzNCLENBQUE7UUFDRCxvQkFDRXRJLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7VUFDRXFDLEdBQUcsRUFBRSxJQUFJLENBQUM4SixZQUFhO0VBQ3ZCeFEsUUFBQUEsU0FBUyxFQUFFeUcsU0FBSSxDQUFDb0ssaUJBQWlCLENBQUU7VUFDbkMsWUFBQXplLEVBQUFBLEVBQUFBLENBQUFBLE1BQUEsQ0FBZXdlLGVBQWUsRUFBQXhlLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSSxJQUFJLENBQUNNLEtBQUssQ0FBQ2dlLFVBQVUsQ0FBRztVQUMxRHBNLE9BQU8sRUFBRSxJQUFJLENBQUNzTCxXQUFZO1VBQzFCRCxTQUFTLEVBQUUsSUFBSSxDQUFDdkYsZUFBZ0I7RUFDaENnRSxRQUFBQSxRQUFRLEVBQUUsSUFBSSxDQUFDTSxXQUFXLEVBQUM7RUFBRSxPQUFBLEVBRTVCZ0MsVUFDRSxDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtNQUFBblIsR0FBQSxFQUFBLGNBQUE7TUFBQUUsR0FBQSxFQWpJRCxTQUFBQSxHQUFBQSxHQUEwQjtRQUN4QixPQUFPO0VBQ0xtUixRQUFBQSxlQUFlLEVBQUUsT0FBQTtTQUNsQixDQUFBO0VBQ0gsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQUxxQ3hNLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDQ29CLElBRXREa0ssSUFBSSwwQkFBQW5OLGdCQUFBLEVBQUE7RUFBQSxFQUFBLFNBQUFtTixJQUFBLEdBQUE7RUFBQSxJQUFBLElBQUFsTixLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBaU4sSUFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQTlKLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFnTixJQUFBLEVBQUExZSxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQTBFTixVQUFDNVAsR0FBRyxFQUFFbVAsS0FBSyxFQUFLO0VBQy9CLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWUsVUFBVSxFQUFFO1VBQ3pCbk4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWUsVUFBVSxDQUFDL2MsR0FBRyxFQUFFbVAsS0FBSyxDQUFDLENBQUE7RUFDbkMsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDNVAsR0FBRyxFQUFLO0VBQzdCLE1BQUEsSUFBSTRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NlLGVBQWUsRUFBRTtFQUM5QnBOLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NlLGVBQWUsQ0FBQ2hkLEdBQUcsQ0FBQyxDQUFBO0VBQ2pDLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQStQLGVBQUEsQ0FBQUgsS0FBQSxFQUVpQixpQkFBQSxFQUFBLFVBQUM1UCxHQUFHLEVBQUUwYyxVQUFVLEVBQUV2TixLQUFLLEVBQUs7UUFDNUMsSUFBSSxPQUFPUyxLQUFBLENBQUtsUixLQUFLLENBQUN1ZSxZQUFZLEtBQUssVUFBVSxFQUFFO1VBQ2pEck4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDdWUsWUFBWSxDQUFDamQsR0FBRyxFQUFFMGMsVUFBVSxFQUFFdk4sS0FBSyxDQUFDLENBQUE7RUFDakQsT0FBQTtFQUNBLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBYyxFQUFFO0VBQzdCbEgsUUFBQUEsS0FBQSxDQUFLc04sY0FBYyxDQUFDbGQsR0FBRyxFQUFFbVAsS0FBSyxDQUFDLENBQUE7RUFDakMsT0FBQTtFQUNBLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWUsbUJBQW1CLEVBQUU7RUFDbEN2TixRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDM0IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBbkUsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBSztFQUMzQixNQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUMwZSxnQkFBZ0IsRUFBRTtFQUMvQixRQUFBLE9BQU94TixLQUFBLENBQUtsUixLQUFLLENBQUMwZSxnQkFBZ0IsQ0FBQ3hmLElBQUksQ0FBQyxDQUFBO0VBQzFDLE9BQUE7UUFDQSxPQUFPaUMsT0FBTyxDQUFDakMsSUFBSSxDQUFDLENBQUE7T0FDckIsQ0FBQSxDQUFBO01BQUFtUyxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRVksWUFBTTtFQUNqQixNQUFBLElBQU12UCxXQUFXLEdBQUd1UCxLQUFBLENBQUt2UCxXQUFXLEVBQUUsQ0FBQTtRQUN0QyxJQUFNZ2QsSUFBSSxHQUFHLEVBQUUsQ0FBQTtFQUNmLE1BQUEsSUFBTVgsVUFBVSxHQUFHOU0sS0FBQSxDQUFLd04sZ0JBQWdCLENBQUMvYyxXQUFXLENBQUMsQ0FBQTtFQUNyRCxNQUFBLElBQUl1UCxLQUFBLENBQUtsUixLQUFLLENBQUMyYixjQUFjLEVBQUU7VUFDN0IsSUFBTWlELGFBQWEsR0FDakIxTixLQUFBLENBQUtsUixLQUFLLENBQUN1ZSxZQUFZLElBQUlyTixLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLEdBQ2hEbEgsS0FBQSxDQUFLMk4sZUFBZSxDQUFDL00sSUFBSSxDQUFBWixLQUFBLEVBQU92UCxXQUFXLEVBQUVxYyxVQUFVLENBQUMsR0FDeEQvWSxTQUFTLENBQUE7RUFDZjBaLFFBQUFBLElBQUksQ0FBQzFSLElBQUksZUFDUHlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2lNLFVBQVUsRUFBQTtFQUNUL1EsVUFBQUEsR0FBRyxFQUFDLEdBQUc7RUFDUG1SLFVBQUFBLFVBQVUsRUFBRUEsVUFBVztFQUN2QjllLFVBQUFBLElBQUksRUFBRXlDLFdBQVk7RUFDbEJpUSxVQUFBQSxPQUFPLEVBQUVnTixhQUFjO0VBQ3ZCMUcsVUFBQUEsUUFBUSxFQUFFaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUztFQUM5QkMsVUFBQUEsWUFBWSxFQUFFakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBYTtFQUN0QytGLFVBQUFBLGVBQWUsRUFBRWhOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tlLGVBQWdCO0VBQzVDOUYsVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBZTtFQUMxQ3VELFVBQUFBLGNBQWMsRUFBRXpLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJiLGNBQWU7RUFDMUM5RCxVQUFBQSwwQkFBMEIsRUFBRTNHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEyQjtFQUNsRUgsVUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7RUFDNUN1RSxVQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtsUixLQUFLLENBQUNpYyxjQUFlO0VBQzFDTSxVQUFBQSxZQUFZLEVBQUVyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFBQTtFQUFhLFNBQ3ZDLENBQ0gsQ0FBQyxDQUFBO0VBQ0gsT0FBQTtRQUNBLE9BQU9vQyxJQUFJLENBQUNqZixNQUFNLENBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUNqQixHQUFHLENBQUMsVUFBQ3FnQixNQUFNLEVBQUs7RUFDcEMsUUFBQSxJQUFNeGQsR0FBRyxHQUFHeWQsZUFBTyxDQUFDcGQsV0FBVyxFQUFFbWQsTUFBTSxDQUFDLENBQUE7RUFDeEMsUUFBQSxvQkFDRXBOLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBGLEdBQUcsRUFBQTtFQUNGd0QsVUFBQUEsMEJBQTBCLEVBQUUzSixLQUFBLENBQUtsUixLQUFLLENBQUNnZix3QkFBeUI7RUFDaEVqRSxVQUFBQSwyQkFBMkIsRUFBRTdKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lmLDBCQUEyQjtFQUNuRXBTLFVBQUFBLEdBQUcsRUFBRXZMLEdBQUcsQ0FBQzRkLE9BQU8sRUFBRztFQUNuQjVkLFVBQUFBLEdBQUcsRUFBRUEsR0FBSTtFQUNUa0QsVUFBQUEsS0FBSyxFQUFFME0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBTTtZQUN4Qm9OLE9BQU8sRUFBRVYsS0FBQSxDQUFLc04sY0FBYyxDQUFDMU0sSUFBSSxDQUFBWixLQUFBLEVBQU81UCxHQUFHLENBQUU7RUFDN0M2YixVQUFBQSxlQUFlLEVBQUVqTSxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFnQjtZQUM1QzVGLFlBQVksRUFBRXJHLEtBQUEsQ0FBS2lPLG1CQUFtQixDQUFDck4sSUFBSSxDQUFBWixLQUFBLEVBQU81UCxHQUFHLENBQUU7RUFDdkQ3RCxVQUFBQSxPQUFPLEVBQUV5VCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFRO0VBQzVCeUgsVUFBQUEsT0FBTyxFQUFFZ00sS0FBQSxDQUFLbFIsS0FBSyxDQUFDa0YsT0FBUTtFQUM1QnhELFVBQUFBLGdCQUFnQixFQUFFd1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQWlCO0VBQzlDeUQsVUFBQUEsWUFBWSxFQUFFK0wsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbUYsWUFBYTtFQUN0Q0MsVUFBQUEsb0JBQW9CLEVBQUU4TCxLQUFBLENBQUtsUixLQUFLLENBQUNvRixvQkFBcUI7RUFDdERDLFVBQUFBLFlBQVksRUFBRTZMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FGLFlBQWE7RUFDdENDLFVBQUFBLG9CQUFvQixFQUFFNEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0Ysb0JBQXFCO0VBQ3REK0csVUFBQUEsY0FBYyxFQUFFNkUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcU0sY0FBZTtFQUMxQ29NLFVBQUFBLFFBQVEsRUFBRXZILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lZLFFBQVM7RUFDOUJTLFVBQUFBLGFBQWEsRUFBRWhJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWM7RUFDeEMzVCxVQUFBQSxVQUFVLEVBQUUyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1RixVQUFXO0VBQ2xDNFMsVUFBQUEsWUFBWSxFQUFFakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBYTtFQUN0Q0QsVUFBQUEsUUFBUSxFQUFFaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUztFQUM5QlksVUFBQUEsWUFBWSxFQUFFNUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOFksWUFBYTtFQUN0Q0MsVUFBQUEsVUFBVSxFQUFFN0gsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK1ksVUFBVztFQUNsQ0MsVUFBQUEsWUFBWSxFQUFFOUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1osWUFBYTtFQUN0Q1osVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBZTtFQUMxQ3VELFVBQUFBLGNBQWMsRUFBRXpLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJiLGNBQWU7RUFDMUMxQyxVQUFBQSwwQkFBMEIsRUFBRS9ILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2laLDBCQUEyQjtFQUNsRWxCLFVBQUFBLGVBQWUsRUFBRTdHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytYLGVBQWdCO0VBQzVDQyxVQUFBQSxhQUFhLEVBQUU5RyxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFjO0VBQ3hDbFksVUFBQUEsU0FBUyxFQUFFb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFVO0VBQ2hDQyxVQUFBQSxPQUFPLEVBQUVtUixLQUFBLENBQUtsUixLQUFLLENBQUNELE9BQVE7RUFDNUI4WixVQUFBQSxZQUFZLEVBQUUzSSxLQUFBLENBQUtsUixLQUFLLENBQUM2WixZQUFhO0VBQ3RDa0QsVUFBQUEsaUJBQWlCLEVBQUU3TCxLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBa0I7RUFDaERsRixVQUFBQSwwQkFBMEIsRUFBRTNHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEyQjtFQUNsRUgsVUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7RUFDNUN1RSxVQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtsUixLQUFLLENBQUNpYyxjQUFlO0VBQzFDTSxVQUFBQSxZQUFZLEVBQUVyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFhO0VBQ3RDRixVQUFBQSxNQUFNLEVBQUVuTCxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFPO0VBQzFCQyxVQUFBQSxvQkFBb0IsRUFBRXBMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NjLG9CQUFxQjtFQUN0REksVUFBQUEsMEJBQTBCLEVBQUV4TCxLQUFBLENBQUtsUixLQUFLLENBQUMwYywwQkFBMkI7RUFDbEVDLFVBQUFBLDRCQUE0QixFQUMxQnpMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJjLDRCQUNaO0VBQ0RwZixVQUFBQSxNQUFNLEVBQUUyVCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFBQTtFQUFPLFNBQzNCLENBQUMsQ0FBQTtFQUVOLE9BQUMsQ0FDSCxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7TUFBQThULGVBQUEsQ0FBQUgsS0FBQSxFQUVhLGFBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUNaelAsY0FBYyxDQUNaeVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUNkNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUNiLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUEyUCxlQUFBLENBQUFILEtBQUEsRUFFa0Isb0JBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUNuQixDQUFDQSxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsSUFDdEMsQ0FBQy9VLFNBQVMsQ0FBQ29PLEtBQUEsQ0FBS3ZQLFdBQVcsRUFBRSxFQUFFdVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLElBQ25EcFYsU0FBUyxDQUFDb08sS0FBQSxDQUFLdlAsV0FBVyxFQUFFLEVBQUV1UCxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxPQUFBakgsS0FBQSxDQUFBO0VBQUEsR0FBQTtJQUFBNEIsU0FBQSxDQUFBc0wsSUFBQSxFQUFBbk4sZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQXFMLElBQUEsRUFBQSxDQUFBO01BQUF2UixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUV4RCxTQUFBK1csTUFBQUEsR0FBUztFQUNQLE1BQUEsSUFBTXNLLGlCQUFpQixHQUFHO0VBQ3hCLFFBQUEsd0JBQXdCLEVBQUUsSUFBSTtFQUM5QixRQUFBLGtDQUFrQyxFQUFFcmIsU0FBUyxDQUMzQyxJQUFJLENBQUNuQixXQUFXLEVBQUUsRUFDbEIsSUFBSSxDQUFDM0IsS0FBSyxDQUFDa1ksUUFDYixDQUFDO0VBQ0QsUUFBQSwyQ0FBMkMsRUFBRSxJQUFJLENBQUM4QixrQkFBa0IsRUFBQztTQUN0RSxDQUFBO1FBQ0Qsb0JBQU90SSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQUtyRSxTQUFTLEVBQUV5RyxTQUFJLENBQUNvSyxpQkFBaUIsQ0FBQTtFQUFFLE9BQUEsRUFBRSxJQUFJLENBQUNpQixVQUFVLEVBQVEsQ0FBQyxDQUFBO0VBQzNFLEtBQUE7RUFBQyxHQUFBLENBQUEsRUFBQSxDQUFBO01BQUF2UyxHQUFBLEVBQUEsY0FBQTtNQUFBRSxHQUFBLEVBaE5ELFNBQUFBLEdBQUFBLEdBQTBCO1FBQ3hCLE9BQU87RUFDTDBSLFFBQUFBLG1CQUFtQixFQUFFLElBQUE7U0FDdEIsQ0FBQTtFQUNILEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0FMK0IvTSxDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ0ZqRCxJQUFNbUwsZ0NBQWdDLEdBQUcsQ0FBQyxDQUFBO0VBRTFDLElBQU1DLG9CQUFvQixHQUFHO0VBQzNCQyxFQUFBQSxXQUFXLEVBQUUsYUFBYTtFQUMxQkMsRUFBQUEsYUFBYSxFQUFFLGVBQWU7RUFDOUJDLEVBQUFBLFlBQVksRUFBRSxjQUFBO0VBQ2hCLENBQUMsQ0FBQTtFQUNELElBQU1DLGFBQWEsR0FBQXJPLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQ2hCaU8sRUFBQUEsRUFBQUEsb0JBQW9CLENBQUNDLFdBQVcsRUFBRztFQUNsQ0ksRUFBQUEsSUFBSSxFQUFFLENBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ1Q7RUFDREMsRUFBQUEsd0JBQXdCLEVBQUUsQ0FBQTtFQUM1QixDQUFDLENBQ0FOLEVBQUFBLG9CQUFvQixDQUFDRSxhQUFhLEVBQUc7RUFDcENHLEVBQUFBLElBQUksRUFBRSxDQUNKLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNULENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDWjtFQUNEQyxFQUFBQSx3QkFBd0IsRUFBRSxDQUFBO0VBQzVCLENBQUMsQ0FDQU4sRUFBQUEsb0JBQW9CLENBQUNHLFlBQVksRUFBRztFQUNuQ0UsRUFBQUEsSUFBSSxFQUFFLENBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ2Y7RUFDREMsRUFBQUEsd0JBQXdCLEVBQUUsQ0FBQTtFQUM1QixDQUFDLENBQ0YsQ0FBQTtFQUNELElBQU1DLGtDQUFrQyxHQUFHLENBQUMsQ0FBQTtFQUU1QyxTQUFTQyxxQkFBcUJBLENBQzVCQyw2QkFBNkIsRUFDN0JDLDRCQUE0QixFQUM1QjtFQUNBLEVBQUEsSUFBSUQsNkJBQTZCLEVBQUUsT0FBT1Qsb0JBQW9CLENBQUNHLFlBQVksQ0FBQTtFQUMzRSxFQUFBLElBQUlPLDRCQUE0QixFQUFFLE9BQU9WLG9CQUFvQixDQUFDQyxXQUFXLENBQUE7SUFDekUsT0FBT0Qsb0JBQW9CLENBQUNFLGFBQWEsQ0FBQTtFQUMzQyxDQUFBO0VBQUMsSUFFb0JTLEtBQUssMEJBQUFoUCxnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBZ1AsS0FBQSxHQUFBO0VBQUEsSUFBQSxJQUFBL08sS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQThPLEtBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxLQUFBLElBQUEzTCxJQUFBLEdBQUF0UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF1VixJQUFBLEdBQUF4VyxJQUFBQSxLQUFBLENBQUF1VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtFQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXhQLEdBQUFBLFNBQUEsQ0FBQXdQLElBQUEsQ0FBQSxDQUFBO0VBQUEsS0FBQTtFQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBNk8sS0FBQSxFQUFBdmdCLEVBQUFBLENBQUFBLE1BQUEsQ0FBQTZVLElBQUEsQ0FBQSxDQUFBLENBQUE7TUFBQWxELGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFlBQUEsRUFtRlg3QyxrQkFBQSxDQUFJdFEsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFFVSxDQUFBQSxHQUFHLENBQUMsWUFBQTtFQUFBLE1BQUEsb0JBQU1pVCxzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUE7T0FBQyxDQUFBLENBQUEsQ0FBQTtNQUFBeEIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUN6QzdDLGtCQUFBLENBQUl0USxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUVVLENBQUFBLEdBQUcsQ0FBQyxZQUFBO0VBQUEsTUFBQSxvQkFBTWlULHNCQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQTtPQUFDLENBQUEsQ0FBQSxDQUFBO0VBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFNUMsWUFBQSxFQUFBLFVBQUNoUyxJQUFJLEVBQUE7UUFBQSxPQUFLbVgsYUFBbUIsQ0FBQ25YLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQXFSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUUvQyxZQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBQTtRQUFBLE9BQUttWCxhQUFtQixDQUFDblgsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBcVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFM0MsVUFBQzVQLEdBQUcsRUFBRW1QLEtBQUssRUFBSztFQUMvQixNQUFBLElBQUlTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FlLFVBQVUsRUFBRTtFQUN6Qm5OLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FlLFVBQVUsQ0FBQy9jLEdBQUcsRUFBRW1QLEtBQUssRUFBRVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa2dCLGNBQWMsQ0FBQyxDQUFBO0VBQzlELE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQTdPLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUM1UCxHQUFHLEVBQUs7RUFDN0IsTUFBQSxJQUFJNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2UsZUFBZSxFQUFFO0VBQzlCcE4sUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2UsZUFBZSxDQUFDaGQsR0FBRyxDQUFDLENBQUE7RUFDakMsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBK1AsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtFQUN2QixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21nQixZQUFZLEVBQUU7RUFDM0JqUCxRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNtZ0IsWUFBWSxFQUFFLENBQUE7RUFDM0IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBOU8sSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW1CLG1CQUFBLEVBQUEsVUFBQzdLLENBQUMsRUFBSztFQUN6QixNQUFBLElBQUFpUyxXQUFBLEdBQW9DcEgsS0FBQSxDQUFLbFIsS0FBSztVQUF0Q3NCLEdBQUcsR0FBQWdYLFdBQUEsQ0FBSGhYLEdBQUc7VUFBRXhCLFNBQVMsR0FBQXdZLFdBQUEsQ0FBVHhZLFNBQVM7VUFBRUMsT0FBTyxHQUFBdVksV0FBQSxDQUFQdlksT0FBTyxDQUFBO0VBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBQ0EsTUFBQSxPQUFPc1csV0FBaUIsQ0FBQ0EsaUJBQWMsQ0FBQy9VLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxFQUFFdkcsU0FBUyxDQUFDLENBQUE7T0FDNUQsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDM0osQ0FBQyxFQUFLO0VBQzNCLE1BQUEsSUFBQWlSLFlBQUEsR0FBb0N0SCxLQUFBLENBQUtsUixLQUFLO1VBQXRDc0IsR0FBRyxHQUFBa1gsWUFBQSxDQUFIbFgsR0FBRztVQUFFeEIsU0FBUyxHQUFBMFksWUFBQSxDQUFUMVksU0FBUztVQUFFQyxPQUFPLEdBQUF5WSxZQUFBLENBQVB6WSxPQUFPLENBQUE7RUFDL0IsTUFBQSxJQUFJLENBQUNELFNBQVMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7RUFDMUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFDQSxNQUFBLE9BQU9zVyxhQUFtQixDQUFDQSxxQkFBZ0IsQ0FBQy9VLEdBQUcsRUFBRWlHLENBQUMsQ0FBQyxFQUFFekgsU0FBUyxDQUFDLENBQUE7T0FDaEUsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDN0ssQ0FBQyxFQUFLO0VBQ3ZCLE1BQUEsSUFBQXNTLFlBQUEsR0FBb0N6SCxLQUFBLENBQUtsUixLQUFLO1VBQXRDc0IsR0FBRyxHQUFBcVgsWUFBQSxDQUFIclgsR0FBRztVQUFFeEIsU0FBUyxHQUFBNlksWUFBQSxDQUFUN1ksU0FBUztVQUFFQyxPQUFPLEdBQUE0WSxZQUFBLENBQVA1WSxPQUFPLENBQUE7RUFDL0IsTUFBQSxJQUFJLENBQUNELFNBQVMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7RUFDMUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFDQSxNQUFBLE9BQU9zVyxXQUFpQixDQUFDQSxpQkFBYyxDQUFDL1UsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLEVBQUV0RyxPQUFPLENBQUMsQ0FBQTtPQUMxRCxDQUFBLENBQUE7RUFBQXNSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUMzSixDQUFDLEVBQUs7RUFDekIsTUFBQSxJQUFBc1IsWUFBQSxHQUFvQzNILEtBQUEsQ0FBS2xSLEtBQUs7VUFBdENzQixHQUFHLEdBQUF1WCxZQUFBLENBQUh2WCxHQUFHO1VBQUV4QixTQUFTLEdBQUErWSxZQUFBLENBQVQvWSxTQUFTO1VBQUVDLE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU8sQ0FBQTtFQUMvQixNQUFBLElBQUksQ0FBQ0QsU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtFQUMxQixRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUNBLE1BQUEsT0FBT3NXLGFBQW1CLENBQUNBLHFCQUFnQixDQUFDL1UsR0FBRyxFQUFFaUcsQ0FBQyxDQUFDLEVBQUV4SCxPQUFPLENBQUMsQ0FBQTtPQUM5RCxDQUFBLENBQUE7RUFBQXNSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV5Qix5QkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFBQSxNQUFBLElBQUF1UyxxQkFBQSxDQUFBO0VBQy9CLE1BQUEsSUFBQVMsWUFBQSxHQUNFbkksS0FBQSxDQUFLbFIsS0FBSztVQURKc0IsR0FBRyxHQUFBK1gsWUFBQSxDQUFIL1gsR0FBRztVQUFFd1gsWUFBWSxHQUFBTyxZQUFBLENBQVpQLFlBQVk7VUFBRUMsVUFBVSxHQUFBTSxZQUFBLENBQVZOLFVBQVU7VUFBRUMsWUFBWSxHQUFBSyxZQUFBLENBQVpMLFlBQVk7VUFBRWxaLFNBQVMsR0FBQXVaLFlBQUEsQ0FBVHZaLFNBQVM7VUFBRUMsT0FBTyxHQUFBc1osWUFBQSxDQUFQdFosT0FBTyxDQUFBO0VBR3ZFLE1BQUEsSUFBTW1aLGFBQWEsR0FBQU4sQ0FBQUEscUJBQUEsR0FBRzFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQU4sSUFBQUEsSUFBQUEscUJBQUEsY0FBQUEscUJBQUEsR0FBSTFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtRQUV6RSxJQUFJLEVBQUVXLFlBQVksSUFBSUMsVUFBVSxJQUFJQyxZQUFZLENBQUMsSUFBSSxDQUFDRSxhQUFhLEVBQUU7RUFDbkUsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7UUFFQSxJQUFJSixZQUFZLElBQUkvWSxPQUFPLEVBQUU7VUFDM0IsT0FBT3NXLGNBQW9CLENBQUM2QyxhQUFhLEVBQUVuWixPQUFPLEVBQUVzRyxDQUFDLEVBQUUvRSxHQUFHLENBQUMsQ0FBQTtFQUM3RCxPQUFBO1FBRUEsSUFBSXlYLFVBQVUsSUFBSWpaLFNBQVMsRUFBRTtVQUMzQixPQUFPdVcsY0FBb0IsQ0FBQ3ZXLFNBQVMsRUFBRW9aLGFBQWEsRUFBRTdTLENBQUMsRUFBRS9FLEdBQUcsQ0FBQyxDQUFBO0VBQy9ELE9BQUE7RUFFQSxNQUFBLElBQUkwWCxZQUFZLElBQUlsWixTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1VBQ3pDLE9BQU9zVyxjQUFvQixDQUFDdlcsU0FBUyxFQUFFb1osYUFBYSxFQUFFN1MsQ0FBQyxFQUFFL0UsR0FBRyxDQUFDLENBQUE7RUFDL0QsT0FBQTtFQUVBLE1BQUEsT0FBTyxLQUFLLENBQUE7T0FDYixDQUFBLENBQUE7RUFBQStQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUU0Qiw0QkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFBQSxNQUFBLElBQUE4UyxzQkFBQSxDQUFBO0VBQ2xDLE1BQUEsSUFBSSxDQUFDakksS0FBQSxDQUFLa1AsdUJBQXVCLENBQUMvWixDQUFDLENBQUMsRUFBRTtFQUNwQyxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUVBLE1BQUEsSUFBQWtULFlBQUEsR0FBeUNySSxLQUFBLENBQUtsUixLQUFLO1VBQTNDc0IsR0FBRyxHQUFBaVksWUFBQSxDQUFIalksR0FBRztVQUFFeEIsU0FBUyxHQUFBeVosWUFBQSxDQUFUelosU0FBUztVQUFFZ1osWUFBWSxHQUFBUyxZQUFBLENBQVpULFlBQVksQ0FBQTtRQUNwQyxJQUFNdUgsTUFBTSxHQUFHaEssaUJBQWMsQ0FBQy9VLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFBO0VBQ3JDLE1BQUEsSUFBTTZTLGFBQWEsR0FBQUMsQ0FBQUEsc0JBQUEsR0FBR2pJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQUMsSUFBQUEsSUFBQUEsc0JBQUEsY0FBQUEsc0JBQUEsR0FBSWpJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtFQUV6RSxNQUFBLElBQUlXLFlBQVksRUFBRTtFQUNoQixRQUFBLE9BQU96QyxXQUFpQixDQUFDZ0ssTUFBTSxFQUFFbkgsYUFBYSxDQUFDLENBQUE7RUFDakQsT0FBQyxNQUFNO0VBQ0wsUUFBQSxPQUFPN0MsV0FBaUIsQ0FBQ2dLLE1BQU0sRUFBRXZnQixTQUFTLENBQUMsQ0FBQTtFQUM3QyxPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFMEIsMEJBQUEsRUFBQSxVQUFDN0ssQ0FBQyxFQUFLO0VBQUEsTUFBQSxJQUFBaVQsc0JBQUEsQ0FBQTtFQUNoQyxNQUFBLElBQUksQ0FBQ3BJLEtBQUEsQ0FBS2tQLHVCQUF1QixDQUFDL1osQ0FBQyxDQUFDLEVBQUU7RUFDcEMsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUFtVCxZQUFBLEdBQW1EdEksS0FBQSxDQUFLbFIsS0FBSztVQUFyRHNCLEdBQUcsR0FBQWtZLFlBQUEsQ0FBSGxZLEdBQUc7VUFBRXZCLE9BQU8sR0FBQXlaLFlBQUEsQ0FBUHpaLE9BQU87VUFBRWdaLFVBQVUsR0FBQVMsWUFBQSxDQUFWVCxVQUFVO1VBQUVDLFlBQVksR0FBQVEsWUFBQSxDQUFaUixZQUFZLENBQUE7UUFDOUMsSUFBTXFILE1BQU0sR0FBR2hLLGlCQUFjLENBQUMvVSxHQUFHLEVBQUUrRSxDQUFDLENBQUMsQ0FBQTtFQUNyQyxNQUFBLElBQU02UyxhQUFhLEdBQUFJLENBQUFBLHNCQUFBLEdBQUdwSSxLQUFBLENBQUtsUixLQUFLLENBQUNrWixhQUFhLE1BQUFJLElBQUFBLElBQUFBLHNCQUFBLGNBQUFBLHNCQUFBLEdBQUlwSSxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUE7UUFFekUsSUFBSVksVUFBVSxJQUFJQyxZQUFZLEVBQUU7RUFDOUIsUUFBQSxPQUFPM0MsV0FBaUIsQ0FBQ2dLLE1BQU0sRUFBRW5ILGFBQWEsQ0FBQyxDQUFBO0VBQ2pELE9BQUMsTUFBTTtFQUNMLFFBQUEsT0FBTzdDLFdBQWlCLENBQUNnSyxNQUFNLEVBQUV0Z0IsT0FBTyxDQUFDLENBQUE7RUFDM0MsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBc1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRTJCLDJCQUFBLEVBQUEsVUFBQzNKLENBQUMsRUFBSztFQUFBLE1BQUEsSUFBQStZLHNCQUFBLENBQUE7RUFDakMsTUFBQSxJQUFBN0csWUFBQSxHQUNFdkksS0FBQSxDQUFLbFIsS0FBSztVQURKc0IsR0FBRyxHQUFBbVksWUFBQSxDQUFIblksR0FBRztVQUFFd1gsWUFBWSxHQUFBVyxZQUFBLENBQVpYLFlBQVk7VUFBRUMsVUFBVSxHQUFBVSxZQUFBLENBQVZWLFVBQVU7VUFBRUMsWUFBWSxHQUFBUyxZQUFBLENBQVpULFlBQVk7VUFBRWxaLFNBQVMsR0FBQTJaLFlBQUEsQ0FBVDNaLFNBQVM7VUFBRUMsT0FBTyxHQUFBMFosWUFBQSxDQUFQMVosT0FBTyxDQUFBO0VBR3ZFLE1BQUEsSUFBTW1aLGFBQWEsR0FBQW9ILENBQUFBLHNCQUFBLEdBQUdwUCxLQUFBLENBQUtsUixLQUFLLENBQUNrWixhQUFhLE1BQUFvSCxJQUFBQSxJQUFBQSxzQkFBQSxjQUFBQSxzQkFBQSxHQUFJcFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFBO1FBRXpFLElBQUksRUFBRVcsWUFBWSxJQUFJQyxVQUFVLElBQUlDLFlBQVksQ0FBQyxJQUFJLENBQUNFLGFBQWEsRUFBRTtFQUNuRSxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtRQUVBLElBQUlKLFlBQVksSUFBSS9ZLE9BQU8sRUFBRTtVQUMzQixPQUFPc1csZ0JBQXNCLENBQUM2QyxhQUFhLEVBQUVuWixPQUFPLEVBQUV3SCxDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtFQUMvRCxPQUFBO1FBRUEsSUFBSXlYLFVBQVUsSUFBSWpaLFNBQVMsRUFBRTtVQUMzQixPQUFPdVcsZ0JBQXNCLENBQUN2VyxTQUFTLEVBQUVvWixhQUFhLEVBQUUzUixDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtFQUNqRSxPQUFBO0VBRUEsTUFBQSxJQUFJMFgsWUFBWSxJQUFJbFosU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtVQUN6QyxPQUFPc1csZ0JBQXNCLENBQUN2VyxTQUFTLEVBQUVvWixhQUFhLEVBQUUzUixDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtFQUNqRSxPQUFBO0VBRUEsTUFBQSxPQUFPLEtBQUssQ0FBQTtPQUNiLENBQUEsQ0FBQTtFQUFBK1AsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWUsZUFBQSxFQUFBLFVBQUN2UCxXQUFXLEVBQUs7RUFDL0IsTUFBQSxJQUFNTCxHQUFHLEdBQUc0UCxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUE7UUFDMUIsSUFBTWUsU0FBUyxHQUFHZ1UsZUFBYSxDQUFDMVUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQy9DLE1BQUEsT0FDRTBVLFdBQWlCLENBQUMxVSxXQUFXLEVBQUVMLEdBQUcsQ0FBQyxJQUFJK1UsV0FBaUIsQ0FBQ2hVLFNBQVMsRUFBRWYsR0FBRyxDQUFDLENBQUE7T0FFM0UsQ0FBQSxDQUFBO0VBQUErUCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixVQUFDNVAsR0FBRyxFQUFFK0UsQ0FBQyxFQUFBO0VBQUEsTUFBQSxPQUN0QmdRLGVBQWEsQ0FBQy9VLEdBQUcsQ0FBQyxLQUFLK1UsZUFBYSxDQUFDQSxPQUFhLEVBQUUsQ0FBQyxJQUNyRGhRLENBQUMsS0FBS2dRLGlCQUFjLENBQUNBLE9BQWEsRUFBRSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBaEYsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFcEIsVUFBQzVQLEdBQUcsRUFBRWlHLENBQUMsRUFBQTtFQUFBLE1BQUEsT0FDeEI4TyxlQUFhLENBQUMvVSxHQUFHLENBQUMsS0FBSytVLGVBQWEsQ0FBQ0EsT0FBYSxFQUFFLENBQUMsSUFDckQ5TyxDQUFDLEtBQUs4TyxxQkFBZ0IsQ0FBQ0EsT0FBYSxFQUFFLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUFoRixlQUFBLENBQUFILEtBQUEsRUFFdkIsaUJBQUEsRUFBQSxVQUFDNVAsR0FBRyxFQUFFK0UsQ0FBQyxFQUFFNlIsUUFBUSxFQUFBO1FBQUEsT0FDakM3QixpQkFBYyxDQUFDNkIsUUFBUSxDQUFDLEtBQUs3UixDQUFDLElBQzlCZ1EsZUFBYSxDQUFDL1UsR0FBRyxDQUFDLEtBQUsrVSxlQUFhLENBQUM2QixRQUFRLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUE3RyxlQUFBLENBQUFILEtBQUEsRUFFNUIsbUJBQUEsRUFBQSxVQUFDNVAsR0FBRyxFQUFFaUcsQ0FBQyxFQUFFMlEsUUFBUSxFQUFBO1FBQUEsT0FDbkM3QixxQkFBZ0IsQ0FBQy9VLEdBQUcsQ0FBQyxLQUFLaUcsQ0FBQyxJQUMzQjhPLGVBQWEsQ0FBQy9VLEdBQUcsQ0FBQyxLQUFLK1UsZUFBYSxDQUFDNkIsUUFBUSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBN0csZUFBQSxDQUFBSCxLQUFBLEVBQUEsYUFBQSxFQUVsQyxZQUFNO1FBQ2xCLElBQU1xUCxLQUFLLEdBQUcsRUFBRSxDQUFBO0VBQ2hCLE1BQUEsSUFBSUMsYUFBYSxHQUFHdFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWdCLFdBQVcsQ0FBQTtRQUUxQyxJQUFJaFUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULElBQUlpVSxrQkFBa0IsR0FBRyxLQUFLLENBQUE7RUFDOUIsTUFBQSxJQUFJQyxnQkFBZ0IsR0FBR3RLLGNBQW9CLENBQ3pDQSxlQUFxQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLEVBQ3JDNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUNiLENBQUMsQ0FBQTtFQUVELE1BQUEsSUFBTXdXLFFBQVEsR0FBR2hILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ZLGNBQWMsR0FDdEMvQixjQUFvQixDQUNsQm5GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkJoSCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLEVBQ2pCMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQ2IsQ0FBQyxHQUNEd1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFBO0VBRXZCLE1BQUEsSUFBTUMsWUFBWSxHQUFHakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBYyxHQUMxQy9CLGNBQW9CLENBQ2xCbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUN2QmpILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakIyVCxLQUFBLENBQUtsUixLQUFLLENBQUMwQixnQkFDYixDQUFDLEdBQ0R3UCxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUE7RUFFM0IsTUFBQSxPQUFPLElBQUksRUFBRTtFQUNYb0ksUUFBQUEsS0FBSyxDQUFDdFQsSUFBSSxlQUNSeUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeU0sSUFBSSxFQUFBO0VBQ0hGLFVBQUFBLGVBQWUsRUFBRWhOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRnQixtQkFBb0I7RUFDaEQ1QixVQUFBQSx3QkFBd0IsRUFBRTlOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dmLHdCQUF5QjtFQUM5REMsVUFBQUEsMEJBQTBCLEVBQUUvTixLQUFBLENBQUtsUixLQUFLLENBQUNpZiwwQkFBMkI7RUFDbEVwUyxVQUFBQSxHQUFHLEVBQUVKLENBQUU7RUFDUG5MLFVBQUFBLEdBQUcsRUFBRXFmLGdCQUFpQjtZQUN0Qm5jLEtBQUssRUFBRTZSLGlCQUFjLENBQUNuRixLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUU7WUFDdEMrYyxVQUFVLEVBQUVuTixLQUFBLENBQUtzTixjQUFlO0VBQ2hDckIsVUFBQUEsZUFBZSxFQUFFak0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWQsZUFBZ0I7WUFDNUNtQixlQUFlLEVBQUVwTixLQUFBLENBQUtpTyxtQkFBb0I7RUFDMUNaLFVBQUFBLFlBQVksRUFBRXJOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VlLFlBQWE7RUFDdENHLFVBQUFBLGdCQUFnQixFQUFFeE4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGUsZ0JBQWlCO0VBQzlDbmhCLFVBQUFBLE1BQU0sRUFBRTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU87RUFDMUJFLFVBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxVQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO0VBQzVCQyxVQUFBQSxZQUFZLEVBQUUrTCxLQUFBLENBQUtsUixLQUFLLENBQUNtRixZQUFhO0VBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRThMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29GLG9CQUFxQjtFQUN0REMsVUFBQUEsWUFBWSxFQUFFNkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcUYsWUFBYTtFQUN0Q0MsVUFBQUEsb0JBQW9CLEVBQUU0TCxLQUFBLENBQUtsUixLQUFLLENBQUNzRixvQkFBcUI7RUFDdEQrVyxVQUFBQSxNQUFNLEVBQUVuTCxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFPO0VBQzFCQyxVQUFBQSxvQkFBb0IsRUFBRXBMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NjLG9CQUFxQjtFQUN0RGpRLFVBQUFBLGNBQWMsRUFBRTZFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FNLGNBQWU7RUFDMUNvTSxVQUFBQSxRQUFRLEVBQUV2SCxLQUFBLENBQUtsUixLQUFLLENBQUN5WSxRQUFTO0VBQzlCUyxVQUFBQSxhQUFhLEVBQUVoSSxLQUFBLENBQUtsUixLQUFLLENBQUNrWixhQUFjO0VBQ3hDM1QsVUFBQUEsVUFBVSxFQUFFMkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdUYsVUFBVztFQUNsQzRTLFVBQUFBLFlBQVksRUFBRUEsWUFBYTtFQUMzQkQsVUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CWSxVQUFBQSxZQUFZLEVBQUU1SCxLQUFBLENBQUtsUixLQUFLLENBQUM4WSxZQUFhO0VBQ3RDQyxVQUFBQSxVQUFVLEVBQUU3SCxLQUFBLENBQUtsUixLQUFLLENBQUMrWSxVQUFXO0VBQ2xDQyxVQUFBQSxZQUFZLEVBQUU5SCxLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFhO0VBQ3RDQyxVQUFBQSwwQkFBMEIsRUFBRS9ILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2laLDBCQUEyQjtFQUNsRWxCLFVBQUFBLGVBQWUsRUFBRTdHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytYLGVBQWdCO0VBQzVDQyxVQUFBQSxhQUFhLEVBQUU5RyxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFjO0VBQ3hDMkQsVUFBQUEsY0FBYyxFQUFFekssS0FBQSxDQUFLbFIsS0FBSyxDQUFDNmdCLGVBQWdCO0VBQzNDekksVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBZTtFQUMxQ3RZLFVBQUFBLFNBQVMsRUFBRW9SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBVTtFQUNoQ0MsVUFBQUEsT0FBTyxFQUFFbVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFRO0VBQzVCOFosVUFBQUEsWUFBWSxFQUFFM0ksS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlosWUFBYTtFQUN0Q3JFLFVBQUFBLE9BQU8sRUFBRXRFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQVE7RUFDNUJpSixVQUFBQSxtQkFBbUIsRUFBRXZOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3llLG1CQUFvQjtFQUNwRDVHLFVBQUFBLDBCQUEwQixFQUFFM0csS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlgsMEJBQTJCO0VBQ2xFa0YsVUFBQUEsaUJBQWlCLEVBQUU3TCxLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBa0I7RUFDaERyRixVQUFBQSxlQUFlLEVBQUV4RyxLQUFBLENBQUtsUixLQUFLLENBQUMwWCxlQUFnQjtFQUM1Q3VFLFVBQUFBLGNBQWMsRUFBRS9LLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2ljLGNBQWU7RUFDMUNNLFVBQUFBLFlBQVksRUFBRXJMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VjLFlBQWE7RUFDdEM3YSxVQUFBQSxnQkFBZ0IsRUFBRXdQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUFpQjtFQUM5Q2diLFVBQUFBLDBCQUEwQixFQUFFeEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGMsMEJBQTJCO0VBQ2xFQyxVQUFBQSw0QkFBNEIsRUFBRXpMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJjLDRCQUFBQTtFQUE2QixTQUN2RSxDQUNILENBQUMsQ0FBQTtFQUVELFFBQUEsSUFBSStELGtCQUFrQixFQUFFLE1BQUE7RUFFeEJqVSxRQUFBQSxDQUFDLEVBQUUsQ0FBQTtVQUNIa1UsZ0JBQWdCLEdBQUd0SyxpQkFBYyxDQUFDc0ssZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0VBRXREO0VBQ0E7RUFDQSxRQUFBLElBQU1HLG1CQUFtQixHQUN2Qk4sYUFBYSxJQUFJL1QsQ0FBQyxJQUFJNFMsZ0NBQWdDLENBQUE7VUFDeEQsSUFBTTBCLHVCQUF1QixHQUMzQixDQUFDUCxhQUFhLElBQUksQ0FBQ3RQLEtBQUEsQ0FBSzhQLGFBQWEsQ0FBQ0wsZ0JBQWdCLENBQUMsQ0FBQTtVQUV6RCxJQUFJRyxtQkFBbUIsSUFBSUMsdUJBQXVCLEVBQUU7RUFDbEQsVUFBQSxJQUFJN1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWhCLGFBQWEsRUFBRTtFQUM1QlAsWUFBQUEsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO0VBQzNCLFdBQUMsTUFBTTtFQUNMLFlBQUEsTUFBQTtFQUNGLFdBQUE7RUFDRixTQUFBO0VBQ0YsT0FBQTtFQUVBLE1BQUEsT0FBT0gsS0FBSyxDQUFBO09BQ2IsQ0FBQSxDQUFBO0VBQUFsUCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsVUFBQ3dELENBQUMsRUFBRXJPLENBQUMsRUFBSztFQUN2QixNQUFBLElBQU02YSxTQUFTLEdBQUc3SyxpQkFBYyxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLENBQUE7UUFFbkQsSUFBSWdRLGVBQXFCLENBQUM2SyxTQUFTLEVBQUVoUSxLQUFBLENBQUtsUixLQUFLLENBQUMsRUFBRTtFQUNoRCxRQUFBLE9BQUE7RUFDRixPQUFBO1FBRUFrUixLQUFBLENBQUtzTixjQUFjLENBQUNuSSxlQUFxQixDQUFDNkssU0FBUyxDQUFDLEVBQUV4TSxDQUFDLENBQUMsQ0FBQTtPQUN6RCxDQUFBLENBQUE7RUFBQXJELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFDekIsTUFBQSxJQUFNNmEsU0FBUyxHQUFHN0ssaUJBQWMsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFBO1FBRW5ELElBQUlnUSxlQUFxQixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLEVBQUU7RUFDaEQsUUFBQSxPQUFBO0VBQ0YsT0FBQTtRQUVBa1IsS0FBQSxDQUFLaU8sbUJBQW1CLENBQUM5SSxlQUFxQixDQUFDNkssU0FBUyxDQUFDLENBQUMsQ0FBQTtPQUMzRCxDQUFBLENBQUE7RUFBQTdQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHVCQUFBLEVBRXVCLFVBQUNpUSxRQUFRLEVBQUV0a0IsT0FBTyxFQUFLO0VBQzdDLE1BQUEsSUFBSXFVLEtBQUEsQ0FBS29HLFVBQVUsQ0FBQ3phLE9BQU8sQ0FBQyxJQUFJcVUsS0FBQSxDQUFLNEksVUFBVSxDQUFDamQsT0FBTyxDQUFDLEVBQUUsT0FBQTtFQUMxRHFVLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLENBQUN2a0IsT0FBTyxDQUFDLENBQUE7RUFDbkNxVSxNQUFBQSxLQUFBLENBQUttUSxVQUFVLENBQUNGLFFBQVEsQ0FBQyxDQUFDak8sT0FBTyxJQUMvQmhDLEtBQUEsQ0FBS21RLFVBQVUsQ0FBQ0YsUUFBUSxDQUFDLENBQUNqTyxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtPQUM1QyxDQUFBLENBQUE7RUFBQXhMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFVBQUNULEtBQUssRUFBRWpNLEtBQUssRUFBSztFQUNqQyxNQUFBLElBQUFtVyxZQUFBLEdBUUl6SixLQUFBLENBQUtsUixLQUFLO1VBUFprWSxRQUFRLEdBQUF5QyxZQUFBLENBQVJ6QyxRQUFRO1VBQ1JDLFlBQVksR0FBQXdDLFlBQUEsQ0FBWnhDLFlBQVk7VUFDWk4sMEJBQTBCLEdBQUE4QyxZQUFBLENBQTFCOUMsMEJBQTBCO1VBQzFCbUksNEJBQTRCLEdBQUFyRixZQUFBLENBQTVCcUYsNEJBQTRCO1VBQzVCRCw2QkFBNkIsR0FBQXBGLFlBQUEsQ0FBN0JvRiw2QkFBNkI7VUFDN0JxQixlQUFlLEdBQUF6RyxZQUFBLENBQWZ5RyxlQUFlO1VBQ2ZFLG9CQUFvQixHQUFBM0csWUFBQSxDQUFwQjJHLG9CQUFvQixDQUFBO0VBRXRCLE1BQUEsSUFBTTlKLFFBQVEsR0FBRy9HLEtBQUssQ0FBQzVELEdBQUcsQ0FBQTtRQUMxQixJQUFJMkssUUFBUSxLQUFLLEtBQUssRUFBRTtFQUN0QjtVQUNBL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7RUFDeEIsT0FBQTtRQUNBLElBQUksQ0FBQ0ksMEJBQTBCLEVBQUU7RUFDL0IsUUFBQSxJQUFNMEosa0JBQWtCLEdBQUd6QixxQkFBcUIsQ0FDOUNDLDZCQUE2QixFQUM3QkMsNEJBQ0YsQ0FBQyxDQUFBO0VBQ0QsUUFBQSxJQUFNd0IsY0FBYyxHQUNsQjlCLGFBQWEsQ0FBQzZCLGtCQUFrQixDQUFDLENBQUMzQix3QkFBd0IsQ0FBQTtFQUM1RCxRQUFBLElBQU02QixVQUFVLEdBQUcvQixhQUFhLENBQUM2QixrQkFBa0IsQ0FBQyxDQUFDNUIsSUFBSSxDQUFBO0VBQ3pELFFBQUEsUUFBUW5JLFFBQVE7RUFDZCxVQUFBLEtBQUssT0FBTztFQUNWdEcsWUFBQUEsS0FBQSxDQUFLd1EsWUFBWSxDQUFDalIsS0FBSyxFQUFFak0sS0FBSyxDQUFDLENBQUE7Y0FDL0I0YyxlQUFlLENBQUNsSixRQUFRLENBQUMsQ0FBQTtFQUN6QixZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssWUFBWTtjQUNmaEgsS0FBQSxDQUFLeVEscUJBQXFCLENBQ3hCbmQsS0FBSyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUdBLEtBQUssR0FBR3FiLGtDQUFrQyxFQUM3RHhKLG1CQUFlLENBQUM4QixZQUFZLEVBQUUwSCxrQ0FBa0MsQ0FDbEUsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFdBQVc7Y0FDZDNPLEtBQUEsQ0FBS3lRLHFCQUFxQixDQUN4Qm5kLEtBQUssS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHQSxLQUFLLEdBQUdxYixrQ0FBa0MsRUFDN0R4SixtQkFBZSxDQUFDOEIsWUFBWSxFQUFFMEgsa0NBQWtDLENBQ2xFLENBQUMsQ0FBQTtFQUNELFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxTQUFTO0VBQ1ozTyxZQUFBQSxLQUFBLENBQUt5USxxQkFBcUI7RUFDeEI7Y0FDQUYsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDelUsUUFBUSxDQUFDeEksS0FBSyxDQUFDLEdBQ3pCQSxLQUFLLEdBQUcsRUFBRSxHQUFHZ2QsY0FBYyxHQUMzQmhkLEtBQUssR0FBR2dkLGNBQWMsRUFDMUJuTCxtQkFBZSxDQUFDOEIsWUFBWSxFQUFFcUosY0FBYyxDQUM5QyxDQUFDLENBQUE7RUFDRCxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssV0FBVztFQUNkdFEsWUFBQUEsS0FBQSxDQUFLeVEscUJBQXFCO0VBQ3hCO0VBQ0FGLFlBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDemlCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQ2dPLFFBQVEsQ0FBQ3hJLEtBQUssQ0FBQyxHQUM3Q0EsS0FBSyxHQUFHLEVBQUUsR0FBR2dkLGNBQWMsR0FDM0JoZCxLQUFLLEdBQUdnZCxjQUFjLEVBQzFCbkwsbUJBQWUsQ0FBQzhCLFlBQVksRUFBRXFKLGNBQWMsQ0FDOUMsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0osU0FBQTtFQUNGLE9BQUE7RUFFQUYsTUFBQUEsb0JBQW9CLElBQUlBLG9CQUFvQixDQUFDN1EsS0FBSyxDQUFDLENBQUE7T0FDcEQsQ0FBQSxDQUFBO0VBQUFZLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFVBQUN3RCxDQUFDLEVBQUVuTixDQUFDLEVBQUs7RUFDekIsTUFBQSxJQUFNMlosU0FBUyxHQUFHN0sscUJBQWdCLENBQUNuRixLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQUVpRyxDQUFDLENBQUMsQ0FBQTtRQUVyRCxJQUFJOE8saUJBQXVCLENBQUM2SyxTQUFTLEVBQUVoUSxLQUFBLENBQUtsUixLQUFLLENBQUMsRUFBRTtFQUNsRCxRQUFBLE9BQUE7RUFDRixPQUFBO1FBRUFrUixLQUFBLENBQUtzTixjQUFjLENBQUNuSSxpQkFBdUIsQ0FBQzZLLFNBQVMsQ0FBQyxFQUFFeE0sQ0FBQyxDQUFDLENBQUE7T0FDM0QsQ0FBQSxDQUFBO0VBQUFyRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDM0osQ0FBQyxFQUFLO0VBQzNCLE1BQUEsSUFBTTJaLFNBQVMsR0FBRzdLLHFCQUFnQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUFFaUcsQ0FBQyxDQUFDLENBQUE7UUFFckQsSUFBSThPLGlCQUF1QixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLEVBQUU7RUFDbEQsUUFBQSxPQUFBO0VBQ0YsT0FBQTtRQUVBa1IsS0FBQSxDQUFLaU8sbUJBQW1CLENBQUM5SSxpQkFBdUIsQ0FBQzZLLFNBQVMsQ0FBQyxDQUFDLENBQUE7T0FDN0QsQ0FBQSxDQUFBO0VBQUE3UCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSx5QkFBQSxFQUV5QixVQUFDMFEsVUFBVSxFQUFFL2tCLE9BQU8sRUFBSztFQUNqRCxNQUFBLElBQUlxVSxLQUFBLENBQUtvRyxVQUFVLENBQUN6YSxPQUFPLENBQUMsSUFBSXFVLEtBQUEsQ0FBSzRJLFVBQVUsQ0FBQ2pkLE9BQU8sQ0FBQyxFQUFFLE9BQUE7RUFDMURxVSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDdmtCLE9BQU8sQ0FBQyxDQUFBO1FBQ25DcVUsS0FBQSxDQUFLMlEsWUFBWSxDQUFDRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMxTyxPQUFPLElBQ3ZDaEMsS0FBQSxDQUFLMlEsWUFBWSxDQUFDRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMxTyxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtPQUNwRCxDQUFBLENBQUE7RUFBQXhMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRWtCLFVBQUNULEtBQUssRUFBRTdMLE9BQU8sRUFBSztFQUNyQyxNQUFBLElBQU00UyxRQUFRLEdBQUcvRyxLQUFLLENBQUM1RCxHQUFHLENBQUE7RUFDMUIsTUFBQSxJQUFJLENBQUNxRSxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsRUFBRTtFQUMxQyxRQUFBLFFBQVFMLFFBQVE7RUFDZCxVQUFBLEtBQUssT0FBTztFQUNWdEcsWUFBQUEsS0FBQSxDQUFLNFEsY0FBYyxDQUFDclIsS0FBSyxFQUFFN0wsT0FBTyxDQUFDLENBQUE7Y0FDbkNzTSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDbFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLENBQUE7RUFDL0MsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFlBQVk7Y0FDZmhILEtBQUEsQ0FBSzZRLHVCQUF1QixDQUMxQm5kLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxPQUFPLEdBQUcsQ0FBQyxFQUMvQnlSLHVCQUFpQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFLENBQUMsQ0FDOUMsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFdBQVc7Y0FDZGpILEtBQUEsQ0FBSzZRLHVCQUF1QixDQUMxQm5kLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxPQUFPLEdBQUcsQ0FBQyxFQUMvQnlSLHVCQUFpQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFLENBQUMsQ0FDOUMsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0osU0FBQTtFQUNGLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQTlHLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVpQixpQkFBQSxFQUFBLFVBQUMxTSxLQUFLLEVBQUs7RUFDM0IsTUFBQSxJQUFBeVcsYUFBQSxHQUE4RC9KLEtBQUEsQ0FBS2xSLEtBQUs7VUFBaEVzQixHQUFHLEdBQUEyWixhQUFBLENBQUgzWixHQUFHO1VBQUU3RCxPQUFPLEdBQUF3ZCxhQUFBLENBQVB4ZCxPQUFPO1VBQUV5SCxPQUFPLEdBQUErVixhQUFBLENBQVAvVixPQUFPO1VBQUVDLFlBQVksR0FBQThWLGFBQUEsQ0FBWjlWLFlBQVk7VUFBRUUsWUFBWSxHQUFBNFYsYUFBQSxDQUFaNVYsWUFBWSxDQUFBO1FBQ3pELElBQU02YixTQUFTLEdBQUc3SyxpQkFBYyxDQUFDL1UsR0FBRyxFQUFFa0QsS0FBSyxDQUFDLENBQUE7RUFDNUMsTUFBQSxPQUNFLENBQUMvRyxPQUFPLElBQUl5SCxPQUFPLElBQUlDLFlBQVksSUFBSUUsWUFBWSxLQUNuRGdSLGVBQXFCLENBQUM2SyxTQUFTLEVBQUVoUSxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtPQUUvQyxDQUFBLENBQUE7RUFBQXFSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVvQixvQkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFDMUIsTUFBQSxJQUFBMmIsYUFBQSxHQUNFOVEsS0FBQSxDQUFLbFIsS0FBSztVQURKc0IsR0FBRyxHQUFBMGdCLGFBQUEsQ0FBSDFnQixHQUFHO1VBQUV4QixTQUFTLEdBQUFraUIsYUFBQSxDQUFUbGlCLFNBQVM7VUFBRUMsT0FBTyxHQUFBaWlCLGFBQUEsQ0FBUGppQixPQUFPO1VBQUVtWSxRQUFRLEdBQUE4SixhQUFBLENBQVI5SixRQUFRO1VBQUVDLFlBQVksR0FBQTZKLGFBQUEsQ0FBWjdKLFlBQVk7VUFBRThKLGNBQWMsR0FBQUQsYUFBQSxDQUFkQyxjQUFjLENBQUE7RUFFdkUsTUFBQSxJQUFNQyxlQUFlLEdBQUdELGNBQWMsR0FDbENBLGNBQWMsQ0FBQzVMLGlCQUFjLENBQUMvVSxHQUFHLEVBQUUrRSxDQUFDLENBQUMsQ0FBQyxHQUN0Q3BCLFNBQVMsQ0FBQTtRQUNiLE9BQU84TyxTQUFJLENBQ1QsOEJBQThCLEVBQUEsMEJBQUEsQ0FBQXJVLE1BQUEsQ0FDSDJHLENBQUMsQ0FDNUI2YixFQUFBQSxlQUFlLEVBQ2Y7RUFDRSxRQUFBLHdDQUF3QyxFQUFFaFIsS0FBQSxDQUFLakwsZUFBZSxDQUFDSSxDQUFDLENBQUM7VUFDakUsd0NBQXdDLEVBQUU2SyxLQUFBLENBQUs2RSxlQUFlLENBQzVEelUsR0FBRyxFQUNIK0UsQ0FBQyxFQUNENlIsUUFDRixDQUFDO0VBQ0QsUUFBQSxpREFBaUQsRUFDL0MsQ0FBQ2hILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEwQixJQUN0QzNHLEtBQUEsQ0FBSzZFLGVBQWUsQ0FBQ3pVLEdBQUcsRUFBRStFLENBQUMsRUFBRThSLFlBQVksQ0FBQztFQUM1QyxRQUFBLGtEQUFrRCxFQUNoRGpILEtBQUEsQ0FBS2tQLHVCQUF1QixDQUFDL1osQ0FBQyxDQUFDO0VBQ2pDLFFBQUEsd0NBQXdDLEVBQUVnUSxjQUFvQixDQUM1RHZXLFNBQVMsRUFDVEMsT0FBTyxFQUNQc0csQ0FBQyxFQUNEL0UsR0FDRixDQUFDO0VBQ0QsUUFBQSwyQ0FBMkMsRUFBRTRQLEtBQUEsQ0FBS2lSLGlCQUFpQixDQUFDOWIsQ0FBQyxDQUFDO0VBQ3RFLFFBQUEseUNBQXlDLEVBQUU2SyxLQUFBLENBQUtrUixlQUFlLENBQUMvYixDQUFDLENBQUM7RUFDbEUsUUFBQSxxREFBcUQsRUFDbkQ2SyxLQUFBLENBQUttUiwwQkFBMEIsQ0FBQ2hjLENBQUMsQ0FBQztFQUNwQyxRQUFBLG1EQUFtRCxFQUNqRDZLLEtBQUEsQ0FBS29SLHdCQUF3QixDQUFDamMsQ0FBQyxDQUFDO0VBQ2xDLFFBQUEscUNBQXFDLEVBQUU2SyxLQUFBLENBQUtxUixjQUFjLENBQUNqaEIsR0FBRyxFQUFFK0UsQ0FBQyxDQUFBO0VBQ25FLE9BQ0YsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO0VBQUFnTCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFYSxhQUFBLEVBQUEsVUFBQzdLLENBQUMsRUFBSztRQUNuQixJQUFNbWMsZ0JBQWdCLEdBQUduTSxpQkFBYyxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFDLENBQUE7RUFDaEUsTUFBQSxJQUFNdUQsUUFBUSxHQUNaLENBQUN4SyxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsSUFBSXhSLENBQUMsS0FBS21jLGdCQUFnQixHQUM1RCxHQUFHLEdBQ0gsSUFBSSxDQUFBO0VBRVYsTUFBQSxPQUFPOUcsUUFBUSxDQUFBO09BQ2hCLENBQUEsQ0FBQTtFQUFBckssSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW9CLG9CQUFBLEVBQUEsVUFBQzNKLENBQUMsRUFBSztRQUMxQixJQUFNa2Isa0JBQWtCLEdBQUdwTSxxQkFBZ0IsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQyxDQUFBO0VBQ3BFLE1BQUEsSUFBTXVELFFBQVEsR0FDWixDQUFDeEssS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlgsMEJBQTBCLElBQUl0USxDQUFDLEtBQUtrYixrQkFBa0IsR0FDOUQsR0FBRyxHQUNILElBQUksQ0FBQTtFQUVWLE1BQUEsT0FBTy9HLFFBQVEsQ0FBQTtPQUNoQixDQUFBLENBQUE7RUFBQXJLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVjLGNBQUEsRUFBQSxVQUFDMU0sS0FBSyxFQUFLO0VBQ3hCLE1BQUEsSUFBQWtlLGFBQUEsR0FLSXhSLEtBQUEsQ0FBS2xSLEtBQUs7VUFBQTJpQixxQkFBQSxHQUFBRCxhQUFBLENBSloxRCx3QkFBd0I7RUFBeEJBLFFBQUFBLHdCQUF3QixHQUFBMkQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxRQUFRLEdBQUFBLHFCQUFBO1VBQUFDLHFCQUFBLEdBQUFGLGFBQUEsQ0FDbkN6RCwwQkFBMEI7RUFBMUJBLFFBQUFBLDBCQUEwQixHQUFBMkQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxlQUFlLEdBQUFBLHFCQUFBO1VBQzVDdGhCLEdBQUcsR0FBQW9oQixhQUFBLENBQUhwaEIsR0FBRztVQUNIL0QsTUFBTSxHQUFBbWxCLGFBQUEsQ0FBTm5sQixNQUFNLENBQUE7UUFFUixJQUFNMmpCLFNBQVMsR0FBRzdLLGlCQUFjLENBQUMvVSxHQUFHLEVBQUVrRCxLQUFLLENBQUMsQ0FBQTtFQUM1QyxNQUFBLElBQU13VyxNQUFNLEdBQ1Y5SixLQUFBLENBQUtvRyxVQUFVLENBQUM0SixTQUFTLENBQUMsSUFBSWhRLEtBQUEsQ0FBSzRJLFVBQVUsQ0FBQ29ILFNBQVMsQ0FBQyxHQUNwRGpDLDBCQUEwQixHQUMxQkQsd0JBQXdCLENBQUE7RUFFOUIsTUFBQSxPQUFBLEVBQUEsQ0FBQXRmLE1BQUEsQ0FBVXNiLE1BQU0sRUFBQSxHQUFBLENBQUEsQ0FBQXRiLE1BQUEsQ0FBSTJXLFVBQWdCLENBQUM2SyxTQUFTLEVBQUUsV0FBVyxFQUFFM2pCLE1BQU0sQ0FBQyxDQUFBLENBQUE7T0FDckUsQ0FBQSxDQUFBO0VBQUE4VCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFc0Isc0JBQUEsRUFBQSxVQUFDM0osQ0FBQyxFQUFLO0VBQzVCLE1BQUEsSUFBQXNiLGFBQUEsR0FTSTNSLEtBQUEsQ0FBS2xSLEtBQUs7VUFSWnNCLEdBQUcsR0FBQXVoQixhQUFBLENBQUh2aEIsR0FBRztVQUNIeEIsU0FBUyxHQUFBK2lCLGFBQUEsQ0FBVC9pQixTQUFTO1VBQ1RDLE9BQU8sR0FBQThpQixhQUFBLENBQVA5aUIsT0FBTztVQUNQbVksUUFBUSxHQUFBMkssYUFBQSxDQUFSM0ssUUFBUTtVQUNSemEsT0FBTyxHQUFBb2xCLGFBQUEsQ0FBUHBsQixPQUFPO1VBQ1B5SCxPQUFPLEdBQUEyZCxhQUFBLENBQVAzZCxPQUFPO1VBQ1BpVCxZQUFZLEdBQUEwSyxhQUFBLENBQVoxSyxZQUFZO1VBQ1pOLDBCQUEwQixHQUFBZ0wsYUFBQSxDQUExQmhMLDBCQUEwQixDQUFBO0VBRTVCLE1BQUEsT0FBTzlELFNBQUksQ0FDVCxnQ0FBZ0MsK0JBQUFyVSxNQUFBLENBQ0g2SCxDQUFDLENBQzlCLEVBQUE7VUFDRSwwQ0FBMEMsRUFDeEMsQ0FBQzlKLE9BQU8sSUFBSXlILE9BQU8sS0FDbkJtUixpQkFBdUIsQ0FBQ0EscUJBQWdCLENBQUMvVSxHQUFHLEVBQUVpRyxDQUFDLENBQUMsRUFBRTJKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQztVQUMvRCwwQ0FBMEMsRUFBRWtSLEtBQUEsQ0FBSzRSLGlCQUFpQixDQUNoRXhoQixHQUFHLEVBQ0hpRyxDQUFDLEVBQ0QyUSxRQUNGLENBQUM7RUFDRCxRQUFBLG1EQUFtRCxFQUNqRCxDQUFDTCwwQkFBMEIsSUFDM0IzRyxLQUFBLENBQUs0UixpQkFBaUIsQ0FBQ3hoQixHQUFHLEVBQUVpRyxDQUFDLEVBQUU0USxZQUFZLENBQUM7RUFDOUMsUUFBQSxvREFBb0QsRUFDbERqSCxLQUFBLENBQUs2Uix5QkFBeUIsQ0FBQ3hiLENBQUMsQ0FBQztFQUNuQyxRQUFBLDBDQUEwQyxFQUFFOE8sZ0JBQXNCLENBQ2hFdlcsU0FBUyxFQUNUQyxPQUFPLEVBQ1B3SCxDQUFDLEVBQ0RqRyxHQUNGLENBQUM7RUFDRCxRQUFBLDZDQUE2QyxFQUMzQzRQLEtBQUEsQ0FBSzhSLG1CQUFtQixDQUFDemIsQ0FBQyxDQUFDO0VBQzdCLFFBQUEsMkNBQTJDLEVBQUUySixLQUFBLENBQUsrUixpQkFBaUIsQ0FBQzFiLENBQUMsQ0FBQTtFQUN2RSxPQUNGLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtFQUFBOEosSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWlCLGlCQUFBLEVBQUEsVUFBQzdLLENBQUMsRUFBSztFQUN2QixNQUFBLElBQUE2YyxhQUFBLEdBQ0VoUyxLQUFBLENBQUtsUixLQUFLO1VBREptakIsdUJBQXVCLEdBQUFELGFBQUEsQ0FBdkJDLHVCQUF1QjtVQUFFQyxrQkFBa0IsR0FBQUYsYUFBQSxDQUFsQkUsa0JBQWtCO1VBQUU3bEIsTUFBTSxHQUFBMmxCLGFBQUEsQ0FBTjNsQixNQUFNO1VBQUUrRCxHQUFHLEdBQUE0aEIsYUFBQSxDQUFINWhCLEdBQUcsQ0FBQTtRQUVoRSxJQUFNK2hCLGNBQWMsR0FBR2hOLHFCQUEyQixDQUFDaFEsQ0FBQyxFQUFFOUksTUFBTSxDQUFDLENBQUE7UUFDN0QsSUFBTStsQixhQUFhLEdBQUdqTixnQkFBc0IsQ0FBQ2hRLENBQUMsRUFBRTlJLE1BQU0sQ0FBQyxDQUFBO0VBQ3ZELE1BQUEsSUFBSTZsQixrQkFBa0IsRUFBRTtVQUN0QixPQUFPQSxrQkFBa0IsQ0FBQy9jLENBQUMsRUFBRWdkLGNBQWMsRUFBRUMsYUFBYSxFQUFFaGlCLEdBQUcsQ0FBQyxDQUFBO0VBQ2xFLE9BQUE7RUFDQSxNQUFBLE9BQU82aEIsdUJBQXVCLEdBQUdHLGFBQWEsR0FBR0QsY0FBYyxDQUFBO09BQ2hFLENBQUEsQ0FBQTtFQUFBaFMsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW1CLG1CQUFBLEVBQUEsVUFBQzNKLENBQUMsRUFBSztFQUN6QixNQUFBLElBQUFnYyxhQUFBLEdBQXlDclMsS0FBQSxDQUFLbFIsS0FBSztVQUEzQ3dqQixvQkFBb0IsR0FBQUQsYUFBQSxDQUFwQkMsb0JBQW9CO1VBQUVqbUIsTUFBTSxHQUFBZ21CLGFBQUEsQ0FBTmhtQixNQUFNLENBQUE7UUFDcEMsSUFBTWttQixZQUFZLEdBQUdwTix1QkFBNkIsQ0FBQzlPLENBQUMsRUFBRWhLLE1BQU0sQ0FBQyxDQUFBO1FBQzdELE9BQU9pbUIsb0JBQW9CLEdBQ3ZCQSxvQkFBb0IsQ0FBQ2pjLENBQUMsRUFBRWtjLFlBQVksQ0FBQyxHQUNyQ0EsWUFBWSxDQUFBO09BQ2pCLENBQUEsQ0FBQTtNQUFBcFMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07RUFDbkIsTUFBQSxJQUFBd1MsYUFBQSxHQUtJeFMsS0FBQSxDQUFLbFIsS0FBSztVQUpaZ2dCLDRCQUE0QixHQUFBMEQsYUFBQSxDQUE1QjFELDRCQUE0QjtVQUM1QkQsNkJBQTZCLEdBQUEyRCxhQUFBLENBQTdCM0QsNkJBQTZCO1VBQzdCemUsR0FBRyxHQUFBb2lCLGFBQUEsQ0FBSHBpQixHQUFHO1VBQ0g0VyxRQUFRLEdBQUF3TCxhQUFBLENBQVJ4TCxRQUFRLENBQUE7RUFHVixNQUFBLElBQU15TCxZQUFZLEdBQ2hCakUsYUFBYSxDQUNYSSxxQkFBcUIsQ0FDbkJDLDZCQUE2QixFQUM3QkMsNEJBQ0YsQ0FBQyxDQUNGLENBQUNMLElBQUksQ0FBQTtFQUNSLE1BQUEsT0FBT2dFLFlBQVksQ0FBQ2xsQixHQUFHLENBQUMsVUFBQytGLEtBQUssRUFBRWlJLENBQUMsRUFBQTtVQUFBLG9CQUMvQmlGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFVBQUFBLFNBQVMsRUFBQyxpQ0FBaUM7RUFBQ1QsVUFBQUEsR0FBRyxFQUFFSixDQUFBQTtFQUFFLFNBQUEsRUFDckRqSSxLQUFLLENBQUMvRixHQUFHLENBQUMsVUFBQzRILENBQUMsRUFBRXVkLENBQUMsRUFBQTtZQUFBLG9CQUNkbFMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFcUMsWUFBQUEsR0FBRyxFQUFFOUMsS0FBQSxDQUFLbVEsVUFBVSxDQUFDaGIsQ0FBQyxDQUFFO0VBQ3hCd0csWUFBQUEsR0FBRyxFQUFFK1csQ0FBRTtFQUNQaFMsWUFBQUEsT0FBTyxFQUFFLFNBQUFBLE9BQUNpUyxDQUFBQSxFQUFFLEVBQUs7RUFDZjNTLGNBQUFBLEtBQUEsQ0FBS3dRLFlBQVksQ0FBQ21DLEVBQUUsRUFBRXhkLENBQUMsQ0FBQyxDQUFBO2VBQ3hCO0VBQ0Y0VyxZQUFBQSxTQUFTLEVBQUUsU0FBQUEsU0FBQzRHLENBQUFBLEVBQUUsRUFBSztFQUNqQixjQUFBLElBQUl4TixjQUFvQixDQUFDd04sRUFBRSxDQUFDLEVBQUU7a0JBQzVCQSxFQUFFLENBQUNwTSxjQUFjLEVBQUUsQ0FBQTtrQkFDbkJvTSxFQUFFLENBQUNoWCxHQUFHLEdBQUcsT0FBTyxDQUFBO0VBQ2xCLGVBQUE7RUFFQXFFLGNBQUFBLEtBQUEsQ0FBSzRTLGNBQWMsQ0FBQ0QsRUFBRSxFQUFFeGQsQ0FBQyxDQUFDLENBQUE7ZUFDMUI7RUFDRmtSLFlBQUFBLFlBQVksRUFDVixDQUFDckcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWQsZUFBZSxHQUN2QixZQUFBO0VBQUEsY0FBQSxPQUFNak0sS0FBQSxDQUFLNlMsaUJBQWlCLENBQUMxZCxDQUFDLENBQUMsQ0FBQTtFQUFBLGFBQUEsR0FDL0JwQixTQUNMO0VBQ0RvWSxZQUFBQSxjQUFjLEVBQ1puTSxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFlLEdBQ3RCLFlBQUE7RUFBQSxjQUFBLE9BQU1qTSxLQUFBLENBQUs2UyxpQkFBaUIsQ0FBQzFkLENBQUMsQ0FBQyxDQUFBO0VBQUEsYUFBQSxHQUMvQnBCLFNBQ0w7RUFDRHlXLFlBQUFBLFFBQVEsRUFBRXhLLEtBQUEsQ0FBSzhLLFdBQVcsQ0FBQzNWLENBQUMsQ0FBRTtFQUM5QmlILFlBQUFBLFNBQVMsRUFBRTRELEtBQUEsQ0FBSzhTLGtCQUFrQixDQUFDM2QsQ0FBQyxDQUFFO0VBQ3RDLFlBQUEsZUFBQSxFQUFlNkssS0FBQSxDQUFLakwsZUFBZSxDQUFDSSxDQUFDLENBQUU7RUFDdkNrWCxZQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiLFlBQUEsWUFBQSxFQUFZck0sS0FBQSxDQUFLb00sWUFBWSxDQUFDalgsQ0FBQyxDQUFFO2NBQ2pDLGNBQWM2SyxFQUFBQSxLQUFBLENBQUtxUixjQUFjLENBQUNqaEIsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHcEIsU0FBVTtjQUMvRCxlQUFlaU0sRUFBQUEsS0FBQSxDQUFLNkUsZUFBZSxDQUFDelUsR0FBRyxFQUFFK0UsQ0FBQyxFQUFFNlIsUUFBUSxDQUFBO0VBQUUsV0FBQSxFQUVyRGhILEtBQUEsQ0FBSytTLGVBQWUsQ0FBQzVkLENBQUMsQ0FDcEIsQ0FBQyxDQUFBO0VBQUEsU0FDUCxDQUNFLENBQUMsQ0FBQTtFQUFBLE9BQ1AsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO01BQUFnTCxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixZQUFNO0VBQ3JCLE1BQUEsSUFBQWdULGFBQUEsR0FBMEJoVCxLQUFBLENBQUtsUixLQUFLO1VBQTVCc0IsR0FBRyxHQUFBNGlCLGFBQUEsQ0FBSDVpQixHQUFHO1VBQUU0VyxRQUFRLEdBQUFnTSxhQUFBLENBQVJoTSxRQUFRLENBQUE7UUFDckIsSUFBTWlNLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzdCLG9CQUNFelMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLG1DQUFBO0VBQW1DLE9BQUEsRUFDL0M2VyxRQUFRLENBQUMxbEIsR0FBRyxDQUFDLFVBQUM4SSxDQUFDLEVBQUVxYyxDQUFDLEVBQUE7VUFBQSxvQkFDakJsUyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0U5RSxVQUFBQSxHQUFHLEVBQUUrVyxDQUFFO0VBQ1A1UCxVQUFBQSxHQUFHLEVBQUU5QyxLQUFBLENBQUsyUSxZQUFZLENBQUMrQixDQUFDLENBQUU7RUFDMUJyRyxVQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiM0wsVUFBQUEsT0FBTyxFQUFFLFNBQUFBLE9BQUNpUyxDQUFBQSxFQUFFLEVBQUs7RUFDZjNTLFlBQUFBLEtBQUEsQ0FBSzRRLGNBQWMsQ0FBQytCLEVBQUUsRUFBRXRjLENBQUMsQ0FBQyxDQUFBO2FBQzFCO0VBQ0YwVixVQUFBQSxTQUFTLEVBQUUsU0FBQUEsU0FBQzRHLENBQUFBLEVBQUUsRUFBSztFQUNqQjNTLFlBQUFBLEtBQUEsQ0FBS2tULGdCQUFnQixDQUFDUCxFQUFFLEVBQUV0YyxDQUFDLENBQUMsQ0FBQTthQUM1QjtFQUNGZ1EsVUFBQUEsWUFBWSxFQUNWLENBQUNyRyxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFlLEdBQ3ZCLFlBQUE7RUFBQSxZQUFBLE9BQU1qTSxLQUFBLENBQUttVCxtQkFBbUIsQ0FBQzljLENBQUMsQ0FBQyxDQUFBO0VBQUEsV0FBQSxHQUNqQ3RDLFNBQ0w7RUFDRG9ZLFVBQUFBLGNBQWMsRUFDWm5NLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21kLGVBQWUsR0FDdEIsWUFBQTtFQUFBLFlBQUEsT0FBTWpNLEtBQUEsQ0FBS21ULG1CQUFtQixDQUFDOWMsQ0FBQyxDQUFDLENBQUE7RUFBQSxXQUFBLEdBQ2pDdEMsU0FDTDtFQUNEcUksVUFBQUEsU0FBUyxFQUFFNEQsS0FBQSxDQUFLb1Qsb0JBQW9CLENBQUMvYyxDQUFDLENBQUU7WUFDeEMsZUFBZTJKLEVBQUFBLEtBQUEsQ0FBSzRSLGlCQUFpQixDQUFDeGhCLEdBQUcsRUFBRWlHLENBQUMsRUFBRTJRLFFBQVEsQ0FBRTtFQUN4RHdELFVBQUFBLFFBQVEsRUFBRXhLLEtBQUEsQ0FBS3FULGtCQUFrQixDQUFDaGQsQ0FBQyxDQUFFO1lBQ3JDLGNBQWMySixFQUFBQSxLQUFBLENBQUtzVCxnQkFBZ0IsQ0FBQ2xqQixHQUFHLEVBQUVpRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUd0QyxTQUFBQTtFQUFVLFNBQUEsRUFFaEVpTSxLQUFBLENBQUt1VCxpQkFBaUIsQ0FBQ2xkLENBQUMsQ0FDdEIsQ0FBQyxDQUFBO0VBQUEsT0FDUCxDQUNFLENBQUMsQ0FBQTtPQUVULENBQUEsQ0FBQTtNQUFBOEosZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFlBQU07RUFDcEIsTUFBQSxJQUFBd1QsYUFBQSxHQU9JeFQsS0FBQSxDQUFLbFIsS0FBSztVQU5aa1osYUFBYSxHQUFBd0wsYUFBQSxDQUFieEwsYUFBYTtVQUNiSixZQUFZLEdBQUE0TCxhQUFBLENBQVo1TCxZQUFZO1VBQ1pDLFVBQVUsR0FBQTJMLGFBQUEsQ0FBVjNMLFVBQVU7VUFDVjRMLG1CQUFtQixHQUFBRCxhQUFBLENBQW5CQyxtQkFBbUI7VUFDbkJDLHFCQUFxQixHQUFBRixhQUFBLENBQXJCRSxxQkFBcUI7VUFDckJ4TSxjQUFjLEdBQUFzTSxhQUFBLENBQWR0TSxjQUFjLENBQUE7UUFHaEIsT0FBT3JFLFNBQUksQ0FDVCx5QkFBeUIsRUFDekI7RUFDRSxRQUFBLDBDQUEwQyxFQUN4Q21GLGFBQWEsS0FBS0osWUFBWSxJQUFJQyxVQUFVLENBQUE7RUFDaEQsT0FBQyxFQUNEO0VBQUUsUUFBQSwrQkFBK0IsRUFBRTRMLG1CQUFBQTtFQUFvQixPQUFDLEVBQ3hEO0VBQUUsUUFBQSxpQ0FBaUMsRUFBRUMscUJBQUFBO0VBQXNCLE9BQUMsRUFDNUQ7RUFBRSxRQUFBLDhCQUE4QixFQUFFeE0sY0FBQUE7RUFBZSxPQUNuRCxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUFsSCxLQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE0QixTQUFBLENBQUFtTixLQUFBLEVBQUFoUCxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBa04sS0FBQSxFQUFBLENBQUE7TUFBQXBULEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQUFnUixhQUFBLEdBS0ksSUFBSSxDQUFDN2tCLEtBQUs7VUFKWjJrQixtQkFBbUIsR0FBQUUsYUFBQSxDQUFuQkYsbUJBQW1CO1VBQ25CQyxxQkFBcUIsR0FBQUMsYUFBQSxDQUFyQkQscUJBQXFCO1VBQ3JCdGpCLEdBQUcsR0FBQXVqQixhQUFBLENBQUh2akIsR0FBRztVQUFBd2pCLHFCQUFBLEdBQUFELGFBQUEsQ0FDSDNHLGVBQWU7RUFBZkEsUUFBQUEsZUFBZSxHQUFBNEcscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxRQUFRLEdBQUFBLHFCQUFBLENBQUE7RUFHNUIsTUFBQSxJQUFNQyx3QkFBd0IsR0FBRzdHLGVBQWUsR0FDNUNBLGVBQWUsQ0FBQzhHLElBQUksRUFBRSxHQUFHLEdBQUcsR0FDNUIsRUFBRSxDQUFBO1FBRU4sb0JBQ0V0VCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDMFAsYUFBYSxFQUFHO0VBQ2hDbUQsUUFBQUEsWUFBWSxFQUNWLENBQUMsSUFBSSxDQUFDbmdCLEtBQUssQ0FBQ21kLGVBQWUsR0FBRyxJQUFJLENBQUM4SCxnQkFBZ0IsR0FBR2hnQixTQUN2RDtVQUNEaWdCLGNBQWMsRUFDWixJQUFJLENBQUNsbEIsS0FBSyxDQUFDbWQsZUFBZSxHQUFHLElBQUksQ0FBQzhILGdCQUFnQixHQUFHaGdCLFNBQ3REO1VBQ0QsWUFBQXZGLEVBQUFBLEVBQUFBLENBQUFBLE1BQUEsQ0FBZXFsQix3QkFBd0IsQ0FBQSxDQUFBcmxCLE1BQUEsQ0FBRzJXLFVBQWdCLENBQUMvVSxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQ3RCLEtBQUssQ0FBQ3pDLE1BQU0sQ0FBQyxDQUFHO0VBQ25HZ2dCLFFBQUFBLElBQUksRUFBQyxTQUFBO1NBRUpvSCxFQUFBQSxtQkFBbUIsR0FDaEIsSUFBSSxDQUFDUSxZQUFZLEVBQUUsR0FDbkJQLHFCQUFxQixHQUNuQixJQUFJLENBQUNRLGNBQWMsRUFBRSxHQUNyQixJQUFJLENBQUNDLFdBQVcsRUFDbkIsQ0FBQyxDQUFBO0VBRVYsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQWp4QmdDM1QsQ0FBQUEsc0JBQUssQ0FBQ3dDLFNBQVMsQ0FBQTs7RUN2Q1osSUFFakJvUixJQUFJLDBCQUFBclUsZ0JBQUEsRUFBQTtFQUFBLEVBQUEsU0FBQXFVLElBQUEsR0FBQTtFQUFBLElBQUEsSUFBQXBVLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFtVSxJQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsS0FBQSxJQUFBaFIsSUFBQSxHQUFBdFAsU0FBQSxDQUFBaEcsTUFBQSxFQUFBdVYsSUFBQSxHQUFBeFcsSUFBQUEsS0FBQSxDQUFBdVcsSUFBQSxHQUFBRSxJQUFBLEdBQUEsQ0FBQSxFQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQSxFQUFBLEVBQUE7RUFBQUQsTUFBQUEsSUFBQSxDQUFBQyxJQUFBLENBQUF4UCxHQUFBQSxTQUFBLENBQUF3UCxJQUFBLENBQUEsQ0FBQTtFQUFBLEtBQUE7RUFBQXRELElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBLElBQUEsRUFBQWtVLElBQUEsRUFBQTVsQixFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO01BQUFsRCxlQUFBLENBQUFILEtBQUEsRUF3Q2YsT0FBQSxFQUFBO0VBQ05xVSxNQUFBQSxNQUFNLEVBQUUsSUFBQTtPQUNULENBQUEsQ0FBQTtNQUFBbFUsZUFBQSxDQUFBSCxLQUFBLEVBQUEseUJBQUEsRUFZeUIsWUFBTTtFQUM5QnNVLE1BQUFBLHFCQUFxQixDQUFDLFlBQU07RUFDMUIsUUFBQSxJQUFJLENBQUN0VSxLQUFBLENBQUtMLElBQUksRUFBRSxPQUFBO0VBRWhCSyxRQUFBQSxLQUFBLENBQUtMLElBQUksQ0FBQzRDLFNBQVMsR0FDakJ2QyxLQUFBLENBQUt1VSxRQUFRLElBQ2JILElBQUksQ0FBQ0ksa0JBQWtCLENBQ3JCeFUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmxCLFFBQVEsR0FDZnpVLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJsQixRQUFRLENBQUNoUyxZQUFZLEdBQUd6QyxLQUFBLENBQUswVSxNQUFNLENBQUNqUyxZQUFZLEdBQzNEekMsS0FBQSxDQUFLTCxJQUFJLENBQUM4QyxZQUFZLEVBQzFCekMsS0FBQSxDQUFLdVUsUUFDUCxDQUFDLENBQUE7RUFDTCxPQUFDLENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtFQUFBcFUsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWEsYUFBQSxFQUFBLFVBQUNwSixJQUFJLEVBQUs7UUFDdEIsSUFDRyxDQUFDb0osS0FBQSxDQUFLbFIsS0FBSyxDQUFDMkksT0FBTyxJQUFJdUksS0FBQSxDQUFLbFIsS0FBSyxDQUFDNEksT0FBTyxLQUN4Q0gscUJBQXFCLENBQUNYLElBQUksRUFBRW9KLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxJQUN4QyxDQUFDa1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0ksWUFBWSxJQUN2QjRJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VJLFlBQVksSUFDdkIySSxLQUFBLENBQUtsUixLQUFLLENBQUN3SSxVQUFVLEtBQ3JCSixjQUFjLENBQUNOLElBQUksRUFBRW9KLEtBQUEsQ0FBS2xSLEtBQUssQ0FBRSxFQUNuQztFQUNBLFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFDQWtSLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZSLFFBQVEsQ0FBQy9KLElBQUksQ0FBQyxDQUFBO09BQzFCLENBQUEsQ0FBQTtFQUFBdUosSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQ3BKLElBQUksRUFBQTtFQUFBLE1BQUEsT0FDcEJvSixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLElBQUluSSxZQUFZLENBQUNtQixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEVBQUVwUSxJQUFJLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUF1SixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFL0MsZ0JBQUEsRUFBQSxVQUFDcEosSUFBSSxFQUFBO1FBQUEsT0FDbkIsQ0FBQ29KLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJJLE9BQU8sSUFBSXVJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRJLE9BQU8sS0FDeENILHFCQUFxQixDQUFDWCxJQUFJLEVBQUVvSixLQUFBLENBQUtsUixLQUFLLENBQUMsSUFDeEMsQ0FBQ2tSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NJLFlBQVksSUFDdkI0SSxLQUFBLENBQUtsUixLQUFLLENBQUN1SSxZQUFZLElBQ3ZCMkksS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0ksVUFBVSxLQUNyQkosY0FBYyxDQUFDTixJQUFJLEVBQUVvSixLQUFBLENBQUtsUixLQUFLLENBQUUsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUFxUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFekIsV0FBQSxFQUFBLFVBQUNwSixJQUFJLEVBQUs7UUFDcEIsSUFBSStkLE9BQU8sR0FBRyxDQUNaLGtDQUFrQyxFQUNsQzNVLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhsQixhQUFhLEdBQUc1VSxLQUFBLENBQUtsUixLQUFLLENBQUM4bEIsYUFBYSxDQUFDaGUsSUFBSSxDQUFDLEdBQUc3QyxTQUFTLENBQ3RFLENBQUE7RUFFRCxNQUFBLElBQUlpTSxLQUFBLENBQUs2VSxjQUFjLENBQUNqZSxJQUFJLENBQUMsRUFBRTtFQUM3QitkLFFBQUFBLE9BQU8sQ0FBQzVZLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0VBQzVELE9BQUE7RUFFQSxNQUFBLElBQUlpRSxLQUFBLENBQUs4VSxjQUFjLENBQUNsZSxJQUFJLENBQUMsRUFBRTtFQUM3QitkLFFBQUFBLE9BQU8sQ0FBQzVZLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0VBQzVELE9BQUE7O0VBRUE7RUFDQSxNQUFBLElBQ0VpRSxLQUFBLENBQUtsUixLQUFLLENBQUNpbUIsV0FBVyxJQUN0QixDQUFDaGUsaUJBQVEsQ0FBQ0gsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHSSxxQkFBVSxDQUFDSixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUdLLGtCQUFVLENBQUNMLElBQUksQ0FBQyxLQUM5RG9KLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lPLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FDM0IsQ0FBQyxFQUNIO0VBQ0FvWCxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQTtFQUM1RCxPQUFBO0VBRUEsTUFBQSxPQUFPNFksT0FBTyxDQUFDOW1CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtPQUN6QixDQUFBLENBQUE7RUFBQXNTLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGlCQUFBLEVBRWlCLFVBQUNULEtBQUssRUFBRTNJLElBQUksRUFBSztFQUNqQyxNQUFBLElBQUkySSxLQUFLLENBQUM1RCxHQUFHLEtBQUssR0FBRyxFQUFFO1VBQ3JCNEQsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7VUFDdEJoSCxLQUFLLENBQUM1RCxHQUFHLEdBQUcsT0FBTyxDQUFBO0VBQ3JCLE9BQUE7RUFFQSxNQUFBLElBQ0UsQ0FBQzRELEtBQUssQ0FBQzVELEdBQUcsS0FBSyxTQUFTLElBQUk0RCxLQUFLLENBQUM1RCxHQUFHLEtBQUssV0FBVyxLQUNyRDRELEtBQUssQ0FBQ2tFLE1BQU0sQ0FBQ3VSLGVBQWUsRUFDNUI7VUFDQXpWLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO0VBQ3RCaEgsUUFBQUEsS0FBSyxDQUFDa0UsTUFBTSxDQUFDdVIsZUFBZSxDQUFDckosS0FBSyxFQUFFLENBQUE7RUFDdEMsT0FBQTtFQUNBLE1BQUEsSUFDRSxDQUFDcE0sS0FBSyxDQUFDNUQsR0FBRyxLQUFLLFdBQVcsSUFBSTRELEtBQUssQ0FBQzVELEdBQUcsS0FBSyxZQUFZLEtBQ3hENEQsS0FBSyxDQUFDa0UsTUFBTSxDQUFDd1IsV0FBVyxFQUN4QjtVQUNBMVYsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7RUFDdEJoSCxRQUFBQSxLQUFLLENBQUNrRSxNQUFNLENBQUN3UixXQUFXLENBQUN0SixLQUFLLEVBQUUsQ0FBQTtFQUNsQyxPQUFBO0VBRUEsTUFBQSxJQUFJcE0sS0FBSyxDQUFDNUQsR0FBRyxLQUFLLE9BQU8sRUFBRTtFQUN6QnFFLFFBQUFBLEtBQUEsQ0FBS2dNLFdBQVcsQ0FBQ3BWLElBQUksQ0FBQyxDQUFBO0VBQ3hCLE9BQUE7RUFDQW9KLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBYLGVBQWUsQ0FBQ2pILEtBQUssQ0FBQyxDQUFBO09BQ2xDLENBQUEsQ0FBQTtNQUFBWSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsWUFBTTtRQUNsQixJQUFJbkosS0FBSyxHQUFHLEVBQUUsQ0FBQTtFQUNkLE1BQUEsSUFBTXpJLE1BQU0sR0FBRzRSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ1YsTUFBTSxHQUFHNFIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDVixNQUFNLEdBQUcsR0FBRyxDQUFBO0VBQzFELE1BQUEsSUFBTW1QLFNBQVMsR0FBR3lDLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lPLFNBQVMsQ0FBQTtFQUV0QyxNQUFBLElBQU0yWCxVQUFVLEdBQ2RsVixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLElBQUloSCxLQUFBLENBQUtsUixLQUFLLENBQUNxbUIsVUFBVSxJQUFJeHBCLE9BQU8sRUFBRSxDQUFBO0VBRTNELE1BQUEsSUFBTXlwQixJQUFJLEdBQUcva0IsYUFBYSxDQUFDNmtCLFVBQVUsQ0FBQyxDQUFBO1FBQ3RDLElBQU1HLGlCQUFpQixHQUNyQnJWLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2ltQixXQUFXLElBQ3RCL1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaW1CLFdBQVcsQ0FBQ08sSUFBSSxDQUFDLFVBQVVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO1VBQzFDLE9BQU9ELENBQUMsR0FBR0MsQ0FBQyxDQUFBO0VBQ2QsT0FBQyxDQUFDLENBQUE7RUFFSixNQUFBLElBQU1DLFlBQVksR0FBRyxFQUFFLEdBQUd0WCxhQUFhLENBQUMrVyxVQUFVLENBQUMsQ0FBQTtFQUNuRCxNQUFBLElBQU1RLFVBQVUsR0FBR0QsWUFBWSxHQUFHbFksU0FBUyxDQUFBO1FBRTNDLEtBQUssSUFBSWhDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR21hLFVBQVUsRUFBRW5hLENBQUMsRUFBRSxFQUFFO1VBQ25DLElBQU04QixXQUFXLEdBQUdPLHFCQUFVLENBQUN3WCxJQUFJLEVBQUU3WixDQUFDLEdBQUdnQyxTQUFTLENBQUMsQ0FBQTtFQUNuRDFHLFFBQUFBLEtBQUssQ0FBQ2tGLElBQUksQ0FBQ3NCLFdBQVcsQ0FBQyxDQUFBO0VBRXZCLFFBQUEsSUFBSWdZLGlCQUFpQixFQUFFO0VBQ3JCLFVBQUEsSUFBTU0sYUFBYSxHQUFHdlksa0JBQWtCLENBQ3RDZ1ksSUFBSSxFQUNKL1gsV0FBVyxFQUNYOUIsQ0FBQyxFQUNEZ0MsU0FBUyxFQUNUOFgsaUJBQ0YsQ0FBQyxDQUFBO0VBQ0R4ZSxVQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ3JJLE1BQU0sQ0FBQ21uQixhQUFhLENBQUMsQ0FBQTtFQUNyQyxTQUFBO0VBQ0YsT0FBQTs7RUFFQTtRQUNBLElBQU1DLFdBQVcsR0FBRy9lLEtBQUssQ0FBQ2dmLE1BQU0sQ0FBQyxVQUFDQyxJQUFJLEVBQUVsZixJQUFJLEVBQUs7VUFDL0MsSUFBSUEsSUFBSSxDQUFDZ0ksT0FBTyxFQUFFLElBQUlzVyxVQUFVLENBQUN0VyxPQUFPLEVBQUUsRUFBRTtFQUMxQyxVQUFBLE9BQU9oSSxJQUFJLENBQUE7RUFDYixTQUFBO0VBQ0EsUUFBQSxPQUFPa2YsSUFBSSxDQUFBO0VBQ2IsT0FBQyxFQUFFamYsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFWixPQUFPQSxLQUFLLENBQUN0SixHQUFHLENBQUMsVUFBQ3FKLElBQUksRUFBRTJFLENBQUMsRUFBSztVQUM1QixvQkFDRWlGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxJQUFBLEVBQUE7RUFDRTlFLFVBQUFBLEdBQUcsRUFBRUosQ0FBRTtZQUNQbUYsT0FBTyxFQUFFVixLQUFBLENBQUtnTSxXQUFXLENBQUNwTCxJQUFJLENBQUFaLEtBQUEsRUFBT3BKLElBQUksQ0FBRTtFQUMzQ3dGLFVBQUFBLFNBQVMsRUFBRTRELEtBQUEsQ0FBSytWLFNBQVMsQ0FBQ25mLElBQUksQ0FBRTtFQUNoQ2tNLFVBQUFBLEdBQUcsRUFBRSxTQUFBQSxHQUFDa1QsQ0FBQUEsRUFBRSxFQUFLO2NBQ1gsSUFBSXBmLElBQUksS0FBS2dmLFdBQVcsRUFBRTtnQkFDeEI1VixLQUFBLENBQUt1VSxRQUFRLEdBQUd5QixFQUFFLENBQUE7RUFDcEIsYUFBQTthQUNBO0VBQ0ZqSyxVQUFBQSxTQUFTLEVBQUUsU0FBQUEsU0FBQzRHLENBQUFBLEVBQUUsRUFBSztFQUNqQjNTLFlBQUFBLEtBQUEsQ0FBS3dHLGVBQWUsQ0FBQ21NLEVBQUUsRUFBRS9iLElBQUksQ0FBQyxDQUFBO2FBQzlCO1lBQ0Y0VCxRQUFRLEVBQUU1VCxJQUFJLEtBQUtnZixXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRTtFQUN4Q3ZKLFVBQUFBLElBQUksRUFBQyxRQUFRO1lBQ2IsZUFBZXJNLEVBQUFBLEtBQUEsQ0FBSzZVLGNBQWMsQ0FBQ2plLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRzdDLFNBQVU7WUFDOUQsZUFBZWlNLEVBQUFBLEtBQUEsQ0FBSzhVLGNBQWMsQ0FBQ2xlLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRzdDLFNBQUFBO0VBQVUsU0FBQSxFQUU3RDFHLFVBQVUsQ0FBQ3VKLElBQUksRUFBRXhJLE1BQU0sRUFBRTRSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sQ0FDekMsQ0FBQyxDQUFBO0VBRVQsT0FBQyxDQUFDLENBQUE7T0FDSCxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUEyVCxLQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE0QixTQUFBLENBQUF3UyxJQUFBLEVBQUFyVSxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBdVMsSUFBQSxFQUFBLENBQUE7TUFBQXpZLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQXpLRCxTQUFBa1csaUJBQUFBLEdBQW9CO0VBQ2xCO1FBQ0EsSUFBSSxDQUFDbVUsdUJBQXVCLEVBQUUsQ0FBQTtRQUM5QixJQUFJLElBQUksQ0FBQ25uQixLQUFLLENBQUMybEIsUUFBUSxJQUFJLElBQUksQ0FBQ0MsTUFBTSxFQUFFO1VBQ3RDLElBQUksQ0FBQ3BULFFBQVEsQ0FBQztFQUNaK1MsVUFBQUEsTUFBTSxFQUFFLElBQUksQ0FBQ3ZsQixLQUFLLENBQUMybEIsUUFBUSxDQUFDaFMsWUFBWSxHQUFHLElBQUksQ0FBQ2lTLE1BQU0sQ0FBQ2pTLFlBQUFBO0VBQ3pELFNBQUMsQ0FBQyxDQUFBO0VBQ0osT0FBQTtFQUNGLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQTlHLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBbUtELFNBQUErVyxNQUFBQSxHQUFTO0VBQUEsTUFBQSxJQUFBc0MsTUFBQSxHQUFBLElBQUEsQ0FBQTtFQUNQLE1BQUEsSUFBUW9QLE1BQU0sR0FBSyxJQUFJLENBQUMvVCxLQUFLLENBQXJCK1QsTUFBTSxDQUFBO1FBRWQsb0JBQ0U3VCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQ0VyRSxTQUFTLEVBQUEsbUNBQUEsQ0FBQTVOLE1BQUEsQ0FDUCxJQUFJLENBQUNNLEtBQUssQ0FBQ29uQixXQUFXLEdBQ2xCLHFEQUFxRCxHQUNyRCxFQUFFLENBQUE7U0FHUjFWLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFFBQUFBLFNBQVMsRUFBQTVOLDBEQUFBQSxDQUFBQSxNQUFBLENBQ1AsSUFBSSxDQUFDTSxLQUFLLENBQUNxbkIsa0JBQWtCLEdBQ3pCLHNDQUFzQyxHQUN0QyxFQUFFLENBQ0w7RUFDSHJULFFBQUFBLEdBQUcsRUFBRSxTQUFBQSxHQUFDNFIsQ0FBQUEsTUFBTSxFQUFLO1lBQ2Z6UCxNQUFJLENBQUN5UCxNQUFNLEdBQUdBLE1BQU0sQ0FBQTtFQUN0QixTQUFBO1NBRUFsVSxlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUMsK0JBQUE7U0FDWixFQUFBLElBQUksQ0FBQ3ROLEtBQUssQ0FBQ3NuQixXQUNULENBQ0YsQ0FBQyxlQUNONVYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLHdCQUFBO1NBQ2JvRSxlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUMsNEJBQUE7U0FDYm9FLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxJQUFBLEVBQUE7RUFDRXJFLFFBQUFBLFNBQVMsRUFBQyw2QkFBNkI7RUFDdkMwRyxRQUFBQSxHQUFHLEVBQUUsU0FBQUEsR0FBQ25ELENBQUFBLElBQUksRUFBSztZQUNic0YsTUFBSSxDQUFDdEYsSUFBSSxHQUFHQSxJQUFJLENBQUE7V0FDaEI7VUFDRmtFLEtBQUssRUFBRXdRLE1BQU0sR0FBRztFQUFFQSxVQUFBQSxNQUFNLEVBQU5BLE1BQUFBO1dBQVEsR0FBRyxFQUFHO0VBQ2hDaEksUUFBQUEsSUFBSSxFQUFDLFNBQVM7VUFDZCxZQUFZLEVBQUEsSUFBSSxDQUFDdmQsS0FBSyxDQUFDc25CLFdBQUFBO1NBRXRCLEVBQUEsSUFBSSxDQUFDQyxXQUFXLEVBQ2YsQ0FDRCxDQUNGLENBQ0YsQ0FBQyxDQUFBO0VBRVYsS0FBQTtFQUFDLEdBQUEsQ0FBQSxFQUFBLENBQUE7TUFBQTFhLEdBQUEsRUFBQSxjQUFBO01BQUFFLEdBQUEsRUFoUUQsU0FBQUEsR0FBQUEsR0FBMEI7UUFDeEIsT0FBTztFQUNMMEIsUUFBQUEsU0FBUyxFQUFFLEVBQUU7RUFDYitZLFFBQUFBLFlBQVksRUFBRSxTQUFBQSxZQUFBLEdBQU0sRUFBRTtFQUN0QkosUUFBQUEsV0FBVyxFQUFFLElBQUk7RUFDakJFLFFBQUFBLFdBQVcsRUFBRSxNQUFBO1NBQ2QsQ0FBQTtFQUNILEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0FSK0I1VixDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBLENBQUE7RUFBQTdDLGVBQUEsQ0FBNUJpVSxJQUFJLEVBQUEsb0JBQUEsRUFVSyxVQUFDbUMsVUFBVSxFQUFFQyxXQUFXLEVBQUs7RUFDdkQsRUFBQSxPQUNFQSxXQUFXLENBQUNoVSxTQUFTLElBQUkrVCxVQUFVLEdBQUcsQ0FBQyxHQUFHQyxXQUFXLENBQUMvVCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7RUFFM0UsQ0FBQyxDQUFBOztFQ3pCSCxJQUFNZ1UsMEJBQTBCLEdBQUcsQ0FBQyxDQUFBO0VBQUMsSUFFaEJDLElBQUksMEJBQUEzVyxnQkFBQSxFQUFBO0lBc0N2QixTQUFBMlcsSUFBQUEsQ0FBWTVuQixLQUFLLEVBQUU7RUFBQSxJQUFBLElBQUFrUixLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBeVcsSUFBQSxDQUFBLENBQUE7RUFDakIxVyxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQXdXLElBQUFBLEVBQUFBLElBQUEsR0FBTTVuQixLQUFLLENBQUEsQ0FBQSxDQUFBO0VBQUVxUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFHSDdDLFdBQUFBLEVBQUFBLGtCQUFBLENBQUl0USxLQUFLLENBQUNtVCxLQUFBLENBQUtsUixLQUFLLENBQUM4SyxjQUFjLENBQUMsQ0FBQSxDQUFFck0sR0FBRyxDQUFDLFlBQUE7RUFBQSxNQUFBLG9CQUNwRGlULHNCQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQTtFQUFBLEtBQ25CLENBQUMsQ0FBQSxDQUFBO0VBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFWSxZQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBQTtRQUFBLE9BQUttWCxhQUFtQixDQUFDblgsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBcVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRS9DLFlBQUEsRUFBQSxVQUFDaFMsSUFBSSxFQUFBO1FBQUEsT0FBS21YLGFBQW1CLENBQUNuWCxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUFxUixlQUFBLENBQUFILEtBQUEsRUFFNUMsZUFBQSxFQUFBLFlBQUE7RUFBQSxNQUFBLElBQUEwSCxxQkFBQSxDQUFBO0VBQUEsTUFBQSxPQUFBLENBQUFBLHFCQUFBLEdBQU0xSCxLQUFBLENBQUtsUixLQUFLLENBQUNrWixhQUFhLE1BQUEsSUFBQSxJQUFBTixxQkFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBQSxxQkFBQSxHQUFJMUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQTlHLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVqRCx1QkFBQSxFQUFBLFVBQUMyVyxRQUFRLEVBQUs7UUFDcEMsSUFBTUMsZUFBZSxHQUFHLFlBQVk7VUFDbEMsSUFBSSxDQUFDQyxTQUFTLENBQUNGLFFBQVEsQ0FBQyxDQUFDM1UsT0FBTyxDQUFDMkosS0FBSyxFQUFFLENBQUE7RUFDMUMsT0FBQyxDQUFDL0ssSUFBSSxDQUFBWixLQUFLLENBQUMsQ0FBQTtFQUVack4sTUFBQUEsTUFBTSxDQUFDMmhCLHFCQUFxQixDQUFDc0MsZUFBZSxDQUFDLENBQUE7T0FDOUMsQ0FBQSxDQUFBO0VBQUF6VyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxpQkFBQSxFQUVpQixVQUFDNVAsR0FBRyxFQUFFbVAsS0FBSyxFQUFLO0VBQ2hDLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWUsVUFBVSxFQUFFO1VBQ3pCbk4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWUsVUFBVSxDQUFDL2MsR0FBRyxFQUFFbVAsS0FBSyxDQUFDLENBQUE7RUFDbkMsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxzQkFBQSxFQUVzQixVQUFDSixPQUFPLEVBQUVqVSxPQUFPLEVBQUs7RUFDM0MsTUFBQSxJQUFBeWIsV0FBQSxHQUFpQ3BILEtBQUEsQ0FBS2xSLEtBQUs7VUFBbkNkLElBQUksR0FBQW9aLFdBQUEsQ0FBSnBaLElBQUk7VUFBRTRMLGNBQWMsR0FBQXdOLFdBQUEsQ0FBZHhOLGNBQWMsQ0FBQTtRQUM1QixJQUFBa2QscUJBQUEsR0FBd0IzUixjQUFvQixDQUFDblgsSUFBSSxFQUFFNEwsY0FBYyxDQUFDO1VBQTFEYSxXQUFXLEdBQUFxYyxxQkFBQSxDQUFYcmMsV0FBVyxDQUFBO0VBRW5CLE1BQUEsSUFBSXVGLEtBQUEsQ0FBS29HLFVBQVUsQ0FBQ3phLE9BQU8sQ0FBQyxJQUFJcVUsS0FBQSxDQUFLNEksVUFBVSxDQUFDamQsT0FBTyxDQUFDLEVBQUUsT0FBQTtFQUMxRHFVLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLENBQUN2a0IsT0FBTyxDQUFDLENBQUE7RUFFbkMsTUFBQSxJQUFJaVUsT0FBTyxHQUFHbkYsV0FBVyxHQUFHLENBQUMsRUFBRTtVQUM3QnVGLEtBQUEsQ0FBSytXLHFCQUFxQixDQUFDbmQsY0FBYyxJQUFJYSxXQUFXLEdBQUdtRixPQUFPLENBQUMsQ0FBQyxDQUFBO0VBQ3RFLE9BQUMsTUFBTSxJQUFJQSxPQUFPLEdBQUduRixXQUFXLElBQUliLGNBQWMsRUFBRTtFQUNsRG9HLFFBQUFBLEtBQUEsQ0FBSytXLHFCQUFxQixDQUN4QjlZLElBQUksQ0FBQytZLEdBQUcsQ0FBQ3BkLGNBQWMsSUFBSWdHLE9BQU8sR0FBR25GLFdBQVcsQ0FBQyxDQUNuRCxDQUFDLENBQUE7RUFDSCxPQUFDLE1BQU11RixLQUFBLENBQUs2VyxTQUFTLENBQUNqWCxPQUFPLEdBQUduRixXQUFXLENBQUMsQ0FBQ3VILE9BQU8sQ0FBQzJKLEtBQUssRUFBRSxDQUFBO09BQzdELENBQUEsQ0FBQTtFQUFBeEwsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsV0FBQSxFQUVXLFVBQUNpWCxDQUFDLEVBQUV4USxLQUFLLEVBQUE7RUFBQSxNQUFBLE9BQUt0QixTQUFlLENBQUM4UixDQUFDLEVBQUV4USxLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUF0RyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFbkMsZUFBQSxFQUFBLFVBQUNpWCxDQUFDLEVBQUE7RUFBQSxNQUFBLE9BQUtBLENBQUMsS0FBSzVoQixlQUFPLENBQUMxSixPQUFPLEVBQUUsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQXdVLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVoQyxjQUFBLEVBQUEsVUFBQ2lYLENBQUMsRUFBQTtFQUFBLE1BQUEsT0FDZmpYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBUyxJQUNwQm9SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxJQUNsQnNXLFVBQWdCLENBQUNBLGVBQWEsQ0FBQ3haLE9BQU8sRUFBRSxFQUFFc3JCLENBQUMsQ0FBQyxFQUFFalgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFeEQsWUFBQSxFQUFBLFVBQUNpWCxDQUFDLEVBQUE7RUFBQSxNQUFBLE9BQ2JqWCxLQUFBLENBQUtsUixLQUFLLENBQUNGLFNBQVMsSUFDcEJvUixLQUFBLENBQUtsUixLQUFLLENBQUNELE9BQU8sSUFDbEJzVyxVQUFnQixDQUFDQSxlQUFhLENBQUN4WixPQUFPLEVBQUUsRUFBRXNyQixDQUFDLENBQUMsRUFBRWpYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBc1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXZELFdBQUEsRUFBQSxVQUFDaVgsQ0FBQyxFQUFBO0VBQUEsTUFBQSxPQUNaOVIsYUFBbUIsQ0FBQzhSLENBQUMsRUFBRWpYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBUyxFQUFFb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFPLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUFzUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFN0Msb0JBQUEsRUFBQSxVQUFDaVgsQ0FBQyxFQUFLO0VBQzFCLE1BQUEsSUFBQTNQLFlBQUEsR0FDRXRILEtBQUEsQ0FBS2xSLEtBQUs7VUFESjhZLFlBQVksR0FBQU4sWUFBQSxDQUFaTSxZQUFZO1VBQUVDLFVBQVUsR0FBQVAsWUFBQSxDQUFWTyxVQUFVO1VBQUVDLFlBQVksR0FBQVIsWUFBQSxDQUFaUSxZQUFZO1VBQUVsWixTQUFTLEdBQUEwWSxZQUFBLENBQVQxWSxTQUFTO1VBQUVDLE9BQU8sR0FBQXlZLFlBQUEsQ0FBUHpZLE9BQU8sQ0FBQTtFQUdsRSxNQUFBLElBQ0UsRUFBRStZLFlBQVksSUFBSUMsVUFBVSxJQUFJQyxZQUFZLENBQUMsSUFDN0MsQ0FBQzlILEtBQUEsQ0FBS2dJLGFBQWEsRUFBRSxFQUNyQjtFQUNBLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO1FBQ0EsSUFBSUosWUFBWSxJQUFJL1ksT0FBTyxFQUFFO0VBQzNCLFFBQUEsT0FBT3NXLGFBQW1CLENBQUM4UixDQUFDLEVBQUVqWCxLQUFBLENBQUtnSSxhQUFhLEVBQUUsRUFBRW5aLE9BQU8sQ0FBQyxDQUFBO0VBQzlELE9BQUE7UUFDQSxJQUFJZ1osVUFBVSxJQUFJalosU0FBUyxFQUFFO0VBQzNCLFFBQUEsT0FBT3VXLGFBQW1CLENBQUM4UixDQUFDLEVBQUVyb0IsU0FBUyxFQUFFb1IsS0FBQSxDQUFLZ0ksYUFBYSxFQUFFLENBQUMsQ0FBQTtFQUNoRSxPQUFBO0VBQ0EsTUFBQSxJQUFJRixZQUFZLElBQUlsWixTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQ3pDLFFBQUEsT0FBT3NXLGFBQW1CLENBQUM4UixDQUFDLEVBQUVyb0IsU0FBUyxFQUFFb1IsS0FBQSxDQUFLZ0ksYUFBYSxFQUFFLENBQUMsQ0FBQTtFQUNoRSxPQUFBO0VBQ0EsTUFBQSxPQUFPLEtBQUssQ0FBQTtPQUNiLENBQUEsQ0FBQTtFQUFBN0gsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXVCLHVCQUFBLEVBQUEsVUFBQ2lYLENBQUMsRUFBSztFQUM3QixNQUFBLElBQUksQ0FBQ2pYLEtBQUEsQ0FBS2tJLGtCQUFrQixDQUFDK08sQ0FBQyxDQUFDLEVBQUU7RUFDL0IsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUF4UCxZQUFBLEdBQW9DekgsS0FBQSxDQUFLbFIsS0FBSztVQUF0Q0YsU0FBUyxHQUFBNlksWUFBQSxDQUFUN1ksU0FBUztVQUFFZ1osWUFBWSxHQUFBSCxZQUFBLENBQVpHLFlBQVksQ0FBQTtRQUMvQixJQUFNc1AsS0FBSyxHQUFHL1IsZUFBYSxDQUFDeFosT0FBTyxFQUFFLEVBQUVzckIsQ0FBQyxDQUFDLENBQUE7RUFFekMsTUFBQSxJQUFJclAsWUFBWSxFQUFFO1VBQ2hCLE9BQU96QyxVQUFnQixDQUFDK1IsS0FBSyxFQUFFbFgsS0FBQSxDQUFLZ0ksYUFBYSxFQUFFLENBQUMsQ0FBQTtFQUN0RCxPQUFBO0VBQ0EsTUFBQSxPQUFPN0MsVUFBZ0IsQ0FBQytSLEtBQUssRUFBRXRvQixTQUFTLENBQUMsQ0FBQTtPQUMxQyxDQUFBLENBQUE7RUFBQXVSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUNpWCxDQUFDLEVBQUs7RUFDM0IsTUFBQSxJQUFJLENBQUNqWCxLQUFBLENBQUtrSSxrQkFBa0IsQ0FBQytPLENBQUMsQ0FBQyxFQUFFO0VBQy9CLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBRUEsTUFBQSxJQUFBdFAsWUFBQSxHQUE4QzNILEtBQUEsQ0FBS2xSLEtBQUs7VUFBaERELE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU87VUFBRWdaLFVBQVUsR0FBQUYsWUFBQSxDQUFWRSxVQUFVO1VBQUVDLFlBQVksR0FBQUgsWUFBQSxDQUFaRyxZQUFZLENBQUE7UUFDekMsSUFBTW9QLEtBQUssR0FBRy9SLGVBQWEsQ0FBQ3haLE9BQU8sRUFBRSxFQUFFc3JCLENBQUMsQ0FBQyxDQUFBO1FBRXpDLElBQUlwUCxVQUFVLElBQUlDLFlBQVksRUFBRTtVQUM5QixPQUFPM0MsVUFBZ0IsQ0FBQytSLEtBQUssRUFBRWxYLEtBQUEsQ0FBS2dJLGFBQWEsRUFBRSxDQUFDLENBQUE7RUFDdEQsT0FBQTtFQUNBLE1BQUEsT0FBTzdDLFVBQWdCLENBQUMrUixLQUFLLEVBQUVyb0IsT0FBTyxDQUFDLENBQUE7T0FDeEMsQ0FBQSxDQUFBO0VBQUFzUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFb0Isb0JBQUEsRUFBQSxVQUFDaVgsQ0FBQyxFQUFLO0VBQzFCLE1BQUEsSUFBTWpwQixJQUFJLEdBQUdtWCxjQUFvQixDQUFDQSxlQUFhLENBQUNuRixLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRWlwQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3BFLE9BQ0UsQ0FBQ2pYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEwQixJQUN0QyxDQUFDM0csS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxJQUNsQixDQUFDaEcsU0FBZSxDQUFDblgsSUFBSSxFQUFFbVgsY0FBb0IsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxDQUFDLElBQ2pFN0IsU0FBZSxDQUFDblgsSUFBSSxFQUFFbVgsY0FBb0IsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQyxDQUFDLENBQUE7T0FFdkUsQ0FBQSxDQUFBO0VBQUE5RyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsVUFBQ3dELENBQUMsRUFBRXlULENBQUMsRUFBSztFQUN0QixNQUFBLElBQVFqcEIsSUFBSSxHQUFLZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFuQmQsSUFBSSxDQUFBO0VBQ1pnUyxNQUFBQSxLQUFBLENBQUttWCxlQUFlLENBQUNoUyxjQUFvQixDQUFDQSxlQUFhLENBQUNuWCxJQUFJLEVBQUVpcEIsQ0FBQyxDQUFDLENBQUMsRUFBRXpULENBQUMsQ0FBQyxDQUFBO09BQ3RFLENBQUEsQ0FBQTtFQUFBckQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFVBQUN3RCxDQUFDLEVBQUV5VCxDQUFDLEVBQUs7RUFDeEIsTUFBQSxJQUFRdGIsR0FBRyxHQUFLNkgsQ0FBQyxDQUFUN0gsR0FBRyxDQUFBO0VBQ1gsTUFBQSxJQUFBd00sWUFBQSxHQUFrRG5JLEtBQUEsQ0FBS2xSLEtBQUs7VUFBcERkLElBQUksR0FBQW1hLFlBQUEsQ0FBSm5hLElBQUk7VUFBRTRMLGNBQWMsR0FBQXVPLFlBQUEsQ0FBZHZPLGNBQWM7VUFBRTRNLGVBQWUsR0FBQTJCLFlBQUEsQ0FBZjNCLGVBQWUsQ0FBQTtRQUU3QyxJQUFJN0ssR0FBRyxLQUFLLEtBQUssRUFBRTtFQUNqQjtVQUNBNkgsQ0FBQyxDQUFDK0MsY0FBYyxFQUFFLENBQUE7RUFDcEIsT0FBQTtFQUVBLE1BQUEsSUFBSSxDQUFDdkcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlgsMEJBQTBCLEVBQUU7RUFDMUMsUUFBQSxRQUFRaEwsR0FBRztFQUNULFVBQUEsS0FBSyxPQUFPO0VBQ1ZxRSxZQUFBQSxLQUFBLENBQUtvWCxXQUFXLENBQUM1VCxDQUFDLEVBQUV5VCxDQUFDLENBQUMsQ0FBQTtjQUN0QmpYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLENBQUNsUSxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUMsQ0FBQTtFQUMvQyxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssWUFBWTtFQUNmaEgsWUFBQUEsS0FBQSxDQUFLcVgsb0JBQW9CLENBQ3ZCSixDQUFDLEdBQUcsQ0FBQyxFQUNMOVIsaUJBQWMsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksRUFBRSxDQUFDLENBQzNDLENBQUMsQ0FBQTtFQUNELFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxXQUFXO0VBQ2RqSCxZQUFBQSxLQUFBLENBQUtxWCxvQkFBb0IsQ0FDdkJKLENBQUMsR0FBRyxDQUFDLEVBQ0w5UixpQkFBYyxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFLENBQUMsQ0FDM0MsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFNBQVM7RUFBRSxZQUFBO2dCQUNkLElBQUFxUSxzQkFBQSxHQUF3Qm5TLGNBQW9CLENBQUNuWCxJQUFJLEVBQUU0TCxjQUFjLENBQUM7a0JBQTFEYSxXQUFXLEdBQUE2YyxzQkFBQSxDQUFYN2MsV0FBVyxDQUFBO2dCQUNuQixJQUFJbVQsTUFBTSxHQUFHNkksMEJBQTBCLENBQUE7RUFDdkMsY0FBQSxJQUFJN1csT0FBTyxHQUFHcVgsQ0FBQyxHQUFHckosTUFBTSxDQUFBO2dCQUV4QixJQUFJaE8sT0FBTyxHQUFHbkYsV0FBVyxFQUFFO0VBQ3pCLGdCQUFBLElBQU04YyxjQUFjLEdBQUczZCxjQUFjLEdBQUdnVSxNQUFNLENBQUE7a0JBRTlDLElBQUlxSixDQUFDLElBQUl4YyxXQUFXLElBQUl3YyxDQUFDLEdBQUd4YyxXQUFXLEdBQUc4YyxjQUFjLEVBQUU7RUFDeEQzSixrQkFBQUEsTUFBTSxHQUFHMkosY0FBYyxDQUFBO0VBQ3pCLGlCQUFDLE1BQU07RUFDTDNKLGtCQUFBQSxNQUFNLElBQUkySixjQUFjLENBQUE7RUFDMUIsaUJBQUE7a0JBRUEzWCxPQUFPLEdBQUdxWCxDQUFDLEdBQUdySixNQUFNLENBQUE7RUFDdEIsZUFBQTtFQUVBNU4sY0FBQUEsS0FBQSxDQUFLcVgsb0JBQW9CLENBQ3ZCelgsT0FBTyxFQUNQdUYsaUJBQWMsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksRUFBRTJHLE1BQU0sQ0FDaEQsQ0FBQyxDQUFBO0VBQ0QsY0FBQSxNQUFBO0VBQ0YsYUFBQTtFQUNBLFVBQUEsS0FBSyxXQUFXO0VBQUUsWUFBQTtnQkFDaEIsSUFBQTRKLHNCQUFBLEdBQXNCclMsY0FBb0IsQ0FBQ25YLElBQUksRUFBRTRMLGNBQWMsQ0FBQztrQkFBeERHLFNBQVMsR0FBQXlkLHNCQUFBLENBQVR6ZCxTQUFTLENBQUE7Z0JBQ2pCLElBQUk2VCxPQUFNLEdBQUc2SSwwQkFBMEIsQ0FBQTtFQUN2QyxjQUFBLElBQUk3VyxRQUFPLEdBQUdxWCxDQUFDLEdBQUdySixPQUFNLENBQUE7Z0JBRXhCLElBQUloTyxRQUFPLEdBQUc3RixTQUFTLEVBQUU7RUFDdkIsZ0JBQUEsSUFBTXdkLGVBQWMsR0FBRzNkLGNBQWMsR0FBR2dVLE9BQU0sQ0FBQTtrQkFFOUMsSUFBSXFKLENBQUMsSUFBSWxkLFNBQVMsSUFBSWtkLENBQUMsR0FBR2xkLFNBQVMsR0FBR3dkLGVBQWMsRUFBRTtFQUNwRDNKLGtCQUFBQSxPQUFNLEdBQUcySixlQUFjLENBQUE7RUFDekIsaUJBQUMsTUFBTTtFQUNMM0osa0JBQUFBLE9BQU0sSUFBSTJKLGVBQWMsQ0FBQTtFQUMxQixpQkFBQTtrQkFFQTNYLFFBQU8sR0FBR3FYLENBQUMsR0FBR3JKLE9BQU0sQ0FBQTtFQUN0QixlQUFBO0VBRUE1TixjQUFBQSxLQUFBLENBQUtxWCxvQkFBb0IsQ0FDdkJ6WCxRQUFPLEVBQ1B1RixpQkFBYyxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFMkcsT0FBTSxDQUNoRCxDQUFDLENBQUE7RUFDRCxjQUFBLE1BQUE7RUFDRixhQUFBO0VBQ0YsU0FBQTtFQUNGLE9BQUE7RUFFQXBILE1BQUFBLGVBQWUsSUFBSUEsZUFBZSxDQUFDaEQsQ0FBQyxDQUFDLENBQUE7T0FDdEMsQ0FBQSxDQUFBO0VBQUFyRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFbUIsbUJBQUEsRUFBQSxVQUFDaVgsQ0FBQyxFQUFLO0VBQ3pCLE1BQUEsSUFBQTVPLFlBQUEsR0FTSXJJLEtBQUEsQ0FBS2xSLEtBQUs7VUFSWmQsSUFBSSxHQUFBcWEsWUFBQSxDQUFKcmEsSUFBSTtVQUNKekIsT0FBTyxHQUFBOGIsWUFBQSxDQUFQOWIsT0FBTztVQUNQeUgsT0FBTyxHQUFBcVUsWUFBQSxDQUFQclUsT0FBTztVQUNQZ1QsUUFBUSxHQUFBcUIsWUFBQSxDQUFSckIsUUFBUTtVQUNSL1MsWUFBWSxHQUFBb1UsWUFBQSxDQUFacFUsWUFBWTtVQUNaRSxZQUFZLEdBQUFrVSxZQUFBLENBQVpsVSxZQUFZO1VBQ1pFLFVBQVUsR0FBQWdVLFlBQUEsQ0FBVmhVLFVBQVU7VUFDVm9qQixhQUFhLEdBQUFwUCxZQUFBLENBQWJvUCxhQUFhLENBQUE7UUFHZixPQUFPNVUsU0FBSSxDQUNULDZCQUE2QixFQUFBLHlCQUFBLENBQUFyVSxNQUFBLENBQ0h5b0IsQ0FBQyxDQUMzQlEsRUFBQUEsYUFBYSxHQUFHQSxhQUFhLENBQUN0UyxlQUFhLENBQUNuWCxJQUFJLEVBQUVpcEIsQ0FBQyxDQUFDLENBQUMsR0FBR2xqQixTQUFTLEVBQ2pFO0VBQ0UsUUFBQSx1Q0FBdUMsRUFBRWtqQixDQUFDLEtBQUs1aEIsZUFBTyxDQUFDMlIsUUFBUSxDQUFDO1VBQ2hFLHVDQUF1QyxFQUNyQyxDQUFDemEsT0FBTyxJQUFJeUgsT0FBTyxJQUFJQyxZQUFZLElBQUlFLFlBQVksSUFBSUUsVUFBVSxLQUNqRThRLGNBQW9CLENBQUM4UixDQUFDLEVBQUVqWCxLQUFBLENBQUtsUixLQUFLLENBQUM7RUFDckMsUUFBQSxnREFBZ0QsRUFDOUNrUixLQUFBLENBQUs4SSxrQkFBa0IsQ0FBQ21PLENBQUMsQ0FBQztFQUM1QixRQUFBLDBDQUEwQyxFQUFFalgsS0FBQSxDQUFLK0ksWUFBWSxDQUFDa08sQ0FBQyxDQUFDO0VBQ2hFLFFBQUEsd0NBQXdDLEVBQUVqWCxLQUFBLENBQUtnSixVQUFVLENBQUNpTyxDQUFDLENBQUM7RUFDNUQsUUFBQSx1Q0FBdUMsRUFBRWpYLEtBQUEsQ0FBS0gsU0FBUyxDQUFDb1gsQ0FBQyxDQUFDO0VBQzFELFFBQUEsaURBQWlELEVBQy9DalgsS0FBQSxDQUFLa0ksa0JBQWtCLENBQUMrTyxDQUFDLENBQUM7RUFDNUIsUUFBQSxvREFBb0QsRUFDbERqWCxLQUFBLENBQUtpSixxQkFBcUIsQ0FBQ2dPLENBQUMsQ0FBQztFQUMvQixRQUFBLGtEQUFrRCxFQUNoRGpYLEtBQUEsQ0FBS2tKLG1CQUFtQixDQUFDK04sQ0FBQyxDQUFDO0VBQzdCLFFBQUEsb0NBQW9DLEVBQUVqWCxLQUFBLENBQUswWCxhQUFhLENBQUNULENBQUMsQ0FBQTtFQUM1RCxPQUNGLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtFQUFBOVcsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWlCLGlCQUFBLEVBQUEsVUFBQ2lYLENBQUMsRUFBSztFQUN2QixNQUFBLElBQUlqWCxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsRUFBRSxPQUFPLElBQUksQ0FBQTtRQUN0RCxJQUFNZ1IsV0FBVyxHQUFHeFMsZUFBYSxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFDLENBQUE7RUFFMUQsTUFBQSxPQUFPZ1EsQ0FBQyxLQUFLVSxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQTtPQUN0QyxDQUFBLENBQUE7TUFBQXhYLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLDRCQUFBLEVBRTRCLFlBQU07RUFDakMsTUFBQSxJQUFBc0ksWUFBQSxHQUNFdEksS0FBQSxDQUFLbFIsS0FBSztVQURKa1osYUFBYSxHQUFBTSxZQUFBLENBQWJOLGFBQWE7VUFBRUosWUFBWSxHQUFBVSxZQUFBLENBQVpWLFlBQVk7VUFBRUMsVUFBVSxHQUFBUyxZQUFBLENBQVZULFVBQVU7VUFBRUMsWUFBWSxHQUFBUSxZQUFBLENBQVpSLFlBQVksQ0FBQTtRQUU3RCxPQUFPakYsU0FBSSxDQUFDLHdCQUF3QixFQUFFO0VBQ3BDLFFBQUEseUNBQXlDLEVBQ3ZDbUYsYUFBYSxLQUFLSixZQUFZLElBQUlDLFVBQVUsSUFBSUMsWUFBWSxDQUFBO0VBQ2hFLE9BQUMsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO0VBQUEzSCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxVQUFDaVgsQ0FBQyxFQUFLO0VBQ3RCLE1BQUEsT0FBT2pYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhvQixpQkFBaUIsR0FBRzVYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhvQixpQkFBaUIsQ0FBQ1gsQ0FBQyxDQUFDLEdBQUdBLENBQUMsQ0FBQTtPQUMxRSxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUFqWCxLQUFBLENBQUE7RUFsUUQsR0FBQTtJQUFDNEIsU0FBQSxDQUFBOFUsSUFBQSxFQUFBM1csZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQTZVLElBQUEsRUFBQSxDQUFBO01BQUEvYSxHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQW9RRCxTQUFBK1csTUFBQUEsR0FBUztFQUFBLE1BQUEsSUFBQXNDLE1BQUEsR0FBQSxJQUFBLENBQUE7UUFDUCxJQUFNMUUsU0FBUyxHQUFHLEVBQUUsQ0FBQTtFQUNwQixNQUFBLElBQUFnSSxZQUFBLEdBQ0UsSUFBSSxDQUFDelosS0FBSztVQURKZCxJQUFJLEdBQUF1YSxZQUFBLENBQUp2YSxJQUFJO1VBQUU0TCxjQUFjLEdBQUEyTyxZQUFBLENBQWQzTyxjQUFjO1VBQUVpZSxnQkFBZ0IsR0FBQXRQLFlBQUEsQ0FBaEJzUCxnQkFBZ0I7VUFBRUMsZ0JBQWdCLEdBQUF2UCxZQUFBLENBQWhCdVAsZ0JBQWdCLENBQUE7UUFFaEUsSUFBQUMsc0JBQUEsR0FBbUM1UyxjQUFvQixDQUNyRG5YLElBQUksRUFDSjRMLGNBQ0YsQ0FBQztVQUhPYSxXQUFXLEdBQUFzZCxzQkFBQSxDQUFYdGQsV0FBVztVQUFFVixTQUFTLEdBQUFnZSxzQkFBQSxDQUFUaGUsU0FBUyxDQUFBO0VBRzVCLE1BQUEsSUFBQWllLEtBQUEsR0FBQSxTQUFBQSxLQUFBZixDQUFBQSxDQUFBLEVBRTZDO0VBQzdDMVcsUUFBQUEsU0FBUyxDQUFDeEUsSUFBSSxlQUNaeUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtZQUNFcUMsR0FBRyxFQUFFbUMsTUFBSSxDQUFDNFIsU0FBUyxDQUFDSSxDQUFDLEdBQUd4YyxXQUFXLENBQUU7RUFDckNpRyxVQUFBQSxPQUFPLEVBQUUsU0FBQUEsT0FBQ2lTLENBQUFBLEVBQUUsRUFBSztFQUNmMU4sWUFBQUEsTUFBSSxDQUFDbVMsV0FBVyxDQUFDekUsRUFBRSxFQUFFc0UsQ0FBQyxDQUFDLENBQUE7YUFDdkI7RUFDRmxMLFVBQUFBLFNBQVMsRUFBRSxTQUFBQSxTQUFDNEcsQ0FBQUEsRUFBRSxFQUFLO0VBQ2pCLFlBQUEsSUFBSXhOLGNBQW9CLENBQUN3TixFQUFFLENBQUMsRUFBRTtnQkFDNUJBLEVBQUUsQ0FBQ3BNLGNBQWMsRUFBRSxDQUFBO2dCQUNuQm9NLEVBQUUsQ0FBQ2hYLEdBQUcsR0FBRyxPQUFPLENBQUE7RUFDbEIsYUFBQTtFQUVBc0osWUFBQUEsTUFBSSxDQUFDZ1QsYUFBYSxDQUFDdEYsRUFBRSxFQUFFc0UsQ0FBQyxDQUFDLENBQUE7YUFDekI7RUFDRnpNLFVBQUFBLFFBQVEsRUFBRXZGLE1BQUksQ0FBQ2lULGVBQWUsQ0FBQ2pCLENBQUMsQ0FBRTtFQUNsQzdhLFVBQUFBLFNBQVMsRUFBRTZJLE1BQUksQ0FBQ2tULGlCQUFpQixDQUFDbEIsQ0FBQyxDQUFFO1lBQ3JDNVEsWUFBWSxFQUNWLENBQUNwQixNQUFJLENBQUNuVyxLQUFLLENBQUNtZCxlQUFlLEdBQ3ZCLFVBQUMwRyxFQUFFLEVBQUE7RUFBQSxZQUFBLE9BQUtrRixnQkFBZ0IsQ0FBQ2xGLEVBQUUsRUFBRXNFLENBQUMsQ0FBQyxDQUFBO0VBQUEsV0FBQSxHQUMvQmxqQixTQUNMO1lBQ0RvWSxjQUFjLEVBQ1psSCxNQUFJLENBQUNuVyxLQUFLLENBQUNtZCxlQUFlLEdBQ3RCLFVBQUMwRyxFQUFFLEVBQUE7RUFBQSxZQUFBLE9BQUtrRixnQkFBZ0IsQ0FBQ2xGLEVBQUUsRUFBRXNFLENBQUMsQ0FBQyxDQUFBO0VBQUEsV0FBQSxHQUMvQmxqQixTQUNMO1lBQ0RrYixZQUFZLEVBQ1YsQ0FBQ2hLLE1BQUksQ0FBQ25XLEtBQUssQ0FBQ21kLGVBQWUsR0FDdkIsVUFBQzBHLEVBQUUsRUFBQTtFQUFBLFlBQUEsT0FBS21GLGdCQUFnQixDQUFDbkYsRUFBRSxFQUFFc0UsQ0FBQyxDQUFDLENBQUE7RUFBQSxXQUFBLEdBQy9CbGpCLFNBQ0w7WUFDRGlnQixjQUFjLEVBQ1ovTyxNQUFJLENBQUNuVyxLQUFLLENBQUNtZCxlQUFlLEdBQ3RCLFVBQUMwRyxFQUFFLEVBQUE7RUFBQSxZQUFBLE9BQUttRixnQkFBZ0IsQ0FBQ25GLEVBQUUsRUFBRXNFLENBQUMsQ0FBQyxDQUFBO0VBQUEsV0FBQSxHQUMvQmxqQixTQUNMO0VBQ0Q0SCxVQUFBQSxHQUFHLEVBQUVzYixDQUFFO1lBQ1AsY0FBY2hTLEVBQUFBLE1BQUksQ0FBQ3lTLGFBQWEsQ0FBQ1QsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHbGpCLFNBQUFBO0VBQVUsU0FBQSxFQUV4RGtSLE1BQUksQ0FBQ21ULGNBQWMsQ0FBQ25CLENBQUMsQ0FDbkIsQ0FDUCxDQUFDLENBQUE7U0FDRixDQUFBO1FBM0NELEtBQUssSUFBSUEsQ0FBQyxHQUFHeGMsV0FBVyxFQUFFd2MsQ0FBQyxJQUFJbGQsU0FBUyxFQUFFa2QsQ0FBQyxFQUFFLEVBQUE7RUFBQWUsUUFBQUEsS0FBQSxDQUFBZixDQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE7UUE2QzdDLG9CQUNFelcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFFLElBQUksQ0FBQ2ljLDBCQUEwQixFQUFDO1NBQzlDN1gsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsUUFBQUEsU0FBUyxFQUFDLGdDQUFnQztFQUMxQzZTLFFBQUFBLFlBQVksRUFDVixDQUFDLElBQUksQ0FBQ25nQixLQUFLLENBQUNtZCxlQUFlLEdBQ3ZCLElBQUksQ0FBQ25kLEtBQUssQ0FBQ3dwQixrQkFBa0IsR0FDN0J2a0IsU0FDTDtFQUNEaWdCLFFBQUFBLGNBQWMsRUFDWixJQUFJLENBQUNsbEIsS0FBSyxDQUFDbWQsZUFBZSxHQUN0QixJQUFJLENBQUNuZCxLQUFLLENBQUN3cEIsa0JBQWtCLEdBQzdCdmtCLFNBQUFBO1NBR0x3TSxFQUFBQSxTQUNFLENBQ0YsQ0FBQyxDQUFBO0VBRVYsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQXJYK0JDLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDUGQsSUFFZHVWLFNBQVMsMEJBQUF4WSxnQkFBQSxFQUFBO0lBUzVCLFNBQUF3WSxTQUFBQSxDQUFZenBCLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFzWSxTQUFBLENBQUEsQ0FBQTtFQUNqQnZZLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBcVksSUFBQUEsRUFBQUEsU0FBQSxHQUFNenBCLEtBQUssQ0FBQSxDQUFBLENBQUE7RUFBRXFSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQWtCQSxjQUFBLEVBQUEsVUFBQ3BKLElBQUksRUFBSztRQUN2Qm9KLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFMUssUUFBQUEsSUFBSSxFQUFKQSxJQUFBQTtFQUFLLE9BQUMsQ0FBQyxDQUFBO0VBRXZCLE1BQUEsSUFBYzRoQixRQUFRLEdBQUt4WSxLQUFBLENBQUtsUixLQUFLLENBQTdCZCxJQUFJLENBQUE7UUFDWixJQUFNeXFCLGVBQWUsR0FBR0QsUUFBUSxZQUFZdnNCLElBQUksSUFBSSxDQUFDeXNCLEtBQUssQ0FBQ0YsUUFBUSxDQUFDLENBQUE7UUFDcEUsSUFBTXhxQixJQUFJLEdBQUd5cUIsZUFBZSxHQUFHRCxRQUFRLEdBQUcsSUFBSXZzQixJQUFJLEVBQUUsQ0FBQTtFQUVwRCtCLE1BQUFBLElBQUksQ0FBQzhCLFFBQVEsQ0FBQzhHLElBQUksQ0FBQytoQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNqQzNxQixNQUFBQSxJQUFJLENBQUMrQixVQUFVLENBQUM2RyxJQUFJLENBQUMraEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFFbkMzWSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUMzUyxJQUFJLENBQUMsQ0FBQTtPQUMxQixDQUFBLENBQUE7TUFBQW1TLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGlCQUFBLEVBRWlCLFlBQU07RUFDdEIsTUFBQSxJQUFRcEosSUFBSSxHQUFLb0osS0FBQSxDQUFLTSxLQUFLLENBQW5CMUosSUFBSSxDQUFBO0VBQ1osTUFBQSxJQUFBd1EsV0FBQSxHQUE4Q3BILEtBQUEsQ0FBS2xSLEtBQUs7VUFBaERkLElBQUksR0FBQW9aLFdBQUEsQ0FBSnBaLElBQUk7VUFBRTRxQixVQUFVLEdBQUF4UixXQUFBLENBQVZ3UixVQUFVO1VBQUVDLGVBQWUsR0FBQXpSLFdBQUEsQ0FBZnlSLGVBQWUsQ0FBQTtFQUV6QyxNQUFBLElBQUlBLGVBQWUsRUFBRTtFQUNuQixRQUFBLG9CQUFPclksc0JBQUssQ0FBQ3NZLFlBQVksQ0FBQ0QsZUFBZSxFQUFFO0VBQ3pDN3FCLFVBQUFBLElBQUksRUFBSkEsSUFBSTtFQUNKcEMsVUFBQUEsS0FBSyxFQUFFZ0wsSUFBSTtZQUNYK0osUUFBUSxFQUFFWCxLQUFBLENBQUtzVyxZQUFBQTtFQUNqQixTQUFDLENBQUMsQ0FBQTtFQUNKLE9BQUE7UUFFQSxvQkFDRTlWLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxPQUFBLEVBQUE7RUFDRXNZLFFBQUFBLElBQUksRUFBQyxNQUFNO0VBQ1gzYyxRQUFBQSxTQUFTLEVBQUMsOEJBQThCO0VBQ3hDNGMsUUFBQUEsV0FBVyxFQUFDLE1BQU07RUFDbEJDLFFBQUFBLElBQUksRUFBQyxZQUFZO1VBQ2pCQyxRQUFRLEVBQUEsSUFBQTtFQUNSdHRCLFFBQUFBLEtBQUssRUFBRWdMLElBQUs7RUFDWitKLFFBQUFBLFFBQVEsRUFBRSxTQUFBQSxRQUFDZ1MsQ0FBQUEsRUFBRSxFQUFLO1lBQ2hCM1MsS0FBQSxDQUFLc1csWUFBWSxDQUFDM0QsRUFBRSxDQUFDbFAsTUFBTSxDQUFDN1gsS0FBSyxJQUFJZ3RCLFVBQVUsQ0FBQyxDQUFBO0VBQ2xELFNBQUE7RUFBRSxPQUNILENBQUMsQ0FBQTtPQUVMLENBQUEsQ0FBQTtNQXREQzVZLEtBQUEsQ0FBS00sS0FBSyxHQUFHO0VBQ1gxSixNQUFBQSxJQUFJLEVBQUVvSixLQUFBLENBQUtsUixLQUFLLENBQUM4cEIsVUFBQUE7T0FDbEIsQ0FBQTtFQUFDLElBQUEsT0FBQTVZLEtBQUEsQ0FBQTtFQUNKLEdBQUE7SUFBQzRCLFNBQUEsQ0FBQTJXLFNBQUEsRUFBQXhZLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUEwVyxTQUFBLEVBQUEsQ0FBQTtNQUFBNWMsR0FBQSxFQUFBLFFBQUE7TUFBQS9QLEtBQUEsRUFxREQsU0FBQStXLE1BQUFBLEdBQVM7UUFDUCxvQkFDRW5DLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBQyx3Q0FBQTtTQUNib0UsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLGdDQUFBO1NBQ1osRUFBQSxJQUFJLENBQUN0TixLQUFLLENBQUNxcUIsY0FDVCxDQUFDLGVBQ04zWSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUMsd0NBQUE7U0FDYm9FLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBQyw4QkFBQTtFQUE4QixPQUFBLEVBQzFDLElBQUksQ0FBQ2dkLGVBQWUsRUFDbEIsQ0FDRixDQUNGLENBQUMsQ0FBQTtFQUVWLEtBQUE7RUFBQyxHQUFBLENBQUEsRUFBQSxDQUFBO01BQUF6ZCxHQUFBLEVBQUEsMEJBQUE7RUFBQS9QLElBQUFBLEtBQUEsRUFoRUQsU0FBQXl0Qix3QkFBQUEsQ0FBZ0N2cUIsS0FBSyxFQUFFd1IsS0FBSyxFQUFFO0VBQzVDLE1BQUEsSUFBSXhSLEtBQUssQ0FBQzhwQixVQUFVLEtBQUt0WSxLQUFLLENBQUMxSixJQUFJLEVBQUU7VUFDbkMsT0FBTztZQUNMQSxJQUFJLEVBQUU5SCxLQUFLLENBQUM4cEIsVUFBQUE7V0FDYixDQUFBO0VBQ0gsT0FBQTs7RUFFQTtFQUNBLE1BQUEsT0FBTyxJQUFJLENBQUE7RUFDYixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBMUJvQ3BZLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDQXZDLFNBQVNzVyxpQkFBaUJBLENBQUE1cUIsSUFBQSxFQUt0QztFQUFBLEVBQUEsSUFBQTZxQixxQkFBQSxHQUFBN3FCLElBQUEsQ0FKRHluQixrQkFBa0I7RUFBbEJBLElBQUFBLGtCQUFrQixHQUFBb0QscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxLQUFLLEdBQUFBLHFCQUFBO01BQUFDLGFBQUEsR0FBQTlxQixJQUFBLENBQzFCK3FCLFFBQVE7RUFBUkEsSUFBQUEsUUFBUSxHQUFBRCxhQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsS0FBSyxHQUFBQSxhQUFBO01BQ2hCcGQsU0FBUyxHQUFBMU4sSUFBQSxDQUFUME4sU0FBUztNQUNUOEYsUUFBUSxHQUFBeFQsSUFBQSxDQUFSd1QsUUFBUSxDQUFBO0VBRVIsRUFBQSxJQUFJd1gsU0FBUyxHQUFHdkQsa0JBQWtCLEdBQzlCLGFBQWEsR0FBQSxhQUFBLENBQUEzbkIsTUFBQSxDQUNDaXJCLFFBQVEsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFFLENBQUE7SUFFL0Msb0JBQ0VqWixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxJQUFBQSxTQUFTLEVBQUVBLFNBQVU7RUFDckJpUSxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiLElBQUEsWUFBQSxFQUFZcU4sU0FBVTtNQUN0QixZQUFXLEVBQUEsTUFBQTtFQUFNLEdBQUEsRUFFaEJ4WCxRQUNFLENBQUMsQ0FBQTtFQUVWOztFQzBCQSxJQUFNeVgseUJBQXlCLEdBQUcsQ0FDaEMsK0JBQStCLEVBQy9CLGdDQUFnQyxFQUNoQyxxQ0FBcUMsQ0FDdEMsQ0FBQTtFQUVELElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLEdBQXFCO0VBQUEsRUFBQSxJQUFqQkMsT0FBTyxHQUFBL2xCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEVBQUUsQ0FBQTtFQUNwQyxFQUFBLElBQU1nbUIsVUFBVSxHQUFHLENBQUNELE9BQU8sQ0FBQ3pkLFNBQVMsSUFBSSxFQUFFLEVBQUV1YyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDekQsRUFBQSxPQUFPZ0IseUJBQXlCLENBQUNwbEIsSUFBSSxDQUNuQyxVQUFDd2xCLGFBQWEsRUFBQTtFQUFBLElBQUEsT0FBS0QsVUFBVSxDQUFDRSxPQUFPLENBQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUFBLEdBQzNELENBQUMsQ0FBQTtFQUNILENBQUMsQ0FBQTtFQUFDLElBRW1CRSxRQUFRLDBCQUFBbGEsZ0JBQUEsRUFBQTtJQWtLM0IsU0FBQWthLFFBQUFBLENBQVluckIsS0FBSyxFQUFFO0VBQUEsSUFBQSxJQUFBa1IsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQWdhLFFBQUEsQ0FBQSxDQUFBO0VBQ2pCamEsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUErWixJQUFBQSxFQUFBQSxRQUFBLEdBQU1uckIsS0FBSyxDQUFBLENBQUEsQ0FBQTtFQUFFcVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBa0RNLG9CQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQzlCUyxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvVSxjQUFjLENBQUMzRCxLQUFLLENBQUMsQ0FBQTtPQUNqQyxDQUFBLENBQUE7TUFBQVksZUFBQSxDQUFBSCxLQUFBLEVBQUEsb0JBQUEsRUFFb0IsWUFBTTtFQUN6QixNQUFBLE9BQU9BLEtBQUEsQ0FBS3FMLFlBQVksQ0FBQ3JKLE9BQU8sQ0FBQTtPQUNqQyxDQUFBLENBQUE7RUFBQTdCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUMvQixNQUFBLElBQUlxYSxnQkFBZ0IsQ0FBQ3JhLEtBQUssQ0FBQ2tFLE1BQU0sQ0FBQyxFQUFFO0VBQ2xDekQsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3JCLGVBQWUsRUFBRSxDQUFBO0VBQzlCLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQS9aLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFZSxZQUFNO0VBQ3BCLE1BQUEsSUFBQW9ILFdBQUEsR0FBK0NwSCxLQUFBLENBQUtsUixLQUFLO1VBQWpEbVksWUFBWSxHQUFBRyxXQUFBLENBQVpILFlBQVk7VUFBRUQsUUFBUSxHQUFBSSxXQUFBLENBQVJKLFFBQVE7VUFBRW1PLFVBQVUsR0FBQS9OLFdBQUEsQ0FBVitOLFVBQVUsQ0FBQTtFQUMxQyxNQUFBLElBQU01b0IsT0FBTyxHQUFHb08sbUJBQW1CLENBQUNxRixLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUMvQyxNQUFBLElBQU1rRixPQUFPLEdBQUcrRyxtQkFBbUIsQ0FBQ2lGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQy9DLE1BQUEsSUFBTWtULE9BQU8sR0FBR3JXLE9BQU8sRUFBRSxDQUFBO0VBQ3pCLE1BQUEsSUFBTXd1QixXQUFXLEdBQUdoRixVQUFVLElBQUluTyxRQUFRLElBQUlDLFlBQVksQ0FBQTtFQUMxRCxNQUFBLElBQUlrVCxXQUFXLEVBQUU7RUFDZixRQUFBLE9BQU9BLFdBQVcsQ0FBQTtFQUNwQixPQUFDLE1BQU07VUFDTCxJQUFJNXRCLE9BQU8sSUFBSTJCLGlCQUFRLENBQUM4VCxPQUFPLEVBQUV6VixPQUFPLENBQUMsRUFBRTtFQUN6QyxVQUFBLE9BQU9BLE9BQU8sQ0FBQTtXQUNmLE1BQU0sSUFBSXlILE9BQU8sSUFBSStKLGVBQU8sQ0FBQ2lFLE9BQU8sRUFBRWhPLE9BQU8sQ0FBQyxFQUFFO0VBQy9DLFVBQUEsT0FBT0EsT0FBTyxDQUFBO0VBQ2hCLFNBQUE7RUFDRixPQUFBO0VBQ0EsTUFBQSxPQUFPZ08sT0FBTyxDQUFBO09BQ2YsQ0FBQSxDQUFBO01BQUE3QixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBRWUsWUFBTTtFQUNwQkEsTUFBQUEsS0FBQSxDQUFLc0IsUUFBUSxDQUNYLFVBQUE1UyxJQUFBLEVBQUE7RUFBQSxRQUFBLElBQUdWLElBQUksR0FBQVUsSUFBQSxDQUFKVixJQUFJLENBQUE7VUFBQSxPQUFRO0VBQ2JBLFVBQUFBLElBQUksRUFBRXdLLG1CQUFTLENBQUN4SyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1dBQ3hCLENBQUE7RUFBQSxPQUFDLEVBQ0YsWUFBQTtVQUFBLE9BQU1nUyxLQUFBLENBQUtvYSxpQkFBaUIsQ0FBQ3BhLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFDLENBQUE7RUFBQSxPQUMvQyxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7TUFBQW1TLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFZSxZQUFNO0VBQ3BCQSxNQUFBQSxLQUFBLENBQUtzQixRQUFRLENBQ1gsVUFBQS9SLEtBQUEsRUFBQTtFQUFBLFFBQUEsSUFBR3ZCLElBQUksR0FBQXVCLEtBQUEsQ0FBSnZCLElBQUksQ0FBQTtVQUFBLE9BQVE7RUFDYkEsVUFBQUEsSUFBSSxFQUFFa0ssbUJBQVMsQ0FBQ2xLLElBQUksRUFBRSxDQUFDLENBQUE7V0FDeEIsQ0FBQTtFQUFBLE9BQUMsRUFDRixZQUFBO1VBQUEsT0FBTWdTLEtBQUEsQ0FBS29hLGlCQUFpQixDQUFDcGEsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUMsQ0FBQTtFQUFBLE9BQy9DLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBbVMsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQzVQLEdBQUcsRUFBRW1QLEtBQUssRUFBRThhLGVBQWUsRUFBSztRQUNoRHJhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsQ0FBQ2pVLEdBQUcsRUFBRW1QLEtBQUssRUFBRThhLGVBQWUsQ0FBQyxDQUFBO0VBQ2hEcmEsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb2hCLGVBQWUsSUFBSWxRLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLENBQUM5ZixHQUFHLENBQUMsQ0FBQTtPQUM5RCxDQUFBLENBQUE7RUFBQStQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUM1UCxHQUFHLEVBQUs7UUFDN0I0UCxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRTBHLFFBQUFBLGFBQWEsRUFBRTVYLEdBQUFBO0VBQUksT0FBQyxDQUFDLENBQUE7RUFDckM0UCxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNzZSxlQUFlLElBQUlwTixLQUFBLENBQUtsUixLQUFLLENBQUNzZSxlQUFlLENBQUNoZCxHQUFHLENBQUMsQ0FBQTtPQUM5RCxDQUFBLENBQUE7TUFBQStQLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHVCQUFBLEVBRXVCLFlBQU07UUFDNUJBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFMEcsUUFBQUEsYUFBYSxFQUFFLElBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQTtRQUN0Q2hJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dyQixpQkFBaUIsSUFBSXRhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dyQixpQkFBaUIsRUFBRSxDQUFBO09BQy9ELENBQUEsQ0FBQTtFQUFBbmEsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsVUFBQ1QsS0FBSyxFQUFFekosSUFBSSxFQUFLO1FBQ3RDa0ssS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUUwRyxRQUFBQSxhQUFhLEVBQUV1UyxlQUFPLENBQUM1dUIsT0FBTyxFQUFFLEVBQUVtSyxJQUFJLENBQUE7RUFBRSxPQUFDLENBQUMsQ0FBQTtFQUMxRCxNQUFBLENBQUMsQ0FBQ2tLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytvQixnQkFBZ0IsSUFBSTdYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytvQixnQkFBZ0IsQ0FBQ3RZLEtBQUssRUFBRXpKLElBQUksQ0FBQyxDQUFBO09BQzFFLENBQUEsQ0FBQTtFQUFBcUssSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsVUFBQ1QsS0FBSyxFQUFFekosSUFBSSxFQUFLO0VBQ3RDLE1BQUEsQ0FBQyxDQUFDa0ssS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3BCLGdCQUFnQixJQUFJOVgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3BCLGdCQUFnQixDQUFDdlksS0FBSyxFQUFFekosSUFBSSxDQUFDLENBQUE7T0FDMUUsQ0FBQSxDQUFBO0VBQUFxSyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxVQUFDaFMsSUFBSSxFQUFLO0VBQzNCLE1BQUEsSUFBSWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzByQixZQUFZLEVBQUU7RUFDM0J4YSxRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUMwckIsWUFBWSxDQUFDeHNCLElBQUksQ0FBQyxDQUFBO1VBQzdCZ1MsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUVtWixVQUFBQSx1QkFBdUIsRUFBRSxJQUFBO0VBQUssU0FBQyxDQUFDLENBQUE7RUFDbEQsT0FBQTtFQUNBLE1BQUEsSUFBSXphLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FWLGtCQUFrQixFQUFFO0VBQ2pDLFFBQUEsSUFBSW5FLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsRUFBRTtFQUN2QnJFLFVBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsQ0FBQ3JXLElBQUksQ0FBQyxDQUFBO0VBQzNCLFNBQUE7RUFDQSxRQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFPLEVBQUU7RUFDdEJ0RSxVQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7RUFDMUIsU0FBQTtFQUNGLE9BQUE7RUFFQXRFLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLElBQUlsUSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDbGlCLElBQUksQ0FBQyxDQUFBO09BQy9ELENBQUEsQ0FBQTtFQUFBbVMsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW1CLG1CQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBSztFQUM1QmdTLE1BQUFBLEtBQUEsQ0FBSzBhLHVCQUF1QixDQUFDMXNCLElBQUksQ0FBQyxDQUFBO0VBQ2xDLE1BQUEsSUFBSWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FWLGtCQUFrQixFQUFFO0VBQ2pDLFFBQUEsSUFBSW5FLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsRUFBRTtFQUN2QnJFLFVBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsQ0FBQ3JXLElBQUksQ0FBQyxDQUFBO0VBQzNCLFNBQUE7RUFDQSxRQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFPLEVBQUU7RUFDdEJ0RSxVQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7RUFDMUIsU0FBQTtFQUNGLE9BQUE7RUFFQXRFLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLElBQUlsUSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDbGlCLElBQUksQ0FBQyxDQUFBO09BQy9ELENBQUEsQ0FBQTtFQUFBbVMsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXlCLHlCQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBSztFQUNsQyxNQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUM2ckIsYUFBYSxFQUFFO0VBQzVCM2EsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNnJCLGFBQWEsQ0FBQzNzQixJQUFJLENBQUMsQ0FBQTtVQUM5QmdTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFbVosVUFBQUEsdUJBQXVCLEVBQUUsSUFBQTtFQUFLLFNBQUMsQ0FBQyxDQUFBO0VBQ2xELE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQXRhLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV1Qix1QkFBQSxFQUFBLFVBQUNoUyxJQUFJLEVBQUs7RUFDaENnUyxNQUFBQSxLQUFBLENBQUtvRSxnQkFBZ0IsQ0FBQ3BXLElBQUksQ0FBQyxDQUFBO0VBQzNCZ1MsTUFBQUEsS0FBQSxDQUFLb2EsaUJBQWlCLENBQUNwc0IsSUFBSSxDQUFDLENBQUE7T0FDN0IsQ0FBQSxDQUFBO0VBQUFtUyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFWSxZQUFBLEVBQUEsVUFBQ2xLLElBQUksRUFBSztFQUNyQmtLLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBek4sS0FBQSxFQUFBO0VBQUEsUUFBQSxJQUFHN0YsSUFBSSxHQUFBNkYsS0FBQSxDQUFKN0YsSUFBSSxDQUFBO1VBQUEsT0FBUTtFQUNiQSxVQUFBQSxJQUFJLEVBQUV1c0IsZUFBTyxDQUFDdnNCLElBQUksRUFBRThILElBQUksQ0FBQTtXQUN6QixDQUFBO0VBQUEsT0FBQyxFQUNGLFlBQUE7VUFBQSxPQUFNa0ssS0FBQSxDQUFLb0UsZ0JBQWdCLENBQUNwRSxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsT0FDOUMsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO0VBQUFtUyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFYSxhQUFBLEVBQUEsVUFBQzFNLEtBQUssRUFBSztFQUN2QjBNLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBN00sS0FBQSxFQUFBO0VBQUEsUUFBQSxJQUFHekcsSUFBSSxHQUFBeUcsS0FBQSxDQUFKekcsSUFBSSxDQUFBO1VBQUEsT0FBUTtFQUNiQSxVQUFBQSxJQUFJLEVBQUV1RixpQkFBUSxDQUFDdkYsSUFBSSxFQUFFc0YsS0FBSyxDQUFBO1dBQzNCLENBQUE7RUFBQSxPQUFDLEVBQ0YsWUFBQTtVQUFBLE9BQU0wTSxLQUFBLENBQUtvYSxpQkFBaUIsQ0FBQ3BhLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFDLENBQUE7RUFBQSxPQUMvQyxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7RUFBQW1TLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVpQixpQkFBQSxFQUFBLFVBQUN5RixTQUFTLEVBQUs7RUFDL0J6RixNQUFBQSxLQUFBLENBQUtzQixRQUFRLENBQ1gsVUFBQTNNLEtBQUEsRUFBQTtFQUFBLFFBQUEsSUFBRzNHLElBQUksR0FBQTJHLEtBQUEsQ0FBSjNHLElBQUksQ0FBQTtVQUFBLE9BQVE7RUFDYkEsVUFBQUEsSUFBSSxFQUFFdXNCLGVBQU8sQ0FBQ2huQixpQkFBUSxDQUFDdkYsSUFBSSxFQUFFdUgsaUJBQVEsQ0FBQ2tRLFNBQVMsQ0FBQyxDQUFDLEVBQUVwUSxlQUFPLENBQUNvUSxTQUFTLENBQUMsQ0FBQTtXQUN0RSxDQUFBO0VBQUEsT0FBQyxFQUNGLFlBQUE7VUFBQSxPQUFNekYsS0FBQSxDQUFLNGEscUJBQXFCLENBQUM1YSxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsT0FDbkQsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO01BQUFtUyxlQUFBLENBQUFILEtBQUEsRUFBQSxRQUFBLEVBRVEsWUFBNEI7RUFBQSxNQUFBLElBQTNCaFMsSUFBSSxHQUFBOEYsU0FBQSxDQUFBaEcsTUFBQSxRQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBR2tNLENBQUFBLENBQUFBLEdBQUFBLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFBO0VBQzlCLE1BQUEsSUFBTXlDLFdBQVcsR0FBR0YsY0FBYyxDQUNoQ3ZDLElBQUksRUFDSmdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakIyVCxLQUFBLENBQUtsUixLQUFLLENBQUMwQixnQkFDYixDQUFDLENBQUE7UUFFRCxJQUFNcXFCLFFBQVEsR0FBRyxFQUFFLENBQUE7RUFDbkIsTUFBQSxJQUFJN2EsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNmdCLGVBQWUsRUFBRTtFQUM5QmtMLFFBQUFBLFFBQVEsQ0FBQzllLElBQUksZUFDWHlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBSzlFLFVBQUFBLEdBQUcsRUFBQyxHQUFHO0VBQUNTLFVBQUFBLFNBQVMsRUFBQyw0QkFBQTtXQUNwQjRELEVBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dzQixTQUFTLElBQUksR0FDdEIsQ0FDUCxDQUFDLENBQUE7RUFDSCxPQUFBO1FBQ0EsT0FBT0QsUUFBUSxDQUFDcnNCLE1BQU0sQ0FDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQ2pCLEdBQUcsQ0FBQyxVQUFDcWdCLE1BQU0sRUFBSztFQUNwQyxRQUFBLElBQU14ZCxHQUFHLEdBQUd5ZCxlQUFPLENBQUNwZCxXQUFXLEVBQUVtZCxNQUFNLENBQUMsQ0FBQTtFQUN4QyxRQUFBLElBQU1tTixXQUFXLEdBQUcvYSxLQUFBLENBQUtnYixhQUFhLENBQUM1cUIsR0FBRyxFQUFFNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxDQUFDLENBQUE7RUFFOUQsUUFBQSxJQUFNNHVCLGdCQUFnQixHQUFHamIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbXNCLGdCQUFnQixHQUNoRGpiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21zQixnQkFBZ0IsQ0FBQzdxQixHQUFHLENBQUMsR0FDaEMyRCxTQUFTLENBQUE7VUFFYixvQkFDRXlNLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRTlFLFVBQUFBLEdBQUcsRUFBRWlTLE1BQU87WUFDWixZQUFZdmdCLEVBQUFBLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxNQUFNLEVBQUU0UCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQUU7RUFDdkQrUCxVQUFBQSxTQUFTLEVBQUV5RyxTQUFJLENBQUMsNEJBQTRCLEVBQUVvWSxnQkFBZ0IsQ0FBQTtFQUFFLFNBQUEsRUFFL0RGLFdBQ0UsQ0FBQyxDQUFBO0VBRVYsT0FBQyxDQUNILENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtFQUFBNWEsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFVBQUM1UCxHQUFHLEVBQUUvRCxNQUFNLEVBQUs7RUFDL0IsTUFBQSxJQUFJMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3NCLGFBQWEsRUFBRTtVQUM1QixPQUFPam9CLDJCQUEyQixDQUFDN0MsR0FBRyxFQUFFNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3NCLGFBQWEsRUFBRTd1QixNQUFNLENBQUMsQ0FBQTtFQUMzRSxPQUFBO0VBQ0EsTUFBQSxPQUFPMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcXNCLGdCQUFnQixHQUM5Qi9uQix1QkFBdUIsQ0FBQ2hELEdBQUcsRUFBRS9ELE1BQU0sQ0FBQyxHQUNwQzhHLHFCQUFxQixDQUFDL0MsR0FBRyxFQUFFL0QsTUFBTSxDQUFDLENBQUE7T0FDdkMsQ0FBQSxDQUFBO01BQUE4VCxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBTTtFQUNuQkEsTUFBQUEsS0FBQSxDQUFLc0IsUUFBUSxDQUNYLFVBQUF6TSxLQUFBLEVBQUE7RUFBQSxRQUFBLElBQUc3RyxJQUFJLEdBQUE2RyxLQUFBLENBQUo3RyxJQUFJLENBQUE7VUFBQSxPQUFRO0VBQ2JBLFVBQUFBLElBQUksRUFBRXVMLGlCQUFRLENBQ1p2TCxJQUFJLEVBQ0pnUyxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYyxHQUFHcGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOEssY0FBYyxHQUFHLENBQzFELENBQUE7V0FDRCxDQUFBO0VBQUEsT0FBQyxFQUNGLFlBQUE7VUFBQSxPQUFNb0csS0FBQSxDQUFLb0UsZ0JBQWdCLENBQUNwRSxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsT0FDOUMsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO01BQUFtUyxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUFNO1FBQ3pCQSxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRTBHLFFBQUFBLGFBQWEsRUFBRSxJQUFBO0VBQUssT0FBQyxDQUFDLENBQUE7T0FDdkMsQ0FBQSxDQUFBO01BQUE3SCxlQUFBLENBQUFILEtBQUEsRUFBQSxzQkFBQSxFQUVzQixZQUFNO0VBQzNCLE1BQUEsSUFBSUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXNCLGtCQUFrQixFQUFFO0VBQ2pDLFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFFQSxNQUFBLElBQUlDLG1CQUFtQixDQUFBO0VBQ3ZCLE1BQUEsUUFBUSxJQUFJO0VBQ1YsUUFBQSxLQUFLdGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQjtFQUNqQzZILFVBQUFBLG1CQUFtQixHQUFHbGlCLGtCQUFrQixDQUFDNEcsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUNyRSxVQUFBLE1BQUE7RUFDRixRQUFBLEtBQUtrUixLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYztFQUM1QkUsVUFBQUEsbUJBQW1CLEdBQUc3aEIsbUJBQW1CLENBQUN1RyxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQ3RFLFVBQUEsTUFBQTtFQUNGLFFBQUEsS0FBS2tSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRrQixxQkFBcUI7RUFDbkM0SCxVQUFBQSxtQkFBbUIsR0FBRzdpQixxQkFBcUIsQ0FDekN1SCxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksRUFDZmdTLEtBQUEsQ0FBS2xSLEtBQ1AsQ0FBQyxDQUFBO0VBQ0QsVUFBQSxNQUFBO0VBQ0YsUUFBQTtFQUNFd3NCLFVBQUFBLG1CQUFtQixHQUFHdmpCLG1CQUFtQixDQUFDaUksS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUN0RSxVQUFBLE1BQUE7RUFDSixPQUFBO1FBRUEsSUFDRyxDQUFDa1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeXNCLHdCQUF3QixJQUNuQyxDQUFDdmIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMHNCLDJCQUEyQixJQUN2Q0YsbUJBQW1CLElBQ3JCdGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW5CLGtCQUFrQixFQUM3QjtFQUNBLFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFFQSxNQUFBLElBQU1zRixXQUFXLEdBQUcsQ0FDbEIsbUNBQW1DLEVBQ25DLDZDQUE2QyxDQUM5QyxDQUFBO0VBRUQsTUFBQSxJQUFNOUcsT0FBTyxHQUFHLENBQ2QsOEJBQThCLEVBQzlCLHdDQUF3QyxDQUN6QyxDQUFBO0VBRUQsTUFBQSxJQUFJK0csWUFBWSxHQUFHMWIsS0FBQSxDQUFLMmIsYUFBYSxDQUFBO0VBRXJDLE1BQUEsSUFDRTNiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixtQkFBbUIsSUFDOUJ6VCxLQUFBLENBQUtsUixLQUFLLENBQUM0a0IscUJBQXFCLElBQ2hDMVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc3NCLGNBQWMsRUFDekI7VUFDQU0sWUFBWSxHQUFHMWIsS0FBQSxDQUFLNGIsWUFBWSxDQUFBO0VBQ2xDLE9BQUE7RUFFQSxNQUFBLElBQUlOLG1CQUFtQixJQUFJdGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMHNCLDJCQUEyQixFQUFFO0VBQ2pFN0csUUFBQUEsT0FBTyxDQUFDNVksSUFBSSxDQUFDLGtEQUFrRCxDQUFDLENBQUE7RUFDaEUyZixRQUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFBO0VBQ3JCLE9BQUE7RUFFQSxNQUFBLElBQU1HLFNBQVMsR0FDYjdiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixtQkFBbUIsSUFDOUJ6VCxLQUFBLENBQUtsUixLQUFLLENBQUM0a0IscUJBQXFCLElBQ2hDMVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc3NCLGNBQWMsQ0FBQTtFQUUzQixNQUFBLElBQUE5VCxZQUFBLEdBQThEdEgsS0FBQSxDQUFLbFIsS0FBSztVQUFoRWd0Qix3QkFBd0IsR0FBQXhVLFlBQUEsQ0FBeEJ3VSx3QkFBd0I7VUFBRUMsdUJBQXVCLEdBQUF6VSxZQUFBLENBQXZCeVUsdUJBQXVCLENBQUE7RUFFekQsTUFBQSxJQUFBdFUsWUFBQSxHQU9JekgsS0FBQSxDQUFLbFIsS0FBSztVQUFBa3RCLHFCQUFBLEdBQUF2VSxZQUFBLENBTlp3VSxzQkFBc0I7RUFBdEJBLFFBQUFBLHNCQUFzQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLE9BQU9GLHdCQUF3QixLQUFLLFFBQVEsR0FDakVBLHdCQUF3QixHQUN4QixnQkFBZ0IsR0FBQUUscUJBQUE7VUFBQUUsc0JBQUEsR0FBQXpVLFlBQUEsQ0FDcEIwVSxxQkFBcUI7RUFBckJBLFFBQUFBLHFCQUFxQixHQUFBRCxzQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLE9BQU9ILHVCQUF1QixLQUFLLFFBQVEsR0FDL0RBLHVCQUF1QixHQUN2QixlQUFlLEdBQUFHLHNCQUFBLENBQUE7UUFHckIsb0JBQ0UxYixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VzWSxRQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiM2MsUUFBQUEsU0FBUyxFQUFFdVksT0FBTyxDQUFDOW1CLElBQUksQ0FBQyxHQUFHLENBQUU7RUFDN0I2UyxRQUFBQSxPQUFPLEVBQUVnYixZQUFhO0VBQ3RCM1AsUUFBQUEsU0FBUyxFQUFFL0wsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7VUFDdEMsWUFBWXFWLEVBQUFBLFNBQVMsR0FBR00scUJBQXFCLEdBQUdGLHNCQUFBQTtTQUVoRHpiLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBRXFmLFdBQVcsQ0FBQzV0QixJQUFJLENBQUMsR0FBRyxDQUFBO0VBQUUsT0FBQSxFQUNwQ2d1QixTQUFTLEdBQ043YixLQUFBLENBQUtsUixLQUFLLENBQUNpdEIsdUJBQXVCLEdBQ2xDL2IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3RCLHdCQUNYLENBQ0EsQ0FBQyxDQUFBO09BRVosQ0FBQSxDQUFBO01BQUEzYixlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBTTtFQUNuQkEsTUFBQUEsS0FBQSxDQUFLc0IsUUFBUSxDQUNYLFVBQUF4TSxLQUFBLEVBQUE7RUFBQSxRQUFBLElBQUc5RyxJQUFJLEdBQUE4RyxLQUFBLENBQUo5RyxJQUFJLENBQUE7VUFBQSxPQUFRO0VBQ2JBLFVBQUFBLElBQUksRUFBRW9NLGlCQUFRLENBQ1pwTSxJQUFJLEVBQ0pnUyxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYyxHQUFHcGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOEssY0FBYyxHQUFHLENBQzFELENBQUE7V0FDRCxDQUFBO0VBQUEsT0FBQyxFQUNGLFlBQUE7VUFBQSxPQUFNb0csS0FBQSxDQUFLb0UsZ0JBQWdCLENBQUNwRSxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsT0FDOUMsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO01BQUFtUyxlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVrQixZQUFNO0VBQ3ZCLE1BQUEsSUFBSUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXNCLGtCQUFrQixFQUFFO0VBQ2pDLFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFFQSxNQUFBLElBQUllLG1CQUFtQixDQUFBO0VBQ3ZCLE1BQUEsUUFBUSxJQUFJO0VBQ1YsUUFBQSxLQUFLcGMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQjtFQUNqQzJJLFVBQUFBLG1CQUFtQixHQUFHbmlCLGlCQUFpQixDQUFDK0YsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUNwRSxVQUFBLE1BQUE7RUFDRixRQUFBLEtBQUtrUixLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYztFQUM1QmdCLFVBQUFBLG1CQUFtQixHQUFHL2hCLGtCQUFrQixDQUFDMkYsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUNyRSxVQUFBLE1BQUE7RUFDRixRQUFBLEtBQUtrUixLQUFBLENBQUtsUixLQUFLLENBQUM0a0IscUJBQXFCO0VBQ25DMEksVUFBQUEsbUJBQW1CLEdBQUdyakIsb0JBQW9CLENBQUNpSCxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQ3ZFLFVBQUEsTUFBQTtFQUNGLFFBQUE7RUFDRXN0QixVQUFBQSxtQkFBbUIsR0FBRy9qQixrQkFBa0IsQ0FBQzJILEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDckUsVUFBQSxNQUFBO0VBQ0osT0FBQTtRQUVBLElBQ0csQ0FBQ2tSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lzQix3QkFBd0IsSUFDbkMsQ0FBQ3ZiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBzQiwyQkFBMkIsSUFDdkNZLG1CQUFtQixJQUNyQnBjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FuQixrQkFBa0IsRUFDN0I7RUFDQSxRQUFBLE9BQUE7RUFDRixPQUFBO0VBRUEsTUFBQSxJQUFNeEIsT0FBTyxHQUFHLENBQ2QsOEJBQThCLEVBQzlCLG9DQUFvQyxDQUNyQyxDQUFBO0VBQ0QsTUFBQSxJQUFNOEcsV0FBVyxHQUFHLENBQ2xCLG1DQUFtQyxFQUNuQyx5Q0FBeUMsQ0FDMUMsQ0FBQTtFQUNELE1BQUEsSUFBSXpiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3V0QixjQUFjLEVBQUU7RUFDN0IxSCxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsK0NBQStDLENBQUMsQ0FBQTtFQUMvRCxPQUFBO0VBQ0EsTUFBQSxJQUFJaUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb25CLFdBQVcsRUFBRTtFQUMxQnZCLFFBQUFBLE9BQU8sQ0FBQzVZLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0VBQ3ZFLE9BQUE7RUFFQSxNQUFBLElBQUkyZixZQUFZLEdBQUcxYixLQUFBLENBQUtzYyxhQUFhLENBQUE7RUFFckMsTUFBQSxJQUNFdGMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUM5QnpULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRrQixxQkFBcUIsSUFDaEMxVCxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYyxFQUN6QjtVQUNBTSxZQUFZLEdBQUcxYixLQUFBLENBQUt1YyxZQUFZLENBQUE7RUFDbEMsT0FBQTtFQUVBLE1BQUEsSUFBSUgsbUJBQW1CLElBQUlwYyxLQUFBLENBQUtsUixLQUFLLENBQUMwc0IsMkJBQTJCLEVBQUU7RUFDakU3RyxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQTtFQUM1RDJmLFFBQUFBLFlBQVksR0FBRyxJQUFJLENBQUE7RUFDckIsT0FBQTtFQUVBLE1BQUEsSUFBTUcsU0FBUyxHQUNiN2IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUM5QnpULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRrQixxQkFBcUIsSUFDaEMxVCxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYyxDQUFBO0VBRTNCLE1BQUEsSUFBQXpULFlBQUEsR0FBc0QzSCxLQUFBLENBQUtsUixLQUFLO1VBQXhEMHRCLG9CQUFvQixHQUFBN1UsWUFBQSxDQUFwQjZVLG9CQUFvQjtVQUFFQyxtQkFBbUIsR0FBQTlVLFlBQUEsQ0FBbkI4VSxtQkFBbUIsQ0FBQTtFQUNqRCxNQUFBLElBQUF0VSxZQUFBLEdBT0luSSxLQUFBLENBQUtsUixLQUFLO1VBQUE0dEIscUJBQUEsR0FBQXZVLFlBQUEsQ0FOWndVLGtCQUFrQjtFQUFsQkEsUUFBQUEsa0JBQWtCLEdBQUFELHFCQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsT0FBT0Ysb0JBQW9CLEtBQUssUUFBUSxHQUN6REEsb0JBQW9CLEdBQ3BCLFlBQVksR0FBQUUscUJBQUE7VUFBQUUscUJBQUEsR0FBQXpVLFlBQUEsQ0FDaEIwVSxpQkFBaUI7RUFBakJBLFFBQUFBLGlCQUFpQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLE9BQU9ILG1CQUFtQixLQUFLLFFBQVEsR0FDdkRBLG1CQUFtQixHQUNuQixXQUFXLEdBQUFHLHFCQUFBLENBQUE7UUFHakIsb0JBQ0VwYyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VzWSxRQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiM2MsUUFBQUEsU0FBUyxFQUFFdVksT0FBTyxDQUFDOW1CLElBQUksQ0FBQyxHQUFHLENBQUU7RUFDN0I2UyxRQUFBQSxPQUFPLEVBQUVnYixZQUFhO0VBQ3RCM1AsUUFBQUEsU0FBUyxFQUFFL0wsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7VUFDdEMsWUFBWXFWLEVBQUFBLFNBQVMsR0FBR2dCLGlCQUFpQixHQUFHRixrQkFBQUE7U0FFNUNuYyxlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1yRSxRQUFBQSxTQUFTLEVBQUVxZixXQUFXLENBQUM1dEIsSUFBSSxDQUFDLEdBQUcsQ0FBQTtFQUFFLE9BQUEsRUFDcENndUIsU0FBUyxHQUNON2IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMnRCLG1CQUFtQixHQUM5QnpjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzB0QixvQkFDWCxDQUNBLENBQUMsQ0FBQTtPQUVaLENBQUEsQ0FBQTtNQUFBcmMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsb0JBQUEsRUFFb0IsWUFBNEI7RUFBQSxNQUFBLElBQTNCaFMsSUFBSSxHQUFBOEYsU0FBQSxDQUFBaEcsTUFBQSxRQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBR2tNLENBQUFBLENBQUFBLEdBQUFBLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFBO0VBQzFDLE1BQUEsSUFBTTJtQixPQUFPLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO0VBRW5ELE1BQUEsSUFBSTNVLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2d1QixnQkFBZ0IsRUFBRTtFQUMvQm5JLFFBQUFBLE9BQU8sQ0FBQzVZLElBQUksQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO0VBQ2xFLE9BQUE7RUFDQSxNQUFBLElBQUlpRSxLQUFBLENBQUtsUixLQUFLLENBQUNpdUIsaUJBQWlCLEVBQUU7RUFDaENwSSxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsbURBQW1ELENBQUMsQ0FBQTtFQUNuRSxPQUFBO0VBQ0EsTUFBQSxJQUFJaUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa3VCLHFCQUFxQixFQUFFO0VBQ3BDckksUUFBQUEsT0FBTyxDQUFDNVksSUFBSSxDQUFDLHVEQUF1RCxDQUFDLENBQUE7RUFDdkUsT0FBQTtRQUNBLG9CQUNFeUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFFdVksT0FBTyxDQUFDOW1CLElBQUksQ0FBQyxHQUFHLENBQUE7RUFBRSxPQUFBLEVBQy9CUixVQUFVLENBQUNXLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzFDLFVBQVUsRUFBRTRULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sQ0FDdkQsQ0FBQyxDQUFBO09BRVQsQ0FBQSxDQUFBO01BQUE4VCxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUEwQjtFQUFBLE1BQUEsSUFBekJpZCxZQUFZLEdBQUFucEIsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsS0FBSyxDQUFBO1FBQ3hDLElBQUksQ0FBQ2tNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2d1QixnQkFBZ0IsSUFBSUcsWUFBWSxFQUFFO0VBQ2hELFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFDQSxNQUFBLG9CQUNFemMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMEMsWUFBWSxFQUFBO0VBQ1hnQixRQUFBQSxrQkFBa0IsRUFBRW5FLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FWLGtCQUFtQjtFQUNsRG5XLFFBQUFBLElBQUksRUFBRWdTLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSztFQUN0QnFXLFFBQUFBLFFBQVEsRUFBRXJFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVM7RUFDOUJDLFFBQUFBLE9BQU8sRUFBRXRFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQVE7RUFDNUJFLFFBQUFBLFlBQVksRUFBRXhFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBWLFlBQWE7VUFDdEM3RCxRQUFRLEVBQUVYLEtBQUEsQ0FBS2tkLFVBQVc7RUFDMUIzd0IsUUFBQUEsT0FBTyxFQUFFeVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FBUTtFQUM1QnlILFFBQUFBLE9BQU8sRUFBRWdNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQVE7VUFDNUI4QixJQUFJLEVBQUVULGVBQU8sQ0FBQzJLLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFFO0VBQy9CeVQsUUFBQUEsc0JBQXNCLEVBQUV6QixLQUFBLENBQUtsUixLQUFLLENBQUMyUyxzQkFBdUI7RUFDMURELFFBQUFBLHNCQUFzQixFQUFFeEIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFMsc0JBQUFBO0VBQXVCLE9BQzNELENBQUMsQ0FBQTtPQUVMLENBQUEsQ0FBQTtNQUFBckIsZUFBQSxDQUFBSCxLQUFBLEVBQUEscUJBQUEsRUFFcUIsWUFBMEI7RUFBQSxNQUFBLElBQXpCaWQsWUFBWSxHQUFBbnBCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEtBQUssQ0FBQTtRQUN6QyxJQUFJLENBQUNrTSxLQUFBLENBQUtsUixLQUFLLENBQUNpdUIsaUJBQWlCLElBQUlFLFlBQVksRUFBRTtFQUNqRCxRQUFBLE9BQUE7RUFDRixPQUFBO0VBQ0EsTUFBQSxvQkFDRXpjLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3NFLGFBQWEsRUFBQTtFQUNaUCxRQUFBQSxZQUFZLEVBQUV4RSxLQUFBLENBQUtsUixLQUFLLENBQUMwVixZQUFhO0VBQ3RDblksUUFBQUEsTUFBTSxFQUFFMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTztVQUMxQnNVLFFBQVEsRUFBRVgsS0FBQSxDQUFLbWQsV0FBWTtVQUMzQjdwQixLQUFLLEVBQUVpQyxpQkFBUSxDQUFDeUssS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUU7RUFDakNrWCxRQUFBQSx1QkFBdUIsRUFBRWxGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29XLHVCQUFBQTtFQUF3QixPQUM3RCxDQUFDLENBQUE7T0FFTCxDQUFBLENBQUE7TUFBQS9FLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHlCQUFBLEVBRXlCLFlBQTBCO0VBQUEsTUFBQSxJQUF6QmlkLFlBQVksR0FBQW5wQixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxLQUFLLENBQUE7UUFDN0MsSUFBSSxDQUFDa00sS0FBQSxDQUFLbFIsS0FBSyxDQUFDa3VCLHFCQUFxQixJQUFJQyxZQUFZLEVBQUU7RUFDckQsUUFBQSxPQUFBO0VBQ0YsT0FBQTtFQUNBLE1BQUEsb0JBQ0V6YyxzQkFBQSxDQUFBQyxhQUFBLENBQUNxRixpQkFBaUIsRUFBQTtFQUNoQnRCLFFBQUFBLFlBQVksRUFBRXhFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBWLFlBQWE7RUFDdENuWSxRQUFBQSxNQUFNLEVBQUUyVCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFPO0VBQzFCRCxRQUFBQSxVQUFVLEVBQUU0VCxLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFXO1VBQ2xDdVUsUUFBUSxFQUFFWCxLQUFBLENBQUtvZCxlQUFnQjtFQUMvQjd3QixRQUFBQSxPQUFPLEVBQUV5VCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFRO0VBQzVCeUgsUUFBQUEsT0FBTyxFQUFFZ00sS0FBQSxDQUFLbFIsS0FBSyxDQUFDa0YsT0FBUTtFQUM1QmhHLFFBQUFBLElBQUksRUFBRWdTLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSztFQUN0QjRYLFFBQUFBLDJCQUEyQixFQUFFNUYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOFcsMkJBQUFBO0VBQTRCLE9BQ3JFLENBQUMsQ0FBQTtPQUVMLENBQUEsQ0FBQTtFQUFBekYsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXdCLHdCQUFBLEVBQUEsVUFBQ3dELENBQUMsRUFBSztRQUM5QnhELEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsQ0FBQ3BULGVBQWUsRUFBRSxFQUFFdVMsQ0FBQyxDQUFDLENBQUE7RUFDekN4RCxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxJQUFJbFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb2hCLGVBQWUsQ0FBQ2pmLGVBQWUsRUFBRSxDQUFDLENBQUE7T0FDNUUsQ0FBQSxDQUFBO01BQUFrUCxlQUFBLENBQUFILEtBQUEsRUFBQSxtQkFBQSxFQUVtQixZQUFNO0VBQ3hCLE1BQUEsSUFBSSxDQUFDQSxLQUFBLENBQUtsUixLQUFLLENBQUNvbkIsV0FBVyxJQUFJbFcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW5CLGtCQUFrQixFQUFFO0VBQzVELFFBQUEsT0FBQTtFQUNGLE9BQUE7UUFDQSxvQkFDRTNWLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFFBQUFBLFNBQVMsRUFBQyxnQ0FBZ0M7VUFDMUNzRSxPQUFPLEVBQUUsU0FBQUEsT0FBQUEsQ0FBQzhDLENBQUMsRUFBQTtFQUFBLFVBQUEsT0FBS3hELEtBQUEsQ0FBS3FkLHNCQUFzQixDQUFDN1osQ0FBQyxDQUFDLENBQUE7RUFBQSxTQUFBO0VBQUMsT0FBQSxFQUU5Q3hELEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29uQixXQUNULENBQUMsQ0FBQTtPQUVULENBQUEsQ0FBQTtFQUFBL1YsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXFCLHFCQUFBLEVBQUEsVUFBQWhMLEtBQUEsRUFBQTtFQUFBLE1BQUEsSUFBR3NvQixTQUFTLEdBQUF0b0IsS0FBQSxDQUFUc29CLFNBQVM7VUFBRS9oQixDQUFDLEdBQUF2RyxLQUFBLENBQUR1RyxDQUFDLENBQUE7UUFBQSxvQkFDbkNpRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQ0VyRSxTQUFTLEVBQUEsMkJBQUEsQ0FBQTVOLE1BQUEsQ0FDUHdSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3V0QixjQUFjLEdBQ3JCLDJDQUEyQyxHQUMzQyxFQUFFLENBQUE7U0FHUHJjLEVBQUFBLEtBQUEsQ0FBS3VkLGtCQUFrQixDQUFDRCxTQUFTLENBQUMsZUFDbkM5YyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQ0VyRSxTQUFTLEVBQUEseUVBQUEsQ0FBQTVOLE1BQUEsQ0FBNEV3UixLQUFBLENBQUtsUixLQUFLLENBQUMwVixZQUFZLENBQUc7VUFDL0dnWixPQUFPLEVBQUV4ZCxLQUFBLENBQUt5ZCxtQkFBQUE7RUFBb0IsT0FBQSxFQUVqQ3pkLEtBQUEsQ0FBSzBkLG1CQUFtQixDQUFDbmlCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDakN5RSxLQUFBLENBQUsyZCx1QkFBdUIsQ0FBQ3BpQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3JDeUUsS0FBQSxDQUFLNGQsa0JBQWtCLENBQUNyaUIsQ0FBQyxLQUFLLENBQUMsQ0FDN0IsQ0FBQyxlQUNOaUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLDZCQUFBO0VBQTZCLE9BQUEsRUFDekM0RCxLQUFBLENBQUswVSxNQUFNLENBQUM0SSxTQUFTLENBQ25CLENBQ0YsQ0FBQyxDQUFBO09BQ1AsQ0FBQSxDQUFBO01BQUFuZCxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUFxQjtFQUFBLE1BQUEsSUFBcEI2ZCxVQUFVLEdBQUEvcEIsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO0VBQ25DLE1BQUEsSUFBUXdwQixTQUFTLEdBQVFPLFVBQVUsQ0FBM0JQLFNBQVM7VUFBRS9oQixDQUFDLEdBQUtzaUIsVUFBVSxDQUFoQnRpQixDQUFDLENBQUE7RUFFcEIsTUFBQSxJQUNHeUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXRCLGNBQWMsSUFBSSxDQUFDcmMsS0FBQSxDQUFLTSxLQUFLLENBQUN3ZCxjQUFjLElBQ3hEOWQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW5CLGtCQUFrQixFQUM3QjtFQUNBLFFBQUEsT0FBTyxJQUFJLENBQUE7RUFDYixPQUFBO0VBRUEsTUFBQSxJQUFNNEgsdUJBQXVCLEdBQUdobUIsbUJBQW1CLENBQ2pEaUksS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQ2ZnUyxLQUFBLENBQUtsUixLQUNQLENBQUMsQ0FBQTtFQUVELE1BQUEsSUFBTWt2Qix1QkFBdUIsR0FBRzNsQixrQkFBa0IsQ0FDaEQySCxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksRUFDZmdTLEtBQUEsQ0FBS2xSLEtBQ1AsQ0FBQyxDQUFBO0VBRUQsTUFBQSxJQUFNbXZCLHNCQUFzQixHQUFHN2tCLGtCQUFrQixDQUMvQzRHLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUNmZ1MsS0FBQSxDQUFLbFIsS0FDUCxDQUFDLENBQUE7RUFFRCxNQUFBLElBQU1vdkIsc0JBQXNCLEdBQUdqa0IsaUJBQWlCLENBQzlDK0YsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQ2ZnUyxLQUFBLENBQUtsUixLQUNQLENBQUMsQ0FBQTtRQUVELElBQU1xdkIsWUFBWSxHQUNoQixDQUFDbmUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUMvQixDQUFDelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNGtCLHFCQUFxQixJQUNqQyxDQUFDMVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc3NCLGNBQWMsQ0FBQTtRQUU1QixvQkFDRTVhLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFFBQUFBLFNBQVMsRUFBQywyREFBMkQ7RUFDckVvaEIsUUFBQUEsT0FBTyxFQUFFeGQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3JCLGVBQUFBO0VBQWdCLE9BQUEsRUFFbkNsYSxLQUFBLENBQUtsUixLQUFLLENBQUN1c0Isa0JBQWtCLENBQUErQyxjQUFBLENBQUFBLGNBQUEsQ0FBQSxFQUFBLEVBQ3pCcGUsS0FBQSxDQUFLTSxLQUFLLENBQUEsRUFBQSxFQUFBLEVBQUE7RUFDYitkLFFBQUFBLGlCQUFpQixFQUFFOWlCLENBQUM7RUFDcEIraEIsUUFBQUEsU0FBUyxFQUFUQSxTQUFTO1VBQ1RILFdBQVcsRUFBRW5kLEtBQUEsQ0FBS21kLFdBQVc7VUFDN0JELFVBQVUsRUFBRWxkLEtBQUEsQ0FBS2tkLFVBQVU7VUFDM0J2QixhQUFhLEVBQUUzYixLQUFBLENBQUsyYixhQUFhO1VBQ2pDVyxhQUFhLEVBQUV0YyxLQUFBLENBQUtzYyxhQUFhO1VBQ2pDVixZQUFZLEVBQUU1YixLQUFBLENBQUs0YixZQUFZO1VBQy9CVyxZQUFZLEVBQUV2YyxLQUFBLENBQUt1YyxZQUFZO0VBQy9Cd0IsUUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFBdUI7RUFDdkJDLFFBQUFBLHVCQUF1QixFQUF2QkEsdUJBQXVCO0VBQ3ZCQyxRQUFBQSxzQkFBc0IsRUFBdEJBLHNCQUFzQjtFQUN0QkMsUUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFBQUE7RUFBc0IsT0FBQSxDQUN2QixDQUFDLEVBQ0RDLFlBQVksaUJBQ1gzZCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUMsNkJBQUE7RUFBNkIsT0FBQSxFQUN6QzRELEtBQUEsQ0FBSzBVLE1BQU0sQ0FBQzRJLFNBQVMsQ0FDbkIsQ0FFSixDQUFDLENBQUE7T0FFVCxDQUFBLENBQUE7RUFBQW5kLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVrQixrQkFBQSxFQUFBLFVBQUFwSyxLQUFBLEVBQW1CO0VBQUEsTUFBQSxJQUFoQjBuQixTQUFTLEdBQUExbkIsS0FBQSxDQUFUMG5CLFNBQVMsQ0FBQTtFQUM3QixNQUFBLElBQUFqVixZQUFBLEdBQTJDckksS0FBQSxDQUFLbFIsS0FBSztVQUE3Q3NzQixjQUFjLEdBQUEvUyxZQUFBLENBQWQrUyxjQUFjO1VBQUV4aEIsY0FBYyxHQUFBeU8sWUFBQSxDQUFkek8sY0FBYyxDQUFBO0VBQ3RDLE1BQUEsSUFBQUMsZUFBQSxHQUFtQ0MsY0FBYyxDQUMvQ3dqQixTQUFTLEVBQ1QxakIsY0FDRixDQUFDO1VBSE9hLFdBQVcsR0FBQVosZUFBQSxDQUFYWSxXQUFXO1VBQUVWLFNBQVMsR0FBQUYsZUFBQSxDQUFURSxTQUFTLENBQUE7UUFJOUIsb0JBQ0V5RyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUMsdURBQUE7RUFBdUQsT0FBQSxFQUNuRWdmLGNBQWMsR0FBQSxFQUFBLENBQUE1c0IsTUFBQSxDQUFNaU0sV0FBVyxFQUFBak0sS0FBQUEsQ0FBQUEsQ0FBQUEsTUFBQSxDQUFNdUwsU0FBUyxDQUFLMUUsR0FBQUEsZUFBTyxDQUFDaW9CLFNBQVMsQ0FDbEUsQ0FBQyxDQUFBO09BRVQsQ0FBQSxDQUFBO0VBQUFuZCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsVUFBQzZkLFVBQVUsRUFBSztFQUM3QixNQUFBLFFBQVEsSUFBSTtFQUNWLFFBQUEsS0FBSzdkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VzQixrQkFBa0IsS0FBS3RuQixTQUFTO0VBQzlDLFVBQUEsT0FBT2lNLEtBQUEsQ0FBS3FiLGtCQUFrQixDQUFDd0MsVUFBVSxDQUFDLENBQUE7RUFDNUMsUUFBQSxLQUFLN2QsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUNqQ3pULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRrQixxQkFBcUIsSUFDaEMxVCxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYztFQUN6QixVQUFBLE9BQU9wYixLQUFBLENBQUtzZSxnQkFBZ0IsQ0FBQ1QsVUFBVSxDQUFDLENBQUE7RUFDMUMsUUFBQTtFQUNFLFVBQUEsT0FBTzdkLEtBQUEsQ0FBS3VlLG1CQUFtQixDQUFDVixVQUFVLENBQUMsQ0FBQTtFQUMvQyxPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUExZCxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBTTtFQUFBLE1BQUEsSUFBQXdlLHFCQUFBLENBQUE7UUFDbkIsSUFBSXhlLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FuQixrQkFBa0IsSUFBSW5XLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NzQixjQUFjLEVBQUU7RUFDOUQsUUFBQSxPQUFBO0VBQ0YsT0FBQTtRQUVBLElBQU1xRCxTQUFTLEdBQUcsRUFBRSxDQUFBO0VBQ3BCLE1BQUEsSUFBTUMsZ0JBQWdCLEdBQUcxZSxLQUFBLENBQUtsUixLQUFLLENBQUM2dkIsa0JBQWtCLEdBQ2xEM2UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOHZCLFdBQVcsR0FBRyxDQUFDLEdBQzFCLENBQUMsQ0FBQTtFQUNMLE1BQUEsSUFBTUMsYUFBYSxHQUNqQjdlLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixtQkFBbUIsSUFBSXpULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRrQixxQkFBcUIsR0FDOUR0WixpQkFBUSxDQUFDNEYsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQUUwd0IsZ0JBQWdCLENBQUMsR0FDM0N4bUIsbUJBQVMsQ0FBQzhILEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUFFMHdCLGdCQUFnQixDQUFDLENBQUE7RUFDbEQsTUFBQSxJQUFNckUsZUFBZSxHQUFBLENBQUFtRSxxQkFBQSxHQUFHeGUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXJCLGVBQWUsTUFBQW1FLElBQUFBLElBQUFBLHFCQUFBLEtBQUFBLEtBQUFBLENBQUFBLEdBQUFBLHFCQUFBLEdBQUlFLGdCQUFnQixDQUFBO0VBQ3RFLE1BQUEsS0FBSyxJQUFJbmpCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3lFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzh2QixXQUFXLEVBQUUsRUFBRXJqQixDQUFDLEVBQUU7RUFDL0MsUUFBQSxJQUFNdWpCLFdBQVcsR0FBR3ZqQixDQUFDLEdBQUc4ZSxlQUFlLEdBQUdxRSxnQkFBZ0IsQ0FBQTtVQUMxRCxJQUFNcEIsU0FBUyxHQUNidGQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUFJelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNGtCLHFCQUFxQixHQUM5RHRaLGlCQUFRLENBQUN5a0IsYUFBYSxFQUFFQyxXQUFXLENBQUMsR0FDcEN0bUIsbUJBQVMsQ0FBQ3FtQixhQUFhLEVBQUVDLFdBQVcsQ0FBQyxDQUFBO0VBQzNDLFFBQUEsSUFBTUMsUUFBUSxHQUFBLFFBQUEsQ0FBQXZ3QixNQUFBLENBQVkrTSxDQUFDLENBQUUsQ0FBQTtVQUM3QixJQUFNaVEsMEJBQTBCLEdBQUdqUSxDQUFDLEdBQUd5RSxLQUFBLENBQUtsUixLQUFLLENBQUM4dkIsV0FBVyxHQUFHLENBQUMsQ0FBQTtFQUNqRSxRQUFBLElBQU1uVCw0QkFBNEIsR0FBR2xRLENBQUMsR0FBRyxDQUFDLENBQUE7RUFDMUNrakIsUUFBQUEsU0FBUyxDQUFDMWlCLElBQUksZUFDWnlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRTlFLFVBQUFBLEdBQUcsRUFBRW9qQixRQUFTO0VBQ2RqYyxVQUFBQSxHQUFHLEVBQUUsU0FBQUEsR0FBQ2tjLENBQUFBLEdBQUcsRUFBSztjQUNaaGYsS0FBQSxDQUFLOGQsY0FBYyxHQUFHa0IsR0FBRyxDQUFBO2FBQ3pCO0VBQ0Y1aUIsVUFBQUEsU0FBUyxFQUFDLG1DQUFBO1dBRVQ0RCxFQUFBQSxLQUFBLENBQUtpZixZQUFZLENBQUM7RUFBRTNCLFVBQUFBLFNBQVMsRUFBVEEsU0FBUztFQUFFL2hCLFVBQUFBLENBQUMsRUFBREEsQ0FBQUE7RUFBRSxTQUFDLENBQUMsZUFDcENpRixzQkFBQSxDQUFBQyxhQUFBLENBQUNzTyxLQUFLLEVBQUE7RUFDSmpCLFVBQUFBLHdCQUF3QixFQUFFOU4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ2Ysd0JBQXlCO0VBQzlEQyxVQUFBQSwwQkFBMEIsRUFBRS9OLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lmLDBCQUEyQjtFQUNsRTJCLFVBQUFBLG1CQUFtQixFQUFFMVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNGdCLG1CQUFvQjtFQUNwRDFDLFVBQUFBLGVBQWUsRUFBRWhOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ293QixvQkFBcUI7WUFDakR2ZSxRQUFRLEVBQUVYLEtBQUEsQ0FBS29kLGVBQWdCO0VBQy9CaHRCLFVBQUFBLEdBQUcsRUFBRWt0QixTQUFVO0VBQ2YzVSxVQUFBQSxZQUFZLEVBQUUzSSxLQUFBLENBQUtsUixLQUFLLENBQUM2WixZQUFhO0VBQ3RDblksVUFBQUEsZ0JBQWdCLEVBQUV3UCxLQUFBLENBQUtsUixLQUFLLENBQUMwQixnQkFBaUI7RUFDOUN1Z0IsVUFBQUEsY0FBYyxFQUFFL1EsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWlCLGNBQWU7WUFDMUM1RCxVQUFVLEVBQUVuTixLQUFBLENBQUtzTixjQUFlO0VBQ2hDOUcsVUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcXdCLGtCQUFtQjtFQUMvQy9PLFVBQUFBLG9CQUFvQixFQUFFcFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7RUFDakR5RixVQUFBQSxlQUFlLEVBQUVqTSxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFnQjtZQUM1Q21CLGVBQWUsRUFBRXBOLEtBQUEsQ0FBS2lPLG1CQUFvQjtZQUMxQ2dCLFlBQVksRUFBRWpQLEtBQUEsQ0FBS29mLHFCQUFzQjtFQUN6Qy9SLFVBQUFBLFlBQVksRUFBRXJOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VlLFlBQWE7RUFDdEMyQixVQUFBQSxjQUFjLEVBQUV6VCxDQUFFO0VBQ2xCaVMsVUFBQUEsZ0JBQWdCLEVBQUV4TixLQUFBLENBQUtsUixLQUFLLENBQUMwZSxnQkFBaUI7RUFDOUNuaEIsVUFBQUEsTUFBTSxFQUFFMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTztFQUMxQkUsVUFBQUEsT0FBTyxFQUFFeVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FBUTtFQUM1QnlILFVBQUFBLE9BQU8sRUFBRWdNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQVE7RUFDNUJDLFVBQUFBLFlBQVksRUFBRStMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21GLFlBQWE7RUFDdENDLFVBQUFBLG9CQUFvQixFQUFFOEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb0Ysb0JBQXFCO0VBQ3REaUgsVUFBQUEsY0FBYyxFQUFFNkUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcU0sY0FBZTtFQUMxQ29NLFVBQUFBLFFBQVEsRUFBRXZILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lZLFFBQVM7RUFDOUJTLFVBQUFBLGFBQWEsRUFBRWhJLEtBQUEsQ0FBS00sS0FBSyxDQUFDMEgsYUFBYztFQUN4QzdULFVBQUFBLFlBQVksRUFBRTZMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FGLFlBQWE7RUFDdENDLFVBQUFBLG9CQUFvQixFQUFFNEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0Ysb0JBQXFCO0VBQ3REK1csVUFBQUEsTUFBTSxFQUFFbkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTztFQUMxQkMsVUFBQUEsb0JBQW9CLEVBQUVwTCxLQUFBLENBQUtsUixLQUFLLENBQUNzYyxvQkFBcUI7RUFDdERtRSxVQUFBQSxXQUFXLEVBQUV2UCxLQUFBLENBQUtsUixLQUFLLENBQUN5Z0IsV0FBWTtFQUNwQ2xiLFVBQUFBLFVBQVUsRUFBRTJMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VGLFVBQVc7RUFDbEM0UyxVQUFBQSxZQUFZLEVBQUVqSCxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFhO0VBQ3RDaUosVUFBQUEsZUFBZSxFQUFFbFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb2hCLGVBQWdCO0VBQzVDbEosVUFBQUEsUUFBUSxFQUFFaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUztFQUM5QlksVUFBQUEsWUFBWSxFQUFFNUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOFksWUFBYTtFQUN0Q0MsVUFBQUEsVUFBVSxFQUFFN0gsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK1ksVUFBVztFQUNsQ0MsVUFBQUEsWUFBWSxFQUFFOUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1osWUFBYTtFQUN0Q0MsVUFBQUEsMEJBQTBCLEVBQUUvSCxLQUFBLENBQUtsUixLQUFLLENBQUNpWiwwQkFBMkI7RUFDbEVsQixVQUFBQSxlQUFlLEVBQUU3RyxLQUFBLENBQUtsUixLQUFLLENBQUMrWCxlQUFnQjtFQUM1Q0MsVUFBQUEsYUFBYSxFQUFFOUcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1ksYUFBYztFQUN4QzZJLFVBQUFBLGVBQWUsRUFBRTNQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZnQixlQUFnQjtFQUM1Qy9nQixVQUFBQSxTQUFTLEVBQUVvUixLQUFBLENBQUtsUixLQUFLLENBQUNGLFNBQVU7RUFDaENDLFVBQUFBLE9BQU8sRUFBRW1SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBUTtFQUM1QmtoQixVQUFBQSxhQUFhLEVBQUUvUCxLQUFBLENBQUtsUixLQUFLLENBQUNpaEIsYUFBYztFQUN4Q3pMLFVBQUFBLE9BQU8sRUFBRXRFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQVE7RUFDNUJpSixVQUFBQSxtQkFBbUIsRUFBRXZOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3llLG1CQUFvQjtFQUNwRDFCLFVBQUFBLGlCQUFpQixFQUFFN0wsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK2MsaUJBQWtCO0VBQ2hEcUcsVUFBQUEsa0JBQWtCLEVBQUVsUyxLQUFBLENBQUtsUixLQUFLLENBQUNvakIsa0JBQW1CO0VBQ2xESSxVQUFBQSxvQkFBb0IsRUFBRXRTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dqQixvQkFBcUI7RUFDdERzRixVQUFBQSxpQkFBaUIsRUFBRTVYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhvQixpQkFBa0I7RUFDaERqUixVQUFBQSwwQkFBMEIsRUFBRTNHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEyQjtFQUNsRThNLFVBQUFBLG1CQUFtQixFQUFFelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFvQjtFQUNwRHhCLFVBQUFBLHVCQUF1QixFQUFFalMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWpCLHVCQUF3QjtFQUM1RG5ELFVBQUFBLDRCQUE0QixFQUMxQjlPLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dnQiw0QkFDWjtFQUNERCxVQUFBQSw2QkFBNkIsRUFDM0I3TyxLQUFBLENBQUtsUixLQUFLLENBQUMrZiw2QkFDWjtFQUNEdU0sVUFBQUEsY0FBYyxFQUFFcGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc3NCLGNBQWU7RUFDMUMxSCxVQUFBQSxxQkFBcUIsRUFBRTFULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRrQixxQkFBc0I7RUFDeER4TSxVQUFBQSxjQUFjLEVBQUVsSCxLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFlO0VBQzFDNkQsVUFBQUEsY0FBYyxFQUFFL0ssS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWMsY0FBZTtZQUMxQ00sWUFBWSxFQUFFckwsS0FBQSxDQUFLcUwsWUFBYTtFQUNoQ0csVUFBQUEsMEJBQTBCLEVBQUVBLDBCQUEyQjtFQUN2REMsVUFBQUEsNEJBQTRCLEVBQUVBLDRCQUFBQTtXQUMvQixDQUNFLENBQ1AsQ0FBQyxDQUFBO0VBQ0gsT0FBQTtFQUNBLE1BQUEsT0FBT2dULFNBQVMsQ0FBQTtPQUNqQixDQUFBLENBQUE7TUFBQXRlLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGFBQUEsRUFFYSxZQUFNO0VBQ2xCLE1BQUEsSUFBSUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW5CLGtCQUFrQixFQUFFO0VBQ2pDLFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFDQSxNQUFBLElBQUluVyxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYyxFQUFFO1VBQzdCLG9CQUNFNWEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsVUFBQUEsU0FBUyxFQUFDLG1DQUFBO1dBQ1o0RCxFQUFBQSxLQUFBLENBQUtpZixZQUFZLENBQUM7RUFBRTNCLFVBQUFBLFNBQVMsRUFBRXRkLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBQUE7V0FBTSxDQUFDLGVBQ2xEd1Msc0JBQUEsQ0FBQUMsYUFBQSxDQUFDaVcsSUFBSSxFQUFBMkksUUFBQSxDQUFBO1lBQ0hsUyxVQUFVLEVBQUVuTixLQUFBLENBQUtzTixjQUFlO0VBQ2hDdEYsVUFBQUEsYUFBYSxFQUFFaEksS0FBQSxDQUFLTSxLQUFLLENBQUMwSCxhQUFjO1lBQ3hDc1Esa0JBQWtCLEVBQUV0WSxLQUFBLENBQUtzWSxrQkFBbUI7RUFDNUN0cUIsVUFBQUEsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFBQTtXQUNiZ1MsRUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxFQUFBO1lBQ2Qrb0IsZ0JBQWdCLEVBQUU3WCxLQUFBLENBQUtzZixvQkFBcUI7WUFDNUN4SCxnQkFBZ0IsRUFBRTlYLEtBQUEsQ0FBS3VmLG9CQUFBQTtFQUFxQixTQUFBLENBQzdDLENBQ0UsQ0FBQyxDQUFBO0VBRVYsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBcGYsZUFBQSxDQUFBSCxLQUFBLEVBQUEsbUJBQUEsRUFFbUIsWUFBTTtFQUN4QixNQUFBLElBQ0VBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3V0QixjQUFjLEtBQ3hCcmMsS0FBQSxDQUFLTSxLQUFLLENBQUN3ZCxjQUFjLElBQUk5ZCxLQUFBLENBQUtsUixLQUFLLENBQUNxbkIsa0JBQWtCLENBQUMsRUFDNUQ7RUFDQSxRQUFBLG9CQUNFM1Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMlQsSUFBSSxFQUFBO0VBQ0hwTixVQUFBQSxRQUFRLEVBQUVoSCxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFTO0VBQzlCbU8sVUFBQUEsVUFBVSxFQUFFblYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW1CLFVBQVc7RUFDbEN4VSxVQUFBQSxRQUFRLEVBQUVYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3duQixZQUFhO0VBQ2xDMUIsVUFBQUEsYUFBYSxFQUFFNVUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOGxCLGFBQWM7RUFDeEN4bUIsVUFBQUEsTUFBTSxFQUFFNFIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMHdCLFVBQVc7RUFDOUJub0IsVUFBQUEsWUFBWSxFQUFFMkksS0FBQSxDQUFLbFIsS0FBSyxDQUFDdUksWUFBYTtFQUN0Q2tHLFVBQUFBLFNBQVMsRUFBRXlDLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJ3QixhQUFjO0VBQ3BDaG9CLFVBQUFBLE9BQU8sRUFBRXVJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJJLE9BQVE7RUFDNUJDLFVBQUFBLE9BQU8sRUFBRXNJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRJLE9BQVE7RUFDNUJOLFVBQUFBLFlBQVksRUFBRTRJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NJLFlBQWE7RUFDdENFLFVBQUFBLFVBQVUsRUFBRTBJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dJLFVBQVc7RUFDbEM4ZSxVQUFBQSxXQUFXLEVBQUVwVyxLQUFBLENBQUtsUixLQUFLLENBQUNzbkIsV0FBWTtFQUNwQ0YsVUFBQUEsV0FBVyxFQUFFbFcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb25CLFdBQVk7RUFDcEM2RyxVQUFBQSxpQkFBaUIsRUFBRS9jLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2l1QixpQkFBa0I7RUFDaERDLFVBQUFBLHFCQUFxQixFQUFFaGQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa3VCLHFCQUFzQjtFQUN4REYsVUFBQUEsZ0JBQWdCLEVBQUU5YyxLQUFBLENBQUtsUixLQUFLLENBQUNndUIsZ0JBQWlCO0VBQzlDNEMsVUFBQUEsVUFBVSxFQUFFMWYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNHdCLFVBQVc7RUFDbENqTCxVQUFBQSxRQUFRLEVBQUV6VSxLQUFBLENBQUtNLEtBQUssQ0FBQ3dkLGNBQWU7RUFDcEMvSSxVQUFBQSxXQUFXLEVBQUUvVSxLQUFBLENBQUtsUixLQUFLLENBQUNpbUIsV0FBWTtFQUNwQzFvQixVQUFBQSxNQUFNLEVBQUUyVCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFPO0VBQzFCbWEsVUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7RUFDNUMyUCxVQUFBQSxrQkFBa0IsRUFBRW5XLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FuQixrQkFBQUE7RUFBbUIsU0FDbkQsQ0FBQyxDQUFBO0VBRU4sT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBaFcsZUFBQSxDQUFBSCxLQUFBLEVBQUEsd0JBQUEsRUFFd0IsWUFBTTtRQUM3QixJQUFNcEosSUFBSSxHQUFHLElBQUkzSyxJQUFJLENBQUMrVCxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUMsQ0FBQTtFQUMxQyxNQUFBLElBQU0yWSxTQUFTLEdBQUd6ekIsT0FBTyxDQUFDMEssSUFBSSxDQUFDLElBQUlncEIsT0FBTyxDQUFDNWYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLENBQUE7UUFDL0QsSUFBTTRSLFVBQVUsR0FBRytHLFNBQVMsR0FBQW54QixFQUFBQSxDQUFBQSxNQUFBLENBQ3JCd1AsT0FBTyxDQUFDcEgsSUFBSSxDQUFDRyxRQUFRLEVBQUUsQ0FBQyxFQUFBdkksR0FBQUEsQ0FBQUEsQ0FBQUEsTUFBQSxDQUFJd1AsT0FBTyxDQUFDcEgsSUFBSSxDQUFDSSxVQUFVLEVBQUUsQ0FBQyxDQUFBLEdBQ3pELEVBQUUsQ0FBQTtFQUNOLE1BQUEsSUFBSWdKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyt3QixhQUFhLEVBQUU7RUFDNUIsUUFBQSxvQkFDRXJmLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FmLFNBQVMsRUFBQTtFQUNSOXhCLFVBQUFBLElBQUksRUFBRTRJLElBQUs7RUFDWGdpQixVQUFBQSxVQUFVLEVBQUVBLFVBQVc7RUFDdkJPLFVBQUFBLGNBQWMsRUFBRW5aLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FxQixjQUFlO0VBQzFDeFksVUFBQUEsUUFBUSxFQUFFWCxLQUFBLENBQUtsUixLQUFLLENBQUN3bkIsWUFBYTtFQUNsQ3VDLFVBQUFBLGVBQWUsRUFBRTdZLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytwQixlQUFBQTtFQUFnQixTQUM3QyxDQUFDLENBQUE7RUFFTixPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUExWSxlQUFBLENBQUFILEtBQUEsRUFBQSxzQkFBQSxFQUVzQixZQUFNO0VBQzNCLE1BQUEsSUFBQXhGLGdCQUFBLEdBQW1DVixjQUFjLENBQy9Da0csS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQ2ZnUyxLQUFBLENBQUtsUixLQUFLLENBQUM4SyxjQUNiLENBQUM7VUFIT2EsV0FBVyxHQUFBRCxnQkFBQSxDQUFYQyxXQUFXO1VBQUVWLFNBQVMsR0FBQVMsZ0JBQUEsQ0FBVFQsU0FBUyxDQUFBO0VBSTlCLE1BQUEsSUFBSWdtQixlQUFlLENBQUE7RUFFbkIsTUFBQSxJQUFJL2YsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc3NCLGNBQWMsRUFBRTtVQUM3QjJFLGVBQWUsR0FBQSxFQUFBLENBQUF2eEIsTUFBQSxDQUFNaU0sV0FBVyxTQUFBak0sTUFBQSxDQUFNdUwsU0FBUyxDQUFFLENBQUE7RUFDbkQsT0FBQyxNQUFNLElBQ0xpRyxLQUFBLENBQUtsUixLQUFLLENBQUMya0IsbUJBQW1CLElBQzlCelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNGtCLHFCQUFxQixFQUNoQztVQUNBcU0sZUFBZSxHQUFHMXFCLGVBQU8sQ0FBQzJLLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFDLENBQUE7RUFDNUMsT0FBQyxNQUFNO0VBQ0wreEIsUUFBQUEsZUFBZSxHQUFBdnhCLEVBQUFBLENBQUFBLE1BQUEsQ0FBTTZFLGdCQUFnQixDQUNuQ2tDLGlCQUFRLENBQUN5SyxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxFQUN6QmdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQ2IsQ0FBQyxFQUFBLEdBQUEsQ0FBQSxDQUFBbUMsTUFBQSxDQUFJNkcsZUFBTyxDQUFDMkssS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUMsQ0FBRSxDQUFBO0VBQ2pDLE9BQUE7UUFFQSxvQkFDRXdTLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFDRTRMLFFBQUFBLElBQUksRUFBQyxPQUFPO0VBQ1osUUFBQSxXQUFBLEVBQVUsUUFBUTtFQUNsQmpRLFFBQUFBLFNBQVMsRUFBQyw2QkFBQTtFQUE2QixPQUFBLEVBRXRDNEQsS0FBQSxDQUFLTSxLQUFLLENBQUNtYSx1QkFBdUIsSUFBSXNGLGVBQ25DLENBQUMsQ0FBQTtPQUVWLENBQUEsQ0FBQTtNQUFBNWYsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtFQUNyQixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ULFFBQVEsRUFBRTtVQUN2QixvQkFDRTFCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFVBQUFBLFNBQVMsRUFBQyxzQ0FBQTtFQUFzQyxTQUFBLEVBQ2xENEQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1QsUUFDVCxDQUFDLENBQUE7RUFFVixPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBNTJCQ2xDLElBQUFBLEtBQUEsQ0FBS3FMLFlBQVksZ0JBQUc3SyxzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUE7TUFFckMzQixLQUFBLENBQUtNLEtBQUssR0FBRztFQUNYdFMsTUFBQUEsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLZ2dCLGFBQWEsRUFBRTtFQUMxQmhZLE1BQUFBLGFBQWEsRUFBRSxJQUFJO0VBQ25COFYsTUFBQUEsY0FBYyxFQUFFLElBQUk7RUFDcEJyRCxNQUFBQSx1QkFBdUIsRUFBRSxLQUFBO09BQzFCLENBQUE7RUFBQyxJQUFBLE9BQUF6YSxLQUFBLENBQUE7RUFDSixHQUFBO0lBQUM0QixTQUFBLENBQUFxWSxRQUFBLEVBQUFsYSxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBb1ksUUFBQSxFQUFBLENBQUE7TUFBQXRlLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUFrVyxpQkFBQUEsR0FBb0I7RUFBQSxNQUFBLElBQUFtRCxNQUFBLEdBQUEsSUFBQSxDQUFBO0VBQ2xCO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsTUFBQSxJQUFJLElBQUksQ0FBQ25XLEtBQUssQ0FBQ3V0QixjQUFjLEVBQUU7VUFDN0IsSUFBSSxDQUFDNEQsb0JBQW9CLEdBQUksWUFBTTtZQUNqQ2hiLE1BQUksQ0FBQzNELFFBQVEsQ0FBQztjQUFFd2MsY0FBYyxFQUFFN1ksTUFBSSxDQUFDNlksY0FBQUE7RUFBZSxXQUFDLENBQUMsQ0FBQTtFQUN4RCxTQUFDLEVBQUcsQ0FBQTtFQUNOLE9BQUE7RUFDRixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFuaUIsR0FBQSxFQUFBLG9CQUFBO0VBQUEvUCxJQUFBQSxLQUFBLEVBRUQsU0FBQTZnQixrQkFBbUI3QixDQUFBQSxTQUFTLEVBQUU7RUFBQSxNQUFBLElBQUFzVixNQUFBLEdBQUEsSUFBQSxDQUFBO0VBQzVCLE1BQUEsSUFDRSxJQUFJLENBQUNweEIsS0FBSyxDQUFDbVksWUFBWSxLQUN0QixDQUFDclYsU0FBUyxDQUFDLElBQUksQ0FBQzlDLEtBQUssQ0FBQ21ZLFlBQVksRUFBRTJELFNBQVMsQ0FBQzNELFlBQVksQ0FBQyxJQUMxRCxJQUFJLENBQUNuWSxLQUFLLENBQUN1ckIsZUFBZSxLQUFLelAsU0FBUyxDQUFDeVAsZUFBZSxDQUFDLEVBQzNEO0VBQ0EsUUFBQSxJQUFNOEYsZUFBZSxHQUFHLENBQUMzdUIsV0FBVyxDQUNsQyxJQUFJLENBQUM4TyxLQUFLLENBQUN0UyxJQUFJLEVBQ2YsSUFBSSxDQUFDYyxLQUFLLENBQUNtWSxZQUNiLENBQUMsQ0FBQTtVQUNELElBQUksQ0FBQzNGLFFBQVEsQ0FDWDtFQUNFdFQsVUFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQ2MsS0FBSyxDQUFDbVksWUFBQUE7RUFDbkIsU0FBQyxFQUNELFlBQUE7WUFBQSxPQUFNa1osZUFBZSxJQUFJRCxNQUFJLENBQUN4Rix1QkFBdUIsQ0FBQ3dGLE1BQUksQ0FBQzVmLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsU0FDeEUsQ0FBQyxDQUFBO1NBQ0YsTUFBTSxJQUNMLElBQUksQ0FBQ2MsS0FBSyxDQUFDcW1CLFVBQVUsSUFDckIsQ0FBQ3ZqQixTQUFTLENBQUMsSUFBSSxDQUFDOUMsS0FBSyxDQUFDcW1CLFVBQVUsRUFBRXZLLFNBQVMsQ0FBQ3VLLFVBQVUsQ0FBQyxFQUN2RDtVQUNBLElBQUksQ0FBQzdULFFBQVEsQ0FBQztFQUNadFQsVUFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQ2MsS0FBSyxDQUFDcW1CLFVBQUFBO0VBQ25CLFNBQUMsQ0FBQyxDQUFBO0VBQ0osT0FBQTtFQUNGLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQXhaLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBZzBCRCxTQUFBK1csTUFBQUEsR0FBUztRQUNQLElBQU15ZCxTQUFTLEdBQUcsSUFBSSxDQUFDdHhCLEtBQUssQ0FBQ3V4QixTQUFTLElBQUkvRyxpQkFBaUIsQ0FBQTtRQUMzRCxvQkFDRTlZLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS29ELFFBQUFBLEtBQUssRUFBRTtFQUFFeWMsVUFBQUEsT0FBTyxFQUFFLFVBQUE7V0FBYTtVQUFDeGQsR0FBRyxFQUFFLElBQUksQ0FBQ3VJLFlBQUFBO0VBQWEsT0FBQSxlQUMxRDdLLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzJmLFNBQVMsRUFBQTtVQUNSaGtCLFNBQVMsRUFBRXlHLFNBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMvVCxLQUFLLENBQUNzTixTQUFTLEVBQUU7RUFDeEQsVUFBQSw2QkFBNkIsRUFBRSxJQUFJLENBQUN0TixLQUFLLENBQUNxbkIsa0JBQUFBO0VBQzVDLFNBQUMsQ0FBRTtVQUNIc0QsUUFBUSxFQUFFLElBQUksQ0FBQzNxQixLQUFLLENBQUN1dEIsY0FBYyxJQUFJLElBQUksQ0FBQ3Z0QixLQUFLLENBQUMrd0IsYUFBYztFQUNoRTFKLFFBQUFBLGtCQUFrQixFQUFFLElBQUksQ0FBQ3JuQixLQUFLLENBQUNxbkIsa0JBQUFBO1NBRTlCLEVBQUEsSUFBSSxDQUFDb0ssb0JBQW9CLEVBQUUsRUFDM0IsSUFBSSxDQUFDQyxvQkFBb0IsRUFBRSxFQUMzQixJQUFJLENBQUNDLGdCQUFnQixFQUFFLEVBQ3ZCLElBQUksQ0FBQ3hNLFlBQVksRUFBRSxFQUNuQixJQUFJLENBQUN5TSxXQUFXLEVBQUUsRUFDbEIsSUFBSSxDQUFDQyxpQkFBaUIsRUFBRSxFQUN4QixJQUFJLENBQUNDLGlCQUFpQixFQUFFLEVBQ3hCLElBQUksQ0FBQ0Msc0JBQXNCLEVBQUUsRUFDN0IsSUFBSSxDQUFDQyxjQUFjLEVBQ1gsQ0FDUixDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtNQUFBbmxCLEdBQUEsRUFBQSxjQUFBO01BQUFFLEdBQUEsRUF6aUNELFNBQUFBLEdBQUFBLEdBQTBCO1FBQ3hCLE9BQU87RUFDTHFlLFFBQUFBLGVBQWUsRUFBRSxTQUFBQSxlQUFBLEdBQU0sRUFBRTtFQUN6QjBFLFFBQUFBLFdBQVcsRUFBRSxDQUFDO0VBQ2RyRCxRQUFBQSx3QkFBd0IsRUFBRSxLQUFLO0VBQy9CbkYsUUFBQUEsV0FBVyxFQUFFLE1BQU07RUFDbkIyRixRQUFBQSx1QkFBdUIsRUFBRSxlQUFlO0VBQ3hDVSxRQUFBQSxtQkFBbUIsRUFBRSxXQUFXO0VBQ2hDWCxRQUFBQSx3QkFBd0IsRUFBRSxnQkFBZ0I7RUFDMUNVLFFBQUFBLG9CQUFvQixFQUFFLFlBQVk7RUFDbEMzRCxRQUFBQSxlQUFlLEVBQUUsSUFBSTtFQUNyQmpmLFFBQUFBLGNBQWMsRUFBRW5PLHdCQUFBQTtTQUNqQixDQUFBO0VBQ0gsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQWRtQytVLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDM0RyRCxJQUFNK2QsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUFyeUIsSUFBQSxFQUEwQztFQUFBLEVBQUEsSUFBcENzeUIsSUFBSSxHQUFBdHlCLElBQUEsQ0FBSnN5QixJQUFJO01BQUFDLGNBQUEsR0FBQXZ5QixJQUFBLENBQUUwTixTQUFTO0VBQVRBLElBQUFBLFNBQVMsR0FBQTZrQixjQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsRUFBRSxHQUFBQSxjQUFBO01BQUV2Z0IsUUFBTyxHQUFBaFMsSUFBQSxDQUFQZ1MsT0FBTyxDQUFBO0lBQ25ELElBQU13Z0IsWUFBWSxHQUFHLGlDQUFpQyxDQUFBO0VBRXRELEVBQUEsa0JBQUkxZ0Isc0JBQUssQ0FBQzJnQixjQUFjLENBQUNILElBQUksQ0FBQyxFQUFFO0VBQzlCLElBQUEsb0JBQU94Z0Isc0JBQUssQ0FBQ3NZLFlBQVksQ0FBQ2tJLElBQUksRUFBRTtFQUM5QjVrQixNQUFBQSxTQUFTLEtBQUE1TixNQUFBLENBQUt3eUIsSUFBSSxDQUFDbHlCLEtBQUssQ0FBQ3NOLFNBQVMsSUFBSSxFQUFFLEVBQUEsR0FBQSxDQUFBLENBQUE1TixNQUFBLENBQUkweUIsWUFBWSxPQUFBMXlCLE1BQUEsQ0FBSTROLFNBQVMsQ0FBRTtFQUN2RXNFLE1BQUFBLE9BQU8sRUFBRSxTQUFBQSxPQUFDOEMsQ0FBQUEsQ0FBQyxFQUFLO1VBQ2QsSUFBSSxPQUFPd2QsSUFBSSxDQUFDbHlCLEtBQUssQ0FBQzRSLE9BQU8sS0FBSyxVQUFVLEVBQUU7RUFDNUNzZ0IsVUFBQUEsSUFBSSxDQUFDbHlCLEtBQUssQ0FBQzRSLE9BQU8sQ0FBQzhDLENBQUMsQ0FBQyxDQUFBO0VBQ3ZCLFNBQUE7RUFFQSxRQUFBLElBQUksT0FBTzlDLFFBQU8sS0FBSyxVQUFVLEVBQUU7WUFDakNBLFFBQU8sQ0FBQzhDLENBQUMsQ0FBQyxDQUFBO0VBQ1osU0FBQTtFQUNGLE9BQUE7RUFDRixLQUFDLENBQUMsQ0FBQTtFQUNKLEdBQUE7RUFFQSxFQUFBLElBQUksT0FBT3dkLElBQUksS0FBSyxRQUFRLEVBQUU7TUFDNUIsb0JBQ0V4Z0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEdBQUEsRUFBQTtFQUNFckUsTUFBQUEsU0FBUyxFQUFBNU4sRUFBQUEsQ0FBQUEsTUFBQSxDQUFLMHlCLFlBQVksRUFBQTF5QixHQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQUl3eUIsSUFBSSxFQUFBeHlCLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSTROLFNBQVMsQ0FBRztFQUNsRCxNQUFBLGFBQUEsRUFBWSxNQUFNO0VBQ2xCc0UsTUFBQUEsT0FBTyxFQUFFQSxRQUFBQTtFQUFRLEtBQ2xCLENBQUMsQ0FBQTtFQUVOLEdBQUE7O0VBRUE7SUFDQSxvQkFDRUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtNQUNFckUsU0FBUyxFQUFBLEVBQUEsQ0FBQTVOLE1BQUEsQ0FBSzB5QixZQUFZLE9BQUExeUIsTUFBQSxDQUFJNE4sU0FBUyxDQUFHO0VBQzFDZ2xCLElBQUFBLEtBQUssRUFBQyw0QkFBNEI7RUFDbENDLElBQUFBLE9BQU8sRUFBQyxhQUFhO0VBQ3JCM2dCLElBQUFBLE9BQU8sRUFBRUEsUUFBQUE7S0FFVEYsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNNVUsSUFBQUEsQ0FBQyxFQUFDLDZOQUFBO0VBQTZOLEdBQUUsQ0FDcE8sQ0FBQyxDQUFBO0VBRVYsQ0FBQyxDQUFBO0FBUUQsdUJBQWVrMUIsWUFBWTs7RUNoRE0sSUFFWk8sTUFBTSwwQkFBQXZoQixnQkFBQSxFQUFBO0lBT3pCLFNBQUF1aEIsTUFBQUEsQ0FBWXh5QixLQUFLLEVBQUU7RUFBQSxJQUFBLElBQUFrUixLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBcWhCLE1BQUEsQ0FBQSxDQUFBO0VBQ2pCdGhCLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBb2hCLElBQUFBLEVBQUFBLE1BQUEsR0FBTXh5QixLQUFLLENBQUEsQ0FBQSxDQUFBO01BQ1hrUixLQUFBLENBQUt1aEIsRUFBRSxHQUFHdlcsUUFBUSxDQUFDdkssYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQUMsSUFBQSxPQUFBVCxLQUFBLENBQUE7RUFDMUMsR0FBQTtJQUFDNEIsU0FBQSxDQUFBMGYsTUFBQSxFQUFBdmhCLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUF5ZixNQUFBLEVBQUEsQ0FBQTtNQUFBM2xCLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUFrVyxpQkFBQUEsR0FBb0I7RUFDbEIsTUFBQSxJQUFJLENBQUMwZixVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMxeUIsS0FBSyxDQUFDMnlCLFVBQVUsSUFBSXpXLFFBQVEsRUFBRTBXLGNBQWMsQ0FDbEUsSUFBSSxDQUFDNXlCLEtBQUssQ0FBQzZ5QixRQUNiLENBQUMsQ0FBQTtFQUNELE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQ0gsVUFBVSxFQUFFO1VBQ3BCLElBQUksQ0FBQ0EsVUFBVSxHQUFHeFcsUUFBUSxDQUFDdkssYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQy9DLFFBQUEsSUFBSSxDQUFDK2dCLFVBQVUsQ0FBQ0ksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM5eUIsS0FBSyxDQUFDNnlCLFFBQVEsQ0FBQyxDQUFBO0VBQ3ZELFFBQUEsQ0FBQyxJQUFJLENBQUM3eUIsS0FBSyxDQUFDMnlCLFVBQVUsSUFBSXpXLFFBQVEsQ0FBQ0UsSUFBSSxFQUFFMlcsV0FBVyxDQUFDLElBQUksQ0FBQ0wsVUFBVSxDQUFDLENBQUE7RUFDdkUsT0FBQTtRQUNBLElBQUksQ0FBQ0EsVUFBVSxDQUFDSyxXQUFXLENBQUMsSUFBSSxDQUFDTixFQUFFLENBQUMsQ0FBQTtFQUN0QyxLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUE1bEIsR0FBQSxFQUFBLHNCQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQWsyQixvQkFBQUEsR0FBdUI7UUFDckIsSUFBSSxDQUFDTixVQUFVLENBQUNPLFdBQVcsQ0FBQyxJQUFJLENBQUNSLEVBQUUsQ0FBQyxDQUFBO0VBQ3RDLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQTVsQixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUErVyxNQUFBQSxHQUFTO0VBQ1AsTUFBQSxvQkFBT3FmLHlCQUFRLENBQUNDLFlBQVksQ0FBQyxJQUFJLENBQUNuekIsS0FBSyxDQUFDb1QsUUFBUSxFQUFFLElBQUksQ0FBQ3FmLEVBQUUsQ0FBQyxDQUFBO0VBQzVELEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0E5QmlDL2dCLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDRG5EO0VBQ0E7RUFDQTs7RUFFQSxJQUFNa2YseUJBQXlCLEdBQzdCLGdEQUFnRCxDQUFBO0VBQ2xELElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBZUEsQ0FBSUMsSUFBSSxFQUFBO0lBQUEsT0FBSyxDQUFDQSxJQUFJLENBQUNDLFFBQVEsSUFBSUQsSUFBSSxDQUFDNVgsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFBO0VBQUEsQ0FBQSxDQUFBO0VBQUMsSUFFcEQ4WCxPQUFPLDBCQUFBdmlCLGdCQUFBLEVBQUE7SUFZMUIsU0FBQXVpQixPQUFBQSxDQUFZeHpCLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFxaUIsT0FBQSxDQUFBLENBQUE7RUFDakJ0aUIsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUFvaUIsSUFBQUEsRUFBQUEsT0FBQSxHQUFNeHpCLEtBQUssQ0FBQSxDQUFBLENBQUE7RUFLYjtFQUNBO01BQUFxUixlQUFBLENBQUFILEtBQUEsRUFDaUIsZ0JBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUNmblQsS0FBSyxDQUFDMDFCLFNBQVMsQ0FBQ3gwQixLQUFLLENBQ2xCeTBCLElBQUksQ0FDSHhpQixLQUFBLENBQUt5aUIsVUFBVSxDQUFDemdCLE9BQU8sQ0FBQzBnQixnQkFBZ0IsQ0FBQ1IseUJBQXlCLENBQUMsRUFDbkUsQ0FBQyxFQUNELENBQUMsQ0FDSCxDQUFDLENBQ0FwbkIsTUFBTSxDQUFDcW5CLGVBQWUsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQWhpQixlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVULFlBQU07RUFDdkIsTUFBQSxJQUFNMmlCLFdBQVcsR0FBRzNpQixLQUFBLENBQUs0aUIsY0FBYyxFQUFFLENBQUE7RUFDekNELE1BQUFBLFdBQVcsSUFDVEEsV0FBVyxDQUFDNzBCLE1BQU0sR0FBRyxDQUFDLElBQ3RCNjBCLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDNzBCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzZkLEtBQUssRUFBRSxDQUFBO09BQzlDLENBQUEsQ0FBQTtNQUFBeEwsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtFQUNyQixNQUFBLElBQU0yaUIsV0FBVyxHQUFHM2lCLEtBQUEsQ0FBSzRpQixjQUFjLEVBQUUsQ0FBQTtFQUN6Q0QsTUFBQUEsV0FBVyxJQUFJQSxXQUFXLENBQUM3MEIsTUFBTSxHQUFHLENBQUMsSUFBSTYwQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNoWCxLQUFLLEVBQUUsQ0FBQTtPQUNoRSxDQUFBLENBQUE7RUF4QkMzTCxJQUFBQSxLQUFBLENBQUt5aUIsVUFBVSxnQkFBR2ppQixzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUE7RUFBQyxJQUFBLE9BQUEzQixLQUFBLENBQUE7RUFDdEMsR0FBQTtJQUFDNEIsU0FBQSxDQUFBMGdCLE9BQUEsRUFBQXZpQixnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBeWdCLE9BQUEsRUFBQSxDQUFBO01BQUEzbUIsR0FBQSxFQUFBLFFBQUE7TUFBQS9QLEtBQUEsRUF5QkQsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUM3VCxLQUFLLENBQUMrekIsYUFBYSxFQUFFO0VBQzdCLFFBQUEsT0FBTyxJQUFJLENBQUMvekIsS0FBSyxDQUFDb1QsUUFBUSxDQUFBO0VBQzVCLE9BQUE7UUFDQSxvQkFDRTFCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBQyw0QkFBNEI7VUFBQzBHLEdBQUcsRUFBRSxJQUFJLENBQUMyZixVQUFBQTtTQUNwRGppQixlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUMsbUNBQW1DO0VBQzdDb08sUUFBQUEsUUFBUSxFQUFDLEdBQUc7VUFDWmdULE9BQU8sRUFBRSxJQUFJLENBQUNzRixnQkFBQUE7U0FDZixDQUFDLEVBQ0QsSUFBSSxDQUFDaDBCLEtBQUssQ0FBQ29ULFFBQVEsZUFDcEIxQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUMsaUNBQWlDO0VBQzNDb08sUUFBQUEsUUFBUSxFQUFDLEdBQUc7VUFDWmdULE9BQU8sRUFBRSxJQUFJLENBQUN1RixjQUFBQTtFQUFlLE9BQzlCLENBQ0UsQ0FBQyxDQUFBO0VBRVYsS0FBQTtFQUFDLEdBQUEsQ0FBQSxFQUFBLENBQUE7TUFBQXBuQixHQUFBLEVBQUEsY0FBQTtNQUFBRSxHQUFBLEVBM0RELFNBQUFBLEdBQUFBLEdBQTBCO1FBQ3hCLE9BQU87RUFDTGduQixRQUFBQSxhQUFhLEVBQUUsSUFBQTtTQUNoQixDQUFBO0VBQ0gsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQUxrQ3JpQixDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ2NyQyxTQUFTZ2dCLFlBQVlBLENBQUNoZ0IsU0FBUyxFQUFFO0VBQzlDLEVBQUEsSUFBTWlnQixZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBSW4wQixLQUFLLEVBQUs7RUFDOUIsSUFBQSxJQUFNbzBCLFNBQVMsR0FBQTlFLGNBQUEsQ0FBQUEsY0FBQSxLQUNWdHZCLEtBQUssQ0FBQSxFQUFBLEVBQUEsRUFBQTtFQUNScTBCLE1BQUFBLGVBQWUsRUFBRXIwQixLQUFLLENBQUNxMEIsZUFBZSxJQUFJLEVBQUU7RUFDNUNDLE1BQUFBLFdBQVcsRUFBRXQwQixLQUFLLENBQUNzMEIsV0FBVyxJQUFJLEVBQUU7UUFDcENDLFVBQVUsRUFDUixPQUFPdjBCLEtBQUssQ0FBQ3UwQixVQUFVLEtBQUssU0FBUyxHQUFHdjBCLEtBQUssQ0FBQ3UwQixVQUFVLEdBQUcsSUFBQTtPQUM5RCxDQUFBLENBQUE7RUFDRCxJQUFBLElBQU1DLFFBQVEsR0FBRzlpQixzQkFBSyxDQUFDK2lCLE1BQU0sRUFBRSxDQUFBO0VBQy9CLElBQUEsSUFBTUMsYUFBYSxHQUFHQyxpQkFBVyxDQUFBckYsY0FBQSxDQUFBO0VBQy9Cc0YsTUFBQUEsSUFBSSxFQUFFLENBQUNSLFNBQVMsQ0FBQ0csVUFBVTtFQUMzQk0sTUFBQUEsb0JBQW9CLEVBQUVDLGdCQUFVO1FBQ2hDQyxTQUFTLEVBQUVYLFNBQVMsQ0FBQ1ksZUFBZTtRQUNwQ0MsVUFBVSxFQUFBLENBQ1JDLFVBQUksQ0FBQztFQUFFQyxRQUFBQSxPQUFPLEVBQUUsRUFBQTtTQUFJLENBQUMsRUFDckJyVyxZQUFNLENBQUMsRUFBRSxDQUFDLEVBQ1ZzVyxXQUFLLENBQUM7RUFBRXJLLFFBQUFBLE9BQU8sRUFBRXlKLFFBQUFBO1NBQVUsQ0FBQyxFQUFBOTBCLE1BQUEsQ0FBQTJPLGtCQUFBLENBQ3pCK2xCLFNBQVMsQ0FBQ0MsZUFBZSxDQUFBLENBQUE7RUFDN0IsS0FBQSxFQUNFRCxTQUFTLENBQUNFLFdBQVcsQ0FDekIsQ0FBQyxDQUFBO01BRUYsb0JBQ0U1aUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDdUMsU0FBUyxFQUFBcWMsUUFBQSxLQUFLNkQsU0FBUyxFQUFBO0VBQUVFLE1BQUFBLFdBQVcsRUFBQWhGLGNBQUEsQ0FBQUEsY0FBQSxLQUFPb0YsYUFBYSxDQUFBLEVBQUEsRUFBQSxFQUFBO0VBQUVGLFFBQUFBLFFBQVEsRUFBUkEsUUFBQUE7RUFBUSxPQUFBLENBQUE7RUFBRyxLQUFBLENBQUUsQ0FBQyxDQUFBO0tBRTVFLENBQUE7RUFTRCxFQUFBLE9BQU9MLFlBQVksQ0FBQTtFQUNyQjs7RUNyREE7RUFDYWtCLElBQUFBLGVBQWUsMEJBQUFwa0IsZ0JBQUEsRUFBQTtFQUFBLEVBQUEsU0FBQW9rQixlQUFBLEdBQUE7RUFBQWxrQixJQUFBQSxlQUFBLE9BQUFra0IsZUFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUFqa0IsVUFBQSxDQUFBLElBQUEsRUFBQWlrQixlQUFBLEVBQUFyd0IsU0FBQSxDQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE4TixTQUFBLENBQUF1aUIsZUFBQSxFQUFBcGtCLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUFzaUIsZUFBQSxFQUFBLENBQUE7TUFBQXhvQixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQXNCMUIsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQUF5RSxXQUFBLEdBWUksSUFBSSxDQUFDdFksS0FBSztVQVhac04sU0FBUyxHQUFBZ0wsV0FBQSxDQUFUaEwsU0FBUztVQUNUZ29CLGdCQUFnQixHQUFBaGQsV0FBQSxDQUFoQmdkLGdCQUFnQjtVQUNoQmYsVUFBVSxHQUFBamMsV0FBQSxDQUFWaWMsVUFBVTtVQUNWZ0IsZUFBZSxHQUFBamQsV0FBQSxDQUFmaWQsZUFBZTtVQUNmQyxlQUFlLEdBQUFsZCxXQUFBLENBQWZrZCxlQUFlO1VBQ2Z6QixhQUFhLEdBQUF6YixXQUFBLENBQWJ5YixhQUFhO1VBQ2IwQixlQUFlLEdBQUFuZCxXQUFBLENBQWZtZCxlQUFlO1VBQ2Y1QyxRQUFRLEdBQUF2YSxXQUFBLENBQVJ1YSxRQUFRO1VBQ1JGLFVBQVUsR0FBQXJhLFdBQUEsQ0FBVnFhLFVBQVU7VUFDVjJCLFdBQVcsR0FBQWhjLFdBQUEsQ0FBWGdjLFdBQVc7VUFDWG9CLFNBQVMsR0FBQXBkLFdBQUEsQ0FBVG9kLFNBQVMsQ0FBQTtFQUdYLE1BQUEsSUFBSUMsTUFBTSxDQUFBO1FBRVYsSUFBSSxDQUFDcEIsVUFBVSxFQUFFO0VBQ2YsUUFBQSxJQUFNMU8sT0FBTyxHQUFHOVIsU0FBSSxDQUFDLHlCQUF5QixFQUFFekcsU0FBUyxDQUFDLENBQUE7RUFDMURxb0IsUUFBQUEsTUFBTSxnQkFDSmprQixzQkFBQSxDQUFBQyxhQUFBLENBQUM2aEIsT0FBTyxFQUFBO0VBQUNPLFVBQUFBLGFBQWEsRUFBRUEsYUFBQUE7V0FDdEJyaUIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFcUMsVUFBQUEsR0FBRyxFQUFFc2dCLFdBQVcsQ0FBQ3NCLElBQUksQ0FBQ0MsV0FBWTtZQUNsQzlnQixLQUFLLEVBQUV1ZixXQUFXLENBQUN3QixjQUFlO0VBQ2xDeG9CLFVBQUFBLFNBQVMsRUFBRXVZLE9BQVE7WUFDbkIsZ0JBQWdCeU8sRUFBQUEsV0FBVyxDQUFDUyxTQUFVO0VBQ3RDOVgsVUFBQUEsU0FBUyxFQUFFd1ksZUFBQUE7V0FFVkYsRUFBQUEsZUFBZSxFQUNmRyxTQUFTLGlCQUNSaGtCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ29rQixtQkFBYSxFQUFBO1lBQ1ovaEIsR0FBRyxFQUFFc2dCLFdBQVcsQ0FBQ0UsUUFBUztZQUMxQndCLE9BQU8sRUFBRTFCLFdBQVcsQ0FBQzBCLE9BQVE7RUFDN0JDLFVBQUFBLElBQUksRUFBQyxjQUFjO0VBQ25CQyxVQUFBQSxXQUFXLEVBQUUsQ0FBRTtFQUNmM1EsVUFBQUEsTUFBTSxFQUFFLENBQUU7RUFDVjRRLFVBQUFBLEtBQUssRUFBRSxFQUFHO0VBQ1ZwaEIsVUFBQUEsS0FBSyxFQUFFO0VBQUVxaEIsWUFBQUEsU0FBUyxFQUFFLGtCQUFBO2FBQXFCO0VBQ3pDOW9CLFVBQUFBLFNBQVMsRUFBQyw0QkFBQTtXQUNYLENBRUEsQ0FDRSxDQUNWLENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxJQUFJLElBQUksQ0FBQ3ROLEtBQUssQ0FBQ3EyQixlQUFlLEVBQUU7RUFDOUJWLFFBQUFBLE1BQU0sZ0JBQUdqa0Isc0JBQUssQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQzNSLEtBQUssQ0FBQ3EyQixlQUFlLEVBQUUsRUFBRSxFQUFFVixNQUFNLENBQUMsQ0FBQTtFQUN0RSxPQUFBO0VBRUEsTUFBQSxJQUFJOUMsUUFBUSxJQUFJLENBQUMwQixVQUFVLEVBQUU7RUFDM0JvQixRQUFBQSxNQUFNLGdCQUNKamtCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzZnQixNQUFNLEVBQUE7RUFBQ0ssVUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQUNGLFVBQUFBLFVBQVUsRUFBRUEsVUFBQUE7RUFBVyxTQUFBLEVBQ2hEZ0QsTUFDSyxDQUNULENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxJQUFNVyxjQUFjLEdBQUd2aUIsU0FBSSxDQUFDLDBCQUEwQixFQUFFdWhCLGdCQUFnQixDQUFDLENBQUE7UUFFekUsb0JBQ0U1akIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDRCxzQkFBSyxDQUFDNmtCLFFBQVEsRUFBQSxJQUFBLGVBQ2I3a0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLcUMsUUFBQUEsR0FBRyxFQUFFc2dCLFdBQVcsQ0FBQ3NCLElBQUksQ0FBQ1ksWUFBYTtFQUFDbHBCLFFBQUFBLFNBQVMsRUFBRWdwQixjQUFBQTtFQUFlLE9BQUEsRUFDaEVkLGVBQ0UsQ0FBQyxFQUNMRyxNQUNhLENBQUMsQ0FBQTtFQUVyQixLQUFBO0VBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtNQUFBOW9CLEdBQUEsRUFBQSxjQUFBO01BQUFFLEdBQUEsRUF6RkQsU0FBQUEsR0FBQUEsR0FBMEI7UUFDeEIsT0FBTztFQUNMd25CLFFBQUFBLFVBQVUsRUFBRSxJQUFBO1NBQ2IsQ0FBQTtFQUNILEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0FMa0M3aUIsQ0FBQUEsc0JBQUssQ0FBQ3dDLFNBQVMsQ0FBQSxDQUFBO0FBNkZwRCwwQkFBZWdnQixZQUFZLENBQUNtQixlQUFlLENBQUM7O0VDMUM1QyxJQUFNb0IsdUJBQXVCLEdBQUcsd0NBQXdDLENBQUE7RUFDeEUsSUFBTUMsZUFBZSxHQUFHdGlCLCtCQUFjLENBQUMrVyxRQUFRLENBQUMsQ0FBQTs7RUFFaEQ7RUFDQSxTQUFTd0wsc0JBQXNCQSxDQUFDcDBCLEtBQUssRUFBRUMsS0FBSyxFQUFFO0lBQzVDLElBQUlELEtBQUssSUFBSUMsS0FBSyxFQUFFO0VBQ2xCLElBQUEsT0FDRWlFLGlCQUFRLENBQUNsRSxLQUFLLENBQUMsS0FBS2tFLGlCQUFRLENBQUNqRSxLQUFLLENBQUMsSUFBSStELGVBQU8sQ0FBQ2hFLEtBQUssQ0FBQyxLQUFLZ0UsZUFBTyxDQUFDL0QsS0FBSyxDQUFDLENBQUE7RUFFNUUsR0FBQTtJQUVBLE9BQU9ELEtBQUssS0FBS0MsS0FBSyxDQUFBO0VBQ3hCLENBQUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0EsSUFBTW8wQixXQUFXLEdBQUcsdUJBQXVCLENBQUE7QUFFdEJDLE1BQUFBLFVBQVUsMEJBQUE1bEIsZ0JBQUEsRUFBQTtJQTRQN0IsU0FBQTRsQixVQUFBQSxDQUFZNzJCLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUEwbEIsVUFBQSxDQUFBLENBQUE7RUFDakIzbEIsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUF5bEIsSUFBQUEsRUFBQUEsVUFBQSxHQUFNNzJCLEtBQUssQ0FBQSxDQUFBLENBQUE7TUFBRXFSLGVBQUEsQ0FBQUgsS0FBQSxFQWtERyxpQkFBQSxFQUFBLFlBQUE7UUFBQSxPQUNoQkEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW1CLFVBQVUsR0FDakJuVixLQUFBLENBQUtsUixLQUFLLENBQUNxbUIsVUFBVSxHQUNyQm5WLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytZLFVBQVUsSUFBSTdILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBUyxHQUMzQ29SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBUyxHQUNwQm9SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhZLFlBQVksSUFBSTVILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxHQUMzQ21SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxHQUNsQmxELE9BQU8sRUFBRSxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFFbkI7TUFBQXdVLGVBQUEsQ0FBQUgsS0FBQSxFQUNpQixnQkFBQSxFQUFBLFlBQUE7RUFBQSxNQUFBLElBQUE0bEIsb0JBQUEsQ0FBQTtFQUFBLE1BQUEsT0FBQSxDQUFBQSxvQkFBQSxHQUNmNWxCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lZLFFBQVEsTUFBQXFlLElBQUFBLElBQUFBLG9CQUFBLEtBQW5CQSxLQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxDQUFBQSxHQUFBQSxvQkFBQSxDQUFxQi9QLE1BQU0sQ0FBQyxVQUFDZ1EsV0FBVyxFQUFFL29CLE9BQU8sRUFBSztVQUNwRCxJQUFNOU8sSUFBSSxHQUFHLElBQUkvQixJQUFJLENBQUM2USxPQUFPLENBQUM5TyxJQUFJLENBQUMsQ0FBQTtFQUNuQyxRQUFBLElBQUksQ0FBQzlCLGlCQUFPLENBQUM4QixJQUFJLENBQUMsRUFBRTtFQUNsQixVQUFBLE9BQU82M0IsV0FBVyxDQUFBO0VBQ3BCLFNBQUE7VUFFQSxPQUFBcjNCLEVBQUFBLENBQUFBLE1BQUEsQ0FBQTJPLGtCQUFBLENBQVcwb0IsV0FBVyxJQUFBekgsY0FBQSxDQUFBQSxjQUFBLENBQUEsRUFBQSxFQUFPdGhCLE9BQU8sQ0FBQSxFQUFBLEVBQUEsRUFBQTtFQUFFOU8sVUFBQUEsSUFBSSxFQUFKQSxJQUFBQTtFQUFJLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtTQUMzQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQW1TLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRVcsWUFBTTtFQUFBLE1BQUEsSUFBQXRSLElBQUEsQ0FBQTtFQUN2QixNQUFBLElBQU1vM0IsbUJBQW1CLEdBQUc5bEIsS0FBQSxDQUFLK2xCLGVBQWUsRUFBRSxDQUFBO0VBQ2xELE1BQUEsSUFBTXg1QixPQUFPLEdBQUdvTyxtQkFBbUIsQ0FBQ3FGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQy9DLE1BQUEsSUFBTWtGLE9BQU8sR0FBRytHLG1CQUFtQixDQUFDaUYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDL0MsTUFBQSxJQUFNazNCLG1CQUFtQixHQUN2Qno1QixPQUFPLElBQUkyQixpQkFBUSxDQUFDNDNCLG1CQUFtQixFQUFFeDFCLHFCQUFVLENBQUMvRCxPQUFPLENBQUMsQ0FBQyxHQUN6REEsT0FBTyxHQUNQeUgsT0FBTyxJQUFJK0osZUFBTyxDQUFDK25CLG1CQUFtQixFQUFFMXpCLGlCQUFRLENBQUM0QixPQUFPLENBQUMsQ0FBQyxHQUN4REEsT0FBTyxHQUNQOHhCLG1CQUFtQixDQUFBO1FBQzNCLE9BQU87RUFDTHBDLFFBQUFBLElBQUksRUFBRTFqQixLQUFBLENBQUtsUixLQUFLLENBQUNtM0IsU0FBUyxJQUFJLEtBQUs7RUFDbkNDLFFBQUFBLFlBQVksRUFBRSxLQUFLO1VBQ25CamYsWUFBWSxFQUFBLENBQUF2WSxJQUFBLEdBQ1RzUixLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFZLEdBQ3BCOUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLEdBQ3BCb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxNQUFBLElBQUEsSUFBQXRZLElBQUEsS0FBQSxLQUFBLENBQUEsR0FBQUEsSUFBQSxHQUFLczNCLG1CQUFtQjtFQUNqRDtFQUNBO1VBQ0E3cUIsY0FBYyxFQUFFRCxvQkFBb0IsQ0FBQzhFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FNLGNBQWMsQ0FBQztFQUMvRGdyQixRQUFBQSxPQUFPLEVBQUUsS0FBSztFQUNkO0VBQ0E7RUFDQS9hLFFBQUFBLG9CQUFvQixFQUFFLEtBQUs7RUFDM0JxUCxRQUFBQSx1QkFBdUIsRUFBRSxLQUFBO1NBQzFCLENBQUE7T0FDRixDQUFBLENBQUE7TUFBQXRhLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLDBCQUFBLEVBRTBCLFlBQU07UUFDL0IsSUFBSUEsS0FBQSxDQUFLb21CLG1CQUFtQixFQUFFO0VBQzVCQyxRQUFBQSxZQUFZLENBQUNybUIsS0FBQSxDQUFLb21CLG1CQUFtQixDQUFDLENBQUE7RUFDeEMsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBam1CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFVBQUEsRUFFVSxZQUFNO1FBQ2YsSUFBSUEsS0FBQSxDQUFLc21CLEtBQUssSUFBSXRtQixLQUFBLENBQUtzbUIsS0FBSyxDQUFDM2EsS0FBSyxFQUFFO0VBQ2xDM0wsUUFBQUEsS0FBQSxDQUFLc21CLEtBQUssQ0FBQzNhLEtBQUssQ0FBQztFQUFFQyxVQUFBQSxhQUFhLEVBQUUsSUFBQTtFQUFLLFNBQUMsQ0FBQyxDQUFBO0VBQzNDLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQXpMLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFNBQUEsRUFFUyxZQUFNO1FBQ2QsSUFBSUEsS0FBQSxDQUFLc21CLEtBQUssSUFBSXRtQixLQUFBLENBQUtzbUIsS0FBSyxDQUFDQyxJQUFJLEVBQUU7RUFDakN2bUIsUUFBQUEsS0FBQSxDQUFLc21CLEtBQUssQ0FBQ0MsSUFBSSxFQUFFLENBQUE7RUFDbkIsT0FBQTtRQUVBdm1CLEtBQUEsQ0FBS3dtQixnQkFBZ0IsRUFBRSxDQUFBO09BQ3hCLENBQUEsQ0FBQTtFQUFBcm1CLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVTLFNBQUEsRUFBQSxVQUFDMGpCLElBQUksRUFBMEI7RUFBQSxNQUFBLElBQXhCK0MsV0FBVyxHQUFBM3lCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEtBQUssQ0FBQTtRQUNsQ2tNLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWDtFQUNFb2lCLFFBQUFBLElBQUksRUFBRUEsSUFBSTtVQUNWemMsWUFBWSxFQUNWeWMsSUFBSSxJQUFJMWpCLEtBQUEsQ0FBS00sS0FBSyxDQUFDb2pCLElBQUksR0FDbkIxakIsS0FBQSxDQUFLTSxLQUFLLENBQUMyRyxZQUFZLEdBQ3ZCakgsS0FBQSxDQUFLMG1CLGdCQUFnQixFQUFFLENBQUN6ZixZQUFZO0VBQzFDMGYsUUFBQUEsbUJBQW1CLEVBQUVDLDZCQUFBQTtFQUN2QixPQUFDLEVBQ0QsWUFBTTtVQUNKLElBQUksQ0FBQ2xELElBQUksRUFBRTtFQUNUMWpCLFVBQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFDd1UsSUFBSSxFQUFBO2NBQUEsT0FBTTtFQUNUcVEsY0FBQUEsT0FBTyxFQUFFTSxXQUFXLEdBQUczUSxJQUFJLENBQUNxUSxPQUFPLEdBQUcsS0FBQTtlQUN2QyxDQUFBO0VBQUEsV0FBQyxFQUNGLFlBQU07RUFDSixZQUFBLENBQUNNLFdBQVcsSUFBSXptQixLQUFBLENBQUs2bUIsT0FBTyxFQUFFLENBQUE7Y0FFOUI3bUIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUV3bEIsY0FBQUEsVUFBVSxFQUFFLElBQUE7RUFBSyxhQUFDLENBQUMsQ0FBQTtFQUNyQyxXQUNGLENBQUMsQ0FBQTtFQUNILFNBQUE7RUFDRixPQUNGLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBM21CLGVBQUEsQ0FBQUgsS0FBQSxFQUNTLFNBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUFNdEUsYUFBTSxDQUFDc0UsS0FBQSxDQUFLTSxLQUFLLENBQUMyRyxZQUFZLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUE5RyxlQUFBLENBQUFILEtBQUEsRUFFOUIsZ0JBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUNmQSxLQUFBLENBQUtsUixLQUFLLENBQUM0MEIsSUFBSSxLQUFLM3ZCLFNBQVMsR0FDekJpTSxLQUFBLENBQUtNLEtBQUssQ0FBQ29qQixJQUFJLElBQUksQ0FBQzFqQixLQUFBLENBQUtsUixLQUFLLENBQUN1ekIsUUFBUSxJQUFJLENBQUNyaUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaTRCLFFBQVEsR0FDL0QvbUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNDBCLElBQUksQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUF2akIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVAsYUFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUN2QixNQUFBLElBQUksQ0FBQ1MsS0FBQSxDQUFLTSxLQUFLLENBQUM0bEIsWUFBWSxFQUFFO0VBQzVCbG1CLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzB1QixPQUFPLENBQUNqZSxLQUFLLENBQUMsQ0FBQTtFQUN6QixRQUFBLElBQUksQ0FBQ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDazRCLGtCQUFrQixJQUFJLENBQUNobkIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaTRCLFFBQVEsRUFBRTtFQUMxRC9tQixVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7RUFDcEIsU0FBQTtFQUNGLE9BQUE7UUFDQXRFLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFNmtCLFFBQUFBLE9BQU8sRUFBRSxJQUFBO0VBQUssT0FBQyxDQUFDLENBQUE7T0FDakMsQ0FBQSxDQUFBO01BQUFobUIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsWUFBTTtFQUMzQjtRQUNBLElBQUlBLEtBQUEsQ0FBS29tQixtQkFBbUIsRUFBRTtVQUM1QnBtQixLQUFBLENBQUtpbkIsd0JBQXdCLEVBQUUsQ0FBQTtFQUNqQyxPQUFBOztFQUVBO0VBQ0E7RUFDQTtRQUNBam5CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFNGtCLFFBQUFBLFlBQVksRUFBRSxJQUFBO0VBQUssT0FBQyxFQUFFLFlBQU07RUFDMUNsbUIsUUFBQUEsS0FBQSxDQUFLb21CLG1CQUFtQixHQUFHYyxVQUFVLENBQUMsWUFBTTtZQUMxQ2xuQixLQUFBLENBQUttbkIsUUFBUSxFQUFFLENBQUE7WUFDZm5uQixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRTRrQixZQUFBQSxZQUFZLEVBQUUsS0FBQTtFQUFNLFdBQUMsQ0FBQyxDQUFBO0VBQ3hDLFNBQUMsQ0FBQyxDQUFBO0VBQ0osT0FBQyxDQUFDLENBQUE7T0FDSCxDQUFBLENBQUE7TUFBQS9sQixlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVrQixZQUFNO0VBQ3ZCcW1CLE1BQUFBLFlBQVksQ0FBQ3JtQixLQUFBLENBQUtvbkIsaUJBQWlCLENBQUMsQ0FBQTtRQUNwQ3BuQixLQUFBLENBQUtvbkIsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO09BQzlCLENBQUEsQ0FBQTtNQUFBam5CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGlCQUFBLEVBRWlCLFlBQU07UUFDdEJBLEtBQUEsQ0FBS3dtQixnQkFBZ0IsRUFBRSxDQUFBO0VBQ3ZCeG1CLE1BQUFBLEtBQUEsQ0FBS29uQixpQkFBaUIsR0FBR0YsVUFBVSxDQUFDLFlBQUE7RUFBQSxRQUFBLE9BQU1sbkIsS0FBQSxDQUFLbW5CLFFBQVEsRUFBRSxDQUFBO0VBQUEsT0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFBO09BQzlELENBQUEsQ0FBQTtNQUFBaG5CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHFCQUFBLEVBRXFCLFlBQU07UUFDMUJBLEtBQUEsQ0FBS3dtQixnQkFBZ0IsRUFBRSxDQUFBO09BQ3hCLENBQUEsQ0FBQTtFQUFBcm1CLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVZLFlBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDdEIsTUFBQSxJQUFJLENBQUNTLEtBQUEsQ0FBS00sS0FBSyxDQUFDb2pCLElBQUksSUFBSTFqQixLQUFBLENBQUtsUixLQUFLLENBQUM0d0IsVUFBVSxJQUFJMWYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK3dCLGFBQWEsRUFBRTtFQUN6RTdmLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3U0QixNQUFNLENBQUM5bkIsS0FBSyxDQUFDLENBQUE7RUFDMUIsT0FBQTtRQUVBUyxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRTZrQixRQUFBQSxPQUFPLEVBQUUsS0FBQTtFQUFNLE9BQUMsQ0FBQyxDQUFBO09BQ2xDLENBQUEsQ0FBQTtFQUFBaG1CLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUU0Qiw0QkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUN0QyxNQUFBLElBQUksQ0FBQ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxFQUFFO0VBQ3RCbkwsUUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3JCLE9BQUE7RUFDQXRFLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29VLGNBQWMsQ0FBQzNELEtBQUssQ0FBQyxDQUFBO0VBQ2hDLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNHdCLFVBQVUsRUFBRTtVQUN6Qm5nQixLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtFQUN4QixPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUFwRyxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBZ0I7RUFBQSxNQUFBLEtBQUEsSUFBQW9ELElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBWnc1QixPQUFPLEdBQUF6NkIsSUFBQUEsS0FBQSxDQUFBdVcsSUFBQSxHQUFBRSxJQUFBLEdBQUEsQ0FBQSxFQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQSxFQUFBLEVBQUE7RUFBUGdrQixRQUFBQSxPQUFPLENBQUFoa0IsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxPQUFBO0VBQ3hCLE1BQUEsSUFBSS9ELEtBQUssR0FBRytuQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDdEIsTUFBQSxJQUFJdG5CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3k0QixXQUFXLEVBQUU7VUFDMUJ2bkIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeTRCLFdBQVcsQ0FBQ3BkLEtBQUssQ0FBQW5LLEtBQUEsRUFBT3NuQixPQUFPLENBQUMsQ0FBQTtFQUMzQyxRQUFBLElBQ0UsT0FBTy9uQixLQUFLLENBQUNpb0Isa0JBQWtCLEtBQUssVUFBVSxJQUM5Q2pvQixLQUFLLENBQUNpb0Isa0JBQWtCLEVBQUUsRUFDMUI7RUFDQSxVQUFBLE9BQUE7RUFDRixTQUFBO0VBQ0YsT0FBQTtRQUNBeG5CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUNad2xCLFFBQUFBLFVBQVUsRUFBRXZuQixLQUFLLENBQUNrRSxNQUFNLENBQUM3WCxLQUFLO0VBQzlCKzZCLFFBQUFBLG1CQUFtQixFQUFFYywwQkFBQUE7RUFDdkIsT0FBQyxDQUFDLENBQUE7RUFDRixNQUFBLElBQUl6NUIsSUFBSSxHQUFHN0IsU0FBUyxDQUNsQm9ULEtBQUssQ0FBQ2tFLE1BQU0sQ0FBQzdYLEtBQUssRUFDbEJvVSxLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQ3JCNFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3hDLGFBQWEsRUFDeEIwVCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUNiLENBQUMsQ0FBQTtFQUNEO1FBQ0EsSUFDRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FuQixrQkFBa0IsSUFDN0JuVyxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLElBQ25CaFosSUFBSSxJQUNKLENBQUM0RCxTQUFTLENBQUM1RCxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUMsRUFDckM7VUFDQWhaLElBQUksR0FBR2dPLE9BQUcsQ0FBQ2dFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFBRTtFQUM5QjBnQixVQUFBQSxLQUFLLEVBQUUzd0IsaUJBQVEsQ0FBQy9JLElBQUksQ0FBQztFQUNyQjI1QixVQUFBQSxPQUFPLEVBQUUzd0IscUJBQVUsQ0FBQ2hKLElBQUksQ0FBQztZQUN6QnlRLE9BQU8sRUFBRXhILHFCQUFVLENBQUNqSixJQUFJLENBQUE7RUFDMUIsU0FBQyxDQUFDLENBQUE7RUFDSixPQUFBO1FBQ0EsSUFBSUEsSUFBSSxJQUFJLENBQUN1UixLQUFLLENBQUNrRSxNQUFNLENBQUM3WCxLQUFLLEVBQUU7VUFDL0JvVSxLQUFBLENBQUs0bkIsV0FBVyxDQUFDNTVCLElBQUksRUFBRXVSLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtFQUNyQyxPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUFZLGVBQUEsQ0FBQUgsS0FBQSxFQUVjLGNBQUEsRUFBQSxVQUFDaFMsSUFBSSxFQUFFdVIsS0FBSyxFQUFFOGEsZUFBZSxFQUFLO0VBQy9DLE1BQUEsSUFBSXJhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3llLG1CQUFtQixJQUFJLENBQUN2TixLQUFBLENBQUtsUixLQUFLLENBQUN1dEIsY0FBYyxFQUFFO0VBQ2hFO0VBQ0E7VUFDQXJjLEtBQUEsQ0FBSzZuQixvQkFBb0IsRUFBRSxDQUFBO0VBQzdCLE9BQUE7RUFDQSxNQUFBLElBQUk3bkIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeTRCLFdBQVcsRUFBRTtFQUMxQnZuQixRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUN5NEIsV0FBVyxDQUFDaG9CLEtBQUssQ0FBQyxDQUFBO0VBQy9CLE9BQUE7UUFDQVMsS0FBQSxDQUFLNG5CLFdBQVcsQ0FBQzU1QixJQUFJLEVBQUV1UixLQUFLLEVBQUUsS0FBSyxFQUFFOGEsZUFBZSxDQUFDLENBQUE7RUFDckQsTUFBQSxJQUFJcmEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZzVCLGNBQWMsRUFBRTtVQUM3QjluQixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRW1aLFVBQUFBLHVCQUF1QixFQUFFLElBQUE7RUFBSyxTQUFDLENBQUMsQ0FBQTtFQUNsRCxPQUFBO0VBQ0EsTUFBQSxJQUFJLENBQUN6YSxLQUFBLENBQUtsUixLQUFLLENBQUN5ZSxtQkFBbUIsSUFBSXZOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3V0QixjQUFjLEVBQUU7RUFDaEVyYyxRQUFBQSxLQUFBLENBQUtrUSxlQUFlLENBQUNsaUIsSUFBSSxDQUFDLENBQUE7U0FDM0IsTUFBTSxJQUFJLENBQUNnUyxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLEVBQUU7RUFDN0IsUUFBQSxJQUFJLENBQUNuTCxLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFZLEVBQUU7RUFDNUI5SCxVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDckIsU0FBQTtFQUVBLFFBQUEsSUFBQThDLFdBQUEsR0FBK0JwSCxLQUFBLENBQUtsUixLQUFLO1lBQWpDRixTQUFTLEdBQUF3WSxXQUFBLENBQVR4WSxTQUFTO1lBQUVDLE9BQU8sR0FBQXVZLFdBQUEsQ0FBUHZZLE9BQU8sQ0FBQTtFQUUxQixRQUFBLElBQ0VELFNBQVMsSUFDVCxDQUFDQyxPQUFPLEtBQ1BtUixLQUFBLENBQUtsUixLQUFLLENBQUNpNUIsU0FBUyxJQUFJLENBQUM3b0IsWUFBWSxDQUFDbFIsSUFBSSxFQUFFWSxTQUFTLENBQUMsQ0FBQyxFQUN4RDtFQUNBb1IsVUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3JCLFNBQUE7RUFDRixPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUFuRSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsVUFBQ2hTLElBQUksRUFBRXVSLEtBQUssRUFBRXlvQixTQUFTLEVBQUUzTixlQUFlLEVBQUs7UUFDekQsSUFBSXBVLFdBQVcsR0FBR2pZLElBQUksQ0FBQTtFQUV0QixNQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYyxFQUFFO0VBQzdCLFFBQUEsSUFDRW5WLFdBQVcsS0FBSyxJQUFJLElBQ3BCaFEsY0FBYyxDQUFDWixlQUFPLENBQUM0USxXQUFXLENBQUMsRUFBRWpHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxFQUNoRDtFQUNBLFVBQUEsT0FBQTtFQUNGLFNBQUE7RUFDRixPQUFDLE1BQU0sSUFBSWtSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixtQkFBbUIsRUFBRTtFQUN6QyxRQUFBLElBQUl4TixXQUFXLEtBQUssSUFBSSxJQUFJbFIsZUFBZSxDQUFDa1IsV0FBVyxFQUFFakcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLEVBQUU7RUFDcEUsVUFBQSxPQUFBO0VBQ0YsU0FBQTtFQUNGLE9BQUMsTUFBTTtFQUNMLFFBQUEsSUFBSW1YLFdBQVcsS0FBSyxJQUFJLElBQUlyUyxhQUFhLENBQUNxUyxXQUFXLEVBQUVqRyxLQUFBLENBQUtsUixLQUFLLENBQUMsRUFBRTtFQUNsRSxVQUFBLE9BQUE7RUFDRixTQUFBO0VBQ0YsT0FBQTtFQUVBLE1BQUEsSUFBQXdZLFlBQUEsR0FTSXRILEtBQUEsQ0FBS2xSLEtBQUs7VUFSWjZSLFFBQVEsR0FBQTJHLFlBQUEsQ0FBUjNHLFFBQVE7VUFDUm1ILFlBQVksR0FBQVIsWUFBQSxDQUFaUSxZQUFZO1VBQ1psWixTQUFTLEdBQUEwWSxZQUFBLENBQVQxWSxTQUFTO1VBQ1RDLE9BQU8sR0FBQXlZLFlBQUEsQ0FBUHpZLE9BQU87VUFDUGdZLGVBQWUsR0FBQVMsWUFBQSxDQUFmVCxlQUFlO1VBQ2ZDLGFBQWEsR0FBQVEsWUFBQSxDQUFiUixhQUFhO1VBQ2JyUCxPQUFPLEdBQUE2UCxZQUFBLENBQVA3UCxPQUFPO1VBQ1Bzd0IsU0FBUyxHQUFBemdCLFlBQUEsQ0FBVHlnQixTQUFTLENBQUE7UUFHWCxJQUNFLENBQUNqMkIsT0FBTyxDQUFDa08sS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxFQUFFZixXQUFXLENBQUMsSUFDMUNqRyxLQUFBLENBQUtsUixLQUFLLENBQUNtNUIsWUFBWSxJQUN2Qm5nQixZQUFZLElBQ1pqQixlQUFlLEVBQ2Y7VUFDQSxJQUFJWixXQUFXLEtBQUssSUFBSSxFQUFFO0VBQ3hCLFVBQUEsSUFDRWpHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsS0FDbEIsQ0FBQ2doQixTQUFTLElBQ1IsQ0FBQ2hvQixLQUFBLENBQUtsUixLQUFLLENBQUN1dEIsY0FBYyxJQUN6QixDQUFDcmMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW5CLGtCQUFrQixJQUM5QixDQUFDblcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK3dCLGFBQWMsQ0FBQyxFQUMvQjtFQUNBNVosWUFBQUEsV0FBVyxHQUFHM1csT0FBTyxDQUFDMlcsV0FBVyxFQUFFO2dCQUNqQ3hXLElBQUksRUFBRXNILGlCQUFRLENBQUNpSixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUM7Z0JBQ25DclgsTUFBTSxFQUFFcUgscUJBQVUsQ0FBQ2dKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQztFQUN2Q25YLGNBQUFBLE1BQU0sRUFBRW9ILHFCQUFVLENBQUMrSSxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUE7RUFDeEMsYUFBQyxDQUFDLENBQUE7RUFDSixXQUFBOztFQUVBO0VBQ0EsVUFBQSxJQUNFLENBQUNnaEIsU0FBUyxLQUNUaG9CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3V0QixjQUFjLElBQUlyYyxLQUFBLENBQUtsUixLQUFLLENBQUNxbkIsa0JBQWtCLENBQUMsRUFDNUQ7RUFDQSxZQUFBLElBQUkxZSxPQUFPLEVBQUU7RUFDWHdPLGNBQUFBLFdBQVcsR0FBRzNXLE9BQU8sQ0FBQzJXLFdBQVcsRUFBRTtFQUNqQ3hXLGdCQUFBQSxJQUFJLEVBQUVnSSxPQUFPLENBQUNWLFFBQVEsRUFBRTtFQUN4QnBILGdCQUFBQSxNQUFNLEVBQUU4SCxPQUFPLENBQUNULFVBQVUsRUFBRTtFQUM1Qm5ILGdCQUFBQSxNQUFNLEVBQUU0SCxPQUFPLENBQUNSLFVBQVUsRUFBQztFQUM3QixlQUFDLENBQUMsQ0FBQTtFQUNKLGFBQUE7RUFDRixXQUFBO0VBRUEsVUFBQSxJQUFJLENBQUMrSSxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLEVBQUU7Y0FDdEJuTCxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFDWjJGLGNBQUFBLFlBQVksRUFBRWhCLFdBQUFBO0VBQ2hCLGFBQUMsQ0FBQyxDQUFBO0VBQ0osV0FBQTtFQUNBLFVBQUEsSUFBSSxDQUFDakcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbzVCLGtCQUFrQixFQUFFO2NBQ2xDbG9CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFK1ksY0FBQUEsZUFBZSxFQUFFQSxlQUFBQTtFQUFnQixhQUFDLENBQUMsQ0FBQTtFQUNyRCxXQUFBO0VBQ0YsU0FBQTtFQUNBLFFBQUEsSUFBSXZTLFlBQVksRUFBRTtFQUNoQixVQUFBLElBQU1xZ0IsUUFBUSxHQUFHLENBQUN2NUIsU0FBUyxJQUFJLENBQUNDLE9BQU8sQ0FBQTtFQUN2QyxVQUFBLElBQU11NUIsYUFBYSxHQUFHeDVCLFNBQVMsSUFBSSxDQUFDQyxPQUFPLENBQUE7RUFDM0MsVUFBQSxJQUFNdzVCLGFBQWEsR0FBR3o1QixTQUFTLElBQUlDLE9BQU8sQ0FBQTtFQUMxQyxVQUFBLElBQUlzNUIsUUFBUSxFQUFFO2NBQ1p4bkIsUUFBUSxDQUFDLENBQUNzRixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTthQUNyQyxNQUFNLElBQUk2b0IsYUFBYSxFQUFFO2NBQ3hCLElBQUluaUIsV0FBVyxLQUFLLElBQUksRUFBRTtnQkFDeEJ0RixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUVwQixLQUFLLENBQUMsQ0FBQTtlQUM5QixNQUFNLElBQUlMLFlBQVksQ0FBQytHLFdBQVcsRUFBRXJYLFNBQVMsQ0FBQyxFQUFFO0VBQy9DLGNBQUEsSUFBSW01QixTQUFTLEVBQUU7a0JBQ2JwbkIsUUFBUSxDQUFDLENBQUNzRixXQUFXLEVBQUVyWCxTQUFTLENBQUMsRUFBRTJRLEtBQUssQ0FBQyxDQUFBO0VBQzNDLGVBQUMsTUFBTTtrQkFDTG9CLFFBQVEsQ0FBQyxDQUFDc0YsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7RUFDdEMsZUFBQTtFQUNGLGFBQUMsTUFBTTtnQkFDTG9CLFFBQVEsQ0FBQyxDQUFDL1IsU0FBUyxFQUFFcVgsV0FBVyxDQUFDLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtFQUMzQyxhQUFBO0VBQ0YsV0FBQTtFQUNBLFVBQUEsSUFBSThvQixhQUFhLEVBQUU7Y0FDakIxbkIsUUFBUSxDQUFDLENBQUNzRixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtFQUN0QyxXQUFBO1dBQ0QsTUFBTSxJQUFJc0gsZUFBZSxFQUFFO1lBQzFCLElBQUksRUFBQ0MsYUFBYSxLQUFiQSxJQUFBQSxJQUFBQSxhQUFhLGVBQWJBLGFBQWEsQ0FBRWhaLE1BQU0sQ0FBRSxFQUFBO0VBQzFCNlMsWUFBQUEsUUFBUSxDQUFDLENBQUNzRixXQUFXLENBQUMsRUFBRTFHLEtBQUssQ0FBQyxDQUFBO0VBQ2hDLFdBQUMsTUFBTTtFQUNMLFlBQUEsSUFBTStvQiw0QkFBNEIsR0FBR3hoQixhQUFhLENBQUN2UyxJQUFJLENBQ3JELFVBQUNnMEIsWUFBWSxFQUFBO0VBQUEsY0FBQSxPQUFLMzJCLFNBQVMsQ0FBQzIyQixZQUFZLEVBQUV0aUIsV0FBVyxDQUFDLENBQUE7RUFBQSxhQUN4RCxDQUFDLENBQUE7RUFFRCxZQUFBLElBQUlxaUIsNEJBQTRCLEVBQUU7RUFDaEMsY0FBQSxJQUFNRSxTQUFTLEdBQUcxaEIsYUFBYSxDQUFDaE0sTUFBTSxDQUNwQyxVQUFDeXRCLFlBQVksRUFBQTtFQUFBLGdCQUFBLE9BQUssQ0FBQzMyQixTQUFTLENBQUMyMkIsWUFBWSxFQUFFdGlCLFdBQVcsQ0FBQyxDQUFBO0VBQUEsZUFDekQsQ0FBQyxDQUFBO0VBRUR0RixjQUFBQSxRQUFRLENBQUM2bkIsU0FBUyxFQUFFanBCLEtBQUssQ0FBQyxDQUFBO0VBQzVCLGFBQUMsTUFBTTtnQkFDTG9CLFFBQVEsQ0FBQSxFQUFBLENBQUFuUyxNQUFBLENBQUEyTyxrQkFBQSxDQUFLMkosYUFBYSxDQUFFYixFQUFBQSxDQUFBQSxXQUFXLENBQUcxRyxDQUFBQSxFQUFBQSxLQUFLLENBQUMsQ0FBQTtFQUNsRCxhQUFBO0VBQ0YsV0FBQTtFQUNGLFNBQUMsTUFBTTtFQUNMb0IsVUFBQUEsUUFBUSxDQUFDc0YsV0FBVyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7RUFDOUIsU0FBQTtFQUNGLE9BQUE7UUFFQSxJQUFJLENBQUN5b0IsU0FBUyxFQUFFO1VBQ2Rob0IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdVYsUUFBUSxDQUFDNEIsV0FBVyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7VUFDdkNTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFd2xCLFVBQUFBLFVBQVUsRUFBRSxJQUFBO0VBQUssU0FBQyxDQUFDLENBQUE7RUFDckMsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUVEO0VBQUEzbUIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQ2tCLGlCQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBSztRQUMxQixJQUFNeTZCLFVBQVUsR0FBRyxPQUFPem9CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sS0FBSyxXQUFXLENBQUE7UUFDNUQsSUFBTW04QixVQUFVLEdBQUcsT0FBTzFvQixLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFPLEtBQUssV0FBVyxDQUFBO1FBQzVELElBQUkyMEIsb0JBQW9CLEdBQUcsSUFBSSxDQUFBO0VBQy9CLE1BQUEsSUFBSTM2QixJQUFJLEVBQUU7RUFDUixRQUFBLElBQU00NkIsY0FBYyxHQUFHdDRCLHFCQUFVLENBQUN0QyxJQUFJLENBQUMsQ0FBQTtVQUN2QyxJQUFJeTZCLFVBQVUsSUFBSUMsVUFBVSxFQUFFO0VBQzVCO0VBQ0FDLFVBQUFBLG9CQUFvQixHQUFHMzJCLFlBQVksQ0FDakNoRSxJQUFJLEVBQ0pnUyxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLEVBQ2xCeVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa0YsT0FDYixDQUFDLENBQUE7V0FDRixNQUFNLElBQUl5MEIsVUFBVSxFQUFFO1lBQ3JCLElBQU1JLGlCQUFpQixHQUFHdjRCLHFCQUFVLENBQUMwUCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLENBQUMsQ0FBQTtFQUN4RG84QixVQUFBQSxvQkFBb0IsR0FDbEI1cUIsZUFBTyxDQUFDL1AsSUFBSSxFQUFFNjZCLGlCQUFpQixDQUFDLElBQ2hDLzJCLE9BQU8sQ0FBQzgyQixjQUFjLEVBQUVDLGlCQUFpQixDQUFDLENBQUE7V0FDN0MsTUFBTSxJQUFJSCxVQUFVLEVBQUU7WUFDckIsSUFBTUksZUFBZSxHQUFHMTJCLGlCQUFRLENBQUM0TixLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFPLENBQUMsQ0FBQTtFQUNwRDIwQixVQUFBQSxvQkFBb0IsR0FDbEJ6NkIsaUJBQVEsQ0FBQ0YsSUFBSSxFQUFFODZCLGVBQWUsQ0FBQyxJQUMvQmgzQixPQUFPLENBQUM4MkIsY0FBYyxFQUFFRSxlQUFlLENBQUMsQ0FBQTtFQUM1QyxTQUFBO0VBQ0YsT0FBQTtFQUNBLE1BQUEsSUFBSUgsb0JBQW9CLEVBQUU7VUFDeEIzb0IsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQ1oyRixVQUFBQSxZQUFZLEVBQUVqWixJQUFBQTtFQUNoQixTQUFDLENBQUMsQ0FBQTtFQUNKLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQW1TLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFlBQU07UUFDckJBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxDQUFDdEUsS0FBQSxDQUFLTSxLQUFLLENBQUNvakIsSUFBSSxDQUFDLENBQUE7T0FDL0IsQ0FBQSxDQUFBO0VBQUF2akIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQ3BKLElBQUksRUFBSztFQUMzQixNQUFBLElBQU1vUSxRQUFRLEdBQUdoSCxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEdBQ2hDaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxHQUNuQmhILEtBQUEsQ0FBSytsQixlQUFlLEVBQUUsQ0FBQTtFQUMxQixNQUFBLElBQUk5ZixXQUFXLEdBQUdqRyxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEdBQ2pDcFEsSUFBSSxHQUNKdEgsT0FBTyxDQUFDMFgsUUFBUSxFQUFFO0VBQ2hCdlgsUUFBQUEsSUFBSSxFQUFFc0gsaUJBQVEsQ0FBQ0gsSUFBSSxDQUFDO1VBQ3BCakgsTUFBTSxFQUFFcUgscUJBQVUsQ0FBQ0osSUFBSSxDQUFBO0VBQ3pCLE9BQUMsQ0FBQyxDQUFBO1FBRU5vSixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFDWjJGLFFBQUFBLFlBQVksRUFBRWhCLFdBQUFBO0VBQ2hCLE9BQUMsQ0FBQyxDQUFBO0VBRUZqRyxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUNzRixXQUFXLENBQUMsQ0FBQTtFQUNoQyxNQUFBLElBQUlqRyxLQUFBLENBQUtsUixLQUFLLENBQUN5ZSxtQkFBbUIsRUFBRTtVQUNsQ3ZOLEtBQUEsQ0FBSzZuQixvQkFBb0IsRUFBRSxDQUFBO0VBQzNCN25CLFFBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNyQixPQUFBO0VBQ0EsTUFBQSxJQUFJdEUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK3dCLGFBQWEsRUFBRTtFQUM1QjdmLFFBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUNwQixPQUFBO1FBQ0EsSUFBSXRFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FuQixrQkFBa0IsSUFBSW5XLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3V0QixjQUFjLEVBQUU7VUFDOURyYyxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRW1aLFVBQUFBLHVCQUF1QixFQUFFLElBQUE7RUFBSyxTQUFDLENBQUMsQ0FBQTtFQUNsRCxPQUFBO1FBQ0F6YSxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRXdsQixRQUFBQSxVQUFVLEVBQUUsSUFBQTtFQUFLLE9BQUMsQ0FBQyxDQUFBO09BQ3BDLENBQUEsQ0FBQTtNQUFBM21CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGNBQUEsRUFFYyxZQUFNO0VBQ25CLE1BQUEsSUFBSSxDQUFDQSxLQUFBLENBQUtsUixLQUFLLENBQUN1ekIsUUFBUSxJQUFJLENBQUNyaUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaTRCLFFBQVEsRUFBRTtFQUNoRC9tQixRQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7RUFDcEIsT0FBQTtFQUVBdEUsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaTZCLFlBQVksRUFBRSxDQUFBO09BQzFCLENBQUEsQ0FBQTtFQUFBNW9CLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUMxQlMsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWQsU0FBUyxDQUFDeE0sS0FBSyxDQUFDLENBQUE7RUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDNUQsR0FBRyxDQUFBO1FBRTFCLElBQ0UsQ0FBQ3FFLEtBQUEsQ0FBS00sS0FBSyxDQUFDb2pCLElBQUksSUFDaEIsQ0FBQzFqQixLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLElBQ2xCLENBQUNuTCxLQUFBLENBQUtsUixLQUFLLENBQUNrNEIsa0JBQWtCLEVBQzlCO1VBQ0EsSUFDRTFnQixRQUFRLEtBQUssV0FBVyxJQUN4QkEsUUFBUSxLQUFLLFNBQVMsSUFDdEJBLFFBQVEsS0FBSyxPQUFPLEVBQ3BCO1lBQ0F0RyxLQUFBLENBQUsrb0IsWUFBWSxFQUFFLENBQUE7RUFDckIsU0FBQTtFQUNBLFFBQUEsT0FBQTtFQUNGLE9BQUE7O0VBRUE7RUFDQSxNQUFBLElBQUkvb0IsS0FBQSxDQUFLTSxLQUFLLENBQUNvakIsSUFBSSxFQUFFO0VBQ25CLFFBQUEsSUFBSXBkLFFBQVEsS0FBSyxXQUFXLElBQUlBLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDdEQvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtFQUN0QixVQUFBLElBQU15aUIsY0FBYyxHQUNsQmhwQixLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLElBQUlsSCxLQUFBLENBQUtsUixLQUFLLENBQUM2Z0IsZUFBZSxHQUNuRCw4Q0FBOEMsR0FDOUMzUCxLQUFBLENBQUtsUixLQUFLLENBQUNtakIsdUJBQXVCLElBQ2hDalMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQixHQUM5Qiw2Q0FBNkMsR0FDN0Msc0NBQXNDLENBQUE7RUFDOUMsVUFBQSxJQUFNd1YsWUFBWSxHQUNoQmpwQixLQUFBLENBQUtrcEIsUUFBUSxDQUFDQyxhQUFhLElBQzNCbnBCLEtBQUEsQ0FBS2twQixRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsYUFBYSxDQUFDSixjQUFjLENBQUMsQ0FBQTtFQUMzREMsVUFBQUEsWUFBWSxJQUFJQSxZQUFZLENBQUN0ZCxLQUFLLENBQUM7RUFBRUMsWUFBQUEsYUFBYSxFQUFFLElBQUE7RUFBSyxXQUFDLENBQUMsQ0FBQTtFQUUzRCxVQUFBLE9BQUE7RUFDRixTQUFBO1VBRUEsSUFBTXlkLElBQUksR0FBRzE5QixPQUFPLENBQUNxVSxLQUFBLENBQUtNLEtBQUssQ0FBQzJHLFlBQVksQ0FBQyxDQUFBO1VBQzdDLElBQUlYLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDeEIvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtFQUN0QixVQUFBLElBQ0V2RyxLQUFBLENBQUtzcEIsT0FBTyxFQUFFLElBQ2R0cEIsS0FBQSxDQUFLTSxLQUFLLENBQUNxbUIsbUJBQW1CLEtBQUtDLDZCQUE2QixFQUNoRTtFQUNBNW1CLFlBQUFBLEtBQUEsQ0FBS3VwQixZQUFZLENBQUNGLElBQUksRUFBRTlwQixLQUFLLENBQUMsQ0FBQTtjQUM5QixDQUFDUyxLQUFBLENBQUtsUixLQUFLLENBQUN5ZSxtQkFBbUIsSUFBSXZOLEtBQUEsQ0FBS2tRLGVBQWUsQ0FBQ21aLElBQUksQ0FBQyxDQUFBO0VBQy9ELFdBQUMsTUFBTTtFQUNMcnBCLFlBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNyQixXQUFBO0VBQ0YsU0FBQyxNQUFNLElBQUlnQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7WUFDdEJ2RyxLQUFBLENBQUs2bkIsb0JBQW9CLEVBQUUsQ0FBQTtFQUMzQjduQixVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDckIsU0FBQyxNQUFNLElBQUlnQyxRQUFRLEtBQUssS0FBSyxFQUFFO0VBQzdCdEcsVUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3JCLFNBQUE7RUFFQSxRQUFBLElBQUksQ0FBQ3RFLEtBQUEsQ0FBS3NwQixPQUFPLEVBQUUsRUFBRTtFQUNuQnRwQixVQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUMwNkIsWUFBWSxDQUFDO0VBQUVDLFlBQUFBLElBQUksRUFBRSxDQUFDO0VBQUVDLFlBQUFBLEdBQUcsRUFBRWhFLFdBQUFBO0VBQVksV0FBQyxDQUFDLENBQUE7RUFDeEQsU0FBQTtFQUNGLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQXZsQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDNUQsR0FBRyxDQUFBO1FBQzFCLElBQUkySyxRQUFRLEtBQUssUUFBUSxFQUFFO1VBQ3pCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7VUFDdEJ2RyxLQUFBLENBQUtzQixRQUFRLENBQ1g7RUFDRTRrQixVQUFBQSxZQUFZLEVBQUUsSUFBQTtFQUNoQixTQUFDLEVBQ0QsWUFBTTtFQUNKbG1CLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNuQjRpQixVQUFBQSxVQUFVLENBQUMsWUFBTTtjQUNmbG5CLEtBQUEsQ0FBS21uQixRQUFRLEVBQUUsQ0FBQTtjQUNmbm5CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFNGtCLGNBQUFBLFlBQVksRUFBRSxLQUFBO0VBQU0sYUFBQyxDQUFDLENBQUE7RUFDeEMsV0FBQyxDQUFDLENBQUE7RUFDSixTQUNGLENBQUMsQ0FBQTtFQUNILE9BQUE7T0FDRCxDQUFBLENBQUE7RUFFRDtFQUFBL2xCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUNlLGNBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDeEJTLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lkLFNBQVMsQ0FBQ3hNLEtBQUssQ0FBQyxDQUFBO0VBQzNCLE1BQUEsSUFBTStHLFFBQVEsR0FBRy9HLEtBQUssQ0FBQzVELEdBQUcsQ0FBQTtFQUMxQixNQUFBLElBQU1ndUIsZ0JBQWdCLEdBQUdwcUIsS0FBSyxDQUFDcXFCLFFBQVEsQ0FBQTtRQUV2QyxJQUFNUCxJQUFJLEdBQUcxOUIsT0FBTyxDQUFDcVUsS0FBQSxDQUFLTSxLQUFLLENBQUMyRyxZQUFZLENBQUMsQ0FBQTtRQUM3QyxJQUFJWCxRQUFRLEtBQUssT0FBTyxFQUFFO1VBQ3hCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7RUFDdEJ2RyxRQUFBQSxLQUFBLENBQUt1cEIsWUFBWSxDQUFDRixJQUFJLEVBQUU5cEIsS0FBSyxDQUFDLENBQUE7VUFDOUIsQ0FBQ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWUsbUJBQW1CLElBQUl2TixLQUFBLENBQUtrUSxlQUFlLENBQUNtWixJQUFJLENBQUMsQ0FBQTtFQUMvRCxPQUFDLE1BQU0sSUFBSS9pQixRQUFRLEtBQUssUUFBUSxFQUFFO1VBQ2hDL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7RUFFdEJ2RyxRQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDbkIsUUFBQSxJQUFJLENBQUN0RSxLQUFBLENBQUtzcEIsT0FBTyxFQUFFLEVBQUU7RUFDbkJ0cEIsVUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMDZCLFlBQVksQ0FBQztFQUFFQyxZQUFBQSxJQUFJLEVBQUUsQ0FBQztFQUFFQyxZQUFBQSxHQUFHLEVBQUVoRSxXQUFBQTtFQUFZLFdBQUMsQ0FBQyxDQUFBO0VBQ3hELFNBQUE7U0FDRCxNQUFNLElBQUksQ0FBQzFsQixLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsRUFBRTtFQUNqRCxRQUFBLElBQUlrakIsWUFBWSxDQUFBO0VBQ2hCLFFBQUEsUUFBUXZqQixRQUFRO0VBQ2QsVUFBQSxLQUFLLFdBQVc7RUFDZCxZQUFBLElBQUl0RyxLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLEVBQUU7RUFDN0IyaUIsY0FBQUEsWUFBWSxHQUFHQyxpQkFBUSxDQUFDVCxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDbEMsYUFBQyxNQUFNO0VBQ0xRLGNBQUFBLFlBQVksR0FBR0UsZUFBTyxDQUFDVixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDakMsYUFBQTtFQUNBLFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxZQUFZO0VBQ2YsWUFBQSxJQUFJcnBCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ZLGNBQWMsRUFBRTtFQUM3QjJpQixjQUFBQSxZQUFZLEdBQUdHLGlCQUFRLENBQUNYLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNsQyxhQUFDLE1BQU07RUFDTFEsY0FBQUEsWUFBWSxHQUFHaGMsZUFBTyxDQUFDd2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ2pDLGFBQUE7RUFDQSxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssU0FBUztFQUNaUSxZQUFBQSxZQUFZLEdBQUdDLGlCQUFRLENBQUNULElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNoQyxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssV0FBVztFQUNkUSxZQUFBQSxZQUFZLEdBQUdHLGlCQUFRLENBQUNYLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNoQyxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssUUFBUTtFQUNYUSxZQUFBQSxZQUFZLEdBQUdGLGdCQUFnQixHQUMzQnB3QixpQkFBUSxDQUFDOHZCLElBQUksRUFBRSxDQUFDLENBQUMsR0FDakJueEIsbUJBQVMsQ0FBQ214QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDdEIsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFVBQVU7RUFDYlEsWUFBQUEsWUFBWSxHQUFHRixnQkFBZ0IsR0FDM0J2dkIsaUJBQVEsQ0FBQ2l2QixJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQ2pCN3dCLG1CQUFTLENBQUM2d0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ3RCLFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxNQUFNO0VBQ1RRLFlBQUFBLFlBQVksR0FBR3Q1QixjQUFjLENBQzNCODRCLElBQUksRUFDSnJwQixLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLEVBQ2pCMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQ2IsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLEtBQUs7RUFDUnE1QixZQUFBQSxZQUFZLEdBQUczNEIsWUFBWSxDQUFDbTRCLElBQUksQ0FBQyxDQUFBO0VBQ2pDLFlBQUEsTUFBQTtFQUNGLFVBQUE7RUFDRVEsWUFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQTtFQUNuQixZQUFBLE1BQUE7RUFDSixTQUFBO1VBQ0EsSUFBSSxDQUFDQSxZQUFZLEVBQUU7RUFDakIsVUFBQSxJQUFJN3BCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzA2QixZQUFZLEVBQUU7RUFDM0J4cEIsWUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMDZCLFlBQVksQ0FBQztFQUFFQyxjQUFBQSxJQUFJLEVBQUUsQ0FBQztFQUFFQyxjQUFBQSxHQUFHLEVBQUVoRSxXQUFBQTtFQUFZLGFBQUMsQ0FBQyxDQUFBO0VBQ3hELFdBQUE7RUFDQSxVQUFBLE9BQUE7RUFDRixTQUFBO1VBQ0FubUIsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7VUFDdEJ2RyxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRXFsQixVQUFBQSxtQkFBbUIsRUFBRUMsNkJBQUFBO0VBQThCLFNBQUMsQ0FBQyxDQUFBO0VBQ3JFLFFBQUEsSUFBSTVtQixLQUFBLENBQUtsUixLQUFLLENBQUNxVixrQkFBa0IsRUFBRTtFQUNqQ25FLFVBQUFBLEtBQUEsQ0FBSzRuQixXQUFXLENBQUNpQyxZQUFZLENBQUMsQ0FBQTtFQUNoQyxTQUFBO0VBQ0E3cEIsUUFBQUEsS0FBQSxDQUFLa1EsZUFBZSxDQUFDMlosWUFBWSxDQUFDLENBQUE7RUFDbEM7RUFDQSxRQUFBLElBQUk3cEIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxFQUFFO0VBQ3JCLFVBQUEsSUFBTThlLFNBQVMsR0FBRzEwQixpQkFBUSxDQUFDOHpCLElBQUksQ0FBQyxDQUFBO0VBQ2hDLFVBQUEsSUFBTXBaLFFBQVEsR0FBRzFhLGlCQUFRLENBQUNzMEIsWUFBWSxDQUFDLENBQUE7RUFDdkMsVUFBQSxJQUFNSyxRQUFRLEdBQUc3MEIsZUFBTyxDQUFDZzBCLElBQUksQ0FBQyxDQUFBO0VBQzlCLFVBQUEsSUFBTXpwQixPQUFPLEdBQUd2SyxlQUFPLENBQUN3MEIsWUFBWSxDQUFDLENBQUE7RUFFckMsVUFBQSxJQUFJSSxTQUFTLEtBQUtoYSxRQUFRLElBQUlpYSxRQUFRLEtBQUt0cUIsT0FBTyxFQUFFO0VBQ2xEO2NBQ0FJLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFOEosY0FBQUEsb0JBQW9CLEVBQUUsSUFBQTtFQUFLLGFBQUMsQ0FBQyxDQUFBO0VBQy9DLFdBQUMsTUFBTTtFQUNMO2NBQ0FwTCxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRThKLGNBQUFBLG9CQUFvQixFQUFFLEtBQUE7RUFBTSxhQUFDLENBQUMsQ0FBQTtFQUNoRCxXQUFBO0VBQ0YsU0FBQTtFQUNGLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFFRDtFQUNBO0VBQUFqTCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFDa0IsaUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDNUQsR0FBRyxDQUFBO1FBQzFCLElBQUkySyxRQUFRLEtBQUssUUFBUSxFQUFFO1VBQ3pCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7VUFDdEJ2RyxLQUFBLENBQUs2bkIsb0JBQW9CLEVBQUUsQ0FBQTtFQUM3QixPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBQUExbkIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWMsY0FBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUN4QixNQUFBLElBQUlBLEtBQUssRUFBRTtVQUNULElBQUlBLEtBQUssQ0FBQ2dILGNBQWMsRUFBRTtZQUN4QmhILEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO0VBQ3hCLFNBQUE7RUFDRixPQUFBO1FBRUF2RyxLQUFBLENBQUs2bkIsb0JBQW9CLEVBQUUsQ0FBQTtFQUUzQixNQUFBLElBQUk3bkIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1osWUFBWSxFQUFFO0VBQzNCOUgsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlIsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFcEIsS0FBSyxDQUFDLENBQUE7RUFDMUMsT0FBQyxNQUFNO1VBQ0xTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZSLFFBQVEsQ0FBQyxJQUFJLEVBQUVwQixLQUFLLENBQUMsQ0FBQTtFQUNsQyxPQUFBO1FBQ0FTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFd2xCLFFBQUFBLFVBQVUsRUFBRSxJQUFBO0VBQUssT0FBQyxDQUFDLENBQUE7T0FDcEMsQ0FBQSxDQUFBO01BQUEzbUIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsT0FBQSxFQUVPLFlBQU07UUFDWkEsS0FBQSxDQUFLbXFCLFlBQVksRUFBRSxDQUFBO09BQ3BCLENBQUEsQ0FBQTtFQUFBaHFCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDcEIsTUFBQSxJQUNFLE9BQU9TLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3M3QixhQUFhLEtBQUssU0FBUyxJQUM3Q3BxQixLQUFBLENBQUtsUixLQUFLLENBQUNzN0IsYUFBYSxFQUN4QjtVQUNBLElBQ0U3cUIsS0FBSyxDQUFDa0UsTUFBTSxLQUFLdUgsUUFBUSxJQUN6QnpMLEtBQUssQ0FBQ2tFLE1BQU0sS0FBS3VILFFBQVEsQ0FBQ3FmLGVBQWUsSUFDekM5cUIsS0FBSyxDQUFDa0UsTUFBTSxLQUFLdUgsUUFBUSxDQUFDRSxJQUFJLEVBQzlCO0VBQ0FsTCxVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDckIsU0FBQTtTQUNELE1BQU0sSUFBSSxPQUFPdEUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDczdCLGFBQWEsS0FBSyxVQUFVLEVBQUU7VUFDekQsSUFBSXBxQixLQUFBLENBQUtsUixLQUFLLENBQUNzN0IsYUFBYSxDQUFDN3FCLEtBQUssQ0FBQyxFQUFFO0VBQ25DUyxVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDckIsU0FBQTtFQUNGLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQW5FLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFlBQU07RUFDckIsTUFBQSxJQUFJLENBQUNBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FjLE1BQU0sSUFBSSxDQUFDbkwsS0FBQSxDQUFLc3FCLGNBQWMsRUFBRSxFQUFFO0VBQ2hELFFBQUEsT0FBTyxJQUFJLENBQUE7RUFDYixPQUFBO0VBQ0EsTUFBQSxvQkFDRTlwQixzQkFBQSxDQUFBQyxhQUFBLENBQUMra0IsZUFBZSxFQUFBO0VBQ2QxaUIsUUFBQUEsR0FBRyxFQUFFLFNBQUFBLEdBQUN5bkIsQ0FBQUEsSUFBSSxFQUFLO1lBQ2J2cUIsS0FBQSxDQUFLa3BCLFFBQVEsR0FBR3FCLElBQUksQ0FBQTtXQUNwQjtFQUNGbCtCLFFBQUFBLE1BQU0sRUFBRTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU87RUFDMUJtRSxRQUFBQSxnQkFBZ0IsRUFBRXdQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUFpQjtFQUM5Q3NkLFFBQUFBLHdCQUF3QixFQUFFOU4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ2Ysd0JBQXlCO0VBQzlEQyxRQUFBQSwwQkFBMEIsRUFBRS9OLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lmLDBCQUEyQjtFQUNsRTJCLFFBQUFBLG1CQUFtQixFQUFFMVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNGdCLG1CQUFvQjtFQUNwRHdQLFFBQUFBLG9CQUFvQixFQUFFbGYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3dCLG9CQUFxQjtFQUN0RC9hLFFBQUFBLGtCQUFrQixFQUFFbkUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcVYsa0JBQW1CO1VBQ2xERyxPQUFPLEVBQUV0RSxLQUFBLENBQUtzRSxPQUFRO0VBQ3RCaUosUUFBQUEsbUJBQW1CLEVBQUV2TixLQUFBLENBQUtsUixLQUFLLENBQUN5ZSxtQkFBb0I7RUFDcERuaEIsUUFBQUEsVUFBVSxFQUFFNFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMDdCLGtCQUFtQjtFQUMxQ3JQLFFBQUFBLGdCQUFnQixFQUFFbmIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcXNCLGdCQUFpQjtFQUM5Q0QsUUFBQUEsYUFBYSxFQUFFbGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3NCLGFBQWM7RUFDeEMxVyxRQUFBQSxZQUFZLEVBQUV4RSxLQUFBLENBQUtsUixLQUFLLENBQUMwVixZQUFhO0VBQ3RDd0MsUUFBQUEsUUFBUSxFQUFFaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUztFQUM5QkMsUUFBQUEsWUFBWSxFQUFFakgsS0FBQSxDQUFLTSxLQUFLLENBQUMyRyxZQUFhO1VBQ3RDNUMsUUFBUSxFQUFFckUsS0FBQSxDQUFLdXBCLFlBQWE7RUFDNUJsYyxRQUFBQSxZQUFZLEVBQUVyTixLQUFBLENBQUtsUixLQUFLLENBQUN1ZSxZQUFhO0VBQ3RDOEgsUUFBQUEsVUFBVSxFQUFFblYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW1CLFVBQVc7RUFDbEM1b0IsUUFBQUEsT0FBTyxFQUFFeVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FBUTtFQUM1QnlILFFBQUFBLE9BQU8sRUFBRWdNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQVE7RUFDNUI0VCxRQUFBQSxZQUFZLEVBQUU1SCxLQUFBLENBQUtsUixLQUFLLENBQUM4WSxZQUFhO0VBQ3RDQyxRQUFBQSxVQUFVLEVBQUU3SCxLQUFBLENBQUtsUixLQUFLLENBQUMrWSxVQUFXO0VBQ2xDQyxRQUFBQSxZQUFZLEVBQUU5SCxLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFhO0VBQ3RDakIsUUFBQUEsZUFBZSxFQUFFN0csS0FBQSxDQUFLbFIsS0FBSyxDQUFDK1gsZUFBZ0I7RUFDNUNDLFFBQUFBLGFBQWEsRUFBRTlHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dZLGFBQWM7RUFDeENsWSxRQUFBQSxTQUFTLEVBQUVvUixLQUFBLENBQUtsUixLQUFLLENBQUNGLFNBQVU7RUFDaENDLFFBQUFBLE9BQU8sRUFBRW1SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBUTtFQUM1Qm9GLFFBQUFBLFlBQVksRUFBRStMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21GLFlBQWE7RUFDdENDLFFBQUFBLG9CQUFvQixFQUFFOEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb0Ysb0JBQXFCO0VBQ3RERyxRQUFBQSxVQUFVLEVBQUUyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1RixVQUFXO1VBQ2xDNk8sY0FBYyxFQUFFbEQsS0FBQSxDQUFLeXFCLDBCQUEyQjtFQUNoRGpkLFFBQUFBLGdCQUFnQixFQUFFeE4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGUsZ0JBQWlCO0VBQzlDclMsUUFBQUEsY0FBYyxFQUFFNkUsS0FBQSxDQUFLTSxLQUFLLENBQUNuRixjQUFlO1VBQzFDb00sUUFBUSxFQUFFM0ssY0FBYyxDQUFDb0QsS0FBQSxDQUFLMHFCLGNBQWMsRUFBRSxDQUFFO0VBQ2hEdjJCLFFBQUFBLFlBQVksRUFBRTZMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FGLFlBQWE7RUFDdENDLFFBQUFBLG9CQUFvQixFQUFFNEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0Ysb0JBQXFCO0VBQ3REaUQsUUFBQUEsWUFBWSxFQUFFMkksS0FBQSxDQUFLbFIsS0FBSyxDQUFDdUksWUFBYTtFQUN0QzBkLFFBQUFBLFdBQVcsRUFBRS9VLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2ltQixXQUFZO0VBQ3BDNUosUUFBQUEsTUFBTSxFQUFFbkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTztFQUMxQkMsUUFBQUEsb0JBQW9CLEVBQUVwTCxLQUFBLENBQUtNLEtBQUssQ0FBQzhLLG9CQUFxQjtFQUN0RDJFLFFBQUFBLGFBQWEsRUFBRS9QLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2loQixhQUFjO0VBQ3hDZ04sUUFBQUEsaUJBQWlCLEVBQUUvYyxLQUFBLENBQUtsUixLQUFLLENBQUNpdUIsaUJBQWtCO0VBQ2hENEIsUUFBQUEsa0JBQWtCLEVBQUUzZSxLQUFBLENBQUtsUixLQUFLLENBQUM2dkIsa0JBQW1CO0VBQ2xEelosUUFBQUEsdUJBQXVCLEVBQUVsRixLQUFBLENBQUtsUixLQUFLLENBQUNvVyx1QkFBd0I7RUFDNUQ4WCxRQUFBQSxxQkFBcUIsRUFBRWhkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2t1QixxQkFBc0I7RUFDeERyTixRQUFBQSxlQUFlLEVBQUUzUCxLQUFBLENBQUtsUixLQUFLLENBQUM2Z0IsZUFBZ0I7RUFDNUNtTixRQUFBQSxnQkFBZ0IsRUFBRTljLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2d1QixnQkFBaUI7RUFDOUM0QyxRQUFBQSxVQUFVLEVBQUUxZixLQUFBLENBQUtsUixLQUFLLENBQUM0d0IsVUFBVztFQUNsQ25FLFFBQUFBLHdCQUF3QixFQUFFdmIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeXNCLHdCQUF5QjtFQUM5REMsUUFBQUEsMkJBQTJCLEVBQUV4YixLQUFBLENBQUtsUixLQUFLLENBQUMwc0IsMkJBQTRCO0VBQ3BFL1osUUFBQUEsc0JBQXNCLEVBQUV6QixLQUFBLENBQUtsUixLQUFLLENBQUMyUyxzQkFBdUI7RUFDMURtRSxRQUFBQSwyQkFBMkIsRUFBRTVGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhXLDJCQUE0QjtFQUNwRXNRLFFBQUFBLFdBQVcsRUFBRWxXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29uQixXQUFZO0VBQ3BDNEUsUUFBQUEsU0FBUyxFQUFFOWEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLFNBQVU7RUFDaEN5SyxRQUFBQSx1QkFBdUIsRUFBRUEsdUJBQXdCO0VBQ2pEaFcsUUFBQUEsV0FBVyxFQUFFdlAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWdCLFdBQVk7RUFDcENxUCxRQUFBQSxXQUFXLEVBQUU1ZSxLQUFBLENBQUtsUixLQUFLLENBQUM4dkIsV0FBWTtFQUNwQ3ZFLFFBQUFBLGVBQWUsRUFBRXJhLEtBQUEsQ0FBS00sS0FBSyxDQUFDK1osZUFBZ0I7VUFDNUNILGVBQWUsRUFBRWxhLEtBQUEsQ0FBS3lkLG1CQUFvQjtFQUMxQzlDLFFBQUFBLGFBQWEsRUFBRTNhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZyQixhQUFjO0VBQ3hDSCxRQUFBQSxZQUFZLEVBQUV4YSxLQUFBLENBQUtsUixLQUFLLENBQUMwckIsWUFBYTtFQUN0QzdSLFFBQUFBLFlBQVksRUFBRTNJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZaLFlBQWE7RUFDdENzUyxRQUFBQSxnQkFBZ0IsRUFBRWpiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21zQixnQkFBaUI7RUFDOUNsSyxRQUFBQSxjQUFjLEVBQUUvUSxLQUFBLENBQUtsUixLQUFLLENBQUNpaUIsY0FBZTtFQUMxQzZELFFBQUFBLGFBQWEsRUFBRTVVLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhsQixhQUFjO0VBQ3hDa1QsUUFBQUEsY0FBYyxFQUFFOW5CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2c1QixjQUFlO0VBQzFDekwsUUFBQUEsY0FBYyxFQUFFcmMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXRCLGNBQWU7RUFDMUNsRyxRQUFBQSxrQkFBa0IsRUFBRW5XLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FuQixrQkFBbUI7VUFDbERHLFlBQVksRUFBRXRXLEtBQUEsQ0FBSzJxQixnQkFBaUI7RUFDcENuTCxRQUFBQSxVQUFVLEVBQUV4ZixLQUFBLENBQUtsUixLQUFLLENBQUMwd0IsVUFBVztFQUNsQ0MsUUFBQUEsYUFBYSxFQUFFemYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMndCLGFBQWM7RUFDeENob0IsUUFBQUEsT0FBTyxFQUFFdUksS0FBQSxDQUFLbFIsS0FBSyxDQUFDMkksT0FBUTtFQUM1QkMsUUFBQUEsT0FBTyxFQUFFc0ksS0FBQSxDQUFLbFIsS0FBSyxDQUFDNEksT0FBUTtFQUM1Qk4sUUFBQUEsWUFBWSxFQUFFNEksS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0ksWUFBYTtFQUN0Q0UsUUFBQUEsVUFBVSxFQUFFMEksS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0ksVUFBVztFQUNsQzhlLFFBQUFBLFdBQVcsRUFBRXBXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NuQixXQUFZO0VBQ3BDaGEsUUFBQUEsU0FBUyxFQUFFNEQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDODdCLGlCQUFrQjtFQUN4Q3ZLLFFBQUFBLFNBQVMsRUFBRXJnQixLQUFBLENBQUtsUixLQUFLLENBQUMrN0IsaUJBQWtCO0VBQ3hDanhCLFFBQUFBLGNBQWMsRUFBRW9HLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhLLGNBQWU7RUFDMUM0SCxRQUFBQSxzQkFBc0IsRUFBRXhCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBTLHNCQUF1QjtFQUMxRHlhLFFBQUFBLHNCQUFzQixFQUFFamMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbXRCLHNCQUF1QjtFQUMxREgsUUFBQUEsd0JBQXdCLEVBQUU5YixLQUFBLENBQUtsUixLQUFLLENBQUNndEIsd0JBQXlCO0VBQzlEYSxRQUFBQSxrQkFBa0IsRUFBRTNjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZ0QixrQkFBbUI7RUFDbERILFFBQUFBLG9CQUFvQixFQUFFeGMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMHRCLG9CQUFxQjtFQUN0REwsUUFBQUEscUJBQXFCLEVBQUVuYyxLQUFBLENBQUtsUixLQUFLLENBQUNxdEIscUJBQXNCO0VBQ3hESixRQUFBQSx1QkFBdUIsRUFBRS9iLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2l0Qix1QkFBd0I7RUFDNURjLFFBQUFBLGlCQUFpQixFQUFFN2MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK3RCLGlCQUFrQjtFQUNoREosUUFBQUEsbUJBQW1CLEVBQUV6YyxLQUFBLENBQUtsUixLQUFLLENBQUMydEIsbUJBQW9CO0VBQ3BEdEQsUUFBQUEsY0FBYyxFQUFFblosS0FBQSxDQUFLbFIsS0FBSyxDQUFDcXFCLGNBQWU7RUFDMUN4UyxRQUFBQSwwQkFBMEIsRUFBRTNHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEyQjtFQUNsRTBVLFFBQUFBLGtCQUFrQixFQUFFcmIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXNCLGtCQUFtQjtFQUNsRCtILFFBQUFBLFdBQVcsRUFBRXBqQixLQUFBLENBQUtsUixLQUFLLENBQUNzMEIsV0FBWTtFQUNwQ3ZYLFFBQUFBLGlCQUFpQixFQUFFN0wsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK2MsaUJBQWtCO0VBQ2hEcUcsUUFBQUEsa0JBQWtCLEVBQUVsUyxLQUFBLENBQUtsUixLQUFLLENBQUNvakIsa0JBQW1CO0VBQ2xESSxRQUFBQSxvQkFBb0IsRUFBRXRTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dqQixvQkFBcUI7RUFDdERzRixRQUFBQSxpQkFBaUIsRUFBRTVYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhvQixpQkFBa0I7RUFDaER4SyxRQUFBQSxlQUFlLEVBQUVwTixLQUFBLENBQUtsUixLQUFLLENBQUNzZSxlQUFnQjtFQUM1Q2tOLFFBQUFBLGlCQUFpQixFQUFFdGEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd3JCLGlCQUFrQjtFQUNoRHpDLFFBQUFBLGdCQUFnQixFQUFFN1gsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK29CLGdCQUFpQjtFQUM5Q0MsUUFBQUEsZ0JBQWdCLEVBQUU5WCxLQUFBLENBQUtsUixLQUFLLENBQUNncEIsZ0JBQWlCO0VBQzlDL1AsUUFBQUEsMEJBQTBCLEVBQUUvSCxLQUFBLENBQUtsUixLQUFLLENBQUNpWiwwQkFBMkI7RUFDbEU4WCxRQUFBQSxhQUFhLEVBQUU3ZixLQUFBLENBQUtsUixLQUFLLENBQUMrd0IsYUFBYztFQUN4Q3BNLFFBQUFBLG1CQUFtQixFQUFFelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFvQjtFQUNwRHhCLFFBQUFBLHVCQUF1QixFQUFFalMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWpCLHVCQUF3QjtFQUM1RG5ELFFBQUFBLDRCQUE0QixFQUFFOU8sS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ2dCLDRCQUE2QjtFQUN0RUQsUUFBQUEsNkJBQTZCLEVBQUU3TyxLQUFBLENBQUtsUixLQUFLLENBQUMrZiw2QkFBOEI7RUFDeEV1TSxRQUFBQSxjQUFjLEVBQUVwYixLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBZTtFQUMxQzFILFFBQUFBLHFCQUFxQixFQUFFMVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNGtCLHFCQUFzQjtFQUN4RHhNLFFBQUFBLGNBQWMsRUFBRWxILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ZLGNBQWU7RUFDMUM0akIsUUFBQUEsZ0JBQWdCLEVBQUU5cUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZzhCLGdCQUFpQjtFQUM5Q3RrQixRQUFBQSxlQUFlLEVBQUV4RyxLQUFBLENBQUtsUixLQUFLLENBQUNpZCxTQUFVO1VBQ3RDb1Qsa0JBQWtCLEVBQUVuZixLQUFBLENBQUsrcUIsWUFBYTtFQUN0Q2hnQixRQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtNLEtBQUssQ0FBQzZsQixPQUFRO0VBQ25DdE4sUUFBQUEsZUFBZSxFQUFFN1ksS0FBQSxDQUFLbFIsS0FBSyxDQUFDK3BCLGVBQWdCO1VBQzVDM0ksZUFBZSxFQUFFbFEsS0FBQSxDQUFLa1EsZUFBZ0I7RUFDdENqRSxRQUFBQSxlQUFlLEVBQUVqTSxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFnQjtFQUM1Q3dMLFFBQUFBLGFBQWEsRUFBRXpYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJvQixhQUFBQTtFQUFjLE9BQUEsRUFFdkN6WCxLQUFBLENBQUtsUixLQUFLLENBQUNvVCxRQUNHLENBQUMsQ0FBQTtPQUVyQixDQUFBLENBQUE7TUFBQS9CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFlBQU07RUFDM0IsTUFBQSxJQUFBeUgsWUFBQSxHQUErQnpILEtBQUEsQ0FBS2xSLEtBQUs7VUFBakMxQyxVQUFVLEdBQUFxYixZQUFBLENBQVZyYixVQUFVO1VBQUVDLE1BQU0sR0FBQW9iLFlBQUEsQ0FBTnBiLE1BQU0sQ0FBQTtFQUMxQixNQUFBLElBQU0yK0IsY0FBYyxHQUNsQmhyQixLQUFBLENBQUtsUixLQUFLLENBQUMrd0IsYUFBYSxJQUFJN2YsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXRCLGNBQWMsQ0FBQTtFQUN2RCxNQUFBLElBQU00TyxjQUFjLEdBQUdELGNBQWMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFBO0VBQ3hELE1BQUEsSUFBSWpMLGVBQWUsQ0FBQTtFQUVuQixNQUFBLElBQUkvZixLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFZLEVBQUU7VUFDM0JpWSxlQUFlLEdBQUEsdUJBQUEsQ0FBQXZ4QixNQUFBLENBQTJCQyxjQUFjLENBQ3REdVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLEVBQ3BCO0VBQ0V4QyxVQUFBQSxVQUFVLEVBQUU2K0IsY0FBYztFQUMxQjUrQixVQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0VBQ0YsU0FDRixDQUFDLEVBQUFtQyxJQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQ0N3UixLQUFBLENBQUtsUixLQUFLLENBQUNELE9BQU8sR0FDZCxZQUFZLEdBQ1pKLGNBQWMsQ0FBQ3VSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxFQUFFO0VBQ2pDekMsVUFBQUEsVUFBVSxFQUFFNitCLGNBQWM7RUFDMUI1K0IsVUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtXQUNELENBQUMsR0FDRixFQUFFLENBQ04sQ0FBQTtFQUNKLE9BQUMsTUFBTTtFQUNMLFFBQUEsSUFBSTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FuQixrQkFBa0IsRUFBRTtZQUNqQzRKLGVBQWUsR0FBQSxpQkFBQSxDQUFBdnhCLE1BQUEsQ0FBcUJDLGNBQWMsQ0FDaER1UixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEVBQ25CO0VBQUU1YSxZQUFBQSxVQUFVLEVBQVZBLFVBQVU7RUFBRUMsWUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtFQUFPLFdBQ3ZCLENBQUMsQ0FBRSxDQUFBO0VBQ0wsU0FBQyxNQUFNLElBQUkyVCxLQUFBLENBQUtsUixLQUFLLENBQUNzc0IsY0FBYyxFQUFFO1lBQ3BDMkUsZUFBZSxHQUFBLGlCQUFBLENBQUF2eEIsTUFBQSxDQUFxQkMsY0FBYyxDQUNoRHVSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkI7RUFBRTVhLFlBQUFBLFVBQVUsRUFBRSxNQUFNO0VBQUVDLFlBQUFBLE1BQU0sRUFBTkEsTUFBQUE7RUFBTyxXQUMvQixDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUMsTUFBTSxJQUFJMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLG1CQUFtQixFQUFFO1lBQ3pDc00sZUFBZSxHQUFBLGtCQUFBLENBQUF2eEIsTUFBQSxDQUFzQkMsY0FBYyxDQUNqRHVSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkI7RUFBRTVhLFlBQUFBLFVBQVUsRUFBRSxXQUFXO0VBQUVDLFlBQUFBLE1BQU0sRUFBTkEsTUFBQUE7RUFBTyxXQUNwQyxDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUMsTUFBTSxJQUFJMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNGtCLHFCQUFxQixFQUFFO1lBQzNDcU0sZUFBZSxHQUFBLG9CQUFBLENBQUF2eEIsTUFBQSxDQUF3QkMsY0FBYyxDQUNuRHVSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkI7RUFDRTVhLFlBQUFBLFVBQVUsRUFBRSxXQUFXO0VBQ3ZCQyxZQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0VBQ0YsV0FDRixDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUMsTUFBTTtZQUNMMHpCLGVBQWUsR0FBQSxpQkFBQSxDQUFBdnhCLE1BQUEsQ0FBcUJDLGNBQWMsQ0FDaER1UixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEVBQ25CO0VBQ0U1YSxZQUFBQSxVQUFVLEVBQUU2K0IsY0FBYztFQUMxQjUrQixZQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0VBQ0YsV0FDRixDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUE7RUFDRixPQUFBO1FBRUEsb0JBQ0VtVSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQ0U0TCxRQUFBQSxJQUFJLEVBQUMsT0FBTztFQUNaLFFBQUEsV0FBQSxFQUFVLFFBQVE7RUFDbEJqUSxRQUFBQSxTQUFTLEVBQUMsNkJBQUE7RUFBNkIsT0FBQSxFQUV0QzJqQixlQUNHLENBQUMsQ0FBQTtPQUVWLENBQUEsQ0FBQTtNQUFBNWYsZUFBQSxDQUFBSCxLQUFBLEVBQUEsaUJBQUEsRUFFaUIsWUFBTTtFQUFBLE1BQUEsSUFBQWtyQixtQkFBQSxDQUFBO1FBQ3RCLElBQU05dUIsU0FBUyxHQUFHeUcsU0FBSSxDQUFDN0MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc04sU0FBUyxFQUFBK0QsZUFBQSxDQUN4Q29sQixFQUFBQSxFQUFBQSx1QkFBdUIsRUFBR3ZsQixLQUFBLENBQUtNLEtBQUssQ0FBQ29qQixJQUFJLENBQzNDLENBQUMsQ0FBQTtRQUVGLElBQU15SCxXQUFXLEdBQUduckIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcThCLFdBQVcsaUJBQUkzcUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUFPc1ksUUFBQUEsSUFBSSxFQUFDLE1BQUE7RUFBTSxPQUFFLENBQUMsQ0FBQTtRQUNuRSxJQUFNcVMsY0FBYyxHQUFHcHJCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3M4QixjQUFjLElBQUksS0FBSyxDQUFBO0VBQ3pELE1BQUEsSUFBTXRFLFVBQVUsR0FDZCxPQUFPOW1CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2xELEtBQUssS0FBSyxRQUFRLEdBQ2hDb1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbEQsS0FBSyxHQUNoQixPQUFPb1UsS0FBQSxDQUFLTSxLQUFLLENBQUN3bUIsVUFBVSxLQUFLLFFBQVEsR0FDdkM5bUIsS0FBQSxDQUFLTSxLQUFLLENBQUN3bUIsVUFBVSxHQUNyQjltQixLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFZLEdBQ3JCblosbUJBQW1CLENBQ2pCcVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLEVBQ3BCb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFPLEVBQ2xCbVIsS0FBQSxDQUFLbFIsS0FDUCxDQUFDLEdBQ0RrUixLQUFBLENBQUtsUixLQUFLLENBQUMrWCxlQUFlLEdBQ3hCNVgsdUJBQXVCLENBQUMrUSxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFhLEVBQUU5RyxLQUFBLENBQUtsUixLQUFLLENBQUMsR0FDN0RMLGNBQWMsQ0FBQ3VSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFBRWhILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBRTNELE1BQUEsb0JBQU8wUixzQkFBSyxDQUFDc1ksWUFBWSxDQUFDcVMsV0FBVyxHQUFBRCxtQkFBQSxHQUFBL3FCLEVBQUFBLEVBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQStxQixtQkFBQSxFQUNsQ0UsY0FBYyxFQUFHLFVBQUM5RSxLQUFLLEVBQUs7VUFDM0J0bUIsS0FBQSxDQUFLc21CLEtBQUssR0FBR0EsS0FBSyxDQUFBO0VBQ3BCLE9BQUMsWUFDTVEsVUFBVSxDQUFBLEVBQUEsUUFBQSxFQUNUOW1CLEtBQUEsQ0FBS3FyQixVQUFVLENBQ2JyckIsRUFBQUEsVUFBQUEsRUFBQUEsS0FBQSxDQUFLc3JCLFlBQVksY0FDbEJ0ckIsS0FBQSxDQUFLK29CLFlBQVksQ0FBQSxFQUFBLFNBQUEsRUFDakIvb0IsS0FBQSxDQUFLdXJCLFdBQVcsQ0FDZHZyQixFQUFBQSxXQUFBQSxFQUFBQSxLQUFBLENBQUt3ckIsY0FBYyxDQUFBLEVBQUEsSUFBQSxFQUMxQnhyQixLQUFBLENBQUtsUixLQUFLLENBQUMyOEIsRUFBRSxDQUNYenJCLEVBQUFBLE1BQUFBLEVBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21xQixJQUFJLENBQ2ZqWixFQUFBQSxNQUFBQSxFQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM0OEIsSUFBSSxDQUFBLEVBQUF2ckIsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBK3FCLG1CQUFBLGVBQ1ZsckIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNjhCLFNBQVMsQ0FDbEIzckIsRUFBQUEsYUFBQUEsRUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDODhCLGVBQWUsQ0FBQSxFQUFBLFVBQUEsRUFDN0I1ckIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXpCLFFBQVEsQ0FBQSxFQUFBLGNBQUEsRUFDZnJpQixLQUFBLENBQUtsUixLQUFLLENBQUMrOEIsWUFBWSxDQUMxQmhwQixFQUFBQSxXQUFBQSxFQUFBQSxTQUFJLENBQUNzb0IsV0FBVyxDQUFDcjhCLEtBQUssQ0FBQ3NOLFNBQVMsRUFBRUEsU0FBUyxDQUFDLENBQUEsRUFBQSxPQUFBLEVBQ2hENEQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd2QsS0FBSyxlQUNidE0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDaTRCLFFBQVEsQ0FDbkIvbUIsRUFBQUEsVUFBQUEsRUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3FCLFFBQVEsQ0FBQSxFQUFBLFVBQUEsRUFDbkJsWixLQUFBLENBQUtsUixLQUFLLENBQUMwYixRQUFRLENBQUEsRUFDN0Isa0JBQWtCLEVBQUV4SyxLQUFBLENBQUtsUixLQUFLLENBQUNnOUIsZUFBZSxHQUFBM3JCLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUErcUIsbUJBQUEsRUFDOUMsY0FBYyxFQUFFbHJCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2k5QixXQUFXLEdBQ3RDLGlCQUFpQixFQUFFL3JCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2s5QixjQUFjLENBQzVDLEVBQUEsZUFBZSxFQUFFaHNCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ205QixZQUFZLEdBQ3hDLENBQUE7T0FDSCxDQUFBLENBQUE7TUFBQTlyQixlQUFBLENBQUFILEtBQUEsRUFBQSxtQkFBQSxFQUVtQixZQUFNO0VBQ3hCLE1BQUEsSUFBQTJILFlBQUEsR0FVSTNILEtBQUEsQ0FBS2xSLEtBQUs7VUFUWm85QixXQUFXLEdBQUF2a0IsWUFBQSxDQUFYdWtCLFdBQVc7VUFDWDdKLFFBQVEsR0FBQTFhLFlBQUEsQ0FBUjBhLFFBQVE7VUFDUnJiLFFBQVEsR0FBQVcsWUFBQSxDQUFSWCxRQUFRO1VBQ1JwWSxTQUFTLEdBQUErWSxZQUFBLENBQVQvWSxTQUFTO1VBQ1RDLE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU87VUFDUHM5QixnQkFBZ0IsR0FBQXhrQixZQUFBLENBQWhCd2tCLGdCQUFnQjtVQUFBQyxxQkFBQSxHQUFBemtCLFlBQUEsQ0FDaEIwa0Isb0JBQW9CO0VBQXBCQSxRQUFBQSxvQkFBb0IsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxFQUFFLEdBQUFBLHFCQUFBO1VBQUFFLHFCQUFBLEdBQUEza0IsWUFBQSxDQUN6QjRrQixjQUFjO0VBQWRBLFFBQUFBLGNBQWMsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxPQUFPLEdBQUFBLHFCQUFBO1VBQ3hCeGxCLGFBQWEsR0FBQWEsWUFBQSxDQUFiYixhQUFhLENBQUE7UUFFZixJQUNFb2xCLFdBQVcsS0FDVmxsQixRQUFRLElBQUksSUFBSSxJQUNmcFksU0FBUyxJQUFJLElBQUksSUFDakJDLE9BQU8sSUFBSSxJQUFJLElBQ2ZpWSxhQUFhLEtBQWJBLElBQUFBLElBQUFBLGFBQWEsZUFBYkEsYUFBYSxDQUFFaFosTUFBTSxDQUFDLEVBQ3hCO1VBQ0Esb0JBQ0UwUyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VzWSxVQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiM2MsVUFBQUEsU0FBUyxFQUFFeUcsU0FBSSxDQUNiLDhCQUE4QixFQUM5QndwQixvQkFBb0IsRUFDcEI7RUFBRSxZQUFBLHdDQUF3QyxFQUFFaEssUUFBQUE7RUFBUyxXQUN2RCxDQUFFO0VBQ0ZBLFVBQUFBLFFBQVEsRUFBRUEsUUFBUztFQUNuQixVQUFBLFlBQUEsRUFBWWtLLGNBQWU7WUFDM0I3ckIsT0FBTyxFQUFFVixLQUFBLENBQUttcUIsWUFBYTtFQUMzQjdkLFVBQUFBLEtBQUssRUFBRTZmLGdCQUFpQjtFQUN4QjNoQixVQUFBQSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0VBQUUsU0FDZCxDQUFDLENBQUE7RUFFTixPQUFDLE1BQU07RUFDTCxRQUFBLE9BQU8sSUFBSSxDQUFBO0VBQ2IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQXQrQkN4SyxJQUFBQSxLQUFBLENBQUtNLEtBQUssR0FBR04sS0FBQSxDQUFLMG1CLGdCQUFnQixFQUFFLENBQUE7TUFDcEMxbUIsS0FBQSxDQUFLb21CLG1CQUFtQixHQUFHLElBQUksQ0FBQTtFQUFDLElBQUEsT0FBQXBtQixLQUFBLENBQUE7RUFDbEMsR0FBQTtJQUFDNEIsU0FBQSxDQUFBK2pCLFVBQUEsRUFBQTVsQixnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBOGpCLFVBQUEsRUFBQSxDQUFBO01BQUFocUIsR0FBQSxFQUFBLG1CQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQWtXLGlCQUFBQSxHQUFvQjtRQUNsQm5QLE1BQU0sQ0FBQzY1QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDeEQsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBOXdCLEdBQUEsRUFBQSxvQkFBQTtFQUFBL1AsSUFBQUEsS0FBQSxFQUVELFNBQUE2Z0Isa0JBQUFBLENBQW1CN0IsU0FBUyxFQUFFOGhCLFNBQVMsRUFBRTtFQUN2QyxNQUFBLElBQ0U5aEIsU0FBUyxDQUFDTyxNQUFNLElBQ2hCc2Esc0JBQXNCLENBQUM3YSxTQUFTLENBQUM1RCxRQUFRLEVBQUUsSUFBSSxDQUFDbFksS0FBSyxDQUFDa1ksUUFBUSxDQUFDLEVBQy9EO1VBQ0EsSUFBSSxDQUFDa0osZUFBZSxDQUFDLElBQUksQ0FBQ3BoQixLQUFLLENBQUNrWSxRQUFRLENBQUMsQ0FBQTtFQUMzQyxPQUFBO0VBQ0EsTUFBQSxJQUNFLElBQUksQ0FBQzFHLEtBQUssQ0FBQytaLGVBQWUsS0FBS3RtQixTQUFTLElBQ3hDNlcsU0FBUyxDQUFDZ1UsV0FBVyxLQUFLLElBQUksQ0FBQzl2QixLQUFLLENBQUM4dkIsV0FBVyxFQUNoRDtVQUNBLElBQUksQ0FBQ3RkLFFBQVEsQ0FBQztFQUFFK1ksVUFBQUEsZUFBZSxFQUFFLENBQUE7RUFBRSxTQUFDLENBQUMsQ0FBQTtFQUN2QyxPQUFBO1FBQ0EsSUFBSXpQLFNBQVMsQ0FBQ3pQLGNBQWMsS0FBSyxJQUFJLENBQUNyTSxLQUFLLENBQUNxTSxjQUFjLEVBQUU7VUFDMUQsSUFBSSxDQUFDbUcsUUFBUSxDQUFDO0VBQ1puRyxVQUFBQSxjQUFjLEVBQUVELG9CQUFvQixDQUFDLElBQUksQ0FBQ3BNLEtBQUssQ0FBQ3FNLGNBQWMsQ0FBQTtFQUNoRSxTQUFDLENBQUMsQ0FBQTtFQUNKLE9BQUE7RUFDQSxNQUFBLElBQ0UsQ0FBQ3V4QixTQUFTLENBQUN2RyxPQUFPLElBQ2xCLENBQUNyMEIsT0FBTyxDQUFDOFksU0FBUyxDQUFDNUQsUUFBUSxFQUFFLElBQUksQ0FBQ2xZLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxFQUNqRDtVQUNBLElBQUksQ0FBQzFGLFFBQVEsQ0FBQztFQUFFd2xCLFVBQUFBLFVBQVUsRUFBRSxJQUFBO0VBQUssU0FBQyxDQUFDLENBQUE7RUFDckMsT0FBQTtRQUVBLElBQUk0RixTQUFTLENBQUNoSixJQUFJLEtBQUssSUFBSSxDQUFDcGpCLEtBQUssQ0FBQ29qQixJQUFJLEVBQUU7RUFDdEMsUUFBQSxJQUFJZ0osU0FBUyxDQUFDaEosSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUNwakIsS0FBSyxDQUFDb2pCLElBQUksS0FBSyxJQUFJLEVBQUU7RUFDeEQsVUFBQSxJQUFJLENBQUM1MEIsS0FBSyxDQUFDNjlCLGNBQWMsRUFBRSxDQUFBO0VBQzdCLFNBQUE7RUFFQSxRQUFBLElBQUlELFNBQVMsQ0FBQ2hKLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDcGpCLEtBQUssQ0FBQ29qQixJQUFJLEtBQUssS0FBSyxFQUFFO0VBQ3hELFVBQUEsSUFBSSxDQUFDNTBCLEtBQUssQ0FBQzg5QixlQUFlLEVBQUUsQ0FBQTtFQUM5QixTQUFBO0VBQ0YsT0FBQTtFQUNGLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQWp4QixHQUFBLEVBQUEsc0JBQUE7TUFBQS9QLEtBQUEsRUFFRCxTQUFBazJCLG9CQUFBQSxHQUF1QjtRQUNyQixJQUFJLENBQUNtRix3QkFBd0IsRUFBRSxDQUFBO1FBQy9CdDBCLE1BQU0sQ0FBQ2s2QixtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDSixRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDM0QsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBOXdCLEdBQUEsRUFBQSxzQkFBQTtNQUFBL1AsS0FBQSxFQXk3QkQsU0FBQWtoQyxvQkFBQUEsR0FBdUI7RUFDckIsTUFBQSxJQUFBM2tCLFlBQUEsR0FDRSxJQUFJLENBQUNyWixLQUFLO1VBREppK0IsUUFBUSxHQUFBNWtCLFlBQUEsQ0FBUjRrQixRQUFRO1VBQUUvTCxJQUFJLEdBQUE3WSxZQUFBLENBQUo2WSxJQUFJO1VBQUVnTSxxQkFBcUIsR0FBQTdrQixZQUFBLENBQXJCNmtCLHFCQUFxQjtVQUFFQyx5QkFBeUIsR0FBQTlrQixZQUFBLENBQXpCOGtCLHlCQUF5QixDQUFBO0VBRXhFLE1BQUEsSUFBUXZKLElBQUksR0FBSyxJQUFJLENBQUNwakIsS0FBSyxDQUFuQm9qQixJQUFJLENBQUE7UUFFWixvQkFDRWxqQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLHNDQUFBNU4sTUFBQSxDQUNQdStCLFFBQVEsR0FBRyx1Q0FBdUMsR0FBRyxFQUFFLENBQUE7U0FHeERBLEVBQUFBLFFBQVEsaUJBQ1B2c0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDc2dCLGNBQVksRUFBQTFCLFFBQUEsQ0FBQTtFQUNYMkIsUUFBQUEsSUFBSSxFQUFFQSxJQUFLO1VBQ1g1a0IsU0FBUyxFQUFBLEVBQUEsQ0FBQTVOLE1BQUEsQ0FBS3crQixxQkFBcUIsT0FBQXgrQixNQUFBLENBQ2pDazFCLElBQUksSUFBSSx3Q0FBd0MsQ0FBQTtFQUMvQyxPQUFBLEVBQ0V1Six5QkFBeUIsR0FDMUI7VUFDRXZzQixPQUFPLEVBQUUsSUFBSSxDQUFDd3NCLGNBQUFBO0VBQ2hCLE9BQUMsR0FDRCxJQUFJLENBQ1QsQ0FDRixFQUNBLElBQUksQ0FBQzVzQixLQUFLLENBQUNtYSx1QkFBdUIsSUFBSSxJQUFJLENBQUM4RixvQkFBb0IsRUFBRSxFQUNqRSxJQUFJLENBQUM0TSxlQUFlLEVBQUUsRUFDdEIsSUFBSSxDQUFDQyxpQkFBaUIsRUFDcEIsQ0FBQyxDQUFBO0VBRVYsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBenhCLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQU11bUIsUUFBUSxHQUFHLElBQUksQ0FBQ21FLGNBQWMsRUFBRSxDQUFBO0VBRXRDLE1BQUEsSUFBSSxJQUFJLENBQUN2K0IsS0FBSyxDQUFDcWMsTUFBTSxFQUFFLE9BQU8rZCxRQUFRLENBQUE7RUFFdEMsTUFBQSxJQUFJLElBQUksQ0FBQ3A2QixLQUFLLENBQUM0d0IsVUFBVSxFQUFFO0VBQ3pCLFFBQUEsSUFBSTROLGVBQWUsR0FBRyxJQUFJLENBQUNodEIsS0FBSyxDQUFDb2pCLElBQUksZ0JBQ25DbGpCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzZoQixPQUFPLEVBQUE7RUFBQ08sVUFBQUEsYUFBYSxFQUFFLElBQUksQ0FBQy96QixLQUFLLENBQUMrekIsYUFBQUE7V0FDakNyaUIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsVUFBQUEsU0FBUyxFQUFDLDBCQUEwQjtZQUNwQ29PLFFBQVEsRUFBRSxDQUFDLENBQUU7WUFDYnVCLFNBQVMsRUFBRSxJQUFJLENBQUN3aEIsZUFBQUE7RUFBZ0IsU0FBQSxFQUUvQnJFLFFBQ0UsQ0FDRSxDQUFDLEdBQ1IsSUFBSSxDQUFBO1VBRVIsSUFBSSxJQUFJLENBQUM1b0IsS0FBSyxDQUFDb2pCLElBQUksSUFBSSxJQUFJLENBQUM1MEIsS0FBSyxDQUFDNnlCLFFBQVEsRUFBRTtFQUMxQzJMLFVBQUFBLGVBQWUsZ0JBQ2I5c0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNmdCLE1BQU0sRUFBQTtFQUNMSyxZQUFBQSxRQUFRLEVBQUUsSUFBSSxDQUFDN3lCLEtBQUssQ0FBQzZ5QixRQUFTO0VBQzlCRixZQUFBQSxVQUFVLEVBQUUsSUFBSSxDQUFDM3lCLEtBQUssQ0FBQzJ5QixVQUFBQTtFQUFXLFdBQUEsRUFFakM2TCxlQUNLLENBQ1QsQ0FBQTtFQUNILFNBQUE7VUFFQSxvQkFDRTlzQixzQkFBQSxDQUFBQyxhQUFBLENBQ0csS0FBQSxFQUFBLElBQUEsRUFBQSxJQUFJLENBQUNxc0Isb0JBQW9CLEVBQUUsRUFDM0JRLGVBQ0UsQ0FBQyxDQUFBO0VBRVYsT0FBQTtFQUVBLE1BQUEsb0JBQ0U5c0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMGpCLGlCQUFlLEVBQUE7RUFDZC9uQixRQUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDdE4sS0FBSyxDQUFDMCtCLGVBQWdCO0VBQ3RDcEosUUFBQUEsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDdDFCLEtBQUssQ0FBQ3MxQixnQkFBaUI7RUFDOUNmLFFBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQ2lILGNBQWMsRUFBRztFQUNuQzNJLFFBQUFBLFFBQVEsRUFBRSxJQUFJLENBQUM3eUIsS0FBSyxDQUFDNnlCLFFBQVM7RUFDOUJGLFFBQUFBLFVBQVUsRUFBRSxJQUFJLENBQUMzeUIsS0FBSyxDQUFDMnlCLFVBQVc7RUFDbEMwQixRQUFBQSxlQUFlLEVBQUUsSUFBSSxDQUFDcjBCLEtBQUssQ0FBQ3EwQixlQUFnQjtFQUM1Q21CLFFBQUFBLGVBQWUsRUFBRSxJQUFJLENBQUN3SSxvQkFBb0IsRUFBRztFQUM3QzNILFFBQUFBLGVBQWUsRUFBRSxJQUFJLENBQUNyMkIsS0FBSyxDQUFDcTJCLGVBQWdCO0VBQzVDZCxRQUFBQSxlQUFlLEVBQUU2RSxRQUFTO0VBQzFCcEYsUUFBQUEsZUFBZSxFQUFFLElBQUksQ0FBQ2gxQixLQUFLLENBQUNnMUIsZUFBZ0I7RUFDNUNWLFFBQUFBLFdBQVcsRUFBRSxJQUFJLENBQUN0MEIsS0FBSyxDQUFDczBCLFdBQVk7VUFDcENtQixlQUFlLEVBQUUsSUFBSSxDQUFDa0osZUFBZ0I7RUFDdEM1SyxRQUFBQSxhQUFhLEVBQUUsSUFBSSxDQUFDL3pCLEtBQUssQ0FBQyt6QixhQUFjO0VBQ3hDMkIsUUFBQUEsU0FBUyxFQUFFLElBQUksQ0FBQzExQixLQUFLLENBQUM0K0IsZUFBQUE7RUFBZ0IsT0FDdkMsQ0FBQyxDQUFBO0VBRU4sS0FBQTtFQUFDLEdBQUEsQ0FBQSxFQUFBLENBQUE7TUFBQS94QixHQUFBLEVBQUEsY0FBQTtNQUFBRSxHQUFBLEVBM3pDRCxTQUFBQSxHQUFBQSxHQUEwQjtRQUN4QixPQUFPO0VBQ0xvc0IsUUFBQUEsWUFBWSxFQUFFLEtBQUs7RUFDbkI3N0IsUUFBQUEsVUFBVSxFQUFFLFlBQVk7RUFDeEJvK0IsUUFBQUEsa0JBQWtCLEVBQUUsV0FBVztFQUMvQjdwQixRQUFBQSxRQUFRLEVBQUFBLFNBQUFBLFFBQUFBLEdBQUcsRUFBRTtFQUNiMGhCLFFBQUFBLFFBQVEsRUFBRSxLQUFLO0VBQ2YxYixRQUFBQSwwQkFBMEIsRUFBRSxLQUFLO0VBQ2pDbkMsUUFBQUEsWUFBWSxFQUFFLFFBQVE7RUFDdEJnWixRQUFBQSxPQUFPLEVBQUFBLFNBQUFBLE9BQUFBLEdBQUcsRUFBRTtFQUNaNkosUUFBQUEsTUFBTSxFQUFBQSxTQUFBQSxNQUFBQSxHQUFHLEVBQUU7RUFDWHRiLFFBQUFBLFNBQVMsRUFBQUEsU0FBQUEsU0FBQUEsR0FBRyxFQUFFO0VBQ2RnZCxRQUFBQSxZQUFZLEVBQUFBLFNBQUFBLFlBQUFBLEdBQUcsRUFBRTtFQUNqQjFrQixRQUFBQSxRQUFRLEVBQUFBLFNBQUFBLFFBQUFBLEdBQUcsRUFBRTtFQUNibkIsUUFBQUEsY0FBYyxFQUFBQSxTQUFBQSxjQUFBQSxHQUFHLEVBQUU7RUFDbkJ5WCxRQUFBQSxhQUFhLEVBQUFBLFNBQUFBLGFBQUFBLEdBQUcsRUFBRTtFQUNsQmdTLFFBQUFBLGNBQWMsRUFBQUEsU0FBQUEsY0FBQUEsR0FBRyxFQUFFO0VBQ25CQyxRQUFBQSxlQUFlLEVBQUFBLFNBQUFBLGVBQUFBLEdBQUcsRUFBRTtFQUNwQjVGLFFBQUFBLGtCQUFrQixFQUFFLEtBQUs7RUFDekJ4TSxRQUFBQSxZQUFZLEVBQUFBLFNBQUFBLFlBQUFBLEdBQUcsRUFBRTtFQUNqQmdQLFFBQUFBLFlBQVksRUFBQUEsU0FBQUEsWUFBQUEsR0FBRyxFQUFFO0VBQ2pCNUssUUFBQUEsV0FBVyxFQUFFLENBQUM7RUFDZG1JLFFBQUFBLFFBQVEsRUFBRSxLQUFLO0VBQ2ZySCxRQUFBQSxVQUFVLEVBQUUsS0FBSztFQUNqQjNYLFFBQUFBLDBCQUEwQixFQUFFLEtBQUs7RUFDakN3RixRQUFBQSxtQkFBbUIsRUFBRSxJQUFJO0VBQ3pCOE8sUUFBQUEsY0FBYyxFQUFFLEtBQUs7RUFDckJ3RCxRQUFBQSxhQUFhLEVBQUUsS0FBSztFQUNwQmxCLFFBQUFBLGtCQUFrQixFQUFFLEtBQUs7RUFDekJsTCxRQUFBQSxtQkFBbUIsRUFBRSxLQUFLO0VBQzFCeEIsUUFBQUEsdUJBQXVCLEVBQUUsS0FBSztFQUM5Qm5ELFFBQUFBLDRCQUE0QixFQUFFLEtBQUs7RUFDbkNELFFBQUFBLDZCQUE2QixFQUFFLEtBQUs7RUFDcEN1TSxRQUFBQSxjQUFjLEVBQUUsS0FBSztFQUNyQjFILFFBQUFBLHFCQUFxQixFQUFFLEtBQUs7RUFDNUJ4TSxRQUFBQSxjQUFjLEVBQUUsS0FBSztFQUNyQjVhLFFBQUFBLGFBQWEsRUFBRSxLQUFLO0VBQ3BCeTdCLFFBQUFBLFNBQVMsRUFBRSxLQUFLO0VBQ2hCdEksUUFBQUEsYUFBYSxFQUFFLEVBQUU7RUFDakJySixRQUFBQSxXQUFXLEVBQUUsTUFBTTtFQUNuQjZGLFFBQUFBLHNCQUFzQixFQUFFLGdCQUFnQjtFQUN4Q0gsUUFBQUEsd0JBQXdCLEVBQUUsZ0JBQWdCO0VBQzFDYSxRQUFBQSxrQkFBa0IsRUFBRSxZQUFZO0VBQ2hDSCxRQUFBQSxvQkFBb0IsRUFBRSxZQUFZO0VBQ2xDTCxRQUFBQSxxQkFBcUIsRUFBRSxlQUFlO0VBQ3RDSixRQUFBQSx1QkFBdUIsRUFBRSxlQUFlO0VBQ3hDYyxRQUFBQSxpQkFBaUIsRUFBRSxXQUFXO0VBQzlCSixRQUFBQSxtQkFBbUIsRUFBRSxXQUFXO0VBQ2hDdEQsUUFBQUEsY0FBYyxFQUFFLE1BQU07RUFDdEIwSixRQUFBQSxhQUFhLEVBQUUsSUFBSTtFQUNuQmpwQixRQUFBQSxjQUFjLEVBQUVuTyx3QkFBd0I7RUFDeEN5OEIsUUFBQUEsa0JBQWtCLEVBQUUsS0FBSztFQUN6QndGLFFBQUFBLGVBQWUsRUFBRSxJQUFJO0VBQ3JCNUMsUUFBQUEsZ0JBQWdCLEVBQUUsSUFBSTtFQUN0QmpTLFFBQUFBLGVBQWUsRUFBRSxJQUFJO0VBQ3JCcm9CLFFBQUFBLGdCQUFnQixFQUFFdUQsU0FBUztFQUMzQms1QixRQUFBQSx5QkFBeUIsRUFBRSxLQUFLO0VBQ2hDaGhCLFFBQUFBLGVBQWUsRUFBRSxLQUFBO1NBQ2xCLENBQUE7RUFDSCxLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBNURxQ3pMLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLEVBQUE7RUErekN2RCxJQUFNeWtCLDBCQUEwQixHQUFHLE9BQU8sQ0FBQTtFQUMxQyxJQUFNYiw2QkFBNkIsR0FBRyxVQUFVOzs7Ozs7Ozs7Ozs7OzsifQ==
