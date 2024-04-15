/*!
  react-datepicker v6.8.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGVfdXRpbHMuanMiLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9kYXkuanN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLmpzeCIsIi4uL3NyYy93ZWVrLmpzeCIsIi4uL3NyYy9tb250aC5qc3giLCIuLi9zcmMvdGltZS5qc3giLCIuLi9zcmMveWVhci5qc3giLCIuLi9zcmMvaW5wdXRUaW1lLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIuanN4IiwiLi4vc3JjL2NhbGVuZGFyLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLmpzeCIsIi4uL3NyYy9wb3J0YWwuanN4IiwiLi4vc3JjL3RhYl9sb29wLmpzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLmpzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LmpzeCIsIi4uL3NyYy9pbmRleC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSBcImRhdGUtZm5zL2lzRGF0ZVwiO1xuaW1wb3J0IHsgaXNWYWxpZCBhcyBpc1ZhbGlkRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGxvbmdGb3JtYXR0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2Zvcm1hdFwiO1xuaW1wb3J0IHsgYWRkTWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9hZGRNaW51dGVzXCI7XG5pbXBvcnQgeyBhZGRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9hZGRIb3Vyc1wiO1xuaW1wb3J0IHsgYWRkRGF5cyB9IGZyb20gXCJkYXRlLWZucy9hZGREYXlzXCI7XG5pbXBvcnQgeyBhZGRXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9hZGRXZWVrc1wiO1xuaW1wb3J0IHsgYWRkTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2FkZE1vbnRoc1wiO1xuaW1wb3J0IHsgYWRkUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkUXVhcnRlcnNcIjtcbmltcG9ydCB7IGFkZFllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFllYXJzXCI7XG5pbXBvcnQgeyBzdWJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL3N1YkRheXNcIjtcbmltcG9ydCB7IHN1YldlZWtzIH0gZnJvbSBcImRhdGUtZm5zL3N1YldlZWtzXCI7XG5pbXBvcnQgeyBzdWJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViTW9udGhzXCI7XG5pbXBvcnQgeyBzdWJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9zdWJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3ViWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViWWVhcnNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0U2Vjb25kc1wiO1xuaW1wb3J0IHsgZ2V0TWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9nZXRNaW51dGVzXCI7XG5pbXBvcnQgeyBnZXRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9nZXRIb3Vyc1wiO1xuaW1wb3J0IHsgZ2V0RGF5IH0gZnJvbSBcImRhdGUtZm5zL2dldERheVwiO1xuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXRlXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrIH0gZnJvbSBcImRhdGUtZm5zL2dldElTT1dlZWtcIjtcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2dldE1vbnRoXCI7XG5pbXBvcnQgeyBnZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2dldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0WWVhclwiO1xuaW1wb3J0IHsgZ2V0VGltZSB9IGZyb20gXCJkYXRlLWZucy9nZXRUaW1lXCI7XG5pbXBvcnQgeyBzZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL3NldFNlY29uZHNcIjtcbmltcG9ydCB7IHNldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0TWludXRlc1wiO1xuaW1wb3J0IHsgc2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0SG91cnNcIjtcbmltcG9ydCB7IHNldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3NldE1vbnRoXCI7XG5pbXBvcnQgeyBzZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3NldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IHNldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0WWVhclwiO1xuaW1wb3J0IHsgbWluIH0gZnJvbSBcImRhdGUtZm5zL21pblwiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcImRhdGUtZm5zL21heFwiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFyc1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZEYXlcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZXZWVrXCI7XG5pbXBvcnQgeyBzdGFydE9mTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZk1vbnRoXCI7XG5pbXBvcnQgeyBzdGFydE9mUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mUXVhcnRlclwiO1xuaW1wb3J0IHsgc3RhcnRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlllYXJcIjtcbmltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZldlZWsgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZXZWVrXCI7XG5pbXBvcnQgeyBlbmRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mTW9udGhcIjtcbmltcG9ydCB7IGVuZE9mWWVhciB9IGZyb20gXCJkYXRlLWZucy9lbmRPZlllYXJcIjtcbmltcG9ydCB7IGlzRXF1YWwgYXMgZGZJc0VxdWFsIH0gZnJvbSBcImRhdGUtZm5zL2lzRXF1YWxcIjtcbmltcG9ydCB7IGlzU2FtZURheSBhcyBkZklzU2FtZURheSB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVEYXlcIjtcbmltcG9ydCB7IGlzU2FtZU1vbnRoIGFzIGRmSXNTYW1lTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lTW9udGhcIjtcbmltcG9ydCB7IGlzU2FtZVllYXIgYXMgZGZJc1NhbWVZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVllYXJcIjtcbmltcG9ydCB7IGlzU2FtZVF1YXJ0ZXIgYXMgZGZJc1NhbWVRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVF1YXJ0ZXJcIjtcbmltcG9ydCB7IGlzQWZ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNBZnRlclwiO1xuaW1wb3J0IHsgaXNCZWZvcmUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNCZWZvcmVcIjtcbmltcG9ydCB7IGlzV2l0aGluSW50ZXJ2YWwgfSBmcm9tIFwiZGF0ZS1mbnMvaXNXaXRoaW5JbnRlcnZhbFwiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcImRhdGUtZm5zL3RvRGF0ZVwiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZGF0ZS1mbnMvcGFyc2VcIjtcbmltcG9ydCB7IHBhcnNlSVNPIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlSVNPXCI7XG5pbXBvcnQgeyBhZGRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgPSAxMjtcblxuLy8gVGhpcyBSZWdFeHAgY2F0Y2hlcyBzeW1ib2xzIGVzY2FwZWQgYnkgcXVvdGVzLCBhbmQgYWxzb1xuLy8gc2VxdWVuY2VzIG9mIHN5bWJvbHMgUCwgcCwgYW5kIHRoZSBjb21iaW5hdGlvbnMgbGlrZSBgUFBQUFBQUHBwcHBwYFxuY29uc3QgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcblxuLy8gKiogRGF0ZSBDb25zdHJ1Y3RvcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0RhdGUodmFsdWUpIHtcbiAgY29uc3QgZCA9IHZhbHVlXG4gICAgPyB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmdcbiAgICAgID8gcGFyc2VJU08odmFsdWUpXG4gICAgICA6IHRvRGF0ZSh2YWx1ZSlcbiAgICA6IG5ldyBEYXRlKCk7XG4gIHJldHVybiBpc1ZhbGlkKGQpID8gZCA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGUodmFsdWUsIGRhdGVGb3JtYXQsIGxvY2FsZSwgc3RyaWN0UGFyc2luZywgbWluRGF0ZSkge1xuICBsZXQgcGFyc2VkRGF0ZSA9IG51bGw7XG4gIGxldCBsb2NhbGVPYmplY3QgPVxuICAgIGdldExvY2FsZU9iamVjdChsb2NhbGUpIHx8IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICBsZXQgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPSB0cnVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSkge1xuICAgIGRhdGVGb3JtYXQuZm9yRWFjaCgoZGYpID0+IHtcbiAgICAgIGxldCB0cnlQYXJzZURhdGUgPSBwYXJzZSh2YWx1ZSwgZGYsIG5ldyBEYXRlKCksIHtcbiAgICAgICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICAgICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgICAgIGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJlxuICAgICAgICAgIHZhbHVlID09PSBmb3JtYXREYXRlKHRyeVBhcnNlRGF0ZSwgZGYsIGxvY2FsZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNWYWxpZCh0cnlQYXJzZURhdGUsIG1pbkRhdGUpICYmIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoKSB7XG4gICAgICAgIHBhcnNlZERhdGUgPSB0cnlQYXJzZURhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlZERhdGU7XG4gIH1cblxuICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQsIG5ldyBEYXRlKCksIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iamVjdCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG5cbiAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9XG4gICAgICBpc1ZhbGlkKHBhcnNlZERhdGUpICYmXG4gICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZShwYXJzZWREYXRlLCBkYXRlRm9ybWF0LCBsb2NhbGUpO1xuICB9IGVsc2UgaWYgKCFpc1ZhbGlkKHBhcnNlZERhdGUpKSB7XG4gICAgZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXRcbiAgICAgIC5tYXRjaChsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgICBjb25zdCBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcInBcIiB8fCBmaXJzdENoYXJhY3RlciA9PT0gXCJQXCIpIHtcbiAgICAgICAgICBjb25zdCBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgICAgIHJldHVybiBsb2NhbGVPYmplY3RcbiAgICAgICAgICAgID8gbG9uZ0Zvcm1hdHRlcihzdWJzdHJpbmcsIGxvY2FsZU9iamVjdC5mb3JtYXRMb25nKVxuICAgICAgICAgICAgOiBmaXJzdENoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgICAgfSlcbiAgICAgIC5qb2luKFwiXCIpO1xuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHBhcnNlZERhdGUgPSBwYXJzZSh2YWx1ZSwgZGF0ZUZvcm1hdC5zbGljZSgwLCB2YWx1ZS5sZW5ndGgpLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgICAgcGFyc2VkRGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXNWYWxpZChwYXJzZWREYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA/IHBhcnNlZERhdGUgOiBudWxsO1xufVxuXG4vLyAqKiBEYXRlIFwiUmVmbGVjdGlvblwiICoqXG5cbmV4cG9ydCB7IGlzRGF0ZSB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChkYXRlLCBtaW5EYXRlKSB7XG4gIG1pbkRhdGUgPSBtaW5EYXRlID8gbWluRGF0ZSA6IG5ldyBEYXRlKFwiMS8xLzEwMDBcIik7XG4gIHJldHVybiBpc1ZhbGlkRGF0ZShkYXRlKSAmJiAhaXNCZWZvcmUoZGF0ZSwgbWluRGF0ZSk7XG59XG5cbi8vICoqIERhdGUgRm9ybWF0dGluZyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXRTdHIsIGxvY2FsZSkge1xuICBpZiAobG9jYWxlID09PSBcImVuXCIpIHtcbiAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICBsZXQgbG9jYWxlT2JqID0gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSk7XG4gIGlmIChsb2NhbGUgJiYgIWxvY2FsZU9iaikge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBBIGxvY2FsZSBvYmplY3Qgd2FzIG5vdCBmb3VuZCBmb3IgdGhlIHByb3ZpZGVkIHN0cmluZyBbXCIke2xvY2FsZX1cIl0uYCxcbiAgICApO1xuICB9XG4gIGlmIChcbiAgICAhbG9jYWxlT2JqICYmXG4gICAgISFnZXREZWZhdWx0TG9jYWxlKCkgJiZcbiAgICAhIWdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpXG4gICkge1xuICAgIGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICB9XG4gIHJldHVybiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmogPyBsb2NhbGVPYmogOiBudWxsLFxuICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlRm9ybWF0KGRhdGUsIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0pIHtcbiAgcmV0dXJuIChcbiAgICAoZGF0ZSAmJlxuICAgICAgZm9ybWF0RGF0ZShcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSA/IGRhdGVGb3JtYXRbMF0gOiBkYXRlRm9ybWF0LFxuICAgICAgICBsb2NhbGUsXG4gICAgICApKSB8fFxuICAgIFwiXCJcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlUmFuZ2VGb3JtYXQoc3RhcnREYXRlLCBlbmREYXRlLCBwcm9wcykge1xuICBpZiAoIXN0YXJ0RGF0ZSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVkU3RhcnREYXRlID0gc2FmZURhdGVGb3JtYXQoc3RhcnREYXRlLCBwcm9wcyk7XG4gIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSBlbmREYXRlID8gc2FmZURhdGVGb3JtYXQoZW5kRGF0ZSwgcHJvcHMpIDogXCJcIjtcblxuICByZXR1cm4gYCR7Zm9ybWF0dGVkU3RhcnREYXRlfSAtICR7Zm9ybWF0dGVkRW5kRGF0ZX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQoZGF0ZXMsIHByb3BzKSB7XG4gIGlmICghZGF0ZXM/Lmxlbmd0aCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG4gIGNvbnN0IGZvcm1hdHRlZEZpcnN0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzBdLCBwcm9wcyk7XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkRmlyc3REYXRlO1xuICB9XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDIpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmREYXRlID0gc2FmZURhdGVGb3JtYXQoZGF0ZXNbMV0sIHByb3BzKTtcbiAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSwgJHtmb3JtYXR0ZWRTZWNvbmREYXRlfWA7XG4gIH1cblxuICBjb25zdCBleHRyYURhdGVzQ291bnQgPSBkYXRlcy5sZW5ndGggLSAxO1xuICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSAoKyR7ZXh0cmFEYXRlc0NvdW50fSlgO1xufVxuXG4vLyAqKiBEYXRlIFNldHRlcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWUoZGF0ZSwgeyBob3VyID0gMCwgbWludXRlID0gMCwgc2Vjb25kID0gMCB9KSB7XG4gIHJldHVybiBzZXRIb3VycyhzZXRNaW51dGVzKHNldFNlY29uZHMoZGF0ZSwgc2Vjb25kKSwgbWludXRlKSwgaG91cik7XG59XG5cbmV4cG9ydCB7IHNldE1pbnV0ZXMsIHNldEhvdXJzLCBzZXRNb250aCwgc2V0UXVhcnRlciwgc2V0WWVhciB9O1xuXG4vLyAqKiBEYXRlIEdldHRlcnMgKipcblxuLy8gZ2V0RGF5IFJldHVybnMgZGF5IG9mIHdlZWssIGdldERhdGUgcmV0dXJucyBkYXkgb2YgbW9udGhcbmV4cG9ydCB7XG4gIGdldFNlY29uZHMsXG4gIGdldE1pbnV0ZXMsXG4gIGdldEhvdXJzLFxuICBnZXRNb250aCxcbiAgZ2V0UXVhcnRlcixcbiAgZ2V0WWVhcixcbiAgZ2V0RGF5LFxuICBnZXREYXRlLFxuICBnZXRUaW1lLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWsoZGF0ZSwgbG9jYWxlKSB7XG4gIGxldCBsb2NhbGVPYmogPVxuICAgIChsb2NhbGUgJiYgZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSkpIHx8XG4gICAgKGdldERlZmF1bHRMb2NhbGUoKSAmJiBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKSk7XG4gIHJldHVybiBnZXRJU09XZWVrKGRhdGUsIGxvY2FsZU9iaiA/IHsgbG9jYWxlOiBsb2NhbGVPYmogfSA6IG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrQ29kZShkYXksIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXksIFwiZGRkXCIsIGxvY2FsZSk7XG59XG5cbi8vICoqKiBTdGFydCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZEYXkoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZkRheShkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZXZWVrKGRhdGUsIGxvY2FsZSwgY2FsZW5kYXJTdGFydERheSkge1xuICBsZXQgbG9jYWxlT2JqID0gbG9jYWxlXG4gICAgPyBnZXRMb2NhbGVPYmplY3QobG9jYWxlKVxuICAgIDogZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIHJldHVybiBzdGFydE9mV2VlayhkYXRlLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmosXG4gICAgd2Vla1N0YXJ0c09uOiBjYWxlbmRhclN0YXJ0RGF5LFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZNb250aChkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mTW9udGgoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mWWVhcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mWWVhcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZRdWFydGVyKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZRdWFydGVyKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlRvZGF5KCkge1xuICByZXR1cm4gc3RhcnRPZkRheShuZXdEYXRlKCkpO1xufVxuXG4vLyAqKiogRW5kIG9mICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kT2ZXZWVrKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mV2VlayhkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gZW5kT2ZNb250aChkYXRlKTtcbn1cblxuLy8gKiogRGF0ZSBNYXRoICoqXG5cbi8vICoqKiBBZGRpdGlvbiAqKipcblxuZXhwb3J0IHtcbiAgYWRkU2Vjb25kcyxcbiAgYWRkTWludXRlcyxcbiAgYWRkRGF5cyxcbiAgYWRkV2Vla3MsXG4gIGFkZE1vbnRocyxcbiAgYWRkUXVhcnRlcnMsXG4gIGFkZFllYXJzLFxufTtcblxuLy8gKioqIFN1YnRyYWN0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRIb3Vycywgc3ViRGF5cywgc3ViV2Vla3MsIHN1Yk1vbnRocywgc3ViUXVhcnRlcnMsIHN1YlllYXJzIH07XG5cbi8vICoqIERhdGUgQ29tcGFyaXNvbiAqKlxuXG5leHBvcnQgeyBpc0JlZm9yZSwgaXNBZnRlciB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZURheShkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc0VxdWFsKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZkRheShzdGFydERhdGUpO1xuICBjb25zdCBlbmQgPSBlbmRPZkRheShlbmREYXRlKTtcblxuICB0cnkge1xuICAgIHZhbGlkID0gaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbi8vICoqKiBEaWZmaW5nICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTEsIGRhdGUyKSB7XG4gIHJldHVybiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZTEsIGRhdGUyKTtcbn1cblxuLy8gKiogRGF0ZSBMb2NhbGl6YXRpb24gKipcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZU5hbWUsIGxvY2FsZURhdGEpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBpZiAoIXNjb3BlLl9fbG9jYWxlRGF0YV9fKSB7XG4gICAgc2NvcGUuX19sb2NhbGVEYXRhX18gPSB7fTtcbiAgfVxuICBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVOYW1lXSA9IGxvY2FsZURhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0TG9jYWxlKGxvY2FsZU5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBzY29wZS5fX2xvY2FsZUlkX18gPSBsb2NhbGVOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdExvY2FsZSgpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICByZXR1cm4gc2NvcGUuX19sb2NhbGVJZF9fO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZVNwZWMpIHtcbiAgaWYgKHR5cGVvZiBsb2NhbGVTcGVjID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSBsb2NhbGUgbmFtZSByZWdpc3RlcmVkIGJ5IHJlZ2lzdGVyTG9jYWxlXG4gICAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcbiAgICByZXR1cm4gc2NvcGUuX19sb2NhbGVEYXRhX18gPyBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVTcGVjXSA6IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSByYXcgZGF0ZS1mbnMgbG9jYWxlIG9iamVjdFxuICAgIHJldHVybiBsb2NhbGVTcGVjO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF0ZSwgZm9ybWF0RnVuYywgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXRGdW5jKGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFXCIsIGxvY2FsZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhTaG9ydEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxdWFydGVyLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0UXVhcnRlcihuZXdEYXRlKCksIHF1YXJ0ZXIpLCBcIlFRUVwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiBVdGlscyBmb3Igc29tZSBjb21wb25lbnRzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheURpc2FibGVkKFxuICBkYXksXG4gIHtcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICAgZXhjbHVkZURhdGVzLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGluY2x1ZGVEYXRlcyxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFscyxcbiAgICBmaWx0ZXJEYXRlLFxuICB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lRGF5KGRheSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXkpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlFeGNsdWRlZChcbiAgZGF5LFxuICB7IGV4Y2x1ZGVEYXRlcywgZXhjbHVkZURhdGVJbnRlcnZhbHMgfSA9IHt9LFxuKSB7XG4gIGlmIChleGNsdWRlRGF0ZUludGVydmFscyAmJiBleGNsdWRlRGF0ZUludGVydmFscy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhEaXNhYmxlZChcbiAgbW9udGgsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhtb250aCwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZk1vbnRoKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZNb250aChtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShtb250aCkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoSW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIG0sIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVNb250aCA9IGdldE1vbnRoKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZU1vbnRoID0gZ2V0TW9udGgoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZU1vbnRoIDw9IG0gJiYgbSA8PSBlbmREYXRlTW9udGg7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZU1vbnRoIDw9IG0pIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZU1vbnRoID49IG0pIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckRpc2FibGVkKFxuICBxdWFydGVyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMocXVhcnRlciwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBpbmNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUocXVhcnRlcikpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnRcbiAqIEBwYXJhbSB7RGF0ZX0gZW5kXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckluUmFuZ2UoeWVhciwgc3RhcnQsIGVuZCkge1xuICBpZiAoIWlzVmFsaWREYXRlKHN0YXJ0KSB8fCAhaXNWYWxpZERhdGUoZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzdGFydFllYXIgPSBnZXRZZWFyKHN0YXJ0KTtcbiAgY29uc3QgZW5kWWVhciA9IGdldFllYXIoZW5kKTtcblxuICByZXR1cm4gc3RhcnRZZWFyIDw9IHllYXIgJiYgZW5kWWVhciA+PSB5ZWFyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFyRGlzYWJsZWQoXG4gIHllYXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCAwLCAxKTtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRhdGUsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZZZWFyKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZZZWFyKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF0ZSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVRdWFydGVyIDw9IHEgJiYgcSA8PSBlbmREYXRlUXVhcnRlcjtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlUXVhcnRlciA8PSBxKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVRdWFydGVyID49IHEpIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSA9IHt9KSB7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWluRGF0ZSkgPCAwKSB8fFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1heERhdGUpID4gMClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluTGlzdCh0aW1lLCB0aW1lcykge1xuICByZXR1cm4gdGltZXMuc29tZShcbiAgICAobGlzdFRpbWUpID0+XG4gICAgICBnZXRIb3VycyhsaXN0VGltZSkgPT09IGdldEhvdXJzKHRpbWUpICYmXG4gICAgICBnZXRNaW51dGVzKGxpc3RUaW1lKSA9PT0gZ2V0TWludXRlcyh0aW1lKSAmJlxuICAgICAgZ2V0U2Vjb25kcyhsaXN0VGltZSkgPT09IGdldFNlY29uZHModGltZSksXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVEaXNhYmxlZChcbiAgdGltZSxcbiAgeyBleGNsdWRlVGltZXMsIGluY2x1ZGVUaW1lcywgZmlsdGVyVGltZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICAoZXhjbHVkZVRpbWVzICYmIGlzVGltZUluTGlzdCh0aW1lLCBleGNsdWRlVGltZXMpKSB8fFxuICAgIChpbmNsdWRlVGltZXMgJiYgIWlzVGltZUluTGlzdCh0aW1lLCBpbmNsdWRlVGltZXMpKSB8fFxuICAgIChmaWx0ZXJUaW1lICYmICFmaWx0ZXJUaW1lKHRpbWUpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgeyBtaW5UaW1lLCBtYXhUaW1lIH0pIHtcbiAgaWYgKCFtaW5UaW1lIHx8ICFtYXhUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQm90aCBtaW5UaW1lIGFuZCBtYXhUaW1lIHByb3BzIHJlcXVpcmVkXCIpO1xuICB9XG4gIGxldCBiYXNlVGltZSA9IG5ld0RhdGUoKTtcbiAgYmFzZVRpbWUgPSBzZXRIb3VycyhiYXNlVGltZSwgZ2V0SG91cnModGltZSkpO1xuICBiYXNlVGltZSA9IHNldE1pbnV0ZXMoYmFzZVRpbWUsIGdldE1pbnV0ZXModGltZSkpO1xuICBiYXNlVGltZSA9IHNldFNlY29uZHMoYmFzZVRpbWUsIGdldFNlY29uZHModGltZSkpO1xuXG4gIGxldCBtaW4gPSBuZXdEYXRlKCk7XG4gIG1pbiA9IHNldEhvdXJzKG1pbiwgZ2V0SG91cnMobWluVGltZSkpO1xuICBtaW4gPSBzZXRNaW51dGVzKG1pbiwgZ2V0TWludXRlcyhtaW5UaW1lKSk7XG4gIG1pbiA9IHNldFNlY29uZHMobWluLCBnZXRTZWNvbmRzKG1pblRpbWUpKTtcblxuICBsZXQgbWF4ID0gbmV3RGF0ZSgpO1xuICBtYXggPSBzZXRIb3VycyhtYXgsIGdldEhvdXJzKG1heFRpbWUpKTtcbiAgbWF4ID0gc2V0TWludXRlcyhtYXgsIGdldE1pbnV0ZXMobWF4VGltZSkpO1xuICBtYXggPSBzZXRTZWNvbmRzKG1heCwgZ2V0U2Vjb25kcyhtYXhUaW1lKSk7XG5cbiAgbGV0IHZhbGlkO1xuICB0cnkge1xuICAgIHZhbGlkID0gIWlzV2l0aGluSW50ZXJ2YWwoYmFzZVRpbWUsIHsgc3RhcnQ6IG1pbiwgZW5kOiBtYXggfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c01vbnRoID0gc3ViTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobWluRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGluY2x1ZGVEYXRlLCBwcmV2aW91c01vbnRoKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQWZ0ZXIoZGF5LCB7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEJlZm9yZShkYXRlLCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgZmlyc3REYXRlT2ZZZWFyID0gc3RhcnRPZlllYXIoZGF0ZSk7XG4gIGNvbnN0IHByZXZpb3VzUXVhcnRlciA9IHN1YlF1YXJ0ZXJzKGZpcnN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG1pbkRhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMoaW5jbHVkZURhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVhcnRlckRpc2FibGVkQWZ0ZXIoZGF0ZSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGxhc3REYXRlT2ZZZWFyID0gZW5kT2ZZZWFyKGRhdGUpO1xuICBjb25zdCBuZXh0UXVhcnRlciA9IGFkZFF1YXJ0ZXJzKGxhc3REYXRlT2ZZZWFyLCAxKTtcblxuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMobmV4dFF1YXJ0ZXIsIG1heERhdGUpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhckRpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IHN1YlllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhtaW5EYXRlLCBwcmV2aW91c1llYXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1llYXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJzRGlzYWJsZWRCZWZvcmUoXG4gIGRheSxcbiAgeyBtaW5EYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgcHJldmlvdXNZZWFyID0gZ2V0U3RhcnRPZlllYXIoc3ViWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcikpO1xuICBjb25zdCB7IGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QocHJldmlvdXNZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1pbkRhdGVZZWFyID0gbWluRGF0ZSAmJiBnZXRZZWFyKG1pbkRhdGUpO1xuICByZXR1cm4gKG1pbkRhdGVZZWFyICYmIG1pbkRhdGVZZWFyID4gZW5kUGVyaW9kKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobmV4dFllYXIsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQWZ0ZXIoXG4gIGRheSxcbiAgeyBtYXhEYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgbmV4dFllYXIgPSBhZGRZZWFycyhkYXksIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QobmV4dFllYXIsIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgbWF4RGF0ZVllYXIgPSBtYXhEYXRlICYmIGdldFllYXIobWF4RGF0ZSk7XG4gIHJldHVybiAobWF4RGF0ZVllYXIgJiYgbWF4RGF0ZVllYXIgPCBzdGFydFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNaW5EYXRlKHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtaW5EYXRlKSB7XG4gICAgbGV0IG1pbkRhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtaW5EYXRlKSA+PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1pbihtaW5EYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1pbihpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNYXhEYXRlKHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtYXhEYXRlKSB7XG4gICAgbGV0IG1heERhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtYXhEYXRlKSA8PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1heChtYXhEYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1heChpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaWdodExpZ2h0RGF5c01hcChcbiAgaGlnaGxpZ2h0RGF0ZXMgPSBbXSxcbiAgZGVmYXVsdENsYXNzTmFtZSA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiLFxuKSB7XG4gIGNvbnN0IGRhdGVDbGFzc2VzID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGlnaGxpZ2h0RGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBvYmogPSBoaWdobGlnaHREYXRlc1tpXTtcbiAgICBpZiAoaXNEYXRlKG9iaikpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUob2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoZGVmYXVsdENsYXNzTmFtZSkpIHtcbiAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGRlZmF1bHRDbGFzc05hbWUpO1xuICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0ga2V5c1swXTtcbiAgICAgIGNvbnN0IGFyck9mRGF0ZXMgPSBvYmpba2V5c1swXV07XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhcnJPZkRhdGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuID0gYXJyT2ZEYXRlcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoYXJyT2ZEYXRlc1trXSwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXNBcnIgPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG4vKipcbiAqIENvbXBhcmUgdGhlIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSwgaWYgdGhlIHBhc3NlZCBhcnJheSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlzQXJlRXF1YWwoYXJyYXkxLCBhcnJheTIpIHtcbiAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyYXkxLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBhcnJheTJbaW5kZXhdKTtcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIGN1c3RvbSBjbGFzcyB0byBlYWNoIGRhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGlkYXlEYXRlcyBhcnJheSBvZiBvYmplY3QgY29udGFpbmluZyBkYXRlIGFuZCBuYW1lIG9mIHRoZSBob2xpZGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NuYW1lIHRvIGJlIGFkZGVkLlxuICogQHJldHVybnMge01hcH0gTWFwIGNvbnRhaW5pbmcgZGF0ZSBhcyBrZXkgYW5kIGFycmF5IG9mIGNsYXNzbmFtZSBhbmQgaG9saWRheSBuYW1lIGFzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb2xpZGF5c01hcChcbiAgaG9saWRheURhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taG9saWRheXNcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgaG9saWRheURhdGVzLmZvckVhY2goKGhvbGlkYXkpID0+IHtcbiAgICBjb25zdCB7IGRhdGU6IGRhdGVPYmosIGhvbGlkYXlOYW1lIH0gPSBob2xpZGF5O1xuICAgIGlmICghaXNEYXRlKGRhdGVPYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gZm9ybWF0RGF0ZShkYXRlT2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgY2xhc3NOYW1lc09iaiA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IHt9O1xuICAgIGlmIChcbiAgICAgIFwiY2xhc3NOYW1lXCIgaW4gY2xhc3NOYW1lc09iaiAmJlxuICAgICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9PT0gZGVmYXVsdENsYXNzTmFtZSAmJlxuICAgICAgYXJyYXlzQXJlRXF1YWwoY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSwgW2hvbGlkYXlOYW1lXSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGFzc05hbWVzT2JqW1wiY2xhc3NOYW1lXCJdID0gZGVmYXVsdENsYXNzTmFtZTtcbiAgICBjb25zdCBob2xpZGF5TmFtZUFyciA9IGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl07XG4gICAgY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSA9IGhvbGlkYXlOYW1lQXJyXG4gICAgICA/IFsuLi5ob2xpZGF5TmFtZUFyciwgaG9saWRheU5hbWVdXG4gICAgICA6IFtob2xpZGF5TmFtZV07XG4gICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc09iaik7XG4gIH0pO1xuICByZXR1cm4gZGF0ZUNsYXNzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gIHN0YXJ0T2ZEYXksXG4gIGN1cnJlbnRUaW1lLFxuICBjdXJyZW50TXVsdGlwbGllcixcbiAgaW50ZXJ2YWxzLFxuICBpbmplY3RlZFRpbWVzLFxuKSB7XG4gIGNvbnN0IGwgPSBpbmplY3RlZFRpbWVzLmxlbmd0aDtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBsZXQgaW5qZWN0ZWRUaW1lID0gc3RhcnRPZkRheTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRIb3VycyhpbmplY3RlZFRpbWUsIGdldEhvdXJzKGluamVjdGVkVGltZXNbaV0pKTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRNaW51dGVzKGluamVjdGVkVGltZSwgZ2V0TWludXRlcyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkU2Vjb25kcyhpbmplY3RlZFRpbWUsIGdldFNlY29uZHMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuXG4gICAgY29uc3QgbmV4dFRpbWUgPSBhZGRNaW51dGVzKFxuICAgICAgc3RhcnRPZkRheSxcbiAgICAgIChjdXJyZW50TXVsdGlwbGllciArIDEpICogaW50ZXJ2YWxzLFxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICBpc0FmdGVyKGluamVjdGVkVGltZSwgY3VycmVudFRpbWUpICYmXG4gICAgICBpc0JlZm9yZShpbmplY3RlZFRpbWUsIG5leHRUaW1lKVxuICAgICkge1xuICAgICAgdGltZXMucHVzaChpbmplY3RlZFRpbWVzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGltZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRaZXJvKGkpIHtcbiAgcmV0dXJuIGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRZZWFyc1BlcmlvZChcbiAgZGF0ZSxcbiAgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4pIHtcbiAgY29uc3QgZW5kUGVyaW9kID0gTWF0aC5jZWlsKGdldFllYXIoZGF0ZSkgLyB5ZWFySXRlbU51bWJlcikgKiB5ZWFySXRlbU51bWJlcjtcbiAgY29uc3Qgc3RhcnRQZXJpb2QgPSBlbmRQZXJpb2QgLSAoeWVhckl0ZW1OdW1iZXIgLSAxKTtcbiAgcmV0dXJuIHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG91cnNJbkRheShkKSB7XG4gIGNvbnN0IHN0YXJ0T2ZEYXkgPSBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xuICBjb25zdCBzdGFydE9mVGhlTmV4dERheSA9IG5ldyBEYXRlKFxuICAgIGQuZ2V0RnVsbFllYXIoKSxcbiAgICBkLmdldE1vbnRoKCksXG4gICAgZC5nZXREYXRlKCksXG4gICAgMjQsXG4gICk7XG5cbiAgcmV0dXJuIE1hdGgucm91bmQoKCtzdGFydE9mVGhlTmV4dERheSAtICtzdGFydE9mRGF5KSAvIDNfNjAwXzAwMCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgdGhlIG1pbnV0ZSBmb3IgdGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIGlzIGEgRFNUIGFuZCB0aW1lem9uZS1zYWZlIGFuYWxvZyBvZiBgZGF0ZS1mbnMvc3RhcnRPZk1pbnV0ZWBcbiAqIGRvIG5vdCBtYWtlIGNoYW5nZXMgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nXG4gKlxuICogU2VlIGNvbW1lbnRzIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvcHVsbC80MjQ0XG4gKiBmb3IgbW9yZSBkZXRhaWxzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSBzdGFydCBvZiB0aGUgbWludXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mTWludXRlKGQpIHtcbiAgY29uc3Qgc2Vjb25kcyA9IGQuZ2V0U2Vjb25kcygpO1xuICBjb25zdCBtaWxsaXNlY29uZHMgPSBkLmdldE1pbGxpc2Vjb25kcygpO1xuXG4gIHJldHVybiB0b0RhdGUoZC5nZXRUaW1lKCkgLSBzZWNvbmRzICogMTAwMCAtIG1pbGxpc2Vjb25kcyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgbWludXRlXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL2lzU2FtZU1pbnV0ZWBcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGQxXG4gKiBAcGFyYW0ge0RhdGV9IGQyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU1pbnV0ZShkMSwgZDIpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZNaW51dGUoZDEpLmdldFRpbWUoKSA9PT0gc3RhcnRPZk1pbnV0ZShkMikuZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZWQgZGF0ZSB3aXRoIG1pZG5pZ2h0IHRpbWUgKDAwOjAwOjAwKVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSBmb3Igd2hpY2ggbWlkbmlnaHQgdGltZSBpcyByZXF1aXJlZFxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge0RhdGV9IEEgbmV3IGRhdGV0aW1lIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaWRuaWdodERhdGUoZGF0ZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZVwiKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVXaXRob3V0VGltZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBkYXRlV2l0aG91dFRpbWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlV2l0aG91dFRpbWU7XG59XG5cbi8qKlxuICogSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSB0aGF0IHNob3VsZCBiZSBiZWZvcmUgdGhlIG90aGVyIG9uZSB0byByZXR1cm4gdHJ1ZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIFRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge2Jvb2xlYW59IFRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIGRhdGVcbiAqXG4gKiBOb3RlOlxuICogIFRoaXMgZnVuY3Rpb24gY29uc2lkZXJzIHRoZSBtaWQtbmlnaHQgb2YgdGhlIGdpdmVuIGRhdGVzIGZvciBjb21wYXJpc29uLlxuICogIEl0IGV2YWx1YXRlcyB3aGV0aGVyIGRhdGUgaXMgYmVmb3JlIGRhdGVUb0NvbXBhcmUgYmFzZWQgb24gdGhlaXIgbWlkLW5pZ2h0IHRpbWVzdGFtcHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVCZWZvcmUoZGF0ZSwgZGF0ZVRvQ29tcGFyZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSB8fCAhaXNEYXRlKGRhdGVUb0NvbXBhcmUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIHJlY2VpdmVkXCIpO1xuICB9XG5cbiAgY29uc3QgbWlkbmlnaHREYXRlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGUpO1xuICBjb25zdCBtaWRuaWdodERhdGVUb0NvbXBhcmUgPSBnZXRNaWRuaWdodERhdGUoZGF0ZVRvQ29tcGFyZSk7XG5cbiAgcmV0dXJuIGlzQmVmb3JlKG1pZG5pZ2h0RGF0ZSwgbWlkbmlnaHREYXRlVG9Db21wYXJlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3BhY2VLZXlEb3duKGV2ZW50KSB7XG4gIGNvbnN0IFNQQUNFX0tFWSA9IFwiIFwiO1xuICByZXR1cm4gZXZlbnQua2V5ID09PSBTUEFDRV9LRVk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlWWVhcnMoeWVhciwgbm9PZlllYXIsIG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDIgKiBub09mWWVhciArIDE7IGkrKykge1xuICAgIGNvbnN0IG5ld1llYXIgPSB5ZWFyICsgbm9PZlllYXIgLSBpO1xuICAgIGxldCBpc0luUmFuZ2UgPSB0cnVlO1xuXG4gICAgaWYgKG1pbkRhdGUpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWluRGF0ZSkgPD0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAobWF4RGF0ZSAmJiBpc0luUmFuZ2UpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWF4RGF0ZSkgPj0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAoaXNJblJhbmdlKSB7XG4gICAgICBsaXN0LnB1c2gobmV3WWVhcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgeWVhckRyb3Bkb3duSXRlbU51bWJlciwgc2Nyb2xsYWJsZVllYXJEcm9wZG93biB9ID0gcHJvcHM7XG4gICAgY29uc3Qgbm9PZlllYXIgPVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlciB8fCAoc2Nyb2xsYWJsZVllYXJEcm9wZG93biA/IDEwIDogNSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgeWVhcnNMaXN0OiBnZW5lcmF0ZVllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLnllYXIsXG4gICAgICAgIG5vT2ZZZWFyLFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgICB0aGlzLmRyb3Bkb3duUmVmID0gY3JlYXRlUmVmKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBkcm9wZG93bkN1cnJlbnQgPSB0aGlzLmRyb3Bkb3duUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAoZHJvcGRvd25DdXJyZW50KSB7XG4gICAgICAvLyBHZXQgYXJyYXkgZnJvbSBIVE1MQ29sbGVjdGlvblxuICAgICAgY29uc3QgZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4gPSBkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW5cbiAgICAgICAgPyBBcnJheS5mcm9tKGRyb3Bkb3duQ3VycmVudC5jaGlsZHJlbilcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRZZWFyT3B0aW9uRWwgPSBkcm9wZG93bkN1cnJlbnRDaGlsZHJlblxuICAgICAgICA/IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuLmZpbmQoKGNoaWxkRWwpID0+IGNoaWxkRWwuYXJpYVNlbGVjdGVkKVxuICAgICAgICA6IG51bGw7XG5cbiAgICAgIGRyb3Bkb3duQ3VycmVudC5zY3JvbGxUb3AgPSBzZWxlY3RlZFllYXJPcHRpb25FbFxuICAgICAgICA/IHNlbGVjdGVkWWVhck9wdGlvbkVsLm9mZnNldFRvcCArXG4gICAgICAgICAgKHNlbGVjdGVkWWVhck9wdGlvbkVsLmNsaWVudEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMlxuICAgICAgICA6IChkcm9wZG93bkN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gZHJvcGRvd25DdXJyZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gdGhpcy5wcm9wcy55ZWFyO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnN0YXRlLnllYXJzTGlzdC5tYXAoKHllYXIpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICBzZWxlY3RlZFllYXIgPT09IHllYXJcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbiByZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfeWVhclwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICB9XG4gICAgICAgIGtleT17eWVhcn1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIHllYXIpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWxlY3RlZFllYXIgPT09IHllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgID5cbiAgICAgICAge3NlbGVjdGVkWWVhciA9PT0geWVhciA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj7inJM8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgXCJcIlxuICAgICAgICApfVxuICAgICAgICB7eWVhcn1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuXG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IG51bGw7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IG51bGw7XG5cbiAgICBpZiAoIW1heFllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1heFllYXIpKSB7XG4gICAgICBvcHRpb25zLnVuc2hpZnQoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInVwY29taW5nXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5pbmNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtdXBjb21pbmdcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghbWluWWVhciB8fCAhdGhpcy5zdGF0ZS55ZWFyc0xpc3QuZmluZCgoeWVhcikgPT4geWVhciA9PT0gbWluWWVhcikpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgICBrZXk9e1wicHJldmlvdXNcIn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmRlY3JlbWVudFllYXJzfVxuICAgICAgICA+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbiByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycyByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycy1wcmV2aW91c1wiIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICBzaGlmdFllYXJzID0gKGFtb3VudCkgPT4ge1xuICAgIGNvbnN0IHllYXJzID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKGZ1bmN0aW9uICh5ZWFyKSB7XG4gICAgICByZXR1cm4geWVhciArIGFtb3VudDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgeWVhcnNMaXN0OiB5ZWFycyxcbiAgICB9KTtcbiAgfTtcblxuICBpbmNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKDEpO1xuICB9O1xuXG4gIGRlY3JlbWVudFllYXJzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnNoaWZ0WWVhcnMoLTEpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfSByZWY9e3RoaXMuZHJvcGRvd25SZWZ9PlxuICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgWWVhckRyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoWWVhckRyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBtaW5ZZWFyID0gdGhpcy5wcm9wcy5taW5EYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1pbkRhdGUpIDogMTkwMDtcbiAgICBjb25zdCBtYXhZZWFyID0gdGhpcy5wcm9wcy5tYXhEYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1heERhdGUpIDogMjEwMDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gbWluWWVhcjsgaSA8PSBtYXhZZWFyOyBpKyspIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAgICB7aX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25TZWxlY3RDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAoKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e3RoaXMucHJvcHMueWVhcn1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlld1wiXG4gICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1zZWxlY3RlZC15ZWFyXCI+XG4gICAgICAgIHt0aGlzLnByb3BzLnllYXJ9XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAoKSA9PiAoXG4gICAgPFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICB5ZWFyPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcbiAgICBpZiAoeWVhciA9PT0gdGhpcy5wcm9wcy55ZWFyKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh5ZWFyKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMucHJvcHMuZGF0ZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIHRoaXMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIHRoaXMuc2V0T3BlbigpO1xuICB9O1xuXG4gIG9uU2VsZWN0ID0gKGRhdGUsIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRPcGVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbW9udGhOYW1lczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIGlzU2VsZWN0ZWRNb250aCA9IChpKSA9PiB0aGlzLnByb3BzLm1vbnRoID09PSBpO1xuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubW9udGhOYW1lcy5tYXAoKG1vbnRoLCBpKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoaSlcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZF9tb250aFwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e21vbnRofVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgaSl9XG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGkpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge21vbnRofVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGgpO1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHRoaXMucHJvcHMub25DYW5jZWwoKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd25cIj5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aERyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9IChtb250aE5hbWVzKSA9PlxuICAgIG1vbnRoTmFtZXMubWFwKChNLCBpKSA9PiAoXG4gICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2l9PlxuICAgICAgICB7TX1cbiAgICAgIDwvb3B0aW9uPlxuICAgICkpO1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucyhtb250aE5hbWVzKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlLCBtb250aE5hbWVzKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aFwiPlxuICAgICAgICB7bW9udGhOYW1lc1t0aGlzLnByb3BzLm1vbnRoXX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJEcm9wZG93biA9IChtb250aE5hbWVzKSA9PiAoXG4gICAgPFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICBtb250aE5hbWVzPXttb250aE5hbWVzfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAobW9udGhOYW1lcykgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlLCBtb250aE5hbWVzKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bihtb250aE5hbWVzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKG1vbnRoICE9PSB0aGlzLnByb3BzLm1vbnRoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXS5tYXAoXG4gICAgICB0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3duXG4gICAgICAgID8gKE0pID0+IHV0aWxzLmdldE1vbnRoU2hvcnRJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSlcbiAgICAgICAgOiAoTSkgPT4gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSksXG4gICAgKTtcblxuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZShtb250aE5hbWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7XG4gIGFkZE1vbnRocyxcbiAgZm9ybWF0RGF0ZSxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBuZXdEYXRlLFxuICBpc0FmdGVyLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lWWVhcixcbiAgZ2V0VGltZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU1vbnRoWWVhcnMobWluRGF0ZSwgbWF4RGF0ZSkge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKG1pbkRhdGUpO1xuICBjb25zdCBsYXN0RGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtYXhEYXRlKTtcblxuICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgIGxpc3QucHVzaChuZXdEYXRlKGN1cnJEYXRlKSk7XG5cbiAgICBjdXJyRGF0ZSA9IGFkZE1vbnRocyhjdXJyRGF0ZSwgMSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1vbnRoWWVhcnNMaXN0OiBnZW5lcmF0ZU1vbnRoWWVhcnMoXG4gICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tb250aFllYXJzTGlzdC5tYXAoKG1vbnRoWWVhcikgPT4ge1xuICAgICAgY29uc3QgbW9udGhZZWFyUG9pbnQgPSBnZXRUaW1lKG1vbnRoWWVhcik7XG4gICAgICBjb25zdCBpc1NhbWVNb250aFllYXIgPVxuICAgICAgICBpc1NhbWVZZWFyKHRoaXMucHJvcHMuZGF0ZSwgbW9udGhZZWFyKSAmJlxuICAgICAgICBpc1NhbWVNb250aCh0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgaXNTYW1lTW9udGhZZWFyXG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGgteWVhclwiXG4gICAgICAgICAgICAgIDogXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvblwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17bW9udGhZZWFyUG9pbnR9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIG1vbnRoWWVhclBvaW50KX1cbiAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc1NhbWVNb250aFllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1NhbWVNb250aFllYXIgPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAg4pyTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHtmb3JtYXREYXRlKG1vbnRoWWVhciwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXIpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGhZZWFyKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Ryb3Bkb3duQ2xhc3N9Pnt0aGlzLnJlbmRlck9wdGlvbnMoKX08L2Rpdj47XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIG5ld0RhdGUsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxudmFyIFdyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMgPSBvbkNsaWNrT3V0c2lkZShNb250aFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgICAgY29uc3QgdGltZVBvaW50ID0gZ2V0VGltZShjdXJyRGF0ZSk7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXt0aW1lUG9pbnR9IHZhbHVlPXt0aW1lUG9pbnR9PlxuICAgICAgICAgIHtmb3JtYXREYXRlKGN1cnJEYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcblxuICAgICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXtnZXRUaW1lKGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRhdGUpKX1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiB7XG4gICAgY29uc3QgeWVhck1vbnRoID0gZm9ybWF0RGF0ZShcbiAgICAgIHRoaXMucHJvcHMuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9XCJyZWFkXCJcbiAgICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlld1wiXG4gICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bihldmVudCl9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXctLXNlbGVjdGVkLW1vbnRoLXllYXJcIj5cbiAgICAgICAgICB7eWVhck1vbnRofVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICBkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG4gICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXJQb2ludCkgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblxuICAgIGNvbnN0IGNoYW5nZWREYXRlID0gbmV3RGF0ZShwYXJzZUludChtb250aFllYXJQb2ludCkpO1xuXG4gICAgaWYgKFxuICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIGNoYW5nZWREYXRlKSAmJlxuICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9ICgpID0+XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHJlbmRlcmVkRHJvcGRvd247XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRyb3Bkb3duTW9kZSkge1xuICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTY3JvbGxNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBnZXREYXksXG4gIGdldE1vbnRoLFxuICBnZXREYXRlLFxuICBuZXdEYXRlLFxuICBpc1NhbWVEYXksXG4gIGlzRGF5RGlzYWJsZWQsXG4gIGlzRGF5RXhjbHVkZWQsXG4gIGlzRGF5SW5SYW5nZSxcbiAgaXNFcXVhbCxcbiAgaXNCZWZvcmUsXG4gIGlzQWZ0ZXIsXG4gIGdldERheU9mV2Vla0NvZGUsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBmb3JtYXREYXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c0RheSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkocHJldlByb3BzKTtcbiAgfVxuXG4gIGRheUVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VFbnRlciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKCkgJiYgdGhpcy5wcm9wcy5vbk1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIiBcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmtleSA9IFwiRW50ZXJcIjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKG90aGVyKSA9PiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXksIG90aGVyKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1NlbGVjdGVkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlXG4gICAgICA/IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT4gdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSkpXG4gICAgICA6IHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuXG4gICAgcmV0dXJuICFpc1NlbGVjdGVkRGF0ZSAmJiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gIH07XG5cbiAgaXNEaXNhYmxlZCA9ICgpID0+IGlzRGF5RGlzYWJsZWQodGhpcy5wcm9wcy5kYXksIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoKSA9PiBpc0RheUV4Y2x1ZGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc1N0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBpc1NhbWVEYXkoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVXZWVrID0gKG90aGVyKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICBpc1NhbWVEYXkoXG4gICAgICBvdGhlcixcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVEYXlPcldlZWsgPSAob3RoZXIpID0+IHRoaXMuaXNTYW1lRGF5KG90aGVyKSB8fCB0aGlzLmlzU2FtZVdlZWsob3RoZXIpO1xuXG4gIGdldEhpZ2hMaWdodGVkQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhpZ2hsaWdodERhdGVzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFoaWdobGlnaHREYXRlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIExvb2tpbmcgZm9yIGNsYXNzTmFtZSBpbiB0aGUgTWFwIG9mIHsnZGF5IHN0cmluZywgJ2NsYXNzTmFtZSd9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICByZXR1cm4gaGlnaGxpZ2h0RGF0ZXMuZ2V0KGRheVN0cik7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBhcnJheSBjb250YWluaW5nIGNsYXNzbmFtZSBhc3NvY2lhdGVkIHRvIHRoZSBkYXRlXG4gIGdldEhvbGlkYXlzQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaG9saWRheXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7ZGF5IHN0cmluZzoge2NsYXNzTmFtZSwgaG9saWRheU5hbWV9fVxuICAgIGlmIChob2xpZGF5cy5oYXMoZGF5U3RyKSkge1xuICAgICAgcmV0dXJuIFtob2xpZGF5cy5nZXQoZGF5U3RyKS5jbGFzc05hbWVdO1xuICAgIH1cbiAgfTtcblxuICBpc0luUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc2VsZWN0c1N0YXJ0LFxuICAgICAgc2VsZWN0c0VuZCxcbiAgICAgIHNlbGVjdHNSYW5nZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICFzZWxlY3RpbmdEYXRlIHx8XG4gICAgICAoIXNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlICYmIHRoaXMuaXNEaXNhYmxlZCgpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNTdGFydCAmJlxuICAgICAgZW5kRGF0ZSAmJlxuICAgICAgKGlzQmVmb3JlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c0VuZCAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAoaXNBZnRlcihzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNSYW5nZSAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAhZW5kRGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYW1lRGF5KHN0YXJ0RGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1JhbmdlRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShlbmREYXRlLCBkYXkpO1xuICB9O1xuXG4gIGlzV2Vla2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrZGF5ID0gZ2V0RGF5KHRoaXMucHJvcHMuZGF5KTtcbiAgICByZXR1cm4gd2Vla2RheSA9PT0gMCB8fCB3ZWVrZGF5ID09PSA2O1xuICB9O1xuXG4gIGlzQWZ0ZXJNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAodGhpcy5wcm9wcy5tb250aCArIDEpICUgMTIgPT09IGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNCZWZvcmVNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAoZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpICsgMSkgJSAxMiA9PT0gdGhpcy5wcm9wcy5tb250aFxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50RGF5ID0gKCkgPT4gdGhpcy5pc1NhbWVEYXkobmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT5cbiAgICAgICAgdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gIH07XG5cbiAgZ2V0Q2xhc3NOYW1lcyA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgZGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWVcbiAgICAgID8gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWUoZGF0ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIixcbiAgICAgIGRheUNsYXNzTmFtZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1cIiArIGdldERheU9mV2Vla0NvZGUodGhpcy5wcm9wcy5kYXkpLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZGlzYWJsZWRcIjogdGhpcy5pc0Rpc2FibGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1leGNsdWRlZFwiOiB0aGlzLmlzRXhjbHVkZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjogdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tc2VsZWN0aW5nLXJhbmdlXCI6IHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnREYXkoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXdlZWtlbmRcIjogdGhpcy5pc1dlZWtlbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLW91dHNpZGUtbW9udGhcIjpcbiAgICAgICAgICB0aGlzLmlzQWZ0ZXJNb250aCgpIHx8IHRoaXMuaXNCZWZvcmVNb250aCgpLFxuICAgICAgfSxcbiAgICAgIHRoaXMuZ2V0SGlnaExpZ2h0ZWRDbGFzcyhcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIiksXG4gICAgICB0aGlzLmdldEhvbGlkYXlzQ2xhc3MoKSxcbiAgICApO1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCA9IFwiQ2hvb3NlXCIsXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQgPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQoKSB8fCB0aGlzLmlzRXhjbHVkZWQoKVxuICAgICAgICA/IGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZFxuICAgICAgICA6IGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkO1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHtmb3JtYXREYXRlKGRheSwgXCJQUFBQXCIsIHRoaXMucHJvcHMubG9jYWxlKX1gO1xuICB9O1xuXG4gIC8vIEEgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBob2xpZGF5J3MgbmFtZSBhcyB0aXRsZSdzIGNvbnRlbnRcbiAgZ2V0VGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzID0gbmV3IE1hcCgpLCBleGNsdWRlRGF0ZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29tcGFyZUR0ID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICBjb25zdCB0aXRsZXMgPSBbXTtcbiAgICBpZiAoaG9saWRheXMuaGFzKGNvbXBhcmVEdCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKC4uLmhvbGlkYXlzLmdldChjb21wYXJlRHQpLmhvbGlkYXlOYW1lcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRXhjbHVkZWQoKSkge1xuICAgICAgdGl0bGVzLnB1c2goXG4gICAgICAgIGV4Y2x1ZGVEYXRlc1xuICAgICAgICAgID8uZmlsdGVyKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICAgIGlzU2FtZURheShleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlLCBkYXkpLFxuICAgICAgICAgIClcbiAgICAgICAgICAubWFwKChleGNsdWRlRGF0ZSkgPT4gZXhjbHVkZURhdGUubWVzc2FnZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGVzLmpvaW4oXCIsIFwiKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChzZWxlY3RlZCwgcHJlU2VsZWN0aW9uKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSBzZWxlY3RlZCB8fCB0aGlzLnByb3BzLnNlbGVjdGVkO1xuICAgIGNvbnN0IHByZVNlbGVjdGlvbkRheSA9IHByZVNlbGVjdGlvbiB8fCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhKFxuICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgICAgICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyIHx8ICF0aGlzLmlzU3RhcnRPZldlZWsoKSlcbiAgICAgICkgJiZcbiAgICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAgICh0aGlzLmlzU2FtZURheShzZWxlY3RlZERheSkgJiZcbiAgICAgICAgICBpc1NhbWVEYXkocHJlU2VsZWN0aW9uRGF5LCBzZWxlY3RlZERheSkpKVxuICAgICAgICA/IDBcbiAgICAgICAgOiAtMTtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgZGF5XG4gIC8vIGZvY3VzIHRoZSBkYXkgb24gbW91bnQvdXBkYXRlIHNvIHRoYXQga2V5Ym9hcmQgbmF2aWdhdGlvbiB3b3JrcyB3aGlsZSBjeWNsaW5nIHRocm91Z2ggbW9udGhzIHdpdGggdXAgb3IgZG93biBrZXlzIChub3QgZm9yIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9ucylcbiAgLy8gcHJldmVudCBmb2N1cyBmb3IgdGhlc2UgYWN0aXZlRWxlbWVudCBjYXNlcyBzbyB3ZSBkb24ndCBwdWxsIGZvY3VzIGZyb20gdGhlIGlucHV0IGFzIHRoZSBjYWxlbmRhciBvcGVuc1xuICBoYW5kbGVGb2N1c0RheSA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICB0aGlzLmlzU2FtZURheSh0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBpbmxpbmUgdmVyc2lvbjpcbiAgICAgIC8vIGRvIG5vdCBmb2N1cyBvbiBpbml0aWFsIHJlbmRlciB0byBwcmV2ZW50IGF1dG9Gb2N1cyBpc3N1ZVxuICAgICAgLy8gZm9jdXMgYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQgdmlhIGtleWJvYXJkXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmUpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIERheVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIilcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvL2RheSBpcyBvbmUgb2YgdGhlIG5vbiByZW5kZXJlZCBkdXBsaWNhdGUgZGF5c1xuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgJiYgdGhpcy5pc0FmdGVyTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzRGF5ICYmIHRoaXMuZGF5RWwuY3VycmVudD8uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlckRheUNvbnRlbnRzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ICYmIHRoaXMuaXNCZWZvcmVNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHNcbiAgICAgID8gdGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50cyhnZXREYXRlKHRoaXMucHJvcHMuZGF5KSwgdGhpcy5wcm9wcy5kYXkpXG4gICAgICA6IGdldERhdGUodGhpcy5wcm9wcy5kYXkpO1xuICB9O1xuXG4gIHJlbmRlciA9ICgpID0+IChcbiAgICA8ZGl2XG4gICAgICByZWY9e3RoaXMuZGF5RWx9XG4gICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcyh0aGlzLnByb3BzLmRheSl9XG4gICAgICBvbktleURvd249e3RoaXMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKCl9XG4gICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgIHRpdGxlPXt0aGlzLmdldFRpdGxlKCl9XG4gICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWQoKX1cbiAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnREYXkoKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkKCkgfHwgdGhpcy5pc0luUmFuZ2UoKX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJEYXlDb250ZW50cygpfVxuICAgICAge3RoaXMuZ2V0VGl0bGUoKSAhPT0gXCJcIiAmJiAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm92ZXJsYXlcIj57dGhpcy5nZXRUaXRsZSgpfTwvc3Bhbj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vla051bWJlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhcmlhTGFiZWxQcmVmaXg6IFwid2VlayBcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB3ZWVrTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihFbGVtZW50KSB9KSxcbiAgICBdKSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNXZWVrTnVtYmVyKHByZXZQcm9wcyk7XG4gIH1cblxuICB3ZWVrTnVtYmVyRWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+XG4gICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAhaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgZ2V0VGFiSW5kZXggPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyICYmXG4gICAgKHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCkgfHxcbiAgICAgIChpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHRoaXMucHJvcHMuc2VsZWN0ZWQpKSlcbiAgICAgID8gMFxuICAgICAgOiAtMTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgd2Vlay1udW1iZXJcbiAgLy8gZm9jdXMgdGhlIHdlZWstbnVtYmVyIG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNXZWVrTnVtYmVyID0gKHByZXZQcm9wcyA9IHt9KSA9PiB7XG4gICAgbGV0IHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlIGFjdGl2ZUVsZW1lbnQgaXMgaW4gdGhlIGNvbnRhaW5lciwgYW5kIGl0IGlzIGFub3RoZXIgaW5zdGFuY2Ugb2YgV2Vla051bWJlclxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCIsXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzV2Vla051bWJlciAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudCAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2Vla051bWJlciwgYXJpYUxhYmVsUHJlZml4ID0gXCJ3ZWVrIFwiLCBvbkNsaWNrIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyLS1jbGlja2FibGVcIjogISFvbkNsaWNrLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tc2VsZWN0ZWRcIjpcbiAgICAgICAgISFvbkNsaWNrICYmIGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17dGhpcy53ZWVrTnVtYmVyRWx9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xzeCh3ZWVrTnVtYmVyQ2xhc3Nlcyl9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2FyaWFMYWJlbFByZWZpeH0gJHt0aGlzLnByb3BzLndlZWtOdW1iZXJ9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgID5cbiAgICAgICAge3dlZWtOdW1iZXJ9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgRGF5IGZyb20gXCIuL2RheVwiO1xuaW1wb3J0IFdlZWtOdW1iZXIgZnJvbSBcIi4vd2Vla19udW1iZXJcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuXG5pbXBvcnQgeyBhZGREYXlzLCBnZXRXZWVrLCBnZXRTdGFydE9mV2VlaywgaXNTYW1lRGF5IH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWVrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgfTtcbiAgfVxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVXZWVrQ2xpY2sgPSAoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICB0aGlzLmhhbmRsZURheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXRXZWVrTnVtYmVyID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKGRhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0V2VlayhkYXRlKTtcbiAgfTtcblxuICByZW5kZXJEYXlzID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gdGhpcy5zdGFydE9mV2VlaygpO1xuICAgIGNvbnN0IGRheXMgPSBbXTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyID0gdGhpcy5mb3JtYXRXZWVrTnVtYmVyKHN0YXJ0T2ZXZWVrKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcikge1xuICAgICAgY29uc3Qgb25DbGlja0FjdGlvbiA9XG4gICAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgICAgICA/IHRoaXMuaGFuZGxlV2Vla0NsaWNrLmJpbmQodGhpcywgc3RhcnRPZldlZWssIHdlZWtOdW1iZXIpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBkYXlzLnB1c2goXG4gICAgICAgIDxXZWVrTnVtYmVyXG4gICAgICAgICAga2V5PVwiV1wiXG4gICAgICAgICAgd2Vla051bWJlcj17d2Vla051bWJlcn1cbiAgICAgICAgICBkYXRlPXtzdGFydE9mV2Vla31cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQWN0aW9ufVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcn1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgIC8+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAga2V5PXtkYXkudmFsdWVPZigpfVxuICAgICAgICAgICAgZGF5PXtkYXl9XG4gICAgICAgICAgICBtb250aD17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2suYmluZCh0aGlzLCBkYXkpfVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIHN0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMuc3RhcnRPZldlZWsoKSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB3ZWVrTnVtYmVyQ2xhc3NlcyA9IHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1wiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1zZWxlY3RlZFwiOiBpc1NhbWVEYXkoXG4gICAgICAgIHRoaXMuc3RhcnRPZldlZWsoKSxcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfT57dGhpcy5yZW5kZXJEYXlzKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBXZWVrIGZyb20gXCIuL3dlZWtcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQgPSA2O1xuXG5jb25zdCBNT05USF9DT0xVTU5TX0xBWU9VVCA9IHtcbiAgVFdPX0NPTFVNTlM6IFwidHdvX2NvbHVtbnNcIixcbiAgVEhSRUVfQ09MVU1OUzogXCJ0aHJlZV9jb2x1bW5zXCIsXG4gIEZPVVJfQ09MVU1OUzogXCJmb3VyX2NvbHVtbnNcIixcbn07XG5jb25zdCBNT05USF9DT0xVTU5TID0ge1xuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzIsIDNdLFxuICAgICAgWzQsIDVdLFxuICAgICAgWzYsIDddLFxuICAgICAgWzgsIDldLFxuICAgICAgWzEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDIsXG4gIH0sXG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyXSxcbiAgICAgIFszLCA0LCA1XSxcbiAgICAgIFs2LCA3LCA4XSxcbiAgICAgIFs5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAzLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuRk9VUl9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyLCAzXSxcbiAgICAgIFs0LCA1LCA2LCA3XSxcbiAgICAgIFs4LCA5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiA0LFxuICB9LFxufTtcbmNvbnN0IE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQgPSAxO1xuXG5mdW5jdGlvbiBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuKSB7XG4gIGlmIChzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcikgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OUztcbiAgaWYgKHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5UV09fQ09MVU1OUztcbiAgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULlRIUkVFX0NPTFVNTlM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb3JkZXJJbkRpc3BsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25Nb250aEtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIE1PTlRIX1JFRlMgPSBbLi4uQXJyYXkoMTIpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuICBRVUFSVEVSX1JFRlMgPSBbLi4uQXJyYXkoNCldLm1hcCgoKSA9PiBSZWFjdC5jcmVhdGVSZWYoKSk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQsIHRoaXMucHJvcHMub3JkZXJJbkRpc3BsYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKCk7XG4gICAgfVxuICB9O1xuXG4gIGlzUmFuZ2VTdGFydE1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aCh1dGlscy5zZXRNb250aChkYXksIG0pLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VTdGFydFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQgPSAobSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aCA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKCEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fCAhc2VsZWN0aW5nRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1dlZWtJbk1vbnRoID0gKHN0YXJ0T2ZXZWVrKSA9PiB7XG4gICAgY29uc3QgZGF5ID0gdGhpcy5wcm9wcy5kYXk7XG4gICAgY29uc3QgZW5kT2ZXZWVrID0gdXRpbHMuYWRkRGF5cyhzdGFydE9mV2VlaywgNik7XG4gICAgcmV0dXJuIChcbiAgICAgIHV0aWxzLmlzU2FtZU1vbnRoKHN0YXJ0T2ZXZWVrLCBkYXkpIHx8IHV0aWxzLmlzU2FtZU1vbnRoKGVuZE9mV2VlaywgZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50TW9udGggPSAoZGF5LCBtKSA9PlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcih1dGlscy5uZXdEYXRlKCkpICYmXG4gICAgbSA9PT0gdXRpbHMuZ2V0TW9udGgodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc0N1cnJlbnRRdWFydGVyID0gKGRheSwgcSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIHEgPT09IHV0aWxzLmdldFF1YXJ0ZXIodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoZGF5LCBtLCBzZWxlY3RlZCkgPT5cbiAgICB1dGlscy5nZXRNb250aChzZWxlY3RlZCkgPT09IG0gJiZcbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIoc2VsZWN0ZWQpO1xuXG4gIGlzU2VsZWN0ZWRRdWFydGVyID0gKGRheSwgcSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0UXVhcnRlcihkYXkpID09PSBxICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICByZW5kZXJXZWVrcyA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrcyA9IFtdO1xuICAgIHZhciBpc0ZpeGVkSGVpZ2h0ID0gdGhpcy5wcm9wcy5maXhlZEhlaWdodDtcblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgYnJlYWtBZnRlck5leHRQdXNoID0gZmFsc2U7XG4gICAgbGV0IGN1cnJlbnRXZWVrU3RhcnQgPSB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgIHV0aWxzLmdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRheSksXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICApXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQ7XG5cbiAgICBjb25zdCBwcmVTZWxlY3Rpb24gPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB3ZWVrcy5wdXNoKFxuICAgICAgICA8V2Vla1xuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRheT17Y3VycmVudFdlZWtTdGFydH1cbiAgICAgICAgICBtb250aD17dXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpfVxuICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3ByZVNlbGVjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAvPixcbiAgICAgICk7XG5cbiAgICAgIGlmIChicmVha0FmdGVyTmV4dFB1c2gpIGJyZWFrO1xuXG4gICAgICBpKys7XG4gICAgICBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuYWRkV2Vla3MoY3VycmVudFdlZWtTdGFydCwgMSk7XG5cbiAgICAgIC8vIElmIG9uZSBvZiB0aGVzZSBjb25kaXRpb25zIGlzIHRydWUsIHdlIHdpbGwgZWl0aGVyIGJyZWFrIG9uIHRoaXMgd2Vla1xuICAgICAgLy8gb3IgYnJlYWsgb24gdGhlIG5leHQgd2Vla1xuICAgICAgY29uc3QgaXNGaXhlZEFuZEZpbmFsV2VlayA9XG4gICAgICAgIGlzRml4ZWRIZWlnaHQgJiYgaSA+PSBGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVDtcbiAgICAgIGNvbnN0IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoID1cbiAgICAgICAgIWlzRml4ZWRIZWlnaHQgJiYgIXRoaXMuaXNXZWVrSW5Nb250aChjdXJyZW50V2Vla1N0YXJ0KTtcblxuICAgICAgaWYgKGlzRml4ZWRBbmRGaW5hbFdlZWsgfHwgaXNOb25GaXhlZEFuZE91dE9mTW9udGgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGVla05leHRNb250aCkge1xuICAgICAgICAgIGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gd2Vla3M7XG4gIH07XG5cbiAgb25Nb250aENsaWNrID0gKGUsIG0pID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aCh0aGlzLnByb3BzLmRheSwgbSk7XG5cbiAgICBpZiAodXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpLCBlKTtcbiAgfTtcblxuICBvbk1vbnRoTW91c2VFbnRlciA9IChtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVNb250aE5hdmlnYXRpb24gPSAobmV3TW9udGgsIG5ld0RhdGUpID0+IHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudCAmJlxuICAgICAgdGhpcy5NT05USF9SRUZTW25ld01vbnRoXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25Nb250aEtleURvd24gPSAoZXZlbnQsIG1vbnRoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWQsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNldFByZVNlbGVjdGlvbixcbiAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSAhPT0gXCJUYWJcIikge1xuICAgICAgLy8gcHJldmVudERlZmF1bHQgb24gdGFiIGV2ZW50IGJsb2NrcyBmb2N1cyBjaGFuZ2VcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IG1vbnRoQ29sdW1uc0xheW91dCA9IGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICApO1xuICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQgPVxuICAgICAgICBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0udmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0O1xuICAgICAgY29uc3QgbW9udGhzR3JpZCA9IE1PTlRIX0NPTFVNTlNbbW9udGhDb2x1bW5zTGF5b3V0XS5ncmlkO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldmVudCwgbW9udGgpO1xuICAgICAgICAgIHNldFByZVNlbGVjdGlvbihzZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VULFxuICAgICAgICAgICAgdXRpbHMuYWRkTW9udGhzKHByZVNlbGVjdGlvbiwgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLnN1Yk1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBtb250aCBvbiB0aGUgZmlyc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkWzBdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoICsgMTIgLSB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoIC0gdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGxhc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkW21vbnRoc0dyaWQubGVuZ3RoIC0gMV0uaW5jbHVkZXMobW9udGgpXG4gICAgICAgICAgICAgID8gbW9udGggLSAxMiArIHZlcnRpY2FsT2Zmc2V0XG4gICAgICAgICAgICAgIDogbW9udGggKyB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIHZlcnRpY2FsT2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duICYmIGhhbmRsZU9uTW9udGhLZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBvblF1YXJ0ZXJDbGljayA9IChlLCBxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2sodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25RdWFydGVyTW91c2VFbnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mUXVhcnRlcihsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiA9IChuZXdRdWFydGVyLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLlFVQVJURVJfUkVGU1tuZXdRdWFydGVyIC0gMV0uY3VycmVudCAmJlxuICAgICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBvblF1YXJ0ZXJLZXlEb3duID0gKGV2ZW50LCBxdWFydGVyKSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXZlbnQsIHF1YXJ0ZXIpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlUXVhcnRlck5hdmlnYXRpb24oXG4gICAgICAgICAgICBxdWFydGVyID09PSA0ID8gMSA6IHF1YXJ0ZXIgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkUXVhcnRlcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gMSA/IDQgOiBxdWFydGVyIC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBnZXRNb250aENsYXNzTmFtZXMgPSAobSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgbW9udGhDbGFzc05hbWUsXG4gICAgICBleGNsdWRlRGF0ZXMsXG4gICAgICBpbmNsdWRlRGF0ZXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoQ2xhc3NOYW1lID0gbW9udGhDbGFzc05hbWVcbiAgICAgID8gbW9udGhDbGFzc05hbWUodXRpbHMuc2V0TW9udGgoZGF5LCBtKSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19tb250aC0ke219YCxcbiAgICAgIF9tb250aENsYXNzTmFtZSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcykgJiZcbiAgICAgICAgICB1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRNb250aChcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgbSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBwcmVTZWxlY3Rpb24pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0taW4tcmFuZ2VcIjogdXRpbHMuaXNNb250aEluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgbSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnRNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFRhYkluZGV4ID0gKG0pID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZE1vbnRoID0gdXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIG0gPT09IHByZVNlbGVjdGVkTW9udGhcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRRdWFydGVyVGFiSW5kZXggPSAocSkgPT4ge1xuICAgIGNvbnN0IHByZVNlbGVjdGVkUXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIHEgPT09IHByZVNlbGVjdGVkUXVhcnRlclxuICAgICAgICA/IFwiMFwiXG4gICAgICAgIDogXCItMVwiO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9IChtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeCA9IFwiQ2hvb3NlXCIsXG4gICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCA9IFwiTm90IGF2YWlsYWJsZVwiLFxuICAgICAgZGF5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtb250aCk7XG4gICAgY29uc3QgcHJlZml4ID1cbiAgICAgIHRoaXMuaXNEaXNhYmxlZChsYWJlbERhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChsYWJlbERhdGUpXG4gICAgICAgID8gZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXhcbiAgICAgICAgOiBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSAke3V0aWxzLmZvcm1hdERhdGUobGFiZWxEYXRlLCBcIk1NTU0geXl5eVwiKX1gO1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJDbGFzc05hbWVzID0gKHEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLSR7cX1gLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBxLFxuICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzUXVhcnRlckluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgcSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNSYW5nZVN0YXJ0UXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmRRdWFydGVyKHEpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldE1vbnRoQ29udGVudCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBzaG93RnVsbE1vbnRoWWVhclBpY2tlciwgcmVuZGVyTW9udGhDb250ZW50LCBsb2NhbGUsIGRheSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvcnRNb250aFRleHQgPSB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBjb25zdCBmdWxsTW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShtLCBsb2NhbGUpO1xuICAgIGlmIChyZW5kZXJNb250aENvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNb250aENvbnRlbnQobSwgc2hvcnRNb250aFRleHQsIGZ1bGxNb250aFRleHQsIGRheSk7XG4gICAgfVxuICAgIHJldHVybiBzaG93RnVsbE1vbnRoWWVhclBpY2tlciA/IGZ1bGxNb250aFRleHQgOiBzaG9ydE1vbnRoVGV4dDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ29udGVudCA9IChxKSA9PiB7XG4gICAgY29uc3QgeyByZW5kZXJRdWFydGVyQ29udGVudCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0UXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlKHEsIGxvY2FsZSk7XG4gICAgcmV0dXJuIHJlbmRlclF1YXJ0ZXJDb250ZW50XG4gICAgICA/IHJlbmRlclF1YXJ0ZXJDb250ZW50KHEsIHNob3J0UXVhcnRlcilcbiAgICAgIDogc2hvcnRRdWFydGVyO1xuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBzZWxlY3RlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1vbnRoQ29sdW1ucyA9XG4gICAgICBNT05USF9DT0xVTU5TW1xuICAgICAgICBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgKVxuICAgICAgXS5ncmlkO1xuICAgIHJldHVybiBtb250aENvbHVtbnMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC13cmFwcGVyXCIga2V5PXtpfT5cbiAgICAgICAge21vbnRoLm1hcCgobSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17dGhpcy5NT05USF9SRUZTW21dfVxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25Nb250aENsaWNrKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhLZXlEb3duKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vbk1vbnRoTW91c2VFbnRlcihtKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleChtKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRNb250aENsYXNzTmFtZXMobSl9XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKG0pfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudE1vbnRoKGRheSwgbSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgc2VsZWN0ZWQpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldE1vbnRoQ29udGVudChtKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJRdWFydGVycyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcXVhcnRlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci13cmFwcGVyXCI+XG4gICAgICAgIHtxdWFydGVycy5tYXAoKHEsIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICByZWY9e3RoaXMuUVVBUlRFUl9SRUZTW2pdfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJDbGljayhldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJLZXlEb3duKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFF1YXJ0ZXJDbGFzc05hbWVzKHEpfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHNlbGVjdGVkKX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFF1YXJ0ZXJUYWJJbmRleChxKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRRdWFydGVyKGRheSwgcSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRRdWFydGVyQ29udGVudChxKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0aW5nRGF0ZSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgc2hvd1dlZWtQaWNrZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhcIixcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQpLFxuICAgICAgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFBpY2tlclwiOiBzaG93TW9udGhZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlclBpY2tlclwiOiBzaG93UXVhcnRlclllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrUGlja2VyXCI6IHNob3dXZWVrUGlja2VyIH0sXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIGRheSxcbiAgICAgIGFyaWFMYWJlbFByZWZpeCA9IFwiTW9udGggXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXggPSBhcmlhTGFiZWxQcmVmaXhcbiAgICAgID8gYXJpYUxhYmVsUHJlZml4LnRyaW0oKSArIFwiIFwiXG4gICAgICA6IFwiXCI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2Zvcm1hdHRlZEFyaWFMYWJlbFByZWZpeH0ke3V0aWxzLmZvcm1hdERhdGUoZGF5LCBcIk1NTU0sIHl5eXlcIil9YH1cbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgPlxuICAgICAgICB7c2hvd01vbnRoWWVhclBpY2tlclxuICAgICAgICAgID8gdGhpcy5yZW5kZXJNb250aHMoKVxuICAgICAgICAgIDogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgICA/IHRoaXMucmVuZGVyUXVhcnRlcnMoKVxuICAgICAgICAgICAgOiB0aGlzLnJlbmRlcldlZWtzKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge1xuICBnZXRIb3VycyxcbiAgZ2V0TWludXRlcyxcbiAgbmV3RGF0ZSxcbiAgZ2V0U3RhcnRPZkRheSxcbiAgYWRkTWludXRlcyxcbiAgZm9ybWF0RGF0ZSxcbiAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlLFxuICBpc1RpbWVEaXNhYmxlZCxcbiAgdGltZXNUb0luamVjdEFmdGVyLFxuICBnZXRIb3Vyc0luRGF5LFxuICBpc1NhbWVNaW51dGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcnZhbHM6IDMwLFxuICAgICAgb25UaW1lQ2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHRvZGF5QnV0dG9uOiBudWxsLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgY2FsY0NlbnRlclBvc2l0aW9uID0gKGxpc3RIZWlnaHQsIGNlbnRlckxpUmVmKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNlbnRlckxpUmVmLm9mZnNldFRvcCAtIChsaXN0SGVpZ2h0IC8gMiAtIGNlbnRlckxpUmVmLmNsaWVudEhlaWdodCAvIDIpXG4gICAgKTtcbiAgfTtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhSZWY6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaGVpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIGNvZGUgdG8gZW5zdXJlIHNlbGVjdGVkIHRpbWUgd2lsbCBhbHdheXMgYmUgaW4gZm9jdXMgd2l0aGluIHRpbWUgd2luZG93IHdoZW4gaXQgZmlyc3QgYXBwZWFyc1xuICAgIHRoaXMuc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFJlZiAmJiB0aGlzLmhlYWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSA9ICgpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybjtcblxuICAgICAgdGhpcy5saXN0LnNjcm9sbFRvcCA9XG4gICAgICAgIHRoaXMuY2VudGVyTGkgJiZcbiAgICAgICAgVGltZS5jYWxjQ2VudGVyUG9zaXRpb24oXG4gICAgICAgICAgdGhpcy5wcm9wcy5tb250aFJlZlxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm1vbnRoUmVmLmNsaWVudEhlaWdodCAtIHRoaXMuaGVhZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmxpc3QuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIHRoaXMuY2VudGVyTGksXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAodGltZSkgPT4ge1xuICAgIGlmIChcbiAgICAgICgodGhpcy5wcm9wcy5taW5UaW1lIHx8IHRoaXMucHJvcHMubWF4VGltZSkgJiZcbiAgICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmluY2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRpbWUpO1xuICB9O1xuXG4gIGlzU2VsZWN0ZWRUaW1lID0gKHRpbWUpID0+XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJiBpc1NhbWVNaW51dGUodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGltZSk7XG5cbiAgaXNEaXNhYmxlZFRpbWUgPSAodGltZSkgPT5cbiAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgdGhpcy5wcm9wcykpIHx8XG4gICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyVGltZSkgJiZcbiAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKTtcblxuICBsaUNsYXNzZXMgPSAodGltZSkgPT4ge1xuICAgIGxldCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbVwiLFxuICAgICAgdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lID8gdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lKHRpbWUpIDogdW5kZWZpbmVkLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0tZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgLy9jb252ZXJ0IHRoaXMucHJvcHMuaW50ZXJ2YWxzIGFuZCB0aGUgcmVsZXZhbnQgdGltZSB0byBzZWNvbmRzIGFuZCBjaGVjayBpZiBpdCBpdCdzIGEgY2xlYW4gbXVsdGlwbGUgb2YgdGhlIGludGVydmFsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgKGdldEhvdXJzKHRpbWUpICogMzYwMCArIGdldE1pbnV0ZXModGltZSkgKiA2MCArIGdldFNlY29uZHModGltZSkpICVcbiAgICAgICAgKHRoaXMucHJvcHMuaW50ZXJ2YWxzICogNjApICE9PVxuICAgICAgICAwXG4gICAgKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0taW5qZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50LCB0aW1lKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmcuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICB0aGlzLmhhbmRsZUNsaWNrKHRpbWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgcmVuZGVyVGltZXMgPSAoKSA9PiB7XG4gICAgbGV0IHRpbWVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQgPyB0aGlzLnByb3BzLmZvcm1hdCA6IFwicFwiO1xuICAgIGNvbnN0IGludGVydmFscyA9IHRoaXMucHJvcHMuaW50ZXJ2YWxzO1xuXG4gICAgY29uc3QgYWN0aXZlRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkIHx8IHRoaXMucHJvcHMub3BlblRvRGF0ZSB8fCBuZXdEYXRlKCk7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0U3RhcnRPZkRheShhY3RpdmVEYXRlKTtcbiAgICBjb25zdCBzb3J0ZWRJbmplY3RUaW1lcyA9XG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzICYmXG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtaW51dGVzSW5EYXkgPSA2MCAqIGdldEhvdXJzSW5EYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IG1pbnV0ZXNJbkRheSAvIGludGVydmFscztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlwbGllcjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGFkZE1pbnV0ZXMoYmFzZSwgaSAqIGludGVydmFscyk7XG4gICAgICB0aW1lcy5wdXNoKGN1cnJlbnRUaW1lKTtcblxuICAgICAgaWYgKHNvcnRlZEluamVjdFRpbWVzKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzVG9JbmplY3QgPSB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gICAgICAgICAgYmFzZSxcbiAgICAgICAgICBjdXJyZW50VGltZSxcbiAgICAgICAgICBpLFxuICAgICAgICAgIGludGVydmFscyxcbiAgICAgICAgICBzb3J0ZWRJbmplY3RUaW1lcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGltZXMgPSB0aW1lcy5jb25jYXQodGltZXNUb0luamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHRpbWUgdG8gZm9jdXMgYW5kIHNjcm9sbCBpbnRvIHZpZXcgd2hlbiBjb21wb25lbnQgbW91bnRzXG4gICAgY29uc3QgdGltZVRvRm9jdXMgPSB0aW1lcy5yZWR1Y2UoKHByZXYsIHRpbWUpID0+IHtcbiAgICAgIGlmICh0aW1lLmdldFRpbWUoKSA8PSBhY3RpdmVEYXRlLmdldFRpbWUoKSkge1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRpbWVzWzBdKTtcblxuICAgIHJldHVybiB0aW1lcy5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGltZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmxpQ2xhc3Nlcyh0aW1lKX1cbiAgICAgICAgICByZWY9eyhsaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWUgPT09IHRpbWVUb0ZvY3VzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VudGVyTGkgPSBsaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9uS2V5RG93bihldiwgdGltZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGltZSA9PT0gdGltZVRvRm9jdXMgPyAwIDogLTF9XG4gICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtmb3JtYXREYXRlKHRpbWUsIGZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lciAke1xuICAgICAgICAgIHRoaXMucHJvcHMudG9kYXlCdXR0b25cbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lci0td2l0aC10b2RheS1idXR0b25cIlxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZSAke1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZS0tb25seVwiXG4gICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgIH1gfVxuICAgICAgICAgIHJlZj17KGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19oZWFkZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWJveFwiPlxuICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdFwiXG4gICAgICAgICAgICAgIHJlZj17KGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBzdHlsZT17aGVpZ2h0ID8geyBoZWlnaHQgfSA6IHt9fVxuICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVzKCl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGdldFllYXIsIG5ld0RhdGUgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xlYXJTZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIFlFQVJfUkVGUyA9IFsuLi5BcnJheSh0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyKV0ubWFwKCgpID0+XG4gICAgUmVhY3QuY3JlYXRlUmVmKCksXG4gICk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBzZWxlY3RpbmdEYXRlID0gKCkgPT4gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gIHVwZGF0ZUZvY3VzT25QYWdpbmF0ZSA9IChyZWZJbmRleCkgPT4ge1xuICAgIGNvbnN0IHdhaXRGb3JSZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuWUVBUl9SRUZTW3JlZkluZGV4XS5jdXJyZW50LmZvY3VzKCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh3YWl0Rm9yUmVSZW5kZXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVZZWFyTmF2aWdhdGlvbiA9IChuZXdZZWFyLCBuZXdEYXRlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChkYXRlLCB5ZWFySXRlbU51bWJlcik7XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuXG4gICAgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA9PT0gLTEpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gICAgfSBlbHNlIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IHllYXJJdGVtTnVtYmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSgwKTtcbiAgICB9IGVsc2UgdGhpcy5ZRUFSX1JFRlNbbmV3WWVhciAtIHN0YXJ0UGVyaW9kXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKHksIG90aGVyKSA9PiB1dGlscy5pc1NhbWVEYXkoeSwgb3RoZXIpO1xuXG4gIGlzQ3VycmVudFllYXIgPSAoeSkgPT4geSA9PT0gZ2V0WWVhcihuZXdEYXRlKCkpO1xuXG4gIGlzUmFuZ2VTdGFydCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuc3RhcnREYXRlKTtcblxuICBpc1JhbmdlRW5kID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luUmFuZ2UgPSAoeSkgPT5cbiAgICB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZSA9ICh5KSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fFxuICAgICAgIXRoaXMuc2VsZWN0aW5nRGF0ZSgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5zZWxlY3RpbmdEYXRlKCksIGVuZERhdGUpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlU3RhcnQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKHkpID0+IHtcbiAgICBjb25zdCBkYXRlID0gdXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcih0aGlzLnByb3BzLmRhdGUsIHkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnNlbGVjdGVkKSkgJiZcbiAgICAgIHV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbikpXG4gICAgKTtcbiAgfTtcblxuICBvblllYXJDbGljayA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuaGFuZGxlWWVhckNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpLCBlKTtcbiAgfTtcblxuICBvblllYXJLZXlEb3duID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGtleSB9ID0gZTtcbiAgICBjb25zdCB7IGhhbmRsZU9uS2V5RG93biB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vblllYXJDbGljayhlLCB5KTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSArIDEsXG4gICAgICAgICAgICB1dGlscy5hZGRZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5IC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5RG93biAmJiBoYW5kbGVPbktleURvd24oZSk7XG4gIH07XG5cbiAgZ2V0WWVhckNsYXNzTmFtZXMgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGUsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgICAgZmlsdGVyRGF0ZSxcbiAgICAgIHllYXJDbGFzc05hbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci0ke3l9YCxcbiAgICAgIHllYXJDbGFzc05hbWUgPyB5ZWFyQ2xhc3NOYW1lKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpIDogdW5kZWZpbmVkLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0ZWRcIjogeSA9PT0gZ2V0WWVhcihzZWxlY3RlZCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcyB8fCBmaWx0ZXJEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzWWVhckRpc2FibGVkKHksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudFllYXIoeSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0WWVhclRhYkluZGV4ID0gKHkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikgcmV0dXJuIFwiLTFcIjtcbiAgICBjb25zdCBwcmVTZWxlY3RlZCA9IHV0aWxzLmdldFllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHkgPT09IHByZVNlbGVjdGVkID8gXCIwXCIgOiBcIi0xXCI7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RpbmdEYXRlLCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsc3goXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyXCIsIHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSksXG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRlbnQgPSAoeSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50ID8gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCh5KSA6IHk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHllYXJzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIsIG9uWWVhck1vdXNlRW50ZXIsIG9uWWVhck1vdXNlTGVhdmUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBkYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcblxuICAgIGZvciAobGV0IHkgPSBzdGFydFBlcmlvZDsgeSA8PSBlbmRQZXJpb2Q7IHkrKykge1xuICAgICAgeWVhcnNMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3RoaXMuWUVBUl9SRUZTW3kgLSBzdGFydFBlcmlvZF19XG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGV2LmtleSA9IFwiRW50ZXJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblllYXJLZXlEb3duKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFllYXJUYWJJbmRleCh5KX1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNsYXNzTmFtZXMoeSl9XG4gICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e3l9XG4gICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFllYXIoeSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLmdldFllYXJDb250ZW50KHkpfVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcygpfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItd3JhcHBlclwiXG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICB7eWVhcnNMaXN0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW5wdXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdGltZVN0cmluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpbWU6IHRoaXMucHJvcHMudGltZVN0cmluZyxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICBpZiAocHJvcHMudGltZVN0cmluZyAhPT0gc3RhdGUudGltZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGltZTogcHJvcHMudGltZVN0cmluZyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIG51bGwgdG8gaW5kaWNhdGUgbm8gY2hhbmdlIHRvIHN0YXRlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25UaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdGltZSB9KTtcblxuICAgIGNvbnN0IHsgZGF0ZTogcHJvcERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNQcm9wRGF0ZVZhbGlkID0gcHJvcERhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihwcm9wRGF0ZSk7XG4gICAgY29uc3QgZGF0ZSA9IGlzUHJvcERhdGVWYWxpZCA/IHByb3BEYXRlIDogbmV3IERhdGUoKTtcblxuICAgIGRhdGUuc2V0SG91cnModGltZS5zcGxpdChcIjpcIilbMF0pO1xuICAgIGRhdGUuc2V0TWludXRlcyh0aW1lLnNwbGl0KFwiOlwiKVsxXSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGRhdGUpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkYXRlLCB0aW1lU3RyaW5nLCBjdXN0b21UaW1lSW5wdXQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY3VzdG9tVGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbVRpbWVJbnB1dCwge1xuICAgICAgICBkYXRlLFxuICAgICAgICB2YWx1ZTogdGltZSxcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMub25UaW1lQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGltZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlRpbWVcIlxuICAgICAgICBuYW1lPVwidGltZS1pbnB1dFwiXG4gICAgICAgIHJlcXVpcmVkXG4gICAgICAgIHZhbHVlPXt0aW1lfVxuICAgICAgICBvbkNoYW5nZT17KGV2KSA9PiB7XG4gICAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoZXYudGFyZ2V0LnZhbHVlIHx8IHRpbWVTdHJpbmcpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19pbnB1dC10aW1lLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9fY2FwdGlvblwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZUlucHV0KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhckNvbnRhaW5lcih7XG4gIHNob3dUaW1lU2VsZWN0T25seSA9IGZhbHNlLFxuICBzaG93VGltZSA9IGZhbHNlLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufSkge1xuICBsZXQgYXJpYUxhYmVsID0gc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgPyBcIkNob29zZSBUaW1lXCJcbiAgICA6IGBDaG9vc2UgRGF0ZSR7c2hvd1RpbWUgPyBcIiBhbmQgVGltZVwiIDogXCJcIn1gO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkNhbGVuZGFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd1RpbWU6IFByb3BUeXBlcy5ib29sLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbn07XG4iLCJpbXBvcnQgWWVhckRyb3Bkb3duIGZyb20gXCIuL3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aERyb3Bkb3duIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoIGZyb20gXCIuL21vbnRoXCI7XG5pbXBvcnQgVGltZSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgWWVhciBmcm9tIFwiLi95ZWFyXCI7XG5pbXBvcnQgSW5wdXRUaW1lIGZyb20gXCIuL2lucHV0VGltZVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgQ2FsZW5kYXJDb250YWluZXIgZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBzZXRNb250aCxcbiAgZ2V0TW9udGgsXG4gIGFkZE1vbnRocyxcbiAgc3ViTW9udGhzLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0U3RhcnRPZlRvZGF5LFxuICBhZGREYXlzLFxuICBmb3JtYXREYXRlLFxuICBzZXRZZWFyLFxuICBnZXRZZWFyLFxuICBpc0JlZm9yZSxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0FmdGVyLFxuICBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlLFxuICBnZXRXZWVrZGF5TWluSW5Mb2NhbGUsXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIG1vbnRoRGlzYWJsZWRCZWZvcmUsXG4gIG1vbnRoRGlzYWJsZWRBZnRlcixcbiAgeWVhckRpc2FibGVkQmVmb3JlLFxuICB5ZWFyRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQmVmb3JlLFxuICBxdWFydGVyRGlzYWJsZWRCZWZvcmUsXG4gIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBhZGRaZXJvLFxuICBpc1ZhbGlkLFxuICBnZXRZZWFyc1BlcmlvZCxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBnZXRNb250aEluTG9jYWxlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMgPSBbXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiLFxuXTtcblxuY29uc3QgaXNEcm9wZG93blNlbGVjdCA9IChlbGVtZW50ID0ge30pID0+IHtcbiAgY29uc3QgY2xhc3NOYW1lcyA9IChlbGVtZW50LmNsYXNzTmFtZSB8fCBcIlwiKS5zcGxpdCgvXFxzKy8pO1xuICByZXR1cm4gRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUy5zb21lKFxuICAgICh0ZXN0Q2xhc3NuYW1lKSA9PiBjbGFzc05hbWVzLmluZGV4T2YodGVzdENsYXNzbmFtZSkgPj0gMCxcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uRHJvcGRvd25Gb2N1czogKCkgPT4ge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKVxuICAgICAgLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKSxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtb250aFNlbGVjdGVkSW46IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRyb3Bkb3duRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uVGltZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uRGF5S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5jb250YWluZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRlOiB0aGlzLmdldERhdGVJblZpZXcoKSxcbiAgICAgIHNlbGVjdGluZ0RhdGU6IG51bGwsXG4gICAgICBtb250aENvbnRhaW5lcjogbnVsbCxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gbW9udGhDb250YWluZXIgaGVpZ2h0IGlzIG5lZWRlZCBpbiB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHRvIGRldGVybWluZSB0aGUgaGVpZ2h0IGZvciB0aGUgdWwgaW4gdGhlIHRpbWUgY29tcG9uZW50XG4gICAgLy8gc2V0U3RhdGUgaGVyZSBzbyBoZWlnaHQgaXMgZ2l2ZW4gYWZ0ZXIgZmluYWwgY29tcG9uZW50XG4gICAgLy8gbGF5b3V0IGlzIHJlbmRlcmVkXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuYXNzaWduTW9udGhDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhDb250YWluZXI6IHRoaXMubW9udGhDb250YWluZXIgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbiAmJlxuICAgICAgKCFpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHByZXZQcm9wcy5wcmVTZWxlY3Rpb24pIHx8XG4gICAgICAgIHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluICE9PSBwcmV2UHJvcHMubW9udGhTZWxlY3RlZEluKVxuICAgICkge1xuICAgICAgY29uc3QgaGFzTW9udGhDaGFuZ2VkID0gIWlzU2FtZU1vbnRoKFxuICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gaGFzTW9udGhDaGFuZ2VkICYmIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZSAmJlxuICAgICAgIWlzU2FtZURheSh0aGlzLnByb3BzLm9wZW5Ub0RhdGUsIHByZXZQcm9wcy5vcGVuVG9EYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGU6IHRoaXMucHJvcHMub3BlblRvRGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICB9O1xuXG4gIHNldENsaWNrT3V0c2lkZVJlZiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGlzRHJvcGRvd25TZWxlY3QoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0ZUluVmlldyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByZVNlbGVjdGlvbiwgc2VsZWN0ZWQsIG9wZW5Ub0RhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld0RhdGUoKTtcbiAgICBjb25zdCBpbml0aWFsRGF0ZSA9IG9wZW5Ub0RhdGUgfHwgc2VsZWN0ZWQgfHwgcHJlU2VsZWN0aW9uO1xuICAgIGlmIChpbml0aWFsRGF0ZSkge1xuICAgICAgcmV0dXJuIGluaXRpYWxEYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWluRGF0ZSAmJiBpc0JlZm9yZShjdXJyZW50LCBtaW5EYXRlKSkge1xuICAgICAgICByZXR1cm4gbWluRGF0ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBpc0FmdGVyKGN1cnJlbnQsIG1heERhdGUpKSB7XG4gICAgICAgIHJldHVybiBtYXhEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfTtcblxuICBpbmNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZE1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgZGVjcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IGRheSB9KTtcbiAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgICB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUoKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VFbnRlciA9IChldmVudCwgeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBzZXRZZWFyKG5ld0RhdGUoKSwgeWVhcikgfSk7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VMZWF2ZSA9IChldmVudCwgeWVhcikgPT4ge1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZShldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uWWVhckNoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb250aENoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW9udGhZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgdGhpcy5oYW5kbGVNb250aENoYW5nZShkYXRlKTtcbiAgfTtcblxuICBjaGFuZ2VZZWFyID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKGRhdGUsIHllYXIpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0TW9udGgoZGF0ZSwgbW9udGgpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aFllYXIgPSAobW9udGhZZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihzZXRNb250aChkYXRlLCBnZXRNb250aChtb250aFllYXIpKSwgZ2V0WWVhcihtb250aFllYXIpKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aFllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhlYWRlciA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSBnZXRTdGFydE9mV2VlayhcbiAgICAgIGRhdGUsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3QgZGF5TmFtZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnMpIHtcbiAgICAgIGRheU5hbWVzLnB1c2goXG4gICAgICAgIDxkaXYga2V5PVwiV1wiIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMud2Vla0xhYmVsIHx8IFwiI1wifVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5TmFtZXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIGNvbnN0IHdlZWtEYXlOYW1lID0gdGhpcy5mb3JtYXRXZWVrZGF5KGRheSwgdGhpcy5wcm9wcy5sb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IHdlZWtEYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWVcbiAgICAgICAgICA/IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZShkYXkpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e29mZnNldH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2Zvcm1hdERhdGUoZGF5LCBcIkVFRUVcIiwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVcIiwgd2Vla0RheUNsYXNzTmFtZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3dlZWtEYXlOYW1lfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBmb3JtYXRXZWVrZGF5ID0gKGRheSwgbG9jYWxlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSkge1xuICAgICAgcmV0dXJuIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZShkYXksIHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSwgbG9jYWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydFxuICAgICAgPyBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZShkYXksIGxvY2FsZSlcbiAgICAgIDogZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRheSwgbG9jYWxlKTtcbiAgfTtcblxuICBkZWNyZWFzZVllYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViWWVhcnMoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyID8gdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlciA6IDEsXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2xlYXJTZWxlY3RpbmdEYXRlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBudWxsIH0pO1xuICB9O1xuXG4gIHJlbmRlclByZXZpb3VzQnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxQcmV2RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyc0Rpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHF1YXJ0ZXJEaXNhYmxlZEJlZm9yZShcbiAgICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpY29uQ2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91c1wiLFxuICAgIF07XG5cbiAgICBsZXQgY2xpY2tIYW5kbGVyID0gdGhpcy5kZWNyZWFzZU1vbnRoO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlclxuICAgICkge1xuICAgICAgY2xpY2tIYW5kbGVyID0gdGhpcy5kZWNyZWFzZVllYXI7XG4gICAgfVxuXG4gICAgaWYgKGFsbFByZXZEYXlzRGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXByZXZpb3VzLS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IHByZXZpb3VzTW9udGhCdXR0b25MYWJlbCwgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7XG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsID0gdHlwZW9mIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHByZXZpb3VzTW9udGhCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c1llYXJCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IHByZXZpb3VzWWVhckFyaWFMYWJlbCA6IHByZXZpb3VzTW9udGhBcmlhTGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICAgIHtpc0ZvclllYXJcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5wcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnByZXZpb3VzTW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICBpbmNyZWFzZVllYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogYWRkWWVhcnMoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyID8gdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlciA6IDEsXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTmV4dEJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYWxsTmV4dERheXNEaXNhYmxlZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhckRpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSB5ZWFyc0Rpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0gcXVhcnRlckRpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICghdGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgIXRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dFwiLFxuICAgIF07XG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLW5leHRcIixcbiAgICBdO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS13aXRoLXRpbWVcIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnRvZGF5QnV0dG9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS13aXRoLXRvZGF5LWJ1dHRvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgY2xpY2tIYW5kbGVyID0gdGhpcy5pbmNyZWFzZU1vbnRoO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlclxuICAgICkge1xuICAgICAgY2xpY2tIYW5kbGVyID0gdGhpcy5pbmNyZWFzZVllYXI7XG4gICAgfVxuXG4gICAgaWYgKGFsbE5leHREYXlzRGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLWRpc2FibGVkXCIpO1xuICAgICAgY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvclllYXIgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIGNvbnN0IHsgbmV4dE1vbnRoQnV0dG9uTGFiZWwsIG5leHRZZWFyQnV0dG9uTGFiZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsID0gdHlwZW9mIG5leHRNb250aEJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dE1vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIk5leHQgTW9udGhcIixcbiAgICAgIG5leHRZZWFyQXJpYUxhYmVsID0gdHlwZW9mIG5leHRZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBuZXh0WWVhckJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IFllYXJcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9XG4gICAgICAgIG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNGb3JZZWFyID8gbmV4dFllYXJBcmlhTGFiZWwgOiBuZXh0TW9udGhBcmlhTGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICAgIHtpc0ZvclllYXJcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5uZXh0WWVhckJ1dHRvbkxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMubmV4dE1vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ3VycmVudE1vbnRoID0gKGRhdGUgPSB0aGlzLnN0YXRlLmRhdGUpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gW1wicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aFwiXTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc1llYXJEcm9wZG93blwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzTW9udGhZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgIHtmb3JtYXREYXRlKGRhdGUsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxZZWFyRHJvcGRvd25cbiAgICAgICAgYWRqdXN0RGF0ZU9uQ2hhbmdlPXt0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgeWVhcj17Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfVxuICAgICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJNb250aERyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoRHJvcGRvd25cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGh9XG4gICAgICAgIG1vbnRoPXtnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpfVxuICAgICAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bj17dGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93bn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJNb250aFllYXJEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TW9udGhZZWFyRHJvcGRvd25cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aFllYXJ9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlVG9kYXlCdXR0b25DbGljayA9IChlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChnZXRTdGFydE9mVG9kYXkoKSwgZSk7XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZ2V0U3RhcnRPZlRvZGF5KCkpO1xuICB9O1xuXG4gIHJlbmRlclRvZGF5QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy50b2RheUJ1dHRvbiB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190b2RheS1idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVUb2RheUJ1dHRvbkNsaWNrKGUpfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGVmYXVsdEhlYWRlciA9ICh7IG1vbnRoRGF0ZSwgaSB9KSA9PiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyICR7XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RcbiAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS1oYXMtdGltZS1zZWxlY3RcIlxuICAgICAgICAgIDogXCJcIlxuICAgICAgfWB9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyQ3VycmVudE1vbnRoKG1vbnRoRGF0ZSl9XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24gcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyX19kcm9wZG93bi0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZURyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlck1vbnRoRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICAgIHt0aGlzLnJlbmRlck1vbnRoWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJZZWFyRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgIHt0aGlzLmhlYWRlcihtb250aERhdGUpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyQ3VzdG9tSGVhZGVyID0gKGhlYWRlckFyZ3MgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHsgbW9udGhEYXRlLCBpIH0gPSBoZWFkZXJBcmdzO1xuXG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiYgIXRoaXMuc3RhdGUubW9udGhDb250YWluZXIpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldk1vbnRoQnV0dG9uRGlzYWJsZWQgPSBtb250aERpc2FibGVkQmVmb3JlKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgbmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQgPSBtb250aERpc2FibGVkQWZ0ZXIoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBwcmV2WWVhckJ1dHRvbkRpc2FibGVkID0geWVhckRpc2FibGVkQmVmb3JlKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgbmV4dFllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3Qgc2hvd0RheU5hbWVzID1cbiAgICAgICF0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciAmJlxuICAgICAgIXRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS1jdXN0b21cIlxuICAgICAgICBvbkZvY3VzPXt0aGlzLnByb3BzLm9uRHJvcGRvd25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIGN1c3RvbUhlYWRlckNvdW50OiBpLFxuICAgICAgICAgIG1vbnRoRGF0ZSxcbiAgICAgICAgICBjaGFuZ2VNb250aDogdGhpcy5jaGFuZ2VNb250aCxcbiAgICAgICAgICBjaGFuZ2VZZWFyOiB0aGlzLmNoYW5nZVllYXIsXG4gICAgICAgICAgZGVjcmVhc2VNb250aDogdGhpcy5kZWNyZWFzZU1vbnRoLFxuICAgICAgICAgIGluY3JlYXNlTW9udGg6IHRoaXMuaW5jcmVhc2VNb250aCxcbiAgICAgICAgICBkZWNyZWFzZVllYXI6IHRoaXMuZGVjcmVhc2VZZWFyLFxuICAgICAgICAgIGluY3JlYXNlWWVhcjogdGhpcy5pbmNyZWFzZVllYXIsXG4gICAgICAgICAgcHJldk1vbnRoQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgcHJldlllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBuZXh0WWVhckJ1dHRvbkRpc2FibGVkLFxuICAgICAgICB9KX1cbiAgICAgICAge3Nob3dEYXlOYW1lcyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZXNcIj5cbiAgICAgICAgICAgIHt0aGlzLmhlYWRlcihtb250aERhdGUpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJZZWFySGVhZGVyID0gKHsgbW9udGhEYXRlIH0pID0+IHtcbiAgICBjb25zdCB7IHNob3dZZWFyUGlja2VyLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgbW9udGhEYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgcmVhY3QtZGF0ZXBpY2tlci15ZWFyLWhlYWRlclwiPlxuICAgICAgICB7c2hvd1llYXJQaWNrZXIgPyBgJHtzdGFydFBlcmlvZH0gLSAke2VuZFBlcmlvZH1gIDogZ2V0WWVhcihtb250aERhdGUpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXIgPSAoaGVhZGVyQXJncykgPT4ge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlciAhPT0gdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDdXN0b21IZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJZZWFySGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGVmYXVsdEhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyTW9udGhzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSB8fCB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW9udGhMaXN0ID0gW107XG4gICAgY29uc3QgbW9udGhzVG9TdWJ0cmFjdCA9IHRoaXMucHJvcHMuc2hvd1ByZXZpb3VzTW9udGhzXG4gICAgICA/IHRoaXMucHJvcHMubW9udGhzU2hvd24gLSAxXG4gICAgICA6IDA7XG4gICAgY29uc3QgZnJvbU1vbnRoRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgPyBhZGRZZWFycyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpXG4gICAgICAgIDogc3ViTW9udGhzKHRoaXMuc3RhdGUuZGF0ZSwgbW9udGhzVG9TdWJ0cmFjdCk7XG4gICAgY29uc3QgbW9udGhTZWxlY3RlZEluID0gdGhpcy5wcm9wcy5tb250aFNlbGVjdGVkSW4gPz8gbW9udGhzVG9TdWJ0cmFjdDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubW9udGhzU2hvd247ICsraSkge1xuICAgICAgY29uc3QgbW9udGhzVG9BZGQgPSBpIC0gbW9udGhTZWxlY3RlZEluICsgbW9udGhzVG9TdWJ0cmFjdDtcbiAgICAgIGNvbnN0IG1vbnRoRGF0ZSA9XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fCB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgID8gYWRkWWVhcnMoZnJvbU1vbnRoRGF0ZSwgbW9udGhzVG9BZGQpXG4gICAgICAgICAgOiBhZGRNb250aHMoZnJvbU1vbnRoRGF0ZSwgbW9udGhzVG9BZGQpO1xuICAgICAgY29uc3QgbW9udGhLZXkgPSBgbW9udGgtJHtpfWA7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCA9IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMTtcbiAgICAgIGNvbnN0IG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgPSBpID4gMDtcbiAgICAgIG1vbnRoTGlzdC5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXttb250aEtleX1cbiAgICAgICAgICByZWY9eyhkaXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9udGhDb250YWluZXIgPSBkaXY7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1jb250YWluZXJcIlxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKHsgbW9udGhEYXRlLCBpIH0pfVxuICAgICAgICAgIDxNb250aFxuICAgICAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgd2Vla0FyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICAgICAgZGF5PXttb250aERhdGV9XG4gICAgICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uRGF5S2V5RG93bn1cbiAgICAgICAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb250aE1vdXNlTGVhdmV9XG4gICAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgICAgb3JkZXJJbkRpc3BsYXk9e2l9XG4gICAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgICBob2xpZGF5cz17dGhpcy5wcm9wcy5ob2xpZGF5c31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIGZpeGVkSGVpZ2h0PXt0aGlzLnByb3BzLmZpeGVkSGVpZ2h0fVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXJzPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgICBwZWVrTmV4dE1vbnRoPXt0aGlzLnByb3BzLnBlZWtOZXh0TW9udGh9XG4gICAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIHJlbmRlck1vbnRoQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJNb250aENvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgICAgIHJlbmRlclllYXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50fVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBzaG93TW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXttb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBtb250aExpc3Q7XG4gIH07XG5cbiAgcmVuZGVyWWVhcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZTogdGhpcy5zdGF0ZS5kYXRlIH0pfVxuICAgICAgICAgIDxZZWFyXG4gICAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5zdGF0ZS5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgY2xlYXJTZWxlY3RpbmdEYXRlPXt0aGlzLmNsZWFyU2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgb25ZZWFyTW91c2VFbnRlcj17dGhpcy5oYW5kbGVZZWFyTW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlWWVhck1vdXNlTGVhdmV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJUaW1lU2VjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmXG4gICAgICAodGhpcy5zdGF0ZS5tb250aENvbnRhaW5lciB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSlcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaW1lXG4gICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgb3BlblRvRGF0ZT17dGhpcy5wcm9wcy5vcGVuVG9EYXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVGltZUNoYW5nZX1cbiAgICAgICAgICB0aW1lQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRpbWVDbGFzc05hbWV9XG4gICAgICAgICAgZm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9XG4gICAgICAgICAgaW5jbHVkZVRpbWVzPXt0aGlzLnByb3BzLmluY2x1ZGVUaW1lc31cbiAgICAgICAgICBpbnRlcnZhbHM9e3RoaXMucHJvcHMudGltZUludGVydmFsc31cbiAgICAgICAgICBtaW5UaW1lPXt0aGlzLnByb3BzLm1pblRpbWV9XG4gICAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICAgIGV4Y2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5leGNsdWRlVGltZXN9XG4gICAgICAgICAgZmlsdGVyVGltZT17dGhpcy5wcm9wcy5maWx0ZXJUaW1lfVxuICAgICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIHRvZGF5QnV0dG9uPXt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgICAgIHNob3dNb250aERyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3dufVxuICAgICAgICAgIHNob3dNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgICAgc2hvd1llYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3dufVxuICAgICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgICBtb250aFJlZj17dGhpcy5zdGF0ZS5tb250aENvbnRhaW5lcn1cbiAgICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcklucHV0VGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIGNvbnN0IHRpbWVWYWxpZCA9IGlzVmFsaWQodGltZSkgJiYgQm9vbGVhbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lU3RyaW5nID0gdGltZVZhbGlkXG4gICAgICA/IGAke2FkZFplcm8odGltZS5nZXRIb3VycygpKX06JHthZGRaZXJvKHRpbWUuZ2V0TWludXRlcygpKX1gXG4gICAgICA6IFwiXCI7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPElucHV0VGltZVxuICAgICAgICAgIGRhdGU9e3RpbWV9XG4gICAgICAgICAgdGltZVN0cmluZz17dGltZVN0cmluZ31cbiAgICAgICAgICB0aW1lSW5wdXRMYWJlbD17dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgY3VzdG9tVGltZUlucHV0PXt0aGlzLnByb3BzLmN1c3RvbVRpbWVJbnB1dH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgbGV0IGFyaWFMaXZlTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtzdGFydFBlcmlvZH0gLSAke2VuZFBlcmlvZH1gO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGAke2dldE1vbnRoSW5Mb2NhbGUoXG4gICAgICAgIGdldE1vbnRoKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgKX0gJHtnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fYXJpYS1saXZlXCJcbiAgICAgID5cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgYXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ2hpbGRyZW4gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fY2hpbGRyZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IENvbnRhaW5lciA9IHRoaXMucHJvcHMuY29udGFpbmVyIHx8IENhbGVuZGFyQ29udGFpbmVyO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6IFwiY29udGVudHNcIiB9fSByZWY9e3RoaXMuY29udGFpbmVyUmVmfT5cbiAgICAgICAgPENvbnRhaW5lclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcInJlYWN0LWRhdGVwaWNrZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlci0tdGltZS1vbmx5XCI6IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5LFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIHNob3dUaW1lPXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQXJpYUxpdmVSZWdpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJQcmV2aW91c0J1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck5leHRCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJNb250aHMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJZZWFycygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRvZGF5QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyVGltZVNlY3Rpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dFRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmNvbnN0IENhbGVuZGFySWNvbiA9ICh7IGljb24sIGNsYXNzTmFtZSA9IFwiXCIsIG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBkZWZhdWx0Q2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2NhbGVuZGFyLWljb25cIjtcblxuICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoaWNvbikpIHtcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGljb24sIHtcbiAgICAgIGNsYXNzTmFtZTogYCR7aWNvbi5wcm9wcy5jbGFzc05hbWUgfHwgXCJcIn0gJHtkZWZhdWx0Q2xhc3N9ICR7Y2xhc3NOYW1lfWAsXG4gICAgICBvbkNsaWNrOiAoZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGljb24ucHJvcHMub25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWNvbi5wcm9wcy5vbkNsaWNrKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBvbkNsaWNrKGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpY29uID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpXG4gICAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2ljb259ICR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICAvLyBEZWZhdWx0IFNWRyBJY29uXG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgY2xhc3NOYW1lPXtgJHtkZWZhdWx0Q2xhc3N9ICR7Y2xhc3NOYW1lfWB9XG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgID5cbiAgICAgIDxwYXRoIGQ9XCJNOTYgMzJWNjRINDhDMjEuNSA2NCAwIDg1LjUgMCAxMTJ2NDhINDQ4VjExMmMwLTI2LjUtMjEuNS00OC00OC00OEgzNTJWMzJjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJWNjRIMTYwVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMyUzk2IDE0LjMgOTYgMzJ6TTQ0OCAxOTJIMFY0NjRjMCAyNi41IDIxLjUgNDggNDggNDhINDAwYzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjE5MnpcIiAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuQ2FsZW5kYXJJY29uLnByb3BUeXBlcyA9IHtcbiAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhbGVuZGFySWNvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5hbnksXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvcnRhbFJvb3QgPSAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50KS5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRoaXMucHJvcHMucG9ydGFsSWQsXG4gICAgKTtcbiAgICBpZiAoIXRoaXMucG9ydGFsUm9vdCkge1xuICAgICAgdGhpcy5wb3J0YWxSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMucG9ydGFsUm9vdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0aGlzLnByb3BzLnBvcnRhbElkKTtcbiAgICAgICh0aGlzLnByb3BzLnBvcnRhbEhvc3QgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQodGhpcy5wb3J0YWxSb290KTtcbiAgICB9XG4gICAgdGhpcy5wb3J0YWxSb290LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290LnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwodGhpcy5wcm9wcy5jaGlsZHJlbiwgdGhpcy5lbCk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuLy8gVGFiTG9vcCBwcmV2ZW50cyB0aGUgdXNlciBmcm9tIHRhYmJpbmcgb3V0c2lkZSBvZiB0aGUgcG9wcGVyXG4vLyBJdCBjcmVhdGVzIGEgdGFiaW5kZXggbG9vcCBzbyB0aGF0IFwiVGFiXCIgb24gdGhlIGxhc3QgZWxlbWVudCB3aWxsIGZvY3VzIHRoZSBmaXJzdCBlbGVtZW50XG4vLyBhbmQgXCJTaGlmdCBUYWJcIiBvbiB0aGUgZmlyc3QgZWxlbWVudCB3aWxsIGZvY3VzIHRoZSBsYXN0IGVsZW1lbnRcblxuY29uc3QgZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciA9XG4gIFwiW3RhYmluZGV4XSwgYSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYVwiO1xuY29uc3QgZm9jdXNhYmxlRmlsdGVyID0gKG5vZGUpID0+ICFub2RlLmRpc2FibGVkICYmIG5vZGUudGFiSW5kZXggIT09IC0xO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJMb29wIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVuYWJsZVRhYkxvb3A6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5hbnksXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnRhYkxvb3BSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgfVxuXG4gIC8vIHF1ZXJ5IGFsbCBmb2N1c2FibGUgZWxlbWVudHNcbiAgLy8gdHJpbSBmaXJzdCBhbmQgbGFzdCBiZWNhdXNlIHRoZXkgYXJlIHRoZSBmb2N1cyBndWFyZHNcbiAgZ2V0VGFiQ2hpbGRyZW4gPSAoKSA9PlxuICAgIEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgLmNhbGwoXG4gICAgICAgIHRoaXMudGFiTG9vcFJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciksXG4gICAgICAgIDEsXG4gICAgICAgIC0xLFxuICAgICAgKVxuICAgICAgLmZpbHRlcihmb2N1c2FibGVGaWx0ZXIpO1xuXG4gIGhhbmRsZUZvY3VzU3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFiQ2hpbGRyZW4gPSB0aGlzLmdldFRhYkNoaWxkcmVuKCk7XG4gICAgdGFiQ2hpbGRyZW4gJiZcbiAgICAgIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiZcbiAgICAgIHRhYkNoaWxkcmVuW3RhYkNoaWxkcmVuLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gIH07XG5cbiAgaGFuZGxlRm9jdXNFbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFiQ2hpbGRyZW4gPSB0aGlzLmdldFRhYkNoaWxkcmVuKCk7XG4gICAgdGFiQ2hpbGRyZW4gJiYgdGFiQ2hpbGRyZW4ubGVuZ3RoID4gMSAmJiB0YWJDaGlsZHJlblswXS5mb2N1cygpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZW5hYmxlVGFiTG9vcCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wXCIgcmVmPXt0aGlzLnRhYkxvb3BSZWZ9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX3N0YXJ0XCJcbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXNTdGFydH1cbiAgICAgICAgLz5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcF9fZW5kXCJcbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXNFbmR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICB1c2VGbG9hdGluZyxcbiAgYXJyb3csXG4gIG9mZnNldCxcbiAgZmxpcCxcbiAgYXV0b1VwZGF0ZSxcbn0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgcG9wcGVyUGxhY2VtZW50UG9zaXRpb25zID0gW1xuICBcInRvcC1zdGFydFwiLFxuICBcInRvcC1lbmRcIixcbiAgXCJib3R0b20tc3RhcnRcIixcbiAgXCJib3R0b20tZW5kXCIsXG4gIFwicmlnaHQtc3RhcnRcIixcbiAgXCJyaWdodC1lbmRcIixcbiAgXCJsZWZ0LXN0YXJ0XCIsXG4gIFwibGVmdC1lbmRcIixcbiAgXCJ0b3BcIixcbiAgXCJyaWdodFwiLFxuICBcImJvdHRvbVwiLFxuICBcImxlZnRcIixcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhGbG9hdGluZyhDb21wb25lbnQpIHtcbiAgY29uc3QgV2l0aEZsb2F0aW5nID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgYWx0X3Byb3BzID0ge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBwb3BwZXJNb2RpZmllcnM6IHByb3BzLnBvcHBlck1vZGlmaWVycyB8fCBbXSxcbiAgICAgIHBvcHBlclByb3BzOiBwcm9wcy5wb3BwZXJQcm9wcyB8fCB7fSxcbiAgICAgIGhpZGVQb3BwZXI6XG4gICAgICAgIHR5cGVvZiBwcm9wcy5oaWRlUG9wcGVyID09PSBcImJvb2xlYW5cIiA/IHByb3BzLmhpZGVQb3BwZXIgOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3QgYXJyb3dSZWYgPSBSZWFjdC51c2VSZWYoKTtcbiAgICBjb25zdCBmbG9hdGluZ1Byb3BzID0gdXNlRmxvYXRpbmcoe1xuICAgICAgb3BlbjogIWFsdF9wcm9wcy5oaWRlUG9wcGVyLFxuICAgICAgd2hpbGVFbGVtZW50c01vdW50ZWQ6IGF1dG9VcGRhdGUsXG4gICAgICBwbGFjZW1lbnQ6IGFsdF9wcm9wcy5wb3BwZXJQbGFjZW1lbnQsXG4gICAgICBtaWRkbGV3YXJlOiBbXG4gICAgICAgIGZsaXAoeyBwYWRkaW5nOiAxNSB9KSxcbiAgICAgICAgb2Zmc2V0KDEwKSxcbiAgICAgICAgYXJyb3coeyBlbGVtZW50OiBhcnJvd1JlZiB9KSxcbiAgICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlck1vZGlmaWVycyxcbiAgICAgIF0sXG4gICAgICAuLi5hbHRfcHJvcHMucG9wcGVyUHJvcHMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudCB7Li4uYWx0X3Byb3BzfSBwb3BwZXJQcm9wcz17eyAuLi5mbG9hdGluZ1Byb3BzLCBhcnJvd1JlZiB9fSAvPlxuICAgICk7XG4gIH07XG5cbiAgV2l0aEZsb2F0aW5nLnByb3BUeXBlcyA9IHtcbiAgICBwb3BwZXJQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMpLFxuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaGlkZVBvcHBlcjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgcmV0dXJuIFdpdGhGbG9hdGluZztcbn1cbiIsImltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgRmxvYXRpbmdBcnJvdyB9IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgUG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuaW1wb3J0IHdpdGhGbG9hdGluZyBmcm9tIFwiLi93aXRoX2Zsb2F0aW5nXCI7XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG5leHBvcnQgY2xhc3MgUG9wcGVyQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZGVQb3BwZXI6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdyYXBwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGlkZVBvcHBlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9wcGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBwb3BwZXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRhcmdldENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9wcGVyT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93QXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICB3cmFwcGVyQ2xhc3NOYW1lLFxuICAgICAgaGlkZVBvcHBlcixcbiAgICAgIHBvcHBlckNvbXBvbmVudCxcbiAgICAgIHRhcmdldENvbXBvbmVudCxcbiAgICAgIGVuYWJsZVRhYkxvb3AsXG4gICAgICBwb3BwZXJPbktleURvd24sXG4gICAgICBwb3J0YWxJZCxcbiAgICAgIHBvcnRhbEhvc3QsXG4gICAgICBwb3BwZXJQcm9wcyxcbiAgICAgIHNob3dBcnJvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGxldCBwb3BwZXI7XG5cbiAgICBpZiAoIWhpZGVQb3BwZXIpIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlci1wb3BwZXJcIiwgY2xhc3NOYW1lKTtcbiAgICAgIHBvcHBlciA9IChcbiAgICAgICAgPFRhYkxvb3AgZW5hYmxlVGFiTG9vcD17ZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXtwb3BwZXJQcm9wcy5yZWZzLnNldEZsb2F0aW5nfVxuICAgICAgICAgICAgc3R5bGU9e3BvcHBlclByb3BzLmZsb2F0aW5nU3R5bGVzfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgZGF0YS1wbGFjZW1lbnQ9e3BvcHBlclByb3BzLnBsYWNlbWVudH1cbiAgICAgICAgICAgIG9uS2V5RG93bj17cG9wcGVyT25LZXlEb3dufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3BwZXJDb21wb25lbnR9XG4gICAgICAgICAgICB7c2hvd0Fycm93ICYmIChcbiAgICAgICAgICAgICAgPEZsb2F0aW5nQXJyb3dcbiAgICAgICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLmFycm93UmVmfVxuICAgICAgICAgICAgICAgIGNvbnRleHQ9e3BvcHBlclByb3BzLmNvbnRleHR9XG4gICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs4fVxuICAgICAgICAgICAgICAgIHdpZHRoPXsxNn1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlWSgtMXB4KVwiIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdHJpYW5nbGVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UYWJMb29wPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXIpIHtcbiAgICAgIHBvcHBlciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXIsIHt9LCBwb3BwZXIpO1xuICAgIH1cblxuICAgIGlmIChwb3J0YWxJZCAmJiAhaGlkZVBvcHBlcikge1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8UG9ydGFsIHBvcnRhbElkPXtwb3J0YWxJZH0gcG9ydGFsSG9zdD17cG9ydGFsSG9zdH0+XG4gICAgICAgICAge3BvcHBlcn1cbiAgICAgICAgPC9Qb3J0YWw+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc2VzID0gY2xzeChcInJlYWN0LWRhdGVwaWNrZXItd3JhcHBlclwiLCB3cmFwcGVyQ2xhc3NOYW1lKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxkaXYgcmVmPXtwb3BwZXJQcm9wcy5yZWZzLnNldFJlZmVyZW5jZX0gY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3Nlc30+XG4gICAgICAgICAge3RhcmdldENvbXBvbmVudH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtwb3BwZXJ9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aEZsb2F0aW5nKFBvcHBlckNvbXBvbmVudCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSBcIi4vY2FsZW5kYXJcIjtcbmltcG9ydCBDYWxlbmRhckljb24gZnJvbSBcIi4vY2FsZW5kYXJfaWNvblwiO1xuaW1wb3J0IFBvcnRhbCBmcm9tIFwiLi9wb3J0YWxcIjtcbmltcG9ydCBQb3BwZXJDb21wb25lbnQgZnJvbSBcIi4vcG9wcGVyX2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgcG9wcGVyUGxhY2VtZW50UG9zaXRpb25zIH0gZnJvbSBcIi4vd2l0aF9mbG9hdGluZ1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBzZXQgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0XCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZEYXlcIjtcbmltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mRGF5XCI7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSBcImRhdGUtZm5zL2lzVmFsaWRcIjtcbmltcG9ydCB7XG4gIG5ld0RhdGUsXG4gIGlzRGF0ZSxcbiAgaXNCZWZvcmUsXG4gIGlzQWZ0ZXIsXG4gIGlzRXF1YWwsXG4gIHNldFRpbWUsXG4gIGdldFNlY29uZHMsXG4gIGdldE1pbnV0ZXMsXG4gIGdldEhvdXJzLFxuICBhZGREYXlzLFxuICBhZGRNb250aHMsXG4gIGFkZFdlZWtzLFxuICBzdWJEYXlzLFxuICBzdWJNb250aHMsXG4gIHN1YldlZWtzLFxuICBhZGRZZWFycyxcbiAgc3ViWWVhcnMsXG4gIGlzRGF5RGlzYWJsZWQsXG4gIGlzRGF5SW5SYW5nZSxcbiAgZ2V0RWZmZWN0aXZlTWluRGF0ZSxcbiAgZ2V0RWZmZWN0aXZlTWF4RGF0ZSxcbiAgcGFyc2VEYXRlLFxuICBzYWZlRGF0ZUZvcm1hdCxcbiAgc2FmZURhdGVSYW5nZUZvcm1hdCxcbiAgZ2V0SGlnaHRMaWdodERheXNNYXAsXG4gIGdldFllYXIsXG4gIGdldE1vbnRoLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0RW5kT2ZXZWVrLFxuICByZWdpc3RlckxvY2FsZSxcbiAgc2V0RGVmYXVsdExvY2FsZSxcbiAgZ2V0RGVmYXVsdExvY2FsZSxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBpc1NhbWVEYXksXG4gIGlzTW9udGhEaXNhYmxlZCxcbiAgaXNZZWFyRGlzYWJsZWQsXG4gIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0LFxuICBnZXRIb2xpZGF5c01hcCxcbiAgaXNEYXRlQmVmb3JlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgVGFiTG9vcCBmcm9tIFwiLi90YWJfbG9vcFwiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIENhbGVuZGFyQ29udGFpbmVyIH0gZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5cbmV4cG9ydCB7IHJlZ2lzdGVyTG9jYWxlLCBzZXREZWZhdWx0TG9jYWxlLCBnZXREZWZhdWx0TG9jYWxlIH07XG5cbmNvbnN0IG91dHNpZGVDbGlja0lnbm9yZUNsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyLWlnbm9yZS1vbmNsaWNrb3V0c2lkZVwiO1xuY29uc3QgV3JhcHBlZENhbGVuZGFyID0gb25DbGlja091dHNpZGUoQ2FsZW5kYXIpO1xuXG4vLyBDb21wYXJlcyBkYXRlcyB5ZWFyK21vbnRoIGNvbWJpbmF0aW9uc1xuZnVuY3Rpb24gaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGdldE1vbnRoKGRhdGUxKSAhPT0gZ2V0TW9udGgoZGF0ZTIpIHx8IGdldFllYXIoZGF0ZTEpICE9PSBnZXRZZWFyKGRhdGUyKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZGF0ZTEgIT09IGRhdGUyO1xufVxuXG4vKipcbiAqIEdlbmVyYWwgZGF0ZXBpY2tlciBjb21wb25lbnQuXG4gKi9cbmNvbnN0IElOUFVUX0VSUl8xID0gXCJEYXRlIGlucHV0IG5vdCB2YWxpZC5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhbGxvd1NhbWVEYXk6IGZhbHNlLFxuICAgICAgZGF0ZUZvcm1hdDogXCJNTS9kZC95eXl5XCIsXG4gICAgICBkYXRlRm9ybWF0Q2FsZW5kYXI6IFwiTExMTCB5eXl5XCIsXG4gICAgICBvbkNoYW5nZSgpIHt9LFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgZHJvcGRvd25Nb2RlOiBcInNjcm9sbFwiLFxuICAgICAgb25Gb2N1cygpIHt9LFxuICAgICAgb25CbHVyKCkge30sXG4gICAgICBvbktleURvd24oKSB7fSxcbiAgICAgIG9uSW5wdXRDbGljaygpIHt9LFxuICAgICAgb25TZWxlY3QoKSB7fSxcbiAgICAgIG9uQ2xpY2tPdXRzaWRlKCkge30sXG4gICAgICBvbk1vbnRoQ2hhbmdlKCkge30sXG4gICAgICBvbkNhbGVuZGFyT3BlbigpIHt9LFxuICAgICAgb25DYWxlbmRhckNsb3NlKCkge30sXG4gICAgICBwcmV2ZW50T3Blbk9uRm9jdXM6IGZhbHNlLFxuICAgICAgb25ZZWFyQ2hhbmdlKCkge30sXG4gICAgICBvbklucHV0RXJyb3IoKSB7fSxcbiAgICAgIG1vbnRoc1Nob3duOiAxLFxuICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgd2l0aFBvcnRhbDogZmFsc2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogZmFsc2UsXG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgICAgc2hvd1RpbWVTZWxlY3Q6IGZhbHNlLFxuICAgICAgc2hvd1RpbWVJbnB1dDogZmFsc2UsXG4gICAgICBzaG93UHJldmlvdXNNb250aHM6IGZhbHNlLFxuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93V2Vla1BpY2tlcjogZmFsc2UsXG4gICAgICBzdHJpY3RQYXJzaW5nOiBmYWxzZSxcbiAgICAgIHN3YXBSYW5nZTogZmFsc2UsXG4gICAgICB0aW1lSW50ZXJ2YWxzOiAzMCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICB0aW1lSW5wdXRMYWJlbDogXCJUaW1lXCIsXG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgICAgeWVhckl0ZW1OdW1iZXI6IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgICAgIGZvY3VzU2VsZWN0ZWRNb250aDogZmFsc2UsXG4gICAgICBzaG93UG9wcGVyQXJyb3c6IHRydWUsXG4gICAgICBleGNsdWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgY3VzdG9tVGltZUlucHV0OiBudWxsLFxuICAgICAgY2FsZW5kYXJTdGFydERheTogdW5kZWZpbmVkLFxuICAgICAgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljazogZmFsc2UsXG4gICAgICB1c2VQb2ludGVyRXZlbnQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYWxsb3dTYW1lRGF5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhcmlhRGVzY3JpYmVkQnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUludmFsaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsQ2xvc2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsbGVkQnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYVJlcXVpcmVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF1dG9Db21wbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsb3NlT25TY3JvbGw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21JbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgY3VzdG9tSW5wdXRSZWY6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXNcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKSxcbiAgICBkYXRlRm9ybWF0Q2FsZW5kYXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljazogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgIF0pLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpY29uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICAgIGNhbGVuZGFySWNvbkNsYXNzbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DbGlja091dHNpZGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlUmF3OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0RXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2FsZW5kYXJPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNhbGVuZGFyQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHBsYWNlaG9sZGVyVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3BwZXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBvcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyTW9kaWZpZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSwgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSwgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcHJldmVudE9wZW5PbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZWFkT25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd01vbnRoRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dQcmV2aW91c01vbnRoczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcnM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0cmljdFBhcnNpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIHN3YXBSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc3RhcnRPcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YWJJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB0aW1lQ2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgdXNlV2Vla2RheXNTaG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla0RheTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2Vla0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0RhdGVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtaW5UaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhUaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJUaW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xlYXJCdXR0b25UaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZW5kZXJDdXN0b21IZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb2N1c1NlbGVjdGVkTW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aE1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dQb3BwZXJBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgZXhjbHVkZVNjcm9sbGJhcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpO1xuICAgIHRoaXMucHJldmVudEZvY3VzVGltZW91dCA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChcbiAgICAgIHByZXZQcm9wcy5pbmxpbmUgJiZcbiAgICAgIGhhc1ByZVNlbGVjdGlvbkNoYW5nZWQocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuc3RhdGUubW9udGhTZWxlY3RlZEluICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHByZXZQcm9wcy5tb250aHNTaG93biAhPT0gdGhpcy5wcm9wcy5tb250aHNTaG93blxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoU2VsZWN0ZWRJbjogMCB9KTtcbiAgICB9XG4gICAgaWYgKHByZXZQcm9wcy5oaWdobGlnaHREYXRlcyAhPT0gdGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAhcHJldlN0YXRlLmZvY3VzZWQgJiZcbiAgICAgICFpc0VxdWFsKHByZXZQcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgIH1cblxuICAgIGlmIChwcmV2U3RhdGUub3BlbiAhPT0gdGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpZiAocHJldlN0YXRlLm9wZW4gPT09IGZhbHNlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJPcGVuKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gdHJ1ZSAmJiB0aGlzLnN0YXRlLm9wZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhckNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5jbGVhclByZXZlbnRGb2N1c1RpbWVvdXQoKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgfVxuXG4gIGdldFByZVNlbGVjdGlvbiA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA/IHRoaXMucHJvcHMub3BlblRvRGF0ZVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNFbmQgJiYgdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c1N0YXJ0ICYmIHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgOiBuZXdEYXRlKCk7XG5cbiAgLy8gQ29udmVydCB0aGUgZGF0ZSBmcm9tIHN0cmluZyBmb3JtYXQgdG8gc3RhbmRhcmQgRGF0ZSBmb3JtYXRcbiAgbW9kaWZ5SG9saWRheXMgPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuaG9saWRheXM/LnJlZHVjZSgoYWNjdW11bGF0b3IsIGhvbGlkYXkpID0+IHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShob2xpZGF5LmRhdGUpO1xuICAgICAgaWYgKCFpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFsuLi5hY2N1bXVsYXRvciwgeyAuLi5ob2xpZGF5LCBkYXRlIH1dO1xuICAgIH0sIFtdKTtcblxuICBjYWxjSW5pdGlhbFN0YXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRQcmVTZWxlY3Rpb24gPSB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGNvbnN0IG1pbkRhdGUgPSBnZXRFZmZlY3RpdmVNaW5EYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IG1heERhdGUgPSBnZXRFZmZlY3RpdmVNYXhEYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGJvdW5kZWRQcmVTZWxlY3Rpb24gPVxuICAgICAgbWluRGF0ZSAmJiBpc0JlZm9yZShkZWZhdWx0UHJlU2VsZWN0aW9uLCBzdGFydE9mRGF5KG1pbkRhdGUpKVxuICAgICAgICA/IG1pbkRhdGVcbiAgICAgICAgOiBtYXhEYXRlICYmIGlzQWZ0ZXIoZGVmYXVsdFByZVNlbGVjdGlvbiwgZW5kT2ZEYXkobWF4RGF0ZSkpXG4gICAgICAgICAgPyBtYXhEYXRlXG4gICAgICAgICAgOiBkZWZhdWx0UHJlU2VsZWN0aW9uO1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiB0aGlzLnByb3BzLnN0YXJ0T3BlbiB8fCBmYWxzZSxcbiAgICAgIHByZXZlbnRGb2N1czogZmFsc2UsXG4gICAgICBwcmVTZWxlY3Rpb246XG4gICAgICAgICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQpID8/IGJvdW5kZWRQcmVTZWxlY3Rpb24sXG4gICAgICAvLyB0cmFuc2Zvcm1pbmcgaGlnaGxpZ2h0ZWQgZGF5cyAocGVyaGFwcyBuZXN0ZWQgYXJyYXkpXG4gICAgICAvLyB0byBmbGF0IE1hcCBmb3IgZmFzdGVyIGFjY2VzcyBpbiBkYXkuanN4XG4gICAgICBoaWdobGlnaHREYXRlczogZ2V0SGlnaHRMaWdodERheXNNYXAodGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcyksXG4gICAgICBmb2N1c2VkOiBmYWxzZSxcbiAgICAgIC8vIHVzZWQgdG8gZm9jdXMgZGF5IGluIGlubGluZSB2ZXJzaW9uIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkLCBidXQgbm90IG9uXG4gICAgICAvLyBpbml0aWFsIHJlbmRlclxuICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IGZhbHNlLFxuICAgICAgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH07XG4gIH07XG5cbiAgY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRGb2N1cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmZvY3VzKSB7XG4gICAgICB0aGlzLmlucHV0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0Qmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmJsdXIpIHtcbiAgICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICAgIH1cblxuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIHNldE9wZW4gPSAob3Blbiwgc2tpcFNldEJsdXIgPSBmYWxzZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIG9wZW46IG9wZW4sXG4gICAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgICBvcGVuICYmIHRoaXMuc3RhdGUub3BlblxuICAgICAgICAgICAgPyB0aGlzLnN0YXRlLnByZVNlbGVjdGlvblxuICAgICAgICAgICAgOiB0aGlzLmNhbGNJbml0aWFsU3RhdGUoKS5wcmVTZWxlY3Rpb24sXG4gICAgICAgIGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKCFvcGVuKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgIChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICBmb2N1c2VkOiBza2lwU2V0Qmx1ciA/IHByZXYuZm9jdXNlZCA6IGZhbHNlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICFza2lwU2V0Qmx1ciAmJiB0aGlzLnNldEJsdXIoKTtcblxuICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuICBpbnB1dE9rID0gKCkgPT4gaXNEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcblxuICBpc0NhbGVuZGFyT3BlbiA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5vcGVuID09PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5zdGF0ZS5vcGVuICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRPbmx5XG4gICAgICA6IHRoaXMucHJvcHMub3BlbjtcblxuICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5wcmV2ZW50Rm9jdXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICBpZiAoIXRoaXMucHJvcHMucHJldmVudE9wZW5PbkZvY3VzICYmICF0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IHRydWUgfSk7XG4gIH07XG5cbiAgc2VuZEZvY3VzQmFja1RvSW5wdXQgPSAoKSA9PiB7XG4gICAgLy8gQ2xlYXIgcHJldmlvdXMgdGltZW91dCBpZiBpdCBleGlzdHNcbiAgICBpZiAodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KSB7XG4gICAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIHRoZSBwb3BwZXIgYW5kIHJlZm9jdXMgdGhlIGlucHV0XG4gICAgLy8gc3RvcCB0aGUgaW5wdXQgZnJvbSBhdXRvIG9wZW5pbmcgb25Gb2N1c1xuICAgIC8vIHNldEZvY3VzIHRvIHRoZSBpbnB1dFxuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IHRydWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjYW5jZWxGb2N1c0lucHV0ID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmlucHV0Rm9jdXNUaW1lb3V0KTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfTtcblxuICBkZWZlckZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gICAgdGhpcy5pbnB1dEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRGb2N1cygpLCAxKTtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIGhhbmRsZUJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUub3BlbiB8fCB0aGlzLnByb3BzLndpdGhQb3J0YWwgfHwgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IGZhbHNlIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrT3V0c2lkZShldmVudCk7XG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFBvcnRhbCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKC4uLmFsbEFyZ3MpID0+IHtcbiAgICBsZXQgZXZlbnQgPSBhbGxBcmdzWzBdO1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlUmF3LmFwcGx5KHRoaXMsIGFsbEFyZ3MpO1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKClcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW5wdXRWYWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQsXG4gICAgfSk7XG4gICAgbGV0IGRhdGUgPSBwYXJzZURhdGUoXG4gICAgICBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuc3RyaWN0UGFyc2luZyxcbiAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICApO1xuICAgIC8vIFVzZSBkYXRlIGZyb20gYHNlbGVjdGVkYCBwcm9wIHdoZW4gbWFuaXB1bGF0aW5nIG9ubHkgdGltZSBmb3IgaW5wdXQgdmFsdWVcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSAmJlxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJlxuICAgICAgZGF0ZSAmJlxuICAgICAgIWlzU2FtZURheShkYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgZGF0ZSA9IHNldCh0aGlzLnByb3BzLnNlbGVjdGVkLCB7XG4gICAgICAgIGhvdXJzOiBnZXRIb3VycyhkYXRlKSxcbiAgICAgICAgbWludXRlczogZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgICAgc2Vjb25kczogZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZGF0ZSB8fCAhZXZlbnQudGFyZ2V0LnZhbHVlKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkKGRhdGUsIGV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0ID0gKGRhdGUsIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmICF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICAvLyBQcmV2ZW50aW5nIG9uRm9jdXMgZXZlbnQgdG8gZml4IGlzc3VlXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL2lzc3Vlcy82MjhcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcoZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlbGVjdGVkKGRhdGUsIGV2ZW50LCBmYWxzZSwgbW9udGhTZWxlY3RlZEluKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93RGF0ZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbihkYXRlKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgaWYgKFxuICAgICAgICBzdGFydERhdGUgJiZcbiAgICAgICAgIWVuZERhdGUgJiZcbiAgICAgICAgKHRoaXMucHJvcHMuc3dhcFJhbmdlIHx8ICFpc0RhdGVCZWZvcmUoZGF0ZSwgc3RhcnREYXRlKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBzZXRTZWxlY3RlZCA9IChkYXRlLCBldmVudCwga2VlcElucHV0LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSBkYXRlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZERhdGUgIT09IG51bGwgJiZcbiAgICAgICAgaXNZZWFyRGlzYWJsZWQoZ2V0WWVhcihjaGFuZ2VkRGF0ZSksIHRoaXMucHJvcHMpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNNb250aERpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc0RheURpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0c011bHRpcGxlLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICAgIG1pblRpbWUsXG4gICAgICBzd2FwUmFuZ2UsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhaXNFcXVhbCh0aGlzLnByb3BzLnNlbGVjdGVkLCBjaGFuZ2VkRGF0ZSkgfHxcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dTYW1lRGF5IHx8XG4gICAgICBzZWxlY3RzUmFuZ2UgfHxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZVxuICAgICkge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICAgICAgKCFrZWVwSW5wdXQgfHxcbiAgICAgICAgICAgICghdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgaG91cjogZ2V0SG91cnModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBzZWNvbmQ6IGdldFNlY29uZHModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBtaW5UaW1lIGlzIHByZXNlbnQgdGhlbiBzZXQgdGhlIHRpbWUgdG8gbWluVGltZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWtlZXBJbnB1dCAmJlxuICAgICAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobWluVGltZSkge1xuICAgICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICAgIGhvdXI6IG1pblRpbWUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgbWludXRlOiBtaW5UaW1lLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgc2Vjb25kOiBtaW5UaW1lLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmZvY3VzU2VsZWN0ZWRNb250aCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IG1vbnRoU2VsZWN0ZWRJbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdHNSYW5nZSkge1xuICAgICAgICBjb25zdCBub1JhbmdlcyA9ICFzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0UmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGlzUmFuZ2VGaWxsZWQgPSBzdGFydERhdGUgJiYgZW5kRGF0ZTtcbiAgICAgICAgaWYgKG5vUmFuZ2VzKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlZERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlQmVmb3JlKGNoYW5nZWREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgICBpZiAoc3dhcFJhbmdlKSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgc3RhcnREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbc3RhcnREYXRlLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmFuZ2VGaWxsZWQpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0c011bHRpcGxlKSB7XG4gICAgICAgIGlmICghc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZERhdGVzLnNvbWUoXG4gICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiBpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RGF0ZXMgPSBzZWxlY3RlZERhdGVzLmZpbHRlcihcbiAgICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gIWlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIG9uQ2hhbmdlKG5leHREYXRlcywgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbLi4uc2VsZWN0ZWREYXRlcywgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbkNoYW5nZShjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgha2VlcElucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gV2hlbiBjaGVja2luZyBwcmVTZWxlY3Rpb24gdmlhIG1pbi9tYXhEYXRlLCB0aW1lcyBuZWVkIHRvIGJlIG1hbmlwdWxhdGVkIHZpYSBzdGFydE9mRGF5L2VuZE9mRGF5XG4gIHNldFByZVNlbGVjdGlvbiA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgaGFzTWluRGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1pbkRhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgY29uc3QgaGFzTWF4RGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1heERhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgbGV0IGlzVmFsaWREYXRlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGUpO1xuICAgICAgaWYgKGhhc01pbkRhdGUgJiYgaGFzTWF4RGF0ZSkge1xuICAgICAgICAvLyBpc0RheUluUmFuZ2UgdXNlcyBzdGFydE9mRGF5IGludGVybmFsbHksIHNvIG5vdCBuZWNlc3NhcnkgdG8gbWFuaXB1bGF0ZSB0aW1lcyBoZXJlXG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID0gaXNEYXlJblJhbmdlKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWluRGF0ZSkge1xuICAgICAgICBjb25zdCBtaW5EYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkodGhpcy5wcm9wcy5taW5EYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQWZ0ZXIoZGF0ZSwgbWluRGF0ZVN0YXJ0T2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWluRGF0ZVN0YXJ0T2ZEYXkpO1xuICAgICAgfSBlbHNlIGlmIChoYXNNYXhEYXRlKSB7XG4gICAgICAgIGNvbnN0IG1heERhdGVFbmRPZkRheSA9IGVuZE9mRGF5KHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0JlZm9yZShkYXRlLCBtYXhEYXRlRW5kT2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWF4RGF0ZUVuZE9mRGF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzVmFsaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcHJlU2VsZWN0aW9uOiBkYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZUNhbGVuZGFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0T3BlbighdGhpcy5zdGF0ZS5vcGVuKTtcbiAgfTtcblxuICBoYW5kbGVUaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgOiB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGltZVxuICAgICAgOiBzZXRUaW1lKHNlbGVjdGVkLCB7XG4gICAgICAgICAgaG91cjogZ2V0SG91cnModGltZSksXG4gICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRpbWUpLFxuICAgICAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hhbmdlZERhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgb25JbnB1dENsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25JbnB1dENsaWNrKCk7XG4gIH07XG5cbiAgb25JbnB1dEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5zdGF0ZS5vcGVuICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1c1xuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiRW50ZXJcIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub25JbnB1dENsaWNrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgY2FsZW5kYXIgaXMgb3BlbiwgdGhlc2Uga2V5cyB3aWxsIGZvY3VzIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50S2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzZWxlY3RvclN0cmluZyA9XG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJiB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc1xuICAgICAgICAgICAgPyAnLnJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyW3RhYmluZGV4PVwiMFwiXSdcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlciB8fFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgICA/ICcucmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dFt0YWJpbmRleD1cIjBcIl0nXG4gICAgICAgICAgICAgIDogJy5yZWFjdC1kYXRlcGlja2VyX19kYXlbdGFiaW5kZXg9XCIwXCJdJztcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID1cbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUgJiZcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW0uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuaW5wdXRPaygpICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5sYXN0UHJlU2VsZWN0Q2hhbmdlID09PSBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiVGFiXCIpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uUG9ydGFsS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBwcmV2ZW50Rm9jdXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICAvLyBrZXlEb3duIGV2ZW50cyBwYXNzZWQgZG93biB0byBkYXkuanN4XG4gIG9uRGF5S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc1NoaWZ0S2V5QWN0aXZlID0gZXZlbnQuc2hpZnRLZXk7XG5cbiAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBsZXQgbmV3U2VsZWN0aW9uO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJEYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZERheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlVXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IHN1YlllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IHN1Yk1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBhZGRZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBhZGRNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJIb21lXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgICBjb3B5LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkVuZFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldEVuZE9mV2Vlayhjb3B5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFuZXdTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dEVycm9yKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgfSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZChuZXdTZWxlY3Rpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24obmV3U2VsZWN0aW9uKTtcbiAgICAgIC8vIG5lZWQgdG8gZmlndXJlIG91dCB3aGV0aGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvblxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgIGNvbnN0IHByZXZNb250aCA9IGdldE1vbnRoKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdNb250aCA9IGdldE1vbnRoKG5ld1NlbGVjdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZZZWFyID0gZ2V0WWVhcihjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3WWVhciA9IGdldFllYXIobmV3U2VsZWN0aW9uKTtcblxuICAgICAgICBpZiAocHJldk1vbnRoICE9PSBuZXdNb250aCB8fCBwcmV2WWVhciAhPT0gbmV3WWVhcikge1xuICAgICAgICAgIC8vIG1vbnRoIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1vbnRoIGhhc24ndCBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBoYW5kbGUgZ2VuZXJpYyBrZXkgZG93biBldmVudHMgaW4gdGhlIHBvcHBlciB0aGF0IGRvIG5vdCBhZGp1c3Qgb3Igc2VsZWN0IGRhdGVzXG4gIC8vIGV4OiB3aGlsZSBmb2N1c2luZyBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnNcbiAgb25Qb3BwZXJLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgfTtcblxuICBvbkNsZWFyQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsLCBldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIGNsZWFyID0gKCkgPT4ge1xuICAgIHRoaXMub25DbGVhckNsaWNrKCk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImJvb2xlYW5cIiAmJlxuICAgICAgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbChldmVudCkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5pc0NhbGVuZGFyT3BlbigpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxXcmFwcGVkQ2FsZW5kYXJcbiAgICAgICAgcmVmPXsoZWxlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbGVtO1xuICAgICAgICB9fVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnNldE9wZW59XG4gICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0Q2FsZW5kYXJ9XG4gICAgICAgIHVzZVdlZWtkYXlzU2hvcnQ9e3RoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydH1cbiAgICAgICAgZm9ybWF0V2Vla0RheT17dGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5fVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnN0YXRlLnByZVNlbGVjdGlvbn1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICBvbkNsaWNrT3V0c2lkZT17dGhpcy5oYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZX1cbiAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5zdGF0ZS5oaWdobGlnaHREYXRlc31cbiAgICAgICAgaG9saWRheXM9e2dldEhvbGlkYXlzTWFwKHRoaXMubW9kaWZ5SG9saWRheXMoKSl9XG4gICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMuc3RhdGUuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgIHNob3dQcmV2aW91c01vbnRocz17dGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHN9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgd2Vla0xhYmVsPXt0aGlzLnByb3BzLndlZWtMYWJlbH1cbiAgICAgICAgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3M9e291dHNpZGVDbGlja0lnbm9yZUNsYXNzfVxuICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgbW9udGhzU2hvd249e3RoaXMucHJvcHMubW9udGhzU2hvd259XG4gICAgICAgIG1vbnRoU2VsZWN0ZWRJbj17dGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW59XG4gICAgICAgIG9uRHJvcGRvd25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgICBvbk1vbnRoQ2hhbmdlPXt0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2V9XG4gICAgICAgIG9uWWVhckNoYW5nZT17dGhpcy5wcm9wcy5vblllYXJDaGFuZ2V9XG4gICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgIHdlZWtEYXlDbGFzc05hbWU9e3RoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZX1cbiAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgc2hvd0RhdGVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICBvblRpbWVDaGFuZ2U9e3RoaXMuaGFuZGxlVGltZUNoYW5nZX1cbiAgICAgICAgdGltZUZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICB0aW1lSW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2FsZW5kYXJDbGFzc05hbWV9XG4gICAgICAgIGNvbnRhaW5lcj17dGhpcy5wcm9wcy5jYWxlbmRhckNvbnRhaW5lcn1cbiAgICAgICAgeWVhckl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckl0ZW1OdW1iZXJ9XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0TW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgICBuZXh0TW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQXJpYUxhYmVsfVxuICAgICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgcmVuZGVyQ3VzdG9tSGVhZGVyPXt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcn1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXJ9XG4gICAgICAgIG9uTW9udGhNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgIHNob3dUaW1lSW5wdXQ9e3RoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICBleGNsdWRlU2Nyb2xsYmFyPXt0aGlzLnByb3BzLmV4Y2x1ZGVTY3JvbGxiYXJ9XG4gICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5vbktleURvd259XG4gICAgICAgIGhhbmRsZU9uRGF5S2V5RG93bj17dGhpcy5vbkRheUtleURvd259XG4gICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnN0YXRlLmZvY3VzZWR9XG4gICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgIHllYXJDbGFzc05hbWU9e3RoaXMucHJvcHMueWVhckNsYXNzTmFtZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L1dyYXBwZWRDYWxlbmRhcj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzQ29udGFpbnNUaW1lID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0O1xuICAgIGNvbnN0IGxvbmdEYXRlRm9ybWF0ID0gaXNDb250YWluc1RpbWUgPyBcIlBQUFBwXCIgOiBcIlBQUFBcIjtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgc3RhcnQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgIH0sXG4gICAgICApfS4gJHtcbiAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyBcIkVuZCBkYXRlOiBcIiArXG4gICAgICAgICAgICBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLmVuZERhdGUsIHtcbiAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB0aW1lOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB5ZWFyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcInl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBtb250aDogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJNTU1NIHl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHF1YXJ0ZXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBcInl5eXksIFFRUVwiLFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7YXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsc3godGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgIFtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc106IHRoaXMuc3RhdGUub3BlbixcbiAgICB9KTtcblxuICAgIGNvbnN0IGN1c3RvbUlucHV0ID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dCB8fCA8aW5wdXQgdHlwZT1cInRleHRcIiAvPjtcbiAgICBjb25zdCBjdXN0b21JbnB1dFJlZiA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXRSZWYgfHwgXCJyZWZcIjtcbiAgICBjb25zdCBpbnB1dFZhbHVlID1cbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICA6IHR5cGVvZiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICA/IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICAgID8gc2FmZURhdGVSYW5nZUZvcm1hdChcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgICAgICAgICA/IHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcywgdGhpcy5wcm9wcylcbiAgICAgICAgICAgICAgOiBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzKTtcblxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tSW5wdXQsIHtcbiAgICAgIFtjdXN0b21JbnB1dFJlZl06IChpbnB1dCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICB9LFxuICAgICAgdmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1cixcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25JbnB1dENsaWNrLFxuICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgZm9ybTogdGhpcy5wcm9wcy5mb3JtLFxuICAgICAgYXV0b0ZvY3VzOiB0aGlzLnByb3BzLmF1dG9Gb2N1cyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyVGV4dCxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgYXV0b0NvbXBsZXRlOiB0aGlzLnByb3BzLmF1dG9Db21wbGV0ZSxcbiAgICAgIGNsYXNzTmFtZTogY2xzeChjdXN0b21JbnB1dC5wcm9wcy5jbGFzc05hbWUsIGNsYXNzTmFtZSksXG4gICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucHJvcHMucmVxdWlyZWQsXG4gICAgICB0YWJJbmRleDogdGhpcy5wcm9wcy50YWJJbmRleCxcbiAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiB0aGlzLnByb3BzLmFyaWFEZXNjcmliZWRCeSxcbiAgICAgIFwiYXJpYS1pbnZhbGlkXCI6IHRoaXMucHJvcHMuYXJpYUludmFsaWQsXG4gICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aGlzLnByb3BzLmFyaWFMYWJlbGxlZEJ5LFxuICAgICAgXCJhcmlhLXJlcXVpcmVkXCI6IHRoaXMucHJvcHMuYXJpYVJlcXVpcmVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlckNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ2xlYXJhYmxlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBjbGVhckJ1dHRvblRpdGxlLFxuICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUgPSBcIlwiLFxuICAgICAgYXJpYUxhYmVsQ2xvc2UgPSBcIkNsb3NlXCIsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChcbiAgICAgIGlzQ2xlYXJhYmxlICYmXG4gICAgICAoc2VsZWN0ZWQgIT0gbnVsbCB8fFxuICAgICAgICBzdGFydERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBlbmREYXRlICE9IG51bGwgfHxcbiAgICAgICAgc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvblwiLFxuICAgICAgICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUsXG4gICAgICAgICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvbi0tZGlzYWJsZWRcIjogZGlzYWJsZWQgfSxcbiAgICAgICAgICApfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWxDbG9zZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xlYXJDbGlja31cbiAgICAgICAgICB0aXRsZT17Y2xlYXJCdXR0b25UaXRsZX1cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRDb250YWluZXIoKSB7XG4gICAgY29uc3QgeyBzaG93SWNvbiwgaWNvbiwgY2FsZW5kYXJJY29uQ2xhc3NuYW1lLCB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9wZW4gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19pbnB1dC1jb250YWluZXIke1xuICAgICAgICAgIHNob3dJY29uID8gXCIgcmVhY3QtZGF0ZXBpY2tlcl9fdmlldy1jYWxlbmRhci1pY29uXCIgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICB7c2hvd0ljb24gJiYgKFxuICAgICAgICAgIDxDYWxlbmRhckljb25cbiAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake2NhbGVuZGFySWNvbkNsYXNzbmFtZX0gJHtcbiAgICAgICAgICAgICAgb3BlbiAmJiBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgey4uLih0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy50b2dnbGVDYWxlbmRhcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgdGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJEYXRlSW5wdXQoKX1cbiAgICAgICAge3RoaXMucmVuZGVyQ2xlYXJCdXR0b24oKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2FsZW5kYXIgPSB0aGlzLnJlbmRlckNhbGVuZGFyKCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHJldHVybiBjYWxlbmRhcjtcblxuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGxldCBwb3J0YWxDb250YWluZXIgPSB0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcG9ydGFsXCJcbiAgICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblBvcnRhbEtleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NhbGVuZGFyfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApIDogbnVsbDtcblxuICAgICAgaWYgKHRoaXMuc3RhdGUub3BlbiAmJiB0aGlzLnByb3BzLnBvcnRhbElkKSB7XG4gICAgICAgIHBvcnRhbENvbnRhaW5lciA9IChcbiAgICAgICAgICA8UG9ydGFsXG4gICAgICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICAgIDwvUG9ydGFsPlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wcGVyQ29tcG9uZW50XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wb3BwZXJDbGFzc05hbWV9XG4gICAgICAgIHdyYXBwZXJDbGFzc05hbWU9e3RoaXMucHJvcHMud3JhcHBlckNsYXNzTmFtZX1cbiAgICAgICAgaGlkZVBvcHBlcj17IXRoaXMuaXNDYWxlbmRhck9wZW4oKX1cbiAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgcG9wcGVyTW9kaWZpZXJzPXt0aGlzLnByb3BzLnBvcHBlck1vZGlmaWVyc31cbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50PXt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgIHBvcHBlckNvbnRhaW5lcj17dGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXJ9XG4gICAgICAgIHBvcHBlckNvbXBvbmVudD17Y2FsZW5kYXJ9XG4gICAgICAgIHBvcHBlclBsYWNlbWVudD17dGhpcy5wcm9wcy5wb3BwZXJQbGFjZW1lbnR9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICBwb3BwZXJPbktleURvd249e3RoaXMub25Qb3BwZXJLZXlEb3dufVxuICAgICAgICBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9XG4gICAgICAgIHNob3dBcnJvdz17dGhpcy5wcm9wcy5zaG93UG9wcGVyQXJyb3d9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQgPSBcImlucHV0XCI7XG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSA9IFwibmF2aWdhdGVcIjtcbiJdLCJuYW1lcyI6WyJERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIiLCJsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsIm5ld0RhdGUiLCJ2YWx1ZSIsImQiLCJTdHJpbmciLCJwYXJzZUlTTyIsInRvRGF0ZSIsIkRhdGUiLCJpc1ZhbGlkIiwicGFyc2VEYXRlIiwiZGF0ZUZvcm1hdCIsImxvY2FsZSIsInN0cmljdFBhcnNpbmciLCJtaW5EYXRlIiwicGFyc2VkRGF0ZSIsImxvY2FsZU9iamVjdCIsImdldExvY2FsZU9iamVjdCIsImdldERlZmF1bHRMb2NhbGUiLCJzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJkZiIsInRyeVBhcnNlRGF0ZSIsInBhcnNlIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwidXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyIsImZvcm1hdERhdGUiLCJtYXRjaCIsIm1hcCIsInN1YnN0cmluZyIsImZpcnN0Q2hhcmFjdGVyIiwibG9uZ0Zvcm1hdHRlciIsImxvbmdGb3JtYXR0ZXJzIiwiZm9ybWF0TG9uZyIsImpvaW4iLCJsZW5ndGgiLCJzbGljZSIsImRhdGUiLCJpc1ZhbGlkRGF0ZSIsImlzQmVmb3JlIiwiZm9ybWF0U3RyIiwiZm9ybWF0IiwibG9jYWxlT2JqIiwiY29uc29sZSIsIndhcm4iLCJjb25jYXQiLCJzYWZlRGF0ZUZvcm1hdCIsIl9yZWYiLCJzYWZlRGF0ZVJhbmdlRm9ybWF0Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInByb3BzIiwiZm9ybWF0dGVkU3RhcnREYXRlIiwiZm9ybWF0dGVkRW5kRGF0ZSIsInNhZmVNdWx0aXBsZURhdGVzRm9ybWF0IiwiZGF0ZXMiLCJmb3JtYXR0ZWRGaXJzdERhdGUiLCJmb3JtYXR0ZWRTZWNvbmREYXRlIiwiZXh0cmFEYXRlc0NvdW50Iiwic2V0VGltZSIsIl9yZWYyIiwiX3JlZjIkaG91ciIsImhvdXIiLCJfcmVmMiRtaW51dGUiLCJtaW51dGUiLCJfcmVmMiRzZWNvbmQiLCJzZWNvbmQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwiZ2V0V2VlayIsImdldElTT1dlZWsiLCJnZXREYXlPZldlZWtDb2RlIiwiZGF5IiwiZ2V0U3RhcnRPZkRheSIsInN0YXJ0T2ZEYXkiLCJnZXRTdGFydE9mV2VlayIsImNhbGVuZGFyU3RhcnREYXkiLCJzdGFydE9mV2VlayIsIndlZWtTdGFydHNPbiIsImdldFN0YXJ0T2ZNb250aCIsInN0YXJ0T2ZNb250aCIsImdldFN0YXJ0T2ZZZWFyIiwic3RhcnRPZlllYXIiLCJnZXRTdGFydE9mUXVhcnRlciIsInN0YXJ0T2ZRdWFydGVyIiwiZ2V0U3RhcnRPZlRvZGF5IiwiZ2V0RW5kT2ZXZWVrIiwiZW5kT2ZXZWVrIiwiaXNTYW1lWWVhciIsImRhdGUxIiwiZGF0ZTIiLCJkZklzU2FtZVllYXIiLCJpc1NhbWVNb250aCIsImRmSXNTYW1lTW9udGgiLCJpc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVRdWFydGVyIiwiaXNTYW1lRGF5IiwiZGZJc1NhbWVEYXkiLCJpc0VxdWFsIiwiZGZJc0VxdWFsIiwiaXNEYXlJblJhbmdlIiwidmFsaWQiLCJzdGFydCIsImVuZCIsImVuZE9mRGF5IiwiaXNXaXRoaW5JbnRlcnZhbCIsImVyciIsInJlZ2lzdGVyTG9jYWxlIiwibG9jYWxlTmFtZSIsImxvY2FsZURhdGEiLCJzY29wZSIsIndpbmRvdyIsImdsb2JhbFRoaXMiLCJfX2xvY2FsZURhdGFfXyIsInNldERlZmF1bHRMb2NhbGUiLCJfX2xvY2FsZUlkX18iLCJsb2NhbGVTcGVjIiwiZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlIiwiZm9ybWF0RnVuYyIsImdldFdlZWtkYXlNaW5JbkxvY2FsZSIsImdldFdlZWtkYXlTaG9ydEluTG9jYWxlIiwiZ2V0TW9udGhJbkxvY2FsZSIsIm1vbnRoIiwic2V0TW9udGgiLCJnZXRNb250aFNob3J0SW5Mb2NhbGUiLCJnZXRRdWFydGVyU2hvcnRJbkxvY2FsZSIsInF1YXJ0ZXIiLCJzZXRRdWFydGVyIiwiaXNEYXlEaXNhYmxlZCIsIl9yZWYzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwibWF4RGF0ZSIsImV4Y2x1ZGVEYXRlcyIsImV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIiwiaW5jbHVkZURhdGVzIiwiaW5jbHVkZURhdGVJbnRlcnZhbHMiLCJmaWx0ZXJEYXRlIiwiaXNPdXRPZkJvdW5kcyIsInNvbWUiLCJleGNsdWRlRGF0ZSIsIl9yZWY0IiwiaW5jbHVkZURhdGUiLCJfcmVmNSIsImlzRGF5RXhjbHVkZWQiLCJfcmVmNiIsIl9yZWY3IiwiaXNNb250aERpc2FibGVkIiwiX3JlZjgiLCJlbmRPZk1vbnRoIiwiaXNNb250aEluUmFuZ2UiLCJtIiwic3RhcnREYXRlWWVhciIsImdldFllYXIiLCJzdGFydERhdGVNb250aCIsImdldE1vbnRoIiwiZW5kRGF0ZVllYXIiLCJlbmREYXRlTW9udGgiLCJkYXlZZWFyIiwiaXNRdWFydGVyRGlzYWJsZWQiLCJfcmVmOSIsImlzWWVhckluUmFuZ2UiLCJ5ZWFyIiwic3RhcnRZZWFyIiwiZW5kWWVhciIsImlzWWVhckRpc2FibGVkIiwiX3JlZjEwIiwiZW5kT2ZZZWFyIiwiaXNRdWFydGVySW5SYW5nZSIsInEiLCJzdGFydERhdGVRdWFydGVyIiwiZ2V0UXVhcnRlciIsImVuZERhdGVRdWFydGVyIiwiX3JlZjExIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiaXNUaW1lSW5MaXN0IiwidGltZSIsInRpbWVzIiwibGlzdFRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiaXNUaW1lRGlzYWJsZWQiLCJfcmVmMTIiLCJleGNsdWRlVGltZXMiLCJpbmNsdWRlVGltZXMiLCJmaWx0ZXJUaW1lIiwiaXNUaW1lSW5EaXNhYmxlZFJhbmdlIiwiX3JlZjEzIiwibWluVGltZSIsIm1heFRpbWUiLCJFcnJvciIsImJhc2VUaW1lIiwibWluIiwibWF4IiwibW9udGhEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNCIsInByZXZpb3VzTW9udGgiLCJzdWJNb250aHMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyIsImV2ZXJ5IiwibW9udGhEaXNhYmxlZEFmdGVyIiwiX3JlZjE1IiwibmV4dE1vbnRoIiwiYWRkTW9udGhzIiwicXVhcnRlckRpc2FibGVkQmVmb3JlIiwiX3JlZjE2IiwiZmlyc3REYXRlT2ZZZWFyIiwicHJldmlvdXNRdWFydGVyIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwicXVhcnRlckRpc2FibGVkQWZ0ZXIiLCJfcmVmMTciLCJsYXN0RGF0ZU9mWWVhciIsIm5leHRRdWFydGVyIiwiYWRkUXVhcnRlcnMiLCJ5ZWFyRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTgiLCJwcmV2aW91c1llYXIiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQmVmb3JlIiwiX3JlZjE5IiwiX3JlZjE5JHllYXJJdGVtTnVtYmVyIiwieWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QiLCJnZXRZZWFyc1BlcmlvZCIsImVuZFBlcmlvZCIsIm1pbkRhdGVZZWFyIiwieWVhckRpc2FibGVkQWZ0ZXIiLCJfcmVmMjAiLCJuZXh0WWVhciIsImFkZFllYXJzIiwieWVhcnNEaXNhYmxlZEFmdGVyIiwiX3JlZjIxIiwiX3JlZjIxJHllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kMiIsInN0YXJ0UGVyaW9kIiwibWF4RGF0ZVllYXIiLCJnZXRFZmZlY3RpdmVNaW5EYXRlIiwiX3JlZjIyIiwibWluRGF0ZXMiLCJmaWx0ZXIiLCJnZXRFZmZlY3RpdmVNYXhEYXRlIiwiX3JlZjIzIiwibWF4RGF0ZXMiLCJnZXRIaWdodExpZ2h0RGF5c01hcCIsImhpZ2hsaWdodERhdGVzIiwiZGVmYXVsdENsYXNzTmFtZSIsImRhdGVDbGFzc2VzIiwiTWFwIiwiaSIsImxlbiIsIm9iaiIsImlzRGF0ZSIsImtleSIsImNsYXNzTmFtZXNBcnIiLCJnZXQiLCJpbmNsdWRlcyIsInB1c2giLCJzZXQiLCJfdHlwZW9mIiwia2V5cyIsIk9iamVjdCIsImNsYXNzTmFtZSIsImFyck9mRGF0ZXMiLCJjb25zdHJ1Y3RvciIsImsiLCJhcnJheXNBcmVFcXVhbCIsImFycmF5MSIsImFycmF5MiIsImluZGV4IiwiZ2V0SG9saWRheXNNYXAiLCJob2xpZGF5RGF0ZXMiLCJob2xpZGF5IiwiZGF0ZU9iaiIsImhvbGlkYXlOYW1lIiwiY2xhc3NOYW1lc09iaiIsImhvbGlkYXlOYW1lQXJyIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwidGltZXNUb0luamVjdEFmdGVyIiwiY3VycmVudFRpbWUiLCJjdXJyZW50TXVsdGlwbGllciIsImludGVydmFscyIsImluamVjdGVkVGltZXMiLCJsIiwiaW5qZWN0ZWRUaW1lIiwiYWRkSG91cnMiLCJhZGRNaW51dGVzIiwiYWRkU2Vjb25kcyIsIm5leHRUaW1lIiwiaXNBZnRlciIsImFkZFplcm8iLCJNYXRoIiwiY2VpbCIsImdldEhvdXJzSW5EYXkiLCJnZXRGdWxsWWVhciIsImdldERhdGUiLCJzdGFydE9mVGhlTmV4dERheSIsInJvdW5kIiwic3RhcnRPZk1pbnV0ZSIsInNlY29uZHMiLCJtaWxsaXNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJnZXRUaW1lIiwiaXNTYW1lTWludXRlIiwiZDEiLCJkMiIsImdldE1pZG5pZ2h0RGF0ZSIsImRhdGVXaXRob3V0VGltZSIsImlzRGF0ZUJlZm9yZSIsImRhdGVUb0NvbXBhcmUiLCJtaWRuaWdodERhdGUiLCJtaWRuaWdodERhdGVUb0NvbXBhcmUiLCJpc1NwYWNlS2V5RG93biIsImV2ZW50IiwiU1BBQ0VfS0VZIiwiZ2VuZXJhdGVZZWFycyIsIm5vT2ZZZWFyIiwibGlzdCIsIm5ld1llYXIiLCJpc0luUmFuZ2UiLCJZZWFyRHJvcGRvd25PcHRpb25zIiwiX1JlYWN0JENvbXBvbmVudCIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIl9kZWZpbmVQcm9wZXJ0eSIsInNlbGVjdGVkWWVhciIsIm9wdGlvbnMiLCJzdGF0ZSIsInllYXJzTGlzdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIm9uQ2xpY2siLCJvbkNoYW5nZSIsImJpbmQiLCJtaW5ZZWFyIiwibWF4WWVhciIsImZpbmQiLCJ1bnNoaWZ0IiwiaW5jcmVtZW50WWVhcnMiLCJkZWNyZW1lbnRZZWFycyIsIm9uQ2FuY2VsIiwiYW1vdW50IiwieWVhcnMiLCJzZXRTdGF0ZSIsInNoaWZ0WWVhcnMiLCJ5ZWFyRHJvcGRvd25JdGVtTnVtYmVyIiwic2Nyb2xsYWJsZVllYXJEcm9wZG93biIsImRyb3Bkb3duUmVmIiwiY3JlYXRlUmVmIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkN1cnJlbnQiLCJjdXJyZW50IiwiZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4iLCJjaGlsZHJlbiIsImZyb20iLCJzZWxlY3RlZFllYXJPcHRpb25FbCIsImNoaWxkRWwiLCJhcmlhU2VsZWN0ZWQiLCJzY3JvbGxUb3AiLCJvZmZzZXRUb3AiLCJjbGllbnRIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJyZW5kZXIiLCJkcm9wZG93bkNsYXNzIiwiY2xzeCIsInJlZiIsInJlbmRlck9wdGlvbnMiLCJDb21wb25lbnQiLCJXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyIsIm9uQ2xpY2tPdXRzaWRlIiwiWWVhckRyb3Bkb3duIiwiX2xlbiIsImFyZ3MiLCJfa2V5IiwiZHJvcGRvd25WaXNpYmxlIiwiZSIsInRhcmdldCIsIm9uU2VsZWN0Q2hhbmdlIiwicmVuZGVyU2VsZWN0T3B0aW9ucyIsInZpc2libGUiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJ0b2dnbGVEcm9wZG93biIsInJlc3VsdCIsInJlbmRlclJlYWRWaWV3IiwicmVuZGVyRHJvcGRvd24iLCJhZGp1c3REYXRlT25DaGFuZ2UiLCJoYW5kbGVZZWFyQ2hhbmdlIiwib25TZWxlY3QiLCJzZXRPcGVuIiwicmVuZGVyZWREcm9wZG93biIsImRyb3Bkb3duTW9kZSIsInJlbmRlclNjcm9sbE1vZGUiLCJyZW5kZXJTZWxlY3RNb2RlIiwiTW9udGhEcm9wZG93bk9wdGlvbnMiLCJtb250aE5hbWVzIiwiaXNTZWxlY3RlZE1vbnRoIiwiV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zIiwiTW9udGhEcm9wZG93biIsIk0iLCJfdGhpczIiLCJ1c2VTaG9ydE1vbnRoSW5Ecm9wZG93biIsInV0aWxzIiwiZ2VuZXJhdGVNb250aFllYXJzIiwiY3VyckRhdGUiLCJsYXN0RGF0ZSIsIk1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIm1vbnRoWWVhcnNMaXN0IiwibW9udGhZZWFyIiwibW9udGhZZWFyUG9pbnQiLCJpc1NhbWVNb250aFllYXIiLCJzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24iLCJXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwiTW9udGhZZWFyRHJvcGRvd24iLCJ0aW1lUG9pbnQiLCJ5ZWFyTW9udGgiLCJjaGFuZ2VkRGF0ZSIsInBhcnNlSW50IiwiRGF5IiwiaXNEaXNhYmxlZCIsIm9uTW91c2VFbnRlciIsImV2ZW50S2V5IiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVPbktleURvd24iLCJvdGhlciIsIl90aGlzJHByb3BzJHNlbGVjdGVkRCIsImRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uIiwiaXNTZWxlY3RlZERhdGUiLCJzZWxlY3RzTXVsdGlwbGUiLCJzZWxlY3RlZERhdGVzIiwiaXNTYW1lRGF5T3JXZWVrIiwic2VsZWN0ZWQiLCJwcmVTZWxlY3Rpb24iLCJzaG93V2Vla1BpY2tlciIsImlzU2FtZVdlZWsiLCJfdGhpcyRwcm9wcyIsImRheVN0ciIsIl90aGlzJHByb3BzMiIsImhvbGlkYXlzIiwiaGFzIiwiX3RoaXMkcHJvcHMzIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nIiwiX3RoaXMkcHJvcHM0Iiwic2VsZWN0c1N0YXJ0Iiwic2VsZWN0c0VuZCIsInNlbGVjdHNSYW5nZSIsInNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlIiwic2VsZWN0aW5nRGF0ZSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzIiLCJpc0luU2VsZWN0aW5nUmFuZ2UiLCJfdGhpcyRwcm9wczUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmczIiwiX3RoaXMkcHJvcHM2IiwiX3RoaXMkcHJvcHM3IiwiX3RoaXMkcHJvcHM4Iiwid2Vla2RheSIsImdldERheSIsIl90aGlzJHByb3BzJHNlbGVjdGVkRDIiLCJkYXlDbGFzc05hbWUiLCJpc0V4Y2x1ZGVkIiwiaXNTZWxlY3RlZCIsImlzS2V5Ym9hcmRTZWxlY3RlZCIsImlzUmFuZ2VTdGFydCIsImlzUmFuZ2VFbmQiLCJpc1NlbGVjdGluZ1JhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ1JhbmdlRW5kIiwiaXNDdXJyZW50RGF5IiwiaXNXZWVrZW5kIiwiaXNBZnRlck1vbnRoIiwiaXNCZWZvcmVNb250aCIsImdldEhpZ2hMaWdodGVkQ2xhc3MiLCJnZXRIb2xpZGF5c0NsYXNzIiwiX3RoaXMkcHJvcHM5IiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlIiwiYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUyIiwiYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkIiwicHJlZml4IiwiX3RoaXMkcHJvcHMxMCIsIl90aGlzJHByb3BzMTAkaG9saWRheSIsImNvbXBhcmVEdCIsInRpdGxlcyIsImFwcGx5IiwiaG9saWRheU5hbWVzIiwibWVzc2FnZSIsInNlbGVjdGVkRGF5IiwicHJlU2VsZWN0aW9uRGF5IiwidGFiSW5kZXgiLCJzaG93V2Vla051bWJlciIsImlzU3RhcnRPZldlZWsiLCJfdGhpcyRkYXlFbCRjdXJyZW50IiwicHJldlByb3BzIiwic2hvdWxkRm9jdXNEYXkiLCJnZXRUYWJJbmRleCIsImlzSW5wdXRGb2N1c2VkIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiYm9keSIsImlubGluZSIsInNob3VsZEZvY3VzRGF5SW5saW5lIiwiY29udGFpbmVyUmVmIiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQiLCJkYXlFbCIsImZvY3VzIiwicHJldmVudFNjcm9sbCIsInJlbmRlckRheUNvbnRlbnRzIiwiZ2V0Q2xhc3NOYW1lcyIsIm9uS2V5RG93biIsImhhbmRsZUNsaWNrIiwidXNlUG9pbnRlckV2ZW50IiwiaGFuZGxlTW91c2VFbnRlciIsIm9uUG9pbnRlckVudGVyIiwiZ2V0QXJpYUxhYmVsIiwicm9sZSIsInRpdGxlIiwiZ2V0VGl0bGUiLCJoYW5kbGVGb2N1c0RheSIsImNvbXBvbmVudERpZFVwZGF0ZSIsIldlZWtOdW1iZXIiLCJzaG91bGRGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyRWwiLCJoYW5kbGVGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyIiwiX3RoaXMkcHJvcHMkYXJpYUxhYmVsIiwiYXJpYUxhYmVsUHJlZml4Iiwid2Vla051bWJlckNsYXNzZXMiLCJXZWVrIiwib25EYXlDbGljayIsIm9uRGF5TW91c2VFbnRlciIsIm9uV2Vla1NlbGVjdCIsImhhbmRsZURheUNsaWNrIiwic2hvdWxkQ2xvc2VPblNlbGVjdCIsImZvcm1hdFdlZWtOdW1iZXIiLCJkYXlzIiwib25DbGlja0FjdGlvbiIsImhhbmRsZVdlZWtDbGljayIsIm9mZnNldCIsImFkZERheXMiLCJjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXgiLCJkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCIsInZhbHVlT2YiLCJoYW5kbGVEYXlNb3VzZUVudGVyIiwicmVuZGVyRGF5cyIsIkZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UIiwiTU9OVEhfQ09MVU1OU19MQVlPVVQiLCJUV09fQ09MVU1OUyIsIlRIUkVFX0NPTFVNTlMiLCJGT1VSX0NPTFVNTlMiLCJNT05USF9DT0xVTU5TIiwiZ3JpZCIsInZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldCIsIk1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQiLCJnZXRNb250aENvbHVtbnNMYXlvdXQiLCJzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlciIsInNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIiLCJNb250aCIsIm9yZGVySW5EaXNwbGF5Iiwib25Nb3VzZUxlYXZlIiwiaXNJblNlbGVjdGluZ1JhbmdlTW9udGgiLCJfbW9udGgiLCJfdGhpcyRwcm9wcyRzZWxlY3Rpbmc0Iiwid2Vla3MiLCJpc0ZpeGVkSGVpZ2h0IiwiZml4ZWRIZWlnaHQiLCJicmVha0FmdGVyTmV4dFB1c2giLCJjdXJyZW50V2Vla1N0YXJ0Iiwid2Vla0FyaWFMYWJlbFByZWZpeCIsInNob3dXZWVrTnVtYmVycyIsImlzRml4ZWRBbmRGaW5hbFdlZWsiLCJpc05vbkZpeGVkQW5kT3V0T2ZNb250aCIsImlzV2Vla0luTW9udGgiLCJwZWVrTmV4dE1vbnRoIiwibGFiZWxEYXRlIiwibmV3TW9udGgiLCJzZXRQcmVTZWxlY3Rpb24iLCJNT05USF9SRUZTIiwiaGFuZGxlT25Nb250aEtleURvd24iLCJtb250aENvbHVtbnNMYXlvdXQiLCJ2ZXJ0aWNhbE9mZnNldCIsIm1vbnRoc0dyaWQiLCJvbk1vbnRoQ2xpY2siLCJoYW5kbGVNb250aE5hdmlnYXRpb24iLCJuZXdRdWFydGVyIiwiUVVBUlRFUl9SRUZTIiwib25RdWFydGVyQ2xpY2siLCJoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiIsIm1vbnRoQ2xhc3NOYW1lIiwiX21vbnRoQ2xhc3NOYW1lIiwiaXNSYW5nZVN0YXJ0TW9udGgiLCJpc1JhbmdlRW5kTW9udGgiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCIsImlzQ3VycmVudE1vbnRoIiwicHJlU2VsZWN0ZWRNb250aCIsInByZVNlbGVjdGVkUXVhcnRlciIsIl90aGlzJHByb3BzMTEiLCJfdGhpcyRwcm9wczExJGNob29zZUQiLCJfdGhpcyRwcm9wczExJGRpc2FibGUiLCJfdGhpcyRwcm9wczEyIiwiaXNTZWxlY3RlZFF1YXJ0ZXIiLCJpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyIiwiaXNSYW5nZVN0YXJ0UXVhcnRlciIsImlzUmFuZ2VFbmRRdWFydGVyIiwiX3RoaXMkcHJvcHMxMyIsInNob3dGdWxsTW9udGhZZWFyUGlja2VyIiwicmVuZGVyTW9udGhDb250ZW50Iiwic2hvcnRNb250aFRleHQiLCJmdWxsTW9udGhUZXh0IiwiX3RoaXMkcHJvcHMxNCIsInJlbmRlclF1YXJ0ZXJDb250ZW50Iiwic2hvcnRRdWFydGVyIiwiX3RoaXMkcHJvcHMxNSIsIm1vbnRoQ29sdW1ucyIsImoiLCJldiIsIm9uTW9udGhLZXlEb3duIiwib25Nb250aE1vdXNlRW50ZXIiLCJnZXRNb250aENsYXNzTmFtZXMiLCJnZXRNb250aENvbnRlbnQiLCJfdGhpcyRwcm9wczE2IiwicXVhcnRlcnMiLCJvblF1YXJ0ZXJLZXlEb3duIiwib25RdWFydGVyTW91c2VFbnRlciIsImdldFF1YXJ0ZXJDbGFzc05hbWVzIiwiZ2V0UXVhcnRlclRhYkluZGV4IiwiaXNDdXJyZW50UXVhcnRlciIsImdldFF1YXJ0ZXJDb250ZW50IiwiX3RoaXMkcHJvcHMxNyIsInNob3dNb250aFllYXJQaWNrZXIiLCJzaG93UXVhcnRlclllYXJQaWNrZXIiLCJfdGhpcyRwcm9wczE4IiwiX3RoaXMkcHJvcHMxOCRhcmlhTGFiIiwiZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4IiwidHJpbSIsImhhbmRsZU1vdXNlTGVhdmUiLCJvblBvaW50ZXJMZWF2ZSIsInJlbmRlck1vbnRocyIsInJlbmRlclF1YXJ0ZXJzIiwicmVuZGVyV2Vla3MiLCJUaW1lIiwiaGVpZ2h0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2VudGVyTGkiLCJjYWxjQ2VudGVyUG9zaXRpb24iLCJtb250aFJlZiIsImhlYWRlciIsImNsYXNzZXMiLCJ0aW1lQ2xhc3NOYW1lIiwiaXNTZWxlY3RlZFRpbWUiLCJpc0Rpc2FibGVkVGltZSIsImluamVjdFRpbWVzIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJhY3RpdmVEYXRlIiwib3BlblRvRGF0ZSIsImJhc2UiLCJzb3J0ZWRJbmplY3RUaW1lcyIsInNvcnQiLCJhIiwiYiIsIm1pbnV0ZXNJbkRheSIsIm11bHRpcGxpZXIiLCJ0aW1lc1RvSW5qZWN0IiwidGltZVRvRm9jdXMiLCJyZWR1Y2UiLCJwcmV2IiwibGlDbGFzc2VzIiwibGkiLCJzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSIsInRvZGF5QnV0dG9uIiwic2hvd1RpbWVTZWxlY3RPbmx5IiwidGltZUNhcHRpb24iLCJyZW5kZXJUaW1lcyIsIm9uVGltZUNoYW5nZSIsImxpc3RIZWlnaHQiLCJjZW50ZXJMaVJlZiIsIlllYXIiLCJyZWZJbmRleCIsIndhaXRGb3JSZVJlbmRlciIsIllFQVJfUkVGUyIsIl91dGlscyRnZXRZZWFyc1BlcmlvZCIsInVwZGF0ZUZvY3VzT25QYWdpbmF0ZSIsInkiLCJfeWVhciIsImhhbmRsZVllYXJDbGljayIsIm9uWWVhckNsaWNrIiwiaGFuZGxlWWVhck5hdmlnYXRpb24iLCJ5ZWFyQ2xhc3NOYW1lIiwiaXNDdXJyZW50WWVhciIsInByZVNlbGVjdGVkIiwicmVuZGVyWWVhckNvbnRlbnQiLCJvblllYXJNb3VzZUVudGVyIiwib25ZZWFyTW91c2VMZWF2ZSIsIl91dGlscyRnZXRZZWFyc1BlcmlvZDIiLCJfbG9vcCIsIm9uWWVhcktleURvd24iLCJnZXRZZWFyVGFiSW5kZXgiLCJnZXRZZWFyQ2xhc3NOYW1lcyIsImdldFllYXJDb250ZW50IiwiZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMiLCJjbGVhclNlbGVjdGluZ0RhdGUiLCJpbnB1dFRpbWUiLCJwcm9wRGF0ZSIsImlzUHJvcERhdGVWYWxpZCIsImlzTmFOIiwic3BsaXQiLCJ0aW1lU3RyaW5nIiwiY3VzdG9tVGltZUlucHV0IiwiY2xvbmVFbGVtZW50IiwidHlwZSIsInBsYWNlaG9sZGVyIiwibmFtZSIsInJlcXVpcmVkIiwidGltZUlucHV0TGFiZWwiLCJyZW5kZXJUaW1lSW5wdXQiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJDYWxlbmRhckNvbnRhaW5lciIsIl9yZWYkc2hvd1RpbWVTZWxlY3RPbiIsIl9yZWYkc2hvd1RpbWUiLCJzaG93VGltZSIsImFyaWFMYWJlbCIsIkRST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMiLCJpc0Ryb3Bkb3duU2VsZWN0IiwiZWxlbWVudCIsImNsYXNzTmFtZXMiLCJ0ZXN0Q2xhc3NuYW1lIiwiaW5kZXhPZiIsIkNhbGVuZGFyIiwib25Ecm9wZG93bkZvY3VzIiwiaW5pdGlhbERhdGUiLCJoYW5kbGVNb250aENoYW5nZSIsIm1vbnRoU2VsZWN0ZWRJbiIsIm9uTW9udGhNb3VzZUxlYXZlIiwic2V0WWVhciIsIm9uWWVhckNoYW5nZSIsImlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlIiwiaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UiLCJvbk1vbnRoQ2hhbmdlIiwiaGFuZGxlTW9udGhZZWFyQ2hhbmdlIiwiZGF5TmFtZXMiLCJ3ZWVrTGFiZWwiLCJ3ZWVrRGF5TmFtZSIsImZvcm1hdFdlZWtkYXkiLCJ3ZWVrRGF5Q2xhc3NOYW1lIiwiZm9ybWF0V2Vla0RheSIsInVzZVdlZWtkYXlzU2hvcnQiLCJzaG93WWVhclBpY2tlciIsInJlbmRlckN1c3RvbUhlYWRlciIsImFsbFByZXZEYXlzRGlzYWJsZWQiLCJmb3JjZVNob3dNb250aE5hdmlnYXRpb24iLCJzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24iLCJpY29uQ2xhc3NlcyIsImNsaWNrSGFuZGxlciIsImRlY3JlYXNlTW9udGgiLCJkZWNyZWFzZVllYXIiLCJpc0ZvclllYXIiLCJwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwiLCJwcmV2aW91c1llYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91cyIsInByZXZpb3VzTW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMyIiwicHJldmlvdXNZZWFyQXJpYUxhYmVsIiwiYWxsTmV4dERheXNEaXNhYmxlZCIsInNob3dUaW1lU2VsZWN0IiwiaW5jcmVhc2VNb250aCIsImluY3JlYXNlWWVhciIsIm5leHRNb250aEJ1dHRvbkxhYmVsIiwibmV4dFllYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0TW9udCIsIm5leHRNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0WWVhciIsIm5leHRZZWFyQXJpYUxhYmVsIiwic2hvd1llYXJEcm9wZG93biIsInNob3dNb250aERyb3Bkb3duIiwic2hvd01vbnRoWWVhckRyb3Bkb3duIiwib3ZlcnJpZGVIaWRlIiwiY2hhbmdlWWVhciIsImNoYW5nZU1vbnRoIiwiY2hhbmdlTW9udGhZZWFyIiwiaGFuZGxlVG9kYXlCdXR0b25DbGljayIsIm1vbnRoRGF0ZSIsInJlbmRlckN1cnJlbnRNb250aCIsIm9uRm9jdXMiLCJoYW5kbGVEcm9wZG93bkZvY3VzIiwicmVuZGVyTW9udGhEcm9wZG93biIsInJlbmRlck1vbnRoWWVhckRyb3Bkb3duIiwicmVuZGVyWWVhckRyb3Bkb3duIiwiaGVhZGVyQXJncyIsIm1vbnRoQ29udGFpbmVyIiwicHJldk1vbnRoQnV0dG9uRGlzYWJsZWQiLCJuZXh0TW9udGhCdXR0b25EaXNhYmxlZCIsInByZXZZZWFyQnV0dG9uRGlzYWJsZWQiLCJuZXh0WWVhckJ1dHRvbkRpc2FibGVkIiwic2hvd0RheU5hbWVzIiwiX29iamVjdFNwcmVhZCIsImN1c3RvbUhlYWRlckNvdW50IiwicmVuZGVyWWVhckhlYWRlciIsInJlbmRlckRlZmF1bHRIZWFkZXIiLCJfdGhpcyRwcm9wcyRtb250aFNlbGUiLCJtb250aExpc3QiLCJtb250aHNUb1N1YnRyYWN0Iiwic2hvd1ByZXZpb3VzTW9udGhzIiwibW9udGhzU2hvd24iLCJmcm9tTW9udGhEYXRlIiwibW9udGhzVG9BZGQiLCJtb250aEtleSIsImRpdiIsInJlbmRlckhlYWRlciIsIm1vbnRoQXJpYUxhYmVsUHJlZml4IiwiaGFuZGxlT25EYXlLZXlEb3duIiwiaGFuZGxlTW9udGhNb3VzZUxlYXZlIiwiX2V4dGVuZHMiLCJoYW5kbGVZZWFyTW91c2VFbnRlciIsImhhbmRsZVllYXJNb3VzZUxlYXZlIiwidGltZUZvcm1hdCIsInRpbWVJbnRlcnZhbHMiLCJ3aXRoUG9ydGFsIiwidGltZVZhbGlkIiwiQm9vbGVhbiIsInNob3dUaW1lSW5wdXQiLCJJbnB1dFRpbWUiLCJhcmlhTGl2ZU1lc3NhZ2UiLCJnZXREYXRlSW5WaWV3IiwiYXNzaWduTW9udGhDb250YWluZXIiLCJfdGhpczMiLCJoYXNNb250aENoYW5nZWQiLCJDb250YWluZXIiLCJjb250YWluZXIiLCJkaXNwbGF5IiwicmVuZGVyQXJpYUxpdmVSZWdpb24iLCJyZW5kZXJQcmV2aW91c0J1dHRvbiIsInJlbmRlck5leHRCdXR0b24iLCJyZW5kZXJZZWFycyIsInJlbmRlclRvZGF5QnV0dG9uIiwicmVuZGVyVGltZVNlY3Rpb24iLCJyZW5kZXJJbnB1dFRpbWVTZWN0aW9uIiwicmVuZGVyQ2hpbGRyZW4iLCJDYWxlbmRhckljb24iLCJpY29uIiwiX3JlZiRjbGFzc05hbWUiLCJkZWZhdWx0Q2xhc3MiLCJpc1ZhbGlkRWxlbWVudCIsInhtbG5zIiwidmlld0JveCIsIlBvcnRhbCIsImVsIiwicG9ydGFsUm9vdCIsInBvcnRhbEhvc3QiLCJnZXRFbGVtZW50QnlJZCIsInBvcnRhbElkIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUNoaWxkIiwiUmVhY3RET00iLCJjcmVhdGVQb3J0YWwiLCJmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yIiwiZm9jdXNhYmxlRmlsdGVyIiwibm9kZSIsImRpc2FibGVkIiwiVGFiTG9vcCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YWJMb29wUmVmIiwicXVlcnlTZWxlY3RvckFsbCIsInRhYkNoaWxkcmVuIiwiZ2V0VGFiQ2hpbGRyZW4iLCJlbmFibGVUYWJMb29wIiwiaGFuZGxlRm9jdXNTdGFydCIsImhhbmRsZUZvY3VzRW5kIiwid2l0aEZsb2F0aW5nIiwiV2l0aEZsb2F0aW5nIiwiYWx0X3Byb3BzIiwicG9wcGVyTW9kaWZpZXJzIiwicG9wcGVyUHJvcHMiLCJoaWRlUG9wcGVyIiwiYXJyb3dSZWYiLCJ1c2VSZWYiLCJmbG9hdGluZ1Byb3BzIiwidXNlRmxvYXRpbmciLCJvcGVuIiwid2hpbGVFbGVtZW50c01vdW50ZWQiLCJhdXRvVXBkYXRlIiwicGxhY2VtZW50IiwicG9wcGVyUGxhY2VtZW50IiwibWlkZGxld2FyZSIsImZsaXAiLCJwYWRkaW5nIiwiYXJyb3ciLCJQb3BwZXJDb21wb25lbnQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwicG9wcGVyQ29tcG9uZW50IiwidGFyZ2V0Q29tcG9uZW50IiwicG9wcGVyT25LZXlEb3duIiwic2hvd0Fycm93IiwicG9wcGVyIiwicmVmcyIsInNldEZsb2F0aW5nIiwiZmxvYXRpbmdTdHlsZXMiLCJGbG9hdGluZ0Fycm93IiwiY29udGV4dCIsImZpbGwiLCJzdHJva2VXaWR0aCIsIndpZHRoIiwidHJhbnNmb3JtIiwicG9wcGVyQ29udGFpbmVyIiwid3JhcHBlckNsYXNzZXMiLCJGcmFnbWVudCIsInNldFJlZmVyZW5jZSIsIm91dHNpZGVDbGlja0lnbm9yZUNsYXNzIiwiV3JhcHBlZENhbGVuZGFyIiwiaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZCIsIklOUFVUX0VSUl8xIiwiRGF0ZVBpY2tlciIsIl90aGlzJHByb3BzJGhvbGlkYXlzIiwiYWNjdW11bGF0b3IiLCJkZWZhdWx0UHJlU2VsZWN0aW9uIiwiZ2V0UHJlU2VsZWN0aW9uIiwiYm91bmRlZFByZVNlbGVjdGlvbiIsInN0YXJ0T3BlbiIsInByZXZlbnRGb2N1cyIsImZvY3VzZWQiLCJwcmV2ZW50Rm9jdXNUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaW5wdXQiLCJibHVyIiwiY2FuY2VsRm9jdXNJbnB1dCIsInNraXBTZXRCbHVyIiwiY2FsY0luaXRpYWxTdGF0ZSIsImxhc3RQcmVTZWxlY3RDaGFuZ2UiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSIsInNldEJsdXIiLCJpbnB1dFZhbHVlIiwicmVhZE9ubHkiLCJwcmV2ZW50T3Blbk9uRm9jdXMiLCJjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2V0Rm9jdXMiLCJpbnB1dEZvY3VzVGltZW91dCIsIm9uQmx1ciIsImFsbEFyZ3MiLCJvbkNoYW5nZVJhdyIsImlzRGVmYXVsdFByZXZlbnRlZCIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUIiwiaG91cnMiLCJtaW51dGVzIiwic2V0U2VsZWN0ZWQiLCJzZW5kRm9jdXNCYWNrVG9JbnB1dCIsInNob3dEYXRlU2VsZWN0Iiwic3dhcFJhbmdlIiwia2VlcElucHV0IiwiYWxsb3dTYW1lRGF5IiwiZm9jdXNTZWxlY3RlZE1vbnRoIiwibm9SYW5nZXMiLCJoYXNTdGFydFJhbmdlIiwiaXNSYW5nZUZpbGxlZCIsImlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQiLCJzZWxlY3RlZERhdGUiLCJuZXh0RGF0ZXMiLCJoYXNNaW5EYXRlIiwiaGFzTWF4RGF0ZSIsImlzVmFsaWREYXRlU2VsZWN0aW9uIiwiZGF0ZVN0YXJ0T2ZEYXkiLCJtaW5EYXRlU3RhcnRPZkRheSIsIm1heERhdGVFbmRPZkRheSIsIm9uSW5wdXRDbGljayIsInNlbGVjdG9yU3RyaW5nIiwic2VsZWN0ZWRJdGVtIiwiY2FsZW5kYXIiLCJjb21wb25lbnROb2RlIiwicXVlcnlTZWxlY3RvciIsImNvcHkiLCJpbnB1dE9rIiwiaGFuZGxlU2VsZWN0Iiwib25JbnB1dEVycm9yIiwiY29kZSIsIm1zZyIsImlzU2hpZnRLZXlBY3RpdmUiLCJzaGlmdEtleSIsIm5ld1NlbGVjdGlvbiIsInN1YldlZWtzIiwic3ViRGF5cyIsImFkZFdlZWtzIiwicHJldk1vbnRoIiwicHJldlllYXIiLCJvbkNsZWFyQ2xpY2siLCJjbG9zZU9uU2Nyb2xsIiwiZG9jdW1lbnRFbGVtZW50IiwiaXNDYWxlbmRhck9wZW4iLCJlbGVtIiwiZGF0ZUZvcm1hdENhbGVuZGFyIiwiaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUiLCJtb2RpZnlIb2xpZGF5cyIsImhhbmRsZVRpbWVDaGFuZ2UiLCJjYWxlbmRhckNsYXNzTmFtZSIsImNhbGVuZGFyQ29udGFpbmVyIiwiZXhjbHVkZVNjcm9sbGJhciIsIm9uRGF5S2V5RG93biIsImlzQ29udGFpbnNUaW1lIiwibG9uZ0RhdGVGb3JtYXQiLCJfUmVhY3QkY2xvbmVFbGVtZW50IiwiY3VzdG9tSW5wdXQiLCJjdXN0b21JbnB1dFJlZiIsImhhbmRsZUJsdXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVGb2N1cyIsIm9uSW5wdXRLZXlEb3duIiwiaWQiLCJmb3JtIiwiYXV0b0ZvY3VzIiwicGxhY2Vob2xkZXJUZXh0IiwiYXV0b0NvbXBsZXRlIiwiYXJpYURlc2NyaWJlZEJ5IiwiYXJpYUludmFsaWQiLCJhcmlhTGFiZWxsZWRCeSIsImFyaWFSZXF1aXJlZCIsImlzQ2xlYXJhYmxlIiwiY2xlYXJCdXR0b25UaXRsZSIsIl90aGlzJHByb3BzNCRjbGVhckJ1dCIsImNsZWFyQnV0dG9uQ2xhc3NOYW1lIiwiX3RoaXMkcHJvcHM0JGFyaWFMYWJlIiwiYXJpYUxhYmVsQ2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25TY3JvbGwiLCJwcmV2U3RhdGUiLCJvbkNhbGVuZGFyT3BlbiIsIm9uQ2FsZW5kYXJDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJJbnB1dENvbnRhaW5lciIsInNob3dJY29uIiwiY2FsZW5kYXJJY29uQ2xhc3NuYW1lIiwidG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayIsInRvZ2dsZUNhbGVuZGFyIiwicmVuZGVyRGF0ZUlucHV0IiwicmVuZGVyQ2xlYXJCdXR0b24iLCJyZW5kZXJDYWxlbmRhciIsInBvcnRhbENvbnRhaW5lciIsIm9uUG9ydGFsS2V5RG93biIsInBvcHBlckNsYXNzTmFtZSIsIm9uUG9wcGVyS2V5RG93biIsInNob3dQb3BwZXJBcnJvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEyRE8sSUFBTUEsd0JBQXdCLEdBQUcsRUFBRSxDQUFBOztFQUUxQztFQUNBO0VBQ0EsSUFBTUMsMEJBQTBCLEdBQUcsbUNBQW1DLENBQUE7O0VBRXRFOztFQUVPLFNBQVNDLE9BQU9BLENBQUNDLEtBQUssRUFBRTtJQUM3QixJQUFNQyxDQUFDLEdBQUdELEtBQUssR0FDWCxPQUFPQSxLQUFLLEtBQUssUUFBUSxJQUFJQSxLQUFLLFlBQVlFLE1BQU0sR0FDbERDLGlCQUFRLENBQUNILEtBQUssQ0FBQyxHQUNmSSxhQUFNLENBQUNKLEtBQUssQ0FBQyxHQUNmLElBQUlLLElBQUksRUFBRSxDQUFBO0VBQ2QsRUFBQSxPQUFPQyxPQUFPLENBQUNMLENBQUMsQ0FBQyxHQUFHQSxDQUFDLEdBQUcsSUFBSSxDQUFBO0VBQzlCLENBQUE7RUFFTyxTQUFTTSxTQUFTQSxDQUFDUCxLQUFLLEVBQUVRLFVBQVUsRUFBRUMsTUFBTSxFQUFFQyxhQUFhLEVBQUVDLE9BQU8sRUFBRTtJQUMzRSxJQUFJQyxVQUFVLEdBQUcsSUFBSSxDQUFBO0VBQ3JCLEVBQUEsSUFBSUMsWUFBWSxHQUNkQyxlQUFlLENBQUNMLE1BQU0sQ0FBQyxJQUFJSyxlQUFlLENBQUNDLGdCQUFnQixFQUFFLENBQUMsQ0FBQTtJQUNoRSxJQUFJQyx1QkFBdUIsR0FBRyxJQUFJLENBQUE7RUFDbEMsRUFBQSxJQUFJQyxLQUFLLENBQUNDLE9BQU8sQ0FBQ1YsVUFBVSxDQUFDLEVBQUU7RUFDN0JBLElBQUFBLFVBQVUsQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLEVBQUUsRUFBSztFQUN6QixNQUFBLElBQUlDLFlBQVksR0FBR0MsV0FBSyxDQUFDdEIsS0FBSyxFQUFFb0IsRUFBRSxFQUFFLElBQUlmLElBQUksRUFBRSxFQUFFO0VBQzlDSSxRQUFBQSxNQUFNLEVBQUVJLFlBQVk7RUFDcEJVLFFBQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLFFBQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsT0FBQyxDQUFDLENBQUE7RUFDRixNQUFBLElBQUlkLGFBQWEsRUFBRTtFQUNqQk0sUUFBQUEsdUJBQXVCLEdBQ3JCVixPQUFPLENBQUNlLFlBQVksRUFBRVYsT0FBTyxDQUFDLElBQzlCWCxLQUFLLEtBQUt5QixVQUFVLENBQUNKLFlBQVksRUFBRUQsRUFBRSxFQUFFWCxNQUFNLENBQUMsQ0FBQTtFQUNsRCxPQUFBO1FBQ0EsSUFBSUgsT0FBTyxDQUFDZSxZQUFZLEVBQUVWLE9BQU8sQ0FBQyxJQUFJSyx1QkFBdUIsRUFBRTtFQUM3REosUUFBQUEsVUFBVSxHQUFHUyxZQUFZLENBQUE7RUFDM0IsT0FBQTtFQUNGLEtBQUMsQ0FBQyxDQUFBO0VBQ0YsSUFBQSxPQUFPVCxVQUFVLENBQUE7RUFDbkIsR0FBQTtJQUVBQSxVQUFVLEdBQUdVLFdBQUssQ0FBQ3RCLEtBQUssRUFBRVEsVUFBVSxFQUFFLElBQUlILElBQUksRUFBRSxFQUFFO0VBQ2hESSxJQUFBQSxNQUFNLEVBQUVJLFlBQVk7RUFDcEJVLElBQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLElBQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsR0FBQyxDQUFDLENBQUE7RUFFRixFQUFBLElBQUlkLGFBQWEsRUFBRTtFQUNqQk0sSUFBQUEsdUJBQXVCLEdBQ3JCVixPQUFPLENBQUNNLFVBQVUsQ0FBQyxJQUNuQlosS0FBSyxLQUFLeUIsVUFBVSxDQUFDYixVQUFVLEVBQUVKLFVBQVUsRUFBRUMsTUFBTSxDQUFDLENBQUE7RUFDeEQsR0FBQyxNQUFNLElBQUksQ0FBQ0gsT0FBTyxDQUFDTSxVQUFVLENBQUMsRUFBRTtFQUMvQkosSUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQ3BCa0IsS0FBSyxDQUFDNUIsMEJBQTBCLENBQUMsQ0FDakM2QixHQUFHLENBQUMsVUFBVUMsU0FBUyxFQUFFO0VBQ3hCLE1BQUEsSUFBTUMsY0FBYyxHQUFHRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDbkMsTUFBQSxJQUFJQyxjQUFjLEtBQUssR0FBRyxJQUFJQSxjQUFjLEtBQUssR0FBRyxFQUFFO0VBQ3BELFFBQUEsSUFBTUMsYUFBYSxHQUFHQyxxQkFBYyxDQUFDRixjQUFjLENBQUMsQ0FBQTtVQUNwRCxPQUFPaEIsWUFBWSxHQUNmaUIsYUFBYSxDQUFDRixTQUFTLEVBQUVmLFlBQVksQ0FBQ21CLFVBQVUsQ0FBQyxHQUNqREgsY0FBYyxDQUFBO0VBQ3BCLE9BQUE7RUFDQSxNQUFBLE9BQU9ELFNBQVMsQ0FBQTtFQUNsQixLQUFDLENBQUMsQ0FDREssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0VBRVgsSUFBQSxJQUFJakMsS0FBSyxDQUFDa0MsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwQnRCLFVBQVUsR0FBR1UsV0FBSyxDQUFDdEIsS0FBSyxFQUFFUSxVQUFVLENBQUMyQixLQUFLLENBQUMsQ0FBQyxFQUFFbkMsS0FBSyxDQUFDa0MsTUFBTSxDQUFDLEVBQUUsSUFBSTdCLElBQUksRUFBRSxFQUFFO0VBQ3ZFa0IsUUFBQUEsMkJBQTJCLEVBQUUsSUFBSTtFQUNqQ0MsUUFBQUEsNEJBQTRCLEVBQUUsSUFBQTtFQUNoQyxPQUFDLENBQUMsQ0FBQTtFQUNKLEtBQUE7RUFFQSxJQUFBLElBQUksQ0FBQ2xCLE9BQU8sQ0FBQ00sVUFBVSxDQUFDLEVBQUU7RUFDeEJBLE1BQUFBLFVBQVUsR0FBRyxJQUFJUCxJQUFJLENBQUNMLEtBQUssQ0FBQyxDQUFBO0VBQzlCLEtBQUE7RUFDRixHQUFBO0lBRUEsT0FBT00sT0FBTyxDQUFDTSxVQUFVLENBQUMsSUFBSUksdUJBQXVCLEdBQUdKLFVBQVUsR0FBRyxJQUFJLENBQUE7RUFDM0UsQ0FBQTtFQU1PLFNBQVNOLE9BQU9BLENBQUM4QixJQUFJLEVBQUV6QixPQUFPLEVBQUU7SUFDckNBLE9BQU8sR0FBR0EsT0FBTyxHQUFHQSxPQUFPLEdBQUcsSUFBSU4sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE9BQU9nQyxpQkFBVyxDQUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDRSxpQkFBUSxDQUFDRixJQUFJLEVBQUV6QixPQUFPLENBQUMsQ0FBQTtFQUN0RCxDQUFBOztFQUVBOztFQUVPLFNBQVNjLFVBQVVBLENBQUNXLElBQUksRUFBRUcsU0FBUyxFQUFFOUIsTUFBTSxFQUFFO0lBQ2xELElBQUlBLE1BQU0sS0FBSyxJQUFJLEVBQUU7RUFDbkIsSUFBQSxPQUFPK0IsYUFBTSxDQUFDSixJQUFJLEVBQUVHLFNBQVMsRUFBRTtFQUM3QmhCLE1BQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLE1BQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsS0FBQyxDQUFDLENBQUE7RUFDSixHQUFBO0VBQ0EsRUFBQSxJQUFJaUIsU0FBUyxHQUFHM0IsZUFBZSxDQUFDTCxNQUFNLENBQUMsQ0FBQTtFQUN2QyxFQUFBLElBQUlBLE1BQU0sSUFBSSxDQUFDZ0MsU0FBUyxFQUFFO0VBQ3hCQyxJQUFBQSxPQUFPLENBQUNDLElBQUksQ0FBQSwyREFBQSxDQUFBQyxNQUFBLENBQ2lEbkMsTUFBTSxTQUNuRSxDQUFDLENBQUE7RUFDSCxHQUFBO0VBQ0EsRUFBQSxJQUNFLENBQUNnQyxTQUFTLElBQ1YsQ0FBQyxDQUFDMUIsZ0JBQWdCLEVBQUUsSUFDcEIsQ0FBQyxDQUFDRCxlQUFlLENBQUNDLGdCQUFnQixFQUFFLENBQUMsRUFDckM7RUFDQTBCLElBQUFBLFNBQVMsR0FBRzNCLGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0VBQ2pELEdBQUE7RUFDQSxFQUFBLE9BQU95QixhQUFNLENBQUNKLElBQUksRUFBRUcsU0FBUyxFQUFFO0VBQzdCOUIsSUFBQUEsTUFBTSxFQUFFZ0MsU0FBUyxHQUFHQSxTQUFTLEdBQUcsSUFBSTtFQUNwQ2xCLElBQUFBLDJCQUEyQixFQUFFLElBQUk7RUFDakNDLElBQUFBLDRCQUE0QixFQUFFLElBQUE7RUFDaEMsR0FBQyxDQUFDLENBQUE7RUFDSixDQUFBO0VBRU8sU0FBU3FCLGNBQWNBLENBQUNULElBQUksRUFBQVUsSUFBQSxFQUEwQjtFQUFBLEVBQUEsSUFBdEJ0QyxVQUFVLEdBQUFzQyxJQUFBLENBQVZ0QyxVQUFVO01BQUVDLE1BQU0sR0FBQXFDLElBQUEsQ0FBTnJDLE1BQU0sQ0FBQTtJQUN2RCxPQUNHMkIsSUFBSSxJQUNIWCxVQUFVLENBQ1JXLElBQUksRUFDSm5CLEtBQUssQ0FBQ0MsT0FBTyxDQUFDVixVQUFVLENBQUMsR0FBR0EsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHQSxVQUFVLEVBQ3REQyxNQUNGLENBQUMsSUFDSCxFQUFFLENBQUE7RUFFTixDQUFBO0VBRU8sU0FBU3NDLG1CQUFtQkEsQ0FBQ0MsU0FBUyxFQUFFQyxPQUFPLEVBQUVDLEtBQUssRUFBRTtJQUM3RCxJQUFJLENBQUNGLFNBQVMsRUFBRTtFQUNkLElBQUEsT0FBTyxFQUFFLENBQUE7RUFDWCxHQUFBO0VBRUEsRUFBQSxJQUFNRyxrQkFBa0IsR0FBR04sY0FBYyxDQUFDRyxTQUFTLEVBQUVFLEtBQUssQ0FBQyxDQUFBO0lBQzNELElBQU1FLGdCQUFnQixHQUFHSCxPQUFPLEdBQUdKLGNBQWMsQ0FBQ0ksT0FBTyxFQUFFQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7RUFFdEUsRUFBQSxPQUFBLEVBQUEsQ0FBQU4sTUFBQSxDQUFVTyxrQkFBa0IsRUFBQVAsS0FBQUEsQ0FBQUEsQ0FBQUEsTUFBQSxDQUFNUSxnQkFBZ0IsQ0FBQSxDQUFBO0VBQ3BELENBQUE7RUFFTyxTQUFTQyx1QkFBdUJBLENBQUNDLEtBQUssRUFBRUosS0FBSyxFQUFFO0lBQ3BELElBQUksRUFBQ0ksS0FBSyxLQUFMQSxJQUFBQSxJQUFBQSxLQUFLLGVBQUxBLEtBQUssQ0FBRXBCLE1BQU0sQ0FBRSxFQUFBO0VBQ2xCLElBQUEsT0FBTyxFQUFFLENBQUE7RUFDWCxHQUFBO0lBQ0EsSUFBTXFCLGtCQUFrQixHQUFHVixjQUFjLENBQUNTLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUosS0FBSyxDQUFDLENBQUE7RUFDMUQsRUFBQSxJQUFJSSxLQUFLLENBQUNwQixNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ3RCLElBQUEsT0FBT3FCLGtCQUFrQixDQUFBO0VBQzNCLEdBQUE7RUFDQSxFQUFBLElBQUlELEtBQUssQ0FBQ3BCLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdEIsSUFBTXNCLG1CQUFtQixHQUFHWCxjQUFjLENBQUNTLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUosS0FBSyxDQUFDLENBQUE7RUFDM0QsSUFBQSxPQUFBLEVBQUEsQ0FBQU4sTUFBQSxDQUFVVyxrQkFBa0IsRUFBQVgsSUFBQUEsQ0FBQUEsQ0FBQUEsTUFBQSxDQUFLWSxtQkFBbUIsQ0FBQSxDQUFBO0VBQ3RELEdBQUE7RUFFQSxFQUFBLElBQU1DLGVBQWUsR0FBR0gsS0FBSyxDQUFDcEIsTUFBTSxHQUFHLENBQUMsQ0FBQTtFQUN4QyxFQUFBLE9BQUEsRUFBQSxDQUFBVSxNQUFBLENBQVVXLGtCQUFrQixFQUFBWCxLQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQU1hLGVBQWUsRUFBQSxHQUFBLENBQUEsQ0FBQTtFQUNuRCxDQUFBOztFQUVBOztFQUVPLFNBQVNDLE9BQU9BLENBQUN0QixJQUFJLEVBQUF1QixLQUFBLEVBQXdDO0VBQUEsRUFBQSxJQUFBQyxVQUFBLEdBQUFELEtBQUEsQ0FBcENFLElBQUk7RUFBSkEsSUFBQUEsSUFBSSxHQUFBRCxVQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsQ0FBQyxHQUFBQSxVQUFBO01BQUFFLFlBQUEsR0FBQUgsS0FBQSxDQUFFSSxNQUFNO0VBQU5BLElBQUFBLE1BQU0sR0FBQUQsWUFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLENBQUMsR0FBQUEsWUFBQTtNQUFBRSxZQUFBLEdBQUFMLEtBQUEsQ0FBRU0sTUFBTTtFQUFOQSxJQUFBQSxNQUFNLEdBQUFELFlBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxDQUFDLEdBQUFBLFlBQUEsQ0FBQTtFQUM5RCxFQUFBLE9BQU9FLGlCQUFRLENBQUNDLHFCQUFVLENBQUNDLHFCQUFVLENBQUNoQyxJQUFJLEVBQUU2QixNQUFNLENBQUMsRUFBRUYsTUFBTSxDQUFDLEVBQUVGLElBQUksQ0FBQyxDQUFBO0VBQ3JFLENBQUE7RUFtQk8sU0FBU1EsT0FBT0EsQ0FBQ2pDLElBQUksRUFBRTNCLE1BQU0sRUFBRTtFQUNwQyxFQUFBLElBQUlnQyxTQUFTLEdBQ1ZoQyxNQUFNLElBQUlLLGVBQWUsQ0FBQ0wsTUFBTSxDQUFDLElBQ2pDTSxnQkFBZ0IsRUFBRSxJQUFJRCxlQUFlLENBQUNDLGdCQUFnQixFQUFFLENBQUUsQ0FBQTtFQUM3RCxFQUFBLE9BQU91RCxxQkFBVSxDQUFDbEMsSUFBSSxFQUFFSyxTQUFTLEdBQUc7RUFBRWhDLElBQUFBLE1BQU0sRUFBRWdDLFNBQUFBO0tBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQTtFQUNuRSxDQUFBO0VBRU8sU0FBUzhCLGdCQUFnQkEsQ0FBQ0MsR0FBRyxFQUFFL0QsTUFBTSxFQUFFO0VBQzVDLEVBQUEsT0FBT2dCLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxLQUFLLEVBQUUvRCxNQUFNLENBQUMsQ0FBQTtFQUN2QyxDQUFBOztFQUVBOztFQUVPLFNBQVNnRSxhQUFhQSxDQUFDckMsSUFBSSxFQUFFO0lBQ2xDLE9BQU9zQyxxQkFBVSxDQUFDdEMsSUFBSSxDQUFDLENBQUE7RUFDekIsQ0FBQTtFQUVPLFNBQVN1QyxjQUFjQSxDQUFDdkMsSUFBSSxFQUFFM0IsTUFBTSxFQUFFbUUsZ0JBQWdCLEVBQUU7RUFDN0QsRUFBQSxJQUFJbkMsU0FBUyxHQUFHaEMsTUFBTSxHQUNsQkssZUFBZSxDQUFDTCxNQUFNLENBQUMsR0FDdkJLLGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZDLE9BQU84RCx1QkFBVyxDQUFDekMsSUFBSSxFQUFFO0VBQ3ZCM0IsSUFBQUEsTUFBTSxFQUFFZ0MsU0FBUztFQUNqQnFDLElBQUFBLFlBQVksRUFBRUYsZ0JBQUFBO0VBQ2hCLEdBQUMsQ0FBQyxDQUFBO0VBQ0osQ0FBQTtFQUVPLFNBQVNHLGVBQWVBLENBQUMzQyxJQUFJLEVBQUU7SUFDcEMsT0FBTzRDLHlCQUFZLENBQUM1QyxJQUFJLENBQUMsQ0FBQTtFQUMzQixDQUFBO0VBRU8sU0FBUzZDLGNBQWNBLENBQUM3QyxJQUFJLEVBQUU7SUFDbkMsT0FBTzhDLHVCQUFXLENBQUM5QyxJQUFJLENBQUMsQ0FBQTtFQUMxQixDQUFBO0VBRU8sU0FBUytDLGlCQUFpQkEsQ0FBQy9DLElBQUksRUFBRTtJQUN0QyxPQUFPZ0QsNkJBQWMsQ0FBQ2hELElBQUksQ0FBQyxDQUFBO0VBQzdCLENBQUE7RUFFTyxTQUFTaUQsZUFBZUEsR0FBRztFQUNoQyxFQUFBLE9BQU9YLHFCQUFVLENBQUMzRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0VBQzlCLENBQUE7O0VBRUE7O0VBRU8sU0FBU3VGLFlBQVlBLENBQUNsRCxJQUFJLEVBQUU7SUFDakMsT0FBT21ELG1CQUFTLENBQUNuRCxJQUFJLENBQUMsQ0FBQTtFQUN4QixDQUFBO0VBNEJPLFNBQVNvRCxVQUFVQSxDQUFDQyxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUN2QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9DLHVCQUFZLENBQUNGLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDbkMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTRSxXQUFXQSxDQUFDSCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUN4QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9HLHlCQUFhLENBQUNKLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDcEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTSSxhQUFhQSxDQUFDTCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUMxQyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9LLDZCQUFlLENBQUNOLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDdEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTTSxTQUFTQSxDQUFDUCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUN0QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9PLHFCQUFXLENBQUNSLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDbEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTUSxPQUFPQSxDQUFDVCxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUNwQyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtFQUNsQixJQUFBLE9BQU9TLGlCQUFTLENBQUNWLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7RUFDaEMsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7RUFDekIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTVSxZQUFZQSxDQUFDNUIsR0FBRyxFQUFFeEIsU0FBUyxFQUFFQyxPQUFPLEVBQUU7RUFDcEQsRUFBQSxJQUFJb0QsS0FBSyxDQUFBO0VBQ1QsRUFBQSxJQUFNQyxLQUFLLEdBQUc1QixxQkFBVSxDQUFDMUIsU0FBUyxDQUFDLENBQUE7RUFDbkMsRUFBQSxJQUFNdUQsR0FBRyxHQUFHQyxpQkFBUSxDQUFDdkQsT0FBTyxDQUFDLENBQUE7SUFFN0IsSUFBSTtFQUNGb0QsSUFBQUEsS0FBSyxHQUFHSSxpQ0FBZ0IsQ0FBQ2pDLEdBQUcsRUFBRTtFQUFFOEIsTUFBQUEsS0FBSyxFQUFMQSxLQUFLO0VBQUVDLE1BQUFBLEdBQUcsRUFBSEEsR0FBQUE7RUFBSSxLQUFDLENBQUMsQ0FBQTtLQUM5QyxDQUFDLE9BQU9HLEdBQUcsRUFBRTtFQUNaTCxJQUFBQSxLQUFLLEdBQUcsS0FBSyxDQUFBO0VBQ2YsR0FBQTtFQUNBLEVBQUEsT0FBT0EsS0FBSyxDQUFBO0VBQ2QsQ0FBQTs7RUFRQTs7RUFFTyxTQUFTTSxjQUFjQSxDQUFDQyxVQUFVLEVBQUVDLFVBQVUsRUFBRTtJQUNyRCxJQUFNQyxLQUFLLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxHQUFHQyxVQUFVLENBQUE7RUFFakUsRUFBQSxJQUFJLENBQUNGLEtBQUssQ0FBQ0csY0FBYyxFQUFFO0VBQ3pCSCxJQUFBQSxLQUFLLENBQUNHLGNBQWMsR0FBRyxFQUFFLENBQUE7RUFDM0IsR0FBQTtFQUNBSCxFQUFBQSxLQUFLLENBQUNHLGNBQWMsQ0FBQ0wsVUFBVSxDQUFDLEdBQUdDLFVBQVUsQ0FBQTtFQUMvQyxDQUFBO0VBRU8sU0FBU0ssZ0JBQWdCQSxDQUFDTixVQUFVLEVBQUU7SUFDM0MsSUFBTUUsS0FBSyxHQUFHLE9BQU9DLE1BQU0sS0FBSyxXQUFXLEdBQUdBLE1BQU0sR0FBR0MsVUFBVSxDQUFBO0lBRWpFRixLQUFLLENBQUNLLFlBQVksR0FBR1AsVUFBVSxDQUFBO0VBQ2pDLENBQUE7RUFFTyxTQUFTN0YsZ0JBQWdCQSxHQUFHO0lBQ2pDLElBQU0rRixLQUFLLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxHQUFHQyxVQUFVLENBQUE7SUFFakUsT0FBT0YsS0FBSyxDQUFDSyxZQUFZLENBQUE7RUFDM0IsQ0FBQTtFQUVPLFNBQVNyRyxlQUFlQSxDQUFDc0csVUFBVSxFQUFFO0VBQzFDLEVBQUEsSUFBSSxPQUFPQSxVQUFVLEtBQUssUUFBUSxFQUFFO0VBQ2xDO01BQ0EsSUFBTU4sS0FBSyxHQUFHLE9BQU9DLE1BQU0sS0FBSyxXQUFXLEdBQUdBLE1BQU0sR0FBR0MsVUFBVSxDQUFBO01BQ2pFLE9BQU9GLEtBQUssQ0FBQ0csY0FBYyxHQUFHSCxLQUFLLENBQUNHLGNBQWMsQ0FBQ0csVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFBO0VBQ3ZFLEdBQUMsTUFBTTtFQUNMO0VBQ0EsSUFBQSxPQUFPQSxVQUFVLENBQUE7RUFDbkIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTQywyQkFBMkJBLENBQUNqRixJQUFJLEVBQUVrRixVQUFVLEVBQUU3RyxNQUFNLEVBQUU7SUFDcEUsT0FBTzZHLFVBQVUsQ0FBQzdGLFVBQVUsQ0FBQ1csSUFBSSxFQUFFLE1BQU0sRUFBRTNCLE1BQU0sQ0FBQyxDQUFDLENBQUE7RUFDckQsQ0FBQTtFQUVPLFNBQVM4RyxxQkFBcUJBLENBQUNuRixJQUFJLEVBQUUzQixNQUFNLEVBQUU7RUFDbEQsRUFBQSxPQUFPZ0IsVUFBVSxDQUFDVyxJQUFJLEVBQUUsUUFBUSxFQUFFM0IsTUFBTSxDQUFDLENBQUE7RUFDM0MsQ0FBQTtFQUVPLFNBQVMrRyx1QkFBdUJBLENBQUNwRixJQUFJLEVBQUUzQixNQUFNLEVBQUU7RUFDcEQsRUFBQSxPQUFPZ0IsVUFBVSxDQUFDVyxJQUFJLEVBQUUsS0FBSyxFQUFFM0IsTUFBTSxDQUFDLENBQUE7RUFDeEMsQ0FBQTtFQUVPLFNBQVNnSCxnQkFBZ0JBLENBQUNDLEtBQUssRUFBRWpILE1BQU0sRUFBRTtFQUM5QyxFQUFBLE9BQU9nQixVQUFVLENBQUNrRyxpQkFBUSxDQUFDNUgsT0FBTyxFQUFFLEVBQUUySCxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUVqSCxNQUFNLENBQUMsQ0FBQTtFQUMvRCxDQUFBO0VBRU8sU0FBU21ILHFCQUFxQkEsQ0FBQ0YsS0FBSyxFQUFFakgsTUFBTSxFQUFFO0VBQ25ELEVBQUEsT0FBT2dCLFVBQVUsQ0FBQ2tHLGlCQUFRLENBQUM1SCxPQUFPLEVBQUUsRUFBRTJILEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRWpILE1BQU0sQ0FBQyxDQUFBO0VBQzlELENBQUE7RUFFTyxTQUFTb0gsdUJBQXVCQSxDQUFDQyxPQUFPLEVBQUVySCxNQUFNLEVBQUU7RUFDdkQsRUFBQSxPQUFPZ0IsVUFBVSxDQUFDc0cscUJBQVUsQ0FBQ2hJLE9BQU8sRUFBRSxFQUFFK0gsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFckgsTUFBTSxDQUFDLENBQUE7RUFDbEUsQ0FBQTs7RUFFQTs7RUFFTyxTQUFTdUgsYUFBYUEsQ0FDM0J4RCxHQUFHLEVBVUg7RUFBQSxFQUFBLElBQUF5RCxLQUFBLEdBQUFDLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQURJLEVBQUU7TUFQSnZILE9BQU8sR0FBQXNILEtBQUEsQ0FBUHRILE9BQU87TUFDUHlILE9BQU8sR0FBQUgsS0FBQSxDQUFQRyxPQUFPO01BQ1BDLFlBQVksR0FBQUosS0FBQSxDQUFaSSxZQUFZO01BQ1pDLG9CQUFvQixHQUFBTCxLQUFBLENBQXBCSyxvQkFBb0I7TUFDcEJDLFlBQVksR0FBQU4sS0FBQSxDQUFaTSxZQUFZO01BQ1pDLG9CQUFvQixHQUFBUCxLQUFBLENBQXBCTyxvQkFBb0I7TUFDcEJDLFVBQVUsR0FBQVIsS0FBQSxDQUFWUSxVQUFVLENBQUE7SUFHWixPQUNFQyxhQUFhLENBQUNsRSxHQUFHLEVBQUU7RUFBRTdELElBQUFBLE9BQU8sRUFBUEEsT0FBTztFQUFFeUgsSUFBQUEsT0FBTyxFQUFQQSxPQUFBQTtLQUFTLENBQUMsSUFDdkNDLFlBQVksSUFDWEEsWUFBWSxDQUFDTSxJQUFJLENBQUMsVUFBQ0MsV0FBVyxFQUFBO0VBQUEsSUFBQSxPQUM1QjVDLFNBQVMsQ0FBQ3hCLEdBQUcsRUFBRW9FLFdBQVcsQ0FBQ3hHLElBQUksR0FBR3dHLFdBQVcsQ0FBQ3hHLElBQUksR0FBR3dHLFdBQVcsQ0FBQyxDQUFBO0tBQ25FLENBQUUsSUFDSE4sb0JBQW9CLElBQ25CQSxvQkFBb0IsQ0FBQ0ssSUFBSSxDQUFDLFVBQUFFLEtBQUEsRUFBQTtFQUFBLElBQUEsSUFBR3ZDLEtBQUssR0FBQXVDLEtBQUEsQ0FBTHZDLEtBQUs7UUFBRUMsR0FBRyxHQUFBc0MsS0FBQSxDQUFIdEMsR0FBRyxDQUFBO01BQUEsT0FDckNFLGlDQUFnQixDQUFDakMsR0FBRyxFQUFFO0VBQUU4QixNQUFBQSxLQUFLLEVBQUxBLEtBQUs7RUFBRUMsTUFBQUEsR0FBRyxFQUFIQSxHQUFBQTtFQUFJLEtBQUMsQ0FBQyxDQUFBO0tBQ3ZDLENBQUUsSUFDSGdDLFlBQVksSUFDWCxDQUFDQSxZQUFZLENBQUNJLElBQUksQ0FBQyxVQUFDRyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUs5QyxTQUFTLENBQUN4QixHQUFHLEVBQUVzRSxXQUFXLENBQUMsQ0FBQTtLQUFFLENBQUEsSUFDbEVOLG9CQUFvQixJQUNuQixDQUFDQSxvQkFBb0IsQ0FBQ0csSUFBSSxDQUFDLFVBQUFJLEtBQUEsRUFBQTtFQUFBLElBQUEsSUFBR3pDLEtBQUssR0FBQXlDLEtBQUEsQ0FBTHpDLEtBQUs7UUFBRUMsR0FBRyxHQUFBd0MsS0FBQSxDQUFIeEMsR0FBRyxDQUFBO01BQUEsT0FDdENFLGlDQUFnQixDQUFDakMsR0FBRyxFQUFFO0VBQUU4QixNQUFBQSxLQUFLLEVBQUxBLEtBQUs7RUFBRUMsTUFBQUEsR0FBRyxFQUFIQSxHQUFBQTtFQUFJLEtBQUMsQ0FBQyxDQUFBO0VBQUEsR0FDdkMsQ0FBRSxJQUNIa0MsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQzFJLE9BQU8sQ0FBQ3lFLEdBQUcsQ0FBQyxDQUFFLElBQ3pDLEtBQUssQ0FBQTtFQUVULENBQUE7RUFFTyxTQUFTd0UsYUFBYUEsQ0FDM0J4RSxHQUFHLEVBRUg7RUFBQSxFQUFBLElBQUF5RSxLQUFBLEdBQUFmLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUR5QyxFQUFFO01BQXpDRyxZQUFZLEdBQUFZLEtBQUEsQ0FBWlosWUFBWTtNQUFFQyxvQkFBb0IsR0FBQVcsS0FBQSxDQUFwQlgsb0JBQW9CLENBQUE7RUFFcEMsRUFBQSxJQUFJQSxvQkFBb0IsSUFBSUEsb0JBQW9CLENBQUNwRyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0VBQzNELElBQUEsT0FBT29HLG9CQUFvQixDQUFDSyxJQUFJLENBQUMsVUFBQU8sS0FBQSxFQUFBO0VBQUEsTUFBQSxJQUFHNUMsS0FBSyxHQUFBNEMsS0FBQSxDQUFMNUMsS0FBSztVQUFFQyxHQUFHLEdBQUEyQyxLQUFBLENBQUgzQyxHQUFHLENBQUE7UUFBQSxPQUM1Q0UsaUNBQWdCLENBQUNqQyxHQUFHLEVBQUU7RUFBRThCLFFBQUFBLEtBQUssRUFBTEEsS0FBSztFQUFFQyxRQUFBQSxHQUFHLEVBQUhBLEdBQUFBO0VBQUksT0FBQyxDQUFDLENBQUE7RUFBQSxLQUN2QyxDQUFDLENBQUE7RUFDSCxHQUFBO0VBQ0EsRUFBQSxPQUNHOEIsWUFBWSxJQUNYQSxZQUFZLENBQUNNLElBQUksQ0FBQyxVQUFDQyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQzVCNUMsU0FBUyxDQUFDeEIsR0FBRyxFQUFFb0UsV0FBVyxDQUFDeEcsSUFBSSxHQUFHd0csV0FBVyxDQUFDeEcsSUFBSSxHQUFHd0csV0FBVyxDQUFDLENBQUE7S0FDbkUsQ0FBQyxJQUNILEtBQUssQ0FBQTtFQUVULENBQUE7RUFFTyxTQUFTTyxlQUFlQSxDQUM3QnpCLEtBQUssRUFFTDtFQUFBLEVBQUEsSUFBQTBCLEtBQUEsR0FBQWxCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUQrRCxFQUFFO01BQS9EdkgsT0FBTyxHQUFBeUksS0FBQSxDQUFQekksT0FBTztNQUFFeUgsT0FBTyxHQUFBZ0IsS0FBQSxDQUFQaEIsT0FBTztNQUFFQyxZQUFZLEdBQUFlLEtBQUEsQ0FBWmYsWUFBWTtNQUFFRSxZQUFZLEdBQUFhLEtBQUEsQ0FBWmIsWUFBWTtNQUFFRSxVQUFVLEdBQUFXLEtBQUEsQ0FBVlgsVUFBVSxDQUFBO0lBRTFELE9BQ0VDLGFBQWEsQ0FBQ2hCLEtBQUssRUFBRTtFQUNuQi9HLElBQUFBLE9BQU8sRUFBRXFFLHlCQUFZLENBQUNyRSxPQUFPLENBQUM7TUFDOUJ5SCxPQUFPLEVBQUVpQixxQkFBVSxDQUFDakIsT0FBTyxDQUFBO0tBQzVCLENBQUMsSUFDREMsWUFBWSxJQUNYQSxZQUFZLENBQUNNLElBQUksQ0FBQyxVQUFDQyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUtoRCxXQUFXLENBQUM4QixLQUFLLEVBQUVrQixXQUFXLENBQUMsQ0FBQTtLQUFFLENBQUEsSUFDckVMLFlBQVksSUFDWCxDQUFDQSxZQUFZLENBQUNJLElBQUksQ0FBQyxVQUFDRyxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUtsRCxXQUFXLENBQUM4QixLQUFLLEVBQUVvQixXQUFXLENBQUMsQ0FBQTtFQUFBLEdBQUEsQ0FBRSxJQUN0RUwsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQzFJLE9BQU8sQ0FBQzJILEtBQUssQ0FBQyxDQUFFLElBQzNDLEtBQUssQ0FBQTtFQUVULENBQUE7RUFFTyxTQUFTNEIsY0FBY0EsQ0FBQ3RHLFNBQVMsRUFBRUMsT0FBTyxFQUFFc0csQ0FBQyxFQUFFL0UsR0FBRyxFQUFFO0VBQ3pELEVBQUEsSUFBTWdGLGFBQWEsR0FBR0MsZUFBTyxDQUFDekcsU0FBUyxDQUFDLENBQUE7RUFDeEMsRUFBQSxJQUFNMEcsY0FBYyxHQUFHQyxpQkFBUSxDQUFDM0csU0FBUyxDQUFDLENBQUE7RUFDMUMsRUFBQSxJQUFNNEcsV0FBVyxHQUFHSCxlQUFPLENBQUN4RyxPQUFPLENBQUMsQ0FBQTtFQUNwQyxFQUFBLElBQU00RyxZQUFZLEdBQUdGLGlCQUFRLENBQUMxRyxPQUFPLENBQUMsQ0FBQTtFQUN0QyxFQUFBLElBQU02RyxPQUFPLEdBQUdMLGVBQU8sQ0FBQ2pGLEdBQUcsQ0FBQyxDQUFBO0VBQzVCLEVBQUEsSUFBSWdGLGFBQWEsS0FBS0ksV0FBVyxJQUFJSixhQUFhLEtBQUtNLE9BQU8sRUFBRTtFQUM5RCxJQUFBLE9BQU9KLGNBQWMsSUFBSUgsQ0FBQyxJQUFJQSxDQUFDLElBQUlNLFlBQVksQ0FBQTtFQUNqRCxHQUFDLE1BQU0sSUFBSUwsYUFBYSxHQUFHSSxXQUFXLEVBQUU7TUFDdEMsT0FDR0UsT0FBTyxLQUFLTixhQUFhLElBQUlFLGNBQWMsSUFBSUgsQ0FBQyxJQUNoRE8sT0FBTyxLQUFLRixXQUFXLElBQUlDLFlBQVksSUFBSU4sQ0FBRSxJQUM3Q08sT0FBTyxHQUFHRixXQUFXLElBQUlFLE9BQU8sR0FBR04sYUFBYyxDQUFBO0VBRXRELEdBQUE7RUFDRixDQUFBO0VBRU8sU0FBU08saUJBQWlCQSxDQUMvQmpDLE9BQU8sRUFFUDtFQUFBLEVBQUEsSUFBQWtDLEtBQUEsR0FBQTlCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUQrRCxFQUFFO01BQS9EdkgsT0FBTyxHQUFBcUosS0FBQSxDQUFQckosT0FBTztNQUFFeUgsT0FBTyxHQUFBNEIsS0FBQSxDQUFQNUIsT0FBTztNQUFFQyxZQUFZLEdBQUEyQixLQUFBLENBQVozQixZQUFZO01BQUVFLFlBQVksR0FBQXlCLEtBQUEsQ0FBWnpCLFlBQVk7TUFBRUUsVUFBVSxHQUFBdUIsS0FBQSxDQUFWdkIsVUFBVSxDQUFBO0lBRTFELE9BQ0VDLGFBQWEsQ0FBQ1osT0FBTyxFQUFFO0VBQUVuSCxJQUFBQSxPQUFPLEVBQVBBLE9BQU87RUFBRXlILElBQUFBLE9BQU8sRUFBUEEsT0FBQUE7S0FBUyxDQUFDLElBQzNDQyxZQUFZLElBQ1hBLFlBQVksQ0FBQ00sSUFBSSxDQUFDLFVBQUNDLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDNUI5QyxhQUFhLENBQUNnQyxPQUFPLEVBQUVjLFdBQVcsQ0FBQyxDQUFBO0tBQ3JDLENBQUUsSUFDSEwsWUFBWSxJQUNYLENBQUNBLFlBQVksQ0FBQ0ksSUFBSSxDQUFDLFVBQUNHLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDN0JoRCxhQUFhLENBQUNnQyxPQUFPLEVBQUVnQixXQUFXLENBQUMsQ0FBQTtFQUFBLEdBQ3JDLENBQUUsSUFDSEwsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQzFJLE9BQU8sQ0FBQytILE9BQU8sQ0FBQyxDQUFFLElBQzdDLEtBQUssQ0FBQTtFQUVULENBQUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ08sU0FBU21DLGFBQWFBLENBQUNDLElBQUksRUFBRTVELEtBQUssRUFBRUMsR0FBRyxFQUFFO0VBQzlDLEVBQUEsSUFBSSxDQUFDbEUsaUJBQVcsQ0FBQ2lFLEtBQUssQ0FBQyxJQUFJLENBQUNqRSxpQkFBVyxDQUFDa0UsR0FBRyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUE7RUFDMUQsRUFBQSxJQUFNNEQsU0FBUyxHQUFHVixlQUFPLENBQUNuRCxLQUFLLENBQUMsQ0FBQTtFQUNoQyxFQUFBLElBQU04RCxPQUFPLEdBQUdYLGVBQU8sQ0FBQ2xELEdBQUcsQ0FBQyxDQUFBO0VBRTVCLEVBQUEsT0FBTzRELFNBQVMsSUFBSUQsSUFBSSxJQUFJRSxPQUFPLElBQUlGLElBQUksQ0FBQTtFQUM3QyxDQUFBO0VBRU8sU0FBU0csY0FBY0EsQ0FDNUJILElBQUksRUFFSjtFQUFBLEVBQUEsSUFBQUksTUFBQSxHQUFBcEMsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRCtELEVBQUU7TUFBL0R2SCxPQUFPLEdBQUEySixNQUFBLENBQVAzSixPQUFPO01BQUV5SCxPQUFPLEdBQUFrQyxNQUFBLENBQVBsQyxPQUFPO01BQUVDLFlBQVksR0FBQWlDLE1BQUEsQ0FBWmpDLFlBQVk7TUFBRUUsWUFBWSxHQUFBK0IsTUFBQSxDQUFaL0IsWUFBWTtNQUFFRSxVQUFVLEdBQUE2QixNQUFBLENBQVY3QixVQUFVLENBQUE7SUFFMUQsSUFBTXJHLElBQUksR0FBRyxJQUFJL0IsSUFBSSxDQUFDNkosSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNqQyxPQUNFeEIsYUFBYSxDQUFDdEcsSUFBSSxFQUFFO0VBQ2xCekIsSUFBQUEsT0FBTyxFQUFFdUUsdUJBQVcsQ0FBQ3ZFLE9BQU8sQ0FBQztNQUM3QnlILE9BQU8sRUFBRW1DLG1CQUFTLENBQUNuQyxPQUFPLENBQUE7S0FDM0IsQ0FBQyxJQUNEQyxZQUFZLElBQ1hBLFlBQVksQ0FBQ00sSUFBSSxDQUFDLFVBQUNDLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FBS3BELFVBQVUsQ0FBQ3BELElBQUksRUFBRXdHLFdBQVcsQ0FBQyxDQUFBO0tBQUUsQ0FBQSxJQUNuRUwsWUFBWSxJQUNYLENBQUNBLFlBQVksQ0FBQ0ksSUFBSSxDQUFDLFVBQUNHLFdBQVcsRUFBQTtFQUFBLElBQUEsT0FBS3RELFVBQVUsQ0FBQ3BELElBQUksRUFBRTBHLFdBQVcsQ0FBQyxDQUFBO0VBQUEsR0FBQSxDQUFFLElBQ3BFTCxVQUFVLElBQUksQ0FBQ0EsVUFBVSxDQUFDMUksT0FBTyxDQUFDcUMsSUFBSSxDQUFDLENBQUUsSUFDMUMsS0FBSyxDQUFBO0VBRVQsQ0FBQTtFQUVPLFNBQVNvSSxnQkFBZ0JBLENBQUN4SCxTQUFTLEVBQUVDLE9BQU8sRUFBRXdILENBQUMsRUFBRWpHLEdBQUcsRUFBRTtFQUMzRCxFQUFBLElBQU1nRixhQUFhLEdBQUdDLGVBQU8sQ0FBQ3pHLFNBQVMsQ0FBQyxDQUFBO0VBQ3hDLEVBQUEsSUFBTTBILGdCQUFnQixHQUFHQyxxQkFBVSxDQUFDM0gsU0FBUyxDQUFDLENBQUE7RUFDOUMsRUFBQSxJQUFNNEcsV0FBVyxHQUFHSCxlQUFPLENBQUN4RyxPQUFPLENBQUMsQ0FBQTtFQUNwQyxFQUFBLElBQU0ySCxjQUFjLEdBQUdELHFCQUFVLENBQUMxSCxPQUFPLENBQUMsQ0FBQTtFQUMxQyxFQUFBLElBQU02RyxPQUFPLEdBQUdMLGVBQU8sQ0FBQ2pGLEdBQUcsQ0FBQyxDQUFBO0VBQzVCLEVBQUEsSUFBSWdGLGFBQWEsS0FBS0ksV0FBVyxJQUFJSixhQUFhLEtBQUtNLE9BQU8sRUFBRTtFQUM5RCxJQUFBLE9BQU9ZLGdCQUFnQixJQUFJRCxDQUFDLElBQUlBLENBQUMsSUFBSUcsY0FBYyxDQUFBO0VBQ3JELEdBQUMsTUFBTSxJQUFJcEIsYUFBYSxHQUFHSSxXQUFXLEVBQUU7TUFDdEMsT0FDR0UsT0FBTyxLQUFLTixhQUFhLElBQUlrQixnQkFBZ0IsSUFBSUQsQ0FBQyxJQUNsRFgsT0FBTyxLQUFLRixXQUFXLElBQUlnQixjQUFjLElBQUlILENBQUUsSUFDL0NYLE9BQU8sR0FBR0YsV0FBVyxJQUFJRSxPQUFPLEdBQUdOLGFBQWMsQ0FBQTtFQUV0RCxHQUFBO0VBQ0YsQ0FBQTtFQUVPLFNBQVNkLGFBQWFBLENBQUNsRSxHQUFHLEVBQTZCO0VBQUEsRUFBQSxJQUFBcUcsTUFBQSxHQUFBM0MsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUosRUFBRTtNQUF2QnZILE9BQU8sR0FBQWtLLE1BQUEsQ0FBUGxLLE9BQU87TUFBRXlILE9BQU8sR0FBQXlDLE1BQUEsQ0FBUHpDLE9BQU8sQ0FBQTtJQUNuRCxPQUNHekgsT0FBTyxJQUFJbUssaURBQXdCLENBQUN0RyxHQUFHLEVBQUU3RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQ3JEeUgsT0FBTyxJQUFJMEMsaURBQXdCLENBQUN0RyxHQUFHLEVBQUU0RCxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUE7RUFFM0QsQ0FBQTtFQUVPLFNBQVMyQyxZQUFZQSxDQUFDQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtFQUN4QyxFQUFBLE9BQU9BLEtBQUssQ0FBQ3RDLElBQUksQ0FDZixVQUFDdUMsUUFBUSxFQUFBO0VBQUEsSUFBQSxPQUNQQyxpQkFBUSxDQUFDRCxRQUFRLENBQUMsS0FBS0MsaUJBQVEsQ0FBQ0gsSUFBSSxDQUFDLElBQ3JDSSxxQkFBVSxDQUFDRixRQUFRLENBQUMsS0FBS0UscUJBQVUsQ0FBQ0osSUFBSSxDQUFDLElBQ3pDSyxxQkFBVSxDQUFDSCxRQUFRLENBQUMsS0FBS0cscUJBQVUsQ0FBQ0wsSUFBSSxDQUFDLENBQUE7RUFBQSxHQUM3QyxDQUFDLENBQUE7RUFDSCxDQUFBO0VBRU8sU0FBU00sY0FBY0EsQ0FDNUJOLElBQUksRUFFSjtFQUFBLEVBQUEsSUFBQU8sTUFBQSxHQUFBckQsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRDZDLEVBQUU7TUFBN0NzRCxZQUFZLEdBQUFELE1BQUEsQ0FBWkMsWUFBWTtNQUFFQyxZQUFZLEdBQUFGLE1BQUEsQ0FBWkUsWUFBWTtNQUFFQyxVQUFVLEdBQUFILE1BQUEsQ0FBVkcsVUFBVSxDQUFBO0lBRXhDLE9BQ0dGLFlBQVksSUFBSVQsWUFBWSxDQUFDQyxJQUFJLEVBQUVRLFlBQVksQ0FBQyxJQUNoREMsWUFBWSxJQUFJLENBQUNWLFlBQVksQ0FBQ0MsSUFBSSxFQUFFUyxZQUFZLENBQUUsSUFDbERDLFVBQVUsSUFBSSxDQUFDQSxVQUFVLENBQUNWLElBQUksQ0FBRSxJQUNqQyxLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU1cscUJBQXFCQSxDQUFDWCxJQUFJLEVBQUFZLE1BQUEsRUFBd0I7RUFBQSxFQUFBLElBQXBCQyxPQUFPLEdBQUFELE1BQUEsQ0FBUEMsT0FBTztNQUFFQyxPQUFPLEdBQUFGLE1BQUEsQ0FBUEUsT0FBTyxDQUFBO0VBQzVELEVBQUEsSUFBSSxDQUFDRCxPQUFPLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQ3hCLElBQUEsTUFBTSxJQUFJQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQTtFQUM1RCxHQUFBO0VBQ0EsRUFBQSxJQUFJQyxRQUFRLEdBQUdqTSxPQUFPLEVBQUUsQ0FBQTtJQUN4QmlNLFFBQVEsR0FBRzlILGlCQUFRLENBQUM4SCxRQUFRLEVBQUViLGlCQUFRLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUE7SUFDN0NnQixRQUFRLEdBQUc3SCxxQkFBVSxDQUFDNkgsUUFBUSxFQUFFWixxQkFBVSxDQUFDSixJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ2pEZ0IsUUFBUSxHQUFHNUgscUJBQVUsQ0FBQzRILFFBQVEsRUFBRVgscUJBQVUsQ0FBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQTtFQUVqRCxFQUFBLElBQUlpQixHQUFHLEdBQUdsTSxPQUFPLEVBQUUsQ0FBQTtJQUNuQmtNLEdBQUcsR0FBRy9ILGlCQUFRLENBQUMrSCxHQUFHLEVBQUVkLGlCQUFRLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDdENJLEdBQUcsR0FBRzlILHFCQUFVLENBQUM4SCxHQUFHLEVBQUViLHFCQUFVLENBQUNTLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDMUNJLEdBQUcsR0FBRzdILHFCQUFVLENBQUM2SCxHQUFHLEVBQUVaLHFCQUFVLENBQUNRLE9BQU8sQ0FBQyxDQUFDLENBQUE7RUFFMUMsRUFBQSxJQUFJSyxHQUFHLEdBQUduTSxPQUFPLEVBQUUsQ0FBQTtJQUNuQm1NLEdBQUcsR0FBR2hJLGlCQUFRLENBQUNnSSxHQUFHLEVBQUVmLGlCQUFRLENBQUNXLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDdENJLEdBQUcsR0FBRy9ILHFCQUFVLENBQUMrSCxHQUFHLEVBQUVkLHFCQUFVLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDMUNJLEdBQUcsR0FBRzlILHFCQUFVLENBQUM4SCxHQUFHLEVBQUViLHFCQUFVLENBQUNTLE9BQU8sQ0FBQyxDQUFDLENBQUE7RUFFMUMsRUFBQSxJQUFJekYsS0FBSyxDQUFBO0lBQ1QsSUFBSTtFQUNGQSxJQUFBQSxLQUFLLEdBQUcsQ0FBQ0ksaUNBQWdCLENBQUN1RixRQUFRLEVBQUU7RUFBRTFGLE1BQUFBLEtBQUssRUFBRTJGLEdBQUc7RUFBRTFGLE1BQUFBLEdBQUcsRUFBRTJGLEdBQUFBO0VBQUksS0FBQyxDQUFDLENBQUE7S0FDOUQsQ0FBQyxPQUFPeEYsR0FBRyxFQUFFO0VBQ1pMLElBQUFBLEtBQUssR0FBRyxLQUFLLENBQUE7RUFDZixHQUFBO0VBQ0EsRUFBQSxPQUFPQSxLQUFLLENBQUE7RUFDZCxDQUFBO0VBRU8sU0FBUzhGLG1CQUFtQkEsQ0FBQzNILEdBQUcsRUFBa0M7RUFBQSxFQUFBLElBQUE0SCxNQUFBLEdBQUFsRSxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO01BQTVCdkgsT0FBTyxHQUFBeUwsTUFBQSxDQUFQekwsT0FBTztNQUFFNEgsWUFBWSxHQUFBNkQsTUFBQSxDQUFaN0QsWUFBWSxDQUFBO0VBQzlELEVBQUEsSUFBTThELGFBQWEsR0FBR0MsbUJBQVMsQ0FBQzlILEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUN2QyxFQUFBLE9BQ0c3RCxPQUFPLElBQUk0TCxxREFBMEIsQ0FBQzVMLE9BQU8sRUFBRTBMLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFDakU5RCxZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDVnlELHFEQUEwQixDQUFDekQsV0FBVyxFQUFFdUQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzlELENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU0ksa0JBQWtCQSxDQUFDakksR0FBRyxFQUFrQztFQUFBLEVBQUEsSUFBQWtJLE1BQUEsR0FBQXhFLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7TUFBNUJFLE9BQU8sR0FBQXNFLE1BQUEsQ0FBUHRFLE9BQU87TUFBRUcsWUFBWSxHQUFBbUUsTUFBQSxDQUFabkUsWUFBWSxDQUFBO0VBQzdELEVBQUEsSUFBTW9FLFNBQVMsR0FBR0MsbUJBQVMsQ0FBQ3BJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNuQyxFQUFBLE9BQ0c0RCxPQUFPLElBQUltRSxxREFBMEIsQ0FBQ0ksU0FBUyxFQUFFdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUM3REcsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUt5RCxxREFBMEIsQ0FBQ0ksU0FBUyxFQUFFN0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3pFLENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBUytELHFCQUFxQkEsQ0FBQ3pLLElBQUksRUFBa0M7RUFBQSxFQUFBLElBQUEwSyxNQUFBLEdBQUE1RSxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO01BQTVCdkgsT0FBTyxHQUFBbU0sTUFBQSxDQUFQbk0sT0FBTztNQUFFNEgsWUFBWSxHQUFBdUUsTUFBQSxDQUFadkUsWUFBWSxDQUFBO0VBQ2pFLEVBQUEsSUFBTXdFLGVBQWUsR0FBRzdILHVCQUFXLENBQUM5QyxJQUFJLENBQUMsQ0FBQTtFQUN6QyxFQUFBLElBQU00SyxlQUFlLEdBQUdDLHVCQUFXLENBQUNGLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUV2RCxFQUFBLE9BQ0dwTSxPQUFPLElBQUl1TSx5REFBNEIsQ0FBQ3ZNLE9BQU8sRUFBRXFNLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFDckV6RSxZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDVm9FLHlEQUE0QixDQUFDcEUsV0FBVyxFQUFFa0UsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2xFLENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU0csb0JBQW9CQSxDQUFDL0ssSUFBSSxFQUFrQztFQUFBLEVBQUEsSUFBQWdMLE1BQUEsR0FBQWxGLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7TUFBNUJFLE9BQU8sR0FBQWdGLE1BQUEsQ0FBUGhGLE9BQU87TUFBRUcsWUFBWSxHQUFBNkUsTUFBQSxDQUFaN0UsWUFBWSxDQUFBO0VBQ2hFLEVBQUEsSUFBTThFLGNBQWMsR0FBRzlDLG1CQUFTLENBQUNuSSxJQUFJLENBQUMsQ0FBQTtFQUN0QyxFQUFBLElBQU1rTCxXQUFXLEdBQUdDLHVCQUFXLENBQUNGLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUVsRCxFQUFBLE9BQ0dqRixPQUFPLElBQUk4RSx5REFBNEIsQ0FBQ0ksV0FBVyxFQUFFbEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUNqRUcsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQ1ZvRSx5REFBNEIsQ0FBQ0ksV0FBVyxFQUFFeEUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzlELENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBUzBFLGtCQUFrQkEsQ0FBQ2hKLEdBQUcsRUFBa0M7RUFBQSxFQUFBLElBQUFpSixNQUFBLEdBQUF2RixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO01BQTVCdkgsT0FBTyxHQUFBOE0sTUFBQSxDQUFQOU0sT0FBTztNQUFFNEgsWUFBWSxHQUFBa0YsTUFBQSxDQUFabEYsWUFBWSxDQUFBO0VBQzdELEVBQUEsSUFBTW1GLFlBQVksR0FBR0MsaUJBQVEsQ0FBQ25KLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNyQyxFQUFBLE9BQ0c3RCxPQUFPLElBQUlpTixtREFBeUIsQ0FBQ2pOLE9BQU8sRUFBRStNLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFDL0RuRixZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtFQUFBLElBQUEsT0FDVjhFLG1EQUF5QixDQUFDOUUsV0FBVyxFQUFFNEUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzVELENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBU0csbUJBQW1CQSxDQUNqQ3JKLEdBQUcsRUFFSDtFQUFBLEVBQUEsSUFBQXNKLE1BQUEsR0FBQTVGLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUR5RCxFQUFFO01BQXpEdkgsT0FBTyxHQUFBbU4sTUFBQSxDQUFQbk4sT0FBTztNQUFBb04scUJBQUEsR0FBQUQsTUFBQSxDQUFFRSxjQUFjO0VBQWRBLElBQUFBLGNBQWMsR0FBQUQscUJBQUEsS0FBR2xPLEtBQUFBLENBQUFBLEdBQUFBLHdCQUF3QixHQUFBa08scUJBQUEsQ0FBQTtJQUVwRCxJQUFNTCxZQUFZLEdBQUd6SSxjQUFjLENBQUMwSSxpQkFBUSxDQUFDbkosR0FBRyxFQUFFd0osY0FBYyxDQUFDLENBQUMsQ0FBQTtFQUNsRSxFQUFBLElBQUFDLGVBQUEsR0FBc0JDLGNBQWMsQ0FBQ1IsWUFBWSxFQUFFTSxjQUFjLENBQUM7TUFBMURHLFNBQVMsR0FBQUYsZUFBQSxDQUFURSxTQUFTLENBQUE7RUFDakIsRUFBQSxJQUFNQyxXQUFXLEdBQUd6TixPQUFPLElBQUk4SSxlQUFPLENBQUM5SSxPQUFPLENBQUMsQ0FBQTtFQUMvQyxFQUFBLE9BQVF5TixXQUFXLElBQUlBLFdBQVcsR0FBR0QsU0FBUyxJQUFLLEtBQUssQ0FBQTtFQUMxRCxDQUFBO0VBRU8sU0FBU0UsaUJBQWlCQSxDQUFDN0osR0FBRyxFQUFrQztFQUFBLEVBQUEsSUFBQThKLE1BQUEsR0FBQXBHLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7TUFBNUJFLE9BQU8sR0FBQWtHLE1BQUEsQ0FBUGxHLE9BQU87TUFBRUcsWUFBWSxHQUFBK0YsTUFBQSxDQUFaL0YsWUFBWSxDQUFBO0VBQzVELEVBQUEsSUFBTWdHLFFBQVEsR0FBR0MsaUJBQVEsQ0FBQ2hLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNqQyxFQUFBLE9BQ0c0RCxPQUFPLElBQUl3RixtREFBeUIsQ0FBQ1csUUFBUSxFQUFFbkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUMzREcsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7RUFBQSxJQUFBLE9BQUs4RSxtREFBeUIsQ0FBQ1csUUFBUSxFQUFFekYsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3ZFLENBQUUsSUFDSixLQUFLLENBQUE7RUFFVCxDQUFBO0VBRU8sU0FBUzJGLGtCQUFrQkEsQ0FDaENqSyxHQUFHLEVBRUg7RUFBQSxFQUFBLElBQUFrSyxNQUFBLEdBQUF4RyxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FEeUQsRUFBRTtNQUF6REUsT0FBTyxHQUFBc0csTUFBQSxDQUFQdEcsT0FBTztNQUFBdUcscUJBQUEsR0FBQUQsTUFBQSxDQUFFVixjQUFjO0VBQWRBLElBQUFBLGNBQWMsR0FBQVcscUJBQUEsS0FBRzlPLEtBQUFBLENBQUFBLEdBQUFBLHdCQUF3QixHQUFBOE8scUJBQUEsQ0FBQTtFQUVwRCxFQUFBLElBQU1KLFFBQVEsR0FBR0MsaUJBQVEsQ0FBQ2hLLEdBQUcsRUFBRXdKLGNBQWMsQ0FBQyxDQUFBO0VBQzlDLEVBQUEsSUFBQVksZ0JBQUEsR0FBd0JWLGNBQWMsQ0FBQ0ssUUFBUSxFQUFFUCxjQUFjLENBQUM7TUFBeERhLFdBQVcsR0FBQUQsZ0JBQUEsQ0FBWEMsV0FBVyxDQUFBO0VBQ25CLEVBQUEsSUFBTUMsV0FBVyxHQUFHMUcsT0FBTyxJQUFJcUIsZUFBTyxDQUFDckIsT0FBTyxDQUFDLENBQUE7RUFDL0MsRUFBQSxPQUFRMEcsV0FBVyxJQUFJQSxXQUFXLEdBQUdELFdBQVcsSUFBSyxLQUFLLENBQUE7RUFDNUQsQ0FBQTtFQUVPLFNBQVNFLG1CQUFtQkEsQ0FBQUMsTUFBQSxFQUE0QjtFQUFBLEVBQUEsSUFBekJyTyxPQUFPLEdBQUFxTyxNQUFBLENBQVByTyxPQUFPO01BQUU0SCxZQUFZLEdBQUF5RyxNQUFBLENBQVp6RyxZQUFZLENBQUE7SUFDekQsSUFBSUEsWUFBWSxJQUFJNUgsT0FBTyxFQUFFO0VBQzNCLElBQUEsSUFBSXNPLFFBQVEsR0FBRzFHLFlBQVksQ0FBQzJHLE1BQU0sQ0FDaEMsVUFBQ3BHLFdBQVcsRUFBQTtFQUFBLE1BQUEsT0FBS2dDLGlEQUF3QixDQUFDaEMsV0FBVyxFQUFFbkksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQUEsS0FDdEUsQ0FBQyxDQUFBO01BQ0QsT0FBT3NMLE9BQUcsQ0FBQ2dELFFBQVEsQ0FBQyxDQUFBO0tBQ3JCLE1BQU0sSUFBSTFHLFlBQVksRUFBRTtNQUN2QixPQUFPMEQsT0FBRyxDQUFDMUQsWUFBWSxDQUFDLENBQUE7RUFDMUIsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPNUgsT0FBTyxDQUFBO0VBQ2hCLEdBQUE7RUFDRixDQUFBO0VBRU8sU0FBU3dPLG1CQUFtQkEsQ0FBQUMsTUFBQSxFQUE0QjtFQUFBLEVBQUEsSUFBekJoSCxPQUFPLEdBQUFnSCxNQUFBLENBQVBoSCxPQUFPO01BQUVHLFlBQVksR0FBQTZHLE1BQUEsQ0FBWjdHLFlBQVksQ0FBQTtJQUN6RCxJQUFJQSxZQUFZLElBQUlILE9BQU8sRUFBRTtFQUMzQixJQUFBLElBQUlpSCxRQUFRLEdBQUc5RyxZQUFZLENBQUMyRyxNQUFNLENBQ2hDLFVBQUNwRyxXQUFXLEVBQUE7RUFBQSxNQUFBLE9BQUtnQyxpREFBd0IsQ0FBQ2hDLFdBQVcsRUFBRVYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQUEsS0FDdEUsQ0FBQyxDQUFBO01BQ0QsT0FBTzhELE9BQUcsQ0FBQ21ELFFBQVEsQ0FBQyxDQUFBO0tBQ3JCLE1BQU0sSUFBSTlHLFlBQVksRUFBRTtNQUN2QixPQUFPMkQsT0FBRyxDQUFDM0QsWUFBWSxDQUFDLENBQUE7RUFDMUIsR0FBQyxNQUFNO0VBQ0wsSUFBQSxPQUFPSCxPQUFPLENBQUE7RUFDaEIsR0FBQTtFQUNGLENBQUE7RUFFTyxTQUFTa0gsb0JBQW9CQSxHQUdsQztFQUFBLEVBQUEsSUFGQUMsY0FBYyxHQUFBckgsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO0VBQUEsRUFBQSxJQUNuQnNILGdCQUFnQixHQUFBdEgsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsb0NBQW9DLENBQUE7RUFFdkQsRUFBQSxJQUFNdUgsV0FBVyxHQUFHLElBQUlDLEdBQUcsRUFBRSxDQUFBO0VBQzdCLEVBQUEsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQyxHQUFHLEdBQUdMLGNBQWMsQ0FBQ3JOLE1BQU0sRUFBRXlOLENBQUMsR0FBR0MsR0FBRyxFQUFFRCxDQUFDLEVBQUUsRUFBRTtFQUN6RCxJQUFBLElBQU1FLEdBQUcsR0FBR04sY0FBYyxDQUFDSSxDQUFDLENBQUMsQ0FBQTtFQUM3QixJQUFBLElBQUlHLGFBQU0sQ0FBQ0QsR0FBRyxDQUFDLEVBQUU7RUFDZixNQUFBLElBQU1FLEdBQUcsR0FBR3RPLFVBQVUsQ0FBQ29PLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUN6QyxJQUFNRyxhQUFhLEdBQUdQLFdBQVcsQ0FBQ1EsR0FBRyxDQUFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7RUFDaEQsTUFBQSxJQUFJLENBQUNDLGFBQWEsQ0FBQ0UsUUFBUSxDQUFDVixnQkFBZ0IsQ0FBQyxFQUFFO0VBQzdDUSxRQUFBQSxhQUFhLENBQUNHLElBQUksQ0FBQ1gsZ0JBQWdCLENBQUMsQ0FBQTtFQUNwQ0MsUUFBQUEsV0FBVyxDQUFDVyxHQUFHLENBQUNMLEdBQUcsRUFBRUMsYUFBYSxDQUFDLENBQUE7RUFDckMsT0FBQTtFQUNGLEtBQUMsTUFBTSxJQUFJSyxPQUFBLENBQU9SLEdBQUcsQ0FBQSxLQUFLLFFBQVEsRUFBRTtFQUNsQyxNQUFBLElBQU1TLElBQUksR0FBR0MsTUFBTSxDQUFDRCxJQUFJLENBQUNULEdBQUcsQ0FBQyxDQUFBO0VBQzdCLE1BQUEsSUFBTVcsU0FBUyxHQUFHRixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekIsSUFBTUcsVUFBVSxHQUFHWixHQUFHLENBQUNTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksT0FBT0UsU0FBUyxLQUFLLFFBQVEsSUFBSUMsVUFBVSxDQUFDQyxXQUFXLEtBQUt6UCxLQUFLLEVBQUU7RUFDckUsUUFBQSxLQUFLLElBQUkwUCxDQUFDLEdBQUcsQ0FBQyxFQUFFZixJQUFHLEdBQUdhLFVBQVUsQ0FBQ3ZPLE1BQU0sRUFBRXlPLENBQUMsR0FBR2YsSUFBRyxFQUFFZSxDQUFDLEVBQUUsRUFBRTtZQUNyRCxJQUFNWixJQUFHLEdBQUd0TyxVQUFVLENBQUNnUCxVQUFVLENBQUNFLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFBO1lBQ25ELElBQU1YLGNBQWEsR0FBR1AsV0FBVyxDQUFDUSxHQUFHLENBQUNGLElBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtFQUNoRCxVQUFBLElBQUksQ0FBQ0MsY0FBYSxDQUFDRSxRQUFRLENBQUNNLFNBQVMsQ0FBQyxFQUFFO0VBQ3RDUixZQUFBQSxjQUFhLENBQUNHLElBQUksQ0FBQ0ssU0FBUyxDQUFDLENBQUE7RUFDN0JmLFlBQUFBLFdBQVcsQ0FBQ1csR0FBRyxDQUFDTCxJQUFHLEVBQUVDLGNBQWEsQ0FBQyxDQUFBO0VBQ3JDLFdBQUE7RUFDRixTQUFBO0VBQ0YsT0FBQTtFQUNGLEtBQUE7RUFDRixHQUFBO0VBQ0EsRUFBQSxPQUFPUCxXQUFXLENBQUE7RUFDcEIsQ0FBQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTbUIsY0FBY0EsQ0FBQ0MsTUFBTSxFQUFFQyxNQUFNLEVBQUU7RUFDN0MsRUFBQSxJQUFJRCxNQUFNLENBQUMzTyxNQUFNLEtBQUs0TyxNQUFNLENBQUM1TyxNQUFNLEVBQUU7RUFDbkMsSUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLEdBQUE7RUFFQSxFQUFBLE9BQU8yTyxNQUFNLENBQUNyRSxLQUFLLENBQUMsVUFBQ3hNLEtBQUssRUFBRStRLEtBQUssRUFBQTtFQUFBLElBQUEsT0FBSy9RLEtBQUssS0FBSzhRLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDLENBQUE7S0FBQyxDQUFBLENBQUE7RUFDaEUsQ0FBQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTQyxjQUFjQSxHQUc1QjtFQUFBLEVBQUEsSUFGQUMsWUFBWSxHQUFBL0ksU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO0VBQUEsRUFBQSxJQUNqQnNILGdCQUFnQixHQUFBdEgsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsaUNBQWlDLENBQUE7RUFFcEQsRUFBQSxJQUFNdUgsV0FBVyxHQUFHLElBQUlDLEdBQUcsRUFBRSxDQUFBO0VBQzdCdUIsRUFBQUEsWUFBWSxDQUFDOVAsT0FBTyxDQUFDLFVBQUMrUCxPQUFPLEVBQUs7RUFDaEMsSUFBQSxJQUFjQyxPQUFPLEdBQWtCRCxPQUFPLENBQXRDOU8sSUFBSTtRQUFXZ1AsV0FBVyxHQUFLRixPQUFPLENBQXZCRSxXQUFXLENBQUE7RUFDbEMsSUFBQSxJQUFJLENBQUN0QixhQUFNLENBQUNxQixPQUFPLENBQUMsRUFBRTtFQUNwQixNQUFBLE9BQUE7RUFDRixLQUFBO0VBRUEsSUFBQSxJQUFNcEIsR0FBRyxHQUFHdE8sVUFBVSxDQUFDMFAsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO01BQzdDLElBQU1FLGFBQWEsR0FBRzVCLFdBQVcsQ0FBQ1EsR0FBRyxDQUFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7TUFDaEQsSUFDRSxXQUFXLElBQUlzQixhQUFhLElBQzVCQSxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUs3QixnQkFBZ0IsSUFDL0NvQixjQUFjLENBQUNTLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDRCxXQUFXLENBQUMsQ0FBQyxFQUM1RDtFQUNBLE1BQUEsT0FBQTtFQUNGLEtBQUE7RUFFQUMsSUFBQUEsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHN0IsZ0JBQWdCLENBQUE7RUFDN0MsSUFBQSxJQUFNOEIsY0FBYyxHQUFHRCxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7RUFDcERBLElBQUFBLGFBQWEsQ0FBQyxjQUFjLENBQUMsR0FBR0MsY0FBYyxNQUFBMU8sTUFBQSxDQUFBMk8sa0JBQUEsQ0FDdENELGNBQWMsQ0FBRUYsRUFBQUEsQ0FBQUEsV0FBVyxDQUMvQixDQUFBLEdBQUEsQ0FBQ0EsV0FBVyxDQUFDLENBQUE7RUFDakIzQixJQUFBQSxXQUFXLENBQUNXLEdBQUcsQ0FBQ0wsR0FBRyxFQUFFc0IsYUFBYSxDQUFDLENBQUE7RUFDckMsR0FBQyxDQUFDLENBQUE7RUFDRixFQUFBLE9BQU81QixXQUFXLENBQUE7RUFDcEIsQ0FBQTtFQUVPLFNBQVMrQixrQkFBa0JBLENBQ2hDOU0sVUFBVSxFQUNWK00sV0FBVyxFQUNYQyxpQkFBaUIsRUFDakJDLFNBQVMsRUFDVEMsYUFBYSxFQUNiO0VBQ0EsRUFBQSxJQUFNQyxDQUFDLEdBQUdELGFBQWEsQ0FBQzFQLE1BQU0sQ0FBQTtJQUM5QixJQUFNK0ksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixLQUFLLElBQUkwRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdrQyxDQUFDLEVBQUVsQyxDQUFDLEVBQUUsRUFBRTtNQUMxQixJQUFJbUMsWUFBWSxHQUFHcE4sVUFBVSxDQUFBO0VBQzdCb04sSUFBQUEsWUFBWSxHQUFHQyxpQkFBUSxDQUFDRCxZQUFZLEVBQUUzRyxpQkFBUSxDQUFDeUcsYUFBYSxDQUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ2pFbUMsSUFBQUEsWUFBWSxHQUFHRSxxQkFBVSxDQUFDRixZQUFZLEVBQUUxRyxxQkFBVSxDQUFDd0csYUFBYSxDQUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3JFbUMsSUFBQUEsWUFBWSxHQUFHRyxrQkFBVSxDQUFDSCxZQUFZLEVBQUV6RyxxQkFBVSxDQUFDdUcsYUFBYSxDQUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBRXJFLElBQUEsSUFBTXVDLFFBQVEsR0FBR0YscUJBQVUsQ0FDekJ0TixVQUFVLEVBQ1YsQ0FBQ2dOLGlCQUFpQixHQUFHLENBQUMsSUFBSUMsU0FDNUIsQ0FBQyxDQUFBO0VBRUQsSUFBQSxJQUNFUSxlQUFPLENBQUNMLFlBQVksRUFBRUwsV0FBVyxDQUFDLElBQ2xDblAsaUJBQVEsQ0FBQ3dQLFlBQVksRUFBRUksUUFBUSxDQUFDLEVBQ2hDO0VBQ0FqSCxNQUFBQSxLQUFLLENBQUNrRixJQUFJLENBQUN5QixhQUFhLENBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQzlCLEtBQUE7RUFDRixHQUFBO0VBRUEsRUFBQSxPQUFPMUUsS0FBSyxDQUFBO0VBQ2QsQ0FBQTtFQUVPLFNBQVNtSCxPQUFPQSxDQUFDekMsQ0FBQyxFQUFFO0lBQ3pCLE9BQU9BLENBQUMsR0FBRyxFQUFFLEdBQUEvTSxHQUFBQSxDQUFBQSxNQUFBLENBQU8rTSxDQUFDLENBQUEvTSxHQUFBQSxFQUFBQSxDQUFBQSxNQUFBLENBQVErTSxDQUFDLENBQUUsQ0FBQTtFQUNsQyxDQUFBO0VBRU8sU0FBU3pCLGNBQWNBLENBQzVCOUwsSUFBSSxFQUVKO0VBQUEsRUFBQSxJQURBNEwsY0FBYyxHQUFBOUYsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUdySSx3QkFBd0IsQ0FBQTtFQUV6QyxFQUFBLElBQU1zTyxTQUFTLEdBQUdrRSxJQUFJLENBQUNDLElBQUksQ0FBQzdJLGVBQU8sQ0FBQ3JILElBQUksQ0FBQyxHQUFHNEwsY0FBYyxDQUFDLEdBQUdBLGNBQWMsQ0FBQTtFQUM1RSxFQUFBLElBQU1hLFdBQVcsR0FBR1YsU0FBUyxJQUFJSCxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEQsT0FBTztFQUFFYSxJQUFBQSxXQUFXLEVBQVhBLFdBQVc7RUFBRVYsSUFBQUEsU0FBUyxFQUFUQSxTQUFBQTtLQUFXLENBQUE7RUFDbkMsQ0FBQTtFQUVPLFNBQVNvRSxhQUFhQSxDQUFDdFMsQ0FBQyxFQUFFO0lBQy9CLElBQU15RSxVQUFVLEdBQUcsSUFBSXJFLElBQUksQ0FBQ0osQ0FBQyxDQUFDdVMsV0FBVyxFQUFFLEVBQUV2UyxDQUFDLENBQUMwSixRQUFRLEVBQUUsRUFBRTFKLENBQUMsQ0FBQ3dTLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDdkUsSUFBTUMsaUJBQWlCLEdBQUcsSUFBSXJTLElBQUksQ0FDaENKLENBQUMsQ0FBQ3VTLFdBQVcsRUFBRSxFQUNmdlMsQ0FBQyxDQUFDMEosUUFBUSxFQUFFLEVBQ1oxSixDQUFDLENBQUN3UyxPQUFPLEVBQUUsRUFDWCxFQUNGLENBQUMsQ0FBQTtFQUVELEVBQUEsT0FBT0osSUFBSSxDQUFDTSxLQUFLLENBQUMsQ0FBQyxDQUFDRCxpQkFBaUIsR0FBRyxDQUFDaE8sVUFBVSxJQUFJLE9BQVMsQ0FBQyxDQUFBO0VBQ25FLENBQUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ08sU0FBU2tPLGFBQWFBLENBQUMzUyxDQUFDLEVBQUU7RUFDL0IsRUFBQSxJQUFNNFMsT0FBTyxHQUFHNVMsQ0FBQyxDQUFDb0wsVUFBVSxFQUFFLENBQUE7RUFDOUIsRUFBQSxJQUFNeUgsWUFBWSxHQUFHN1MsQ0FBQyxDQUFDOFMsZUFBZSxFQUFFLENBQUE7RUFFeEMsRUFBQSxPQUFPM1MsYUFBTSxDQUFDSCxDQUFDLENBQUMrUyxPQUFPLEVBQUUsR0FBR0gsT0FBTyxHQUFHLElBQUksR0FBR0MsWUFBWSxDQUFDLENBQUE7RUFDNUQsQ0FBQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTRyxZQUFZQSxDQUFDQyxFQUFFLEVBQUVDLEVBQUUsRUFBRTtFQUNuQyxFQUFBLE9BQU9QLGFBQWEsQ0FBQ00sRUFBRSxDQUFDLENBQUNGLE9BQU8sRUFBRSxLQUFLSixhQUFhLENBQUNPLEVBQUUsQ0FBQyxDQUFDSCxPQUFPLEVBQUUsQ0FBQTtFQUNwRSxDQUFBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ08sU0FBU0ksZUFBZUEsQ0FBQ2hSLElBQUksRUFBRTtFQUNwQyxFQUFBLElBQUksQ0FBQzBOLGFBQU0sQ0FBQzFOLElBQUksQ0FBQyxFQUFFO0VBQ2pCLElBQUEsTUFBTSxJQUFJMkosS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0VBQ2pDLEdBQUE7RUFFQSxFQUFBLElBQU1zSCxlQUFlLEdBQUcsSUFBSWhULElBQUksQ0FBQytCLElBQUksQ0FBQyxDQUFBO0lBQ3RDaVIsZUFBZSxDQUFDblAsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ3BDLEVBQUEsT0FBT21QLGVBQWUsQ0FBQTtFQUN4QixDQUFBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDTyxTQUFTQyxZQUFZQSxDQUFDbFIsSUFBSSxFQUFFbVIsYUFBYSxFQUFFO0lBQ2hELElBQUksQ0FBQ3pELGFBQU0sQ0FBQzFOLElBQUksQ0FBQyxJQUFJLENBQUMwTixhQUFNLENBQUN5RCxhQUFhLENBQUMsRUFBRTtFQUMzQyxJQUFBLE1BQU0sSUFBSXhILEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0VBQzFDLEdBQUE7RUFFQSxFQUFBLElBQU15SCxZQUFZLEdBQUdKLGVBQWUsQ0FBQ2hSLElBQUksQ0FBQyxDQUFBO0VBQzFDLEVBQUEsSUFBTXFSLHFCQUFxQixHQUFHTCxlQUFlLENBQUNHLGFBQWEsQ0FBQyxDQUFBO0VBRTVELEVBQUEsT0FBT2pSLGlCQUFRLENBQUNrUixZQUFZLEVBQUVDLHFCQUFxQixDQUFDLENBQUE7RUFDdEQsQ0FBQTtFQUVPLFNBQVNDLGNBQWNBLENBQUNDLEtBQUssRUFBRTtJQUNwQyxJQUFNQyxTQUFTLEdBQUcsR0FBRyxDQUFBO0VBQ3JCLEVBQUEsT0FBT0QsS0FBSyxDQUFDNUQsR0FBRyxLQUFLNkQsU0FBUyxDQUFBO0VBQ2hDOztFQ3I5QkEsU0FBU0MsYUFBYUEsQ0FBQzNKLElBQUksRUFBRTRKLFFBQVEsRUFBRW5ULE9BQU8sRUFBRXlILE9BQU8sRUFBRTtJQUN2RCxJQUFNMkwsSUFBSSxHQUFHLEVBQUUsQ0FBQTtFQUNmLEVBQUEsS0FBSyxJQUFJcEUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLENBQUMsR0FBR21FLFFBQVEsR0FBRyxDQUFDLEVBQUVuRSxDQUFDLEVBQUUsRUFBRTtFQUN6QyxJQUFBLElBQU1xRSxPQUFPLEdBQUc5SixJQUFJLEdBQUc0SixRQUFRLEdBQUduRSxDQUFDLENBQUE7TUFDbkMsSUFBSXNFLFNBQVMsR0FBRyxJQUFJLENBQUE7RUFFcEIsSUFBQSxJQUFJdFQsT0FBTyxFQUFFO0VBQ1hzVCxNQUFBQSxTQUFTLEdBQUd4SyxlQUFPLENBQUM5SSxPQUFPLENBQUMsSUFBSXFULE9BQU8sQ0FBQTtFQUN6QyxLQUFBO01BRUEsSUFBSTVMLE9BQU8sSUFBSTZMLFNBQVMsRUFBRTtFQUN4QkEsTUFBQUEsU0FBUyxHQUFHeEssZUFBTyxDQUFDckIsT0FBTyxDQUFDLElBQUk0TCxPQUFPLENBQUE7RUFDekMsS0FBQTtFQUVBLElBQUEsSUFBSUMsU0FBUyxFQUFFO0VBQ2JGLE1BQUFBLElBQUksQ0FBQzVELElBQUksQ0FBQzZELE9BQU8sQ0FBQyxDQUFBO0VBQ3BCLEtBQUE7RUFDRixHQUFBO0VBRUEsRUFBQSxPQUFPRCxJQUFJLENBQUE7RUFDYixDQUFBO0VBQUMsSUFFb0JHLG1CQUFtQiwwQkFBQUMsZ0JBQUEsRUFBQTtJQVd0QyxTQUFBRCxtQkFBQUEsQ0FBWWhSLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFILG1CQUFBLENBQUEsQ0FBQTtFQUNqQkUsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUFKLElBQUFBLEVBQUFBLG1CQUFBLEdBQU1oUixLQUFLLENBQUEsQ0FBQSxDQUFBO01BQUVxUixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBbUNDLFlBQU07RUFDcEIsTUFBQSxJQUFNSSxZQUFZLEdBQUdKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dILElBQUksQ0FBQTtRQUNwQyxJQUFNdUssT0FBTyxHQUFHTCxLQUFBLENBQUtNLEtBQUssQ0FBQ0MsU0FBUyxDQUFDaFQsR0FBRyxDQUFDLFVBQUN1SSxJQUFJLEVBQUE7VUFBQSxvQkFDNUMwSyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxVQUFBQSxTQUFTLEVBQ1BnRSxZQUFZLEtBQUt0SyxJQUFJLEdBQ2pCLDRFQUE0RSxHQUM1RSwrQkFDTDtFQUNENkYsVUFBQUEsR0FBRyxFQUFFN0YsSUFBSztZQUNWNEssT0FBTyxFQUFFVixLQUFBLENBQUtXLFFBQVEsQ0FBQ0MsSUFBSSxDQUFBWixLQUFBLEVBQU9sSyxJQUFJLENBQUU7RUFDeEMsVUFBQSxlQUFBLEVBQWVzSyxZQUFZLEtBQUt0SyxJQUFJLEdBQUcsTUFBTSxHQUFHL0IsU0FBQUE7RUFBVSxTQUFBLEVBRXpEcU0sWUFBWSxLQUFLdEssSUFBSSxnQkFDcEIwSyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1yRSxVQUFBQSxTQUFTLEVBQUMseUNBQUE7RUFBeUMsU0FBQSxFQUFDLFFBQU8sQ0FBQyxHQUVsRSxFQUNELEVBQ0F0RyxJQUNFLENBQUMsQ0FBQTtFQUFBLE9BQ1AsQ0FBQyxDQUFBO0VBRUYsTUFBQSxJQUFNK0ssT0FBTyxHQUFHYixLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLEdBQUc4SSxlQUFPLENBQUMySyxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUE7RUFDdkUsTUFBQSxJQUFNdVUsT0FBTyxHQUFHZCxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFPLEdBQUdxQixlQUFPLENBQUMySyxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUE7RUFFdkUsTUFBQSxJQUFJLENBQUM4TSxPQUFPLElBQUksQ0FBQ2QsS0FBQSxDQUFLTSxLQUFLLENBQUNDLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDLFVBQUNqTCxJQUFJLEVBQUE7VUFBQSxPQUFLQSxJQUFJLEtBQUtnTCxPQUFPLENBQUE7RUFBQSxPQUFBLENBQUMsRUFBRTtFQUN0RVQsUUFBQUEsT0FBTyxDQUFDVyxPQUFPLGVBQ2JSLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFVBQUFBLFNBQVMsRUFBQywrQkFBK0I7RUFDekNULFVBQUFBLEdBQUcsRUFBRSxVQUFXO1lBQ2hCK0UsT0FBTyxFQUFFVixLQUFBLENBQUtpQixjQUFBQTtXQUVkVCxlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsR0FBQSxFQUFBO0VBQUdyRSxVQUFBQSxTQUFTLEVBQUMsK0dBQUE7V0FBaUgsQ0FDM0gsQ0FDUCxDQUFDLENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxJQUFJLENBQUN5RSxPQUFPLElBQUksQ0FBQ2IsS0FBQSxDQUFLTSxLQUFLLENBQUNDLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDLFVBQUNqTCxJQUFJLEVBQUE7VUFBQSxPQUFLQSxJQUFJLEtBQUsrSyxPQUFPLENBQUE7RUFBQSxPQUFBLENBQUMsRUFBRTtFQUN0RVIsUUFBQUEsT0FBTyxDQUFDdEUsSUFBSSxlQUNWeUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsVUFBQUEsU0FBUyxFQUFDLCtCQUErQjtFQUN6Q1QsVUFBQUEsR0FBRyxFQUFFLFVBQVc7WUFDaEIrRSxPQUFPLEVBQUVWLEtBQUEsQ0FBS2tCLGNBQUFBO1dBRWRWLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxHQUFBLEVBQUE7RUFBR3JFLFVBQUFBLFNBQVMsRUFBQywrR0FBQTtXQUFpSCxDQUMzSCxDQUNQLENBQUMsQ0FBQTtFQUNILE9BQUE7RUFFQSxNQUFBLE9BQU9pRSxPQUFPLENBQUE7T0FDZixDQUFBLENBQUE7RUFBQUYsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUNsSyxJQUFJLEVBQUs7RUFDbkJrSyxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUM3SyxJQUFJLENBQUMsQ0FBQTtPQUMxQixDQUFBLENBQUE7TUFBQXFLLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW9CLFlBQU07RUFDekJBLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FTLFFBQVEsRUFBRSxDQUFBO09BQ3RCLENBQUEsQ0FBQTtFQUFBaEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVksWUFBQSxFQUFBLFVBQUNvQixNQUFNLEVBQUs7RUFDdkIsTUFBQSxJQUFNQyxLQUFLLEdBQUdyQixLQUFBLENBQUtNLEtBQUssQ0FBQ0MsU0FBUyxDQUFDaFQsR0FBRyxDQUFDLFVBQVV1SSxJQUFJLEVBQUU7VUFDckQsT0FBT0EsSUFBSSxHQUFHc0wsTUFBTSxDQUFBO0VBQ3RCLE9BQUMsQ0FBQyxDQUFBO1FBRUZwQixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFDWmYsUUFBQUEsU0FBUyxFQUFFYyxLQUFBQTtFQUNiLE9BQUMsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO01BQUFsQixlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixZQUFNO0VBQ3JCLE1BQUEsT0FBT0EsS0FBQSxDQUFLdUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQzFCLENBQUEsQ0FBQTtNQUFBcEIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtFQUNyQixNQUFBLE9BQU9BLEtBQUEsQ0FBS3VCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQzNCLENBQUEsQ0FBQTtFQTlHQyxJQUFBLElBQVFDLHNCQUFzQixHQUE2QjFTLEtBQUssQ0FBeEQwUyxzQkFBc0I7UUFBRUMsc0JBQXNCLEdBQUszUyxLQUFLLENBQWhDMlMsc0JBQXNCLENBQUE7TUFDdEQsSUFBTS9CLFFBQVEsR0FDWjhCLHNCQUFzQixLQUFLQyxzQkFBc0IsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFFN0R6QixLQUFBLENBQUtNLEtBQUssR0FBRztRQUNYQyxTQUFTLEVBQUVkLGFBQWEsQ0FDdEJPLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dILElBQUksRUFDZjRKLFFBQVEsRUFDUk0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FBTyxFQUNsQnlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQ2IsQ0FBQTtPQUNELENBQUE7RUFDRGdNLElBQUFBLEtBQUEsQ0FBSzBCLFdBQVcsZ0JBQUdDLGVBQVMsRUFBRSxDQUFBO0VBQUMsSUFBQSxPQUFBM0IsS0FBQSxDQUFBO0VBQ2pDLEdBQUE7SUFBQzRCLFNBQUEsQ0FBQTlCLG1CQUFBLEVBQUFDLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUEvQixtQkFBQSxFQUFBLENBQUE7TUFBQW5FLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUFrVyxpQkFBQUEsR0FBb0I7RUFDbEIsTUFBQSxJQUFNQyxlQUFlLEdBQUcsSUFBSSxDQUFDTCxXQUFXLENBQUNNLE9BQU8sQ0FBQTtFQUVoRCxNQUFBLElBQUlELGVBQWUsRUFBRTtFQUNuQjtFQUNBLFFBQUEsSUFBTUUsdUJBQXVCLEdBQUdGLGVBQWUsQ0FBQ0csUUFBUSxHQUNwRHJWLEtBQUssQ0FBQ3NWLElBQUksQ0FBQ0osZUFBZSxDQUFDRyxRQUFRLENBQUMsR0FDcEMsSUFBSSxDQUFBO1VBQ1IsSUFBTUUsb0JBQW9CLEdBQUdILHVCQUF1QixHQUNoREEsdUJBQXVCLENBQUNsQixJQUFJLENBQUMsVUFBQ3NCLE9BQU8sRUFBQTtZQUFBLE9BQUtBLE9BQU8sQ0FBQ0MsWUFBWSxDQUFBO0VBQUEsU0FBQSxDQUFDLEdBQy9ELElBQUksQ0FBQTtFQUVSUCxRQUFBQSxlQUFlLENBQUNRLFNBQVMsR0FBR0gsb0JBQW9CLEdBQzVDQSxvQkFBb0IsQ0FBQ0ksU0FBUyxHQUM5QixDQUFDSixvQkFBb0IsQ0FBQ0ssWUFBWSxHQUFHVixlQUFlLENBQUNVLFlBQVksSUFBSSxDQUFDLEdBQ3RFLENBQUNWLGVBQWUsQ0FBQ1csWUFBWSxHQUFHWCxlQUFlLENBQUNVLFlBQVksSUFBSSxDQUFDLENBQUE7RUFDdkUsT0FBQTtFQUNGLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQTlHLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBZ0ZELFNBQUErVyxNQUFBQSxHQUFTO1FBQ1AsSUFBSUMsYUFBYSxHQUFHQyxTQUFJLENBQUM7RUFDdkIsUUFBQSxpQ0FBaUMsRUFBRSxJQUFJO0VBQ3ZDLFFBQUEsNkNBQTZDLEVBQzNDLElBQUksQ0FBQy9ULEtBQUssQ0FBQzJTLHNCQUFBQTtFQUNmLE9BQUMsQ0FBQyxDQUFBO1FBRUYsb0JBQ0VqQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUV3RyxhQUFjO1VBQUNFLEdBQUcsRUFBRSxJQUFJLENBQUNwQixXQUFBQTtFQUFZLE9BQUEsRUFDbEQsSUFBSSxDQUFDcUIsYUFBYSxFQUNoQixDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBekk4Q3ZDLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDckJoRSxJQUFNQywwQkFBMEIsR0FBR0MsK0JBQWMsQ0FBQ3BELG1CQUFtQixDQUFDLENBQUE7RUFBQyxJQUVsRHFELFlBQVksMEJBQUFwRCxnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBb0QsWUFBQSxHQUFBO0VBQUEsSUFBQSxJQUFBbkQsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQWtELFlBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxLQUFBLElBQUFDLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFpRCxZQUFBLEVBQUEzVSxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO01BQUFsRCxlQUFBLENBQUFILEtBQUEsRUFldkIsT0FBQSxFQUFBO0VBQ051RCxNQUFBQSxlQUFlLEVBQUUsS0FBQTtPQUNsQixDQUFBLENBQUE7TUFBQXBELGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHFCQUFBLEVBRXFCLFlBQU07RUFDMUIsTUFBQSxJQUFNYSxPQUFPLEdBQUdiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sR0FBRzhJLGVBQU8sQ0FBQzJLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtFQUN2RSxNQUFBLElBQU11VSxPQUFPLEdBQUdkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQU8sR0FBR3FCLGVBQU8sQ0FBQzJLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUV2RSxJQUFNcU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNsQixLQUFLLElBQUk5RSxDQUFDLEdBQUdzRixPQUFPLEVBQUV0RixDQUFDLElBQUl1RixPQUFPLEVBQUV2RixDQUFDLEVBQUUsRUFBRTtFQUN2QzhFLFFBQUFBLE9BQU8sQ0FBQ3RFLElBQUksZUFDVnlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFBUTlFLFVBQUFBLEdBQUcsRUFBRUosQ0FBRTtFQUFDM1AsVUFBQUEsS0FBSyxFQUFFMlAsQ0FBQUE7V0FDcEJBLEVBQUFBLENBQ0ssQ0FDVixDQUFDLENBQUE7RUFDSCxPQUFBO0VBQ0EsTUFBQSxPQUFPOEUsT0FBTyxDQUFBO09BQ2YsQ0FBQSxDQUFBO0VBQUFGLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUN3RCxDQUFDLEVBQUs7UUFDdEJ4RCxLQUFBLENBQUtXLFFBQVEsQ0FBQzZDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDN1gsS0FBSyxDQUFDLENBQUE7T0FDOUIsQ0FBQSxDQUFBO01BQUF1VSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxZQUFBO1FBQUEsb0JBQ2pCUSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0U3VSxRQUFBQSxLQUFLLEVBQUVvVSxLQUFBLENBQUtsUixLQUFLLENBQUNnSCxJQUFLO0VBQ3ZCc0csUUFBQUEsU0FBUyxFQUFDLCtCQUErQjtVQUN6Q3VFLFFBQVEsRUFBRVgsS0FBQSxDQUFLMEQsY0FBQUE7RUFBZSxPQUFBLEVBRTdCMUQsS0FBQSxDQUFLMkQsbUJBQW1CLEVBQ25CLENBQUMsQ0FBQTtPQUNWLENBQUEsQ0FBQTtFQUFBeEQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQzRELE9BQU8sRUFBQTtRQUFBLG9CQUN2QnBELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRTlFLFFBQUFBLEdBQUcsRUFBQyxNQUFNO0VBQ1ZrSSxRQUFBQSxLQUFLLEVBQUU7RUFBRUMsVUFBQUEsVUFBVSxFQUFFRixPQUFPLEdBQUcsU0FBUyxHQUFHLFFBQUE7V0FBVztFQUN0RHhILFFBQUFBLFNBQVMsRUFBQyxrQ0FBa0M7VUFDNUNzRSxPQUFPLEVBQUUsU0FBQUEsT0FBQUEsQ0FBQ25CLEtBQUssRUFBQTtFQUFBLFVBQUEsT0FBS1MsS0FBQSxDQUFLK0QsY0FBYyxDQUFDeEUsS0FBSyxDQUFDLENBQUE7RUFBQSxTQUFBO1NBRTlDaUIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNckUsUUFBQUEsU0FBUyxFQUFDLDhDQUFBO0VBQThDLE9BQUUsQ0FBQyxlQUNqRW9FLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyxpREFBQTtFQUFpRCxPQUFBLEVBQzlENEQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ0gsSUFDUixDQUNILENBQUMsQ0FBQTtPQUNQLENBQUEsQ0FBQTtNQUFBcUssZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsb0JBQ2ZRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3dDLDBCQUEwQixFQUFBO0VBQ3pCdEgsUUFBQUEsR0FBRyxFQUFDLFVBQVU7RUFDZDdGLFFBQUFBLElBQUksRUFBRWtLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dILElBQUs7VUFDdEI2SyxRQUFRLEVBQUVYLEtBQUEsQ0FBS1csUUFBUztVQUN4QlEsUUFBUSxFQUFFbkIsS0FBQSxDQUFLK0QsY0FBZTtFQUM5QnhYLFFBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO0VBQzVCeU4sUUFBQUEsc0JBQXNCLEVBQUV6QixLQUFBLENBQUtsUixLQUFLLENBQUMyUyxzQkFBdUI7RUFDMURELFFBQUFBLHNCQUFzQixFQUFFeEIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFMsc0JBQUFBO0VBQXVCLE9BQzNELENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtNQUFBckIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtFQUN2QixNQUFBLElBQVF1RCxlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7UUFDdkIsSUFBSVMsTUFBTSxHQUFHLENBQUNoRSxLQUFBLENBQUtpRSxjQUFjLENBQUMsQ0FBQ1YsZUFBZSxDQUFDLENBQUMsQ0FBQTtFQUNwRCxNQUFBLElBQUlBLGVBQWUsRUFBRTtVQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxFQUFFLENBQUMsQ0FBQTtFQUN2QyxPQUFBO0VBQ0EsTUFBQSxPQUFPRixNQUFNLENBQUE7T0FDZCxDQUFBLENBQUE7RUFBQTdELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDbEssSUFBSSxFQUFLO1FBQ25Ca0ssS0FBQSxDQUFLK0QsY0FBYyxFQUFFLENBQUE7RUFDckIsTUFBQSxJQUFJak8sSUFBSSxLQUFLa0ssS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ0gsSUFBSSxFQUFFLE9BQUE7RUFDOUJrSyxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUM3SyxJQUFJLENBQUMsQ0FBQTtPQUMxQixDQUFBLENBQUE7RUFBQXFLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztRQUMxQlMsS0FBQSxDQUFLc0IsUUFBUSxDQUNYO0VBQ0VpQyxRQUFBQSxlQUFlLEVBQUUsQ0FBQ3ZELEtBQUEsQ0FBS00sS0FBSyxDQUFDaUQsZUFBQUE7RUFDL0IsT0FBQyxFQUNELFlBQU07RUFDSixRQUFBLElBQUl2RCxLQUFBLENBQUtsUixLQUFLLENBQUNxVixrQkFBa0IsRUFBRTtZQUNqQ25FLEtBQUEsQ0FBS29FLGdCQUFnQixDQUFDcEUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQUV1UixLQUFLLENBQUMsQ0FBQTtFQUMvQyxTQUFBO0VBQ0YsT0FDRixDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7RUFBQVksSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsVUFBQ2hTLElBQUksRUFBRXVSLEtBQUssRUFBSztFQUNsQ1MsTUFBQUEsS0FBQSxDQUFLcUUsUUFBUSxDQUFDclcsSUFBSSxFQUFFdVIsS0FBSyxDQUFDLENBQUE7UUFDMUJTLEtBQUEsQ0FBS3NFLE9BQU8sRUFBRSxDQUFBO09BQ2YsQ0FBQSxDQUFBO0VBQUFuRSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxVQUFBLEVBRVUsVUFBQ2hTLElBQUksRUFBRXVSLEtBQUssRUFBSztFQUMxQixNQUFBLElBQUlTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsRUFBRTtVQUN2QnJFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VWLFFBQVEsQ0FBQ3JXLElBQUksRUFBRXVSLEtBQUssQ0FBQyxDQUFBO0VBQ2xDLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQVksZUFBQSxDQUFBSCxLQUFBLEVBQUEsU0FBQSxFQUVTLFlBQU07RUFDZCxNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQU8sRUFBRTtFQUN0QnRFLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUMxQixPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBQUEsSUFBQSxPQUFBdEUsS0FBQSxDQUFBO0VBQUEsR0FBQTtJQUFBNEIsU0FBQSxDQUFBdUIsWUFBQSxFQUFBcEQsZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQXNCLFlBQUEsRUFBQSxDQUFBO01BQUF4SCxHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUErVyxNQUFBQSxHQUFTO0VBQ1AsTUFBQSxJQUFJNEIsZ0JBQWdCLENBQUE7RUFDcEIsTUFBQSxRQUFRLElBQUksQ0FBQ3pWLEtBQUssQ0FBQzBWLFlBQVk7RUFDN0IsUUFBQSxLQUFLLFFBQVE7RUFDWEQsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRSxnQkFBZ0IsRUFBRSxDQUFBO0VBQzFDLFVBQUEsTUFBQTtFQUNGLFFBQUEsS0FBSyxRQUFRO0VBQ1hGLFVBQUFBLGdCQUFnQixHQUFHLElBQUksQ0FBQ0csZ0JBQWdCLEVBQUUsQ0FBQTtFQUMxQyxVQUFBLE1BQUE7RUFDSixPQUFBO1FBRUEsb0JBQ0VsRSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLDBGQUFBNU4sTUFBQSxDQUEwRixJQUFJLENBQUNNLEtBQUssQ0FBQzBWLFlBQVksQ0FBQTtFQUFHLE9BQUEsRUFFNUhELGdCQUNFLENBQUMsQ0FBQTtFQUVWLEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0ExSXVDL0QsQ0FBQUEsc0JBQUssQ0FBQ3dDLFNBQVMsQ0FBQTs7RUNQdEIsSUFFZDJCLG9CQUFvQiwwQkFBQTVFLGdCQUFBLEVBQUE7RUFBQSxFQUFBLFNBQUE0RSxvQkFBQSxHQUFBO0VBQUEsSUFBQSxJQUFBM0UsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQTBFLG9CQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsS0FBQSxJQUFBdkIsSUFBQSxHQUFBdFAsU0FBQSxDQUFBaEcsTUFBQSxFQUFBdVYsSUFBQSxHQUFBeFcsSUFBQUEsS0FBQSxDQUFBdVcsSUFBQSxHQUFBRSxJQUFBLEdBQUEsQ0FBQSxFQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQSxFQUFBLEVBQUE7RUFBQUQsTUFBQUEsSUFBQSxDQUFBQyxJQUFBLENBQUF4UCxHQUFBQSxTQUFBLENBQUF3UCxJQUFBLENBQUEsQ0FBQTtFQUFBLEtBQUE7RUFBQXRELElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBLElBQUEsRUFBQXlFLG9CQUFBLEVBQUFuVyxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFRckIsaUJBQUEsRUFBQSxVQUFDekUsQ0FBQyxFQUFBO0VBQUEsTUFBQSxPQUFLeUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBSyxLQUFLaUksQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQTRFLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFL0IsWUFBTTtRQUNwQixPQUFPQSxLQUFBLENBQUtsUixLQUFLLENBQUM4VixVQUFVLENBQUNyWCxHQUFHLENBQUMsVUFBQytGLEtBQUssRUFBRWlJLENBQUMsRUFBQTtVQUFBLG9CQUN4Q2lGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7WUFDRXJFLFNBQVMsRUFDUDRELEtBQUEsQ0FBSzZFLGVBQWUsQ0FBQ3RKLENBQUMsQ0FBQyxHQUNuQiwrRUFBK0UsR0FDL0UsZ0NBQ0w7RUFDREksVUFBQUEsR0FBRyxFQUFFckksS0FBTTtZQUNYb04sT0FBTyxFQUFFVixLQUFBLENBQUtXLFFBQVEsQ0FBQ0MsSUFBSSxDQUFBWixLQUFBLEVBQU96RSxDQUFDLENBQUU7WUFDckMsZUFBZXlFLEVBQUFBLEtBQUEsQ0FBSzZFLGVBQWUsQ0FBQ3RKLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBR3hILFNBQUFBO1dBRWpEaU0sRUFBQUEsS0FBQSxDQUFLNkUsZUFBZSxDQUFDdEosQ0FBQyxDQUFDLGdCQUN0QmlGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFVBQUFBLFNBQVMsRUFBQywwQ0FBQTtFQUEwQyxTQUFBLEVBQUMsUUFBTyxDQUFDLEdBRW5FLEVBQ0QsRUFDQTlJLEtBQ0UsQ0FBQyxDQUFBO0VBQUEsT0FDUCxDQUFDLENBQUE7T0FDSCxDQUFBLENBQUE7RUFBQTZNLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDMU0sS0FBSyxFQUFBO0VBQUEsTUFBQSxPQUFLME0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlIsUUFBUSxDQUFDck4sS0FBSyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBNk0sZUFBQSxDQUFBSCxLQUFBLEVBRTNCLG9CQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsT0FBTUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcVMsUUFBUSxFQUFFLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQW5CLEtBQUEsQ0FBQTtFQUFBLEdBQUE7SUFBQTRCLFNBQUEsQ0FBQStDLG9CQUFBLEVBQUE1RSxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBOEMsb0JBQUEsRUFBQSxDQUFBO01BQUFoSixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUVoRCxTQUFBK1csTUFBQUEsR0FBUztRQUNQLG9CQUNFbkMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLGtDQUFBO0VBQWtDLE9BQUEsRUFDOUMsSUFBSSxDQUFDMkcsYUFBYSxFQUNoQixDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBMUMrQ3ZDLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDR2pFLElBQU04QiwyQkFBMkIsR0FBRzVCLCtCQUFjLENBQUN5QixvQkFBb0IsQ0FBQyxDQUFBO0VBQUMsSUFFcERJLGFBQWEsMEJBQUFoRixnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBZ0YsYUFBQSxHQUFBO0VBQUEsSUFBQSxJQUFBL0UsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQThFLGFBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxLQUFBLElBQUEzQixJQUFBLEdBQUF0UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF1VixJQUFBLEdBQUF4VyxJQUFBQSxLQUFBLENBQUF1VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtFQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXhQLEdBQUFBLFNBQUEsQ0FBQXdQLElBQUEsQ0FBQSxDQUFBO0VBQUEsS0FBQTtFQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBNkUsYUFBQSxFQUFBdlcsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBNlUsSUFBQSxDQUFBLENBQUEsQ0FBQTtNQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBU3hCLE9BQUEsRUFBQTtFQUNOdUQsTUFBQUEsZUFBZSxFQUFFLEtBQUE7T0FDbEIsQ0FBQSxDQUFBO0VBQUFwRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDNEUsVUFBVSxFQUFBO0VBQUEsTUFBQSxPQUMvQkEsVUFBVSxDQUFDclgsR0FBRyxDQUFDLFVBQUN5WCxDQUFDLEVBQUV6SixDQUFDLEVBQUE7VUFBQSxvQkFDbEJpRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVE5RSxVQUFBQSxHQUFHLEVBQUVKLENBQUU7RUFBQzNQLFVBQUFBLEtBQUssRUFBRTJQLENBQUFBO0VBQUUsU0FBQSxFQUN0QnlKLENBQ0ssQ0FBQyxDQUFBO0VBQUEsT0FDVixDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBN0UsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWUsa0JBQUEsRUFBQSxVQUFDNEUsVUFBVSxFQUFBO1FBQUEsb0JBQzVCcEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFN1UsUUFBQUEsS0FBSyxFQUFFb1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBTTtFQUN4QjhJLFFBQUFBLFNBQVMsRUFBQyxnQ0FBZ0M7VUFDMUN1RSxRQUFRLEVBQUUsU0FBQUEsUUFBQUEsQ0FBQzZDLENBQUMsRUFBQTtZQUFBLE9BQUt4RCxLQUFBLENBQUtXLFFBQVEsQ0FBQzZDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDN1gsS0FBSyxDQUFDLENBQUE7RUFBQSxTQUFBO0VBQUMsT0FBQSxFQUU5Q29VLEtBQUEsQ0FBSzJELG1CQUFtQixDQUFDaUIsVUFBVSxDQUM5QixDQUFDLENBQUE7T0FDVixDQUFBLENBQUE7RUFBQXpFLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFVBQUM0RCxPQUFPLEVBQUVnQixVQUFVLEVBQUE7UUFBQSxvQkFDbkNwRSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0U5RSxRQUFBQSxHQUFHLEVBQUMsTUFBTTtFQUNWa0ksUUFBQUEsS0FBSyxFQUFFO0VBQUVDLFVBQUFBLFVBQVUsRUFBRUYsT0FBTyxHQUFHLFNBQVMsR0FBRyxRQUFBO1dBQVc7RUFDdER4SCxRQUFBQSxTQUFTLEVBQUMsbUNBQW1DO1VBQzdDc0UsT0FBTyxFQUFFVixLQUFBLENBQUsrRCxjQUFBQTtTQUVkdkQsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNckUsUUFBQUEsU0FBUyxFQUFDLCtDQUFBO0VBQStDLE9BQUUsQ0FBQyxlQUNsRW9FLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyxtREFBQTtTQUNid0ksRUFBQUEsVUFBVSxDQUFDNUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBSyxDQUN4QixDQUNILENBQUMsQ0FBQTtPQUNQLENBQUEsQ0FBQTtFQUFBNk0sSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQzRFLFVBQVUsRUFBQTtFQUFBLE1BQUEsb0JBQzFCcEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUUsMkJBQTJCLEVBQUE7RUFDMUJuSixRQUFBQSxHQUFHLEVBQUMsVUFBVTtFQUNkckksUUFBQUEsS0FBSyxFQUFFME0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBTTtFQUN4QnNSLFFBQUFBLFVBQVUsRUFBRUEsVUFBVztVQUN2QmpFLFFBQVEsRUFBRVgsS0FBQSxDQUFLVyxRQUFTO1VBQ3hCUSxRQUFRLEVBQUVuQixLQUFBLENBQUsrRCxjQUFBQTtFQUFlLE9BQy9CLENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtFQUFBNUQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQzRFLFVBQVUsRUFBSztFQUNqQyxNQUFBLElBQVFyQixlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7RUFDdkIsTUFBQSxJQUFJUyxNQUFNLEdBQUcsQ0FBQ2hFLEtBQUEsQ0FBS2lFLGNBQWMsQ0FBQyxDQUFDVixlQUFlLEVBQUVxQixVQUFVLENBQUMsQ0FBQyxDQUFBO0VBQ2hFLE1BQUEsSUFBSXJCLGVBQWUsRUFBRTtVQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxDQUFDVSxVQUFVLENBQUMsQ0FBQyxDQUFBO0VBQ2pELE9BQUE7RUFDQSxNQUFBLE9BQU9aLE1BQU0sQ0FBQTtPQUNkLENBQUEsQ0FBQTtFQUFBN0QsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUMxTSxLQUFLLEVBQUs7UUFDcEIwTSxLQUFBLENBQUsrRCxjQUFjLEVBQUUsQ0FBQTtFQUNyQixNQUFBLElBQUl6USxLQUFLLEtBQUswTSxLQUFBLENBQUtsUixLQUFLLENBQUN3RSxLQUFLLEVBQUU7RUFDOUIwTSxRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUNyTixLQUFLLENBQUMsQ0FBQTtFQUM1QixPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUE2TSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxZQUFBO1FBQUEsT0FDZkEsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQ1ppQyxRQUFBQSxlQUFlLEVBQUUsQ0FBQ3ZELEtBQUEsQ0FBS00sS0FBSyxDQUFDaUQsZUFBQUE7RUFDL0IsT0FBQyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQXZELEtBQUEsQ0FBQTtFQUFBLEdBQUE7SUFBQTRCLFNBQUEsQ0FBQW1ELGFBQUEsRUFBQWhGLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUFrRCxhQUFBLEVBQUEsQ0FBQTtNQUFBcEosR0FBQSxFQUFBLFFBQUE7TUFBQS9QLEtBQUEsRUFFSixTQUFBK1csTUFBQUEsR0FBUztFQUFBLE1BQUEsSUFBQXNDLE1BQUEsR0FBQSxJQUFBLENBQUE7RUFDUCxNQUFBLElBQU1MLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUNyWCxHQUFHLENBQzNELElBQUksQ0FBQ3VCLEtBQUssQ0FBQ29XLHVCQUF1QixHQUM5QixVQUFDRixDQUFDLEVBQUE7VUFBQSxPQUFLRyxxQkFBMkIsQ0FBQ0gsQ0FBQyxFQUFFQyxNQUFJLENBQUNuVyxLQUFLLENBQUN6QyxNQUFNLENBQUMsQ0FBQTtFQUFBLE9BQUEsR0FDeEQsVUFBQzJZLENBQUMsRUFBQTtVQUFBLE9BQUtHLGdCQUFzQixDQUFDSCxDQUFDLEVBQUVDLE1BQUksQ0FBQ25XLEtBQUssQ0FBQ3pDLE1BQU0sQ0FBQyxDQUFBO0VBQUEsT0FDekQsQ0FBQyxDQUFBO0VBRUQsTUFBQSxJQUFJa1ksZ0JBQWdCLENBQUE7RUFDcEIsTUFBQSxRQUFRLElBQUksQ0FBQ3pWLEtBQUssQ0FBQzBWLFlBQVk7RUFDN0IsUUFBQSxLQUFLLFFBQVE7RUFDWEQsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRSxnQkFBZ0IsQ0FBQ0csVUFBVSxDQUFDLENBQUE7RUFDcEQsVUFBQSxNQUFBO0VBQ0YsUUFBQSxLQUFLLFFBQVE7RUFDWEwsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRyxnQkFBZ0IsQ0FBQ0UsVUFBVSxDQUFDLENBQUE7RUFDcEQsVUFBQSxNQUFBO0VBQ0osT0FBQTtRQUVBLG9CQUNFcEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsUUFBQUEsU0FBUyw0RkFBQTVOLE1BQUEsQ0FBNEYsSUFBSSxDQUFDTSxLQUFLLENBQUMwVixZQUFZLENBQUE7RUFBRyxPQUFBLEVBRTlIRCxnQkFDRSxDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBbkd3Qy9ELENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDTTFELFNBQVNvQyxrQkFBa0JBLENBQUM3WSxPQUFPLEVBQUV5SCxPQUFPLEVBQUU7SUFDNUMsSUFBTTJMLElBQUksR0FBRyxFQUFFLENBQUE7RUFFZixFQUFBLElBQUkwRixRQUFRLEdBQUcxVSxlQUFlLENBQUNwRSxPQUFPLENBQUMsQ0FBQTtFQUN2QyxFQUFBLElBQU0rWSxRQUFRLEdBQUczVSxlQUFlLENBQUNxRCxPQUFPLENBQUMsQ0FBQTtFQUV6QyxFQUFBLE9BQU8sQ0FBQytKLGVBQU8sQ0FBQ3NILFFBQVEsRUFBRUMsUUFBUSxDQUFDLEVBQUU7RUFDbkMzRixJQUFBQSxJQUFJLENBQUM1RCxJQUFJLENBQUNwUSxPQUFPLENBQUMwWixRQUFRLENBQUMsQ0FBQyxDQUFBO0VBRTVCQSxJQUFBQSxRQUFRLEdBQUc3TSxtQkFBUyxDQUFDNk0sUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ25DLEdBQUE7RUFDQSxFQUFBLE9BQU8xRixJQUFJLENBQUE7RUFDYixDQUFBO0VBQUMsSUFFb0I0Rix3QkFBd0IsMEJBQUF4RixnQkFBQSxFQUFBO0lBWTNDLFNBQUF3Rix3QkFBQUEsQ0FBWXpXLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFzRix3QkFBQSxDQUFBLENBQUE7RUFDakJ2RixJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQXFGLElBQUFBLEVBQUFBLHdCQUFBLEdBQU16VyxLQUFLLENBQUEsQ0FBQSxDQUFBO01BQUVxUixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBVUMsWUFBTTtRQUNwQixPQUFPQSxLQUFBLENBQUtNLEtBQUssQ0FBQ2tGLGNBQWMsQ0FBQ2pZLEdBQUcsQ0FBQyxVQUFDa1ksU0FBUyxFQUFLO0VBQ2xELFFBQUEsSUFBTUMsY0FBYyxHQUFHOUcsZUFBTyxDQUFDNkcsU0FBUyxDQUFDLENBQUE7VUFDekMsSUFBTUUsZUFBZSxHQUNuQnZVLFVBQVUsQ0FBQzRPLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxFQUFFeVgsU0FBUyxDQUFDLElBQ3RDalUsV0FBVyxDQUFDd08sS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQUV5WCxTQUFTLENBQUMsQ0FBQTtVQUV6QyxvQkFDRWpGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFVBQUFBLFNBQVMsRUFDUHVKLGVBQWUsR0FDWCwwREFBMEQsR0FDMUQscUNBQ0w7RUFDRGhLLFVBQUFBLEdBQUcsRUFBRStKLGNBQWU7WUFDcEJoRixPQUFPLEVBQUVWLEtBQUEsQ0FBS1csUUFBUSxDQUFDQyxJQUFJLENBQUFaLEtBQUEsRUFBTzBGLGNBQWMsQ0FBRTtZQUNsRCxlQUFlQyxFQUFBQSxlQUFlLEdBQUcsTUFBTSxHQUFHNVIsU0FBQUE7RUFBVSxTQUFBLEVBRW5ENFIsZUFBZSxnQkFDZG5GLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFVBQUFBLFNBQVMsRUFBQywrQ0FBQTtXQUFnRCxFQUFBLFFBRTFELENBQUMsR0FFUCxFQUNELEVBQ0EvTyxVQUFVLENBQUNvWSxTQUFTLEVBQUV6RixLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQUU0VCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQzVELENBQUMsQ0FBQTtFQUVWLE9BQUMsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO0VBQUE4VCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVSxVQUFBLEVBQUEsVUFBQ3lGLFNBQVMsRUFBQTtFQUFBLE1BQUEsT0FBS3pGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZSLFFBQVEsQ0FBQzhFLFNBQVMsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQXRGLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW5DLFlBQU07RUFDekJBLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FTLFFBQVEsRUFBRSxDQUFBO09BQ3RCLENBQUEsQ0FBQTtNQTNDQ25CLEtBQUEsQ0FBS00sS0FBSyxHQUFHO0VBQ1hrRixNQUFBQSxjQUFjLEVBQUVKLGtCQUFrQixDQUNoQ3BGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sRUFDbEJ5VCxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUNiLENBQUE7T0FDRCxDQUFBO0VBQUMsSUFBQSxPQUFBZ00sS0FBQSxDQUFBO0VBQ0osR0FBQTtJQUFDNEIsU0FBQSxDQUFBMkQsd0JBQUEsRUFBQXhGLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUEwRCx3QkFBQSxFQUFBLENBQUE7TUFBQTVKLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBdUNELFNBQUErVyxNQUFBQSxHQUFTO1FBQ1AsSUFBSUMsYUFBYSxHQUFHQyxTQUFJLENBQUM7RUFDdkIsUUFBQSx1Q0FBdUMsRUFBRSxJQUFJO0VBQzdDLFFBQUEsbURBQW1ELEVBQ2pELElBQUksQ0FBQy9ULEtBQUssQ0FBQzhXLDJCQUFBQTtFQUNmLE9BQUMsQ0FBQyxDQUFBO1FBRUYsb0JBQU9wRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUV3RyxhQUFBQTtFQUFjLE9BQUEsRUFBRSxJQUFJLENBQUNHLGFBQWEsRUFBUSxDQUFDLENBQUE7RUFDcEUsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQXBFbUR2QyxDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ2JyRSxJQUFJNkMsK0JBQStCLEdBQUczQywrQkFBYyxDQUFDcUMsd0JBQXdCLENBQUMsQ0FBQTtFQUFDLElBRTFETyxpQkFBaUIsMEJBQUEvRixnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBK0YsaUJBQUEsR0FBQTtFQUFBLElBQUEsSUFBQTlGLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUE2RixpQkFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQTFDLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUE0RixpQkFBQSxFQUFBdFgsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBNlUsSUFBQSxDQUFBLENBQUEsQ0FBQTtNQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBWTVCLE9BQUEsRUFBQTtFQUNOdUQsTUFBQUEsZUFBZSxFQUFFLEtBQUE7T0FDbEIsQ0FBQSxDQUFBO01BQUFwRCxlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUVxQixZQUFNO1FBQzFCLElBQUlxRixRQUFRLEdBQUcxVSxlQUFlLENBQUNxUCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFPLENBQUMsQ0FBQTtRQUNsRCxJQUFNK1ksUUFBUSxHQUFHM1UsZUFBZSxDQUFDcVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa0YsT0FBTyxDQUFDLENBQUE7UUFDcEQsSUFBTXFNLE9BQU8sR0FBRyxFQUFFLENBQUE7RUFFbEIsTUFBQSxPQUFPLENBQUN0QyxlQUFPLENBQUNzSCxRQUFRLEVBQUVDLFFBQVEsQ0FBQyxFQUFFO0VBQ25DLFFBQUEsSUFBTVMsU0FBUyxHQUFHbkgsZUFBTyxDQUFDeUcsUUFBUSxDQUFDLENBQUE7RUFDbkNoRixRQUFBQSxPQUFPLENBQUN0RSxJQUFJLGVBQ1Z5RSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVE5RSxVQUFBQSxHQUFHLEVBQUVvSyxTQUFVO0VBQUNuYSxVQUFBQSxLQUFLLEVBQUVtYSxTQUFBQTtFQUFVLFNBQUEsRUFDdEMxWSxVQUFVLENBQUNnWSxRQUFRLEVBQUVyRixLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQUU0VCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQ3hELENBQ1YsQ0FBQyxDQUFBO0VBRURnWixRQUFBQSxRQUFRLEdBQUc3TSxtQkFBUyxDQUFDNk0sUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ25DLE9BQUE7RUFFQSxNQUFBLE9BQU9oRixPQUFPLENBQUE7T0FDZixDQUFBLENBQUE7RUFBQUYsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQ3dELENBQUMsRUFBSztRQUN0QnhELEtBQUEsQ0FBS1csUUFBUSxDQUFDNkMsQ0FBQyxDQUFDQyxNQUFNLENBQUM3WCxLQUFLLENBQUMsQ0FBQTtPQUM5QixDQUFBLENBQUE7TUFBQXVVLGVBQUEsQ0FBQUgsS0FBQSxFQUVrQixrQkFBQSxFQUFBLFlBQUE7UUFBQSxvQkFDakJRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7VUFDRTdVLEtBQUssRUFBRWdULGVBQU8sQ0FBQ2pPLGVBQWUsQ0FBQ3FQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxDQUFDLENBQUU7RUFDakRvTyxRQUFBQSxTQUFTLEVBQUMscUNBQXFDO1VBQy9DdUUsUUFBUSxFQUFFWCxLQUFBLENBQUswRCxjQUFBQTtFQUFlLE9BQUEsRUFFN0IxRCxLQUFBLENBQUsyRCxtQkFBbUIsRUFDbkIsQ0FBQyxDQUFBO09BQ1YsQ0FBQSxDQUFBO0VBQUF4RCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxVQUFDNEQsT0FBTyxFQUFLO1FBQzVCLElBQU1vQyxTQUFTLEdBQUczWSxVQUFVLENBQzFCMlMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQ2ZnUyxLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQ3JCNFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFDYixDQUFDLENBQUE7UUFFRCxvQkFDRW1VLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRTlFLFFBQUFBLEdBQUcsRUFBQyxNQUFNO0VBQ1ZrSSxRQUFBQSxLQUFLLEVBQUU7RUFBRUMsVUFBQUEsVUFBVSxFQUFFRixPQUFPLEdBQUcsU0FBUyxHQUFHLFFBQUE7V0FBVztFQUN0RHhILFFBQUFBLFNBQVMsRUFBQyx3Q0FBd0M7VUFDbERzRSxPQUFPLEVBQUUsU0FBQUEsT0FBQUEsQ0FBQ25CLEtBQUssRUFBQTtFQUFBLFVBQUEsT0FBS1MsS0FBQSxDQUFLK0QsY0FBYyxDQUFDeEUsS0FBSyxDQUFDLENBQUE7RUFBQSxTQUFBO1NBRTlDaUIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNckUsUUFBQUEsU0FBUyxFQUFDLG9EQUFBO0VBQW9ELE9BQUUsQ0FBQyxlQUN2RW9FLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyw2REFBQTtTQUNiNEosRUFBQUEsU0FDRyxDQUNILENBQUMsQ0FBQTtPQUVULENBQUEsQ0FBQTtNQUFBN0YsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsb0JBQ2ZRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ29GLCtCQUErQixFQUFBO0VBQzlCbEssUUFBQUEsR0FBRyxFQUFDLFVBQVU7RUFDZDNOLFFBQUFBLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSztFQUN0QjVCLFFBQUFBLFVBQVUsRUFBRTRULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzFDLFVBQVc7VUFDbEN1VSxRQUFRLEVBQUVYLEtBQUEsQ0FBS1csUUFBUztVQUN4QlEsUUFBUSxFQUFFbkIsS0FBQSxDQUFLK0QsY0FBZTtFQUM5QnhYLFFBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO0VBQzVCNFIsUUFBQUEsMkJBQTJCLEVBQUU1RixLQUFBLENBQUtsUixLQUFLLENBQUM4VywyQkFBNEI7RUFDcEV2WixRQUFBQSxNQUFNLEVBQUUyVCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFBQTtFQUFPLE9BQzNCLENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtNQUFBOFQsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtFQUN2QixNQUFBLElBQVF1RCxlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7UUFDdkIsSUFBSVMsTUFBTSxHQUFHLENBQUNoRSxLQUFBLENBQUtpRSxjQUFjLENBQUMsQ0FBQ1YsZUFBZSxDQUFDLENBQUMsQ0FBQTtFQUNwRCxNQUFBLElBQUlBLGVBQWUsRUFBRTtVQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxFQUFFLENBQUMsQ0FBQTtFQUN2QyxPQUFBO0VBQ0EsTUFBQSxPQUFPRixNQUFNLENBQUE7T0FDZCxDQUFBLENBQUE7RUFBQTdELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDMEYsY0FBYyxFQUFLO1FBQzdCMUYsS0FBQSxDQUFLK0QsY0FBYyxFQUFFLENBQUE7UUFFckIsSUFBTWtDLFdBQVcsR0FBR3RhLE9BQU8sQ0FBQ3VhLFFBQVEsQ0FBQ1IsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUVyRCxJQUNFdFUsVUFBVSxDQUFDNE8sS0FBQSxDQUFLbFIsS0FBSyxDQUFDZCxJQUFJLEVBQUVpWSxXQUFXLENBQUMsSUFDeEN6VSxXQUFXLENBQUN3TyxLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRWlZLFdBQVcsQ0FBQyxFQUN6QztFQUNBLFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFFQWpHLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZSLFFBQVEsQ0FBQ3NGLFdBQVcsQ0FBQyxDQUFBO09BQ2pDLENBQUEsQ0FBQTtNQUFBOUYsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsWUFBQTtRQUFBLE9BQ2ZBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUNaaUMsUUFBQUEsZUFBZSxFQUFFLENBQUN2RCxLQUFBLENBQUtNLEtBQUssQ0FBQ2lELGVBQUFBO0VBQy9CLE9BQUMsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUF2RCxLQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE0QixTQUFBLENBQUFrRSxpQkFBQSxFQUFBL0YsZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQWlFLGlCQUFBLEVBQUEsQ0FBQTtNQUFBbkssR0FBQSxFQUFBLFFBQUE7TUFBQS9QLEtBQUEsRUFFSixTQUFBK1csTUFBQUEsR0FBUztFQUNQLE1BQUEsSUFBSTRCLGdCQUFnQixDQUFBO0VBQ3BCLE1BQUEsUUFBUSxJQUFJLENBQUN6VixLQUFLLENBQUMwVixZQUFZO0VBQzdCLFFBQUEsS0FBSyxRQUFRO0VBQ1hELFVBQUFBLGdCQUFnQixHQUFHLElBQUksQ0FBQ0UsZ0JBQWdCLEVBQUUsQ0FBQTtFQUMxQyxVQUFBLE1BQUE7RUFDRixRQUFBLEtBQUssUUFBUTtFQUNYRixVQUFBQSxnQkFBZ0IsR0FBRyxJQUFJLENBQUNHLGdCQUFnQixFQUFFLENBQUE7RUFDMUMsVUFBQSxNQUFBO0VBQ0osT0FBQTtRQUVBLG9CQUNFbEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsUUFBQUEsU0FBUyxzR0FBQTVOLE1BQUEsQ0FBc0csSUFBSSxDQUFDTSxLQUFLLENBQUMwVixZQUFZLENBQUE7RUFBRyxPQUFBLEVBRXhJRCxnQkFDRSxDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBcEk0Qy9ELENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDQ3hDLElBRURtRCxHQUFHLDBCQUFBcEcsZ0JBQUEsRUFBQTtFQUFBLEVBQUEsU0FBQW9HLEdBQUEsR0FBQTtFQUFBLElBQUEsSUFBQW5HLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUFrRyxHQUFBLENBQUEsQ0FBQTtFQUFBLElBQUEsS0FBQSxJQUFBL0MsSUFBQSxHQUFBdFAsU0FBQSxDQUFBaEcsTUFBQSxFQUFBdVYsSUFBQSxHQUFBeFcsSUFBQUEsS0FBQSxDQUFBdVcsSUFBQSxHQUFBRSxJQUFBLEdBQUEsQ0FBQSxFQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQSxFQUFBLEVBQUE7RUFBQUQsTUFBQUEsSUFBQSxDQUFBQyxJQUFBLENBQUF4UCxHQUFBQSxTQUFBLENBQUF3UCxJQUFBLENBQUEsQ0FBQTtFQUFBLEtBQUE7RUFBQXRELElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBLElBQUEsRUFBQWlHLEdBQUEsRUFBQTNYLEVBQUFBLENBQUFBLE1BQUEsQ0FBQTZVLElBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQWxELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLE9BQUEsZUE0RGRRLHNCQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQSxDQUFBO0VBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFWCxhQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQ3ZCLE1BQUEsSUFBSSxDQUFDUyxLQUFBLENBQUtvRyxVQUFVLEVBQUUsSUFBSXBHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRSLE9BQU8sRUFBRTtFQUM1Q1YsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNFIsT0FBTyxDQUFDbkIsS0FBSyxDQUFDLENBQUE7RUFDM0IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDNUIsTUFBQSxJQUFJLENBQUNTLEtBQUEsQ0FBS29HLFVBQVUsRUFBRSxJQUFJcEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdVgsWUFBWSxFQUFFO0VBQ2pEckcsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdVgsWUFBWSxDQUFDOUcsS0FBSyxDQUFDLENBQUE7RUFDaEMsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDNUQsR0FBRyxDQUFBO1FBQzFCLElBQUkySyxRQUFRLEtBQUssR0FBRyxFQUFFO1VBQ3BCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7VUFDdEJoSCxLQUFLLENBQUM1RCxHQUFHLEdBQUcsT0FBTyxDQUFBO0VBQ3JCLE9BQUE7RUFFQXFFLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBYLGVBQWUsQ0FBQ2pILEtBQUssQ0FBQyxDQUFBO09BQ2xDLENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVyxXQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtRQUFBLE9BQUs3VSxTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQUVxVyxLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUF0RyxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVsQyxZQUFNO0VBQUEsTUFBQSxJQUFBMEcscUJBQUEsQ0FBQTtFQUN6QixNQUFBLElBQUkxRyxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsRUFBRTtFQUN6QyxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtRQUVBLElBQU1DLGNBQWMsR0FBRzVHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytYLGVBQWUsR0FBQUgsQ0FBQUEscUJBQUEsR0FDN0MxRyxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFhLE1BQUEsSUFBQSxJQUFBSixxQkFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUF4QkEscUJBQUEsQ0FBMEJuUyxJQUFJLENBQUMsVUFBQ3ZHLElBQUksRUFBQTtFQUFBLFFBQUEsT0FBS2dTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQy9ZLElBQUksQ0FBQyxDQUFBO1NBQUMsQ0FBQSxHQUNwRWdTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQy9HLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxDQUFBO0VBRTdDLE1BQUEsT0FBTyxDQUFDSixjQUFjLElBQUk1RyxLQUFBLENBQUsrRyxlQUFlLENBQUMvRyxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUMsQ0FBQTtPQUN4RSxDQUFBLENBQUE7TUFBQTlHLGVBQUEsQ0FBQUgsS0FBQSxFQUVZLFlBQUEsRUFBQSxZQUFBO1FBQUEsT0FBTXBNLGFBQWEsQ0FBQ29NLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsRUFBRTRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQXFSLGVBQUEsQ0FBQUgsS0FBQSxFQUUvQyxZQUFBLEVBQUEsWUFBQTtRQUFBLE9BQU1wTCxhQUFhLENBQUNvTCxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQUU0UCxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUFxUixlQUFBLENBQUFILEtBQUEsRUFFNUMsZUFBQSxFQUFBLFlBQUE7RUFBQSxNQUFBLE9BQ2RwTyxTQUFTLENBQ1BvTyxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQ2RHLGNBQWMsQ0FDWnlQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsRUFDZDRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakIyVCxLQUFBLENBQUtsUixLQUFLLENBQUMwQixnQkFDYixDQUNGLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUEyUCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVSxZQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtFQUFBLE1BQUEsT0FDakJ6RyxLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLElBQ3pCdFYsU0FBUyxDQUNQNlUsS0FBSyxFQUNMbFcsY0FBYyxDQUNaeVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUNkNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUNiLENBQ0YsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQTJQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVlLGlCQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtFQUFBLE1BQUEsT0FBS3pHLEtBQUEsQ0FBS3BPLFNBQVMsQ0FBQzZVLEtBQUssQ0FBQyxJQUFJekcsS0FBQSxDQUFLbUgsVUFBVSxDQUFDVixLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUF0RyxlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUV0RCxZQUFNO0VBQzFCLE1BQUEsSUFBQW9ILFdBQUEsR0FBZ0NwSCxLQUFBLENBQUtsUixLQUFLO1VBQWxDc0IsR0FBRyxHQUFBZ1gsV0FBQSxDQUFIaFgsR0FBRztVQUFFK0ssY0FBYyxHQUFBaU0sV0FBQSxDQUFkak0sY0FBYyxDQUFBO1FBRTNCLElBQUksQ0FBQ0EsY0FBYyxFQUFFO0VBQ25CLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBOztFQUVBO0VBQ0EsTUFBQSxJQUFNa00sTUFBTSxHQUFHaGEsVUFBVSxDQUFDK0MsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFBO0VBQzVDLE1BQUEsT0FBTytLLGNBQWMsQ0FBQ1UsR0FBRyxDQUFDd0wsTUFBTSxDQUFDLENBQUE7T0FDbEMsQ0FBQSxDQUFBO0VBRUQ7TUFBQWxILGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBQ21CLFlBQU07RUFDdkIsTUFBQSxJQUFBc0gsWUFBQSxHQUEwQnRILEtBQUEsQ0FBS2xSLEtBQUs7VUFBNUJzQixHQUFHLEdBQUFrWCxZQUFBLENBQUhsWCxHQUFHO1VBQUVtWCxRQUFRLEdBQUFELFlBQUEsQ0FBUkMsUUFBUSxDQUFBO1FBQ3JCLElBQUksQ0FBQ0EsUUFBUSxFQUFFO0VBQ2IsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFDQSxNQUFBLElBQU1GLE1BQU0sR0FBR2hhLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQTtFQUM1QztFQUNBLE1BQUEsSUFBSW1YLFFBQVEsQ0FBQ0MsR0FBRyxDQUFDSCxNQUFNLENBQUMsRUFBRTtVQUN4QixPQUFPLENBQUNFLFFBQVEsQ0FBQzFMLEdBQUcsQ0FBQ3dMLE1BQU0sQ0FBQyxDQUFDakwsU0FBUyxDQUFDLENBQUE7RUFDekMsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBK0QsZUFBQSxDQUFBSCxLQUFBLEVBQUEsV0FBQSxFQUVXLFlBQU07RUFDaEIsTUFBQSxJQUFBeUgsWUFBQSxHQUFvQ3pILEtBQUEsQ0FBS2xSLEtBQUs7VUFBdENzQixHQUFHLEdBQUFxWCxZQUFBLENBQUhyWCxHQUFHO1VBQUV4QixTQUFTLEdBQUE2WSxZQUFBLENBQVQ3WSxTQUFTO1VBQUVDLE9BQU8sR0FBQTRZLFlBQUEsQ0FBUDVZLE9BQU8sQ0FBQTtFQUMvQixNQUFBLElBQUksQ0FBQ0QsU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtFQUMxQixRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUNBLE1BQUEsT0FBT21ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRUMsT0FBTyxDQUFDLENBQUE7T0FDN0MsQ0FBQSxDQUFBO01BQUFzUixlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUFNO0VBQUEsTUFBQSxJQUFBMEgscUJBQUEsQ0FBQTtFQUN6QixNQUFBLElBQUFDLFlBQUEsR0FRSTNILEtBQUEsQ0FBS2xSLEtBQUs7VUFQWnNCLEdBQUcsR0FBQXVYLFlBQUEsQ0FBSHZYLEdBQUc7VUFDSHdYLFlBQVksR0FBQUQsWUFBQSxDQUFaQyxZQUFZO1VBQ1pDLFVBQVUsR0FBQUYsWUFBQSxDQUFWRSxVQUFVO1VBQ1ZDLFlBQVksR0FBQUgsWUFBQSxDQUFaRyxZQUFZO1VBQ1pDLDBCQUEwQixHQUFBSixZQUFBLENBQTFCSSwwQkFBMEI7VUFDMUJuWixTQUFTLEdBQUErWSxZQUFBLENBQVQvWSxTQUFTO1VBQ1RDLE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU8sQ0FBQTtFQUdULE1BQUEsSUFBTW1aLGFBQWEsR0FBQU4sQ0FBQUEscUJBQUEsR0FBRzFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQU4sSUFBQUEsSUFBQUEscUJBQUEsY0FBQUEscUJBQUEsR0FBSTFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtFQUV6RSxNQUFBLElBQ0UsRUFBRVcsWUFBWSxJQUFJQyxVQUFVLElBQUlDLFlBQVksQ0FBQyxJQUM3QyxDQUFDRSxhQUFhLElBQ2IsQ0FBQ0QsMEJBQTBCLElBQUkvSCxLQUFBLENBQUtvRyxVQUFVLEVBQUcsRUFDbEQ7RUFDQSxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUVBLE1BQUEsSUFDRXdCLFlBQVksSUFDWi9ZLE9BQU8sS0FDTlgsaUJBQVEsQ0FBQzhaLGFBQWEsRUFBRW5aLE9BQU8sQ0FBQyxJQUFJaUQsT0FBTyxDQUFDa1csYUFBYSxFQUFFblosT0FBTyxDQUFDLENBQUMsRUFDckU7RUFDQSxRQUFBLE9BQU9tRCxZQUFZLENBQUM1QixHQUFHLEVBQUU0WCxhQUFhLEVBQUVuWixPQUFPLENBQUMsQ0FBQTtFQUNsRCxPQUFBO0VBRUEsTUFBQSxJQUNFZ1osVUFBVSxJQUNWalosU0FBUyxLQUNSbVAsZUFBTyxDQUFDaUssYUFBYSxFQUFFcFosU0FBUyxDQUFDLElBQUlrRCxPQUFPLENBQUNrVyxhQUFhLEVBQUVwWixTQUFTLENBQUMsQ0FBQyxFQUN4RTtFQUNBLFFBQUEsT0FBT29ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRW9aLGFBQWEsQ0FBQyxDQUFBO0VBQ3BELE9BQUE7UUFFQSxJQUNFRixZQUFZLElBQ1psWixTQUFTLElBQ1QsQ0FBQ0MsT0FBTyxLQUNQa1AsZUFBTyxDQUFDaUssYUFBYSxFQUFFcFosU0FBUyxDQUFDLElBQUlrRCxPQUFPLENBQUNrVyxhQUFhLEVBQUVwWixTQUFTLENBQUMsQ0FBQyxFQUN4RTtFQUNBLFFBQUEsT0FBT29ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRW9aLGFBQWEsQ0FBQyxDQUFBO0VBQ3BELE9BQUE7RUFFQSxNQUFBLE9BQU8sS0FBSyxDQUFBO09BQ2IsQ0FBQSxDQUFBO01BQUE3SCxlQUFBLENBQUFILEtBQUEsRUFBQSx1QkFBQSxFQUV1QixZQUFNO0VBQUEsTUFBQSxJQUFBaUksc0JBQUEsQ0FBQTtFQUM1QixNQUFBLElBQUksQ0FBQ2pJLEtBQUEsQ0FBS2tJLGtCQUFrQixFQUFFLEVBQUU7RUFDOUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUFDLFlBQUEsR0FBeUNuSSxLQUFBLENBQUtsUixLQUFLO1VBQTNDc0IsR0FBRyxHQUFBK1gsWUFBQSxDQUFIL1gsR0FBRztVQUFFeEIsU0FBUyxHQUFBdVosWUFBQSxDQUFUdlosU0FBUztVQUFFZ1osWUFBWSxHQUFBTyxZQUFBLENBQVpQLFlBQVksQ0FBQTtFQUNwQyxNQUFBLElBQU1JLGFBQWEsR0FBQUMsQ0FBQUEsc0JBQUEsR0FBR2pJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQUMsSUFBQUEsSUFBQUEsc0JBQUEsY0FBQUEsc0JBQUEsR0FBSWpJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtFQUV6RSxNQUFBLElBQUlXLFlBQVksRUFBRTtFQUNoQixRQUFBLE9BQU9oVyxTQUFTLENBQUN4QixHQUFHLEVBQUU0WCxhQUFhLENBQUMsQ0FBQTtFQUN0QyxPQUFDLE1BQU07RUFDTCxRQUFBLE9BQU9wVyxTQUFTLENBQUN4QixHQUFHLEVBQUV4QixTQUFTLENBQUMsQ0FBQTtFQUNsQyxPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUF1UixlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUVxQixZQUFNO0VBQUEsTUFBQSxJQUFBb0ksc0JBQUEsQ0FBQTtFQUMxQixNQUFBLElBQUksQ0FBQ3BJLEtBQUEsQ0FBS2tJLGtCQUFrQixFQUFFLEVBQUU7RUFDOUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUFHLFlBQUEsR0FBbURySSxLQUFBLENBQUtsUixLQUFLO1VBQXJEc0IsR0FBRyxHQUFBaVksWUFBQSxDQUFIalksR0FBRztVQUFFdkIsT0FBTyxHQUFBd1osWUFBQSxDQUFQeFosT0FBTztVQUFFZ1osVUFBVSxHQUFBUSxZQUFBLENBQVZSLFVBQVU7VUFBRUMsWUFBWSxHQUFBTyxZQUFBLENBQVpQLFlBQVksQ0FBQTtFQUM5QyxNQUFBLElBQU1FLGFBQWEsR0FBQUksQ0FBQUEsc0JBQUEsR0FBR3BJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQUksSUFBQUEsSUFBQUEsc0JBQUEsY0FBQUEsc0JBQUEsR0FBSXBJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtRQUV6RSxJQUFJWSxVQUFVLElBQUlDLFlBQVksRUFBRTtFQUM5QixRQUFBLE9BQU9sVyxTQUFTLENBQUN4QixHQUFHLEVBQUU0WCxhQUFhLENBQUMsQ0FBQTtFQUN0QyxPQUFDLE1BQU07RUFDTCxRQUFBLE9BQU9wVyxTQUFTLENBQUN4QixHQUFHLEVBQUV2QixPQUFPLENBQUMsQ0FBQTtFQUNoQyxPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUFzUixlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBTTtFQUNuQixNQUFBLElBQUFzSSxZQUFBLEdBQW9DdEksS0FBQSxDQUFLbFIsS0FBSztVQUF0Q3NCLEdBQUcsR0FBQWtZLFlBQUEsQ0FBSGxZLEdBQUc7VUFBRXhCLFNBQVMsR0FBQTBaLFlBQUEsQ0FBVDFaLFNBQVM7VUFBRUMsT0FBTyxHQUFBeVosWUFBQSxDQUFQelosT0FBTyxDQUFBO0VBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBQ0EsTUFBQSxPQUFPK0MsU0FBUyxDQUFDaEQsU0FBUyxFQUFFd0IsR0FBRyxDQUFDLENBQUE7T0FDakMsQ0FBQSxDQUFBO01BQUErUCxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRVksWUFBTTtFQUNqQixNQUFBLElBQUF1SSxZQUFBLEdBQW9DdkksS0FBQSxDQUFLbFIsS0FBSztVQUF0Q3NCLEdBQUcsR0FBQW1ZLFlBQUEsQ0FBSG5ZLEdBQUc7VUFBRXhCLFNBQVMsR0FBQTJaLFlBQUEsQ0FBVDNaLFNBQVM7VUFBRUMsT0FBTyxHQUFBMFosWUFBQSxDQUFQMVosT0FBTyxDQUFBO0VBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBQ0EsTUFBQSxPQUFPK0MsU0FBUyxDQUFDL0MsT0FBTyxFQUFFdUIsR0FBRyxDQUFDLENBQUE7T0FDL0IsQ0FBQSxDQUFBO01BQUErUCxlQUFBLENBQUFILEtBQUEsRUFBQSxXQUFBLEVBRVcsWUFBTTtRQUNoQixJQUFNd0ksT0FBTyxHQUFHQyxhQUFNLENBQUN6SSxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUMsQ0FBQTtFQUN0QyxNQUFBLE9BQU9vWSxPQUFPLEtBQUssQ0FBQyxJQUFJQSxPQUFPLEtBQUssQ0FBQyxDQUFBO09BQ3RDLENBQUEsQ0FBQTtNQUFBckksZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07UUFDbkIsT0FDRUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBSyxLQUFLUyxTQUFTLElBQzlCLENBQUNpTSxLQUFBLENBQUtsUixLQUFLLENBQUN3RSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBS2lDLGlCQUFRLENBQUN5SyxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUMsQ0FBQTtPQUUzRCxDQUFBLENBQUE7TUFBQStQLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFZSxZQUFNO1FBQ3BCLE9BQ0VBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dFLEtBQUssS0FBS1MsU0FBUyxJQUM5QixDQUFDd0IsaUJBQVEsQ0FBQ3lLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUs0UCxLQUFBLENBQUtsUixLQUFLLENBQUN3RSxLQUFLLENBQUE7T0FFM0QsQ0FBQSxDQUFBO01BQUE2TSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsT0FBTUEsS0FBQSxDQUFLcE8sU0FBUyxDQUFDakcsT0FBTyxFQUFFLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUF3VSxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRWpDLFlBQU07RUFDakIsTUFBQSxJQUFJQSxLQUFBLENBQUtsUixLQUFLLENBQUMrWCxlQUFlLEVBQUU7RUFBQSxRQUFBLElBQUE2QixzQkFBQSxDQUFBO0VBQzlCLFFBQUEsT0FBQSxDQUFBQSxzQkFBQSxHQUFPMUksS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1ksYUFBYSxNQUFBNEIsSUFBQUEsSUFBQUEsc0JBQUEsdUJBQXhCQSxzQkFBQSxDQUEwQm5VLElBQUksQ0FBQyxVQUFDdkcsSUFBSSxFQUFBO0VBQUEsVUFBQSxPQUN6Q2dTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQy9ZLElBQUksQ0FBQyxDQUFBO0VBQUEsU0FDNUIsQ0FBQyxDQUFBO0VBQ0gsT0FBQTtRQUNBLE9BQU9nUyxLQUFBLENBQUsrRyxlQUFlLENBQUMvRyxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUMsQ0FBQTtPQUNqRCxDQUFBLENBQUE7RUFBQTdHLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVlLGVBQUEsRUFBQSxVQUFDaFMsSUFBSSxFQUFLO0VBQ3hCLE1BQUEsSUFBTTJhLFlBQVksR0FBRzNJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZaLFlBQVksR0FDeEMzSSxLQUFBLENBQUtsUixLQUFLLENBQUM2WixZQUFZLENBQUMzYSxJQUFJLENBQUMsR0FDN0IrRixTQUFTLENBQUE7RUFDYixNQUFBLE9BQU84TyxTQUFJLENBQ1QsdUJBQXVCLEVBQ3ZCOEYsWUFBWSxFQUNaLHlCQUF5QixHQUFHeFksZ0JBQWdCLENBQUM2UCxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUMsRUFDNUQ7RUFDRSxRQUFBLGlDQUFpQyxFQUFFNFAsS0FBQSxDQUFLb0csVUFBVSxFQUFFO0VBQ3BELFFBQUEsaUNBQWlDLEVBQUVwRyxLQUFBLENBQUs0SSxVQUFVLEVBQUU7RUFDcEQsUUFBQSxpQ0FBaUMsRUFBRTVJLEtBQUEsQ0FBSzZJLFVBQVUsRUFBRTtFQUNwRCxRQUFBLDBDQUEwQyxFQUFFN0ksS0FBQSxDQUFLOEksa0JBQWtCLEVBQUU7RUFDckUsUUFBQSxvQ0FBb0MsRUFBRTlJLEtBQUEsQ0FBSytJLFlBQVksRUFBRTtFQUN6RCxRQUFBLGtDQUFrQyxFQUFFL0ksS0FBQSxDQUFLZ0osVUFBVSxFQUFFO0VBQ3JELFFBQUEsaUNBQWlDLEVBQUVoSixLQUFBLENBQUtILFNBQVMsRUFBRTtFQUNuRCxRQUFBLDJDQUEyQyxFQUFFRyxLQUFBLENBQUtrSSxrQkFBa0IsRUFBRTtFQUN0RSxRQUFBLDhDQUE4QyxFQUM1Q2xJLEtBQUEsQ0FBS2lKLHFCQUFxQixFQUFFO0VBQzlCLFFBQUEsNENBQTRDLEVBQzFDakosS0FBQSxDQUFLa0osbUJBQW1CLEVBQUU7RUFDNUIsUUFBQSw4QkFBOEIsRUFBRWxKLEtBQUEsQ0FBS21KLFlBQVksRUFBRTtFQUNuRCxRQUFBLGdDQUFnQyxFQUFFbkosS0FBQSxDQUFLb0osU0FBUyxFQUFFO1VBQ2xELHNDQUFzQyxFQUNwQ3BKLEtBQUEsQ0FBS3FKLFlBQVksRUFBRSxJQUFJckosS0FBQSxDQUFLc0osYUFBYSxFQUFDO0VBQzlDLE9BQUMsRUFDRHRKLEtBQUEsQ0FBS3VKLG1CQUFtQixDQUFDLG9DQUFvQyxDQUFDLEVBQzlEdkosS0FBQSxDQUFLd0osZ0JBQWdCLEVBQ3ZCLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBckosZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07RUFDbkIsTUFBQSxJQUFBeUosWUFBQSxHQUlJekosS0FBQSxDQUFLbFIsS0FBSztVQUhac0IsR0FBRyxHQUFBcVosWUFBQSxDQUFIclosR0FBRztVQUFBc1oscUJBQUEsR0FBQUQsWUFBQSxDQUNIRSwwQkFBMEI7RUFBMUJBLFFBQUFBLDBCQUEwQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLFFBQVEsR0FBQUEscUJBQUE7VUFBQUUsc0JBQUEsR0FBQUgsWUFBQSxDQUNyQ0ksMkJBQTJCO0VBQTNCQSxRQUFBQSwyQkFBMkIsR0FBQUQsc0JBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxlQUFlLEdBQUFBLHNCQUFBLENBQUE7RUFHL0MsTUFBQSxJQUFNRSxNQUFNLEdBQ1Y5SixLQUFBLENBQUtvRyxVQUFVLEVBQUUsSUFBSXBHLEtBQUEsQ0FBSzRJLFVBQVUsRUFBRSxHQUNsQ2lCLDJCQUEyQixHQUMzQkYsMEJBQTBCLENBQUE7RUFFaEMsTUFBQSxPQUFBLEVBQUEsQ0FBQW5iLE1BQUEsQ0FBVXNiLE1BQU0sRUFBQXRiLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSW5CLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxNQUFNLEVBQUU0UCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQUMsQ0FBQSxDQUFBO09BQy9ELENBQUEsQ0FBQTtFQUVEO01BQUE4VCxlQUFBLENBQUFILEtBQUEsRUFBQSxVQUFBLEVBQ1csWUFBTTtFQUNmLE1BQUEsSUFBQStKLGFBQUEsR0FBb0QvSixLQUFBLENBQUtsUixLQUFLO1VBQXREc0IsR0FBRyxHQUFBMlosYUFBQSxDQUFIM1osR0FBRztVQUFBNFoscUJBQUEsR0FBQUQsYUFBQSxDQUFFeEMsUUFBUTtVQUFSQSxRQUFRLEdBQUF5QyxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLElBQUkxTyxHQUFHLEVBQUUsR0FBQTBPLHFCQUFBO1VBQUUvVixZQUFZLEdBQUE4VixhQUFBLENBQVo5VixZQUFZLENBQUE7RUFDL0MsTUFBQSxJQUFNZ1csU0FBUyxHQUFHNWMsVUFBVSxDQUFDK0MsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQy9DLElBQU04WixNQUFNLEdBQUcsRUFBRSxDQUFBO0VBQ2pCLE1BQUEsSUFBSTNDLFFBQVEsQ0FBQ0MsR0FBRyxDQUFDeUMsU0FBUyxDQUFDLEVBQUU7RUFDM0JDLFFBQUFBLE1BQU0sQ0FBQ25PLElBQUksQ0FBQW9PLEtBQUEsQ0FBWEQsTUFBTSxFQUFBL00sa0JBQUEsQ0FBU29LLFFBQVEsQ0FBQzFMLEdBQUcsQ0FBQ29PLFNBQVMsQ0FBQyxDQUFDRyxZQUFZLENBQUMsQ0FBQSxDQUFBO0VBQ3RELE9BQUE7RUFDQSxNQUFBLElBQUlwSyxLQUFBLENBQUs0SSxVQUFVLEVBQUUsRUFBRTtFQUNyQnNCLFFBQUFBLE1BQU0sQ0FBQ25PLElBQUksQ0FDVDlILFlBQVksS0FBWkEsSUFBQUEsSUFBQUEsWUFBWSxLQUFaQSxLQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxDQUFBQSxHQUFBQSxZQUFZLENBQ1I2RyxNQUFNLENBQUMsVUFBQ3RHLFdBQVcsRUFBQTtFQUFBLFVBQUEsT0FDbkI1QyxTQUFTLENBQUM0QyxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLEVBQUVwRSxHQUFHLENBQUMsQ0FBQTtFQUFBLFNBQ25FLENBQUMsQ0FDQTdDLEdBQUcsQ0FBQyxVQUFDaUgsV0FBVyxFQUFBO1lBQUEsT0FBS0EsV0FBVyxDQUFDNlYsT0FBTyxDQUFBO0VBQUEsU0FBQSxDQUM3QyxDQUFDLENBQUE7RUFDSCxPQUFBO0VBQ0EsTUFBQSxPQUFPSCxNQUFNLENBQUNyYyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7T0FDekIsQ0FBQSxDQUFBO0VBQUFzUyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsVUFBQ2dILFFBQVEsRUFBRUMsWUFBWSxFQUFLO1FBQ3hDLElBQU1xRCxXQUFXLEdBQUd0RCxRQUFRLElBQUloSCxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUE7UUFDbkQsSUFBTXVELGVBQWUsR0FBR3RELFlBQVksSUFBSWpILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtRQUMvRCxJQUFNdUQsUUFBUSxHQUNaLEVBQ0V4SyxLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLEtBQ3hCbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmIsY0FBYyxJQUFJLENBQUN6SyxLQUFBLENBQUswSyxhQUFhLEVBQUUsQ0FBQyxDQUNyRCxLQUNBMUssS0FBQSxDQUFLOEksa0JBQWtCLEVBQUUsSUFDdkI5SSxLQUFBLENBQUtwTyxTQUFTLENBQUMwWSxXQUFXLENBQUMsSUFDMUIxWSxTQUFTLENBQUMyWSxlQUFlLEVBQUVELFdBQVcsQ0FBRSxDQUFDLEdBQ3pDLENBQUMsR0FDRCxDQUFDLENBQUMsQ0FBQTtFQUVSLE1BQUEsT0FBT0UsUUFBUSxDQUFBO09BQ2hCLENBQUEsQ0FBQTtFQUVEO0VBQ0E7RUFDQTtNQUFBckssZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFDaUIsWUFBb0I7RUFBQSxNQUFBLElBQUEySyxtQkFBQSxDQUFBO0VBQUEsTUFBQSxJQUFuQkMsU0FBUyxHQUFBOVcsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO1FBQzlCLElBQUkrVyxjQUFjLEdBQUcsS0FBSyxDQUFBO0VBQzFCO0VBQ0E7UUFDQSxJQUNFN0ssS0FBQSxDQUFLOEssV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUN4QixDQUFDRixTQUFTLENBQUNHLGNBQWMsSUFDekIvSyxLQUFBLENBQUtwTyxTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUMsRUFDdkM7RUFDQTtFQUNBLFFBQUEsSUFBSSxDQUFDK0QsUUFBUSxDQUFDQyxhQUFhLElBQUlELFFBQVEsQ0FBQ0MsYUFBYSxLQUFLRCxRQUFRLENBQUNFLElBQUksRUFBRTtFQUN2RUwsVUFBQUEsY0FBYyxHQUFHLElBQUksQ0FBQTtFQUN2QixTQUFBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsUUFBQSxJQUFJN0ssS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxJQUFJLENBQUNuTCxLQUFBLENBQUtsUixLQUFLLENBQUNzYyxvQkFBb0IsRUFBRTtFQUN6RFAsVUFBQUEsY0FBYyxHQUFHLEtBQUssQ0FBQTtFQUN4QixTQUFBO0VBQ0E7RUFDQSxRQUFBLElBQ0U3SyxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFZLElBQ3ZCckwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdWMsWUFBWSxDQUFDckosT0FBTyxJQUMvQmhDLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VjLFlBQVksQ0FBQ3JKLE9BQU8sQ0FBQ3NKLFFBQVEsQ0FBQ04sUUFBUSxDQUFDQyxhQUFhLENBQUMsSUFDaEVELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDTSxTQUFTLENBQUNELFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUNsRTtFQUNBVCxVQUFBQSxjQUFjLEdBQUcsSUFBSSxDQUFBO0VBQ3ZCLFNBQUE7RUFDQTtVQUNBLElBQUk3SyxLQUFBLENBQUtsUixLQUFLLENBQUMwYywwQkFBMEIsSUFBSXhMLEtBQUEsQ0FBS3FKLFlBQVksRUFBRSxFQUFFO0VBQ2hFd0IsVUFBQUEsY0FBYyxHQUFHLEtBQUssQ0FBQTtFQUN4QixTQUFBO1VBQ0EsSUFBSTdLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJjLDRCQUE0QixJQUFJekwsS0FBQSxDQUFLc0osYUFBYSxFQUFFLEVBQUU7RUFDbkV1QixVQUFBQSxjQUFjLEdBQUcsS0FBSyxDQUFBO0VBQ3hCLFNBQUE7RUFDRixPQUFBO0VBRUFBLE1BQUFBLGNBQWMsS0FBQUYsQ0FBQUEsbUJBQUEsR0FBSTNLLEtBQUEsQ0FBSzBMLEtBQUssQ0FBQzFKLE9BQU8sTUFBQSxJQUFBLElBQUEySSxtQkFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFsQkEsbUJBQUEsQ0FBb0JnQixLQUFLLENBQUM7RUFBRUMsUUFBQUEsYUFBYSxFQUFFLElBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQSxDQUFBO09BQ3JFLENBQUEsQ0FBQTtNQUFBekwsZUFBQSxDQUFBSCxLQUFBLEVBQUEsbUJBQUEsRUFFbUIsWUFBTTtFQUN4QixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBjLDBCQUEwQixJQUFJeEwsS0FBQSxDQUFLcUosWUFBWSxFQUFFLEVBQzlELE9BQU8sSUFBSSxDQUFBO0VBQ2IsTUFBQSxJQUFJckosS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmMsNEJBQTRCLElBQUl6TCxLQUFBLENBQUtzSixhQUFhLEVBQUUsRUFDakUsT0FBTyxJQUFJLENBQUE7RUFDYixNQUFBLE9BQU90SixLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBaUIsR0FDL0I3TCxLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBaUIsQ0FBQ3hOLGVBQU8sQ0FBQzJCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsQ0FBQyxFQUFFNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLEdBQ3JFaU8sZUFBTyxDQUFDMkIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLENBQUE7T0FDNUIsQ0FBQSxDQUFBO01BQUErUCxlQUFBLENBQUFILEtBQUEsRUFFUSxRQUFBLEVBQUEsWUFBQTtRQUFBLG9CQUNQUSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQ0VxQyxHQUFHLEVBQUU5QyxLQUFBLENBQUswTCxLQUFNO1VBQ2hCdFAsU0FBUyxFQUFFNEQsS0FBQSxDQUFLOEwsYUFBYSxDQUFDOUwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFFO1VBQzlDMmIsU0FBUyxFQUFFL0wsS0FBQSxDQUFLd0csZUFBZ0I7VUFDaEM5RixPQUFPLEVBQUVWLEtBQUEsQ0FBS2dNLFdBQVk7RUFDMUIzRixRQUFBQSxZQUFZLEVBQ1YsQ0FBQ3JHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21kLGVBQWUsR0FBR2pNLEtBQUEsQ0FBS2tNLGdCQUFnQixHQUFHblksU0FDdkQ7VUFDRG9ZLGNBQWMsRUFDWm5NLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21kLGVBQWUsR0FBR2pNLEtBQUEsQ0FBS2tNLGdCQUFnQixHQUFHblksU0FDdEQ7RUFDRHlXLFFBQUFBLFFBQVEsRUFBRXhLLEtBQUEsQ0FBSzhLLFdBQVcsRUFBRztFQUM3QixRQUFBLFlBQUEsRUFBWTlLLEtBQUEsQ0FBS29NLFlBQVksRUFBRztFQUNoQ0MsUUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYkMsUUFBQUEsS0FBSyxFQUFFdE0sS0FBQSxDQUFLdU0sUUFBUSxFQUFHO0VBQ3ZCLFFBQUEsZUFBQSxFQUFldk0sS0FBQSxDQUFLb0csVUFBVSxFQUFHO1VBQ2pDLGNBQWNwRyxFQUFBQSxLQUFBLENBQUttSixZQUFZLEVBQUUsR0FBRyxNQUFNLEdBQUdwVixTQUFVO1VBQ3ZELGVBQWVpTSxFQUFBQSxLQUFBLENBQUs2SSxVQUFVLEVBQUUsSUFBSTdJLEtBQUEsQ0FBS0gsU0FBUyxFQUFDO0VBQUUsT0FBQSxFQUVwREcsS0FBQSxDQUFLNkwsaUJBQWlCLEVBQUUsRUFDeEI3TCxLQUFBLENBQUt1TSxRQUFRLEVBQUUsS0FBSyxFQUFFLGlCQUNyQi9MLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTXJFLFFBQUFBLFNBQVMsRUFBQyxTQUFBO0VBQVMsT0FBQSxFQUFFNEQsS0FBQSxDQUFLdU0sUUFBUSxFQUFTLENBRWhELENBQUMsQ0FBQTtPQUNQLENBQUEsQ0FBQTtFQUFBLElBQUEsT0FBQXZNLEtBQUEsQ0FBQTtFQUFBLEdBQUE7SUFBQTRCLFNBQUEsQ0FBQXVFLEdBQUEsRUFBQXBHLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUFzRSxHQUFBLEVBQUEsQ0FBQTtNQUFBeEssR0FBQSxFQUFBLG1CQUFBO01BQUEvUCxLQUFBLEVBeFlELFNBQUFrVyxpQkFBQUEsR0FBb0I7UUFDbEIsSUFBSSxDQUFDMEssY0FBYyxFQUFFLENBQUE7RUFDdkIsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBN1EsR0FBQSxFQUFBLG9CQUFBO0VBQUEvUCxJQUFBQSxLQUFBLEVBRUQsU0FBQTZnQixrQkFBbUI3QixDQUFBQSxTQUFTLEVBQUU7RUFDNUIsTUFBQSxJQUFJLENBQUM0QixjQUFjLENBQUM1QixTQUFTLENBQUMsQ0FBQTtFQUNoQyxLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBMUQ4QnBLLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDakJQLElBRXBCMEosVUFBVSwwQkFBQTNNLGdCQUFBLEVBQUE7RUFBQSxFQUFBLFNBQUEyTSxVQUFBLEdBQUE7RUFBQSxJQUFBLElBQUExTSxLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBeU0sVUFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQXRKLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUF3TSxVQUFBLEVBQUFsZSxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLGVBa0NkUSxzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUEsQ0FBQTtFQUFBeEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWxCLGFBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDdkIsTUFBQSxJQUFJUyxLQUFBLENBQUtsUixLQUFLLENBQUM0UixPQUFPLEVBQUU7RUFDdEJWLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRSLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQyxDQUFBO0VBQzNCLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQVksSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWlCLGlCQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQzNCLE1BQUEsSUFBTStHLFFBQVEsR0FBRy9HLEtBQUssQ0FBQzVELEdBQUcsQ0FBQTtRQUMxQixJQUFJMkssUUFBUSxLQUFLLEdBQUcsRUFBRTtVQUNwQi9HLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO1VBQ3RCaEgsS0FBSyxDQUFDNUQsR0FBRyxHQUFHLE9BQU8sQ0FBQTtFQUNyQixPQUFBO0VBRUFxRSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUMwWCxlQUFlLENBQUNqSCxLQUFLLENBQUMsQ0FBQTtPQUNsQyxDQUFBLENBQUE7TUFBQVksZUFBQSxDQUFBSCxLQUFBLEVBRW9CLG9CQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsT0FDbkIsQ0FBQ0EsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlgsMEJBQTBCLElBQ3RDLENBQUMvVSxTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxJQUNoRHBWLFNBQVMsQ0FBQ29PLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBOUcsZUFBQSxDQUFBSCxLQUFBLEVBRXZDLGFBQUEsRUFBQSxZQUFBO1FBQUEsT0FDWkEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBYyxJQUN6QmxILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJiLGNBQWMsS0FDeEJ6SyxLQUFBLENBQUs4SSxrQkFBa0IsRUFBRSxJQUN2QmxYLFNBQVMsQ0FBQ29PLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2QsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLElBQzlDcFYsU0FBUyxDQUFDb08sS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFFLENBQUMsR0FDekQsQ0FBQyxHQUNELENBQUMsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFFUjtFQUNBO0VBQ0E7TUFBQTdHLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHVCQUFBLEVBQ3dCLFlBQW9CO0VBQUEsTUFBQSxJQUFuQjRLLFNBQVMsR0FBQTlXLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEVBQUUsQ0FBQTtRQUNyQyxJQUFJNlkscUJBQXFCLEdBQUcsS0FBSyxDQUFBO0VBQ2pDO0VBQ0E7UUFDQSxJQUNFM00sS0FBQSxDQUFLOEssV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUN4QixDQUFDRixTQUFTLENBQUNHLGNBQWMsSUFDekJuWixTQUFTLENBQUNvTyxLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQyxFQUNuRDtFQUNBO0VBQ0EsUUFBQSxJQUFJLENBQUMrRCxRQUFRLENBQUNDLGFBQWEsSUFBSUQsUUFBUSxDQUFDQyxhQUFhLEtBQUtELFFBQVEsQ0FBQ0UsSUFBSSxFQUFFO0VBQ3ZFeUIsVUFBQUEscUJBQXFCLEdBQUcsSUFBSSxDQUFBO0VBQzlCLFNBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQSxRQUFBLElBQUkzTSxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLElBQUksQ0FBQ25MLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NjLG9CQUFvQixFQUFFO0VBQ3pEdUIsVUFBQUEscUJBQXFCLEdBQUcsS0FBSyxDQUFBO0VBQy9CLFNBQUE7RUFDQTtFQUNBLFFBQUEsSUFDRTNNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VjLFlBQVksSUFDdkJyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFZLENBQUNySixPQUFPLElBQy9CaEMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdWMsWUFBWSxDQUFDckosT0FBTyxDQUFDc0osUUFBUSxDQUFDTixRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUNoRUQsUUFBUSxDQUFDQyxhQUFhLElBQ3RCRCxRQUFRLENBQUNDLGFBQWEsQ0FBQ00sU0FBUyxDQUFDRCxRQUFRLENBQ3ZDLCtCQUNGLENBQUMsRUFDRDtFQUNBcUIsVUFBQUEscUJBQXFCLEdBQUcsSUFBSSxDQUFBO0VBQzlCLFNBQUE7RUFDRixPQUFBO0VBRUFBLE1BQUFBLHFCQUFxQixJQUNuQjNNLEtBQUEsQ0FBSzRNLFlBQVksQ0FBQzVLLE9BQU8sSUFDekJoQyxLQUFBLENBQUs0TSxZQUFZLENBQUM1SyxPQUFPLENBQUMySixLQUFLLENBQUM7RUFBRUMsUUFBQUEsYUFBYSxFQUFFLElBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQTtPQUMzRCxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUE1TCxLQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE0QixTQUFBLENBQUE4SyxVQUFBLEVBQUEzTSxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBNkssVUFBQSxFQUFBLENBQUE7TUFBQS9RLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQS9FRCxTQUFBa1csaUJBQUFBLEdBQW9CO1FBQ2xCLElBQUksQ0FBQytLLHFCQUFxQixFQUFFLENBQUE7RUFDOUIsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBbFIsR0FBQSxFQUFBLG9CQUFBO0VBQUEvUCxJQUFBQSxLQUFBLEVBRUQsU0FBQTZnQixrQkFBbUI3QixDQUFBQSxTQUFTLEVBQUU7RUFDNUIsTUFBQSxJQUFJLENBQUNpQyxxQkFBcUIsQ0FBQ2pDLFNBQVMsQ0FBQyxDQUFBO0VBQ3ZDLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQWpQLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBMkVELFNBQUErVyxNQUFBQSxHQUFTO0VBQ1AsTUFBQSxJQUFBeUUsV0FBQSxHQUEyRCxJQUFJLENBQUN0WSxLQUFLO1VBQTdEZ2UsVUFBVSxHQUFBMUYsV0FBQSxDQUFWMEYsVUFBVTtVQUFBQyxxQkFBQSxHQUFBM0YsV0FBQSxDQUFFNEYsZUFBZTtFQUFmQSxRQUFBQSxlQUFlLEdBQUFELHFCQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsT0FBTyxHQUFBQSxxQkFBQTtVQUFFck0sT0FBTyxHQUFBMEcsV0FBQSxDQUFQMUcsT0FBTyxDQUFBO0VBRXRELE1BQUEsSUFBTXVNLGlCQUFpQixHQUFHO0VBQ3hCLFFBQUEsK0JBQStCLEVBQUUsSUFBSTtVQUNyQywwQ0FBMEMsRUFBRSxDQUFDLENBQUN2TSxPQUFPO0VBQ3JELFFBQUEseUNBQXlDLEVBQ3ZDLENBQUMsQ0FBQ0EsT0FBTyxJQUFJOU8sU0FBUyxDQUFDLElBQUksQ0FBQzlDLEtBQUssQ0FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQ2MsS0FBSyxDQUFDa1ksUUFBUSxDQUFDO0VBQzlELFFBQUEsa0RBQWtELEVBQ2hELElBQUksQ0FBQzhCLGtCQUFrQixFQUFDO1NBQzNCLENBQUE7UUFDRCxvQkFDRXRJLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7VUFDRXFDLEdBQUcsRUFBRSxJQUFJLENBQUM4SixZQUFhO0VBQ3ZCeFEsUUFBQUEsU0FBUyxFQUFFeUcsU0FBSSxDQUFDb0ssaUJBQWlCLENBQUU7VUFDbkMsWUFBQXplLEVBQUFBLEVBQUFBLENBQUFBLE1BQUEsQ0FBZXdlLGVBQWUsRUFBQXhlLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSSxJQUFJLENBQUNNLEtBQUssQ0FBQ2dlLFVBQVUsQ0FBRztVQUMxRHBNLE9BQU8sRUFBRSxJQUFJLENBQUNzTCxXQUFZO1VBQzFCRCxTQUFTLEVBQUUsSUFBSSxDQUFDdkYsZUFBZ0I7RUFDaENnRSxRQUFBQSxRQUFRLEVBQUUsSUFBSSxDQUFDTSxXQUFXLEVBQUM7RUFBRSxPQUFBLEVBRTVCZ0MsVUFDRSxDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtNQUFBblIsR0FBQSxFQUFBLGNBQUE7TUFBQUUsR0FBQSxFQWpJRCxTQUFBQSxHQUFBQSxHQUEwQjtRQUN4QixPQUFPO0VBQ0xtUixRQUFBQSxlQUFlLEVBQUUsT0FBQTtTQUNsQixDQUFBO0VBQ0gsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQUxxQ3hNLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDQ29CLElBRXREa0ssSUFBSSwwQkFBQW5OLGdCQUFBLEVBQUE7RUFBQSxFQUFBLFNBQUFtTixJQUFBLEdBQUE7RUFBQSxJQUFBLElBQUFsTixLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBaU4sSUFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQTlKLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFnTixJQUFBLEVBQUExZSxFQUFBQSxDQUFBQSxNQUFBLENBQUE2VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQTBFTixVQUFDNVAsR0FBRyxFQUFFbVAsS0FBSyxFQUFLO0VBQy9CLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWUsVUFBVSxFQUFFO1VBQ3pCbk4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWUsVUFBVSxDQUFDL2MsR0FBRyxFQUFFbVAsS0FBSyxDQUFDLENBQUE7RUFDbkMsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDNVAsR0FBRyxFQUFLO0VBQzdCLE1BQUEsSUFBSTRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NlLGVBQWUsRUFBRTtFQUM5QnBOLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NlLGVBQWUsQ0FBQ2hkLEdBQUcsQ0FBQyxDQUFBO0VBQ2pDLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQStQLGVBQUEsQ0FBQUgsS0FBQSxFQUVpQixpQkFBQSxFQUFBLFVBQUM1UCxHQUFHLEVBQUUwYyxVQUFVLEVBQUV2TixLQUFLLEVBQUs7UUFDNUMsSUFBSSxPQUFPUyxLQUFBLENBQUtsUixLQUFLLENBQUN1ZSxZQUFZLEtBQUssVUFBVSxFQUFFO1VBQ2pEck4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDdWUsWUFBWSxDQUFDamQsR0FBRyxFQUFFMGMsVUFBVSxFQUFFdk4sS0FBSyxDQUFDLENBQUE7RUFDakQsT0FBQTtFQUNBLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBYyxFQUFFO0VBQzdCbEgsUUFBQUEsS0FBQSxDQUFLc04sY0FBYyxDQUFDbGQsR0FBRyxFQUFFbVAsS0FBSyxDQUFDLENBQUE7RUFDakMsT0FBQTtFQUNBLE1BQUEsSUFBSVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWUsbUJBQW1CLEVBQUU7RUFDbEN2TixRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDM0IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBbkUsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBSztFQUMzQixNQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUMwZSxnQkFBZ0IsRUFBRTtFQUMvQixRQUFBLE9BQU94TixLQUFBLENBQUtsUixLQUFLLENBQUMwZSxnQkFBZ0IsQ0FBQ3hmLElBQUksQ0FBQyxDQUFBO0VBQzFDLE9BQUE7UUFDQSxPQUFPaUMsT0FBTyxDQUFDakMsSUFBSSxDQUFDLENBQUE7T0FDckIsQ0FBQSxDQUFBO01BQUFtUyxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRVksWUFBTTtFQUNqQixNQUFBLElBQU12UCxXQUFXLEdBQUd1UCxLQUFBLENBQUt2UCxXQUFXLEVBQUUsQ0FBQTtRQUN0QyxJQUFNZ2QsSUFBSSxHQUFHLEVBQUUsQ0FBQTtFQUNmLE1BQUEsSUFBTVgsVUFBVSxHQUFHOU0sS0FBQSxDQUFLd04sZ0JBQWdCLENBQUMvYyxXQUFXLENBQUMsQ0FBQTtFQUNyRCxNQUFBLElBQUl1UCxLQUFBLENBQUtsUixLQUFLLENBQUMyYixjQUFjLEVBQUU7VUFDN0IsSUFBTWlELGFBQWEsR0FDakIxTixLQUFBLENBQUtsUixLQUFLLENBQUN1ZSxZQUFZLElBQUlyTixLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFjLEdBQ2hEbEgsS0FBQSxDQUFLMk4sZUFBZSxDQUFDL00sSUFBSSxDQUFBWixLQUFBLEVBQU92UCxXQUFXLEVBQUVxYyxVQUFVLENBQUMsR0FDeEQvWSxTQUFTLENBQUE7RUFDZjBaLFFBQUFBLElBQUksQ0FBQzFSLElBQUksZUFDUHlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2lNLFVBQVUsRUFBQTtFQUNUL1EsVUFBQUEsR0FBRyxFQUFDLEdBQUc7RUFDUG1SLFVBQUFBLFVBQVUsRUFBRUEsVUFBVztFQUN2QjllLFVBQUFBLElBQUksRUFBRXlDLFdBQVk7RUFDbEJpUSxVQUFBQSxPQUFPLEVBQUVnTixhQUFjO0VBQ3ZCMUcsVUFBQUEsUUFBUSxFQUFFaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUztFQUM5QkMsVUFBQUEsWUFBWSxFQUFFakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBYTtFQUN0QytGLFVBQUFBLGVBQWUsRUFBRWhOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tlLGVBQWdCO0VBQzVDOUYsVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBZTtFQUMxQ3VELFVBQUFBLGNBQWMsRUFBRXpLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJiLGNBQWU7RUFDMUM5RCxVQUFBQSwwQkFBMEIsRUFBRTNHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEyQjtFQUNsRUgsVUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7RUFDNUN1RSxVQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtsUixLQUFLLENBQUNpYyxjQUFlO0VBQzFDTSxVQUFBQSxZQUFZLEVBQUVyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFBQTtFQUFhLFNBQ3ZDLENBQ0gsQ0FBQyxDQUFBO0VBQ0gsT0FBQTtRQUNBLE9BQU9vQyxJQUFJLENBQUNqZixNQUFNLENBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUNqQixHQUFHLENBQUMsVUFBQ3FnQixNQUFNLEVBQUs7RUFDcEMsUUFBQSxJQUFNeGQsR0FBRyxHQUFHeWQsZUFBTyxDQUFDcGQsV0FBVyxFQUFFbWQsTUFBTSxDQUFDLENBQUE7RUFDeEMsUUFBQSxvQkFDRXBOLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBGLEdBQUcsRUFBQTtFQUNGd0QsVUFBQUEsMEJBQTBCLEVBQUUzSixLQUFBLENBQUtsUixLQUFLLENBQUNnZix3QkFBeUI7RUFDaEVqRSxVQUFBQSwyQkFBMkIsRUFBRTdKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lmLDBCQUEyQjtFQUNuRXBTLFVBQUFBLEdBQUcsRUFBRXZMLEdBQUcsQ0FBQzRkLE9BQU8sRUFBRztFQUNuQjVkLFVBQUFBLEdBQUcsRUFBRUEsR0FBSTtFQUNUa0QsVUFBQUEsS0FBSyxFQUFFME0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0UsS0FBTTtZQUN4Qm9OLE9BQU8sRUFBRVYsS0FBQSxDQUFLc04sY0FBYyxDQUFDMU0sSUFBSSxDQUFBWixLQUFBLEVBQU81UCxHQUFHLENBQUU7RUFDN0M2YixVQUFBQSxlQUFlLEVBQUVqTSxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFnQjtZQUM1QzVGLFlBQVksRUFBRXJHLEtBQUEsQ0FBS2lPLG1CQUFtQixDQUFDck4sSUFBSSxDQUFBWixLQUFBLEVBQU81UCxHQUFHLENBQUU7RUFDdkQ3RCxVQUFBQSxPQUFPLEVBQUV5VCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFRO0VBQzVCeUgsVUFBQUEsT0FBTyxFQUFFZ00sS0FBQSxDQUFLbFIsS0FBSyxDQUFDa0YsT0FBUTtFQUM1QnhELFVBQUFBLGdCQUFnQixFQUFFd1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQWlCO0VBQzlDeUQsVUFBQUEsWUFBWSxFQUFFK0wsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbUYsWUFBYTtFQUN0Q0MsVUFBQUEsb0JBQW9CLEVBQUU4TCxLQUFBLENBQUtsUixLQUFLLENBQUNvRixvQkFBcUI7RUFDdERDLFVBQUFBLFlBQVksRUFBRTZMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FGLFlBQWE7RUFDdENDLFVBQUFBLG9CQUFvQixFQUFFNEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0Ysb0JBQXFCO0VBQ3REK0csVUFBQUEsY0FBYyxFQUFFNkUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcU0sY0FBZTtFQUMxQ29NLFVBQUFBLFFBQVEsRUFBRXZILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lZLFFBQVM7RUFDOUJTLFVBQUFBLGFBQWEsRUFBRWhJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWM7RUFDeEMzVCxVQUFBQSxVQUFVLEVBQUUyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1RixVQUFXO0VBQ2xDNFMsVUFBQUEsWUFBWSxFQUFFakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBYTtFQUN0Q0QsVUFBQUEsUUFBUSxFQUFFaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUztFQUM5QlksVUFBQUEsWUFBWSxFQUFFNUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOFksWUFBYTtFQUN0Q0MsVUFBQUEsVUFBVSxFQUFFN0gsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK1ksVUFBVztFQUNsQ0MsVUFBQUEsWUFBWSxFQUFFOUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1osWUFBYTtFQUN0Q1osVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBZTtFQUMxQ3VELFVBQUFBLGNBQWMsRUFBRXpLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJiLGNBQWU7RUFDMUMxQyxVQUFBQSwwQkFBMEIsRUFBRS9ILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2laLDBCQUEyQjtFQUNsRWxCLFVBQUFBLGVBQWUsRUFBRTdHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytYLGVBQWdCO0VBQzVDQyxVQUFBQSxhQUFhLEVBQUU5RyxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFjO0VBQ3hDbFksVUFBQUEsU0FBUyxFQUFFb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFVO0VBQ2hDQyxVQUFBQSxPQUFPLEVBQUVtUixLQUFBLENBQUtsUixLQUFLLENBQUNELE9BQVE7RUFDNUI4WixVQUFBQSxZQUFZLEVBQUUzSSxLQUFBLENBQUtsUixLQUFLLENBQUM2WixZQUFhO0VBQ3RDa0QsVUFBQUEsaUJBQWlCLEVBQUU3TCxLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBa0I7RUFDaERsRixVQUFBQSwwQkFBMEIsRUFBRTNHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEyQjtFQUNsRUgsVUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFgsZUFBZ0I7RUFDNUN1RSxVQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtsUixLQUFLLENBQUNpYyxjQUFlO0VBQzFDTSxVQUFBQSxZQUFZLEVBQUVyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1YyxZQUFhO0VBQ3RDRixVQUFBQSxNQUFNLEVBQUVuTCxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFPO0VBQzFCQyxVQUFBQSxvQkFBb0IsRUFBRXBMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NjLG9CQUFxQjtFQUN0REksVUFBQUEsMEJBQTBCLEVBQUV4TCxLQUFBLENBQUtsUixLQUFLLENBQUMwYywwQkFBMkI7RUFDbEVDLFVBQUFBLDRCQUE0QixFQUMxQnpMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJjLDRCQUNaO0VBQ0RwZixVQUFBQSxNQUFNLEVBQUUyVCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFBQTtFQUFPLFNBQzNCLENBQUMsQ0FBQTtFQUVOLE9BQUMsQ0FDSCxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7TUFBQThULGVBQUEsQ0FBQUgsS0FBQSxFQUVhLGFBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUNaelAsY0FBYyxDQUNaeVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUNkNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUNiLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUEyUCxlQUFBLENBQUFILEtBQUEsRUFFa0Isb0JBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUNuQixDQUFDQSxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsSUFDdEMsQ0FBQy9VLFNBQVMsQ0FBQ29PLEtBQUEsQ0FBS3ZQLFdBQVcsRUFBRSxFQUFFdVAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLElBQ25EcFYsU0FBUyxDQUFDb08sS0FBQSxDQUFLdlAsV0FBVyxFQUFFLEVBQUV1UCxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxPQUFBakgsS0FBQSxDQUFBO0VBQUEsR0FBQTtJQUFBNEIsU0FBQSxDQUFBc0wsSUFBQSxFQUFBbk4sZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQXFMLElBQUEsRUFBQSxDQUFBO01BQUF2UixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUV4RCxTQUFBK1csTUFBQUEsR0FBUztFQUNQLE1BQUEsSUFBTXNLLGlCQUFpQixHQUFHO0VBQ3hCLFFBQUEsd0JBQXdCLEVBQUUsSUFBSTtFQUM5QixRQUFBLGtDQUFrQyxFQUFFcmIsU0FBUyxDQUMzQyxJQUFJLENBQUNuQixXQUFXLEVBQUUsRUFDbEIsSUFBSSxDQUFDM0IsS0FBSyxDQUFDa1ksUUFDYixDQUFDO0VBQ0QsUUFBQSwyQ0FBMkMsRUFBRSxJQUFJLENBQUM4QixrQkFBa0IsRUFBQztTQUN0RSxDQUFBO1FBQ0Qsb0JBQU90SSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQUtyRSxTQUFTLEVBQUV5RyxTQUFJLENBQUNvSyxpQkFBaUIsQ0FBQTtFQUFFLE9BQUEsRUFBRSxJQUFJLENBQUNpQixVQUFVLEVBQVEsQ0FBQyxDQUFBO0VBQzNFLEtBQUE7RUFBQyxHQUFBLENBQUEsRUFBQSxDQUFBO01BQUF2UyxHQUFBLEVBQUEsY0FBQTtNQUFBRSxHQUFBLEVBaE5ELFNBQUFBLEdBQUFBLEdBQTBCO1FBQ3hCLE9BQU87RUFDTDBSLFFBQUFBLG1CQUFtQixFQUFFLElBQUE7U0FDdEIsQ0FBQTtFQUNILEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0FMK0IvTSxDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ0ZqRCxJQUFNbUwsZ0NBQWdDLEdBQUcsQ0FBQyxDQUFBO0VBRTFDLElBQU1DLG9CQUFvQixHQUFHO0VBQzNCQyxFQUFBQSxXQUFXLEVBQUUsYUFBYTtFQUMxQkMsRUFBQUEsYUFBYSxFQUFFLGVBQWU7RUFDOUJDLEVBQUFBLFlBQVksRUFBRSxjQUFBO0VBQ2hCLENBQUMsQ0FBQTtFQUNELElBQU1DLGFBQWEsR0FBQXJPLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQ2hCaU8sRUFBQUEsRUFBQUEsb0JBQW9CLENBQUNDLFdBQVcsRUFBRztFQUNsQ0ksRUFBQUEsSUFBSSxFQUFFLENBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ1Q7RUFDREMsRUFBQUEsd0JBQXdCLEVBQUUsQ0FBQTtFQUM1QixDQUFDLENBQ0FOLEVBQUFBLG9CQUFvQixDQUFDRSxhQUFhLEVBQUc7RUFDcENHLEVBQUFBLElBQUksRUFBRSxDQUNKLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNULENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDWjtFQUNEQyxFQUFBQSx3QkFBd0IsRUFBRSxDQUFBO0VBQzVCLENBQUMsQ0FDQU4sRUFBQUEsb0JBQW9CLENBQUNHLFlBQVksRUFBRztFQUNuQ0UsRUFBQUEsSUFBSSxFQUFFLENBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ2Y7RUFDREMsRUFBQUEsd0JBQXdCLEVBQUUsQ0FBQTtFQUM1QixDQUFDLENBQ0YsQ0FBQTtFQUNELElBQU1DLGtDQUFrQyxHQUFHLENBQUMsQ0FBQTtFQUU1QyxTQUFTQyxxQkFBcUJBLENBQzVCQyw2QkFBNkIsRUFDN0JDLDRCQUE0QixFQUM1QjtFQUNBLEVBQUEsSUFBSUQsNkJBQTZCLEVBQUUsT0FBT1Qsb0JBQW9CLENBQUNHLFlBQVksQ0FBQTtFQUMzRSxFQUFBLElBQUlPLDRCQUE0QixFQUFFLE9BQU9WLG9CQUFvQixDQUFDQyxXQUFXLENBQUE7SUFDekUsT0FBT0Qsb0JBQW9CLENBQUNFLGFBQWEsQ0FBQTtFQUMzQyxDQUFBO0VBQUMsSUFFb0JTLEtBQUssMEJBQUFoUCxnQkFBQSxFQUFBO0VBQUEsRUFBQSxTQUFBZ1AsS0FBQSxHQUFBO0VBQUEsSUFBQSxJQUFBL08sS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQThPLEtBQUEsQ0FBQSxDQUFBO0VBQUEsSUFBQSxLQUFBLElBQUEzTCxJQUFBLEdBQUF0UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF1VixJQUFBLEdBQUF4VyxJQUFBQSxLQUFBLENBQUF1VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtFQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXhQLEdBQUFBLFNBQUEsQ0FBQXdQLElBQUEsQ0FBQSxDQUFBO0VBQUEsS0FBQTtFQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBNk8sS0FBQSxFQUFBdmdCLEVBQUFBLENBQUFBLE1BQUEsQ0FBQTZVLElBQUEsQ0FBQSxDQUFBLENBQUE7TUFBQWxELGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFlBQUEsRUFtRlg3QyxrQkFBQSxDQUFJdFEsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFFVSxDQUFBQSxHQUFHLENBQUMsWUFBQTtFQUFBLE1BQUEsb0JBQU1pVCxzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUE7T0FBQyxDQUFBLENBQUEsQ0FBQTtNQUFBeEIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUN6QzdDLGtCQUFBLENBQUl0USxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUVVLENBQUFBLEdBQUcsQ0FBQyxZQUFBO0VBQUEsTUFBQSxvQkFBTWlULHNCQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQTtPQUFDLENBQUEsQ0FBQSxDQUFBO0VBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFNUMsWUFBQSxFQUFBLFVBQUNoUyxJQUFJLEVBQUE7UUFBQSxPQUFLbVgsYUFBbUIsQ0FBQ25YLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQXFSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUUvQyxZQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBQTtRQUFBLE9BQUttWCxhQUFtQixDQUFDblgsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBcVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFM0MsVUFBQzVQLEdBQUcsRUFBRW1QLEtBQUssRUFBSztFQUMvQixNQUFBLElBQUlTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FlLFVBQVUsRUFBRTtFQUN6Qm5OLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FlLFVBQVUsQ0FBQy9jLEdBQUcsRUFBRW1QLEtBQUssRUFBRVMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa2dCLGNBQWMsQ0FBQyxDQUFBO0VBQzlELE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQTdPLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUM1UCxHQUFHLEVBQUs7RUFDN0IsTUFBQSxJQUFJNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2UsZUFBZSxFQUFFO0VBQzlCcE4sUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2UsZUFBZSxDQUFDaGQsR0FBRyxDQUFDLENBQUE7RUFDakMsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBK1AsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtFQUN2QixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21nQixZQUFZLEVBQUU7RUFDM0JqUCxRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNtZ0IsWUFBWSxFQUFFLENBQUE7RUFDM0IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBOU8sSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW1CLG1CQUFBLEVBQUEsVUFBQzdLLENBQUMsRUFBSztFQUN6QixNQUFBLElBQUFpUyxXQUFBLEdBQW9DcEgsS0FBQSxDQUFLbFIsS0FBSztVQUF0Q3NCLEdBQUcsR0FBQWdYLFdBQUEsQ0FBSGhYLEdBQUc7VUFBRXhCLFNBQVMsR0FBQXdZLFdBQUEsQ0FBVHhZLFNBQVM7VUFBRUMsT0FBTyxHQUFBdVksV0FBQSxDQUFQdlksT0FBTyxDQUFBO0VBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBQ0EsTUFBQSxPQUFPc1csV0FBaUIsQ0FBQ0EsaUJBQWMsQ0FBQy9VLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxFQUFFdkcsU0FBUyxDQUFDLENBQUE7T0FDNUQsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDM0osQ0FBQyxFQUFLO0VBQzNCLE1BQUEsSUFBQWlSLFlBQUEsR0FBb0N0SCxLQUFBLENBQUtsUixLQUFLO1VBQXRDc0IsR0FBRyxHQUFBa1gsWUFBQSxDQUFIbFgsR0FBRztVQUFFeEIsU0FBUyxHQUFBMFksWUFBQSxDQUFUMVksU0FBUztVQUFFQyxPQUFPLEdBQUF5WSxZQUFBLENBQVB6WSxPQUFPLENBQUE7RUFDL0IsTUFBQSxJQUFJLENBQUNELFNBQVMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7RUFDMUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFDQSxNQUFBLE9BQU9zVyxhQUFtQixDQUFDQSxxQkFBZ0IsQ0FBQy9VLEdBQUcsRUFBRWlHLENBQUMsQ0FBQyxFQUFFekgsU0FBUyxDQUFDLENBQUE7T0FDaEUsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDN0ssQ0FBQyxFQUFLO0VBQ3ZCLE1BQUEsSUFBQXNTLFlBQUEsR0FBb0N6SCxLQUFBLENBQUtsUixLQUFLO1VBQXRDc0IsR0FBRyxHQUFBcVgsWUFBQSxDQUFIclgsR0FBRztVQUFFeEIsU0FBUyxHQUFBNlksWUFBQSxDQUFUN1ksU0FBUztVQUFFQyxPQUFPLEdBQUE0WSxZQUFBLENBQVA1WSxPQUFPLENBQUE7RUFDL0IsTUFBQSxJQUFJLENBQUNELFNBQVMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7RUFDMUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFDQSxNQUFBLE9BQU9zVyxXQUFpQixDQUFDQSxpQkFBYyxDQUFDL1UsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLEVBQUV0RyxPQUFPLENBQUMsQ0FBQTtPQUMxRCxDQUFBLENBQUE7RUFBQXNSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUMzSixDQUFDLEVBQUs7RUFDekIsTUFBQSxJQUFBc1IsWUFBQSxHQUFvQzNILEtBQUEsQ0FBS2xSLEtBQUs7VUFBdENzQixHQUFHLEdBQUF1WCxZQUFBLENBQUh2WCxHQUFHO1VBQUV4QixTQUFTLEdBQUErWSxZQUFBLENBQVQvWSxTQUFTO1VBQUVDLE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU8sQ0FBQTtFQUMvQixNQUFBLElBQUksQ0FBQ0QsU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtFQUMxQixRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUNBLE1BQUEsT0FBT3NXLGFBQW1CLENBQUNBLHFCQUFnQixDQUFDL1UsR0FBRyxFQUFFaUcsQ0FBQyxDQUFDLEVBQUV4SCxPQUFPLENBQUMsQ0FBQTtPQUM5RCxDQUFBLENBQUE7RUFBQXNSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV5Qix5QkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFBQSxNQUFBLElBQUF1UyxxQkFBQSxDQUFBO0VBQy9CLE1BQUEsSUFBQVMsWUFBQSxHQUNFbkksS0FBQSxDQUFLbFIsS0FBSztVQURKc0IsR0FBRyxHQUFBK1gsWUFBQSxDQUFIL1gsR0FBRztVQUFFd1gsWUFBWSxHQUFBTyxZQUFBLENBQVpQLFlBQVk7VUFBRUMsVUFBVSxHQUFBTSxZQUFBLENBQVZOLFVBQVU7VUFBRUMsWUFBWSxHQUFBSyxZQUFBLENBQVpMLFlBQVk7VUFBRWxaLFNBQVMsR0FBQXVaLFlBQUEsQ0FBVHZaLFNBQVM7VUFBRUMsT0FBTyxHQUFBc1osWUFBQSxDQUFQdFosT0FBTyxDQUFBO0VBR3ZFLE1BQUEsSUFBTW1aLGFBQWEsR0FBQU4sQ0FBQUEscUJBQUEsR0FBRzFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQU4sSUFBQUEsSUFBQUEscUJBQUEsY0FBQUEscUJBQUEsR0FBSTFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtRQUV6RSxJQUFJLEVBQUVXLFlBQVksSUFBSUMsVUFBVSxJQUFJQyxZQUFZLENBQUMsSUFBSSxDQUFDRSxhQUFhLEVBQUU7RUFDbkUsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7UUFFQSxJQUFJSixZQUFZLElBQUkvWSxPQUFPLEVBQUU7VUFDM0IsT0FBT3NXLGNBQW9CLENBQUM2QyxhQUFhLEVBQUVuWixPQUFPLEVBQUVzRyxDQUFDLEVBQUUvRSxHQUFHLENBQUMsQ0FBQTtFQUM3RCxPQUFBO1FBRUEsSUFBSXlYLFVBQVUsSUFBSWpaLFNBQVMsRUFBRTtVQUMzQixPQUFPdVcsY0FBb0IsQ0FBQ3ZXLFNBQVMsRUFBRW9aLGFBQWEsRUFBRTdTLENBQUMsRUFBRS9FLEdBQUcsQ0FBQyxDQUFBO0VBQy9ELE9BQUE7RUFFQSxNQUFBLElBQUkwWCxZQUFZLElBQUlsWixTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1VBQ3pDLE9BQU9zVyxjQUFvQixDQUFDdlcsU0FBUyxFQUFFb1osYUFBYSxFQUFFN1MsQ0FBQyxFQUFFL0UsR0FBRyxDQUFDLENBQUE7RUFDL0QsT0FBQTtFQUVBLE1BQUEsT0FBTyxLQUFLLENBQUE7T0FDYixDQUFBLENBQUE7RUFBQStQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUU0Qiw0QkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFBQSxNQUFBLElBQUE4UyxzQkFBQSxDQUFBO0VBQ2xDLE1BQUEsSUFBSSxDQUFDakksS0FBQSxDQUFLa1AsdUJBQXVCLENBQUMvWixDQUFDLENBQUMsRUFBRTtFQUNwQyxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtFQUVBLE1BQUEsSUFBQWtULFlBQUEsR0FBeUNySSxLQUFBLENBQUtsUixLQUFLO1VBQTNDc0IsR0FBRyxHQUFBaVksWUFBQSxDQUFIalksR0FBRztVQUFFeEIsU0FBUyxHQUFBeVosWUFBQSxDQUFUelosU0FBUztVQUFFZ1osWUFBWSxHQUFBUyxZQUFBLENBQVpULFlBQVksQ0FBQTtRQUNwQyxJQUFNdUgsTUFBTSxHQUFHaEssaUJBQWMsQ0FBQy9VLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFBO0VBQ3JDLE1BQUEsSUFBTTZTLGFBQWEsR0FBQUMsQ0FBQUEsc0JBQUEsR0FBR2pJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2taLGFBQWEsTUFBQUMsSUFBQUEsSUFBQUEsc0JBQUEsY0FBQUEsc0JBQUEsR0FBSWpJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtFQUV6RSxNQUFBLElBQUlXLFlBQVksRUFBRTtFQUNoQixRQUFBLE9BQU96QyxXQUFpQixDQUFDZ0ssTUFBTSxFQUFFbkgsYUFBYSxDQUFDLENBQUE7RUFDakQsT0FBQyxNQUFNO0VBQ0wsUUFBQSxPQUFPN0MsV0FBaUIsQ0FBQ2dLLE1BQU0sRUFBRXZnQixTQUFTLENBQUMsQ0FBQTtFQUM3QyxPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFMEIsMEJBQUEsRUFBQSxVQUFDN0ssQ0FBQyxFQUFLO0VBQUEsTUFBQSxJQUFBaVQsc0JBQUEsQ0FBQTtFQUNoQyxNQUFBLElBQUksQ0FBQ3BJLEtBQUEsQ0FBS2tQLHVCQUF1QixDQUFDL1osQ0FBQyxDQUFDLEVBQUU7RUFDcEMsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUFtVCxZQUFBLEdBQW1EdEksS0FBQSxDQUFLbFIsS0FBSztVQUFyRHNCLEdBQUcsR0FBQWtZLFlBQUEsQ0FBSGxZLEdBQUc7VUFBRXZCLE9BQU8sR0FBQXlaLFlBQUEsQ0FBUHpaLE9BQU87VUFBRWdaLFVBQVUsR0FBQVMsWUFBQSxDQUFWVCxVQUFVO1VBQUVDLFlBQVksR0FBQVEsWUFBQSxDQUFaUixZQUFZLENBQUE7UUFDOUMsSUFBTXFILE1BQU0sR0FBR2hLLGlCQUFjLENBQUMvVSxHQUFHLEVBQUUrRSxDQUFDLENBQUMsQ0FBQTtFQUNyQyxNQUFBLElBQU02UyxhQUFhLEdBQUFJLENBQUFBLHNCQUFBLEdBQUdwSSxLQUFBLENBQUtsUixLQUFLLENBQUNrWixhQUFhLE1BQUFJLElBQUFBLElBQUFBLHNCQUFBLGNBQUFBLHNCQUFBLEdBQUlwSSxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUE7UUFFekUsSUFBSVksVUFBVSxJQUFJQyxZQUFZLEVBQUU7RUFDOUIsUUFBQSxPQUFPM0MsV0FBaUIsQ0FBQ2dLLE1BQU0sRUFBRW5ILGFBQWEsQ0FBQyxDQUFBO0VBQ2pELE9BQUMsTUFBTTtFQUNMLFFBQUEsT0FBTzdDLFdBQWlCLENBQUNnSyxNQUFNLEVBQUV0Z0IsT0FBTyxDQUFDLENBQUE7RUFDM0MsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBc1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRTJCLDJCQUFBLEVBQUEsVUFBQzNKLENBQUMsRUFBSztFQUFBLE1BQUEsSUFBQStZLHNCQUFBLENBQUE7RUFDakMsTUFBQSxJQUFBN0csWUFBQSxHQUNFdkksS0FBQSxDQUFLbFIsS0FBSztVQURKc0IsR0FBRyxHQUFBbVksWUFBQSxDQUFIblksR0FBRztVQUFFd1gsWUFBWSxHQUFBVyxZQUFBLENBQVpYLFlBQVk7VUFBRUMsVUFBVSxHQUFBVSxZQUFBLENBQVZWLFVBQVU7VUFBRUMsWUFBWSxHQUFBUyxZQUFBLENBQVpULFlBQVk7VUFBRWxaLFNBQVMsR0FBQTJaLFlBQUEsQ0FBVDNaLFNBQVM7VUFBRUMsT0FBTyxHQUFBMFosWUFBQSxDQUFQMVosT0FBTyxDQUFBO0VBR3ZFLE1BQUEsSUFBTW1aLGFBQWEsR0FBQW9ILENBQUFBLHNCQUFBLEdBQUdwUCxLQUFBLENBQUtsUixLQUFLLENBQUNrWixhQUFhLE1BQUFvSCxJQUFBQSxJQUFBQSxzQkFBQSxjQUFBQSxzQkFBQSxHQUFJcFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFBO1FBRXpFLElBQUksRUFBRVcsWUFBWSxJQUFJQyxVQUFVLElBQUlDLFlBQVksQ0FBQyxJQUFJLENBQUNFLGFBQWEsRUFBRTtFQUNuRSxRQUFBLE9BQU8sS0FBSyxDQUFBO0VBQ2QsT0FBQTtRQUVBLElBQUlKLFlBQVksSUFBSS9ZLE9BQU8sRUFBRTtVQUMzQixPQUFPc1csZ0JBQXNCLENBQUM2QyxhQUFhLEVBQUVuWixPQUFPLEVBQUV3SCxDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtFQUMvRCxPQUFBO1FBRUEsSUFBSXlYLFVBQVUsSUFBSWpaLFNBQVMsRUFBRTtVQUMzQixPQUFPdVcsZ0JBQXNCLENBQUN2VyxTQUFTLEVBQUVvWixhQUFhLEVBQUUzUixDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtFQUNqRSxPQUFBO0VBRUEsTUFBQSxJQUFJMFgsWUFBWSxJQUFJbFosU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtVQUN6QyxPQUFPc1csZ0JBQXNCLENBQUN2VyxTQUFTLEVBQUVvWixhQUFhLEVBQUUzUixDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtFQUNqRSxPQUFBO0VBRUEsTUFBQSxPQUFPLEtBQUssQ0FBQTtPQUNiLENBQUEsQ0FBQTtFQUFBK1AsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWUsZUFBQSxFQUFBLFVBQUN2UCxXQUFXLEVBQUs7RUFDL0IsTUFBQSxJQUFNTCxHQUFHLEdBQUc0UCxLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUE7UUFDMUIsSUFBTWUsU0FBUyxHQUFHZ1UsZUFBYSxDQUFDMVUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQy9DLE1BQUEsT0FDRTBVLFdBQWlCLENBQUMxVSxXQUFXLEVBQUVMLEdBQUcsQ0FBQyxJQUFJK1UsV0FBaUIsQ0FBQ2hVLFNBQVMsRUFBRWYsR0FBRyxDQUFDLENBQUE7T0FFM0UsQ0FBQSxDQUFBO0VBQUErUCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixVQUFDNVAsR0FBRyxFQUFFK0UsQ0FBQyxFQUFBO0VBQUEsTUFBQSxPQUN0QmdRLGVBQWEsQ0FBQy9VLEdBQUcsQ0FBQyxLQUFLK1UsZUFBYSxDQUFDQSxPQUFhLEVBQUUsQ0FBQyxJQUNyRGhRLENBQUMsS0FBS2dRLGlCQUFjLENBQUNBLE9BQWEsRUFBRSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBaEYsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFcEIsVUFBQzVQLEdBQUcsRUFBRWlHLENBQUMsRUFBQTtFQUFBLE1BQUEsT0FDeEI4TyxlQUFhLENBQUMvVSxHQUFHLENBQUMsS0FBSytVLGVBQWEsQ0FBQ0EsT0FBYSxFQUFFLENBQUMsSUFDckQ5TyxDQUFDLEtBQUs4TyxxQkFBZ0IsQ0FBQ0EsT0FBYSxFQUFFLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUFoRixlQUFBLENBQUFILEtBQUEsRUFFdkIsaUJBQUEsRUFBQSxVQUFDNVAsR0FBRyxFQUFFK0UsQ0FBQyxFQUFFNlIsUUFBUSxFQUFBO1FBQUEsT0FDakM3QixpQkFBYyxDQUFDNkIsUUFBUSxDQUFDLEtBQUs3UixDQUFDLElBQzlCZ1EsZUFBYSxDQUFDL1UsR0FBRyxDQUFDLEtBQUsrVSxlQUFhLENBQUM2QixRQUFRLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO01BQUE3RyxlQUFBLENBQUFILEtBQUEsRUFFNUIsbUJBQUEsRUFBQSxVQUFDNVAsR0FBRyxFQUFFaUcsQ0FBQyxFQUFFMlEsUUFBUSxFQUFBO1FBQUEsT0FDbkM3QixxQkFBZ0IsQ0FBQy9VLEdBQUcsQ0FBQyxLQUFLaUcsQ0FBQyxJQUMzQjhPLGVBQWEsQ0FBQy9VLEdBQUcsQ0FBQyxLQUFLK1UsZUFBYSxDQUFDNkIsUUFBUSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBN0csZUFBQSxDQUFBSCxLQUFBLEVBQUEsYUFBQSxFQUVsQyxZQUFNO1FBQ2xCLElBQU1xUCxLQUFLLEdBQUcsRUFBRSxDQUFBO0VBQ2hCLE1BQUEsSUFBSUMsYUFBYSxHQUFHdFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWdCLFdBQVcsQ0FBQTtRQUUxQyxJQUFJaFUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULElBQUlpVSxrQkFBa0IsR0FBRyxLQUFLLENBQUE7RUFDOUIsTUFBQSxJQUFJQyxnQkFBZ0IsR0FBR3RLLGNBQW9CLENBQ3pDQSxlQUFxQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLEVBQ3JDNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUNiLENBQUMsQ0FBQTtFQUVELE1BQUEsSUFBTXdXLFFBQVEsR0FBR2hILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ZLGNBQWMsR0FDdEMvQixjQUFvQixDQUNsQm5GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkJoSCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLEVBQ2pCMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQ2IsQ0FBQyxHQUNEd1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFBO0VBRXZCLE1BQUEsSUFBTUMsWUFBWSxHQUFHakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBYyxHQUMxQy9CLGNBQW9CLENBQ2xCbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUN2QmpILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakIyVCxLQUFBLENBQUtsUixLQUFLLENBQUMwQixnQkFDYixDQUFDLEdBQ0R3UCxLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLENBQUE7RUFFM0IsTUFBQSxPQUFPLElBQUksRUFBRTtFQUNYb0ksUUFBQUEsS0FBSyxDQUFDdFQsSUFBSSxlQUNSeUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeU0sSUFBSSxFQUFBO0VBQ0hGLFVBQUFBLGVBQWUsRUFBRWhOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRnQixtQkFBb0I7RUFDaEQ1QixVQUFBQSx3QkFBd0IsRUFBRTlOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dmLHdCQUF5QjtFQUM5REMsVUFBQUEsMEJBQTBCLEVBQUUvTixLQUFBLENBQUtsUixLQUFLLENBQUNpZiwwQkFBMkI7RUFDbEVwUyxVQUFBQSxHQUFHLEVBQUVKLENBQUU7RUFDUG5MLFVBQUFBLEdBQUcsRUFBRXFmLGdCQUFpQjtZQUN0Qm5jLEtBQUssRUFBRTZSLGlCQUFjLENBQUNuRixLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLENBQUU7WUFDdEMrYyxVQUFVLEVBQUVuTixLQUFBLENBQUtzTixjQUFlO0VBQ2hDckIsVUFBQUEsZUFBZSxFQUFFak0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWQsZUFBZ0I7WUFDNUNtQixlQUFlLEVBQUVwTixLQUFBLENBQUtpTyxtQkFBb0I7RUFDMUNaLFVBQUFBLFlBQVksRUFBRXJOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VlLFlBQWE7RUFDdENHLFVBQUFBLGdCQUFnQixFQUFFeE4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGUsZ0JBQWlCO0VBQzlDbmhCLFVBQUFBLE1BQU0sRUFBRTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU87RUFDMUJFLFVBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxVQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO0VBQzVCQyxVQUFBQSxZQUFZLEVBQUUrTCxLQUFBLENBQUtsUixLQUFLLENBQUNtRixZQUFhO0VBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRThMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29GLG9CQUFxQjtFQUN0REMsVUFBQUEsWUFBWSxFQUFFNkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcUYsWUFBYTtFQUN0Q0MsVUFBQUEsb0JBQW9CLEVBQUU0TCxLQUFBLENBQUtsUixLQUFLLENBQUNzRixvQkFBcUI7RUFDdEQrVyxVQUFBQSxNQUFNLEVBQUVuTCxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFPO0VBQzFCQyxVQUFBQSxvQkFBb0IsRUFBRXBMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NjLG9CQUFxQjtFQUN0RGpRLFVBQUFBLGNBQWMsRUFBRTZFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FNLGNBQWU7RUFDMUNvTSxVQUFBQSxRQUFRLEVBQUV2SCxLQUFBLENBQUtsUixLQUFLLENBQUN5WSxRQUFTO0VBQzlCUyxVQUFBQSxhQUFhLEVBQUVoSSxLQUFBLENBQUtsUixLQUFLLENBQUNrWixhQUFjO0VBQ3hDM1QsVUFBQUEsVUFBVSxFQUFFMkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdUYsVUFBVztFQUNsQzRTLFVBQUFBLFlBQVksRUFBRUEsWUFBYTtFQUMzQkQsVUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CWSxVQUFBQSxZQUFZLEVBQUU1SCxLQUFBLENBQUtsUixLQUFLLENBQUM4WSxZQUFhO0VBQ3RDQyxVQUFBQSxVQUFVLEVBQUU3SCxLQUFBLENBQUtsUixLQUFLLENBQUMrWSxVQUFXO0VBQ2xDQyxVQUFBQSxZQUFZLEVBQUU5SCxLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFhO0VBQ3RDQyxVQUFBQSwwQkFBMEIsRUFBRS9ILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2laLDBCQUEyQjtFQUNsRWxCLFVBQUFBLGVBQWUsRUFBRTdHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytYLGVBQWdCO0VBQzVDQyxVQUFBQSxhQUFhLEVBQUU5RyxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFjO0VBQ3hDMkQsVUFBQUEsY0FBYyxFQUFFekssS0FBQSxDQUFLbFIsS0FBSyxDQUFDNmdCLGVBQWdCO0VBQzNDekksVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBZTtFQUMxQ3RZLFVBQUFBLFNBQVMsRUFBRW9SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBVTtFQUNoQ0MsVUFBQUEsT0FBTyxFQUFFbVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFRO0VBQzVCOFosVUFBQUEsWUFBWSxFQUFFM0ksS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlosWUFBYTtFQUN0Q3JFLFVBQUFBLE9BQU8sRUFBRXRFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dWLE9BQVE7RUFDNUJpSixVQUFBQSxtQkFBbUIsRUFBRXZOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3llLG1CQUFvQjtFQUNwRDVHLFVBQUFBLDBCQUEwQixFQUFFM0csS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlgsMEJBQTJCO0VBQ2xFa0YsVUFBQUEsaUJBQWlCLEVBQUU3TCxLQUFBLENBQUtsUixLQUFLLENBQUMrYyxpQkFBa0I7RUFDaERyRixVQUFBQSxlQUFlLEVBQUV4RyxLQUFBLENBQUtsUixLQUFLLENBQUMwWCxlQUFnQjtFQUM1Q3VFLFVBQUFBLGNBQWMsRUFBRS9LLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2ljLGNBQWU7RUFDMUNNLFVBQUFBLFlBQVksRUFBRXJMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VjLFlBQWE7RUFDdEM3YSxVQUFBQSxnQkFBZ0IsRUFBRXdQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBCLGdCQUFpQjtFQUM5Q2diLFVBQUFBLDBCQUEwQixFQUFFeEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGMsMEJBQTJCO0VBQ2xFQyxVQUFBQSw0QkFBNEIsRUFBRXpMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJjLDRCQUFBQTtFQUE2QixTQUN2RSxDQUNILENBQUMsQ0FBQTtFQUVELFFBQUEsSUFBSStELGtCQUFrQixFQUFFLE1BQUE7RUFFeEJqVSxRQUFBQSxDQUFDLEVBQUUsQ0FBQTtVQUNIa1UsZ0JBQWdCLEdBQUd0SyxpQkFBYyxDQUFDc0ssZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0VBRXREO0VBQ0E7RUFDQSxRQUFBLElBQU1HLG1CQUFtQixHQUN2Qk4sYUFBYSxJQUFJL1QsQ0FBQyxJQUFJNFMsZ0NBQWdDLENBQUE7VUFDeEQsSUFBTTBCLHVCQUF1QixHQUMzQixDQUFDUCxhQUFhLElBQUksQ0FBQ3RQLEtBQUEsQ0FBSzhQLGFBQWEsQ0FBQ0wsZ0JBQWdCLENBQUMsQ0FBQTtVQUV6RCxJQUFJRyxtQkFBbUIsSUFBSUMsdUJBQXVCLEVBQUU7RUFDbEQsVUFBQSxJQUFJN1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWhCLGFBQWEsRUFBRTtFQUM1QlAsWUFBQUEsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO0VBQzNCLFdBQUMsTUFBTTtFQUNMLFlBQUEsTUFBQTtFQUNGLFdBQUE7RUFDRixTQUFBO0VBQ0YsT0FBQTtFQUVBLE1BQUEsT0FBT0gsS0FBSyxDQUFBO09BQ2IsQ0FBQSxDQUFBO0VBQUFsUCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsVUFBQ3dELENBQUMsRUFBRXJPLENBQUMsRUFBSztFQUN2QixNQUFBLElBQU02YSxTQUFTLEdBQUc3SyxpQkFBYyxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLENBQUE7UUFFbkQsSUFBSWdRLGVBQXFCLENBQUM2SyxTQUFTLEVBQUVoUSxLQUFBLENBQUtsUixLQUFLLENBQUMsRUFBRTtFQUNoRCxRQUFBLE9BQUE7RUFDRixPQUFBO1FBRUFrUixLQUFBLENBQUtzTixjQUFjLENBQUNuSSxlQUFxQixDQUFDNkssU0FBUyxDQUFDLEVBQUV4TSxDQUFDLENBQUMsQ0FBQTtPQUN6RCxDQUFBLENBQUE7RUFBQXJELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFDekIsTUFBQSxJQUFNNmEsU0FBUyxHQUFHN0ssaUJBQWMsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NCLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFBO1FBRW5ELElBQUlnUSxlQUFxQixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLEVBQUU7RUFDaEQsUUFBQSxPQUFBO0VBQ0YsT0FBQTtRQUVBa1IsS0FBQSxDQUFLaU8sbUJBQW1CLENBQUM5SSxlQUFxQixDQUFDNkssU0FBUyxDQUFDLENBQUMsQ0FBQTtPQUMzRCxDQUFBLENBQUE7RUFBQTdQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHVCQUFBLEVBRXVCLFVBQUNpUSxRQUFRLEVBQUV0a0IsT0FBTyxFQUFLO0VBQzdDLE1BQUEsSUFBSXFVLEtBQUEsQ0FBS29HLFVBQVUsQ0FBQ3phLE9BQU8sQ0FBQyxJQUFJcVUsS0FBQSxDQUFLNEksVUFBVSxDQUFDamQsT0FBTyxDQUFDLEVBQUUsT0FBQTtFQUMxRHFVLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLENBQUN2a0IsT0FBTyxDQUFDLENBQUE7RUFDbkNxVSxNQUFBQSxLQUFBLENBQUttUSxVQUFVLENBQUNGLFFBQVEsQ0FBQyxDQUFDak8sT0FBTyxJQUMvQmhDLEtBQUEsQ0FBS21RLFVBQVUsQ0FBQ0YsUUFBUSxDQUFDLENBQUNqTyxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtPQUM1QyxDQUFBLENBQUE7RUFBQXhMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFVBQUNULEtBQUssRUFBRWpNLEtBQUssRUFBSztFQUNqQyxNQUFBLElBQUFtVyxZQUFBLEdBUUl6SixLQUFBLENBQUtsUixLQUFLO1VBUFprWSxRQUFRLEdBQUF5QyxZQUFBLENBQVJ6QyxRQUFRO1VBQ1JDLFlBQVksR0FBQXdDLFlBQUEsQ0FBWnhDLFlBQVk7VUFDWk4sMEJBQTBCLEdBQUE4QyxZQUFBLENBQTFCOUMsMEJBQTBCO1VBQzFCbUksNEJBQTRCLEdBQUFyRixZQUFBLENBQTVCcUYsNEJBQTRCO1VBQzVCRCw2QkFBNkIsR0FBQXBGLFlBQUEsQ0FBN0JvRiw2QkFBNkI7VUFDN0JxQixlQUFlLEdBQUF6RyxZQUFBLENBQWZ5RyxlQUFlO1VBQ2ZFLG9CQUFvQixHQUFBM0csWUFBQSxDQUFwQjJHLG9CQUFvQixDQUFBO0VBRXRCLE1BQUEsSUFBTTlKLFFBQVEsR0FBRy9HLEtBQUssQ0FBQzVELEdBQUcsQ0FBQTtRQUMxQixJQUFJMkssUUFBUSxLQUFLLEtBQUssRUFBRTtFQUN0QjtVQUNBL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7RUFDeEIsT0FBQTtRQUNBLElBQUksQ0FBQ0ksMEJBQTBCLEVBQUU7RUFDL0IsUUFBQSxJQUFNMEosa0JBQWtCLEdBQUd6QixxQkFBcUIsQ0FDOUNDLDZCQUE2QixFQUM3QkMsNEJBQ0YsQ0FBQyxDQUFBO0VBQ0QsUUFBQSxJQUFNd0IsY0FBYyxHQUNsQjlCLGFBQWEsQ0FBQzZCLGtCQUFrQixDQUFDLENBQUMzQix3QkFBd0IsQ0FBQTtFQUM1RCxRQUFBLElBQU02QixVQUFVLEdBQUcvQixhQUFhLENBQUM2QixrQkFBa0IsQ0FBQyxDQUFDNUIsSUFBSSxDQUFBO0VBQ3pELFFBQUEsUUFBUW5JLFFBQVE7RUFDZCxVQUFBLEtBQUssT0FBTztFQUNWdEcsWUFBQUEsS0FBQSxDQUFLd1EsWUFBWSxDQUFDalIsS0FBSyxFQUFFak0sS0FBSyxDQUFDLENBQUE7Y0FDL0I0YyxlQUFlLENBQUNsSixRQUFRLENBQUMsQ0FBQTtFQUN6QixZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssWUFBWTtjQUNmaEgsS0FBQSxDQUFLeVEscUJBQXFCLENBQ3hCbmQsS0FBSyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUdBLEtBQUssR0FBR3FiLGtDQUFrQyxFQUM3RHhKLG1CQUFlLENBQUM4QixZQUFZLEVBQUUwSCxrQ0FBa0MsQ0FDbEUsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFdBQVc7Y0FDZDNPLEtBQUEsQ0FBS3lRLHFCQUFxQixDQUN4Qm5kLEtBQUssS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHQSxLQUFLLEdBQUdxYixrQ0FBa0MsRUFDN0R4SixtQkFBZSxDQUFDOEIsWUFBWSxFQUFFMEgsa0NBQWtDLENBQ2xFLENBQUMsQ0FBQTtFQUNELFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxTQUFTO0VBQ1ozTyxZQUFBQSxLQUFBLENBQUt5USxxQkFBcUI7RUFDeEI7Y0FDQUYsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDelUsUUFBUSxDQUFDeEksS0FBSyxDQUFDLEdBQ3pCQSxLQUFLLEdBQUcsRUFBRSxHQUFHZ2QsY0FBYyxHQUMzQmhkLEtBQUssR0FBR2dkLGNBQWMsRUFDMUJuTCxtQkFBZSxDQUFDOEIsWUFBWSxFQUFFcUosY0FBYyxDQUM5QyxDQUFDLENBQUE7RUFDRCxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssV0FBVztFQUNkdFEsWUFBQUEsS0FBQSxDQUFLeVEscUJBQXFCO0VBQ3hCO0VBQ0FGLFlBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDemlCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQ2dPLFFBQVEsQ0FBQ3hJLEtBQUssQ0FBQyxHQUM3Q0EsS0FBSyxHQUFHLEVBQUUsR0FBR2dkLGNBQWMsR0FDM0JoZCxLQUFLLEdBQUdnZCxjQUFjLEVBQzFCbkwsbUJBQWUsQ0FBQzhCLFlBQVksRUFBRXFKLGNBQWMsQ0FDOUMsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0osU0FBQTtFQUNGLE9BQUE7RUFFQUYsTUFBQUEsb0JBQW9CLElBQUlBLG9CQUFvQixDQUFDN1EsS0FBSyxDQUFDLENBQUE7T0FDcEQsQ0FBQSxDQUFBO0VBQUFZLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFVBQUN3RCxDQUFDLEVBQUVuTixDQUFDLEVBQUs7RUFDekIsTUFBQSxJQUFNMlosU0FBUyxHQUFHN0sscUJBQWdCLENBQUNuRixLQUFBLENBQUtsUixLQUFLLENBQUNzQixHQUFHLEVBQUVpRyxDQUFDLENBQUMsQ0FBQTtRQUVyRCxJQUFJOE8saUJBQXVCLENBQUM2SyxTQUFTLEVBQUVoUSxLQUFBLENBQUtsUixLQUFLLENBQUMsRUFBRTtFQUNsRCxRQUFBLE9BQUE7RUFDRixPQUFBO1FBRUFrUixLQUFBLENBQUtzTixjQUFjLENBQUNuSSxpQkFBdUIsQ0FBQzZLLFNBQVMsQ0FBQyxFQUFFeE0sQ0FBQyxDQUFDLENBQUE7T0FDM0QsQ0FBQSxDQUFBO0VBQUFyRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDM0osQ0FBQyxFQUFLO0VBQzNCLE1BQUEsSUFBTTJaLFNBQVMsR0FBRzdLLHFCQUFnQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc0IsR0FBRyxFQUFFaUcsQ0FBQyxDQUFDLENBQUE7UUFFckQsSUFBSThPLGlCQUF1QixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLEVBQUU7RUFDbEQsUUFBQSxPQUFBO0VBQ0YsT0FBQTtRQUVBa1IsS0FBQSxDQUFLaU8sbUJBQW1CLENBQUM5SSxpQkFBdUIsQ0FBQzZLLFNBQVMsQ0FBQyxDQUFDLENBQUE7T0FDN0QsQ0FBQSxDQUFBO0VBQUE3UCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSx5QkFBQSxFQUV5QixVQUFDMFEsVUFBVSxFQUFFL2tCLE9BQU8sRUFBSztFQUNqRCxNQUFBLElBQUlxVSxLQUFBLENBQUtvRyxVQUFVLENBQUN6YSxPQUFPLENBQUMsSUFBSXFVLEtBQUEsQ0FBSzRJLFVBQVUsQ0FBQ2pkLE9BQU8sQ0FBQyxFQUFFLE9BQUE7RUFDMURxVSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDdmtCLE9BQU8sQ0FBQyxDQUFBO1FBQ25DcVUsS0FBQSxDQUFLMlEsWUFBWSxDQUFDRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMxTyxPQUFPLElBQ3ZDaEMsS0FBQSxDQUFLMlEsWUFBWSxDQUFDRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMxTyxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtPQUNwRCxDQUFBLENBQUE7RUFBQXhMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRWtCLFVBQUNULEtBQUssRUFBRTdMLE9BQU8sRUFBSztFQUNyQyxNQUFBLElBQU00UyxRQUFRLEdBQUcvRyxLQUFLLENBQUM1RCxHQUFHLENBQUE7RUFDMUIsTUFBQSxJQUFJLENBQUNxRSxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsRUFBRTtFQUMxQyxRQUFBLFFBQVFMLFFBQVE7RUFDZCxVQUFBLEtBQUssT0FBTztFQUNWdEcsWUFBQUEsS0FBQSxDQUFLNFEsY0FBYyxDQUFDclIsS0FBSyxFQUFFN0wsT0FBTyxDQUFDLENBQUE7Y0FDbkNzTSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDbFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLENBQUE7RUFDL0MsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFlBQVk7Y0FDZmhILEtBQUEsQ0FBSzZRLHVCQUF1QixDQUMxQm5kLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxPQUFPLEdBQUcsQ0FBQyxFQUMvQnlSLHVCQUFpQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFLENBQUMsQ0FDOUMsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFdBQVc7Y0FDZGpILEtBQUEsQ0FBSzZRLHVCQUF1QixDQUMxQm5kLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxPQUFPLEdBQUcsQ0FBQyxFQUMvQnlSLHVCQUFpQixDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxFQUFFLENBQUMsQ0FDOUMsQ0FBQyxDQUFBO0VBQ0QsWUFBQSxNQUFBO0VBQ0osU0FBQTtFQUNGLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQTlHLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVvQixvQkFBQSxFQUFBLFVBQUM3SyxDQUFDLEVBQUs7RUFDMUIsTUFBQSxJQUFBNFUsYUFBQSxHQVdJL0osS0FBQSxDQUFLbFIsS0FBSztVQVZac0IsR0FBRyxHQUFBMlosYUFBQSxDQUFIM1osR0FBRztVQUNIeEIsU0FBUyxHQUFBbWIsYUFBQSxDQUFUbmIsU0FBUztVQUNUQyxPQUFPLEdBQUFrYixhQUFBLENBQVBsYixPQUFPO1VBQ1BtWSxRQUFRLEdBQUErQyxhQUFBLENBQVIvQyxRQUFRO1VBQ1J6YSxPQUFPLEdBQUF3ZCxhQUFBLENBQVB4ZCxPQUFPO1VBQ1B5SCxPQUFPLEdBQUErVixhQUFBLENBQVAvVixPQUFPO1VBQ1BpVCxZQUFZLEdBQUE4QyxhQUFBLENBQVo5QyxZQUFZO1VBQ1o2SixjQUFjLEdBQUEvRyxhQUFBLENBQWQrRyxjQUFjO1VBQ2Q3YyxZQUFZLEdBQUE4VixhQUFBLENBQVo5VixZQUFZO1VBQ1pFLFlBQVksR0FBQTRWLGFBQUEsQ0FBWjVWLFlBQVksQ0FBQTtFQUVkLE1BQUEsSUFBTTRjLGVBQWUsR0FBR0QsY0FBYyxHQUNsQ0EsY0FBYyxDQUFDM0wsaUJBQWMsQ0FBQy9VLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFDLEdBQ3RDcEIsU0FBUyxDQUFBO1FBQ2IsSUFBTWljLFNBQVMsR0FBRzdLLGlCQUFjLENBQUMvVSxHQUFHLEVBQUUrRSxDQUFDLENBQUMsQ0FBQTtRQUN4QyxPQUFPME4sU0FBSSxDQUNULDhCQUE4QixFQUFBLDBCQUFBLENBQUFyVSxNQUFBLENBQ0gyRyxDQUFDLENBQzVCNGIsRUFBQUEsZUFBZSxFQUNmO0VBQ0UsUUFBQSx3Q0FBd0MsRUFDdEMsQ0FBQ3hrQixPQUFPLElBQUl5SCxPQUFPLElBQUlDLFlBQVksSUFBSUUsWUFBWSxLQUNuRGdSLGVBQXFCLENBQUM2SyxTQUFTLEVBQUVoUSxLQUFBLENBQUtsUixLQUFLLENBQUM7VUFDOUMsd0NBQXdDLEVBQUVrUixLQUFBLENBQUs2RSxlQUFlLENBQzVEelUsR0FBRyxFQUNIK0UsQ0FBQyxFQUNENlIsUUFDRixDQUFDO0VBQ0QsUUFBQSxpREFBaUQsRUFDL0MsQ0FBQ2hILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEwQixJQUN0QzNHLEtBQUEsQ0FBSzZFLGVBQWUsQ0FBQ3pVLEdBQUcsRUFBRStFLENBQUMsRUFBRThSLFlBQVksQ0FBQztFQUM1QyxRQUFBLGtEQUFrRCxFQUNoRGpILEtBQUEsQ0FBS2tQLHVCQUF1QixDQUFDL1osQ0FBQyxDQUFDO0VBQ2pDLFFBQUEsd0NBQXdDLEVBQUVnUSxjQUFvQixDQUM1RHZXLFNBQVMsRUFDVEMsT0FBTyxFQUNQc0csQ0FBQyxFQUNEL0UsR0FDRixDQUFDO0VBQ0QsUUFBQSwyQ0FBMkMsRUFBRTRQLEtBQUEsQ0FBS2dSLGlCQUFpQixDQUFDN2IsQ0FBQyxDQUFDO0VBQ3RFLFFBQUEseUNBQXlDLEVBQUU2SyxLQUFBLENBQUtpUixlQUFlLENBQUM5YixDQUFDLENBQUM7RUFDbEUsUUFBQSxxREFBcUQsRUFDbkQ2SyxLQUFBLENBQUtrUiwwQkFBMEIsQ0FBQy9iLENBQUMsQ0FBQztFQUNwQyxRQUFBLG1EQUFtRCxFQUNqRDZLLEtBQUEsQ0FBS21SLHdCQUF3QixDQUFDaGMsQ0FBQyxDQUFDO0VBQ2xDLFFBQUEscUNBQXFDLEVBQUU2SyxLQUFBLENBQUtvUixjQUFjLENBQUNoaEIsR0FBRyxFQUFFK0UsQ0FBQyxDQUFBO0VBQ25FLE9BQ0YsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO0VBQUFnTCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFYSxhQUFBLEVBQUEsVUFBQzdLLENBQUMsRUFBSztRQUNuQixJQUFNa2MsZ0JBQWdCLEdBQUdsTSxpQkFBYyxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFDLENBQUE7RUFDaEUsTUFBQSxJQUFNdUQsUUFBUSxHQUNaLENBQUN4SyxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsSUFBSXhSLENBQUMsS0FBS2tjLGdCQUFnQixHQUM1RCxHQUFHLEdBQ0gsSUFBSSxDQUFBO0VBRVYsTUFBQSxPQUFPN0csUUFBUSxDQUFBO09BQ2hCLENBQUEsQ0FBQTtFQUFBckssSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW9CLG9CQUFBLEVBQUEsVUFBQzNKLENBQUMsRUFBSztRQUMxQixJQUFNaWIsa0JBQWtCLEdBQUduTSxxQkFBZ0IsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQyxDQUFBO0VBQ3BFLE1BQUEsSUFBTXVELFFBQVEsR0FDWixDQUFDeEssS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlgsMEJBQTBCLElBQUl0USxDQUFDLEtBQUtpYixrQkFBa0IsR0FDOUQsR0FBRyxHQUNILElBQUksQ0FBQTtFQUVWLE1BQUEsT0FBTzlHLFFBQVEsQ0FBQTtPQUNoQixDQUFBLENBQUE7RUFBQXJLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVjLGNBQUEsRUFBQSxVQUFDMU0sS0FBSyxFQUFLO0VBQ3hCLE1BQUEsSUFBQWllLGFBQUEsR0FJSXZSLEtBQUEsQ0FBS2xSLEtBQUs7VUFBQTBpQixxQkFBQSxHQUFBRCxhQUFBLENBSFp6RCx3QkFBd0I7RUFBeEJBLFFBQUFBLHdCQUF3QixHQUFBMEQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxRQUFRLEdBQUFBLHFCQUFBO1VBQUFDLHFCQUFBLEdBQUFGLGFBQUEsQ0FDbkN4RCwwQkFBMEI7RUFBMUJBLFFBQUFBLDBCQUEwQixHQUFBMEQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxlQUFlLEdBQUFBLHFCQUFBO1VBQzVDcmhCLEdBQUcsR0FBQW1oQixhQUFBLENBQUhuaEIsR0FBRyxDQUFBO1FBR0wsSUFBTTRmLFNBQVMsR0FBRzdLLGlCQUFjLENBQUMvVSxHQUFHLEVBQUVrRCxLQUFLLENBQUMsQ0FBQTtFQUM1QyxNQUFBLElBQU13VyxNQUFNLEdBQ1Y5SixLQUFBLENBQUtvRyxVQUFVLENBQUM0SixTQUFTLENBQUMsSUFBSWhRLEtBQUEsQ0FBSzRJLFVBQVUsQ0FBQ29ILFNBQVMsQ0FBQyxHQUNwRGpDLDBCQUEwQixHQUMxQkQsd0JBQXdCLENBQUE7RUFFOUIsTUFBQSxPQUFBLEVBQUEsQ0FBQXRmLE1BQUEsQ0FBVXNiLE1BQU0sRUFBQSxHQUFBLENBQUEsQ0FBQXRiLE1BQUEsQ0FBSTJXLFVBQWdCLENBQUM2SyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUEsQ0FBQTtPQUM3RCxDQUFBLENBQUE7RUFBQTdQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVzQixzQkFBQSxFQUFBLFVBQUMzSixDQUFDLEVBQUs7RUFDNUIsTUFBQSxJQUFBcWIsYUFBQSxHQVNJMVIsS0FBQSxDQUFLbFIsS0FBSztVQVJac0IsR0FBRyxHQUFBc2hCLGFBQUEsQ0FBSHRoQixHQUFHO1VBQ0h4QixTQUFTLEdBQUE4aUIsYUFBQSxDQUFUOWlCLFNBQVM7VUFDVEMsT0FBTyxHQUFBNmlCLGFBQUEsQ0FBUDdpQixPQUFPO1VBQ1BtWSxRQUFRLEdBQUEwSyxhQUFBLENBQVIxSyxRQUFRO1VBQ1J6YSxPQUFPLEdBQUFtbEIsYUFBQSxDQUFQbmxCLE9BQU87VUFDUHlILE9BQU8sR0FBQTBkLGFBQUEsQ0FBUDFkLE9BQU87VUFDUGlULFlBQVksR0FBQXlLLGFBQUEsQ0FBWnpLLFlBQVk7VUFDWk4sMEJBQTBCLEdBQUErSyxhQUFBLENBQTFCL0ssMEJBQTBCLENBQUE7RUFFNUIsTUFBQSxPQUFPOUQsU0FBSSxDQUNULGdDQUFnQywrQkFBQXJVLE1BQUEsQ0FDSDZILENBQUMsQ0FDOUIsRUFBQTtVQUNFLDBDQUEwQyxFQUN4QyxDQUFDOUosT0FBTyxJQUFJeUgsT0FBTyxLQUNuQm1SLGlCQUF1QixDQUFDQSxxQkFBZ0IsQ0FBQy9VLEdBQUcsRUFBRWlHLENBQUMsQ0FBQyxFQUFFMkosS0FBQSxDQUFLbFIsS0FBSyxDQUFDO1VBQy9ELDBDQUEwQyxFQUFFa1IsS0FBQSxDQUFLMlIsaUJBQWlCLENBQ2hFdmhCLEdBQUcsRUFDSGlHLENBQUMsRUFDRDJRLFFBQ0YsQ0FBQztFQUNELFFBQUEsbURBQW1ELEVBQ2pELENBQUNMLDBCQUEwQixJQUMzQjNHLEtBQUEsQ0FBSzJSLGlCQUFpQixDQUFDdmhCLEdBQUcsRUFBRWlHLENBQUMsRUFBRTRRLFlBQVksQ0FBQztFQUM5QyxRQUFBLG9EQUFvRCxFQUNsRGpILEtBQUEsQ0FBSzRSLHlCQUF5QixDQUFDdmIsQ0FBQyxDQUFDO0VBQ25DLFFBQUEsMENBQTBDLEVBQUU4TyxnQkFBc0IsQ0FDaEV2VyxTQUFTLEVBQ1RDLE9BQU8sRUFDUHdILENBQUMsRUFDRGpHLEdBQ0YsQ0FBQztFQUNELFFBQUEsNkNBQTZDLEVBQzNDNFAsS0FBQSxDQUFLNlIsbUJBQW1CLENBQUN4YixDQUFDLENBQUM7RUFDN0IsUUFBQSwyQ0FBMkMsRUFBRTJKLEtBQUEsQ0FBSzhSLGlCQUFpQixDQUFDemIsQ0FBQyxDQUFBO0VBQ3ZFLE9BQ0YsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO0VBQUE4SixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDN0ssQ0FBQyxFQUFLO0VBQ3ZCLE1BQUEsSUFBQTRjLGFBQUEsR0FDRS9SLEtBQUEsQ0FBS2xSLEtBQUs7VUFESmtqQix1QkFBdUIsR0FBQUQsYUFBQSxDQUF2QkMsdUJBQXVCO1VBQUVDLGtCQUFrQixHQUFBRixhQUFBLENBQWxCRSxrQkFBa0I7VUFBRTVsQixNQUFNLEdBQUEwbEIsYUFBQSxDQUFOMWxCLE1BQU07VUFBRStELEdBQUcsR0FBQTJoQixhQUFBLENBQUgzaEIsR0FBRyxDQUFBO1FBRWhFLElBQU04aEIsY0FBYyxHQUFHL00scUJBQTJCLENBQUNoUSxDQUFDLEVBQUU5SSxNQUFNLENBQUMsQ0FBQTtRQUM3RCxJQUFNOGxCLGFBQWEsR0FBR2hOLGdCQUFzQixDQUFDaFEsQ0FBQyxFQUFFOUksTUFBTSxDQUFDLENBQUE7RUFDdkQsTUFBQSxJQUFJNGxCLGtCQUFrQixFQUFFO1VBQ3RCLE9BQU9BLGtCQUFrQixDQUFDOWMsQ0FBQyxFQUFFK2MsY0FBYyxFQUFFQyxhQUFhLEVBQUUvaEIsR0FBRyxDQUFDLENBQUE7RUFDbEUsT0FBQTtFQUNBLE1BQUEsT0FBTzRoQix1QkFBdUIsR0FBR0csYUFBYSxHQUFHRCxjQUFjLENBQUE7T0FDaEUsQ0FBQSxDQUFBO0VBQUEvUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFbUIsbUJBQUEsRUFBQSxVQUFDM0osQ0FBQyxFQUFLO0VBQ3pCLE1BQUEsSUFBQStiLGFBQUEsR0FBeUNwUyxLQUFBLENBQUtsUixLQUFLO1VBQTNDdWpCLG9CQUFvQixHQUFBRCxhQUFBLENBQXBCQyxvQkFBb0I7VUFBRWhtQixNQUFNLEdBQUErbEIsYUFBQSxDQUFOL2xCLE1BQU0sQ0FBQTtRQUNwQyxJQUFNaW1CLFlBQVksR0FBR25OLHVCQUE2QixDQUFDOU8sQ0FBQyxFQUFFaEssTUFBTSxDQUFDLENBQUE7UUFDN0QsT0FBT2dtQixvQkFBb0IsR0FDdkJBLG9CQUFvQixDQUFDaGMsQ0FBQyxFQUFFaWMsWUFBWSxDQUFDLEdBQ3JDQSxZQUFZLENBQUE7T0FDakIsQ0FBQSxDQUFBO01BQUFuUyxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBTTtFQUNuQixNQUFBLElBQUF1UyxhQUFBLEdBS0l2UyxLQUFBLENBQUtsUixLQUFLO1VBSlpnZ0IsNEJBQTRCLEdBQUF5RCxhQUFBLENBQTVCekQsNEJBQTRCO1VBQzVCRCw2QkFBNkIsR0FBQTBELGFBQUEsQ0FBN0IxRCw2QkFBNkI7VUFDN0J6ZSxHQUFHLEdBQUFtaUIsYUFBQSxDQUFIbmlCLEdBQUc7VUFDSDRXLFFBQVEsR0FBQXVMLGFBQUEsQ0FBUnZMLFFBQVEsQ0FBQTtFQUdWLE1BQUEsSUFBTXdMLFlBQVksR0FDaEJoRSxhQUFhLENBQ1hJLHFCQUFxQixDQUNuQkMsNkJBQTZCLEVBQzdCQyw0QkFDRixDQUFDLENBQ0YsQ0FBQ0wsSUFBSSxDQUFBO0VBQ1IsTUFBQSxPQUFPK0QsWUFBWSxDQUFDamxCLEdBQUcsQ0FBQyxVQUFDK0YsS0FBSyxFQUFFaUksQ0FBQyxFQUFBO1VBQUEsb0JBQy9CaUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsVUFBQUEsU0FBUyxFQUFDLGlDQUFpQztFQUFDVCxVQUFBQSxHQUFHLEVBQUVKLENBQUFBO0VBQUUsU0FBQSxFQUNyRGpJLEtBQUssQ0FBQy9GLEdBQUcsQ0FBQyxVQUFDNEgsQ0FBQyxFQUFFc2QsQ0FBQyxFQUFBO1lBQUEsb0JBQ2RqUyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VxQyxZQUFBQSxHQUFHLEVBQUU5QyxLQUFBLENBQUttUSxVQUFVLENBQUNoYixDQUFDLENBQUU7RUFDeEJ3RyxZQUFBQSxHQUFHLEVBQUU4VyxDQUFFO0VBQ1AvUixZQUFBQSxPQUFPLEVBQUUsU0FBQUEsT0FBQ2dTLENBQUFBLEVBQUUsRUFBSztFQUNmMVMsY0FBQUEsS0FBQSxDQUFLd1EsWUFBWSxDQUFDa0MsRUFBRSxFQUFFdmQsQ0FBQyxDQUFDLENBQUE7ZUFDeEI7RUFDRjRXLFlBQUFBLFNBQVMsRUFBRSxTQUFBQSxTQUFDMkcsQ0FBQUEsRUFBRSxFQUFLO0VBQ2pCLGNBQUEsSUFBSXZOLGNBQW9CLENBQUN1TixFQUFFLENBQUMsRUFBRTtrQkFDNUJBLEVBQUUsQ0FBQ25NLGNBQWMsRUFBRSxDQUFBO2tCQUNuQm1NLEVBQUUsQ0FBQy9XLEdBQUcsR0FBRyxPQUFPLENBQUE7RUFDbEIsZUFBQTtFQUVBcUUsY0FBQUEsS0FBQSxDQUFLMlMsY0FBYyxDQUFDRCxFQUFFLEVBQUV2ZCxDQUFDLENBQUMsQ0FBQTtlQUMxQjtFQUNGa1IsWUFBQUEsWUFBWSxFQUNWLENBQUNyRyxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFlLEdBQ3ZCLFlBQUE7RUFBQSxjQUFBLE9BQU1qTSxLQUFBLENBQUs0UyxpQkFBaUIsQ0FBQ3pkLENBQUMsQ0FBQyxDQUFBO0VBQUEsYUFBQSxHQUMvQnBCLFNBQ0w7RUFDRG9ZLFlBQUFBLGNBQWMsRUFDWm5NLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21kLGVBQWUsR0FDdEIsWUFBQTtFQUFBLGNBQUEsT0FBTWpNLEtBQUEsQ0FBSzRTLGlCQUFpQixDQUFDemQsQ0FBQyxDQUFDLENBQUE7RUFBQSxhQUFBLEdBQy9CcEIsU0FDTDtFQUNEeVcsWUFBQUEsUUFBUSxFQUFFeEssS0FBQSxDQUFLOEssV0FBVyxDQUFDM1YsQ0FBQyxDQUFFO0VBQzlCaUgsWUFBQUEsU0FBUyxFQUFFNEQsS0FBQSxDQUFLNlMsa0JBQWtCLENBQUMxZCxDQUFDLENBQUU7RUFDdENrWCxZQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiLFlBQUEsWUFBQSxFQUFZck0sS0FBQSxDQUFLb00sWUFBWSxDQUFDalgsQ0FBQyxDQUFFO2NBQ2pDLGNBQWM2SyxFQUFBQSxLQUFBLENBQUtvUixjQUFjLENBQUNoaEIsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHcEIsU0FBVTtjQUMvRCxlQUFlaU0sRUFBQUEsS0FBQSxDQUFLNkUsZUFBZSxDQUFDelUsR0FBRyxFQUFFK0UsQ0FBQyxFQUFFNlIsUUFBUSxDQUFBO0VBQUUsV0FBQSxFQUVyRGhILEtBQUEsQ0FBSzhTLGVBQWUsQ0FBQzNkLENBQUMsQ0FDcEIsQ0FBQyxDQUFBO0VBQUEsU0FDUCxDQUNFLENBQUMsQ0FBQTtFQUFBLE9BQ1AsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO01BQUFnTCxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixZQUFNO0VBQ3JCLE1BQUEsSUFBQStTLGFBQUEsR0FBMEIvUyxLQUFBLENBQUtsUixLQUFLO1VBQTVCc0IsR0FBRyxHQUFBMmlCLGFBQUEsQ0FBSDNpQixHQUFHO1VBQUU0VyxRQUFRLEdBQUErTCxhQUFBLENBQVIvTCxRQUFRLENBQUE7UUFDckIsSUFBTWdNLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzdCLG9CQUNFeFMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLG1DQUFBO0VBQW1DLE9BQUEsRUFDL0M0VyxRQUFRLENBQUN6bEIsR0FBRyxDQUFDLFVBQUM4SSxDQUFDLEVBQUVvYyxDQUFDLEVBQUE7VUFBQSxvQkFDakJqUyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0U5RSxVQUFBQSxHQUFHLEVBQUU4VyxDQUFFO0VBQ1AzUCxVQUFBQSxHQUFHLEVBQUU5QyxLQUFBLENBQUsyUSxZQUFZLENBQUM4QixDQUFDLENBQUU7RUFDMUJwRyxVQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiM0wsVUFBQUEsT0FBTyxFQUFFLFNBQUFBLE9BQUNnUyxDQUFBQSxFQUFFLEVBQUs7RUFDZjFTLFlBQUFBLEtBQUEsQ0FBSzRRLGNBQWMsQ0FBQzhCLEVBQUUsRUFBRXJjLENBQUMsQ0FBQyxDQUFBO2FBQzFCO0VBQ0YwVixVQUFBQSxTQUFTLEVBQUUsU0FBQUEsU0FBQzJHLENBQUFBLEVBQUUsRUFBSztFQUNqQjFTLFlBQUFBLEtBQUEsQ0FBS2lULGdCQUFnQixDQUFDUCxFQUFFLEVBQUVyYyxDQUFDLENBQUMsQ0FBQTthQUM1QjtFQUNGZ1EsVUFBQUEsWUFBWSxFQUNWLENBQUNyRyxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFlLEdBQ3ZCLFlBQUE7RUFBQSxZQUFBLE9BQU1qTSxLQUFBLENBQUtrVCxtQkFBbUIsQ0FBQzdjLENBQUMsQ0FBQyxDQUFBO0VBQUEsV0FBQSxHQUNqQ3RDLFNBQ0w7RUFDRG9ZLFVBQUFBLGNBQWMsRUFDWm5NLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21kLGVBQWUsR0FDdEIsWUFBQTtFQUFBLFlBQUEsT0FBTWpNLEtBQUEsQ0FBS2tULG1CQUFtQixDQUFDN2MsQ0FBQyxDQUFDLENBQUE7RUFBQSxXQUFBLEdBQ2pDdEMsU0FDTDtFQUNEcUksVUFBQUEsU0FBUyxFQUFFNEQsS0FBQSxDQUFLbVQsb0JBQW9CLENBQUM5YyxDQUFDLENBQUU7WUFDeEMsZUFBZTJKLEVBQUFBLEtBQUEsQ0FBSzJSLGlCQUFpQixDQUFDdmhCLEdBQUcsRUFBRWlHLENBQUMsRUFBRTJRLFFBQVEsQ0FBRTtFQUN4RHdELFVBQUFBLFFBQVEsRUFBRXhLLEtBQUEsQ0FBS29ULGtCQUFrQixDQUFDL2MsQ0FBQyxDQUFFO1lBQ3JDLGNBQWMySixFQUFBQSxLQUFBLENBQUtxVCxnQkFBZ0IsQ0FBQ2pqQixHQUFHLEVBQUVpRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUd0QyxTQUFBQTtFQUFVLFNBQUEsRUFFaEVpTSxLQUFBLENBQUtzVCxpQkFBaUIsQ0FBQ2pkLENBQUMsQ0FDdEIsQ0FBQyxDQUFBO0VBQUEsT0FDUCxDQUNFLENBQUMsQ0FBQTtPQUVULENBQUEsQ0FBQTtNQUFBOEosZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFlBQU07RUFDcEIsTUFBQSxJQUFBdVQsYUFBQSxHQU9JdlQsS0FBQSxDQUFLbFIsS0FBSztVQU5aa1osYUFBYSxHQUFBdUwsYUFBQSxDQUFidkwsYUFBYTtVQUNiSixZQUFZLEdBQUEyTCxhQUFBLENBQVozTCxZQUFZO1VBQ1pDLFVBQVUsR0FBQTBMLGFBQUEsQ0FBVjFMLFVBQVU7VUFDVjJMLG1CQUFtQixHQUFBRCxhQUFBLENBQW5CQyxtQkFBbUI7VUFDbkJDLHFCQUFxQixHQUFBRixhQUFBLENBQXJCRSxxQkFBcUI7VUFDckJ2TSxjQUFjLEdBQUFxTSxhQUFBLENBQWRyTSxjQUFjLENBQUE7UUFHaEIsT0FBT3JFLFNBQUksQ0FDVCx5QkFBeUIsRUFDekI7RUFDRSxRQUFBLDBDQUEwQyxFQUN4Q21GLGFBQWEsS0FBS0osWUFBWSxJQUFJQyxVQUFVLENBQUE7RUFDaEQsT0FBQyxFQUNEO0VBQUUsUUFBQSwrQkFBK0IsRUFBRTJMLG1CQUFBQTtFQUFvQixPQUFDLEVBQ3hEO0VBQUUsUUFBQSxpQ0FBaUMsRUFBRUMscUJBQUFBO0VBQXNCLE9BQUMsRUFDNUQ7RUFBRSxRQUFBLDhCQUE4QixFQUFFdk0sY0FBQUE7RUFBZSxPQUNuRCxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUFsSCxLQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE0QixTQUFBLENBQUFtTixLQUFBLEVBQUFoUCxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBa04sS0FBQSxFQUFBLENBQUE7TUFBQXBULEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQUErUSxhQUFBLEdBS0ksSUFBSSxDQUFDNWtCLEtBQUs7VUFKWjBrQixtQkFBbUIsR0FBQUUsYUFBQSxDQUFuQkYsbUJBQW1CO1VBQ25CQyxxQkFBcUIsR0FBQUMsYUFBQSxDQUFyQkQscUJBQXFCO1VBQ3JCcmpCLEdBQUcsR0FBQXNqQixhQUFBLENBQUh0akIsR0FBRztVQUFBdWpCLHFCQUFBLEdBQUFELGFBQUEsQ0FDSDFHLGVBQWU7RUFBZkEsUUFBQUEsZUFBZSxHQUFBMkcscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxRQUFRLEdBQUFBLHFCQUFBLENBQUE7RUFHNUIsTUFBQSxJQUFNQyx3QkFBd0IsR0FBRzVHLGVBQWUsR0FDNUNBLGVBQWUsQ0FBQzZHLElBQUksRUFBRSxHQUFHLEdBQUcsR0FDNUIsRUFBRSxDQUFBO1FBRU4sb0JBQ0VyVCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDMFAsYUFBYSxFQUFHO0VBQ2hDbUQsUUFBQUEsWUFBWSxFQUNWLENBQUMsSUFBSSxDQUFDbmdCLEtBQUssQ0FBQ21kLGVBQWUsR0FBRyxJQUFJLENBQUM2SCxnQkFBZ0IsR0FBRy9mLFNBQ3ZEO1VBQ0RnZ0IsY0FBYyxFQUNaLElBQUksQ0FBQ2psQixLQUFLLENBQUNtZCxlQUFlLEdBQUcsSUFBSSxDQUFDNkgsZ0JBQWdCLEdBQUcvZixTQUN0RDtFQUNELFFBQUEsWUFBQSxFQUFBLEVBQUEsQ0FBQXZGLE1BQUEsQ0FBZW9sQix3QkFBd0IsQ0FBQSxDQUFBcGxCLE1BQUEsQ0FBRzJXLFVBQWdCLENBQUMvVSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUc7RUFDaEZpYyxRQUFBQSxJQUFJLEVBQUMsU0FBQTtTQUVKbUgsRUFBQUEsbUJBQW1CLEdBQ2hCLElBQUksQ0FBQ1EsWUFBWSxFQUFFLEdBQ25CUCxxQkFBcUIsR0FDbkIsSUFBSSxDQUFDUSxjQUFjLEVBQUUsR0FDckIsSUFBSSxDQUFDQyxXQUFXLEVBQ25CLENBQUMsQ0FBQTtFQUVWLEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0FweEJnQzFULENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDdkNaLElBRWpCbVIsSUFBSSwwQkFBQXBVLGdCQUFBLEVBQUE7RUFBQSxFQUFBLFNBQUFvVSxJQUFBLEdBQUE7RUFBQSxJQUFBLElBQUFuVSxLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBa1UsSUFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLEtBQUEsSUFBQS9RLElBQUEsR0FBQXRQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXVWLElBQUEsR0FBQXhXLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBeFAsR0FBQUEsU0FBQSxDQUFBd1AsSUFBQSxDQUFBLENBQUE7RUFBQSxLQUFBO0VBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFpVSxJQUFBLEVBQUEzbEIsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBNlUsSUFBQSxDQUFBLENBQUEsQ0FBQTtNQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBd0NmLE9BQUEsRUFBQTtFQUNOb1UsTUFBQUEsTUFBTSxFQUFFLElBQUE7T0FDVCxDQUFBLENBQUE7TUFBQWpVLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHlCQUFBLEVBWXlCLFlBQU07RUFDOUJxVSxNQUFBQSxxQkFBcUIsQ0FBQyxZQUFNO0VBQzFCLFFBQUEsSUFBSSxDQUFDclUsS0FBQSxDQUFLTCxJQUFJLEVBQUUsT0FBQTtFQUVoQkssUUFBQUEsS0FBQSxDQUFLTCxJQUFJLENBQUM0QyxTQUFTLEdBQ2pCdkMsS0FBQSxDQUFLc1UsUUFBUSxJQUNiSCxJQUFJLENBQUNJLGtCQUFrQixDQUNyQnZVLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBsQixRQUFRLEdBQ2Z4VSxLQUFBLENBQUtsUixLQUFLLENBQUMwbEIsUUFBUSxDQUFDL1IsWUFBWSxHQUFHekMsS0FBQSxDQUFLeVUsTUFBTSxDQUFDaFMsWUFBWSxHQUMzRHpDLEtBQUEsQ0FBS0wsSUFBSSxDQUFDOEMsWUFBWSxFQUMxQnpDLEtBQUEsQ0FBS3NVLFFBQ1AsQ0FBQyxDQUFBO0VBQ0wsT0FBQyxDQUFDLENBQUE7T0FDSCxDQUFBLENBQUE7RUFBQW5VLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVhLGFBQUEsRUFBQSxVQUFDcEosSUFBSSxFQUFLO1FBQ3RCLElBQ0csQ0FBQ29KLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJJLE9BQU8sSUFBSXVJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRJLE9BQU8sS0FDeENILHFCQUFxQixDQUFDWCxJQUFJLEVBQUVvSixLQUFBLENBQUtsUixLQUFLLENBQUMsSUFDeEMsQ0FBQ2tSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NJLFlBQVksSUFDdkI0SSxLQUFBLENBQUtsUixLQUFLLENBQUN1SSxZQUFZLElBQ3ZCMkksS0FBQSxDQUFLbFIsS0FBSyxDQUFDd0ksVUFBVSxLQUNyQkosY0FBYyxDQUFDTixJQUFJLEVBQUVvSixLQUFBLENBQUtsUixLQUFLLENBQUUsRUFDbkM7RUFDQSxRQUFBLE9BQUE7RUFDRixPQUFBO0VBQ0FrUixNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUMvSixJQUFJLENBQUMsQ0FBQTtPQUMxQixDQUFBLENBQUE7RUFBQXVKLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUNwSixJQUFJLEVBQUE7RUFBQSxNQUFBLE9BQ3BCb0osS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxJQUFJbkksWUFBWSxDQUFDbUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxFQUFFcFEsSUFBSSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBdUosSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRS9DLGdCQUFBLEVBQUEsVUFBQ3BKLElBQUksRUFBQTtRQUFBLE9BQ25CLENBQUNvSixLQUFBLENBQUtsUixLQUFLLENBQUMySSxPQUFPLElBQUl1SSxLQUFBLENBQUtsUixLQUFLLENBQUM0SSxPQUFPLEtBQ3hDSCxxQkFBcUIsQ0FBQ1gsSUFBSSxFQUFFb0osS0FBQSxDQUFLbFIsS0FBSyxDQUFDLElBQ3hDLENBQUNrUixLQUFBLENBQUtsUixLQUFLLENBQUNzSSxZQUFZLElBQ3ZCNEksS0FBQSxDQUFLbFIsS0FBSyxDQUFDdUksWUFBWSxJQUN2QjJJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dJLFVBQVUsS0FDckJKLGNBQWMsQ0FBQ04sSUFBSSxFQUFFb0osS0FBQSxDQUFLbFIsS0FBSyxDQUFFLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBcVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXpCLFdBQUEsRUFBQSxVQUFDcEosSUFBSSxFQUFLO1FBQ3BCLElBQUk4ZCxPQUFPLEdBQUcsQ0FDWixrQ0FBa0MsRUFDbEMxVSxLQUFBLENBQUtsUixLQUFLLENBQUM2bEIsYUFBYSxHQUFHM1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNmxCLGFBQWEsQ0FBQy9kLElBQUksQ0FBQyxHQUFHN0MsU0FBUyxDQUN0RSxDQUFBO0VBRUQsTUFBQSxJQUFJaU0sS0FBQSxDQUFLNFUsY0FBYyxDQUFDaGUsSUFBSSxDQUFDLEVBQUU7RUFDN0I4ZCxRQUFBQSxPQUFPLENBQUMzWSxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQTtFQUM1RCxPQUFBO0VBRUEsTUFBQSxJQUFJaUUsS0FBQSxDQUFLNlUsY0FBYyxDQUFDamUsSUFBSSxDQUFDLEVBQUU7RUFDN0I4ZCxRQUFBQSxPQUFPLENBQUMzWSxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQTtFQUM1RCxPQUFBOztFQUVBO0VBQ0EsTUFBQSxJQUNFaUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ21CLFdBQVcsSUFDdEIsQ0FBQy9kLGlCQUFRLENBQUNILElBQUksQ0FBQyxHQUFHLElBQUksR0FBR0kscUJBQVUsQ0FBQ0osSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHSyxrQkFBVSxDQUFDTCxJQUFJLENBQUMsS0FDOURvSixLQUFBLENBQUtsUixLQUFLLENBQUN5TyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQzNCLENBQUMsRUFDSDtFQUNBbVgsUUFBQUEsT0FBTyxDQUFDM1ksSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUE7RUFDNUQsT0FBQTtFQUVBLE1BQUEsT0FBTzJZLE9BQU8sQ0FBQzdtQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7T0FDekIsQ0FBQSxDQUFBO0VBQUFzUyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxpQkFBQSxFQUVpQixVQUFDVCxLQUFLLEVBQUUzSSxJQUFJLEVBQUs7RUFDakMsTUFBQSxJQUFJMkksS0FBSyxDQUFDNUQsR0FBRyxLQUFLLEdBQUcsRUFBRTtVQUNyQjRELEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO1VBQ3RCaEgsS0FBSyxDQUFDNUQsR0FBRyxHQUFHLE9BQU8sQ0FBQTtFQUNyQixPQUFBO0VBRUEsTUFBQSxJQUNFLENBQUM0RCxLQUFLLENBQUM1RCxHQUFHLEtBQUssU0FBUyxJQUFJNEQsS0FBSyxDQUFDNUQsR0FBRyxLQUFLLFdBQVcsS0FDckQ0RCxLQUFLLENBQUNrRSxNQUFNLENBQUNzUixlQUFlLEVBQzVCO1VBQ0F4VixLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtFQUN0QmhILFFBQUFBLEtBQUssQ0FBQ2tFLE1BQU0sQ0FBQ3NSLGVBQWUsQ0FBQ3BKLEtBQUssRUFBRSxDQUFBO0VBQ3RDLE9BQUE7RUFDQSxNQUFBLElBQ0UsQ0FBQ3BNLEtBQUssQ0FBQzVELEdBQUcsS0FBSyxXQUFXLElBQUk0RCxLQUFLLENBQUM1RCxHQUFHLEtBQUssWUFBWSxLQUN4RDRELEtBQUssQ0FBQ2tFLE1BQU0sQ0FBQ3VSLFdBQVcsRUFDeEI7VUFDQXpWLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO0VBQ3RCaEgsUUFBQUEsS0FBSyxDQUFDa0UsTUFBTSxDQUFDdVIsV0FBVyxDQUFDckosS0FBSyxFQUFFLENBQUE7RUFDbEMsT0FBQTtFQUVBLE1BQUEsSUFBSXBNLEtBQUssQ0FBQzVELEdBQUcsS0FBSyxPQUFPLEVBQUU7RUFDekJxRSxRQUFBQSxLQUFBLENBQUtnTSxXQUFXLENBQUNwVixJQUFJLENBQUMsQ0FBQTtFQUN4QixPQUFBO0VBQ0FvSixNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUMwWCxlQUFlLENBQUNqSCxLQUFLLENBQUMsQ0FBQTtPQUNsQyxDQUFBLENBQUE7TUFBQVksZUFBQSxDQUFBSCxLQUFBLEVBQUEsYUFBQSxFQUVhLFlBQU07UUFDbEIsSUFBSW5KLEtBQUssR0FBRyxFQUFFLENBQUE7RUFDZCxNQUFBLElBQU16SSxNQUFNLEdBQUc0UixLQUFBLENBQUtsUixLQUFLLENBQUNWLE1BQU0sR0FBRzRSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ1YsTUFBTSxHQUFHLEdBQUcsQ0FBQTtFQUMxRCxNQUFBLElBQU1tUCxTQUFTLEdBQUd5QyxLQUFBLENBQUtsUixLQUFLLENBQUN5TyxTQUFTLENBQUE7RUFFdEMsTUFBQSxJQUFNMFgsVUFBVSxHQUNkalYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxJQUFJaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb21CLFVBQVUsSUFBSXZwQixPQUFPLEVBQUUsQ0FBQTtFQUUzRCxNQUFBLElBQU13cEIsSUFBSSxHQUFHOWtCLGFBQWEsQ0FBQzRrQixVQUFVLENBQUMsQ0FBQTtRQUN0QyxJQUFNRyxpQkFBaUIsR0FDckJwVixLQUFBLENBQUtsUixLQUFLLENBQUNnbUIsV0FBVyxJQUN0QjlVLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dtQixXQUFXLENBQUNPLElBQUksQ0FBQyxVQUFVQyxDQUFDLEVBQUVDLENBQUMsRUFBRTtVQUMxQyxPQUFPRCxDQUFDLEdBQUdDLENBQUMsQ0FBQTtFQUNkLE9BQUMsQ0FBQyxDQUFBO0VBRUosTUFBQSxJQUFNQyxZQUFZLEdBQUcsRUFBRSxHQUFHclgsYUFBYSxDQUFDOFcsVUFBVSxDQUFDLENBQUE7RUFDbkQsTUFBQSxJQUFNUSxVQUFVLEdBQUdELFlBQVksR0FBR2pZLFNBQVMsQ0FBQTtRQUUzQyxLQUFLLElBQUloQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdrYSxVQUFVLEVBQUVsYSxDQUFDLEVBQUUsRUFBRTtVQUNuQyxJQUFNOEIsV0FBVyxHQUFHTyxxQkFBVSxDQUFDdVgsSUFBSSxFQUFFNVosQ0FBQyxHQUFHZ0MsU0FBUyxDQUFDLENBQUE7RUFDbkQxRyxRQUFBQSxLQUFLLENBQUNrRixJQUFJLENBQUNzQixXQUFXLENBQUMsQ0FBQTtFQUV2QixRQUFBLElBQUkrWCxpQkFBaUIsRUFBRTtFQUNyQixVQUFBLElBQU1NLGFBQWEsR0FBR3RZLGtCQUFrQixDQUN0QytYLElBQUksRUFDSjlYLFdBQVcsRUFDWDlCLENBQUMsRUFDRGdDLFNBQVMsRUFDVDZYLGlCQUNGLENBQUMsQ0FBQTtFQUNEdmUsVUFBQUEsS0FBSyxHQUFHQSxLQUFLLENBQUNySSxNQUFNLENBQUNrbkIsYUFBYSxDQUFDLENBQUE7RUFDckMsU0FBQTtFQUNGLE9BQUE7O0VBRUE7UUFDQSxJQUFNQyxXQUFXLEdBQUc5ZSxLQUFLLENBQUMrZSxNQUFNLENBQUMsVUFBQ0MsSUFBSSxFQUFFamYsSUFBSSxFQUFLO1VBQy9DLElBQUlBLElBQUksQ0FBQ2dJLE9BQU8sRUFBRSxJQUFJcVcsVUFBVSxDQUFDclcsT0FBTyxFQUFFLEVBQUU7RUFDMUMsVUFBQSxPQUFPaEksSUFBSSxDQUFBO0VBQ2IsU0FBQTtFQUNBLFFBQUEsT0FBT2lmLElBQUksQ0FBQTtFQUNiLE9BQUMsRUFBRWhmLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRVosT0FBT0EsS0FBSyxDQUFDdEosR0FBRyxDQUFDLFVBQUNxSixJQUFJLEVBQUUyRSxDQUFDLEVBQUs7VUFDNUIsb0JBQ0VpRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsSUFBQSxFQUFBO0VBQ0U5RSxVQUFBQSxHQUFHLEVBQUVKLENBQUU7WUFDUG1GLE9BQU8sRUFBRVYsS0FBQSxDQUFLZ00sV0FBVyxDQUFDcEwsSUFBSSxDQUFBWixLQUFBLEVBQU9wSixJQUFJLENBQUU7RUFDM0N3RixVQUFBQSxTQUFTLEVBQUU0RCxLQUFBLENBQUs4VixTQUFTLENBQUNsZixJQUFJLENBQUU7RUFDaENrTSxVQUFBQSxHQUFHLEVBQUUsU0FBQUEsR0FBQ2lULENBQUFBLEVBQUUsRUFBSztjQUNYLElBQUluZixJQUFJLEtBQUsrZSxXQUFXLEVBQUU7Z0JBQ3hCM1YsS0FBQSxDQUFLc1UsUUFBUSxHQUFHeUIsRUFBRSxDQUFBO0VBQ3BCLGFBQUE7YUFDQTtFQUNGaEssVUFBQUEsU0FBUyxFQUFFLFNBQUFBLFNBQUMyRyxDQUFBQSxFQUFFLEVBQUs7RUFDakIxUyxZQUFBQSxLQUFBLENBQUt3RyxlQUFlLENBQUNrTSxFQUFFLEVBQUU5YixJQUFJLENBQUMsQ0FBQTthQUM5QjtZQUNGNFQsUUFBUSxFQUFFNVQsSUFBSSxLQUFLK2UsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUU7RUFDeEN0SixVQUFBQSxJQUFJLEVBQUMsUUFBUTtZQUNiLGVBQWVyTSxFQUFBQSxLQUFBLENBQUs0VSxjQUFjLENBQUNoZSxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUc3QyxTQUFVO1lBQzlELGVBQWVpTSxFQUFBQSxLQUFBLENBQUs2VSxjQUFjLENBQUNqZSxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUc3QyxTQUFBQTtFQUFVLFNBQUEsRUFFN0QxRyxVQUFVLENBQUN1SixJQUFJLEVBQUV4SSxNQUFNLEVBQUU0UixLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQ3pDLENBQUMsQ0FBQTtFQUVULE9BQUMsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO0VBQUEsSUFBQSxPQUFBMlQsS0FBQSxDQUFBO0VBQUEsR0FBQTtJQUFBNEIsU0FBQSxDQUFBdVMsSUFBQSxFQUFBcFUsZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQXNTLElBQUEsRUFBQSxDQUFBO01BQUF4WSxHQUFBLEVBQUEsbUJBQUE7TUFBQS9QLEtBQUEsRUF6S0QsU0FBQWtXLGlCQUFBQSxHQUFvQjtFQUNsQjtRQUNBLElBQUksQ0FBQ2tVLHVCQUF1QixFQUFFLENBQUE7UUFDOUIsSUFBSSxJQUFJLENBQUNsbkIsS0FBSyxDQUFDMGxCLFFBQVEsSUFBSSxJQUFJLENBQUNDLE1BQU0sRUFBRTtVQUN0QyxJQUFJLENBQUNuVCxRQUFRLENBQUM7RUFDWjhTLFVBQUFBLE1BQU0sRUFBRSxJQUFJLENBQUN0bEIsS0FBSyxDQUFDMGxCLFFBQVEsQ0FBQy9SLFlBQVksR0FBRyxJQUFJLENBQUNnUyxNQUFNLENBQUNoUyxZQUFBQTtFQUN6RCxTQUFDLENBQUMsQ0FBQTtFQUNKLE9BQUE7RUFDRixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUE5RyxHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQW1LRCxTQUFBK1csTUFBQUEsR0FBUztFQUFBLE1BQUEsSUFBQXNDLE1BQUEsR0FBQSxJQUFBLENBQUE7RUFDUCxNQUFBLElBQVFtUCxNQUFNLEdBQUssSUFBSSxDQUFDOVQsS0FBSyxDQUFyQjhULE1BQU0sQ0FBQTtRQUVkLG9CQUNFNVQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtVQUNFckUsU0FBUyxFQUFBLG1DQUFBLENBQUE1TixNQUFBLENBQ1AsSUFBSSxDQUFDTSxLQUFLLENBQUNtbkIsV0FBVyxHQUNsQixxREFBcUQsR0FDckQsRUFBRSxDQUFBO1NBR1J6VixlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUE1TiwwREFBQUEsQ0FBQUEsTUFBQSxDQUNQLElBQUksQ0FBQ00sS0FBSyxDQUFDb25CLGtCQUFrQixHQUN6QixzQ0FBc0MsR0FDdEMsRUFBRSxDQUNMO0VBQ0hwVCxRQUFBQSxHQUFHLEVBQUUsU0FBQUEsR0FBQzJSLENBQUFBLE1BQU0sRUFBSztZQUNmeFAsTUFBSSxDQUFDd1AsTUFBTSxHQUFHQSxNQUFNLENBQUE7RUFDdEIsU0FBQTtTQUVBalUsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLCtCQUFBO1NBQ1osRUFBQSxJQUFJLENBQUN0TixLQUFLLENBQUNxbkIsV0FDVCxDQUNGLENBQUMsZUFDTjNWLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBQyx3QkFBQTtTQUNib0UsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLDRCQUFBO1NBQ2JvRSxlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsSUFBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUMsNkJBQTZCO0VBQ3ZDMEcsUUFBQUEsR0FBRyxFQUFFLFNBQUFBLEdBQUNuRCxDQUFBQSxJQUFJLEVBQUs7WUFDYnNGLE1BQUksQ0FBQ3RGLElBQUksR0FBR0EsSUFBSSxDQUFBO1dBQ2hCO1VBQ0ZrRSxLQUFLLEVBQUV1USxNQUFNLEdBQUc7RUFBRUEsVUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtXQUFRLEdBQUcsRUFBRztFQUNoQy9ILFFBQUFBLElBQUksRUFBQyxTQUFTO1VBQ2QsWUFBWSxFQUFBLElBQUksQ0FBQ3ZkLEtBQUssQ0FBQ3FuQixXQUFBQTtTQUV0QixFQUFBLElBQUksQ0FBQ0MsV0FBVyxFQUNmLENBQ0QsQ0FDRixDQUNGLENBQUMsQ0FBQTtFQUVWLEtBQUE7RUFBQyxHQUFBLENBQUEsRUFBQSxDQUFBO01BQUF6YSxHQUFBLEVBQUEsY0FBQTtNQUFBRSxHQUFBLEVBaFFELFNBQUFBLEdBQUFBLEdBQTBCO1FBQ3hCLE9BQU87RUFDTDBCLFFBQUFBLFNBQVMsRUFBRSxFQUFFO0VBQ2I4WSxRQUFBQSxZQUFZLEVBQUUsU0FBQUEsWUFBQSxHQUFNLEVBQUU7RUFDdEJKLFFBQUFBLFdBQVcsRUFBRSxJQUFJO0VBQ2pCRSxRQUFBQSxXQUFXLEVBQUUsTUFBQTtTQUNkLENBQUE7RUFDSCxLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBUitCM1YsQ0FBQUEsc0JBQUssQ0FBQ3dDLFNBQVMsQ0FBQSxDQUFBO0VBQUE3QyxlQUFBLENBQTVCZ1UsSUFBSSxFQUFBLG9CQUFBLEVBVUssVUFBQ21DLFVBQVUsRUFBRUMsV0FBVyxFQUFLO0VBQ3ZELEVBQUEsT0FDRUEsV0FBVyxDQUFDL1QsU0FBUyxJQUFJOFQsVUFBVSxHQUFHLENBQUMsR0FBR0MsV0FBVyxDQUFDOVQsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFBO0VBRTNFLENBQUMsQ0FBQTs7RUMzQnlCLElBRVArVCxJQUFJLDBCQUFBelcsZ0JBQUEsRUFBQTtJQXNDdkIsU0FBQXlXLElBQUFBLENBQVkxbkIsS0FBSyxFQUFFO0VBQUEsSUFBQSxJQUFBa1IsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQXVXLElBQUEsQ0FBQSxDQUFBO0VBQ2pCeFcsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUFzVyxJQUFBQSxFQUFBQSxJQUFBLEdBQU0xbkIsS0FBSyxDQUFBLENBQUEsQ0FBQTtFQUFFcVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBR0g3QyxXQUFBQSxFQUFBQSxrQkFBQSxDQUFJdFEsS0FBSyxDQUFDbVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOEssY0FBYyxDQUFDLENBQUEsQ0FBRXJNLEdBQUcsQ0FBQyxZQUFBO0VBQUEsTUFBQSxvQkFDcERpVCxzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUE7RUFBQSxLQUNuQixDQUFDLENBQUEsQ0FBQTtFQUFBeEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVksWUFBQSxFQUFBLFVBQUNoUyxJQUFJLEVBQUE7UUFBQSxPQUFLbVgsYUFBbUIsQ0FBQ25YLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQXFSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUUvQyxZQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBQTtRQUFBLE9BQUttWCxhQUFtQixDQUFDblgsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBcVIsZUFBQSxDQUFBSCxLQUFBLEVBRTVDLGVBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxJQUFBMEgscUJBQUEsQ0FBQTtFQUFBLE1BQUEsT0FBQSxDQUFBQSxxQkFBQSxHQUFNMUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1osYUFBYSxNQUFBLElBQUEsSUFBQU4scUJBQUEsS0FBQSxLQUFBLENBQUEsR0FBQUEscUJBQUEsR0FBSTFILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUE5RyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFakQsdUJBQUEsRUFBQSxVQUFDeVcsUUFBUSxFQUFLO1FBQ3BDLElBQU1DLGVBQWUsR0FBRyxZQUFZO1VBQ2xDLElBQUksQ0FBQ0MsU0FBUyxDQUFDRixRQUFRLENBQUMsQ0FBQ3pVLE9BQU8sQ0FBQzJKLEtBQUssRUFBRSxDQUFBO0VBQzFDLE9BQUMsQ0FBQy9LLElBQUksQ0FBQVosS0FBSyxDQUFDLENBQUE7RUFFWnJOLE1BQUFBLE1BQU0sQ0FBQzBoQixxQkFBcUIsQ0FBQ3FDLGVBQWUsQ0FBQyxDQUFBO09BQzlDLENBQUEsQ0FBQTtFQUFBdlcsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsaUJBQUEsRUFFaUIsVUFBQzVQLEdBQUcsRUFBRW1QLEtBQUssRUFBSztFQUNoQyxNQUFBLElBQUlTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FlLFVBQVUsRUFBRTtVQUN6Qm5OLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FlLFVBQVUsQ0FBQy9jLEdBQUcsRUFBRW1QLEtBQUssQ0FBQyxDQUFBO0VBQ25DLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQVksSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsVUFBQ0osT0FBTyxFQUFFalUsT0FBTyxFQUFLO0VBQzNDLE1BQUEsSUFBQXliLFdBQUEsR0FBaUNwSCxLQUFBLENBQUtsUixLQUFLO1VBQW5DZCxJQUFJLEdBQUFvWixXQUFBLENBQUpwWixJQUFJO1VBQUU0TCxjQUFjLEdBQUF3TixXQUFBLENBQWR4TixjQUFjLENBQUE7UUFDNUIsSUFBQWdkLHFCQUFBLEdBQXdCelIsY0FBb0IsQ0FBQ25YLElBQUksRUFBRTRMLGNBQWMsQ0FBQztVQUExRGEsV0FBVyxHQUFBbWMscUJBQUEsQ0FBWG5jLFdBQVcsQ0FBQTtFQUVuQixNQUFBLElBQUl1RixLQUFBLENBQUtvRyxVQUFVLENBQUN6YSxPQUFPLENBQUMsSUFBSXFVLEtBQUEsQ0FBSzRJLFVBQVUsQ0FBQ2pkLE9BQU8sQ0FBQyxFQUFFLE9BQUE7RUFDMURxVSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDdmtCLE9BQU8sQ0FBQyxDQUFBO0VBRW5DLE1BQUEsSUFBSWlVLE9BQU8sR0FBR25GLFdBQVcsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNoQ3VGLFFBQUFBLEtBQUEsQ0FBSzZXLHFCQUFxQixDQUFDamQsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFBO0VBQ2hELE9BQUMsTUFBTSxJQUFJZ0csT0FBTyxHQUFHbkYsV0FBVyxLQUFLYixjQUFjLEVBQUU7RUFDbkRvRyxRQUFBQSxLQUFBLENBQUs2VyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUMvQixPQUFDLE1BQU03VyxLQUFBLENBQUsyVyxTQUFTLENBQUMvVyxPQUFPLEdBQUduRixXQUFXLENBQUMsQ0FBQ3VILE9BQU8sQ0FBQzJKLEtBQUssRUFBRSxDQUFBO09BQzdELENBQUEsQ0FBQTtFQUFBeEwsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsV0FBQSxFQUVXLFVBQUM4VyxDQUFDLEVBQUVyUSxLQUFLLEVBQUE7RUFBQSxNQUFBLE9BQUt0QixTQUFlLENBQUMyUixDQUFDLEVBQUVyUSxLQUFLLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUF0RyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFbkMsZUFBQSxFQUFBLFVBQUM4VyxDQUFDLEVBQUE7RUFBQSxNQUFBLE9BQUtBLENBQUMsS0FBS3poQixlQUFPLENBQUMxSixPQUFPLEVBQUUsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQXdVLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVoQyxjQUFBLEVBQUEsVUFBQzhXLENBQUMsRUFBQTtFQUFBLE1BQUEsT0FDZjlXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBUyxJQUNwQm9SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxJQUNsQnNXLFVBQWdCLENBQUNBLGVBQWEsQ0FBQ3haLE9BQU8sRUFBRSxFQUFFbXJCLENBQUMsQ0FBQyxFQUFFOVcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUF1UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFeEQsWUFBQSxFQUFBLFVBQUM4VyxDQUFDLEVBQUE7RUFBQSxNQUFBLE9BQ2I5VyxLQUFBLENBQUtsUixLQUFLLENBQUNGLFNBQVMsSUFDcEJvUixLQUFBLENBQUtsUixLQUFLLENBQUNELE9BQU8sSUFDbEJzVyxVQUFnQixDQUFDQSxlQUFhLENBQUN4WixPQUFPLEVBQUUsRUFBRW1yQixDQUFDLENBQUMsRUFBRTlXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBc1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXZELFdBQUEsRUFBQSxVQUFDOFcsQ0FBQyxFQUFBO0VBQUEsTUFBQSxPQUNaM1IsYUFBbUIsQ0FBQzJSLENBQUMsRUFBRTlXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBUyxFQUFFb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFPLENBQUMsQ0FBQTtFQUFBLEtBQUEsQ0FBQSxDQUFBO0VBQUFzUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFN0Msb0JBQUEsRUFBQSxVQUFDOFcsQ0FBQyxFQUFLO0VBQzFCLE1BQUEsSUFBQXhQLFlBQUEsR0FDRXRILEtBQUEsQ0FBS2xSLEtBQUs7VUFESjhZLFlBQVksR0FBQU4sWUFBQSxDQUFaTSxZQUFZO1VBQUVDLFVBQVUsR0FBQVAsWUFBQSxDQUFWTyxVQUFVO1VBQUVDLFlBQVksR0FBQVIsWUFBQSxDQUFaUSxZQUFZO1VBQUVsWixTQUFTLEdBQUEwWSxZQUFBLENBQVQxWSxTQUFTO1VBQUVDLE9BQU8sR0FBQXlZLFlBQUEsQ0FBUHpZLE9BQU8sQ0FBQTtFQUdsRSxNQUFBLElBQ0UsRUFBRStZLFlBQVksSUFBSUMsVUFBVSxJQUFJQyxZQUFZLENBQUMsSUFDN0MsQ0FBQzlILEtBQUEsQ0FBS2dJLGFBQWEsRUFBRSxFQUNyQjtFQUNBLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO1FBQ0EsSUFBSUosWUFBWSxJQUFJL1ksT0FBTyxFQUFFO0VBQzNCLFFBQUEsT0FBT3NXLGFBQW1CLENBQUMyUixDQUFDLEVBQUU5VyxLQUFBLENBQUtnSSxhQUFhLEVBQUUsRUFBRW5aLE9BQU8sQ0FBQyxDQUFBO0VBQzlELE9BQUE7UUFDQSxJQUFJZ1osVUFBVSxJQUFJalosU0FBUyxFQUFFO0VBQzNCLFFBQUEsT0FBT3VXLGFBQW1CLENBQUMyUixDQUFDLEVBQUVsb0IsU0FBUyxFQUFFb1IsS0FBQSxDQUFLZ0ksYUFBYSxFQUFFLENBQUMsQ0FBQTtFQUNoRSxPQUFBO0VBQ0EsTUFBQSxJQUFJRixZQUFZLElBQUlsWixTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0VBQ3pDLFFBQUEsT0FBT3NXLGFBQW1CLENBQUMyUixDQUFDLEVBQUVsb0IsU0FBUyxFQUFFb1IsS0FBQSxDQUFLZ0ksYUFBYSxFQUFFLENBQUMsQ0FBQTtFQUNoRSxPQUFBO0VBQ0EsTUFBQSxPQUFPLEtBQUssQ0FBQTtPQUNiLENBQUEsQ0FBQTtFQUFBN0gsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXVCLHVCQUFBLEVBQUEsVUFBQzhXLENBQUMsRUFBSztFQUM3QixNQUFBLElBQUksQ0FBQzlXLEtBQUEsQ0FBS2tJLGtCQUFrQixDQUFDNE8sQ0FBQyxDQUFDLEVBQUU7RUFDL0IsUUFBQSxPQUFPLEtBQUssQ0FBQTtFQUNkLE9BQUE7RUFFQSxNQUFBLElBQUFyUCxZQUFBLEdBQW9DekgsS0FBQSxDQUFLbFIsS0FBSztVQUF0Q0YsU0FBUyxHQUFBNlksWUFBQSxDQUFUN1ksU0FBUztVQUFFZ1osWUFBWSxHQUFBSCxZQUFBLENBQVpHLFlBQVksQ0FBQTtRQUMvQixJQUFNbVAsS0FBSyxHQUFHNVIsZUFBYSxDQUFDeFosT0FBTyxFQUFFLEVBQUVtckIsQ0FBQyxDQUFDLENBQUE7RUFFekMsTUFBQSxJQUFJbFAsWUFBWSxFQUFFO1VBQ2hCLE9BQU96QyxVQUFnQixDQUFDNFIsS0FBSyxFQUFFL1csS0FBQSxDQUFLZ0ksYUFBYSxFQUFFLENBQUMsQ0FBQTtFQUN0RCxPQUFBO0VBQ0EsTUFBQSxPQUFPN0MsVUFBZ0IsQ0FBQzRSLEtBQUssRUFBRW5vQixTQUFTLENBQUMsQ0FBQTtPQUMxQyxDQUFBLENBQUE7RUFBQXVSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUM4VyxDQUFDLEVBQUs7RUFDM0IsTUFBQSxJQUFJLENBQUM5VyxLQUFBLENBQUtrSSxrQkFBa0IsQ0FBQzRPLENBQUMsQ0FBQyxFQUFFO0VBQy9CLFFBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxPQUFBO0VBRUEsTUFBQSxJQUFBblAsWUFBQSxHQUE4QzNILEtBQUEsQ0FBS2xSLEtBQUs7VUFBaERELE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU87VUFBRWdaLFVBQVUsR0FBQUYsWUFBQSxDQUFWRSxVQUFVO1VBQUVDLFlBQVksR0FBQUgsWUFBQSxDQUFaRyxZQUFZLENBQUE7UUFDekMsSUFBTWlQLEtBQUssR0FBRzVSLGVBQWEsQ0FBQ3haLE9BQU8sRUFBRSxFQUFFbXJCLENBQUMsQ0FBQyxDQUFBO1FBRXpDLElBQUlqUCxVQUFVLElBQUlDLFlBQVksRUFBRTtVQUM5QixPQUFPM0MsVUFBZ0IsQ0FBQzRSLEtBQUssRUFBRS9XLEtBQUEsQ0FBS2dJLGFBQWEsRUFBRSxDQUFDLENBQUE7RUFDdEQsT0FBQTtFQUNBLE1BQUEsT0FBTzdDLFVBQWdCLENBQUM0UixLQUFLLEVBQUVsb0IsT0FBTyxDQUFDLENBQUE7T0FDeEMsQ0FBQSxDQUFBO0VBQUFzUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFb0Isb0JBQUEsRUFBQSxVQUFDOFcsQ0FBQyxFQUFLO0VBQzFCLE1BQUEsSUFBTTlvQixJQUFJLEdBQUdtWCxjQUFvQixDQUFDQSxlQUFhLENBQUNuRixLQUFBLENBQUtsUixLQUFLLENBQUNkLElBQUksRUFBRThvQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3BFLE9BQ0UsQ0FBQzlXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEwQixJQUN0QyxDQUFDM0csS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxJQUNsQixDQUFDaEcsU0FBZSxDQUFDblgsSUFBSSxFQUFFbVgsY0FBb0IsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxDQUFDLElBQ2pFN0IsU0FBZSxDQUFDblgsSUFBSSxFQUFFbVgsY0FBb0IsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksQ0FBQyxDQUFDLENBQUE7T0FFdkUsQ0FBQSxDQUFBO0VBQUE5RyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsVUFBQ3dELENBQUMsRUFBRXNULENBQUMsRUFBSztFQUN0QixNQUFBLElBQVE5b0IsSUFBSSxHQUFLZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFuQmQsSUFBSSxDQUFBO0VBQ1pnUyxNQUFBQSxLQUFBLENBQUtnWCxlQUFlLENBQUM3UixjQUFvQixDQUFDQSxlQUFhLENBQUNuWCxJQUFJLEVBQUU4b0IsQ0FBQyxDQUFDLENBQUMsRUFBRXRULENBQUMsQ0FBQyxDQUFBO09BQ3RFLENBQUEsQ0FBQTtFQUFBckQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFVBQUN3RCxDQUFDLEVBQUVzVCxDQUFDLEVBQUs7RUFDeEIsTUFBQSxJQUFRbmIsR0FBRyxHQUFLNkgsQ0FBQyxDQUFUN0gsR0FBRyxDQUFBO0VBQ1gsTUFBQSxJQUFRNkssZUFBZSxHQUFLeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUE5QjBYLGVBQWUsQ0FBQTtFQUV2QixNQUFBLElBQUksQ0FBQ3hHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEwQixFQUFFO0VBQzFDLFFBQUEsUUFBUWhMLEdBQUc7RUFDVCxVQUFBLEtBQUssT0FBTztFQUNWcUUsWUFBQUEsS0FBQSxDQUFLaVgsV0FBVyxDQUFDelQsQ0FBQyxFQUFFc1QsQ0FBQyxDQUFDLENBQUE7Y0FDdEI5VyxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDbFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLENBQUE7RUFDL0MsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFlBQVk7RUFDZmhILFlBQUFBLEtBQUEsQ0FBS2tYLG9CQUFvQixDQUN2QkosQ0FBQyxHQUFHLENBQUMsRUFDTDNSLGlCQUFjLENBQUNuRixLQUFBLENBQUtsUixLQUFLLENBQUNtWSxZQUFZLEVBQUUsQ0FBQyxDQUMzQyxDQUFDLENBQUE7RUFDRCxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssV0FBVztFQUNkakgsWUFBQUEsS0FBQSxDQUFLa1gsb0JBQW9CLENBQ3ZCSixDQUFDLEdBQUcsQ0FBQyxFQUNMM1IsaUJBQWMsQ0FBQ25GLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21ZLFlBQVksRUFBRSxDQUFDLENBQzNDLENBQUMsQ0FBQTtFQUNELFlBQUEsTUFBQTtFQUNKLFNBQUE7RUFDRixPQUFBO0VBRUFULE1BQUFBLGVBQWUsSUFBSUEsZUFBZSxDQUFDaEQsQ0FBQyxDQUFDLENBQUE7T0FDdEMsQ0FBQSxDQUFBO0VBQUFyRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFbUIsbUJBQUEsRUFBQSxVQUFDOFcsQ0FBQyxFQUFLO0VBQ3pCLE1BQUEsSUFBQTNPLFlBQUEsR0FTSW5JLEtBQUEsQ0FBS2xSLEtBQUs7VUFSWmQsSUFBSSxHQUFBbWEsWUFBQSxDQUFKbmEsSUFBSTtVQUNKekIsT0FBTyxHQUFBNGIsWUFBQSxDQUFQNWIsT0FBTztVQUNQeUgsT0FBTyxHQUFBbVUsWUFBQSxDQUFQblUsT0FBTztVQUNQZ1QsUUFBUSxHQUFBbUIsWUFBQSxDQUFSbkIsUUFBUTtVQUNSL1MsWUFBWSxHQUFBa1UsWUFBQSxDQUFabFUsWUFBWTtVQUNaRSxZQUFZLEdBQUFnVSxZQUFBLENBQVpoVSxZQUFZO1VBQ1pFLFVBQVUsR0FBQThULFlBQUEsQ0FBVjlULFVBQVU7VUFDVjhpQixhQUFhLEdBQUFoUCxZQUFBLENBQWJnUCxhQUFhLENBQUE7UUFHZixPQUFPdFUsU0FBSSxDQUNULDZCQUE2QixFQUFBLHlCQUFBLENBQUFyVSxNQUFBLENBQ0hzb0IsQ0FBQyxDQUMzQkssRUFBQUEsYUFBYSxHQUFHQSxhQUFhLENBQUNoUyxlQUFhLENBQUNuWCxJQUFJLEVBQUU4b0IsQ0FBQyxDQUFDLENBQUMsR0FBRy9pQixTQUFTLEVBQ2pFO0VBQ0UsUUFBQSx1Q0FBdUMsRUFBRStpQixDQUFDLEtBQUt6aEIsZUFBTyxDQUFDMlIsUUFBUSxDQUFDO1VBQ2hFLHVDQUF1QyxFQUNyQyxDQUFDemEsT0FBTyxJQUFJeUgsT0FBTyxJQUFJQyxZQUFZLElBQUlFLFlBQVksSUFBSUUsVUFBVSxLQUNqRThRLGNBQW9CLENBQUMyUixDQUFDLEVBQUU5VyxLQUFBLENBQUtsUixLQUFLLENBQUM7RUFDckMsUUFBQSxnREFBZ0QsRUFDOUNrUixLQUFBLENBQUs4SSxrQkFBa0IsQ0FBQ2dPLENBQUMsQ0FBQztFQUM1QixRQUFBLDBDQUEwQyxFQUFFOVcsS0FBQSxDQUFLK0ksWUFBWSxDQUFDK04sQ0FBQyxDQUFDO0VBQ2hFLFFBQUEsd0NBQXdDLEVBQUU5VyxLQUFBLENBQUtnSixVQUFVLENBQUM4TixDQUFDLENBQUM7RUFDNUQsUUFBQSx1Q0FBdUMsRUFBRTlXLEtBQUEsQ0FBS0gsU0FBUyxDQUFDaVgsQ0FBQyxDQUFDO0VBQzFELFFBQUEsaURBQWlELEVBQy9DOVcsS0FBQSxDQUFLa0ksa0JBQWtCLENBQUM0TyxDQUFDLENBQUM7RUFDNUIsUUFBQSxvREFBb0QsRUFDbEQ5VyxLQUFBLENBQUtpSixxQkFBcUIsQ0FBQzZOLENBQUMsQ0FBQztFQUMvQixRQUFBLGtEQUFrRCxFQUNoRDlXLEtBQUEsQ0FBS2tKLG1CQUFtQixDQUFDNE4sQ0FBQyxDQUFDO0VBQzdCLFFBQUEsb0NBQW9DLEVBQUU5VyxLQUFBLENBQUtvWCxhQUFhLENBQUNOLENBQUMsQ0FBQTtFQUM1RCxPQUNGLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtFQUFBM1csSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWlCLGlCQUFBLEVBQUEsVUFBQzhXLENBQUMsRUFBSztFQUN2QixNQUFBLElBQUk5VyxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMEIsRUFBRSxPQUFPLElBQUksQ0FBQTtRQUN0RCxJQUFNMFEsV0FBVyxHQUFHbFMsZUFBYSxDQUFDbkYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBWSxDQUFDLENBQUE7RUFFMUQsTUFBQSxPQUFPNlAsQ0FBQyxLQUFLTyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQTtPQUN0QyxDQUFBLENBQUE7TUFBQWxYLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLDRCQUFBLEVBRTRCLFlBQU07RUFDakMsTUFBQSxJQUFBcUksWUFBQSxHQUNFckksS0FBQSxDQUFLbFIsS0FBSztVQURKa1osYUFBYSxHQUFBSyxZQUFBLENBQWJMLGFBQWE7VUFBRUosWUFBWSxHQUFBUyxZQUFBLENBQVpULFlBQVk7VUFBRUMsVUFBVSxHQUFBUSxZQUFBLENBQVZSLFVBQVU7VUFBRUMsWUFBWSxHQUFBTyxZQUFBLENBQVpQLFlBQVksQ0FBQTtRQUU3RCxPQUFPakYsU0FBSSxDQUFDLHdCQUF3QixFQUFFO0VBQ3BDLFFBQUEseUNBQXlDLEVBQ3ZDbUYsYUFBYSxLQUFLSixZQUFZLElBQUlDLFVBQVUsSUFBSUMsWUFBWSxDQUFBO0VBQ2hFLE9BQUMsQ0FBQyxDQUFBO09BQ0gsQ0FBQSxDQUFBO0VBQUEzSCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxVQUFDOFcsQ0FBQyxFQUFLO0VBQ3RCLE1BQUEsT0FBTzlXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dvQixpQkFBaUIsR0FBR3RYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3dvQixpQkFBaUIsQ0FBQ1IsQ0FBQyxDQUFDLEdBQUdBLENBQUMsQ0FBQTtPQUMxRSxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUE5VyxLQUFBLENBQUE7RUE3TUQsR0FBQTtJQUFDNEIsU0FBQSxDQUFBNFUsSUFBQSxFQUFBelcsZ0JBQUEsQ0FBQSxDQUFBO0lBQUEsT0FBQThCLFlBQUEsQ0FBQTJVLElBQUEsRUFBQSxDQUFBO01BQUE3YSxHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQStNRCxTQUFBK1csTUFBQUEsR0FBUztFQUFBLE1BQUEsSUFBQXNDLE1BQUEsR0FBQSxJQUFBLENBQUE7UUFDUCxJQUFNMUUsU0FBUyxHQUFHLEVBQUUsQ0FBQTtFQUNwQixNQUFBLElBQUErSCxZQUFBLEdBQ0UsSUFBSSxDQUFDeFosS0FBSztVQURKZCxJQUFJLEdBQUFzYSxZQUFBLENBQUp0YSxJQUFJO1VBQUU0TCxjQUFjLEdBQUEwTyxZQUFBLENBQWQxTyxjQUFjO1VBQUUyZCxnQkFBZ0IsR0FBQWpQLFlBQUEsQ0FBaEJpUCxnQkFBZ0I7VUFBRUMsZ0JBQWdCLEdBQUFsUCxZQUFBLENBQWhCa1AsZ0JBQWdCLENBQUE7UUFFaEUsSUFBQUMsc0JBQUEsR0FBbUN0UyxjQUFvQixDQUNyRG5YLElBQUksRUFDSjRMLGNBQ0YsQ0FBQztVQUhPYSxXQUFXLEdBQUFnZCxzQkFBQSxDQUFYaGQsV0FBVztVQUFFVixTQUFTLEdBQUEwZCxzQkFBQSxDQUFUMWQsU0FBUyxDQUFBO0VBRzVCLE1BQUEsSUFBQTJkLEtBQUEsR0FBQSxTQUFBQSxLQUFBWixDQUFBQSxDQUFBLEVBRTZDO0VBQzdDdlcsUUFBQUEsU0FBUyxDQUFDeEUsSUFBSSxlQUNaeUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtZQUNFcUMsR0FBRyxFQUFFbUMsTUFBSSxDQUFDMFIsU0FBUyxDQUFDRyxDQUFDLEdBQUdyYyxXQUFXLENBQUU7RUFDckNpRyxVQUFBQSxPQUFPLEVBQUUsU0FBQUEsT0FBQ2dTLENBQUFBLEVBQUUsRUFBSztFQUNmek4sWUFBQUEsTUFBSSxDQUFDZ1MsV0FBVyxDQUFDdkUsRUFBRSxFQUFFb0UsQ0FBQyxDQUFDLENBQUE7YUFDdkI7RUFDRi9LLFVBQUFBLFNBQVMsRUFBRSxTQUFBQSxTQUFDMkcsQ0FBQUEsRUFBRSxFQUFLO0VBQ2pCLFlBQUEsSUFBSXZOLGNBQW9CLENBQUN1TixFQUFFLENBQUMsRUFBRTtnQkFDNUJBLEVBQUUsQ0FBQ25NLGNBQWMsRUFBRSxDQUFBO2dCQUNuQm1NLEVBQUUsQ0FBQy9XLEdBQUcsR0FBRyxPQUFPLENBQUE7RUFDbEIsYUFBQTtFQUVBc0osWUFBQUEsTUFBSSxDQUFDMFMsYUFBYSxDQUFDakYsRUFBRSxFQUFFb0UsQ0FBQyxDQUFDLENBQUE7YUFDekI7RUFDRnRNLFVBQUFBLFFBQVEsRUFBRXZGLE1BQUksQ0FBQzJTLGVBQWUsQ0FBQ2QsQ0FBQyxDQUFFO0VBQ2xDMWEsVUFBQUEsU0FBUyxFQUFFNkksTUFBSSxDQUFDNFMsaUJBQWlCLENBQUNmLENBQUMsQ0FBRTtZQUNyQ3pRLFlBQVksRUFDVixDQUFDcEIsTUFBSSxDQUFDblcsS0FBSyxDQUFDbWQsZUFBZSxHQUN2QixVQUFDeUcsRUFBRSxFQUFBO0VBQUEsWUFBQSxPQUFLNkUsZ0JBQWdCLENBQUM3RSxFQUFFLEVBQUVvRSxDQUFDLENBQUMsQ0FBQTtFQUFBLFdBQUEsR0FDL0IvaUIsU0FDTDtZQUNEb1ksY0FBYyxFQUNabEgsTUFBSSxDQUFDblcsS0FBSyxDQUFDbWQsZUFBZSxHQUN0QixVQUFDeUcsRUFBRSxFQUFBO0VBQUEsWUFBQSxPQUFLNkUsZ0JBQWdCLENBQUM3RSxFQUFFLEVBQUVvRSxDQUFDLENBQUMsQ0FBQTtFQUFBLFdBQUEsR0FDL0IvaUIsU0FDTDtZQUNEa2IsWUFBWSxFQUNWLENBQUNoSyxNQUFJLENBQUNuVyxLQUFLLENBQUNtZCxlQUFlLEdBQ3ZCLFVBQUN5RyxFQUFFLEVBQUE7RUFBQSxZQUFBLE9BQUs4RSxnQkFBZ0IsQ0FBQzlFLEVBQUUsRUFBRW9FLENBQUMsQ0FBQyxDQUFBO0VBQUEsV0FBQSxHQUMvQi9pQixTQUNMO1lBQ0RnZ0IsY0FBYyxFQUNaOU8sTUFBSSxDQUFDblcsS0FBSyxDQUFDbWQsZUFBZSxHQUN0QixVQUFDeUcsRUFBRSxFQUFBO0VBQUEsWUFBQSxPQUFLOEUsZ0JBQWdCLENBQUM5RSxFQUFFLEVBQUVvRSxDQUFDLENBQUMsQ0FBQTtFQUFBLFdBQUEsR0FDL0IvaUIsU0FDTDtFQUNENEgsVUFBQUEsR0FBRyxFQUFFbWIsQ0FBRTtZQUNQLGNBQWM3UixFQUFBQSxNQUFJLENBQUNtUyxhQUFhLENBQUNOLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRy9pQixTQUFBQTtFQUFVLFNBQUEsRUFFeERrUixNQUFJLENBQUM2UyxjQUFjLENBQUNoQixDQUFDLENBQ25CLENBQ1AsQ0FBQyxDQUFBO1NBQ0YsQ0FBQTtRQTNDRCxLQUFLLElBQUlBLENBQUMsR0FBR3JjLFdBQVcsRUFBRXFjLENBQUMsSUFBSS9jLFNBQVMsRUFBRStjLENBQUMsRUFBRSxFQUFBO0VBQUFZLFFBQUFBLEtBQUEsQ0FBQVosQ0FBQSxDQUFBLENBQUE7RUFBQSxPQUFBO1FBNkM3QyxvQkFDRXRXLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBRSxJQUFJLENBQUMyYiwwQkFBMEIsRUFBQztTQUM5Q3ZYLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXJFLFFBQUFBLFNBQVMsRUFBQyxnQ0FBZ0M7RUFDMUM2UyxRQUFBQSxZQUFZLEVBQ1YsQ0FBQyxJQUFJLENBQUNuZ0IsS0FBSyxDQUFDbWQsZUFBZSxHQUN2QixJQUFJLENBQUNuZCxLQUFLLENBQUNrcEIsa0JBQWtCLEdBQzdCamtCLFNBQ0w7RUFDRGdnQixRQUFBQSxjQUFjLEVBQ1osSUFBSSxDQUFDamxCLEtBQUssQ0FBQ21kLGVBQWUsR0FDdEIsSUFBSSxDQUFDbmQsS0FBSyxDQUFDa3BCLGtCQUFrQixHQUM3QmprQixTQUFBQTtTQUdMd00sRUFBQUEsU0FDRSxDQUNGLENBQUMsQ0FBQTtFQUVWLEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0FoVStCQyxDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ0xkLElBRWRpVixTQUFTLDBCQUFBbFksZ0JBQUEsRUFBQTtJQVM1QixTQUFBa1ksU0FBQUEsQ0FBWW5wQixLQUFLLEVBQUU7RUFBQSxJQUFBLElBQUFrUixLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBZ1ksU0FBQSxDQUFBLENBQUE7RUFDakJqWSxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQStYLElBQUFBLEVBQUFBLFNBQUEsR0FBTW5wQixLQUFLLENBQUEsQ0FBQSxDQUFBO0VBQUVxUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFrQkEsY0FBQSxFQUFBLFVBQUNwSixJQUFJLEVBQUs7UUFDdkJvSixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRTFLLFFBQUFBLElBQUksRUFBSkEsSUFBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQTtFQUV2QixNQUFBLElBQWNzaEIsUUFBUSxHQUFLbFksS0FBQSxDQUFLbFIsS0FBSyxDQUE3QmQsSUFBSSxDQUFBO1FBQ1osSUFBTW1xQixlQUFlLEdBQUdELFFBQVEsWUFBWWpzQixJQUFJLElBQUksQ0FBQ21zQixLQUFLLENBQUNGLFFBQVEsQ0FBQyxDQUFBO1FBQ3BFLElBQU1scUIsSUFBSSxHQUFHbXFCLGVBQWUsR0FBR0QsUUFBUSxHQUFHLElBQUlqc0IsSUFBSSxFQUFFLENBQUE7RUFFcEQrQixNQUFBQSxJQUFJLENBQUM4QixRQUFRLENBQUM4RyxJQUFJLENBQUN5aEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDakNycUIsTUFBQUEsSUFBSSxDQUFDK0IsVUFBVSxDQUFDNkcsSUFBSSxDQUFDeWhCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBRW5DclksTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlIsUUFBUSxDQUFDM1MsSUFBSSxDQUFDLENBQUE7T0FDMUIsQ0FBQSxDQUFBO01BQUFtUyxlQUFBLENBQUFILEtBQUEsRUFBQSxpQkFBQSxFQUVpQixZQUFNO0VBQ3RCLE1BQUEsSUFBUXBKLElBQUksR0FBS29KLEtBQUEsQ0FBS00sS0FBSyxDQUFuQjFKLElBQUksQ0FBQTtFQUNaLE1BQUEsSUFBQXdRLFdBQUEsR0FBOENwSCxLQUFBLENBQUtsUixLQUFLO1VBQWhEZCxJQUFJLEdBQUFvWixXQUFBLENBQUpwWixJQUFJO1VBQUVzcUIsVUFBVSxHQUFBbFIsV0FBQSxDQUFWa1IsVUFBVTtVQUFFQyxlQUFlLEdBQUFuUixXQUFBLENBQWZtUixlQUFlLENBQUE7RUFFekMsTUFBQSxJQUFJQSxlQUFlLEVBQUU7RUFDbkIsUUFBQSxvQkFBTy9YLHNCQUFLLENBQUNnWSxZQUFZLENBQUNELGVBQWUsRUFBRTtFQUN6Q3ZxQixVQUFBQSxJQUFJLEVBQUpBLElBQUk7RUFDSnBDLFVBQUFBLEtBQUssRUFBRWdMLElBQUk7WUFDWCtKLFFBQVEsRUFBRVgsS0FBQSxDQUFLcVcsWUFBQUE7RUFDakIsU0FBQyxDQUFDLENBQUE7RUFDSixPQUFBO1FBRUEsb0JBQ0U3VixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQ0VnWSxRQUFBQSxJQUFJLEVBQUMsTUFBTTtFQUNYcmMsUUFBQUEsU0FBUyxFQUFDLDhCQUE4QjtFQUN4Q3NjLFFBQUFBLFdBQVcsRUFBQyxNQUFNO0VBQ2xCQyxRQUFBQSxJQUFJLEVBQUMsWUFBWTtVQUNqQkMsUUFBUSxFQUFBLElBQUE7RUFDUmh0QixRQUFBQSxLQUFLLEVBQUVnTCxJQUFLO0VBQ1orSixRQUFBQSxRQUFRLEVBQUUsU0FBQUEsUUFBQytSLENBQUFBLEVBQUUsRUFBSztZQUNoQjFTLEtBQUEsQ0FBS3FXLFlBQVksQ0FBQzNELEVBQUUsQ0FBQ2pQLE1BQU0sQ0FBQzdYLEtBQUssSUFBSTBzQixVQUFVLENBQUMsQ0FBQTtFQUNsRCxTQUFBO0VBQUUsT0FDSCxDQUFDLENBQUE7T0FFTCxDQUFBLENBQUE7TUF0REN0WSxLQUFBLENBQUtNLEtBQUssR0FBRztFQUNYMUosTUFBQUEsSUFBSSxFQUFFb0osS0FBQSxDQUFLbFIsS0FBSyxDQUFDd3BCLFVBQUFBO09BQ2xCLENBQUE7RUFBQyxJQUFBLE9BQUF0WSxLQUFBLENBQUE7RUFDSixHQUFBO0lBQUM0QixTQUFBLENBQUFxVyxTQUFBLEVBQUFsWSxnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBb1csU0FBQSxFQUFBLENBQUE7TUFBQXRjLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBcURELFNBQUErVyxNQUFBQSxHQUFTO1FBQ1Asb0JBQ0VuQyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUMsd0NBQUE7U0FDYm9FLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBQyxnQ0FBQTtTQUNaLEVBQUEsSUFBSSxDQUFDdE4sS0FBSyxDQUFDK3BCLGNBQ1QsQ0FBQyxlQUNOclksc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLHdDQUFBO1NBQ2JvRSxlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxRQUFBQSxTQUFTLEVBQUMsOEJBQUE7RUFBOEIsT0FBQSxFQUMxQyxJQUFJLENBQUMwYyxlQUFlLEVBQ2xCLENBQ0YsQ0FDRixDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtNQUFBbmQsR0FBQSxFQUFBLDBCQUFBO0VBQUEvUCxJQUFBQSxLQUFBLEVBaEVELFNBQUFtdEIsd0JBQUFBLENBQWdDanFCLEtBQUssRUFBRXdSLEtBQUssRUFBRTtFQUM1QyxNQUFBLElBQUl4UixLQUFLLENBQUN3cEIsVUFBVSxLQUFLaFksS0FBSyxDQUFDMUosSUFBSSxFQUFFO1VBQ25DLE9BQU87WUFDTEEsSUFBSSxFQUFFOUgsS0FBSyxDQUFDd3BCLFVBQUFBO1dBQ2IsQ0FBQTtFQUNILE9BQUE7O0VBRUE7RUFDQSxNQUFBLE9BQU8sSUFBSSxDQUFBO0VBQ2IsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQTFCb0M5WCxDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ0F2QyxTQUFTZ1csaUJBQWlCQSxDQUFBdHFCLElBQUEsRUFLdEM7RUFBQSxFQUFBLElBQUF1cUIscUJBQUEsR0FBQXZxQixJQUFBLENBSkR3bkIsa0JBQWtCO0VBQWxCQSxJQUFBQSxrQkFBa0IsR0FBQStDLHFCQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsS0FBSyxHQUFBQSxxQkFBQTtNQUFBQyxhQUFBLEdBQUF4cUIsSUFBQSxDQUMxQnlxQixRQUFRO0VBQVJBLElBQUFBLFFBQVEsR0FBQUQsYUFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLEtBQUssR0FBQUEsYUFBQTtNQUNoQjljLFNBQVMsR0FBQTFOLElBQUEsQ0FBVDBOLFNBQVM7TUFDVDhGLFFBQVEsR0FBQXhULElBQUEsQ0FBUndULFFBQVEsQ0FBQTtFQUVSLEVBQUEsSUFBSWtYLFNBQVMsR0FBR2xELGtCQUFrQixHQUM5QixhQUFhLEdBQUEsYUFBQSxDQUFBMW5CLE1BQUEsQ0FDQzJxQixRQUFRLEdBQUcsV0FBVyxHQUFHLEVBQUUsQ0FBRSxDQUFBO0lBRS9DLG9CQUNFM1ksc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsSUFBQUEsU0FBUyxFQUFFQSxTQUFVO0VBQ3JCaVEsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYixJQUFBLFlBQUEsRUFBWStNLFNBQVU7TUFDdEIsWUFBVyxFQUFBLE1BQUE7RUFBTSxHQUFBLEVBRWhCbFgsUUFDRSxDQUFDLENBQUE7RUFFVjs7RUMwQkEsSUFBTW1YLHlCQUF5QixHQUFHLENBQ2hDLCtCQUErQixFQUMvQixnQ0FBZ0MsRUFDaEMscUNBQXFDLENBQ3RDLENBQUE7RUFFRCxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxHQUFxQjtFQUFBLEVBQUEsSUFBakJDLE9BQU8sR0FBQXpsQixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxFQUFFLENBQUE7RUFDcEMsRUFBQSxJQUFNMGxCLFVBQVUsR0FBRyxDQUFDRCxPQUFPLENBQUNuZCxTQUFTLElBQUksRUFBRSxFQUFFaWMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3pELEVBQUEsT0FBT2dCLHlCQUF5QixDQUFDOWtCLElBQUksQ0FDbkMsVUFBQ2tsQixhQUFhLEVBQUE7RUFBQSxJQUFBLE9BQUtELFVBQVUsQ0FBQ0UsT0FBTyxDQUFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7RUFBQSxHQUMzRCxDQUFDLENBQUE7RUFDSCxDQUFDLENBQUE7RUFBQyxJQUVtQkUsUUFBUSwwQkFBQTVaLGdCQUFBLEVBQUE7SUFrSzNCLFNBQUE0WixRQUFBQSxDQUFZN3FCLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUEwWixRQUFBLENBQUEsQ0FBQTtFQUNqQjNaLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBeVosSUFBQUEsRUFBQUEsUUFBQSxHQUFNN3FCLEtBQUssQ0FBQSxDQUFBLENBQUE7RUFBRXFSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQWtETSxvQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUM5QlMsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1UsY0FBYyxDQUFDM0QsS0FBSyxDQUFDLENBQUE7T0FDakMsQ0FBQSxDQUFBO01BQUFZLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW9CLFlBQU07RUFDekIsTUFBQSxPQUFPQSxLQUFBLENBQUtxTCxZQUFZLENBQUNySixPQUFPLENBQUE7T0FDakMsQ0FBQSxDQUFBO0VBQUE3QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7RUFDL0IsTUFBQSxJQUFJK1osZ0JBQWdCLENBQUMvWixLQUFLLENBQUNrRSxNQUFNLENBQUMsRUFBRTtFQUNsQ3pELFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhxQixlQUFlLEVBQUUsQ0FBQTtFQUM5QixPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUF6WixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBRWUsWUFBTTtFQUNwQixNQUFBLElBQUFvSCxXQUFBLEdBQStDcEgsS0FBQSxDQUFLbFIsS0FBSztVQUFqRG1ZLFlBQVksR0FBQUcsV0FBQSxDQUFaSCxZQUFZO1VBQUVELFFBQVEsR0FBQUksV0FBQSxDQUFSSixRQUFRO1VBQUVrTyxVQUFVLEdBQUE5TixXQUFBLENBQVY4TixVQUFVLENBQUE7RUFDMUMsTUFBQSxJQUFNM29CLE9BQU8sR0FBR29PLG1CQUFtQixDQUFDcUYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDL0MsTUFBQSxJQUFNa0YsT0FBTyxHQUFHK0csbUJBQW1CLENBQUNpRixLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUMvQyxNQUFBLElBQU1rVCxPQUFPLEdBQUdyVyxPQUFPLEVBQUUsQ0FBQTtFQUN6QixNQUFBLElBQU1rdUIsV0FBVyxHQUFHM0UsVUFBVSxJQUFJbE8sUUFBUSxJQUFJQyxZQUFZLENBQUE7RUFDMUQsTUFBQSxJQUFJNFMsV0FBVyxFQUFFO0VBQ2YsUUFBQSxPQUFPQSxXQUFXLENBQUE7RUFDcEIsT0FBQyxNQUFNO1VBQ0wsSUFBSXR0QixPQUFPLElBQUkyQixpQkFBUSxDQUFDOFQsT0FBTyxFQUFFelYsT0FBTyxDQUFDLEVBQUU7RUFDekMsVUFBQSxPQUFPQSxPQUFPLENBQUE7V0FDZixNQUFNLElBQUl5SCxPQUFPLElBQUkrSixlQUFPLENBQUNpRSxPQUFPLEVBQUVoTyxPQUFPLENBQUMsRUFBRTtFQUMvQyxVQUFBLE9BQU9BLE9BQU8sQ0FBQTtFQUNoQixTQUFBO0VBQ0YsT0FBQTtFQUNBLE1BQUEsT0FBT2dPLE9BQU8sQ0FBQTtPQUNmLENBQUEsQ0FBQTtNQUFBN0IsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFlBQU07RUFDcEJBLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBNVMsSUFBQSxFQUFBO0VBQUEsUUFBQSxJQUFHVixJQUFJLEdBQUFVLElBQUEsQ0FBSlYsSUFBSSxDQUFBO1VBQUEsT0FBUTtFQUNiQSxVQUFBQSxJQUFJLEVBQUV3SyxtQkFBUyxDQUFDeEssSUFBSSxFQUFFLENBQUMsQ0FBQTtXQUN4QixDQUFBO0VBQUEsT0FBQyxFQUNGLFlBQUE7VUFBQSxPQUFNZ1MsS0FBQSxDQUFLOFosaUJBQWlCLENBQUM5WixLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsT0FDL0MsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO01BQUFtUyxlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBRWUsWUFBTTtFQUNwQkEsTUFBQUEsS0FBQSxDQUFLc0IsUUFBUSxDQUNYLFVBQUEvUixLQUFBLEVBQUE7RUFBQSxRQUFBLElBQUd2QixJQUFJLEdBQUF1QixLQUFBLENBQUp2QixJQUFJLENBQUE7VUFBQSxPQUFRO0VBQ2JBLFVBQUFBLElBQUksRUFBRWtLLG1CQUFTLENBQUNsSyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1dBQ3hCLENBQUE7RUFBQSxPQUFDLEVBQ0YsWUFBQTtVQUFBLE9BQU1nUyxLQUFBLENBQUs4WixpQkFBaUIsQ0FBQzlaLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFDLENBQUE7RUFBQSxPQUMvQyxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7TUFBQW1TLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUM1UCxHQUFHLEVBQUVtUCxLQUFLLEVBQUV3YSxlQUFlLEVBQUs7UUFDaEQvWixLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFRLENBQUNqVSxHQUFHLEVBQUVtUCxLQUFLLEVBQUV3YSxlQUFlLENBQUMsQ0FBQTtFQUNoRC9aLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLElBQUlsUSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxDQUFDOWYsR0FBRyxDQUFDLENBQUE7T0FDOUQsQ0FBQSxDQUFBO0VBQUErUCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDNVAsR0FBRyxFQUFLO1FBQzdCNFAsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUUwRyxRQUFBQSxhQUFhLEVBQUU1WCxHQUFBQTtFQUFJLE9BQUMsQ0FBQyxDQUFBO0VBQ3JDNFAsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2UsZUFBZSxJQUFJcE4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2UsZUFBZSxDQUFDaGQsR0FBRyxDQUFDLENBQUE7T0FDOUQsQ0FBQSxDQUFBO01BQUErUCxlQUFBLENBQUFILEtBQUEsRUFBQSx1QkFBQSxFQUV1QixZQUFNO1FBQzVCQSxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRTBHLFFBQUFBLGFBQWEsRUFBRSxJQUFBO0VBQUssT0FBQyxDQUFDLENBQUE7UUFDdENoSSxLQUFBLENBQUtsUixLQUFLLENBQUNrckIsaUJBQWlCLElBQUloYSxLQUFBLENBQUtsUixLQUFLLENBQUNrckIsaUJBQWlCLEVBQUUsQ0FBQTtPQUMvRCxDQUFBLENBQUE7RUFBQTdaLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFVBQUNULEtBQUssRUFBRXpKLElBQUksRUFBSztRQUN0Q2tLLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFMEcsUUFBQUEsYUFBYSxFQUFFaVMsZUFBTyxDQUFDdHVCLE9BQU8sRUFBRSxFQUFFbUssSUFBSSxDQUFBO0VBQUUsT0FBQyxDQUFDLENBQUE7RUFDMUQsTUFBQSxDQUFDLENBQUNrSyxLQUFBLENBQUtsUixLQUFLLENBQUN5b0IsZ0JBQWdCLElBQUl2WCxLQUFBLENBQUtsUixLQUFLLENBQUN5b0IsZ0JBQWdCLENBQUNoWSxLQUFLLEVBQUV6SixJQUFJLENBQUMsQ0FBQTtPQUMxRSxDQUFBLENBQUE7RUFBQXFLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFVBQUNULEtBQUssRUFBRXpKLElBQUksRUFBSztFQUN0QyxNQUFBLENBQUMsQ0FBQ2tLLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBvQixnQkFBZ0IsSUFBSXhYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBvQixnQkFBZ0IsQ0FBQ2pZLEtBQUssRUFBRXpKLElBQUksQ0FBQyxDQUFBO09BQzFFLENBQUEsQ0FBQTtFQUFBcUssSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBSztFQUMzQixNQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUNvckIsWUFBWSxFQUFFO0VBQzNCbGEsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3JCLFlBQVksQ0FBQ2xzQixJQUFJLENBQUMsQ0FBQTtVQUM3QmdTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFNlksVUFBQUEsdUJBQXVCLEVBQUUsSUFBQTtFQUFLLFNBQUMsQ0FBQyxDQUFBO0VBQ2xELE9BQUE7RUFDQSxNQUFBLElBQUluYSxLQUFBLENBQUtsUixLQUFLLENBQUNxVixrQkFBa0IsRUFBRTtFQUNqQyxRQUFBLElBQUluRSxLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFRLEVBQUU7RUFDdkJyRSxVQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFRLENBQUNyVyxJQUFJLENBQUMsQ0FBQTtFQUMzQixTQUFBO0VBQ0EsUUFBQSxJQUFJZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd1YsT0FBTyxFQUFFO0VBQ3RCdEUsVUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQzFCLFNBQUE7RUFDRixPQUFBO0VBRUF0RSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxJQUFJbFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb2hCLGVBQWUsQ0FBQ2xpQixJQUFJLENBQUMsQ0FBQTtPQUMvRCxDQUFBLENBQUE7RUFBQW1TLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUNoUyxJQUFJLEVBQUs7RUFDNUJnUyxNQUFBQSxLQUFBLENBQUtvYSx1QkFBdUIsQ0FBQ3BzQixJQUFJLENBQUMsQ0FBQTtFQUNsQyxNQUFBLElBQUlnUyxLQUFBLENBQUtsUixLQUFLLENBQUNxVixrQkFBa0IsRUFBRTtFQUNqQyxRQUFBLElBQUluRSxLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFRLEVBQUU7RUFDdkJyRSxVQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFRLENBQUNyVyxJQUFJLENBQUMsQ0FBQTtFQUMzQixTQUFBO0VBQ0EsUUFBQSxJQUFJZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd1YsT0FBTyxFQUFFO0VBQ3RCdEUsVUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQzFCLFNBQUE7RUFDRixPQUFBO0VBRUF0RSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvaEIsZUFBZSxJQUFJbFEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb2hCLGVBQWUsQ0FBQ2xpQixJQUFJLENBQUMsQ0FBQTtPQUMvRCxDQUFBLENBQUE7RUFBQW1TLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV5Qix5QkFBQSxFQUFBLFVBQUNoUyxJQUFJLEVBQUs7RUFDbEMsTUFBQSxJQUFJZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXJCLGFBQWEsRUFBRTtFQUM1QnJhLFFBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VyQixhQUFhLENBQUNyc0IsSUFBSSxDQUFDLENBQUE7VUFDOUJnUyxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRTZZLFVBQUFBLHVCQUF1QixFQUFFLElBQUE7RUFBSyxTQUFDLENBQUMsQ0FBQTtFQUNsRCxPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBQUFoYSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFdUIsdUJBQUEsRUFBQSxVQUFDaFMsSUFBSSxFQUFLO0VBQ2hDZ1MsTUFBQUEsS0FBQSxDQUFLb0UsZ0JBQWdCLENBQUNwVyxJQUFJLENBQUMsQ0FBQTtFQUMzQmdTLE1BQUFBLEtBQUEsQ0FBSzhaLGlCQUFpQixDQUFDOXJCLElBQUksQ0FBQyxDQUFBO09BQzdCLENBQUEsQ0FBQTtFQUFBbVMsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVksWUFBQSxFQUFBLFVBQUNsSyxJQUFJLEVBQUs7RUFDckJrSyxNQUFBQSxLQUFBLENBQUtzQixRQUFRLENBQ1gsVUFBQXpOLEtBQUEsRUFBQTtFQUFBLFFBQUEsSUFBRzdGLElBQUksR0FBQTZGLEtBQUEsQ0FBSjdGLElBQUksQ0FBQTtVQUFBLE9BQVE7RUFDYkEsVUFBQUEsSUFBSSxFQUFFaXNCLGVBQU8sQ0FBQ2pzQixJQUFJLEVBQUU4SCxJQUFJLENBQUE7V0FDekIsQ0FBQTtFQUFBLE9BQUMsRUFDRixZQUFBO1VBQUEsT0FBTWtLLEtBQUEsQ0FBS29FLGdCQUFnQixDQUFDcEUsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUMsQ0FBQTtFQUFBLE9BQzlDLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtFQUFBbVMsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWEsYUFBQSxFQUFBLFVBQUMxTSxLQUFLLEVBQUs7RUFDdkIwTSxNQUFBQSxLQUFBLENBQUtzQixRQUFRLENBQ1gsVUFBQTdNLEtBQUEsRUFBQTtFQUFBLFFBQUEsSUFBR3pHLElBQUksR0FBQXlHLEtBQUEsQ0FBSnpHLElBQUksQ0FBQTtVQUFBLE9BQVE7RUFDYkEsVUFBQUEsSUFBSSxFQUFFdUYsaUJBQVEsQ0FBQ3ZGLElBQUksRUFBRXNGLEtBQUssQ0FBQTtXQUMzQixDQUFBO0VBQUEsT0FBQyxFQUNGLFlBQUE7VUFBQSxPQUFNME0sS0FBQSxDQUFLOFosaUJBQWlCLENBQUM5WixLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsT0FDL0MsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO0VBQUFtUyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDeUYsU0FBUyxFQUFLO0VBQy9CekYsTUFBQUEsS0FBQSxDQUFLc0IsUUFBUSxDQUNYLFVBQUEzTSxLQUFBLEVBQUE7RUFBQSxRQUFBLElBQUczRyxJQUFJLEdBQUEyRyxLQUFBLENBQUozRyxJQUFJLENBQUE7VUFBQSxPQUFRO0VBQ2JBLFVBQUFBLElBQUksRUFBRWlzQixlQUFPLENBQUMxbUIsaUJBQVEsQ0FBQ3ZGLElBQUksRUFBRXVILGlCQUFRLENBQUNrUSxTQUFTLENBQUMsQ0FBQyxFQUFFcFEsZUFBTyxDQUFDb1EsU0FBUyxDQUFDLENBQUE7V0FDdEUsQ0FBQTtFQUFBLE9BQUMsRUFDRixZQUFBO1VBQUEsT0FBTXpGLEtBQUEsQ0FBS3NhLHFCQUFxQixDQUFDdGEsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUMsQ0FBQTtFQUFBLE9BQ25ELENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBbVMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsUUFBQSxFQUVRLFlBQTRCO0VBQUEsTUFBQSxJQUEzQmhTLElBQUksR0FBQThGLFNBQUEsQ0FBQWhHLE1BQUEsUUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUdrTSxDQUFBQSxDQUFBQSxHQUFBQSxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQTtFQUM5QixNQUFBLElBQU15QyxXQUFXLEdBQUdGLGNBQWMsQ0FDaEN2QyxJQUFJLEVBQ0pnUyxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLEVBQ2pCMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQ2IsQ0FBQyxDQUFBO1FBRUQsSUFBTStwQixRQUFRLEdBQUcsRUFBRSxDQUFBO0VBQ25CLE1BQUEsSUFBSXZhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZnQixlQUFlLEVBQUU7RUFDOUI0SyxRQUFBQSxRQUFRLENBQUN4ZSxJQUFJLGVBQ1h5RSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUs5RSxVQUFBQSxHQUFHLEVBQUMsR0FBRztFQUFDUyxVQUFBQSxTQUFTLEVBQUMsNEJBQUE7V0FDcEI0RCxFQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUMwckIsU0FBUyxJQUFJLEdBQ3RCLENBQ1AsQ0FBQyxDQUFBO0VBQ0gsT0FBQTtRQUNBLE9BQU9ELFFBQVEsQ0FBQy9yQixNQUFNLENBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUNqQixHQUFHLENBQUMsVUFBQ3FnQixNQUFNLEVBQUs7RUFDcEMsUUFBQSxJQUFNeGQsR0FBRyxHQUFHeWQsZUFBTyxDQUFDcGQsV0FBVyxFQUFFbWQsTUFBTSxDQUFDLENBQUE7RUFDeEMsUUFBQSxJQUFNNk0sV0FBVyxHQUFHemEsS0FBQSxDQUFLMGEsYUFBYSxDQUFDdHFCLEdBQUcsRUFBRTRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sQ0FBQyxDQUFBO0VBRTlELFFBQUEsSUFBTXN1QixnQkFBZ0IsR0FBRzNhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZyQixnQkFBZ0IsR0FDaEQzYSxLQUFBLENBQUtsUixLQUFLLENBQUM2ckIsZ0JBQWdCLENBQUN2cUIsR0FBRyxDQUFDLEdBQ2hDMkQsU0FBUyxDQUFBO1VBRWIsb0JBQ0V5TSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0U5RSxVQUFBQSxHQUFHLEVBQUVpUyxNQUFPO1lBQ1osWUFBWXZnQixFQUFBQSxVQUFVLENBQUMrQyxHQUFHLEVBQUUsTUFBTSxFQUFFNFAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTSxDQUFFO0VBQ3ZEK1AsVUFBQUEsU0FBUyxFQUFFeUcsU0FBSSxDQUFDLDRCQUE0QixFQUFFOFgsZ0JBQWdCLENBQUE7RUFBRSxTQUFBLEVBRS9ERixXQUNFLENBQUMsQ0FBQTtFQUVWLE9BQUMsQ0FDSCxDQUFDLENBQUE7T0FDRixDQUFBLENBQUE7RUFBQXRhLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFZSxVQUFDNVAsR0FBRyxFQUFFL0QsTUFBTSxFQUFLO0VBQy9CLE1BQUEsSUFBSTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhyQixhQUFhLEVBQUU7VUFDNUIsT0FBTzNuQiwyQkFBMkIsQ0FBQzdDLEdBQUcsRUFBRTRQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhyQixhQUFhLEVBQUV2dUIsTUFBTSxDQUFDLENBQUE7RUFDM0UsT0FBQTtFQUNBLE1BQUEsT0FBTzJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytyQixnQkFBZ0IsR0FDOUJ6bkIsdUJBQXVCLENBQUNoRCxHQUFHLEVBQUUvRCxNQUFNLENBQUMsR0FDcEM4RyxxQkFBcUIsQ0FBQy9DLEdBQUcsRUFBRS9ELE1BQU0sQ0FBQyxDQUFBO09BQ3ZDLENBQUEsQ0FBQTtNQUFBOFQsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07RUFDbkJBLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBek0sS0FBQSxFQUFBO0VBQUEsUUFBQSxJQUFHN0csSUFBSSxHQUFBNkcsS0FBQSxDQUFKN0csSUFBSSxDQUFBO1VBQUEsT0FBUTtFQUNiQSxVQUFBQSxJQUFJLEVBQUV1TCxpQkFBUSxDQUNadkwsSUFBSSxFQUNKZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWMsR0FBRzlhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhLLGNBQWMsR0FBRyxDQUMxRCxDQUFBO1dBQ0QsQ0FBQTtFQUFBLE9BQUMsRUFDRixZQUFBO1VBQUEsT0FBTW9HLEtBQUEsQ0FBS29FLGdCQUFnQixDQUFDcEUsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUMsQ0FBQTtFQUFBLE9BQzlDLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBbVMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsb0JBQUEsRUFFb0IsWUFBTTtRQUN6QkEsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUUwRyxRQUFBQSxhQUFhLEVBQUUsSUFBQTtFQUFLLE9BQUMsQ0FBQyxDQUFBO09BQ3ZDLENBQUEsQ0FBQTtNQUFBN0gsZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsWUFBTTtFQUMzQixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lzQixrQkFBa0IsRUFBRTtFQUNqQyxRQUFBLE9BQUE7RUFDRixPQUFBO0VBRUEsTUFBQSxJQUFJQyxtQkFBbUIsQ0FBQTtFQUN2QixNQUFBLFFBQVEsSUFBSTtFQUNWLFFBQUEsS0FBS2hiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBbUI7RUFDakN3SCxVQUFBQSxtQkFBbUIsR0FBRzVoQixrQkFBa0IsQ0FBQzRHLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDckUsVUFBQSxNQUFBO0VBQ0YsUUFBQSxLQUFLa1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWM7RUFDNUJFLFVBQUFBLG1CQUFtQixHQUFHdmhCLG1CQUFtQixDQUFDdUcsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUN0RSxVQUFBLE1BQUE7RUFDRixRQUFBLEtBQUtrUixLQUFBLENBQUtsUixLQUFLLENBQUMya0IscUJBQXFCO0VBQ25DdUgsVUFBQUEsbUJBQW1CLEdBQUd2aUIscUJBQXFCLENBQ3pDdUgsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQ2ZnUyxLQUFBLENBQUtsUixLQUNQLENBQUMsQ0FBQTtFQUNELFVBQUEsTUFBQTtFQUNGLFFBQUE7RUFDRWtzQixVQUFBQSxtQkFBbUIsR0FBR2pqQixtQkFBbUIsQ0FBQ2lJLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDdEUsVUFBQSxNQUFBO0VBQ0osT0FBQTtRQUVBLElBQ0csQ0FBQ2tSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21zQix3QkFBd0IsSUFDbkMsQ0FBQ2piLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29zQiwyQkFBMkIsSUFDdkNGLG1CQUFtQixJQUNyQmhiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFDN0I7RUFDQSxRQUFBLE9BQUE7RUFDRixPQUFBO0VBRUEsTUFBQSxJQUFNaUYsV0FBVyxHQUFHLENBQ2xCLG1DQUFtQyxFQUNuQyw2Q0FBNkMsQ0FDOUMsQ0FBQTtFQUVELE1BQUEsSUFBTXpHLE9BQU8sR0FBRyxDQUNkLDhCQUE4QixFQUM5Qix3Q0FBd0MsQ0FDekMsQ0FBQTtFQUVELE1BQUEsSUFBSTBHLFlBQVksR0FBR3BiLEtBQUEsQ0FBS3FiLGFBQWEsQ0FBQTtFQUVyQyxNQUFBLElBQ0VyYixLQUFBLENBQUtsUixLQUFLLENBQUMwa0IsbUJBQW1CLElBQzlCeFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLHFCQUFxQixJQUNoQ3pULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dzQixjQUFjLEVBQ3pCO1VBQ0FNLFlBQVksR0FBR3BiLEtBQUEsQ0FBS3NiLFlBQVksQ0FBQTtFQUNsQyxPQUFBO0VBRUEsTUFBQSxJQUFJTixtQkFBbUIsSUFBSWhiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29zQiwyQkFBMkIsRUFBRTtFQUNqRXhHLFFBQUFBLE9BQU8sQ0FBQzNZLElBQUksQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO0VBQ2hFcWYsUUFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQTtFQUNyQixPQUFBO0VBRUEsTUFBQSxJQUFNRyxTQUFTLEdBQ2J2YixLQUFBLENBQUtsUixLQUFLLENBQUMwa0IsbUJBQW1CLElBQzlCeFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLHFCQUFxQixJQUNoQ3pULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dzQixjQUFjLENBQUE7RUFFM0IsTUFBQSxJQUFBeFQsWUFBQSxHQUE4RHRILEtBQUEsQ0FBS2xSLEtBQUs7VUFBaEUwc0Isd0JBQXdCLEdBQUFsVSxZQUFBLENBQXhCa1Usd0JBQXdCO1VBQUVDLHVCQUF1QixHQUFBblUsWUFBQSxDQUF2Qm1VLHVCQUF1QixDQUFBO0VBRXpELE1BQUEsSUFBQWhVLFlBQUEsR0FPSXpILEtBQUEsQ0FBS2xSLEtBQUs7VUFBQTRzQixxQkFBQSxHQUFBalUsWUFBQSxDQU5aa1Usc0JBQXNCO0VBQXRCQSxRQUFBQSxzQkFBc0IsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxPQUFPRix3QkFBd0IsS0FBSyxRQUFRLEdBQ2pFQSx3QkFBd0IsR0FDeEIsZ0JBQWdCLEdBQUFFLHFCQUFBO1VBQUFFLHNCQUFBLEdBQUFuVSxZQUFBLENBQ3BCb1UscUJBQXFCO0VBQXJCQSxRQUFBQSxxQkFBcUIsR0FBQUQsc0JBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxPQUFPSCx1QkFBdUIsS0FBSyxRQUFRLEdBQy9EQSx1QkFBdUIsR0FDdkIsZUFBZSxHQUFBRyxzQkFBQSxDQUFBO1FBR3JCLG9CQUNFcGIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFZ1ksUUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYnJjLFFBQUFBLFNBQVMsRUFBRXNZLE9BQU8sQ0FBQzdtQixJQUFJLENBQUMsR0FBRyxDQUFFO0VBQzdCNlMsUUFBQUEsT0FBTyxFQUFFMGEsWUFBYTtFQUN0QnJQLFFBQUFBLFNBQVMsRUFBRS9MLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBYLGVBQWdCO1VBQ3RDLFlBQVkrVSxFQUFBQSxTQUFTLEdBQUdNLHFCQUFxQixHQUFHRixzQkFBQUE7U0FFaERuYixlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1yRSxRQUFBQSxTQUFTLEVBQUUrZSxXQUFXLENBQUN0dEIsSUFBSSxDQUFDLEdBQUcsQ0FBQTtFQUFFLE9BQUEsRUFDcEMwdEIsU0FBUyxHQUNOdmIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMnNCLHVCQUF1QixHQUNsQ3piLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBzQix3QkFDWCxDQUNBLENBQUMsQ0FBQTtPQUVaLENBQUEsQ0FBQTtNQUFBcmIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07RUFDbkJBLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBeE0sS0FBQSxFQUFBO0VBQUEsUUFBQSxJQUFHOUcsSUFBSSxHQUFBOEcsS0FBQSxDQUFKOUcsSUFBSSxDQUFBO1VBQUEsT0FBUTtFQUNiQSxVQUFBQSxJQUFJLEVBQUVvTSxpQkFBUSxDQUNacE0sSUFBSSxFQUNKZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWMsR0FBRzlhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhLLGNBQWMsR0FBRyxDQUMxRCxDQUFBO1dBQ0QsQ0FBQTtFQUFBLE9BQUMsRUFDRixZQUFBO1VBQUEsT0FBTW9HLEtBQUEsQ0FBS29FLGdCQUFnQixDQUFDcEUsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUMsQ0FBQTtFQUFBLE9BQzlDLENBQUMsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBbVMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtFQUN2QixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lzQixrQkFBa0IsRUFBRTtFQUNqQyxRQUFBLE9BQUE7RUFDRixPQUFBO0VBRUEsTUFBQSxJQUFJZSxtQkFBbUIsQ0FBQTtFQUN2QixNQUFBLFFBQVEsSUFBSTtFQUNWLFFBQUEsS0FBSzliLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBbUI7RUFDakNzSSxVQUFBQSxtQkFBbUIsR0FBRzdoQixpQkFBaUIsQ0FBQytGLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDcEUsVUFBQSxNQUFBO0VBQ0YsUUFBQSxLQUFLa1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWM7RUFDNUJnQixVQUFBQSxtQkFBbUIsR0FBR3poQixrQkFBa0IsQ0FBQzJGLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDckUsVUFBQSxNQUFBO0VBQ0YsUUFBQSxLQUFLa1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLHFCQUFxQjtFQUNuQ3FJLFVBQUFBLG1CQUFtQixHQUFHL2lCLG9CQUFvQixDQUFDaUgsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUN2RSxVQUFBLE1BQUE7RUFDRixRQUFBO0VBQ0VndEIsVUFBQUEsbUJBQW1CLEdBQUd6akIsa0JBQWtCLENBQUMySCxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksRUFBRWdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBQ3JFLFVBQUEsTUFBQTtFQUNKLE9BQUE7UUFFQSxJQUNHLENBQUNrUixLQUFBLENBQUtsUixLQUFLLENBQUNtc0Isd0JBQXdCLElBQ25DLENBQUNqYixLQUFBLENBQUtsUixLQUFLLENBQUNvc0IsMkJBQTJCLElBQ3ZDWSxtQkFBbUIsSUFDckI5YixLQUFBLENBQUtsUixLQUFLLENBQUNvbkIsa0JBQWtCLEVBQzdCO0VBQ0EsUUFBQSxPQUFBO0VBQ0YsT0FBQTtFQUVBLE1BQUEsSUFBTXhCLE9BQU8sR0FBRyxDQUNkLDhCQUE4QixFQUM5QixvQ0FBb0MsQ0FDckMsQ0FBQTtFQUNELE1BQUEsSUFBTXlHLFdBQVcsR0FBRyxDQUNsQixtQ0FBbUMsRUFDbkMseUNBQXlDLENBQzFDLENBQUE7RUFDRCxNQUFBLElBQUluYixLQUFBLENBQUtsUixLQUFLLENBQUNpdEIsY0FBYyxFQUFFO0VBQzdCckgsUUFBQUEsT0FBTyxDQUFDM1ksSUFBSSxDQUFDLCtDQUErQyxDQUFDLENBQUE7RUFDL0QsT0FBQTtFQUNBLE1BQUEsSUFBSWlFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21uQixXQUFXLEVBQUU7RUFDMUJ2QixRQUFBQSxPQUFPLENBQUMzWSxJQUFJLENBQUMsdURBQXVELENBQUMsQ0FBQTtFQUN2RSxPQUFBO0VBRUEsTUFBQSxJQUFJcWYsWUFBWSxHQUFHcGIsS0FBQSxDQUFLZ2MsYUFBYSxDQUFBO0VBRXJDLE1BQUEsSUFDRWhjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBbUIsSUFDOUJ4VCxLQUFBLENBQUtsUixLQUFLLENBQUMya0IscUJBQXFCLElBQ2hDelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWMsRUFDekI7VUFDQU0sWUFBWSxHQUFHcGIsS0FBQSxDQUFLaWMsWUFBWSxDQUFBO0VBQ2xDLE9BQUE7RUFFQSxNQUFBLElBQUlILG1CQUFtQixJQUFJOWIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3NCLDJCQUEyQixFQUFFO0VBQ2pFeEcsUUFBQUEsT0FBTyxDQUFDM1ksSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUE7RUFDNURxZixRQUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFBO0VBQ3JCLE9BQUE7RUFFQSxNQUFBLElBQU1HLFNBQVMsR0FDYnZiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBbUIsSUFDOUJ4VCxLQUFBLENBQUtsUixLQUFLLENBQUMya0IscUJBQXFCLElBQ2hDelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWMsQ0FBQTtFQUUzQixNQUFBLElBQUFuVCxZQUFBLEdBQXNEM0gsS0FBQSxDQUFLbFIsS0FBSztVQUF4RG90QixvQkFBb0IsR0FBQXZVLFlBQUEsQ0FBcEJ1VSxvQkFBb0I7VUFBRUMsbUJBQW1CLEdBQUF4VSxZQUFBLENBQW5Cd1UsbUJBQW1CLENBQUE7RUFDakQsTUFBQSxJQUFBaFUsWUFBQSxHQU9JbkksS0FBQSxDQUFLbFIsS0FBSztVQUFBc3RCLHFCQUFBLEdBQUFqVSxZQUFBLENBTlprVSxrQkFBa0I7RUFBbEJBLFFBQUFBLGtCQUFrQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLE9BQU9GLG9CQUFvQixLQUFLLFFBQVEsR0FDekRBLG9CQUFvQixHQUNwQixZQUFZLEdBQUFFLHFCQUFBO1VBQUFFLHFCQUFBLEdBQUFuVSxZQUFBLENBQ2hCb1UsaUJBQWlCO0VBQWpCQSxRQUFBQSxpQkFBaUIsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxPQUFPSCxtQkFBbUIsS0FBSyxRQUFRLEdBQ3ZEQSxtQkFBbUIsR0FDbkIsV0FBVyxHQUFBRyxxQkFBQSxDQUFBO1FBR2pCLG9CQUNFOWIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFZ1ksUUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYnJjLFFBQUFBLFNBQVMsRUFBRXNZLE9BQU8sQ0FBQzdtQixJQUFJLENBQUMsR0FBRyxDQUFFO0VBQzdCNlMsUUFBQUEsT0FBTyxFQUFFMGEsWUFBYTtFQUN0QnJQLFFBQUFBLFNBQVMsRUFBRS9MLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBYLGVBQWdCO1VBQ3RDLFlBQVkrVSxFQUFBQSxTQUFTLEdBQUdnQixpQkFBaUIsR0FBR0Ysa0JBQUFBO1NBRTVDN2IsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNckUsUUFBQUEsU0FBUyxFQUFFK2UsV0FBVyxDQUFDdHRCLElBQUksQ0FBQyxHQUFHLENBQUE7RUFBRSxPQUFBLEVBQ3BDMHRCLFNBQVMsR0FDTnZiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3F0QixtQkFBbUIsR0FDOUJuYyxLQUFBLENBQUtsUixLQUFLLENBQUNvdEIsb0JBQ1gsQ0FDQSxDQUFDLENBQUE7T0FFWixDQUFBLENBQUE7TUFBQS9iLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW9CLFlBQTRCO0VBQUEsTUFBQSxJQUEzQmhTLElBQUksR0FBQThGLFNBQUEsQ0FBQWhHLE1BQUEsUUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUdrTSxDQUFBQSxDQUFBQSxHQUFBQSxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQTtFQUMxQyxNQUFBLElBQU0wbUIsT0FBTyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtFQUVuRCxNQUFBLElBQUkxVSxLQUFBLENBQUtsUixLQUFLLENBQUMwdEIsZ0JBQWdCLEVBQUU7RUFDL0I5SCxRQUFBQSxPQUFPLENBQUMzWSxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQTtFQUNsRSxPQUFBO0VBQ0EsTUFBQSxJQUFJaUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMnRCLGlCQUFpQixFQUFFO0VBQ2hDL0gsUUFBQUEsT0FBTyxDQUFDM1ksSUFBSSxDQUFDLG1EQUFtRCxDQUFDLENBQUE7RUFDbkUsT0FBQTtFQUNBLE1BQUEsSUFBSWlFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzR0QixxQkFBcUIsRUFBRTtFQUNwQ2hJLFFBQUFBLE9BQU8sQ0FBQzNZLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0VBQ3ZFLE9BQUE7UUFDQSxvQkFDRXlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBRXNZLE9BQU8sQ0FBQzdtQixJQUFJLENBQUMsR0FBRyxDQUFBO0VBQUUsT0FBQSxFQUMvQlIsVUFBVSxDQUFDVyxJQUFJLEVBQUVnUyxLQUFBLENBQUtsUixLQUFLLENBQUMxQyxVQUFVLEVBQUU0VCxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUFNLENBQ3ZELENBQUMsQ0FBQTtPQUVULENBQUEsQ0FBQTtNQUFBOFQsZUFBQSxDQUFBSCxLQUFBLEVBQUEsb0JBQUEsRUFFb0IsWUFBMEI7RUFBQSxNQUFBLElBQXpCMmMsWUFBWSxHQUFBN29CLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEtBQUssQ0FBQTtRQUN4QyxJQUFJLENBQUNrTSxLQUFBLENBQUtsUixLQUFLLENBQUMwdEIsZ0JBQWdCLElBQUlHLFlBQVksRUFBRTtFQUNoRCxRQUFBLE9BQUE7RUFDRixPQUFBO0VBQ0EsTUFBQSxvQkFDRW5jLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBDLFlBQVksRUFBQTtFQUNYZ0IsUUFBQUEsa0JBQWtCLEVBQUVuRSxLQUFBLENBQUtsUixLQUFLLENBQUNxVixrQkFBbUI7RUFDbERuVyxRQUFBQSxJQUFJLEVBQUVnUyxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUs7RUFDdEJxVyxRQUFBQSxRQUFRLEVBQUVyRSxLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFTO0VBQzlCQyxRQUFBQSxPQUFPLEVBQUV0RSxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFRO0VBQzVCRSxRQUFBQSxZQUFZLEVBQUV4RSxLQUFBLENBQUtsUixLQUFLLENBQUMwVixZQUFhO1VBQ3RDN0QsUUFBUSxFQUFFWCxLQUFBLENBQUs0YyxVQUFXO0VBQzFCcndCLFFBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO1VBQzVCOEIsSUFBSSxFQUFFVCxlQUFPLENBQUMySyxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBRTtFQUMvQnlULFFBQUFBLHNCQUFzQixFQUFFekIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMlMsc0JBQXVCO0VBQzFERCxRQUFBQSxzQkFBc0IsRUFBRXhCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBTLHNCQUFBQTtFQUF1QixPQUMzRCxDQUFDLENBQUE7T0FFTCxDQUFBLENBQUE7TUFBQXJCLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHFCQUFBLEVBRXFCLFlBQTBCO0VBQUEsTUFBQSxJQUF6QjJjLFlBQVksR0FBQTdvQixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxLQUFLLENBQUE7UUFDekMsSUFBSSxDQUFDa00sS0FBQSxDQUFLbFIsS0FBSyxDQUFDMnRCLGlCQUFpQixJQUFJRSxZQUFZLEVBQUU7RUFDakQsUUFBQSxPQUFBO0VBQ0YsT0FBQTtFQUNBLE1BQUEsb0JBQ0VuYyxzQkFBQSxDQUFBQyxhQUFBLENBQUNzRSxhQUFhLEVBQUE7RUFDWlAsUUFBQUEsWUFBWSxFQUFFeEUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFYsWUFBYTtFQUN0Q25ZLFFBQUFBLE1BQU0sRUFBRTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU87VUFDMUJzVSxRQUFRLEVBQUVYLEtBQUEsQ0FBSzZjLFdBQVk7VUFDM0J2cEIsS0FBSyxFQUFFaUMsaUJBQVEsQ0FBQ3lLLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFFO0VBQ2pDa1gsUUFBQUEsdUJBQXVCLEVBQUVsRixLQUFBLENBQUtsUixLQUFLLENBQUNvVyx1QkFBQUE7RUFBd0IsT0FDN0QsQ0FBQyxDQUFBO09BRUwsQ0FBQSxDQUFBO01BQUEvRSxlQUFBLENBQUFILEtBQUEsRUFBQSx5QkFBQSxFQUV5QixZQUEwQjtFQUFBLE1BQUEsSUFBekIyYyxZQUFZLEdBQUE3b0IsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsS0FBSyxDQUFBO1FBQzdDLElBQUksQ0FBQ2tNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzR0QixxQkFBcUIsSUFBSUMsWUFBWSxFQUFFO0VBQ3JELFFBQUEsT0FBQTtFQUNGLE9BQUE7RUFDQSxNQUFBLG9CQUNFbmMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUYsaUJBQWlCLEVBQUE7RUFDaEJ0QixRQUFBQSxZQUFZLEVBQUV4RSxLQUFBLENBQUtsUixLQUFLLENBQUMwVixZQUFhO0VBQ3RDblksUUFBQUEsTUFBTSxFQUFFMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTztFQUMxQkQsUUFBQUEsVUFBVSxFQUFFNFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMUMsVUFBVztVQUNsQ3VVLFFBQVEsRUFBRVgsS0FBQSxDQUFLOGMsZUFBZ0I7RUFDL0J2d0IsUUFBQUEsT0FBTyxFQUFFeVQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FBUTtFQUM1QnlILFFBQUFBLE9BQU8sRUFBRWdNLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQVE7RUFDNUJoRyxRQUFBQSxJQUFJLEVBQUVnUyxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUs7RUFDdEI0WCxRQUFBQSwyQkFBMkIsRUFBRTVGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhXLDJCQUFBQTtFQUE0QixPQUNyRSxDQUFDLENBQUE7T0FFTCxDQUFBLENBQUE7RUFBQXpGLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV3Qix3QkFBQSxFQUFBLFVBQUN3RCxDQUFDLEVBQUs7UUFDOUJ4RCxLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFRLENBQUNwVCxlQUFlLEVBQUUsRUFBRXVTLENBQUMsQ0FBQyxDQUFBO0VBQ3pDeEQsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb2hCLGVBQWUsSUFBSWxRLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFlLENBQUNqZixlQUFlLEVBQUUsQ0FBQyxDQUFBO09BQzVFLENBQUEsQ0FBQTtNQUFBa1AsZUFBQSxDQUFBSCxLQUFBLEVBQUEsbUJBQUEsRUFFbUIsWUFBTTtFQUN4QixNQUFBLElBQUksQ0FBQ0EsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbW5CLFdBQVcsSUFBSWpXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFBRTtFQUM1RCxRQUFBLE9BQUE7RUFDRixPQUFBO1FBQ0Esb0JBQ0UxVixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUMsZ0NBQWdDO1VBQzFDc0UsT0FBTyxFQUFFLFNBQUFBLE9BQUFBLENBQUM4QyxDQUFDLEVBQUE7RUFBQSxVQUFBLE9BQUt4RCxLQUFBLENBQUsrYyxzQkFBc0IsQ0FBQ3ZaLENBQUMsQ0FBQyxDQUFBO0VBQUEsU0FBQTtFQUFDLE9BQUEsRUFFOUN4RCxLQUFBLENBQUtsUixLQUFLLENBQUNtbkIsV0FDVCxDQUFDLENBQUE7T0FFVCxDQUFBLENBQUE7RUFBQTlWLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUFoTCxLQUFBLEVBQUE7RUFBQSxNQUFBLElBQUdnb0IsU0FBUyxHQUFBaG9CLEtBQUEsQ0FBVGdvQixTQUFTO1VBQUV6aEIsQ0FBQyxHQUFBdkcsS0FBQSxDQUFEdUcsQ0FBQyxDQUFBO1FBQUEsb0JBQ25DaUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtVQUNFckUsU0FBUyxFQUFBLDJCQUFBLENBQUE1TixNQUFBLENBQ1B3UixLQUFBLENBQUtsUixLQUFLLENBQUNpdEIsY0FBYyxHQUNyQiwyQ0FBMkMsR0FDM0MsRUFBRSxDQUFBO1NBR1AvYixFQUFBQSxLQUFBLENBQUtpZCxrQkFBa0IsQ0FBQ0QsU0FBUyxDQUFDLGVBQ25DeGMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtVQUNFckUsU0FBUyxFQUFBLHlFQUFBLENBQUE1TixNQUFBLENBQTRFd1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMFYsWUFBWSxDQUFHO1VBQy9HMFksT0FBTyxFQUFFbGQsS0FBQSxDQUFLbWQsbUJBQUFBO0VBQW9CLE9BQUEsRUFFakNuZCxLQUFBLENBQUtvZCxtQkFBbUIsQ0FBQzdoQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ2pDeUUsS0FBQSxDQUFLcWQsdUJBQXVCLENBQUM5aEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNyQ3lFLEtBQUEsQ0FBS3NkLGtCQUFrQixDQUFDL2hCLENBQUMsS0FBSyxDQUFDLENBQzdCLENBQUMsZUFDTmlGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBQyw2QkFBQTtFQUE2QixPQUFBLEVBQ3pDNEQsS0FBQSxDQUFLeVUsTUFBTSxDQUFDdUksU0FBUyxDQUNuQixDQUNGLENBQUMsQ0FBQTtPQUNQLENBQUEsQ0FBQTtNQUFBN2MsZUFBQSxDQUFBSCxLQUFBLEVBQUEsb0JBQUEsRUFFb0IsWUFBcUI7RUFBQSxNQUFBLElBQXBCdWQsVUFBVSxHQUFBenBCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEVBQUUsQ0FBQTtFQUNuQyxNQUFBLElBQVFrcEIsU0FBUyxHQUFRTyxVQUFVLENBQTNCUCxTQUFTO1VBQUV6aEIsQ0FBQyxHQUFLZ2lCLFVBQVUsQ0FBaEJoaUIsQ0FBQyxDQUFBO0VBRXBCLE1BQUEsSUFDR3lFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2l0QixjQUFjLElBQUksQ0FBQy9iLEtBQUEsQ0FBS00sS0FBSyxDQUFDa2QsY0FBYyxJQUN4RHhkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFDN0I7RUFDQSxRQUFBLE9BQU8sSUFBSSxDQUFBO0VBQ2IsT0FBQTtFQUVBLE1BQUEsSUFBTXVILHVCQUF1QixHQUFHMWxCLG1CQUFtQixDQUNqRGlJLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUNmZ1MsS0FBQSxDQUFLbFIsS0FDUCxDQUFDLENBQUE7RUFFRCxNQUFBLElBQU00dUIsdUJBQXVCLEdBQUdybEIsa0JBQWtCLENBQ2hEMkgsS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLEVBQ2ZnUyxLQUFBLENBQUtsUixLQUNQLENBQUMsQ0FBQTtFQUVELE1BQUEsSUFBTTZ1QixzQkFBc0IsR0FBR3ZrQixrQkFBa0IsQ0FDL0M0RyxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksRUFDZmdTLEtBQUEsQ0FBS2xSLEtBQ1AsQ0FBQyxDQUFBO0VBRUQsTUFBQSxJQUFNOHVCLHNCQUFzQixHQUFHM2pCLGlCQUFpQixDQUM5QytGLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUNmZ1MsS0FBQSxDQUFLbFIsS0FDUCxDQUFDLENBQUE7UUFFRCxJQUFNK3VCLFlBQVksR0FDaEIsQ0FBQzdkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBbUIsSUFDL0IsQ0FBQ3hULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixxQkFBcUIsSUFDakMsQ0FBQ3pULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dzQixjQUFjLENBQUE7UUFFNUIsb0JBQ0V0YSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUMsMkRBQTJEO0VBQ3JFOGdCLFFBQUFBLE9BQU8sRUFBRWxkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhxQixlQUFBQTtFQUFnQixPQUFBLEVBRW5DNVosS0FBQSxDQUFLbFIsS0FBSyxDQUFDaXNCLGtCQUFrQixDQUFBK0MsY0FBQSxDQUFBQSxjQUFBLENBQUEsRUFBQSxFQUN6QjlkLEtBQUEsQ0FBS00sS0FBSyxDQUFBLEVBQUEsRUFBQSxFQUFBO0VBQ2J5ZCxRQUFBQSxpQkFBaUIsRUFBRXhpQixDQUFDO0VBQ3BCeWhCLFFBQUFBLFNBQVMsRUFBVEEsU0FBUztVQUNUSCxXQUFXLEVBQUU3YyxLQUFBLENBQUs2YyxXQUFXO1VBQzdCRCxVQUFVLEVBQUU1YyxLQUFBLENBQUs0YyxVQUFVO1VBQzNCdkIsYUFBYSxFQUFFcmIsS0FBQSxDQUFLcWIsYUFBYTtVQUNqQ1csYUFBYSxFQUFFaGMsS0FBQSxDQUFLZ2MsYUFBYTtVQUNqQ1YsWUFBWSxFQUFFdGIsS0FBQSxDQUFLc2IsWUFBWTtVQUMvQlcsWUFBWSxFQUFFamMsS0FBQSxDQUFLaWMsWUFBWTtFQUMvQndCLFFBQUFBLHVCQUF1QixFQUF2QkEsdUJBQXVCO0VBQ3ZCQyxRQUFBQSx1QkFBdUIsRUFBdkJBLHVCQUF1QjtFQUN2QkMsUUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFBc0I7RUFDdEJDLFFBQUFBLHNCQUFzQixFQUF0QkEsc0JBQUFBO0VBQXNCLE9BQUEsQ0FDdkIsQ0FBQyxFQUNEQyxZQUFZLGlCQUNYcmQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLDZCQUFBO0VBQTZCLE9BQUEsRUFDekM0RCxLQUFBLENBQUt5VSxNQUFNLENBQUN1SSxTQUFTLENBQ25CLENBRUosQ0FBQyxDQUFBO09BRVQsQ0FBQSxDQUFBO0VBQUE3YyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxVQUFBcEssS0FBQSxFQUFtQjtFQUFBLE1BQUEsSUFBaEJvbkIsU0FBUyxHQUFBcG5CLEtBQUEsQ0FBVG9uQixTQUFTLENBQUE7RUFDN0IsTUFBQSxJQUFBM1UsWUFBQSxHQUEyQ3JJLEtBQUEsQ0FBS2xSLEtBQUs7VUFBN0Nnc0IsY0FBYyxHQUFBelMsWUFBQSxDQUFkeVMsY0FBYztVQUFFbGhCLGNBQWMsR0FBQXlPLFlBQUEsQ0FBZHpPLGNBQWMsQ0FBQTtFQUN0QyxNQUFBLElBQUFDLGVBQUEsR0FBbUNDLGNBQWMsQ0FDL0NrakIsU0FBUyxFQUNUcGpCLGNBQ0YsQ0FBQztVQUhPYSxXQUFXLEdBQUFaLGVBQUEsQ0FBWFksV0FBVztVQUFFVixTQUFTLEdBQUFGLGVBQUEsQ0FBVEUsU0FBUyxDQUFBO1FBSTlCLG9CQUNFeUcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLckUsUUFBQUEsU0FBUyxFQUFDLHVEQUFBO0VBQXVELE9BQUEsRUFDbkUwZSxjQUFjLEdBQUEsRUFBQSxDQUFBdHNCLE1BQUEsQ0FBTWlNLFdBQVcsRUFBQWpNLEtBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBTXVMLFNBQVMsQ0FBSzFFLEdBQUFBLGVBQU8sQ0FBQzJuQixTQUFTLENBQ2xFLENBQUMsQ0FBQTtPQUVULENBQUEsQ0FBQTtFQUFBN2MsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWMsY0FBQSxFQUFBLFVBQUN1ZCxVQUFVLEVBQUs7RUFDN0IsTUFBQSxRQUFRLElBQUk7RUFDVixRQUFBLEtBQUt2ZCxLQUFBLENBQUtsUixLQUFLLENBQUNpc0Isa0JBQWtCLEtBQUtobkIsU0FBUztFQUM5QyxVQUFBLE9BQU9pTSxLQUFBLENBQUsrYSxrQkFBa0IsQ0FBQ3dDLFVBQVUsQ0FBQyxDQUFBO0VBQzVDLFFBQUEsS0FBS3ZkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBbUIsSUFDakN4VCxLQUFBLENBQUtsUixLQUFLLENBQUMya0IscUJBQXFCLElBQ2hDelQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWM7RUFDekIsVUFBQSxPQUFPOWEsS0FBQSxDQUFLZ2UsZ0JBQWdCLENBQUNULFVBQVUsQ0FBQyxDQUFBO0VBQzFDLFFBQUE7RUFDRSxVQUFBLE9BQU92ZCxLQUFBLENBQUtpZSxtQkFBbUIsQ0FBQ1YsVUFBVSxDQUFDLENBQUE7RUFDL0MsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBcGQsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07RUFBQSxNQUFBLElBQUFrZSxxQkFBQSxDQUFBO1FBQ25CLElBQUlsZSxLQUFBLENBQUtsUixLQUFLLENBQUNvbkIsa0JBQWtCLElBQUlsVyxLQUFBLENBQUtsUixLQUFLLENBQUNnc0IsY0FBYyxFQUFFO0VBQzlELFFBQUEsT0FBQTtFQUNGLE9BQUE7UUFFQSxJQUFNcUQsU0FBUyxHQUFHLEVBQUUsQ0FBQTtFQUNwQixNQUFBLElBQU1DLGdCQUFnQixHQUFHcGUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXZCLGtCQUFrQixHQUNsRHJlLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3d2QixXQUFXLEdBQUcsQ0FBQyxHQUMxQixDQUFDLENBQUE7RUFDTCxNQUFBLElBQU1DLGFBQWEsR0FDakJ2ZSxLQUFBLENBQUtsUixLQUFLLENBQUMwa0IsbUJBQW1CLElBQUl4VCxLQUFBLENBQUtsUixLQUFLLENBQUMya0IscUJBQXFCLEdBQzlEclosaUJBQVEsQ0FBQzRGLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUFFb3dCLGdCQUFnQixDQUFDLEdBQzNDbG1CLG1CQUFTLENBQUM4SCxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksRUFBRW93QixnQkFBZ0IsQ0FBQyxDQUFBO0VBQ2xELE1BQUEsSUFBTXJFLGVBQWUsR0FBQSxDQUFBbUUscUJBQUEsR0FBR2xlLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lyQixlQUFlLE1BQUFtRSxJQUFBQSxJQUFBQSxxQkFBQSxLQUFBQSxLQUFBQSxDQUFBQSxHQUFBQSxxQkFBQSxHQUFJRSxnQkFBZ0IsQ0FBQTtFQUN0RSxNQUFBLEtBQUssSUFBSTdpQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUd5RSxLQUFBLENBQUtsUixLQUFLLENBQUN3dkIsV0FBVyxFQUFFLEVBQUUvaUIsQ0FBQyxFQUFFO0VBQy9DLFFBQUEsSUFBTWlqQixXQUFXLEdBQUdqakIsQ0FBQyxHQUFHd2UsZUFBZSxHQUFHcUUsZ0JBQWdCLENBQUE7VUFDMUQsSUFBTXBCLFNBQVMsR0FDYmhkLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBbUIsSUFBSXhULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixxQkFBcUIsR0FDOURyWixpQkFBUSxDQUFDbWtCLGFBQWEsRUFBRUMsV0FBVyxDQUFDLEdBQ3BDaG1CLG1CQUFTLENBQUMrbEIsYUFBYSxFQUFFQyxXQUFXLENBQUMsQ0FBQTtFQUMzQyxRQUFBLElBQU1DLFFBQVEsR0FBQSxRQUFBLENBQUFqd0IsTUFBQSxDQUFZK00sQ0FBQyxDQUFFLENBQUE7VUFDN0IsSUFBTWlRLDBCQUEwQixHQUFHalEsQ0FBQyxHQUFHeUUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd3ZCLFdBQVcsR0FBRyxDQUFDLENBQUE7RUFDakUsUUFBQSxJQUFNN1MsNEJBQTRCLEdBQUdsUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0VBQzFDNGlCLFFBQUFBLFNBQVMsQ0FBQ3BpQixJQUFJLGVBQ1p5RSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0U5RSxVQUFBQSxHQUFHLEVBQUU4aUIsUUFBUztFQUNkM2IsVUFBQUEsR0FBRyxFQUFFLFNBQUFBLEdBQUM0YixDQUFBQSxHQUFHLEVBQUs7Y0FDWjFlLEtBQUEsQ0FBS3dkLGNBQWMsR0FBR2tCLEdBQUcsQ0FBQTthQUN6QjtFQUNGdGlCLFVBQUFBLFNBQVMsRUFBQyxtQ0FBQTtXQUVUNEQsRUFBQUEsS0FBQSxDQUFLMmUsWUFBWSxDQUFDO0VBQUUzQixVQUFBQSxTQUFTLEVBQVRBLFNBQVM7RUFBRXpoQixVQUFBQSxDQUFDLEVBQURBLENBQUFBO0VBQUUsU0FBQyxDQUFDLGVBQ3BDaUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDc08sS0FBSyxFQUFBO0VBQ0pqQixVQUFBQSx3QkFBd0IsRUFBRTlOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dmLHdCQUF5QjtFQUM5REMsVUFBQUEsMEJBQTBCLEVBQUUvTixLQUFBLENBQUtsUixLQUFLLENBQUNpZiwwQkFBMkI7RUFDbEUyQixVQUFBQSxtQkFBbUIsRUFBRTFQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzRnQixtQkFBb0I7RUFDcEQxQyxVQUFBQSxlQUFlLEVBQUVoTixLQUFBLENBQUtsUixLQUFLLENBQUM4dkIsb0JBQXFCO1lBQ2pEamUsUUFBUSxFQUFFWCxLQUFBLENBQUs4YyxlQUFnQjtFQUMvQjFzQixVQUFBQSxHQUFHLEVBQUU0c0IsU0FBVTtFQUNmclUsVUFBQUEsWUFBWSxFQUFFM0ksS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlosWUFBYTtFQUN0Q25ZLFVBQUFBLGdCQUFnQixFQUFFd1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQWlCO0VBQzlDc2dCLFVBQUFBLGNBQWMsRUFBRTlRLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dpQixjQUFlO1lBQzFDM0QsVUFBVSxFQUFFbk4sS0FBQSxDQUFLc04sY0FBZTtFQUNoQzlHLFVBQUFBLGVBQWUsRUFBRXhHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyt2QixrQkFBbUI7RUFDL0N6TyxVQUFBQSxvQkFBb0IsRUFBRXBRLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBYLGVBQWdCO0VBQ2pEeUYsVUFBQUEsZUFBZSxFQUFFak0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWQsZUFBZ0I7WUFDNUNtQixlQUFlLEVBQUVwTixLQUFBLENBQUtpTyxtQkFBb0I7WUFDMUNnQixZQUFZLEVBQUVqUCxLQUFBLENBQUs4ZSxxQkFBc0I7RUFDekN6UixVQUFBQSxZQUFZLEVBQUVyTixLQUFBLENBQUtsUixLQUFLLENBQUN1ZSxZQUFhO0VBQ3RDMkIsVUFBQUEsY0FBYyxFQUFFelQsQ0FBRTtFQUNsQmlTLFVBQUFBLGdCQUFnQixFQUFFeE4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGUsZ0JBQWlCO0VBQzlDbmhCLFVBQUFBLE1BQU0sRUFBRTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU87RUFDMUJFLFVBQUFBLE9BQU8sRUFBRXlULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQVE7RUFDNUJ5SCxVQUFBQSxPQUFPLEVBQUVnTSxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUFRO0VBQzVCQyxVQUFBQSxZQUFZLEVBQUUrTCxLQUFBLENBQUtsUixLQUFLLENBQUNtRixZQUFhO0VBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRThMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29GLG9CQUFxQjtFQUN0RGlILFVBQUFBLGNBQWMsRUFBRTZFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FNLGNBQWU7RUFDMUNvTSxVQUFBQSxRQUFRLEVBQUV2SCxLQUFBLENBQUtsUixLQUFLLENBQUN5WSxRQUFTO0VBQzlCUyxVQUFBQSxhQUFhLEVBQUVoSSxLQUFBLENBQUtNLEtBQUssQ0FBQzBILGFBQWM7RUFDeEM3VCxVQUFBQSxZQUFZLEVBQUU2TCxLQUFBLENBQUtsUixLQUFLLENBQUNxRixZQUFhO0VBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRTRMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3NGLG9CQUFxQjtFQUN0RCtXLFVBQUFBLE1BQU0sRUFBRW5MLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FjLE1BQU87RUFDMUJDLFVBQUFBLG9CQUFvQixFQUFFcEwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2Msb0JBQXFCO0VBQ3REbUUsVUFBQUEsV0FBVyxFQUFFdlAsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWdCLFdBQVk7RUFDcENsYixVQUFBQSxVQUFVLEVBQUUyTCxLQUFBLENBQUtsUixLQUFLLENBQUN1RixVQUFXO0VBQ2xDNFMsVUFBQUEsWUFBWSxFQUFFakgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbVksWUFBYTtFQUN0Q2lKLFVBQUFBLGVBQWUsRUFBRWxRLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29oQixlQUFnQjtFQUM1Q2xKLFVBQUFBLFFBQVEsRUFBRWhILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVM7RUFDOUJZLFVBQUFBLFlBQVksRUFBRTVILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhZLFlBQWE7RUFDdENDLFVBQUFBLFVBQVUsRUFBRTdILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytZLFVBQVc7RUFDbENDLFVBQUFBLFlBQVksRUFBRTlILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2daLFlBQWE7RUFDdENDLFVBQUFBLDBCQUEwQixFQUFFL0gsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaVosMEJBQTJCO0VBQ2xFbEIsVUFBQUEsZUFBZSxFQUFFN0csS0FBQSxDQUFLbFIsS0FBSyxDQUFDK1gsZUFBZ0I7RUFDNUNDLFVBQUFBLGFBQWEsRUFBRTlHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dZLGFBQWM7RUFDeEM2SSxVQUFBQSxlQUFlLEVBQUUzUCxLQUFBLENBQUtsUixLQUFLLENBQUM2Z0IsZUFBZ0I7RUFDNUMvZ0IsVUFBQUEsU0FBUyxFQUFFb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFVO0VBQ2hDQyxVQUFBQSxPQUFPLEVBQUVtUixLQUFBLENBQUtsUixLQUFLLENBQUNELE9BQVE7RUFDNUJraEIsVUFBQUEsYUFBYSxFQUFFL1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWhCLGFBQWM7RUFDeEN6TCxVQUFBQSxPQUFPLEVBQUV0RSxLQUFBLENBQUtsUixLQUFLLENBQUN3VixPQUFRO0VBQzVCaUosVUFBQUEsbUJBQW1CLEVBQUV2TixLQUFBLENBQUtsUixLQUFLLENBQUN5ZSxtQkFBb0I7RUFDcEQxQixVQUFBQSxpQkFBaUIsRUFBRTdMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytjLGlCQUFrQjtFQUNoRG9HLFVBQUFBLGtCQUFrQixFQUFFalMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWpCLGtCQUFtQjtFQUNsREksVUFBQUEsb0JBQW9CLEVBQUVyUyxLQUFBLENBQUtsUixLQUFLLENBQUN1akIsb0JBQXFCO0VBQ3REaUYsVUFBQUEsaUJBQWlCLEVBQUV0WCxLQUFBLENBQUtsUixLQUFLLENBQUN3b0IsaUJBQWtCO0VBQ2hEM1EsVUFBQUEsMEJBQTBCLEVBQUUzRyxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMkI7RUFDbEU2TSxVQUFBQSxtQkFBbUIsRUFBRXhULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBb0I7RUFDcER4QixVQUFBQSx1QkFBdUIsRUFBRWhTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tqQix1QkFBd0I7RUFDNURsRCxVQUFBQSw0QkFBNEIsRUFDMUI5TyxLQUFBLENBQUtsUixLQUFLLENBQUNnZ0IsNEJBQ1o7RUFDREQsVUFBQUEsNkJBQTZCLEVBQzNCN08sS0FBQSxDQUFLbFIsS0FBSyxDQUFDK2YsNkJBQ1o7RUFDRGlNLFVBQUFBLGNBQWMsRUFBRTlhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dzQixjQUFlO0VBQzFDckgsVUFBQUEscUJBQXFCLEVBQUV6VCxLQUFBLENBQUtsUixLQUFLLENBQUMya0IscUJBQXNCO0VBQ3hEdk0sVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBZTtFQUMxQzZELFVBQUFBLGNBQWMsRUFBRS9LLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2ljLGNBQWU7WUFDMUNNLFlBQVksRUFBRXJMLEtBQUEsQ0FBS3FMLFlBQWE7RUFDaENHLFVBQUFBLDBCQUEwQixFQUFFQSwwQkFBMkI7RUFDdkRDLFVBQUFBLDRCQUE0QixFQUFFQSw0QkFBQUE7V0FDL0IsQ0FDRSxDQUNQLENBQUMsQ0FBQTtFQUNILE9BQUE7RUFDQSxNQUFBLE9BQU8wUyxTQUFTLENBQUE7T0FDakIsQ0FBQSxDQUFBO01BQUFoZSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsWUFBTTtFQUNsQixNQUFBLElBQUlBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFBRTtFQUNqQyxRQUFBLE9BQUE7RUFDRixPQUFBO0VBQ0EsTUFBQSxJQUFJbFcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWMsRUFBRTtVQUM3QixvQkFDRXRhLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFVBQUFBLFNBQVMsRUFBQyxtQ0FBQTtXQUNaNEQsRUFBQUEsS0FBQSxDQUFLMmUsWUFBWSxDQUFDO0VBQUUzQixVQUFBQSxTQUFTLEVBQUVoZCxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUFBO1dBQU0sQ0FBQyxlQUNsRHdTLHNCQUFBLENBQUFDLGFBQUEsQ0FBQytWLElBQUksRUFBQXVJLFFBQUEsQ0FBQTtZQUNINVIsVUFBVSxFQUFFbk4sS0FBQSxDQUFLc04sY0FBZTtFQUNoQ3RGLFVBQUFBLGFBQWEsRUFBRWhJLEtBQUEsQ0FBS00sS0FBSyxDQUFDMEgsYUFBYztZQUN4Q2dRLGtCQUFrQixFQUFFaFksS0FBQSxDQUFLZ1ksa0JBQW1CO0VBQzVDaHFCLFVBQUFBLElBQUksRUFBRWdTLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBQUE7V0FDYmdTLEVBQUFBLEtBQUEsQ0FBS2xSLEtBQUssRUFBQTtZQUNkeW9CLGdCQUFnQixFQUFFdlgsS0FBQSxDQUFLZ2Ysb0JBQXFCO1lBQzVDeEgsZ0JBQWdCLEVBQUV4WCxLQUFBLENBQUtpZixvQkFBQUE7RUFBcUIsU0FBQSxDQUM3QyxDQUNFLENBQUMsQ0FBQTtFQUVWLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQTllLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG1CQUFBLEVBRW1CLFlBQU07RUFDeEIsTUFBQSxJQUNFQSxLQUFBLENBQUtsUixLQUFLLENBQUNpdEIsY0FBYyxLQUN4Qi9iLEtBQUEsQ0FBS00sS0FBSyxDQUFDa2QsY0FBYyxJQUFJeGQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb25CLGtCQUFrQixDQUFDLEVBQzVEO0VBQ0EsUUFBQSxvQkFDRTFWLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzBULElBQUksRUFBQTtFQUNIbk4sVUFBQUEsUUFBUSxFQUFFaEgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUztFQUM5QmtPLFVBQUFBLFVBQVUsRUFBRWxWLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29tQixVQUFXO0VBQ2xDdlUsVUFBQUEsUUFBUSxFQUFFWCxLQUFBLENBQUtsUixLQUFLLENBQUN1bkIsWUFBYTtFQUNsQzFCLFVBQUFBLGFBQWEsRUFBRTNVLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZsQixhQUFjO0VBQ3hDdm1CLFVBQUFBLE1BQU0sRUFBRTRSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ293QixVQUFXO0VBQzlCN25CLFVBQUFBLFlBQVksRUFBRTJJLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VJLFlBQWE7RUFDdENrRyxVQUFBQSxTQUFTLEVBQUV5QyxLQUFBLENBQUtsUixLQUFLLENBQUNxd0IsYUFBYztFQUNwQzFuQixVQUFBQSxPQUFPLEVBQUV1SSxLQUFBLENBQUtsUixLQUFLLENBQUMySSxPQUFRO0VBQzVCQyxVQUFBQSxPQUFPLEVBQUVzSSxLQUFBLENBQUtsUixLQUFLLENBQUM0SSxPQUFRO0VBQzVCTixVQUFBQSxZQUFZLEVBQUU0SSxLQUFBLENBQUtsUixLQUFLLENBQUNzSSxZQUFhO0VBQ3RDRSxVQUFBQSxVQUFVLEVBQUUwSSxLQUFBLENBQUtsUixLQUFLLENBQUN3SSxVQUFXO0VBQ2xDNmUsVUFBQUEsV0FBVyxFQUFFblcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW5CLFdBQVk7RUFDcENGLFVBQUFBLFdBQVcsRUFBRWpXLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ21uQixXQUFZO0VBQ3BDd0csVUFBQUEsaUJBQWlCLEVBQUV6YyxLQUFBLENBQUtsUixLQUFLLENBQUMydEIsaUJBQWtCO0VBQ2hEQyxVQUFBQSxxQkFBcUIsRUFBRTFjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzR0QixxQkFBc0I7RUFDeERGLFVBQUFBLGdCQUFnQixFQUFFeGMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMHRCLGdCQUFpQjtFQUM5QzRDLFVBQUFBLFVBQVUsRUFBRXBmLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3N3QixVQUFXO0VBQ2xDNUssVUFBQUEsUUFBUSxFQUFFeFUsS0FBQSxDQUFLTSxLQUFLLENBQUNrZCxjQUFlO0VBQ3BDMUksVUFBQUEsV0FBVyxFQUFFOVUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ21CLFdBQVk7RUFDcEN6b0IsVUFBQUEsTUFBTSxFQUFFMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTztFQUMxQm1hLFVBQUFBLGVBQWUsRUFBRXhHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBYLGVBQWdCO0VBQzVDMFAsVUFBQUEsa0JBQWtCLEVBQUVsVyxLQUFBLENBQUtsUixLQUFLLENBQUNvbkIsa0JBQUFBO0VBQW1CLFNBQ25ELENBQUMsQ0FBQTtFQUVOLE9BQUE7T0FDRCxDQUFBLENBQUE7TUFBQS9WLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHdCQUFBLEVBRXdCLFlBQU07UUFDN0IsSUFBTXBKLElBQUksR0FBRyxJQUFJM0ssSUFBSSxDQUFDK1QsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLENBQUE7RUFDMUMsTUFBQSxJQUFNcVksU0FBUyxHQUFHbnpCLE9BQU8sQ0FBQzBLLElBQUksQ0FBQyxJQUFJMG9CLE9BQU8sQ0FBQ3RmLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxDQUFBO1FBQy9ELElBQU1zUixVQUFVLEdBQUcrRyxTQUFTLEdBQUE3d0IsRUFBQUEsQ0FBQUEsTUFBQSxDQUNyQndQLE9BQU8sQ0FBQ3BILElBQUksQ0FBQ0csUUFBUSxFQUFFLENBQUMsRUFBQXZJLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSXdQLE9BQU8sQ0FBQ3BILElBQUksQ0FBQ0ksVUFBVSxFQUFFLENBQUMsQ0FBQSxHQUN6RCxFQUFFLENBQUE7RUFDTixNQUFBLElBQUlnSixLQUFBLENBQUtsUixLQUFLLENBQUN5d0IsYUFBYSxFQUFFO0VBQzVCLFFBQUEsb0JBQ0UvZSxzQkFBQSxDQUFBQyxhQUFBLENBQUMrZSxTQUFTLEVBQUE7RUFDUnh4QixVQUFBQSxJQUFJLEVBQUU0SSxJQUFLO0VBQ1gwaEIsVUFBQUEsVUFBVSxFQUFFQSxVQUFXO0VBQ3ZCTyxVQUFBQSxjQUFjLEVBQUU3WSxLQUFBLENBQUtsUixLQUFLLENBQUMrcEIsY0FBZTtFQUMxQ2xZLFVBQUFBLFFBQVEsRUFBRVgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdW5CLFlBQWE7RUFDbENrQyxVQUFBQSxlQUFlLEVBQUV2WSxLQUFBLENBQUtsUixLQUFLLENBQUN5cEIsZUFBQUE7RUFBZ0IsU0FDN0MsQ0FBQyxDQUFBO0VBRU4sT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBcFksZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsWUFBTTtFQUMzQixNQUFBLElBQUF4RixnQkFBQSxHQUFtQ1YsY0FBYyxDQUMvQ2tHLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxFQUNmZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOEssY0FDYixDQUFDO1VBSE9hLFdBQVcsR0FBQUQsZ0JBQUEsQ0FBWEMsV0FBVztVQUFFVixTQUFTLEdBQUFTLGdCQUFBLENBQVRULFNBQVMsQ0FBQTtFQUk5QixNQUFBLElBQUkwbEIsZUFBZSxDQUFBO0VBRW5CLE1BQUEsSUFBSXpmLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dzQixjQUFjLEVBQUU7VUFDN0IyRSxlQUFlLEdBQUEsRUFBQSxDQUFBanhCLE1BQUEsQ0FBTWlNLFdBQVcsU0FBQWpNLE1BQUEsQ0FBTXVMLFNBQVMsQ0FBRSxDQUFBO0VBQ25ELE9BQUMsTUFBTSxJQUNMaUcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGtCLG1CQUFtQixJQUM5QnhULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixxQkFBcUIsRUFDaEM7VUFDQWdNLGVBQWUsR0FBR3BxQixlQUFPLENBQUMySyxLQUFBLENBQUtNLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQzVDLE9BQUMsTUFBTTtFQUNMeXhCLFFBQUFBLGVBQWUsR0FBQWp4QixFQUFBQSxDQUFBQSxNQUFBLENBQU02RSxnQkFBZ0IsQ0FDbkNrQyxpQkFBUSxDQUFDeUssS0FBQSxDQUFLTSxLQUFLLENBQUN0UyxJQUFJLENBQUMsRUFDekJnUyxLQUFBLENBQUtsUixLQUFLLENBQUN6QyxNQUNiLENBQUMsRUFBQSxHQUFBLENBQUEsQ0FBQW1DLE1BQUEsQ0FBSTZHLGVBQU8sQ0FBQzJLLEtBQUEsQ0FBS00sS0FBSyxDQUFDdFMsSUFBSSxDQUFDLENBQUUsQ0FBQTtFQUNqQyxPQUFBO1FBRUEsb0JBQ0V3UyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQ0U0TCxRQUFBQSxJQUFJLEVBQUMsT0FBTztFQUNaLFFBQUEsV0FBQSxFQUFVLFFBQVE7RUFDbEJqUSxRQUFBQSxTQUFTLEVBQUMsNkJBQUE7RUFBNkIsT0FBQSxFQUV0QzRELEtBQUEsQ0FBS00sS0FBSyxDQUFDNlosdUJBQXVCLElBQUlzRixlQUNuQyxDQUFDLENBQUE7T0FFVixDQUFBLENBQUE7TUFBQXRmLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFlBQU07RUFDckIsTUFBQSxJQUFJQSxLQUFBLENBQUtsUixLQUFLLENBQUNvVCxRQUFRLEVBQUU7VUFDdkIsb0JBQ0UxQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtyRSxVQUFBQSxTQUFTLEVBQUMsc0NBQUE7RUFBc0MsU0FBQSxFQUNsRDRELEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ULFFBQ1QsQ0FBQyxDQUFBO0VBRVYsT0FBQTtPQUNELENBQUEsQ0FBQTtFQTUyQkNsQyxJQUFBQSxLQUFBLENBQUtxTCxZQUFZLGdCQUFHN0ssc0JBQUssQ0FBQ21CLFNBQVMsRUFBRSxDQUFBO01BRXJDM0IsS0FBQSxDQUFLTSxLQUFLLEdBQUc7RUFDWHRTLE1BQUFBLElBQUksRUFBRWdTLEtBQUEsQ0FBSzBmLGFBQWEsRUFBRTtFQUMxQjFYLE1BQUFBLGFBQWEsRUFBRSxJQUFJO0VBQ25Cd1YsTUFBQUEsY0FBYyxFQUFFLElBQUk7RUFDcEJyRCxNQUFBQSx1QkFBdUIsRUFBRSxLQUFBO09BQzFCLENBQUE7RUFBQyxJQUFBLE9BQUFuYSxLQUFBLENBQUE7RUFDSixHQUFBO0lBQUM0QixTQUFBLENBQUErWCxRQUFBLEVBQUE1WixnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBOFgsUUFBQSxFQUFBLENBQUE7TUFBQWhlLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUFrVyxpQkFBQUEsR0FBb0I7RUFBQSxNQUFBLElBQUFtRCxNQUFBLEdBQUEsSUFBQSxDQUFBO0VBQ2xCO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsTUFBQSxJQUFJLElBQUksQ0FBQ25XLEtBQUssQ0FBQ2l0QixjQUFjLEVBQUU7VUFDN0IsSUFBSSxDQUFDNEQsb0JBQW9CLEdBQUksWUFBTTtZQUNqQzFhLE1BQUksQ0FBQzNELFFBQVEsQ0FBQztjQUFFa2MsY0FBYyxFQUFFdlksTUFBSSxDQUFDdVksY0FBQUE7RUFBZSxXQUFDLENBQUMsQ0FBQTtFQUN4RCxTQUFDLEVBQUcsQ0FBQTtFQUNOLE9BQUE7RUFDRixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUE3aEIsR0FBQSxFQUFBLG9CQUFBO0VBQUEvUCxJQUFBQSxLQUFBLEVBRUQsU0FBQTZnQixrQkFBbUI3QixDQUFBQSxTQUFTLEVBQUU7RUFBQSxNQUFBLElBQUFnVixNQUFBLEdBQUEsSUFBQSxDQUFBO0VBQzVCLE1BQUEsSUFDRSxJQUFJLENBQUM5d0IsS0FBSyxDQUFDbVksWUFBWSxLQUN0QixDQUFDclYsU0FBUyxDQUFDLElBQUksQ0FBQzlDLEtBQUssQ0FBQ21ZLFlBQVksRUFBRTJELFNBQVMsQ0FBQzNELFlBQVksQ0FBQyxJQUMxRCxJQUFJLENBQUNuWSxLQUFLLENBQUNpckIsZUFBZSxLQUFLblAsU0FBUyxDQUFDbVAsZUFBZSxDQUFDLEVBQzNEO0VBQ0EsUUFBQSxJQUFNOEYsZUFBZSxHQUFHLENBQUNydUIsV0FBVyxDQUNsQyxJQUFJLENBQUM4TyxLQUFLLENBQUN0UyxJQUFJLEVBQ2YsSUFBSSxDQUFDYyxLQUFLLENBQUNtWSxZQUNiLENBQUMsQ0FBQTtVQUNELElBQUksQ0FBQzNGLFFBQVEsQ0FDWDtFQUNFdFQsVUFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQ2MsS0FBSyxDQUFDbVksWUFBQUE7RUFDbkIsU0FBQyxFQUNELFlBQUE7WUFBQSxPQUFNNFksZUFBZSxJQUFJRCxNQUFJLENBQUN4Rix1QkFBdUIsQ0FBQ3dGLE1BQUksQ0FBQ3RmLEtBQUssQ0FBQ3RTLElBQUksQ0FBQyxDQUFBO0VBQUEsU0FDeEUsQ0FBQyxDQUFBO1NBQ0YsTUFBTSxJQUNMLElBQUksQ0FBQ2MsS0FBSyxDQUFDb21CLFVBQVUsSUFDckIsQ0FBQ3RqQixTQUFTLENBQUMsSUFBSSxDQUFDOUMsS0FBSyxDQUFDb21CLFVBQVUsRUFBRXRLLFNBQVMsQ0FBQ3NLLFVBQVUsQ0FBQyxFQUN2RDtVQUNBLElBQUksQ0FBQzVULFFBQVEsQ0FBQztFQUNadFQsVUFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQ2MsS0FBSyxDQUFDb21CLFVBQUFBO0VBQ25CLFNBQUMsQ0FBQyxDQUFBO0VBQ0osT0FBQTtFQUNGLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQXZaLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBZzBCRCxTQUFBK1csTUFBQUEsR0FBUztRQUNQLElBQU1tZCxTQUFTLEdBQUcsSUFBSSxDQUFDaHhCLEtBQUssQ0FBQ2l4QixTQUFTLElBQUkvRyxpQkFBaUIsQ0FBQTtRQUMzRCxvQkFDRXhZLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS29ELFFBQUFBLEtBQUssRUFBRTtFQUFFbWMsVUFBQUEsT0FBTyxFQUFFLFVBQUE7V0FBYTtVQUFDbGQsR0FBRyxFQUFFLElBQUksQ0FBQ3VJLFlBQUFBO0VBQWEsT0FBQSxlQUMxRDdLLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FmLFNBQVMsRUFBQTtVQUNSMWpCLFNBQVMsRUFBRXlHLFNBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMvVCxLQUFLLENBQUNzTixTQUFTLEVBQUU7RUFDeEQsVUFBQSw2QkFBNkIsRUFBRSxJQUFJLENBQUN0TixLQUFLLENBQUNvbkIsa0JBQUFBO0VBQzVDLFNBQUMsQ0FBRTtVQUNIaUQsUUFBUSxFQUFFLElBQUksQ0FBQ3JxQixLQUFLLENBQUNpdEIsY0FBYyxJQUFJLElBQUksQ0FBQ2p0QixLQUFLLENBQUN5d0IsYUFBYztFQUNoRXJKLFFBQUFBLGtCQUFrQixFQUFFLElBQUksQ0FBQ3BuQixLQUFLLENBQUNvbkIsa0JBQUFBO1NBRTlCLEVBQUEsSUFBSSxDQUFDK0osb0JBQW9CLEVBQUUsRUFDM0IsSUFBSSxDQUFDQyxvQkFBb0IsRUFBRSxFQUMzQixJQUFJLENBQUNDLGdCQUFnQixFQUFFLEVBQ3ZCLElBQUksQ0FBQ25NLFlBQVksRUFBRSxFQUNuQixJQUFJLENBQUNvTSxXQUFXLEVBQUUsRUFDbEIsSUFBSSxDQUFDQyxpQkFBaUIsRUFBRSxFQUN4QixJQUFJLENBQUNDLGlCQUFpQixFQUFFLEVBQ3hCLElBQUksQ0FBQ0Msc0JBQXNCLEVBQUUsRUFDN0IsSUFBSSxDQUFDQyxjQUFjLEVBQ1gsQ0FDUixDQUFDLENBQUE7RUFFVixLQUFBO0VBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtNQUFBN2tCLEdBQUEsRUFBQSxjQUFBO01BQUFFLEdBQUEsRUF6aUNELFNBQUFBLEdBQUFBLEdBQTBCO1FBQ3hCLE9BQU87RUFDTCtkLFFBQUFBLGVBQWUsRUFBRSxTQUFBQSxlQUFBLEdBQU0sRUFBRTtFQUN6QjBFLFFBQUFBLFdBQVcsRUFBRSxDQUFDO0VBQ2RyRCxRQUFBQSx3QkFBd0IsRUFBRSxLQUFLO0VBQy9COUUsUUFBQUEsV0FBVyxFQUFFLE1BQU07RUFDbkJzRixRQUFBQSx1QkFBdUIsRUFBRSxlQUFlO0VBQ3hDVSxRQUFBQSxtQkFBbUIsRUFBRSxXQUFXO0VBQ2hDWCxRQUFBQSx3QkFBd0IsRUFBRSxnQkFBZ0I7RUFDMUNVLFFBQUFBLG9CQUFvQixFQUFFLFlBQVk7RUFDbEMzRCxRQUFBQSxlQUFlLEVBQUUsSUFBSTtFQUNyQjNlLFFBQUFBLGNBQWMsRUFBRW5PLHdCQUFBQTtTQUNqQixDQUFBO0VBQ0gsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQWRtQytVLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDM0RyRCxJQUFNeWQsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUEveEIsSUFBQSxFQUEwQztFQUFBLEVBQUEsSUFBcENneUIsSUFBSSxHQUFBaHlCLElBQUEsQ0FBSmd5QixJQUFJO01BQUFDLGNBQUEsR0FBQWp5QixJQUFBLENBQUUwTixTQUFTO0VBQVRBLElBQUFBLFNBQVMsR0FBQXVrQixjQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsRUFBRSxHQUFBQSxjQUFBO01BQUVqZ0IsUUFBTyxHQUFBaFMsSUFBQSxDQUFQZ1MsT0FBTyxDQUFBO0lBQ25ELElBQU1rZ0IsWUFBWSxHQUFHLGlDQUFpQyxDQUFBO0VBRXRELEVBQUEsa0JBQUlwZ0Isc0JBQUssQ0FBQ3FnQixjQUFjLENBQUNILElBQUksQ0FBQyxFQUFFO0VBQzlCLElBQUEsb0JBQU9sZ0Isc0JBQUssQ0FBQ2dZLFlBQVksQ0FBQ2tJLElBQUksRUFBRTtFQUM5QnRrQixNQUFBQSxTQUFTLEtBQUE1TixNQUFBLENBQUtreUIsSUFBSSxDQUFDNXhCLEtBQUssQ0FBQ3NOLFNBQVMsSUFBSSxFQUFFLEVBQUEsR0FBQSxDQUFBLENBQUE1TixNQUFBLENBQUlveUIsWUFBWSxPQUFBcHlCLE1BQUEsQ0FBSTROLFNBQVMsQ0FBRTtFQUN2RXNFLE1BQUFBLE9BQU8sRUFBRSxTQUFBQSxPQUFDOEMsQ0FBQUEsQ0FBQyxFQUFLO1VBQ2QsSUFBSSxPQUFPa2QsSUFBSSxDQUFDNXhCLEtBQUssQ0FBQzRSLE9BQU8sS0FBSyxVQUFVLEVBQUU7RUFDNUNnZ0IsVUFBQUEsSUFBSSxDQUFDNXhCLEtBQUssQ0FBQzRSLE9BQU8sQ0FBQzhDLENBQUMsQ0FBQyxDQUFBO0VBQ3ZCLFNBQUE7RUFFQSxRQUFBLElBQUksT0FBTzlDLFFBQU8sS0FBSyxVQUFVLEVBQUU7WUFDakNBLFFBQU8sQ0FBQzhDLENBQUMsQ0FBQyxDQUFBO0VBQ1osU0FBQTtFQUNGLE9BQUE7RUFDRixLQUFDLENBQUMsQ0FBQTtFQUNKLEdBQUE7RUFFQSxFQUFBLElBQUksT0FBT2tkLElBQUksS0FBSyxRQUFRLEVBQUU7TUFDNUIsb0JBQ0VsZ0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEdBQUEsRUFBQTtFQUNFckUsTUFBQUEsU0FBUyxFQUFBNU4sRUFBQUEsQ0FBQUEsTUFBQSxDQUFLb3lCLFlBQVksRUFBQXB5QixHQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQUlreUIsSUFBSSxFQUFBbHlCLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSTROLFNBQVMsQ0FBRztFQUNsRCxNQUFBLGFBQUEsRUFBWSxNQUFNO0VBQ2xCc0UsTUFBQUEsT0FBTyxFQUFFQSxRQUFBQTtFQUFRLEtBQ2xCLENBQUMsQ0FBQTtFQUVOLEdBQUE7O0VBRUE7SUFDQSxvQkFDRUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtNQUNFckUsU0FBUyxFQUFBLEVBQUEsQ0FBQTVOLE1BQUEsQ0FBS295QixZQUFZLE9BQUFweUIsTUFBQSxDQUFJNE4sU0FBUyxDQUFHO0VBQzFDMGtCLElBQUFBLEtBQUssRUFBQyw0QkFBNEI7RUFDbENDLElBQUFBLE9BQU8sRUFBQyxhQUFhO0VBQ3JCcmdCLElBQUFBLE9BQU8sRUFBRUEsUUFBQUE7S0FFVEYsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNNVUsSUFBQUEsQ0FBQyxFQUFDLDZOQUFBO0VBQTZOLEdBQUUsQ0FDcE8sQ0FBQyxDQUFBO0VBRVYsQ0FBQyxDQUFBO0FBUUQsdUJBQWU0MEIsWUFBWTs7RUNoRE0sSUFFWk8sTUFBTSwwQkFBQWpoQixnQkFBQSxFQUFBO0lBT3pCLFNBQUFpaEIsTUFBQUEsQ0FBWWx5QixLQUFLLEVBQUU7RUFBQSxJQUFBLElBQUFrUixLQUFBLENBQUE7RUFBQUMsSUFBQUEsZUFBQSxPQUFBK2dCLE1BQUEsQ0FBQSxDQUFBO0VBQ2pCaGhCLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBOGdCLElBQUFBLEVBQUFBLE1BQUEsR0FBTWx5QixLQUFLLENBQUEsQ0FBQSxDQUFBO01BQ1hrUixLQUFBLENBQUtpaEIsRUFBRSxHQUFHalcsUUFBUSxDQUFDdkssYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQUMsSUFBQSxPQUFBVCxLQUFBLENBQUE7RUFDMUMsR0FBQTtJQUFDNEIsU0FBQSxDQUFBb2YsTUFBQSxFQUFBamhCLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUFtZixNQUFBLEVBQUEsQ0FBQTtNQUFBcmxCLEdBQUEsRUFBQSxtQkFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUFrVyxpQkFBQUEsR0FBb0I7RUFDbEIsTUFBQSxJQUFJLENBQUNvZixVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUNweUIsS0FBSyxDQUFDcXlCLFVBQVUsSUFBSW5XLFFBQVEsRUFBRW9XLGNBQWMsQ0FDbEUsSUFBSSxDQUFDdHlCLEtBQUssQ0FBQ3V5QixRQUNiLENBQUMsQ0FBQTtFQUNELE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQ0gsVUFBVSxFQUFFO1VBQ3BCLElBQUksQ0FBQ0EsVUFBVSxHQUFHbFcsUUFBUSxDQUFDdkssYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQy9DLFFBQUEsSUFBSSxDQUFDeWdCLFVBQVUsQ0FBQ0ksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUN4eUIsS0FBSyxDQUFDdXlCLFFBQVEsQ0FBQyxDQUFBO0VBQ3ZELFFBQUEsQ0FBQyxJQUFJLENBQUN2eUIsS0FBSyxDQUFDcXlCLFVBQVUsSUFBSW5XLFFBQVEsQ0FBQ0UsSUFBSSxFQUFFcVcsV0FBVyxDQUFDLElBQUksQ0FBQ0wsVUFBVSxDQUFDLENBQUE7RUFDdkUsT0FBQTtRQUNBLElBQUksQ0FBQ0EsVUFBVSxDQUFDSyxXQUFXLENBQUMsSUFBSSxDQUFDTixFQUFFLENBQUMsQ0FBQTtFQUN0QyxLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUF0bEIsR0FBQSxFQUFBLHNCQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQTQxQixvQkFBQUEsR0FBdUI7UUFDckIsSUFBSSxDQUFDTixVQUFVLENBQUNPLFdBQVcsQ0FBQyxJQUFJLENBQUNSLEVBQUUsQ0FBQyxDQUFBO0VBQ3RDLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQXRsQixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQUVELFNBQUErVyxNQUFBQSxHQUFTO0VBQ1AsTUFBQSxvQkFBTytlLHlCQUFRLENBQUNDLFlBQVksQ0FBQyxJQUFJLENBQUM3eUIsS0FBSyxDQUFDb1QsUUFBUSxFQUFFLElBQUksQ0FBQytlLEVBQUUsQ0FBQyxDQUFBO0VBQzVELEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0E5QmlDemdCLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLENBQUE7O0VDRG5EO0VBQ0E7RUFDQTs7RUFFQSxJQUFNNGUseUJBQXlCLEdBQzdCLGdEQUFnRCxDQUFBO0VBQ2xELElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBZUEsQ0FBSUMsSUFBSSxFQUFBO0lBQUEsT0FBSyxDQUFDQSxJQUFJLENBQUNDLFFBQVEsSUFBSUQsSUFBSSxDQUFDdFgsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFBO0VBQUEsQ0FBQSxDQUFBO0VBQUMsSUFFcER3WCxPQUFPLDBCQUFBamlCLGdCQUFBLEVBQUE7SUFZMUIsU0FBQWlpQixPQUFBQSxDQUFZbHpCLEtBQUssRUFBRTtFQUFBLElBQUEsSUFBQWtSLEtBQUEsQ0FBQTtFQUFBQyxJQUFBQSxlQUFBLE9BQUEraEIsT0FBQSxDQUFBLENBQUE7RUFDakJoaUIsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUE4aEIsSUFBQUEsRUFBQUEsT0FBQSxHQUFNbHpCLEtBQUssQ0FBQSxDQUFBLENBQUE7RUFLYjtFQUNBO01BQUFxUixlQUFBLENBQUFILEtBQUEsRUFDaUIsZ0JBQUEsRUFBQSxZQUFBO0VBQUEsTUFBQSxPQUNmblQsS0FBSyxDQUFDbzFCLFNBQVMsQ0FBQ2wwQixLQUFLLENBQ2xCbTBCLElBQUksQ0FDSGxpQixLQUFBLENBQUttaUIsVUFBVSxDQUFDbmdCLE9BQU8sQ0FBQ29nQixnQkFBZ0IsQ0FBQ1IseUJBQXlCLENBQUMsRUFDbkUsQ0FBQyxFQUNELENBQUMsQ0FDSCxDQUFDLENBQ0E5bUIsTUFBTSxDQUFDK21CLGVBQWUsQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQTFoQixlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVULFlBQU07RUFDdkIsTUFBQSxJQUFNcWlCLFdBQVcsR0FBR3JpQixLQUFBLENBQUtzaUIsY0FBYyxFQUFFLENBQUE7RUFDekNELE1BQUFBLFdBQVcsSUFDVEEsV0FBVyxDQUFDdjBCLE1BQU0sR0FBRyxDQUFDLElBQ3RCdTBCLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDdjBCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzZkLEtBQUssRUFBRSxDQUFBO09BQzlDLENBQUEsQ0FBQTtNQUFBeEwsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtFQUNyQixNQUFBLElBQU1xaUIsV0FBVyxHQUFHcmlCLEtBQUEsQ0FBS3NpQixjQUFjLEVBQUUsQ0FBQTtFQUN6Q0QsTUFBQUEsV0FBVyxJQUFJQSxXQUFXLENBQUN2MEIsTUFBTSxHQUFHLENBQUMsSUFBSXUwQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMxVyxLQUFLLEVBQUUsQ0FBQTtPQUNoRSxDQUFBLENBQUE7RUF4QkMzTCxJQUFBQSxLQUFBLENBQUttaUIsVUFBVSxnQkFBRzNoQixzQkFBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUE7RUFBQyxJQUFBLE9BQUEzQixLQUFBLENBQUE7RUFDdEMsR0FBQTtJQUFDNEIsU0FBQSxDQUFBb2dCLE9BQUEsRUFBQWppQixnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBbWdCLE9BQUEsRUFBQSxDQUFBO01BQUFybUIsR0FBQSxFQUFBLFFBQUE7TUFBQS9QLEtBQUEsRUF5QkQsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUM3VCxLQUFLLENBQUN5ekIsYUFBYSxFQUFFO0VBQzdCLFFBQUEsT0FBTyxJQUFJLENBQUN6ekIsS0FBSyxDQUFDb1QsUUFBUSxDQUFBO0VBQzVCLE9BQUE7UUFDQSxvQkFDRTFCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3JFLFFBQUFBLFNBQVMsRUFBQyw0QkFBNEI7VUFBQzBHLEdBQUcsRUFBRSxJQUFJLENBQUNxZixVQUFBQTtTQUNwRDNoQixlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUMsbUNBQW1DO0VBQzdDb08sUUFBQUEsUUFBUSxFQUFDLEdBQUc7VUFDWjBTLE9BQU8sRUFBRSxJQUFJLENBQUNzRixnQkFBQUE7U0FDZixDQUFDLEVBQ0QsSUFBSSxDQUFDMXpCLEtBQUssQ0FBQ29ULFFBQVEsZUFDcEIxQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLEVBQUMsaUNBQWlDO0VBQzNDb08sUUFBQUEsUUFBUSxFQUFDLEdBQUc7VUFDWjBTLE9BQU8sRUFBRSxJQUFJLENBQUN1RixjQUFBQTtFQUFlLE9BQzlCLENBQ0UsQ0FBQyxDQUFBO0VBRVYsS0FBQTtFQUFDLEdBQUEsQ0FBQSxFQUFBLENBQUE7TUFBQTltQixHQUFBLEVBQUEsY0FBQTtNQUFBRSxHQUFBLEVBM0RELFNBQUFBLEdBQUFBLEdBQTBCO1FBQ3hCLE9BQU87RUFDTDBtQixRQUFBQSxhQUFhLEVBQUUsSUFBQTtTQUNoQixDQUFBO0VBQ0gsS0FBQTtFQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxDQUxrQy9oQixDQUFBQSxzQkFBSyxDQUFDd0MsU0FBUyxDQUFBOztFQ2NyQyxTQUFTMGYsWUFBWUEsQ0FBQzFmLFNBQVMsRUFBRTtFQUM5QyxFQUFBLElBQU0yZixZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBSTd6QixLQUFLLEVBQUs7RUFDOUIsSUFBQSxJQUFNOHpCLFNBQVMsR0FBQTlFLGNBQUEsQ0FBQUEsY0FBQSxLQUNWaHZCLEtBQUssQ0FBQSxFQUFBLEVBQUEsRUFBQTtFQUNSK3pCLE1BQUFBLGVBQWUsRUFBRS96QixLQUFLLENBQUMrekIsZUFBZSxJQUFJLEVBQUU7RUFDNUNDLE1BQUFBLFdBQVcsRUFBRWgwQixLQUFLLENBQUNnMEIsV0FBVyxJQUFJLEVBQUU7UUFDcENDLFVBQVUsRUFDUixPQUFPajBCLEtBQUssQ0FBQ2kwQixVQUFVLEtBQUssU0FBUyxHQUFHajBCLEtBQUssQ0FBQ2kwQixVQUFVLEdBQUcsSUFBQTtPQUM5RCxDQUFBLENBQUE7RUFDRCxJQUFBLElBQU1DLFFBQVEsR0FBR3hpQixzQkFBSyxDQUFDeWlCLE1BQU0sRUFBRSxDQUFBO0VBQy9CLElBQUEsSUFBTUMsYUFBYSxHQUFHQyxpQkFBVyxDQUFBckYsY0FBQSxDQUFBO0VBQy9Cc0YsTUFBQUEsSUFBSSxFQUFFLENBQUNSLFNBQVMsQ0FBQ0csVUFBVTtFQUMzQk0sTUFBQUEsb0JBQW9CLEVBQUVDLGdCQUFVO1FBQ2hDQyxTQUFTLEVBQUVYLFNBQVMsQ0FBQ1ksZUFBZTtRQUNwQ0MsVUFBVSxFQUFBLENBQ1JDLFVBQUksQ0FBQztFQUFFQyxRQUFBQSxPQUFPLEVBQUUsRUFBQTtTQUFJLENBQUMsRUFDckIvVixZQUFNLENBQUMsRUFBRSxDQUFDLEVBQ1ZnVyxXQUFLLENBQUM7RUFBRXJLLFFBQUFBLE9BQU8sRUFBRXlKLFFBQUFBO1NBQVUsQ0FBQyxFQUFBeDBCLE1BQUEsQ0FBQTJPLGtCQUFBLENBQ3pCeWxCLFNBQVMsQ0FBQ0MsZUFBZSxDQUFBLENBQUE7RUFDN0IsS0FBQSxFQUNFRCxTQUFTLENBQUNFLFdBQVcsQ0FDekIsQ0FBQyxDQUFBO01BRUYsb0JBQ0V0aUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDdUMsU0FBUyxFQUFBK2IsUUFBQSxLQUFLNkQsU0FBUyxFQUFBO0VBQUVFLE1BQUFBLFdBQVcsRUFBQWhGLGNBQUEsQ0FBQUEsY0FBQSxLQUFPb0YsYUFBYSxDQUFBLEVBQUEsRUFBQSxFQUFBO0VBQUVGLFFBQUFBLFFBQVEsRUFBUkEsUUFBQUE7RUFBUSxPQUFBLENBQUE7RUFBRyxLQUFBLENBQUUsQ0FBQyxDQUFBO0tBRTVFLENBQUE7RUFTRCxFQUFBLE9BQU9MLFlBQVksQ0FBQTtFQUNyQjs7RUNyREE7RUFDYWtCLElBQUFBLGVBQWUsMEJBQUE5akIsZ0JBQUEsRUFBQTtFQUFBLEVBQUEsU0FBQThqQixlQUFBLEdBQUE7RUFBQTVqQixJQUFBQSxlQUFBLE9BQUE0akIsZUFBQSxDQUFBLENBQUE7RUFBQSxJQUFBLE9BQUEzakIsVUFBQSxDQUFBLElBQUEsRUFBQTJqQixlQUFBLEVBQUEvdkIsU0FBQSxDQUFBLENBQUE7RUFBQSxHQUFBO0lBQUE4TixTQUFBLENBQUFpaUIsZUFBQSxFQUFBOWpCLGdCQUFBLENBQUEsQ0FBQTtJQUFBLE9BQUE4QixZQUFBLENBQUFnaUIsZUFBQSxFQUFBLENBQUE7TUFBQWxvQixHQUFBLEVBQUEsUUFBQTtNQUFBL1AsS0FBQSxFQXNCMUIsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQUF5RSxXQUFBLEdBWUksSUFBSSxDQUFDdFksS0FBSztVQVhac04sU0FBUyxHQUFBZ0wsV0FBQSxDQUFUaEwsU0FBUztVQUNUMG5CLGdCQUFnQixHQUFBMWMsV0FBQSxDQUFoQjBjLGdCQUFnQjtVQUNoQmYsVUFBVSxHQUFBM2IsV0FBQSxDQUFWMmIsVUFBVTtVQUNWZ0IsZUFBZSxHQUFBM2MsV0FBQSxDQUFmMmMsZUFBZTtVQUNmQyxlQUFlLEdBQUE1YyxXQUFBLENBQWY0YyxlQUFlO1VBQ2Z6QixhQUFhLEdBQUFuYixXQUFBLENBQWJtYixhQUFhO1VBQ2IwQixlQUFlLEdBQUE3YyxXQUFBLENBQWY2YyxlQUFlO1VBQ2Y1QyxRQUFRLEdBQUFqYSxXQUFBLENBQVJpYSxRQUFRO1VBQ1JGLFVBQVUsR0FBQS9aLFdBQUEsQ0FBVitaLFVBQVU7VUFDVjJCLFdBQVcsR0FBQTFiLFdBQUEsQ0FBWDBiLFdBQVc7VUFDWG9CLFNBQVMsR0FBQTljLFdBQUEsQ0FBVDhjLFNBQVMsQ0FBQTtFQUdYLE1BQUEsSUFBSUMsTUFBTSxDQUFBO1FBRVYsSUFBSSxDQUFDcEIsVUFBVSxFQUFFO0VBQ2YsUUFBQSxJQUFNck8sT0FBTyxHQUFHN1IsU0FBSSxDQUFDLHlCQUF5QixFQUFFekcsU0FBUyxDQUFDLENBQUE7RUFDMUQrbkIsUUFBQUEsTUFBTSxnQkFDSjNqQixzQkFBQSxDQUFBQyxhQUFBLENBQUN1aEIsT0FBTyxFQUFBO0VBQUNPLFVBQUFBLGFBQWEsRUFBRUEsYUFBQUE7V0FDdEIvaEIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFcUMsVUFBQUEsR0FBRyxFQUFFZ2dCLFdBQVcsQ0FBQ3NCLElBQUksQ0FBQ0MsV0FBWTtZQUNsQ3hnQixLQUFLLEVBQUVpZixXQUFXLENBQUN3QixjQUFlO0VBQ2xDbG9CLFVBQUFBLFNBQVMsRUFBRXNZLE9BQVE7WUFDbkIsZ0JBQWdCb08sRUFBQUEsV0FBVyxDQUFDUyxTQUFVO0VBQ3RDeFgsVUFBQUEsU0FBUyxFQUFFa1ksZUFBQUE7V0FFVkYsRUFBQUEsZUFBZSxFQUNmRyxTQUFTLGlCQUNSMWpCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzhqQixtQkFBYSxFQUFBO1lBQ1p6aEIsR0FBRyxFQUFFZ2dCLFdBQVcsQ0FBQ0UsUUFBUztZQUMxQndCLE9BQU8sRUFBRTFCLFdBQVcsQ0FBQzBCLE9BQVE7RUFDN0JDLFVBQUFBLElBQUksRUFBQyxjQUFjO0VBQ25CQyxVQUFBQSxXQUFXLEVBQUUsQ0FBRTtFQUNmdFEsVUFBQUEsTUFBTSxFQUFFLENBQUU7RUFDVnVRLFVBQUFBLEtBQUssRUFBRSxFQUFHO0VBQ1Y5Z0IsVUFBQUEsS0FBSyxFQUFFO0VBQUUrZ0IsWUFBQUEsU0FBUyxFQUFFLGtCQUFBO2FBQXFCO0VBQ3pDeG9CLFVBQUFBLFNBQVMsRUFBQyw0QkFBQTtXQUNYLENBRUEsQ0FDRSxDQUNWLENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxJQUFJLElBQUksQ0FBQ3ROLEtBQUssQ0FBQysxQixlQUFlLEVBQUU7RUFDOUJWLFFBQUFBLE1BQU0sZ0JBQUczakIsc0JBQUssQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQzNSLEtBQUssQ0FBQysxQixlQUFlLEVBQUUsRUFBRSxFQUFFVixNQUFNLENBQUMsQ0FBQTtFQUN0RSxPQUFBO0VBRUEsTUFBQSxJQUFJOUMsUUFBUSxJQUFJLENBQUMwQixVQUFVLEVBQUU7RUFDM0JvQixRQUFBQSxNQUFNLGdCQUNKM2pCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3VnQixNQUFNLEVBQUE7RUFBQ0ssVUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQUNGLFVBQUFBLFVBQVUsRUFBRUEsVUFBQUE7RUFBVyxTQUFBLEVBQ2hEZ0QsTUFDSyxDQUNULENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxJQUFNVyxjQUFjLEdBQUdqaUIsU0FBSSxDQUFDLDBCQUEwQixFQUFFaWhCLGdCQUFnQixDQUFDLENBQUE7UUFFekUsb0JBQ0V0akIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDRCxzQkFBSyxDQUFDdWtCLFFBQVEsRUFBQSxJQUFBLGVBQ2J2a0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLcUMsUUFBQUEsR0FBRyxFQUFFZ2dCLFdBQVcsQ0FBQ3NCLElBQUksQ0FBQ1ksWUFBYTtFQUFDNW9CLFFBQUFBLFNBQVMsRUFBRTBvQixjQUFBQTtFQUFlLE9BQUEsRUFDaEVkLGVBQ0UsQ0FBQyxFQUNMRyxNQUNhLENBQUMsQ0FBQTtFQUVyQixLQUFBO0VBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtNQUFBeG9CLEdBQUEsRUFBQSxjQUFBO01BQUFFLEdBQUEsRUF6RkQsU0FBQUEsR0FBQUEsR0FBMEI7UUFDeEIsT0FBTztFQUNMa25CLFFBQUFBLFVBQVUsRUFBRSxJQUFBO1NBQ2IsQ0FBQTtFQUNILEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsQ0FMa0N2aUIsQ0FBQUEsc0JBQUssQ0FBQ3dDLFNBQVMsQ0FBQSxDQUFBO0FBNkZwRCwwQkFBZTBmLFlBQVksQ0FBQ21CLGVBQWUsQ0FBQzs7RUMxQzVDLElBQU1vQix1QkFBdUIsR0FBRyx3Q0FBd0MsQ0FBQTtFQUN4RSxJQUFNQyxlQUFlLEdBQUdoaUIsK0JBQWMsQ0FBQ3lXLFFBQVEsQ0FBQyxDQUFBOztFQUVoRDtFQUNBLFNBQVN3TCxzQkFBc0JBLENBQUM5ekIsS0FBSyxFQUFFQyxLQUFLLEVBQUU7SUFDNUMsSUFBSUQsS0FBSyxJQUFJQyxLQUFLLEVBQUU7RUFDbEIsSUFBQSxPQUNFaUUsaUJBQVEsQ0FBQ2xFLEtBQUssQ0FBQyxLQUFLa0UsaUJBQVEsQ0FBQ2pFLEtBQUssQ0FBQyxJQUFJK0QsZUFBTyxDQUFDaEUsS0FBSyxDQUFDLEtBQUtnRSxlQUFPLENBQUMvRCxLQUFLLENBQUMsQ0FBQTtFQUU1RSxHQUFBO0lBRUEsT0FBT0QsS0FBSyxLQUFLQyxLQUFLLENBQUE7RUFDeEIsQ0FBQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQSxJQUFNOHpCLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQTtBQUV0QkMsTUFBQUEsVUFBVSwwQkFBQXRsQixnQkFBQSxFQUFBO0lBNFA3QixTQUFBc2xCLFVBQUFBLENBQVl2MkIsS0FBSyxFQUFFO0VBQUEsSUFBQSxJQUFBa1IsS0FBQSxDQUFBO0VBQUFDLElBQUFBLGVBQUEsT0FBQW9sQixVQUFBLENBQUEsQ0FBQTtFQUNqQnJsQixJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQW1sQixJQUFBQSxFQUFBQSxVQUFBLEdBQU12MkIsS0FBSyxDQUFBLENBQUEsQ0FBQTtNQUFFcVIsZUFBQSxDQUFBSCxLQUFBLEVBa0RHLGlCQUFBLEVBQUEsWUFBQTtRQUFBLE9BQ2hCQSxLQUFBLENBQUtsUixLQUFLLENBQUNvbUIsVUFBVSxHQUNqQmxWLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29tQixVQUFVLEdBQ3JCbFYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK1ksVUFBVSxJQUFJN0gsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLEdBQzNDb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLEdBQ3BCb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOFksWUFBWSxJQUFJNUgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFPLEdBQzNDbVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFPLEdBQ2xCbEQsT0FBTyxFQUFFLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtFQUVuQjtNQUFBd1UsZUFBQSxDQUFBSCxLQUFBLEVBQ2lCLGdCQUFBLEVBQUEsWUFBQTtFQUFBLE1BQUEsSUFBQXNsQixvQkFBQSxDQUFBO0VBQUEsTUFBQSxPQUFBLENBQUFBLG9CQUFBLEdBQ2Z0bEIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeVksUUFBUSxNQUFBK2QsSUFBQUEsSUFBQUEsb0JBQUEsS0FBbkJBLEtBQUFBLENBQUFBLEdBQUFBLEtBQUFBLENBQUFBLEdBQUFBLG9CQUFBLENBQXFCMVAsTUFBTSxDQUFDLFVBQUMyUCxXQUFXLEVBQUV6b0IsT0FBTyxFQUFLO1VBQ3BELElBQU05TyxJQUFJLEdBQUcsSUFBSS9CLElBQUksQ0FBQzZRLE9BQU8sQ0FBQzlPLElBQUksQ0FBQyxDQUFBO0VBQ25DLFFBQUEsSUFBSSxDQUFDOUIsaUJBQU8sQ0FBQzhCLElBQUksQ0FBQyxFQUFFO0VBQ2xCLFVBQUEsT0FBT3UzQixXQUFXLENBQUE7RUFDcEIsU0FBQTtVQUVBLE9BQUEvMkIsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBMk8sa0JBQUEsQ0FBV29vQixXQUFXLElBQUF6SCxjQUFBLENBQUFBLGNBQUEsQ0FBQSxFQUFBLEVBQU9oaEIsT0FBTyxDQUFBLEVBQUEsRUFBQSxFQUFBO0VBQUU5TyxVQUFBQSxJQUFJLEVBQUpBLElBQUFBO0VBQUksU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1NBQzNDLEVBQUUsRUFBRSxDQUFDLENBQUE7RUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBbVMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFVyxZQUFNO0VBQUEsTUFBQSxJQUFBdFIsSUFBQSxDQUFBO0VBQ3ZCLE1BQUEsSUFBTTgyQixtQkFBbUIsR0FBR3hsQixLQUFBLENBQUt5bEIsZUFBZSxFQUFFLENBQUE7RUFDbEQsTUFBQSxJQUFNbDVCLE9BQU8sR0FBR29PLG1CQUFtQixDQUFDcUYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLENBQUE7RUFDL0MsTUFBQSxJQUFNa0YsT0FBTyxHQUFHK0csbUJBQW1CLENBQUNpRixLQUFBLENBQUtsUixLQUFLLENBQUMsQ0FBQTtFQUMvQyxNQUFBLElBQU00MkIsbUJBQW1CLEdBQ3ZCbjVCLE9BQU8sSUFBSTJCLGlCQUFRLENBQUNzM0IsbUJBQW1CLEVBQUVsMUIscUJBQVUsQ0FBQy9ELE9BQU8sQ0FBQyxDQUFDLEdBQ3pEQSxPQUFPLEdBQ1B5SCxPQUFPLElBQUkrSixlQUFPLENBQUN5bkIsbUJBQW1CLEVBQUVwekIsaUJBQVEsQ0FBQzRCLE9BQU8sQ0FBQyxDQUFDLEdBQ3hEQSxPQUFPLEdBQ1B3eEIsbUJBQW1CLENBQUE7UUFDM0IsT0FBTztFQUNMcEMsUUFBQUEsSUFBSSxFQUFFcGpCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzYyQixTQUFTLElBQUksS0FBSztFQUNuQ0MsUUFBQUEsWUFBWSxFQUFFLEtBQUs7VUFDbkIzZSxZQUFZLEVBQUEsQ0FBQXZZLElBQUEsR0FDVHNSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2daLFlBQVksR0FDcEI5SCxLQUFBLENBQUtsUixLQUFLLENBQUNGLFNBQVMsR0FDcEJvUixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLE1BQUEsSUFBQSxJQUFBdFksSUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBQSxJQUFBLEdBQUtnM0IsbUJBQW1CO0VBQ2pEO0VBQ0E7VUFDQXZxQixjQUFjLEVBQUVELG9CQUFvQixDQUFDOEUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcU0sY0FBYyxDQUFDO0VBQy9EMHFCLFFBQUFBLE9BQU8sRUFBRSxLQUFLO0VBQ2Q7RUFDQTtFQUNBemEsUUFBQUEsb0JBQW9CLEVBQUUsS0FBSztFQUMzQitPLFFBQUFBLHVCQUF1QixFQUFFLEtBQUE7U0FDMUIsQ0FBQTtPQUNGLENBQUEsQ0FBQTtNQUFBaGEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsMEJBQUEsRUFFMEIsWUFBTTtRQUMvQixJQUFJQSxLQUFBLENBQUs4bEIsbUJBQW1CLEVBQUU7RUFDNUJDLFFBQUFBLFlBQVksQ0FBQy9sQixLQUFBLENBQUs4bEIsbUJBQW1CLENBQUMsQ0FBQTtFQUN4QyxPQUFBO09BQ0QsQ0FBQSxDQUFBO01BQUEzbEIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsVUFBQSxFQUVVLFlBQU07UUFDZixJQUFJQSxLQUFBLENBQUtnbUIsS0FBSyxJQUFJaG1CLEtBQUEsQ0FBS2dtQixLQUFLLENBQUNyYSxLQUFLLEVBQUU7RUFDbEMzTCxRQUFBQSxLQUFBLENBQUtnbUIsS0FBSyxDQUFDcmEsS0FBSyxDQUFDO0VBQUVDLFVBQUFBLGFBQWEsRUFBRSxJQUFBO0VBQUssU0FBQyxDQUFDLENBQUE7RUFDM0MsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBekwsZUFBQSxDQUFBSCxLQUFBLEVBQUEsU0FBQSxFQUVTLFlBQU07UUFDZCxJQUFJQSxLQUFBLENBQUtnbUIsS0FBSyxJQUFJaG1CLEtBQUEsQ0FBS2dtQixLQUFLLENBQUNDLElBQUksRUFBRTtFQUNqQ2ptQixRQUFBQSxLQUFBLENBQUtnbUIsS0FBSyxDQUFDQyxJQUFJLEVBQUUsQ0FBQTtFQUNuQixPQUFBO1FBRUFqbUIsS0FBQSxDQUFLa21CLGdCQUFnQixFQUFFLENBQUE7T0FDeEIsQ0FBQSxDQUFBO0VBQUEvbEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVMsU0FBQSxFQUFBLFVBQUNvakIsSUFBSSxFQUEwQjtFQUFBLE1BQUEsSUFBeEIrQyxXQUFXLEdBQUFyeUIsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsS0FBSyxDQUFBO1FBQ2xDa00sS0FBQSxDQUFLc0IsUUFBUSxDQUNYO0VBQ0U4aEIsUUFBQUEsSUFBSSxFQUFFQSxJQUFJO1VBQ1ZuYyxZQUFZLEVBQ1ZtYyxJQUFJLElBQUlwakIsS0FBQSxDQUFLTSxLQUFLLENBQUM4aUIsSUFBSSxHQUNuQnBqQixLQUFBLENBQUtNLEtBQUssQ0FBQzJHLFlBQVksR0FDdkJqSCxLQUFBLENBQUtvbUIsZ0JBQWdCLEVBQUUsQ0FBQ25mLFlBQVk7RUFDMUNvZixRQUFBQSxtQkFBbUIsRUFBRUMsNkJBQUFBO0VBQ3ZCLE9BQUMsRUFDRCxZQUFNO1VBQ0osSUFBSSxDQUFDbEQsSUFBSSxFQUFFO0VBQ1RwakIsVUFBQUEsS0FBQSxDQUFLc0IsUUFBUSxDQUNYLFVBQUN1VSxJQUFJLEVBQUE7Y0FBQSxPQUFNO0VBQ1RnUSxjQUFBQSxPQUFPLEVBQUVNLFdBQVcsR0FBR3RRLElBQUksQ0FBQ2dRLE9BQU8sR0FBRyxLQUFBO2VBQ3ZDLENBQUE7RUFBQSxXQUFDLEVBQ0YsWUFBTTtFQUNKLFlBQUEsQ0FBQ00sV0FBVyxJQUFJbm1CLEtBQUEsQ0FBS3VtQixPQUFPLEVBQUUsQ0FBQTtjQUU5QnZtQixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFBRWtsQixjQUFBQSxVQUFVLEVBQUUsSUFBQTtFQUFLLGFBQUMsQ0FBQyxDQUFBO0VBQ3JDLFdBQ0YsQ0FBQyxDQUFBO0VBQ0gsU0FBQTtFQUNGLE9BQ0YsQ0FBQyxDQUFBO09BQ0YsQ0FBQSxDQUFBO01BQUFybUIsZUFBQSxDQUFBSCxLQUFBLEVBQ1MsU0FBQSxFQUFBLFlBQUE7RUFBQSxNQUFBLE9BQU10RSxhQUFNLENBQUNzRSxLQUFBLENBQUtNLEtBQUssQ0FBQzJHLFlBQVksQ0FBQyxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7TUFBQTlHLGVBQUEsQ0FBQUgsS0FBQSxFQUU5QixnQkFBQSxFQUFBLFlBQUE7RUFBQSxNQUFBLE9BQ2ZBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3MwQixJQUFJLEtBQUtydkIsU0FBUyxHQUN6QmlNLEtBQUEsQ0FBS00sS0FBSyxDQUFDOGlCLElBQUksSUFBSSxDQUFDcGpCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2l6QixRQUFRLElBQUksQ0FBQy9oQixLQUFBLENBQUtsUixLQUFLLENBQUMyM0IsUUFBUSxHQUMvRHptQixLQUFBLENBQUtsUixLQUFLLENBQUNzMEIsSUFBSSxDQUFBO0VBQUEsS0FBQSxDQUFBLENBQUE7RUFBQWpqQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFUCxhQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQ3ZCLE1BQUEsSUFBSSxDQUFDUyxLQUFBLENBQUtNLEtBQUssQ0FBQ3NsQixZQUFZLEVBQUU7RUFDNUI1bEIsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb3VCLE9BQU8sQ0FBQzNkLEtBQUssQ0FBQyxDQUFBO0VBQ3pCLFFBQUEsSUFBSSxDQUFDUyxLQUFBLENBQUtsUixLQUFLLENBQUM0M0Isa0JBQWtCLElBQUksQ0FBQzFtQixLQUFBLENBQUtsUixLQUFLLENBQUMyM0IsUUFBUSxFQUFFO0VBQzFEem1CLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUNwQixTQUFBO0VBQ0YsT0FBQTtRQUNBdEUsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUV1a0IsUUFBQUEsT0FBTyxFQUFFLElBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQTtPQUNqQyxDQUFBLENBQUE7TUFBQTFsQixlQUFBLENBQUFILEtBQUEsRUFBQSxzQkFBQSxFQUVzQixZQUFNO0VBQzNCO1FBQ0EsSUFBSUEsS0FBQSxDQUFLOGxCLG1CQUFtQixFQUFFO1VBQzVCOWxCLEtBQUEsQ0FBSzJtQix3QkFBd0IsRUFBRSxDQUFBO0VBQ2pDLE9BQUE7O0VBRUE7RUFDQTtFQUNBO1FBQ0EzbUIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUVza0IsUUFBQUEsWUFBWSxFQUFFLElBQUE7RUFBSyxPQUFDLEVBQUUsWUFBTTtFQUMxQzVsQixRQUFBQSxLQUFBLENBQUs4bEIsbUJBQW1CLEdBQUdjLFVBQVUsQ0FBQyxZQUFNO1lBQzFDNW1CLEtBQUEsQ0FBSzZtQixRQUFRLEVBQUUsQ0FBQTtZQUNmN21CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFc2tCLFlBQUFBLFlBQVksRUFBRSxLQUFBO0VBQU0sV0FBQyxDQUFDLENBQUE7RUFDeEMsU0FBQyxDQUFDLENBQUE7RUFDSixPQUFDLENBQUMsQ0FBQTtPQUNILENBQUEsQ0FBQTtNQUFBemxCLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRWtCLFlBQU07RUFDdkIrbEIsTUFBQUEsWUFBWSxDQUFDL2xCLEtBQUEsQ0FBSzhtQixpQkFBaUIsQ0FBQyxDQUFBO1FBQ3BDOW1CLEtBQUEsQ0FBSzhtQixpQkFBaUIsR0FBRyxJQUFJLENBQUE7T0FDOUIsQ0FBQSxDQUFBO01BQUEzbUIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsaUJBQUEsRUFFaUIsWUFBTTtRQUN0QkEsS0FBQSxDQUFLa21CLGdCQUFnQixFQUFFLENBQUE7RUFDdkJsbUIsTUFBQUEsS0FBQSxDQUFLOG1CLGlCQUFpQixHQUFHRixVQUFVLENBQUMsWUFBQTtFQUFBLFFBQUEsT0FBTTVtQixLQUFBLENBQUs2bUIsUUFBUSxFQUFFLENBQUE7RUFBQSxPQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUE7T0FDOUQsQ0FBQSxDQUFBO01BQUExbUIsZUFBQSxDQUFBSCxLQUFBLEVBQUEscUJBQUEsRUFFcUIsWUFBTTtRQUMxQkEsS0FBQSxDQUFLa21CLGdCQUFnQixFQUFFLENBQUE7T0FDeEIsQ0FBQSxDQUFBO0VBQUEvbEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVksWUFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUN0QixNQUFBLElBQUksQ0FBQ1MsS0FBQSxDQUFLTSxLQUFLLENBQUM4aUIsSUFBSSxJQUFJcGpCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3N3QixVQUFVLElBQUlwZixLQUFBLENBQUtsUixLQUFLLENBQUN5d0IsYUFBYSxFQUFFO0VBQ3pFdmYsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaTRCLE1BQU0sQ0FBQ3huQixLQUFLLENBQUMsQ0FBQTtFQUMxQixPQUFBO1FBRUFTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFdWtCLFFBQUFBLE9BQU8sRUFBRSxLQUFBO0VBQU0sT0FBQyxDQUFDLENBQUE7T0FDbEMsQ0FBQSxDQUFBO0VBQUExbEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRTRCLDRCQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQ3RDLE1BQUEsSUFBSSxDQUFDUyxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLEVBQUU7RUFDdEJuTCxRQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDckIsT0FBQTtFQUNBdEUsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1UsY0FBYyxDQUFDM0QsS0FBSyxDQUFDLENBQUE7RUFDaEMsTUFBQSxJQUFJUyxLQUFBLENBQUtsUixLQUFLLENBQUNzd0IsVUFBVSxFQUFFO1VBQ3pCN2YsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7RUFDeEIsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBcEcsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQWdCO0VBQUEsTUFBQSxLQUFBLElBQUFvRCxJQUFBLEdBQUF0UCxTQUFBLENBQUFoRyxNQUFBLEVBQVprNUIsT0FBTyxHQUFBbjZCLElBQUFBLEtBQUEsQ0FBQXVXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0VBQVAwakIsUUFBQUEsT0FBTyxDQUFBMWpCLElBQUEsQ0FBQXhQLEdBQUFBLFNBQUEsQ0FBQXdQLElBQUEsQ0FBQSxDQUFBO0VBQUEsT0FBQTtFQUN4QixNQUFBLElBQUkvRCxLQUFLLEdBQUd5bkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3RCLE1BQUEsSUFBSWhuQixLQUFBLENBQUtsUixLQUFLLENBQUNtNEIsV0FBVyxFQUFFO1VBQzFCam5CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ200QixXQUFXLENBQUM5YyxLQUFLLENBQUFuSyxLQUFBLEVBQU9nbkIsT0FBTyxDQUFDLENBQUE7RUFDM0MsUUFBQSxJQUNFLE9BQU96bkIsS0FBSyxDQUFDMm5CLGtCQUFrQixLQUFLLFVBQVUsSUFDOUMzbkIsS0FBSyxDQUFDMm5CLGtCQUFrQixFQUFFLEVBQzFCO0VBQ0EsVUFBQSxPQUFBO0VBQ0YsU0FBQTtFQUNGLE9BQUE7UUFDQWxuQixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFDWmtsQixRQUFBQSxVQUFVLEVBQUVqbkIsS0FBSyxDQUFDa0UsTUFBTSxDQUFDN1gsS0FBSztFQUM5Qnk2QixRQUFBQSxtQkFBbUIsRUFBRWMsMEJBQUFBO0VBQ3ZCLE9BQUMsQ0FBQyxDQUFBO0VBQ0YsTUFBQSxJQUFJbjVCLElBQUksR0FBRzdCLFNBQVMsQ0FDbEJvVCxLQUFLLENBQUNrRSxNQUFNLENBQUM3WCxLQUFLLEVBQ2xCb1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMUMsVUFBVSxFQUNyQjRULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakIyVCxLQUFBLENBQUtsUixLQUFLLENBQUN4QyxhQUFhLEVBQ3hCMFQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FDYixDQUFDLENBQUE7RUFDRDtRQUNBLElBQ0V5VCxLQUFBLENBQUtsUixLQUFLLENBQUNvbkIsa0JBQWtCLElBQzdCbFcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxJQUNuQmhaLElBQUksSUFDSixDQUFDNEQsU0FBUyxDQUFDNUQsSUFBSSxFQUFFZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDa1ksUUFBUSxDQUFDLEVBQ3JDO1VBQ0FoWixJQUFJLEdBQUdnTyxPQUFHLENBQUNnRSxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEVBQUU7RUFDOUJvZ0IsVUFBQUEsS0FBSyxFQUFFcndCLGlCQUFRLENBQUMvSSxJQUFJLENBQUM7RUFDckJxNUIsVUFBQUEsT0FBTyxFQUFFcndCLHFCQUFVLENBQUNoSixJQUFJLENBQUM7WUFDekJ5USxPQUFPLEVBQUV4SCxxQkFBVSxDQUFDakosSUFBSSxDQUFBO0VBQzFCLFNBQUMsQ0FBQyxDQUFBO0VBQ0osT0FBQTtRQUNBLElBQUlBLElBQUksSUFBSSxDQUFDdVIsS0FBSyxDQUFDa0UsTUFBTSxDQUFDN1gsS0FBSyxFQUFFO1VBQy9Cb1UsS0FBQSxDQUFLc25CLFdBQVcsQ0FBQ3Q1QixJQUFJLEVBQUV1UixLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDckMsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBWSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsVUFBQ2hTLElBQUksRUFBRXVSLEtBQUssRUFBRXdhLGVBQWUsRUFBSztFQUMvQyxNQUFBLElBQUkvWixLQUFBLENBQUtsUixLQUFLLENBQUN5ZSxtQkFBbUIsSUFBSSxDQUFDdk4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDaXRCLGNBQWMsRUFBRTtFQUNoRTtFQUNBO1VBQ0EvYixLQUFBLENBQUt1bkIsb0JBQW9CLEVBQUUsQ0FBQTtFQUM3QixPQUFBO0VBQ0EsTUFBQSxJQUFJdm5CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ200QixXQUFXLEVBQUU7RUFDMUJqbkIsUUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbTRCLFdBQVcsQ0FBQzFuQixLQUFLLENBQUMsQ0FBQTtFQUMvQixPQUFBO1FBQ0FTLEtBQUEsQ0FBS3NuQixXQUFXLENBQUN0NUIsSUFBSSxFQUFFdVIsS0FBSyxFQUFFLEtBQUssRUFBRXdhLGVBQWUsQ0FBQyxDQUFBO0VBQ3JELE1BQUEsSUFBSS9aLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzA0QixjQUFjLEVBQUU7VUFDN0J4bkIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUU2WSxVQUFBQSx1QkFBdUIsRUFBRSxJQUFBO0VBQUssU0FBQyxDQUFDLENBQUE7RUFDbEQsT0FBQTtFQUNBLE1BQUEsSUFBSSxDQUFDbmEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeWUsbUJBQW1CLElBQUl2TixLQUFBLENBQUtsUixLQUFLLENBQUNpdEIsY0FBYyxFQUFFO0VBQ2hFL2IsUUFBQUEsS0FBQSxDQUFLa1EsZUFBZSxDQUFDbGlCLElBQUksQ0FBQyxDQUFBO1NBQzNCLE1BQU0sSUFBSSxDQUFDZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxFQUFFO0VBQzdCLFFBQUEsSUFBSSxDQUFDbkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1osWUFBWSxFQUFFO0VBQzVCOUgsVUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3JCLFNBQUE7RUFFQSxRQUFBLElBQUE4QyxXQUFBLEdBQStCcEgsS0FBQSxDQUFLbFIsS0FBSztZQUFqQ0YsU0FBUyxHQUFBd1ksV0FBQSxDQUFUeFksU0FBUztZQUFFQyxPQUFPLEdBQUF1WSxXQUFBLENBQVB2WSxPQUFPLENBQUE7RUFFMUIsUUFBQSxJQUNFRCxTQUFTLElBQ1QsQ0FBQ0MsT0FBTyxLQUNQbVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMjRCLFNBQVMsSUFBSSxDQUFDdm9CLFlBQVksQ0FBQ2xSLElBQUksRUFBRVksU0FBUyxDQUFDLENBQUMsRUFDeEQ7RUFDQW9SLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNyQixTQUFBO0VBQ0YsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBbkUsZUFBQSxDQUFBSCxLQUFBLEVBQUEsYUFBQSxFQUVhLFVBQUNoUyxJQUFJLEVBQUV1UixLQUFLLEVBQUVtb0IsU0FBUyxFQUFFM04sZUFBZSxFQUFLO1FBQ3pELElBQUk5VCxXQUFXLEdBQUdqWSxJQUFJLENBQUE7RUFFdEIsTUFBQSxJQUFJZ1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWMsRUFBRTtFQUM3QixRQUFBLElBQ0U3VSxXQUFXLEtBQUssSUFBSSxJQUNwQmhRLGNBQWMsQ0FBQ1osZUFBTyxDQUFDNFEsV0FBVyxDQUFDLEVBQUVqRyxLQUFBLENBQUtsUixLQUFLLENBQUMsRUFDaEQ7RUFDQSxVQUFBLE9BQUE7RUFDRixTQUFBO0VBQ0YsT0FBQyxNQUFNLElBQUlrUixLQUFBLENBQUtsUixLQUFLLENBQUMwa0IsbUJBQW1CLEVBQUU7RUFDekMsUUFBQSxJQUFJdk4sV0FBVyxLQUFLLElBQUksSUFBSWxSLGVBQWUsQ0FBQ2tSLFdBQVcsRUFBRWpHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxFQUFFO0VBQ3BFLFVBQUEsT0FBQTtFQUNGLFNBQUE7RUFDRixPQUFDLE1BQU07RUFDTCxRQUFBLElBQUltWCxXQUFXLEtBQUssSUFBSSxJQUFJclMsYUFBYSxDQUFDcVMsV0FBVyxFQUFFakcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDLEVBQUU7RUFDbEUsVUFBQSxPQUFBO0VBQ0YsU0FBQTtFQUNGLE9BQUE7RUFFQSxNQUFBLElBQUF3WSxZQUFBLEdBU0l0SCxLQUFBLENBQUtsUixLQUFLO1VBUlo2UixRQUFRLEdBQUEyRyxZQUFBLENBQVIzRyxRQUFRO1VBQ1JtSCxZQUFZLEdBQUFSLFlBQUEsQ0FBWlEsWUFBWTtVQUNabFosU0FBUyxHQUFBMFksWUFBQSxDQUFUMVksU0FBUztVQUNUQyxPQUFPLEdBQUF5WSxZQUFBLENBQVB6WSxPQUFPO1VBQ1BnWSxlQUFlLEdBQUFTLFlBQUEsQ0FBZlQsZUFBZTtVQUNmQyxhQUFhLEdBQUFRLFlBQUEsQ0FBYlIsYUFBYTtVQUNiclAsT0FBTyxHQUFBNlAsWUFBQSxDQUFQN1AsT0FBTztVQUNQZ3dCLFNBQVMsR0FBQW5nQixZQUFBLENBQVRtZ0IsU0FBUyxDQUFBO1FBR1gsSUFDRSxDQUFDMzFCLE9BQU8sQ0FBQ2tPLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFBRWYsV0FBVyxDQUFDLElBQzFDakcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNjRCLFlBQVksSUFDdkI3ZixZQUFZLElBQ1pqQixlQUFlLEVBQ2Y7VUFDQSxJQUFJWixXQUFXLEtBQUssSUFBSSxFQUFFO0VBQ3hCLFVBQUEsSUFDRWpHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsS0FDbEIsQ0FBQzBnQixTQUFTLElBQ1IsQ0FBQzFuQixLQUFBLENBQUtsUixLQUFLLENBQUNpdEIsY0FBYyxJQUN6QixDQUFDL2IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb25CLGtCQUFrQixJQUM5QixDQUFDbFcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeXdCLGFBQWMsQ0FBQyxFQUMvQjtFQUNBdFosWUFBQUEsV0FBVyxHQUFHM1csT0FBTyxDQUFDMlcsV0FBVyxFQUFFO2dCQUNqQ3hXLElBQUksRUFBRXNILGlCQUFRLENBQUNpSixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUM7Z0JBQ25DclgsTUFBTSxFQUFFcUgscUJBQVUsQ0FBQ2dKLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQztFQUN2Q25YLGNBQUFBLE1BQU0sRUFBRW9ILHFCQUFVLENBQUMrSSxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLENBQUE7RUFDeEMsYUFBQyxDQUFDLENBQUE7RUFDSixXQUFBOztFQUVBO0VBQ0EsVUFBQSxJQUNFLENBQUMwZ0IsU0FBUyxLQUNUMW5CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2l0QixjQUFjLElBQUkvYixLQUFBLENBQUtsUixLQUFLLENBQUNvbkIsa0JBQWtCLENBQUMsRUFDNUQ7RUFDQSxZQUFBLElBQUl6ZSxPQUFPLEVBQUU7RUFDWHdPLGNBQUFBLFdBQVcsR0FBRzNXLE9BQU8sQ0FBQzJXLFdBQVcsRUFBRTtFQUNqQ3hXLGdCQUFBQSxJQUFJLEVBQUVnSSxPQUFPLENBQUNWLFFBQVEsRUFBRTtFQUN4QnBILGdCQUFBQSxNQUFNLEVBQUU4SCxPQUFPLENBQUNULFVBQVUsRUFBRTtFQUM1Qm5ILGdCQUFBQSxNQUFNLEVBQUU0SCxPQUFPLENBQUNSLFVBQVUsRUFBQztFQUM3QixlQUFDLENBQUMsQ0FBQTtFQUNKLGFBQUE7RUFDRixXQUFBO0VBRUEsVUFBQSxJQUFJLENBQUMrSSxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLEVBQUU7Y0FDdEJuTCxLQUFBLENBQUtzQixRQUFRLENBQUM7RUFDWjJGLGNBQUFBLFlBQVksRUFBRWhCLFdBQUFBO0VBQ2hCLGFBQUMsQ0FBQyxDQUFBO0VBQ0osV0FBQTtFQUNBLFVBQUEsSUFBSSxDQUFDakcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDODRCLGtCQUFrQixFQUFFO2NBQ2xDNW5CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFeVksY0FBQUEsZUFBZSxFQUFFQSxlQUFBQTtFQUFnQixhQUFDLENBQUMsQ0FBQTtFQUNyRCxXQUFBO0VBQ0YsU0FBQTtFQUNBLFFBQUEsSUFBSWpTLFlBQVksRUFBRTtFQUNoQixVQUFBLElBQU0rZixRQUFRLEdBQUcsQ0FBQ2o1QixTQUFTLElBQUksQ0FBQ0MsT0FBTyxDQUFBO0VBQ3ZDLFVBQUEsSUFBTWk1QixhQUFhLEdBQUdsNUIsU0FBUyxJQUFJLENBQUNDLE9BQU8sQ0FBQTtFQUMzQyxVQUFBLElBQU1rNUIsYUFBYSxHQUFHbjVCLFNBQVMsSUFBSUMsT0FBTyxDQUFBO0VBQzFDLFVBQUEsSUFBSWc1QixRQUFRLEVBQUU7Y0FDWmxuQixRQUFRLENBQUMsQ0FBQ3NGLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRTFHLEtBQUssQ0FBQyxDQUFBO2FBQ3JDLE1BQU0sSUFBSXVvQixhQUFhLEVBQUU7Y0FDeEIsSUFBSTdoQixXQUFXLEtBQUssSUFBSSxFQUFFO2dCQUN4QnRGLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRXBCLEtBQUssQ0FBQyxDQUFBO2VBQzlCLE1BQU0sSUFBSUwsWUFBWSxDQUFDK0csV0FBVyxFQUFFclgsU0FBUyxDQUFDLEVBQUU7RUFDL0MsY0FBQSxJQUFJNjRCLFNBQVMsRUFBRTtrQkFDYjltQixRQUFRLENBQUMsQ0FBQ3NGLFdBQVcsRUFBRXJYLFNBQVMsQ0FBQyxFQUFFMlEsS0FBSyxDQUFDLENBQUE7RUFDM0MsZUFBQyxNQUFNO2tCQUNMb0IsUUFBUSxDQUFDLENBQUNzRixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtFQUN0QyxlQUFBO0VBQ0YsYUFBQyxNQUFNO2dCQUNMb0IsUUFBUSxDQUFDLENBQUMvUixTQUFTLEVBQUVxWCxXQUFXLENBQUMsRUFBRTFHLEtBQUssQ0FBQyxDQUFBO0VBQzNDLGFBQUE7RUFDRixXQUFBO0VBQ0EsVUFBQSxJQUFJd29CLGFBQWEsRUFBRTtjQUNqQnBuQixRQUFRLENBQUMsQ0FBQ3NGLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRTFHLEtBQUssQ0FBQyxDQUFBO0VBQ3RDLFdBQUE7V0FDRCxNQUFNLElBQUlzSCxlQUFlLEVBQUU7WUFDMUIsSUFBSSxFQUFDQyxhQUFhLEtBQWJBLElBQUFBLElBQUFBLGFBQWEsZUFBYkEsYUFBYSxDQUFFaFosTUFBTSxDQUFFLEVBQUE7RUFDMUI2UyxZQUFBQSxRQUFRLENBQUMsQ0FBQ3NGLFdBQVcsQ0FBQyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7RUFDaEMsV0FBQyxNQUFNO0VBQ0wsWUFBQSxJQUFNeW9CLDRCQUE0QixHQUFHbGhCLGFBQWEsQ0FBQ3ZTLElBQUksQ0FDckQsVUFBQzB6QixZQUFZLEVBQUE7RUFBQSxjQUFBLE9BQUtyMkIsU0FBUyxDQUFDcTJCLFlBQVksRUFBRWhpQixXQUFXLENBQUMsQ0FBQTtFQUFBLGFBQ3hELENBQUMsQ0FBQTtFQUVELFlBQUEsSUFBSStoQiw0QkFBNEIsRUFBRTtFQUNoQyxjQUFBLElBQU1FLFNBQVMsR0FBR3BoQixhQUFhLENBQUNoTSxNQUFNLENBQ3BDLFVBQUNtdEIsWUFBWSxFQUFBO0VBQUEsZ0JBQUEsT0FBSyxDQUFDcjJCLFNBQVMsQ0FBQ3EyQixZQUFZLEVBQUVoaUIsV0FBVyxDQUFDLENBQUE7RUFBQSxlQUN6RCxDQUFDLENBQUE7RUFFRHRGLGNBQUFBLFFBQVEsQ0FBQ3VuQixTQUFTLEVBQUUzb0IsS0FBSyxDQUFDLENBQUE7RUFDNUIsYUFBQyxNQUFNO2dCQUNMb0IsUUFBUSxDQUFBLEVBQUEsQ0FBQW5TLE1BQUEsQ0FBQTJPLGtCQUFBLENBQUsySixhQUFhLENBQUViLEVBQUFBLENBQUFBLFdBQVcsQ0FBRzFHLENBQUFBLEVBQUFBLEtBQUssQ0FBQyxDQUFBO0VBQ2xELGFBQUE7RUFDRixXQUFBO0VBQ0YsU0FBQyxNQUFNO0VBQ0xvQixVQUFBQSxRQUFRLENBQUNzRixXQUFXLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtFQUM5QixTQUFBO0VBQ0YsT0FBQTtRQUVBLElBQUksQ0FBQ21vQixTQUFTLEVBQUU7VUFDZDFuQixLQUFBLENBQUtsUixLQUFLLENBQUN1VixRQUFRLENBQUM0QixXQUFXLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtVQUN2Q1MsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUVrbEIsVUFBQUEsVUFBVSxFQUFFLElBQUE7RUFBSyxTQUFDLENBQUMsQ0FBQTtFQUNyQyxPQUFBO09BQ0QsQ0FBQSxDQUFBO0VBRUQ7RUFBQXJtQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFDa0IsaUJBQUEsRUFBQSxVQUFDaFMsSUFBSSxFQUFLO1FBQzFCLElBQU1tNkIsVUFBVSxHQUFHLE9BQU9ub0IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdkMsT0FBTyxLQUFLLFdBQVcsQ0FBQTtRQUM1RCxJQUFNNjdCLFVBQVUsR0FBRyxPQUFPcG9CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQU8sS0FBSyxXQUFXLENBQUE7UUFDNUQsSUFBSXEwQixvQkFBb0IsR0FBRyxJQUFJLENBQUE7RUFDL0IsTUFBQSxJQUFJcjZCLElBQUksRUFBRTtFQUNSLFFBQUEsSUFBTXM2QixjQUFjLEdBQUdoNEIscUJBQVUsQ0FBQ3RDLElBQUksQ0FBQyxDQUFBO1VBQ3ZDLElBQUltNkIsVUFBVSxJQUFJQyxVQUFVLEVBQUU7RUFDNUI7RUFDQUMsVUFBQUEsb0JBQW9CLEdBQUdyMkIsWUFBWSxDQUNqQ2hFLElBQUksRUFDSmdTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sRUFDbEJ5VCxLQUFBLENBQUtsUixLQUFLLENBQUNrRixPQUNiLENBQUMsQ0FBQTtXQUNGLE1BQU0sSUFBSW0wQixVQUFVLEVBQUU7WUFDckIsSUFBTUksaUJBQWlCLEdBQUdqNEIscUJBQVUsQ0FBQzBQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3ZDLE9BQU8sQ0FBQyxDQUFBO0VBQ3hEODdCLFVBQUFBLG9CQUFvQixHQUNsQnRxQixlQUFPLENBQUMvUCxJQUFJLEVBQUV1NkIsaUJBQWlCLENBQUMsSUFDaEN6MkIsT0FBTyxDQUFDdzJCLGNBQWMsRUFBRUMsaUJBQWlCLENBQUMsQ0FBQTtXQUM3QyxNQUFNLElBQUlILFVBQVUsRUFBRTtZQUNyQixJQUFNSSxlQUFlLEdBQUdwMkIsaUJBQVEsQ0FBQzROLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tGLE9BQU8sQ0FBQyxDQUFBO0VBQ3BEcTBCLFVBQUFBLG9CQUFvQixHQUNsQm42QixpQkFBUSxDQUFDRixJQUFJLEVBQUV3NkIsZUFBZSxDQUFDLElBQy9CMTJCLE9BQU8sQ0FBQ3cyQixjQUFjLEVBQUVFLGVBQWUsQ0FBQyxDQUFBO0VBQzVDLFNBQUE7RUFDRixPQUFBO0VBQ0EsTUFBQSxJQUFJSCxvQkFBb0IsRUFBRTtVQUN4QnJvQixLQUFBLENBQUtzQixRQUFRLENBQUM7RUFDWjJGLFVBQUFBLFlBQVksRUFBRWpaLElBQUFBO0VBQ2hCLFNBQUMsQ0FBQyxDQUFBO0VBQ0osT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBbVMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtRQUNyQkEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLENBQUN0RSxLQUFBLENBQUtNLEtBQUssQ0FBQzhpQixJQUFJLENBQUMsQ0FBQTtPQUMvQixDQUFBLENBQUE7RUFBQWpqQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxVQUFDcEosSUFBSSxFQUFLO0VBQzNCLE1BQUEsSUFBTW9RLFFBQVEsR0FBR2hILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsR0FDaENoSCxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEdBQ25CaEgsS0FBQSxDQUFLeWxCLGVBQWUsRUFBRSxDQUFBO0VBQzFCLE1BQUEsSUFBSXhmLFdBQVcsR0FBR2pHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsR0FDakNwUSxJQUFJLEdBQ0p0SCxPQUFPLENBQUMwWCxRQUFRLEVBQUU7RUFDaEJ2WCxRQUFBQSxJQUFJLEVBQUVzSCxpQkFBUSxDQUFDSCxJQUFJLENBQUM7VUFDcEJqSCxNQUFNLEVBQUVxSCxxQkFBVSxDQUFDSixJQUFJLENBQUE7RUFDekIsT0FBQyxDQUFDLENBQUE7UUFFTm9KLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUNaMkYsUUFBQUEsWUFBWSxFQUFFaEIsV0FBQUE7RUFDaEIsT0FBQyxDQUFDLENBQUE7RUFFRmpHLE1BQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZSLFFBQVEsQ0FBQ3NGLFdBQVcsQ0FBQyxDQUFBO0VBQ2hDLE1BQUEsSUFBSWpHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3llLG1CQUFtQixFQUFFO1VBQ2xDdk4sS0FBQSxDQUFLdW5CLG9CQUFvQixFQUFFLENBQUE7RUFDM0J2bkIsUUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3JCLE9BQUE7RUFDQSxNQUFBLElBQUl0RSxLQUFBLENBQUtsUixLQUFLLENBQUN5d0IsYUFBYSxFQUFFO0VBQzVCdmYsUUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQ3BCLE9BQUE7UUFDQSxJQUFJdEUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb25CLGtCQUFrQixJQUFJbFcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaXRCLGNBQWMsRUFBRTtVQUM5RC9iLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFNlksVUFBQUEsdUJBQXVCLEVBQUUsSUFBQTtFQUFLLFNBQUMsQ0FBQyxDQUFBO0VBQ2xELE9BQUE7UUFDQW5hLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFa2xCLFFBQUFBLFVBQVUsRUFBRSxJQUFBO0VBQUssT0FBQyxDQUFDLENBQUE7T0FDcEMsQ0FBQSxDQUFBO01BQUFybUIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07RUFDbkIsTUFBQSxJQUFJLENBQUNBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2l6QixRQUFRLElBQUksQ0FBQy9oQixLQUFBLENBQUtsUixLQUFLLENBQUMyM0IsUUFBUSxFQUFFO0VBQ2hEem1CLFFBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUNwQixPQUFBO0VBRUF0RSxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUMyNUIsWUFBWSxFQUFFLENBQUE7T0FDMUIsQ0FBQSxDQUFBO0VBQUF0b0IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQzFCUyxNQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNpZCxTQUFTLENBQUN4TSxLQUFLLENBQUMsQ0FBQTtFQUMzQixNQUFBLElBQU0rRyxRQUFRLEdBQUcvRyxLQUFLLENBQUM1RCxHQUFHLENBQUE7UUFFMUIsSUFDRSxDQUFDcUUsS0FBQSxDQUFLTSxLQUFLLENBQUM4aUIsSUFBSSxJQUNoQixDQUFDcGpCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FjLE1BQU0sSUFDbEIsQ0FBQ25MLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzQzQixrQkFBa0IsRUFDOUI7VUFDQSxJQUNFcGdCLFFBQVEsS0FBSyxXQUFXLElBQ3hCQSxRQUFRLEtBQUssU0FBUyxJQUN0QkEsUUFBUSxLQUFLLE9BQU8sRUFDcEI7WUFDQXRHLEtBQUEsQ0FBS3lvQixZQUFZLEVBQUUsQ0FBQTtFQUNyQixTQUFBO0VBQ0EsUUFBQSxPQUFBO0VBQ0YsT0FBQTs7RUFFQTtFQUNBLE1BQUEsSUFBSXpvQixLQUFBLENBQUtNLEtBQUssQ0FBQzhpQixJQUFJLEVBQUU7RUFDbkIsUUFBQSxJQUFJOWMsUUFBUSxLQUFLLFdBQVcsSUFBSUEsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUN0RC9HLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO0VBQ3RCLFVBQUEsSUFBTW1pQixjQUFjLEdBQ2xCMW9CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ZLGNBQWMsSUFBSWxILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZnQixlQUFlLEdBQ25ELDhDQUE4QyxHQUM5QzNQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tqQix1QkFBdUIsSUFDaENoUyxLQUFBLENBQUtsUixLQUFLLENBQUMwa0IsbUJBQW1CLEdBQzlCLDZDQUE2QyxHQUM3QyxzQ0FBc0MsQ0FBQTtFQUM5QyxVQUFBLElBQU1tVixZQUFZLEdBQ2hCM29CLEtBQUEsQ0FBSzRvQixRQUFRLENBQUNDLGFBQWEsSUFDM0I3b0IsS0FBQSxDQUFLNG9CLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDQyxhQUFhLENBQUNKLGNBQWMsQ0FBQyxDQUFBO0VBQzNEQyxVQUFBQSxZQUFZLElBQUlBLFlBQVksQ0FBQ2hkLEtBQUssQ0FBQztFQUFFQyxZQUFBQSxhQUFhLEVBQUUsSUFBQTtFQUFLLFdBQUMsQ0FBQyxDQUFBO0VBRTNELFVBQUEsT0FBQTtFQUNGLFNBQUE7VUFFQSxJQUFNbWQsSUFBSSxHQUFHcDlCLE9BQU8sQ0FBQ3FVLEtBQUEsQ0FBS00sS0FBSyxDQUFDMkcsWUFBWSxDQUFDLENBQUE7VUFDN0MsSUFBSVgsUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUN4Qi9HLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO0VBQ3RCLFVBQUEsSUFDRXZHLEtBQUEsQ0FBS2dwQixPQUFPLEVBQUUsSUFDZGhwQixLQUFBLENBQUtNLEtBQUssQ0FBQytsQixtQkFBbUIsS0FBS0MsNkJBQTZCLEVBQ2hFO0VBQ0F0bUIsWUFBQUEsS0FBQSxDQUFLaXBCLFlBQVksQ0FBQ0YsSUFBSSxFQUFFeHBCLEtBQUssQ0FBQyxDQUFBO2NBQzlCLENBQUNTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3llLG1CQUFtQixJQUFJdk4sS0FBQSxDQUFLa1EsZUFBZSxDQUFDNlksSUFBSSxDQUFDLENBQUE7RUFDL0QsV0FBQyxNQUFNO0VBQ0wvb0IsWUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3JCLFdBQUE7RUFDRixTQUFDLE1BQU0sSUFBSWdDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtZQUN0QnZHLEtBQUEsQ0FBS3VuQixvQkFBb0IsRUFBRSxDQUFBO0VBQzNCdm5CLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNyQixTQUFDLE1BQU0sSUFBSWdDLFFBQVEsS0FBSyxLQUFLLEVBQUU7RUFDN0J0RyxVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDckIsU0FBQTtFQUVBLFFBQUEsSUFBSSxDQUFDdEUsS0FBQSxDQUFLZ3BCLE9BQU8sRUFBRSxFQUFFO0VBQ25CaHBCLFVBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ282QixZQUFZLENBQUM7RUFBRUMsWUFBQUEsSUFBSSxFQUFFLENBQUM7RUFBRUMsWUFBQUEsR0FBRyxFQUFFaEUsV0FBQUE7RUFBWSxXQUFDLENBQUMsQ0FBQTtFQUN4RCxTQUFBO0VBQ0YsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUFBamxCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVpQixpQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUMzQixNQUFBLElBQU0rRyxRQUFRLEdBQUcvRyxLQUFLLENBQUM1RCxHQUFHLENBQUE7UUFDMUIsSUFBSTJLLFFBQVEsS0FBSyxRQUFRLEVBQUU7VUFDekIvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtVQUN0QnZHLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWDtFQUNFc2tCLFVBQUFBLFlBQVksRUFBRSxJQUFBO0VBQ2hCLFNBQUMsRUFDRCxZQUFNO0VBQ0o1bEIsVUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ25Cc2lCLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO2NBQ2Y1bUIsS0FBQSxDQUFLNm1CLFFBQVEsRUFBRSxDQUFBO2NBQ2Y3bUIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUVza0IsY0FBQUEsWUFBWSxFQUFFLEtBQUE7RUFBTSxhQUFDLENBQUMsQ0FBQTtFQUN4QyxXQUFDLENBQUMsQ0FBQTtFQUNKLFNBQ0YsQ0FBQyxDQUFBO0VBQ0gsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUVEO0VBQUF6bEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQ2UsY0FBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUN4QlMsTUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWQsU0FBUyxDQUFDeE0sS0FBSyxDQUFDLENBQUE7RUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDNUQsR0FBRyxDQUFBO0VBQzFCLE1BQUEsSUFBTTB0QixnQkFBZ0IsR0FBRzlwQixLQUFLLENBQUMrcEIsUUFBUSxDQUFBO1FBRXZDLElBQU1QLElBQUksR0FBR3A5QixPQUFPLENBQUNxVSxLQUFBLENBQUtNLEtBQUssQ0FBQzJHLFlBQVksQ0FBQyxDQUFBO1FBQzdDLElBQUlYLFFBQVEsS0FBSyxPQUFPLEVBQUU7VUFDeEIvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtFQUN0QnZHLFFBQUFBLEtBQUEsQ0FBS2lwQixZQUFZLENBQUNGLElBQUksRUFBRXhwQixLQUFLLENBQUMsQ0FBQTtVQUM5QixDQUFDUyxLQUFBLENBQUtsUixLQUFLLENBQUN5ZSxtQkFBbUIsSUFBSXZOLEtBQUEsQ0FBS2tRLGVBQWUsQ0FBQzZZLElBQUksQ0FBQyxDQUFBO0VBQy9ELE9BQUMsTUFBTSxJQUFJemlCLFFBQVEsS0FBSyxRQUFRLEVBQUU7VUFDaEMvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtFQUV0QnZHLFFBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNuQixRQUFBLElBQUksQ0FBQ3RFLEtBQUEsQ0FBS2dwQixPQUFPLEVBQUUsRUFBRTtFQUNuQmhwQixVQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvNkIsWUFBWSxDQUFDO0VBQUVDLFlBQUFBLElBQUksRUFBRSxDQUFDO0VBQUVDLFlBQUFBLEdBQUcsRUFBRWhFLFdBQUFBO0VBQVksV0FBQyxDQUFDLENBQUE7RUFDeEQsU0FBQTtTQUNELE1BQU0sSUFBSSxDQUFDcGxCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZYLDBCQUEwQixFQUFFO0VBQ2pELFFBQUEsSUFBSTRpQixZQUFZLENBQUE7RUFDaEIsUUFBQSxRQUFRampCLFFBQVE7RUFDZCxVQUFBLEtBQUssV0FBVztFQUNkLFlBQUEsSUFBSXRHLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29ZLGNBQWMsRUFBRTtFQUM3QnFpQixjQUFBQSxZQUFZLEdBQUdDLGlCQUFRLENBQUNULElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNsQyxhQUFDLE1BQU07RUFDTFEsY0FBQUEsWUFBWSxHQUFHRSxlQUFPLENBQUNWLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNqQyxhQUFBO0VBQ0EsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLFlBQVk7RUFDZixZQUFBLElBQUkvb0IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb1ksY0FBYyxFQUFFO0VBQzdCcWlCLGNBQUFBLFlBQVksR0FBR0csaUJBQVEsQ0FBQ1gsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ2xDLGFBQUMsTUFBTTtFQUNMUSxjQUFBQSxZQUFZLEdBQUcxYixlQUFPLENBQUNrYixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDakMsYUFBQTtFQUNBLFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxTQUFTO0VBQ1pRLFlBQUFBLFlBQVksR0FBR0MsaUJBQVEsQ0FBQ1QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ2hDLFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxXQUFXO0VBQ2RRLFlBQUFBLFlBQVksR0FBR0csaUJBQVEsQ0FBQ1gsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ2hDLFlBQUEsTUFBQTtFQUNGLFVBQUEsS0FBSyxRQUFRO0VBQ1hRLFlBQUFBLFlBQVksR0FBR0YsZ0JBQWdCLEdBQzNCOXZCLGlCQUFRLENBQUN3dkIsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUNqQjd3QixtQkFBUyxDQUFDNndCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUN0QixZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssVUFBVTtFQUNiUSxZQUFBQSxZQUFZLEdBQUdGLGdCQUFnQixHQUMzQmp2QixpQkFBUSxDQUFDMnVCLElBQUksRUFBRSxDQUFDLENBQUMsR0FDakJ2d0IsbUJBQVMsQ0FBQ3V3QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDdEIsWUFBQSxNQUFBO0VBQ0YsVUFBQSxLQUFLLE1BQU07RUFDVFEsWUFBQUEsWUFBWSxHQUFHaDVCLGNBQWMsQ0FDM0J3NEIsSUFBSSxFQUNKL29CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakIyVCxLQUFBLENBQUtsUixLQUFLLENBQUMwQixnQkFDYixDQUFDLENBQUE7RUFDRCxZQUFBLE1BQUE7RUFDRixVQUFBLEtBQUssS0FBSztFQUNSKzRCLFlBQUFBLFlBQVksR0FBR3I0QixZQUFZLENBQUM2M0IsSUFBSSxDQUFDLENBQUE7RUFDakMsWUFBQSxNQUFBO0VBQ0YsVUFBQTtFQUNFUSxZQUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFBO0VBQ25CLFlBQUEsTUFBQTtFQUNKLFNBQUE7VUFDQSxJQUFJLENBQUNBLFlBQVksRUFBRTtFQUNqQixVQUFBLElBQUl2cEIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbzZCLFlBQVksRUFBRTtFQUMzQmxwQixZQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNvNkIsWUFBWSxDQUFDO0VBQUVDLGNBQUFBLElBQUksRUFBRSxDQUFDO0VBQUVDLGNBQUFBLEdBQUcsRUFBRWhFLFdBQUFBO0VBQVksYUFBQyxDQUFDLENBQUE7RUFDeEQsV0FBQTtFQUNBLFVBQUEsT0FBQTtFQUNGLFNBQUE7VUFDQTdsQixLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtVQUN0QnZHLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFK2tCLFVBQUFBLG1CQUFtQixFQUFFQyw2QkFBQUE7RUFBOEIsU0FBQyxDQUFDLENBQUE7RUFDckUsUUFBQSxJQUFJdG1CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FWLGtCQUFrQixFQUFFO0VBQ2pDbkUsVUFBQUEsS0FBQSxDQUFLc25CLFdBQVcsQ0FBQ2lDLFlBQVksQ0FBQyxDQUFBO0VBQ2hDLFNBQUE7RUFDQXZwQixRQUFBQSxLQUFBLENBQUtrUSxlQUFlLENBQUNxWixZQUFZLENBQUMsQ0FBQTtFQUNsQztFQUNBLFFBQUEsSUFBSXZwQixLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFNLEVBQUU7RUFDckIsVUFBQSxJQUFNd2UsU0FBUyxHQUFHcDBCLGlCQUFRLENBQUN3ekIsSUFBSSxDQUFDLENBQUE7RUFDaEMsVUFBQSxJQUFNOVksUUFBUSxHQUFHMWEsaUJBQVEsQ0FBQ2cwQixZQUFZLENBQUMsQ0FBQTtFQUN2QyxVQUFBLElBQU1LLFFBQVEsR0FBR3YwQixlQUFPLENBQUMwekIsSUFBSSxDQUFDLENBQUE7RUFDOUIsVUFBQSxJQUFNbnBCLE9BQU8sR0FBR3ZLLGVBQU8sQ0FBQ2swQixZQUFZLENBQUMsQ0FBQTtFQUVyQyxVQUFBLElBQUlJLFNBQVMsS0FBSzFaLFFBQVEsSUFBSTJaLFFBQVEsS0FBS2hxQixPQUFPLEVBQUU7RUFDbEQ7Y0FDQUksS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUU4SixjQUFBQSxvQkFBb0IsRUFBRSxJQUFBO0VBQUssYUFBQyxDQUFDLENBQUE7RUFDL0MsV0FBQyxNQUFNO0VBQ0w7Y0FDQXBMLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztFQUFFOEosY0FBQUEsb0JBQW9CLEVBQUUsS0FBQTtFQUFNLGFBQUMsQ0FBQyxDQUFBO0VBQ2hELFdBQUE7RUFDRixTQUFBO0VBQ0YsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUVEO0VBQ0E7RUFBQWpMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUNrQixpQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUMzQixNQUFBLElBQU0rRyxRQUFRLEdBQUcvRyxLQUFLLENBQUM1RCxHQUFHLENBQUE7UUFDMUIsSUFBSTJLLFFBQVEsS0FBSyxRQUFRLEVBQUU7VUFDekIvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtVQUN0QnZHLEtBQUEsQ0FBS3VuQixvQkFBb0IsRUFBRSxDQUFBO0VBQzdCLE9BQUE7T0FDRCxDQUFBLENBQUE7RUFBQXBuQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0VBQ3hCLE1BQUEsSUFBSUEsS0FBSyxFQUFFO1VBQ1QsSUFBSUEsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFO1lBQ3hCaEgsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7RUFDeEIsU0FBQTtFQUNGLE9BQUE7UUFFQXZHLEtBQUEsQ0FBS3VuQixvQkFBb0IsRUFBRSxDQUFBO0VBRTNCLE1BQUEsSUFBSXZuQixLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFZLEVBQUU7RUFDM0I5SCxRQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUM2UixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUVwQixLQUFLLENBQUMsQ0FBQTtFQUMxQyxPQUFDLE1BQU07VUFDTFMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlIsUUFBUSxDQUFDLElBQUksRUFBRXBCLEtBQUssQ0FBQyxDQUFBO0VBQ2xDLE9BQUE7UUFDQVMsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0VBQUVrbEIsUUFBQUEsVUFBVSxFQUFFLElBQUE7RUFBSyxPQUFDLENBQUMsQ0FBQTtPQUNwQyxDQUFBLENBQUE7TUFBQXJtQixlQUFBLENBQUFILEtBQUEsRUFBQSxPQUFBLEVBRU8sWUFBTTtRQUNaQSxLQUFBLENBQUs2cEIsWUFBWSxFQUFFLENBQUE7T0FDcEIsQ0FBQSxDQUFBO0VBQUExcEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztFQUNwQixNQUFBLElBQ0UsT0FBT1MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZzdCLGFBQWEsS0FBSyxTQUFTLElBQzdDOXBCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2c3QixhQUFhLEVBQ3hCO1VBQ0EsSUFDRXZxQixLQUFLLENBQUNrRSxNQUFNLEtBQUt1SCxRQUFRLElBQ3pCekwsS0FBSyxDQUFDa0UsTUFBTSxLQUFLdUgsUUFBUSxDQUFDK2UsZUFBZSxJQUN6Q3hxQixLQUFLLENBQUNrRSxNQUFNLEtBQUt1SCxRQUFRLENBQUNFLElBQUksRUFDOUI7RUFDQWxMLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNyQixTQUFBO1NBQ0QsTUFBTSxJQUFJLE9BQU90RSxLQUFBLENBQUtsUixLQUFLLENBQUNnN0IsYUFBYSxLQUFLLFVBQVUsRUFBRTtVQUN6RCxJQUFJOXBCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2c3QixhQUFhLENBQUN2cUIsS0FBSyxDQUFDLEVBQUU7RUFDbkNTLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNyQixTQUFBO0VBQ0YsT0FBQTtPQUNELENBQUEsQ0FBQTtNQUFBbkUsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtFQUNyQixNQUFBLElBQUksQ0FBQ0EsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcWMsTUFBTSxJQUFJLENBQUNuTCxLQUFBLENBQUtncUIsY0FBYyxFQUFFLEVBQUU7RUFDaEQsUUFBQSxPQUFPLElBQUksQ0FBQTtFQUNiLE9BQUE7RUFDQSxNQUFBLG9CQUNFeHBCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lrQixlQUFlLEVBQUE7RUFDZHBpQixRQUFBQSxHQUFHLEVBQUUsU0FBQUEsR0FBQ21uQixDQUFBQSxJQUFJLEVBQUs7WUFDYmpxQixLQUFBLENBQUs0b0IsUUFBUSxHQUFHcUIsSUFBSSxDQUFBO1dBQ3BCO0VBQ0Y1OUIsUUFBQUEsTUFBTSxFQUFFMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDekMsTUFBTztFQUMxQm1FLFFBQUFBLGdCQUFnQixFQUFFd1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMEIsZ0JBQWlCO0VBQzlDc2QsUUFBQUEsd0JBQXdCLEVBQUU5TixLQUFBLENBQUtsUixLQUFLLENBQUNnZix3QkFBeUI7RUFDOURDLFFBQUFBLDBCQUEwQixFQUFFL04sS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWYsMEJBQTJCO0VBQ2xFMkIsUUFBQUEsbUJBQW1CLEVBQUUxUCxLQUFBLENBQUtsUixLQUFLLENBQUM0Z0IsbUJBQW9CO0VBQ3BEa1AsUUFBQUEsb0JBQW9CLEVBQUU1ZSxLQUFBLENBQUtsUixLQUFLLENBQUM4dkIsb0JBQXFCO0VBQ3REemEsUUFBQUEsa0JBQWtCLEVBQUVuRSxLQUFBLENBQUtsUixLQUFLLENBQUNxVixrQkFBbUI7VUFDbERHLE9BQU8sRUFBRXRFLEtBQUEsQ0FBS3NFLE9BQVE7RUFDdEJpSixRQUFBQSxtQkFBbUIsRUFBRXZOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3llLG1CQUFvQjtFQUNwRG5oQixRQUFBQSxVQUFVLEVBQUU0VCxLQUFBLENBQUtsUixLQUFLLENBQUNvN0Isa0JBQW1CO0VBQzFDclAsUUFBQUEsZ0JBQWdCLEVBQUU3YSxLQUFBLENBQUtsUixLQUFLLENBQUMrckIsZ0JBQWlCO0VBQzlDRCxRQUFBQSxhQUFhLEVBQUU1YSxLQUFBLENBQUtsUixLQUFLLENBQUM4ckIsYUFBYztFQUN4Q3BXLFFBQUFBLFlBQVksRUFBRXhFLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBWLFlBQWE7RUFDdEN3QyxRQUFBQSxRQUFRLEVBQUVoSCxLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFTO0VBQzlCQyxRQUFBQSxZQUFZLEVBQUVqSCxLQUFBLENBQUtNLEtBQUssQ0FBQzJHLFlBQWE7VUFDdEM1QyxRQUFRLEVBQUVyRSxLQUFBLENBQUtpcEIsWUFBYTtFQUM1QjViLFFBQUFBLFlBQVksRUFBRXJOLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VlLFlBQWE7RUFDdEM2SCxRQUFBQSxVQUFVLEVBQUVsVixLQUFBLENBQUtsUixLQUFLLENBQUNvbUIsVUFBVztFQUNsQzNvQixRQUFBQSxPQUFPLEVBQUV5VCxLQUFBLENBQUtsUixLQUFLLENBQUN2QyxPQUFRO0VBQzVCeUgsUUFBQUEsT0FBTyxFQUFFZ00sS0FBQSxDQUFLbFIsS0FBSyxDQUFDa0YsT0FBUTtFQUM1QjRULFFBQUFBLFlBQVksRUFBRTVILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzhZLFlBQWE7RUFDdENDLFFBQUFBLFVBQVUsRUFBRTdILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytZLFVBQVc7RUFDbENDLFFBQUFBLFlBQVksRUFBRTlILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2daLFlBQWE7RUFDdENqQixRQUFBQSxlQUFlLEVBQUU3RyxLQUFBLENBQUtsUixLQUFLLENBQUMrWCxlQUFnQjtFQUM1Q0MsUUFBQUEsYUFBYSxFQUFFOUcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ1ksYUFBYztFQUN4Q2xZLFFBQUFBLFNBQVMsRUFBRW9SLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0YsU0FBVTtFQUNoQ0MsUUFBQUEsT0FBTyxFQUFFbVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFRO0VBQzVCb0YsUUFBQUEsWUFBWSxFQUFFK0wsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbUYsWUFBYTtFQUN0Q0MsUUFBQUEsb0JBQW9CLEVBQUU4TCxLQUFBLENBQUtsUixLQUFLLENBQUNvRixvQkFBcUI7RUFDdERHLFFBQUFBLFVBQVUsRUFBRTJMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3VGLFVBQVc7VUFDbEM2TyxjQUFjLEVBQUVsRCxLQUFBLENBQUttcUIsMEJBQTJCO0VBQ2hEM2MsUUFBQUEsZ0JBQWdCLEVBQUV4TixLQUFBLENBQUtsUixLQUFLLENBQUMwZSxnQkFBaUI7RUFDOUNyUyxRQUFBQSxjQUFjLEVBQUU2RSxLQUFBLENBQUtNLEtBQUssQ0FBQ25GLGNBQWU7VUFDMUNvTSxRQUFRLEVBQUUzSyxjQUFjLENBQUNvRCxLQUFBLENBQUtvcUIsY0FBYyxFQUFFLENBQUU7RUFDaERqMkIsUUFBQUEsWUFBWSxFQUFFNkwsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcUYsWUFBYTtFQUN0Q0MsUUFBQUEsb0JBQW9CLEVBQUU0TCxLQUFBLENBQUtsUixLQUFLLENBQUNzRixvQkFBcUI7RUFDdERpRCxRQUFBQSxZQUFZLEVBQUUySSxLQUFBLENBQUtsUixLQUFLLENBQUN1SSxZQUFhO0VBQ3RDeWQsUUFBQUEsV0FBVyxFQUFFOVUsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ21CLFdBQVk7RUFDcEMzSixRQUFBQSxNQUFNLEVBQUVuTCxLQUFBLENBQUtsUixLQUFLLENBQUNxYyxNQUFPO0VBQzFCQyxRQUFBQSxvQkFBb0IsRUFBRXBMLEtBQUEsQ0FBS00sS0FBSyxDQUFDOEssb0JBQXFCO0VBQ3REMkUsUUFBQUEsYUFBYSxFQUFFL1AsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWhCLGFBQWM7RUFDeEMwTSxRQUFBQSxpQkFBaUIsRUFBRXpjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJ0QixpQkFBa0I7RUFDaEQ0QixRQUFBQSxrQkFBa0IsRUFBRXJlLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3V2QixrQkFBbUI7RUFDbERuWixRQUFBQSx1QkFBdUIsRUFBRWxGLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29XLHVCQUF3QjtFQUM1RHdYLFFBQUFBLHFCQUFxQixFQUFFMWMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNHRCLHFCQUFzQjtFQUN4RC9NLFFBQUFBLGVBQWUsRUFBRTNQLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZnQixlQUFnQjtFQUM1QzZNLFFBQUFBLGdCQUFnQixFQUFFeGMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMHRCLGdCQUFpQjtFQUM5QzRDLFFBQUFBLFVBQVUsRUFBRXBmLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3N3QixVQUFXO0VBQ2xDbkUsUUFBQUEsd0JBQXdCLEVBQUVqYixLQUFBLENBQUtsUixLQUFLLENBQUNtc0Isd0JBQXlCO0VBQzlEQyxRQUFBQSwyQkFBMkIsRUFBRWxiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29zQiwyQkFBNEI7RUFDcEV6WixRQUFBQSxzQkFBc0IsRUFBRXpCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJTLHNCQUF1QjtFQUMxRG1FLFFBQUFBLDJCQUEyQixFQUFFNUYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOFcsMkJBQTRCO0VBQ3BFcVEsUUFBQUEsV0FBVyxFQUFFalcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbW5CLFdBQVk7RUFDcEN1RSxRQUFBQSxTQUFTLEVBQUV4YSxLQUFBLENBQUtsUixLQUFLLENBQUMwckIsU0FBVTtFQUNoQ3lLLFFBQUFBLHVCQUF1QixFQUFFQSx1QkFBd0I7RUFDakQxVixRQUFBQSxXQUFXLEVBQUV2UCxLQUFBLENBQUtsUixLQUFLLENBQUN5Z0IsV0FBWTtFQUNwQytPLFFBQUFBLFdBQVcsRUFBRXRlLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3d2QixXQUFZO0VBQ3BDdkUsUUFBQUEsZUFBZSxFQUFFL1osS0FBQSxDQUFLTSxLQUFLLENBQUN5WixlQUFnQjtVQUM1Q0gsZUFBZSxFQUFFNVosS0FBQSxDQUFLbWQsbUJBQW9CO0VBQzFDOUMsUUFBQUEsYUFBYSxFQUFFcmEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdXJCLGFBQWM7RUFDeENILFFBQUFBLFlBQVksRUFBRWxhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29yQixZQUFhO0VBQ3RDdlIsUUFBQUEsWUFBWSxFQUFFM0ksS0FBQSxDQUFLbFIsS0FBSyxDQUFDNlosWUFBYTtFQUN0Q2dTLFFBQUFBLGdCQUFnQixFQUFFM2EsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNnJCLGdCQUFpQjtFQUM5QzdKLFFBQUFBLGNBQWMsRUFBRTlRLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dpQixjQUFlO0VBQzFDNkQsUUFBQUEsYUFBYSxFQUFFM1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDNmxCLGFBQWM7RUFDeEM2UyxRQUFBQSxjQUFjLEVBQUV4bkIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMDRCLGNBQWU7RUFDMUN6TCxRQUFBQSxjQUFjLEVBQUUvYixLQUFBLENBQUtsUixLQUFLLENBQUNpdEIsY0FBZTtFQUMxQzdGLFFBQUFBLGtCQUFrQixFQUFFbFcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDb25CLGtCQUFtQjtVQUNsREcsWUFBWSxFQUFFclcsS0FBQSxDQUFLcXFCLGdCQUFpQjtFQUNwQ25MLFFBQUFBLFVBQVUsRUFBRWxmLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ293QixVQUFXO0VBQ2xDQyxRQUFBQSxhQUFhLEVBQUVuZixLQUFBLENBQUtsUixLQUFLLENBQUNxd0IsYUFBYztFQUN4QzFuQixRQUFBQSxPQUFPLEVBQUV1SSxLQUFBLENBQUtsUixLQUFLLENBQUMySSxPQUFRO0VBQzVCQyxRQUFBQSxPQUFPLEVBQUVzSSxLQUFBLENBQUtsUixLQUFLLENBQUM0SSxPQUFRO0VBQzVCTixRQUFBQSxZQUFZLEVBQUU0SSxLQUFBLENBQUtsUixLQUFLLENBQUNzSSxZQUFhO0VBQ3RDRSxRQUFBQSxVQUFVLEVBQUUwSSxLQUFBLENBQUtsUixLQUFLLENBQUN3SSxVQUFXO0VBQ2xDNmUsUUFBQUEsV0FBVyxFQUFFblcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcW5CLFdBQVk7RUFDcEMvWixRQUFBQSxTQUFTLEVBQUU0RCxLQUFBLENBQUtsUixLQUFLLENBQUN3N0IsaUJBQWtCO0VBQ3hDdkssUUFBQUEsU0FBUyxFQUFFL2YsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeTdCLGlCQUFrQjtFQUN4QzN3QixRQUFBQSxjQUFjLEVBQUVvRyxLQUFBLENBQUtsUixLQUFLLENBQUM4SyxjQUFlO0VBQzFDNEgsUUFBQUEsc0JBQXNCLEVBQUV4QixLQUFBLENBQUtsUixLQUFLLENBQUMwUyxzQkFBdUI7RUFDMURtYSxRQUFBQSxzQkFBc0IsRUFBRTNiLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZzQixzQkFBdUI7RUFDMURILFFBQUFBLHdCQUF3QixFQUFFeGIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMHNCLHdCQUF5QjtFQUM5RGEsUUFBQUEsa0JBQWtCLEVBQUVyYyxLQUFBLENBQUtsUixLQUFLLENBQUN1dEIsa0JBQW1CO0VBQ2xESCxRQUFBQSxvQkFBb0IsRUFBRWxjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ290QixvQkFBcUI7RUFDdERMLFFBQUFBLHFCQUFxQixFQUFFN2IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDK3NCLHFCQUFzQjtFQUN4REosUUFBQUEsdUJBQXVCLEVBQUV6YixLQUFBLENBQUtsUixLQUFLLENBQUMyc0IsdUJBQXdCO0VBQzVEYyxRQUFBQSxpQkFBaUIsRUFBRXZjLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3l0QixpQkFBa0I7RUFDaERKLFFBQUFBLG1CQUFtQixFQUFFbmMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDcXRCLG1CQUFvQjtFQUNwRHRELFFBQUFBLGNBQWMsRUFBRTdZLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytwQixjQUFlO0VBQzFDbFMsUUFBQUEsMEJBQTBCLEVBQUUzRyxLQUFBLENBQUtsUixLQUFLLENBQUM2WCwwQkFBMkI7RUFDbEVvVSxRQUFBQSxrQkFBa0IsRUFBRS9hLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2lzQixrQkFBbUI7RUFDbEQrSCxRQUFBQSxXQUFXLEVBQUU5aUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZzBCLFdBQVk7RUFDcENqWCxRQUFBQSxpQkFBaUIsRUFBRTdMLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQytjLGlCQUFrQjtFQUNoRG9HLFFBQUFBLGtCQUFrQixFQUFFalMsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbWpCLGtCQUFtQjtFQUNsREksUUFBQUEsb0JBQW9CLEVBQUVyUyxLQUFBLENBQUtsUixLQUFLLENBQUN1akIsb0JBQXFCO0VBQ3REaUYsUUFBQUEsaUJBQWlCLEVBQUV0WCxLQUFBLENBQUtsUixLQUFLLENBQUN3b0IsaUJBQWtCO0VBQ2hEbEssUUFBQUEsZUFBZSxFQUFFcE4sS0FBQSxDQUFLbFIsS0FBSyxDQUFDc2UsZUFBZ0I7RUFDNUM0TSxRQUFBQSxpQkFBaUIsRUFBRWhhLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tyQixpQkFBa0I7RUFDaER6QyxRQUFBQSxnQkFBZ0IsRUFBRXZYLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3lvQixnQkFBaUI7RUFDOUNDLFFBQUFBLGdCQUFnQixFQUFFeFgsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMG9CLGdCQUFpQjtFQUM5Q3pQLFFBQUFBLDBCQUEwQixFQUFFL0gsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaVosMEJBQTJCO0VBQ2xFd1gsUUFBQUEsYUFBYSxFQUFFdmYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDeXdCLGFBQWM7RUFDeEMvTCxRQUFBQSxtQkFBbUIsRUFBRXhULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzBrQixtQkFBb0I7RUFDcER4QixRQUFBQSx1QkFBdUIsRUFBRWhTLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tqQix1QkFBd0I7RUFDNURsRCxRQUFBQSw0QkFBNEIsRUFBRTlPLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2dnQiw0QkFBNkI7RUFDdEVELFFBQUFBLDZCQUE2QixFQUFFN08sS0FBQSxDQUFLbFIsS0FBSyxDQUFDK2YsNkJBQThCO0VBQ3hFaU0sUUFBQUEsY0FBYyxFQUFFOWEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDZ3NCLGNBQWU7RUFDMUNySCxRQUFBQSxxQkFBcUIsRUFBRXpULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzJrQixxQkFBc0I7RUFDeER2TSxRQUFBQSxjQUFjLEVBQUVsSCxLQUFBLENBQUtsUixLQUFLLENBQUNvWSxjQUFlO0VBQzFDc2pCLFFBQUFBLGdCQUFnQixFQUFFeHFCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzA3QixnQkFBaUI7RUFDOUNoa0IsUUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaWQsU0FBVTtVQUN0QzhTLGtCQUFrQixFQUFFN2UsS0FBQSxDQUFLeXFCLFlBQWE7RUFDdEMxZixRQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtNLEtBQUssQ0FBQ3VsQixPQUFRO0VBQ25DdE4sUUFBQUEsZUFBZSxFQUFFdlksS0FBQSxDQUFLbFIsS0FBSyxDQUFDeXBCLGVBQWdCO1VBQzVDckksZUFBZSxFQUFFbFEsS0FBQSxDQUFLa1EsZUFBZ0I7RUFDdENqRSxRQUFBQSxlQUFlLEVBQUVqTSxLQUFBLENBQUtsUixLQUFLLENBQUNtZCxlQUFnQjtFQUM1Q2tMLFFBQUFBLGFBQWEsRUFBRW5YLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ3FvQixhQUFBQTtFQUFjLE9BQUEsRUFFdkNuWCxLQUFBLENBQUtsUixLQUFLLENBQUNvVCxRQUNHLENBQUMsQ0FBQTtPQUVyQixDQUFBLENBQUE7TUFBQS9CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFlBQU07RUFDM0IsTUFBQSxJQUFBeUgsWUFBQSxHQUErQnpILEtBQUEsQ0FBS2xSLEtBQUs7VUFBakMxQyxVQUFVLEdBQUFxYixZQUFBLENBQVZyYixVQUFVO1VBQUVDLE1BQU0sR0FBQW9iLFlBQUEsQ0FBTnBiLE1BQU0sQ0FBQTtFQUMxQixNQUFBLElBQU1xK0IsY0FBYyxHQUNsQjFxQixLQUFBLENBQUtsUixLQUFLLENBQUN5d0IsYUFBYSxJQUFJdmYsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaXRCLGNBQWMsQ0FBQTtFQUN2RCxNQUFBLElBQU00TyxjQUFjLEdBQUdELGNBQWMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFBO0VBQ3hELE1BQUEsSUFBSWpMLGVBQWUsQ0FBQTtFQUVuQixNQUFBLElBQUl6ZixLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFZLEVBQUU7VUFDM0IyWCxlQUFlLEdBQUEsdUJBQUEsQ0FBQWp4QixNQUFBLENBQTJCQyxjQUFjLENBQ3REdVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLEVBQ3BCO0VBQ0V4QyxVQUFBQSxVQUFVLEVBQUV1K0IsY0FBYztFQUMxQnQrQixVQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0VBQ0YsU0FDRixDQUFDLEVBQUFtQyxJQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQ0N3UixLQUFBLENBQUtsUixLQUFLLENBQUNELE9BQU8sR0FDZCxZQUFZLEdBQ1pKLGNBQWMsQ0FBQ3VSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ0QsT0FBTyxFQUFFO0VBQ2pDekMsVUFBQUEsVUFBVSxFQUFFdStCLGNBQWM7RUFDMUJ0K0IsVUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtXQUNELENBQUMsR0FDRixFQUFFLENBQ04sQ0FBQTtFQUNKLE9BQUMsTUFBTTtFQUNMLFFBQUEsSUFBSTJULEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFBRTtZQUNqQ3VKLGVBQWUsR0FBQSxpQkFBQSxDQUFBanhCLE1BQUEsQ0FBcUJDLGNBQWMsQ0FDaER1UixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEVBQ25CO0VBQUU1YSxZQUFBQSxVQUFVLEVBQVZBLFVBQVU7RUFBRUMsWUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtFQUFPLFdBQ3ZCLENBQUMsQ0FBRSxDQUFBO0VBQ0wsU0FBQyxNQUFNLElBQUkyVCxLQUFBLENBQUtsUixLQUFLLENBQUNnc0IsY0FBYyxFQUFFO1lBQ3BDMkUsZUFBZSxHQUFBLGlCQUFBLENBQUFqeEIsTUFBQSxDQUFxQkMsY0FBYyxDQUNoRHVSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkI7RUFBRTVhLFlBQUFBLFVBQVUsRUFBRSxNQUFNO0VBQUVDLFlBQUFBLE1BQU0sRUFBTkEsTUFBQUE7RUFBTyxXQUMvQixDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUMsTUFBTSxJQUFJMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMGtCLG1CQUFtQixFQUFFO1lBQ3pDaU0sZUFBZSxHQUFBLGtCQUFBLENBQUFqeEIsTUFBQSxDQUFzQkMsY0FBYyxDQUNqRHVSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkI7RUFBRTVhLFlBQUFBLFVBQVUsRUFBRSxXQUFXO0VBQUVDLFlBQUFBLE1BQU0sRUFBTkEsTUFBQUE7RUFBTyxXQUNwQyxDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUMsTUFBTSxJQUFJMlQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDMmtCLHFCQUFxQixFQUFFO1lBQzNDZ00sZUFBZSxHQUFBLG9CQUFBLENBQUFqeEIsTUFBQSxDQUF3QkMsY0FBYyxDQUNuRHVSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFDbkI7RUFDRTVhLFlBQUFBLFVBQVUsRUFBRSxXQUFXO0VBQ3ZCQyxZQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0VBQ0YsV0FDRixDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUMsTUFBTTtZQUNMb3pCLGVBQWUsR0FBQSxpQkFBQSxDQUFBanhCLE1BQUEsQ0FBcUJDLGNBQWMsQ0FDaER1UixLQUFBLENBQUtsUixLQUFLLENBQUNrWSxRQUFRLEVBQ25CO0VBQ0U1YSxZQUFBQSxVQUFVLEVBQUV1K0IsY0FBYztFQUMxQnQrQixZQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0VBQ0YsV0FDRixDQUFDLENBQUUsQ0FBQTtFQUNMLFNBQUE7RUFDRixPQUFBO1FBRUEsb0JBQ0VtVSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQ0U0TCxRQUFBQSxJQUFJLEVBQUMsT0FBTztFQUNaLFFBQUEsV0FBQSxFQUFVLFFBQVE7RUFDbEJqUSxRQUFBQSxTQUFTLEVBQUMsNkJBQUE7RUFBNkIsT0FBQSxFQUV0Q3FqQixlQUNHLENBQUMsQ0FBQTtPQUVWLENBQUEsQ0FBQTtNQUFBdGYsZUFBQSxDQUFBSCxLQUFBLEVBQUEsaUJBQUEsRUFFaUIsWUFBTTtFQUFBLE1BQUEsSUFBQTRxQixtQkFBQSxDQUFBO1FBQ3RCLElBQU14dUIsU0FBUyxHQUFHeUcsU0FBSSxDQUFDN0MsS0FBQSxDQUFLbFIsS0FBSyxDQUFDc04sU0FBUyxFQUFBK0QsZUFBQSxDQUN4QzhrQixFQUFBQSxFQUFBQSx1QkFBdUIsRUFBR2psQixLQUFBLENBQUtNLEtBQUssQ0FBQzhpQixJQUFJLENBQzNDLENBQUMsQ0FBQTtRQUVGLElBQU15SCxXQUFXLEdBQUc3cUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDKzdCLFdBQVcsaUJBQUlycUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUFPZ1ksUUFBQUEsSUFBSSxFQUFDLE1BQUE7RUFBTSxPQUFFLENBQUMsQ0FBQTtRQUNuRSxJQUFNcVMsY0FBYyxHQUFHOXFCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2c4QixjQUFjLElBQUksS0FBSyxDQUFBO0VBQ3pELE1BQUEsSUFBTXRFLFVBQVUsR0FDZCxPQUFPeG1CLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2xELEtBQUssS0FBSyxRQUFRLEdBQ2hDb1UsS0FBQSxDQUFLbFIsS0FBSyxDQUFDbEQsS0FBSyxHQUNoQixPQUFPb1UsS0FBQSxDQUFLTSxLQUFLLENBQUNrbUIsVUFBVSxLQUFLLFFBQVEsR0FDdkN4bUIsS0FBQSxDQUFLTSxLQUFLLENBQUNrbUIsVUFBVSxHQUNyQnhtQixLQUFBLENBQUtsUixLQUFLLENBQUNnWixZQUFZLEdBQ3JCblosbUJBQW1CLENBQ2pCcVIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRixTQUFTLEVBQ3BCb1IsS0FBQSxDQUFLbFIsS0FBSyxDQUFDRCxPQUFPLEVBQ2xCbVIsS0FBQSxDQUFLbFIsS0FDUCxDQUFDLEdBQ0RrUixLQUFBLENBQUtsUixLQUFLLENBQUMrWCxlQUFlLEdBQ3hCNVgsdUJBQXVCLENBQUMrUSxLQUFBLENBQUtsUixLQUFLLENBQUNnWSxhQUFhLEVBQUU5RyxLQUFBLENBQUtsUixLQUFLLENBQUMsR0FDN0RMLGNBQWMsQ0FBQ3VSLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQ2tZLFFBQVEsRUFBRWhILEtBQUEsQ0FBS2xSLEtBQUssQ0FBQyxDQUFBO0VBRTNELE1BQUEsb0JBQU8wUixzQkFBSyxDQUFDZ1ksWUFBWSxDQUFDcVMsV0FBVyxHQUFBRCxtQkFBQSxHQUFBenFCLEVBQUFBLEVBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQXlxQixtQkFBQSxFQUNsQ0UsY0FBYyxFQUFHLFVBQUM5RSxLQUFLLEVBQUs7VUFDM0JobUIsS0FBQSxDQUFLZ21CLEtBQUssR0FBR0EsS0FBSyxDQUFBO0VBQ3BCLE9BQUMsWUFDTVEsVUFBVSxDQUFBLEVBQUEsUUFBQSxFQUNUeG1CLEtBQUEsQ0FBSytxQixVQUFVLENBQ2IvcUIsRUFBQUEsVUFBQUEsRUFBQUEsS0FBQSxDQUFLZ3JCLFlBQVksY0FDbEJockIsS0FBQSxDQUFLeW9CLFlBQVksQ0FBQSxFQUFBLFNBQUEsRUFDakJ6b0IsS0FBQSxDQUFLaXJCLFdBQVcsQ0FDZGpyQixFQUFBQSxXQUFBQSxFQUFBQSxLQUFBLENBQUtrckIsY0FBYyxDQUFBLEVBQUEsSUFBQSxFQUMxQmxyQixLQUFBLENBQUtsUixLQUFLLENBQUNxOEIsRUFBRSxDQUNYbnJCLEVBQUFBLE1BQUFBLEVBQUFBLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzZwQixJQUFJLENBQ2YzWSxFQUFBQSxNQUFBQSxFQUFBQSxLQUFBLENBQUtsUixLQUFLLENBQUNzOEIsSUFBSSxDQUFBLEVBQUFqckIsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBeXFCLG1CQUFBLGVBQ1Y1cUIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdThCLFNBQVMsQ0FDbEJyckIsRUFBQUEsYUFBQUEsRUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDdzhCLGVBQWUsQ0FBQSxFQUFBLFVBQUEsRUFDN0J0ckIsS0FBQSxDQUFLbFIsS0FBSyxDQUFDaXpCLFFBQVEsQ0FBQSxFQUFBLGNBQUEsRUFDZi9oQixLQUFBLENBQUtsUixLQUFLLENBQUN5OEIsWUFBWSxDQUMxQjFvQixFQUFBQSxXQUFBQSxFQUFBQSxTQUFJLENBQUNnb0IsV0FBVyxDQUFDLzdCLEtBQUssQ0FBQ3NOLFNBQVMsRUFBRUEsU0FBUyxDQUFDLENBQUEsRUFBQSxPQUFBLEVBQ2hENEQsS0FBQSxDQUFLbFIsS0FBSyxDQUFDd2QsS0FBSyxlQUNidE0sS0FBQSxDQUFLbFIsS0FBSyxDQUFDMjNCLFFBQVEsQ0FDbkJ6bUIsRUFBQUEsVUFBQUEsRUFBQUEsS0FBQSxDQUFLbFIsS0FBSyxDQUFDOHBCLFFBQVEsQ0FBQSxFQUFBLFVBQUEsRUFDbkI1WSxLQUFBLENBQUtsUixLQUFLLENBQUMwYixRQUFRLENBQUEsRUFDN0Isa0JBQWtCLEVBQUV4SyxLQUFBLENBQUtsUixLQUFLLENBQUMwOEIsZUFBZSxHQUFBcnJCLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUF5cUIsbUJBQUEsRUFDOUMsY0FBYyxFQUFFNXFCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzI4QixXQUFXLEdBQ3RDLGlCQUFpQixFQUFFenJCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzQ4QixjQUFjLENBQzVDLEVBQUEsZUFBZSxFQUFFMXJCLEtBQUEsQ0FBS2xSLEtBQUssQ0FBQzY4QixZQUFZLEdBQ3hDLENBQUE7T0FDSCxDQUFBLENBQUE7TUFBQXhyQixlQUFBLENBQUFILEtBQUEsRUFBQSxtQkFBQSxFQUVtQixZQUFNO0VBQ3hCLE1BQUEsSUFBQTJILFlBQUEsR0FVSTNILEtBQUEsQ0FBS2xSLEtBQUs7VUFUWjg4QixXQUFXLEdBQUFqa0IsWUFBQSxDQUFYaWtCLFdBQVc7VUFDWDdKLFFBQVEsR0FBQXBhLFlBQUEsQ0FBUm9hLFFBQVE7VUFDUi9hLFFBQVEsR0FBQVcsWUFBQSxDQUFSWCxRQUFRO1VBQ1JwWSxTQUFTLEdBQUErWSxZQUFBLENBQVQvWSxTQUFTO1VBQ1RDLE9BQU8sR0FBQThZLFlBQUEsQ0FBUDlZLE9BQU87VUFDUGc5QixnQkFBZ0IsR0FBQWxrQixZQUFBLENBQWhCa2tCLGdCQUFnQjtVQUFBQyxxQkFBQSxHQUFBbmtCLFlBQUEsQ0FDaEJva0Isb0JBQW9CO0VBQXBCQSxRQUFBQSxvQkFBb0IsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxFQUFFLEdBQUFBLHFCQUFBO1VBQUFFLHFCQUFBLEdBQUFya0IsWUFBQSxDQUN6QnNrQixjQUFjO0VBQWRBLFFBQUFBLGNBQWMsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxPQUFPLEdBQUFBLHFCQUFBO1VBQ3hCbGxCLGFBQWEsR0FBQWEsWUFBQSxDQUFiYixhQUFhLENBQUE7UUFFZixJQUNFOGtCLFdBQVcsS0FDVjVrQixRQUFRLElBQUksSUFBSSxJQUNmcFksU0FBUyxJQUFJLElBQUksSUFDakJDLE9BQU8sSUFBSSxJQUFJLElBQ2ZpWSxhQUFhLEtBQWJBLElBQUFBLElBQUFBLGFBQWEsZUFBYkEsYUFBYSxDQUFFaFosTUFBTSxDQUFDLEVBQ3hCO1VBQ0Esb0JBQ0UwUyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VnWSxVQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNicmMsVUFBQUEsU0FBUyxFQUFFeUcsU0FBSSxDQUNiLDhCQUE4QixFQUM5QmtwQixvQkFBb0IsRUFDcEI7RUFBRSxZQUFBLHdDQUF3QyxFQUFFaEssUUFBQUE7RUFBUyxXQUN2RCxDQUFFO0VBQ0ZBLFVBQUFBLFFBQVEsRUFBRUEsUUFBUztFQUNuQixVQUFBLFlBQUEsRUFBWWtLLGNBQWU7WUFDM0J2ckIsT0FBTyxFQUFFVixLQUFBLENBQUs2cEIsWUFBYTtFQUMzQnZkLFVBQUFBLEtBQUssRUFBRXVmLGdCQUFpQjtFQUN4QnJoQixVQUFBQSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0VBQUUsU0FDZCxDQUFDLENBQUE7RUFFTixPQUFDLE1BQU07RUFDTCxRQUFBLE9BQU8sSUFBSSxDQUFBO0VBQ2IsT0FBQTtPQUNELENBQUEsQ0FBQTtFQXQrQkN4SyxJQUFBQSxLQUFBLENBQUtNLEtBQUssR0FBR04sS0FBQSxDQUFLb21CLGdCQUFnQixFQUFFLENBQUE7TUFDcENwbUIsS0FBQSxDQUFLOGxCLG1CQUFtQixHQUFHLElBQUksQ0FBQTtFQUFDLElBQUEsT0FBQTlsQixLQUFBLENBQUE7RUFDbEMsR0FBQTtJQUFDNEIsU0FBQSxDQUFBeWpCLFVBQUEsRUFBQXRsQixnQkFBQSxDQUFBLENBQUE7SUFBQSxPQUFBOEIsWUFBQSxDQUFBd2pCLFVBQUEsRUFBQSxDQUFBO01BQUExcEIsR0FBQSxFQUFBLG1CQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQWtXLGlCQUFBQSxHQUFvQjtRQUNsQm5QLE1BQU0sQ0FBQ3U1QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDeEQsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBeHdCLEdBQUEsRUFBQSxvQkFBQTtFQUFBL1AsSUFBQUEsS0FBQSxFQUVELFNBQUE2Z0Isa0JBQUFBLENBQW1CN0IsU0FBUyxFQUFFd2hCLFNBQVMsRUFBRTtFQUN2QyxNQUFBLElBQ0V4aEIsU0FBUyxDQUFDTyxNQUFNLElBQ2hCZ2Esc0JBQXNCLENBQUN2YSxTQUFTLENBQUM1RCxRQUFRLEVBQUUsSUFBSSxDQUFDbFksS0FBSyxDQUFDa1ksUUFBUSxDQUFDLEVBQy9EO1VBQ0EsSUFBSSxDQUFDa0osZUFBZSxDQUFDLElBQUksQ0FBQ3BoQixLQUFLLENBQUNrWSxRQUFRLENBQUMsQ0FBQTtFQUMzQyxPQUFBO0VBQ0EsTUFBQSxJQUNFLElBQUksQ0FBQzFHLEtBQUssQ0FBQ3laLGVBQWUsS0FBS2htQixTQUFTLElBQ3hDNlcsU0FBUyxDQUFDMFQsV0FBVyxLQUFLLElBQUksQ0FBQ3h2QixLQUFLLENBQUN3dkIsV0FBVyxFQUNoRDtVQUNBLElBQUksQ0FBQ2hkLFFBQVEsQ0FBQztFQUFFeVksVUFBQUEsZUFBZSxFQUFFLENBQUE7RUFBRSxTQUFDLENBQUMsQ0FBQTtFQUN2QyxPQUFBO1FBQ0EsSUFBSW5QLFNBQVMsQ0FBQ3pQLGNBQWMsS0FBSyxJQUFJLENBQUNyTSxLQUFLLENBQUNxTSxjQUFjLEVBQUU7VUFDMUQsSUFBSSxDQUFDbUcsUUFBUSxDQUFDO0VBQ1puRyxVQUFBQSxjQUFjLEVBQUVELG9CQUFvQixDQUFDLElBQUksQ0FBQ3BNLEtBQUssQ0FBQ3FNLGNBQWMsQ0FBQTtFQUNoRSxTQUFDLENBQUMsQ0FBQTtFQUNKLE9BQUE7RUFDQSxNQUFBLElBQ0UsQ0FBQ2l4QixTQUFTLENBQUN2RyxPQUFPLElBQ2xCLENBQUMvekIsT0FBTyxDQUFDOFksU0FBUyxDQUFDNUQsUUFBUSxFQUFFLElBQUksQ0FBQ2xZLEtBQUssQ0FBQ2tZLFFBQVEsQ0FBQyxFQUNqRDtVQUNBLElBQUksQ0FBQzFGLFFBQVEsQ0FBQztFQUFFa2xCLFVBQUFBLFVBQVUsRUFBRSxJQUFBO0VBQUssU0FBQyxDQUFDLENBQUE7RUFDckMsT0FBQTtRQUVBLElBQUk0RixTQUFTLENBQUNoSixJQUFJLEtBQUssSUFBSSxDQUFDOWlCLEtBQUssQ0FBQzhpQixJQUFJLEVBQUU7RUFDdEMsUUFBQSxJQUFJZ0osU0FBUyxDQUFDaEosSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUM5aUIsS0FBSyxDQUFDOGlCLElBQUksS0FBSyxJQUFJLEVBQUU7RUFDeEQsVUFBQSxJQUFJLENBQUN0MEIsS0FBSyxDQUFDdTlCLGNBQWMsRUFBRSxDQUFBO0VBQzdCLFNBQUE7RUFFQSxRQUFBLElBQUlELFNBQVMsQ0FBQ2hKLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDOWlCLEtBQUssQ0FBQzhpQixJQUFJLEtBQUssS0FBSyxFQUFFO0VBQ3hELFVBQUEsSUFBSSxDQUFDdDBCLEtBQUssQ0FBQ3c5QixlQUFlLEVBQUUsQ0FBQTtFQUM5QixTQUFBO0VBQ0YsT0FBQTtFQUNGLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQTN3QixHQUFBLEVBQUEsc0JBQUE7TUFBQS9QLEtBQUEsRUFFRCxTQUFBNDFCLG9CQUFBQSxHQUF1QjtRQUNyQixJQUFJLENBQUNtRix3QkFBd0IsRUFBRSxDQUFBO1FBQy9CaDBCLE1BQU0sQ0FBQzQ1QixtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDSixRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDM0QsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBeHdCLEdBQUEsRUFBQSxzQkFBQTtNQUFBL1AsS0FBQSxFQXk3QkQsU0FBQTRnQyxvQkFBQUEsR0FBdUI7RUFDckIsTUFBQSxJQUFBcmtCLFlBQUEsR0FDRSxJQUFJLENBQUNyWixLQUFLO1VBREoyOUIsUUFBUSxHQUFBdGtCLFlBQUEsQ0FBUnNrQixRQUFRO1VBQUUvTCxJQUFJLEdBQUF2WSxZQUFBLENBQUp1WSxJQUFJO1VBQUVnTSxxQkFBcUIsR0FBQXZrQixZQUFBLENBQXJCdWtCLHFCQUFxQjtVQUFFQyx5QkFBeUIsR0FBQXhrQixZQUFBLENBQXpCd2tCLHlCQUF5QixDQUFBO0VBRXhFLE1BQUEsSUFBUXZKLElBQUksR0FBSyxJQUFJLENBQUM5aUIsS0FBSyxDQUFuQjhpQixJQUFJLENBQUE7UUFFWixvQkFDRTVpQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQ0VyRSxRQUFBQSxTQUFTLHNDQUFBNU4sTUFBQSxDQUNQaStCLFFBQVEsR0FBRyx1Q0FBdUMsR0FBRyxFQUFFLENBQUE7U0FHeERBLEVBQUFBLFFBQVEsaUJBQ1Bqc0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDZ2dCLGNBQVksRUFBQTFCLFFBQUEsQ0FBQTtFQUNYMkIsUUFBQUEsSUFBSSxFQUFFQSxJQUFLO1VBQ1h0a0IsU0FBUyxFQUFBLEVBQUEsQ0FBQTVOLE1BQUEsQ0FBS2srQixxQkFBcUIsT0FBQWwrQixNQUFBLENBQ2pDNDBCLElBQUksSUFBSSx3Q0FBd0MsQ0FBQTtFQUMvQyxPQUFBLEVBQ0V1Six5QkFBeUIsR0FDMUI7VUFDRWpzQixPQUFPLEVBQUUsSUFBSSxDQUFDa3NCLGNBQUFBO0VBQ2hCLE9BQUMsR0FDRCxJQUFJLENBQ1QsQ0FDRixFQUNBLElBQUksQ0FBQ3RzQixLQUFLLENBQUM2Wix1QkFBdUIsSUFBSSxJQUFJLENBQUM4RixvQkFBb0IsRUFBRSxFQUNqRSxJQUFJLENBQUM0TSxlQUFlLEVBQUUsRUFDdEIsSUFBSSxDQUFDQyxpQkFBaUIsRUFDcEIsQ0FBQyxDQUFBO0VBRVYsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBbnhCLEdBQUEsRUFBQSxRQUFBO01BQUEvUCxLQUFBLEVBRUQsU0FBQStXLE1BQUFBLEdBQVM7RUFDUCxNQUFBLElBQU1pbUIsUUFBUSxHQUFHLElBQUksQ0FBQ21FLGNBQWMsRUFBRSxDQUFBO0VBRXRDLE1BQUEsSUFBSSxJQUFJLENBQUNqK0IsS0FBSyxDQUFDcWMsTUFBTSxFQUFFLE9BQU95ZCxRQUFRLENBQUE7RUFFdEMsTUFBQSxJQUFJLElBQUksQ0FBQzk1QixLQUFLLENBQUNzd0IsVUFBVSxFQUFFO0VBQ3pCLFFBQUEsSUFBSTROLGVBQWUsR0FBRyxJQUFJLENBQUMxc0IsS0FBSyxDQUFDOGlCLElBQUksZ0JBQ25DNWlCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3VoQixPQUFPLEVBQUE7RUFBQ08sVUFBQUEsYUFBYSxFQUFFLElBQUksQ0FBQ3p6QixLQUFLLENBQUN5ekIsYUFBQUE7V0FDakMvaEIsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFckUsVUFBQUEsU0FBUyxFQUFDLDBCQUEwQjtZQUNwQ29PLFFBQVEsRUFBRSxDQUFDLENBQUU7WUFDYnVCLFNBQVMsRUFBRSxJQUFJLENBQUNraEIsZUFBQUE7RUFBZ0IsU0FBQSxFQUUvQnJFLFFBQ0UsQ0FDRSxDQUFDLEdBQ1IsSUFBSSxDQUFBO1VBRVIsSUFBSSxJQUFJLENBQUN0b0IsS0FBSyxDQUFDOGlCLElBQUksSUFBSSxJQUFJLENBQUN0MEIsS0FBSyxDQUFDdXlCLFFBQVEsRUFBRTtFQUMxQzJMLFVBQUFBLGVBQWUsZ0JBQ2J4c0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDdWdCLE1BQU0sRUFBQTtFQUNMSyxZQUFBQSxRQUFRLEVBQUUsSUFBSSxDQUFDdnlCLEtBQUssQ0FBQ3V5QixRQUFTO0VBQzlCRixZQUFBQSxVQUFVLEVBQUUsSUFBSSxDQUFDcnlCLEtBQUssQ0FBQ3F5QixVQUFBQTtFQUFXLFdBQUEsRUFFakM2TCxlQUNLLENBQ1QsQ0FBQTtFQUNILFNBQUE7VUFFQSxvQkFDRXhzQixzQkFBQSxDQUFBQyxhQUFBLENBQ0csS0FBQSxFQUFBLElBQUEsRUFBQSxJQUFJLENBQUMrckIsb0JBQW9CLEVBQUUsRUFDM0JRLGVBQ0UsQ0FBQyxDQUFBO0VBRVYsT0FBQTtFQUVBLE1BQUEsb0JBQ0V4c0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDb2pCLGlCQUFlLEVBQUE7RUFDZHpuQixRQUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDdE4sS0FBSyxDQUFDbytCLGVBQWdCO0VBQ3RDcEosUUFBQUEsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDaDFCLEtBQUssQ0FBQ2cxQixnQkFBaUI7RUFDOUNmLFFBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQ2lILGNBQWMsRUFBRztFQUNuQzNJLFFBQUFBLFFBQVEsRUFBRSxJQUFJLENBQUN2eUIsS0FBSyxDQUFDdXlCLFFBQVM7RUFDOUJGLFFBQUFBLFVBQVUsRUFBRSxJQUFJLENBQUNyeUIsS0FBSyxDQUFDcXlCLFVBQVc7RUFDbEMwQixRQUFBQSxlQUFlLEVBQUUsSUFBSSxDQUFDL3pCLEtBQUssQ0FBQyt6QixlQUFnQjtFQUM1Q21CLFFBQUFBLGVBQWUsRUFBRSxJQUFJLENBQUN3SSxvQkFBb0IsRUFBRztFQUM3QzNILFFBQUFBLGVBQWUsRUFBRSxJQUFJLENBQUMvMUIsS0FBSyxDQUFDKzFCLGVBQWdCO0VBQzVDZCxRQUFBQSxlQUFlLEVBQUU2RSxRQUFTO0VBQzFCcEYsUUFBQUEsZUFBZSxFQUFFLElBQUksQ0FBQzEwQixLQUFLLENBQUMwMEIsZUFBZ0I7RUFDNUNWLFFBQUFBLFdBQVcsRUFBRSxJQUFJLENBQUNoMEIsS0FBSyxDQUFDZzBCLFdBQVk7VUFDcENtQixlQUFlLEVBQUUsSUFBSSxDQUFDa0osZUFBZ0I7RUFDdEM1SyxRQUFBQSxhQUFhLEVBQUUsSUFBSSxDQUFDenpCLEtBQUssQ0FBQ3l6QixhQUFjO0VBQ3hDMkIsUUFBQUEsU0FBUyxFQUFFLElBQUksQ0FBQ3AxQixLQUFLLENBQUNzK0IsZUFBQUE7RUFBZ0IsT0FDdkMsQ0FBQyxDQUFBO0VBRU4sS0FBQTtFQUFDLEdBQUEsQ0FBQSxFQUFBLENBQUE7TUFBQXp4QixHQUFBLEVBQUEsY0FBQTtNQUFBRSxHQUFBLEVBM3pDRCxTQUFBQSxHQUFBQSxHQUEwQjtRQUN4QixPQUFPO0VBQ0w4ckIsUUFBQUEsWUFBWSxFQUFFLEtBQUs7RUFDbkJ2N0IsUUFBQUEsVUFBVSxFQUFFLFlBQVk7RUFDeEI4OUIsUUFBQUEsa0JBQWtCLEVBQUUsV0FBVztFQUMvQnZwQixRQUFBQSxRQUFRLEVBQUFBLFNBQUFBLFFBQUFBLEdBQUcsRUFBRTtFQUNib2hCLFFBQUFBLFFBQVEsRUFBRSxLQUFLO0VBQ2ZwYixRQUFBQSwwQkFBMEIsRUFBRSxLQUFLO0VBQ2pDbkMsUUFBQUEsWUFBWSxFQUFFLFFBQVE7RUFDdEIwWSxRQUFBQSxPQUFPLEVBQUFBLFNBQUFBLE9BQUFBLEdBQUcsRUFBRTtFQUNaNkosUUFBQUEsTUFBTSxFQUFBQSxTQUFBQSxNQUFBQSxHQUFHLEVBQUU7RUFDWGhiLFFBQUFBLFNBQVMsRUFBQUEsU0FBQUEsU0FBQUEsR0FBRyxFQUFFO0VBQ2QwYyxRQUFBQSxZQUFZLEVBQUFBLFNBQUFBLFlBQUFBLEdBQUcsRUFBRTtFQUNqQnBrQixRQUFBQSxRQUFRLEVBQUFBLFNBQUFBLFFBQUFBLEdBQUcsRUFBRTtFQUNibkIsUUFBQUEsY0FBYyxFQUFBQSxTQUFBQSxjQUFBQSxHQUFHLEVBQUU7RUFDbkJtWCxRQUFBQSxhQUFhLEVBQUFBLFNBQUFBLGFBQUFBLEdBQUcsRUFBRTtFQUNsQmdTLFFBQUFBLGNBQWMsRUFBQUEsU0FBQUEsY0FBQUEsR0FBRyxFQUFFO0VBQ25CQyxRQUFBQSxlQUFlLEVBQUFBLFNBQUFBLGVBQUFBLEdBQUcsRUFBRTtFQUNwQjVGLFFBQUFBLGtCQUFrQixFQUFFLEtBQUs7RUFDekJ4TSxRQUFBQSxZQUFZLEVBQUFBLFNBQUFBLFlBQUFBLEdBQUcsRUFBRTtFQUNqQmdQLFFBQUFBLFlBQVksRUFBQUEsU0FBQUEsWUFBQUEsR0FBRyxFQUFFO0VBQ2pCNUssUUFBQUEsV0FBVyxFQUFFLENBQUM7RUFDZG1JLFFBQUFBLFFBQVEsRUFBRSxLQUFLO0VBQ2ZySCxRQUFBQSxVQUFVLEVBQUUsS0FBSztFQUNqQnJYLFFBQUFBLDBCQUEwQixFQUFFLEtBQUs7RUFDakN3RixRQUFBQSxtQkFBbUIsRUFBRSxJQUFJO0VBQ3pCd08sUUFBQUEsY0FBYyxFQUFFLEtBQUs7RUFDckJ3RCxRQUFBQSxhQUFhLEVBQUUsS0FBSztFQUNwQmxCLFFBQUFBLGtCQUFrQixFQUFFLEtBQUs7RUFDekI3SyxRQUFBQSxtQkFBbUIsRUFBRSxLQUFLO0VBQzFCeEIsUUFBQUEsdUJBQXVCLEVBQUUsS0FBSztFQUM5QmxELFFBQUFBLDRCQUE0QixFQUFFLEtBQUs7RUFDbkNELFFBQUFBLDZCQUE2QixFQUFFLEtBQUs7RUFDcENpTSxRQUFBQSxjQUFjLEVBQUUsS0FBSztFQUNyQnJILFFBQUFBLHFCQUFxQixFQUFFLEtBQUs7RUFDNUJ2TSxRQUFBQSxjQUFjLEVBQUUsS0FBSztFQUNyQjVhLFFBQUFBLGFBQWEsRUFBRSxLQUFLO0VBQ3BCbTdCLFFBQUFBLFNBQVMsRUFBRSxLQUFLO0VBQ2hCdEksUUFBQUEsYUFBYSxFQUFFLEVBQUU7RUFDakJoSixRQUFBQSxXQUFXLEVBQUUsTUFBTTtFQUNuQndGLFFBQUFBLHNCQUFzQixFQUFFLGdCQUFnQjtFQUN4Q0gsUUFBQUEsd0JBQXdCLEVBQUUsZ0JBQWdCO0VBQzFDYSxRQUFBQSxrQkFBa0IsRUFBRSxZQUFZO0VBQ2hDSCxRQUFBQSxvQkFBb0IsRUFBRSxZQUFZO0VBQ2xDTCxRQUFBQSxxQkFBcUIsRUFBRSxlQUFlO0VBQ3RDSixRQUFBQSx1QkFBdUIsRUFBRSxlQUFlO0VBQ3hDYyxRQUFBQSxpQkFBaUIsRUFBRSxXQUFXO0VBQzlCSixRQUFBQSxtQkFBbUIsRUFBRSxXQUFXO0VBQ2hDdEQsUUFBQUEsY0FBYyxFQUFFLE1BQU07RUFDdEIwSixRQUFBQSxhQUFhLEVBQUUsSUFBSTtFQUNuQjNvQixRQUFBQSxjQUFjLEVBQUVuTyx3QkFBd0I7RUFDeENtOEIsUUFBQUEsa0JBQWtCLEVBQUUsS0FBSztFQUN6QndGLFFBQUFBLGVBQWUsRUFBRSxJQUFJO0VBQ3JCNUMsUUFBQUEsZ0JBQWdCLEVBQUUsSUFBSTtFQUN0QmpTLFFBQUFBLGVBQWUsRUFBRSxJQUFJO0VBQ3JCL25CLFFBQUFBLGdCQUFnQixFQUFFdUQsU0FBUztFQUMzQjQ0QixRQUFBQSx5QkFBeUIsRUFBRSxLQUFLO0VBQ2hDMWdCLFFBQUFBLGVBQWUsRUFBRSxLQUFBO1NBQ2xCLENBQUE7RUFDSCxLQUFBO0VBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFBLENBNURxQ3pMLENBQUFBLHNCQUFLLENBQUN3QyxTQUFTLEVBQUE7RUErekN2RCxJQUFNbWtCLDBCQUEwQixHQUFHLE9BQU8sQ0FBQTtFQUMxQyxJQUFNYiw2QkFBNkIsR0FBRyxVQUFVOzs7Ozs7Ozs7Ozs7OzsifQ==
