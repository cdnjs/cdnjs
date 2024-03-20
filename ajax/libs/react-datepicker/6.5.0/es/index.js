/*!
  react-datepicker v6.5.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
import React, { createRef } from 'react';
import 'prop-types';
import classnames from 'classnames';
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
    return getHours(listTime) === getHours(time) && getMinutes(listTime) === getMinutes(time);
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
  var baseTime = setHours(setMinutes(base, getMinutes(time)), getHours(time));
  var min = setHours(setMinutes(base, getMinutes(minTime)), getHours(minTime));
  var max = setHours(setMinutes(base, getMinutes(maxTime)), getHours(maxTime));
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
function yearDisabledBefore(day) {
  var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    minDate = _ref16.minDate,
    includeDates = _ref16.includeDates;
  var previousYear = subYears(day, 1);
  return minDate && differenceInCalendarYears(minDate, previousYear) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarYears(includeDate, previousYear) > 0;
  }) || false;
}
function yearsDisabledBefore(day) {
  var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    minDate = _ref17.minDate,
    _ref17$yearItemNumber = _ref17.yearItemNumber,
    yearItemNumber = _ref17$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref17$yearItemNumber;
  var previousYear = getStartOfYear(subYears(day, yearItemNumber));
  var _getYearsPeriod = getYearsPeriod(previousYear, yearItemNumber),
    endPeriod = _getYearsPeriod.endPeriod;
  var minDateYear = minDate && getYear(minDate);
  return minDateYear && minDateYear > endPeriod || false;
}
function yearDisabledAfter(day) {
  var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    maxDate = _ref18.maxDate,
    includeDates = _ref18.includeDates;
  var nextYear = addYears(day, 1);
  return maxDate && differenceInCalendarYears(nextYear, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarYears(nextYear, includeDate) > 0;
  }) || false;
}
function yearsDisabledAfter(day) {
  var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    maxDate = _ref19.maxDate,
    _ref19$yearItemNumber = _ref19.yearItemNumber,
    yearItemNumber = _ref19$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref19$yearItemNumber;
  var nextYear = addYears(day, yearItemNumber);
  var _getYearsPeriod2 = getYearsPeriod(nextYear, yearItemNumber),
    startPeriod = _getYearsPeriod2.startPeriod;
  var maxDateYear = maxDate && getYear(maxDate);
  return maxDateYear && maxDateYear < startPeriod || false;
}
function getEffectiveMinDate(_ref20) {
  var minDate = _ref20.minDate,
    includeDates = _ref20.includeDates;
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
function getEffectiveMaxDate(_ref21) {
  var maxDate = _ref21.maxDate,
    includeDates = _ref21.includeDates;
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
    var injectedTime = addMinutes(addHours(startOfDay, getHours(injectedTimes[i])), getMinutes(injectedTimes[i]));
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
      var dropdownClass = classnames({
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
      var dropdownClass = classnames({
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
      return classnames("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
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
        className: classnames(weekNumberClasses),
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
        className: classnames(weekNumberClasses)
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
      return classnames("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
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
      return classnames("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
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
      return classnames("react-datepicker__month", {
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
      if (_this.props.injectTimes && (getHours(time) * 60 + getMinutes(time)) % _this.props.intervals !== 0) {
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
        minDate = _this$props5.minDate,
        maxDate = _this$props5.maxDate,
        selected = _this$props5.selected,
        excludeDates = _this$props5.excludeDates,
        includeDates = _this$props5.includeDates,
        filterDate = _this$props5.filterDate;
      return classnames("react-datepicker__year-text", {
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
      return classnames("react-datepicker__year", {
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
          className: classnames("react-datepicker__day-name", weekDayClassName)
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
        className: classnames("react-datepicker", this.props.className, {
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
        var classes = classnames("react-datepicker-popper", className);
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
      var wrapperClasses = classnames("react-datepicker-wrapper", wrapperClassName);
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
        if (startDate && !endDate && !isDateBefore(date, startDate)) {
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
        minTime = _this$props2.minTime;
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
      return /*#__PURE__*/React.createElement("span", {
        role: "alert",
        "aria-live": "polite",
        className: "react-datepicker__aria-live"
      }, ariaLiveMessage);
    });
    _defineProperty(_this, "renderDateInput", function () {
      var _React$cloneElement;
      var className = classnames(_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));
      var customInput = _this.props.customInput || /*#__PURE__*/React.createElement("input", {
        type: "text"
      });
      var customInputRef = _this.props.customInputRef || "ref";
      var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : _this.props.selectsRange ? safeDateRangeFormat(_this.props.startDate, _this.props.endDate, _this.props) : _this.props.selectsMultiple ? safeMultipleDatesFormat(_this.props.selectedDates, _this.props) : safeDateFormat(_this.props.selected, _this.props);
      return /*#__PURE__*/React.cloneElement(customInput, (_React$cloneElement = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, customInputRef, function (input) {
        _this.input = input;
      }), "value", inputValue), "onBlur", _this.handleBlur), "onChange", _this.handleChange), "onClick", _this.onInputClick), "onFocus", _this.handleFocus), "onKeyDown", _this.onInputKeyDown), "id", _this.props.id), "name", _this.props.name), "form", _this.props.form), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "autoFocus", _this.props.autoFocus), "placeholder", _this.props.placeholderText), "disabled", _this.props.disabled), "autoComplete", _this.props.autoComplete), "className", classnames(customInput.props.className, className)), "title", _this.props.title), "readOnly", _this.props.readOnly), "required", _this.props.required), "tabIndex", _this.props.tabIndex), "aria-describedby", _this.props.ariaDescribedBy), _defineProperty(_defineProperty(_defineProperty(_React$cloneElement, "aria-invalid", _this.props.ariaInvalid), "aria-labelledby", _this.props.ariaLabelledBy), "aria-required", _this.props.ariaRequired)));
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
          className: classnames("react-datepicker__close-icon", clearButtonClassName, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRlX3V0aWxzLmpzIiwiLi4vLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMveWVhcl9kcm9wZG93bi5qc3giLCIuLi8uLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMvbW9udGhfZHJvcGRvd24uanN4IiwiLi4vLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi5qc3giLCIuLi8uLi9zcmMvZGF5LmpzeCIsIi4uLy4uL3NyYy93ZWVrX251bWJlci5qc3giLCIuLi8uLi9zcmMvd2Vlay5qc3giLCIuLi8uLi9zcmMvbW9udGguanN4IiwiLi4vLi4vc3JjL3RpbWUuanN4IiwiLi4vLi4vc3JjL3llYXIuanN4IiwiLi4vLi4vc3JjL2lucHV0VGltZS5qc3giLCIuLi8uLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLmpzeCIsIi4uLy4uL3NyYy9jYWxlbmRhci5qc3giLCIuLi8uLi9zcmMvY2FsZW5kYXJfaWNvbi5qc3giLCIuLi8uLi9zcmMvcG9ydGFsLmpzeCIsIi4uLy4uL3NyYy90YWJfbG9vcC5qc3giLCIuLi8uLi9zcmMvd2l0aF9mbG9hdGluZy5qc3giLCIuLi8uLi9zcmMvcG9wcGVyX2NvbXBvbmVudC5qc3giLCIuLi8uLi9zcmMvaW5kZXguanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc0RhdGVcIjtcbmltcG9ydCB7IGlzVmFsaWQgYXMgaXNWYWxpZERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHsgZm9ybWF0LCBsb25nRm9ybWF0dGVycyB9IGZyb20gXCJkYXRlLWZucy9mb3JtYXRcIjtcbmltcG9ydCB7IGFkZE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkTWludXRlc1wiO1xuaW1wb3J0IHsgYWRkSG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkSG91cnNcIjtcbmltcG9ydCB7IGFkZERheXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkRGF5c1wiO1xuaW1wb3J0IHsgYWRkV2Vla3MgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkV2Vla3NcIjtcbmltcG9ydCB7IGFkZE1vbnRocyB9IGZyb20gXCJkYXRlLWZucy9hZGRNb250aHNcIjtcbmltcG9ydCB7IGFkZFF1YXJ0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBhZGRZZWFycyB9IGZyb20gXCJkYXRlLWZucy9hZGRZZWFyc1wiO1xuaW1wb3J0IHsgc3ViRGF5cyB9IGZyb20gXCJkYXRlLWZucy9zdWJEYXlzXCI7XG5pbXBvcnQgeyBzdWJXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9zdWJXZWVrc1wiO1xuaW1wb3J0IHsgc3ViTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL3N1Yk1vbnRoc1wiO1xuaW1wb3J0IHsgc3ViUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViUXVhcnRlcnNcIjtcbmltcG9ydCB7IHN1YlllYXJzIH0gZnJvbSBcImRhdGUtZm5zL3N1YlllYXJzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL2dldFNlY29uZHNcIjtcbmltcG9ydCB7IGdldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0TWludXRlc1wiO1xuaW1wb3J0IHsgZ2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0SG91cnNcIjtcbmltcG9ydCB7IGdldERheSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXlcIjtcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0RGF0ZVwiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCJkYXRlLWZucy9nZXRJU09XZWVrXCI7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9nZXRNb250aFwiO1xuaW1wb3J0IHsgZ2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9nZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2dldFllYXJcIjtcbmltcG9ydCB7IGdldFRpbWUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0VGltZVwiO1xuaW1wb3J0IHsgc2V0U2Vjb25kcyB9IGZyb20gXCJkYXRlLWZucy9zZXRTZWNvbmRzXCI7XG5pbXBvcnQgeyBzZXRNaW51dGVzIH0gZnJvbSBcImRhdGUtZm5zL3NldE1pbnV0ZXNcIjtcbmltcG9ydCB7IHNldEhvdXJzIH0gZnJvbSBcImRhdGUtZm5zL3NldEhvdXJzXCI7XG5pbXBvcnQgeyBzZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9zZXRNb250aFwiO1xuaW1wb3J0IHsgc2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBzZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3NldFllYXJcIjtcbmltcG9ydCB7IG1pbiB9IGZyb20gXCJkYXRlLWZucy9taW5cIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCJkYXRlLWZucy9tYXhcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZkRheVwiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZldlZWtcIjtcbmltcG9ydCB7IHN0YXJ0T2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mTW9udGhcIjtcbmltcG9ydCB7IHN0YXJ0T2ZRdWFydGVyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZRdWFydGVyXCI7XG5pbXBvcnQgeyBzdGFydE9mWWVhciB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mWWVhclwiO1xuaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZEYXlcIjtcbmltcG9ydCB7IGVuZE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9lbmRPZldlZWtcIjtcbmltcG9ydCB7IGVuZE9mTW9udGggfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZNb250aFwiO1xuaW1wb3J0IHsgZW5kT2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mWWVhclwiO1xuaW1wb3J0IHsgaXNFcXVhbCBhcyBkZklzRXF1YWwgfSBmcm9tIFwiZGF0ZS1mbnMvaXNFcXVhbFwiO1xuaW1wb3J0IHsgaXNTYW1lRGF5IGFzIGRmSXNTYW1lRGF5IH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZURheVwiO1xuaW1wb3J0IHsgaXNTYW1lTW9udGggYXMgZGZJc1NhbWVNb250aCB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVNb250aFwiO1xuaW1wb3J0IHsgaXNTYW1lWWVhciBhcyBkZklzU2FtZVllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lWWVhclwiO1xuaW1wb3J0IHsgaXNTYW1lUXVhcnRlciBhcyBkZklzU2FtZVF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lUXVhcnRlclwiO1xuaW1wb3J0IHsgaXNBZnRlciB9IGZyb20gXCJkYXRlLWZucy9pc0FmdGVyXCI7XG5pbXBvcnQgeyBpc0JlZm9yZSB9IGZyb20gXCJkYXRlLWZucy9pc0JlZm9yZVwiO1xuaW1wb3J0IHsgaXNXaXRoaW5JbnRlcnZhbCB9IGZyb20gXCJkYXRlLWZucy9pc1dpdGhpbkludGVydmFsXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvdG9EYXRlXCI7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJkYXRlLWZucy9wYXJzZVwiO1xuaW1wb3J0IHsgcGFyc2VJU08gfSBmcm9tIFwiZGF0ZS1mbnMvcGFyc2VJU09cIjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUiA9IDEyO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG5jb25zdCBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyAqKiBEYXRlIENvbnN0cnVjdG9ycyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gbmV3RGF0ZSh2YWx1ZSkge1xuICBjb25zdCBkID0gdmFsdWVcbiAgICA/IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZ1xuICAgICAgPyBwYXJzZUlTTyh2YWx1ZSlcbiAgICAgIDogdG9EYXRlKHZhbHVlKVxuICAgIDogbmV3IERhdGUoKTtcbiAgcmV0dXJuIGlzVmFsaWQoZCkgPyBkIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZSh2YWx1ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlLCBzdHJpY3RQYXJzaW5nLCBtaW5EYXRlKSB7XG4gIGxldCBwYXJzZWREYXRlID0gbnVsbDtcbiAgbGV0IGxvY2FsZU9iamVjdCA9XG4gICAgZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSkgfHwgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIGxldCBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9IHRydWU7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGVGb3JtYXQpKSB7XG4gICAgZGF0ZUZvcm1hdC5mb3JFYWNoKChkZikgPT4ge1xuICAgICAgbGV0IHRyeVBhcnNlRGF0ZSA9IHBhcnNlKHZhbHVlLCBkZiwgbmV3IERhdGUoKSwge1xuICAgICAgICBsb2NhbGU6IGxvY2FsZU9iamVjdCxcbiAgICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBpZiAoc3RyaWN0UGFyc2luZykge1xuICAgICAgICBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCA9XG4gICAgICAgICAgaXNWYWxpZCh0cnlQYXJzZURhdGUsIG1pbkRhdGUpICYmXG4gICAgICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUodHJ5UGFyc2VEYXRlLCBkZiwgbG9jYWxlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2gpIHtcbiAgICAgICAgcGFyc2VkRGF0ZSA9IHRyeVBhcnNlRGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2VkRGF0ZTtcbiAgfVxuXG4gIHBhcnNlZERhdGUgPSBwYXJzZSh2YWx1ZSwgZGF0ZUZvcm1hdCwgbmV3IERhdGUoKSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICB9KTtcblxuICBpZiAoc3RyaWN0UGFyc2luZykge1xuICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiZcbiAgICAgIHZhbHVlID09PSBmb3JtYXREYXRlKHBhcnNlZERhdGUsIGRhdGVGb3JtYXQsIGxvY2FsZSk7XG4gIH0gZWxzZSBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdFxuICAgICAgLm1hdGNoKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuICAgICAgLm1hcChmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09IFwicFwiIHx8IGZpcnN0Q2hhcmFjdGVyID09PSBcIlBcIikge1xuICAgICAgICAgIGNvbnN0IGxvbmdGb3JtYXR0ZXIgPSBsb25nRm9ybWF0dGVyc1tmaXJzdENoYXJhY3Rlcl07XG4gICAgICAgICAgcmV0dXJuIGxvY2FsZU9iamVjdFxuICAgICAgICAgICAgPyBsb25nRm9ybWF0dGVyKHN1YnN0cmluZywgbG9jYWxlT2JqZWN0LmZvcm1hdExvbmcpXG4gICAgICAgICAgICA6IGZpcnN0Q2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzdHJpbmc7XG4gICAgICB9KVxuICAgICAgLmpvaW4oXCJcIik7XG5cbiAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LnNsaWNlKDAsIHZhbHVlLmxlbmd0aCksIG5ldyBEYXRlKCksIHtcbiAgICAgICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1ZhbGlkKHBhcnNlZERhdGUpKSB7XG4gICAgICBwYXJzZWREYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc1ZhbGlkKHBhcnNlZERhdGUpICYmIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID8gcGFyc2VkRGF0ZSA6IG51bGw7XG59XG5cbi8vICoqIERhdGUgXCJSZWZsZWN0aW9uXCIgKipcblxuZXhwb3J0IHsgaXNEYXRlIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKGRhdGUsIG1pbkRhdGUpIHtcbiAgbWluRGF0ZSA9IG1pbkRhdGUgPyBtaW5EYXRlIDogbmV3IERhdGUoXCIxLzEvMTAwMFwiKTtcbiAgcmV0dXJuIGlzVmFsaWREYXRlKGRhdGUpICYmICFpc0JlZm9yZShkYXRlLCBtaW5EYXRlKTtcbn1cblxuLy8gKiogRGF0ZSBGb3JtYXR0aW5nICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdFN0ciwgbG9jYWxlKSB7XG4gIGlmIChsb2NhbGUgPT09IFwiZW5cIikge1xuICAgIHJldHVybiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7XG4gICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICB1c2VBZGRpdGlvbmFsRGF5T2ZZZWFyVG9rZW5zOiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIGxldCBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QobG9jYWxlKTtcbiAgaWYgKGxvY2FsZSAmJiAhbG9jYWxlT2JqKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYEEgbG9jYWxlIG9iamVjdCB3YXMgbm90IGZvdW5kIGZvciB0aGUgcHJvdmlkZWQgc3RyaW5nIFtcIiR7bG9jYWxlfVwiXS5gLFxuICAgICk7XG4gIH1cbiAgaWYgKFxuICAgICFsb2NhbGVPYmogJiZcbiAgICAhIWdldERlZmF1bHRMb2NhbGUoKSAmJlxuICAgICEhZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSlcbiAgKSB7XG4gICAgbG9jYWxlT2JqID0gZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSk7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iaiA/IGxvY2FsZU9iaiA6IG51bGwsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZURhdGVGb3JtYXQoZGF0ZSwgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSkge1xuICByZXR1cm4gKFxuICAgIChkYXRlICYmXG4gICAgICBmb3JtYXREYXRlKFxuICAgICAgICBkYXRlLFxuICAgICAgICBBcnJheS5pc0FycmF5KGRhdGVGb3JtYXQpID8gZGF0ZUZvcm1hdFswXSA6IGRhdGVGb3JtYXQsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICkpIHx8XG4gICAgXCJcIlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZURhdGVSYW5nZUZvcm1hdChzdGFydERhdGUsIGVuZERhdGUsIHByb3BzKSB7XG4gIGlmICghc3RhcnREYXRlKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBmb3JtYXR0ZWRTdGFydERhdGUgPSBzYWZlRGF0ZUZvcm1hdChzdGFydERhdGUsIHByb3BzKTtcbiAgY29uc3QgZm9ybWF0dGVkRW5kRGF0ZSA9IGVuZERhdGUgPyBzYWZlRGF0ZUZvcm1hdChlbmREYXRlLCBwcm9wcykgOiBcIlwiO1xuXG4gIHJldHVybiBgJHtmb3JtYXR0ZWRTdGFydERhdGV9IC0gJHtmb3JtYXR0ZWRFbmREYXRlfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdChkYXRlcywgcHJvcHMpIHtcbiAgaWYgKCFkYXRlcz8ubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbiAgY29uc3QgZm9ybWF0dGVkRmlyc3REYXRlID0gc2FmZURhdGVGb3JtYXQoZGF0ZXNbMF0sIHByb3BzKTtcbiAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmb3JtYXR0ZWRGaXJzdERhdGU7XG4gIH1cbiAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMikge1xuICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1sxXSwgcHJvcHMpO1xuICAgIHJldHVybiBgJHtmb3JtYXR0ZWRGaXJzdERhdGV9LCAke2Zvcm1hdHRlZFNlY29uZERhdGV9YDtcbiAgfVxuXG4gIGNvbnN0IGV4dHJhRGF0ZXNDb3VudCA9IGRhdGVzLmxlbmd0aCAtIDE7XG4gIHJldHVybiBgJHtmb3JtYXR0ZWRGaXJzdERhdGV9ICgrJHtleHRyYURhdGVzQ291bnR9KWA7XG59XG5cbi8vICoqIERhdGUgU2V0dGVycyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGltZShkYXRlLCB7IGhvdXIgPSAwLCBtaW51dGUgPSAwLCBzZWNvbmQgPSAwIH0pIHtcbiAgcmV0dXJuIHNldEhvdXJzKHNldE1pbnV0ZXMoc2V0U2Vjb25kcyhkYXRlLCBzZWNvbmQpLCBtaW51dGUpLCBob3VyKTtcbn1cblxuZXhwb3J0IHsgc2V0TWludXRlcywgc2V0SG91cnMsIHNldE1vbnRoLCBzZXRRdWFydGVyLCBzZXRZZWFyIH07XG5cbi8vICoqIERhdGUgR2V0dGVycyAqKlxuXG4vLyBnZXREYXkgUmV0dXJucyBkYXkgb2Ygd2VlaywgZ2V0RGF0ZSByZXR1cm5zIGRheSBvZiBtb250aFxuZXhwb3J0IHtcbiAgZ2V0U2Vjb25kcyxcbiAgZ2V0TWludXRlcyxcbiAgZ2V0SG91cnMsXG4gIGdldE1vbnRoLFxuICBnZXRRdWFydGVyLFxuICBnZXRZZWFyLFxuICBnZXREYXksXG4gIGdldERhdGUsXG4gIGdldFRpbWUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VlayhkYXRlLCBsb2NhbGUpIHtcbiAgbGV0IGxvY2FsZU9iaiA9XG4gICAgKGxvY2FsZSAmJiBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSkgfHxcbiAgICAoZ2V0RGVmYXVsdExvY2FsZSgpICYmIGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpKTtcbiAgcmV0dXJuIGdldElTT1dlZWsoZGF0ZSwgbG9jYWxlT2JqID8geyBsb2NhbGU6IGxvY2FsZU9iaiB9IDogbnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZldlZWtDb2RlKGRheSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRheSwgXCJkZGRcIiwgbG9jYWxlKTtcbn1cblxuLy8gKioqIFN0YXJ0IG9mICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZkRheShkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mRGF5KGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZldlZWsoZGF0ZSwgbG9jYWxlLCBjYWxlbmRhclN0YXJ0RGF5KSB7XG4gIGxldCBsb2NhbGVPYmogPSBsb2NhbGVcbiAgICA/IGdldExvY2FsZU9iamVjdChsb2NhbGUpXG4gICAgOiBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgcmV0dXJuIHN0YXJ0T2ZXZWVrKGRhdGUsIHtcbiAgICBsb2NhbGU6IGxvY2FsZU9iaixcbiAgICB3ZWVrU3RhcnRzT246IGNhbGVuZGFyU3RhcnREYXksXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZNb250aChkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZZZWFyKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZZZWFyKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlF1YXJ0ZXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlF1YXJ0ZXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mVG9kYXkoKSB7XG4gIHJldHVybiBzdGFydE9mRGF5KG5ld0RhdGUoKSk7XG59XG5cbi8vICoqKiBFbmQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZldlZWsoZGF0ZSkge1xuICByZXR1cm4gZW5kT2ZXZWVrKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kT2ZNb250aChkYXRlKSB7XG4gIHJldHVybiBlbmRPZk1vbnRoKGRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIE1hdGggKipcblxuLy8gKioqIEFkZGl0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRNaW51dGVzLCBhZGREYXlzLCBhZGRXZWVrcywgYWRkTW9udGhzLCBhZGRRdWFydGVycywgYWRkWWVhcnMgfTtcblxuLy8gKioqIFN1YnRyYWN0aW9uICoqKlxuXG5leHBvcnQgeyBhZGRIb3Vycywgc3ViRGF5cywgc3ViV2Vla3MsIHN1Yk1vbnRocywgc3ViUXVhcnRlcnMsIHN1YlllYXJzIH07XG5cbi8vICoqIERhdGUgQ29tcGFyaXNvbiAqKlxuXG5leHBvcnQgeyBpc0JlZm9yZSwgaXNBZnRlciB9O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lWWVhcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNb250aChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNTYW1lUXVhcnRlcihkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZURheShkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc0VxdWFsKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZkRheShzdGFydERhdGUpO1xuICBjb25zdCBlbmQgPSBlbmRPZkRheShlbmREYXRlKTtcblxuICB0cnkge1xuICAgIHZhbGlkID0gaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbi8vICoqKiBEaWZmaW5nICoqKlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTEsIGRhdGUyKSB7XG4gIHJldHVybiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZTEsIGRhdGUyKTtcbn1cblxuLy8gKiogRGF0ZSBMb2NhbGl6YXRpb24gKipcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZU5hbWUsIGxvY2FsZURhdGEpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBpZiAoIXNjb3BlLl9fbG9jYWxlRGF0YV9fKSB7XG4gICAgc2NvcGUuX19sb2NhbGVEYXRhX18gPSB7fTtcbiAgfVxuICBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVOYW1lXSA9IGxvY2FsZURhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0TG9jYWxlKGxvY2FsZU5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICBzY29wZS5fX2xvY2FsZUlkX18gPSBsb2NhbGVOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdExvY2FsZSgpIHtcbiAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcblxuICByZXR1cm4gc2NvcGUuX19sb2NhbGVJZF9fO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZVNwZWMpIHtcbiAgaWYgKHR5cGVvZiBsb2NhbGVTcGVjID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSBsb2NhbGUgbmFtZSByZWdpc3RlcmVkIGJ5IHJlZ2lzdGVyTG9jYWxlXG4gICAgY29uc3Qgc2NvcGUgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsVGhpcztcbiAgICByZXR1cm4gc2NvcGUuX19sb2NhbGVEYXRhX18gPyBzY29wZS5fX2xvY2FsZURhdGFfX1tsb2NhbGVTcGVjXSA6IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gVHJlYXQgaXQgYXMgYSByYXcgZGF0ZS1mbnMgbG9jYWxlIG9iamVjdFxuICAgIHJldHVybiBsb2NhbGVTcGVjO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRXZWVrZGF5SW5Mb2NhbGUoZGF0ZSwgZm9ybWF0RnVuYywgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXRGdW5jKGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFXCIsIGxvY2FsZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRUVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheVNob3J0SW5Mb2NhbGUoZGF0ZSwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIFwiRUVFXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhTaG9ydEluTG9jYWxlKG1vbnRoLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0TW9udGgobmV3RGF0ZSgpLCBtb250aCksIFwiTExMXCIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxdWFydGVyLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoc2V0UXVhcnRlcihuZXdEYXRlKCksIHF1YXJ0ZXIpLCBcIlFRUVwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiBVdGlscyBmb3Igc29tZSBjb21wb25lbnRzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheURpc2FibGVkKFxuICBkYXksXG4gIHtcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICAgZXhjbHVkZURhdGVzLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLFxuICAgIGluY2x1ZGVEYXRlcyxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFscyxcbiAgICBmaWx0ZXJEYXRlLFxuICB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lRGF5KGRheSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoaW5jbHVkZURhdGVJbnRlcnZhbHMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICAgICkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShkYXkpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlFeGNsdWRlZChcbiAgZGF5LFxuICB7IGV4Y2x1ZGVEYXRlcywgZXhjbHVkZURhdGVJbnRlcnZhbHMgfSA9IHt9LFxuKSB7XG4gIGlmIChleGNsdWRlRGF0ZUludGVydmFscyAmJiBleGNsdWRlRGF0ZUludGVydmFscy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzLnNvbWUoKHsgc3RhcnQsIGVuZCB9KSA9PlxuICAgICAgaXNXaXRoaW5JbnRlcnZhbChkYXksIHsgc3RhcnQsIGVuZCB9KSxcbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVEYXkoZGF5LCBleGNsdWRlRGF0ZS5kYXRlID8gZXhjbHVkZURhdGUuZGF0ZSA6IGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9udGhEaXNhYmxlZChcbiAgbW9udGgsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhtb250aCwge1xuICAgICAgbWluRGF0ZTogc3RhcnRPZk1vbnRoKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZNb250aChtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lTW9udGgobW9udGgsIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGZpbHRlckRhdGUgJiYgIWZpbHRlckRhdGUobmV3RGF0ZShtb250aCkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoSW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIG0sIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVNb250aCA9IGdldE1vbnRoKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZU1vbnRoID0gZ2V0TW9udGgoZW5kRGF0ZSk7XG4gIGNvbnN0IGRheVllYXIgPSBnZXRZZWFyKGRheSk7XG4gIGlmIChzdGFydERhdGVZZWFyID09PSBlbmREYXRlWWVhciAmJiBzdGFydERhdGVZZWFyID09PSBkYXlZZWFyKSB7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZU1vbnRoIDw9IG0gJiYgbSA8PSBlbmREYXRlTW9udGg7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZU1vbnRoIDw9IG0pIHx8XG4gICAgICAoZGF5WWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgZW5kRGF0ZU1vbnRoID49IG0pIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVhcnRlckRpc2FibGVkKFxuICBxdWFydGVyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMocXVhcnRlciwgeyBtaW5EYXRlLCBtYXhEYXRlIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICBpc1NhbWVRdWFydGVyKHF1YXJ0ZXIsIGV4Y2x1ZGVEYXRlKSxcbiAgICAgICkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBpbmNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUocXVhcnRlcikpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnRcbiAqIEBwYXJhbSB7RGF0ZX0gZW5kXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckluUmFuZ2UoeWVhciwgc3RhcnQsIGVuZCkge1xuICBpZiAoIWlzVmFsaWREYXRlKHN0YXJ0KSB8fCAhaXNWYWxpZERhdGUoZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzdGFydFllYXIgPSBnZXRZZWFyKHN0YXJ0KTtcbiAgY29uc3QgZW5kWWVhciA9IGdldFllYXIoZW5kKTtcblxuICByZXR1cm4gc3RhcnRZZWFyIDw9IHllYXIgJiYgZW5kWWVhciA+PSB5ZWFyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNZZWFyRGlzYWJsZWQoXG4gIHllYXIsXG4gIHsgbWluRGF0ZSwgbWF4RGF0ZSwgZXhjbHVkZURhdGVzLCBpbmNsdWRlRGF0ZXMsIGZpbHRlckRhdGUgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCAwLCAxKTtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKGRhdGUsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZZZWFyKG1pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogZW5kT2ZZZWFyKG1heERhdGUpLFxuICAgIH0pIHx8XG4gICAgKGV4Y2x1ZGVEYXRlcyAmJlxuICAgICAgZXhjbHVkZURhdGVzLnNvbWUoKGV4Y2x1ZGVEYXRlKSA9PiBpc1NhbWVZZWFyKGRhdGUsIGV4Y2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgIWluY2x1ZGVEYXRlcy5zb21lKChpbmNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF0ZSkpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZVllYXIgPSBnZXRZZWFyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IHN0YXJ0RGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVZZWFyID0gZ2V0WWVhcihlbmREYXRlKTtcbiAgY29uc3QgZW5kRGF0ZVF1YXJ0ZXIgPSBnZXRRdWFydGVyKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVRdWFydGVyIDw9IHEgJiYgcSA8PSBlbmREYXRlUXVhcnRlcjtcbiAgfSBlbHNlIGlmIChzdGFydERhdGVZZWFyIDwgZW5kRGF0ZVllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGRheVllYXIgPT09IHN0YXJ0RGF0ZVllYXIgJiYgc3RhcnREYXRlUXVhcnRlciA8PSBxKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVRdWFydGVyID49IHEpIHx8XG4gICAgICAoZGF5WWVhciA8IGVuZERhdGVZZWFyICYmIGRheVllYXIgPiBzdGFydERhdGVZZWFyKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0T2ZCb3VuZHMoZGF5LCB7IG1pbkRhdGUsIG1heERhdGUgfSA9IHt9KSB7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRheSwgbWluRGF0ZSkgPCAwKSB8fFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1heERhdGUpID4gMClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluTGlzdCh0aW1lLCB0aW1lcykge1xuICByZXR1cm4gdGltZXMuc29tZShcbiAgICAobGlzdFRpbWUpID0+XG4gICAgICBnZXRIb3VycyhsaXN0VGltZSkgPT09IGdldEhvdXJzKHRpbWUpICYmXG4gICAgICBnZXRNaW51dGVzKGxpc3RUaW1lKSA9PT0gZ2V0TWludXRlcyh0aW1lKSxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZURpc2FibGVkKFxuICB0aW1lLFxuICB7IGV4Y2x1ZGVUaW1lcywgaW5jbHVkZVRpbWVzLCBmaWx0ZXJUaW1lIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIChleGNsdWRlVGltZXMgJiYgaXNUaW1lSW5MaXN0KHRpbWUsIGV4Y2x1ZGVUaW1lcykpIHx8XG4gICAgKGluY2x1ZGVUaW1lcyAmJiAhaXNUaW1lSW5MaXN0KHRpbWUsIGluY2x1ZGVUaW1lcykpIHx8XG4gICAgKGZpbHRlclRpbWUgJiYgIWZpbHRlclRpbWUodGltZSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB7IG1pblRpbWUsIG1heFRpbWUgfSkge1xuICBpZiAoIW1pblRpbWUgfHwgIW1heFRpbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb3RoIG1pblRpbWUgYW5kIG1heFRpbWUgcHJvcHMgcmVxdWlyZWRcIik7XG4gIH1cbiAgY29uc3QgYmFzZSA9IG5ld0RhdGUoKTtcbiAgY29uc3QgYmFzZVRpbWUgPSBzZXRIb3VycyhzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXModGltZSkpLCBnZXRIb3Vycyh0aW1lKSk7XG4gIGNvbnN0IG1pbiA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtaW5UaW1lKSksXG4gICAgZ2V0SG91cnMobWluVGltZSksXG4gICk7XG4gIGNvbnN0IG1heCA9IHNldEhvdXJzKFxuICAgIHNldE1pbnV0ZXMoYmFzZSwgZ2V0TWludXRlcyhtYXhUaW1lKSksXG4gICAgZ2V0SG91cnMobWF4VGltZSksXG4gICk7XG5cbiAgbGV0IHZhbGlkO1xuICB0cnkge1xuICAgIHZhbGlkID0gIWlzV2l0aGluSW50ZXJ2YWwoYmFzZVRpbWUsIHsgc3RhcnQ6IG1pbiwgZW5kOiBtYXggfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c01vbnRoID0gc3ViTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobWluRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PlxuICAgICAgICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGluY2x1ZGVEYXRlLCBwcmV2aW91c01vbnRoKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb250aERpc2FibGVkQWZ0ZXIoZGF5LCB7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMobmV4dE1vbnRoLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c1llYXIgPSBzdWJZZWFycyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobWluRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQmVmb3JlKFxuICBkYXksXG4gIHsgbWluRGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IGdldFN0YXJ0T2ZZZWFyKHN1YlllYXJzKGRheSwgeWVhckl0ZW1OdW1iZXIpKTtcbiAgY29uc3QgeyBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKHByZXZpb3VzWWVhciwgeWVhckl0ZW1OdW1iZXIpO1xuICBjb25zdCBtaW5EYXRlWWVhciA9IG1pbkRhdGUgJiYgZ2V0WWVhcihtaW5EYXRlKTtcbiAgcmV0dXJuIChtaW5EYXRlWWVhciAmJiBtaW5EYXRlWWVhciA+IGVuZFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0WWVhciA9IGFkZFllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhuZXh0WWVhciwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhcnNEaXNhYmxlZEFmdGVyKFxuICBkYXksXG4gIHsgbWF4RGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKG5leHRZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1heERhdGVZZWFyID0gbWF4RGF0ZSAmJiBnZXRZZWFyKG1heERhdGUpO1xuICByZXR1cm4gKG1heERhdGVZZWFyICYmIG1heERhdGVZZWFyIDwgc3RhcnRQZXJpb2QpIHx8IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWluRGF0ZSh7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWluRGF0ZSkge1xuICAgIGxldCBtaW5EYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWluRGF0ZSkgPj0gMCxcbiAgICApO1xuICAgIHJldHVybiBtaW4obWluRGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtaW4oaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWluRGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWF4RGF0ZSkge1xuICAgIGxldCBtYXhEYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWF4RGF0ZSkgPD0gMCxcbiAgICApO1xuICAgIHJldHVybiBtYXgobWF4RGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtYXgoaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWF4RGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlnaHRMaWdodERheXNNYXAoXG4gIGhpZ2hsaWdodERhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhpZ2hsaWdodERhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgb2JqID0gaGlnaGxpZ2h0RGF0ZXNbaV07XG4gICAgaWYgKGlzRGF0ZShvYmopKSB7XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKG9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lc0FyciA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IFtdO1xuICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGRlZmF1bHRDbGFzc05hbWUpKSB7XG4gICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChkZWZhdWx0Q2xhc3NOYW1lKTtcbiAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGtleXNbMF07XG4gICAgICBjb25zdCBhcnJPZkRhdGVzID0gb2JqW2tleXNbMF1dO1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgYXJyT2ZEYXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbiA9IGFyck9mRGF0ZXMubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKGFyck9mRGF0ZXNba10sIFwiTU0uZGQueXl5eVwiKTtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlQ2xhc3Nlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHRoZSB0d28gYXJyYXlzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTFcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MlxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUsIGlmIHRoZSBwYXNzZWQgYXJyYXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0FyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSB7XG4gIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5MS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gYXJyYXkyW2luZGV4XSk7XG59XG5cbi8qKlxuICogQXNzaWduIHRoZSBjdXN0b20gY2xhc3MgdG8gZWFjaCBkYXRlXG4gKiBAcGFyYW0ge0FycmF5fSBob2xpZGF5RGF0ZXMgYXJyYXkgb2Ygb2JqZWN0IGNvbnRhaW5pbmcgZGF0ZSBhbmQgbmFtZSBvZiB0aGUgaG9saWRheVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzbmFtZSB0byBiZSBhZGRlZC5cbiAqIEByZXR1cm5zIHtNYXB9IE1hcCBjb250YWluaW5nIGRhdGUgYXMga2V5IGFuZCBhcnJheSBvZiBjbGFzc25hbWUgYW5kIGhvbGlkYXkgbmFtZSBhcyB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9saWRheXNNYXAoXG4gIGhvbGlkYXlEYXRlcyA9IFtdLFxuICBkZWZhdWx0Q2xhc3NOYW1lID0gXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhvbGlkYXlzXCIsXG4pIHtcbiAgY29uc3QgZGF0ZUNsYXNzZXMgPSBuZXcgTWFwKCk7XG4gIGhvbGlkYXlEYXRlcy5mb3JFYWNoKChob2xpZGF5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlOiBkYXRlT2JqLCBob2xpZGF5TmFtZSB9ID0gaG9saWRheTtcbiAgICBpZiAoIWlzRGF0ZShkYXRlT2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoZGF0ZU9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXNPYmogPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCB7fTtcbiAgICBpZiAoXG4gICAgICBcImNsYXNzTmFtZVwiIGluIGNsYXNzTmFtZXNPYmogJiZcbiAgICAgIGNsYXNzTmFtZXNPYmpbXCJjbGFzc05hbWVcIl0gPT09IGRlZmF1bHRDbGFzc05hbWUgJiZcbiAgICAgIGFycmF5c0FyZUVxdWFsKGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0sIFtob2xpZGF5TmFtZV0pXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9IGRlZmF1bHRDbGFzc05hbWU7XG4gICAgY29uc3QgaG9saWRheU5hbWVBcnIgPSBjbGFzc05hbWVzT2JqW1wiaG9saWRheU5hbWVzXCJdO1xuICAgIGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0gPSBob2xpZGF5TmFtZUFyclxuICAgICAgPyBbLi4uaG9saWRheU5hbWVBcnIsIGhvbGlkYXlOYW1lXVxuICAgICAgOiBbaG9saWRheU5hbWVdO1xuICAgIGRhdGVDbGFzc2VzLnNldChrZXksIGNsYXNzTmFtZXNPYmopO1xuICB9KTtcbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXNUb0luamVjdEFmdGVyKFxuICBzdGFydE9mRGF5LFxuICBjdXJyZW50VGltZSxcbiAgY3VycmVudE11bHRpcGxpZXIsXG4gIGludGVydmFscyxcbiAgaW5qZWN0ZWRUaW1lcyxcbikge1xuICBjb25zdCBsID0gaW5qZWN0ZWRUaW1lcy5sZW5ndGg7XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgaW5qZWN0ZWRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIGFkZEhvdXJzKHN0YXJ0T2ZEYXksIGdldEhvdXJzKGluamVjdGVkVGltZXNbaV0pKSxcbiAgICAgIGdldE1pbnV0ZXMoaW5qZWN0ZWRUaW1lc1tpXSksXG4gICAgKTtcbiAgICBjb25zdCBuZXh0VGltZSA9IGFkZE1pbnV0ZXMoXG4gICAgICBzdGFydE9mRGF5LFxuICAgICAgKGN1cnJlbnRNdWx0aXBsaWVyICsgMSkgKiBpbnRlcnZhbHMsXG4gICAgKTtcblxuICAgIGlmIChcbiAgICAgIGlzQWZ0ZXIoaW5qZWN0ZWRUaW1lLCBjdXJyZW50VGltZSkgJiZcbiAgICAgIGlzQmVmb3JlKGluamVjdGVkVGltZSwgbmV4dFRpbWUpXG4gICAgKSB7XG4gICAgICB0aW1lcy5wdXNoKGluamVjdGVkVGltZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aW1lcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFplcm8oaSkge1xuICByZXR1cm4gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFllYXJzUGVyaW9kKFxuICBkYXRlLFxuICB5ZWFySXRlbU51bWJlciA9IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbikge1xuICBjb25zdCBlbmRQZXJpb2QgPSBNYXRoLmNlaWwoZ2V0WWVhcihkYXRlKSAvIHllYXJJdGVtTnVtYmVyKSAqIHllYXJJdGVtTnVtYmVyO1xuICBjb25zdCBzdGFydFBlcmlvZCA9IGVuZFBlcmlvZCAtICh5ZWFySXRlbU51bWJlciAtIDEpO1xuICByZXR1cm4geyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3Vyc0luRGF5KGQpIHtcbiAgY29uc3Qgc3RhcnRPZkRheSA9IG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpLCBkLmdldERhdGUoKSk7XG4gIGNvbnN0IHN0YXJ0T2ZUaGVOZXh0RGF5ID0gbmV3IERhdGUoXG4gICAgZC5nZXRGdWxsWWVhcigpLFxuICAgIGQuZ2V0TW9udGgoKSxcbiAgICBkLmdldERhdGUoKSxcbiAgICAyNCxcbiAgKTtcblxuICByZXR1cm4gTWF0aC5yb3VuZCgoK3N0YXJ0T2ZUaGVOZXh0RGF5IC0gK3N0YXJ0T2ZEYXkpIC8gM182MDBfMDAwKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzdGFydCBvZiB0aGUgbWludXRlIGZvciB0aGUgZ2l2ZW4gZGF0ZVxuICpcbiAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9zdGFydE9mTWludXRlYFxuICogZG8gbm90IG1ha2UgY2hhbmdlcyB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmdcbiAqXG4gKiBTZWUgY29tbWVudHMgb24gaHR0cHM6Ly9naXRodWIuY29tL0hhY2tlcjB4MDEvcmVhY3QtZGF0ZXBpY2tlci9wdWxsLzQyNDRcbiAqIGZvciBtb3JlIGRldGFpbHNcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGQgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHN0YXJ0IG9mIHRoZSBtaW51dGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZNaW51dGUoZCkge1xuICBjb25zdCBzZWNvbmRzID0gZC5nZXRTZWNvbmRzKCk7XG4gIGNvbnN0IG1pbGxpc2Vjb25kcyA9IGQuZ2V0TWlsbGlzZWNvbmRzKCk7XG5cbiAgcmV0dXJuIHRvRGF0ZShkLmdldFRpbWUoKSAtIHNlY29uZHMgKiAxMDAwIC0gbWlsbGlzZWNvbmRzKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBtaW51dGVcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGEgRFNUIGFuZCB0aW1lem9uZS1zYWZlIGFuYWxvZyBvZiBgZGF0ZS1mbnMvaXNTYW1lTWludXRlYFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZDFcbiAqIEBwYXJhbSB7RGF0ZX0gZDJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lTWludXRlKGQxLCBkMikge1xuICByZXR1cm4gc3RhcnRPZk1pbnV0ZShkMSkuZ2V0VGltZSgpID09PSBzdGFydE9mTWludXRlKGQyKS5nZXRUaW1lKCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNsb25lZCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZSAoMDA6MDA6MDApXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIFRoZSBkYXRlIGZvciB3aGljaCBtaWRuaWdodCB0aW1lIGlzIHJlcXVpcmVkXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVUb0NvbXBhcmUgdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJucyB7RGF0ZX0gQSBuZXcgZGF0ZXRpbWUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5wdXQgZGF0ZSB3aXRoIG1pZG5pZ2h0IHRpbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1pZG5pZ2h0RGF0ZShkYXRlKSB7XG4gIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlXCIpO1xuICB9XG5cbiAgY29uc3QgZGF0ZVdpdGhvdXRUaW1lID0gbmV3IERhdGUoZGF0ZSk7XG4gIGRhdGVXaXRob3V0VGltZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGVXaXRob3V0VGltZTtcbn1cblxuLyoqXG4gKiBJcyB0aGUgZmlyc3QgZGF0ZSBiZWZvcmUgdGhlIHNlY29uZCBvbmU/XG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIFRoZSBkYXRlIHRoYXQgc2hvdWxkIGJlIGJlZm9yZSB0aGUgb3RoZXIgb25lIHRvIHJldHVybiB0cnVlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVUb0NvbXBhcmUgVGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmQgZGF0ZVxuICpcbiAqIE5vdGU6XG4gKiAgVGhpcyBmdW5jdGlvbiBjb25zaWRlcnMgdGhlIG1pZC1uaWdodCBvZiB0aGUgZ2l2ZW4gZGF0ZXMgZm9yIGNvbXBhcmlzb24uXG4gKiAgSXQgZXZhbHVhdGVzIHdoZXRoZXIgZGF0ZSBpcyBiZWZvcmUgZGF0ZVRvQ29tcGFyZSBiYXNlZCBvbiB0aGVpciBtaWQtbmlnaHQgdGltZXN0YW1wcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZUJlZm9yZShkYXRlLCBkYXRlVG9Db21wYXJlKSB7XG4gIGlmICghaXNEYXRlKGRhdGUpIHx8ICFpc0RhdGUoZGF0ZVRvQ29tcGFyZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgcmVjZWl2ZWRcIik7XG4gIH1cblxuICBjb25zdCBtaWRuaWdodERhdGUgPSBnZXRNaWRuaWdodERhdGUoZGF0ZSk7XG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlVG9Db21wYXJlKTtcblxuICByZXR1cm4gaXNCZWZvcmUobWlkbmlnaHREYXRlLCBtaWRuaWdodERhdGVUb0NvbXBhcmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTcGFjZUtleURvd24oZXZlbnQpIHtcbiAgY29uc3QgU1BBQ0VfS0VZID0gXCIgXCI7XG4gIHJldHVybiBldmVudC5rZXkgPT09IFNQQUNFX0tFWTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBjcmVhdGVSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVllYXJzKHllYXIsIG5vT2ZZZWFyLCBtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogbm9PZlllYXIgKyAxOyBpKyspIHtcbiAgICBjb25zdCBuZXdZZWFyID0geWVhciArIG5vT2ZZZWFyIC0gaTtcbiAgICBsZXQgaXNJblJhbmdlID0gdHJ1ZTtcblxuICAgIGlmIChtaW5EYXRlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1pbkRhdGUpIDw9IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGUgJiYgaXNJblJhbmdlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1heERhdGUpID49IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKGlzSW5SYW5nZSkge1xuICAgICAgbGlzdC5wdXNoKG5ld1llYXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IHllYXJEcm9wZG93bkl0ZW1OdW1iZXIsIHNjcm9sbGFibGVZZWFyRHJvcGRvd24gfSA9IHByb3BzO1xuICAgIGNvbnN0IG5vT2ZZZWFyID1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXIgfHwgKHNjcm9sbGFibGVZZWFyRHJvcGRvd24gPyAxMCA6IDUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHllYXJzTGlzdDogZ2VuZXJhdGVZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy55ZWFyLFxuICAgICAgICBub09mWWVhcixcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gICAgdGhpcy5kcm9wZG93blJlZiA9IGNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZHJvcGRvd25DdXJyZW50ID0gdGhpcy5kcm9wZG93blJlZi5jdXJyZW50O1xuXG4gICAgaWYgKGRyb3Bkb3duQ3VycmVudCkge1xuICAgICAgLy8gR2V0IGFycmF5IGZyb20gSFRNTENvbGxlY3Rpb25cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuID0gZHJvcGRvd25DdXJyZW50LmNoaWxkcmVuXG4gICAgICAgID8gQXJyYXkuZnJvbShkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW4pXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkWWVhck9wdGlvbkVsID0gZHJvcGRvd25DdXJyZW50Q2hpbGRyZW5cbiAgICAgICAgPyBkcm9wZG93bkN1cnJlbnRDaGlsZHJlbi5maW5kKChjaGlsZEVsKSA9PiBjaGlsZEVsLmFyaWFTZWxlY3RlZClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBkcm9wZG93bkN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWRZZWFyT3B0aW9uRWxcbiAgICAgICAgPyBzZWxlY3RlZFllYXJPcHRpb25FbC5vZmZzZXRUb3AgK1xuICAgICAgICAgIChzZWxlY3RlZFllYXJPcHRpb25FbC5jbGllbnRIZWlnaHQgLSBkcm9wZG93bkN1cnJlbnQuY2xpZW50SGVpZ2h0KSAvIDJcbiAgICAgICAgOiAoZHJvcGRvd25DdXJyZW50LnNjcm9sbEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMjtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IHRoaXMucHJvcHMueWVhcjtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKCh5ZWFyKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgc2VsZWN0ZWRZZWFyID09PSB5ZWFyXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkX3llYXJcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e3llYXJ9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB5ZWFyKX1cbiAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWRZZWFyID09PSB5ZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHtzZWxlY3RlZFllYXIgPT09IHllYXIgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge3llYXJ9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcblxuICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLnByb3BzLm1pbkRhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWluRGF0ZSkgOiBudWxsO1xuICAgIGNvbnN0IG1heFllYXIgPSB0aGlzLnByb3BzLm1heERhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWF4RGF0ZSkgOiBudWxsO1xuXG4gICAgaWYgKCFtYXhZZWFyIHx8ICF0aGlzLnN0YXRlLnllYXJzTGlzdC5maW5kKCh5ZWFyKSA9PiB5ZWFyID09PSBtYXhZZWFyKSkge1xuICAgICAgb3B0aW9ucy51bnNoaWZ0KFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICAgIGtleT17XCJ1cGNvbWluZ1wifVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaW5jcmVtZW50WWVhcnN9XG4gICAgICAgID5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzLXVwY29taW5nXCIgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIW1pblllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1pblllYXIpKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInByZXZpb3VzXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5kZWNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtcHJldmlvdXNcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgc2hpZnRZZWFycyA9IChhbW91bnQpID0+IHtcbiAgICBjb25zdCB5ZWFycyA9IHRoaXMuc3RhdGUueWVhcnNMaXN0Lm1hcChmdW5jdGlvbiAoeWVhcikge1xuICAgICAgcmV0dXJuIHllYXIgKyBhbW91bnQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHllYXJzTGlzdDogeWVhcnMsXG4gICAgfSk7XG4gIH07XG5cbiAgaW5jcmVtZW50WWVhcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRZZWFycygxKTtcbiAgfTtcblxuICBkZWNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKC0xKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbGFzc05hbWVzKHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30gcmVmPXt0aGlzLmRyb3Bkb3duUmVmfT5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4veWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IDE5MDA7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IDIxMDA7XG5cbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IG1pblllYXI7IGkgPD0gbWF4WWVhcjsgaSsrKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17aX0+XG4gICAgICAgICAge2l9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQteWVhclwiPlxuICAgICAgICB7dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgeWVhcj17dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKHllYXIgPT09IHRoaXMucHJvcHMueWVhcikgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnByb3BzLmRhdGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSwgZXZlbnQpID0+IHtcbiAgICB0aGlzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB0aGlzLnNldE9wZW4oKTtcbiAgfTtcblxuICBvblNlbGVjdCA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0T3BlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG1vbnRoTmFtZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoaSkgPT4gdGhpcy5wcm9wcy5tb250aCA9PT0gaTtcblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1vbnRoTmFtZXMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGkpXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGhcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvblwiXG4gICAgICAgIH1cbiAgICAgICAga2V5PXttb250aH1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGkpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5pc1NlbGVjdGVkTW9udGgoaSkgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZFwiPuKckzwvc3Bhbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBcIlwiXG4gICAgICAgICl9XG4gICAgICAgIHttb250aH1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aERyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAobW9udGhOYW1lcykgPT5cbiAgICBtb250aE5hbWVzLm1hcCgoTSwgaSkgPT4gKFxuICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAge019XG4gICAgICA8L29wdGlvbj5cbiAgICApKTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKG1vbnRoTmFtZXMpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMobW9udGhOYW1lcyl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSwgbW9udGhOYW1lcykgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3XCJcbiAgICAgIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGhcIj5cbiAgICAgICAge21vbnRoTmFtZXNbdGhpcy5wcm9wcy5tb250aF19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgbW9udGhOYW1lcz17bW9udGhOYW1lc31cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKG1vbnRoTmFtZXMpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSwgbW9udGhOYW1lcyldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24obW9udGhOYW1lcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIGlmIChtb250aCAhPT0gdGhpcy5wcm9wcy5tb250aCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aCk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV0ubWFwKFxuICAgICAgdGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93blxuICAgICAgICA/IChNKSA9PiB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpXG4gICAgICAgIDogKE0pID0+IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpLFxuICAgICk7XG5cbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKG1vbnRoTmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7XG4gIGFkZE1vbnRocyxcbiAgZm9ybWF0RGF0ZSxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBuZXdEYXRlLFxuICBpc0FmdGVyLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lWWVhcixcbiAgZ2V0VGltZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU1vbnRoWWVhcnMobWluRGF0ZSwgbWF4RGF0ZSkge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKG1pbkRhdGUpO1xuICBjb25zdCBsYXN0RGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtYXhEYXRlKTtcblxuICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgIGxpc3QucHVzaChuZXdEYXRlKGN1cnJEYXRlKSk7XG5cbiAgICBjdXJyRGF0ZSA9IGFkZE1vbnRocyhjdXJyRGF0ZSwgMSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1vbnRoWWVhcnNMaXN0OiBnZW5lcmF0ZU1vbnRoWWVhcnMoXG4gICAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5tYXhEYXRlLFxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tb250aFllYXJzTGlzdC5tYXAoKG1vbnRoWWVhcikgPT4ge1xuICAgICAgY29uc3QgbW9udGhZZWFyUG9pbnQgPSBnZXRUaW1lKG1vbnRoWWVhcik7XG4gICAgICBjb25zdCBpc1NhbWVNb250aFllYXIgPVxuICAgICAgICBpc1NhbWVZZWFyKHRoaXMucHJvcHMuZGF0ZSwgbW9udGhZZWFyKSAmJlxuICAgICAgICBpc1NhbWVNb250aCh0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgaXNTYW1lTW9udGhZZWFyXG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGgteWVhclwiXG4gICAgICAgICAgICAgIDogXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvblwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17bW9udGhZZWFyUG9pbnR9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIG1vbnRoWWVhclBvaW50KX1cbiAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc1NhbWVNb250aFllYXIgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1NhbWVNb250aFllYXIgPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLW9wdGlvbi0tc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAg4pyTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHtmb3JtYXREYXRlKG1vbnRoWWVhciwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXIpID0+IHRoaXMucHJvcHMub25DaGFuZ2UobW9udGhZZWFyKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgZHJvcGRvd25DbGFzcyA9IGNsYXNzTmFtZXMoe1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duXCI6IHRydWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tLXNjcm9sbGFibGVcIjpcbiAgICAgICAgdGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd24sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Ryb3Bkb3duQ2xhc3N9Pnt0aGlzLnJlbmRlck9wdGlvbnMoKX08L2Rpdj47XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4vbW9udGhfeWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIG5ld0RhdGUsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxudmFyIFdyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMgPSBvbkNsaWNrT3V0c2lkZShNb250aFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJEYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWluRGF0ZSk7XG4gICAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICB3aGlsZSAoIWlzQWZ0ZXIoY3VyckRhdGUsIGxhc3REYXRlKSkge1xuICAgICAgY29uc3QgdGltZVBvaW50ID0gZ2V0VGltZShjdXJyRGF0ZSk7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXt0aW1lUG9pbnR9IHZhbHVlPXt0aW1lUG9pbnR9PlxuICAgICAgICAgIHtmb3JtYXREYXRlKGN1cnJEYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9vcHRpb24+LFxuICAgICAgKTtcblxuICAgICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXtnZXRUaW1lKGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRhdGUpKX1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItc2VsZWN0XCJcbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMoKX1cbiAgICA8L3NlbGVjdD5cbiAgKTtcblxuICByZW5kZXJSZWFkVmlldyA9ICh2aXNpYmxlKSA9PiB7XG4gICAgY29uc3QgeWVhck1vbnRoID0gZm9ybWF0RGF0ZShcbiAgICAgIHRoaXMucHJvcHMuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9XCJyZWFkXCJcbiAgICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlld1wiXG4gICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bihldmVudCl9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXctLXNlbGVjdGVkLW1vbnRoLXllYXJcIj5cbiAgICAgICAgICB7eWVhck1vbnRofVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zXG4gICAgICBrZXk9XCJkcm9wZG93blwiXG4gICAgICBkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG4gICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgIG9uQ2FuY2VsPXt0aGlzLnRvZ2dsZURyb3Bkb3dufVxuICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZHJvcGRvd25WaXNpYmxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCByZXN1bHQgPSBbdGhpcy5yZW5kZXJSZWFkVmlldyghZHJvcGRvd25WaXNpYmxlKV07XG4gICAgaWYgKGRyb3Bkb3duVmlzaWJsZSkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQodGhpcy5yZW5kZXJEcm9wZG93bigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBvbkNoYW5nZSA9IChtb250aFllYXJQb2ludCkgPT4ge1xuICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblxuICAgIGNvbnN0IGNoYW5nZWREYXRlID0gbmV3RGF0ZShwYXJzZUludChtb250aFllYXJQb2ludCkpO1xuXG4gICAgaWYgKFxuICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIGNoYW5nZWREYXRlKSAmJlxuICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoYW5nZWREYXRlKTtcbiAgfTtcblxuICB0b2dnbGVEcm9wZG93biA9ICgpID0+XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHJlbmRlcmVkRHJvcGRvd247XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRyb3Bkb3duTW9kZSkge1xuICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTY3JvbGxNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7XG4gIGdldERheSxcbiAgZ2V0TW9udGgsXG4gIGdldERhdGUsXG4gIG5ld0RhdGUsXG4gIGlzU2FtZURheSxcbiAgaXNEYXlEaXNhYmxlZCxcbiAgaXNEYXlFeGNsdWRlZCxcbiAgaXNEYXlJblJhbmdlLFxuICBpc0VxdWFsLFxuICBpc0JlZm9yZSxcbiAgaXNBZnRlcixcbiAgZ2V0RGF5T2ZXZWVrQ29kZSxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGZvcm1hdERhdGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGhpZ2hsaWdodERhdGVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGhvbGlkYXlzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25Nb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c0RheShwcmV2UHJvcHMpO1xuICB9XG5cbiAgZGF5RWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKCkgJiYgdGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb3VzZUVudGVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uTW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbk1vdXNlRW50ZXIoZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc1NhbWVEYXkgPSAob3RoZXIpID0+IGlzU2FtZURheSh0aGlzLnByb3BzLmRheSwgb3RoZXIpO1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzU2VsZWN0ZWREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGVcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzPy5zb21lKChkYXRlKSA9PiB0aGlzLmlzU2FtZURheU9yV2VlayhkYXRlKSlcbiAgICAgIDogdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG5cbiAgICByZXR1cm4gIWlzU2VsZWN0ZWREYXRlICYmIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgfTtcblxuICBpc0Rpc2FibGVkID0gKCkgPT4gaXNEYXlEaXNhYmxlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNFeGNsdWRlZCA9ICgpID0+IGlzRGF5RXhjbHVkZWQodGhpcy5wcm9wcy5kYXksIHRoaXMucHJvcHMpO1xuXG4gIGlzU3RhcnRPZldlZWsgPSAoKSA9PlxuICAgIGlzU2FtZURheShcbiAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgKSxcbiAgICApO1xuXG4gIGlzU2FtZVdlZWsgPSAob3RoZXIpID0+XG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgIGlzU2FtZURheShcbiAgICAgIG90aGVyLFxuICAgICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgKSxcbiAgICApO1xuXG4gIGlzU2FtZURheU9yV2VlayA9IChvdGhlcikgPT4gdGhpcy5pc1NhbWVEYXkob3RoZXIpIHx8IHRoaXMuaXNTYW1lV2VlayhvdGhlcik7XG5cbiAgZ2V0SGlnaExpZ2h0ZWRDbGFzcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgaGlnaGxpZ2h0RGF0ZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWhpZ2hsaWdodERhdGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2YgeydkYXkgc3RyaW5nLCAnY2xhc3NOYW1lJ31cbiAgICBjb25zdCBkYXlTdHIgPSBmb3JtYXREYXRlKGRheSwgXCJNTS5kZC55eXl5XCIpO1xuICAgIHJldHVybiBoaWdobGlnaHREYXRlcy5nZXQoZGF5U3RyKTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiB0byByZXR1cm4gdGhlIGFycmF5IGNvbnRhaW5pbmcgY2xhc3NuYW1lIGFzc29jaWF0ZWQgdG8gdGhlIGRhdGVcbiAgZ2V0SG9saWRheXNDbGFzcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgaG9saWRheXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFob2xpZGF5cykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBkYXlTdHIgPSBmb3JtYXREYXRlKGRheSwgXCJNTS5kZC55eXl5XCIpO1xuICAgIC8vIExvb2tpbmcgZm9yIGNsYXNzTmFtZSBpbiB0aGUgTWFwIG9mIHtkYXkgc3RyaW5nOiB7Y2xhc3NOYW1lLCBob2xpZGF5TmFtZX19XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhkYXlTdHIpKSB7XG4gICAgICByZXR1cm4gW2hvbGlkYXlzLmdldChkYXlTdHIpLmNsYXNzTmFtZV07XG4gICAgfVxuICB9O1xuXG4gIGlzSW5SYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzZWxlY3RzU3RhcnQsXG4gICAgICBzZWxlY3RzRW5kLFxuICAgICAgc2VsZWN0c1JhbmdlLFxuICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChcbiAgICAgICEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fFxuICAgICAgIXNlbGVjdGluZ0RhdGUgfHxcbiAgICAgICghc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UgJiYgdGhpcy5pc0Rpc2FibGVkKCkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c1N0YXJ0ICYmXG4gICAgICBlbmREYXRlICYmXG4gICAgICAoaXNCZWZvcmUoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzZWxlY3RpbmdEYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzRW5kICYmXG4gICAgICBzdGFydERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc2VsZWN0c1JhbmdlICYmXG4gICAgICBzdGFydERhdGUgJiZcbiAgICAgICFlbmREYXRlICYmXG4gICAgICAoaXNBZnRlcihzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpIHx8IGlzRXF1YWwoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlU3RhcnQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzdGFydERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlRW5kID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBlbmREYXRlLCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgZW5kRGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoc3RhcnREYXRlLCBkYXkpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYW1lRGF5KGVuZERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNXZWVrZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHdlZWtkYXkgPSBnZXREYXkodGhpcy5wcm9wcy5kYXkpO1xuICAgIHJldHVybiB3ZWVrZGF5ID09PSAwIHx8IHdlZWtkYXkgPT09IDY7XG4gIH07XG5cbiAgaXNBZnRlck1vbnRoID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnByb3BzLm1vbnRoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICh0aGlzLnByb3BzLm1vbnRoICsgMSkgJSAxMiA9PT0gZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpXG4gICAgKTtcbiAgfTtcblxuICBpc0JlZm9yZU1vbnRoID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnByb3BzLm1vbnRoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIChnZXRNb250aCh0aGlzLnByb3BzLmRheSkgKyAxKSAlIDEyID09PSB0aGlzLnByb3BzLm1vbnRoXG4gICAgKTtcbiAgfTtcblxuICBpc0N1cnJlbnREYXkgPSAoKSA9PiB0aGlzLmlzU2FtZURheShuZXdEYXRlKCkpO1xuXG4gIGlzU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzPy5zb21lKChkYXRlKSA9PlxuICAgICAgICB0aGlzLmlzU2FtZURheU9yV2VlayhkYXRlKSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgfTtcblxuICBnZXRDbGFzc05hbWVzID0gKGRhdGUpID0+IHtcbiAgICBjb25zdCBkYXlDbGFzc05hbWUgPSB0aGlzLnByb3BzLmRheUNsYXNzTmFtZVxuICAgICAgPyB0aGlzLnByb3BzLmRheUNsYXNzTmFtZShkYXRlKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGNsYXNzbmFtZXMoXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheVwiLFxuICAgICAgZGF5Q2xhc3NOYW1lLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLVwiICsgZ2V0RGF5T2ZXZWVrQ29kZSh0aGlzLnByb3BzLmRheSksXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1kaXNhYmxlZFwiOiB0aGlzLmlzRGlzYWJsZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWV4Y2x1ZGVkXCI6IHRoaXMuaXNFeGNsdWRlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1rZXlib2FyZC1zZWxlY3RlZFwiOiB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXJhbmdlXCI6IHRoaXMuaXNJblJhbmdlKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjogdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZVN0YXJ0KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlRW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS10b2RheVwiOiB0aGlzLmlzQ3VycmVudERheSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0td2Vla2VuZFwiOiB0aGlzLmlzV2Vla2VuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tb3V0c2lkZS1tb250aFwiOlxuICAgICAgICAgIHRoaXMuaXNBZnRlck1vbnRoKCkgfHwgdGhpcy5pc0JlZm9yZU1vbnRoKCksXG4gICAgICB9LFxuICAgICAgdGhpcy5nZXRIaWdoTGlnaHRlZENsYXNzKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1oaWdobGlnaHRlZFwiKSxcbiAgICAgIHRoaXMuZ2V0SG9saWRheXNDbGFzcygpLFxuICAgICk7XG4gIH07XG5cbiAgZ2V0QXJpYUxhYmVsID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkID0gXCJDaG9vc2VcIixcbiAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZCA9IFwiTm90IGF2YWlsYWJsZVwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgcHJlZml4ID1cbiAgICAgIHRoaXMuaXNEaXNhYmxlZCgpIHx8IHRoaXMuaXNFeGNsdWRlZCgpXG4gICAgICAgID8gYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkXG4gICAgICAgIDogYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSAke2Zvcm1hdERhdGUoZGF5LCBcIlBQUFBcIiwgdGhpcy5wcm9wcy5sb2NhbGUpfWA7XG4gIH07XG5cbiAgLy8gQSBmdW5jdGlvbiB0byByZXR1cm4gdGhlIGhvbGlkYXkncyBuYW1lIGFzIHRpdGxlJ3MgY29udGVudFxuICBnZXRUaXRsZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgaG9saWRheXMgPSBuZXcgTWFwKCksIGV4Y2x1ZGVEYXRlcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb21wYXJlRHQgPSBmb3JtYXREYXRlKGRheSwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IHRpdGxlcyA9IFtdO1xuICAgIGlmIChob2xpZGF5cy5oYXMoY29tcGFyZUR0KSkge1xuICAgICAgdGl0bGVzLnB1c2goLi4uaG9saWRheXMuZ2V0KGNvbXBhcmVEdCkuaG9saWRheU5hbWVzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNFeGNsdWRlZCgpKSB7XG4gICAgICB0aXRsZXMucHVzaChcbiAgICAgICAgZXhjbHVkZURhdGVzXG4gICAgICAgICAgPy5maWx0ZXIoKGV4Y2x1ZGVEYXRlKSA9PlxuICAgICAgICAgICAgaXNTYW1lRGF5KGV4Y2x1ZGVEYXRlLmRhdGUgPyBleGNsdWRlRGF0ZS5kYXRlIDogZXhjbHVkZURhdGUsIGRheSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5tYXAoKGV4Y2x1ZGVEYXRlKSA9PiBleGNsdWRlRGF0ZS5tZXNzYWdlKSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZXMuam9pbihcIiwgXCIpO1xuICB9O1xuXG4gIGdldFRhYkluZGV4ID0gKHNlbGVjdGVkLCBwcmVTZWxlY3Rpb24pID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHNlbGVjdGVkIHx8IHRoaXMucHJvcHMuc2VsZWN0ZWQ7XG4gICAgY29uc3QgcHJlU2VsZWN0aW9uRGF5ID0gcHJlU2VsZWN0aW9uIHx8IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICEoXG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIgJiZcbiAgICAgICAgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIgfHwgIXRoaXMuaXNTdGFydE9mV2VlaygpKVxuICAgICAgKSAmJlxuICAgICAgKHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCkgfHxcbiAgICAgICAgKHRoaXMuaXNTYW1lRGF5KHNlbGVjdGVkRGF5KSAmJlxuICAgICAgICAgIGlzU2FtZURheShwcmVTZWxlY3Rpb25EYXksIHNlbGVjdGVkRGF5KSkpXG4gICAgICAgID8gMFxuICAgICAgICA6IC0xO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIC8vIHZhcmlvdXMgY2FzZXMgd2hlbiB3ZSBuZWVkIHRvIGFwcGx5IGZvY3VzIHRvIHRoZSBwcmVzZWxlY3RlZCBkYXlcbiAgLy8gZm9jdXMgdGhlIGRheSBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzRGF5ID0gKHByZXZQcm9wcyA9IHt9KSA9PiB7XG4gICAgbGV0IHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgLy8gb25seSBkbyB0aGlzIHdoaWxlIHRoZSBpbnB1dCBpc24ndCBmb2N1c2VkXG4gICAgLy8gb3RoZXJ3aXNlLCB0eXBpbmcvYmFja3NwYWNpbmcgdGhlIGRhdGUgbWFudWFsbHkgbWF5IHN0ZWFsIGZvY3VzIGF3YXkgZnJvbSB0aGUgaW5wdXRcbiAgICBpZiAoXG4gICAgICB0aGlzLmdldFRhYkluZGV4KCkgPT09IDAgJiZcbiAgICAgICFwcmV2UHJvcHMuaXNJbnB1dEZvY3VzZWQgJiZcbiAgICAgIHRoaXMuaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKVxuICAgICkge1xuICAgICAgLy8gdGhlcmUgaXMgY3VycmVudGx5IG5vIGFjdGl2ZUVsZW1lbnQgYW5kIG5vdCBpbmxpbmVcbiAgICAgIGlmICghZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c0RheSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhlIGFjdGl2ZUVsZW1lbnQgaXMgaW4gdGhlIGNvbnRhaW5lciwgYW5kIGl0IGlzIGFub3RoZXIgaW5zdGFuY2Ugb2YgRGF5XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmICYmXG4gICAgICAgIHRoaXMucHJvcHMuY29udGFpbmVyUmVmLmN1cnJlbnQgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmJlxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInJlYWN0LWRhdGVwaWNrZXJfX2RheVwiKVxuICAgICAgKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vZGF5IGlzIG9uZSBvZiB0aGUgbm9uIHJlbmRlcmVkIGR1cGxpY2F0ZSBkYXlzXG4gICAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ICYmIHRoaXMuaXNCZWZvcmVNb250aCgpKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkRm9jdXNEYXkgJiYgdGhpcy5kYXlFbC5jdXJyZW50Py5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIH07XG5cbiAgcmVuZGVyRGF5Q29udGVudHMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgJiYgdGhpcy5pc0FmdGVyTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c1xuICAgICAgPyB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzKGdldERhdGUodGhpcy5wcm9wcy5kYXkpLCB0aGlzLnByb3BzLmRheSlcbiAgICAgIDogZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSk7XG4gIH07XG5cbiAgcmVuZGVyID0gKCkgPT4gKFxuICAgIDxkaXZcbiAgICAgIHJlZj17dGhpcy5kYXlFbH1cbiAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKHRoaXMucHJvcHMuZGF5KX1cbiAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUVudGVyIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50ID8gdGhpcy5oYW5kbGVNb3VzZUVudGVyIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleCgpfVxuICAgICAgYXJpYS1sYWJlbD17dGhpcy5nZXRBcmlhTGFiZWwoKX1cbiAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgdGl0bGU9e3RoaXMuZ2V0VGl0bGUoKX1cbiAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZCgpfVxuICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudERheSgpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWQoKSB8fCB0aGlzLmlzSW5SYW5nZSgpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlckRheUNvbnRlbnRzKCl9XG4gICAgICB7dGhpcy5nZXRUaXRsZSgpICE9PSBcIlwiICYmIChcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib3ZlcmxheVwiPnt0aGlzLmdldFRpdGxlKCl9PC9zcGFuPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWtOdW1iZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJpYUxhYmVsUHJlZml4OiBcIndlZWsgXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2Vla051bWJlcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudCkgfSksXG4gICAgXSksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c1dlZWtOdW1iZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcihwcmV2UHJvcHMpO1xuICB9XG5cbiAgd2Vla051bWJlckVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIGdldFRhYkluZGV4ID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlciAmJlxuICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAoaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCB0aGlzLnByb3BzLnNlbGVjdGVkKSkpXG4gICAgICA/IDBcbiAgICAgIDogLTE7XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIHdlZWstbnVtYmVyXG4gIC8vIGZvY3VzIHRoZSB3ZWVrLW51bWJlciBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzV2Vla051bWJlciA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIFdlZWtOdW1iZXJcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHdlZWtOdW1iZXIsIGFyaWFMYWJlbFByZWZpeCA9IFwid2VlayBcIiwgb25DbGljayB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tY2xpY2thYmxlXCI6ICEhb25DbGljayxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLXNlbGVjdGVkXCI6XG4gICAgICAgICEhb25DbGljayAmJiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3RoaXMud2Vla051bWJlckVsfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMod2Vla051bWJlckNsYXNzZXMpfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHthcmlhTGFiZWxQcmVmaXh9ICR7dGhpcy5wcm9wcy53ZWVrTnVtYmVyfWB9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICA+XG4gICAgICAgIHt3ZWVrTnVtYmVyfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IERheSBmcm9tIFwiLi9kYXlcIjtcbmltcG9ydCBXZWVrTnVtYmVyIGZyb20gXCIuL3dlZWtfbnVtYmVyXCI7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuXG5pbXBvcnQgeyBhZGREYXlzLCBnZXRXZWVrLCBnZXRTdGFydE9mV2VlaywgaXNTYW1lRGF5IH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWVrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgfTtcbiAgfVxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGNhbGVuZGFyU3RhcnREYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkRheU1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0T3BlbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNJbnB1dEZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGhhbmRsZURheUNsaWNrID0gKGRheSwgZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5Q2xpY2soZGF5LCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZURheU1vdXNlRW50ZXIgPSAoZGF5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcihkYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVXZWVrQ2xpY2sgPSAoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5wcm9wcy5vbldlZWtTZWxlY3QoZGF5LCB3ZWVrTnVtYmVyLCBldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyKSB7XG4gICAgICB0aGlzLmhhbmRsZURheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXRXZWVrTnVtYmVyID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyKGRhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0V2VlayhkYXRlKTtcbiAgfTtcblxuICByZW5kZXJEYXlzID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gdGhpcy5zdGFydE9mV2VlaygpO1xuICAgIGNvbnN0IGRheXMgPSBbXTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyID0gdGhpcy5mb3JtYXRXZWVrTnVtYmVyKHN0YXJ0T2ZXZWVrKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlcikge1xuICAgICAgY29uc3Qgb25DbGlja0FjdGlvbiA9XG4gICAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJcbiAgICAgICAgICA/IHRoaXMuaGFuZGxlV2Vla0NsaWNrLmJpbmQodGhpcywgc3RhcnRPZldlZWssIHdlZWtOdW1iZXIpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBkYXlzLnB1c2goXG4gICAgICAgIDxXZWVrTnVtYmVyXG4gICAgICAgICAga2V5PVwiV1wiXG4gICAgICAgICAgd2Vla051bWJlcj17d2Vla051bWJlcn1cbiAgICAgICAgICBkYXRlPXtzdGFydE9mV2Vla31cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQWN0aW9ufVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgYXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcn1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgIC8+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXMuY29uY2F0KFxuICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDZdLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRheSA9IGFkZERheXMoc3RhcnRPZldlZWssIG9mZnNldCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQ9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAga2V5PXtkYXkudmFsdWVPZigpfVxuICAgICAgICAgICAgZGF5PXtkYXl9XG4gICAgICAgICAgICBtb250aD17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2suYmluZCh0aGlzLCBkYXkpfVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0PXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIHN0YXJ0T2ZXZWVrID0gKCkgPT5cbiAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgIHRoaXMucHJvcHMuZGF5LFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMuc3RhcnRPZldlZWsoKSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB3ZWVrTnVtYmVyQ2xhc3NlcyA9IHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1wiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1zZWxlY3RlZFwiOiBpc1NhbWVEYXkoXG4gICAgICAgIHRoaXMuc3RhcnRPZldlZWsoKSxcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWstLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMod2Vla051bWJlckNsYXNzZXMpfT57dGhpcy5yZW5kZXJEYXlzKCl9PC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCBXZWVrIGZyb20gXCIuL3dlZWtcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuY29uc3QgRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQgPSA2O1xuXG5jb25zdCBNT05USF9DT0xVTU5TX0xBWU9VVCA9IHtcbiAgVFdPX0NPTFVNTlM6IFwidHdvX2NvbHVtbnNcIixcbiAgVEhSRUVfQ09MVU1OUzogXCJ0aHJlZV9jb2x1bW5zXCIsXG4gIEZPVVJfQ09MVU1OUzogXCJmb3VyX2NvbHVtbnNcIixcbn07XG5jb25zdCBNT05USF9DT0xVTU5TID0ge1xuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlNdOiB7XG4gICAgZ3JpZDogW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzIsIDNdLFxuICAgICAgWzQsIDVdLFxuICAgICAgWzYsIDddLFxuICAgICAgWzgsIDldLFxuICAgICAgWzEwLCAxMV0sXG4gICAgXSxcbiAgICB2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQ6IDIsXG4gIH0sXG4gIFtNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyXSxcbiAgICAgIFszLCA0LCA1XSxcbiAgICAgIFs2LCA3LCA4XSxcbiAgICAgIFs5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAzLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuRk9VUl9DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxLCAyLCAzXSxcbiAgICAgIFs0LCA1LCA2LCA3XSxcbiAgICAgIFs4LCA5LCAxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiA0LFxuICB9LFxufTtcbmNvbnN0IE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQgPSAxO1xuXG5mdW5jdGlvbiBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuKSB7XG4gIGlmIChzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcikgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OUztcbiAgaWYgKHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5UV09fQ09MVU1OUztcbiAgcmV0dXJuIE1PTlRIX0NPTFVNTlNfTEFZT1VULlRIUkVFX0NPTFVNTlM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXk6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF5Q2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtb250aENsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb3JkZXJJbkRpc3BsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uV2Vla1NlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c011bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZERhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSksXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGFuZGxlT25Nb250aEtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGN1cnJlbnQ6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIE1PTlRIX1JFRlMgPSBbLi4uQXJyYXkoMTIpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuICBRVUFSVEVSX1JFRlMgPSBbLi4uQXJyYXkoNCldLm1hcCgoKSA9PiBSZWFjdC5jcmVhdGVSZWYoKSk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQsIHRoaXMucHJvcHMub3JkZXJJbkRpc3BsYXkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUpIHtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKCk7XG4gICAgfVxuICB9O1xuXG4gIGlzUmFuZ2VTdGFydE1vbnRoID0gKG0pID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aCh1dGlscy5zZXRNb250aChkYXksIG0pLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VTdGFydFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZFF1YXJ0ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVF1YXJ0ZXIodXRpbHMuc2V0UXVhcnRlcihkYXksIHEpLCBlbmREYXRlKTtcbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlLCBtLCBkYXkpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzRW5kICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzTW9udGhJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQgPSAobSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2VNb250aChtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0KSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc3RhcnREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aCA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIGVuZERhdGUpO1xuICAgIH1cbiAgfTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKCEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fCAhc2VsZWN0aW5nRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzUXVhcnRlckluUmFuZ2Uoc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlLCBxLCBkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1dlZWtJbk1vbnRoID0gKHN0YXJ0T2ZXZWVrKSA9PiB7XG4gICAgY29uc3QgZGF5ID0gdGhpcy5wcm9wcy5kYXk7XG4gICAgY29uc3QgZW5kT2ZXZWVrID0gdXRpbHMuYWRkRGF5cyhzdGFydE9mV2VlaywgNik7XG4gICAgcmV0dXJuIChcbiAgICAgIHV0aWxzLmlzU2FtZU1vbnRoKHN0YXJ0T2ZXZWVrLCBkYXkpIHx8IHV0aWxzLmlzU2FtZU1vbnRoKGVuZE9mV2VlaywgZGF5KVxuICAgICk7XG4gIH07XG5cbiAgaXNDdXJyZW50TW9udGggPSAoZGF5LCBtKSA9PlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcih1dGlscy5uZXdEYXRlKCkpICYmXG4gICAgbSA9PT0gdXRpbHMuZ2V0TW9udGgodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc0N1cnJlbnRRdWFydGVyID0gKGRheSwgcSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIHEgPT09IHV0aWxzLmdldFF1YXJ0ZXIodXRpbHMubmV3RGF0ZSgpKTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoZGF5LCBtLCBzZWxlY3RlZCkgPT5cbiAgICB1dGlscy5nZXRNb250aChzZWxlY3RlZCkgPT09IG0gJiZcbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIoc2VsZWN0ZWQpO1xuXG4gIGlzU2VsZWN0ZWRRdWFydGVyID0gKGRheSwgcSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0UXVhcnRlcihkYXkpID09PSBxICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICByZW5kZXJXZWVrcyA9ICgpID0+IHtcbiAgICBjb25zdCB3ZWVrcyA9IFtdO1xuICAgIHZhciBpc0ZpeGVkSGVpZ2h0ID0gdGhpcy5wcm9wcy5maXhlZEhlaWdodDtcblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgYnJlYWtBZnRlck5leHRQdXNoID0gZmFsc2U7XG4gICAgbGV0IGN1cnJlbnRXZWVrU3RhcnQgPSB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgIHV0aWxzLmdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLmRheSksXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICApO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICAgICApXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQ7XG5cbiAgICBjb25zdCBwcmVTZWxlY3Rpb24gPSB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICA/IHV0aWxzLmdldFN0YXJ0T2ZXZWVrKFxuICAgICAgICAgIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB3ZWVrcy5wdXNoKFxuICAgICAgICA8V2Vla1xuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy53ZWVrQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRheT17Y3VycmVudFdlZWtTdGFydH1cbiAgICAgICAgICBtb250aD17dXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5kYXkpfVxuICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICBvbkRheU1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlcn1cbiAgICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgZXhjbHVkZURhdGVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVEYXRlc31cbiAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgaGlnaGxpZ2h0RGF0ZXM9e3RoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXN9XG4gICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3ByZVNlbGVjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICBzaG93V2Vla051bWJlcj17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICBlbmREYXRlPXt0aGlzLnByb3BzLmVuZERhdGV9XG4gICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmR9XG4gICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17dGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0fVxuICAgICAgICAvPixcbiAgICAgICk7XG5cbiAgICAgIGlmIChicmVha0FmdGVyTmV4dFB1c2gpIGJyZWFrO1xuXG4gICAgICBpKys7XG4gICAgICBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuYWRkV2Vla3MoY3VycmVudFdlZWtTdGFydCwgMSk7XG5cbiAgICAgIC8vIElmIG9uZSBvZiB0aGVzZSBjb25kaXRpb25zIGlzIHRydWUsIHdlIHdpbGwgZWl0aGVyIGJyZWFrIG9uIHRoaXMgd2Vla1xuICAgICAgLy8gb3IgYnJlYWsgb24gdGhlIG5leHQgd2Vla1xuICAgICAgY29uc3QgaXNGaXhlZEFuZEZpbmFsV2VlayA9XG4gICAgICAgIGlzRml4ZWRIZWlnaHQgJiYgaSA+PSBGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVDtcbiAgICAgIGNvbnN0IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoID1cbiAgICAgICAgIWlzRml4ZWRIZWlnaHQgJiYgIXRoaXMuaXNXZWVrSW5Nb250aChjdXJyZW50V2Vla1N0YXJ0KTtcblxuICAgICAgaWYgKGlzRml4ZWRBbmRGaW5hbFdlZWsgfHwgaXNOb25GaXhlZEFuZE91dE9mTW9udGgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGVla05leHRNb250aCkge1xuICAgICAgICAgIGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gd2Vla3M7XG4gIH07XG5cbiAgb25Nb250aENsaWNrID0gKGUsIG0pID0+IHtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aCh0aGlzLnByb3BzLmRheSwgbSk7XG5cbiAgICBpZiAodXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpLCBlKTtcbiAgfTtcblxuICBvbk1vbnRoTW91c2VFbnRlciA9IChtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyKHV0aWxzLmdldFN0YXJ0T2ZNb250aChsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVNb250aE5hdmlnYXRpb24gPSAobmV3TW9udGgsIG5ld0RhdGUpID0+IHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudCAmJlxuICAgICAgdGhpcy5NT05USF9SRUZTW25ld01vbnRoXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25Nb250aEtleURvd24gPSAoZXZlbnQsIG1vbnRoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWQsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNldFByZVNlbGVjdGlvbixcbiAgICAgIGhhbmRsZU9uTW9udGhLZXlEb3duLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSAhPT0gXCJUYWJcIikge1xuICAgICAgLy8gcHJldmVudERlZmF1bHQgb24gdGFiIGV2ZW50IGJsb2NrcyBmb2N1cyBjaGFuZ2VcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IG1vbnRoQ29sdW1uc0xheW91dCA9IGdldE1vbnRoQ29sdW1uc0xheW91dChcbiAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICApO1xuICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQgPVxuICAgICAgICBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0udmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0O1xuICAgICAgY29uc3QgbW9udGhzR3JpZCA9IE1PTlRIX0NPTFVNTlNbbW9udGhDb2x1bW5zTGF5b3V0XS5ncmlkO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldmVudCwgbW9udGgpO1xuICAgICAgICAgIHNldFByZVNlbGVjdGlvbihzZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICBtb250aCA9PT0gMTEgPyAwIDogbW9udGggKyBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VULFxuICAgICAgICAgICAgdXRpbHMuYWRkTW9udGhzKHByZVNlbGVjdGlvbiwgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDAgPyAxMSA6IG1vbnRoIC0gTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLnN1Yk1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVNb250aE5hdmlnYXRpb24oXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBtb250aCBvbiB0aGUgZmlyc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkWzBdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoICsgMTIgLSB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoIC0gdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGxhc3Qgcm93XG4gICAgICAgICAgICBtb250aHNHcmlkW21vbnRoc0dyaWQubGVuZ3RoIC0gMV0uaW5jbHVkZXMobW9udGgpXG4gICAgICAgICAgICAgID8gbW9udGggLSAxMiArIHZlcnRpY2FsT2Zmc2V0XG4gICAgICAgICAgICAgIDogbW9udGggKyB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIHZlcnRpY2FsT2Zmc2V0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duICYmIGhhbmRsZU9uTW9udGhLZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBvblF1YXJ0ZXJDbGljayA9IChlLCBxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5Q2xpY2sodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25RdWFydGVyTW91c2VFbnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0UXVhcnRlcih0aGlzLnByb3BzLmRheSwgcSk7XG5cbiAgICBpZiAodXRpbHMuaXNRdWFydGVyRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mUXVhcnRlcihsYWJlbERhdGUpKTtcbiAgfTtcblxuICBoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiA9IChuZXdRdWFydGVyLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLlFVQVJURVJfUkVGU1tuZXdRdWFydGVyIC0gMV0uY3VycmVudCAmJlxuICAgICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQuZm9jdXMoKTtcbiAgfTtcblxuICBvblF1YXJ0ZXJLZXlEb3duID0gKGV2ZW50LCBxdWFydGVyKSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXZlbnQsIHF1YXJ0ZXIpO1xuICAgICAgICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlUXVhcnRlck5hdmlnYXRpb24oXG4gICAgICAgICAgICBxdWFydGVyID09PSA0ID8gMSA6IHF1YXJ0ZXIgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkUXVhcnRlcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gMSA/IDQgOiBxdWFydGVyIC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBnZXRNb250aENsYXNzTmFtZXMgPSAobSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgbW9udGhDbGFzc05hbWUsXG4gICAgICBleGNsdWRlRGF0ZXMsXG4gICAgICBpbmNsdWRlRGF0ZXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoQ2xhc3NOYW1lID0gbW9udGhDbGFzc05hbWVcbiAgICAgID8gbW9udGhDbGFzc05hbWUodXRpbHMuc2V0TW9udGgoZGF5LCBtKSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbSk7XG4gICAgcmV0dXJuIGNsYXNzbmFtZXMoXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19tb250aC0ke219YCxcbiAgICAgIF9tb250aENsYXNzTmFtZSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAgIChtaW5EYXRlIHx8IG1heERhdGUgfHwgZXhjbHVkZURhdGVzIHx8IGluY2x1ZGVEYXRlcykgJiZcbiAgICAgICAgICB1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRNb250aChcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgbSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1rZXlib2FyZC1zZWxlY3RlZFwiOlxuICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkTW9udGgoZGF5LCBtLCBwcmVTZWxlY3Rpb24pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0taW4tcmFuZ2VcIjogdXRpbHMuaXNNb250aEluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgbSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnRNb250aChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kTW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydChtKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFRhYkluZGV4ID0gKG0pID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZE1vbnRoID0gdXRpbHMuZ2V0TW9udGgodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIG0gPT09IHByZVNlbGVjdGVkTW9udGhcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRRdWFydGVyVGFiSW5kZXggPSAocSkgPT4ge1xuICAgIGNvbnN0IHByZVNlbGVjdGVkUXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHRhYkluZGV4ID1cbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmIHEgPT09IHByZVNlbGVjdGVkUXVhcnRlclxuICAgICAgICA/IFwiMFwiXG4gICAgICAgIDogXCItMVwiO1xuXG4gICAgcmV0dXJuIHRhYkluZGV4O1xuICB9O1xuXG4gIGdldEFyaWFMYWJlbCA9IChtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeCA9IFwiQ2hvb3NlXCIsXG4gICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCA9IFwiTm90IGF2YWlsYWJsZVwiLFxuICAgICAgZGF5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtb250aCk7XG4gICAgY29uc3QgcHJlZml4ID1cbiAgICAgIHRoaXMuaXNEaXNhYmxlZChsYWJlbERhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChsYWJlbERhdGUpXG4gICAgICAgID8gZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXhcbiAgICAgICAgOiBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSAke3V0aWxzLmZvcm1hdERhdGUobGFiZWxEYXRlLCBcIk1NTU0geXl5eVwiKX1gO1xuICB9O1xuXG4gIGdldFF1YXJ0ZXJDbGFzc05hbWVzID0gKHEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbGFzc25hbWVzKFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHRcIixcbiAgICAgIGByZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLSR7cX1gLFxuICAgICAge1xuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlKSAmJlxuICAgICAgICAgIHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBxLFxuICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWRRdWFydGVyKGRheSwgcSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzUXVhcnRlckluUmFuZ2UoXG4gICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgcSxcbiAgICAgICAgICBkYXksXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNSYW5nZVN0YXJ0UXVhcnRlcihxKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmRRdWFydGVyKHEpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldE1vbnRoQ29udGVudCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBzaG93RnVsbE1vbnRoWWVhclBpY2tlciwgcmVuZGVyTW9udGhDb250ZW50LCBsb2NhbGUsIGRheSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvcnRNb250aFRleHQgPSB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBjb25zdCBmdWxsTW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhJbkxvY2FsZShtLCBsb2NhbGUpO1xuICAgIGlmIChyZW5kZXJNb250aENvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNb250aENvbnRlbnQobSwgc2hvcnRNb250aFRleHQsIGZ1bGxNb250aFRleHQsIGRheSk7XG4gICAgfVxuICAgIHJldHVybiBzaG93RnVsbE1vbnRoWWVhclBpY2tlciA/IGZ1bGxNb250aFRleHQgOiBzaG9ydE1vbnRoVGV4dDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ29udGVudCA9IChxKSA9PiB7XG4gICAgY29uc3QgeyByZW5kZXJRdWFydGVyQ29udGVudCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0UXVhcnRlciA9IHV0aWxzLmdldFF1YXJ0ZXJTaG9ydEluTG9jYWxlKHEsIGxvY2FsZSk7XG4gICAgcmV0dXJuIHJlbmRlclF1YXJ0ZXJDb250ZW50XG4gICAgICA/IHJlbmRlclF1YXJ0ZXJDb250ZW50KHEsIHNob3J0UXVhcnRlcilcbiAgICAgIDogc2hvcnRRdWFydGVyO1xuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBzZWxlY3RlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1vbnRoQ29sdW1ucyA9XG4gICAgICBNT05USF9DT0xVTU5TW1xuICAgICAgICBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgICAgKVxuICAgICAgXS5ncmlkO1xuICAgIHJldHVybiBtb250aENvbHVtbnMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC13cmFwcGVyXCIga2V5PXtpfT5cbiAgICAgICAge21vbnRoLm1hcCgobSwgaikgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17dGhpcy5NT05USF9SRUZTW21dfVxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25Nb250aENsaWNrKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTcGFjZUtleURvd24oZXYpKSB7XG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhLZXlEb3duKGV2LCBtKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vbk1vbnRoTW91c2VFbnRlcihtKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRUYWJJbmRleChtKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRNb250aENsYXNzTmFtZXMobSl9XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RoaXMuZ2V0QXJpYUxhYmVsKG0pfVxuICAgICAgICAgICAgYXJpYS1jdXJyZW50PXt0aGlzLmlzQ3VycmVudE1vbnRoKGRheSwgbSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgc2VsZWN0ZWQpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldE1vbnRoQ29udGVudChtKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJRdWFydGVycyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcXVhcnRlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci13cmFwcGVyXCI+XG4gICAgICAgIHtxdWFydGVycy5tYXAoKHEsIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICByZWY9e3RoaXMuUVVBUlRFUl9SRUZTW2pdfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJDbGljayhldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vblF1YXJ0ZXJLZXlEb3duKGV2LCBxKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25RdWFydGVyTW91c2VFbnRlcihxKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFF1YXJ0ZXJDbGFzc05hbWVzKHEpfVxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHNlbGVjdGVkKX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFF1YXJ0ZXJUYWJJbmRleChxKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRRdWFydGVyKGRheSwgcSkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRRdWFydGVyQ29udGVudChxKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0aW5nRGF0ZSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyLFxuICAgICAgc2hvd1dlZWtQaWNrZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gY2xhc3NuYW1lcyhcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhcIixcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC0tc2VsZWN0aW5nLXJhbmdlXCI6XG4gICAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQpLFxuICAgICAgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aFBpY2tlclwiOiBzaG93TW9udGhZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlclBpY2tlclwiOiBzaG93UXVhcnRlclllYXJQaWNrZXIgfSxcbiAgICAgIHsgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrUGlja2VyXCI6IHNob3dXZWVrUGlja2VyIH0sXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIGRheSxcbiAgICAgIGFyaWFMYWJlbFByZWZpeCA9IFwiTW9udGggXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXggPSBhcmlhTGFiZWxQcmVmaXhcbiAgICAgID8gYXJpYUxhYmVsUHJlZml4LnRyaW0oKSArIFwiIFwiXG4gICAgICA6IFwiXCI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lcygpfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckxlYXZlPXtcbiAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudCA/IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake2Zvcm1hdHRlZEFyaWFMYWJlbFByZWZpeH0ke3V0aWxzLmZvcm1hdERhdGUoZGF5LCBcIk1NTU0sIHl5eXlcIil9YH1cbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgPlxuICAgICAgICB7c2hvd01vbnRoWWVhclBpY2tlclxuICAgICAgICAgID8gdGhpcy5yZW5kZXJNb250aHMoKVxuICAgICAgICAgIDogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgICA/IHRoaXMucmVuZGVyUXVhcnRlcnMoKVxuICAgICAgICAgICAgOiB0aGlzLnJlbmRlcldlZWtzKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge1xuICBnZXRIb3VycyxcbiAgZ2V0TWludXRlcyxcbiAgbmV3RGF0ZSxcbiAgZ2V0U3RhcnRPZkRheSxcbiAgYWRkTWludXRlcyxcbiAgZm9ybWF0RGF0ZSxcbiAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlLFxuICBpc1RpbWVEaXNhYmxlZCxcbiAgdGltZXNUb0luamVjdEFmdGVyLFxuICBnZXRIb3Vyc0luRGF5LFxuICBpc1NhbWVNaW51dGUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcnZhbHM6IDMwLFxuICAgICAgb25UaW1lQ2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIHRvZGF5QnV0dG9uOiBudWxsLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgY2FsY0NlbnRlclBvc2l0aW9uID0gKGxpc3RIZWlnaHQsIGNlbnRlckxpUmVmKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNlbnRlckxpUmVmLm9mZnNldFRvcCAtIChsaXN0SGVpZ2h0IC8gMiAtIGNlbnRlckxpUmVmLmNsaWVudEhlaWdodCAvIDIpXG4gICAgKTtcbiAgfTtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbmNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbnRlcnZhbHM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbWluVGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWF4VGltZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyVGltZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhSZWY6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGltZUNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaGVpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIGNvZGUgdG8gZW5zdXJlIHNlbGVjdGVkIHRpbWUgd2lsbCBhbHdheXMgYmUgaW4gZm9jdXMgd2l0aGluIHRpbWUgd2luZG93IHdoZW4gaXQgZmlyc3QgYXBwZWFyc1xuICAgIHRoaXMuc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFJlZiAmJiB0aGlzLmhlYWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSA9ICgpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybjtcblxuICAgICAgdGhpcy5saXN0LnNjcm9sbFRvcCA9XG4gICAgICAgIHRoaXMuY2VudGVyTGkgJiZcbiAgICAgICAgVGltZS5jYWxjQ2VudGVyUG9zaXRpb24oXG4gICAgICAgICAgdGhpcy5wcm9wcy5tb250aFJlZlxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm1vbnRoUmVmLmNsaWVudEhlaWdodCAtIHRoaXMuaGVhZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmxpc3QuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIHRoaXMuY2VudGVyTGksXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAodGltZSkgPT4ge1xuICAgIGlmIChcbiAgICAgICgodGhpcy5wcm9wcy5taW5UaW1lIHx8IHRoaXMucHJvcHMubWF4VGltZSkgJiZcbiAgICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmluY2x1ZGVUaW1lcyB8fFxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRpbWUpO1xuICB9O1xuXG4gIGlzU2VsZWN0ZWRUaW1lID0gKHRpbWUpID0+XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJiBpc1NhbWVNaW51dGUodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGltZSk7XG5cbiAgaXNEaXNhYmxlZFRpbWUgPSAodGltZSkgPT5cbiAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgdGhpcy5wcm9wcykpIHx8XG4gICAgKCh0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lcyB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyVGltZSkgJiZcbiAgICAgIGlzVGltZURpc2FibGVkKHRpbWUsIHRoaXMucHJvcHMpKTtcblxuICBsaUNsYXNzZXMgPSAodGltZSkgPT4ge1xuICAgIGxldCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbVwiLFxuICAgICAgdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lID8gdGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lKHRpbWUpIDogdW5kZWZpbmVkLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3QtaXRlbS0tZGlzYWJsZWRcIik7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuaW5qZWN0VGltZXMgJiZcbiAgICAgIChnZXRIb3Vycyh0aW1lKSAqIDYwICsgZ2V0TWludXRlcyh0aW1lKSkgJSB0aGlzLnByb3BzLmludGVydmFscyAhPT0gMFxuICAgICkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWluamVjdGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCwgdGltZSkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZy5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgdGhpcy5oYW5kbGVDbGljayh0aW1lKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVzID0gKCkgPT4ge1xuICAgIGxldCB0aW1lcyA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMucHJvcHMuZm9ybWF0ID8gdGhpcy5wcm9wcy5mb3JtYXQgOiBcInBcIjtcbiAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLnByb3BzLmludGVydmFscztcblxuICAgIGNvbnN0IGFjdGl2ZURhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCB8fCB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgfHwgbmV3RGF0ZSgpO1xuXG4gICAgY29uc3QgYmFzZSA9IGdldFN0YXJ0T2ZEYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3Qgc29ydGVkSW5qZWN0VGltZXMgPVxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgbWludXRlc0luRGF5ID0gNjAgKiBnZXRIb3Vyc0luRGF5KGFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBtaW51dGVzSW5EYXkgLyBpbnRlcnZhbHM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11bHRpcGxpZXI7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBhZGRNaW51dGVzKGJhc2UsIGkgKiBpbnRlcnZhbHMpO1xuICAgICAgdGltZXMucHVzaChjdXJyZW50VGltZSk7XG5cbiAgICAgIGlmIChzb3J0ZWRJbmplY3RUaW1lcykge1xuICAgICAgICBjb25zdCB0aW1lc1RvSW5qZWN0ID0gdGltZXNUb0luamVjdEFmdGVyKFxuICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgY3VycmVudFRpbWUsXG4gICAgICAgICAgaSxcbiAgICAgICAgICBpbnRlcnZhbHMsXG4gICAgICAgICAgc29ydGVkSW5qZWN0VGltZXMsXG4gICAgICAgICk7XG4gICAgICAgIHRpbWVzID0gdGltZXMuY29uY2F0KHRpbWVzVG9JbmplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSB3aGljaCB0aW1lIHRvIGZvY3VzIGFuZCBzY3JvbGwgaW50byB2aWV3IHdoZW4gY29tcG9uZW50IG1vdW50c1xuICAgIGNvbnN0IHRpbWVUb0ZvY3VzID0gdGltZXMucmVkdWNlKChwcmV2LCB0aW1lKSA9PiB7XG4gICAgICBpZiAodGltZS5nZXRUaW1lKCkgPD0gYWN0aXZlRGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aW1lc1swXSk7XG5cbiAgICByZXR1cm4gdGltZXMubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGlcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRpbWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5saUNsYXNzZXModGltZSl9XG4gICAgICAgICAgcmVmPXsobGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lID09PSB0aW1lVG9Gb2N1cykge1xuICAgICAgICAgICAgICB0aGlzLmNlbnRlckxpID0gbGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPbktleURvd24oZXYsIHRpbWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RpbWUgPT09IHRpbWVUb0ZvY3VzID8gMCA6IC0xfVxuICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZSh0aW1lLCBmb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXIgJHtcbiAgICAgICAgICB0aGlzLnByb3BzLnRvZGF5QnV0dG9uXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXItLXdpdGgtdG9kYXktYnV0dG9uXCJcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUgJHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUtLW9ubHlcIlxuICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICB9YH1cbiAgICAgICAgICByZWY9eyhoZWFkZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faGVhZGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1ib3hcIj5cbiAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3RcIlxuICAgICAgICAgICAgICByZWY9eyhsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgc3R5bGU9e2hlaWdodCA/IHsgaGVpZ2h0IH0gOiB7fX1cbiAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lcygpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBuZXdEYXRlIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xlYXJTZWxlY3RpbmdEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgb25EYXlDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRQcmVTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvblllYXJNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyWWVhckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIFlFQVJfUkVGUyA9IFsuLi5BcnJheSh0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyKV0ubWFwKCgpID0+XG4gICAgUmVhY3QuY3JlYXRlUmVmKCksXG4gICk7XG5cbiAgaXNEaXNhYmxlZCA9IChkYXRlKSA9PiB1dGlscy5pc0RheURpc2FibGVkKGRhdGUsIHRoaXMucHJvcHMpO1xuXG4gIGlzRXhjbHVkZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlFeGNsdWRlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBzZWxlY3RpbmdEYXRlID0gKCkgPT4gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gIHVwZGF0ZUZvY3VzT25QYWdpbmF0ZSA9IChyZWZJbmRleCkgPT4ge1xuICAgIGNvbnN0IHdhaXRGb3JSZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuWUVBUl9SRUZTW3JlZkluZGV4XS5jdXJyZW50LmZvY3VzKCk7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh3YWl0Rm9yUmVSZW5kZXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVZZWFyTmF2aWdhdGlvbiA9IChuZXdZZWFyLCBuZXdEYXRlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChkYXRlLCB5ZWFySXRlbU51bWJlcik7XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKG5ld0RhdGUpIHx8IHRoaXMuaXNFeGNsdWRlZChuZXdEYXRlKSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKG5ld0RhdGUpO1xuXG4gICAgaWYgKG5ld1llYXIgLSBzdGFydFBlcmlvZCA9PT0gLTEpIHtcbiAgICAgIHRoaXMudXBkYXRlRm9jdXNPblBhZ2luYXRlKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gICAgfSBlbHNlIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IHllYXJJdGVtTnVtYmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSgwKTtcbiAgICB9IGVsc2UgdGhpcy5ZRUFSX1JFRlNbbmV3WWVhciAtIHN0YXJ0UGVyaW9kXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgaXNTYW1lRGF5ID0gKHksIG90aGVyKSA9PiB1dGlscy5pc1NhbWVEYXkoeSwgb3RoZXIpO1xuXG4gIGlzQ3VycmVudFllYXIgPSAoeSkgPT4geSA9PT0gZ2V0WWVhcihuZXdEYXRlKCkpO1xuXG4gIGlzUmFuZ2VTdGFydCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuc3RhcnREYXRlKTtcblxuICBpc1JhbmdlRW5kID0gKHkpID0+XG4gICAgdGhpcy5wcm9wcy5zdGFydERhdGUgJiZcbiAgICB0aGlzLnByb3BzLmVuZERhdGUgJiZcbiAgICB1dGlscy5pc1NhbWVZZWFyKHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luUmFuZ2UgPSAoeSkgPT5cbiAgICB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUpO1xuXG4gIGlzSW5TZWxlY3RpbmdSYW5nZSA9ICh5KSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgICEoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB8fFxuICAgICAgIXRoaXMuc2VsZWN0aW5nRGF0ZSgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzZWxlY3RzU3RhcnQgJiYgZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgdGhpcy5zZWxlY3RpbmdEYXRlKCksIGVuZERhdGUpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1JhbmdlICYmIHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzWWVhckluUmFuZ2UoeSwgc3RhcnREYXRlLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpc1NlbGVjdGluZ1JhbmdlU3RhcnQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgc2VsZWN0c1N0YXJ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHN0YXJ0RGF0ZSk7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZUVuZCA9ICh5KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZW5kRGF0ZSwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF95ZWFyID0gdXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lWWVhcihfeWVhciwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKHkpID0+IHtcbiAgICBjb25zdCBkYXRlID0gdXRpbHMuZ2V0U3RhcnRPZlllYXIodXRpbHMuc2V0WWVhcih0aGlzLnByb3BzLmRhdGUsIHkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24gJiZcbiAgICAgICF0aGlzLnByb3BzLmlubGluZSAmJlxuICAgICAgIXV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnNlbGVjdGVkKSkgJiZcbiAgICAgIHV0aWxzLmlzU2FtZURheShkYXRlLCB1dGlscy5nZXRTdGFydE9mWWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbikpXG4gICAgKTtcbiAgfTtcblxuICBvblllYXJDbGljayA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuaGFuZGxlWWVhckNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIoZGF0ZSwgeSkpLCBlKTtcbiAgfTtcblxuICBvblllYXJLZXlEb3duID0gKGUsIHkpID0+IHtcbiAgICBjb25zdCB7IGtleSB9ID0gZTtcbiAgICBjb25zdCB7IGhhbmRsZU9uS2V5RG93biB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vblllYXJDbGljayhlLCB5KTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSArIDEsXG4gICAgICAgICAgICB1dGlscy5hZGRZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhck5hdmlnYXRpb24oXG4gICAgICAgICAgICB5IC0gMSxcbiAgICAgICAgICAgIHV0aWxzLnN1YlllYXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5RG93biAmJiBoYW5kbGVPbktleURvd24oZSk7XG4gIH07XG5cbiAgZ2V0WWVhckNsYXNzTmFtZXMgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBleGNsdWRlRGF0ZXMsXG4gICAgICBpbmNsdWRlRGF0ZXMsXG4gICAgICBmaWx0ZXJEYXRlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbGFzc25hbWVzKFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0XCIsIHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RlZFwiOiB5ID09PSBnZXRZZWFyKHNlbGVjdGVkKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1kaXNhYmxlZFwiOlxuICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMgfHwgZmlsdGVyRGF0ZSkgJiZcbiAgICAgICAgdXRpbHMuaXNZZWFyRGlzYWJsZWQoeSwgdGhpcy5wcm9wcyksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoeSksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2Utc3RhcnRcIjogdGhpcy5pc1JhbmdlU3RhcnQoeSksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCh5KSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSh5KSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSksXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgIHRoaXMuaXNTZWxlY3RpbmdSYW5nZVN0YXJ0KHkpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlRW5kKHkpLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50WWVhcih5KSxcbiAgICB9KTtcbiAgfTtcblxuICBnZXRZZWFyVGFiSW5kZXggPSAoeSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSByZXR1cm4gXCItMVwiO1xuICAgIGNvbnN0IHByZVNlbGVjdGVkID0gdXRpbHMuZ2V0WWVhcih0aGlzLnByb3BzLnByZVNlbGVjdGlvbik7XG5cbiAgICByZXR1cm4geSA9PT0gcHJlU2VsZWN0ZWQgPyBcIjBcIiA6IFwiLTFcIjtcbiAgfTtcblxuICBnZXRZZWFyQ29udGFpbmVyQ2xhc3NOYW1lcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGluZ0RhdGUsIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xhc3NuYW1lcyhcInJlYWN0LWRhdGVwaWNrZXJfX3llYXJcIiwge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgc2VsZWN0aW5nRGF0ZSAmJiAoc2VsZWN0c1N0YXJ0IHx8IHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSxcbiAgICB9KTtcbiAgfTtcblxuICBnZXRZZWFyQ29udGVudCA9ICh5KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnQgPyB0aGlzLnByb3BzLnJlbmRlclllYXJDb250ZW50KHkpIDogeTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeWVhcnNMaXN0ID0gW107XG4gICAgY29uc3QgeyBkYXRlLCB5ZWFySXRlbU51bWJlciwgb25ZZWFyTW91c2VFbnRlciwgb25ZZWFyTW91c2VMZWF2ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSB1dGlscy5nZXRZZWFyc1BlcmlvZChcbiAgICAgIGRhdGUsXG4gICAgICB5ZWFySXRlbU51bWJlcixcbiAgICApO1xuXG4gICAgZm9yIChsZXQgeSA9IHN0YXJ0UGVyaW9kOyB5IDw9IGVuZFBlcmlvZDsgeSsrKSB7XG4gICAgICB5ZWFyc0xpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17dGhpcy5ZRUFSX1JFRlNbeSAtIHN0YXJ0UGVyaW9kXX1cbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25ZZWFyQ2xpY2soZXYsIHkpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1NwYWNlS2V5RG93bihldikpIHtcbiAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uWWVhcktleURvd24oZXYsIHkpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0WWVhclRhYkluZGV4KHkpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRZZWFyQ2xhc3NOYW1lcyh5KX1cbiAgICAgICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUVudGVyKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJFbnRlcj17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VFbnRlcihldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAgICF0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VMZWF2ZShldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlTGVhdmUoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17eX1cbiAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50WWVhcih5KSA/IFwiZGF0ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMuZ2V0WWVhckNvbnRlbnQoeSl9XG4gICAgICAgIDwvZGl2PixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldFllYXJDb250YWluZXJDbGFzc05hbWVzKCl9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci13cmFwcGVyXCJcbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jbGVhclNlbGVjdGluZ0RhdGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmU9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNsZWFyU2VsZWN0aW5nRGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5ZWFyc0xpc3R9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbnB1dFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB0aW1lU3RyaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1c3RvbVRpbWVJbnB1dDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGltZTogdGhpcy5wcm9wcy50aW1lU3RyaW5nLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgIGlmIChwcm9wcy50aW1lU3RyaW5nICE9PSBzdGF0ZS50aW1lKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aW1lOiBwcm9wcy50aW1lU3RyaW5nLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gbnVsbCB0byBpbmRpY2F0ZSBubyBjaGFuZ2UgdG8gc3RhdGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvblRpbWVDaGFuZ2UgPSAodGltZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0aW1lIH0pO1xuXG4gICAgY29uc3QgeyBkYXRlOiBwcm9wRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc1Byb3BEYXRlVmFsaWQgPSBwcm9wRGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKHByb3BEYXRlKTtcbiAgICBjb25zdCBkYXRlID0gaXNQcm9wRGF0ZVZhbGlkID8gcHJvcERhdGUgOiBuZXcgRGF0ZSgpO1xuXG4gICAgZGF0ZS5zZXRIb3Vycyh0aW1lLnNwbGl0KFwiOlwiKVswXSk7XG4gICAgZGF0ZS5zZXRNaW51dGVzKHRpbWUuc3BsaXQoXCI6XCIpWzFdKTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyVGltZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdGltZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRhdGUsIHRpbWVTdHJpbmcsIGN1c3RvbVRpbWVJbnB1dCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChjdXN0b21UaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tVGltZUlucHV0LCB7XG4gICAgICAgIGRhdGUsXG4gICAgICAgIHZhbHVlOiB0aW1lLFxuICAgICAgICBvbkNoYW5nZTogdGhpcy5vblRpbWVDaGFuZ2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0aW1lXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVGltZVwiXG4gICAgICAgIG5hbWU9XCJ0aW1lLWlucHV0XCJcbiAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgdmFsdWU9e3RpbWV9XG4gICAgICAgIG9uQ2hhbmdlPXsoZXYpID0+IHtcbiAgICAgICAgICB0aGlzLm9uVGltZUNoYW5nZShldi50YXJnZXQudmFsdWUgfHwgdGltZVN0cmluZyk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2lucHV0LXRpbWUtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19jYXB0aW9uXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0XCI+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lSW5wdXQoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbGVuZGFyQ29udGFpbmVyKHtcbiAgc2hvd1RpbWVTZWxlY3RPbmx5ID0gZmFsc2UsXG4gIHNob3dUaW1lID0gZmFsc2UsXG4gIGNsYXNzTmFtZSxcbiAgY2hpbGRyZW4sXG59KSB7XG4gIGxldCBhcmlhTGFiZWwgPSBzaG93VGltZVNlbGVjdE9ubHlcbiAgICA/IFwiQ2hvb3NlIFRpbWVcIlxuICAgIDogYENob29zZSBEYXRlJHtzaG93VGltZSA/IFwiIGFuZCBUaW1lXCIgOiBcIlwifWA7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuQ2FsZW5kYXJDb250YWluZXIucHJvcFR5cGVzID0ge1xuICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICBzaG93VGltZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcbiIsImltcG9ydCBZZWFyRHJvcGRvd24gZnJvbSBcIi4veWVhcl9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoRHJvcGRvd24gZnJvbSBcIi4vbW9udGhfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aFllYXJEcm9wZG93biBmcm9tIFwiLi9tb250aF95ZWFyX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGggZnJvbSBcIi4vbW9udGhcIjtcbmltcG9ydCBUaW1lIGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCBZZWFyIGZyb20gXCIuL3llYXJcIjtcbmltcG9ydCBJbnB1dFRpbWUgZnJvbSBcIi4vaW5wdXRUaW1lXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IENhbGVuZGFyQ29udGFpbmVyIGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgc2V0TW9udGgsXG4gIGdldE1vbnRoLFxuICBhZGRNb250aHMsXG4gIHN1Yk1vbnRocyxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldFN0YXJ0T2ZUb2RheSxcbiAgYWRkRGF5cyxcbiAgZm9ybWF0RGF0ZSxcbiAgc2V0WWVhcixcbiAgZ2V0WWVhcixcbiAgaXNCZWZvcmUsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNBZnRlcixcbiAgZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlLFxuICBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSxcbiAgZ2V0V2Vla2RheU1pbkluTG9jYWxlLFxuICBpc1NhbWVEYXksXG4gIGlzU2FtZU1vbnRoLFxuICBtb250aERpc2FibGVkQmVmb3JlLFxuICBtb250aERpc2FibGVkQWZ0ZXIsXG4gIHllYXJEaXNhYmxlZEJlZm9yZSxcbiAgeWVhckRpc2FibGVkQWZ0ZXIsXG4gIHllYXJzRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEJlZm9yZSxcbiAgZ2V0RWZmZWN0aXZlTWluRGF0ZSxcbiAgZ2V0RWZmZWN0aXZlTWF4RGF0ZSxcbiAgYWRkWmVybyxcbiAgaXNWYWxpZCxcbiAgZ2V0WWVhcnNQZXJpb2QsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgZ2V0TW9udGhJbkxvY2FsZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTID0gW1xuICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1zZWxlY3RcIixcbl07XG5cbmNvbnN0IGlzRHJvcGRvd25TZWxlY3QgPSAoZWxlbWVudCA9IHt9KSA9PiB7XG4gIGNvbnN0IGNsYXNzTmFtZXMgPSAoZWxlbWVudC5jbGFzc05hbWUgfHwgXCJcIikuc3BsaXQoL1xccysvKTtcbiAgcmV0dXJuIERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMuc29tZShcbiAgICAodGVzdENsYXNzbmFtZSkgPT4gY2xhc3NOYW1lcy5pbmRleE9mKHRlc3RDbGFzc25hbWUpID49IDAsXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvbkRyb3Bkb3duRm9jdXM6ICgpID0+IHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgY3VzdG9tVGltZUlucHV0OiBudWxsLFxuICAgICAgeWVhckl0ZW1OdW1iZXI6IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSlcbiAgICAgIC5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSksXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbW9udGhTZWxlY3RlZEluOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25Ecm9wZG93bkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dUaW1lU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblRpbWVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aE1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dQb3BwZXJBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbkRheUtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuY29udGFpbmVyUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGF0ZTogdGhpcy5nZXREYXRlSW5WaWV3KCksXG4gICAgICBzZWxlY3RpbmdEYXRlOiBudWxsLFxuICAgICAgbW9udGhDb250YWluZXI6IG51bGwsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIG1vbnRoQ29udGFpbmVyIGhlaWdodCBpcyBuZWVkZWQgaW4gdGltZSBjb21wb25lbnRcbiAgICAvLyB0byBkZXRlcm1pbmUgdGhlIGhlaWdodCBmb3IgdGhlIHVsIGluIHRoZSB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHNldFN0YXRlIGhlcmUgc28gaGVpZ2h0IGlzIGdpdmVuIGFmdGVyIGZpbmFsIGNvbXBvbmVudFxuICAgIC8vIGxheW91dCBpcyByZW5kZXJlZFxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLmFzc2lnbk1vbnRoQ29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoQ29udGFpbmVyOiB0aGlzLm1vbnRoQ29udGFpbmVyIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24gJiZcbiAgICAgICghaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCBwcmV2UHJvcHMucHJlU2VsZWN0aW9uKSB8fFxuICAgICAgICB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiAhPT0gcHJldlByb3BzLm1vbnRoU2VsZWN0ZWRJbilcbiAgICApIHtcbiAgICAgIGNvbnN0IGhhc01vbnRoQ2hhbmdlZCA9ICFpc1NhbWVNb250aChcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZTogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IGhhc01vbnRoQ2hhbmdlZCAmJiB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkodGhpcy5wcm9wcy5vcGVuVG9EYXRlLCBwcmV2UHJvcHMub3BlblRvRGF0ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRlOiB0aGlzLnByb3BzLm9wZW5Ub0RhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgfTtcblxuICBzZXRDbGlja091dHNpZGVSZWYgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGlmIChpc0Ryb3Bkb3duU2VsZWN0KGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGdldERhdGVJblZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcmVTZWxlY3Rpb24sIHNlbGVjdGVkLCBvcGVuVG9EYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1pbkRhdGUgPSBnZXRFZmZlY3RpdmVNaW5EYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IG1heERhdGUgPSBnZXRFZmZlY3RpdmVNYXhEYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBuZXdEYXRlKCk7XG4gICAgY29uc3QgaW5pdGlhbERhdGUgPSBvcGVuVG9EYXRlIHx8IHNlbGVjdGVkIHx8IHByZVNlbGVjdGlvbjtcbiAgICBpZiAoaW5pdGlhbERhdGUpIHtcbiAgICAgIHJldHVybiBpbml0aWFsRGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1pbkRhdGUgJiYgaXNCZWZvcmUoY3VycmVudCwgbWluRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1pbkRhdGU7XG4gICAgICB9IGVsc2UgaWYgKG1heERhdGUgJiYgaXNBZnRlcihjdXJyZW50LCBtYXhEYXRlKSkge1xuICAgICAgICByZXR1cm4gbWF4RGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH07XG5cbiAgaW5jcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGRlY3JlYXNlTW9udGggPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViTW9udGhzKGRhdGUsIDEpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF5KTtcbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBkYXkgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgfTtcblxuICBoYW5kbGVNb250aE1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gICAgdGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlKCk7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlRW50ZXIgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogc2V0WWVhcihuZXdEYXRlKCksIHllYXIpIH0pO1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcihldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlTGVhdmUgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICAhIXRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmUoZXZlbnQsIHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uWWVhckNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKGRhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vbnRoWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKGRhdGUpO1xuICAgIHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UoZGF0ZSk7XG4gIH07XG5cbiAgY2hhbmdlWWVhciA9ICh5ZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihkYXRlLCB5ZWFyKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aCA9IChtb250aCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldE1vbnRoKGRhdGUsIG1vbnRoKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2hhbmdlTW9udGhZZWFyID0gKG1vbnRoWWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldFllYXIoc2V0TW9udGgoZGF0ZSwgZ2V0TW9udGgobW9udGhZZWFyKSksIGdldFllYXIobW9udGhZZWFyKSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoZWFkZXIgPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICBkYXRlLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IGRheU5hbWVzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzKSB7XG4gICAgICBkYXlOYW1lcy5wdXNoKFxuICAgICAgICA8ZGl2IGtleT1cIldcIiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLndlZWtMYWJlbCB8fCBcIiNcIn1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheU5hbWVzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICBjb25zdCB3ZWVrRGF5TmFtZSA9IHRoaXMuZm9ybWF0V2Vla2RheShkYXksIHRoaXMucHJvcHMubG9jYWxlKTtcblxuICAgICAgICBjb25zdCB3ZWVrRGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lXG4gICAgICAgICAgPyB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWUoZGF5KVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtvZmZzZXR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVcIixcbiAgICAgICAgICAgICAgd2Vla0RheUNsYXNzTmFtZSxcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3dlZWtEYXlOYW1lfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBmb3JtYXRXZWVrZGF5ID0gKGRheSwgbG9jYWxlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSkge1xuICAgICAgcmV0dXJuIGdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZShkYXksIHRoaXMucHJvcHMuZm9ybWF0V2Vla0RheSwgbG9jYWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydFxuICAgICAgPyBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZShkYXksIGxvY2FsZSlcbiAgICAgIDogZ2V0V2Vla2RheU1pbkluTG9jYWxlKGRheSwgbG9jYWxlKTtcbiAgfTtcblxuICBkZWNyZWFzZVllYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViWWVhcnMoXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyID8gdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlciA6IDEsXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2xlYXJTZWxlY3RpbmdEYXRlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBudWxsIH0pO1xuICB9O1xuXG4gIHJlbmRlclByZXZpb3VzQnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxQcmV2RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSB5ZWFyc0Rpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbkNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXNcIixcbiAgICBdO1xuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuZGVjcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxQcmV2RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1wcmV2aW91cy0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwsIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qge1xuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBwcmV2aW91c1llYXJBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwcmV2aW91c1llYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBwcmV2aW91c1llYXJBcmlhTGFiZWwgOiBwcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQnV0dG9uTGFiZWx9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgaW5jcmVhc2VZZWFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IGFkZFllYXJzKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlciA/IHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIgOiAxLFxuICAgICAgICApLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZVllYXJDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck5leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbE5leHREYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyOlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkID0geWVhcnNEaXNhYmxlZEFmdGVyKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoIXRoaXMucHJvcHMuZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgICF0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICBhbGxOZXh0RGF5c0Rpc2FibGVkKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHRcIixcbiAgICBdO1xuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10aW1lXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy50b2RheUJ1dHRvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0td2l0aC10b2RheS1idXR0b25cIik7XG4gICAgfVxuXG4gICAgbGV0IGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VNb250aDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGNsaWNrSGFuZGxlciA9IHRoaXMuaW5jcmVhc2VZZWFyO1xuICAgIH1cblxuICAgIGlmIChhbGxOZXh0RGF5c0Rpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0LS1kaXNhYmxlZFwiKTtcbiAgICAgIGNsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JZZWFyID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI7XG5cbiAgICBjb25zdCB7IG5leHRNb250aEJ1dHRvbkxhYmVsLCBuZXh0WWVhckJ1dHRvbkxhYmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIG5leHRNb250aEFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0TW9udGhCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJOZXh0IE1vbnRoXCIsXG4gICAgICBuZXh0WWVhckFyaWFMYWJlbCA9IHR5cGVvZiBuZXh0WWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gbmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBZZWFyXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfVxuICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzRm9yWWVhciA/IG5leHRZZWFyQXJpYUxhYmVsIDogbmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICB7aXNGb3JZZWFyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMubmV4dFllYXJCdXR0b25MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLm5leHRNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckN1cnJlbnRNb250aCA9IChkYXRlID0gdGhpcy5zdGF0ZS5kYXRlKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGhcIl07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNZZWFyRHJvcGRvd25cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dNb250aERyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aERyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyRHJvcGRvd24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX2N1cnJlbnQtbW9udGgtLWhhc01vbnRoWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9PlxuICAgICAgICB7Zm9ybWF0RGF0ZShkYXRlLCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8WWVhckRyb3Bkb3duXG4gICAgICAgIGFkanVzdERhdGVPbkNoYW5nZT17dGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2V9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9XG4gICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgZHJvcGRvd25Nb2RlPXt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIHllYXI9e2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyPXt0aGlzLnByb3BzLnllYXJEcm9wZG93bkl0ZW1OdW1iZXJ9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aERyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRofVxuICAgICAgICBtb250aD17Z2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKX1cbiAgICAgICAgdXNlU2hvcnRNb250aEluRHJvcGRvd249e3RoaXMucHJvcHMudXNlU2hvcnRNb250aEluRHJvcGRvd259XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyTW9udGhZZWFyRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPE1vbnRoWWVhckRyb3Bkb3duXG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlTW9udGhZZWFyfVxuICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVRvZGF5QnV0dG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZ2V0U3RhcnRPZlRvZGF5KCksIGUpO1xuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGdldFN0YXJ0T2ZUb2RheSgpKTtcbiAgfTtcblxuICByZW5kZXJUb2RheUJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMudG9kYXlCdXR0b24gfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdG9kYXktYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlVG9kYXlCdXR0b25DbGljayhlKX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRlZmF1bHRIZWFkZXIgPSAoeyBtb250aERhdGUsIGkgfSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciAke1xuICAgICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0XG4gICAgICAgICAgPyBcInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0taGFzLXRpbWUtc2VsZWN0XCJcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1gfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlckN1cnJlbnRNb250aChtb250aERhdGUpfVxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlcl9fZHJvcGRvd24tLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aERyb3Bkb3duKGkgIT09IDApfVxuICAgICAgICB7dGhpcy5yZW5kZXJNb250aFllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyWWVhckRyb3Bkb3duKGkgIT09IDApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckN1c3RvbUhlYWRlciA9IChoZWFkZXJBcmdzID0ge30pID0+IHtcbiAgICBjb25zdCB7IG1vbnRoRGF0ZSwgaSB9ID0gaGVhZGVyQXJncztcblxuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0ICYmICF0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyKSB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHlcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRNb250aEJ1dHRvbkRpc2FibGVkID0gbW9udGhEaXNhYmxlZEFmdGVyKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcyxcbiAgICApO1xuXG4gICAgY29uc3QgcHJldlllYXJCdXR0b25EaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZShcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IG5leHRZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHNob3dEYXlOYW1lcyA9XG4gICAgICAhdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgJiZcbiAgICAgICF0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlci0tY3VzdG9tXCJcbiAgICAgICAgb25Gb2N1cz17dGhpcy5wcm9wcy5vbkRyb3Bkb3duRm9jdXN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcih7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICBjdXN0b21IZWFkZXJDb3VudDogaSxcbiAgICAgICAgICBtb250aERhdGUsXG4gICAgICAgICAgY2hhbmdlTW9udGg6IHRoaXMuY2hhbmdlTW9udGgsXG4gICAgICAgICAgY2hhbmdlWWVhcjogdGhpcy5jaGFuZ2VZZWFyLFxuICAgICAgICAgIGRlY3JlYXNlTW9udGg6IHRoaXMuZGVjcmVhc2VNb250aCxcbiAgICAgICAgICBpbmNyZWFzZU1vbnRoOiB0aGlzLmluY3JlYXNlTW9udGgsXG4gICAgICAgICAgZGVjcmVhc2VZZWFyOiB0aGlzLmRlY3JlYXNlWWVhcixcbiAgICAgICAgICBpbmNyZWFzZVllYXI6IHRoaXMuaW5jcmVhc2VZZWFyLFxuICAgICAgICAgIHByZXZNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRNb250aEJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIHByZXZZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgICAgbmV4dFllYXJCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgfSl9XG4gICAgICAgIHtzaG93RGF5TmFtZXMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LW5hbWVzXCI+XG4gICAgICAgICAgICB7dGhpcy5oZWFkZXIobW9udGhEYXRlKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyWWVhckhlYWRlciA9ICh7IG1vbnRoRGF0ZSB9KSA9PiB7XG4gICAgY29uc3QgeyBzaG93WWVhclBpY2tlciwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIG1vbnRoRGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyIHJlYWN0LWRhdGVwaWNrZXIteWVhci1oZWFkZXJcIj5cbiAgICAgICAge3Nob3dZZWFyUGlja2VyID8gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YCA6IGdldFllYXIobW9udGhEYXRlKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyID0gKGhlYWRlckFyZ3MpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIgIT09IHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ3VzdG9tSGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyWWVhckhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRlZmF1bHRIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlck1vbnRocyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgfHwgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoTGlzdCA9IFtdO1xuICAgIGNvbnN0IG1vbnRoc1RvU3VidHJhY3QgPSB0aGlzLnByb3BzLnNob3dQcmV2aW91c01vbnRoc1xuICAgICAgPyB0aGlzLnByb3BzLm1vbnRoc1Nob3duIC0gMVxuICAgICAgOiAwO1xuICAgIGNvbnN0IGZyb21Nb250aERhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgID8gYWRkWWVhcnModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KVxuICAgICAgICA6IHN1Yk1vbnRocyh0aGlzLnN0YXRlLmRhdGUsIG1vbnRoc1RvU3VidHJhY3QpO1xuICAgIGNvbnN0IG1vbnRoU2VsZWN0ZWRJbiA9IHRoaXMucHJvcHMubW9udGhTZWxlY3RlZEluID8/IG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLm1vbnRoc1Nob3duOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vbnRoc1RvQWRkID0gaSAtIG1vbnRoU2VsZWN0ZWRJbiArIG1vbnRoc1RvU3VidHJhY3Q7XG4gICAgICBjb25zdCBtb250aERhdGUgPVxuICAgICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHwgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICAgICAgICA/IGFkZFllYXJzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKVxuICAgICAgICAgIDogYWRkTW9udGhzKGZyb21Nb250aERhdGUsIG1vbnRoc1RvQWRkKTtcbiAgICAgIGNvbnN0IG1vbnRoS2V5ID0gYG1vbnRoLSR7aX1gO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQgPSBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDE7XG4gICAgICBjb25zdCBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0ID0gaSA+IDA7XG4gICAgICBtb250aExpc3QucHVzaChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17bW9udGhLZXl9XG4gICAgICAgICAgcmVmPXsoZGl2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoQ29udGFpbmVyID0gZGl2O1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtY29udGFpbmVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcih7IG1vbnRoRGF0ZSwgaSB9KX1cbiAgICAgICAgICA8TW9udGhcbiAgICAgICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5tb250aEFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgICAgIGRheT17bW9udGhEYXRlfVxuICAgICAgICAgICAgZGF5Q2xhc3NOYW1lPXt0aGlzLnByb3BzLmRheUNsYXNzTmFtZX1cbiAgICAgICAgICAgIGNhbGVuZGFyU3RhcnREYXk9e3RoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheX1cbiAgICAgICAgICAgIG1vbnRoQ2xhc3NOYW1lPXt0aGlzLnByb3BzLm1vbnRoQ2xhc3NOYW1lfVxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbkRheUtleURvd259XG4gICAgICAgICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bj17dGhpcy5wcm9wcy5oYW5kbGVPbktleURvd259XG4gICAgICAgICAgICB1c2VQb2ludGVyRXZlbnQ9e3RoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50fVxuICAgICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICAgIG9yZGVySW5EaXNwbGF5PXtpfVxuICAgICAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgICAgaG9saWRheXM9e3RoaXMucHJvcHMuaG9saWRheXN9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMucHJvcHMuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgICAgIGZpbHRlckRhdGU9e3RoaXMucHJvcHMuZmlsdGVyRGF0ZX1cbiAgICAgICAgICAgIHByZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5wcmVTZWxlY3Rpb259XG4gICAgICAgICAgICBzZXRQcmVTZWxlY3Rpb249e3RoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgICAgc2VsZWN0c1JhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNSYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlPXt0aGlzLnByb3BzLnNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlfVxuICAgICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVycz17dGhpcy5wcm9wcy5zaG93V2Vla051bWJlcnN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3RoaXMucHJvcHMuc3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgICAgcGVla05leHRNb250aD17dGhpcy5wcm9wcy5wZWVrTmV4dE1vbnRofVxuICAgICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgICAgc2hvdWxkQ2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0fVxuICAgICAgICAgICAgcmVuZGVyRGF5Q29udGVudHM9e3RoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHN9XG4gICAgICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyUXVhcnRlckNvbnRlbnR9XG4gICAgICAgICAgICByZW5kZXJZZWFyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudH1cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd0Z1bGxNb250aFllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgICAgaXNJbnB1dEZvY3VzZWQ9e3RoaXMucHJvcHMuaXNJbnB1dEZvY3VzZWR9XG4gICAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17bW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbW9udGhMaXN0O1xuICB9O1xuXG4gIHJlbmRlclllYXJzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLS1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGU6IHRoaXMuc3RhdGUuZGF0ZSB9KX1cbiAgICAgICAgICA8WWVhclxuICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMuc3RhdGUuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW5nRGF0ZT17dGhpcy5jbGVhclNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIG9uWWVhck1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvblllYXJNb3VzZUxlYXZlPXt0aGlzLmhhbmRsZVllYXJNb3VzZUxlYXZlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyVGltZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgKHRoaXMuc3RhdGUubW9udGhDb250YWluZXIgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGltZVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgIG9wZW5Ub0RhdGU9e3RoaXMucHJvcHMub3BlblRvRGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRpbWVDaGFuZ2V9XG4gICAgICAgICAgdGltZUNsYXNzTmFtZT17dGhpcy5wcm9wcy50aW1lQ2xhc3NOYW1lfVxuICAgICAgICAgIGZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICAgIGluY2x1ZGVUaW1lcz17dGhpcy5wcm9wcy5pbmNsdWRlVGltZXN9XG4gICAgICAgICAgaW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgICAgbWluVGltZT17dGhpcy5wcm9wcy5taW5UaW1lfVxuICAgICAgICAgIG1heFRpbWU9e3RoaXMucHJvcHMubWF4VGltZX1cbiAgICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICAgIGZpbHRlclRpbWU9e3RoaXMucHJvcHMuZmlsdGVyVGltZX1cbiAgICAgICAgICB0aW1lQ2FwdGlvbj17dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgICBzaG93TW9udGhEcm9wZG93bj17dGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bn1cbiAgICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICAgIHNob3dZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bn1cbiAgICAgICAgICB3aXRoUG9ydGFsPXt0aGlzLnByb3BzLndpdGhQb3J0YWx9XG4gICAgICAgICAgbW9udGhSZWY9e3RoaXMuc3RhdGUubW9udGhDb250YWluZXJ9XG4gICAgICAgICAgaW5qZWN0VGltZXM9e3RoaXMucHJvcHMuaW5qZWN0VGltZXN9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJJbnB1dFRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICBjb25zdCB0aW1lVmFsaWQgPSBpc1ZhbGlkKHRpbWUpICYmIEJvb2xlYW4odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVN0cmluZyA9IHRpbWVWYWxpZFxuICAgICAgPyBgJHthZGRaZXJvKHRpbWUuZ2V0SG91cnMoKSl9OiR7YWRkWmVybyh0aW1lLmdldE1pbnV0ZXMoKSl9YFxuICAgICAgOiBcIlwiO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnB1dFRpbWVcbiAgICAgICAgICBkYXRlPXt0aW1lfVxuICAgICAgICAgIHRpbWVTdHJpbmc9e3RpbWVTdHJpbmd9XG4gICAgICAgICAgdGltZUlucHV0TGFiZWw9e3RoaXMucHJvcHMudGltZUlucHV0TGFiZWx9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKFxuICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgdGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIGxldCBhcmlhTGl2ZU1lc3NhZ2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7c3RhcnRQZXJpb2R9IC0gJHtlbmRQZXJpb2R9YDtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gZ2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgJHtnZXRNb250aEluTG9jYWxlKFxuICAgICAgICBnZXRNb250aCh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICl9ICR7Z2V0WWVhcih0aGlzLnN0YXRlLmRhdGUpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2FyaWEtbGl2ZVwiXG4gICAgICA+XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIGFyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNoaWxkcmVuID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2NoaWxkcmVuLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBDb250YWluZXIgPSB0aGlzLnByb3BzLmNvbnRhaW5lciB8fCBDYWxlbmRhckNvbnRhaW5lcjtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImNvbnRlbnRzXCIgfX0gcmVmPXt0aGlzLmNvbnRhaW5lclJlZn0+XG4gICAgICAgIDxDb250YWluZXJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXCJyZWFjdC1kYXRlcGlja2VyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXItLXRpbWUtb25seVwiOiB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSxcbiAgICAgICAgICB9KX1cbiAgICAgICAgICBzaG93VGltZT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXR9XG4gICAgICAgICAgc2hvd1RpbWVTZWxlY3RPbmx5PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckFyaWFMaXZlUmVnaW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyUHJldmlvdXNCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJOZXh0QnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTW9udGhzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyWWVhcnMoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUb2RheUJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVTZWN0aW9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXRUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5jb25zdCBDYWxlbmRhckljb24gPSAoeyBpY29uLCBjbGFzc05hbWUgPSBcIlwiLCBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgZGVmYXVsdENsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyX19jYWxlbmRhci1pY29uXCI7XG5cbiAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGljb24pKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChpY29uLCB7XG4gICAgICBjbGFzc05hbWU6IGAke2ljb24ucHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJ9ICR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gLFxuICAgICAgb25DbGljazogKGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpY29uLnByb3BzLm9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGljb24ucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb25DbGljayhlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaWNvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8aVxuICAgICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtpY29ufSAke2NsYXNzTmFtZX1gfVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBTVkcgSWNvblxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIGNsYXNzTmFtZT17YCR7ZGVmYXVsdENsYXNzfSAke2NsYXNzTmFtZX1gfVxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIlxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICA+XG4gICAgICA8cGF0aCBkPVwiTTk2IDMyVjY0SDQ4QzIxLjUgNjQgMCA4NS41IDAgMTEydjQ4SDQ0OFYxMTJjMC0yNi41LTIxLjUtNDgtNDgtNDhIMzUyVjMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjY0SDE2MFYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMlM5NiAxNC4zIDk2IDMyek00NDggMTkySDBWNDY0YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4SDQwMGMyNi41IDAgNDgtMjEuNSA0OC00OFYxOTJ6XCIgLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbkNhbGVuZGFySWNvbi5wcm9wVHlwZXMgPSB7XG4gIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWxlbmRhckljb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb3J0YWxSb290ID0gKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudCkuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0aGlzLnByb3BzLnBvcnRhbElkLFxuICAgICk7XG4gICAgaWYgKCF0aGlzLnBvcnRhbFJvb3QpIHtcbiAgICAgIHRoaXMucG9ydGFsUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aGlzLnBvcnRhbFJvb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpcy5wcm9wcy5wb3J0YWxJZCk7XG4gICAgICAodGhpcy5wcm9wcy5wb3J0YWxIb3N0IHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHRoaXMucG9ydGFsUm9vdCk7XG4gICAgfVxuICAgIHRoaXMucG9ydGFsUm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdC5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3RET00uY3JlYXRlUG9ydGFsKHRoaXMucHJvcHMuY2hpbGRyZW4sIHRoaXMuZWwpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbi8vIFRhYkxvb3AgcHJldmVudHMgdGhlIHVzZXIgZnJvbSB0YWJiaW5nIG91dHNpZGUgb2YgdGhlIHBvcHBlclxuLy8gSXQgY3JlYXRlcyBhIHRhYmluZGV4IGxvb3Agc28gdGhhdCBcIlRhYlwiIG9uIHRoZSBsYXN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudFxuLy8gYW5kIFwiU2hpZnQgVGFiXCIgb24gdGhlIGZpcnN0IGVsZW1lbnQgd2lsbCBmb2N1cyB0aGUgbGFzdCBlbGVtZW50XG5cbmNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPVxuICBcIlt0YWJpbmRleF0sIGEsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIjtcbmNvbnN0IGZvY3VzYWJsZUZpbHRlciA9IChub2RlKSA9PiAhbm9kZS5kaXNhYmxlZCAmJiBub2RlLnRhYkluZGV4ICE9PSAtMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiTG9vcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlbmFibGVUYWJMb29wOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIGVuYWJsZVRhYkxvb3A6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy50YWJMb29wUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gIH1cblxuICAvLyBxdWVyeSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzXG4gIC8vIHRyaW0gZmlyc3QgYW5kIGxhc3QgYmVjYXVzZSB0aGV5IGFyZSB0aGUgZm9jdXMgZ3VhcmRzXG4gIGdldFRhYkNoaWxkcmVuID0gKCkgPT5cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKFxuICAgICAgICB0aGlzLnRhYkxvb3BSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IpLFxuICAgICAgICAxLFxuICAgICAgICAtMSxcbiAgICAgIClcbiAgICAgIC5maWx0ZXIoZm9jdXNhYmxlRmlsdGVyKTtcblxuICBoYW5kbGVGb2N1c1N0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmXG4gICAgICB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmXG4gICAgICB0YWJDaGlsZHJlblt0YWJDaGlsZHJlbi5sZW5ndGggLSAxXS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUZvY3VzRW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkNoaWxkcmVuID0gdGhpcy5nZXRUYWJDaGlsZHJlbigpO1xuICAgIHRhYkNoaWxkcmVuICYmIHRhYkNoaWxkcmVuLmxlbmd0aCA+IDEgJiYgdGFiQ2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcFwiIHJlZj17dGhpcy50YWJMb29wUmVmfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19zdGFydFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzU3RhcnR9XG4gICAgICAgIC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BfX2VuZFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzRW5kfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgdXNlRmxvYXRpbmcsXG4gIGFycm93LFxuICBvZmZzZXQsXG4gIGZsaXAsXG4gIGF1dG9VcGRhdGUsXG59IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyA9IFtcbiAgXCJ0b3Atc3RhcnRcIixcbiAgXCJ0b3AtZW5kXCIsXG4gIFwiYm90dG9tLXN0YXJ0XCIsXG4gIFwiYm90dG9tLWVuZFwiLFxuICBcInJpZ2h0LXN0YXJ0XCIsXG4gIFwicmlnaHQtZW5kXCIsXG4gIFwibGVmdC1zdGFydFwiLFxuICBcImxlZnQtZW5kXCIsXG4gIFwidG9wXCIsXG4gIFwicmlnaHRcIixcbiAgXCJib3R0b21cIixcbiAgXCJsZWZ0XCIsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoRmxvYXRpbmcoQ29tcG9uZW50KSB7XG4gIGNvbnN0IFdpdGhGbG9hdGluZyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IGFsdF9wcm9wcyA9IHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgcG9wcGVyTW9kaWZpZXJzOiBwcm9wcy5wb3BwZXJNb2RpZmllcnMgfHwgW10sXG4gICAgICBwb3BwZXJQcm9wczogcHJvcHMucG9wcGVyUHJvcHMgfHwge30sXG4gICAgICBoaWRlUG9wcGVyOlxuICAgICAgICB0eXBlb2YgcHJvcHMuaGlkZVBvcHBlciA9PT0gXCJib29sZWFuXCIgPyBwcm9wcy5oaWRlUG9wcGVyIDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGFycm93UmVmID0gUmVhY3QudXNlUmVmKCk7XG4gICAgY29uc3QgZmxvYXRpbmdQcm9wcyA9IHVzZUZsb2F0aW5nKHtcbiAgICAgIG9wZW46ICFhbHRfcHJvcHMuaGlkZVBvcHBlcixcbiAgICAgIHdoaWxlRWxlbWVudHNNb3VudGVkOiBhdXRvVXBkYXRlLFxuICAgICAgcGxhY2VtZW50OiBhbHRfcHJvcHMucG9wcGVyUGxhY2VtZW50LFxuICAgICAgbWlkZGxld2FyZTogW1xuICAgICAgICBmbGlwKHsgcGFkZGluZzogMTUgfSksXG4gICAgICAgIG9mZnNldCgxMCksXG4gICAgICAgIGFycm93KHsgZWxlbWVudDogYXJyb3dSZWYgfSksXG4gICAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJNb2RpZmllcnMsXG4gICAgICBdLFxuICAgICAgLi4uYWx0X3Byb3BzLnBvcHBlclByb3BzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnQgey4uLmFsdF9wcm9wc30gcG9wcGVyUHJvcHM9e3sgLi4uZmxvYXRpbmdQcm9wcywgYXJyb3dSZWYgfX0gLz5cbiAgICApO1xuICB9O1xuXG4gIFdpdGhGbG9hdGluZy5wcm9wVHlwZXMgPSB7XG4gICAgcG9wcGVyUGxhY2VtZW50OiBQcm9wVHlwZXMub25lT2YocG9wcGVyUGxhY2VtZW50UG9zaXRpb25zKSxcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGhpZGVQb3BwZXI6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHJldHVybiBXaXRoRmxvYXRpbmc7XG59XG4iLCJpbXBvcnQgY2xhc3NuYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgRmxvYXRpbmdBcnJvdyB9IGZyb20gXCJAZmxvYXRpbmctdWkvcmVhY3RcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgUG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuaW1wb3J0IHdpdGhGbG9hdGluZyBmcm9tIFwiLi93aXRoX2Zsb2F0aW5nXCI7XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG5leHBvcnQgY2xhc3MgUG9wcGVyQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZGVQb3BwZXI6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdyYXBwZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGlkZVBvcHBlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9wcGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBwb3BwZXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBvcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRhcmdldENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9wcGVyT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93QXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICB3cmFwcGVyQ2xhc3NOYW1lLFxuICAgICAgaGlkZVBvcHBlcixcbiAgICAgIHBvcHBlckNvbXBvbmVudCxcbiAgICAgIHRhcmdldENvbXBvbmVudCxcbiAgICAgIGVuYWJsZVRhYkxvb3AsXG4gICAgICBwb3BwZXJPbktleURvd24sXG4gICAgICBwb3J0YWxJZCxcbiAgICAgIHBvcnRhbEhvc3QsXG4gICAgICBwb3BwZXJQcm9wcyxcbiAgICAgIHNob3dBcnJvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGxldCBwb3BwZXI7XG5cbiAgICBpZiAoIWhpZGVQb3BwZXIpIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc25hbWVzKFwicmVhY3QtZGF0ZXBpY2tlci1wb3BwZXJcIiwgY2xhc3NOYW1lKTtcbiAgICAgIHBvcHBlciA9IChcbiAgICAgICAgPFRhYkxvb3AgZW5hYmxlVGFiTG9vcD17ZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXtwb3BwZXJQcm9wcy5yZWZzLnNldEZsb2F0aW5nfVxuICAgICAgICAgICAgc3R5bGU9e3BvcHBlclByb3BzLmZsb2F0aW5nU3R5bGVzfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgZGF0YS1wbGFjZW1lbnQ9e3BvcHBlclByb3BzLnBsYWNlbWVudH1cbiAgICAgICAgICAgIG9uS2V5RG93bj17cG9wcGVyT25LZXlEb3dufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3BwZXJDb21wb25lbnR9XG4gICAgICAgICAgICB7c2hvd0Fycm93ICYmIChcbiAgICAgICAgICAgICAgPEZsb2F0aW5nQXJyb3dcbiAgICAgICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLmFycm93UmVmfVxuICAgICAgICAgICAgICAgIGNvbnRleHQ9e3BvcHBlclByb3BzLmNvbnRleHR9XG4gICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs4fVxuICAgICAgICAgICAgICAgIHdpZHRoPXsxNn1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlWSgtMXB4KVwiIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdHJpYW5nbGVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UYWJMb29wPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXIpIHtcbiAgICAgIHBvcHBlciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXIsIHt9LCBwb3BwZXIpO1xuICAgIH1cblxuICAgIGlmIChwb3J0YWxJZCAmJiAhaGlkZVBvcHBlcikge1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8UG9ydGFsIHBvcnRhbElkPXtwb3J0YWxJZH0gcG9ydGFsSG9zdD17cG9ydGFsSG9zdH0+XG4gICAgICAgICAge3BvcHBlcn1cbiAgICAgICAgPC9Qb3J0YWw+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc2VzID0gY2xhc3NuYW1lcyhcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlci13cmFwcGVyXCIsXG4gICAgICB3cmFwcGVyQ2xhc3NOYW1lLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8ZGl2IHJlZj17cG9wcGVyUHJvcHMucmVmcy5zZXRSZWZlcmVuY2V9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzZXN9PlxuICAgICAgICAgIHt0YXJnZXRDb21wb25lbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cG9wcGVyfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhGbG9hdGluZyhQb3BwZXJDb21wb25lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gXCIuL2NhbGVuZGFyXCI7XG5pbXBvcnQgQ2FsZW5kYXJJY29uIGZyb20gXCIuL2NhbGVuZGFyX2ljb25cIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgUG9wcGVyQ29tcG9uZW50IGZyb20gXCIuL3BvcHBlcl9jb21wb25lbnRcIjtcbmltcG9ydCB7IHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyB9IGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBzZXQgfSBmcm9tIFwiZGF0ZS1mbnMvc2V0XCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZEYXlcIjtcbmltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mRGF5XCI7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSBcImRhdGUtZm5zL2lzVmFsaWRcIjtcbmltcG9ydCB7XG4gIG5ld0RhdGUsXG4gIGlzRGF0ZSxcbiAgaXNCZWZvcmUsXG4gIGlzQWZ0ZXIsXG4gIGlzRXF1YWwsXG4gIHNldFRpbWUsXG4gIGdldFNlY29uZHMsXG4gIGdldE1pbnV0ZXMsXG4gIGdldEhvdXJzLFxuICBhZGREYXlzLFxuICBhZGRNb250aHMsXG4gIGFkZFdlZWtzLFxuICBzdWJEYXlzLFxuICBzdWJNb250aHMsXG4gIHN1YldlZWtzLFxuICBhZGRZZWFycyxcbiAgc3ViWWVhcnMsXG4gIGlzRGF5RGlzYWJsZWQsXG4gIGlzRGF5SW5SYW5nZSxcbiAgZ2V0RWZmZWN0aXZlTWluRGF0ZSxcbiAgZ2V0RWZmZWN0aXZlTWF4RGF0ZSxcbiAgcGFyc2VEYXRlLFxuICBzYWZlRGF0ZUZvcm1hdCxcbiAgc2FmZURhdGVSYW5nZUZvcm1hdCxcbiAgZ2V0SGlnaHRMaWdodERheXNNYXAsXG4gIGdldFllYXIsXG4gIGdldE1vbnRoLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZ2V0RW5kT2ZXZWVrLFxuICByZWdpc3RlckxvY2FsZSxcbiAgc2V0RGVmYXVsdExvY2FsZSxcbiAgZ2V0RGVmYXVsdExvY2FsZSxcbiAgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICBpc1NhbWVEYXksXG4gIGlzTW9udGhEaXNhYmxlZCxcbiAgaXNZZWFyRGlzYWJsZWQsXG4gIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0LFxuICBnZXRIb2xpZGF5c01hcCxcbiAgaXNEYXRlQmVmb3JlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgVGFiTG9vcCBmcm9tIFwiLi90YWJfbG9vcFwiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIENhbGVuZGFyQ29udGFpbmVyIH0gZnJvbSBcIi4vY2FsZW5kYXJfY29udGFpbmVyXCI7XG5cbmV4cG9ydCB7IHJlZ2lzdGVyTG9jYWxlLCBzZXREZWZhdWx0TG9jYWxlLCBnZXREZWZhdWx0TG9jYWxlIH07XG5cbmNvbnN0IG91dHNpZGVDbGlja0lnbm9yZUNsYXNzID0gXCJyZWFjdC1kYXRlcGlja2VyLWlnbm9yZS1vbmNsaWNrb3V0c2lkZVwiO1xuY29uc3QgV3JhcHBlZENhbGVuZGFyID0gb25DbGlja091dHNpZGUoQ2FsZW5kYXIpO1xuXG4vLyBDb21wYXJlcyBkYXRlcyB5ZWFyK21vbnRoIGNvbWJpbmF0aW9uc1xuZnVuY3Rpb24gaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGdldE1vbnRoKGRhdGUxKSAhPT0gZ2V0TW9udGgoZGF0ZTIpIHx8IGdldFllYXIoZGF0ZTEpICE9PSBnZXRZZWFyKGRhdGUyKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZGF0ZTEgIT09IGRhdGUyO1xufVxuXG4vKipcbiAqIEdlbmVyYWwgZGF0ZXBpY2tlciBjb21wb25lbnQuXG4gKi9cbmNvbnN0IElOUFVUX0VSUl8xID0gXCJEYXRlIGlucHV0IG5vdCB2YWxpZC5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhbGxvd1NhbWVEYXk6IGZhbHNlLFxuICAgICAgZGF0ZUZvcm1hdDogXCJNTS9kZC95eXl5XCIsXG4gICAgICBkYXRlRm9ybWF0Q2FsZW5kYXI6IFwiTExMTCB5eXl5XCIsXG4gICAgICBvbkNoYW5nZSgpIHt9LFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgZHJvcGRvd25Nb2RlOiBcInNjcm9sbFwiLFxuICAgICAgb25Gb2N1cygpIHt9LFxuICAgICAgb25CbHVyKCkge30sXG4gICAgICBvbktleURvd24oKSB7fSxcbiAgICAgIG9uSW5wdXRDbGljaygpIHt9LFxuICAgICAgb25TZWxlY3QoKSB7fSxcbiAgICAgIG9uQ2xpY2tPdXRzaWRlKCkge30sXG4gICAgICBvbk1vbnRoQ2hhbmdlKCkge30sXG4gICAgICBvbkNhbGVuZGFyT3BlbigpIHt9LFxuICAgICAgb25DYWxlbmRhckNsb3NlKCkge30sXG4gICAgICBwcmV2ZW50T3Blbk9uRm9jdXM6IGZhbHNlLFxuICAgICAgb25ZZWFyQ2hhbmdlKCkge30sXG4gICAgICBvbklucHV0RXJyb3IoKSB7fSxcbiAgICAgIG1vbnRoc1Nob3duOiAxLFxuICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgd2l0aFBvcnRhbDogZmFsc2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogZmFsc2UsXG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgICAgc2hvd1RpbWVTZWxlY3Q6IGZhbHNlLFxuICAgICAgc2hvd1RpbWVJbnB1dDogZmFsc2UsXG4gICAgICBzaG93UHJldmlvdXNNb250aHM6IGZhbHNlLFxuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcjogZmFsc2UsXG4gICAgICBzaG93V2Vla1BpY2tlcjogZmFsc2UsXG4gICAgICBzdHJpY3RQYXJzaW5nOiBmYWxzZSxcbiAgICAgIHRpbWVJbnRlcnZhbHM6IDMwLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIG5leHRZZWFyQXJpYUxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHRpbWVJbnB1dExhYmVsOiBcIlRpbWVcIixcbiAgICAgIGVuYWJsZVRhYkxvb3A6IHRydWUsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBmYWxzZSxcbiAgICAgIHNob3dQb3BwZXJBcnJvdzogdHJ1ZSxcbiAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICBjYWxlbmRhclN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBmYWxzZSxcbiAgICAgIHVzZVBvaW50ZXJFdmVudDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhbGxvd1NhbWVEYXk6IFByb3BUeXBlcy5ib29sLFxuICAgIGFyaWFEZXNjcmliZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhSW52YWxpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxDbG9zZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxsZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhUmVxdWlyZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2FsZW5kYXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FsZW5kYXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xvc2VPblNjcm9sbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1c3RvbUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBjdXN0b21JbnB1dFJlZjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlc1xuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheV0pLFxuICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdlZWtEYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm06IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzQ2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgXSksXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY2FsZW5kYXJJY29uQ2xhc3NuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoc1Nob3duOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2VSYXc6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DYWxlbmRhck9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2FsZW5kYXJDbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcGxhY2Vob2xkZXJUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwcmV2ZW50T3Blbk9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RyaWN0UGFyc2luZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc3RhcnRPcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YWJJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB0aW1lQ2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgdXNlV2Vla2RheXNTaG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla0RheTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2Vla0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHdpdGhQb3J0YWw6IFByb3BUeXBlcy5ib29sLFxuICAgIHBvcnRhbElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcnRhbEhvc3Q6IFByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYWRvd1Jvb3QpLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2hvdWxkQ2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93WWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla1BpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0RhdGVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtaW5UaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhUaW1lOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlVGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBmaWx0ZXJUaW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xlYXJCdXR0b25UaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGVhckJ1dHRvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c01vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgXSksXG4gICAgbmV4dE1vbnRoQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBwcmV2aW91c1llYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFllYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW5wdXRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZW5kZXJDdXN0b21IZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJNb250aENvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJZZWFyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb2N1c1NlbGVjdGVkTW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aE1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dQb3BwZXJBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgZXhjbHVkZVNjcm9sbGJhcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZW5hYmxlVGFiTG9vcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICB3ZWVrQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpO1xuICAgIHRoaXMucHJldmVudEZvY3VzVGltZW91dCA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChcbiAgICAgIHByZXZQcm9wcy5pbmxpbmUgJiZcbiAgICAgIGhhc1ByZVNlbGVjdGlvbkNoYW5nZWQocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuc3RhdGUubW9udGhTZWxlY3RlZEluICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHByZXZQcm9wcy5tb250aHNTaG93biAhPT0gdGhpcy5wcm9wcy5tb250aHNTaG93blxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoU2VsZWN0ZWRJbjogMCB9KTtcbiAgICB9XG4gICAgaWYgKHByZXZQcm9wcy5oaWdobGlnaHREYXRlcyAhPT0gdGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAhcHJldlN0YXRlLmZvY3VzZWQgJiZcbiAgICAgICFpc0VxdWFsKHByZXZQcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcy5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgIH1cblxuICAgIGlmIChwcmV2U3RhdGUub3BlbiAhPT0gdGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICBpZiAocHJldlN0YXRlLm9wZW4gPT09IGZhbHNlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJPcGVuKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gdHJ1ZSAmJiB0aGlzLnN0YXRlLm9wZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhckNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5jbGVhclByZXZlbnRGb2N1c1RpbWVvdXQoKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgfVxuXG4gIGdldFByZVNlbGVjdGlvbiA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA/IHRoaXMucHJvcHMub3BlblRvRGF0ZVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNFbmQgJiYgdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c1N0YXJ0ICYmIHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgOiBuZXdEYXRlKCk7XG5cbiAgLy8gQ29udmVydCB0aGUgZGF0ZSBmcm9tIHN0cmluZyBmb3JtYXQgdG8gc3RhbmRhcmQgRGF0ZSBmb3JtYXRcbiAgbW9kaWZ5SG9saWRheXMgPSAoKSA9PlxuICAgIHRoaXMucHJvcHMuaG9saWRheXM/LnJlZHVjZSgoYWNjdW11bGF0b3IsIGhvbGlkYXkpID0+IHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShob2xpZGF5LmRhdGUpO1xuICAgICAgaWYgKCFpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFsuLi5hY2N1bXVsYXRvciwgeyAuLi5ob2xpZGF5LCBkYXRlIH1dO1xuICAgIH0sIFtdKTtcblxuICBjYWxjSW5pdGlhbFN0YXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRQcmVTZWxlY3Rpb24gPSB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGNvbnN0IG1pbkRhdGUgPSBnZXRFZmZlY3RpdmVNaW5EYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IG1heERhdGUgPSBnZXRFZmZlY3RpdmVNYXhEYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGJvdW5kZWRQcmVTZWxlY3Rpb24gPVxuICAgICAgbWluRGF0ZSAmJiBpc0JlZm9yZShkZWZhdWx0UHJlU2VsZWN0aW9uLCBzdGFydE9mRGF5KG1pbkRhdGUpKVxuICAgICAgICA/IG1pbkRhdGVcbiAgICAgICAgOiBtYXhEYXRlICYmIGlzQWZ0ZXIoZGVmYXVsdFByZVNlbGVjdGlvbiwgZW5kT2ZEYXkobWF4RGF0ZSkpXG4gICAgICAgICAgPyBtYXhEYXRlXG4gICAgICAgICAgOiBkZWZhdWx0UHJlU2VsZWN0aW9uO1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiB0aGlzLnByb3BzLnN0YXJ0T3BlbiB8fCBmYWxzZSxcbiAgICAgIHByZXZlbnRGb2N1czogZmFsc2UsXG4gICAgICBwcmVTZWxlY3Rpb246XG4gICAgICAgICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZVxuICAgICAgICAgID8gdGhpcy5wcm9wcy5zdGFydERhdGVcbiAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQpID8/IGJvdW5kZWRQcmVTZWxlY3Rpb24sXG4gICAgICAvLyB0cmFuc2Zvcm1pbmcgaGlnaGxpZ2h0ZWQgZGF5cyAocGVyaGFwcyBuZXN0ZWQgYXJyYXkpXG4gICAgICAvLyB0byBmbGF0IE1hcCBmb3IgZmFzdGVyIGFjY2VzcyBpbiBkYXkuanN4XG4gICAgICBoaWdobGlnaHREYXRlczogZ2V0SGlnaHRMaWdodERheXNNYXAodGhpcy5wcm9wcy5oaWdobGlnaHREYXRlcyksXG4gICAgICBmb2N1c2VkOiBmYWxzZSxcbiAgICAgIC8vIHVzZWQgdG8gZm9jdXMgZGF5IGluIGlubGluZSB2ZXJzaW9uIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkLCBidXQgbm90IG9uXG4gICAgICAvLyBpbml0aWFsIHJlbmRlclxuICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IGZhbHNlLFxuICAgICAgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH07XG4gIH07XG5cbiAgY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICBzZXRGb2N1cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmZvY3VzKSB7XG4gICAgICB0aGlzLmlucHV0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0Qmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmJsdXIpIHtcbiAgICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICAgIH1cblxuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIHNldE9wZW4gPSAob3Blbiwgc2tpcFNldEJsdXIgPSBmYWxzZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIG9wZW46IG9wZW4sXG4gICAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgICBvcGVuICYmIHRoaXMuc3RhdGUub3BlblxuICAgICAgICAgICAgPyB0aGlzLnN0YXRlLnByZVNlbGVjdGlvblxuICAgICAgICAgICAgOiB0aGlzLmNhbGNJbml0aWFsU3RhdGUoKS5wcmVTZWxlY3Rpb24sXG4gICAgICAgIGxhc3RQcmVTZWxlY3RDaGFuZ2U6IFBSRVNFTEVDVF9DSEFOR0VfVklBX05BVklHQVRFLFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKCFvcGVuKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgIChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICBmb2N1c2VkOiBza2lwU2V0Qmx1ciA/IHByZXYuZm9jdXNlZCA6IGZhbHNlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICFza2lwU2V0Qmx1ciAmJiB0aGlzLnNldEJsdXIoKTtcblxuICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuICBpbnB1dE9rID0gKCkgPT4gaXNEYXRlKHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uKTtcblxuICBpc0NhbGVuZGFyT3BlbiA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5vcGVuID09PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5zdGF0ZS5vcGVuICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLnJlYWRPbmx5XG4gICAgICA6IHRoaXMucHJvcHMub3BlbjtcblxuICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5wcmV2ZW50Rm9jdXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICBpZiAoIXRoaXMucHJvcHMucHJldmVudE9wZW5PbkZvY3VzICYmICF0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IHRydWUgfSk7XG4gIH07XG5cbiAgc2VuZEZvY3VzQmFja1RvSW5wdXQgPSAoKSA9PiB7XG4gICAgLy8gQ2xlYXIgcHJldmlvdXMgdGltZW91dCBpZiBpdCBleGlzdHNcbiAgICBpZiAodGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0KSB7XG4gICAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIHRoZSBwb3BwZXIgYW5kIHJlZm9jdXMgdGhlIGlucHV0XG4gICAgLy8gc3RvcCB0aGUgaW5wdXQgZnJvbSBhdXRvIG9wZW5pbmcgb25Gb2N1c1xuICAgIC8vIHNldEZvY3VzIHRvIHRoZSBpbnB1dFxuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Rm9jdXM6IHRydWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjYW5jZWxGb2N1c0lucHV0ID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmlucHV0Rm9jdXNUaW1lb3V0KTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfTtcblxuICBkZWZlckZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gICAgdGhpcy5pbnB1dEZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRGb2N1cygpLCAxKTtcbiAgfTtcblxuICBoYW5kbGVEcm9wZG93bkZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIGhhbmRsZUJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUub3BlbiB8fCB0aGlzLnByb3BzLndpdGhQb3J0YWwgfHwgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IGZhbHNlIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNhbGVuZGFyQ2xpY2tPdXRzaWRlID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrT3V0c2lkZShldmVudCk7XG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFBvcnRhbCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKC4uLmFsbEFyZ3MpID0+IHtcbiAgICBsZXQgZXZlbnQgPSBhbGxBcmdzWzBdO1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlUmF3KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlUmF3LmFwcGx5KHRoaXMsIGFsbEFyZ3MpO1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKClcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW5wdXRWYWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQsXG4gICAgfSk7XG4gICAgbGV0IGRhdGUgPSBwYXJzZURhdGUoXG4gICAgICBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgIHRoaXMucHJvcHMuc3RyaWN0UGFyc2luZyxcbiAgICAgIHRoaXMucHJvcHMubWluRGF0ZSxcbiAgICApO1xuICAgIC8vIFVzZSBkYXRlIGZyb20gYHNlbGVjdGVkYCBwcm9wIHdoZW4gbWFuaXB1bGF0aW5nIG9ubHkgdGltZSBmb3IgaW5wdXQgdmFsdWVcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSAmJlxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJlxuICAgICAgZGF0ZSAmJlxuICAgICAgIWlzU2FtZURheShkYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgZGF0ZSA9IHNldCh0aGlzLnByb3BzLnNlbGVjdGVkLCB7XG4gICAgICAgIGhvdXJzOiBnZXRIb3VycyhkYXRlKSxcbiAgICAgICAgbWludXRlczogZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgICAgc2Vjb25kczogZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZGF0ZSB8fCAhZXZlbnQudGFyZ2V0LnZhbHVlKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkKGRhdGUsIGV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0ID0gKGRhdGUsIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmICF0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICAvLyBQcmV2ZW50aW5nIG9uRm9jdXMgZXZlbnQgdG8gZml4IGlzc3VlXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL2lzc3Vlcy82MjhcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcoZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlbGVjdGVkKGRhdGUsIGV2ZW50LCBmYWxzZSwgbW9udGhTZWxlY3RlZEluKTtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93RGF0ZVNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbihkYXRlKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgaWYgKCF0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiAhaXNEYXRlQmVmb3JlKGRhdGUsIHN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgc2V0U2VsZWN0ZWQgPSAoZGF0ZSwgZXZlbnQsIGtlZXBJbnB1dCwgbW9udGhTZWxlY3RlZEluKSA9PiB7XG4gICAgbGV0IGNoYW5nZWREYXRlID0gZGF0ZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZWREYXRlICE9PSBudWxsICYmXG4gICAgICAgIGlzWWVhckRpc2FibGVkKGdldFllYXIoY2hhbmdlZERhdGUpLCB0aGlzLnByb3BzKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcikge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsICYmIGlzTW9udGhEaXNhYmxlZChjaGFuZ2VkRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNEYXlEaXNhYmxlZChjaGFuZ2VkRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgc2VsZWN0c1JhbmdlLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZSxcbiAgICAgIHNlbGVjdGVkRGF0ZXMsXG4gICAgICBtaW5UaW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgIWlzRXF1YWwodGhpcy5wcm9wcy5zZWxlY3RlZCwgY2hhbmdlZERhdGUpIHx8XG4gICAgICB0aGlzLnByb3BzLmFsbG93U2FtZURheSB8fFxuICAgICAgc2VsZWN0c1JhbmdlIHx8XG4gICAgICBzZWxlY3RzTXVsdGlwbGVcbiAgICApIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCAmJlxuICAgICAgICAgICgha2VlcElucHV0IHx8XG4gICAgICAgICAgICAoIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBjaGFuZ2VkRGF0ZSA9IHNldFRpbWUoY2hhbmdlZERhdGUsIHtcbiAgICAgICAgICAgIGhvdXI6IGdldEhvdXJzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgc2Vjb25kOiBnZXRTZWNvbmRzKHRoaXMucHJvcHMuc2VsZWN0ZWQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbWluVGltZSBpcyBwcmVzZW50IHRoZW4gc2V0IHRoZSB0aW1lIHRvIG1pblRpbWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFrZWVwSW5wdXQgJiZcbiAgICAgICAgICAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKG1pblRpbWUpIHtcbiAgICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgICBob3VyOiBtaW5UaW1lLmdldEhvdXJzKCksXG4gICAgICAgICAgICAgIG1pbnV0ZTogbWluVGltZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICAgIHNlY29uZDogbWluVGltZS5nZXRTZWNvbmRzKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb246IGNoYW5nZWREYXRlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5mb2N1c1NlbGVjdGVkTW9udGgpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiBtb250aFNlbGVjdGVkSW4gfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RzUmFuZ2UpIHtcbiAgICAgICAgY29uc3Qgbm9SYW5nZXMgPSAhc3RhcnREYXRlICYmICFlbmREYXRlO1xuICAgICAgICBjb25zdCBoYXNTdGFydFJhbmdlID0gc3RhcnREYXRlICYmICFlbmREYXRlO1xuICAgICAgICBjb25zdCBpc1JhbmdlRmlsbGVkID0gc3RhcnREYXRlICYmIGVuZERhdGU7XG4gICAgICAgIGlmIChub1Jhbmdlcykge1xuICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNTdGFydFJhbmdlKSB7XG4gICAgICAgICAgaWYgKGNoYW5nZWREYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZUJlZm9yZShjaGFuZ2VkRGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbc3RhcnREYXRlLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmFuZ2VGaWxsZWQpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0c011bHRpcGxlKSB7XG4gICAgICAgIGlmICghc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZERhdGVzLnNvbWUoXG4gICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiBpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RGF0ZXMgPSBzZWxlY3RlZERhdGVzLmZpbHRlcihcbiAgICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gIWlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIG9uQ2hhbmdlKG5leHREYXRlcywgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbLi4uc2VsZWN0ZWREYXRlcywgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbkNoYW5nZShjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgha2VlcElucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gV2hlbiBjaGVja2luZyBwcmVTZWxlY3Rpb24gdmlhIG1pbi9tYXhEYXRlLCB0aW1lcyBuZWVkIHRvIGJlIG1hbmlwdWxhdGVkIHZpYSBzdGFydE9mRGF5L2VuZE9mRGF5XG4gIHNldFByZVNlbGVjdGlvbiA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgaGFzTWluRGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1pbkRhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgY29uc3QgaGFzTWF4RGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1heERhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgbGV0IGlzVmFsaWREYXRlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGUpO1xuICAgICAgaWYgKGhhc01pbkRhdGUgJiYgaGFzTWF4RGF0ZSkge1xuICAgICAgICAvLyBpc0RheUluUmFuZ2UgdXNlcyBzdGFydE9mRGF5IGludGVybmFsbHksIHNvIG5vdCBuZWNlc3NhcnkgdG8gbWFuaXB1bGF0ZSB0aW1lcyBoZXJlXG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID0gaXNEYXlJblJhbmdlKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWluRGF0ZSkge1xuICAgICAgICBjb25zdCBtaW5EYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkodGhpcy5wcm9wcy5taW5EYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQWZ0ZXIoZGF0ZSwgbWluRGF0ZVN0YXJ0T2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWluRGF0ZVN0YXJ0T2ZEYXkpO1xuICAgICAgfSBlbHNlIGlmIChoYXNNYXhEYXRlKSB7XG4gICAgICAgIGNvbnN0IG1heERhdGVFbmRPZkRheSA9IGVuZE9mRGF5KHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0JlZm9yZShkYXRlLCBtYXhEYXRlRW5kT2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWF4RGF0ZUVuZE9mRGF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzVmFsaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcHJlU2VsZWN0aW9uOiBkYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZUNhbGVuZGFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0T3BlbighdGhpcy5zdGF0ZS5vcGVuKTtcbiAgfTtcblxuICBoYW5kbGVUaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgOiB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGltZVxuICAgICAgOiBzZXRUaW1lKHNlbGVjdGVkLCB7XG4gICAgICAgICAgaG91cjogZ2V0SG91cnModGltZSksXG4gICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRpbWUpLFxuICAgICAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hhbmdlZERhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgb25JbnB1dENsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25JbnB1dENsaWNrKCk7XG4gIH07XG5cbiAgb25JbnB1dEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5zdGF0ZS5vcGVuICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1c1xuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiRW50ZXJcIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub25JbnB1dENsaWNrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgY2FsZW5kYXIgaXMgb3BlbiwgdGhlc2Uga2V5cyB3aWxsIGZvY3VzIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50S2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzZWxlY3RvclN0cmluZyA9XG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJiB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc1xuICAgICAgICAgICAgPyAnLnJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyW3RhYmluZGV4PVwiMFwiXSdcbiAgICAgICAgICAgIDogJy5yZWFjdC1kYXRlcGlja2VyX19kYXlbdGFiaW5kZXg9XCIwXCJdJztcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID1cbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUgJiZcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW0uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuaW5wdXRPaygpICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5sYXN0UHJlU2VsZWN0Q2hhbmdlID09PSBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiVGFiXCIpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uUG9ydGFsS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBwcmV2ZW50Rm9jdXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICAvLyBrZXlEb3duIGV2ZW50cyBwYXNzZWQgZG93biB0byBkYXkuanN4XG4gIG9uRGF5S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc1NoaWZ0S2V5QWN0aXZlID0gZXZlbnQuc2hpZnRLZXk7XG5cbiAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBsZXQgbmV3U2VsZWN0aW9uO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJEYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZERheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlVXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IHN1YlllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IHN1Yk1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBhZGRZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBhZGRNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJIb21lXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgICBjb3B5LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkVuZFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldEVuZE9mV2Vlayhjb3B5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFuZXdTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dEVycm9yKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgfSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZChuZXdTZWxlY3Rpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24obmV3U2VsZWN0aW9uKTtcbiAgICAgIC8vIG5lZWQgdG8gZmlndXJlIG91dCB3aGV0aGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvblxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgIGNvbnN0IHByZXZNb250aCA9IGdldE1vbnRoKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdNb250aCA9IGdldE1vbnRoKG5ld1NlbGVjdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZZZWFyID0gZ2V0WWVhcihjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3WWVhciA9IGdldFllYXIobmV3U2VsZWN0aW9uKTtcblxuICAgICAgICBpZiAocHJldk1vbnRoICE9PSBuZXdNb250aCB8fCBwcmV2WWVhciAhPT0gbmV3WWVhcikge1xuICAgICAgICAgIC8vIG1vbnRoIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1vbnRoIGhhc24ndCBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBoYW5kbGUgZ2VuZXJpYyBrZXkgZG93biBldmVudHMgaW4gdGhlIHBvcHBlciB0aGF0IGRvIG5vdCBhZGp1c3Qgb3Igc2VsZWN0IGRhdGVzXG4gIC8vIGV4OiB3aGlsZSBmb2N1c2luZyBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnNcbiAgb25Qb3BwZXJLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgfTtcblxuICBvbkNsZWFyQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsLCBldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIGNsZWFyID0gKCkgPT4ge1xuICAgIHRoaXMub25DbGVhckNsaWNrKCk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImJvb2xlYW5cIiAmJlxuICAgICAgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbChldmVudCkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5pc0NhbGVuZGFyT3BlbigpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxXcmFwcGVkQ2FsZW5kYXJcbiAgICAgICAgcmVmPXsoZWxlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbGVtO1xuICAgICAgICB9fVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnNldE9wZW59XG4gICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0Q2FsZW5kYXJ9XG4gICAgICAgIHVzZVdlZWtkYXlzU2hvcnQ9e3RoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydH1cbiAgICAgICAgZm9ybWF0V2Vla0RheT17dGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5fVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnN0YXRlLnByZVNlbGVjdGlvbn1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICBvbkNsaWNrT3V0c2lkZT17dGhpcy5oYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZX1cbiAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5zdGF0ZS5oaWdobGlnaHREYXRlc31cbiAgICAgICAgaG9saWRheXM9e2dldEhvbGlkYXlzTWFwKHRoaXMubW9kaWZ5SG9saWRheXMoKSl9XG4gICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMuc3RhdGUuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgIHNob3dQcmV2aW91c01vbnRocz17dGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHN9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgd2Vla0xhYmVsPXt0aGlzLnByb3BzLndlZWtMYWJlbH1cbiAgICAgICAgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3M9e291dHNpZGVDbGlja0lnbm9yZUNsYXNzfVxuICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgbW9udGhzU2hvd249e3RoaXMucHJvcHMubW9udGhzU2hvd259XG4gICAgICAgIG1vbnRoU2VsZWN0ZWRJbj17dGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW59XG4gICAgICAgIG9uRHJvcGRvd25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgICBvbk1vbnRoQ2hhbmdlPXt0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2V9XG4gICAgICAgIG9uWWVhckNoYW5nZT17dGhpcy5wcm9wcy5vblllYXJDaGFuZ2V9XG4gICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgIHdlZWtEYXlDbGFzc05hbWU9e3RoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZX1cbiAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgc2hvd0RhdGVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICBvblRpbWVDaGFuZ2U9e3RoaXMuaGFuZGxlVGltZUNoYW5nZX1cbiAgICAgICAgdGltZUZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICB0aW1lSW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2FsZW5kYXJDbGFzc05hbWV9XG4gICAgICAgIGNvbnRhaW5lcj17dGhpcy5wcm9wcy5jYWxlbmRhckNvbnRhaW5lcn1cbiAgICAgICAgeWVhckl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckl0ZW1OdW1iZXJ9XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0TW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgICBuZXh0TW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQXJpYUxhYmVsfVxuICAgICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgcmVuZGVyQ3VzdG9tSGVhZGVyPXt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcn1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXJ9XG4gICAgICAgIG9uTW9udGhNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgIHNob3dUaW1lSW5wdXQ9e3RoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICBleGNsdWRlU2Nyb2xsYmFyPXt0aGlzLnByb3BzLmV4Y2x1ZGVTY3JvbGxiYXJ9XG4gICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5vbktleURvd259XG4gICAgICAgIGhhbmRsZU9uRGF5S2V5RG93bj17dGhpcy5vbkRheUtleURvd259XG4gICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnN0YXRlLmZvY3VzZWR9XG4gICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9XcmFwcGVkQ2FsZW5kYXI+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJBcmlhTGl2ZVJlZ2lvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc0NvbnRhaW5zVGltZSA9XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQgfHwgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdDtcbiAgICBjb25zdCBsb25nRGF0ZUZvcm1hdCA9IGlzQ29udGFpbnNUaW1lID8gXCJQUFBQcFwiIDogXCJQUFBQXCI7XG4gICAgbGV0IGFyaWFMaXZlTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHN0YXJ0IGRhdGU6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgbG9jYWxlLFxuICAgICAgICB9LFxuICAgICAgKX0uICR7XG4gICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZVxuICAgICAgICAgID8gXCJFbmQgZGF0ZTogXCIgK1xuICAgICAgICAgICAgc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5lbmREYXRlLCB7XG4gICAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogXCJcIlxuICAgICAgfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seSkge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgdGltZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgeWVhcjogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJ5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcikge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgbW9udGg6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7IGRhdGVGb3JtYXQ6IFwiTU1NTSB5eXl5XCIsIGxvY2FsZSB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBxdWFydGVyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogXCJ5eXl5LCBRUVFcIixcbiAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB9LFxuICAgICAgICApfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGxvbmdEYXRlRm9ybWF0LFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fYXJpYS1saXZlXCJcbiAgICAgID5cbiAgICAgICAge2FyaWFMaXZlTWVzc2FnZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckRhdGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc25hbWVzKHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG4gICAgICBbb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3NdOiB0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjdXN0b21JbnB1dCA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXQgfHwgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgLz47XG4gICAgY29uc3QgY3VzdG9tSW5wdXRSZWYgPSB0aGlzLnByb3BzLmN1c3RvbUlucHV0UmVmIHx8IFwicmVmXCI7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy52YWx1ZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgOiB0eXBlb2YgdGhpcy5zdGF0ZS5pbnB1dFZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgPyB0aGlzLnN0YXRlLmlucHV0VmFsdWVcbiAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgICA/IHNhZmVEYXRlUmFuZ2VGb3JtYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGVcbiAgICAgICAgICAgICAgPyBzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXMsIHRoaXMucHJvcHMpXG4gICAgICAgICAgICAgIDogc2FmZURhdGVGb3JtYXQodGhpcy5wcm9wcy5zZWxlY3RlZCwgdGhpcy5wcm9wcyk7XG5cbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGN1c3RvbUlucHV0LCB7XG4gICAgICBbY3VzdG9tSW5wdXRSZWZdOiAoaW5wdXQpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgfSxcbiAgICAgIHZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUJsdXIsXG4gICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uSW5wdXRDbGljayxcbiAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsXG4gICAgICBvbktleURvd246IHRoaXMub25JbnB1dEtleURvd24sXG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgIGZvcm06IHRoaXMucHJvcHMuZm9ybSxcbiAgICAgIGF1dG9Gb2N1czogdGhpcy5wcm9wcy5hdXRvRm9jdXMsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlclRleHQsXG4gICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgIGF1dG9Db21wbGV0ZTogdGhpcy5wcm9wcy5hdXRvQ29tcGxldGUsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzbmFtZXMoY3VzdG9tSW5wdXQucHJvcHMuY2xhc3NOYW1lLCBjbGFzc05hbWUpLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSxcbiAgICAgIHJlcXVpcmVkOiB0aGlzLnByb3BzLnJlcXVpcmVkLFxuICAgICAgdGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXgsXG4gICAgICBcImFyaWEtZGVzY3JpYmVkYnlcIjogdGhpcy5wcm9wcy5hcmlhRGVzY3JpYmVkQnksXG4gICAgICBcImFyaWEtaW52YWxpZFwiOiB0aGlzLnByb3BzLmFyaWFJbnZhbGlkLFxuICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGhpcy5wcm9wcy5hcmlhTGFiZWxsZWRCeSxcbiAgICAgIFwiYXJpYS1yZXF1aXJlZFwiOiB0aGlzLnByb3BzLmFyaWFSZXF1aXJlZCxcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NsZWFyYWJsZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgY2xlYXJCdXR0b25UaXRsZSxcbiAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lID0gXCJcIixcbiAgICAgIGFyaWFMYWJlbENsb3NlID0gXCJDbG9zZVwiLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoXG4gICAgICBpc0NsZWFyYWJsZSAmJlxuICAgICAgKHNlbGVjdGVkICE9IG51bGwgfHxcbiAgICAgICAgc3RhcnREYXRlICE9IG51bGwgfHxcbiAgICAgICAgZW5kRGF0ZSAhPSBudWxsIHx8XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM/Lmxlbmd0aClcbiAgICApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb25cIixcbiAgICAgICAgICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lLFxuICAgICAgICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX2Nsb3NlLWljb24tLWRpc2FibGVkXCI6IGRpc2FibGVkIH0sXG4gICAgICAgICAgKX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsQ2xvc2V9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsZWFyQ2xpY2t9XG4gICAgICAgICAgdGl0bGU9e2NsZWFyQnV0dG9uVGl0bGV9XG4gICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcklucHV0Q29udGFpbmVyKCkge1xuICAgIGNvbnN0IHsgc2hvd0ljb24sIGljb24sIGNhbGVuZGFySWNvbkNsYXNzbmFtZSwgdG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBvcGVuIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtY29udGFpbmVyJHtcbiAgICAgICAgICBzaG93SWNvbiA/IFwiIHJlYWN0LWRhdGVwaWNrZXJfX3ZpZXctY2FsZW5kYXItaWNvblwiIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAge3Nob3dJY29uICYmIChcbiAgICAgICAgICA8Q2FsZW5kYXJJY29uXG4gICAgICAgICAgICBpY29uPXtpY29ufVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjYWxlbmRhckljb25DbGFzc25hbWV9ICR7XG4gICAgICAgICAgICAgIG9wZW4gJiYgXCJyZWFjdC1kYXRlcGlja2VyLWlnbm9yZS1vbmNsaWNrb3V0c2lkZVwiXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHsuLi4odG9nZ2xlQ2FsZW5kYXJPbkljb25DbGlja1xuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMudG9nZ2xlQ2FsZW5kYXIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGwpfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnN0YXRlLmlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlICYmIHRoaXMucmVuZGVyQXJpYUxpdmVSZWdpb24oKX1cbiAgICAgICAge3RoaXMucmVuZGVyRGF0ZUlucHV0KCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNsZWFyQnV0dG9uKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNhbGVuZGFyID0gdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSByZXR1cm4gY2FsZW5kYXI7XG5cbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBsZXQgcG9ydGFsQ29udGFpbmVyID0gdGhpcy5zdGF0ZS5vcGVuID8gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3BvcnRhbFwiXG4gICAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25Qb3J0YWxLZXlEb3dufVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjYWxlbmRhcn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UYWJMb29wPlxuICAgICAgKSA6IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnN0YXRlLm9wZW4gJiYgdGhpcy5wcm9wcy5wb3J0YWxJZCkge1xuICAgICAgICBwb3J0YWxDb250YWluZXIgPSAoXG4gICAgICAgICAgPFBvcnRhbFxuICAgICAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgICA8L1BvcnRhbD5cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICAgIHtwb3J0YWxDb250YWluZXJ9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcHBlckNvbXBvbmVudFxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMucG9wcGVyQ2xhc3NOYW1lfVxuICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLndyYXBwZXJDbGFzc05hbWV9XG4gICAgICAgIGhpZGVQb3BwZXI9eyF0aGlzLmlzQ2FsZW5kYXJPcGVuKCl9XG4gICAgICAgIHBvcnRhbElkPXt0aGlzLnByb3BzLnBvcnRhbElkfVxuICAgICAgICBwb3J0YWxIb3N0PXt0aGlzLnByb3BzLnBvcnRhbEhvc3R9XG4gICAgICAgIHBvcHBlck1vZGlmaWVycz17dGhpcy5wcm9wcy5wb3BwZXJNb2RpZmllcnN9XG4gICAgICAgIHRhcmdldENvbXBvbmVudD17dGhpcy5yZW5kZXJJbnB1dENvbnRhaW5lcigpfVxuICAgICAgICBwb3BwZXJDb250YWluZXI9e3RoaXMucHJvcHMucG9wcGVyQ29udGFpbmVyfVxuICAgICAgICBwb3BwZXJDb21wb25lbnQ9e2NhbGVuZGFyfVxuICAgICAgICBwb3BwZXJQbGFjZW1lbnQ9e3RoaXMucHJvcHMucG9wcGVyUGxhY2VtZW50fVxuICAgICAgICBwb3BwZXJQcm9wcz17dGhpcy5wcm9wcy5wb3BwZXJQcm9wc31cbiAgICAgICAgcG9wcGVyT25LZXlEb3duPXt0aGlzLm9uUG9wcGVyS2V5RG93bn1cbiAgICAgICAgZW5hYmxlVGFiTG9vcD17dGhpcy5wcm9wcy5lbmFibGVUYWJMb29wfVxuICAgICAgICBzaG93QXJyb3c9e3RoaXMucHJvcHMuc2hvd1BvcHBlckFycm93fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUID0gXCJpbnB1dFwiO1xuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgPSBcIm5hdmlnYXRlXCI7XG4iXSwibmFtZXMiOlsiREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSIiwibG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJuZXdEYXRlIiwidmFsdWUiLCJkIiwiU3RyaW5nIiwicGFyc2VJU08iLCJ0b0RhdGUiLCJEYXRlIiwiaXNWYWxpZCIsInBhcnNlRGF0ZSIsImRhdGVGb3JtYXQiLCJsb2NhbGUiLCJzdHJpY3RQYXJzaW5nIiwibWluRGF0ZSIsInBhcnNlZERhdGUiLCJsb2NhbGVPYmplY3QiLCJnZXRMb2NhbGVPYmplY3QiLCJnZXREZWZhdWx0TG9jYWxlIiwic3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2giLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiZGYiLCJ0cnlQYXJzZURhdGUiLCJwYXJzZSIsInVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyIsInVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMiLCJmb3JtYXREYXRlIiwibWF0Y2giLCJtYXAiLCJzdWJzdHJpbmciLCJmaXJzdENoYXJhY3RlciIsImxvbmdGb3JtYXR0ZXIiLCJsb25nRm9ybWF0dGVycyIsImZvcm1hdExvbmciLCJqb2luIiwibGVuZ3RoIiwic2xpY2UiLCJkYXRlIiwiaXNWYWxpZERhdGUiLCJpc0JlZm9yZSIsImZvcm1hdFN0ciIsImZvcm1hdCIsImxvY2FsZU9iaiIsImNvbnNvbGUiLCJ3YXJuIiwiY29uY2F0Iiwic2FmZURhdGVGb3JtYXQiLCJfcmVmIiwic2FmZURhdGVSYW5nZUZvcm1hdCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJwcm9wcyIsImZvcm1hdHRlZFN0YXJ0RGF0ZSIsImZvcm1hdHRlZEVuZERhdGUiLCJzYWZlTXVsdGlwbGVEYXRlc0Zvcm1hdCIsImRhdGVzIiwiZm9ybWF0dGVkRmlyc3REYXRlIiwiZm9ybWF0dGVkU2Vjb25kRGF0ZSIsImV4dHJhRGF0ZXNDb3VudCIsInNldFRpbWUiLCJfcmVmMiIsIl9yZWYyJGhvdXIiLCJob3VyIiwiX3JlZjIkbWludXRlIiwibWludXRlIiwiX3JlZjIkc2Vjb25kIiwic2Vjb25kIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsImdldFdlZWsiLCJnZXRJU09XZWVrIiwiZ2V0RGF5T2ZXZWVrQ29kZSIsImRheSIsImdldFN0YXJ0T2ZEYXkiLCJzdGFydE9mRGF5IiwiZ2V0U3RhcnRPZldlZWsiLCJjYWxlbmRhclN0YXJ0RGF5Iiwic3RhcnRPZldlZWsiLCJ3ZWVrU3RhcnRzT24iLCJnZXRTdGFydE9mTW9udGgiLCJzdGFydE9mTW9udGgiLCJnZXRTdGFydE9mWWVhciIsInN0YXJ0T2ZZZWFyIiwiZ2V0U3RhcnRPZlF1YXJ0ZXIiLCJzdGFydE9mUXVhcnRlciIsImdldFN0YXJ0T2ZUb2RheSIsImdldEVuZE9mV2VlayIsImVuZE9mV2VlayIsImlzU2FtZVllYXIiLCJkYXRlMSIsImRhdGUyIiwiZGZJc1NhbWVZZWFyIiwiaXNTYW1lTW9udGgiLCJkZklzU2FtZU1vbnRoIiwiaXNTYW1lUXVhcnRlciIsImRmSXNTYW1lUXVhcnRlciIsImlzU2FtZURheSIsImRmSXNTYW1lRGF5IiwiaXNFcXVhbCIsImRmSXNFcXVhbCIsImlzRGF5SW5SYW5nZSIsInZhbGlkIiwic3RhcnQiLCJlbmQiLCJlbmRPZkRheSIsImlzV2l0aGluSW50ZXJ2YWwiLCJlcnIiLCJyZWdpc3RlckxvY2FsZSIsImxvY2FsZU5hbWUiLCJsb2NhbGVEYXRhIiwic2NvcGUiLCJ3aW5kb3ciLCJnbG9iYWxUaGlzIiwiX19sb2NhbGVEYXRhX18iLCJzZXREZWZhdWx0TG9jYWxlIiwiX19sb2NhbGVJZF9fIiwibG9jYWxlU3BlYyIsImdldEZvcm1hdHRlZFdlZWtkYXlJbkxvY2FsZSIsImZvcm1hdEZ1bmMiLCJnZXRXZWVrZGF5TWluSW5Mb2NhbGUiLCJnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSIsImdldE1vbnRoSW5Mb2NhbGUiLCJtb250aCIsInNldE1vbnRoIiwiZ2V0TW9udGhTaG9ydEluTG9jYWxlIiwiZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUiLCJxdWFydGVyIiwic2V0UXVhcnRlciIsImlzRGF5RGlzYWJsZWQiLCJfcmVmMyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIm1heERhdGUiLCJleGNsdWRlRGF0ZXMiLCJleGNsdWRlRGF0ZUludGVydmFscyIsImluY2x1ZGVEYXRlcyIsImluY2x1ZGVEYXRlSW50ZXJ2YWxzIiwiZmlsdGVyRGF0ZSIsImlzT3V0T2ZCb3VuZHMiLCJzb21lIiwiZXhjbHVkZURhdGUiLCJfcmVmNCIsImluY2x1ZGVEYXRlIiwiX3JlZjUiLCJpc0RheUV4Y2x1ZGVkIiwiX3JlZjYiLCJfcmVmNyIsImlzTW9udGhEaXNhYmxlZCIsIl9yZWY4IiwiZW5kT2ZNb250aCIsImlzTW9udGhJblJhbmdlIiwibSIsInN0YXJ0RGF0ZVllYXIiLCJnZXRZZWFyIiwic3RhcnREYXRlTW9udGgiLCJnZXRNb250aCIsImVuZERhdGVZZWFyIiwiZW5kRGF0ZU1vbnRoIiwiZGF5WWVhciIsImlzUXVhcnRlckRpc2FibGVkIiwiX3JlZjkiLCJpc1llYXJJblJhbmdlIiwieWVhciIsInN0YXJ0WWVhciIsImVuZFllYXIiLCJpc1llYXJEaXNhYmxlZCIsIl9yZWYxMCIsImVuZE9mWWVhciIsImlzUXVhcnRlckluUmFuZ2UiLCJxIiwic3RhcnREYXRlUXVhcnRlciIsImdldFF1YXJ0ZXIiLCJlbmREYXRlUXVhcnRlciIsIl9yZWYxMSIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImlzVGltZUluTGlzdCIsInRpbWUiLCJ0aW1lcyIsImxpc3RUaW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiaXNUaW1lRGlzYWJsZWQiLCJfcmVmMTIiLCJleGNsdWRlVGltZXMiLCJpbmNsdWRlVGltZXMiLCJmaWx0ZXJUaW1lIiwiaXNUaW1lSW5EaXNhYmxlZFJhbmdlIiwiX3JlZjEzIiwibWluVGltZSIsIm1heFRpbWUiLCJFcnJvciIsImJhc2UiLCJiYXNlVGltZSIsIm1pbiIsIm1heCIsIm1vbnRoRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTQiLCJwcmV2aW91c01vbnRoIiwic3ViTW9udGhzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMiLCJldmVyeSIsIm1vbnRoRGlzYWJsZWRBZnRlciIsIl9yZWYxNSIsIm5leHRNb250aCIsImFkZE1vbnRocyIsInllYXJEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNiIsInByZXZpb3VzWWVhciIsInN1YlllYXJzIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyIsInllYXJzRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTciLCJfcmVmMTckeWVhckl0ZW1OdW1iZXIiLCJ5ZWFySXRlbU51bWJlciIsIl9nZXRZZWFyc1BlcmlvZCIsImdldFllYXJzUGVyaW9kIiwiZW5kUGVyaW9kIiwibWluRGF0ZVllYXIiLCJ5ZWFyRGlzYWJsZWRBZnRlciIsIl9yZWYxOCIsIm5leHRZZWFyIiwiYWRkWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQWZ0ZXIiLCJfcmVmMTkiLCJfcmVmMTkkeWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QyIiwic3RhcnRQZXJpb2QiLCJtYXhEYXRlWWVhciIsImdldEVmZmVjdGl2ZU1pbkRhdGUiLCJfcmVmMjAiLCJtaW5EYXRlcyIsImZpbHRlciIsImdldEVmZmVjdGl2ZU1heERhdGUiLCJfcmVmMjEiLCJtYXhEYXRlcyIsImdldEhpZ2h0TGlnaHREYXlzTWFwIiwiaGlnaGxpZ2h0RGF0ZXMiLCJkZWZhdWx0Q2xhc3NOYW1lIiwiZGF0ZUNsYXNzZXMiLCJNYXAiLCJpIiwibGVuIiwib2JqIiwiaXNEYXRlIiwia2V5IiwiY2xhc3NOYW1lc0FyciIsImdldCIsImluY2x1ZGVzIiwicHVzaCIsInNldCIsIl90eXBlb2YiLCJrZXlzIiwiT2JqZWN0IiwiY2xhc3NOYW1lIiwiYXJyT2ZEYXRlcyIsImNvbnN0cnVjdG9yIiwiayIsImFycmF5c0FyZUVxdWFsIiwiYXJyYXkxIiwiYXJyYXkyIiwiaW5kZXgiLCJnZXRIb2xpZGF5c01hcCIsImhvbGlkYXlEYXRlcyIsImhvbGlkYXkiLCJkYXRlT2JqIiwiaG9saWRheU5hbWUiLCJjbGFzc05hbWVzT2JqIiwiaG9saWRheU5hbWVBcnIiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJ0aW1lc1RvSW5qZWN0QWZ0ZXIiLCJjdXJyZW50VGltZSIsImN1cnJlbnRNdWx0aXBsaWVyIiwiaW50ZXJ2YWxzIiwiaW5qZWN0ZWRUaW1lcyIsImwiLCJpbmplY3RlZFRpbWUiLCJhZGRNaW51dGVzIiwiYWRkSG91cnMiLCJuZXh0VGltZSIsImlzQWZ0ZXIiLCJhZGRaZXJvIiwiTWF0aCIsImNlaWwiLCJnZXRIb3Vyc0luRGF5IiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwic3RhcnRPZlRoZU5leHREYXkiLCJyb3VuZCIsInN0YXJ0T2ZNaW51dGUiLCJzZWNvbmRzIiwiZ2V0U2Vjb25kcyIsIm1pbGxpc2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsImdldFRpbWUiLCJpc1NhbWVNaW51dGUiLCJkMSIsImQyIiwiZ2V0TWlkbmlnaHREYXRlIiwiZGF0ZVdpdGhvdXRUaW1lIiwiaXNEYXRlQmVmb3JlIiwiZGF0ZVRvQ29tcGFyZSIsIm1pZG5pZ2h0RGF0ZSIsIm1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSIsImlzU3BhY2VLZXlEb3duIiwiZXZlbnQiLCJTUEFDRV9LRVkiLCJnZW5lcmF0ZVllYXJzIiwibm9PZlllYXIiLCJsaXN0IiwibmV3WWVhciIsImlzSW5SYW5nZSIsIlllYXJEcm9wZG93bk9wdGlvbnMiLCJfUmVhY3QkQ29tcG9uZW50IiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX2RlZmluZVByb3BlcnR5Iiwic2VsZWN0ZWRZZWFyIiwib3B0aW9ucyIsInN0YXRlIiwieWVhcnNMaXN0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwib25DbGljayIsIm9uQ2hhbmdlIiwiYmluZCIsIm1pblllYXIiLCJtYXhZZWFyIiwiZmluZCIsInVuc2hpZnQiLCJpbmNyZW1lbnRZZWFycyIsImRlY3JlbWVudFllYXJzIiwib25DYW5jZWwiLCJhbW91bnQiLCJ5ZWFycyIsInNldFN0YXRlIiwic2hpZnRZZWFycyIsInllYXJEcm9wZG93bkl0ZW1OdW1iZXIiLCJzY3JvbGxhYmxlWWVhckRyb3Bkb3duIiwiZHJvcGRvd25SZWYiLCJjcmVhdGVSZWYiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsImRyb3Bkb3duQ3VycmVudCIsImN1cnJlbnQiLCJkcm9wZG93bkN1cnJlbnRDaGlsZHJlbiIsImNoaWxkcmVuIiwiZnJvbSIsInNlbGVjdGVkWWVhck9wdGlvbkVsIiwiY2hpbGRFbCIsImFyaWFTZWxlY3RlZCIsInNjcm9sbFRvcCIsIm9mZnNldFRvcCIsImNsaWVudEhlaWdodCIsInNjcm9sbEhlaWdodCIsInJlbmRlciIsImRyb3Bkb3duQ2xhc3MiLCJjbGFzc05hbWVzIiwicmVmIiwicmVuZGVyT3B0aW9ucyIsIkNvbXBvbmVudCIsIldyYXBwZWRZZWFyRHJvcGRvd25PcHRpb25zIiwib25DbGlja091dHNpZGUiLCJZZWFyRHJvcGRvd24iLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJkcm9wZG93blZpc2libGUiLCJlIiwidGFyZ2V0Iiwib25TZWxlY3RDaGFuZ2UiLCJyZW5kZXJTZWxlY3RPcHRpb25zIiwidmlzaWJsZSIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRvZ2dsZURyb3Bkb3duIiwicmVzdWx0IiwicmVuZGVyUmVhZFZpZXciLCJyZW5kZXJEcm9wZG93biIsImFkanVzdERhdGVPbkNoYW5nZSIsImhhbmRsZVllYXJDaGFuZ2UiLCJvblNlbGVjdCIsInNldE9wZW4iLCJyZW5kZXJlZERyb3Bkb3duIiwiZHJvcGRvd25Nb2RlIiwicmVuZGVyU2Nyb2xsTW9kZSIsInJlbmRlclNlbGVjdE1vZGUiLCJNb250aERyb3Bkb3duT3B0aW9ucyIsIm1vbnRoTmFtZXMiLCJpc1NlbGVjdGVkTW9udGgiLCJXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnMiLCJNb250aERyb3Bkb3duIiwiTSIsIl90aGlzMiIsInVzZVNob3J0TW9udGhJbkRyb3Bkb3duIiwidXRpbHMiLCJnZW5lcmF0ZU1vbnRoWWVhcnMiLCJjdXJyRGF0ZSIsImxhc3REYXRlIiwiTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIiwibW9udGhZZWFyc0xpc3QiLCJtb250aFllYXIiLCJtb250aFllYXJQb2ludCIsImlzU2FtZU1vbnRoWWVhciIsInNjcm9sbGFibGVNb250aFllYXJEcm9wZG93biIsIldyYXBwZWRNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJNb250aFllYXJEcm9wZG93biIsInRpbWVQb2ludCIsInllYXJNb250aCIsImNoYW5nZWREYXRlIiwicGFyc2VJbnQiLCJEYXkiLCJpc0Rpc2FibGVkIiwib25Nb3VzZUVudGVyIiwiZXZlbnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZU9uS2V5RG93biIsIm90aGVyIiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREIiwiZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24iLCJpc1NlbGVjdGVkRGF0ZSIsInNlbGVjdHNNdWx0aXBsZSIsInNlbGVjdGVkRGF0ZXMiLCJpc1NhbWVEYXlPcldlZWsiLCJzZWxlY3RlZCIsInByZVNlbGVjdGlvbiIsInNob3dXZWVrUGlja2VyIiwiaXNTYW1lV2VlayIsIl90aGlzJHByb3BzIiwiZGF5U3RyIiwiX3RoaXMkcHJvcHMyIiwiaG9saWRheXMiLCJoYXMiLCJfdGhpcyRwcm9wczMiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmciLCJfdGhpcyRwcm9wczQiLCJzZWxlY3RzU3RhcnQiLCJzZWxlY3RzRW5kIiwic2VsZWN0c1JhbmdlIiwic2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2UiLCJzZWxlY3RpbmdEYXRlIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMiIsImlzSW5TZWxlY3RpbmdSYW5nZSIsIl90aGlzJHByb3BzNSIsIl90aGlzJHByb3BzJHNlbGVjdGluZzMiLCJfdGhpcyRwcm9wczYiLCJfdGhpcyRwcm9wczciLCJfdGhpcyRwcm9wczgiLCJ3ZWVrZGF5IiwiZ2V0RGF5IiwiX3RoaXMkcHJvcHMkc2VsZWN0ZWREMiIsImRheUNsYXNzTmFtZSIsImNsYXNzbmFtZXMiLCJpc0V4Y2x1ZGVkIiwiaXNTZWxlY3RlZCIsImlzS2V5Ym9hcmRTZWxlY3RlZCIsImlzUmFuZ2VTdGFydCIsImlzUmFuZ2VFbmQiLCJpc1NlbGVjdGluZ1JhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ1JhbmdlRW5kIiwiaXNDdXJyZW50RGF5IiwiaXNXZWVrZW5kIiwiaXNBZnRlck1vbnRoIiwiaXNCZWZvcmVNb250aCIsImdldEhpZ2hMaWdodGVkQ2xhc3MiLCJnZXRIb2xpZGF5c0NsYXNzIiwiX3RoaXMkcHJvcHM5IiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlIiwiYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQiLCJfdGhpcyRwcm9wczkkYXJpYUxhYmUyIiwiYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkIiwicHJlZml4IiwiX3RoaXMkcHJvcHMxMCIsIl90aGlzJHByb3BzMTAkaG9saWRheSIsImNvbXBhcmVEdCIsInRpdGxlcyIsImFwcGx5IiwiaG9saWRheU5hbWVzIiwibWVzc2FnZSIsInNlbGVjdGVkRGF5IiwicHJlU2VsZWN0aW9uRGF5IiwidGFiSW5kZXgiLCJzaG93V2Vla051bWJlciIsImlzU3RhcnRPZldlZWsiLCJfdGhpcyRkYXlFbCRjdXJyZW50IiwicHJldlByb3BzIiwic2hvdWxkRm9jdXNEYXkiLCJnZXRUYWJJbmRleCIsImlzSW5wdXRGb2N1c2VkIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiYm9keSIsImlubGluZSIsInNob3VsZEZvY3VzRGF5SW5saW5lIiwiY29udGFpbmVyUmVmIiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCIsIm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQiLCJkYXlFbCIsImZvY3VzIiwicHJldmVudFNjcm9sbCIsInJlbmRlckRheUNvbnRlbnRzIiwiZ2V0Q2xhc3NOYW1lcyIsIm9uS2V5RG93biIsImhhbmRsZUNsaWNrIiwidXNlUG9pbnRlckV2ZW50IiwiaGFuZGxlTW91c2VFbnRlciIsIm9uUG9pbnRlckVudGVyIiwiZ2V0QXJpYUxhYmVsIiwicm9sZSIsInRpdGxlIiwiZ2V0VGl0bGUiLCJoYW5kbGVGb2N1c0RheSIsImNvbXBvbmVudERpZFVwZGF0ZSIsIldlZWtOdW1iZXIiLCJzaG91bGRGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyRWwiLCJoYW5kbGVGb2N1c1dlZWtOdW1iZXIiLCJ3ZWVrTnVtYmVyIiwiX3RoaXMkcHJvcHMkYXJpYUxhYmVsIiwiYXJpYUxhYmVsUHJlZml4Iiwid2Vla051bWJlckNsYXNzZXMiLCJXZWVrIiwib25EYXlDbGljayIsIm9uRGF5TW91c2VFbnRlciIsIm9uV2Vla1NlbGVjdCIsImhhbmRsZURheUNsaWNrIiwic2hvdWxkQ2xvc2VPblNlbGVjdCIsImZvcm1hdFdlZWtOdW1iZXIiLCJkYXlzIiwib25DbGlja0FjdGlvbiIsImhhbmRsZVdlZWtDbGljayIsIm9mZnNldCIsImFkZERheXMiLCJjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXgiLCJkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeCIsInZhbHVlT2YiLCJoYW5kbGVEYXlNb3VzZUVudGVyIiwicmVuZGVyRGF5cyIsIkZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UIiwiTU9OVEhfQ09MVU1OU19MQVlPVVQiLCJUV09fQ09MVU1OUyIsIlRIUkVFX0NPTFVNTlMiLCJGT1VSX0NPTFVNTlMiLCJNT05USF9DT0xVTU5TIiwiZ3JpZCIsInZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldCIsIk1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQiLCJnZXRNb250aENvbHVtbnNMYXlvdXQiLCJzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlciIsInNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIiLCJNb250aCIsIm9yZGVySW5EaXNwbGF5Iiwib25Nb3VzZUxlYXZlIiwiaXNJblNlbGVjdGluZ1JhbmdlTW9udGgiLCJfbW9udGgiLCJfdGhpcyRwcm9wcyRzZWxlY3Rpbmc0Iiwid2Vla3MiLCJpc0ZpeGVkSGVpZ2h0IiwiZml4ZWRIZWlnaHQiLCJicmVha0FmdGVyTmV4dFB1c2giLCJjdXJyZW50V2Vla1N0YXJ0Iiwid2Vla0FyaWFMYWJlbFByZWZpeCIsInNob3dXZWVrTnVtYmVycyIsImlzRml4ZWRBbmRGaW5hbFdlZWsiLCJpc05vbkZpeGVkQW5kT3V0T2ZNb250aCIsImlzV2Vla0luTW9udGgiLCJwZWVrTmV4dE1vbnRoIiwibGFiZWxEYXRlIiwibmV3TW9udGgiLCJzZXRQcmVTZWxlY3Rpb24iLCJNT05USF9SRUZTIiwiaGFuZGxlT25Nb250aEtleURvd24iLCJtb250aENvbHVtbnNMYXlvdXQiLCJ2ZXJ0aWNhbE9mZnNldCIsIm1vbnRoc0dyaWQiLCJvbk1vbnRoQ2xpY2siLCJoYW5kbGVNb250aE5hdmlnYXRpb24iLCJuZXdRdWFydGVyIiwiUVVBUlRFUl9SRUZTIiwib25RdWFydGVyQ2xpY2siLCJoYW5kbGVRdWFydGVyTmF2aWdhdGlvbiIsIm1vbnRoQ2xhc3NOYW1lIiwiX21vbnRoQ2xhc3NOYW1lIiwiaXNSYW5nZVN0YXJ0TW9udGgiLCJpc1JhbmdlRW5kTW9udGgiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VTdGFydCIsImlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCIsImlzQ3VycmVudE1vbnRoIiwicHJlU2VsZWN0ZWRNb250aCIsInByZVNlbGVjdGVkUXVhcnRlciIsIl90aGlzJHByb3BzMTEiLCJfdGhpcyRwcm9wczExJGNob29zZUQiLCJfdGhpcyRwcm9wczExJGRpc2FibGUiLCJfdGhpcyRwcm9wczEyIiwiaXNTZWxlY3RlZFF1YXJ0ZXIiLCJpc0luU2VsZWN0aW5nUmFuZ2VRdWFydGVyIiwiaXNSYW5nZVN0YXJ0UXVhcnRlciIsImlzUmFuZ2VFbmRRdWFydGVyIiwiX3RoaXMkcHJvcHMxMyIsInNob3dGdWxsTW9udGhZZWFyUGlja2VyIiwicmVuZGVyTW9udGhDb250ZW50Iiwic2hvcnRNb250aFRleHQiLCJmdWxsTW9udGhUZXh0IiwiX3RoaXMkcHJvcHMxNCIsInJlbmRlclF1YXJ0ZXJDb250ZW50Iiwic2hvcnRRdWFydGVyIiwiX3RoaXMkcHJvcHMxNSIsIm1vbnRoQ29sdW1ucyIsImoiLCJldiIsIm9uTW9udGhLZXlEb3duIiwib25Nb250aE1vdXNlRW50ZXIiLCJnZXRNb250aENsYXNzTmFtZXMiLCJnZXRNb250aENvbnRlbnQiLCJfdGhpcyRwcm9wczE2IiwicXVhcnRlcnMiLCJvblF1YXJ0ZXJLZXlEb3duIiwib25RdWFydGVyTW91c2VFbnRlciIsImdldFF1YXJ0ZXJDbGFzc05hbWVzIiwiZ2V0UXVhcnRlclRhYkluZGV4IiwiaXNDdXJyZW50UXVhcnRlciIsImdldFF1YXJ0ZXJDb250ZW50IiwiX3RoaXMkcHJvcHMxNyIsInNob3dNb250aFllYXJQaWNrZXIiLCJzaG93UXVhcnRlclllYXJQaWNrZXIiLCJfdGhpcyRwcm9wczE4IiwiX3RoaXMkcHJvcHMxOCRhcmlhTGFiIiwiZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4IiwidHJpbSIsImhhbmRsZU1vdXNlTGVhdmUiLCJvblBvaW50ZXJMZWF2ZSIsInJlbmRlck1vbnRocyIsInJlbmRlclF1YXJ0ZXJzIiwicmVuZGVyV2Vla3MiLCJUaW1lIiwiaGVpZ2h0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2VudGVyTGkiLCJjYWxjQ2VudGVyUG9zaXRpb24iLCJtb250aFJlZiIsImhlYWRlciIsImNsYXNzZXMiLCJ0aW1lQ2xhc3NOYW1lIiwiaXNTZWxlY3RlZFRpbWUiLCJpc0Rpc2FibGVkVGltZSIsImluamVjdFRpbWVzIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJhY3RpdmVEYXRlIiwib3BlblRvRGF0ZSIsInNvcnRlZEluamVjdFRpbWVzIiwic29ydCIsImEiLCJiIiwibWludXRlc0luRGF5IiwibXVsdGlwbGllciIsInRpbWVzVG9JbmplY3QiLCJ0aW1lVG9Gb2N1cyIsInJlZHVjZSIsInByZXYiLCJsaUNsYXNzZXMiLCJsaSIsInNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lIiwidG9kYXlCdXR0b24iLCJzaG93VGltZVNlbGVjdE9ubHkiLCJ0aW1lQ2FwdGlvbiIsInJlbmRlclRpbWVzIiwib25UaW1lQ2hhbmdlIiwibGlzdEhlaWdodCIsImNlbnRlckxpUmVmIiwiWWVhciIsInJlZkluZGV4Iiwid2FpdEZvclJlUmVuZGVyIiwiWUVBUl9SRUZTIiwiX3V0aWxzJGdldFllYXJzUGVyaW9kIiwidXBkYXRlRm9jdXNPblBhZ2luYXRlIiwieSIsIl95ZWFyIiwiaGFuZGxlWWVhckNsaWNrIiwib25ZZWFyQ2xpY2siLCJoYW5kbGVZZWFyTmF2aWdhdGlvbiIsImlzQ3VycmVudFllYXIiLCJwcmVTZWxlY3RlZCIsInJlbmRlclllYXJDb250ZW50Iiwib25ZZWFyTW91c2VFbnRlciIsIm9uWWVhck1vdXNlTGVhdmUiLCJfdXRpbHMkZ2V0WWVhcnNQZXJpb2QyIiwiX2xvb3AiLCJvblllYXJLZXlEb3duIiwiZ2V0WWVhclRhYkluZGV4IiwiZ2V0WWVhckNsYXNzTmFtZXMiLCJnZXRZZWFyQ29udGVudCIsImdldFllYXJDb250YWluZXJDbGFzc05hbWVzIiwiY2xlYXJTZWxlY3RpbmdEYXRlIiwiaW5wdXRUaW1lIiwicHJvcERhdGUiLCJpc1Byb3BEYXRlVmFsaWQiLCJpc05hTiIsInNwbGl0IiwidGltZVN0cmluZyIsImN1c3RvbVRpbWVJbnB1dCIsImNsb25lRWxlbWVudCIsInR5cGUiLCJwbGFjZWhvbGRlciIsIm5hbWUiLCJyZXF1aXJlZCIsInRpbWVJbnB1dExhYmVsIiwicmVuZGVyVGltZUlucHV0IiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwiQ2FsZW5kYXJDb250YWluZXIiLCJfcmVmJHNob3dUaW1lU2VsZWN0T24iLCJfcmVmJHNob3dUaW1lIiwic2hvd1RpbWUiLCJhcmlhTGFiZWwiLCJEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTIiwiaXNEcm9wZG93blNlbGVjdCIsImVsZW1lbnQiLCJ0ZXN0Q2xhc3NuYW1lIiwiaW5kZXhPZiIsIkNhbGVuZGFyIiwib25Ecm9wZG93bkZvY3VzIiwiaW5pdGlhbERhdGUiLCJoYW5kbGVNb250aENoYW5nZSIsIm1vbnRoU2VsZWN0ZWRJbiIsIm9uTW9udGhNb3VzZUxlYXZlIiwic2V0WWVhciIsIm9uWWVhckNoYW5nZSIsImlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlIiwiaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UiLCJvbk1vbnRoQ2hhbmdlIiwiaGFuZGxlTW9udGhZZWFyQ2hhbmdlIiwiZGF5TmFtZXMiLCJ3ZWVrTGFiZWwiLCJ3ZWVrRGF5TmFtZSIsImZvcm1hdFdlZWtkYXkiLCJ3ZWVrRGF5Q2xhc3NOYW1lIiwiZm9ybWF0V2Vla0RheSIsInVzZVdlZWtkYXlzU2hvcnQiLCJzaG93WWVhclBpY2tlciIsInJlbmRlckN1c3RvbUhlYWRlciIsImFsbFByZXZEYXlzRGlzYWJsZWQiLCJmb3JjZVNob3dNb250aE5hdmlnYXRpb24iLCJzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24iLCJpY29uQ2xhc3NlcyIsImNsaWNrSGFuZGxlciIsImRlY3JlYXNlTW9udGgiLCJkZWNyZWFzZVllYXIiLCJpc0ZvclllYXIiLCJwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwiLCJwcmV2aW91c1llYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91cyIsInByZXZpb3VzTW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMyIiwicHJldmlvdXNZZWFyQXJpYUxhYmVsIiwiYWxsTmV4dERheXNEaXNhYmxlZCIsInNob3dUaW1lU2VsZWN0IiwiaW5jcmVhc2VNb250aCIsImluY3JlYXNlWWVhciIsIm5leHRNb250aEJ1dHRvbkxhYmVsIiwibmV4dFllYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0TW9udCIsIm5leHRNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0WWVhciIsIm5leHRZZWFyQXJpYUxhYmVsIiwic2hvd1llYXJEcm9wZG93biIsInNob3dNb250aERyb3Bkb3duIiwic2hvd01vbnRoWWVhckRyb3Bkb3duIiwib3ZlcnJpZGVIaWRlIiwiY2hhbmdlWWVhciIsImNoYW5nZU1vbnRoIiwiY2hhbmdlTW9udGhZZWFyIiwiaGFuZGxlVG9kYXlCdXR0b25DbGljayIsIm1vbnRoRGF0ZSIsInJlbmRlckN1cnJlbnRNb250aCIsIm9uRm9jdXMiLCJoYW5kbGVEcm9wZG93bkZvY3VzIiwicmVuZGVyTW9udGhEcm9wZG93biIsInJlbmRlck1vbnRoWWVhckRyb3Bkb3duIiwicmVuZGVyWWVhckRyb3Bkb3duIiwiaGVhZGVyQXJncyIsIm1vbnRoQ29udGFpbmVyIiwicHJldk1vbnRoQnV0dG9uRGlzYWJsZWQiLCJuZXh0TW9udGhCdXR0b25EaXNhYmxlZCIsInByZXZZZWFyQnV0dG9uRGlzYWJsZWQiLCJuZXh0WWVhckJ1dHRvbkRpc2FibGVkIiwic2hvd0RheU5hbWVzIiwiX29iamVjdFNwcmVhZCIsImN1c3RvbUhlYWRlckNvdW50IiwicmVuZGVyWWVhckhlYWRlciIsInJlbmRlckRlZmF1bHRIZWFkZXIiLCJfdGhpcyRwcm9wcyRtb250aFNlbGUiLCJtb250aExpc3QiLCJtb250aHNUb1N1YnRyYWN0Iiwic2hvd1ByZXZpb3VzTW9udGhzIiwibW9udGhzU2hvd24iLCJmcm9tTW9udGhEYXRlIiwibW9udGhzVG9BZGQiLCJtb250aEtleSIsImRpdiIsInJlbmRlckhlYWRlciIsIm1vbnRoQXJpYUxhYmVsUHJlZml4IiwiaGFuZGxlT25EYXlLZXlEb3duIiwiaGFuZGxlTW9udGhNb3VzZUxlYXZlIiwiX2V4dGVuZHMiLCJoYW5kbGVZZWFyTW91c2VFbnRlciIsImhhbmRsZVllYXJNb3VzZUxlYXZlIiwidGltZUZvcm1hdCIsInRpbWVJbnRlcnZhbHMiLCJ3aXRoUG9ydGFsIiwidGltZVZhbGlkIiwiQm9vbGVhbiIsInNob3dUaW1lSW5wdXQiLCJJbnB1dFRpbWUiLCJhcmlhTGl2ZU1lc3NhZ2UiLCJnZXREYXRlSW5WaWV3IiwiYXNzaWduTW9udGhDb250YWluZXIiLCJfdGhpczMiLCJoYXNNb250aENoYW5nZWQiLCJDb250YWluZXIiLCJjb250YWluZXIiLCJkaXNwbGF5IiwicmVuZGVyQXJpYUxpdmVSZWdpb24iLCJyZW5kZXJQcmV2aW91c0J1dHRvbiIsInJlbmRlck5leHRCdXR0b24iLCJyZW5kZXJZZWFycyIsInJlbmRlclRvZGF5QnV0dG9uIiwicmVuZGVyVGltZVNlY3Rpb24iLCJyZW5kZXJJbnB1dFRpbWVTZWN0aW9uIiwicmVuZGVyQ2hpbGRyZW4iLCJDYWxlbmRhckljb24iLCJpY29uIiwiX3JlZiRjbGFzc05hbWUiLCJkZWZhdWx0Q2xhc3MiLCJpc1ZhbGlkRWxlbWVudCIsInhtbG5zIiwidmlld0JveCIsIlBvcnRhbCIsImVsIiwicG9ydGFsUm9vdCIsInBvcnRhbEhvc3QiLCJnZXRFbGVtZW50QnlJZCIsInBvcnRhbElkIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUNoaWxkIiwiUmVhY3RET00iLCJjcmVhdGVQb3J0YWwiLCJmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yIiwiZm9jdXNhYmxlRmlsdGVyIiwibm9kZSIsImRpc2FibGVkIiwiVGFiTG9vcCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YWJMb29wUmVmIiwicXVlcnlTZWxlY3RvckFsbCIsInRhYkNoaWxkcmVuIiwiZ2V0VGFiQ2hpbGRyZW4iLCJlbmFibGVUYWJMb29wIiwiaGFuZGxlRm9jdXNTdGFydCIsImhhbmRsZUZvY3VzRW5kIiwid2l0aEZsb2F0aW5nIiwiV2l0aEZsb2F0aW5nIiwiYWx0X3Byb3BzIiwicG9wcGVyTW9kaWZpZXJzIiwicG9wcGVyUHJvcHMiLCJoaWRlUG9wcGVyIiwiYXJyb3dSZWYiLCJ1c2VSZWYiLCJmbG9hdGluZ1Byb3BzIiwidXNlRmxvYXRpbmciLCJvcGVuIiwid2hpbGVFbGVtZW50c01vdW50ZWQiLCJhdXRvVXBkYXRlIiwicGxhY2VtZW50IiwicG9wcGVyUGxhY2VtZW50IiwibWlkZGxld2FyZSIsImZsaXAiLCJwYWRkaW5nIiwiYXJyb3ciLCJQb3BwZXJDb21wb25lbnQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwicG9wcGVyQ29tcG9uZW50IiwidGFyZ2V0Q29tcG9uZW50IiwicG9wcGVyT25LZXlEb3duIiwic2hvd0Fycm93IiwicG9wcGVyIiwicmVmcyIsInNldEZsb2F0aW5nIiwiZmxvYXRpbmdTdHlsZXMiLCJGbG9hdGluZ0Fycm93IiwiY29udGV4dCIsImZpbGwiLCJzdHJva2VXaWR0aCIsIndpZHRoIiwidHJhbnNmb3JtIiwicG9wcGVyQ29udGFpbmVyIiwid3JhcHBlckNsYXNzZXMiLCJGcmFnbWVudCIsInNldFJlZmVyZW5jZSIsIm91dHNpZGVDbGlja0lnbm9yZUNsYXNzIiwiV3JhcHBlZENhbGVuZGFyIiwiaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZCIsIklOUFVUX0VSUl8xIiwiRGF0ZVBpY2tlciIsIl90aGlzJHByb3BzJGhvbGlkYXlzIiwiYWNjdW11bGF0b3IiLCJkZWZhdWx0UHJlU2VsZWN0aW9uIiwiZ2V0UHJlU2VsZWN0aW9uIiwiYm91bmRlZFByZVNlbGVjdGlvbiIsInN0YXJ0T3BlbiIsInByZXZlbnRGb2N1cyIsImZvY3VzZWQiLCJwcmV2ZW50Rm9jdXNUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaW5wdXQiLCJibHVyIiwiY2FuY2VsRm9jdXNJbnB1dCIsInNraXBTZXRCbHVyIiwiY2FsY0luaXRpYWxTdGF0ZSIsImxhc3RQcmVTZWxlY3RDaGFuZ2UiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSIsInNldEJsdXIiLCJpbnB1dFZhbHVlIiwicmVhZE9ubHkiLCJwcmV2ZW50T3Blbk9uRm9jdXMiLCJjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2V0Rm9jdXMiLCJpbnB1dEZvY3VzVGltZW91dCIsIm9uQmx1ciIsImFsbEFyZ3MiLCJvbkNoYW5nZVJhdyIsImlzRGVmYXVsdFByZXZlbnRlZCIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUIiwiaG91cnMiLCJtaW51dGVzIiwic2V0U2VsZWN0ZWQiLCJzZW5kRm9jdXNCYWNrVG9JbnB1dCIsInNob3dEYXRlU2VsZWN0Iiwia2VlcElucHV0IiwiYWxsb3dTYW1lRGF5IiwiZm9jdXNTZWxlY3RlZE1vbnRoIiwibm9SYW5nZXMiLCJoYXNTdGFydFJhbmdlIiwiaXNSYW5nZUZpbGxlZCIsImlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQiLCJzZWxlY3RlZERhdGUiLCJuZXh0RGF0ZXMiLCJoYXNNaW5EYXRlIiwiaGFzTWF4RGF0ZSIsImlzVmFsaWREYXRlU2VsZWN0aW9uIiwiZGF0ZVN0YXJ0T2ZEYXkiLCJtaW5EYXRlU3RhcnRPZkRheSIsIm1heERhdGVFbmRPZkRheSIsIm9uSW5wdXRDbGljayIsInNlbGVjdG9yU3RyaW5nIiwic2VsZWN0ZWRJdGVtIiwiY2FsZW5kYXIiLCJjb21wb25lbnROb2RlIiwicXVlcnlTZWxlY3RvciIsImNvcHkiLCJpbnB1dE9rIiwiaGFuZGxlU2VsZWN0Iiwib25JbnB1dEVycm9yIiwiY29kZSIsIm1zZyIsImlzU2hpZnRLZXlBY3RpdmUiLCJzaGlmdEtleSIsIm5ld1NlbGVjdGlvbiIsInN1YldlZWtzIiwic3ViRGF5cyIsImFkZFdlZWtzIiwicHJldk1vbnRoIiwicHJldlllYXIiLCJvbkNsZWFyQ2xpY2siLCJjbG9zZU9uU2Nyb2xsIiwiZG9jdW1lbnRFbGVtZW50IiwiaXNDYWxlbmRhck9wZW4iLCJlbGVtIiwiZGF0ZUZvcm1hdENhbGVuZGFyIiwiaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUiLCJtb2RpZnlIb2xpZGF5cyIsImhhbmRsZVRpbWVDaGFuZ2UiLCJjYWxlbmRhckNsYXNzTmFtZSIsImNhbGVuZGFyQ29udGFpbmVyIiwiZXhjbHVkZVNjcm9sbGJhciIsIm9uRGF5S2V5RG93biIsImlzQ29udGFpbnNUaW1lIiwibG9uZ0RhdGVGb3JtYXQiLCJfUmVhY3QkY2xvbmVFbGVtZW50IiwiY3VzdG9tSW5wdXQiLCJjdXN0b21JbnB1dFJlZiIsImhhbmRsZUJsdXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVGb2N1cyIsIm9uSW5wdXRLZXlEb3duIiwiaWQiLCJmb3JtIiwiYXV0b0ZvY3VzIiwicGxhY2Vob2xkZXJUZXh0IiwiYXV0b0NvbXBsZXRlIiwiYXJpYURlc2NyaWJlZEJ5IiwiYXJpYUludmFsaWQiLCJhcmlhTGFiZWxsZWRCeSIsImFyaWFSZXF1aXJlZCIsImlzQ2xlYXJhYmxlIiwiY2xlYXJCdXR0b25UaXRsZSIsIl90aGlzJHByb3BzNCRjbGVhckJ1dCIsImNsZWFyQnV0dG9uQ2xhc3NOYW1lIiwiX3RoaXMkcHJvcHM0JGFyaWFMYWJlIiwiYXJpYUxhYmVsQ2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25TY3JvbGwiLCJwcmV2U3RhdGUiLCJvbkNhbGVuZGFyT3BlbiIsIm9uQ2FsZW5kYXJDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJJbnB1dENvbnRhaW5lciIsInNob3dJY29uIiwiY2FsZW5kYXJJY29uQ2xhc3NuYW1lIiwidG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayIsInRvZ2dsZUNhbGVuZGFyIiwicmVuZGVyRGF0ZUlucHV0IiwicmVuZGVyQ2xlYXJCdXR0b24iLCJyZW5kZXJDYWxlbmRhciIsInBvcnRhbENvbnRhaW5lciIsIm9uUG9ydGFsS2V5RG93biIsInBvcHBlckNsYXNzTmFtZSIsIm9uUG9wcGVyS2V5RG93biIsInNob3dQb3BwZXJBcnJvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeURPLElBQU1BLHdCQUF3QixHQUFHLEVBQUUsQ0FBQTs7QUFFMUM7QUFDQTtBQUNBLElBQU1DLDBCQUEwQixHQUFHLG1DQUFtQyxDQUFBOztBQUV0RTs7QUFFTyxTQUFTQyxPQUFPQSxDQUFDQyxLQUFLLEVBQUU7RUFDN0IsSUFBTUMsQ0FBQyxHQUFHRCxLQUFLLEdBQ1gsT0FBT0EsS0FBSyxLQUFLLFFBQVEsSUFBSUEsS0FBSyxZQUFZRSxNQUFNLEdBQ2xEQyxRQUFRLENBQUNILEtBQUssQ0FBQyxHQUNmSSxNQUFNLENBQUNKLEtBQUssQ0FBQyxHQUNmLElBQUlLLElBQUksRUFBRSxDQUFBO0FBQ2QsRUFBQSxPQUFPQyxPQUFPLENBQUNMLENBQUMsQ0FBQyxHQUFHQSxDQUFD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
