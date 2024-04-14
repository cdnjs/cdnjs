/*!
  react-datepicker v6.7.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGVfdXRpbHMuanMiLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9kYXkuanN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLmpzeCIsIi4uL3NyYy93ZWVrLmpzeCIsIi4uL3NyYy9tb250aC5qc3giLCIuLi9zcmMvdGltZS5qc3giLCIuLi9zcmMveWVhci5qc3giLCIuLi9zcmMvaW5wdXRUaW1lLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIuanN4IiwiLi4vc3JjL2NhbGVuZGFyLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLmpzeCIsIi4uL3NyYy9wb3J0YWwuanN4IiwiLi4vc3JjL3RhYl9sb29wLmpzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLmpzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LmpzeCIsIi4uL3NyYy9pbmRleC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSBcImRhdGUtZm5zL2lzRGF0ZVwiO1xuaW1wb3J0IHsgaXNWYWxpZCBhcyBpc1ZhbGlkRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGxvbmdGb3JtYXR0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2Zvcm1hdFwiO1xuaW1wb3J0IHsgYWRkTWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9hZGRNaW51dGVzXCI7XG5pbXBvcnQgeyBhZGRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9hZGRIb3Vyc1wiO1xuaW1wb3J0IHsgYWRkRGF5cyB9IGZyb20gXCJkYXRlLWZucy9hZGREYXlzXCI7XG5pbXBvcnQgeyBhZGRXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9hZGRXZWVrc1wiO1xuaW1wb3J0IHsgYWRkTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2FkZE1vbnRoc1wiO1xuaW1wb3J0IHsgYWRkUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkUXVhcnRlcnNcIjtcbmltcG9ydCB7IGFkZFllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFllYXJzXCI7XG5pbXBvcnQgeyBzdWJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL3N1YkRheXNcIjtcbmltcG9ydCB7IHN1YldlZWtzIH0gZnJvbSBcImRhdGUtZm5zL3N1YldlZWtzXCI7XG5pbXBvcnQgeyBzdWJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViTW9udGhzXCI7XG5pbXBvcnQgeyBzdWJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9zdWJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3ViWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViWWVhcnNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0U2Vjb25kc1wiO1xuaW1wb3J0IHsgZ2V0TWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9nZXRNaW51dGVzXCI7XG5pbXBvcnQgeyBnZXRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9nZXRIb3Vyc1wiO1xuaW1wb3J0IHsgZ2V0RGF5IH0gZnJvbSBcImRhdGUtZm5zL2dldERheVwiO1xuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXRlXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrIH0gZnJvbSBcImRhdGUtZm5zL2dldElTT1dlZWtcIjtcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2dldE1vbnRoXCI7XG5pbXBvcnQgeyBnZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2dldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0WWVhclwiO1xuaW1wb3J0IHsgZ2V0VGltZSB9IGZyb20gXCJkYXRlLWZucy9nZXRUaW1lXCI7XG5pbXBvcnQgeyBzZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL3NldFNlY29uZHNcIjtcbmltcG9ydCB7IHNldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0TWludXRlc1wiO1xuaW1wb3J0IHsgc2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0SG91cnNcIjtcbmltcG9ydCB7IHNldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3NldE1vbnRoXCI7XG5pbXBvcnQgeyBzZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3NldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IHNldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0WWVhclwiO1xuaW1wb3J0IHsgbWluIH0gZnJvbSBcImRhdGUtZm5zL21pblwiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcImRhdGUtZm5zL21heFwiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFyc1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZEYXlcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZXZWVrXCI7XG5pbXBvcnQgeyBzdGFydE9mTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZk1vbnRoXCI7XG5pbXBvcnQgeyBzdGFydE9mUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mUXVhcnRlclwiO1xuaW1wb3J0IHsgc3RhcnRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlllYXJcIjtcbmltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZldlZWsgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZXZWVrXCI7XG5pbXBvcnQgeyBlbmRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mTW9udGhcIjtcbmltcG9ydCB7IGVuZE9mWWVhciB9IGZyb20gXCJkYXRlLWZucy9lbmRPZlllYXJcIjtcbmltcG9ydCB7IGlzRXF1YWwgYXMgZGZJc0VxdWFsIH0gZnJvbSBcImRhdGUtZm5zL2lzRXF1YWxcIjtcbmltcG9ydCB7IGlzU2FtZURheSBhcyBkZklzU2FtZURheSB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVEYXlcIjtcbmltcG9ydCB7IGlzU2FtZU1vbnRoIGFzIGRmSXNTYW1lTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lTW9udGhcIjtcbmltcG9ydCB7IGlzU2FtZVllYXIgYXMgZGZJc1NhbWVZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVllYXJcIjtcbmltcG9ydCB7IGlzU2FtZVF1YXJ0ZXIgYXMgZGZJc1NhbWVRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVF1YXJ0ZXJcIjtcbmltcG9ydCB7IGlzQWZ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNBZnRlclwiO1xuaW1wb3J0IHsgaXNCZWZvcmUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNCZWZvcmVcIjtcbmltcG9ydCB7IGlzV2l0aGluSW50ZXJ2YWwgfSBmcm9tIFwiZGF0ZS1mbnMvaXNXaXRoaW5JbnRlcnZhbFwiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcImRhdGUtZm5zL3RvRGF0ZVwiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZGF0ZS1mbnMvcGFyc2VcIjtcbmltcG9ydCB7IHBhcnNlSVNPIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlSVNPXCI7XG5pbXBvcnQgeyBhZGRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgPSAxMjtcblxuLy8gVGhpcyBSZWdFeHAgY2F0Y2hlcyBzeW1ib2xzIGVzY2FwZWQgYnkgcXVvdGVzLCBhbmQgYWxzb1xuLy8gc2VxdWVuY2VzIG9mIHN5bWJvbHMgUCwgcCwgYW5kIHRoZSBjb21iaW5hdGlvbnMgbGlrZSBgUFBQUFBQUHBwcHBwYFxuY29uc3QgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcblxuLy8gKiogRGF0ZSBDb25zdHJ1Y3RvcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0RhdGUodmFsdWUpIHtcbiAgY29uc3QgZCA9IHZhbHVlXG4gICAgPyB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmdcbiAgICAgID8gcGFyc2VJU08odmFsdWUpXG4gICAgICA6IHRvRGF0ZSh2YWx1ZSlcbiAgICA6IG5ldyBEYXRlKCk7XG4gIHJldHVybiBpc1ZhbGlkKGQpID8gZCA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGUodmFsdWUsIGRhdGVGb3JtYXQsIGxvY2FsZSwgc3RyaWN0UGFyc2luZywgbWluRGF0ZSkge1xuICBsZXQgcGFyc2VkRGF0ZSA9IG51bGw7XG4gIGxldCBsb2NhbGVPYmplY3QgPVxuICAgIGdldExvY2FsZU9iamVjdChsb2NhbGUpIHx8IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICBsZXQgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPSB0cnVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSkge1xuICAgIGRhdGVGb3JtYXQuZm9yRWFjaCgoZGYpID0+IHtcbiAgICAgIGxldCB0cnlQYXJzZURhdGUgPSBwYXJzZSh2YWx1ZSwgZGYsIG5ldyBEYXRlKCksIHtcbiAgICAgICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICAgICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgICAgIGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJlxuICAgICAgICAgIHZhbHVlID09PSBmb3JtYXREYXRlKHRyeVBhcnNlRGF0ZSwgZGYsIGxvY2FsZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNWYWxpZCh0cnlQYXJzZURhdGUsIG1pbkRhdGUpICYmIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoKSB7XG4gICAgICAgIHBhcnNlZERhdGUgPSB0cnlQYXJzZURhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlZERhdGU7XG4gIH1cblxuICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQsIG5ldyBEYXRlKCksIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iamVjdCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG5cbiAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9XG4gICAgICBpc1ZhbGlkKHBhcnNlZERhdGUpICYmXG4gICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZShwYXJzZWREYXRlLCBkYXRlRm9ybWF0LCBsb2NhbGUpO1xuICB9IGVsc2UgaWYgKCFpc1ZhbGlkKHBhcnNlZERhdGUpKSB7XG4gICAgZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXRcbiAgICAgIC5tYXRjaChsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgICBjb25zdCBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcInBcIiB8fCBmaXJzdENoYXJhY3RlciA9PT0gXCJQXCIpIHtcbiAgICAgICAgICBjb25zdCBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgICAgIHJldHVybiBsb2NhbGVPYmplY3RcbiAgICAgICAgICAgID8gbG9uZ0Zvcm1hdHRlcihzdWJzdHJpbmcsIGxvY2FsZU9iamVjdC5mb3JtYXRMb25nKVxuICAgICAgICAgICAgOiBmaXJzdENoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgICAgfSlcbiAgICAgIC5qb2luKFwiXCIpO1xuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHBhcnNlZERhdGUgPSBwYXJzZSh2YWx1ZSwgZGF0ZUZvcm1hdC5zbGljZSgwLCB2YWx1ZS5sZW5ndGgpLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgICAgcGFyc2VkRGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXNWYWxpZChwYXJzZWREYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA/IHBhcnNlZERhdGUgOiBudWxsO1xufVxuXG4vLyAqKiBEYXRlIFwiUmVmbGVjdGlvblwiICoqXG5cbmV4cG9ydCB7IGlzRGF0ZSB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChkYXRlLCBtaW5EYXRlKSB7XG4gIG1pbkRhdGUgPSBtaW5EYXRlID8gbWluRGF0ZSA6IG5ldyBEYXRlKFwiMS8xLzEwMDBcIik7XG4gIHJldHVybiBpc1ZhbGlkRGF0ZShkYXRlKSAmJiAhaXNCZWZvcmUoZGF0ZSwgbWluRGF0ZSk7XG59XG5cbi8vICoqIERhdGUgRm9ybWF0dGluZyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXRTdHIsIGxvY2FsZSkge1xuICBpZiAobG9jYWxlID09PSBcImVuXCIpIHtcbiAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICBsZXQgbG9jYWxlT2JqID0gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSk7XG4gIGlmIChsb2NhbGUgJiYgIWxvY2FsZU9iaikge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBBIGxvY2FsZSBvYmplY3Qgd2FzIG5vdCBmb3VuZCBmb3IgdGhlIHByb3ZpZGVkIHN0cmluZyBbXCIke2xvY2FsZX1cIl0uYCxcbiAgICApO1xuICB9XG4gIGlmIChcbiAgICAhbG9jYWxlT2JqICYmXG4gICAgISFnZXREZWZhdWx0TG9jYWxlKCkgJiZcbiAgICAhIWdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpXG4gICkge1xuICAgIGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICB9XG4gIHJldHVybiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmogPyBsb2NhbGVPYmogOiBudWxsLFxuICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlRm9ybWF0KGRhdGUsIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0pIHtcbiAgcmV0dXJuIChcbiAgICAoZGF0ZSAmJlxuICAgICAgZm9ybWF0RGF0ZShcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSA/IGRhdGVGb3JtYXRbMF0gOiBkYXRlRm9ybWF0LFxuICAgICAgICBsb2NhbGUsXG4gICAgICApKSB8fFxuICAgIFwiXCJcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlUmFuZ2VGb3JtYXQoc3RhcnREYXRlLCBlbmREYXRlLCBwcm9wcykge1xuICBpZiAoIXN0YXJ0RGF0ZSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVkU3RhcnREYXRlID0gc2FmZURhdGVGb3JtYXQoc3RhcnREYXRlLCBwcm9wcyk7XG4gIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSBlbmREYXRlID8gc2FmZURhdGVGb3JtYXQoZW5kRGF0ZSwgcHJvcHMpIDogXCJcIjtcblxuICByZXR1cm4gYCR7Zm9ybWF0dGVkU3RhcnREYXRlfSAtICR7Zm9ybWF0dGVkRW5kRGF0ZX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQoZGF0ZXMsIHByb3BzKSB7XG4gIGlmICghZGF0ZXM/Lmxlbmd0aCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG4gIGNvbnN0IGZvcm1hdHRlZEZpcnN0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzBdLCBwcm9wcyk7XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkRmlyc3REYXRlO1xuICB9XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDIpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmREYXRlID0gc2FmZURhdGVGb3JtYXQoZGF0ZXNbMV0sIHByb3BzKTtcbiAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSwgJHtmb3JtYXR0ZWRTZWNvbmREYXRlfWA7XG4gIH1cblxuICBjb25zdCBleHRyYURhdGVzQ291bnQgPSBkYXRlcy5sZW5ndGggLSAxO1xuICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSAoKyR7ZXh0cmFEYXRlc0NvdW50fSlgO1xufVxuXG4vLyAqKiBEYXRlIFNldHRlcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWUoZGF0ZSwgeyBob3VyID0gMCwgbWludXRlID0gMCwgc2Vjb25kID0gMCB9KSB7XG4gIHJldHVybiBzZXRIb3VycyhzZXRNaW51dGVzKHNldFNlY29uZHMoZGF0ZSwgc2Vjb25kKSwgbWludXRlKSwgaG91cik7XG59XG5cbmV4cG9ydCB7IHNldE1pbnV0ZXMsIHNldEhvdXJzLCBzZXRNb250aCwgc2V0UXVhcnRlciwgc2V0WWVhciB9O1xuXG4vLyAqKiBEYXRlIEdldHRlcnMgKipcblxuLy8gZ2V0RGF5IFJldHVybnMgZGF5IG9mIHdlZWssIGdldERhdGUgcmV0dXJucyBkYXkgb2YgbW9udGhcbmV4cG9ydCB7XG4gIGdldFNlY29uZHMsXG4gIGdldE1pbnV0ZXMsXG4gIGdldEhvdXJzLFxuICBnZXRNb250aCxcbiAgZ2V0UXVhcnRlcixcbiAgZ2V0WWVhcixcbiAgZ2V0RGF5LFxuICBnZXREYXRlLFxuICBnZXRUaW1lLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWsoZGF0ZSwgbG9jYWxlKSB7XG4gIGxldCBsb2NhbGVPYmogPVxuICAgIChsb2NhbGUgJiYgZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSkpIHx8XG4gICAgKGdldERlZmF1bHRMb2NhbGUoKSAmJiBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKSk7XG4gIHJldHVybiBnZXRJU09XZWVrKGRhdGUsIGxvY2FsZU9iaiA/IHsgbG9jYWxlOiBsb2NhbGVPYmogfSA6IG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrQ29kZShkYXksIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXksIFwiZGRkXCIsIGxvY2FsZSk7XG59XG5cbi8vICoqKiBTdGFydCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZEYXkoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZkRheShkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZXZWVrKGRhdGUsIGxvY2FsZSwgY2FsZW5kYXJTdGFydERheSkge1xuICBsZXQgbG9jYWxlT2JqID0gbG9jYWxlXG4gICAgPyBnZXRMb2NhbGVPYmplY3QobG9jYWxlKVxuICAgIDogZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIHJldHVybiBzdGFydE9mV2VlayhkYXRlLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmosXG4gICAgd2Vla1N0YXJ0c09uOiBjYWxlbmRhclN0YXJ0RGF5LFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZNb250aChkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mTW9udGgoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mWWVhcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mWWVhcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZRdWFydGVyKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZRdWFydGVyKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlRvZGF5KCkge1xuICByZXR1cm4gc3RhcnRPZkRheShuZXdEYXRlKCkpO1xufVxuXG4vLyAqKiogRW5kIG9mICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kT2ZXZWVrKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mV2VlayhkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gZW5kT2ZNb250aChkYXRlKTtcbn1cblxuLy8gKiogRGF0ZSBNYXRoICoqXG5cbi8vICoqKiBBZGRpdGlvbiAqKipcblxuZXhwb3J0IHtcbiAgYWRkU2Vjb25kcyxcbiAgYWRkTWludXRlcyxcbiAgYWRkRGF5cyxcbiAgYWRkV2Vla3MsXG4gIGFkZE1vbnRocyxcbiAgYWRkUXVhcnRlcnMsXG4gIGFkZFllYXJzLFxufTtcblxuLy8gKioqIFN1YnRyYWN0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRIb3Vycywgc3ViRGF5cywgc3ViV2Vla3MsIHN1Yk1vbnRocywgc3ViUXVhcnRlcnMsIHN1YlllYXJzIH07XG5cbi8vICoqIERhdGUgQ29tcGFyaXNvbiAqKlxuXG5leHBvcnQgeyBpc0JlZm9yZSwgaXNBZnRlciB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZURheShkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc0VxdWFsKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZkRheShzdGFydERhdGUpO1xuICBjb25zdCBlbmQgPSBlbmRPZkRheShlbmREYXRlKTtcblxuICB0cnkge1xuICAgIHZhbGlkID0gaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbi8vICoqKiBEaWZmaW5nICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTEsIGRhdGUyKSB7XG4gIHJldHVybiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZTEsIGRhdGUyKTtcbn1cblxuLy8gKiogRGF0ZSBMb2NhbGl6YXRpb24gKipcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZU5hbWUsIGxvY2FsZURhdGEpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBpZiAoIXNjb3BlLl9fbG9jYWxlRGF0YV9fKSB7XG4gICAgc2NvcGUuX19sb2NhbGVEYXRhX18gPSB7fTtcbiAgfVxuICBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVOYW1lXSA9IGxvY2FsZURhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0TG9jYWxlKGxvY2FsZU5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBzY29wZS5fX2xvY2FsZUlkX18gPSBsb2NhbGVOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdExvY2FsZSgpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICByZXR1cm4gc2NvcGUuX19sb2NhbGVJZF9fO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZVNwZWMpIHtcbiAgaWYgKHR5cGVvZiBsb2NhbGVTcGVjID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSBsb2NhbGUgbmFtZSByZWdpc3RlcmVkIGJ5IHJlZ2lzdGVyTG9jYWxlXG4gICAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcbiAgICByZXR1cm4gc2NvcGUuX19sb2NhbGVEYXRhX18gPyBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVTcGVjXSA6IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSByYXcgZGF0ZS1mbnMgbG9jYWxlIG9iamVjdFxuICAgIHJldHVybiBsb2NhbGVTcGVjO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF0ZSwgZm9ybWF0RnVuYywgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXRGdW5jKGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFXCIsIGxvY2FsZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhTaG9ydEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxdWFydGVyLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0UXVhcnRlcihuZXdEYXRlKCksIHF1YXJ0ZXIpLCBcIlFRUVwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiBVdGlscyBmb3Igc29tZSBjb21wb25lbnRzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheURpc2FibGVkKFxuICBkYXksXG4gIHtcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICAgZXhjbHVkZURhdGVzLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGluY2x1ZGVEYXRlcyxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFscyxcbiAgICBmaWx0ZXJEYXRlLFxuICB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lRGF5KGRheSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXkpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlFeGNsdWRlZChcbiAgZGF5LFxuICB7IGV4Y2x1ZGVEYXRlcywgZXhjbHVkZURhdGVJbnRlcnZhbHMgfSA9IHt9LFxuKSB7XG4gIGlmIChleGNsdWRlRGF0ZUludGVydmFscyAmJiBleGNsdWRlRGF0ZUludGVydmFscy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhEaXNhYmxlZChcbiAgbW9udGgsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhtb250aCwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZk1vbnRoKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZNb250aChtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShtb250aCkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoSW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIG0sIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVNb250aCA9IGdldE1vbnRoKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZU1vbnRoID0gZ2V0TW9udGgoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZU1vbnRoIDw9IG0gJiYgbSA8PSBlbmREYXRlTW9udGg7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZU1vbnRoIDw9IG0pIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZU1vbnRoID49IG0pIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckRpc2FibGVkKFxuICBxdWFydGVyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMocXVhcnRlciwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBpbmNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUocXVhcnRlcikpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnRcbiAqIEBwYXJhbSB7RGF0ZX0gZW5kXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckluUmFuZ2UoeWVhciwgc3RhcnQsIGVuZCkge1xuICBpZiAoIWlzVmFsaWREYXRlKHN0YXJ0KSB8fCAhaXNWYWxpZERhdGUoZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzdGFydFllYXIgPSBnZXRZZWFyKHN0YXJ0KTtcbiAgY29uc3QgZW5kWWVhciA9IGdldFllYXIoZW5kKTtcblxuICByZXR1cm4gc3RhcnRZZWFyIDw9IHllYXIgJiYgZW5kWWVhciA+PSB5ZWFyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFyRGlzYWJsZWQoXG4gIHllYXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCAwLCAxKTtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRhdGUsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZZZWFyKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZZZWFyKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF0ZSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVRdWFydGVyIDw9IHEgJiYgcSA8PSBlbmREYXRlUXVhcnRlcjtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlUXVhcnRlciA8PSBxKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVRdWFydGVyID49IHEpIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSA9IHt9KSB7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWluRGF0ZSkgPCAwKSB8fFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1heERhdGUpID4gMClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluTGlzdCh0aW1lLCB0aW1lcykge1xuICByZXR1cm4gdGltZXMuc29tZShcbiAgICAobGlzdFRpbWUpID0+XG4gICAgICBnZXRIb3VycyhsaXN0VGltZSkgPT09IGdldEhvdXJzKHRpbWUpICYmXG4gICAgICBnZXRNaW51dGVzKGxpc3RUaW1lKSA9PT0gZ2V0TWludXRlcyh0aW1lKSxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZURpc2FibGVkKFxuICB0aW1lLFxuICB7IGV4Y2x1ZGVUaW1lcywgaW5jbHVkZVRpbWVzLCBmaWx0ZXJUaW1lIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIChleGNsdWRlVGltZXMgJiYgaXNUaW1lSW5MaXN0KHRpbWUsIGV4Y2x1ZGVUaW1lcykpIHx8XG4gICAgKGluY2x1ZGVUaW1lcyAmJiAhaXNUaW1lSW5MaXN0KHRpbWUsIGluY2x1ZGVUaW1lcykpIHx8XG4gICAgKGZpbHRlclRpbWUgJiYgIWZpbHRlclRpbWUodGltZSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB7IG1pblRpbWUsIG1heFRpbWUgfSkge1xuICBpZiAoIW1pblRpbWUgfHwgIW1heFRpbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb3RoIG1pblRpbWUgYW5kIG1heFRpbWUgcHJvcHMgcmVxdWlyZWRcIik7XG4gIH1cbiAgY29uc3QgYmFzZSA9IG5ld0RhdGUoKTtcbiAgY29uc3QgYmFzZVRpbWUgPSBzZXRIb3VycyhzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXModGltZSkpLCBnZXRIb3Vycyh0aW1lKSk7XG4gIGNvbnN0IG1pbiA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtaW5UaW1lKSksXG4gICAgZ2V0SG91cnMobWluVGltZSksXG4gICk7XG4gIGNvbnN0IG1heCA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtYXhUaW1lKSksXG4gICAgZ2V0SG91cnMobWF4VGltZSksXG4gICk7XG5cbiAgbGV0IHZhbGlkO1xuICB0cnkge1xuICAgIHZhbGlkID0gIWlzV2l0aGluSW50ZXJ2YWwoYmFzZVRpbWUsIHsgc3RhcnQ6IG1pbiwgZW5kOiBtYXggfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c01vbnRoID0gc3ViTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobWluRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGluY2x1ZGVEYXRlLCBwcmV2aW91c01vbnRoKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQWZ0ZXIoZGF5LCB7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEJlZm9yZShkYXRlLCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgZmlyc3REYXRlT2ZZZWFyID0gc3RhcnRPZlllYXIoZGF0ZSk7XG4gIGNvbnN0IHByZXZpb3VzUXVhcnRlciA9IHN1YlF1YXJ0ZXJzKGZpcnN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG1pbkRhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMoaW5jbHVkZURhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVhcnRlckRpc2FibGVkQWZ0ZXIoZGF0ZSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGxhc3REYXRlT2ZZZWFyID0gZW5kT2ZZZWFyKGRhdGUpO1xuICBjb25zdCBuZXh0UXVhcnRlciA9IGFkZFF1YXJ0ZXJzKGxhc3REYXRlT2ZZZWFyLCAxKTtcblxuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMobmV4dFF1YXJ0ZXIsIG1heERhdGUpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhckRpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IHN1YlllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhtaW5EYXRlLCBwcmV2aW91c1llYXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1llYXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJzRGlzYWJsZWRCZWZvcmUoXG4gIGRheSxcbiAgeyBtaW5EYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgcHJldmlvdXNZZWFyID0gZ2V0U3RhcnRPZlllYXIoc3ViWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcikpO1xuICBjb25zdCB7IGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QocHJldmlvdXNZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1pbkRhdGVZZWFyID0gbWluRGF0ZSAmJiBnZXRZZWFyKG1pbkRhdGUpO1xuICByZXR1cm4gKG1pbkRhdGVZZWFyICYmIG1pbkRhdGVZZWFyID4gZW5kUGVyaW9kKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobmV4dFllYXIsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQWZ0ZXIoXG4gIGRheSxcbiAgeyBtYXhEYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgbmV4dFllYXIgPSBhZGRZZWFycyhkYXksIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QobmV4dFllYXIsIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgbWF4RGF0ZVllYXIgPSBtYXhEYXRlICYmIGdldFllYXIobWF4RGF0ZSk7XG4gIHJldHVybiAobWF4RGF0ZVllYXIgJiYgbWF4RGF0ZVllYXIgPCBzdGFydFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNaW5EYXRlKHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtaW5EYXRlKSB7XG4gICAgbGV0IG1pbkRhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtaW5EYXRlKSA+PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1pbihtaW5EYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1pbihpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNYXhEYXRlKHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtYXhEYXRlKSB7XG4gICAgbGV0IG1heERhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtYXhEYXRlKSA8PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1heChtYXhEYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1heChpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaWdodExpZ2h0RGF5c01hcChcbiAgaGlnaGxpZ2h0RGF0ZXMgPSBbXSxcbiAgZGVmYXVsdENsYXNzTmFtZSA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiLFxuKSB7XG4gIGNvbnN0IGRhdGVDbGFzc2VzID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGlnaGxpZ2h0RGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBvYmogPSBoaWdobGlnaHREYXRlc1tpXTtcbiAgICBpZiAoaXNEYXRlKG9iaikpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUob2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoZGVmYXVsdENsYXNzTmFtZSkpIHtcbiAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGRlZmF1bHRDbGFzc05hbWUpO1xuICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0ga2V5c1swXTtcbiAgICAgIGNvbnN0IGFyck9mRGF0ZXMgPSBvYmpba2V5c1swXV07XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhcnJPZkRhdGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuID0gYXJyT2ZEYXRlcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoYXJyT2ZEYXRlc1trXSwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXNBcnIgPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG4vKipcbiAqIENvbXBhcmUgdGhlIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSwgaWYgdGhlIHBhc3NlZCBhcnJheSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlzQXJlRXF1YWwoYXJyYXkxLCBhcnJheTIpIHtcbiAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyYXkxLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBhcnJheTJbaW5kZXhdKTtcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIGN1c3RvbSBjbGFzcyB0byBlYWNoIGRhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGlkYXlEYXRlcyBhcnJheSBvZiBvYmplY3QgY29udGFpbmluZyBkYXRlIGFuZCBuYW1lIG9mIHRoZSBob2xpZGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NuYW1lIHRvIGJlIGFkZGVkLlxuICogQHJldHVybnMge01hcH0gTWFwIGNvbnRhaW5pbmcgZGF0ZSBhcyBrZXkgYW5kIGFycmF5IG9mIGNsYXNzbmFtZSBhbmQgaG9saWRheSBuYW1lIGFzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb2xpZGF5c01hcChcbiAgaG9saWRheURhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taG9saWRheXNcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgaG9saWRheURhdGVzLmZvckVhY2goKGhvbGlkYXkpID0+IHtcbiAgICBjb25zdCB7IGRhdGU6IGRhdGVPYmosIGhvbGlkYXlOYW1lIH0gPSBob2xpZGF5O1xuICAgIGlmICghaXNEYXRlKGRhdGVPYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gZm9ybWF0RGF0ZShkYXRlT2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgY2xhc3NOYW1lc09iaiA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IHt9O1xuICAgIGlmIChcbiAgICAgIFwiY2xhc3NOYW1lXCIgaW4gY2xhc3NOYW1lc09iaiAmJlxuICAgICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9PT0gZGVmYXVsdENsYXNzTmFtZSAmJlxuICAgICAgYXJyYXlzQXJlRXF1YWwoY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSwgW2hvbGlkYXlOYW1lXSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGFzc05hbWVzT2JqW1wiY2xhc3NOYW1lXCJdID0gZGVmYXVsdENsYXNzTmFtZTtcbiAgICBjb25zdCBob2xpZGF5TmFtZUFyciA9IGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl07XG4gICAgY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSA9IGhvbGlkYXlOYW1lQXJyXG4gICAgICA/IFsuLi5ob2xpZGF5TmFtZUFyciwgaG9saWRheU5hbWVdXG4gICAgICA6IFtob2xpZGF5TmFtZV07XG4gICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc09iaik7XG4gIH0pO1xuICByZXR1cm4gZGF0ZUNsYXNzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gIHN0YXJ0T2ZEYXksXG4gIGN1cnJlbnRUaW1lLFxuICBjdXJyZW50TXVsdGlwbGllcixcbiAgaW50ZXJ2YWxzLFxuICBpbmplY3RlZFRpbWVzLFxuKSB7XG4gIGNvbnN0IGwgPSBpbmplY3RlZFRpbWVzLmxlbmd0aDtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBsZXQgaW5qZWN0ZWRUaW1lID0gc3RhcnRPZkRheTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRIb3VycyhpbmplY3RlZFRpbWUsIGdldEhvdXJzKGluamVjdGVkVGltZXNbaV0pKTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRNaW51dGVzKGluamVjdGVkVGltZSwgZ2V0TWludXRlcyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkU2Vjb25kcyhpbmplY3RlZFRpbWUsIGdldFNlY29uZHMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuXG4gICAgY29uc3QgbmV4dFRpbWUgPSBhZGRNaW51dGVzKFxuICAgICAgc3RhcnRPZkRheSxcbiAgICAgIChjdXJyZW50TXVsdGlwbGllciArIDEpICogaW50ZXJ2YWxzLFxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICBpc0FmdGVyKGluamVjdGVkVGltZSwgY3VycmVudFRpbWUpICYmXG4gICAgICBpc0JlZm9yZShpbmplY3RlZFRpbWUsIG5leHRUaW1lKVxuICAgICkge1xuICAgICAgdGltZXMucHVzaChpbmplY3RlZFRpbWVzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGltZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRaZXJvKGkpIHtcbiAgcmV0dXJuIGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRZZWFyc1BlcmlvZChcbiAgZGF0ZSxcbiAgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4pIHtcbiAgY29uc3QgZW5kUGVyaW9kID0gTWF0aC5jZWlsKGdldFllYXIoZGF0ZSkgLyB5ZWFySXRlbU51bWJlcikgKiB5ZWFySXRlbU51bWJlcjtcbiAgY29uc3Qgc3RhcnRQZXJpb2QgPSBlbmRQZXJpb2QgLSAoeWVhckl0ZW1OdW1iZXIgLSAxKTtcbiAgcmV0dXJuIHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG91cnNJbkRheShkKSB7XG4gIGNvbnN0IHN0YXJ0T2ZEYXkgPSBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xuICBjb25zdCBzdGFydE9mVGhlTmV4dERheSA9IG5ldyBEYXRlKFxuICAgIGQuZ2V0RnVsbFllYXIoKSxcbiAgICBkLmdldE1vbnRoKCksXG4gICAgZC5nZXREYXRlKCksXG4gICAgMjQsXG4gICk7XG5cbiAgcmV0dXJuIE1hdGgucm91bmQoKCtzdGFydE9mVGhlTmV4dERheSAtICtzdGFydE9mRGF5KSAvIDNfNjAwXzAwMCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgdGhlIG1pbnV0ZSBmb3IgdGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIGlzIGEgRFNUIGFuZCB0aW1lem9uZS1zYWZlIGFuYWxvZyBvZiBgZGF0ZS1mbnMvc3RhcnRPZk1pbnV0ZWBcbiAqIGRvIG5vdCBtYWtlIGNoYW5nZXMgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nXG4gKlxuICogU2VlIGNvbW1lbnRzIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvcHVsbC80MjQ0XG4gKiBmb3IgbW9yZSBkZXRhaWxzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSBzdGFydCBvZiB0aGUgbWludXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mTWludXRlKGQpIHtcbiAgY29uc3Qgc2Vjb25kcyA9IGQuZ2V0U2Vjb25kcygpO1xuICBjb25zdCBtaWxsaXNlY29uZHMgPSBkLmdldE1pbGxpc2Vjb25kcygpO1xuXG4gIHJldHVybiB0b0RhdGUoZC5nZXRUaW1lKCkgLSBzZWNvbmRzICogMTAwMCAtIG1pbGxpc2Vjb25kcyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgbWludXRlXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL2lzU2FtZU1pbnV0ZWBcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGQxXG4gKiBAcGFyYW0ge0RhdGV9IGQyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU1pbnV0ZShkMSwgZDIpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZNaW51dGUoZDEpLmdldFRpbWUoKSA9PT0gc3RhcnRPZk1pbnV0ZShkMikuZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZWQgZGF0ZSB3aXRoIG1pZG5pZ2h0IHRpbWUgKDAwOjAwOjAwKVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSBmb3Igd2hpY2ggbWlkbmlnaHQgdGltZSBpcyByZXF1aXJlZFxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge0RhdGV9IEEgbmV3IGRhdGV0aW1lIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaWRuaWdodERhdGUoZGF0ZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZVwiKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVXaXRob3V0VGltZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBkYXRlV2l0aG91dFRpbWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlV2l0aG91dFRpbWU7XG59XG5cbi8qKlxuICogSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSB0aGF0IHNob3VsZCBiZSBiZWZvcmUgdGhlIG90aGVyIG9uZSB0byByZXR1cm4gdHJ1ZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIFRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge2Jvb2xlYW59IFRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIGRhdGVcbiAqXG4gKiBOb3RlOlxuICogIFRoaXMgZnVuY3Rpb24gY29uc2lkZXJzIHRoZSBtaWQtbmlnaHQgb2YgdGhlIGdpdmVuIGRhdGVzIGZvciBjb21wYXJpc29uLlxuICogIEl0IGV2YWx1YXRlcyB3aGV0aGVyIGRhdGUgaXMgYmVmb3JlIGRhdGVUb0NvbXBhcmUgYmFzZWQgb24gdGhlaXIgbWlkLW5pZ2h0IHRpbWVzdGFtcHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVCZWZvcmUoZGF0ZSwgZGF0ZVRvQ29tcGFyZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSB8fCAhaXNEYXRlKGRhdGVUb0NvbXBhcmUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIHJlY2VpdmVkXCIpO1xuICB9XG5cbiAgY29uc3QgbWlkbmlnaHREYXRlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGUpO1xuICBjb25zdCBtaWRuaWdodERhdGVUb0NvbXBhcmUgPSBnZXRNaWRuaWdodERhdGUoZGF0ZVRvQ29tcGFyZSk7XG5cbiAgcmV0dXJuIGlzQmVmb3JlKG1pZG5pZ2h0RGF0ZSwgbWlkbmlnaHREYXRlVG9Db21wYXJlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3BhY2VLZXlEb3duKGV2ZW50KSB7XG4gIGNvbnN0IFNQQUNFX0tFWSA9IFwiIFwiO1xuICByZXR1cm4gZXZlbnQua2V5ID09PSBTUEFDRV9LRVk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlWWVhcnMoeWVhciwgbm9PZlllYXIsIG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDIgKiBub09mWWVhciArIDE7IGkrKykge1xuICAgIGNvbnN0IG5ld1llYXIgPSB5ZWFyICsgbm9PZlllYXIgLSBpO1xuICAgIGxldCBpc0luUmFuZ2UgPSB0cnVlO1xuXG4gICAgaWYgKG1pbkRhdGUpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWluRGF0ZSkgPD0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAobWF4RGF0ZSAmJiBpc0luUmFuZ2UpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWF4RGF0ZSkgPj0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAoaXNJblJhbmdlKSB7XG4gICAgICBsaXN0LnB1c2gobmV3WWVhcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgeWVhckRyb3Bkb3duSXRlbU51bWJlciwgc2Nyb2xsYWJsZVllYXJEcm9wZG93biB9ID0gcHJvcHM7XG4gICAgY29uc3Qgbm9PZlllYXIgPVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlciB8fCAoc2Nyb2xsYWJsZVllYXJEcm9wZG93biA/IDEwIDogNSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgeWVhcnNMaXN0OiBnZW5lcmF0ZVllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLnllYXIsXG4gICAgICAgIG5vT2ZZZWFyLFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgICB0aGlzLmRyb3Bkb3duUmVmID0gY3JlYXRlUmVmKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBkcm9wZG93bkN1cnJlbnQgPSB0aGlzLmRyb3Bkb3duUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAoZHJvcGRvd25DdXJyZW50KSB7XG4gICAgICAvLyBHZXQgYXJyYXkgZnJvbSBIVE1MQ29sbGVjdGlvblxuICAgICAgY29uc3QgZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4gPSBkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW5cbiAgICAgICAgPyBBcnJheS5mcm9tKGRyb3Bkb3duQ3VycmVudC5jaGlsZHJlbilcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRZZWFyT3B0aW9uRWwgPSBkcm9wZG93bkN1cnJlbnRDaGlsZHJlblxuICAgICAgICA/IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuLmZpbmQoKGNoaWxkRWwpID0+IGNoaWxkRWwuYXJpYVNlbGVjdGVkKVxuICAgICAgICA6IG51bGw7XG5cbiAgICAgIGRyb3Bkb3duQ3VycmVudC5zY3JvbGxUb3AgPSBzZWxlY3RlZFllYXJPcHRpb25FbFxuICAgICAgICA/IHNlbGVjdGVkWWVhck9wdGlvbkVsLm9mZnNldFRvcCArXG4gICAgICAgICAgKHNlbGVjdGVkWWVhck9wdGlvbkVsLmNsaWVudEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMlxuICAgICAgICA6IChkcm9wZG93bkN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gZHJvcGRvd25DdXJyZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gdGhpcy5wcm9wcy55ZWFyO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnN0YXRlLnllYXJzTGlzdC5tYXAoKHllYXIpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICBzZWxlY3RlZFllYXIgPT09IHllYXJcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbiByZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfeWVhclwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICB9XG4gICAgICAgIGtleT17eWVhcn1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIHllYXIpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWxlY3RlZFllYXIgPT09IHllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgID5cbiAgICAgICAge3NlbGVjdGVkWWVhciA9PT0geWVhciA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj7inJM8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgXCJcIlxuICAgICAgICApfVxuICAgICAgICB7eWVhcn1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuXG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IG51bGw7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IG51bGw7XG5cbiAgICBpZiAoIW1heFllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1heFllYXIpKSB7XG4gICAgICBvcHRpb25zLnVuc2hpZnQoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInVwY29taW5nXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5pbmNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtdXBjb21pbmdcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghbWluWWVhciB8fCAhdGhpcy5zdGF0ZS55ZWFyc0xpc3QuZmluZCgoeWVhcikgPT4geWVhciA9PT0gbWluWWVhcikpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgICBrZXk9e1wicHJldmlvdXNcIn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmRlY3JlbWVudFllYXJzfVxuICAgICAgICA+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbiByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycyByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycy1wcmV2aW91c1wiIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICBzaGlmdFllYXJzID0gKGFtb3VudCkgPT4ge1xuICAgIGNvbnN0IHllYXJzID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKGZ1bmN0aW9uICh5ZWFyKSB7XG4gICAgICByZXR1cm4geWVhciArIGFtb3VudDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgeWVhcnNMaXN0OiB5ZWFycyxcbiAgICB9KTtcbiAgfTtcblxuICBpbmNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKDEpO1xuICB9O1xuXG4gIGRlY3JlbWVudFllYXJzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnNoaWZ0WWVhcnMoLTEpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfSByZWY9e3RoaXMuZHJvcGRvd25SZWZ9PlxuICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgWWVhckRyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoWWVhckRyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBtaW5ZZWFyID0gdGhpcy5wcm9wcy5taW5EYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1pbkRhdGUpIDogMTkwMDtcbiAgICBjb25zdCBtYXhZZWFyID0gdGhpcy5wcm9wcy5tYXhEYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1heERhdGUpIDogMjEwMDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gbWluWWVhcjsgaSA8PSBtYXhZZWFyOyBpKyspIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAgICB7aX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25TZWxlY3RDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAoKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e3RoaXMucHJvcHMueWVhcn1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlld1wiXG4gICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1zZWxlY3RlZC15ZWFyXCI+XG4gICAgICAgIHt0aGlzLnByb3BzLnllYXJ9XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAoKSA9PiAoXG4gICAgPFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICB5ZWFyPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcbiAgICBpZiAoeWVhciA9PT0gdGhpcy5wcm9wcy55ZWFyKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh5ZWFyKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMucHJvcHMuZGF0ZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIHRoaXMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIHRoaXMuc2V0T3BlbigpO1xuICB9O1xuXG4gIG9uU2VsZWN0ID0gKGRhdGUsIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRPcGVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbW9udGhOYW1lczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIGlzU2VsZWN0ZWRNb250aCA9IChpKSA9PiB0aGlzLnByb3BzLm1vbnRoID09PSBpO1xuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubW9udGhOYW1lcy5tYXAoKG1vbnRoLCBpKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoaSlcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZF9tb250aFwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e21vbnRofVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgaSl9XG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGkpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge21vbnRofVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGgpO1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHRoaXMucHJvcHMub25DYW5jZWwoKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd25cIj5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aERyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9IChtb250aE5hbWVzKSA9PlxuICAgIG1vbnRoTmFtZXMubWFwKChNLCBpKSA9PiAoXG4gICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2l9PlxuICAgICAgICB7TX1cbiAgICAgIDwvb3B0aW9uPlxuICAgICkpO1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucyhtb250aE5hbWVzKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlLCBtb250aE5hbWVzKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aFwiPlxuICAgICAgICB7bW9udGhOYW1lc1t0aGlzLnByb3BzLm1vbnRoXX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJEcm9wZG93biA9IChtb250aE5hbWVzKSA9PiAoXG4gICAgPFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICBtb250aE5hbWVzPXttb250aE5hbWVzfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAobW9udGhOYW1lcykgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlLCBtb250aE5hbWVzKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bihtb250aE5hbWVzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKG1vbnRoICE9PSB0aGlzLnByb3BzLm1vbnRoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXS5tYXAoXG4gICAgICB0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3duXG4gICAgICAgID8gKE0pID0+IHV0aWxzLmdldE1vbnRoU2hvcnRJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSlcbiAgICAgICAgOiAoTSkgPT4gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSksXG4gICAgKTtcblxuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZShtb250aE5hbWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7XG4gIGFkZE1vbnRocyxcbiAgZm9ybWF0RGF0ZSxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBuZXdEYXRlLFxuICBpc0FmdGVyLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lWWVhcixcbiAgZ2V0VGltZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU1vbnRoWWVhcnMobWluRGF0ZSwgbWF4RGF0ZSkge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKG1pbkRhdGUpO1xuICBjb25zdCBsYXN0RGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtYXhEYXRlKTtcblxuICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgIGxpc3QucHVzaChuZXdEYXRlKGN1cnJEYXRlKSk7XG5cbiAgICBjdXJyRGF0ZSA9IGFkZE1vbnRocyhjdXJyRGF0ZSwgMSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1vbnRoWWVhcnNMaXN0OiBnZW5lcmF0ZU1vbnRoWWVhcnMoXG4gICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tb250aFllYXJzTGlzdC5tYXAoKG1vbnRoWWVhcikgPT4ge1xuICAgICAgY29uc3QgbW9udGhZZWFyUG9pbnQgPSBnZXRUaW1lKG1vbnRoWWVhcik7XG4gICAgICBjb25zdCBpc1NhbWVNb250aFllYXIgPVxuICAgICAgICBpc1NhbWVZZWFyKHRoaXMucHJvcHMuZGF0ZSwgbW9udGhZZWFyKSAmJlxuICAgICAgICBpc1NhbWVNb250aCh0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgaXNTYW1lTW9udGhZZWFyXG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGgteWVhclwiXG4gICAgICAgICAgICAgIDogXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvblwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17bW9udGhZZWFyUG9pbnR9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIG1vbnRoWWVhclBvaW50KX1cbiAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc1NhbWVNb250aFllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1NhbWVNb250aFllYXIgPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAg4pyTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHtmb3JtYXREYXRlKG1vbnRoWWVhciwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXIpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGhZZWFyKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Ryb3Bkb3duQ2xhc3N9Pnt0aGlzLnJlbmRlck9wdGlvbnMoKX08L2Rpdj47XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIG5ld0RhdGUsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxudmFyIFdyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMgPSBvbkNsaWNrT3V0c2lkZShNb250aFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgICAgY29uc3QgdGltZVBvaW50ID0gZ2V0VGltZShjdXJyRGF0ZSk7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXt0aW1lUG9pbnR9IHZhbHVlPXt0aW1lUG9pbnR9PlxuICAgICAgICAgIHtmb3JtYXREYXRlKGN1cnJEYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcblxuICAgICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXtnZXRUaW1lKGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRhdGUpKX1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiB7XG4gICAgY29uc3QgeWVhck1vbnRoID0gZm9ybWF0RGF0ZShcbiAgICAgIHRoaXMucHJvcHMuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9XCJyZWFkXCJcbiAgICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlld1wiXG4gICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bihldmVudCl9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXctLXNlbGVjdGVkLW1vbnRoLXllYXJcIj5cbiAgICAgICAgICB7eWVhck1vbnRofVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICBkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG4gICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXJQb2ludCkgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblxuICAgIGNvbnN0IGNoYW5nZWREYXRlID0gbmV3RGF0ZShwYXJzZUludChtb250aFllYXJQb2ludCkpO1xuXG4gICAgaWYgKFxuICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIGNoYW5nZWREYXRlKSAmJlxuICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9ICgpID0+XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHJlbmRlcmVkRHJvcGRvd247XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRyb3Bkb3duTW9kZSkge1xuICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTY3JvbGxNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBnZXREYXksXG4gIGdldE1vbnRoLFxuICBnZXREYXRlLFxuICBuZXdEYXRlLFxuICBpc1NhbWVEYXksXG4gIGlzRGF5RGlzYWJsZWQsXG4gIGlzRGF5RXhjbHVkZWQsXG4gIGlzRGF5SW5SYW5nZSxcbiAgaXNFcXVhbCxcbiAgaXNCZWZvcmUsXG4gIGlzQWZ0ZXIsXG4gIGdldERheU9mV2Vla0NvZGUsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBmb3JtYXREYXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c0RheSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkocHJldlByb3BzKTtcbiAgfVxuXG4gIGRheUVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VFbnRlciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKCkgJiYgdGhpcy5wcm9wcy5vbk1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIiBcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmtleSA9IFwiRW50ZXJcIjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKG90aGVyKSA9PiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXksIG90aGVyKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1NlbGVjdGVkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlXG4gICAgICA/IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT4gdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSkpXG4gICAgICA6IHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuXG4gICAgcmV0dXJuICFpc1NlbGVjdGVkRGF0ZSAmJiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gIH07XG5cbiAgaXNEaXNhYmxlZCA9ICgpID0+IGlzRGF5RGlzYWJsZWQodGhpcy5wcm9wcy5kYXksIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoKSA9PiBpc0RheUV4Y2x1ZGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc1N0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBpc1NhbWVEYXkoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVXZWVrID0gKG90aGVyKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICBpc1NhbWVEYXkoXG4gICAgICBvdGhlcixcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVEYXlPcldlZWsgPSAob3RoZXIpID0+IHRoaXMuaXNTYW1lRGF5KG90aGVyKSB8fCB0aGlzLmlzU2FtZVdlZWsob3RoZXIpO1xuXG4gIGdldEhpZ2hMaWdodGVkQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhpZ2hsaWdodERhdGVzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFoaWdobGlnaHREYXRlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIExvb2tpbmcgZm9yIGNsYXNzTmFtZSBpbiB0aGUgTWFwIG9mIHsnZGF5IHN0cmluZywgJ2NsYXNzTmFtZSd9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICByZXR1cm4gaGlnaGxpZ2h0RGF0ZXMuZ2V0KGRheVN0cik7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBhcnJheSBjb250YWluaW5nIGNsYXNzbmFtZSBhc3NvY2lhdGVkIHRvIHRoZSBkYXRlXG4gIGdldEhvbGlkYXlzQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaG9saWRheXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7ZGF5IHN0cmluZzoge2NsYXNzTmFtZSwgaG9saWRheU5hbWV9fVxuICAgIGlmIChob2xpZGF5cy5oYXMoZGF5U3RyKSkge1xuICAgICAgcmV0dXJuIFtob2xpZGF5cy5nZXQoZGF5U3RyKS5jbGFzc05hbWVdO1xuICAgIH1cbiAgfTtcblxuICBpc0luUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc2VsZWN0c1N0YXJ0LFxuICAgICAgc2VsZWN0c0VuZCxcbiAgICAgIHNlbGVjdHNSYW5nZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICFzZWxlY3RpbmdEYXRlIHx8XG4gICAgICAoIXNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlICYmIHRoaXMuaXNEaXNhYmxlZCgpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNTdGFydCAmJlxuICAgICAgZW5kRGF0ZSAmJlxuICAgICAgKGlzQmVmb3JlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c0VuZCAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAoaXNBZnRlcihzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNSYW5nZSAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAhZW5kRGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYW1lRGF5KHN0YXJ0RGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1JhbmdlRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShlbmREYXRlLCBkYXkpO1xuICB9O1xuXG4gIGlzV2Vla2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrZGF5ID0gZ2V0RGF5KHRoaXMucHJvcHMuZGF5KTtcbiAgICByZXR1cm4gd2Vla2RheSA9PT0gMCB8fCB3ZWVrZGF5ID09PSA2O1xuICB9O1xuXG4gIGlzQWZ0ZXJNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAodGhpcy5wcm9wcy5tb250aCArIDEpICUgMTIgPT09IGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNCZWZvcmVNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAoZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpICsgMSkgJSAxMiA9PT0gdGhpcy5wcm9wcy5tb250aFxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50RGF5ID0gKCkgPT4gdGhpcy5pc1NhbWVEYXkobmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT5cbiAgICAgICAgdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gIH07XG5cbiAgZ2V0Q2xhc3NOYW1lcyA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgZGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWVcbiAgICAgID8gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWUoZGF0ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIixcbiAgICAgIGRheUNsYXNzTmFtZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1cIiArIGdldERheU9mV2Vla0NvZGUodGhpcy5wcm9wcy5kYXkpLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZGlzYWJsZWRcIjogdGhpcy5pc0Rpc2FibGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1leGNsdWRlZFwiOiB0aGlzLmlzRXhjbHVkZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjogdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tc2VsZWN0aW5nLXJhbmdlXCI6IHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnREYXkoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXdlZWtlbmRcIjogdGhpcy5pc1dlZWtlbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLW91dHNpZGUtbW9udGhcIjpcbiAgICAgICAgICB0aGlzLmlzQWZ0ZXJNb250aCgpIHx8IHRoaXMuaXNCZWZvcmVNb250aCgpLFxuICAgICAgfSxcbiAgICAgIHRoaXMuZ2V0SGlnaExpZ2h0ZWRDbGFzcyhcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIiksXG4gICAgICB0aGlzLmdldEhvbGlkYXlzQ2xhc3MoKSxcbiAgICApO1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCA9IFwiQ2hvb3NlXCIsXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQgPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQoKSB8fCB0aGlzLmlzRXhjbHVkZWQoKVxuICAgICAgICA/IGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZFxuICAgICAgICA6IGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkO1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHtmb3JtYXREYXRlKGRheSwgXCJQUFBQXCIsIHRoaXMucHJvcHMubG9jYWxlKX1gO1xuICB9O1xuXG4gIC8vIEEgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBob2xpZGF5J3MgbmFtZSBhcyB0aXRsZSdzIGNvbnRlbnRcbiAgZ2V0VGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzID0gbmV3IE1hcCgpLCBleGNsdWRlRGF0ZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29tcGFyZUR0ID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICBjb25zdCB0aXRsZXMgPSBbXTtcbiAgICBpZiAoaG9saWRheXMuaGFzKGNvbXBhcmVEdCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKC4uLmhvbGlkYXlzLmdldChjb21wYXJlRHQpLmhvbGlkYXlOYW1lcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRXhjbHVkZWQoKSkge1xuICAgICAgdGl0bGVzLnB1c2goXG4gICAgICAgIGV4Y2x1ZGVEYXRlc1xuICAgICAgICAgID8uZmlsdGVyKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICAgIGlzU2FtZURheShleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlLCBkYXkpLFxuICAgICAgICAgIClcbiAgICAgICAgICAubWFwKChleGNsdWRlRGF0ZSkgPT4gZXhjbHVkZURhdGUubWVzc2FnZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGVzLmpvaW4oXCIsIFwiKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChzZWxlY3RlZCwgcHJlU2VsZWN0aW9uKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSBzZWxlY3RlZCB8fCB0aGlzLnByb3BzLnNlbGVjdGVkO1xuICAgIGNvbnN0IHByZVNlbGVjdGlvbkRheSA9IHByZVNlbGVjdGlvbiB8fCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhKFxuICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgICAgICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyIHx8ICF0aGlzLmlzU3RhcnRPZldlZWsoKSlcbiAgICAgICkgJiZcbiAgICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAgICh0aGlzLmlzU2FtZURheShzZWxlY3RlZERheSkgJiZcbiAgICAgICAgICBpc1NhbWVEYXkocHJlU2VsZWN0aW9uRGF5LCBzZWxlY3RlZERheSkpKVxuICAgICAgICA/IDBcbiAgICAgICAgOiAtMTtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgZGF5XG4gIC8vIGZvY3VzIHRoZSBkYXkgb24gbW91bnQvdXBkYXRlIHNvIHRoYXQga2V5Ym9hcmQgbmF2aWdhdGlvbiB3b3JrcyB3aGlsZSBjeWNsaW5nIHRocm91Z2ggbW9udGhzIHdpdGggdXAgb3IgZG93biBrZXlzIChub3QgZm9yIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9ucylcbiAgLy8gcHJldmVudCBmb2N1cyBmb3IgdGhlc2UgYWN0aXZlRWxlbWVudCBjYXNlcyBzbyB3ZSBkb24ndCBwdWxsIGZvY3VzIGZyb20gdGhlIGlucHV0IGFzIHRoZSBjYWxlbmRhciBvcGVuc1xuICBoYW5kbGVGb2N1c0RheSA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICB0aGlzLmlzU2FtZURheSh0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBpbmxpbmUgdmVyc2lvbjpcbiAgICAgIC8vIGRvIG5vdCBmb2N1cyBvbiBpbml0aWFsIHJlbmRlciB0byBwcmV2ZW50IGF1dG9Gb2N1cyBpc3N1ZVxuICAgICAgLy8gZm9jdXMgYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQgdmlhIGtleWJvYXJkXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmUpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIERheVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIilcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvL2RheSBpcyBvbmUgb2YgdGhlIG5vbiByZW5kZXJlZCBkdXBsaWNhdGUgZGF5c1xuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgJiYgdGhpcy5pc0FmdGVyTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzRGF5ICYmIHRoaXMuZGF5RWwuY3VycmVudD8uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlckRheUNvbnRlbnRzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ICYmIHRoaXMuaXNCZWZvcmVNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHNcbiAgICAgID8gdGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50cyhnZXREYXRlKHRoaXMucHJvcHMuZGF5KSwgdGhpcy5wcm9wcy5kYXkpXG4gICAgICA6IGdldERhdGUodGhpcy5wcm9wcy5kYXkpO1xuICB9O1xuXG4gIHJlbmRlciA9ICgpID0+IChcbiAgICA8ZGl2XG4gICAgICByZWY9e3RoaXMuZGF5RWx9XG4gICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcyh0aGlzLnByb3BzLmRheSl9XG4gICAgICBvbktleURvd249e3RoaXMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKCl9XG4gICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgIHRpdGxlPXt0aGlzLmdldFRpdGxlKCl9XG4gICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWQoKX1cbiAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnREYXkoKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkKCkgfHwgdGhpcy5pc0luUmFuZ2UoKX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJEYXlDb250ZW50cygpfVxuICAgICAge3RoaXMuZ2V0VGl0bGUoKSAhPT0gXCJcIiAmJiAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm92ZXJsYXlcIj57dGhpcy5nZXRUaXRsZSgpfTwvc3Bhbj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vla051bWJlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhcmlhTGFiZWxQcmVmaXg6IFwid2VlayBcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB3ZWVrTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihFbGVtZW50KSB9KSxcbiAgICBdKSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNXZWVrTnVtYmVyKHByZXZQcm9wcyk7XG4gIH1cblxuICB3ZWVrTnVtYmVyRWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+XG4gICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAhaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgZ2V0VGFiSW5kZXggPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyICYmXG4gICAgKHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCkgfHxcbiAgICAgIChpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHRoaXMucHJvcHMuc2VsZWN0ZWQpKSlcbiAgICAgID8gMFxuICAgICAgOiAtMTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgd2Vlay1udW1iZXJcbiAgLy8gZm9jdXMgdGhlIHdlZWstbnVtYmVyIG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNXZWVrTnVtYmVyID0gKHByZXZQcm9wcyA9IHt9KSA9PiB7XG4gICAgbGV0IHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlIGFjdGl2ZUVsZW1lbnQgaXMgaW4gdGhlIGNvbnRhaW5lciwgYW5kIGl0IGlzIGFub3RoZXIgaW5zdGFuY2Ugb2YgV2Vla051bWJlclxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCIsXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzV2Vla051bWJlciAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudCAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2Vla051bWJlciwgYXJpYUxhYmVsUHJlZml4ID0gXCJ3ZWVrIFwiLCBvbkNsaWNrIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyLS1jbGlja2FibGVcIjogISFvbkNsaWNrLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tc2VsZWN0ZWRcIjpcbiAgICAgICAgISFvbkNsaWNrICYmIGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17dGhpcy53ZWVrTnVtYmVyRWx9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xzeCh3ZWVrTnVtYmVyQ2xhc3Nlcyl9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2FyaWFMYWJlbFByZWZpeH0gJHt0aGlzLnByb3BzLndlZWtOdW1iZXJ9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgID5cbiAgICAgICAge3dlZWtOdW1iZXJ9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgRGF5IGZyb20gXCIuL2RheVwiO1xuaW1wb3J0IFdlZWtOdW1iZXIgZnJvbSBcIi4vd2Vla19udW1iZXJcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuXG5pbXBvcnQgeyBhZGREYXlzLCBnZXRXZWVrLCBnZXRTdGFydE9mV2VlaywgaXNTYW1lRGF5IH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWVrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgfTtcbiAgfVxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVXZWVrQ2xpY2sgPSAoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICB0aGlzLmhhbmRsZURheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXRXZWVrTnVtYmVyID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKGRhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0V2VlayhkYXRlKTtcbiAgfTtcblxuICByZW5kZXJEYXlzID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gdGhpcy5zdGFydE9mV2VlaygpO1xuICAgIGNvbnN0IGRheXMgPSBbXTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyID0gdGhpcy5mb3JtYXRXZWVrTnVtYmVyKHN0YXJ0T2ZXZWVrKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcikge1xuICAgICAgY29uc3Qgb25DbGlja0FjdGlvbiA9XG4gICAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgICAgICA/IHRoaXMuaGFuZGxlV2Vla0NsaWNrLmJpbmQodGhpcywgc3RhcnRPZldlZWssIHdlZWtOdW1iZXIpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBkYXlzLnB1c2goXG4gICAgICAgIDxXZWVrTnVtYmVyXG4gICAgICAgICAga2V5PVwiV1wiXG4gICAgICAgICAgd2Vla051bWJlcj17d2Vla051bWJlcn1cbiAgICAgICAgICBkYXRlPXtzdGFydE9mV2Vla31cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQWN0aW9ufVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcn1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgIC8+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAga2V5PXtkYXkudmFsdWVPZigpfVxuICAgICAgICAgICAgZGF5PXtkYXl9XG4gICAgICAgICAgICBtb250aD17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2suYmluZCh0aGlzLCBkYXkpfVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIHN0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMuc3RhcnRPZldlZWsoKSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB3ZWVrTnVtYmVyQ2xhc3NlcyA9IHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1wiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1zZWxlY3RlZFwiOiBpc1NhbWVEYXkoXG4gICAgICAgIHRoaXMuc3RhcnRPZldlZWsoKSxcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfT57dGhpcy5yZW5kZXJEYXlzKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBXZWVrIGZyb20gXCIuL3dlZWtcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQgPSA2O1xuXG5jb25zdCBNT05USF9DT0xVTU5TX0xBWU9VVCA9IHtcbiAgVFdPX0NPTFVNTlM6IFwidHdvX2NvbHVtbnNcIixcbiAgVEhSRUVfQ09MVU1OUzogXCJ0aHJlZV9jb2x1bW5zXCIsXG4gIEZPVVJfQ09MVU1OUzogXCJmb3VyX2NvbHVtbnNcIixcbn07XG5jb25zdCBNT05USF9DT0xVTU5TID0ge1xuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzIsIDNdLFxuICAgICAgWzQsIDVdLFxuICAgICAgWzYsIDddLFxuICAgICAgWzgsIDldLFxuICAgICAgWzEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDIsXG4gIH0sXG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyXSxcbiAgICAgIFszLCA0LCA1XSxcbiAgICAgIFs2LCA3LCA4XSxcbiAgICAgIFs5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAzLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuRk9VUl9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyLCAzXSxcbiAgICAgIFs0LCA1LCA2LCA3XSxcbiAgICAgIFs4LCA5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiA0LFxuICB9LFxufTtcbmNvbnN0IE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQgPSAxO1xuXG5mdW5jdGlvbiBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuKSB7XG4gIGlmIChzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcikgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OUztcbiAgaWYgKHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5UV09fQ09MVU1OUztcbiAgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULlRIUkVFX0NPTFVNTlM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb3JkZXJJbkRpc3BsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25Nb250aEtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIE1PTlRIX1JFRlMgPSBbLi4uQXJyYXkoMTIpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuICBRVUFSVEVSX1JFRlMgPSBbLi4uQXJyYXkoNCldLm1hcCgoKSA9PiBSZWFjdC5jcmVhdGVSZWYoKSk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQsIHRoaXMucHJvcHMub3JkZXJJbkRpc3BsYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKCk7XG4gICAgfVxuICB9O1xuXG4gIGlzUmFuZ2VTdGFydE1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aCh1dGlscy5zZXRNb250aChkYXksIG0pLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VTdGFydFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQgPSAobSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aCA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKCEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fCAhc2VsZWN0aW5nRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1dlZWtJbk1vbnRoID0gKHN0YXJ0T2ZXZWVrKSA9PiB7XG4gICAgY29uc3QgZGF5ID0gdGhpcy5wcm9wcy5kYXk7XG4gICAgY29uc3QgZW5kT2ZXZWVrID0gdXRpbHMuYWRkRGF5cyhzdGFydE9mV2VlaywgNik7XG4gICAgcmV0dXJuIChcbiAgICAgIHV0aWxzLmlzU2FtZU1vbnRoKHN0YXJ0T2ZXZWVrLCBkYXkpIHx8IHV0aWxzLmlzU2FtZU1vbnRoKGVuZE9mV2VlaywgZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50TW9udGggPSAoZGF5LCBtKSA9PlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcih1dGlscy5uZXdEYXRlKCkpICYmXG4gICAgbSA9PT0gdXRpbHMuZ2V0TW9udGgodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc0N1cnJlbnRRdWFydGVyID0gKGRheSwgcSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIHEgPT09IHV0aWxzLmdldFF1YXJ0ZXIodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoZGF5LCBtLCBzZWxlY3RlZCkgPT5cbiAgICB1dGlscy5nZXRNb250aChzZWxlY3RlZCkgPT09IG0gJiZcbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIoc2VsZWN0ZWQpO1xuXG4gIGlzU2VsZWN0ZWRRdWFydGVyID0gKGRheSwgcSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0UXVhcnRlcihkYXkpID09PSBxICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICByZW5kZXJXZWVrcyA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrcyA9IFtdO1xuICAgIHZhciBpc0ZpeGVkSGVpZ2h0ID0gdGhpcy5wcm9wcy5maXhlZEhlaWdodDtcblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgYnJlYWtBZnRlck5leHRQdXNoID0gZmFsc2U7XG4gICAgbGV0IGN1cnJlbnRXZWVrU3RhcnQgPSB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgIHV0aWxzLmdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRheSksXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICApXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQ7XG5cbiAgICBjb25zdCBwcmVTZWxlY3Rpb24gPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB3ZWVrcy5wdXNoKFxuICAgICAgICA8V2Vla1xuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRheT17Y3VycmVudFdlZWtTdGFydH1cbiAgICAgICAgICBtb250aD17dXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpfVxuICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3ByZVNlbGVjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAvPixcbiAgICAgICk7XG5cbiAgICAgIGlmIChicmVha0FmdGVyTmV4dFB1c2gpIGJyZWFrO1xuXG4gICAgICBpKys7XG4gICAgICBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuYWRkV2Vla3MoY3VycmVudFdlZWtTdGFydCwgMSk7XG5cbiAgICAgIC8vIElmIG9uZSBvZiB0aGVzZSBjb25kaXRpb25zIGlzIHRydWUsIHdlIHdpbGwgZWl0aGVyIGJyZWFrIG9uIHRoaXMgd2Vla1xuICAgICAgLy8gb3IgYnJlYWsgb24gdGhlIG5leHQgd2Vla1xuICAgICAgY29uc3QgaXNGaXhlZEFuZEZpbmFsV2VlayA9XG4gICAgICAgIGlzRml4ZWRIZWlnaHQgJiYgaSA+PSBGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVDtcbiAgICAgIGNvbnN0IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoID1cbiAgICAgICAgIWlzRml4ZWRIZWlnaHQgJiYgIXRoaXMuaXNXZWVrSW5Nb250aChjdXJyZW50V2Vla1N0YXJ0KTtcblxuICAgICAgaWYgKGlzRml4ZWRBbmRGaW5hbFdlZWsgfHwgaXNOb25GaXhlZEFuZE91dE9mTW9udGgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGVla05leHRNb250aCkge1xuICAgICAgICAgIGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gd2Vla3M7XG4gIH07XG5cbiAgb25Nb250aENsaWNrID0gKGUsIG0pID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aCh0aGlzLnByb3BzLmRheSwgbSk7XG5cbiAgICBpZiAodXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpLCBlKTtcbiAgfTtcblxuICBvbk1vbnRoTW91c2VFbnRlciA9IChtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVNb250aE5hdmlnYXRpb24gPSAobmV3TW9udGgsIG5ld0RhdGUpID0+IHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudCAmJlxuICAgICAgdGhpcy5NT05USF9SRUZTW25ld01vbnRoXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25Nb250aEtleURvd24gPSAoZXZlbnQsIG1vbnRoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWQsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNldFByZVNlbGVjdGlvbixcbiAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSAhPT0gXCJUYWJcIikge1xuICAgICAgLy8gcHJldmVudERlZmF1bHQgb24gdGFiIGV2ZW50IGJsb2NrcyBmb2N1cyBjaGFuZ2VcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IG1vbnRoQ29sdW1uc0xheW91dCA9IGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICApO1xuICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQgPVxuICAgICAgICBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0udmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0O1xuICAgICAgY29uc3QgbW9udGhzR3JpZCA9IE1PTlRIX0NPTFVNTlNbbW9udGhDb2x1bW5zTGF5b3V0XS5ncmlkO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldmVudCwgbW9udGgpO1xuICAgICAgICAgIHNldFByZVNlbGVjdGlvbihzZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VULFxuICAgICAgICAgICAgdXRpbHMuYWRkTW9udGhzKHByZVNlbGVjdGlvbiwgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLnN1Yk1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBtb250aCBvbiB0aGUgZmlyc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkWzBdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoICsgMTIgLSB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoIC0gdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGxhc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkW21vbnRoc0dyaWQubGVuZ3RoIC0gMV0uaW5jbHVkZXMobW9udGgpXG4gICAgICAgICAgICAgID8gbW9udGggLSAxMiArIHZlcnRpY2FsT2Zmc2V0XG4gICAgICAgICAgICAgIDogbW9udGggKyB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIHZlcnRpY2FsT2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duICYmIGhhbmRsZU9uTW9udGhLZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBvblF1YXJ0ZXJDbGljayA9IChlLCBxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2sodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25RdWFydGVyTW91c2VFbnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mUXVhcnRlcihsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiA9IChuZXdRdWFydGVyLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLlFVQVJURVJfUkVGU1tuZXdRdWFydGVyIC0gMV0uY3VycmVudCAmJlxuICAgICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBvblF1YXJ0ZXJLZXlEb3duID0gKGV2ZW50LCBxdWFydGVyKSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXZlbnQsIHF1YXJ0ZXIpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlUXVhcnRlck5hdmlnYXRpb24oXG4gICAgICAgICAgICBxdWFydGVyID09PSA0ID8gMSA6IHF1YXJ0ZXIgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkUXVhcnRlcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gMSA/IDQgOiBxdWFydGVyIC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBnZXRNb250aENsYXNzTmFtZXMgPSAobSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgbW9udGhDbGFzc05hbWUsXG4gICAgICBleGNsdWRlRGF0ZXMsXG4gICAgICBpbmNsdWRlRGF0ZXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoQ2xhc3NOYW1lID0gbW9udGhDbGFzc05hbWVcbiAgICAgID8gbW9udGhDbGFzc05hbWUodXRpbHMuc2V0TW9udGgoZGF5LCBtKSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19tb250aC0ke219YCxcbiAgICAgIF9tb250aENsYXNzTmFtZSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcykgJiZcbiAgICAgICAgICB1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRNb250aChcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgbSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBwcmVTZWxlY3Rpb24pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0taW4tcmFuZ2VcIjogdXRpbHMuaXNNb250aEluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgbSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnRNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFRhYkluZGV4ID0gKG0pID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZE1vbnRoID0gdXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIG0gPT09IHByZVNlbGVjdGVkTW9udGhcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRRdWFydGVyVGFiSW5kZXggPSAocSkgPT4ge1xuICAgIGNvbnN0IHByZVNlbGVjdGVkUXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIHEgPT09IHByZVNlbGVjdGVkUXVhcnRlclxuICAgICAgICA/IFwiMFwiXG4gICAgICAgIDogXCItMVwiO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9IChtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeCA9IFwiQ2hvb3NlXCIsXG4gICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCA9IFwiTm90IGF2YWlsYWJsZVwiLFxuICAgICAgZGF5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtb250aCk7XG4gICAgY29uc3QgcHJlZml4ID1cbiAgICAgIHRoaXMuaXNEaXNhYmxlZChsYWJlbERhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChsYWJlbERhdGUpXG4gICAgICAgID8gZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXhcbiAgICAgICAgOiBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSAke3V0aWxzLmZvcm1hdERhdGUobGFiZWxEYXRlLCBcIk1NTU0geXl5eVwiKX1gO1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJDbGFzc05hbWVzID0gKHEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLSR7cX1gLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBxLFxuICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzUXVhcnRlckluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgcSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNSYW5nZVN0YXJ0UXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmRRdWFydGVyKHEpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldE1vbnRoQ29udGVudCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBzaG93RnVsbE1vbnRoWWVhclBpY2tlciwgcmVuZGVyTW9udGhDb250ZW50LCBsb2NhbGUsIGRheSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvcnRNb250aFRleHQgPSB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBjb25zdCBmdWxsTW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShtLCBsb2NhbGUpO1xuICAgIGlmIChyZW5kZXJNb250aENvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNb250aENvbnRlbnQobSwgc2hvcnRNb250aFRleHQsIGZ1bGxNb250aFRleHQsIGRheSk7XG4gICAgfVxuICAgIHJldHVybiBzaG93RnVsbE1vbnRoWWVhclBpY2tlciA/IGZ1bGxNb250aFRleHQgOiBzaG9ydE1vbnRoVGV4dDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ29udGVudCA9IChxKSA9PiB7XG4gICAgY29uc3QgeyByZW5kZXJRdWFydGVyQ29udGVudCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0UXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlKHEsIGxvY2FsZSk7XG4gICAgcmV0dXJuIHJlbmRlclF1YXJ0ZXJDb250ZW50XG4gICAgICA/IHJlbmRlclF1YXJ0ZXJDb250ZW50KHEsIHNob3J0UXVhcnRlcilcbiAgICAgIDogc2hvcnRRdWFydGVyO1xuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBzZWxlY3RlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1vbnRoQ29sdW1ucyA9XG4gICAgICBNT05USF9DT0xVTU5TW1xuICAgICAgICBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgKVxuICAgICAgXS5ncmlkO1xuICAgIHJldHVybiBtb250aENvbHVtbnMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC13cmFwcGVyXCIga2V5PXtpfT5cbiAgICAgICAge21vbnRoLm1hcCgobSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17dGhpcy5NT05USF9SRUZTW21dfVxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25Nb250aENsaWNrKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhLZXlEb3duKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vbk1vbnRoTW91c2VFbnRlcihtKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleChtKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRNb250aENsYXNzTmFtZXMobSl9XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKG0pfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudE1vbnRoKGRheSwgbSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgc2VsZWN0ZWQpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldE1vbnRoQ29udGVudChtKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJRdWFydGVycyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcXVhcnRlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci13cmFwcGVyXCI+XG4gICAgICAgIHtxdWFydGVycy5tYXAoKHEsIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICByZWY9e3RoaXMuUVVBUlRFUl9SRUZTW2pdfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJDbGljayhldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJLZXlEb3duKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFF1YXJ0ZXJDbGFzc05hbWVzKHEpfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHNlbGVjdGVkKX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFF1YXJ0ZXJUYWJJbmRleChxKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRRdWFydGVyKGRheSwgcSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRRdWFydGVyQ29udGVudChxKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0aW5nRGF0ZSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgc2hvd1dlZWtQaWNrZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhcIixcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQpLFxuICAgICAgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFBpY2tlclwiOiBzaG93TW9udGhZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlclBpY2tlclwiOiBzaG93UXVhcnRlclllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrUGlja2VyXCI6IHNob3dXZWVrUGlja2VyIH0sXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIGRheSxcbiAgICAgIGFyaWFMYWJlbFByZWZpeCA9IFwiTW9udGggXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXggPSBhcmlhTGFiZWxQcmVmaXhcbiAgICAgID8gYXJpYUxhYmVsUHJlZml4LnRyaW0oKSArIFwiIFwiXG4gICAgICA6IFwiXCI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2Zvcm1hdHRlZEFyaWFMYWJlbFByZWZpeH0ke3V0aWxzLmZvcm1hdERhdGUoZGF5LCBcIk1NTU0sIHl5eXlcIil9YH1cbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgPlxuICAgICAgICB7c2hvd01vbnRoWWVhclBpY2tlclxuICAgICAgICAgID8gdGhpcy5yZW5kZXJNb250aHMoKVxuICAgICAgICAgIDogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgICA/IHRoaXMucmVuZGVyUXVhcnRlcnMoKVxuICAgICAgICAgICAgOiB0aGlzLnJlbmRlcldlZWtzKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge1xuICBnZXRIb3VycyxcbiAgZ2V0TWludXRlcyxcbiAgbmV3RGF0ZSxcbiAgZ2V0U3RhcnRPZkRheSxcbiAgYWRkTWludXRlcyxcbiAgZm9ybWF0RGF0ZSxcbiAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlLFxuICBpc1RpbWVEaXNhYmxlZCxcbiAgdGltZXNUb0luamVjdEFmdGVyLFxuICBnZXRIb3Vyc0luRGF5LFxuICBpc1NhbWVNaW51dGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcnZhbHM6IDMwLFxuICAgICAgb25UaW1lQ2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHRvZGF5QnV0dG9uOiBudWxsLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgY2FsY0NlbnRlclBvc2l0aW9uID0gKGxpc3RIZWlnaHQsIGNlbnRlckxpUmVmKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNlbnRlckxpUmVmLm9mZnNldFRvcCAtIChsaXN0SGVpZ2h0IC8gMiAtIGNlbnRlckxpUmVmLmNsaWVudEhlaWdodCAvIDIpXG4gICAgKTtcbiAgfTtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhSZWY6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaGVpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIGNvZGUgdG8gZW5zdXJlIHNlbGVjdGVkIHRpbWUgd2lsbCBhbHdheXMgYmUgaW4gZm9jdXMgd2l0aGluIHRpbWUgd2luZG93IHdoZW4gaXQgZmlyc3QgYXBwZWFyc1xuICAgIHRoaXMuc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFJlZiAmJiB0aGlzLmhlYWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSA9ICgpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybjtcblxuICAgICAgdGhpcy5saXN0LnNjcm9sbFRvcCA9XG4gICAgICAgIHRoaXMuY2VudGVyTGkgJiZcbiAgICAgICAgVGltZS5jYWxjQ2VudGVyUG9zaXRpb24oXG4gICAgICAgICAgdGhpcy5wcm9wcy5tb250aFJlZlxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm1vbnRoUmVmLmNsaWVudEhlaWdodCAtIHRoaXMuaGVhZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmxpc3QuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIHRoaXMuY2VudGVyTGksXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAodGltZSkgPT4ge1xuICAgIGlmIChcbiAgICAgICgodGhpcy5wcm9wcy5taW5UaW1lIHx8IHRoaXMucHJvcHMubWF4VGltZSkgJiZcbiAgICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmluY2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRpbWUpO1xuICB9O1xuXG4gIGlzU2VsZWN0ZWRUaW1lID0gKHRpbWUpID0+XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJiBpc1NhbWVNaW51dGUodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGltZSk7XG5cbiAgaXNEaXNhYmxlZFRpbWUgPSAodGltZSkgPT5cbiAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgdGhpcy5wcm9wcykpIHx8XG4gICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyVGltZSkgJiZcbiAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKTtcblxuICBsaUNsYXNzZXMgPSAodGltZSkgPT4ge1xuICAgIGxldCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbVwiLFxuICAgICAgdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lID8gdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lKHRpbWUpIDogdW5kZWZpbmVkLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0tZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgLy9jb252ZXJ0IHRoaXMucHJvcHMuaW50ZXJ2YWxzIGFuZCB0aGUgcmVsZXZhbnQgdGltZSB0byBzZWNvbmRzIGFuZCBjaGVjayBpZiBpdCBpdCdzIGEgY2xlYW4gbXVsdGlwbGUgb2YgdGhlIGludGVydmFsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgKGdldEhvdXJzKHRpbWUpICogMzYwMCArIGdldE1pbnV0ZXModGltZSkgKiA2MCArIGdldFNlY29uZHModGltZSkpICVcbiAgICAgICAgKHRoaXMucHJvcHMuaW50ZXJ2YWxzICogNjApICE9PVxuICAgICAgICAwXG4gICAgKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0taW5qZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50LCB0aW1lKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmcuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICB0aGlzLmhhbmRsZUNsaWNrKHRpbWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgcmVuZGVyVGltZXMgPSAoKSA9PiB7XG4gICAgbGV0IHRpbWVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQgPyB0aGlzLnByb3BzLmZvcm1hdCA6IFwicFwiO1xuICAgIGNvbnN0IGludGVydmFscyA9IHRoaXMucHJvcHMuaW50ZXJ2YWxzO1xuXG4gICAgY29uc3QgYWN0aXZlRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkIHx8IHRoaXMucHJvcHMub3BlblRvRGF0ZSB8fCBuZXdEYXRlKCk7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0U3RhcnRPZkRheShhY3RpdmVEYXRlKTtcbiAgICBjb25zdCBzb3J0ZWRJbmplY3RUaW1lcyA9XG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzICYmXG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtaW51dGVzSW5EYXkgPSA2MCAqIGdldEhvdXJzSW5EYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IG1pbnV0ZXNJbkRheSAvIGludGVydmFscztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlwbGllcjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGFkZE1pbnV0ZXMoYmFzZSwgaSAqIGludGVydmFscyk7XG4gICAgICB0aW1lcy5wdXNoKGN1cnJlbnRUaW1lKTtcblxuICAgICAgaWYgKHNvcnRlZEluamVjdFRpbWVzKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzVG9JbmplY3QgPSB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gICAgICAgICAgYmFzZSxcbiAgICAgICAgICBjdXJyZW50VGltZSxcbiAgICAgICAgICBpLFxuICAgICAgICAgIGludGVydmFscyxcbiAgICAgICAgICBzb3J0ZWRJbmplY3RUaW1lcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGltZXMgPSB0aW1lcy5jb25jYXQodGltZXNUb0luamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHRpbWUgdG8gZm9jdXMgYW5kIHNjcm9sbCBpbnRvIHZpZXcgd2hlbiBjb21wb25lbnQgbW91bnRzXG4gICAgY29uc3QgdGltZVRvRm9jdXMgPSB0aW1lcy5yZWR1Y2UoKHByZXYsIHRpbWUpID0+IHtcbiAgICAgIGlmICh0aW1lLmdldFRpbWUoKSA8PSBhY3RpdmVEYXRlLmdldFRpbWUoKSkge1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRpbWVzWzBdKTtcblxuICAgIHJldHVybiB0aW1lcy5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGltZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmxpQ2xhc3Nlcyh0aW1lKX1cbiAgICAgICAgICByZWY9eyhsaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWUgPT09IHRpbWVUb0ZvY3VzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VudGVyTGkgPSBsaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9uS2V5RG93bihldiwgdGltZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGltZSA9PT0gdGltZVRvRm9jdXMgPyAwIDogLTF9XG4gICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtmb3JtYXREYXRlKHRpbWUsIGZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lciAke1xuICAgICAgICAgIHRoaXMucHJvcHMudG9kYXlCdXR0b25cbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lci0td2l0aC10b2RheS1idXR0b25cIlxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZSAke1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZS0tb25seVwiXG4gICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgIH1gfVxuICAgICAgICAgIHJlZj17KGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19oZWFkZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWJveFwiPlxuICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdFwiXG4gICAgICAgICAgICAgIHJlZj17KGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBzdHlsZT17aGVpZ2h0ID8geyBoZWlnaHQgfSA6IHt9fVxuICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVzKCl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGdldFllYXIsIG5ld0RhdGUgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xlYXJTZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIFlFQVJfUkVGUyA9IFsuLi5BcnJheSh0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyKV0ubWFwKCgpID0+XG4gICAgUmVhY3QuY3JlYXRlUmVmKCksXG4gICk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBzZWxlY3RpbmdEYXRlID0gKCkgPT4gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gIHVwZGF0ZUZvY3VzT25QYWdpbmF0ZSA9IChyZWZJbmRleCkgPT4ge1xuICAgIGNvbnN0IHdhaXRGb3JSZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuWUVBUl9SRUZTW3JlZkluZGV4XS5jdXJyZW50LmZvY3VzKCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh3YWl0Rm9yUmVSZW5kZXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVZZWFyTmF2aWdhdGlvbiA9IChuZXdZZWFyLCBuZXdEYXRlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChkYXRlLCB5ZWFySXRlbU51bWJlcik7XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuXG4gICAgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA9PT0gLTEpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gICAgfSBlbHNlIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IHllYXJJdGVtTnVtYmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSgwKTtcbiAgICB9IGVsc2UgdGhpcy5ZRUFSX1JFRlNbbmV3WWVhciAtIHN0YXJ0UGVyaW9kXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKHksIG90aGVyKSA9PiB1dGlscy5pc1NhbWVEYXkoeSwgb3RoZXIpO1xuXG4gIGlzQ3VycmVudFllYXIgPSAoeSkgPT4geSA9PT0gZ2V0WWVhcihuZXdEYXRlKCkpO1xuXG4gIGlzUmFuZ2VTdGFydCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuc3RhcnREYXRlKTtcblxuICBpc1JhbmdlRW5kID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luUmFuZ2UgPSAoeSkgPT5cbiAgICB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZSA9ICh5KSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fFxuICAgICAgIXRoaXMuc2VsZWN0aW5nRGF0ZSgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5zZWxlY3RpbmdEYXRlKCksIGVuZERhdGUpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlU3RhcnQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKHkpID0+IHtcbiAgICBjb25zdCBkYXRlID0gdXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcih0aGlzLnByb3BzLmRhdGUsIHkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnNlbGVjdGVkKSkgJiZcbiAgICAgIHV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbikpXG4gICAgKTtcbiAgfTtcblxuICBvblllYXJDbGljayA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuaGFuZGxlWWVhckNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpLCBlKTtcbiAgfTtcblxuICBvblllYXJLZXlEb3duID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGtleSB9ID0gZTtcbiAgICBjb25zdCB7IGhhbmRsZU9uS2V5RG93biB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vblllYXJDbGljayhlLCB5KTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSArIDEsXG4gICAgICAgICAgICB1dGlscy5hZGRZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5IC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5RG93biAmJiBoYW5kbGVPbktleURvd24oZSk7XG4gIH07XG5cbiAgZ2V0WWVhckNsYXNzTmFtZXMgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGUsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgICAgZmlsdGVyRGF0ZSxcbiAgICAgIHllYXJDbGFzc05hbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci0ke3l9YCxcbiAgICAgIHllYXJDbGFzc05hbWUgPyB5ZWFyQ2xhc3NOYW1lKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpIDogdW5kZWZpbmVkLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0ZWRcIjogeSA9PT0gZ2V0WWVhcihzZWxlY3RlZCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcyB8fCBmaWx0ZXJEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzWWVhckRpc2FibGVkKHksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudFllYXIoeSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0WWVhclRhYkluZGV4ID0gKHkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikgcmV0dXJuIFwiLTFcIjtcbiAgICBjb25zdCBwcmVTZWxlY3RlZCA9IHV0aWxzLmdldFllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHkgPT09IHByZVNlbGVjdGVkID8gXCIwXCIgOiBcIi0xXCI7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RpbmdEYXRlLCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsc3goXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyXCIsIHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSksXG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRlbnQgPSAoeSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50ID8gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCh5KSA6IHk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHllYXJzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIsIG9uWWVhck1vdXNlRW50ZXIsIG9uWWVhck1vdXNlTGVhdmUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBkYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcblxuICAgIGZvciAobGV0IHkgPSBzdGFydFBlcmlvZDsgeSA8PSBlbmRQZXJpb2Q7IHkrKykge1xuICAgICAgeWVhcnNMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3RoaXMuWUVBUl9SRUZTW3kgLSBzdGFydFBlcmlvZF19XG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGV2LmtleSA9IFwiRW50ZXJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblllYXJLZXlEb3duKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFllYXJUYWJJbmRleCh5KX1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNsYXNzTmFtZXMoeSl9XG4gICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e3l9XG4gICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFllYXIoeSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLmdldFllYXJDb250ZW50KHkpfVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcygpfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItd3JhcHBlclwiXG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICB7eWVhcnNMaXN0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW5wdXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdGltZVN0cmluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpbWU6IHRoaXMucHJvcHMudGltZVN0cmluZyxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICBpZiAocHJvcHMudGltZVN0cmluZyAhPT0gc3RhdGUudGltZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGltZTogcHJvcHMudGltZVN0cmluZyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIG51bGwgdG8gaW5kaWNhdGUgbm8gY2hhbmdlIHRvIHN0YXRlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25UaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdGltZSB9KTtcblxuICAgIGNvbnN0IHsgZGF0ZTogcHJvcERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNQcm9wRGF0ZVZhbGlkID0gcHJvcERhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihwcm9wRGF0ZSk7XG4gICAgY29uc3QgZGF0ZSA9IGlzUHJvcERhdGVWYWxpZCA/IHByb3BEYXRlIDogbmV3IERhdGUoKTtcblxuICAgIGRhdGUuc2V0SG91cnModGltZS5zcGxpdChcIjpcIilbMF0pO1xuICAgIGRhdGUuc2V0TWludXRlcyh0aW1lLnNwbGl0KFwiOlwiKVsxXSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGRhdGUpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkYXRlLCB0aW1lU3RyaW5nLCBjdXN0b21UaW1lSW5wdXQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY3VzdG9tVGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbVRpbWVJbnB1dCwge1xuICAgICAgICBkYXRlLFxuICAgICAgICB2YWx1ZTogdGltZSxcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMub25UaW1lQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGltZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlRpbWVcIlxuICAgICAgICBuYW1lPVwidGltZS1pbnB1dFwiXG4gICAgICAgIHJlcXVpcmVkXG4gICAgICAgIHZhbHVlPXt0aW1lfVxuICAgICAgICBvbkNoYW5nZT17KGV2KSA9PiB7XG4gICAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoZXYudGFyZ2V0LnZhbHVlIHx8IHRpbWVTdHJpbmcpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19pbnB1dC10aW1lLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9fY2FwdGlvblwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZUlucHV0KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhckNvbnRhaW5lcih7XG4gIHNob3dUaW1lU2VsZWN0T25seSA9IGZhbHNlLFxuICBzaG93VGltZSA9IGZhbHNlLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufSkge1xuICBsZXQgYXJpYUxhYmVsID0gc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgPyBcIkNob29zZSBUaW1lXCJcbiAgICA6IGBDaG9vc2UgRGF0ZSR7c2hvd1RpbWUgPyBcIiBhbmQgVGltZVwiIDogXCJcIn1gO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkNhbGVuZGFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd1RpbWU6IFByb3BUeXBlcy5ib29sLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbn07XG4iLCJpbXBvcnQgWWVhckRyb3Bkb3duIGZyb20gXCIuL3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aERyb3Bkb3duIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoIGZyb20gXCIuL21vbnRoXCI7XG5pbXBvcnQgVGltZSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgWWVhciBmcm9tIFwiLi95ZWFyXCI7XG5pbXBvcnQgSW5wdXRUaW1lIGZyb20gXCIuL2lucHV0VGltZVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgQ2FsZW5kYXJDb250YWluZXIgZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBzZXRNb250aCxcbiAgZ2V0TW9udGgsXG4gIGFkZE1vbnRocyxcbiAgc3ViTW9udGhzLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0U3RhcnRPZlRvZGF5LFxuICBhZGREYXlzLFxuICBmb3JtYXREYXRlLFxuICBzZXRZZWFyLFxuICBnZXRZZWFyLFxuICBpc0JlZm9yZSxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0FmdGVyLFxuICBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlLFxuICBnZXRXZWVrZGF5TWluSW5Mb2NhbGUsXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIG1vbnRoRGlzYWJsZWRCZWZvcmUsXG4gIG1vbnRoRGlzYWJsZWRBZnRlcixcbiAgeWVhckRpc2FibGVkQmVmb3JlLFxuICB5ZWFyRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQmVmb3JlLFxuICBxdWFydGVyRGlzYWJsZWRCZWZvcmUsXG4gIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBhZGRaZXJvLFxuICBpc1ZhbGlkLFxuICBnZXRZZWFyc1BlcmlvZCxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBnZXRNb250aEluTG9jYWxlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMgPSBbXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiLFxuXTtcblxuY29uc3QgaXNEcm9wZG93blNlbGVjdCA9IChlbGVtZW50ID0ge30pID0+IHtcbiAgY29uc3QgY2xhc3NOYW1lcyA9IChlbGVtZW50LmNsYXNzTmFtZSB8fCBcIlwiKS5zcGxpdCgvXFxzKy8pO1xuICByZXR1cm4gRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUy5zb21lKFxuICAgICh0ZXN0Q2xhc3NuYW1lKSA9PiBjbGFzc05hbWVzLmluZGV4T2YodGVzdENsYXNzbmFtZSkgPj0gMCxcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uRHJvcGRvd25Gb2N1czogKCkgPT4ge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKVxuICAgICAgLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKSxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtb250aFNlbGVjdGVkSW46IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRyb3Bkb3duRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uVGltZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uRGF5S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5jb250YWluZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRlOiB0aGlzLmdldERhdGVJblZpZXcoKSxcbiAgICAgIHNlbGVjdGluZ0RhdGU6IG51bGwsXG4gICAgICBtb250aENvbnRhaW5lcjogbnVsbCxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gbW9udGhDb250YWluZXIgaGVpZ2h0IGlzIG5lZWRlZCBpbiB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHRvIGRldGVybWluZSB0aGUgaGVpZ2h0IGZvciB0aGUgdWwgaW4gdGhlIHRpbWUgY29tcG9uZW50XG4gICAgLy8gc2V0U3RhdGUgaGVyZSBzbyBoZWlnaHQgaXMgZ2l2ZW4gYWZ0ZXIgZmluYWwgY29tcG9uZW50XG4gICAgLy8gbGF5b3V0IGlzIHJlbmRlcmVkXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuYXNzaWduTW9udGhDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhDb250YWluZXI6IHRoaXMubW9udGhDb250YWluZXIgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbiAmJlxuICAgICAgKCFpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHByZXZQcm9wcy5wcmVTZWxlY3Rpb24pIHx8XG4gICAgICAgIHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluICE9PSBwcmV2UHJvcHMubW9udGhTZWxlY3RlZEluKVxuICAgICkge1xuICAgICAgY29uc3QgaGFzTW9udGhDaGFuZ2VkID0gIWlzU2FtZU1vbnRoKFxuICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gaGFzTW9udGhDaGFuZ2VkICYmIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZSAmJlxuICAgICAgIWlzU2FtZURheSh0aGlzLnByb3BzLm9wZW5Ub0RhdGUsIHByZXZQcm9wcy5vcGVuVG9EYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGU6IHRoaXMucHJvcHMub3BlblRvRGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICB9O1xuXG4gIHNldENsaWNrT3V0c2lkZVJlZiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGlzRHJvcGRvd25TZWxlY3QoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0ZUluVmlldyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByZVNlbGVjdGlvbiwgc2VsZWN0ZWQsIG9wZW5Ub0RhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld0RhdGUoKTtcbiAgICBjb25zdCBpbml0aWFsRGF0ZSA9IG9wZW5Ub0RhdGUgfHwgc2VsZWN0ZWQgfHwgcHJlU2VsZWN0aW9uO1xuICAgIGlmIChpbml0aWFsRGF0ZSkge1xuICAgICAgcmV0dXJuIGluaXRpYWxEYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWluRGF0ZSAmJiBpc0JlZm9yZShjdXJyZW50LCBtaW5EYXRlKSkge1xuICAgICAgICByZXR1cm4gbWluRGF0ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBpc0FmdGVyKGN1cnJlbnQsIG1heERhdGUpKSB7XG4gICAgICAgIHJldHVybiBtYXhEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfTtcblxuICBpbmNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZE1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgZGVjcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IGRheSB9KTtcbiAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgICB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUoKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VFbnRlciA9IChldmVudCwgeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBzZXRZZWFyKG5ld0RhdGUoKSwgeWVhcikgfSk7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VMZWF2ZSA9IChldmVudCwgeWVhcikgPT4ge1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZShldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uWWVhckNoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb250aENoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW9udGhZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgdGhpcy5oYW5kbGVNb250aENoYW5nZShkYXRlKTtcbiAgfTtcblxuICBjaGFuZ2VZZWFyID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKGRhdGUsIHllYXIpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0TW9udGgoZGF0ZSwgbW9udGgpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aFllYXIgPSAobW9udGhZZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihzZXRNb250aChkYXRlLCBnZXRNb250aChtb250aFllYXIpKSwgZ2V0WWVhcihtb250aFllYXIpKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aFllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhlYWRlciA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSBnZXRTdGFydE9mV2VlayhcbiAgICAgIGRhdGUsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3QgZGF5TmFtZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnMpIHtcbiAgICAgIGRheU5hbWVzLnB1c2goXG4gICAgICAgIDxkaXYga2V5PVwiV1wiIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMud2Vla0xhYmVsIHx8IFwiI1wifVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5TmFtZXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIGNvbnN0IHdlZWtEYXlOYW1lID0gdGhpcy5mb3JtYXRXZWVrZGF5KGRheSwgdGhpcy5wcm9wcy5sb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IHdlZWtEYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWVcbiAgICAgICAgICA/IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZShkYXkpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e29mZnNldH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCIsIHdlZWtEYXlDbGFzc05hbWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt3ZWVrRGF5TmFtZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgZm9ybWF0V2Vla2RheSA9IChkYXksIGxvY2FsZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXkpIHtcbiAgICAgIHJldHVybiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF5LCB0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXksIGxvY2FsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3BzLnVzZVdlZWtkYXlzU2hvcnRcbiAgICAgID8gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF5LCBsb2NhbGUpXG4gICAgICA6IGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXksIGxvY2FsZSk7XG4gIH07XG5cbiAgZGVjcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHN1YlllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNsZWFyU2VsZWN0aW5nRGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgfTtcblxuICByZW5kZXJQcmV2aW91c0J1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYWxsUHJldkRheXNEaXNhYmxlZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhckRpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSBxdWFydGVyRGlzYWJsZWRCZWZvcmUoXG4gICAgICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxQcmV2RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91cy0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwsIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qge1xuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBwcmV2aW91c1llYXJBcmlhTGFiZWwgOiBwcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgaW5jcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZFllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck5leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbE5leHREYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHF1YXJ0ZXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHRcIixcbiAgICBdO1xuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10aW1lXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy50b2RheUJ1dHRvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10b2RheS1idXR0b25cIik7XG4gICAgfVxuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxOZXh0RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IG5leHRNb250aEJ1dHRvbkxhYmVsLCBuZXh0WWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0TW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0WWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IG5leHRZZWFyQXJpYUxhYmVsIDogbmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckN1cnJlbnRNb250aCA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGhcIl07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aERyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICB7Zm9ybWF0RGF0ZShkYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8WWVhckRyb3Bkb3duXG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9XG4gICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHllYXI9e2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aERyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRofVxuICAgICAgICBtb250aD17Z2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoWWVhckRyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVRvZGF5QnV0dG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZ2V0U3RhcnRPZlRvZGF5KCksIGUpO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGdldFN0YXJ0T2ZUb2RheSgpKTtcbiAgfTtcblxuICByZW5kZXJUb2RheUJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMudG9kYXlCdXR0b24gfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdG9kYXktYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlVG9kYXlCdXR0b25DbGljayhlKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRlZmF1bHRIZWFkZXIgPSAoeyBtb250aERhdGUsIGkgfSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciAke1xuICAgICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0XG4gICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0taGFzLXRpbWUtc2VsZWN0XCJcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlckN1cnJlbnRNb250aChtb250aERhdGUpfVxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24tLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aERyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aFllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckN1c3RvbUhlYWRlciA9IChoZWFkZXJBcmdzID0ge30pID0+IHtcbiAgICBjb25zdCB7IG1vbnRoRGF0ZSwgaSB9ID0gaGVhZGVyQXJncztcblxuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmICF0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgcHJldlllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHNob3dEYXlOYW1lcyA9XG4gICAgICAhdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tY3VzdG9tXCJcbiAgICAgICAgb25Gb2N1cz17dGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcih7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICBjdXN0b21IZWFkZXJDb3VudDogaSxcbiAgICAgICAgICBtb250aERhdGUsXG4gICAgICAgICAgY2hhbmdlTW9udGg6IHRoaXMuY2hhbmdlTW9udGgsXG4gICAgICAgICAgY2hhbmdlWWVhcjogdGhpcy5jaGFuZ2VZZWFyLFxuICAgICAgICAgIGRlY3JlYXNlTW9udGg6IHRoaXMuZGVjcmVhc2VNb250aCxcbiAgICAgICAgICBpbmNyZWFzZU1vbnRoOiB0aGlzLmluY3JlYXNlTW9udGgsXG4gICAgICAgICAgZGVjcmVhc2VZZWFyOiB0aGlzLmRlY3JlYXNlWWVhcixcbiAgICAgICAgICBpbmNyZWFzZVllYXI6IHRoaXMuaW5jcmVhc2VZZWFyLFxuICAgICAgICAgIHByZXZNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIHByZXZZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dFllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgfSl9XG4gICAgICAgIHtzaG93RGF5TmFtZXMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckhlYWRlciA9ICh7IG1vbnRoRGF0ZSB9KSA9PiB7XG4gICAgY29uc3QgeyBzaG93WWVhclBpY2tlciwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIG1vbnRoRGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXIteWVhci1oZWFkZXJcIj5cbiAgICAgICAge3Nob3dZZWFyUGlja2VyID8gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YCA6IGdldFllYXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyID0gKGhlYWRlckFyZ3MpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIgIT09IHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ3VzdG9tSGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyWWVhckhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRlZmF1bHRIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoTGlzdCA9IFtdO1xuICAgIGNvbnN0IG1vbnRoc1RvU3VidHJhY3QgPSB0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc1xuICAgICAgPyB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMVxuICAgICAgOiAwO1xuICAgIGNvbnN0IGZyb21Nb250aERhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgID8gYWRkWWVhcnModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KVxuICAgICAgICA6IHN1Yk1vbnRocyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpO1xuICAgIGNvbnN0IG1vbnRoU2VsZWN0ZWRJbiA9IHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluID8/IG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vbnRoc1RvQWRkID0gaSAtIG1vbnRoU2VsZWN0ZWRJbiArIG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgICBjb25zdCBtb250aERhdGUgPVxuICAgICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgICA/IGFkZFllYXJzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKVxuICAgICAgICAgIDogYWRkTW9udGhzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKTtcbiAgICAgIGNvbnN0IG1vbnRoS2V5ID0gYG1vbnRoLSR7aX1gO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgPSBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDE7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ID0gaSA+IDA7XG4gICAgICBtb250aExpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17bW9udGhLZXl9XG4gICAgICAgICAgcmVmPXsoZGl2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoQ29udGFpbmVyID0gZGl2O1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtY29udGFpbmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZSwgaSB9KX1cbiAgICAgICAgICA8TW9udGhcbiAgICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgICAgIGRheT17bW9udGhEYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbkRheUtleURvd259XG4gICAgICAgICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICAgIG9yZGVySW5EaXNwbGF5PXtpfVxuICAgICAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbW9udGhMaXN0O1xuICB9O1xuXG4gIHJlbmRlclllYXJzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGU6IHRoaXMuc3RhdGUuZGF0ZSB9KX1cbiAgICAgICAgICA8WWVhclxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW5nRGF0ZT17dGhpcy5jbGVhclNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLmhhbmRsZVllYXJNb3VzZUxlYXZlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyVGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgKHRoaXMuc3RhdGUubW9udGhDb250YWluZXIgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGltZVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICAgIGZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgICAgaW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgICAgbW9udGhSZWY9e3RoaXMuc3RhdGUubW9udGhDb250YWluZXJ9XG4gICAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dFRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lVmFsaWQgPSBpc1ZhbGlkKHRpbWUpICYmIEJvb2xlYW4odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVN0cmluZyA9IHRpbWVWYWxpZFxuICAgICAgPyBgJHthZGRaZXJvKHRpbWUuZ2V0SG91cnMoKSl9OiR7YWRkWmVybyh0aW1lLmdldE1pbnV0ZXMoKSl9YFxuICAgICAgOiBcIlwiO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnB1dFRpbWVcbiAgICAgICAgICBkYXRlPXt0aW1lfVxuICAgICAgICAgIHRpbWVTdHJpbmc9e3RpbWVTdHJpbmd9XG4gICAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YDtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gZ2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtnZXRNb250aEluTG9jYWxlKFxuICAgICAgICBnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICl9ICR7Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIGFyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNoaWxkcmVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2NoaWxkcmVuLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBDb250YWluZXIgPSB0aGlzLnByb3BzLmNvbnRhaW5lciB8fCBDYWxlbmRhckNvbnRhaW5lcjtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImNvbnRlbnRzXCIgfX0gcmVmPXt0aGlzLmNvbnRhaW5lclJlZn0+XG4gICAgICAgIDxDb250YWluZXJcbiAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXCJyZWFjdC1kYXRlcGlja2VyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXItLXRpbWUtb25seVwiOiB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBzaG93VGltZT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyUHJldmlvdXNCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJOZXh0QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTW9udGhzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyWWVhcnMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUb2RheUJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5jb25zdCBDYWxlbmRhckljb24gPSAoeyBpY29uLCBjbGFzc05hbWUgPSBcIlwiLCBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgZGVmYXVsdENsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyX19jYWxlbmRhci1pY29uXCI7XG5cbiAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGljb24pKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChpY29uLCB7XG4gICAgICBjbGFzc05hbWU6IGAke2ljb24ucHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJ9ICR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gLFxuICAgICAgb25DbGljazogKGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpY29uLnByb3BzLm9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGljb24ucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb25DbGljayhlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaWNvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8aVxuICAgICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtpY29ufSAke2NsYXNzTmFtZX1gfVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBTVkcgSWNvblxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gfVxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIlxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICA+XG4gICAgICA8cGF0aCBkPVwiTTk2IDMyVjY0SDQ4QzIxLjUgNjQgMCA4NS41IDAgMTEydjQ4SDQ0OFYxMTJjMC0yNi41LTIxLjUtNDgtNDgtNDhIMzUyVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjY0SDE2MFYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMlM5NiAxNC4zIDk2IDMyek00NDggMTkySDBWNDY0YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4SDQwMGMyNi41IDAgNDgtMjEuNSA0OC00OFYxOTJ6XCIgLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbkNhbGVuZGFySWNvbi5wcm9wVHlwZXMgPSB7XG4gIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWxlbmRhckljb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290ID0gKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudCkuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0aGlzLnByb3BzLnBvcnRhbElkLFxuICAgICk7XG4gICAgaWYgKCF0aGlzLnBvcnRhbFJvb3QpIHtcbiAgICAgIHRoaXMucG9ydGFsUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aGlzLnBvcnRhbFJvb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpcy5wcm9wcy5wb3J0YWxJZCk7XG4gICAgICAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHRoaXMucG9ydGFsUm9vdCk7XG4gICAgfVxuICAgIHRoaXMucG9ydGFsUm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdC5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3RET00uY3JlYXRlUG9ydGFsKHRoaXMucHJvcHMuY2hpbGRyZW4sIHRoaXMuZWwpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbi8vIFRhYkxvb3AgcHJldmVudHMgdGhlIHVzZXIgZnJvbSB0YWJiaW5nIG91dHNpZGUgb2YgdGhlIHBvcHBlclxuLy8gSXQgY3JlYXRlcyBhIHRhYmluZGV4IGxvb3Agc28gdGhhdCBcIlRhYlwiIG9uIHRoZSBsYXN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudFxuLy8gYW5kIFwiU2hpZnQgVGFiXCIgb24gdGhlIGZpcnN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgbGFzdCBlbGVtZW50XG5cbmNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPVxuICBcIlt0YWJpbmRleF0sIGEsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIjtcbmNvbnN0IGZvY3VzYWJsZUZpbHRlciA9IChub2RlKSA9PiAhbm9kZS5kaXNhYmxlZCAmJiBub2RlLnRhYkluZGV4ICE9PSAtMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiTG9vcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy50YWJMb29wUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gIH1cblxuICAvLyBxdWVyeSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzXG4gIC8vIHRyaW0gZmlyc3QgYW5kIGxhc3QgYmVjYXVzZSB0aGV5IGFyZSB0aGUgZm9jdXMgZ3VhcmRzXG4gIGdldFRhYkNoaWxkcmVuID0gKCkgPT5cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKFxuICAgICAgICB0aGlzLnRhYkxvb3BSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IpLFxuICAgICAgICAxLFxuICAgICAgICAtMSxcbiAgICAgIClcbiAgICAgIC5maWx0ZXIoZm9jdXNhYmxlRmlsdGVyKTtcblxuICBoYW5kbGVGb2N1c1N0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmXG4gICAgICB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmXG4gICAgICB0YWJDaGlsZHJlblt0YWJDaGlsZHJlbi5sZW5ndGggLSAxXS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUZvY3VzRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiYgdGFiQ2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcFwiIHJlZj17dGhpcy50YWJMb29wUmVmfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19zdGFydFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzU3RhcnR9XG4gICAgICAgIC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX2VuZFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzRW5kfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgdXNlRmxvYXRpbmcsXG4gIGFycm93LFxuICBvZmZzZXQsXG4gIGZsaXAsXG4gIGF1dG9VcGRhdGUsXG59IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyA9IFtcbiAgXCJ0b3Atc3RhcnRcIixcbiAgXCJ0b3AtZW5kXCIsXG4gIFwiYm90dG9tLXN0YXJ0XCIsXG4gIFwiYm90dG9tLWVuZFwiLFxuICBcInJpZ2h0LXN0YXJ0XCIsXG4gIFwicmlnaHQtZW5kXCIsXG4gIFwibGVmdC1zdGFydFwiLFxuICBcImxlZnQtZW5kXCIsXG4gIFwidG9wXCIsXG4gIFwicmlnaHRcIixcbiAgXCJib3R0b21cIixcbiAgXCJsZWZ0XCIsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoRmxvYXRpbmcoQ29tcG9uZW50KSB7XG4gIGNvbnN0IFdpdGhGbG9hdGluZyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IGFsdF9wcm9wcyA9IHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgcG9wcGVyTW9kaWZpZXJzOiBwcm9wcy5wb3BwZXJNb2RpZmllcnMgfHwgW10sXG4gICAgICBwb3BwZXJQcm9wczogcHJvcHMucG9wcGVyUHJvcHMgfHwge30sXG4gICAgICBoaWRlUG9wcGVyOlxuICAgICAgICB0eXBlb2YgcHJvcHMuaGlkZVBvcHBlciA9PT0gXCJib29sZWFuXCIgPyBwcm9wcy5oaWRlUG9wcGVyIDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGFycm93UmVmID0gUmVhY3QudXNlUmVmKCk7XG4gICAgY29uc3QgZmxvYXRpbmdQcm9wcyA9IHVzZUZsb2F0aW5nKHtcbiAgICAgIG9wZW46ICFhbHRfcHJvcHMuaGlkZVBvcHBlcixcbiAgICAgIHdoaWxlRWxlbWVudHNNb3VudGVkOiBhdXRvVXBkYXRlLFxuICAgICAgcGxhY2VtZW50OiBhbHRfcHJvcHMucG9wcGVyUGxhY2VtZW50LFxuICAgICAgbWlkZGxld2FyZTogW1xuICAgICAgICBmbGlwKHsgcGFkZGluZzogMTUgfSksXG4gICAgICAgIG9mZnNldCgxMCksXG4gICAgICAgIGFycm93KHsgZWxlbWVudDogYXJyb3dSZWYgfSksXG4gICAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJNb2RpZmllcnMsXG4gICAgICBdLFxuICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlclByb3BzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgey4uLmFsdF9wcm9wc30gcG9wcGVyUHJvcHM9e3sgLi4uZmxvYXRpbmdQcm9wcywgYXJyb3dSZWYgfX0gLz5cbiAgICApO1xuICB9O1xuXG4gIFdpdGhGbG9hdGluZy5wcm9wVHlwZXMgPSB7XG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSxcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHJldHVybiBXaXRoRmxvYXRpbmc7XG59XG4iLCJpbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IEZsb2F0aW5nQXJyb3cgfSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgVGFiTG9vcCBmcm9tIFwiLi90YWJfbG9vcFwiO1xuaW1wb3J0IFBvcnRhbCBmcm9tIFwiLi9wb3J0YWxcIjtcbmltcG9ydCB3aXRoRmxvYXRpbmcgZnJvbSBcIi4vd2l0aF9mbG9hdGluZ1wiO1xuXG4vLyBFeHBvcnRlZCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuZXhwb3J0IGNsYXNzIFBvcHBlckNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoaWRlUG9wcGVyOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlckNvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0YXJnZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlck9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0Fycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgd3JhcHBlckNsYXNzTmFtZSxcbiAgICAgIGhpZGVQb3BwZXIsXG4gICAgICBwb3BwZXJDb21wb25lbnQsXG4gICAgICB0YXJnZXRDb21wb25lbnQsXG4gICAgICBlbmFibGVUYWJMb29wLFxuICAgICAgcG9wcGVyT25LZXlEb3duLFxuICAgICAgcG9ydGFsSWQsXG4gICAgICBwb3J0YWxIb3N0LFxuICAgICAgcG9wcGVyUHJvcHMsXG4gICAgICBzaG93QXJyb3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQgcG9wcGVyO1xuXG4gICAgaWYgKCFoaWRlUG9wcGVyKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xzeChcInJlYWN0LWRhdGVwaWNrZXItcG9wcGVyXCIsIGNsYXNzTmFtZSk7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e2VuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRGbG9hdGluZ31cbiAgICAgICAgICAgIHN0eWxlPXtwb3BwZXJQcm9wcy5mbG9hdGluZ1N0eWxlc31cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlc31cbiAgICAgICAgICAgIGRhdGEtcGxhY2VtZW50PXtwb3BwZXJQcm9wcy5wbGFjZW1lbnR9XG4gICAgICAgICAgICBvbktleURvd249e3BvcHBlck9uS2V5RG93bn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9wcGVyQ29tcG9uZW50fVxuICAgICAgICAgICAge3Nob3dBcnJvdyAmJiAoXG4gICAgICAgICAgICAgIDxGbG9hdGluZ0Fycm93XG4gICAgICAgICAgICAgICAgcmVmPXtwb3BwZXJQcm9wcy5hcnJvd1JlZn1cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtwb3BwZXJQcm9wcy5jb250ZXh0fVxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIGhlaWdodD17OH1cbiAgICAgICAgICAgICAgICB3aWR0aD17MTZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTFweClcIiB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RyaWFuZ2xlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvVGFiTG9vcD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyKSB7XG4gICAgICBwb3BwZXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyLCB7fSwgcG9wcGVyKTtcbiAgICB9XG5cbiAgICBpZiAocG9ydGFsSWQgJiYgIWhpZGVQb3BwZXIpIHtcbiAgICAgIHBvcHBlciA9IChcbiAgICAgICAgPFBvcnRhbCBwb3J0YWxJZD17cG9ydGFsSWR9IHBvcnRhbEhvc3Q9e3BvcnRhbEhvc3R9PlxuICAgICAgICAgIHtwb3BwZXJ9XG4gICAgICAgIDwvUG9ydGFsPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXdyYXBwZXJcIiwgd3JhcHBlckNsYXNzTmFtZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8ZGl2IHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRSZWZlcmVuY2V9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzZXN9PlxuICAgICAgICAgIHt0YXJnZXRDb21wb25lbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cG9wcGVyfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhGbG9hdGluZyhQb3BwZXJDb21wb25lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gXCIuL2NhbGVuZGFyXCI7XG5pbXBvcnQgQ2FsZW5kYXJJY29uIGZyb20gXCIuL2NhbGVuZGFyX2ljb25cIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgUG9wcGVyQ29tcG9uZW50IGZyb20gXCIuL3BvcHBlcl9jb21wb25lbnRcIjtcbmltcG9ydCB7IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyB9IGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHsgc2V0IH0gZnJvbSBcImRhdGUtZm5zL3NldFwiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBpc0RhdGUsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBpc0VxdWFsLFxuICBzZXRUaW1lLFxuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgYWRkRGF5cyxcbiAgYWRkTW9udGhzLFxuICBhZGRXZWVrcyxcbiAgc3ViRGF5cyxcbiAgc3ViTW9udGhzLFxuICBzdWJXZWVrcyxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGdldEVmZmVjdGl2ZU1pbkRhdGUsXG4gIGdldEVmZmVjdGl2ZU1heERhdGUsXG4gIHBhcnNlRGF0ZSxcbiAgc2FmZURhdGVGb3JtYXQsXG4gIHNhZmVEYXRlUmFuZ2VGb3JtYXQsXG4gIGdldEhpZ2h0TGlnaHREYXlzTWFwLFxuICBnZXRZZWFyLFxuICBnZXRNb250aCxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldEVuZE9mV2VlayxcbiAgcmVnaXN0ZXJMb2NhbGUsXG4gIHNldERlZmF1bHRMb2NhbGUsXG4gIGdldERlZmF1bHRMb2NhbGUsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgaXNTYW1lRGF5LFxuICBpc01vbnRoRGlzYWJsZWQsXG4gIGlzWWVhckRpc2FibGVkLFxuICBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCxcbiAgZ2V0SG9saWRheXNNYXAsXG4gIGlzRGF0ZUJlZm9yZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYWxlbmRhckNvbnRhaW5lciB9IGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuXG5leHBvcnQgeyByZWdpc3RlckxvY2FsZSwgc2V0RGVmYXVsdExvY2FsZSwgZ2V0RGVmYXVsdExvY2FsZSB9O1xuXG5jb25zdCBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlci1pZ25vcmUtb25jbGlja291dHNpZGVcIjtcbmNvbnN0IFdyYXBwZWRDYWxlbmRhciA9IG9uQ2xpY2tPdXRzaWRlKENhbGVuZGFyKTtcblxuLy8gQ29tcGFyZXMgZGF0ZXMgeWVhcittb250aCBjb21iaW5hdGlvbnNcbmZ1bmN0aW9uIGhhc1ByZVNlbGVjdGlvbkNoYW5nZWQoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiAoXG4gICAgICBnZXRNb250aChkYXRlMSkgIT09IGdldE1vbnRoKGRhdGUyKSB8fCBnZXRZZWFyKGRhdGUxKSAhPT0gZ2V0WWVhcihkYXRlMilcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGRhdGUxICE9PSBkYXRlMjtcbn1cblxuLyoqXG4gKiBHZW5lcmFsIGRhdGVwaWNrZXIgY29tcG9uZW50LlxuICovXG5jb25zdCBJTlBVVF9FUlJfMSA9IFwiRGF0ZSBpbnB1dCBub3QgdmFsaWQuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVQaWNrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWxsb3dTYW1lRGF5OiBmYWxzZSxcbiAgICAgIGRhdGVGb3JtYXQ6IFwiTU0vZGQveXl5eVwiLFxuICAgICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBcIkxMTEwgeXl5eVwiLFxuICAgICAgb25DaGFuZ2UoKSB7fSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgIGRyb3Bkb3duTW9kZTogXCJzY3JvbGxcIixcbiAgICAgIG9uRm9jdXMoKSB7fSxcbiAgICAgIG9uQmx1cigpIHt9LFxuICAgICAgb25LZXlEb3duKCkge30sXG4gICAgICBvbklucHV0Q2xpY2soKSB7fSxcbiAgICAgIG9uU2VsZWN0KCkge30sXG4gICAgICBvbkNsaWNrT3V0c2lkZSgpIHt9LFxuICAgICAgb25Nb250aENoYW5nZSgpIHt9LFxuICAgICAgb25DYWxlbmRhck9wZW4oKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJDbG9zZSgpIHt9LFxuICAgICAgcHJldmVudE9wZW5PbkZvY3VzOiBmYWxzZSxcbiAgICAgIG9uWWVhckNoYW5nZSgpIHt9LFxuICAgICAgb25JbnB1dEVycm9yKCkge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgIHdpdGhQb3J0YWw6IGZhbHNlLFxuICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IGZhbHNlLFxuICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICAgIHNob3dUaW1lU2VsZWN0OiBmYWxzZSxcbiAgICAgIHNob3dUaW1lSW5wdXQ6IGZhbHNlLFxuICAgICAgc2hvd1ByZXZpb3VzTW9udGhzOiBmYWxzZSxcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93WWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1dlZWtQaWNrZXI6IGZhbHNlLFxuICAgICAgc3RyaWN0UGFyc2luZzogZmFsc2UsXG4gICAgICBzd2FwUmFuZ2U6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsczogMzAsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgdGltZUlucHV0TGFiZWw6IFwiVGltZVwiLFxuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyOiBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gICAgICBmb2N1c1NlbGVjdGVkTW9udGg6IGZhbHNlLFxuICAgICAgc2hvd1BvcHBlckFycm93OiB0cnVlLFxuICAgICAgZXhjbHVkZVNjcm9sbGJhcjogdHJ1ZSxcbiAgICAgIGN1c3RvbVRpbWVJbnB1dDogbnVsbCxcbiAgICAgIGNhbGVuZGFyU3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IGZhbHNlLFxuICAgICAgdXNlUG9pbnRlckV2ZW50OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGFsbG93U2FtZURheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYXJpYURlc2NyaWJlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFJbnZhbGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbENsb3NlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbGxlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFSZXF1aXJlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbG9zZU9uU2Nyb2xsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGN1c3RvbUlucHV0UmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSksXG4gICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICBdKSxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgICBjYWxlbmRhckljb25DbGFzc25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZVJhdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dEVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNhbGVuZGFyT3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DYWxlbmRhckNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwbGFjZWhvbGRlclRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHByZXZlbnRPcGVuT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3RQYXJzaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzd2FwUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHN0YXJ0T3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFiSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEYXRlU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGNsZWFyQnV0dG9uVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xlYXJCdXR0b25DbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdyYXBwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93UG9wcGVyQXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNhbGNJbml0aWFsU3RhdGUoKTtcbiAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAoXG4gICAgICBwcmV2UHJvcHMuaW5saW5lICYmXG4gICAgICBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKHByZXZQcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwcmV2UHJvcHMubW9udGhzU2hvd24gIT09IHRoaXMucHJvcHMubW9udGhzU2hvd25cbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IDAgfSk7XG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMuaGlnaGxpZ2h0RGF0ZXMgIT09IHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoaWdobGlnaHREYXRlczogZ2V0SGlnaHRMaWdodERheXNNYXAodGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcyksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgIXByZXZTdGF0ZS5mb2N1c2VkICYmXG4gICAgICAhaXNFcXVhbChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJldlN0YXRlLm9wZW4gIT09IHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLm9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyT3BlbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldlN0YXRlLm9wZW4gPT09IHRydWUgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJDbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBnZXRQcmVTZWxlY3Rpb24gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZVxuICAgICAgPyB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzRW5kICYmIHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgID8gdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNTdGFydCAmJiB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA/IHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgIDogbmV3RGF0ZSgpO1xuXG4gIC8vIENvbnZlcnQgdGhlIGRhdGUgZnJvbSBzdHJpbmcgZm9ybWF0IHRvIHN0YW5kYXJkIERhdGUgZm9ybWF0XG4gIG1vZGlmeUhvbGlkYXlzID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLmhvbGlkYXlzPy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBob2xpZGF5KSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoaG9saWRheS5kYXRlKTtcbiAgICAgIGlmICghaXNWYWxpZChkYXRlKSkge1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbLi4uYWNjdW11bGF0b3IsIHsgLi4uaG9saWRheSwgZGF0ZSB9XTtcbiAgICB9LCBbXSk7XG5cbiAgY2FsY0luaXRpYWxTdGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UHJlU2VsZWN0aW9uID0gdGhpcy5nZXRQcmVTZWxlY3Rpb24oKTtcbiAgICBjb25zdCBtaW5EYXRlID0gZ2V0RWZmZWN0aXZlTWluRGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBtYXhEYXRlID0gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBib3VuZGVkUHJlU2VsZWN0aW9uID1cbiAgICAgIG1pbkRhdGUgJiYgaXNCZWZvcmUoZGVmYXVsdFByZVNlbGVjdGlvbiwgc3RhcnRPZkRheShtaW5EYXRlKSlcbiAgICAgICAgPyBtaW5EYXRlXG4gICAgICAgIDogbWF4RGF0ZSAmJiBpc0FmdGVyKGRlZmF1bHRQcmVTZWxlY3Rpb24sIGVuZE9mRGF5KG1heERhdGUpKVxuICAgICAgICAgID8gbWF4RGF0ZVxuICAgICAgICAgIDogZGVmYXVsdFByZVNlbGVjdGlvbjtcbiAgICByZXR1cm4ge1xuICAgICAgb3BlbjogdGhpcy5wcm9wcy5zdGFydE9wZW4gfHwgZmFsc2UsXG4gICAgICBwcmV2ZW50Rm9jdXM6IGZhbHNlLFxuICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkKSA/PyBib3VuZGVkUHJlU2VsZWN0aW9uLFxuICAgICAgLy8gdHJhbnNmb3JtaW5nIGhpZ2hsaWdodGVkIGRheXMgKHBlcmhhcHMgbmVzdGVkIGFycmF5KVxuICAgICAgLy8gdG8gZmxhdCBNYXAgZm9yIGZhc3RlciBhY2Nlc3MgaW4gZGF5LmpzeFxuICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAvLyB1c2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvbiBhZnRlciBtb250aCBoYXMgY2hhbmdlZCwgYnV0IG5vdCBvblxuICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9O1xuXG4gIGNsZWFyUHJldmVudEZvY3VzVGltZW91dCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0Rm9jdXMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5mb2N1cykge1xuICAgICAgdGhpcy5pbnB1dC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNldEJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5ibHVyKSB7XG4gICAgICB0aGlzLmlucHV0LmJsdXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBzZXRPcGVuID0gKG9wZW4sIHNraXBTZXRCbHVyID0gZmFsc2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBvcGVuOiBvcGVuLFxuICAgICAgICBwcmVTZWxlY3Rpb246XG4gICAgICAgICAgb3BlbiAmJiB0aGlzLnN0YXRlLm9wZW5cbiAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb25cbiAgICAgICAgICAgIDogdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCkucHJlU2VsZWN0aW9uLFxuICAgICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICghb3Blbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgZm9jdXNlZDogc2tpcFNldEJsdXIgPyBwcmV2LmZvY3VzZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAhc2tpcFNldEJsdXIgJiYgdGhpcy5zZXRCbHVyKCk7XG5cbiAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbiAgaW5wdXRPayA9ICgpID0+IGlzRGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG5cbiAgaXNDYWxlbmRhck9wZW4gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlbiA9PT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuc3RhdGUub3BlbiAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seVxuICAgICAgOiB0aGlzLnByb3BzLm9wZW47XG5cbiAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUucHJldmVudEZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1cyAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiB0cnVlIH0pO1xuICB9O1xuXG4gIHNlbmRGb2N1c0JhY2tUb0lucHV0ID0gKCkgPT4ge1xuICAgIC8vIENsZWFyIHByZXZpb3VzIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgdGhpcy5jbGVhclByZXZlbnRGb2N1c1RpbWVvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBjbG9zZSB0aGUgcG9wcGVyIGFuZCByZWZvY3VzIHRoZSBpbnB1dFxuICAgIC8vIHN0b3AgdGhlIGlucHV0IGZyb20gYXV0byBvcGVuaW5nIG9uRm9jdXNcbiAgICAvLyBzZXRGb2N1cyB0byB0aGUgaW5wdXRcbiAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiB0cnVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJldmVudEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IGZhbHNlIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2FuY2VsRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5pbnB1dEZvY3VzVGltZW91dCk7XG4gICAgdGhpcy5pbnB1dEZvY3VzVGltZW91dCA9IG51bGw7XG4gIH07XG5cbiAgZGVmZXJGb2N1c0lucHV0ID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0Rm9jdXMoKSwgMSk7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLm9wZW4gfHwgdGhpcy5wcm9wcy53aXRoUG9ydGFsIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmYWxzZSB9KTtcbiAgfTtcblxuICBoYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICguLi5hbGxBcmdzKSA9PiB7XG4gICAgbGV0IGV2ZW50ID0gYWxsQXJnc1swXTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdy5hcHBseSh0aGlzLCBhbGxBcmdzKTtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVULFxuICAgIH0pO1xuICAgIGxldCBkYXRlID0gcGFyc2VEYXRlKFxuICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLnN0cmljdFBhcnNpbmcsXG4gICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgKTtcbiAgICAvLyBVc2UgZGF0ZSBmcm9tIGBzZWxlY3RlZGAgcHJvcCB3aGVuIG1hbmlwdWxhdGluZyBvbmx5IHRpbWUgZm9yIGlucHV0IHZhbHVlXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiZcbiAgICAgIGRhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkoZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIGRhdGUgPSBzZXQodGhpcy5wcm9wcy5zZWxlY3RlZCwge1xuICAgICAgICBob3VyczogZ2V0SG91cnMoZGF0ZSksXG4gICAgICAgIG1pbnV0ZXM6IGdldE1pbnV0ZXMoZGF0ZSksXG4gICAgICAgIHNlY29uZHM6IGdldFNlY29uZHMoZGF0ZSksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGUgfHwgIWV2ZW50LnRhcmdldC52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdCA9IChkYXRlLCBldmVudCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgLy8gUHJldmVudGluZyBvbkZvY3VzIGV2ZW50IHRvIGZpeCBpc3N1ZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0hhY2tlcjB4MDEvcmVhY3QtZGF0ZXBpY2tlci9pc3N1ZXMvNjI4XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgZmFsc2UsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgIWlzRGF0ZUJlZm9yZShkYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHNldFNlbGVjdGVkID0gKGRhdGUsIGV2ZW50LCBrZWVwSW5wdXQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IGRhdGU7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICBpc1llYXJEaXNhYmxlZChnZXRZZWFyKGNoYW5nZWREYXRlKSwgdGhpcy5wcm9wcylcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIpIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc01vbnRoRGlzYWJsZWQoY2hhbmdlZERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsICYmIGlzRGF5RGlzYWJsZWQoY2hhbmdlZERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSxcbiAgICAgIHNlbGVjdHNSYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RzTXVsdGlwbGUsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgICAgbWluVGltZSxcbiAgICAgIHN3YXBSYW5nZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICFpc0VxdWFsKHRoaXMucHJvcHMuc2VsZWN0ZWQsIGNoYW5nZWREYXRlKSB8fFxuICAgICAgdGhpcy5wcm9wcy5hbGxvd1NhbWVEYXkgfHxcbiAgICAgIHNlbGVjdHNSYW5nZSB8fFxuICAgICAgc2VsZWN0c011bHRpcGxlXG4gICAgKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiZcbiAgICAgICAgICAoIWtlZXBJbnB1dCB8fFxuICAgICAgICAgICAgKCF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICBob3VyOiBnZXRIb3Vycyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIG1pbnV0ZTogZ2V0TWludXRlcyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIHNlY29uZDogZ2V0U2Vjb25kcyh0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG1pblRpbWUgaXMgcHJlc2VudCB0aGVuIHNldCB0aGUgdGltZSB0byBtaW5UaW1lXG4gICAgICAgIGlmIChcbiAgICAgICAgICAha2VlcElucHV0ICYmXG4gICAgICAgICAgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChtaW5UaW1lKSB7XG4gICAgICAgICAgICBjaGFuZ2VkRGF0ZSA9IHNldFRpbWUoY2hhbmdlZERhdGUsIHtcbiAgICAgICAgICAgICAgaG91cjogbWluVGltZS5nZXRIb3VycygpLFxuICAgICAgICAgICAgICBtaW51dGU6IG1pblRpbWUuZ2V0TWludXRlcygpLFxuICAgICAgICAgICAgICBzZWNvbmQ6IG1pblRpbWUuZ2V0U2Vjb25kcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZm9jdXNTZWxlY3RlZE1vbnRoKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoU2VsZWN0ZWRJbjogbW9udGhTZWxlY3RlZEluIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIGNvbnN0IG5vUmFuZ2VzID0gIXN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZTtcbiAgICAgICAgY29uc3QgaGFzU3RhcnRSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZTtcbiAgICAgICAgY29uc3QgaXNSYW5nZUZpbGxlZCA9IHN0YXJ0RGF0ZSAmJiBlbmREYXRlO1xuICAgICAgICBpZiAobm9SYW5nZXMpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzU3RhcnRSYW5nZSkge1xuICAgICAgICAgIGlmIChjaGFuZ2VkRGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgb25DaGFuZ2UoW251bGwsIG51bGxdLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGVCZWZvcmUoY2hhbmdlZERhdGUsIHN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgIGlmIChzd2FwUmFuZ2UpIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBzdGFydERhdGVdLCBldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtzdGFydERhdGUsIGNoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSYW5nZUZpbGxlZCkge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKCFzZWxlY3RlZERhdGVzPy5sZW5ndGgpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZXMuc29tZShcbiAgICAgICAgICAgIChzZWxlY3RlZERhdGUpID0+IGlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHREYXRlcyA9IHNlbGVjdGVkRGF0ZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiAhaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgY2hhbmdlZERhdGUpLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgb25DaGFuZ2UobmV4dERhdGVzLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5zZWxlY3RlZERhdGVzLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uQ2hhbmdlKGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFrZWVwSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoY2hhbmdlZERhdGUsIGV2ZW50KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBXaGVuIGNoZWNraW5nIHByZVNlbGVjdGlvbiB2aWEgbWluL21heERhdGUsIHRpbWVzIG5lZWQgdG8gYmUgbWFuaXB1bGF0ZWQgdmlhIHN0YXJ0T2ZEYXkvZW5kT2ZEYXlcbiAgc2V0UHJlU2VsZWN0aW9uID0gKGRhdGUpID0+IHtcbiAgICBjb25zdCBoYXNNaW5EYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWluRGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBjb25zdCBoYXNNYXhEYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWF4RGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBsZXQgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSB0cnVlO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGF0ZSk7XG4gICAgICBpZiAoaGFzTWluRGF0ZSAmJiBoYXNNYXhEYXRlKSB7XG4gICAgICAgIC8vIGlzRGF5SW5SYW5nZSB1c2VzIHN0YXJ0T2ZEYXkgaW50ZXJuYWxseSwgc28gbm90IG5lY2Vzc2FyeSB0byBtYW5pcHVsYXRlIHRpbWVzIGhlcmVcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSBpc0RheUluUmFuZ2UoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChoYXNNaW5EYXRlKSB7XG4gICAgICAgIGNvbnN0IG1pbkRhdGVTdGFydE9mRGF5ID0gc3RhcnRPZkRheSh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9XG4gICAgICAgICAgaXNBZnRlcihkYXRlLCBtaW5EYXRlU3RhcnRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtaW5EYXRlU3RhcnRPZkRheSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc01heERhdGUpIHtcbiAgICAgICAgY29uc3QgbWF4RGF0ZUVuZE9mRGF5ID0gZW5kT2ZEYXkodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQmVmb3JlKGRhdGUsIG1heERhdGVFbmRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtYXhEYXRlRW5kT2ZEYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNWYWxpZERhdGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwcmVTZWxlY3Rpb246IGRhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRPcGVuKCF0aGlzLnN0YXRlLm9wZW4pO1xuICB9O1xuXG4gIGhhbmRsZVRpbWVDaGFuZ2UgPSAodGltZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA6IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgbGV0IGNoYW5nZWREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aW1lXG4gICAgICA6IHNldFRpbWUoc2VsZWN0ZWQsIHtcbiAgICAgICAgICBob3VyOiBnZXRIb3Vycyh0aW1lKSxcbiAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGltZSksXG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVTZWxlY3Rpb246IGNoYW5nZWREYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgfTtcblxuICBvbklucHV0Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbklucHV0Q2xpY2soKTtcbiAgfTtcblxuICBvbklucHV0S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLnN0YXRlLm9wZW4gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXRoaXMucHJvcHMucHJldmVudE9wZW5PbkZvY3VzXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8XG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93VXBcIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJFbnRlclwiXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5vbklucHV0Q2xpY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBjYWxlbmRhciBpcyBvcGVuLCB0aGVzZSBrZXlzIHdpbGwgZm9jdXMgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICBpZiAodGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnRLZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yU3RyaW5nID1cbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmIHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzXG4gICAgICAgICAgICA/ICcucmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXJbdGFiaW5kZXg9XCIwXCJdJ1xuICAgICAgICAgICAgOiAnLnJlYWN0LWRhdGVwaWNrZXJfX2RheVt0YWJpbmRleD1cIjBcIl0nO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPVxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZSAmJlxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yU3RyaW5nKTtcbiAgICAgICAgc2VsZWN0ZWRJdGVtICYmIHNlbGVjdGVkSXRlbS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5pbnB1dE9rKCkgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLmxhc3RQcmVTZWxlY3RDaGFuZ2UgPT09IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJUYWJcIikge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25Qb3J0YWxLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHByZXZlbnRGb2N1czogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtleURvd24gZXZlbnRzIHBhc3NlZCBkb3duIHRvIGRheS5qc3hcbiAgb25EYXlLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzU2hpZnRLZXlBY3RpdmUgPSBldmVudC5zaGlmdEtleTtcblxuICAgIGNvbnN0IGNvcHkgPSBuZXdEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgdGhpcy5zZXRQcmVTZWxlY3Rpb24oY29weSk7XG4gICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIGlmICghdGhpcy5pbnB1dE9rKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGxldCBuZXdTZWxlY3Rpb247XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YkRheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkRGF5cyhjb3B5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGlzU2hpZnRLZXlBY3RpdmVcbiAgICAgICAgICAgID8gc3ViWWVhcnMoY29weSwgMSlcbiAgICAgICAgICAgIDogc3ViTW9udGhzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUGFnZURvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IGFkZFllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IGFkZE1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkhvbWVcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgICAgIGNvcHksXG4gICAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiRW5kXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0RW5kT2ZXZWVrKGNvcHkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoIW5ld1NlbGVjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0RXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSB9KTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkKG5ld1NlbGVjdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbihuZXdTZWxlY3Rpb24pO1xuICAgICAgLy8gbmVlZCB0byBmaWd1cmUgb3V0IHdoZXRoZXIgbW9udGggaGFzIGNoYW5nZWQgdG8gZm9jdXMgZGF5IGluIGlubGluZSB2ZXJzaW9uXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgY29uc3QgcHJldk1vbnRoID0gZ2V0TW9udGgoY29weSk7XG4gICAgICAgIGNvbnN0IG5ld01vbnRoID0gZ2V0TW9udGgobmV3U2VsZWN0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldlllYXIgPSBnZXRZZWFyKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdZZWFyID0gZ2V0WWVhcihuZXdTZWxlY3Rpb24pO1xuXG4gICAgICAgIGlmIChwcmV2TW9udGggIT09IG5ld01vbnRoIHx8IHByZXZZZWFyICE9PSBuZXdZZWFyKSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzIGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzbid0IGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGhhbmRsZSBnZW5lcmljIGtleSBkb3duIGV2ZW50cyBpbiB0aGUgcG9wcGVyIHRoYXQgZG8gbm90IGFkanVzdCBvciBzZWxlY3QgZGF0ZXNcbiAgLy8gZXg6IHdoaWxlIGZvY3VzaW5nIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9uc1xuICBvblBvcHBlcktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2xlYXJDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG51bGwsIGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgY2xlYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5vbkNsZWFyQ2xpY2soKTtcbiAgfTtcblxuICBvblNjcm9sbCA9IChldmVudCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiYm9vbGVhblwiICYmXG4gICAgICB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGxcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsKGV2ZW50KSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZW5kZXJDYWxlbmRhciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLmlzQ2FsZW5kYXJPcGVuKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFdyYXBwZWRDYWxlbmRhclxuICAgICAgICByZWY9eyhlbGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsZW07XG4gICAgICAgIH19XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgbW9udGhBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIHNldE9wZW49e3RoaXMuc2V0T3Blbn1cbiAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXRDYWxlbmRhcn1cbiAgICAgICAgdXNlV2Vla2RheXNTaG9ydD17dGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0fVxuICAgICAgICBmb3JtYXRXZWVrRGF5PXt0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXl9XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMuc3RhdGUucHJlU2VsZWN0aW9ufVxuICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlPXt0aGlzLmhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlfVxuICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnN0YXRlLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICBob2xpZGF5cz17Z2V0SG9saWRheXNNYXAodGhpcy5tb2RpZnlIb2xpZGF5cygpKX1cbiAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5zdGF0ZS5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgc2hvd1ByZXZpb3VzTW9udGhzPXt0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc31cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAgIHNob3dNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHRvZGF5QnV0dG9uPXt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgICB3ZWVrTGFiZWw9e3RoaXMucHJvcHMud2Vla0xhYmVsfVxuICAgICAgICBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcz17b3V0c2lkZUNsaWNrSWdub3JlQ2xhc3N9XG4gICAgICAgIGZpeGVkSGVpZ2h0PXt0aGlzLnByb3BzLmZpeGVkSGVpZ2h0fVxuICAgICAgICBtb250aHNTaG93bj17dGhpcy5wcm9wcy5tb250aHNTaG93bn1cbiAgICAgICAgbW9udGhTZWxlY3RlZEluPXt0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbn1cbiAgICAgICAgb25Ecm9wZG93bkZvY3VzPXt0aGlzLmhhbmRsZURyb3Bkb3duRm9jdXN9XG4gICAgICAgIG9uTW9udGhDaGFuZ2U9e3RoaXMucHJvcHMub25Nb250aENoYW5nZX1cbiAgICAgICAgb25ZZWFyQ2hhbmdlPXt0aGlzLnByb3BzLm9uWWVhckNoYW5nZX1cbiAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgd2Vla0RheUNsYXNzTmFtZT17dGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lfVxuICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICBzaG93RGF0ZVNlbGVjdD17dGhpcy5wcm9wcy5zaG93RGF0ZVNlbGVjdH1cbiAgICAgICAgc2hvd1RpbWVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIG9uVGltZUNoYW5nZT17dGhpcy5oYW5kbGVUaW1lQ2hhbmdlfVxuICAgICAgICB0aW1lRm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9XG4gICAgICAgIHRpbWVJbnRlcnZhbHM9e3RoaXMucHJvcHMudGltZUludGVydmFsc31cbiAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgIGV4Y2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5leGNsdWRlVGltZXN9XG4gICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jYWxlbmRhckNsYXNzTmFtZX1cbiAgICAgICAgY29udGFpbmVyPXt0aGlzLnByb3BzLmNhbGVuZGFyQ29udGFpbmVyfVxuICAgICAgICB5ZWFySXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzTW9udGhBcmlhTGFiZWx9XG4gICAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhBcmlhTGFiZWx9XG4gICAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c1llYXJCdXR0b25MYWJlbH1cbiAgICAgICAgbmV4dFllYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJBcmlhTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbH1cbiAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICByZW5kZXJDdXN0b21IZWFkZXI9e3RoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyfVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgIHJlbmRlck1vbnRoQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJNb250aENvbnRlbnR9XG4gICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcn1cbiAgICAgICAgb25Nb250aE1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmV9XG4gICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcn1cbiAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlfVxuICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgc2hvd1RpbWVJbnB1dD17dGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICBzaG93TW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI9e3RoaXMucHJvcHMuZXhjbHVkZVNjcm9sbGJhcn1cbiAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLm9uS2V5RG93bn1cbiAgICAgICAgaGFuZGxlT25EYXlLZXlEb3duPXt0aGlzLm9uRGF5S2V5RG93bn1cbiAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMuc3RhdGUuZm9jdXNlZH1cbiAgICAgICAgY3VzdG9tVGltZUlucHV0PXt0aGlzLnByb3BzLmN1c3RvbVRpbWVJbnB1dH1cbiAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgeWVhckNsYXNzTmFtZT17dGhpcy5wcm9wcy55ZWFyQ2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvV3JhcHBlZENhbGVuZGFyPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQXJpYUxpdmVSZWdpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNDb250YWluc1RpbWUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3Q7XG4gICAgY29uc3QgbG9uZ0RhdGVGb3JtYXQgPSBpc0NvbnRhaW5zVGltZSA/IFwiUFBQUHBcIiA6IFwiUFBQUFwiO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBzdGFydCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgfSxcbiAgICAgICl9LiAke1xuICAgICAgICB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA/IFwiRW5kIGRhdGU6IFwiICtcbiAgICAgICAgICAgIHNhZmVEYXRlRm9ybWF0KHRoaXMucHJvcHMuZW5kRGF0ZSwge1xuICAgICAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHRpbWU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHllYXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQ6IFwieXl5eVwiLCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIG1vbnRoOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcIk1NTU0geXl5eVwiLCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgcXVhcnRlcjogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6IFwieXl5eSwgUVFRXCIsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIGRhdGU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB9LFxuICAgICAgICApfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHthcmlhTGl2ZU1lc3NhZ2V9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xzeCh0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgW291dHNpZGVDbGlja0lnbm9yZUNsYXNzXTogdGhpcy5zdGF0ZS5vcGVuLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY3VzdG9tSW5wdXQgPSB0aGlzLnByb3BzLmN1c3RvbUlucHV0IHx8IDxpbnB1dCB0eXBlPVwidGV4dFwiIC8+O1xuICAgIGNvbnN0IGN1c3RvbUlucHV0UmVmID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dFJlZiB8fCBcInJlZlwiO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPVxuICAgICAgdHlwZW9mIHRoaXMucHJvcHMudmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyB0aGlzLnByb3BzLnZhbHVlXG4gICAgICAgIDogdHlwZW9mIHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgID8gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG4gICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNSYW5nZVxuICAgICAgICAgICAgPyBzYWZlRGF0ZVJhbmdlRm9ybWF0KFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlXG4gICAgICAgICAgICAgID8gc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQodGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzLCB0aGlzLnByb3BzKVxuICAgICAgICAgICAgICA6IHNhZmVEYXRlRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMpO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjdXN0b21JbnB1dCwge1xuICAgICAgW2N1c3RvbUlucHV0UmVmXTogKGlucHV0KSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgIH0sXG4gICAgICB2YWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVCbHVyLFxuICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgb25DbGljazogdGhpcy5vbklucHV0Q2xpY2ssXG4gICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzLFxuICAgICAgb25LZXlEb3duOiB0aGlzLm9uSW5wdXRLZXlEb3duLFxuICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICBmb3JtOiB0aGlzLnByb3BzLmZvcm0sXG4gICAgICBhdXRvRm9jdXM6IHRoaXMucHJvcHMuYXV0b0ZvY3VzLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXJUZXh0LFxuICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICBhdXRvQ29tcGxldGU6IHRoaXMucHJvcHMuYXV0b0NvbXBsZXRlLFxuICAgICAgY2xhc3NOYW1lOiBjbHN4KGN1c3RvbUlucHV0LnByb3BzLmNsYXNzTmFtZSwgY2xhc3NOYW1lKSxcbiAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXG4gICAgICByZXF1aXJlZDogdGhpcy5wcm9wcy5yZXF1aXJlZCxcbiAgICAgIHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxuICAgICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IHRoaXMucHJvcHMuYXJpYURlc2NyaWJlZEJ5LFxuICAgICAgXCJhcmlhLWludmFsaWRcIjogdGhpcy5wcm9wcy5hcmlhSW52YWxpZCxcbiAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRoaXMucHJvcHMuYXJpYUxhYmVsbGVkQnksXG4gICAgICBcImFyaWEtcmVxdWlyZWRcIjogdGhpcy5wcm9wcy5hcmlhUmVxdWlyZWQsXG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyQ2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDbGVhcmFibGUsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIGNsZWFyQnV0dG9uVGl0bGUsXG4gICAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZSA9IFwiXCIsXG4gICAgICBhcmlhTGFiZWxDbG9zZSA9IFwiQ2xvc2VcIixcbiAgICAgIHNlbGVjdGVkRGF0ZXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKFxuICAgICAgaXNDbGVhcmFibGUgJiZcbiAgICAgIChzZWxlY3RlZCAhPSBudWxsIHx8XG4gICAgICAgIHN0YXJ0RGF0ZSAhPSBudWxsIHx8XG4gICAgICAgIGVuZERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBzZWxlY3RlZERhdGVzPy5sZW5ndGgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFxuICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19jbG9zZS1pY29uXCIsXG4gICAgICAgICAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZSxcbiAgICAgICAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19jbG9zZS1pY29uLS1kaXNhYmxlZFwiOiBkaXNhYmxlZCB9LFxuICAgICAgICAgICl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbENsb3NlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGVhckNsaWNrfVxuICAgICAgICAgIHRpdGxlPXtjbGVhckJ1dHRvblRpdGxlfVxuICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dENvbnRhaW5lcigpIHtcbiAgICBjb25zdCB7IHNob3dJY29uLCBpY29uLCBjYWxlbmRhckljb25DbGFzc25hbWUsIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2sgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb3BlbiB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2lucHV0LWNvbnRhaW5lciR7XG4gICAgICAgICAgc2hvd0ljb24gPyBcIiByZWFjdC1kYXRlcGlja2VyX192aWV3LWNhbGVuZGFyLWljb25cIiA6IFwiXCJcbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIHtzaG93SWNvbiAmJiAoXG4gICAgICAgICAgPENhbGVuZGFySWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y2FsZW5kYXJJY29uQ2xhc3NuYW1lfSAke1xuICAgICAgICAgICAgICBvcGVuICYmIFwicmVhY3QtZGF0ZXBpY2tlci1pZ25vcmUtb25jbGlja291dHNpZGVcIlxuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB7Li4uKHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2tcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLnRvZ2dsZUNhbGVuZGFyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiBudWxsKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlbmRlckFyaWFMaXZlTWVzc2FnZSAmJiB0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckRhdGVJbnB1dCgpfVxuICAgICAgICB7dGhpcy5yZW5kZXJDbGVhckJ1dHRvbigpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjYWxlbmRhciA9IHRoaXMucmVuZGVyQ2FsZW5kYXIoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLmlubGluZSkgcmV0dXJuIGNhbGVuZGFyO1xuXG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFBvcnRhbCkge1xuICAgICAgbGV0IHBvcnRhbENvbnRhaW5lciA9IHRoaXMuc3RhdGUub3BlbiA/IChcbiAgICAgICAgPFRhYkxvb3AgZW5hYmxlVGFiTG9vcD17dGhpcy5wcm9wcy5lbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19wb3J0YWxcIlxuICAgICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uUG9ydGFsS2V5RG93bn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2FsZW5kYXJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvVGFiTG9vcD5cbiAgICAgICkgOiBudWxsO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5vcGVuICYmIHRoaXMucHJvcHMucG9ydGFsSWQpIHtcbiAgICAgICAgcG9ydGFsQ29udGFpbmVyID0gKFxuICAgICAgICAgIDxQb3J0YWxcbiAgICAgICAgICAgIHBvcnRhbElkPXt0aGlzLnByb3BzLnBvcnRhbElkfVxuICAgICAgICAgICAgcG9ydGFsSG9zdD17dGhpcy5wcm9wcy5wb3J0YWxIb3N0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3J0YWxDb250YWluZXJ9XG4gICAgICAgICAgPC9Qb3J0YWw+XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRDb250YWluZXIoKX1cbiAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxQb3BwZXJDb21wb25lbnRcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBvcHBlckNsYXNzTmFtZX1cbiAgICAgICAgd3JhcHBlckNsYXNzTmFtZT17dGhpcy5wcm9wcy53cmFwcGVyQ2xhc3NOYW1lfVxuICAgICAgICBoaWRlUG9wcGVyPXshdGhpcy5pc0NhbGVuZGFyT3BlbigpfVxuICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgcG9ydGFsSG9zdD17dGhpcy5wcm9wcy5wb3J0YWxIb3N0fVxuICAgICAgICBwb3BwZXJNb2RpZmllcnM9e3RoaXMucHJvcHMucG9wcGVyTW9kaWZpZXJzfVxuICAgICAgICB0YXJnZXRDb21wb25lbnQ9e3RoaXMucmVuZGVySW5wdXRDb250YWluZXIoKX1cbiAgICAgICAgcG9wcGVyQ29udGFpbmVyPXt0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcn1cbiAgICAgICAgcG9wcGVyQ29tcG9uZW50PXtjYWxlbmRhcn1cbiAgICAgICAgcG9wcGVyUGxhY2VtZW50PXt0aGlzLnByb3BzLnBvcHBlclBsYWNlbWVudH1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHBvcHBlck9uS2V5RG93bj17dGhpcy5vblBvcHBlcktleURvd259XG4gICAgICAgIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH1cbiAgICAgICAgc2hvd0Fycm93PXt0aGlzLnByb3BzLnNob3dQb3BwZXJBcnJvd31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCA9IFwiaW5wdXRcIjtcbmNvbnN0IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFID0gXCJuYXZpZ2F0ZVwiO1xuIl0sIm5hbWVzIjpbIkRFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiIsImxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwIiwibmV3RGF0ZSIsInZhbHVlIiwiZCIsIlN0cmluZyIsInBhcnNlSVNPIiwidG9EYXRlIiwiRGF0ZSIsImlzVmFsaWQiLCJwYXJzZURhdGUiLCJkYXRlRm9ybWF0IiwibG9jYWxlIiwic3RyaWN0UGFyc2luZyIsIm1pbkRhdGUiLCJwYXJzZWREYXRlIiwibG9jYWxlT2JqZWN0IiwiZ2V0TG9jYWxlT2JqZWN0IiwiZ2V0RGVmYXVsdExvY2FsZSIsInN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImRmIiwidHJ5UGFyc2VEYXRlIiwicGFyc2UiLCJ1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnMiLCJ1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zIiwiZm9ybWF0RGF0ZSIsIm1hdGNoIiwibWFwIiwic3Vic3RyaW5nIiwiZmlyc3RDaGFyYWN0ZXIiLCJsb25nRm9ybWF0dGVyIiwibG9uZ0Zvcm1hdHRlcnMiLCJmb3JtYXRMb25nIiwiam9pbiIsImxlbmd0aCIsInNsaWNlIiwiZGF0ZSIsImlzVmFsaWREYXRlIiwiaXNCZWZvcmUiLCJmb3JtYXRTdHIiLCJmb3JtYXQiLCJsb2NhbGVPYmoiLCJjb25zb2xlIiwid2FybiIsImNvbmNhdCIsInNhZmVEYXRlRm9ybWF0IiwiX3JlZiIsInNhZmVEYXRlUmFuZ2VGb3JtYXQiLCJzdGFydERhdGUiLCJlbmREYXRlIiwicHJvcHMiLCJmb3JtYXR0ZWRTdGFydERhdGUiLCJmb3JtYXR0ZWRFbmREYXRlIiwic2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQiLCJkYXRlcyIsImZvcm1hdHRlZEZpcnN0RGF0ZSIsImZvcm1hdHRlZFNlY29uZERhdGUiLCJleHRyYURhdGVzQ291bnQiLCJzZXRUaW1lIiwiX3JlZjIiLCJfcmVmMiRob3VyIiwiaG91ciIsIl9yZWYyJG1pbnV0ZSIsIm1pbnV0ZSIsIl9yZWYyJHNlY29uZCIsInNlY29uZCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRXZWVrIiwiZ2V0SVNPV2VlayIsImdldERheU9mV2Vla0NvZGUiLCJkYXkiLCJnZXRTdGFydE9mRGF5Iiwic3RhcnRPZkRheSIsImdldFN0YXJ0T2ZXZWVrIiwiY2FsZW5kYXJTdGFydERheSIsInN0YXJ0T2ZXZWVrIiwid2Vla1N0YXJ0c09uIiwiZ2V0U3RhcnRPZk1vbnRoIiwic3RhcnRPZk1vbnRoIiwiZ2V0U3RhcnRPZlllYXIiLCJzdGFydE9mWWVhciIsImdldFN0YXJ0T2ZRdWFydGVyIiwic3RhcnRPZlF1YXJ0ZXIiLCJnZXRTdGFydE9mVG9kYXkiLCJnZXRFbmRPZldlZWsiLCJlbmRPZldlZWsiLCJpc1NhbWVZZWFyIiwiZGF0ZTEiLCJkYXRlMiIsImRmSXNTYW1lWWVhciIsImlzU2FtZU1vbnRoIiwiZGZJc1NhbWVNb250aCIsImlzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZVF1YXJ0ZXIiLCJpc1NhbWVEYXkiLCJkZklzU2FtZURheSIsImlzRXF1YWwiLCJkZklzRXF1YWwiLCJpc0RheUluUmFuZ2UiLCJ2YWxpZCIsInN0YXJ0IiwiZW5kIiwiZW5kT2ZEYXkiLCJpc1dpdGhpbkludGVydmFsIiwiZXJyIiwicmVnaXN0ZXJMb2NhbGUiLCJsb2NhbGVOYW1lIiwibG9jYWxlRGF0YSIsInNjb3BlIiwid2luZG93IiwiZ2xvYmFsVGhpcyIsIl9fbG9jYWxlRGF0YV9fIiwic2V0RGVmYXVsdExvY2FsZSIsIl9fbG9jYWxlSWRfXyIsImxvY2FsZVNwZWMiLCJnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUiLCJmb3JtYXRGdW5jIiwiZ2V0V2Vla2RheU1pbkluTG9jYWxlIiwiZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUiLCJnZXRNb250aEluTG9jYWxlIiwibW9udGgiLCJzZXRNb250aCIsImdldE1vbnRoU2hvcnRJbkxvY2FsZSIsImdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlIiwicXVhcnRlciIsInNldFF1YXJ0ZXIiLCJpc0RheURpc2FibGVkIiwiX3JlZjMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJtYXhEYXRlIiwiZXhjbHVkZURhdGVzIiwiZXhjbHVkZURhdGVJbnRlcnZhbHMiLCJpbmNsdWRlRGF0ZXMiLCJpbmNsdWRlRGF0ZUludGVydmFscyIsImZpbHRlckRhdGUiLCJpc091dE9mQm91bmRzIiwic29tZSIsImV4Y2x1ZGVEYXRlIiwiX3JlZjQiLCJpbmNsdWRlRGF0ZSIsIl9yZWY1IiwiaXNEYXlFeGNsdWRlZCIsIl9yZWY2IiwiX3JlZjciLCJpc01vbnRoRGlzYWJsZWQiLCJfcmVmOCIsImVuZE9mTW9udGgiLCJpc01vbnRoSW5SYW5nZSIsIm0iLCJzdGFydERhdGVZZWFyIiwiZ2V0WWVhciIsInN0YXJ0RGF0ZU1vbnRoIiwiZ2V0TW9udGgiLCJlbmREYXRlWWVhciIsImVuZERhdGVNb250aCIsImRheVllYXIiLCJpc1F1YXJ0ZXJEaXNhYmxlZCIsIl9yZWY5IiwiaXNZZWFySW5SYW5nZSIsInllYXIiLCJzdGFydFllYXIiLCJlbmRZZWFyIiwiaXNZZWFyRGlzYWJsZWQiLCJfcmVmMTAiLCJlbmRPZlllYXIiLCJpc1F1YXJ0ZXJJblJhbmdlIiwicSIsInN0YXJ0RGF0ZVF1YXJ0ZXIiLCJnZXRRdWFydGVyIiwiZW5kRGF0ZVF1YXJ0ZXIiLCJfcmVmMTEiLCJkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMiLCJpc1RpbWVJbkxpc3QiLCJ0aW1lIiwidGltZXMiLCJsaXN0VGltZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImlzVGltZURpc2FibGVkIiwiX3JlZjEyIiwiZXhjbHVkZVRpbWVzIiwiaW5jbHVkZVRpbWVzIiwiZmlsdGVyVGltZSIsImlzVGltZUluRGlzYWJsZWRSYW5nZSIsIl9yZWYxMyIsIm1pblRpbWUiLCJtYXhUaW1lIiwiRXJyb3IiLCJiYXNlIiwiYmFzZVRpbWUiLCJtaW4iLCJtYXgiLCJtb250aERpc2FibGVkQmVmb3JlIiwiX3JlZjE0IiwicHJldmlvdXNNb250aCIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiZXZlcnkiLCJtb250aERpc2FibGVkQWZ0ZXIiLCJfcmVmMTUiLCJuZXh0TW9udGgiLCJhZGRNb250aHMiLCJxdWFydGVyRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTYiLCJmaXJzdERhdGVPZlllYXIiLCJwcmV2aW91c1F1YXJ0ZXIiLCJzdWJRdWFydGVycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMiLCJxdWFydGVyRGlzYWJsZWRBZnRlciIsIl9yZWYxNyIsImxhc3REYXRlT2ZZZWFyIiwibmV4dFF1YXJ0ZXIiLCJhZGRRdWFydGVycyIsInllYXJEaXNhYmxlZEJlZm9yZSIsIl9yZWYxOCIsInByZXZpb3VzWWVhciIsInN1YlllYXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyIsInllYXJzRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTkiLCJfcmVmMTkkeWVhckl0ZW1OdW1iZXIiLCJ5ZWFySXRlbU51bWJlciIsIl9nZXRZZWFyc1BlcmlvZCIsImdldFllYXJzUGVyaW9kIiwiZW5kUGVyaW9kIiwibWluRGF0ZVllYXIiLCJ5ZWFyRGlzYWJsZWRBZnRlciIsIl9yZWYyMCIsIm5leHRZZWFyIiwiYWRkWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQWZ0ZXIiLCJfcmVmMjEiLCJfcmVmMjEkeWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QyIiwic3RhcnRQZXJpb2QiLCJtYXhEYXRlWWVhciIsImdldEVmZmVjdGl2ZU1pbkRhdGUiLCJfcmVmMjIiLCJtaW5EYXRlcyIsImZpbHRlciIsImdldEVmZmVjdGl2ZU1heERhdGUiLCJfcmVmMjMiLCJtYXhEYXRlcyIsImdldEhpZ2h0TGlnaHREYXlzTWFwIiwiaGlnaGxpZ2h0RGF0ZXMiLCJkZWZhdWx0Q2xhc3NOYW1lIiwiZGF0ZUNsYXNzZXMiLCJNYXAiLCJpIiwibGVuIiwib2JqIiwiaXNEYXRlIiwia2V5IiwiY2xhc3NOYW1lc0FyciIsImdldCIsImluY2x1ZGVzIiwicHVzaCIsInNldCIsIl90eXBlb2YiLCJrZXlzIiwiT2JqZWN0IiwiY2xhc3NOYW1lIiwiYXJyT2ZEYXRlcyIsImNvbnN0cnVjdG9yIiwiayIsImFycmF5c0FyZUVxdWFsIiwiYXJyYXkxIiwiYXJyYXkyIiwiaW5kZXgiLCJnZXRIb2xpZGF5c01hcCIsImhvbGlkYXlEYXRlcyIsImhvbGlkYXkiLCJkYXRlT2JqIiwiaG9saWRheU5hbWUiLCJjbGFzc05hbWVzT2JqIiwiaG9saWRheU5hbWVBcnIiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJ0aW1lc1RvSW5qZWN0QWZ0ZXIiLCJjdXJyZW50VGltZSIsImN1cnJlbnRNdWx0aXBsaWVyIiwiaW50ZXJ2YWxzIiwiaW5qZWN0ZWRUaW1lcyIsImwiLCJpbmplY3RlZFRpbWUiLCJhZGRIb3VycyIsImFkZE1pbnV0ZXMiLCJhZGRTZWNvbmRzIiwiZ2V0U2Vjb25kcyIsIm5leHRUaW1lIiwiaXNBZnRlciIsImFkZFplcm8iLCJNYXRoIiwiY2VpbCIsImdldEhvdXJzSW5EYXkiLCJnZXRGdWxsWWVhciIsImdldERhdGUiLCJzdGFydE9mVGhlTmV4dERheSIsInJvdW5kIiwic3RhcnRPZk1pbnV0ZSIsInNlY29uZHMiLCJtaWxsaXNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJnZXRUaW1lIiwiaXNTYW1lTWludXRlIiwiZDEiLCJkMiIsImdldE1pZG5pZ2h0RGF0ZSIsImRhdGVXaXRob3V0VGltZSIsImlzRGF0ZUJlZm9yZSIsImRhdGVUb0NvbXBhcmUiLCJtaWRuaWdodERhdGUiLCJtaWRuaWdodERhdGVUb0NvbXBhcmUiLCJpc1NwYWNlS2V5RG93biIsImV2ZW50IiwiU1BBQ0VfS0VZIiwiZ2VuZXJhdGVZZWFycyIsIm5vT2ZZZWFyIiwibGlzdCIsIm5ld1llYXIiLCJpc0luUmFuZ2UiLCJZZWFyRHJvcGRvd25PcHRpb25zIiwiX1JlYWN0JENvbXBvbmVudCIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIl9kZWZpbmVQcm9wZXJ0eSIsInNlbGVjdGVkWWVhciIsIm9wdGlvbnMiLCJzdGF0ZSIsInllYXJzTGlzdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIm9uQ2xpY2siLCJvbkNoYW5nZSIsImJpbmQiLCJtaW5ZZWFyIiwibWF4WWVhciIsImZpbmQiLCJ1bnNoaWZ0IiwiaW5jcmVtZW50WWVhcnMiLCJkZWNyZW1lbnRZZWFycyIsIm9uQ2FuY2VsIiwiYW1vdW50IiwieWVhcnMiLCJzZXRTdGF0ZSIsInNoaWZ0WWVhcnMiLCJ5ZWFyRHJvcGRvd25JdGVtTnVtYmVyIiwic2Nyb2xsYWJsZVllYXJEcm9wZG93biIsImRyb3Bkb3duUmVmIiwiY3JlYXRlUmVmIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkN1cnJlbnQiLCJjdXJyZW50IiwiZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4iLCJjaGlsZHJlbiIsImZyb20iLCJzZWxlY3RlZFllYXJPcHRpb25FbCIsImNoaWxkRWwiLCJhcmlhU2VsZWN0ZWQiLCJzY3JvbGxUb3AiLCJvZmZzZXRUb3AiLCJjbGllbnRIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJyZW5kZXIiLCJkcm9wZG93bkNsYXNzIiwiY2xzeCIsInJlZiIsInJlbmRlck9wdGlvbnMiLCJDb21wb25lbnQiLCJXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyIsIm9uQ2xpY2tPdXRzaWRlIiwiWWVhckRyb3Bkb3duIiwiX2xlbiIsImFyZ3MiLCJfa2V5IiwiZHJvcGRvd25WaXNpYmxlIiwiZSIsInRhcmdldCIsIm9uU2VsZWN0Q2hhbmdlIiwicmVuZGVyU2VsZWN0T3B0aW9ucyIsInZpc2libGUiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJ0b2dnbGVEcm9wZG93biIsInJlc3VsdCIsInJlbmRlclJlYWRWaWV3IiwicmVuZGVyRHJvcGRvd24iLCJhZGp1c3REYXRlT25DaGFuZ2UiLCJoYW5kbGVZZWFyQ2hhbmdlIiwib25TZWxlY3QiLCJzZXRPcGVuIiwicmVuZGVyZWREcm9wZG93biIsImRyb3Bkb3duTW9kZSIsInJlbmRlclNjcm9sbE1vZGUiLCJyZW5kZXJTZWxlY3RNb2RlIiwiTW9udGhEcm9wZG93bk9wdGlvbnMiLCJtb250aE5hbWVzIiwiaXNTZWxlY3RlZE1vbnRoIiwiV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zIiwiTW9udGhEcm9wZG93biIsIk0iLCJfdGhpczIiLCJ1c2VTaG9ydE1vbnRoSW5Ecm9wZG93biIsInV0aWxzIiwiZ2VuZXJhdGVNb250aFllYXJzIiwiY3VyckRhdGUiLCJsYXN0RGF0ZSIsIk1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIm1vbnRoWWVhcnNMaXN0IiwibW9udGhZZWFyIiwibW9udGhZZWFyUG9pbnQiLCJpc1NhbWVNb250aFllYXIiLCJzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24iLCJXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwiTW9udGhZZWFyRHJvcGRvd24iLCJ0aW1lUG9pbnQiLCJ5ZWFyTW9udGgiLCJjaGFuZ2VkRGF0ZSIsInBhcnNlSW50IiwiRGF5IiwiaXNEaXNhYmxlZCIsIm9uTW91c2VFbnRlciIsImV2ZW50S2V5IiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVPbktleURvd24iLCJvdGhlciIsIl90aGlzJHByb3BzJHNlbGVjdGVkRCIsImRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uIiwiaXNTZWxlY3RlZERhdGUiLCJzZWxlY3RzTXVsdGlwbGUiLCJzZWxlY3RlZERhdGVzIiwiaXNTYW1lRGF5T3JXZWVrIiwic2VsZWN0ZWQiLCJwcmVTZWxlY3Rpb24iLCJzaG93V2Vla1BpY2tlciIsImlzU2FtZVdlZWsiLCJfdGhpcyRwcm9wcyIsImRheVN0ciIsIl90aGlzJHByb3BzMiIsImhvbGlkYXlzIiwiaGFzIiwiX3RoaXMkcHJvcHMzIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nIiwiX3RoaXMkcHJvcHM0Iiwic2VsZWN0c1N0YXJ0Iiwic2VsZWN0c0VuZCIsInNlbGVjdHNSYW5nZSIsInNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlIiwic2VsZWN0aW5nRGF0ZSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzIiLCJpc0luU2VsZWN0aW5nUmFuZ2UiLCJfdGhpcyRwcm9wczUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmczIiwiX3RoaXMkcHJvcHM2IiwiX3RoaXMkcHJvcHM3IiwiX3RoaXMkcHJvcHM4Iiwid2Vla2RheSIsImdldERheSIsIl90aGlzJHByb3BzJHNlbGVjdGVkRDIiLCJkYXlDbGFzc05hbWUiLCJpc0V4Y2x1ZGVkIiwiaXNTZWxlY3RlZCIsImlzS2V5Ym9hcmRTZWxlY3RlZCIsImlzUmFuZ2VTdGFydCIsImlzUmFuZ2VFbmQiLCJpc1NlbGVjdGluZ1JhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ1JhbmdlRW5kIiwiaXNDdXJyZW50RGF5IiwiaXNXZWVrZW5kIiwiaXNBZnRlck1vbnRoIiwiaXNCZWZvcmVNb250aCIsImdldEhpZ2hMaWdodGVkQ2xhc3MiLCJnZXRIb2xpZGF5c0NsYXNzIiwiX3RoaXMkcHJvcHM5IiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlIiwiYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUyIiwiYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkIiwicHJlZml4IiwiX3RoaXMkcHJvcHMxMCIsIl90aGlzJHByb3BzMTAkaG9saWRheSIsImNvbXBhcmVEdCIsInRpdGxlcyIsImFwcGx5IiwiaG9saWRheU5hbWVzIiwibWVzc2FnZSIsInNlbGVjdGVkRGF5IiwicHJlU2VsZWN0aW9uRGF5IiwidGFiSW5kZXgiLCJzaG93V2Vla051bWJlciIsImlzU3RhcnRPZldlZWsiLCJfdGhpcyRkYXlFbCRjdXJyZW50IiwicHJldlByb3BzIiwic2hvdWxkRm9jdXNEYXkiLCJnZXRUYWJJbmRleCIsImlzSW5wdXRGb2N1c2VkIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiYm9keSIsImlubGluZSIsInNob3VsZEZvY3VzRGF5SW5saW5lIiwiY29udGFpbmVyUmVmIiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQiLCJkYXlFbCIsImZvY3VzIiwicHJldmVudFNjcm9sbCIsInJlbmRlckRheUNvbnRlbnRzIiwiZ2V0Q2xhc3NOYW1lcyIsIm9uS2V5RG93biIsImhhbmRsZUNsaWNrIiwidXNlUG9pbnRlckV2ZW50IiwiaGFuZGxlTW91c2VFbnRlciIsIm9uUG9pbnRlckVudGVyIiwiZ2V0QXJpYUxhYmVsIiwicm9sZSIsInRpdGxlIiwiZ2V0VGl0bGUiLCJoYW5kbGVGb2N1c0RheSIsImNvbXBvbmVudERpZFVwZGF0ZSIsIldlZWtOdW1iZXIiLCJzaG91bGRGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyRWwiLCJoYW5kbGVGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyIiwiX3RoaXMkcHJvcHMkYXJpYUxhYmVsIiwiYXJpYUxhYmVsUHJlZml4Iiwid2Vla051bWJlckNsYXNzZXMiLCJXZWVrIiwib25EYXlDbGljayIsIm9uRGF5TW91c2VFbnRlciIsIm9uV2Vla1NlbGVjdCIsImhhbmRsZURheUNsaWNrIiwic2hvdWxkQ2xvc2VPblNlbGVjdCIsImZvcm1hdFdlZWtOdW1iZXIiLCJkYXlzIiwib25DbGlja0FjdGlvbiIsImhhbmRsZVdlZWtDbGljayIsIm9mZnNldCIsImFkZERheXMiLCJjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXgiLCJkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCIsInZhbHVlT2YiLCJoYW5kbGVEYXlNb3VzZUVudGVyIiwicmVuZGVyRGF5cyIsIkZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UIiwiTU9OVEhfQ09MVU1OU19MQVlPVVQiLCJUV09fQ09MVU1OUyIsIlRIUkVFX0NPTFVNTlMiLCJGT1VSX0NPTFVNTlMiLCJNT05USF9DT0xVTU5TIiwiZ3JpZCIsInZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldCIsIk1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQiLCJnZXRNb250aENvbHVtbnNMYXlvdXQiLCJzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlciIsInNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIiLCJNb250aCIsIm9yZGVySW5EaXNwbGF5Iiwib25Nb3VzZUxlYXZlIiwiaXNJblNlbGVjdGluZ1JhbmdlTW9udGgiLCJfbW9udGgiLCJfdGhpcyRwcm9wcyRzZWxlY3Rpbmc0Iiwid2Vla3MiLCJpc0ZpeGVkSGVpZ2h0IiwiZml4ZWRIZWlnaHQiLCJicmVha0FmdGVyTmV4dFB1c2giLCJjdXJyZW50V2Vla1N0YXJ0Iiwid2Vla0FyaWFMYWJlbFByZWZpeCIsInNob3dXZWVrTnVtYmVycyIsImlzRml4ZWRBbmRGaW5hbFdlZWsiLCJpc05vbkZpeGVkQW5kT3V0T2ZNb250aCIsImlzV2Vla0luTW9udGgiLCJwZWVrTmV4dE1vbnRoIiwibGFiZWxEYXRlIiwibmV3TW9udGgiLCJzZXRQcmVTZWxlY3Rpb24iLCJNT05USF9SRUZTIiwiaGFuZGxlT25Nb250aEtleURvd24iLCJtb250aENvbHVtbnNMYXlvdXQiLCJ2ZXJ0aWNhbE9mZnNldCIsIm1vbnRoc0dyaWQiLCJvbk1vbnRoQ2xpY2siLCJoYW5kbGVNb250aE5hdmlnYXRpb24iLCJuZXdRdWFydGVyIiwiUVVBUlRFUl9SRUZTIiwib25RdWFydGVyQ2xpY2siLCJoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiIsIm1vbnRoQ2xhc3NOYW1lIiwiX21vbnRoQ2xhc3NOYW1lIiwiaXNSYW5nZVN0YXJ0TW9udGgiLCJpc1JhbmdlRW5kTW9udGgiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCIsImlzQ3VycmVudE1vbnRoIiwicHJlU2VsZWN0ZWRNb250aCIsInByZVNlbGVjdGVkUXVhcnRlciIsIl90aGlzJHByb3BzMTEiLCJfdGhpcyRwcm9wczExJGNob29zZUQiLCJfdGhpcyRwcm9wczExJGRpc2FibGUiLCJfdGhpcyRwcm9wczEyIiwiaXNTZWxlY3RlZFF1YXJ0ZXIiLCJpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyIiwiaXNSYW5nZVN0YXJ0UXVhcnRlciIsImlzUmFuZ2VFbmRRdWFydGVyIiwiX3RoaXMkcHJvcHMxMyIsInNob3dGdWxsTW9udGhZZWFyUGlja2VyIiwicmVuZGVyTW9udGhDb250ZW50Iiwic2hvcnRNb250aFRleHQiLCJmdWxsTW9udGhUZXh0IiwiX3RoaXMkcHJvcHMxNCIsInJlbmRlclF1YXJ0ZXJDb250ZW50Iiwic2hvcnRRdWFydGVyIiwiX3RoaXMkcHJvcHMxNSIsIm1vbnRoQ29sdW1ucyIsImoiLCJldiIsIm9uTW9udGhLZXlEb3duIiwib25Nb250aE1vdXNlRW50ZXIiLCJnZXRNb250aENsYXNzTmFtZXMiLCJnZXRNb250aENvbnRlbnQiLCJfdGhpcyRwcm9wczE2IiwicXVhcnRlcnMiLCJvblF1YXJ0ZXJLZXlEb3duIiwib25RdWFydGVyTW91c2VFbnRlciIsImdldFF1YXJ0ZXJDbGFzc05hbWVzIiwiZ2V0UXVhcnRlclRhYkluZGV4IiwiaXNDdXJyZW50UXVhcnRlciIsImdldFF1YXJ0ZXJDb250ZW50IiwiX3RoaXMkcHJvcHMxNyIsInNob3dNb250aFllYXJQaWNrZXIiLCJzaG93UXVhcnRlclllYXJQaWNrZXIiLCJfdGhpcyRwcm9wczE4IiwiX3RoaXMkcHJvcHMxOCRhcmlhTGFiIiwiZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4IiwidHJpbSIsImhhbmRsZU1vdXNlTGVhdmUiLCJvblBvaW50ZXJMZWF2ZSIsInJlbmRlck1vbnRocyIsInJlbmRlclF1YXJ0ZXJzIiwicmVuZGVyV2Vla3MiLCJUaW1lIiwiaGVpZ2h0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2VudGVyTGkiLCJjYWxjQ2VudGVyUG9zaXRpb24iLCJtb250aFJlZiIsImhlYWRlciIsImNsYXNzZXMiLCJ0aW1lQ2xhc3NOYW1lIiwiaXNTZWxlY3RlZFRpbWUiLCJpc0Rpc2FibGVkVGltZSIsImluamVjdFRpbWVzIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJhY3RpdmVEYXRlIiwib3BlblRvRGF0ZSIsInNvcnRlZEluamVjdFRpbWVzIiwic29ydCIsImEiLCJiIiwibWludXRlc0luRGF5IiwibXVsdGlwbGllciIsInRpbWVzVG9JbmplY3QiLCJ0aW1lVG9Gb2N1cyIsInJlZHVjZSIsInByZXYiLCJsaUNsYXNzZXMiLCJsaSIsInNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lIiwidG9kYXlCdXR0b24iLCJzaG93VGltZVNlbGVjdE9ubHkiLCJ0aW1lQ2FwdGlvbiIsInJlbmRlclRpbWVzIiwib25UaW1lQ2hhbmdlIiwibGlzdEhlaWdodCIsImNlbnRlckxpUmVmIiwiWWVhciIsInJlZkluZGV4Iiwid2FpdEZvclJlUmVuZGVyIiwiWUVBUl9SRUZTIiwiX3V0aWxzJGdldFllYXJzUGVyaW9kIiwidXBkYXRlRm9jdXNPblBhZ2luYXRlIiwieSIsIl95ZWFyIiwiaGFuZGxlWWVhckNsaWNrIiwib25ZZWFyQ2xpY2siLCJoYW5kbGVZZWFyTmF2aWdhdGlvbiIsInllYXJDbGFzc05hbWUiLCJpc0N1cnJlbnRZZWFyIiwicHJlU2VsZWN0ZWQiLCJyZW5kZXJZZWFyQ29udGVudCIsIm9uWWVhck1vdXNlRW50ZXIiLCJvblllYXJNb3VzZUxlYXZlIiwiX3V0aWxzJGdldFllYXJzUGVyaW9kMiIsIl9sb29wIiwib25ZZWFyS2V5RG93biIsImdldFllYXJUYWJJbmRleCIsImdldFllYXJDbGFzc05hbWVzIiwiZ2V0WWVhckNvbnRlbnQiLCJnZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcyIsImNsZWFyU2VsZWN0aW5nRGF0ZSIsImlucHV0VGltZSIsInByb3BEYXRlIiwiaXNQcm9wRGF0ZVZhbGlkIiwiaXNOYU4iLCJzcGxpdCIsInRpbWVTdHJpbmciLCJjdXN0b21UaW1lSW5wdXQiLCJjbG9uZUVsZW1lbnQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJuYW1lIiwicmVxdWlyZWQiLCJ0aW1lSW5wdXRMYWJlbCIsInJlbmRlclRpbWVJbnB1dCIsImdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyIsIkNhbGVuZGFyQ29udGFpbmVyIiwiX3JlZiRzaG93VGltZVNlbGVjdE9uIiwiX3JlZiRzaG93VGltZSIsInNob3dUaW1lIiwiYXJpYUxhYmVsIiwiRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUyIsImlzRHJvcGRvd25TZWxlY3QiLCJlbGVtZW50IiwiY2xhc3NOYW1lcyIsInRlc3RDbGFzc25hbWUiLCJpbmRleE9mIiwiQ2FsZW5kYXIiLCJvbkRyb3Bkb3duRm9jdXMiLCJpbml0aWFsRGF0ZSIsImhhbmRsZU1vbnRoQ2hhbmdlIiwibW9udGhTZWxlY3RlZEluIiwib25Nb250aE1vdXNlTGVhdmUiLCJzZXRZZWFyIiwib25ZZWFyQ2hhbmdlIiwiaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UiLCJoYW5kbGVDdXN0b21Nb250aENoYW5nZSIsIm9uTW9udGhDaGFuZ2UiLCJoYW5kbGVNb250aFllYXJDaGFuZ2UiLCJkYXlOYW1lcyIsIndlZWtMYWJlbCIsIndlZWtEYXlOYW1lIiwiZm9ybWF0V2Vla2RheSIsIndlZWtEYXlDbGFzc05hbWUiLCJmb3JtYXRXZWVrRGF5IiwidXNlV2Vla2RheXNTaG9ydCIsInNob3dZZWFyUGlja2VyIiwicmVuZGVyQ3VzdG9tSGVhZGVyIiwiYWxsUHJldkRheXNEaXNhYmxlZCIsImZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiIsInNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiIsImljb25DbGFzc2VzIiwiY2xpY2tIYW5kbGVyIiwiZGVjcmVhc2VNb250aCIsImRlY3JlYXNlWWVhciIsImlzRm9yWWVhciIsInByZXZpb3VzTW9udGhCdXR0b25MYWJlbCIsInByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIiwiX3RoaXMkcHJvcHMzJHByZXZpb3VzIiwicHJldmlvdXNNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91czIiLCJwcmV2aW91c1llYXJBcmlhTGFiZWwiLCJhbGxOZXh0RGF5c0Rpc2FibGVkIiwic2hvd1RpbWVTZWxlY3QiLCJpbmNyZWFzZU1vbnRoIiwiaW5jcmVhc2VZZWFyIiwibmV4dE1vbnRoQnV0dG9uTGFiZWwiLCJuZXh0WWVhckJ1dHRvbkxhYmVsIiwiX3RoaXMkcHJvcHM1JG5leHRNb250IiwibmV4dE1vbnRoQXJpYUxhYmVsIiwiX3RoaXMkcHJvcHM1JG5leHRZZWFyIiwibmV4dFllYXJBcmlhTGFiZWwiLCJzaG93WWVhckRyb3Bkb3duIiwic2hvd01vbnRoRHJvcGRvd24iLCJzaG93TW9udGhZZWFyRHJvcGRvd24iLCJvdmVycmlkZUhpZGUiLCJjaGFuZ2VZZWFyIiwiY2hhbmdlTW9udGgiLCJjaGFuZ2VNb250aFllYXIiLCJoYW5kbGVUb2RheUJ1dHRvbkNsaWNrIiwibW9udGhEYXRlIiwicmVuZGVyQ3VycmVudE1vbnRoIiwib25Gb2N1cyIsImhhbmRsZURyb3Bkb3duRm9jdXMiLCJyZW5kZXJNb250aERyb3Bkb3duIiwicmVuZGVyTW9udGhZZWFyRHJvcGRvd24iLCJyZW5kZXJZZWFyRHJvcGRvd24iLCJoZWFkZXJBcmdzIiwibW9udGhDb250YWluZXIiLCJwcmV2TW9udGhCdXR0b25EaXNhYmxlZCIsIm5leHRNb250aEJ1dHRvbkRpc2FibGVkIiwicHJldlllYXJCdXR0b25EaXNhYmxlZCIsIm5leHRZZWFyQnV0dG9uRGlzYWJsZWQiLCJzaG93RGF5TmFtZXMiLCJfb2JqZWN0U3ByZWFkIiwiY3VzdG9tSGVhZGVyQ291bnQiLCJyZW5kZXJZZWFySGVhZGVyIiwicmVuZGVyRGVmYXVsdEhlYWRlciIsIl90aGlzJHByb3BzJG1vbnRoU2VsZSIsIm1vbnRoTGlzdCIsIm1vbnRoc1RvU3VidHJhY3QiLCJzaG93UHJldmlvdXNNb250aHMiLCJtb250aHNTaG93biIsImZyb21Nb250aERhdGUiLCJtb250aHNUb0FkZCIsIm1vbnRoS2V5IiwiZGl2IiwicmVuZGVySGVhZGVyIiwibW9udGhBcmlhTGFiZWxQcmVmaXgiLCJoYW5kbGVPbkRheUtleURvd24iLCJoYW5kbGVNb250aE1vdXNlTGVhdmUiLCJfZXh0ZW5kcyIsImhhbmRsZVllYXJNb3VzZUVudGVyIiwiaGFuZGxlWWVhck1vdXNlTGVhdmUiLCJ0aW1lRm9ybWF0IiwidGltZUludGVydmFscyIsIndpdGhQb3J0YWwiLCJ0aW1lVmFsaWQiLCJCb29sZWFuIiwic2hvd1RpbWVJbnB1dCIsIklucHV0VGltZSIsImFyaWFMaXZlTWVzc2FnZSIsImdldERhdGVJblZpZXciLCJhc3NpZ25Nb250aENvbnRhaW5lciIsIl90aGlzMyIsImhhc01vbnRoQ2hhbmdlZCIsIkNvbnRhaW5lciIsImNvbnRhaW5lciIsImRpc3BsYXkiLCJyZW5kZXJBcmlhTGl2ZVJlZ2lvbiIsInJlbmRlclByZXZpb3VzQnV0dG9uIiwicmVuZGVyTmV4dEJ1dHRvbiIsInJlbmRlclllYXJzIiwicmVuZGVyVG9kYXlCdXR0b24iLCJyZW5kZXJUaW1lU2VjdGlvbiIsInJlbmRlcklucHV0VGltZVNlY3Rpb24iLCJyZW5kZXJDaGlsZHJlbiIsIkNhbGVuZGFySWNvbiIsImljb24iLCJfcmVmJGNsYXNzTmFtZSIsImRlZmF1bHRDbGFzcyIsImlzVmFsaWRFbGVtZW50IiwieG1sbnMiLCJ2aWV3Qm94IiwiUG9ydGFsIiwiZWwiLCJwb3J0YWxSb290IiwicG9ydGFsSG9zdCIsImdldEVsZW1lbnRCeUlkIiwicG9ydGFsSWQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlQ2hpbGQiLCJSZWFjdERPTSIsImNyZWF0ZVBvcnRhbCIsImZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IiLCJmb2N1c2FibGVGaWx0ZXIiLCJub2RlIiwiZGlzYWJsZWQiLCJUYWJMb29wIiwicHJvdG90eXBlIiwiY2FsbCIsInRhYkxvb3BSZWYiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiQ2hpbGRyZW4iLCJnZXRUYWJDaGlsZHJlbiIsImVuYWJsZVRhYkxvb3AiLCJoYW5kbGVGb2N1c1N0YXJ0IiwiaGFuZGxlRm9jdXNFbmQiLCJ3aXRoRmxvYXRpbmciLCJXaXRoRmxvYXRpbmciLCJhbHRfcHJvcHMiLCJwb3BwZXJNb2RpZmllcnMiLCJwb3BwZXJQcm9wcyIsImhpZGVQb3BwZXIiLCJhcnJvd1JlZiIsInVzZVJlZiIsImZsb2F0aW5nUHJvcHMiLCJ1c2VGbG9hdGluZyIsIm9wZW4iLCJ3aGlsZUVsZW1lbnRzTW91bnRlZCIsImF1dG9VcGRhdGUiLCJwbGFjZW1lbnQiLCJwb3BwZXJQbGFjZW1lbnQiLCJtaWRkbGV3YXJlIiwiZmxpcCIsInBhZGRpbmciLCJhcnJvdyIsIlBvcHBlckNvbXBvbmVudCIsIndyYXBwZXJDbGFzc05hbWUiLCJwb3BwZXJDb21wb25lbnQiLCJ0YXJnZXRDb21wb25lbnQiLCJwb3BwZXJPbktleURvd24iLCJzaG93QXJyb3ciLCJwb3BwZXIiLCJyZWZzIiwic2V0RmxvYXRpbmciLCJmbG9hdGluZ1N0eWxlcyIsIkZsb2F0aW5nQXJyb3ciLCJjb250ZXh0IiwiZmlsbCIsInN0cm9rZVdpZHRoIiwid2lkdGgiLCJ0cmFuc2Zvcm0iLCJwb3BwZXJDb250YWluZXIiLCJ3cmFwcGVyQ2xhc3NlcyIsIkZyYWdtZW50Iiwic2V0UmVmZXJlbmNlIiwib3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MiLCJXcmFwcGVkQ2FsZW5kYXIiLCJoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkIiwiSU5QVVRfRVJSXzEiLCJEYXRlUGlja2VyIiwiX3RoaXMkcHJvcHMkaG9saWRheXMiLCJhY2N1bXVsYXRvciIsImRlZmF1bHRQcmVTZWxlY3Rpb24iLCJnZXRQcmVTZWxlY3Rpb24iLCJib3VuZGVkUHJlU2VsZWN0aW9uIiwic3RhcnRPcGVuIiwicHJldmVudEZvY3VzIiwiZm9jdXNlZCIsInByZXZlbnRGb2N1c1RpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJpbnB1dCIsImJsdXIiLCJjYW5jZWxGb2N1c0lucHV0Iiwic2tpcFNldEJsdXIiLCJjYWxjSW5pdGlhbFN0YXRlIiwibGFzdFByZVNlbGVjdENoYW5nZSIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFIiwic2V0Qmx1ciIsImlucHV0VmFsdWUiLCJyZWFkT25seSIsInByZXZlbnRPcGVuT25Gb2N1cyIsImNsZWFyUHJldmVudEZvY3VzVGltZW91dCIsInNldFRpbWVvdXQiLCJzZXRGb2N1cyIsImlucHV0Rm9jdXNUaW1lb3V0Iiwib25CbHVyIiwiYWxsQXJncyIsIm9uQ2hhbmdlUmF3IiwiaXNEZWZhdWx0UHJldmVudGVkIiwiUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQiLCJob3VycyIsIm1pbnV0ZXMiLCJzZXRTZWxlY3RlZCIsInNlbmRGb2N1c0JhY2tUb0lucHV0Iiwic2hvd0RhdGVTZWxlY3QiLCJrZWVwSW5wdXQiLCJzd2FwUmFuZ2UiLCJhbGxvd1NhbWVEYXkiLCJmb2N1c1NlbGVjdGVkTW9udGgiLCJub1JhbmdlcyIsImhhc1N0YXJ0UmFuZ2UiLCJpc1JhbmdlRmlsbGVkIiwiaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCIsInNlbGVjdGVkRGF0ZSIsIm5leHREYXRlcyIsImhhc01pbkRhdGUiLCJoYXNNYXhEYXRlIiwiaXNWYWxpZERhdGVTZWxlY3Rpb24iLCJkYXRlU3RhcnRPZkRheSIsIm1pbkRhdGVTdGFydE9mRGF5IiwibWF4RGF0ZUVuZE9mRGF5Iiwib25JbnB1dENsaWNrIiwic2VsZWN0b3JTdHJpbmciLCJzZWxlY3RlZEl0ZW0iLCJjYWxlbmRhciIsImNvbXBvbmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiY29weSIsImlucHV0T2siLCJoYW5kbGVTZWxlY3QiLCJvbklucHV0RXJyb3IiLCJjb2RlIiwibXNnIiwiaXNTaGlmdEtleUFjdGl2ZSIsInNoaWZ0S2V5IiwibmV3U2VsZWN0aW9uIiwic3ViV2Vla3MiLCJzdWJEYXlzIiwiYWRkV2Vla3MiLCJwcmV2TW9udGgiLCJwcmV2WWVhciIsIm9uQ2xlYXJDbGljayIsImNsb3NlT25TY3JvbGwiLCJkb2N1bWVudEVsZW1lbnQiLCJpc0NhbGVuZGFyT3BlbiIsImVsZW0iLCJkYXRlRm9ybWF0Q2FsZW5kYXIiLCJoYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZSIsIm1vZGlmeUhvbGlkYXlzIiwiaGFuZGxlVGltZUNoYW5nZSIsImNhbGVuZGFyQ2xhc3NOYW1lIiwiY2FsZW5kYXJDb250YWluZXIiLCJleGNsdWRlU2Nyb2xsYmFyIiwib25EYXlLZXlEb3duIiwiaXNDb250YWluc1RpbWUiLCJsb25nRGF0ZUZvcm1hdCIsIl9SZWFjdCRjbG9uZUVsZW1lbnQiLCJjdXN0b21JbnB1dCIsImN1c3RvbUlucHV0UmVmIiwiaGFuZGxlQmx1ciIsImhhbmRsZUNoYW5nZSIsImhhbmRsZUZvY3VzIiwib25JbnB1dEtleURvd24iLCJpZCIsImZvcm0iLCJhdXRvRm9jdXMiLCJwbGFjZWhvbGRlclRleHQiLCJhdXRvQ29tcGxldGUiLCJhcmlhRGVzY3JpYmVkQnkiLCJhcmlhSW52YWxpZCIsImFyaWFMYWJlbGxlZEJ5IiwiYXJpYVJlcXVpcmVkIiwiaXNDbGVhcmFibGUiLCJjbGVhckJ1dHRvblRpdGxlIiwiX3RoaXMkcHJvcHM0JGNsZWFyQnV0IiwiY2xlYXJCdXR0b25DbGFzc05hbWUiLCJfdGhpcyRwcm9wczQkYXJpYUxhYmUiLCJhcmlhTGFiZWxDbG9zZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblNjcm9sbCIsInByZXZTdGF0ZSIsIm9uQ2FsZW5kYXJPcGVuIiwib25DYWxlbmRhckNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlcklucHV0Q29udGFpbmVyIiwic2hvd0ljb24iLCJjYWxlbmRhckljb25DbGFzc25hbWUiLCJ0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIiwidG9nZ2xlQ2FsZW5kYXIiLCJyZW5kZXJEYXRlSW5wdXQiLCJyZW5kZXJDbGVhckJ1dHRvbiIsInJlbmRlckNhbGVuZGFyIiwicG9ydGFsQ29udGFpbmVyIiwib25Qb3J0YWxLZXlEb3duIiwicG9wcGVyQ2xhc3NOYW1lIiwib25Qb3BwZXJLZXlEb3duIiwic2hvd1BvcHBlckFycm93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
