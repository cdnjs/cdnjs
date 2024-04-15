/*!
  react-datepicker v6.8.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
import React, { createRef } from 'react';
import 'prop-types';
import { clsx } from 'clsx';
import { isDate } from 'date-fns/isDate';
import { isValid as isValid$1 } from 'date-fns/isValid';
import { format, longFormatters } from 'date-fns/format';
import { addMinutes } from 'date-fns/addMinutes';
import { addHours } from 'date-fns/addHours';
import { addDays } from 'date-fns/addDays';
import { addWeeks } from 'date-fns/addWeeks';
import { addMonths } from 'date-fns/addMonths';
import { addQuarters } from 'date-fns/addQuarters';
import { addYears } from 'date-fns/addYears';
import { subDays } from 'date-fns/subDays';
import { subWeeks } from 'date-fns/subWeeks';
import { subMonths } from 'date-fns/subMonths';
import { subQuarters } from 'date-fns/subQuarters';
import { subYears } from 'date-fns/subYears';
import { getSeconds } from 'date-fns/getSeconds';
import { getMinutes } from 'date-fns/getMinutes';
import { getHours } from 'date-fns/getHours';
import { getDay } from 'date-fns/getDay';
import { getDate } from 'date-fns/getDate';
import { getISOWeek } from 'date-fns/getISOWeek';
import { getMonth } from 'date-fns/getMonth';
import { getQuarter } from 'date-fns/getQuarter';
import { getYear } from 'date-fns/getYear';
import { getTime } from 'date-fns/getTime';
import { setSeconds } from 'date-fns/setSeconds';
import { setMinutes } from 'date-fns/setMinutes';
import { setHours } from 'date-fns/setHours';
import { setMonth } from 'date-fns/setMonth';
import { setQuarter } from 'date-fns/setQuarter';
import { setYear } from 'date-fns/setYear';
import { min } from 'date-fns/min';
import { max } from 'date-fns/max';
import { differenceInCalendarDays } from 'date-fns/differenceInCalendarDays';
import { differenceInCalendarMonths } from 'date-fns/differenceInCalendarMonths';
import { differenceInCalendarYears } from 'date-fns/differenceInCalendarYears';
import { differenceInCalendarQuarters } from 'date-fns/differenceInCalendarQuarters';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfWeek } from 'date-fns/startOfWeek';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfQuarter } from 'date-fns/startOfQuarter';
import { startOfYear } from 'date-fns/startOfYear';
import { endOfDay } from 'date-fns/endOfDay';
import { endOfWeek } from 'date-fns/endOfWeek';
import { endOfMonth } from 'date-fns/endOfMonth';
import { endOfYear } from 'date-fns/endOfYear';
import { isEqual as isEqual$1 } from 'date-fns/isEqual';
import { isSameDay as isSameDay$1 } from 'date-fns/isSameDay';
import { isSameMonth as isSameMonth$1 } from 'date-fns/isSameMonth';
import { isSameYear as isSameYear$1 } from 'date-fns/isSameYear';
import { isSameQuarter as isSameQuarter$1 } from 'date-fns/isSameQuarter';
import { isAfter } from 'date-fns/isAfter';
import { isBefore } from 'date-fns/isBefore';
import { isWithinInterval } from 'date-fns/isWithinInterval';
import { toDate } from 'date-fns/toDate';
import { parse } from 'date-fns/parse';
import { parseISO } from 'date-fns/parseISO';
import { addSeconds, getSeconds as getSeconds$1 } from 'date-fns';
import onClickOutside from 'react-onclickoutside';
import ReactDOM from 'react-dom';
import { useFloating, autoUpdate, flip, offset, arrow, FloatingArrow } from '@floating-ui/react';
import { set } from 'date-fns/set';

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
  var d = value ? typeof value === "string" || value instanceof String ? parseISO(value) : toDate(value) : new Date();
  return isValid(d) ? d : null;
}
function parseDate(value, dateFormat, locale, strictParsing, minDate) {
  var parsedDate = null;
  var localeObject = getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
  var strictParsingValueMatch = true;
  if (Array.isArray(dateFormat)) {
    dateFormat.forEach(function (df) {
      var tryParseDate = parse(value, df, new Date(), {
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
  parsedDate = parse(value, dateFormat, new Date(), {
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
        var longFormatter = longFormatters[firstCharacter];
        return localeObject ? longFormatter(substring, localeObject.formatLong) : firstCharacter;
      }
      return substring;
    }).join("");
    if (value.length > 0) {
      parsedDate = parse(value, dateFormat.slice(0, value.length), new Date(), {
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
  return isValid$1(date) && !isBefore(date, minDate);
}

// ** Date Formatting **

function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format(date, formatStr, {
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
  return format(date, formatStr, {
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
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}
function getWeek(date, locale) {
  var localeObj = locale && getLocaleObject(locale) || getDefaultLocale() && getLocaleObject(getDefaultLocale());
  return getISOWeek(date, localeObj ? {
    locale: localeObj
  } : null);
}
function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
}

// *** Start of ***

function getStartOfDay(date) {
  return startOfDay(date);
}
function getStartOfWeek(date, locale, calendarStartDay) {
  var localeObj = locale ? getLocaleObject(locale) : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, {
    locale: localeObj,
    weekStartsOn: calendarStartDay
  });
}
function getStartOfMonth(date) {
  return startOfMonth(date);
}
function getStartOfYear(date) {
  return startOfYear(date);
}
function getStartOfQuarter(date) {
  return startOfQuarter(date);
}
function getStartOfToday() {
  return startOfDay(newDate());
}

// *** End of ***

function getEndOfWeek(date) {
  return endOfWeek(date);
}
function isSameYear(date1, date2) {
  if (date1 && date2) {
    return isSameYear$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return isSameMonth$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameQuarter(date1, date2) {
  if (date1 && date2) {
    return isSameQuarter$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameDay(date1, date2) {
  if (date1 && date2) {
    return isSameDay$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isEqual(date1, date2) {
  if (date1 && date2) {
    return isEqual$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isDayInRange(day, startDate, endDate) {
  var valid;
  var start = startOfDay(startDate);
  var end = endOfDay(endDate);
  try {
    valid = isWithinInterval(day, {
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
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}
function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}
function getQuarterShortInLocale(quarter, locale) {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
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
    return isWithinInterval(day, {
      start: start,
      end: end
    });
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameDay(day, includeDate);
  }) || includeDateIntervals && !includeDateIntervals.some(function (_ref5) {
    var start = _ref5.start,
      end = _ref5.end;
    return isWithinInterval(day, {
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
      return isWithinInterval(day, {
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
    minDate: startOfMonth(minDate),
    maxDate: endOfMonth(maxDate)
  }) || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameMonth(month, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameMonth(month, includeDate);
  }) || filterDate && !filterDate(newDate(month)) || false;
}
function isMonthInRange(startDate, endDate, m, day) {
  var startDateYear = getYear(startDate);
  var startDateMonth = getMonth(startDate);
  var endDateYear = getYear(endDate);
  var endDateMonth = getMonth(endDate);
  var dayYear = getYear(day);
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
  if (!isValid$1(start) || !isValid$1(end)) return false;
  var startYear = getYear(start);
  var endYear = getYear(end);
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
    minDate: startOfYear(minDate),
    maxDate: endOfYear(maxDate)
  }) || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameYear(date, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameYear(date, includeDate);
  }) || filterDate && !filterDate(newDate(date)) || false;
}
function isQuarterInRange(startDate, endDate, q, day) {
  var startDateYear = getYear(startDate);
  var startDateQuarter = getQuarter(startDate);
  var endDateYear = getYear(endDate);
  var endDateQuarter = getQuarter(endDate);
  var dayYear = getYear(day);
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
  return minDate && differenceInCalendarDays(day, minDate) < 0 || maxDate && differenceInCalendarDays(day, maxDate) > 0;
}
function isTimeInList(time, times) {
  return times.some(function (listTime) {
    return getHours(listTime) === getHours(time) && getMinutes(listTime) === getMinutes(time) && getSeconds(listTime) === getSeconds(time);
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
  baseTime = setHours(baseTime, getHours(time));
  baseTime = setMinutes(baseTime, getMinutes(time));
  baseTime = setSeconds(baseTime, getSeconds(time));
  var min = newDate();
  min = setHours(min, getHours(minTime));
  min = setMinutes(min, getMinutes(minTime));
  min = setSeconds(min, getSeconds(minTime));
  var max = newDate();
  max = setHours(max, getHours(maxTime));
  max = setMinutes(max, getMinutes(maxTime));
  max = setSeconds(max, getSeconds(maxTime));
  var valid;
  try {
    valid = !isWithinInterval(baseTime, {
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
  var previousMonth = subMonths(day, 1);
  return minDate && differenceInCalendarMonths(minDate, previousMonth) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarMonths(includeDate, previousMonth) > 0;
  }) || false;
}
function monthDisabledAfter(day) {
  var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    maxDate = _ref15.maxDate,
    includeDates = _ref15.includeDates;
  var nextMonth = addMonths(day, 1);
  return maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarMonths(nextMonth, includeDate) > 0;
  }) || false;
}
function quarterDisabledBefore(date) {
  var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    minDate = _ref16.minDate,
    includeDates = _ref16.includeDates;
  var firstDateOfYear = startOfYear(date);
  var previousQuarter = subQuarters(firstDateOfYear, 1);
  return minDate && differenceInCalendarQuarters(minDate, previousQuarter) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
  }) || false;
}
function quarterDisabledAfter(date) {
  var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    maxDate = _ref17.maxDate,
    includeDates = _ref17.includeDates;
  var lastDateOfYear = endOfYear(date);
  var nextQuarter = addQuarters(lastDateOfYear, 1);
  return maxDate && differenceInCalendarQuarters(nextQuarter, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
  }) || false;
}
function yearDisabledBefore(day) {
  var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    minDate = _ref18.minDate,
    includeDates = _ref18.includeDates;
  var previousYear = subYears(day, 1);
  return minDate && differenceInCalendarYears(minDate, previousYear) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarYears(includeDate, previousYear) > 0;
  }) || false;
}
function yearsDisabledBefore(day) {
  var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    minDate = _ref19.minDate,
    _ref19$yearItemNumber = _ref19.yearItemNumber,
    yearItemNumber = _ref19$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref19$yearItemNumber;
  var previousYear = getStartOfYear(subYears(day, yearItemNumber));
  var _getYearsPeriod = getYearsPeriod(previousYear, yearItemNumber),
    endPeriod = _getYearsPeriod.endPeriod;
  var minDateYear = minDate && getYear(minDate);
  return minDateYear && minDateYear > endPeriod || false;
}
function yearDisabledAfter(day) {
  var _ref20 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    maxDate = _ref20.maxDate,
    includeDates = _ref20.includeDates;
  var nextYear = addYears(day, 1);
  return maxDate && differenceInCalendarYears(nextYear, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarYears(nextYear, includeDate) > 0;
  }) || false;
}
function yearsDisabledAfter(day) {
  var _ref21 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    maxDate = _ref21.maxDate,
    _ref21$yearItemNumber = _ref21.yearItemNumber,
    yearItemNumber = _ref21$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref21$yearItemNumber;
  var nextYear = addYears(day, yearItemNumber);
  var _getYearsPeriod2 = getYearsPeriod(nextYear, yearItemNumber),
    startPeriod = _getYearsPeriod2.startPeriod;
  var maxDateYear = maxDate && getYear(maxDate);
  return maxDateYear && maxDateYear < startPeriod || false;
}
function getEffectiveMinDate(_ref22) {
  var minDate = _ref22.minDate,
    includeDates = _ref22.includeDates;
  if (includeDates && minDate) {
    var minDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays(includeDate, minDate) >= 0;
    });
    return min(minDates);
  } else if (includeDates) {
    return min(includeDates);
  } else {
    return minDate;
  }
}
function getEffectiveMaxDate(_ref23) {
  var maxDate = _ref23.maxDate,
    includeDates = _ref23.includeDates;
  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays(includeDate, maxDate) <= 0;
    });
    return max(maxDates);
  } else if (includeDates) {
    return max(includeDates);
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
    if (isDate(obj)) {
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
    if (!isDate(dateObj)) {
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
    injectedTime = addHours(injectedTime, getHours(injectedTimes[i]));
    injectedTime = addMinutes(injectedTime, getMinutes(injectedTimes[i]));
    injectedTime = addSeconds(injectedTime, getSeconds(injectedTimes[i]));
    var nextTime = addMinutes(startOfDay, (currentMultiplier + 1) * intervals);
    if (isAfter(injectedTime, currentTime) && isBefore(injectedTime, nextTime)) {
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
  var endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
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
  return toDate(d.getTime() - seconds * 1000 - milliseconds);
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
  if (!isDate(date)) {
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
  if (!isDate(date) || !isDate(dateToCompare)) {
    throw new Error("Invalid date received");
  }
  var midnightDate = getMidnightDate(date);
  var midnightDateToCompare = getMidnightDate(dateToCompare);
  return isBefore(midnightDate, midnightDateToCompare);
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
      isInRange = getYear(minDate) <= newYear;
    }
    if (maxDate && isInRange) {
      isInRange = getYear(maxDate) >= newYear;
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
        return /*#__PURE__*/React.createElement("div", {
          className: selectedYear === year ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option",
          key: year,
          onClick: _this.onChange.bind(_this, year),
          "aria-selected": selectedYear === year ? "true" : undefined
        }, selectedYear === year ? /*#__PURE__*/React.createElement("span", {
          className: "react-datepicker__year-option--selected"
        }, "\u2713") : "", year);
      });
      var minYear = _this.props.minDate ? getYear(_this.props.minDate) : null;
      var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : null;
      if (!maxYear || !_this.state.yearsList.find(function (year) {
        return year === maxYear;
      })) {
        options.unshift( /*#__PURE__*/React.createElement("div", {
          className: "react-datepicker__year-option",
          key: "upcoming",
          onClick: _this.incrementYears
        }, /*#__PURE__*/React.createElement("a", {
          className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"
        })));
      }
      if (!minYear || !_this.state.yearsList.find(function (year) {
        return year === minYear;
      })) {
        options.push( /*#__PURE__*/React.createElement("div", {
          className: "react-datepicker__year-option",
          key: "previous",
          onClick: _this.decrementYears
        }, /*#__PURE__*/React.createElement("a", {
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
    _this.dropdownRef = /*#__PURE__*/createRef();
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
      var dropdownClass = clsx({
        "react-datepicker__year-dropdown": true,
        "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown
      });
      return /*#__PURE__*/React.createElement("div", {
        className: dropdownClass,
        ref: this.dropdownRef
      }, this.renderOptions());
    }
  }]);
}(React.Component);

var WrappedYearDropdownOptions = onClickOutside(YearDropdownOptions);
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
      var minYear = _this.props.minDate ? getYear(_this.props.minDate) : 1900;
      var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : 2100;
      var options = [];
      for (var i = minYear; i <= maxYear; i++) {
        options.push( /*#__PURE__*/React.createElement("option", {
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
      return /*#__PURE__*/React.createElement("select", {
        value: _this.props.year,
        className: "react-datepicker__year-select",
        onChange: _this.onSelectChange
      }, _this.renderSelectOptions());
    });
    _defineProperty(_this, "renderReadView", function (visible) {
      return /*#__PURE__*/React.createElement("div", {
        key: "read",
        style: {
          visibility: visible ? "visible" : "hidden"
        },
        className: "react-datepicker__year-read-view",
        onClick: function onClick(event) {
          return _this.toggleDropdown(event);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "react-datepicker__year-read-view--down-arrow"
      }), /*#__PURE__*/React.createElement("span", {
        className: "react-datepicker__year-read-view--selected-year"
      }, _this.props.year));
    });
    _defineProperty(_this, "renderDropdown", function () {
      return /*#__PURE__*/React.createElement(WrappedYearDropdownOptions, {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode)
      }, renderedDropdown);
    }
  }]);
}(React.Component);

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
        return /*#__PURE__*/React.createElement("div", {
          className: _this.isSelectedMonth(i) ? "react-datepicker__month-option react-datepicker__month-option--selected_month" : "react-datepicker__month-option",
          key: month,
          onClick: _this.onChange.bind(_this, i),
          "aria-selected": _this.isSelectedMonth(i) ? "true" : undefined
        }, _this.isSelectedMonth(i) ? /*#__PURE__*/React.createElement("span", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__month-dropdown"
      }, this.renderOptions());
    }
  }]);
}(React.Component);

var WrappedMonthDropdownOptions = onClickOutside(MonthDropdownOptions);
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
        return /*#__PURE__*/React.createElement("option", {
          key: i,
          value: i
        }, M);
      });
    });
    _defineProperty(_this, "renderSelectMode", function (monthNames) {
      return /*#__PURE__*/React.createElement("select", {
        value: _this.props.month,
        className: "react-datepicker__month-select",
        onChange: function onChange(e) {
          return _this.onChange(e.target.value);
        }
      }, _this.renderSelectOptions(monthNames));
    });
    _defineProperty(_this, "renderReadView", function (visible, monthNames) {
      return /*#__PURE__*/React.createElement("div", {
        key: "read",
        style: {
          visibility: visible ? "visible" : "hidden"
        },
        className: "react-datepicker__month-read-view",
        onClick: _this.toggleDropdown
      }, /*#__PURE__*/React.createElement("span", {
        className: "react-datepicker__month-read-view--down-arrow"
      }), /*#__PURE__*/React.createElement("span", {
        className: "react-datepicker__month-read-view--selected-month"
      }, monthNames[_this.props.month]));
    });
    _defineProperty(_this, "renderDropdown", function (monthNames) {
      return /*#__PURE__*/React.createElement(WrappedMonthDropdownOptions, {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode)
      }, renderedDropdown);
    }
  }]);
}(React.Component);

function generateMonthYears(minDate, maxDate) {
  var list = [];
  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);
  while (!isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));
    currDate = addMonths(currDate, 1);
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
        var monthYearPoint = getTime(monthYear);
        var isSameMonthYear = isSameYear(_this.props.date, monthYear) && isSameMonth(_this.props.date, monthYear);
        return /*#__PURE__*/React.createElement("div", {
          className: isSameMonthYear ? "react-datepicker__month-year-option--selected_month-year" : "react-datepicker__month-year-option",
          key: monthYearPoint,
          onClick: _this.onChange.bind(_this, monthYearPoint),
          "aria-selected": isSameMonthYear ? "true" : undefined
        }, isSameMonthYear ? /*#__PURE__*/React.createElement("span", {
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
      var dropdownClass = clsx({
        "react-datepicker__month-year-dropdown": true,
        "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown
      });
      return /*#__PURE__*/React.createElement("div", {
        className: dropdownClass
      }, this.renderOptions());
    }
  }]);
}(React.Component);

var WrappedMonthYearDropdownOptions = onClickOutside(MonthYearDropdownOptions);
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
      while (!isAfter(currDate, lastDate)) {
        var timePoint = getTime(currDate);
        options.push( /*#__PURE__*/React.createElement("option", {
          key: timePoint,
          value: timePoint
        }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
        currDate = addMonths(currDate, 1);
      }
      return options;
    });
    _defineProperty(_this, "onSelectChange", function (e) {
      _this.onChange(e.target.value);
    });
    _defineProperty(_this, "renderSelectMode", function () {
      return /*#__PURE__*/React.createElement("select", {
        value: getTime(getStartOfMonth(_this.props.date)),
        className: "react-datepicker__month-year-select",
        onChange: _this.onSelectChange
      }, _this.renderSelectOptions());
    });
    _defineProperty(_this, "renderReadView", function (visible) {
      var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
      return /*#__PURE__*/React.createElement("div", {
        key: "read",
        style: {
          visibility: visible ? "visible" : "hidden"
        },
        className: "react-datepicker__month-year-read-view",
        onClick: function onClick(event) {
          return _this.toggleDropdown(event);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "react-datepicker__month-year-read-view--down-arrow"
      }), /*#__PURE__*/React.createElement("span", {
        className: "react-datepicker__month-year-read-view--selected-month-year"
      }, yearMonth));
    });
    _defineProperty(_this, "renderDropdown", function () {
      return /*#__PURE__*/React.createElement(WrappedMonthYearDropdownOptions, {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode)
      }, renderedDropdown);
    }
  }]);
}(React.Component);

var Day = /*#__PURE__*/function (_React$Component) {
  function Day() {
    var _this;
    _classCallCheck(this, Day);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Day, [].concat(args));
    _defineProperty(_this, "dayEl", /*#__PURE__*/React.createRef());
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
      if (selectsStart && endDate && (isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))) {
        return isDayInRange(day, selectingDate, endDate);
      }
      if (selectsEnd && startDate && (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
        return isDayInRange(day, startDate, selectingDate);
      }
      if (selectsRange && startDate && !endDate && (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))) {
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
      var weekday = getDay(_this.props.day);
      return weekday === 0 || weekday === 6;
    });
    _defineProperty(_this, "isAfterMonth", function () {
      return _this.props.month !== undefined && (_this.props.month + 1) % 12 === getMonth(_this.props.day);
    });
    _defineProperty(_this, "isBeforeMonth", function () {
      return _this.props.month !== undefined && (getMonth(_this.props.day) + 1) % 12 === _this.props.month;
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
      return clsx("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
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
      return _this.props.renderDayContents ? _this.props.renderDayContents(getDate(_this.props.day), _this.props.day) : getDate(_this.props.day);
    });
    _defineProperty(_this, "render", function () {
      return /*#__PURE__*/React.createElement("div", {
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
      }, _this.renderDayContents(), _this.getTitle() !== "" && /*#__PURE__*/React.createElement("span", {
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
}(React.Component);

var WeekNumber = /*#__PURE__*/function (_React$Component) {
  function WeekNumber() {
    var _this;
    _classCallCheck(this, WeekNumber);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, WeekNumber, [].concat(args));
    _defineProperty(_this, "weekNumberEl", /*#__PURE__*/React.createRef());
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
      return /*#__PURE__*/React.createElement("div", {
        ref: this.weekNumberEl,
        className: clsx(weekNumberClasses),
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
}(React.Component);

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
        days.push( /*#__PURE__*/React.createElement(WeekNumber, {
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
        var day = addDays(startOfWeek, offset);
        return /*#__PURE__*/React.createElement(Day, {
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
      return /*#__PURE__*/React.createElement("div", {
        className: clsx(weekNumberClasses)
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
}(React.Component);

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
      return /*#__PURE__*/React.createRef();
    }));
    _defineProperty(_this, "QUARTER_REFS", _toConsumableArray(Array(4)).map(function () {
      return /*#__PURE__*/React.createRef();
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
      return isSameMonth(setMonth(day, m), startDate);
    });
    _defineProperty(_this, "isRangeStartQuarter", function (q) {
      var _this$props2 = _this.props,
        day = _this$props2.day,
        startDate = _this$props2.startDate,
        endDate = _this$props2.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(setQuarter(day, q), startDate);
    });
    _defineProperty(_this, "isRangeEndMonth", function (m) {
      var _this$props3 = _this.props,
        day = _this$props3.day,
        startDate = _this$props3.startDate,
        endDate = _this$props3.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameMonth(setMonth(day, m), endDate);
    });
    _defineProperty(_this, "isRangeEndQuarter", function (q) {
      var _this$props4 = _this.props,
        day = _this$props4.day,
        startDate = _this$props4.startDate,
        endDate = _this$props4.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(setQuarter(day, q), endDate);
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
      var _month = setMonth(day, m);
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
      var _month = setMonth(day, m);
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
      var endOfWeek = addDays(startOfWeek, 6);
      return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
    });
    _defineProperty(_this, "isCurrentMonth", function (day, m) {
      return getYear(day) === getYear(newDate()) && m === getMonth(newDate());
    });
    _defineProperty(_this, "isCurrentQuarter", function (day, q) {
      return getYear(day) === getYear(newDate()) && q === getQuarter(newDate());
    });
    _defineProperty(_this, "isSelectedMonth", function (day, m, selected) {
      return getMonth(selected) === m && getYear(day) === getYear(selected);
    });
    _defineProperty(_this, "isSelectedQuarter", function (day, q, selected) {
      return getQuarter(day) === q && getYear(day) === getYear(selected);
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
        weeks.push( /*#__PURE__*/React.createElement(Week, {
          ariaLabelPrefix: _this.props.weekAriaLabelPrefix,
          chooseDayAriaLabelPrefix: _this.props.chooseDayAriaLabelPrefix,
          disabledDayAriaLabelPrefix: _this.props.disabledDayAriaLabelPrefix,
          key: i,
          day: currentWeekStart,
          month: getMonth(_this.props.day),
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
        currentWeekStart = addWeeks(currentWeekStart, 1);

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
      var labelDate = setMonth(_this.props.day, m);
      if (isMonthDisabled(labelDate, _this.props)) {
        return;
      }
      _this.handleDayClick(getStartOfMonth(labelDate), e);
    });
    _defineProperty(_this, "onMonthMouseEnter", function (m) {
      var labelDate = setMonth(_this.props.day, m);
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
            _this.handleMonthNavigation(month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET, addMonths(preSelection, MONTH_NAVIGATION_HORIZONTAL_OFFSET));
            break;
          case "ArrowLeft":
            _this.handleMonthNavigation(month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET, subMonths(preSelection, MONTH_NAVIGATION_HORIZONTAL_OFFSET));
            break;
          case "ArrowUp":
            _this.handleMonthNavigation(
            // Check if month on the first row
            monthsGrid[0].includes(month) ? month + 12 - verticalOffset : month - verticalOffset, subMonths(preSelection, verticalOffset));
            break;
          case "ArrowDown":
            _this.handleMonthNavigation(
            // Check if month on the last row
            monthsGrid[monthsGrid.length - 1].includes(month) ? month - 12 + verticalOffset : month + verticalOffset, addMonths(preSelection, verticalOffset));
            break;
        }
      }
      handleOnMonthKeyDown && handleOnMonthKeyDown(event);
    });
    _defineProperty(_this, "onQuarterClick", function (e, q) {
      var labelDate = setQuarter(_this.props.day, q);
      if (isQuarterDisabled(labelDate, _this.props)) {
        return;
      }
      _this.handleDayClick(getStartOfQuarter(labelDate), e);
    });
    _defineProperty(_this, "onQuarterMouseEnter", function (q) {
      var labelDate = setQuarter(_this.props.day, q);
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
            _this.handleQuarterNavigation(quarter === 4 ? 1 : quarter + 1, addQuarters(_this.props.preSelection, 1));
            break;
          case "ArrowLeft":
            _this.handleQuarterNavigation(quarter === 1 ? 4 : quarter - 1, subQuarters(_this.props.preSelection, 1));
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
      var _monthClassName = monthClassName ? monthClassName(setMonth(day, m)) : undefined;
      var labelDate = setMonth(day, m);
      return clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
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
      var preSelectedMonth = getMonth(_this.props.preSelection);
      var tabIndex = !_this.props.disabledKeyboardNavigation && m === preSelectedMonth ? "0" : "-1";
      return tabIndex;
    });
    _defineProperty(_this, "getQuarterTabIndex", function (q) {
      var preSelectedQuarter = getQuarter(_this.props.preSelection);
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
      var labelDate = setMonth(day, month);
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
      return clsx("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
        "react-datepicker__quarter-text--disabled": (minDate || maxDate) && isQuarterDisabled(setQuarter(day, q), _this.props),
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
        return /*#__PURE__*/React.createElement("div", {
          className: "react-datepicker__month-wrapper",
          key: i
        }, month.map(function (m, j) {
          return /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__quarter-wrapper"
      }, quarters.map(function (q, j) {
        return /*#__PURE__*/React.createElement("div", {
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
      return clsx("react-datepicker__month", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: this.getClassNames(),
        onMouseLeave: !this.props.usePointerEvent ? this.handleMouseLeave : undefined,
        onPointerLeave: this.props.usePointerEvent ? this.handleMouseLeave : undefined,
        "aria-label": "".concat(formattedAriaLabelPrefix).concat(formatDate(day, "MMMM, yyyy")),
        role: "listbox"
      }, showMonthYearPicker ? this.renderMonths() : showQuarterYearPicker ? this.renderQuarters() : this.renderWeeks());
    }
  }]);
}(React.Component);

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
      if (_this.props.injectTimes && (getHours(time) * 3600 + getMinutes(time) * 60 + getSeconds$1(time)) % (_this.props.intervals * 60) !== 0) {
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
        var currentTime = addMinutes(base, i * intervals);
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
        return /*#__PURE__*/React.createElement("li", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__time-container ".concat(this.props.todayButton ? "react-datepicker__time-container--with-today-button" : "")
      }, /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly ? "react-datepicker__header--time--only" : ""),
        ref: function ref(header) {
          _this2.header = header;
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker-time__header"
      }, this.props.timeCaption)), /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__time"
      }, /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__time-box"
      }, /*#__PURE__*/React.createElement("ul", {
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
}(React.Component);
_defineProperty(Time, "calcCenterPosition", function (listHeight, centerLiRef) {
  return centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2);
});

var Year = /*#__PURE__*/function (_React$Component) {
  function Year(props) {
    var _this;
    _classCallCheck(this, Year);
    _this = _callSuper(this, Year, [props]);
    _defineProperty(_this, "YEAR_REFS", _toConsumableArray(Array(_this.props.yearItemNumber)).map(function () {
      return /*#__PURE__*/React.createRef();
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
      return y === getYear(newDate());
    });
    _defineProperty(_this, "isRangeStart", function (y) {
      return _this.props.startDate && _this.props.endDate && isSameYear(setYear(newDate(), y), _this.props.startDate);
    });
    _defineProperty(_this, "isRangeEnd", function (y) {
      return _this.props.startDate && _this.props.endDate && isSameYear(setYear(newDate(), y), _this.props.endDate);
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
      var _year = setYear(newDate(), y);
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
      var _year = setYear(newDate(), y);
      if (selectsEnd || selectsRange) {
        return isSameYear(_year, _this.selectingDate());
      }
      return isSameYear(_year, endDate);
    });
    _defineProperty(_this, "isKeyboardSelected", function (y) {
      var date = getStartOfYear(setYear(_this.props.date, y));
      return !_this.props.disabledKeyboardNavigation && !_this.props.inline && !isSameDay(date, getStartOfYear(_this.props.selected)) && isSameDay(date, getStartOfYear(_this.props.preSelection));
    });
    _defineProperty(_this, "onYearClick", function (e, y) {
      var date = _this.props.date;
      _this.handleYearClick(getStartOfYear(setYear(date, y)), e);
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
            _this.handleYearNavigation(y + 1, addYears(_this.props.preSelection, 1));
            break;
          case "ArrowLeft":
            _this.handleYearNavigation(y - 1, subYears(_this.props.preSelection, 1));
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
      return clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), yearClassName ? yearClassName(setYear(date, y)) : undefined, {
        "react-datepicker__year-text--selected": y === getYear(selected),
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
      var preSelected = getYear(_this.props.preSelection);
      return y === preSelected ? "0" : "-1";
    });
    _defineProperty(_this, "getYearContainerClassNames", function () {
      var _this$props6 = _this.props,
        selectingDate = _this$props6.selectingDate,
        selectsStart = _this$props6.selectsStart,
        selectsEnd = _this$props6.selectsEnd,
        selectsRange = _this$props6.selectsRange;
      return clsx("react-datepicker__year", {
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
        yearsList.push( /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: this.getYearContainerClassNames()
      }, /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__year-wrapper",
        onMouseLeave: !this.props.usePointerEvent ? this.props.clearSelectingDate : undefined,
        onPointerLeave: this.props.usePointerEvent ? this.props.clearSelectingDate : undefined
      }, yearsList));
    }
  }]);
}(React.Component);

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
        return /*#__PURE__*/React.cloneElement(customTimeInput, {
          date: date,
          value: time,
          onChange: _this.onTimeChange
        });
      }
      return /*#__PURE__*/React.createElement("input", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__input-time-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker-time__caption"
      }, this.props.timeInputLabel), /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker-time__input-container"
      }, /*#__PURE__*/React.createElement("div", {
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
}(React.Component);

function CalendarContainer(_ref) {
  var _ref$showTimeSelectOn = _ref.showTimeSelectOnly,
    showTimeSelectOnly = _ref$showTimeSelectOn === void 0 ? false : _ref$showTimeSelectOn,
    _ref$showTime = _ref.showTime,
    showTime = _ref$showTime === void 0 ? false : _ref$showTime,
    className = _ref.className,
    children = _ref.children;
  var ariaLabel = showTimeSelectOnly ? "Choose Time" : "Choose Date".concat(showTime ? " and Time" : "");
  return /*#__PURE__*/React.createElement("div", {
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
        if (minDate && isBefore(current, minDate)) {
          return minDate;
        } else if (maxDate && isAfter(current, maxDate)) {
          return maxDate;
        }
      }
      return current;
    });
    _defineProperty(_this, "increaseMonth", function () {
      _this.setState(function (_ref) {
        var date = _ref.date;
        return {
          date: addMonths(date, 1)
        };
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    });
    _defineProperty(_this, "decreaseMonth", function () {
      _this.setState(function (_ref2) {
        var date = _ref2.date;
        return {
          date: subMonths(date, 1)
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
        selectingDate: setYear(newDate(), year)
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
          date: setYear(date, year)
        };
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    });
    _defineProperty(_this, "changeMonth", function (month) {
      _this.setState(function (_ref4) {
        var date = _ref4.date;
        return {
          date: setMonth(date, month)
        };
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    });
    _defineProperty(_this, "changeMonthYear", function (monthYear) {
      _this.setState(function (_ref5) {
        var date = _ref5.date;
        return {
          date: setYear(setMonth(date, getMonth(monthYear)), getYear(monthYear))
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
        dayNames.push( /*#__PURE__*/React.createElement("div", {
          key: "W",
          className: "react-datepicker__day-name"
        }, _this.props.weekLabel || "#"));
      }
      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = addDays(startOfWeek, offset);
        var weekDayName = _this.formatWeekday(day, _this.props.locale);
        var weekDayClassName = _this.props.weekDayClassName ? _this.props.weekDayClassName(day) : undefined;
        return /*#__PURE__*/React.createElement("div", {
          key: offset,
          "aria-label": formatDate(day, "EEEE", _this.props.locale),
          className: clsx("react-datepicker__day-name", weekDayClassName)
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
          date: subYears(date, _this.props.showYearPicker ? _this.props.yearItemNumber : 1)
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
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: classes.join(" "),
        onClick: clickHandler,
        onKeyDown: _this.props.handleOnKeyDown,
        "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClasses.join(" ")
      }, isForYear ? _this.props.previousYearButtonLabel : _this.props.previousMonthButtonLabel));
    });
    _defineProperty(_this, "increaseYear", function () {
      _this.setState(function (_ref7) {
        var date = _ref7.date;
        return {
          date: addYears(date, _this.props.showYearPicker ? _this.props.yearItemNumber : 1)
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
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: classes.join(" "),
        onClick: clickHandler,
        onKeyDown: _this.props.handleOnKeyDown,
        "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel
      }, /*#__PURE__*/React.createElement("span", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: classes.join(" ")
      }, formatDate(date, _this.props.dateFormat, _this.props.locale));
    });
    _defineProperty(_this, "renderYearDropdown", function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!_this.props.showYearDropdown || overrideHide) {
        return;
      }
      return /*#__PURE__*/React.createElement(YearDropdown, {
        adjustDateOnChange: _this.props.adjustDateOnChange,
        date: _this.state.date,
        onSelect: _this.props.onSelect,
        setOpen: _this.props.setOpen,
        dropdownMode: _this.props.dropdownMode,
        onChange: _this.changeYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        year: getYear(_this.state.date),
        scrollableYearDropdown: _this.props.scrollableYearDropdown,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber
      });
    });
    _defineProperty(_this, "renderMonthDropdown", function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!_this.props.showMonthDropdown || overrideHide) {
        return;
      }
      return /*#__PURE__*/React.createElement(MonthDropdown, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        onChange: _this.changeMonth,
        month: getMonth(_this.state.date),
        useShortMonthInDropdown: _this.props.useShortMonthInDropdown
      });
    });
    _defineProperty(_this, "renderMonthYearDropdown", function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!_this.props.showMonthYearDropdown || overrideHide) {
        return;
      }
      return /*#__PURE__*/React.createElement(MonthYearDropdown, {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__today-button",
        onClick: function onClick(e) {
          return _this.handleTodayButtonClick(e);
        }
      }, _this.props.todayButton);
    });
    _defineProperty(_this, "renderDefaultHeader", function (_ref8) {
      var monthDate = _ref8.monthDate,
        i = _ref8.i;
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__header ".concat(_this.props.showTimeSelect ? "react-datepicker__header--has-time-select" : "")
      }, _this.renderCurrentMonth(monthDate), /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(_this.props.dropdownMode),
        onFocus: _this.handleDropdownFocus
      }, _this.renderMonthDropdown(i !== 0), _this.renderMonthYearDropdown(i !== 0), _this.renderYearDropdown(i !== 0)), /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement("div", {
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
      })), showDayNames && /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__header react-datepicker-year-header"
      }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : getYear(monthDate));
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
      var fromMonthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears(_this.state.date, monthsToSubtract) : subMonths(_this.state.date, monthsToSubtract);
      var monthSelectedIn = (_this$props$monthSele = _this.props.monthSelectedIn) !== null && _this$props$monthSele !== void 0 ? _this$props$monthSele : monthsToSubtract;
      for (var i = 0; i < _this.props.monthsShown; ++i) {
        var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
        var monthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears(fromMonthDate, monthsToAdd) : addMonths(fromMonthDate, monthsToAdd);
        var monthKey = "month-".concat(i);
        var monthShowsDuplicateDaysEnd = i < _this.props.monthsShown - 1;
        var monthShowsDuplicateDaysStart = i > 0;
        monthList.push( /*#__PURE__*/React.createElement("div", {
          key: monthKey,
          ref: function ref(div) {
            _this.monthContainer = div;
          },
          className: "react-datepicker__month-container"
        }, _this.renderHeader({
          monthDate: monthDate,
          i: i
        }), /*#__PURE__*/React.createElement(Month, {
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
        return /*#__PURE__*/React.createElement("div", {
          className: "react-datepicker__year--container"
        }, _this.renderHeader({
          monthDate: _this.state.date
        }), /*#__PURE__*/React.createElement(Year, _extends({
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
        return /*#__PURE__*/React.createElement(Time, {
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
        return /*#__PURE__*/React.createElement(inputTime, {
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
        ariaLiveMessage = getYear(_this.state.date);
      } else {
        ariaLiveMessage = "".concat(getMonthInLocale(getMonth(_this.state.date), _this.props.locale), " ").concat(getYear(_this.state.date));
      }
      return /*#__PURE__*/React.createElement("span", {
        role: "alert",
        "aria-live": "polite",
        className: "react-datepicker__aria-live"
      }, _this.state.isRenderAriaLiveMessage && ariaLiveMessage);
    });
    _defineProperty(_this, "renderChildren", function () {
      if (_this.props.children) {
        return /*#__PURE__*/React.createElement("div", {
          className: "react-datepicker__children-container"
        }, _this.props.children);
      }
    });
    _this.containerRef = /*#__PURE__*/React.createRef();
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
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "contents"
        },
        ref: this.containerRef
      }, /*#__PURE__*/React.createElement(Container, {
        className: clsx("react-datepicker", this.props.className, {
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
}(React.Component);

var CalendarIcon = function CalendarIcon(_ref) {
  var icon = _ref.icon,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _onClick = _ref.onClick;
  var defaultClass = "react-datepicker__calendar-icon";
  if ( /*#__PURE__*/React.isValidElement(icon)) {
    return /*#__PURE__*/React.cloneElement(icon, {
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
    return /*#__PURE__*/React.createElement("i", {
      className: "".concat(defaultClass, " ").concat(icon, " ").concat(className),
      "aria-hidden": "true",
      onClick: _onClick
    });
  }

  // Default SVG Icon
  return /*#__PURE__*/React.createElement("svg", {
    className: "".concat(defaultClass, " ").concat(className),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    onClick: _onClick
  }, /*#__PURE__*/React.createElement("path", {
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
      return /*#__PURE__*/ReactDOM.createPortal(this.props.children, this.el);
    }
  }]);
}(React.Component);

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
    _this.tabLoopRef = /*#__PURE__*/React.createRef();
    return _this;
  }
  _inherits(TabLoop, _React$Component);
  return _createClass(TabLoop, [{
    key: "render",
    value: function render() {
      if (!this.props.enableTabLoop) {
        return this.props.children;
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__tab-loop",
        ref: this.tabLoopRef
      }, /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__tab-loop__start",
        tabIndex: "0",
        onFocus: this.handleFocusStart
      }), this.props.children, /*#__PURE__*/React.createElement("div", {
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
}(React.Component);

function withFloating(Component) {
  var WithFloating = function WithFloating(props) {
    var alt_props = _objectSpread2(_objectSpread2({}, props), {}, {
      popperModifiers: props.popperModifiers || [],
      popperProps: props.popperProps || {},
      hidePopper: typeof props.hidePopper === "boolean" ? props.hidePopper : true
    });
    var arrowRef = React.useRef();
    var floatingProps = useFloating(_objectSpread2({
      open: !alt_props.hidePopper,
      whileElementsMounted: autoUpdate,
      placement: alt_props.popperPlacement,
      middleware: [flip({
        padding: 15
      }), offset(10), arrow({
        element: arrowRef
      })].concat(_toConsumableArray(alt_props.popperModifiers))
    }, alt_props.popperProps));
    return /*#__PURE__*/React.createElement(Component, _extends({}, alt_props, {
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
        var classes = clsx("react-datepicker-popper", className);
        popper = /*#__PURE__*/React.createElement(TabLoop, {
          enableTabLoop: enableTabLoop
        }, /*#__PURE__*/React.createElement("div", {
          ref: popperProps.refs.setFloating,
          style: popperProps.floatingStyles,
          className: classes,
          "data-placement": popperProps.placement,
          onKeyDown: popperOnKeyDown
        }, popperComponent, showArrow && /*#__PURE__*/React.createElement(FloatingArrow, {
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
        popper = /*#__PURE__*/React.createElement(this.props.popperContainer, {}, popper);
      }
      if (portalId && !hidePopper) {
        popper = /*#__PURE__*/React.createElement(Portal, {
          portalId: portalId,
          portalHost: portalHost
        }, popper);
      }
      var wrapperClasses = clsx("react-datepicker-wrapper", wrapperClassName);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
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
}(React.Component);
var PopperComponent$1 = withFloating(PopperComponent);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
var WrappedCalendar = onClickOutside(Calendar);

// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2);
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
        if (!isValid$1(date)) {
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
      var boundedPreSelection = minDate && isBefore(defaultPreSelection, startOfDay(minDate)) ? minDate : maxDate && isAfter(defaultPreSelection, endOfDay(maxDate)) ? maxDate : defaultPreSelection;
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
      return isDate(_this.state.preSelection);
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
        date = set(_this.props.selected, {
          hours: getHours(date),
          minutes: getMinutes(date),
          seconds: getSeconds(date)
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
        if (changedDate !== null && isYearDisabled(getYear(changedDate), _this.props)) {
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
              hour: getHours(_this.props.selected),
              minute: getMinutes(_this.props.selected),
              second: getSeconds(_this.props.selected)
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
        var dateStartOfDay = startOfDay(date);
        if (hasMinDate && hasMaxDate) {
          // isDayInRange uses startOfDay internally, so not necessary to manipulate times here
          isValidDateSelection = isDayInRange(date, _this.props.minDate, _this.props.maxDate);
        } else if (hasMinDate) {
          var minDateStartOfDay = startOfDay(_this.props.minDate);
          isValidDateSelection = isAfter(date, minDateStartOfDay) || isEqual(dateStartOfDay, minDateStartOfDay);
        } else if (hasMaxDate) {
          var maxDateEndOfDay = endOfDay(_this.props.maxDate);
          isValidDateSelection = isBefore(date, maxDateEndOfDay) || isEqual(dateStartOfDay, maxDateEndOfDay);
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
        hour: getHours(time),
        minute: getMinutes(time)
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
              newSelection = subWeeks(copy, 1);
            } else {
              newSelection = subDays(copy, 1);
            }
            break;
          case "ArrowRight":
            if (_this.props.showWeekPicker) {
              newSelection = addWeeks(copy, 1);
            } else {
              newSelection = addDays(copy, 1);
            }
            break;
          case "ArrowUp":
            newSelection = subWeeks(copy, 1);
            break;
          case "ArrowDown":
            newSelection = addWeeks(copy, 1);
            break;
          case "PageUp":
            newSelection = isShiftKeyActive ? subYears(copy, 1) : subMonths(copy, 1);
            break;
          case "PageDown":
            newSelection = isShiftKeyActive ? addYears(copy, 1) : addMonths(copy, 1);
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
          var prevMonth = getMonth(copy);
          var newMonth = getMonth(newSelection);
          var prevYear = getYear(copy);
          var newYear = getYear(newSelection);
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
      return /*#__PURE__*/React.createElement(WrappedCalendar, {
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
      return /*#__PURE__*/React.createElement("span", {
        role: "alert",
        "aria-live": "polite",
        className: "react-datepicker__aria-live"
      }, ariaLiveMessage);
    });
    _defineProperty(_this, "renderDateInput", function () {
      var _React$cloneElement;
      var className = clsx(_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));
      var customInput = _this.props.customInput || /*#__PURE__*/React.createElement("input", {
        type: "text"
      });
      var customInputRef = _this.props.customInputRef || "ref";
      var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : _this.props.selectsRange ? safeDateRangeFormat(_this.props.startDate, _this.props.endDate, _this.props) : _this.props.selectsMultiple ? safeMultipleDatesFormat(_this.props.selectedDates, _this.props) : safeDateFormat(_this.props.selected, _this.props);
      return /*#__PURE__*/React.cloneElement(customInput, (_React$cloneElement = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, customInputRef, function (input) {
        _this.input = input;
      }), "value", inputValue), "onBlur", _this.handleBlur), "onChange", _this.handleChange), "onClick", _this.onInputClick), "onFocus", _this.handleFocus), "onKeyDown", _this.onInputKeyDown), "id", _this.props.id), "name", _this.props.name), "form", _this.props.form), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "autoFocus", _this.props.autoFocus), "placeholder", _this.props.placeholderText), "disabled", _this.props.disabled), "autoComplete", _this.props.autoComplete), "className", clsx(customInput.props.className, className)), "title", _this.props.title), "readOnly", _this.props.readOnly), "required", _this.props.required), "tabIndex", _this.props.tabIndex), "aria-describedby", _this.props.ariaDescribedBy), _defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "aria-invalid", _this.props.ariaInvalid), "aria-labelledby", _this.props.ariaLabelledBy), "aria-required", _this.props.ariaRequired)));
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
        return /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: clsx("react-datepicker__close-icon", clearButtonClassName, {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "react-datepicker__input-container".concat(showIcon ? " react-datepicker__view-calendar-icon" : "")
      }, showIcon && /*#__PURE__*/React.createElement(CalendarIcon$1, _extends({
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
        var portalContainer = this.state.open ? /*#__PURE__*/React.createElement(TabLoop, {
          enableTabLoop: this.props.enableTabLoop
        }, /*#__PURE__*/React.createElement("div", {
          className: "react-datepicker__portal",
          tabIndex: -1,
          onKeyDown: this.onPortalKeyDown
        }, calendar)) : null;
        if (this.state.open && this.props.portalId) {
          portalContainer = /*#__PURE__*/React.createElement(Portal, {
            portalId: this.props.portalId,
            portalHost: this.props.portalHost
          }, portalContainer);
        }
        return /*#__PURE__*/React.createElement("div", null, this.renderInputContainer(), portalContainer);
      }
      return /*#__PURE__*/React.createElement(PopperComponent$1, {
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
}(React.Component);
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

export { CalendarContainer, DatePicker as default, getDefaultLocale, registerLocale, setDefaultLocale };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRlX3V0aWxzLmpzIiwiLi4vLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMveWVhcl9kcm9wZG93bi5qc3giLCIuLi8uLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMvbW9udGhfZHJvcGRvd24uanN4IiwiLi4vLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi5qc3giLCIuLi8uLi9zcmMvZGF5LmpzeCIsIi4uLy4uL3NyYy93ZWVrX251bWJlci5qc3giLCIuLi8uLi9zcmMvd2Vlay5qc3giLCIuLi8uLi9zcmMvbW9udGguanN4IiwiLi4vLi4vc3JjL3RpbWUuanN4IiwiLi4vLi4vc3JjL3llYXIuanN4IiwiLi4vLi4vc3JjL2lucHV0VGltZS5qc3giLCIuLi8uLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLmpzeCIsIi4uLy4uL3NyYy9jYWxlbmRhci5qc3giLCIuLi8uLi9zcmMvY2FsZW5kYXJfaWNvbi5qc3giLCIuLi8uLi9zcmMvcG9ydGFsLmpzeCIsIi4uLy4uL3NyYy90YWJfbG9vcC5qc3giLCIuLi8uLi9zcmMvd2l0aF9mbG9hdGluZy5qc3giLCIuLi8uLi9zcmMvcG9wcGVyX2NvbXBvbmVudC5qc3giLCIuLi8uLi9zcmMvaW5kZXguanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc0RhdGVcIjtcbmltcG9ydCB7IGlzVmFsaWQgYXMgaXNWYWxpZERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHsgZm9ybWF0LCBsb25nRm9ybWF0dGVycyB9IGZyb20gXCJkYXRlLWZucy9mb3JtYXRcIjtcbmltcG9ydCB7IGFkZE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkTWludXRlc1wiO1xuaW1wb3J0IHsgYWRkSG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkSG91cnNcIjtcbmltcG9ydCB7IGFkZERheXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkRGF5c1wiO1xuaW1wb3J0IHsgYWRkV2Vla3MgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkV2Vla3NcIjtcbmltcG9ydCB7IGFkZE1vbnRocyB9IGZyb20gXCJkYXRlLWZucy9hZGRNb250aHNcIjtcbmltcG9ydCB7IGFkZFF1YXJ0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBhZGRZZWFycyB9IGZyb20gXCJkYXRlLWZucy9hZGRZZWFyc1wiO1xuaW1wb3J0IHsgc3ViRGF5cyB9IGZyb20gXCJkYXRlLWZucy9zdWJEYXlzXCI7XG5pbXBvcnQgeyBzdWJXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9zdWJXZWVrc1wiO1xuaW1wb3J0IHsgc3ViTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL3N1Yk1vbnRoc1wiO1xuaW1wb3J0IHsgc3ViUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViUXVhcnRlcnNcIjtcbmltcG9ydCB7IHN1YlllYXJzIH0gZnJvbSBcImRhdGUtZm5zL3N1YlllYXJzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL2dldFNlY29uZHNcIjtcbmltcG9ydCB7IGdldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0TWludXRlc1wiO1xuaW1wb3J0IHsgZ2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0SG91cnNcIjtcbmltcG9ydCB7IGdldERheSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXlcIjtcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0RGF0ZVwiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCJkYXRlLWZucy9nZXRJU09XZWVrXCI7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9nZXRNb250aFwiO1xuaW1wb3J0IHsgZ2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9nZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2dldFllYXJcIjtcbmltcG9ydCB7IGdldFRpbWUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0VGltZVwiO1xuaW1wb3J0IHsgc2V0U2Vjb25kcyB9IGZyb20gXCJkYXRlLWZucy9zZXRTZWNvbmRzXCI7XG5pbXBvcnQgeyBzZXRNaW51dGVzIH0gZnJvbSBcImRhdGUtZm5zL3NldE1pbnV0ZXNcIjtcbmltcG9ydCB7IHNldEhvdXJzIH0gZnJvbSBcImRhdGUtZm5zL3NldEhvdXJzXCI7XG5pbXBvcnQgeyBzZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9zZXRNb250aFwiO1xuaW1wb3J0IHsgc2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBzZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3NldFllYXJcIjtcbmltcG9ydCB7IG1pbiB9IGZyb20gXCJkYXRlLWZucy9taW5cIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCJkYXRlLWZucy9tYXhcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mV2Vla1wiO1xuaW1wb3J0IHsgc3RhcnRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZNb250aFwiO1xuaW1wb3J0IHsgc3RhcnRPZlF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlF1YXJ0ZXJcIjtcbmltcG9ydCB7IHN0YXJ0T2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZZZWFyXCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mV2Vla1wiO1xuaW1wb3J0IHsgZW5kT2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9lbmRPZk1vbnRoXCI7XG5pbXBvcnQgeyBlbmRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZZZWFyXCI7XG5pbXBvcnQgeyBpc0VxdWFsIGFzIGRmSXNFcXVhbCB9IGZyb20gXCJkYXRlLWZucy9pc0VxdWFsXCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgYXMgZGZJc1NhbWVEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lRGF5XCI7XG5pbXBvcnQgeyBpc1NhbWVNb250aCBhcyBkZklzU2FtZU1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZU1vbnRoXCI7XG5pbXBvcnQgeyBpc1NhbWVZZWFyIGFzIGRmSXNTYW1lWWVhciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVZZWFyXCI7XG5pbXBvcnQgeyBpc1NhbWVRdWFydGVyIGFzIGRmSXNTYW1lUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVRdWFydGVyXCI7XG5pbXBvcnQgeyBpc0FmdGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzQWZ0ZXJcIjtcbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSBcImRhdGUtZm5zL2lzQmVmb3JlXCI7XG5pbXBvcnQgeyBpc1dpdGhpbkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zL2lzV2l0aGluSW50ZXJ2YWxcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCJkYXRlLWZucy90b0RhdGVcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlXCI7XG5pbXBvcnQgeyBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZucy9wYXJzZUlTT1wiO1xuaW1wb3J0IHsgYWRkU2Vjb25kcyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSID0gMTI7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbmNvbnN0IGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1ArcCt8UCt8cCt8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vICoqIERhdGUgQ29uc3RydWN0b3JzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdEYXRlKHZhbHVlKSB7XG4gIGNvbnN0IGQgPSB2YWx1ZVxuICAgID8gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHBhcnNlSVNPKHZhbHVlKVxuICAgICAgOiB0b0RhdGUodmFsdWUpXG4gICAgOiBuZXcgRGF0ZSgpO1xuICByZXR1cm4gaXNWYWxpZChkKSA/IGQgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlKHZhbHVlLCBkYXRlRm9ybWF0LCBsb2NhbGUsIHN0cmljdFBhcnNpbmcsIG1pbkRhdGUpIHtcbiAgbGV0IHBhcnNlZERhdGUgPSBudWxsO1xuICBsZXQgbG9jYWxlT2JqZWN0ID1cbiAgICBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSB8fCBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgbGV0IHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID0gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkpIHtcbiAgICBkYXRlRm9ybWF0LmZvckVhY2goKGRmKSA9PiB7XG4gICAgICBsZXQgdHJ5UGFyc2VEYXRlID0gcGFyc2UodmFsdWUsIGRmLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgICAgICBpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiZcbiAgICAgICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZSh0cnlQYXJzZURhdGUsIGRmLCBsb2NhbGUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCkge1xuICAgICAgICBwYXJzZWREYXRlID0gdHJ5UGFyc2VEYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZWREYXRlO1xuICB9XG5cbiAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LCBuZXcgRGF0ZSgpLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xuXG4gIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgaXNWYWxpZChwYXJzZWREYXRlKSAmJlxuICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUocGFyc2VkRGF0ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlKTtcbiAgfSBlbHNlIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0XG4gICAgICAubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCJwXCIgfHwgZmlyc3RDaGFyYWN0ZXIgPT09IFwiUFwiKSB7XG4gICAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgICByZXR1cm4gbG9jYWxlT2JqZWN0XG4gICAgICAgICAgICA/IGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGVPYmplY3QuZm9ybWF0TG9uZylcbiAgICAgICAgICAgIDogZmlyc3RDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlwiKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSwgbmV3IERhdGUoKSwge1xuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPyBwYXJzZWREYXRlIDogbnVsbDtcbn1cblxuLy8gKiogRGF0ZSBcIlJlZmxlY3Rpb25cIiAqKlxuXG5leHBvcnQgeyBpc0RhdGUgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSwgbWluRGF0ZSkge1xuICBtaW5EYXRlID0gbWluRGF0ZSA/IG1pbkRhdGUgOiBuZXcgRGF0ZShcIjEvMS8xMDAwXCIpO1xuICByZXR1cm4gaXNWYWxpZERhdGUoZGF0ZSkgJiYgIWlzQmVmb3JlKGRhdGUsIG1pbkRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIEZvcm1hdHRpbmcgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0U3RyLCBsb2NhbGUpIHtcbiAgaWYgKGxvY2FsZSA9PT0gXCJlblwiKSB7XG4gICAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgfSk7XG4gIH1cbiAgbGV0IGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChsb2NhbGUpO1xuICBpZiAobG9jYWxlICYmICFsb2NhbGVPYmopIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgQSBsb2NhbGUgb2JqZWN0IHdhcyBub3QgZm91bmQgZm9yIHRoZSBwcm92aWRlZCBzdHJpbmcgW1wiJHtsb2NhbGV9XCJdLmAsXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgIWxvY2FsZU9iaiAmJlxuICAgICEhZ2V0RGVmYXVsdExvY2FsZSgpICYmXG4gICAgISFnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKVxuICApIHtcbiAgICBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqID8gbG9jYWxlT2JqIDogbnVsbCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZUZvcm1hdChkYXRlLCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9KSB7XG4gIHJldHVybiAoXG4gICAgKGRhdGUgJiZcbiAgICAgIGZvcm1hdERhdGUoXG4gICAgICAgIGRhdGUsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkgPyBkYXRlRm9ybWF0WzBdIDogZGF0ZUZvcm1hdCxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgKSkgfHxcbiAgICBcIlwiXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZVJhbmdlRm9ybWF0KHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcHJvcHMpIHtcbiAgaWYgKCFzdGFydERhdGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KHN0YXJ0RGF0ZSwgcHJvcHMpO1xuICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gZW5kRGF0ZSA/IHNhZmVEYXRlRm9ybWF0KGVuZERhdGUsIHByb3BzKSA6IFwiXCI7XG5cbiAgcmV0dXJuIGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZX0gLSAke2Zvcm1hdHRlZEVuZERhdGV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KGRhdGVzLCBwcm9wcykge1xuICBpZiAoIWRhdGVzPy5sZW5ndGgpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBjb25zdCBmb3JtYXR0ZWRGaXJzdERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1swXSwgcHJvcHMpO1xuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlZEZpcnN0RGF0ZTtcbiAgfVxuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kRGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzFdLCBwcm9wcyk7XG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0sICR7Zm9ybWF0dGVkU2Vjb25kRGF0ZX1gO1xuICB9XG5cbiAgY29uc3QgZXh0cmFEYXRlc0NvdW50ID0gZGF0ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0gKCske2V4dHJhRGF0ZXNDb3VudH0pYDtcbn1cblxuLy8gKiogRGF0ZSBTZXR0ZXJzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lKGRhdGUsIHsgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSkge1xuICByZXR1cm4gc2V0SG91cnMoc2V0TWludXRlcyhzZXRTZWNvbmRzKGRhdGUsIHNlY29uZCksIG1pbnV0ZSksIGhvdXIpO1xufVxuXG5leHBvcnQgeyBzZXRNaW51dGVzLCBzZXRIb3Vycywgc2V0TW9udGgsIHNldFF1YXJ0ZXIsIHNldFllYXIgfTtcblxuLy8gKiogRGF0ZSBHZXR0ZXJzICoqXG5cbi8vIGdldERheSBSZXR1cm5zIGRheSBvZiB3ZWVrLCBnZXREYXRlIHJldHVybnMgZGF5IG9mIG1vbnRoXG5leHBvcnQge1xuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgZ2V0TW9udGgsXG4gIGdldFF1YXJ0ZXIsXG4gIGdldFllYXIsXG4gIGdldERheSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0VGltZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIGxvY2FsZSkge1xuICBsZXQgbG9jYWxlT2JqID1cbiAgICAobG9jYWxlICYmIGdldExvY2FsZU9iamVjdChsb2NhbGUpKSB8fFxuICAgIChnZXREZWZhdWx0TG9jYWxlKCkgJiYgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSkpO1xuICByZXR1cm4gZ2V0SVNPV2VlayhkYXRlLCBsb2NhbGVPYmogPyB7IGxvY2FsZTogbG9jYWxlT2JqIH0gOiBudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2Vla0NvZGUoZGF5LCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF5LCBcImRkZFwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiogU3RhcnQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mRGF5KGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mV2VlayhkYXRlLCBsb2NhbGUsIGNhbGVuZGFyU3RhcnREYXkpIHtcbiAgbGV0IGxvY2FsZU9iaiA9IGxvY2FsZVxuICAgID8gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSlcbiAgICA6IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqLFxuICAgIHdlZWtTdGFydHNPbjogY2FsZW5kYXJTdGFydERheSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZk1vbnRoKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlllYXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlllYXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mUXVhcnRlcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mUXVhcnRlcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZUb2RheSgpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkobmV3RGF0ZSgpKTtcbn1cblxuLy8gKioqIEVuZCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mV2VlayhkYXRlKSB7XG4gIHJldHVybiBlbmRPZldlZWsoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mTW9udGgoZGF0ZSk7XG59XG5cbi8vICoqIERhdGUgTWF0aCAqKlxuXG4vLyAqKiogQWRkaXRpb24gKioqXG5cbmV4cG9ydCB7XG4gIGFkZFNlY29uZHMsXG4gIGFkZE1pbnV0ZXMsXG4gIGFkZERheXMsXG4gIGFkZFdlZWtzLFxuICBhZGRNb250aHMsXG4gIGFkZFF1YXJ0ZXJzLFxuICBhZGRZZWFycyxcbn07XG5cbi8vICoqKiBTdWJ0cmFjdGlvbiAqKipcblxuZXhwb3J0IHsgYWRkSG91cnMsIHN1YkRheXMsIHN1YldlZWtzLCBzdWJNb250aHMsIHN1YlF1YXJ0ZXJzLCBzdWJZZWFycyB9O1xuXG4vLyAqKiBEYXRlIENvbXBhcmlzb24gKipcblxuZXhwb3J0IHsgaXNCZWZvcmUsIGlzQWZ0ZXIgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZU1vbnRoKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNFcXVhbChkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgbGV0IHZhbGlkO1xuICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZEYXkoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kID0gZW5kT2ZEYXkoZW5kRGF0ZSk7XG5cbiAgdHJ5IHtcbiAgICB2YWxpZCA9IGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG4vLyAqKiogRGlmZmluZyAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheXNEaWZmKGRhdGUxLCBkYXRlMikge1xuICByZXR1cm4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUxLCBkYXRlMik7XG59XG5cbi8vICoqIERhdGUgTG9jYWxpemF0aW9uICoqXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckxvY2FsZShsb2NhbGVOYW1lLCBsb2NhbGVEYXRhKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgaWYgKCFzY29wZS5fX2xvY2FsZURhdGFfXykge1xuICAgIHNjb3BlLl9fbG9jYWxlRGF0YV9fID0ge307XG4gIH1cbiAgc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlTmFtZV0gPSBsb2NhbGVEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdExvY2FsZShsb2NhbGVOYW1lKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgc2NvcGUuX19sb2NhbGVJZF9fID0gbG9jYWxlTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRMb2NhbGUoKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlSWRfXztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsZU9iamVjdChsb2NhbGVTcGVjKSB7XG4gIGlmICh0eXBlb2YgbG9jYWxlU3BlYyA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgbG9jYWxlIG5hbWUgcmVnaXN0ZXJlZCBieSByZWdpc3RlckxvY2FsZVxuICAgIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG4gICAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlRGF0YV9fID8gc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlU3BlY10gOiBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgcmF3IGRhdGUtZm5zIGxvY2FsZSBvYmplY3RcbiAgICByZXR1cm4gbG9jYWxlU3BlYztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRhdGUsIGZvcm1hdEZ1bmMsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RnVuYyhmb3JtYXREYXRlKGRhdGUsIFwiRUVFRVwiLCBsb2NhbGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXRlLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFRUVcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTExcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoU2hvcnRJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUocXVhcnRlciwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldFF1YXJ0ZXIobmV3RGF0ZSgpLCBxdWFydGVyKSwgXCJRUVFcIiwgbG9jYWxlKTtcbn1cblxuLy8gKiogVXRpbHMgZm9yIHNvbWUgY29tcG9uZW50cyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlEaXNhYmxlZChcbiAgZGF5LFxuICB7XG4gICAgbWluRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICBleGNsdWRlRGF0ZUludGVydmFscyxcbiAgICBpbmNsdWRlRGF0ZXMsXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHMsXG4gICAgZmlsdGVyRGF0ZSxcbiAgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXksIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChleGNsdWRlRGF0ZUludGVydmFscyAmJlxuICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZURheShkYXksIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICAhaW5jbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF5KSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5RXhjbHVkZWQoXG4gIGRheSxcbiAgeyBleGNsdWRlRGF0ZXMsIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIH0gPSB7fSxcbikge1xuICBpZiAoZXhjbHVkZURhdGVJbnRlcnZhbHMgJiYgZXhjbHVkZURhdGVJbnRlcnZhbHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoRGlzYWJsZWQoXG4gIG1vbnRoLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMobW9udGgsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZNb250aChtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mTW9udGgobWF4RGF0ZSksXG4gICAgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUobW9udGgpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBlbmREYXRlLCBtLCBkYXkpIHtcbiAgY29uc3Qgc3RhcnREYXRlWWVhciA9IGdldFllYXIoc3RhcnREYXRlKTtcbiAgY29uc3Qgc3RhcnREYXRlTW9udGggPSBnZXRNb250aChzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVNb250aCA9IGdldE1vbnRoKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVNb250aCA8PSBtICYmIG0gPD0gZW5kRGF0ZU1vbnRoO1xuICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZVllYXIgPCBlbmREYXRlWWVhcikge1xuICAgIHJldHVybiAoXG4gICAgICAoZGF5WWVhciA9PT0gc3RhcnREYXRlWWVhciAmJiBzdGFydERhdGVNb250aCA8PSBtKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVNb250aCA+PSBtKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJEaXNhYmxlZChcbiAgcXVhcnRlcixcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKHF1YXJ0ZXIsIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZVF1YXJ0ZXIocXVhcnRlciwgaW5jbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKHF1YXJ0ZXIpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyXG4gKiBAcGFyYW0ge0RhdGV9IHN0YXJ0XG4gKiBAcGFyYW0ge0RhdGV9IGVuZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJJblJhbmdlKHllYXIsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFpc1ZhbGlkRGF0ZShzdGFydCkgfHwgIWlzVmFsaWREYXRlKGVuZCkpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc3RhcnRZZWFyID0gZ2V0WWVhcihzdGFydCk7XG4gIGNvbnN0IGVuZFllYXIgPSBnZXRZZWFyKGVuZCk7XG5cbiAgcmV0dXJuIHN0YXJ0WWVhciA8PSB5ZWFyICYmIGVuZFllYXIgPj0geWVhcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckRpc2FibGVkKFxuICB5ZWFyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoeWVhciwgMCwgMSk7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXRlLCB7XG4gICAgICBtaW5EYXRlOiBzdGFydE9mWWVhcihtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mWWVhcihtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZVllYXIoZGF0ZSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKGRhdGUpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIHEsIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihlbmREYXRlKTtcbiAgY29uc3QgZGF5WWVhciA9IGdldFllYXIoZGF5KTtcbiAgaWYgKHN0YXJ0RGF0ZVllYXIgPT09IGVuZERhdGVZZWFyICYmIHN0YXJ0RGF0ZVllYXIgPT09IGRheVllYXIpIHtcbiAgICByZXR1cm4gc3RhcnREYXRlUXVhcnRlciA8PSBxICYmIHEgPD0gZW5kRGF0ZVF1YXJ0ZXI7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZVF1YXJ0ZXIgPD0gcSkgfHxcbiAgICAgIChkYXlZZWFyID09PSBlbmREYXRlWWVhciAmJiBlbmREYXRlUXVhcnRlciA+PSBxKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0gPSB7fSkge1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1pbkRhdGUpIDwgMCkgfHxcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF5LCBtYXhEYXRlKSA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkxpc3QodGltZSwgdGltZXMpIHtcbiAgcmV0dXJuIHRpbWVzLnNvbWUoXG4gICAgKGxpc3RUaW1lKSA9PlxuICAgICAgZ2V0SG91cnMobGlzdFRpbWUpID09PSBnZXRIb3Vycyh0aW1lKSAmJlxuICAgICAgZ2V0TWludXRlcyhsaXN0VGltZSkgPT09IGdldE1pbnV0ZXModGltZSkgJiZcbiAgICAgIGdldFNlY29uZHMobGlzdFRpbWUpID09PSBnZXRTZWNvbmRzKHRpbWUpLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lRGlzYWJsZWQoXG4gIHRpbWUsXG4gIHsgZXhjbHVkZVRpbWVzLCBpbmNsdWRlVGltZXMsIGZpbHRlclRpbWUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVUaW1lcyAmJiBpc1RpbWVJbkxpc3QodGltZSwgZXhjbHVkZVRpbWVzKSkgfHxcbiAgICAoaW5jbHVkZVRpbWVzICYmICFpc1RpbWVJbkxpc3QodGltZSwgaW5jbHVkZVRpbWVzKSkgfHxcbiAgICAoZmlsdGVyVGltZSAmJiAhZmlsdGVyVGltZSh0aW1lKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHsgbWluVGltZSwgbWF4VGltZSB9KSB7XG4gIGlmICghbWluVGltZSB8fCAhbWF4VGltZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJvdGggbWluVGltZSBhbmQgbWF4VGltZSBwcm9wcyByZXF1aXJlZFwiKTtcbiAgfVxuICBsZXQgYmFzZVRpbWUgPSBuZXdEYXRlKCk7XG4gIGJhc2VUaW1lID0gc2V0SG91cnMoYmFzZVRpbWUsIGdldEhvdXJzKHRpbWUpKTtcbiAgYmFzZVRpbWUgPSBzZXRNaW51dGVzKGJhc2VUaW1lLCBnZXRNaW51dGVzKHRpbWUpKTtcbiAgYmFzZVRpbWUgPSBzZXRTZWNvbmRzKGJhc2VUaW1lLCBnZXRTZWNvbmRzKHRpbWUpKTtcblxuICBsZXQgbWluID0gbmV3RGF0ZSgpO1xuICBtaW4gPSBzZXRIb3VycyhtaW4sIGdldEhvdXJzKG1pblRpbWUpKTtcbiAgbWluID0gc2V0TWludXRlcyhtaW4sIGdldE1pbnV0ZXMobWluVGltZSkpO1xuICBtaW4gPSBzZXRTZWNvbmRzKG1pbiwgZ2V0U2Vjb25kcyhtaW5UaW1lKSk7XG5cbiAgbGV0IG1heCA9IG5ld0RhdGUoKTtcbiAgbWF4ID0gc2V0SG91cnMobWF4LCBnZXRIb3VycyhtYXhUaW1lKSk7XG4gIG1heCA9IHNldE1pbnV0ZXMobWF4LCBnZXRNaW51dGVzKG1heFRpbWUpKTtcbiAgbWF4ID0gc2V0U2Vjb25kcyhtYXgsIGdldFNlY29uZHMobWF4VGltZSkpO1xuXG4gIGxldCB2YWxpZDtcbiAgdHJ5IHtcbiAgICB2YWxpZCA9ICFpc1dpdGhpbkludGVydmFsKGJhc2VUaW1lLCB7IHN0YXJ0OiBtaW4sIGVuZDogbWF4IH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbnRoRGlzYWJsZWRCZWZvcmUoZGF5LCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgcHJldmlvdXNNb250aCA9IHN1Yk1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG1pbkRhdGUsIHByZXZpb3VzTW9udGgpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRNb250aCA9IGFkZE1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhuZXh0TW9udGgsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWFydGVyRGlzYWJsZWRCZWZvcmUoZGF0ZSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGZpcnN0RGF0ZU9mWWVhciA9IHN0YXJ0T2ZZZWFyKGRhdGUpO1xuICBjb25zdCBwcmV2aW91c1F1YXJ0ZXIgPSBzdWJRdWFydGVycyhmaXJzdERhdGVPZlllYXIsIDEpO1xuXG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhtaW5EYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyKGRhdGUsIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBsYXN0RGF0ZU9mWWVhciA9IGVuZE9mWWVhcihkYXRlKTtcbiAgY29uc3QgbmV4dFF1YXJ0ZXIgPSBhZGRRdWFydGVycyhsYXN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhuZXh0UXVhcnRlciwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c1llYXIgPSBzdWJZZWFycyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobWluRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQmVmb3JlKFxuICBkYXksXG4gIHsgbWluRGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IGdldFN0YXJ0T2ZZZWFyKHN1YlllYXJzKGRheSwgeWVhckl0ZW1OdW1iZXIpKTtcbiAgY29uc3QgeyBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKHByZXZpb3VzWWVhciwgeWVhckl0ZW1OdW1iZXIpO1xuICBjb25zdCBtaW5EYXRlWWVhciA9IG1pbkRhdGUgJiYgZ2V0WWVhcihtaW5EYXRlKTtcbiAgcmV0dXJuIChtaW5EYXRlWWVhciAmJiBtaW5EYXRlWWVhciA+IGVuZFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0WWVhciA9IGFkZFllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhuZXh0WWVhciwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhcnNEaXNhYmxlZEFmdGVyKFxuICBkYXksXG4gIHsgbWF4RGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKG5leHRZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1heERhdGVZZWFyID0gbWF4RGF0ZSAmJiBnZXRZZWFyKG1heERhdGUpO1xuICByZXR1cm4gKG1heERhdGVZZWFyICYmIG1heERhdGVZZWFyIDwgc3RhcnRQZXJpb2QpIHx8IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWluRGF0ZSh7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWluRGF0ZSkge1xuICAgIGxldCBtaW5EYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWluRGF0ZSkgPj0gMCxcbiAgICApO1xuICAgIHJldHVybiBtaW4obWluRGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtaW4oaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWluRGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWF4RGF0ZSkge1xuICAgIGxldCBtYXhEYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWF4RGF0ZSkgPD0gMCxcbiAgICApO1xuICAgIHJldHVybiBtYXgobWF4RGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtYXgoaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWF4RGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlnaHRMaWdodERheXNNYXAoXG4gIGhpZ2hsaWdodERhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhpZ2hsaWdodERhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgb2JqID0gaGlnaGxpZ2h0RGF0ZXNbaV07XG4gICAgaWYgKGlzRGF0ZShvYmopKSB7XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKG9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lc0FyciA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IFtdO1xuICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGRlZmF1bHRDbGFzc05hbWUpKSB7XG4gICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChkZWZhdWx0Q2xhc3NOYW1lKTtcbiAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGtleXNbMF07XG4gICAgICBjb25zdCBhcnJPZkRhdGVzID0gb2JqW2tleXNbMF1dO1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgYXJyT2ZEYXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbiA9IGFyck9mRGF0ZXMubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKGFyck9mRGF0ZXNba10sIFwiTU0uZGQueXl5eVwiKTtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlQ2xhc3Nlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHRoZSB0d28gYXJyYXlzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTFcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MlxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUsIGlmIHRoZSBwYXNzZWQgYXJyYXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0FyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSB7XG4gIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5MS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gYXJyYXkyW2luZGV4XSk7XG59XG5cbi8qKlxuICogQXNzaWduIHRoZSBjdXN0b20gY2xhc3MgdG8gZWFjaCBkYXRlXG4gKiBAcGFyYW0ge0FycmF5fSBob2xpZGF5RGF0ZXMgYXJyYXkgb2Ygb2JqZWN0IGNvbnRhaW5pbmcgZGF0ZSBhbmQgbmFtZSBvZiB0aGUgaG9saWRheVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzbmFtZSB0byBiZSBhZGRlZC5cbiAqIEByZXR1cm5zIHtNYXB9IE1hcCBjb250YWluaW5nIGRhdGUgYXMga2V5IGFuZCBhcnJheSBvZiBjbGFzc25hbWUgYW5kIGhvbGlkYXkgbmFtZSBhcyB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9saWRheXNNYXAoXG4gIGhvbGlkYXlEYXRlcyA9IFtdLFxuICBkZWZhdWx0Q2xhc3NOYW1lID0gXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhvbGlkYXlzXCIsXG4pIHtcbiAgY29uc3QgZGF0ZUNsYXNzZXMgPSBuZXcgTWFwKCk7XG4gIGhvbGlkYXlEYXRlcy5mb3JFYWNoKChob2xpZGF5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlOiBkYXRlT2JqLCBob2xpZGF5TmFtZSB9ID0gaG9saWRheTtcbiAgICBpZiAoIWlzRGF0ZShkYXRlT2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoZGF0ZU9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXNPYmogPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCB7fTtcbiAgICBpZiAoXG4gICAgICBcImNsYXNzTmFtZVwiIGluIGNsYXNzTmFtZXNPYmogJiZcbiAgICAgIGNsYXNzTmFtZXNPYmpbXCJjbGFzc05hbWVcIl0gPT09IGRlZmF1bHRDbGFzc05hbWUgJiZcbiAgICAgIGFycmF5c0FyZUVxdWFsKGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0sIFtob2xpZGF5TmFtZV0pXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9IGRlZmF1bHRDbGFzc05hbWU7XG4gICAgY29uc3QgaG9saWRheU5hbWVBcnIgPSBjbGFzc05hbWVzT2JqW1wiaG9saWRheU5hbWVzXCJdO1xuICAgIGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0gPSBob2xpZGF5TmFtZUFyclxuICAgICAgPyBbLi4uaG9saWRheU5hbWVBcnIsIGhvbGlkYXlOYW1lXVxuICAgICAgOiBbaG9saWRheU5hbWVdO1xuICAgIGRhdGVDbGFzc2VzLnNldChrZXksIGNsYXNzTmFtZXNPYmopO1xuICB9KTtcbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXNUb0luamVjdEFmdGVyKFxuICBzdGFydE9mRGF5LFxuICBjdXJyZW50VGltZSxcbiAgY3VycmVudE11bHRpcGxpZXIsXG4gIGludGVydmFscyxcbiAgaW5qZWN0ZWRUaW1lcyxcbikge1xuICBjb25zdCBsID0gaW5qZWN0ZWRUaW1lcy5sZW5ndGg7XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IGluamVjdGVkVGltZSA9IHN0YXJ0T2ZEYXk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkSG91cnMoaW5qZWN0ZWRUaW1lLCBnZXRIb3VycyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkTWludXRlcyhpbmplY3RlZFRpbWUsIGdldE1pbnV0ZXMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuICAgIGluamVjdGVkVGltZSA9IGFkZFNlY29uZHMoaW5qZWN0ZWRUaW1lLCBnZXRTZWNvbmRzKGluamVjdGVkVGltZXNbaV0pKTtcblxuICAgIGNvbnN0IG5leHRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIHN0YXJ0T2ZEYXksXG4gICAgICAoY3VycmVudE11bHRpcGxpZXIgKyAxKSAqIGludGVydmFscyxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgaXNBZnRlcihpbmplY3RlZFRpbWUsIGN1cnJlbnRUaW1lKSAmJlxuICAgICAgaXNCZWZvcmUoaW5qZWN0ZWRUaW1lLCBuZXh0VGltZSlcbiAgICApIHtcbiAgICAgIHRpbWVzLnB1c2goaW5qZWN0ZWRUaW1lc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRpbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWmVybyhpKSB7XG4gIHJldHVybiBpIDwgMTAgPyBgMCR7aX1gIDogYCR7aX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WWVhcnNQZXJpb2QoXG4gIGRhdGUsXG4gIHllYXJJdGVtTnVtYmVyID0gREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuKSB7XG4gIGNvbnN0IGVuZFBlcmlvZCA9IE1hdGguY2VpbChnZXRZZWFyKGRhdGUpIC8geWVhckl0ZW1OdW1iZXIpICogeWVhckl0ZW1OdW1iZXI7XG4gIGNvbnN0IHN0YXJ0UGVyaW9kID0gZW5kUGVyaW9kIC0gKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gIHJldHVybiB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzSW5EYXkoZCkge1xuICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKTtcbiAgY29uc3Qgc3RhcnRPZlRoZU5leHREYXkgPSBuZXcgRGF0ZShcbiAgICBkLmdldEZ1bGxZZWFyKCksXG4gICAgZC5nZXRNb250aCgpLFxuICAgIGQuZ2V0RGF0ZSgpLFxuICAgIDI0LFxuICApO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKCgrc3RhcnRPZlRoZU5leHREYXkgLSArc3RhcnRPZkRheSkgLyAzXzYwMF8wMDApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIHRoZSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlXG4gKlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL3N0YXJ0T2ZNaW51dGVgXG4gKiBkbyBub3QgbWFrZSBjaGFuZ2VzIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1xuICpcbiAqIFNlZSBjb21tZW50cyBvbiBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL3B1bGwvNDI0NFxuICogZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gc3RhcnQgb2YgdGhlIG1pbnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZk1pbnV0ZShkKSB7XG4gIGNvbnN0IHNlY29uZHMgPSBkLmdldFNlY29uZHMoKTtcbiAgY29uc3QgbWlsbGlzZWNvbmRzID0gZC5nZXRNaWxsaXNlY29uZHMoKTtcblxuICByZXR1cm4gdG9EYXRlKGQuZ2V0VGltZSgpIC0gc2Vjb25kcyAqIDEwMDAgLSBtaWxsaXNlY29uZHMpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIG1pbnV0ZVxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9pc1NhbWVNaW51dGVgXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkMVxuICogQHBhcmFtIHtEYXRlfSBkMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNaW51dGUoZDEsIGQyKSB7XG4gIHJldHVybiBzdGFydE9mTWludXRlKGQxKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZNaW51dGUoZDIpLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmVkIGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lICgwMDowMDowMClcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgZm9yIHdoaWNoIG1pZG5pZ2h0IHRpbWUgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtEYXRlfSBBIG5ldyBkYXRldGltZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlkbmlnaHREYXRlKGRhdGUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGVcIik7XG4gIH1cblxuICBjb25zdCBkYXRlV2l0aG91dFRpbWUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgZGF0ZVdpdGhvdXRUaW1lLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZVdpdGhvdXRUaW1lO1xufVxuXG4vKipcbiAqIElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSBUaGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUaGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKlxuICogTm90ZTpcbiAqICBUaGlzIGZ1bmN0aW9uIGNvbnNpZGVycyB0aGUgbWlkLW5pZ2h0IG9mIHRoZSBnaXZlbiBkYXRlcyBmb3IgY29tcGFyaXNvbi5cbiAqICBJdCBldmFsdWF0ZXMgd2hldGhlciBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlIGJhc2VkIG9uIHRoZWlyIG1pZC1uaWdodCB0aW1lc3RhbXBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlQmVmb3JlKGRhdGUsIGRhdGVUb0NvbXBhcmUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkgfHwgIWlzRGF0ZShkYXRlVG9Db21wYXJlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSByZWNlaXZlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlKTtcbiAgY29uc3QgbWlkbmlnaHREYXRlVG9Db21wYXJlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGVUb0NvbXBhcmUpO1xuXG4gIHJldHVybiBpc0JlZm9yZShtaWRuaWdodERhdGUsIG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NwYWNlS2V5RG93bihldmVudCkge1xuICBjb25zdCBTUEFDRV9LRVkgPSBcIiBcIjtcbiAgcmV0dXJuIGV2ZW50LmtleSA9PT0gU1BBQ0VfS0VZO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVllYXJzKHllYXIsIG5vT2ZZZWFyLCBtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogbm9PZlllYXIgKyAxOyBpKyspIHtcbiAgICBjb25zdCBuZXdZZWFyID0geWVhciArIG5vT2ZZZWFyIC0gaTtcbiAgICBsZXQgaXNJblJhbmdlID0gdHJ1ZTtcblxuICAgIGlmIChtaW5EYXRlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1pbkRhdGUpIDw9IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGUgJiYgaXNJblJhbmdlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1heERhdGUpID49IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKGlzSW5SYW5nZSkge1xuICAgICAgbGlzdC5wdXNoKG5ld1llYXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IHllYXJEcm9wZG93bkl0ZW1OdW1iZXIsIHNjcm9sbGFibGVZZWFyRHJvcGRvd24gfSA9IHByb3BzO1xuICAgIGNvbnN0IG5vT2ZZZWFyID1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXIgfHwgKHNjcm9sbGFibGVZZWFyRHJvcGRvd24gPyAxMCA6IDUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHllYXJzTGlzdDogZ2VuZXJhdGVZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy55ZWFyLFxuICAgICAgICBub09mWWVhcixcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gICAgdGhpcy5kcm9wZG93blJlZiA9IGNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZHJvcGRvd25DdXJyZW50ID0gdGhpcy5kcm9wZG93blJlZi5jdXJyZW50O1xuXG4gICAgaWYgKGRyb3Bkb3duQ3VycmVudCkge1xuICAgICAgLy8gR2V0IGFycmF5IGZyb20gSFRNTENvbGxlY3Rpb25cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuID0gZHJvcGRvd25DdXJyZW50LmNoaWxkcmVuXG4gICAgICAgID8gQXJyYXkuZnJvbShkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW4pXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkWWVhck9wdGlvbkVsID0gZHJvcGRvd25DdXJyZW50Q2hpbGRyZW5cbiAgICAgICAgPyBkcm9wZG93bkN1cnJlbnRDaGlsZHJlbi5maW5kKChjaGlsZEVsKSA9PiBjaGlsZEVsLmFyaWFTZWxlY3RlZClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBkcm9wZG93bkN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWRZZWFyT3B0aW9uRWxcbiAgICAgICAgPyBzZWxlY3RlZFllYXJPcHRpb25FbC5vZmZzZXRUb3AgK1xuICAgICAgICAgIChzZWxlY3RlZFllYXJPcHRpb25FbC5jbGllbnRIZWlnaHQgLSBkcm9wZG93bkN1cnJlbnQuY2xpZW50SGVpZ2h0KSAvIDJcbiAgICAgICAgOiAoZHJvcGRvd25DdXJyZW50LnNjcm9sbEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMjtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IHRoaXMucHJvcHMueWVhcjtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKCh5ZWFyKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgc2VsZWN0ZWRZZWFyID09PSB5ZWFyXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkX3llYXJcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e3llYXJ9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB5ZWFyKX1cbiAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWRZZWFyID09PSB5ZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHtzZWxlY3RlZFllYXIgPT09IHllYXIgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge3llYXJ9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcblxuICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLnByb3BzLm1pbkRhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWluRGF0ZSkgOiBudWxsO1xuICAgIGNvbnN0IG1heFllYXIgPSB0aGlzLnByb3BzLm1heERhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWF4RGF0ZSkgOiBudWxsO1xuXG4gICAgaWYgKCFtYXhZZWFyIHx8ICF0aGlzLnN0YXRlLnllYXJzTGlzdC5maW5kKCh5ZWFyKSA9PiB5ZWFyID09PSBtYXhZZWFyKSkge1xuICAgICAgb3B0aW9ucy51bnNoaWZ0KFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICAgIGtleT17XCJ1cGNvbWluZ1wifVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaW5jcmVtZW50WWVhcnN9XG4gICAgICAgID5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzLXVwY29taW5nXCIgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIW1pblllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1pblllYXIpKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInByZXZpb3VzXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5kZWNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtcHJldmlvdXNcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgc2hpZnRZZWFycyA9IChhbW91bnQpID0+IHtcbiAgICBjb25zdCB5ZWFycyA9IHRoaXMuc3RhdGUueWVhcnNMaXN0Lm1hcChmdW5jdGlvbiAoeWVhcikge1xuICAgICAgcmV0dXJuIHllYXIgKyBhbW91bnQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHllYXJzTGlzdDogeWVhcnMsXG4gICAgfSk7XG4gIH07XG5cbiAgaW5jcmVtZW50WWVhcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRZZWFycygxKTtcbiAgfTtcblxuICBkZWNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKC0xKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30gcmVmPXt0aGlzLmRyb3Bkb3duUmVmfT5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4veWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IDE5MDA7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IDIxMDA7XG5cbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IG1pblllYXI7IGkgPD0gbWF4WWVhcjsgaSsrKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17aX0+XG4gICAgICAgICAge2l9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQteWVhclwiPlxuICAgICAgICB7dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgeWVhcj17dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKHllYXIgPT09IHRoaXMucHJvcHMueWVhcikgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnByb3BzLmRhdGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSwgZXZlbnQpID0+IHtcbiAgICB0aGlzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB0aGlzLnNldE9wZW4oKTtcbiAgfTtcblxuICBvblNlbGVjdCA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0T3BlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG1vbnRoTmFtZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoaSkgPT4gdGhpcy5wcm9wcy5tb250aCA9PT0gaTtcblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1vbnRoTmFtZXMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGkpXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGhcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvblwiXG4gICAgICAgIH1cbiAgICAgICAga2V5PXttb250aH1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGkpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5pc1NlbGVjdGVkTW9udGgoaSkgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZFwiPuKckzwvc3Bhbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBcIlwiXG4gICAgICAgICl9XG4gICAgICAgIHttb250aH1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aERyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAobW9udGhOYW1lcykgPT5cbiAgICBtb250aE5hbWVzLm1hcCgoTSwgaSkgPT4gKFxuICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAge019XG4gICAgICA8L29wdGlvbj5cbiAgICApKTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKG1vbnRoTmFtZXMpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMobW9udGhOYW1lcyl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSwgbW9udGhOYW1lcykgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3XCJcbiAgICAgIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGhcIj5cbiAgICAgICAge21vbnRoTmFtZXNbdGhpcy5wcm9wcy5tb250aF19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgbW9udGhOYW1lcz17bW9udGhOYW1lc31cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKG1vbnRoTmFtZXMpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSwgbW9udGhOYW1lcyldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24obW9udGhOYW1lcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIGlmIChtb250aCAhPT0gdGhpcy5wcm9wcy5tb250aCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aCk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV0ubWFwKFxuICAgICAgdGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93blxuICAgICAgICA/IChNKSA9PiB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpXG4gICAgICAgIDogKE0pID0+IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpLFxuICAgICk7XG5cbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKG1vbnRoTmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgbmV3RGF0ZSxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVNb250aFllYXJzKG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtaW5EYXRlKTtcbiAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgobWF4RGF0ZSk7XG5cbiAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICBsaXN0LnB1c2gobmV3RGF0ZShjdXJyRGF0ZSkpO1xuXG4gICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtb250aFllYXJzTGlzdDogZ2VuZXJhdGVNb250aFllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubW9udGhZZWFyc0xpc3QubWFwKChtb250aFllYXIpID0+IHtcbiAgICAgIGNvbnN0IG1vbnRoWWVhclBvaW50ID0gZ2V0VGltZShtb250aFllYXIpO1xuICAgICAgY29uc3QgaXNTYW1lTW9udGhZZWFyID1cbiAgICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcikgJiZcbiAgICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBtb250aFllYXIpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgIGlzU2FtZU1vbnRoWWVhclxuICAgICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkX21vbnRoLXllYXJcIlxuICAgICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb25cIlxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e21vbnRoWWVhclBvaW50fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBtb250aFllYXJQb2ludCl9XG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTYW1lTW9udGhZZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNTYW1lTW9udGhZZWFyID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgIOKck1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShtb250aFllYXIsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoWWVhcik7XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfT57dGhpcy5yZW5kZXJPcHRpb25zKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9uc1wiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuaW1wb3J0IHtcbiAgYWRkTW9udGhzLFxuICBmb3JtYXREYXRlLFxuICBnZXRTdGFydE9mTW9udGgsXG4gIGlzQWZ0ZXIsXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBuZXdEYXRlLFxuICBnZXRUaW1lLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbnZhciBXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhZZWFyRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJvcGRvd25WaXNpYmxlOiBmYWxzZSxcbiAgfTtcblxuICByZW5kZXJTZWxlY3RPcHRpb25zID0gKCkgPT4ge1xuICAgIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgIGNvbnN0IGxhc3REYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICAgIGNvbnN0IHRpbWVQb2ludCA9IGdldFRpbWUoY3VyckRhdGUpO1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17dGltZVBvaW50fSB2YWx1ZT17dGltZVBvaW50fT5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShjdXJyRGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG5cbiAgICAgIGN1cnJEYXRlID0gYWRkTW9udGhzKGN1cnJEYXRlLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICBvblNlbGVjdENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0TW9kZSA9ICgpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17Z2V0VGltZShnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXRlKSl9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4ge1xuICAgIGNvbnN0IHllYXJNb250aCA9IGZvcm1hdERhdGUoXG4gICAgICB0aGlzLnByb3BzLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PVwicmVhZFwiXG4gICAgICAgIHN0eWxlPXt7IHZpc2liaWxpdHk6IHZpc2libGUgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXdcIlxuICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aC15ZWFyXCI+XG4gICAgICAgICAge3llYXJNb250aH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEcm9wZG93biA9ICgpID0+IChcbiAgICA8V3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyUG9pbnQpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICBjb25zdCBjaGFuZ2VkRGF0ZSA9IG5ld0RhdGUocGFyc2VJbnQobW9udGhZZWFyUG9pbnQpKTtcblxuICAgIGlmIChcbiAgICAgIGlzU2FtZVllYXIodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSkgJiZcbiAgICAgIGlzU2FtZU1vbnRoKHRoaXMucHJvcHMuZGF0ZSwgY2hhbmdlZERhdGUpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHtcbiAgZ2V0RGF5LFxuICBnZXRNb250aCxcbiAgZ2V0RGF0ZSxcbiAgbmV3RGF0ZSxcbiAgaXNTYW1lRGF5LFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUV4Y2x1ZGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGlzRXF1YWwsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBnZXREYXlPZldlZWtDb2RlLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZm9ybWF0RGF0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbk1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KHByZXZQcm9wcyk7XG4gIH1cblxuICBkYXlFbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VFbnRlcihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9IChvdGhlcikgPT4gaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF5LCBvdGhlcik7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTZWxlY3RlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+IHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpKVxuICAgICAgOiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcblxuICAgIHJldHVybiAhaXNTZWxlY3RlZERhdGUgJiYgdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICB9O1xuXG4gIGlzRGlzYWJsZWQgPSAoKSA9PiBpc0RheURpc2FibGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKCkgPT4gaXNEYXlFeGNsdWRlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNTdGFydE9mV2VlayA9ICgpID0+XG4gICAgaXNTYW1lRGF5KFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lV2VlayA9IChvdGhlcikgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgaXNTYW1lRGF5KFxuICAgICAgb3RoZXIsXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lRGF5T3JXZWVrID0gKG90aGVyKSA9PiB0aGlzLmlzU2FtZURheShvdGhlcikgfHwgdGhpcy5pc1NhbWVXZWVrKG90aGVyKTtcblxuICBnZXRIaWdoTGlnaHRlZENsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBoaWdobGlnaHREYXRlcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7J2RheSBzdHJpbmcsICdjbGFzc05hbWUnfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgcmV0dXJuIGhpZ2hsaWdodERhdGVzLmdldChkYXlTdHIpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJldHVybiB0aGUgYXJyYXkgY29udGFpbmluZyBjbGFzc25hbWUgYXNzb2NpYXRlZCB0byB0aGUgZGF0ZVxuICBnZXRIb2xpZGF5c0NsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhvbGlkYXlzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2Yge2RheSBzdHJpbmc6IHtjbGFzc05hbWUsIGhvbGlkYXlOYW1lfX1cbiAgICBpZiAoaG9saWRheXMuaGFzKGRheVN0cikpIHtcbiAgICAgIHJldHVybiBbaG9saWRheXMuZ2V0KGRheVN0cikuY2xhc3NOYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblJhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhc2VsZWN0aW5nRGF0ZSB8fFxuICAgICAgKCFzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSAmJiB0aGlzLmlzRGlzYWJsZWQoKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzU3RhcnQgJiZcbiAgICAgIGVuZERhdGUgJiZcbiAgICAgIChpc0JlZm9yZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNFbmQgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzUmFuZ2UgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgIWVuZERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShzdGFydERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoZW5kRGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1dlZWtlbmQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla2RheSA9IGdldERheSh0aGlzLnByb3BzLmRheSk7XG4gICAgcmV0dXJuIHdlZWtkYXkgPT09IDAgfHwgd2Vla2RheSA9PT0gNjtcbiAgfTtcblxuICBpc0FmdGVyTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKHRoaXMucHJvcHMubW9udGggKyAxKSAlIDEyID09PSBnZXRNb250aCh0aGlzLnByb3BzLmRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQmVmb3JlTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KSArIDEpICUgMTIgPT09IHRoaXMucHJvcHMubW9udGhcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudERheSA9ICgpID0+IHRoaXMuaXNTYW1lRGF5KG5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+XG4gICAgICAgIHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lXG4gICAgICA/IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lKGRhdGUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIsXG4gICAgICBkYXlDbGFzc05hbWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tXCIgKyBnZXREYXlPZldlZWtDb2RlKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWRpc2FibGVkXCI6IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZXhjbHVkZWRcIjogdGhpcy5pc0V4Y2x1ZGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXNlbGVjdGluZy1yYW5nZVwiOiB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50RGF5KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS13ZWVrZW5kXCI6IHRoaXMuaXNXZWVrZW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1vdXRzaWRlLW1vbnRoXCI6XG4gICAgICAgICAgdGhpcy5pc0FmdGVyTW9udGgoKSB8fCB0aGlzLmlzQmVmb3JlTW9udGgoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmdldEhpZ2hMaWdodGVkQ2xhc3MoXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhpZ2hsaWdodGVkXCIpLFxuICAgICAgdGhpcy5nZXRIb2xpZGF5c0NsYXNzKCksXG4gICAgKTtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQgPSBcIkNob29zZVwiLFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKCkgfHwgdGhpcy5pc0V4Y2x1ZGVkKClcbiAgICAgICAgPyBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWRcbiAgICAgICAgOiBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7Zm9ybWF0RGF0ZShkYXksIFwiUFBQUFwiLCB0aGlzLnByb3BzLmxvY2FsZSl9YDtcbiAgfTtcblxuICAvLyBBIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgaG9saWRheSdzIG5hbWUgYXMgdGl0bGUncyBjb250ZW50XG4gIGdldFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyA9IG5ldyBNYXAoKSwgZXhjbHVkZURhdGVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbXBhcmVEdCA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgdGl0bGVzID0gW107XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhjb21wYXJlRHQpKSB7XG4gICAgICB0aXRsZXMucHVzaCguLi5ob2xpZGF5cy5nZXQoY29tcGFyZUR0KS5ob2xpZGF5TmFtZXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0V4Y2x1ZGVkKCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKFxuICAgICAgICBleGNsdWRlRGF0ZXNcbiAgICAgICAgICA/LmZpbHRlcigoZXhjbHVkZURhdGUpID0+XG4gICAgICAgICAgICBpc1NhbWVEYXkoZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSwgZGF5KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLm1hcCgoZXhjbHVkZURhdGUpID0+IGV4Y2x1ZGVEYXRlLm1lc3NhZ2UpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlcy5qb2luKFwiLCBcIik7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAoc2VsZWN0ZWQsIHByZVNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gc2VsZWN0ZWQgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZDtcbiAgICBjb25zdCBwcmVTZWxlY3Rpb25EYXkgPSBwcmVTZWxlY3Rpb24gfHwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIShcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgICAgICAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlciB8fCAhdGhpcy5pc1N0YXJ0T2ZXZWVrKCkpXG4gICAgICApICYmXG4gICAgICAodGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSB8fFxuICAgICAgICAodGhpcy5pc1NhbWVEYXkoc2VsZWN0ZWREYXkpICYmXG4gICAgICAgICAgaXNTYW1lRGF5KHByZVNlbGVjdGlvbkRheSwgc2VsZWN0ZWREYXkpKSlcbiAgICAgICAgPyAwXG4gICAgICAgIDogLTE7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIGRheVxuICAvLyBmb2N1cyB0aGUgZGF5IG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNEYXkgPSAocHJldlByb3BzID0ge30pID0+IHtcbiAgICBsZXQgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgdGhpcy5pc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGUgYWN0aXZlRWxlbWVudCBpcyBpbiB0aGUgY29udGFpbmVyLCBhbmQgaXQgaXMgYW5vdGhlciBpbnN0YW5jZSBvZiBEYXlcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIpXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy9kYXkgaXMgb25lIG9mIHRoZSBub24gcmVuZGVyZWQgZHVwbGljYXRlIGRheXNcbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c0RheSAmJiB0aGlzLmRheUVsLmN1cnJlbnQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW5kZXJEYXlDb250ZW50cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzXG4gICAgICA/IHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHMoZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSksIHRoaXMucHJvcHMuZGF5KVxuICAgICAgOiBnZXREYXRlKHRoaXMucHJvcHMuZGF5KTtcbiAgfTtcblxuICByZW5kZXIgPSAoKSA9PiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt0aGlzLmRheUVsfVxuICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXModGhpcy5wcm9wcy5kYXkpfVxuICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbCgpfVxuICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICB0aXRsZT17dGhpcy5nZXRUaXRsZSgpfVxuICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc0Rpc2FibGVkKCl9XG4gICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50RGF5KCkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZCgpIHx8IHRoaXMuaXNJblJhbmdlKCl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyRGF5Q29udGVudHMoKX1cbiAgICAgIHt0aGlzLmdldFRpdGxlKCkgIT09IFwiXCIgJiYgKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvdmVybGF5XCI+e3RoaXMuZ2V0VGl0bGUoKX08L3NwYW4+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWtOdW1iZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJpYUxhYmVsUHJlZml4OiBcIndlZWsgXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2Vla051bWJlcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudCkgfSksXG4gICAgXSksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c1dlZWtOdW1iZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcihwcmV2UHJvcHMpO1xuICB9XG5cbiAgd2Vla051bWJlckVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIGdldFRhYkluZGV4ID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlciAmJlxuICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAoaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCB0aGlzLnByb3BzLnNlbGVjdGVkKSkpXG4gICAgICA/IDBcbiAgICAgIDogLTE7XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIHdlZWstbnVtYmVyXG4gIC8vIGZvY3VzIHRoZSB3ZWVrLW51bWJlciBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzV2Vla051bWJlciA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIFdlZWtOdW1iZXJcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHdlZWtOdW1iZXIsIGFyaWFMYWJlbFByZWZpeCA9IFwid2VlayBcIiwgb25DbGljayB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tY2xpY2thYmxlXCI6ICEhb25DbGljayxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLXNlbGVjdGVkXCI6XG4gICAgICAgICEhb25DbGljayAmJiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3RoaXMud2Vla051bWJlckVsfVxuICAgICAgICBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHthcmlhTGFiZWxQcmVmaXh9ICR7dGhpcy5wcm9wcy53ZWVrTnVtYmVyfWB9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICA+XG4gICAgICAgIHt3ZWVrTnVtYmVyfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IERheSBmcm9tIFwiLi9kYXlcIjtcbmltcG9ydCBXZWVrTnVtYmVyIGZyb20gXCIuL3dlZWtfbnVtYmVyXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuaW1wb3J0IHsgYWRkRGF5cywgZ2V0V2VlaywgZ2V0U3RhcnRPZldlZWssIGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VlayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgIH07XG4gIH1cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlV2Vla0NsaWNrID0gKGRheSwgd2Vla051bWJlciwgZXZlbnQpID0+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25XZWVrU2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0KGRheSwgd2Vla051bWJlciwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgdGhpcy5oYW5kbGVEYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0V2Vla051bWJlciA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcihkYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFdlZWsoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyRGF5cyA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IHRoaXMuc3RhcnRPZldlZWsoKTtcbiAgICBjb25zdCBkYXlzID0gW107XG4gICAgY29uc3Qgd2Vla051bWJlciA9IHRoaXMuZm9ybWF0V2Vla051bWJlcihzdGFydE9mV2Vlayk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2tBY3Rpb24gPVxuICAgICAgICB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICAgICAgPyB0aGlzLmhhbmRsZVdlZWtDbGljay5iaW5kKHRoaXMsIHN0YXJ0T2ZXZWVrLCB3ZWVrTnVtYmVyKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgZGF5cy5wdXNoKFxuICAgICAgICA8V2Vla051bWJlclxuICAgICAgICAgIGtleT1cIldcIlxuICAgICAgICAgIHdlZWtOdW1iZXI9e3dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGF0ZT17c3RhcnRPZldlZWt9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja0FjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5hcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAvPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxEYXlcbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkPXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGtleT17ZGF5LnZhbHVlT2YoKX1cbiAgICAgICAgICAgIGRheT17ZGF5fVxuICAgICAgICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlci5iaW5kKHRoaXMsIGRheSl9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBzdGFydE9mV2VlayA9ICgpID0+XG4gICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT5cbiAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICFpc1NhbWVEYXkodGhpcy5zdGFydE9mV2VlaygpLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgIGlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtcIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay0tc2VsZWN0ZWRcIjogaXNTYW1lRGF5KFxuICAgICAgICB0aGlzLnN0YXJ0T2ZXZWVrKCksXG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICApLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1rZXlib2FyZC1zZWxlY3RlZFwiOiB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbHN4KHdlZWtOdW1iZXJDbGFzc2VzKX0+e3RoaXMucmVuZGVyRGF5cygpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgV2VlayBmcm9tIFwiLi93ZWVrXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IEZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UID0gNjtcblxuY29uc3QgTU9OVEhfQ09MVU1OU19MQVlPVVQgPSB7XG4gIFRXT19DT0xVTU5TOiBcInR3b19jb2x1bW5zXCIsXG4gIFRIUkVFX0NPTFVNTlM6IFwidGhyZWVfY29sdW1uc1wiLFxuICBGT1VSX0NPTFVNTlM6IFwiZm91cl9jb2x1bW5zXCIsXG59O1xuY29uc3QgTU9OVEhfQ09MVU1OUyA9IHtcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULlRXT19DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxXSxcbiAgICAgIFsyLCAzXSxcbiAgICAgIFs0LCA1XSxcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs4LCA5XSxcbiAgICAgIFsxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAyLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVEhSRUVfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMl0sXG4gICAgICBbMywgNCwgNV0sXG4gICAgICBbNiwgNywgOF0sXG4gICAgICBbOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogMyxcbiAgfSxcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMiwgM10sXG4gICAgICBbNCwgNSwgNiwgN10sXG4gICAgICBbOCwgOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogNCxcbiAgfSxcbn07XG5jb25zdCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUID0gMTtcblxuZnVuY3Rpb24gZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbikge1xuICBpZiAoc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5GT1VSX0NPTFVNTlM7XG4gIGlmIChzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyKSByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlM7XG4gIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9yZGVySW5EaXNwbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBNT05USF9SRUZTID0gWy4uLkFycmF5KDEyKV0ubWFwKCgpID0+IFJlYWN0LmNyZWF0ZVJlZigpKTtcbiAgUVVBUlRFUl9SRUZTID0gWy4uLkFycmF5KDQpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50LCB0aGlzLnByb3BzLm9yZGVySW5EaXNwbGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlU3RhcnRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlRW5kTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKHV0aWxzLnNldE1vbnRoKGRheSwgbSksIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8ICFzZWxlY3RpbmdEYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0ID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCA9IChtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNXZWVrSW5Nb250aCA9IChzdGFydE9mV2VlaykgPT4ge1xuICAgIGNvbnN0IGRheSA9IHRoaXMucHJvcHMuZGF5O1xuICAgIGNvbnN0IGVuZE9mV2VlayA9IHV0aWxzLmFkZERheXMoc3RhcnRPZldlZWssIDYpO1xuICAgIHJldHVybiAoXG4gICAgICB1dGlscy5pc1NhbWVNb250aChzdGFydE9mV2VlaywgZGF5KSB8fCB1dGlscy5pc1NhbWVNb250aChlbmRPZldlZWssIGRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudE1vbnRoID0gKGRheSwgbSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIG0gPT09IHV0aWxzLmdldE1vbnRoKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNDdXJyZW50UXVhcnRlciA9IChkYXksIHEpID0+XG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHV0aWxzLm5ld0RhdGUoKSkgJiZcbiAgICBxID09PSB1dGlscy5nZXRRdWFydGVyKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZE1vbnRoID0gKGRheSwgbSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0TW9udGgoc2VsZWN0ZWQpID09PSBtICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICBpc1NlbGVjdGVkUXVhcnRlciA9IChkYXksIHEsIHNlbGVjdGVkKSA9PlxuICAgIHV0aWxzLmdldFF1YXJ0ZXIoZGF5KSA9PT0gcSAmJlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcihzZWxlY3RlZCk7XG5cbiAgcmVuZGVyV2Vla3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla3MgPSBbXTtcbiAgICB2YXIgaXNGaXhlZEhlaWdodCA9IHRoaXMucHJvcHMuZml4ZWRIZWlnaHQ7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IGZhbHNlO1xuICAgIGxldCBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICB1dGlscy5nZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXkpLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkO1xuXG4gICAgY29uc3QgcHJlU2VsZWN0aW9uID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgd2Vla3MucHVzaChcbiAgICAgICAgPFdlZWtcbiAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBkYXk9e2N1cnJlbnRXZWVrU3RhcnR9XG4gICAgICAgICAgbW9udGg9e3V0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMuZGF5KX1cbiAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgcHJlU2VsZWN0aW9uPXtwcmVTZWxlY3Rpb259XG4gICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgLz4sXG4gICAgICApO1xuXG4gICAgICBpZiAoYnJlYWtBZnRlck5leHRQdXNoKSBicmVhaztcblxuICAgICAgaSsrO1xuICAgICAgY3VycmVudFdlZWtTdGFydCA9IHV0aWxzLmFkZFdlZWtzKGN1cnJlbnRXZWVrU3RhcnQsIDEpO1xuXG4gICAgICAvLyBJZiBvbmUgb2YgdGhlc2UgY29uZGl0aW9ucyBpcyB0cnVlLCB3ZSB3aWxsIGVpdGhlciBicmVhayBvbiB0aGlzIHdlZWtcbiAgICAgIC8vIG9yIGJyZWFrIG9uIHRoZSBuZXh0IHdlZWtcbiAgICAgIGNvbnN0IGlzRml4ZWRBbmRGaW5hbFdlZWsgPVxuICAgICAgICBpc0ZpeGVkSGVpZ2h0ICYmIGkgPj0gRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQ7XG4gICAgICBjb25zdCBpc05vbkZpeGVkQW5kT3V0T2ZNb250aCA9XG4gICAgICAgICFpc0ZpeGVkSGVpZ2h0ICYmICF0aGlzLmlzV2Vla0luTW9udGgoY3VycmVudFdlZWtTdGFydCk7XG5cbiAgICAgIGlmIChpc0ZpeGVkQW5kRmluYWxXZWVrIHx8IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBlZWtOZXh0TW9udGgpIHtcbiAgICAgICAgICBicmVha0FmdGVyTmV4dFB1c2ggPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlZWtzO1xuICB9O1xuXG4gIG9uTW9udGhDbGljayA9IChlLCBtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlDbGljayh1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25Nb250aE1vdXNlRW50ZXIgPSAobSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKHRoaXMucHJvcHMuZGF5LCBtKTtcblxuICAgIGlmICh1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhOYXZpZ2F0aW9uID0gKG5ld01vbnRoLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLk1PTlRIX1JFRlNbbmV3TW9udGhdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIG9uTW9udGhLZXlEb3duID0gKGV2ZW50LCBtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24sXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzZXRQcmVTZWxlY3Rpb24sXG4gICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgIT09IFwiVGFiXCIpIHtcbiAgICAgIC8vIHByZXZlbnREZWZhdWx0IG9uIHRhYiBldmVudCBibG9ja3MgZm9jdXMgY2hhbmdlXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBtb250aENvbHVtbnNMYXlvdXQgPSBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0ID1cbiAgICAgICAgTU9OVEhfQ09MVU1OU1ttb250aENvbHVtbnNMYXlvdXRdLnZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDtcbiAgICAgIGNvbnN0IG1vbnRoc0dyaWQgPSBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0uZ3JpZDtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vbk1vbnRoQ2xpY2soZXZlbnQsIG1vbnRoKTtcbiAgICAgICAgICBzZXRQcmVTZWxlY3Rpb24oc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDExID8gMCA6IG1vbnRoICsgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG1vbnRoID09PSAwID8gMTEgOiBtb250aCAtIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGZpcnN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFswXS5pbmNsdWRlcyhtb250aClcbiAgICAgICAgICAgICAgPyBtb250aCArIDEyIC0gdmVydGljYWxPZmZzZXRcbiAgICAgICAgICAgICAgOiBtb250aCAtIHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgdXRpbHMuc3ViTW9udGhzKHByZVNlbGVjdGlvbiwgdmVydGljYWxPZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1vbnRoIG9uIHRoZSBsYXN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFttb250aHNHcmlkLmxlbmd0aCAtIDFdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoIC0gMTIgKyB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoICsgdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5hZGRNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbk1vbnRoS2V5RG93biAmJiBoYW5kbGVPbk1vbnRoS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgb25RdWFydGVyQ2xpY2sgPSAoZSwgcSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZRdWFydGVyKGxhYmVsRGF0ZSksIGUpO1xuICB9O1xuXG4gIG9uUXVhcnRlck1vdXNlRW50ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlUXVhcnRlck5hdmlnYXRpb24gPSAobmV3UXVhcnRlciwgbmV3RGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG4gICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuUVVBUlRFUl9SRUZTW25ld1F1YXJ0ZXIgLSAxXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25RdWFydGVyS2V5RG93biA9IChldmVudCwgcXVhcnRlcikgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2ZW50LCBxdWFydGVyKTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gNCA/IDEgOiBxdWFydGVyICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVRdWFydGVyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHF1YXJ0ZXIgPT09IDEgPyA0IDogcXVhcnRlciAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJRdWFydGVycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZ2V0TW9udGhDbGFzc05hbWVzID0gKG0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIG1vbnRoQ2xhc3NOYW1lLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aENsYXNzTmFtZSA9IG1vbnRoQ2xhc3NOYW1lXG4gICAgICA/IG1vbnRoQ2xhc3NOYW1lKHV0aWxzLnNldE1vbnRoKGRheSwgbSkpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtJHttfWAsXG4gICAgICBfbW9udGhDbGFzc05hbWUsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMpICYmXG4gICAgICAgICAgdXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkTW9udGgoXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIG0sXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzTW9udGhJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIG0sXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0TW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZE1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChtKSA9PiB7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWRNb250aCA9IHV0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBtID09PSBwcmVTZWxlY3RlZE1vbnRoXG4gICAgICAgID8gXCIwXCJcbiAgICAgICAgOiBcIi0xXCI7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgZ2V0UXVhcnRlclRhYkluZGV4ID0gKHEpID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBxID09PSBwcmVTZWxlY3RlZFF1YXJ0ZXJcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAobW9udGgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXggPSBcIkNob29zZVwiLFxuICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXggPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICAgIGRheSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbW9udGgpO1xuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQobGFiZWxEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobGFiZWxEYXRlKVxuICAgICAgICA/IGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4XG4gICAgICAgIDogY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4O1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHt1dGlscy5mb3JtYXREYXRlKGxhYmVsRGF0ZSwgXCJNTU1NIHl5eXlcIil9YDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ2xhc3NOYW1lcyA9IChxKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci0ke3F9YCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZCh1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgcSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHByZVNlbGVjdGlvbiksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1yYW5nZVwiOiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIHEsXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzUmFuZ2VTdGFydFF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kUXVhcnRlcihxKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRNb250aENvbnRlbnQgPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd0Z1bGxNb250aFllYXJQaWNrZXIsIHJlbmRlck1vbnRoQ29udGVudCwgbG9jYWxlLCBkYXkgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0TW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhTaG9ydEluTG9jYWxlKG0sIGxvY2FsZSk7XG4gICAgY29uc3QgZnVsbE1vbnRoVGV4dCA9IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBpZiAocmVuZGVyTW9udGhDb250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTW9udGhDb250ZW50KG0sIHNob3J0TW9udGhUZXh0LCBmdWxsTW9udGhUZXh0LCBkYXkpO1xuICAgIH1cbiAgICByZXR1cm4gc2hvd0Z1bGxNb250aFllYXJQaWNrZXIgPyBmdWxsTW9udGhUZXh0IDogc2hvcnRNb250aFRleHQ7XG4gIH07XG5cbiAgZ2V0UXVhcnRlckNvbnRlbnQgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgcmVuZGVyUXVhcnRlckNvbnRlbnQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG9ydFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxLCBsb2NhbGUpO1xuICAgIHJldHVybiByZW5kZXJRdWFydGVyQ29udGVudFxuICAgICAgPyByZW5kZXJRdWFydGVyQ29udGVudChxLCBzaG9ydFF1YXJ0ZXIpXG4gICAgICA6IHNob3J0UXVhcnRlcjtcbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgc2VsZWN0ZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtb250aENvbHVtbnMgPVxuICAgICAgTU9OVEhfQ09MVU1OU1tcbiAgICAgICAgZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIClcbiAgICAgIF0uZ3JpZDtcbiAgICByZXR1cm4gbW9udGhDb2x1bW5zLm1hcCgobW9udGgsIGkpID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtd3JhcHBlclwiIGtleT17aX0+XG4gICAgICAgIHttb250aC5tYXAoKG0sIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3RoaXMuTU9OVEhfUkVGU1ttXX1cbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoS2V5RG93bihldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uTW9udGhNb3VzZUVudGVyKG0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgobSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0TW9udGhDbGFzc05hbWVzKG0pfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbChtKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChkYXksIG0sIHNlbGVjdGVkKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRNb250aENvbnRlbnQobSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyUXVhcnRlcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdGVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHF1YXJ0ZXJzID0gWzEsIDIsIDMsIDRdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItd3JhcHBlclwiPlxuICAgICAgICB7cXVhcnRlcnMubWFwKChxLCBqKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgcmVmPXt0aGlzLlFVQVJURVJfUkVGU1tqXX1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXYsIHEpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyS2V5RG93bihldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vblF1YXJ0ZXJNb3VzZUVudGVyKHEpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRRdWFydGVyQ2xhc3NOYW1lcyhxKX1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoZGF5LCBxLCBzZWxlY3RlZCl9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRRdWFydGVyVGFiSW5kZXgocSl9XG4gICAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50UXVhcnRlcihkYXksIHEpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuZ2V0UXVhcnRlckNvbnRlbnQocSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBnZXRDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGluZ0RhdGUsXG4gICAgICBzZWxlY3RzU3RhcnQsXG4gICAgICBzZWxlY3RzRW5kLFxuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIHNob3dXZWVrUGlja2VyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoXCIsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kKSxcbiAgICAgIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhQaWNrZXJcIjogc2hvd01vbnRoWWVhclBpY2tlciB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXJQaWNrZXJcIjogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1BpY2tlclwiOiBzaG93V2Vla1BpY2tlciB9LFxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXggPSBcIk1vbnRoIFwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4ID0gYXJpYUxhYmVsUHJlZml4XG4gICAgICA/IGFyaWFMYWJlbFByZWZpeC50cmltKCkgKyBcIiBcIlxuICAgICAgOiBcIlwiO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHtmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXh9JHt1dGlscy5mb3JtYXREYXRlKGRheSwgXCJNTU1NLCB5eXl5XCIpfWB9XG4gICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgID5cbiAgICAgICAge3Nob3dNb250aFllYXJQaWNrZXJcbiAgICAgICAgICA/IHRoaXMucmVuZGVyTW9udGhzKClcbiAgICAgICAgICA6IHNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgICAgPyB0aGlzLnJlbmRlclF1YXJ0ZXJzKClcbiAgICAgICAgICAgIDogdGhpcy5yZW5kZXJXZWVrcygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHtcbiAgZ2V0SG91cnMsXG4gIGdldE1pbnV0ZXMsXG4gIG5ld0RhdGUsXG4gIGdldFN0YXJ0T2ZEYXksXG4gIGFkZE1pbnV0ZXMsXG4gIGZvcm1hdERhdGUsXG4gIGlzVGltZUluRGlzYWJsZWRSYW5nZSxcbiAgaXNUaW1lRGlzYWJsZWQsXG4gIHRpbWVzVG9JbmplY3RBZnRlcixcbiAgZ2V0SG91cnNJbkRheSxcbiAgaXNTYW1lTWludXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJ2YWxzOiAzMCxcbiAgICAgIG9uVGltZUNoYW5nZTogKCkgPT4ge30sXG4gICAgICB0b2RheUJ1dHRvbjogbnVsbCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNhbGNDZW50ZXJQb3NpdGlvbiA9IChsaXN0SGVpZ2h0LCBjZW50ZXJMaVJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICBjZW50ZXJMaVJlZi5vZmZzZXRUb3AgLSAobGlzdEhlaWdodCAvIDIgLSBjZW50ZXJMaVJlZi5jbGllbnRIZWlnaHQgLyAyKVxuICAgICk7XG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1vbnRoUmVmOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGhlaWdodDogbnVsbCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBjb2RlIHRvIGVuc3VyZSBzZWxlY3RlZCB0aW1lIHdpbGwgYWx3YXlzIGJlIGluIGZvY3VzIHdpdGhpbiB0aW1lIHdpbmRvdyB3aGVuIGl0IGZpcnN0IGFwcGVhcnNcbiAgICB0aGlzLnNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lKCk7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhSZWYgJiYgdGhpcy5oZWFkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMubW9udGhSZWYuY2xpZW50SGVpZ2h0IC0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUgPSAoKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5saXN0KSByZXR1cm47XG5cbiAgICAgIHRoaXMubGlzdC5zY3JvbGxUb3AgPVxuICAgICAgICB0aGlzLmNlbnRlckxpICYmXG4gICAgICAgIFRpbWUuY2FsY0NlbnRlclBvc2l0aW9uKFxuICAgICAgICAgIHRoaXMucHJvcHMubW9udGhSZWZcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5saXN0LmNsaWVudEhlaWdodCxcbiAgICAgICAgICB0aGlzLmNlbnRlckxpLFxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrID0gKHRpbWUpID0+IHtcbiAgICBpZiAoXG4gICAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICAgIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB0aGlzLnByb3BzKSkgfHxcbiAgICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJUaW1lKSAmJlxuICAgICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aW1lKTtcbiAgfTtcblxuICBpc1NlbGVjdGVkVGltZSA9ICh0aW1lKSA9PlxuICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiYgaXNTYW1lTWludXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRpbWUpO1xuXG4gIGlzRGlzYWJsZWRUaW1lID0gKHRpbWUpID0+XG4gICAgKCh0aGlzLnByb3BzLm1pblRpbWUgfHwgdGhpcy5wcm9wcy5tYXhUaW1lKSAmJlxuICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuaW5jbHVkZVRpbWVzIHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSk7XG5cbiAgbGlDbGFzc2VzID0gKHRpbWUpID0+IHtcbiAgICBsZXQgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW1cIixcbiAgICAgIHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSA/IHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSh0aW1lKSA6IHVuZGVmaW5lZCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWRpc2FibGVkXCIpO1xuICAgIH1cblxuICAgIC8vY29udmVydCB0aGlzLnByb3BzLmludGVydmFscyBhbmQgdGhlIHJlbGV2YW50IHRpbWUgdG8gc2Vjb25kcyBhbmQgY2hlY2sgaWYgaXQgaXQncyBhIGNsZWFuIG11bHRpcGxlIG9mIHRoZSBpbnRlcnZhbFxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuaW5qZWN0VGltZXMgJiZcbiAgICAgIChnZXRIb3Vycyh0aW1lKSAqIDM2MDAgKyBnZXRNaW51dGVzKHRpbWUpICogNjAgKyBnZXRTZWNvbmRzKHRpbWUpKSAlXG4gICAgICAgICh0aGlzLnByb3BzLmludGVydmFscyAqIDYwKSAhPT1cbiAgICAgICAgMFxuICAgICkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWluamVjdGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCwgdGltZSkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZy5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgdGhpcy5oYW5kbGVDbGljayh0aW1lKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVzID0gKCkgPT4ge1xuICAgIGxldCB0aW1lcyA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMucHJvcHMuZm9ybWF0ID8gdGhpcy5wcm9wcy5mb3JtYXQgOiBcInBcIjtcbiAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLnByb3BzLmludGVydmFscztcblxuICAgIGNvbnN0IGFjdGl2ZURhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCB8fCB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgfHwgbmV3RGF0ZSgpO1xuXG4gICAgY29uc3QgYmFzZSA9IGdldFN0YXJ0T2ZEYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3Qgc29ydGVkSW5qZWN0VGltZXMgPVxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgbWludXRlc0luRGF5ID0gNjAgKiBnZXRIb3Vyc0luRGF5KGFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBtaW51dGVzSW5EYXkgLyBpbnRlcnZhbHM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11bHRpcGxpZXI7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBhZGRNaW51dGVzKGJhc2UsIGkgKiBpbnRlcnZhbHMpO1xuICAgICAgdGltZXMucHVzaChjdXJyZW50VGltZSk7XG5cbiAgICAgIGlmIChzb3J0ZWRJbmplY3RUaW1lcykge1xuICAgICAgICBjb25zdCB0aW1lc1RvSW5qZWN0ID0gdGltZXNUb0luamVjdEFmdGVyKFxuICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgY3VycmVudFRpbWUsXG4gICAgICAgICAgaSxcbiAgICAgICAgICBpbnRlcnZhbHMsXG4gICAgICAgICAgc29ydGVkSW5qZWN0VGltZXMsXG4gICAgICAgICk7XG4gICAgICAgIHRpbWVzID0gdGltZXMuY29uY2F0KHRpbWVzVG9JbmplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSB3aGljaCB0aW1lIHRvIGZvY3VzIGFuZCBzY3JvbGwgaW50byB2aWV3IHdoZW4gY29tcG9uZW50IG1vdW50c1xuICAgIGNvbnN0IHRpbWVUb0ZvY3VzID0gdGltZXMucmVkdWNlKChwcmV2LCB0aW1lKSA9PiB7XG4gICAgICBpZiAodGltZS5nZXRUaW1lKCkgPD0gYWN0aXZlRGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aW1lc1swXSk7XG5cbiAgICByZXR1cm4gdGltZXMubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGlcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRpbWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5saUNsYXNzZXModGltZSl9XG4gICAgICAgICAgcmVmPXsobGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lID09PSB0aW1lVG9Gb2N1cykge1xuICAgICAgICAgICAgICB0aGlzLmNlbnRlckxpID0gbGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPbktleURvd24oZXYsIHRpbWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RpbWUgPT09IHRpbWVUb0ZvY3VzID8gMCA6IC0xfVxuICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZSh0aW1lLCBmb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXIgJHtcbiAgICAgICAgICB0aGlzLnByb3BzLnRvZGF5QnV0dG9uXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXItLXdpdGgtdG9kYXktYnV0dG9uXCJcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUgJHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUtLW9ubHlcIlxuICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICB9YH1cbiAgICAgICAgICByZWY9eyhoZWFkZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faGVhZGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1ib3hcIj5cbiAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3RcIlxuICAgICAgICAgICAgICByZWY9eyhsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgc3R5bGU9e2hlaWdodCA/IHsgaGVpZ2h0IH0gOiB7fX1cbiAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lcygpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBuZXdEYXRlIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNsZWFyU2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBZRUFSX1JFRlMgPSBbLi4uQXJyYXkodGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcildLm1hcCgoKSA9PlxuICAgIFJlYWN0LmNyZWF0ZVJlZigpLFxuICApO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgc2VsZWN0aW5nRGF0ZSA9ICgpID0+IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICB1cGRhdGVGb2N1c09uUGFnaW5hdGUgPSAocmVmSW5kZXgpID0+IHtcbiAgICBjb25zdCB3YWl0Rm9yUmVSZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLllFQVJfUkVGU1tyZWZJbmRleF0uY3VycmVudC5mb2N1cygpO1xuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUod2FpdEZvclJlUmVuZGVyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyQ2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlWWVhck5hdmlnYXRpb24gPSAobmV3WWVhciwgbmV3RGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoZGF0ZSwgeWVhckl0ZW1OdW1iZXIpO1xuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcblxuICAgIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IC0xKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSh5ZWFySXRlbU51bWJlciAtIDEpO1xuICAgIH0gZWxzZSBpZiAobmV3WWVhciAtIHN0YXJ0UGVyaW9kID09PSB5ZWFySXRlbU51bWJlcikge1xuICAgICAgdGhpcy51cGRhdGVGb2N1c09uUGFnaW5hdGUoMCk7XG4gICAgfSBlbHNlIHRoaXMuWUVBUl9SRUZTW25ld1llYXIgLSBzdGFydFBlcmlvZF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9ICh5LCBvdGhlcikgPT4gdXRpbHMuaXNTYW1lRGF5KHksIG90aGVyKTtcblxuICBpc0N1cnJlbnRZZWFyID0gKHkpID0+IHkgPT09IGdldFllYXIobmV3RGF0ZSgpKTtcblxuICBpc1JhbmdlU3RhcnQgPSAoeSkgPT5cbiAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSAmJlxuICAgIHRoaXMucHJvcHMuZW5kRGF0ZSAmJlxuICAgIHV0aWxzLmlzU2FtZVllYXIodXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpLCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSk7XG5cbiAgaXNSYW5nZUVuZCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuZW5kRGF0ZSk7XG5cbiAgaXNJblJhbmdlID0gKHkpID0+XG4gICAgdXRpbHMuaXNZZWFySW5SYW5nZSh5LCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICF0aGlzLnNlbGVjdGluZ0RhdGUoKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMuc2VsZWN0aW5nRGF0ZSgpLCBlbmREYXRlKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCBzdGFydERhdGUsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKHkpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICh5KSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIodGhpcy5wcm9wcy5kYXRlLCB5KSk7XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5zZWxlY3RlZCkpICYmXG4gICAgICB1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pKVxuICAgICk7XG4gIH07XG5cbiAgb25ZZWFyQ2xpY2sgPSAoZSwgeSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLmhhbmRsZVllYXJDbGljayh1dGlscy5nZXRTdGFydE9mWWVhcih1dGlscy5zZXRZZWFyKGRhdGUsIHkpKSwgZSk7XG4gIH07XG5cbiAgb25ZZWFyS2V5RG93biA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBrZXkgfSA9IGU7XG4gICAgY29uc3QgeyBoYW5kbGVPbktleURvd24gfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25ZZWFyQ2xpY2soZSwgeSk7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHkgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbktleURvd24gJiYgaGFuZGxlT25LZXlEb3duKGUpO1xuICB9O1xuXG4gIGdldFllYXJDbGFzc05hbWVzID0gKHkpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRlLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICAgIGluY2x1ZGVEYXRlcyxcbiAgICAgIGZpbHRlckRhdGUsXG4gICAgICB5ZWFyQ2xhc3NOYW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dFwiLFxuICAgICAgYHJlYWN0LWRhdGVwaWNrZXJfX3llYXItJHt5fWAsXG4gICAgICB5ZWFyQ2xhc3NOYW1lID8geWVhckNsYXNzTmFtZSh1dGlscy5zZXRZZWFyKGRhdGUsIHkpKSA6IHVuZGVmaW5lZCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGVkXCI6IHkgPT09IGdldFllYXIoc2VsZWN0ZWQpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMgfHwgZmlsdGVyRGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1llYXJEaXNhYmxlZCh5LCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlRW5kKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRZZWFyKHkpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFllYXJUYWJJbmRleCA9ICh5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHJldHVybiBcIi0xXCI7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWQgPSB1dGlscy5nZXRZZWFyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICAgIHJldHVybiB5ID09PSBwcmVTZWxlY3RlZCA/IFwiMFwiIDogXCItMVwiO1xuICB9O1xuXG4gIGdldFllYXJDb250YWluZXJDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW5nRGF0ZSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhclwiLCB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICBzZWxlY3RpbmdEYXRlICYmIChzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpLFxuICAgIH0pO1xuICB9O1xuXG4gIGdldFllYXJDb250ZW50ID0gKHkpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCA/IHRoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnQoeSkgOiB5O1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB5ZWFyc0xpc3QgPSBbXTtcbiAgICBjb25zdCB7IGRhdGUsIHllYXJJdGVtTnVtYmVyLCBvblllYXJNb3VzZUVudGVyLCBvblllYXJNb3VzZUxlYXZlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKFxuICAgICAgZGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG5cbiAgICBmb3IgKGxldCB5ID0gc3RhcnRQZXJpb2Q7IHkgPD0gZW5kUGVyaW9kOyB5KyspIHtcbiAgICAgIHllYXJzTGlzdC5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXt0aGlzLllFQVJfUkVGU1t5IC0gc3RhcnRQZXJpb2RdfVxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblllYXJDbGljayhldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25ZZWFyS2V5RG93bihldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRZZWFyVGFiSW5kZXgoeSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFllYXJDbGFzc05hbWVzKHkpfVxuICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUVudGVyKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VMZWF2ZShldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5PXt5fVxuICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRZZWFyKHkpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5nZXRZZWFyQ29udGVudCh5KX1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMoKX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXdyYXBwZXJcIlxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNsZWFyU2VsZWN0aW5nRGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICA+XG4gICAgICAgICAge3llYXJzTGlzdH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGlucHV0VGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRpbWVTdHJpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aW1lOiB0aGlzLnByb3BzLnRpbWVTdHJpbmcsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgaWYgKHByb3BzLnRpbWVTdHJpbmcgIT09IHN0YXRlLnRpbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpbWU6IHByb3BzLnRpbWVTdHJpbmcsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFJldHVybiBudWxsIHRvIGluZGljYXRlIG5vIGNoYW5nZSB0byBzdGF0ZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uVGltZUNoYW5nZSA9ICh0aW1lKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWUgfSk7XG5cbiAgICBjb25zdCB7IGRhdGU6IHByb3BEYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzUHJvcERhdGVWYWxpZCA9IHByb3BEYXRlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ocHJvcERhdGUpO1xuICAgIGNvbnN0IGRhdGUgPSBpc1Byb3BEYXRlVmFsaWQgPyBwcm9wRGF0ZSA6IG5ldyBEYXRlKCk7XG5cbiAgICBkYXRlLnNldEhvdXJzKHRpbWUuc3BsaXQoXCI6XCIpWzBdKTtcbiAgICBkYXRlLnNldE1pbnV0ZXModGltZS5zcGxpdChcIjpcIilbMV0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShkYXRlKTtcbiAgfTtcblxuICByZW5kZXJUaW1lSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGF0ZSwgdGltZVN0cmluZywgY3VzdG9tVGltZUlucHV0IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGN1c3RvbVRpbWVJbnB1dCkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjdXN0b21UaW1lSW5wdXQsIHtcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgdmFsdWU6IHRpbWUsXG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uVGltZUNoYW5nZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRpbWVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJUaW1lXCJcbiAgICAgICAgbmFtZT1cInRpbWUtaW5wdXRcIlxuICAgICAgICByZXF1aXJlZFxuICAgICAgICB2YWx1ZT17dGltZX1cbiAgICAgICAgb25DaGFuZ2U9eyhldikgPT4ge1xuICAgICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKGV2LnRhcmdldC52YWx1ZSB8fCB0aW1lU3RyaW5nKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtdGltZS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2NhcHRpb25cIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIj5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVJbnB1dCgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXJDb250YWluZXIoe1xuICBzaG93VGltZVNlbGVjdE9ubHkgPSBmYWxzZSxcbiAgc2hvd1RpbWUgPSBmYWxzZSxcbiAgY2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbn0pIHtcbiAgbGV0IGFyaWFMYWJlbCA9IHNob3dUaW1lU2VsZWN0T25seVxuICAgID8gXCJDaG9vc2UgVGltZVwiXG4gICAgOiBgQ2hvb3NlIERhdGUke3Nob3dUaW1lID8gXCIgYW5kIFRpbWVcIiA6IFwiXCJ9YDtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5DYWxlbmRhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59O1xuIiwiaW1wb3J0IFllYXJEcm9wZG93biBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhEcm9wZG93biBmcm9tIFwiLi9tb250aF9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoWWVhckRyb3Bkb3duIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aCBmcm9tIFwiLi9tb250aFwiO1xuaW1wb3J0IFRpbWUgZnJvbSBcIi4vdGltZVwiO1xuaW1wb3J0IFllYXIgZnJvbSBcIi4veWVhclwiO1xuaW1wb3J0IElucHV0VGltZSBmcm9tIFwiLi9pbnB1dFRpbWVcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IENhbGVuZGFyQ29udGFpbmVyIGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgc2V0TW9udGgsXG4gIGdldE1vbnRoLFxuICBhZGRNb250aHMsXG4gIHN1Yk1vbnRocyxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldFN0YXJ0T2ZUb2RheSxcbiAgYWRkRGF5cyxcbiAgZm9ybWF0RGF0ZSxcbiAgc2V0WWVhcixcbiAgZ2V0WWVhcixcbiAgaXNCZWZvcmUsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNBZnRlcixcbiAgZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlLFxuICBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSxcbiAgZ2V0V2Vla2RheU1pbkluTG9jYWxlLFxuICBpc1NhbWVEYXksXG4gIGlzU2FtZU1vbnRoLFxuICBtb250aERpc2FibGVkQmVmb3JlLFxuICBtb250aERpc2FibGVkQWZ0ZXIsXG4gIHllYXJEaXNhYmxlZEJlZm9yZSxcbiAgeWVhckRpc2FibGVkQWZ0ZXIsXG4gIHllYXJzRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEJlZm9yZSxcbiAgcXVhcnRlckRpc2FibGVkQmVmb3JlLFxuICBxdWFydGVyRGlzYWJsZWRBZnRlcixcbiAgZ2V0RWZmZWN0aXZlTWluRGF0ZSxcbiAgZ2V0RWZmZWN0aXZlTWF4RGF0ZSxcbiAgYWRkWmVybyxcbiAgaXNWYWxpZCxcbiAgZ2V0WWVhcnNQZXJpb2QsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgZ2V0TW9udGhJbkxvY2FsZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTID0gW1xuICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1zZWxlY3RcIixcbl07XG5cbmNvbnN0IGlzRHJvcGRvd25TZWxlY3QgPSAoZWxlbWVudCA9IHt9KSA9PiB7XG4gIGNvbnN0IGNsYXNzTmFtZXMgPSAoZWxlbWVudC5jbGFzc05hbWUgfHwgXCJcIikuc3BsaXQoL1xccysvKTtcbiAgcmV0dXJuIERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMuc29tZShcbiAgICAodGVzdENsYXNzbmFtZSkgPT4gY2xhc3NOYW1lcy5pbmRleE9mKHRlc3RDbGFzc25hbWUpID49IDAsXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvbkRyb3Bkb3duRm9jdXM6ICgpID0+IHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgY3VzdG9tVGltZUlucHV0OiBudWxsLFxuICAgICAgeWVhckl0ZW1OdW1iZXI6IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSlcbiAgICAgIC5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSksXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbW9udGhTZWxlY3RlZEluOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25Ecm9wZG93bkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dUaW1lU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblRpbWVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aE1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dQb3BwZXJBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbkRheUtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuY29udGFpbmVyUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGF0ZTogdGhpcy5nZXREYXRlSW5WaWV3KCksXG4gICAgICBzZWxlY3RpbmdEYXRlOiBudWxsLFxuICAgICAgbW9udGhDb250YWluZXI6IG51bGwsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIG1vbnRoQ29udGFpbmVyIGhlaWdodCBpcyBuZWVkZWQgaW4gdGltZSBjb21wb25lbnRcbiAgICAvLyB0byBkZXRlcm1pbmUgdGhlIGhlaWdodCBmb3IgdGhlIHVsIGluIHRoZSB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHNldFN0YXRlIGhlcmUgc28gaGVpZ2h0IGlzIGdpdmVuIGFmdGVyIGZpbmFsIGNvbXBvbmVudFxuICAgIC8vIGxheW91dCBpcyByZW5kZXJlZFxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLmFzc2lnbk1vbnRoQ29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoQ29udGFpbmVyOiB0aGlzLm1vbnRoQ29udGFpbmVyIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24gJiZcbiAgICAgICghaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCBwcmV2UHJvcHMucHJlU2VsZWN0aW9uKSB8fFxuICAgICAgICB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiAhPT0gcHJldlByb3BzLm1vbnRoU2VsZWN0ZWRJbilcbiAgICApIHtcbiAgICAgIGNvbnN0IGhhc01vbnRoQ2hhbmdlZCA9ICFpc1NhbWVNb250aChcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZTogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IGhhc01vbnRoQ2hhbmdlZCAmJiB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkodGhpcy5wcm9wcy5vcGVuVG9EYXRlLCBwcmV2UHJvcHMub3BlblRvRGF0ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRlOiB0aGlzLnByb3BzLm9wZW5Ub0RhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgfTtcblxuICBzZXRDbGlja091dHNpZGVSZWYgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGlmIChpc0Ryb3Bkb3duU2VsZWN0KGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGdldERhdGVJblZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcmVTZWxlY3Rpb24sIHNlbGVjdGVkLCBvcGVuVG9EYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1pbkRhdGUgPSBnZXRFZmZlY3RpdmVNaW5EYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IG1heERhdGUgPSBnZXRFZmZlY3RpdmVNYXhEYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBuZXdEYXRlKCk7XG4gICAgY29uc3QgaW5pdGlhbERhdGUgPSBvcGVuVG9EYXRlIHx8IHNlbGVjdGVkIHx8IHByZVNlbGVjdGlvbjtcbiAgICBpZiAoaW5pdGlhbERhdGUpIHtcbiAgICAgIHJldHVybiBpbml0aWFsRGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1pbkRhdGUgJiYgaXNCZWZvcmUoY3VycmVudCwgbWluRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1pbkRhdGU7XG4gICAgICB9IGVsc2UgaWYgKG1heERhdGUgJiYgaXNBZnRlcihjdXJyZW50LCBtYXhEYXRlKSkge1xuICAgICAgICByZXR1cm4gbWF4RGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH07XG5cbiAgaW5jcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGRlY3JlYXNlTW9udGggPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViTW9udGhzKGRhdGUsIDEpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF5KTtcbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBkYXkgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgfTtcblxuICBoYW5kbGVNb250aE1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gICAgdGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlKCk7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlRW50ZXIgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogc2V0WWVhcihuZXdEYXRlKCksIHllYXIpIH0pO1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcihldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlTGVhdmUgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICAhIXRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmUoZXZlbnQsIHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uWWVhckNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKGRhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vbnRoWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKGRhdGUpO1xuICAgIHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UoZGF0ZSk7XG4gIH07XG5cbiAgY2hhbmdlWWVhciA9ICh5ZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihkYXRlLCB5ZWFyKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aCA9IChtb250aCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldE1vbnRoKGRhdGUsIG1vbnRoKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2hhbmdlTW9udGhZZWFyID0gKG1vbnRoWWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldFllYXIoc2V0TW9udGgoZGF0ZSwgZ2V0TW9udGgobW9udGhZZWFyKSksIGdldFllYXIobW9udGhZZWFyKSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoZWFkZXIgPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICBkYXRlLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IGRheU5hbWVzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzKSB7XG4gICAgICBkYXlOYW1lcy5wdXNoKFxuICAgICAgICA8ZGl2IGtleT1cIldcIiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLndlZWtMYWJlbCB8fCBcIiNcIn1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheU5hbWVzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICBjb25zdCB3ZWVrRGF5TmFtZSA9IHRoaXMuZm9ybWF0V2Vla2RheShkYXksIHRoaXMucHJvcHMubG9jYWxlKTtcblxuICAgICAgICBjb25zdCB3ZWVrRGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lXG4gICAgICAgICAgPyB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWUoZGF5KVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtvZmZzZXR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtmb3JtYXREYXRlKGRheSwgXCJFRUVFXCIsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lXCIsIHdlZWtEYXlDbGFzc05hbWUpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt3ZWVrRGF5TmFtZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH07XG5cbiAgZm9ybWF0V2Vla2RheSA9IChkYXksIGxvY2FsZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXkpIHtcbiAgICAgIHJldHVybiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF5LCB0aGlzLnByb3BzLmZvcm1hdFdlZWtEYXksIGxvY2FsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3BzLnVzZVdlZWtkYXlzU2hvcnRcbiAgICAgID8gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF5LCBsb2NhbGUpXG4gICAgICA6IGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXksIGxvY2FsZSk7XG4gIH07XG5cbiAgZGVjcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHN1YlllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGNsZWFyU2VsZWN0aW5nRGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogbnVsbCB9KTtcbiAgfTtcblxuICByZW5kZXJQcmV2aW91c0J1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYWxsUHJldkRheXNEaXNhYmxlZDtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhckRpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSBxdWFydGVyRGlzYWJsZWRCZWZvcmUoXG4gICAgICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxQcmV2RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91cy0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwsIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qge1xuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBwcmV2aW91c1llYXJBcmlhTGFiZWwgOiBwcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgaW5jcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZFllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck5leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbE5leHREYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHF1YXJ0ZXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHRcIixcbiAgICBdO1xuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10aW1lXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy50b2RheUJ1dHRvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10b2RheS1idXR0b25cIik7XG4gICAgfVxuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxOZXh0RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IG5leHRNb250aEJ1dHRvbkxhYmVsLCBuZXh0WWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0TW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0WWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IG5leHRZZWFyQXJpYUxhYmVsIDogbmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckN1cnJlbnRNb250aCA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGhcIl07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aERyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICB7Zm9ybWF0RGF0ZShkYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8WWVhckRyb3Bkb3duXG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9XG4gICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHllYXI9e2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aERyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRofVxuICAgICAgICBtb250aD17Z2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoWWVhckRyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVRvZGF5QnV0dG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZ2V0U3RhcnRPZlRvZGF5KCksIGUpO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGdldFN0YXJ0T2ZUb2RheSgpKTtcbiAgfTtcblxuICByZW5kZXJUb2RheUJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMudG9kYXlCdXR0b24gfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdG9kYXktYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlVG9kYXlCdXR0b25DbGljayhlKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRlZmF1bHRIZWFkZXIgPSAoeyBtb250aERhdGUsIGkgfSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciAke1xuICAgICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0XG4gICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0taGFzLXRpbWUtc2VsZWN0XCJcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlckN1cnJlbnRNb250aChtb250aERhdGUpfVxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24tLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aERyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aFllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckN1c3RvbUhlYWRlciA9IChoZWFkZXJBcmdzID0ge30pID0+IHtcbiAgICBjb25zdCB7IG1vbnRoRGF0ZSwgaSB9ID0gaGVhZGVyQXJncztcblxuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmICF0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgcHJldlllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHNob3dEYXlOYW1lcyA9XG4gICAgICAhdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tY3VzdG9tXCJcbiAgICAgICAgb25Gb2N1cz17dGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcih7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICBjdXN0b21IZWFkZXJDb3VudDogaSxcbiAgICAgICAgICBtb250aERhdGUsXG4gICAgICAgICAgY2hhbmdlTW9udGg6IHRoaXMuY2hhbmdlTW9udGgsXG4gICAgICAgICAgY2hhbmdlWWVhcjogdGhpcy5jaGFuZ2VZZWFyLFxuICAgICAgICAgIGRlY3JlYXNlTW9udGg6IHRoaXMuZGVjcmVhc2VNb250aCxcbiAgICAgICAgICBpbmNyZWFzZU1vbnRoOiB0aGlzLmluY3JlYXNlTW9udGgsXG4gICAgICAgICAgZGVjcmVhc2VZZWFyOiB0aGlzLmRlY3JlYXNlWWVhcixcbiAgICAgICAgICBpbmNyZWFzZVllYXI6IHRoaXMuaW5jcmVhc2VZZWFyLFxuICAgICAgICAgIHByZXZNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIHByZXZZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dFllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgfSl9XG4gICAgICAgIHtzaG93RGF5TmFtZXMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckhlYWRlciA9ICh7IG1vbnRoRGF0ZSB9KSA9PiB7XG4gICAgY29uc3QgeyBzaG93WWVhclBpY2tlciwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIG1vbnRoRGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXIteWVhci1oZWFkZXJcIj5cbiAgICAgICAge3Nob3dZZWFyUGlja2VyID8gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YCA6IGdldFllYXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyID0gKGhlYWRlckFyZ3MpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIgIT09IHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ3VzdG9tSGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyWWVhckhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRlZmF1bHRIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoTGlzdCA9IFtdO1xuICAgIGNvbnN0IG1vbnRoc1RvU3VidHJhY3QgPSB0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc1xuICAgICAgPyB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMVxuICAgICAgOiAwO1xuICAgIGNvbnN0IGZyb21Nb250aERhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgID8gYWRkWWVhcnModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KVxuICAgICAgICA6IHN1Yk1vbnRocyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpO1xuICAgIGNvbnN0IG1vbnRoU2VsZWN0ZWRJbiA9IHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluID8/IG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vbnRoc1RvQWRkID0gaSAtIG1vbnRoU2VsZWN0ZWRJbiArIG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgICBjb25zdCBtb250aERhdGUgPVxuICAgICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgICA/IGFkZFllYXJzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKVxuICAgICAgICAgIDogYWRkTW9udGhzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKTtcbiAgICAgIGNvbnN0IG1vbnRoS2V5ID0gYG1vbnRoLSR7aX1gO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgPSBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDE7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ID0gaSA+IDA7XG4gICAgICBtb250aExpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17bW9udGhLZXl9XG4gICAgICAgICAgcmVmPXsoZGl2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoQ29udGFpbmVyID0gZGl2O1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtY29udGFpbmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZSwgaSB9KX1cbiAgICAgICAgICA8TW9udGhcbiAgICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgICAgIGRheT17bW9udGhEYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbkRheUtleURvd259XG4gICAgICAgICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICAgIG9yZGVySW5EaXNwbGF5PXtpfVxuICAgICAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbW9udGhMaXN0O1xuICB9O1xuXG4gIHJlbmRlclllYXJzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGU6IHRoaXMuc3RhdGUuZGF0ZSB9KX1cbiAgICAgICAgICA8WWVhclxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW5nRGF0ZT17dGhpcy5jbGVhclNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLmhhbmRsZVllYXJNb3VzZUxlYXZlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyVGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgKHRoaXMuc3RhdGUubW9udGhDb250YWluZXIgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGltZVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICAgIGZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgICAgaW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgICAgbW9udGhSZWY9e3RoaXMuc3RhdGUubW9udGhDb250YWluZXJ9XG4gICAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dFRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lVmFsaWQgPSBpc1ZhbGlkKHRpbWUpICYmIEJvb2xlYW4odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVN0cmluZyA9IHRpbWVWYWxpZFxuICAgICAgPyBgJHthZGRaZXJvKHRpbWUuZ2V0SG91cnMoKSl9OiR7YWRkWmVybyh0aW1lLmdldE1pbnV0ZXMoKSl9YFxuICAgICAgOiBcIlwiO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnB1dFRpbWVcbiAgICAgICAgICBkYXRlPXt0aW1lfVxuICAgICAgICAgIHRpbWVTdHJpbmc9e3RpbWVTdHJpbmd9XG4gICAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YDtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gZ2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtnZXRNb250aEluTG9jYWxlKFxuICAgICAgICBnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICl9ICR7Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIGFyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNoaWxkcmVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2NoaWxkcmVuLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBDb250YWluZXIgPSB0aGlzLnByb3BzLmNvbnRhaW5lciB8fCBDYWxlbmRhckNvbnRhaW5lcjtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImNvbnRlbnRzXCIgfX0gcmVmPXt0aGlzLmNvbnRhaW5lclJlZn0+XG4gICAgICAgIDxDb250YWluZXJcbiAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXCJyZWFjdC1kYXRlcGlja2VyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXItLXRpbWUtb25seVwiOiB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBzaG93VGltZT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyUHJldmlvdXNCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJOZXh0QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTW9udGhzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyWWVhcnMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUb2RheUJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5jb25zdCBDYWxlbmRhckljb24gPSAoeyBpY29uLCBjbGFzc05hbWUgPSBcIlwiLCBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgZGVmYXVsdENsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyX19jYWxlbmRhci1pY29uXCI7XG5cbiAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGljb24pKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChpY29uLCB7XG4gICAgICBjbGFzc05hbWU6IGAke2ljb24ucHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJ9ICR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gLFxuICAgICAgb25DbGljazogKGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpY29uLnByb3BzLm9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGljb24ucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb25DbGljayhlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaWNvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8aVxuICAgICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtpY29ufSAke2NsYXNzTmFtZX1gfVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBTVkcgSWNvblxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gfVxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIlxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICA+XG4gICAgICA8cGF0aCBkPVwiTTk2IDMyVjY0SDQ4QzIxLjUgNjQgMCA4NS41IDAgMTEydjQ4SDQ0OFYxMTJjMC0yNi41LTIxLjUtNDgtNDgtNDhIMzUyVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjY0SDE2MFYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMlM5NiAxNC4zIDk2IDMyek00NDggMTkySDBWNDY0YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4SDQwMGMyNi41IDAgNDgtMjEuNSA0OC00OFYxOTJ6XCIgLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbkNhbGVuZGFySWNvbi5wcm9wVHlwZXMgPSB7XG4gIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWxlbmRhckljb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290ID0gKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudCkuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0aGlzLnByb3BzLnBvcnRhbElkLFxuICAgICk7XG4gICAgaWYgKCF0aGlzLnBvcnRhbFJvb3QpIHtcbiAgICAgIHRoaXMucG9ydGFsUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aGlzLnBvcnRhbFJvb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpcy5wcm9wcy5wb3J0YWxJZCk7XG4gICAgICAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHRoaXMucG9ydGFsUm9vdCk7XG4gICAgfVxuICAgIHRoaXMucG9ydGFsUm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdC5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3RET00uY3JlYXRlUG9ydGFsKHRoaXMucHJvcHMuY2hpbGRyZW4sIHRoaXMuZWwpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbi8vIFRhYkxvb3AgcHJldmVudHMgdGhlIHVzZXIgZnJvbSB0YWJiaW5nIG91dHNpZGUgb2YgdGhlIHBvcHBlclxuLy8gSXQgY3JlYXRlcyBhIHRhYmluZGV4IGxvb3Agc28gdGhhdCBcIlRhYlwiIG9uIHRoZSBsYXN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudFxuLy8gYW5kIFwiU2hpZnQgVGFiXCIgb24gdGhlIGZpcnN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgbGFzdCBlbGVtZW50XG5cbmNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPVxuICBcIlt0YWJpbmRleF0sIGEsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIjtcbmNvbnN0IGZvY3VzYWJsZUZpbHRlciA9IChub2RlKSA9PiAhbm9kZS5kaXNhYmxlZCAmJiBub2RlLnRhYkluZGV4ICE9PSAtMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiTG9vcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy50YWJMb29wUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gIH1cblxuICAvLyBxdWVyeSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzXG4gIC8vIHRyaW0gZmlyc3QgYW5kIGxhc3QgYmVjYXVzZSB0aGV5IGFyZSB0aGUgZm9jdXMgZ3VhcmRzXG4gIGdldFRhYkNoaWxkcmVuID0gKCkgPT5cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKFxuICAgICAgICB0aGlzLnRhYkxvb3BSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IpLFxuICAgICAgICAxLFxuICAgICAgICAtMSxcbiAgICAgIClcbiAgICAgIC5maWx0ZXIoZm9jdXNhYmxlRmlsdGVyKTtcblxuICBoYW5kbGVGb2N1c1N0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmXG4gICAgICB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmXG4gICAgICB0YWJDaGlsZHJlblt0YWJDaGlsZHJlbi5sZW5ndGggLSAxXS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUZvY3VzRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiYgdGFiQ2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcFwiIHJlZj17dGhpcy50YWJMb29wUmVmfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19zdGFydFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzU3RhcnR9XG4gICAgICAgIC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX2VuZFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzRW5kfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgdXNlRmxvYXRpbmcsXG4gIGFycm93LFxuICBvZmZzZXQsXG4gIGZsaXAsXG4gIGF1dG9VcGRhdGUsXG59IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyA9IFtcbiAgXCJ0b3Atc3RhcnRcIixcbiAgXCJ0b3AtZW5kXCIsXG4gIFwiYm90dG9tLXN0YXJ0XCIsXG4gIFwiYm90dG9tLWVuZFwiLFxuICBcInJpZ2h0LXN0YXJ0XCIsXG4gIFwicmlnaHQtZW5kXCIsXG4gIFwibGVmdC1zdGFydFwiLFxuICBcImxlZnQtZW5kXCIsXG4gIFwidG9wXCIsXG4gIFwicmlnaHRcIixcbiAgXCJib3R0b21cIixcbiAgXCJsZWZ0XCIsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoRmxvYXRpbmcoQ29tcG9uZW50KSB7XG4gIGNvbnN0IFdpdGhGbG9hdGluZyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IGFsdF9wcm9wcyA9IHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgcG9wcGVyTW9kaWZpZXJzOiBwcm9wcy5wb3BwZXJNb2RpZmllcnMgfHwgW10sXG4gICAgICBwb3BwZXJQcm9wczogcHJvcHMucG9wcGVyUHJvcHMgfHwge30sXG4gICAgICBoaWRlUG9wcGVyOlxuICAgICAgICB0eXBlb2YgcHJvcHMuaGlkZVBvcHBlciA9PT0gXCJib29sZWFuXCIgPyBwcm9wcy5oaWRlUG9wcGVyIDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGFycm93UmVmID0gUmVhY3QudXNlUmVmKCk7XG4gICAgY29uc3QgZmxvYXRpbmdQcm9wcyA9IHVzZUZsb2F0aW5nKHtcbiAgICAgIG9wZW46ICFhbHRfcHJvcHMuaGlkZVBvcHBlcixcbiAgICAgIHdoaWxlRWxlbWVudHNNb3VudGVkOiBhdXRvVXBkYXRlLFxuICAgICAgcGxhY2VtZW50OiBhbHRfcHJvcHMucG9wcGVyUGxhY2VtZW50LFxuICAgICAgbWlkZGxld2FyZTogW1xuICAgICAgICBmbGlwKHsgcGFkZGluZzogMTUgfSksXG4gICAgICAgIG9mZnNldCgxMCksXG4gICAgICAgIGFycm93KHsgZWxlbWVudDogYXJyb3dSZWYgfSksXG4gICAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJNb2RpZmllcnMsXG4gICAgICBdLFxuICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlclByb3BzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgey4uLmFsdF9wcm9wc30gcG9wcGVyUHJvcHM9e3sgLi4uZmxvYXRpbmdQcm9wcywgYXJyb3dSZWYgfX0gLz5cbiAgICApO1xuICB9O1xuXG4gIFdpdGhGbG9hdGluZy5wcm9wVHlwZXMgPSB7XG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSxcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHJldHVybiBXaXRoRmxvYXRpbmc7XG59XG4iLCJpbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IEZsb2F0aW5nQXJyb3cgfSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgVGFiTG9vcCBmcm9tIFwiLi90YWJfbG9vcFwiO1xuaW1wb3J0IFBvcnRhbCBmcm9tIFwiLi9wb3J0YWxcIjtcbmltcG9ydCB3aXRoRmxvYXRpbmcgZnJvbSBcIi4vd2l0aF9mbG9hdGluZ1wiO1xuXG4vLyBFeHBvcnRlZCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuZXhwb3J0IGNsYXNzIFBvcHBlckNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoaWRlUG9wcGVyOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlckNvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0YXJnZXRDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcHBlck9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0Fycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgd3JhcHBlckNsYXNzTmFtZSxcbiAgICAgIGhpZGVQb3BwZXIsXG4gICAgICBwb3BwZXJDb21wb25lbnQsXG4gICAgICB0YXJnZXRDb21wb25lbnQsXG4gICAgICBlbmFibGVUYWJMb29wLFxuICAgICAgcG9wcGVyT25LZXlEb3duLFxuICAgICAgcG9ydGFsSWQsXG4gICAgICBwb3J0YWxIb3N0LFxuICAgICAgcG9wcGVyUHJvcHMsXG4gICAgICBzaG93QXJyb3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQgcG9wcGVyO1xuXG4gICAgaWYgKCFoaWRlUG9wcGVyKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xzeChcInJlYWN0LWRhdGVwaWNrZXItcG9wcGVyXCIsIGNsYXNzTmFtZSk7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e2VuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRGbG9hdGluZ31cbiAgICAgICAgICAgIHN0eWxlPXtwb3BwZXJQcm9wcy5mbG9hdGluZ1N0eWxlc31cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlc31cbiAgICAgICAgICAgIGRhdGEtcGxhY2VtZW50PXtwb3BwZXJQcm9wcy5wbGFjZW1lbnR9XG4gICAgICAgICAgICBvbktleURvd249e3BvcHBlck9uS2V5RG93bn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9wcGVyQ29tcG9uZW50fVxuICAgICAgICAgICAge3Nob3dBcnJvdyAmJiAoXG4gICAgICAgICAgICAgIDxGbG9hdGluZ0Fycm93XG4gICAgICAgICAgICAgICAgcmVmPXtwb3BwZXJQcm9wcy5hcnJvd1JlZn1cbiAgICAgICAgICAgICAgICBjb250ZXh0PXtwb3BwZXJQcm9wcy5jb250ZXh0fVxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIGhlaWdodD17OH1cbiAgICAgICAgICAgICAgICB3aWR0aD17MTZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTFweClcIiB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RyaWFuZ2xlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvVGFiTG9vcD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyKSB7XG4gICAgICBwb3BwZXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyLCB7fSwgcG9wcGVyKTtcbiAgICB9XG5cbiAgICBpZiAocG9ydGFsSWQgJiYgIWhpZGVQb3BwZXIpIHtcbiAgICAgIHBvcHBlciA9IChcbiAgICAgICAgPFBvcnRhbCBwb3J0YWxJZD17cG9ydGFsSWR9IHBvcnRhbEhvc3Q9e3BvcnRhbEhvc3R9PlxuICAgICAgICAgIHtwb3BwZXJ9XG4gICAgICAgIDwvUG9ydGFsPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXdyYXBwZXJcIiwgd3JhcHBlckNsYXNzTmFtZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8ZGl2IHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRSZWZlcmVuY2V9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzZXN9PlxuICAgICAgICAgIHt0YXJnZXRDb21wb25lbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cG9wcGVyfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhGbG9hdGluZyhQb3BwZXJDb21wb25lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gXCIuL2NhbGVuZGFyXCI7XG5pbXBvcnQgQ2FsZW5kYXJJY29uIGZyb20gXCIuL2NhbGVuZGFyX2ljb25cIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgUG9wcGVyQ29tcG9uZW50IGZyb20gXCIuL3BvcHBlcl9jb21wb25lbnRcIjtcbmltcG9ydCB7IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyB9IGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHsgc2V0IH0gZnJvbSBcImRhdGUtZm5zL3NldFwiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gXCJkYXRlLWZucy9pc1ZhbGlkXCI7XG5pbXBvcnQge1xuICBuZXdEYXRlLFxuICBpc0RhdGUsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBpc0VxdWFsLFxuICBzZXRUaW1lLFxuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgYWRkRGF5cyxcbiAgYWRkTW9udGhzLFxuICBhZGRXZWVrcyxcbiAgc3ViRGF5cyxcbiAgc3ViTW9udGhzLFxuICBzdWJXZWVrcyxcbiAgYWRkWWVhcnMsXG4gIHN1YlllYXJzLFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGdldEVmZmVjdGl2ZU1pbkRhdGUsXG4gIGdldEVmZmVjdGl2ZU1heERhdGUsXG4gIHBhcnNlRGF0ZSxcbiAgc2FmZURhdGVGb3JtYXQsXG4gIHNhZmVEYXRlUmFuZ2VGb3JtYXQsXG4gIGdldEhpZ2h0TGlnaHREYXlzTWFwLFxuICBnZXRZZWFyLFxuICBnZXRNb250aCxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldEVuZE9mV2VlayxcbiAgcmVnaXN0ZXJMb2NhbGUsXG4gIHNldERlZmF1bHRMb2NhbGUsXG4gIGdldERlZmF1bHRMb2NhbGUsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgaXNTYW1lRGF5LFxuICBpc01vbnRoRGlzYWJsZWQsXG4gIGlzWWVhckRpc2FibGVkLFxuICBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCxcbiAgZ2V0SG9saWRheXNNYXAsXG4gIGlzRGF0ZUJlZm9yZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tIFwicmVhY3Qtb25jbGlja291dHNpZGVcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYWxlbmRhckNvbnRhaW5lciB9IGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuXG5leHBvcnQgeyByZWdpc3RlckxvY2FsZSwgc2V0RGVmYXVsdExvY2FsZSwgZ2V0RGVmYXVsdExvY2FsZSB9O1xuXG5jb25zdCBvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlci1pZ25vcmUtb25jbGlja291dHNpZGVcIjtcbmNvbnN0IFdyYXBwZWRDYWxlbmRhciA9IG9uQ2xpY2tPdXRzaWRlKENhbGVuZGFyKTtcblxuLy8gQ29tcGFyZXMgZGF0ZXMgeWVhcittb250aCBjb21iaW5hdGlvbnNcbmZ1bmN0aW9uIGhhc1ByZVNlbGVjdGlvbkNoYW5nZWQoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiAoXG4gICAgICBnZXRNb250aChkYXRlMSkgIT09IGdldE1vbnRoKGRhdGUyKSB8fCBnZXRZZWFyKGRhdGUxKSAhPT0gZ2V0WWVhcihkYXRlMilcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGRhdGUxICE9PSBkYXRlMjtcbn1cblxuLyoqXG4gKiBHZW5lcmFsIGRhdGVwaWNrZXIgY29tcG9uZW50LlxuICovXG5jb25zdCBJTlBVVF9FUlJfMSA9IFwiRGF0ZSBpbnB1dCBub3QgdmFsaWQuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVQaWNrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWxsb3dTYW1lRGF5OiBmYWxzZSxcbiAgICAgIGRhdGVGb3JtYXQ6IFwiTU0vZGQveXl5eVwiLFxuICAgICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBcIkxMTEwgeXl5eVwiLFxuICAgICAgb25DaGFuZ2UoKSB7fSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgIGRyb3Bkb3duTW9kZTogXCJzY3JvbGxcIixcbiAgICAgIG9uRm9jdXMoKSB7fSxcbiAgICAgIG9uQmx1cigpIHt9LFxuICAgICAgb25LZXlEb3duKCkge30sXG4gICAgICBvbklucHV0Q2xpY2soKSB7fSxcbiAgICAgIG9uU2VsZWN0KCkge30sXG4gICAgICBvbkNsaWNrT3V0c2lkZSgpIHt9LFxuICAgICAgb25Nb250aENoYW5nZSgpIHt9LFxuICAgICAgb25DYWxlbmRhck9wZW4oKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJDbG9zZSgpIHt9LFxuICAgICAgcHJldmVudE9wZW5PbkZvY3VzOiBmYWxzZSxcbiAgICAgIG9uWWVhckNoYW5nZSgpIHt9LFxuICAgICAgb25JbnB1dEVycm9yKCkge30sXG4gICAgICBtb250aHNTaG93bjogMSxcbiAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgIHdpdGhQb3J0YWw6IGZhbHNlLFxuICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IGZhbHNlLFxuICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICAgIHNob3dUaW1lU2VsZWN0OiBmYWxzZSxcbiAgICAgIHNob3dUaW1lSW5wdXQ6IGZhbHNlLFxuICAgICAgc2hvd1ByZXZpb3VzTW9udGhzOiBmYWxzZSxcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93WWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1dlZWtQaWNrZXI6IGZhbHNlLFxuICAgICAgc3RyaWN0UGFyc2luZzogZmFsc2UsXG4gICAgICBzd2FwUmFuZ2U6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsczogMzAsXG4gICAgICB0aW1lQ2FwdGlvbjogXCJUaW1lXCIsXG4gICAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWw6IFwiTmV4dCBZZWFyXCIsXG4gICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgdGltZUlucHV0TGFiZWw6IFwiVGltZVwiLFxuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyOiBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gICAgICBmb2N1c1NlbGVjdGVkTW9udGg6IGZhbHNlLFxuICAgICAgc2hvd1BvcHBlckFycm93OiB0cnVlLFxuICAgICAgZXhjbHVkZVNjcm9sbGJhcjogdHJ1ZSxcbiAgICAgIGN1c3RvbVRpbWVJbnB1dDogbnVsbCxcbiAgICAgIGNhbGVuZGFyU3RhcnREYXk6IHVuZGVmaW5lZCxcbiAgICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IGZhbHNlLFxuICAgICAgdXNlUG9pbnRlckV2ZW50OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGFsbG93U2FtZURheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYXJpYURlc2NyaWJlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFJbnZhbGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbENsb3NlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbGxlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFSZXF1aXJlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvQ29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbG9zZU9uU2Nyb2xsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIGN1c3RvbUlucHV0UmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSksXG4gICAgZGF0ZUZvcm1hdENhbGVuZGFyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmplY3RUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2s6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICBdKSxcbiAgICBzaG93SWNvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaWNvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgICBjYWxlbmRhckljb25DbGFzc25hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2xpY2tPdXRzaWRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZVJhdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dEVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNhbGVuZGFyT3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DYWxlbmRhckNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwZWVrTmV4dE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwbGFjZWhvbGRlclRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9wcGVyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwb3BwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlck1vZGlmaWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksIC8vIDxQb3BwZXJDb21wb25lbnQvPiBwcm9wc1xuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHByZXZlbnRPcGVuT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVhZE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dNb250aERyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UHJldmlvdXNNb250aHM6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3RQYXJzaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzd2FwUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHN0YXJ0T3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFiSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIHVzZVdlZWtkYXlzU2hvcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm1hdFdlZWtEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdlZWtMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgICB5ZWFySXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEYXRlU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3RPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlU2hvcnRNb250aEluRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGNsZWFyQnV0dG9uVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xlYXJCdXR0b25DbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0TW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuZGVyQ3VzdG9tSGVhZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdyYXBwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW9udGhNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93UG9wcGVyQXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aEFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNhbGNJbml0aWFsU3RhdGUoKTtcbiAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAoXG4gICAgICBwcmV2UHJvcHMuaW5saW5lICYmXG4gICAgICBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKHByZXZQcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLm1vbnRoU2VsZWN0ZWRJbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwcmV2UHJvcHMubW9udGhzU2hvd24gIT09IHRoaXMucHJvcHMubW9udGhzU2hvd25cbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IDAgfSk7XG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMuaGlnaGxpZ2h0RGF0ZXMgIT09IHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoaWdobGlnaHREYXRlczogZ2V0SGlnaHRMaWdodERheXNNYXAodGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcyksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgIXByZXZTdGF0ZS5mb2N1c2VkICYmXG4gICAgICAhaXNFcXVhbChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJldlN0YXRlLm9wZW4gIT09IHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLm9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyT3BlbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldlN0YXRlLm9wZW4gPT09IHRydWUgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJDbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gIH1cblxuICBnZXRQcmVTZWxlY3Rpb24gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlblRvRGF0ZVxuICAgICAgPyB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzRW5kICYmIHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgID8gdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNTdGFydCAmJiB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA/IHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgIDogbmV3RGF0ZSgpO1xuXG4gIC8vIENvbnZlcnQgdGhlIGRhdGUgZnJvbSBzdHJpbmcgZm9ybWF0IHRvIHN0YW5kYXJkIERhdGUgZm9ybWF0XG4gIG1vZGlmeUhvbGlkYXlzID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLmhvbGlkYXlzPy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBob2xpZGF5KSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoaG9saWRheS5kYXRlKTtcbiAgICAgIGlmICghaXNWYWxpZChkYXRlKSkge1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbLi4uYWNjdW11bGF0b3IsIHsgLi4uaG9saWRheSwgZGF0ZSB9XTtcbiAgICB9LCBbXSk7XG5cbiAgY2FsY0luaXRpYWxTdGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UHJlU2VsZWN0aW9uID0gdGhpcy5nZXRQcmVTZWxlY3Rpb24oKTtcbiAgICBjb25zdCBtaW5EYXRlID0gZ2V0RWZmZWN0aXZlTWluRGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBtYXhEYXRlID0gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBib3VuZGVkUHJlU2VsZWN0aW9uID1cbiAgICAgIG1pbkRhdGUgJiYgaXNCZWZvcmUoZGVmYXVsdFByZVNlbGVjdGlvbiwgc3RhcnRPZkRheShtaW5EYXRlKSlcbiAgICAgICAgPyBtaW5EYXRlXG4gICAgICAgIDogbWF4RGF0ZSAmJiBpc0FmdGVyKGRlZmF1bHRQcmVTZWxlY3Rpb24sIGVuZE9mRGF5KG1heERhdGUpKVxuICAgICAgICAgID8gbWF4RGF0ZVxuICAgICAgICAgIDogZGVmYXVsdFByZVNlbGVjdGlvbjtcbiAgICByZXR1cm4ge1xuICAgICAgb3BlbjogdGhpcy5wcm9wcy5zdGFydE9wZW4gfHwgZmFsc2UsXG4gICAgICBwcmV2ZW50Rm9jdXM6IGZhbHNlLFxuICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkKSA/PyBib3VuZGVkUHJlU2VsZWN0aW9uLFxuICAgICAgLy8gdHJhbnNmb3JtaW5nIGhpZ2hsaWdodGVkIGRheXMgKHBlcmhhcHMgbmVzdGVkIGFycmF5KVxuICAgICAgLy8gdG8gZmxhdCBNYXAgZm9yIGZhc3RlciBhY2Nlc3MgaW4gZGF5LmpzeFxuICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAvLyB1c2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvbiBhZnRlciBtb250aCBoYXMgY2hhbmdlZCwgYnV0IG5vdCBvblxuICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSxcbiAgICAgIGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiBmYWxzZSxcbiAgICB9O1xuICB9O1xuXG4gIGNsZWFyUHJldmVudEZvY3VzVGltZW91dCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0Rm9jdXMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5mb2N1cykge1xuICAgICAgdGhpcy5pbnB1dC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNldEJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5ibHVyKSB7XG4gICAgICB0aGlzLmlucHV0LmJsdXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBzZXRPcGVuID0gKG9wZW4sIHNraXBTZXRCbHVyID0gZmFsc2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBvcGVuOiBvcGVuLFxuICAgICAgICBwcmVTZWxlY3Rpb246XG4gICAgICAgICAgb3BlbiAmJiB0aGlzLnN0YXRlLm9wZW5cbiAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb25cbiAgICAgICAgICAgIDogdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCkucHJlU2VsZWN0aW9uLFxuICAgICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICghb3Blbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgZm9jdXNlZDogc2tpcFNldEJsdXIgPyBwcmV2LmZvY3VzZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAhc2tpcFNldEJsdXIgJiYgdGhpcy5zZXRCbHVyKCk7XG5cbiAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbiAgaW5wdXRPayA9ICgpID0+IGlzRGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG5cbiAgaXNDYWxlbmRhck9wZW4gPSAoKSA9PlxuICAgIHRoaXMucHJvcHMub3BlbiA9PT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuc3RhdGUub3BlbiAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seVxuICAgICAgOiB0aGlzLnByb3BzLm9wZW47XG5cbiAgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUucHJldmVudEZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1cyAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiB0cnVlIH0pO1xuICB9O1xuXG4gIHNlbmRGb2N1c0JhY2tUb0lucHV0ID0gKCkgPT4ge1xuICAgIC8vIENsZWFyIHByZXZpb3VzIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgdGhpcy5jbGVhclByZXZlbnRGb2N1c1RpbWVvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBjbG9zZSB0aGUgcG9wcGVyIGFuZCByZWZvY3VzIHRoZSBpbnB1dFxuICAgIC8vIHN0b3AgdGhlIGlucHV0IGZyb20gYXV0byBvcGVuaW5nIG9uRm9jdXNcbiAgICAvLyBzZXRGb2N1cyB0byB0aGUgaW5wdXRcbiAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiB0cnVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJldmVudEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IGZhbHNlIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2FuY2VsRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5pbnB1dEZvY3VzVGltZW91dCk7XG4gICAgdGhpcy5pbnB1dEZvY3VzVGltZW91dCA9IG51bGw7XG4gIH07XG5cbiAgZGVmZXJGb2N1c0lucHV0ID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0Rm9jdXMoKSwgMSk7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgfTtcblxuICBoYW5kbGVCbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLm9wZW4gfHwgdGhpcy5wcm9wcy53aXRoUG9ydGFsIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmYWxzZSB9KTtcbiAgfTtcblxuICBoYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25DbGlja091dHNpZGUoZXZlbnQpO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICguLi5hbGxBcmdzKSA9PiB7XG4gICAgbGV0IGV2ZW50ID0gYWxsQXJnc1swXTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdy5hcHBseSh0aGlzLCBhbGxBcmdzKTtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVULFxuICAgIH0pO1xuICAgIGxldCBkYXRlID0gcGFyc2VEYXRlKFxuICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLnN0cmljdFBhcnNpbmcsXG4gICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgKTtcbiAgICAvLyBVc2UgZGF0ZSBmcm9tIGBzZWxlY3RlZGAgcHJvcCB3aGVuIG1hbmlwdWxhdGluZyBvbmx5IHRpbWUgZm9yIGlucHV0IHZhbHVlXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiZcbiAgICAgIGRhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkoZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIGRhdGUgPSBzZXQodGhpcy5wcm9wcy5zZWxlY3RlZCwge1xuICAgICAgICBob3VyczogZ2V0SG91cnMoZGF0ZSksXG4gICAgICAgIG1pbnV0ZXM6IGdldE1pbnV0ZXMoZGF0ZSksXG4gICAgICAgIHNlY29uZHM6IGdldFNlY29uZHMoZGF0ZSksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGUgfHwgIWV2ZW50LnRhcmdldC52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdCA9IChkYXRlLCBldmVudCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgLy8gUHJldmVudGluZyBvbkZvY3VzIGV2ZW50IHRvIGZpeCBpc3N1ZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0hhY2tlcjB4MDEvcmVhY3QtZGF0ZXBpY2tlci9pc3N1ZXMvNjI4XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZWxlY3RlZChkYXRlLCBldmVudCwgZmFsc2UsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24oZGF0ZSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc3RhcnREYXRlICYmXG4gICAgICAgICFlbmREYXRlICYmXG4gICAgICAgICh0aGlzLnByb3BzLnN3YXBSYW5nZSB8fCAhaXNEYXRlQmVmb3JlKGRhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgc2V0U2VsZWN0ZWQgPSAoZGF0ZSwgZXZlbnQsIGtlZXBJbnB1dCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgbGV0IGNoYW5nZWREYXRlID0gZGF0ZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZWREYXRlICE9PSBudWxsICYmXG4gICAgICAgIGlzWWVhckRpc2FibGVkKGdldFllYXIoY2hhbmdlZERhdGUpLCB0aGlzLnByb3BzKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcikge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsICYmIGlzTW9udGhEaXNhYmxlZChjaGFuZ2VkRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNEYXlEaXNhYmxlZChjaGFuZ2VkRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgc2VsZWN0c1JhbmdlLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZSxcbiAgICAgIHNlbGVjdGVkRGF0ZXMsXG4gICAgICBtaW5UaW1lLFxuICAgICAgc3dhcFJhbmdlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgIWlzRXF1YWwodGhpcy5wcm9wcy5zZWxlY3RlZCwgY2hhbmdlZERhdGUpIHx8XG4gICAgICB0aGlzLnByb3BzLmFsbG93U2FtZURheSB8fFxuICAgICAgc2VsZWN0c1JhbmdlIHx8XG4gICAgICBzZWxlY3RzTXVsdGlwbGVcbiAgICApIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJlxuICAgICAgICAgICgha2VlcElucHV0IHx8XG4gICAgICAgICAgICAoIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBjaGFuZ2VkRGF0ZSA9IHNldFRpbWUoY2hhbmdlZERhdGUsIHtcbiAgICAgICAgICAgIGhvdXI6IGdldEhvdXJzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgc2Vjb25kOiBnZXRTZWNvbmRzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbWluVGltZSBpcyBwcmVzZW50IHRoZW4gc2V0IHRoZSB0aW1lIHRvIG1pblRpbWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFrZWVwSW5wdXQgJiZcbiAgICAgICAgICAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKG1pblRpbWUpIHtcbiAgICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgICBob3VyOiBtaW5UaW1lLmdldEhvdXJzKCksXG4gICAgICAgICAgICAgIG1pbnV0ZTogbWluVGltZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICAgIHNlY29uZDogbWluVGltZS5nZXRTZWNvbmRzKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb246IGNoYW5nZWREYXRlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5mb2N1c1NlbGVjdGVkTW9udGgpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiBtb250aFNlbGVjdGVkSW4gfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RzUmFuZ2UpIHtcbiAgICAgICAgY29uc3Qgbm9SYW5nZXMgPSAhc3RhcnREYXRlICYmICFlbmREYXRlO1xuICAgICAgICBjb25zdCBoYXNTdGFydFJhbmdlID0gc3RhcnREYXRlICYmICFlbmREYXRlO1xuICAgICAgICBjb25zdCBpc1JhbmdlRmlsbGVkID0gc3RhcnREYXRlICYmIGVuZERhdGU7XG4gICAgICAgIGlmIChub1Jhbmdlcykge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNTdGFydFJhbmdlKSB7XG4gICAgICAgICAgaWYgKGNoYW5nZWREYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZUJlZm9yZShjaGFuZ2VkRGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICAgICAgaWYgKHN3YXBSYW5nZSkge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIHN0YXJ0RGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DaGFuZ2UoW3N0YXJ0RGF0ZSwgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JhbmdlRmlsbGVkKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdHNNdWx0aXBsZSkge1xuICAgICAgICBpZiAoIXNlbGVjdGVkRGF0ZXM/Lmxlbmd0aCkge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWREYXRlcy5zb21lKFxuICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgY2hhbmdlZERhdGUpLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkRGF0ZUFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgbmV4dERhdGVzID0gc2VsZWN0ZWREYXRlcy5maWx0ZXIoXG4gICAgICAgICAgICAgIChzZWxlY3RlZERhdGUpID0+ICFpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBvbkNoYW5nZShuZXh0RGF0ZXMsIGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DaGFuZ2UoWy4uLnNlbGVjdGVkRGF0ZXMsIGNoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25DaGFuZ2UoY2hhbmdlZERhdGUsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWtlZXBJbnB1dCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFdoZW4gY2hlY2tpbmcgcHJlU2VsZWN0aW9uIHZpYSBtaW4vbWF4RGF0ZSwgdGltZXMgbmVlZCB0byBiZSBtYW5pcHVsYXRlZCB2aWEgc3RhcnRPZkRheS9lbmRPZkRheVxuICBzZXRQcmVTZWxlY3Rpb24gPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGhhc01pbkRhdGUgPSB0eXBlb2YgdGhpcy5wcm9wcy5taW5EYXRlICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIGNvbnN0IGhhc01heERhdGUgPSB0eXBlb2YgdGhpcy5wcm9wcy5tYXhEYXRlICE9PSBcInVuZGVmaW5lZFwiO1xuICAgIGxldCBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9IHRydWU7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRhdGVTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkYXRlKTtcbiAgICAgIGlmIChoYXNNaW5EYXRlICYmIGhhc01heERhdGUpIHtcbiAgICAgICAgLy8gaXNEYXlJblJhbmdlIHVzZXMgc3RhcnRPZkRheSBpbnRlcm5hbGx5LCBzbyBub3QgbmVjZXNzYXJ5IHRvIG1hbmlwdWxhdGUgdGltZXMgaGVyZVxuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9IGlzRGF5SW5SYW5nZShcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGhhc01pbkRhdGUpIHtcbiAgICAgICAgY29uc3QgbWluRGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0FmdGVyKGRhdGUsIG1pbkRhdGVTdGFydE9mRGF5KSB8fFxuICAgICAgICAgIGlzRXF1YWwoZGF0ZVN0YXJ0T2ZEYXksIG1pbkRhdGVTdGFydE9mRGF5KTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWF4RGF0ZSkge1xuICAgICAgICBjb25zdCBtYXhEYXRlRW5kT2ZEYXkgPSBlbmRPZkRheSh0aGlzLnByb3BzLm1heERhdGUpO1xuICAgICAgICBpc1ZhbGlkRGF0ZVNlbGVjdGlvbiA9XG4gICAgICAgICAgaXNCZWZvcmUoZGF0ZSwgbWF4RGF0ZUVuZE9mRGF5KSB8fFxuICAgICAgICAgIGlzRXF1YWwoZGF0ZVN0YXJ0T2ZEYXksIG1heERhdGVFbmRPZkRheSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc1ZhbGlkRGF0ZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHByZVNlbGVjdGlvbjogZGF0ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB0b2dnbGVDYWxlbmRhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldE9wZW4oIXRoaXMuc3RhdGUub3Blbik7XG4gIH07XG5cbiAgaGFuZGxlVGltZUNoYW5nZSA9ICh0aW1lKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA/IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgIDogdGhpcy5nZXRQcmVTZWxlY3Rpb24oKTtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGVkXG4gICAgICA/IHRpbWVcbiAgICAgIDogc2V0VGltZShzZWxlY3RlZCwge1xuICAgICAgICAgIGhvdXI6IGdldEhvdXJzKHRpbWUpLFxuICAgICAgICAgIG1pbnV0ZTogZ2V0TWludXRlcyh0aW1lKSxcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgfSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICB0aGlzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIG9uSW5wdXRDbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uSW5wdXRDbGljaygpO1xuICB9O1xuXG4gIG9uSW5wdXRLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuc3RhdGUub3BlbiAmJlxuICAgICAgIXRoaXMucHJvcHMuaW5saW5lICYmXG4gICAgICAhdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXNcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiQXJyb3dEb3duXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiQXJyb3dVcFwiIHx8XG4gICAgICAgIGV2ZW50S2V5ID09PSBcIkVudGVyXCJcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9uSW5wdXRDbGljaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIGNhbGVuZGFyIGlzIG9wZW4sIHRoZXNlIGtleXMgd2lsbCBmb2N1cyB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIGlmICh0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JTdHJpbmcgPVxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiYgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnNcbiAgICAgICAgICAgID8gJy5yZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclt0YWJpbmRleD1cIjBcIl0nXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXIgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgICAgPyAnLnJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHRbdGFiaW5kZXg9XCIwXCJdJ1xuICAgICAgICAgICAgICA6ICcucmVhY3QtZGF0ZXBpY2tlcl9fZGF5W3RhYmluZGV4PVwiMFwiXSc7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9XG4gICAgICAgICAgdGhpcy5jYWxlbmRhci5jb21wb25lbnROb2RlICYmXG4gICAgICAgICAgdGhpcy5jYWxlbmRhci5jb21wb25lbnROb2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JTdHJpbmcpO1xuICAgICAgICBzZWxlY3RlZEl0ZW0gJiYgc2VsZWN0ZWRJdGVtLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvcHkgPSBuZXdEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcbiAgICAgIGlmIChldmVudEtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmlucHV0T2soKSAmJlxuICAgICAgICAgIHRoaXMuc3RhdGUubGFzdFByZVNlbGVjdENoYW5nZSA9PT0gUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEVcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3QoY29weSwgZXZlbnQpO1xuICAgICAgICAgICF0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgdGhpcy5zZXRQcmVTZWxlY3Rpb24oY29weSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIlRhYlwiKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5pbnB1dE9rKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBvblBvcnRhbEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgcHJldmVudEZvY3VzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8ga2V5RG93biBldmVudHMgcGFzc2VkIGRvd24gdG8gZGF5LmpzeFxuICBvbkRheUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNTaGlmdEtleUFjdGl2ZSA9IGV2ZW50LnNoaWZ0S2V5O1xuXG4gICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3QoY29weSwgZXZlbnQpO1xuICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgbGV0IG5ld1NlbGVjdGlvbjtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gc3ViRGF5cyhjb3B5LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZFdlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBhZGREYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJXZWVrcyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZFdlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUGFnZVVwXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBzdWJZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBzdWJNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlRG93blwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGlzU2hpZnRLZXlBY3RpdmVcbiAgICAgICAgICAgID8gYWRkWWVhcnMoY29weSwgMSlcbiAgICAgICAgICAgIDogYWRkTW9udGhzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiSG9tZVwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgICAgY29weSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJFbmRcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBnZXRFbmRPZldlZWsoY29weSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICghbmV3U2VsZWN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5wdXRFcnJvcikge1xuICAgICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFIH0pO1xuICAgICAgaWYgKHRoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQobmV3U2VsZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKG5ld1NlbGVjdGlvbik7XG4gICAgICAvLyBuZWVkIHRvIGZpZ3VyZSBvdXQgd2hldGhlciBtb250aCBoYXMgY2hhbmdlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb25cbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgICBjb25zdCBwcmV2TW9udGggPSBnZXRNb250aChjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3TW9udGggPSBnZXRNb250aChuZXdTZWxlY3Rpb24pO1xuICAgICAgICBjb25zdCBwcmV2WWVhciA9IGdldFllYXIoY29weSk7XG4gICAgICAgIGNvbnN0IG5ld1llYXIgPSBnZXRZZWFyKG5ld1NlbGVjdGlvbik7XG5cbiAgICAgICAgaWYgKHByZXZNb250aCAhPT0gbmV3TW9udGggfHwgcHJldlllYXIgIT09IG5ld1llYXIpIHtcbiAgICAgICAgICAvLyBtb250aCBoYXMgY2hhbmdlZFxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG91bGRGb2N1c0RheUlubGluZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtb250aCBoYXNuJ3QgY2hhbmdlZFxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gaGFuZGxlIGdlbmVyaWMga2V5IGRvd24gZXZlbnRzIGluIHRoZSBwb3BwZXIgdGhhdCBkbyBub3QgYWRqdXN0IG9yIHNlbGVjdCBkYXRlc1xuICAvLyBleDogd2hpbGUgZm9jdXNpbmcgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zXG4gIG9uUG9wcGVyS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICB9XG4gIH07XG5cbiAgb25DbGVhckNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbmRGb2N1c0JhY2tUb0lucHV0KCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoW251bGwsIG51bGxdLCBldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobnVsbCwgZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgfTtcblxuICBjbGVhciA9ICgpID0+IHtcbiAgICB0aGlzLm9uQ2xlYXJDbGljaygpO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbCA9PT0gXCJib29sZWFuXCIgJiZcbiAgICAgIHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbFxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudC50YXJnZXQgPT09IGRvY3VtZW50IHx8XG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8XG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckNhbGVuZGFyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUgJiYgIXRoaXMuaXNDYWxlbmRhck9wZW4oKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8V3JhcHBlZENhbGVuZGFyXG4gICAgICAgIHJlZj17KGVsZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gZWxlbTtcbiAgICAgICAgfX1cbiAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgd2Vla0FyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBtb250aEFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgYWRqdXN0RGF0ZU9uQ2hhbmdlPXt0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZX1cbiAgICAgICAgc2V0T3Blbj17dGhpcy5zZXRPcGVufVxuICAgICAgICBzaG91bGRDbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3R9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdENhbGVuZGFyfVxuICAgICAgICB1c2VXZWVrZGF5c1Nob3J0PXt0aGlzLnByb3BzLnVzZVdlZWtkYXlzU2hvcnR9XG4gICAgICAgIGZvcm1hdFdlZWtEYXk9e3RoaXMucHJvcHMuZm9ybWF0V2Vla0RheX1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb259XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgb3BlblRvRGF0ZT17dGhpcy5wcm9wcy5vcGVuVG9EYXRlfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICBzZWxlY3RzUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c1JhbmdlfVxuICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgb25DbGlja091dHNpZGU9e3RoaXMuaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGV9XG4gICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMuc3RhdGUuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgIGhvbGlkYXlzPXtnZXRIb2xpZGF5c01hcCh0aGlzLm1vZGlmeUhvbGlkYXlzKCkpfVxuICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgaW5jbHVkZVRpbWVzPXt0aGlzLnByb3BzLmluY2x1ZGVUaW1lc31cbiAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnN0YXRlLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICBwZWVrTmV4dE1vbnRoPXt0aGlzLnByb3BzLnBlZWtOZXh0TW9udGh9XG4gICAgICAgIHNob3dNb250aERyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3dufVxuICAgICAgICBzaG93UHJldmlvdXNNb250aHM9e3RoaXMucHJvcHMuc2hvd1ByZXZpb3VzTW9udGhzfVxuICAgICAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bj17dGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93bn1cbiAgICAgICAgc2hvd01vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgc2hvd1dlZWtOdW1iZXJzPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc31cbiAgICAgICAgc2hvd1llYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3dufVxuICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb259XG4gICAgICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb259XG4gICAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgdG9kYXlCdXR0b249e3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICAgIHdlZWtMYWJlbD17dGhpcy5wcm9wcy53ZWVrTGFiZWx9XG4gICAgICAgIG91dHNpZGVDbGlja0lnbm9yZUNsYXNzPXtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc31cbiAgICAgICAgZml4ZWRIZWlnaHQ9e3RoaXMucHJvcHMuZml4ZWRIZWlnaHR9XG4gICAgICAgIG1vbnRoc1Nob3duPXt0aGlzLnByb3BzLm1vbnRoc1Nob3dufVxuICAgICAgICBtb250aFNlbGVjdGVkSW49e3RoaXMuc3RhdGUubW9udGhTZWxlY3RlZElufVxuICAgICAgICBvbkRyb3Bkb3duRm9jdXM9e3RoaXMuaGFuZGxlRHJvcGRvd25Gb2N1c31cbiAgICAgICAgb25Nb250aENoYW5nZT17dGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlfVxuICAgICAgICBvblllYXJDaGFuZ2U9e3RoaXMucHJvcHMub25ZZWFyQ2hhbmdlfVxuICAgICAgICBkYXlDbGFzc05hbWU9e3RoaXMucHJvcHMuZGF5Q2xhc3NOYW1lfVxuICAgICAgICB3ZWVrRGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWV9XG4gICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICB0aW1lQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRpbWVDbGFzc05hbWV9XG4gICAgICAgIHNob3dEYXRlU2VsZWN0PXt0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdD17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdH1cbiAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgb25UaW1lQ2hhbmdlPXt0aGlzLmhhbmRsZVRpbWVDaGFuZ2V9XG4gICAgICAgIHRpbWVGb3JtYXQ9e3RoaXMucHJvcHMudGltZUZvcm1hdH1cbiAgICAgICAgdGltZUludGVydmFscz17dGhpcy5wcm9wcy50aW1lSW50ZXJ2YWxzfVxuICAgICAgICBtaW5UaW1lPXt0aGlzLnByb3BzLm1pblRpbWV9XG4gICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgZXhjbHVkZVRpbWVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lc31cbiAgICAgICAgZmlsdGVyVGltZT17dGhpcy5wcm9wcy5maWx0ZXJUaW1lfVxuICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNhbGVuZGFyQ2xhc3NOYW1lfVxuICAgICAgICBjb250YWluZXI9e3RoaXMucHJvcHMuY2FsZW5kYXJDb250YWluZXJ9XG4gICAgICAgIHllYXJJdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyfVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzTW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgbmV4dE1vbnRoQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRNb250aEFyaWFMYWJlbH1cbiAgICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c1llYXJBcmlhTGFiZWx9XG4gICAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0WWVhckFyaWFMYWJlbD17dGhpcy5wcm9wcy5uZXh0WWVhckFyaWFMYWJlbH1cbiAgICAgICAgbmV4dFllYXJCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0WWVhckJ1dHRvbkxhYmVsfVxuICAgICAgICB0aW1lSW5wdXRMYWJlbD17dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgIHJlbmRlckN1c3RvbUhlYWRlcj17dGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXJ9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgcmVuZGVyTW9udGhDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlck1vbnRoQ29udGVudH1cbiAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgIHJlbmRlclllYXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50fVxuICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMucHJvcHMub25EYXlNb3VzZUVudGVyfVxuICAgICAgICBvbk1vbnRoTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZX1cbiAgICAgICAgb25ZZWFyTW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyfVxuICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmV9XG4gICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICBzaG93VGltZUlucHV0PXt0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgIHNob3dNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICBzaG93UXVhcnRlclllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyfVxuICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgZXhjbHVkZVNjcm9sbGJhcj17dGhpcy5wcm9wcy5leGNsdWRlU2Nyb2xsYmFyfVxuICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMub25LZXlEb3dufVxuICAgICAgICBoYW5kbGVPbkRheUtleURvd249e3RoaXMub25EYXlLZXlEb3dufVxuICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5zdGF0ZS5mb2N1c2VkfVxuICAgICAgICBjdXN0b21UaW1lSW5wdXQ9e3RoaXMucHJvcHMuY3VzdG9tVGltZUlucHV0fVxuICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICB5ZWFyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnllYXJDbGFzc05hbWV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9XcmFwcGVkQ2FsZW5kYXI+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc0NvbnRhaW5zVGltZSA9XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdDtcbiAgICBjb25zdCBsb25nRGF0ZUZvcm1hdCA9IGlzQ29udGFpbnNUaW1lID8gXCJQUFBQcFwiIDogXCJQUFBQXCI7XG4gICAgbGV0IGFyaWFMaXZlTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHN0YXJ0IGRhdGU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgbG9jYWxlLFxuICAgICAgICB9LFxuICAgICAgKX0uICR7XG4gICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgID8gXCJFbmQgZGF0ZTogXCIgK1xuICAgICAgICAgICAgc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5lbmREYXRlLCB7XG4gICAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogXCJcIlxuICAgICAgfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgdGltZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgeWVhcjogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJ5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgbW9udGg6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQ6IFwiTU1NTSB5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBxdWFydGVyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogXCJ5eXl5LCBRUVFcIixcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fYXJpYS1saXZlXCJcbiAgICAgID5cbiAgICAgICAge2FyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRhdGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbHN4KHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICBbb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3NdOiB0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjdXN0b21JbnB1dCA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXQgfHwgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgLz47XG4gICAgY29uc3QgY3VzdG9tSW5wdXRSZWYgPSB0aGlzLnByb3BzLmN1c3RvbUlucHV0UmVmIHx8IFwicmVmXCI7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy52YWx1ZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgOiB0eXBlb2YgdGhpcy5zdGF0ZS5pbnB1dFZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgPyB0aGlzLnN0YXRlLmlucHV0VmFsdWVcbiAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgICA/IHNhZmVEYXRlUmFuZ2VGb3JtYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGVcbiAgICAgICAgICAgICAgPyBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXMsIHRoaXMucHJvcHMpXG4gICAgICAgICAgICAgIDogc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcyk7XG5cbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbUlucHV0LCB7XG4gICAgICBbY3VzdG9tSW5wdXRSZWZdOiAoaW5wdXQpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgfSxcbiAgICAgIHZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUJsdXIsXG4gICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uSW5wdXRDbGljayxcbiAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsXG4gICAgICBvbktleURvd246IHRoaXMub25JbnB1dEtleURvd24sXG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgIGZvcm06IHRoaXMucHJvcHMuZm9ybSxcbiAgICAgIGF1dG9Gb2N1czogdGhpcy5wcm9wcy5hdXRvRm9jdXMsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlclRleHQsXG4gICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgIGF1dG9Db21wbGV0ZTogdGhpcy5wcm9wcy5hdXRvQ29tcGxldGUsXG4gICAgICBjbGFzc05hbWU6IGNsc3goY3VzdG9tSW5wdXQucHJvcHMuY2xhc3NOYW1lLCBjbGFzc05hbWUpLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnByb3BzLnJlcXVpcmVkLFxuICAgICAgdGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXgsXG4gICAgICBcImFyaWEtZGVzY3JpYmVkYnlcIjogdGhpcy5wcm9wcy5hcmlhRGVzY3JpYmVkQnksXG4gICAgICBcImFyaWEtaW52YWxpZFwiOiB0aGlzLnByb3BzLmFyaWFJbnZhbGlkLFxuICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGhpcy5wcm9wcy5hcmlhTGFiZWxsZWRCeSxcbiAgICAgIFwiYXJpYS1yZXF1aXJlZFwiOiB0aGlzLnByb3BzLmFyaWFSZXF1aXJlZCxcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NsZWFyYWJsZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgY2xlYXJCdXR0b25UaXRsZSxcbiAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lID0gXCJcIixcbiAgICAgIGFyaWFMYWJlbENsb3NlID0gXCJDbG9zZVwiLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoXG4gICAgICBpc0NsZWFyYWJsZSAmJlxuICAgICAgKHNlbGVjdGVkICE9IG51bGwgfHxcbiAgICAgICAgc3RhcnREYXRlICE9IG51bGwgfHxcbiAgICAgICAgZW5kRGF0ZSAhPSBudWxsIHx8XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM/Lmxlbmd0aClcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb25cIixcbiAgICAgICAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lLFxuICAgICAgICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb24tLWRpc2FibGVkXCI6IGRpc2FibGVkIH0sXG4gICAgICAgICAgKX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsQ2xvc2V9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsZWFyQ2xpY2t9XG4gICAgICAgICAgdGl0bGU9e2NsZWFyQnV0dG9uVGl0bGV9XG4gICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcklucHV0Q29udGFpbmVyKCkge1xuICAgIGNvbnN0IHsgc2hvd0ljb24sIGljb24sIGNhbGVuZGFySWNvbkNsYXNzbmFtZSwgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBvcGVuIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtY29udGFpbmVyJHtcbiAgICAgICAgICBzaG93SWNvbiA/IFwiIHJlYWN0LWRhdGVwaWNrZXJfX3ZpZXctY2FsZW5kYXItaWNvblwiIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAge3Nob3dJY29uICYmIChcbiAgICAgICAgICA8Q2FsZW5kYXJJY29uXG4gICAgICAgICAgICBpY29uPXtpY29ufVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjYWxlbmRhckljb25DbGFzc25hbWV9ICR7XG4gICAgICAgICAgICAgIG9wZW4gJiYgXCJyZWFjdC1kYXRlcGlja2VyLWlnbm9yZS1vbmNsaWNrb3V0c2lkZVwiXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHsuLi4odG9nZ2xlQ2FsZW5kYXJPbkljb25DbGlja1xuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMudG9nZ2xlQ2FsZW5kYXIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGwpfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIHRoaXMucmVuZGVyQXJpYUxpdmVSZWdpb24oKX1cbiAgICAgICAge3RoaXMucmVuZGVyRGF0ZUlucHV0KCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNsZWFyQnV0dG9uKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNhbGVuZGFyID0gdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSByZXR1cm4gY2FsZW5kYXI7XG5cbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBsZXQgcG9ydGFsQ29udGFpbmVyID0gdGhpcy5zdGF0ZS5vcGVuID8gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3BvcnRhbFwiXG4gICAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25Qb3J0YWxLZXlEb3dufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjYWxlbmRhcn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UYWJMb29wPlxuICAgICAgKSA6IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnN0YXRlLm9wZW4gJiYgdGhpcy5wcm9wcy5wb3J0YWxJZCkge1xuICAgICAgICBwb3J0YWxDb250YWluZXIgPSAoXG4gICAgICAgICAgPFBvcnRhbFxuICAgICAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgICA8L1BvcnRhbD5cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICAgIHtwb3J0YWxDb250YWluZXJ9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcHBlckNvbXBvbmVudFxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMucG9wcGVyQ2xhc3NOYW1lfVxuICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLndyYXBwZXJDbGFzc05hbWV9XG4gICAgICAgIGhpZGVQb3BwZXI9eyF0aGlzLmlzQ2FsZW5kYXJPcGVuKCl9XG4gICAgICAgIHBvcnRhbElkPXt0aGlzLnByb3BzLnBvcnRhbElkfVxuICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgIHBvcHBlck1vZGlmaWVycz17dGhpcy5wcm9wcy5wb3BwZXJNb2RpZmllcnN9XG4gICAgICAgIHRhcmdldENvbXBvbmVudD17dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICBwb3BwZXJDb250YWluZXI9e3RoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyfVxuICAgICAgICBwb3BwZXJDb21wb25lbnQ9e2NhbGVuZGFyfVxuICAgICAgICBwb3BwZXJQbGFjZW1lbnQ9e3RoaXMucHJvcHMucG9wcGVyUGxhY2VtZW50fVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcG9wcGVyT25LZXlEb3duPXt0aGlzLm9uUG9wcGVyS2V5RG93bn1cbiAgICAgICAgZW5hYmxlVGFiTG9vcD17dGhpcy5wcm9wcy5lbmFibGVUYWJMb29wfVxuICAgICAgICBzaG93QXJyb3c9e3RoaXMucHJvcHMuc2hvd1BvcHBlckFycm93fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUID0gXCJpbnB1dFwiO1xuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgPSBcIm5hdmlnYXRlXCI7XG4iXSwibmFtZXMiOlsiREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSIiwibG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJuZXdEYXRlIiwidmFsdWUiLCJkIiwiU3RyaW5nIiwicGFyc2VJU08iLCJ0b0RhdGUiLCJEYXRlIiwiaXNWYWxpZCIsInBhcnNlRGF0ZSIsImRhdGVGb3JtYXQiLCJsb2NhbGUiLCJzdHJpY3RQYXJzaW5nIiwibWluRGF0ZSIsInBhcnNlZERhdGUiLCJsb2NhbGVPYmplY3QiLCJnZXRMb2NhbGVPYmplY3QiLCJnZXREZWZhdWx0TG9jYWxlIiwic3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2giLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiZGYiLCJ0cnlQYXJzZURhdGUiLCJwYXJzZSIsInVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyIsInVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMiLCJmb3JtYXREYXRlIiwibWF0Y2giLCJtYXAiLCJzdWJzdHJpbmciLCJmaXJzdENoYXJhY3RlciIsImxvbmdGb3JtYXR0ZXIiLCJsb25nRm9ybWF0dGVycyIsImZvcm1hdExvbmciLCJqb2luIiwibGVuZ3RoIiwic2xpY2UiLCJkYXRlIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdFN0ciIsImZvcm1hdCIsImxvY2FsZU9iaiIsImNvbnNvbGUiLCJ3YXJuIiwiY29uY2F0Iiwic2FmZURhdGVGb3JtYXQiLCJfcmVmIiwic2FmZURhdGVSYW5nZUZvcm1hdCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJwcm9wcyIsImZvcm1hdHRlZFN0YXJ0RGF0ZSIsImZvcm1hdHRlZEVuZERhdGUiLCJzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCIsImRhdGVzIiwiZm9ybWF0dGVkRmlyc3REYXRlIiwiZm9ybWF0dGVkU2Vjb25kRGF0ZSIsImV4dHJhRGF0ZXNDb3VudCIsInNldFRpbWUiLCJfcmVmMiIsIl9yZWYyJGhvdXIiLCJob3VyIiwiX3JlZjIkbWludXRlIiwibWludXRlIiwiX3JlZjIkc2Vjb25kIiwic2Vjb25kIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsImdldFdlZWsiLCJnZXRJU09XZWVrIiwiZ2V0RGF5T2ZXZWVrQ29kZSIsImRheSIsImdldFN0YXJ0T2ZEYXkiLCJzdGFydE9mRGF5IiwiZ2V0U3RhcnRPZldlZWsiLCJjYWxlbmRhclN0YXJ0RGF5Iiwic3RhcnRPZldlZWsiLCJ3ZWVrU3RhcnRzT24iLCJnZXRTdGFydE9mTW9udGgiLCJzdGFydE9mTW9udGgiLCJnZXRTdGFydE9mWWVhciIsInN0YXJ0T2ZZZWFyIiwiZ2V0U3RhcnRPZlF1YXJ0ZXIiLCJzdGFydE9mUXVhcnRlciIsImdldFN0YXJ0T2ZUb2RheSIsImdldEVuZE9mV2VlayIsImVuZE9mV2VlayIsImlzU2FtZVllYXIiLCJkYXRlMSIsImRhdGUyIiwiZGZJc1NhbWVZZWFyIiwiaXNTYW1lTW9udGgiLCJkZklzU2FtZU1vbnRoIiwiaXNTYW1lUXVhcnRlciIsImRmSXNTYW1lUXVhcnRlciIsImlzU2FtZURheSIsImRmSXNTYW1lRGF5IiwiaXNFcXVhbCIsImRmSXNFcXVhbCIsImlzRGF5SW5SYW5nZSIsInZhbGlkIiwic3RhcnQiLCJlbmQiLCJlbmRPZkRheSIsImlzV2l0aGluSW50ZXJ2YWwiLCJlcnIiLCJyZWdpc3RlckxvY2FsZSIsImxvY2FsZU5hbWUiLCJsb2NhbGVEYXRhIiwic2NvcGUiLCJ3aW5kb3ciLCJnbG9iYWxUaGlzIiwiX19sb2NhbGVEYXRhX18iLCJzZXREZWZhdWx0TG9jYWxlIiwiX19sb2NhbGVJZF9fIiwibG9jYWxlU3BlYyIsImdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZSIsImZvcm1hdEZ1bmMiLCJnZXRXZWVrZGF5TWluSW5Mb2NhbGUiLCJnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSIsImdldE1vbnRoSW5Mb2NhbGUiLCJtb250aCIsInNldE1vbnRoIiwiZ2V0TW9udGhTaG9ydEluTG9jYWxlIiwiZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUiLCJxdWFydGVyIiwic2V0UXVhcnRlciIsImlzRGF5RGlzYWJsZWQiLCJfcmVmMyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIm1heERhdGUiLCJleGNsdWRlRGF0ZXMiLCJleGNsdWRlRGF0ZUludGVydmFscyIsImluY2x1ZGVEYXRlcyIsImluY2x1ZGVEYXRlSW50ZXJ2YWxzIiwiZmlsdGVyRGF0ZSIsImlzT3V0T2ZCb3VuZHMiLCJzb21lIiwiZXhjbHVkZURhdGUiLCJfcmVmNCIsImluY2x1ZGVEYXRlIiwiX3JlZjUiLCJpc0RheUV4Y2x1ZGVkIiwiX3JlZjYiLCJfcmVmNyIsImlzTW9udGhEaXNhYmxlZCIsIl9yZWY4IiwiZW5kT2ZNb250aCIsImlzTW9udGhJblJhbmdlIiwibSIsInN0YXJ0RGF0ZVllYXIiLCJnZXRZZWFyIiwic3RhcnREYXRlTW9udGgiLCJnZXRNb250aCIsImVuZERhdGVZZWFyIiwiZW5kRGF0ZU1vbnRoIiwiZGF5WWVhciIsImlzUXVhcnRlckRpc2FibGVkIiwiX3JlZjkiLCJpc1llYXJJblJhbmdlIiwieWVhciIsInN0YXJ0WWVhciIsImVuZFllYXIiLCJpc1llYXJEaXNhYmxlZCIsIl9yZWYxMCIsImVuZE9mWWVhciIsImlzUXVhcnRlckluUmFuZ2UiLCJxIiwic3RhcnREYXRlUXVhcnRlciIsImdldFF1YXJ0ZXIiLCJlbmREYXRlUXVhcnRlciIsIl9yZWYxMSIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImlzVGltZUluTGlzdCIsInRpbWUiLCJ0aW1lcyIsImxpc3RUaW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImlzVGltZURpc2FibGVkIiwiX3JlZjEyIiwiZXhjbHVkZVRpbWVzIiwiaW5jbHVkZVRpbWVzIiwiZmlsdGVyVGltZSIsImlzVGltZUluRGlzYWJsZWRSYW5nZSIsIl9yZWYxMyIsIm1pblRpbWUiLCJtYXhUaW1lIiwiRXJyb3IiLCJiYXNlVGltZSIsIm1pbiIsIm1heCIsIm1vbnRoRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTQiLCJwcmV2aW91c01vbnRoIiwic3ViTW9udGhzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMiLCJldmVyeSIsIm1vbnRoRGlzYWJsZWRBZnRlciIsIl9yZWYxNSIsIm5leHRNb250aCIsImFkZE1vbnRocyIsInF1YXJ0ZXJEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNiIsImZpcnN0RGF0ZU9mWWVhciIsInByZXZpb3VzUXVhcnRlciIsInN1YlF1YXJ0ZXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyIsInF1YXJ0ZXJEaXNhYmxlZEFmdGVyIiwiX3JlZjE3IiwibGFzdERhdGVPZlllYXIiLCJuZXh0UXVhcnRlciIsImFkZFF1YXJ0ZXJzIiwieWVhckRpc2FibGVkQmVmb3JlIiwiX3JlZjE4IiwicHJldmlvdXNZZWFyIiwic3ViWWVhcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIiwieWVhcnNEaXNhYmxlZEJlZm9yZSIsIl9yZWYxOSIsIl9yZWYxOSR5ZWFySXRlbU51bWJlciIsInllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kIiwiZ2V0WWVhcnNQZXJpb2QiLCJlbmRQZXJpb2QiLCJtaW5EYXRlWWVhciIsInllYXJEaXNhYmxlZEFmdGVyIiwiX3JlZjIwIiwibmV4dFllYXIiLCJhZGRZZWFycyIsInllYXJzRGlzYWJsZWRBZnRlciIsIl9yZWYyMSIsIl9yZWYyMSR5ZWFySXRlbU51bWJlciIsIl9nZXRZZWFyc1BlcmlvZDIiLCJzdGFydFBlcmlvZCIsIm1heERhdGVZZWFyIiwiZ2V0RWZmZWN0aXZlTWluRGF0ZSIsIl9yZWYyMiIsIm1pbkRhdGVzIiwiZmlsdGVyIiwiZ2V0RWZmZWN0aXZlTWF4RGF0ZSIsIl9yZWYyMyIsIm1heERhdGVzIiwiZ2V0SGlnaHRMaWdodERheXNNYXAiLCJoaWdobGlnaHREYXRlcyIsImRlZmF1bHRDbGFzc05hbWUiLCJkYXRlQ2xhc3NlcyIsIk1hcCIsImkiLCJsZW4iLCJvYmoiLCJpc0RhdGUiLCJrZXkiLCJjbGFzc05hbWVzQXJyIiwiZ2V0IiwiaW5jbHVkZXMiLCJwdXNoIiwic2V0IiwiX3R5cGVvZiIsImtleXMiLCJPYmplY3QiLCJjbGFzc05hbWUiLCJhcnJPZkRhdGVzIiwiY29uc3RydWN0b3IiLCJrIiwiYXJyYXlzQXJlRXF1YWwiLCJhcnJheTEiLCJhcnJheTIiLCJpbmRleCIsImdldEhvbGlkYXlzTWFwIiwiaG9saWRheURhdGVzIiwiaG9saWRheSIsImRhdGVPYmoiLCJob2xpZGF5TmFtZSIsImNsYXNzTmFtZXNPYmoiLCJob2xpZGF5TmFtZUFyciIsIl90b0NvbnN1bWFibGVBcnJheSIsInRpbWVzVG9JbmplY3RBZnRlciIsImN1cnJlbnRUaW1lIiwiY3VycmVudE11bHRpcGxpZXIiLCJpbnRlcnZhbHMiLCJpbmplY3RlZFRpbWVzIiwibCIsImluamVjdGVkVGltZSIsImFkZEhvdXJzIiwiYWRkTWludXRlcyIsImFkZFNlY29uZHMiLCJuZXh0VGltZSIsImlzQWZ0ZXIiLCJhZGRaZXJvIiwiTWF0aCIsImNlaWwiLCJnZXRIb3Vyc0luRGF5IiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwic3RhcnRPZlRoZU5leHREYXkiLCJyb3VuZCIsInN0YXJ0T2ZNaW51dGUiLCJzZWNvbmRzIiwibWlsbGlzZWNvbmRzIiwiZ2V0TWlsbGlzZWNvbmRzIiwiZ2V0VGltZSIsImlzU2FtZU1pbnV0ZSIsImQxIiwiZDIiLCJnZXRNaWRuaWdodERhdGUiLCJkYXRlV2l0aG91dFRpbWUiLCJpc0RhdGVCZWZvcmUiLCJkYXRlVG9Db21wYXJlIiwibWlkbmlnaHREYXRlIiwibWlkbmlnaHREYXRlVG9Db21wYXJlIiwiaXNTcGFjZUtleURvd24iLCJldmVudCIsIlNQQUNFX0tFWSIsImdlbmVyYXRlWWVhcnMiLCJub09mWWVhciIsImxpc3QiLCJuZXdZZWFyIiwiaXNJblJhbmdlIiwiWWVhckRyb3Bkb3duT3B0aW9ucyIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9jYWxsU3VwZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJzZWxlY3RlZFllYXIiLCJvcHRpb25zIiwic3RhdGUiLCJ5ZWFyc0xpc3QiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJvbkNsaWNrIiwib25DaGFuZ2UiLCJiaW5kIiwibWluWWVhciIsIm1heFllYXIiLCJmaW5kIiwidW5zaGlmdCIsImluY3JlbWVudFllYXJzIiwiZGVjcmVtZW50WWVhcnMiLCJvbkNhbmNlbCIsImFtb3VudCIsInllYXJzIiwic2V0U3RhdGUiLCJzaGlmdFllYXJzIiwieWVhckRyb3Bkb3duSXRlbU51bWJlciIsInNjcm9sbGFibGVZZWFyRHJvcGRvd24iLCJkcm9wZG93blJlZiIsImNyZWF0ZVJlZiIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImNvbXBvbmVudERpZE1vdW50IiwiZHJvcGRvd25DdXJyZW50IiwiY3VycmVudCIsImRyb3Bkb3duQ3VycmVudENoaWxkcmVuIiwiY2hpbGRyZW4iLCJmcm9tIiwic2VsZWN0ZWRZZWFyT3B0aW9uRWwiLCJjaGlsZEVsIiwiYXJpYVNlbGVjdGVkIiwic2Nyb2xsVG9wIiwib2Zmc2V0VG9wIiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwicmVuZGVyIiwiZHJvcGRvd25DbGFzcyIsImNsc3giLCJyZWYiLCJyZW5kZXJPcHRpb25zIiwiQ29tcG9uZW50IiwiV3JhcHBlZFllYXJEcm9wZG93bk9wdGlvbnMiLCJvbkNsaWNrT3V0c2lkZSIsIlllYXJEcm9wZG93biIsIl9sZW4iLCJhcmdzIiwiX2tleSIsImRyb3Bkb3duVmlzaWJsZSIsImUiLCJ0YXJnZXQiLCJvblNlbGVjdENoYW5nZSIsInJlbmRlclNlbGVjdE9wdGlvbnMiLCJ2aXNpYmxlIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwidG9nZ2xlRHJvcGRvd24iLCJyZXN1bHQiLCJyZW5kZXJSZWFkVmlldyIsInJlbmRlckRyb3Bkb3duIiwiYWRqdXN0RGF0ZU9uQ2hhbmdlIiwiaGFuZGxlWWVhckNoYW5nZSIsIm9uU2VsZWN0Iiwic2V0T3BlbiIsInJlbmRlcmVkRHJvcGRvd24iLCJkcm9wZG93bk1vZGUiLCJyZW5kZXJTY3JvbGxNb2RlIiwicmVuZGVyU2VsZWN0TW9kZSIsIk1vbnRoRHJvcGRvd25PcHRpb25zIiwibW9udGhOYW1lcyIsImlzU2VsZWN0ZWRNb250aCIsIldyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyIsIk1vbnRoRHJvcGRvd24iLCJNIiwiX3RoaXMyIiwidXNlU2hvcnRNb250aEluRHJvcGRvd24iLCJ1dGlscyIsImdlbmVyYXRlTW9udGhZZWFycyIsImN1cnJEYXRlIiwibGFzdERhdGUiLCJNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJtb250aFllYXJzTGlzdCIsIm1vbnRoWWVhciIsIm1vbnRoWWVhclBvaW50IiwiaXNTYW1lTW9udGhZZWFyIiwic2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duIiwiV3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIk1vbnRoWWVhckRyb3Bkb3duIiwidGltZVBvaW50IiwieWVhck1vbnRoIiwiY2hhbmdlZERhdGUiLCJwYXJzZUludCIsIkRheSIsImlzRGlzYWJsZWQiLCJvbk1vdXNlRW50ZXIiLCJldmVudEtleSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlT25LZXlEb3duIiwib3RoZXIiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQiLCJkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiIsImlzU2VsZWN0ZWREYXRlIiwic2VsZWN0c011bHRpcGxlIiwic2VsZWN0ZWREYXRlcyIsImlzU2FtZURheU9yV2VlayIsInNlbGVjdGVkIiwicHJlU2VsZWN0aW9uIiwic2hvd1dlZWtQaWNrZXIiLCJpc1NhbWVXZWVrIiwiX3RoaXMkcHJvcHMiLCJkYXlTdHIiLCJfdGhpcyRwcm9wczIiLCJob2xpZGF5cyIsImhhcyIsIl90aGlzJHByb3BzMyIsIl90aGlzJHByb3BzJHNlbGVjdGluZyIsIl90aGlzJHByb3BzNCIsInNlbGVjdHNTdGFydCIsInNlbGVjdHNFbmQiLCJzZWxlY3RzUmFuZ2UiLCJzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSIsInNlbGVjdGluZ0RhdGUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmcyIiwiaXNJblNlbGVjdGluZ1JhbmdlIiwiX3RoaXMkcHJvcHM1IiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMyIsIl90aGlzJHByb3BzNiIsIl90aGlzJHByb3BzNyIsIl90aGlzJHByb3BzOCIsIndlZWtkYXkiLCJnZXREYXkiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQyIiwiZGF5Q2xhc3NOYW1lIiwiaXNFeGNsdWRlZCIsImlzU2VsZWN0ZWQiLCJpc0tleWJvYXJkU2VsZWN0ZWQiLCJpc1JhbmdlU3RhcnQiLCJpc1JhbmdlRW5kIiwiaXNTZWxlY3RpbmdSYW5nZVN0YXJ0IiwiaXNTZWxlY3RpbmdSYW5nZUVuZCIsImlzQ3VycmVudERheSIsImlzV2Vla2VuZCIsImlzQWZ0ZXJNb250aCIsImlzQmVmb3JlTW9udGgiLCJnZXRIaWdoTGlnaHRlZENsYXNzIiwiZ2V0SG9saWRheXNDbGFzcyIsIl90aGlzJHByb3BzOSIsIl90aGlzJHByb3BzOSRhcmlhTGFiZSIsImFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkIiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlMiIsImFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZCIsInByZWZpeCIsIl90aGlzJHByb3BzMTAiLCJfdGhpcyRwcm9wczEwJGhvbGlkYXkiLCJjb21wYXJlRHQiLCJ0aXRsZXMiLCJhcHBseSIsImhvbGlkYXlOYW1lcyIsIm1lc3NhZ2UiLCJzZWxlY3RlZERheSIsInByZVNlbGVjdGlvbkRheSIsInRhYkluZGV4Iiwic2hvd1dlZWtOdW1iZXIiLCJpc1N0YXJ0T2ZXZWVrIiwiX3RoaXMkZGF5RWwkY3VycmVudCIsInByZXZQcm9wcyIsInNob3VsZEZvY3VzRGF5IiwiZ2V0VGFiSW5kZXgiLCJpc0lucHV0Rm9jdXNlZCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImJvZHkiLCJpbmxpbmUiLCJzaG91bGRGb2N1c0RheUlubGluZSIsImNvbnRhaW5lclJlZiIsImNvbnRhaW5zIiwiY2xhc3NMaXN0IiwibW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0IiwiZGF5RWwiLCJmb2N1cyIsInByZXZlbnRTY3JvbGwiLCJyZW5kZXJEYXlDb250ZW50cyIsImdldENsYXNzTmFtZXMiLCJvbktleURvd24iLCJoYW5kbGVDbGljayIsInVzZVBvaW50ZXJFdmVudCIsImhhbmRsZU1vdXNlRW50ZXIiLCJvblBvaW50ZXJFbnRlciIsImdldEFyaWFMYWJlbCIsInJvbGUiLCJ0aXRsZSIsImdldFRpdGxlIiwiaGFuZGxlRm9jdXNEYXkiLCJjb21wb25lbnREaWRVcGRhdGUiLCJXZWVrTnVtYmVyIiwic2hvdWxkRm9jdXNXZWVrTnVtYmVyIiwid2Vla051bWJlckVsIiwiaGFuZGxlRm9jdXNXZWVrTnVtYmVyIiwid2Vla051bWJlciIsIl90aGlzJHByb3BzJGFyaWFMYWJlbCIsImFyaWFMYWJlbFByZWZpeCIsIndlZWtOdW1iZXJDbGFzc2VzIiwiV2VlayIsIm9uRGF5Q2xpY2siLCJvbkRheU1vdXNlRW50ZXIiLCJvbldlZWtTZWxlY3QiLCJoYW5kbGVEYXlDbGljayIsInNob3VsZENsb3NlT25TZWxlY3QiLCJmb3JtYXRXZWVrTnVtYmVyIiwiZGF5cyIsIm9uQ2xpY2tBY3Rpb24iLCJoYW5kbGVXZWVrQ2xpY2siLCJvZmZzZXQiLCJhZGREYXlzIiwiY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4IiwiZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXgiLCJ2YWx1ZU9mIiwiaGFuZGxlRGF5TW91c2VFbnRlciIsInJlbmRlckRheXMiLCJGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVCIsIk1PTlRIX0NPTFVNTlNfTEFZT1VUIiwiVFdPX0NPTFVNTlMiLCJUSFJFRV9DT0xVTU5TIiwiRk9VUl9DT0xVTU5TIiwiTU9OVEhfQ09MVU1OUyIsImdyaWQiLCJ2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQiLCJNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUIiwiZ2V0TW9udGhDb2x1bW5zTGF5b3V0Iiwic2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIiLCJzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyIiwiTW9udGgiLCJvcmRlckluRGlzcGxheSIsIm9uTW91c2VMZWF2ZSIsImlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoIiwiX21vbnRoIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nNCIsIndlZWtzIiwiaXNGaXhlZEhlaWdodCIsImZpeGVkSGVpZ2h0IiwiYnJlYWtBZnRlck5leHRQdXNoIiwiY3VycmVudFdlZWtTdGFydCIsIndlZWtBcmlhTGFiZWxQcmVmaXgiLCJzaG93V2Vla051bWJlcnMiLCJpc0ZpeGVkQW5kRmluYWxXZWVrIiwiaXNOb25GaXhlZEFuZE91dE9mTW9udGgiLCJpc1dlZWtJbk1vbnRoIiwicGVla05leHRNb250aCIsImxhYmVsRGF0ZSIsIm5ld01vbnRoIiwic2V0UHJlU2VsZWN0aW9uIiwiTU9OVEhfUkVGUyIsImhhbmRsZU9uTW9udGhLZXlEb3duIiwibW9udGhDb2x1bW5zTGF5b3V0IiwidmVydGljYWxPZmZzZXQiLCJtb250aHNHcmlkIiwib25Nb250aENsaWNrIiwiaGFuZGxlTW9udGhOYXZpZ2F0aW9uIiwibmV3UXVhcnRlciIsIlFVQVJURVJfUkVGUyIsIm9uUXVhcnRlckNsaWNrIiwiaGFuZGxlUXVhcnRlck5hdmlnYXRpb24iLCJtb250aENsYXNzTmFtZSIsIl9tb250aENsYXNzTmFtZSIsImlzUmFuZ2VTdGFydE1vbnRoIiwiaXNSYW5nZUVuZE1vbnRoIiwiaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQiLCJpc0N1cnJlbnRNb250aCIsInByZVNlbGVjdGVkTW9udGgiLCJwcmVTZWxlY3RlZFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczExIiwiX3RoaXMkcHJvcHMxMSRjaG9vc2VEIiwiX3RoaXMkcHJvcHMxMSRkaXNhYmxlIiwiX3RoaXMkcHJvcHMxMiIsImlzU2VsZWN0ZWRRdWFydGVyIiwiaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciIsImlzUmFuZ2VTdGFydFF1YXJ0ZXIiLCJpc1JhbmdlRW5kUXVhcnRlciIsIl90aGlzJHByb3BzMTMiLCJzaG93RnVsbE1vbnRoWWVhclBpY2tlciIsInJlbmRlck1vbnRoQ29udGVudCIsInNob3J0TW9udGhUZXh0IiwiZnVsbE1vbnRoVGV4dCIsIl90aGlzJHByb3BzMTQiLCJyZW5kZXJRdWFydGVyQ29udGVudCIsInNob3J0UXVhcnRlciIsIl90aGlzJHByb3BzMTUiLCJtb250aENvbHVtbnMiLCJqIiwiZXYiLCJvbk1vbnRoS2V5RG93biIsIm9uTW9udGhNb3VzZUVudGVyIiwiZ2V0TW9udGhDbGFzc05hbWVzIiwiZ2V0TW9udGhDb250ZW50IiwiX3RoaXMkcHJvcHMxNiIsInF1YXJ0ZXJzIiwib25RdWFydGVyS2V5RG93biIsIm9uUXVhcnRlck1vdXNlRW50ZXIiLCJnZXRRdWFydGVyQ2xhc3NOYW1lcyIsImdldFF1YXJ0ZXJUYWJJbmRleCIsImlzQ3VycmVudFF1YXJ0ZXIiLCJnZXRRdWFydGVyQ29udGVudCIsIl90aGlzJHByb3BzMTciLCJzaG93TW9udGhZZWFyUGlja2VyIiwic2hvd1F1YXJ0ZXJZZWFyUGlja2VyIiwiX3RoaXMkcHJvcHMxOCIsIl90aGlzJHByb3BzMTgkYXJpYUxhYiIsImZvcm1hdHRlZEFyaWFMYWJlbFByZWZpeCIsInRyaW0iLCJoYW5kbGVNb3VzZUxlYXZlIiwib25Qb2ludGVyTGVhdmUiLCJyZW5kZXJNb250aHMiLCJyZW5kZXJRdWFydGVycyIsInJlbmRlcldlZWtzIiwiVGltZSIsImhlaWdodCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNlbnRlckxpIiwiY2FsY0NlbnRlclBvc2l0aW9uIiwibW9udGhSZWYiLCJoZWFkZXIiLCJjbGFzc2VzIiwidGltZUNsYXNzTmFtZSIsImlzU2VsZWN0ZWRUaW1lIiwiaXNEaXNhYmxlZFRpbWUiLCJpbmplY3RUaW1lcyIsInByZXZpb3VzU2libGluZyIsIm5leHRTaWJsaW5nIiwiYWN0aXZlRGF0ZSIsIm9wZW5Ub0RhdGUiLCJiYXNlIiwic29ydGVkSW5qZWN0VGltZXMiLCJzb3J0IiwiYSIsImIiLCJtaW51dGVzSW5EYXkiLCJtdWx0aXBsaWVyIiwidGltZXNUb0luamVjdCIsInRpbWVUb0ZvY3VzIiwicmVkdWNlIiwicHJldiIsImxpQ2xhc3NlcyIsImxpIiwic2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUiLCJ0b2RheUJ1dHRvbiIsInNob3dUaW1lU2VsZWN0T25seSIsInRpbWVDYXB0aW9uIiwicmVuZGVyVGltZXMiLCJvblRpbWVDaGFuZ2UiLCJsaXN0SGVpZ2h0IiwiY2VudGVyTGlSZWYiLCJZZWFyIiwicmVmSW5kZXgiLCJ3YWl0Rm9yUmVSZW5kZXIiLCJZRUFSX1JFRlMiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QiLCJ1cGRhdGVGb2N1c09uUGFnaW5hdGUiLCJ5IiwiX3llYXIiLCJoYW5kbGVZZWFyQ2xpY2siLCJvblllYXJDbGljayIsImhhbmRsZVllYXJOYXZpZ2F0aW9uIiwieWVhckNsYXNzTmFtZSIsImlzQ3VycmVudFllYXIiLCJwcmVTZWxlY3RlZCIsInJlbmRlclllYXJDb250ZW50Iiwib25ZZWFyTW91c2VFbnRlciIsIm9uWWVhck1vdXNlTGVhdmUiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QyIiwiX2xvb3AiLCJvblllYXJLZXlEb3duIiwiZ2V0WWVhclRhYkluZGV4IiwiZ2V0WWVhckNsYXNzTmFtZXMiLCJnZXRZZWFyQ29udGVudCIsImdldFllYXJDb250YWluZXJDbGFzc05hbWVzIiwiY2xlYXJTZWxlY3RpbmdEYXRlIiwiaW5wdXRUaW1lIiwicHJvcERhdGUiLCJpc1Byb3BEYXRlVmFsaWQiLCJpc05hTiIsInNwbGl0IiwidGltZVN0cmluZyIsImN1c3RvbVRpbWVJbnB1dCIsImNsb25lRWxlbWVudCIsInR5cGUiLCJwbGFjZWhvbGRlciIsIm5hbWUiLCJyZXF1aXJlZCIsInRpbWVJbnB1dExhYmVsIiwicmVuZGVyVGltZUlucHV0IiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwiQ2FsZW5kYXJDb250YWluZXIiLCJfcmVmJHNob3dUaW1lU2VsZWN0T24iLCJfcmVmJHNob3dUaW1lIiwic2hvd1RpbWUiLCJhcmlhTGFiZWwiLCJEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTIiwiaXNEcm9wZG93blNlbGVjdCIsImVsZW1lbnQiLCJjbGFzc05hbWVzIiwidGVzdENsYXNzbmFtZSIsImluZGV4T2YiLCJDYWxlbmRhciIsIm9uRHJvcGRvd25Gb2N1cyIsImluaXRpYWxEYXRlIiwiaGFuZGxlTW9udGhDaGFuZ2UiLCJtb250aFNlbGVjdGVkSW4iLCJvbk1vbnRoTW91c2VMZWF2ZSIsInNldFllYXIiLCJvblllYXJDaGFuZ2UiLCJpc1JlbmRlckFyaWFMaXZlTWVzc2FnZSIsImhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlIiwib25Nb250aENoYW5nZSIsImhhbmRsZU1vbnRoWWVhckNoYW5nZSIsImRheU5hbWVzIiwid2Vla0xhYmVsIiwid2Vla0RheU5hbWUiLCJmb3JtYXRXZWVrZGF5Iiwid2Vla0RheUNsYXNzTmFtZSIsImZvcm1hdFdlZWtEYXkiLCJ1c2VXZWVrZGF5c1Nob3J0Iiwic2hvd1llYXJQaWNrZXIiLCJyZW5kZXJDdXN0b21IZWFkZXIiLCJhbGxQcmV2RGF5c0Rpc2FibGVkIiwiZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uIiwic2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uIiwiaWNvbkNsYXNzZXMiLCJjbGlja0hhbmRsZXIiLCJkZWNyZWFzZU1vbnRoIiwiZGVjcmVhc2VZZWFyIiwiaXNGb3JZZWFyIiwicHJldmlvdXNNb250aEJ1dHRvbkxhYmVsIiwicHJldmlvdXNZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMiLCJwcmV2aW91c01vbnRoQXJpYUxhYmVsIiwiX3RoaXMkcHJvcHMzJHByZXZpb3VzMiIsInByZXZpb3VzWWVhckFyaWFMYWJlbCIsImFsbE5leHREYXlzRGlzYWJsZWQiLCJzaG93VGltZVNlbGVjdCIsImluY3JlYXNlTW9udGgiLCJpbmNyZWFzZVllYXIiLCJuZXh0TW9udGhCdXR0b25MYWJlbCIsIm5leHRZZWFyQnV0dG9uTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dE1vbnQiLCJuZXh0TW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczUkbmV4dFllYXIiLCJuZXh0WWVhckFyaWFMYWJlbCIsInNob3dZZWFyRHJvcGRvd24iLCJzaG93TW9udGhEcm9wZG93biIsInNob3dNb250aFllYXJEcm9wZG93biIsIm92ZXJyaWRlSGlkZSIsImNoYW5nZVllYXIiLCJjaGFuZ2VNb250aCIsImNoYW5nZU1vbnRoWWVhciIsImhhbmRsZVRvZGF5QnV0dG9uQ2xpY2siLCJtb250aERhdGUiLCJyZW5kZXJDdXJyZW50TW9udGgiLCJvbkZvY3VzIiwiaGFuZGxlRHJvcGRvd25Gb2N1cyIsInJlbmRlck1vbnRoRHJvcGRvd24iLCJyZW5kZXJNb250aFllYXJEcm9wZG93biIsInJlbmRlclllYXJEcm9wZG93biIsImhlYWRlckFyZ3MiLCJtb250aENvbnRhaW5lciIsInByZXZNb250aEJ1dHRvbkRpc2FibGVkIiwibmV4dE1vbnRoQnV0dG9uRGlzYWJsZWQiLCJwcmV2WWVhckJ1dHRvbkRpc2FibGVkIiwibmV4dFllYXJCdXR0b25EaXNhYmxlZCIsInNob3dEYXlOYW1lcyIsIl9vYmplY3RTcHJlYWQiLCJjdXN0b21IZWFkZXJDb3VudCIsInJlbmRlclllYXJIZWFkZXIiLCJyZW5kZXJEZWZhdWx0SGVhZGVyIiwiX3RoaXMkcHJvcHMkbW9udGhTZWxlIiwibW9udGhMaXN0IiwibW9udGhzVG9TdWJ0cmFjdCIsInNob3dQcmV2aW91c01vbnRocyIsIm1vbnRoc1Nob3duIiwiZnJvbU1vbnRoRGF0ZSIsIm1vbnRoc1RvQWRkIiwibW9udGhLZXkiLCJkaXYiLCJyZW5kZXJIZWFkZXIiLCJtb250aEFyaWFMYWJlbFByZWZpeCIsImhhbmRsZU9uRGF5S2V5RG93biIsImhhbmRsZU1vbnRoTW91c2VMZWF2ZSIsIl9leHRlbmRzIiwiaGFuZGxlWWVhck1vdXNlRW50ZXIiLCJoYW5kbGVZZWFyTW91c2VMZWF2ZSIsInRpbWVGb3JtYXQiLCJ0aW1lSW50ZXJ2YWxzIiwid2l0aFBvcnRhbCIsInRpbWVWYWxpZCIsIkJvb2xlYW4iLCJzaG93VGltZUlucHV0IiwiSW5wdXRUaW1lIiwiYXJpYUxpdmVNZXNzYWdlIiwiZ2V0RGF0ZUluVmlldyIsImFzc2lnbk1vbnRoQ29udGFpbmVyIiwiX3RoaXMzIiwiaGFzTW9udGhDaGFuZ2VkIiwiQ29udGFpbmVyIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInJlbmRlckFyaWFMaXZlUmVnaW9uIiwicmVuZGVyUHJldmlvdXNCdXR0b24iLCJyZW5kZXJOZXh0QnV0dG9uIiwicmVuZGVyWWVhcnMiLCJyZW5kZXJUb2RheUJ1dHRvbiIsInJlbmRlclRpbWVTZWN0aW9uIiwicmVuZGVySW5wdXRUaW1lU2VjdGlvbiIsInJlbmRlckNoaWxkcmVuIiwiQ2FsZW5kYXJJY29uIiwiaWNvbiIsIl9yZWYkY2xhc3NOYW1lIiwiZGVmYXVsdENsYXNzIiwiaXNWYWxpZEVsZW1lbnQiLCJ4bWxucyIsInZpZXdCb3giLCJQb3J0YWwiLCJlbCIsInBvcnRhbFJvb3QiLCJwb3J0YWxIb3N0IiwiZ2V0RWxlbWVudEJ5SWQiLCJwb3J0YWxJZCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVDaGlsZCIsIlJlYWN0RE9NIiwiY3JlYXRlUG9ydGFsIiwiZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciIsImZvY3VzYWJsZUZpbHRlciIsIm5vZGUiLCJkaXNhYmxlZCIsIlRhYkxvb3AiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFiTG9vcFJlZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YWJDaGlsZHJlbiIsImdldFRhYkNoaWxkcmVuIiwiZW5hYmxlVGFiTG9vcCIsImhhbmRsZUZvY3VzU3RhcnQiLCJoYW5kbGVGb2N1c0VuZCIsIndpdGhGbG9hdGluZyIsIldpdGhGbG9hdGluZyIsImFsdF9wcm9wcyIsInBvcHBlck1vZGlmaWVycyIsInBvcHBlclByb3BzIiwiaGlkZVBvcHBlciIsImFycm93UmVmIiwidXNlUmVmIiwiZmxvYXRpbmdQcm9wcyIsInVzZUZsb2F0aW5nIiwib3BlbiIsIndoaWxlRWxlbWVudHNNb3VudGVkIiwiYXV0b1VwZGF0ZSIsInBsYWNlbWVudCIsInBvcHBlclBsYWNlbWVudCIsIm1pZGRsZXdhcmUiLCJmbGlwIiwicGFkZGluZyIsImFycm93IiwiUG9wcGVyQ29tcG9uZW50Iiwid3JhcHBlckNsYXNzTmFtZSIsInBvcHBlckNvbXBvbmVudCIsInRhcmdldENvbXBvbmVudCIsInBvcHBlck9uS2V5RG93biIsInNob3dBcnJvdyIsInBvcHBlciIsInJlZnMiLCJzZXRGbG9hdGluZyIsImZsb2F0aW5nU3R5bGVzIiwiRmxvYXRpbmdBcnJvdyIsImNvbnRleHQiLCJmaWxsIiwic3Ryb2tlV2lkdGgiLCJ3aWR0aCIsInRyYW5zZm9ybSIsInBvcHBlckNvbnRhaW5lciIsIndyYXBwZXJDbGFzc2VzIiwiRnJhZ21lbnQiLCJzZXRSZWZlcmVuY2UiLCJvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzcyIsIldyYXBwZWRDYWxlbmRhciIsImhhc1ByZVNlbGVjdGlvbkNoYW5nZWQiLCJJTlBVVF9FUlJfMSIsIkRhdGVQaWNrZXIiLCJfdGhpcyRwcm9wcyRob2xpZGF5cyIsImFjY3VtdWxhdG9yIiwiZGVmYXVsdFByZVNlbGVjdGlvbiIsImdldFByZVNlbGVjdGlvbiIsImJvdW5kZWRQcmVTZWxlY3Rpb24iLCJzdGFydE9wZW4iLCJwcmV2ZW50Rm9jdXMiLCJmb2N1c2VkIiwicHJldmVudEZvY3VzVGltZW91dCIsImNsZWFyVGltZW91dCIsImlucHV0IiwiYmx1ciIsImNhbmNlbEZvY3VzSW5wdXQiLCJza2lwU2V0Qmx1ciIsImNhbGNJbml0aWFsU3RhdGUiLCJsYXN0UHJlU2VsZWN0Q2hhbmdlIiwiUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUiLCJzZXRCbHVyIiwiaW5wdXRWYWx1ZSIsInJlYWRPbmx5IiwicHJldmVudE9wZW5PbkZvY3VzIiwiY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0Iiwic2V0VGltZW91dCIsInNldEZvY3VzIiwiaW5wdXRGb2N1c1RpbWVvdXQiLCJvbkJsdXIiLCJhbGxBcmdzIiwib25DaGFuZ2VSYXciLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCIsImhvdXJzIiwibWludXRlcyIsInNldFNlbGVjdGVkIiwic2VuZEZvY3VzQmFja1RvSW5wdXQiLCJzaG93RGF0ZVNlbGVjdCIsInN3YXBSYW5nZSIsImtlZXBJbnB1dCIsImFsbG93U2FtZURheSIsImZvY3VzU2VsZWN0ZWRNb250aCIsIm5vUmFuZ2VzIiwiaGFzU3RhcnRSYW5nZSIsImlzUmFuZ2VGaWxsZWQiLCJpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkIiwic2VsZWN0ZWREYXRlIiwibmV4dERhdGVzIiwiaGFzTWluRGF0ZSIsImhhc01heERhdGUiLCJpc1ZhbGlkRGF0ZVNlbGVjdGlvbiIsImRhdGVTdGFydE9mRGF5IiwibWluRGF0ZVN0YXJ0T2ZEYXkiLCJtYXhEYXRlRW5kT2ZEYXkiLCJvbklucHV0Q2xpY2siLCJzZWxlY3RvclN0cmluZyIsInNlbGVjdGVkSXRlbSIsImNhbGVuZGFyIiwiY29tcG9uZW50Tm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjb3B5IiwiaW5wdXRPayIsImhhbmRsZVNlbGVjdCIsIm9uSW5wdXRFcnJvciIsImNvZGUiLCJtc2ciLCJpc1NoaWZ0S2V5QWN0aXZlIiwic2hpZnRLZXkiLCJuZXdTZWxlY3Rpb24iLCJzdWJXZWVrcyIsInN1YkRheXMiLCJhZGRXZWVrcyIsInByZXZNb250aCIsInByZXZZZWFyIiwib25DbGVhckNsaWNrIiwiY2xvc2VPblNjcm9sbCIsImRvY3VtZW50RWxlbWVudCIsImlzQ2FsZW5kYXJPcGVuIiwiZWxlbSIsImRhdGVGb3JtYXRDYWxlbmRhciIsImhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlIiwibW9kaWZ5SG9saWRheXMiLCJoYW5kbGVUaW1lQ2hhbmdlIiwiY2FsZW5kYXJDbGFzc05hbWUiLCJjYWxlbmRhckNvbnRhaW5lciIsImV4Y2x1ZGVTY3JvbGxiYXIiLCJvbkRheUtleURvd24iLCJpc0NvbnRhaW5zVGltZSIsImxvbmdEYXRlRm9ybWF0IiwiX1JlYWN0JGNsb25lRWxlbWVudCIsImN1c3RvbUlucHV0IiwiY3VzdG9tSW5wdXRSZWYiLCJoYW5kbGVCbHVyIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlRm9jdXMiLCJvbklucHV0S2V5RG93biIsImlkIiwiZm9ybSIsImF1dG9Gb2N1cyIsInBsYWNlaG9sZGVyVGV4dCIsImF1dG9Db21wbGV0ZSIsImFyaWFEZXNjcmliZWRCeSIsImFyaWFJbnZhbGlkIiwiYXJpYUxhYmVsbGVkQnkiLCJhcmlhUmVxdWlyZWQiLCJpc0NsZWFyYWJsZSIsImNsZWFyQnV0dG9uVGl0bGUiLCJfdGhpcyRwcm9wczQkY2xlYXJCdXQiLCJjbGVhckJ1dHRvbkNsYXNzTmFtZSIsIl90aGlzJHByb3BzNCRhcmlhTGFiZSIsImFyaWFMYWJlbENsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU2Nyb2xsIiwicHJldlN0YXRlIiwib25DYWxlbmRhck9wZW4iLCJvbkNhbGVuZGFyQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVySW5wdXRDb250YWluZXIiLCJzaG93SWNvbiIsImNhbGVuZGFySWNvbkNsYXNzbmFtZSIsInRvZ2dsZUNhbGVuZGFyT25JY29uQ2xpY2siLCJ0b2dnbGVDYWxlbmRhciIsInJlbmRlckRhdGVJbnB1dCIsInJlbmRlckNsZWFyQnV0dG9uIiwicmVuZGVyQ2FsZW5kYXIiLCJwb3J0YWxDb250YWluZXIiLCJvblBvcnRhbEtleURvd24iLCJwb3BwZXJDbGFzc05hbWUiLCJvblBvcHBlcktleURvd24iLCJzaG93UG9wcGVyQXJyb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkRPLElBQU1BLHdCQUF3QixHQUFHLEVBQUUsQ0FBQTs7QUFFMUM7QUFDQTtBQUNBLElBQU1DLDBCQUEwQixHQUFHLG1DQUFtQyxDQUFBOztBQUV0RTs7QUFFTyxTQUFTQyxPQUFPQSxDQUFDQyxLQUFLLEVBQUU7RUFDN0IsSUFBTUMsQ0FBQyxHQUFHRCxLQUFL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
