/*!
  react-datepicker v6.7.1
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGVfdXRpbHMuanMiLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9kYXkuanN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLmpzeCIsIi4uL3NyYy93ZWVrLmpzeCIsIi4uL3NyYy9tb250aC5qc3giLCIuLi9zcmMvdGltZS5qc3giLCIuLi9zcmMveWVhci5qc3giLCIuLi9zcmMvaW5wdXRUaW1lLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIuanN4IiwiLi4vc3JjL2NhbGVuZGFyLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLmpzeCIsIi4uL3NyYy9wb3J0YWwuanN4IiwiLi4vc3JjL3RhYl9sb29wLmpzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLmpzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LmpzeCIsIi4uL3NyYy9pbmRleC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSBcImRhdGUtZm5zL2lzRGF0ZVwiO1xuaW1wb3J0IHsgaXNWYWxpZCBhcyBpc1ZhbGlkRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGxvbmdGb3JtYXR0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2Zvcm1hdFwiO1xuaW1wb3J0IHsgYWRkTWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9hZGRNaW51dGVzXCI7XG5pbXBvcnQgeyBhZGRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9hZGRIb3Vyc1wiO1xuaW1wb3J0IHsgYWRkRGF5cyB9IGZyb20gXCJkYXRlLWZucy9hZGREYXlzXCI7XG5pbXBvcnQgeyBhZGRXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9hZGRXZWVrc1wiO1xuaW1wb3J0IHsgYWRkTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2FkZE1vbnRoc1wiO1xuaW1wb3J0IHsgYWRkUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkUXVhcnRlcnNcIjtcbmltcG9ydCB7IGFkZFllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFllYXJzXCI7XG5pbXBvcnQgeyBzdWJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL3N1YkRheXNcIjtcbmltcG9ydCB7IHN1YldlZWtzIH0gZnJvbSBcImRhdGUtZm5zL3N1YldlZWtzXCI7XG5pbXBvcnQgeyBzdWJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViTW9udGhzXCI7XG5pbXBvcnQgeyBzdWJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9zdWJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3ViWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViWWVhcnNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0U2Vjb25kc1wiO1xuaW1wb3J0IHsgZ2V0TWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9nZXRNaW51dGVzXCI7XG5pbXBvcnQgeyBnZXRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9nZXRIb3Vyc1wiO1xuaW1wb3J0IHsgZ2V0RGF5IH0gZnJvbSBcImRhdGUtZm5zL2dldERheVwiO1xuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXRlXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrIH0gZnJvbSBcImRhdGUtZm5zL2dldElTT1dlZWtcIjtcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2dldE1vbnRoXCI7XG5pbXBvcnQgeyBnZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2dldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0WWVhclwiO1xuaW1wb3J0IHsgZ2V0VGltZSB9IGZyb20gXCJkYXRlLWZucy9nZXRUaW1lXCI7XG5pbXBvcnQgeyBzZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL3NldFNlY29uZHNcIjtcbmltcG9ydCB7IHNldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0TWludXRlc1wiO1xuaW1wb3J0IHsgc2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0SG91cnNcIjtcbmltcG9ydCB7IHNldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3NldE1vbnRoXCI7XG5pbXBvcnQgeyBzZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3NldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IHNldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0WWVhclwiO1xuaW1wb3J0IHsgbWluIH0gZnJvbSBcImRhdGUtZm5zL21pblwiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcImRhdGUtZm5zL21heFwiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFyc1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZEYXlcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZXZWVrXCI7XG5pbXBvcnQgeyBzdGFydE9mTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZk1vbnRoXCI7XG5pbXBvcnQgeyBzdGFydE9mUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mUXVhcnRlclwiO1xuaW1wb3J0IHsgc3RhcnRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlllYXJcIjtcbmltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZldlZWsgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZXZWVrXCI7XG5pbXBvcnQgeyBlbmRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mTW9udGhcIjtcbmltcG9ydCB7IGVuZE9mWWVhciB9IGZyb20gXCJkYXRlLWZucy9lbmRPZlllYXJcIjtcbmltcG9ydCB7IGlzRXF1YWwgYXMgZGZJc0VxdWFsIH0gZnJvbSBcImRhdGUtZm5zL2lzRXF1YWxcIjtcbmltcG9ydCB7IGlzU2FtZURheSBhcyBkZklzU2FtZURheSB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVEYXlcIjtcbmltcG9ydCB7IGlzU2FtZU1vbnRoIGFzIGRmSXNTYW1lTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lTW9udGhcIjtcbmltcG9ydCB7IGlzU2FtZVllYXIgYXMgZGZJc1NhbWVZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVllYXJcIjtcbmltcG9ydCB7IGlzU2FtZVF1YXJ0ZXIgYXMgZGZJc1NhbWVRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZVF1YXJ0ZXJcIjtcbmltcG9ydCB7IGlzQWZ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNBZnRlclwiO1xuaW1wb3J0IHsgaXNCZWZvcmUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNCZWZvcmVcIjtcbmltcG9ydCB7IGlzV2l0aGluSW50ZXJ2YWwgfSBmcm9tIFwiZGF0ZS1mbnMvaXNXaXRoaW5JbnRlcnZhbFwiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcImRhdGUtZm5zL3RvRGF0ZVwiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZGF0ZS1mbnMvcGFyc2VcIjtcbmltcG9ydCB7IHBhcnNlSVNPIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlSVNPXCI7XG5pbXBvcnQgeyBhZGRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgPSAxMjtcblxuLy8gVGhpcyBSZWdFeHAgY2F0Y2hlcyBzeW1ib2xzIGVzY2FwZWQgYnkgcXVvdGVzLCBhbmQgYWxzb1xuLy8gc2VxdWVuY2VzIG9mIHN5bWJvbHMgUCwgcCwgYW5kIHRoZSBjb21iaW5hdGlvbnMgbGlrZSBgUFBQUFBQUHBwcHBwYFxuY29uc3QgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcblxuLy8gKiogRGF0ZSBDb25zdHJ1Y3RvcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0RhdGUodmFsdWUpIHtcbiAgY29uc3QgZCA9IHZhbHVlXG4gICAgPyB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmdcbiAgICAgID8gcGFyc2VJU08odmFsdWUpXG4gICAgICA6IHRvRGF0ZSh2YWx1ZSlcbiAgICA6IG5ldyBEYXRlKCk7XG4gIHJldHVybiBpc1ZhbGlkKGQpID8gZCA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGUodmFsdWUsIGRhdGVGb3JtYXQsIGxvY2FsZSwgc3RyaWN0UGFyc2luZywgbWluRGF0ZSkge1xuICBsZXQgcGFyc2VkRGF0ZSA9IG51bGw7XG4gIGxldCBsb2NhbGVPYmplY3QgPVxuICAgIGdldExvY2FsZU9iamVjdChsb2NhbGUpIHx8IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICBsZXQgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPSB0cnVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSkge1xuICAgIGRhdGVGb3JtYXQuZm9yRWFjaCgoZGYpID0+IHtcbiAgICAgIGxldCB0cnlQYXJzZURhdGUgPSBwYXJzZSh2YWx1ZSwgZGYsIG5ldyBEYXRlKCksIHtcbiAgICAgICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICAgICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgICAgIGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJlxuICAgICAgICAgIHZhbHVlID09PSBmb3JtYXREYXRlKHRyeVBhcnNlRGF0ZSwgZGYsIGxvY2FsZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNWYWxpZCh0cnlQYXJzZURhdGUsIG1pbkRhdGUpICYmIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoKSB7XG4gICAgICAgIHBhcnNlZERhdGUgPSB0cnlQYXJzZURhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlZERhdGU7XG4gIH1cblxuICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQsIG5ldyBEYXRlKCksIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iamVjdCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG5cbiAgaWYgKHN0cmljdFBhcnNpbmcpIHtcbiAgICBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9XG4gICAgICBpc1ZhbGlkKHBhcnNlZERhdGUpICYmXG4gICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZShwYXJzZWREYXRlLCBkYXRlRm9ybWF0LCBsb2NhbGUpO1xuICB9IGVsc2UgaWYgKCFpc1ZhbGlkKHBhcnNlZERhdGUpKSB7XG4gICAgZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXRcbiAgICAgIC5tYXRjaChsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgICBjb25zdCBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcInBcIiB8fCBmaXJzdENoYXJhY3RlciA9PT0gXCJQXCIpIHtcbiAgICAgICAgICBjb25zdCBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgICAgIHJldHVybiBsb2NhbGVPYmplY3RcbiAgICAgICAgICAgID8gbG9uZ0Zvcm1hdHRlcihzdWJzdHJpbmcsIGxvY2FsZU9iamVjdC5mb3JtYXRMb25nKVxuICAgICAgICAgICAgOiBmaXJzdENoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgICAgfSlcbiAgICAgIC5qb2luKFwiXCIpO1xuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHBhcnNlZERhdGUgPSBwYXJzZSh2YWx1ZSwgZGF0ZUZvcm1hdC5zbGljZSgwLCB2YWx1ZS5sZW5ndGgpLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgICAgcGFyc2VkRGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXNWYWxpZChwYXJzZWREYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA/IHBhcnNlZERhdGUgOiBudWxsO1xufVxuXG4vLyAqKiBEYXRlIFwiUmVmbGVjdGlvblwiICoqXG5cbmV4cG9ydCB7IGlzRGF0ZSB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChkYXRlLCBtaW5EYXRlKSB7XG4gIG1pbkRhdGUgPSBtaW5EYXRlID8gbWluRGF0ZSA6IG5ldyBEYXRlKFwiMS8xLzEwMDBcIik7XG4gIHJldHVybiBpc1ZhbGlkRGF0ZShkYXRlKSAmJiAhaXNCZWZvcmUoZGF0ZSwgbWluRGF0ZSk7XG59XG5cbi8vICoqIERhdGUgRm9ybWF0dGluZyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXRTdHIsIGxvY2FsZSkge1xuICBpZiAobG9jYWxlID09PSBcImVuXCIpIHtcbiAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICBsZXQgbG9jYWxlT2JqID0gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSk7XG4gIGlmIChsb2NhbGUgJiYgIWxvY2FsZU9iaikge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBBIGxvY2FsZSBvYmplY3Qgd2FzIG5vdCBmb3VuZCBmb3IgdGhlIHByb3ZpZGVkIHN0cmluZyBbXCIke2xvY2FsZX1cIl0uYCxcbiAgICApO1xuICB9XG4gIGlmIChcbiAgICAhbG9jYWxlT2JqICYmXG4gICAgISFnZXREZWZhdWx0TG9jYWxlKCkgJiZcbiAgICAhIWdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpXG4gICkge1xuICAgIGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICB9XG4gIHJldHVybiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmogPyBsb2NhbGVPYmogOiBudWxsLFxuICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlRm9ybWF0KGRhdGUsIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0pIHtcbiAgcmV0dXJuIChcbiAgICAoZGF0ZSAmJlxuICAgICAgZm9ybWF0RGF0ZShcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgQXJyYXkuaXNBcnJheShkYXRlRm9ybWF0KSA/IGRhdGVGb3JtYXRbMF0gOiBkYXRlRm9ybWF0LFxuICAgICAgICBsb2NhbGUsXG4gICAgICApKSB8fFxuICAgIFwiXCJcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVEYXRlUmFuZ2VGb3JtYXQoc3RhcnREYXRlLCBlbmREYXRlLCBwcm9wcykge1xuICBpZiAoIXN0YXJ0RGF0ZSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVkU3RhcnREYXRlID0gc2FmZURhdGVGb3JtYXQoc3RhcnREYXRlLCBwcm9wcyk7XG4gIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSBlbmREYXRlID8gc2FmZURhdGVGb3JtYXQoZW5kRGF0ZSwgcHJvcHMpIDogXCJcIjtcblxuICByZXR1cm4gYCR7Zm9ybWF0dGVkU3RhcnREYXRlfSAtICR7Zm9ybWF0dGVkRW5kRGF0ZX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQoZGF0ZXMsIHByb3BzKSB7XG4gIGlmICghZGF0ZXM/Lmxlbmd0aCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG4gIGNvbnN0IGZvcm1hdHRlZEZpcnN0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzBdLCBwcm9wcyk7XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkRmlyc3REYXRlO1xuICB9XG4gIGlmIChkYXRlcy5sZW5ndGggPT09IDIpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmREYXRlID0gc2FmZURhdGVGb3JtYXQoZGF0ZXNbMV0sIHByb3BzKTtcbiAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSwgJHtmb3JtYXR0ZWRTZWNvbmREYXRlfWA7XG4gIH1cblxuICBjb25zdCBleHRyYURhdGVzQ291bnQgPSBkYXRlcy5sZW5ndGggLSAxO1xuICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3REYXRlfSAoKyR7ZXh0cmFEYXRlc0NvdW50fSlgO1xufVxuXG4vLyAqKiBEYXRlIFNldHRlcnMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWUoZGF0ZSwgeyBob3VyID0gMCwgbWludXRlID0gMCwgc2Vjb25kID0gMCB9KSB7XG4gIHJldHVybiBzZXRIb3VycyhzZXRNaW51dGVzKHNldFNlY29uZHMoZGF0ZSwgc2Vjb25kKSwgbWludXRlKSwgaG91cik7XG59XG5cbmV4cG9ydCB7IHNldE1pbnV0ZXMsIHNldEhvdXJzLCBzZXRNb250aCwgc2V0UXVhcnRlciwgc2V0WWVhciB9O1xuXG4vLyAqKiBEYXRlIEdldHRlcnMgKipcblxuLy8gZ2V0RGF5IFJldHVybnMgZGF5IG9mIHdlZWssIGdldERhdGUgcmV0dXJucyBkYXkgb2YgbW9udGhcbmV4cG9ydCB7XG4gIGdldFNlY29uZHMsXG4gIGdldE1pbnV0ZXMsXG4gIGdldEhvdXJzLFxuICBnZXRNb250aCxcbiAgZ2V0UXVhcnRlcixcbiAgZ2V0WWVhcixcbiAgZ2V0RGF5LFxuICBnZXREYXRlLFxuICBnZXRUaW1lLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWsoZGF0ZSwgbG9jYWxlKSB7XG4gIGxldCBsb2NhbGVPYmogPVxuICAgIChsb2NhbGUgJiYgZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSkpIHx8XG4gICAgKGdldERlZmF1bHRMb2NhbGUoKSAmJiBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKSk7XG4gIHJldHVybiBnZXRJU09XZWVrKGRhdGUsIGxvY2FsZU9iaiA/IHsgbG9jYWxlOiBsb2NhbGVPYmogfSA6IG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrQ29kZShkYXksIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXksIFwiZGRkXCIsIGxvY2FsZSk7XG59XG5cbi8vICoqKiBTdGFydCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZEYXkoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZkRheShkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZXZWVrKGRhdGUsIGxvY2FsZSwgY2FsZW5kYXJTdGFydERheSkge1xuICBsZXQgbG9jYWxlT2JqID0gbG9jYWxlXG4gICAgPyBnZXRMb2NhbGVPYmplY3QobG9jYWxlKVxuICAgIDogZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIHJldHVybiBzdGFydE9mV2VlayhkYXRlLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmosXG4gICAgd2Vla1N0YXJ0c09uOiBjYWxlbmRhclN0YXJ0RGF5LFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZNb250aChkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mTW9udGgoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mWWVhcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mWWVhcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZRdWFydGVyKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZRdWFydGVyKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlRvZGF5KCkge1xuICByZXR1cm4gc3RhcnRPZkRheShuZXdEYXRlKCkpO1xufVxuXG4vLyAqKiogRW5kIG9mICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kT2ZXZWVrKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mV2VlayhkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gZW5kT2ZNb250aChkYXRlKTtcbn1cblxuLy8gKiogRGF0ZSBNYXRoICoqXG5cbi8vICoqKiBBZGRpdGlvbiAqKipcblxuZXhwb3J0IHtcbiAgYWRkU2Vjb25kcyxcbiAgYWRkTWludXRlcyxcbiAgYWRkRGF5cyxcbiAgYWRkV2Vla3MsXG4gIGFkZE1vbnRocyxcbiAgYWRkUXVhcnRlcnMsXG4gIGFkZFllYXJzLFxufTtcblxuLy8gKioqIFN1YnRyYWN0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRIb3Vycywgc3ViRGF5cywgc3ViV2Vla3MsIHN1Yk1vbnRocywgc3ViUXVhcnRlcnMsIHN1YlllYXJzIH07XG5cbi8vICoqIERhdGUgQ29tcGFyaXNvbiAqKlxuXG5leHBvcnQgeyBpc0JlZm9yZSwgaXNBZnRlciB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZURheShkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc0VxdWFsKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZkRheShzdGFydERhdGUpO1xuICBjb25zdCBlbmQgPSBlbmRPZkRheShlbmREYXRlKTtcblxuICB0cnkge1xuICAgIHZhbGlkID0gaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbi8vICoqKiBEaWZmaW5nICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTEsIGRhdGUyKSB7XG4gIHJldHVybiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZTEsIGRhdGUyKTtcbn1cblxuLy8gKiogRGF0ZSBMb2NhbGl6YXRpb24gKipcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZU5hbWUsIGxvY2FsZURhdGEpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBpZiAoIXNjb3BlLl9fbG9jYWxlRGF0YV9fKSB7XG4gICAgc2NvcGUuX19sb2NhbGVEYXRhX18gPSB7fTtcbiAgfVxuICBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVOYW1lXSA9IGxvY2FsZURhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0TG9jYWxlKGxvY2FsZU5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBzY29wZS5fX2xvY2FsZUlkX18gPSBsb2NhbGVOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdExvY2FsZSgpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICByZXR1cm4gc2NvcGUuX19sb2NhbGVJZF9fO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZVNwZWMpIHtcbiAgaWYgKHR5cGVvZiBsb2NhbGVTcGVjID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSBsb2NhbGUgbmFtZSByZWdpc3RlcmVkIGJ5IHJlZ2lzdGVyTG9jYWxlXG4gICAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcbiAgICByZXR1cm4gc2NvcGUuX19sb2NhbGVEYXRhX18gPyBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVTcGVjXSA6IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSByYXcgZGF0ZS1mbnMgbG9jYWxlIG9iamVjdFxuICAgIHJldHVybiBsb2NhbGVTcGVjO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF0ZSwgZm9ybWF0RnVuYywgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXRGdW5jKGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFXCIsIGxvY2FsZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhTaG9ydEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxdWFydGVyLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0UXVhcnRlcihuZXdEYXRlKCksIHF1YXJ0ZXIpLCBcIlFRUVwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiBVdGlscyBmb3Igc29tZSBjb21wb25lbnRzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheURpc2FibGVkKFxuICBkYXksXG4gIHtcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICAgZXhjbHVkZURhdGVzLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGluY2x1ZGVEYXRlcyxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFscyxcbiAgICBmaWx0ZXJEYXRlLFxuICB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lRGF5KGRheSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXkpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlFeGNsdWRlZChcbiAgZGF5LFxuICB7IGV4Y2x1ZGVEYXRlcywgZXhjbHVkZURhdGVJbnRlcnZhbHMgfSA9IHt9LFxuKSB7XG4gIGlmIChleGNsdWRlRGF0ZUludGVydmFscyAmJiBleGNsdWRlRGF0ZUludGVydmFscy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhEaXNhYmxlZChcbiAgbW9udGgsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhtb250aCwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZk1vbnRoKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZNb250aChtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShtb250aCkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoSW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIG0sIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVNb250aCA9IGdldE1vbnRoKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZU1vbnRoID0gZ2V0TW9udGgoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZU1vbnRoIDw9IG0gJiYgbSA8PSBlbmREYXRlTW9udGg7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZU1vbnRoIDw9IG0pIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZU1vbnRoID49IG0pIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckRpc2FibGVkKFxuICBxdWFydGVyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMocXVhcnRlciwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBpbmNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUocXVhcnRlcikpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnRcbiAqIEBwYXJhbSB7RGF0ZX0gZW5kXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckluUmFuZ2UoeWVhciwgc3RhcnQsIGVuZCkge1xuICBpZiAoIWlzVmFsaWREYXRlKHN0YXJ0KSB8fCAhaXNWYWxpZERhdGUoZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzdGFydFllYXIgPSBnZXRZZWFyKHN0YXJ0KTtcbiAgY29uc3QgZW5kWWVhciA9IGdldFllYXIoZW5kKTtcblxuICByZXR1cm4gc3RhcnRZZWFyIDw9IHllYXIgJiYgZW5kWWVhciA+PSB5ZWFyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFyRGlzYWJsZWQoXG4gIHllYXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCAwLCAxKTtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRhdGUsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZZZWFyKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZZZWFyKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF0ZSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVRdWFydGVyIDw9IHEgJiYgcSA8PSBlbmREYXRlUXVhcnRlcjtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlUXVhcnRlciA8PSBxKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVRdWFydGVyID49IHEpIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSA9IHt9KSB7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWluRGF0ZSkgPCAwKSB8fFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1heERhdGUpID4gMClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluTGlzdCh0aW1lLCB0aW1lcykge1xuICByZXR1cm4gdGltZXMuc29tZShcbiAgICAobGlzdFRpbWUpID0+XG4gICAgICBnZXRIb3VycyhsaXN0VGltZSkgPT09IGdldEhvdXJzKHRpbWUpICYmXG4gICAgICBnZXRNaW51dGVzKGxpc3RUaW1lKSA9PT0gZ2V0TWludXRlcyh0aW1lKSxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZURpc2FibGVkKFxuICB0aW1lLFxuICB7IGV4Y2x1ZGVUaW1lcywgaW5jbHVkZVRpbWVzLCBmaWx0ZXJUaW1lIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIChleGNsdWRlVGltZXMgJiYgaXNUaW1lSW5MaXN0KHRpbWUsIGV4Y2x1ZGVUaW1lcykpIHx8XG4gICAgKGluY2x1ZGVUaW1lcyAmJiAhaXNUaW1lSW5MaXN0KHRpbWUsIGluY2x1ZGVUaW1lcykpIHx8XG4gICAgKGZpbHRlclRpbWUgJiYgIWZpbHRlclRpbWUodGltZSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB7IG1pblRpbWUsIG1heFRpbWUgfSkge1xuICBpZiAoIW1pblRpbWUgfHwgIW1heFRpbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb3RoIG1pblRpbWUgYW5kIG1heFRpbWUgcHJvcHMgcmVxdWlyZWRcIik7XG4gIH1cbiAgY29uc3QgYmFzZSA9IG5ld0RhdGUoKTtcbiAgY29uc3QgYmFzZVRpbWUgPSBzZXRIb3VycyhzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXModGltZSkpLCBnZXRIb3Vycyh0aW1lKSk7XG4gIGNvbnN0IG1pbiA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtaW5UaW1lKSksXG4gICAgZ2V0SG91cnMobWluVGltZSksXG4gICk7XG4gIGNvbnN0IG1heCA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtYXhUaW1lKSksXG4gICAgZ2V0SG91cnMobWF4VGltZSksXG4gICk7XG5cbiAgbGV0IHZhbGlkO1xuICB0cnkge1xuICAgIHZhbGlkID0gIWlzV2l0aGluSW50ZXJ2YWwoYmFzZVRpbWUsIHsgc3RhcnQ6IG1pbiwgZW5kOiBtYXggfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c01vbnRoID0gc3ViTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobWluRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGluY2x1ZGVEYXRlLCBwcmV2aW91c01vbnRoKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQWZ0ZXIoZGF5LCB7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEJlZm9yZShkYXRlLCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgZmlyc3REYXRlT2ZZZWFyID0gc3RhcnRPZlllYXIoZGF0ZSk7XG4gIGNvbnN0IHByZXZpb3VzUXVhcnRlciA9IHN1YlF1YXJ0ZXJzKGZpcnN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG1pbkRhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMoaW5jbHVkZURhdGUsIHByZXZpb3VzUXVhcnRlcikgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVhcnRlckRpc2FibGVkQWZ0ZXIoZGF0ZSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGxhc3REYXRlT2ZZZWFyID0gZW5kT2ZZZWFyKGRhdGUpO1xuICBjb25zdCBuZXh0UXVhcnRlciA9IGFkZFF1YXJ0ZXJzKGxhc3REYXRlT2ZZZWFyLCAxKTtcblxuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMobmV4dFF1YXJ0ZXIsIG1heERhdGUpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhckRpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IHN1YlllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhtaW5EYXRlLCBwcmV2aW91c1llYXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1llYXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJzRGlzYWJsZWRCZWZvcmUoXG4gIGRheSxcbiAgeyBtaW5EYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgcHJldmlvdXNZZWFyID0gZ2V0U3RhcnRPZlllYXIoc3ViWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcikpO1xuICBjb25zdCB7IGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QocHJldmlvdXNZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1pbkRhdGVZZWFyID0gbWluRGF0ZSAmJiBnZXRZZWFyKG1pbkRhdGUpO1xuICByZXR1cm4gKG1pbkRhdGVZZWFyICYmIG1pbkRhdGVZZWFyID4gZW5kUGVyaW9kKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobmV4dFllYXIsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQWZ0ZXIoXG4gIGRheSxcbiAgeyBtYXhEYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgbmV4dFllYXIgPSBhZGRZZWFycyhkYXksIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QobmV4dFllYXIsIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgbWF4RGF0ZVllYXIgPSBtYXhEYXRlICYmIGdldFllYXIobWF4RGF0ZSk7XG4gIHJldHVybiAobWF4RGF0ZVllYXIgJiYgbWF4RGF0ZVllYXIgPCBzdGFydFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNaW5EYXRlKHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtaW5EYXRlKSB7XG4gICAgbGV0IG1pbkRhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtaW5EYXRlKSA+PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1pbihtaW5EYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1pbihpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNYXhEYXRlKHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtYXhEYXRlKSB7XG4gICAgbGV0IG1heERhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtYXhEYXRlKSA8PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1heChtYXhEYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1heChpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaWdodExpZ2h0RGF5c01hcChcbiAgaGlnaGxpZ2h0RGF0ZXMgPSBbXSxcbiAgZGVmYXVsdENsYXNzTmFtZSA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiLFxuKSB7XG4gIGNvbnN0IGRhdGVDbGFzc2VzID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGlnaGxpZ2h0RGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBvYmogPSBoaWdobGlnaHREYXRlc1tpXTtcbiAgICBpZiAoaXNEYXRlKG9iaikpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUob2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoZGVmYXVsdENsYXNzTmFtZSkpIHtcbiAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGRlZmF1bHRDbGFzc05hbWUpO1xuICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0ga2V5c1swXTtcbiAgICAgIGNvbnN0IGFyck9mRGF0ZXMgPSBvYmpba2V5c1swXV07XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhcnJPZkRhdGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuID0gYXJyT2ZEYXRlcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoYXJyT2ZEYXRlc1trXSwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXNBcnIgPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG4vKipcbiAqIENvbXBhcmUgdGhlIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSwgaWYgdGhlIHBhc3NlZCBhcnJheSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlzQXJlRXF1YWwoYXJyYXkxLCBhcnJheTIpIHtcbiAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyYXkxLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBhcnJheTJbaW5kZXhdKTtcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIGN1c3RvbSBjbGFzcyB0byBlYWNoIGRhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGlkYXlEYXRlcyBhcnJheSBvZiBvYmplY3QgY29udGFpbmluZyBkYXRlIGFuZCBuYW1lIG9mIHRoZSBob2xpZGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NuYW1lIHRvIGJlIGFkZGVkLlxuICogQHJldHVybnMge01hcH0gTWFwIGNvbnRhaW5pbmcgZGF0ZSBhcyBrZXkgYW5kIGFycmF5IG9mIGNsYXNzbmFtZSBhbmQgaG9saWRheSBuYW1lIGFzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb2xpZGF5c01hcChcbiAgaG9saWRheURhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taG9saWRheXNcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgaG9saWRheURhdGVzLmZvckVhY2goKGhvbGlkYXkpID0+IHtcbiAgICBjb25zdCB7IGRhdGU6IGRhdGVPYmosIGhvbGlkYXlOYW1lIH0gPSBob2xpZGF5O1xuICAgIGlmICghaXNEYXRlKGRhdGVPYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gZm9ybWF0RGF0ZShkYXRlT2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgY2xhc3NOYW1lc09iaiA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IHt9O1xuICAgIGlmIChcbiAgICAgIFwiY2xhc3NOYW1lXCIgaW4gY2xhc3NOYW1lc09iaiAmJlxuICAgICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9PT0gZGVmYXVsdENsYXNzTmFtZSAmJlxuICAgICAgYXJyYXlzQXJlRXF1YWwoY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSwgW2hvbGlkYXlOYW1lXSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGFzc05hbWVzT2JqW1wiY2xhc3NOYW1lXCJdID0gZGVmYXVsdENsYXNzTmFtZTtcbiAgICBjb25zdCBob2xpZGF5TmFtZUFyciA9IGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl07XG4gICAgY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSA9IGhvbGlkYXlOYW1lQXJyXG4gICAgICA/IFsuLi5ob2xpZGF5TmFtZUFyciwgaG9saWRheU5hbWVdXG4gICAgICA6IFtob2xpZGF5TmFtZV07XG4gICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc09iaik7XG4gIH0pO1xuICByZXR1cm4gZGF0ZUNsYXNzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gIHN0YXJ0T2ZEYXksXG4gIGN1cnJlbnRUaW1lLFxuICBjdXJyZW50TXVsdGlwbGllcixcbiAgaW50ZXJ2YWxzLFxuICBpbmplY3RlZFRpbWVzLFxuKSB7XG4gIGNvbnN0IGwgPSBpbmplY3RlZFRpbWVzLmxlbmd0aDtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBsZXQgaW5qZWN0ZWRUaW1lID0gc3RhcnRPZkRheTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRIb3VycyhpbmplY3RlZFRpbWUsIGdldEhvdXJzKGluamVjdGVkVGltZXNbaV0pKTtcbiAgICBpbmplY3RlZFRpbWUgPSBhZGRNaW51dGVzKGluamVjdGVkVGltZSwgZ2V0TWludXRlcyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkU2Vjb25kcyhpbmplY3RlZFRpbWUsIGdldFNlY29uZHMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuXG4gICAgY29uc3QgbmV4dFRpbWUgPSBhZGRNaW51dGVzKFxuICAgICAgc3RhcnRPZkRheSxcbiAgICAgIChjdXJyZW50TXVsdGlwbGllciArIDEpICogaW50ZXJ2YWxzLFxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICBpc0FmdGVyKGluamVjdGVkVGltZSwgY3VycmVudFRpbWUpICYmXG4gICAgICBpc0JlZm9yZShpbmplY3RlZFRpbWUsIG5leHRUaW1lKVxuICAgICkge1xuICAgICAgdGltZXMucHVzaChpbmplY3RlZFRpbWVzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGltZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRaZXJvKGkpIHtcbiAgcmV0dXJuIGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRZZWFyc1BlcmlvZChcbiAgZGF0ZSxcbiAgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4pIHtcbiAgY29uc3QgZW5kUGVyaW9kID0gTWF0aC5jZWlsKGdldFllYXIoZGF0ZSkgLyB5ZWFySXRlbU51bWJlcikgKiB5ZWFySXRlbU51bWJlcjtcbiAgY29uc3Qgc3RhcnRQZXJpb2QgPSBlbmRQZXJpb2QgLSAoeWVhckl0ZW1OdW1iZXIgLSAxKTtcbiAgcmV0dXJuIHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG91cnNJbkRheShkKSB7XG4gIGNvbnN0IHN0YXJ0T2ZEYXkgPSBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xuICBjb25zdCBzdGFydE9mVGhlTmV4dERheSA9IG5ldyBEYXRlKFxuICAgIGQuZ2V0RnVsbFllYXIoKSxcbiAgICBkLmdldE1vbnRoKCksXG4gICAgZC5nZXREYXRlKCksXG4gICAgMjQsXG4gICk7XG5cbiAgcmV0dXJuIE1hdGgucm91bmQoKCtzdGFydE9mVGhlTmV4dERheSAtICtzdGFydE9mRGF5KSAvIDNfNjAwXzAwMCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgdGhlIG1pbnV0ZSBmb3IgdGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIGlzIGEgRFNUIGFuZCB0aW1lem9uZS1zYWZlIGFuYWxvZyBvZiBgZGF0ZS1mbnMvc3RhcnRPZk1pbnV0ZWBcbiAqIGRvIG5vdCBtYWtlIGNoYW5nZXMgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nXG4gKlxuICogU2VlIGNvbW1lbnRzIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvcHVsbC80MjQ0XG4gKiBmb3IgbW9yZSBkZXRhaWxzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSBzdGFydCBvZiB0aGUgbWludXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mTWludXRlKGQpIHtcbiAgY29uc3Qgc2Vjb25kcyA9IGQuZ2V0U2Vjb25kcygpO1xuICBjb25zdCBtaWxsaXNlY29uZHMgPSBkLmdldE1pbGxpc2Vjb25kcygpO1xuXG4gIHJldHVybiB0b0RhdGUoZC5nZXRUaW1lKCkgLSBzZWNvbmRzICogMTAwMCAtIG1pbGxpc2Vjb25kcyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgbWludXRlXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL2lzU2FtZU1pbnV0ZWBcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGQxXG4gKiBAcGFyYW0ge0RhdGV9IGQyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU1pbnV0ZShkMSwgZDIpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZNaW51dGUoZDEpLmdldFRpbWUoKSA9PT0gc3RhcnRPZk1pbnV0ZShkMikuZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZWQgZGF0ZSB3aXRoIG1pZG5pZ2h0IHRpbWUgKDAwOjAwOjAwKVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSBmb3Igd2hpY2ggbWlkbmlnaHQgdGltZSBpcyByZXF1aXJlZFxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge0RhdGV9IEEgbmV3IGRhdGV0aW1lIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaWRuaWdodERhdGUoZGF0ZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZVwiKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVXaXRob3V0VGltZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBkYXRlV2l0aG91dFRpbWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlV2l0aG91dFRpbWU7XG59XG5cbi8qKlxuICogSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBUaGUgZGF0ZSB0aGF0IHNob3VsZCBiZSBiZWZvcmUgdGhlIG90aGVyIG9uZSB0byByZXR1cm4gdHJ1ZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9Db21wYXJlIFRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge2Jvb2xlYW59IFRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIGRhdGVcbiAqXG4gKiBOb3RlOlxuICogIFRoaXMgZnVuY3Rpb24gY29uc2lkZXJzIHRoZSBtaWQtbmlnaHQgb2YgdGhlIGdpdmVuIGRhdGVzIGZvciBjb21wYXJpc29uLlxuICogIEl0IGV2YWx1YXRlcyB3aGV0aGVyIGRhdGUgaXMgYmVmb3JlIGRhdGVUb0NvbXBhcmUgYmFzZWQgb24gdGhlaXIgbWlkLW5pZ2h0IHRpbWVzdGFtcHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVCZWZvcmUoZGF0ZSwgZGF0ZVRvQ29tcGFyZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSB8fCAhaXNEYXRlKGRhdGVUb0NvbXBhcmUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIHJlY2VpdmVkXCIpO1xuICB9XG5cbiAgY29uc3QgbWlkbmlnaHREYXRlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGUpO1xuICBjb25zdCBtaWRuaWdodERhdGVUb0NvbXBhcmUgPSBnZXRNaWRuaWdodERhdGUoZGF0ZVRvQ29tcGFyZSk7XG5cbiAgcmV0dXJuIGlzQmVmb3JlKG1pZG5pZ2h0RGF0ZSwgbWlkbmlnaHREYXRlVG9Db21wYXJlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3BhY2VLZXlEb3duKGV2ZW50KSB7XG4gIGNvbnN0IFNQQUNFX0tFWSA9IFwiIFwiO1xuICByZXR1cm4gZXZlbnQua2V5ID09PSBTUEFDRV9LRVk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlWWVhcnMoeWVhciwgbm9PZlllYXIsIG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDIgKiBub09mWWVhciArIDE7IGkrKykge1xuICAgIGNvbnN0IG5ld1llYXIgPSB5ZWFyICsgbm9PZlllYXIgLSBpO1xuICAgIGxldCBpc0luUmFuZ2UgPSB0cnVlO1xuXG4gICAgaWYgKG1pbkRhdGUpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWluRGF0ZSkgPD0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAobWF4RGF0ZSAmJiBpc0luUmFuZ2UpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWF4RGF0ZSkgPj0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAoaXNJblJhbmdlKSB7XG4gICAgICBsaXN0LnB1c2gobmV3WWVhcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgeWVhckRyb3Bkb3duSXRlbU51bWJlciwgc2Nyb2xsYWJsZVllYXJEcm9wZG93biB9ID0gcHJvcHM7XG4gICAgY29uc3Qgbm9PZlllYXIgPVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlciB8fCAoc2Nyb2xsYWJsZVllYXJEcm9wZG93biA/IDEwIDogNSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgeWVhcnNMaXN0OiBnZW5lcmF0ZVllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLnllYXIsXG4gICAgICAgIG5vT2ZZZWFyLFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgICB0aGlzLmRyb3Bkb3duUmVmID0gY3JlYXRlUmVmKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBkcm9wZG93bkN1cnJlbnQgPSB0aGlzLmRyb3Bkb3duUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAoZHJvcGRvd25DdXJyZW50KSB7XG4gICAgICAvLyBHZXQgYXJyYXkgZnJvbSBIVE1MQ29sbGVjdGlvblxuICAgICAgY29uc3QgZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4gPSBkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW5cbiAgICAgICAgPyBBcnJheS5mcm9tKGRyb3Bkb3duQ3VycmVudC5jaGlsZHJlbilcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRZZWFyT3B0aW9uRWwgPSBkcm9wZG93bkN1cnJlbnRDaGlsZHJlblxuICAgICAgICA/IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuLmZpbmQoKGNoaWxkRWwpID0+IGNoaWxkRWwuYXJpYVNlbGVjdGVkKVxuICAgICAgICA6IG51bGw7XG5cbiAgICAgIGRyb3Bkb3duQ3VycmVudC5zY3JvbGxUb3AgPSBzZWxlY3RlZFllYXJPcHRpb25FbFxuICAgICAgICA/IHNlbGVjdGVkWWVhck9wdGlvbkVsLm9mZnNldFRvcCArXG4gICAgICAgICAgKHNlbGVjdGVkWWVhck9wdGlvbkVsLmNsaWVudEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMlxuICAgICAgICA6IChkcm9wZG93bkN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gZHJvcGRvd25DdXJyZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gdGhpcy5wcm9wcy55ZWFyO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnN0YXRlLnllYXJzTGlzdC5tYXAoKHllYXIpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICBzZWxlY3RlZFllYXIgPT09IHllYXJcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbiByZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfeWVhclwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICB9XG4gICAgICAgIGtleT17eWVhcn1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIHllYXIpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWxlY3RlZFllYXIgPT09IHllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgID5cbiAgICAgICAge3NlbGVjdGVkWWVhciA9PT0geWVhciA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj7inJM8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgXCJcIlxuICAgICAgICApfVxuICAgICAgICB7eWVhcn1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuXG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IG51bGw7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IG51bGw7XG5cbiAgICBpZiAoIW1heFllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1heFllYXIpKSB7XG4gICAgICBvcHRpb25zLnVuc2hpZnQoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInVwY29taW5nXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5pbmNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtdXBjb21pbmdcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghbWluWWVhciB8fCAhdGhpcy5zdGF0ZS55ZWFyc0xpc3QuZmluZCgoeWVhcikgPT4geWVhciA9PT0gbWluWWVhcikpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgICBrZXk9e1wicHJldmlvdXNcIn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmRlY3JlbWVudFllYXJzfVxuICAgICAgICA+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbiByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycyByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycy1wcmV2aW91c1wiIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICBzaGlmdFllYXJzID0gKGFtb3VudCkgPT4ge1xuICAgIGNvbnN0IHllYXJzID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKGZ1bmN0aW9uICh5ZWFyKSB7XG4gICAgICByZXR1cm4geWVhciArIGFtb3VudDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgeWVhcnNMaXN0OiB5ZWFycyxcbiAgICB9KTtcbiAgfTtcblxuICBpbmNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKDEpO1xuICB9O1xuXG4gIGRlY3JlbWVudFllYXJzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnNoaWZ0WWVhcnMoLTEpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfSByZWY9e3RoaXMuZHJvcGRvd25SZWZ9PlxuICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgWWVhckRyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoWWVhckRyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBtaW5ZZWFyID0gdGhpcy5wcm9wcy5taW5EYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1pbkRhdGUpIDogMTkwMDtcbiAgICBjb25zdCBtYXhZZWFyID0gdGhpcy5wcm9wcy5tYXhEYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1heERhdGUpIDogMjEwMDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gbWluWWVhcjsgaSA8PSBtYXhZZWFyOyBpKyspIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAgICB7aX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25TZWxlY3RDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAoKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e3RoaXMucHJvcHMueWVhcn1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlld1wiXG4gICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1zZWxlY3RlZC15ZWFyXCI+XG4gICAgICAgIHt0aGlzLnByb3BzLnllYXJ9XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAoKSA9PiAoXG4gICAgPFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICB5ZWFyPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcbiAgICBpZiAoeWVhciA9PT0gdGhpcy5wcm9wcy55ZWFyKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh5ZWFyKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMucHJvcHMuZGF0ZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIHRoaXMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIHRoaXMuc2V0T3BlbigpO1xuICB9O1xuXG4gIG9uU2VsZWN0ID0gKGRhdGUsIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRPcGVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbW9udGhOYW1lczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIGlzU2VsZWN0ZWRNb250aCA9IChpKSA9PiB0aGlzLnByb3BzLm1vbnRoID09PSBpO1xuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubW9udGhOYW1lcy5tYXAoKG1vbnRoLCBpKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoaSlcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZF9tb250aFwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e21vbnRofVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgaSl9XG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGkpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge21vbnRofVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGgpO1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHRoaXMucHJvcHMub25DYW5jZWwoKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd25cIj5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aERyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9IChtb250aE5hbWVzKSA9PlxuICAgIG1vbnRoTmFtZXMubWFwKChNLCBpKSA9PiAoXG4gICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2l9PlxuICAgICAgICB7TX1cbiAgICAgIDwvb3B0aW9uPlxuICAgICkpO1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucyhtb250aE5hbWVzKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlLCBtb250aE5hbWVzKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aFwiPlxuICAgICAgICB7bW9udGhOYW1lc1t0aGlzLnByb3BzLm1vbnRoXX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJEcm9wZG93biA9IChtb250aE5hbWVzKSA9PiAoXG4gICAgPFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICBtb250aE5hbWVzPXttb250aE5hbWVzfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAobW9udGhOYW1lcykgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlLCBtb250aE5hbWVzKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bihtb250aE5hbWVzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKG1vbnRoICE9PSB0aGlzLnByb3BzLm1vbnRoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXS5tYXAoXG4gICAgICB0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3duXG4gICAgICAgID8gKE0pID0+IHV0aWxzLmdldE1vbnRoU2hvcnRJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSlcbiAgICAgICAgOiAoTSkgPT4gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSksXG4gICAgKTtcblxuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZShtb250aE5hbWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7XG4gIGFkZE1vbnRocyxcbiAgZm9ybWF0RGF0ZSxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBuZXdEYXRlLFxuICBpc0FmdGVyLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lWWVhcixcbiAgZ2V0VGltZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU1vbnRoWWVhcnMobWluRGF0ZSwgbWF4RGF0ZSkge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKG1pbkRhdGUpO1xuICBjb25zdCBsYXN0RGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtYXhEYXRlKTtcblxuICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgIGxpc3QucHVzaChuZXdEYXRlKGN1cnJEYXRlKSk7XG5cbiAgICBjdXJyRGF0ZSA9IGFkZE1vbnRocyhjdXJyRGF0ZSwgMSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1vbnRoWWVhcnNMaXN0OiBnZW5lcmF0ZU1vbnRoWWVhcnMoXG4gICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tb250aFllYXJzTGlzdC5tYXAoKG1vbnRoWWVhcikgPT4ge1xuICAgICAgY29uc3QgbW9udGhZZWFyUG9pbnQgPSBnZXRUaW1lKG1vbnRoWWVhcik7XG4gICAgICBjb25zdCBpc1NhbWVNb250aFllYXIgPVxuICAgICAgICBpc1NhbWVZZWFyKHRoaXMucHJvcHMuZGF0ZSwgbW9udGhZZWFyKSAmJlxuICAgICAgICBpc1NhbWVNb250aCh0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgaXNTYW1lTW9udGhZZWFyXG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGgteWVhclwiXG4gICAgICAgICAgICAgIDogXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvblwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17bW9udGhZZWFyUG9pbnR9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIG1vbnRoWWVhclBvaW50KX1cbiAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc1NhbWVNb250aFllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1NhbWVNb250aFllYXIgPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAg4pyTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHtmb3JtYXREYXRlKG1vbnRoWWVhciwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXIpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGhZZWFyKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsc3goe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Ryb3Bkb3duQ2xhc3N9Pnt0aGlzLnJlbmRlck9wdGlvbnMoKX08L2Rpdj47XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIG5ld0RhdGUsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxudmFyIFdyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMgPSBvbkNsaWNrT3V0c2lkZShNb250aFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgICAgY29uc3QgdGltZVBvaW50ID0gZ2V0VGltZShjdXJyRGF0ZSk7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXt0aW1lUG9pbnR9IHZhbHVlPXt0aW1lUG9pbnR9PlxuICAgICAgICAgIHtmb3JtYXREYXRlKGN1cnJEYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcblxuICAgICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXtnZXRUaW1lKGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRhdGUpKX1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiB7XG4gICAgY29uc3QgeWVhck1vbnRoID0gZm9ybWF0RGF0ZShcbiAgICAgIHRoaXMucHJvcHMuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9XCJyZWFkXCJcbiAgICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlld1wiXG4gICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bihldmVudCl9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXctLXNlbGVjdGVkLW1vbnRoLXllYXJcIj5cbiAgICAgICAgICB7eWVhck1vbnRofVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICBkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG4gICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXJQb2ludCkgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblxuICAgIGNvbnN0IGNoYW5nZWREYXRlID0gbmV3RGF0ZShwYXJzZUludChtb250aFllYXJQb2ludCkpO1xuXG4gICAgaWYgKFxuICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIGNoYW5nZWREYXRlKSAmJlxuICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9ICgpID0+XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHJlbmRlcmVkRHJvcGRvd247XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRyb3Bkb3duTW9kZSkge1xuICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTY3JvbGxNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBnZXREYXksXG4gIGdldE1vbnRoLFxuICBnZXREYXRlLFxuICBuZXdEYXRlLFxuICBpc1NhbWVEYXksXG4gIGlzRGF5RGlzYWJsZWQsXG4gIGlzRGF5RXhjbHVkZWQsXG4gIGlzRGF5SW5SYW5nZSxcbiAgaXNFcXVhbCxcbiAgaXNCZWZvcmUsXG4gIGlzQWZ0ZXIsXG4gIGdldERheU9mV2Vla0NvZGUsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBmb3JtYXREYXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c0RheSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkocHJldlByb3BzKTtcbiAgfVxuXG4gIGRheUVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VFbnRlciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKCkgJiYgdGhpcy5wcm9wcy5vbk1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIiBcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmtleSA9IFwiRW50ZXJcIjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKG90aGVyKSA9PiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXksIG90aGVyKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1NlbGVjdGVkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlXG4gICAgICA/IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT4gdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSkpXG4gICAgICA6IHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuXG4gICAgcmV0dXJuICFpc1NlbGVjdGVkRGF0ZSAmJiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gIH07XG5cbiAgaXNEaXNhYmxlZCA9ICgpID0+IGlzRGF5RGlzYWJsZWQodGhpcy5wcm9wcy5kYXksIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoKSA9PiBpc0RheUV4Y2x1ZGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc1N0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBpc1NhbWVEYXkoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVXZWVrID0gKG90aGVyKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICBpc1NhbWVEYXkoXG4gICAgICBvdGhlcixcbiAgICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICksXG4gICAgKTtcblxuICBpc1NhbWVEYXlPcldlZWsgPSAob3RoZXIpID0+IHRoaXMuaXNTYW1lRGF5KG90aGVyKSB8fCB0aGlzLmlzU2FtZVdlZWsob3RoZXIpO1xuXG4gIGdldEhpZ2hMaWdodGVkQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhpZ2hsaWdodERhdGVzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFoaWdobGlnaHREYXRlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIExvb2tpbmcgZm9yIGNsYXNzTmFtZSBpbiB0aGUgTWFwIG9mIHsnZGF5IHN0cmluZywgJ2NsYXNzTmFtZSd9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICByZXR1cm4gaGlnaGxpZ2h0RGF0ZXMuZ2V0KGRheVN0cik7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBhcnJheSBjb250YWluaW5nIGNsYXNzbmFtZSBhc3NvY2lhdGVkIHRvIHRoZSBkYXRlXG4gIGdldEhvbGlkYXlzQ2xhc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaG9saWRheXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGF5U3RyID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7ZGF5IHN0cmluZzoge2NsYXNzTmFtZSwgaG9saWRheU5hbWV9fVxuICAgIGlmIChob2xpZGF5cy5oYXMoZGF5U3RyKSkge1xuICAgICAgcmV0dXJuIFtob2xpZGF5cy5nZXQoZGF5U3RyKS5jbGFzc05hbWVdO1xuICAgIH1cbiAgfTtcblxuICBpc0luUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc2VsZWN0c1N0YXJ0LFxuICAgICAgc2VsZWN0c0VuZCxcbiAgICAgIHNlbGVjdHNSYW5nZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICFzZWxlY3RpbmdEYXRlIHx8XG4gICAgICAoIXNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlICYmIHRoaXMuaXNEaXNhYmxlZCgpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNTdGFydCAmJlxuICAgICAgZW5kRGF0ZSAmJlxuICAgICAgKGlzQmVmb3JlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c0VuZCAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAoaXNBZnRlcihzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNSYW5nZSAmJlxuICAgICAgc3RhcnREYXRlICYmXG4gICAgICAhZW5kRGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYW1lRGF5KHN0YXJ0RGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1JhbmdlRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShlbmREYXRlLCBkYXkpO1xuICB9O1xuXG4gIGlzV2Vla2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrZGF5ID0gZ2V0RGF5KHRoaXMucHJvcHMuZGF5KTtcbiAgICByZXR1cm4gd2Vla2RheSA9PT0gMCB8fCB3ZWVrZGF5ID09PSA2O1xuICB9O1xuXG4gIGlzQWZ0ZXJNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAodGhpcy5wcm9wcy5tb250aCArIDEpICUgMTIgPT09IGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNCZWZvcmVNb250aCA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9wcy5tb250aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAoZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpICsgMSkgJSAxMiA9PT0gdGhpcy5wcm9wcy5tb250aFxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50RGF5ID0gKCkgPT4gdGhpcy5pc1NhbWVEYXkobmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcz8uc29tZSgoZGF0ZSkgPT5cbiAgICAgICAgdGhpcy5pc1NhbWVEYXlPcldlZWsoZGF0ZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gIH07XG5cbiAgZ2V0Q2xhc3NOYW1lcyA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgZGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWVcbiAgICAgID8gdGhpcy5wcm9wcy5kYXlDbGFzc05hbWUoZGF0ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIixcbiAgICAgIGRheUNsYXNzTmFtZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1cIiArIGdldERheU9mV2Vla0NvZGUodGhpcy5wcm9wcy5kYXkpLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZGlzYWJsZWRcIjogdGhpcy5pc0Rpc2FibGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1leGNsdWRlZFwiOiB0aGlzLmlzRXhjbHVkZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjogdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tc2VsZWN0aW5nLXJhbmdlXCI6IHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnREYXkoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXdlZWtlbmRcIjogdGhpcy5pc1dlZWtlbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLW91dHNpZGUtbW9udGhcIjpcbiAgICAgICAgICB0aGlzLmlzQWZ0ZXJNb250aCgpIHx8IHRoaXMuaXNCZWZvcmVNb250aCgpLFxuICAgICAgfSxcbiAgICAgIHRoaXMuZ2V0SGlnaExpZ2h0ZWRDbGFzcyhcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIiksXG4gICAgICB0aGlzLmdldEhvbGlkYXlzQ2xhc3MoKSxcbiAgICApO1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCA9IFwiQ2hvb3NlXCIsXG4gICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQgPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQoKSB8fCB0aGlzLmlzRXhjbHVkZWQoKVxuICAgICAgICA/IGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZFxuICAgICAgICA6IGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkO1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHtmb3JtYXREYXRlKGRheSwgXCJQUFBQXCIsIHRoaXMucHJvcHMubG9jYWxlKX1gO1xuICB9O1xuXG4gIC8vIEEgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBob2xpZGF5J3MgbmFtZSBhcyB0aXRsZSdzIGNvbnRlbnRcbiAgZ2V0VGl0bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIGhvbGlkYXlzID0gbmV3IE1hcCgpLCBleGNsdWRlRGF0ZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29tcGFyZUR0ID0gZm9ybWF0RGF0ZShkYXksIFwiTU0uZGQueXl5eVwiKTtcbiAgICBjb25zdCB0aXRsZXMgPSBbXTtcbiAgICBpZiAoaG9saWRheXMuaGFzKGNvbXBhcmVEdCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKC4uLmhvbGlkYXlzLmdldChjb21wYXJlRHQpLmhvbGlkYXlOYW1lcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRXhjbHVkZWQoKSkge1xuICAgICAgdGl0bGVzLnB1c2goXG4gICAgICAgIGV4Y2x1ZGVEYXRlc1xuICAgICAgICAgID8uZmlsdGVyKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICAgIGlzU2FtZURheShleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlLCBkYXkpLFxuICAgICAgICAgIClcbiAgICAgICAgICAubWFwKChleGNsdWRlRGF0ZSkgPT4gZXhjbHVkZURhdGUubWVzc2FnZSksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGVzLmpvaW4oXCIsIFwiKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChzZWxlY3RlZCwgcHJlU2VsZWN0aW9uKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSBzZWxlY3RlZCB8fCB0aGlzLnByb3BzLnNlbGVjdGVkO1xuICAgIGNvbnN0IHByZVNlbGVjdGlvbkRheSA9IHByZVNlbGVjdGlvbiB8fCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhKFxuICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgICAgICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyIHx8ICF0aGlzLmlzU3RhcnRPZldlZWsoKSlcbiAgICAgICkgJiZcbiAgICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAgICh0aGlzLmlzU2FtZURheShzZWxlY3RlZERheSkgJiZcbiAgICAgICAgICBpc1NhbWVEYXkocHJlU2VsZWN0aW9uRGF5LCBzZWxlY3RlZERheSkpKVxuICAgICAgICA/IDBcbiAgICAgICAgOiAtMTtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgZGF5XG4gIC8vIGZvY3VzIHRoZSBkYXkgb24gbW91bnQvdXBkYXRlIHNvIHRoYXQga2V5Ym9hcmQgbmF2aWdhdGlvbiB3b3JrcyB3aGlsZSBjeWNsaW5nIHRocm91Z2ggbW9udGhzIHdpdGggdXAgb3IgZG93biBrZXlzIChub3QgZm9yIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9ucylcbiAgLy8gcHJldmVudCBmb2N1cyBmb3IgdGhlc2UgYWN0aXZlRWxlbWVudCBjYXNlcyBzbyB3ZSBkb24ndCBwdWxsIGZvY3VzIGZyb20gdGhlIGlucHV0IGFzIHRoZSBjYWxlbmRhciBvcGVuc1xuICBoYW5kbGVGb2N1c0RheSA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICB0aGlzLmlzU2FtZURheSh0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBpbmxpbmUgdmVyc2lvbjpcbiAgICAgIC8vIGRvIG5vdCBmb2N1cyBvbiBpbml0aWFsIHJlbmRlciB0byBwcmV2ZW50IGF1dG9Gb2N1cyBpc3N1ZVxuICAgICAgLy8gZm9jdXMgYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQgdmlhIGtleWJvYXJkXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmUpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIERheVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJyZWFjdC1kYXRlcGlja2VyX19kYXlcIilcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvL2RheSBpcyBvbmUgb2YgdGhlIG5vbiByZW5kZXJlZCBkdXBsaWNhdGUgZGF5c1xuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgJiYgdGhpcy5pc0FmdGVyTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzRGF5ICYmIHRoaXMuZGF5RWwuY3VycmVudD8uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlckRheUNvbnRlbnRzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ICYmIHRoaXMuaXNCZWZvcmVNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHNcbiAgICAgID8gdGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50cyhnZXREYXRlKHRoaXMucHJvcHMuZGF5KSwgdGhpcy5wcm9wcy5kYXkpXG4gICAgICA6IGdldERhdGUodGhpcy5wcm9wcy5kYXkpO1xuICB9O1xuXG4gIHJlbmRlciA9ICgpID0+IChcbiAgICA8ZGl2XG4gICAgICByZWY9e3RoaXMuZGF5RWx9XG4gICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcyh0aGlzLnByb3BzLmRheSl9XG4gICAgICBvbktleURvd249e3RoaXMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VFbnRlciA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKCl9XG4gICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgIHRpdGxlPXt0aGlzLmdldFRpdGxlKCl9XG4gICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWQoKX1cbiAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnREYXkoKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkKCkgfHwgdGhpcy5pc0luUmFuZ2UoKX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJEYXlDb250ZW50cygpfVxuICAgICAge3RoaXMuZ2V0VGl0bGUoKSAhPT0gXCJcIiAmJiAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm92ZXJsYXlcIj57dGhpcy5nZXRUaXRsZSgpfTwvc3Bhbj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vla051bWJlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhcmlhTGFiZWxQcmVmaXg6IFwid2VlayBcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB3ZWVrTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihFbGVtZW50KSB9KSxcbiAgICBdKSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNXZWVrTnVtYmVyKHByZXZQcm9wcyk7XG4gIH1cblxuICB3ZWVrTnVtYmVyRWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+XG4gICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAhaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgZ2V0VGFiSW5kZXggPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyICYmXG4gICAgKHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCkgfHxcbiAgICAgIChpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHRoaXMucHJvcHMuc2VsZWN0ZWQpKSlcbiAgICAgID8gMFxuICAgICAgOiAtMTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgd2Vlay1udW1iZXJcbiAgLy8gZm9jdXMgdGhlIHdlZWstbnVtYmVyIG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNXZWVrTnVtYmVyID0gKHByZXZQcm9wcyA9IHt9KSA9PiB7XG4gICAgbGV0IHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlIGFjdGl2ZUVsZW1lbnQgaXMgaW4gdGhlIGNvbnRhaW5lciwgYW5kIGl0IGlzIGFub3RoZXIgaW5zdGFuY2Ugb2YgV2Vla051bWJlclxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCIsXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzV2Vla051bWJlciAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudCAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2Vla051bWJlciwgYXJpYUxhYmVsUHJlZml4ID0gXCJ3ZWVrIFwiLCBvbkNsaWNrIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyLS1jbGlja2FibGVcIjogISFvbkNsaWNrLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tc2VsZWN0ZWRcIjpcbiAgICAgICAgISFvbkNsaWNrICYmIGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17dGhpcy53ZWVrTnVtYmVyRWx9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xzeCh3ZWVrTnVtYmVyQ2xhc3Nlcyl9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2FyaWFMYWJlbFByZWZpeH0gJHt0aGlzLnByb3BzLndlZWtOdW1iZXJ9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgID5cbiAgICAgICAge3dlZWtOdW1iZXJ9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgRGF5IGZyb20gXCIuL2RheVwiO1xuaW1wb3J0IFdlZWtOdW1iZXIgZnJvbSBcIi4vd2Vla19udW1iZXJcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuXG5pbXBvcnQgeyBhZGREYXlzLCBnZXRXZWVrLCBnZXRTdGFydE9mV2VlaywgaXNTYW1lRGF5IH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWVrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgfTtcbiAgfVxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVXZWVrQ2xpY2sgPSAoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICB0aGlzLmhhbmRsZURheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXRXZWVrTnVtYmVyID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKGRhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0V2VlayhkYXRlKTtcbiAgfTtcblxuICByZW5kZXJEYXlzID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gdGhpcy5zdGFydE9mV2VlaygpO1xuICAgIGNvbnN0IGRheXMgPSBbXTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyID0gdGhpcy5mb3JtYXRXZWVrTnVtYmVyKHN0YXJ0T2ZXZWVrKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcikge1xuICAgICAgY29uc3Qgb25DbGlja0FjdGlvbiA9XG4gICAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgICAgICA/IHRoaXMuaGFuZGxlV2Vla0NsaWNrLmJpbmQodGhpcywgc3RhcnRPZldlZWssIHdlZWtOdW1iZXIpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBkYXlzLnB1c2goXG4gICAgICAgIDxXZWVrTnVtYmVyXG4gICAgICAgICAga2V5PVwiV1wiXG4gICAgICAgICAgd2Vla051bWJlcj17d2Vla051bWJlcn1cbiAgICAgICAgICBkYXRlPXtzdGFydE9mV2Vla31cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQWN0aW9ufVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcn1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgIC8+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAga2V5PXtkYXkudmFsdWVPZigpfVxuICAgICAgICAgICAgZGF5PXtkYXl9XG4gICAgICAgICAgICBtb250aD17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2suYmluZCh0aGlzLCBkYXkpfVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIHN0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMuc3RhcnRPZldlZWsoKSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB3ZWVrTnVtYmVyQ2xhc3NlcyA9IHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1wiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1zZWxlY3RlZFwiOiBpc1NhbWVEYXkoXG4gICAgICAgIHRoaXMuc3RhcnRPZldlZWsoKSxcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfT57dGhpcy5yZW5kZXJEYXlzKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBXZWVrIGZyb20gXCIuL3dlZWtcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQgPSA2O1xuXG5jb25zdCBNT05USF9DT0xVTU5TX0xBWU9VVCA9IHtcbiAgVFdPX0NPTFVNTlM6IFwidHdvX2NvbHVtbnNcIixcbiAgVEhSRUVfQ09MVU1OUzogXCJ0aHJlZV9jb2x1bW5zXCIsXG4gIEZPVVJfQ09MVU1OUzogXCJmb3VyX2NvbHVtbnNcIixcbn07XG5jb25zdCBNT05USF9DT0xVTU5TID0ge1xuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzIsIDNdLFxuICAgICAgWzQsIDVdLFxuICAgICAgWzYsIDddLFxuICAgICAgWzgsIDldLFxuICAgICAgWzEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDIsXG4gIH0sXG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyXSxcbiAgICAgIFszLCA0LCA1XSxcbiAgICAgIFs2LCA3LCA4XSxcbiAgICAgIFs5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAzLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuRk9VUl9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyLCAzXSxcbiAgICAgIFs0LCA1LCA2LCA3XSxcbiAgICAgIFs4LCA5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiA0LFxuICB9LFxufTtcbmNvbnN0IE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQgPSAxO1xuXG5mdW5jdGlvbiBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuKSB7XG4gIGlmIChzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcikgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OUztcbiAgaWYgKHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5UV09fQ09MVU1OUztcbiAgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULlRIUkVFX0NPTFVNTlM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb3JkZXJJbkRpc3BsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25Nb250aEtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIE1PTlRIX1JFRlMgPSBbLi4uQXJyYXkoMTIpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuICBRVUFSVEVSX1JFRlMgPSBbLi4uQXJyYXkoNCldLm1hcCgoKSA9PiBSZWFjdC5jcmVhdGVSZWYoKSk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQsIHRoaXMucHJvcHMub3JkZXJJbkRpc3BsYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKCk7XG4gICAgfVxuICB9O1xuXG4gIGlzUmFuZ2VTdGFydE1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aCh1dGlscy5zZXRNb250aChkYXksIG0pLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VTdGFydFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQgPSAobSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aCA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKCEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fCAhc2VsZWN0aW5nRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1dlZWtJbk1vbnRoID0gKHN0YXJ0T2ZXZWVrKSA9PiB7XG4gICAgY29uc3QgZGF5ID0gdGhpcy5wcm9wcy5kYXk7XG4gICAgY29uc3QgZW5kT2ZXZWVrID0gdXRpbHMuYWRkRGF5cyhzdGFydE9mV2VlaywgNik7XG4gICAgcmV0dXJuIChcbiAgICAgIHV0aWxzLmlzU2FtZU1vbnRoKHN0YXJ0T2ZXZWVrLCBkYXkpIHx8IHV0aWxzLmlzU2FtZU1vbnRoKGVuZE9mV2VlaywgZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50TW9udGggPSAoZGF5LCBtKSA9PlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcih1dGlscy5uZXdEYXRlKCkpICYmXG4gICAgbSA9PT0gdXRpbHMuZ2V0TW9udGgodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc0N1cnJlbnRRdWFydGVyID0gKGRheSwgcSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIHEgPT09IHV0aWxzLmdldFF1YXJ0ZXIodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoZGF5LCBtLCBzZWxlY3RlZCkgPT5cbiAgICB1dGlscy5nZXRNb250aChzZWxlY3RlZCkgPT09IG0gJiZcbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIoc2VsZWN0ZWQpO1xuXG4gIGlzU2VsZWN0ZWRRdWFydGVyID0gKGRheSwgcSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0UXVhcnRlcihkYXkpID09PSBxICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICByZW5kZXJXZWVrcyA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrcyA9IFtdO1xuICAgIHZhciBpc0ZpeGVkSGVpZ2h0ID0gdGhpcy5wcm9wcy5maXhlZEhlaWdodDtcblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgYnJlYWtBZnRlck5leHRQdXNoID0gZmFsc2U7XG4gICAgbGV0IGN1cnJlbnRXZWVrU3RhcnQgPSB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgIHV0aWxzLmdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRheSksXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICApXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQ7XG5cbiAgICBjb25zdCBwcmVTZWxlY3Rpb24gPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB3ZWVrcy5wdXNoKFxuICAgICAgICA8V2Vla1xuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRheT17Y3VycmVudFdlZWtTdGFydH1cbiAgICAgICAgICBtb250aD17dXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpfVxuICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3ByZVNlbGVjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAvPixcbiAgICAgICk7XG5cbiAgICAgIGlmIChicmVha0FmdGVyTmV4dFB1c2gpIGJyZWFrO1xuXG4gICAgICBpKys7XG4gICAgICBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuYWRkV2Vla3MoY3VycmVudFdlZWtTdGFydCwgMSk7XG5cbiAgICAgIC8vIElmIG9uZSBvZiB0aGVzZSBjb25kaXRpb25zIGlzIHRydWUsIHdlIHdpbGwgZWl0aGVyIGJyZWFrIG9uIHRoaXMgd2Vla1xuICAgICAgLy8gb3IgYnJlYWsgb24gdGhlIG5leHQgd2Vla1xuICAgICAgY29uc3QgaXNGaXhlZEFuZEZpbmFsV2VlayA9XG4gICAgICAgIGlzRml4ZWRIZWlnaHQgJiYgaSA+PSBGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVDtcbiAgICAgIGNvbnN0IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoID1cbiAgICAgICAgIWlzRml4ZWRIZWlnaHQgJiYgIXRoaXMuaXNXZWVrSW5Nb250aChjdXJyZW50V2Vla1N0YXJ0KTtcblxuICAgICAgaWYgKGlzRml4ZWRBbmRGaW5hbFdlZWsgfHwgaXNOb25GaXhlZEFuZE91dE9mTW9udGgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGVla05leHRNb250aCkge1xuICAgICAgICAgIGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gd2Vla3M7XG4gIH07XG5cbiAgb25Nb250aENsaWNrID0gKGUsIG0pID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aCh0aGlzLnByb3BzLmRheSwgbSk7XG5cbiAgICBpZiAodXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpLCBlKTtcbiAgfTtcblxuICBvbk1vbnRoTW91c2VFbnRlciA9IChtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVNb250aE5hdmlnYXRpb24gPSAobmV3TW9udGgsIG5ld0RhdGUpID0+IHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudCAmJlxuICAgICAgdGhpcy5NT05USF9SRUZTW25ld01vbnRoXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25Nb250aEtleURvd24gPSAoZXZlbnQsIG1vbnRoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWQsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNldFByZVNlbGVjdGlvbixcbiAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSAhPT0gXCJUYWJcIikge1xuICAgICAgLy8gcHJldmVudERlZmF1bHQgb24gdGFiIGV2ZW50IGJsb2NrcyBmb2N1cyBjaGFuZ2VcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IG1vbnRoQ29sdW1uc0xheW91dCA9IGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICApO1xuICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQgPVxuICAgICAgICBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0udmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0O1xuICAgICAgY29uc3QgbW9udGhzR3JpZCA9IE1PTlRIX0NPTFVNTlNbbW9udGhDb2x1bW5zTGF5b3V0XS5ncmlkO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldmVudCwgbW9udGgpO1xuICAgICAgICAgIHNldFByZVNlbGVjdGlvbihzZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VULFxuICAgICAgICAgICAgdXRpbHMuYWRkTW9udGhzKHByZVNlbGVjdGlvbiwgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLnN1Yk1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBtb250aCBvbiB0aGUgZmlyc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkWzBdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoICsgMTIgLSB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoIC0gdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGxhc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkW21vbnRoc0dyaWQubGVuZ3RoIC0gMV0uaW5jbHVkZXMobW9udGgpXG4gICAgICAgICAgICAgID8gbW9udGggLSAxMiArIHZlcnRpY2FsT2Zmc2V0XG4gICAgICAgICAgICAgIDogbW9udGggKyB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIHZlcnRpY2FsT2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duICYmIGhhbmRsZU9uTW9udGhLZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBvblF1YXJ0ZXJDbGljayA9IChlLCBxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2sodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25RdWFydGVyTW91c2VFbnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mUXVhcnRlcihsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiA9IChuZXdRdWFydGVyLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLlFVQVJURVJfUkVGU1tuZXdRdWFydGVyIC0gMV0uY3VycmVudCAmJlxuICAgICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBvblF1YXJ0ZXJLZXlEb3duID0gKGV2ZW50LCBxdWFydGVyKSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXZlbnQsIHF1YXJ0ZXIpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlUXVhcnRlck5hdmlnYXRpb24oXG4gICAgICAgICAgICBxdWFydGVyID09PSA0ID8gMSA6IHF1YXJ0ZXIgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkUXVhcnRlcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gMSA/IDQgOiBxdWFydGVyIC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBnZXRNb250aENsYXNzTmFtZXMgPSAobSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgbW9udGhDbGFzc05hbWUsXG4gICAgICBleGNsdWRlRGF0ZXMsXG4gICAgICBpbmNsdWRlRGF0ZXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoQ2xhc3NOYW1lID0gbW9udGhDbGFzc05hbWVcbiAgICAgID8gbW9udGhDbGFzc05hbWUodXRpbHMuc2V0TW9udGgoZGF5LCBtKSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19tb250aC0ke219YCxcbiAgICAgIF9tb250aENsYXNzTmFtZSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcykgJiZcbiAgICAgICAgICB1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRNb250aChcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgbSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBwcmVTZWxlY3Rpb24pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0taW4tcmFuZ2VcIjogdXRpbHMuaXNNb250aEluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgbSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnRNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFRhYkluZGV4ID0gKG0pID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZE1vbnRoID0gdXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIG0gPT09IHByZVNlbGVjdGVkTW9udGhcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRRdWFydGVyVGFiSW5kZXggPSAocSkgPT4ge1xuICAgIGNvbnN0IHByZVNlbGVjdGVkUXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIHEgPT09IHByZVNlbGVjdGVkUXVhcnRlclxuICAgICAgICA/IFwiMFwiXG4gICAgICAgIDogXCItMVwiO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9IChtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeCA9IFwiQ2hvb3NlXCIsXG4gICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCA9IFwiTm90IGF2YWlsYWJsZVwiLFxuICAgICAgZGF5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtb250aCk7XG4gICAgY29uc3QgcHJlZml4ID1cbiAgICAgIHRoaXMuaXNEaXNhYmxlZChsYWJlbERhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChsYWJlbERhdGUpXG4gICAgICAgID8gZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXhcbiAgICAgICAgOiBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSAke3V0aWxzLmZvcm1hdERhdGUobGFiZWxEYXRlLCBcIk1NTU0geXl5eVwiKX1gO1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJDbGFzc05hbWVzID0gKHEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLSR7cX1gLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBxLFxuICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzUXVhcnRlckluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgcSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNSYW5nZVN0YXJ0UXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmRRdWFydGVyKHEpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldE1vbnRoQ29udGVudCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBzaG93RnVsbE1vbnRoWWVhclBpY2tlciwgcmVuZGVyTW9udGhDb250ZW50LCBsb2NhbGUsIGRheSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvcnRNb250aFRleHQgPSB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBjb25zdCBmdWxsTW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShtLCBsb2NhbGUpO1xuICAgIGlmIChyZW5kZXJNb250aENvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNb250aENvbnRlbnQobSwgc2hvcnRNb250aFRleHQsIGZ1bGxNb250aFRleHQsIGRheSk7XG4gICAgfVxuICAgIHJldHVybiBzaG93RnVsbE1vbnRoWWVhclBpY2tlciA/IGZ1bGxNb250aFRleHQgOiBzaG9ydE1vbnRoVGV4dDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ29udGVudCA9IChxKSA9PiB7XG4gICAgY29uc3QgeyByZW5kZXJRdWFydGVyQ29udGVudCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0UXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlKHEsIGxvY2FsZSk7XG4gICAgcmV0dXJuIHJlbmRlclF1YXJ0ZXJDb250ZW50XG4gICAgICA/IHJlbmRlclF1YXJ0ZXJDb250ZW50KHEsIHNob3J0UXVhcnRlcilcbiAgICAgIDogc2hvcnRRdWFydGVyO1xuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBzZWxlY3RlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1vbnRoQ29sdW1ucyA9XG4gICAgICBNT05USF9DT0xVTU5TW1xuICAgICAgICBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgKVxuICAgICAgXS5ncmlkO1xuICAgIHJldHVybiBtb250aENvbHVtbnMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC13cmFwcGVyXCIga2V5PXtpfT5cbiAgICAgICAge21vbnRoLm1hcCgobSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17dGhpcy5NT05USF9SRUZTW21dfVxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25Nb250aENsaWNrKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhLZXlEb3duKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vbk1vbnRoTW91c2VFbnRlcihtKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleChtKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRNb250aENsYXNzTmFtZXMobSl9XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKG0pfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudE1vbnRoKGRheSwgbSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgc2VsZWN0ZWQpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldE1vbnRoQ29udGVudChtKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJRdWFydGVycyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcXVhcnRlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci13cmFwcGVyXCI+XG4gICAgICAgIHtxdWFydGVycy5tYXAoKHEsIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICByZWY9e3RoaXMuUVVBUlRFUl9SRUZTW2pdfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJDbGljayhldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJLZXlEb3duKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFF1YXJ0ZXJDbGFzc05hbWVzKHEpfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHNlbGVjdGVkKX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFF1YXJ0ZXJUYWJJbmRleChxKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRRdWFydGVyKGRheSwgcSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRRdWFydGVyQ29udGVudChxKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0aW5nRGF0ZSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgc2hvd1dlZWtQaWNrZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhcIixcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQpLFxuICAgICAgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFBpY2tlclwiOiBzaG93TW9udGhZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlclBpY2tlclwiOiBzaG93UXVhcnRlclllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrUGlja2VyXCI6IHNob3dXZWVrUGlja2VyIH0sXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIGRheSxcbiAgICAgIGFyaWFMYWJlbFByZWZpeCA9IFwiTW9udGggXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXggPSBhcmlhTGFiZWxQcmVmaXhcbiAgICAgID8gYXJpYUxhYmVsUHJlZml4LnRyaW0oKSArIFwiIFwiXG4gICAgICA6IFwiXCI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2Zvcm1hdHRlZEFyaWFMYWJlbFByZWZpeH0ke3V0aWxzLmZvcm1hdERhdGUoZGF5LCBcIk1NTU0sIHl5eXlcIil9YH1cbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgPlxuICAgICAgICB7c2hvd01vbnRoWWVhclBpY2tlclxuICAgICAgICAgID8gdGhpcy5yZW5kZXJNb250aHMoKVxuICAgICAgICAgIDogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgICA/IHRoaXMucmVuZGVyUXVhcnRlcnMoKVxuICAgICAgICAgICAgOiB0aGlzLnJlbmRlcldlZWtzKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge1xuICBnZXRIb3VycyxcbiAgZ2V0TWludXRlcyxcbiAgbmV3RGF0ZSxcbiAgZ2V0U3RhcnRPZkRheSxcbiAgYWRkTWludXRlcyxcbiAgZm9ybWF0RGF0ZSxcbiAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlLFxuICBpc1RpbWVEaXNhYmxlZCxcbiAgdGltZXNUb0luamVjdEFmdGVyLFxuICBnZXRIb3Vyc0luRGF5LFxuICBpc1NhbWVNaW51dGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcnZhbHM6IDMwLFxuICAgICAgb25UaW1lQ2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHRvZGF5QnV0dG9uOiBudWxsLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgY2FsY0NlbnRlclBvc2l0aW9uID0gKGxpc3RIZWlnaHQsIGNlbnRlckxpUmVmKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNlbnRlckxpUmVmLm9mZnNldFRvcCAtIChsaXN0SGVpZ2h0IC8gMiAtIGNlbnRlckxpUmVmLmNsaWVudEhlaWdodCAvIDIpXG4gICAgKTtcbiAgfTtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhSZWY6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaGVpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIGNvZGUgdG8gZW5zdXJlIHNlbGVjdGVkIHRpbWUgd2lsbCBhbHdheXMgYmUgaW4gZm9jdXMgd2l0aGluIHRpbWUgd2luZG93IHdoZW4gaXQgZmlyc3QgYXBwZWFyc1xuICAgIHRoaXMuc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFJlZiAmJiB0aGlzLmhlYWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSA9ICgpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybjtcblxuICAgICAgdGhpcy5saXN0LnNjcm9sbFRvcCA9XG4gICAgICAgIHRoaXMuY2VudGVyTGkgJiZcbiAgICAgICAgVGltZS5jYWxjQ2VudGVyUG9zaXRpb24oXG4gICAgICAgICAgdGhpcy5wcm9wcy5tb250aFJlZlxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm1vbnRoUmVmLmNsaWVudEhlaWdodCAtIHRoaXMuaGVhZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmxpc3QuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIHRoaXMuY2VudGVyTGksXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAodGltZSkgPT4ge1xuICAgIGlmIChcbiAgICAgICgodGhpcy5wcm9wcy5taW5UaW1lIHx8IHRoaXMucHJvcHMubWF4VGltZSkgJiZcbiAgICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmluY2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRpbWUpO1xuICB9O1xuXG4gIGlzU2VsZWN0ZWRUaW1lID0gKHRpbWUpID0+XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJiBpc1NhbWVNaW51dGUodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGltZSk7XG5cbiAgaXNEaXNhYmxlZFRpbWUgPSAodGltZSkgPT5cbiAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgdGhpcy5wcm9wcykpIHx8XG4gICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyVGltZSkgJiZcbiAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKTtcblxuICBsaUNsYXNzZXMgPSAodGltZSkgPT4ge1xuICAgIGxldCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbVwiLFxuICAgICAgdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lID8gdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lKHRpbWUpIDogdW5kZWZpbmVkLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0tZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgLy9jb252ZXJ0IHRoaXMucHJvcHMuaW50ZXJ2YWxzIGFuZCB0aGUgcmVsZXZhbnQgdGltZSB0byBzZWNvbmRzIGFuZCBjaGVjayBpZiBpdCBpdCdzIGEgY2xlYW4gbXVsdGlwbGUgb2YgdGhlIGludGVydmFsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgKGdldEhvdXJzKHRpbWUpICogMzYwMCArIGdldE1pbnV0ZXModGltZSkgKiA2MCArIGdldFNlY29uZHModGltZSkpICVcbiAgICAgICAgKHRoaXMucHJvcHMuaW50ZXJ2YWxzICogNjApICE9PVxuICAgICAgICAwXG4gICAgKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0taW5qZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50LCB0aW1lKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmcuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICB0aGlzLmhhbmRsZUNsaWNrKHRpbWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgcmVuZGVyVGltZXMgPSAoKSA9PiB7XG4gICAgbGV0IHRpbWVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQgPyB0aGlzLnByb3BzLmZvcm1hdCA6IFwicFwiO1xuICAgIGNvbnN0IGludGVydmFscyA9IHRoaXMucHJvcHMuaW50ZXJ2YWxzO1xuXG4gICAgY29uc3QgYWN0aXZlRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkIHx8IHRoaXMucHJvcHMub3BlblRvRGF0ZSB8fCBuZXdEYXRlKCk7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0U3RhcnRPZkRheShhY3RpdmVEYXRlKTtcbiAgICBjb25zdCBzb3J0ZWRJbmplY3RUaW1lcyA9XG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzICYmXG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtaW51dGVzSW5EYXkgPSA2MCAqIGdldEhvdXJzSW5EYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IG1pbnV0ZXNJbkRheSAvIGludGVydmFscztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlwbGllcjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGFkZE1pbnV0ZXMoYmFzZSwgaSAqIGludGVydmFscyk7XG4gICAgICB0aW1lcy5wdXNoKGN1cnJlbnRUaW1lKTtcblxuICAgICAgaWYgKHNvcnRlZEluamVjdFRpbWVzKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzVG9JbmplY3QgPSB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gICAgICAgICAgYmFzZSxcbiAgICAgICAgICBjdXJyZW50VGltZSxcbiAgICAgICAgICBpLFxuICAgICAgICAgIGludGVydmFscyxcbiAgICAgICAgICBzb3J0ZWRJbmplY3RUaW1lcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGltZXMgPSB0aW1lcy5jb25jYXQodGltZXNUb0luamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHRpbWUgdG8gZm9jdXMgYW5kIHNjcm9sbCBpbnRvIHZpZXcgd2hlbiBjb21wb25lbnQgbW91bnRzXG4gICAgY29uc3QgdGltZVRvRm9jdXMgPSB0aW1lcy5yZWR1Y2UoKHByZXYsIHRpbWUpID0+IHtcbiAgICAgIGlmICh0aW1lLmdldFRpbWUoKSA8PSBhY3RpdmVEYXRlLmdldFRpbWUoKSkge1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRpbWVzWzBdKTtcblxuICAgIHJldHVybiB0aW1lcy5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGltZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmxpQ2xhc3Nlcyh0aW1lKX1cbiAgICAgICAgICByZWY9eyhsaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWUgPT09IHRpbWVUb0ZvY3VzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VudGVyTGkgPSBsaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9uS2V5RG93bihldiwgdGltZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGltZSA9PT0gdGltZVRvRm9jdXMgPyAwIDogLTF9XG4gICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtmb3JtYXREYXRlKHRpbWUsIGZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lciAke1xuICAgICAgICAgIHRoaXMucHJvcHMudG9kYXlCdXR0b25cbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lci0td2l0aC10b2RheS1idXR0b25cIlxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZSAke1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZS0tb25seVwiXG4gICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgIH1gfVxuICAgICAgICAgIHJlZj17KGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19oZWFkZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWJveFwiPlxuICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdFwiXG4gICAgICAgICAgICAgIHJlZj17KGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBzdHlsZT17aGVpZ2h0ID8geyBoZWlnaHQgfSA6IHt9fVxuICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVzKCl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGdldFllYXIsIG5ld0RhdGUgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xlYXJTZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIFlFQVJfUkVGUyA9IFsuLi5BcnJheSh0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyKV0ubWFwKCgpID0+XG4gICAgUmVhY3QuY3JlYXRlUmVmKCksXG4gICk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBzZWxlY3RpbmdEYXRlID0gKCkgPT4gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gIHVwZGF0ZUZvY3VzT25QYWdpbmF0ZSA9IChyZWZJbmRleCkgPT4ge1xuICAgIGNvbnN0IHdhaXRGb3JSZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuWUVBUl9SRUZTW3JlZkluZGV4XS5jdXJyZW50LmZvY3VzKCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh3YWl0Rm9yUmVSZW5kZXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVZZWFyTmF2aWdhdGlvbiA9IChuZXdZZWFyLCBuZXdEYXRlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChkYXRlLCB5ZWFySXRlbU51bWJlcik7XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuXG4gICAgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA9PT0gLTEpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gICAgfSBlbHNlIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IHllYXJJdGVtTnVtYmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSgwKTtcbiAgICB9IGVsc2UgdGhpcy5ZRUFSX1JFRlNbbmV3WWVhciAtIHN0YXJ0UGVyaW9kXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKHksIG90aGVyKSA9PiB1dGlscy5pc1NhbWVEYXkoeSwgb3RoZXIpO1xuXG4gIGlzQ3VycmVudFllYXIgPSAoeSkgPT4geSA9PT0gZ2V0WWVhcihuZXdEYXRlKCkpO1xuXG4gIGlzUmFuZ2VTdGFydCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuc3RhcnREYXRlKTtcblxuICBpc1JhbmdlRW5kID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luUmFuZ2UgPSAoeSkgPT5cbiAgICB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZSA9ICh5KSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fFxuICAgICAgIXRoaXMuc2VsZWN0aW5nRGF0ZSgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5zZWxlY3RpbmdEYXRlKCksIGVuZERhdGUpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlU3RhcnQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKHkpID0+IHtcbiAgICBjb25zdCBkYXRlID0gdXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcih0aGlzLnByb3BzLmRhdGUsIHkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnNlbGVjdGVkKSkgJiZcbiAgICAgIHV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbikpXG4gICAgKTtcbiAgfTtcblxuICBvblllYXJDbGljayA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuaGFuZGxlWWVhckNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpLCBlKTtcbiAgfTtcblxuICBvblllYXJLZXlEb3duID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGtleSB9ID0gZTtcbiAgICBjb25zdCB7IGhhbmRsZU9uS2V5RG93biB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vblllYXJDbGljayhlLCB5KTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSArIDEsXG4gICAgICAgICAgICB1dGlscy5hZGRZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5IC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5RG93biAmJiBoYW5kbGVPbktleURvd24oZSk7XG4gIH07XG5cbiAgZ2V0WWVhckNsYXNzTmFtZXMgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGUsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgICAgZmlsdGVyRGF0ZSxcbiAgICAgIHllYXJDbGFzc05hbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci0ke3l9YCxcbiAgICAgIHllYXJDbGFzc05hbWUgPyB5ZWFyQ2xhc3NOYW1lKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpIDogdW5kZWZpbmVkLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0ZWRcIjogeSA9PT0gZ2V0WWVhcihzZWxlY3RlZCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcyB8fCBmaWx0ZXJEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzWWVhckRpc2FibGVkKHksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudFllYXIoeSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0WWVhclRhYkluZGV4ID0gKHkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikgcmV0dXJuIFwiLTFcIjtcbiAgICBjb25zdCBwcmVTZWxlY3RlZCA9IHV0aWxzLmdldFllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHkgPT09IHByZVNlbGVjdGVkID8gXCIwXCIgOiBcIi0xXCI7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RpbmdEYXRlLCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsc3goXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyXCIsIHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSksXG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRlbnQgPSAoeSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50ID8gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCh5KSA6IHk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHllYXJzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIsIG9uWWVhck1vdXNlRW50ZXIsIG9uWWVhck1vdXNlTGVhdmUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBkYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcblxuICAgIGZvciAobGV0IHkgPSBzdGFydFBlcmlvZDsgeSA8PSBlbmRQZXJpb2Q7IHkrKykge1xuICAgICAgeWVhcnNMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3RoaXMuWUVBUl9SRUZTW3kgLSBzdGFydFBlcmlvZF19XG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGV2LmtleSA9IFwiRW50ZXJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblllYXJLZXlEb3duKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFllYXJUYWJJbmRleCh5KX1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNsYXNzTmFtZXMoeSl9XG4gICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e3l9XG4gICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFllYXIoeSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLmdldFllYXJDb250ZW50KHkpfVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcygpfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItd3JhcHBlclwiXG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICB7eWVhcnNMaXN0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW5wdXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdGltZVN0cmluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpbWU6IHRoaXMucHJvcHMudGltZVN0cmluZyxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICBpZiAocHJvcHMudGltZVN0cmluZyAhPT0gc3RhdGUudGltZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGltZTogcHJvcHMudGltZVN0cmluZyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIG51bGwgdG8gaW5kaWNhdGUgbm8gY2hhbmdlIHRvIHN0YXRlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25UaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdGltZSB9KTtcblxuICAgIGNvbnN0IHsgZGF0ZTogcHJvcERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNQcm9wRGF0ZVZhbGlkID0gcHJvcERhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihwcm9wRGF0ZSk7XG4gICAgY29uc3QgZGF0ZSA9IGlzUHJvcERhdGVWYWxpZCA/IHByb3BEYXRlIDogbmV3IERhdGUoKTtcblxuICAgIGRhdGUuc2V0SG91cnModGltZS5zcGxpdChcIjpcIilbMF0pO1xuICAgIGRhdGUuc2V0TWludXRlcyh0aW1lLnNwbGl0KFwiOlwiKVsxXSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGRhdGUpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkYXRlLCB0aW1lU3RyaW5nLCBjdXN0b21UaW1lSW5wdXQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY3VzdG9tVGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbVRpbWVJbnB1dCwge1xuICAgICAgICBkYXRlLFxuICAgICAgICB2YWx1ZTogdGltZSxcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMub25UaW1lQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGltZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlRpbWVcIlxuICAgICAgICBuYW1lPVwidGltZS1pbnB1dFwiXG4gICAgICAgIHJlcXVpcmVkXG4gICAgICAgIHZhbHVlPXt0aW1lfVxuICAgICAgICBvbkNoYW5nZT17KGV2KSA9PiB7XG4gICAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoZXYudGFyZ2V0LnZhbHVlIHx8IHRpbWVTdHJpbmcpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19pbnB1dC10aW1lLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9fY2FwdGlvblwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZUlucHV0KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhckNvbnRhaW5lcih7XG4gIHNob3dUaW1lU2VsZWN0T25seSA9IGZhbHNlLFxuICBzaG93VGltZSA9IGZhbHNlLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufSkge1xuICBsZXQgYXJpYUxhYmVsID0gc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgPyBcIkNob29zZSBUaW1lXCJcbiAgICA6IGBDaG9vc2UgRGF0ZSR7c2hvd1RpbWUgPyBcIiBhbmQgVGltZVwiIDogXCJcIn1gO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkNhbGVuZGFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd1RpbWU6IFByb3BUeXBlcy5ib29sLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbn07XG4iLCJpbXBvcnQgWWVhckRyb3Bkb3duIGZyb20gXCIuL3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aERyb3Bkb3duIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoIGZyb20gXCIuL21vbnRoXCI7XG5pbXBvcnQgVGltZSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgWWVhciBmcm9tIFwiLi95ZWFyXCI7XG5pbXBvcnQgSW5wdXRUaW1lIGZyb20gXCIuL2lucHV0VGltZVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgQ2FsZW5kYXJDb250YWluZXIgZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBzZXRNb250aCxcbiAgZ2V0TW9udGgsXG4gIGFkZE1vbnRocyxcbiAgc3ViTW9udGhzLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0U3RhcnRPZlRvZGF5LFxuICBhZGREYXlzLFxuICBmb3JtYXREYXRlLFxuICBzZXRZZWFyLFxuICBnZXRZZWFyLFxuICBpc0JlZm9yZSxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0FmdGVyLFxuICBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlLFxuICBnZXRXZWVrZGF5TWluSW5Mb2NhbGUsXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIG1vbnRoRGlzYWJsZWRCZWZvcmUsXG4gIG1vbnRoRGlzYWJsZWRBZnRlcixcbiAgeWVhckRpc2FibGVkQmVmb3JlLFxuICB5ZWFyRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQmVmb3JlLFxuICBxdWFydGVyRGlzYWJsZWRCZWZvcmUsXG4gIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBhZGRaZXJvLFxuICBpc1ZhbGlkLFxuICBnZXRZZWFyc1BlcmlvZCxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBnZXRNb250aEluTG9jYWxlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMgPSBbXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiLFxuXTtcblxuY29uc3QgaXNEcm9wZG93blNlbGVjdCA9IChlbGVtZW50ID0ge30pID0+IHtcbiAgY29uc3QgY2xhc3NOYW1lcyA9IChlbGVtZW50LmNsYXNzTmFtZSB8fCBcIlwiKS5zcGxpdCgvXFxzKy8pO1xuICByZXR1cm4gRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUy5zb21lKFxuICAgICh0ZXN0Q2xhc3NuYW1lKSA9PiBjbGFzc05hbWVzLmluZGV4T2YodGVzdENsYXNzbmFtZSkgPj0gMCxcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uRHJvcGRvd25Gb2N1czogKCkgPT4ge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKVxuICAgICAgLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKSxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtb250aFNlbGVjdGVkSW46IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRyb3Bkb3duRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uVGltZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uRGF5S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5jb250YWluZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRlOiB0aGlzLmdldERhdGVJblZpZXcoKSxcbiAgICAgIHNlbGVjdGluZ0RhdGU6IG51bGwsXG4gICAgICBtb250aENvbnRhaW5lcjogbnVsbCxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gbW9udGhDb250YWluZXIgaGVpZ2h0IGlzIG5lZWRlZCBpbiB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHRvIGRldGVybWluZSB0aGUgaGVpZ2h0IGZvciB0aGUgdWwgaW4gdGhlIHRpbWUgY29tcG9uZW50XG4gICAgLy8gc2V0U3RhdGUgaGVyZSBzbyBoZWlnaHQgaXMgZ2l2ZW4gYWZ0ZXIgZmluYWwgY29tcG9uZW50XG4gICAgLy8gbGF5b3V0IGlzIHJlbmRlcmVkXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuYXNzaWduTW9udGhDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhDb250YWluZXI6IHRoaXMubW9udGhDb250YWluZXIgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbiAmJlxuICAgICAgKCFpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHByZXZQcm9wcy5wcmVTZWxlY3Rpb24pIHx8XG4gICAgICAgIHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluICE9PSBwcmV2UHJvcHMubW9udGhTZWxlY3RlZEluKVxuICAgICkge1xuICAgICAgY29uc3QgaGFzTW9udGhDaGFuZ2VkID0gIWlzU2FtZU1vbnRoKFxuICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gaGFzTW9udGhDaGFuZ2VkICYmIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZSAmJlxuICAgICAgIWlzU2FtZURheSh0aGlzLnByb3BzLm9wZW5Ub0RhdGUsIHByZXZQcm9wcy5vcGVuVG9EYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGU6IHRoaXMucHJvcHMub3BlblRvRGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICB9O1xuXG4gIHNldENsaWNrT3V0c2lkZVJlZiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGlzRHJvcGRvd25TZWxlY3QoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0ZUluVmlldyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByZVNlbGVjdGlvbiwgc2VsZWN0ZWQsIG9wZW5Ub0RhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld0RhdGUoKTtcbiAgICBjb25zdCBpbml0aWFsRGF0ZSA9IG9wZW5Ub0RhdGUgfHwgc2VsZWN0ZWQgfHwgcHJlU2VsZWN0aW9uO1xuICAgIGlmIChpbml0aWFsRGF0ZSkge1xuICAgICAgcmV0dXJuIGluaXRpYWxEYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWluRGF0ZSAmJiBpc0JlZm9yZShjdXJyZW50LCBtaW5EYXRlKSkge1xuICAgICAgICByZXR1cm4gbWluRGF0ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBpc0FmdGVyKGN1cnJlbnQsIG1heERhdGUpKSB7XG4gICAgICAgIHJldHVybiBtYXhEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfTtcblxuICBpbmNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZE1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgZGVjcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IGRheSB9KTtcbiAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgICB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUoKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VFbnRlciA9IChldmVudCwgeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBzZXRZZWFyKG5ld0RhdGUoKSwgeWVhcikgfSk7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VMZWF2ZSA9IChldmVudCwgeWVhcikgPT4ge1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZShldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uWWVhckNoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb250aENoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW9udGhZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgdGhpcy5oYW5kbGVNb250aENoYW5nZShkYXRlKTtcbiAgfTtcblxuICBjaGFuZ2VZZWFyID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKGRhdGUsIHllYXIpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0TW9udGgoZGF0ZSwgbW9udGgpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aFllYXIgPSAobW9udGhZZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihzZXRNb250aChkYXRlLCBnZXRNb250aChtb250aFllYXIpKSwgZ2V0WWVhcihtb250aFllYXIpKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aFllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhlYWRlciA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSBnZXRTdGFydE9mV2VlayhcbiAgICAgIGRhdGUsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3QgZGF5TmFtZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnMpIHtcbiAgICAgIGRheU5hbWVzLnB1c2goXG4gICAgICAgIDxkaXYga2V5PVwiV1wiIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMud2Vla0xhYmVsIHx8IFwiI1wifVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5TmFtZXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIGNvbnN0IHdlZWtEYXlOYW1lID0gdGhpcy5mb3JtYXRXZWVrZGF5KGRheSwgdGhpcy5wcm9wcy5sb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IHdlZWtEYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWVcbiAgICAgICAgICA/IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZShkYXkpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e29mZnNldH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCIsIHdlZWtEYXlDbGFzc05hbWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt3ZWVrRGF5TmFtZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgZm9ybWF0V2Vla2RheSA9IChkYXksIGxvY2FsZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXkpIHtcbiAgICAgIHJldHVybiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF5LCB0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXksIGxvY2FsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3BzLnVzZVdlZWtkYXlzU2hvcnRcbiAgICAgID8gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF5LCBsb2NhbGUpXG4gICAgICA6IGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXksIGxvY2FsZSk7XG4gIH07XG5cbiAgZGVjcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHN1YlllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNsZWFyU2VsZWN0aW5nRGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgfTtcblxuICByZW5kZXJQcmV2aW91c0J1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYWxsUHJldkRheXNEaXNhYmxlZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhckRpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSBxdWFydGVyRGlzYWJsZWRCZWZvcmUoXG4gICAgICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxQcmV2RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91cy0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwsIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qge1xuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBwcmV2aW91c1llYXJBcmlhTGFiZWwgOiBwcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgaW5jcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZFllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck5leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbE5leHREYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHF1YXJ0ZXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHRcIixcbiAgICBdO1xuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10aW1lXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy50b2RheUJ1dHRvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10b2RheS1idXR0b25cIik7XG4gICAgfVxuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxOZXh0RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IG5leHRNb250aEJ1dHRvbkxhYmVsLCBuZXh0WWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0TW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0WWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IG5leHRZZWFyQXJpYUxhYmVsIDogbmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckN1cnJlbnRNb250aCA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGhcIl07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aERyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICB7Zm9ybWF0RGF0ZShkYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8WWVhckRyb3Bkb3duXG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9XG4gICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHllYXI9e2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aERyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRofVxuICAgICAgICBtb250aD17Z2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoWWVhckRyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVRvZGF5QnV0dG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZ2V0U3RhcnRPZlRvZGF5KCksIGUpO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGdldFN0YXJ0T2ZUb2RheSgpKTtcbiAgfTtcblxuICByZW5kZXJUb2RheUJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMudG9kYXlCdXR0b24gfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdG9kYXktYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlVG9kYXlCdXR0b25DbGljayhlKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRlZmF1bHRIZWFkZXIgPSAoeyBtb250aERhdGUsIGkgfSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciAke1xuICAgICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0XG4gICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0taGFzLXRpbWUtc2VsZWN0XCJcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlckN1cnJlbnRNb250aChtb250aERhdGUpfVxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24tLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aERyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aFllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckN1c3RvbUhlYWRlciA9IChoZWFkZXJBcmdzID0ge30pID0+IHtcbiAgICBjb25zdCB7IG1vbnRoRGF0ZSwgaSB9ID0gaGVhZGVyQXJncztcblxuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmICF0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgcHJldlllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHNob3dEYXlOYW1lcyA9XG4gICAgICAhdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tY3VzdG9tXCJcbiAgICAgICAgb25Gb2N1cz17dGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcih7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICBjdXN0b21IZWFkZXJDb3VudDogaSxcbiAgICAgICAgICBtb250aERhdGUsXG4gICAgICAgICAgY2hhbmdlTW9udGg6IHRoaXMuY2hhbmdlTW9udGgsXG4gICAgICAgICAgY2hhbmdlWWVhcjogdGhpcy5jaGFuZ2VZZWFyLFxuICAgICAgICAgIGRlY3JlYXNlTW9udGg6IHRoaXMuZGVjcmVhc2VNb250aCxcbiAgICAgICAgICBpbmNyZWFzZU1vbnRoOiB0aGlzLmluY3JlYXNlTW9udGgsXG4gICAgICAgICAgZGVjcmVhc2VZZWFyOiB0aGlzLmRlY3JlYXNlWWVhcixcbiAgICAgICAgICBpbmNyZWFzZVllYXI6IHRoaXMuaW5jcmVhc2VZZWFyLFxuICAgICAgICAgIHByZXZNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIHByZXZZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dFllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgfSl9XG4gICAgICAgIHtzaG93RGF5TmFtZXMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckhlYWRlciA9ICh7IG1vbnRoRGF0ZSB9KSA9PiB7XG4gICAgY29uc3QgeyBzaG93WWVhclBpY2tlciwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIG1vbnRoRGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXIteWVhci1oZWFkZXJcIj5cbiAgICAgICAge3Nob3dZZWFyUGlja2VyID8gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YCA6IGdldFllYXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyID0gKGhlYWRlckFyZ3MpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIgIT09IHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ3VzdG9tSGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyWWVhckhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRlZmF1bHRIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoTGlzdCA9IFtdO1xuICAgIGNvbnN0IG1vbnRoc1RvU3VidHJhY3QgPSB0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc1xuICAgICAgPyB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMVxuICAgICAgOiAwO1xuICAgIGNvbnN0IGZyb21Nb250aERhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgID8gYWRkWWVhcnModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KVxuICAgICAgICA6IHN1Yk1vbnRocyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpO1xuICAgIGNvbnN0IG1vbnRoU2VsZWN0ZWRJbiA9IHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluID8/IG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vbnRoc1RvQWRkID0gaSAtIG1vbnRoU2VsZWN0ZWRJbiArIG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgICBjb25zdCBtb250aERhdGUgPVxuICAgICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgICA/IGFkZFllYXJzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKVxuICAgICAgICAgIDogYWRkTW9udGhzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKTtcbiAgICAgIGNvbnN0IG1vbnRoS2V5ID0gYG1vbnRoLSR7aX1gO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgPSBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDE7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ID0gaSA+IDA7XG4gICAgICBtb250aExpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17bW9udGhLZXl9XG4gICAgICAgICAgcmVmPXsoZGl2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoQ29udGFpbmVyID0gZGl2O1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtY29udGFpbmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZSwgaSB9KX1cbiAgICAgICAgICA8TW9udGhcbiAgICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgICAgIGRheT17bW9udGhEYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbkRheUtleURvd259XG4gICAgICAgICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICAgIG9yZGVySW5EaXNwbGF5PXtpfVxuICAgICAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbW9udGhMaXN0O1xuICB9O1xuXG4gIHJlbmRlclllYXJzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGU6IHRoaXMuc3RhdGUuZGF0ZSB9KX1cbiAgICAgICAgICA8WWVhclxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW5nRGF0ZT17dGhpcy5jbGVhclNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLmhhbmRsZVllYXJNb3VzZUxlYXZlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyVGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgKHRoaXMuc3RhdGUubW9udGhDb250YWluZXIgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGltZVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICAgIGZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgICAgaW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgICAgbW9udGhSZWY9e3RoaXMuc3RhdGUubW9udGhDb250YWluZXJ9XG4gICAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dFRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lVmFsaWQgPSBpc1ZhbGlkKHRpbWUpICYmIEJvb2xlYW4odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVN0cmluZyA9IHRpbWVWYWxpZFxuICAgICAgPyBgJHthZGRaZXJvKHRpbWUuZ2V0SG91cnMoKSl9OiR7YWRkWmVybyh0aW1lLmdldE1pbnV0ZXMoKSl9YFxuICAgICAgOiBcIlwiO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnB1dFRpbWVcbiAgICAgICAgICBkYXRlPXt0aW1lfVxuICAgICAgICAgIHRpbWVTdHJpbmc9e3RpbWVTdHJpbmd9XG4gICAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YDtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gZ2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtnZXRNb250aEluTG9jYWxlKFxuICAgICAgICBnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICl9ICR7Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIGFyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNoaWxkcmVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2NoaWxkcmVuLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBDb250YWluZXIgPSB0aGlzLnByb3BzLmNvbnRhaW5lciB8fCBDYWxlbmRhckNvbnRhaW5lcjtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImNvbnRlbnRzXCIgfX0gcmVmPXt0aGlzLmNvbnRhaW5lclJlZn0+XG4gICAgICAgIDxDb250YWluZXJcbiAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXCJyZWFjdC1kYXRlcGlja2VyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXItLXRpbWUtb25seVwiOiB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBzaG93VGltZT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyUHJldmlvdXNCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJOZXh0QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTW9udGhzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyWWVhcnMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUb2RheUJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5jb25zdCBDYWxlbmRhckljb24gPSAoeyBpY29uLCBjbGFzc05hbWUgPSBcIlwiLCBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgZGVmYXVsdENsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyX19jYWxlbmRhci1pY29uXCI7XG5cbiAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGljb24pKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChpY29uLCB7XG4gICAgICBjbGFzc05hbWU6IGAke2ljb24ucHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJ9ICR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gLFxuICAgICAgb25DbGljazogKGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpY29uLnByb3BzLm9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGljb24ucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb25DbGljayhlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaWNvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8aVxuICAgICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtpY29ufSAke2NsYXNzTmFtZX1gfVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBTVkcgSWNvblxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gfVxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIlxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICA+XG4gICAgICA8cGF0aCBkPVwiTTk2IDMyVjY0SDQ4QzIxLjUgNjQgMCA4NS41IDAgMTEydjQ4SDQ0OFYxMTJjMC0yNi41LTIxLjUtNDgtNDgtNDhIMzUyVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjY0SDE2MFYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMlM5NiAxNC4zIDk2IDMyek00NDggMTkySDBWNDY0YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4SDQwMGMyNi41IDAgNDgtMjEuNSA0OC00OFYxOTJ6XCIgLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbkNhbGVuZGFySWNvbi5wcm9wVHlwZXMgPSB7XG4gIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWxlbmRhckljb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290ID0gKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudCkuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0aGlzLnByb3BzLnBvcnRhbElkLFxuICAgICk7XG4gICAgaWYgKCF0aGlzLnBvcnRhbFJvb3QpIHtcbiAgICAgIHRoaXMucG9ydGFsUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aGlzLnBvcnRhbFJvb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpcy5wcm9wcy5wb3J0YWxJZCk7XG4gICAgICAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHRoaXMucG9ydGFsUm9vdCk7XG4gICAgfVxuICAgIHRoaXMucG9ydGFsUm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdC5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3RET00uY3JlYXRlUG9ydGFsKHRoaXMucHJvcHMuY2hpbGRyZW4sIHRoaXMuZWwpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbi8vIFRhYkxvb3AgcHJldmVudHMgdGhlIHVzZXIgZnJvbSB0YWJiaW5nIG91dHNpZGUgb2YgdGhlIHBvcHBlclxuLy8gSXQgY3JlYXRlcyBhIHRhYmluZGV4IGxvb3Agc28gdGhhdCBcIlRhYlwiIG9uIHRoZSBsYXN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudFxuLy8gYW5kIFwiU2hpZnQgVGFiXCIgb24gdGhlIGZpcnN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgbGFzdCBlbGVtZW50XG5cbmNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPVxuICBcIlt0YWJpbmRleF0sIGEsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIjtcbmNvbnN0IGZvY3VzYWJsZUZpbHRlciA9IChub2RlKSA9PiAhbm9kZS5kaXNhYmxlZCAmJiBub2RlLnRhYkluZGV4ICE9PSAtMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiTG9vcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy50YWJMb29wUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gIH1cblxuICAvLyBxdWVyeSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzXG4gIC8vIHRyaW0gZmlyc3QgYW5kIGxhc3QgYmVjYXVzZSB0aGV5IGFyZSB0aGUgZm9jdXMgZ3VhcmRzXG4gIGdldFRhYkNoaWxkcmVuID0gKCkgPT5cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKFxuICAgICAgICB0aGlzLnRhYkxvb3BSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IpLFxuICAgICAgICAxLFxuICAgICAgICAtMSxcbiAgICAgIClcbiAgICAgIC5maWx0ZXIoZm9jdXNhYmxlRmlsdGVyKTtcblxuICBoYW5kbGVGb2N1c1N0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmXG4gICAgICB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmXG4gICAgICB0YWJDaGlsZHJlblt0YWJDaGlsZHJlbi5sZW5ndGggLSAxXS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUZvY3VzRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiYgdGFiQ2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcFwiIHJlZj17dGhpcy50YWJMb29wUmVmfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19zdGFydFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzU3RhcnR9XG4gICAgICAgIC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX2VuZFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzRW5kfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgdXNlRmxvYXRpbmcsXG4gIGFycm93LFxuICBvZmZzZXQsXG4gIGZsaXAsXG4gIGF1dG9VcGRhdGUsXG59IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyA9IFtcbiAgXCJ0b3Atc3RhcnRcIixcbiAgXCJ0b3AtZW5kXCIsXG4gIFwiYm90dG9tLXN0YXJ0XCIsXG4gIFwiYm90dG9tLWVuZFwiLFxuICBcInJpZ2h0LXN0YXJ0XCIsXG4gIFwicmlnaHQtZW5kXCIsXG4gIFwibGVmdC1zdGFydFwiLFxuICBcImxlZnQtZW5kXCIsXG4gIFwidG9wXCIsXG4gIFwicmlnaHRcIixcbiAgXCJib3R0b21cIixcbiAgXCJsZWZ0XCIsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoRmxvYXRpbmcoQ29tcG9uZW50KSB7XG4gIGNvbnN0IFdpdGhGbG9hdGluZyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IGFsdF9wcm9wcyA9IHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgcG9wcGVyTW9kaWZpZXJzOiBwcm9wcy5wb3BwZXJNb2RpZmllcnMgfHwgW10sXG4gICAgICBwb3BwZXJQcm9wczogcHJvcHMucG9wcGVyUHJvcHMgfHwge30sXG4gICAgICBoaWRlUG9wcGVyOlxuICAgICAgICB0eXBlb2YgcHJvcHMuaGlkZVBvcHBlciA9PT0gXCJib29sZWFuXCIgPyBwcm9wcy5oaWRlUG9wcGVyIDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGFycm93UmVmID0gUmVhY3QudXNlUmVmKCk7XG4gICAgY29uc3QgZmxvYXRpbmdQcm9wcyA9IHVzZUZsb2F0aW5nKHtcbiAgICAgIG9wZW46ICFhbHRfcHJvcHMuaGlkZVBvcHBlcixcbiAgICAgIHdoaWxlRWxlbWVudHNNb3VudGVkOiBhdXRvVXBkYXRlLFxuICAgICAgcGxhY2VtZW50OiBhbHRfcHJvcHMucG9wcGVyUGxhY2VtZW50LFxuICAgICAgbWlkZGxld2FyZTogW1xuICAgICAgICBmbGlwKHsgcGFkZGluZzogMTUgfSksXG4gICAgICAgIG9mZnNldCgxMCksXG4gICAgICAgIGFycm93KHsgZWxlbWVudDogYXJyb3dSZWYgfSksXG4gICAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJNb2RpZmllcnMsXG4gICAgICBdLFxuICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlclByb3BzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgey4uLmFsdF9wcm9wc30gcG9wcGVyUHJvcHM9e3sgLi4uZmxvYXRpbmdQcm9wcywgYXJyb3dSZWYgfX0gLz5cbiAgICApO1xuICB9O1xuXG4gIFdpdGhGbG9hdGluZy5wcm9wVHlwZXMgPSB7XG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSxcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHJldHVybiBXaXRoRmxvYXRpbmc7XG59XG4iLCJpbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IEZsb2F0aW5nQXJyb3cgfSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgVGFiTG9vcCBmcm9tIFwiLi90YWJfbG9vcFwiO1xuaW1wb3J0IFBvcnRhbCBmcm9tIFwiLi9wb3J0YWxcIjtcbmltcG9ydCB3aXRoRmxvYXRpbmcgZnJvbSBcIi4vd2l0aF9mbG9hdGluZ1wiO1xuXG4vLyBFeHBvcnRlZCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuZXhwb3J0IGNsYXNzIFBvcHBlckNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoaWRlUG9wcGVyOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlckNvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0YXJnZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlck9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0Fycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgd3JhcHBlckNsYXNzTmFtZSxcbiAgICAgIGhpZGVQb3BwZXIsXG4gICAgICBwb3BwZXJDb21wb25lbnQsXG4gICAgICB0YXJnZXRDb21wb25lbnQsXG4gICAgICBlbmFibGVUYWJMb29wLFxuICAgICAgcG9wcGVyT25LZXlEb3duLFxuICAgICAgcG9ydGFsSWQsXG4gICAgICBwb3J0YWxIb3N0LFxuICAgICAgcG9wcGVyUHJvcHMsXG4gICAgICBzaG93QXJyb3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQgcG9wcGVyO1xuXG4gICAgaWYgKCFoaWRlUG9wcGVyKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xzeChcInJlYWN0LWRhdGVwaWNrZXItcG9wcGVyXCIsIGNsYXNzTmFtZSk7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e2VuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRGbG9hdGluZ31cbiAgICAgICAgICAgIHN0eWxlPXtwb3BwZXJQcm9wcy5mbG9hdGluZ1N0eWxlc31cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlc31cbiAgICAgICAgICAgIGRhdGEtcGxhY2VtZW50PXtwb3BwZXJQcm9wcy5wbGFjZW1lbnR9XG4gICAgICAgICAgICBvbktleURvd249e3BvcHBlck9uS2V5RG93bn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9wcGVyQ29tcG9uZW50fVxuICAgICAgICAgICAge3Nob3dBcnJvdyAmJiAoXG4gICAgICAgICAgICAgIDxGbG9hdGluZ0Fycm93XG4gICAgICAgICAgICAgICAgcmVmPXtwb3BwZXJQcm9wcy5hcnJvd1JlZn1cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtwb3BwZXJQcm9wcy5jb250ZXh0fVxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIGhlaWdodD17OH1cbiAgICAgICAgICAgICAgICB3aWR0aD17MTZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTFweClcIiB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RyaWFuZ2xlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvVGFiTG9vcD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyKSB7XG4gICAgICBwb3BwZXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyLCB7fSwgcG9wcGVyKTtcbiAgICB9XG5cbiAgICBpZiAocG9ydGFsSWQgJiYgIWhpZGVQb3BwZXIpIHtcbiAgICAgIHBvcHBlciA9IChcbiAgICAgICAgPFBvcnRhbCBwb3J0YWxJZD17cG9ydGFsSWR9IHBvcnRhbEhvc3Q9e3BvcnRhbEhvc3R9PlxuICAgICAgICAgIHtwb3BwZXJ9XG4gICAgICAgIDwvUG9ydGFsPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXdyYXBwZXJcIiwgd3JhcHBlckNsYXNzTmFtZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8ZGl2IHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRSZWZlcmVuY2V9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzZXN9PlxuICAgICAgICAgIHt0YXJnZXRDb21wb25lbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cG9wcGVyfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhGbG9hdGluZyhQb3BwZXJDb21wb25lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gXCIuL2NhbGVuZGFyXCI7XG5pbXBvcnQgQ2FsZW5kYXJJY29uIGZyb20gXCIuL2NhbGVuZGFyX2ljb25cIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgUG9wcGVyQ29tcG9uZW50IGZyb20gXCIuL3BvcHBlcl9jb21wb25lbnRcIjtcbmltcG9ydCB7IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyB9IGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHsgc2V0IH0gZnJvbSBcImRhdGUtZm5zL3NldFwiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBpc0RhdGUsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBpc0VxdWFsLFxuICBzZXRUaW1lLFxuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgYWRkRGF5cyxcbiAgYWRkTW9udGhzLFxuICBhZGRXZWVrcyxcbiAgc3ViRGF5cyxcbiAgc3ViTW9udGhzLFxuICBzdWJXZWVrcyxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGdldEVmZmVjdGl2ZU1pbkRhdGUsXG4gIGdldEVmZmVjdGl2ZU1heERhdGUsXG4gIHBhcnNlRGF0ZSxcbiAgc2FmZURhdGVGb3JtYXQsXG4gIHNhZmVEYXRlUmFuZ2VGb3JtYXQsXG4gIGdldEhpZ2h0TGlnaHREYXlzTWFwLFxuICBnZXRZZWFyLFxuICBnZXRNb250aCxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldEVuZE9mV2VlayxcbiAgcmVnaXN0ZXJMb2NhbGUsXG4gIHNldERlZmF1bHRMb2NhbGUsXG4gIGdldERlZmF1bHRMb2NhbGUsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgaXNTYW1lRGF5LFxuICBpc01vbnRoRGlzYWJsZWQsXG4gIGlzWWVhckRpc2FibGVkLFxuICBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCxcbiAgZ2V0SG9saWRheXNNYXAsXG4gIGlzRGF0ZUJlZm9yZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYWxlbmRhckNvbnRhaW5lciB9IGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuXG5leHBvcnQgeyByZWdpc3RlckxvY2FsZSwgc2V0RGVmYXVsdExvY2FsZSwgZ2V0RGVmYXVsdExvY2FsZSB9O1xuXG5jb25zdCBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlci1pZ25vcmUtb25jbGlja291dHNpZGVcIjtcbmNvbnN0IFdyYXBwZWRDYWxlbmRhciA9IG9uQ2xpY2tPdXRzaWRlKENhbGVuZGFyKTtcblxuLy8gQ29tcGFyZXMgZGF0ZXMgeWVhcittb250aCBjb21iaW5hdGlvbnNcbmZ1bmN0aW9uIGhhc1ByZVNlbGVjdGlvbkNoYW5nZWQoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiAoXG4gICAgICBnZXRNb250aChkYXRlMSkgIT09IGdldE1vbnRoKGRhdGUyKSB8fCBnZXRZZWFyKGRhdGUxKSAhPT0gZ2V0WWVhcihkYXRlMilcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGRhdGUxICE9PSBkYXRlMjtcbn1cblxuLyoqXG4gKiBHZW5lcmFsIGRhdGVwaWNrZXIgY29tcG9uZW50LlxuICovXG5jb25zdCBJTlBVVF9FUlJfMSA9IFwiRGF0ZSBpbnB1dCBub3QgdmFsaWQuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVQaWNrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWxsb3dTYW1lRGF5OiBmYWxzZSxcbiAgICAgIGRhdGVGb3JtYXQ6IFwiTU0vZGQveXl5eVwiLFxuICAgICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBcIkxMTEwgeXl5eVwiLFxuICAgICAgb25DaGFuZ2UoKSB7fSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgIGRyb3Bkb3duTW9kZTogXCJzY3JvbGxcIixcbiAgICAgIG9uRm9jdXMoKSB7fSxcbiAgICAgIG9uQmx1cigpIHt9LFxuICAgICAgb25LZXlEb3duKCkge30sXG4gICAgICBvbklucHV0Q2xpY2soKSB7fSxcbiAgICAgIG9uU2VsZWN0KCkge30sXG4gICAgICBvbkNsaWNrT3V0c2lkZSgpIHt9LFxuICAgICAgb25Nb250aENoYW5nZSgpIHt9LFxuICAgICAgb25DYWxlbmRhck9wZW4oKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJDbG9zZSgpIHt9LFxuICAgICAgcHJldmVudE9wZW5PbkZvY3VzOiBmYWxzZSxcbiAgICAgIG9uWWVhckNoYW5nZSgpIHt9LFxuICAgICAgb25JbnB1dEVycm9yKCkge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgIHdpdGhQb3J0YWw6IGZhbHNlLFxuICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IGZhbHNlLFxuICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICAgIHNob3dUaW1lU2VsZWN0OiBmYWxzZSxcbiAgICAgIHNob3dUaW1lSW5wdXQ6IGZhbHNlLFxuICAgICAgc2hvd1ByZXZpb3VzTW9udGhzOiBmYWxzZSxcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93WWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1dlZWtQaWNrZXI6IGZhbHNlLFxuICAgICAgc3RyaWN0UGFyc2luZzogZmFsc2UsXG4gICAgICBzd2FwUmFuZ2U6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsczogMzAsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgdGltZUlucHV0TGFiZWw6IFwiVGltZVwiLFxuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyOiBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gICAgICBmb2N1c1NlbGVjdGVkTW9udGg6IGZhbHNlLFxuICAgICAgc2hvd1BvcHBlckFycm93OiB0cnVlLFxuICAgICAgZXhjbHVkZVNjcm9sbGJhcjogdHJ1ZSxcbiAgICAgIGN1c3RvbVRpbWVJbnB1dDogbnVsbCxcbiAgICAgIGNhbGVuZGFyU3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IGZhbHNlLFxuICAgICAgdXNlUG9pbnRlckV2ZW50OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGFsbG93U2FtZURheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYXJpYURlc2NyaWJlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFJbnZhbGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbENsb3NlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbGxlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFSZXF1aXJlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbG9zZU9uU2Nyb2xsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGN1c3RvbUlucHV0UmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSksXG4gICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICBdKSxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgICBjYWxlbmRhckljb25DbGFzc25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZVJhdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dEVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNhbGVuZGFyT3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DYWxlbmRhckNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwbGFjZWhvbGRlclRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHByZXZlbnRPcGVuT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3RQYXJzaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzd2FwUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHN0YXJ0T3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFiSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEYXRlU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGNsZWFyQnV0dG9uVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xlYXJCdXR0b25DbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdyYXBwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93UG9wcGVyQXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNhbGNJbml0aWFsU3RhdGUoKTtcbiAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAoXG4gICAgICBwcmV2UHJvcHMuaW5saW5lICYmXG4gICAgICBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKHByZXZQcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwcmV2UHJvcHMubW9udGhzU2hvd24gIT09IHRoaXMucHJvcHMubW9udGhzU2hvd25cbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IDAgfSk7XG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMuaGlnaGxpZ2h0RGF0ZXMgIT09IHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoaWdobGlnaHREYXRlczogZ2V0SGlnaHRMaWdodERheXNNYXAodGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcyksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgIXByZXZTdGF0ZS5mb2N1c2VkICYmXG4gICAgICAhaXNFcXVhbChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJldlN0YXRlLm9wZW4gIT09IHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLm9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyT3BlbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldlN0YXRlLm9wZW4gPT09IHRydWUgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJDbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBnZXRQcmVTZWxlY3Rpb24gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZVxuICAgICAgPyB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzRW5kICYmIHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgID8gdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNTdGFydCAmJiB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA/IHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgIDogbmV3RGF0ZSgpO1xuXG4gIC8vIENvbnZlcnQgdGhlIGRhdGUgZnJvbSBzdHJpbmcgZm9ybWF0IHRvIHN0YW5kYXJkIERhdGUgZm9ybWF0XG4gIG1vZGlmeUhvbGlkYXlzID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLmhvbGlkYXlzPy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBob2xpZGF5KSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoaG9saWRheS5kYXRlKTtcbiAgICAgIGlmICghaXNWYWxpZChkYXRlKSkge1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbLi4uYWNjdW11bGF0b3IsIHsgLi4uaG9saWRheSwgZGF0ZSB9XTtcbiAgICB9LCBbXSk7XG5cbiAgY2FsY0luaXRpYWxTdGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UHJlU2VsZWN0aW9uID0gdGhpcy5nZXRQcmVTZWxlY3Rpb24oKTtcbiAgICBjb25zdCBtaW5EYXRlID0gZ2V0RWZmZWN0aXZlTWluRGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBtYXhEYXRlID0gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBib3VuZGVkUHJlU2VsZWN0aW9uID1cbiAgICAgIG1pbkRhdGUgJiYgaXNCZWZvcmUoZGVmYXVsdFByZVNlbGVjdGlvbiwgc3RhcnRPZkRheShtaW5EYXRlKSlcbiAgICAgICAgPyBtaW5EYXRlXG4gICAgICAgIDogbWF4RGF0ZSAmJiBpc0FmdGVyKGRlZmF1bHRQcmVTZWxlY3Rpb24sIGVuZE9mRGF5KG1heERhdGUpKVxuICAgICAgICAgID8gbWF4RGF0ZVxuICAgICAgICAgIDogZGVmYXVsdFByZVNlbGVjdGlvbjtcbiAgICByZXR1cm4ge1xuICAgICAgb3BlbjogdGhpcy5wcm9wcy5zdGFydE9wZW4gfHwgZmFsc2UsXG4gICAgICBwcmV2ZW50Rm9jdXM6IGZhbHNlLFxuICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkKSA/PyBib3VuZGVkUHJlU2VsZWN0aW9uLFxuICAgICAgLy8gdHJhbnNmb3JtaW5nIGhpZ2hsaWdodGVkIGRheXMgKHBlcmhhcHMgbmVzdGVkIGFycmF5KVxuICAgICAgLy8gdG8gZmxhdCBNYXAgZm9yIGZhc3RlciBhY2Nlc3MgaW4gZGF5LmpzeFxuICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAvLyB1c2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvbiBhZnRlciBtb250aCBoYXMgY2hhbmdlZCwgYnV0IG5vdCBvblxuICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9O1xuXG4gIGNsZWFyUHJldmVudEZvY3VzVGltZW91dCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0Rm9jdXMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5mb2N1cykge1xuICAgICAgdGhpcy5pbnB1dC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNldEJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5ibHVyKSB7XG4gICAgICB0aGlzLmlucHV0LmJsdXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBzZXRPcGVuID0gKG9wZW4sIHNraXBTZXRCbHVyID0gZmFsc2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBvcGVuOiBvcGVuLFxuICAgICAgICBwcmVTZWxlY3Rpb246XG4gICAgICAgICAgb3BlbiAmJiB0aGlzLnN0YXRlLm9wZW5cbiAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb25cbiAgICAgICAgICAgIDogdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCkucHJlU2VsZWN0aW9uLFxuICAgICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICghb3Blbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgZm9jdXNlZDogc2tpcFNldEJsdXIgPyBwcmV2LmZvY3VzZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAhc2tpcFNldEJsdXIgJiYgdGhpcy5zZXRCbHVyKCk7XG5cbiAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbiAgaW5wdXRPayA9ICgpID0+IGlzRGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG5cbiAgaXNDYWxlbmRhck9wZW4gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlbiA9PT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuc3RhdGUub3BlbiAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seVxuICAgICAgOiB0aGlzLnByb3BzLm9wZW47XG5cbiAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUucHJldmVudEZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1cyAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiB0cnVlIH0pO1xuICB9O1xuXG4gIHNlbmRGb2N1c0JhY2tUb0lucHV0ID0gKCkgPT4ge1xuICAgIC8vIENsZWFyIHByZXZpb3VzIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgdGhpcy5jbGVhclByZXZlbnRGb2N1c1RpbWVvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBjbG9zZSB0aGUgcG9wcGVyIGFuZCByZWZvY3VzIHRoZSBpbnB1dFxuICAgIC8vIHN0b3AgdGhlIGlucHV0IGZyb20gYXV0byBvcGVuaW5nIG9uRm9jdXNcbiAgICAvLyBzZXRGb2N1cyB0byB0aGUgaW5wdXRcbiAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiB0cnVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJldmVudEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IGZhbHNlIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2FuY2VsRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5pbnB1dEZvY3VzVGltZW91dCk7XG4gICAgdGhpcy5pbnB1dEZvY3VzVGltZW91dCA9IG51bGw7XG4gIH07XG5cbiAgZGVmZXJGb2N1c0lucHV0ID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0Rm9jdXMoKSwgMSk7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLm9wZW4gfHwgdGhpcy5wcm9wcy53aXRoUG9ydGFsIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmYWxzZSB9KTtcbiAgfTtcblxuICBoYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICguLi5hbGxBcmdzKSA9PiB7XG4gICAgbGV0IGV2ZW50ID0gYWxsQXJnc1swXTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdy5hcHBseSh0aGlzLCBhbGxBcmdzKTtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVULFxuICAgIH0pO1xuICAgIGxldCBkYXRlID0gcGFyc2VEYXRlKFxuICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLnN0cmljdFBhcnNpbmcsXG4gICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgKTtcbiAgICAvLyBVc2UgZGF0ZSBmcm9tIGBzZWxlY3RlZGAgcHJvcCB3aGVuIG1hbmlwdWxhdGluZyBvbmx5IHRpbWUgZm9yIGlucHV0IHZhbHVlXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiZcbiAgICAgIGRhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkoZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIGRhdGUgPSBzZXQodGhpcy5wcm9wcy5zZWxlY3RlZCwge1xuICAgICAgICBob3VyczogZ2V0SG91cnMoZGF0ZSksXG4gICAgICAgIG1pbnV0ZXM6IGdldE1pbnV0ZXMoZGF0ZSksXG4gICAgICAgIHNlY29uZHM6IGdldFNlY29uZHMoZGF0ZSksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGUgfHwgIWV2ZW50LnRhcmdldC52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdCA9IChkYXRlLCBldmVudCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgLy8gUHJldmVudGluZyBvbkZvY3VzIGV2ZW50IHRvIGZpeCBpc3N1ZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0hhY2tlcjB4MDEvcmVhY3QtZGF0ZXBpY2tlci9pc3N1ZXMvNjI4XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgZmFsc2UsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc3RhcnREYXRlICYmXG4gICAgICAgICFlbmREYXRlICYmXG4gICAgICAgICh0aGlzLnByb3BzLnN3YXBSYW5nZSB8fCAhaXNEYXRlQmVmb3JlKGRhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgc2V0U2VsZWN0ZWQgPSAoZGF0ZSwgZXZlbnQsIGtlZXBJbnB1dCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgbGV0IGNoYW5nZWREYXRlID0gZGF0ZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZWREYXRlICE9PSBudWxsICYmXG4gICAgICAgIGlzWWVhckRpc2FibGVkKGdldFllYXIoY2hhbmdlZERhdGUpLCB0aGlzLnByb3BzKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcikge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsICYmIGlzTW9udGhEaXNhYmxlZChjaGFuZ2VkRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNEYXlEaXNhYmxlZChjaGFuZ2VkRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgc2VsZWN0c1JhbmdlLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZSxcbiAgICAgIHNlbGVjdGVkRGF0ZXMsXG4gICAgICBtaW5UaW1lLFxuICAgICAgc3dhcFJhbmdlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgIWlzRXF1YWwodGhpcy5wcm9wcy5zZWxlY3RlZCwgY2hhbmdlZERhdGUpIHx8XG4gICAgICB0aGlzLnByb3BzLmFsbG93U2FtZURheSB8fFxuICAgICAgc2VsZWN0c1JhbmdlIHx8XG4gICAgICBzZWxlY3RzTXVsdGlwbGVcbiAgICApIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJlxuICAgICAgICAgICgha2VlcElucHV0IHx8XG4gICAgICAgICAgICAoIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBjaGFuZ2VkRGF0ZSA9IHNldFRpbWUoY2hhbmdlZERhdGUsIHtcbiAgICAgICAgICAgIGhvdXI6IGdldEhvdXJzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgc2Vjb25kOiBnZXRTZWNvbmRzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbWluVGltZSBpcyBwcmVzZW50IHRoZW4gc2V0IHRoZSB0aW1lIHRvIG1pblRpbWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFrZWVwSW5wdXQgJiZcbiAgICAgICAgICAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKG1pblRpbWUpIHtcbiAgICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgICBob3VyOiBtaW5UaW1lLmdldEhvdXJzKCksXG4gICAgICAgICAgICAgIG1pbnV0ZTogbWluVGltZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICAgIHNlY29uZDogbWluVGltZS5nZXRTZWNvbmRzKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb246IGNoYW5nZWREYXRlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5mb2N1c1NlbGVjdGVkTW9udGgpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiBtb250aFNlbGVjdGVkSW4gfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RzUmFuZ2UpIHtcbiAgICAgICAgY29uc3Qgbm9SYW5nZXMgPSAhc3RhcnREYXRlICYmICFlbmREYXRlO1xuICAgICAgICBjb25zdCBoYXNTdGFydFJhbmdlID0gc3RhcnREYXRlICYmICFlbmREYXRlO1xuICAgICAgICBjb25zdCBpc1JhbmdlRmlsbGVkID0gc3RhcnREYXRlICYmIGVuZERhdGU7XG4gICAgICAgIGlmIChub1Jhbmdlcykge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNTdGFydFJhbmdlKSB7XG4gICAgICAgICAgaWYgKGNoYW5nZWREYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZUJlZm9yZShjaGFuZ2VkRGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICAgICAgaWYgKHN3YXBSYW5nZSkge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIHN0YXJ0RGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DaGFuZ2UoW3N0YXJ0RGF0ZSwgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JhbmdlRmlsbGVkKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdHNNdWx0aXBsZSkge1xuICAgICAgICBpZiAoIXNlbGVjdGVkRGF0ZXM/Lmxlbmd0aCkge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWREYXRlcy5zb21lKFxuICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgY2hhbmdlZERhdGUpLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgbmV4dERhdGVzID0gc2VsZWN0ZWREYXRlcy5maWx0ZXIoXG4gICAgICAgICAgICAgIChzZWxlY3RlZERhdGUpID0+ICFpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBvbkNoYW5nZShuZXh0RGF0ZXMsIGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DaGFuZ2UoWy4uLnNlbGVjdGVkRGF0ZXMsIGNoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25DaGFuZ2UoY2hhbmdlZERhdGUsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWtlZXBJbnB1dCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFdoZW4gY2hlY2tpbmcgcHJlU2VsZWN0aW9uIHZpYSBtaW4vbWF4RGF0ZSwgdGltZXMgbmVlZCB0byBiZSBtYW5pcHVsYXRlZCB2aWEgc3RhcnRPZkRheS9lbmRPZkRheVxuICBzZXRQcmVTZWxlY3Rpb24gPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGhhc01pbkRhdGUgPSB0eXBlb2YgdGhpcy5wcm9wcy5taW5EYXRlICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIGNvbnN0IGhhc01heERhdGUgPSB0eXBlb2YgdGhpcy5wcm9wcy5tYXhEYXRlICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIGxldCBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9IHRydWU7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRhdGVTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkYXRlKTtcbiAgICAgIGlmIChoYXNNaW5EYXRlICYmIGhhc01heERhdGUpIHtcbiAgICAgICAgLy8gaXNEYXlJblJhbmdlIHVzZXMgc3RhcnRPZkRheSBpbnRlcm5hbGx5LCBzbyBub3QgbmVjZXNzYXJ5IHRvIG1hbmlwdWxhdGUgdGltZXMgaGVyZVxuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9IGlzRGF5SW5SYW5nZShcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGhhc01pbkRhdGUpIHtcbiAgICAgICAgY29uc3QgbWluRGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0FmdGVyKGRhdGUsIG1pbkRhdGVTdGFydE9mRGF5KSB8fFxuICAgICAgICAgIGlzRXF1YWwoZGF0ZVN0YXJ0T2ZEYXksIG1pbkRhdGVTdGFydE9mRGF5KTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWF4RGF0ZSkge1xuICAgICAgICBjb25zdCBtYXhEYXRlRW5kT2ZEYXkgPSBlbmRPZkRheSh0aGlzLnByb3BzLm1heERhdGUpO1xuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9XG4gICAgICAgICAgaXNCZWZvcmUoZGF0ZSwgbWF4RGF0ZUVuZE9mRGF5KSB8fFxuICAgICAgICAgIGlzRXF1YWwoZGF0ZVN0YXJ0T2ZEYXksIG1heERhdGVFbmRPZkRheSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc1ZhbGlkRGF0ZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHByZVNlbGVjdGlvbjogZGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB0b2dnbGVDYWxlbmRhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldE9wZW4oIXRoaXMuc3RhdGUub3Blbik7XG4gIH07XG5cbiAgaGFuZGxlVGltZUNoYW5nZSA9ICh0aW1lKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA/IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgIDogdGhpcy5nZXRQcmVTZWxlY3Rpb24oKTtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA/IHRpbWVcbiAgICAgIDogc2V0VGltZShzZWxlY3RlZCwge1xuICAgICAgICAgIGhvdXI6IGdldEhvdXJzKHRpbWUpLFxuICAgICAgICAgIG1pbnV0ZTogZ2V0TWludXRlcyh0aW1lKSxcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgfSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIG9uSW5wdXRDbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uSW5wdXRDbGljaygpO1xuICB9O1xuXG4gIG9uSW5wdXRLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuc3RhdGUub3BlbiAmJlxuICAgICAgIXRoaXMucHJvcHMuaW5saW5lICYmXG4gICAgICAhdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXNcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiQXJyb3dEb3duXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiQXJyb3dVcFwiIHx8XG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkVudGVyXCJcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9uSW5wdXRDbGljaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIGNhbGVuZGFyIGlzIG9wZW4sIHRoZXNlIGtleXMgd2lsbCBmb2N1cyB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIGlmICh0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JTdHJpbmcgPVxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiYgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnNcbiAgICAgICAgICAgID8gJy5yZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclt0YWJpbmRleD1cIjBcIl0nXG4gICAgICAgICAgICA6ICcucmVhY3QtZGF0ZXBpY2tlcl9fZGF5W3RhYmluZGV4PVwiMFwiXSc7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9XG4gICAgICAgICAgdGhpcy5jYWxlbmRhci5jb21wb25lbnROb2RlICYmXG4gICAgICAgICAgdGhpcy5jYWxlbmRhci5jb21wb25lbnROb2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JTdHJpbmcpO1xuICAgICAgICBzZWxlY3RlZEl0ZW0gJiYgc2VsZWN0ZWRJdGVtLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvcHkgPSBuZXdEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcbiAgICAgIGlmIChldmVudEtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmlucHV0T2soKSAmJlxuICAgICAgICAgIHRoaXMuc3RhdGUubGFzdFByZVNlbGVjdENoYW5nZSA9PT0gUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEVcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3QoY29weSwgZXZlbnQpO1xuICAgICAgICAgICF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgdGhpcy5zZXRQcmVTZWxlY3Rpb24oY29weSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIlRhYlwiKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5pbnB1dE9rKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBvblBvcnRhbEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgcHJldmVudEZvY3VzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8ga2V5RG93biBldmVudHMgcGFzc2VkIGRvd24gdG8gZGF5LmpzeFxuICBvbkRheUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNTaGlmdEtleUFjdGl2ZSA9IGV2ZW50LnNoaWZ0S2V5O1xuXG4gICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3QoY29weSwgZXZlbnQpO1xuICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgbGV0IG5ld1NlbGVjdGlvbjtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViRGF5cyhjb3B5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZFdlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGREYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZFdlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUGFnZVVwXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBzdWJZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBzdWJNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlRG93blwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGlzU2hpZnRLZXlBY3RpdmVcbiAgICAgICAgICAgID8gYWRkWWVhcnMoY29weSwgMSlcbiAgICAgICAgICAgIDogYWRkTW9udGhzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiSG9tZVwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgICAgY29weSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJFbmRcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBnZXRFbmRPZldlZWsoY29weSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICghbmV3U2VsZWN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXRFcnJvcikge1xuICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFIH0pO1xuICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQobmV3U2VsZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKG5ld1NlbGVjdGlvbik7XG4gICAgICAvLyBuZWVkIHRvIGZpZ3VyZSBvdXQgd2hldGhlciBtb250aCBoYXMgY2hhbmdlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb25cbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgICBjb25zdCBwcmV2TW9udGggPSBnZXRNb250aChjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3TW9udGggPSBnZXRNb250aChuZXdTZWxlY3Rpb24pO1xuICAgICAgICBjb25zdCBwcmV2WWVhciA9IGdldFllYXIoY29weSk7XG4gICAgICAgIGNvbnN0IG5ld1llYXIgPSBnZXRZZWFyKG5ld1NlbGVjdGlvbik7XG5cbiAgICAgICAgaWYgKHByZXZNb250aCAhPT0gbmV3TW9udGggfHwgcHJldlllYXIgIT09IG5ld1llYXIpIHtcbiAgICAgICAgICAvLyBtb250aCBoYXMgY2hhbmdlZFxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG91bGRGb2N1c0RheUlubGluZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtb250aCBoYXNuJ3QgY2hhbmdlZFxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gaGFuZGxlIGdlbmVyaWMga2V5IGRvd24gZXZlbnRzIGluIHRoZSBwb3BwZXIgdGhhdCBkbyBub3QgYWRqdXN0IG9yIHNlbGVjdCBkYXRlc1xuICAvLyBleDogd2hpbGUgZm9jdXNpbmcgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zXG4gIG9uUG9wcGVyS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICB9XG4gIH07XG5cbiAgb25DbGVhckNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoW251bGwsIG51bGxdLCBldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobnVsbCwgZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgfTtcblxuICBjbGVhciA9ICgpID0+IHtcbiAgICB0aGlzLm9uQ2xlYXJDbGljaygpO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbCA9PT0gXCJib29sZWFuXCIgJiZcbiAgICAgIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbFxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50IHx8XG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8XG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckNhbGVuZGFyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMuaXNDYWxlbmRhck9wZW4oKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8V3JhcHBlZENhbGVuZGFyXG4gICAgICAgIHJlZj17KGVsZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gZWxlbTtcbiAgICAgICAgfX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgd2Vla0FyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBtb250aEFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgYWRqdXN0RGF0ZU9uQ2hhbmdlPXt0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZX1cbiAgICAgICAgc2V0T3Blbj17dGhpcy5zZXRPcGVufVxuICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdENhbGVuZGFyfVxuICAgICAgICB1c2VXZWVrZGF5c1Nob3J0PXt0aGlzLnByb3BzLnVzZVdlZWtkYXlzU2hvcnR9XG4gICAgICAgIGZvcm1hdFdlZWtEYXk9e3RoaXMucHJvcHMuZm9ybWF0V2Vla0RheX1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb259XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgb3BlblRvRGF0ZT17dGhpcy5wcm9wcy5vcGVuVG9EYXRlfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgb25DbGlja091dHNpZGU9e3RoaXMuaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGV9XG4gICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMuc3RhdGUuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgIGhvbGlkYXlzPXtnZXRIb2xpZGF5c01hcCh0aGlzLm1vZGlmeUhvbGlkYXlzKCkpfVxuICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgaW5jbHVkZVRpbWVzPXt0aGlzLnByb3BzLmluY2x1ZGVUaW1lc31cbiAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnN0YXRlLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICBwZWVrTmV4dE1vbnRoPXt0aGlzLnByb3BzLnBlZWtOZXh0TW9udGh9XG4gICAgICAgIHNob3dNb250aERyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3dufVxuICAgICAgICBzaG93UHJldmlvdXNNb250aHM9e3RoaXMucHJvcHMuc2hvd1ByZXZpb3VzTW9udGhzfVxuICAgICAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bj17dGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93bn1cbiAgICAgICAgc2hvd01vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgc2hvd1dlZWtOdW1iZXJzPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgc2hvd1llYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3dufVxuICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb259XG4gICAgICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb259XG4gICAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgdG9kYXlCdXR0b249e3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICAgIHdlZWtMYWJlbD17dGhpcy5wcm9wcy53ZWVrTGFiZWx9XG4gICAgICAgIG91dHNpZGVDbGlja0lnbm9yZUNsYXNzPXtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc31cbiAgICAgICAgZml4ZWRIZWlnaHQ9e3RoaXMucHJvcHMuZml4ZWRIZWlnaHR9XG4gICAgICAgIG1vbnRoc1Nob3duPXt0aGlzLnByb3BzLm1vbnRoc1Nob3dufVxuICAgICAgICBtb250aFNlbGVjdGVkSW49e3RoaXMuc3RhdGUubW9udGhTZWxlY3RlZElufVxuICAgICAgICBvbkRyb3Bkb3duRm9jdXM9e3RoaXMuaGFuZGxlRHJvcGRvd25Gb2N1c31cbiAgICAgICAgb25Nb250aENoYW5nZT17dGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlfVxuICAgICAgICBvblllYXJDaGFuZ2U9e3RoaXMucHJvcHMub25ZZWFyQ2hhbmdlfVxuICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICB3ZWVrRGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWV9XG4gICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICB0aW1lQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRpbWVDbGFzc05hbWV9XG4gICAgICAgIHNob3dEYXRlU2VsZWN0PXt0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdD17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdH1cbiAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgb25UaW1lQ2hhbmdlPXt0aGlzLmhhbmRsZVRpbWVDaGFuZ2V9XG4gICAgICAgIHRpbWVGb3JtYXQ9e3RoaXMucHJvcHMudGltZUZvcm1hdH1cbiAgICAgICAgdGltZUludGVydmFscz17dGhpcy5wcm9wcy50aW1lSW50ZXJ2YWxzfVxuICAgICAgICBtaW5UaW1lPXt0aGlzLnByb3BzLm1pblRpbWV9XG4gICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgZXhjbHVkZVRpbWVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lc31cbiAgICAgICAgZmlsdGVyVGltZT17dGhpcy5wcm9wcy5maWx0ZXJUaW1lfVxuICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNhbGVuZGFyQ2xhc3NOYW1lfVxuICAgICAgICBjb250YWluZXI9e3RoaXMucHJvcHMuY2FsZW5kYXJDb250YWluZXJ9XG4gICAgICAgIHllYXJJdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyfVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzTW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRNb250aEFyaWFMYWJlbH1cbiAgICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c1llYXJBcmlhTGFiZWx9XG4gICAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0WWVhckFyaWFMYWJlbD17dGhpcy5wcm9wcy5uZXh0WWVhckFyaWFMYWJlbH1cbiAgICAgICAgbmV4dFllYXJCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0WWVhckJ1dHRvbkxhYmVsfVxuICAgICAgICB0aW1lSW5wdXRMYWJlbD17dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgIHJlbmRlckN1c3RvbUhlYWRlcj17dGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXJ9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgcmVuZGVyTW9udGhDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlck1vbnRoQ29udGVudH1cbiAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgIHJlbmRlclllYXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50fVxuICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMucHJvcHMub25EYXlNb3VzZUVudGVyfVxuICAgICAgICBvbk1vbnRoTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZX1cbiAgICAgICAgb25ZZWFyTW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyfVxuICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmV9XG4gICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICBzaG93VGltZUlucHV0PXt0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgIHNob3dNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyfVxuICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgZXhjbHVkZVNjcm9sbGJhcj17dGhpcy5wcm9wcy5leGNsdWRlU2Nyb2xsYmFyfVxuICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMub25LZXlEb3dufVxuICAgICAgICBoYW5kbGVPbkRheUtleURvd249e3RoaXMub25EYXlLZXlEb3dufVxuICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5zdGF0ZS5mb2N1c2VkfVxuICAgICAgICBjdXN0b21UaW1lSW5wdXQ9e3RoaXMucHJvcHMuY3VzdG9tVGltZUlucHV0fVxuICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICB5ZWFyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnllYXJDbGFzc05hbWV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9XcmFwcGVkQ2FsZW5kYXI+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc0NvbnRhaW5zVGltZSA9XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdDtcbiAgICBjb25zdCBsb25nRGF0ZUZvcm1hdCA9IGlzQ29udGFpbnNUaW1lID8gXCJQUFBQcFwiIDogXCJQUFBQXCI7XG4gICAgbGV0IGFyaWFMaXZlTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHN0YXJ0IGRhdGU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgbG9jYWxlLFxuICAgICAgICB9LFxuICAgICAgKX0uICR7XG4gICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgID8gXCJFbmQgZGF0ZTogXCIgK1xuICAgICAgICAgICAgc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5lbmREYXRlLCB7XG4gICAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogXCJcIlxuICAgICAgfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgdGltZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgeWVhcjogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJ5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgbW9udGg6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQ6IFwiTU1NTSB5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBxdWFydGVyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogXCJ5eXl5LCBRUVFcIixcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fYXJpYS1saXZlXCJcbiAgICAgID5cbiAgICAgICAge2FyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRhdGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbHN4KHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICBbb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3NdOiB0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjdXN0b21JbnB1dCA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXQgfHwgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgLz47XG4gICAgY29uc3QgY3VzdG9tSW5wdXRSZWYgPSB0aGlzLnByb3BzLmN1c3RvbUlucHV0UmVmIHx8IFwicmVmXCI7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy52YWx1ZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgOiB0eXBlb2YgdGhpcy5zdGF0ZS5pbnB1dFZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgPyB0aGlzLnN0YXRlLmlucHV0VmFsdWVcbiAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgICA/IHNhZmVEYXRlUmFuZ2VGb3JtYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGVcbiAgICAgICAgICAgICAgPyBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXMsIHRoaXMucHJvcHMpXG4gICAgICAgICAgICAgIDogc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcyk7XG5cbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbUlucHV0LCB7XG4gICAgICBbY3VzdG9tSW5wdXRSZWZdOiAoaW5wdXQpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgfSxcbiAgICAgIHZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUJsdXIsXG4gICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uSW5wdXRDbGljayxcbiAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsXG4gICAgICBvbktleURvd246IHRoaXMub25JbnB1dEtleURvd24sXG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgIGZvcm06IHRoaXMucHJvcHMuZm9ybSxcbiAgICAgIGF1dG9Gb2N1czogdGhpcy5wcm9wcy5hdXRvRm9jdXMsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlclRleHQsXG4gICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgIGF1dG9Db21wbGV0ZTogdGhpcy5wcm9wcy5hdXRvQ29tcGxldGUsXG4gICAgICBjbGFzc05hbWU6IGNsc3goY3VzdG9tSW5wdXQucHJvcHMuY2xhc3NOYW1lLCBjbGFzc05hbWUpLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnByb3BzLnJlcXVpcmVkLFxuICAgICAgdGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXgsXG4gICAgICBcImFyaWEtZGVzY3JpYmVkYnlcIjogdGhpcy5wcm9wcy5hcmlhRGVzY3JpYmVkQnksXG4gICAgICBcImFyaWEtaW52YWxpZFwiOiB0aGlzLnByb3BzLmFyaWFJbnZhbGlkLFxuICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGhpcy5wcm9wcy5hcmlhTGFiZWxsZWRCeSxcbiAgICAgIFwiYXJpYS1yZXF1aXJlZFwiOiB0aGlzLnByb3BzLmFyaWFSZXF1aXJlZCxcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NsZWFyYWJsZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgY2xlYXJCdXR0b25UaXRsZSxcbiAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lID0gXCJcIixcbiAgICAgIGFyaWFMYWJlbENsb3NlID0gXCJDbG9zZVwiLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoXG4gICAgICBpc0NsZWFyYWJsZSAmJlxuICAgICAgKHNlbGVjdGVkICE9IG51bGwgfHxcbiAgICAgICAgc3RhcnREYXRlICE9IG51bGwgfHxcbiAgICAgICAgZW5kRGF0ZSAhPSBudWxsIHx8XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM/Lmxlbmd0aClcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb25cIixcbiAgICAgICAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lLFxuICAgICAgICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb24tLWRpc2FibGVkXCI6IGRpc2FibGVkIH0sXG4gICAgICAgICAgKX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsQ2xvc2V9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsZWFyQ2xpY2t9XG4gICAgICAgICAgdGl0bGU9e2NsZWFyQnV0dG9uVGl0bGV9XG4gICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcklucHV0Q29udGFpbmVyKCkge1xuICAgIGNvbnN0IHsgc2hvd0ljb24sIGljb24sIGNhbGVuZGFySWNvbkNsYXNzbmFtZSwgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBvcGVuIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtY29udGFpbmVyJHtcbiAgICAgICAgICBzaG93SWNvbiA/IFwiIHJlYWN0LWRhdGVwaWNrZXJfX3ZpZXctY2FsZW5kYXItaWNvblwiIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAge3Nob3dJY29uICYmIChcbiAgICAgICAgICA8Q2FsZW5kYXJJY29uXG4gICAgICAgICAgICBpY29uPXtpY29ufVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjYWxlbmRhckljb25DbGFzc25hbWV9ICR7XG4gICAgICAgICAgICAgIG9wZW4gJiYgXCJyZWFjdC1kYXRlcGlja2VyLWlnbm9yZS1vbmNsaWNrb3V0c2lkZVwiXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHsuLi4odG9nZ2xlQ2FsZW5kYXJPbkljb25DbGlja1xuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMudG9nZ2xlQ2FsZW5kYXIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGwpfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIHRoaXMucmVuZGVyQXJpYUxpdmVSZWdpb24oKX1cbiAgICAgICAge3RoaXMucmVuZGVyRGF0ZUlucHV0KCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNsZWFyQnV0dG9uKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNhbGVuZGFyID0gdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSByZXR1cm4gY2FsZW5kYXI7XG5cbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBsZXQgcG9ydGFsQ29udGFpbmVyID0gdGhpcy5zdGF0ZS5vcGVuID8gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3BvcnRhbFwiXG4gICAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25Qb3J0YWxLZXlEb3dufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjYWxlbmRhcn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UYWJMb29wPlxuICAgICAgKSA6IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnN0YXRlLm9wZW4gJiYgdGhpcy5wcm9wcy5wb3J0YWxJZCkge1xuICAgICAgICBwb3J0YWxDb250YWluZXIgPSAoXG4gICAgICAgICAgPFBvcnRhbFxuICAgICAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgICA8L1BvcnRhbD5cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICAgIHtwb3J0YWxDb250YWluZXJ9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcHBlckNvbXBvbmVudFxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMucG9wcGVyQ2xhc3NOYW1lfVxuICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLndyYXBwZXJDbGFzc05hbWV9XG4gICAgICAgIGhpZGVQb3BwZXI9eyF0aGlzLmlzQ2FsZW5kYXJPcGVuKCl9XG4gICAgICAgIHBvcnRhbElkPXt0aGlzLnByb3BzLnBvcnRhbElkfVxuICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgIHBvcHBlck1vZGlmaWVycz17dGhpcy5wcm9wcy5wb3BwZXJNb2RpZmllcnN9XG4gICAgICAgIHRhcmdldENvbXBvbmVudD17dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICBwb3BwZXJDb250YWluZXI9e3RoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyfVxuICAgICAgICBwb3BwZXJDb21wb25lbnQ9e2NhbGVuZGFyfVxuICAgICAgICBwb3BwZXJQbGFjZW1lbnQ9e3RoaXMucHJvcHMucG9wcGVyUGxhY2VtZW50fVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcG9wcGVyT25LZXlEb3duPXt0aGlzLm9uUG9wcGVyS2V5RG93bn1cbiAgICAgICAgZW5hYmxlVGFiTG9vcD17dGhpcy5wcm9wcy5lbmFibGVUYWJMb29wfVxuICAgICAgICBzaG93QXJyb3c9e3RoaXMucHJvcHMuc2hvd1BvcHBlckFycm93fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUID0gXCJpbnB1dFwiO1xuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgPSBcIm5hdmlnYXRlXCI7XG4iXSwibmFtZXMiOlsiREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSIiwibG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJuZXdEYXRlIiwidmFsdWUiLCJkIiwiU3RyaW5nIiwicGFyc2VJU08iLCJ0b0RhdGUiLCJEYXRlIiwiaXNWYWxpZCIsInBhcnNlRGF0ZSIsImRhdGVGb3JtYXQiLCJsb2NhbGUiLCJzdHJpY3RQYXJzaW5nIiwibWluRGF0ZSIsInBhcnNlZERhdGUiLCJsb2NhbGVPYmplY3QiLCJnZXRMb2NhbGVPYmplY3QiLCJnZXREZWZhdWx0TG9jYWxlIiwic3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2giLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiZGYiLCJ0cnlQYXJzZURhdGUiLCJwYXJzZSIsInVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyIsInVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMiLCJmb3JtYXREYXRlIiwibWF0Y2giLCJtYXAiLCJzdWJzdHJpbmciLCJmaXJzdENoYXJhY3RlciIsImxvbmdGb3JtYXR0ZXIiLCJsb25nRm9ybWF0dGVycyIsImZvcm1hdExvbmciLCJqb2luIiwibGVuZ3RoIiwic2xpY2UiLCJkYXRlIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdFN0ciIsImZvcm1hdCIsImxvY2FsZU9iaiIsImNvbnNvbGUiLCJ3YXJuIiwiY29uY2F0Iiwic2FmZURhdGVGb3JtYXQiLCJfcmVmIiwic2FmZURhdGVSYW5nZUZvcm1hdCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJwcm9wcyIsImZvcm1hdHRlZFN0YXJ0RGF0ZSIsImZvcm1hdHRlZEVuZERhdGUiLCJzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCIsImRhdGVzIiwiZm9ybWF0dGVkRmlyc3REYXRlIiwiZm9ybWF0dGVkU2Vjb25kRGF0ZSIsImV4dHJhRGF0ZXNDb3VudCIsInNldFRpbWUiLCJfcmVmMiIsIl9yZWYyJGhvdXIiLCJob3VyIiwiX3JlZjIkbWludXRlIiwibWludXRlIiwiX3JlZjIkc2Vjb25kIiwic2Vjb25kIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsImdldFdlZWsiLCJnZXRJU09XZWVrIiwiZ2V0RGF5T2ZXZWVrQ29kZSIsImRheSIsImdldFN0YXJ0T2ZEYXkiLCJzdGFydE9mRGF5IiwiZ2V0U3RhcnRPZldlZWsiLCJjYWxlbmRhclN0YXJ0RGF5Iiwic3RhcnRPZldlZWsiLCJ3ZWVrU3RhcnRzT24iLCJnZXRTdGFydE9mTW9udGgiLCJzdGFydE9mTW9udGgiLCJnZXRTdGFydE9mWWVhciIsInN0YXJ0T2ZZZWFyIiwiZ2V0U3RhcnRPZlF1YXJ0ZXIiLCJzdGFydE9mUXVhcnRlciIsImdldFN0YXJ0T2ZUb2RheSIsImdldEVuZE9mV2VlayIsImVuZE9mV2VlayIsImlzU2FtZVllYXIiLCJkYXRlMSIsImRhdGUyIiwiZGZJc1NhbWVZZWFyIiwiaXNTYW1lTW9udGgiLCJkZklzU2FtZU1vbnRoIiwiaXNTYW1lUXVhcnRlciIsImRmSXNTYW1lUXVhcnRlciIsImlzU2FtZURheSIsImRmSXNTYW1lRGF5IiwiaXNFcXVhbCIsImRmSXNFcXVhbCIsImlzRGF5SW5SYW5nZSIsInZhbGlkIiwic3RhcnQiLCJlbmQiLCJlbmRPZkRheSIsImlzV2l0aGluSW50ZXJ2YWwiLCJlcnIiLCJyZWdpc3RlckxvY2FsZSIsImxvY2FsZU5hbWUiLCJsb2NhbGVEYXRhIiwic2NvcGUiLCJ3aW5kb3ciLCJnbG9iYWxUaGlzIiwiX19sb2NhbGVEYXRhX18iLCJzZXREZWZhdWx0TG9jYWxlIiwiX19sb2NhbGVJZF9fIiwibG9jYWxlU3BlYyIsImdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZSIsImZvcm1hdEZ1bmMiLCJnZXRXZWVrZGF5TWluSW5Mb2NhbGUiLCJnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSIsImdldE1vbnRoSW5Mb2NhbGUiLCJtb250aCIsInNldE1vbnRoIiwiZ2V0TW9udGhTaG9ydEluTG9jYWxlIiwiZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUiLCJxdWFydGVyIiwic2V0UXVhcnRlciIsImlzRGF5RGlzYWJsZWQiLCJfcmVmMyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIm1heERhdGUiLCJleGNsdWRlRGF0ZXMiLCJleGNsdWRlRGF0ZUludGVydmFscyIsImluY2x1ZGVEYXRlcyIsImluY2x1ZGVEYXRlSW50ZXJ2YWxzIiwiZmlsdGVyRGF0ZSIsImlzT3V0T2ZCb3VuZHMiLCJzb21lIiwiZXhjbHVkZURhdGUiLCJfcmVmNCIsImluY2x1ZGVEYXRlIiwiX3JlZjUiLCJpc0RheUV4Y2x1ZGVkIiwiX3JlZjYiLCJfcmVmNyIsImlzTW9udGhEaXNhYmxlZCIsIl9yZWY4IiwiZW5kT2ZNb250aCIsImlzTW9udGhJblJhbmdlIiwibSIsInN0YXJ0RGF0ZVllYXIiLCJnZXRZZWFyIiwic3RhcnREYXRlTW9udGgiLCJnZXRNb250aCIsImVuZERhdGVZZWFyIiwiZW5kRGF0ZU1vbnRoIiwiZGF5WWVhciIsImlzUXVhcnRlckRpc2FibGVkIiwiX3JlZjkiLCJpc1llYXJJblJhbmdlIiwieWVhciIsInN0YXJ0WWVhciIsImVuZFllYXIiLCJpc1llYXJEaXNhYmxlZCIsIl9yZWYxMCIsImVuZE9mWWVhciIsImlzUXVhcnRlckluUmFuZ2UiLCJxIiwic3RhcnREYXRlUXVhcnRlciIsImdldFF1YXJ0ZXIiLCJlbmREYXRlUXVhcnRlciIsIl9yZWYxMSIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImlzVGltZUluTGlzdCIsInRpbWUiLCJ0aW1lcyIsImxpc3RUaW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiaXNUaW1lRGlzYWJsZWQiLCJfcmVmMTIiLCJleGNsdWRlVGltZXMiLCJpbmNsdWRlVGltZXMiLCJmaWx0ZXJUaW1lIiwiaXNUaW1lSW5EaXNhYmxlZFJhbmdlIiwiX3JlZjEzIiwibWluVGltZSIsIm1heFRpbWUiLCJFcnJvciIsImJhc2UiLCJiYXNlVGltZSIsIm1pbiIsIm1heCIsIm1vbnRoRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTQiLCJwcmV2aW91c01vbnRoIiwic3ViTW9udGhzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMiLCJldmVyeSIsIm1vbnRoRGlzYWJsZWRBZnRlciIsIl9yZWYxNSIsIm5leHRNb250aCIsImFkZE1vbnRocyIsInF1YXJ0ZXJEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNiIsImZpcnN0RGF0ZU9mWWVhciIsInByZXZpb3VzUXVhcnRlciIsInN1YlF1YXJ0ZXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyIsInF1YXJ0ZXJEaXNhYmxlZEFmdGVyIiwiX3JlZjE3IiwibGFzdERhdGVPZlllYXIiLCJuZXh0UXVhcnRlciIsImFkZFF1YXJ0ZXJzIiwieWVhckRpc2FibGVkQmVmb3JlIiwiX3JlZjE4IiwicHJldmlvdXNZZWFyIiwic3ViWWVhcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIiwieWVhcnNEaXNhYmxlZEJlZm9yZSIsIl9yZWYxOSIsIl9yZWYxOSR5ZWFySXRlbU51bWJlciIsInllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kIiwiZ2V0WWVhcnNQZXJpb2QiLCJlbmRQZXJpb2QiLCJtaW5EYXRlWWVhciIsInllYXJEaXNhYmxlZEFmdGVyIiwiX3JlZjIwIiwibmV4dFllYXIiLCJhZGRZZWFycyIsInllYXJzRGlzYWJsZWRBZnRlciIsIl9yZWYyMSIsIl9yZWYyMSR5ZWFySXRlbU51bWJlciIsIl9nZXRZZWFyc1BlcmlvZDIiLCJzdGFydFBlcmlvZCIsIm1heERhdGVZZWFyIiwiZ2V0RWZmZWN0aXZlTWluRGF0ZSIsIl9yZWYyMiIsIm1pbkRhdGVzIiwiZmlsdGVyIiwiZ2V0RWZmZWN0aXZlTWF4RGF0ZSIsIl9yZWYyMyIsIm1heERhdGVzIiwiZ2V0SGlnaHRMaWdodERheXNNYXAiLCJoaWdobGlnaHREYXRlcyIsImRlZmF1bHRDbGFzc05hbWUiLCJkYXRlQ2xhc3NlcyIsIk1hcCIsImkiLCJsZW4iLCJvYmoiLCJpc0RhdGUiLCJrZXkiLCJjbGFzc05hbWVzQXJyIiwiZ2V0IiwiaW5jbHVkZXMiLCJwdXNoIiwic2V0IiwiX3R5cGVvZiIsImtleXMiLCJPYmplY3QiLCJjbGFzc05hbWUiLCJhcnJPZkRhdGVzIiwiY29uc3RydWN0b3IiLCJrIiwiYXJyYXlzQXJlRXF1YWwiLCJhcnJheTEiLCJhcnJheTIiLCJpbmRleCIsImdldEhvbGlkYXlzTWFwIiwiaG9saWRheURhdGVzIiwiaG9saWRheSIsImRhdGVPYmoiLCJob2xpZGF5TmFtZSIsImNsYXNzTmFtZXNPYmoiLCJob2xpZGF5TmFtZUFyciIsIl90b0NvbnN1bWFibGVBcnJheSIsInRpbWVzVG9JbmplY3RBZnRlciIsImN1cnJlbnRUaW1lIiwiY3VycmVudE11bHRpcGxpZXIiLCJpbnRlcnZhbHMiLCJpbmplY3RlZFRpbWVzIiwibCIsImluamVjdGVkVGltZSIsImFkZEhvdXJzIiwiYWRkTWludXRlcyIsImFkZFNlY29uZHMiLCJnZXRTZWNvbmRzIiwibmV4dFRpbWUiLCJpc0FmdGVyIiwiYWRkWmVybyIsIk1hdGgiLCJjZWlsIiwiZ2V0SG91cnNJbkRheSIsImdldEZ1bGxZZWFyIiwiZ2V0RGF0ZSIsInN0YXJ0T2ZUaGVOZXh0RGF5Iiwicm91bmQiLCJzdGFydE9mTWludXRlIiwic2Vjb25kcyIsIm1pbGxpc2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsImdldFRpbWUiLCJpc1NhbWVNaW51dGUiLCJkMSIsImQyIiwiZ2V0TWlkbmlnaHREYXRlIiwiZGF0ZVdpdGhvdXRUaW1lIiwiaXNEYXRlQmVmb3JlIiwiZGF0ZVRvQ29tcGFyZSIsIm1pZG5pZ2h0RGF0ZSIsIm1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSIsImlzU3BhY2VLZXlEb3duIiwiZXZlbnQiLCJTUEFDRV9LRVkiLCJnZW5lcmF0ZVllYXJzIiwibm9PZlllYXIiLCJsaXN0IiwibmV3WWVhciIsImlzSW5SYW5nZSIsIlllYXJEcm9wZG93bk9wdGlvbnMiLCJfUmVhY3QkQ29tcG9uZW50IiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX2RlZmluZVByb3BlcnR5Iiwic2VsZWN0ZWRZZWFyIiwib3B0aW9ucyIsInN0YXRlIiwieWVhcnNMaXN0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwib25DbGljayIsIm9uQ2hhbmdlIiwiYmluZCIsIm1pblllYXIiLCJtYXhZZWFyIiwiZmluZCIsInVuc2hpZnQiLCJpbmNyZW1lbnRZZWFycyIsImRlY3JlbWVudFllYXJzIiwib25DYW5jZWwiLCJhbW91bnQiLCJ5ZWFycyIsInNldFN0YXRlIiwic2hpZnRZZWFycyIsInllYXJEcm9wZG93bkl0ZW1OdW1iZXIiLCJzY3JvbGxhYmxlWWVhckRyb3Bkb3duIiwiZHJvcGRvd25SZWYiLCJjcmVhdGVSZWYiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsImRyb3Bkb3duQ3VycmVudCIsImN1cnJlbnQiLCJkcm9wZG93bkN1cnJlbnRDaGlsZHJlbiIsImNoaWxkcmVuIiwiZnJvbSIsInNlbGVjdGVkWWVhck9wdGlvbkVsIiwiY2hpbGRFbCIsImFyaWFTZWxlY3RlZCIsInNjcm9sbFRvcCIsIm9mZnNldFRvcCIsImNsaWVudEhlaWdodCIsInNjcm9sbEhlaWdodCIsInJlbmRlciIsImRyb3Bkb3duQ2xhc3MiLCJjbHN4IiwicmVmIiwicmVuZGVyT3B0aW9ucyIsIkNvbXBvbmVudCIsIldyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zIiwib25DbGlja091dHNpZGUiLCJZZWFyRHJvcGRvd24iLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJkcm9wZG93blZpc2libGUiLCJlIiwidGFyZ2V0Iiwib25TZWxlY3RDaGFuZ2UiLCJyZW5kZXJTZWxlY3RPcHRpb25zIiwidmlzaWJsZSIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRvZ2dsZURyb3Bkb3duIiwicmVzdWx0IiwicmVuZGVyUmVhZFZpZXciLCJyZW5kZXJEcm9wZG93biIsImFkanVzdERhdGVPbkNoYW5nZSIsImhhbmRsZVllYXJDaGFuZ2UiLCJvblNlbGVjdCIsInNldE9wZW4iLCJyZW5kZXJlZERyb3Bkb3duIiwiZHJvcGRvd25Nb2RlIiwicmVuZGVyU2Nyb2xsTW9kZSIsInJlbmRlclNlbGVjdE1vZGUiLCJNb250aERyb3Bkb3duT3B0aW9ucyIsIm1vbnRoTmFtZXMiLCJpc1NlbGVjdGVkTW9udGgiLCJXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnMiLCJNb250aERyb3Bkb3duIiwiTSIsIl90aGlzMiIsInVzZVNob3J0TW9udGhJbkRyb3Bkb3duIiwidXRpbHMiLCJnZW5lcmF0ZU1vbnRoWWVhcnMiLCJjdXJyRGF0ZSIsImxhc3REYXRlIiwiTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwibW9udGhZZWFyc0xpc3QiLCJtb250aFllYXIiLCJtb250aFllYXJQb2ludCIsImlzU2FtZU1vbnRoWWVhciIsInNjcm9sbGFibGVNb250aFllYXJEcm9wZG93biIsIldyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJNb250aFllYXJEcm9wZG93biIsInRpbWVQb2ludCIsInllYXJNb250aCIsImNoYW5nZWREYXRlIiwicGFyc2VJbnQiLCJEYXkiLCJpc0Rpc2FibGVkIiwib25Nb3VzZUVudGVyIiwiZXZlbnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZU9uS2V5RG93biIsIm90aGVyIiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREIiwiZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24iLCJpc1NlbGVjdGVkRGF0ZSIsInNlbGVjdHNNdWx0aXBsZSIsInNlbGVjdGVkRGF0ZXMiLCJpc1NhbWVEYXlPcldlZWsiLCJzZWxlY3RlZCIsInByZVNlbGVjdGlvbiIsInNob3dXZWVrUGlja2VyIiwiaXNTYW1lV2VlayIsIl90aGlzJHByb3BzIiwiZGF5U3RyIiwiX3RoaXMkcHJvcHMyIiwiaG9saWRheXMiLCJoYXMiLCJfdGhpcyRwcm9wczMiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmciLCJfdGhpcyRwcm9wczQiLCJzZWxlY3RzU3RhcnQiLCJzZWxlY3RzRW5kIiwic2VsZWN0c1JhbmdlIiwic2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UiLCJzZWxlY3RpbmdEYXRlIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMiIsImlzSW5TZWxlY3RpbmdSYW5nZSIsIl90aGlzJHByb3BzNSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzMiLCJfdGhpcyRwcm9wczYiLCJfdGhpcyRwcm9wczciLCJfdGhpcyRwcm9wczgiLCJ3ZWVrZGF5IiwiZ2V0RGF5IiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREMiIsImRheUNsYXNzTmFtZSIsImlzRXhjbHVkZWQiLCJpc1NlbGVjdGVkIiwiaXNLZXlib2FyZFNlbGVjdGVkIiwiaXNSYW5nZVN0YXJ0IiwiaXNSYW5nZUVuZCIsImlzU2VsZWN0aW5nUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nUmFuZ2VFbmQiLCJpc0N1cnJlbnREYXkiLCJpc1dlZWtlbmQiLCJpc0FmdGVyTW9udGgiLCJpc0JlZm9yZU1vbnRoIiwiZ2V0SGlnaExpZ2h0ZWRDbGFzcyIsImdldEhvbGlkYXlzQ2xhc3MiLCJfdGhpcyRwcm9wczkiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCIsIl90aGlzJHByb3BzOSRhcmlhTGFiZTIiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQiLCJwcmVmaXgiLCJfdGhpcyRwcm9wczEwIiwiX3RoaXMkcHJvcHMxMCRob2xpZGF5IiwiY29tcGFyZUR0IiwidGl0bGVzIiwiYXBwbHkiLCJob2xpZGF5TmFtZXMiLCJtZXNzYWdlIiwic2VsZWN0ZWREYXkiLCJwcmVTZWxlY3Rpb25EYXkiLCJ0YWJJbmRleCIsInNob3dXZWVrTnVtYmVyIiwiaXNTdGFydE9mV2VlayIsIl90aGlzJGRheUVsJGN1cnJlbnQiLCJwcmV2UHJvcHMiLCJzaG91bGRGb2N1c0RheSIsImdldFRhYkluZGV4IiwiaXNJbnB1dEZvY3VzZWQiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJib2R5IiwiaW5saW5lIiwic2hvdWxkRm9jdXNEYXlJbmxpbmUiLCJjb250YWluZXJSZWYiLCJjb250YWlucyIsImNsYXNzTGlzdCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kIiwibW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCIsImRheUVsIiwiZm9jdXMiLCJwcmV2ZW50U2Nyb2xsIiwicmVuZGVyRGF5Q29udGVudHMiLCJnZXRDbGFzc05hbWVzIiwib25LZXlEb3duIiwiaGFuZGxlQ2xpY2siLCJ1c2VQb2ludGVyRXZlbnQiLCJoYW5kbGVNb3VzZUVudGVyIiwib25Qb2ludGVyRW50ZXIiLCJnZXRBcmlhTGFiZWwiLCJyb2xlIiwidGl0bGUiLCJnZXRUaXRsZSIsImhhbmRsZUZvY3VzRGF5IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiV2Vla051bWJlciIsInNob3VsZEZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXJFbCIsImhhbmRsZUZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXIiLCJfdGhpcyRwcm9wcyRhcmlhTGFiZWwiLCJhcmlhTGFiZWxQcmVmaXgiLCJ3ZWVrTnVtYmVyQ2xhc3NlcyIsIldlZWsiLCJvbkRheUNsaWNrIiwib25EYXlNb3VzZUVudGVyIiwib25XZWVrU2VsZWN0IiwiaGFuZGxlRGF5Q2xpY2siLCJzaG91bGRDbG9zZU9uU2VsZWN0IiwiZm9ybWF0V2Vla051bWJlciIsImRheXMiLCJvbkNsaWNrQWN0aW9uIiwiaGFuZGxlV2Vla0NsaWNrIiwib2Zmc2V0IiwiYWRkRGF5cyIsImNob29zZURheUFyaWFMYWJlbFByZWZpeCIsImRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4IiwidmFsdWVPZiIsImhhbmRsZURheU1vdXNlRW50ZXIiLCJyZW5kZXJEYXlzIiwiRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQiLCJNT05USF9DT0xVTU5TX0xBWU9VVCIsIlRXT19DT0xVTU5TIiwiVEhSRUVfQ09MVU1OUyIsIkZPVVJfQ09MVU1OUyIsIk1PTlRIX0NPTFVNTlMiLCJncmlkIiwidmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0IiwiTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCIsImdldE1vbnRoQ29sdW1uc0xheW91dCIsInNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyIiwic2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlciIsIk1vbnRoIiwib3JkZXJJbkRpc3BsYXkiLCJvbk1vdXNlTGVhdmUiLCJpc0luU2VsZWN0aW5nUmFuZ2VNb250aCIsIl9tb250aCIsIl90aGlzJHByb3BzJHNlbGVjdGluZzQiLCJ3ZWVrcyIsImlzRml4ZWRIZWlnaHQiLCJmaXhlZEhlaWdodCIsImJyZWFrQWZ0ZXJOZXh0UHVzaCIsImN1cnJlbnRXZWVrU3RhcnQiLCJ3ZWVrQXJpYUxhYmVsUHJlZml4Iiwic2hvd1dlZWtOdW1iZXJzIiwiaXNGaXhlZEFuZEZpbmFsV2VlayIsImlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoIiwiaXNXZWVrSW5Nb250aCIsInBlZWtOZXh0TW9udGgiLCJsYWJlbERhdGUiLCJuZXdNb250aCIsInNldFByZVNlbGVjdGlvbiIsIk1PTlRIX1JFRlMiLCJoYW5kbGVPbk1vbnRoS2V5RG93biIsIm1vbnRoQ29sdW1uc0xheW91dCIsInZlcnRpY2FsT2Zmc2V0IiwibW9udGhzR3JpZCIsIm9uTW9udGhDbGljayIsImhhbmRsZU1vbnRoTmF2aWdhdGlvbiIsIm5ld1F1YXJ0ZXIiLCJRVUFSVEVSX1JFRlMiLCJvblF1YXJ0ZXJDbGljayIsImhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uIiwibW9udGhDbGFzc05hbWUiLCJfbW9udGhDbGFzc05hbWUiLCJpc1JhbmdlU3RhcnRNb250aCIsImlzUmFuZ2VFbmRNb250aCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0IiwiaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kIiwiaXNDdXJyZW50TW9udGgiLCJwcmVTZWxlY3RlZE1vbnRoIiwicHJlU2VsZWN0ZWRRdWFydGVyIiwiX3RoaXMkcHJvcHMxMSIsIl90aGlzJHByb3BzMTEkY2hvb3NlRCIsIl90aGlzJHByb3BzMTEkZGlzYWJsZSIsIl90aGlzJHByb3BzMTIiLCJpc1NlbGVjdGVkUXVhcnRlciIsImlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIiLCJpc1JhbmdlU3RhcnRRdWFydGVyIiwiaXNSYW5nZUVuZFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczEzIiwic2hvd0Z1bGxNb250aFllYXJQaWNrZXIiLCJyZW5kZXJNb250aENvbnRlbnQiLCJzaG9ydE1vbnRoVGV4dCIsImZ1bGxNb250aFRleHQiLCJfdGhpcyRwcm9wczE0IiwicmVuZGVyUXVhcnRlckNvbnRlbnQiLCJzaG9ydFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczE1IiwibW9udGhDb2x1bW5zIiwiaiIsImV2Iiwib25Nb250aEtleURvd24iLCJvbk1vbnRoTW91c2VFbnRlciIsImdldE1vbnRoQ2xhc3NOYW1lcyIsImdldE1vbnRoQ29udGVudCIsIl90aGlzJHByb3BzMTYiLCJxdWFydGVycyIsIm9uUXVhcnRlcktleURvd24iLCJvblF1YXJ0ZXJNb3VzZUVudGVyIiwiZ2V0UXVhcnRlckNsYXNzTmFtZXMiLCJnZXRRdWFydGVyVGFiSW5kZXgiLCJpc0N1cnJlbnRRdWFydGVyIiwiZ2V0UXVhcnRlckNvbnRlbnQiLCJfdGhpcyRwcm9wczE3Iiwic2hvd01vbnRoWWVhclBpY2tlciIsInNob3dRdWFydGVyWWVhclBpY2tlciIsIl90aGlzJHByb3BzMTgiLCJfdGhpcyRwcm9wczE4JGFyaWFMYWIiLCJmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXgiLCJ0cmltIiwiaGFuZGxlTW91c2VMZWF2ZSIsIm9uUG9pbnRlckxlYXZlIiwicmVuZGVyTW9udGhzIiwicmVuZGVyUXVhcnRlcnMiLCJyZW5kZXJXZWVrcyIsIlRpbWUiLCJoZWlnaHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjZW50ZXJMaSIsImNhbGNDZW50ZXJQb3NpdGlvbiIsIm1vbnRoUmVmIiwiaGVhZGVyIiwiY2xhc3NlcyIsInRpbWVDbGFzc05hbWUiLCJpc1NlbGVjdGVkVGltZSIsImlzRGlzYWJsZWRUaW1lIiwiaW5qZWN0VGltZXMiLCJwcmV2aW91c1NpYmxpbmciLCJuZXh0U2libGluZyIsImFjdGl2ZURhdGUiLCJvcGVuVG9EYXRlIiwic29ydGVkSW5qZWN0VGltZXMiLCJzb3J0IiwiYSIsImIiLCJtaW51dGVzSW5EYXkiLCJtdWx0aXBsaWVyIiwidGltZXNUb0luamVjdCIsInRpbWVUb0ZvY3VzIiwicmVkdWNlIiwicHJldiIsImxpQ2xhc3NlcyIsImxpIiwic2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUiLCJ0b2RheUJ1dHRvbiIsInNob3dUaW1lU2VsZWN0T25seSIsInRpbWVDYXB0aW9uIiwicmVuZGVyVGltZXMiLCJvblRpbWVDaGFuZ2UiLCJsaXN0SGVpZ2h0IiwiY2VudGVyTGlSZWYiLCJZZWFyIiwicmVmSW5kZXgiLCJ3YWl0Rm9yUmVSZW5kZXIiLCJZRUFSX1JFRlMiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QiLCJ1cGRhdGVGb2N1c09uUGFnaW5hdGUiLCJ5IiwiX3llYXIiLCJoYW5kbGVZZWFyQ2xpY2siLCJvblllYXJDbGljayIsImhhbmRsZVllYXJOYXZpZ2F0aW9uIiwieWVhckNsYXNzTmFtZSIsImlzQ3VycmVudFllYXIiLCJwcmVTZWxlY3RlZCIsInJlbmRlclllYXJDb250ZW50Iiwib25ZZWFyTW91c2VFbnRlciIsIm9uWWVhck1vdXNlTGVhdmUiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QyIiwiX2xvb3AiLCJvblllYXJLZXlEb3duIiwiZ2V0WWVhclRhYkluZGV4IiwiZ2V0WWVhckNsYXNzTmFtZXMiLCJnZXRZZWFyQ29udGVudCIsImdldFllYXJDb250YWluZXJDbGFzc05hbWVzIiwiY2xlYXJTZWxlY3RpbmdEYXRlIiwiaW5wdXRUaW1lIiwicHJvcERhdGUiLCJpc1Byb3BEYXRlVmFsaWQiLCJpc05hTiIsInNwbGl0IiwidGltZVN0cmluZyIsImN1c3RvbVRpbWVJbnB1dCIsImNsb25lRWxlbWVudCIsInR5cGUiLCJwbGFjZWhvbGRlciIsIm5hbWUiLCJyZXF1aXJlZCIsInRpbWVJbnB1dExhYmVsIiwicmVuZGVyVGltZUlucHV0IiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwiQ2FsZW5kYXJDb250YWluZXIiLCJfcmVmJHNob3dUaW1lU2VsZWN0T24iLCJfcmVmJHNob3dUaW1lIiwic2hvd1RpbWUiLCJhcmlhTGFiZWwiLCJEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTIiwiaXNEcm9wZG93blNlbGVjdCIsImVsZW1lbnQiLCJjbGFzc05hbWVzIiwidGVzdENsYXNzbmFtZSIsImluZGV4T2YiLCJDYWxlbmRhciIsIm9uRHJvcGRvd25Gb2N1cyIsImluaXRpYWxEYXRlIiwiaGFuZGxlTW9udGhDaGFuZ2UiLCJtb250aFNlbGVjdGVkSW4iLCJvbk1vbnRoTW91c2VMZWF2ZSIsInNldFllYXIiLCJvblllYXJDaGFuZ2UiLCJpc1JlbmRlckFyaWFMaXZlTWVzc2FnZSIsImhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlIiwib25Nb250aENoYW5nZSIsImhhbmRsZU1vbnRoWWVhckNoYW5nZSIsImRheU5hbWVzIiwid2Vla0xhYmVsIiwid2Vla0RheU5hbWUiLCJmb3JtYXRXZWVrZGF5Iiwid2Vla0RheUNsYXNzTmFtZSIsImZvcm1hdFdlZWtEYXkiLCJ1c2VXZWVrZGF5c1Nob3J0Iiwic2hvd1llYXJQaWNrZXIiLCJyZW5kZXJDdXN0b21IZWFkZXIiLCJhbGxQcmV2RGF5c0Rpc2FibGVkIiwiZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uIiwic2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uIiwiaWNvbkNsYXNzZXMiLCJjbGlja0hhbmRsZXIiLCJkZWNyZWFzZU1vbnRoIiwiZGVjcmVhc2VZZWFyIiwiaXNGb3JZZWFyIiwicHJldmlvdXNNb250aEJ1dHRvbkxhYmVsIiwicHJldmlvdXNZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMiLCJwcmV2aW91c01vbnRoQXJpYUxhYmVsIiwiX3RoaXMkcHJvcHMzJHByZXZpb3VzMiIsInByZXZpb3VzWWVhckFyaWFMYWJlbCIsImFsbE5leHREYXlzRGlzYWJsZWQiLCJzaG93VGltZVNlbGVjdCIsImluY3JlYXNlTW9udGgiLCJpbmNyZWFzZVllYXIiLCJuZXh0TW9udGhCdXR0b25MYWJlbCIsIm5leHRZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dE1vbnQiLCJuZXh0TW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dFllYXIiLCJuZXh0WWVhckFyaWFMYWJlbCIsInNob3dZZWFyRHJvcGRvd24iLCJzaG93TW9udGhEcm9wZG93biIsInNob3dNb250aFllYXJEcm9wZG93biIsIm92ZXJyaWRlSGlkZSIsImNoYW5nZVllYXIiLCJjaGFuZ2VNb250aCIsImNoYW5nZU1vbnRoWWVhciIsImhhbmRsZVRvZGF5QnV0dG9uQ2xpY2siLCJtb250aERhdGUiLCJyZW5kZXJDdXJyZW50TW9udGgiLCJvbkZvY3VzIiwiaGFuZGxlRHJvcGRvd25Gb2N1cyIsInJlbmRlck1vbnRoRHJvcGRvd24iLCJyZW5kZXJNb250aFllYXJEcm9wZG93biIsInJlbmRlclllYXJEcm9wZG93biIsImhlYWRlckFyZ3MiLCJtb250aENvbnRhaW5lciIsInByZXZNb250aEJ1dHRvbkRpc2FibGVkIiwibmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQiLCJwcmV2WWVhckJ1dHRvbkRpc2FibGVkIiwibmV4dFllYXJCdXR0b25EaXNhYmxlZCIsInNob3dEYXlOYW1lcyIsIl9vYmplY3RTcHJlYWQiLCJjdXN0b21IZWFkZXJDb3VudCIsInJlbmRlclllYXJIZWFkZXIiLCJyZW5kZXJEZWZhdWx0SGVhZGVyIiwiX3RoaXMkcHJvcHMkbW9udGhTZWxlIiwibW9udGhMaXN0IiwibW9udGhzVG9TdWJ0cmFjdCIsInNob3dQcmV2aW91c01vbnRocyIsIm1vbnRoc1Nob3duIiwiZnJvbU1vbnRoRGF0ZSIsIm1vbnRoc1RvQWRkIiwibW9udGhLZXkiLCJkaXYiLCJyZW5kZXJIZWFkZXIiLCJtb250aEFyaWFMYWJlbFByZWZpeCIsImhhbmRsZU9uRGF5S2V5RG93biIsImhhbmRsZU1vbnRoTW91c2VMZWF2ZSIsIl9leHRlbmRzIiwiaGFuZGxlWWVhck1vdXNlRW50ZXIiLCJoYW5kbGVZZWFyTW91c2VMZWF2ZSIsInRpbWVGb3JtYXQiLCJ0aW1lSW50ZXJ2YWxzIiwid2l0aFBvcnRhbCIsInRpbWVWYWxpZCIsIkJvb2xlYW4iLCJzaG93VGltZUlucHV0IiwiSW5wdXRUaW1lIiwiYXJpYUxpdmVNZXNzYWdlIiwiZ2V0RGF0ZUluVmlldyIsImFzc2lnbk1vbnRoQ29udGFpbmVyIiwiX3RoaXMzIiwiaGFzTW9udGhDaGFuZ2VkIiwiQ29udGFpbmVyIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInJlbmRlckFyaWFMaXZlUmVnaW9uIiwicmVuZGVyUHJldmlvdXNCdXR0b24iLCJyZW5kZXJOZXh0QnV0dG9uIiwicmVuZGVyWWVhcnMiLCJyZW5kZXJUb2RheUJ1dHRvbiIsInJlbmRlclRpbWVTZWN0aW9uIiwicmVuZGVySW5wdXRUaW1lU2VjdGlvbiIsInJlbmRlckNoaWxkcmVuIiwiQ2FsZW5kYXJJY29uIiwiaWNvbiIsIl9yZWYkY2xhc3NOYW1lIiwiZGVmYXVsdENsYXNzIiwiaXNWYWxpZEVsZW1lbnQiLCJ4bWxucyIsInZpZXdCb3giLCJQb3J0YWwiLCJlbCIsInBvcnRhbFJvb3QiLCJwb3J0YWxIb3N0IiwiZ2V0RWxlbWVudEJ5SWQiLCJwb3J0YWxJZCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVDaGlsZCIsIlJlYWN0RE9NIiwiY3JlYXRlUG9ydGFsIiwiZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciIsImZvY3VzYWJsZUZpbHRlciIsIm5vZGUiLCJkaXNhYmxlZCIsIlRhYkxvb3AiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFiTG9vcFJlZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YWJDaGlsZHJlbiIsImdldFRhYkNoaWxkcmVuIiwiZW5hYmxlVGFiTG9vcCIsImhhbmRsZUZvY3VzU3RhcnQiLCJoYW5kbGVGb2N1c0VuZCIsIndpdGhGbG9hdGluZyIsIldpdGhGbG9hdGluZyIsImFsdF9wcm9wcyIsInBvcHBlck1vZGlmaWVycyIsInBvcHBlclByb3BzIiwiaGlkZVBvcHBlciIsImFycm93UmVmIiwidXNlUmVmIiwiZmxvYXRpbmdQcm9wcyIsInVzZUZsb2F0aW5nIiwib3BlbiIsIndoaWxlRWxlbWVudHNNb3VudGVkIiwiYXV0b1VwZGF0ZSIsInBsYWNlbWVudCIsInBvcHBlclBsYWNlbWVudCIsIm1pZGRsZXdhcmUiLCJmbGlwIiwicGFkZGluZyIsImFycm93IiwiUG9wcGVyQ29tcG9uZW50Iiwid3JhcHBlckNsYXNzTmFtZSIsInBvcHBlckNvbXBvbmVudCIsInRhcmdldENvbXBvbmVudCIsInBvcHBlck9uS2V5RG93biIsInNob3dBcnJvdyIsInBvcHBlciIsInJlZnMiLCJzZXRGbG9hdGluZyIsImZsb2F0aW5nU3R5bGVzIiwiRmxvYXRpbmdBcnJvdyIsImNvbnRleHQiLCJmaWxsIiwic3Ryb2tlV2lkdGgiLCJ3aWR0aCIsInRyYW5zZm9ybSIsInBvcHBlckNvbnRhaW5lciIsIndyYXBwZXJDbGFzc2VzIiwiRnJhZ21lbnQiLCJzZXRSZWZlcmVuY2UiLCJvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyIsIldyYXBwZWRDYWxlbmRhciIsImhhc1ByZVNlbGVjdGlvbkNoYW5nZWQiLCJJTlBVVF9FUlJfMSIsIkRhdGVQaWNrZXIiLCJfdGhpcyRwcm9wcyRob2xpZGF5cyIsImFjY3VtdWxhdG9yIiwiZGVmYXVsdFByZVNlbGVjdGlvbiIsImdldFByZVNlbGVjdGlvbiIsImJvdW5kZWRQcmVTZWxlY3Rpb24iLCJzdGFydE9wZW4iLCJwcmV2ZW50Rm9jdXMiLCJmb2N1c2VkIiwicHJldmVudEZvY3VzVGltZW91dCIsImNsZWFyVGltZW91dCIsImlucHV0IiwiYmx1ciIsImNhbmNlbEZvY3VzSW5wdXQiLCJza2lwU2V0Qmx1ciIsImNhbGNJbml0aWFsU3RhdGUiLCJsYXN0UHJlU2VsZWN0Q2hhbmdlIiwiUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUiLCJzZXRCbHVyIiwiaW5wdXRWYWx1ZSIsInJlYWRPbmx5IiwicHJldmVudE9wZW5PbkZvY3VzIiwiY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0Iiwic2V0VGltZW91dCIsInNldEZvY3VzIiwiaW5wdXRGb2N1c1RpbWVvdXQiLCJvbkJsdXIiLCJhbGxBcmdzIiwib25DaGFuZ2VSYXciLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCIsImhvdXJzIiwibWludXRlcyIsInNldFNlbGVjdGVkIiwic2VuZEZvY3VzQmFja1RvSW5wdXQiLCJzaG93RGF0ZVNlbGVjdCIsInN3YXBSYW5nZSIsImtlZXBJbnB1dCIsImFsbG93U2FtZURheSIsImZvY3VzU2VsZWN0ZWRNb250aCIsIm5vUmFuZ2VzIiwiaGFzU3RhcnRSYW5nZSIsImlzUmFuZ2VGaWxsZWQiLCJpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkIiwic2VsZWN0ZWREYXRlIiwibmV4dERhdGVzIiwiaGFzTWluRGF0ZSIsImhhc01heERhdGUiLCJpc1ZhbGlkRGF0ZVNlbGVjdGlvbiIsImRhdGVTdGFydE9mRGF5IiwibWluRGF0ZVN0YXJ0T2ZEYXkiLCJtYXhEYXRlRW5kT2ZEYXkiLCJvbklucHV0Q2xpY2siLCJzZWxlY3RvclN0cmluZyIsInNlbGVjdGVkSXRlbSIsImNhbGVuZGFyIiwiY29tcG9uZW50Tm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjb3B5IiwiaW5wdXRPayIsImhhbmRsZVNlbGVjdCIsIm9uSW5wdXRFcnJvciIsImNvZGUiLCJtc2ciLCJpc1NoaWZ0S2V5QWN0aXZlIiwic2hpZnRLZXkiLCJuZXdTZWxlY3Rpb24iLCJzdWJXZWVrcyIsInN1YkRheXMiLCJhZGRXZWVrcyIsInByZXZNb250aCIsInByZXZZZWFyIiwib25DbGVhckNsaWNrIiwiY2xvc2VPblNjcm9sbCIsImRvY3VtZW50RWxlbWVudCIsImlzQ2FsZW5kYXJPcGVuIiwiZWxlbSIsImRhdGVGb3JtYXRDYWxlbmRhciIsImhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlIiwibW9kaWZ5SG9saWRheXMiLCJoYW5kbGVUaW1lQ2hhbmdlIiwiY2FsZW5kYXJDbGFzc05hbWUiLCJjYWxlbmRhckNvbnRhaW5lciIsImV4Y2x1ZGVTY3JvbGxiYXIiLCJvbkRheUtleURvd24iLCJpc0NvbnRhaW5zVGltZSIsImxvbmdEYXRlRm9ybWF0IiwiX1JlYWN0JGNsb25lRWxlbWVudCIsImN1c3RvbUlucHV0IiwiY3VzdG9tSW5wdXRSZWYiLCJoYW5kbGVCbHVyIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlRm9jdXMiLCJvbklucHV0S2V5RG93biIsImlkIiwiZm9ybSIsImF1dG9Gb2N1cyIsInBsYWNlaG9sZGVyVGV4dCIsImF1dG9Db21wbGV0ZSIsImFyaWFEZXNjcmliZWRCeSIsImFyaWFJbnZhbGlkIiwiYXJpYUxhYmVsbGVkQnkiLCJhcmlhUmVxdWlyZWQiLCJpc0NsZWFyYWJsZSIsImNsZWFyQnV0dG9uVGl0bGUiLCJfdGhpcyRwcm9wczQkY2xlYXJCdXQiLCJjbGVhckJ1dHRvbkNsYXNzTmFtZSIsIl90aGlzJHByb3BzNCRhcmlhTGFiZSIsImFyaWFMYWJlbENsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU2Nyb2xsIiwicHJldlN0YXRlIiwib25DYWxlbmRhck9wZW4iLCJvbkNhbGVuZGFyQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVySW5wdXRDb250YWluZXIiLCJzaG93SWNvbiIsImNhbGVuZGFySWNvbkNsYXNzbmFtZSIsInRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2siLCJ0b2dnbGVDYWxlbmRhciIsInJlbmRlckRhdGVJbnB1dCIsInJlbmRlckNsZWFyQnV0dG9uIiwicmVuZGVyQ2FsZW5kYXIiLCJwb3J0YWxDb250YWluZXIiLCJvblBvcnRhbEtleURvd24iLCJwb3BwZXJDbGFzc05hbWUiLCJvblBvcHBlcktleURvd24iLCJzaG93UG9wcGVyQXJyb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
