/*!
  react-datepicker v6.6.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('prop-types');
var clsx = require('clsx');
var isDate = require('date-fns/isDate');
var isValid$1 = require('date-fns/isValid');
var format = require('date-fns/format');
var addMinutes = require('date-fns/addMinutes');
var addHours = require('date-fns/addHours');
var addDays = require('date-fns/addDays');
var addWeeks = require('date-fns/addWeeks');
var addMonths = require('date-fns/addMonths');
var addQuarters = require('date-fns/addQuarters');
var addYears = require('date-fns/addYears');
var subDays = require('date-fns/subDays');
var subWeeks = require('date-fns/subWeeks');
var subMonths = require('date-fns/subMonths');
var subQuarters = require('date-fns/subQuarters');
var subYears = require('date-fns/subYears');
var getSeconds = require('date-fns/getSeconds');
var getMinutes = require('date-fns/getMinutes');
var getHours = require('date-fns/getHours');
var getDay = require('date-fns/getDay');
var getDate = require('date-fns/getDate');
var getISOWeek = require('date-fns/getISOWeek');
var getMonth = require('date-fns/getMonth');
var getQuarter = require('date-fns/getQuarter');
var getYear = require('date-fns/getYear');
var getTime = require('date-fns/getTime');
var setSeconds = require('date-fns/setSeconds');
var setMinutes = require('date-fns/setMinutes');
var setHours = require('date-fns/setHours');
var setMonth = require('date-fns/setMonth');
var setQuarter = require('date-fns/setQuarter');
var setYear = require('date-fns/setYear');
var min = require('date-fns/min');
var max = require('date-fns/max');
var differenceInCalendarDays = require('date-fns/differenceInCalendarDays');
var differenceInCalendarMonths = require('date-fns/differenceInCalendarMonths');
var differenceInCalendarYears = require('date-fns/differenceInCalendarYears');
var startOfDay = require('date-fns/startOfDay');
var startOfWeek = require('date-fns/startOfWeek');
var startOfMonth = require('date-fns/startOfMonth');
var startOfQuarter = require('date-fns/startOfQuarter');
var startOfYear = require('date-fns/startOfYear');
var endOfDay = require('date-fns/endOfDay');
var endOfWeek = require('date-fns/endOfWeek');
var endOfMonth = require('date-fns/endOfMonth');
var endOfYear = require('date-fns/endOfYear');
var isEqual$1 = require('date-fns/isEqual');
var isSameDay$1 = require('date-fns/isSameDay');
var isSameMonth$1 = require('date-fns/isSameMonth');
var isSameYear$1 = require('date-fns/isSameYear');
var isSameQuarter$1 = require('date-fns/isSameQuarter');
var isAfter = require('date-fns/isAfter');
var isBefore = require('date-fns/isBefore');
var isWithinInterval = require('date-fns/isWithinInterval');
var toDate = require('date-fns/toDate');
var parse = require('date-fns/parse');
var parseISO = require('date-fns/parseISO');
var onClickOutside = require('react-onclickoutside');
var ReactDOM = require('react-dom');
var react = require('@floating-ui/react');
var set = require('date-fns/set');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlX3V0aWxzLmpzIiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd24uanN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi5qc3giLCIuLi9zcmMvZGF5LmpzeCIsIi4uL3NyYy93ZWVrX251bWJlci5qc3giLCIuLi9zcmMvd2Vlay5qc3giLCIuLi9zcmMvbW9udGguanN4IiwiLi4vc3JjL3RpbWUuanN4IiwiLi4vc3JjL3llYXIuanN4IiwiLi4vc3JjL2lucHV0VGltZS5qc3giLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLmpzeCIsIi4uL3NyYy9jYWxlbmRhci5qc3giLCIuLi9zcmMvY2FsZW5kYXJfaWNvbi5qc3giLCIuLi9zcmMvcG9ydGFsLmpzeCIsIi4uL3NyYy90YWJfbG9vcC5qc3giLCIuLi9zcmMvd2l0aF9mbG9hdGluZy5qc3giLCIuLi9zcmMvcG9wcGVyX2NvbXBvbmVudC5qc3giLCIuLi9zcmMvaW5kZXguanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc0RhdGVcIjtcbmltcG9ydCB7IGlzVmFsaWQgYXMgaXNWYWxpZERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHsgZm9ybWF0LCBsb25nRm9ybWF0dGVycyB9IGZyb20gXCJkYXRlLWZucy9mb3JtYXRcIjtcbmltcG9ydCB7IGFkZE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkTWludXRlc1wiO1xuaW1wb3J0IHsgYWRkSG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkSG91cnNcIjtcbmltcG9ydCB7IGFkZERheXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkRGF5c1wiO1xuaW1wb3J0IHsgYWRkV2Vla3MgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkV2Vla3NcIjtcbmltcG9ydCB7IGFkZE1vbnRocyB9IGZyb20gXCJkYXRlLWZucy9hZGRNb250aHNcIjtcbmltcG9ydCB7IGFkZFF1YXJ0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBhZGRZZWFycyB9IGZyb20gXCJkYXRlLWZucy9hZGRZZWFyc1wiO1xuaW1wb3J0IHsgc3ViRGF5cyB9IGZyb20gXCJkYXRlLWZucy9zdWJEYXlzXCI7XG5pbXBvcnQgeyBzdWJXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9zdWJXZWVrc1wiO1xuaW1wb3J0IHsgc3ViTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL3N1Yk1vbnRoc1wiO1xuaW1wb3J0IHsgc3ViUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViUXVhcnRlcnNcIjtcbmltcG9ydCB7IHN1YlllYXJzIH0gZnJvbSBcImRhdGUtZm5zL3N1YlllYXJzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL2dldFNlY29uZHNcIjtcbmltcG9ydCB7IGdldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0TWludXRlc1wiO1xuaW1wb3J0IHsgZ2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0SG91cnNcIjtcbmltcG9ydCB7IGdldERheSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXlcIjtcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0RGF0ZVwiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCJkYXRlLWZucy9nZXRJU09XZWVrXCI7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9nZXRNb250aFwiO1xuaW1wb3J0IHsgZ2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9nZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2dldFllYXJcIjtcbmltcG9ydCB7IGdldFRpbWUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0VGltZVwiO1xuaW1wb3J0IHsgc2V0U2Vjb25kcyB9IGZyb20gXCJkYXRlLWZucy9zZXRTZWNvbmRzXCI7XG5pbXBvcnQgeyBzZXRNaW51dGVzIH0gZnJvbSBcImRhdGUtZm5zL3NldE1pbnV0ZXNcIjtcbmltcG9ydCB7IHNldEhvdXJzIH0gZnJvbSBcImRhdGUtZm5zL3NldEhvdXJzXCI7XG5pbXBvcnQgeyBzZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9zZXRNb250aFwiO1xuaW1wb3J0IHsgc2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBzZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3NldFllYXJcIjtcbmltcG9ydCB7IG1pbiB9IGZyb20gXCJkYXRlLWZucy9taW5cIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCJkYXRlLWZucy9tYXhcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZkRheVwiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZldlZWtcIjtcbmltcG9ydCB7IHN0YXJ0T2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mTW9udGhcIjtcbmltcG9ydCB7IHN0YXJ0T2ZRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZRdWFydGVyXCI7XG5pbXBvcnQgeyBzdGFydE9mWWVhciB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mWWVhclwiO1xuaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZEYXlcIjtcbmltcG9ydCB7IGVuZE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9lbmRPZldlZWtcIjtcbmltcG9ydCB7IGVuZE9mTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZNb250aFwiO1xuaW1wb3J0IHsgZW5kT2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mWWVhclwiO1xuaW1wb3J0IHsgaXNFcXVhbCBhcyBkZklzRXF1YWwgfSBmcm9tIFwiZGF0ZS1mbnMvaXNFcXVhbFwiO1xuaW1wb3J0IHsgaXNTYW1lRGF5IGFzIGRmSXNTYW1lRGF5IH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZURheVwiO1xuaW1wb3J0IHsgaXNTYW1lTW9udGggYXMgZGZJc1NhbWVNb250aCB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVNb250aFwiO1xuaW1wb3J0IHsgaXNTYW1lWWVhciBhcyBkZklzU2FtZVllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lWWVhclwiO1xuaW1wb3J0IHsgaXNTYW1lUXVhcnRlciBhcyBkZklzU2FtZVF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lUXVhcnRlclwiO1xuaW1wb3J0IHsgaXNBZnRlciB9IGZyb20gXCJkYXRlLWZucy9pc0FmdGVyXCI7XG5pbXBvcnQgeyBpc0JlZm9yZSB9IGZyb20gXCJkYXRlLWZucy9pc0JlZm9yZVwiO1xuaW1wb3J0IHsgaXNXaXRoaW5JbnRlcnZhbCB9IGZyb20gXCJkYXRlLWZucy9pc1dpdGhpbkludGVydmFsXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvdG9EYXRlXCI7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJkYXRlLWZucy9wYXJzZVwiO1xuaW1wb3J0IHsgcGFyc2VJU08gfSBmcm9tIFwiZGF0ZS1mbnMvcGFyc2VJU09cIjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiA9IDEyO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG5jb25zdCBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyAqKiBEYXRlIENvbnN0cnVjdG9ycyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gbmV3RGF0ZSh2YWx1ZSkge1xuICBjb25zdCBkID0gdmFsdWVcbiAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZ1xuICAgICAgPyBwYXJzZUlTTyh2YWx1ZSlcbiAgICAgIDogdG9EYXRlKHZhbHVlKVxuICAgIDogbmV3IERhdGUoKTtcbiAgcmV0dXJuIGlzVmFsaWQoZCkgPyBkIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZSh2YWx1ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlLCBzdHJpY3RQYXJzaW5nLCBtaW5EYXRlKSB7XG4gIGxldCBwYXJzZWREYXRlID0gbnVsbDtcbiAgbGV0IGxvY2FsZU9iamVjdCA9XG4gICAgZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSkgfHwgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIGxldCBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9IHRydWU7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGVGb3JtYXQpKSB7XG4gICAgZGF0ZUZvcm1hdC5mb3JFYWNoKChkZikgPT4ge1xuICAgICAgbGV0IHRyeVBhcnNlRGF0ZSA9IHBhcnNlKHZhbHVlLCBkZiwgbmV3IERhdGUoKSwge1xuICAgICAgICBsb2NhbGU6IGxvY2FsZU9iamVjdCxcbiAgICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBpZiAoc3RyaWN0UGFyc2luZykge1xuICAgICAgICBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9XG4gICAgICAgICAgaXNWYWxpZCh0cnlQYXJzZURhdGUsIG1pbkRhdGUpICYmXG4gICAgICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUodHJ5UGFyc2VEYXRlLCBkZiwgbG9jYWxlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2gpIHtcbiAgICAgICAgcGFyc2VkRGF0ZSA9IHRyeVBhcnNlRGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2VkRGF0ZTtcbiAgfVxuXG4gIHBhcnNlZERhdGUgPSBwYXJzZSh2YWx1ZSwgZGF0ZUZvcm1hdCwgbmV3IERhdGUoKSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICB9KTtcblxuICBpZiAoc3RyaWN0UGFyc2luZykge1xuICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiZcbiAgICAgIHZhbHVlID09PSBmb3JtYXREYXRlKHBhcnNlZERhdGUsIGRhdGVGb3JtYXQsIGxvY2FsZSk7XG4gIH0gZWxzZSBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdFxuICAgICAgLm1hdGNoKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuICAgICAgLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09IFwicFwiIHx8IGZpcnN0Q2hhcmFjdGVyID09PSBcIlBcIikge1xuICAgICAgICAgIGNvbnN0IGxvbmdGb3JtYXR0ZXIgPSBsb25nRm9ybWF0dGVyc1tmaXJzdENoYXJhY3Rlcl07XG4gICAgICAgICAgcmV0dXJuIGxvY2FsZU9iamVjdFxuICAgICAgICAgICAgPyBsb25nRm9ybWF0dGVyKHN1YnN0cmluZywgbG9jYWxlT2JqZWN0LmZvcm1hdExvbmcpXG4gICAgICAgICAgICA6IGZpcnN0Q2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzdHJpbmc7XG4gICAgICB9KVxuICAgICAgLmpvaW4oXCJcIik7XG5cbiAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LnNsaWNlKDAsIHZhbHVlLmxlbmd0aCksIG5ldyBEYXRlKCksIHtcbiAgICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1ZhbGlkKHBhcnNlZERhdGUpKSB7XG4gICAgICBwYXJzZWREYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc1ZhbGlkKHBhcnNlZERhdGUpICYmIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID8gcGFyc2VkRGF0ZSA6IG51bGw7XG59XG5cbi8vICoqIERhdGUgXCJSZWZsZWN0aW9uXCIgKipcblxuZXhwb3J0IHsgaXNEYXRlIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKGRhdGUsIG1pbkRhdGUpIHtcbiAgbWluRGF0ZSA9IG1pbkRhdGUgPyBtaW5EYXRlIDogbmV3IERhdGUoXCIxLzEvMTAwMFwiKTtcbiAgcmV0dXJuIGlzVmFsaWREYXRlKGRhdGUpICYmICFpc0JlZm9yZShkYXRlLCBtaW5EYXRlKTtcbn1cblxuLy8gKiogRGF0ZSBGb3JtYXR0aW5nICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdFN0ciwgbG9jYWxlKSB7XG4gIGlmIChsb2NhbGUgPT09IFwiZW5cIikge1xuICAgIHJldHVybiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7XG4gICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIGxldCBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QobG9jYWxlKTtcbiAgaWYgKGxvY2FsZSAmJiAhbG9jYWxlT2JqKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYEEgbG9jYWxlIG9iamVjdCB3YXMgbm90IGZvdW5kIGZvciB0aGUgcHJvdmlkZWQgc3RyaW5nIFtcIiR7bG9jYWxlfVwiXS5gLFxuICAgICk7XG4gIH1cbiAgaWYgKFxuICAgICFsb2NhbGVPYmogJiZcbiAgICAhIWdldERlZmF1bHRMb2NhbGUoKSAmJlxuICAgICEhZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSlcbiAgKSB7XG4gICAgbG9jYWxlT2JqID0gZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iaiA/IGxvY2FsZU9iaiA6IG51bGwsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZURhdGVGb3JtYXQoZGF0ZSwgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSkge1xuICByZXR1cm4gKFxuICAgIChkYXRlICYmXG4gICAgICBmb3JtYXREYXRlKFxuICAgICAgICBkYXRlLFxuICAgICAgICBBcnJheS5pc0FycmF5KGRhdGVGb3JtYXQpID8gZGF0ZUZvcm1hdFswXSA6IGRhdGVGb3JtYXQsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICkpIHx8XG4gICAgXCJcIlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZURhdGVSYW5nZUZvcm1hdChzdGFydERhdGUsIGVuZERhdGUsIHByb3BzKSB7XG4gIGlmICghc3RhcnREYXRlKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBmb3JtYXR0ZWRTdGFydERhdGUgPSBzYWZlRGF0ZUZvcm1hdChzdGFydERhdGUsIHByb3BzKTtcbiAgY29uc3QgZm9ybWF0dGVkRW5kRGF0ZSA9IGVuZERhdGUgPyBzYWZlRGF0ZUZvcm1hdChlbmREYXRlLCBwcm9wcykgOiBcIlwiO1xuXG4gIHJldHVybiBgJHtmb3JtYXR0ZWRTdGFydERhdGV9IC0gJHtmb3JtYXR0ZWRFbmREYXRlfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdChkYXRlcywgcHJvcHMpIHtcbiAgaWYgKCFkYXRlcz8ubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbiAgY29uc3QgZm9ybWF0dGVkRmlyc3REYXRlID0gc2FmZURhdGVGb3JtYXQoZGF0ZXNbMF0sIHByb3BzKTtcbiAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmb3JtYXR0ZWRGaXJzdERhdGU7XG4gIH1cbiAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMikge1xuICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1sxXSwgcHJvcHMpO1xuICAgIHJldHVybiBgJHtmb3JtYXR0ZWRGaXJzdERhdGV9LCAke2Zvcm1hdHRlZFNlY29uZERhdGV9YDtcbiAgfVxuXG4gIGNvbnN0IGV4dHJhRGF0ZXNDb3VudCA9IGRhdGVzLmxlbmd0aCAtIDE7XG4gIHJldHVybiBgJHtmb3JtYXR0ZWRGaXJzdERhdGV9ICgrJHtleHRyYURhdGVzQ291bnR9KWA7XG59XG5cbi8vICoqIERhdGUgU2V0dGVycyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGltZShkYXRlLCB7IGhvdXIgPSAwLCBtaW51dGUgPSAwLCBzZWNvbmQgPSAwIH0pIHtcbiAgcmV0dXJuIHNldEhvdXJzKHNldE1pbnV0ZXMoc2V0U2Vjb25kcyhkYXRlLCBzZWNvbmQpLCBtaW51dGUpLCBob3VyKTtcbn1cblxuZXhwb3J0IHsgc2V0TWludXRlcywgc2V0SG91cnMsIHNldE1vbnRoLCBzZXRRdWFydGVyLCBzZXRZZWFyIH07XG5cbi8vICoqIERhdGUgR2V0dGVycyAqKlxuXG4vLyBnZXREYXkgUmV0dXJucyBkYXkgb2Ygd2VlaywgZ2V0RGF0ZSByZXR1cm5zIGRheSBvZiBtb250aFxuZXhwb3J0IHtcbiAgZ2V0U2Vjb25kcyxcbiAgZ2V0TWludXRlcyxcbiAgZ2V0SG91cnMsXG4gIGdldE1vbnRoLFxuICBnZXRRdWFydGVyLFxuICBnZXRZZWFyLFxuICBnZXREYXksXG4gIGdldERhdGUsXG4gIGdldFRpbWUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VlayhkYXRlLCBsb2NhbGUpIHtcbiAgbGV0IGxvY2FsZU9iaiA9XG4gICAgKGxvY2FsZSAmJiBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSkgfHxcbiAgICAoZ2V0RGVmYXVsdExvY2FsZSgpICYmIGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpKTtcbiAgcmV0dXJuIGdldElTT1dlZWsoZGF0ZSwgbG9jYWxlT2JqID8geyBsb2NhbGU6IGxvY2FsZU9iaiB9IDogbnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZldlZWtDb2RlKGRheSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRheSwgXCJkZGRcIiwgbG9jYWxlKTtcbn1cblxuLy8gKioqIFN0YXJ0IG9mICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZkRheShkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mRGF5KGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZldlZWsoZGF0ZSwgbG9jYWxlLCBjYWxlbmRhclN0YXJ0RGF5KSB7XG4gIGxldCBsb2NhbGVPYmogPSBsb2NhbGVcbiAgICA/IGdldExvY2FsZU9iamVjdChsb2NhbGUpXG4gICAgOiBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgcmV0dXJuIHN0YXJ0T2ZXZWVrKGRhdGUsIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iaixcbiAgICB3ZWVrU3RhcnRzT246IGNhbGVuZGFyU3RhcnREYXksXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZNb250aChkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZZZWFyKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZZZWFyKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlF1YXJ0ZXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlF1YXJ0ZXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mVG9kYXkoKSB7XG4gIHJldHVybiBzdGFydE9mRGF5KG5ld0RhdGUoKSk7XG59XG5cbi8vICoqKiBFbmQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZldlZWsoZGF0ZSkge1xuICByZXR1cm4gZW5kT2ZXZWVrKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kT2ZNb250aChkYXRlKSB7XG4gIHJldHVybiBlbmRPZk1vbnRoKGRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIE1hdGggKipcblxuLy8gKioqIEFkZGl0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRNaW51dGVzLCBhZGREYXlzLCBhZGRXZWVrcywgYWRkTW9udGhzLCBhZGRRdWFydGVycywgYWRkWWVhcnMgfTtcblxuLy8gKioqIFN1YnRyYWN0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRIb3Vycywgc3ViRGF5cywgc3ViV2Vla3MsIHN1Yk1vbnRocywgc3ViUXVhcnRlcnMsIHN1YlllYXJzIH07XG5cbi8vICoqIERhdGUgQ29tcGFyaXNvbiAqKlxuXG5leHBvcnQgeyBpc0JlZm9yZSwgaXNBZnRlciB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZURheShkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc0VxdWFsKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZkRheShzdGFydERhdGUpO1xuICBjb25zdCBlbmQgPSBlbmRPZkRheShlbmREYXRlKTtcblxuICB0cnkge1xuICAgIHZhbGlkID0gaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbi8vICoqKiBEaWZmaW5nICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTEsIGRhdGUyKSB7XG4gIHJldHVybiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZTEsIGRhdGUyKTtcbn1cblxuLy8gKiogRGF0ZSBMb2NhbGl6YXRpb24gKipcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZU5hbWUsIGxvY2FsZURhdGEpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBpZiAoIXNjb3BlLl9fbG9jYWxlRGF0YV9fKSB7XG4gICAgc2NvcGUuX19sb2NhbGVEYXRhX18gPSB7fTtcbiAgfVxuICBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVOYW1lXSA9IGxvY2FsZURhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0TG9jYWxlKGxvY2FsZU5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBzY29wZS5fX2xvY2FsZUlkX18gPSBsb2NhbGVOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdExvY2FsZSgpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICByZXR1cm4gc2NvcGUuX19sb2NhbGVJZF9fO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZVNwZWMpIHtcbiAgaWYgKHR5cGVvZiBsb2NhbGVTcGVjID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSBsb2NhbGUgbmFtZSByZWdpc3RlcmVkIGJ5IHJlZ2lzdGVyTG9jYWxlXG4gICAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcbiAgICByZXR1cm4gc2NvcGUuX19sb2NhbGVEYXRhX18gPyBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVTcGVjXSA6IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSByYXcgZGF0ZS1mbnMgbG9jYWxlIG9iamVjdFxuICAgIHJldHVybiBsb2NhbGVTcGVjO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF0ZSwgZm9ybWF0RnVuYywgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXRGdW5jKGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFXCIsIGxvY2FsZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhTaG9ydEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxdWFydGVyLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0UXVhcnRlcihuZXdEYXRlKCksIHF1YXJ0ZXIpLCBcIlFRUVwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiBVdGlscyBmb3Igc29tZSBjb21wb25lbnRzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheURpc2FibGVkKFxuICBkYXksXG4gIHtcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICAgZXhjbHVkZURhdGVzLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGluY2x1ZGVEYXRlcyxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFscyxcbiAgICBmaWx0ZXJEYXRlLFxuICB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lRGF5KGRheSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXkpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlFeGNsdWRlZChcbiAgZGF5LFxuICB7IGV4Y2x1ZGVEYXRlcywgZXhjbHVkZURhdGVJbnRlcnZhbHMgfSA9IHt9LFxuKSB7XG4gIGlmIChleGNsdWRlRGF0ZUludGVydmFscyAmJiBleGNsdWRlRGF0ZUludGVydmFscy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhEaXNhYmxlZChcbiAgbW9udGgsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhtb250aCwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZk1vbnRoKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZNb250aChtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShtb250aCkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoSW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIG0sIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVNb250aCA9IGdldE1vbnRoKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZU1vbnRoID0gZ2V0TW9udGgoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZU1vbnRoIDw9IG0gJiYgbSA8PSBlbmREYXRlTW9udGg7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZU1vbnRoIDw9IG0pIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZU1vbnRoID49IG0pIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckRpc2FibGVkKFxuICBxdWFydGVyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMocXVhcnRlciwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBpbmNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUocXVhcnRlcikpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnRcbiAqIEBwYXJhbSB7RGF0ZX0gZW5kXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckluUmFuZ2UoeWVhciwgc3RhcnQsIGVuZCkge1xuICBpZiAoIWlzVmFsaWREYXRlKHN0YXJ0KSB8fCAhaXNWYWxpZERhdGUoZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzdGFydFllYXIgPSBnZXRZZWFyKHN0YXJ0KTtcbiAgY29uc3QgZW5kWWVhciA9IGdldFllYXIoZW5kKTtcblxuICByZXR1cm4gc3RhcnRZZWFyIDw9IHllYXIgJiYgZW5kWWVhciA+PSB5ZWFyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFyRGlzYWJsZWQoXG4gIHllYXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCAwLCAxKTtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRhdGUsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZZZWFyKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZZZWFyKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF0ZSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVRdWFydGVyIDw9IHEgJiYgcSA8PSBlbmREYXRlUXVhcnRlcjtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlUXVhcnRlciA8PSBxKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVRdWFydGVyID49IHEpIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSA9IHt9KSB7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWluRGF0ZSkgPCAwKSB8fFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1heERhdGUpID4gMClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluTGlzdCh0aW1lLCB0aW1lcykge1xuICByZXR1cm4gdGltZXMuc29tZShcbiAgICAobGlzdFRpbWUpID0+XG4gICAgICBnZXRIb3VycyhsaXN0VGltZSkgPT09IGdldEhvdXJzKHRpbWUpICYmXG4gICAgICBnZXRNaW51dGVzKGxpc3RUaW1lKSA9PT0gZ2V0TWludXRlcyh0aW1lKSxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZURpc2FibGVkKFxuICB0aW1lLFxuICB7IGV4Y2x1ZGVUaW1lcywgaW5jbHVkZVRpbWVzLCBmaWx0ZXJUaW1lIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIChleGNsdWRlVGltZXMgJiYgaXNUaW1lSW5MaXN0KHRpbWUsIGV4Y2x1ZGVUaW1lcykpIHx8XG4gICAgKGluY2x1ZGVUaW1lcyAmJiAhaXNUaW1lSW5MaXN0KHRpbWUsIGluY2x1ZGVUaW1lcykpIHx8XG4gICAgKGZpbHRlclRpbWUgJiYgIWZpbHRlclRpbWUodGltZSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB7IG1pblRpbWUsIG1heFRpbWUgfSkge1xuICBpZiAoIW1pblRpbWUgfHwgIW1heFRpbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb3RoIG1pblRpbWUgYW5kIG1heFRpbWUgcHJvcHMgcmVxdWlyZWRcIik7XG4gIH1cbiAgY29uc3QgYmFzZSA9IG5ld0RhdGUoKTtcbiAgY29uc3QgYmFzZVRpbWUgPSBzZXRIb3VycyhzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXModGltZSkpLCBnZXRIb3Vycyh0aW1lKSk7XG4gIGNvbnN0IG1pbiA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtaW5UaW1lKSksXG4gICAgZ2V0SG91cnMobWluVGltZSksXG4gICk7XG4gIGNvbnN0IG1heCA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtYXhUaW1lKSksXG4gICAgZ2V0SG91cnMobWF4VGltZSksXG4gICk7XG5cbiAgbGV0IHZhbGlkO1xuICB0cnkge1xuICAgIHZhbGlkID0gIWlzV2l0aGluSW50ZXJ2YWwoYmFzZVRpbWUsIHsgc3RhcnQ6IG1pbiwgZW5kOiBtYXggfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c01vbnRoID0gc3ViTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobWluRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGluY2x1ZGVEYXRlLCBwcmV2aW91c01vbnRoKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQWZ0ZXIoZGF5LCB7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c1llYXIgPSBzdWJZZWFycyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobWluRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQmVmb3JlKFxuICBkYXksXG4gIHsgbWluRGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IGdldFN0YXJ0T2ZZZWFyKHN1YlllYXJzKGRheSwgeWVhckl0ZW1OdW1iZXIpKTtcbiAgY29uc3QgeyBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKHByZXZpb3VzWWVhciwgeWVhckl0ZW1OdW1iZXIpO1xuICBjb25zdCBtaW5EYXRlWWVhciA9IG1pbkRhdGUgJiYgZ2V0WWVhcihtaW5EYXRlKTtcbiAgcmV0dXJuIChtaW5EYXRlWWVhciAmJiBtaW5EYXRlWWVhciA+IGVuZFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0WWVhciA9IGFkZFllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhuZXh0WWVhciwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhcnNEaXNhYmxlZEFmdGVyKFxuICBkYXksXG4gIHsgbWF4RGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKG5leHRZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1heERhdGVZZWFyID0gbWF4RGF0ZSAmJiBnZXRZZWFyKG1heERhdGUpO1xuICByZXR1cm4gKG1heERhdGVZZWFyICYmIG1heERhdGVZZWFyIDwgc3RhcnRQZXJpb2QpIHx8IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWluRGF0ZSh7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWluRGF0ZSkge1xuICAgIGxldCBtaW5EYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWluRGF0ZSkgPj0gMCxcbiAgICApO1xuICAgIHJldHVybiBtaW4obWluRGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtaW4oaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWluRGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWF4RGF0ZSkge1xuICAgIGxldCBtYXhEYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWF4RGF0ZSkgPD0gMCxcbiAgICApO1xuICAgIHJldHVybiBtYXgobWF4RGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtYXgoaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWF4RGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlnaHRMaWdodERheXNNYXAoXG4gIGhpZ2hsaWdodERhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhpZ2hsaWdodERhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgb2JqID0gaGlnaGxpZ2h0RGF0ZXNbaV07XG4gICAgaWYgKGlzRGF0ZShvYmopKSB7XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKG9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lc0FyciA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IFtdO1xuICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGRlZmF1bHRDbGFzc05hbWUpKSB7XG4gICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChkZWZhdWx0Q2xhc3NOYW1lKTtcbiAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGtleXNbMF07XG4gICAgICBjb25zdCBhcnJPZkRhdGVzID0gb2JqW2tleXNbMF1dO1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgYXJyT2ZEYXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbiA9IGFyck9mRGF0ZXMubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKGFyck9mRGF0ZXNba10sIFwiTU0uZGQueXl5eVwiKTtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlQ2xhc3Nlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHRoZSB0d28gYXJyYXlzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTFcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MlxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUsIGlmIHRoZSBwYXNzZWQgYXJyYXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0FyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSB7XG4gIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5MS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gYXJyYXkyW2luZGV4XSk7XG59XG5cbi8qKlxuICogQXNzaWduIHRoZSBjdXN0b20gY2xhc3MgdG8gZWFjaCBkYXRlXG4gKiBAcGFyYW0ge0FycmF5fSBob2xpZGF5RGF0ZXMgYXJyYXkgb2Ygb2JqZWN0IGNvbnRhaW5pbmcgZGF0ZSBhbmQgbmFtZSBvZiB0aGUgaG9saWRheVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzbmFtZSB0byBiZSBhZGRlZC5cbiAqIEByZXR1cm5zIHtNYXB9IE1hcCBjb250YWluaW5nIGRhdGUgYXMga2V5IGFuZCBhcnJheSBvZiBjbGFzc25hbWUgYW5kIGhvbGlkYXkgbmFtZSBhcyB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9saWRheXNNYXAoXG4gIGhvbGlkYXlEYXRlcyA9IFtdLFxuICBkZWZhdWx0Q2xhc3NOYW1lID0gXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhvbGlkYXlzXCIsXG4pIHtcbiAgY29uc3QgZGF0ZUNsYXNzZXMgPSBuZXcgTWFwKCk7XG4gIGhvbGlkYXlEYXRlcy5mb3JFYWNoKChob2xpZGF5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlOiBkYXRlT2JqLCBob2xpZGF5TmFtZSB9ID0gaG9saWRheTtcbiAgICBpZiAoIWlzRGF0ZShkYXRlT2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoZGF0ZU9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXNPYmogPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCB7fTtcbiAgICBpZiAoXG4gICAgICBcImNsYXNzTmFtZVwiIGluIGNsYXNzTmFtZXNPYmogJiZcbiAgICAgIGNsYXNzTmFtZXNPYmpbXCJjbGFzc05hbWVcIl0gPT09IGRlZmF1bHRDbGFzc05hbWUgJiZcbiAgICAgIGFycmF5c0FyZUVxdWFsKGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0sIFtob2xpZGF5TmFtZV0pXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9IGRlZmF1bHRDbGFzc05hbWU7XG4gICAgY29uc3QgaG9saWRheU5hbWVBcnIgPSBjbGFzc05hbWVzT2JqW1wiaG9saWRheU5hbWVzXCJdO1xuICAgIGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0gPSBob2xpZGF5TmFtZUFyclxuICAgICAgPyBbLi4uaG9saWRheU5hbWVBcnIsIGhvbGlkYXlOYW1lXVxuICAgICAgOiBbaG9saWRheU5hbWVdO1xuICAgIGRhdGVDbGFzc2VzLnNldChrZXksIGNsYXNzTmFtZXNPYmopO1xuICB9KTtcbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXNUb0luamVjdEFmdGVyKFxuICBzdGFydE9mRGF5LFxuICBjdXJyZW50VGltZSxcbiAgY3VycmVudE11bHRpcGxpZXIsXG4gIGludGVydmFscyxcbiAgaW5qZWN0ZWRUaW1lcyxcbikge1xuICBjb25zdCBsID0gaW5qZWN0ZWRUaW1lcy5sZW5ndGg7XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgaW5qZWN0ZWRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIGFkZEhvdXJzKHN0YXJ0T2ZEYXksIGdldEhvdXJzKGluamVjdGVkVGltZXNbaV0pKSxcbiAgICAgIGdldE1pbnV0ZXMoaW5qZWN0ZWRUaW1lc1tpXSksXG4gICAgKTtcbiAgICBjb25zdCBuZXh0VGltZSA9IGFkZE1pbnV0ZXMoXG4gICAgICBzdGFydE9mRGF5LFxuICAgICAgKGN1cnJlbnRNdWx0aXBsaWVyICsgMSkgKiBpbnRlcnZhbHMsXG4gICAgKTtcblxuICAgIGlmIChcbiAgICAgIGlzQWZ0ZXIoaW5qZWN0ZWRUaW1lLCBjdXJyZW50VGltZSkgJiZcbiAgICAgIGlzQmVmb3JlKGluamVjdGVkVGltZSwgbmV4dFRpbWUpXG4gICAgKSB7XG4gICAgICB0aW1lcy5wdXNoKGluamVjdGVkVGltZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aW1lcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFplcm8oaSkge1xuICByZXR1cm4gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFllYXJzUGVyaW9kKFxuICBkYXRlLFxuICB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbikge1xuICBjb25zdCBlbmRQZXJpb2QgPSBNYXRoLmNlaWwoZ2V0WWVhcihkYXRlKSAvIHllYXJJdGVtTnVtYmVyKSAqIHllYXJJdGVtTnVtYmVyO1xuICBjb25zdCBzdGFydFBlcmlvZCA9IGVuZFBlcmlvZCAtICh5ZWFySXRlbU51bWJlciAtIDEpO1xuICByZXR1cm4geyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3Vyc0luRGF5KGQpIHtcbiAgY29uc3Qgc3RhcnRPZkRheSA9IG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpLCBkLmdldERhdGUoKSk7XG4gIGNvbnN0IHN0YXJ0T2ZUaGVOZXh0RGF5ID0gbmV3IERhdGUoXG4gICAgZC5nZXRGdWxsWWVhcigpLFxuICAgIGQuZ2V0TW9udGgoKSxcbiAgICBkLmdldERhdGUoKSxcbiAgICAyNCxcbiAgKTtcblxuICByZXR1cm4gTWF0aC5yb3VuZCgoK3N0YXJ0T2ZUaGVOZXh0RGF5IC0gK3N0YXJ0T2ZEYXkpIC8gM182MDBfMDAwKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzdGFydCBvZiB0aGUgbWludXRlIGZvciB0aGUgZ2l2ZW4gZGF0ZVxuICpcbiAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9zdGFydE9mTWludXRlYFxuICogZG8gbm90IG1ha2UgY2hhbmdlcyB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmdcbiAqXG4gKiBTZWUgY29tbWVudHMgb24gaHR0cHM6Ly9naXRodWIuY29tL0hhY2tlcjB4MDEvcmVhY3QtZGF0ZXBpY2tlci9wdWxsLzQyNDRcbiAqIGZvciBtb3JlIGRldGFpbHNcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGQgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHN0YXJ0IG9mIHRoZSBtaW51dGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZNaW51dGUoZCkge1xuICBjb25zdCBzZWNvbmRzID0gZC5nZXRTZWNvbmRzKCk7XG4gIGNvbnN0IG1pbGxpc2Vjb25kcyA9IGQuZ2V0TWlsbGlzZWNvbmRzKCk7XG5cbiAgcmV0dXJuIHRvRGF0ZShkLmdldFRpbWUoKSAtIHNlY29uZHMgKiAxMDAwIC0gbWlsbGlzZWNvbmRzKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBtaW51dGVcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGEgRFNUIGFuZCB0aW1lem9uZS1zYWZlIGFuYWxvZyBvZiBgZGF0ZS1mbnMvaXNTYW1lTWludXRlYFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZDFcbiAqIEBwYXJhbSB7RGF0ZX0gZDJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lTWludXRlKGQxLCBkMikge1xuICByZXR1cm4gc3RhcnRPZk1pbnV0ZShkMSkuZ2V0VGltZSgpID09PSBzdGFydE9mTWludXRlKGQyKS5nZXRUaW1lKCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNsb25lZCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZSAoMDA6MDA6MDApXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIFRoZSBkYXRlIGZvciB3aGljaCBtaWRuaWdodCB0aW1lIGlzIHJlcXVpcmVkXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVUb0NvbXBhcmUgdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJucyB7RGF0ZX0gQSBuZXcgZGF0ZXRpbWUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5wdXQgZGF0ZSB3aXRoIG1pZG5pZ2h0IHRpbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1pZG5pZ2h0RGF0ZShkYXRlKSB7XG4gIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlXCIpO1xuICB9XG5cbiAgY29uc3QgZGF0ZVdpdGhvdXRUaW1lID0gbmV3IERhdGUoZGF0ZSk7XG4gIGRhdGVXaXRob3V0VGltZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGVXaXRob3V0VGltZTtcbn1cblxuLyoqXG4gKiBJcyB0aGUgZmlyc3QgZGF0ZSBiZWZvcmUgdGhlIHNlY29uZCBvbmU/XG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIFRoZSBkYXRlIHRoYXQgc2hvdWxkIGJlIGJlZm9yZSB0aGUgb3RoZXIgb25lIHRvIHJldHVybiB0cnVlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVUb0NvbXBhcmUgVGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmQgZGF0ZVxuICpcbiAqIE5vdGU6XG4gKiAgVGhpcyBmdW5jdGlvbiBjb25zaWRlcnMgdGhlIG1pZC1uaWdodCBvZiB0aGUgZ2l2ZW4gZGF0ZXMgZm9yIGNvbXBhcmlzb24uXG4gKiAgSXQgZXZhbHVhdGVzIHdoZXRoZXIgZGF0ZSBpcyBiZWZvcmUgZGF0ZVRvQ29tcGFyZSBiYXNlZCBvbiB0aGVpciBtaWQtbmlnaHQgdGltZXN0YW1wcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZUJlZm9yZShkYXRlLCBkYXRlVG9Db21wYXJlKSB7XG4gIGlmICghaXNEYXRlKGRhdGUpIHx8ICFpc0RhdGUoZGF0ZVRvQ29tcGFyZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgcmVjZWl2ZWRcIik7XG4gIH1cblxuICBjb25zdCBtaWRuaWdodERhdGUgPSBnZXRNaWRuaWdodERhdGUoZGF0ZSk7XG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlVG9Db21wYXJlKTtcblxuICByZXR1cm4gaXNCZWZvcmUobWlkbmlnaHREYXRlLCBtaWRuaWdodERhdGVUb0NvbXBhcmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTcGFjZUtleURvd24oZXZlbnQpIHtcbiAgY29uc3QgU1BBQ0VfS0VZID0gXCIgXCI7XG4gIHJldHVybiBldmVudC5rZXkgPT09IFNQQUNFX0tFWTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBjcmVhdGVSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHsgZ2V0WWVhciB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVZZWFycyh5ZWFyLCBub09mWWVhciwgbWluRGF0ZSwgbWF4RGF0ZSkge1xuICBjb25zdCBsaXN0ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMiAqIG5vT2ZZZWFyICsgMTsgaSsrKSB7XG4gICAgY29uc3QgbmV3WWVhciA9IHllYXIgKyBub09mWWVhciAtIGk7XG4gICAgbGV0IGlzSW5SYW5nZSA9IHRydWU7XG5cbiAgICBpZiAobWluRGF0ZSkge1xuICAgICAgaXNJblJhbmdlID0gZ2V0WWVhcihtaW5EYXRlKSA8PSBuZXdZZWFyO1xuICAgIH1cblxuICAgIGlmIChtYXhEYXRlICYmIGlzSW5SYW5nZSkge1xuICAgICAgaXNJblJhbmdlID0gZ2V0WWVhcihtYXhEYXRlKSA+PSBuZXdZZWFyO1xuICAgIH1cblxuICAgIGlmIChpc0luUmFuZ2UpIHtcbiAgICAgIGxpc3QucHVzaChuZXdZZWFyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhckRyb3Bkb3duT3B0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgeyB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyLCBzY3JvbGxhYmxlWWVhckRyb3Bkb3duIH0gPSBwcm9wcztcbiAgICBjb25zdCBub09mWWVhciA9XG4gICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyIHx8IChzY3JvbGxhYmxlWWVhckRyb3Bkb3duID8gMTAgOiA1KTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB5ZWFyc0xpc3Q6IGdlbmVyYXRlWWVhcnMoXG4gICAgICAgIHRoaXMucHJvcHMueWVhcixcbiAgICAgICAgbm9PZlllYXIsXG4gICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgKSxcbiAgICB9O1xuICAgIHRoaXMuZHJvcGRvd25SZWYgPSBjcmVhdGVSZWYoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGRyb3Bkb3duQ3VycmVudCA9IHRoaXMuZHJvcGRvd25SZWYuY3VycmVudDtcblxuICAgIGlmIChkcm9wZG93bkN1cnJlbnQpIHtcbiAgICAgIC8vIEdldCBhcnJheSBmcm9tIEhUTUxDb2xsZWN0aW9uXG4gICAgICBjb25zdCBkcm9wZG93bkN1cnJlbnRDaGlsZHJlbiA9IGRyb3Bkb3duQ3VycmVudC5jaGlsZHJlblxuICAgICAgICA/IEFycmF5LmZyb20oZHJvcGRvd25DdXJyZW50LmNoaWxkcmVuKVxuICAgICAgICA6IG51bGw7XG4gICAgICBjb25zdCBzZWxlY3RlZFllYXJPcHRpb25FbCA9IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuXG4gICAgICAgID8gZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4uZmluZCgoY2hpbGRFbCkgPT4gY2hpbGRFbC5hcmlhU2VsZWN0ZWQpXG4gICAgICAgIDogbnVsbDtcblxuICAgICAgZHJvcGRvd25DdXJyZW50LnNjcm9sbFRvcCA9IHNlbGVjdGVkWWVhck9wdGlvbkVsXG4gICAgICAgID8gc2VsZWN0ZWRZZWFyT3B0aW9uRWwub2Zmc2V0VG9wICtcbiAgICAgICAgICAoc2VsZWN0ZWRZZWFyT3B0aW9uRWwuY2xpZW50SGVpZ2h0IC0gZHJvcGRvd25DdXJyZW50LmNsaWVudEhlaWdodCkgLyAyXG4gICAgICAgIDogKGRyb3Bkb3duQ3VycmVudC5zY3JvbGxIZWlnaHQgLSBkcm9wZG93bkN1cnJlbnQuY2xpZW50SGVpZ2h0KSAvIDI7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZFllYXIgPSB0aGlzLnByb3BzLnllYXI7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuc3RhdGUueWVhcnNMaXN0Lm1hcCgoeWVhcikgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgIHNlbGVjdGVkWWVhciA9PT0geWVhclxuICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uLS1zZWxlY3RlZF95ZWFyXCJcbiAgICAgICAgICAgIDogXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgIH1cbiAgICAgICAga2V5PXt5ZWFyfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgeWVhcil9XG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbGVjdGVkWWVhciA9PT0geWVhciA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICB7c2VsZWN0ZWRZZWFyID09PSB5ZWFyID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uLS1zZWxlY3RlZFwiPuKckzwvc3Bhbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBcIlwiXG4gICAgICAgICl9XG4gICAgICAgIHt5ZWFyfVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG5cbiAgICBjb25zdCBtaW5ZZWFyID0gdGhpcy5wcm9wcy5taW5EYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1pbkRhdGUpIDogbnVsbDtcbiAgICBjb25zdCBtYXhZZWFyID0gdGhpcy5wcm9wcy5tYXhEYXRlID8gZ2V0WWVhcih0aGlzLnByb3BzLm1heERhdGUpIDogbnVsbDtcblxuICAgIGlmICghbWF4WWVhciB8fCAhdGhpcy5zdGF0ZS55ZWFyc0xpc3QuZmluZCgoeWVhcikgPT4geWVhciA9PT0gbWF4WWVhcikpIHtcbiAgICAgIG9wdGlvbnMudW5zaGlmdChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgICBrZXk9e1widXBjb21pbmdcIn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmluY3JlbWVudFllYXJzfVxuICAgICAgICA+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbiByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycyByZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS15ZWFycy11cGNvbWluZ1wiIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFtaW5ZZWFyIHx8ICF0aGlzLnN0YXRlLnllYXJzTGlzdC5maW5kKCh5ZWFyKSA9PiB5ZWFyID09PSBtaW5ZZWFyKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICAgIGtleT17XCJwcmV2aW91c1wifVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZGVjcmVtZW50WWVhcnN9XG4gICAgICAgID5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzLXByZXZpb3VzXCIgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICBvbkNoYW5nZSA9ICh5ZWFyKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIHNoaWZ0WWVhcnMgPSAoYW1vdW50KSA9PiB7XG4gICAgY29uc3QgeWVhcnMgPSB0aGlzLnN0YXRlLnllYXJzTGlzdC5tYXAoZnVuY3Rpb24gKHllYXIpIHtcbiAgICAgIHJldHVybiB5ZWFyICsgYW1vdW50O1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB5ZWFyc0xpc3Q6IHllYXJzLFxuICAgIH0pO1xuICB9O1xuXG4gIGluY3JlbWVudFllYXJzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnNoaWZ0WWVhcnMoMSk7XG4gIH07XG5cbiAgZGVjcmVtZW50WWVhcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRZZWFycygtMSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBkcm9wZG93bkNsYXNzID0gY2xzeCh7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd25cIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi0tc2Nyb2xsYWJsZVwiOlxuICAgICAgICB0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd24sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Ryb3Bkb3duQ2xhc3N9IHJlZj17dGhpcy5kcm9wZG93blJlZn0+XG4gICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBZZWFyRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL3llYXJfZHJvcGRvd25fb3B0aW9uc1wiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuaW1wb3J0IHsgZ2V0WWVhciB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgV3JhcHBlZFllYXJEcm9wZG93bk9wdGlvbnMgPSBvbkNsaWNrT3V0c2lkZShZZWFyRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhckRyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJvcGRvd25WaXNpYmxlOiBmYWxzZSxcbiAgfTtcblxuICByZW5kZXJTZWxlY3RPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLnByb3BzLm1pbkRhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWluRGF0ZSkgOiAxOTAwO1xuICAgIGNvbnN0IG1heFllYXIgPSB0aGlzLnByb3BzLm1heERhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWF4RGF0ZSkgOiAyMTAwO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSBtaW5ZZWFyOyBpIDw9IG1heFllYXI7IGkrKykge1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2l9PlxuICAgICAgICAgIHtpfVxuICAgICAgICA8L29wdGlvbj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICBvblNlbGVjdENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0TW9kZSA9ICgpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1zZWxlY3RcIlxuICAgICAgb25DaGFuZ2U9e3RoaXMub25TZWxlY3RDaGFuZ2V9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucygpfVxuICAgIDwvc2VsZWN0PlxuICApO1xuXG4gIHJlbmRlclJlYWRWaWV3ID0gKHZpc2libGUpID0+IChcbiAgICA8ZGl2XG4gICAgICBrZXk9XCJyZWFkXCJcbiAgICAgIHN0eWxlPXt7IHZpc2liaWxpdHk6IHZpc2libGUgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIgfX1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItcmVhZC12aWV3XCJcbiAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bihldmVudCl9XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXctLXNlbGVjdGVkLXllYXJcIj5cbiAgICAgICAge3RoaXMucHJvcHMueWVhcn1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJEcm9wZG93biA9ICgpID0+IChcbiAgICA8V3JhcHBlZFllYXJEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIHllYXI9e3RoaXMucHJvcHMueWVhcn1cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBvbkNoYW5nZSA9ICh5ZWFyKSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIGlmICh5ZWFyID09PSB0aGlzLnByb3BzLnllYXIpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHllYXIpO1xuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5wcm9wcy5kYXRlLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyQ2hhbmdlID0gKGRhdGUsIGV2ZW50KSA9PiB7XG4gICAgdGhpcy5vblNlbGVjdChkYXRlLCBldmVudCk7XG4gICAgdGhpcy5zZXRPcGVuKCk7XG4gIH07XG5cbiAgb25TZWxlY3QgPSAoZGF0ZSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIHNldE9wZW4gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHJlbmRlcmVkRHJvcGRvd247XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRyb3Bkb3duTW9kZSkge1xuICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTY3JvbGxNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd24tY29udGFpbmVyIHJlYWN0LWRhdGVwaWNrZXJfX3llYXItZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aERyb3Bkb3duT3B0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBtb250aE5hbWVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgaXNTZWxlY3RlZE1vbnRoID0gKGkpID0+IHRoaXMucHJvcHMubW9udGggPT09IGk7XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5tb250aE5hbWVzLm1hcCgobW9udGgsIGkpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRNb250aChpKVxuICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbiByZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb24tLXNlbGVjdGVkX21vbnRoXCJcbiAgICAgICAgICAgIDogXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1vcHRpb25cIlxuICAgICAgICB9XG4gICAgICAgIGtleT17bW9udGh9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBpKX1cbiAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkTW9udGgoaSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgID5cbiAgICAgICAge3RoaXMuaXNTZWxlY3RlZE1vbnRoKGkpID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbi0tc2VsZWN0ZWRcIj7inJM8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgXCJcIlxuICAgICAgICApfVxuICAgICAgICB7bW9udGh9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aCkgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aCk7XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4gdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93blwiPlxuICAgICAgICB7dGhpcy5yZW5kZXJPcHRpb25zKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgTW9udGhEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4vbW9udGhfZHJvcGRvd25fb3B0aW9uc1wiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnMgPSBvbkNsaWNrT3V0c2lkZShNb250aERyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJvcGRvd25WaXNpYmxlOiBmYWxzZSxcbiAgfTtcblxuICByZW5kZXJTZWxlY3RPcHRpb25zID0gKG1vbnRoTmFtZXMpID0+XG4gICAgbW9udGhOYW1lcy5tYXAoKE0sIGkpID0+IChcbiAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17aX0+XG4gICAgICAgIHtNfVxuICAgICAgPC9vcHRpb24+XG4gICAgKSk7XG5cbiAgcmVuZGVyU2VsZWN0TW9kZSA9IChtb250aE5hbWVzKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1zZWxlY3RcIlxuICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKG1vbnRoTmFtZXMpfVxuICAgIDwvc2VsZWN0PlxuICApO1xuXG4gIHJlbmRlclJlYWRWaWV3ID0gKHZpc2libGUsIG1vbnRoTmFtZXMpID0+IChcbiAgICA8ZGl2XG4gICAgICBrZXk9XCJyZWFkXCJcbiAgICAgIHN0eWxlPXt7IHZpc2liaWxpdHk6IHZpc2libGUgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIgfX1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlld1wiXG4gICAgICBvbkNsaWNrPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1yZWFkLXZpZXctLXNlbGVjdGVkLW1vbnRoXCI+XG4gICAgICAgIHttb250aE5hbWVzW3RoaXMucHJvcHMubW9udGhdfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKG1vbnRoTmFtZXMpID0+IChcbiAgICA8V3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICBtb250aD17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgIG1vbnRoTmFtZXM9e21vbnRoTmFtZXN9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9IChtb250aE5hbWVzKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUsIG1vbnRoTmFtZXMpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKG1vbnRoTmFtZXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aCkgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcbiAgICBpZiAobW9udGggIT09IHRoaXMucHJvcHMubW9udGgpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobW9udGgpO1xuICAgIH1cbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9ICgpID0+XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbW9udGhOYW1lcyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdLm1hcChcbiAgICAgIHRoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd25cbiAgICAgICAgPyAoTSkgPT4gdXRpbHMuZ2V0TW9udGhTaG9ydEluTG9jYWxlKE0sIHRoaXMucHJvcHMubG9jYWxlKVxuICAgICAgICA6IChNKSA9PiB1dGlscy5nZXRNb250aEluTG9jYWxlKE0sIHRoaXMucHJvcHMubG9jYWxlKSxcbiAgICApO1xuXG4gICAgbGV0IHJlbmRlcmVkRHJvcGRvd247XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRyb3Bkb3duTW9kZSkge1xuICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTY3JvbGxNb2RlKG1vbnRoTmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZShtb250aE5hbWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd24tY29udGFpbmVyIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHtcbiAgYWRkTW9udGhzLFxuICBmb3JtYXREYXRlLFxuICBnZXRTdGFydE9mTW9udGgsXG4gIG5ld0RhdGUsXG4gIGlzQWZ0ZXIsXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBnZXRUaW1lLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTW9udGhZZWFycyhtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcblxuICBsZXQgY3VyckRhdGUgPSBnZXRTdGFydE9mTW9udGgobWluRGF0ZSk7XG4gIGNvbnN0IGxhc3REYXRlID0gZ2V0U3RhcnRPZk1vbnRoKG1heERhdGUpO1xuXG4gIHdoaWxlICghaXNBZnRlcihjdXJyRGF0ZSwgbGFzdERhdGUpKSB7XG4gICAgbGlzdC5wdXNoKG5ld0RhdGUoY3VyckRhdGUpKTtcblxuICAgIGN1cnJEYXRlID0gYWRkTW9udGhzKGN1cnJEYXRlLCAxKTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbW9udGhZZWFyc0xpc3Q6IGdlbmVyYXRlTW9udGhZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm1vbnRoWWVhcnNMaXN0Lm1hcCgobW9udGhZZWFyKSA9PiB7XG4gICAgICBjb25zdCBtb250aFllYXJQb2ludCA9IGdldFRpbWUobW9udGhZZWFyKTtcbiAgICAgIGNvbnN0IGlzU2FtZU1vbnRoWWVhciA9XG4gICAgICAgIGlzU2FtZVllYXIodGhpcy5wcm9wcy5kYXRlLCBtb250aFllYXIpICYmXG4gICAgICAgIGlzU2FtZU1vbnRoKHRoaXMucHJvcHMuZGF0ZSwgbW9udGhZZWFyKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICBpc1NhbWVNb250aFllYXJcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItb3B0aW9uLS1zZWxlY3RlZF9tb250aC15ZWFyXCJcbiAgICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItb3B0aW9uXCJcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5PXttb250aFllYXJQb2ludH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgbW9udGhZZWFyUG9pbnQpfVxuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzU2FtZU1vbnRoWWVhciA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAge2lzU2FtZU1vbnRoWWVhciA/IChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItb3B0aW9uLS1zZWxlY3RlZFwiPlxuICAgICAgICAgICAgICDinJNcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAge2Zvcm1hdERhdGUobW9udGhZZWFyLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoWWVhcikgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aFllYXIpO1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBkcm9wZG93bkNsYXNzID0gY2xzeCh7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd25cIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93bi0tc2Nyb2xsYWJsZVwiOlxuICAgICAgICB0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30+e3RoaXMucmVuZGVyT3B0aW9ucygpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnNcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcbmltcG9ydCB7XG4gIGFkZE1vbnRocyxcbiAgZm9ybWF0RGF0ZSxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBpc0FmdGVyLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lWWVhcixcbiAgbmV3RGF0ZSxcbiAgZ2V0VGltZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG52YXIgV3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoWWVhckRyb3Bkb3duIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyb3Bkb3duVmlzaWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBsZXQgY3VyckRhdGUgPSBnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5taW5EYXRlKTtcbiAgICBjb25zdCBsYXN0RGF0ZSA9IGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLm1heERhdGUpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgIHdoaWxlICghaXNBZnRlcihjdXJyRGF0ZSwgbGFzdERhdGUpKSB7XG4gICAgICBjb25zdCB0aW1lUG9pbnQgPSBnZXRUaW1lKGN1cnJEYXRlKTtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e3RpbWVQb2ludH0gdmFsdWU9e3RpbWVQb2ludH0+XG4gICAgICAgICAge2Zvcm1hdERhdGUoY3VyckRhdGUsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L29wdGlvbj4sXG4gICAgICApO1xuXG4gICAgICBjdXJyRGF0ZSA9IGFkZE1vbnRocyhjdXJyRGF0ZSwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgb25TZWxlY3RDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlclNlbGVjdE1vZGUgPSAoKSA9PiAoXG4gICAgPHNlbGVjdFxuICAgICAgdmFsdWU9e2dldFRpbWUoZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMuZGF0ZSkpfVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1zZWxlY3RcIlxuICAgICAgb25DaGFuZ2U9e3RoaXMub25TZWxlY3RDaGFuZ2V9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyU2VsZWN0T3B0aW9ucygpfVxuICAgIDwvc2VsZWN0PlxuICApO1xuXG4gIHJlbmRlclJlYWRWaWV3ID0gKHZpc2libGUpID0+IHtcbiAgICBjb25zdCB5ZWFyTW9udGggPSBmb3JtYXREYXRlKFxuICAgICAgdGhpcy5wcm9wcy5kYXRlLFxuICAgICAgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT1cInJlYWRcIlxuICAgICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiB2aXNpYmxlID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiIH19XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3XCJcbiAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXctLWRvd24tYXJyb3dcIiAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGgteWVhclwiPlxuICAgICAgICAgIHt5ZWFyTW9udGh9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAoKSA9PiAoXG4gICAgPFdyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIGRhdGU9e3RoaXMucHJvcHMuZGF0ZX1cbiAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoWWVhclBvaW50KSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuXG4gICAgY29uc3QgY2hhbmdlZERhdGUgPSBuZXdEYXRlKHBhcnNlSW50KG1vbnRoWWVhclBvaW50KSk7XG5cbiAgICBpZiAoXG4gICAgICBpc1NhbWVZZWFyKHRoaXMucHJvcHMuZGF0ZSwgY2hhbmdlZERhdGUpICYmXG4gICAgICBpc1NhbWVNb250aCh0aGlzLnByb3BzLmRhdGUsIGNoYW5nZWREYXRlKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hhbmdlZERhdGUpO1xuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7XG4gIGdldERheSxcbiAgZ2V0TW9udGgsXG4gIGdldERhdGUsXG4gIG5ld0RhdGUsXG4gIGlzU2FtZURheSxcbiAgaXNEYXlEaXNhYmxlZCxcbiAgaXNEYXlFeGNsdWRlZCxcbiAgaXNEYXlJblJhbmdlLFxuICBpc0VxdWFsLFxuICBpc0JlZm9yZSxcbiAgaXNBZnRlcixcbiAgZ2V0RGF5T2ZXZWVrQ29kZSxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGZvcm1hdERhdGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25Nb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c0RheShwcmV2UHJvcHMpO1xuICB9XG5cbiAgZGF5RWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKCkgJiYgdGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb3VzZUVudGVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uTW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbk1vdXNlRW50ZXIoZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc1NhbWVEYXkgPSAob3RoZXIpID0+IGlzU2FtZURheSh0aGlzLnByb3BzLmRheSwgb3RoZXIpO1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzU2VsZWN0ZWREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGVcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzPy5zb21lKChkYXRlKSA9PiB0aGlzLmlzU2FtZURheU9yV2VlayhkYXRlKSlcbiAgICAgIDogdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG5cbiAgICByZXR1cm4gIWlzU2VsZWN0ZWREYXRlICYmIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgfTtcblxuICBpc0Rpc2FibGVkID0gKCkgPT4gaXNEYXlEaXNhYmxlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNFeGNsdWRlZCA9ICgpID0+IGlzRGF5RXhjbHVkZWQodGhpcy5wcm9wcy5kYXksIHRoaXMucHJvcHMpO1xuXG4gIGlzU3RhcnRPZldlZWsgPSAoKSA9PlxuICAgIGlzU2FtZURheShcbiAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgKSxcbiAgICApO1xuXG4gIGlzU2FtZVdlZWsgPSAob3RoZXIpID0+XG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgIGlzU2FtZURheShcbiAgICAgIG90aGVyLFxuICAgICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgKSxcbiAgICApO1xuXG4gIGlzU2FtZURheU9yV2VlayA9IChvdGhlcikgPT4gdGhpcy5pc1NhbWVEYXkob3RoZXIpIHx8IHRoaXMuaXNTYW1lV2VlayhvdGhlcik7XG5cbiAgZ2V0SGlnaExpZ2h0ZWRDbGFzcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgaGlnaGxpZ2h0RGF0ZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWhpZ2hsaWdodERhdGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2YgeydkYXkgc3RyaW5nLCAnY2xhc3NOYW1lJ31cbiAgICBjb25zdCBkYXlTdHIgPSBmb3JtYXREYXRlKGRheSwgXCJNTS5kZC55eXl5XCIpO1xuICAgIHJldHVybiBoaWdobGlnaHREYXRlcy5nZXQoZGF5U3RyKTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiB0byByZXR1cm4gdGhlIGFycmF5IGNvbnRhaW5pbmcgY2xhc3NuYW1lIGFzc29jaWF0ZWQgdG8gdGhlIGRhdGVcbiAgZ2V0SG9saWRheXNDbGFzcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgaG9saWRheXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFob2xpZGF5cykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBkYXlTdHIgPSBmb3JtYXREYXRlKGRheSwgXCJNTS5kZC55eXl5XCIpO1xuICAgIC8vIExvb2tpbmcgZm9yIGNsYXNzTmFtZSBpbiB0aGUgTWFwIG9mIHtkYXkgc3RyaW5nOiB7Y2xhc3NOYW1lLCBob2xpZGF5TmFtZX19XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhkYXlTdHIpKSB7XG4gICAgICByZXR1cm4gW2hvbGlkYXlzLmdldChkYXlTdHIpLmNsYXNzTmFtZV07XG4gICAgfVxuICB9O1xuXG4gIGlzSW5SYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzZWxlY3RzU3RhcnQsXG4gICAgICBzZWxlY3RzRW5kLFxuICAgICAgc2VsZWN0c1JhbmdlLFxuICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChcbiAgICAgICEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fFxuICAgICAgIXNlbGVjdGluZ0RhdGUgfHxcbiAgICAgICghc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UgJiYgdGhpcy5pc0Rpc2FibGVkKCkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c1N0YXJ0ICYmXG4gICAgICBlbmREYXRlICYmXG4gICAgICAoaXNCZWZvcmUoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzZWxlY3RpbmdEYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzRW5kICYmXG4gICAgICBzdGFydERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c1JhbmdlICYmXG4gICAgICBzdGFydERhdGUgJiZcbiAgICAgICFlbmREYXRlICYmXG4gICAgICAoaXNBZnRlcihzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlU3RhcnQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzdGFydERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlRW5kID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBlbmREYXRlLCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgZW5kRGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoc3RhcnREYXRlLCBkYXkpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYW1lRGF5KGVuZERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNXZWVrZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHdlZWtkYXkgPSBnZXREYXkodGhpcy5wcm9wcy5kYXkpO1xuICAgIHJldHVybiB3ZWVrZGF5ID09PSAwIHx8IHdlZWtkYXkgPT09IDY7XG4gIH07XG5cbiAgaXNBZnRlck1vbnRoID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnByb3BzLm1vbnRoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICh0aGlzLnByb3BzLm1vbnRoICsgMSkgJSAxMiA9PT0gZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpXG4gICAgKTtcbiAgfTtcblxuICBpc0JlZm9yZU1vbnRoID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnByb3BzLm1vbnRoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIChnZXRNb250aCh0aGlzLnByb3BzLmRheSkgKyAxKSAlIDEyID09PSB0aGlzLnByb3BzLm1vbnRoXG4gICAgKTtcbiAgfTtcblxuICBpc0N1cnJlbnREYXkgPSAoKSA9PiB0aGlzLmlzU2FtZURheShuZXdEYXRlKCkpO1xuXG4gIGlzU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzPy5zb21lKChkYXRlKSA9PlxuICAgICAgICB0aGlzLmlzU2FtZURheU9yV2VlayhkYXRlKSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgfTtcblxuICBnZXRDbGFzc05hbWVzID0gKGRhdGUpID0+IHtcbiAgICBjb25zdCBkYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLmRheUNsYXNzTmFtZVxuICAgICAgPyB0aGlzLnByb3BzLmRheUNsYXNzTmFtZShkYXRlKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheVwiLFxuICAgICAgZGF5Q2xhc3NOYW1lLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLVwiICsgZ2V0RGF5T2ZXZWVrQ29kZSh0aGlzLnByb3BzLmRheSksXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1kaXNhYmxlZFwiOiB0aGlzLmlzRGlzYWJsZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWV4Y2x1ZGVkXCI6IHRoaXMuaXNFeGNsdWRlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1rZXlib2FyZC1zZWxlY3RlZFwiOiB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjogdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZVN0YXJ0KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlRW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudERheSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0td2Vla2VuZFwiOiB0aGlzLmlzV2Vla2VuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tb3V0c2lkZS1tb250aFwiOlxuICAgICAgICAgIHRoaXMuaXNBZnRlck1vbnRoKCkgfHwgdGhpcy5pc0JlZm9yZU1vbnRoKCksXG4gICAgICB9LFxuICAgICAgdGhpcy5nZXRIaWdoTGlnaHRlZENsYXNzKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiKSxcbiAgICAgIHRoaXMuZ2V0SG9saWRheXNDbGFzcygpLFxuICAgICk7XG4gIH07XG5cbiAgZ2V0QXJpYUxhYmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkID0gXCJDaG9vc2VcIixcbiAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZCA9IFwiTm90IGF2YWlsYWJsZVwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgcHJlZml4ID1cbiAgICAgIHRoaXMuaXNEaXNhYmxlZCgpIHx8IHRoaXMuaXNFeGNsdWRlZCgpXG4gICAgICAgID8gYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkXG4gICAgICAgIDogYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSAke2Zvcm1hdERhdGUoZGF5LCBcIlBQUFBcIiwgdGhpcy5wcm9wcy5sb2NhbGUpfWA7XG4gIH07XG5cbiAgLy8gQSBmdW5jdGlvbiB0byByZXR1cm4gdGhlIGhvbGlkYXkncyBuYW1lIGFzIHRpdGxlJ3MgY29udGVudFxuICBnZXRUaXRsZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgaG9saWRheXMgPSBuZXcgTWFwKCksIGV4Y2x1ZGVEYXRlcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb21wYXJlRHQgPSBmb3JtYXREYXRlKGRheSwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IHRpdGxlcyA9IFtdO1xuICAgIGlmIChob2xpZGF5cy5oYXMoY29tcGFyZUR0KSkge1xuICAgICAgdGl0bGVzLnB1c2goLi4uaG9saWRheXMuZ2V0KGNvbXBhcmVEdCkuaG9saWRheU5hbWVzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNFeGNsdWRlZCgpKSB7XG4gICAgICB0aXRsZXMucHVzaChcbiAgICAgICAgZXhjbHVkZURhdGVzXG4gICAgICAgICAgPy5maWx0ZXIoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICAgICAgaXNTYW1lRGF5KGV4Y2x1ZGVEYXRlLmRhdGUgPyBleGNsdWRlRGF0ZS5kYXRlIDogZXhjbHVkZURhdGUsIGRheSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5tYXAoKGV4Y2x1ZGVEYXRlKSA9PiBleGNsdWRlRGF0ZS5tZXNzYWdlKSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZXMuam9pbihcIiwgXCIpO1xuICB9O1xuXG4gIGdldFRhYkluZGV4ID0gKHNlbGVjdGVkLCBwcmVTZWxlY3Rpb24pID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHNlbGVjdGVkIHx8IHRoaXMucHJvcHMuc2VsZWN0ZWQ7XG4gICAgY29uc3QgcHJlU2VsZWN0aW9uRGF5ID0gcHJlU2VsZWN0aW9uIHx8IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICEoXG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICAgICAgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIgfHwgIXRoaXMuaXNTdGFydE9mV2VlaygpKVxuICAgICAgKSAmJlxuICAgICAgKHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCkgfHxcbiAgICAgICAgKHRoaXMuaXNTYW1lRGF5KHNlbGVjdGVkRGF5KSAmJlxuICAgICAgICAgIGlzU2FtZURheShwcmVTZWxlY3Rpb25EYXksIHNlbGVjdGVkRGF5KSkpXG4gICAgICAgID8gMFxuICAgICAgICA6IC0xO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIC8vIHZhcmlvdXMgY2FzZXMgd2hlbiB3ZSBuZWVkIHRvIGFwcGx5IGZvY3VzIHRvIHRoZSBwcmVzZWxlY3RlZCBkYXlcbiAgLy8gZm9jdXMgdGhlIGRheSBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzRGF5ID0gKHByZXZQcm9wcyA9IHt9KSA9PiB7XG4gICAgbGV0IHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgLy8gb25seSBkbyB0aGlzIHdoaWxlIHRoZSBpbnB1dCBpc24ndCBmb2N1c2VkXG4gICAgLy8gb3RoZXJ3aXNlLCB0eXBpbmcvYmFja3NwYWNpbmcgdGhlIGRhdGUgbWFudWFsbHkgbWF5IHN0ZWFsIGZvY3VzIGF3YXkgZnJvbSB0aGUgaW5wdXRcbiAgICBpZiAoXG4gICAgICB0aGlzLmdldFRhYkluZGV4KCkgPT09IDAgJiZcbiAgICAgICFwcmV2UHJvcHMuaXNJbnB1dEZvY3VzZWQgJiZcbiAgICAgIHRoaXMuaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKVxuICAgICkge1xuICAgICAgLy8gdGhlcmUgaXMgY3VycmVudGx5IG5vIGFjdGl2ZUVsZW1lbnQgYW5kIG5vdCBpbmxpbmVcbiAgICAgIGlmICghZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlIGFjdGl2ZUVsZW1lbnQgaXMgaW4gdGhlIGNvbnRhaW5lciwgYW5kIGl0IGlzIGFub3RoZXIgaW5zdGFuY2Ugb2YgRGF5XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInJlYWN0LWRhdGVwaWNrZXJfX2RheVwiKVxuICAgICAgKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vZGF5IGlzIG9uZSBvZiB0aGUgbm9uIHJlbmRlcmVkIGR1cGxpY2F0ZSBkYXlzXG4gICAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ICYmIHRoaXMuaXNCZWZvcmVNb250aCgpKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkRm9jdXNEYXkgJiYgdGhpcy5kYXlFbC5jdXJyZW50Py5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIH07XG5cbiAgcmVuZGVyRGF5Q29udGVudHMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgJiYgdGhpcy5pc0FmdGVyTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c1xuICAgICAgPyB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzKGdldERhdGUodGhpcy5wcm9wcy5kYXkpLCB0aGlzLnByb3BzLmRheSlcbiAgICAgIDogZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSk7XG4gIH07XG5cbiAgcmVuZGVyID0gKCkgPT4gKFxuICAgIDxkaXZcbiAgICAgIHJlZj17dGhpcy5kYXlFbH1cbiAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKHRoaXMucHJvcHMuZGF5KX1cbiAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUVudGVyIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUVudGVyIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleCgpfVxuICAgICAgYXJpYS1sYWJlbD17dGhpcy5nZXRBcmlhTGFiZWwoKX1cbiAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgdGl0bGU9e3RoaXMuZ2V0VGl0bGUoKX1cbiAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZCgpfVxuICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudERheSgpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWQoKSB8fCB0aGlzLmlzSW5SYW5nZSgpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlckRheUNvbnRlbnRzKCl9XG4gICAgICB7dGhpcy5nZXRUaXRsZSgpICE9PSBcIlwiICYmIChcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib3ZlcmxheVwiPnt0aGlzLmdldFRpdGxlKCl9PC9zcGFuPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHsgaXNTYW1lRGF5IH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWVrTnVtYmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFyaWFMYWJlbFByZWZpeDogXCJ3ZWVrIFwiLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHdlZWtOdW1iZXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKEVsZW1lbnQpIH0pLFxuICAgIF0pLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNXZWVrTnVtYmVyKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c1dlZWtOdW1iZXIocHJldlByb3BzKTtcbiAgfVxuXG4gIHdlZWtOdW1iZXJFbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIiBcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmtleSA9IFwiRW50ZXJcIjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT5cbiAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICFpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgIGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICBnZXRUYWJJbmRleCA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgIHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIgJiZcbiAgICAodGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSB8fFxuICAgICAgKGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgICAgIGlzU2FtZURheSh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgdGhpcy5wcm9wcy5zZWxlY3RlZCkpKVxuICAgICAgPyAwXG4gICAgICA6IC0xO1xuXG4gIC8vIHZhcmlvdXMgY2FzZXMgd2hlbiB3ZSBuZWVkIHRvIGFwcGx5IGZvY3VzIHRvIHRoZSBwcmVzZWxlY3RlZCB3ZWVrLW51bWJlclxuICAvLyBmb2N1cyB0aGUgd2Vlay1udW1iZXIgb24gbW91bnQvdXBkYXRlIHNvIHRoYXQga2V5Ym9hcmQgbmF2aWdhdGlvbiB3b3JrcyB3aGlsZSBjeWNsaW5nIHRocm91Z2ggbW9udGhzIHdpdGggdXAgb3IgZG93biBrZXlzIChub3QgZm9yIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9ucylcbiAgLy8gcHJldmVudCBmb2N1cyBmb3IgdGhlc2UgYWN0aXZlRWxlbWVudCBjYXNlcyBzbyB3ZSBkb24ndCBwdWxsIGZvY3VzIGZyb20gdGhlIGlucHV0IGFzIHRoZSBjYWxlbmRhciBvcGVuc1xuICBoYW5kbGVGb2N1c1dlZWtOdW1iZXIgPSAocHJldlByb3BzID0ge30pID0+IHtcbiAgICBsZXQgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gZmFsc2U7XG4gICAgLy8gb25seSBkbyB0aGlzIHdoaWxlIHRoZSBpbnB1dCBpc24ndCBmb2N1c2VkXG4gICAgLy8gb3RoZXJ3aXNlLCB0eXBpbmcvYmFja3NwYWNpbmcgdGhlIGRhdGUgbWFudWFsbHkgbWF5IHN0ZWFsIGZvY3VzIGF3YXkgZnJvbSB0aGUgaW5wdXRcbiAgICBpZiAoXG4gICAgICB0aGlzLmdldFRhYkluZGV4KCkgPT09IDAgJiZcbiAgICAgICFwcmV2UHJvcHMuaXNJbnB1dEZvY3VzZWQgJiZcbiAgICAgIGlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKVxuICAgICkge1xuICAgICAgLy8gdGhlcmUgaXMgY3VycmVudGx5IG5vIGFjdGl2ZUVsZW1lbnQgYW5kIG5vdCBpbmxpbmVcbiAgICAgIGlmICghZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHNob3VsZEZvY3VzV2Vla051bWJlciA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBpbmxpbmUgdmVyc2lvbjpcbiAgICAgIC8vIGRvIG5vdCBmb2N1cyBvbiBpbml0aWFsIHJlbmRlciB0byBwcmV2ZW50IGF1dG9Gb2N1cyBpc3N1ZVxuICAgICAgLy8gZm9jdXMgYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQgdmlhIGtleWJvYXJkXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmUpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGUgYWN0aXZlRWxlbWVudCBpcyBpbiB0aGUgY29udGFpbmVyLCBhbmQgaXQgaXMgYW5vdGhlciBpbnN0YW5jZSBvZiBXZWVrTnVtYmVyXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFxuICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXJcIixcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHNob3VsZEZvY3VzV2Vla051bWJlciA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyICYmXG4gICAgICB0aGlzLndlZWtOdW1iZXJFbC5jdXJyZW50ICYmXG4gICAgICB0aGlzLndlZWtOdW1iZXJFbC5jdXJyZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB3ZWVrTnVtYmVyLCBhcmlhTGFiZWxQcmVmaXggPSBcIndlZWsgXCIsIG9uQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB3ZWVrTnVtYmVyQ2xhc3NlcyA9IHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXJcIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLWNsaWNrYWJsZVwiOiAhIW9uQ2xpY2ssXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyLS1zZWxlY3RlZFwiOlxuICAgICAgICAhIW9uQ2xpY2sgJiYgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyLS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgcmVmPXt0aGlzLndlZWtOdW1iZXJFbH1cbiAgICAgICAgY2xhc3NOYW1lPXtjbHN4KHdlZWtOdW1iZXJDbGFzc2VzKX1cbiAgICAgICAgYXJpYS1sYWJlbD17YCR7YXJpYUxhYmVsUHJlZml4fSAke3RoaXMucHJvcHMud2Vla051bWJlcn1gfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleCgpfVxuICAgICAgPlxuICAgICAgICB7d2Vla051bWJlcn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBEYXkgZnJvbSBcIi4vZGF5XCI7XG5pbXBvcnQgV2Vla051bWJlciBmcm9tIFwiLi93ZWVrX251bWJlclwiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5cbmltcG9ydCB7IGFkZERheXMsIGdldFdlZWssIGdldFN0YXJ0T2ZXZWVrLCBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWsgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICB9O1xuICB9XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVdlZWtDbGljayA9IChkYXksIHdlZWtOdW1iZXIsIGV2ZW50KSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdChkYXksIHdlZWtOdW1iZXIsIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGZvcm1hdFdlZWtOdW1iZXIgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXIoZGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBnZXRXZWVrKGRhdGUpO1xuICB9O1xuXG4gIHJlbmRlckRheXMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSB0aGlzLnN0YXJ0T2ZXZWVrKCk7XG4gICAgY29uc3QgZGF5cyA9IFtdO1xuICAgIGNvbnN0IHdlZWtOdW1iZXIgPSB0aGlzLmZvcm1hdFdlZWtOdW1iZXIoc3RhcnRPZldlZWspO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICBjb25zdCBvbkNsaWNrQWN0aW9uID1cbiAgICAgICAgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgICAgID8gdGhpcy5oYW5kbGVXZWVrQ2xpY2suYmluZCh0aGlzLCBzdGFydE9mV2Vlaywgd2Vla051bWJlcilcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGRheXMucHVzaChcbiAgICAgICAgPFdlZWtOdW1iZXJcbiAgICAgICAgICBrZXk9XCJXXCJcbiAgICAgICAgICB3ZWVrTnVtYmVyPXt3ZWVrTnVtYmVyfVxuICAgICAgICAgIGRhdGU9e3N0YXJ0T2ZXZWVrfVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2tBY3Rpb259XG4gICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuYXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyfVxuICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgLz4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5cy5jb25jYXQoXG4gICAgICBbMCwgMSwgMiwgMywgNCwgNSwgNl0ubWFwKChvZmZzZXQpID0+IHtcbiAgICAgICAgY29uc3QgZGF5ID0gYWRkRGF5cyhzdGFydE9mV2Vlaywgb2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8RGF5XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBrZXk9e2RheS52YWx1ZU9mKCl9XG4gICAgICAgICAgICBkYXk9e2RheX1cbiAgICAgICAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVEYXlDbGljay5iaW5kKHRoaXMsIGRheSl9XG4gICAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIuYmluZCh0aGlzLCBkYXkpfVxuICAgICAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgICBob2xpZGF5cz17dGhpcy5wcm9wcy5ob2xpZGF5c31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcn1cbiAgICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgc3RhcnRPZldlZWsgPSAoKSA9PlxuICAgIGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+XG4gICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAhaXNTYW1lRGF5KHRoaXMuc3RhcnRPZldlZWsoKSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICBpc1NhbWVEYXkodGhpcy5zdGFydE9mV2VlaygpLCB0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstLXNlbGVjdGVkXCI6IGlzU2FtZURheShcbiAgICAgICAgdGhpcy5zdGFydE9mV2VlaygpLFxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjogdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSxcbiAgICB9O1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xzeCh3ZWVrTnVtYmVyQ2xhc3Nlcyl9Pnt0aGlzLnJlbmRlckRheXMoKX08L2Rpdj47XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IFdlZWsgZnJvbSBcIi4vd2Vla1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVCA9IDY7XG5cbmNvbnN0IE1PTlRIX0NPTFVNTlNfTEFZT1VUID0ge1xuICBUV09fQ09MVU1OUzogXCJ0d29fY29sdW1uc1wiLFxuICBUSFJFRV9DT0xVTU5TOiBcInRocmVlX2NvbHVtbnNcIixcbiAgRk9VUl9DT0xVTU5TOiBcImZvdXJfY29sdW1uc1wiLFxufTtcbmNvbnN0IE1PTlRIX0NPTFVNTlMgPSB7XG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5UV09fQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMV0sXG4gICAgICBbMiwgM10sXG4gICAgICBbNCwgNV0sXG4gICAgICBbNiwgN10sXG4gICAgICBbOCwgOV0sXG4gICAgICBbMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogMixcbiAgfSxcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULlRIUkVFX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDEsIDJdLFxuICAgICAgWzMsIDQsIDVdLFxuICAgICAgWzYsIDcsIDhdLFxuICAgICAgWzksIDEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDMsXG4gIH0sXG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5GT1VSX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDEsIDIsIDNdLFxuICAgICAgWzQsIDUsIDYsIDddLFxuICAgICAgWzgsIDksIDEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDQsXG4gIH0sXG59O1xuY29uc3QgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCA9IDE7XG5cbmZ1bmN0aW9uIGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4pIHtcbiAgaWYgKHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyKSByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuRk9VUl9DT0xVTU5TO1xuICBpZiAoc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcikgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULlRXT19DT0xVTU5TO1xuICByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuVEhSRUVfQ09MVU1OUztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvcmRlckluRGlzcGxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldFByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93V2Vla051bWJlcnM6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbk1vbnRoS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgTU9OVEhfUkVGUyA9IFsuLi5BcnJheSgxMildLm1hcCgoKSA9PiBSZWFjdC5jcmVhdGVSZWYoKSk7XG4gIFFVQVJURVJfUkVGUyA9IFsuLi5BcnJheSg0KV0ubWFwKCgpID0+IFJlYWN0LmNyZWF0ZVJlZigpKTtcblxuICBpc0Rpc2FibGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RGlzYWJsZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNFeGNsdWRlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheUV4Y2x1ZGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCwgdGhpcy5wcm9wcy5vcmRlckluRGlzcGxheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0TW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKHV0aWxzLnNldE1vbnRoKGRheSwgbSksIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0UXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lUXVhcnRlcih1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZE1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aCh1dGlscy5zZXRNb250aChkYXksIG0pLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlRW5kUXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lUXVhcnRlcih1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKCEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fCAhc2VsZWN0aW5nRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzUmFuZ2UgJiYgc3RhcnREYXRlICYmICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydCA9IChtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aCA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzdGFydERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQgPSAobSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBlbmREYXRlLCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgZW5kRGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8ICFzZWxlY3RpbmdEYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzUmFuZ2UgJiYgc3RhcnREYXRlICYmICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzV2Vla0luTW9udGggPSAoc3RhcnRPZldlZWspID0+IHtcbiAgICBjb25zdCBkYXkgPSB0aGlzLnByb3BzLmRheTtcbiAgICBjb25zdCBlbmRPZldlZWsgPSB1dGlscy5hZGREYXlzKHN0YXJ0T2ZXZWVrLCA2KTtcbiAgICByZXR1cm4gKFxuICAgICAgdXRpbHMuaXNTYW1lTW9udGgoc3RhcnRPZldlZWssIGRheSkgfHwgdXRpbHMuaXNTYW1lTW9udGgoZW5kT2ZXZWVrLCBkYXkpXG4gICAgKTtcbiAgfTtcblxuICBpc0N1cnJlbnRNb250aCA9IChkYXksIG0pID0+XG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHV0aWxzLm5ld0RhdGUoKSkgJiZcbiAgICBtID09PSB1dGlscy5nZXRNb250aCh1dGlscy5uZXdEYXRlKCkpO1xuXG4gIGlzQ3VycmVudFF1YXJ0ZXIgPSAoZGF5LCBxKSA9PlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcih1dGlscy5uZXdEYXRlKCkpICYmXG4gICAgcSA9PT0gdXRpbHMuZ2V0UXVhcnRlcih1dGlscy5uZXdEYXRlKCkpO1xuXG4gIGlzU2VsZWN0ZWRNb250aCA9IChkYXksIG0sIHNlbGVjdGVkKSA9PlxuICAgIHV0aWxzLmdldE1vbnRoKHNlbGVjdGVkKSA9PT0gbSAmJlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcihzZWxlY3RlZCk7XG5cbiAgaXNTZWxlY3RlZFF1YXJ0ZXIgPSAoZGF5LCBxLCBzZWxlY3RlZCkgPT5cbiAgICB1dGlscy5nZXRRdWFydGVyKGRheSkgPT09IHEgJiZcbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIoc2VsZWN0ZWQpO1xuXG4gIHJlbmRlcldlZWtzID0gKCkgPT4ge1xuICAgIGNvbnN0IHdlZWtzID0gW107XG4gICAgdmFyIGlzRml4ZWRIZWlnaHQgPSB0aGlzLnByb3BzLmZpeGVkSGVpZ2h0O1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBicmVha0FmdGVyTmV4dFB1c2ggPSBmYWxzZTtcbiAgICBsZXQgY3VycmVudFdlZWtTdGFydCA9IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgdXRpbHMuZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgID8gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZDtcblxuICAgIGNvbnN0IHByZVNlbGVjdGlvbiA9IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgID8gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICApXG4gICAgICA6IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHdlZWtzLnB1c2goXG4gICAgICAgIDxXZWVrXG4gICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgZGF5PXtjdXJyZW50V2Vla1N0YXJ0fVxuICAgICAgICAgIG1vbnRoPXt1dGlscy5nZXRNb250aCh0aGlzLnByb3BzLmRheSl9XG4gICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyfVxuICAgICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICBob2xpZGF5cz17dGhpcy5wcm9wcy5ob2xpZGF5c31cbiAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgIHByZVNlbGVjdGlvbj17cHJlU2VsZWN0aW9ufVxuICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZH1cbiAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnR9XG4gICAgICAgIC8+LFxuICAgICAgKTtcblxuICAgICAgaWYgKGJyZWFrQWZ0ZXJOZXh0UHVzaCkgYnJlYWs7XG5cbiAgICAgIGkrKztcbiAgICAgIGN1cnJlbnRXZWVrU3RhcnQgPSB1dGlscy5hZGRXZWVrcyhjdXJyZW50V2Vla1N0YXJ0LCAxKTtcblxuICAgICAgLy8gSWYgb25lIG9mIHRoZXNlIGNvbmRpdGlvbnMgaXMgdHJ1ZSwgd2Ugd2lsbCBlaXRoZXIgYnJlYWsgb24gdGhpcyB3ZWVrXG4gICAgICAvLyBvciBicmVhayBvbiB0aGUgbmV4dCB3ZWVrXG4gICAgICBjb25zdCBpc0ZpeGVkQW5kRmluYWxXZWVrID1cbiAgICAgICAgaXNGaXhlZEhlaWdodCAmJiBpID49IEZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UO1xuICAgICAgY29uc3QgaXNOb25GaXhlZEFuZE91dE9mTW9udGggPVxuICAgICAgICAhaXNGaXhlZEhlaWdodCAmJiAhdGhpcy5pc1dlZWtJbk1vbnRoKGN1cnJlbnRXZWVrU3RhcnQpO1xuXG4gICAgICBpZiAoaXNGaXhlZEFuZEZpbmFsV2VlayB8fCBpc05vbkZpeGVkQW5kT3V0T2ZNb250aCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRoKSB7XG4gICAgICAgICAgYnJlYWtBZnRlck5leHRQdXNoID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3ZWVrcztcbiAgfTtcblxuICBvbk1vbnRoQ2xpY2sgPSAoZSwgbSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKHRoaXMucHJvcHMuZGF5LCBtKTtcblxuICAgIGlmICh1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2sodXRpbHMuZ2V0U3RhcnRPZk1vbnRoKGxhYmVsRGF0ZSksIGUpO1xuICB9O1xuXG4gIG9uTW9udGhNb3VzZUVudGVyID0gKG0pID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aCh0aGlzLnByb3BzLmRheSwgbSk7XG5cbiAgICBpZiAodXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIodXRpbHMuZ2V0U3RhcnRPZk1vbnRoKGxhYmVsRGF0ZSkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTmF2aWdhdGlvbiA9IChuZXdNb250aCwgbmV3RGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG4gICAgdGhpcy5NT05USF9SRUZTW25ld01vbnRoXS5jdXJyZW50ICYmXG4gICAgICB0aGlzLk1PTlRIX1JFRlNbbmV3TW9udGhdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBvbk1vbnRoS2V5RG93biA9IChldmVudCwgbW9udGgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uLFxuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2V0UHJlU2VsZWN0aW9uLFxuICAgICAgaGFuZGxlT25Nb250aEtleURvd24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ICE9PSBcIlRhYlwiKSB7XG4gICAgICAvLyBwcmV2ZW50RGVmYXVsdCBvbiB0YWIgZXZlbnQgYmxvY2tzIGZvY3VzIGNoYW5nZVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKCFkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgbW9udGhDb2x1bW5zTGF5b3V0ID0gZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICk7XG4gICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldCA9XG4gICAgICAgIE1PTlRIX0NPTFVNTlNbbW9udGhDb2x1bW5zTGF5b3V0XS52ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ7XG4gICAgICBjb25zdCBtb250aHNHcmlkID0gTU9OVEhfQ09MVU1OU1ttb250aENvbHVtbnNMYXlvdXRdLmdyaWQ7XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25Nb250aENsaWNrKGV2ZW50LCBtb250aCk7XG4gICAgICAgICAgc2V0UHJlU2VsZWN0aW9uKHNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG1vbnRoID09PSAxMSA/IDAgOiBtb250aCArIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQsXG4gICAgICAgICAgICB1dGlscy5hZGRNb250aHMocHJlU2VsZWN0aW9uLCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICBtb250aCA9PT0gMCA/IDExIDogbW9udGggLSBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VULFxuICAgICAgICAgICAgdXRpbHMuc3ViTW9udGhzKHByZVNlbGVjdGlvbiwgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1vbnRoIG9uIHRoZSBmaXJzdCByb3dcbiAgICAgICAgICAgIG1vbnRoc0dyaWRbMF0uaW5jbHVkZXMobW9udGgpXG4gICAgICAgICAgICAgID8gbW9udGggKyAxMiAtIHZlcnRpY2FsT2Zmc2V0XG4gICAgICAgICAgICAgIDogbW9udGggLSB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHV0aWxzLnN1Yk1vbnRocyhwcmVTZWxlY3Rpb24sIHZlcnRpY2FsT2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBtb250aCBvbiB0aGUgbGFzdCByb3dcbiAgICAgICAgICAgIG1vbnRoc0dyaWRbbW9udGhzR3JpZC5sZW5ndGggLSAxXS5pbmNsdWRlcyhtb250aClcbiAgICAgICAgICAgICAgPyBtb250aCAtIDEyICsgdmVydGljYWxPZmZzZXRcbiAgICAgICAgICAgICAgOiBtb250aCArIHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgdXRpbHMuYWRkTW9udGhzKHByZVNlbGVjdGlvbiwgdmVydGljYWxPZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT25Nb250aEtleURvd24gJiYgaGFuZGxlT25Nb250aEtleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIG9uUXVhcnRlckNsaWNrID0gKGUsIHEpID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRRdWFydGVyKHRoaXMucHJvcHMuZGF5LCBxKTtcblxuICAgIGlmICh1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlDbGljayh1dGlscy5nZXRTdGFydE9mUXVhcnRlcihsYWJlbERhdGUpLCBlKTtcbiAgfTtcblxuICBvblF1YXJ0ZXJNb3VzZUVudGVyID0gKHEpID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRRdWFydGVyKHRoaXMucHJvcHMuZGF5LCBxKTtcblxuICAgIGlmICh1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyKHV0aWxzLmdldFN0YXJ0T2ZRdWFydGVyKGxhYmVsRGF0ZSkpO1xuICB9O1xuXG4gIGhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uID0gKG5ld1F1YXJ0ZXIsIG5ld0RhdGUpID0+IHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuICAgIHRoaXMuUVVBUlRFUl9SRUZTW25ld1F1YXJ0ZXIgLSAxXS5jdXJyZW50ICYmXG4gICAgICB0aGlzLlFVQVJURVJfUkVGU1tuZXdRdWFydGVyIC0gMV0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIG9uUXVhcnRlcktleURvd24gPSAoZXZlbnQsIHF1YXJ0ZXIpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vblF1YXJ0ZXJDbGljayhldmVudCwgcXVhcnRlcik7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVRdWFydGVyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHF1YXJ0ZXIgPT09IDQgPyAxIDogcXVhcnRlciArIDEsXG4gICAgICAgICAgICB1dGlscy5hZGRRdWFydGVycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlUXVhcnRlck5hdmlnYXRpb24oXG4gICAgICAgICAgICBxdWFydGVyID09PSAxID8gNCA6IHF1YXJ0ZXIgLSAxLFxuICAgICAgICAgICAgdXRpbHMuc3ViUXVhcnRlcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGdldE1vbnRoQ2xhc3NOYW1lcyA9IChtKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBtb250aENsYXNzTmFtZSxcbiAgICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICAgIGluY2x1ZGVEYXRlcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGhDbGFzc05hbWUgPSBtb250aENsYXNzTmFtZVxuICAgICAgPyBtb250aENsYXNzTmFtZSh1dGlscy5zZXRNb250aChkYXksIG0pKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dFwiLFxuICAgICAgYHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLSR7bX1gLFxuICAgICAgX21vbnRoQ2xhc3NOYW1lLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSB8fCBleGNsdWRlRGF0ZXMgfHwgaW5jbHVkZURhdGVzKSAmJlxuICAgICAgICAgIHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZE1vbnRoKFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBtLFxuICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRNb250aChkYXksIG0sIHByZVNlbGVjdGlvbiksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1pbi1yYW5nZVwiOiB1dGlscy5pc01vbnRoSW5SYW5nZShcbiAgICAgICAgICBzdGFydERhdGUsXG4gICAgICAgICAgZW5kRGF0ZSxcbiAgICAgICAgICBtLFxuICAgICAgICAgIGRheSxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydE1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmRNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0KG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudE1vbnRoKGRheSwgbSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAobSkgPT4ge1xuICAgIGNvbnN0IHByZVNlbGVjdGVkTW9udGggPSB1dGlscy5nZXRNb250aCh0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiYgbSA9PT0gcHJlU2VsZWN0ZWRNb250aFxuICAgICAgICA/IFwiMFwiXG4gICAgICAgIDogXCItMVwiO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJUYWJJbmRleCA9IChxKSA9PiB7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWRRdWFydGVyID0gdXRpbHMuZ2V0UXVhcnRlcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiYgcSA9PT0gcHJlU2VsZWN0ZWRRdWFydGVyXG4gICAgICAgID8gXCIwXCJcbiAgICAgICAgOiBcIi0xXCI7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgZ2V0QXJpYUxhYmVsID0gKG1vbnRoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4ID0gXCJDaG9vc2VcIixcbiAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4ID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgICBkYXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aChkYXksIG1vbnRoKTtcbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKGxhYmVsRGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKGxhYmVsRGF0ZSlcbiAgICAgICAgPyBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeFxuICAgICAgICA6IGNob29zZURheUFyaWFMYWJlbFByZWZpeDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7dXRpbHMuZm9ybWF0RGF0ZShsYWJlbERhdGUsIFwiTU1NTSB5eXl5XCIpfWA7XG4gIH07XG5cbiAgZ2V0UXVhcnRlckNsYXNzTmFtZXMgPSAocSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dFwiLFxuICAgICAgYHJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItJHtxfWAsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUpICYmXG4gICAgICAgICAgdXRpbHMuaXNRdWFydGVyRGlzYWJsZWQodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXNlbGVjdGVkXCI6IHRoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIHEsXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgICFkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoZGF5LCBxLCBwcmVTZWxlY3Rpb24pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyKHEpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0taW4tcmFuZ2VcIjogdXRpbHMuaXNRdWFydGVySW5SYW5nZShcbiAgICAgICAgICBzdGFydERhdGUsXG4gICAgICAgICAgZW5kRGF0ZSxcbiAgICAgICAgICBxLFxuICAgICAgICAgIGRheSxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1JhbmdlU3RhcnRRdWFydGVyKHEpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZFF1YXJ0ZXIocSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0TW9udGhDb250ZW50ID0gKG0pID0+IHtcbiAgICBjb25zdCB7IHNob3dGdWxsTW9udGhZZWFyUGlja2VyLCByZW5kZXJNb250aENvbnRlbnQsIGxvY2FsZSwgZGF5IH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG9ydE1vbnRoVGV4dCA9IHV0aWxzLmdldE1vbnRoU2hvcnRJbkxvY2FsZShtLCBsb2NhbGUpO1xuICAgIGNvbnN0IGZ1bGxNb250aFRleHQgPSB1dGlscy5nZXRNb250aEluTG9jYWxlKG0sIGxvY2FsZSk7XG4gICAgaWYgKHJlbmRlck1vbnRoQ29udGVudCkge1xuICAgICAgcmV0dXJuIHJlbmRlck1vbnRoQ29udGVudChtLCBzaG9ydE1vbnRoVGV4dCwgZnVsbE1vbnRoVGV4dCwgZGF5KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3dGdWxsTW9udGhZZWFyUGlja2VyID8gZnVsbE1vbnRoVGV4dCA6IHNob3J0TW9udGhUZXh0O1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJDb250ZW50ID0gKHEpID0+IHtcbiAgICBjb25zdCB7IHJlbmRlclF1YXJ0ZXJDb250ZW50LCBsb2NhbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvcnRRdWFydGVyID0gdXRpbHMuZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUocSwgbG9jYWxlKTtcbiAgICByZXR1cm4gcmVuZGVyUXVhcnRlckNvbnRlbnRcbiAgICAgID8gcmVuZGVyUXVhcnRlckNvbnRlbnQocSwgc2hvcnRRdWFydGVyKVxuICAgICAgOiBzaG9ydFF1YXJ0ZXI7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhzID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbW9udGhDb2x1bW5zID1cbiAgICAgIE1PTlRIX0NPTFVNTlNbXG4gICAgICAgIGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICApXG4gICAgICBdLmdyaWQ7XG4gICAgcmV0dXJuIG1vbnRoQ29sdW1ucy5tYXAoKG1vbnRoLCBpKSA9PiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXdyYXBwZXJcIiBrZXk9e2l9PlxuICAgICAgICB7bW9udGgubWFwKChtLCBqKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXt0aGlzLk1PTlRIX1JFRlNbbV19XG4gICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2xpY2soZXYsIG0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIGlmICh1dGlscy5pc1NwYWNlS2V5RG93bihldikpIHtcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2LmtleSA9IFwiRW50ZXJcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMub25Nb250aEtleURvd24oZXYsIG0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vbk1vbnRoTW91c2VFbnRlcihtKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uTW9udGhNb3VzZUVudGVyKG0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KG0pfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldE1vbnRoQ2xhc3NOYW1lcyhtKX1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17dGhpcy5nZXRBcmlhTGFiZWwobSl9XG4gICAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBzZWxlY3RlZCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuZ2V0TW9udGhDb250ZW50KG0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIHJlbmRlclF1YXJ0ZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBxdWFydGVycyA9IFsxLCAyLCAzLCA0XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXdyYXBwZXJcIj5cbiAgICAgICAge3F1YXJ0ZXJzLm1hcCgocSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIHJlZj17dGhpcy5RVUFSVEVSX1JFRlNbal19XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uUXVhcnRlcktleURvd24oZXYsIHEpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vblF1YXJ0ZXJNb3VzZUVudGVyKHEpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0UXVhcnRlckNsYXNzTmFtZXMocSl9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgc2VsZWN0ZWQpfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0UXVhcnRlclRhYkluZGV4KHEpfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFF1YXJ0ZXIoZGF5LCBxKSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldFF1YXJ0ZXJDb250ZW50KHEpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgZ2V0Q2xhc3NOYW1lcyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RpbmdEYXRlLFxuICAgICAgc2VsZWN0c1N0YXJ0LFxuICAgICAgc2VsZWN0c0VuZCxcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXIsXG4gICAgICBzaG93V2Vla1BpY2tlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFwiLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLS1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICBzZWxlY3RpbmdEYXRlICYmIChzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCksXG4gICAgICB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoUGlja2VyXCI6IHNob3dNb250aFllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyUGlja2VyXCI6IHNob3dRdWFydGVyWWVhclBpY2tlciB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtQaWNrZXJcIjogc2hvd1dlZWtQaWNrZXIgfSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4ID0gXCJNb250aCBcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGZvcm1hdHRlZEFyaWFMYWJlbFByZWZpeCA9IGFyaWFMYWJlbFByZWZpeFxuICAgICAgPyBhcmlhTGFiZWxQcmVmaXgudHJpbSgpICsgXCIgXCJcbiAgICAgIDogXCJcIjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKCl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUxlYXZlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUxlYXZlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgYXJpYS1sYWJlbD17YCR7Zm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4fSR7dXRpbHMuZm9ybWF0RGF0ZShkYXksIFwiTU1NTSwgeXl5eVwiKX1gfVxuICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICA+XG4gICAgICAgIHtzaG93TW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgPyB0aGlzLnJlbmRlck1vbnRocygpXG4gICAgICAgICAgOiBzaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgICAgID8gdGhpcy5yZW5kZXJRdWFydGVycygpXG4gICAgICAgICAgICA6IHRoaXMucmVuZGVyV2Vla3MoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7XG4gIGdldEhvdXJzLFxuICBnZXRNaW51dGVzLFxuICBuZXdEYXRlLFxuICBnZXRTdGFydE9mRGF5LFxuICBhZGRNaW51dGVzLFxuICBmb3JtYXREYXRlLFxuICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UsXG4gIGlzVGltZURpc2FibGVkLFxuICB0aW1lc1RvSW5qZWN0QWZ0ZXIsXG4gIGdldEhvdXJzSW5EYXksXG4gIGlzU2FtZU1pbnV0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVydmFsczogMzAsXG4gICAgICBvblRpbWVDaGFuZ2U6ICgpID0+IHt9LFxuICAgICAgdG9kYXlCdXR0b246IG51bGwsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBjYWxjQ2VudGVyUG9zaXRpb24gPSAobGlzdEhlaWdodCwgY2VudGVyTGlSZWYpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgY2VudGVyTGlSZWYub2Zmc2V0VG9wIC0gKGxpc3RIZWlnaHQgLyAyIC0gY2VudGVyTGlSZWYuY2xpZW50SGVpZ2h0IC8gMilcbiAgICApO1xuICB9O1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgICBtaW5UaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhUaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJUaW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtb250aFJlZjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0aW1lQ2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBoZWlnaHQ6IG51bGwsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gY29kZSB0byBlbnN1cmUgc2VsZWN0ZWQgdGltZSB3aWxsIGFsd2F5cyBiZSBpbiBmb2N1cyB3aXRoaW4gdGltZSB3aW5kb3cgd2hlbiBpdCBmaXJzdCBhcHBlYXJzXG4gICAgdGhpcy5zY3JvbGxUb1RoZVNlbGVjdGVkVGltZSgpO1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoUmVmICYmIHRoaXMuaGVhZGVyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLm1vbnRoUmVmLmNsaWVudEhlaWdodCAtIHRoaXMuaGVhZGVyLmNsaWVudEhlaWdodCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lID0gKCkgPT4ge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubGlzdCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLmxpc3Quc2Nyb2xsVG9wID1cbiAgICAgICAgdGhpcy5jZW50ZXJMaSAmJlxuICAgICAgICBUaW1lLmNhbGNDZW50ZXJQb3NpdGlvbihcbiAgICAgICAgICB0aGlzLnByb3BzLm1vbnRoUmVmXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMubW9udGhSZWYuY2xpZW50SGVpZ2h0IC0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMubGlzdC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgdGhpcy5jZW50ZXJMaSxcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbGljayA9ICh0aW1lKSA9PiB7XG4gICAgaWYgKFxuICAgICAgKCh0aGlzLnByb3BzLm1pblRpbWUgfHwgdGhpcy5wcm9wcy5tYXhUaW1lKSAmJlxuICAgICAgICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgdGhpcy5wcm9wcykpIHx8XG4gICAgICAoKHRoaXMucHJvcHMuZXhjbHVkZVRpbWVzIHx8XG4gICAgICAgIHRoaXMucHJvcHMuaW5jbHVkZVRpbWVzIHx8XG4gICAgICAgIHRoaXMucHJvcHMuZmlsdGVyVGltZSkgJiZcbiAgICAgICAgaXNUaW1lRGlzYWJsZWQodGltZSwgdGhpcy5wcm9wcykpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGltZSk7XG4gIH07XG5cbiAgaXNTZWxlY3RlZFRpbWUgPSAodGltZSkgPT5cbiAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmIGlzU2FtZU1pbnV0ZSh0aGlzLnByb3BzLnNlbGVjdGVkLCB0aW1lKTtcblxuICBpc0Rpc2FibGVkVGltZSA9ICh0aW1lKSA9PlxuICAgICgodGhpcy5wcm9wcy5taW5UaW1lIHx8IHRoaXMucHJvcHMubWF4VGltZSkgJiZcbiAgICAgIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB0aGlzLnByb3BzKSkgfHxcbiAgICAoKHRoaXMucHJvcHMuZXhjbHVkZVRpbWVzIHx8XG4gICAgICB0aGlzLnByb3BzLmluY2x1ZGVUaW1lcyB8fFxuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJUaW1lKSAmJlxuICAgICAgaXNUaW1lRGlzYWJsZWQodGltZSwgdGhpcy5wcm9wcykpO1xuXG4gIGxpQ2xhc3NlcyA9ICh0aW1lKSA9PiB7XG4gICAgbGV0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtXCIsXG4gICAgICB0aGlzLnByb3BzLnRpbWVDbGFzc05hbWUgPyB0aGlzLnByb3BzLnRpbWVDbGFzc05hbWUodGltZSkgOiB1bmRlZmluZWQsXG4gICAgXTtcblxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRUaW1lKHRpbWUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0tc2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1kaXNhYmxlZFwiKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgKGdldEhvdXJzKHRpbWUpICogNjAgKyBnZXRNaW51dGVzKHRpbWUpKSAlIHRoaXMucHJvcHMuaW50ZXJ2YWxzICE9PSAwXG4gICAgKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0taW5qZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH07XG5cbiAgaGFuZGxlT25LZXlEb3duID0gKGV2ZW50LCB0aW1lKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmcuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSAmJlxuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQudGFyZ2V0Lm5leHRTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICB0aGlzLmhhbmRsZUNsaWNrKHRpbWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgcmVuZGVyVGltZXMgPSAoKSA9PiB7XG4gICAgbGV0IHRpbWVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQgPyB0aGlzLnByb3BzLmZvcm1hdCA6IFwicFwiO1xuICAgIGNvbnN0IGludGVydmFscyA9IHRoaXMucHJvcHMuaW50ZXJ2YWxzO1xuXG4gICAgY29uc3QgYWN0aXZlRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkIHx8IHRoaXMucHJvcHMub3BlblRvRGF0ZSB8fCBuZXdEYXRlKCk7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0U3RhcnRPZkRheShhY3RpdmVEYXRlKTtcbiAgICBjb25zdCBzb3J0ZWRJbmplY3RUaW1lcyA9XG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzICYmXG4gICAgICB0aGlzLnByb3BzLmluamVjdFRpbWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBtaW51dGVzSW5EYXkgPSA2MCAqIGdldEhvdXJzSW5EYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IG1pbnV0ZXNJbkRheSAvIGludGVydmFscztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlwbGllcjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGFkZE1pbnV0ZXMoYmFzZSwgaSAqIGludGVydmFscyk7XG4gICAgICB0aW1lcy5wdXNoKGN1cnJlbnRUaW1lKTtcblxuICAgICAgaWYgKHNvcnRlZEluamVjdFRpbWVzKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzVG9JbmplY3QgPSB0aW1lc1RvSW5qZWN0QWZ0ZXIoXG4gICAgICAgICAgYmFzZSxcbiAgICAgICAgICBjdXJyZW50VGltZSxcbiAgICAgICAgICBpLFxuICAgICAgICAgIGludGVydmFscyxcbiAgICAgICAgICBzb3J0ZWRJbmplY3RUaW1lcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGltZXMgPSB0aW1lcy5jb25jYXQodGltZXNUb0luamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHRpbWUgdG8gZm9jdXMgYW5kIHNjcm9sbCBpbnRvIHZpZXcgd2hlbiBjb21wb25lbnQgbW91bnRzXG4gICAgY29uc3QgdGltZVRvRm9jdXMgPSB0aW1lcy5yZWR1Y2UoKHByZXYsIHRpbWUpID0+IHtcbiAgICAgIGlmICh0aW1lLmdldFRpbWUoKSA8PSBhY3RpdmVEYXRlLmdldFRpbWUoKSkge1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRpbWVzWzBdKTtcblxuICAgIHJldHVybiB0aW1lcy5tYXAoKHRpbWUsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGltZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmxpQ2xhc3Nlcyh0aW1lKX1cbiAgICAgICAgICByZWY9eyhsaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWUgPT09IHRpbWVUb0ZvY3VzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VudGVyTGkgPSBsaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9uS2V5RG93bihldiwgdGltZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGltZSA9PT0gdGltZVRvRm9jdXMgPyAwIDogLTF9XG4gICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtmb3JtYXREYXRlKHRpbWUsIGZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lciAke1xuICAgICAgICAgIHRoaXMucHJvcHMudG9kYXlCdXR0b25cbiAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWNvbnRhaW5lci0td2l0aC10b2RheS1idXR0b25cIlxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZSAke1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICAgICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tdGltZS0tb25seVwiXG4gICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgIH1gfVxuICAgICAgICAgIHJlZj17KGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19oZWFkZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWJveFwiPlxuICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdFwiXG4gICAgICAgICAgICAgIHJlZj17KGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBzdHlsZT17aGVpZ2h0ID8geyBoZWlnaHQgfSA6IHt9fVxuICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVzKCl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGdldFllYXIsIG5ld0RhdGUgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xlYXJTZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIFlFQVJfUkVGUyA9IFsuLi5BcnJheSh0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyKV0ubWFwKCgpID0+XG4gICAgUmVhY3QuY3JlYXRlUmVmKCksXG4gICk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBzZWxlY3RpbmdEYXRlID0gKCkgPT4gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gIHVwZGF0ZUZvY3VzT25QYWdpbmF0ZSA9IChyZWZJbmRleCkgPT4ge1xuICAgIGNvbnN0IHdhaXRGb3JSZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuWUVBUl9SRUZTW3JlZkluZGV4XS5jdXJyZW50LmZvY3VzKCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh3YWl0Rm9yUmVSZW5kZXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVZZWFyTmF2aWdhdGlvbiA9IChuZXdZZWFyLCBuZXdEYXRlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChkYXRlLCB5ZWFySXRlbU51bWJlcik7XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuXG4gICAgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA9PT0gLTEpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gICAgfSBlbHNlIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IHllYXJJdGVtTnVtYmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSgwKTtcbiAgICB9IGVsc2UgdGhpcy5ZRUFSX1JFRlNbbmV3WWVhciAtIHN0YXJ0UGVyaW9kXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKHksIG90aGVyKSA9PiB1dGlscy5pc1NhbWVEYXkoeSwgb3RoZXIpO1xuXG4gIGlzQ3VycmVudFllYXIgPSAoeSkgPT4geSA9PT0gZ2V0WWVhcihuZXdEYXRlKCkpO1xuXG4gIGlzUmFuZ2VTdGFydCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuc3RhcnREYXRlKTtcblxuICBpc1JhbmdlRW5kID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luUmFuZ2UgPSAoeSkgPT5cbiAgICB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZSA9ICh5KSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fFxuICAgICAgIXRoaXMuc2VsZWN0aW5nRGF0ZSgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5zZWxlY3RpbmdEYXRlKCksIGVuZERhdGUpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlU3RhcnQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKHkpID0+IHtcbiAgICBjb25zdCBkYXRlID0gdXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcih0aGlzLnByb3BzLmRhdGUsIHkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnNlbGVjdGVkKSkgJiZcbiAgICAgIHV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbikpXG4gICAgKTtcbiAgfTtcblxuICBvblllYXJDbGljayA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuaGFuZGxlWWVhckNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpLCBlKTtcbiAgfTtcblxuICBvblllYXJLZXlEb3duID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGtleSB9ID0gZTtcbiAgICBjb25zdCB7IGhhbmRsZU9uS2V5RG93biB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vblllYXJDbGljayhlLCB5KTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSArIDEsXG4gICAgICAgICAgICB1dGlscy5hZGRZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5IC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5RG93biAmJiBoYW5kbGVPbktleURvd24oZSk7XG4gIH07XG5cbiAgZ2V0WWVhckNsYXNzTmFtZXMgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGUsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgICAgZmlsdGVyRGF0ZSxcbiAgICAgIHllYXJDbGFzc05hbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci0ke3l9YCxcbiAgICAgIHllYXJDbGFzc05hbWUgPyB5ZWFyQ2xhc3NOYW1lKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpIDogdW5kZWZpbmVkLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0ZWRcIjogeSA9PT0gZ2V0WWVhcihzZWxlY3RlZCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcyB8fCBmaWx0ZXJEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzWWVhckRpc2FibGVkKHksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudFllYXIoeSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0WWVhclRhYkluZGV4ID0gKHkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikgcmV0dXJuIFwiLTFcIjtcbiAgICBjb25zdCBwcmVTZWxlY3RlZCA9IHV0aWxzLmdldFllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHkgPT09IHByZVNlbGVjdGVkID8gXCIwXCIgOiBcIi0xXCI7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RpbmdEYXRlLCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsc3goXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyXCIsIHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSksXG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRlbnQgPSAoeSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50ID8gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCh5KSA6IHk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHllYXJzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIsIG9uWWVhck1vdXNlRW50ZXIsIG9uWWVhck1vdXNlTGVhdmUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBkYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcblxuICAgIGZvciAobGV0IHkgPSBzdGFydFBlcmlvZDsgeSA8PSBlbmRQZXJpb2Q7IHkrKykge1xuICAgICAgeWVhcnNMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3RoaXMuWUVBUl9SRUZTW3kgLSBzdGFydFBlcmlvZF19XG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGV2LmtleSA9IFwiRW50ZXJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblllYXJLZXlEb3duKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFllYXJUYWJJbmRleCh5KX1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNsYXNzTmFtZXMoeSl9XG4gICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e3l9XG4gICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFllYXIoeSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLmdldFllYXJDb250ZW50KHkpfVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcygpfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItd3JhcHBlclwiXG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICB7eWVhcnNMaXN0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW5wdXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdGltZVN0cmluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpbWU6IHRoaXMucHJvcHMudGltZVN0cmluZyxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICBpZiAocHJvcHMudGltZVN0cmluZyAhPT0gc3RhdGUudGltZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGltZTogcHJvcHMudGltZVN0cmluZyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIG51bGwgdG8gaW5kaWNhdGUgbm8gY2hhbmdlIHRvIHN0YXRlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25UaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdGltZSB9KTtcblxuICAgIGNvbnN0IHsgZGF0ZTogcHJvcERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNQcm9wRGF0ZVZhbGlkID0gcHJvcERhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihwcm9wRGF0ZSk7XG4gICAgY29uc3QgZGF0ZSA9IGlzUHJvcERhdGVWYWxpZCA/IHByb3BEYXRlIDogbmV3IERhdGUoKTtcblxuICAgIGRhdGUuc2V0SG91cnModGltZS5zcGxpdChcIjpcIilbMF0pO1xuICAgIGRhdGUuc2V0TWludXRlcyh0aW1lLnNwbGl0KFwiOlwiKVsxXSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGRhdGUpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkYXRlLCB0aW1lU3RyaW5nLCBjdXN0b21UaW1lSW5wdXQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY3VzdG9tVGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbVRpbWVJbnB1dCwge1xuICAgICAgICBkYXRlLFxuICAgICAgICB2YWx1ZTogdGltZSxcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMub25UaW1lQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGltZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlRpbWVcIlxuICAgICAgICBuYW1lPVwidGltZS1pbnB1dFwiXG4gICAgICAgIHJlcXVpcmVkXG4gICAgICAgIHZhbHVlPXt0aW1lfVxuICAgICAgICBvbkNoYW5nZT17KGV2KSA9PiB7XG4gICAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoZXYudGFyZ2V0LnZhbHVlIHx8IHRpbWVTdHJpbmcpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19pbnB1dC10aW1lLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9fY2FwdGlvblwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZUlucHV0KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhckNvbnRhaW5lcih7XG4gIHNob3dUaW1lU2VsZWN0T25seSA9IGZhbHNlLFxuICBzaG93VGltZSA9IGZhbHNlLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufSkge1xuICBsZXQgYXJpYUxhYmVsID0gc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgPyBcIkNob29zZSBUaW1lXCJcbiAgICA6IGBDaG9vc2UgRGF0ZSR7c2hvd1RpbWUgPyBcIiBhbmQgVGltZVwiIDogXCJcIn1gO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkNhbGVuZGFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd1RpbWU6IFByb3BUeXBlcy5ib29sLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbn07XG4iLCJpbXBvcnQgWWVhckRyb3Bkb3duIGZyb20gXCIuL3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aERyb3Bkb3duIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoIGZyb20gXCIuL21vbnRoXCI7XG5pbXBvcnQgVGltZSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgWWVhciBmcm9tIFwiLi95ZWFyXCI7XG5pbXBvcnQgSW5wdXRUaW1lIGZyb20gXCIuL2lucHV0VGltZVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgQ2FsZW5kYXJDb250YWluZXIgZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBzZXRNb250aCxcbiAgZ2V0TW9udGgsXG4gIGFkZE1vbnRocyxcbiAgc3ViTW9udGhzLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0U3RhcnRPZlRvZGF5LFxuICBhZGREYXlzLFxuICBmb3JtYXREYXRlLFxuICBzZXRZZWFyLFxuICBnZXRZZWFyLFxuICBpc0JlZm9yZSxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0FmdGVyLFxuICBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlLFxuICBnZXRXZWVrZGF5TWluSW5Mb2NhbGUsXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIG1vbnRoRGlzYWJsZWRCZWZvcmUsXG4gIG1vbnRoRGlzYWJsZWRBZnRlcixcbiAgeWVhckRpc2FibGVkQmVmb3JlLFxuICB5ZWFyRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQmVmb3JlLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBhZGRaZXJvLFxuICBpc1ZhbGlkLFxuICBnZXRZZWFyc1BlcmlvZCxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBnZXRNb250aEluTG9jYWxlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMgPSBbXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiLFxuXTtcblxuY29uc3QgaXNEcm9wZG93blNlbGVjdCA9IChlbGVtZW50ID0ge30pID0+IHtcbiAgY29uc3QgY2xhc3NOYW1lcyA9IChlbGVtZW50LmNsYXNzTmFtZSB8fCBcIlwiKS5zcGxpdCgvXFxzKy8pO1xuICByZXR1cm4gRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUy5zb21lKFxuICAgICh0ZXN0Q2xhc3NuYW1lKSA9PiBjbGFzc05hbWVzLmluZGV4T2YodGVzdENsYXNzbmFtZSkgPj0gMCxcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uRHJvcGRvd25Gb2N1czogKCkgPT4ge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKVxuICAgICAgLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKSxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtb250aFNlbGVjdGVkSW46IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRyb3Bkb3duRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uVGltZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uRGF5S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5jb250YWluZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRlOiB0aGlzLmdldERhdGVJblZpZXcoKSxcbiAgICAgIHNlbGVjdGluZ0RhdGU6IG51bGwsXG4gICAgICBtb250aENvbnRhaW5lcjogbnVsbCxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gbW9udGhDb250YWluZXIgaGVpZ2h0IGlzIG5lZWRlZCBpbiB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHRvIGRldGVybWluZSB0aGUgaGVpZ2h0IGZvciB0aGUgdWwgaW4gdGhlIHRpbWUgY29tcG9uZW50XG4gICAgLy8gc2V0U3RhdGUgaGVyZSBzbyBoZWlnaHQgaXMgZ2l2ZW4gYWZ0ZXIgZmluYWwgY29tcG9uZW50XG4gICAgLy8gbGF5b3V0IGlzIHJlbmRlcmVkXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuYXNzaWduTW9udGhDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhDb250YWluZXI6IHRoaXMubW9udGhDb250YWluZXIgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbiAmJlxuICAgICAgKCFpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHByZXZQcm9wcy5wcmVTZWxlY3Rpb24pIHx8XG4gICAgICAgIHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluICE9PSBwcmV2UHJvcHMubW9udGhTZWxlY3RlZEluKVxuICAgICkge1xuICAgICAgY29uc3QgaGFzTW9udGhDaGFuZ2VkID0gIWlzU2FtZU1vbnRoKFxuICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gaGFzTW9udGhDaGFuZ2VkICYmIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZSAmJlxuICAgICAgIWlzU2FtZURheSh0aGlzLnByb3BzLm9wZW5Ub0RhdGUsIHByZXZQcm9wcy5vcGVuVG9EYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGU6IHRoaXMucHJvcHMub3BlblRvRGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICB9O1xuXG4gIHNldENsaWNrT3V0c2lkZVJlZiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGlzRHJvcGRvd25TZWxlY3QoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0ZUluVmlldyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByZVNlbGVjdGlvbiwgc2VsZWN0ZWQsIG9wZW5Ub0RhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld0RhdGUoKTtcbiAgICBjb25zdCBpbml0aWFsRGF0ZSA9IG9wZW5Ub0RhdGUgfHwgc2VsZWN0ZWQgfHwgcHJlU2VsZWN0aW9uO1xuICAgIGlmIChpbml0aWFsRGF0ZSkge1xuICAgICAgcmV0dXJuIGluaXRpYWxEYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWluRGF0ZSAmJiBpc0JlZm9yZShjdXJyZW50LCBtaW5EYXRlKSkge1xuICAgICAgICByZXR1cm4gbWluRGF0ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBpc0FmdGVyKGN1cnJlbnQsIG1heERhdGUpKSB7XG4gICAgICAgIHJldHVybiBtYXhEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfTtcblxuICBpbmNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZE1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgZGVjcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IGRheSB9KTtcbiAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgICB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUoKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VFbnRlciA9IChldmVudCwgeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBzZXRZZWFyKG5ld0RhdGUoKSwgeWVhcikgfSk7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VMZWF2ZSA9IChldmVudCwgeWVhcikgPT4ge1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZShldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uWWVhckNoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb250aENoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW9udGhZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgdGhpcy5oYW5kbGVNb250aENoYW5nZShkYXRlKTtcbiAgfTtcblxuICBjaGFuZ2VZZWFyID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKGRhdGUsIHllYXIpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0TW9udGgoZGF0ZSwgbW9udGgpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aFllYXIgPSAobW9udGhZZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihzZXRNb250aChkYXRlLCBnZXRNb250aChtb250aFllYXIpKSwgZ2V0WWVhcihtb250aFllYXIpKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aFllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhlYWRlciA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSBnZXRTdGFydE9mV2VlayhcbiAgICAgIGRhdGUsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3QgZGF5TmFtZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnMpIHtcbiAgICAgIGRheU5hbWVzLnB1c2goXG4gICAgICAgIDxkaXYga2V5PVwiV1wiIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMud2Vla0xhYmVsIHx8IFwiI1wifVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5TmFtZXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIGNvbnN0IHdlZWtEYXlOYW1lID0gdGhpcy5mb3JtYXRXZWVrZGF5KGRheSwgdGhpcy5wcm9wcy5sb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IHdlZWtEYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWVcbiAgICAgICAgICA/IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZShkYXkpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e29mZnNldH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCIsIHdlZWtEYXlDbGFzc05hbWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt3ZWVrRGF5TmFtZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgZm9ybWF0V2Vla2RheSA9IChkYXksIGxvY2FsZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXkpIHtcbiAgICAgIHJldHVybiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF5LCB0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXksIGxvY2FsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3BzLnVzZVdlZWtkYXlzU2hvcnRcbiAgICAgID8gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF5LCBsb2NhbGUpXG4gICAgICA6IGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXksIGxvY2FsZSk7XG4gIH07XG5cbiAgZGVjcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHN1YlllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNsZWFyU2VsZWN0aW5nRGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgfTtcblxuICByZW5kZXJQcmV2aW91c0J1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYWxsUHJldkRheXNEaXNhYmxlZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhckRpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICghdGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgIXRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1wcmV2aW91c1wiLFxuICAgIF07XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsUHJldkRheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXMtLWRpc2FibGVkXCIpO1xuICAgICAgY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvclllYXIgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIGNvbnN0IHsgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsLCBwcmV2aW91c1llYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsID0gdHlwZW9mIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9XG4gICAgICAgIG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNGb3JZZWFyID8gcHJldmlvdXNZZWFyQXJpYUxhYmVsIDogcHJldmlvdXNNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLnByZXZpb3VzWWVhckJ1dHRvbkxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIGluY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxOZXh0RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBjb25zdCBpY29uQ2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvbi0tbmV4dFwiLFxuICAgIF07XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdGltZVwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMudG9kYXlCdXR0b24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdG9kYXktYnV0dG9uXCIpO1xuICAgIH1cblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsTmV4dERheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBuZXh0TW9udGhCdXR0b25MYWJlbCwgbmV4dFllYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dE1vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBuZXh0TW9udGhCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dFllYXJCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIk5leHQgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBuZXh0WWVhckFyaWFMYWJlbCA6IG5leHRNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDdXJyZW50TW9udGggPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoXCJdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzTW9udGhEcm9wZG93blwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aFllYXJEcm9wZG93blwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAge2Zvcm1hdERhdGUoZGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFllYXJEcm9wZG93blxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLnByb3BzLm9uU2VsZWN0fVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZVllYXJ9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICB5ZWFyPXtnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TW9udGhEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aH1cbiAgICAgICAgbW9udGg9e2dldE1vbnRoKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aFllYXJEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVUb2RheUJ1dHRvbkNsaWNrID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGdldFN0YXJ0T2ZUb2RheSgpLCBlKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihnZXRTdGFydE9mVG9kYXkoKSk7XG4gIH07XG5cbiAgcmVuZGVyVG9kYXlCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnRvZGF5QnV0dG9uIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RvZGF5LWJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVRvZGF5QnV0dG9uQ2xpY2soZSl9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEZWZhdWx0SGVhZGVyID0gKHsgbW9udGhEYXRlLCBpIH0pID0+IChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgJHtcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdFxuICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWhhcy10aW1lLXNlbGVjdFwiXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YH1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJDdXJyZW50TW9udGgobW9udGhEYXRlKX1cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyX19kcm9wZG93biByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRHJvcGRvd25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhZZWFyRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICAgIHt0aGlzLnJlbmRlclllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZXNcIj5cbiAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJDdXN0b21IZWFkZXIgPSAoaGVhZGVyQXJncyA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyBtb250aERhdGUsIGkgfSA9IGhlYWRlckFyZ3M7XG5cbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJiAhdGhpcy5zdGF0ZS5tb250aENvbnRhaW5lcikgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHByZXZZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0WWVhckJ1dHRvbkRpc2FibGVkID0geWVhckRpc2FibGVkQWZ0ZXIoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBzaG93RGF5TmFtZXMgPVxuICAgICAgIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciAmJlxuICAgICAgIXRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWN1c3RvbVwiXG4gICAgICAgIG9uRm9jdXM9e3RoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIoe1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgICAgY3VzdG9tSGVhZGVyQ291bnQ6IGksXG4gICAgICAgICAgbW9udGhEYXRlLFxuICAgICAgICAgIGNoYW5nZU1vbnRoOiB0aGlzLmNoYW5nZU1vbnRoLFxuICAgICAgICAgIGNoYW5nZVllYXI6IHRoaXMuY2hhbmdlWWVhcixcbiAgICAgICAgICBkZWNyZWFzZU1vbnRoOiB0aGlzLmRlY3JlYXNlTW9udGgsXG4gICAgICAgICAgaW5jcmVhc2VNb250aDogdGhpcy5pbmNyZWFzZU1vbnRoLFxuICAgICAgICAgIGRlY3JlYXNlWWVhcjogdGhpcy5kZWNyZWFzZVllYXIsXG4gICAgICAgICAgaW5jcmVhc2VZZWFyOiB0aGlzLmluY3JlYXNlWWVhcixcbiAgICAgICAgICBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBwcmV2WWVhckJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgIH0pfVxuICAgICAgICB7c2hvd0RheU5hbWVzICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJIZWFkZXIgPSAoeyBtb250aERhdGUgfSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd1llYXJQaWNrZXIsIHllYXJJdGVtTnVtYmVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBtb250aERhdGUsXG4gICAgICB5ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyLXllYXItaGVhZGVyXCI+XG4gICAgICAgIHtzaG93WWVhclBpY2tlciA/IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWAgOiBnZXRZZWFyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlciA9IChoZWFkZXJBcmdzKSA9PiB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyICE9PSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckN1c3RvbUhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlclllYXJIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEZWZhdWx0SGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtb250aExpc3QgPSBbXTtcbiAgICBjb25zdCBtb250aHNUb1N1YnRyYWN0ID0gdGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHNcbiAgICAgID8gdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDFcbiAgICAgIDogMDtcbiAgICBjb25zdCBmcm9tTW9udGhEYXRlID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fCB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICA/IGFkZFllYXJzKHRoaXMuc3RhdGUuZGF0ZSwgbW9udGhzVG9TdWJ0cmFjdClcbiAgICAgICAgOiBzdWJNb250aHModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KTtcbiAgICBjb25zdCBtb250aFNlbGVjdGVkSW4gPSB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiA/PyBtb250aHNUb1N1YnRyYWN0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93bjsgKytpKSB7XG4gICAgICBjb25zdCBtb250aHNUb0FkZCA9IGkgLSBtb250aFNlbGVjdGVkSW4gKyBtb250aHNUb1N1YnRyYWN0O1xuICAgICAgY29uc3QgbW9udGhEYXRlID1cbiAgICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgPyBhZGRZZWFycyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZClcbiAgICAgICAgICA6IGFkZE1vbnRocyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZCk7XG4gICAgICBjb25zdCBtb250aEtleSA9IGBtb250aC0ke2l9YDtcbiAgICAgIGNvbnN0IG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kID0gaSA8IHRoaXMucHJvcHMubW9udGhzU2hvd24gLSAxO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCA9IGkgPiAwO1xuICAgICAgbW9udGhMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e21vbnRoS2V5fVxuICAgICAgICAgIHJlZj17KGRpdikgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb250aENvbnRhaW5lciA9IGRpdjtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWNvbnRhaW5lclwiXG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGUsIGkgfSl9XG4gICAgICAgICAgPE1vbnRoXG4gICAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aFllYXJ9XG4gICAgICAgICAgICBkYXk9e21vbnRoRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25EYXlLZXlEb3dufVxuICAgICAgICAgICAgaGFuZGxlT25Nb250aEtleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vbnRoTW91c2VMZWF2ZX1cbiAgICAgICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgICAgICBvcmRlckluRGlzcGxheT17aX1cbiAgICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5zdGF0ZS5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgZml4ZWRIZWlnaHQ9e3RoaXMucHJvcHMuZml4ZWRIZWlnaHR9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgcmVuZGVyTW9udGhDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlck1vbnRoQ29udGVudH1cbiAgICAgICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICAgIHNob3dNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXttb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbnRoTGlzdDtcbiAgfTtcblxuICByZW5kZXJZZWFycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKHsgbW9udGhEYXRlOiB0aGlzLnN0YXRlLmRhdGUgfSl9XG4gICAgICAgICAgPFllYXJcbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBjbGVhclNlbGVjdGluZ0RhdGU9e3RoaXMuY2xlYXJTZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLmhhbmRsZVllYXJNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlclRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiZcbiAgICAgICh0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRpbWVcbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgICBmb3JtYXQ9e3RoaXMucHJvcHMudGltZUZvcm1hdH1cbiAgICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICAgIGludGVydmFscz17dGhpcy5wcm9wcy50aW1lSW50ZXJ2YWxzfVxuICAgICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgICAgZXhjbHVkZVRpbWVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lc31cbiAgICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgdG9kYXlCdXR0b249e3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgICAgc2hvd01vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICAgIG1vbnRoUmVmPXt0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyfVxuICAgICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRUaW1lU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVZhbGlkID0gaXNWYWxpZCh0aW1lKSAmJiBCb29sZWFuKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIGNvbnN0IHRpbWVTdHJpbmcgPSB0aW1lVmFsaWRcbiAgICAgID8gYCR7YWRkWmVybyh0aW1lLmdldEhvdXJzKCkpfToke2FkZFplcm8odGltZS5nZXRNaW51dGVzKCkpfWBcbiAgICAgIDogXCJcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW5wdXRUaW1lXG4gICAgICAgICAgZGF0ZT17dGltZX1cbiAgICAgICAgICB0aW1lU3RyaW5nPXt0aW1lU3RyaW5nfVxuICAgICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVGltZUNoYW5nZX1cbiAgICAgICAgICBjdXN0b21UaW1lSW5wdXQ9e3RoaXMucHJvcHMuY3VzdG9tVGltZUlucHV0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQXJpYUxpdmVSZWdpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWA7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGdldFllYXIodGhpcy5zdGF0ZS5kYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7Z2V0TW9udGhJbkxvY2FsZShcbiAgICAgICAgZ2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICApfSAke2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlbmRlckFyaWFMaXZlTWVzc2FnZSAmJiBhcmlhTGl2ZU1lc3NhZ2V9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDaGlsZHJlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19jaGlsZHJlbi1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgQ29udGFpbmVyID0gdGhpcy5wcm9wcy5jb250YWluZXIgfHwgQ2FsZW5kYXJDb250YWluZXI7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJjb250ZW50c1wiIH19IHJlZj17dGhpcy5jb250YWluZXJSZWZ9PlxuICAgICAgICA8Q29udGFpbmVyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFwicmVhY3QtZGF0ZXBpY2tlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyLS10aW1lLW9ubHlcIjogdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHksXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgc2hvd1RpbWU9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclByZXZpb3VzQnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTmV4dEJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck1vbnRocygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclllYXJzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyVG9kYXlCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0VGltZVNlY3Rpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY29uc3QgQ2FsZW5kYXJJY29uID0gKHsgaWNvbiwgY2xhc3NOYW1lID0gXCJcIiwgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2FsZW5kYXItaWNvblwiO1xuXG4gIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChpY29uKSkge1xuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoaWNvbiwge1xuICAgICAgY2xhc3NOYW1lOiBgJHtpY29uLnByb3BzLmNsYXNzTmFtZSB8fCBcIlwifSAke2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YCxcbiAgICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaWNvbi5wcm9wcy5vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpY29uLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG9uQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGljb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtkZWZhdWx0Q2xhc3N9ICR7aWNvbn0gJHtjbGFzc05hbWV9YH1cbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgU1ZHIEljb25cbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YH1cbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgdmlld0JveD1cIjAgMCA0NDggNTEyXCJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgPlxuICAgICAgPHBhdGggZD1cIk05NiAzMlY2NEg0OEMyMS41IDY0IDAgODUuNSAwIDExMnY0OEg0NDhWMTEyYzAtMjYuNS0yMS41LTQ4LTQ4LTQ4SDM1MlYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMlY2NEgxNjBWMzJjMC0xNy43LTE0LjMtMzItMzItMzJTOTYgMTQuMyA5NiAzMnpNNDQ4IDE5MkgwVjQ2NGMwIDI2LjUgMjEuNSA0OCA0OCA0OEg0MDBjMjYuNSAwIDQ4LTIxLjUgNDgtNDhWMTkyelwiIC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5DYWxlbmRhckljb24ucHJvcFR5cGVzID0ge1xuICBpY29uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXJJY29uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdCA9ICh0aGlzLnByb3BzLnBvcnRhbEhvc3QgfHwgZG9jdW1lbnQpLmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGhpcy5wcm9wcy5wb3J0YWxJZCxcbiAgICApO1xuICAgIGlmICghdGhpcy5wb3J0YWxSb290KSB7XG4gICAgICB0aGlzLnBvcnRhbFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5wb3J0YWxSb290LnNldEF0dHJpYnV0ZShcImlkXCIsIHRoaXMucHJvcHMucG9ydGFsSWQpO1xuICAgICAgKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZCh0aGlzLnBvcnRhbFJvb3QpO1xuICAgIH1cbiAgICB0aGlzLnBvcnRhbFJvb3QuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnBvcnRhbFJvb3QucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbCh0aGlzLnByb3BzLmNoaWxkcmVuLCB0aGlzLmVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG4vLyBUYWJMb29wIHByZXZlbnRzIHRoZSB1c2VyIGZyb20gdGFiYmluZyBvdXRzaWRlIG9mIHRoZSBwb3BwZXJcbi8vIEl0IGNyZWF0ZXMgYSB0YWJpbmRleCBsb29wIHNvIHRoYXQgXCJUYWJcIiBvbiB0aGUgbGFzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGZpcnN0IGVsZW1lbnRcbi8vIGFuZCBcIlNoaWZ0IFRhYlwiIG9uIHRoZSBmaXJzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGxhc3QgZWxlbWVudFxuXG5jb25zdCBmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yID1cbiAgXCJbdGFiaW5kZXhdLCBhLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCI7XG5jb25zdCBmb2N1c2FibGVGaWx0ZXIgPSAobm9kZSkgPT4gIW5vZGUuZGlzYWJsZWQgJiYgbm9kZS50YWJJbmRleCAhPT0gLTE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYkxvb3AgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMudGFiTG9vcFJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgLy8gcXVlcnkgYWxsIGZvY3VzYWJsZSBlbGVtZW50c1xuICAvLyB0cmltIGZpcnN0IGFuZCBsYXN0IGJlY2F1c2UgdGhleSBhcmUgdGhlIGZvY3VzIGd1YXJkc1xuICBnZXRUYWJDaGlsZHJlbiA9ICgpID0+XG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChcbiAgICAgICAgdGhpcy50YWJMb29wUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yKSxcbiAgICAgICAgMSxcbiAgICAgICAgLTEsXG4gICAgICApXG4gICAgICAuZmlsdGVyKGZvY3VzYWJsZUZpbHRlcik7XG5cbiAgaGFuZGxlRm9jdXNTdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJlxuICAgICAgdGFiQ2hpbGRyZW4ubGVuZ3RoID4gMSAmJlxuICAgICAgdGFiQ2hpbGRyZW5bdGFiQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgfTtcblxuICBoYW5kbGVGb2N1c0VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJiB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmIHRhYkNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5lbmFibGVUYWJMb29wKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BcIiByZWY9e3RoaXMudGFiTG9vcFJlZn0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcF9fc3RhcnRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c1N0YXJ0fVxuICAgICAgICAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19lbmRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c0VuZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIHVzZUZsb2F0aW5nLFxuICBhcnJvdyxcbiAgb2Zmc2V0LFxuICBmbGlwLFxuICBhdXRvVXBkYXRlLFxufSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgPSBbXG4gIFwidG9wLXN0YXJ0XCIsXG4gIFwidG9wLWVuZFwiLFxuICBcImJvdHRvbS1zdGFydFwiLFxuICBcImJvdHRvbS1lbmRcIixcbiAgXCJyaWdodC1zdGFydFwiLFxuICBcInJpZ2h0LWVuZFwiLFxuICBcImxlZnQtc3RhcnRcIixcbiAgXCJsZWZ0LWVuZFwiLFxuICBcInRvcFwiLFxuICBcInJpZ2h0XCIsXG4gIFwiYm90dG9tXCIsXG4gIFwibGVmdFwiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2l0aEZsb2F0aW5nKENvbXBvbmVudCkge1xuICBjb25zdCBXaXRoRmxvYXRpbmcgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBhbHRfcHJvcHMgPSB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIHBvcHBlck1vZGlmaWVyczogcHJvcHMucG9wcGVyTW9kaWZpZXJzIHx8IFtdLFxuICAgICAgcG9wcGVyUHJvcHM6IHByb3BzLnBvcHBlclByb3BzIHx8IHt9LFxuICAgICAgaGlkZVBvcHBlcjpcbiAgICAgICAgdHlwZW9mIHByb3BzLmhpZGVQb3BwZXIgPT09IFwiYm9vbGVhblwiID8gcHJvcHMuaGlkZVBvcHBlciA6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBhcnJvd1JlZiA9IFJlYWN0LnVzZVJlZigpO1xuICAgIGNvbnN0IGZsb2F0aW5nUHJvcHMgPSB1c2VGbG9hdGluZyh7XG4gICAgICBvcGVuOiAhYWx0X3Byb3BzLmhpZGVQb3BwZXIsXG4gICAgICB3aGlsZUVsZW1lbnRzTW91bnRlZDogYXV0b1VwZGF0ZSxcbiAgICAgIHBsYWNlbWVudDogYWx0X3Byb3BzLnBvcHBlclBsYWNlbWVudCxcbiAgICAgIG1pZGRsZXdhcmU6IFtcbiAgICAgICAgZmxpcCh7IHBhZGRpbmc6IDE1IH0pLFxuICAgICAgICBvZmZzZXQoMTApLFxuICAgICAgICBhcnJvdyh7IGVsZW1lbnQ6IGFycm93UmVmIH0pLFxuICAgICAgICAuLi5hbHRfcHJvcHMucG9wcGVyTW9kaWZpZXJzLFxuICAgICAgXSxcbiAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJQcm9wcyxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHsuLi5hbHRfcHJvcHN9IHBvcHBlclByb3BzPXt7IC4uLmZsb2F0aW5nUHJvcHMsIGFycm93UmVmIH19IC8+XG4gICAgKTtcbiAgfTtcblxuICBXaXRoRmxvYXRpbmcucHJvcFR5cGVzID0ge1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksXG4gICAgcG9wcGVyTW9kaWZpZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICByZXR1cm4gV2l0aEZsb2F0aW5nO1xufVxuIiwiaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBGbG9hdGluZ0Fycm93IH0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgd2l0aEZsb2F0aW5nIGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbmV4cG9ydCBjbGFzcyBQb3BwZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlkZVBvcHBlcjogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGFyZ2V0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgICBoaWRlUG9wcGVyLFxuICAgICAgcG9wcGVyQ29tcG9uZW50LFxuICAgICAgdGFyZ2V0Q29tcG9uZW50LFxuICAgICAgZW5hYmxlVGFiTG9vcCxcbiAgICAgIHBvcHBlck9uS2V5RG93bixcbiAgICAgIHBvcnRhbElkLFxuICAgICAgcG9ydGFsSG9zdCxcbiAgICAgIHBvcHBlclByb3BzLFxuICAgICAgc2hvd0Fycm93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHBvcHBlcjtcblxuICAgIGlmICghaGlkZVBvcHBlcikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXBvcHBlclwiLCBjbGFzc05hbWUpO1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXtlbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0RmxvYXRpbmd9XG4gICAgICAgICAgICBzdHlsZT17cG9wcGVyUHJvcHMuZmxvYXRpbmdTdHlsZXN9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICBkYXRhLXBsYWNlbWVudD17cG9wcGVyUHJvcHMucGxhY2VtZW50fVxuICAgICAgICAgICAgb25LZXlEb3duPXtwb3BwZXJPbktleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcHBlckNvbXBvbmVudH1cbiAgICAgICAgICAgIHtzaG93QXJyb3cgJiYgKFxuICAgICAgICAgICAgICA8RmxvYXRpbmdBcnJvd1xuICAgICAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMuYXJyb3dSZWZ9XG4gICAgICAgICAgICAgICAgY29udGV4dD17cG9wcGVyUHJvcHMuY29udGV4dH1cbiAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezh9XG4gICAgICAgICAgICAgICAgd2lkdGg9ezE2fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKC0xcHgpXCIgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190cmlhbmdsZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcikge1xuICAgICAgcG9wcGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lciwge30sIHBvcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbElkICYmICFoaWRlUG9wcGVyKSB7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxQb3J0YWwgcG9ydGFsSWQ9e3BvcnRhbElkfSBwb3J0YWxIb3N0PXtwb3J0YWxIb3N0fT5cbiAgICAgICAgICB7cG9wcGVyfVxuICAgICAgICA8L1BvcnRhbD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlci13cmFwcGVyXCIsIHdyYXBwZXJDbGFzc05hbWUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPGRpdiByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0UmVmZXJlbmNlfSBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc2VzfT5cbiAgICAgICAgICB7dGFyZ2V0Q29tcG9uZW50fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3BvcHBlcn1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoRmxvYXRpbmcoUG9wcGVyQ29tcG9uZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBDYWxlbmRhciBmcm9tIFwiLi9jYWxlbmRhclwiO1xuaW1wb3J0IENhbGVuZGFySWNvbiBmcm9tIFwiLi9jYWxlbmRhcl9pY29uXCI7XG5pbXBvcnQgUG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuaW1wb3J0IFBvcHBlckNvbXBvbmVudCBmcm9tIFwiLi9wb3BwZXJfY29tcG9uZW50XCI7XG5pbXBvcnQgeyBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgfSBmcm9tIFwiLi93aXRoX2Zsb2F0aW5nXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IHNldCB9IGZyb20gXCJkYXRlLWZucy9zZXRcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZEYXlcIjtcbmltcG9ydCB7IGlzVmFsaWQgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgaXNEYXRlLFxuICBpc0JlZm9yZSxcbiAgaXNBZnRlcixcbiAgaXNFcXVhbCxcbiAgc2V0VGltZSxcbiAgZ2V0U2Vjb25kcyxcbiAgZ2V0TWludXRlcyxcbiAgZ2V0SG91cnMsXG4gIGFkZERheXMsXG4gIGFkZE1vbnRocyxcbiAgYWRkV2Vla3MsXG4gIHN1YkRheXMsXG4gIHN1Yk1vbnRocyxcbiAgc3ViV2Vla3MsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNEYXlEaXNhYmxlZCxcbiAgaXNEYXlJblJhbmdlLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBwYXJzZURhdGUsXG4gIHNhZmVEYXRlRm9ybWF0LFxuICBzYWZlRGF0ZVJhbmdlRm9ybWF0LFxuICBnZXRIaWdodExpZ2h0RGF5c01hcCxcbiAgZ2V0WWVhcixcbiAgZ2V0TW9udGgsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBnZXRFbmRPZldlZWssXG4gIHJlZ2lzdGVyTG9jYWxlLFxuICBzZXREZWZhdWx0TG9jYWxlLFxuICBnZXREZWZhdWx0TG9jYWxlLFxuICBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gIGlzU2FtZURheSxcbiAgaXNNb250aERpc2FibGVkLFxuICBpc1llYXJEaXNhYmxlZCxcbiAgc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQsXG4gIGdldEhvbGlkYXlzTWFwLFxuICBpc0RhdGVCZWZvcmUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FsZW5kYXJDb250YWluZXIgfSBmcm9tIFwiLi9jYWxlbmRhcl9jb250YWluZXJcIjtcblxuZXhwb3J0IHsgcmVnaXN0ZXJMb2NhbGUsIHNldERlZmF1bHRMb2NhbGUsIGdldERlZmF1bHRMb2NhbGUgfTtcblxuY29uc3Qgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCI7XG5jb25zdCBXcmFwcGVkQ2FsZW5kYXIgPSBvbkNsaWNrT3V0c2lkZShDYWxlbmRhcik7XG5cbi8vIENvbXBhcmVzIGRhdGVzIHllYXIrbW9udGggY29tYmluYXRpb25zXG5mdW5jdGlvbiBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ2V0TW9udGgoZGF0ZTEpICE9PSBnZXRNb250aChkYXRlMikgfHwgZ2V0WWVhcihkYXRlMSkgIT09IGdldFllYXIoZGF0ZTIpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlMSAhPT0gZGF0ZTI7XG59XG5cbi8qKlxuICogR2VuZXJhbCBkYXRlcGlja2VyIGNvbXBvbmVudC5cbiAqL1xuY29uc3QgSU5QVVRfRVJSXzEgPSBcIkRhdGUgaW5wdXQgbm90IHZhbGlkLlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFsbG93U2FtZURheTogZmFsc2UsXG4gICAgICBkYXRlRm9ybWF0OiBcIk1NL2RkL3l5eXlcIixcbiAgICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogXCJMTExMIHl5eXlcIixcbiAgICAgIG9uQ2hhbmdlKCkge30sXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICBkcm9wZG93bk1vZGU6IFwic2Nyb2xsXCIsXG4gICAgICBvbkZvY3VzKCkge30sXG4gICAgICBvbkJsdXIoKSB7fSxcbiAgICAgIG9uS2V5RG93bigpIHt9LFxuICAgICAgb25JbnB1dENsaWNrKCkge30sXG4gICAgICBvblNlbGVjdCgpIHt9LFxuICAgICAgb25DbGlja091dHNpZGUoKSB7fSxcbiAgICAgIG9uTW9udGhDaGFuZ2UoKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJPcGVuKCkge30sXG4gICAgICBvbkNhbGVuZGFyQ2xvc2UoKSB7fSxcbiAgICAgIHByZXZlbnRPcGVuT25Gb2N1czogZmFsc2UsXG4gICAgICBvblllYXJDaGFuZ2UoKSB7fSxcbiAgICAgIG9uSW5wdXRFcnJvcigpIHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICB3aXRoUG9ydGFsOiBmYWxzZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBmYWxzZSxcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgICBzaG93VGltZVNlbGVjdDogZmFsc2UsXG4gICAgICBzaG93VGltZUlucHV0OiBmYWxzZSxcbiAgICAgIHNob3dQcmV2aW91c01vbnRoczogZmFsc2UsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1llYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dXZWVrUGlja2VyOiBmYWxzZSxcbiAgICAgIHN0cmljdFBhcnNpbmc6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsczogMzAsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgdGltZUlucHV0TGFiZWw6IFwiVGltZVwiLFxuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyOiBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gICAgICBmb2N1c1NlbGVjdGVkTW9udGg6IGZhbHNlLFxuICAgICAgc2hvd1BvcHBlckFycm93OiB0cnVlLFxuICAgICAgZXhjbHVkZVNjcm9sbGJhcjogdHJ1ZSxcbiAgICAgIGN1c3RvbVRpbWVJbnB1dDogbnVsbCxcbiAgICAgIGNhbGVuZGFyU3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IGZhbHNlLFxuICAgICAgdXNlUG9pbnRlckV2ZW50OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGFsbG93U2FtZURheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYXJpYURlc2NyaWJlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFJbnZhbGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbENsb3NlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbGxlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFSZXF1aXJlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbG9zZU9uU2Nyb2xsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGN1c3RvbUlucHV0UmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSksXG4gICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICBdKSxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgICBjYWxlbmRhckljb25DbGFzc25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZVJhdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dEVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNhbGVuZGFyT3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DYWxlbmRhckNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwbGFjZWhvbGRlclRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHByZXZlbnRPcGVuT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3RQYXJzaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzdGFydE9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2l0aFBvcnRhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGF0ZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjbGVhckJ1dHRvblRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvY3VzU2VsZWN0ZWRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBleGNsdWRlU2Nyb2xsYmFyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCk7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKFxuICAgICAgcHJldlByb3BzLmlubGluZSAmJlxuICAgICAgaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcHJldlByb3BzLm1vbnRoc1Nob3duICE9PSB0aGlzLnByb3BzLm1vbnRoc1Nob3duXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiAwIH0pO1xuICAgIH1cbiAgICBpZiAocHJldlByb3BzLmhpZ2hsaWdodERhdGVzICE9PSB0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICFwcmV2U3RhdGUuZm9jdXNlZCAmJlxuICAgICAgIWlzRXF1YWwocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZTdGF0ZS5vcGVuICE9PSB0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gZmFsc2UgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhck9wZW4oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSB0cnVlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgZ2V0UHJlU2VsZWN0aW9uID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgID8gdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c0VuZCAmJiB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzU3RhcnQgJiYgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA6IG5ld0RhdGUoKTtcblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGZyb20gc3RyaW5nIGZvcm1hdCB0byBzdGFuZGFyZCBEYXRlIGZvcm1hdFxuICBtb2RpZnlIb2xpZGF5cyA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5ob2xpZGF5cz8ucmVkdWNlKChhY2N1bXVsYXRvciwgaG9saWRheSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGhvbGlkYXkuZGF0ZSk7XG4gICAgICBpZiAoIWlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gWy4uLmFjY3VtdWxhdG9yLCB7IC4uLmhvbGlkYXksIGRhdGUgfV07XG4gICAgfSwgW10pO1xuXG4gIGNhbGNJbml0aWFsU3RhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFByZVNlbGVjdGlvbiA9IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgYm91bmRlZFByZVNlbGVjdGlvbiA9XG4gICAgICBtaW5EYXRlICYmIGlzQmVmb3JlKGRlZmF1bHRQcmVTZWxlY3Rpb24sIHN0YXJ0T2ZEYXkobWluRGF0ZSkpXG4gICAgICAgID8gbWluRGF0ZVxuICAgICAgICA6IG1heERhdGUgJiYgaXNBZnRlcihkZWZhdWx0UHJlU2VsZWN0aW9uLCBlbmRPZkRheShtYXhEYXRlKSlcbiAgICAgICAgICA/IG1heERhdGVcbiAgICAgICAgICA6IGRlZmF1bHRQcmVTZWxlY3Rpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IHRoaXMucHJvcHMuc3RhcnRPcGVuIHx8IGZhbHNlLFxuICAgICAgcHJldmVudEZvY3VzOiBmYWxzZSxcbiAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZCkgPz8gYm91bmRlZFByZVNlbGVjdGlvbixcbiAgICAgIC8vIHRyYW5zZm9ybWluZyBoaWdobGlnaHRlZCBkYXlzIChwZXJoYXBzIG5lc3RlZCBhcnJheSlcbiAgICAgIC8vIHRvIGZsYXQgTWFwIGZvciBmYXN0ZXIgYWNjZXNzIGluIGRheS5qc3hcbiAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgLy8gdXNlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb24gYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQsIGJ1dCBub3Qgb25cbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfTtcblxuICBjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmVudEZvY3VzVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIHNldEZvY3VzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZm9jdXMpIHtcbiAgICAgIHRoaXMuaW5wdXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZXRCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuYmx1cikge1xuICAgICAgdGhpcy5pbnB1dC5ibHVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgc2V0T3BlbiA9IChvcGVuLCBza2lwU2V0Qmx1ciA9IGZhbHNlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgb3Blbjogb3BlbixcbiAgICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAgIG9wZW4gJiYgdGhpcy5zdGF0ZS5vcGVuXG4gICAgICAgICAgICA/IHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uXG4gICAgICAgICAgICA6IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpLnByZVNlbGVjdGlvbixcbiAgICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUsXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgIGZvY3VzZWQ6IHNraXBTZXRCbHVyID8gcHJldi5mb2N1c2VkIDogZmFsc2UsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgIXNraXBTZXRCbHVyICYmIHRoaXMuc2V0Qmx1cigpO1xuXG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG4gIGlucHV0T2sgPSAoKSA9PiBpc0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuXG4gIGlzQ2FsZW5kYXJPcGVuID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW4gPT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLnN0YXRlLm9wZW4gJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHlcbiAgICAgIDogdGhpcy5wcm9wcy5vcGVuO1xuXG4gIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnByZXZlbnRGb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXMgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTtcbiAgfTtcblxuICBzZW5kRm9jdXNCYWNrVG9JbnB1dCA9ICgpID0+IHtcbiAgICAvLyBDbGVhciBwcmV2aW91cyB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgdGhlIHBvcHBlciBhbmQgcmVmb2N1cyB0aGUgaW5wdXRcbiAgICAvLyBzdG9wIHRoZSBpbnB1dCBmcm9tIGF1dG8gb3BlbmluZyBvbkZvY3VzXG4gICAgLy8gc2V0Rm9jdXMgdG8gdGhlIGlucHV0XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogdHJ1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNhbmNlbEZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9O1xuXG4gIGRlZmVyRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldEZvY3VzKCksIDEpO1xuICB9O1xuXG4gIGhhbmRsZURyb3Bkb3duRm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgaGFuZGxlQmx1ciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5vcGVuIHx8IHRoaXMucHJvcHMud2l0aFBvcnRhbCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAoLi4uYWxsQXJncykgPT4ge1xuICAgIGxldCBldmVudCA9IGFsbEFyZ3NbMF07XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcuYXBwbHkodGhpcywgYWxsQXJncyk7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnB1dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCxcbiAgICB9KTtcbiAgICBsZXQgZGF0ZSA9IHBhcnNlRGF0ZShcbiAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5zdHJpY3RQYXJzaW5nLFxuICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICk7XG4gICAgLy8gVXNlIGRhdGUgZnJvbSBgc2VsZWN0ZWRgIHByb3Agd2hlbiBtYW5pcHVsYXRpbmcgb25seSB0aW1lIGZvciBpbnB1dCB2YWx1ZVxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICBkYXRlICYmXG4gICAgICAhaXNTYW1lRGF5KGRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICBkYXRlID0gc2V0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHtcbiAgICAgICAgaG91cnM6IGdldEhvdXJzKGRhdGUpLFxuICAgICAgICBtaW51dGVzOiBnZXRNaW51dGVzKGRhdGUpLFxuICAgICAgICBzZWNvbmRzOiBnZXRTZWNvbmRzKGRhdGUpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRlIHx8ICFldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3QgPSAoZGF0ZSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIC8vIFByZXZlbnRpbmcgb25Gb2N1cyBldmVudCB0byBmaXggaXNzdWVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvaXNzdWVzLzYyOFxuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdyhldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIGZhbHNlLCBtb250aFNlbGVjdGVkSW4pO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmICFpc0RhdGVCZWZvcmUoZGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBzZXRTZWxlY3RlZCA9IChkYXRlLCBldmVudCwga2VlcElucHV0LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSBkYXRlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZERhdGUgIT09IG51bGwgJiZcbiAgICAgICAgaXNZZWFyRGlzYWJsZWQoZ2V0WWVhcihjaGFuZ2VkRGF0ZSksIHRoaXMucHJvcHMpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNNb250aERpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc0RheURpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0c011bHRpcGxlLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICAgIG1pblRpbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhaXNFcXVhbCh0aGlzLnByb3BzLnNlbGVjdGVkLCBjaGFuZ2VkRGF0ZSkgfHxcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dTYW1lRGF5IHx8XG4gICAgICBzZWxlY3RzUmFuZ2UgfHxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZVxuICAgICkge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICAgICAgKCFrZWVwSW5wdXQgfHxcbiAgICAgICAgICAgICghdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgaG91cjogZ2V0SG91cnModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBzZWNvbmQ6IGdldFNlY29uZHModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBtaW5UaW1lIGlzIHByZXNlbnQgdGhlbiBzZXQgdGhlIHRpbWUgdG8gbWluVGltZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWtlZXBJbnB1dCAmJlxuICAgICAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobWluVGltZSkge1xuICAgICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICAgIGhvdXI6IG1pblRpbWUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgbWludXRlOiBtaW5UaW1lLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgc2Vjb25kOiBtaW5UaW1lLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmZvY3VzU2VsZWN0ZWRNb250aCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IG1vbnRoU2VsZWN0ZWRJbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdHNSYW5nZSkge1xuICAgICAgICBjb25zdCBub1JhbmdlcyA9ICFzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0UmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGlzUmFuZ2VGaWxsZWQgPSBzdGFydERhdGUgJiYgZW5kRGF0ZTtcbiAgICAgICAgaWYgKG5vUmFuZ2VzKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlZERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlQmVmb3JlKGNoYW5nZWREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtzdGFydERhdGUsIGNoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSYW5nZUZpbGxlZCkge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKCFzZWxlY3RlZERhdGVzPy5sZW5ndGgpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZXMuc29tZShcbiAgICAgICAgICAgIChzZWxlY3RlZERhdGUpID0+IGlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHREYXRlcyA9IHNlbGVjdGVkRGF0ZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiAhaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgY2hhbmdlZERhdGUpLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgb25DaGFuZ2UobmV4dERhdGVzLCBldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5zZWxlY3RlZERhdGVzLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uQ2hhbmdlKGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFrZWVwSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoY2hhbmdlZERhdGUsIGV2ZW50KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBXaGVuIGNoZWNraW5nIHByZVNlbGVjdGlvbiB2aWEgbWluL21heERhdGUsIHRpbWVzIG5lZWQgdG8gYmUgbWFuaXB1bGF0ZWQgdmlhIHN0YXJ0T2ZEYXkvZW5kT2ZEYXlcbiAgc2V0UHJlU2VsZWN0aW9uID0gKGRhdGUpID0+IHtcbiAgICBjb25zdCBoYXNNaW5EYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWluRGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBjb25zdCBoYXNNYXhEYXRlID0gdHlwZW9mIHRoaXMucHJvcHMubWF4RGF0ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBsZXQgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSB0cnVlO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGF0ZSk7XG4gICAgICBpZiAoaGFzTWluRGF0ZSAmJiBoYXNNYXhEYXRlKSB7XG4gICAgICAgIC8vIGlzRGF5SW5SYW5nZSB1c2VzIHN0YXJ0T2ZEYXkgaW50ZXJuYWxseSwgc28gbm90IG5lY2Vzc2FyeSB0byBtYW5pcHVsYXRlIHRpbWVzIGhlcmVcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPSBpc0RheUluUmFuZ2UoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChoYXNNaW5EYXRlKSB7XG4gICAgICAgIGNvbnN0IG1pbkRhdGVTdGFydE9mRGF5ID0gc3RhcnRPZkRheSh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9XG4gICAgICAgICAgaXNBZnRlcihkYXRlLCBtaW5EYXRlU3RhcnRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtaW5EYXRlU3RhcnRPZkRheSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc01heERhdGUpIHtcbiAgICAgICAgY29uc3QgbWF4RGF0ZUVuZE9mRGF5ID0gZW5kT2ZEYXkodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQmVmb3JlKGRhdGUsIG1heERhdGVFbmRPZkRheSkgfHxcbiAgICAgICAgICBpc0VxdWFsKGRhdGVTdGFydE9mRGF5LCBtYXhEYXRlRW5kT2ZEYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNWYWxpZERhdGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwcmVTZWxlY3Rpb246IGRhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRPcGVuKCF0aGlzLnN0YXRlLm9wZW4pO1xuICB9O1xuXG4gIGhhbmRsZVRpbWVDaGFuZ2UgPSAodGltZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA6IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgbGV0IGNoYW5nZWREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgPyB0aW1lXG4gICAgICA6IHNldFRpbWUoc2VsZWN0ZWQsIHtcbiAgICAgICAgICBob3VyOiBnZXRIb3Vycyh0aW1lKSxcbiAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGltZSksXG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVTZWxlY3Rpb246IGNoYW5nZWREYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgfTtcblxuICBvbklucHV0Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbklucHV0Q2xpY2soKTtcbiAgfTtcblxuICBvbklucHV0S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLnN0YXRlLm9wZW4gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXRoaXMucHJvcHMucHJldmVudE9wZW5PbkZvY3VzXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8XG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkFycm93VXBcIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJFbnRlclwiXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5vbklucHV0Q2xpY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBjYWxlbmRhciBpcyBvcGVuLCB0aGVzZSBrZXlzIHdpbGwgZm9jdXMgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICBpZiAodGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnRLZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yU3RyaW5nID1cbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmIHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzXG4gICAgICAgICAgICA/ICcucmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXJbdGFiaW5kZXg9XCIwXCJdJ1xuICAgICAgICAgICAgOiAnLnJlYWN0LWRhdGVwaWNrZXJfX2RheVt0YWJpbmRleD1cIjBcIl0nO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPVxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZSAmJlxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Tm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yU3RyaW5nKTtcbiAgICAgICAgc2VsZWN0ZWRJdGVtICYmIHNlbGVjdGVkSXRlbS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5pbnB1dE9rKCkgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLmxhc3RQcmVTZWxlY3RDaGFuZ2UgPT09IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJUYWJcIikge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25Qb3J0YWxLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHByZXZlbnRGb2N1czogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtleURvd24gZXZlbnRzIHBhc3NlZCBkb3duIHRvIGRheS5qc3hcbiAgb25EYXlLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzU2hpZnRLZXlBY3RpdmUgPSBldmVudC5zaGlmdEtleTtcblxuICAgIGNvbnN0IGNvcHkgPSBuZXdEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0KGNvcHksIGV2ZW50KTtcbiAgICAgICF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgdGhpcy5zZXRQcmVTZWxlY3Rpb24oY29weSk7XG4gICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIGlmICghdGhpcy5pbnB1dE9rKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGxldCBuZXdTZWxlY3Rpb247XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YkRheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkRGF5cyhjb3B5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGRXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGlzU2hpZnRLZXlBY3RpdmVcbiAgICAgICAgICAgID8gc3ViWWVhcnMoY29weSwgMSlcbiAgICAgICAgICAgIDogc3ViTW9udGhzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUGFnZURvd25cIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IGFkZFllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IGFkZE1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkhvbWVcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgICAgIGNvcHksXG4gICAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiRW5kXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0RW5kT2ZXZWVrKGNvcHkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoIW5ld1NlbGVjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbklucHV0RXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSB9KTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkKG5ld1NlbGVjdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbihuZXdTZWxlY3Rpb24pO1xuICAgICAgLy8gbmVlZCB0byBmaWd1cmUgb3V0IHdoZXRoZXIgbW9udGggaGFzIGNoYW5nZWQgdG8gZm9jdXMgZGF5IGluIGlubGluZSB2ZXJzaW9uXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgY29uc3QgcHJldk1vbnRoID0gZ2V0TW9udGgoY29weSk7XG4gICAgICAgIGNvbnN0IG5ld01vbnRoID0gZ2V0TW9udGgobmV3U2VsZWN0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldlllYXIgPSBnZXRZZWFyKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdZZWFyID0gZ2V0WWVhcihuZXdTZWxlY3Rpb24pO1xuXG4gICAgICAgIGlmIChwcmV2TW9udGggIT09IG5ld01vbnRoIHx8IHByZXZZZWFyICE9PSBuZXdZZWFyKSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzIGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW9udGggaGFzbid0IGNoYW5nZWRcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGhhbmRsZSBnZW5lcmljIGtleSBkb3duIGV2ZW50cyBpbiB0aGUgcG9wcGVyIHRoYXQgZG8gbm90IGFkanVzdCBvciBzZWxlY3QgZGF0ZXNcbiAgLy8gZXg6IHdoaWxlIGZvY3VzaW5nIHByZXYgYW5kIG5leHQgbW9udGggYnV0dG9uc1xuICBvblBvcHBlcktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2xlYXJDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG51bGwsIGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgY2xlYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5vbkNsZWFyQ2xpY2soKTtcbiAgfTtcblxuICBvblNjcm9sbCA9IChldmVudCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiYm9vbGVhblwiICYmXG4gICAgICB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGxcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsKGV2ZW50KSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZW5kZXJDYWxlbmRhciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLmlzQ2FsZW5kYXJPcGVuKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFdyYXBwZWRDYWxlbmRhclxuICAgICAgICByZWY9eyhlbGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsZW07XG4gICAgICAgIH19XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgbW9udGhBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIHNldE9wZW49e3RoaXMuc2V0T3Blbn1cbiAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXRDYWxlbmRhcn1cbiAgICAgICAgdXNlV2Vla2RheXNTaG9ydD17dGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0fVxuICAgICAgICBmb3JtYXRXZWVrRGF5PXt0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXl9XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMuc3RhdGUucHJlU2VsZWN0aW9ufVxuICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlPXt0aGlzLmhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlfVxuICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnN0YXRlLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICBob2xpZGF5cz17Z2V0SG9saWRheXNNYXAodGhpcy5tb2RpZnlIb2xpZGF5cygpKX1cbiAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5zdGF0ZS5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgc2hvd1ByZXZpb3VzTW9udGhzPXt0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc31cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAgIHNob3dNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb249e3RoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9ufVxuICAgICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgIHRvZGF5QnV0dG9uPXt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgICB3ZWVrTGFiZWw9e3RoaXMucHJvcHMud2Vla0xhYmVsfVxuICAgICAgICBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcz17b3V0c2lkZUNsaWNrSWdub3JlQ2xhc3N9XG4gICAgICAgIGZpeGVkSGVpZ2h0PXt0aGlzLnByb3BzLmZpeGVkSGVpZ2h0fVxuICAgICAgICBtb250aHNTaG93bj17dGhpcy5wcm9wcy5tb250aHNTaG93bn1cbiAgICAgICAgbW9udGhTZWxlY3RlZEluPXt0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbn1cbiAgICAgICAgb25Ecm9wZG93bkZvY3VzPXt0aGlzLmhhbmRsZURyb3Bkb3duRm9jdXN9XG4gICAgICAgIG9uTW9udGhDaGFuZ2U9e3RoaXMucHJvcHMub25Nb250aENoYW5nZX1cbiAgICAgICAgb25ZZWFyQ2hhbmdlPXt0aGlzLnByb3BzLm9uWWVhckNoYW5nZX1cbiAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgd2Vla0RheUNsYXNzTmFtZT17dGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lfVxuICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICBzaG93RGF0ZVNlbGVjdD17dGhpcy5wcm9wcy5zaG93RGF0ZVNlbGVjdH1cbiAgICAgICAgc2hvd1RpbWVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIG9uVGltZUNoYW5nZT17dGhpcy5oYW5kbGVUaW1lQ2hhbmdlfVxuICAgICAgICB0aW1lRm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9XG4gICAgICAgIHRpbWVJbnRlcnZhbHM9e3RoaXMucHJvcHMudGltZUludGVydmFsc31cbiAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgIGV4Y2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5leGNsdWRlVGltZXN9XG4gICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jYWxlbmRhckNsYXNzTmFtZX1cbiAgICAgICAgY29udGFpbmVyPXt0aGlzLnByb3BzLmNhbGVuZGFyQ29udGFpbmVyfVxuICAgICAgICB5ZWFySXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzTW9udGhBcmlhTGFiZWx9XG4gICAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhBcmlhTGFiZWx9XG4gICAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c1llYXJCdXR0b25MYWJlbH1cbiAgICAgICAgbmV4dFllYXJBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJBcmlhTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbH1cbiAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICByZW5kZXJDdXN0b21IZWFkZXI9e3RoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyfVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgIHJlbmRlck1vbnRoQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJNb250aENvbnRlbnR9XG4gICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcn1cbiAgICAgICAgb25Nb250aE1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmV9XG4gICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcn1cbiAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlfVxuICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgc2hvd1RpbWVJbnB1dD17dGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICBzaG93TW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI9e3RoaXMucHJvcHMuZXhjbHVkZVNjcm9sbGJhcn1cbiAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLm9uS2V5RG93bn1cbiAgICAgICAgaGFuZGxlT25EYXlLZXlEb3duPXt0aGlzLm9uRGF5S2V5RG93bn1cbiAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMuc3RhdGUuZm9jdXNlZH1cbiAgICAgICAgY3VzdG9tVGltZUlucHV0PXt0aGlzLnByb3BzLmN1c3RvbVRpbWVJbnB1dH1cbiAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgeWVhckNsYXNzTmFtZT17dGhpcy5wcm9wcy55ZWFyQ2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvV3JhcHBlZENhbGVuZGFyPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQXJpYUxpdmVSZWdpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNDb250YWluc1RpbWUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3Q7XG4gICAgY29uc3QgbG9uZ0RhdGVGb3JtYXQgPSBpc0NvbnRhaW5zVGltZSA/IFwiUFBQUHBcIiA6IFwiUFBQUFwiO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBzdGFydCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgfSxcbiAgICAgICl9LiAke1xuICAgICAgICB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA/IFwiRW5kIGRhdGU6IFwiICtcbiAgICAgICAgICAgIHNhZmVEYXRlRm9ybWF0KHRoaXMucHJvcHMuZW5kRGF0ZSwge1xuICAgICAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHRpbWU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHllYXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQ6IFwieXl5eVwiLCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIG1vbnRoOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcIk1NTU0geXl5eVwiLCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgcXVhcnRlcjogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6IFwieXl5eSwgUVFRXCIsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIGRhdGU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB9LFxuICAgICAgICApfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHthcmlhTGl2ZU1lc3NhZ2V9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xzeCh0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgW291dHNpZGVDbGlja0lnbm9yZUNsYXNzXTogdGhpcy5zdGF0ZS5vcGVuLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY3VzdG9tSW5wdXQgPSB0aGlzLnByb3BzLmN1c3RvbUlucHV0IHx8IDxpbnB1dCB0eXBlPVwidGV4dFwiIC8+O1xuICAgIGNvbnN0IGN1c3RvbUlucHV0UmVmID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dFJlZiB8fCBcInJlZlwiO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPVxuICAgICAgdHlwZW9mIHRoaXMucHJvcHMudmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyB0aGlzLnByb3BzLnZhbHVlXG4gICAgICAgIDogdHlwZW9mIHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgID8gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG4gICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNSYW5nZVxuICAgICAgICAgICAgPyBzYWZlRGF0ZVJhbmdlRm9ybWF0KFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlXG4gICAgICAgICAgICAgID8gc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQodGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzLCB0aGlzLnByb3BzKVxuICAgICAgICAgICAgICA6IHNhZmVEYXRlRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMpO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjdXN0b21JbnB1dCwge1xuICAgICAgW2N1c3RvbUlucHV0UmVmXTogKGlucHV0KSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgIH0sXG4gICAgICB2YWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVCbHVyLFxuICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLFxuICAgICAgb25DbGljazogdGhpcy5vbklucHV0Q2xpY2ssXG4gICAgICBvbkZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzLFxuICAgICAgb25LZXlEb3duOiB0aGlzLm9uSW5wdXRLZXlEb3duLFxuICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICBmb3JtOiB0aGlzLnByb3BzLmZvcm0sXG4gICAgICBhdXRvRm9jdXM6IHRoaXMucHJvcHMuYXV0b0ZvY3VzLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXJUZXh0LFxuICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICBhdXRvQ29tcGxldGU6IHRoaXMucHJvcHMuYXV0b0NvbXBsZXRlLFxuICAgICAgY2xhc3NOYW1lOiBjbHN4KGN1c3RvbUlucHV0LnByb3BzLmNsYXNzTmFtZSwgY2xhc3NOYW1lKSxcbiAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXG4gICAgICByZXF1aXJlZDogdGhpcy5wcm9wcy5yZXF1aXJlZCxcbiAgICAgIHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxuICAgICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IHRoaXMucHJvcHMuYXJpYURlc2NyaWJlZEJ5LFxuICAgICAgXCJhcmlhLWludmFsaWRcIjogdGhpcy5wcm9wcy5hcmlhSW52YWxpZCxcbiAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRoaXMucHJvcHMuYXJpYUxhYmVsbGVkQnksXG4gICAgICBcImFyaWEtcmVxdWlyZWRcIjogdGhpcy5wcm9wcy5hcmlhUmVxdWlyZWQsXG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyQ2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDbGVhcmFibGUsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIGNsZWFyQnV0dG9uVGl0bGUsXG4gICAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZSA9IFwiXCIsXG4gICAgICBhcmlhTGFiZWxDbG9zZSA9IFwiQ2xvc2VcIixcbiAgICAgIHNlbGVjdGVkRGF0ZXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKFxuICAgICAgaXNDbGVhcmFibGUgJiZcbiAgICAgIChzZWxlY3RlZCAhPSBudWxsIHx8XG4gICAgICAgIHN0YXJ0RGF0ZSAhPSBudWxsIHx8XG4gICAgICAgIGVuZERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBzZWxlY3RlZERhdGVzPy5sZW5ndGgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFxuICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19jbG9zZS1pY29uXCIsXG4gICAgICAgICAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZSxcbiAgICAgICAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19jbG9zZS1pY29uLS1kaXNhYmxlZFwiOiBkaXNhYmxlZCB9LFxuICAgICAgICAgICl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbENsb3NlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGVhckNsaWNrfVxuICAgICAgICAgIHRpdGxlPXtjbGVhckJ1dHRvblRpdGxlfVxuICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dENvbnRhaW5lcigpIHtcbiAgICBjb25zdCB7IHNob3dJY29uLCBpY29uLCBjYWxlbmRhckljb25DbGFzc25hbWUsIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2sgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb3BlbiB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2lucHV0LWNvbnRhaW5lciR7XG4gICAgICAgICAgc2hvd0ljb24gPyBcIiByZWFjdC1kYXRlcGlja2VyX192aWV3LWNhbGVuZGFyLWljb25cIiA6IFwiXCJcbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIHtzaG93SWNvbiAmJiAoXG4gICAgICAgICAgPENhbGVuZGFySWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y2FsZW5kYXJJY29uQ2xhc3NuYW1lfSAke1xuICAgICAgICAgICAgICBvcGVuICYmIFwicmVhY3QtZGF0ZXBpY2tlci1pZ25vcmUtb25jbGlja291dHNpZGVcIlxuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB7Li4uKHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2tcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLnRvZ2dsZUNhbGVuZGFyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiBudWxsKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlbmRlckFyaWFMaXZlTWVzc2FnZSAmJiB0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckRhdGVJbnB1dCgpfVxuICAgICAgICB7dGhpcy5yZW5kZXJDbGVhckJ1dHRvbigpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjYWxlbmRhciA9IHRoaXMucmVuZGVyQ2FsZW5kYXIoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLmlubGluZSkgcmV0dXJuIGNhbGVuZGFyO1xuXG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFBvcnRhbCkge1xuICAgICAgbGV0IHBvcnRhbENvbnRhaW5lciA9IHRoaXMuc3RhdGUub3BlbiA/IChcbiAgICAgICAgPFRhYkxvb3AgZW5hYmxlVGFiTG9vcD17dGhpcy5wcm9wcy5lbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19wb3J0YWxcIlxuICAgICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uUG9ydGFsS2V5RG93bn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2FsZW5kYXJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvVGFiTG9vcD5cbiAgICAgICkgOiBudWxsO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5vcGVuICYmIHRoaXMucHJvcHMucG9ydGFsSWQpIHtcbiAgICAgICAgcG9ydGFsQ29udGFpbmVyID0gKFxuICAgICAgICAgIDxQb3J0YWxcbiAgICAgICAgICAgIHBvcnRhbElkPXt0aGlzLnByb3BzLnBvcnRhbElkfVxuICAgICAgICAgICAgcG9ydGFsSG9zdD17dGhpcy5wcm9wcy5wb3J0YWxIb3N0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3J0YWxDb250YWluZXJ9XG4gICAgICAgICAgPC9Qb3J0YWw+XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRDb250YWluZXIoKX1cbiAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxQb3BwZXJDb21wb25lbnRcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBvcHBlckNsYXNzTmFtZX1cbiAgICAgICAgd3JhcHBlckNsYXNzTmFtZT17dGhpcy5wcm9wcy53cmFwcGVyQ2xhc3NOYW1lfVxuICAgICAgICBoaWRlUG9wcGVyPXshdGhpcy5pc0NhbGVuZGFyT3BlbigpfVxuICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgcG9ydGFsSG9zdD17dGhpcy5wcm9wcy5wb3J0YWxIb3N0fVxuICAgICAgICBwb3BwZXJNb2RpZmllcnM9e3RoaXMucHJvcHMucG9wcGVyTW9kaWZpZXJzfVxuICAgICAgICB0YXJnZXRDb21wb25lbnQ9e3RoaXMucmVuZGVySW5wdXRDb250YWluZXIoKX1cbiAgICAgICAgcG9wcGVyQ29udGFpbmVyPXt0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcn1cbiAgICAgICAgcG9wcGVyQ29tcG9uZW50PXtjYWxlbmRhcn1cbiAgICAgICAgcG9wcGVyUGxhY2VtZW50PXt0aGlzLnByb3BzLnBvcHBlclBsYWNlbWVudH1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHBvcHBlck9uS2V5RG93bj17dGhpcy5vblBvcHBlcktleURvd259XG4gICAgICAgIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH1cbiAgICAgICAgc2hvd0Fycm93PXt0aGlzLnByb3BzLnNob3dQb3BwZXJBcnJvd31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCA9IFwiaW5wdXRcIjtcbmNvbnN0IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFID0gXCJuYXZpZ2F0ZVwiO1xuIl0sIm5hbWVzIjpbIkRFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiIsImxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwIiwibmV3RGF0ZSIsInZhbHVlIiwiZCIsIlN0cmluZyIsInBhcnNlSVNPIiwidG9EYXRlIiwiRGF0ZSIsImlzVmFsaWQiLCJwYXJzZURhdGUiLCJkYXRlRm9ybWF0IiwibG9jYWxlIiwic3RyaWN0UGFyc2luZyIsIm1pbkRhdGUiLCJwYXJzZWREYXRlIiwibG9jYWxlT2JqZWN0IiwiZ2V0TG9jYWxlT2JqZWN0IiwiZ2V0RGVmYXVsdExvY2FsZSIsInN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImRmIiwidHJ5UGFyc2VEYXRlIiwicGFyc2UiLCJ1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnMiLCJ1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zIiwiZm9ybWF0RGF0ZSIsIm1hdGNoIiwibWFwIiwic3Vic3RyaW5nIiwiZmlyc3RDaGFyYWN0ZXIiLCJsb25nRm9ybWF0dGVyIiwibG9uZ0Zvcm1hdHRlcnMiLCJmb3JtYXRMb25nIiwiam9pbiIsImxlbmd0aCIsInNsaWNlIiwiZGF0ZSIsImlzVmFsaWREYXRlIiwiaXNCZWZvcmUiLCJmb3JtYXRTdHIiLCJmb3JtYXQiLCJsb2NhbGVPYmoiLCJjb25zb2xlIiwid2FybiIsImNvbmNhdCIsInNhZmVEYXRlRm9ybWF0IiwiX3JlZiIsInNhZmVEYXRlUmFuZ2VGb3JtYXQiLCJzdGFydERhdGUiLCJlbmREYXRlIiwicHJvcHMiLCJmb3JtYXR0ZWRTdGFydERhdGUiLCJmb3JtYXR0ZWRFbmREYXRlIiwic2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQiLCJkYXRlcyIsImZvcm1hdHRlZEZpcnN0RGF0ZSIsImZvcm1hdHRlZFNlY29uZERhdGUiLCJleHRyYURhdGVzQ291bnQiLCJzZXRUaW1lIiwiX3JlZjIiLCJfcmVmMiRob3VyIiwiaG91ciIsIl9yZWYyJG1pbnV0ZSIsIm1pbnV0ZSIsIl9yZWYyJHNlY29uZCIsInNlY29uZCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJnZXRXZWVrIiwiZ2V0SVNPV2VlayIsImdldERheU9mV2Vla0NvZGUiLCJkYXkiLCJnZXRTdGFydE9mRGF5Iiwic3RhcnRPZkRheSIsImdldFN0YXJ0T2ZXZWVrIiwiY2FsZW5kYXJTdGFydERheSIsInN0YXJ0T2ZXZWVrIiwid2Vla1N0YXJ0c09uIiwiZ2V0U3RhcnRPZk1vbnRoIiwic3RhcnRPZk1vbnRoIiwiZ2V0U3RhcnRPZlllYXIiLCJzdGFydE9mWWVhciIsImdldFN0YXJ0T2ZRdWFydGVyIiwic3RhcnRPZlF1YXJ0ZXIiLCJnZXRTdGFydE9mVG9kYXkiLCJnZXRFbmRPZldlZWsiLCJlbmRPZldlZWsiLCJpc1NhbWVZZWFyIiwiZGF0ZTEiLCJkYXRlMiIsImRmSXNTYW1lWWVhciIsImlzU2FtZU1vbnRoIiwiZGZJc1NhbWVNb250aCIsImlzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZVF1YXJ0ZXIiLCJpc1NhbWVEYXkiLCJkZklzU2FtZURheSIsImlzRXF1YWwiLCJkZklzRXF1YWwiLCJpc0RheUluUmFuZ2UiLCJ2YWxpZCIsInN0YXJ0IiwiZW5kIiwiZW5kT2ZEYXkiLCJpc1dpdGhpbkludGVydmFsIiwiZXJyIiwicmVnaXN0ZXJMb2NhbGUiLCJsb2NhbGVOYW1lIiwibG9jYWxlRGF0YSIsInNjb3BlIiwid2luZG93IiwiZ2xvYmFsVGhpcyIsIl9fbG9jYWxlRGF0YV9fIiwic2V0RGVmYXVsdExvY2FsZSIsIl9fbG9jYWxlSWRfXyIsImxvY2FsZVNwZWMiLCJnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUiLCJmb3JtYXRGdW5jIiwiZ2V0V2Vla2RheU1pbkluTG9jYWxlIiwiZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUiLCJnZXRNb250aEluTG9jYWxlIiwibW9udGgiLCJzZXRNb250aCIsImdldE1vbnRoU2hvcnRJbkxvY2FsZSIsImdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlIiwicXVhcnRlciIsInNldFF1YXJ0ZXIiLCJpc0RheURpc2FibGVkIiwiX3JlZjMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJtYXhEYXRlIiwiZXhjbHVkZURhdGVzIiwiZXhjbHVkZURhdGVJbnRlcnZhbHMiLCJpbmNsdWRlRGF0ZXMiLCJpbmNsdWRlRGF0ZUludGVydmFscyIsImZpbHRlckRhdGUiLCJpc091dE9mQm91bmRzIiwic29tZSIsImV4Y2x1ZGVEYXRlIiwiX3JlZjQiLCJpbmNsdWRlRGF0ZSIsIl9yZWY1IiwiaXNEYXlFeGNsdWRlZCIsIl9yZWY2IiwiX3JlZjciLCJpc01vbnRoRGlzYWJsZWQiLCJfcmVmOCIsImVuZE9mTW9udGgiLCJpc01vbnRoSW5SYW5nZSIsIm0iLCJzdGFydERhdGVZZWFyIiwiZ2V0WWVhciIsInN0YXJ0RGF0ZU1vbnRoIiwiZ2V0TW9udGgiLCJlbmREYXRlWWVhciIsImVuZERhdGVNb250aCIsImRheVllYXIiLCJpc1F1YXJ0ZXJEaXNhYmxlZCIsIl9yZWY5IiwiaXNZZWFySW5SYW5nZSIsInllYXIiLCJzdGFydFllYXIiLCJlbmRZZWFyIiwiaXNZZWFyRGlzYWJsZWQiLCJfcmVmMTAiLCJlbmRPZlllYXIiLCJpc1F1YXJ0ZXJJblJhbmdlIiwicSIsInN0YXJ0RGF0ZVF1YXJ0ZXIiLCJnZXRRdWFydGVyIiwiZW5kRGF0ZVF1YXJ0ZXIiLCJfcmVmMTEiLCJkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMiLCJpc1RpbWVJbkxpc3QiLCJ0aW1lIiwidGltZXMiLCJsaXN0VGltZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImlzVGltZURpc2FibGVkIiwiX3JlZjEyIiwiZXhjbHVkZVRpbWVzIiwiaW5jbHVkZVRpbWVzIiwiZmlsdGVyVGltZSIsImlzVGltZUluRGlzYWJsZWRSYW5nZSIsIl9yZWYxMyIsIm1pblRpbWUiLCJtYXhUaW1lIiwiRXJyb3IiLCJiYXNlIiwiYmFzZVRpbWUiLCJtaW4iLCJtYXgiLCJtb250aERpc2FibGVkQmVmb3JlIiwiX3JlZjE0IiwicHJldmlvdXNNb250aCIsInN1Yk1vbnRocyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIiwiZXZlcnkiLCJtb250aERpc2FibGVkQWZ0ZXIiLCJfcmVmMTUiLCJuZXh0TW9udGgiLCJhZGRNb250aHMiLCJ5ZWFyRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTYiLCJwcmV2aW91c1llYXIiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQmVmb3JlIiwiX3JlZjE3IiwiX3JlZjE3JHllYXJJdGVtTnVtYmVyIiwieWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QiLCJnZXRZZWFyc1BlcmlvZCIsImVuZFBlcmlvZCIsIm1pbkRhdGVZZWFyIiwieWVhckRpc2FibGVkQWZ0ZXIiLCJfcmVmMTgiLCJuZXh0WWVhciIsImFkZFllYXJzIiwieWVhcnNEaXNhYmxlZEFmdGVyIiwiX3JlZjE5IiwiX3JlZjE5JHllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kMiIsInN0YXJ0UGVyaW9kIiwibWF4RGF0ZVllYXIiLCJnZXRFZmZlY3RpdmVNaW5EYXRlIiwiX3JlZjIwIiwibWluRGF0ZXMiLCJmaWx0ZXIiLCJnZXRFZmZlY3RpdmVNYXhEYXRlIiwiX3JlZjIxIiwibWF4RGF0ZXMiLCJnZXRIaWdodExpZ2h0RGF5c01hcCIsImhpZ2hsaWdodERhdGVzIiwiZGVmYXVsdENsYXNzTmFtZSIsImRhdGVDbGFzc2VzIiwiTWFwIiwiaSIsImxlbiIsIm9iaiIsImlzRGF0ZSIsImtleSIsImNsYXNzTmFtZXNBcnIiLCJnZXQiLCJpbmNsdWRlcyIsInB1c2giLCJzZXQiLCJfdHlwZW9mIiwia2V5cyIsIk9iamVjdCIsImNsYXNzTmFtZSIsImFyck9mRGF0ZXMiLCJjb25zdHJ1Y3RvciIsImsiLCJhcnJheXNBcmVFcXVhbCIsImFycmF5MSIsImFycmF5MiIsImluZGV4IiwiZ2V0SG9saWRheXNNYXAiLCJob2xpZGF5RGF0ZXMiLCJob2xpZGF5IiwiZGF0ZU9iaiIsImhvbGlkYXlOYW1lIiwiY2xhc3NOYW1lc09iaiIsImhvbGlkYXlOYW1lQXJyIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwidGltZXNUb0luamVjdEFmdGVyIiwiY3VycmVudFRpbWUiLCJjdXJyZW50TXVsdGlwbGllciIsImludGVydmFscyIsImluamVjdGVkVGltZXMiLCJsIiwiaW5qZWN0ZWRUaW1lIiwiYWRkTWludXRlcyIsImFkZEhvdXJzIiwibmV4dFRpbWUiLCJpc0FmdGVyIiwiYWRkWmVybyIsIk1hdGgiLCJjZWlsIiwiZ2V0SG91cnNJbkRheSIsImdldEZ1bGxZZWFyIiwiZ2V0RGF0ZSIsInN0YXJ0T2ZUaGVOZXh0RGF5Iiwicm91bmQiLCJzdGFydE9mTWludXRlIiwic2Vjb25kcyIsImdldFNlY29uZHMiLCJtaWxsaXNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJnZXRUaW1lIiwiaXNTYW1lTWludXRlIiwiZDEiLCJkMiIsImdldE1pZG5pZ2h0RGF0ZSIsImRhdGVXaXRob3V0VGltZSIsImlzRGF0ZUJlZm9yZSIsImRhdGVUb0NvbXBhcmUiLCJtaWRuaWdodERhdGUiLCJtaWRuaWdodERhdGVUb0NvbXBhcmUiLCJpc1NwYWNlS2V5RG93biIsImV2ZW50IiwiU1BBQ0VfS0VZIiwiZ2VuZXJhdGVZZWFycyIsIm5vT2ZZZWFyIiwibGlzdCIsIm5ld1llYXIiLCJpc0luUmFuZ2UiLCJZZWFyRHJvcGRvd25PcHRpb25zIiwiX1JlYWN0JENvbXBvbmVudCIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIl9kZWZpbmVQcm9wZXJ0eSIsInNlbGVjdGVkWWVhciIsIm9wdGlvbnMiLCJzdGF0ZSIsInllYXJzTGlzdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIm9uQ2xpY2siLCJvbkNoYW5nZSIsImJpbmQiLCJtaW5ZZWFyIiwibWF4WWVhciIsImZpbmQiLCJ1bnNoaWZ0IiwiaW5jcmVtZW50WWVhcnMiLCJkZWNyZW1lbnRZZWFycyIsIm9uQ2FuY2VsIiwiYW1vdW50IiwieWVhcnMiLCJzZXRTdGF0ZSIsInNoaWZ0WWVhcnMiLCJ5ZWFyRHJvcGRvd25JdGVtTnVtYmVyIiwic2Nyb2xsYWJsZVllYXJEcm9wZG93biIsImRyb3Bkb3duUmVmIiwiY3JlYXRlUmVmIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkN1cnJlbnQiLCJjdXJyZW50IiwiZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4iLCJjaGlsZHJlbiIsImZyb20iLCJzZWxlY3RlZFllYXJPcHRpb25FbCIsImNoaWxkRWwiLCJhcmlhU2VsZWN0ZWQiLCJzY3JvbGxUb3AiLCJvZmZzZXRUb3AiLCJjbGllbnRIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJyZW5kZXIiLCJkcm9wZG93bkNsYXNzIiwiY2xzeCIsInJlZiIsInJlbmRlck9wdGlvbnMiLCJDb21wb25lbnQiLCJXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyIsIm9uQ2xpY2tPdXRzaWRlIiwiWWVhckRyb3Bkb3duIiwiX2xlbiIsImFyZ3MiLCJfa2V5IiwiZHJvcGRvd25WaXNpYmxlIiwiZSIsInRhcmdldCIsIm9uU2VsZWN0Q2hhbmdlIiwicmVuZGVyU2VsZWN0T3B0aW9ucyIsInZpc2libGUiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJ0b2dnbGVEcm9wZG93biIsInJlc3VsdCIsInJlbmRlclJlYWRWaWV3IiwicmVuZGVyRHJvcGRvd24iLCJhZGp1c3REYXRlT25DaGFuZ2UiLCJoYW5kbGVZZWFyQ2hhbmdlIiwib25TZWxlY3QiLCJzZXRPcGVuIiwicmVuZGVyZWREcm9wZG93biIsImRyb3Bkb3duTW9kZSIsInJlbmRlclNjcm9sbE1vZGUiLCJyZW5kZXJTZWxlY3RNb2RlIiwiTW9udGhEcm9wZG93bk9wdGlvbnMiLCJtb250aE5hbWVzIiwiaXNTZWxlY3RlZE1vbnRoIiwiV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zIiwiTW9udGhEcm9wZG93biIsIk0iLCJfdGhpczIiLCJ1c2VTaG9ydE1vbnRoSW5Ecm9wZG93biIsInV0aWxzIiwiZ2VuZXJhdGVNb250aFllYXJzIiwiY3VyckRhdGUiLCJsYXN0RGF0ZSIsIk1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIm1vbnRoWWVhcnNMaXN0IiwibW9udGhZZWFyIiwibW9udGhZZWFyUG9pbnQiLCJpc1NhbWVNb250aFllYXIiLCJzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24iLCJXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwiTW9udGhZZWFyRHJvcGRvd24iLCJ0aW1lUG9pbnQiLCJ5ZWFyTW9udGgiLCJjaGFuZ2VkRGF0ZSIsInBhcnNlSW50IiwiRGF5IiwiaXNEaXNhYmxlZCIsIm9uTW91c2VFbnRlciIsImV2ZW50S2V5IiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVPbktleURvd24iLCJvdGhlciIsIl90aGlzJHByb3BzJHNlbGVjdGVkRCIsImRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uIiwiaXNTZWxlY3RlZERhdGUiLCJzZWxlY3RzTXVsdGlwbGUiLCJzZWxlY3RlZERhdGVzIiwiaXNTYW1lRGF5T3JXZWVrIiwic2VsZWN0ZWQiLCJwcmVTZWxlY3Rpb24iLCJzaG93V2Vla1BpY2tlciIsImlzU2FtZVdlZWsiLCJfdGhpcyRwcm9wcyIsImRheVN0ciIsIl90aGlzJHByb3BzMiIsImhvbGlkYXlzIiwiaGFzIiwiX3RoaXMkcHJvcHMzIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nIiwiX3RoaXMkcHJvcHM0Iiwic2VsZWN0c1N0YXJ0Iiwic2VsZWN0c0VuZCIsInNlbGVjdHNSYW5nZSIsInNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlIiwic2VsZWN0aW5nRGF0ZSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzIiLCJpc0luU2VsZWN0aW5nUmFuZ2UiLCJfdGhpcyRwcm9wczUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmczIiwiX3RoaXMkcHJvcHM2IiwiX3RoaXMkcHJvcHM3IiwiX3RoaXMkcHJvcHM4Iiwid2Vla2RheSIsImdldERheSIsIl90aGlzJHByb3BzJHNlbGVjdGVkRDIiLCJkYXlDbGFzc05hbWUiLCJpc0V4Y2x1ZGVkIiwiaXNTZWxlY3RlZCIsImlzS2V5Ym9hcmRTZWxlY3RlZCIsImlzUmFuZ2VTdGFydCIsImlzUmFuZ2VFbmQiLCJpc1NlbGVjdGluZ1JhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ1JhbmdlRW5kIiwiaXNDdXJyZW50RGF5IiwiaXNXZWVrZW5kIiwiaXNBZnRlck1vbnRoIiwiaXNCZWZvcmVNb250aCIsImdldEhpZ2hMaWdodGVkQ2xhc3MiLCJnZXRIb2xpZGF5c0NsYXNzIiwiX3RoaXMkcHJvcHM5IiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlIiwiYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUyIiwiYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkIiwicHJlZml4IiwiX3RoaXMkcHJvcHMxMCIsIl90aGlzJHByb3BzMTAkaG9saWRheSIsImNvbXBhcmVEdCIsInRpdGxlcyIsImFwcGx5IiwiaG9saWRheU5hbWVzIiwibWVzc2FnZSIsInNlbGVjdGVkRGF5IiwicHJlU2VsZWN0aW9uRGF5IiwidGFiSW5kZXgiLCJzaG93V2Vla051bWJlciIsImlzU3RhcnRPZldlZWsiLCJfdGhpcyRkYXlFbCRjdXJyZW50IiwicHJldlByb3BzIiwic2hvdWxkRm9jdXNEYXkiLCJnZXRUYWJJbmRleCIsImlzSW5wdXRGb2N1c2VkIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiYm9keSIsImlubGluZSIsInNob3VsZEZvY3VzRGF5SW5saW5lIiwiY29udGFpbmVyUmVmIiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQiLCJkYXlFbCIsImZvY3VzIiwicHJldmVudFNjcm9sbCIsInJlbmRlckRheUNvbnRlbnRzIiwiZ2V0Q2xhc3NOYW1lcyIsIm9uS2V5RG93biIsImhhbmRsZUNsaWNrIiwidXNlUG9pbnRlckV2ZW50IiwiaGFuZGxlTW91c2VFbnRlciIsIm9uUG9pbnRlckVudGVyIiwiZ2V0QXJpYUxhYmVsIiwicm9sZSIsInRpdGxlIiwiZ2V0VGl0bGUiLCJoYW5kbGVGb2N1c0RheSIsImNvbXBvbmVudERpZFVwZGF0ZSIsIldlZWtOdW1iZXIiLCJzaG91bGRGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyRWwiLCJoYW5kbGVGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyIiwiX3RoaXMkcHJvcHMkYXJpYUxhYmVsIiwiYXJpYUxhYmVsUHJlZml4Iiwid2Vla051bWJlckNsYXNzZXMiLCJXZWVrIiwib25EYXlDbGljayIsIm9uRGF5TW91c2VFbnRlciIsIm9uV2Vla1NlbGVjdCIsImhhbmRsZURheUNsaWNrIiwic2hvdWxkQ2xvc2VPblNlbGVjdCIsImZvcm1hdFdlZWtOdW1iZXIiLCJkYXlzIiwib25DbGlja0FjdGlvbiIsImhhbmRsZVdlZWtDbGljayIsIm9mZnNldCIsImFkZERheXMiLCJjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXgiLCJkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCIsInZhbHVlT2YiLCJoYW5kbGVEYXlNb3VzZUVudGVyIiwicmVuZGVyRGF5cyIsIkZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UIiwiTU9OVEhfQ09MVU1OU19MQVlPVVQiLCJUV09fQ09MVU1OUyIsIlRIUkVFX0NPTFVNTlMiLCJGT1VSX0NPTFVNTlMiLCJNT05USF9DT0xVTU5TIiwiZ3JpZCIsInZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldCIsIk1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQiLCJnZXRNb250aENvbHVtbnNMYXlvdXQiLCJzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlciIsInNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIiLCJNb250aCIsIm9yZGVySW5EaXNwbGF5Iiwib25Nb3VzZUxlYXZlIiwiaXNJblNlbGVjdGluZ1JhbmdlTW9udGgiLCJfbW9udGgiLCJfdGhpcyRwcm9wcyRzZWxlY3Rpbmc0Iiwid2Vla3MiLCJpc0ZpeGVkSGVpZ2h0IiwiZml4ZWRIZWlnaHQiLCJicmVha0FmdGVyTmV4dFB1c2giLCJjdXJyZW50V2Vla1N0YXJ0Iiwid2Vla0FyaWFMYWJlbFByZWZpeCIsInNob3dXZWVrTnVtYmVycyIsImlzRml4ZWRBbmRGaW5hbFdlZWsiLCJpc05vbkZpeGVkQW5kT3V0T2ZNb250aCIsImlzV2Vla0luTW9udGgiLCJwZWVrTmV4dE1vbnRoIiwibGFiZWxEYXRlIiwibmV3TW9udGgiLCJzZXRQcmVTZWxlY3Rpb24iLCJNT05USF9SRUZTIiwiaGFuZGxlT25Nb250aEtleURvd24iLCJtb250aENvbHVtbnNMYXlvdXQiLCJ2ZXJ0aWNhbE9mZnNldCIsIm1vbnRoc0dyaWQiLCJvbk1vbnRoQ2xpY2siLCJoYW5kbGVNb250aE5hdmlnYXRpb24iLCJuZXdRdWFydGVyIiwiUVVBUlRFUl9SRUZTIiwib25RdWFydGVyQ2xpY2siLCJoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiIsIm1vbnRoQ2xhc3NOYW1lIiwiX21vbnRoQ2xhc3NOYW1lIiwiaXNSYW5nZVN0YXJ0TW9udGgiLCJpc1JhbmdlRW5kTW9udGgiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCIsImlzQ3VycmVudE1vbnRoIiwicHJlU2VsZWN0ZWRNb250aCIsInByZVNlbGVjdGVkUXVhcnRlciIsIl90aGlzJHByb3BzMTEiLCJfdGhpcyRwcm9wczExJGNob29zZUQiLCJfdGhpcyRwcm9wczExJGRpc2FibGUiLCJfdGhpcyRwcm9wczEyIiwiaXNTZWxlY3RlZFF1YXJ0ZXIiLCJpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyIiwiaXNSYW5nZVN0YXJ0UXVhcnRlciIsImlzUmFuZ2VFbmRRdWFydGVyIiwiX3RoaXMkcHJvcHMxMyIsInNob3dGdWxsTW9udGhZZWFyUGlja2VyIiwicmVuZGVyTW9udGhDb250ZW50Iiwic2hvcnRNb250aFRleHQiLCJmdWxsTW9udGhUZXh0IiwiX3RoaXMkcHJvcHMxNCIsInJlbmRlclF1YXJ0ZXJDb250ZW50Iiwic2hvcnRRdWFydGVyIiwiX3RoaXMkcHJvcHMxNSIsIm1vbnRoQ29sdW1ucyIsImoiLCJldiIsIm9uTW9udGhLZXlEb3duIiwib25Nb250aE1vdXNlRW50ZXIiLCJnZXRNb250aENsYXNzTmFtZXMiLCJnZXRNb250aENvbnRlbnQiLCJfdGhpcyRwcm9wczE2IiwicXVhcnRlcnMiLCJvblF1YXJ0ZXJLZXlEb3duIiwib25RdWFydGVyTW91c2VFbnRlciIsImdldFF1YXJ0ZXJDbGFzc05hbWVzIiwiZ2V0UXVhcnRlclRhYkluZGV4IiwiaXNDdXJyZW50UXVhcnRlciIsImdldFF1YXJ0ZXJDb250ZW50IiwiX3RoaXMkcHJvcHMxNyIsInNob3dNb250aFllYXJQaWNrZXIiLCJzaG93UXVhcnRlclllYXJQaWNrZXIiLCJfdGhpcyRwcm9wczE4IiwiX3RoaXMkcHJvcHMxOCRhcmlhTGFiIiwiZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4IiwidHJpbSIsImhhbmRsZU1vdXNlTGVhdmUiLCJvblBvaW50ZXJMZWF2ZSIsInJlbmRlck1vbnRocyIsInJlbmRlclF1YXJ0ZXJzIiwicmVuZGVyV2Vla3MiLCJUaW1lIiwiaGVpZ2h0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2VudGVyTGkiLCJjYWxjQ2VudGVyUG9zaXRpb24iLCJtb250aFJlZiIsImhlYWRlciIsImNsYXNzZXMiLCJ0aW1lQ2xhc3NOYW1lIiwiaXNTZWxlY3RlZFRpbWUiLCJpc0Rpc2FibGVkVGltZSIsImluamVjdFRpbWVzIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJhY3RpdmVEYXRlIiwib3BlblRvRGF0ZSIsInNvcnRlZEluamVjdFRpbWVzIiwic29ydCIsImEiLCJiIiwibWludXRlc0luRGF5IiwibXVsdGlwbGllciIsInRpbWVzVG9JbmplY3QiLCJ0aW1lVG9Gb2N1cyIsInJlZHVjZSIsInByZXYiLCJsaUNsYXNzZXMiLCJsaSIsInNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lIiwidG9kYXlCdXR0b24iLCJzaG93VGltZVNlbGVjdE9ubHkiLCJ0aW1lQ2FwdGlvbiIsInJlbmRlclRpbWVzIiwib25UaW1lQ2hhbmdlIiwibGlzdEhlaWdodCIsImNlbnRlckxpUmVmIiwiWWVhciIsInJlZkluZGV4Iiwid2FpdEZvclJlUmVuZGVyIiwiWUVBUl9SRUZTIiwiX3V0aWxzJGdldFllYXJzUGVyaW9kIiwidXBkYXRlRm9jdXNPblBhZ2luYXRlIiwieSIsIl95ZWFyIiwiaGFuZGxlWWVhckNsaWNrIiwib25ZZWFyQ2xpY2siLCJoYW5kbGVZZWFyTmF2aWdhdGlvbiIsInllYXJDbGFzc05hbWUiLCJpc0N1cnJlbnRZZWFyIiwicHJlU2VsZWN0ZWQiLCJyZW5kZXJZZWFyQ29udGVudCIsIm9uWWVhck1vdXNlRW50ZXIiLCJvblllYXJNb3VzZUxlYXZlIiwiX3V0aWxzJGdldFllYXJzUGVyaW9kMiIsIl9sb29wIiwib25ZZWFyS2V5RG93biIsImdldFllYXJUYWJJbmRleCIsImdldFllYXJDbGFzc05hbWVzIiwiZ2V0WWVhckNvbnRlbnQiLCJnZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcyIsImNsZWFyU2VsZWN0aW5nRGF0ZSIsImlucHV0VGltZSIsInByb3BEYXRlIiwiaXNQcm9wRGF0ZVZhbGlkIiwiaXNOYU4iLCJzcGxpdCIsInRpbWVTdHJpbmciLCJjdXN0b21UaW1lSW5wdXQiLCJjbG9uZUVsZW1lbnQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJuYW1lIiwicmVxdWlyZWQiLCJ0aW1lSW5wdXRMYWJlbCIsInJlbmRlclRpbWVJbnB1dCIsImdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyIsIkNhbGVuZGFyQ29udGFpbmVyIiwiX3JlZiRzaG93VGltZVNlbGVjdE9uIiwiX3JlZiRzaG93VGltZSIsInNob3dUaW1lIiwiYXJpYUxhYmVsIiwiRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUyIsImlzRHJvcGRvd25TZWxlY3QiLCJlbGVtZW50IiwiY2xhc3NOYW1lcyIsInRlc3RDbGFzc25hbWUiLCJpbmRleE9mIiwiQ2FsZW5kYXIiLCJvbkRyb3Bkb3duRm9jdXMiLCJpbml0aWFsRGF0ZSIsImhhbmRsZU1vbnRoQ2hhbmdlIiwibW9udGhTZWxlY3RlZEluIiwib25Nb250aE1vdXNlTGVhdmUiLCJzZXRZZWFyIiwib25ZZWFyQ2hhbmdlIiwiaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UiLCJoYW5kbGVDdXN0b21Nb250aENoYW5nZSIsIm9uTW9udGhDaGFuZ2UiLCJoYW5kbGVNb250aFllYXJDaGFuZ2UiLCJkYXlOYW1lcyIsIndlZWtMYWJlbCIsIndlZWtEYXlOYW1lIiwiZm9ybWF0V2Vla2RheSIsIndlZWtEYXlDbGFzc05hbWUiLCJmb3JtYXRXZWVrRGF5IiwidXNlV2Vla2RheXNTaG9ydCIsInNob3dZZWFyUGlja2VyIiwicmVuZGVyQ3VzdG9tSGVhZGVyIiwiYWxsUHJldkRheXNEaXNhYmxlZCIsImZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiIsInNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiIsImljb25DbGFzc2VzIiwiY2xpY2tIYW5kbGVyIiwiZGVjcmVhc2VNb250aCIsImRlY3JlYXNlWWVhciIsImlzRm9yWWVhciIsInByZXZpb3VzTW9udGhCdXR0b25MYWJlbCIsInByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIiwiX3RoaXMkcHJvcHMzJHByZXZpb3VzIiwicHJldmlvdXNNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91czIiLCJwcmV2aW91c1llYXJBcmlhTGFiZWwiLCJhbGxOZXh0RGF5c0Rpc2FibGVkIiwic2hvd1RpbWVTZWxlY3QiLCJpbmNyZWFzZU1vbnRoIiwiaW5jcmVhc2VZZWFyIiwibmV4dE1vbnRoQnV0dG9uTGFiZWwiLCJuZXh0WWVhckJ1dHRvbkxhYmVsIiwiX3RoaXMkcHJvcHM1JG5leHRNb250IiwibmV4dE1vbnRoQXJpYUxhYmVsIiwiX3RoaXMkcHJvcHM1JG5leHRZZWFyIiwibmV4dFllYXJBcmlhTGFiZWwiLCJzaG93WWVhckRyb3Bkb3duIiwic2hvd01vbnRoRHJvcGRvd24iLCJzaG93TW9udGhZZWFyRHJvcGRvd24iLCJvdmVycmlkZUhpZGUiLCJjaGFuZ2VZZWFyIiwiY2hhbmdlTW9udGgiLCJjaGFuZ2VNb250aFllYXIiLCJoYW5kbGVUb2RheUJ1dHRvbkNsaWNrIiwibW9udGhEYXRlIiwicmVuZGVyQ3VycmVudE1vbnRoIiwib25Gb2N1cyIsImhhbmRsZURyb3Bkb3duRm9jdXMiLCJyZW5kZXJNb250aERyb3Bkb3duIiwicmVuZGVyTW9udGhZZWFyRHJvcGRvd24iLCJyZW5kZXJZZWFyRHJvcGRvd24iLCJoZWFkZXJBcmdzIiwibW9udGhDb250YWluZXIiLCJwcmV2TW9udGhCdXR0b25EaXNhYmxlZCIsIm5leHRNb250aEJ1dHRvbkRpc2FibGVkIiwicHJldlllYXJCdXR0b25EaXNhYmxlZCIsIm5leHRZZWFyQnV0dG9uRGlzYWJsZWQiLCJzaG93RGF5TmFtZXMiLCJfb2JqZWN0U3ByZWFkIiwiY3VzdG9tSGVhZGVyQ291bnQiLCJyZW5kZXJZZWFySGVhZGVyIiwicmVuZGVyRGVmYXVsdEhlYWRlciIsIl90aGlzJHByb3BzJG1vbnRoU2VsZSIsIm1vbnRoTGlzdCIsIm1vbnRoc1RvU3VidHJhY3QiLCJzaG93UHJldmlvdXNNb250aHMiLCJtb250aHNTaG93biIsImZyb21Nb250aERhdGUiLCJtb250aHNUb0FkZCIsIm1vbnRoS2V5IiwiZGl2IiwicmVuZGVySGVhZGVyIiwibW9udGhBcmlhTGFiZWxQcmVmaXgiLCJoYW5kbGVPbkRheUtleURvd24iLCJoYW5kbGVNb250aE1vdXNlTGVhdmUiLCJfZXh0ZW5kcyIsImhhbmRsZVllYXJNb3VzZUVudGVyIiwiaGFuZGxlWWVhck1vdXNlTGVhdmUiLCJ0aW1lRm9ybWF0IiwidGltZUludGVydmFscyIsIndpdGhQb3J0YWwiLCJ0aW1lVmFsaWQiLCJCb29sZWFuIiwic2hvd1RpbWVJbnB1dCIsIklucHV0VGltZSIsImFyaWFMaXZlTWVzc2FnZSIsImdldERhdGVJblZpZXciLCJhc3NpZ25Nb250aENvbnRhaW5lciIsIl90aGlzMyIsImhhc01vbnRoQ2hhbmdlZCIsIkNvbnRhaW5lciIsImNvbnRhaW5lciIsImRpc3BsYXkiLCJyZW5kZXJBcmlhTGl2ZVJlZ2lvbiIsInJlbmRlclByZXZpb3VzQnV0dG9uIiwicmVuZGVyTmV4dEJ1dHRvbiIsInJlbmRlclllYXJzIiwicmVuZGVyVG9kYXlCdXR0b24iLCJyZW5kZXJUaW1lU2VjdGlvbiIsInJlbmRlcklucHV0VGltZVNlY3Rpb24iLCJyZW5kZXJDaGlsZHJlbiIsIkNhbGVuZGFySWNvbiIsImljb24iLCJfcmVmJGNsYXNzTmFtZSIsImRlZmF1bHRDbGFzcyIsImlzVmFsaWRFbGVtZW50IiwieG1sbnMiLCJ2aWV3Qm94IiwiUG9ydGFsIiwiZWwiLCJwb3J0YWxSb290IiwicG9ydGFsSG9zdCIsImdldEVsZW1lbnRCeUlkIiwicG9ydGFsSWQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlQ2hpbGQiLCJSZWFjdERPTSIsImNyZWF0ZVBvcnRhbCIsImZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IiLCJmb2N1c2FibGVGaWx0ZXIiLCJub2RlIiwiZGlzYWJsZWQiLCJUYWJMb29wIiwicHJvdG90eXBlIiwiY2FsbCIsInRhYkxvb3BSZWYiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiQ2hpbGRyZW4iLCJnZXRUYWJDaGlsZHJlbiIsImVuYWJsZVRhYkxvb3AiLCJoYW5kbGVGb2N1c1N0YXJ0IiwiaGFuZGxlRm9jdXNFbmQiLCJ3aXRoRmxvYXRpbmciLCJXaXRoRmxvYXRpbmciLCJhbHRfcHJvcHMiLCJwb3BwZXJNb2RpZmllcnMiLCJwb3BwZXJQcm9wcyIsImhpZGVQb3BwZXIiLCJhcnJvd1JlZiIsInVzZVJlZiIsImZsb2F0aW5nUHJvcHMiLCJ1c2VGbG9hdGluZyIsIm9wZW4iLCJ3aGlsZUVsZW1lbnRzTW91bnRlZCIsImF1dG9VcGRhdGUiLCJwbGFjZW1lbnQiLCJwb3BwZXJQbGFjZW1lbnQiLCJtaWRkbGV3YXJlIiwiZmxpcCIsInBhZGRpbmciLCJhcnJvdyIsIlBvcHBlckNvbXBvbmVudCIsIndyYXBwZXJDbGFzc05hbWUiLCJwb3BwZXJDb21wb25lbnQiLCJ0YXJnZXRDb21wb25lbnQiLCJwb3BwZXJPbktleURvd24iLCJzaG93QXJyb3ciLCJwb3BwZXIiLCJyZWZzIiwic2V0RmxvYXRpbmciLCJmbG9hdGluZ1N0eWxlcyIsIkZsb2F0aW5nQXJyb3ciLCJjb250ZXh0IiwiZmlsbCIsInN0cm9rZVdpZHRoIiwid2lkdGgiLCJ0cmFuc2Zvcm0iLCJwb3BwZXJDb250YWluZXIiLCJ3cmFwcGVyQ2xhc3NlcyIsIkZyYWdtZW50Iiwic2V0UmVmZXJlbmNlIiwib3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MiLCJXcmFwcGVkQ2FsZW5kYXIiLCJoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkIiwiSU5QVVRfRVJSXzEiLCJEYXRlUGlja2VyIiwiX3RoaXMkcHJvcHMkaG9saWRheXMiLCJhY2N1bXVsYXRvciIsImRlZmF1bHRQcmVTZWxlY3Rpb24iLCJnZXRQcmVTZWxlY3Rpb24iLCJib3VuZGVkUHJlU2VsZWN0aW9uIiwic3RhcnRPcGVuIiwicHJldmVudEZvY3VzIiwiZm9jdXNlZCIsInByZXZlbnRGb2N1c1RpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJpbnB1dCIsImJsdXIiLCJjYW5jZWxGb2N1c0lucHV0Iiwic2tpcFNldEJsdXIiLCJjYWxjSW5pdGlhbFN0YXRlIiwibGFzdFByZVNlbGVjdENoYW5nZSIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFIiwic2V0Qmx1ciIsImlucHV0VmFsdWUiLCJyZWFkT25seSIsInByZXZlbnRPcGVuT25Gb2N1cyIsImNsZWFyUHJldmVudEZvY3VzVGltZW91dCIsInNldFRpbWVvdXQiLCJzZXRGb2N1cyIsImlucHV0Rm9jdXNUaW1lb3V0Iiwib25CbHVyIiwiYWxsQXJncyIsIm9uQ2hhbmdlUmF3IiwiaXNEZWZhdWx0UHJldmVudGVkIiwiUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQiLCJob3VycyIsIm1pbnV0ZXMiLCJzZXRTZWxlY3RlZCIsInNlbmRGb2N1c0JhY2tUb0lucHV0Iiwic2hvd0RhdGVTZWxlY3QiLCJrZWVwSW5wdXQiLCJhbGxvd1NhbWVEYXkiLCJmb2N1c1NlbGVjdGVkTW9udGgiLCJub1JhbmdlcyIsImhhc1N0YXJ0UmFuZ2UiLCJpc1JhbmdlRmlsbGVkIiwiaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCIsInNlbGVjdGVkRGF0ZSIsIm5leHREYXRlcyIsImhhc01pbkRhdGUiLCJoYXNNYXhEYXRlIiwiaXNWYWxpZERhdGVTZWxlY3Rpb24iLCJkYXRlU3RhcnRPZkRheSIsIm1pbkRhdGVTdGFydE9mRGF5IiwibWF4RGF0ZUVuZE9mRGF5Iiwib25JbnB1dENsaWNrIiwic2VsZWN0b3JTdHJpbmciLCJzZWxlY3RlZEl0ZW0iLCJjYWxlbmRhciIsImNvbXBvbmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiY29weSIsImlucHV0T2siLCJoYW5kbGVTZWxlY3QiLCJvbklucHV0RXJyb3IiLCJjb2RlIiwibXNnIiwiaXNTaGlmdEtleUFjdGl2ZSIsInNoaWZ0S2V5IiwibmV3U2VsZWN0aW9uIiwic3ViV2Vla3MiLCJzdWJEYXlzIiwiYWRkV2Vla3MiLCJwcmV2TW9udGgiLCJwcmV2WWVhciIsIm9uQ2xlYXJDbGljayIsImNsb3NlT25TY3JvbGwiLCJkb2N1bWVudEVsZW1lbnQiLCJpc0NhbGVuZGFyT3BlbiIsImVsZW0iLCJkYXRlRm9ybWF0Q2FsZW5kYXIiLCJoYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZSIsIm1vZGlmeUhvbGlkYXlzIiwiaGFuZGxlVGltZUNoYW5nZSIsImNhbGVuZGFyQ2xhc3NOYW1lIiwiY2FsZW5kYXJDb250YWluZXIiLCJleGNsdWRlU2Nyb2xsYmFyIiwib25EYXlLZXlEb3duIiwiaXNDb250YWluc1RpbWUiLCJsb25nRGF0ZUZvcm1hdCIsIl9SZWFjdCRjbG9uZUVsZW1lbnQiLCJjdXN0b21JbnB1dCIsImN1c3RvbUlucHV0UmVmIiwiaGFuZGxlQmx1ciIsImhhbmRsZUNoYW5nZSIsImhhbmRsZUZvY3VzIiwib25JbnB1dEtleURvd24iLCJpZCIsImZvcm0iLCJhdXRvRm9jdXMiLCJwbGFjZWhvbGRlclRleHQiLCJhdXRvQ29tcGxldGUiLCJhcmlhRGVzY3JpYmVkQnkiLCJhcmlhSW52YWxpZCIsImFyaWFMYWJlbGxlZEJ5IiwiYXJpYVJlcXVpcmVkIiwiaXNDbGVhcmFibGUiLCJjbGVhckJ1dHRvblRpdGxlIiwiX3RoaXMkcHJvcHM0JGNsZWFyQnV0IiwiY2xlYXJCdXR0b25DbGFzc05hbWUiLCJfdGhpcyRwcm9wczQkYXJpYUxhYmUiLCJhcmlhTGFiZWxDbG9zZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblNjcm9sbCIsInByZXZTdGF0ZSIsIm9uQ2FsZW5kYXJPcGVuIiwib25DYWxlbmRhckNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlcklucHV0Q29udGFpbmVyIiwic2hvd0ljb24iLCJjYWxlbmRhckljb25DbGFzc25hbWUiLCJ0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIiwidG9nZ2xlQ2FsZW5kYXIiLCJyZW5kZXJEYXRlSW5wdXQiLCJyZW5kZXJDbGVhckJ1dHRvbiIsInJlbmRlckNhbGVuZGFyIiwicG9ydGFsQ29udGFpbmVyIiwib25Qb3J0YWxLZXlEb3duIiwicG9wcGVyQ2xhc3NOYW1lIiwib25Qb3BwZXJLZXlEb3duIiwic2hvd1BvcHBlckFycm93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeURPLElBQU1BLHdCQUF3QixHQUFHLEVBQUUsQ0FBQTs7QUFFMUM7QUFDQTtBQUNBLElBQU1DLDBCQUEwQixHQUFHLG1DQUFtQyxDQUFBOztBQUV0RTs7QUFFTyxTQUFTQyxPQUFPQSxDQUFDQyxLQUFLLEVBQUU7RUFDN0IsSUFBTUMsQ0FBQyxHQUFHRCxLQUFLLEdBQ1gsT0FBT0EsS0FBSyxLQUFLLFFBQVEsSUFBSUEsS0FBSyxZQUFZRSxNQUFNLEdBQ2xEQyxpQkFBUSxDQUFDSCxLQUFLLENBQUMsR0FDZkksYUFBTSxDQUFDSixLQUFLLENBQUMsR0FDZixJQUFJSyxJQUFJLEVBQUUs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
