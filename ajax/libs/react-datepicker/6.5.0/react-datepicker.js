/*!
  react-datepicker v6.5.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('classnames'), require('date-fns/isDate'), require('date-fns/isValid'), require('date-fns/format'), require('date-fns/addMinutes'), require('date-fns/addHours'), require('date-fns/addDays'), require('date-fns/addWeeks'), require('date-fns/addMonths'), require('date-fns/addQuarters'), require('date-fns/addYears'), require('date-fns/subDays'), require('date-fns/subWeeks'), require('date-fns/subMonths'), require('date-fns/subQuarters'), require('date-fns/subYears'), require('date-fns/getSeconds'), require('date-fns/getMinutes'), require('date-fns/getHours'), require('date-fns/getDay'), require('date-fns/getDate'), require('date-fns/getISOWeek'), require('date-fns/getMonth'), require('date-fns/getQuarter'), require('date-fns/getYear'), require('date-fns/getTime'), require('date-fns/setSeconds'), require('date-fns/setMinutes'), require('date-fns/setHours'), require('date-fns/setMonth'), require('date-fns/setQuarter'), require('date-fns/setYear'), require('date-fns/min'), require('date-fns/max'), require('date-fns/differenceInCalendarDays'), require('date-fns/differenceInCalendarMonths'), require('date-fns/differenceInCalendarYears'), require('date-fns/startOfDay'), require('date-fns/startOfWeek'), require('date-fns/startOfMonth'), require('date-fns/startOfQuarter'), require('date-fns/startOfYear'), require('date-fns/endOfDay'), require('date-fns/endOfWeek'), require('date-fns/endOfMonth'), require('date-fns/endOfYear'), require('date-fns/isEqual'), require('date-fns/isSameDay'), require('date-fns/isSameMonth'), require('date-fns/isSameYear'), require('date-fns/isSameQuarter'), require('date-fns/isAfter'), require('date-fns/isBefore'), require('date-fns/isWithinInterval'), require('date-fns/toDate'), require('date-fns/parse'), require('date-fns/parseISO'), require('react-onclickoutside'), require('react-dom'), require('@floating-ui/react'), require('date-fns/set')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'classnames', 'date-fns/isDate', 'date-fns/isValid', 'date-fns/format', 'date-fns/addMinutes', 'date-fns/addHours', 'date-fns/addDays', 'date-fns/addWeeks', 'date-fns/addMonths', 'date-fns/addQuarters', 'date-fns/addYears', 'date-fns/subDays', 'date-fns/subWeeks', 'date-fns/subMonths', 'date-fns/subQuarters', 'date-fns/subYears', 'date-fns/getSeconds', 'date-fns/getMinutes', 'date-fns/getHours', 'date-fns/getDay', 'date-fns/getDate', 'date-fns/getISOWeek', 'date-fns/getMonth', 'date-fns/getQuarter', 'date-fns/getYear', 'date-fns/getTime', 'date-fns/setSeconds', 'date-fns/setMinutes', 'date-fns/setHours', 'date-fns/setMonth', 'date-fns/setQuarter', 'date-fns/setYear', 'date-fns/min', 'date-fns/max', 'date-fns/differenceInCalendarDays', 'date-fns/differenceInCalendarMonths', 'date-fns/differenceInCalendarYears', 'date-fns/startOfDay', 'date-fns/startOfWeek', 'date-fns/startOfMonth', 'date-fns/startOfQuarter', 'date-fns/startOfYear', 'date-fns/endOfDay', 'date-fns/endOfWeek', 'date-fns/endOfMonth', 'date-fns/endOfYear', 'date-fns/isEqual', 'date-fns/isSameDay', 'date-fns/isSameMonth', 'date-fns/isSameYear', 'date-fns/isSameQuarter', 'date-fns/isAfter', 'date-fns/isBefore', 'date-fns/isWithinInterval', 'date-fns/toDate', 'date-fns/parse', 'date-fns/parseISO', 'react-onclickoutside', 'react-dom', '@floating-ui/react', 'date-fns/set'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DatePicker = {}, global.React, global.PropTypes, global.classNames, global.isDate, global.isValid$1, global.format, global.addMinutes, global.addHours, global.addDays, global.addWeeks, global.addMonths, global.addQuarters, global.addYears, global.subDays, global.subWeeks, global.subMonths, global.subQuarters, global.subYears, global.getSeconds, global.getMinutes, global.getHours, global.getDay, global.getDate, global.getISOWeek, global.getMonth, global.getQuarter, global.getYear, global.getTime, global.setSeconds, global.setMinutes, global.setHours, global.setMonth, global.setQuarter, global.setYear, global.min, global.max, global.differenceInCalendarDays, global.differenceInCalendarMonths, global.differenceInCalendarYears, global.startOfDay, global.startOfWeek, global.startOfMonth, global.startOfQuarter, global.startOfYear, global.endOfDay, global.endOfWeek, global.endOfMonth, global.endOfYear, global.isEqual$1, global.isSameDay$1, global.isSameMonth$1, global.isSameYear$1, global.isSameQuarter$1, global.isAfter, global.isBefore, global.isWithinInterval, global.toDate, global.parse, global.parseISO, global.onClickOutside, global.ReactDOM, global.react, global.set));
})(this, (function (exports, React, propTypes, classnames, isDate, isValid$1, format, addMinutes, addHours, addDays, addWeeks, addMonths, addQuarters, addYears, subDays, subWeeks, subMonths, subQuarters, subYears, getSeconds, getMinutes, getHours, getDay, getDate, getISOWeek, getMonth, getQuarter, getYear, getTime, setSeconds, setMinutes, setHours, setMonth, setQuarter, setYear, min, max, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear, isEqual$1, isSameDay$1, isSameMonth$1, isSameYear$1, isSameQuarter$1, isAfter, isBefore, isWithinInterval, toDate, parse, parseISO, onClickOutside, ReactDOM, react, set) { 'use strict';

  function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefaultCompat(React);
  var classnames__default = /*#__PURE__*/_interopDefaultCompat(classnames);
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
        var dropdownClass = classnames__default.default({
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
        var dropdownClass = classnames__default.default({
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
        return classnames__default.default("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
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
          className: classnames__default.default(weekNumberClasses),
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
          className: classnames__default.default(weekNumberClasses)
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
        return classnames__default.default("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
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
        return classnames__default.default("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
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
        return classnames__default.default("react-datepicker__month", {
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
          minDate = _this$props5.minDate,
          maxDate = _this$props5.maxDate,
          selected = _this$props5.selected,
          excludeDates = _this$props5.excludeDates,
          includeDates = _this$props5.includeDates,
          filterDate = _this$props5.filterDate;
        return classnames__default.default("react-datepicker__year-text", {
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
        return classnames__default.default("react-datepicker__year", {
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
            className: classnames__default.default("react-datepicker__day-name", weekDayClassName)
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
          className: classnames__default.default("react-datepicker", this.props.className, {
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
          var classes = classnames__default.default("react-datepicker-popper", className);
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
        var wrapperClasses = classnames__default.default("react-datepicker-wrapper", wrapperClassName);
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
          usePointerEvent: _this.props.usePointerEvent
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
        var className = classnames__default.default(_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));
        var customInput = _this.props.customInput || /*#__PURE__*/React__default.default.createElement("input", {
          type: "text"
        });
        var customInputRef = _this.props.customInputRef || "ref";
        var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : _this.props.selectsRange ? safeDateRangeFormat(_this.props.startDate, _this.props.endDate, _this.props) : _this.props.selectsMultiple ? safeMultipleDatesFormat(_this.props.selectedDates, _this.props) : safeDateFormat(_this.props.selected, _this.props);
        return /*#__PURE__*/React__default.default.cloneElement(customInput, (_React$cloneElement = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, customInputRef, function (input) {
          _this.input = input;
        }), "value", inputValue), "onBlur", _this.handleBlur), "onChange", _this.handleChange), "onClick", _this.onInputClick), "onFocus", _this.handleFocus), "onKeyDown", _this.onInputKeyDown), "id", _this.props.id), "name", _this.props.name), "form", _this.props.form), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "autoFocus", _this.props.autoFocus), "placeholder", _this.props.placeholderText), "disabled", _this.props.disabled), "autoComplete", _this.props.autoComplete), "className", classnames__default.default(customInput.props.className, className)), "title", _this.props.title), "readOnly", _this.props.readOnly), "required", _this.props.required), "tabIndex", _this.props.tabIndex), "aria-describedby", _this.props.ariaDescribedBy), _defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "aria-invalid", _this.props.ariaInvalid), "aria-labelledby", _this.props.ariaLabelledBy), "aria-required", _this.props.ariaRequired)));
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
            className: classnames__default.default("react-datepicker__close-icon", clearButtonClassName, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtZGF0ZXBpY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGVfdXRpbHMuanMiLCIuLi9zcmMveWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zLmpzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duLmpzeCIsIi4uL3NyYy9kYXkuanN4IiwiLi4vc3JjL3dlZWtfbnVtYmVyLmpzeCIsIi4uL3NyYy93ZWVrLmpzeCIsIi4uL3NyYy9tb250aC5qc3giLCIuLi9zcmMvdGltZS5qc3giLCIuLi9zcmMveWVhci5qc3giLCIuLi9zcmMvaW5wdXRUaW1lLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9jb250YWluZXIuanN4IiwiLi4vc3JjL2NhbGVuZGFyLmpzeCIsIi4uL3NyYy9jYWxlbmRhcl9pY29uLmpzeCIsIi4uL3NyYy9wb3J0YWwuanN4IiwiLi4vc3JjL3RhYl9sb29wLmpzeCIsIi4uL3NyYy93aXRoX2Zsb2F0aW5nLmpzeCIsIi4uL3NyYy9wb3BwZXJfY29tcG9uZW50LmpzeCIsIi4uL3NyYy9pbmRleC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSBcImRhdGUtZm5zL2lzRGF0ZVwiO1xuaW1wb3J0IHsgaXNWYWxpZCBhcyBpc1ZhbGlkRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGxvbmdGb3JtYXR0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2Zvcm1hdFwiO1xuaW1wb3J0IHsgYWRkTWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9hZGRNaW51dGVzXCI7XG5pbXBvcnQgeyBhZGRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9hZGRIb3Vyc1wiO1xuaW1wb3J0IHsgYWRkRGF5cyB9IGZyb20gXCJkYXRlLWZucy9hZGREYXlzXCI7XG5pbXBvcnQgeyBhZGRXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9hZGRXZWVrc1wiO1xuaW1wb3J0IHsgYWRkTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2FkZE1vbnRoc1wiO1xuaW1wb3J0IHsgYWRkUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkUXVhcnRlcnNcIjtcbmltcG9ydCB7IGFkZFllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFllYXJzXCI7XG5pbXBvcnQgeyBzdWJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL3N1YkRheXNcIjtcbmltcG9ydCB7IHN1YldlZWtzIH0gZnJvbSBcImRhdGUtZm5zL3N1YldlZWtzXCI7XG5pbXBvcnQgeyBzdWJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViTW9udGhzXCI7XG5pbXBvcnQgeyBzdWJRdWFydGVycyB9IGZyb20gXCJkYXRlLWZucy9zdWJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3ViWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViWWVhcnNcIjtcbmltcG9ydCB7IGdldFNlY29uZHMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0U2Vjb25kc1wiO1xuaW1wb3J0IHsgZ2V0TWludXRlcyB9IGZyb20gXCJkYXRlLWZucy9nZXRNaW51dGVzXCI7XG5pbXBvcnQgeyBnZXRIb3VycyB9IGZyb20gXCJkYXRlLWZucy9nZXRIb3Vyc1wiO1xuaW1wb3J0IHsgZ2V0RGF5IH0gZnJvbSBcImRhdGUtZm5zL2dldERheVwiO1xuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXRlXCI7XG5pbXBvcnQgeyBnZXRJU09XZWVrIH0gZnJvbSBcImRhdGUtZm5zL2dldElTT1dlZWtcIjtcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2dldE1vbnRoXCI7XG5pbXBvcnQgeyBnZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL2dldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0WWVhclwiO1xuaW1wb3J0IHsgZ2V0VGltZSB9IGZyb20gXCJkYXRlLWZucy9nZXRUaW1lXCI7XG5pbXBvcnQgeyBzZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL3NldFNlY29uZHNcIjtcbmltcG9ydCB7IHNldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0TWludXRlc1wiO1xuaW1wb3J0IHsgc2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0SG91cnNcIjtcbmltcG9ydCB7IHNldE1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3NldE1vbnRoXCI7XG5pbXBvcnQgeyBzZXRRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3NldFF1YXJ0ZXJcIjtcbmltcG9ydCB7IHNldFllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0WWVhclwiO1xuaW1wb3J0IHsgbWluIH0gZnJvbSBcImRhdGUtZm5zL21pblwiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcImRhdGUtZm5zL21heFwiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFyc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mV2Vla1wiO1xuaW1wb3J0IHsgc3RhcnRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZNb250aFwiO1xuaW1wb3J0IHsgc3RhcnRPZlF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlF1YXJ0ZXJcIjtcbmltcG9ydCB7IHN0YXJ0T2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZZZWFyXCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mV2Vla1wiO1xuaW1wb3J0IHsgZW5kT2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9lbmRPZk1vbnRoXCI7XG5pbXBvcnQgeyBlbmRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZZZWFyXCI7XG5pbXBvcnQgeyBpc0VxdWFsIGFzIGRmSXNFcXVhbCB9IGZyb20gXCJkYXRlLWZucy9pc0VxdWFsXCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgYXMgZGZJc1NhbWVEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lRGF5XCI7XG5pbXBvcnQgeyBpc1NhbWVNb250aCBhcyBkZklzU2FtZU1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZU1vbnRoXCI7XG5pbXBvcnQgeyBpc1NhbWVZZWFyIGFzIGRmSXNTYW1lWWVhciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVZZWFyXCI7XG5pbXBvcnQgeyBpc1NhbWVRdWFydGVyIGFzIGRmSXNTYW1lUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVRdWFydGVyXCI7XG5pbXBvcnQgeyBpc0FmdGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzQWZ0ZXJcIjtcbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSBcImRhdGUtZm5zL2lzQmVmb3JlXCI7XG5pbXBvcnQgeyBpc1dpdGhpbkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zL2lzV2l0aGluSW50ZXJ2YWxcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCJkYXRlLWZucy90b0RhdGVcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlXCI7XG5pbXBvcnQgeyBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZucy9wYXJzZUlTT1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSID0gMTI7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbmNvbnN0IGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1ArcCt8UCt8cCt8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vICoqIERhdGUgQ29uc3RydWN0b3JzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdEYXRlKHZhbHVlKSB7XG4gIGNvbnN0IGQgPSB2YWx1ZVxuICAgID8gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHBhcnNlSVNPKHZhbHVlKVxuICAgICAgOiB0b0RhdGUodmFsdWUpXG4gICAgOiBuZXcgRGF0ZSgpO1xuICByZXR1cm4gaXNWYWxpZChkKSA/IGQgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlKHZhbHVlLCBkYXRlRm9ybWF0LCBsb2NhbGUsIHN0cmljdFBhcnNpbmcsIG1pbkRhdGUpIHtcbiAgbGV0IHBhcnNlZERhdGUgPSBudWxsO1xuICBsZXQgbG9jYWxlT2JqZWN0ID1cbiAgICBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSB8fCBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgbGV0IHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID0gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkpIHtcbiAgICBkYXRlRm9ybWF0LmZvckVhY2goKGRmKSA9PiB7XG4gICAgICBsZXQgdHJ5UGFyc2VEYXRlID0gcGFyc2UodmFsdWUsIGRmLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgICAgICBpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiZcbiAgICAgICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZSh0cnlQYXJzZURhdGUsIGRmLCBsb2NhbGUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCkge1xuICAgICAgICBwYXJzZWREYXRlID0gdHJ5UGFyc2VEYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZWREYXRlO1xuICB9XG5cbiAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LCBuZXcgRGF0ZSgpLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xuXG4gIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgaXNWYWxpZChwYXJzZWREYXRlKSAmJlxuICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUocGFyc2VkRGF0ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlKTtcbiAgfSBlbHNlIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0XG4gICAgICAubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCJwXCIgfHwgZmlyc3RDaGFyYWN0ZXIgPT09IFwiUFwiKSB7XG4gICAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgICByZXR1cm4gbG9jYWxlT2JqZWN0XG4gICAgICAgICAgICA/IGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGVPYmplY3QuZm9ybWF0TG9uZylcbiAgICAgICAgICAgIDogZmlyc3RDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlwiKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSwgbmV3IERhdGUoKSwge1xuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPyBwYXJzZWREYXRlIDogbnVsbDtcbn1cblxuLy8gKiogRGF0ZSBcIlJlZmxlY3Rpb25cIiAqKlxuXG5leHBvcnQgeyBpc0RhdGUgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSwgbWluRGF0ZSkge1xuICBtaW5EYXRlID0gbWluRGF0ZSA/IG1pbkRhdGUgOiBuZXcgRGF0ZShcIjEvMS8xMDAwXCIpO1xuICByZXR1cm4gaXNWYWxpZERhdGUoZGF0ZSkgJiYgIWlzQmVmb3JlKGRhdGUsIG1pbkRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIEZvcm1hdHRpbmcgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0U3RyLCBsb2NhbGUpIHtcbiAgaWYgKGxvY2FsZSA9PT0gXCJlblwiKSB7XG4gICAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgfSk7XG4gIH1cbiAgbGV0IGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChsb2NhbGUpO1xuICBpZiAobG9jYWxlICYmICFsb2NhbGVPYmopIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgQSBsb2NhbGUgb2JqZWN0IHdhcyBub3QgZm91bmQgZm9yIHRoZSBwcm92aWRlZCBzdHJpbmcgW1wiJHtsb2NhbGV9XCJdLmAsXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgIWxvY2FsZU9iaiAmJlxuICAgICEhZ2V0RGVmYXVsdExvY2FsZSgpICYmXG4gICAgISFnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKVxuICApIHtcbiAgICBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqID8gbG9jYWxlT2JqIDogbnVsbCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZUZvcm1hdChkYXRlLCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9KSB7XG4gIHJldHVybiAoXG4gICAgKGRhdGUgJiZcbiAgICAgIGZvcm1hdERhdGUoXG4gICAgICAgIGRhdGUsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkgPyBkYXRlRm9ybWF0WzBdIDogZGF0ZUZvcm1hdCxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgKSkgfHxcbiAgICBcIlwiXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZVJhbmdlRm9ybWF0KHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcHJvcHMpIHtcbiAgaWYgKCFzdGFydERhdGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KHN0YXJ0RGF0ZSwgcHJvcHMpO1xuICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gZW5kRGF0ZSA/IHNhZmVEYXRlRm9ybWF0KGVuZERhdGUsIHByb3BzKSA6IFwiXCI7XG5cbiAgcmV0dXJuIGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZX0gLSAke2Zvcm1hdHRlZEVuZERhdGV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KGRhdGVzLCBwcm9wcykge1xuICBpZiAoIWRhdGVzPy5sZW5ndGgpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBjb25zdCBmb3JtYXR0ZWRGaXJzdERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1swXSwgcHJvcHMpO1xuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlZEZpcnN0RGF0ZTtcbiAgfVxuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kRGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzFdLCBwcm9wcyk7XG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0sICR7Zm9ybWF0dGVkU2Vjb25kRGF0ZX1gO1xuICB9XG5cbiAgY29uc3QgZXh0cmFEYXRlc0NvdW50ID0gZGF0ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0gKCske2V4dHJhRGF0ZXNDb3VudH0pYDtcbn1cblxuLy8gKiogRGF0ZSBTZXR0ZXJzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lKGRhdGUsIHsgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSkge1xuICByZXR1cm4gc2V0SG91cnMoc2V0TWludXRlcyhzZXRTZWNvbmRzKGRhdGUsIHNlY29uZCksIG1pbnV0ZSksIGhvdXIpO1xufVxuXG5leHBvcnQgeyBzZXRNaW51dGVzLCBzZXRIb3Vycywgc2V0TW9udGgsIHNldFF1YXJ0ZXIsIHNldFllYXIgfTtcblxuLy8gKiogRGF0ZSBHZXR0ZXJzICoqXG5cbi8vIGdldERheSBSZXR1cm5zIGRheSBvZiB3ZWVrLCBnZXREYXRlIHJldHVybnMgZGF5IG9mIG1vbnRoXG5leHBvcnQge1xuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgZ2V0TW9udGgsXG4gIGdldFF1YXJ0ZXIsXG4gIGdldFllYXIsXG4gIGdldERheSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0VGltZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIGxvY2FsZSkge1xuICBsZXQgbG9jYWxlT2JqID1cbiAgICAobG9jYWxlICYmIGdldExvY2FsZU9iamVjdChsb2NhbGUpKSB8fFxuICAgIChnZXREZWZhdWx0TG9jYWxlKCkgJiYgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSkpO1xuICByZXR1cm4gZ2V0SVNPV2VlayhkYXRlLCBsb2NhbGVPYmogPyB7IGxvY2FsZTogbG9jYWxlT2JqIH0gOiBudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2Vla0NvZGUoZGF5LCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF5LCBcImRkZFwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiogU3RhcnQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mRGF5KGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mV2VlayhkYXRlLCBsb2NhbGUsIGNhbGVuZGFyU3RhcnREYXkpIHtcbiAgbGV0IGxvY2FsZU9iaiA9IGxvY2FsZVxuICAgID8gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSlcbiAgICA6IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqLFxuICAgIHdlZWtTdGFydHNPbjogY2FsZW5kYXJTdGFydERheSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZk1vbnRoKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlllYXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlllYXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mUXVhcnRlcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mUXVhcnRlcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZUb2RheSgpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkobmV3RGF0ZSgpKTtcbn1cblxuLy8gKioqIEVuZCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mV2VlayhkYXRlKSB7XG4gIHJldHVybiBlbmRPZldlZWsoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mTW9udGgoZGF0ZSk7XG59XG5cbi8vICoqIERhdGUgTWF0aCAqKlxuXG4vLyAqKiogQWRkaXRpb24gKioqXG5cbmV4cG9ydCB7IGFkZE1pbnV0ZXMsIGFkZERheXMsIGFkZFdlZWtzLCBhZGRNb250aHMsIGFkZFF1YXJ0ZXJzLCBhZGRZZWFycyB9O1xuXG4vLyAqKiogU3VidHJhY3Rpb24gKioqXG5cbmV4cG9ydCB7IGFkZEhvdXJzLCBzdWJEYXlzLCBzdWJXZWVrcywgc3ViTW9udGhzLCBzdWJRdWFydGVycywgc3ViWWVhcnMgfTtcblxuLy8gKiogRGF0ZSBDb21wYXJpc29uICoqXG5cbmV4cG9ydCB7IGlzQmVmb3JlLCBpc0FmdGVyIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVZZWFyKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVZZWFyKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU1vbnRoKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVRdWFydGVyKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVRdWFydGVyKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURheShkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lRGF5KGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWwoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzRXF1YWwoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gIGxldCB2YWxpZDtcbiAgY29uc3Qgc3RhcnQgPSBzdGFydE9mRGF5KHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZCA9IGVuZE9mRGF5KGVuZERhdGUpO1xuXG4gIHRyeSB7XG4gICAgdmFsaWQgPSBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuLy8gKioqIERpZmZpbmcgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlzRGlmZihkYXRlMSwgZGF0ZTIpIHtcbiAgcmV0dXJuIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlMSwgZGF0ZTIpO1xufVxuXG4vLyAqKiBEYXRlIExvY2FsaXphdGlvbiAqKlxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJMb2NhbGUobG9jYWxlTmFtZSwgbG9jYWxlRGF0YSkge1xuICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuXG4gIGlmICghc2NvcGUuX19sb2NhbGVEYXRhX18pIHtcbiAgICBzY29wZS5fX2xvY2FsZURhdGFfXyA9IHt9O1xuICB9XG4gIHNjb3BlLl9fbG9jYWxlRGF0YV9fW2xvY2FsZU5hbWVdID0gbG9jYWxlRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRMb2NhbGUobG9jYWxlTmFtZSkge1xuICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuXG4gIHNjb3BlLl9fbG9jYWxlSWRfXyA9IGxvY2FsZU5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0TG9jYWxlKCkge1xuICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuXG4gIHJldHVybiBzY29wZS5fX2xvY2FsZUlkX187XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbGVPYmplY3QobG9jYWxlU3BlYykge1xuICBpZiAodHlwZW9mIGxvY2FsZVNwZWMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBUcmVhdCBpdCBhcyBhIGxvY2FsZSBuYW1lIHJlZ2lzdGVyZWQgYnkgcmVnaXN0ZXJMb2NhbGVcbiAgICBjb25zdCBzY29wZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWxUaGlzO1xuICAgIHJldHVybiBzY29wZS5fX2xvY2FsZURhdGFfXyA/IHNjb3BlLl9fbG9jYWxlRGF0YV9fW2xvY2FsZVNwZWNdIDogbnVsbDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUcmVhdCBpdCBhcyBhIHJhdyBkYXRlLWZucyBsb2NhbGUgb2JqZWN0XG4gICAgcmV0dXJuIGxvY2FsZVNwZWM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZShkYXRlLCBmb3JtYXRGdW5jLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdEZ1bmMoZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVcIiwgbG9jYWxlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrZGF5TWluSW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZShkYXRlLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoSW5Mb2NhbGUobW9udGgsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShzZXRNb250aChuZXdEYXRlKCksIG1vbnRoKSwgXCJMTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aFNob3J0SW5Mb2NhbGUobW9udGgsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShzZXRNb250aChuZXdEYXRlKCksIG1vbnRoKSwgXCJMTExcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlKHF1YXJ0ZXIsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShzZXRRdWFydGVyKG5ld0RhdGUoKSwgcXVhcnRlciksIFwiUVFRXCIsIGxvY2FsZSk7XG59XG5cbi8vICoqIFV0aWxzIGZvciBzb21lIGNvbXBvbmVudHMgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5RGlzYWJsZWQoXG4gIGRheSxcbiAge1xuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZSxcbiAgICBleGNsdWRlRGF0ZXMsXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHMsXG4gICAgaW5jbHVkZURhdGVzLFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGZpbHRlckRhdGUsXG4gIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZURheShkYXksIGV4Y2x1ZGVEYXRlLmRhdGUgPyBleGNsdWRlRGF0ZS5kYXRlIDogZXhjbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoZXhjbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgICBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pLFxuICAgICAgKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PiBpc1NhbWVEYXkoZGF5LCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZUludGVydmFscyAmJlxuICAgICAgIWluY2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgICBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pLFxuICAgICAgKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKGRheSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheUV4Y2x1ZGVkKFxuICBkYXksXG4gIHsgZXhjbHVkZURhdGVzLCBleGNsdWRlRGF0ZUludGVydmFscyB9ID0ge30sXG4pIHtcbiAgaWYgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gZXhjbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICBpc1dpdGhpbkludGVydmFsKGRheSwgeyBzdGFydCwgZW5kIH0pLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIChcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZURheShkYXksIGV4Y2x1ZGVEYXRlLmRhdGUgPyBleGNsdWRlRGF0ZS5kYXRlIDogZXhjbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb250aERpc2FibGVkKFxuICBtb250aCxcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKG1vbnRoLCB7XG4gICAgICBtaW5EYXRlOiBzdGFydE9mTW9udGgobWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiBlbmRPZk1vbnRoKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVNb250aChtb250aCwgZXhjbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PiBpc1NhbWVNb250aChtb250aCwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKG1vbnRoKSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgbSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZU1vbnRoID0gZ2V0TW9udGgoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVllYXIgPSBnZXRZZWFyKGVuZERhdGUpO1xuICBjb25zdCBlbmREYXRlTW9udGggPSBnZXRNb250aChlbmREYXRlKTtcbiAgY29uc3QgZGF5WWVhciA9IGdldFllYXIoZGF5KTtcbiAgaWYgKHN0YXJ0RGF0ZVllYXIgPT09IGVuZERhdGVZZWFyICYmIHN0YXJ0RGF0ZVllYXIgPT09IGRheVllYXIpIHtcbiAgICByZXR1cm4gc3RhcnREYXRlTW9udGggPD0gbSAmJiBtIDw9IGVuZERhdGVNb250aDtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlTW9udGggPD0gbSkgfHxcbiAgICAgIChkYXlZZWFyID09PSBlbmREYXRlWWVhciAmJiBlbmREYXRlTW9udGggPj0gbSkgfHxcbiAgICAgIChkYXlZZWFyIDwgZW5kRGF0ZVllYXIgJiYgZGF5WWVhciA+IHN0YXJ0RGF0ZVllYXIpXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNRdWFydGVyRGlzYWJsZWQoXG4gIHF1YXJ0ZXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhxdWFydGVyLCB7IG1pbkRhdGUsIG1heERhdGUgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZVF1YXJ0ZXIocXVhcnRlciwgZXhjbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGluY2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShxdWFydGVyKSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0geWVhclxuICogQHBhcmFtIHtEYXRlfSBzdGFydFxuICogQHBhcmFtIHtEYXRlfSBlbmRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFySW5SYW5nZSh5ZWFyLCBzdGFydCwgZW5kKSB7XG4gIGlmICghaXNWYWxpZERhdGUoc3RhcnQpIHx8ICFpc1ZhbGlkRGF0ZShlbmQpKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHN0YXJ0WWVhciA9IGdldFllYXIoc3RhcnQpO1xuICBjb25zdCBlbmRZZWFyID0gZ2V0WWVhcihlbmQpO1xuXG4gIHJldHVybiBzdGFydFllYXIgPD0geWVhciAmJiBlbmRZZWFyID49IHllYXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJEaXNhYmxlZChcbiAgeWVhcixcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHllYXIsIDAsIDEpO1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMoZGF0ZSwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZlllYXIobWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiBlbmRPZlllYXIobWF4RGF0ZSksXG4gICAgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+IGlzU2FtZVllYXIoZGF0ZSwgZXhjbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICAhaW5jbHVkZURhdGVzLnNvbWUoKGluY2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXRlKSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBlbmREYXRlLCBxLCBkYXkpIHtcbiAgY29uc3Qgc3RhcnREYXRlWWVhciA9IGdldFllYXIoc3RhcnREYXRlKTtcbiAgY29uc3Qgc3RhcnREYXRlUXVhcnRlciA9IGdldFF1YXJ0ZXIoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVllYXIgPSBnZXRZZWFyKGVuZERhdGUpO1xuICBjb25zdCBlbmREYXRlUXVhcnRlciA9IGdldFF1YXJ0ZXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZVF1YXJ0ZXIgPD0gcSAmJiBxIDw9IGVuZERhdGVRdWFydGVyO1xuICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZVllYXIgPCBlbmREYXRlWWVhcikge1xuICAgIHJldHVybiAoXG4gICAgICAoZGF5WWVhciA9PT0gc3RhcnREYXRlWWVhciAmJiBzdGFydERhdGVRdWFydGVyIDw9IHEpIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZVF1YXJ0ZXIgPj0gcSkgfHxcbiAgICAgIChkYXlZZWFyIDwgZW5kRGF0ZVllYXIgJiYgZGF5WWVhciA+IHN0YXJ0RGF0ZVllYXIpXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPdXRPZkJvdW5kcyhkYXksIHsgbWluRGF0ZSwgbWF4RGF0ZSB9ID0ge30pIHtcbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF5LCBtaW5EYXRlKSA8IDApIHx8XG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWF4RGF0ZSkgPiAwKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lSW5MaXN0KHRpbWUsIHRpbWVzKSB7XG4gIHJldHVybiB0aW1lcy5zb21lKFxuICAgIChsaXN0VGltZSkgPT5cbiAgICAgIGdldEhvdXJzKGxpc3RUaW1lKSA9PT0gZ2V0SG91cnModGltZSkgJiZcbiAgICAgIGdldE1pbnV0ZXMobGlzdFRpbWUpID09PSBnZXRNaW51dGVzKHRpbWUpLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lRGlzYWJsZWQoXG4gIHRpbWUsXG4gIHsgZXhjbHVkZVRpbWVzLCBpbmNsdWRlVGltZXMsIGZpbHRlclRpbWUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVUaW1lcyAmJiBpc1RpbWVJbkxpc3QodGltZSwgZXhjbHVkZVRpbWVzKSkgfHxcbiAgICAoaW5jbHVkZVRpbWVzICYmICFpc1RpbWVJbkxpc3QodGltZSwgaW5jbHVkZVRpbWVzKSkgfHxcbiAgICAoZmlsdGVyVGltZSAmJiAhZmlsdGVyVGltZSh0aW1lKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHsgbWluVGltZSwgbWF4VGltZSB9KSB7XG4gIGlmICghbWluVGltZSB8fCAhbWF4VGltZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJvdGggbWluVGltZSBhbmQgbWF4VGltZSBwcm9wcyByZXF1aXJlZFwiKTtcbiAgfVxuICBjb25zdCBiYXNlID0gbmV3RGF0ZSgpO1xuICBjb25zdCBiYXNlVGltZSA9IHNldEhvdXJzKHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyh0aW1lKSksIGdldEhvdXJzKHRpbWUpKTtcbiAgY29uc3QgbWluID0gc2V0SG91cnMoXG4gICAgc2V0TWludXRlcyhiYXNlLCBnZXRNaW51dGVzKG1pblRpbWUpKSxcbiAgICBnZXRIb3VycyhtaW5UaW1lKSxcbiAgKTtcbiAgY29uc3QgbWF4ID0gc2V0SG91cnMoXG4gICAgc2V0TWludXRlcyhiYXNlLCBnZXRNaW51dGVzKG1heFRpbWUpKSxcbiAgICBnZXRIb3VycyhtYXhUaW1lKSxcbiAgKTtcblxuICBsZXQgdmFsaWQ7XG4gIHRyeSB7XG4gICAgdmFsaWQgPSAhaXNXaXRoaW5JbnRlcnZhbChiYXNlVGltZSwgeyBzdGFydDogbWluLCBlbmQ6IG1heCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzTW9udGggPSBzdWJNb250aHMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWluRGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhtaW5EYXRlLCBwcmV2aW91c01vbnRoKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMoaW5jbHVkZURhdGUsIHByZXZpb3VzTW9udGgpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbnRoRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0TW9udGggPSBhZGRNb250aHMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhuZXh0TW9udGgsIG1heERhdGUpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhckRpc2FibGVkQmVmb3JlKGRheSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IHN1YlllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhtaW5EYXRlLCBwcmV2aW91c1llYXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1llYXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJzRGlzYWJsZWRCZWZvcmUoXG4gIGRheSxcbiAgeyBtaW5EYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgcHJldmlvdXNZZWFyID0gZ2V0U3RhcnRPZlllYXIoc3ViWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcikpO1xuICBjb25zdCB7IGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QocHJldmlvdXNZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1pbkRhdGVZZWFyID0gbWluRGF0ZSAmJiBnZXRZZWFyKG1pbkRhdGUpO1xuICByZXR1cm4gKG1pbkRhdGVZZWFyICYmIG1pbkRhdGVZZWFyID4gZW5kUGVyaW9kKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCAxKTtcbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobmV4dFllYXIsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQWZ0ZXIoXG4gIGRheSxcbiAgeyBtYXhEYXRlLCB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiB9ID0ge30sXG4pIHtcbiAgY29uc3QgbmV4dFllYXIgPSBhZGRZZWFycyhkYXksIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QobmV4dFllYXIsIHllYXJJdGVtTnVtYmVyKTtcbiAgY29uc3QgbWF4RGF0ZVllYXIgPSBtYXhEYXRlICYmIGdldFllYXIobWF4RGF0ZSk7XG4gIHJldHVybiAobWF4RGF0ZVllYXIgJiYgbWF4RGF0ZVllYXIgPCBzdGFydFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNaW5EYXRlKHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtaW5EYXRlKSB7XG4gICAgbGV0IG1pbkRhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtaW5EYXRlKSA+PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1pbihtaW5EYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1pbihpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RpdmVNYXhEYXRlKHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0pIHtcbiAgaWYgKGluY2x1ZGVEYXRlcyAmJiBtYXhEYXRlKSB7XG4gICAgbGV0IG1heERhdGVzID0gaW5jbHVkZURhdGVzLmZpbHRlcihcbiAgICAgIChpbmNsdWRlRGF0ZSkgPT4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGluY2x1ZGVEYXRlLCBtYXhEYXRlKSA8PSAwLFxuICAgICk7XG4gICAgcmV0dXJuIG1heChtYXhEYXRlcyk7XG4gIH0gZWxzZSBpZiAoaW5jbHVkZURhdGVzKSB7XG4gICAgcmV0dXJuIG1heChpbmNsdWRlRGF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaWdodExpZ2h0RGF5c01hcChcbiAgaGlnaGxpZ2h0RGF0ZXMgPSBbXSxcbiAgZGVmYXVsdENsYXNzTmFtZSA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiLFxuKSB7XG4gIGNvbnN0IGRhdGVDbGFzc2VzID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGlnaGxpZ2h0RGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBvYmogPSBoaWdobGlnaHREYXRlc1tpXTtcbiAgICBpZiAoaXNEYXRlKG9iaikpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUob2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoZGVmYXVsdENsYXNzTmFtZSkpIHtcbiAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGRlZmF1bHRDbGFzc05hbWUpO1xuICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0ga2V5c1swXTtcbiAgICAgIGNvbnN0IGFyck9mRGF0ZXMgPSBvYmpba2V5c1swXV07XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhcnJPZkRhdGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuID0gYXJyT2ZEYXRlcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoYXJyT2ZEYXRlc1trXSwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXNBcnIgPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgICBpZiAoIWNsYXNzTmFtZXNBcnIuaW5jbHVkZXMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lc0Fyci5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBkYXRlQ2xhc3Nlcy5zZXQoa2V5LCBjbGFzc05hbWVzQXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG4vKipcbiAqIENvbXBhcmUgdGhlIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSwgaWYgdGhlIHBhc3NlZCBhcnJheSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlzQXJlRXF1YWwoYXJyYXkxLCBhcnJheTIpIHtcbiAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyYXkxLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBhcnJheTJbaW5kZXhdKTtcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIGN1c3RvbSBjbGFzcyB0byBlYWNoIGRhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGlkYXlEYXRlcyBhcnJheSBvZiBvYmplY3QgY29udGFpbmluZyBkYXRlIGFuZCBuYW1lIG9mIHRoZSBob2xpZGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NuYW1lIHRvIGJlIGFkZGVkLlxuICogQHJldHVybnMge01hcH0gTWFwIGNvbnRhaW5pbmcgZGF0ZSBhcyBrZXkgYW5kIGFycmF5IG9mIGNsYXNzbmFtZSBhbmQgaG9saWRheSBuYW1lIGFzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb2xpZGF5c01hcChcbiAgaG9saWRheURhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taG9saWRheXNcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgaG9saWRheURhdGVzLmZvckVhY2goKGhvbGlkYXkpID0+IHtcbiAgICBjb25zdCB7IGRhdGU6IGRhdGVPYmosIGhvbGlkYXlOYW1lIH0gPSBob2xpZGF5O1xuICAgIGlmICghaXNEYXRlKGRhdGVPYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gZm9ybWF0RGF0ZShkYXRlT2JqLCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgY2xhc3NOYW1lc09iaiA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IHt9O1xuICAgIGlmIChcbiAgICAgIFwiY2xhc3NOYW1lXCIgaW4gY2xhc3NOYW1lc09iaiAmJlxuICAgICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9PT0gZGVmYXVsdENsYXNzTmFtZSAmJlxuICAgICAgYXJyYXlzQXJlRXF1YWwoY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSwgW2hvbGlkYXlOYW1lXSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGFzc05hbWVzT2JqW1wiY2xhc3NOYW1lXCJdID0gZGVmYXVsdENsYXNzTmFtZTtcbiAgICBjb25zdCBob2xpZGF5TmFtZUFyciA9IGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl07XG4gICAgY2xhc3NOYW1lc09ialtcImhvbGlkYXlOYW1lc1wiXSA9IGhvbGlkYXlOYW1lQXJyXG4gICAgICA/IFsuLi5ob2xpZGF5TmFtZUFyciwgaG9saWRheU5hbWVdXG4gICAgICA6IFtob2xpZGF5TmFtZV07XG4gICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc09iaik7XG4gIH0pO1xuICByZXR1cm4gZGF0ZUNsYXNzZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gIHN0YXJ0T2ZEYXksXG4gIGN1cnJlbnRUaW1lLFxuICBjdXJyZW50TXVsdGlwbGllcixcbiAgaW50ZXJ2YWxzLFxuICBpbmplY3RlZFRpbWVzLFxuKSB7XG4gIGNvbnN0IGwgPSBpbmplY3RlZFRpbWVzLmxlbmd0aDtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBpbmplY3RlZFRpbWUgPSBhZGRNaW51dGVzKFxuICAgICAgYWRkSG91cnMoc3RhcnRPZkRheSwgZ2V0SG91cnMoaW5qZWN0ZWRUaW1lc1tpXSkpLFxuICAgICAgZ2V0TWludXRlcyhpbmplY3RlZFRpbWVzW2ldKSxcbiAgICApO1xuICAgIGNvbnN0IG5leHRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIHN0YXJ0T2ZEYXksXG4gICAgICAoY3VycmVudE11bHRpcGxpZXIgKyAxKSAqIGludGVydmFscyxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgaXNBZnRlcihpbmplY3RlZFRpbWUsIGN1cnJlbnRUaW1lKSAmJlxuICAgICAgaXNCZWZvcmUoaW5qZWN0ZWRUaW1lLCBuZXh0VGltZSlcbiAgICApIHtcbiAgICAgIHRpbWVzLnB1c2goaW5qZWN0ZWRUaW1lc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRpbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWmVybyhpKSB7XG4gIHJldHVybiBpIDwgMTAgPyBgMCR7aX1gIDogYCR7aX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WWVhcnNQZXJpb2QoXG4gIGRhdGUsXG4gIHllYXJJdGVtTnVtYmVyID0gREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuKSB7XG4gIGNvbnN0IGVuZFBlcmlvZCA9IE1hdGguY2VpbChnZXRZZWFyKGRhdGUpIC8geWVhckl0ZW1OdW1iZXIpICogeWVhckl0ZW1OdW1iZXI7XG4gIGNvbnN0IHN0YXJ0UGVyaW9kID0gZW5kUGVyaW9kIC0gKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gIHJldHVybiB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzSW5EYXkoZCkge1xuICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKTtcbiAgY29uc3Qgc3RhcnRPZlRoZU5leHREYXkgPSBuZXcgRGF0ZShcbiAgICBkLmdldEZ1bGxZZWFyKCksXG4gICAgZC5nZXRNb250aCgpLFxuICAgIGQuZ2V0RGF0ZSgpLFxuICAgIDI0LFxuICApO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKCgrc3RhcnRPZlRoZU5leHREYXkgLSArc3RhcnRPZkRheSkgLyAzXzYwMF8wMDApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIHRoZSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlXG4gKlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL3N0YXJ0T2ZNaW51dGVgXG4gKiBkbyBub3QgbWFrZSBjaGFuZ2VzIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1xuICpcbiAqIFNlZSBjb21tZW50cyBvbiBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL3B1bGwvNDI0NFxuICogZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gc3RhcnQgb2YgdGhlIG1pbnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZk1pbnV0ZShkKSB7XG4gIGNvbnN0IHNlY29uZHMgPSBkLmdldFNlY29uZHMoKTtcbiAgY29uc3QgbWlsbGlzZWNvbmRzID0gZC5nZXRNaWxsaXNlY29uZHMoKTtcblxuICByZXR1cm4gdG9EYXRlKGQuZ2V0VGltZSgpIC0gc2Vjb25kcyAqIDEwMDAgLSBtaWxsaXNlY29uZHMpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIG1pbnV0ZVxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9pc1NhbWVNaW51dGVgXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkMVxuICogQHBhcmFtIHtEYXRlfSBkMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNaW51dGUoZDEsIGQyKSB7XG4gIHJldHVybiBzdGFydE9mTWludXRlKGQxKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZNaW51dGUoZDIpLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmVkIGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lICgwMDowMDowMClcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgZm9yIHdoaWNoIG1pZG5pZ2h0IHRpbWUgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtEYXRlfSBBIG5ldyBkYXRldGltZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlkbmlnaHREYXRlKGRhdGUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGVcIik7XG4gIH1cblxuICBjb25zdCBkYXRlV2l0aG91dFRpbWUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgZGF0ZVdpdGhvdXRUaW1lLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZVdpdGhvdXRUaW1lO1xufVxuXG4vKipcbiAqIElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSBUaGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUaGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKlxuICogTm90ZTpcbiAqICBUaGlzIGZ1bmN0aW9uIGNvbnNpZGVycyB0aGUgbWlkLW5pZ2h0IG9mIHRoZSBnaXZlbiBkYXRlcyBmb3IgY29tcGFyaXNvbi5cbiAqICBJdCBldmFsdWF0ZXMgd2hldGhlciBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlIGJhc2VkIG9uIHRoZWlyIG1pZC1uaWdodCB0aW1lc3RhbXBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlQmVmb3JlKGRhdGUsIGRhdGVUb0NvbXBhcmUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkgfHwgIWlzRGF0ZShkYXRlVG9Db21wYXJlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSByZWNlaXZlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlKTtcbiAgY29uc3QgbWlkbmlnaHREYXRlVG9Db21wYXJlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGVUb0NvbXBhcmUpO1xuXG4gIHJldHVybiBpc0JlZm9yZShtaWRuaWdodERhdGUsIG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NwYWNlS2V5RG93bihldmVudCkge1xuICBjb25zdCBTUEFDRV9LRVkgPSBcIiBcIjtcbiAgcmV0dXJuIGV2ZW50LmtleSA9PT0gU1BBQ0VfS0VZO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlWWVhcnMoeWVhciwgbm9PZlllYXIsIG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDIgKiBub09mWWVhciArIDE7IGkrKykge1xuICAgIGNvbnN0IG5ld1llYXIgPSB5ZWFyICsgbm9PZlllYXIgLSBpO1xuICAgIGxldCBpc0luUmFuZ2UgPSB0cnVlO1xuXG4gICAgaWYgKG1pbkRhdGUpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWluRGF0ZSkgPD0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAobWF4RGF0ZSAmJiBpc0luUmFuZ2UpIHtcbiAgICAgIGlzSW5SYW5nZSA9IGdldFllYXIobWF4RGF0ZSkgPj0gbmV3WWVhcjtcbiAgICB9XG5cbiAgICBpZiAoaXNJblJhbmdlKSB7XG4gICAgICBsaXN0LnB1c2gobmV3WWVhcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgeWVhckRyb3Bkb3duSXRlbU51bWJlciwgc2Nyb2xsYWJsZVllYXJEcm9wZG93biB9ID0gcHJvcHM7XG4gICAgY29uc3Qgbm9PZlllYXIgPVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlciB8fCAoc2Nyb2xsYWJsZVllYXJEcm9wZG93biA/IDEwIDogNSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgeWVhcnNMaXN0OiBnZW5lcmF0ZVllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLnllYXIsXG4gICAgICAgIG5vT2ZZZWFyLFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgICB0aGlzLmRyb3Bkb3duUmVmID0gY3JlYXRlUmVmKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBkcm9wZG93bkN1cnJlbnQgPSB0aGlzLmRyb3Bkb3duUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAoZHJvcGRvd25DdXJyZW50KSB7XG4gICAgICAvLyBHZXQgYXJyYXkgZnJvbSBIVE1MQ29sbGVjdGlvblxuICAgICAgY29uc3QgZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4gPSBkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW5cbiAgICAgICAgPyBBcnJheS5mcm9tKGRyb3Bkb3duQ3VycmVudC5jaGlsZHJlbilcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRZZWFyT3B0aW9uRWwgPSBkcm9wZG93bkN1cnJlbnRDaGlsZHJlblxuICAgICAgICA/IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuLmZpbmQoKGNoaWxkRWwpID0+IGNoaWxkRWwuYXJpYVNlbGVjdGVkKVxuICAgICAgICA6IG51bGw7XG5cbiAgICAgIGRyb3Bkb3duQ3VycmVudC5zY3JvbGxUb3AgPSBzZWxlY3RlZFllYXJPcHRpb25FbFxuICAgICAgICA/IHNlbGVjdGVkWWVhck9wdGlvbkVsLm9mZnNldFRvcCArXG4gICAgICAgICAgKHNlbGVjdGVkWWVhck9wdGlvbkVsLmNsaWVudEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMlxuICAgICAgICA6IChkcm9wZG93bkN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gZHJvcGRvd25DdXJyZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gdGhpcy5wcm9wcy55ZWFyO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnN0YXRlLnllYXJzTGlzdC5tYXAoKHllYXIpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICBzZWxlY3RlZFllYXIgPT09IHllYXJcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbiByZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfeWVhclwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICB9XG4gICAgICAgIGtleT17eWVhcn1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIHllYXIpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWxlY3RlZFllYXIgPT09IHllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgID5cbiAgICAgICAge3NlbGVjdGVkWWVhciA9PT0geWVhciA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj7inJM8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgXCJcIlxuICAgICAgICApfVxuICAgICAgICB7eWVhcn1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuXG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IG51bGw7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IG51bGw7XG5cbiAgICBpZiAoIW1heFllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1heFllYXIpKSB7XG4gICAgICBvcHRpb25zLnVuc2hpZnQoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInVwY29taW5nXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5pbmNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtdXBjb21pbmdcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghbWluWWVhciB8fCAhdGhpcy5zdGF0ZS55ZWFyc0xpc3QuZmluZCgoeWVhcikgPT4geWVhciA9PT0gbWluWWVhcikpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgICBrZXk9e1wicHJldmlvdXNcIn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmRlY3JlbWVudFllYXJzfVxuICAgICAgICA+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbiByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycyByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycy1wcmV2aW91c1wiIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICBzaGlmdFllYXJzID0gKGFtb3VudCkgPT4ge1xuICAgIGNvbnN0IHllYXJzID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKGZ1bmN0aW9uICh5ZWFyKSB7XG4gICAgICByZXR1cm4geWVhciArIGFtb3VudDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgeWVhcnNMaXN0OiB5ZWFycyxcbiAgICB9KTtcbiAgfTtcblxuICBpbmNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKDEpO1xuICB9O1xuXG4gIGRlY3JlbWVudFllYXJzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnNoaWZ0WWVhcnMoLTEpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsYXNzTmFtZXMoe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfSByZWY9e3RoaXMuZHJvcGRvd25SZWZ9PlxuICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgWWVhckRyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoWWVhckRyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBtaW5ZZWFyID0gdGhpcy5wcm9wcy5taW5EYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1pbkRhdGUpIDogMTkwMDtcbiAgICBjb25zdCBtYXhZZWFyID0gdGhpcy5wcm9wcy5tYXhEYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1heERhdGUpIDogMjEwMDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gbWluWWVhcjsgaSA8PSBtYXhZZWFyOyBpKyspIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAgICB7aX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25TZWxlY3RDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAoKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e3RoaXMucHJvcHMueWVhcn1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlld1wiXG4gICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3LS1zZWxlY3RlZC15ZWFyXCI+XG4gICAgICAgIHt0aGlzLnByb3BzLnllYXJ9XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAoKSA9PiAoXG4gICAgPFdyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICB5ZWFyPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoeWVhcikgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcbiAgICBpZiAoeWVhciA9PT0gdGhpcy5wcm9wcy55ZWFyKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh5ZWFyKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMucHJvcHMuZGF0ZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIHRoaXMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIHRoaXMuc2V0T3BlbigpO1xuICB9O1xuXG4gIG9uU2VsZWN0ID0gKGRhdGUsIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF0ZSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRPcGVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbW9udGhOYW1lczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIGlzU2VsZWN0ZWRNb250aCA9IChpKSA9PiB0aGlzLnByb3BzLm1vbnRoID09PSBpO1xuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubW9udGhOYW1lcy5tYXAoKG1vbnRoLCBpKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoaSlcbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZF9tb250aFwiXG4gICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e21vbnRofVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgaSl9XG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGkpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge21vbnRofVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGgpO1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHRoaXMucHJvcHMub25DYW5jZWwoKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd25cIj5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aERyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9IChtb250aE5hbWVzKSA9PlxuICAgIG1vbnRoTmFtZXMubWFwKChNLCBpKSA9PiAoXG4gICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2l9PlxuICAgICAgICB7TX1cbiAgICAgIDwvb3B0aW9uPlxuICAgICkpO1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucyhtb250aE5hbWVzKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlLCBtb250aE5hbWVzKSA9PiAoXG4gICAgPGRpdlxuICAgICAga2V5PVwicmVhZFwiXG4gICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aFwiPlxuICAgICAgICB7bW9udGhOYW1lc1t0aGlzLnByb3BzLm1vbnRoXX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJEcm9wZG93biA9IChtb250aE5hbWVzKSA9PiAoXG4gICAgPFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICBtb250aE5hbWVzPXttb250aE5hbWVzfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAobW9udGhOYW1lcykgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlLCBtb250aE5hbWVzKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bihtb250aE5hbWVzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGgpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKG1vbnRoICE9PSB0aGlzLnByb3BzLm1vbnRoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXS5tYXAoXG4gICAgICB0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3duXG4gICAgICAgID8gKE0pID0+IHV0aWxzLmdldE1vbnRoU2hvcnRJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSlcbiAgICAgICAgOiAoTSkgPT4gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShNLCB0aGlzLnByb3BzLmxvY2FsZSksXG4gICAgKTtcblxuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZShtb250aE5hbWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IHtcbiAgYWRkTW9udGhzLFxuICBmb3JtYXREYXRlLFxuICBnZXRTdGFydE9mTW9udGgsXG4gIG5ld0RhdGUsXG4gIGlzQWZ0ZXIsXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBnZXRUaW1lLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTW9udGhZZWFycyhtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcblxuICBsZXQgY3VyckRhdGUgPSBnZXRTdGFydE9mTW9udGgobWluRGF0ZSk7XG4gIGNvbnN0IGxhc3REYXRlID0gZ2V0U3RhcnRPZk1vbnRoKG1heERhdGUpO1xuXG4gIHdoaWxlICghaXNBZnRlcihjdXJyRGF0ZSwgbGFzdERhdGUpKSB7XG4gICAgbGlzdC5wdXNoKG5ld0RhdGUoY3VyckRhdGUpKTtcblxuICAgIGN1cnJEYXRlID0gYWRkTW9udGhzKGN1cnJEYXRlLCAxKTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbW9udGhZZWFyc0xpc3Q6IGdlbmVyYXRlTW9udGhZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm1vbnRoWWVhcnNMaXN0Lm1hcCgobW9udGhZZWFyKSA9PiB7XG4gICAgICBjb25zdCBtb250aFllYXJQb2ludCA9IGdldFRpbWUobW9udGhZZWFyKTtcbiAgICAgIGNvbnN0IGlzU2FtZU1vbnRoWWVhciA9XG4gICAgICAgIGlzU2FtZVllYXIodGhpcy5wcm9wcy5kYXRlLCBtb250aFllYXIpICYmXG4gICAgICAgIGlzU2FtZU1vbnRoKHRoaXMucHJvcHMuZGF0ZSwgbW9udGhZZWFyKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICBpc1NhbWVNb250aFllYXJcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItb3B0aW9uLS1zZWxlY3RlZF9tb250aC15ZWFyXCJcbiAgICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItb3B0aW9uXCJcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5PXttb250aFllYXJQb2ludH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgbW9udGhZZWFyUG9pbnQpfVxuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzU2FtZU1vbnRoWWVhciA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAge2lzU2FtZU1vbnRoWWVhciA/IChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItb3B0aW9uLS1zZWxlY3RlZFwiPlxuICAgICAgICAgICAgICDinJNcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Zvcm1hdERhdGUobW9udGhZZWFyLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoWWVhcikgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aFllYXIpO1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBkcm9wZG93bkNsYXNzID0gY2xhc3NOYW1lcyh7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd25cIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93bi0tc2Nyb2xsYWJsZVwiOlxuICAgICAgICB0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30+e3RoaXMucmVuZGVyT3B0aW9ucygpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCB7XG4gIGFkZE1vbnRocyxcbiAgZm9ybWF0RGF0ZSxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBpc0FmdGVyLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lWWVhcixcbiAgbmV3RGF0ZSxcbiAgZ2V0VGltZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG52YXIgV3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoWWVhckRyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBsZXQgY3VyckRhdGUgPSBnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5taW5EYXRlKTtcbiAgICBjb25zdCBsYXN0RGF0ZSA9IGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLm1heERhdGUpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgIHdoaWxlICghaXNBZnRlcihjdXJyRGF0ZSwgbGFzdERhdGUpKSB7XG4gICAgICBjb25zdCB0aW1lUG9pbnQgPSBnZXRUaW1lKGN1cnJEYXRlKTtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e3RpbWVQb2ludH0gdmFsdWU9e3RpbWVQb2ludH0+XG4gICAgICAgICAge2Zvcm1hdERhdGUoY3VyckRhdGUsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L29wdGlvbj4sXG4gICAgICApO1xuXG4gICAgICBjdXJyRGF0ZSA9IGFkZE1vbnRocyhjdXJyRGF0ZSwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25TZWxlY3RDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAoKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e2dldFRpbWUoZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMuZGF0ZSkpfVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1zZWxlY3RcIlxuICAgICAgb25DaGFuZ2U9e3RoaXMub25TZWxlY3RDaGFuZ2V9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucygpfVxuICAgIDwvc2VsZWN0PlxuICApO1xuXG4gIHJlbmRlclJlYWRWaWV3ID0gKHZpc2libGUpID0+IHtcbiAgICBjb25zdCB5ZWFyTW9udGggPSBmb3JtYXREYXRlKFxuICAgICAgdGhpcy5wcm9wcy5kYXRlLFxuICAgICAgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT1cInJlYWRcIlxuICAgICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3XCJcbiAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGgteWVhclwiPlxuICAgICAgICAgIHt5ZWFyTW9udGh9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAoKSA9PiAoXG4gICAgPFdyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIGRhdGU9e3RoaXMucHJvcHMuZGF0ZX1cbiAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoWWVhclBvaW50KSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuXG4gICAgY29uc3QgY2hhbmdlZERhdGUgPSBuZXdEYXRlKHBhcnNlSW50KG1vbnRoWWVhclBvaW50KSk7XG5cbiAgICBpZiAoXG4gICAgICBpc1NhbWVZZWFyKHRoaXMucHJvcHMuZGF0ZSwgY2hhbmdlZERhdGUpICYmXG4gICAgICBpc1NhbWVNb250aCh0aGlzLnByb3BzLmRhdGUsIGNoYW5nZWREYXRlKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hhbmdlZERhdGUpO1xuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IHtcbiAgZ2V0RGF5LFxuICBnZXRNb250aCxcbiAgZ2V0RGF0ZSxcbiAgbmV3RGF0ZSxcbiAgaXNTYW1lRGF5LFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUV4Y2x1ZGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGlzRXF1YWwsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBnZXREYXlPZldlZWtDb2RlLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZm9ybWF0RGF0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbk1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KHByZXZQcm9wcyk7XG4gIH1cblxuICBkYXlFbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VFbnRlcihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9IChvdGhlcikgPT4gaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF5LCBvdGhlcik7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTZWxlY3RlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+IHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpKVxuICAgICAgOiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcblxuICAgIHJldHVybiAhaXNTZWxlY3RlZERhdGUgJiYgdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICB9O1xuXG4gIGlzRGlzYWJsZWQgPSAoKSA9PiBpc0RheURpc2FibGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKCkgPT4gaXNEYXlFeGNsdWRlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNTdGFydE9mV2VlayA9ICgpID0+XG4gICAgaXNTYW1lRGF5KFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lV2VlayA9IChvdGhlcikgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgaXNTYW1lRGF5KFxuICAgICAgb3RoZXIsXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lRGF5T3JXZWVrID0gKG90aGVyKSA9PiB0aGlzLmlzU2FtZURheShvdGhlcikgfHwgdGhpcy5pc1NhbWVXZWVrKG90aGVyKTtcblxuICBnZXRIaWdoTGlnaHRlZENsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBoaWdobGlnaHREYXRlcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7J2RheSBzdHJpbmcsICdjbGFzc05hbWUnfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgcmV0dXJuIGhpZ2hsaWdodERhdGVzLmdldChkYXlTdHIpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJldHVybiB0aGUgYXJyYXkgY29udGFpbmluZyBjbGFzc25hbWUgYXNzb2NpYXRlZCB0byB0aGUgZGF0ZVxuICBnZXRIb2xpZGF5c0NsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhvbGlkYXlzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2Yge2RheSBzdHJpbmc6IHtjbGFzc05hbWUsIGhvbGlkYXlOYW1lfX1cbiAgICBpZiAoaG9saWRheXMuaGFzKGRheVN0cikpIHtcbiAgICAgIHJldHVybiBbaG9saWRheXMuZ2V0KGRheVN0cikuY2xhc3NOYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblJhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhc2VsZWN0aW5nRGF0ZSB8fFxuICAgICAgKCFzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSAmJiB0aGlzLmlzRGlzYWJsZWQoKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzU3RhcnQgJiZcbiAgICAgIGVuZERhdGUgJiZcbiAgICAgIChpc0JlZm9yZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNFbmQgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzUmFuZ2UgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgIWVuZERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShzdGFydERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoZW5kRGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1dlZWtlbmQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla2RheSA9IGdldERheSh0aGlzLnByb3BzLmRheSk7XG4gICAgcmV0dXJuIHdlZWtkYXkgPT09IDAgfHwgd2Vla2RheSA9PT0gNjtcbiAgfTtcblxuICBpc0FmdGVyTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKHRoaXMucHJvcHMubW9udGggKyAxKSAlIDEyID09PSBnZXRNb250aCh0aGlzLnByb3BzLmRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQmVmb3JlTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KSArIDEpICUgMTIgPT09IHRoaXMucHJvcHMubW9udGhcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudERheSA9ICgpID0+IHRoaXMuaXNTYW1lRGF5KG5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+XG4gICAgICAgIHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lXG4gICAgICA/IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lKGRhdGUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xhc3NuYW1lcyhcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIsXG4gICAgICBkYXlDbGFzc05hbWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tXCIgKyBnZXREYXlPZldlZWtDb2RlKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWRpc2FibGVkXCI6IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZXhjbHVkZWRcIjogdGhpcy5pc0V4Y2x1ZGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXNlbGVjdGluZy1yYW5nZVwiOiB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50RGF5KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS13ZWVrZW5kXCI6IHRoaXMuaXNXZWVrZW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1vdXRzaWRlLW1vbnRoXCI6XG4gICAgICAgICAgdGhpcy5pc0FmdGVyTW9udGgoKSB8fCB0aGlzLmlzQmVmb3JlTW9udGgoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmdldEhpZ2hMaWdodGVkQ2xhc3MoXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhpZ2hsaWdodGVkXCIpLFxuICAgICAgdGhpcy5nZXRIb2xpZGF5c0NsYXNzKCksXG4gICAgKTtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQgPSBcIkNob29zZVwiLFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKCkgfHwgdGhpcy5pc0V4Y2x1ZGVkKClcbiAgICAgICAgPyBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWRcbiAgICAgICAgOiBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7Zm9ybWF0RGF0ZShkYXksIFwiUFBQUFwiLCB0aGlzLnByb3BzLmxvY2FsZSl9YDtcbiAgfTtcblxuICAvLyBBIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgaG9saWRheSdzIG5hbWUgYXMgdGl0bGUncyBjb250ZW50XG4gIGdldFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyA9IG5ldyBNYXAoKSwgZXhjbHVkZURhdGVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbXBhcmVEdCA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgdGl0bGVzID0gW107XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhjb21wYXJlRHQpKSB7XG4gICAgICB0aXRsZXMucHVzaCguLi5ob2xpZGF5cy5nZXQoY29tcGFyZUR0KS5ob2xpZGF5TmFtZXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0V4Y2x1ZGVkKCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKFxuICAgICAgICBleGNsdWRlRGF0ZXNcbiAgICAgICAgICA/LmZpbHRlcigoZXhjbHVkZURhdGUpID0+XG4gICAgICAgICAgICBpc1NhbWVEYXkoZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSwgZGF5KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLm1hcCgoZXhjbHVkZURhdGUpID0+IGV4Y2x1ZGVEYXRlLm1lc3NhZ2UpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlcy5qb2luKFwiLCBcIik7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAoc2VsZWN0ZWQsIHByZVNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gc2VsZWN0ZWQgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZDtcbiAgICBjb25zdCBwcmVTZWxlY3Rpb25EYXkgPSBwcmVTZWxlY3Rpb24gfHwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIShcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgICAgICAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlciB8fCAhdGhpcy5pc1N0YXJ0T2ZXZWVrKCkpXG4gICAgICApICYmXG4gICAgICAodGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSB8fFxuICAgICAgICAodGhpcy5pc1NhbWVEYXkoc2VsZWN0ZWREYXkpICYmXG4gICAgICAgICAgaXNTYW1lRGF5KHByZVNlbGVjdGlvbkRheSwgc2VsZWN0ZWREYXkpKSlcbiAgICAgICAgPyAwXG4gICAgICAgIDogLTE7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIGRheVxuICAvLyBmb2N1cyB0aGUgZGF5IG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNEYXkgPSAocHJldlByb3BzID0ge30pID0+IHtcbiAgICBsZXQgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgdGhpcy5pc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGUgYWN0aXZlRWxlbWVudCBpcyBpbiB0aGUgY29udGFpbmVyLCBhbmQgaXQgaXMgYW5vdGhlciBpbnN0YW5jZSBvZiBEYXlcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIpXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy9kYXkgaXMgb25lIG9mIHRoZSBub24gcmVuZGVyZWQgZHVwbGljYXRlIGRheXNcbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c0RheSAmJiB0aGlzLmRheUVsLmN1cnJlbnQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW5kZXJEYXlDb250ZW50cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzXG4gICAgICA/IHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHMoZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSksIHRoaXMucHJvcHMuZGF5KVxuICAgICAgOiBnZXREYXRlKHRoaXMucHJvcHMuZGF5KTtcbiAgfTtcblxuICByZW5kZXIgPSAoKSA9PiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt0aGlzLmRheUVsfVxuICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXModGhpcy5wcm9wcy5kYXkpfVxuICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbCgpfVxuICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICB0aXRsZT17dGhpcy5nZXRUaXRsZSgpfVxuICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc0Rpc2FibGVkKCl9XG4gICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50RGF5KCkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZCgpIHx8IHRoaXMuaXNJblJhbmdlKCl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyRGF5Q29udGVudHMoKX1cbiAgICAgIHt0aGlzLmdldFRpdGxlKCkgIT09IFwiXCIgJiYgKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvdmVybGF5XCI+e3RoaXMuZ2V0VGl0bGUoKX08L3NwYW4+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vla051bWJlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhcmlhTGFiZWxQcmVmaXg6IFwid2VlayBcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB3ZWVrTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihFbGVtZW50KSB9KSxcbiAgICBdKSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNXZWVrTnVtYmVyKHByZXZQcm9wcyk7XG4gIH1cblxuICB3ZWVrTnVtYmVyRWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+XG4gICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAhaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgZ2V0VGFiSW5kZXggPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyICYmXG4gICAgKHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCkgfHxcbiAgICAgIChpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHRoaXMucHJvcHMuc2VsZWN0ZWQpKSlcbiAgICAgID8gMFxuICAgICAgOiAtMTtcblxuICAvLyB2YXJpb3VzIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBhcHBseSBmb2N1cyB0byB0aGUgcHJlc2VsZWN0ZWQgd2Vlay1udW1iZXJcbiAgLy8gZm9jdXMgdGhlIHdlZWstbnVtYmVyIG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNXZWVrTnVtYmVyID0gKHByZXZQcm9wcyA9IHt9KSA9PiB7XG4gICAgbGV0IHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgIC8vIG9ubHkgZG8gdGhpcyB3aGlsZSB0aGUgaW5wdXQgaXNuJ3QgZm9jdXNlZFxuICAgIC8vIG90aGVyd2lzZSwgdHlwaW5nL2JhY2tzcGFjaW5nIHRoZSBkYXRlIG1hbnVhbGx5IG1heSBzdGVhbCBmb2N1cyBhd2F5IGZyb20gdGhlIGlucHV0XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRUYWJJbmRleCgpID09PSAwICYmXG4gICAgICAhcHJldlByb3BzLmlzSW5wdXRGb2N1c2VkICYmXG4gICAgICBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbilcbiAgICApIHtcbiAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyBhY3RpdmVFbGVtZW50IGFuZCBub3QgaW5saW5lXG4gICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzV2Vla051bWJlciA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlIGFjdGl2ZUVsZW1lbnQgaXMgaW4gdGhlIGNvbnRhaW5lciwgYW5kIGl0IGlzIGFub3RoZXIgaW5zdGFuY2Ugb2YgV2Vla051bWJlclxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZiAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50ICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCIsXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZEZvY3VzV2Vla051bWJlciAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudCAmJlxuICAgICAgdGhpcy53ZWVrTnVtYmVyRWwuY3VycmVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2Vla051bWJlciwgYXJpYUxhYmVsUHJlZml4ID0gXCJ3ZWVrIFwiLCBvbkNsaWNrIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyLS1jbGlja2FibGVcIjogISFvbkNsaWNrLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tc2VsZWN0ZWRcIjpcbiAgICAgICAgISFvbkNsaWNrICYmIGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17dGhpcy53ZWVrTnVtYmVyRWx9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh3ZWVrTnVtYmVyQ2xhc3Nlcyl9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2FyaWFMYWJlbFByZWZpeH0gJHt0aGlzLnByb3BzLndlZWtOdW1iZXJ9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgoKX1cbiAgICAgID5cbiAgICAgICAge3dlZWtOdW1iZXJ9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgRGF5IGZyb20gXCIuL2RheVwiO1xuaW1wb3J0IFdlZWtOdW1iZXIgZnJvbSBcIi4vd2Vla19udW1iZXJcIjtcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmltcG9ydCB7IGFkZERheXMsIGdldFdlZWssIGdldFN0YXJ0T2ZXZWVrLCBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWsgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICB9O1xuICB9XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVdlZWtDbGljayA9IChkYXksIHdlZWtOdW1iZXIsIGV2ZW50KSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdChkYXksIHdlZWtOdW1iZXIsIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGZvcm1hdFdlZWtOdW1iZXIgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXIoZGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBnZXRXZWVrKGRhdGUpO1xuICB9O1xuXG4gIHJlbmRlckRheXMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSB0aGlzLnN0YXJ0T2ZXZWVrKCk7XG4gICAgY29uc3QgZGF5cyA9IFtdO1xuICAgIGNvbnN0IHdlZWtOdW1iZXIgPSB0aGlzLmZvcm1hdFdlZWtOdW1iZXIoc3RhcnRPZldlZWspO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICBjb25zdCBvbkNsaWNrQWN0aW9uID1cbiAgICAgICAgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgICAgID8gdGhpcy5oYW5kbGVXZWVrQ2xpY2suYmluZCh0aGlzLCBzdGFydE9mV2Vlaywgd2Vla051bWJlcilcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGRheXMucHVzaChcbiAgICAgICAgPFdlZWtOdW1iZXJcbiAgICAgICAgICBrZXk9XCJXXCJcbiAgICAgICAgICB3ZWVrTnVtYmVyPXt3ZWVrTnVtYmVyfVxuICAgICAgICAgIGRhdGU9e3N0YXJ0T2ZXZWVrfVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2tBY3Rpb259XG4gICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuYXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyfVxuICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgLz4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5cy5jb25jYXQoXG4gICAgICBbMCwgMSwgMiwgMywgNCwgNSwgNl0ubWFwKChvZmZzZXQpID0+IHtcbiAgICAgICAgY29uc3QgZGF5ID0gYWRkRGF5cyhzdGFydE9mV2Vlaywgb2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8RGF5XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBrZXk9e2RheS52YWx1ZU9mKCl9XG4gICAgICAgICAgICBkYXk9e2RheX1cbiAgICAgICAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVEYXlDbGljay5iaW5kKHRoaXMsIGRheSl9XG4gICAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIuYmluZCh0aGlzLCBkYXkpfVxuICAgICAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgICBob2xpZGF5cz17dGhpcy5wcm9wcy5ob2xpZGF5c31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcn1cbiAgICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgc3RhcnRPZldlZWsgPSAoKSA9PlxuICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+XG4gICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAhaXNTYW1lRGF5KHRoaXMuc3RhcnRPZldlZWsoKSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICBpc1NhbWVEYXkodGhpcy5zdGFydE9mV2VlaygpLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstLXNlbGVjdGVkXCI6IGlzU2FtZURheShcbiAgICAgICAgdGhpcy5zdGFydE9mV2VlaygpLFxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjogdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh3ZWVrTnVtYmVyQ2xhc3Nlcyl9Pnt0aGlzLnJlbmRlckRheXMoKX08L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IFdlZWsgZnJvbSBcIi4vd2Vla1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVCA9IDY7XG5cbmNvbnN0IE1PTlRIX0NPTFVNTlNfTEFZT1VUID0ge1xuICBUV09fQ09MVU1OUzogXCJ0d29fY29sdW1uc1wiLFxuICBUSFJFRV9DT0xVTU5TOiBcInRocmVlX2NvbHVtbnNcIixcbiAgRk9VUl9DT0xVTU5TOiBcImZvdXJfY29sdW1uc1wiLFxufTtcbmNvbnN0IE1PTlRIX0NPTFVNTlMgPSB7XG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5UV09fQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMV0sXG4gICAgICBbMiwgM10sXG4gICAgICBbNCwgNV0sXG4gICAgICBbNiwgN10sXG4gICAgICBbOCwgOV0sXG4gICAgICBbMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogMixcbiAgfSxcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULlRIUkVFX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDEsIDJdLFxuICAgICAgWzMsIDQsIDVdLFxuICAgICAgWzYsIDcsIDhdLFxuICAgICAgWzksIDEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDMsXG4gIH0sXG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5GT1VSX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDEsIDIsIDNdLFxuICAgICAgWzQsIDUsIDYsIDddLFxuICAgICAgWzgsIDksIDEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDQsXG4gIH0sXG59O1xuY29uc3QgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCA9IDE7XG5cbmZ1bmN0aW9uIGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4pIHtcbiAgaWYgKHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyKSByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuRk9VUl9DT0xVTU5TO1xuICBpZiAoc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcikgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULlRXT19DT0xVTU5TO1xuICByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuVEhSRUVfQ09MVU1OUztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvcmRlckluRGlzcGxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldFByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93V2Vla051bWJlcnM6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbk1vbnRoS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgTU9OVEhfUkVGUyA9IFsuLi5BcnJheSgxMildLm1hcCgoKSA9PiBSZWFjdC5jcmVhdGVSZWYoKSk7XG4gIFFVQVJURVJfUkVGUyA9IFsuLi5BcnJheSg0KV0ubWFwKCgpID0+IFJlYWN0LmNyZWF0ZVJlZigpKTtcblxuICBpc0Rpc2FibGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RGlzYWJsZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNFeGNsdWRlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheUV4Y2x1ZGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCwgdGhpcy5wcm9wcy5vcmRlckluRGlzcGxheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0TW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKHV0aWxzLnNldE1vbnRoKGRheSwgbSksIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0UXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lUXVhcnRlcih1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZE1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aCh1dGlscy5zZXRNb250aChkYXksIG0pLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlRW5kUXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lUXVhcnRlcih1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKCEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fCAhc2VsZWN0aW5nRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzUmFuZ2UgJiYgc3RhcnREYXRlICYmICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydCA9IChtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aCA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzdGFydERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQgPSAobSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBlbmREYXRlLCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgZW5kRGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8ICFzZWxlY3RpbmdEYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzUmFuZ2UgJiYgc3RhcnREYXRlICYmICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzV2Vla0luTW9udGggPSAoc3RhcnRPZldlZWspID0+IHtcbiAgICBjb25zdCBkYXkgPSB0aGlzLnByb3BzLmRheTtcbiAgICBjb25zdCBlbmRPZldlZWsgPSB1dGlscy5hZGREYXlzKHN0YXJ0T2ZXZWVrLCA2KTtcbiAgICByZXR1cm4gKFxuICAgICAgdXRpbHMuaXNTYW1lTW9udGgoc3RhcnRPZldlZWssIGRheSkgfHwgdXRpbHMuaXNTYW1lTW9udGgoZW5kT2ZXZWVrLCBkYXkpXG4gICAgKTtcbiAgfTtcblxuICBpc0N1cnJlbnRNb250aCA9IChkYXksIG0pID0+XG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHV0aWxzLm5ld0RhdGUoKSkgJiZcbiAgICBtID09PSB1dGlscy5nZXRNb250aCh1dGlscy5uZXdEYXRlKCkpO1xuXG4gIGlzQ3VycmVudFF1YXJ0ZXIgPSAoZGF5LCBxKSA9PlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcih1dGlscy5uZXdEYXRlKCkpICYmXG4gICAgcSA9PT0gdXRpbHMuZ2V0UXVhcnRlcih1dGlscy5uZXdEYXRlKCkpO1xuXG4gIGlzU2VsZWN0ZWRNb250aCA9IChkYXksIG0sIHNlbGVjdGVkKSA9PlxuICAgIHV0aWxzLmdldE1vbnRoKHNlbGVjdGVkKSA9PT0gbSAmJlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcihzZWxlY3RlZCk7XG5cbiAgaXNTZWxlY3RlZFF1YXJ0ZXIgPSAoZGF5LCBxLCBzZWxlY3RlZCkgPT5cbiAgICB1dGlscy5nZXRRdWFydGVyKGRheSkgPT09IHEgJiZcbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIoc2VsZWN0ZWQpO1xuXG4gIHJlbmRlcldlZWtzID0gKCkgPT4ge1xuICAgIGNvbnN0IHdlZWtzID0gW107XG4gICAgdmFyIGlzRml4ZWRIZWlnaHQgPSB0aGlzLnByb3BzLmZpeGVkSGVpZ2h0O1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBicmVha0FmdGVyTmV4dFB1c2ggPSBmYWxzZTtcbiAgICBsZXQgY3VycmVudFdlZWtTdGFydCA9IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgdXRpbHMuZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgID8gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZDtcblxuICAgIGNvbnN0IHByZVNlbGVjdGlvbiA9IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgID8gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICApXG4gICAgICA6IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHdlZWtzLnB1c2goXG4gICAgICAgIDxXZWVrXG4gICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgZGF5PXtjdXJyZW50V2Vla1N0YXJ0fVxuICAgICAgICAgIG1vbnRoPXt1dGlscy5nZXRNb250aCh0aGlzLnByb3BzLmRheSl9XG4gICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyfVxuICAgICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICBob2xpZGF5cz17dGhpcy5wcm9wcy5ob2xpZGF5c31cbiAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgIHByZVNlbGVjdGlvbj17cHJlU2VsZWN0aW9ufVxuICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZH1cbiAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnR9XG4gICAgICAgIC8+LFxuICAgICAgKTtcblxuICAgICAgaWYgKGJyZWFrQWZ0ZXJOZXh0UHVzaCkgYnJlYWs7XG5cbiAgICAgIGkrKztcbiAgICAgIGN1cnJlbnRXZWVrU3RhcnQgPSB1dGlscy5hZGRXZWVrcyhjdXJyZW50V2Vla1N0YXJ0LCAxKTtcblxuICAgICAgLy8gSWYgb25lIG9mIHRoZXNlIGNvbmRpdGlvbnMgaXMgdHJ1ZSwgd2Ugd2lsbCBlaXRoZXIgYnJlYWsgb24gdGhpcyB3ZWVrXG4gICAgICAvLyBvciBicmVhayBvbiB0aGUgbmV4dCB3ZWVrXG4gICAgICBjb25zdCBpc0ZpeGVkQW5kRmluYWxXZWVrID1cbiAgICAgICAgaXNGaXhlZEhlaWdodCAmJiBpID49IEZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UO1xuICAgICAgY29uc3QgaXNOb25GaXhlZEFuZE91dE9mTW9udGggPVxuICAgICAgICAhaXNGaXhlZEhlaWdodCAmJiAhdGhpcy5pc1dlZWtJbk1vbnRoKGN1cnJlbnRXZWVrU3RhcnQpO1xuXG4gICAgICBpZiAoaXNGaXhlZEFuZEZpbmFsV2VlayB8fCBpc05vbkZpeGVkQW5kT3V0T2ZNb250aCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRoKSB7XG4gICAgICAgICAgYnJlYWtBZnRlck5leHRQdXNoID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3ZWVrcztcbiAgfTtcblxuICBvbk1vbnRoQ2xpY2sgPSAoZSwgbSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKHRoaXMucHJvcHMuZGF5LCBtKTtcblxuICAgIGlmICh1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2sodXRpbHMuZ2V0U3RhcnRPZk1vbnRoKGxhYmVsRGF0ZSksIGUpO1xuICB9O1xuXG4gIG9uTW9udGhNb3VzZUVudGVyID0gKG0pID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aCh0aGlzLnByb3BzLmRheSwgbSk7XG5cbiAgICBpZiAodXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIodXRpbHMuZ2V0U3RhcnRPZk1vbnRoKGxhYmVsRGF0ZSkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTmF2aWdhdGlvbiA9IChuZXdNb250aCwgbmV3RGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG4gICAgdGhpcy5NT05USF9SRUZTW25ld01vbnRoXS5jdXJyZW50ICYmXG4gICAgICB0aGlzLk1PTlRIX1JFRlNbbmV3TW9udGhdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBvbk1vbnRoS2V5RG93biA9IChldmVudCwgbW9udGgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uLFxuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2V0UHJlU2VsZWN0aW9uLFxuICAgICAgaGFuZGxlT25Nb250aEtleURvd24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ICE9PSBcIlRhYlwiKSB7XG4gICAgICAvLyBwcmV2ZW50RGVmYXVsdCBvbiB0YWIgZXZlbnQgYmxvY2tzIGZvY3VzIGNoYW5nZVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKCFkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgbW9udGhDb2x1bW5zTGF5b3V0ID0gZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICk7XG4gICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldCA9XG4gICAgICAgIE1PTlRIX0NPTFVNTlNbbW9udGhDb2x1bW5zTGF5b3V0XS52ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ7XG4gICAgICBjb25zdCBtb250aHNHcmlkID0gTU9OVEhfQ09MVU1OU1ttb250aENvbHVtbnNMYXlvdXRdLmdyaWQ7XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25Nb250aENsaWNrKGV2ZW50LCBtb250aCk7XG4gICAgICAgICAgc2V0UHJlU2VsZWN0aW9uKHNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG1vbnRoID09PSAxMSA/IDAgOiBtb250aCArIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQsXG4gICAgICAgICAgICB1dGlscy5hZGRNb250aHMocHJlU2VsZWN0aW9uLCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICBtb250aCA9PT0gMCA/IDExIDogbW9udGggLSBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VULFxuICAgICAgICAgICAgdXRpbHMuc3ViTW9udGhzKHByZVNlbGVjdGlvbiwgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1vbnRoIG9uIHRoZSBmaXJzdCByb3dcbiAgICAgICAgICAgIG1vbnRoc0dyaWRbMF0uaW5jbHVkZXMobW9udGgpXG4gICAgICAgICAgICAgID8gbW9udGggKyAxMiAtIHZlcnRpY2FsT2Zmc2V0XG4gICAgICAgICAgICAgIDogbW9udGggLSB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHV0aWxzLnN1Yk1vbnRocyhwcmVTZWxlY3Rpb24sIHZlcnRpY2FsT2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBtb250aCBvbiB0aGUgbGFzdCByb3dcbiAgICAgICAgICAgIG1vbnRoc0dyaWRbbW9udGhzR3JpZC5sZW5ndGggLSAxXS5pbmNsdWRlcyhtb250aClcbiAgICAgICAgICAgICAgPyBtb250aCAtIDEyICsgdmVydGljYWxPZmZzZXRcbiAgICAgICAgICAgICAgOiBtb250aCArIHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgdXRpbHMuYWRkTW9udGhzKHByZVNlbGVjdGlvbiwgdmVydGljYWxPZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT25Nb250aEtleURvd24gJiYgaGFuZGxlT25Nb250aEtleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIG9uUXVhcnRlckNsaWNrID0gKGUsIHEpID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRRdWFydGVyKHRoaXMucHJvcHMuZGF5LCBxKTtcblxuICAgIGlmICh1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlDbGljayh1dGlscy5nZXRTdGFydE9mUXVhcnRlcihsYWJlbERhdGUpLCBlKTtcbiAgfTtcblxuICBvblF1YXJ0ZXJNb3VzZUVudGVyID0gKHEpID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRRdWFydGVyKHRoaXMucHJvcHMuZGF5LCBxKTtcblxuICAgIGlmICh1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyKHV0aWxzLmdldFN0YXJ0T2ZRdWFydGVyKGxhYmVsRGF0ZSkpO1xuICB9O1xuXG4gIGhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uID0gKG5ld1F1YXJ0ZXIsIG5ld0RhdGUpID0+IHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuICAgIHRoaXMuUVVBUlRFUl9SRUZTW25ld1F1YXJ0ZXIgLSAxXS5jdXJyZW50ICYmXG4gICAgICB0aGlzLlFVQVJURVJfUkVGU1tuZXdRdWFydGVyIC0gMV0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIG9uUXVhcnRlcktleURvd24gPSAoZXZlbnQsIHF1YXJ0ZXIpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vblF1YXJ0ZXJDbGljayhldmVudCwgcXVhcnRlcik7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVRdWFydGVyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHF1YXJ0ZXIgPT09IDQgPyAxIDogcXVhcnRlciArIDEsXG4gICAgICAgICAgICB1dGlscy5hZGRRdWFydGVycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlUXVhcnRlck5hdmlnYXRpb24oXG4gICAgICAgICAgICBxdWFydGVyID09PSAxID8gNCA6IHF1YXJ0ZXIgLSAxLFxuICAgICAgICAgICAgdXRpbHMuc3ViUXVhcnRlcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGdldE1vbnRoQ2xhc3NOYW1lcyA9IChtKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBtb250aENsYXNzTmFtZSxcbiAgICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICAgIGluY2x1ZGVEYXRlcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGhDbGFzc05hbWUgPSBtb250aENsYXNzTmFtZVxuICAgICAgPyBtb250aENsYXNzTmFtZSh1dGlscy5zZXRNb250aChkYXksIG0pKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICByZXR1cm4gY2xhc3NuYW1lcyhcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dFwiLFxuICAgICAgYHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLSR7bX1gLFxuICAgICAgX21vbnRoQ2xhc3NOYW1lLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSB8fCBleGNsdWRlRGF0ZXMgfHwgaW5jbHVkZURhdGVzKSAmJlxuICAgICAgICAgIHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZE1vbnRoKFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBtLFxuICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRNb250aChkYXksIG0sIHByZVNlbGVjdGlvbiksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1pbi1yYW5nZVwiOiB1dGlscy5pc01vbnRoSW5SYW5nZShcbiAgICAgICAgICBzdGFydERhdGUsXG4gICAgICAgICAgZW5kRGF0ZSxcbiAgICAgICAgICBtLFxuICAgICAgICAgIGRheSxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydE1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmRNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0KG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudE1vbnRoKGRheSwgbSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAobSkgPT4ge1xuICAgIGNvbnN0IHByZVNlbGVjdGVkTW9udGggPSB1dGlscy5nZXRNb250aCh0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiYgbSA9PT0gcHJlU2VsZWN0ZWRNb250aFxuICAgICAgICA/IFwiMFwiXG4gICAgICAgIDogXCItMVwiO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJUYWJJbmRleCA9IChxKSA9PiB7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWRRdWFydGVyID0gdXRpbHMuZ2V0UXVhcnRlcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiYgcSA9PT0gcHJlU2VsZWN0ZWRRdWFydGVyXG4gICAgICAgID8gXCIwXCJcbiAgICAgICAgOiBcIi0xXCI7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgZ2V0QXJpYUxhYmVsID0gKG1vbnRoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4ID0gXCJDaG9vc2VcIixcbiAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4ID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgICBkYXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aChkYXksIG1vbnRoKTtcbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKGxhYmVsRGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKGxhYmVsRGF0ZSlcbiAgICAgICAgPyBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeFxuICAgICAgICA6IGNob29zZURheUFyaWFMYWJlbFByZWZpeDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7dXRpbHMuZm9ybWF0RGF0ZShsYWJlbERhdGUsIFwiTU1NTSB5eXl5XCIpfWA7XG4gIH07XG5cbiAgZ2V0UXVhcnRlckNsYXNzTmFtZXMgPSAocSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsYXNzbmFtZXMoXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dFwiLFxuICAgICAgYHJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItJHtxfWAsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUpICYmXG4gICAgICAgICAgdXRpbHMuaXNRdWFydGVyRGlzYWJsZWQodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIHEsXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgICFkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoZGF5LCBxLCBwcmVTZWxlY3Rpb24pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyKHEpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0taW4tcmFuZ2VcIjogdXRpbHMuaXNRdWFydGVySW5SYW5nZShcbiAgICAgICAgICBzdGFydERhdGUsXG4gICAgICAgICAgZW5kRGF0ZSxcbiAgICAgICAgICBxLFxuICAgICAgICAgIGRheSxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1JhbmdlU3RhcnRRdWFydGVyKHEpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZFF1YXJ0ZXIocSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0TW9udGhDb250ZW50ID0gKG0pID0+IHtcbiAgICBjb25zdCB7IHNob3dGdWxsTW9udGhZZWFyUGlja2VyLCByZW5kZXJNb250aENvbnRlbnQsIGxvY2FsZSwgZGF5IH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG9ydE1vbnRoVGV4dCA9IHV0aWxzLmdldE1vbnRoU2hvcnRJbkxvY2FsZShtLCBsb2NhbGUpO1xuICAgIGNvbnN0IGZ1bGxNb250aFRleHQgPSB1dGlscy5nZXRNb250aEluTG9jYWxlKG0sIGxvY2FsZSk7XG4gICAgaWYgKHJlbmRlck1vbnRoQ29udGVudCkge1xuICAgICAgcmV0dXJuIHJlbmRlck1vbnRoQ29udGVudChtLCBzaG9ydE1vbnRoVGV4dCwgZnVsbE1vbnRoVGV4dCwgZGF5KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3dGdWxsTW9udGhZZWFyUGlja2VyID8gZnVsbE1vbnRoVGV4dCA6IHNob3J0TW9udGhUZXh0O1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJDb250ZW50ID0gKHEpID0+IHtcbiAgICBjb25zdCB7IHJlbmRlclF1YXJ0ZXJDb250ZW50LCBsb2NhbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvcnRRdWFydGVyID0gdXRpbHMuZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUocSwgbG9jYWxlKTtcbiAgICByZXR1cm4gcmVuZGVyUXVhcnRlckNvbnRlbnRcbiAgICAgID8gcmVuZGVyUXVhcnRlckNvbnRlbnQocSwgc2hvcnRRdWFydGVyKVxuICAgICAgOiBzaG9ydFF1YXJ0ZXI7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhzID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbW9udGhDb2x1bW5zID1cbiAgICAgIE1PTlRIX0NPTFVNTlNbXG4gICAgICAgIGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICApXG4gICAgICBdLmdyaWQ7XG4gICAgcmV0dXJuIG1vbnRoQ29sdW1ucy5tYXAoKG1vbnRoLCBpKSA9PiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXdyYXBwZXJcIiBrZXk9e2l9PlxuICAgICAgICB7bW9udGgubWFwKChtLCBqKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXt0aGlzLk1PTlRIX1JFRlNbbV19XG4gICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2xpY2soZXYsIG0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIGlmICh1dGlscy5pc1NwYWNlS2V5RG93bihldikpIHtcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2LmtleSA9IFwiRW50ZXJcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMub25Nb250aEtleURvd24oZXYsIG0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vbk1vbnRoTW91c2VFbnRlcihtKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uTW9udGhNb3VzZUVudGVyKG0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KG0pfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldE1vbnRoQ2xhc3NOYW1lcyhtKX1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5nZXRBcmlhTGFiZWwobSl9XG4gICAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBzZWxlY3RlZCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuZ2V0TW9udGhDb250ZW50KG0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIHJlbmRlclF1YXJ0ZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBxdWFydGVycyA9IFsxLCAyLCAzLCA0XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXdyYXBwZXJcIj5cbiAgICAgICAge3F1YXJ0ZXJzLm1hcCgocSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIHJlZj17dGhpcy5RVUFSVEVSX1JFRlNbal19XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uUXVhcnRlcktleURvd24oZXYsIHEpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vblF1YXJ0ZXJNb3VzZUVudGVyKHEpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0UXVhcnRlckNsYXNzTmFtZXMocSl9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgc2VsZWN0ZWQpfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0UXVhcnRlclRhYkluZGV4KHEpfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFF1YXJ0ZXIoZGF5LCBxKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldFF1YXJ0ZXJDb250ZW50KHEpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgZ2V0Q2xhc3NOYW1lcyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RpbmdEYXRlLFxuICAgICAgc2VsZWN0c1N0YXJ0LFxuICAgICAgc2VsZWN0c0VuZCxcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXIsXG4gICAgICBzaG93V2Vla1BpY2tlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBjbGFzc25hbWVzKFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFwiLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLS1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICBzZWxlY3RpbmdEYXRlICYmIChzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCksXG4gICAgICB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoUGlja2VyXCI6IHNob3dNb250aFllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyUGlja2VyXCI6IHNob3dRdWFydGVyWWVhclBpY2tlciB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtQaWNrZXJcIjogc2hvd1dlZWtQaWNrZXIgfSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4ID0gXCJNb250aCBcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGZvcm1hdHRlZEFyaWFMYWJlbFByZWZpeCA9IGFyaWFMYWJlbFByZWZpeFxuICAgICAgPyBhcmlhTGFiZWxQcmVmaXgudHJpbSgpICsgXCIgXCJcbiAgICAgIDogXCJcIjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUxlYXZlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUxlYXZlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgYXJpYS1sYWJlbD17YCR7Zm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4fSR7dXRpbHMuZm9ybWF0RGF0ZShkYXksIFwiTU1NTSwgeXl5eVwiKX1gfVxuICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICA+XG4gICAgICAgIHtzaG93TW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgPyB0aGlzLnJlbmRlck1vbnRocygpXG4gICAgICAgICAgOiBzaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgICAgID8gdGhpcy5yZW5kZXJRdWFydGVycygpXG4gICAgICAgICAgICA6IHRoaXMucmVuZGVyV2Vla3MoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7XG4gIGdldEhvdXJzLFxuICBnZXRNaW51dGVzLFxuICBuZXdEYXRlLFxuICBnZXRTdGFydE9mRGF5LFxuICBhZGRNaW51dGVzLFxuICBmb3JtYXREYXRlLFxuICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UsXG4gIGlzVGltZURpc2FibGVkLFxuICB0aW1lc1RvSW5qZWN0QWZ0ZXIsXG4gIGdldEhvdXJzSW5EYXksXG4gIGlzU2FtZU1pbnV0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVydmFsczogMzAsXG4gICAgICBvblRpbWVDaGFuZ2U6ICgpID0+IHt9LFxuICAgICAgdG9kYXlCdXR0b246IG51bGwsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBjYWxjQ2VudGVyUG9zaXRpb24gPSAobGlzdEhlaWdodCwgY2VudGVyTGlSZWYpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgY2VudGVyTGlSZWYub2Zmc2V0VG9wIC0gKGxpc3RIZWlnaHQgLyAyIC0gY2VudGVyTGlSZWYuY2xpZW50SGVpZ2h0IC8gMilcbiAgICApO1xuICB9O1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgICBtaW5UaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhUaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJUaW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtb250aFJlZjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0aW1lQ2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBoZWlnaHQ6IG51bGwsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gY29kZSB0byBlbnN1cmUgc2VsZWN0ZWQgdGltZSB3aWxsIGFsd2F5cyBiZSBpbiBmb2N1cyB3aXRoaW4gdGltZSB3aW5kb3cgd2hlbiBpdCBmaXJzdCBhcHBlYXJzXG4gICAgdGhpcy5zY3JvbGxUb1RoZVNlbGVjdGVkVGltZSgpO1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoUmVmICYmIHRoaXMuaGVhZGVyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLm1vbnRoUmVmLmNsaWVudEhlaWdodCAtIHRoaXMuaGVhZGVyLmNsaWVudEhlaWdodCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lID0gKCkgPT4ge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubGlzdCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLmxpc3Quc2Nyb2xsVG9wID1cbiAgICAgICAgdGhpcy5jZW50ZXJMaSAmJlxuICAgICAgICBUaW1lLmNhbGNDZW50ZXJQb3NpdGlvbihcbiAgICAgICAgICB0aGlzLnByb3BzLm1vbnRoUmVmXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMubW9udGhSZWYuY2xpZW50SGVpZ2h0IC0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMubGlzdC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgdGhpcy5jZW50ZXJMaSxcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbGljayA9ICh0aW1lKSA9PiB7XG4gICAgaWYgKFxuICAgICAgKCh0aGlzLnByb3BzLm1pblRpbWUgfHwgdGhpcy5wcm9wcy5tYXhUaW1lKSAmJlxuICAgICAgICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgdGhpcy5wcm9wcykpIHx8XG4gICAgICAoKHRoaXMucHJvcHMuZXhjbHVkZVRpbWVzIHx8XG4gICAgICAgIHRoaXMucHJvcHMuaW5jbHVkZVRpbWVzIHx8XG4gICAgICAgIHRoaXMucHJvcHMuZmlsdGVyVGltZSkgJiZcbiAgICAgICAgaXNUaW1lRGlzYWJsZWQodGltZSwgdGhpcy5wcm9wcykpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGltZSk7XG4gIH07XG5cbiAgaXNTZWxlY3RlZFRpbWUgPSAodGltZSkgPT5cbiAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmIGlzU2FtZU1pbnV0ZSh0aGlzLnByb3BzLnNlbGVjdGVkLCB0aW1lKTtcblxuICBpc0Rpc2FibGVkVGltZSA9ICh0aW1lKSA9PlxuICAgICgodGhpcy5wcm9wcy5taW5UaW1lIHx8IHRoaXMucHJvcHMubWF4VGltZSkgJiZcbiAgICAgIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB0aGlzLnByb3BzKSkgfHxcbiAgICAoKHRoaXMucHJvcHMuZXhjbHVkZVRpbWVzIHx8XG4gICAgICB0aGlzLnByb3BzLmluY2x1ZGVUaW1lcyB8fFxuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJUaW1lKSAmJlxuICAgICAgaXNUaW1lRGlzYWJsZWQodGltZSwgdGhpcy5wcm9wcykpO1xuXG4gIGxpQ2xhc3NlcyA9ICh0aW1lKSA9PiB7XG4gICAgbGV0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtXCIsXG4gICAgICB0aGlzLnByb3BzLnRpbWVDbGFzc05hbWUgPyB0aGlzLnByb3BzLnRpbWVDbGFzc05hbWUodGltZSkgOiB1bmRlZmluZWQsXG4gICAgXTtcblxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRUaW1lKHRpbWUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0tc2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1kaXNhYmxlZFwiKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgKGdldEhvdXJzKHRpbWUpICogNjAgKyBnZXRNaW51dGVzKHRpbWUpKSAlIHRoaXMucHJvcHMuaW50ZXJ2YWxzICE9PSAwXG4gICAgKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0taW5qZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50LCB0aW1lKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmcuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICB0aGlzLmhhbmRsZUNsaWNrKHRpbWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgcmVuZGVyVGltZXMgPSAoKSA9PiB7XG4gICAgbGV0IHRpbWVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQgPyB0aGlzLnByb3BzLmZvcm1hdCA6IFwicFwiO1xuICAgIGNvbnN0IGludGVydmFscyA9IHRoaXMucHJvcHMuaW50ZXJ2YWxzO1xuXG4gICAgY29uc3QgYWN0aXZlRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkIHx8IHRoaXMucHJvcHMub3BlblRvRGF0ZSB8fCBuZXdEYXRlKCk7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0U3RhcnRPZkRheShhY3RpdmVEYXRlKTtcbiAgICBjb25zdCBzb3J0ZWRJbmplY3RUaW1lcyA9XG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzICYmXG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtaW51dGVzSW5EYXkgPSA2MCAqIGdldEhvdXJzSW5EYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IG1pbnV0ZXNJbkRheSAvIGludGVydmFscztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlwbGllcjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGFkZE1pbnV0ZXMoYmFzZSwgaSAqIGludGVydmFscyk7XG4gICAgICB0aW1lcy5wdXNoKGN1cnJlbnRUaW1lKTtcblxuICAgICAgaWYgKHNvcnRlZEluamVjdFRpbWVzKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzVG9JbmplY3QgPSB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gICAgICAgICAgYmFzZSxcbiAgICAgICAgICBjdXJyZW50VGltZSxcbiAgICAgICAgICBpLFxuICAgICAgICAgIGludGVydmFscyxcbiAgICAgICAgICBzb3J0ZWRJbmplY3RUaW1lcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGltZXMgPSB0aW1lcy5jb25jYXQodGltZXNUb0luamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHRpbWUgdG8gZm9jdXMgYW5kIHNjcm9sbCBpbnRvIHZpZXcgd2hlbiBjb21wb25lbnQgbW91bnRzXG4gICAgY29uc3QgdGltZVRvRm9jdXMgPSB0aW1lcy5yZWR1Y2UoKHByZXYsIHRpbWUpID0+IHtcbiAgICAgIGlmICh0aW1lLmdldFRpbWUoKSA8PSBhY3RpdmVEYXRlLmdldFRpbWUoKSkge1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRpbWVzWzBdKTtcblxuICAgIHJldHVybiB0aW1lcy5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGltZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmxpQ2xhc3Nlcyh0aW1lKX1cbiAgICAgICAgICByZWY9eyhsaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWUgPT09IHRpbWVUb0ZvY3VzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VudGVyTGkgPSBsaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9uS2V5RG93bihldiwgdGltZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGltZSA9PT0gdGltZVRvRm9jdXMgPyAwIDogLTF9XG4gICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtmb3JtYXREYXRlKHRpbWUsIGZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lciAke1xuICAgICAgICAgIHRoaXMucHJvcHMudG9kYXlCdXR0b25cbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lci0td2l0aC10b2RheS1idXR0b25cIlxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZSAke1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZS0tb25seVwiXG4gICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgIH1gfVxuICAgICAgICAgIHJlZj17KGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19oZWFkZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWJveFwiPlxuICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdFwiXG4gICAgICAgICAgICAgIHJlZj17KGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBzdHlsZT17aGVpZ2h0ID8geyBoZWlnaHQgfSA6IHt9fVxuICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVzKCl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGdldFllYXIsIG5ld0RhdGUgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGVhclNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldFByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgWUVBUl9SRUZTID0gWy4uLkFycmF5KHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIpXS5tYXAoKCkgPT5cbiAgICBSZWFjdC5jcmVhdGVSZWYoKSxcbiAgKTtcblxuICBpc0Rpc2FibGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RGlzYWJsZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNFeGNsdWRlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheUV4Y2x1ZGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIHNlbGVjdGluZ0RhdGUgPSAoKSA9PiB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgdXBkYXRlRm9jdXNPblBhZ2luYXRlID0gKHJlZkluZGV4KSA9PiB7XG4gICAgY29uc3Qgd2FpdEZvclJlUmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5ZRUFSX1JFRlNbcmVmSW5kZXhdLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdhaXRGb3JSZVJlbmRlcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVllYXJOYXZpZ2F0aW9uID0gKG5ld1llYXIsIG5ld0RhdGUpID0+IHtcbiAgICBjb25zdCB7IGRhdGUsIHllYXJJdGVtTnVtYmVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKGRhdGUsIHllYXJJdGVtTnVtYmVyKTtcblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG5cbiAgICBpZiAobmV3WWVhciAtIHN0YXJ0UGVyaW9kID09PSAtMSkge1xuICAgICAgdGhpcy51cGRhdGVGb2N1c09uUGFnaW5hdGUoeWVhckl0ZW1OdW1iZXIgLSAxKTtcbiAgICB9IGVsc2UgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA9PT0geWVhckl0ZW1OdW1iZXIpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKDApO1xuICAgIH0gZWxzZSB0aGlzLllFQVJfUkVGU1tuZXdZZWFyIC0gc3RhcnRQZXJpb2RdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBpc1NhbWVEYXkgPSAoeSwgb3RoZXIpID0+IHV0aWxzLmlzU2FtZURheSh5LCBvdGhlcik7XG5cbiAgaXNDdXJyZW50WWVhciA9ICh5KSA9PiB5ID09PSBnZXRZZWFyKG5ld0RhdGUoKSk7XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5zdGFydERhdGUpO1xuXG4gIGlzUmFuZ2VFbmQgPSAoeSkgPT5cbiAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSAmJlxuICAgIHRoaXMucHJvcHMuZW5kRGF0ZSAmJlxuICAgIHV0aWxzLmlzU2FtZVllYXIodXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5SYW5nZSA9ICh5KSA9PlxuICAgIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5wcm9wcy5zdGFydERhdGUsIHRoaXMucHJvcHMuZW5kRGF0ZSk7XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKHkpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhdGhpcy5zZWxlY3RpbmdEYXRlKClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCB0aGlzLnNlbGVjdGluZ0RhdGUoKSwgZW5kRGF0ZSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzUmFuZ2UgJiYgc3RhcnREYXRlICYmICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCBzdGFydERhdGUsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX3llYXIgPSB1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSk7XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlRW5kID0gKHkpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBlbmREYXRlLCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX3llYXIgPSB1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSk7XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoeSkgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSB1dGlscy5nZXRTdGFydE9mWWVhcih1dGlscy5zZXRZZWFyKHRoaXMucHJvcHMuZGF0ZSwgeSkpO1xuICAgIHJldHVybiAoXG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgIXRoaXMucHJvcHMuaW5saW5lICYmXG4gICAgICAhdXRpbHMuaXNTYW1lRGF5KGRhdGUsIHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHRoaXMucHJvcHMuc2VsZWN0ZWQpKSAmJlxuICAgICAgdXRpbHMuaXNTYW1lRGF5KGRhdGUsIHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKSlcbiAgICApO1xuICB9O1xuXG4gIG9uWWVhckNsaWNrID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGRhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5oYW5kbGVZZWFyQ2xpY2sodXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcihkYXRlLCB5KSksIGUpO1xuICB9O1xuXG4gIG9uWWVhcktleURvd24gPSAoZSwgeSkgPT4ge1xuICAgIGNvbnN0IHsga2V5IH0gPSBlO1xuICAgIGNvbnN0IHsgaGFuZGxlT25LZXlEb3duIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGUsIHkpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5ICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHkgLSAxLFxuICAgICAgICAgICAgdXRpbHMuc3ViWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT25LZXlEb3duICYmIGhhbmRsZU9uS2V5RG93bihlKTtcbiAgfTtcblxuICBnZXRZZWFyQ2xhc3NOYW1lcyA9ICh5KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICAgIGluY2x1ZGVEYXRlcyxcbiAgICAgIGZpbHRlckRhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsYXNzbmFtZXMoXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHRcIiwge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGVkXCI6IHkgPT09IGdldFllYXIoc2VsZWN0ZWQpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcyB8fCBmaWx0ZXJEYXRlKSAmJlxuICAgICAgICB1dGlscy5pc1llYXJEaXNhYmxlZCh5LCB0aGlzLnByb3BzKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCh5KSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCh5KSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kKHkpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKHkpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoeSksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoeSksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRZZWFyKHkpLFxuICAgIH0pO1xuICB9O1xuXG4gIGdldFllYXJUYWJJbmRleCA9ICh5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHJldHVybiBcIi0xXCI7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWQgPSB1dGlscy5nZXRZZWFyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICAgIHJldHVybiB5ID09PSBwcmVTZWxlY3RlZCA/IFwiMFwiIDogXCItMVwiO1xuICB9O1xuXG4gIGdldFllYXJDb250YWluZXJDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW5nRGF0ZSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbGFzc25hbWVzKFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhclwiLCB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICBzZWxlY3RpbmdEYXRlICYmIChzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpLFxuICAgIH0pO1xuICB9O1xuXG4gIGdldFllYXJDb250ZW50ID0gKHkpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCA/IHRoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnQoeSkgOiB5O1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB5ZWFyc0xpc3QgPSBbXTtcbiAgICBjb25zdCB7IGRhdGUsIHllYXJJdGVtTnVtYmVyLCBvblllYXJNb3VzZUVudGVyLCBvblllYXJNb3VzZUxlYXZlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKFxuICAgICAgZGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG5cbiAgICBmb3IgKGxldCB5ID0gc3RhcnRQZXJpb2Q7IHkgPD0gZW5kUGVyaW9kOyB5KyspIHtcbiAgICAgIHllYXJzTGlzdC5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXt0aGlzLllFQVJfUkVGU1t5IC0gc3RhcnRQZXJpb2RdfVxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblllYXJDbGljayhldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25ZZWFyS2V5RG93bihldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRZZWFyVGFiSW5kZXgoeSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFllYXJDbGFzc05hbWVzKHkpfVxuICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUVudGVyKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VMZWF2ZShldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5PXt5fVxuICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRZZWFyKHkpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5nZXRZZWFyQ29udGVudCh5KX1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMoKX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXdyYXBwZXJcIlxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNsZWFyU2VsZWN0aW5nRGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICA+XG4gICAgICAgICAge3llYXJzTGlzdH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGlucHV0VGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRpbWVTdHJpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aW1lOiB0aGlzLnByb3BzLnRpbWVTdHJpbmcsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgaWYgKHByb3BzLnRpbWVTdHJpbmcgIT09IHN0YXRlLnRpbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpbWU6IHByb3BzLnRpbWVTdHJpbmcsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFJldHVybiBudWxsIHRvIGluZGljYXRlIG5vIGNoYW5nZSB0byBzdGF0ZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uVGltZUNoYW5nZSA9ICh0aW1lKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWUgfSk7XG5cbiAgICBjb25zdCB7IGRhdGU6IHByb3BEYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzUHJvcERhdGVWYWxpZCA9IHByb3BEYXRlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ocHJvcERhdGUpO1xuICAgIGNvbnN0IGRhdGUgPSBpc1Byb3BEYXRlVmFsaWQgPyBwcm9wRGF0ZSA6IG5ldyBEYXRlKCk7XG5cbiAgICBkYXRlLnNldEhvdXJzKHRpbWUuc3BsaXQoXCI6XCIpWzBdKTtcbiAgICBkYXRlLnNldE1pbnV0ZXModGltZS5zcGxpdChcIjpcIilbMV0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShkYXRlKTtcbiAgfTtcblxuICByZW5kZXJUaW1lSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGF0ZSwgdGltZVN0cmluZywgY3VzdG9tVGltZUlucHV0IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGN1c3RvbVRpbWVJbnB1dCkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjdXN0b21UaW1lSW5wdXQsIHtcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgdmFsdWU6IHRpbWUsXG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uVGltZUNoYW5nZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRpbWVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJUaW1lXCJcbiAgICAgICAgbmFtZT1cInRpbWUtaW5wdXRcIlxuICAgICAgICByZXF1aXJlZFxuICAgICAgICB2YWx1ZT17dGltZX1cbiAgICAgICAgb25DaGFuZ2U9eyhldikgPT4ge1xuICAgICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKGV2LnRhcmdldC52YWx1ZSB8fCB0aW1lU3RyaW5nKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtdGltZS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2NhcHRpb25cIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIj5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVJbnB1dCgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXJDb250YWluZXIoe1xuICBzaG93VGltZVNlbGVjdE9ubHkgPSBmYWxzZSxcbiAgc2hvd1RpbWUgPSBmYWxzZSxcbiAgY2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbn0pIHtcbiAgbGV0IGFyaWFMYWJlbCA9IHNob3dUaW1lU2VsZWN0T25seVxuICAgID8gXCJDaG9vc2UgVGltZVwiXG4gICAgOiBgQ2hvb3NlIERhdGUke3Nob3dUaW1lID8gXCIgYW5kIFRpbWVcIiA6IFwiXCJ9YDtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5DYWxlbmRhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59O1xuIiwiaW1wb3J0IFllYXJEcm9wZG93biBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhEcm9wZG93biBmcm9tIFwiLi9tb250aF9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoWWVhckRyb3Bkb3duIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aCBmcm9tIFwiLi9tb250aFwiO1xuaW1wb3J0IFRpbWUgZnJvbSBcIi4vdGltZVwiO1xuaW1wb3J0IFllYXIgZnJvbSBcIi4veWVhclwiO1xuaW1wb3J0IElucHV0VGltZSBmcm9tIFwiLi9pbnB1dFRpbWVcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgQ2FsZW5kYXJDb250YWluZXIgZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBzZXRNb250aCxcbiAgZ2V0TW9udGgsXG4gIGFkZE1vbnRocyxcbiAgc3ViTW9udGhzLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0U3RhcnRPZlRvZGF5LFxuICBhZGREYXlzLFxuICBmb3JtYXREYXRlLFxuICBzZXRZZWFyLFxuICBnZXRZZWFyLFxuICBpc0JlZm9yZSxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0FmdGVyLFxuICBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlLFxuICBnZXRXZWVrZGF5TWluSW5Mb2NhbGUsXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIG1vbnRoRGlzYWJsZWRCZWZvcmUsXG4gIG1vbnRoRGlzYWJsZWRBZnRlcixcbiAgeWVhckRpc2FibGVkQmVmb3JlLFxuICB5ZWFyRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQmVmb3JlLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBhZGRaZXJvLFxuICBpc1ZhbGlkLFxuICBnZXRZZWFyc1BlcmlvZCxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBnZXRNb250aEluTG9jYWxlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMgPSBbXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiLFxuXTtcblxuY29uc3QgaXNEcm9wZG93blNlbGVjdCA9IChlbGVtZW50ID0ge30pID0+IHtcbiAgY29uc3QgY2xhc3NOYW1lcyA9IChlbGVtZW50LmNsYXNzTmFtZSB8fCBcIlwiKS5zcGxpdCgvXFxzKy8pO1xuICByZXR1cm4gRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUy5zb21lKFxuICAgICh0ZXN0Q2xhc3NuYW1lKSA9PiBjbGFzc05hbWVzLmluZGV4T2YodGVzdENsYXNzbmFtZSkgPj0gMCxcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uRHJvcGRvd25Gb2N1czogKCkgPT4ge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKVxuICAgICAgLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKSxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtb250aFNlbGVjdGVkSW46IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRyb3Bkb3duRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uVGltZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uRGF5S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5jb250YWluZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRlOiB0aGlzLmdldERhdGVJblZpZXcoKSxcbiAgICAgIHNlbGVjdGluZ0RhdGU6IG51bGwsXG4gICAgICBtb250aENvbnRhaW5lcjogbnVsbCxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gbW9udGhDb250YWluZXIgaGVpZ2h0IGlzIG5lZWRlZCBpbiB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHRvIGRldGVybWluZSB0aGUgaGVpZ2h0IGZvciB0aGUgdWwgaW4gdGhlIHRpbWUgY29tcG9uZW50XG4gICAgLy8gc2V0U3RhdGUgaGVyZSBzbyBoZWlnaHQgaXMgZ2l2ZW4gYWZ0ZXIgZmluYWwgY29tcG9uZW50XG4gICAgLy8gbGF5b3V0IGlzIHJlbmRlcmVkXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuYXNzaWduTW9udGhDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhDb250YWluZXI6IHRoaXMubW9udGhDb250YWluZXIgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbiAmJlxuICAgICAgKCFpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHByZXZQcm9wcy5wcmVTZWxlY3Rpb24pIHx8XG4gICAgICAgIHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluICE9PSBwcmV2UHJvcHMubW9udGhTZWxlY3RlZEluKVxuICAgICkge1xuICAgICAgY29uc3QgaGFzTW9udGhDaGFuZ2VkID0gIWlzU2FtZU1vbnRoKFxuICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gaGFzTW9udGhDaGFuZ2VkICYmIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZSAmJlxuICAgICAgIWlzU2FtZURheSh0aGlzLnByb3BzLm9wZW5Ub0RhdGUsIHByZXZQcm9wcy5vcGVuVG9EYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGU6IHRoaXMucHJvcHMub3BlblRvRGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICB9O1xuXG4gIHNldENsaWNrT3V0c2lkZVJlZiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGlzRHJvcGRvd25TZWxlY3QoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0ZUluVmlldyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByZVNlbGVjdGlvbiwgc2VsZWN0ZWQsIG9wZW5Ub0RhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld0RhdGUoKTtcbiAgICBjb25zdCBpbml0aWFsRGF0ZSA9IG9wZW5Ub0RhdGUgfHwgc2VsZWN0ZWQgfHwgcHJlU2VsZWN0aW9uO1xuICAgIGlmIChpbml0aWFsRGF0ZSkge1xuICAgICAgcmV0dXJuIGluaXRpYWxEYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWluRGF0ZSAmJiBpc0JlZm9yZShjdXJyZW50LCBtaW5EYXRlKSkge1xuICAgICAgICByZXR1cm4gbWluRGF0ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBpc0FmdGVyKGN1cnJlbnQsIG1heERhdGUpKSB7XG4gICAgICAgIHJldHVybiBtYXhEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfTtcblxuICBpbmNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZE1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgZGVjcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IGRheSB9KTtcbiAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgICB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUoKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VFbnRlciA9IChldmVudCwgeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBzZXRZZWFyKG5ld0RhdGUoKSwgeWVhcikgfSk7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VMZWF2ZSA9IChldmVudCwgeWVhcikgPT4ge1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZShldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uWWVhckNoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb250aENoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW9udGhZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgdGhpcy5oYW5kbGVNb250aENoYW5nZShkYXRlKTtcbiAgfTtcblxuICBjaGFuZ2VZZWFyID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKGRhdGUsIHllYXIpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0TW9udGgoZGF0ZSwgbW9udGgpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aFllYXIgPSAobW9udGhZZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihzZXRNb250aChkYXRlLCBnZXRNb250aChtb250aFllYXIpKSwgZ2V0WWVhcihtb250aFllYXIpKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aFllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhlYWRlciA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSBnZXRTdGFydE9mV2VlayhcbiAgICAgIGRhdGUsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3QgZGF5TmFtZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnMpIHtcbiAgICAgIGRheU5hbWVzLnB1c2goXG4gICAgICAgIDxkaXYga2V5PVwiV1wiIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMud2Vla0xhYmVsIHx8IFwiI1wifVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5TmFtZXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIGNvbnN0IHdlZWtEYXlOYW1lID0gdGhpcy5mb3JtYXRXZWVrZGF5KGRheSwgdGhpcy5wcm9wcy5sb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IHdlZWtEYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWVcbiAgICAgICAgICA/IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZShkYXkpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e29mZnNldH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiLFxuICAgICAgICAgICAgICB3ZWVrRGF5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7d2Vla0RheU5hbWV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGZvcm1hdFdlZWtkYXkgPSAoZGF5LCBsb2NhbGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5KSB7XG4gICAgICByZXR1cm4gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRheSwgdGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5LCBsb2NhbGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0XG4gICAgICA/IGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRheSwgbG9jYWxlKVxuICAgICAgOiBnZXRXZWVrZGF5TWluSW5Mb2NhbGUoZGF5LCBsb2NhbGUpO1xuICB9O1xuXG4gIGRlY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjbGVhclNlbGVjdGluZ0RhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gIH07XG5cbiAgcmVuZGVyUHJldmlvdXNCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbFByZXZEYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpY29uQ2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91c1wiLFxuICAgIF07XG5cbiAgICBsZXQgY2xpY2tIYW5kbGVyID0gdGhpcy5kZWNyZWFzZU1vbnRoO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlclxuICAgICkge1xuICAgICAgY2xpY2tIYW5kbGVyID0gdGhpcy5kZWNyZWFzZVllYXI7XG4gICAgfVxuXG4gICAgaWYgKGFsbFByZXZEYXlzRGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXByZXZpb3VzLS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IHByZXZpb3VzTW9udGhCdXR0b25MYWJlbCwgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7XG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsID0gdHlwZW9mIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHByZXZpb3VzTW9udGhCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c1llYXJCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IHByZXZpb3VzWWVhckFyaWFMYWJlbCA6IHByZXZpb3VzTW9udGhBcmlhTGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICAgIHtpc0ZvclllYXJcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5wcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnByZXZpb3VzTW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICBpbmNyZWFzZVllYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogYWRkWWVhcnMoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyID8gdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlciA6IDEsXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTmV4dEJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYWxsTmV4dERheXNEaXNhYmxlZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhckRpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSB5ZWFyc0Rpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICghdGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgIXRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dFwiLFxuICAgIF07XG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLW5leHRcIixcbiAgICBdO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS13aXRoLXRpbWVcIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnRvZGF5QnV0dG9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS13aXRoLXRvZGF5LWJ1dHRvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgY2xpY2tIYW5kbGVyID0gdGhpcy5pbmNyZWFzZU1vbnRoO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlclxuICAgICkge1xuICAgICAgY2xpY2tIYW5kbGVyID0gdGhpcy5pbmNyZWFzZVllYXI7XG4gICAgfVxuXG4gICAgaWYgKGFsbE5leHREYXlzRGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLWRpc2FibGVkXCIpO1xuICAgICAgY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvclllYXIgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIGNvbnN0IHsgbmV4dE1vbnRoQnV0dG9uTGFiZWwsIG5leHRZZWFyQnV0dG9uTGFiZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsID0gdHlwZW9mIG5leHRNb250aEJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dE1vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIk5leHQgTW9udGhcIixcbiAgICAgIG5leHRZZWFyQXJpYUxhYmVsID0gdHlwZW9mIG5leHRZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBuZXh0WWVhckJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IFllYXJcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9XG4gICAgICAgIG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNGb3JZZWFyID8gbmV4dFllYXJBcmlhTGFiZWwgOiBuZXh0TW9udGhBcmlhTGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICAgIHtpc0ZvclllYXJcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5uZXh0WWVhckJ1dHRvbkxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMubmV4dE1vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ3VycmVudE1vbnRoID0gKGRhdGUgPSB0aGlzLnN0YXRlLmRhdGUpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gW1wicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aFwiXTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc1llYXJEcm9wZG93blwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzTW9udGhZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgIHtmb3JtYXREYXRlKGRhdGUsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxZZWFyRHJvcGRvd25cbiAgICAgICAgYWRqdXN0RGF0ZU9uQ2hhbmdlPXt0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgeWVhcj17Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfVxuICAgICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJNb250aERyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoRHJvcGRvd25cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGh9XG4gICAgICAgIG1vbnRoPXtnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpfVxuICAgICAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bj17dGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93bn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJNb250aFllYXJEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TW9udGhZZWFyRHJvcGRvd25cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aFllYXJ9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlVG9kYXlCdXR0b25DbGljayA9IChlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChnZXRTdGFydE9mVG9kYXkoKSwgZSk7XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZ2V0U3RhcnRPZlRvZGF5KCkpO1xuICB9O1xuXG4gIHJlbmRlclRvZGF5QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy50b2RheUJ1dHRvbiB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190b2RheS1idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVUb2RheUJ1dHRvbkNsaWNrKGUpfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGVmYXVsdEhlYWRlciA9ICh7IG1vbnRoRGF0ZSwgaSB9KSA9PiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyICR7XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RcbiAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS1oYXMtdGltZS1zZWxlY3RcIlxuICAgICAgICAgIDogXCJcIlxuICAgICAgfWB9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyQ3VycmVudE1vbnRoKG1vbnRoRGF0ZSl9XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24gcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyX19kcm9wZG93bi0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZURyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlck1vbnRoRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICAgIHt0aGlzLnJlbmRlck1vbnRoWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJZZWFyRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgIHt0aGlzLmhlYWRlcihtb250aERhdGUpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyQ3VzdG9tSGVhZGVyID0gKGhlYWRlckFyZ3MgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHsgbW9udGhEYXRlLCBpIH0gPSBoZWFkZXJBcmdzO1xuXG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiYgIXRoaXMuc3RhdGUubW9udGhDb250YWluZXIpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldk1vbnRoQnV0dG9uRGlzYWJsZWQgPSBtb250aERpc2FibGVkQmVmb3JlKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgbmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQgPSBtb250aERpc2FibGVkQWZ0ZXIoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBwcmV2WWVhckJ1dHRvbkRpc2FibGVkID0geWVhckRpc2FibGVkQmVmb3JlKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgbmV4dFllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3Qgc2hvd0RheU5hbWVzID1cbiAgICAgICF0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciAmJlxuICAgICAgIXRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS1jdXN0b21cIlxuICAgICAgICBvbkZvY3VzPXt0aGlzLnByb3BzLm9uRHJvcGRvd25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIGN1c3RvbUhlYWRlckNvdW50OiBpLFxuICAgICAgICAgIG1vbnRoRGF0ZSxcbiAgICAgICAgICBjaGFuZ2VNb250aDogdGhpcy5jaGFuZ2VNb250aCxcbiAgICAgICAgICBjaGFuZ2VZZWFyOiB0aGlzLmNoYW5nZVllYXIsXG4gICAgICAgICAgZGVjcmVhc2VNb250aDogdGhpcy5kZWNyZWFzZU1vbnRoLFxuICAgICAgICAgIGluY3JlYXNlTW9udGg6IHRoaXMuaW5jcmVhc2VNb250aCxcbiAgICAgICAgICBkZWNyZWFzZVllYXI6IHRoaXMuZGVjcmVhc2VZZWFyLFxuICAgICAgICAgIGluY3JlYXNlWWVhcjogdGhpcy5pbmNyZWFzZVllYXIsXG4gICAgICAgICAgcHJldk1vbnRoQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgcHJldlllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBuZXh0WWVhckJ1dHRvbkRpc2FibGVkLFxuICAgICAgICB9KX1cbiAgICAgICAge3Nob3dEYXlOYW1lcyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZXNcIj5cbiAgICAgICAgICAgIHt0aGlzLmhlYWRlcihtb250aERhdGUpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJZZWFySGVhZGVyID0gKHsgbW9udGhEYXRlIH0pID0+IHtcbiAgICBjb25zdCB7IHNob3dZZWFyUGlja2VyLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgbW9udGhEYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgcmVhY3QtZGF0ZXBpY2tlci15ZWFyLWhlYWRlclwiPlxuICAgICAgICB7c2hvd1llYXJQaWNrZXIgPyBgJHtzdGFydFBlcmlvZH0gLSAke2VuZFBlcmlvZH1gIDogZ2V0WWVhcihtb250aERhdGUpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXIgPSAoaGVhZGVyQXJncykgPT4ge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlciAhPT0gdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDdXN0b21IZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJZZWFySGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGVmYXVsdEhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyTW9udGhzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSB8fCB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW9udGhMaXN0ID0gW107XG4gICAgY29uc3QgbW9udGhzVG9TdWJ0cmFjdCA9IHRoaXMucHJvcHMuc2hvd1ByZXZpb3VzTW9udGhzXG4gICAgICA/IHRoaXMucHJvcHMubW9udGhzU2hvd24gLSAxXG4gICAgICA6IDA7XG4gICAgY29uc3QgZnJvbU1vbnRoRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgPyBhZGRZZWFycyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpXG4gICAgICAgIDogc3ViTW9udGhzKHRoaXMuc3RhdGUuZGF0ZSwgbW9udGhzVG9TdWJ0cmFjdCk7XG4gICAgY29uc3QgbW9udGhTZWxlY3RlZEluID0gdGhpcy5wcm9wcy5tb250aFNlbGVjdGVkSW4gPz8gbW9udGhzVG9TdWJ0cmFjdDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubW9udGhzU2hvd247ICsraSkge1xuICAgICAgY29uc3QgbW9udGhzVG9BZGQgPSBpIC0gbW9udGhTZWxlY3RlZEluICsgbW9udGhzVG9TdWJ0cmFjdDtcbiAgICAgIGNvbnN0IG1vbnRoRGF0ZSA9XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fCB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgID8gYWRkWWVhcnMoZnJvbU1vbnRoRGF0ZSwgbW9udGhzVG9BZGQpXG4gICAgICAgICAgOiBhZGRNb250aHMoZnJvbU1vbnRoRGF0ZSwgbW9udGhzVG9BZGQpO1xuICAgICAgY29uc3QgbW9udGhLZXkgPSBgbW9udGgtJHtpfWA7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCA9IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMTtcbiAgICAgIGNvbnN0IG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgPSBpID4gMDtcbiAgICAgIG1vbnRoTGlzdC5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXttb250aEtleX1cbiAgICAgICAgICByZWY9eyhkaXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9udGhDb250YWluZXIgPSBkaXY7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1jb250YWluZXJcIlxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKHsgbW9udGhEYXRlLCBpIH0pfVxuICAgICAgICAgIDxNb250aFxuICAgICAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgd2Vla0FyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICAgICAgZGF5PXttb250aERhdGV9XG4gICAgICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uRGF5S2V5RG93bn1cbiAgICAgICAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb250aE1vdXNlTGVhdmV9XG4gICAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgICAgb3JkZXJJbkRpc3BsYXk9e2l9XG4gICAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgICBob2xpZGF5cz17dGhpcy5wcm9wcy5ob2xpZGF5c31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIGZpeGVkSGVpZ2h0PXt0aGlzLnByb3BzLmZpeGVkSGVpZ2h0fVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXJzPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgICBwZWVrTmV4dE1vbnRoPXt0aGlzLnByb3BzLnBlZWtOZXh0TW9udGh9XG4gICAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIHJlbmRlck1vbnRoQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJNb250aENvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgICAgIHJlbmRlclllYXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50fVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBzaG93TW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXttb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBtb250aExpc3Q7XG4gIH07XG5cbiAgcmVuZGVyWWVhcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZTogdGhpcy5zdGF0ZS5kYXRlIH0pfVxuICAgICAgICAgIDxZZWFyXG4gICAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5zdGF0ZS5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgY2xlYXJTZWxlY3RpbmdEYXRlPXt0aGlzLmNsZWFyU2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgb25ZZWFyTW91c2VFbnRlcj17dGhpcy5oYW5kbGVZZWFyTW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlWWVhck1vdXNlTGVhdmV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJUaW1lU2VjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmXG4gICAgICAodGhpcy5zdGF0ZS5tb250aENvbnRhaW5lciB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSlcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaW1lXG4gICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgb3BlblRvRGF0ZT17dGhpcy5wcm9wcy5vcGVuVG9EYXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVGltZUNoYW5nZX1cbiAgICAgICAgICB0aW1lQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRpbWVDbGFzc05hbWV9XG4gICAgICAgICAgZm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9XG4gICAgICAgICAgaW5jbHVkZVRpbWVzPXt0aGlzLnByb3BzLmluY2x1ZGVUaW1lc31cbiAgICAgICAgICBpbnRlcnZhbHM9e3RoaXMucHJvcHMudGltZUludGVydmFsc31cbiAgICAgICAgICBtaW5UaW1lPXt0aGlzLnByb3BzLm1pblRpbWV9XG4gICAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICAgIGV4Y2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5leGNsdWRlVGltZXN9XG4gICAgICAgICAgZmlsdGVyVGltZT17dGhpcy5wcm9wcy5maWx0ZXJUaW1lfVxuICAgICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIHRvZGF5QnV0dG9uPXt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgICAgIHNob3dNb250aERyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3dufVxuICAgICAgICAgIHNob3dNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgICAgc2hvd1llYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3dufVxuICAgICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgICBtb250aFJlZj17dGhpcy5zdGF0ZS5tb250aENvbnRhaW5lcn1cbiAgICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcklucHV0VGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIGNvbnN0IHRpbWVWYWxpZCA9IGlzVmFsaWQodGltZSkgJiYgQm9vbGVhbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lU3RyaW5nID0gdGltZVZhbGlkXG4gICAgICA/IGAke2FkZFplcm8odGltZS5nZXRIb3VycygpKX06JHthZGRaZXJvKHRpbWUuZ2V0TWludXRlcygpKX1gXG4gICAgICA6IFwiXCI7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPElucHV0VGltZVxuICAgICAgICAgIGRhdGU9e3RpbWV9XG4gICAgICAgICAgdGltZVN0cmluZz17dGltZVN0cmluZ31cbiAgICAgICAgICB0aW1lSW5wdXRMYWJlbD17dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgY3VzdG9tVGltZUlucHV0PXt0aGlzLnByb3BzLmN1c3RvbVRpbWVJbnB1dH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgbGV0IGFyaWFMaXZlTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtzdGFydFBlcmlvZH0gLSAke2VuZFBlcmlvZH1gO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGAke2dldE1vbnRoSW5Mb2NhbGUoXG4gICAgICAgIGdldE1vbnRoKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgKX0gJHtnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fYXJpYS1saXZlXCJcbiAgICAgID5cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgYXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ2hpbGRyZW4gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fY2hpbGRyZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IENvbnRhaW5lciA9IHRoaXMucHJvcHMuY29udGFpbmVyIHx8IENhbGVuZGFyQ29udGFpbmVyO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6IFwiY29udGVudHNcIiB9fSByZWY9e3RoaXMuY29udGFpbmVyUmVmfT5cbiAgICAgICAgPENvbnRhaW5lclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcInJlYWN0LWRhdGVwaWNrZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlci0tdGltZS1vbmx5XCI6IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5LFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIHNob3dUaW1lPXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQXJpYUxpdmVSZWdpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJQcmV2aW91c0J1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck5leHRCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJNb250aHMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJZZWFycygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRvZGF5QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyVGltZVNlY3Rpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dFRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmNvbnN0IENhbGVuZGFySWNvbiA9ICh7IGljb24sIGNsYXNzTmFtZSA9IFwiXCIsIG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBkZWZhdWx0Q2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2NhbGVuZGFyLWljb25cIjtcblxuICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoaWNvbikpIHtcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGljb24sIHtcbiAgICAgIGNsYXNzTmFtZTogYCR7aWNvbi5wcm9wcy5jbGFzc05hbWUgfHwgXCJcIn0gJHtkZWZhdWx0Q2xhc3N9ICR7Y2xhc3NOYW1lfWAsXG4gICAgICBvbkNsaWNrOiAoZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGljb24ucHJvcHMub25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWNvbi5wcm9wcy5vbkNsaWNrKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBvbkNsaWNrKGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpY29uID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpXG4gICAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2ljb259ICR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICAvLyBEZWZhdWx0IFNWRyBJY29uXG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgY2xhc3NOYW1lPXtgJHtkZWZhdWx0Q2xhc3N9ICR7Y2xhc3NOYW1lfWB9XG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgID5cbiAgICAgIDxwYXRoIGQ9XCJNOTYgMzJWNjRINDhDMjEuNSA2NCAwIDg1LjUgMCAxMTJ2NDhINDQ4VjExMmMwLTI2LjUtMjEuNS00OC00OC00OEgzNTJWMzJjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJWNjRIMTYwVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMyUzk2IDE0LjMgOTYgMzJ6TTQ0OCAxOTJIMFY0NjRjMCAyNi41IDIxLjUgNDggNDggNDhINDAwYzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjE5MnpcIiAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuQ2FsZW5kYXJJY29uLnByb3BUeXBlcyA9IHtcbiAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhbGVuZGFySWNvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5hbnksXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvcnRhbFJvb3QgPSAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50KS5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRoaXMucHJvcHMucG9ydGFsSWQsXG4gICAgKTtcbiAgICBpZiAoIXRoaXMucG9ydGFsUm9vdCkge1xuICAgICAgdGhpcy5wb3J0YWxSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMucG9ydGFsUm9vdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0aGlzLnByb3BzLnBvcnRhbElkKTtcbiAgICAgICh0aGlzLnByb3BzLnBvcnRhbEhvc3QgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQodGhpcy5wb3J0YWxSb290KTtcbiAgICB9XG4gICAgdGhpcy5wb3J0YWxSb290LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290LnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwodGhpcy5wcm9wcy5jaGlsZHJlbiwgdGhpcy5lbCk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuLy8gVGFiTG9vcCBwcmV2ZW50cyB0aGUgdXNlciBmcm9tIHRhYmJpbmcgb3V0c2lkZSBvZiB0aGUgcG9wcGVyXG4vLyBJdCBjcmVhdGVzIGEgdGFiaW5kZXggbG9vcCBzbyB0aGF0IFwiVGFiXCIgb24gdGhlIGxhc3QgZWxlbWVudCB3aWxsIGZvY3VzIHRoZSBmaXJzdCBlbGVtZW50XG4vLyBhbmQgXCJTaGlmdCBUYWJcIiBvbiB0aGUgZmlyc3QgZWxlbWVudCB3aWxsIGZvY3VzIHRoZSBsYXN0IGVsZW1lbnRcblxuY29uc3QgZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciA9XG4gIFwiW3RhYmluZGV4XSwgYSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYVwiO1xuY29uc3QgZm9jdXNhYmxlRmlsdGVyID0gKG5vZGUpID0+ICFub2RlLmRpc2FibGVkICYmIG5vZGUudGFiSW5kZXggIT09IC0xO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJMb29wIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVuYWJsZVRhYkxvb3A6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5hbnksXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnRhYkxvb3BSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgfVxuXG4gIC8vIHF1ZXJ5IGFsbCBmb2N1c2FibGUgZWxlbWVudHNcbiAgLy8gdHJpbSBmaXJzdCBhbmQgbGFzdCBiZWNhdXNlIHRoZXkgYXJlIHRoZSBmb2N1cyBndWFyZHNcbiAgZ2V0VGFiQ2hpbGRyZW4gPSAoKSA9PlxuICAgIEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgLmNhbGwoXG4gICAgICAgIHRoaXMudGFiTG9vcFJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciksXG4gICAgICAgIDEsXG4gICAgICAgIC0xLFxuICAgICAgKVxuICAgICAgLmZpbHRlcihmb2N1c2FibGVGaWx0ZXIpO1xuXG4gIGhhbmRsZUZvY3VzU3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFiQ2hpbGRyZW4gPSB0aGlzLmdldFRhYkNoaWxkcmVuKCk7XG4gICAgdGFiQ2hpbGRyZW4gJiZcbiAgICAgIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiZcbiAgICAgIHRhYkNoaWxkcmVuW3RhYkNoaWxkcmVuLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gIH07XG5cbiAgaGFuZGxlRm9jdXNFbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFiQ2hpbGRyZW4gPSB0aGlzLmdldFRhYkNoaWxkcmVuKCk7XG4gICAgdGFiQ2hpbGRyZW4gJiYgdGFiQ2hpbGRyZW4ubGVuZ3RoID4gMSAmJiB0YWJDaGlsZHJlblswXS5mb2N1cygpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZW5hYmxlVGFiTG9vcCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wXCIgcmVmPXt0aGlzLnRhYkxvb3BSZWZ9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX3N0YXJ0XCJcbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXNTdGFydH1cbiAgICAgICAgLz5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcF9fZW5kXCJcbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXNFbmR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICB1c2VGbG9hdGluZyxcbiAgYXJyb3csXG4gIG9mZnNldCxcbiAgZmxpcCxcbiAgYXV0b1VwZGF0ZSxcbn0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgcG9wcGVyUGxhY2VtZW50UG9zaXRpb25zID0gW1xuICBcInRvcC1zdGFydFwiLFxuICBcInRvcC1lbmRcIixcbiAgXCJib3R0b20tc3RhcnRcIixcbiAgXCJib3R0b20tZW5kXCIsXG4gIFwicmlnaHQtc3RhcnRcIixcbiAgXCJyaWdodC1lbmRcIixcbiAgXCJsZWZ0LXN0YXJ0XCIsXG4gIFwibGVmdC1lbmRcIixcbiAgXCJ0b3BcIixcbiAgXCJyaWdodFwiLFxuICBcImJvdHRvbVwiLFxuICBcImxlZnRcIixcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhGbG9hdGluZyhDb21wb25lbnQpIHtcbiAgY29uc3QgV2l0aEZsb2F0aW5nID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgYWx0X3Byb3BzID0ge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBwb3BwZXJNb2RpZmllcnM6IHByb3BzLnBvcHBlck1vZGlmaWVycyB8fCBbXSxcbiAgICAgIHBvcHBlclByb3BzOiBwcm9wcy5wb3BwZXJQcm9wcyB8fCB7fSxcbiAgICAgIGhpZGVQb3BwZXI6XG4gICAgICAgIHR5cGVvZiBwcm9wcy5oaWRlUG9wcGVyID09PSBcImJvb2xlYW5cIiA/IHByb3BzLmhpZGVQb3BwZXIgOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3QgYXJyb3dSZWYgPSBSZWFjdC51c2VSZWYoKTtcbiAgICBjb25zdCBmbG9hdGluZ1Byb3BzID0gdXNlRmxvYXRpbmcoe1xuICAgICAgb3BlbjogIWFsdF9wcm9wcy5oaWRlUG9wcGVyLFxuICAgICAgd2hpbGVFbGVtZW50c01vdW50ZWQ6IGF1dG9VcGRhdGUsXG4gICAgICBwbGFjZW1lbnQ6IGFsdF9wcm9wcy5wb3BwZXJQbGFjZW1lbnQsXG4gICAgICBtaWRkbGV3YXJlOiBbXG4gICAgICAgIGZsaXAoeyBwYWRkaW5nOiAxNSB9KSxcbiAgICAgICAgb2Zmc2V0KDEwKSxcbiAgICAgICAgYXJyb3coeyBlbGVtZW50OiBhcnJvd1JlZiB9KSxcbiAgICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlck1vZGlmaWVycyxcbiAgICAgIF0sXG4gICAgICAuLi5hbHRfcHJvcHMucG9wcGVyUHJvcHMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudCB7Li4uYWx0X3Byb3BzfSBwb3BwZXJQcm9wcz17eyAuLi5mbG9hdGluZ1Byb3BzLCBhcnJvd1JlZiB9fSAvPlxuICAgICk7XG4gIH07XG5cbiAgV2l0aEZsb2F0aW5nLnByb3BUeXBlcyA9IHtcbiAgICBwb3BwZXJQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMpLFxuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaGlkZVBvcHBlcjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgcmV0dXJuIFdpdGhGbG9hdGluZztcbn1cbiIsImltcG9ydCBjbGFzc25hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBGbG9hdGluZ0Fycm93IH0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgd2l0aEZsb2F0aW5nIGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbmV4cG9ydCBjbGFzcyBQb3BwZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlkZVBvcHBlcjogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGFyZ2V0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgICBoaWRlUG9wcGVyLFxuICAgICAgcG9wcGVyQ29tcG9uZW50LFxuICAgICAgdGFyZ2V0Q29tcG9uZW50LFxuICAgICAgZW5hYmxlVGFiTG9vcCxcbiAgICAgIHBvcHBlck9uS2V5RG93bixcbiAgICAgIHBvcnRhbElkLFxuICAgICAgcG9ydGFsSG9zdCxcbiAgICAgIHBvcHBlclByb3BzLFxuICAgICAgc2hvd0Fycm93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHBvcHBlcjtcblxuICAgIGlmICghaGlkZVBvcHBlcikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzbmFtZXMoXCJyZWFjdC1kYXRlcGlja2VyLXBvcHBlclwiLCBjbGFzc05hbWUpO1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXtlbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0RmxvYXRpbmd9XG4gICAgICAgICAgICBzdHlsZT17cG9wcGVyUHJvcHMuZmxvYXRpbmdTdHlsZXN9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICBkYXRhLXBsYWNlbWVudD17cG9wcGVyUHJvcHMucGxhY2VtZW50fVxuICAgICAgICAgICAgb25LZXlEb3duPXtwb3BwZXJPbktleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcHBlckNvbXBvbmVudH1cbiAgICAgICAgICAgIHtzaG93QXJyb3cgJiYgKFxuICAgICAgICAgICAgICA8RmxvYXRpbmdBcnJvd1xuICAgICAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMuYXJyb3dSZWZ9XG4gICAgICAgICAgICAgICAgY29udGV4dD17cG9wcGVyUHJvcHMuY29udGV4dH1cbiAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezh9XG4gICAgICAgICAgICAgICAgd2lkdGg9ezE2fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKC0xcHgpXCIgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190cmlhbmdsZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcikge1xuICAgICAgcG9wcGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lciwge30sIHBvcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbElkICYmICFoaWRlUG9wcGVyKSB7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxQb3J0YWwgcG9ydGFsSWQ9e3BvcnRhbElkfSBwb3J0YWxIb3N0PXtwb3J0YWxIb3N0fT5cbiAgICAgICAgICB7cG9wcGVyfVxuICAgICAgICA8L1BvcnRhbD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbGFzc25hbWVzKFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyLXdyYXBwZXJcIixcbiAgICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxkaXYgcmVmPXtwb3BwZXJQcm9wcy5yZWZzLnNldFJlZmVyZW5jZX0gY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3Nlc30+XG4gICAgICAgICAge3RhcmdldENvbXBvbmVudH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtwb3BwZXJ9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aEZsb2F0aW5nKFBvcHBlckNvbXBvbmVudCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSBcIi4vY2FsZW5kYXJcIjtcbmltcG9ydCBDYWxlbmRhckljb24gZnJvbSBcIi4vY2FsZW5kYXJfaWNvblwiO1xuaW1wb3J0IFBvcnRhbCBmcm9tIFwiLi9wb3J0YWxcIjtcbmltcG9ydCBQb3BwZXJDb21wb25lbnQgZnJvbSBcIi4vcG9wcGVyX2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgcG9wcGVyUGxhY2VtZW50UG9zaXRpb25zIH0gZnJvbSBcIi4vd2l0aF9mbG9hdGluZ1wiO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7IHNldCB9IGZyb20gXCJkYXRlLWZucy9zZXRcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZEYXlcIjtcbmltcG9ydCB7IGlzVmFsaWQgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgaXNEYXRlLFxuICBpc0JlZm9yZSxcbiAgaXNBZnRlcixcbiAgaXNFcXVhbCxcbiAgc2V0VGltZSxcbiAgZ2V0U2Vjb25kcyxcbiAgZ2V0TWludXRlcyxcbiAgZ2V0SG91cnMsXG4gIGFkZERheXMsXG4gIGFkZE1vbnRocyxcbiAgYWRkV2Vla3MsXG4gIHN1YkRheXMsXG4gIHN1Yk1vbnRocyxcbiAgc3ViV2Vla3MsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNEYXlEaXNhYmxlZCxcbiAgaXNEYXlJblJhbmdlLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBwYXJzZURhdGUsXG4gIHNhZmVEYXRlRm9ybWF0LFxuICBzYWZlRGF0ZVJhbmdlRm9ybWF0LFxuICBnZXRIaWdodExpZ2h0RGF5c01hcCxcbiAgZ2V0WWVhcixcbiAgZ2V0TW9udGgsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBnZXRFbmRPZldlZWssXG4gIHJlZ2lzdGVyTG9jYWxlLFxuICBzZXREZWZhdWx0TG9jYWxlLFxuICBnZXREZWZhdWx0TG9jYWxlLFxuICBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gIGlzU2FtZURheSxcbiAgaXNNb250aERpc2FibGVkLFxuICBpc1llYXJEaXNhYmxlZCxcbiAgc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQsXG4gIGdldEhvbGlkYXlzTWFwLFxuICBpc0RhdGVCZWZvcmUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FsZW5kYXJDb250YWluZXIgfSBmcm9tIFwiLi9jYWxlbmRhcl9jb250YWluZXJcIjtcblxuZXhwb3J0IHsgcmVnaXN0ZXJMb2NhbGUsIHNldERlZmF1bHRMb2NhbGUsIGdldERlZmF1bHRMb2NhbGUgfTtcblxuY29uc3Qgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCI7XG5jb25zdCBXcmFwcGVkQ2FsZW5kYXIgPSBvbkNsaWNrT3V0c2lkZShDYWxlbmRhcik7XG5cbi8vIENvbXBhcmVzIGRhdGVzIHllYXIrbW9udGggY29tYmluYXRpb25zXG5mdW5jdGlvbiBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ2V0TW9udGgoZGF0ZTEpICE9PSBnZXRNb250aChkYXRlMikgfHwgZ2V0WWVhcihkYXRlMSkgIT09IGdldFllYXIoZGF0ZTIpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlMSAhPT0gZGF0ZTI7XG59XG5cbi8qKlxuICogR2VuZXJhbCBkYXRlcGlja2VyIGNvbXBvbmVudC5cbiAqL1xuY29uc3QgSU5QVVRfRVJSXzEgPSBcIkRhdGUgaW5wdXQgbm90IHZhbGlkLlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFsbG93U2FtZURheTogZmFsc2UsXG4gICAgICBkYXRlRm9ybWF0OiBcIk1NL2RkL3l5eXlcIixcbiAgICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogXCJMTExMIHl5eXlcIixcbiAgICAgIG9uQ2hhbmdlKCkge30sXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICBkcm9wZG93bk1vZGU6IFwic2Nyb2xsXCIsXG4gICAgICBvbkZvY3VzKCkge30sXG4gICAgICBvbkJsdXIoKSB7fSxcbiAgICAgIG9uS2V5RG93bigpIHt9LFxuICAgICAgb25JbnB1dENsaWNrKCkge30sXG4gICAgICBvblNlbGVjdCgpIHt9LFxuICAgICAgb25DbGlja091dHNpZGUoKSB7fSxcbiAgICAgIG9uTW9udGhDaGFuZ2UoKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJPcGVuKCkge30sXG4gICAgICBvbkNhbGVuZGFyQ2xvc2UoKSB7fSxcbiAgICAgIHByZXZlbnRPcGVuT25Gb2N1czogZmFsc2UsXG4gICAgICBvblllYXJDaGFuZ2UoKSB7fSxcbiAgICAgIG9uSW5wdXRFcnJvcigpIHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICB3aXRoUG9ydGFsOiBmYWxzZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBmYWxzZSxcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgICBzaG93VGltZVNlbGVjdDogZmFsc2UsXG4gICAgICBzaG93VGltZUlucHV0OiBmYWxzZSxcbiAgICAgIHNob3dQcmV2aW91c01vbnRoczogZmFsc2UsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1llYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dXZWVrUGlja2VyOiBmYWxzZSxcbiAgICAgIHN0cmljdFBhcnNpbmc6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsczogMzAsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgdGltZUlucHV0TGFiZWw6IFwiVGltZVwiLFxuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyOiBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gICAgICBmb2N1c1NlbGVjdGVkTW9udGg6IGZhbHNlLFxuICAgICAgc2hvd1BvcHBlckFycm93OiB0cnVlLFxuICAgICAgZXhjbHVkZVNjcm9sbGJhcjogdHJ1ZSxcbiAgICAgIGN1c3RvbVRpbWVJbnB1dDogbnVsbCxcbiAgICAgIGNhbGVuZGFyU3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IGZhbHNlLFxuICAgICAgdXNlUG9pbnRlckV2ZW50OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGFsbG93U2FtZURheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYXJpYURlc2NyaWJlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFJbnZhbGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbENsb3NlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbGxlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFSZXF1aXJlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbG9zZU9uU2Nyb2xsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGN1c3RvbUlucHV0UmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSksXG4gICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICBdKSxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgICBjYWxlbmRhckljb25DbGFzc25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZVJhdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dEVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNhbGVuZGFyT3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DYWxlbmRhckNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwbGFjZWhvbGRlclRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHByZXZlbnRPcGVuT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3RQYXJzaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzdGFydE9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2l0aFBvcnRhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGF0ZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjbGVhckJ1dHRvblRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvY3VzU2VsZWN0ZWRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBleGNsdWRlU2Nyb2xsYmFyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCk7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKFxuICAgICAgcHJldlByb3BzLmlubGluZSAmJlxuICAgICAgaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcHJldlByb3BzLm1vbnRoc1Nob3duICE9PSB0aGlzLnByb3BzLm1vbnRoc1Nob3duXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiAwIH0pO1xuICAgIH1cbiAgICBpZiAocHJldlByb3BzLmhpZ2hsaWdodERhdGVzICE9PSB0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICFwcmV2U3RhdGUuZm9jdXNlZCAmJlxuICAgICAgIWlzRXF1YWwocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZTdGF0ZS5vcGVuICE9PSB0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gZmFsc2UgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhck9wZW4oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSB0cnVlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgZ2V0UHJlU2VsZWN0aW9uID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgID8gdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c0VuZCAmJiB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzU3RhcnQgJiYgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA6IG5ld0RhdGUoKTtcblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGZyb20gc3RyaW5nIGZvcm1hdCB0byBzdGFuZGFyZCBEYXRlIGZvcm1hdFxuICBtb2RpZnlIb2xpZGF5cyA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5ob2xpZGF5cz8ucmVkdWNlKChhY2N1bXVsYXRvciwgaG9saWRheSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGhvbGlkYXkuZGF0ZSk7XG4gICAgICBpZiAoIWlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gWy4uLmFjY3VtdWxhdG9yLCB7IC4uLmhvbGlkYXksIGRhdGUgfV07XG4gICAgfSwgW10pO1xuXG4gIGNhbGNJbml0aWFsU3RhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFByZVNlbGVjdGlvbiA9IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgYm91bmRlZFByZVNlbGVjdGlvbiA9XG4gICAgICBtaW5EYXRlICYmIGlzQmVmb3JlKGRlZmF1bHRQcmVTZWxlY3Rpb24sIHN0YXJ0T2ZEYXkobWluRGF0ZSkpXG4gICAgICAgID8gbWluRGF0ZVxuICAgICAgICA6IG1heERhdGUgJiYgaXNBZnRlcihkZWZhdWx0UHJlU2VsZWN0aW9uLCBlbmRPZkRheShtYXhEYXRlKSlcbiAgICAgICAgICA/IG1heERhdGVcbiAgICAgICAgICA6IGRlZmF1bHRQcmVTZWxlY3Rpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IHRoaXMucHJvcHMuc3RhcnRPcGVuIHx8IGZhbHNlLFxuICAgICAgcHJldmVudEZvY3VzOiBmYWxzZSxcbiAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZCkgPz8gYm91bmRlZFByZVNlbGVjdGlvbixcbiAgICAgIC8vIHRyYW5zZm9ybWluZyBoaWdobGlnaHRlZCBkYXlzIChwZXJoYXBzIG5lc3RlZCBhcnJheSlcbiAgICAgIC8vIHRvIGZsYXQgTWFwIGZvciBmYXN0ZXIgYWNjZXNzIGluIGRheS5qc3hcbiAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgLy8gdXNlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb24gYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQsIGJ1dCBub3Qgb25cbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfTtcblxuICBjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmVudEZvY3VzVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIHNldEZvY3VzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZm9jdXMpIHtcbiAgICAgIHRoaXMuaW5wdXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZXRCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuYmx1cikge1xuICAgICAgdGhpcy5pbnB1dC5ibHVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgc2V0T3BlbiA9IChvcGVuLCBza2lwU2V0Qmx1ciA9IGZhbHNlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgb3Blbjogb3BlbixcbiAgICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAgIG9wZW4gJiYgdGhpcy5zdGF0ZS5vcGVuXG4gICAgICAgICAgICA/IHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uXG4gICAgICAgICAgICA6IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpLnByZVNlbGVjdGlvbixcbiAgICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUsXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgIGZvY3VzZWQ6IHNraXBTZXRCbHVyID8gcHJldi5mb2N1c2VkIDogZmFsc2UsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgIXNraXBTZXRCbHVyICYmIHRoaXMuc2V0Qmx1cigpO1xuXG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG4gIGlucHV0T2sgPSAoKSA9PiBpc0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuXG4gIGlzQ2FsZW5kYXJPcGVuID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW4gPT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLnN0YXRlLm9wZW4gJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHlcbiAgICAgIDogdGhpcy5wcm9wcy5vcGVuO1xuXG4gIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnByZXZlbnRGb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXMgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTtcbiAgfTtcblxuICBzZW5kRm9jdXNCYWNrVG9JbnB1dCA9ICgpID0+IHtcbiAgICAvLyBDbGVhciBwcmV2aW91cyB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgdGhlIHBvcHBlciBhbmQgcmVmb2N1cyB0aGUgaW5wdXRcbiAgICAvLyBzdG9wIHRoZSBpbnB1dCBmcm9tIGF1dG8gb3BlbmluZyBvbkZvY3VzXG4gICAgLy8gc2V0Rm9jdXMgdG8gdGhlIGlucHV0XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogdHJ1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNhbmNlbEZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9O1xuXG4gIGRlZmVyRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldEZvY3VzKCksIDEpO1xuICB9O1xuXG4gIGhhbmRsZURyb3Bkb3duRm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgaGFuZGxlQmx1ciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5vcGVuIHx8IHRoaXMucHJvcHMud2l0aFBvcnRhbCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAoLi4uYWxsQXJncykgPT4ge1xuICAgIGxldCBldmVudCA9IGFsbEFyZ3NbMF07XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcuYXBwbHkodGhpcywgYWxsQXJncyk7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnB1dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCxcbiAgICB9KTtcbiAgICBsZXQgZGF0ZSA9IHBhcnNlRGF0ZShcbiAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5zdHJpY3RQYXJzaW5nLFxuICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICk7XG4gICAgLy8gVXNlIGRhdGUgZnJvbSBgc2VsZWN0ZWRgIHByb3Agd2hlbiBtYW5pcHVsYXRpbmcgb25seSB0aW1lIGZvciBpbnB1dCB2YWx1ZVxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICBkYXRlICYmXG4gICAgICAhaXNTYW1lRGF5KGRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICBkYXRlID0gc2V0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHtcbiAgICAgICAgaG91cnM6IGdldEhvdXJzKGRhdGUpLFxuICAgICAgICBtaW51dGVzOiBnZXRNaW51dGVzKGRhdGUpLFxuICAgICAgICBzZWNvbmRzOiBnZXRTZWNvbmRzKGRhdGUpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRlIHx8ICFldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3QgPSAoZGF0ZSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIC8vIFByZXZlbnRpbmcgb25Gb2N1cyBldmVudCB0byBmaXggaXNzdWVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvaXNzdWVzLzYyOFxuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdyhldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIGZhbHNlLCBtb250aFNlbGVjdGVkSW4pO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmICFpc0RhdGVCZWZvcmUoZGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBzZXRTZWxlY3RlZCA9IChkYXRlLCBldmVudCwga2VlcElucHV0LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSBkYXRlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZERhdGUgIT09IG51bGwgJiZcbiAgICAgICAgaXNZZWFyRGlzYWJsZWQoZ2V0WWVhcihjaGFuZ2VkRGF0ZSksIHRoaXMucHJvcHMpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNNb250aERpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc0RheURpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0c011bHRpcGxlLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICAgIG1pblRpbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhaXNFcXVhbCh0aGlzLnByb3BzLnNlbGVjdGVkLCBjaGFuZ2VkRGF0ZSkgfHxcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dTYW1lRGF5IHx8XG4gICAgICBzZWxlY3RzUmFuZ2UgfHxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZVxuICAgICkge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICAgICAgKCFrZWVwSW5wdXQgfHxcbiAgICAgICAgICAgICghdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgaG91cjogZ2V0SG91cnModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBzZWNvbmQ6IGdldFNlY29uZHModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBtaW5UaW1lIGlzIHByZXNlbnQgdGhlbiBzZXQgdGhlIHRpbWUgdG8gbWluVGltZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWtlZXBJbnB1dCAmJlxuICAgICAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobWluVGltZSkge1xuICAgICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICAgIGhvdXI6IG1pblRpbWUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgbWludXRlOiBtaW5UaW1lLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgc2Vjb25kOiBtaW5UaW1lLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmZvY3VzU2VsZWN0ZWRNb250aCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IG1vbnRoU2VsZWN0ZWRJbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdHNSYW5nZSkge1xuICAgICAgICBjb25zdCBub1JhbmdlcyA9ICFzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0UmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGlzUmFuZ2VGaWxsZWQgPSBzdGFydERhdGUgJiYgZW5kRGF0ZTtcbiAgICAgICAgaWYgKG5vUmFuZ2VzKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlZERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlQmVmb3JlKGNoYW5nZWREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtzdGFydERhdGUsIGNoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSYW5nZUZpbGxlZCkge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKCFzZWxlY3RlZERhdGVzPy5sZW5ndGgpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZXMuc29tZShcbiAgICAgICAgICAgIChzZWxlY3RlZERhdGUpID0+IGlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHREYXRlcyA9IHNlbGVjdGVkRGF0ZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiAhaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgY2hhbmdlZERhdGUpLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgb25DaGFuZ2UobmV4dERhdGVzLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5zZWxlY3RlZERhdGVzLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uQ2hhbmdlKGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFrZWVwSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoY2hhbmdlZERhdGUsIGV2ZW50KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBXaGVuIGNoZWNraW5nIHByZVNlbGVjdGlvbiB2aWEgbWluL21heERhdGUsIHRpbWVzIG5lZWQgdG8gYmUgbWFuaXB1bGF0ZWQgdmlhIHN0YXJ0T2ZEYXkvZW5kT2ZEYXlcbiAgc2V0UHJlU2VsZWN0aW9uID0gKGRhdGUpID0+IHtcbiAgICBjb25zdCBoYXNNaW5EYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWluRGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBjb25zdCBoYXNNYXhEYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWF4RGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBsZXQgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSB0cnVlO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGF0ZSk7XG4gICAgICBpZiAoaGFzTWluRGF0ZSAmJiBoYXNNYXhEYXRlKSB7XG4gICAgICAgIC8vIGlzRGF5SW5SYW5nZSB1c2VzIHN0YXJ0T2ZEYXkgaW50ZXJuYWxseSwgc28gbm90IG5lY2Vzc2FyeSB0byBtYW5pcHVsYXRlIHRpbWVzIGhlcmVcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSBpc0RheUluUmFuZ2UoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChoYXNNaW5EYXRlKSB7XG4gICAgICAgIGNvbnN0IG1pbkRhdGVTdGFydE9mRGF5ID0gc3RhcnRPZkRheSh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9XG4gICAgICAgICAgaXNBZnRlcihkYXRlLCBtaW5EYXRlU3RhcnRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtaW5EYXRlU3RhcnRPZkRheSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc01heERhdGUpIHtcbiAgICAgICAgY29uc3QgbWF4RGF0ZUVuZE9mRGF5ID0gZW5kT2ZEYXkodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQmVmb3JlKGRhdGUsIG1heERhdGVFbmRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtYXhEYXRlRW5kT2ZEYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNWYWxpZERhdGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwcmVTZWxlY3Rpb246IGRhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRPcGVuKCF0aGlzLnN0YXRlLm9wZW4pO1xuICB9O1xuXG4gIGhhbmRsZVRpbWVDaGFuZ2UgPSAodGltZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA6IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgbGV0IGNoYW5nZWREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aW1lXG4gICAgICA6IHNldFRpbWUoc2VsZWN0ZWQsIHtcbiAgICAgICAgICBob3VyOiBnZXRIb3Vycyh0aW1lKSxcbiAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGltZSksXG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVTZWxlY3Rpb246IGNoYW5nZWREYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgfTtcblxuICBvbklucHV0Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbklucHV0Q2xpY2soKTtcbiAgfTtcblxuICBvbklucHV0S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLnN0YXRlLm9wZW4gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXRoaXMucHJvcHMucHJldmVudE9wZW5PbkZvY3VzXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8XG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93VXBcIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJFbnRlclwiXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5vbklucHV0Q2xpY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBjYWxlbmRhciBpcyBvcGVuLCB0aGVzZSBrZXlzIHdpbGwgZm9jdXMgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICBpZiAodGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnRLZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yU3RyaW5nID1cbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmIHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzXG4gICAgICAgICAgICA/ICcucmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXJbdGFiaW5kZXg9XCIwXCJdJ1xuICAgICAgICAgICAgOiAnLnJlYWN0LWRhdGVwaWNrZXJfX2RheVt0YWJpbmRleD1cIjBcIl0nO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPVxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZSAmJlxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yU3RyaW5nKTtcbiAgICAgICAgc2VsZWN0ZWRJdGVtICYmIHNlbGVjdGVkSXRlbS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5pbnB1dE9rKCkgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLmxhc3RQcmVTZWxlY3RDaGFuZ2UgPT09IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJUYWJcIikge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25Qb3J0YWxLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHByZXZlbnRGb2N1czogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtleURvd24gZXZlbnRzIHBhc3NlZCBkb3duIHRvIGRheS5qc3hcbiAgb25EYXlLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzU2hpZnRLZXlBY3RpdmUgPSBldmVudC5zaGlmdEtleTtcblxuICAgIGNvbnN0IGNvcHkgPSBuZXdEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgdGhpcy5zZXRQcmVTZWxlY3Rpb24oY29weSk7XG4gICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIGlmICghdGhpcy5pbnB1dE9rKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGxldCBuZXdTZWxlY3Rpb247XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YkRheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkRGF5cyhjb3B5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGlzU2hpZnRLZXlBY3RpdmVcbiAgICAgICAgICAgID8gc3ViWWVhcnMoY29weSwgMSlcbiAgICAgICAgICAgIDogc3ViTW9udGhzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUGFnZURvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IGFkZFllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IGFkZE1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkhvbWVcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgICAgIGNvcHksXG4gICAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiRW5kXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0RW5kT2ZXZWVrKGNvcHkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoIW5ld1NlbGVjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0RXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSB9KTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkKG5ld1NlbGVjdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbihuZXdTZWxlY3Rpb24pO1xuICAgICAgLy8gbmVlZCB0byBmaWd1cmUgb3V0IHdoZXRoZXIgbW9udGggaGFzIGNoYW5nZWQgdG8gZm9jdXMgZGF5IGluIGlubGluZSB2ZXJzaW9uXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgY29uc3QgcHJldk1vbnRoID0gZ2V0TW9udGgoY29weSk7XG4gICAgICAgIGNvbnN0IG5ld01vbnRoID0gZ2V0TW9udGgobmV3U2VsZWN0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldlllYXIgPSBnZXRZZWFyKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdZZWFyID0gZ2V0WWVhcihuZXdTZWxlY3Rpb24pO1xuXG4gICAgICAgIGlmIChwcmV2TW9udGggIT09IG5ld01vbnRoIHx8IHByZXZZZWFyICE9PSBuZXdZZWFyKSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzIGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzbid0IGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGhhbmRsZSBnZW5lcmljIGtleSBkb3duIGV2ZW50cyBpbiB0aGUgcG9wcGVyIHRoYXQgZG8gbm90IGFkanVzdCBvciBzZWxlY3QgZGF0ZXNcbiAgLy8gZXg6IHdoaWxlIGZvY3VzaW5nIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9uc1xuICBvblBvcHBlcktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2xlYXJDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG51bGwsIGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgY2xlYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5vbkNsZWFyQ2xpY2soKTtcbiAgfTtcblxuICBvblNjcm9sbCA9IChldmVudCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiYm9vbGVhblwiICYmXG4gICAgICB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGxcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsKGV2ZW50KSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZW5kZXJDYWxlbmRhciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLmlzQ2FsZW5kYXJPcGVuKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFdyYXBwZWRDYWxlbmRhclxuICAgICAgICByZWY9eyhlbGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsZW07XG4gICAgICAgIH19XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgbW9udGhBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIHNldE9wZW49e3RoaXMuc2V0T3Blbn1cbiAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXRDYWxlbmRhcn1cbiAgICAgICAgdXNlV2Vla2RheXNTaG9ydD17dGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0fVxuICAgICAgICBmb3JtYXRXZWVrRGF5PXt0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXl9XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMuc3RhdGUucHJlU2VsZWN0aW9ufVxuICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlPXt0aGlzLmhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlfVxuICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnN0YXRlLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICBob2xpZGF5cz17Z2V0SG9saWRheXNNYXAodGhpcy5tb2RpZnlIb2xpZGF5cygpKX1cbiAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5zdGF0ZS5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgc2hvd1ByZXZpb3VzTW9udGhzPXt0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc31cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAgIHNob3dNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHRvZGF5QnV0dG9uPXt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgICB3ZWVrTGFiZWw9e3RoaXMucHJvcHMud2Vla0xhYmVsfVxuICAgICAgICBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcz17b3V0c2lkZUNsaWNrSWdub3JlQ2xhc3N9XG4gICAgICAgIGZpeGVkSGVpZ2h0PXt0aGlzLnByb3BzLmZpeGVkSGVpZ2h0fVxuICAgICAgICBtb250aHNTaG93bj17dGhpcy5wcm9wcy5tb250aHNTaG93bn1cbiAgICAgICAgbW9udGhTZWxlY3RlZEluPXt0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbn1cbiAgICAgICAgb25Ecm9wZG93bkZvY3VzPXt0aGlzLmhhbmRsZURyb3Bkb3duRm9jdXN9XG4gICAgICAgIG9uTW9udGhDaGFuZ2U9e3RoaXMucHJvcHMub25Nb250aENoYW5nZX1cbiAgICAgICAgb25ZZWFyQ2hhbmdlPXt0aGlzLnByb3BzLm9uWWVhckNoYW5nZX1cbiAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgd2Vla0RheUNsYXNzTmFtZT17dGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lfVxuICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICBzaG93RGF0ZVNlbGVjdD17dGhpcy5wcm9wcy5zaG93RGF0ZVNlbGVjdH1cbiAgICAgICAgc2hvd1RpbWVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIG9uVGltZUNoYW5nZT17dGhpcy5oYW5kbGVUaW1lQ2hhbmdlfVxuICAgICAgICB0aW1lRm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9XG4gICAgICAgIHRpbWVJbnRlcnZhbHM9e3RoaXMucHJvcHMudGltZUludGVydmFsc31cbiAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgIGV4Y2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5leGNsdWRlVGltZXN9XG4gICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jYWxlbmRhckNsYXNzTmFtZX1cbiAgICAgICAgY29udGFpbmVyPXt0aGlzLnByb3BzLmNhbGVuZGFyQ29udGFpbmVyfVxuICAgICAgICB5ZWFySXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzTW9udGhBcmlhTGFiZWx9XG4gICAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhBcmlhTGFiZWx9XG4gICAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c1llYXJCdXR0b25MYWJlbH1cbiAgICAgICAgbmV4dFllYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJBcmlhTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbH1cbiAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICByZW5kZXJDdXN0b21IZWFkZXI9e3RoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyfVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgIHJlbmRlck1vbnRoQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJNb250aENvbnRlbnR9XG4gICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcn1cbiAgICAgICAgb25Nb250aE1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmV9XG4gICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcn1cbiAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlfVxuICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgc2hvd1RpbWVJbnB1dD17dGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICBzaG93TW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI9e3RoaXMucHJvcHMuZXhjbHVkZVNjcm9sbGJhcn1cbiAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLm9uS2V5RG93bn1cbiAgICAgICAgaGFuZGxlT25EYXlLZXlEb3duPXt0aGlzLm9uRGF5S2V5RG93bn1cbiAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMuc3RhdGUuZm9jdXNlZH1cbiAgICAgICAgY3VzdG9tVGltZUlucHV0PXt0aGlzLnByb3BzLmN1c3RvbVRpbWVJbnB1dH1cbiAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L1dyYXBwZWRDYWxlbmRhcj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzQ29udGFpbnNUaW1lID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0O1xuICAgIGNvbnN0IGxvbmdEYXRlRm9ybWF0ID0gaXNDb250YWluc1RpbWUgPyBcIlBQUFBwXCIgOiBcIlBQUFBcIjtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgc3RhcnQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgIH0sXG4gICAgICApfS4gJHtcbiAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyBcIkVuZCBkYXRlOiBcIiArXG4gICAgICAgICAgICBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLmVuZERhdGUsIHtcbiAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB0aW1lOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB5ZWFyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcInl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBtb250aDogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJNTU1NIHl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHF1YXJ0ZXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBcInl5eXksIFFRUVwiLFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7YXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzbmFtZXModGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgIFtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc106IHRoaXMuc3RhdGUub3BlbixcbiAgICB9KTtcblxuICAgIGNvbnN0IGN1c3RvbUlucHV0ID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dCB8fCA8aW5wdXQgdHlwZT1cInRleHRcIiAvPjtcbiAgICBjb25zdCBjdXN0b21JbnB1dFJlZiA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXRSZWYgfHwgXCJyZWZcIjtcbiAgICBjb25zdCBpbnB1dFZhbHVlID1cbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICA6IHR5cGVvZiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICA/IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICAgID8gc2FmZURhdGVSYW5nZUZvcm1hdChcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgICAgICAgICA/IHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcywgdGhpcy5wcm9wcylcbiAgICAgICAgICAgICAgOiBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzKTtcblxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tSW5wdXQsIHtcbiAgICAgIFtjdXN0b21JbnB1dFJlZl06IChpbnB1dCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICB9LFxuICAgICAgdmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1cixcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25JbnB1dENsaWNrLFxuICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgZm9ybTogdGhpcy5wcm9wcy5mb3JtLFxuICAgICAgYXV0b0ZvY3VzOiB0aGlzLnByb3BzLmF1dG9Gb2N1cyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyVGV4dCxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgYXV0b0NvbXBsZXRlOiB0aGlzLnByb3BzLmF1dG9Db21wbGV0ZSxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcyhjdXN0b21JbnB1dC5wcm9wcy5jbGFzc05hbWUsIGNsYXNzTmFtZSksXG4gICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucHJvcHMucmVxdWlyZWQsXG4gICAgICB0YWJJbmRleDogdGhpcy5wcm9wcy50YWJJbmRleCxcbiAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiB0aGlzLnByb3BzLmFyaWFEZXNjcmliZWRCeSxcbiAgICAgIFwiYXJpYS1pbnZhbGlkXCI6IHRoaXMucHJvcHMuYXJpYUludmFsaWQsXG4gICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aGlzLnByb3BzLmFyaWFMYWJlbGxlZEJ5LFxuICAgICAgXCJhcmlhLXJlcXVpcmVkXCI6IHRoaXMucHJvcHMuYXJpYVJlcXVpcmVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlckNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ2xlYXJhYmxlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBjbGVhckJ1dHRvblRpdGxlLFxuICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUgPSBcIlwiLFxuICAgICAgYXJpYUxhYmVsQ2xvc2UgPSBcIkNsb3NlXCIsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChcbiAgICAgIGlzQ2xlYXJhYmxlICYmXG4gICAgICAoc2VsZWN0ZWQgIT0gbnVsbCB8fFxuICAgICAgICBzdGFydERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBlbmREYXRlICE9IG51bGwgfHxcbiAgICAgICAgc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvblwiLFxuICAgICAgICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUsXG4gICAgICAgICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvbi0tZGlzYWJsZWRcIjogZGlzYWJsZWQgfSxcbiAgICAgICAgICApfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWxDbG9zZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xlYXJDbGlja31cbiAgICAgICAgICB0aXRsZT17Y2xlYXJCdXR0b25UaXRsZX1cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRDb250YWluZXIoKSB7XG4gICAgY29uc3QgeyBzaG93SWNvbiwgaWNvbiwgY2FsZW5kYXJJY29uQ2xhc3NuYW1lLCB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9wZW4gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19pbnB1dC1jb250YWluZXIke1xuICAgICAgICAgIHNob3dJY29uID8gXCIgcmVhY3QtZGF0ZXBpY2tlcl9fdmlldy1jYWxlbmRhci1pY29uXCIgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICB7c2hvd0ljb24gJiYgKFxuICAgICAgICAgIDxDYWxlbmRhckljb25cbiAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake2NhbGVuZGFySWNvbkNsYXNzbmFtZX0gJHtcbiAgICAgICAgICAgICAgb3BlbiAmJiBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgey4uLih0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy50b2dnbGVDYWxlbmRhcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgdGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJEYXRlSW5wdXQoKX1cbiAgICAgICAge3RoaXMucmVuZGVyQ2xlYXJCdXR0b24oKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2FsZW5kYXIgPSB0aGlzLnJlbmRlckNhbGVuZGFyKCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHJldHVybiBjYWxlbmRhcjtcblxuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGxldCBwb3J0YWxDb250YWluZXIgPSB0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcG9ydGFsXCJcbiAgICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblBvcnRhbEtleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NhbGVuZGFyfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApIDogbnVsbDtcblxuICAgICAgaWYgKHRoaXMuc3RhdGUub3BlbiAmJiB0aGlzLnByb3BzLnBvcnRhbElkKSB7XG4gICAgICAgIHBvcnRhbENvbnRhaW5lciA9IChcbiAgICAgICAgICA8UG9ydGFsXG4gICAgICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICAgIDwvUG9ydGFsPlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wcGVyQ29tcG9uZW50XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wb3BwZXJDbGFzc05hbWV9XG4gICAgICAgIHdyYXBwZXJDbGFzc05hbWU9e3RoaXMucHJvcHMud3JhcHBlckNsYXNzTmFtZX1cbiAgICAgICAgaGlkZVBvcHBlcj17IXRoaXMuaXNDYWxlbmRhck9wZW4oKX1cbiAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgcG9wcGVyTW9kaWZpZXJzPXt0aGlzLnByb3BzLnBvcHBlck1vZGlmaWVyc31cbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50PXt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgIHBvcHBlckNvbnRhaW5lcj17dGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXJ9XG4gICAgICAgIHBvcHBlckNvbXBvbmVudD17Y2FsZW5kYXJ9XG4gICAgICAgIHBvcHBlclBsYWNlbWVudD17dGhpcy5wcm9wcy5wb3BwZXJQbGFjZW1lbnR9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICBwb3BwZXJPbktleURvd249e3RoaXMub25Qb3BwZXJLZXlEb3dufVxuICAgICAgICBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9XG4gICAgICAgIHNob3dBcnJvdz17dGhpcy5wcm9wcy5zaG93UG9wcGVyQXJyb3d9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQgPSBcImlucHV0XCI7XG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSA9IFwibmF2aWdhdGVcIjtcbiJdLCJuYW1lcyI6WyJERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIiLCJsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsIm5ld0RhdGUiLCJ2YWx1ZSIsImQiLCJTdHJpbmciLCJwYXJzZUlTTyIsInRvRGF0ZSIsIkRhdGUiLCJpc1ZhbGlkIiwicGFyc2VEYXRlIiwiZGF0ZUZvcm1hdCIsImxvY2FsZSIsInN0cmljdFBhcnNpbmciLCJtaW5EYXRlIiwicGFyc2VkRGF0ZSIsImxvY2FsZU9iamVjdCIsImdldExvY2FsZU9iamVjdCIsImdldERlZmF1bHRMb2NhbGUiLCJzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJkZiIsInRyeVBhcnNlRGF0ZSIsInBhcnNlIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwidXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyIsImZvcm1hdERhdGUiLCJtYXRjaCIsIm1hcCIsInN1YnN0cmluZyIsImZpcnN0Q2hhcmFjdGVyIiwibG9uZ0Zvcm1hdHRlciIsImxvbmdGb3JtYXR0ZXJzIiwiZm9ybWF0TG9uZyIsImpvaW4iLCJsZW5ndGgiLCJzbGljZSIsImRhdGUiLCJpc1ZhbGlkRGF0ZSIsImlzQmVmb3JlIiwiZm9ybWF0U3RyIiwiZm9ybWF0IiwibG9jYWxlT2JqIiwiY29uc29sZSIsIndhcm4iLCJjb25jYXQiLCJzYWZlRGF0ZUZvcm1hdCIsIl9yZWYiLCJzYWZlRGF0ZVJhbmdlRm9ybWF0Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInByb3BzIiwiZm9ybWF0dGVkU3RhcnREYXRlIiwiZm9ybWF0dGVkRW5kRGF0ZSIsInNhZmVNdWx0aXBsZURhdGVzRm9ybWF0IiwiZGF0ZXMiLCJmb3JtYXR0ZWRGaXJzdERhdGUiLCJmb3JtYXR0ZWRTZWNvbmREYXRlIiwiZXh0cmFEYXRlc0NvdW50Iiwic2V0VGltZSIsIl9yZWYyIiwiX3JlZjIkaG91ciIsImhvdXIiLCJfcmVmMiRtaW51dGUiLCJtaW51dGUiLCJfcmVmMiRzZWNvbmQiLCJzZWNvbmQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwiZ2V0V2VlayIsImdldElTT1dlZWsiLCJnZXREYXlPZldlZWtDb2RlIiwiZGF5IiwiZ2V0U3RhcnRPZkRheSIsInN0YXJ0T2ZEYXkiLCJnZXRTdGFydE9mV2VlayIsImNhbGVuZGFyU3RhcnREYXkiLCJzdGFydE9mV2VlayIsIndlZWtTdGFydHNPbiIsImdldFN0YXJ0T2ZNb250aCIsInN0YXJ0T2ZNb250aCIsImdldFN0YXJ0T2ZZZWFyIiwic3RhcnRPZlllYXIiLCJnZXRTdGFydE9mUXVhcnRlciIsInN0YXJ0T2ZRdWFydGVyIiwiZ2V0U3RhcnRPZlRvZGF5IiwiZ2V0RW5kT2ZXZWVrIiwiZW5kT2ZXZWVrIiwiaXNTYW1lWWVhciIsImRhdGUxIiwiZGF0ZTIiLCJkZklzU2FtZVllYXIiLCJpc1NhbWVNb250aCIsImRmSXNTYW1lTW9udGgiLCJpc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVRdWFydGVyIiwiaXNTYW1lRGF5IiwiZGZJc1NhbWVEYXkiLCJpc0VxdWFsIiwiZGZJc0VxdWFsIiwiaXNEYXlJblJhbmdlIiwidmFsaWQiLCJzdGFydCIsImVuZCIsImVuZE9mRGF5IiwiaXNXaXRoaW5JbnRlcnZhbCIsImVyciIsInJlZ2lzdGVyTG9jYWxlIiwibG9jYWxlTmFtZSIsImxvY2FsZURhdGEiLCJzY29wZSIsIndpbmRvdyIsImdsb2JhbFRoaXMiLCJfX2xvY2FsZURhdGFfXyIsInNldERlZmF1bHRMb2NhbGUiLCJfX2xvY2FsZUlkX18iLCJsb2NhbGVTcGVjIiwiZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlIiwiZm9ybWF0RnVuYyIsImdldFdlZWtkYXlNaW5JbkxvY2FsZSIsImdldFdlZWtkYXlTaG9ydEluTG9jYWxlIiwiZ2V0TW9udGhJbkxvY2FsZSIsIm1vbnRoIiwic2V0TW9udGgiLCJnZXRNb250aFNob3J0SW5Mb2NhbGUiLCJnZXRRdWFydGVyU2hvcnRJbkxvY2FsZSIsInF1YXJ0ZXIiLCJzZXRRdWFydGVyIiwiaXNEYXlEaXNhYmxlZCIsIl9yZWYzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwibWF4RGF0ZSIsImV4Y2x1ZGVEYXRlcyIsImV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIiwiaW5jbHVkZURhdGVzIiwiaW5jbHVkZURhdGVJbnRlcnZhbHMiLCJmaWx0ZXJEYXRlIiwiaXNPdXRPZkJvdW5kcyIsInNvbWUiLCJleGNsdWRlRGF0ZSIsIl9yZWY0IiwiaW5jbHVkZURhdGUiLCJfcmVmNSIsImlzRGF5RXhjbHVkZWQiLCJfcmVmNiIsIl9yZWY3IiwiaXNNb250aERpc2FibGVkIiwiX3JlZjgiLCJlbmRPZk1vbnRoIiwiaXNNb250aEluUmFuZ2UiLCJtIiwic3RhcnREYXRlWWVhciIsImdldFllYXIiLCJzdGFydERhdGVNb250aCIsImdldE1vbnRoIiwiZW5kRGF0ZVllYXIiLCJlbmREYXRlTW9udGgiLCJkYXlZZWFyIiwiaXNRdWFydGVyRGlzYWJsZWQiLCJfcmVmOSIsImlzWWVhckluUmFuZ2UiLCJ5ZWFyIiwic3RhcnRZZWFyIiwiZW5kWWVhciIsImlzWWVhckRpc2FibGVkIiwiX3JlZjEwIiwiZW5kT2ZZZWFyIiwiaXNRdWFydGVySW5SYW5nZSIsInEiLCJzdGFydERhdGVRdWFydGVyIiwiZ2V0UXVhcnRlciIsImVuZERhdGVRdWFydGVyIiwiX3JlZjExIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiaXNUaW1lSW5MaXN0IiwidGltZSIsInRpbWVzIiwibGlzdFRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJpc1RpbWVEaXNhYmxlZCIsIl9yZWYxMiIsImV4Y2x1ZGVUaW1lcyIsImluY2x1ZGVUaW1lcyIsImZpbHRlclRpbWUiLCJpc1RpbWVJbkRpc2FibGVkUmFuZ2UiLCJfcmVmMTMiLCJtaW5UaW1lIiwibWF4VGltZSIsIkVycm9yIiwiYmFzZSIsImJhc2VUaW1lIiwibWluIiwibWF4IiwibW9udGhEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNCIsInByZXZpb3VzTW9udGgiLCJzdWJNb250aHMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyIsImV2ZXJ5IiwibW9udGhEaXNhYmxlZEFmdGVyIiwiX3JlZjE1IiwibmV4dE1vbnRoIiwiYWRkTW9udGhzIiwieWVhckRpc2FibGVkQmVmb3JlIiwiX3JlZjE2IiwicHJldmlvdXNZZWFyIiwic3ViWWVhcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIiwieWVhcnNEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNyIsIl9yZWYxNyR5ZWFySXRlbU51bWJlciIsInllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kIiwiZ2V0WWVhcnNQZXJpb2QiLCJlbmRQZXJpb2QiLCJtaW5EYXRlWWVhciIsInllYXJEaXNhYmxlZEFmdGVyIiwiX3JlZjE4IiwibmV4dFllYXIiLCJhZGRZZWFycyIsInllYXJzRGlzYWJsZWRBZnRlciIsIl9yZWYxOSIsIl9yZWYxOSR5ZWFySXRlbU51bWJlciIsIl9nZXRZZWFyc1BlcmlvZDIiLCJzdGFydFBlcmlvZCIsIm1heERhdGVZZWFyIiwiZ2V0RWZmZWN0aXZlTWluRGF0ZSIsIl9yZWYyMCIsIm1pbkRhdGVzIiwiZmlsdGVyIiwiZ2V0RWZmZWN0aXZlTWF4RGF0ZSIsIl9yZWYyMSIsIm1heERhdGVzIiwiZ2V0SGlnaHRMaWdodERheXNNYXAiLCJoaWdobGlnaHREYXRlcyIsImRlZmF1bHRDbGFzc05hbWUiLCJkYXRlQ2xhc3NlcyIsIk1hcCIsImkiLCJsZW4iLCJvYmoiLCJpc0RhdGUiLCJrZXkiLCJjbGFzc05hbWVzQXJyIiwiZ2V0IiwiaW5jbHVkZXMiLCJwdXNoIiwic2V0IiwiX3R5cGVvZiIsImtleXMiLCJPYmplY3QiLCJjbGFzc05hbWUiLCJhcnJPZkRhdGVzIiwiY29uc3RydWN0b3IiLCJrIiwiYXJyYXlzQXJlRXF1YWwiLCJhcnJheTEiLCJhcnJheTIiLCJpbmRleCIsImdldEhvbGlkYXlzTWFwIiwiaG9saWRheURhdGVzIiwiaG9saWRheSIsImRhdGVPYmoiLCJob2xpZGF5TmFtZSIsImNsYXNzTmFtZXNPYmoiLCJob2xpZGF5TmFtZUFyciIsIl90b0NvbnN1bWFibGVBcnJheSIsInRpbWVzVG9JbmplY3RBZnRlciIsImN1cnJlbnRUaW1lIiwiY3VycmVudE11bHRpcGxpZXIiLCJpbnRlcnZhbHMiLCJpbmplY3RlZFRpbWVzIiwibCIsImluamVjdGVkVGltZSIsImFkZE1pbnV0ZXMiLCJhZGRIb3VycyIsIm5leHRUaW1lIiwiaXNBZnRlciIsImFkZFplcm8iLCJNYXRoIiwiY2VpbCIsImdldEhvdXJzSW5EYXkiLCJnZXRGdWxsWWVhciIsImdldERhdGUiLCJzdGFydE9mVGhlTmV4dERheSIsInJvdW5kIiwic3RhcnRPZk1pbnV0ZSIsInNlY29uZHMiLCJnZXRTZWNvbmRzIiwibWlsbGlzZWNvbmRzIiwiZ2V0TWlsbGlzZWNvbmRzIiwiZ2V0VGltZSIsImlzU2FtZU1pbnV0ZSIsImQxIiwiZDIiLCJnZXRNaWRuaWdodERhdGUiLCJkYXRlV2l0aG91dFRpbWUiLCJpc0RhdGVCZWZvcmUiLCJkYXRlVG9Db21wYXJlIiwibWlkbmlnaHREYXRlIiwibWlkbmlnaHREYXRlVG9Db21wYXJlIiwiaXNTcGFjZUtleURvd24iLCJldmVudCIsIlNQQUNFX0tFWSIsImdlbmVyYXRlWWVhcnMiLCJub09mWWVhciIsImxpc3QiLCJuZXdZZWFyIiwiaXNJblJhbmdlIiwiWWVhckRyb3Bkb3duT3B0aW9ucyIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9jYWxsU3VwZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJzZWxlY3RlZFllYXIiLCJvcHRpb25zIiwic3RhdGUiLCJ5ZWFyc0xpc3QiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJvbkNsaWNrIiwib25DaGFuZ2UiLCJiaW5kIiwibWluWWVhciIsIm1heFllYXIiLCJmaW5kIiwidW5zaGlmdCIsImluY3JlbWVudFllYXJzIiwiZGVjcmVtZW50WWVhcnMiLCJvbkNhbmNlbCIsImFtb3VudCIsInllYXJzIiwic2V0U3RhdGUiLCJzaGlmdFllYXJzIiwieWVhckRyb3Bkb3duSXRlbU51bWJlciIsInNjcm9sbGFibGVZZWFyRHJvcGRvd24iLCJkcm9wZG93blJlZiIsImNyZWF0ZVJlZiIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImNvbXBvbmVudERpZE1vdW50IiwiZHJvcGRvd25DdXJyZW50IiwiY3VycmVudCIsImRyb3Bkb3duQ3VycmVudENoaWxkcmVuIiwiY2hpbGRyZW4iLCJmcm9tIiwic2VsZWN0ZWRZZWFyT3B0aW9uRWwiLCJjaGlsZEVsIiwiYXJpYVNlbGVjdGVkIiwic2Nyb2xsVG9wIiwib2Zmc2V0VG9wIiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwicmVuZGVyIiwiZHJvcGRvd25DbGFzcyIsImNsYXNzTmFtZXMiLCJyZWYiLCJyZW5kZXJPcHRpb25zIiwiQ29tcG9uZW50IiwiV3JhcHBlZFllYXJEcm9wZG93bk9wdGlvbnMiLCJvbkNsaWNrT3V0c2lkZSIsIlllYXJEcm9wZG93biIsIl9sZW4iLCJhcmdzIiwiX2tleSIsImRyb3Bkb3duVmlzaWJsZSIsImUiLCJ0YXJnZXQiLCJvblNlbGVjdENoYW5nZSIsInJlbmRlclNlbGVjdE9wdGlvbnMiLCJ2aXNpYmxlIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwidG9nZ2xlRHJvcGRvd24iLCJyZXN1bHQiLCJyZW5kZXJSZWFkVmlldyIsInJlbmRlckRyb3Bkb3duIiwiYWRqdXN0RGF0ZU9uQ2hhbmdlIiwiaGFuZGxlWWVhckNoYW5nZSIsIm9uU2VsZWN0Iiwic2V0T3BlbiIsInJlbmRlcmVkRHJvcGRvd24iLCJkcm9wZG93bk1vZGUiLCJyZW5kZXJTY3JvbGxNb2RlIiwicmVuZGVyU2VsZWN0TW9kZSIsIk1vbnRoRHJvcGRvd25PcHRpb25zIiwibW9udGhOYW1lcyIsImlzU2VsZWN0ZWRNb250aCIsIldyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyIsIk1vbnRoRHJvcGRvd24iLCJNIiwiX3RoaXMyIiwidXNlU2hvcnRNb250aEluRHJvcGRvd24iLCJ1dGlscyIsImdlbmVyYXRlTW9udGhZZWFycyIsImN1cnJEYXRlIiwibGFzdERhdGUiLCJNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJtb250aFllYXJzTGlzdCIsIm1vbnRoWWVhciIsIm1vbnRoWWVhclBvaW50IiwiaXNTYW1lTW9udGhZZWFyIiwic2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duIiwiV3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIk1vbnRoWWVhckRyb3Bkb3duIiwidGltZVBvaW50IiwieWVhck1vbnRoIiwiY2hhbmdlZERhdGUiLCJwYXJzZUludCIsIkRheSIsImlzRGlzYWJsZWQiLCJvbk1vdXNlRW50ZXIiLCJldmVudEtleSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlT25LZXlEb3duIiwib3RoZXIiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQiLCJkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiIsImlzU2VsZWN0ZWREYXRlIiwic2VsZWN0c011bHRpcGxlIiwic2VsZWN0ZWREYXRlcyIsImlzU2FtZURheU9yV2VlayIsInNlbGVjdGVkIiwicHJlU2VsZWN0aW9uIiwic2hvd1dlZWtQaWNrZXIiLCJpc1NhbWVXZWVrIiwiX3RoaXMkcHJvcHMiLCJkYXlTdHIiLCJfdGhpcyRwcm9wczIiLCJob2xpZGF5cyIsImhhcyIsIl90aGlzJHByb3BzMyIsIl90aGlzJHByb3BzJHNlbGVjdGluZyIsIl90aGlzJHByb3BzNCIsInNlbGVjdHNTdGFydCIsInNlbGVjdHNFbmQiLCJzZWxlY3RzUmFuZ2UiLCJzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSIsInNlbGVjdGluZ0RhdGUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmcyIiwiaXNJblNlbGVjdGluZ1JhbmdlIiwiX3RoaXMkcHJvcHM1IiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMyIsIl90aGlzJHByb3BzNiIsIl90aGlzJHByb3BzNyIsIl90aGlzJHByb3BzOCIsIndlZWtkYXkiLCJnZXREYXkiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQyIiwiZGF5Q2xhc3NOYW1lIiwiY2xhc3NuYW1lcyIsImlzRXhjbHVkZWQiLCJpc1NlbGVjdGVkIiwiaXNLZXlib2FyZFNlbGVjdGVkIiwiaXNSYW5nZVN0YXJ0IiwiaXNSYW5nZUVuZCIsImlzU2VsZWN0aW5nUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nUmFuZ2VFbmQiLCJpc0N1cnJlbnREYXkiLCJpc1dlZWtlbmQiLCJpc0FmdGVyTW9udGgiLCJpc0JlZm9yZU1vbnRoIiwiZ2V0SGlnaExpZ2h0ZWRDbGFzcyIsImdldEhvbGlkYXlzQ2xhc3MiLCJfdGhpcyRwcm9wczkiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZCIsIl90aGlzJHByb3BzOSRhcmlhTGFiZTIiLCJhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQiLCJwcmVmaXgiLCJfdGhpcyRwcm9wczEwIiwiX3RoaXMkcHJvcHMxMCRob2xpZGF5IiwiY29tcGFyZUR0IiwidGl0bGVzIiwiYXBwbHkiLCJob2xpZGF5TmFtZXMiLCJtZXNzYWdlIiwic2VsZWN0ZWREYXkiLCJwcmVTZWxlY3Rpb25EYXkiLCJ0YWJJbmRleCIsInNob3dXZWVrTnVtYmVyIiwiaXNTdGFydE9mV2VlayIsIl90aGlzJGRheUVsJGN1cnJlbnQiLCJwcmV2UHJvcHMiLCJzaG91bGRGb2N1c0RheSIsImdldFRhYkluZGV4IiwiaXNJbnB1dEZvY3VzZWQiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJib2R5IiwiaW5saW5lIiwic2hvdWxkRm9jdXNEYXlJbmxpbmUiLCJjb250YWluZXJSZWYiLCJjb250YWlucyIsImNsYXNzTGlzdCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kIiwibW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCIsImRheUVsIiwiZm9jdXMiLCJwcmV2ZW50U2Nyb2xsIiwicmVuZGVyRGF5Q29udGVudHMiLCJnZXRDbGFzc05hbWVzIiwib25LZXlEb3duIiwiaGFuZGxlQ2xpY2siLCJ1c2VQb2ludGVyRXZlbnQiLCJoYW5kbGVNb3VzZUVudGVyIiwib25Qb2ludGVyRW50ZXIiLCJnZXRBcmlhTGFiZWwiLCJyb2xlIiwidGl0bGUiLCJnZXRUaXRsZSIsImhhbmRsZUZvY3VzRGF5IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiV2Vla051bWJlciIsInNob3VsZEZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXJFbCIsImhhbmRsZUZvY3VzV2Vla051bWJlciIsIndlZWtOdW1iZXIiLCJfdGhpcyRwcm9wcyRhcmlhTGFiZWwiLCJhcmlhTGFiZWxQcmVmaXgiLCJ3ZWVrTnVtYmVyQ2xhc3NlcyIsIldlZWsiLCJvbkRheUNsaWNrIiwib25EYXlNb3VzZUVudGVyIiwib25XZWVrU2VsZWN0IiwiaGFuZGxlRGF5Q2xpY2siLCJzaG91bGRDbG9zZU9uU2VsZWN0IiwiZm9ybWF0V2Vla051bWJlciIsImRheXMiLCJvbkNsaWNrQWN0aW9uIiwiaGFuZGxlV2Vla0NsaWNrIiwib2Zmc2V0IiwiYWRkRGF5cyIsImNob29zZURheUFyaWFMYWJlbFByZWZpeCIsImRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4IiwidmFsdWVPZiIsImhhbmRsZURheU1vdXNlRW50ZXIiLCJyZW5kZXJEYXlzIiwiRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQiLCJNT05USF9DT0xVTU5TX0xBWU9VVCIsIlRXT19DT0xVTU5TIiwiVEhSRUVfQ09MVU1OUyIsIkZPVVJfQ09MVU1OUyIsIk1PTlRIX0NPTFVNTlMiLCJncmlkIiwidmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0IiwiTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCIsImdldE1vbnRoQ29sdW1uc0xheW91dCIsInNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyIiwic2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlciIsIk1vbnRoIiwib3JkZXJJbkRpc3BsYXkiLCJvbk1vdXNlTGVhdmUiLCJpc0luU2VsZWN0aW5nUmFuZ2VNb250aCIsIl9tb250aCIsIl90aGlzJHByb3BzJHNlbGVjdGluZzQiLCJ3ZWVrcyIsImlzRml4ZWRIZWlnaHQiLCJmaXhlZEhlaWdodCIsImJyZWFrQWZ0ZXJOZXh0UHVzaCIsImN1cnJlbnRXZWVrU3RhcnQiLCJ3ZWVrQXJpYUxhYmVsUHJlZml4Iiwic2hvd1dlZWtOdW1iZXJzIiwiaXNGaXhlZEFuZEZpbmFsV2VlayIsImlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoIiwiaXNXZWVrSW5Nb250aCIsInBlZWtOZXh0TW9udGgiLCJsYWJlbERhdGUiLCJuZXdNb250aCIsInNldFByZVNlbGVjdGlvbiIsIk1PTlRIX1JFRlMiLCJoYW5kbGVPbk1vbnRoS2V5RG93biIsIm1vbnRoQ29sdW1uc0xheW91dCIsInZlcnRpY2FsT2Zmc2V0IiwibW9udGhzR3JpZCIsIm9uTW9udGhDbGljayIsImhhbmRsZU1vbnRoTmF2aWdhdGlvbiIsIm5ld1F1YXJ0ZXIiLCJRVUFSVEVSX1JFRlMiLCJvblF1YXJ0ZXJDbGljayIsImhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uIiwibW9udGhDbGFzc05hbWUiLCJfbW9udGhDbGFzc05hbWUiLCJpc1JhbmdlU3RhcnRNb250aCIsImlzUmFuZ2VFbmRNb250aCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0IiwiaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kIiwiaXNDdXJyZW50TW9udGgiLCJwcmVTZWxlY3RlZE1vbnRoIiwicHJlU2VsZWN0ZWRRdWFydGVyIiwiX3RoaXMkcHJvcHMxMSIsIl90aGlzJHByb3BzMTEkY2hvb3NlRCIsIl90aGlzJHByb3BzMTEkZGlzYWJsZSIsIl90aGlzJHByb3BzMTIiLCJpc1NlbGVjdGVkUXVhcnRlciIsImlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIiLCJpc1JhbmdlU3RhcnRRdWFydGVyIiwiaXNSYW5nZUVuZFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczEzIiwic2hvd0Z1bGxNb250aFllYXJQaWNrZXIiLCJyZW5kZXJNb250aENvbnRlbnQiLCJzaG9ydE1vbnRoVGV4dCIsImZ1bGxNb250aFRleHQiLCJfdGhpcyRwcm9wczE0IiwicmVuZGVyUXVhcnRlckNvbnRlbnQiLCJzaG9ydFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczE1IiwibW9udGhDb2x1bW5zIiwiaiIsImV2Iiwib25Nb250aEtleURvd24iLCJvbk1vbnRoTW91c2VFbnRlciIsImdldE1vbnRoQ2xhc3NOYW1lcyIsImdldE1vbnRoQ29udGVudCIsIl90aGlzJHByb3BzMTYiLCJxdWFydGVycyIsIm9uUXVhcnRlcktleURvd24iLCJvblF1YXJ0ZXJNb3VzZUVudGVyIiwiZ2V0UXVhcnRlckNsYXNzTmFtZXMiLCJnZXRRdWFydGVyVGFiSW5kZXgiLCJpc0N1cnJlbnRRdWFydGVyIiwiZ2V0UXVhcnRlckNvbnRlbnQiLCJfdGhpcyRwcm9wczE3Iiwic2hvd01vbnRoWWVhclBpY2tlciIsInNob3dRdWFydGVyWWVhclBpY2tlciIsIl90aGlzJHByb3BzMTgiLCJfdGhpcyRwcm9wczE4JGFyaWFMYWIiLCJmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXgiLCJ0cmltIiwiaGFuZGxlTW91c2VMZWF2ZSIsIm9uUG9pbnRlckxlYXZlIiwicmVuZGVyTW9udGhzIiwicmVuZGVyUXVhcnRlcnMiLCJyZW5kZXJXZWVrcyIsIlRpbWUiLCJoZWlnaHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjZW50ZXJMaSIsImNhbGNDZW50ZXJQb3NpdGlvbiIsIm1vbnRoUmVmIiwiaGVhZGVyIiwiY2xhc3NlcyIsInRpbWVDbGFzc05hbWUiLCJpc1NlbGVjdGVkVGltZSIsImlzRGlzYWJsZWRUaW1lIiwiaW5qZWN0VGltZXMiLCJwcmV2aW91c1NpYmxpbmciLCJuZXh0U2libGluZyIsImFjdGl2ZURhdGUiLCJvcGVuVG9EYXRlIiwic29ydGVkSW5qZWN0VGltZXMiLCJzb3J0IiwiYSIsImIiLCJtaW51dGVzSW5EYXkiLCJtdWx0aXBsaWVyIiwidGltZXNUb0luamVjdCIsInRpbWVUb0ZvY3VzIiwicmVkdWNlIiwicHJldiIsImxpQ2xhc3NlcyIsImxpIiwic2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUiLCJ0b2RheUJ1dHRvbiIsInNob3dUaW1lU2VsZWN0T25seSIsInRpbWVDYXB0aW9uIiwicmVuZGVyVGltZXMiLCJvblRpbWVDaGFuZ2UiLCJsaXN0SGVpZ2h0IiwiY2VudGVyTGlSZWYiLCJZZWFyIiwicmVmSW5kZXgiLCJ3YWl0Rm9yUmVSZW5kZXIiLCJZRUFSX1JFRlMiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QiLCJ1cGRhdGVGb2N1c09uUGFnaW5hdGUiLCJ5IiwiX3llYXIiLCJoYW5kbGVZZWFyQ2xpY2siLCJvblllYXJDbGljayIsImhhbmRsZVllYXJOYXZpZ2F0aW9uIiwiaXNDdXJyZW50WWVhciIsInByZVNlbGVjdGVkIiwicmVuZGVyWWVhckNvbnRlbnQiLCJvblllYXJNb3VzZUVudGVyIiwib25ZZWFyTW91c2VMZWF2ZSIsIl91dGlscyRnZXRZZWFyc1BlcmlvZDIiLCJfbG9vcCIsIm9uWWVhcktleURvd24iLCJnZXRZZWFyVGFiSW5kZXgiLCJnZXRZZWFyQ2xhc3NOYW1lcyIsImdldFllYXJDb250ZW50IiwiZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMiLCJjbGVhclNlbGVjdGluZ0RhdGUiLCJpbnB1dFRpbWUiLCJwcm9wRGF0ZSIsImlzUHJvcERhdGVWYWxpZCIsImlzTmFOIiwic3BsaXQiLCJ0aW1lU3RyaW5nIiwiY3VzdG9tVGltZUlucHV0IiwiY2xvbmVFbGVtZW50IiwidHlwZSIsInBsYWNlaG9sZGVyIiwibmFtZSIsInJlcXVpcmVkIiwidGltZUlucHV0TGFiZWwiLCJyZW5kZXJUaW1lSW5wdXQiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJDYWxlbmRhckNvbnRhaW5lciIsIl9yZWYkc2hvd1RpbWVTZWxlY3RPbiIsIl9yZWYkc2hvd1RpbWUiLCJzaG93VGltZSIsImFyaWFMYWJlbCIsIkRST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMiLCJpc0Ryb3Bkb3duU2VsZWN0IiwiZWxlbWVudCIsInRlc3RDbGFzc25hbWUiLCJpbmRleE9mIiwiQ2FsZW5kYXIiLCJvbkRyb3Bkb3duRm9jdXMiLCJpbml0aWFsRGF0ZSIsImhhbmRsZU1vbnRoQ2hhbmdlIiwibW9udGhTZWxlY3RlZEluIiwib25Nb250aE1vdXNlTGVhdmUiLCJzZXRZZWFyIiwib25ZZWFyQ2hhbmdlIiwiaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UiLCJoYW5kbGVDdXN0b21Nb250aENoYW5nZSIsIm9uTW9udGhDaGFuZ2UiLCJoYW5kbGVNb250aFllYXJDaGFuZ2UiLCJkYXlOYW1lcyIsIndlZWtMYWJlbCIsIndlZWtEYXlOYW1lIiwiZm9ybWF0V2Vla2RheSIsIndlZWtEYXlDbGFzc05hbWUiLCJmb3JtYXRXZWVrRGF5IiwidXNlV2Vla2RheXNTaG9ydCIsInNob3dZZWFyUGlja2VyIiwicmVuZGVyQ3VzdG9tSGVhZGVyIiwiYWxsUHJldkRheXNEaXNhYmxlZCIsImZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiIsInNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiIsImljb25DbGFzc2VzIiwiY2xpY2tIYW5kbGVyIiwiZGVjcmVhc2VNb250aCIsImRlY3JlYXNlWWVhciIsImlzRm9yWWVhciIsInByZXZpb3VzTW9udGhCdXR0b25MYWJlbCIsInByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIiwiX3RoaXMkcHJvcHMzJHByZXZpb3VzIiwicHJldmlvdXNNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91czIiLCJwcmV2aW91c1llYXJBcmlhTGFiZWwiLCJhbGxOZXh0RGF5c0Rpc2FibGVkIiwic2hvd1RpbWVTZWxlY3QiLCJpbmNyZWFzZU1vbnRoIiwiaW5jcmVhc2VZZWFyIiwibmV4dE1vbnRoQnV0dG9uTGFiZWwiLCJuZXh0WWVhckJ1dHRvbkxhYmVsIiwiX3RoaXMkcHJvcHM1JG5leHRNb250IiwibmV4dE1vbnRoQXJpYUxhYmVsIiwiX3RoaXMkcHJvcHM1JG5leHRZZWFyIiwibmV4dFllYXJBcmlhTGFiZWwiLCJzaG93WWVhckRyb3Bkb3duIiwic2hvd01vbnRoRHJvcGRvd24iLCJzaG93TW9udGhZZWFyRHJvcGRvd24iLCJvdmVycmlkZUhpZGUiLCJjaGFuZ2VZZWFyIiwiY2hhbmdlTW9udGgiLCJjaGFuZ2VNb250aFllYXIiLCJoYW5kbGVUb2RheUJ1dHRvbkNsaWNrIiwibW9udGhEYXRlIiwicmVuZGVyQ3VycmVudE1vbnRoIiwib25Gb2N1cyIsImhhbmRsZURyb3Bkb3duRm9jdXMiLCJyZW5kZXJNb250aERyb3Bkb3duIiwicmVuZGVyTW9udGhZZWFyRHJvcGRvd24iLCJyZW5kZXJZZWFyRHJvcGRvd24iLCJoZWFkZXJBcmdzIiwibW9udGhDb250YWluZXIiLCJwcmV2TW9udGhCdXR0b25EaXNhYmxlZCIsIm5leHRNb250aEJ1dHRvbkRpc2FibGVkIiwicHJldlllYXJCdXR0b25EaXNhYmxlZCIsIm5leHRZZWFyQnV0dG9uRGlzYWJsZWQiLCJzaG93RGF5TmFtZXMiLCJfb2JqZWN0U3ByZWFkIiwiY3VzdG9tSGVhZGVyQ291bnQiLCJyZW5kZXJZZWFySGVhZGVyIiwicmVuZGVyRGVmYXVsdEhlYWRlciIsIl90aGlzJHByb3BzJG1vbnRoU2VsZSIsIm1vbnRoTGlzdCIsIm1vbnRoc1RvU3VidHJhY3QiLCJzaG93UHJldmlvdXNNb250aHMiLCJtb250aHNTaG93biIsImZyb21Nb250aERhdGUiLCJtb250aHNUb0FkZCIsIm1vbnRoS2V5IiwiZGl2IiwicmVuZGVySGVhZGVyIiwibW9udGhBcmlhTGFiZWxQcmVmaXgiLCJoYW5kbGVPbkRheUtleURvd24iLCJoYW5kbGVNb250aE1vdXNlTGVhdmUiLCJfZXh0ZW5kcyIsImhhbmRsZVllYXJNb3VzZUVudGVyIiwiaGFuZGxlWWVhck1vdXNlTGVhdmUiLCJ0aW1lRm9ybWF0IiwidGltZUludGVydmFscyIsIndpdGhQb3J0YWwiLCJ0aW1lVmFsaWQiLCJCb29sZWFuIiwic2hvd1RpbWVJbnB1dCIsIklucHV0VGltZSIsImFyaWFMaXZlTWVzc2FnZSIsImdldERhdGVJblZpZXciLCJhc3NpZ25Nb250aENvbnRhaW5lciIsIl90aGlzMyIsImhhc01vbnRoQ2hhbmdlZCIsIkNvbnRhaW5lciIsImNvbnRhaW5lciIsImRpc3BsYXkiLCJyZW5kZXJBcmlhTGl2ZVJlZ2lvbiIsInJlbmRlclByZXZpb3VzQnV0dG9uIiwicmVuZGVyTmV4dEJ1dHRvbiIsInJlbmRlclllYXJzIiwicmVuZGVyVG9kYXlCdXR0b24iLCJyZW5kZXJUaW1lU2VjdGlvbiIsInJlbmRlcklucHV0VGltZVNlY3Rpb24iLCJyZW5kZXJDaGlsZHJlbiIsIkNhbGVuZGFySWNvbiIsImljb24iLCJfcmVmJGNsYXNzTmFtZSIsImRlZmF1bHRDbGFzcyIsImlzVmFsaWRFbGVtZW50IiwieG1sbnMiLCJ2aWV3Qm94IiwiUG9ydGFsIiwiZWwiLCJwb3J0YWxSb290IiwicG9ydGFsSG9zdCIsImdldEVsZW1lbnRCeUlkIiwicG9ydGFsSWQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlQ2hpbGQiLCJSZWFjdERPTSIsImNyZWF0ZVBvcnRhbCIsImZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IiLCJmb2N1c2FibGVGaWx0ZXIiLCJub2RlIiwiZGlzYWJsZWQiLCJUYWJMb29wIiwicHJvdG90eXBlIiwiY2FsbCIsInRhYkxvb3BSZWYiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiQ2hpbGRyZW4iLCJnZXRUYWJDaGlsZHJlbiIsImVuYWJsZVRhYkxvb3AiLCJoYW5kbGVGb2N1c1N0YXJ0IiwiaGFuZGxlRm9jdXNFbmQiLCJ3aXRoRmxvYXRpbmciLCJXaXRoRmxvYXRpbmciLCJhbHRfcHJvcHMiLCJwb3BwZXJNb2RpZmllcnMiLCJwb3BwZXJQcm9wcyIsImhpZGVQb3BwZXIiLCJhcnJvd1JlZiIsInVzZVJlZiIsImZsb2F0aW5nUHJvcHMiLCJ1c2VGbG9hdGluZyIsIm9wZW4iLCJ3aGlsZUVsZW1lbnRzTW91bnRlZCIsImF1dG9VcGRhdGUiLCJwbGFjZW1lbnQiLCJwb3BwZXJQbGFjZW1lbnQiLCJtaWRkbGV3YXJlIiwiZmxpcCIsInBhZGRpbmciLCJhcnJvdyIsIlBvcHBlckNvbXBvbmVudCIsIndyYXBwZXJDbGFzc05hbWUiLCJwb3BwZXJDb21wb25lbnQiLCJ0YXJnZXRDb21wb25lbnQiLCJwb3BwZXJPbktleURvd24iLCJzaG93QXJyb3ciLCJwb3BwZXIiLCJyZWZzIiwic2V0RmxvYXRpbmciLCJmbG9hdGluZ1N0eWxlcyIsIkZsb2F0aW5nQXJyb3ciLCJjb250ZXh0IiwiZmlsbCIsInN0cm9rZVdpZHRoIiwid2lkdGgiLCJ0cmFuc2Zvcm0iLCJwb3BwZXJDb250YWluZXIiLCJ3cmFwcGVyQ2xhc3NlcyIsIkZyYWdtZW50Iiwic2V0UmVmZXJlbmNlIiwib3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MiLCJXcmFwcGVkQ2FsZW5kYXIiLCJoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkIiwiSU5QVVRfRVJSXzEiLCJEYXRlUGlja2VyIiwiX3RoaXMkcHJvcHMkaG9saWRheXMiLCJhY2N1bXVsYXRvciIsImRlZmF1bHRQcmVTZWxlY3Rpb24iLCJnZXRQcmVTZWxlY3Rpb24iLCJib3VuZGVkUHJlU2VsZWN0aW9uIiwic3RhcnRPcGVuIiwicHJldmVudEZvY3VzIiwiZm9jdXNlZCIsInByZXZlbnRGb2N1c1RpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJpbnB1dCIsImJsdXIiLCJjYW5jZWxGb2N1c0lucHV0Iiwic2tpcFNldEJsdXIiLCJjYWxjSW5pdGlhbFN0YXRlIiwibGFzdFByZVNlbGVjdENoYW5nZSIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFIiwic2V0Qmx1ciIsImlucHV0VmFsdWUiLCJyZWFkT25seSIsInByZXZlbnRPcGVuT25Gb2N1cyIsImNsZWFyUHJldmVudEZvY3VzVGltZW91dCIsInNldFRpbWVvdXQiLCJzZXRGb2N1cyIsImlucHV0Rm9jdXNUaW1lb3V0Iiwib25CbHVyIiwiYWxsQXJncyIsIm9uQ2hhbmdlUmF3IiwiaXNEZWZhdWx0UHJldmVudGVkIiwiUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQiLCJob3VycyIsIm1pbnV0ZXMiLCJzZXRTZWxlY3RlZCIsInNlbmRGb2N1c0JhY2tUb0lucHV0Iiwic2hvd0RhdGVTZWxlY3QiLCJrZWVwSW5wdXQiLCJhbGxvd1NhbWVEYXkiLCJmb2N1c1NlbGVjdGVkTW9udGgiLCJub1JhbmdlcyIsImhhc1N0YXJ0UmFuZ2UiLCJpc1JhbmdlRmlsbGVkIiwiaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCIsInNlbGVjdGVkRGF0ZSIsIm5leHREYXRlcyIsImhhc01pbkRhdGUiLCJoYXNNYXhEYXRlIiwiaXNWYWxpZERhdGVTZWxlY3Rpb24iLCJkYXRlU3RhcnRPZkRheSIsIm1pbkRhdGVTdGFydE9mRGF5IiwibWF4RGF0ZUVuZE9mRGF5Iiwib25JbnB1dENsaWNrIiwic2VsZWN0b3JTdHJpbmciLCJzZWxlY3RlZEl0ZW0iLCJjYWxlbmRhciIsImNvbXBvbmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiY29weSIsImlucHV0T2siLCJoYW5kbGVTZWxlY3QiLCJvbklucHV0RXJyb3IiLCJjb2RlIiwibXNnIiwiaXNTaGlmdEtleUFjdGl2ZSIsInNoaWZ0S2V5IiwibmV3U2VsZWN0aW9uIiwic3ViV2Vla3MiLCJzdWJEYXlzIiwiYWRkV2Vla3MiLCJwcmV2TW9udGgiLCJwcmV2WWVhciIsIm9uQ2xlYXJDbGljayIsImNsb3NlT25TY3JvbGwiLCJkb2N1bWVudEVsZW1lbnQiLCJpc0NhbGVuZGFyT3BlbiIsImVsZW0iLCJkYXRlRm9ybWF0Q2FsZW5kYXIiLCJoYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZSIsIm1vZGlmeUhvbGlkYXlzIiwiaGFuZGxlVGltZUNoYW5nZSIsImNhbGVuZGFyQ2xhc3NOYW1lIiwiY2FsZW5kYXJDb250YWluZXIiLCJleGNsdWRlU2Nyb2xsYmFyIiwib25EYXlLZXlEb3duIiwiaXNDb250YWluc1RpbWUiLCJsb25nRGF0ZUZvcm1hdCIsIl9SZWFjdCRjbG9uZUVsZW1lbnQiLCJjdXN0b21JbnB1dCIsImN1c3RvbUlucHV0UmVmIiwiaGFuZGxlQmx1ciIsImhhbmRsZUNoYW5nZSIsImhhbmRsZUZvY3VzIiwib25JbnB1dEtleURvd24iLCJpZCIsImZvcm0iLCJhdXRvRm9jdXMiLCJwbGFjZWhvbGRlclRleHQiLCJhdXRvQ29tcGxldGUiLCJhcmlhRGVzY3JpYmVkQnkiLCJhcmlhSW52YWxpZCIsImFyaWFMYWJlbGxlZEJ5IiwiYXJpYVJlcXVpcmVkIiwiaXNDbGVhcmFibGUiLCJjbGVhckJ1dHRvblRpdGxlIiwiX3RoaXMkcHJvcHM0JGNsZWFyQnV0IiwiY2xlYXJCdXR0b25DbGFzc05hbWUiLCJfdGhpcyRwcm9wczQkYXJpYUxhYmUiLCJhcmlhTGFiZWxDbG9zZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblNjcm9sbCIsInByZXZTdGF0ZSIsIm9uQ2FsZW5kYXJPcGVuIiwib25DYWxlbmRhckNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlcklucHV0Q29udGFpbmVyIiwic2hvd0ljb24iLCJjYWxlbmRhckljb25DbGFzc25hbWUiLCJ0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIiwidG9nZ2xlQ2FsZW5kYXIiLCJyZW5kZXJEYXRlSW5wdXQiLCJyZW5kZXJDbGVhckJ1dHRvbiIsInJlbmRlckNhbGVuZGFyIiwicG9ydGFsQ29udGFpbmVyIiwib25Qb3J0YWxLZXlEb3duIiwicG9wcGVyQ2xhc3NOYW1lIiwib25Qb3BwZXJLZXlEb3duIiwic2hvd1BvcHBlckFycm93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF5RE8sSUFBTUEsd0JBQXdCLEdBQUcsRUFBRSxDQUFBOztFQUUxQztFQUNBO0VBQ0EsSUFBTUMsMEJBQTBCLEdBQUcsbUNBQW1DLENBQUE7O0VBRXRFOztFQUVPLFNBQVNDLE9BQU9BLENBQUNDLEtBQUssRUFBRTtJQUM3QixJQUFNQyxDQUFDLEdBQUdELEtBQUssR0FDWCxPQUFPQSxLQUFLLEtBQUssUUFBUSxJQUFJQSxLQUFLLFlBQVlFLE1BQU0sR0FDbERDLGlCQUFRLENBQUNILEtBQUssQ0FBQyxHQUNmSSxhQUFNLENBQUNKLEtBQUssQ0FBQyxHQUNmLElBQUlLLElBQUksRUFBRSxDQUFBO0VBQ2QsRUFBQSxPQUFPQyxPQUFPLENBQUNMLENBQUMsQ0FBQyxHQUFHQSxDQUFDLEdBQUcsSUFBSSxDQUFBO0VBQzlCLENBQUE7RUFFTyxTQUFTTSxTQUFTQSxDQUFDUCxLQUFLLEVBQUVRLFVBQVUsRUFBRUMsTUFBTSxFQUFFQyxhQUFhLEVBQUVDLE9BQU8sRUFBRTtJ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
