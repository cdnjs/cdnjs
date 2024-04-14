/*!
  react-datepicker v6.7.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlX3V0aWxzLmpzIiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi5qc3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMvbW9udGhfZHJvcGRvd24uanN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi5qc3giLCIuLi9zcmMvZGF5LmpzeCIsIi4uL3NyYy93ZWVrX251bWJlci5qc3giLCIuLi9zcmMvd2Vlay5qc3giLCIuLi9zcmMvbW9udGguanN4IiwiLi4vc3JjL3RpbWUuanN4IiwiLi4vc3JjL3llYXIuanN4IiwiLi4vc3JjL2lucHV0VGltZS5qc3giLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLmpzeCIsIi4uL3NyYy9jYWxlbmRhci5qc3giLCIuLi9zcmMvY2FsZW5kYXJfaWNvbi5qc3giLCIuLi9zcmMvcG9ydGFsLmpzeCIsIi4uL3NyYy90YWJfbG9vcC5qc3giLCIuLi9zcmMvd2l0aF9mbG9hdGluZy5qc3giLCIuLi9zcmMvcG9wcGVyX2NvbXBvbmVudC5qc3giLCIuLi9zcmMvaW5kZXguanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc0RhdGVcIjtcbmltcG9ydCB7IGlzVmFsaWQgYXMgaXNWYWxpZERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHsgZm9ybWF0LCBsb25nRm9ybWF0dGVycyB9IGZyb20gXCJkYXRlLWZucy9mb3JtYXRcIjtcbmltcG9ydCB7IGFkZE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkTWludXRlc1wiO1xuaW1wb3J0IHsgYWRkSG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkSG91cnNcIjtcbmltcG9ydCB7IGFkZERheXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkRGF5c1wiO1xuaW1wb3J0IHsgYWRkV2Vla3MgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkV2Vla3NcIjtcbmltcG9ydCB7IGFkZE1vbnRocyB9IGZyb20gXCJkYXRlLWZucy9hZGRNb250aHNcIjtcbmltcG9ydCB7IGFkZFF1YXJ0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBhZGRZZWFycyB9IGZyb20gXCJkYXRlLWZucy9hZGRZZWFyc1wiO1xuaW1wb3J0IHsgc3ViRGF5cyB9IGZyb20gXCJkYXRlLWZucy9zdWJEYXlzXCI7XG5pbXBvcnQgeyBzdWJXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9zdWJXZWVrc1wiO1xuaW1wb3J0IHsgc3ViTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL3N1Yk1vbnRoc1wiO1xuaW1wb3J0IHsgc3ViUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViUXVhcnRlcnNcIjtcbmltcG9ydCB7IHN1YlllYXJzIH0gZnJvbSBcImRhdGUtZm5zL3N1YlllYXJzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL2dldFNlY29uZHNcIjtcbmltcG9ydCB7IGdldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0TWludXRlc1wiO1xuaW1wb3J0IHsgZ2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0SG91cnNcIjtcbmltcG9ydCB7IGdldERheSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXlcIjtcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0RGF0ZVwiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCJkYXRlLWZucy9nZXRJU09XZWVrXCI7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9nZXRNb250aFwiO1xuaW1wb3J0IHsgZ2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9nZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2dldFllYXJcIjtcbmltcG9ydCB7IGdldFRpbWUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0VGltZVwiO1xuaW1wb3J0IHsgc2V0U2Vjb25kcyB9IGZyb20gXCJkYXRlLWZucy9zZXRTZWNvbmRzXCI7XG5pbXBvcnQgeyBzZXRNaW51dGVzIH0gZnJvbSBcImRhdGUtZm5zL3NldE1pbnV0ZXNcIjtcbmltcG9ydCB7IHNldEhvdXJzIH0gZnJvbSBcImRhdGUtZm5zL3NldEhvdXJzXCI7XG5pbXBvcnQgeyBzZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9zZXRNb250aFwiO1xuaW1wb3J0IHsgc2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBzZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3NldFllYXJcIjtcbmltcG9ydCB7IG1pbiB9IGZyb20gXCJkYXRlLWZucy9taW5cIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCJkYXRlLWZucy9tYXhcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mV2Vla1wiO1xuaW1wb3J0IHsgc3RhcnRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZNb250aFwiO1xuaW1wb3J0IHsgc3RhcnRPZlF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlF1YXJ0ZXJcIjtcbmltcG9ydCB7IHN0YXJ0T2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZZZWFyXCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mV2Vla1wiO1xuaW1wb3J0IHsgZW5kT2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9lbmRPZk1vbnRoXCI7XG5pbXBvcnQgeyBlbmRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZZZWFyXCI7XG5pbXBvcnQgeyBpc0VxdWFsIGFzIGRmSXNFcXVhbCB9IGZyb20gXCJkYXRlLWZucy9pc0VxdWFsXCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgYXMgZGZJc1NhbWVEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lRGF5XCI7XG5pbXBvcnQgeyBpc1NhbWVNb250aCBhcyBkZklzU2FtZU1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZU1vbnRoXCI7XG5pbXBvcnQgeyBpc1NhbWVZZWFyIGFzIGRmSXNTYW1lWWVhciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVZZWFyXCI7XG5pbXBvcnQgeyBpc1NhbWVRdWFydGVyIGFzIGRmSXNTYW1lUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVRdWFydGVyXCI7XG5pbXBvcnQgeyBpc0FmdGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzQWZ0ZXJcIjtcbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSBcImRhdGUtZm5zL2lzQmVmb3JlXCI7XG5pbXBvcnQgeyBpc1dpdGhpbkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zL2lzV2l0aGluSW50ZXJ2YWxcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCJkYXRlLWZucy90b0RhdGVcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlXCI7XG5pbXBvcnQgeyBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZucy9wYXJzZUlTT1wiO1xuaW1wb3J0IHsgYWRkU2Vjb25kcyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSID0gMTI7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbmNvbnN0IGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1ArcCt8UCt8cCt8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vICoqIERhdGUgQ29uc3RydWN0b3JzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdEYXRlKHZhbHVlKSB7XG4gIGNvbnN0IGQgPSB2YWx1ZVxuICAgID8gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHBhcnNlSVNPKHZhbHVlKVxuICAgICAgOiB0b0RhdGUodmFsdWUpXG4gICAgOiBuZXcgRGF0ZSgpO1xuICByZXR1cm4gaXNWYWxpZChkKSA/IGQgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlKHZhbHVlLCBkYXRlRm9ybWF0LCBsb2NhbGUsIHN0cmljdFBhcnNpbmcsIG1pbkRhdGUpIHtcbiAgbGV0IHBhcnNlZERhdGUgPSBudWxsO1xuICBsZXQgbG9jYWxlT2JqZWN0ID1cbiAgICBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSB8fCBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgbGV0IHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID0gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkpIHtcbiAgICBkYXRlRm9ybWF0LmZvckVhY2goKGRmKSA9PiB7XG4gICAgICBsZXQgdHJ5UGFyc2VEYXRlID0gcGFyc2UodmFsdWUsIGRmLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgICAgICBpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiZcbiAgICAgICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZSh0cnlQYXJzZURhdGUsIGRmLCBsb2NhbGUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCkge1xuICAgICAgICBwYXJzZWREYXRlID0gdHJ5UGFyc2VEYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZWREYXRlO1xuICB9XG5cbiAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LCBuZXcgRGF0ZSgpLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xuXG4gIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgaXNWYWxpZChwYXJzZWREYXRlKSAmJlxuICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUocGFyc2VkRGF0ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlKTtcbiAgfSBlbHNlIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0XG4gICAgICAubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCJwXCIgfHwgZmlyc3RDaGFyYWN0ZXIgPT09IFwiUFwiKSB7XG4gICAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgICByZXR1cm4gbG9jYWxlT2JqZWN0XG4gICAgICAgICAgICA/IGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGVPYmplY3QuZm9ybWF0TG9uZylcbiAgICAgICAgICAgIDogZmlyc3RDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlwiKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSwgbmV3IERhdGUoKSwge1xuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPyBwYXJzZWREYXRlIDogbnVsbDtcbn1cblxuLy8gKiogRGF0ZSBcIlJlZmxlY3Rpb25cIiAqKlxuXG5leHBvcnQgeyBpc0RhdGUgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSwgbWluRGF0ZSkge1xuICBtaW5EYXRlID0gbWluRGF0ZSA/IG1pbkRhdGUgOiBuZXcgRGF0ZShcIjEvMS8xMDAwXCIpO1xuICByZXR1cm4gaXNWYWxpZERhdGUoZGF0ZSkgJiYgIWlzQmVmb3JlKGRhdGUsIG1pbkRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIEZvcm1hdHRpbmcgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0U3RyLCBsb2NhbGUpIHtcbiAgaWYgKGxvY2FsZSA9PT0gXCJlblwiKSB7XG4gICAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgfSk7XG4gIH1cbiAgbGV0IGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChsb2NhbGUpO1xuICBpZiAobG9jYWxlICYmICFsb2NhbGVPYmopIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgQSBsb2NhbGUgb2JqZWN0IHdhcyBub3QgZm91bmQgZm9yIHRoZSBwcm92aWRlZCBzdHJpbmcgW1wiJHtsb2NhbGV9XCJdLmAsXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgIWxvY2FsZU9iaiAmJlxuICAgICEhZ2V0RGVmYXVsdExvY2FsZSgpICYmXG4gICAgISFnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKVxuICApIHtcbiAgICBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqID8gbG9jYWxlT2JqIDogbnVsbCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZUZvcm1hdChkYXRlLCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9KSB7XG4gIHJldHVybiAoXG4gICAgKGRhdGUgJiZcbiAgICAgIGZvcm1hdERhdGUoXG4gICAgICAgIGRhdGUsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkgPyBkYXRlRm9ybWF0WzBdIDogZGF0ZUZvcm1hdCxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgKSkgfHxcbiAgICBcIlwiXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZVJhbmdlRm9ybWF0KHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcHJvcHMpIHtcbiAgaWYgKCFzdGFydERhdGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KHN0YXJ0RGF0ZSwgcHJvcHMpO1xuICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gZW5kRGF0ZSA/IHNhZmVEYXRlRm9ybWF0KGVuZERhdGUsIHByb3BzKSA6IFwiXCI7XG5cbiAgcmV0dXJuIGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZX0gLSAke2Zvcm1hdHRlZEVuZERhdGV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KGRhdGVzLCBwcm9wcykge1xuICBpZiAoIWRhdGVzPy5sZW5ndGgpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBjb25zdCBmb3JtYXR0ZWRGaXJzdERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1swXSwgcHJvcHMpO1xuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlZEZpcnN0RGF0ZTtcbiAgfVxuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kRGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzFdLCBwcm9wcyk7XG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0sICR7Zm9ybWF0dGVkU2Vjb25kRGF0ZX1gO1xuICB9XG5cbiAgY29uc3QgZXh0cmFEYXRlc0NvdW50ID0gZGF0ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0gKCske2V4dHJhRGF0ZXNDb3VudH0pYDtcbn1cblxuLy8gKiogRGF0ZSBTZXR0ZXJzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lKGRhdGUsIHsgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSkge1xuICByZXR1cm4gc2V0SG91cnMoc2V0TWludXRlcyhzZXRTZWNvbmRzKGRhdGUsIHNlY29uZCksIG1pbnV0ZSksIGhvdXIpO1xufVxuXG5leHBvcnQgeyBzZXRNaW51dGVzLCBzZXRIb3Vycywgc2V0TW9udGgsIHNldFF1YXJ0ZXIsIHNldFllYXIgfTtcblxuLy8gKiogRGF0ZSBHZXR0ZXJzICoqXG5cbi8vIGdldERheSBSZXR1cm5zIGRheSBvZiB3ZWVrLCBnZXREYXRlIHJldHVybnMgZGF5IG9mIG1vbnRoXG5leHBvcnQge1xuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgZ2V0TW9udGgsXG4gIGdldFF1YXJ0ZXIsXG4gIGdldFllYXIsXG4gIGdldERheSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0VGltZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIGxvY2FsZSkge1xuICBsZXQgbG9jYWxlT2JqID1cbiAgICAobG9jYWxlICYmIGdldExvY2FsZU9iamVjdChsb2NhbGUpKSB8fFxuICAgIChnZXREZWZhdWx0TG9jYWxlKCkgJiYgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSkpO1xuICByZXR1cm4gZ2V0SVNPV2VlayhkYXRlLCBsb2NhbGVPYmogPyB7IGxvY2FsZTogbG9jYWxlT2JqIH0gOiBudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2Vla0NvZGUoZGF5LCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF5LCBcImRkZFwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiogU3RhcnQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mRGF5KGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mV2VlayhkYXRlLCBsb2NhbGUsIGNhbGVuZGFyU3RhcnREYXkpIHtcbiAgbGV0IGxvY2FsZU9iaiA9IGxvY2FsZVxuICAgID8gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSlcbiAgICA6IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqLFxuICAgIHdlZWtTdGFydHNPbjogY2FsZW5kYXJTdGFydERheSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZk1vbnRoKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlllYXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlllYXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mUXVhcnRlcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mUXVhcnRlcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZUb2RheSgpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkobmV3RGF0ZSgpKTtcbn1cblxuLy8gKioqIEVuZCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mV2VlayhkYXRlKSB7XG4gIHJldHVybiBlbmRPZldlZWsoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mTW9udGgoZGF0ZSk7XG59XG5cbi8vICoqIERhdGUgTWF0aCAqKlxuXG4vLyAqKiogQWRkaXRpb24gKioqXG5cbmV4cG9ydCB7XG4gIGFkZFNlY29uZHMsXG4gIGFkZE1pbnV0ZXMsXG4gIGFkZERheXMsXG4gIGFkZFdlZWtzLFxuICBhZGRNb250aHMsXG4gIGFkZFF1YXJ0ZXJzLFxuICBhZGRZZWFycyxcbn07XG5cbi8vICoqKiBTdWJ0cmFjdGlvbiAqKipcblxuZXhwb3J0IHsgYWRkSG91cnMsIHN1YkRheXMsIHN1YldlZWtzLCBzdWJNb250aHMsIHN1YlF1YXJ0ZXJzLCBzdWJZZWFycyB9O1xuXG4vLyAqKiBEYXRlIENvbXBhcmlzb24gKipcblxuZXhwb3J0IHsgaXNCZWZvcmUsIGlzQWZ0ZXIgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZU1vbnRoKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNFcXVhbChkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgbGV0IHZhbGlkO1xuICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZEYXkoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kID0gZW5kT2ZEYXkoZW5kRGF0ZSk7XG5cbiAgdHJ5IHtcbiAgICB2YWxpZCA9IGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG4vLyAqKiogRGlmZmluZyAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheXNEaWZmKGRhdGUxLCBkYXRlMikge1xuICByZXR1cm4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUxLCBkYXRlMik7XG59XG5cbi8vICoqIERhdGUgTG9jYWxpemF0aW9uICoqXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckxvY2FsZShsb2NhbGVOYW1lLCBsb2NhbGVEYXRhKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgaWYgKCFzY29wZS5fX2xvY2FsZURhdGFfXykge1xuICAgIHNjb3BlLl9fbG9jYWxlRGF0YV9fID0ge307XG4gIH1cbiAgc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlTmFtZV0gPSBsb2NhbGVEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdExvY2FsZShsb2NhbGVOYW1lKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgc2NvcGUuX19sb2NhbGVJZF9fID0gbG9jYWxlTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRMb2NhbGUoKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlSWRfXztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsZU9iamVjdChsb2NhbGVTcGVjKSB7XG4gIGlmICh0eXBlb2YgbG9jYWxlU3BlYyA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgbG9jYWxlIG5hbWUgcmVnaXN0ZXJlZCBieSByZWdpc3RlckxvY2FsZVxuICAgIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG4gICAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlRGF0YV9fID8gc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlU3BlY10gOiBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgcmF3IGRhdGUtZm5zIGxvY2FsZSBvYmplY3RcbiAgICByZXR1cm4gbG9jYWxlU3BlYztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRhdGUsIGZvcm1hdEZ1bmMsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RnVuYyhmb3JtYXREYXRlKGRhdGUsIFwiRUVFRVwiLCBsb2NhbGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXRlLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFRUVcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTExcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoU2hvcnRJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUocXVhcnRlciwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldFF1YXJ0ZXIobmV3RGF0ZSgpLCBxdWFydGVyKSwgXCJRUVFcIiwgbG9jYWxlKTtcbn1cblxuLy8gKiogVXRpbHMgZm9yIHNvbWUgY29tcG9uZW50cyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlEaXNhYmxlZChcbiAgZGF5LFxuICB7XG4gICAgbWluRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICBleGNsdWRlRGF0ZUludGVydmFscyxcbiAgICBpbmNsdWRlRGF0ZXMsXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHMsXG4gICAgZmlsdGVyRGF0ZSxcbiAgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXksIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChleGNsdWRlRGF0ZUludGVydmFscyAmJlxuICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZURheShkYXksIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICAhaW5jbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF5KSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5RXhjbHVkZWQoXG4gIGRheSxcbiAgeyBleGNsdWRlRGF0ZXMsIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIH0gPSB7fSxcbikge1xuICBpZiAoZXhjbHVkZURhdGVJbnRlcnZhbHMgJiYgZXhjbHVkZURhdGVJbnRlcnZhbHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoRGlzYWJsZWQoXG4gIG1vbnRoLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMobW9udGgsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZNb250aChtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mTW9udGgobWF4RGF0ZSksXG4gICAgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUobW9udGgpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBlbmREYXRlLCBtLCBkYXkpIHtcbiAgY29uc3Qgc3RhcnREYXRlWWVhciA9IGdldFllYXIoc3RhcnREYXRlKTtcbiAgY29uc3Qgc3RhcnREYXRlTW9udGggPSBnZXRNb250aChzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVNb250aCA9IGdldE1vbnRoKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVNb250aCA8PSBtICYmIG0gPD0gZW5kRGF0ZU1vbnRoO1xuICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZVllYXIgPCBlbmREYXRlWWVhcikge1xuICAgIHJldHVybiAoXG4gICAgICAoZGF5WWVhciA9PT0gc3RhcnREYXRlWWVhciAmJiBzdGFydERhdGVNb250aCA8PSBtKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVNb250aCA+PSBtKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJEaXNhYmxlZChcbiAgcXVhcnRlcixcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKHF1YXJ0ZXIsIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZVF1YXJ0ZXIocXVhcnRlciwgaW5jbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKHF1YXJ0ZXIpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyXG4gKiBAcGFyYW0ge0RhdGV9IHN0YXJ0XG4gKiBAcGFyYW0ge0RhdGV9IGVuZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJJblJhbmdlKHllYXIsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFpc1ZhbGlkRGF0ZShzdGFydCkgfHwgIWlzVmFsaWREYXRlKGVuZCkpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc3RhcnRZZWFyID0gZ2V0WWVhcihzdGFydCk7XG4gIGNvbnN0IGVuZFllYXIgPSBnZXRZZWFyKGVuZCk7XG5cbiAgcmV0dXJuIHN0YXJ0WWVhciA8PSB5ZWFyICYmIGVuZFllYXIgPj0geWVhcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckRpc2FibGVkKFxuICB5ZWFyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoeWVhciwgMCwgMSk7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXRlLCB7XG4gICAgICBtaW5EYXRlOiBzdGFydE9mWWVhcihtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mWWVhcihtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZVllYXIoZGF0ZSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKGRhdGUpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIHEsIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihlbmREYXRlKTtcbiAgY29uc3QgZGF5WWVhciA9IGdldFllYXIoZGF5KTtcbiAgaWYgKHN0YXJ0RGF0ZVllYXIgPT09IGVuZERhdGVZZWFyICYmIHN0YXJ0RGF0ZVllYXIgPT09IGRheVllYXIpIHtcbiAgICByZXR1cm4gc3RhcnREYXRlUXVhcnRlciA8PSBxICYmIHEgPD0gZW5kRGF0ZVF1YXJ0ZXI7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZVF1YXJ0ZXIgPD0gcSkgfHxcbiAgICAgIChkYXlZZWFyID09PSBlbmREYXRlWWVhciAmJiBlbmREYXRlUXVhcnRlciA+PSBxKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0gPSB7fSkge1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1pbkRhdGUpIDwgMCkgfHxcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF5LCBtYXhEYXRlKSA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkxpc3QodGltZSwgdGltZXMpIHtcbiAgcmV0dXJuIHRpbWVzLnNvbWUoXG4gICAgKGxpc3RUaW1lKSA9PlxuICAgICAgZ2V0SG91cnMobGlzdFRpbWUpID09PSBnZXRIb3Vycyh0aW1lKSAmJlxuICAgICAgZ2V0TWludXRlcyhsaXN0VGltZSkgPT09IGdldE1pbnV0ZXModGltZSksXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVEaXNhYmxlZChcbiAgdGltZSxcbiAgeyBleGNsdWRlVGltZXMsIGluY2x1ZGVUaW1lcywgZmlsdGVyVGltZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICAoZXhjbHVkZVRpbWVzICYmIGlzVGltZUluTGlzdCh0aW1lLCBleGNsdWRlVGltZXMpKSB8fFxuICAgIChpbmNsdWRlVGltZXMgJiYgIWlzVGltZUluTGlzdCh0aW1lLCBpbmNsdWRlVGltZXMpKSB8fFxuICAgIChmaWx0ZXJUaW1lICYmICFmaWx0ZXJUaW1lKHRpbWUpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgeyBtaW5UaW1lLCBtYXhUaW1lIH0pIHtcbiAgaWYgKCFtaW5UaW1lIHx8ICFtYXhUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQm90aCBtaW5UaW1lIGFuZCBtYXhUaW1lIHByb3BzIHJlcXVpcmVkXCIpO1xuICB9XG4gIGNvbnN0IGJhc2UgPSBuZXdEYXRlKCk7XG4gIGNvbnN0IGJhc2VUaW1lID0gc2V0SG91cnMoc2V0TWludXRlcyhiYXNlLCBnZXRNaW51dGVzKHRpbWUpKSwgZ2V0SG91cnModGltZSkpO1xuICBjb25zdCBtaW4gPSBzZXRIb3VycyhcbiAgICBzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXMobWluVGltZSkpLFxuICAgIGdldEhvdXJzKG1pblRpbWUpLFxuICApO1xuICBjb25zdCBtYXggPSBzZXRIb3VycyhcbiAgICBzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXMobWF4VGltZSkpLFxuICAgIGdldEhvdXJzKG1heFRpbWUpLFxuICApO1xuXG4gIGxldCB2YWxpZDtcbiAgdHJ5IHtcbiAgICB2YWxpZCA9ICFpc1dpdGhpbkludGVydmFsKGJhc2VUaW1lLCB7IHN0YXJ0OiBtaW4sIGVuZDogbWF4IH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbnRoRGlzYWJsZWRCZWZvcmUoZGF5LCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgcHJldmlvdXNNb250aCA9IHN1Yk1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG1pbkRhdGUsIHByZXZpb3VzTW9udGgpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRNb250aCA9IGFkZE1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhuZXh0TW9udGgsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWFydGVyRGlzYWJsZWRCZWZvcmUoZGF0ZSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGZpcnN0RGF0ZU9mWWVhciA9IHN0YXJ0T2ZZZWFyKGRhdGUpO1xuICBjb25zdCBwcmV2aW91c1F1YXJ0ZXIgPSBzdWJRdWFydGVycyhmaXJzdERhdGVPZlllYXIsIDEpO1xuXG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhtaW5EYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyKGRhdGUsIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBsYXN0RGF0ZU9mWWVhciA9IGVuZE9mWWVhcihkYXRlKTtcbiAgY29uc3QgbmV4dFF1YXJ0ZXIgPSBhZGRRdWFydGVycyhsYXN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhuZXh0UXVhcnRlciwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c1llYXIgPSBzdWJZZWFycyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobWluRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQmVmb3JlKFxuICBkYXksXG4gIHsgbWluRGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IGdldFN0YXJ0T2ZZZWFyKHN1YlllYXJzKGRheSwgeWVhckl0ZW1OdW1iZXIpKTtcbiAgY29uc3QgeyBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKHByZXZpb3VzWWVhciwgeWVhckl0ZW1OdW1iZXIpO1xuICBjb25zdCBtaW5EYXRlWWVhciA9IG1pbkRhdGUgJiYgZ2V0WWVhcihtaW5EYXRlKTtcbiAgcmV0dXJuIChtaW5EYXRlWWVhciAmJiBtaW5EYXRlWWVhciA+IGVuZFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0WWVhciA9IGFkZFllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhuZXh0WWVhciwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhcnNEaXNhYmxlZEFmdGVyKFxuICBkYXksXG4gIHsgbWF4RGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKG5leHRZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1heERhdGVZZWFyID0gbWF4RGF0ZSAmJiBnZXRZZWFyKG1heERhdGUpO1xuICByZXR1cm4gKG1heERhdGVZZWFyICYmIG1heERhdGVZZWFyIDwgc3RhcnRQZXJpb2QpIHx8IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWluRGF0ZSh7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWluRGF0ZSkge1xuICAgIGxldCBtaW5EYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWluRGF0ZSkgPj0gMCxcbiAgICApO1xuICAgIHJldHVybiBtaW4obWluRGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtaW4oaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWluRGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWF4RGF0ZSkge1xuICAgIGxldCBtYXhEYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWF4RGF0ZSkgPD0gMCxcbiAgICApO1xuICAgIHJldHVybiBtYXgobWF4RGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtYXgoaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWF4RGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlnaHRMaWdodERheXNNYXAoXG4gIGhpZ2hsaWdodERhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhpZ2hsaWdodERhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgb2JqID0gaGlnaGxpZ2h0RGF0ZXNbaV07XG4gICAgaWYgKGlzRGF0ZShvYmopKSB7XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKG9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lc0FyciA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IFtdO1xuICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGRlZmF1bHRDbGFzc05hbWUpKSB7XG4gICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChkZWZhdWx0Q2xhc3NOYW1lKTtcbiAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGtleXNbMF07XG4gICAgICBjb25zdCBhcnJPZkRhdGVzID0gb2JqW2tleXNbMF1dO1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgYXJyT2ZEYXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbiA9IGFyck9mRGF0ZXMubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKGFyck9mRGF0ZXNba10sIFwiTU0uZGQueXl5eVwiKTtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlQ2xhc3Nlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHRoZSB0d28gYXJyYXlzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTFcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MlxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUsIGlmIHRoZSBwYXNzZWQgYXJyYXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0FyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSB7XG4gIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5MS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gYXJyYXkyW2luZGV4XSk7XG59XG5cbi8qKlxuICogQXNzaWduIHRoZSBjdXN0b20gY2xhc3MgdG8gZWFjaCBkYXRlXG4gKiBAcGFyYW0ge0FycmF5fSBob2xpZGF5RGF0ZXMgYXJyYXkgb2Ygb2JqZWN0IGNvbnRhaW5pbmcgZGF0ZSBhbmQgbmFtZSBvZiB0aGUgaG9saWRheVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzbmFtZSB0byBiZSBhZGRlZC5cbiAqIEByZXR1cm5zIHtNYXB9IE1hcCBjb250YWluaW5nIGRhdGUgYXMga2V5IGFuZCBhcnJheSBvZiBjbGFzc25hbWUgYW5kIGhvbGlkYXkgbmFtZSBhcyB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9saWRheXNNYXAoXG4gIGhvbGlkYXlEYXRlcyA9IFtdLFxuICBkZWZhdWx0Q2xhc3NOYW1lID0gXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhvbGlkYXlzXCIsXG4pIHtcbiAgY29uc3QgZGF0ZUNsYXNzZXMgPSBuZXcgTWFwKCk7XG4gIGhvbGlkYXlEYXRlcy5mb3JFYWNoKChob2xpZGF5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlOiBkYXRlT2JqLCBob2xpZGF5TmFtZSB9ID0gaG9saWRheTtcbiAgICBpZiAoIWlzRGF0ZShkYXRlT2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoZGF0ZU9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXNPYmogPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCB7fTtcbiAgICBpZiAoXG4gICAgICBcImNsYXNzTmFtZVwiIGluIGNsYXNzTmFtZXNPYmogJiZcbiAgICAgIGNsYXNzTmFtZXNPYmpbXCJjbGFzc05hbWVcIl0gPT09IGRlZmF1bHRDbGFzc05hbWUgJiZcbiAgICAgIGFycmF5c0FyZUVxdWFsKGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0sIFtob2xpZGF5TmFtZV0pXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9IGRlZmF1bHRDbGFzc05hbWU7XG4gICAgY29uc3QgaG9saWRheU5hbWVBcnIgPSBjbGFzc05hbWVzT2JqW1wiaG9saWRheU5hbWVzXCJdO1xuICAgIGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0gPSBob2xpZGF5TmFtZUFyclxuICAgICAgPyBbLi4uaG9saWRheU5hbWVBcnIsIGhvbGlkYXlOYW1lXVxuICAgICAgOiBbaG9saWRheU5hbWVdO1xuICAgIGRhdGVDbGFzc2VzLnNldChrZXksIGNsYXNzTmFtZXNPYmopO1xuICB9KTtcbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXNUb0luamVjdEFmdGVyKFxuICBzdGFydE9mRGF5LFxuICBjdXJyZW50VGltZSxcbiAgY3VycmVudE11bHRpcGxpZXIsXG4gIGludGVydmFscyxcbiAgaW5qZWN0ZWRUaW1lcyxcbikge1xuICBjb25zdCBsID0gaW5qZWN0ZWRUaW1lcy5sZW5ndGg7XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IGluamVjdGVkVGltZSA9IHN0YXJ0T2ZEYXk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkSG91cnMoaW5qZWN0ZWRUaW1lLCBnZXRIb3VycyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkTWludXRlcyhpbmplY3RlZFRpbWUsIGdldE1pbnV0ZXMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuICAgIGluamVjdGVkVGltZSA9IGFkZFNlY29uZHMoaW5qZWN0ZWRUaW1lLCBnZXRTZWNvbmRzKGluamVjdGVkVGltZXNbaV0pKTtcblxuICAgIGNvbnN0IG5leHRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIHN0YXJ0T2ZEYXksXG4gICAgICAoY3VycmVudE11bHRpcGxpZXIgKyAxKSAqIGludGVydmFscyxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgaXNBZnRlcihpbmplY3RlZFRpbWUsIGN1cnJlbnRUaW1lKSAmJlxuICAgICAgaXNCZWZvcmUoaW5qZWN0ZWRUaW1lLCBuZXh0VGltZSlcbiAgICApIHtcbiAgICAgIHRpbWVzLnB1c2goaW5qZWN0ZWRUaW1lc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRpbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWmVybyhpKSB7XG4gIHJldHVybiBpIDwgMTAgPyBgMCR7aX1gIDogYCR7aX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WWVhcnNQZXJpb2QoXG4gIGRhdGUsXG4gIHllYXJJdGVtTnVtYmVyID0gREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuKSB7XG4gIGNvbnN0IGVuZFBlcmlvZCA9IE1hdGguY2VpbChnZXRZZWFyKGRhdGUpIC8geWVhckl0ZW1OdW1iZXIpICogeWVhckl0ZW1OdW1iZXI7XG4gIGNvbnN0IHN0YXJ0UGVyaW9kID0gZW5kUGVyaW9kIC0gKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gIHJldHVybiB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzSW5EYXkoZCkge1xuICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKTtcbiAgY29uc3Qgc3RhcnRPZlRoZU5leHREYXkgPSBuZXcgRGF0ZShcbiAgICBkLmdldEZ1bGxZZWFyKCksXG4gICAgZC5nZXRNb250aCgpLFxuICAgIGQuZ2V0RGF0ZSgpLFxuICAgIDI0LFxuICApO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKCgrc3RhcnRPZlRoZU5leHREYXkgLSArc3RhcnRPZkRheSkgLyAzXzYwMF8wMDApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIHRoZSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlXG4gKlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL3N0YXJ0T2ZNaW51dGVgXG4gKiBkbyBub3QgbWFrZSBjaGFuZ2VzIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1xuICpcbiAqIFNlZSBjb21tZW50cyBvbiBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL3B1bGwvNDI0NFxuICogZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gc3RhcnQgb2YgdGhlIG1pbnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZk1pbnV0ZShkKSB7XG4gIGNvbnN0IHNlY29uZHMgPSBkLmdldFNlY29uZHMoKTtcbiAgY29uc3QgbWlsbGlzZWNvbmRzID0gZC5nZXRNaWxsaXNlY29uZHMoKTtcblxuICByZXR1cm4gdG9EYXRlKGQuZ2V0VGltZSgpIC0gc2Vjb25kcyAqIDEwMDAgLSBtaWxsaXNlY29uZHMpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIG1pbnV0ZVxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9pc1NhbWVNaW51dGVgXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkMVxuICogQHBhcmFtIHtEYXRlfSBkMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNaW51dGUoZDEsIGQyKSB7XG4gIHJldHVybiBzdGFydE9mTWludXRlKGQxKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZNaW51dGUoZDIpLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmVkIGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lICgwMDowMDowMClcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgZm9yIHdoaWNoIG1pZG5pZ2h0IHRpbWUgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtEYXRlfSBBIG5ldyBkYXRldGltZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlkbmlnaHREYXRlKGRhdGUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGVcIik7XG4gIH1cblxuICBjb25zdCBkYXRlV2l0aG91dFRpbWUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgZGF0ZVdpdGhvdXRUaW1lLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZVdpdGhvdXRUaW1lO1xufVxuXG4vKipcbiAqIElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSBUaGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUaGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKlxuICogTm90ZTpcbiAqICBUaGlzIGZ1bmN0aW9uIGNvbnNpZGVycyB0aGUgbWlkLW5pZ2h0IG9mIHRoZSBnaXZlbiBkYXRlcyBmb3IgY29tcGFyaXNvbi5cbiAqICBJdCBldmFsdWF0ZXMgd2hldGhlciBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlIGJhc2VkIG9uIHRoZWlyIG1pZC1uaWdodCB0aW1lc3RhbXBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlQmVmb3JlKGRhdGUsIGRhdGVUb0NvbXBhcmUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkgfHwgIWlzRGF0ZShkYXRlVG9Db21wYXJlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSByZWNlaXZlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlKTtcbiAgY29uc3QgbWlkbmlnaHREYXRlVG9Db21wYXJlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGVUb0NvbXBhcmUpO1xuXG4gIHJldHVybiBpc0JlZm9yZShtaWRuaWdodERhdGUsIG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NwYWNlS2V5RG93bihldmVudCkge1xuICBjb25zdCBTUEFDRV9LRVkgPSBcIiBcIjtcbiAgcmV0dXJuIGV2ZW50LmtleSA9PT0gU1BBQ0VfS0VZO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVllYXJzKHllYXIsIG5vT2ZZZWFyLCBtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogbm9PZlllYXIgKyAxOyBpKyspIHtcbiAgICBjb25zdCBuZXdZZWFyID0geWVhciArIG5vT2ZZZWFyIC0gaTtcbiAgICBsZXQgaXNJblJhbmdlID0gdHJ1ZTtcblxuICAgIGlmIChtaW5EYXRlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1pbkRhdGUpIDw9IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGUgJiYgaXNJblJhbmdlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1heERhdGUpID49IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKGlzSW5SYW5nZSkge1xuICAgICAgbGlzdC5wdXNoKG5ld1llYXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IHllYXJEcm9wZG93bkl0ZW1OdW1iZXIsIHNjcm9sbGFibGVZZWFyRHJvcGRvd24gfSA9IHByb3BzO1xuICAgIGNvbnN0IG5vT2ZZZWFyID1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXIgfHwgKHNjcm9sbGFibGVZZWFyRHJvcGRvd24gPyAxMCA6IDUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHllYXJzTGlzdDogZ2VuZXJhdGVZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy55ZWFyLFxuICAgICAgICBub09mWWVhcixcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gICAgdGhpcy5kcm9wZG93blJlZiA9IGNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZHJvcGRvd25DdXJyZW50ID0gdGhpcy5kcm9wZG93blJlZi5jdXJyZW50O1xuXG4gICAgaWYgKGRyb3Bkb3duQ3VycmVudCkge1xuICAgICAgLy8gR2V0IGFycmF5IGZyb20gSFRNTENvbGxlY3Rpb25cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuID0gZHJvcGRvd25DdXJyZW50LmNoaWxkcmVuXG4gICAgICAgID8gQXJyYXkuZnJvbShkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW4pXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkWWVhck9wdGlvbkVsID0gZHJvcGRvd25DdXJyZW50Q2hpbGRyZW5cbiAgICAgICAgPyBkcm9wZG93bkN1cnJlbnRDaGlsZHJlbi5maW5kKChjaGlsZEVsKSA9PiBjaGlsZEVsLmFyaWFTZWxlY3RlZClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBkcm9wZG93bkN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWRZZWFyT3B0aW9uRWxcbiAgICAgICAgPyBzZWxlY3RlZFllYXJPcHRpb25FbC5vZmZzZXRUb3AgK1xuICAgICAgICAgIChzZWxlY3RlZFllYXJPcHRpb25FbC5jbGllbnRIZWlnaHQgLSBkcm9wZG93bkN1cnJlbnQuY2xpZW50SGVpZ2h0KSAvIDJcbiAgICAgICAgOiAoZHJvcGRvd25DdXJyZW50LnNjcm9sbEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMjtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IHRoaXMucHJvcHMueWVhcjtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKCh5ZWFyKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgc2VsZWN0ZWRZZWFyID09PSB5ZWFyXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkX3llYXJcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e3llYXJ9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB5ZWFyKX1cbiAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWRZZWFyID09PSB5ZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHtzZWxlY3RlZFllYXIgPT09IHllYXIgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge3llYXJ9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcblxuICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLnByb3BzLm1pbkRhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWluRGF0ZSkgOiBudWxsO1xuICAgIGNvbnN0IG1heFllYXIgPSB0aGlzLnByb3BzLm1heERhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWF4RGF0ZSkgOiBudWxsO1xuXG4gICAgaWYgKCFtYXhZZWFyIHx8ICF0aGlzLnN0YXRlLnllYXJzTGlzdC5maW5kKCh5ZWFyKSA9PiB5ZWFyID09PSBtYXhZZWFyKSkge1xuICAgICAgb3B0aW9ucy51bnNoaWZ0KFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICAgIGtleT17XCJ1cGNvbWluZ1wifVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaW5jcmVtZW50WWVhcnN9XG4gICAgICAgID5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzLXVwY29taW5nXCIgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIW1pblllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1pblllYXIpKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInByZXZpb3VzXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5kZWNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtcHJldmlvdXNcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgc2hpZnRZZWFycyA9IChhbW91bnQpID0+IHtcbiAgICBjb25zdCB5ZWFycyA9IHRoaXMuc3RhdGUueWVhcnNMaXN0Lm1hcChmdW5jdGlvbiAoeWVhcikge1xuICAgICAgcmV0dXJuIHllYXIgKyBhbW91bnQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHllYXJzTGlzdDogeWVhcnMsXG4gICAgfSk7XG4gIH07XG5cbiAgaW5jcmVtZW50WWVhcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRZZWFycygxKTtcbiAgfTtcblxuICBkZWNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKC0xKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30gcmVmPXt0aGlzLmRyb3Bkb3duUmVmfT5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4veWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IDE5MDA7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IDIxMDA7XG5cbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IG1pblllYXI7IGkgPD0gbWF4WWVhcjsgaSsrKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17aX0+XG4gICAgICAgICAge2l9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQteWVhclwiPlxuICAgICAgICB7dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgeWVhcj17dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKHllYXIgPT09IHRoaXMucHJvcHMueWVhcikgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnByb3BzLmRhdGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSwgZXZlbnQpID0+IHtcbiAgICB0aGlzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB0aGlzLnNldE9wZW4oKTtcbiAgfTtcblxuICBvblNlbGVjdCA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0T3BlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG1vbnRoTmFtZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoaSkgPT4gdGhpcy5wcm9wcy5tb250aCA9PT0gaTtcblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1vbnRoTmFtZXMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGkpXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGhcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvblwiXG4gICAgICAgIH1cbiAgICAgICAga2V5PXttb250aH1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGkpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5pc1NlbGVjdGVkTW9udGgoaSkgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZFwiPuKckzwvc3Bhbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBcIlwiXG4gICAgICAgICl9XG4gICAgICAgIHttb250aH1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aERyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAobW9udGhOYW1lcykgPT5cbiAgICBtb250aE5hbWVzLm1hcCgoTSwgaSkgPT4gKFxuICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAge019XG4gICAgICA8L29wdGlvbj5cbiAgICApKTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKG1vbnRoTmFtZXMpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMobW9udGhOYW1lcyl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSwgbW9udGhOYW1lcykgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3XCJcbiAgICAgIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGhcIj5cbiAgICAgICAge21vbnRoTmFtZXNbdGhpcy5wcm9wcy5tb250aF19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgbW9udGhOYW1lcz17bW9udGhOYW1lc31cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKG1vbnRoTmFtZXMpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSwgbW9udGhOYW1lcyldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24obW9udGhOYW1lcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIGlmIChtb250aCAhPT0gdGhpcy5wcm9wcy5tb250aCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aCk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV0ubWFwKFxuICAgICAgdGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93blxuICAgICAgICA/IChNKSA9PiB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpXG4gICAgICAgIDogKE0pID0+IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpLFxuICAgICk7XG5cbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKG1vbnRoTmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgbmV3RGF0ZSxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVNb250aFllYXJzKG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtaW5EYXRlKTtcbiAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgobWF4RGF0ZSk7XG5cbiAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICBsaXN0LnB1c2gobmV3RGF0ZShjdXJyRGF0ZSkpO1xuXG4gICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtb250aFllYXJzTGlzdDogZ2VuZXJhdGVNb250aFllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubW9udGhZZWFyc0xpc3QubWFwKChtb250aFllYXIpID0+IHtcbiAgICAgIGNvbnN0IG1vbnRoWWVhclBvaW50ID0gZ2V0VGltZShtb250aFllYXIpO1xuICAgICAgY29uc3QgaXNTYW1lTW9udGhZZWFyID1cbiAgICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcikgJiZcbiAgICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBtb250aFllYXIpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgIGlzU2FtZU1vbnRoWWVhclxuICAgICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkX21vbnRoLXllYXJcIlxuICAgICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb25cIlxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e21vbnRoWWVhclBvaW50fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBtb250aFllYXJQb2ludCl9XG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTYW1lTW9udGhZZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNTYW1lTW9udGhZZWFyID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgIOKck1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShtb250aFllYXIsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoWWVhcik7XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfT57dGhpcy5yZW5kZXJPcHRpb25zKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9uc1wiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuaW1wb3J0IHtcbiAgYWRkTW9udGhzLFxuICBmb3JtYXREYXRlLFxuICBnZXRTdGFydE9mTW9udGgsXG4gIGlzQWZ0ZXIsXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBuZXdEYXRlLFxuICBnZXRUaW1lLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbnZhciBXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhZZWFyRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJvcGRvd25WaXNpYmxlOiBmYWxzZSxcbiAgfTtcblxuICByZW5kZXJTZWxlY3RPcHRpb25zID0gKCkgPT4ge1xuICAgIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgIGNvbnN0IGxhc3REYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICAgIGNvbnN0IHRpbWVQb2ludCA9IGdldFRpbWUoY3VyckRhdGUpO1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17dGltZVBvaW50fSB2YWx1ZT17dGltZVBvaW50fT5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShjdXJyRGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG5cbiAgICAgIGN1cnJEYXRlID0gYWRkTW9udGhzKGN1cnJEYXRlLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICBvblNlbGVjdENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0TW9kZSA9ICgpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17Z2V0VGltZShnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXRlKSl9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4ge1xuICAgIGNvbnN0IHllYXJNb250aCA9IGZvcm1hdERhdGUoXG4gICAgICB0aGlzLnByb3BzLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PVwicmVhZFwiXG4gICAgICAgIHN0eWxlPXt7IHZpc2liaWxpdHk6IHZpc2libGUgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXdcIlxuICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aC15ZWFyXCI+XG4gICAgICAgICAge3llYXJNb250aH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEcm9wZG93biA9ICgpID0+IChcbiAgICA8V3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyUG9pbnQpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICBjb25zdCBjaGFuZ2VkRGF0ZSA9IG5ld0RhdGUocGFyc2VJbnQobW9udGhZZWFyUG9pbnQpKTtcblxuICAgIGlmIChcbiAgICAgIGlzU2FtZVllYXIodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSkgJiZcbiAgICAgIGlzU2FtZU1vbnRoKHRoaXMucHJvcHMuZGF0ZSwgY2hhbmdlZERhdGUpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHtcbiAgZ2V0RGF5LFxuICBnZXRNb250aCxcbiAgZ2V0RGF0ZSxcbiAgbmV3RGF0ZSxcbiAgaXNTYW1lRGF5LFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUV4Y2x1ZGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGlzRXF1YWwsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBnZXREYXlPZldlZWtDb2RlLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZm9ybWF0RGF0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbk1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KHByZXZQcm9wcyk7XG4gIH1cblxuICBkYXlFbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VFbnRlcihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9IChvdGhlcikgPT4gaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF5LCBvdGhlcik7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTZWxlY3RlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+IHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpKVxuICAgICAgOiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcblxuICAgIHJldHVybiAhaXNTZWxlY3RlZERhdGUgJiYgdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICB9O1xuXG4gIGlzRGlzYWJsZWQgPSAoKSA9PiBpc0RheURpc2FibGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKCkgPT4gaXNEYXlFeGNsdWRlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNTdGFydE9mV2VlayA9ICgpID0+XG4gICAgaXNTYW1lRGF5KFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lV2VlayA9IChvdGhlcikgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgaXNTYW1lRGF5KFxuICAgICAgb3RoZXIsXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lRGF5T3JXZWVrID0gKG90aGVyKSA9PiB0aGlzLmlzU2FtZURheShvdGhlcikgfHwgdGhpcy5pc1NhbWVXZWVrKG90aGVyKTtcblxuICBnZXRIaWdoTGlnaHRlZENsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBoaWdobGlnaHREYXRlcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7J2RheSBzdHJpbmcsICdjbGFzc05hbWUnfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgcmV0dXJuIGhpZ2hsaWdodERhdGVzLmdldChkYXlTdHIpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJldHVybiB0aGUgYXJyYXkgY29udGFpbmluZyBjbGFzc25hbWUgYXNzb2NpYXRlZCB0byB0aGUgZGF0ZVxuICBnZXRIb2xpZGF5c0NsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhvbGlkYXlzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2Yge2RheSBzdHJpbmc6IHtjbGFzc05hbWUsIGhvbGlkYXlOYW1lfX1cbiAgICBpZiAoaG9saWRheXMuaGFzKGRheVN0cikpIHtcbiAgICAgIHJldHVybiBbaG9saWRheXMuZ2V0KGRheVN0cikuY2xhc3NOYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblJhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhc2VsZWN0aW5nRGF0ZSB8fFxuICAgICAgKCFzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSAmJiB0aGlzLmlzRGlzYWJsZWQoKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzU3RhcnQgJiZcbiAgICAgIGVuZERhdGUgJiZcbiAgICAgIChpc0JlZm9yZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNFbmQgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzUmFuZ2UgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgIWVuZERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShzdGFydERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoZW5kRGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1dlZWtlbmQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla2RheSA9IGdldERheSh0aGlzLnByb3BzLmRheSk7XG4gICAgcmV0dXJuIHdlZWtkYXkgPT09IDAgfHwgd2Vla2RheSA9PT0gNjtcbiAgfTtcblxuICBpc0FmdGVyTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKHRoaXMucHJvcHMubW9udGggKyAxKSAlIDEyID09PSBnZXRNb250aCh0aGlzLnByb3BzLmRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQmVmb3JlTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KSArIDEpICUgMTIgPT09IHRoaXMucHJvcHMubW9udGhcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudERheSA9ICgpID0+IHRoaXMuaXNTYW1lRGF5KG5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+XG4gICAgICAgIHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lXG4gICAgICA/IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lKGRhdGUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIsXG4gICAgICBkYXlDbGFzc05hbWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tXCIgKyBnZXREYXlPZldlZWtDb2RlKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWRpc2FibGVkXCI6IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZXhjbHVkZWRcIjogdGhpcy5pc0V4Y2x1ZGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXNlbGVjdGluZy1yYW5nZVwiOiB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50RGF5KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS13ZWVrZW5kXCI6IHRoaXMuaXNXZWVrZW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1vdXRzaWRlLW1vbnRoXCI6XG4gICAgICAgICAgdGhpcy5pc0FmdGVyTW9udGgoKSB8fCB0aGlzLmlzQmVmb3JlTW9udGgoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmdldEhpZ2hMaWdodGVkQ2xhc3MoXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhpZ2hsaWdodGVkXCIpLFxuICAgICAgdGhpcy5nZXRIb2xpZGF5c0NsYXNzKCksXG4gICAgKTtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQgPSBcIkNob29zZVwiLFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKCkgfHwgdGhpcy5pc0V4Y2x1ZGVkKClcbiAgICAgICAgPyBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWRcbiAgICAgICAgOiBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7Zm9ybWF0RGF0ZShkYXksIFwiUFBQUFwiLCB0aGlzLnByb3BzLmxvY2FsZSl9YDtcbiAgfTtcblxuICAvLyBBIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgaG9saWRheSdzIG5hbWUgYXMgdGl0bGUncyBjb250ZW50XG4gIGdldFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyA9IG5ldyBNYXAoKSwgZXhjbHVkZURhdGVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbXBhcmVEdCA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgdGl0bGVzID0gW107XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhjb21wYXJlRHQpKSB7XG4gICAgICB0aXRsZXMucHVzaCguLi5ob2xpZGF5cy5nZXQoY29tcGFyZUR0KS5ob2xpZGF5TmFtZXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0V4Y2x1ZGVkKCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKFxuICAgICAgICBleGNsdWRlRGF0ZXNcbiAgICAgICAgICA/LmZpbHRlcigoZXhjbHVkZURhdGUpID0+XG4gICAgICAgICAgICBpc1NhbWVEYXkoZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSwgZGF5KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLm1hcCgoZXhjbHVkZURhdGUpID0+IGV4Y2x1ZGVEYXRlLm1lc3NhZ2UpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlcy5qb2luKFwiLCBcIik7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAoc2VsZWN0ZWQsIHByZVNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gc2VsZWN0ZWQgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZDtcbiAgICBjb25zdCBwcmVTZWxlY3Rpb25EYXkgPSBwcmVTZWxlY3Rpb24gfHwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIShcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgICAgICAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlciB8fCAhdGhpcy5pc1N0YXJ0T2ZXZWVrKCkpXG4gICAgICApICYmXG4gICAgICAodGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSB8fFxuICAgICAgICAodGhpcy5pc1NhbWVEYXkoc2VsZWN0ZWREYXkpICYmXG4gICAgICAgICAgaXNTYW1lRGF5KHByZVNlbGVjdGlvbkRheSwgc2VsZWN0ZWREYXkpKSlcbiAgICAgICAgPyAwXG4gICAgICAgIDogLTE7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIGRheVxuICAvLyBmb2N1cyB0aGUgZGF5IG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNEYXkgPSAocHJldlByb3BzID0ge30pID0+IHtcbiAgICBsZXQgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgdGhpcy5pc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGUgYWN0aXZlRWxlbWVudCBpcyBpbiB0aGUgY29udGFpbmVyLCBhbmQgaXQgaXMgYW5vdGhlciBpbnN0YW5jZSBvZiBEYXlcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIpXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy9kYXkgaXMgb25lIG9mIHRoZSBub24gcmVuZGVyZWQgZHVwbGljYXRlIGRheXNcbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c0RheSAmJiB0aGlzLmRheUVsLmN1cnJlbnQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW5kZXJEYXlDb250ZW50cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzXG4gICAgICA/IHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHMoZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSksIHRoaXMucHJvcHMuZGF5KVxuICAgICAgOiBnZXREYXRlKHRoaXMucHJvcHMuZGF5KTtcbiAgfTtcblxuICByZW5kZXIgPSAoKSA9PiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt0aGlzLmRheUVsfVxuICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXModGhpcy5wcm9wcy5kYXkpfVxuICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbCgpfVxuICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICB0aXRsZT17dGhpcy5nZXRUaXRsZSgpfVxuICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc0Rpc2FibGVkKCl9XG4gICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50RGF5KCkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZCgpIHx8IHRoaXMuaXNJblJhbmdlKCl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyRGF5Q29udGVudHMoKX1cbiAgICAgIHt0aGlzLmdldFRpdGxlKCkgIT09IFwiXCIgJiYgKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvdmVybGF5XCI+e3RoaXMuZ2V0VGl0bGUoKX08L3NwYW4+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWtOdW1iZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJpYUxhYmVsUHJlZml4OiBcIndlZWsgXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2Vla051bWJlcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudCkgfSksXG4gICAgXSksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c1dlZWtOdW1iZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcihwcmV2UHJvcHMpO1xuICB9XG5cbiAgd2Vla051bWJlckVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIGdldFRhYkluZGV4ID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlciAmJlxuICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAoaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCB0aGlzLnByb3BzLnNlbGVjdGVkKSkpXG4gICAgICA/IDBcbiAgICAgIDogLTE7XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIHdlZWstbnVtYmVyXG4gIC8vIGZvY3VzIHRoZSB3ZWVrLW51bWJlciBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzV2Vla051bWJlciA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIFdlZWtOdW1iZXJcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHdlZWtOdW1iZXIsIGFyaWFMYWJlbFByZWZpeCA9IFwid2VlayBcIiwgb25DbGljayB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tY2xpY2thYmxlXCI6ICEhb25DbGljayxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLXNlbGVjdGVkXCI6XG4gICAgICAgICEhb25DbGljayAmJiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3RoaXMud2Vla051bWJlckVsfVxuICAgICAgICBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHthcmlhTGFiZWxQcmVmaXh9ICR7dGhpcy5wcm9wcy53ZWVrTnVtYmVyfWB9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICA+XG4gICAgICAgIHt3ZWVrTnVtYmVyfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IERheSBmcm9tIFwiLi9kYXlcIjtcbmltcG9ydCBXZWVrTnVtYmVyIGZyb20gXCIuL3dlZWtfbnVtYmVyXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuaW1wb3J0IHsgYWRkRGF5cywgZ2V0V2VlaywgZ2V0U3RhcnRPZldlZWssIGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VlayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgIH07XG4gIH1cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlV2Vla0NsaWNrID0gKGRheSwgd2Vla051bWJlciwgZXZlbnQpID0+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25XZWVrU2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0KGRheSwgd2Vla051bWJlciwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgdGhpcy5oYW5kbGVEYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0V2Vla051bWJlciA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcihkYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFdlZWsoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyRGF5cyA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IHRoaXMuc3RhcnRPZldlZWsoKTtcbiAgICBjb25zdCBkYXlzID0gW107XG4gICAgY29uc3Qgd2Vla051bWJlciA9IHRoaXMuZm9ybWF0V2Vla051bWJlcihzdGFydE9mV2Vlayk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2tBY3Rpb24gPVxuICAgICAgICB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICAgICAgPyB0aGlzLmhhbmRsZVdlZWtDbGljay5iaW5kKHRoaXMsIHN0YXJ0T2ZXZWVrLCB3ZWVrTnVtYmVyKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgZGF5cy5wdXNoKFxuICAgICAgICA8V2Vla051bWJlclxuICAgICAgICAgIGtleT1cIldcIlxuICAgICAgICAgIHdlZWtOdW1iZXI9e3dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGF0ZT17c3RhcnRPZldlZWt9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja0FjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5hcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAvPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxEYXlcbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkPXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGtleT17ZGF5LnZhbHVlT2YoKX1cbiAgICAgICAgICAgIGRheT17ZGF5fVxuICAgICAgICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlci5iaW5kKHRoaXMsIGRheSl9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBzdGFydE9mV2VlayA9ICgpID0+XG4gICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT5cbiAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICFpc1NhbWVEYXkodGhpcy5zdGFydE9mV2VlaygpLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgIGlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtcIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay0tc2VsZWN0ZWRcIjogaXNTYW1lRGF5KFxuICAgICAgICB0aGlzLnN0YXJ0T2ZXZWVrKCksXG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICApLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1rZXlib2FyZC1zZWxlY3RlZFwiOiB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbHN4KHdlZWtOdW1iZXJDbGFzc2VzKX0+e3RoaXMucmVuZGVyRGF5cygpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgV2VlayBmcm9tIFwiLi93ZWVrXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IEZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UID0gNjtcblxuY29uc3QgTU9OVEhfQ09MVU1OU19MQVlPVVQgPSB7XG4gIFRXT19DT0xVTU5TOiBcInR3b19jb2x1bW5zXCIsXG4gIFRIUkVFX0NPTFVNTlM6IFwidGhyZWVfY29sdW1uc1wiLFxuICBGT1VSX0NPTFVNTlM6IFwiZm91cl9jb2x1bW5zXCIsXG59O1xuY29uc3QgTU9OVEhfQ09MVU1OUyA9IHtcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULlRXT19DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxXSxcbiAgICAgIFsyLCAzXSxcbiAgICAgIFs0LCA1XSxcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs4LCA5XSxcbiAgICAgIFsxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAyLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVEhSRUVfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMl0sXG4gICAgICBbMywgNCwgNV0sXG4gICAgICBbNiwgNywgOF0sXG4gICAgICBbOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogMyxcbiAgfSxcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMiwgM10sXG4gICAgICBbNCwgNSwgNiwgN10sXG4gICAgICBbOCwgOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogNCxcbiAgfSxcbn07XG5jb25zdCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUID0gMTtcblxuZnVuY3Rpb24gZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbikge1xuICBpZiAoc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5GT1VSX0NPTFVNTlM7XG4gIGlmIChzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyKSByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlM7XG4gIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9yZGVySW5EaXNwbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBNT05USF9SRUZTID0gWy4uLkFycmF5KDEyKV0ubWFwKCgpID0+IFJlYWN0LmNyZWF0ZVJlZigpKTtcbiAgUVVBUlRFUl9SRUZTID0gWy4uLkFycmF5KDQpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50LCB0aGlzLnByb3BzLm9yZGVySW5EaXNwbGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlU3RhcnRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlRW5kTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKHV0aWxzLnNldE1vbnRoKGRheSwgbSksIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8ICFzZWxlY3RpbmdEYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0ID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCA9IChtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNXZWVrSW5Nb250aCA9IChzdGFydE9mV2VlaykgPT4ge1xuICAgIGNvbnN0IGRheSA9IHRoaXMucHJvcHMuZGF5O1xuICAgIGNvbnN0IGVuZE9mV2VlayA9IHV0aWxzLmFkZERheXMoc3RhcnRPZldlZWssIDYpO1xuICAgIHJldHVybiAoXG4gICAgICB1dGlscy5pc1NhbWVNb250aChzdGFydE9mV2VlaywgZGF5KSB8fCB1dGlscy5pc1NhbWVNb250aChlbmRPZldlZWssIGRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudE1vbnRoID0gKGRheSwgbSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIG0gPT09IHV0aWxzLmdldE1vbnRoKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNDdXJyZW50UXVhcnRlciA9IChkYXksIHEpID0+XG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHV0aWxzLm5ld0RhdGUoKSkgJiZcbiAgICBxID09PSB1dGlscy5nZXRRdWFydGVyKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZE1vbnRoID0gKGRheSwgbSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0TW9udGgoc2VsZWN0ZWQpID09PSBtICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICBpc1NlbGVjdGVkUXVhcnRlciA9IChkYXksIHEsIHNlbGVjdGVkKSA9PlxuICAgIHV0aWxzLmdldFF1YXJ0ZXIoZGF5KSA9PT0gcSAmJlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcihzZWxlY3RlZCk7XG5cbiAgcmVuZGVyV2Vla3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla3MgPSBbXTtcbiAgICB2YXIgaXNGaXhlZEhlaWdodCA9IHRoaXMucHJvcHMuZml4ZWRIZWlnaHQ7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IGZhbHNlO1xuICAgIGxldCBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICB1dGlscy5nZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXkpLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkO1xuXG4gICAgY29uc3QgcHJlU2VsZWN0aW9uID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgd2Vla3MucHVzaChcbiAgICAgICAgPFdlZWtcbiAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBkYXk9e2N1cnJlbnRXZWVrU3RhcnR9XG4gICAgICAgICAgbW9udGg9e3V0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMuZGF5KX1cbiAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgcHJlU2VsZWN0aW9uPXtwcmVTZWxlY3Rpb259XG4gICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgLz4sXG4gICAgICApO1xuXG4gICAgICBpZiAoYnJlYWtBZnRlck5leHRQdXNoKSBicmVhaztcblxuICAgICAgaSsrO1xuICAgICAgY3VycmVudFdlZWtTdGFydCA9IHV0aWxzLmFkZFdlZWtzKGN1cnJlbnRXZWVrU3RhcnQsIDEpO1xuXG4gICAgICAvLyBJZiBvbmUgb2YgdGhlc2UgY29uZGl0aW9ucyBpcyB0cnVlLCB3ZSB3aWxsIGVpdGhlciBicmVhayBvbiB0aGlzIHdlZWtcbiAgICAgIC8vIG9yIGJyZWFrIG9uIHRoZSBuZXh0IHdlZWtcbiAgICAgIGNvbnN0IGlzRml4ZWRBbmRGaW5hbFdlZWsgPVxuICAgICAgICBpc0ZpeGVkSGVpZ2h0ICYmIGkgPj0gRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQ7XG4gICAgICBjb25zdCBpc05vbkZpeGVkQW5kT3V0T2ZNb250aCA9XG4gICAgICAgICFpc0ZpeGVkSGVpZ2h0ICYmICF0aGlzLmlzV2Vla0luTW9udGgoY3VycmVudFdlZWtTdGFydCk7XG5cbiAgICAgIGlmIChpc0ZpeGVkQW5kRmluYWxXZWVrIHx8IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBlZWtOZXh0TW9udGgpIHtcbiAgICAgICAgICBicmVha0FmdGVyTmV4dFB1c2ggPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlZWtzO1xuICB9O1xuXG4gIG9uTW9udGhDbGljayA9IChlLCBtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlDbGljayh1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25Nb250aE1vdXNlRW50ZXIgPSAobSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKHRoaXMucHJvcHMuZGF5LCBtKTtcblxuICAgIGlmICh1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhOYXZpZ2F0aW9uID0gKG5ld01vbnRoLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLk1PTlRIX1JFRlNbbmV3TW9udGhdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIG9uTW9udGhLZXlEb3duID0gKGV2ZW50LCBtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24sXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzZXRQcmVTZWxlY3Rpb24sXG4gICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgIT09IFwiVGFiXCIpIHtcbiAgICAgIC8vIHByZXZlbnREZWZhdWx0IG9uIHRhYiBldmVudCBibG9ja3MgZm9jdXMgY2hhbmdlXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBtb250aENvbHVtbnNMYXlvdXQgPSBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0ID1cbiAgICAgICAgTU9OVEhfQ09MVU1OU1ttb250aENvbHVtbnNMYXlvdXRdLnZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDtcbiAgICAgIGNvbnN0IG1vbnRoc0dyaWQgPSBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0uZ3JpZDtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vbk1vbnRoQ2xpY2soZXZlbnQsIG1vbnRoKTtcbiAgICAgICAgICBzZXRQcmVTZWxlY3Rpb24oc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDExID8gMCA6IG1vbnRoICsgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG1vbnRoID09PSAwID8gMTEgOiBtb250aCAtIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGZpcnN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFswXS5pbmNsdWRlcyhtb250aClcbiAgICAgICAgICAgICAgPyBtb250aCArIDEyIC0gdmVydGljYWxPZmZzZXRcbiAgICAgICAgICAgICAgOiBtb250aCAtIHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgdXRpbHMuc3ViTW9udGhzKHByZVNlbGVjdGlvbiwgdmVydGljYWxPZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1vbnRoIG9uIHRoZSBsYXN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFttb250aHNHcmlkLmxlbmd0aCAtIDFdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoIC0gMTIgKyB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoICsgdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5hZGRNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbk1vbnRoS2V5RG93biAmJiBoYW5kbGVPbk1vbnRoS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgb25RdWFydGVyQ2xpY2sgPSAoZSwgcSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZRdWFydGVyKGxhYmVsRGF0ZSksIGUpO1xuICB9O1xuXG4gIG9uUXVhcnRlck1vdXNlRW50ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlUXVhcnRlck5hdmlnYXRpb24gPSAobmV3UXVhcnRlciwgbmV3RGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG4gICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuUVVBUlRFUl9SRUZTW25ld1F1YXJ0ZXIgLSAxXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25RdWFydGVyS2V5RG93biA9IChldmVudCwgcXVhcnRlcikgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2ZW50LCBxdWFydGVyKTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gNCA/IDEgOiBxdWFydGVyICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVRdWFydGVyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHF1YXJ0ZXIgPT09IDEgPyA0IDogcXVhcnRlciAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJRdWFydGVycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZ2V0TW9udGhDbGFzc05hbWVzID0gKG0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIG1vbnRoQ2xhc3NOYW1lLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aENsYXNzTmFtZSA9IG1vbnRoQ2xhc3NOYW1lXG4gICAgICA/IG1vbnRoQ2xhc3NOYW1lKHV0aWxzLnNldE1vbnRoKGRheSwgbSkpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtJHttfWAsXG4gICAgICBfbW9udGhDbGFzc05hbWUsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMpICYmXG4gICAgICAgICAgdXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkTW9udGgoXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIG0sXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzTW9udGhJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIG0sXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0TW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZE1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChtKSA9PiB7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWRNb250aCA9IHV0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBtID09PSBwcmVTZWxlY3RlZE1vbnRoXG4gICAgICAgID8gXCIwXCJcbiAgICAgICAgOiBcIi0xXCI7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgZ2V0UXVhcnRlclRhYkluZGV4ID0gKHEpID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBxID09PSBwcmVTZWxlY3RlZFF1YXJ0ZXJcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAobW9udGgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXggPSBcIkNob29zZVwiLFxuICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXggPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICAgIGRheSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbW9udGgpO1xuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQobGFiZWxEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobGFiZWxEYXRlKVxuICAgICAgICA/IGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4XG4gICAgICAgIDogY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4O1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHt1dGlscy5mb3JtYXREYXRlKGxhYmVsRGF0ZSwgXCJNTU1NIHl5eXlcIil9YDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ2xhc3NOYW1lcyA9IChxKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci0ke3F9YCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZCh1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgcSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHByZVNlbGVjdGlvbiksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1yYW5nZVwiOiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIHEsXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzUmFuZ2VTdGFydFF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kUXVhcnRlcihxKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRNb250aENvbnRlbnQgPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd0Z1bGxNb250aFllYXJQaWNrZXIsIHJlbmRlck1vbnRoQ29udGVudCwgbG9jYWxlLCBkYXkgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0TW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhTaG9ydEluTG9jYWxlKG0sIGxvY2FsZSk7XG4gICAgY29uc3QgZnVsbE1vbnRoVGV4dCA9IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBpZiAocmVuZGVyTW9udGhDb250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTW9udGhDb250ZW50KG0sIHNob3J0TW9udGhUZXh0LCBmdWxsTW9udGhUZXh0LCBkYXkpO1xuICAgIH1cbiAgICByZXR1cm4gc2hvd0Z1bGxNb250aFllYXJQaWNrZXIgPyBmdWxsTW9udGhUZXh0IDogc2hvcnRNb250aFRleHQ7XG4gIH07XG5cbiAgZ2V0UXVhcnRlckNvbnRlbnQgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgcmVuZGVyUXVhcnRlckNvbnRlbnQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG9ydFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxLCBsb2NhbGUpO1xuICAgIHJldHVybiByZW5kZXJRdWFydGVyQ29udGVudFxuICAgICAgPyByZW5kZXJRdWFydGVyQ29udGVudChxLCBzaG9ydFF1YXJ0ZXIpXG4gICAgICA6IHNob3J0UXVhcnRlcjtcbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgc2VsZWN0ZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtb250aENvbHVtbnMgPVxuICAgICAgTU9OVEhfQ09MVU1OU1tcbiAgICAgICAgZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIClcbiAgICAgIF0uZ3JpZDtcbiAgICByZXR1cm4gbW9udGhDb2x1bW5zLm1hcCgobW9udGgsIGkpID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtd3JhcHBlclwiIGtleT17aX0+XG4gICAgICAgIHttb250aC5tYXAoKG0sIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3RoaXMuTU9OVEhfUkVGU1ttXX1cbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoS2V5RG93bihldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uTW9udGhNb3VzZUVudGVyKG0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgobSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0TW9udGhDbGFzc05hbWVzKG0pfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbChtKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChkYXksIG0sIHNlbGVjdGVkKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRNb250aENvbnRlbnQobSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyUXVhcnRlcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdGVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHF1YXJ0ZXJzID0gWzEsIDIsIDMsIDRdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItd3JhcHBlclwiPlxuICAgICAgICB7cXVhcnRlcnMubWFwKChxLCBqKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgcmVmPXt0aGlzLlFVQVJURVJfUkVGU1tqXX1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXYsIHEpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyS2V5RG93bihldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vblF1YXJ0ZXJNb3VzZUVudGVyKHEpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRRdWFydGVyQ2xhc3NOYW1lcyhxKX1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoZGF5LCBxLCBzZWxlY3RlZCl9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRRdWFydGVyVGFiSW5kZXgocSl9XG4gICAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50UXVhcnRlcihkYXksIHEpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuZ2V0UXVhcnRlckNvbnRlbnQocSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBnZXRDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGluZ0RhdGUsXG4gICAgICBzZWxlY3RzU3RhcnQsXG4gICAgICBzZWxlY3RzRW5kLFxuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIHNob3dXZWVrUGlja2VyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoXCIsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kKSxcbiAgICAgIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhQaWNrZXJcIjogc2hvd01vbnRoWWVhclBpY2tlciB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXJQaWNrZXJcIjogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1BpY2tlclwiOiBzaG93V2Vla1BpY2tlciB9LFxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXggPSBcIk1vbnRoIFwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4ID0gYXJpYUxhYmVsUHJlZml4XG4gICAgICA/IGFyaWFMYWJlbFByZWZpeC50cmltKCkgKyBcIiBcIlxuICAgICAgOiBcIlwiO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHtmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXh9JHt1dGlscy5mb3JtYXREYXRlKGRheSwgXCJNTU1NLCB5eXl5XCIpfWB9XG4gICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgID5cbiAgICAgICAge3Nob3dNb250aFllYXJQaWNrZXJcbiAgICAgICAgICA/IHRoaXMucmVuZGVyTW9udGhzKClcbiAgICAgICAgICA6IHNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgICAgPyB0aGlzLnJlbmRlclF1YXJ0ZXJzKClcbiAgICAgICAgICAgIDogdGhpcy5yZW5kZXJXZWVrcygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHtcbiAgZ2V0SG91cnMsXG4gIGdldE1pbnV0ZXMsXG4gIG5ld0RhdGUsXG4gIGdldFN0YXJ0T2ZEYXksXG4gIGFkZE1pbnV0ZXMsXG4gIGZvcm1hdERhdGUsXG4gIGlzVGltZUluRGlzYWJsZWRSYW5nZSxcbiAgaXNUaW1lRGlzYWJsZWQsXG4gIHRpbWVzVG9JbmplY3RBZnRlcixcbiAgZ2V0SG91cnNJbkRheSxcbiAgaXNTYW1lTWludXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJ2YWxzOiAzMCxcbiAgICAgIG9uVGltZUNoYW5nZTogKCkgPT4ge30sXG4gICAgICB0b2RheUJ1dHRvbjogbnVsbCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNhbGNDZW50ZXJQb3NpdGlvbiA9IChsaXN0SGVpZ2h0LCBjZW50ZXJMaVJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICBjZW50ZXJMaVJlZi5vZmZzZXRUb3AgLSAobGlzdEhlaWdodCAvIDIgLSBjZW50ZXJMaVJlZi5jbGllbnRIZWlnaHQgLyAyKVxuICAgICk7XG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1vbnRoUmVmOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGhlaWdodDogbnVsbCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBjb2RlIHRvIGVuc3VyZSBzZWxlY3RlZCB0aW1lIHdpbGwgYWx3YXlzIGJlIGluIGZvY3VzIHdpdGhpbiB0aW1lIHdpbmRvdyB3aGVuIGl0IGZpcnN0IGFwcGVhcnNcbiAgICB0aGlzLnNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lKCk7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhSZWYgJiYgdGhpcy5oZWFkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMubW9udGhSZWYuY2xpZW50SGVpZ2h0IC0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUgPSAoKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5saXN0KSByZXR1cm47XG5cbiAgICAgIHRoaXMubGlzdC5zY3JvbGxUb3AgPVxuICAgICAgICB0aGlzLmNlbnRlckxpICYmXG4gICAgICAgIFRpbWUuY2FsY0NlbnRlclBvc2l0aW9uKFxuICAgICAgICAgIHRoaXMucHJvcHMubW9udGhSZWZcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5saXN0LmNsaWVudEhlaWdodCxcbiAgICAgICAgICB0aGlzLmNlbnRlckxpLFxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrID0gKHRpbWUpID0+IHtcbiAgICBpZiAoXG4gICAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICAgIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB0aGlzLnByb3BzKSkgfHxcbiAgICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJUaW1lKSAmJlxuICAgICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aW1lKTtcbiAgfTtcblxuICBpc1NlbGVjdGVkVGltZSA9ICh0aW1lKSA9PlxuICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiYgaXNTYW1lTWludXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRpbWUpO1xuXG4gIGlzRGlzYWJsZWRUaW1lID0gKHRpbWUpID0+XG4gICAgKCh0aGlzLnByb3BzLm1pblRpbWUgfHwgdGhpcy5wcm9wcy5tYXhUaW1lKSAmJlxuICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuaW5jbHVkZVRpbWVzIHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSk7XG5cbiAgbGlDbGFzc2VzID0gKHRpbWUpID0+IHtcbiAgICBsZXQgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW1cIixcbiAgICAgIHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSA/IHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSh0aW1lKSA6IHVuZGVmaW5lZCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWRpc2FibGVkXCIpO1xuICAgIH1cblxuICAgIC8vY29udmVydCB0aGlzLnByb3BzLmludGVydmFscyBhbmQgdGhlIHJlbGV2YW50IHRpbWUgdG8gc2Vjb25kcyBhbmQgY2hlY2sgaWYgaXQgaXQncyBhIGNsZWFuIG11bHRpcGxlIG9mIHRoZSBpbnRlcnZhbFxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuaW5qZWN0VGltZXMgJiZcbiAgICAgIChnZXRIb3Vycyh0aW1lKSAqIDM2MDAgKyBnZXRNaW51dGVzKHRpbWUpICogNjAgKyBnZXRTZWNvbmRzKHRpbWUpKSAlXG4gICAgICAgICh0aGlzLnByb3BzLmludGVydmFscyAqIDYwKSAhPT1cbiAgICAgICAgMFxuICAgICkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWluamVjdGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCwgdGltZSkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZy5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgdGhpcy5oYW5kbGVDbGljayh0aW1lKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVzID0gKCkgPT4ge1xuICAgIGxldCB0aW1lcyA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMucHJvcHMuZm9ybWF0ID8gdGhpcy5wcm9wcy5mb3JtYXQgOiBcInBcIjtcbiAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLnByb3BzLmludGVydmFscztcblxuICAgIGNvbnN0IGFjdGl2ZURhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCB8fCB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgfHwgbmV3RGF0ZSgpO1xuXG4gICAgY29uc3QgYmFzZSA9IGdldFN0YXJ0T2ZEYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3Qgc29ydGVkSW5qZWN0VGltZXMgPVxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgbWludXRlc0luRGF5ID0gNjAgKiBnZXRIb3Vyc0luRGF5KGFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBtaW51dGVzSW5EYXkgLyBpbnRlcnZhbHM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11bHRpcGxpZXI7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBhZGRNaW51dGVzKGJhc2UsIGkgKiBpbnRlcnZhbHMpO1xuICAgICAgdGltZXMucHVzaChjdXJyZW50VGltZSk7XG5cbiAgICAgIGlmIChzb3J0ZWRJbmplY3RUaW1lcykge1xuICAgICAgICBjb25zdCB0aW1lc1RvSW5qZWN0ID0gdGltZXNUb0luamVjdEFmdGVyKFxuICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgY3VycmVudFRpbWUsXG4gICAgICAgICAgaSxcbiAgICAgICAgICBpbnRlcnZhbHMsXG4gICAgICAgICAgc29ydGVkSW5qZWN0VGltZXMsXG4gICAgICAgICk7XG4gICAgICAgIHRpbWVzID0gdGltZXMuY29uY2F0KHRpbWVzVG9JbmplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSB3aGljaCB0aW1lIHRvIGZvY3VzIGFuZCBzY3JvbGwgaW50byB2aWV3IHdoZW4gY29tcG9uZW50IG1vdW50c1xuICAgIGNvbnN0IHRpbWVUb0ZvY3VzID0gdGltZXMucmVkdWNlKChwcmV2LCB0aW1lKSA9PiB7XG4gICAgICBpZiAodGltZS5nZXRUaW1lKCkgPD0gYWN0aXZlRGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aW1lc1swXSk7XG5cbiAgICByZXR1cm4gdGltZXMubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGlcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRpbWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5saUNsYXNzZXModGltZSl9XG4gICAgICAgICAgcmVmPXsobGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lID09PSB0aW1lVG9Gb2N1cykge1xuICAgICAgICAgICAgICB0aGlzLmNlbnRlckxpID0gbGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPbktleURvd24oZXYsIHRpbWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RpbWUgPT09IHRpbWVUb0ZvY3VzID8gMCA6IC0xfVxuICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZSh0aW1lLCBmb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXIgJHtcbiAgICAgICAgICB0aGlzLnByb3BzLnRvZGF5QnV0dG9uXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXItLXdpdGgtdG9kYXktYnV0dG9uXCJcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUgJHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUtLW9ubHlcIlxuICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICB9YH1cbiAgICAgICAgICByZWY9eyhoZWFkZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faGVhZGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1ib3hcIj5cbiAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3RcIlxuICAgICAgICAgICAgICByZWY9eyhsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgc3R5bGU9e2hlaWdodCA/IHsgaGVpZ2h0IH0gOiB7fX1cbiAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lcygpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBuZXdEYXRlIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNsZWFyU2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBZRUFSX1JFRlMgPSBbLi4uQXJyYXkodGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcildLm1hcCgoKSA9PlxuICAgIFJlYWN0LmNyZWF0ZVJlZigpLFxuICApO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgc2VsZWN0aW5nRGF0ZSA9ICgpID0+IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICB1cGRhdGVGb2N1c09uUGFnaW5hdGUgPSAocmVmSW5kZXgpID0+IHtcbiAgICBjb25zdCB3YWl0Rm9yUmVSZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLllFQVJfUkVGU1tyZWZJbmRleF0uY3VycmVudC5mb2N1cygpO1xuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUod2FpdEZvclJlUmVuZGVyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyQ2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlWWVhck5hdmlnYXRpb24gPSAobmV3WWVhciwgbmV3RGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoZGF0ZSwgeWVhckl0ZW1OdW1iZXIpO1xuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcblxuICAgIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IC0xKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSh5ZWFySXRlbU51bWJlciAtIDEpO1xuICAgIH0gZWxzZSBpZiAobmV3WWVhciAtIHN0YXJ0UGVyaW9kID09PSB5ZWFySXRlbU51bWJlcikge1xuICAgICAgdGhpcy51cGRhdGVGb2N1c09uUGFnaW5hdGUoMCk7XG4gICAgfSBlbHNlIHRoaXMuWUVBUl9SRUZTW25ld1llYXIgLSBzdGFydFBlcmlvZF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9ICh5LCBvdGhlcikgPT4gdXRpbHMuaXNTYW1lRGF5KHksIG90aGVyKTtcblxuICBpc0N1cnJlbnRZZWFyID0gKHkpID0+IHkgPT09IGdldFllYXIobmV3RGF0ZSgpKTtcblxuICBpc1JhbmdlU3RhcnQgPSAoeSkgPT5cbiAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSAmJlxuICAgIHRoaXMucHJvcHMuZW5kRGF0ZSAmJlxuICAgIHV0aWxzLmlzU2FtZVllYXIodXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpLCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSk7XG5cbiAgaXNSYW5nZUVuZCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuZW5kRGF0ZSk7XG5cbiAgaXNJblJhbmdlID0gKHkpID0+XG4gICAgdXRpbHMuaXNZZWFySW5SYW5nZSh5LCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICF0aGlzLnNlbGVjdGluZ0RhdGUoKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMuc2VsZWN0aW5nRGF0ZSgpLCBlbmREYXRlKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCBzdGFydERhdGUsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKHkpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICh5KSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIodGhpcy5wcm9wcy5kYXRlLCB5KSk7XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5zZWxlY3RlZCkpICYmXG4gICAgICB1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pKVxuICAgICk7XG4gIH07XG5cbiAgb25ZZWFyQ2xpY2sgPSAoZSwgeSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLmhhbmRsZVllYXJDbGljayh1dGlscy5nZXRTdGFydE9mWWVhcih1dGlscy5zZXRZZWFyKGRhdGUsIHkpKSwgZSk7XG4gIH07XG5cbiAgb25ZZWFyS2V5RG93biA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBrZXkgfSA9IGU7XG4gICAgY29uc3QgeyBoYW5kbGVPbktleURvd24gfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25ZZWFyQ2xpY2soZSwgeSk7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHkgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbktleURvd24gJiYgaGFuZGxlT25LZXlEb3duKGUpO1xuICB9O1xuXG4gIGdldFllYXJDbGFzc05hbWVzID0gKHkpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRlLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICAgIGluY2x1ZGVEYXRlcyxcbiAgICAgIGZpbHRlckRhdGUsXG4gICAgICB5ZWFyQ2xhc3NOYW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dFwiLFxuICAgICAgYHJlYWN0LWRhdGVwaWNrZXJfX3llYXItJHt5fWAsXG4gICAgICB5ZWFyQ2xhc3NOYW1lID8geWVhckNsYXNzTmFtZSh1dGlscy5zZXRZZWFyKGRhdGUsIHkpKSA6IHVuZGVmaW5lZCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGVkXCI6IHkgPT09IGdldFllYXIoc2VsZWN0ZWQpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMgfHwgZmlsdGVyRGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1llYXJEaXNhYmxlZCh5LCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlRW5kKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRZZWFyKHkpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFllYXJUYWJJbmRleCA9ICh5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHJldHVybiBcIi0xXCI7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWQgPSB1dGlscy5nZXRZZWFyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICAgIHJldHVybiB5ID09PSBwcmVTZWxlY3RlZCA/IFwiMFwiIDogXCItMVwiO1xuICB9O1xuXG4gIGdldFllYXJDb250YWluZXJDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW5nRGF0ZSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhclwiLCB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICBzZWxlY3RpbmdEYXRlICYmIChzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpLFxuICAgIH0pO1xuICB9O1xuXG4gIGdldFllYXJDb250ZW50ID0gKHkpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCA/IHRoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnQoeSkgOiB5O1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB5ZWFyc0xpc3QgPSBbXTtcbiAgICBjb25zdCB7IGRhdGUsIHllYXJJdGVtTnVtYmVyLCBvblllYXJNb3VzZUVudGVyLCBvblllYXJNb3VzZUxlYXZlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKFxuICAgICAgZGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG5cbiAgICBmb3IgKGxldCB5ID0gc3RhcnRQZXJpb2Q7IHkgPD0gZW5kUGVyaW9kOyB5KyspIHtcbiAgICAgIHllYXJzTGlzdC5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXt0aGlzLllFQVJfUkVGU1t5IC0gc3RhcnRQZXJpb2RdfVxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblllYXJDbGljayhldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25ZZWFyS2V5RG93bihldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRZZWFyVGFiSW5kZXgoeSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFllYXJDbGFzc05hbWVzKHkpfVxuICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUVudGVyKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VMZWF2ZShldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5PXt5fVxuICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRZZWFyKHkpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5nZXRZZWFyQ29udGVudCh5KX1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMoKX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXdyYXBwZXJcIlxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNsZWFyU2VsZWN0aW5nRGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICA+XG4gICAgICAgICAge3llYXJzTGlzdH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGlucHV0VGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRpbWVTdHJpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aW1lOiB0aGlzLnByb3BzLnRpbWVTdHJpbmcsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgaWYgKHByb3BzLnRpbWVTdHJpbmcgIT09IHN0YXRlLnRpbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpbWU6IHByb3BzLnRpbWVTdHJpbmcsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFJldHVybiBudWxsIHRvIGluZGljYXRlIG5vIGNoYW5nZSB0byBzdGF0ZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uVGltZUNoYW5nZSA9ICh0aW1lKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWUgfSk7XG5cbiAgICBjb25zdCB7IGRhdGU6IHByb3BEYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzUHJvcERhdGVWYWxpZCA9IHByb3BEYXRlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ocHJvcERhdGUpO1xuICAgIGNvbnN0IGRhdGUgPSBpc1Byb3BEYXRlVmFsaWQgPyBwcm9wRGF0ZSA6IG5ldyBEYXRlKCk7XG5cbiAgICBkYXRlLnNldEhvdXJzKHRpbWUuc3BsaXQoXCI6XCIpWzBdKTtcbiAgICBkYXRlLnNldE1pbnV0ZXModGltZS5zcGxpdChcIjpcIilbMV0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShkYXRlKTtcbiAgfTtcblxuICByZW5kZXJUaW1lSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGF0ZSwgdGltZVN0cmluZywgY3VzdG9tVGltZUlucHV0IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGN1c3RvbVRpbWVJbnB1dCkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjdXN0b21UaW1lSW5wdXQsIHtcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgdmFsdWU6IHRpbWUsXG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uVGltZUNoYW5nZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRpbWVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJUaW1lXCJcbiAgICAgICAgbmFtZT1cInRpbWUtaW5wdXRcIlxuICAgICAgICByZXF1aXJlZFxuICAgICAgICB2YWx1ZT17dGltZX1cbiAgICAgICAgb25DaGFuZ2U9eyhldikgPT4ge1xuICAgICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKGV2LnRhcmdldC52YWx1ZSB8fCB0aW1lU3RyaW5nKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtdGltZS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2NhcHRpb25cIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIj5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVJbnB1dCgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXJDb250YWluZXIoe1xuICBzaG93VGltZVNlbGVjdE9ubHkgPSBmYWxzZSxcbiAgc2hvd1RpbWUgPSBmYWxzZSxcbiAgY2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbn0pIHtcbiAgbGV0IGFyaWFMYWJlbCA9IHNob3dUaW1lU2VsZWN0T25seVxuICAgID8gXCJDaG9vc2UgVGltZVwiXG4gICAgOiBgQ2hvb3NlIERhdGUke3Nob3dUaW1lID8gXCIgYW5kIFRpbWVcIiA6IFwiXCJ9YDtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5DYWxlbmRhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59O1xuIiwiaW1wb3J0IFllYXJEcm9wZG93biBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhEcm9wZG93biBmcm9tIFwiLi9tb250aF9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoWWVhckRyb3Bkb3duIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aCBmcm9tIFwiLi9tb250aFwiO1xuaW1wb3J0IFRpbWUgZnJvbSBcIi4vdGltZVwiO1xuaW1wb3J0IFllYXIgZnJvbSBcIi4veWVhclwiO1xuaW1wb3J0IElucHV0VGltZSBmcm9tIFwiLi9pbnB1dFRpbWVcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IENhbGVuZGFyQ29udGFpbmVyIGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgc2V0TW9udGgsXG4gIGdldE1vbnRoLFxuICBhZGRNb250aHMsXG4gIHN1Yk1vbnRocyxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldFN0YXJ0T2ZUb2RheSxcbiAgYWRkRGF5cyxcbiAgZm9ybWF0RGF0ZSxcbiAgc2V0WWVhcixcbiAgZ2V0WWVhcixcbiAgaXNCZWZvcmUsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNBZnRlcixcbiAgZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlLFxuICBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSxcbiAgZ2V0V2Vla2RheU1pbkluTG9jYWxlLFxuICBpc1NhbWVEYXksXG4gIGlzU2FtZU1vbnRoLFxuICBtb250aERpc2FibGVkQmVmb3JlLFxuICBtb250aERpc2FibGVkQWZ0ZXIsXG4gIHllYXJEaXNhYmxlZEJlZm9yZSxcbiAgeWVhckRpc2FibGVkQWZ0ZXIsXG4gIHllYXJzRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEJlZm9yZSxcbiAgcXVhcnRlckRpc2FibGVkQmVmb3JlLFxuICBxdWFydGVyRGlzYWJsZWRBZnRlcixcbiAgZ2V0RWZmZWN0aXZlTWluRGF0ZSxcbiAgZ2V0RWZmZWN0aXZlTWF4RGF0ZSxcbiAgYWRkWmVybyxcbiAgaXNWYWxpZCxcbiAgZ2V0WWVhcnNQZXJpb2QsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgZ2V0TW9udGhJbkxvY2FsZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTID0gW1xuICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1zZWxlY3RcIixcbl07XG5cbmNvbnN0IGlzRHJvcGRvd25TZWxlY3QgPSAoZWxlbWVudCA9IHt9KSA9PiB7XG4gIGNvbnN0IGNsYXNzTmFtZXMgPSAoZWxlbWVudC5jbGFzc05hbWUgfHwgXCJcIikuc3BsaXQoL1xccysvKTtcbiAgcmV0dXJuIERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMuc29tZShcbiAgICAodGVzdENsYXNzbmFtZSkgPT4gY2xhc3NOYW1lcy5pbmRleE9mKHRlc3RDbGFzc25hbWUpID49IDAsXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvbkRyb3Bkb3duRm9jdXM6ICgpID0+IHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgY3VzdG9tVGltZUlucHV0OiBudWxsLFxuICAgICAgeWVhckl0ZW1OdW1iZXI6IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSlcbiAgICAgIC5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSksXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbW9udGhTZWxlY3RlZEluOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25Ecm9wZG93bkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dUaW1lU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblRpbWVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aE1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dQb3BwZXJBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbkRheUtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuY29udGFpbmVyUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGF0ZTogdGhpcy5nZXREYXRlSW5WaWV3KCksXG4gICAgICBzZWxlY3RpbmdEYXRlOiBudWxsLFxuICAgICAgbW9udGhDb250YWluZXI6IG51bGwsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIG1vbnRoQ29udGFpbmVyIGhlaWdodCBpcyBuZWVkZWQgaW4gdGltZSBjb21wb25lbnRcbiAgICAvLyB0byBkZXRlcm1pbmUgdGhlIGhlaWdodCBmb3IgdGhlIHVsIGluIHRoZSB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHNldFN0YXRlIGhlcmUgc28gaGVpZ2h0IGlzIGdpdmVuIGFmdGVyIGZpbmFsIGNvbXBvbmVudFxuICAgIC8vIGxheW91dCBpcyByZW5kZXJlZFxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLmFzc2lnbk1vbnRoQ29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoQ29udGFpbmVyOiB0aGlzLm1vbnRoQ29udGFpbmVyIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24gJiZcbiAgICAgICghaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCBwcmV2UHJvcHMucHJlU2VsZWN0aW9uKSB8fFxuICAgICAgICB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiAhPT0gcHJldlByb3BzLm1vbnRoU2VsZWN0ZWRJbilcbiAgICApIHtcbiAgICAgIGNvbnN0IGhhc01vbnRoQ2hhbmdlZCA9ICFpc1NhbWVNb250aChcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZTogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IGhhc01vbnRoQ2hhbmdlZCAmJiB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkodGhpcy5wcm9wcy5vcGVuVG9EYXRlLCBwcmV2UHJvcHMub3BlblRvRGF0ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRlOiB0aGlzLnByb3BzLm9wZW5Ub0RhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgfTtcblxuICBzZXRDbGlja091dHNpZGVSZWYgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGlmIChpc0Ryb3Bkb3duU2VsZWN0KGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGdldERhdGVJblZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcmVTZWxlY3Rpb24sIHNlbGVjdGVkLCBvcGVuVG9EYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1pbkRhdGUgPSBnZXRFZmZlY3RpdmVNaW5EYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IG1heERhdGUgPSBnZXRFZmZlY3RpdmVNYXhEYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBuZXdEYXRlKCk7XG4gICAgY29uc3QgaW5pdGlhbERhdGUgPSBvcGVuVG9EYXRlIHx8IHNlbGVjdGVkIHx8IHByZVNlbGVjdGlvbjtcbiAgICBpZiAoaW5pdGlhbERhdGUpIHtcbiAgICAgIHJldHVybiBpbml0aWFsRGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1pbkRhdGUgJiYgaXNCZWZvcmUoY3VycmVudCwgbWluRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1pbkRhdGU7XG4gICAgICB9IGVsc2UgaWYgKG1heERhdGUgJiYgaXNBZnRlcihjdXJyZW50LCBtYXhEYXRlKSkge1xuICAgICAgICByZXR1cm4gbWF4RGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH07XG5cbiAgaW5jcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGRlY3JlYXNlTW9udGggPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViTW9udGhzKGRhdGUsIDEpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF5KTtcbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBkYXkgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgfTtcblxuICBoYW5kbGVNb250aE1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gICAgdGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlKCk7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlRW50ZXIgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogc2V0WWVhcihuZXdEYXRlKCksIHllYXIpIH0pO1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcihldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlTGVhdmUgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICAhIXRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmUoZXZlbnQsIHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uWWVhckNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKGRhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vbnRoWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKGRhdGUpO1xuICAgIHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UoZGF0ZSk7XG4gIH07XG5cbiAgY2hhbmdlWWVhciA9ICh5ZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihkYXRlLCB5ZWFyKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aCA9IChtb250aCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldE1vbnRoKGRhdGUsIG1vbnRoKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2hhbmdlTW9udGhZZWFyID0gKG1vbnRoWWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldFllYXIoc2V0TW9udGgoZGF0ZSwgZ2V0TW9udGgobW9udGhZZWFyKSksIGdldFllYXIobW9udGhZZWFyKSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoZWFkZXIgPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICBkYXRlLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IGRheU5hbWVzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzKSB7XG4gICAgICBkYXlOYW1lcy5wdXNoKFxuICAgICAgICA8ZGl2IGtleT1cIldcIiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLndlZWtMYWJlbCB8fCBcIiNcIn1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheU5hbWVzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICBjb25zdCB3ZWVrRGF5TmFtZSA9IHRoaXMuZm9ybWF0V2Vla2RheShkYXksIHRoaXMucHJvcHMubG9jYWxlKTtcblxuICAgICAgICBjb25zdCB3ZWVrRGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lXG4gICAgICAgICAgPyB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWUoZGF5KVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtvZmZzZXR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiLCB3ZWVrRGF5Q2xhc3NOYW1lKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7d2Vla0RheU5hbWV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGZvcm1hdFdlZWtkYXkgPSAoZGF5LCBsb2NhbGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5KSB7XG4gICAgICByZXR1cm4gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRheSwgdGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5LCBsb2NhbGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0XG4gICAgICA/IGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRheSwgbG9jYWxlKVxuICAgICAgOiBnZXRXZWVrZGF5TWluSW5Mb2NhbGUoZGF5LCBsb2NhbGUpO1xuICB9O1xuXG4gIGRlY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjbGVhclNlbGVjdGluZ0RhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gIH07XG5cbiAgcmVuZGVyUHJldmlvdXNCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbFByZXZEYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0gcXVhcnRlckRpc2FibGVkQmVmb3JlKFxuICAgICAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICghdGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgIXRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1wcmV2aW91c1wiLFxuICAgIF07XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsUHJldkRheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXMtLWRpc2FibGVkXCIpO1xuICAgICAgY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvclllYXIgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIGNvbnN0IHsgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsLCBwcmV2aW91c1llYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsID0gdHlwZW9mIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9XG4gICAgICAgIG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNGb3JZZWFyID8gcHJldmlvdXNZZWFyQXJpYUxhYmVsIDogcHJldmlvdXNNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLnByZXZpb3VzWWVhckJ1dHRvbkxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIGluY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxOZXh0RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSBxdWFydGVyRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBjb25zdCBpY29uQ2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvbi0tbmV4dFwiLFxuICAgIF07XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdGltZVwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMudG9kYXlCdXR0b24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdG9kYXktYnV0dG9uXCIpO1xuICAgIH1cblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsTmV4dERheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBuZXh0TW9udGhCdXR0b25MYWJlbCwgbmV4dFllYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dE1vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBuZXh0TW9udGhCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dFllYXJCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIk5leHQgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBuZXh0WWVhckFyaWFMYWJlbCA6IG5leHRNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDdXJyZW50TW9udGggPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoXCJdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzTW9udGhEcm9wZG93blwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aFllYXJEcm9wZG93blwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAge2Zvcm1hdERhdGUoZGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFllYXJEcm9wZG93blxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLnByb3BzLm9uU2VsZWN0fVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZVllYXJ9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICB5ZWFyPXtnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TW9udGhEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aH1cbiAgICAgICAgbW9udGg9e2dldE1vbnRoKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aFllYXJEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVUb2RheUJ1dHRvbkNsaWNrID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGdldFN0YXJ0T2ZUb2RheSgpLCBlKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihnZXRTdGFydE9mVG9kYXkoKSk7XG4gIH07XG5cbiAgcmVuZGVyVG9kYXlCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnRvZGF5QnV0dG9uIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RvZGF5LWJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVRvZGF5QnV0dG9uQ2xpY2soZSl9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEZWZhdWx0SGVhZGVyID0gKHsgbW9udGhEYXRlLCBpIH0pID0+IChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgJHtcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdFxuICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWhhcy10aW1lLXNlbGVjdFwiXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YH1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJDdXJyZW50TW9udGgobW9udGhEYXRlKX1cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyX19kcm9wZG93biByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRHJvcGRvd25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhZZWFyRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICAgIHt0aGlzLnJlbmRlclllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZXNcIj5cbiAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJDdXN0b21IZWFkZXIgPSAoaGVhZGVyQXJncyA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyBtb250aERhdGUsIGkgfSA9IGhlYWRlckFyZ3M7XG5cbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJiAhdGhpcy5zdGF0ZS5tb250aENvbnRhaW5lcikgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHByZXZZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0WWVhckJ1dHRvbkRpc2FibGVkID0geWVhckRpc2FibGVkQWZ0ZXIoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBzaG93RGF5TmFtZXMgPVxuICAgICAgIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciAmJlxuICAgICAgIXRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWN1c3RvbVwiXG4gICAgICAgIG9uRm9jdXM9e3RoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIoe1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgICAgY3VzdG9tSGVhZGVyQ291bnQ6IGksXG4gICAgICAgICAgbW9udGhEYXRlLFxuICAgICAgICAgIGNoYW5nZU1vbnRoOiB0aGlzLmNoYW5nZU1vbnRoLFxuICAgICAgICAgIGNoYW5nZVllYXI6IHRoaXMuY2hhbmdlWWVhcixcbiAgICAgICAgICBkZWNyZWFzZU1vbnRoOiB0aGlzLmRlY3JlYXNlTW9udGgsXG4gICAgICAgICAgaW5jcmVhc2VNb250aDogdGhpcy5pbmNyZWFzZU1vbnRoLFxuICAgICAgICAgIGRlY3JlYXNlWWVhcjogdGhpcy5kZWNyZWFzZVllYXIsXG4gICAgICAgICAgaW5jcmVhc2VZZWFyOiB0aGlzLmluY3JlYXNlWWVhcixcbiAgICAgICAgICBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBwcmV2WWVhckJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgIH0pfVxuICAgICAgICB7c2hvd0RheU5hbWVzICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJIZWFkZXIgPSAoeyBtb250aERhdGUgfSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd1llYXJQaWNrZXIsIHllYXJJdGVtTnVtYmVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBtb250aERhdGUsXG4gICAgICB5ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyLXllYXItaGVhZGVyXCI+XG4gICAgICAgIHtzaG93WWVhclBpY2tlciA/IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWAgOiBnZXRZZWFyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlciA9IChoZWFkZXJBcmdzKSA9PiB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyICE9PSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckN1c3RvbUhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlclllYXJIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEZWZhdWx0SGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtb250aExpc3QgPSBbXTtcbiAgICBjb25zdCBtb250aHNUb1N1YnRyYWN0ID0gdGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHNcbiAgICAgID8gdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDFcbiAgICAgIDogMDtcbiAgICBjb25zdCBmcm9tTW9udGhEYXRlID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fCB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICA/IGFkZFllYXJzKHRoaXMuc3RhdGUuZGF0ZSwgbW9udGhzVG9TdWJ0cmFjdClcbiAgICAgICAgOiBzdWJNb250aHModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KTtcbiAgICBjb25zdCBtb250aFNlbGVjdGVkSW4gPSB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiA/PyBtb250aHNUb1N1YnRyYWN0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93bjsgKytpKSB7XG4gICAgICBjb25zdCBtb250aHNUb0FkZCA9IGkgLSBtb250aFNlbGVjdGVkSW4gKyBtb250aHNUb1N1YnRyYWN0O1xuICAgICAgY29uc3QgbW9udGhEYXRlID1cbiAgICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgPyBhZGRZZWFycyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZClcbiAgICAgICAgICA6IGFkZE1vbnRocyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZCk7XG4gICAgICBjb25zdCBtb250aEtleSA9IGBtb250aC0ke2l9YDtcbiAgICAgIGNvbnN0IG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kID0gaSA8IHRoaXMucHJvcHMubW9udGhzU2hvd24gLSAxO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCA9IGkgPiAwO1xuICAgICAgbW9udGhMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e21vbnRoS2V5fVxuICAgICAgICAgIHJlZj17KGRpdikgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb250aENvbnRhaW5lciA9IGRpdjtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWNvbnRhaW5lclwiXG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGUsIGkgfSl9XG4gICAgICAgICAgPE1vbnRoXG4gICAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aFllYXJ9XG4gICAgICAgICAgICBkYXk9e21vbnRoRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25EYXlLZXlEb3dufVxuICAgICAgICAgICAgaGFuZGxlT25Nb250aEtleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vbnRoTW91c2VMZWF2ZX1cbiAgICAgICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgICAgICBvcmRlckluRGlzcGxheT17aX1cbiAgICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5zdGF0ZS5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgZml4ZWRIZWlnaHQ9e3RoaXMucHJvcHMuZml4ZWRIZWlnaHR9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgcmVuZGVyTW9udGhDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlck1vbnRoQ29udGVudH1cbiAgICAgICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICAgIHNob3dNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXttb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbnRoTGlzdDtcbiAgfTtcblxuICByZW5kZXJZZWFycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKHsgbW9udGhEYXRlOiB0aGlzLnN0YXRlLmRhdGUgfSl9XG4gICAgICAgICAgPFllYXJcbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBjbGVhclNlbGVjdGluZ0RhdGU9e3RoaXMuY2xlYXJTZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLmhhbmRsZVllYXJNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlclRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiZcbiAgICAgICh0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRpbWVcbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgICBmb3JtYXQ9e3RoaXMucHJvcHMudGltZUZvcm1hdH1cbiAgICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICAgIGludGVydmFscz17dGhpcy5wcm9wcy50aW1lSW50ZXJ2YWxzfVxuICAgICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgICAgZXhjbHVkZVRpbWVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lc31cbiAgICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgdG9kYXlCdXR0b249e3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgICAgc2hvd01vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICAgIG1vbnRoUmVmPXt0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyfVxuICAgICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRUaW1lU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVZhbGlkID0gaXNWYWxpZCh0aW1lKSAmJiBCb29sZWFuKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIGNvbnN0IHRpbWVTdHJpbmcgPSB0aW1lVmFsaWRcbiAgICAgID8gYCR7YWRkWmVybyh0aW1lLmdldEhvdXJzKCkpfToke2FkZFplcm8odGltZS5nZXRNaW51dGVzKCkpfWBcbiAgICAgIDogXCJcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW5wdXRUaW1lXG4gICAgICAgICAgZGF0ZT17dGltZX1cbiAgICAgICAgICB0aW1lU3RyaW5nPXt0aW1lU3RyaW5nfVxuICAgICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVGltZUNoYW5nZX1cbiAgICAgICAgICBjdXN0b21UaW1lSW5wdXQ9e3RoaXMucHJvcHMuY3VzdG9tVGltZUlucHV0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQXJpYUxpdmVSZWdpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWA7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGdldFllYXIodGhpcy5zdGF0ZS5kYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7Z2V0TW9udGhJbkxvY2FsZShcbiAgICAgICAgZ2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICApfSAke2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlbmRlckFyaWFMaXZlTWVzc2FnZSAmJiBhcmlhTGl2ZU1lc3NhZ2V9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDaGlsZHJlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19jaGlsZHJlbi1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgQ29udGFpbmVyID0gdGhpcy5wcm9wcy5jb250YWluZXIgfHwgQ2FsZW5kYXJDb250YWluZXI7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJjb250ZW50c1wiIH19IHJlZj17dGhpcy5jb250YWluZXJSZWZ9PlxuICAgICAgICA8Q29udGFpbmVyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFwicmVhY3QtZGF0ZXBpY2tlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyLS10aW1lLW9ubHlcIjogdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHksXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgc2hvd1RpbWU9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclByZXZpb3VzQnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTmV4dEJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck1vbnRocygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclllYXJzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyVG9kYXlCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0VGltZVNlY3Rpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY29uc3QgQ2FsZW5kYXJJY29uID0gKHsgaWNvbiwgY2xhc3NOYW1lID0gXCJcIiwgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2FsZW5kYXItaWNvblwiO1xuXG4gIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChpY29uKSkge1xuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoaWNvbiwge1xuICAgICAgY2xhc3NOYW1lOiBgJHtpY29uLnByb3BzLmNsYXNzTmFtZSB8fCBcIlwifSAke2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YCxcbiAgICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaWNvbi5wcm9wcy5vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpY29uLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG9uQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGljb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtkZWZhdWx0Q2xhc3N9ICR7aWNvbn0gJHtjbGFzc05hbWV9YH1cbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgU1ZHIEljb25cbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YH1cbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgdmlld0JveD1cIjAgMCA0NDggNTEyXCJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgPlxuICAgICAgPHBhdGggZD1cIk05NiAzMlY2NEg0OEMyMS41IDY0IDAgODUuNSAwIDExMnY0OEg0NDhWMTEyYzAtMjYuNS0yMS41LTQ4LTQ4LTQ4SDM1MlYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMlY2NEgxNjBWMzJjMC0xNy43LTE0LjMtMzItMzItMzJTOTYgMTQuMyA5NiAzMnpNNDQ4IDE5MkgwVjQ2NGMwIDI2LjUgMjEuNSA0OCA0OCA0OEg0MDBjMjYuNSAwIDQ4LTIxLjUgNDgtNDhWMTkyelwiIC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5DYWxlbmRhckljb24ucHJvcFR5cGVzID0ge1xuICBpY29uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXJJY29uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdCA9ICh0aGlzLnByb3BzLnBvcnRhbEhvc3QgfHwgZG9jdW1lbnQpLmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGhpcy5wcm9wcy5wb3J0YWxJZCxcbiAgICApO1xuICAgIGlmICghdGhpcy5wb3J0YWxSb290KSB7XG4gICAgICB0aGlzLnBvcnRhbFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5wb3J0YWxSb290LnNldEF0dHJpYnV0ZShcImlkXCIsIHRoaXMucHJvcHMucG9ydGFsSWQpO1xuICAgICAgKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZCh0aGlzLnBvcnRhbFJvb3QpO1xuICAgIH1cbiAgICB0aGlzLnBvcnRhbFJvb3QuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnBvcnRhbFJvb3QucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbCh0aGlzLnByb3BzLmNoaWxkcmVuLCB0aGlzLmVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG4vLyBUYWJMb29wIHByZXZlbnRzIHRoZSB1c2VyIGZyb20gdGFiYmluZyBvdXRzaWRlIG9mIHRoZSBwb3BwZXJcbi8vIEl0IGNyZWF0ZXMgYSB0YWJpbmRleCBsb29wIHNvIHRoYXQgXCJUYWJcIiBvbiB0aGUgbGFzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGZpcnN0IGVsZW1lbnRcbi8vIGFuZCBcIlNoaWZ0IFRhYlwiIG9uIHRoZSBmaXJzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGxhc3QgZWxlbWVudFxuXG5jb25zdCBmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yID1cbiAgXCJbdGFiaW5kZXhdLCBhLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCI7XG5jb25zdCBmb2N1c2FibGVGaWx0ZXIgPSAobm9kZSkgPT4gIW5vZGUuZGlzYWJsZWQgJiYgbm9kZS50YWJJbmRleCAhPT0gLTE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYkxvb3AgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMudGFiTG9vcFJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgLy8gcXVlcnkgYWxsIGZvY3VzYWJsZSBlbGVtZW50c1xuICAvLyB0cmltIGZpcnN0IGFuZCBsYXN0IGJlY2F1c2UgdGhleSBhcmUgdGhlIGZvY3VzIGd1YXJkc1xuICBnZXRUYWJDaGlsZHJlbiA9ICgpID0+XG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChcbiAgICAgICAgdGhpcy50YWJMb29wUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yKSxcbiAgICAgICAgMSxcbiAgICAgICAgLTEsXG4gICAgICApXG4gICAgICAuZmlsdGVyKGZvY3VzYWJsZUZpbHRlcik7XG5cbiAgaGFuZGxlRm9jdXNTdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJlxuICAgICAgdGFiQ2hpbGRyZW4ubGVuZ3RoID4gMSAmJlxuICAgICAgdGFiQ2hpbGRyZW5bdGFiQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgfTtcblxuICBoYW5kbGVGb2N1c0VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJiB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmIHRhYkNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5lbmFibGVUYWJMb29wKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BcIiByZWY9e3RoaXMudGFiTG9vcFJlZn0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcF9fc3RhcnRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c1N0YXJ0fVxuICAgICAgICAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19lbmRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c0VuZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIHVzZUZsb2F0aW5nLFxuICBhcnJvdyxcbiAgb2Zmc2V0LFxuICBmbGlwLFxuICBhdXRvVXBkYXRlLFxufSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgPSBbXG4gIFwidG9wLXN0YXJ0XCIsXG4gIFwidG9wLWVuZFwiLFxuICBcImJvdHRvbS1zdGFydFwiLFxuICBcImJvdHRvbS1lbmRcIixcbiAgXCJyaWdodC1zdGFydFwiLFxuICBcInJpZ2h0LWVuZFwiLFxuICBcImxlZnQtc3RhcnRcIixcbiAgXCJsZWZ0LWVuZFwiLFxuICBcInRvcFwiLFxuICBcInJpZ2h0XCIsXG4gIFwiYm90dG9tXCIsXG4gIFwibGVmdFwiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2l0aEZsb2F0aW5nKENvbXBvbmVudCkge1xuICBjb25zdCBXaXRoRmxvYXRpbmcgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBhbHRfcHJvcHMgPSB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIHBvcHBlck1vZGlmaWVyczogcHJvcHMucG9wcGVyTW9kaWZpZXJzIHx8IFtdLFxuICAgICAgcG9wcGVyUHJvcHM6IHByb3BzLnBvcHBlclByb3BzIHx8IHt9LFxuICAgICAgaGlkZVBvcHBlcjpcbiAgICAgICAgdHlwZW9mIHByb3BzLmhpZGVQb3BwZXIgPT09IFwiYm9vbGVhblwiID8gcHJvcHMuaGlkZVBvcHBlciA6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBhcnJvd1JlZiA9IFJlYWN0LnVzZVJlZigpO1xuICAgIGNvbnN0IGZsb2F0aW5nUHJvcHMgPSB1c2VGbG9hdGluZyh7XG4gICAgICBvcGVuOiAhYWx0X3Byb3BzLmhpZGVQb3BwZXIsXG4gICAgICB3aGlsZUVsZW1lbnRzTW91bnRlZDogYXV0b1VwZGF0ZSxcbiAgICAgIHBsYWNlbWVudDogYWx0X3Byb3BzLnBvcHBlclBsYWNlbWVudCxcbiAgICAgIG1pZGRsZXdhcmU6IFtcbiAgICAgICAgZmxpcCh7IHBhZGRpbmc6IDE1IH0pLFxuICAgICAgICBvZmZzZXQoMTApLFxuICAgICAgICBhcnJvdyh7IGVsZW1lbnQ6IGFycm93UmVmIH0pLFxuICAgICAgICAuLi5hbHRfcHJvcHMucG9wcGVyTW9kaWZpZXJzLFxuICAgICAgXSxcbiAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJQcm9wcyxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHsuLi5hbHRfcHJvcHN9IHBvcHBlclByb3BzPXt7IC4uLmZsb2F0aW5nUHJvcHMsIGFycm93UmVmIH19IC8+XG4gICAgKTtcbiAgfTtcblxuICBXaXRoRmxvYXRpbmcucHJvcFR5cGVzID0ge1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksXG4gICAgcG9wcGVyTW9kaWZpZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICByZXR1cm4gV2l0aEZsb2F0aW5nO1xufVxuIiwiaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBGbG9hdGluZ0Fycm93IH0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgd2l0aEZsb2F0aW5nIGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbmV4cG9ydCBjbGFzcyBQb3BwZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlkZVBvcHBlcjogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGFyZ2V0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgICBoaWRlUG9wcGVyLFxuICAgICAgcG9wcGVyQ29tcG9uZW50LFxuICAgICAgdGFyZ2V0Q29tcG9uZW50LFxuICAgICAgZW5hYmxlVGFiTG9vcCxcbiAgICAgIHBvcHBlck9uS2V5RG93bixcbiAgICAgIHBvcnRhbElkLFxuICAgICAgcG9ydGFsSG9zdCxcbiAgICAgIHBvcHBlclByb3BzLFxuICAgICAgc2hvd0Fycm93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHBvcHBlcjtcblxuICAgIGlmICghaGlkZVBvcHBlcikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXBvcHBlclwiLCBjbGFzc05hbWUpO1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXtlbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0RmxvYXRpbmd9XG4gICAgICAgICAgICBzdHlsZT17cG9wcGVyUHJvcHMuZmxvYXRpbmdTdHlsZXN9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICBkYXRhLXBsYWNlbWVudD17cG9wcGVyUHJvcHMucGxhY2VtZW50fVxuICAgICAgICAgICAgb25LZXlEb3duPXtwb3BwZXJPbktleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcHBlckNvbXBvbmVudH1cbiAgICAgICAgICAgIHtzaG93QXJyb3cgJiYgKFxuICAgICAgICAgICAgICA8RmxvYXRpbmdBcnJvd1xuICAgICAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMuYXJyb3dSZWZ9XG4gICAgICAgICAgICAgICAgY29udGV4dD17cG9wcGVyUHJvcHMuY29udGV4dH1cbiAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezh9XG4gICAgICAgICAgICAgICAgd2lkdGg9ezE2fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKC0xcHgpXCIgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190cmlhbmdsZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcikge1xuICAgICAgcG9wcGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lciwge30sIHBvcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbElkICYmICFoaWRlUG9wcGVyKSB7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxQb3J0YWwgcG9ydGFsSWQ9e3BvcnRhbElkfSBwb3J0YWxIb3N0PXtwb3J0YWxIb3N0fT5cbiAgICAgICAgICB7cG9wcGVyfVxuICAgICAgICA8L1BvcnRhbD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlci13cmFwcGVyXCIsIHdyYXBwZXJDbGFzc05hbWUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPGRpdiByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0UmVmZXJlbmNlfSBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc2VzfT5cbiAgICAgICAgICB7dGFyZ2V0Q29tcG9uZW50fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3BvcHBlcn1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoRmxvYXRpbmcoUG9wcGVyQ29tcG9uZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBDYWxlbmRhciBmcm9tIFwiLi9jYWxlbmRhclwiO1xuaW1wb3J0IENhbGVuZGFySWNvbiBmcm9tIFwiLi9jYWxlbmRhcl9pY29uXCI7XG5pbXBvcnQgUG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuaW1wb3J0IFBvcHBlckNvbXBvbmVudCBmcm9tIFwiLi9wb3BwZXJfY29tcG9uZW50XCI7XG5pbXBvcnQgeyBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgfSBmcm9tIFwiLi93aXRoX2Zsb2F0aW5nXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IHNldCB9IGZyb20gXCJkYXRlLWZucy9zZXRcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZEYXlcIjtcbmltcG9ydCB7IGlzVmFsaWQgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgaXNEYXRlLFxuICBpc0JlZm9yZSxcbiAgaXNBZnRlcixcbiAgaXNFcXVhbCxcbiAgc2V0VGltZSxcbiAgZ2V0U2Vjb25kcyxcbiAgZ2V0TWludXRlcyxcbiAgZ2V0SG91cnMsXG4gIGFkZERheXMsXG4gIGFkZE1vbnRocyxcbiAgYWRkV2Vla3MsXG4gIHN1YkRheXMsXG4gIHN1Yk1vbnRocyxcbiAgc3ViV2Vla3MsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNEYXlEaXNhYmxlZCxcbiAgaXNEYXlJblJhbmdlLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBwYXJzZURhdGUsXG4gIHNhZmVEYXRlRm9ybWF0LFxuICBzYWZlRGF0ZVJhbmdlRm9ybWF0LFxuICBnZXRIaWdodExpZ2h0RGF5c01hcCxcbiAgZ2V0WWVhcixcbiAgZ2V0TW9udGgsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBnZXRFbmRPZldlZWssXG4gIHJlZ2lzdGVyTG9jYWxlLFxuICBzZXREZWZhdWx0TG9jYWxlLFxuICBnZXREZWZhdWx0TG9jYWxlLFxuICBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gIGlzU2FtZURheSxcbiAgaXNNb250aERpc2FibGVkLFxuICBpc1llYXJEaXNhYmxlZCxcbiAgc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQsXG4gIGdldEhvbGlkYXlzTWFwLFxuICBpc0RhdGVCZWZvcmUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FsZW5kYXJDb250YWluZXIgfSBmcm9tIFwiLi9jYWxlbmRhcl9jb250YWluZXJcIjtcblxuZXhwb3J0IHsgcmVnaXN0ZXJMb2NhbGUsIHNldERlZmF1bHRMb2NhbGUsIGdldERlZmF1bHRMb2NhbGUgfTtcblxuY29uc3Qgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCI7XG5jb25zdCBXcmFwcGVkQ2FsZW5kYXIgPSBvbkNsaWNrT3V0c2lkZShDYWxlbmRhcik7XG5cbi8vIENvbXBhcmVzIGRhdGVzIHllYXIrbW9udGggY29tYmluYXRpb25zXG5mdW5jdGlvbiBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ2V0TW9udGgoZGF0ZTEpICE9PSBnZXRNb250aChkYXRlMikgfHwgZ2V0WWVhcihkYXRlMSkgIT09IGdldFllYXIoZGF0ZTIpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlMSAhPT0gZGF0ZTI7XG59XG5cbi8qKlxuICogR2VuZXJhbCBkYXRlcGlja2VyIGNvbXBvbmVudC5cbiAqL1xuY29uc3QgSU5QVVRfRVJSXzEgPSBcIkRhdGUgaW5wdXQgbm90IHZhbGlkLlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFsbG93U2FtZURheTogZmFsc2UsXG4gICAgICBkYXRlRm9ybWF0OiBcIk1NL2RkL3l5eXlcIixcbiAgICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogXCJMTExMIHl5eXlcIixcbiAgICAgIG9uQ2hhbmdlKCkge30sXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICBkcm9wZG93bk1vZGU6IFwic2Nyb2xsXCIsXG4gICAgICBvbkZvY3VzKCkge30sXG4gICAgICBvbkJsdXIoKSB7fSxcbiAgICAgIG9uS2V5RG93bigpIHt9LFxuICAgICAgb25JbnB1dENsaWNrKCkge30sXG4gICAgICBvblNlbGVjdCgpIHt9LFxuICAgICAgb25DbGlja091dHNpZGUoKSB7fSxcbiAgICAgIG9uTW9udGhDaGFuZ2UoKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJPcGVuKCkge30sXG4gICAgICBvbkNhbGVuZGFyQ2xvc2UoKSB7fSxcbiAgICAgIHByZXZlbnRPcGVuT25Gb2N1czogZmFsc2UsXG4gICAgICBvblllYXJDaGFuZ2UoKSB7fSxcbiAgICAgIG9uSW5wdXRFcnJvcigpIHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICB3aXRoUG9ydGFsOiBmYWxzZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBmYWxzZSxcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgICBzaG93VGltZVNlbGVjdDogZmFsc2UsXG4gICAgICBzaG93VGltZUlucHV0OiBmYWxzZSxcbiAgICAgIHNob3dQcmV2aW91c01vbnRoczogZmFsc2UsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1llYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dXZWVrUGlja2VyOiBmYWxzZSxcbiAgICAgIHN0cmljdFBhcnNpbmc6IGZhbHNlLFxuICAgICAgc3dhcFJhbmdlOiBmYWxzZSxcbiAgICAgIHRpbWVJbnRlcnZhbHM6IDMwLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIG5leHRZZWFyQXJpYUxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHRpbWVJbnB1dExhYmVsOiBcIlRpbWVcIixcbiAgICAgIGVuYWJsZVRhYkxvb3A6IHRydWUsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBmYWxzZSxcbiAgICAgIHNob3dQb3BwZXJBcnJvdzogdHJ1ZSxcbiAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICBjYWxlbmRhclN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBmYWxzZSxcbiAgICAgIHVzZVBvaW50ZXJFdmVudDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhbGxvd1NhbWVEYXk6IFByb3BUeXBlcy5ib29sLFxuICAgIGFyaWFEZXNjcmliZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhSW52YWxpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxDbG9zZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxsZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhUmVxdWlyZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2FsZW5kYXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FsZW5kYXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xvc2VPblNjcm9sbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1c3RvbUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBjdXN0b21JbnB1dFJlZjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlc1xuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheV0pLFxuICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdlZWtEYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm06IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzQ2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgXSksXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY2FsZW5kYXJJY29uQ2xhc3NuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoc1Nob3duOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2VSYXc6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DYWxlbmRhck9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2FsZW5kYXJDbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcGxhY2Vob2xkZXJUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwcmV2ZW50T3Blbk9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RyaWN0UGFyc2luZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3dhcFJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzdGFydE9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2l0aFBvcnRhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGF0ZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjbGVhckJ1dHRvblRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvY3VzU2VsZWN0ZWRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBleGNsdWRlU2Nyb2xsYmFyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCk7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKFxuICAgICAgcHJldlByb3BzLmlubGluZSAmJlxuICAgICAgaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcHJldlByb3BzLm1vbnRoc1Nob3duICE9PSB0aGlzLnByb3BzLm1vbnRoc1Nob3duXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiAwIH0pO1xuICAgIH1cbiAgICBpZiAocHJldlByb3BzLmhpZ2hsaWdodERhdGVzICE9PSB0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICFwcmV2U3RhdGUuZm9jdXNlZCAmJlxuICAgICAgIWlzRXF1YWwocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZTdGF0ZS5vcGVuICE9PSB0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gZmFsc2UgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhck9wZW4oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSB0cnVlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgZ2V0UHJlU2VsZWN0aW9uID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgID8gdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c0VuZCAmJiB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzU3RhcnQgJiYgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA6IG5ld0RhdGUoKTtcblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGZyb20gc3RyaW5nIGZvcm1hdCB0byBzdGFuZGFyZCBEYXRlIGZvcm1hdFxuICBtb2RpZnlIb2xpZGF5cyA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5ob2xpZGF5cz8ucmVkdWNlKChhY2N1bXVsYXRvciwgaG9saWRheSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGhvbGlkYXkuZGF0ZSk7XG4gICAgICBpZiAoIWlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gWy4uLmFjY3VtdWxhdG9yLCB7IC4uLmhvbGlkYXksIGRhdGUgfV07XG4gICAgfSwgW10pO1xuXG4gIGNhbGNJbml0aWFsU3RhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFByZVNlbGVjdGlvbiA9IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgYm91bmRlZFByZVNlbGVjdGlvbiA9XG4gICAgICBtaW5EYXRlICYmIGlzQmVmb3JlKGRlZmF1bHRQcmVTZWxlY3Rpb24sIHN0YXJ0T2ZEYXkobWluRGF0ZSkpXG4gICAgICAgID8gbWluRGF0ZVxuICAgICAgICA6IG1heERhdGUgJiYgaXNBZnRlcihkZWZhdWx0UHJlU2VsZWN0aW9uLCBlbmRPZkRheShtYXhEYXRlKSlcbiAgICAgICAgICA/IG1heERhdGVcbiAgICAgICAgICA6IGRlZmF1bHRQcmVTZWxlY3Rpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IHRoaXMucHJvcHMuc3RhcnRPcGVuIHx8IGZhbHNlLFxuICAgICAgcHJldmVudEZvY3VzOiBmYWxzZSxcbiAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZCkgPz8gYm91bmRlZFByZVNlbGVjdGlvbixcbiAgICAgIC8vIHRyYW5zZm9ybWluZyBoaWdobGlnaHRlZCBkYXlzIChwZXJoYXBzIG5lc3RlZCBhcnJheSlcbiAgICAgIC8vIHRvIGZsYXQgTWFwIGZvciBmYXN0ZXIgYWNjZXNzIGluIGRheS5qc3hcbiAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgLy8gdXNlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb24gYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQsIGJ1dCBub3Qgb25cbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfTtcblxuICBjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmVudEZvY3VzVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIHNldEZvY3VzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZm9jdXMpIHtcbiAgICAgIHRoaXMuaW5wdXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZXRCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuYmx1cikge1xuICAgICAgdGhpcy5pbnB1dC5ibHVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgc2V0T3BlbiA9IChvcGVuLCBza2lwU2V0Qmx1ciA9IGZhbHNlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgb3Blbjogb3BlbixcbiAgICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAgIG9wZW4gJiYgdGhpcy5zdGF0ZS5vcGVuXG4gICAgICAgICAgICA/IHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uXG4gICAgICAgICAgICA6IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpLnByZVNlbGVjdGlvbixcbiAgICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUsXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgIGZvY3VzZWQ6IHNraXBTZXRCbHVyID8gcHJldi5mb2N1c2VkIDogZmFsc2UsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgIXNraXBTZXRCbHVyICYmIHRoaXMuc2V0Qmx1cigpO1xuXG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG4gIGlucHV0T2sgPSAoKSA9PiBpc0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuXG4gIGlzQ2FsZW5kYXJPcGVuID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW4gPT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLnN0YXRlLm9wZW4gJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHlcbiAgICAgIDogdGhpcy5wcm9wcy5vcGVuO1xuXG4gIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnByZXZlbnRGb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXMgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTtcbiAgfTtcblxuICBzZW5kRm9jdXNCYWNrVG9JbnB1dCA9ICgpID0+IHtcbiAgICAvLyBDbGVhciBwcmV2aW91cyB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgdGhlIHBvcHBlciBhbmQgcmVmb2N1cyB0aGUgaW5wdXRcbiAgICAvLyBzdG9wIHRoZSBpbnB1dCBmcm9tIGF1dG8gb3BlbmluZyBvbkZvY3VzXG4gICAgLy8gc2V0Rm9jdXMgdG8gdGhlIGlucHV0XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogdHJ1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNhbmNlbEZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9O1xuXG4gIGRlZmVyRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldEZvY3VzKCksIDEpO1xuICB9O1xuXG4gIGhhbmRsZURyb3Bkb3duRm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgaGFuZGxlQmx1ciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5vcGVuIHx8IHRoaXMucHJvcHMud2l0aFBvcnRhbCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAoLi4uYWxsQXJncykgPT4ge1xuICAgIGxldCBldmVudCA9IGFsbEFyZ3NbMF07XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcuYXBwbHkodGhpcywgYWxsQXJncyk7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnB1dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCxcbiAgICB9KTtcbiAgICBsZXQgZGF0ZSA9IHBhcnNlRGF0ZShcbiAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5zdHJpY3RQYXJzaW5nLFxuICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICk7XG4gICAgLy8gVXNlIGRhdGUgZnJvbSBgc2VsZWN0ZWRgIHByb3Agd2hlbiBtYW5pcHVsYXRpbmcgb25seSB0aW1lIGZvciBpbnB1dCB2YWx1ZVxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICBkYXRlICYmXG4gICAgICAhaXNTYW1lRGF5KGRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICBkYXRlID0gc2V0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHtcbiAgICAgICAgaG91cnM6IGdldEhvdXJzKGRhdGUpLFxuICAgICAgICBtaW51dGVzOiBnZXRNaW51dGVzKGRhdGUpLFxuICAgICAgICBzZWNvbmRzOiBnZXRTZWNvbmRzKGRhdGUpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRlIHx8ICFldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3QgPSAoZGF0ZSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIC8vIFByZXZlbnRpbmcgb25Gb2N1cyBldmVudCB0byBmaXggaXNzdWVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvaXNzdWVzLzYyOFxuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdyhldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIGZhbHNlLCBtb250aFNlbGVjdGVkSW4pO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmICFpc0RhdGVCZWZvcmUoZGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBzZXRTZWxlY3RlZCA9IChkYXRlLCBldmVudCwga2VlcElucHV0LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSBkYXRlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZERhdGUgIT09IG51bGwgJiZcbiAgICAgICAgaXNZZWFyRGlzYWJsZWQoZ2V0WWVhcihjaGFuZ2VkRGF0ZSksIHRoaXMucHJvcHMpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNNb250aERpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc0RheURpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0c011bHRpcGxlLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICAgIG1pblRpbWUsXG4gICAgICBzd2FwUmFuZ2UsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhaXNFcXVhbCh0aGlzLnByb3BzLnNlbGVjdGVkLCBjaGFuZ2VkRGF0ZSkgfHxcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dTYW1lRGF5IHx8XG4gICAgICBzZWxlY3RzUmFuZ2UgfHxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZVxuICAgICkge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICAgICAgKCFrZWVwSW5wdXQgfHxcbiAgICAgICAgICAgICghdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgaG91cjogZ2V0SG91cnModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBzZWNvbmQ6IGdldFNlY29uZHModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBtaW5UaW1lIGlzIHByZXNlbnQgdGhlbiBzZXQgdGhlIHRpbWUgdG8gbWluVGltZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWtlZXBJbnB1dCAmJlxuICAgICAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobWluVGltZSkge1xuICAgICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICAgIGhvdXI6IG1pblRpbWUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgbWludXRlOiBtaW5UaW1lLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgc2Vjb25kOiBtaW5UaW1lLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmZvY3VzU2VsZWN0ZWRNb250aCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IG1vbnRoU2VsZWN0ZWRJbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdHNSYW5nZSkge1xuICAgICAgICBjb25zdCBub1JhbmdlcyA9ICFzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0UmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGlzUmFuZ2VGaWxsZWQgPSBzdGFydERhdGUgJiYgZW5kRGF0ZTtcbiAgICAgICAgaWYgKG5vUmFuZ2VzKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlZERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlQmVmb3JlKGNoYW5nZWREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgICBpZiAoc3dhcFJhbmdlKSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgc3RhcnREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbc3RhcnREYXRlLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmFuZ2VGaWxsZWQpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0c011bHRpcGxlKSB7XG4gICAgICAgIGlmICghc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZERhdGVzLnNvbWUoXG4gICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiBpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RGF0ZXMgPSBzZWxlY3RlZERhdGVzLmZpbHRlcihcbiAgICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gIWlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIG9uQ2hhbmdlKG5leHREYXRlcywgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbLi4uc2VsZWN0ZWREYXRlcywgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbkNoYW5nZShjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgha2VlcElucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gV2hlbiBjaGVja2luZyBwcmVTZWxlY3Rpb24gdmlhIG1pbi9tYXhEYXRlLCB0aW1lcyBuZWVkIHRvIGJlIG1hbmlwdWxhdGVkIHZpYSBzdGFydE9mRGF5L2VuZE9mRGF5XG4gIHNldFByZVNlbGVjdGlvbiA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgaGFzTWluRGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1pbkRhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgY29uc3QgaGFzTWF4RGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1heERhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgbGV0IGlzVmFsaWREYXRlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGUpO1xuICAgICAgaWYgKGhhc01pbkRhdGUgJiYgaGFzTWF4RGF0ZSkge1xuICAgICAgICAvLyBpc0RheUluUmFuZ2UgdXNlcyBzdGFydE9mRGF5IGludGVybmFsbHksIHNvIG5vdCBuZWNlc3NhcnkgdG8gbWFuaXB1bGF0ZSB0aW1lcyBoZXJlXG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID0gaXNEYXlJblJhbmdlKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWluRGF0ZSkge1xuICAgICAgICBjb25zdCBtaW5EYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkodGhpcy5wcm9wcy5taW5EYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQWZ0ZXIoZGF0ZSwgbWluRGF0ZVN0YXJ0T2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWluRGF0ZVN0YXJ0T2ZEYXkpO1xuICAgICAgfSBlbHNlIGlmIChoYXNNYXhEYXRlKSB7XG4gICAgICAgIGNvbnN0IG1heERhdGVFbmRPZkRheSA9IGVuZE9mRGF5KHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0JlZm9yZShkYXRlLCBtYXhEYXRlRW5kT2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWF4RGF0ZUVuZE9mRGF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzVmFsaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcHJlU2VsZWN0aW9uOiBkYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZUNhbGVuZGFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0T3BlbighdGhpcy5zdGF0ZS5vcGVuKTtcbiAgfTtcblxuICBoYW5kbGVUaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgOiB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGltZVxuICAgICAgOiBzZXRUaW1lKHNlbGVjdGVkLCB7XG4gICAgICAgICAgaG91cjogZ2V0SG91cnModGltZSksXG4gICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRpbWUpLFxuICAgICAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hhbmdlZERhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgb25JbnB1dENsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25JbnB1dENsaWNrKCk7XG4gIH07XG5cbiAgb25JbnB1dEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5zdGF0ZS5vcGVuICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1c1xuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiRW50ZXJcIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub25JbnB1dENsaWNrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgY2FsZW5kYXIgaXMgb3BlbiwgdGhlc2Uga2V5cyB3aWxsIGZvY3VzIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50S2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzZWxlY3RvclN0cmluZyA9XG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJiB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc1xuICAgICAgICAgICAgPyAnLnJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyW3RhYmluZGV4PVwiMFwiXSdcbiAgICAgICAgICAgIDogJy5yZWFjdC1kYXRlcGlja2VyX19kYXlbdGFiaW5kZXg9XCIwXCJdJztcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID1cbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUgJiZcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW0uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuaW5wdXRPaygpICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5sYXN0UHJlU2VsZWN0Q2hhbmdlID09PSBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiVGFiXCIpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uUG9ydGFsS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBwcmV2ZW50Rm9jdXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICAvLyBrZXlEb3duIGV2ZW50cyBwYXNzZWQgZG93biB0byBkYXkuanN4XG4gIG9uRGF5S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc1NoaWZ0S2V5QWN0aXZlID0gZXZlbnQuc2hpZnRLZXk7XG5cbiAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBsZXQgbmV3U2VsZWN0aW9uO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJEYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZERheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlVXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IHN1YlllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IHN1Yk1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBhZGRZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBhZGRNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJIb21lXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgICBjb3B5LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkVuZFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldEVuZE9mV2Vlayhjb3B5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFuZXdTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dEVycm9yKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgfSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZChuZXdTZWxlY3Rpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24obmV3U2VsZWN0aW9uKTtcbiAgICAgIC8vIG5lZWQgdG8gZmlndXJlIG91dCB3aGV0aGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvblxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgIGNvbnN0IHByZXZNb250aCA9IGdldE1vbnRoKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdNb250aCA9IGdldE1vbnRoKG5ld1NlbGVjdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZZZWFyID0gZ2V0WWVhcihjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3WWVhciA9IGdldFllYXIobmV3U2VsZWN0aW9uKTtcblxuICAgICAgICBpZiAocHJldk1vbnRoICE9PSBuZXdNb250aCB8fCBwcmV2WWVhciAhPT0gbmV3WWVhcikge1xuICAgICAgICAgIC8vIG1vbnRoIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1vbnRoIGhhc24ndCBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBoYW5kbGUgZ2VuZXJpYyBrZXkgZG93biBldmVudHMgaW4gdGhlIHBvcHBlciB0aGF0IGRvIG5vdCBhZGp1c3Qgb3Igc2VsZWN0IGRhdGVzXG4gIC8vIGV4OiB3aGlsZSBmb2N1c2luZyBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnNcbiAgb25Qb3BwZXJLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgfTtcblxuICBvbkNsZWFyQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsLCBldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIGNsZWFyID0gKCkgPT4ge1xuICAgIHRoaXMub25DbGVhckNsaWNrKCk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImJvb2xlYW5cIiAmJlxuICAgICAgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbChldmVudCkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5pc0NhbGVuZGFyT3BlbigpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxXcmFwcGVkQ2FsZW5kYXJcbiAgICAgICAgcmVmPXsoZWxlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbGVtO1xuICAgICAgICB9fVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnNldE9wZW59XG4gICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0Q2FsZW5kYXJ9XG4gICAgICAgIHVzZVdlZWtkYXlzU2hvcnQ9e3RoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydH1cbiAgICAgICAgZm9ybWF0V2Vla0RheT17dGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5fVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnN0YXRlLnByZVNlbGVjdGlvbn1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICBvbkNsaWNrT3V0c2lkZT17dGhpcy5oYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZX1cbiAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5zdGF0ZS5oaWdobGlnaHREYXRlc31cbiAgICAgICAgaG9saWRheXM9e2dldEhvbGlkYXlzTWFwKHRoaXMubW9kaWZ5SG9saWRheXMoKSl9XG4gICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMuc3RhdGUuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgIHNob3dQcmV2aW91c01vbnRocz17dGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHN9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgd2Vla0xhYmVsPXt0aGlzLnByb3BzLndlZWtMYWJlbH1cbiAgICAgICAgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3M9e291dHNpZGVDbGlja0lnbm9yZUNsYXNzfVxuICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgbW9udGhzU2hvd249e3RoaXMucHJvcHMubW9udGhzU2hvd259XG4gICAgICAgIG1vbnRoU2VsZWN0ZWRJbj17dGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW59XG4gICAgICAgIG9uRHJvcGRvd25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgICBvbk1vbnRoQ2hhbmdlPXt0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2V9XG4gICAgICAgIG9uWWVhckNoYW5nZT17dGhpcy5wcm9wcy5vblllYXJDaGFuZ2V9XG4gICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgIHdlZWtEYXlDbGFzc05hbWU9e3RoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZX1cbiAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgc2hvd0RhdGVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICBvblRpbWVDaGFuZ2U9e3RoaXMuaGFuZGxlVGltZUNoYW5nZX1cbiAgICAgICAgdGltZUZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICB0aW1lSW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2FsZW5kYXJDbGFzc05hbWV9XG4gICAgICAgIGNvbnRhaW5lcj17dGhpcy5wcm9wcy5jYWxlbmRhckNvbnRhaW5lcn1cbiAgICAgICAgeWVhckl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckl0ZW1OdW1iZXJ9XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0TW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgICBuZXh0TW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQXJpYUxhYmVsfVxuICAgICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgcmVuZGVyQ3VzdG9tSGVhZGVyPXt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcn1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXJ9XG4gICAgICAgIG9uTW9udGhNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgIHNob3dUaW1lSW5wdXQ9e3RoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICBleGNsdWRlU2Nyb2xsYmFyPXt0aGlzLnByb3BzLmV4Y2x1ZGVTY3JvbGxiYXJ9XG4gICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5vbktleURvd259XG4gICAgICAgIGhhbmRsZU9uRGF5S2V5RG93bj17dGhpcy5vbkRheUtleURvd259XG4gICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnN0YXRlLmZvY3VzZWR9XG4gICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgIHllYXJDbGFzc05hbWU9e3RoaXMucHJvcHMueWVhckNsYXNzTmFtZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L1dyYXBwZWRDYWxlbmRhcj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzQ29udGFpbnNUaW1lID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0O1xuICAgIGNvbnN0IGxvbmdEYXRlRm9ybWF0ID0gaXNDb250YWluc1RpbWUgPyBcIlBQUFBwXCIgOiBcIlBQUFBcIjtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgc3RhcnQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgIH0sXG4gICAgICApfS4gJHtcbiAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyBcIkVuZCBkYXRlOiBcIiArXG4gICAgICAgICAgICBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLmVuZERhdGUsIHtcbiAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB0aW1lOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB5ZWFyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcInl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBtb250aDogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJNTU1NIHl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHF1YXJ0ZXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBcInl5eXksIFFRUVwiLFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7YXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsc3godGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgIFtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc106IHRoaXMuc3RhdGUub3BlbixcbiAgICB9KTtcblxuICAgIGNvbnN0IGN1c3RvbUlucHV0ID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dCB8fCA8aW5wdXQgdHlwZT1cInRleHRcIiAvPjtcbiAgICBjb25zdCBjdXN0b21JbnB1dFJlZiA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXRSZWYgfHwgXCJyZWZcIjtcbiAgICBjb25zdCBpbnB1dFZhbHVlID1cbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICA6IHR5cGVvZiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICA/IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICAgID8gc2FmZURhdGVSYW5nZUZvcm1hdChcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgICAgICAgICA/IHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcywgdGhpcy5wcm9wcylcbiAgICAgICAgICAgICAgOiBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzKTtcblxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tSW5wdXQsIHtcbiAgICAgIFtjdXN0b21JbnB1dFJlZl06IChpbnB1dCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICB9LFxuICAgICAgdmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1cixcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25JbnB1dENsaWNrLFxuICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgZm9ybTogdGhpcy5wcm9wcy5mb3JtLFxuICAgICAgYXV0b0ZvY3VzOiB0aGlzLnByb3BzLmF1dG9Gb2N1cyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyVGV4dCxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgYXV0b0NvbXBsZXRlOiB0aGlzLnByb3BzLmF1dG9Db21wbGV0ZSxcbiAgICAgIGNsYXNzTmFtZTogY2xzeChjdXN0b21JbnB1dC5wcm9wcy5jbGFzc05hbWUsIGNsYXNzTmFtZSksXG4gICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucHJvcHMucmVxdWlyZWQsXG4gICAgICB0YWJJbmRleDogdGhpcy5wcm9wcy50YWJJbmRleCxcbiAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiB0aGlzLnByb3BzLmFyaWFEZXNjcmliZWRCeSxcbiAgICAgIFwiYXJpYS1pbnZhbGlkXCI6IHRoaXMucHJvcHMuYXJpYUludmFsaWQsXG4gICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aGlzLnByb3BzLmFyaWFMYWJlbGxlZEJ5LFxuICAgICAgXCJhcmlhLXJlcXVpcmVkXCI6IHRoaXMucHJvcHMuYXJpYVJlcXVpcmVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlckNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ2xlYXJhYmxlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBjbGVhckJ1dHRvblRpdGxlLFxuICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUgPSBcIlwiLFxuICAgICAgYXJpYUxhYmVsQ2xvc2UgPSBcIkNsb3NlXCIsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChcbiAgICAgIGlzQ2xlYXJhYmxlICYmXG4gICAgICAoc2VsZWN0ZWQgIT0gbnVsbCB8fFxuICAgICAgICBzdGFydERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBlbmREYXRlICE9IG51bGwgfHxcbiAgICAgICAgc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvblwiLFxuICAgICAgICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUsXG4gICAgICAgICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvbi0tZGlzYWJsZWRcIjogZGlzYWJsZWQgfSxcbiAgICAgICAgICApfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWxDbG9zZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xlYXJDbGlja31cbiAgICAgICAgICB0aXRsZT17Y2xlYXJCdXR0b25UaXRsZX1cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRDb250YWluZXIoKSB7XG4gICAgY29uc3QgeyBzaG93SWNvbiwgaWNvbiwgY2FsZW5kYXJJY29uQ2xhc3NuYW1lLCB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9wZW4gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19pbnB1dC1jb250YWluZXIke1xuICAgICAgICAgIHNob3dJY29uID8gXCIgcmVhY3QtZGF0ZXBpY2tlcl9fdmlldy1jYWxlbmRhci1pY29uXCIgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICB7c2hvd0ljb24gJiYgKFxuICAgICAgICAgIDxDYWxlbmRhckljb25cbiAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake2NhbGVuZGFySWNvbkNsYXNzbmFtZX0gJHtcbiAgICAgICAgICAgICAgb3BlbiAmJiBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgey4uLih0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy50b2dnbGVDYWxlbmRhcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgdGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJEYXRlSW5wdXQoKX1cbiAgICAgICAge3RoaXMucmVuZGVyQ2xlYXJCdXR0b24oKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2FsZW5kYXIgPSB0aGlzLnJlbmRlckNhbGVuZGFyKCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHJldHVybiBjYWxlbmRhcjtcblxuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGxldCBwb3J0YWxDb250YWluZXIgPSB0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcG9ydGFsXCJcbiAgICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblBvcnRhbEtleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NhbGVuZGFyfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApIDogbnVsbDtcblxuICAgICAgaWYgKHRoaXMuc3RhdGUub3BlbiAmJiB0aGlzLnByb3BzLnBvcnRhbElkKSB7XG4gICAgICAgIHBvcnRhbENvbnRhaW5lciA9IChcbiAgICAgICAgICA8UG9ydGFsXG4gICAgICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICAgIDwvUG9ydGFsPlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wcGVyQ29tcG9uZW50XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wb3BwZXJDbGFzc05hbWV9XG4gICAgICAgIHdyYXBwZXJDbGFzc05hbWU9e3RoaXMucHJvcHMud3JhcHBlckNsYXNzTmFtZX1cbiAgICAgICAgaGlkZVBvcHBlcj17IXRoaXMuaXNDYWxlbmRhck9wZW4oKX1cbiAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgcG9wcGVyTW9kaWZpZXJzPXt0aGlzLnByb3BzLnBvcHBlck1vZGlmaWVyc31cbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50PXt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgIHBvcHBlckNvbnRhaW5lcj17dGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXJ9XG4gICAgICAgIHBvcHBlckNvbXBvbmVudD17Y2FsZW5kYXJ9XG4gICAgICAgIHBvcHBlclBsYWNlbWVudD17dGhpcy5wcm9wcy5wb3BwZXJQbGFjZW1lbnR9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICBwb3BwZXJPbktleURvd249e3RoaXMub25Qb3BwZXJLZXlEb3dufVxuICAgICAgICBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9XG4gICAgICAgIHNob3dBcnJvdz17dGhpcy5wcm9wcy5zaG93UG9wcGVyQXJyb3d9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQgPSBcImlucHV0XCI7XG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSA9IFwibmF2aWdhdGVcIjtcbiJdLCJuYW1lcyI6WyJERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIiLCJsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsIm5ld0RhdGUiLCJ2YWx1ZSIsImQiLCJTdHJpbmciLCJwYXJzZUlTTyIsInRvRGF0ZSIsIkRhdGUiLCJpc1ZhbGlkIiwicGFyc2VEYXRlIiwiZGF0ZUZvcm1hdCIsImxvY2FsZSIsInN0cmljdFBhcnNpbmciLCJtaW5EYXRlIiwicGFyc2VkRGF0ZSIsImxvY2FsZU9iamVjdCIsImdldExvY2FsZU9iamVjdCIsImdldERlZmF1bHRMb2NhbGUiLCJzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJkZiIsInRyeVBhcnNlRGF0ZSIsInBhcnNlIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwidXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyIsImZvcm1hdERhdGUiLCJtYXRjaCIsIm1hcCIsInN1YnN0cmluZyIsImZpcnN0Q2hhcmFjdGVyIiwibG9uZ0Zvcm1hdHRlciIsImxvbmdGb3JtYXR0ZXJzIiwiZm9ybWF0TG9uZyIsImpvaW4iLCJsZW5ndGgiLCJzbGljZSIsImRhdGUiLCJpc1ZhbGlkRGF0ZSIsImlzQmVmb3JlIiwiZm9ybWF0U3RyIiwiZm9ybWF0IiwibG9jYWxlT2JqIiwiY29uc29sZSIsIndhcm4iLCJjb25jYXQiLCJzYWZlRGF0ZUZvcm1hdCIsIl9yZWYiLCJzYWZlRGF0ZVJhbmdlRm9ybWF0Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInByb3BzIiwiZm9ybWF0dGVkU3RhcnREYXRlIiwiZm9ybWF0dGVkRW5kRGF0ZSIsInNhZmVNdWx0aXBsZURhdGVzRm9ybWF0IiwiZGF0ZXMiLCJmb3JtYXR0ZWRGaXJzdERhdGUiLCJmb3JtYXR0ZWRTZWNvbmREYXRlIiwiZXh0cmFEYXRlc0NvdW50Iiwic2V0VGltZSIsIl9yZWYyIiwiX3JlZjIkaG91ciIsImhvdXIiLCJfcmVmMiRtaW51dGUiLCJtaW51dGUiLCJfcmVmMiRzZWNvbmQiLCJzZWNvbmQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwiZ2V0V2VlayIsImdldElTT1dlZWsiLCJnZXREYXlPZldlZWtDb2RlIiwiZGF5IiwiZ2V0U3RhcnRPZkRheSIsInN0YXJ0T2ZEYXkiLCJnZXRTdGFydE9mV2VlayIsImNhbGVuZGFyU3RhcnREYXkiLCJzdGFydE9mV2VlayIsIndlZWtTdGFydHNPbiIsImdldFN0YXJ0T2ZNb250aCIsInN0YXJ0T2ZNb250aCIsImdldFN0YXJ0T2ZZZWFyIiwic3RhcnRPZlllYXIiLCJnZXRTdGFydE9mUXVhcnRlciIsInN0YXJ0T2ZRdWFydGVyIiwiZ2V0U3RhcnRPZlRvZGF5IiwiZ2V0RW5kT2ZXZWVrIiwiZW5kT2ZXZWVrIiwiaXNTYW1lWWVhciIsImRhdGUxIiwiZGF0ZTIiLCJkZklzU2FtZVllYXIiLCJpc1NhbWVNb250aCIsImRmSXNTYW1lTW9udGgiLCJpc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVRdWFydGVyIiwiaXNTYW1lRGF5IiwiZGZJc1NhbWVEYXkiLCJpc0VxdWFsIiwiZGZJc0VxdWFsIiwiaXNEYXlJblJhbmdlIiwidmFsaWQiLCJzdGFydCIsImVuZCIsImVuZE9mRGF5IiwiaXNXaXRoaW5JbnRlcnZhbCIsImVyciIsInJlZ2lzdGVyTG9jYWxlIiwibG9jYWxlTmFtZSIsImxvY2FsZURhdGEiLCJzY29wZSIsIndpbmRvdyIsImdsb2JhbFRoaXMiLCJfX2xvY2FsZURhdGFfXyIsInNldERlZmF1bHRMb2NhbGUiLCJfX2xvY2FsZUlkX18iLCJsb2NhbGVTcGVjIiwiZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlIiwiZm9ybWF0RnVuYyIsImdldFdlZWtkYXlNaW5JbkxvY2FsZSIsImdldFdlZWtkYXlTaG9ydEluTG9jYWxlIiwiZ2V0TW9udGhJbkxvY2FsZSIsIm1vbnRoIiwic2V0TW9udGgiLCJnZXRNb250aFNob3J0SW5Mb2NhbGUiLCJnZXRRdWFydGVyU2hvcnRJbkxvY2FsZSIsInF1YXJ0ZXIiLCJzZXRRdWFydGVyIiwiaXNEYXlEaXNhYmxlZCIsIl9yZWYzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwibWF4RGF0ZSIsImV4Y2x1ZGVEYXRlcyIsImV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIiwiaW5jbHVkZURhdGVzIiwiaW5jbHVkZURhdGVJbnRlcnZhbHMiLCJmaWx0ZXJEYXRlIiwiaXNPdXRPZkJvdW5kcyIsInNvbWUiLCJleGNsdWRlRGF0ZSIsIl9yZWY0IiwiaW5jbHVkZURhdGUiLCJfcmVmNSIsImlzRGF5RXhjbHVkZWQiLCJfcmVmNiIsIl9yZWY3IiwiaXNNb250aERpc2FibGVkIiwiX3JlZjgiLCJlbmRPZk1vbnRoIiwiaXNNb250aEluUmFuZ2UiLCJtIiwic3RhcnREYXRlWWVhciIsImdldFllYXIiLCJzdGFydERhdGVNb250aCIsImdldE1vbnRoIiwiZW5kRGF0ZVllYXIiLCJlbmREYXRlTW9udGgiLCJkYXlZZWFyIiwiaXNRdWFydGVyRGlzYWJsZWQiLCJfcmVmOSIsImlzWWVhckluUmFuZ2UiLCJ5ZWFyIiwic3RhcnRZZWFyIiwiZW5kWWVhciIsImlzWWVhckRpc2FibGVkIiwiX3JlZjEwIiwiZW5kT2ZZZWFyIiwiaXNRdWFydGVySW5SYW5nZSIsInEiLCJzdGFydERhdGVRdWFydGVyIiwiZ2V0UXVhcnRlciIsImVuZERhdGVRdWFydGVyIiwiX3JlZjExIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiaXNUaW1lSW5MaXN0IiwidGltZSIsInRpbWVzIiwibGlzdFRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJpc1RpbWVEaXNhYmxlZCIsIl9yZWYxMiIsImV4Y2x1ZGVUaW1lcyIsImluY2x1ZGVUaW1lcyIsImZpbHRlclRpbWUiLCJpc1RpbWVJbkRpc2FibGVkUmFuZ2UiLCJfcmVmMTMiLCJtaW5UaW1lIiwibWF4VGltZSIsIkVycm9yIiwiYmFzZSIsImJhc2VUaW1lIiwibWluIiwibWF4IiwibW9udGhEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNCIsInByZXZpb3VzTW9udGgiLCJzdWJNb250aHMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyIsImV2ZXJ5IiwibW9udGhEaXNhYmxlZEFmdGVyIiwiX3JlZjE1IiwibmV4dE1vbnRoIiwiYWRkTW9udGhzIiwicXVhcnRlckRpc2FibGVkQmVmb3JlIiwiX3JlZjE2IiwiZmlyc3REYXRlT2ZZZWFyIiwicHJldmlvdXNRdWFydGVyIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwicXVhcnRlckRpc2FibGVkQWZ0ZXIiLCJfcmVmMTciLCJsYXN0RGF0ZU9mWWVhciIsIm5leHRRdWFydGVyIiwiYWRkUXVhcnRlcnMiLCJ5ZWFyRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTgiLCJwcmV2aW91c1llYXIiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQmVmb3JlIiwiX3JlZjE5IiwiX3JlZjE5JHllYXJJdGVtTnVtYmVyIiwieWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QiLCJnZXRZZWFyc1BlcmlvZCIsImVuZFBlcmlvZCIsIm1pbkRhdGVZZWFyIiwieWVhckRpc2FibGVkQWZ0ZXIiLCJfcmVmMjAiLCJuZXh0WWVhciIsImFkZFllYXJzIiwieWVhcnNEaXNhYmxlZEFmdGVyIiwiX3JlZjIxIiwiX3JlZjIxJHllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kMiIsInN0YXJ0UGVyaW9kIiwibWF4RGF0ZVllYXIiLCJnZXRFZmZlY3RpdmVNaW5EYXRlIiwiX3JlZjIyIiwibWluRGF0ZXMiLCJmaWx0ZXIiLCJnZXRFZmZlY3RpdmVNYXhEYXRlIiwiX3JlZjIzIiwibWF4RGF0ZXMiLCJnZXRIaWdodExpZ2h0RGF5c01hcCIsImhpZ2hsaWdodERhdGVzIiwiZGVmYXVsdENsYXNzTmFtZSIsImRhdGVDbGFzc2VzIiwiTWFwIiwiaSIsImxlbiIsIm9iaiIsImlzRGF0ZSIsImtleSIsImNsYXNzTmFtZXNBcnIiLCJnZXQiLCJpbmNsdWRlcyIsInB1c2giLCJzZXQiLCJfdHlwZW9mIiwia2V5cyIsIk9iamVjdCIsImNsYXNzTmFtZSIsImFyck9mRGF0ZXMiLCJjb25zdHJ1Y3RvciIsImsiLCJhcnJheXNBcmVFcXVhbCIsImFycmF5MSIsImFycmF5MiIsImluZGV4IiwiZ2V0SG9saWRheXNNYXAiLCJob2xpZGF5RGF0ZXMiLCJob2xpZGF5IiwiZGF0ZU9iaiIsImhvbGlkYXlOYW1lIiwiY2xhc3NOYW1lc09iaiIsImhvbGlkYXlOYW1lQXJyIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwidGltZXNUb0luamVjdEFmdGVyIiwiY3VycmVudFRpbWUiLCJjdXJyZW50TXVsdGlwbGllciIsImludGVydmFscyIsImluamVjdGVkVGltZXMiLCJsIiwiaW5qZWN0ZWRUaW1lIiwiYWRkSG91cnMiLCJhZGRNaW51dGVzIiwiYWRkU2Vjb25kcyIsImdldFNlY29uZHMiLCJuZXh0VGltZSIsImlzQWZ0ZXIiLCJhZGRaZXJvIiwiTWF0aCIsImNlaWwiLCJnZXRIb3Vyc0luRGF5IiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwic3RhcnRPZlRoZU5leHREYXkiLCJyb3VuZCIsInN0YXJ0T2ZNaW51dGUiLCJzZWNvbmRzIiwibWlsbGlzZWNvbmRzIiwiZ2V0TWlsbGlzZWNvbmRzIiwiZ2V0VGltZSIsImlzU2FtZU1pbnV0ZSIsImQxIiwiZDIiLCJnZXRNaWRuaWdodERhdGUiLCJkYXRlV2l0aG91dFRpbWUiLCJpc0RhdGVCZWZvcmUiLCJkYXRlVG9Db21wYXJlIiwibWlkbmlnaHREYXRlIiwibWlkbmlnaHREYXRlVG9Db21wYXJlIiwiaXNTcGFjZUtleURvd24iLCJldmVudCIsIlNQQUNFX0tFWSIsImdlbmVyYXRlWWVhcnMiLCJub09mWWVhciIsImxpc3QiLCJuZXdZZWFyIiwiaXNJblJhbmdlIiwiWWVhckRyb3Bkb3duT3B0aW9ucyIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9jYWxsU3VwZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJzZWxlY3RlZFllYXIiLCJvcHRpb25zIiwic3RhdGUiLCJ5ZWFyc0xpc3QiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJvbkNsaWNrIiwib25DaGFuZ2UiLCJiaW5kIiwibWluWWVhciIsIm1heFllYXIiLCJmaW5kIiwidW5zaGlmdCIsImluY3JlbWVudFllYXJzIiwiZGVjcmVtZW50WWVhcnMiLCJvbkNhbmNlbCIsImFtb3VudCIsInllYXJzIiwic2V0U3RhdGUiLCJzaGlmdFllYXJzIiwieWVhckRyb3Bkb3duSXRlbU51bWJlciIsInNjcm9sbGFibGVZZWFyRHJvcGRvd24iLCJkcm9wZG93blJlZiIsImNyZWF0ZVJlZiIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImNvbXBvbmVudERpZE1vdW50IiwiZHJvcGRvd25DdXJyZW50IiwiY3VycmVudCIsImRyb3Bkb3duQ3VycmVudENoaWxkcmVuIiwiY2hpbGRyZW4iLCJmcm9tIiwic2VsZWN0ZWRZZWFyT3B0aW9uRWwiLCJjaGlsZEVsIiwiYXJpYVNlbGVjdGVkIiwic2Nyb2xsVG9wIiwib2Zmc2V0VG9wIiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwicmVuZGVyIiwiZHJvcGRvd25DbGFzcyIsImNsc3giLCJyZWYiLCJyZW5kZXJPcHRpb25zIiwiQ29tcG9uZW50IiwiV3JhcHBlZFllYXJEcm9wZG93bk9wdGlvbnMiLCJvbkNsaWNrT3V0c2lkZSIsIlllYXJEcm9wZG93biIsIl9sZW4iLCJhcmdzIiwiX2tleSIsImRyb3Bkb3duVmlzaWJsZSIsImUiLCJ0YXJnZXQiLCJvblNlbGVjdENoYW5nZSIsInJlbmRlclNlbGVjdE9wdGlvbnMiLCJ2aXNpYmxlIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwidG9nZ2xlRHJvcGRvd24iLCJyZXN1bHQiLCJyZW5kZXJSZWFkVmlldyIsInJlbmRlckRyb3Bkb3duIiwiYWRqdXN0RGF0ZU9uQ2hhbmdlIiwiaGFuZGxlWWVhckNoYW5nZSIsIm9uU2VsZWN0Iiwic2V0T3BlbiIsInJlbmRlcmVkRHJvcGRvd24iLCJkcm9wZG93bk1vZGUiLCJyZW5kZXJTY3JvbGxNb2RlIiwicmVuZGVyU2VsZWN0TW9kZSIsIk1vbnRoRHJvcGRvd25PcHRpb25zIiwibW9udGhOYW1lcyIsImlzU2VsZWN0ZWRNb250aCIsIldyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyIsIk1vbnRoRHJvcGRvd24iLCJNIiwiX3RoaXMyIiwidXNlU2hvcnRNb250aEluRHJvcGRvd24iLCJ1dGlscyIsImdlbmVyYXRlTW9udGhZZWFycyIsImN1cnJEYXRlIiwibGFzdERhdGUiLCJNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJtb250aFllYXJzTGlzdCIsIm1vbnRoWWVhciIsIm1vbnRoWWVhclBvaW50IiwiaXNTYW1lTW9udGhZZWFyIiwic2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duIiwiV3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIk1vbnRoWWVhckRyb3Bkb3duIiwidGltZVBvaW50IiwieWVhck1vbnRoIiwiY2hhbmdlZERhdGUiLCJwYXJzZUludCIsIkRheSIsImlzRGlzYWJsZWQiLCJvbk1vdXNlRW50ZXIiLCJldmVudEtleSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlT25LZXlEb3duIiwib3RoZXIiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQiLCJkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiIsImlzU2VsZWN0ZWREYXRlIiwic2VsZWN0c011bHRpcGxlIiwic2VsZWN0ZWREYXRlcyIsImlzU2FtZURheU9yV2VlayIsInNlbGVjdGVkIiwicHJlU2VsZWN0aW9uIiwic2hvd1dlZWtQaWNrZXIiLCJpc1NhbWVXZWVrIiwiX3RoaXMkcHJvcHMiLCJkYXlTdHIiLCJfdGhpcyRwcm9wczIiLCJob2xpZGF5cyIsImhhcyIsIl90aGlzJHByb3BzMyIsIl90aGlzJHByb3BzJHNlbGVjdGluZyIsIl90aGlzJHByb3BzNCIsInNlbGVjdHNTdGFydCIsInNlbGVjdHNFbmQiLCJzZWxlY3RzUmFuZ2UiLCJzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSIsInNlbGVjdGluZ0RhdGUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmcyIiwiaXNJblNlbGVjdGluZ1JhbmdlIiwiX3RoaXMkcHJvcHM1IiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMyIsIl90aGlzJHByb3BzNiIsIl90aGlzJHByb3BzNyIsIl90aGlzJHByb3BzOCIsIndlZWtkYXkiLCJnZXREYXkiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQyIiwiZGF5Q2xhc3NOYW1lIiwiaXNFeGNsdWRlZCIsImlzU2VsZWN0ZWQiLCJpc0tleWJvYXJkU2VsZWN0ZWQiLCJpc1JhbmdlU3RhcnQiLCJpc1JhbmdlRW5kIiwiaXNTZWxlY3RpbmdSYW5nZVN0YXJ0IiwiaXNTZWxlY3RpbmdSYW5nZUVuZCIsImlzQ3VycmVudERheSIsImlzV2Vla2VuZCIsImlzQWZ0ZXJNb250aCIsImlzQmVmb3JlTW9udGgiLCJnZXRIaWdoTGlnaHRlZENsYXNzIiwiZ2V0SG9saWRheXNDbGFzcyIsIl90aGlzJHByb3BzOSIsIl90aGlzJHByb3BzOSRhcmlhTGFiZSIsImFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkIiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlMiIsImFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZCIsInByZWZpeCIsIl90aGlzJHByb3BzMTAiLCJfdGhpcyRwcm9wczEwJGhvbGlkYXkiLCJjb21wYXJlRHQiLCJ0aXRsZXMiLCJhcHBseSIsImhvbGlkYXlOYW1lcyIsIm1lc3NhZ2UiLCJzZWxlY3RlZERheSIsInByZVNlbGVjdGlvbkRheSIsInRhYkluZGV4Iiwic2hvd1dlZWtOdW1iZXIiLCJpc1N0YXJ0T2ZXZWVrIiwiX3RoaXMkZGF5RWwkY3VycmVudCIsInByZXZQcm9wcyIsInNob3VsZEZvY3VzRGF5IiwiZ2V0VGFiSW5kZXgiLCJpc0lucHV0Rm9jdXNlZCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImJvZHkiLCJpbmxpbmUiLCJzaG91bGRGb2N1c0RheUlubGluZSIsImNvbnRhaW5lclJlZiIsImNvbnRhaW5zIiwiY2xhc3NMaXN0IiwibW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0IiwiZGF5RWwiLCJmb2N1cyIsInByZXZlbnRTY3JvbGwiLCJyZW5kZXJEYXlDb250ZW50cyIsImdldENsYXNzTmFtZXMiLCJvbktleURvd24iLCJoYW5kbGVDbGljayIsInVzZVBvaW50ZXJFdmVudCIsImhhbmRsZU1vdXNlRW50ZXIiLCJvblBvaW50ZXJFbnRlciIsImdldEFyaWFMYWJlbCIsInJvbGUiLCJ0aXRsZSIsImdldFRpdGxlIiwiaGFuZGxlRm9jdXNEYXkiLCJjb21wb25lbnREaWRVcGRhdGUiLCJXZWVrTnVtYmVyIiwic2hvdWxkRm9jdXNXZWVrTnVtYmVyIiwid2Vla051bWJlckVsIiwiaGFuZGxlRm9jdXNXZWVrTnVtYmVyIiwid2Vla051bWJlciIsIl90aGlzJHByb3BzJGFyaWFMYWJlbCIsImFyaWFMYWJlbFByZWZpeCIsIndlZWtOdW1iZXJDbGFzc2VzIiwiV2VlayIsIm9uRGF5Q2xpY2siLCJvbkRheU1vdXNlRW50ZXIiLCJvbldlZWtTZWxlY3QiLCJoYW5kbGVEYXlDbGljayIsInNob3VsZENsb3NlT25TZWxlY3QiLCJmb3JtYXRXZWVrTnVtYmVyIiwiZGF5cyIsIm9uQ2xpY2tBY3Rpb24iLCJoYW5kbGVXZWVrQ2xpY2siLCJvZmZzZXQiLCJhZGREYXlzIiwiY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4IiwiZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXgiLCJ2YWx1ZU9mIiwiaGFuZGxlRGF5TW91c2VFbnRlciIsInJlbmRlckRheXMiLCJGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVCIsIk1PTlRIX0NPTFVNTlNfTEFZT1VUIiwiVFdPX0NPTFVNTlMiLCJUSFJFRV9DT0xVTU5TIiwiRk9VUl9DT0xVTU5TIiwiTU9OVEhfQ09MVU1OUyIsImdyaWQiLCJ2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQiLCJNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUIiwiZ2V0TW9udGhDb2x1bW5zTGF5b3V0Iiwic2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIiLCJzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyIiwiTW9udGgiLCJvcmRlckluRGlzcGxheSIsIm9uTW91c2VMZWF2ZSIsImlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoIiwiX21vbnRoIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nNCIsIndlZWtzIiwiaXNGaXhlZEhlaWdodCIsImZpeGVkSGVpZ2h0IiwiYnJlYWtBZnRlck5leHRQdXNoIiwiY3VycmVudFdlZWtTdGFydCIsIndlZWtBcmlhTGFiZWxQcmVmaXgiLCJzaG93V2Vla051bWJlcnMiLCJpc0ZpeGVkQW5kRmluYWxXZWVrIiwiaXNOb25GaXhlZEFuZE91dE9mTW9udGgiLCJpc1dlZWtJbk1vbnRoIiwicGVla05leHRNb250aCIsImxhYmVsRGF0ZSIsIm5ld01vbnRoIiwic2V0UHJlU2VsZWN0aW9uIiwiTU9OVEhfUkVGUyIsImhhbmRsZU9uTW9udGhLZXlEb3duIiwibW9udGhDb2x1bW5zTGF5b3V0IiwidmVydGljYWxPZmZzZXQiLCJtb250aHNHcmlkIiwib25Nb250aENsaWNrIiwiaGFuZGxlTW9udGhOYXZpZ2F0aW9uIiwibmV3UXVhcnRlciIsIlFVQVJURVJfUkVGUyIsIm9uUXVhcnRlckNsaWNrIiwiaGFuZGxlUXVhcnRlck5hdmlnYXRpb24iLCJtb250aENsYXNzTmFtZSIsIl9tb250aENsYXNzTmFtZSIsImlzUmFuZ2VTdGFydE1vbnRoIiwiaXNSYW5nZUVuZE1vbnRoIiwiaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQiLCJpc0N1cnJlbnRNb250aCIsInByZVNlbGVjdGVkTW9udGgiLCJwcmVTZWxlY3RlZFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczExIiwiX3RoaXMkcHJvcHMxMSRjaG9vc2VEIiwiX3RoaXMkcHJvcHMxMSRkaXNhYmxlIiwiX3RoaXMkcHJvcHMxMiIsImlzU2VsZWN0ZWRRdWFydGVyIiwiaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciIsImlzUmFuZ2VTdGFydFF1YXJ0ZXIiLCJpc1JhbmdlRW5kUXVhcnRlciIsIl90aGlzJHByb3BzMTMiLCJzaG93RnVsbE1vbnRoWWVhclBpY2tlciIsInJlbmRlck1vbnRoQ29udGVudCIsInNob3J0TW9udGhUZXh0IiwiZnVsbE1vbnRoVGV4dCIsIl90aGlzJHByb3BzMTQiLCJyZW5kZXJRdWFydGVyQ29udGVudCIsInNob3J0UXVhcnRlciIsIl90aGlzJHByb3BzMTUiLCJtb250aENvbHVtbnMiLCJqIiwiZXYiLCJvbk1vbnRoS2V5RG93biIsIm9uTW9udGhNb3VzZUVudGVyIiwiZ2V0TW9udGhDbGFzc05hbWVzIiwiZ2V0TW9udGhDb250ZW50IiwiX3RoaXMkcHJvcHMxNiIsInF1YXJ0ZXJzIiwib25RdWFydGVyS2V5RG93biIsIm9uUXVhcnRlck1vdXNlRW50ZXIiLCJnZXRRdWFydGVyQ2xhc3NOYW1lcyIsImdldFF1YXJ0ZXJUYWJJbmRleCIsImlzQ3VycmVudFF1YXJ0ZXIiLCJnZXRRdWFydGVyQ29udGVudCIsIl90aGlzJHByb3BzMTciLCJzaG93TW9udGhZZWFyUGlja2VyIiwic2hvd1F1YXJ0ZXJZZWFyUGlja2VyIiwiX3RoaXMkcHJvcHMxOCIsIl90aGlzJHByb3BzMTgkYXJpYUxhYiIsImZvcm1hdHRlZEFyaWFMYWJlbFByZWZpeCIsInRyaW0iLCJoYW5kbGVNb3VzZUxlYXZlIiwib25Qb2ludGVyTGVhdmUiLCJyZW5kZXJNb250aHMiLCJyZW5kZXJRdWFydGVycyIsInJlbmRlcldlZWtzIiwiVGltZSIsImhlaWdodCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNlbnRlckxpIiwiY2FsY0NlbnRlclBvc2l0aW9uIiwibW9udGhSZWYiLCJoZWFkZXIiLCJjbGFzc2VzIiwidGltZUNsYXNzTmFtZSIsImlzU2VsZWN0ZWRUaW1lIiwiaXNEaXNhYmxlZFRpbWUiLCJpbmplY3RUaW1lcyIsInByZXZpb3VzU2libGluZyIsIm5leHRTaWJsaW5nIiwiYWN0aXZlRGF0ZSIsIm9wZW5Ub0RhdGUiLCJzb3J0ZWRJbmplY3RUaW1lcyIsInNvcnQiLCJhIiwiYiIsIm1pbnV0ZXNJbkRheSIsIm11bHRpcGxpZXIiLCJ0aW1lc1RvSW5qZWN0IiwidGltZVRvRm9jdXMiLCJyZWR1Y2UiLCJwcmV2IiwibGlDbGFzc2VzIiwibGkiLCJzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSIsInRvZGF5QnV0dG9uIiwic2hvd1RpbWVTZWxlY3RPbmx5IiwidGltZUNhcHRpb24iLCJyZW5kZXJUaW1lcyIsIm9uVGltZUNoYW5nZSIsImxpc3RIZWlnaHQiLCJjZW50ZXJMaVJlZiIsIlllYXIiLCJyZWZJbmRleCIsIndhaXRGb3JSZVJlbmRlciIsIllFQVJfUkVGUyIsIl91dGlscyRnZXRZZWFyc1BlcmlvZCIsInVwZGF0ZUZvY3VzT25QYWdpbmF0ZSIsInkiLCJfeWVhciIsImhhbmRsZVllYXJDbGljayIsIm9uWWVhckNsaWNrIiwiaGFuZGxlWWVhck5hdmlnYXRpb24iLCJ5ZWFyQ2xhc3NOYW1lIiwiaXNDdXJyZW50WWVhciIsInByZVNlbGVjdGVkIiwicmVuZGVyWWVhckNvbnRlbnQiLCJvblllYXJNb3VzZUVudGVyIiwib25ZZWFyTW91c2VMZWF2ZSIsIl91dGlscyRnZXRZZWFyc1BlcmlvZDIiLCJfbG9vcCIsIm9uWWVhcktleURvd24iLCJnZXRZZWFyVGFiSW5kZXgiLCJnZXRZZWFyQ2xhc3NOYW1lcyIsImdldFllYXJDb250ZW50IiwiZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMiLCJjbGVhclNlbGVjdGluZ0RhdGUiLCJpbnB1dFRpbWUiLCJwcm9wRGF0ZSIsImlzUHJvcERhdGVWYWxpZCIsImlzTmFOIiwic3BsaXQiLCJ0aW1lU3RyaW5nIiwiY3VzdG9tVGltZUlucHV0IiwiY2xvbmVFbGVtZW50IiwidHlwZSIsInBsYWNlaG9sZGVyIiwibmFtZSIsInJlcXVpcmVkIiwidGltZUlucHV0TGFiZWwiLCJyZW5kZXJUaW1lSW5wdXQiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJDYWxlbmRhckNvbnRhaW5lciIsIl9yZWYkc2hvd1RpbWVTZWxlY3RPbiIsIl9yZWYkc2hvd1RpbWUiLCJzaG93VGltZSIsImFyaWFMYWJlbCIsIkRST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMiLCJpc0Ryb3Bkb3duU2VsZWN0IiwiZWxlbWVudCIsImNsYXNzTmFtZXMiLCJ0ZXN0Q2xhc3NuYW1lIiwiaW5kZXhPZiIsIkNhbGVuZGFyIiwib25Ecm9wZG93bkZvY3VzIiwiaW5pdGlhbERhdGUiLCJoYW5kbGVNb250aENoYW5nZSIsIm1vbnRoU2VsZWN0ZWRJbiIsIm9uTW9udGhNb3VzZUxlYXZlIiwic2V0WWVhciIsIm9uWWVhckNoYW5nZSIsImlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlIiwiaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UiLCJvbk1vbnRoQ2hhbmdlIiwiaGFuZGxlTW9udGhZZWFyQ2hhbmdlIiwiZGF5TmFtZXMiLCJ3ZWVrTGFiZWwiLCJ3ZWVrRGF5TmFtZSIsImZvcm1hdFdlZWtkYXkiLCJ3ZWVrRGF5Q2xhc3NOYW1lIiwiZm9ybWF0V2Vla0RheSIsInVzZVdlZWtkYXlzU2hvcnQiLCJzaG93WWVhclBpY2tlciIsInJlbmRlckN1c3RvbUhlYWRlciIsImFsbFByZXZEYXlzRGlzYWJsZWQiLCJmb3JjZVNob3dNb250aE5hdmlnYXRpb24iLCJzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24iLCJpY29uQ2xhc3NlcyIsImNsaWNrSGFuZGxlciIsImRlY3JlYXNlTW9udGgiLCJkZWNyZWFzZVllYXIiLCJpc0ZvclllYXIiLCJwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwiLCJwcmV2aW91c1llYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91cyIsInByZXZpb3VzTW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMyIiwicHJldmlvdXNZZWFyQXJpYUxhYmVsIiwiYWxsTmV4dERheXNEaXNhYmxlZCIsInNob3dUaW1lU2VsZWN0IiwiaW5jcmVhc2VNb250aCIsImluY3JlYXNlWWVhciIsIm5leHRNb250aEJ1dHRvbkxhYmVsIiwibmV4dFllYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0TW9udCIsIm5leHRNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0WWVhciIsIm5leHRZZWFyQXJpYUxhYmVsIiwic2hvd1llYXJEcm9wZG93biIsInNob3dNb250aERyb3Bkb3duIiwic2hvd01vbnRoWWVhckRyb3Bkb3duIiwib3ZlcnJpZGVIaWRlIiwiY2hhbmdlWWVhciIsImNoYW5nZU1vbnRoIiwiY2hhbmdlTW9udGhZZWFyIiwiaGFuZGxlVG9kYXlCdXR0b25DbGljayIsIm1vbnRoRGF0ZSIsInJlbmRlckN1cnJlbnRNb250aCIsIm9uRm9jdXMiLCJoYW5kbGVEcm9wZG93bkZvY3VzIiwicmVuZGVyTW9udGhEcm9wZG93biIsInJlbmRlck1vbnRoWWVhckRyb3Bkb3duIiwicmVuZGVyWWVhckRyb3Bkb3duIiwiaGVhZGVyQXJncyIsIm1vbnRoQ29udGFpbmVyIiwicHJldk1vbnRoQnV0dG9uRGlzYWJsZWQiLCJuZXh0TW9udGhCdXR0b25EaXNhYmxlZCIsInByZXZZZWFyQnV0dG9uRGlzYWJsZWQiLCJuZXh0WWVhckJ1dHRvbkRpc2FibGVkIiwic2hvd0RheU5hbWVzIiwiX29iamVjdFNwcmVhZCIsImN1c3RvbUhlYWRlckNvdW50IiwicmVuZGVyWWVhckhlYWRlciIsInJlbmRlckRlZmF1bHRIZWFkZXIiLCJfdGhpcyRwcm9wcyRtb250aFNlbGUiLCJtb250aExpc3QiLCJtb250aHNUb1N1YnRyYWN0Iiwic2hvd1ByZXZpb3VzTW9udGhzIiwibW9udGhzU2hvd24iLCJmcm9tTW9udGhEYXRlIiwibW9udGhzVG9BZGQiLCJtb250aEtleSIsImRpdiIsInJlbmRlckhlYWRlciIsIm1vbnRoQXJpYUxhYmVsUHJlZml4IiwiaGFuZGxlT25EYXlLZXlEb3duIiwiaGFuZGxlTW9udGhNb3VzZUxlYXZlIiwiX2V4dGVuZHMiLCJoYW5kbGVZZWFyTW91c2VFbnRlciIsImhhbmRsZVllYXJNb3VzZUxlYXZlIiwidGltZUZvcm1hdCIsInRpbWVJbnRlcnZhbHMiLCJ3aXRoUG9ydGFsIiwidGltZVZhbGlkIiwiQm9vbGVhbiIsInNob3dUaW1lSW5wdXQiLCJJbnB1dFRpbWUiLCJhcmlhTGl2ZU1lc3NhZ2UiLCJnZXREYXRlSW5WaWV3IiwiYXNzaWduTW9udGhDb250YWluZXIiLCJfdGhpczMiLCJoYXNNb250aENoYW5nZWQiLCJDb250YWluZXIiLCJjb250YWluZXIiLCJkaXNwbGF5IiwicmVuZGVyQXJpYUxpdmVSZWdpb24iLCJyZW5kZXJQcmV2aW91c0J1dHRvbiIsInJlbmRlck5leHRCdXR0b24iLCJyZW5kZXJZZWFycyIsInJlbmRlclRvZGF5QnV0dG9uIiwicmVuZGVyVGltZVNlY3Rpb24iLCJyZW5kZXJJbnB1dFRpbWVTZWN0aW9uIiwicmVuZGVyQ2hpbGRyZW4iLCJDYWxlbmRhckljb24iLCJpY29uIiwiX3JlZiRjbGFzc05hbWUiLCJkZWZhdWx0Q2xhc3MiLCJpc1ZhbGlkRWxlbWVudCIsInhtbG5zIiwidmlld0JveCIsIlBvcnRhbCIsImVsIiwicG9ydGFsUm9vdCIsInBvcnRhbEhvc3QiLCJnZXRFbGVtZW50QnlJZCIsInBvcnRhbElkIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUNoaWxkIiwiUmVhY3RET00iLCJjcmVhdGVQb3J0YWwiLCJmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yIiwiZm9jdXNhYmxlRmlsdGVyIiwibm9kZSIsImRpc2FibGVkIiwiVGFiTG9vcCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YWJMb29wUmVmIiwicXVlcnlTZWxlY3RvckFsbCIsInRhYkNoaWxkcmVuIiwiZ2V0VGFiQ2hpbGRyZW4iLCJlbmFibGVUYWJMb29wIiwiaGFuZGxlRm9jdXNTdGFydCIsImhhbmRsZUZvY3VzRW5kIiwid2l0aEZsb2F0aW5nIiwiV2l0aEZsb2F0aW5nIiwiYWx0X3Byb3BzIiwicG9wcGVyTW9kaWZpZXJzIiwicG9wcGVyUHJvcHMiLCJoaWRlUG9wcGVyIiwiYXJyb3dSZWYiLCJ1c2VSZWYiLCJmbG9hdGluZ1Byb3BzIiwidXNlRmxvYXRpbmciLCJvcGVuIiwid2hpbGVFbGVtZW50c01vdW50ZWQiLCJhdXRvVXBkYXRlIiwicGxhY2VtZW50IiwicG9wcGVyUGxhY2VtZW50IiwibWlkZGxld2FyZSIsImZsaXAiLCJwYWRkaW5nIiwiYXJyb3ciLCJQb3BwZXJDb21wb25lbnQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwicG9wcGVyQ29tcG9uZW50IiwidGFyZ2V0Q29tcG9uZW50IiwicG9wcGVyT25LZXlEb3duIiwic2hvd0Fycm93IiwicG9wcGVyIiwicmVmcyIsInNldEZsb2F0aW5nIiwiZmxvYXRpbmdTdHlsZXMiLCJGbG9hdGluZ0Fycm93IiwiY29udGV4dCIsImZpbGwiLCJzdHJva2VXaWR0aCIsIndpZHRoIiwidHJhbnNmb3JtIiwicG9wcGVyQ29udGFpbmVyIiwid3JhcHBlckNsYXNzZXMiLCJGcmFnbWVudCIsInNldFJlZmVyZW5jZSIsIm91dHNpZGVDbGlja0lnbm9yZUNsYXNzIiwiV3JhcHBlZENhbGVuZGFyIiwiaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZCIsIklOUFVUX0VSUl8xIiwiRGF0ZVBpY2tlciIsIl90aGlzJHByb3BzJGhvbGlkYXlzIiwiYWNjdW11bGF0b3IiLCJkZWZhdWx0UHJlU2VsZWN0aW9uIiwiZ2V0UHJlU2VsZWN0aW9uIiwiYm91bmRlZFByZVNlbGVjdGlvbiIsInN0YXJ0T3BlbiIsInByZXZlbnRGb2N1cyIsImZvY3VzZWQiLCJwcmV2ZW50Rm9jdXNUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaW5wdXQiLCJibHVyIiwiY2FuY2VsRm9jdXNJbnB1dCIsInNraXBTZXRCbHVyIiwiY2FsY0luaXRpYWxTdGF0ZSIsImxhc3RQcmVTZWxlY3RDaGFuZ2UiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSIsInNldEJsdXIiLCJpbnB1dFZhbHVlIiwicmVhZE9ubHkiLCJwcmV2ZW50T3Blbk9uRm9jdXMiLCJjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2V0Rm9jdXMiLCJpbnB1dEZvY3VzVGltZW91dCIsIm9uQmx1ciIsImFsbEFyZ3MiLCJvbkNoYW5nZVJhdyIsImlzRGVmYXVsdFByZXZlbnRlZCIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUIiwiaG91cnMiLCJtaW51dGVzIiwic2V0U2VsZWN0ZWQiLCJzZW5kRm9jdXNCYWNrVG9JbnB1dCIsInNob3dEYXRlU2VsZWN0Iiwia2VlcElucHV0Iiwic3dhcFJhbmdlIiwiYWxsb3dTYW1lRGF5IiwiZm9jdXNTZWxlY3RlZE1vbnRoIiwibm9SYW5nZXMiLCJoYXNTdGFydFJhbmdlIiwiaXNSYW5nZUZpbGxlZCIsImlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQiLCJzZWxlY3RlZERhdGUiLCJuZXh0RGF0ZXMiLCJoYXNNaW5EYXRlIiwiaGFzTWF4RGF0ZSIsImlzVmFsaWREYXRlU2VsZWN0aW9uIiwiZGF0ZVN0YXJ0T2ZEYXkiLCJtaW5EYXRlU3RhcnRPZkRheSIsIm1heERhdGVFbmRPZkRheSIsIm9uSW5wdXRDbGljayIsInNlbGVjdG9yU3RyaW5nIiwic2VsZWN0ZWRJdGVtIiwiY2FsZW5kYXIiLCJjb21wb25lbnROb2RlIiwicXVlcnlTZWxlY3RvciIsImNvcHkiLCJpbnB1dE9rIiwiaGFuZGxlU2VsZWN0Iiwib25JbnB1dEVycm9yIiwiY29kZSIsIm1zZyIsImlzU2hpZnRLZXlBY3RpdmUiLCJzaGlmdEtleSIsIm5ld1NlbGVjdGlvbiIsInN1YldlZWtzIiwic3ViRGF5cyIsImFkZFdlZWtzIiwicHJldk1vbnRoIiwicHJldlllYXIiLCJvbkNsZWFyQ2xpY2siLCJjbG9zZU9uU2Nyb2xsIiwiZG9jdW1lbnRFbGVtZW50IiwiaXNDYWxlbmRhck9wZW4iLCJlbGVtIiwiZGF0ZUZvcm1hdENhbGVuZGFyIiwiaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUiLCJtb2RpZnlIb2xpZGF5cyIsImhhbmRsZVRpbWVDaGFuZ2UiLCJjYWxlbmRhckNsYXNzTmFtZSIsImNhbGVuZGFyQ29udGFpbmVyIiwiZXhjbHVkZVNjcm9sbGJhciIsIm9uRGF5S2V5RG93biIsImlzQ29udGFpbnNUaW1lIiwibG9uZ0RhdGVGb3JtYXQiLCJfUmVhY3QkY2xvbmVFbGVtZW50IiwiY3VzdG9tSW5wdXQiLCJjdXN0b21JbnB1dFJlZiIsImhhbmRsZUJsdXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVGb2N1cyIsIm9uSW5wdXRLZXlEb3duIiwiaWQiLCJmb3JtIiwiYXV0b0ZvY3VzIiwicGxhY2Vob2xkZXJUZXh0IiwiYXV0b0NvbXBsZXRlIiwiYXJpYURlc2NyaWJlZEJ5IiwiYXJpYUludmFsaWQiLCJhcmlhTGFiZWxsZWRCeSIsImFyaWFSZXF1aXJlZCIsImlzQ2xlYXJhYmxlIiwiY2xlYXJCdXR0b25UaXRsZSIsIl90aGlzJHByb3BzNCRjbGVhckJ1dCIsImNsZWFyQnV0dG9uQ2xhc3NOYW1lIiwiX3RoaXMkcHJvcHM0JGFyaWFMYWJlIiwiYXJpYUxhYmVsQ2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25TY3JvbGwiLCJwcmV2U3RhdGUiLCJvbkNhbGVuZGFyT3BlbiIsIm9uQ2FsZW5kYXJDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJJbnB1dENvbnRhaW5lciIsInNob3dJY29uIiwiY2FsZW5kYXJJY29uQ2xhc3NuYW1lIiwidG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayIsInRvZ2dsZUNhbGVuZGFyIiwicmVuZGVyRGF0ZUlucHV0IiwicmVuZGVyQ2xlYXJCdXR0b24iLCJyZW5kZXJDYWxlbmRhciIsInBvcnRhbENvbnRhaW5lciIsIm9uUG9ydGFsS2V5RG93biIsInBvcHBlckNsYXNzTmFtZSIsIm9uUG9wcGVyS2V5RG93biIsInNob3dQb3BwZXJBcnJvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
