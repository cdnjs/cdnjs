/*!
  react-datepicker v6.9.0
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
var differenceInCalendarQuarters = require('date-fns/differenceInCalendarQuarters');
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
var dateFns = require('date-fns');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlX3V0aWxzLmpzIiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd24uanN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi5qc3giLCIuLi9zcmMvZGF5LmpzeCIsIi4uL3NyYy93ZWVrX251bWJlci5qc3giLCIuLi9zcmMvd2Vlay5qc3giLCIuLi9zcmMvbW9udGguanN4IiwiLi4vc3JjL3RpbWUuanN4IiwiLi4vc3JjL3llYXIuanN4IiwiLi4vc3JjL2lucHV0VGltZS5qc3giLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLmpzeCIsIi4uL3NyYy9jYWxlbmRhci5qc3giLCIuLi9zcmMvY2FsZW5kYXJfaWNvbi5qc3giLCIuLi9zcmMvcG9ydGFsLmpzeCIsIi4uL3NyYy90YWJfbG9vcC5qc3giLCIuLi9zcmMvd2l0aF9mbG9hdGluZy5qc3giLCIuLi9zcmMvcG9wcGVyX2NvbXBvbmVudC5qc3giLCIuLi9zcmMvaW5kZXguanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc0RhdGVcIjtcbmltcG9ydCB7IGlzVmFsaWQgYXMgaXNWYWxpZERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHsgZm9ybWF0LCBsb25nRm9ybWF0dGVycyB9IGZyb20gXCJkYXRlLWZucy9mb3JtYXRcIjtcbmltcG9ydCB7IGFkZE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkTWludXRlc1wiO1xuaW1wb3J0IHsgYWRkSG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkSG91cnNcIjtcbmltcG9ydCB7IGFkZERheXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkRGF5c1wiO1xuaW1wb3J0IHsgYWRkV2Vla3MgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkV2Vla3NcIjtcbmltcG9ydCB7IGFkZE1vbnRocyB9IGZyb20gXCJkYXRlLWZucy9hZGRNb250aHNcIjtcbmltcG9ydCB7IGFkZFF1YXJ0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBhZGRZZWFycyB9IGZyb20gXCJkYXRlLWZucy9hZGRZZWFyc1wiO1xuaW1wb3J0IHsgc3ViRGF5cyB9IGZyb20gXCJkYXRlLWZucy9zdWJEYXlzXCI7XG5pbXBvcnQgeyBzdWJXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9zdWJXZWVrc1wiO1xuaW1wb3J0IHsgc3ViTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL3N1Yk1vbnRoc1wiO1xuaW1wb3J0IHsgc3ViUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViUXVhcnRlcnNcIjtcbmltcG9ydCB7IHN1YlllYXJzIH0gZnJvbSBcImRhdGUtZm5zL3N1YlllYXJzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL2dldFNlY29uZHNcIjtcbmltcG9ydCB7IGdldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0TWludXRlc1wiO1xuaW1wb3J0IHsgZ2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0SG91cnNcIjtcbmltcG9ydCB7IGdldERheSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXlcIjtcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0RGF0ZVwiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCJkYXRlLWZucy9nZXRJU09XZWVrXCI7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9nZXRNb250aFwiO1xuaW1wb3J0IHsgZ2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9nZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2dldFllYXJcIjtcbmltcG9ydCB7IGdldFRpbWUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0VGltZVwiO1xuaW1wb3J0IHsgc2V0U2Vjb25kcyB9IGZyb20gXCJkYXRlLWZucy9zZXRTZWNvbmRzXCI7XG5pbXBvcnQgeyBzZXRNaW51dGVzIH0gZnJvbSBcImRhdGUtZm5zL3NldE1pbnV0ZXNcIjtcbmltcG9ydCB7IHNldEhvdXJzIH0gZnJvbSBcImRhdGUtZm5zL3NldEhvdXJzXCI7XG5pbXBvcnQgeyBzZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9zZXRNb250aFwiO1xuaW1wb3J0IHsgc2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBzZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3NldFllYXJcIjtcbmltcG9ydCB7IG1pbiB9IGZyb20gXCJkYXRlLWZucy9taW5cIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCJkYXRlLWZucy9tYXhcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mV2Vla1wiO1xuaW1wb3J0IHsgc3RhcnRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZNb250aFwiO1xuaW1wb3J0IHsgc3RhcnRPZlF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlF1YXJ0ZXJcIjtcbmltcG9ydCB7IHN0YXJ0T2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZZZWFyXCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mV2Vla1wiO1xuaW1wb3J0IHsgZW5kT2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9lbmRPZk1vbnRoXCI7XG5pbXBvcnQgeyBlbmRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZZZWFyXCI7XG5pbXBvcnQgeyBpc0VxdWFsIGFzIGRmSXNFcXVhbCB9IGZyb20gXCJkYXRlLWZucy9pc0VxdWFsXCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgYXMgZGZJc1NhbWVEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lRGF5XCI7XG5pbXBvcnQgeyBpc1NhbWVNb250aCBhcyBkZklzU2FtZU1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZU1vbnRoXCI7XG5pbXBvcnQgeyBpc1NhbWVZZWFyIGFzIGRmSXNTYW1lWWVhciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVZZWFyXCI7XG5pbXBvcnQgeyBpc1NhbWVRdWFydGVyIGFzIGRmSXNTYW1lUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVRdWFydGVyXCI7XG5pbXBvcnQgeyBpc0FmdGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzQWZ0ZXJcIjtcbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSBcImRhdGUtZm5zL2lzQmVmb3JlXCI7XG5pbXBvcnQgeyBpc1dpdGhpbkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zL2lzV2l0aGluSW50ZXJ2YWxcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCJkYXRlLWZucy90b0RhdGVcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlXCI7XG5pbXBvcnQgeyBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZucy9wYXJzZUlTT1wiO1xuaW1wb3J0IHsgYWRkU2Vjb25kcyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSID0gMTI7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbmNvbnN0IGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1ArcCt8UCt8cCt8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vICoqIERhdGUgQ29uc3RydWN0b3JzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdEYXRlKHZhbHVlKSB7XG4gIGNvbnN0IGQgPSB2YWx1ZVxuICAgID8gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHBhcnNlSVNPKHZhbHVlKVxuICAgICAgOiB0b0RhdGUodmFsdWUpXG4gICAgOiBuZXcgRGF0ZSgpO1xuICByZXR1cm4gaXNWYWxpZChkKSA/IGQgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlKHZhbHVlLCBkYXRlRm9ybWF0LCBsb2NhbGUsIHN0cmljdFBhcnNpbmcsIG1pbkRhdGUpIHtcbiAgbGV0IHBhcnNlZERhdGUgPSBudWxsO1xuICBsZXQgbG9jYWxlT2JqZWN0ID1cbiAgICBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSB8fCBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgbGV0IHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID0gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkpIHtcbiAgICBkYXRlRm9ybWF0LmZvckVhY2goKGRmKSA9PiB7XG4gICAgICBsZXQgdHJ5UGFyc2VEYXRlID0gcGFyc2UodmFsdWUsIGRmLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgICAgICBpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiZcbiAgICAgICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZSh0cnlQYXJzZURhdGUsIGRmLCBsb2NhbGUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCkge1xuICAgICAgICBwYXJzZWREYXRlID0gdHJ5UGFyc2VEYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZWREYXRlO1xuICB9XG5cbiAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LCBuZXcgRGF0ZSgpLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xuXG4gIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgaXNWYWxpZChwYXJzZWREYXRlKSAmJlxuICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUocGFyc2VkRGF0ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlKTtcbiAgfSBlbHNlIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0XG4gICAgICAubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCJwXCIgfHwgZmlyc3RDaGFyYWN0ZXIgPT09IFwiUFwiKSB7XG4gICAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgICByZXR1cm4gbG9jYWxlT2JqZWN0XG4gICAgICAgICAgICA/IGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGVPYmplY3QuZm9ybWF0TG9uZylcbiAgICAgICAgICAgIDogZmlyc3RDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlwiKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSwgbmV3IERhdGUoKSwge1xuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPyBwYXJzZWREYXRlIDogbnVsbDtcbn1cblxuLy8gKiogRGF0ZSBcIlJlZmxlY3Rpb25cIiAqKlxuXG5leHBvcnQgeyBpc0RhdGUgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSwgbWluRGF0ZSkge1xuICBtaW5EYXRlID0gbWluRGF0ZSA/IG1pbkRhdGUgOiBuZXcgRGF0ZShcIjEvMS8xMDAwXCIpO1xuICByZXR1cm4gaXNWYWxpZERhdGUoZGF0ZSkgJiYgIWlzQmVmb3JlKGRhdGUsIG1pbkRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIEZvcm1hdHRpbmcgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0U3RyLCBsb2NhbGUpIHtcbiAgaWYgKGxvY2FsZSA9PT0gXCJlblwiKSB7XG4gICAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgfSk7XG4gIH1cbiAgbGV0IGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChsb2NhbGUpO1xuICBpZiAobG9jYWxlICYmICFsb2NhbGVPYmopIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgQSBsb2NhbGUgb2JqZWN0IHdhcyBub3QgZm91bmQgZm9yIHRoZSBwcm92aWRlZCBzdHJpbmcgW1wiJHtsb2NhbGV9XCJdLmAsXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgIWxvY2FsZU9iaiAmJlxuICAgICEhZ2V0RGVmYXVsdExvY2FsZSgpICYmXG4gICAgISFnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKVxuICApIHtcbiAgICBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqID8gbG9jYWxlT2JqIDogbnVsbCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZUZvcm1hdChkYXRlLCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9KSB7XG4gIHJldHVybiAoXG4gICAgKGRhdGUgJiZcbiAgICAgIGZvcm1hdERhdGUoXG4gICAgICAgIGRhdGUsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkgPyBkYXRlRm9ybWF0WzBdIDogZGF0ZUZvcm1hdCxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgKSkgfHxcbiAgICBcIlwiXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZVJhbmdlRm9ybWF0KHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcHJvcHMpIHtcbiAgaWYgKCFzdGFydERhdGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KHN0YXJ0RGF0ZSwgcHJvcHMpO1xuICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gZW5kRGF0ZSA/IHNhZmVEYXRlRm9ybWF0KGVuZERhdGUsIHByb3BzKSA6IFwiXCI7XG5cbiAgcmV0dXJuIGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZX0gLSAke2Zvcm1hdHRlZEVuZERhdGV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KGRhdGVzLCBwcm9wcykge1xuICBpZiAoIWRhdGVzPy5sZW5ndGgpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBjb25zdCBmb3JtYXR0ZWRGaXJzdERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1swXSwgcHJvcHMpO1xuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlZEZpcnN0RGF0ZTtcbiAgfVxuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kRGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzFdLCBwcm9wcyk7XG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0sICR7Zm9ybWF0dGVkU2Vjb25kRGF0ZX1gO1xuICB9XG5cbiAgY29uc3QgZXh0cmFEYXRlc0NvdW50ID0gZGF0ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0gKCske2V4dHJhRGF0ZXNDb3VudH0pYDtcbn1cblxuLy8gKiogRGF0ZSBTZXR0ZXJzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lKGRhdGUsIHsgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSkge1xuICByZXR1cm4gc2V0SG91cnMoc2V0TWludXRlcyhzZXRTZWNvbmRzKGRhdGUsIHNlY29uZCksIG1pbnV0ZSksIGhvdXIpO1xufVxuXG5leHBvcnQgeyBzZXRNaW51dGVzLCBzZXRIb3Vycywgc2V0TW9udGgsIHNldFF1YXJ0ZXIsIHNldFllYXIgfTtcblxuLy8gKiogRGF0ZSBHZXR0ZXJzICoqXG5cbi8vIGdldERheSBSZXR1cm5zIGRheSBvZiB3ZWVrLCBnZXREYXRlIHJldHVybnMgZGF5IG9mIG1vbnRoXG5leHBvcnQge1xuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgZ2V0TW9udGgsXG4gIGdldFF1YXJ0ZXIsXG4gIGdldFllYXIsXG4gIGdldERheSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0VGltZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIGxvY2FsZSkge1xuICBsZXQgbG9jYWxlT2JqID1cbiAgICAobG9jYWxlICYmIGdldExvY2FsZU9iamVjdChsb2NhbGUpKSB8fFxuICAgIChnZXREZWZhdWx0TG9jYWxlKCkgJiYgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSkpO1xuICByZXR1cm4gZ2V0SVNPV2VlayhkYXRlLCBsb2NhbGVPYmogPyB7IGxvY2FsZTogbG9jYWxlT2JqIH0gOiBudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2Vla0NvZGUoZGF5LCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF5LCBcImRkZFwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiogU3RhcnQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mRGF5KGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mV2VlayhkYXRlLCBsb2NhbGUsIGNhbGVuZGFyU3RhcnREYXkpIHtcbiAgbGV0IGxvY2FsZU9iaiA9IGxvY2FsZVxuICAgID8gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSlcbiAgICA6IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqLFxuICAgIHdlZWtTdGFydHNPbjogY2FsZW5kYXJTdGFydERheSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZk1vbnRoKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlllYXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlllYXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mUXVhcnRlcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mUXVhcnRlcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZUb2RheSgpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkobmV3RGF0ZSgpKTtcbn1cblxuLy8gKioqIEVuZCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mV2VlayhkYXRlKSB7XG4gIHJldHVybiBlbmRPZldlZWsoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mTW9udGgoZGF0ZSk7XG59XG5cbi8vICoqIERhdGUgTWF0aCAqKlxuXG4vLyAqKiogQWRkaXRpb24gKioqXG5cbmV4cG9ydCB7XG4gIGFkZFNlY29uZHMsXG4gIGFkZE1pbnV0ZXMsXG4gIGFkZERheXMsXG4gIGFkZFdlZWtzLFxuICBhZGRNb250aHMsXG4gIGFkZFF1YXJ0ZXJzLFxuICBhZGRZZWFycyxcbn07XG5cbi8vICoqKiBTdWJ0cmFjdGlvbiAqKipcblxuZXhwb3J0IHsgYWRkSG91cnMsIHN1YkRheXMsIHN1YldlZWtzLCBzdWJNb250aHMsIHN1YlF1YXJ0ZXJzLCBzdWJZZWFycyB9O1xuXG4vLyAqKiBEYXRlIENvbXBhcmlzb24gKipcblxuZXhwb3J0IHsgaXNCZWZvcmUsIGlzQWZ0ZXIgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZU1vbnRoKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNFcXVhbChkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgbGV0IHZhbGlkO1xuICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZEYXkoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kID0gZW5kT2ZEYXkoZW5kRGF0ZSk7XG5cbiAgdHJ5IHtcbiAgICB2YWxpZCA9IGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG4vLyAqKiogRGlmZmluZyAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheXNEaWZmKGRhdGUxLCBkYXRlMikge1xuICByZXR1cm4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUxLCBkYXRlMik7XG59XG5cbi8vICoqIERhdGUgTG9jYWxpemF0aW9uICoqXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckxvY2FsZShsb2NhbGVOYW1lLCBsb2NhbGVEYXRhKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgaWYgKCFzY29wZS5fX2xvY2FsZURhdGFfXykge1xuICAgIHNjb3BlLl9fbG9jYWxlRGF0YV9fID0ge307XG4gIH1cbiAgc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlTmFtZV0gPSBsb2NhbGVEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdExvY2FsZShsb2NhbGVOYW1lKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgc2NvcGUuX19sb2NhbGVJZF9fID0gbG9jYWxlTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRMb2NhbGUoKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlSWRfXztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsZU9iamVjdChsb2NhbGVTcGVjKSB7XG4gIGlmICh0eXBlb2YgbG9jYWxlU3BlYyA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgbG9jYWxlIG5hbWUgcmVnaXN0ZXJlZCBieSByZWdpc3RlckxvY2FsZVxuICAgIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG4gICAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlRGF0YV9fID8gc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlU3BlY10gOiBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgcmF3IGRhdGUtZm5zIGxvY2FsZSBvYmplY3RcbiAgICByZXR1cm4gbG9jYWxlU3BlYztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRhdGUsIGZvcm1hdEZ1bmMsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RnVuYyhmb3JtYXREYXRlKGRhdGUsIFwiRUVFRVwiLCBsb2NhbGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXRlLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFRUVcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTExcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoU2hvcnRJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUocXVhcnRlciwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldFF1YXJ0ZXIobmV3RGF0ZSgpLCBxdWFydGVyKSwgXCJRUVFcIiwgbG9jYWxlKTtcbn1cblxuLy8gKiogVXRpbHMgZm9yIHNvbWUgY29tcG9uZW50cyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlEaXNhYmxlZChcbiAgZGF5LFxuICB7XG4gICAgbWluRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICBleGNsdWRlRGF0ZUludGVydmFscyxcbiAgICBpbmNsdWRlRGF0ZXMsXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHMsXG4gICAgZmlsdGVyRGF0ZSxcbiAgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXksIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChleGNsdWRlRGF0ZUludGVydmFscyAmJlxuICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZURheShkYXksIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICAhaW5jbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF5KSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5RXhjbHVkZWQoXG4gIGRheSxcbiAgeyBleGNsdWRlRGF0ZXMsIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIH0gPSB7fSxcbikge1xuICBpZiAoZXhjbHVkZURhdGVJbnRlcnZhbHMgJiYgZXhjbHVkZURhdGVJbnRlcnZhbHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoRGlzYWJsZWQoXG4gIG1vbnRoLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMobW9udGgsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZNb250aChtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mTW9udGgobWF4RGF0ZSksXG4gICAgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUobW9udGgpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBlbmREYXRlLCBtLCBkYXkpIHtcbiAgY29uc3Qgc3RhcnREYXRlWWVhciA9IGdldFllYXIoc3RhcnREYXRlKTtcbiAgY29uc3Qgc3RhcnREYXRlTW9udGggPSBnZXRNb250aChzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVNb250aCA9IGdldE1vbnRoKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVNb250aCA8PSBtICYmIG0gPD0gZW5kRGF0ZU1vbnRoO1xuICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZVllYXIgPCBlbmREYXRlWWVhcikge1xuICAgIHJldHVybiAoXG4gICAgICAoZGF5WWVhciA9PT0gc3RhcnREYXRlWWVhciAmJiBzdGFydERhdGVNb250aCA8PSBtKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVNb250aCA+PSBtKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJEaXNhYmxlZChcbiAgcXVhcnRlcixcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKHF1YXJ0ZXIsIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZVF1YXJ0ZXIocXVhcnRlciwgaW5jbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKHF1YXJ0ZXIpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyXG4gKiBAcGFyYW0ge0RhdGV9IHN0YXJ0XG4gKiBAcGFyYW0ge0RhdGV9IGVuZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJJblJhbmdlKHllYXIsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFpc1ZhbGlkRGF0ZShzdGFydCkgfHwgIWlzVmFsaWREYXRlKGVuZCkpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc3RhcnRZZWFyID0gZ2V0WWVhcihzdGFydCk7XG4gIGNvbnN0IGVuZFllYXIgPSBnZXRZZWFyKGVuZCk7XG5cbiAgcmV0dXJuIHN0YXJ0WWVhciA8PSB5ZWFyICYmIGVuZFllYXIgPj0geWVhcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckRpc2FibGVkKFxuICB5ZWFyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoeWVhciwgMCwgMSk7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXRlLCB7XG4gICAgICBtaW5EYXRlOiBzdGFydE9mWWVhcihtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mWWVhcihtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZVllYXIoZGF0ZSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKGRhdGUpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIHEsIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihlbmREYXRlKTtcbiAgY29uc3QgZGF5WWVhciA9IGdldFllYXIoZGF5KTtcbiAgaWYgKHN0YXJ0RGF0ZVllYXIgPT09IGVuZERhdGVZZWFyICYmIHN0YXJ0RGF0ZVllYXIgPT09IGRheVllYXIpIHtcbiAgICByZXR1cm4gc3RhcnREYXRlUXVhcnRlciA8PSBxICYmIHEgPD0gZW5kRGF0ZVF1YXJ0ZXI7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZVF1YXJ0ZXIgPD0gcSkgfHxcbiAgICAgIChkYXlZZWFyID09PSBlbmREYXRlWWVhciAmJiBlbmREYXRlUXVhcnRlciA+PSBxKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0gPSB7fSkge1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1pbkRhdGUpIDwgMCkgfHxcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF5LCBtYXhEYXRlKSA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkxpc3QodGltZSwgdGltZXMpIHtcbiAgcmV0dXJuIHRpbWVzLnNvbWUoXG4gICAgKGxpc3RUaW1lKSA9PlxuICAgICAgZ2V0SG91cnMobGlzdFRpbWUpID09PSBnZXRIb3Vycyh0aW1lKSAmJlxuICAgICAgZ2V0TWludXRlcyhsaXN0VGltZSkgPT09IGdldE1pbnV0ZXModGltZSkgJiZcbiAgICAgIGdldFNlY29uZHMobGlzdFRpbWUpID09PSBnZXRTZWNvbmRzKHRpbWUpLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lRGlzYWJsZWQoXG4gIHRpbWUsXG4gIHsgZXhjbHVkZVRpbWVzLCBpbmNsdWRlVGltZXMsIGZpbHRlclRpbWUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVUaW1lcyAmJiBpc1RpbWVJbkxpc3QodGltZSwgZXhjbHVkZVRpbWVzKSkgfHxcbiAgICAoaW5jbHVkZVRpbWVzICYmICFpc1RpbWVJbkxpc3QodGltZSwgaW5jbHVkZVRpbWVzKSkgfHxcbiAgICAoZmlsdGVyVGltZSAmJiAhZmlsdGVyVGltZSh0aW1lKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHsgbWluVGltZSwgbWF4VGltZSB9KSB7XG4gIGlmICghbWluVGltZSB8fCAhbWF4VGltZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJvdGggbWluVGltZSBhbmQgbWF4VGltZSBwcm9wcyByZXF1aXJlZFwiKTtcbiAgfVxuICBsZXQgYmFzZVRpbWUgPSBuZXdEYXRlKCk7XG4gIGJhc2VUaW1lID0gc2V0SG91cnMoYmFzZVRpbWUsIGdldEhvdXJzKHRpbWUpKTtcbiAgYmFzZVRpbWUgPSBzZXRNaW51dGVzKGJhc2VUaW1lLCBnZXRNaW51dGVzKHRpbWUpKTtcbiAgYmFzZVRpbWUgPSBzZXRTZWNvbmRzKGJhc2VUaW1lLCBnZXRTZWNvbmRzKHRpbWUpKTtcblxuICBsZXQgbWluID0gbmV3RGF0ZSgpO1xuICBtaW4gPSBzZXRIb3VycyhtaW4sIGdldEhvdXJzKG1pblRpbWUpKTtcbiAgbWluID0gc2V0TWludXRlcyhtaW4sIGdldE1pbnV0ZXMobWluVGltZSkpO1xuICBtaW4gPSBzZXRTZWNvbmRzKG1pbiwgZ2V0U2Vjb25kcyhtaW5UaW1lKSk7XG5cbiAgbGV0IG1heCA9IG5ld0RhdGUoKTtcbiAgbWF4ID0gc2V0SG91cnMobWF4LCBnZXRIb3VycyhtYXhUaW1lKSk7XG4gIG1heCA9IHNldE1pbnV0ZXMobWF4LCBnZXRNaW51dGVzKG1heFRpbWUpKTtcbiAgbWF4ID0gc2V0U2Vjb25kcyhtYXgsIGdldFNlY29uZHMobWF4VGltZSkpO1xuXG4gIGxldCB2YWxpZDtcbiAgdHJ5IHtcbiAgICB2YWxpZCA9ICFpc1dpdGhpbkludGVydmFsKGJhc2VUaW1lLCB7IHN0YXJ0OiBtaW4sIGVuZDogbWF4IH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbnRoRGlzYWJsZWRCZWZvcmUoZGF5LCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgcHJldmlvdXNNb250aCA9IHN1Yk1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG1pbkRhdGUsIHByZXZpb3VzTW9udGgpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRNb250aCA9IGFkZE1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhuZXh0TW9udGgsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWFydGVyRGlzYWJsZWRCZWZvcmUoZGF0ZSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGZpcnN0RGF0ZU9mWWVhciA9IHN0YXJ0T2ZZZWFyKGRhdGUpO1xuICBjb25zdCBwcmV2aW91c1F1YXJ0ZXIgPSBzdWJRdWFydGVycyhmaXJzdERhdGVPZlllYXIsIDEpO1xuXG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhtaW5EYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyKGRhdGUsIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBsYXN0RGF0ZU9mWWVhciA9IGVuZE9mWWVhcihkYXRlKTtcbiAgY29uc3QgbmV4dFF1YXJ0ZXIgPSBhZGRRdWFydGVycyhsYXN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhuZXh0UXVhcnRlciwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c1llYXIgPSBzdWJZZWFycyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobWluRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQmVmb3JlKFxuICBkYXksXG4gIHsgbWluRGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IGdldFN0YXJ0T2ZZZWFyKHN1YlllYXJzKGRheSwgeWVhckl0ZW1OdW1iZXIpKTtcbiAgY29uc3QgeyBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKHByZXZpb3VzWWVhciwgeWVhckl0ZW1OdW1iZXIpO1xuICBjb25zdCBtaW5EYXRlWWVhciA9IG1pbkRhdGUgJiYgZ2V0WWVhcihtaW5EYXRlKTtcbiAgcmV0dXJuIChtaW5EYXRlWWVhciAmJiBtaW5EYXRlWWVhciA+IGVuZFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0WWVhciA9IGFkZFllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhuZXh0WWVhciwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhcnNEaXNhYmxlZEFmdGVyKFxuICBkYXksXG4gIHsgbWF4RGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKG5leHRZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1heERhdGVZZWFyID0gbWF4RGF0ZSAmJiBnZXRZZWFyKG1heERhdGUpO1xuICByZXR1cm4gKG1heERhdGVZZWFyICYmIG1heERhdGVZZWFyIDwgc3RhcnRQZXJpb2QpIHx8IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWluRGF0ZSh7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWluRGF0ZSkge1xuICAgIGxldCBtaW5EYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWluRGF0ZSkgPj0gMCxcbiAgICApO1xuICAgIHJldHVybiBtaW4obWluRGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtaW4oaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWluRGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWF4RGF0ZSkge1xuICAgIGxldCBtYXhEYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWF4RGF0ZSkgPD0gMCxcbiAgICApO1xuICAgIHJldHVybiBtYXgobWF4RGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtYXgoaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWF4RGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlnaHRMaWdodERheXNNYXAoXG4gIGhpZ2hsaWdodERhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhpZ2hsaWdodERhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgb2JqID0gaGlnaGxpZ2h0RGF0ZXNbaV07XG4gICAgaWYgKGlzRGF0ZShvYmopKSB7XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKG9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lc0FyciA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IFtdO1xuICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGRlZmF1bHRDbGFzc05hbWUpKSB7XG4gICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChkZWZhdWx0Q2xhc3NOYW1lKTtcbiAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGtleXNbMF07XG4gICAgICBjb25zdCBhcnJPZkRhdGVzID0gb2JqW2tleXNbMF1dO1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgYXJyT2ZEYXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbiA9IGFyck9mRGF0ZXMubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKGFyck9mRGF0ZXNba10sIFwiTU0uZGQueXl5eVwiKTtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlQ2xhc3Nlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHRoZSB0d28gYXJyYXlzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTFcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MlxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUsIGlmIHRoZSBwYXNzZWQgYXJyYXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0FyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSB7XG4gIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5MS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gYXJyYXkyW2luZGV4XSk7XG59XG5cbi8qKlxuICogQXNzaWduIHRoZSBjdXN0b20gY2xhc3MgdG8gZWFjaCBkYXRlXG4gKiBAcGFyYW0ge0FycmF5fSBob2xpZGF5RGF0ZXMgYXJyYXkgb2Ygb2JqZWN0IGNvbnRhaW5pbmcgZGF0ZSBhbmQgbmFtZSBvZiB0aGUgaG9saWRheVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzbmFtZSB0byBiZSBhZGRlZC5cbiAqIEByZXR1cm5zIHtNYXB9IE1hcCBjb250YWluaW5nIGRhdGUgYXMga2V5IGFuZCBhcnJheSBvZiBjbGFzc25hbWUgYW5kIGhvbGlkYXkgbmFtZSBhcyB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9saWRheXNNYXAoXG4gIGhvbGlkYXlEYXRlcyA9IFtdLFxuICBkZWZhdWx0Q2xhc3NOYW1lID0gXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhvbGlkYXlzXCIsXG4pIHtcbiAgY29uc3QgZGF0ZUNsYXNzZXMgPSBuZXcgTWFwKCk7XG4gIGhvbGlkYXlEYXRlcy5mb3JFYWNoKChob2xpZGF5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlOiBkYXRlT2JqLCBob2xpZGF5TmFtZSB9ID0gaG9saWRheTtcbiAgICBpZiAoIWlzRGF0ZShkYXRlT2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoZGF0ZU9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXNPYmogPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCB7fTtcbiAgICBpZiAoXG4gICAgICBcImNsYXNzTmFtZVwiIGluIGNsYXNzTmFtZXNPYmogJiZcbiAgICAgIGNsYXNzTmFtZXNPYmpbXCJjbGFzc05hbWVcIl0gPT09IGRlZmF1bHRDbGFzc05hbWUgJiZcbiAgICAgIGFycmF5c0FyZUVxdWFsKGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0sIFtob2xpZGF5TmFtZV0pXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9IGRlZmF1bHRDbGFzc05hbWU7XG4gICAgY29uc3QgaG9saWRheU5hbWVBcnIgPSBjbGFzc05hbWVzT2JqW1wiaG9saWRheU5hbWVzXCJdO1xuICAgIGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0gPSBob2xpZGF5TmFtZUFyclxuICAgICAgPyBbLi4uaG9saWRheU5hbWVBcnIsIGhvbGlkYXlOYW1lXVxuICAgICAgOiBbaG9saWRheU5hbWVdO1xuICAgIGRhdGVDbGFzc2VzLnNldChrZXksIGNsYXNzTmFtZXNPYmopO1xuICB9KTtcbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXNUb0luamVjdEFmdGVyKFxuICBzdGFydE9mRGF5LFxuICBjdXJyZW50VGltZSxcbiAgY3VycmVudE11bHRpcGxpZXIsXG4gIGludGVydmFscyxcbiAgaW5qZWN0ZWRUaW1lcyxcbikge1xuICBjb25zdCBsID0gaW5qZWN0ZWRUaW1lcy5sZW5ndGg7XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IGluamVjdGVkVGltZSA9IHN0YXJ0T2ZEYXk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkSG91cnMoaW5qZWN0ZWRUaW1lLCBnZXRIb3VycyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkTWludXRlcyhpbmplY3RlZFRpbWUsIGdldE1pbnV0ZXMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuICAgIGluamVjdGVkVGltZSA9IGFkZFNlY29uZHMoaW5qZWN0ZWRUaW1lLCBnZXRTZWNvbmRzKGluamVjdGVkVGltZXNbaV0pKTtcblxuICAgIGNvbnN0IG5leHRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIHN0YXJ0T2ZEYXksXG4gICAgICAoY3VycmVudE11bHRpcGxpZXIgKyAxKSAqIGludGVydmFscyxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgaXNBZnRlcihpbmplY3RlZFRpbWUsIGN1cnJlbnRUaW1lKSAmJlxuICAgICAgaXNCZWZvcmUoaW5qZWN0ZWRUaW1lLCBuZXh0VGltZSlcbiAgICApIHtcbiAgICAgIHRpbWVzLnB1c2goaW5qZWN0ZWRUaW1lc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRpbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWmVybyhpKSB7XG4gIHJldHVybiBpIDwgMTAgPyBgMCR7aX1gIDogYCR7aX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WWVhcnNQZXJpb2QoXG4gIGRhdGUsXG4gIHllYXJJdGVtTnVtYmVyID0gREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuKSB7XG4gIGNvbnN0IGVuZFBlcmlvZCA9IE1hdGguY2VpbChnZXRZZWFyKGRhdGUpIC8geWVhckl0ZW1OdW1iZXIpICogeWVhckl0ZW1OdW1iZXI7XG4gIGNvbnN0IHN0YXJ0UGVyaW9kID0gZW5kUGVyaW9kIC0gKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gIHJldHVybiB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzSW5EYXkoZCkge1xuICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKTtcbiAgY29uc3Qgc3RhcnRPZlRoZU5leHREYXkgPSBuZXcgRGF0ZShcbiAgICBkLmdldEZ1bGxZZWFyKCksXG4gICAgZC5nZXRNb250aCgpLFxuICAgIGQuZ2V0RGF0ZSgpLFxuICAgIDI0LFxuICApO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKCgrc3RhcnRPZlRoZU5leHREYXkgLSArc3RhcnRPZkRheSkgLyAzXzYwMF8wMDApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIHRoZSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlXG4gKlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL3N0YXJ0T2ZNaW51dGVgXG4gKiBkbyBub3QgbWFrZSBjaGFuZ2VzIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1xuICpcbiAqIFNlZSBjb21tZW50cyBvbiBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL3B1bGwvNDI0NFxuICogZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gc3RhcnQgb2YgdGhlIG1pbnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZk1pbnV0ZShkKSB7XG4gIGNvbnN0IHNlY29uZHMgPSBkLmdldFNlY29uZHMoKTtcbiAgY29uc3QgbWlsbGlzZWNvbmRzID0gZC5nZXRNaWxsaXNlY29uZHMoKTtcblxuICByZXR1cm4gdG9EYXRlKGQuZ2V0VGltZSgpIC0gc2Vjb25kcyAqIDEwMDAgLSBtaWxsaXNlY29uZHMpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIG1pbnV0ZVxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9pc1NhbWVNaW51dGVgXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkMVxuICogQHBhcmFtIHtEYXRlfSBkMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNaW51dGUoZDEsIGQyKSB7XG4gIHJldHVybiBzdGFydE9mTWludXRlKGQxKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZNaW51dGUoZDIpLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmVkIGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lICgwMDowMDowMClcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgZm9yIHdoaWNoIG1pZG5pZ2h0IHRpbWUgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtEYXRlfSBBIG5ldyBkYXRldGltZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlkbmlnaHREYXRlKGRhdGUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGVcIik7XG4gIH1cblxuICBjb25zdCBkYXRlV2l0aG91dFRpbWUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgZGF0ZVdpdGhvdXRUaW1lLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZVdpdGhvdXRUaW1lO1xufVxuXG4vKipcbiAqIElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSBUaGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUaGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKlxuICogTm90ZTpcbiAqICBUaGlzIGZ1bmN0aW9uIGNvbnNpZGVycyB0aGUgbWlkLW5pZ2h0IG9mIHRoZSBnaXZlbiBkYXRlcyBmb3IgY29tcGFyaXNvbi5cbiAqICBJdCBldmFsdWF0ZXMgd2hldGhlciBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlIGJhc2VkIG9uIHRoZWlyIG1pZC1uaWdodCB0aW1lc3RhbXBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlQmVmb3JlKGRhdGUsIGRhdGVUb0NvbXBhcmUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkgfHwgIWlzRGF0ZShkYXRlVG9Db21wYXJlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSByZWNlaXZlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlKTtcbiAgY29uc3QgbWlkbmlnaHREYXRlVG9Db21wYXJlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGVUb0NvbXBhcmUpO1xuXG4gIHJldHVybiBpc0JlZm9yZShtaWRuaWdodERhdGUsIG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NwYWNlS2V5RG93bihldmVudCkge1xuICBjb25zdCBTUEFDRV9LRVkgPSBcIiBcIjtcbiAgcmV0dXJuIGV2ZW50LmtleSA9PT0gU1BBQ0VfS0VZO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVllYXJzKHllYXIsIG5vT2ZZZWFyLCBtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogbm9PZlllYXIgKyAxOyBpKyspIHtcbiAgICBjb25zdCBuZXdZZWFyID0geWVhciArIG5vT2ZZZWFyIC0gaTtcbiAgICBsZXQgaXNJblJhbmdlID0gdHJ1ZTtcblxuICAgIGlmIChtaW5EYXRlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1pbkRhdGUpIDw9IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGUgJiYgaXNJblJhbmdlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1heERhdGUpID49IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKGlzSW5SYW5nZSkge1xuICAgICAgbGlzdC5wdXNoKG5ld1llYXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IHllYXJEcm9wZG93bkl0ZW1OdW1iZXIsIHNjcm9sbGFibGVZZWFyRHJvcGRvd24gfSA9IHByb3BzO1xuICAgIGNvbnN0IG5vT2ZZZWFyID1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXIgfHwgKHNjcm9sbGFibGVZZWFyRHJvcGRvd24gPyAxMCA6IDUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHllYXJzTGlzdDogZ2VuZXJhdGVZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy55ZWFyLFxuICAgICAgICBub09mWWVhcixcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gICAgdGhpcy5kcm9wZG93blJlZiA9IGNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZHJvcGRvd25DdXJyZW50ID0gdGhpcy5kcm9wZG93blJlZi5jdXJyZW50O1xuXG4gICAgaWYgKGRyb3Bkb3duQ3VycmVudCkge1xuICAgICAgLy8gR2V0IGFycmF5IGZyb20gSFRNTENvbGxlY3Rpb25cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuID0gZHJvcGRvd25DdXJyZW50LmNoaWxkcmVuXG4gICAgICAgID8gQXJyYXkuZnJvbShkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW4pXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkWWVhck9wdGlvbkVsID0gZHJvcGRvd25DdXJyZW50Q2hpbGRyZW5cbiAgICAgICAgPyBkcm9wZG93bkN1cnJlbnRDaGlsZHJlbi5maW5kKChjaGlsZEVsKSA9PiBjaGlsZEVsLmFyaWFTZWxlY3RlZClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBkcm9wZG93bkN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWRZZWFyT3B0aW9uRWxcbiAgICAgICAgPyBzZWxlY3RlZFllYXJPcHRpb25FbC5vZmZzZXRUb3AgK1xuICAgICAgICAgIChzZWxlY3RlZFllYXJPcHRpb25FbC5jbGllbnRIZWlnaHQgLSBkcm9wZG93bkN1cnJlbnQuY2xpZW50SGVpZ2h0KSAvIDJcbiAgICAgICAgOiAoZHJvcGRvd25DdXJyZW50LnNjcm9sbEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMjtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IHRoaXMucHJvcHMueWVhcjtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKCh5ZWFyKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgc2VsZWN0ZWRZZWFyID09PSB5ZWFyXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkX3llYXJcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e3llYXJ9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB5ZWFyKX1cbiAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWRZZWFyID09PSB5ZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHtzZWxlY3RlZFllYXIgPT09IHllYXIgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge3llYXJ9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcblxuICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLnByb3BzLm1pbkRhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWluRGF0ZSkgOiBudWxsO1xuICAgIGNvbnN0IG1heFllYXIgPSB0aGlzLnByb3BzLm1heERhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWF4RGF0ZSkgOiBudWxsO1xuXG4gICAgaWYgKCFtYXhZZWFyIHx8ICF0aGlzLnN0YXRlLnllYXJzTGlzdC5maW5kKCh5ZWFyKSA9PiB5ZWFyID09PSBtYXhZZWFyKSkge1xuICAgICAgb3B0aW9ucy51bnNoaWZ0KFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICAgIGtleT17XCJ1cGNvbWluZ1wifVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaW5jcmVtZW50WWVhcnN9XG4gICAgICAgID5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzLXVwY29taW5nXCIgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIW1pblllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1pblllYXIpKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInByZXZpb3VzXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5kZWNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtcHJldmlvdXNcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgc2hpZnRZZWFycyA9IChhbW91bnQpID0+IHtcbiAgICBjb25zdCB5ZWFycyA9IHRoaXMuc3RhdGUueWVhcnNMaXN0Lm1hcChmdW5jdGlvbiAoeWVhcikge1xuICAgICAgcmV0dXJuIHllYXIgKyBhbW91bnQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHllYXJzTGlzdDogeWVhcnMsXG4gICAgfSk7XG4gIH07XG5cbiAgaW5jcmVtZW50WWVhcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRZZWFycygxKTtcbiAgfTtcblxuICBkZWNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKC0xKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30gcmVmPXt0aGlzLmRyb3Bkb3duUmVmfT5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4veWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IDE5MDA7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IDIxMDA7XG5cbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IG1pblllYXI7IGkgPD0gbWF4WWVhcjsgaSsrKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17aX0+XG4gICAgICAgICAge2l9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQteWVhclwiPlxuICAgICAgICB7dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgeWVhcj17dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKHllYXIgPT09IHRoaXMucHJvcHMueWVhcikgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnByb3BzLmRhdGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSwgZXZlbnQpID0+IHtcbiAgICB0aGlzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB0aGlzLnNldE9wZW4oKTtcbiAgfTtcblxuICBvblNlbGVjdCA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0T3BlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG1vbnRoTmFtZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoaSkgPT4gdGhpcy5wcm9wcy5tb250aCA9PT0gaTtcblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1vbnRoTmFtZXMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGkpXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGhcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvblwiXG4gICAgICAgIH1cbiAgICAgICAga2V5PXttb250aH1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGkpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5pc1NlbGVjdGVkTW9udGgoaSkgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZFwiPuKckzwvc3Bhbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBcIlwiXG4gICAgICAgICl9XG4gICAgICAgIHttb250aH1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aERyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAobW9udGhOYW1lcykgPT5cbiAgICBtb250aE5hbWVzLm1hcCgoTSwgaSkgPT4gKFxuICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAge019XG4gICAgICA8L29wdGlvbj5cbiAgICApKTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKG1vbnRoTmFtZXMpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMobW9udGhOYW1lcyl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSwgbW9udGhOYW1lcykgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3XCJcbiAgICAgIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGhcIj5cbiAgICAgICAge21vbnRoTmFtZXNbdGhpcy5wcm9wcy5tb250aF19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgbW9udGhOYW1lcz17bW9udGhOYW1lc31cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKG1vbnRoTmFtZXMpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSwgbW9udGhOYW1lcyldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24obW9udGhOYW1lcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIGlmIChtb250aCAhPT0gdGhpcy5wcm9wcy5tb250aCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aCk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV0ubWFwKFxuICAgICAgdGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93blxuICAgICAgICA/IChNKSA9PiB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpXG4gICAgICAgIDogKE0pID0+IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpLFxuICAgICk7XG5cbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKG1vbnRoTmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgbmV3RGF0ZSxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVNb250aFllYXJzKG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtaW5EYXRlKTtcbiAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgobWF4RGF0ZSk7XG5cbiAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICBsaXN0LnB1c2gobmV3RGF0ZShjdXJyRGF0ZSkpO1xuXG4gICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtb250aFllYXJzTGlzdDogZ2VuZXJhdGVNb250aFllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubW9udGhZZWFyc0xpc3QubWFwKChtb250aFllYXIpID0+IHtcbiAgICAgIGNvbnN0IG1vbnRoWWVhclBvaW50ID0gZ2V0VGltZShtb250aFllYXIpO1xuICAgICAgY29uc3QgaXNTYW1lTW9udGhZZWFyID1cbiAgICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcikgJiZcbiAgICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBtb250aFllYXIpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgIGlzU2FtZU1vbnRoWWVhclxuICAgICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkX21vbnRoLXllYXJcIlxuICAgICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb25cIlxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e21vbnRoWWVhclBvaW50fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBtb250aFllYXJQb2ludCl9XG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTYW1lTW9udGhZZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNTYW1lTW9udGhZZWFyID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgIOKck1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShtb250aFllYXIsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoWWVhcik7XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfT57dGhpcy5yZW5kZXJPcHRpb25zKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9uc1wiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuaW1wb3J0IHtcbiAgYWRkTW9udGhzLFxuICBmb3JtYXREYXRlLFxuICBnZXRTdGFydE9mTW9udGgsXG4gIGlzQWZ0ZXIsXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBuZXdEYXRlLFxuICBnZXRUaW1lLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbnZhciBXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhZZWFyRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJvcGRvd25WaXNpYmxlOiBmYWxzZSxcbiAgfTtcblxuICByZW5kZXJTZWxlY3RPcHRpb25zID0gKCkgPT4ge1xuICAgIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgIGNvbnN0IGxhc3REYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICAgIGNvbnN0IHRpbWVQb2ludCA9IGdldFRpbWUoY3VyckRhdGUpO1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17dGltZVBvaW50fSB2YWx1ZT17dGltZVBvaW50fT5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShjdXJyRGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG5cbiAgICAgIGN1cnJEYXRlID0gYWRkTW9udGhzKGN1cnJEYXRlLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICBvblNlbGVjdENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0TW9kZSA9ICgpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17Z2V0VGltZShnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXRlKSl9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4ge1xuICAgIGNvbnN0IHllYXJNb250aCA9IGZvcm1hdERhdGUoXG4gICAgICB0aGlzLnByb3BzLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PVwicmVhZFwiXG4gICAgICAgIHN0eWxlPXt7IHZpc2liaWxpdHk6IHZpc2libGUgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXdcIlxuICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aC15ZWFyXCI+XG4gICAgICAgICAge3llYXJNb250aH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEcm9wZG93biA9ICgpID0+IChcbiAgICA8V3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyUG9pbnQpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICBjb25zdCBjaGFuZ2VkRGF0ZSA9IG5ld0RhdGUocGFyc2VJbnQobW9udGhZZWFyUG9pbnQpKTtcblxuICAgIGlmIChcbiAgICAgIGlzU2FtZVllYXIodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSkgJiZcbiAgICAgIGlzU2FtZU1vbnRoKHRoaXMucHJvcHMuZGF0ZSwgY2hhbmdlZERhdGUpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHtcbiAgZ2V0RGF5LFxuICBnZXRNb250aCxcbiAgZ2V0RGF0ZSxcbiAgbmV3RGF0ZSxcbiAgaXNTYW1lRGF5LFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUV4Y2x1ZGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGlzRXF1YWwsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBnZXREYXlPZldlZWtDb2RlLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZm9ybWF0RGF0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbk1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KHByZXZQcm9wcyk7XG4gIH1cblxuICBkYXlFbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VFbnRlcihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9IChvdGhlcikgPT4gaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF5LCBvdGhlcik7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTZWxlY3RlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+IHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpKVxuICAgICAgOiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcblxuICAgIHJldHVybiAhaXNTZWxlY3RlZERhdGUgJiYgdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICB9O1xuXG4gIGlzRGlzYWJsZWQgPSAoKSA9PiBpc0RheURpc2FibGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKCkgPT4gaXNEYXlFeGNsdWRlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNTdGFydE9mV2VlayA9ICgpID0+XG4gICAgaXNTYW1lRGF5KFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lV2VlayA9IChvdGhlcikgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgaXNTYW1lRGF5KFxuICAgICAgb3RoZXIsXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lRGF5T3JXZWVrID0gKG90aGVyKSA9PiB0aGlzLmlzU2FtZURheShvdGhlcikgfHwgdGhpcy5pc1NhbWVXZWVrKG90aGVyKTtcblxuICBnZXRIaWdoTGlnaHRlZENsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBoaWdobGlnaHREYXRlcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7J2RheSBzdHJpbmcsICdjbGFzc05hbWUnfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgcmV0dXJuIGhpZ2hsaWdodERhdGVzLmdldChkYXlTdHIpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJldHVybiB0aGUgYXJyYXkgY29udGFpbmluZyBjbGFzc25hbWUgYXNzb2NpYXRlZCB0byB0aGUgZGF0ZVxuICBnZXRIb2xpZGF5c0NsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhvbGlkYXlzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2Yge2RheSBzdHJpbmc6IHtjbGFzc05hbWUsIGhvbGlkYXlOYW1lfX1cbiAgICBpZiAoaG9saWRheXMuaGFzKGRheVN0cikpIHtcbiAgICAgIHJldHVybiBbaG9saWRheXMuZ2V0KGRheVN0cikuY2xhc3NOYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblJhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhc2VsZWN0aW5nRGF0ZSB8fFxuICAgICAgKCFzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSAmJiB0aGlzLmlzRGlzYWJsZWQoKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzU3RhcnQgJiZcbiAgICAgIGVuZERhdGUgJiZcbiAgICAgIChpc0JlZm9yZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNFbmQgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzUmFuZ2UgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgIWVuZERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShzdGFydERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoZW5kRGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1dlZWtlbmQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla2RheSA9IGdldERheSh0aGlzLnByb3BzLmRheSk7XG4gICAgcmV0dXJuIHdlZWtkYXkgPT09IDAgfHwgd2Vla2RheSA9PT0gNjtcbiAgfTtcblxuICBpc0FmdGVyTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKHRoaXMucHJvcHMubW9udGggKyAxKSAlIDEyID09PSBnZXRNb250aCh0aGlzLnByb3BzLmRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQmVmb3JlTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KSArIDEpICUgMTIgPT09IHRoaXMucHJvcHMubW9udGhcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudERheSA9ICgpID0+IHRoaXMuaXNTYW1lRGF5KG5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+XG4gICAgICAgIHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lXG4gICAgICA/IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lKGRhdGUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIsXG4gICAgICBkYXlDbGFzc05hbWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tXCIgKyBnZXREYXlPZldlZWtDb2RlKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWRpc2FibGVkXCI6IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZXhjbHVkZWRcIjogdGhpcy5pc0V4Y2x1ZGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXNlbGVjdGluZy1yYW5nZVwiOiB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50RGF5KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS13ZWVrZW5kXCI6IHRoaXMuaXNXZWVrZW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1vdXRzaWRlLW1vbnRoXCI6XG4gICAgICAgICAgdGhpcy5pc0FmdGVyTW9udGgoKSB8fCB0aGlzLmlzQmVmb3JlTW9udGgoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmdldEhpZ2hMaWdodGVkQ2xhc3MoXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhpZ2hsaWdodGVkXCIpLFxuICAgICAgdGhpcy5nZXRIb2xpZGF5c0NsYXNzKCksXG4gICAgKTtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQgPSBcIkNob29zZVwiLFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKCkgfHwgdGhpcy5pc0V4Y2x1ZGVkKClcbiAgICAgICAgPyBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWRcbiAgICAgICAgOiBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7Zm9ybWF0RGF0ZShkYXksIFwiUFBQUFwiLCB0aGlzLnByb3BzLmxvY2FsZSl9YDtcbiAgfTtcblxuICAvLyBBIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgaG9saWRheSdzIG5hbWUgYXMgdGl0bGUncyBjb250ZW50XG4gIGdldFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyA9IG5ldyBNYXAoKSwgZXhjbHVkZURhdGVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbXBhcmVEdCA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgdGl0bGVzID0gW107XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhjb21wYXJlRHQpKSB7XG4gICAgICB0aXRsZXMucHVzaCguLi5ob2xpZGF5cy5nZXQoY29tcGFyZUR0KS5ob2xpZGF5TmFtZXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0V4Y2x1ZGVkKCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKFxuICAgICAgICBleGNsdWRlRGF0ZXNcbiAgICAgICAgICA/LmZpbHRlcigoZXhjbHVkZURhdGUpID0+XG4gICAgICAgICAgICBpc1NhbWVEYXkoZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSwgZGF5KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLm1hcCgoZXhjbHVkZURhdGUpID0+IGV4Y2x1ZGVEYXRlLm1lc3NhZ2UpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlcy5qb2luKFwiLCBcIik7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAoc2VsZWN0ZWQsIHByZVNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gc2VsZWN0ZWQgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZDtcbiAgICBjb25zdCBwcmVTZWxlY3Rpb25EYXkgPSBwcmVTZWxlY3Rpb24gfHwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIShcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgICAgICAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlciB8fCAhdGhpcy5pc1N0YXJ0T2ZXZWVrKCkpXG4gICAgICApICYmXG4gICAgICAodGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSB8fFxuICAgICAgICAodGhpcy5pc1NhbWVEYXkoc2VsZWN0ZWREYXkpICYmXG4gICAgICAgICAgaXNTYW1lRGF5KHByZVNlbGVjdGlvbkRheSwgc2VsZWN0ZWREYXkpKSlcbiAgICAgICAgPyAwXG4gICAgICAgIDogLTE7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIGRheVxuICAvLyBmb2N1cyB0aGUgZGF5IG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNEYXkgPSAocHJldlByb3BzID0ge30pID0+IHtcbiAgICBsZXQgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgdGhpcy5pc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGUgYWN0aXZlRWxlbWVudCBpcyBpbiB0aGUgY29udGFpbmVyLCBhbmQgaXQgaXMgYW5vdGhlciBpbnN0YW5jZSBvZiBEYXlcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIpXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy9kYXkgaXMgb25lIG9mIHRoZSBub24gcmVuZGVyZWQgZHVwbGljYXRlIGRheXNcbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c0RheSAmJiB0aGlzLmRheUVsLmN1cnJlbnQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW5kZXJEYXlDb250ZW50cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzXG4gICAgICA/IHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHMoZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSksIHRoaXMucHJvcHMuZGF5KVxuICAgICAgOiBnZXREYXRlKHRoaXMucHJvcHMuZGF5KTtcbiAgfTtcblxuICByZW5kZXIgPSAoKSA9PiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt0aGlzLmRheUVsfVxuICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXModGhpcy5wcm9wcy5kYXkpfVxuICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbCgpfVxuICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICB0aXRsZT17dGhpcy5nZXRUaXRsZSgpfVxuICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc0Rpc2FibGVkKCl9XG4gICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50RGF5KCkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZCgpIHx8IHRoaXMuaXNJblJhbmdlKCl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyRGF5Q29udGVudHMoKX1cbiAgICAgIHt0aGlzLmdldFRpdGxlKCkgIT09IFwiXCIgJiYgKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvdmVybGF5XCI+e3RoaXMuZ2V0VGl0bGUoKX08L3NwYW4+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWtOdW1iZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJpYUxhYmVsUHJlZml4OiBcIndlZWsgXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2Vla051bWJlcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudCkgfSksXG4gICAgXSksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c1dlZWtOdW1iZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcihwcmV2UHJvcHMpO1xuICB9XG5cbiAgd2Vla051bWJlckVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIGdldFRhYkluZGV4ID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlciAmJlxuICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAoaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCB0aGlzLnByb3BzLnNlbGVjdGVkKSkpXG4gICAgICA/IDBcbiAgICAgIDogLTE7XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIHdlZWstbnVtYmVyXG4gIC8vIGZvY3VzIHRoZSB3ZWVrLW51bWJlciBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzV2Vla051bWJlciA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIFdlZWtOdW1iZXJcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHdlZWtOdW1iZXIsIGFyaWFMYWJlbFByZWZpeCA9IFwid2VlayBcIiwgb25DbGljayB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tY2xpY2thYmxlXCI6ICEhb25DbGljayxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLXNlbGVjdGVkXCI6XG4gICAgICAgICEhb25DbGljayAmJiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3RoaXMud2Vla051bWJlckVsfVxuICAgICAgICBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHthcmlhTGFiZWxQcmVmaXh9ICR7dGhpcy5wcm9wcy53ZWVrTnVtYmVyfWB9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICA+XG4gICAgICAgIHt3ZWVrTnVtYmVyfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IERheSBmcm9tIFwiLi9kYXlcIjtcbmltcG9ydCBXZWVrTnVtYmVyIGZyb20gXCIuL3dlZWtfbnVtYmVyXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuaW1wb3J0IHsgYWRkRGF5cywgZ2V0V2VlaywgZ2V0U3RhcnRPZldlZWssIGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VlayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgIH07XG4gIH1cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlV2Vla0NsaWNrID0gKGRheSwgd2Vla051bWJlciwgZXZlbnQpID0+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25XZWVrU2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0KGRheSwgd2Vla051bWJlciwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgdGhpcy5oYW5kbGVEYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0V2Vla051bWJlciA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcihkYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFdlZWsoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyRGF5cyA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IHRoaXMuc3RhcnRPZldlZWsoKTtcbiAgICBjb25zdCBkYXlzID0gW107XG4gICAgY29uc3Qgd2Vla051bWJlciA9IHRoaXMuZm9ybWF0V2Vla051bWJlcihzdGFydE9mV2Vlayk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2tBY3Rpb24gPVxuICAgICAgICB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICAgICAgPyB0aGlzLmhhbmRsZVdlZWtDbGljay5iaW5kKHRoaXMsIHN0YXJ0T2ZXZWVrLCB3ZWVrTnVtYmVyKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgZGF5cy5wdXNoKFxuICAgICAgICA8V2Vla051bWJlclxuICAgICAgICAgIGtleT1cIldcIlxuICAgICAgICAgIHdlZWtOdW1iZXI9e3dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGF0ZT17c3RhcnRPZldlZWt9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja0FjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5hcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAvPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxEYXlcbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkPXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGtleT17ZGF5LnZhbHVlT2YoKX1cbiAgICAgICAgICAgIGRheT17ZGF5fVxuICAgICAgICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlci5iaW5kKHRoaXMsIGRheSl9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBzdGFydE9mV2VlayA9ICgpID0+XG4gICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT5cbiAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICFpc1NhbWVEYXkodGhpcy5zdGFydE9mV2VlaygpLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgIGlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtcIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay0tc2VsZWN0ZWRcIjogaXNTYW1lRGF5KFxuICAgICAgICB0aGlzLnN0YXJ0T2ZXZWVrKCksXG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICApLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1rZXlib2FyZC1zZWxlY3RlZFwiOiB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbHN4KHdlZWtOdW1iZXJDbGFzc2VzKX0+e3RoaXMucmVuZGVyRGF5cygpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgV2VlayBmcm9tIFwiLi93ZWVrXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IEZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UID0gNjtcblxuY29uc3QgTU9OVEhfQ09MVU1OU19MQVlPVVQgPSB7XG4gIFRXT19DT0xVTU5TOiBcInR3b19jb2x1bW5zXCIsXG4gIFRIUkVFX0NPTFVNTlM6IFwidGhyZWVfY29sdW1uc1wiLFxuICBGT1VSX0NPTFVNTlM6IFwiZm91cl9jb2x1bW5zXCIsXG59O1xuY29uc3QgTU9OVEhfQ09MVU1OUyA9IHtcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULlRXT19DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxXSxcbiAgICAgIFsyLCAzXSxcbiAgICAgIFs0LCA1XSxcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs4LCA5XSxcbiAgICAgIFsxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAyLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVEhSRUVfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMl0sXG4gICAgICBbMywgNCwgNV0sXG4gICAgICBbNiwgNywgOF0sXG4gICAgICBbOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogMyxcbiAgfSxcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMiwgM10sXG4gICAgICBbNCwgNSwgNiwgN10sXG4gICAgICBbOCwgOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogNCxcbiAgfSxcbn07XG5jb25zdCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUID0gMTtcblxuZnVuY3Rpb24gZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbikge1xuICBpZiAoc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5GT1VSX0NPTFVNTlM7XG4gIGlmIChzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyKSByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlM7XG4gIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9yZGVySW5EaXNwbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBNT05USF9SRUZTID0gWy4uLkFycmF5KDEyKV0ubWFwKCgpID0+IFJlYWN0LmNyZWF0ZVJlZigpKTtcbiAgUVVBUlRFUl9SRUZTID0gWy4uLkFycmF5KDQpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50LCB0aGlzLnByb3BzLm9yZGVySW5EaXNwbGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlU3RhcnRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlRW5kTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKHV0aWxzLnNldE1vbnRoKGRheSwgbSksIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8ICFzZWxlY3RpbmdEYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0ID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCA9IChtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNXZWVrSW5Nb250aCA9IChzdGFydE9mV2VlaykgPT4ge1xuICAgIGNvbnN0IGRheSA9IHRoaXMucHJvcHMuZGF5O1xuICAgIGNvbnN0IGVuZE9mV2VlayA9IHV0aWxzLmFkZERheXMoc3RhcnRPZldlZWssIDYpO1xuICAgIHJldHVybiAoXG4gICAgICB1dGlscy5pc1NhbWVNb250aChzdGFydE9mV2VlaywgZGF5KSB8fCB1dGlscy5pc1NhbWVNb250aChlbmRPZldlZWssIGRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudE1vbnRoID0gKGRheSwgbSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIG0gPT09IHV0aWxzLmdldE1vbnRoKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNDdXJyZW50UXVhcnRlciA9IChkYXksIHEpID0+XG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHV0aWxzLm5ld0RhdGUoKSkgJiZcbiAgICBxID09PSB1dGlscy5nZXRRdWFydGVyKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZE1vbnRoID0gKGRheSwgbSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0TW9udGgoc2VsZWN0ZWQpID09PSBtICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICBpc1NlbGVjdGVkUXVhcnRlciA9IChkYXksIHEsIHNlbGVjdGVkKSA9PlxuICAgIHV0aWxzLmdldFF1YXJ0ZXIoZGF5KSA9PT0gcSAmJlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcihzZWxlY3RlZCk7XG5cbiAgcmVuZGVyV2Vla3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla3MgPSBbXTtcbiAgICB2YXIgaXNGaXhlZEhlaWdodCA9IHRoaXMucHJvcHMuZml4ZWRIZWlnaHQ7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IGZhbHNlO1xuICAgIGxldCBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICB1dGlscy5nZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXkpLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkO1xuXG4gICAgY29uc3QgcHJlU2VsZWN0aW9uID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgd2Vla3MucHVzaChcbiAgICAgICAgPFdlZWtcbiAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBkYXk9e2N1cnJlbnRXZWVrU3RhcnR9XG4gICAgICAgICAgbW9udGg9e3V0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMuZGF5KX1cbiAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgcHJlU2VsZWN0aW9uPXtwcmVTZWxlY3Rpb259XG4gICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgLz4sXG4gICAgICApO1xuXG4gICAgICBpZiAoYnJlYWtBZnRlck5leHRQdXNoKSBicmVhaztcblxuICAgICAgaSsrO1xuICAgICAgY3VycmVudFdlZWtTdGFydCA9IHV0aWxzLmFkZFdlZWtzKGN1cnJlbnRXZWVrU3RhcnQsIDEpO1xuXG4gICAgICAvLyBJZiBvbmUgb2YgdGhlc2UgY29uZGl0aW9ucyBpcyB0cnVlLCB3ZSB3aWxsIGVpdGhlciBicmVhayBvbiB0aGlzIHdlZWtcbiAgICAgIC8vIG9yIGJyZWFrIG9uIHRoZSBuZXh0IHdlZWtcbiAgICAgIGNvbnN0IGlzRml4ZWRBbmRGaW5hbFdlZWsgPVxuICAgICAgICBpc0ZpeGVkSGVpZ2h0ICYmIGkgPj0gRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQ7XG4gICAgICBjb25zdCBpc05vbkZpeGVkQW5kT3V0T2ZNb250aCA9XG4gICAgICAgICFpc0ZpeGVkSGVpZ2h0ICYmICF0aGlzLmlzV2Vla0luTW9udGgoY3VycmVudFdlZWtTdGFydCk7XG5cbiAgICAgIGlmIChpc0ZpeGVkQW5kRmluYWxXZWVrIHx8IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBlZWtOZXh0TW9udGgpIHtcbiAgICAgICAgICBicmVha0FmdGVyTmV4dFB1c2ggPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlZWtzO1xuICB9O1xuXG4gIG9uTW9udGhDbGljayA9IChlLCBtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlDbGljayh1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25Nb250aE1vdXNlRW50ZXIgPSAobSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKHRoaXMucHJvcHMuZGF5LCBtKTtcblxuICAgIGlmICh1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhOYXZpZ2F0aW9uID0gKG5ld01vbnRoLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLk1PTlRIX1JFRlNbbmV3TW9udGhdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIG9uTW9udGhLZXlEb3duID0gKGV2ZW50LCBtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24sXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzZXRQcmVTZWxlY3Rpb24sXG4gICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgIT09IFwiVGFiXCIpIHtcbiAgICAgIC8vIHByZXZlbnREZWZhdWx0IG9uIHRhYiBldmVudCBibG9ja3MgZm9jdXMgY2hhbmdlXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBtb250aENvbHVtbnNMYXlvdXQgPSBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0ID1cbiAgICAgICAgTU9OVEhfQ09MVU1OU1ttb250aENvbHVtbnNMYXlvdXRdLnZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDtcbiAgICAgIGNvbnN0IG1vbnRoc0dyaWQgPSBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0uZ3JpZDtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vbk1vbnRoQ2xpY2soZXZlbnQsIG1vbnRoKTtcbiAgICAgICAgICBzZXRQcmVTZWxlY3Rpb24oc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDExID8gMCA6IG1vbnRoICsgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG1vbnRoID09PSAwID8gMTEgOiBtb250aCAtIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGZpcnN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFswXS5pbmNsdWRlcyhtb250aClcbiAgICAgICAgICAgICAgPyBtb250aCArIDEyIC0gdmVydGljYWxPZmZzZXRcbiAgICAgICAgICAgICAgOiBtb250aCAtIHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgdXRpbHMuc3ViTW9udGhzKHByZVNlbGVjdGlvbiwgdmVydGljYWxPZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1vbnRoIG9uIHRoZSBsYXN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFttb250aHNHcmlkLmxlbmd0aCAtIDFdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoIC0gMTIgKyB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoICsgdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5hZGRNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbk1vbnRoS2V5RG93biAmJiBoYW5kbGVPbk1vbnRoS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgb25RdWFydGVyQ2xpY2sgPSAoZSwgcSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZRdWFydGVyKGxhYmVsRGF0ZSksIGUpO1xuICB9O1xuXG4gIG9uUXVhcnRlck1vdXNlRW50ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlUXVhcnRlck5hdmlnYXRpb24gPSAobmV3UXVhcnRlciwgbmV3RGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG4gICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuUVVBUlRFUl9SRUZTW25ld1F1YXJ0ZXIgLSAxXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25RdWFydGVyS2V5RG93biA9IChldmVudCwgcXVhcnRlcikgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2ZW50LCBxdWFydGVyKTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gNCA/IDEgOiBxdWFydGVyICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVRdWFydGVyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHF1YXJ0ZXIgPT09IDEgPyA0IDogcXVhcnRlciAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJRdWFydGVycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaXNNb250aERpc2FibGVkID0gKG1vbnRoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbW9udGgpO1xuICAgIHJldHVybiAoXG4gICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMpICYmXG4gICAgICB1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKVxuICAgICk7XG4gIH07XG5cbiAgZ2V0TW9udGhDbGFzc05hbWVzID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlLCBzZWxlY3RlZCwgcHJlU2VsZWN0aW9uLCBtb250aENsYXNzTmFtZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoQ2xhc3NOYW1lID0gbW9udGhDbGFzc05hbWVcbiAgICAgID8gbW9udGhDbGFzc05hbWUodXRpbHMuc2V0TW9udGgoZGF5LCBtKSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtJHttfWAsXG4gICAgICBfbW9udGhDbGFzc05hbWUsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tZGlzYWJsZWRcIjogdGhpcy5pc01vbnRoRGlzYWJsZWQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkTW9udGgoXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIG0sXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzTW9udGhJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIG0sXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0TW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZE1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChtKSA9PiB7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWRNb250aCA9IHV0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBtID09PSBwcmVTZWxlY3RlZE1vbnRoXG4gICAgICAgID8gXCIwXCJcbiAgICAgICAgOiBcIi0xXCI7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgZ2V0UXVhcnRlclRhYkluZGV4ID0gKHEpID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBxID09PSBwcmVTZWxlY3RlZFF1YXJ0ZXJcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAobW9udGgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXggPSBcIkNob29zZVwiLFxuICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXggPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICAgIGRheSxcbiAgICAgIGxvY2FsZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aChkYXksIG1vbnRoKTtcbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKGxhYmVsRGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKGxhYmVsRGF0ZSlcbiAgICAgICAgPyBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeFxuICAgICAgICA6IGNob29zZURheUFyaWFMYWJlbFByZWZpeDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7dXRpbHMuZm9ybWF0RGF0ZShsYWJlbERhdGUsIFwiTU1NTSB5eXl5XCIsIGxvY2FsZSl9YDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ2xhc3NOYW1lcyA9IChxKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci0ke3F9YCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZCh1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgcSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHByZVNlbGVjdGlvbiksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1yYW5nZVwiOiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIHEsXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzUmFuZ2VTdGFydFF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kUXVhcnRlcihxKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRNb250aENvbnRlbnQgPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd0Z1bGxNb250aFllYXJQaWNrZXIsIHJlbmRlck1vbnRoQ29udGVudCwgbG9jYWxlLCBkYXkgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0TW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhTaG9ydEluTG9jYWxlKG0sIGxvY2FsZSk7XG4gICAgY29uc3QgZnVsbE1vbnRoVGV4dCA9IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBpZiAocmVuZGVyTW9udGhDb250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTW9udGhDb250ZW50KG0sIHNob3J0TW9udGhUZXh0LCBmdWxsTW9udGhUZXh0LCBkYXkpO1xuICAgIH1cbiAgICByZXR1cm4gc2hvd0Z1bGxNb250aFllYXJQaWNrZXIgPyBmdWxsTW9udGhUZXh0IDogc2hvcnRNb250aFRleHQ7XG4gIH07XG5cbiAgZ2V0UXVhcnRlckNvbnRlbnQgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgcmVuZGVyUXVhcnRlckNvbnRlbnQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG9ydFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxLCBsb2NhbGUpO1xuICAgIHJldHVybiByZW5kZXJRdWFydGVyQ29udGVudFxuICAgICAgPyByZW5kZXJRdWFydGVyQ29udGVudChxLCBzaG9ydFF1YXJ0ZXIpXG4gICAgICA6IHNob3J0UXVhcnRlcjtcbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgc2VsZWN0ZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtb250aENvbHVtbnMgPVxuICAgICAgTU9OVEhfQ09MVU1OU1tcbiAgICAgICAgZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIClcbiAgICAgIF0uZ3JpZDtcbiAgICByZXR1cm4gbW9udGhDb2x1bW5zLm1hcCgobW9udGgsIGkpID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtd3JhcHBlclwiIGtleT17aX0+XG4gICAgICAgIHttb250aC5tYXAoKG0sIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3RoaXMuTU9OVEhfUkVGU1ttXX1cbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoS2V5RG93bihldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uTW9udGhNb3VzZUVudGVyKG0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgobSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0TW9udGhDbGFzc05hbWVzKG0pfVxuICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc01vbnRoRGlzYWJsZWQobSl9XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKG0pfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudE1vbnRoKGRheSwgbSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgc2VsZWN0ZWQpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldE1vbnRoQ29udGVudChtKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJRdWFydGVycyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcXVhcnRlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci13cmFwcGVyXCI+XG4gICAgICAgIHtxdWFydGVycy5tYXAoKHEsIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICByZWY9e3RoaXMuUVVBUlRFUl9SRUZTW2pdfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJDbGljayhldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJLZXlEb3duKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFF1YXJ0ZXJDbGFzc05hbWVzKHEpfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHNlbGVjdGVkKX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFF1YXJ0ZXJUYWJJbmRleChxKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRRdWFydGVyKGRheSwgcSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRRdWFydGVyQ29udGVudChxKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0aW5nRGF0ZSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgc2hvd1dlZWtQaWNrZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhcIixcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQpLFxuICAgICAgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFBpY2tlclwiOiBzaG93TW9udGhZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlclBpY2tlclwiOiBzaG93UXVhcnRlclllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrUGlja2VyXCI6IHNob3dXZWVrUGlja2VyIH0sXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIGRheSxcbiAgICAgIGFyaWFMYWJlbFByZWZpeCA9IFwiTW9udGggXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXggPSBhcmlhTGFiZWxQcmVmaXhcbiAgICAgID8gYXJpYUxhYmVsUHJlZml4LnRyaW0oKSArIFwiIFwiXG4gICAgICA6IFwiXCI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2Zvcm1hdHRlZEFyaWFMYWJlbFByZWZpeH0ke3V0aWxzLmZvcm1hdERhdGUoZGF5LCBcIk1NTU0sIHl5eXlcIiwgdGhpcy5wcm9wcy5sb2NhbGUpfWB9XG4gICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgID5cbiAgICAgICAge3Nob3dNb250aFllYXJQaWNrZXJcbiAgICAgICAgICA/IHRoaXMucmVuZGVyTW9udGhzKClcbiAgICAgICAgICA6IHNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgICAgPyB0aGlzLnJlbmRlclF1YXJ0ZXJzKClcbiAgICAgICAgICAgIDogdGhpcy5yZW5kZXJXZWVrcygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHtcbiAgZ2V0SG91cnMsXG4gIGdldE1pbnV0ZXMsXG4gIG5ld0RhdGUsXG4gIGdldFN0YXJ0T2ZEYXksXG4gIGFkZE1pbnV0ZXMsXG4gIGZvcm1hdERhdGUsXG4gIGlzVGltZUluRGlzYWJsZWRSYW5nZSxcbiAgaXNUaW1lRGlzYWJsZWQsXG4gIHRpbWVzVG9JbmplY3RBZnRlcixcbiAgZ2V0SG91cnNJbkRheSxcbiAgaXNTYW1lTWludXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJ2YWxzOiAzMCxcbiAgICAgIG9uVGltZUNoYW5nZTogKCkgPT4ge30sXG4gICAgICB0b2RheUJ1dHRvbjogbnVsbCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNhbGNDZW50ZXJQb3NpdGlvbiA9IChsaXN0SGVpZ2h0LCBjZW50ZXJMaVJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICBjZW50ZXJMaVJlZi5vZmZzZXRUb3AgLSAobGlzdEhlaWdodCAvIDIgLSBjZW50ZXJMaVJlZi5jbGllbnRIZWlnaHQgLyAyKVxuICAgICk7XG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1vbnRoUmVmOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGhlaWdodDogbnVsbCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBjb2RlIHRvIGVuc3VyZSBzZWxlY3RlZCB0aW1lIHdpbGwgYWx3YXlzIGJlIGluIGZvY3VzIHdpdGhpbiB0aW1lIHdpbmRvdyB3aGVuIGl0IGZpcnN0IGFwcGVhcnNcbiAgICB0aGlzLnNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lKCk7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhSZWYgJiYgdGhpcy5oZWFkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMubW9udGhSZWYuY2xpZW50SGVpZ2h0IC0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUgPSAoKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5saXN0KSByZXR1cm47XG5cbiAgICAgIHRoaXMubGlzdC5zY3JvbGxUb3AgPVxuICAgICAgICB0aGlzLmNlbnRlckxpICYmXG4gICAgICAgIFRpbWUuY2FsY0NlbnRlclBvc2l0aW9uKFxuICAgICAgICAgIHRoaXMucHJvcHMubW9udGhSZWZcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5saXN0LmNsaWVudEhlaWdodCxcbiAgICAgICAgICB0aGlzLmNlbnRlckxpLFxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrID0gKHRpbWUpID0+IHtcbiAgICBpZiAoXG4gICAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICAgIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB0aGlzLnByb3BzKSkgfHxcbiAgICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJUaW1lKSAmJlxuICAgICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aW1lKTtcbiAgfTtcblxuICBpc1NlbGVjdGVkVGltZSA9ICh0aW1lKSA9PlxuICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiYgaXNTYW1lTWludXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRpbWUpO1xuXG4gIGlzRGlzYWJsZWRUaW1lID0gKHRpbWUpID0+XG4gICAgKCh0aGlzLnByb3BzLm1pblRpbWUgfHwgdGhpcy5wcm9wcy5tYXhUaW1lKSAmJlxuICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuaW5jbHVkZVRpbWVzIHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSk7XG5cbiAgbGlDbGFzc2VzID0gKHRpbWUpID0+IHtcbiAgICBsZXQgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW1cIixcbiAgICAgIHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSA/IHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSh0aW1lKSA6IHVuZGVmaW5lZCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWRpc2FibGVkXCIpO1xuICAgIH1cblxuICAgIC8vY29udmVydCB0aGlzLnByb3BzLmludGVydmFscyBhbmQgdGhlIHJlbGV2YW50IHRpbWUgdG8gc2Vjb25kcyBhbmQgY2hlY2sgaWYgaXQgaXQncyBhIGNsZWFuIG11bHRpcGxlIG9mIHRoZSBpbnRlcnZhbFxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuaW5qZWN0VGltZXMgJiZcbiAgICAgIChnZXRIb3Vycyh0aW1lKSAqIDM2MDAgKyBnZXRNaW51dGVzKHRpbWUpICogNjAgKyBnZXRTZWNvbmRzKHRpbWUpKSAlXG4gICAgICAgICh0aGlzLnByb3BzLmludGVydmFscyAqIDYwKSAhPT1cbiAgICAgICAgMFxuICAgICkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWluamVjdGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCwgdGltZSkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZy5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgdGhpcy5oYW5kbGVDbGljayh0aW1lKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVzID0gKCkgPT4ge1xuICAgIGxldCB0aW1lcyA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMucHJvcHMuZm9ybWF0ID8gdGhpcy5wcm9wcy5mb3JtYXQgOiBcInBcIjtcbiAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLnByb3BzLmludGVydmFscztcblxuICAgIGNvbnN0IGFjdGl2ZURhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCB8fCB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgfHwgbmV3RGF0ZSgpO1xuXG4gICAgY29uc3QgYmFzZSA9IGdldFN0YXJ0T2ZEYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3Qgc29ydGVkSW5qZWN0VGltZXMgPVxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgbWludXRlc0luRGF5ID0gNjAgKiBnZXRIb3Vyc0luRGF5KGFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBtaW51dGVzSW5EYXkgLyBpbnRlcnZhbHM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11bHRpcGxpZXI7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBhZGRNaW51dGVzKGJhc2UsIGkgKiBpbnRlcnZhbHMpO1xuICAgICAgdGltZXMucHVzaChjdXJyZW50VGltZSk7XG5cbiAgICAgIGlmIChzb3J0ZWRJbmplY3RUaW1lcykge1xuICAgICAgICBjb25zdCB0aW1lc1RvSW5qZWN0ID0gdGltZXNUb0luamVjdEFmdGVyKFxuICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgY3VycmVudFRpbWUsXG4gICAgICAgICAgaSxcbiAgICAgICAgICBpbnRlcnZhbHMsXG4gICAgICAgICAgc29ydGVkSW5qZWN0VGltZXMsXG4gICAgICAgICk7XG4gICAgICAgIHRpbWVzID0gdGltZXMuY29uY2F0KHRpbWVzVG9JbmplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSB3aGljaCB0aW1lIHRvIGZvY3VzIGFuZCBzY3JvbGwgaW50byB2aWV3IHdoZW4gY29tcG9uZW50IG1vdW50c1xuICAgIGNvbnN0IHRpbWVUb0ZvY3VzID0gdGltZXMucmVkdWNlKChwcmV2LCB0aW1lKSA9PiB7XG4gICAgICBpZiAodGltZS5nZXRUaW1lKCkgPD0gYWN0aXZlRGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aW1lc1swXSk7XG5cbiAgICByZXR1cm4gdGltZXMubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGlcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRpbWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5saUNsYXNzZXModGltZSl9XG4gICAgICAgICAgcmVmPXsobGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lID09PSB0aW1lVG9Gb2N1cykge1xuICAgICAgICAgICAgICB0aGlzLmNlbnRlckxpID0gbGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPbktleURvd24oZXYsIHRpbWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RpbWUgPT09IHRpbWVUb0ZvY3VzID8gMCA6IC0xfVxuICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZSh0aW1lLCBmb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXIgJHtcbiAgICAgICAgICB0aGlzLnByb3BzLnRvZGF5QnV0dG9uXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXItLXdpdGgtdG9kYXktYnV0dG9uXCJcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUgJHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUtLW9ubHlcIlxuICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICB9YH1cbiAgICAgICAgICByZWY9eyhoZWFkZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faGVhZGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1ib3hcIj5cbiAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3RcIlxuICAgICAgICAgICAgICByZWY9eyhsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgc3R5bGU9e2hlaWdodCA/IHsgaGVpZ2h0IH0gOiB7fX1cbiAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lcygpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBuZXdEYXRlIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5cbmNvbnN0IFZFUlRJQ0FMX05BVklHQVRJT05fT0ZGU0VUID0gMztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xlYXJTZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIFlFQVJfUkVGUyA9IFsuLi5BcnJheSh0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyKV0ubWFwKCgpID0+XG4gICAgUmVhY3QuY3JlYXRlUmVmKCksXG4gICk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBzZWxlY3RpbmdEYXRlID0gKCkgPT4gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gIHVwZGF0ZUZvY3VzT25QYWdpbmF0ZSA9IChyZWZJbmRleCkgPT4ge1xuICAgIGNvbnN0IHdhaXRGb3JSZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuWUVBUl9SRUZTW3JlZkluZGV4XS5jdXJyZW50LmZvY3VzKCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh3YWl0Rm9yUmVSZW5kZXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVZZWFyTmF2aWdhdGlvbiA9IChuZXdZZWFyLCBuZXdEYXRlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChkYXRlLCB5ZWFySXRlbU51bWJlcik7XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuXG4gICAgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA8IDApIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKHllYXJJdGVtTnVtYmVyIC0gKHN0YXJ0UGVyaW9kIC0gbmV3WWVhcikpO1xuICAgIH0gZWxzZSBpZiAobmV3WWVhciAtIHN0YXJ0UGVyaW9kID49IHllYXJJdGVtTnVtYmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZShcbiAgICAgICAgTWF0aC5hYnMoeWVhckl0ZW1OdW1iZXIgLSAobmV3WWVhciAtIHN0YXJ0UGVyaW9kKSksXG4gICAgICApO1xuICAgIH0gZWxzZSB0aGlzLllFQVJfUkVGU1tuZXdZZWFyIC0gc3RhcnRQZXJpb2RdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBpc1NhbWVEYXkgPSAoeSwgb3RoZXIpID0+IHV0aWxzLmlzU2FtZURheSh5LCBvdGhlcik7XG5cbiAgaXNDdXJyZW50WWVhciA9ICh5KSA9PiB5ID09PSBnZXRZZWFyKG5ld0RhdGUoKSk7XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5zdGFydERhdGUpO1xuXG4gIGlzUmFuZ2VFbmQgPSAoeSkgPT5cbiAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSAmJlxuICAgIHRoaXMucHJvcHMuZW5kRGF0ZSAmJlxuICAgIHV0aWxzLmlzU2FtZVllYXIodXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5SYW5nZSA9ICh5KSA9PlxuICAgIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5wcm9wcy5zdGFydERhdGUsIHRoaXMucHJvcHMuZW5kRGF0ZSk7XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKHkpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhdGhpcy5zZWxlY3RpbmdEYXRlKClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCB0aGlzLnNlbGVjdGluZ0RhdGUoKSwgZW5kRGF0ZSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzUmFuZ2UgJiYgc3RhcnREYXRlICYmICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCBzdGFydERhdGUsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX3llYXIgPSB1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSk7XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlRW5kID0gKHkpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBlbmREYXRlLCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX3llYXIgPSB1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSk7XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoeSkgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSB1dGlscy5nZXRTdGFydE9mWWVhcih1dGlscy5zZXRZZWFyKHRoaXMucHJvcHMuZGF0ZSwgeSkpO1xuICAgIHJldHVybiAoXG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgIXRoaXMucHJvcHMuaW5saW5lICYmXG4gICAgICAhdXRpbHMuaXNTYW1lRGF5KGRhdGUsIHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHRoaXMucHJvcHMuc2VsZWN0ZWQpKSAmJlxuICAgICAgdXRpbHMuaXNTYW1lRGF5KGRhdGUsIHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKSlcbiAgICApO1xuICB9O1xuXG4gIG9uWWVhckNsaWNrID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGRhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5oYW5kbGVZZWFyQ2xpY2sodXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcihkYXRlLCB5KSksIGUpO1xuICB9O1xuXG4gIG9uWWVhcktleURvd24gPSAoZSwgeSkgPT4ge1xuICAgIGNvbnN0IHsga2V5IH0gPSBlO1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIsIGhhbmRsZU9uS2V5RG93biB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChrZXkgIT09IFwiVGFiXCIpIHtcbiAgICAgIC8vIHByZXZlbnREZWZhdWx0IG9uIHRhYiBldmVudCBibG9ja3MgZm9jdXMgY2hhbmdlXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGUsIHkpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5ICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHkgLSAxLFxuICAgICAgICAgICAgdXRpbHMuc3ViWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6IHtcbiAgICAgICAgICBjb25zdCB7IHN0YXJ0UGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChkYXRlLCB5ZWFySXRlbU51bWJlcik7XG4gICAgICAgICAgbGV0IG9mZnNldCA9IFZFUlRJQ0FMX05BVklHQVRJT05fT0ZGU0VUO1xuICAgICAgICAgIGxldCBuZXdZZWFyID0geSAtIG9mZnNldDtcblxuICAgICAgICAgIGlmIChuZXdZZWFyIDwgc3RhcnRQZXJpb2QpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRPdmVyT2Zmc2V0ID0geWVhckl0ZW1OdW1iZXIgJSBvZmZzZXQ7XG5cbiAgICAgICAgICAgIGlmICh5ID49IHN0YXJ0UGVyaW9kICYmIHkgPCBzdGFydFBlcmlvZCArIGxlZnRPdmVyT2Zmc2V0KSB7XG4gICAgICAgICAgICAgIG9mZnNldCA9IGxlZnRPdmVyT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb2Zmc2V0ICs9IGxlZnRPdmVyT2Zmc2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdZZWFyID0geSAtIG9mZnNldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbmV3WWVhcixcbiAgICAgICAgICAgIHV0aWxzLnN1YlllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCBvZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOiB7XG4gICAgICAgICAgY29uc3QgeyBlbmRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKGRhdGUsIHllYXJJdGVtTnVtYmVyKTtcbiAgICAgICAgICBsZXQgb2Zmc2V0ID0gVkVSVElDQUxfTkFWSUdBVElPTl9PRkZTRVQ7XG4gICAgICAgICAgbGV0IG5ld1llYXIgPSB5ICsgb2Zmc2V0O1xuXG4gICAgICAgICAgaWYgKG5ld1llYXIgPiBlbmRQZXJpb2QpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRPdmVyT2Zmc2V0ID0geWVhckl0ZW1OdW1iZXIgJSBvZmZzZXQ7XG5cbiAgICAgICAgICAgIGlmICh5IDw9IGVuZFBlcmlvZCAmJiB5ID4gZW5kUGVyaW9kIC0gbGVmdE92ZXJPZmZzZXQpIHtcbiAgICAgICAgICAgICAgb2Zmc2V0ID0gbGVmdE92ZXJPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvZmZzZXQgKz0gbGVmdE92ZXJPZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1llYXIgPSB5ICsgb2Zmc2V0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICBuZXdZZWFyLFxuICAgICAgICAgICAgdXRpbHMuYWRkWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIG9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5RG93biAmJiBoYW5kbGVPbktleURvd24oZSk7XG4gIH07XG5cbiAgZ2V0WWVhckNsYXNzTmFtZXMgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGUsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgICAgZmlsdGVyRGF0ZSxcbiAgICAgIHllYXJDbGFzc05hbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci0ke3l9YCxcbiAgICAgIHllYXJDbGFzc05hbWUgPyB5ZWFyQ2xhc3NOYW1lKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpIDogdW5kZWZpbmVkLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0ZWRcIjogeSA9PT0gZ2V0WWVhcihzZWxlY3RlZCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcyB8fCBmaWx0ZXJEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzWWVhckRpc2FibGVkKHksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0KHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0taW4tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudFllYXIoeSksXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgZ2V0WWVhclRhYkluZGV4ID0gKHkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikgcmV0dXJuIFwiLTFcIjtcbiAgICBjb25zdCBwcmVTZWxlY3RlZCA9IHV0aWxzLmdldFllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHkgPT09IHByZVNlbGVjdGVkID8gXCIwXCIgOiBcIi0xXCI7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RpbmdEYXRlLCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsc3goXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyXCIsIHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSksXG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0WWVhckNvbnRlbnQgPSAoeSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50ID8gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCh5KSA6IHk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHllYXJzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIsIG9uWWVhck1vdXNlRW50ZXIsIG9uWWVhck1vdXNlTGVhdmUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBkYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcblxuICAgIGZvciAobGV0IHkgPSBzdGFydFBlcmlvZDsgeSA8PSBlbmRQZXJpb2Q7IHkrKykge1xuICAgICAgeWVhcnNMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3RoaXMuWUVBUl9SRUZTW3kgLSBzdGFydFBlcmlvZF19XG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uWWVhckNsaWNrKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGV2LmtleSA9IFwiRW50ZXJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblllYXJLZXlEb3duKGV2LCB5KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFllYXJUYWJJbmRleCh5KX1cbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNsYXNzTmFtZXMoeSl9XG4gICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e3l9XG4gICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudFllYXIoeSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLmdldFllYXJDb250ZW50KHkpfVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcygpfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItd3JhcHBlclwiXG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICB7eWVhcnNMaXN0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW5wdXRUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdGltZVN0cmluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpbWU6IHRoaXMucHJvcHMudGltZVN0cmluZyxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICBpZiAocHJvcHMudGltZVN0cmluZyAhPT0gc3RhdGUudGltZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGltZTogcHJvcHMudGltZVN0cmluZyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIG51bGwgdG8gaW5kaWNhdGUgbm8gY2hhbmdlIHRvIHN0YXRlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25UaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdGltZSB9KTtcblxuICAgIGNvbnN0IHsgZGF0ZTogcHJvcERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNQcm9wRGF0ZVZhbGlkID0gcHJvcERhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihwcm9wRGF0ZSk7XG4gICAgY29uc3QgZGF0ZSA9IGlzUHJvcERhdGVWYWxpZCA/IHByb3BEYXRlIDogbmV3IERhdGUoKTtcblxuICAgIGRhdGUuc2V0SG91cnModGltZS5zcGxpdChcIjpcIilbMF0pO1xuICAgIGRhdGUuc2V0TWludXRlcyh0aW1lLnNwbGl0KFwiOlwiKVsxXSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGRhdGUpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkYXRlLCB0aW1lU3RyaW5nLCBjdXN0b21UaW1lSW5wdXQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY3VzdG9tVGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbVRpbWVJbnB1dCwge1xuICAgICAgICBkYXRlLFxuICAgICAgICB2YWx1ZTogdGltZSxcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMub25UaW1lQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGltZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlRpbWVcIlxuICAgICAgICBuYW1lPVwidGltZS1pbnB1dFwiXG4gICAgICAgIHJlcXVpcmVkXG4gICAgICAgIHZhbHVlPXt0aW1lfVxuICAgICAgICBvbkNoYW5nZT17KGV2KSA9PiB7XG4gICAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoZXYudGFyZ2V0LnZhbHVlIHx8IHRpbWVTdHJpbmcpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19pbnB1dC10aW1lLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9fY2FwdGlvblwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZUlucHV0KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhckNvbnRhaW5lcih7XG4gIHNob3dUaW1lU2VsZWN0T25seSA9IGZhbHNlLFxuICBzaG93VGltZSA9IGZhbHNlLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufSkge1xuICBsZXQgYXJpYUxhYmVsID0gc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgPyBcIkNob29zZSBUaW1lXCJcbiAgICA6IGBDaG9vc2UgRGF0ZSR7c2hvd1RpbWUgPyBcIiBhbmQgVGltZVwiIDogXCJcIn1gO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkNhbGVuZGFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd1RpbWU6IFByb3BUeXBlcy5ib29sLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbn07XG4iLCJpbXBvcnQgWWVhckRyb3Bkb3duIGZyb20gXCIuL3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aERyb3Bkb3duIGZyb20gXCIuL21vbnRoX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoIGZyb20gXCIuL21vbnRoXCI7XG5pbXBvcnQgVGltZSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgWWVhciBmcm9tIFwiLi95ZWFyXCI7XG5pbXBvcnQgSW5wdXRUaW1lIGZyb20gXCIuL2lucHV0VGltZVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgQ2FsZW5kYXJDb250YWluZXIgZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBzZXRNb250aCxcbiAgZ2V0TW9udGgsXG4gIGFkZE1vbnRocyxcbiAgc3ViTW9udGhzLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0U3RhcnRPZlRvZGF5LFxuICBhZGREYXlzLFxuICBmb3JtYXREYXRlLFxuICBzZXRZZWFyLFxuICBnZXRZZWFyLFxuICBpc0JlZm9yZSxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0FmdGVyLFxuICBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUsXG4gIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlLFxuICBnZXRXZWVrZGF5TWluSW5Mb2NhbGUsXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIG1vbnRoRGlzYWJsZWRCZWZvcmUsXG4gIG1vbnRoRGlzYWJsZWRBZnRlcixcbiAgeWVhckRpc2FibGVkQmVmb3JlLFxuICB5ZWFyRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEFmdGVyLFxuICB5ZWFyc0Rpc2FibGVkQmVmb3JlLFxuICBxdWFydGVyRGlzYWJsZWRCZWZvcmUsXG4gIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBhZGRaZXJvLFxuICBpc1ZhbGlkLFxuICBnZXRZZWFyc1BlcmlvZCxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBnZXRNb250aEluTG9jYWxlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMgPSBbXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1zZWxlY3RcIixcbiAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiLFxuXTtcblxuY29uc3QgaXNEcm9wZG93blNlbGVjdCA9IChlbGVtZW50ID0ge30pID0+IHtcbiAgY29uc3QgY2xhc3NOYW1lcyA9IChlbGVtZW50LmNsYXNzTmFtZSB8fCBcIlwiKS5zcGxpdCgvXFxzKy8pO1xuICByZXR1cm4gRFJPUERPV05fRk9DVVNfQ0xBU1NOQU1FUy5zb21lKFxuICAgICh0ZXN0Q2xhc3NuYW1lKSA9PiBjbGFzc05hbWVzLmluZGV4T2YodGVzdENsYXNzbmFtZSkgPj0gMCxcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uRHJvcGRvd25Gb2N1czogKCkgPT4ge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKVxuICAgICAgLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKSxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtb250aFNlbGVjdGVkSW46IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRyb3Bkb3duRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uVGltZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uRGF5S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5jb250YWluZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRlOiB0aGlzLmdldERhdGVJblZpZXcoKSxcbiAgICAgIHNlbGVjdGluZ0RhdGU6IG51bGwsXG4gICAgICBtb250aENvbnRhaW5lcjogbnVsbCxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gbW9udGhDb250YWluZXIgaGVpZ2h0IGlzIG5lZWRlZCBpbiB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHRvIGRldGVybWluZSB0aGUgaGVpZ2h0IGZvciB0aGUgdWwgaW4gdGhlIHRpbWUgY29tcG9uZW50XG4gICAgLy8gc2V0U3RhdGUgaGVyZSBzbyBoZWlnaHQgaXMgZ2l2ZW4gYWZ0ZXIgZmluYWwgY29tcG9uZW50XG4gICAgLy8gbGF5b3V0IGlzIHJlbmRlcmVkXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuYXNzaWduTW9udGhDb250YWluZXIgPSAoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhDb250YWluZXI6IHRoaXMubW9udGhDb250YWluZXIgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbiAmJlxuICAgICAgKCFpc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIHByZXZQcm9wcy5wcmVTZWxlY3Rpb24pIHx8XG4gICAgICAgIHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluICE9PSBwcmV2UHJvcHMubW9udGhTZWxlY3RlZEluKVxuICAgICkge1xuICAgICAgY29uc3QgaGFzTW9udGhDaGFuZ2VkID0gIWlzU2FtZU1vbnRoKFxuICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gaGFzTW9udGhDaGFuZ2VkICYmIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZSAmJlxuICAgICAgIWlzU2FtZURheSh0aGlzLnByb3BzLm9wZW5Ub0RhdGUsIHByZXZQcm9wcy5vcGVuVG9EYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGU6IHRoaXMucHJvcHMub3BlblRvRGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICB9O1xuXG4gIHNldENsaWNrT3V0c2lkZVJlZiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGlzRHJvcGRvd25TZWxlY3QoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0ZUluVmlldyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByZVNlbGVjdGlvbiwgc2VsZWN0ZWQsIG9wZW5Ub0RhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld0RhdGUoKTtcbiAgICBjb25zdCBpbml0aWFsRGF0ZSA9IG9wZW5Ub0RhdGUgfHwgc2VsZWN0ZWQgfHwgcHJlU2VsZWN0aW9uO1xuICAgIGlmIChpbml0aWFsRGF0ZSkge1xuICAgICAgcmV0dXJuIGluaXRpYWxEYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWluRGF0ZSAmJiBpc0JlZm9yZShjdXJyZW50LCBtaW5EYXRlKSkge1xuICAgICAgICByZXR1cm4gbWluRGF0ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBpc0FmdGVyKGN1cnJlbnQsIG1heERhdGUpKSB7XG4gICAgICAgIHJldHVybiBtYXhEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfTtcblxuICBpbmNyZWFzZU1vbnRoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZE1vbnRocyhkYXRlLCAxKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgZGVjcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZGF5LCBldmVudCwgbW9udGhTZWxlY3RlZEluKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IGRheSB9KTtcbiAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlciAmJiB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgICB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25Nb250aE1vdXNlTGVhdmUoKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VFbnRlciA9IChldmVudCwgeWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBzZXRZZWFyKG5ld0RhdGUoKSwgeWVhcikgfSk7XG4gICAgISF0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyKGV2ZW50LCB5ZWFyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyTW91c2VMZWF2ZSA9IChldmVudCwgeWVhcikgPT4ge1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUxlYXZlICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZShldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25ZZWFyQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uWWVhckNoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc2V0T3Blbikge1xuICAgICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gIH07XG5cbiAgaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb250aENoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW9udGhZZWFyQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgdGhpcy5oYW5kbGVNb250aENoYW5nZShkYXRlKTtcbiAgfTtcblxuICBjaGFuZ2VZZWFyID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzZXRZZWFyKGRhdGUsIHllYXIpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNoYW5nZU1vbnRoID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0TW9udGgoZGF0ZSwgbW9udGgpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aFllYXIgPSAobW9udGhZZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihzZXRNb250aChkYXRlLCBnZXRNb250aChtb250aFllYXIpKSwgZ2V0WWVhcihtb250aFllYXIpKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aFllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGhlYWRlciA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRPZldlZWsgPSBnZXRTdGFydE9mV2VlayhcbiAgICAgIGRhdGUsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3QgZGF5TmFtZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnMpIHtcbiAgICAgIGRheU5hbWVzLnB1c2goXG4gICAgICAgIDxkaXYga2V5PVwiV1wiIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMud2Vla0xhYmVsIHx8IFwiI1wifVxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5TmFtZXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIGNvbnN0IHdlZWtEYXlOYW1lID0gdGhpcy5mb3JtYXRXZWVrZGF5KGRheSwgdGhpcy5wcm9wcy5sb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IHdlZWtEYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWVcbiAgICAgICAgICA/IHRoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZShkYXkpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e29mZnNldH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2Zvcm1hdERhdGUoZGF5LCBcIkVFRUVcIiwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVcIiwgd2Vla0RheUNsYXNzTmFtZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3dlZWtEYXlOYW1lfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBmb3JtYXRXZWVrZGF5ID0gKGRheSwgbG9jYWxlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSkge1xuICAgICAgcmV0dXJuIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZShkYXksIHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSwgbG9jYWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydFxuICAgICAgPyBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZShkYXksIGxvY2FsZSlcbiAgICAgIDogZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRheSwgbG9jYWxlKTtcbiAgfTtcblxuICBkZWNyZWFzZVllYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViWWVhcnMoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyID8gdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlciA6IDEsXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2xlYXJTZWxlY3RpbmdEYXRlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBudWxsIH0pO1xuICB9O1xuXG4gIHJlbmRlclByZXZpb3VzQnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxQcmV2RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyc0Rpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHF1YXJ0ZXJEaXNhYmxlZEJlZm9yZShcbiAgICAgICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpY29uQ2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91c1wiLFxuICAgIF07XG5cbiAgICBsZXQgY2xpY2tIYW5kbGVyID0gdGhpcy5kZWNyZWFzZU1vbnRoO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlclxuICAgICkge1xuICAgICAgY2xpY2tIYW5kbGVyID0gdGhpcy5kZWNyZWFzZVllYXI7XG4gICAgfVxuXG4gICAgaWYgKGFsbFByZXZEYXlzRGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXByZXZpb3VzLS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IHByZXZpb3VzTW9udGhCdXR0b25MYWJlbCwgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7XG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsID0gdHlwZW9mIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHByZXZpb3VzTW9udGhCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c1llYXJCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IHByZXZpb3VzWWVhckFyaWFMYWJlbCA6IHByZXZpb3VzTW9udGhBcmlhTGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICAgIHtpc0ZvclllYXJcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5wcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnByZXZpb3VzTW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICBpbmNyZWFzZVllYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogYWRkWWVhcnMoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyID8gdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlciA6IDEsXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTmV4dEJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYWxsTmV4dERheXNEaXNhYmxlZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhckRpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSB5ZWFyc0Rpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0gcXVhcnRlckRpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICghdGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgIXRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dFwiLFxuICAgIF07XG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLW5leHRcIixcbiAgICBdO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS13aXRoLXRpbWVcIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnRvZGF5QnV0dG9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS13aXRoLXRvZGF5LWJ1dHRvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgY2xpY2tIYW5kbGVyID0gdGhpcy5pbmNyZWFzZU1vbnRoO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlclxuICAgICkge1xuICAgICAgY2xpY2tIYW5kbGVyID0gdGhpcy5pbmNyZWFzZVllYXI7XG4gICAgfVxuXG4gICAgaWYgKGFsbE5leHREYXlzRGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLWRpc2FibGVkXCIpO1xuICAgICAgY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvclllYXIgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIGNvbnN0IHsgbmV4dE1vbnRoQnV0dG9uTGFiZWwsIG5leHRZZWFyQnV0dG9uTGFiZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsID0gdHlwZW9mIG5leHRNb250aEJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dE1vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIk5leHQgTW9udGhcIixcbiAgICAgIG5leHRZZWFyQXJpYUxhYmVsID0gdHlwZW9mIG5leHRZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBuZXh0WWVhckJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IFllYXJcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9XG4gICAgICAgIG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNGb3JZZWFyID8gbmV4dFllYXJBcmlhTGFiZWwgOiBuZXh0TW9udGhBcmlhTGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICAgIHtpc0ZvclllYXJcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5uZXh0WWVhckJ1dHRvbkxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMubmV4dE1vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ3VycmVudE1vbnRoID0gKGRhdGUgPSB0aGlzLnN0YXRlLmRhdGUpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gW1wicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aFwiXTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc1llYXJEcm9wZG93blwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzTW9udGhZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgIHtmb3JtYXREYXRlKGRhdGUsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxZZWFyRHJvcGRvd25cbiAgICAgICAgYWRqdXN0RGF0ZU9uQ2hhbmdlPXt0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgeWVhcj17Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfVxuICAgICAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVZZWFyRHJvcGRvd259XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJNb250aERyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoRHJvcGRvd25cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGh9XG4gICAgICAgIG1vbnRoPXtnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpfVxuICAgICAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bj17dGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93bn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJNb250aFllYXJEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TW9udGhZZWFyRHJvcGRvd25cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aFllYXJ9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgaGFuZGxlVG9kYXlCdXR0b25DbGljayA9IChlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChnZXRTdGFydE9mVG9kYXkoKSwgZSk7XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZ2V0U3RhcnRPZlRvZGF5KCkpO1xuICB9O1xuXG4gIHJlbmRlclRvZGF5QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy50b2RheUJ1dHRvbiB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190b2RheS1idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVUb2RheUJ1dHRvbkNsaWNrKGUpfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGVmYXVsdEhlYWRlciA9ICh7IG1vbnRoRGF0ZSwgaSB9KSA9PiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyICR7XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RcbiAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS1oYXMtdGltZS1zZWxlY3RcIlxuICAgICAgICAgIDogXCJcIlxuICAgICAgfWB9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyQ3VycmVudE1vbnRoKG1vbnRoRGF0ZSl9XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24gcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyX19kcm9wZG93bi0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZURyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlck1vbnRoRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICAgIHt0aGlzLnJlbmRlck1vbnRoWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJZZWFyRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgIHt0aGlzLmhlYWRlcihtb250aERhdGUpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyQ3VzdG9tSGVhZGVyID0gKGhlYWRlckFyZ3MgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHsgbW9udGhEYXRlLCBpIH0gPSBoZWFkZXJBcmdzO1xuXG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiYgIXRoaXMuc3RhdGUubW9udGhDb250YWluZXIpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldk1vbnRoQnV0dG9uRGlzYWJsZWQgPSBtb250aERpc2FibGVkQmVmb3JlKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgbmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQgPSBtb250aERpc2FibGVkQWZ0ZXIoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBwcmV2WWVhckJ1dHRvbkRpc2FibGVkID0geWVhckRpc2FibGVkQmVmb3JlKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgbmV4dFllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3Qgc2hvd0RheU5hbWVzID1cbiAgICAgICF0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciAmJlxuICAgICAgIXRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyLS1jdXN0b21cIlxuICAgICAgICBvbkZvY3VzPXt0aGlzLnByb3BzLm9uRHJvcGRvd25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIGN1c3RvbUhlYWRlckNvdW50OiBpLFxuICAgICAgICAgIG1vbnRoRGF0ZSxcbiAgICAgICAgICBjaGFuZ2VNb250aDogdGhpcy5jaGFuZ2VNb250aCxcbiAgICAgICAgICBjaGFuZ2VZZWFyOiB0aGlzLmNoYW5nZVllYXIsXG4gICAgICAgICAgZGVjcmVhc2VNb250aDogdGhpcy5kZWNyZWFzZU1vbnRoLFxuICAgICAgICAgIGluY3JlYXNlTW9udGg6IHRoaXMuaW5jcmVhc2VNb250aCxcbiAgICAgICAgICBkZWNyZWFzZVllYXI6IHRoaXMuZGVjcmVhc2VZZWFyLFxuICAgICAgICAgIGluY3JlYXNlWWVhcjogdGhpcy5pbmNyZWFzZVllYXIsXG4gICAgICAgICAgcHJldk1vbnRoQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgcHJldlllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBuZXh0WWVhckJ1dHRvbkRpc2FibGVkLFxuICAgICAgICB9KX1cbiAgICAgICAge3Nob3dEYXlOYW1lcyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZXNcIj5cbiAgICAgICAgICAgIHt0aGlzLmhlYWRlcihtb250aERhdGUpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJZZWFySGVhZGVyID0gKHsgbW9udGhEYXRlIH0pID0+IHtcbiAgICBjb25zdCB7IHNob3dZZWFyUGlja2VyLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgbW9udGhEYXRlLFxuICAgICAgeWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgcmVhY3QtZGF0ZXBpY2tlci15ZWFyLWhlYWRlclwiPlxuICAgICAgICB7c2hvd1llYXJQaWNrZXIgPyBgJHtzdGFydFBlcmlvZH0gLSAke2VuZFBlcmlvZH1gIDogZ2V0WWVhcihtb250aERhdGUpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXIgPSAoaGVhZGVyQXJncykgPT4ge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlciAhPT0gdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDdXN0b21IZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJZZWFySGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGVmYXVsdEhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyTW9udGhzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSB8fCB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW9udGhMaXN0ID0gW107XG4gICAgY29uc3QgbW9udGhzVG9TdWJ0cmFjdCA9IHRoaXMucHJvcHMuc2hvd1ByZXZpb3VzTW9udGhzXG4gICAgICA/IHRoaXMucHJvcHMubW9udGhzU2hvd24gLSAxXG4gICAgICA6IDA7XG4gICAgY29uc3QgZnJvbU1vbnRoRGF0ZSA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgPyBhZGRZZWFycyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpXG4gICAgICAgIDogc3ViTW9udGhzKHRoaXMuc3RhdGUuZGF0ZSwgbW9udGhzVG9TdWJ0cmFjdCk7XG4gICAgY29uc3QgbW9udGhTZWxlY3RlZEluID0gdGhpcy5wcm9wcy5tb250aFNlbGVjdGVkSW4gPz8gbW9udGhzVG9TdWJ0cmFjdDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubW9udGhzU2hvd247ICsraSkge1xuICAgICAgY29uc3QgbW9udGhzVG9BZGQgPSBpIC0gbW9udGhTZWxlY3RlZEluICsgbW9udGhzVG9TdWJ0cmFjdDtcbiAgICAgIGNvbnN0IG1vbnRoRGF0ZSA9XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fCB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgID8gYWRkWWVhcnMoZnJvbU1vbnRoRGF0ZSwgbW9udGhzVG9BZGQpXG4gICAgICAgICAgOiBhZGRNb250aHMoZnJvbU1vbnRoRGF0ZSwgbW9udGhzVG9BZGQpO1xuICAgICAgY29uc3QgbW9udGhLZXkgPSBgbW9udGgtJHtpfWA7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCA9IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMTtcbiAgICAgIGNvbnN0IG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgPSBpID4gMDtcbiAgICAgIG1vbnRoTGlzdC5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXttb250aEtleX1cbiAgICAgICAgICByZWY9eyhkaXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9udGhDb250YWluZXIgPSBkaXY7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC1jb250YWluZXJcIlxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKHsgbW9udGhEYXRlLCBpIH0pfVxuICAgICAgICAgIDxNb250aFxuICAgICAgICAgICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgd2Vla0FyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICAgICAgZGF5PXttb250aERhdGV9XG4gICAgICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uRGF5S2V5RG93bn1cbiAgICAgICAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb250aE1vdXNlTGVhdmV9XG4gICAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgICAgb3JkZXJJbkRpc3BsYXk9e2l9XG4gICAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgICBob2xpZGF5cz17dGhpcy5wcm9wcy5ob2xpZGF5c31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIGZpeGVkSGVpZ2h0PXt0aGlzLnByb3BzLmZpeGVkSGVpZ2h0fVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXJzPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgICBwZWVrTmV4dE1vbnRoPXt0aGlzLnByb3BzLnBlZWtOZXh0TW9udGh9XG4gICAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIHJlbmRlck1vbnRoQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJNb250aENvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgICAgIHJlbmRlclllYXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50fVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBzaG93TW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXttb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBtb250aExpc3Q7XG4gIH07XG5cbiAgcmVuZGVyWWVhcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3llYXItLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZTogdGhpcy5zdGF0ZS5kYXRlIH0pfVxuICAgICAgICAgIDxZZWFyXG4gICAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5zdGF0ZS5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgY2xlYXJTZWxlY3RpbmdEYXRlPXt0aGlzLmNsZWFyU2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgb25ZZWFyTW91c2VFbnRlcj17dGhpcy5oYW5kbGVZZWFyTW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlWWVhck1vdXNlTGVhdmV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJUaW1lU2VjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmXG4gICAgICAodGhpcy5zdGF0ZS5tb250aENvbnRhaW5lciB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSlcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaW1lXG4gICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgb3BlblRvRGF0ZT17dGhpcy5wcm9wcy5vcGVuVG9EYXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVGltZUNoYW5nZX1cbiAgICAgICAgICB0aW1lQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRpbWVDbGFzc05hbWV9XG4gICAgICAgICAgZm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9XG4gICAgICAgICAgaW5jbHVkZVRpbWVzPXt0aGlzLnByb3BzLmluY2x1ZGVUaW1lc31cbiAgICAgICAgICBpbnRlcnZhbHM9e3RoaXMucHJvcHMudGltZUludGVydmFsc31cbiAgICAgICAgICBtaW5UaW1lPXt0aGlzLnByb3BzLm1pblRpbWV9XG4gICAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICAgIGV4Y2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5leGNsdWRlVGltZXN9XG4gICAgICAgICAgZmlsdGVyVGltZT17dGhpcy5wcm9wcy5maWx0ZXJUaW1lfVxuICAgICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgIHRvZGF5QnV0dG9uPXt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgICAgIHNob3dNb250aERyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3dufVxuICAgICAgICAgIHNob3dNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd259XG4gICAgICAgICAgc2hvd1llYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3dufVxuICAgICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgICBtb250aFJlZj17dGhpcy5zdGF0ZS5tb250aENvbnRhaW5lcn1cbiAgICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcklucHV0VGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIGNvbnN0IHRpbWVWYWxpZCA9IGlzVmFsaWQodGltZSkgJiYgQm9vbGVhbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lU3RyaW5nID0gdGltZVZhbGlkXG4gICAgICA/IGAke2FkZFplcm8odGltZS5nZXRIb3VycygpKX06JHthZGRaZXJvKHRpbWUuZ2V0TWludXRlcygpKX1gXG4gICAgICA6IFwiXCI7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPElucHV0VGltZVxuICAgICAgICAgIGRhdGU9e3RpbWV9XG4gICAgICAgICAgdGltZVN0cmluZz17dGltZVN0cmluZ31cbiAgICAgICAgICB0aW1lSW5wdXRMYWJlbD17dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgY3VzdG9tVGltZUlucHV0PXt0aGlzLnByb3BzLmN1c3RvbVRpbWVJbnB1dH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgbGV0IGFyaWFMaXZlTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtzdGFydFBlcmlvZH0gLSAke2VuZFBlcmlvZH1gO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGAke2dldE1vbnRoSW5Mb2NhbGUoXG4gICAgICAgIGdldE1vbnRoKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgKX0gJHtnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fYXJpYS1saXZlXCJcbiAgICAgID5cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgYXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ2hpbGRyZW4gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fY2hpbGRyZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IENvbnRhaW5lciA9IHRoaXMucHJvcHMuY29udGFpbmVyIHx8IENhbGVuZGFyQ29udGFpbmVyO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6IFwiY29udGVudHNcIiB9fSByZWY9e3RoaXMuY29udGFpbmVyUmVmfT5cbiAgICAgICAgPENvbnRhaW5lclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcInJlYWN0LWRhdGVwaWNrZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlci0tdGltZS1vbmx5XCI6IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5LFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIHNob3dUaW1lPXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQXJpYUxpdmVSZWdpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJQcmV2aW91c0J1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck5leHRCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJNb250aHMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJZZWFycygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRvZGF5QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyVGltZVNlY3Rpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dFRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyQ2hpbGRyZW4oKX1cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmNvbnN0IENhbGVuZGFySWNvbiA9ICh7IGljb24sIGNsYXNzTmFtZSA9IFwiXCIsIG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBkZWZhdWx0Q2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2NhbGVuZGFyLWljb25cIjtcblxuICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoaWNvbikpIHtcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGljb24sIHtcbiAgICAgIGNsYXNzTmFtZTogYCR7aWNvbi5wcm9wcy5jbGFzc05hbWUgfHwgXCJcIn0gJHtkZWZhdWx0Q2xhc3N9ICR7Y2xhc3NOYW1lfWAsXG4gICAgICBvbkNsaWNrOiAoZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGljb24ucHJvcHMub25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWNvbi5wcm9wcy5vbkNsaWNrKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBvbkNsaWNrKGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpY29uID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpXG4gICAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2ljb259ICR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICAvLyBEZWZhdWx0IFNWRyBJY29uXG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgY2xhc3NOYW1lPXtgJHtkZWZhdWx0Q2xhc3N9ICR7Y2xhc3NOYW1lfWB9XG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgID5cbiAgICAgIDxwYXRoIGQ9XCJNOTYgMzJWNjRINDhDMjEuNSA2NCAwIDg1LjUgMCAxMTJ2NDhINDQ4VjExMmMwLTI2LjUtMjEuNS00OC00OC00OEgzNTJWMzJjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJWNjRIMTYwVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMyUzk2IDE0LjMgOTYgMzJ6TTQ0OCAxOTJIMFY0NjRjMCAyNi41IDIxLjUgNDggNDggNDhINDAwYzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjE5MnpcIiAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuQ2FsZW5kYXJJY29uLnByb3BUeXBlcyA9IHtcbiAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhbGVuZGFySWNvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5hbnksXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvcnRhbFJvb3QgPSAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50KS5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRoaXMucHJvcHMucG9ydGFsSWQsXG4gICAgKTtcbiAgICBpZiAoIXRoaXMucG9ydGFsUm9vdCkge1xuICAgICAgdGhpcy5wb3J0YWxSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMucG9ydGFsUm9vdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0aGlzLnByb3BzLnBvcnRhbElkKTtcbiAgICAgICh0aGlzLnByb3BzLnBvcnRhbEhvc3QgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQodGhpcy5wb3J0YWxSb290KTtcbiAgICB9XG4gICAgdGhpcy5wb3J0YWxSb290LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290LnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwodGhpcy5wcm9wcy5jaGlsZHJlbiwgdGhpcy5lbCk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuLy8gVGFiTG9vcCBwcmV2ZW50cyB0aGUgdXNlciBmcm9tIHRhYmJpbmcgb3V0c2lkZSBvZiB0aGUgcG9wcGVyXG4vLyBJdCBjcmVhdGVzIGEgdGFiaW5kZXggbG9vcCBzbyB0aGF0IFwiVGFiXCIgb24gdGhlIGxhc3QgZWxlbWVudCB3aWxsIGZvY3VzIHRoZSBmaXJzdCBlbGVtZW50XG4vLyBhbmQgXCJTaGlmdCBUYWJcIiBvbiB0aGUgZmlyc3QgZWxlbWVudCB3aWxsIGZvY3VzIHRoZSBsYXN0IGVsZW1lbnRcblxuY29uc3QgZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciA9XG4gIFwiW3RhYmluZGV4XSwgYSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYVwiO1xuY29uc3QgZm9jdXNhYmxlRmlsdGVyID0gKG5vZGUpID0+ICFub2RlLmRpc2FibGVkICYmIG5vZGUudGFiSW5kZXggIT09IC0xO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJMb29wIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVuYWJsZVRhYkxvb3A6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5hbnksXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnRhYkxvb3BSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgfVxuXG4gIC8vIHF1ZXJ5IGFsbCBmb2N1c2FibGUgZWxlbWVudHNcbiAgLy8gdHJpbSBmaXJzdCBhbmQgbGFzdCBiZWNhdXNlIHRoZXkgYXJlIHRoZSBmb2N1cyBndWFyZHNcbiAgZ2V0VGFiQ2hpbGRyZW4gPSAoKSA9PlxuICAgIEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgLmNhbGwoXG4gICAgICAgIHRoaXMudGFiTG9vcFJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciksXG4gICAgICAgIDEsXG4gICAgICAgIC0xLFxuICAgICAgKVxuICAgICAgLmZpbHRlcihmb2N1c2FibGVGaWx0ZXIpO1xuXG4gIGhhbmRsZUZvY3VzU3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFiQ2hpbGRyZW4gPSB0aGlzLmdldFRhYkNoaWxkcmVuKCk7XG4gICAgdGFiQ2hpbGRyZW4gJiZcbiAgICAgIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiZcbiAgICAgIHRhYkNoaWxkcmVuW3RhYkNoaWxkcmVuLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gIH07XG5cbiAgaGFuZGxlRm9jdXNFbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFiQ2hpbGRyZW4gPSB0aGlzLmdldFRhYkNoaWxkcmVuKCk7XG4gICAgdGFiQ2hpbGRyZW4gJiYgdGFiQ2hpbGRyZW4ubGVuZ3RoID4gMSAmJiB0YWJDaGlsZHJlblswXS5mb2N1cygpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZW5hYmxlVGFiTG9vcCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wXCIgcmVmPXt0aGlzLnRhYkxvb3BSZWZ9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX3N0YXJ0XCJcbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXNTdGFydH1cbiAgICAgICAgLz5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcF9fZW5kXCJcbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXNFbmR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICB1c2VGbG9hdGluZyxcbiAgYXJyb3csXG4gIG9mZnNldCxcbiAgZmxpcCxcbiAgYXV0b1VwZGF0ZSxcbn0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgcG9wcGVyUGxhY2VtZW50UG9zaXRpb25zID0gW1xuICBcInRvcC1zdGFydFwiLFxuICBcInRvcC1lbmRcIixcbiAgXCJib3R0b20tc3RhcnRcIixcbiAgXCJib3R0b20tZW5kXCIsXG4gIFwicmlnaHQtc3RhcnRcIixcbiAgXCJyaWdodC1lbmRcIixcbiAgXCJsZWZ0LXN0YXJ0XCIsXG4gIFwibGVmdC1lbmRcIixcbiAgXCJ0b3BcIixcbiAgXCJyaWdodFwiLFxuICBcImJvdHRvbVwiLFxuICBcImxlZnRcIixcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhGbG9hdGluZyhDb21wb25lbnQpIHtcbiAgY29uc3QgV2l0aEZsb2F0aW5nID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgYWx0X3Byb3BzID0ge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBwb3BwZXJNb2RpZmllcnM6IHByb3BzLnBvcHBlck1vZGlmaWVycyB8fCBbXSxcbiAgICAgIHBvcHBlclByb3BzOiBwcm9wcy5wb3BwZXJQcm9wcyB8fCB7fSxcbiAgICAgIGhpZGVQb3BwZXI6XG4gICAgICAgIHR5cGVvZiBwcm9wcy5oaWRlUG9wcGVyID09PSBcImJvb2xlYW5cIiA/IHByb3BzLmhpZGVQb3BwZXIgOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3QgYXJyb3dSZWYgPSBSZWFjdC51c2VSZWYoKTtcbiAgICBjb25zdCBmbG9hdGluZ1Byb3BzID0gdXNlRmxvYXRpbmcoe1xuICAgICAgb3BlbjogIWFsdF9wcm9wcy5oaWRlUG9wcGVyLFxuICAgICAgd2hpbGVFbGVtZW50c01vdW50ZWQ6IGF1dG9VcGRhdGUsXG4gICAgICBwbGFjZW1lbnQ6IGFsdF9wcm9wcy5wb3BwZXJQbGFjZW1lbnQsXG4gICAgICBtaWRkbGV3YXJlOiBbXG4gICAgICAgIGZsaXAoeyBwYWRkaW5nOiAxNSB9KSxcbiAgICAgICAgb2Zmc2V0KDEwKSxcbiAgICAgICAgYXJyb3coeyBlbGVtZW50OiBhcnJvd1JlZiB9KSxcbiAgICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlck1vZGlmaWVycyxcbiAgICAgIF0sXG4gICAgICAuLi5hbHRfcHJvcHMucG9wcGVyUHJvcHMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudCB7Li4uYWx0X3Byb3BzfSBwb3BwZXJQcm9wcz17eyAuLi5mbG9hdGluZ1Byb3BzLCBhcnJvd1JlZiB9fSAvPlxuICAgICk7XG4gIH07XG5cbiAgV2l0aEZsb2F0aW5nLnByb3BUeXBlcyA9IHtcbiAgICBwb3BwZXJQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMpLFxuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaGlkZVBvcHBlcjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgcmV0dXJuIFdpdGhGbG9hdGluZztcbn1cbiIsImltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgRmxvYXRpbmdBcnJvdyB9IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgUG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuaW1wb3J0IHdpdGhGbG9hdGluZyBmcm9tIFwiLi93aXRoX2Zsb2F0aW5nXCI7XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG5leHBvcnQgY2xhc3MgUG9wcGVyQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZGVQb3BwZXI6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdyYXBwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGlkZVBvcHBlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9wcGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBwb3BwZXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRhcmdldENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9wcGVyT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93QXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICB3cmFwcGVyQ2xhc3NOYW1lLFxuICAgICAgaGlkZVBvcHBlcixcbiAgICAgIHBvcHBlckNvbXBvbmVudCxcbiAgICAgIHRhcmdldENvbXBvbmVudCxcbiAgICAgIGVuYWJsZVRhYkxvb3AsXG4gICAgICBwb3BwZXJPbktleURvd24sXG4gICAgICBwb3J0YWxJZCxcbiAgICAgIHBvcnRhbEhvc3QsXG4gICAgICBwb3BwZXJQcm9wcyxcbiAgICAgIHNob3dBcnJvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGxldCBwb3BwZXI7XG5cbiAgICBpZiAoIWhpZGVQb3BwZXIpIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlci1wb3BwZXJcIiwgY2xhc3NOYW1lKTtcbiAgICAgIHBvcHBlciA9IChcbiAgICAgICAgPFRhYkxvb3AgZW5hYmxlVGFiTG9vcD17ZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXtwb3BwZXJQcm9wcy5yZWZzLnNldEZsb2F0aW5nfVxuICAgICAgICAgICAgc3R5bGU9e3BvcHBlclByb3BzLmZsb2F0aW5nU3R5bGVzfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgZGF0YS1wbGFjZW1lbnQ9e3BvcHBlclByb3BzLnBsYWNlbWVudH1cbiAgICAgICAgICAgIG9uS2V5RG93bj17cG9wcGVyT25LZXlEb3dufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3BwZXJDb21wb25lbnR9XG4gICAgICAgICAgICB7c2hvd0Fycm93ICYmIChcbiAgICAgICAgICAgICAgPEZsb2F0aW5nQXJyb3dcbiAgICAgICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLmFycm93UmVmfVxuICAgICAgICAgICAgICAgIGNvbnRleHQ9e3BvcHBlclByb3BzLmNvbnRleHR9XG4gICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs4fVxuICAgICAgICAgICAgICAgIHdpZHRoPXsxNn1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlWSgtMXB4KVwiIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdHJpYW5nbGVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UYWJMb29wPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXIpIHtcbiAgICAgIHBvcHBlciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXIsIHt9LCBwb3BwZXIpO1xuICAgIH1cblxuICAgIGlmIChwb3J0YWxJZCAmJiAhaGlkZVBvcHBlcikge1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8UG9ydGFsIHBvcnRhbElkPXtwb3J0YWxJZH0gcG9ydGFsSG9zdD17cG9ydGFsSG9zdH0+XG4gICAgICAgICAge3BvcHBlcn1cbiAgICAgICAgPC9Qb3J0YWw+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc2VzID0gY2xzeChcInJlYWN0LWRhdGVwaWNrZXItd3JhcHBlclwiLCB3cmFwcGVyQ2xhc3NOYW1lKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxkaXYgcmVmPXtwb3BwZXJQcm9wcy5yZWZzLnNldFJlZmVyZW5jZX0gY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3Nlc30+XG4gICAgICAgICAge3RhcmdldENvbXBvbmVudH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtwb3BwZXJ9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aEZsb2F0aW5nKFBvcHBlckNvbXBvbmVudCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSBcIi4vY2FsZW5kYXJcIjtcbmltcG9ydCBDYWxlbmRhckljb24gZnJvbSBcIi4vY2FsZW5kYXJfaWNvblwiO1xuaW1wb3J0IFBvcnRhbCBmcm9tIFwiLi9wb3J0YWxcIjtcbmltcG9ydCBQb3BwZXJDb21wb25lbnQgZnJvbSBcIi4vcG9wcGVyX2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgcG9wcGVyUGxhY2VtZW50UG9zaXRpb25zIH0gZnJvbSBcIi4vd2l0aF9mbG9hdGluZ1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBzZXQgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0XCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZEYXlcIjtcbmltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mRGF5XCI7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSBcImRhdGUtZm5zL2lzVmFsaWRcIjtcbmltcG9ydCB7XG4gIG5ld0RhdGUsXG4gIGlzRGF0ZSxcbiAgaXNCZWZvcmUsXG4gIGlzQWZ0ZXIsXG4gIGlzRXF1YWwsXG4gIHNldFRpbWUsXG4gIGdldFNlY29uZHMsXG4gIGdldE1pbnV0ZXMsXG4gIGdldEhvdXJzLFxuICBhZGREYXlzLFxuICBhZGRNb250aHMsXG4gIGFkZFdlZWtzLFxuICBzdWJEYXlzLFxuICBzdWJNb250aHMsXG4gIHN1YldlZWtzLFxuICBhZGRZZWFycyxcbiAgc3ViWWVhcnMsXG4gIGlzRGF5RGlzYWJsZWQsXG4gIGlzRGF5SW5SYW5nZSxcbiAgZ2V0RWZmZWN0aXZlTWluRGF0ZSxcbiAgZ2V0RWZmZWN0aXZlTWF4RGF0ZSxcbiAgcGFyc2VEYXRlLFxuICBzYWZlRGF0ZUZvcm1hdCxcbiAgc2FmZURhdGVSYW5nZUZvcm1hdCxcbiAgZ2V0SGlnaHRMaWdodERheXNNYXAsXG4gIGdldFllYXIsXG4gIGdldE1vbnRoLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0RW5kT2ZXZWVrLFxuICByZWdpc3RlckxvY2FsZSxcbiAgc2V0RGVmYXVsdExvY2FsZSxcbiAgZ2V0RGVmYXVsdExvY2FsZSxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBpc1NhbWVEYXksXG4gIGlzTW9udGhEaXNhYmxlZCxcbiAgaXNZZWFyRGlzYWJsZWQsXG4gIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0LFxuICBnZXRIb2xpZGF5c01hcCxcbiAgaXNEYXRlQmVmb3JlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgVGFiTG9vcCBmcm9tIFwiLi90YWJfbG9vcFwiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIENhbGVuZGFyQ29udGFpbmVyIH0gZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5cbmV4cG9ydCB7IHJlZ2lzdGVyTG9jYWxlLCBzZXREZWZhdWx0TG9jYWxlLCBnZXREZWZhdWx0TG9jYWxlIH07XG5cbmNvbnN0IG91dHNpZGVDbGlja0lnbm9yZUNsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyLWlnbm9yZS1vbmNsaWNrb3V0c2lkZVwiO1xuY29uc3QgV3JhcHBlZENhbGVuZGFyID0gb25DbGlja091dHNpZGUoQ2FsZW5kYXIpO1xuXG4vLyBDb21wYXJlcyBkYXRlcyB5ZWFyK21vbnRoIGNvbWJpbmF0aW9uc1xuZnVuY3Rpb24gaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGdldE1vbnRoKGRhdGUxKSAhPT0gZ2V0TW9udGgoZGF0ZTIpIHx8IGdldFllYXIoZGF0ZTEpICE9PSBnZXRZZWFyKGRhdGUyKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZGF0ZTEgIT09IGRhdGUyO1xufVxuXG4vKipcbiAqIEdlbmVyYWwgZGF0ZXBpY2tlciBjb21wb25lbnQuXG4gKi9cbmNvbnN0IElOUFVUX0VSUl8xID0gXCJEYXRlIGlucHV0IG5vdCB2YWxpZC5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhbGxvd1NhbWVEYXk6IGZhbHNlLFxuICAgICAgZGF0ZUZvcm1hdDogXCJNTS9kZC95eXl5XCIsXG4gICAgICBkYXRlRm9ybWF0Q2FsZW5kYXI6IFwiTExMTCB5eXl5XCIsXG4gICAgICBvbkNoYW5nZSgpIHt9LFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgZHJvcGRvd25Nb2RlOiBcInNjcm9sbFwiLFxuICAgICAgb25Gb2N1cygpIHt9LFxuICAgICAgb25CbHVyKCkge30sXG4gICAgICBvbktleURvd24oKSB7fSxcbiAgICAgIG9uSW5wdXRDbGljaygpIHt9LFxuICAgICAgb25TZWxlY3QoKSB7fSxcbiAgICAgIG9uQ2xpY2tPdXRzaWRlKCkge30sXG4gICAgICBvbk1vbnRoQ2hhbmdlKCkge30sXG4gICAgICBvbkNhbGVuZGFyT3BlbigpIHt9LFxuICAgICAgb25DYWxlbmRhckNsb3NlKCkge30sXG4gICAgICBwcmV2ZW50T3Blbk9uRm9jdXM6IGZhbHNlLFxuICAgICAgb25ZZWFyQ2hhbmdlKCkge30sXG4gICAgICBvbklucHV0RXJyb3IoKSB7fSxcbiAgICAgIG1vbnRoc1Nob3duOiAxLFxuICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgd2l0aFBvcnRhbDogZmFsc2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogZmFsc2UsXG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgICAgc2hvd1RpbWVTZWxlY3Q6IGZhbHNlLFxuICAgICAgc2hvd1RpbWVJbnB1dDogZmFsc2UsXG4gICAgICBzaG93UHJldmlvdXNNb250aHM6IGZhbHNlLFxuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93V2Vla1BpY2tlcjogZmFsc2UsXG4gICAgICBzdHJpY3RQYXJzaW5nOiBmYWxzZSxcbiAgICAgIHN3YXBSYW5nZTogZmFsc2UsXG4gICAgICB0aW1lSW50ZXJ2YWxzOiAzMCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBcIk5leHQgTW9udGhcIixcbiAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICB0aW1lSW5wdXRMYWJlbDogXCJUaW1lXCIsXG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgICAgeWVhckl0ZW1OdW1iZXI6IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgICAgIGZvY3VzU2VsZWN0ZWRNb250aDogZmFsc2UsXG4gICAgICBzaG93UG9wcGVyQXJyb3c6IHRydWUsXG4gICAgICBleGNsdWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgY3VzdG9tVGltZUlucHV0OiBudWxsLFxuICAgICAgY2FsZW5kYXJTdGFydERheTogdW5kZWZpbmVkLFxuICAgICAgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljazogZmFsc2UsXG4gICAgICB1c2VQb2ludGVyRXZlbnQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYWxsb3dTYW1lRGF5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhcmlhRGVzY3JpYmVkQnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUludmFsaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsQ2xvc2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYUxhYmVsbGVkQnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJpYVJlcXVpcmVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF1dG9Db21wbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIGNhbGVuZGFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsb3NlT25TY3JvbGw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21JbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgY3VzdG9tSW5wdXRSZWY6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXNcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKSxcbiAgICBkYXRlRm9ybWF0Q2FsZW5kYXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3ZWVrRGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1vZGU6IFByb3BUeXBlcy5vbmVPZihbXCJzY3JvbGxcIiwgXCJzZWxlY3RcIl0pLmlzUmVxdWlyZWQsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvcm1hdFdlZWtOdW1iZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljazogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgIF0pLFxuICAgIHNob3dJY29uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpY29uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICAgIGNhbGVuZGFySWNvbkNsYXNzbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtb250aHNTaG93bjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DbGlja091dHNpZGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlUmF3OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0RXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2FsZW5kYXJPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNhbGVuZGFyQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHBsYWNlaG9sZGVyVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3BwZXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBvcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyTW9kaWZpZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSwgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSwgLy8gPFBvcHBlckNvbXBvbmVudC8+IHByb3BzXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcHJldmVudE9wZW5PbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZWFkT25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd01vbnRoRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dQcmV2aW91c01vbnRoczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcnM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0cmljdFBhcnNpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIHN3YXBSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc3RhcnRPcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YWJJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB0aW1lQ2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgdXNlV2Vla2RheXNTaG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla0RheTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2Vla0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0RhdGVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtaW5UaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhUaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJUaW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xlYXJCdXR0b25UaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZW5kZXJDdXN0b21IZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb2N1c1NlbGVjdGVkTW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aE1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dQb3BwZXJBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgZXhjbHVkZVNjcm9sbGJhcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpO1xuICAgIHRoaXMucHJldmVudEZvY3VzVGltZW91dCA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChcbiAgICAgIHByZXZQcm9wcy5pbmxpbmUgJiZcbiAgICAgIGhhc1ByZVNlbGVjdGlvbkNoYW5nZWQocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuc3RhdGUubW9udGhTZWxlY3RlZEluICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHByZXZQcm9wcy5tb250aHNTaG93biAhPT0gdGhpcy5wcm9wcy5tb250aHNTaG93blxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoU2VsZWN0ZWRJbjogMCB9KTtcbiAgICB9XG4gICAgaWYgKHByZXZQcm9wcy5oaWdobGlnaHREYXRlcyAhPT0gdGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAhcHJldlN0YXRlLmZvY3VzZWQgJiZcbiAgICAgICFpc0VxdWFsKHByZXZQcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgIH1cblxuICAgIGlmIChwcmV2U3RhdGUub3BlbiAhPT0gdGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpZiAocHJldlN0YXRlLm9wZW4gPT09IGZhbHNlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJPcGVuKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gdHJ1ZSAmJiB0aGlzLnN0YXRlLm9wZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhckNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5jbGVhclByZXZlbnRGb2N1c1RpbWVvdXQoKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgfVxuXG4gIGdldFByZVNlbGVjdGlvbiA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA/IHRoaXMucHJvcHMub3BlblRvRGF0ZVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNFbmQgJiYgdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c1N0YXJ0ICYmIHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgOiBuZXdEYXRlKCk7XG5cbiAgLy8gQ29udmVydCB0aGUgZGF0ZSBmcm9tIHN0cmluZyBmb3JtYXQgdG8gc3RhbmRhcmQgRGF0ZSBmb3JtYXRcbiAgbW9kaWZ5SG9saWRheXMgPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuaG9saWRheXM/LnJlZHVjZSgoYWNjdW11bGF0b3IsIGhvbGlkYXkpID0+IHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShob2xpZGF5LmRhdGUpO1xuICAgICAgaWYgKCFpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFsuLi5hY2N1bXVsYXRvciwgeyAuLi5ob2xpZGF5LCBkYXRlIH1dO1xuICAgIH0sIFtdKTtcblxuICBjYWxjSW5pdGlhbFN0YXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRQcmVTZWxlY3Rpb24gPSB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGNvbnN0IG1pbkRhdGUgPSBnZXRFZmZlY3RpdmVNaW5EYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IG1heERhdGUgPSBnZXRFZmZlY3RpdmVNYXhEYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGJvdW5kZWRQcmVTZWxlY3Rpb24gPVxuICAgICAgbWluRGF0ZSAmJiBpc0JlZm9yZShkZWZhdWx0UHJlU2VsZWN0aW9uLCBzdGFydE9mRGF5KG1pbkRhdGUpKVxuICAgICAgICA/IG1pbkRhdGVcbiAgICAgICAgOiBtYXhEYXRlICYmIGlzQWZ0ZXIoZGVmYXVsdFByZVNlbGVjdGlvbiwgZW5kT2ZEYXkobWF4RGF0ZSkpXG4gICAgICAgICAgPyBtYXhEYXRlXG4gICAgICAgICAgOiBkZWZhdWx0UHJlU2VsZWN0aW9uO1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiB0aGlzLnByb3BzLnN0YXJ0T3BlbiB8fCBmYWxzZSxcbiAgICAgIHByZXZlbnRGb2N1czogZmFsc2UsXG4gICAgICBwcmVTZWxlY3Rpb246XG4gICAgICAgICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQpID8/IGJvdW5kZWRQcmVTZWxlY3Rpb24sXG4gICAgICAvLyB0cmFuc2Zvcm1pbmcgaGlnaGxpZ2h0ZWQgZGF5cyAocGVyaGFwcyBuZXN0ZWQgYXJyYXkpXG4gICAgICAvLyB0byBmbGF0IE1hcCBmb3IgZmFzdGVyIGFjY2VzcyBpbiBkYXkuanN4XG4gICAgICBoaWdobGlnaHREYXRlczogZ2V0SGlnaHRMaWdodERheXNNYXAodGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcyksXG4gICAgICBmb2N1c2VkOiBmYWxzZSxcbiAgICAgIC8vIHVzZWQgdG8gZm9jdXMgZGF5IGluIGlubGluZSB2ZXJzaW9uIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkLCBidXQgbm90IG9uXG4gICAgICAvLyBpbml0aWFsIHJlbmRlclxuICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IGZhbHNlLFxuICAgICAgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH07XG4gIH07XG5cbiAgY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRGb2N1cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmZvY3VzKSB7XG4gICAgICB0aGlzLmlucHV0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0Qmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmJsdXIpIHtcbiAgICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICAgIH1cblxuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIHNldE9wZW4gPSAob3Blbiwgc2tpcFNldEJsdXIgPSBmYWxzZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIG9wZW46IG9wZW4sXG4gICAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgICBvcGVuICYmIHRoaXMuc3RhdGUub3BlblxuICAgICAgICAgICAgPyB0aGlzLnN0YXRlLnByZVNlbGVjdGlvblxuICAgICAgICAgICAgOiB0aGlzLmNhbGNJbml0aWFsU3RhdGUoKS5wcmVTZWxlY3Rpb24sXG4gICAgICAgIGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKCFvcGVuKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgIChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICBmb2N1c2VkOiBza2lwU2V0Qmx1ciA/IHByZXYuZm9jdXNlZCA6IGZhbHNlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICFza2lwU2V0Qmx1ciAmJiB0aGlzLnNldEJsdXIoKTtcblxuICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuICBpbnB1dE9rID0gKCkgPT4gaXNEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcblxuICBpc0NhbGVuZGFyT3BlbiA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5vcGVuID09PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5zdGF0ZS5vcGVuICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRPbmx5XG4gICAgICA6IHRoaXMucHJvcHMub3BlbjtcblxuICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5wcmV2ZW50Rm9jdXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICBpZiAoIXRoaXMucHJvcHMucHJldmVudE9wZW5PbkZvY3VzICYmICF0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IHRydWUgfSk7XG4gIH07XG5cbiAgc2VuZEZvY3VzQmFja1RvSW5wdXQgPSAoKSA9PiB7XG4gICAgLy8gQ2xlYXIgcHJldmlvdXMgdGltZW91dCBpZiBpdCBleGlzdHNcbiAgICBpZiAodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KSB7XG4gICAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIHRoZSBwb3BwZXIgYW5kIHJlZm9jdXMgdGhlIGlucHV0XG4gICAgLy8gc3RvcCB0aGUgaW5wdXQgZnJvbSBhdXRvIG9wZW5pbmcgb25Gb2N1c1xuICAgIC8vIHNldEZvY3VzIHRvIHRoZSBpbnB1dFxuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IHRydWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjYW5jZWxGb2N1c0lucHV0ID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmlucHV0Rm9jdXNUaW1lb3V0KTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfTtcblxuICBkZWZlckZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gICAgdGhpcy5pbnB1dEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRGb2N1cygpLCAxKTtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIGhhbmRsZUJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUub3BlbiB8fCB0aGlzLnByb3BzLndpdGhQb3J0YWwgfHwgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IGZhbHNlIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrT3V0c2lkZShldmVudCk7XG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFBvcnRhbCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKC4uLmFsbEFyZ3MpID0+IHtcbiAgICBsZXQgZXZlbnQgPSBhbGxBcmdzWzBdO1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlUmF3LmFwcGx5KHRoaXMsIGFsbEFyZ3MpO1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKClcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW5wdXRWYWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQsXG4gICAgfSk7XG4gICAgbGV0IGRhdGUgPSBwYXJzZURhdGUoXG4gICAgICBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuc3RyaWN0UGFyc2luZyxcbiAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICApO1xuICAgIC8vIFVzZSBkYXRlIGZyb20gYHNlbGVjdGVkYCBwcm9wIHdoZW4gbWFuaXB1bGF0aW5nIG9ubHkgdGltZSBmb3IgaW5wdXQgdmFsdWVcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSAmJlxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJlxuICAgICAgZGF0ZSAmJlxuICAgICAgIWlzU2FtZURheShkYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgZGF0ZSA9IHNldCh0aGlzLnByb3BzLnNlbGVjdGVkLCB7XG4gICAgICAgIGhvdXJzOiBnZXRIb3VycyhkYXRlKSxcbiAgICAgICAgbWludXRlczogZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgICAgc2Vjb25kczogZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZGF0ZSB8fCAhZXZlbnQudGFyZ2V0LnZhbHVlKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkKGRhdGUsIGV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0ID0gKGRhdGUsIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmICF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICAvLyBQcmV2ZW50aW5nIG9uRm9jdXMgZXZlbnQgdG8gZml4IGlzc3VlXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL2lzc3Vlcy82MjhcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcoZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlbGVjdGVkKGRhdGUsIGV2ZW50LCBmYWxzZSwgbW9udGhTZWxlY3RlZEluKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93RGF0ZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbihkYXRlKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgaWYgKFxuICAgICAgICBzdGFydERhdGUgJiZcbiAgICAgICAgIWVuZERhdGUgJiZcbiAgICAgICAgKHRoaXMucHJvcHMuc3dhcFJhbmdlIHx8ICFpc0RhdGVCZWZvcmUoZGF0ZSwgc3RhcnREYXRlKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBzZXRTZWxlY3RlZCA9IChkYXRlLCBldmVudCwga2VlcElucHV0LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSBkYXRlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZERhdGUgIT09IG51bGwgJiZcbiAgICAgICAgaXNZZWFyRGlzYWJsZWQoZ2V0WWVhcihjaGFuZ2VkRGF0ZSksIHRoaXMucHJvcHMpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNNb250aERpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc0RheURpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0c011bHRpcGxlLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICAgIG1pblRpbWUsXG4gICAgICBzd2FwUmFuZ2UsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhaXNFcXVhbCh0aGlzLnByb3BzLnNlbGVjdGVkLCBjaGFuZ2VkRGF0ZSkgfHxcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dTYW1lRGF5IHx8XG4gICAgICBzZWxlY3RzUmFuZ2UgfHxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZVxuICAgICkge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICAgICAgKCFrZWVwSW5wdXQgfHxcbiAgICAgICAgICAgICghdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgaG91cjogZ2V0SG91cnModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBzZWNvbmQ6IGdldFNlY29uZHModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBtaW5UaW1lIGlzIHByZXNlbnQgdGhlbiBzZXQgdGhlIHRpbWUgdG8gbWluVGltZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWtlZXBJbnB1dCAmJlxuICAgICAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobWluVGltZSkge1xuICAgICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICAgIGhvdXI6IG1pblRpbWUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgbWludXRlOiBtaW5UaW1lLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgc2Vjb25kOiBtaW5UaW1lLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmZvY3VzU2VsZWN0ZWRNb250aCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IG1vbnRoU2VsZWN0ZWRJbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdHNSYW5nZSkge1xuICAgICAgICBjb25zdCBub1JhbmdlcyA9ICFzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0UmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGlzUmFuZ2VGaWxsZWQgPSBzdGFydERhdGUgJiYgZW5kRGF0ZTtcbiAgICAgICAgaWYgKG5vUmFuZ2VzKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlZERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlQmVmb3JlKGNoYW5nZWREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgICBpZiAoc3dhcFJhbmdlKSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgc3RhcnREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbc3RhcnREYXRlLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmFuZ2VGaWxsZWQpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0c011bHRpcGxlKSB7XG4gICAgICAgIGlmICghc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZERhdGVzLnNvbWUoXG4gICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiBpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RGF0ZXMgPSBzZWxlY3RlZERhdGVzLmZpbHRlcihcbiAgICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gIWlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIG9uQ2hhbmdlKG5leHREYXRlcywgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbLi4uc2VsZWN0ZWREYXRlcywgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbkNoYW5nZShjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgha2VlcElucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gV2hlbiBjaGVja2luZyBwcmVTZWxlY3Rpb24gdmlhIG1pbi9tYXhEYXRlLCB0aW1lcyBuZWVkIHRvIGJlIG1hbmlwdWxhdGVkIHZpYSBzdGFydE9mRGF5L2VuZE9mRGF5XG4gIHNldFByZVNlbGVjdGlvbiA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgaGFzTWluRGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1pbkRhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgY29uc3QgaGFzTWF4RGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1heERhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgbGV0IGlzVmFsaWREYXRlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGUpO1xuICAgICAgaWYgKGhhc01pbkRhdGUgJiYgaGFzTWF4RGF0ZSkge1xuICAgICAgICAvLyBpc0RheUluUmFuZ2UgdXNlcyBzdGFydE9mRGF5IGludGVybmFsbHksIHNvIG5vdCBuZWNlc3NhcnkgdG8gbWFuaXB1bGF0ZSB0aW1lcyBoZXJlXG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID0gaXNEYXlJblJhbmdlKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWluRGF0ZSkge1xuICAgICAgICBjb25zdCBtaW5EYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkodGhpcy5wcm9wcy5taW5EYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQWZ0ZXIoZGF0ZSwgbWluRGF0ZVN0YXJ0T2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWluRGF0ZVN0YXJ0T2ZEYXkpO1xuICAgICAgfSBlbHNlIGlmIChoYXNNYXhEYXRlKSB7XG4gICAgICAgIGNvbnN0IG1heERhdGVFbmRPZkRheSA9IGVuZE9mRGF5KHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0JlZm9yZShkYXRlLCBtYXhEYXRlRW5kT2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWF4RGF0ZUVuZE9mRGF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzVmFsaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcHJlU2VsZWN0aW9uOiBkYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZUNhbGVuZGFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0T3BlbighdGhpcy5zdGF0ZS5vcGVuKTtcbiAgfTtcblxuICBoYW5kbGVUaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgOiB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGltZVxuICAgICAgOiBzZXRUaW1lKHNlbGVjdGVkLCB7XG4gICAgICAgICAgaG91cjogZ2V0SG91cnModGltZSksXG4gICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRpbWUpLFxuICAgICAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hhbmdlZERhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgb25JbnB1dENsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25JbnB1dENsaWNrKCk7XG4gIH07XG5cbiAgb25JbnB1dEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5zdGF0ZS5vcGVuICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1c1xuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiRW50ZXJcIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub25JbnB1dENsaWNrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgY2FsZW5kYXIgaXMgb3BlbiwgdGhlc2Uga2V5cyB3aWxsIGZvY3VzIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50S2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzZWxlY3RvclN0cmluZyA9XG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJiB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc1xuICAgICAgICAgICAgPyAnLnJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyW3RhYmluZGV4PVwiMFwiXSdcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlciB8fFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgICA/ICcucmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dFt0YWJpbmRleD1cIjBcIl0nXG4gICAgICAgICAgICAgIDogJy5yZWFjdC1kYXRlcGlja2VyX19kYXlbdGFiaW5kZXg9XCIwXCJdJztcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID1cbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUgJiZcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW0uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuaW5wdXRPaygpICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5sYXN0UHJlU2VsZWN0Q2hhbmdlID09PSBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiVGFiXCIpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uUG9ydGFsS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBwcmV2ZW50Rm9jdXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICAvLyBrZXlEb3duIGV2ZW50cyBwYXNzZWQgZG93biB0byBkYXkuanN4XG4gIG9uRGF5S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc1NoaWZ0S2V5QWN0aXZlID0gZXZlbnQuc2hpZnRLZXk7XG5cbiAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBsZXQgbmV3U2VsZWN0aW9uO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJEYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZERheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlVXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IHN1YlllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IHN1Yk1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBhZGRZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBhZGRNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJIb21lXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgICBjb3B5LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkVuZFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldEVuZE9mV2Vlayhjb3B5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFuZXdTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dEVycm9yKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgfSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZChuZXdTZWxlY3Rpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24obmV3U2VsZWN0aW9uKTtcbiAgICAgIC8vIG5lZWQgdG8gZmlndXJlIG91dCB3aGV0aGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvblxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgIGNvbnN0IHByZXZNb250aCA9IGdldE1vbnRoKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdNb250aCA9IGdldE1vbnRoKG5ld1NlbGVjdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZZZWFyID0gZ2V0WWVhcihjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3WWVhciA9IGdldFllYXIobmV3U2VsZWN0aW9uKTtcblxuICAgICAgICBpZiAocHJldk1vbnRoICE9PSBuZXdNb250aCB8fCBwcmV2WWVhciAhPT0gbmV3WWVhcikge1xuICAgICAgICAgIC8vIG1vbnRoIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1vbnRoIGhhc24ndCBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBoYW5kbGUgZ2VuZXJpYyBrZXkgZG93biBldmVudHMgaW4gdGhlIHBvcHBlciB0aGF0IGRvIG5vdCBhZGp1c3Qgb3Igc2VsZWN0IGRhdGVzXG4gIC8vIGV4OiB3aGlsZSBmb2N1c2luZyBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnNcbiAgb25Qb3BwZXJLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgfTtcblxuICBvbkNsZWFyQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsLCBldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIGNsZWFyID0gKCkgPT4ge1xuICAgIHRoaXMub25DbGVhckNsaWNrKCk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImJvb2xlYW5cIiAmJlxuICAgICAgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbChldmVudCkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5pc0NhbGVuZGFyT3BlbigpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxXcmFwcGVkQ2FsZW5kYXJcbiAgICAgICAgcmVmPXsoZWxlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbGVtO1xuICAgICAgICB9fVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnNldE9wZW59XG4gICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0Q2FsZW5kYXJ9XG4gICAgICAgIHVzZVdlZWtkYXlzU2hvcnQ9e3RoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydH1cbiAgICAgICAgZm9ybWF0V2Vla0RheT17dGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5fVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnN0YXRlLnByZVNlbGVjdGlvbn1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICBvbkNsaWNrT3V0c2lkZT17dGhpcy5oYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZX1cbiAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5zdGF0ZS5oaWdobGlnaHREYXRlc31cbiAgICAgICAgaG9saWRheXM9e2dldEhvbGlkYXlzTWFwKHRoaXMubW9kaWZ5SG9saWRheXMoKSl9XG4gICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMuc3RhdGUuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgIHNob3dQcmV2aW91c01vbnRocz17dGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHN9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgd2Vla0xhYmVsPXt0aGlzLnByb3BzLndlZWtMYWJlbH1cbiAgICAgICAgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3M9e291dHNpZGVDbGlja0lnbm9yZUNsYXNzfVxuICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgbW9udGhzU2hvd249e3RoaXMucHJvcHMubW9udGhzU2hvd259XG4gICAgICAgIG1vbnRoU2VsZWN0ZWRJbj17dGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW59XG4gICAgICAgIG9uRHJvcGRvd25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgICBvbk1vbnRoQ2hhbmdlPXt0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2V9XG4gICAgICAgIG9uWWVhckNoYW5nZT17dGhpcy5wcm9wcy5vblllYXJDaGFuZ2V9XG4gICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgIHdlZWtEYXlDbGFzc05hbWU9e3RoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZX1cbiAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgc2hvd0RhdGVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICBvblRpbWVDaGFuZ2U9e3RoaXMuaGFuZGxlVGltZUNoYW5nZX1cbiAgICAgICAgdGltZUZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICB0aW1lSW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2FsZW5kYXJDbGFzc05hbWV9XG4gICAgICAgIGNvbnRhaW5lcj17dGhpcy5wcm9wcy5jYWxlbmRhckNvbnRhaW5lcn1cbiAgICAgICAgeWVhckl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckl0ZW1OdW1iZXJ9XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0TW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgICBuZXh0TW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQXJpYUxhYmVsfVxuICAgICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgcmVuZGVyQ3VzdG9tSGVhZGVyPXt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcn1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXJ9XG4gICAgICAgIG9uTW9udGhNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgIHNob3dUaW1lSW5wdXQ9e3RoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICBleGNsdWRlU2Nyb2xsYmFyPXt0aGlzLnByb3BzLmV4Y2x1ZGVTY3JvbGxiYXJ9XG4gICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5vbktleURvd259XG4gICAgICAgIGhhbmRsZU9uRGF5S2V5RG93bj17dGhpcy5vbkRheUtleURvd259XG4gICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnN0YXRlLmZvY3VzZWR9XG4gICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgIHllYXJDbGFzc05hbWU9e3RoaXMucHJvcHMueWVhckNsYXNzTmFtZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L1dyYXBwZWRDYWxlbmRhcj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzQ29udGFpbnNUaW1lID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0O1xuICAgIGNvbnN0IGxvbmdEYXRlRm9ybWF0ID0gaXNDb250YWluc1RpbWUgPyBcIlBQUFBwXCIgOiBcIlBQUFBcIjtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgc3RhcnQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgIH0sXG4gICAgICApfS4gJHtcbiAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyBcIkVuZCBkYXRlOiBcIiArXG4gICAgICAgICAgICBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLmVuZERhdGUsIHtcbiAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB0aW1lOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB5ZWFyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcInl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBtb250aDogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJNTU1NIHl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHF1YXJ0ZXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBcInl5eXksIFFRUVwiLFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7YXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsc3godGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgIFtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc106IHRoaXMuc3RhdGUub3BlbixcbiAgICB9KTtcblxuICAgIGNvbnN0IGN1c3RvbUlucHV0ID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dCB8fCA8aW5wdXQgdHlwZT1cInRleHRcIiAvPjtcbiAgICBjb25zdCBjdXN0b21JbnB1dFJlZiA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXRSZWYgfHwgXCJyZWZcIjtcbiAgICBjb25zdCBpbnB1dFZhbHVlID1cbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICA6IHR5cGVvZiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICA/IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICAgID8gc2FmZURhdGVSYW5nZUZvcm1hdChcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgICAgICAgICA/IHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcywgdGhpcy5wcm9wcylcbiAgICAgICAgICAgICAgOiBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzKTtcblxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tSW5wdXQsIHtcbiAgICAgIFtjdXN0b21JbnB1dFJlZl06IChpbnB1dCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICB9LFxuICAgICAgdmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1cixcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25JbnB1dENsaWNrLFxuICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgZm9ybTogdGhpcy5wcm9wcy5mb3JtLFxuICAgICAgYXV0b0ZvY3VzOiB0aGlzLnByb3BzLmF1dG9Gb2N1cyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyVGV4dCxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgYXV0b0NvbXBsZXRlOiB0aGlzLnByb3BzLmF1dG9Db21wbGV0ZSxcbiAgICAgIGNsYXNzTmFtZTogY2xzeChjdXN0b21JbnB1dC5wcm9wcy5jbGFzc05hbWUsIGNsYXNzTmFtZSksXG4gICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucHJvcHMucmVxdWlyZWQsXG4gICAgICB0YWJJbmRleDogdGhpcy5wcm9wcy50YWJJbmRleCxcbiAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiB0aGlzLnByb3BzLmFyaWFEZXNjcmliZWRCeSxcbiAgICAgIFwiYXJpYS1pbnZhbGlkXCI6IHRoaXMucHJvcHMuYXJpYUludmFsaWQsXG4gICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aGlzLnByb3BzLmFyaWFMYWJlbGxlZEJ5LFxuICAgICAgXCJhcmlhLXJlcXVpcmVkXCI6IHRoaXMucHJvcHMuYXJpYVJlcXVpcmVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlckNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ2xlYXJhYmxlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBjbGVhckJ1dHRvblRpdGxlLFxuICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUgPSBcIlwiLFxuICAgICAgYXJpYUxhYmVsQ2xvc2UgPSBcIkNsb3NlXCIsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChcbiAgICAgIGlzQ2xlYXJhYmxlICYmXG4gICAgICAoc2VsZWN0ZWQgIT0gbnVsbCB8fFxuICAgICAgICBzdGFydERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBlbmREYXRlICE9IG51bGwgfHxcbiAgICAgICAgc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvblwiLFxuICAgICAgICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUsXG4gICAgICAgICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvbi0tZGlzYWJsZWRcIjogZGlzYWJsZWQgfSxcbiAgICAgICAgICApfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWxDbG9zZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xlYXJDbGlja31cbiAgICAgICAgICB0aXRsZT17Y2xlYXJCdXR0b25UaXRsZX1cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRDb250YWluZXIoKSB7XG4gICAgY29uc3QgeyBzaG93SWNvbiwgaWNvbiwgY2FsZW5kYXJJY29uQ2xhc3NuYW1lLCB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9wZW4gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19pbnB1dC1jb250YWluZXIke1xuICAgICAgICAgIHNob3dJY29uID8gXCIgcmVhY3QtZGF0ZXBpY2tlcl9fdmlldy1jYWxlbmRhci1pY29uXCIgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICB7c2hvd0ljb24gJiYgKFxuICAgICAgICAgIDxDYWxlbmRhckljb25cbiAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake2NhbGVuZGFySWNvbkNsYXNzbmFtZX0gJHtcbiAgICAgICAgICAgICAgb3BlbiAmJiBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgey4uLih0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy50b2dnbGVDYWxlbmRhcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgdGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJEYXRlSW5wdXQoKX1cbiAgICAgICAge3RoaXMucmVuZGVyQ2xlYXJCdXR0b24oKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2FsZW5kYXIgPSB0aGlzLnJlbmRlckNhbGVuZGFyKCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHJldHVybiBjYWxlbmRhcjtcblxuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGxldCBwb3J0YWxDb250YWluZXIgPSB0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcG9ydGFsXCJcbiAgICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblBvcnRhbEtleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NhbGVuZGFyfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApIDogbnVsbDtcblxuICAgICAgaWYgKHRoaXMuc3RhdGUub3BlbiAmJiB0aGlzLnByb3BzLnBvcnRhbElkKSB7XG4gICAgICAgIHBvcnRhbENvbnRhaW5lciA9IChcbiAgICAgICAgICA8UG9ydGFsXG4gICAgICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICAgIDwvUG9ydGFsPlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wcGVyQ29tcG9uZW50XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wb3BwZXJDbGFzc05hbWV9XG4gICAgICAgIHdyYXBwZXJDbGFzc05hbWU9e3RoaXMucHJvcHMud3JhcHBlckNsYXNzTmFtZX1cbiAgICAgICAgaGlkZVBvcHBlcj17IXRoaXMuaXNDYWxlbmRhck9wZW4oKX1cbiAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgcG9wcGVyTW9kaWZpZXJzPXt0aGlzLnByb3BzLnBvcHBlck1vZGlmaWVyc31cbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50PXt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgIHBvcHBlckNvbnRhaW5lcj17dGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXJ9XG4gICAgICAgIHBvcHBlckNvbXBvbmVudD17Y2FsZW5kYXJ9XG4gICAgICAgIHBvcHBlclBsYWNlbWVudD17dGhpcy5wcm9wcy5wb3BwZXJQbGFjZW1lbnR9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICBwb3BwZXJPbktleURvd249e3RoaXMub25Qb3BwZXJLZXlEb3dufVxuICAgICAgICBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9XG4gICAgICAgIHNob3dBcnJvdz17dGhpcy5wcm9wcy5zaG93UG9wcGVyQXJyb3d9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQgPSBcImlucHV0XCI7XG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSA9IFwibmF2aWdhdGVcIjtcbiJdLCJuYW1lcyI6WyJERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIiLCJsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsIm5ld0RhdGUiLCJ2YWx1ZSIsImQiLCJTdHJpbmciLCJwYXJzZUlTTyIsInRvRGF0ZSIsIkRhdGUiLCJpc1ZhbGlkIiwicGFyc2VEYXRlIiwiZGF0ZUZvcm1hdCIsImxvY2FsZSIsInN0cmljdFBhcnNpbmciLCJtaW5EYXRlIiwicGFyc2VkRGF0ZSIsImxvY2FsZU9iamVjdCIsImdldExvY2FsZU9iamVjdCIsImdldERlZmF1bHRMb2NhbGUiLCJzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJkZiIsInRyeVBhcnNlRGF0ZSIsInBhcnNlIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwidXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyIsImZvcm1hdERhdGUiLCJtYXRjaCIsIm1hcCIsInN1YnN0cmluZyIsImZpcnN0Q2hhcmFjdGVyIiwibG9uZ0Zvcm1hdHRlciIsImxvbmdGb3JtYXR0ZXJzIiwiZm9ybWF0TG9uZyIsImpvaW4iLCJsZW5ndGgiLCJzbGljZSIsImRhdGUiLCJpc1ZhbGlkRGF0ZSIsImlzQmVmb3JlIiwiZm9ybWF0U3RyIiwiZm9ybWF0IiwibG9jYWxlT2JqIiwiY29uc29sZSIsIndhcm4iLCJjb25jYXQiLCJzYWZlRGF0ZUZvcm1hdCIsIl9yZWYiLCJzYWZlRGF0ZVJhbmdlRm9ybWF0Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInByb3BzIiwiZm9ybWF0dGVkU3RhcnREYXRlIiwiZm9ybWF0dGVkRW5kRGF0ZSIsInNhZmVNdWx0aXBsZURhdGVzRm9ybWF0IiwiZGF0ZXMiLCJmb3JtYXR0ZWRGaXJzdERhdGUiLCJmb3JtYXR0ZWRTZWNvbmREYXRlIiwiZXh0cmFEYXRlc0NvdW50Iiwic2V0VGltZSIsIl9yZWYyIiwiX3JlZjIkaG91ciIsImhvdXIiLCJfcmVmMiRtaW51dGUiLCJtaW51dGUiLCJfcmVmMiRzZWNvbmQiLCJzZWNvbmQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwiZ2V0V2VlayIsImdldElTT1dlZWsiLCJnZXREYXlPZldlZWtDb2RlIiwiZGF5IiwiZ2V0U3RhcnRPZkRheSIsInN0YXJ0T2ZEYXkiLCJnZXRTdGFydE9mV2VlayIsImNhbGVuZGFyU3RhcnREYXkiLCJzdGFydE9mV2VlayIsIndlZWtTdGFydHNPbiIsImdldFN0YXJ0T2ZNb250aCIsInN0YXJ0T2ZNb250aCIsImdldFN0YXJ0T2ZZZWFyIiwic3RhcnRPZlllYXIiLCJnZXRTdGFydE9mUXVhcnRlciIsInN0YXJ0T2ZRdWFydGVyIiwiZ2V0U3RhcnRPZlRvZGF5IiwiZ2V0RW5kT2ZXZWVrIiwiZW5kT2ZXZWVrIiwiaXNTYW1lWWVhciIsImRhdGUxIiwiZGF0ZTIiLCJkZklzU2FtZVllYXIiLCJpc1NhbWVNb250aCIsImRmSXNTYW1lTW9udGgiLCJpc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVRdWFydGVyIiwiaXNTYW1lRGF5IiwiZGZJc1NhbWVEYXkiLCJpc0VxdWFsIiwiZGZJc0VxdWFsIiwiaXNEYXlJblJhbmdlIiwidmFsaWQiLCJzdGFydCIsImVuZCIsImVuZE9mRGF5IiwiaXNXaXRoaW5JbnRlcnZhbCIsImVyciIsInJlZ2lzdGVyTG9jYWxlIiwibG9jYWxlTmFtZSIsImxvY2FsZURhdGEiLCJzY29wZSIsIndpbmRvdyIsImdsb2JhbFRoaXMiLCJfX2xvY2FsZURhdGFfXyIsInNldERlZmF1bHRMb2NhbGUiLCJfX2xvY2FsZUlkX18iLCJsb2NhbGVTcGVjIiwiZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlIiwiZm9ybWF0RnVuYyIsImdldFdlZWtkYXlNaW5JbkxvY2FsZSIsImdldFdlZWtkYXlTaG9ydEluTG9jYWxlIiwiZ2V0TW9udGhJbkxvY2FsZSIsIm1vbnRoIiwic2V0TW9udGgiLCJnZXRNb250aFNob3J0SW5Mb2NhbGUiLCJnZXRRdWFydGVyU2hvcnRJbkxvY2FsZSIsInF1YXJ0ZXIiLCJzZXRRdWFydGVyIiwiaXNEYXlEaXNhYmxlZCIsIl9yZWYzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwibWF4RGF0ZSIsImV4Y2x1ZGVEYXRlcyIsImV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIiwiaW5jbHVkZURhdGVzIiwiaW5jbHVkZURhdGVJbnRlcnZhbHMiLCJmaWx0ZXJEYXRlIiwiaXNPdXRPZkJvdW5kcyIsInNvbWUiLCJleGNsdWRlRGF0ZSIsIl9yZWY0IiwiaW5jbHVkZURhdGUiLCJfcmVmNSIsImlzRGF5RXhjbHVkZWQiLCJfcmVmNiIsIl9yZWY3IiwiaXNNb250aERpc2FibGVkIiwiX3JlZjgiLCJlbmRPZk1vbnRoIiwiaXNNb250aEluUmFuZ2UiLCJtIiwic3RhcnREYXRlWWVhciIsImdldFllYXIiLCJzdGFydERhdGVNb250aCIsImdldE1vbnRoIiwiZW5kRGF0ZVllYXIiLCJlbmREYXRlTW9udGgiLCJkYXlZZWFyIiwiaXNRdWFydGVyRGlzYWJsZWQiLCJfcmVmOSIsImlzWWVhckluUmFuZ2UiLCJ5ZWFyIiwic3RhcnRZZWFyIiwiZW5kWWVhciIsImlzWWVhckRpc2FibGVkIiwiX3JlZjEwIiwiZW5kT2ZZZWFyIiwiaXNRdWFydGVySW5SYW5nZSIsInEiLCJzdGFydERhdGVRdWFydGVyIiwiZ2V0UXVhcnRlciIsImVuZERhdGVRdWFydGVyIiwiX3JlZjExIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiaXNUaW1lSW5MaXN0IiwidGltZSIsInRpbWVzIiwibGlzdFRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiaXNUaW1lRGlzYWJsZWQiLCJfcmVmMTIiLCJleGNsdWRlVGltZXMiLCJpbmNsdWRlVGltZXMiLCJmaWx0ZXJUaW1lIiwiaXNUaW1lSW5EaXNhYmxlZFJhbmdlIiwiX3JlZjEzIiwibWluVGltZSIsIm1heFRpbWUiLCJFcnJvciIsImJhc2VUaW1lIiwibWluIiwibWF4IiwibW9udGhEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNCIsInByZXZpb3VzTW9udGgiLCJzdWJNb250aHMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyIsImV2ZXJ5IiwibW9udGhEaXNhYmxlZEFmdGVyIiwiX3JlZjE1IiwibmV4dE1vbnRoIiwiYWRkTW9udGhzIiwicXVhcnRlckRpc2FibGVkQmVmb3JlIiwiX3JlZjE2IiwiZmlyc3REYXRlT2ZZZWFyIiwicHJldmlvdXNRdWFydGVyIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwicXVhcnRlckRpc2FibGVkQWZ0ZXIiLCJfcmVmMTciLCJsYXN0RGF0ZU9mWWVhciIsIm5leHRRdWFydGVyIiwiYWRkUXVhcnRlcnMiLCJ5ZWFyRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTgiLCJwcmV2aW91c1llYXIiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQmVmb3JlIiwiX3JlZjE5IiwiX3JlZjE5JHllYXJJdGVtTnVtYmVyIiwieWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QiLCJnZXRZZWFyc1BlcmlvZCIsImVuZFBlcmlvZCIsIm1pbkRhdGVZZWFyIiwieWVhckRpc2FibGVkQWZ0ZXIiLCJfcmVmMjAiLCJuZXh0WWVhciIsImFkZFllYXJzIiwieWVhcnNEaXNhYmxlZEFmdGVyIiwiX3JlZjIxIiwiX3JlZjIxJHllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kMiIsInN0YXJ0UGVyaW9kIiwibWF4RGF0ZVllYXIiLCJnZXRFZmZlY3RpdmVNaW5EYXRlIiwiX3JlZjIyIiwibWluRGF0ZXMiLCJmaWx0ZXIiLCJnZXRFZmZlY3RpdmVNYXhEYXRlIiwiX3JlZjIzIiwibWF4RGF0ZXMiLCJnZXRIaWdodExpZ2h0RGF5c01hcCIsImhpZ2hsaWdodERhdGVzIiwiZGVmYXVsdENsYXNzTmFtZSIsImRhdGVDbGFzc2VzIiwiTWFwIiwiaSIsImxlbiIsIm9iaiIsImlzRGF0ZSIsImtleSIsImNsYXNzTmFtZXNBcnIiLCJnZXQiLCJpbmNsdWRlcyIsInB1c2giLCJzZXQiLCJfdHlwZW9mIiwia2V5cyIsIk9iamVjdCIsImNsYXNzTmFtZSIsImFyck9mRGF0ZXMiLCJjb25zdHJ1Y3RvciIsImsiLCJhcnJheXNBcmVFcXVhbCIsImFycmF5MSIsImFycmF5MiIsImluZGV4IiwiZ2V0SG9saWRheXNNYXAiLCJob2xpZGF5RGF0ZXMiLCJob2xpZGF5IiwiZGF0ZU9iaiIsImhvbGlkYXlOYW1lIiwiY2xhc3NOYW1lc09iaiIsImhvbGlkYXlOYW1lQXJyIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwidGltZXNUb0luamVjdEFmdGVyIiwiY3VycmVudFRpbWUiLCJjdXJyZW50TXVsdGlwbGllciIsImludGVydmFscyIsImluamVjdGVkVGltZXMiLCJsIiwiaW5qZWN0ZWRUaW1lIiwiYWRkSG91cnMiLCJhZGRNaW51dGVzIiwiYWRkU2Vjb25kcyIsIm5leHRUaW1lIiwiaXNBZnRlciIsImFkZFplcm8iLCJNYXRoIiwiY2VpbCIsImdldEhvdXJzSW5EYXkiLCJnZXRGdWxsWWVhciIsImdldERhdGUiLCJzdGFydE9mVGhlTmV4dERheSIsInJvdW5kIiwic3RhcnRPZk1pbnV0ZSIsInNlY29uZHMiLCJtaWxsaXNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJnZXRUaW1lIiwiaXNTYW1lTWludXRlIiwiZDEiLCJkMiIsImdldE1pZG5pZ2h0RGF0ZSIsImRhdGVXaXRob3V0VGltZSIsImlzRGF0ZUJlZm9yZSIsImRhdGVUb0NvbXBhcmUiLCJtaWRuaWdodERhdGUiLCJtaWRuaWdodERhdGVUb0NvbXBhcmUiLCJpc1NwYWNlS2V5RG93biIsImV2ZW50IiwiU1BBQ0VfS0VZIiwiZ2VuZXJhdGVZZWFycyIsIm5vT2ZZZWFyIiwibGlzdCIsIm5ld1llYXIiLCJpc0luUmFuZ2UiLCJZZWFyRHJvcGRvd25PcHRpb25zIiwiX1JlYWN0JENvbXBvbmVudCIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIl9kZWZpbmVQcm9wZXJ0eSIsInNlbGVjdGVkWWVhciIsIm9wdGlvbnMiLCJzdGF0ZSIsInllYXJzTGlzdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIm9uQ2xpY2siLCJvbkNoYW5nZSIsImJpbmQiLCJtaW5ZZWFyIiwibWF4WWVhciIsImZpbmQiLCJ1bnNoaWZ0IiwiaW5jcmVtZW50WWVhcnMiLCJkZWNyZW1lbnRZZWFycyIsIm9uQ2FuY2VsIiwiYW1vdW50IiwieWVhcnMiLCJzZXRTdGF0ZSIsInNoaWZ0WWVhcnMiLCJ5ZWFyRHJvcGRvd25JdGVtTnVtYmVyIiwic2Nyb2xsYWJsZVllYXJEcm9wZG93biIsImRyb3Bkb3duUmVmIiwiY3JlYXRlUmVmIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkN1cnJlbnQiLCJjdXJyZW50IiwiZHJvcGRvd25DdXJyZW50Q2hpbGRyZW4iLCJjaGlsZHJlbiIsImZyb20iLCJzZWxlY3RlZFllYXJPcHRpb25FbCIsImNoaWxkRWwiLCJhcmlhU2VsZWN0ZWQiLCJzY3JvbGxUb3AiLCJvZmZzZXRUb3AiLCJjbGllbnRIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJyZW5kZXIiLCJkcm9wZG93bkNsYXNzIiwiY2xzeCIsInJlZiIsInJlbmRlck9wdGlvbnMiLCJDb21wb25lbnQiLCJXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyIsIm9uQ2xpY2tPdXRzaWRlIiwiWWVhckRyb3Bkb3duIiwiX2xlbiIsImFyZ3MiLCJfa2V5IiwiZHJvcGRvd25WaXNpYmxlIiwiZSIsInRhcmdldCIsIm9uU2VsZWN0Q2hhbmdlIiwicmVuZGVyU2VsZWN0T3B0aW9ucyIsInZpc2libGUiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJ0b2dnbGVEcm9wZG93biIsInJlc3VsdCIsInJlbmRlclJlYWRWaWV3IiwicmVuZGVyRHJvcGRvd24iLCJhZGp1c3REYXRlT25DaGFuZ2UiLCJoYW5kbGVZZWFyQ2hhbmdlIiwib25TZWxlY3QiLCJzZXRPcGVuIiwicmVuZGVyZWREcm9wZG93biIsImRyb3Bkb3duTW9kZSIsInJlbmRlclNjcm9sbE1vZGUiLCJyZW5kZXJTZWxlY3RNb2RlIiwiTW9udGhEcm9wZG93bk9wdGlvbnMiLCJtb250aE5hbWVzIiwiaXNTZWxlY3RlZE1vbnRoIiwiV3JhcHBlZE1vbnRoRHJvcGRvd25PcHRpb25zIiwiTW9udGhEcm9wZG93biIsIk0iLCJfdGhpczIiLCJ1c2VTaG9ydE1vbnRoSW5Ecm9wZG93biIsInV0aWxzIiwiZ2VuZXJhdGVNb250aFllYXJzIiwiY3VyckRhdGUiLCJsYXN0RGF0ZSIsIk1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIm1vbnRoWWVhcnNMaXN0IiwibW9udGhZZWFyIiwibW9udGhZZWFyUG9pbnQiLCJpc1NhbWVNb250aFllYXIiLCJzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24iLCJXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwiTW9udGhZZWFyRHJvcGRvd24iLCJ0aW1lUG9pbnQiLCJ5ZWFyTW9udGgiLCJjaGFuZ2VkRGF0ZSIsInBhcnNlSW50IiwiRGF5IiwiaXNEaXNhYmxlZCIsIm9uTW91c2VFbnRlciIsImV2ZW50S2V5IiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVPbktleURvd24iLCJvdGhlciIsIl90aGlzJHByb3BzJHNlbGVjdGVkRCIsImRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uIiwiaXNTZWxlY3RlZERhdGUiLCJzZWxlY3RzTXVsdGlwbGUiLCJzZWxlY3RlZERhdGVzIiwiaXNTYW1lRGF5T3JXZWVrIiwic2VsZWN0ZWQiLCJwcmVTZWxlY3Rpb24iLCJzaG93V2Vla1BpY2tlciIsImlzU2FtZVdlZWsiLCJfdGhpcyRwcm9wcyIsImRheVN0ciIsIl90aGlzJHByb3BzMiIsImhvbGlkYXlzIiwiaGFzIiwiX3RoaXMkcHJvcHMzIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nIiwiX3RoaXMkcHJvcHM0Iiwic2VsZWN0c1N0YXJ0Iiwic2VsZWN0c0VuZCIsInNlbGVjdHNSYW5nZSIsInNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlIiwic2VsZWN0aW5nRGF0ZSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzIiLCJpc0luU2VsZWN0aW5nUmFuZ2UiLCJfdGhpcyRwcm9wczUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmczIiwiX3RoaXMkcHJvcHM2IiwiX3RoaXMkcHJvcHM3IiwiX3RoaXMkcHJvcHM4Iiwid2Vla2RheSIsImdldERheSIsIl90aGlzJHByb3BzJHNlbGVjdGVkRDIiLCJkYXlDbGFzc05hbWUiLCJpc0V4Y2x1ZGVkIiwiaXNTZWxlY3RlZCIsImlzS2V5Ym9hcmRTZWxlY3RlZCIsImlzUmFuZ2VTdGFydCIsImlzUmFuZ2VFbmQiLCJpc1NlbGVjdGluZ1JhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ1JhbmdlRW5kIiwiaXNDdXJyZW50RGF5IiwiaXNXZWVrZW5kIiwiaXNBZnRlck1vbnRoIiwiaXNCZWZvcmVNb250aCIsImdldEhpZ2hMaWdodGVkQ2xhc3MiLCJnZXRIb2xpZGF5c0NsYXNzIiwiX3RoaXMkcHJvcHM5IiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlIiwiYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUyIiwiYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkIiwicHJlZml4IiwiX3RoaXMkcHJvcHMxMCIsIl90aGlzJHByb3BzMTAkaG9saWRheSIsImNvbXBhcmVEdCIsInRpdGxlcyIsImFwcGx5IiwiaG9saWRheU5hbWVzIiwibWVzc2FnZSIsInNlbGVjdGVkRGF5IiwicHJlU2VsZWN0aW9uRGF5IiwidGFiSW5kZXgiLCJzaG93V2Vla051bWJlciIsImlzU3RhcnRPZldlZWsiLCJfdGhpcyRkYXlFbCRjdXJyZW50IiwicHJldlByb3BzIiwic2hvdWxkRm9jdXNEYXkiLCJnZXRUYWJJbmRleCIsImlzSW5wdXRGb2N1c2VkIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiYm9keSIsImlubGluZSIsInNob3VsZEZvY3VzRGF5SW5saW5lIiwiY29udGFpbmVyUmVmIiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQiLCJkYXlFbCIsImZvY3VzIiwicHJldmVudFNjcm9sbCIsInJlbmRlckRheUNvbnRlbnRzIiwiZ2V0Q2xhc3NOYW1lcyIsIm9uS2V5RG93biIsImhhbmRsZUNsaWNrIiwidXNlUG9pbnRlckV2ZW50IiwiaGFuZGxlTW91c2VFbnRlciIsIm9uUG9pbnRlckVudGVyIiwiZ2V0QXJpYUxhYmVsIiwicm9sZSIsInRpdGxlIiwiZ2V0VGl0bGUiLCJoYW5kbGVGb2N1c0RheSIsImNvbXBvbmVudERpZFVwZGF0ZSIsIldlZWtOdW1iZXIiLCJzaG91bGRGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyRWwiLCJoYW5kbGVGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyIiwiX3RoaXMkcHJvcHMkYXJpYUxhYmVsIiwiYXJpYUxhYmVsUHJlZml4Iiwid2Vla051bWJlckNsYXNzZXMiLCJXZWVrIiwib25EYXlDbGljayIsIm9uRGF5TW91c2VFbnRlciIsIm9uV2Vla1NlbGVjdCIsImhhbmRsZURheUNsaWNrIiwic2hvdWxkQ2xvc2VPblNlbGVjdCIsImZvcm1hdFdlZWtOdW1iZXIiLCJkYXlzIiwib25DbGlja0FjdGlvbiIsImhhbmRsZVdlZWtDbGljayIsIm9mZnNldCIsImFkZERheXMiLCJjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXgiLCJkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCIsInZhbHVlT2YiLCJoYW5kbGVEYXlNb3VzZUVudGVyIiwicmVuZGVyRGF5cyIsIkZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UIiwiTU9OVEhfQ09MVU1OU19MQVlPVVQiLCJUV09fQ09MVU1OUyIsIlRIUkVFX0NPTFVNTlMiLCJGT1VSX0NPTFVNTlMiLCJNT05USF9DT0xVTU5TIiwiZ3JpZCIsInZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldCIsIk1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQiLCJnZXRNb250aENvbHVtbnNMYXlvdXQiLCJzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlciIsInNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIiLCJNb250aCIsIm9yZGVySW5EaXNwbGF5Iiwib25Nb3VzZUxlYXZlIiwiaXNJblNlbGVjdGluZ1JhbmdlTW9udGgiLCJfbW9udGgiLCJfdGhpcyRwcm9wcyRzZWxlY3Rpbmc0Iiwid2Vla3MiLCJpc0ZpeGVkSGVpZ2h0IiwiZml4ZWRIZWlnaHQiLCJicmVha0FmdGVyTmV4dFB1c2giLCJjdXJyZW50V2Vla1N0YXJ0Iiwid2Vla0FyaWFMYWJlbFByZWZpeCIsInNob3dXZWVrTnVtYmVycyIsImlzRml4ZWRBbmRGaW5hbFdlZWsiLCJpc05vbkZpeGVkQW5kT3V0T2ZNb250aCIsImlzV2Vla0luTW9udGgiLCJwZWVrTmV4dE1vbnRoIiwibGFiZWxEYXRlIiwibmV3TW9udGgiLCJzZXRQcmVTZWxlY3Rpb24iLCJNT05USF9SRUZTIiwiaGFuZGxlT25Nb250aEtleURvd24iLCJtb250aENvbHVtbnNMYXlvdXQiLCJ2ZXJ0aWNhbE9mZnNldCIsIm1vbnRoc0dyaWQiLCJvbk1vbnRoQ2xpY2siLCJoYW5kbGVNb250aE5hdmlnYXRpb24iLCJuZXdRdWFydGVyIiwiUVVBUlRFUl9SRUZTIiwib25RdWFydGVyQ2xpY2siLCJoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiIsIl90aGlzJHByb3BzMTEiLCJtb250aENsYXNzTmFtZSIsIl9tb250aENsYXNzTmFtZSIsImlzUmFuZ2VTdGFydE1vbnRoIiwiaXNSYW5nZUVuZE1vbnRoIiwiaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQiLCJpc0N1cnJlbnRNb250aCIsInByZVNlbGVjdGVkTW9udGgiLCJwcmVTZWxlY3RlZFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczEyIiwiX3RoaXMkcHJvcHMxMiRjaG9vc2VEIiwiX3RoaXMkcHJvcHMxMiRkaXNhYmxlIiwiX3RoaXMkcHJvcHMxMyIsImlzU2VsZWN0ZWRRdWFydGVyIiwiaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciIsImlzUmFuZ2VTdGFydFF1YXJ0ZXIiLCJpc1JhbmdlRW5kUXVhcnRlciIsIl90aGlzJHByb3BzMTQiLCJzaG93RnVsbE1vbnRoWWVhclBpY2tlciIsInJlbmRlck1vbnRoQ29udGVudCIsInNob3J0TW9udGhUZXh0IiwiZnVsbE1vbnRoVGV4dCIsIl90aGlzJHByb3BzMTUiLCJyZW5kZXJRdWFydGVyQ29udGVudCIsInNob3J0UXVhcnRlciIsIl90aGlzJHByb3BzMTYiLCJtb250aENvbHVtbnMiLCJqIiwiZXYiLCJvbk1vbnRoS2V5RG93biIsIm9uTW9udGhNb3VzZUVudGVyIiwiZ2V0TW9udGhDbGFzc05hbWVzIiwiZ2V0TW9udGhDb250ZW50IiwiX3RoaXMkcHJvcHMxNyIsInF1YXJ0ZXJzIiwib25RdWFydGVyS2V5RG93biIsIm9uUXVhcnRlck1vdXNlRW50ZXIiLCJnZXRRdWFydGVyQ2xhc3NOYW1lcyIsImdldFF1YXJ0ZXJUYWJJbmRleCIsImlzQ3VycmVudFF1YXJ0ZXIiLCJnZXRRdWFydGVyQ29udGVudCIsIl90aGlzJHByb3BzMTgiLCJzaG93TW9udGhZZWFyUGlja2VyIiwic2hvd1F1YXJ0ZXJZZWFyUGlja2VyIiwiX3RoaXMkcHJvcHMxOSIsIl90aGlzJHByb3BzMTkkYXJpYUxhYiIsImZvcm1hdHRlZEFyaWFMYWJlbFByZWZpeCIsInRyaW0iLCJoYW5kbGVNb3VzZUxlYXZlIiwib25Qb2ludGVyTGVhdmUiLCJyZW5kZXJNb250aHMiLCJyZW5kZXJRdWFydGVycyIsInJlbmRlcldlZWtzIiwiVGltZSIsImhlaWdodCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNlbnRlckxpIiwiY2FsY0NlbnRlclBvc2l0aW9uIiwibW9udGhSZWYiLCJoZWFkZXIiLCJjbGFzc2VzIiwidGltZUNsYXNzTmFtZSIsImlzU2VsZWN0ZWRUaW1lIiwiaXNEaXNhYmxlZFRpbWUiLCJpbmplY3RUaW1lcyIsInByZXZpb3VzU2libGluZyIsIm5leHRTaWJsaW5nIiwiYWN0aXZlRGF0ZSIsIm9wZW5Ub0RhdGUiLCJiYXNlIiwic29ydGVkSW5qZWN0VGltZXMiLCJzb3J0IiwiYSIsImIiLCJtaW51dGVzSW5EYXkiLCJtdWx0aXBsaWVyIiwidGltZXNUb0luamVjdCIsInRpbWVUb0ZvY3VzIiwicmVkdWNlIiwicHJldiIsImxpQ2xhc3NlcyIsImxpIiwic2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUiLCJ0b2RheUJ1dHRvbiIsInNob3dUaW1lU2VsZWN0T25seSIsInRpbWVDYXB0aW9uIiwicmVuZGVyVGltZXMiLCJvblRpbWVDaGFuZ2UiLCJsaXN0SGVpZ2h0IiwiY2VudGVyTGlSZWYiLCJWRVJUSUNBTF9OQVZJR0FUSU9OX09GRlNFVCIsIlllYXIiLCJyZWZJbmRleCIsIndhaXRGb3JSZVJlbmRlciIsIllFQVJfUkVGUyIsIl91dGlscyRnZXRZZWFyc1BlcmlvZCIsInVwZGF0ZUZvY3VzT25QYWdpbmF0ZSIsImFicyIsInkiLCJfeWVhciIsImhhbmRsZVllYXJDbGljayIsIm9uWWVhckNsaWNrIiwiaGFuZGxlWWVhck5hdmlnYXRpb24iLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QyIiwibGVmdE92ZXJPZmZzZXQiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QzIiwieWVhckNsYXNzTmFtZSIsImlzQ3VycmVudFllYXIiLCJwcmVTZWxlY3RlZCIsInJlbmRlclllYXJDb250ZW50Iiwib25ZZWFyTW91c2VFbnRlciIsIm9uWWVhck1vdXNlTGVhdmUiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2Q0IiwiX2xvb3AiLCJvblllYXJLZXlEb3duIiwiZ2V0WWVhclRhYkluZGV4IiwiZ2V0WWVhckNsYXNzTmFtZXMiLCJnZXRZZWFyQ29udGVudCIsImdldFllYXJDb250YWluZXJDbGFzc05hbWVzIiwiY2xlYXJTZWxlY3RpbmdEYXRlIiwiaW5wdXRUaW1lIiwicHJvcERhdGUiLCJpc1Byb3BEYXRlVmFsaWQiLCJpc05hTiIsInNwbGl0IiwidGltZVN0cmluZyIsImN1c3RvbVRpbWVJbnB1dCIsImNsb25lRWxlbWVudCIsInR5cGUiLCJwbGFjZWhvbGRlciIsIm5hbWUiLCJyZXF1aXJlZCIsInRpbWVJbnB1dExhYmVsIiwicmVuZGVyVGltZUlucHV0IiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwiQ2FsZW5kYXJDb250YWluZXIiLCJfcmVmJHNob3dUaW1lU2VsZWN0T24iLCJfcmVmJHNob3dUaW1lIiwic2hvd1RpbWUiLCJhcmlhTGFiZWwiLCJEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTIiwiaXNEcm9wZG93blNlbGVjdCIsImVsZW1lbnQiLCJjbGFzc05hbWVzIiwidGVzdENsYXNzbmFtZSIsImluZGV4T2YiLCJDYWxlbmRhciIsIm9uRHJvcGRvd25Gb2N1cyIsImluaXRpYWxEYXRlIiwiaGFuZGxlTW9udGhDaGFuZ2UiLCJtb250aFNlbGVjdGVkSW4iLCJvbk1vbnRoTW91c2VMZWF2ZSIsInNldFllYXIiLCJvblllYXJDaGFuZ2UiLCJpc1JlbmRlckFyaWFMaXZlTWVzc2FnZSIsImhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlIiwib25Nb250aENoYW5nZSIsImhhbmRsZU1vbnRoWWVhckNoYW5nZSIsImRheU5hbWVzIiwid2Vla0xhYmVsIiwid2Vla0RheU5hbWUiLCJmb3JtYXRXZWVrZGF5Iiwid2Vla0RheUNsYXNzTmFtZSIsImZvcm1hdFdlZWtEYXkiLCJ1c2VXZWVrZGF5c1Nob3J0Iiwic2hvd1llYXJQaWNrZXIiLCJyZW5kZXJDdXN0b21IZWFkZXIiLCJhbGxQcmV2RGF5c0Rpc2FibGVkIiwiZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uIiwic2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uIiwiaWNvbkNsYXNzZXMiLCJjbGlja0hhbmRsZXIiLCJkZWNyZWFzZU1vbnRoIiwiZGVjcmVhc2VZZWFyIiwiaXNGb3JZZWFyIiwicHJldmlvdXNNb250aEJ1dHRvbkxhYmVsIiwicHJldmlvdXNZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMiLCJwcmV2aW91c01vbnRoQXJpYUxhYmVsIiwiX3RoaXMkcHJvcHMzJHByZXZpb3VzMiIsInByZXZpb3VzWWVhckFyaWFMYWJlbCIsImFsbE5leHREYXlzRGlzYWJsZWQiLCJzaG93VGltZVNlbGVjdCIsImluY3JlYXNlTW9udGgiLCJpbmNyZWFzZVllYXIiLCJuZXh0TW9udGhCdXR0b25MYWJlbCIsIm5leHRZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dE1vbnQiLCJuZXh0TW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dFllYXIiLCJuZXh0WWVhckFyaWFMYWJlbCIsInNob3dZZWFyRHJvcGRvd24iLCJzaG93TW9udGhEcm9wZG93biIsInNob3dNb250aFllYXJEcm9wZG93biIsIm92ZXJyaWRlSGlkZSIsImNoYW5nZVllYXIiLCJjaGFuZ2VNb250aCIsImNoYW5nZU1vbnRoWWVhciIsImhhbmRsZVRvZGF5QnV0dG9uQ2xpY2siLCJtb250aERhdGUiLCJyZW5kZXJDdXJyZW50TW9udGgiLCJvbkZvY3VzIiwiaGFuZGxlRHJvcGRvd25Gb2N1cyIsInJlbmRlck1vbnRoRHJvcGRvd24iLCJyZW5kZXJNb250aFllYXJEcm9wZG93biIsInJlbmRlclllYXJEcm9wZG93biIsImhlYWRlckFyZ3MiLCJtb250aENvbnRhaW5lciIsInByZXZNb250aEJ1dHRvbkRpc2FibGVkIiwibmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQiLCJwcmV2WWVhckJ1dHRvbkRpc2FibGVkIiwibmV4dFllYXJCdXR0b25EaXNhYmxlZCIsInNob3dEYXlOYW1lcyIsIl9vYmplY3RTcHJlYWQiLCJjdXN0b21IZWFkZXJDb3VudCIsInJlbmRlclllYXJIZWFkZXIiLCJyZW5kZXJEZWZhdWx0SGVhZGVyIiwiX3RoaXMkcHJvcHMkbW9udGhTZWxlIiwibW9udGhMaXN0IiwibW9udGhzVG9TdWJ0cmFjdCIsInNob3dQcmV2aW91c01vbnRocyIsIm1vbnRoc1Nob3duIiwiZnJvbU1vbnRoRGF0ZSIsIm1vbnRoc1RvQWRkIiwibW9udGhLZXkiLCJkaXYiLCJyZW5kZXJIZWFkZXIiLCJtb250aEFyaWFMYWJlbFByZWZpeCIsImhhbmRsZU9uRGF5S2V5RG93biIsImhhbmRsZU1vbnRoTW91c2VMZWF2ZSIsIl9leHRlbmRzIiwiaGFuZGxlWWVhck1vdXNlRW50ZXIiLCJoYW5kbGVZZWFyTW91c2VMZWF2ZSIsInRpbWVGb3JtYXQiLCJ0aW1lSW50ZXJ2YWxzIiwid2l0aFBvcnRhbCIsInRpbWVWYWxpZCIsIkJvb2xlYW4iLCJzaG93VGltZUlucHV0IiwiSW5wdXRUaW1lIiwiYXJpYUxpdmVNZXNzYWdlIiwiZ2V0RGF0ZUluVmlldyIsImFzc2lnbk1vbnRoQ29udGFpbmVyIiwiX3RoaXMzIiwiaGFzTW9udGhDaGFuZ2VkIiwiQ29udGFpbmVyIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInJlbmRlckFyaWFMaXZlUmVnaW9uIiwicmVuZGVyUHJldmlvdXNCdXR0b24iLCJyZW5kZXJOZXh0QnV0dG9uIiwicmVuZGVyWWVhcnMiLCJyZW5kZXJUb2RheUJ1dHRvbiIsInJlbmRlclRpbWVTZWN0aW9uIiwicmVuZGVySW5wdXRUaW1lU2VjdGlvbiIsInJlbmRlckNoaWxkcmVuIiwiQ2FsZW5kYXJJY29uIiwiaWNvbiIsIl9yZWYkY2xhc3NOYW1lIiwiZGVmYXVsdENsYXNzIiwiaXNWYWxpZEVsZW1lbnQiLCJ4bWxucyIsInZpZXdCb3giLCJQb3J0YWwiLCJlbCIsInBvcnRhbFJvb3QiLCJwb3J0YWxIb3N0IiwiZ2V0RWxlbWVudEJ5SWQiLCJwb3J0YWxJZCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVDaGlsZCIsIlJlYWN0RE9NIiwiY3JlYXRlUG9ydGFsIiwiZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciIsImZvY3VzYWJsZUZpbHRlciIsIm5vZGUiLCJkaXNhYmxlZCIsIlRhYkxvb3AiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFiTG9vcFJlZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YWJDaGlsZHJlbiIsImdldFRhYkNoaWxkcmVuIiwiZW5hYmxlVGFiTG9vcCIsImhhbmRsZUZvY3VzU3RhcnQiLCJoYW5kbGVGb2N1c0VuZCIsIndpdGhGbG9hdGluZyIsIldpdGhGbG9hdGluZyIsImFsdF9wcm9wcyIsInBvcHBlck1vZGlmaWVycyIsInBvcHBlclByb3BzIiwiaGlkZVBvcHBlciIsImFycm93UmVmIiwidXNlUmVmIiwiZmxvYXRpbmdQcm9wcyIsInVzZUZsb2F0aW5nIiwib3BlbiIsIndoaWxlRWxlbWVudHNNb3VudGVkIiwiYXV0b1VwZGF0ZSIsInBsYWNlbWVudCIsInBvcHBlclBsYWNlbWVudCIsIm1pZGRsZXdhcmUiLCJmbGlwIiwicGFkZGluZyIsImFycm93IiwiUG9wcGVyQ29tcG9uZW50Iiwid3JhcHBlckNsYXNzTmFtZSIsInBvcHBlckNvbXBvbmVudCIsInRhcmdldENvbXBvbmVudCIsInBvcHBlck9uS2V5RG93biIsInNob3dBcnJvdyIsInBvcHBlciIsInJlZnMiLCJzZXRGbG9hdGluZyIsImZsb2F0aW5nU3R5bGVzIiwiRmxvYXRpbmdBcnJvdyIsImNvbnRleHQiLCJmaWxsIiwic3Ryb2tlV2lkdGgiLCJ3aWR0aCIsInRyYW5zZm9ybSIsInBvcHBlckNvbnRhaW5lciIsIndyYXBwZXJDbGFzc2VzIiwiRnJhZ21lbnQiLCJzZXRSZWZlcmVuY2UiLCJvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyIsIldyYXBwZWRDYWxlbmRhciIsImhhc1ByZVNlbGVjdGlvbkNoYW5nZWQiLCJJTlBVVF9FUlJfMSIsIkRhdGVQaWNrZXIiLCJfdGhpcyRwcm9wcyRob2xpZGF5cyIsImFjY3VtdWxhdG9yIiwiZGVmYXVsdFByZVNlbGVjdGlvbiIsImdldFByZVNlbGVjdGlvbiIsImJvdW5kZWRQcmVTZWxlY3Rpb24iLCJzdGFydE9wZW4iLCJwcmV2ZW50Rm9jdXMiLCJmb2N1c2VkIiwicHJldmVudEZvY3VzVGltZW91dCIsImNsZWFyVGltZW91dCIsImlucHV0IiwiYmx1ciIsImNhbmNlbEZvY3VzSW5wdXQiLCJza2lwU2V0Qmx1ciIsImNhbGNJbml0aWFsU3RhdGUiLCJsYXN0UHJlU2VsZWN0Q2hhbmdlIiwiUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUiLCJzZXRCbHVyIiwiaW5wdXRWYWx1ZSIsInJlYWRPbmx5IiwicHJldmVudE9wZW5PbkZvY3VzIiwiY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0Iiwic2V0VGltZW91dCIsInNldEZvY3VzIiwiaW5wdXRGb2N1c1RpbWVvdXQiLCJvbkJsdXIiLCJhbGxBcmdzIiwib25DaGFuZ2VSYXciLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCIsImhvdXJzIiwibWludXRlcyIsInNldFNlbGVjdGVkIiwic2VuZEZvY3VzQmFja1RvSW5wdXQiLCJzaG93RGF0ZVNlbGVjdCIsInN3YXBSYW5nZSIsImtlZXBJbnB1dCIsImFsbG93U2FtZURheSIsImZvY3VzU2VsZWN0ZWRNb250aCIsIm5vUmFuZ2VzIiwiaGFzU3RhcnRSYW5nZSIsImlzUmFuZ2VGaWxsZWQiLCJpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkIiwic2VsZWN0ZWREYXRlIiwibmV4dERhdGVzIiwiaGFzTWluRGF0ZSIsImhhc01heERhdGUiLCJpc1ZhbGlkRGF0ZVNlbGVjdGlvbiIsImRhdGVTdGFydE9mRGF5IiwibWluRGF0ZVN0YXJ0T2ZEYXkiLCJtYXhEYXRlRW5kT2ZEYXkiLCJvbklucHV0Q2xpY2siLCJzZWxlY3RvclN0cmluZyIsInNlbGVjdGVkSXRlbSIsImNhbGVuZGFyIiwiY29tcG9uZW50Tm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjb3B5IiwiaW5wdXRPayIsImhhbmRsZVNlbGVjdCIsIm9uSW5wdXRFcnJvciIsImNvZGUiLCJtc2ciLCJpc1NoaWZ0S2V5QWN0aXZlIiwic2hpZnRLZXkiLCJuZXdTZWxlY3Rpb24iLCJzdWJXZWVrcyIsInN1YkRheXMiLCJhZGRXZWVrcyIsInByZXZNb250aCIsInByZXZZZWFyIiwib25DbGVhckNsaWNrIiwiY2xvc2VPblNjcm9sbCIsImRvY3VtZW50RWxlbWVudCIsImlzQ2FsZW5kYXJPcGVuIiwiZWxlbSIsImRhdGVGb3JtYXRDYWxlbmRhciIsImhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlIiwibW9kaWZ5SG9saWRheXMiLCJoYW5kbGVUaW1lQ2hhbmdlIiwiY2FsZW5kYXJDbGFzc05hbWUiLCJjYWxlbmRhckNvbnRhaW5lciIsImV4Y2x1ZGVTY3JvbGxiYXIiLCJvbkRheUtleURvd24iLCJpc0NvbnRhaW5zVGltZSIsImxvbmdEYXRlRm9ybWF0IiwiX1JlYWN0JGNsb25lRWxlbWVudCIsImN1c3RvbUlucHV0IiwiY3VzdG9tSW5wdXRSZWYiLCJoYW5kbGVCbHVyIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlRm9jdXMiLCJvbklucHV0S2V5RG93biIsImlkIiwiZm9ybSIsImF1dG9Gb2N1cyIsInBsYWNlaG9sZGVyVGV4dCIsImF1dG9Db21wbGV0ZSIsImFyaWFEZXNjcmliZWRCeSIsImFyaWFJbnZhbGlkIiwiYXJpYUxhYmVsbGVkQnkiLCJhcmlhUmVxdWlyZWQiLCJpc0NsZWFyYWJsZSIsImNsZWFyQnV0dG9uVGl0bGUiLCJfdGhpcyRwcm9wczQkY2xlYXJCdXQiLCJjbGVhckJ1dHRvbkNsYXNzTmFtZSIsIl90aGlzJHByb3BzNCRhcmlhTGFiZSIsImFyaWFMYWJlbENsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU2Nyb2xsIiwicHJldlN0YXRlIiwib25DYWxlbmRhck9wZW4iLCJvbkNhbGVuZGFyQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVySW5wdXRDb250YWluZXIiLCJzaG93SWNvbiIsImNhbGVuZGFySWNvbkNsYXNzbmFtZSIsInRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2siLCJ0b2dnbGVDYWxlbmRhciIsInJlbmRlckRhdGVJbnB1dCIsInJlbmRlckNsZWFyQnV0dG9uIiwicmVuZGVyQ2FsZW5kYXIiLCJwb3J0YWxDb250YWluZXIiLCJvblBvcnRhbEtleURvd24iLCJwb3BwZXJDbGFzc05hbWUiLCJvblBvcHBlcktleURvd24iLCJzaG93UG9wcGVyQXJyb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJETyxJQUFNQSx3QkFBd0IsR0FBRyxFQUFFLENBQUE7O0FBRTFDO0FBQ0E7QUFDQSxJQUFNQywwQkFB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
