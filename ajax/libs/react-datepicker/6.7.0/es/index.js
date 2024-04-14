/*!
  react-datepicker v6.7.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRlX3V0aWxzLmpzIiwiLi4vLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMveWVhcl9kcm9wZG93bi5qc3giLCIuLi8uLi9zcmMvbW9udGhfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMvbW9udGhfZHJvcGRvd24uanN4IiwiLi4vLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9ucy5qc3giLCIuLi8uLi9zcmMvbW9udGhfeWVhcl9kcm9wZG93bi5qc3giLCIuLi8uLi9zcmMvZGF5LmpzeCIsIi4uLy4uL3NyYy93ZWVrX251bWJlci5qc3giLCIuLi8uLi9zcmMvd2Vlay5qc3giLCIuLi8uLi9zcmMvbW9udGguanN4IiwiLi4vLi4vc3JjL3RpbWUuanN4IiwiLi4vLi4vc3JjL3llYXIuanN4IiwiLi4vLi4vc3JjL2lucHV0VGltZS5qc3giLCIuLi8uLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLmpzeCIsIi4uLy4uL3NyYy9jYWxlbmRhci5qc3giLCIuLi8uLi9zcmMvY2FsZW5kYXJfaWNvbi5qc3giLCIuLi8uLi9zcmMvcG9ydGFsLmpzeCIsIi4uLy4uL3NyYy90YWJfbG9vcC5qc3giLCIuLi8uLi9zcmMvd2l0aF9mbG9hdGluZy5qc3giLCIuLi8uLi9zcmMvcG9wcGVyX2NvbXBvbmVudC5qc3giLCIuLi8uLi9zcmMvaW5kZXguanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCJkYXRlLWZucy9pc0RhdGVcIjtcbmltcG9ydCB7IGlzVmFsaWQgYXMgaXNWYWxpZERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHsgZm9ybWF0LCBsb25nRm9ybWF0dGVycyB9IGZyb20gXCJkYXRlLWZucy9mb3JtYXRcIjtcbmltcG9ydCB7IGFkZE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkTWludXRlc1wiO1xuaW1wb3J0IHsgYWRkSG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkSG91cnNcIjtcbmltcG9ydCB7IGFkZERheXMgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkRGF5c1wiO1xuaW1wb3J0IHsgYWRkV2Vla3MgfSBmcm9tIFwiZGF0ZS1mbnMvYWRkV2Vla3NcIjtcbmltcG9ydCB7IGFkZE1vbnRocyB9IGZyb20gXCJkYXRlLWZucy9hZGRNb250aHNcIjtcbmltcG9ydCB7IGFkZFF1YXJ0ZXJzIH0gZnJvbSBcImRhdGUtZm5zL2FkZFF1YXJ0ZXJzXCI7XG5pbXBvcnQgeyBhZGRZZWFycyB9IGZyb20gXCJkYXRlLWZucy9hZGRZZWFyc1wiO1xuaW1wb3J0IHsgc3ViRGF5cyB9IGZyb20gXCJkYXRlLWZucy9zdWJEYXlzXCI7XG5pbXBvcnQgeyBzdWJXZWVrcyB9IGZyb20gXCJkYXRlLWZucy9zdWJXZWVrc1wiO1xuaW1wb3J0IHsgc3ViTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL3N1Yk1vbnRoc1wiO1xuaW1wb3J0IHsgc3ViUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvc3ViUXVhcnRlcnNcIjtcbmltcG9ydCB7IHN1YlllYXJzIH0gZnJvbSBcImRhdGUtZm5zL3N1YlllYXJzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zL2dldFNlY29uZHNcIjtcbmltcG9ydCB7IGdldE1pbnV0ZXMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0TWludXRlc1wiO1xuaW1wb3J0IHsgZ2V0SG91cnMgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0SG91cnNcIjtcbmltcG9ydCB7IGdldERheSB9IGZyb20gXCJkYXRlLWZucy9nZXREYXlcIjtcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0RGF0ZVwiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCJkYXRlLWZucy9nZXRJU09XZWVrXCI7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9nZXRNb250aFwiO1xuaW1wb3J0IHsgZ2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9nZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL2dldFllYXJcIjtcbmltcG9ydCB7IGdldFRpbWUgfSBmcm9tIFwiZGF0ZS1mbnMvZ2V0VGltZVwiO1xuaW1wb3J0IHsgc2V0U2Vjb25kcyB9IGZyb20gXCJkYXRlLWZucy9zZXRTZWNvbmRzXCI7XG5pbXBvcnQgeyBzZXRNaW51dGVzIH0gZnJvbSBcImRhdGUtZm5zL3NldE1pbnV0ZXNcIjtcbmltcG9ydCB7IHNldEhvdXJzIH0gZnJvbSBcImRhdGUtZm5zL3NldEhvdXJzXCI7XG5pbXBvcnQgeyBzZXRNb250aCB9IGZyb20gXCJkYXRlLWZucy9zZXRNb250aFwiO1xuaW1wb3J0IHsgc2V0UXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9zZXRRdWFydGVyXCI7XG5pbXBvcnQgeyBzZXRZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3NldFllYXJcIjtcbmltcG9ydCB7IG1pbiB9IGZyb20gXCJkYXRlLWZucy9taW5cIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCJkYXRlLWZucy9tYXhcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyB9IGZyb20gXCJkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIH0gZnJvbSBcImRhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyUXVhcnRlcnMgfSBmcm9tIFwiZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVyc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mRGF5XCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCJkYXRlLWZucy9zdGFydE9mV2Vla1wiO1xuaW1wb3J0IHsgc3RhcnRPZk1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZNb250aFwiO1xuaW1wb3J0IHsgc3RhcnRPZlF1YXJ0ZXIgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZlF1YXJ0ZXJcIjtcbmltcG9ydCB7IHN0YXJ0T2ZZZWFyIH0gZnJvbSBcImRhdGUtZm5zL3N0YXJ0T2ZZZWFyXCI7XG5pbXBvcnQgeyBlbmRPZkRheSB9IGZyb20gXCJkYXRlLWZucy9lbmRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZXZWVrIH0gZnJvbSBcImRhdGUtZm5zL2VuZE9mV2Vla1wiO1xuaW1wb3J0IHsgZW5kT2ZNb250aCB9IGZyb20gXCJkYXRlLWZucy9lbmRPZk1vbnRoXCI7XG5pbXBvcnQgeyBlbmRPZlllYXIgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZZZWFyXCI7XG5pbXBvcnQgeyBpc0VxdWFsIGFzIGRmSXNFcXVhbCB9IGZyb20gXCJkYXRlLWZucy9pc0VxdWFsXCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgYXMgZGZJc1NhbWVEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvaXNTYW1lRGF5XCI7XG5pbXBvcnQgeyBpc1NhbWVNb250aCBhcyBkZklzU2FtZU1vbnRoIH0gZnJvbSBcImRhdGUtZm5zL2lzU2FtZU1vbnRoXCI7XG5pbXBvcnQgeyBpc1NhbWVZZWFyIGFzIGRmSXNTYW1lWWVhciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVZZWFyXCI7XG5pbXBvcnQgeyBpc1NhbWVRdWFydGVyIGFzIGRmSXNTYW1lUXVhcnRlciB9IGZyb20gXCJkYXRlLWZucy9pc1NhbWVRdWFydGVyXCI7XG5pbXBvcnQgeyBpc0FmdGVyIH0gZnJvbSBcImRhdGUtZm5zL2lzQWZ0ZXJcIjtcbmltcG9ydCB7IGlzQmVmb3JlIH0gZnJvbSBcImRhdGUtZm5zL2lzQmVmb3JlXCI7XG5pbXBvcnQgeyBpc1dpdGhpbkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zL2lzV2l0aGluSW50ZXJ2YWxcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCJkYXRlLWZucy90b0RhdGVcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImRhdGUtZm5zL3BhcnNlXCI7XG5pbXBvcnQgeyBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZucy9wYXJzZUlTT1wiO1xuaW1wb3J0IHsgYWRkU2Vjb25kcyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSID0gMTI7XG5cbi8vIFRoaXMgUmVnRXhwIGNhdGNoZXMgc3ltYm9scyBlc2NhcGVkIGJ5IHF1b3RlcywgYW5kIGFsc29cbi8vIHNlcXVlbmNlcyBvZiBzeW1ib2xzIFAsIHAsIGFuZCB0aGUgY29tYmluYXRpb25zIGxpa2UgYFBQUFBQUFBwcHBwcGBcbmNvbnN0IGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1ArcCt8UCt8cCt8Jyd8JygnJ3xbXiddKSsoJ3wkKXwuL2c7XG5cbi8vICoqIERhdGUgQ29uc3RydWN0b3JzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdEYXRlKHZhbHVlKSB7XG4gIGNvbnN0IGQgPSB2YWx1ZVxuICAgID8gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG4gICAgICA/IHBhcnNlSVNPKHZhbHVlKVxuICAgICAgOiB0b0RhdGUodmFsdWUpXG4gICAgOiBuZXcgRGF0ZSgpO1xuICByZXR1cm4gaXNWYWxpZChkKSA/IGQgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlKHZhbHVlLCBkYXRlRm9ybWF0LCBsb2NhbGUsIHN0cmljdFBhcnNpbmcsIG1pbkRhdGUpIHtcbiAgbGV0IHBhcnNlZERhdGUgPSBudWxsO1xuICBsZXQgbG9jYWxlT2JqZWN0ID1cbiAgICBnZXRMb2NhbGVPYmplY3QobG9jYWxlKSB8fCBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgbGV0IHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID0gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkpIHtcbiAgICBkYXRlRm9ybWF0LmZvckVhY2goKGRmKSA9PiB7XG4gICAgICBsZXQgdHJ5UGFyc2VEYXRlID0gcGFyc2UodmFsdWUsIGRmLCBuZXcgRGF0ZSgpLCB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlT2JqZWN0LFxuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgICAgIHN0cmljdFBhcnNpbmdWYWx1ZU1hdGNoID1cbiAgICAgICAgICBpc1ZhbGlkKHRyeVBhcnNlRGF0ZSwgbWluRGF0ZSkgJiZcbiAgICAgICAgICB2YWx1ZSA9PT0gZm9ybWF0RGF0ZSh0cnlQYXJzZURhdGUsIGRmLCBsb2NhbGUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWQodHJ5UGFyc2VEYXRlLCBtaW5EYXRlKSAmJiBzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCkge1xuICAgICAgICBwYXJzZWREYXRlID0gdHJ5UGFyc2VEYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZWREYXRlO1xuICB9XG5cbiAgcGFyc2VkRGF0ZSA9IHBhcnNlKHZhbHVlLCBkYXRlRm9ybWF0LCBuZXcgRGF0ZSgpLCB7XG4gICAgbG9jYWxlOiBsb2NhbGVPYmplY3QsXG4gICAgdXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zOiB0cnVlLFxuICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gIH0pO1xuXG4gIGlmIChzdHJpY3RQYXJzaW5nKSB7XG4gICAgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPVxuICAgICAgaXNWYWxpZChwYXJzZWREYXRlKSAmJlxuICAgICAgdmFsdWUgPT09IGZvcm1hdERhdGUocGFyc2VkRGF0ZSwgZGF0ZUZvcm1hdCwgbG9jYWxlKTtcbiAgfSBlbHNlIGlmICghaXNWYWxpZChwYXJzZWREYXRlKSkge1xuICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0XG4gICAgICAubWF0Y2gobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHApXG4gICAgICAubWFwKGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCJwXCIgfHwgZmlyc3RDaGFyYWN0ZXIgPT09IFwiUFwiKSB7XG4gICAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgICByZXR1cm4gbG9jYWxlT2JqZWN0XG4gICAgICAgICAgICA/IGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGVPYmplY3QuZm9ybWF0TG9uZylcbiAgICAgICAgICAgIDogZmlyc3RDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlwiKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUsIGRhdGVGb3JtYXQuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSwgbmV3IERhdGUoKSwge1xuICAgICAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWQocGFyc2VkRGF0ZSkpIHtcbiAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzVmFsaWQocGFyc2VkRGF0ZSkgJiYgc3RyaWN0UGFyc2luZ1ZhbHVlTWF0Y2ggPyBwYXJzZWREYXRlIDogbnVsbDtcbn1cblxuLy8gKiogRGF0ZSBcIlJlZmxlY3Rpb25cIiAqKlxuXG5leHBvcnQgeyBpc0RhdGUgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSwgbWluRGF0ZSkge1xuICBtaW5EYXRlID0gbWluRGF0ZSA/IG1pbkRhdGUgOiBuZXcgRGF0ZShcIjEvMS8xMDAwXCIpO1xuICByZXR1cm4gaXNWYWxpZERhdGUoZGF0ZSkgJiYgIWlzQmVmb3JlKGRhdGUsIG1pbkRhdGUpO1xufVxuXG4vLyAqKiBEYXRlIEZvcm1hdHRpbmcgKipcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0U3RyLCBsb2NhbGUpIHtcbiAgaWYgKGxvY2FsZSA9PT0gXCJlblwiKSB7XG4gICAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIHtcbiAgICAgIHVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VuczogdHJ1ZSxcbiAgICAgIHVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM6IHRydWUsXG4gICAgfSk7XG4gIH1cbiAgbGV0IGxvY2FsZU9iaiA9IGdldExvY2FsZU9iamVjdChsb2NhbGUpO1xuICBpZiAobG9jYWxlICYmICFsb2NhbGVPYmopIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgQSBsb2NhbGUgb2JqZWN0IHdhcyBub3QgZm91bmQgZm9yIHRoZSBwcm92aWRlZCBzdHJpbmcgW1wiJHtsb2NhbGV9XCJdLmAsXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgIWxvY2FsZU9iaiAmJlxuICAgICEhZ2V0RGVmYXVsdExvY2FsZSgpICYmXG4gICAgISFnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKVxuICApIHtcbiAgICBsb2NhbGVPYmogPSBnZXRMb2NhbGVPYmplY3QoZ2V0RGVmYXVsdExvY2FsZSgpKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqID8gbG9jYWxlT2JqIDogbnVsbCxcbiAgICB1c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnM6IHRydWUsXG4gICAgdXNlQWRkaXRpb25hbERheU9mWWVhclRva2VuczogdHJ1ZSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZUZvcm1hdChkYXRlLCB7IGRhdGVGb3JtYXQsIGxvY2FsZSB9KSB7XG4gIHJldHVybiAoXG4gICAgKGRhdGUgJiZcbiAgICAgIGZvcm1hdERhdGUoXG4gICAgICAgIGRhdGUsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0ZUZvcm1hdCkgPyBkYXRlRm9ybWF0WzBdIDogZGF0ZUZvcm1hdCxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgKSkgfHxcbiAgICBcIlwiXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGF0ZVJhbmdlRm9ybWF0KHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcHJvcHMpIHtcbiAgaWYgKCFzdGFydERhdGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHNhZmVEYXRlRm9ybWF0KHN0YXJ0RGF0ZSwgcHJvcHMpO1xuICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gZW5kRGF0ZSA/IHNhZmVEYXRlRm9ybWF0KGVuZERhdGUsIHByb3BzKSA6IFwiXCI7XG5cbiAgcmV0dXJuIGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZX0gLSAke2Zvcm1hdHRlZEVuZERhdGV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KGRhdGVzLCBwcm9wcykge1xuICBpZiAoIWRhdGVzPy5sZW5ndGgpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBjb25zdCBmb3JtYXR0ZWRGaXJzdERhdGUgPSBzYWZlRGF0ZUZvcm1hdChkYXRlc1swXSwgcHJvcHMpO1xuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlZEZpcnN0RGF0ZTtcbiAgfVxuICBpZiAoZGF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kRGF0ZSA9IHNhZmVEYXRlRm9ybWF0KGRhdGVzWzFdLCBwcm9wcyk7XG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0sICR7Zm9ybWF0dGVkU2Vjb25kRGF0ZX1gO1xuICB9XG5cbiAgY29uc3QgZXh0cmFEYXRlc0NvdW50ID0gZGF0ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0RGF0ZX0gKCske2V4dHJhRGF0ZXNDb3VudH0pYDtcbn1cblxuLy8gKiogRGF0ZSBTZXR0ZXJzICoqXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lKGRhdGUsIHsgaG91ciA9IDAsIG1pbnV0ZSA9IDAsIHNlY29uZCA9IDAgfSkge1xuICByZXR1cm4gc2V0SG91cnMoc2V0TWludXRlcyhzZXRTZWNvbmRzKGRhdGUsIHNlY29uZCksIG1pbnV0ZSksIGhvdXIpO1xufVxuXG5leHBvcnQgeyBzZXRNaW51dGVzLCBzZXRIb3Vycywgc2V0TW9udGgsIHNldFF1YXJ0ZXIsIHNldFllYXIgfTtcblxuLy8gKiogRGF0ZSBHZXR0ZXJzICoqXG5cbi8vIGdldERheSBSZXR1cm5zIGRheSBvZiB3ZWVrLCBnZXREYXRlIHJldHVybnMgZGF5IG9mIG1vbnRoXG5leHBvcnQge1xuICBnZXRTZWNvbmRzLFxuICBnZXRNaW51dGVzLFxuICBnZXRIb3VycyxcbiAgZ2V0TW9udGgsXG4gIGdldFF1YXJ0ZXIsXG4gIGdldFllYXIsXG4gIGdldERheSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0VGltZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIGxvY2FsZSkge1xuICBsZXQgbG9jYWxlT2JqID1cbiAgICAobG9jYWxlICYmIGdldExvY2FsZU9iamVjdChsb2NhbGUpKSB8fFxuICAgIChnZXREZWZhdWx0TG9jYWxlKCkgJiYgZ2V0TG9jYWxlT2JqZWN0KGdldERlZmF1bHRMb2NhbGUoKSkpO1xuICByZXR1cm4gZ2V0SVNPV2VlayhkYXRlLCBsb2NhbGVPYmogPyB7IGxvY2FsZTogbG9jYWxlT2JqIH0gOiBudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mV2Vla0NvZGUoZGF5LCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF5LCBcImRkZFwiLCBsb2NhbGUpO1xufVxuXG4vLyAqKiogU3RhcnQgb2YgKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mRGF5KGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mV2VlayhkYXRlLCBsb2NhbGUsIGNhbGVuZGFyU3RhcnREYXkpIHtcbiAgbGV0IGxvY2FsZU9iaiA9IGxvY2FsZVxuICAgID8gZ2V0TG9jYWxlT2JqZWN0KGxvY2FsZSlcbiAgICA6IGdldExvY2FsZU9iamVjdChnZXREZWZhdWx0TG9jYWxlKCkpO1xuICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwge1xuICAgIGxvY2FsZTogbG9jYWxlT2JqLFxuICAgIHdlZWtTdGFydHNPbjogY2FsZW5kYXJTdGFydERheSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mTW9udGgoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZk1vbnRoKGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRPZlllYXIoZGF0ZSkge1xuICByZXR1cm4gc3RhcnRPZlllYXIoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydE9mUXVhcnRlcihkYXRlKSB7XG4gIHJldHVybiBzdGFydE9mUXVhcnRlcihkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0T2ZUb2RheSgpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZEYXkobmV3RGF0ZSgpKTtcbn1cblxuLy8gKioqIEVuZCBvZiAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZE9mV2VlayhkYXRlKSB7XG4gIHJldHVybiBlbmRPZldlZWsoZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRPZk1vbnRoKGRhdGUpIHtcbiAgcmV0dXJuIGVuZE9mTW9udGgoZGF0ZSk7XG59XG5cbi8vICoqIERhdGUgTWF0aCAqKlxuXG4vLyAqKiogQWRkaXRpb24gKioqXG5cbmV4cG9ydCB7XG4gIGFkZFNlY29uZHMsXG4gIGFkZE1pbnV0ZXMsXG4gIGFkZERheXMsXG4gIGFkZFdlZWtzLFxuICBhZGRNb250aHMsXG4gIGFkZFF1YXJ0ZXJzLFxuICBhZGRZZWFycyxcbn07XG5cbi8vICoqKiBTdWJ0cmFjdGlvbiAqKipcblxuZXhwb3J0IHsgYWRkSG91cnMsIHN1YkRheXMsIHN1YldlZWtzLCBzdWJNb250aHMsIHN1YlF1YXJ0ZXJzLCBzdWJZZWFycyB9O1xuXG4vLyAqKiBEYXRlIENvbXBhcmlzb24gKipcblxuZXhwb3J0IHsgaXNCZWZvcmUsIGlzQWZ0ZXIgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVllYXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lTW9udGgoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZU1vbnRoKGRhdGUxLCBkYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICFkYXRlMSAmJiAhZGF0ZTI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSAmJiBkYXRlMikge1xuICAgIHJldHVybiBkZklzU2FtZVF1YXJ0ZXIoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gZGZJc1NhbWVEYXkoZGF0ZTEsIGRhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gIWRhdGUxICYmICFkYXRlMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgcmV0dXJuIGRmSXNFcXVhbChkYXRlMSwgZGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhZGF0ZTEgJiYgIWRhdGUyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RheUluUmFuZ2UoZGF5LCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgbGV0IHZhbGlkO1xuICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZEYXkoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kID0gZW5kT2ZEYXkoZW5kRGF0ZSk7XG5cbiAgdHJ5IHtcbiAgICB2YWxpZCA9IGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHZhbGlkID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufVxuXG4vLyAqKiogRGlmZmluZyAqKipcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheXNEaWZmKGRhdGUxLCBkYXRlMikge1xuICByZXR1cm4gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUxLCBkYXRlMik7XG59XG5cbi8vICoqIERhdGUgTG9jYWxpemF0aW9uICoqXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckxvY2FsZShsb2NhbGVOYW1lLCBsb2NhbGVEYXRhKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgaWYgKCFzY29wZS5fX2xvY2FsZURhdGFfXykge1xuICAgIHNjb3BlLl9fbG9jYWxlRGF0YV9fID0ge307XG4gIH1cbiAgc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlTmFtZV0gPSBsb2NhbGVEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdExvY2FsZShsb2NhbGVOYW1lKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgc2NvcGUuX19sb2NhbGVJZF9fID0gbG9jYWxlTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRMb2NhbGUoKSB7XG4gIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG5cbiAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlSWRfXztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsZU9iamVjdChsb2NhbGVTcGVjKSB7XG4gIGlmICh0eXBlb2YgbG9jYWxlU3BlYyA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgbG9jYWxlIG5hbWUgcmVnaXN0ZXJlZCBieSByZWdpc3RlckxvY2FsZVxuICAgIGNvbnN0IHNjb3BlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbFRoaXM7XG4gICAgcmV0dXJuIHNjb3BlLl9fbG9jYWxlRGF0YV9fID8gc2NvcGUuX19sb2NhbGVEYXRhX19bbG9jYWxlU3BlY10gOiBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIFRyZWF0IGl0IGFzIGEgcmF3IGRhdGUtZm5zIGxvY2FsZSBvYmplY3RcbiAgICByZXR1cm4gbG9jYWxlU3BlYztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRhdGUsIGZvcm1hdEZ1bmMsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RnVuYyhmb3JtYXREYXRlKGRhdGUsIFwiRUVFRVwiLCBsb2NhbGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlNaW5JbkxvY2FsZShkYXRlLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgXCJFRUVFRUVcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRhdGUsIGxvY2FsZSkge1xuICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBcIkVFRVwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9udGhJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTExcIiwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vbnRoU2hvcnRJbkxvY2FsZShtb250aCwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldE1vbnRoKG5ld0RhdGUoKSwgbW9udGgpLCBcIkxMTFwiLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVhcnRlclNob3J0SW5Mb2NhbGUocXVhcnRlciwgbG9jYWxlKSB7XG4gIHJldHVybiBmb3JtYXREYXRlKHNldFF1YXJ0ZXIobmV3RGF0ZSgpLCBxdWFydGVyKSwgXCJRUVFcIiwgbG9jYWxlKTtcbn1cblxuLy8gKiogVXRpbHMgZm9yIHNvbWUgY29tcG9uZW50cyAqKlxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXlEaXNhYmxlZChcbiAgZGF5LFxuICB7XG4gICAgbWluRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICBleGNsdWRlRGF0ZUludGVydmFscyxcbiAgICBpbmNsdWRlRGF0ZXMsXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHMsXG4gICAgZmlsdGVyRGF0ZSxcbiAgfSA9IHt9LFxuKSB7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXksIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChleGNsdWRlRGF0ZUludGVydmFscyAmJlxuICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZURheShkYXksIGluY2x1ZGVEYXRlKSkpIHx8XG4gICAgKGluY2x1ZGVEYXRlSW50ZXJ2YWxzICYmXG4gICAgICAhaW5jbHVkZURhdGVJbnRlcnZhbHMuc29tZSgoeyBzdGFydCwgZW5kIH0pID0+XG4gICAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgICApKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUoZGF5KSkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF5RXhjbHVkZWQoXG4gIGRheSxcbiAgeyBleGNsdWRlRGF0ZXMsIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIH0gPSB7fSxcbikge1xuICBpZiAoZXhjbHVkZURhdGVJbnRlcnZhbHMgJiYgZXhjbHVkZURhdGVJbnRlcnZhbHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBleGNsdWRlRGF0ZUludGVydmFscy5zb21lKCh7IHN0YXJ0LCBlbmQgfSkgPT5cbiAgICAgIGlzV2l0aGluSW50ZXJ2YWwoZGF5LCB7IHN0YXJ0LCBlbmQgfSksXG4gICAgKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheSwgZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoRGlzYWJsZWQoXG4gIG1vbnRoLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICByZXR1cm4gKFxuICAgIGlzT3V0T2ZCb3VuZHMobW9udGgsIHtcbiAgICAgIG1pbkRhdGU6IHN0YXJ0T2ZNb250aChtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mTW9udGgobWF4RGF0ZSksXG4gICAgfSkgfHxcbiAgICAoZXhjbHVkZURhdGVzICYmXG4gICAgICBleGNsdWRlRGF0ZXMuc29tZSgoZXhjbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZU1vbnRoKG1vbnRoLCBpbmNsdWRlRGF0ZSkpKSB8fFxuICAgIChmaWx0ZXJEYXRlICYmICFmaWx0ZXJEYXRlKG5ld0RhdGUobW9udGgpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb250aEluUmFuZ2Uoc3RhcnREYXRlLCBlbmREYXRlLCBtLCBkYXkpIHtcbiAgY29uc3Qgc3RhcnREYXRlWWVhciA9IGdldFllYXIoc3RhcnREYXRlKTtcbiAgY29uc3Qgc3RhcnREYXRlTW9udGggPSBnZXRNb250aChzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVNb250aCA9IGdldE1vbnRoKGVuZERhdGUpO1xuICBjb25zdCBkYXlZZWFyID0gZ2V0WWVhcihkYXkpO1xuICBpZiAoc3RhcnREYXRlWWVhciA9PT0gZW5kRGF0ZVllYXIgJiYgc3RhcnREYXRlWWVhciA9PT0gZGF5WWVhcikge1xuICAgIHJldHVybiBzdGFydERhdGVNb250aCA8PSBtICYmIG0gPD0gZW5kRGF0ZU1vbnRoO1xuICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZVllYXIgPCBlbmREYXRlWWVhcikge1xuICAgIHJldHVybiAoXG4gICAgICAoZGF5WWVhciA9PT0gc3RhcnREYXRlWWVhciAmJiBzdGFydERhdGVNb250aCA8PSBtKSB8fFxuICAgICAgKGRheVllYXIgPT09IGVuZERhdGVZZWFyICYmIGVuZERhdGVNb250aCA+PSBtKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1YXJ0ZXJEaXNhYmxlZChcbiAgcXVhcnRlcixcbiAgeyBtaW5EYXRlLCBtYXhEYXRlLCBleGNsdWRlRGF0ZXMsIGluY2x1ZGVEYXRlcywgZmlsdGVyRGF0ZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBpc091dE9mQm91bmRzKHF1YXJ0ZXIsIHsgbWluRGF0ZSwgbWF4RGF0ZSB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT5cbiAgICAgICAgaXNTYW1lUXVhcnRlcihxdWFydGVyLCBleGNsdWRlRGF0ZSksXG4gICAgICApKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+XG4gICAgICAgIGlzU2FtZVF1YXJ0ZXIocXVhcnRlciwgaW5jbHVkZURhdGUpLFxuICAgICAgKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKHF1YXJ0ZXIpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyXG4gKiBAcGFyYW0ge0RhdGV9IHN0YXJ0XG4gKiBAcGFyYW0ge0RhdGV9IGVuZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJJblJhbmdlKHllYXIsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFpc1ZhbGlkRGF0ZShzdGFydCkgfHwgIWlzVmFsaWREYXRlKGVuZCkpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc3RhcnRZZWFyID0gZ2V0WWVhcihzdGFydCk7XG4gIGNvbnN0IGVuZFllYXIgPSBnZXRZZWFyKGVuZCk7XG5cbiAgcmV0dXJuIHN0YXJ0WWVhciA8PSB5ZWFyICYmIGVuZFllYXIgPj0geWVhcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzWWVhckRpc2FibGVkKFxuICB5ZWFyLFxuICB7IG1pbkRhdGUsIG1heERhdGUsIGV4Y2x1ZGVEYXRlcywgaW5jbHVkZURhdGVzLCBmaWx0ZXJEYXRlIH0gPSB7fSxcbikge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoeWVhciwgMCwgMSk7XG4gIHJldHVybiAoXG4gICAgaXNPdXRPZkJvdW5kcyhkYXRlLCB7XG4gICAgICBtaW5EYXRlOiBzdGFydE9mWWVhcihtaW5EYXRlKSxcbiAgICAgIG1heERhdGU6IGVuZE9mWWVhcihtYXhEYXRlKSxcbiAgICB9KSB8fFxuICAgIChleGNsdWRlRGF0ZXMgJiZcbiAgICAgIGV4Y2x1ZGVEYXRlcy5zb21lKChleGNsdWRlRGF0ZSkgPT4gaXNTYW1lWWVhcihkYXRlLCBleGNsdWRlRGF0ZSkpKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgICFpbmNsdWRlRGF0ZXMuc29tZSgoaW5jbHVkZURhdGUpID0+IGlzU2FtZVllYXIoZGF0ZSwgaW5jbHVkZURhdGUpKSkgfHxcbiAgICAoZmlsdGVyRGF0ZSAmJiAhZmlsdGVyRGF0ZShuZXdEYXRlKGRhdGUpKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIGVuZERhdGUsIHEsIGRheSkge1xuICBjb25zdCBzdGFydERhdGVZZWFyID0gZ2V0WWVhcihzdGFydERhdGUpO1xuICBjb25zdCBzdGFydERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihzdGFydERhdGUpO1xuICBjb25zdCBlbmREYXRlWWVhciA9IGdldFllYXIoZW5kRGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVRdWFydGVyID0gZ2V0UXVhcnRlcihlbmREYXRlKTtcbiAgY29uc3QgZGF5WWVhciA9IGdldFllYXIoZGF5KTtcbiAgaWYgKHN0YXJ0RGF0ZVllYXIgPT09IGVuZERhdGVZZWFyICYmIHN0YXJ0RGF0ZVllYXIgPT09IGRheVllYXIpIHtcbiAgICByZXR1cm4gc3RhcnREYXRlUXVhcnRlciA8PSBxICYmIHEgPD0gZW5kRGF0ZVF1YXJ0ZXI7XG4gIH0gZWxzZSBpZiAoc3RhcnREYXRlWWVhciA8IGVuZERhdGVZZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXlZZWFyID09PSBzdGFydERhdGVZZWFyICYmIHN0YXJ0RGF0ZVF1YXJ0ZXIgPD0gcSkgfHxcbiAgICAgIChkYXlZZWFyID09PSBlbmREYXRlWWVhciAmJiBlbmREYXRlUXVhcnRlciA+PSBxKSB8fFxuICAgICAgKGRheVllYXIgPCBlbmREYXRlWWVhciAmJiBkYXlZZWFyID4gc3RhcnREYXRlWWVhcilcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc091dE9mQm91bmRzKGRheSwgeyBtaW5EYXRlLCBtYXhEYXRlIH0gPSB7fSkge1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXksIG1pbkRhdGUpIDwgMCkgfHxcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF5LCBtYXhEYXRlKSA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkxpc3QodGltZSwgdGltZXMpIHtcbiAgcmV0dXJuIHRpbWVzLnNvbWUoXG4gICAgKGxpc3RUaW1lKSA9PlxuICAgICAgZ2V0SG91cnMobGlzdFRpbWUpID09PSBnZXRIb3Vycyh0aW1lKSAmJlxuICAgICAgZ2V0TWludXRlcyhsaXN0VGltZSkgPT09IGdldE1pbnV0ZXModGltZSksXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVEaXNhYmxlZChcbiAgdGltZSxcbiAgeyBleGNsdWRlVGltZXMsIGluY2x1ZGVUaW1lcywgZmlsdGVyVGltZSB9ID0ge30sXG4pIHtcbiAgcmV0dXJuIChcbiAgICAoZXhjbHVkZVRpbWVzICYmIGlzVGltZUluTGlzdCh0aW1lLCBleGNsdWRlVGltZXMpKSB8fFxuICAgIChpbmNsdWRlVGltZXMgJiYgIWlzVGltZUluTGlzdCh0aW1lLCBpbmNsdWRlVGltZXMpKSB8fFxuICAgIChmaWx0ZXJUaW1lICYmICFmaWx0ZXJUaW1lKHRpbWUpKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWVJbkRpc2FibGVkUmFuZ2UodGltZSwgeyBtaW5UaW1lLCBtYXhUaW1lIH0pIHtcbiAgaWYgKCFtaW5UaW1lIHx8ICFtYXhUaW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQm90aCBtaW5UaW1lIGFuZCBtYXhUaW1lIHByb3BzIHJlcXVpcmVkXCIpO1xuICB9XG4gIGNvbnN0IGJhc2UgPSBuZXdEYXRlKCk7XG4gIGNvbnN0IGJhc2VUaW1lID0gc2V0SG91cnMoc2V0TWludXRlcyhiYXNlLCBnZXRNaW51dGVzKHRpbWUpKSwgZ2V0SG91cnModGltZSkpO1xuICBjb25zdCBtaW4gPSBzZXRIb3VycyhcbiAgICBzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXMobWluVGltZSkpLFxuICAgIGdldEhvdXJzKG1pblRpbWUpLFxuICApO1xuICBjb25zdCBtYXggPSBzZXRIb3VycyhcbiAgICBzZXRNaW51dGVzKGJhc2UsIGdldE1pbnV0ZXMobWF4VGltZSkpLFxuICAgIGdldEhvdXJzKG1heFRpbWUpLFxuICApO1xuXG4gIGxldCB2YWxpZDtcbiAgdHJ5IHtcbiAgICB2YWxpZCA9ICFpc1dpdGhpbkludGVydmFsKGJhc2VUaW1lLCB7IHN0YXJ0OiBtaW4sIGVuZDogbWF4IH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vbnRoRGlzYWJsZWRCZWZvcmUoZGF5LCB7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9ID0ge30pIHtcbiAgY29uc3QgcHJldmlvdXNNb250aCA9IHN1Yk1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG1pbkRhdGUsIHByZXZpb3VzTW9udGgpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNNb250aCkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaXNhYmxlZEFmdGVyKGRheSwgeyBtYXhEYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IG5leHRNb250aCA9IGFkZE1vbnRocyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtYXhEYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKG5leHRNb250aCwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhuZXh0TW9udGgsIGluY2x1ZGVEYXRlKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWFydGVyRGlzYWJsZWRCZWZvcmUoZGF0ZSwgeyBtaW5EYXRlLCBpbmNsdWRlRGF0ZXMgfSA9IHt9KSB7XG4gIGNvbnN0IGZpcnN0RGF0ZU9mWWVhciA9IHN0YXJ0T2ZZZWFyKGRhdGUpO1xuICBjb25zdCBwcmV2aW91c1F1YXJ0ZXIgPSBzdWJRdWFydGVycyhmaXJzdERhdGVPZlllYXIsIDEpO1xuXG4gIHJldHVybiAoXG4gICAgKG1pbkRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhtaW5EYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCkgfHxcbiAgICAoaW5jbHVkZURhdGVzICYmXG4gICAgICBpbmNsdWRlRGF0ZXMuZXZlcnkoXG4gICAgICAgIChpbmNsdWRlRGF0ZSkgPT5cbiAgICAgICAgICBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKGluY2x1ZGVEYXRlLCBwcmV2aW91c1F1YXJ0ZXIpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YXJ0ZXJEaXNhYmxlZEFmdGVyKGRhdGUsIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBsYXN0RGF0ZU9mWWVhciA9IGVuZE9mWWVhcihkYXRlKTtcbiAgY29uc3QgbmV4dFF1YXJ0ZXIgPSBhZGRRdWFydGVycyhsYXN0RGF0ZU9mWWVhciwgMSk7XG5cbiAgcmV0dXJuIChcbiAgICAobWF4RGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzKG5leHRRdWFydGVyLCBtYXhEYXRlKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJRdWFydGVycyhuZXh0UXVhcnRlciwgaW5jbHVkZURhdGUpID4gMCxcbiAgICAgICkpIHx8XG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXJEaXNhYmxlZEJlZm9yZShkYXksIHsgbWluRGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c1llYXIgPSBzdWJZZWFycyhkYXksIDEpO1xuICByZXR1cm4gKFxuICAgIChtaW5EYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMobWluRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDApIHx8XG4gICAgKGluY2x1ZGVEYXRlcyAmJlxuICAgICAgaW5jbHVkZURhdGVzLmV2ZXJ5KFxuICAgICAgICAoaW5jbHVkZURhdGUpID0+XG4gICAgICAgICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhpbmNsdWRlRGF0ZSwgcHJldmlvdXNZZWFyKSA+IDAsXG4gICAgICApKSB8fFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyc0Rpc2FibGVkQmVmb3JlKFxuICBkYXksXG4gIHsgbWluRGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IHByZXZpb3VzWWVhciA9IGdldFN0YXJ0T2ZZZWFyKHN1YlllYXJzKGRheSwgeWVhckl0ZW1OdW1iZXIpKTtcbiAgY29uc3QgeyBlbmRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKHByZXZpb3VzWWVhciwgeWVhckl0ZW1OdW1iZXIpO1xuICBjb25zdCBtaW5EYXRlWWVhciA9IG1pbkRhdGUgJiYgZ2V0WWVhcihtaW5EYXRlKTtcbiAgcmV0dXJuIChtaW5EYXRlWWVhciAmJiBtaW5EYXRlWWVhciA+IGVuZFBlcmlvZCkgfHwgZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFyRGlzYWJsZWRBZnRlcihkYXksIHsgbWF4RGF0ZSwgaW5jbHVkZURhdGVzIH0gPSB7fSkge1xuICBjb25zdCBuZXh0WWVhciA9IGFkZFllYXJzKGRheSwgMSk7XG4gIHJldHVybiAoXG4gICAgKG1heERhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJZZWFycyhuZXh0WWVhciwgbWF4RGF0ZSkgPiAwKSB8fFxuICAgIChpbmNsdWRlRGF0ZXMgJiZcbiAgICAgIGluY2x1ZGVEYXRlcy5ldmVyeShcbiAgICAgICAgKGluY2x1ZGVEYXRlKSA9PiBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzKG5leHRZZWFyLCBpbmNsdWRlRGF0ZSkgPiAwLFxuICAgICAgKSkgfHxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhcnNEaXNhYmxlZEFmdGVyKFxuICBkYXksXG4gIHsgbWF4RGF0ZSwgeWVhckl0ZW1OdW1iZXIgPSBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIgfSA9IHt9LFxuKSB7XG4gIGNvbnN0IG5leHRZZWFyID0gYWRkWWVhcnMoZGF5LCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IHsgc3RhcnRQZXJpb2QgfSA9IGdldFllYXJzUGVyaW9kKG5leHRZZWFyLCB5ZWFySXRlbU51bWJlcik7XG4gIGNvbnN0IG1heERhdGVZZWFyID0gbWF4RGF0ZSAmJiBnZXRZZWFyKG1heERhdGUpO1xuICByZXR1cm4gKG1heERhdGVZZWFyICYmIG1heERhdGVZZWFyIDwgc3RhcnRQZXJpb2QpIHx8IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWluRGF0ZSh7IG1pbkRhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWluRGF0ZSkge1xuICAgIGxldCBtaW5EYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWluRGF0ZSkgPj0gMCxcbiAgICApO1xuICAgIHJldHVybiBtaW4obWluRGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtaW4oaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWluRGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0aXZlTWF4RGF0ZSh7IG1heERhdGUsIGluY2x1ZGVEYXRlcyB9KSB7XG4gIGlmIChpbmNsdWRlRGF0ZXMgJiYgbWF4RGF0ZSkge1xuICAgIGxldCBtYXhEYXRlcyA9IGluY2x1ZGVEYXRlcy5maWx0ZXIoXG4gICAgICAoaW5jbHVkZURhdGUpID0+IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhpbmNsdWRlRGF0ZSwgbWF4RGF0ZSkgPD0gMCxcbiAgICApO1xuICAgIHJldHVybiBtYXgobWF4RGF0ZXMpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGVEYXRlcykge1xuICAgIHJldHVybiBtYXgoaW5jbHVkZURhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWF4RGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGlnaHRMaWdodERheXNNYXAoXG4gIGhpZ2hsaWdodERhdGVzID0gW10sXG4gIGRlZmF1bHRDbGFzc05hbWUgPSBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taGlnaGxpZ2h0ZWRcIixcbikge1xuICBjb25zdCBkYXRlQ2xhc3NlcyA9IG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhpZ2hsaWdodERhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgb2JqID0gaGlnaGxpZ2h0RGF0ZXNbaV07XG4gICAgaWYgKGlzRGF0ZShvYmopKSB7XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKG9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lc0FyciA9IGRhdGVDbGFzc2VzLmdldChrZXkpIHx8IFtdO1xuICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGRlZmF1bHRDbGFzc05hbWUpKSB7XG4gICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChkZWZhdWx0Q2xhc3NOYW1lKTtcbiAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGtleXNbMF07XG4gICAgICBjb25zdCBhcnJPZkRhdGVzID0gb2JqW2tleXNbMF1dO1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgYXJyT2ZEYXRlcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbiA9IGFyck9mRGF0ZXMubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBmb3JtYXREYXRlKGFyck9mRGF0ZXNba10sIFwiTU0uZGQueXl5eVwiKTtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzQXJyID0gZGF0ZUNsYXNzZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgICAgaWYgKCFjbGFzc05hbWVzQXJyLmluY2x1ZGVzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXNBcnIucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgICAgZGF0ZUNsYXNzZXMuc2V0KGtleSwgY2xhc3NOYW1lc0Fycik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlQ2xhc3Nlcztcbn1cblxuLyoqXG4gKiBDb21wYXJlIHRoZSB0d28gYXJyYXlzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTFcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MlxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUsIGlmIHRoZSBwYXNzZWQgYXJyYXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0FyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSB7XG4gIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5MS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gYXJyYXkyW2luZGV4XSk7XG59XG5cbi8qKlxuICogQXNzaWduIHRoZSBjdXN0b20gY2xhc3MgdG8gZWFjaCBkYXRlXG4gKiBAcGFyYW0ge0FycmF5fSBob2xpZGF5RGF0ZXMgYXJyYXkgb2Ygb2JqZWN0IGNvbnRhaW5pbmcgZGF0ZSBhbmQgbmFtZSBvZiB0aGUgaG9saWRheVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzbmFtZSB0byBiZSBhZGRlZC5cbiAqIEByZXR1cm5zIHtNYXB9IE1hcCBjb250YWluaW5nIGRhdGUgYXMga2V5IGFuZCBhcnJheSBvZiBjbGFzc25hbWUgYW5kIGhvbGlkYXkgbmFtZSBhcyB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9saWRheXNNYXAoXG4gIGhvbGlkYXlEYXRlcyA9IFtdLFxuICBkZWZhdWx0Q2xhc3NOYW1lID0gXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhvbGlkYXlzXCIsXG4pIHtcbiAgY29uc3QgZGF0ZUNsYXNzZXMgPSBuZXcgTWFwKCk7XG4gIGhvbGlkYXlEYXRlcy5mb3JFYWNoKChob2xpZGF5KSA9PiB7XG4gICAgY29uc3QgeyBkYXRlOiBkYXRlT2JqLCBob2xpZGF5TmFtZSB9ID0gaG9saWRheTtcbiAgICBpZiAoIWlzRGF0ZShkYXRlT2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGZvcm1hdERhdGUoZGF0ZU9iaiwgXCJNTS5kZC55eXl5XCIpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXNPYmogPSBkYXRlQ2xhc3Nlcy5nZXQoa2V5KSB8fCB7fTtcbiAgICBpZiAoXG4gICAgICBcImNsYXNzTmFtZVwiIGluIGNsYXNzTmFtZXNPYmogJiZcbiAgICAgIGNsYXNzTmFtZXNPYmpbXCJjbGFzc05hbWVcIl0gPT09IGRlZmF1bHRDbGFzc05hbWUgJiZcbiAgICAgIGFycmF5c0FyZUVxdWFsKGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0sIFtob2xpZGF5TmFtZV0pXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lc09ialtcImNsYXNzTmFtZVwiXSA9IGRlZmF1bHRDbGFzc05hbWU7XG4gICAgY29uc3QgaG9saWRheU5hbWVBcnIgPSBjbGFzc05hbWVzT2JqW1wiaG9saWRheU5hbWVzXCJdO1xuICAgIGNsYXNzTmFtZXNPYmpbXCJob2xpZGF5TmFtZXNcIl0gPSBob2xpZGF5TmFtZUFyclxuICAgICAgPyBbLi4uaG9saWRheU5hbWVBcnIsIGhvbGlkYXlOYW1lXVxuICAgICAgOiBbaG9saWRheU5hbWVdO1xuICAgIGRhdGVDbGFzc2VzLnNldChrZXksIGNsYXNzTmFtZXNPYmopO1xuICB9KTtcbiAgcmV0dXJuIGRhdGVDbGFzc2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXNUb0luamVjdEFmdGVyKFxuICBzdGFydE9mRGF5LFxuICBjdXJyZW50VGltZSxcbiAgY3VycmVudE11bHRpcGxpZXIsXG4gIGludGVydmFscyxcbiAgaW5qZWN0ZWRUaW1lcyxcbikge1xuICBjb25zdCBsID0gaW5qZWN0ZWRUaW1lcy5sZW5ndGg7XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IGluamVjdGVkVGltZSA9IHN0YXJ0T2ZEYXk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkSG91cnMoaW5qZWN0ZWRUaW1lLCBnZXRIb3VycyhpbmplY3RlZFRpbWVzW2ldKSk7XG4gICAgaW5qZWN0ZWRUaW1lID0gYWRkTWludXRlcyhpbmplY3RlZFRpbWUsIGdldE1pbnV0ZXMoaW5qZWN0ZWRUaW1lc1tpXSkpO1xuICAgIGluamVjdGVkVGltZSA9IGFkZFNlY29uZHMoaW5qZWN0ZWRUaW1lLCBnZXRTZWNvbmRzKGluamVjdGVkVGltZXNbaV0pKTtcblxuICAgIGNvbnN0IG5leHRUaW1lID0gYWRkTWludXRlcyhcbiAgICAgIHN0YXJ0T2ZEYXksXG4gICAgICAoY3VycmVudE11bHRpcGxpZXIgKyAxKSAqIGludGVydmFscyxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgaXNBZnRlcihpbmplY3RlZFRpbWUsIGN1cnJlbnRUaW1lKSAmJlxuICAgICAgaXNCZWZvcmUoaW5qZWN0ZWRUaW1lLCBuZXh0VGltZSlcbiAgICApIHtcbiAgICAgIHRpbWVzLnB1c2goaW5qZWN0ZWRUaW1lc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRpbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWmVybyhpKSB7XG4gIHJldHVybiBpIDwgMTAgPyBgMCR7aX1gIDogYCR7aX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WWVhcnNQZXJpb2QoXG4gIGRhdGUsXG4gIHllYXJJdGVtTnVtYmVyID0gREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuKSB7XG4gIGNvbnN0IGVuZFBlcmlvZCA9IE1hdGguY2VpbChnZXRZZWFyKGRhdGUpIC8geWVhckl0ZW1OdW1iZXIpICogeWVhckl0ZW1OdW1iZXI7XG4gIGNvbnN0IHN0YXJ0UGVyaW9kID0gZW5kUGVyaW9kIC0gKHllYXJJdGVtTnVtYmVyIC0gMSk7XG4gIHJldHVybiB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJzSW5EYXkoZCkge1xuICBjb25zdCBzdGFydE9mRGF5ID0gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKTtcbiAgY29uc3Qgc3RhcnRPZlRoZU5leHREYXkgPSBuZXcgRGF0ZShcbiAgICBkLmdldEZ1bGxZZWFyKCksXG4gICAgZC5nZXRNb250aCgpLFxuICAgIGQuZ2V0RGF0ZSgpLFxuICAgIDI0LFxuICApO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKCgrc3RhcnRPZlRoZU5leHREYXkgLSArc3RhcnRPZkRheSkgLyAzXzYwMF8wMDApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIHRoZSBtaW51dGUgZm9yIHRoZSBnaXZlbiBkYXRlXG4gKlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBpcyBhIERTVCBhbmQgdGltZXpvbmUtc2FmZSBhbmFsb2cgb2YgYGRhdGUtZm5zL3N0YXJ0T2ZNaW51dGVgXG4gKiBkbyBub3QgbWFrZSBjaGFuZ2VzIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1xuICpcbiAqIFNlZSBjb21tZW50cyBvbiBodHRwczovL2dpdGh1Yi5jb20vSGFja2VyMHgwMS9yZWFjdC1kYXRlcGlja2VyL3B1bGwvNDI0NFxuICogZm9yIG1vcmUgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gc3RhcnQgb2YgdGhlIG1pbnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZk1pbnV0ZShkKSB7XG4gIGNvbnN0IHNlY29uZHMgPSBkLmdldFNlY29uZHMoKTtcbiAgY29uc3QgbWlsbGlzZWNvbmRzID0gZC5nZXRNaWxsaXNlY29uZHMoKTtcblxuICByZXR1cm4gdG9EYXRlKGQuZ2V0VGltZSgpIC0gc2Vjb25kcyAqIDEwMDAgLSBtaWxsaXNlY29uZHMpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIG1pbnV0ZVxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYSBEU1QgYW5kIHRpbWV6b25lLXNhZmUgYW5hbG9nIG9mIGBkYXRlLWZucy9pc1NhbWVNaW51dGVgXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkMVxuICogQHBhcmFtIHtEYXRlfSBkMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNaW51dGUoZDEsIGQyKSB7XG4gIHJldHVybiBzdGFydE9mTWludXRlKGQxKS5nZXRUaW1lKCkgPT09IHN0YXJ0T2ZNaW51dGUoZDIpLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmVkIGRhdGUgd2l0aCBtaWRuaWdodCB0aW1lICgwMDowMDowMClcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgZm9yIHdoaWNoIG1pZG5pZ2h0IHRpbWUgaXMgcmVxdWlyZWRcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtEYXRlfSBBIG5ldyBkYXRldGltZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBkYXRlIHdpdGggbWlkbmlnaHQgdGltZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlkbmlnaHREYXRlKGRhdGUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGVcIik7XG4gIH1cblxuICBjb25zdCBkYXRlV2l0aG91dFRpbWUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgZGF0ZVdpdGhvdXRUaW1lLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZVdpdGhvdXRUaW1lO1xufVxuXG4vKipcbiAqIElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgVGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ29tcGFyZSBUaGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUaGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKlxuICogTm90ZTpcbiAqICBUaGlzIGZ1bmN0aW9uIGNvbnNpZGVycyB0aGUgbWlkLW5pZ2h0IG9mIHRoZSBnaXZlbiBkYXRlcyBmb3IgY29tcGFyaXNvbi5cbiAqICBJdCBldmFsdWF0ZXMgd2hldGhlciBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlIGJhc2VkIG9uIHRoZWlyIG1pZC1uaWdodCB0aW1lc3RhbXBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlQmVmb3JlKGRhdGUsIGRhdGVUb0NvbXBhcmUpIHtcbiAgaWYgKCFpc0RhdGUoZGF0ZSkgfHwgIWlzRGF0ZShkYXRlVG9Db21wYXJlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSByZWNlaXZlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IG1pZG5pZ2h0RGF0ZSA9IGdldE1pZG5pZ2h0RGF0ZShkYXRlKTtcbiAgY29uc3QgbWlkbmlnaHREYXRlVG9Db21wYXJlID0gZ2V0TWlkbmlnaHREYXRlKGRhdGVUb0NvbXBhcmUpO1xuXG4gIHJldHVybiBpc0JlZm9yZShtaWRuaWdodERhdGUsIG1pZG5pZ2h0RGF0ZVRvQ29tcGFyZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NwYWNlS2V5RG93bihldmVudCkge1xuICBjb25zdCBTUEFDRV9LRVkgPSBcIiBcIjtcbiAgcmV0dXJuIGV2ZW50LmtleSA9PT0gU1BBQ0VfS0VZO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVllYXJzKHllYXIsIG5vT2ZZZWFyLCBtaW5EYXRlLCBtYXhEYXRlKSB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogbm9PZlllYXIgKyAxOyBpKyspIHtcbiAgICBjb25zdCBuZXdZZWFyID0geWVhciArIG5vT2ZZZWFyIC0gaTtcbiAgICBsZXQgaXNJblJhbmdlID0gdHJ1ZTtcblxuICAgIGlmIChtaW5EYXRlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1pbkRhdGUpIDw9IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGUgJiYgaXNJblJhbmdlKSB7XG4gICAgICBpc0luUmFuZ2UgPSBnZXRZZWFyKG1heERhdGUpID49IG5ld1llYXI7XG4gICAgfVxuXG4gICAgaWYgKGlzSW5SYW5nZSkge1xuICAgICAgbGlzdC5wdXNoKG5ld1llYXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IHllYXJEcm9wZG93bkl0ZW1OdW1iZXIsIHNjcm9sbGFibGVZZWFyRHJvcGRvd24gfSA9IHByb3BzO1xuICAgIGNvbnN0IG5vT2ZZZWFyID1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXIgfHwgKHNjcm9sbGFibGVZZWFyRHJvcGRvd24gPyAxMCA6IDUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHllYXJzTGlzdDogZ2VuZXJhdGVZZWFycyhcbiAgICAgICAgdGhpcy5wcm9wcy55ZWFyLFxuICAgICAgICBub09mWWVhcixcbiAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICB0aGlzLnByb3BzLm1heERhdGUsXG4gICAgICApLFxuICAgIH07XG4gICAgdGhpcy5kcm9wZG93blJlZiA9IGNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZHJvcGRvd25DdXJyZW50ID0gdGhpcy5kcm9wZG93blJlZi5jdXJyZW50O1xuXG4gICAgaWYgKGRyb3Bkb3duQ3VycmVudCkge1xuICAgICAgLy8gR2V0IGFycmF5IGZyb20gSFRNTENvbGxlY3Rpb25cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ3VycmVudENoaWxkcmVuID0gZHJvcGRvd25DdXJyZW50LmNoaWxkcmVuXG4gICAgICAgID8gQXJyYXkuZnJvbShkcm9wZG93bkN1cnJlbnQuY2hpbGRyZW4pXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkWWVhck9wdGlvbkVsID0gZHJvcGRvd25DdXJyZW50Q2hpbGRyZW5cbiAgICAgICAgPyBkcm9wZG93bkN1cnJlbnRDaGlsZHJlbi5maW5kKChjaGlsZEVsKSA9PiBjaGlsZEVsLmFyaWFTZWxlY3RlZClcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBkcm9wZG93bkN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWRZZWFyT3B0aW9uRWxcbiAgICAgICAgPyBzZWxlY3RlZFllYXJPcHRpb25FbC5vZmZzZXRUb3AgK1xuICAgICAgICAgIChzZWxlY3RlZFllYXJPcHRpb25FbC5jbGllbnRIZWlnaHQgLSBkcm9wZG93bkN1cnJlbnQuY2xpZW50SGVpZ2h0KSAvIDJcbiAgICAgICAgOiAoZHJvcGRvd25DdXJyZW50LnNjcm9sbEhlaWdodCAtIGRyb3Bkb3duQ3VycmVudC5jbGllbnRIZWlnaHQpIC8gMjtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IHRoaXMucHJvcHMueWVhcjtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5zdGF0ZS55ZWFyc0xpc3QubWFwKCh5ZWFyKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgc2VsZWN0ZWRZZWFyID09PSB5ZWFyXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24gcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkX3llYXJcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItb3B0aW9uXCJcbiAgICAgICAgfVxuICAgICAgICBrZXk9e3llYXJ9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCB5ZWFyKX1cbiAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWRZZWFyID09PSB5ZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICA+XG4gICAgICAgIHtzZWxlY3RlZFllYXIgPT09IHllYXIgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb24tLXNlbGVjdGVkXCI+4pyTPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKX1cbiAgICAgICAge3llYXJ9XG4gICAgICA8L2Rpdj5cbiAgICApKTtcblxuICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLnByb3BzLm1pbkRhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWluRGF0ZSkgOiBudWxsO1xuICAgIGNvbnN0IG1heFllYXIgPSB0aGlzLnByb3BzLm1heERhdGUgPyBnZXRZZWFyKHRoaXMucHJvcHMubWF4RGF0ZSkgOiBudWxsO1xuXG4gICAgaWYgKCFtYXhZZWFyIHx8ICF0aGlzLnN0YXRlLnllYXJzTGlzdC5maW5kKCh5ZWFyKSA9PiB5ZWFyID09PSBtYXhZZWFyKSkge1xuICAgICAgb3B0aW9ucy51bnNoaWZ0KFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1vcHRpb25cIlxuICAgICAgICAgIGtleT17XCJ1cGNvbWluZ1wifVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaW5jcmVtZW50WWVhcnN9XG4gICAgICAgID5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzIHJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXllYXJzLXVwY29taW5nXCIgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIW1pblllYXIgfHwgIXRoaXMuc3RhdGUueWVhcnNMaXN0LmZpbmQoKHllYXIpID0+IHllYXIgPT09IG1pblllYXIpKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLW9wdGlvblwiXG4gICAgICAgICAga2V5PXtcInByZXZpb3VzXCJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5kZWNyZW1lbnRZZWFyc31cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24gcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMgcmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0teWVhcnMtcHJldmlvdXNcIiAvPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgc2hpZnRZZWFycyA9IChhbW91bnQpID0+IHtcbiAgICBjb25zdCB5ZWFycyA9IHRoaXMuc3RhdGUueWVhcnNMaXN0Lm1hcChmdW5jdGlvbiAoeWVhcikge1xuICAgICAgcmV0dXJuIHllYXIgKyBhbW91bnQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHllYXJzTGlzdDogeWVhcnMsXG4gICAgfSk7XG4gIH07XG5cbiAgaW5jcmVtZW50WWVhcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRZZWFycygxKTtcbiAgfTtcblxuICBkZWNyZW1lbnRZZWFycyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5zaGlmdFllYXJzKC0xKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bixcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZHJvcGRvd25DbGFzc30gcmVmPXt0aGlzLmRyb3Bkb3duUmVmfT5cbiAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFllYXJEcm9wZG93bk9wdGlvbnMgZnJvbSBcIi4veWVhcl9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKFllYXJEcm9wZG93bk9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFkanVzdERhdGVPbkNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHllYXI6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5ZWFyRHJvcGRvd25JdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgbWluWWVhciA9IHRoaXMucHJvcHMubWluRGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5taW5EYXRlKSA6IDE5MDA7XG4gICAgY29uc3QgbWF4WWVhciA9IHRoaXMucHJvcHMubWF4RGF0ZSA/IGdldFllYXIodGhpcy5wcm9wcy5tYXhEYXRlKSA6IDIxMDA7XG5cbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IG1pblllYXI7IGkgPD0gbWF4WWVhcjsgaSsrKSB7XG4gICAgICBvcHRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17aX0+XG4gICAgICAgICAge2l9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKCkgPT4gKFxuICAgIDxzZWxlY3RcbiAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnllYXJ9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci1yZWFkLXZpZXdcIlxuICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKGV2ZW50KX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXJlYWQtdmlldy0tc2VsZWN0ZWQteWVhclwiPlxuICAgICAgICB7dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJlbmRlckRyb3Bkb3duID0gKCkgPT4gKFxuICAgIDxXcmFwcGVkWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgeWVhcj17dGhpcy5wcm9wcy55ZWFyfVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlclNjcm9sbE1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkcm9wZG93blZpc2libGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHJlc3VsdCA9IFt0aGlzLnJlbmRlclJlYWRWaWV3KCFkcm9wZG93blZpc2libGUpXTtcbiAgICBpZiAoZHJvcGRvd25WaXNpYmxlKSB7XG4gICAgICByZXN1bHQudW5zaGlmdCh0aGlzLnJlbmRlckRyb3Bkb3duKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKHllYXIpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgaWYgKHllYXIgPT09IHRoaXMucHJvcHMueWVhcikgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoeWVhcik7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBkcm9wZG93blZpc2libGU6ICF0aGlzLnN0YXRlLmRyb3Bkb3duVmlzaWJsZSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZSh0aGlzLnByb3BzLmRhdGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSwgZXZlbnQpID0+IHtcbiAgICB0aGlzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB0aGlzLnNldE9wZW4oKTtcbiAgfTtcblxuICBvblNlbGVjdCA9IChkYXRlLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGUsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0T3BlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXRPcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLnNldE9wZW4odHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNlbGVjdE1vZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9feWVhci1kcm9wZG93bi1jb250YWluZXItLSR7dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9YH1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkRHJvcGRvd259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoRHJvcGRvd25PcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG1vbnRoTmFtZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBpc1NlbGVjdGVkTW9udGggPSAoaSkgPT4gdGhpcy5wcm9wcy5tb250aCA9PT0gaTtcblxuICByZW5kZXJPcHRpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1vbnRoTmFtZXMubWFwKChtb250aCwgaSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGkpXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uIHJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvbi0tc2VsZWN0ZWRfbW9udGhcIlxuICAgICAgICAgICAgOiBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLW9wdGlvblwiXG4gICAgICAgIH1cbiAgICAgICAga2V5PXttb250aH1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIGkpfVxuICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChpKSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5pc1NlbGVjdGVkTW9udGgoaSkgPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtb3B0aW9uLS1zZWxlY3RlZFwiPuKckzwvc3Bhbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBcIlwiXG4gICAgICAgICl9XG4gICAgICAgIHttb250aH1cbiAgICAgIDwvZGl2PlxuICAgICkpO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoKTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWRyb3Bkb3duXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBNb250aERyb3Bkb3duT3B0aW9ucyBmcm9tIFwiLi9tb250aF9kcm9wZG93bl9vcHRpb25zXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IFdyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyA9IG9uQ2xpY2tPdXRzaWRlKE1vbnRoRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhEcm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZHJvcGRvd25Nb2RlOiBQcm9wVHlwZXMub25lT2YoW1wic2Nyb2xsXCIsIFwic2VsZWN0XCJdKS5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb250aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcm9wZG93blZpc2libGU6IGZhbHNlLFxuICB9O1xuXG4gIHJlbmRlclNlbGVjdE9wdGlvbnMgPSAobW9udGhOYW1lcykgPT5cbiAgICBtb250aE5hbWVzLm1hcCgoTSwgaSkgPT4gKFxuICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtpfT5cbiAgICAgICAge019XG4gICAgICA8L29wdGlvbj5cbiAgICApKTtcblxuICByZW5kZXJTZWxlY3RNb2RlID0gKG1vbnRoTmFtZXMpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17dGhpcy5wcm9wcy5tb250aH1cbiAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgID5cbiAgICAgIHt0aGlzLnJlbmRlclNlbGVjdE9wdGlvbnMobW9udGhOYW1lcyl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSwgbW9udGhOYW1lcykgPT4gKFxuICAgIDxkaXZcbiAgICAgIGtleT1cInJlYWRcIlxuICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogdmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIiB9fVxuICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3XCJcbiAgICAgIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtcmVhZC12aWV3LS1kb3duLWFycm93XCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXJlYWQtdmlldy0tc2VsZWN0ZWQtbW9udGhcIj5cbiAgICAgICAge21vbnRoTmFtZXNbdGhpcy5wcm9wcy5tb250aF19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmVuZGVyRHJvcGRvd24gPSAobW9udGhOYW1lcykgPT4gKFxuICAgIDxXcmFwcGVkTW9udGhEcm9wZG93bk9wdGlvbnNcbiAgICAgIGtleT1cImRyb3Bkb3duXCJcbiAgICAgIG1vbnRoPXt0aGlzLnByb3BzLm1vbnRofVxuICAgICAgbW9udGhOYW1lcz17bW9udGhOYW1lc31cbiAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgb25DYW5jZWw9e3RoaXMudG9nZ2xlRHJvcGRvd259XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXJTY3JvbGxNb2RlID0gKG1vbnRoTmFtZXMpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSwgbW9udGhOYW1lcyldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24obW9udGhOYW1lcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gKG1vbnRoKSA9PiB7XG4gICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xuICAgIGlmIChtb250aCAhPT0gdGhpcy5wcm9wcy5tb250aCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShtb250aCk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZURyb3Bkb3duID0gKCkgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3Bkb3duVmlzaWJsZTogIXRoaXMuc3RhdGUuZHJvcGRvd25WaXNpYmxlLFxuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBtb250aE5hbWVzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV0ubWFwKFxuICAgICAgdGhpcy5wcm9wcy51c2VTaG9ydE1vbnRoSW5Ecm9wZG93blxuICAgICAgICA/IChNKSA9PiB1dGlscy5nZXRNb250aFNob3J0SW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpXG4gICAgICAgIDogKE0pID0+IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUoTSwgdGhpcy5wcm9wcy5sb2NhbGUpLFxuICAgICk7XG5cbiAgICBsZXQgcmVuZGVyZWREcm9wZG93bjtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZHJvcGRvd25Nb2RlKSB7XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgIHJlbmRlcmVkRHJvcGRvd24gPSB0aGlzLnJlbmRlclNjcm9sbE1vZGUobW9udGhOYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICByZW5kZXJlZERyb3Bkb3duID0gdGhpcy5yZW5kZXJTZWxlY3RNb2RlKG1vbnRoTmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC1kcm9wZG93bi1jb250YWluZXIgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtZHJvcGRvd24tY29udGFpbmVyLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICA+XG4gICAgICAgIHtyZW5kZXJlZERyb3Bkb3dufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGZvcm1hdERhdGUsXG4gIGdldFN0YXJ0T2ZNb250aCxcbiAgbmV3RGF0ZSxcbiAgaXNBZnRlcixcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIGdldFRpbWUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVNb250aFllYXJzKG1pbkRhdGUsIG1heERhdGUpIHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aChtaW5EYXRlKTtcbiAgY29uc3QgbGFzdERhdGUgPSBnZXRTdGFydE9mTW9udGgobWF4RGF0ZSk7XG5cbiAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICBsaXN0LnB1c2gobmV3RGF0ZShjdXJyRGF0ZSkpO1xuXG4gICAgY3VyckRhdGUgPSBhZGRNb250aHMoY3VyckRhdGUsIDEpO1xuICB9XG4gIHJldHVybiBsaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aFllYXJEcm9wZG93bk9wdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtb250aFllYXJzTGlzdDogZ2VuZXJhdGVNb250aFllYXJzKFxuICAgICAgICB0aGlzLnByb3BzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubW9udGhZZWFyc0xpc3QubWFwKChtb250aFllYXIpID0+IHtcbiAgICAgIGNvbnN0IG1vbnRoWWVhclBvaW50ID0gZ2V0VGltZShtb250aFllYXIpO1xuICAgICAgY29uc3QgaXNTYW1lTW9udGhZZWFyID1cbiAgICAgICAgaXNTYW1lWWVhcih0aGlzLnByb3BzLmRhdGUsIG1vbnRoWWVhcikgJiZcbiAgICAgICAgaXNTYW1lTW9udGgodGhpcy5wcm9wcy5kYXRlLCBtb250aFllYXIpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgIGlzU2FtZU1vbnRoWWVhclxuICAgICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkX21vbnRoLXllYXJcIlxuICAgICAgICAgICAgICA6IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb25cIlxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXk9e21vbnRoWWVhclBvaW50fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBtb250aFllYXJQb2ludCl9XG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTYW1lTW9udGhZZWFyID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNTYW1lTW9udGhZZWFyID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1vcHRpb24tLXNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgIOKck1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShtb250aFllYXIsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdGhpcy5wcm9wcy5sb2NhbGUpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKG1vbnRoWWVhcik7XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGRyb3Bkb3duQ2xhc3MgPSBjbHN4KHtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1kcm9wZG93blwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLS1zY3JvbGxhYmxlXCI6XG4gICAgICAgIHRoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzfT57dGhpcy5yZW5kZXJPcHRpb25zKCl9PC9kaXY+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgTW9udGhZZWFyRHJvcGRvd25PcHRpb25zIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25fb3B0aW9uc1wiO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gXCJyZWFjdC1vbmNsaWNrb3V0c2lkZVwiO1xuaW1wb3J0IHtcbiAgYWRkTW9udGhzLFxuICBmb3JtYXREYXRlLFxuICBnZXRTdGFydE9mTW9udGgsXG4gIGlzQWZ0ZXIsXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBuZXdEYXRlLFxuICBnZXRUaW1lLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbnZhciBXcmFwcGVkTW9udGhZZWFyRHJvcGRvd25PcHRpb25zID0gb25DbGlja091dHNpZGUoTW9udGhZZWFyRHJvcGRvd25PcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhZZWFyRHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJvcGRvd25WaXNpYmxlOiBmYWxzZSxcbiAgfTtcblxuICByZW5kZXJTZWxlY3RPcHRpb25zID0gKCkgPT4ge1xuICAgIGxldCBjdXJyRGF0ZSA9IGdldFN0YXJ0T2ZNb250aCh0aGlzLnByb3BzLm1pbkRhdGUpO1xuICAgIGNvbnN0IGxhc3REYXRlID0gZ2V0U3RhcnRPZk1vbnRoKHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgd2hpbGUgKCFpc0FmdGVyKGN1cnJEYXRlLCBsYXN0RGF0ZSkpIHtcbiAgICAgIGNvbnN0IHRpbWVQb2ludCA9IGdldFRpbWUoY3VyckRhdGUpO1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17dGltZVBvaW50fSB2YWx1ZT17dGltZVBvaW50fT5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZShjdXJyRGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICAgIDwvb3B0aW9uPixcbiAgICAgICk7XG5cbiAgICAgIGN1cnJEYXRlID0gYWRkTW9udGhzKGN1cnJEYXRlLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICBvblNlbGVjdENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgcmVuZGVyU2VsZWN0TW9kZSA9ICgpID0+IChcbiAgICA8c2VsZWN0XG4gICAgICB2YWx1ZT17Z2V0VGltZShnZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXRlKSl9XG4gICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXNlbGVjdFwiXG4gICAgICBvbkNoYW5nZT17dGhpcy5vblNlbGVjdENoYW5nZX1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJTZWxlY3RPcHRpb25zKCl9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG5cbiAgcmVuZGVyUmVhZFZpZXcgPSAodmlzaWJsZSkgPT4ge1xuICAgIGNvbnN0IHllYXJNb250aCA9IGZvcm1hdERhdGUoXG4gICAgICB0aGlzLnByb3BzLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLmRhdGVGb3JtYXQsXG4gICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PVwicmVhZFwiXG4gICAgICAgIHN0eWxlPXt7IHZpc2liaWxpdHk6IHZpc2libGUgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1yZWFkLXZpZXdcIlxuICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oZXZlbnQpfVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLXJlYWQtdmlldy0tZG93bi1hcnJvd1wiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXllYXItcmVhZC12aWV3LS1zZWxlY3RlZC1tb250aC15ZWFyXCI+XG4gICAgICAgICAge3llYXJNb250aH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEcm9wZG93biA9ICgpID0+IChcbiAgICA8V3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9uc1xuICAgICAga2V5PVwiZHJvcGRvd25cIlxuICAgICAgZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICBvbkNhbmNlbD17dGhpcy50b2dnbGVEcm9wZG93bn1cbiAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgIG1heERhdGU9e3RoaXMucHJvcHMubWF4RGF0ZX1cbiAgICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd259XG4gICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyU2Nyb2xsTW9kZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRyb3Bkb3duVmlzaWJsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcmVzdWx0ID0gW3RoaXMucmVuZGVyUmVhZFZpZXcoIWRyb3Bkb3duVmlzaWJsZSldO1xuICAgIGlmIChkcm9wZG93blZpc2libGUpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHRoaXMucmVuZGVyRHJvcGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAobW9udGhZZWFyUG9pbnQpID0+IHtcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICBjb25zdCBjaGFuZ2VkRGF0ZSA9IG5ld0RhdGUocGFyc2VJbnQobW9udGhZZWFyUG9pbnQpKTtcblxuICAgIGlmIChcbiAgICAgIGlzU2FtZVllYXIodGhpcy5wcm9wcy5kYXRlLCBjaGFuZ2VkRGF0ZSkgJiZcbiAgICAgIGlzU2FtZU1vbnRoKHRoaXMucHJvcHMuZGF0ZSwgY2hhbmdlZERhdGUpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjaGFuZ2VkRGF0ZSk7XG4gIH07XG5cbiAgdG9nZ2xlRHJvcGRvd24gPSAoKSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcGRvd25WaXNpYmxlOiAhdGhpcy5zdGF0ZS5kcm9wZG93blZpc2libGUsXG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByZW5kZXJlZERyb3Bkb3duO1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5kcm9wZG93bk1vZGUpIHtcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2Nyb2xsTW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgcmVuZGVyZWREcm9wZG93biA9IHRoaXMucmVuZGVyU2VsZWN0TW9kZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lciByZWFjdC1kYXRlcGlja2VyX19tb250aC15ZWFyLWRyb3Bkb3duLWNvbnRhaW5lci0tJHt0aGlzLnByb3BzLmRyb3Bkb3duTW9kZX1gfVxuICAgICAgPlxuICAgICAgICB7cmVuZGVyZWREcm9wZG93bn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IHtcbiAgZ2V0RGF5LFxuICBnZXRNb250aCxcbiAgZ2V0RGF0ZSxcbiAgbmV3RGF0ZSxcbiAgaXNTYW1lRGF5LFxuICBpc0RheURpc2FibGVkLFxuICBpc0RheUV4Y2x1ZGVkLFxuICBpc0RheUluUmFuZ2UsXG4gIGlzRXF1YWwsXG4gIGlzQmVmb3JlLFxuICBpc0FmdGVyLFxuICBnZXREYXlPZldlZWtDb2RlLFxuICBnZXRTdGFydE9mV2VlayxcbiAgZm9ybWF0RGF0ZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbk1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXNEYXkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzRGF5KHByZXZQcm9wcyk7XG4gIH1cblxuICBkYXlFbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMub25Nb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VFbnRlcihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCIgXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXkgPSBcIkVudGVyXCI7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9IChvdGhlcikgPT4gaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF5LCBvdGhlcik7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTZWxlY3RlZERhdGUgPSB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgPyB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+IHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpKVxuICAgICAgOiB0aGlzLmlzU2FtZURheU9yV2Vlayh0aGlzLnByb3BzLnNlbGVjdGVkKTtcblxuICAgIHJldHVybiAhaXNTZWxlY3RlZERhdGUgJiYgdGhpcy5pc1NhbWVEYXlPcldlZWsodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuICB9O1xuXG4gIGlzRGlzYWJsZWQgPSAoKSA9PiBpc0RheURpc2FibGVkKHRoaXMucHJvcHMuZGF5LCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKCkgPT4gaXNEYXlFeGNsdWRlZCh0aGlzLnByb3BzLmRheSwgdGhpcy5wcm9wcyk7XG5cbiAgaXNTdGFydE9mV2VlayA9ICgpID0+XG4gICAgaXNTYW1lRGF5KFxuICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lV2VlayA9IChvdGhlcikgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgaXNTYW1lRGF5KFxuICAgICAgb3RoZXIsXG4gICAgICBnZXRTdGFydE9mV2VlayhcbiAgICAgICAgdGhpcy5wcm9wcy5kYXksXG4gICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICApLFxuICAgICk7XG5cbiAgaXNTYW1lRGF5T3JXZWVrID0gKG90aGVyKSA9PiB0aGlzLmlzU2FtZURheShvdGhlcikgfHwgdGhpcy5pc1NhbWVXZWVrKG90aGVyKTtcblxuICBnZXRIaWdoTGlnaHRlZENsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBoaWdobGlnaHREYXRlcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaGlnaGxpZ2h0RGF0ZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBMb29raW5nIGZvciBjbGFzc05hbWUgaW4gdGhlIE1hcCBvZiB7J2RheSBzdHJpbmcsICdjbGFzc05hbWUnfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgcmV0dXJuIGhpZ2hsaWdodERhdGVzLmdldChkYXlTdHIpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJldHVybiB0aGUgYXJyYXkgY29udGFpbmluZyBjbGFzc25hbWUgYXNzb2NpYXRlZCB0byB0aGUgZGF0ZVxuICBnZXRIb2xpZGF5c0NsYXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhvbGlkYXlzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRheVN0ciA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgLy8gTG9va2luZyBmb3IgY2xhc3NOYW1lIGluIHRoZSBNYXAgb2Yge2RheSBzdHJpbmc6IHtjbGFzc05hbWUsIGhvbGlkYXlOYW1lfX1cbiAgICBpZiAoaG9saWRheXMuaGFzKGRheVN0cikpIHtcbiAgICAgIHJldHVybiBbaG9saWRheXMuZ2V0KGRheVN0cikuY2xhc3NOYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblJhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRheSxcbiAgICAgIHNlbGVjdHNTdGFydCxcbiAgICAgIHNlbGVjdHNFbmQsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8XG4gICAgICAhc2VsZWN0aW5nRGF0ZSB8fFxuICAgICAgKCFzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSAmJiB0aGlzLmlzRGlzYWJsZWQoKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzU3RhcnQgJiZcbiAgICAgIGVuZERhdGUgJiZcbiAgICAgIChpc0JlZm9yZShzZWxlY3RpbmdEYXRlLCBlbmREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHNlbGVjdGluZ0RhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHNlbGVjdHNFbmQgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgKGlzQWZ0ZXIoc2VsZWN0aW5nRGF0ZSwgc3RhcnREYXRlKSB8fCBpc0VxdWFsKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaXNEYXlJblJhbmdlKGRheSwgc3RhcnREYXRlLCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBzZWxlY3RzUmFuZ2UgJiZcbiAgICAgIHN0YXJ0RGF0ZSAmJlxuICAgICAgIWVuZERhdGUgJiZcbiAgICAgIChpc0FmdGVyKHNlbGVjdGluZ0RhdGUsIHN0YXJ0RGF0ZSkgfHwgaXNFcXVhbChzZWxlY3RpbmdEYXRlLCBzdGFydERhdGUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGlzRGF5SW5SYW5nZShkYXksIHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VTdGFydCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBzZWxlY3RpbmdEYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU2FtZURheShkYXksIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNFbmQgfHwgc2VsZWN0c1JhbmdlKSB7XG4gICAgICByZXR1cm4gaXNTYW1lRGF5KGRheSwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF5LCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNSYW5nZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzU2FtZURheShzdGFydERhdGUsIGRheSk7XG4gIH07XG5cbiAgaXNSYW5nZUVuZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1NhbWVEYXkoZW5kRGF0ZSwgZGF5KTtcbiAgfTtcblxuICBpc1dlZWtlbmQgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla2RheSA9IGdldERheSh0aGlzLnByb3BzLmRheSk7XG4gICAgcmV0dXJuIHdlZWtkYXkgPT09IDAgfHwgd2Vla2RheSA9PT0gNjtcbiAgfTtcblxuICBpc0FmdGVyTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKHRoaXMucHJvcHMubW9udGggKyAxKSAlIDEyID09PSBnZXRNb250aCh0aGlzLnByb3BzLmRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQmVmb3JlTW9udGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMubW9udGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKGdldE1vbnRoKHRoaXMucHJvcHMuZGF5KSArIDEpICUgMTIgPT09IHRoaXMucHJvcHMubW9udGhcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudERheSA9ICgpID0+IHRoaXMuaXNTYW1lRGF5KG5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXM/LnNvbWUoKGRhdGUpID0+XG4gICAgICAgIHRoaXMuaXNTYW1lRGF5T3JXZWVrKGRhdGUpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lRGF5T3JXZWVrKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICB9O1xuXG4gIGdldENsYXNzTmFtZXMgPSAoZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRheUNsYXNzTmFtZSA9IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lXG4gICAgICA/IHRoaXMucHJvcHMuZGF5Q2xhc3NOYW1lKGRhdGUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIsXG4gICAgICBkYXlDbGFzc05hbWUsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tXCIgKyBnZXREYXlPZldlZWtDb2RlKHRoaXMucHJvcHMuZGF5KSxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWRpc2FibGVkXCI6IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tZXhjbHVkZWRcIjogdGhpcy5pc0V4Y2x1ZGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1zZWxlY3RlZFwiOiB0aGlzLmlzU2VsZWN0ZWQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWtleWJvYXJkLXNlbGVjdGVkXCI6IHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZCgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0taW4tcmFuZ2VcIjogdGhpcy5pc0luUmFuZ2UoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWluLXNlbGVjdGluZy1yYW5nZVwiOiB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZSgpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX2RheS0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXNlbGVjdGluZy1yYW5nZS1lbmRcIjpcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0aW5nUmFuZ2VFbmQoKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50RGF5KCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS13ZWVrZW5kXCI6IHRoaXMuaXNXZWVrZW5kKCksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5LS1vdXRzaWRlLW1vbnRoXCI6XG4gICAgICAgICAgdGhpcy5pc0FmdGVyTW9udGgoKSB8fCB0aGlzLmlzQmVmb3JlTW9udGgoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmdldEhpZ2hMaWdodGVkQ2xhc3MoXCJyZWFjdC1kYXRlcGlja2VyX19kYXktLWhpZ2hsaWdodGVkXCIpLFxuICAgICAgdGhpcy5nZXRIb2xpZGF5c0NsYXNzKCksXG4gICAgKTtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkVuYWJsZWQgPSBcIkNob29zZVwiLFxuICAgICAgYXJpYUxhYmVsUHJlZml4V2hlbkRpc2FibGVkID0gXCJOb3QgYXZhaWxhYmxlXCIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBwcmVmaXggPVxuICAgICAgdGhpcy5pc0Rpc2FibGVkKCkgfHwgdGhpcy5pc0V4Y2x1ZGVkKClcbiAgICAgICAgPyBhcmlhTGFiZWxQcmVmaXhXaGVuRGlzYWJsZWRcbiAgICAgICAgOiBhcmlhTGFiZWxQcmVmaXhXaGVuRW5hYmxlZDtcblxuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7Zm9ybWF0RGF0ZShkYXksIFwiUFBQUFwiLCB0aGlzLnByb3BzLmxvY2FsZSl9YDtcbiAgfTtcblxuICAvLyBBIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgaG9saWRheSdzIG5hbWUgYXMgdGl0bGUncyBjb250ZW50XG4gIGdldFRpdGxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBob2xpZGF5cyA9IG5ldyBNYXAoKSwgZXhjbHVkZURhdGVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbXBhcmVEdCA9IGZvcm1hdERhdGUoZGF5LCBcIk1NLmRkLnl5eXlcIik7XG4gICAgY29uc3QgdGl0bGVzID0gW107XG4gICAgaWYgKGhvbGlkYXlzLmhhcyhjb21wYXJlRHQpKSB7XG4gICAgICB0aXRsZXMucHVzaCguLi5ob2xpZGF5cy5nZXQoY29tcGFyZUR0KS5ob2xpZGF5TmFtZXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0V4Y2x1ZGVkKCkpIHtcbiAgICAgIHRpdGxlcy5wdXNoKFxuICAgICAgICBleGNsdWRlRGF0ZXNcbiAgICAgICAgICA/LmZpbHRlcigoZXhjbHVkZURhdGUpID0+XG4gICAgICAgICAgICBpc1NhbWVEYXkoZXhjbHVkZURhdGUuZGF0ZSA/IGV4Y2x1ZGVEYXRlLmRhdGUgOiBleGNsdWRlRGF0ZSwgZGF5KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLm1hcCgoZXhjbHVkZURhdGUpID0+IGV4Y2x1ZGVEYXRlLm1lc3NhZ2UpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlcy5qb2luKFwiLCBcIik7XG4gIH07XG5cbiAgZ2V0VGFiSW5kZXggPSAoc2VsZWN0ZWQsIHByZVNlbGVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gc2VsZWN0ZWQgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZDtcbiAgICBjb25zdCBwcmVTZWxlY3Rpb25EYXkgPSBwcmVTZWxlY3Rpb24gfHwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG4gICAgY29uc3QgdGFiSW5kZXggPVxuICAgICAgIShcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJlxuICAgICAgICAodGhpcy5wcm9wcy5zaG93V2Vla051bWJlciB8fCAhdGhpcy5pc1N0YXJ0T2ZXZWVrKCkpXG4gICAgICApICYmXG4gICAgICAodGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoKSB8fFxuICAgICAgICAodGhpcy5pc1NhbWVEYXkoc2VsZWN0ZWREYXkpICYmXG4gICAgICAgICAgaXNTYW1lRGF5KHByZVNlbGVjdGlvbkRheSwgc2VsZWN0ZWREYXkpKSlcbiAgICAgICAgPyAwXG4gICAgICAgIDogLTE7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIGRheVxuICAvLyBmb2N1cyB0aGUgZGF5IG9uIG1vdW50L3VwZGF0ZSBzbyB0aGF0IGtleWJvYXJkIG5hdmlnYXRpb24gd29ya3Mgd2hpbGUgY3ljbGluZyB0aHJvdWdoIG1vbnRocyB3aXRoIHVwIG9yIGRvd24ga2V5cyAobm90IGZvciBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnMpXG4gIC8vIHByZXZlbnQgZm9jdXMgZm9yIHRoZXNlIGFjdGl2ZUVsZW1lbnQgY2FzZXMgc28gd2UgZG9uJ3QgcHVsbCBmb2N1cyBmcm9tIHRoZSBpbnB1dCBhcyB0aGUgY2FsZW5kYXIgb3BlbnNcbiAgaGFuZGxlRm9jdXNEYXkgPSAocHJldlByb3BzID0ge30pID0+IHtcbiAgICBsZXQgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgdGhpcy5pc1NhbWVEYXkodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaW5saW5lIHZlcnNpb246XG4gICAgICAvLyBkbyBub3QgZm9jdXMgb24gaW5pdGlhbCByZW5kZXIgdG8gcHJldmVudCBhdXRvRm9jdXMgaXNzdWVcbiAgICAgIC8vIGZvY3VzIGFmdGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHZpYSBrZXlib2FyZFxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lICYmICF0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lKSB7XG4gICAgICAgIHNob3VsZEZvY3VzRGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGUgYWN0aXZlRWxlbWVudCBpcyBpbiB0aGUgY29udGFpbmVyLCBhbmQgaXQgaXMgYW5vdGhlciBpbnN0YW5jZSBvZiBEYXlcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhY3QtZGF0ZXBpY2tlcl9fZGF5XCIpXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy9kYXkgaXMgb25lIG9mIHRoZSBub24gcmVuZGVyZWQgZHVwbGljYXRlIGRheXNcbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kICYmIHRoaXMuaXNBZnRlck1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQgJiYgdGhpcy5pc0JlZm9yZU1vbnRoKCkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNEYXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c0RheSAmJiB0aGlzLmRheUVsLmN1cnJlbnQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW5kZXJEYXlDb250ZW50cyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb250aFNob3dzRHVwbGljYXRlRGF5c0VuZCAmJiB0aGlzLmlzQWZ0ZXJNb250aCgpKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCAmJiB0aGlzLmlzQmVmb3JlTW9udGgoKSlcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzXG4gICAgICA/IHRoaXMucHJvcHMucmVuZGVyRGF5Q29udGVudHMoZ2V0RGF0ZSh0aGlzLnByb3BzLmRheSksIHRoaXMucHJvcHMuZGF5KVxuICAgICAgOiBnZXREYXRlKHRoaXMucHJvcHMuZGF5KTtcbiAgfTtcblxuICByZW5kZXIgPSAoKSA9PiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt0aGlzLmRheUVsfVxuICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXModGhpcy5wcm9wcy5kYXkpfVxuICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICBvbk1vdXNlRW50ZXI9e1xuICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbCgpfVxuICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICB0aXRsZT17dGhpcy5nZXRUaXRsZSgpfVxuICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5pc0Rpc2FibGVkKCl9XG4gICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50RGF5KCkgPyBcImRhdGVcIiA6IHVuZGVmaW5lZH1cbiAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZCgpIHx8IHRoaXMuaXNJblJhbmdlKCl9XG4gICAgPlxuICAgICAge3RoaXMucmVuZGVyRGF5Q29udGVudHMoKX1cbiAgICAgIHt0aGlzLmdldFRpdGxlKCkgIT09IFwiXCIgJiYgKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvdmVybGF5XCI+e3RoaXMuZ2V0VGl0bGUoKX08L3NwYW4+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWtOdW1iZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJpYUxhYmVsUHJlZml4OiBcIndlZWsgXCIsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2Vla051bWJlcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBwcmVTZWxlY3Rpb246IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93V2Vla051bWJlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgY3VycmVudDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudCkgfSksXG4gICAgXSksXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1c1dlZWtOdW1iZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICB0aGlzLmhhbmRsZUZvY3VzV2Vla051bWJlcihwcmV2UHJvcHMpO1xuICB9XG5cbiAgd2Vla051bWJlckVsID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbktleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuaGFuZGxlT25LZXlEb3duKGV2ZW50KTtcbiAgfTtcblxuICBpc0tleWJvYXJkU2VsZWN0ZWQgPSAoKSA9PlxuICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgIWlzU2FtZURheSh0aGlzLnByb3BzLmRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpICYmXG4gICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pO1xuXG4gIGdldFRhYkluZGV4ID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyICYmXG4gICAgdGhpcy5wcm9wcy5zaG93V2Vla051bWJlciAmJlxuICAgICh0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpIHx8XG4gICAgICAoaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5zZWxlY3RlZCkgJiZcbiAgICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCB0aGlzLnByb3BzLnNlbGVjdGVkKSkpXG4gICAgICA/IDBcbiAgICAgIDogLTE7XG5cbiAgLy8gdmFyaW91cyBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gYXBwbHkgZm9jdXMgdG8gdGhlIHByZXNlbGVjdGVkIHdlZWstbnVtYmVyXG4gIC8vIGZvY3VzIHRoZSB3ZWVrLW51bWJlciBvbiBtb3VudC91cGRhdGUgc28gdGhhdCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdvcmtzIHdoaWxlIGN5Y2xpbmcgdGhyb3VnaCBtb250aHMgd2l0aCB1cCBvciBkb3duIGtleXMgKG5vdCBmb3IgcHJldiBhbmQgbmV4dCBtb250aCBidXR0b25zKVxuICAvLyBwcmV2ZW50IGZvY3VzIGZvciB0aGVzZSBhY3RpdmVFbGVtZW50IGNhc2VzIHNvIHdlIGRvbid0IHB1bGwgZm9jdXMgZnJvbSB0aGUgaW5wdXQgYXMgdGhlIGNhbGVuZGFyIG9wZW5zXG4gIGhhbmRsZUZvY3VzV2Vla051bWJlciA9IChwcmV2UHJvcHMgPSB7fSkgPT4ge1xuICAgIGxldCBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAvLyBvbmx5IGRvIHRoaXMgd2hpbGUgdGhlIGlucHV0IGlzbid0IGZvY3VzZWRcbiAgICAvLyBvdGhlcndpc2UsIHR5cGluZy9iYWNrc3BhY2luZyB0aGUgZGF0ZSBtYW51YWxseSBtYXkgc3RlYWwgZm9jdXMgYXdheSBmcm9tIHRoZSBpbnB1dFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0VGFiSW5kZXgoKSA9PT0gMCAmJlxuICAgICAgIXByZXZQcm9wcy5pc0lucHV0Rm9jdXNlZCAmJlxuICAgICAgaXNTYW1lRGF5KHRoaXMucHJvcHMuZGF0ZSwgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pXG4gICAgKSB7XG4gICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gYWN0aXZlRWxlbWVudCBhbmQgbm90IGlubGluZVxuICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGlubGluZSB2ZXJzaW9uOlxuICAgICAgLy8gZG8gbm90IGZvY3VzIG9uIGluaXRpYWwgcmVuZGVyIHRvIHByZXZlbnQgYXV0b0ZvY3VzIGlzc3VlXG4gICAgICAvLyBmb2N1cyBhZnRlciBtb250aCBoYXMgY2hhbmdlZCB2aWEga2V5Ym9hcmRcbiAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZSkge1xuICAgICAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhY3RpdmVFbGVtZW50IGlzIGluIHRoZSBjb250YWluZXIsIGFuZCBpdCBpcyBhbm90aGVyIGluc3RhbmNlIG9mIFdlZWtOdW1iZXJcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgdGhpcy5wcm9wcy5jb250YWluZXJSZWYuY3VycmVudCAmJlxuICAgICAgICB0aGlzLnByb3BzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgc2hvdWxkRm9jdXNXZWVrTnVtYmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRGb2N1c1dlZWtOdW1iZXIgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMud2Vla051bWJlckVsLmN1cnJlbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHdlZWtOdW1iZXIsIGFyaWFMYWJlbFByZWZpeCA9IFwid2VlayBcIiwgb25DbGljayB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHdlZWtOdW1iZXJDbGFzc2VzID0ge1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlclwiOiB0cnVlLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLW51bWJlci0tY2xpY2thYmxlXCI6ICEhb25DbGljayxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLXNlbGVjdGVkXCI6XG4gICAgICAgICEhb25DbGljayAmJiBpc1NhbWVEYXkodGhpcy5wcm9wcy5kYXRlLCB0aGlzLnByb3BzLnNlbGVjdGVkKSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay1udW1iZXItLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgIHRoaXMuaXNLZXlib2FyZFNlbGVjdGVkKCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3RoaXMud2Vla051bWJlckVsfVxuICAgICAgICBjbGFzc05hbWU9e2Nsc3god2Vla051bWJlckNsYXNzZXMpfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHthcmlhTGFiZWxQcmVmaXh9ICR7dGhpcy5wcm9wcy53ZWVrTnVtYmVyfWB9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVPbktleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0aGlzLmdldFRhYkluZGV4KCl9XG4gICAgICA+XG4gICAgICAgIHt3ZWVrTnVtYmVyfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IERheSBmcm9tIFwiLi9kYXlcIjtcbmltcG9ydCBXZWVrTnVtYmVyIGZyb20gXCIuL3dlZWtfbnVtYmVyXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcblxuaW1wb3J0IHsgYWRkRGF5cywgZ2V0V2VlaywgZ2V0U3RhcnRPZldlZWssIGlzU2FtZURheSB9IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VlayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgIH07XG4gIH1cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRheTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNlbGVjdHNFbmQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNTdGFydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1dlZWtOdW1iZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHNldE9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbmRlckRheUNvbnRlbnRzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EYXlDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheUNsaWNrKGRheSwgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5TW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlV2Vla0NsaWNrID0gKGRheSwgd2Vla051bWJlciwgZXZlbnQpID0+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25XZWVrU2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucHJvcHMub25XZWVrU2VsZWN0KGRheSwgd2Vla051bWJlciwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgdGhpcy5oYW5kbGVEYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0V2Vla051bWJlciA9IChkYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcihkYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFdlZWsoZGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyRGF5cyA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFydE9mV2VlayA9IHRoaXMuc3RhcnRPZldlZWsoKTtcbiAgICBjb25zdCBkYXlzID0gW107XG4gICAgY29uc3Qgd2Vla051bWJlciA9IHRoaXMuZm9ybWF0V2Vla051bWJlcihzdGFydE9mV2Vlayk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXIpIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2tBY3Rpb24gPVxuICAgICAgICB0aGlzLnByb3BzLm9uV2Vla1NlbGVjdCB8fCB0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyXG4gICAgICAgICAgPyB0aGlzLmhhbmRsZVdlZWtDbGljay5iaW5kKHRoaXMsIHN0YXJ0T2ZXZWVrLCB3ZWVrTnVtYmVyKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgZGF5cy5wdXNoKFxuICAgICAgICA8V2Vla051bWJlclxuICAgICAgICAgIGtleT1cIldcIlxuICAgICAgICAgIHdlZWtOdW1iZXI9e3dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGF0ZT17c3RhcnRPZldlZWt9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja0FjdGlvbn1cbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgIGFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5hcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgc2hvd1dlZWtQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXJ9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJ9XG4gICAgICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb249e3RoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb259XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBpc0lucHV0Rm9jdXNlZD17dGhpcy5wcm9wcy5pc0lucHV0Rm9jdXNlZH1cbiAgICAgICAgICBjb250YWluZXJSZWY9e3RoaXMucHJvcHMuY29udGFpbmVyUmVmfVxuICAgICAgICAvPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxEYXlcbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkPXt0aGlzLnByb3BzLmNob29zZURheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICAgIGtleT17ZGF5LnZhbHVlT2YoKX1cbiAgICAgICAgICAgIGRheT17ZGF5fVxuICAgICAgICAgICAgbW9udGg9e3RoaXMucHJvcHMubW9udGh9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrLmJpbmQodGhpcywgZGF5KX1cbiAgICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlRGF5TW91c2VFbnRlci5iaW5kKHRoaXMsIGRheSl9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBpbmNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVzfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuaW5jbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVyPXt0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyfVxuICAgICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzTXVsdGlwbGU9e3RoaXMucHJvcHMuc2VsZWN0c011bHRpcGxlfVxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcz17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGVzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9ufVxuICAgICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICBzaG91bGRGb2N1c0RheUlubGluZT17dGhpcy5wcm9wcy5zaG91bGRGb2N1c0RheUlubGluZX1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgICAgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydD17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBzdGFydE9mV2VlayA9ICgpID0+XG4gICAgZ2V0U3RhcnRPZldlZWsoXG4gICAgICB0aGlzLnByb3BzLmRheSxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5LFxuICAgICk7XG5cbiAgaXNLZXlib2FyZFNlbGVjdGVkID0gKCkgPT5cbiAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICFpc1NhbWVEYXkodGhpcy5zdGFydE9mV2VlaygpLCB0aGlzLnByb3BzLnNlbGVjdGVkKSAmJlxuICAgIGlzU2FtZURheSh0aGlzLnN0YXJ0T2ZXZWVrKCksIHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgd2Vla051bWJlckNsYXNzZXMgPSB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3dlZWtcIjogdHJ1ZSxcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vlay0tc2VsZWN0ZWRcIjogaXNTYW1lRGF5KFxuICAgICAgICB0aGlzLnN0YXJ0T2ZXZWVrKCksXG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICApLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX193ZWVrLS1rZXlib2FyZC1zZWxlY3RlZFwiOiB0aGlzLmlzS2V5Ym9hcmRTZWxlY3RlZCgpLFxuICAgIH07XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbHN4KHdlZWtOdW1iZXJDbGFzc2VzKX0+e3RoaXMucmVuZGVyRGF5cygpfTwvZGl2PjtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgV2VlayBmcm9tIFwiLi93ZWVrXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5cbmNvbnN0IEZJWEVEX0hFSUdIVF9TVEFOREFSRF9XRUVLX0NPVU5UID0gNjtcblxuY29uc3QgTU9OVEhfQ09MVU1OU19MQVlPVVQgPSB7XG4gIFRXT19DT0xVTU5TOiBcInR3b19jb2x1bW5zXCIsXG4gIFRIUkVFX0NPTFVNTlM6IFwidGhyZWVfY29sdW1uc1wiLFxuICBGT1VSX0NPTFVNTlM6IFwiZm91cl9jb2x1bW5zXCIsXG59O1xuY29uc3QgTU9OVEhfQ09MVU1OUyA9IHtcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULlRXT19DT0xVTU5TXToge1xuICAgIGdyaWQ6IFtcbiAgICAgIFswLCAxXSxcbiAgICAgIFsyLCAzXSxcbiAgICAgIFs0LCA1XSxcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs4LCA5XSxcbiAgICAgIFsxMCwgMTFdLFxuICAgIF0sXG4gICAgdmVydGljYWxOYXZpZ2F0aW9uT2Zmc2V0OiAyLFxuICB9LFxuICBbTU9OVEhfQ09MVU1OU19MQVlPVVQuVEhSRUVfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMl0sXG4gICAgICBbMywgNCwgNV0sXG4gICAgICBbNiwgNywgOF0sXG4gICAgICBbOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogMyxcbiAgfSxcbiAgW01PTlRIX0NPTFVNTlNfTEFZT1VULkZPVVJfQ09MVU1OU106IHtcbiAgICBncmlkOiBbXG4gICAgICBbMCwgMSwgMiwgM10sXG4gICAgICBbNCwgNSwgNiwgN10sXG4gICAgICBbOCwgOSwgMTAsIDExXSxcbiAgICBdLFxuICAgIHZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDogNCxcbiAgfSxcbn07XG5jb25zdCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUID0gMTtcblxuZnVuY3Rpb24gZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbikge1xuICBpZiAoc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIpIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5GT1VSX0NPTFVNTlM7XG4gIGlmIChzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyKSByZXR1cm4gTU9OVEhfQ09MVU1OU19MQVlPVVQuVFdPX0NPTFVNTlM7XG4gIHJldHVybiBNT05USF9DT0xVTU5TX0xBWU9VVC5USFJFRV9DT0xVTU5TO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZERheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGF5OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9yZGVySW5EaXNwbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4Y2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgIF0pLFxuICAgICksXG4gICAgZXhjbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBmaWx0ZXJEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmaXhlZEhlaWdodDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaG9saWRheXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE1hcCksXG4gICAgaW5jbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZURhdGVJbnRlcnZhbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3VsZEZvY3VzRGF5SW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkRheUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgY2FsZW5kYXJTdGFydERheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNNdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0ZWREYXRlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSkpLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW5kZXJEYXlDb250ZW50czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTW9udGhDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZW5kZXJRdWFydGVyQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Z1bGxNb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYW5kbGVPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGhhbmRsZU9uTW9udGhLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpc0lucHV0Rm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2Vla0FyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250YWluZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBjdXJyZW50OiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBNT05USF9SRUZTID0gWy4uLkFycmF5KDEyKV0ubWFwKCgpID0+IFJlYWN0LmNyZWF0ZVJlZigpKTtcbiAgUVVBUlRFUl9SRUZTID0gWy4uLkFycmF5KDQpXS5tYXAoKCkgPT4gUmVhY3QuY3JlYXRlUmVmKCkpO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgaGFuZGxlRGF5Q2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50LCB0aGlzLnByb3BzLm9yZGVySW5EaXNwbGF5KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRGF5TW91c2VFbnRlciA9IChkYXkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlNb3VzZUVudGVyKGRheSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfTtcblxuICBpc1JhbmdlU3RhcnRNb250aCA9IChtKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgodXRpbHMuc2V0TW9udGgoZGF5LCBtKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlU3RhcnRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgc3RhcnREYXRlKTtcbiAgfTtcblxuICBpc1JhbmdlRW5kTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKHV0aWxzLnNldE1vbnRoKGRheSwgbSksIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzUmFuZ2VFbmRRdWFydGVyID0gKHEpID0+IHtcbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVRdWFydGVyKHV0aWxzLnNldFF1YXJ0ZXIoZGF5LCBxKSwgZW5kRGF0ZSk7XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlTW9udGggPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgZGF5LCBzZWxlY3RzU3RhcnQsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoIShzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHx8ICFzZWxlY3RpbmdEYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNTdGFydCAmJiBlbmREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNNb250aEluUmFuZ2Uoc2VsZWN0aW5nRGF0ZSwgZW5kRGF0ZSwgbSwgZGF5KTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c0VuZCAmJiBzdGFydERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc01vbnRoSW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIG0sIGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZVN0YXJ0ID0gKG0pID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlTW9udGgobSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRheSwgc3RhcnREYXRlLCBzZWxlY3RzU3RhcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgX21vbnRoID0gdXRpbHMuc2V0TW9udGgoZGF5LCBtKTtcbiAgICBjb25zdCBzZWxlY3RpbmdEYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RpbmdEYXRlID8/IHRoaXMucHJvcHMucHJlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdHNTdGFydCkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZU1vbnRoKF9tb250aCwgc2VsZWN0aW5nRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlzU2VsZWN0aW5nTW9udGhSYW5nZUVuZCA9IChtKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXksIGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfbW9udGggPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIGNvbnN0IHNlbGVjdGluZ0RhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGluZ0RhdGUgPz8gdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVNb250aChfbW9udGgsIHNlbGVjdGluZ0RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNTYW1lTW9udGgoX21vbnRoLCBlbmREYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciA9IChxKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdHNTdGFydCwgc2VsZWN0c0VuZCwgc2VsZWN0c1JhbmdlLCBzdGFydERhdGUsIGVuZERhdGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0aW5nRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICAgIGlmICghKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHwgIXNlbGVjdGluZ0RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHNlbGVjdGluZ0RhdGUsIGVuZERhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNRdWFydGVySW5SYW5nZShzdGFydERhdGUsIHNlbGVjdGluZ0RhdGUsIHEsIGRheSk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKHN0YXJ0RGF0ZSwgc2VsZWN0aW5nRGF0ZSwgcSwgZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNXZWVrSW5Nb250aCA9IChzdGFydE9mV2VlaykgPT4ge1xuICAgIGNvbnN0IGRheSA9IHRoaXMucHJvcHMuZGF5O1xuICAgIGNvbnN0IGVuZE9mV2VlayA9IHV0aWxzLmFkZERheXMoc3RhcnRPZldlZWssIDYpO1xuICAgIHJldHVybiAoXG4gICAgICB1dGlscy5pc1NhbWVNb250aChzdGFydE9mV2VlaywgZGF5KSB8fCB1dGlscy5pc1NhbWVNb250aChlbmRPZldlZWssIGRheSlcbiAgICApO1xuICB9O1xuXG4gIGlzQ3VycmVudE1vbnRoID0gKGRheSwgbSkgPT5cbiAgICB1dGlscy5nZXRZZWFyKGRheSkgPT09IHV0aWxzLmdldFllYXIodXRpbHMubmV3RGF0ZSgpKSAmJlxuICAgIG0gPT09IHV0aWxzLmdldE1vbnRoKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNDdXJyZW50UXVhcnRlciA9IChkYXksIHEpID0+XG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHV0aWxzLm5ld0RhdGUoKSkgJiZcbiAgICBxID09PSB1dGlscy5nZXRRdWFydGVyKHV0aWxzLm5ld0RhdGUoKSk7XG5cbiAgaXNTZWxlY3RlZE1vbnRoID0gKGRheSwgbSwgc2VsZWN0ZWQpID0+XG4gICAgdXRpbHMuZ2V0TW9udGgoc2VsZWN0ZWQpID09PSBtICYmXG4gICAgdXRpbHMuZ2V0WWVhcihkYXkpID09PSB1dGlscy5nZXRZZWFyKHNlbGVjdGVkKTtcblxuICBpc1NlbGVjdGVkUXVhcnRlciA9IChkYXksIHEsIHNlbGVjdGVkKSA9PlxuICAgIHV0aWxzLmdldFF1YXJ0ZXIoZGF5KSA9PT0gcSAmJlxuICAgIHV0aWxzLmdldFllYXIoZGF5KSA9PT0gdXRpbHMuZ2V0WWVhcihzZWxlY3RlZCk7XG5cbiAgcmVuZGVyV2Vla3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla3MgPSBbXTtcbiAgICB2YXIgaXNGaXhlZEhlaWdodCA9IHRoaXMucHJvcHMuZml4ZWRIZWlnaHQ7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGJyZWFrQWZ0ZXJOZXh0UHVzaCA9IGZhbHNlO1xuICAgIGxldCBjdXJyZW50V2Vla1N0YXJ0ID0gdXRpbHMuZ2V0U3RhcnRPZldlZWsoXG4gICAgICB1dGlscy5nZXRTdGFydE9mTW9udGgodGhpcy5wcm9wcy5kYXkpLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXJTdGFydERheSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkO1xuXG4gICAgY29uc3QgcHJlU2VsZWN0aW9uID0gdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlclxuICAgICAgPyB1dGlscy5nZXRTdGFydE9mV2VlayhcbiAgICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICAgICB0aGlzLnByb3BzLmxvY2FsZSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb247XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgd2Vla3MucHVzaChcbiAgICAgICAgPFdlZWtcbiAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMud2Vla0FyaWFMYWJlbFByZWZpeH1cbiAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBkYXk9e2N1cnJlbnRXZWVrU3RhcnR9XG4gICAgICAgICAgbW9udGg9e3V0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMuZGF5KX1cbiAgICAgICAgICBvbkRheUNsaWNrPXt0aGlzLmhhbmRsZURheUNsaWNrfVxuICAgICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgICAgb25EYXlNb3VzZUVudGVyPXt0aGlzLmhhbmRsZURheU1vdXNlRW50ZXJ9XG4gICAgICAgICAgb25XZWVrU2VsZWN0PXt0aGlzLnByb3BzLm9uV2Vla1NlbGVjdH1cbiAgICAgICAgICBmb3JtYXRXZWVrTnVtYmVyPXt0aGlzLnByb3BzLmZvcm1hdFdlZWtOdW1iZXJ9XG4gICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxvY2FsZX1cbiAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICAgIGV4Y2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZXN9XG4gICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICBpbmNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgIGhpZ2hsaWdodERhdGVzPXt0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzfVxuICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgIHNlbGVjdGluZ0RhdGU9e3RoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZX1cbiAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgcHJlU2VsZWN0aW9uPXtwcmVTZWxlY3Rpb259XG4gICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgIHNlbGVjdHNTdGFydD17dGhpcy5wcm9wcy5zZWxlY3RzU3RhcnR9XG4gICAgICAgICAgc2VsZWN0c0VuZD17dGhpcy5wcm9wcy5zZWxlY3RzRW5kfVxuICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgICAgc2VsZWN0c011bHRpcGxlPXt0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZX1cbiAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgc2hvd1dlZWtOdW1iZXI9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICAgIHN0YXJ0RGF0ZT17dGhpcy5wcm9wcy5zdGFydERhdGV9XG4gICAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgc2V0T3Blbj17dGhpcy5wcm9wcy5zZXRPcGVufVxuICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICByZW5kZXJEYXlDb250ZW50cz17dGhpcy5wcm9wcy5yZW5kZXJEYXlDb250ZW50c31cbiAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5wcm9wcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgY2FsZW5kYXJTdGFydERheT17dGhpcy5wcm9wcy5jYWxlbmRhclN0YXJ0RGF5fVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXt0aGlzLnByb3BzLm1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kfVxuICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e3RoaXMucHJvcHMubW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydH1cbiAgICAgICAgLz4sXG4gICAgICApO1xuXG4gICAgICBpZiAoYnJlYWtBZnRlck5leHRQdXNoKSBicmVhaztcblxuICAgICAgaSsrO1xuICAgICAgY3VycmVudFdlZWtTdGFydCA9IHV0aWxzLmFkZFdlZWtzKGN1cnJlbnRXZWVrU3RhcnQsIDEpO1xuXG4gICAgICAvLyBJZiBvbmUgb2YgdGhlc2UgY29uZGl0aW9ucyBpcyB0cnVlLCB3ZSB3aWxsIGVpdGhlciBicmVhayBvbiB0aGlzIHdlZWtcbiAgICAgIC8vIG9yIGJyZWFrIG9uIHRoZSBuZXh0IHdlZWtcbiAgICAgIGNvbnN0IGlzRml4ZWRBbmRGaW5hbFdlZWsgPVxuICAgICAgICBpc0ZpeGVkSGVpZ2h0ICYmIGkgPj0gRklYRURfSEVJR0hUX1NUQU5EQVJEX1dFRUtfQ09VTlQ7XG4gICAgICBjb25zdCBpc05vbkZpeGVkQW5kT3V0T2ZNb250aCA9XG4gICAgICAgICFpc0ZpeGVkSGVpZ2h0ICYmICF0aGlzLmlzV2Vla0luTW9udGgoY3VycmVudFdlZWtTdGFydCk7XG5cbiAgICAgIGlmIChpc0ZpeGVkQW5kRmluYWxXZWVrIHx8IGlzTm9uRml4ZWRBbmRPdXRPZk1vbnRoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBlZWtOZXh0TW9udGgpIHtcbiAgICAgICAgICBicmVha0FmdGVyTmV4dFB1c2ggPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlZWtzO1xuICB9O1xuXG4gIG9uTW9udGhDbGljayA9IChlLCBtKSA9PiB7XG4gICAgY29uc3QgbGFiZWxEYXRlID0gdXRpbHMuc2V0TW9udGgodGhpcy5wcm9wcy5kYXksIG0pO1xuXG4gICAgaWYgKHV0aWxzLmlzTW9udGhEaXNhYmxlZChsYWJlbERhdGUsIHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEYXlDbGljayh1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSwgZSk7XG4gIH07XG5cbiAgb25Nb250aE1vdXNlRW50ZXIgPSAobSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKHRoaXMucHJvcHMuZGF5LCBtKTtcblxuICAgIGlmICh1dGlscy5pc01vbnRoRGlzYWJsZWQobGFiZWxEYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRGF5TW91c2VFbnRlcih1dGlscy5nZXRTdGFydE9mTW9udGgobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlTW9udGhOYXZpZ2F0aW9uID0gKG5ld01vbnRoLCBuZXdEYXRlKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcbiAgICB0aGlzLk1PTlRIX1JFRlNbbmV3TW9udGhdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuTU9OVEhfUkVGU1tuZXdNb250aF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIG9uTW9udGhLZXlEb3duID0gKGV2ZW50LCBtb250aCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgcHJlU2VsZWN0aW9uLFxuICAgICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24sXG4gICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICBzZXRQcmVTZWxlY3Rpb24sXG4gICAgICBoYW5kbGVPbk1vbnRoS2V5RG93bixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoZXZlbnRLZXkgIT09IFwiVGFiXCIpIHtcbiAgICAgIC8vIHByZXZlbnREZWZhdWx0IG9uIHRhYiBldmVudCBibG9ja3MgZm9jdXMgY2hhbmdlXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBtb250aENvbHVtbnNMYXlvdXQgPSBnZXRNb250aENvbHVtbnNMYXlvdXQoXG4gICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICBzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0ID1cbiAgICAgICAgTU9OVEhfQ09MVU1OU1ttb250aENvbHVtbnNMYXlvdXRdLnZlcnRpY2FsTmF2aWdhdGlvbk9mZnNldDtcbiAgICAgIGNvbnN0IG1vbnRoc0dyaWQgPSBNT05USF9DT0xVTU5TW21vbnRoQ29sdW1uc0xheW91dF0uZ3JpZDtcbiAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XG4gICAgICAgICAgdGhpcy5vbk1vbnRoQ2xpY2soZXZlbnQsIG1vbnRoKTtcbiAgICAgICAgICBzZXRQcmVTZWxlY3Rpb24oc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgbW9udGggPT09IDExID8gMCA6IG1vbnRoICsgTU9OVEhfTkFWSUdBVElPTl9IT1JJWk9OVEFMX09GRlNFVCxcbiAgICAgICAgICAgIHV0aWxzLmFkZE1vbnRocyhwcmVTZWxlY3Rpb24sIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIG1vbnRoID09PSAwID8gMTEgOiBtb250aCAtIE1PTlRIX05BVklHQVRJT05fSE9SSVpPTlRBTF9PRkZTRVQsXG4gICAgICAgICAgICB1dGlscy5zdWJNb250aHMocHJlU2VsZWN0aW9uLCBNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHRoaXMuaGFuZGxlTW9udGhOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9udGggb24gdGhlIGZpcnN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFswXS5pbmNsdWRlcyhtb250aClcbiAgICAgICAgICAgICAgPyBtb250aCArIDEyIC0gdmVydGljYWxPZmZzZXRcbiAgICAgICAgICAgICAgOiBtb250aCAtIHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgdXRpbHMuc3ViTW9udGhzKHByZVNlbGVjdGlvbiwgdmVydGljYWxPZmZzZXQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vbnRoTmF2aWdhdGlvbihcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG1vbnRoIG9uIHRoZSBsYXN0IHJvd1xuICAgICAgICAgICAgbW9udGhzR3JpZFttb250aHNHcmlkLmxlbmd0aCAtIDFdLmluY2x1ZGVzKG1vbnRoKVxuICAgICAgICAgICAgICA/IG1vbnRoIC0gMTIgKyB2ZXJ0aWNhbE9mZnNldFxuICAgICAgICAgICAgICA6IG1vbnRoICsgdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICB1dGlscy5hZGRNb250aHMocHJlU2VsZWN0aW9uLCB2ZXJ0aWNhbE9mZnNldCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbk1vbnRoS2V5RG93biAmJiBoYW5kbGVPbk1vbnRoS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgb25RdWFydGVyQ2xpY2sgPSAoZSwgcSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheUNsaWNrKHV0aWxzLmdldFN0YXJ0T2ZRdWFydGVyKGxhYmVsRGF0ZSksIGUpO1xuICB9O1xuXG4gIG9uUXVhcnRlck1vdXNlRW50ZXIgPSAocSkgPT4ge1xuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldFF1YXJ0ZXIodGhpcy5wcm9wcy5kYXksIHEpO1xuXG4gICAgaWYgKHV0aWxzLmlzUXVhcnRlckRpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURheU1vdXNlRW50ZXIodXRpbHMuZ2V0U3RhcnRPZlF1YXJ0ZXIobGFiZWxEYXRlKSk7XG4gIH07XG5cbiAgaGFuZGxlUXVhcnRlck5hdmlnYXRpb24gPSAobmV3UXVhcnRlciwgbmV3RGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQobmV3RGF0ZSkgfHwgdGhpcy5pc0V4Y2x1ZGVkKG5ld0RhdGUpKSByZXR1cm47XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24obmV3RGF0ZSk7XG4gICAgdGhpcy5RVUFSVEVSX1JFRlNbbmV3UXVhcnRlciAtIDFdLmN1cnJlbnQgJiZcbiAgICAgIHRoaXMuUVVBUlRFUl9SRUZTW25ld1F1YXJ0ZXIgLSAxXS5jdXJyZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgb25RdWFydGVyS2V5RG93biA9IChldmVudCwgcXVhcnRlcikgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbikge1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgICB0aGlzLm9uUXVhcnRlckNsaWNrKGV2ZW50LCBxdWFydGVyKTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVF1YXJ0ZXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgcXVhcnRlciA9PT0gNCA/IDEgOiBxdWFydGVyICsgMSxcbiAgICAgICAgICAgIHV0aWxzLmFkZFF1YXJ0ZXJzKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCAxKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVRdWFydGVyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHF1YXJ0ZXIgPT09IDEgPyA0IDogcXVhcnRlciAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJRdWFydGVycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZ2V0TW9udGhDbGFzc05hbWVzID0gKG0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXksXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIHByZVNlbGVjdGlvbixcbiAgICAgIG1vbnRoQ2xhc3NOYW1lLFxuICAgICAgZXhjbHVkZURhdGVzLFxuICAgICAgaW5jbHVkZURhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IF9tb250aENsYXNzTmFtZSA9IG1vbnRoQ2xhc3NOYW1lXG4gICAgICA/IG1vbnRoQ2xhc3NOYW1lKHV0aWxzLnNldE1vbnRoKGRheSwgbSkpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsYWJlbERhdGUgPSB1dGlscy5zZXRNb250aChkYXksIG0pO1xuICAgIHJldHVybiBjbHN4KFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtJHttfWAsXG4gICAgICBfbW9udGhDbGFzc05hbWUsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMpICYmXG4gICAgICAgICAgdXRpbHMuaXNNb250aERpc2FibGVkKGxhYmVsRGF0ZSwgdGhpcy5wcm9wcyksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkTW9udGgoXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIG0sXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0ta2V5Ym9hcmQtc2VsZWN0ZWRcIjpcbiAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZE1vbnRoKGRheSwgbSwgcHJlU2VsZWN0aW9uKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19tb250aC10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLWluLXJhbmdlXCI6IHV0aWxzLmlzTW9udGhJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIG0sXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXJhbmdlLXN0YXJ0XCI6IHRoaXMuaXNSYW5nZVN0YXJ0TW9udGgobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tcmFuZ2UtZW5kXCI6IHRoaXMuaXNSYW5nZUVuZE1vbnRoKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXNlbGVjdGluZy1yYW5nZS1zdGFydFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQobSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtdGV4dC0tc2VsZWN0aW5nLXJhbmdlLWVuZFwiOlxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RpbmdNb250aFJhbmdlRW5kKG0pLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLXRleHQtLXRvZGF5XCI6IHRoaXMuaXNDdXJyZW50TW9udGgoZGF5LCBtKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRUYWJJbmRleCA9IChtKSA9PiB7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWRNb250aCA9IHV0aWxzLmdldE1vbnRoKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBtID09PSBwcmVTZWxlY3RlZE1vbnRoXG4gICAgICAgID8gXCIwXCJcbiAgICAgICAgOiBcIi0xXCI7XG5cbiAgICByZXR1cm4gdGFiSW5kZXg7XG4gIH07XG5cbiAgZ2V0UXVhcnRlclRhYkluZGV4ID0gKHEpID0+IHtcbiAgICBjb25zdCBwcmVTZWxlY3RlZFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcbiAgICBjb25zdCB0YWJJbmRleCA9XG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiAmJiBxID09PSBwcmVTZWxlY3RlZFF1YXJ0ZXJcbiAgICAgICAgPyBcIjBcIlxuICAgICAgICA6IFwiLTFcIjtcblxuICAgIHJldHVybiB0YWJJbmRleDtcbiAgfTtcblxuICBnZXRBcmlhTGFiZWwgPSAobW9udGgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXggPSBcIkNob29zZVwiLFxuICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXggPSBcIk5vdCBhdmFpbGFibGVcIixcbiAgICAgIGRheSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGxhYmVsRGF0ZSA9IHV0aWxzLnNldE1vbnRoKGRheSwgbW9udGgpO1xuICAgIGNvbnN0IHByZWZpeCA9XG4gICAgICB0aGlzLmlzRGlzYWJsZWQobGFiZWxEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobGFiZWxEYXRlKVxuICAgICAgICA/IGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4XG4gICAgICAgIDogY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4O1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHt1dGlscy5mb3JtYXREYXRlKGxhYmVsRGF0ZSwgXCJNTU1NIHl5eXlcIil9YDtcbiAgfTtcblxuICBnZXRRdWFydGVyQ2xhc3NOYW1lcyA9IChxKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF5LFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBwcmVTZWxlY3Rpb24sXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY2xzeChcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0XCIsXG4gICAgICBgcmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci0ke3F9YCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWRpc2FibGVkXCI6XG4gICAgICAgICAgKG1pbkRhdGUgfHwgbWF4RGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1F1YXJ0ZXJEaXNhYmxlZCh1dGlscy5zZXRRdWFydGVyKGRheSwgcSksIHRoaXMucHJvcHMpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tc2VsZWN0ZWRcIjogdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgcSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19xdWFydGVyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgIWRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGVkUXVhcnRlcihkYXksIHEsIHByZVNlbGVjdGlvbiksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1zZWxlY3RpbmctcmFuZ2VcIjpcbiAgICAgICAgICB0aGlzLmlzSW5TZWxlY3RpbmdSYW5nZVF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1pbi1yYW5nZVwiOiB1dGlscy5pc1F1YXJ0ZXJJblJhbmdlKFxuICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICBlbmREYXRlLFxuICAgICAgICAgIHEsXG4gICAgICAgICAgZGF5LFxuICAgICAgICApLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItdGV4dC0tcmFuZ2Utc3RhcnRcIjpcbiAgICAgICAgICB0aGlzLmlzUmFuZ2VTdGFydFF1YXJ0ZXIocSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fcXVhcnRlci10ZXh0LS1yYW5nZS1lbmRcIjogdGhpcy5pc1JhbmdlRW5kUXVhcnRlcihxKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICBnZXRNb250aENvbnRlbnQgPSAobSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd0Z1bGxNb250aFllYXJQaWNrZXIsIHJlbmRlck1vbnRoQ29udGVudCwgbG9jYWxlLCBkYXkgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNob3J0TW9udGhUZXh0ID0gdXRpbHMuZ2V0TW9udGhTaG9ydEluTG9jYWxlKG0sIGxvY2FsZSk7XG4gICAgY29uc3QgZnVsbE1vbnRoVGV4dCA9IHV0aWxzLmdldE1vbnRoSW5Mb2NhbGUobSwgbG9jYWxlKTtcbiAgICBpZiAocmVuZGVyTW9udGhDb250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTW9udGhDb250ZW50KG0sIHNob3J0TW9udGhUZXh0LCBmdWxsTW9udGhUZXh0LCBkYXkpO1xuICAgIH1cbiAgICByZXR1cm4gc2hvd0Z1bGxNb250aFllYXJQaWNrZXIgPyBmdWxsTW9udGhUZXh0IDogc2hvcnRNb250aFRleHQ7XG4gIH07XG5cbiAgZ2V0UXVhcnRlckNvbnRlbnQgPSAocSkgPT4ge1xuICAgIGNvbnN0IHsgcmVuZGVyUXVhcnRlckNvbnRlbnQsIGxvY2FsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG9ydFF1YXJ0ZXIgPSB1dGlscy5nZXRRdWFydGVyU2hvcnRJbkxvY2FsZShxLCBsb2NhbGUpO1xuICAgIHJldHVybiByZW5kZXJRdWFydGVyQ29udGVudFxuICAgICAgPyByZW5kZXJRdWFydGVyQ29udGVudChxLCBzaG9ydFF1YXJ0ZXIpXG4gICAgICA6IHNob3J0UXVhcnRlcjtcbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgZGF5LFxuICAgICAgc2VsZWN0ZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtb250aENvbHVtbnMgPVxuICAgICAgTU9OVEhfQ09MVU1OU1tcbiAgICAgICAgZ2V0TW9udGhDb2x1bW5zTGF5b3V0KFxuICAgICAgICAgIHNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyLFxuICAgICAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXIsXG4gICAgICAgIClcbiAgICAgIF0uZ3JpZDtcbiAgICByZXR1cm4gbW9udGhDb2x1bW5zLm1hcCgobW9udGgsIGkpID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtd3JhcHBlclwiIGtleT17aX0+XG4gICAgICAgIHttb250aC5tYXAoKG0sIGopID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3RoaXMuTU9OVEhfUkVGU1ttXX1cbiAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uTW9udGhDbGljayhldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXYpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXYua2V5ID0gXCJFbnRlclwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoS2V5RG93bihldiwgbSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uTW9udGhNb3VzZUVudGVyKG0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMub25Nb250aE1vdXNlRW50ZXIobSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMuZ2V0VGFiSW5kZXgobSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0TW9udGhDbGFzc05hbWVzKG0pfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLmdldEFyaWFMYWJlbChtKX1cbiAgICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRNb250aChkYXksIG0pID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXt0aGlzLmlzU2VsZWN0ZWRNb250aChkYXksIG0sIHNlbGVjdGVkKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRNb250aENvbnRlbnQobSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyUXVhcnRlcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXksIHNlbGVjdGVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHF1YXJ0ZXJzID0gWzEsIDIsIDMsIDRdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXItd3JhcHBlclwiPlxuICAgICAgICB7cXVhcnRlcnMubWFwKChxLCBqKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgcmVmPXt0aGlzLlFVQVJURVJfUkVGU1tqXX1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyQ2xpY2soZXYsIHEpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25RdWFydGVyS2V5RG93bihldiwgcSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgICAgPyAoKSA9PiB0aGlzLm9uUXVhcnRlck1vdXNlRW50ZXIocSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qb2ludGVyRW50ZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICAgID8gKCkgPT4gdGhpcy5vblF1YXJ0ZXJNb3VzZUVudGVyKHEpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRRdWFydGVyQ2xhc3NOYW1lcyhxKX1cbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFF1YXJ0ZXIoZGF5LCBxLCBzZWxlY3RlZCl9XG4gICAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRRdWFydGVyVGFiSW5kZXgocSl9XG4gICAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3RoaXMuaXNDdXJyZW50UXVhcnRlcihkYXksIHEpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMuZ2V0UXVhcnRlckNvbnRlbnQocSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBnZXRDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGluZ0RhdGUsXG4gICAgICBzZWxlY3RzU3RhcnQsXG4gICAgICBzZWxlY3RzRW5kLFxuICAgICAgc2hvd01vbnRoWWVhclBpY2tlcixcbiAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcixcbiAgICAgIHNob3dXZWVrUGlja2VyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoXCIsXG4gICAgICB7XG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHNlbGVjdGluZ0RhdGUgJiYgKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kKSxcbiAgICAgIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGhQaWNrZXJcIjogc2hvd01vbnRoWWVhclBpY2tlciB9LFxuICAgICAgeyBcInJlYWN0LWRhdGVwaWNrZXJfX3F1YXJ0ZXJQaWNrZXJcIjogc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIH0sXG4gICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fd2Vla1BpY2tlclwiOiBzaG93V2Vla1BpY2tlciB9LFxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNob3dNb250aFllYXJQaWNrZXIsXG4gICAgICBzaG93UXVhcnRlclllYXJQaWNrZXIsXG4gICAgICBkYXksXG4gICAgICBhcmlhTGFiZWxQcmVmaXggPSBcIk1vbnRoIFwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkQXJpYUxhYmVsUHJlZml4ID0gYXJpYUxhYmVsUHJlZml4XG4gICAgICA/IGFyaWFMYWJlbFByZWZpeC50cmltKCkgKyBcIiBcIlxuICAgICAgOiBcIlwiO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtcbiAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnQgPyB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBhcmlhLWxhYmVsPXtgJHtmb3JtYXR0ZWRBcmlhTGFiZWxQcmVmaXh9JHt1dGlscy5mb3JtYXREYXRlKGRheSwgXCJNTU1NLCB5eXl5XCIpfWB9XG4gICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgID5cbiAgICAgICAge3Nob3dNb250aFllYXJQaWNrZXJcbiAgICAgICAgICA/IHRoaXMucmVuZGVyTW9udGhzKClcbiAgICAgICAgICA6IHNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICAgICAgPyB0aGlzLnJlbmRlclF1YXJ0ZXJzKClcbiAgICAgICAgICAgIDogdGhpcy5yZW5kZXJXZWVrcygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHtcbiAgZ2V0SG91cnMsXG4gIGdldE1pbnV0ZXMsXG4gIG5ld0RhdGUsXG4gIGdldFN0YXJ0T2ZEYXksXG4gIGFkZE1pbnV0ZXMsXG4gIGZvcm1hdERhdGUsXG4gIGlzVGltZUluRGlzYWJsZWRSYW5nZSxcbiAgaXNUaW1lRGlzYWJsZWQsXG4gIHRpbWVzVG9JbmplY3RBZnRlcixcbiAgZ2V0SG91cnNJbkRheSxcbiAgaXNTYW1lTWludXRlLFxufSBmcm9tIFwiLi9kYXRlX3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRTZWNvbmRzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJ2YWxzOiAzMCxcbiAgICAgIG9uVGltZUNoYW5nZTogKCkgPT4ge30sXG4gICAgICB0b2RheUJ1dHRvbjogbnVsbCxcbiAgICAgIHRpbWVDYXB0aW9uOiBcIlRpbWVcIixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNhbGNDZW50ZXJQb3NpdGlvbiA9IChsaXN0SGVpZ2h0LCBjZW50ZXJMaVJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICBjZW50ZXJMaVJlZi5vZmZzZXRUb3AgLSAobGlzdEhlaWdodCAvIDIgLSBjZW50ZXJMaVJlZi5jbGllbnRIZWlnaHQgLyAyKVxuICAgICk7XG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvcGVuVG9EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdG9kYXlCdXR0b246IFByb3BUeXBlcy5ub2RlLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG1vbnRoUmVmOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7IGxvY2FsZTogUHJvcFR5cGVzLm9iamVjdCB9KSxcbiAgICBdKSxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGhlaWdodDogbnVsbCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBjb2RlIHRvIGVuc3VyZSBzZWxlY3RlZCB0aW1lIHdpbGwgYWx3YXlzIGJlIGluIGZvY3VzIHdpdGhpbiB0aW1lIHdpbmRvdyB3aGVuIGl0IGZpcnN0IGFwcGVhcnNcbiAgICB0aGlzLnNjcm9sbFRvVGhlU2VsZWN0ZWRUaW1lKCk7XG4gICAgaWYgKHRoaXMucHJvcHMubW9udGhSZWYgJiYgdGhpcy5oZWFkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMubW9udGhSZWYuY2xpZW50SGVpZ2h0IC0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9UaGVTZWxlY3RlZFRpbWUgPSAoKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5saXN0KSByZXR1cm47XG5cbiAgICAgIHRoaXMubGlzdC5zY3JvbGxUb3AgPVxuICAgICAgICB0aGlzLmNlbnRlckxpICYmXG4gICAgICAgIFRpbWUuY2FsY0NlbnRlclBvc2l0aW9uKFxuICAgICAgICAgIHRoaXMucHJvcHMubW9udGhSZWZcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5tb250aFJlZi5jbGllbnRIZWlnaHQgLSB0aGlzLmhlYWRlci5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5saXN0LmNsaWVudEhlaWdodCxcbiAgICAgICAgICB0aGlzLmNlbnRlckxpLFxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsaWNrID0gKHRpbWUpID0+IHtcbiAgICBpZiAoXG4gICAgICAoKHRoaXMucHJvcHMubWluVGltZSB8fCB0aGlzLnByb3BzLm1heFRpbWUpICYmXG4gICAgICAgIGlzVGltZUluRGlzYWJsZWRSYW5nZSh0aW1lLCB0aGlzLnByb3BzKSkgfHxcbiAgICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5pbmNsdWRlVGltZXMgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJUaW1lKSAmJlxuICAgICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aW1lKTtcbiAgfTtcblxuICBpc1NlbGVjdGVkVGltZSA9ICh0aW1lKSA9PlxuICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQgJiYgaXNTYW1lTWludXRlKHRoaXMucHJvcHMuc2VsZWN0ZWQsIHRpbWUpO1xuXG4gIGlzRGlzYWJsZWRUaW1lID0gKHRpbWUpID0+XG4gICAgKCh0aGlzLnByb3BzLm1pblRpbWUgfHwgdGhpcy5wcm9wcy5tYXhUaW1lKSAmJlxuICAgICAgaXNUaW1lSW5EaXNhYmxlZFJhbmdlKHRpbWUsIHRoaXMucHJvcHMpKSB8fFxuICAgICgodGhpcy5wcm9wcy5leGNsdWRlVGltZXMgfHxcbiAgICAgIHRoaXMucHJvcHMuaW5jbHVkZVRpbWVzIHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlclRpbWUpICYmXG4gICAgICBpc1RpbWVEaXNhYmxlZCh0aW1lLCB0aGlzLnByb3BzKSk7XG5cbiAgbGlDbGFzc2VzID0gKHRpbWUpID0+IHtcbiAgICBsZXQgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW1cIixcbiAgICAgIHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSA/IHRoaXMucHJvcHMudGltZUNsYXNzTmFtZSh0aW1lKSA6IHVuZGVmaW5lZCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX3RpbWUtbGlzdC1pdGVtLS1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkVGltZSh0aW1lKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWRpc2FibGVkXCIpO1xuICAgIH1cblxuICAgIC8vY29udmVydCB0aGlzLnByb3BzLmludGVydmFscyBhbmQgdGhlIHJlbGV2YW50IHRpbWUgdG8gc2Vjb25kcyBhbmQgY2hlY2sgaWYgaXQgaXQncyBhIGNsZWFuIG11bHRpcGxlIG9mIHRoZSBpbnRlcnZhbFxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuaW5qZWN0VGltZXMgJiZcbiAgICAgIChnZXRIb3Vycyh0aW1lKSAqIDM2MDAgKyBnZXRNaW51dGVzKHRpbWUpICogNjAgKyBnZXRTZWNvbmRzKHRpbWUpKSAlXG4gICAgICAgICh0aGlzLnByb3BzLmludGVydmFscyAqIDYwKSAhPT1cbiAgICAgICAgMFxuICAgICkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1saXN0LWl0ZW0tLWluamVjdGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIGhhbmRsZU9uS2V5RG93biA9IChldmVudCwgdGltZSkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQua2V5ID0gXCJFbnRlclwiO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC50YXJnZXQucHJldmlvdXNTaWJsaW5nLmZvY3VzKCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIikgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZ1xuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnRhcmdldC5uZXh0U2libGluZy5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgdGhpcy5oYW5kbGVDbGljayh0aW1lKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbktleURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHJlbmRlclRpbWVzID0gKCkgPT4ge1xuICAgIGxldCB0aW1lcyA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMucHJvcHMuZm9ybWF0ID8gdGhpcy5wcm9wcy5mb3JtYXQgOiBcInBcIjtcbiAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLnByb3BzLmludGVydmFscztcblxuICAgIGNvbnN0IGFjdGl2ZURhdGUgPVxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCB8fCB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgfHwgbmV3RGF0ZSgpO1xuXG4gICAgY29uc3QgYmFzZSA9IGdldFN0YXJ0T2ZEYXkoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3Qgc29ydGVkSW5qZWN0VGltZXMgPVxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcyAmJlxuICAgICAgdGhpcy5wcm9wcy5pbmplY3RUaW1lcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgbWludXRlc0luRGF5ID0gNjAgKiBnZXRIb3Vyc0luRGF5KGFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBtaW51dGVzSW5EYXkgLyBpbnRlcnZhbHM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11bHRpcGxpZXI7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBhZGRNaW51dGVzKGJhc2UsIGkgKiBpbnRlcnZhbHMpO1xuICAgICAgdGltZXMucHVzaChjdXJyZW50VGltZSk7XG5cbiAgICAgIGlmIChzb3J0ZWRJbmplY3RUaW1lcykge1xuICAgICAgICBjb25zdCB0aW1lc1RvSW5qZWN0ID0gdGltZXNUb0luamVjdEFmdGVyKFxuICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgY3VycmVudFRpbWUsXG4gICAgICAgICAgaSxcbiAgICAgICAgICBpbnRlcnZhbHMsXG4gICAgICAgICAgc29ydGVkSW5qZWN0VGltZXMsXG4gICAgICAgICk7XG4gICAgICAgIHRpbWVzID0gdGltZXMuY29uY2F0KHRpbWVzVG9JbmplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERldGVybWluZSB3aGljaCB0aW1lIHRvIGZvY3VzIGFuZCBzY3JvbGwgaW50byB2aWV3IHdoZW4gY29tcG9uZW50IG1vdW50c1xuICAgIGNvbnN0IHRpbWVUb0ZvY3VzID0gdGltZXMucmVkdWNlKChwcmV2LCB0aW1lKSA9PiB7XG4gICAgICBpZiAodGltZS5nZXRUaW1lKCkgPD0gYWN0aXZlRGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aW1lc1swXSk7XG5cbiAgICByZXR1cm4gdGltZXMubWFwKCh0aW1lLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGlcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRpbWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5saUNsYXNzZXModGltZSl9XG4gICAgICAgICAgcmVmPXsobGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lID09PSB0aW1lVG9Gb2N1cykge1xuICAgICAgICAgICAgICB0aGlzLmNlbnRlckxpID0gbGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPbktleURvd24oZXYsIHRpbWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9e3RpbWUgPT09IHRpbWVUb0ZvY3VzID8gMCA6IC0xfVxuICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZFRpbWUodGltZSkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLmlzRGlzYWJsZWRUaW1lKHRpbWUpID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7Zm9ybWF0RGF0ZSh0aW1lLCBmb3JtYXQsIHRoaXMucHJvcHMubG9jYWxlKX1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXIgJHtcbiAgICAgICAgICB0aGlzLnByb3BzLnRvZGF5QnV0dG9uXG4gICAgICAgICAgICA/IFwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1jb250YWluZXItLXdpdGgtdG9kYXktYnV0dG9uXCJcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUgJHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLXRpbWUtLW9ubHlcIlxuICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICB9YH1cbiAgICAgICAgICByZWY9eyhoZWFkZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faGVhZGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lQ2FwdGlvbn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGltZS1ib3hcIj5cbiAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190aW1lLWxpc3RcIlxuICAgICAgICAgICAgICByZWY9eyhsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgc3R5bGU9e2hlaWdodCA/IHsgaGVpZ2h0IH0gOiB7fX1cbiAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lcygpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBnZXRZZWFyLCBuZXdEYXRlIH0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNsZWFyU2VsZWN0aW5nRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG9uRGF5Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZVNlbGVjdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHVzZVBvaW50ZXJFdmVudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblllYXJNb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGluZ0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RzRW5kOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzU3RhcnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNSYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJJdGVtTnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGhhbmRsZU9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeWVhckNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBZRUFSX1JFRlMgPSBbLi4uQXJyYXkodGhpcy5wcm9wcy55ZWFySXRlbU51bWJlcildLm1hcCgoKSA9PlxuICAgIFJlYWN0LmNyZWF0ZVJlZigpLFxuICApO1xuXG4gIGlzRGlzYWJsZWQgPSAoZGF0ZSkgPT4gdXRpbHMuaXNEYXlEaXNhYmxlZChkYXRlLCB0aGlzLnByb3BzKTtcblxuICBpc0V4Y2x1ZGVkID0gKGRhdGUpID0+IHV0aWxzLmlzRGF5RXhjbHVkZWQoZGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgc2VsZWN0aW5nRGF0ZSA9ICgpID0+IHRoaXMucHJvcHMuc2VsZWN0aW5nRGF0ZSA/PyB0aGlzLnByb3BzLnByZVNlbGVjdGlvbjtcblxuICB1cGRhdGVGb2N1c09uUGFnaW5hdGUgPSAocmVmSW5kZXgpID0+IHtcbiAgICBjb25zdCB3YWl0Rm9yUmVSZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLllFQVJfUkVGU1tyZWZJbmRleF0uY3VycmVudC5mb2N1cygpO1xuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUod2FpdEZvclJlUmVuZGVyKTtcbiAgfTtcblxuICBoYW5kbGVZZWFyQ2xpY2sgPSAoZGF5LCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGF5Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25EYXlDbGljayhkYXksIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlWWVhck5hdmlnYXRpb24gPSAobmV3WWVhciwgbmV3RGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZSwgeWVhckl0ZW1OdW1iZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCB9ID0gdXRpbHMuZ2V0WWVhcnNQZXJpb2QoZGF0ZSwgeWVhckl0ZW1OdW1iZXIpO1xuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZChuZXdEYXRlKSB8fCB0aGlzLmlzRXhjbHVkZWQobmV3RGF0ZSkpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihuZXdEYXRlKTtcblxuICAgIGlmIChuZXdZZWFyIC0gc3RhcnRQZXJpb2QgPT09IC0xKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZvY3VzT25QYWdpbmF0ZSh5ZWFySXRlbU51bWJlciAtIDEpO1xuICAgIH0gZWxzZSBpZiAobmV3WWVhciAtIHN0YXJ0UGVyaW9kID09PSB5ZWFySXRlbU51bWJlcikge1xuICAgICAgdGhpcy51cGRhdGVGb2N1c09uUGFnaW5hdGUoMCk7XG4gICAgfSBlbHNlIHRoaXMuWUVBUl9SRUZTW25ld1llYXIgLSBzdGFydFBlcmlvZF0uY3VycmVudC5mb2N1cygpO1xuICB9O1xuXG4gIGlzU2FtZURheSA9ICh5LCBvdGhlcikgPT4gdXRpbHMuaXNTYW1lRGF5KHksIG90aGVyKTtcblxuICBpc0N1cnJlbnRZZWFyID0gKHkpID0+IHkgPT09IGdldFllYXIobmV3RGF0ZSgpKTtcblxuICBpc1JhbmdlU3RhcnQgPSAoeSkgPT5cbiAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSAmJlxuICAgIHRoaXMucHJvcHMuZW5kRGF0ZSAmJlxuICAgIHV0aWxzLmlzU2FtZVllYXIodXRpbHMuc2V0WWVhcihuZXdEYXRlKCksIHkpLCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSk7XG5cbiAgaXNSYW5nZUVuZCA9ICh5KSA9PlxuICAgIHRoaXMucHJvcHMuc3RhcnREYXRlICYmXG4gICAgdGhpcy5wcm9wcy5lbmREYXRlICYmXG4gICAgdXRpbHMuaXNTYW1lWWVhcih1dGlscy5zZXRZZWFyKG5ld0RhdGUoKSwgeSksIHRoaXMucHJvcHMuZW5kRGF0ZSk7XG5cbiAgaXNJblJhbmdlID0gKHkpID0+XG4gICAgdXRpbHMuaXNZZWFySW5SYW5nZSh5LCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSwgdGhpcy5wcm9wcy5lbmREYXRlKTtcblxuICBpc0luU2VsZWN0aW5nUmFuZ2UgPSAoeSkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhKHNlbGVjdHNTdGFydCB8fCBzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkgfHxcbiAgICAgICF0aGlzLnNlbGVjdGluZ0RhdGUoKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0c1N0YXJ0ICYmIGVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHRoaXMuc2VsZWN0aW5nRGF0ZSgpLCBlbmREYXRlKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNFbmQgJiYgc3RhcnREYXRlKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaXNZZWFySW5SYW5nZSh5LCBzdGFydERhdGUsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdHNSYW5nZSAmJiBzdGFydERhdGUgJiYgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1llYXJJblJhbmdlKHksIHN0YXJ0RGF0ZSwgdGhpcy5zZWxlY3RpbmdEYXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaXNTZWxlY3RpbmdSYW5nZVN0YXJ0ID0gKHkpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBzdGFydERhdGUsIHNlbGVjdHNTdGFydCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzU3RhcnQpIHtcbiAgICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCB0aGlzLnNlbGVjdGluZ0RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB1dGlscy5pc1NhbWVZZWFyKF95ZWFyLCBzdGFydERhdGUpO1xuICB9O1xuXG4gIGlzU2VsZWN0aW5nUmFuZ2VFbmQgPSAoeSkgPT4ge1xuICAgIGlmICghdGhpcy5pc0luU2VsZWN0aW5nUmFuZ2UoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGVuZERhdGUsIHNlbGVjdHNFbmQsIHNlbGVjdHNSYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBfeWVhciA9IHV0aWxzLnNldFllYXIobmV3RGF0ZSgpLCB5KTtcblxuICAgIGlmIChzZWxlY3RzRW5kIHx8IHNlbGVjdHNSYW5nZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIHRoaXMuc2VsZWN0aW5nRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLmlzU2FtZVllYXIoX3llYXIsIGVuZERhdGUpO1xuICB9O1xuXG4gIGlzS2V5Ym9hcmRTZWxlY3RlZCA9ICh5KSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IHV0aWxzLmdldFN0YXJ0T2ZZZWFyKHV0aWxzLnNldFllYXIodGhpcy5wcm9wcy5kYXRlLCB5KSk7XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5zZWxlY3RlZCkpICYmXG4gICAgICB1dGlscy5pc1NhbWVEYXkoZGF0ZSwgdXRpbHMuZ2V0U3RhcnRPZlllYXIodGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24pKVxuICAgICk7XG4gIH07XG5cbiAgb25ZZWFyQ2xpY2sgPSAoZSwgeSkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLmhhbmRsZVllYXJDbGljayh1dGlscy5nZXRTdGFydE9mWWVhcih1dGlscy5zZXRZZWFyKGRhdGUsIHkpKSwgZSk7XG4gIH07XG5cbiAgb25ZZWFyS2V5RG93biA9IChlLCB5KSA9PiB7XG4gICAgY29uc3QgeyBrZXkgfSA9IGU7XG4gICAgY29uc3QgeyBoYW5kbGVPbktleURvd24gfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgICAgIHRoaXMub25ZZWFyQ2xpY2soZSwgeSk7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24odGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVZZWFyTmF2aWdhdGlvbihcbiAgICAgICAgICAgIHkgKyAxLFxuICAgICAgICAgICAgdXRpbHMuYWRkWWVhcnModGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sIDEpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICB0aGlzLmhhbmRsZVllYXJOYXZpZ2F0aW9uKFxuICAgICAgICAgICAgeSAtIDEsXG4gICAgICAgICAgICB1dGlscy5zdWJZZWFycyh0aGlzLnByb3BzLnByZVNlbGVjdGlvbiwgMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbktleURvd24gJiYgaGFuZGxlT25LZXlEb3duKGUpO1xuICB9O1xuXG4gIGdldFllYXJDbGFzc05hbWVzID0gKHkpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRlLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIGV4Y2x1ZGVEYXRlcyxcbiAgICAgIGluY2x1ZGVEYXRlcyxcbiAgICAgIGZpbHRlckRhdGUsXG4gICAgICB5ZWFyQ2xhc3NOYW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGNsc3goXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dFwiLFxuICAgICAgYHJlYWN0LWRhdGVwaWNrZXJfX3llYXItJHt5fWAsXG4gICAgICB5ZWFyQ2xhc3NOYW1lID8geWVhckNsYXNzTmFtZSh1dGlscy5zZXRZZWFyKGRhdGUsIHkpKSA6IHVuZGVmaW5lZCxcbiAgICAgIHtcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXNlbGVjdGVkXCI6IHkgPT09IGdldFllYXIoc2VsZWN0ZWQpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tZGlzYWJsZWRcIjpcbiAgICAgICAgICAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IGV4Y2x1ZGVEYXRlcyB8fCBpbmNsdWRlRGF0ZXMgfHwgZmlsdGVyRGF0ZSkgJiZcbiAgICAgICAgICB1dGlscy5pc1llYXJEaXNhYmxlZCh5LCB0aGlzLnByb3BzKSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWtleWJvYXJkLXNlbGVjdGVkXCI6XG4gICAgICAgICAgdGhpcy5pc0tleWJvYXJkU2VsZWN0ZWQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1yYW5nZS1zdGFydFwiOiB0aGlzLmlzUmFuZ2VTdGFydCh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLXJhbmdlLWVuZFwiOiB0aGlzLmlzUmFuZ2VFbmQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1pbi1yYW5nZVwiOiB0aGlzLmlzSW5SYW5nZSh5KSxcbiAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXRleHQtLWluLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICAgIHRoaXMuaXNJblNlbGVjdGluZ1JhbmdlKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tc2VsZWN0aW5nLXJhbmdlLXN0YXJ0XCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlU3RhcnQoeSksXG4gICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci10ZXh0LS1zZWxlY3RpbmctcmFuZ2UtZW5kXCI6XG4gICAgICAgICAgdGhpcy5pc1NlbGVjdGluZ1JhbmdlRW5kKHkpLFxuICAgICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItdGV4dC0tdG9kYXlcIjogdGhpcy5pc0N1cnJlbnRZZWFyKHkpLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGdldFllYXJUYWJJbmRleCA9ICh5KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb24pIHJldHVybiBcIi0xXCI7XG4gICAgY29uc3QgcHJlU2VsZWN0ZWQgPSB1dGlscy5nZXRZZWFyKHRoaXMucHJvcHMucHJlU2VsZWN0aW9uKTtcblxuICAgIHJldHVybiB5ID09PSBwcmVTZWxlY3RlZCA/IFwiMFwiIDogXCItMVwiO1xuICB9O1xuXG4gIGdldFllYXJDb250YWluZXJDbGFzc05hbWVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW5nRGF0ZSwgc2VsZWN0c1N0YXJ0LCBzZWxlY3RzRW5kLCBzZWxlY3RzUmFuZ2UgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlcl9feWVhclwiLCB7XG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItLXNlbGVjdGluZy1yYW5nZVwiOlxuICAgICAgICBzZWxlY3RpbmdEYXRlICYmIChzZWxlY3RzU3RhcnQgfHwgc2VsZWN0c0VuZCB8fCBzZWxlY3RzUmFuZ2UpLFxuICAgIH0pO1xuICB9O1xuXG4gIGdldFllYXJDb250ZW50ID0gKHkpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJZZWFyQ29udGVudCA/IHRoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnQoeSkgOiB5O1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB5ZWFyc0xpc3QgPSBbXTtcbiAgICBjb25zdCB7IGRhdGUsIHllYXJJdGVtTnVtYmVyLCBvblllYXJNb3VzZUVudGVyLCBvblllYXJNb3VzZUxlYXZlIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHN0YXJ0UGVyaW9kLCBlbmRQZXJpb2QgfSA9IHV0aWxzLmdldFllYXJzUGVyaW9kKFxuICAgICAgZGF0ZSxcbiAgICAgIHllYXJJdGVtTnVtYmVyLFxuICAgICk7XG5cbiAgICBmb3IgKGxldCB5ID0gc3RhcnRQZXJpb2Q7IHkgPD0gZW5kUGVyaW9kOyB5KyspIHtcbiAgICAgIHllYXJzTGlzdC5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXt0aGlzLllFQVJfUkVGU1t5IC0gc3RhcnRQZXJpb2RdfVxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblllYXJDbGljayhldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3BhY2VLZXlEb3duKGV2KSkge1xuICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBldi5rZXkgPSBcIkVudGVyXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25ZZWFyS2V5RG93bihldiwgeSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17dGhpcy5nZXRZZWFyVGFiSW5kZXgoeSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldFllYXJDbGFzc05hbWVzKHkpfVxuICAgICAgICAgIG9uTW91c2VFbnRlcj17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyAoZXYpID0+IG9uWWVhck1vdXNlRW50ZXIoZXYsIHkpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUG9pbnRlckVudGVyPXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUVudGVyKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e1xuICAgICAgICAgICAgIXRoaXMucHJvcHMudXNlUG9pbnRlckV2ZW50XG4gICAgICAgICAgICAgID8gKGV2KSA9PiBvblllYXJNb3VzZUxlYXZlKGV2LCB5KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IChldikgPT4gb25ZZWFyTW91c2VMZWF2ZShldiwgeSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5PXt5fVxuICAgICAgICAgIGFyaWEtY3VycmVudD17dGhpcy5pc0N1cnJlbnRZZWFyKHkpID8gXCJkYXRlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5nZXRZZWFyQ29udGVudCh5KX1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMoKX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX195ZWFyLXdyYXBwZXJcIlxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17XG4gICAgICAgICAgICAhdGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnRcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmNsZWFyU2VsZWN0aW5nRGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudFxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2xlYXJTZWxlY3RpbmdEYXRlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICA+XG4gICAgICAgICAge3llYXJzTGlzdH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGlucHV0VGltZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHRpbWVTdHJpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUlucHV0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tVGltZUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aW1lOiB0aGlzLnByb3BzLnRpbWVTdHJpbmcsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgaWYgKHByb3BzLnRpbWVTdHJpbmcgIT09IHN0YXRlLnRpbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpbWU6IHByb3BzLnRpbWVTdHJpbmcsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFJldHVybiBudWxsIHRvIGluZGljYXRlIG5vIGNoYW5nZSB0byBzdGF0ZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uVGltZUNoYW5nZSA9ICh0aW1lKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRpbWUgfSk7XG5cbiAgICBjb25zdCB7IGRhdGU6IHByb3BEYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzUHJvcERhdGVWYWxpZCA9IHByb3BEYXRlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ocHJvcERhdGUpO1xuICAgIGNvbnN0IGRhdGUgPSBpc1Byb3BEYXRlVmFsaWQgPyBwcm9wRGF0ZSA6IG5ldyBEYXRlKCk7XG5cbiAgICBkYXRlLnNldEhvdXJzKHRpbWUuc3BsaXQoXCI6XCIpWzBdKTtcbiAgICBkYXRlLnNldE1pbnV0ZXModGltZS5zcGxpdChcIjpcIilbMV0pO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShkYXRlKTtcbiAgfTtcblxuICByZW5kZXJUaW1lSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGF0ZSwgdGltZVN0cmluZywgY3VzdG9tVGltZUlucHV0IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGN1c3RvbVRpbWVJbnB1dCkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjdXN0b21UaW1lSW5wdXQsIHtcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgdmFsdWU6IHRpbWUsXG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uVGltZUNoYW5nZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRpbWVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2lucHV0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJUaW1lXCJcbiAgICAgICAgbmFtZT1cInRpbWUtaW5wdXRcIlxuICAgICAgICByZXF1aXJlZFxuICAgICAgICB2YWx1ZT17dGltZX1cbiAgICAgICAgb25DaGFuZ2U9eyhldikgPT4ge1xuICAgICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKGV2LnRhcmdldC52YWx1ZSB8fCB0aW1lU3RyaW5nKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9faW5wdXQtdGltZS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyLXRpbWVfX2NhcHRpb25cIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy50aW1lSW5wdXRMYWJlbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlci10aW1lX19pbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXItdGltZV9faW5wdXRcIj5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVJbnB1dCgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXJDb250YWluZXIoe1xuICBzaG93VGltZVNlbGVjdE9ubHkgPSBmYWxzZSxcbiAgc2hvd1RpbWUgPSBmYWxzZSxcbiAgY2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbn0pIHtcbiAgbGV0IGFyaWFMYWJlbCA9IHNob3dUaW1lU2VsZWN0T25seVxuICAgID8gXCJDaG9vc2UgVGltZVwiXG4gICAgOiBgQ2hvb3NlIERhdGUke3Nob3dUaW1lID8gXCIgYW5kIFRpbWVcIiA6IFwiXCJ9YDtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5DYWxlbmRhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59O1xuIiwiaW1wb3J0IFllYXJEcm9wZG93biBmcm9tIFwiLi95ZWFyX2Ryb3Bkb3duXCI7XG5pbXBvcnQgTW9udGhEcm9wZG93biBmcm9tIFwiLi9tb250aF9kcm9wZG93blwiO1xuaW1wb3J0IE1vbnRoWWVhckRyb3Bkb3duIGZyb20gXCIuL21vbnRoX3llYXJfZHJvcGRvd25cIjtcbmltcG9ydCBNb250aCBmcm9tIFwiLi9tb250aFwiO1xuaW1wb3J0IFRpbWUgZnJvbSBcIi4vdGltZVwiO1xuaW1wb3J0IFllYXIgZnJvbSBcIi4veWVhclwiO1xuaW1wb3J0IElucHV0VGltZSBmcm9tIFwiLi9pbnB1dFRpbWVcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNsc3ggfSBmcm9tIFwiY2xzeFwiO1xuaW1wb3J0IENhbGVuZGFyQ29udGFpbmVyIGZyb20gXCIuL2NhbGVuZGFyX2NvbnRhaW5lclwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgc2V0TW9udGgsXG4gIGdldE1vbnRoLFxuICBhZGRNb250aHMsXG4gIHN1Yk1vbnRocyxcbiAgZ2V0U3RhcnRPZldlZWssXG4gIGdldFN0YXJ0T2ZUb2RheSxcbiAgYWRkRGF5cyxcbiAgZm9ybWF0RGF0ZSxcbiAgc2V0WWVhcixcbiAgZ2V0WWVhcixcbiAgaXNCZWZvcmUsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNBZnRlcixcbiAgZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlLFxuICBnZXRXZWVrZGF5U2hvcnRJbkxvY2FsZSxcbiAgZ2V0V2Vla2RheU1pbkluTG9jYWxlLFxuICBpc1NhbWVEYXksXG4gIGlzU2FtZU1vbnRoLFxuICBtb250aERpc2FibGVkQmVmb3JlLFxuICBtb250aERpc2FibGVkQWZ0ZXIsXG4gIHllYXJEaXNhYmxlZEJlZm9yZSxcbiAgeWVhckRpc2FibGVkQWZ0ZXIsXG4gIHllYXJzRGlzYWJsZWRBZnRlcixcbiAgeWVhcnNEaXNhYmxlZEJlZm9yZSxcbiAgcXVhcnRlckRpc2FibGVkQmVmb3JlLFxuICBxdWFydGVyRGlzYWJsZWRBZnRlcixcbiAgZ2V0RWZmZWN0aXZlTWluRGF0ZSxcbiAgZ2V0RWZmZWN0aXZlTWF4RGF0ZSxcbiAgYWRkWmVybyxcbiAgaXNWYWxpZCxcbiAgZ2V0WWVhcnNQZXJpb2QsXG4gIERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgZ2V0TW9udGhJbkxvY2FsZSxcbn0gZnJvbSBcIi4vZGF0ZV91dGlsc1wiO1xuXG5jb25zdCBEUk9QRE9XTl9GT0NVU19DTEFTU05BTUVTID0gW1xuICBcInJlYWN0LWRhdGVwaWNrZXJfX3llYXItc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgtc2VsZWN0XCIsXG4gIFwicmVhY3QtZGF0ZXBpY2tlcl9fbW9udGgteWVhci1zZWxlY3RcIixcbl07XG5cbmNvbnN0IGlzRHJvcGRvd25TZWxlY3QgPSAoZWxlbWVudCA9IHt9KSA9PiB7XG4gIGNvbnN0IGNsYXNzTmFtZXMgPSAoZWxlbWVudC5jbGFzc05hbWUgfHwgXCJcIikuc3BsaXQoL1xccysvKTtcbiAgcmV0dXJuIERST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMuc29tZShcbiAgICAodGVzdENsYXNzbmFtZSkgPT4gY2xhc3NOYW1lcy5pbmRleE9mKHRlc3RDbGFzc25hbWUpID49IDAsXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvbkRyb3Bkb3duRm9jdXM6ICgpID0+IHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw6IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHByZXZpb3VzTW9udGhCdXR0b25MYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgY3VzdG9tVGltZUlucHV0OiBudWxsLFxuICAgICAgeWVhckl0ZW1OdW1iZXI6IERFRkFVTFRfWUVBUl9JVEVNX05VTUJFUixcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGp1c3REYXRlT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGF0ZUZvcm1hdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSlcbiAgICAgIC5pc1JlcXVpcmVkLFxuICAgIGRheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2Vla0RheUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHllYXJDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSksXG4gICAgZW5kRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgZXhjbHVkZURhdGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICBleGNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGZpbHRlckRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpeGVkSGVpZ2h0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrTnVtYmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoaWdobGlnaHREYXRlczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKSxcbiAgICBpbmNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmNsdWRlRGF0ZUludGVydmFsczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICAgIGVuZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgICB9KSxcbiAgICApLFxuICAgIGluY2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluamVjdFRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5saW5lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG91bGRGb2N1c0RheUlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoeyBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QgfSksXG4gICAgXSksXG4gICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgbW9udGhzU2hvd246IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbW9udGhTZWxlY3RlZEluOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5leHRNb250aEFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25Ecm9wZG93bkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbldlZWtTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dUaW1lU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZVNlbGVjdE9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGltZUludGVydmFsczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblRpbWVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wZW5Ub0RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIHBlZWtOZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICB0b2RheUJ1dHRvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3aXRoUG9ydGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzZXRPcGVuOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB1c2VTaG9ydE1vbnRoSW5Ecm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIG5leHRNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB1c2VQb2ludGVyRXZlbnQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uRGF5TW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb250aE1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uWWVhck1vdXNlTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dQb3BwZXJBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGFuZGxlT25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYW5kbGVPbkRheUtleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIGlzSW5wdXRGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0UHJlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuY29udGFpbmVyUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGF0ZTogdGhpcy5nZXREYXRlSW5WaWV3KCksXG4gICAgICBzZWxlY3RpbmdEYXRlOiBudWxsLFxuICAgICAgbW9udGhDb250YWluZXI6IG51bGwsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIG1vbnRoQ29udGFpbmVyIGhlaWdodCBpcyBuZWVkZWQgaW4gdGltZSBjb21wb25lbnRcbiAgICAvLyB0byBkZXRlcm1pbmUgdGhlIGhlaWdodCBmb3IgdGhlIHVsIGluIHRoZSB0aW1lIGNvbXBvbmVudFxuICAgIC8vIHNldFN0YXRlIGhlcmUgc28gaGVpZ2h0IGlzIGdpdmVuIGFmdGVyIGZpbmFsIGNvbXBvbmVudFxuICAgIC8vIGxheW91dCBpcyByZW5kZXJlZFxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0KSB7XG4gICAgICB0aGlzLmFzc2lnbk1vbnRoQ29udGFpbmVyID0gKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vbnRoQ29udGFpbmVyOiB0aGlzLm1vbnRoQ29udGFpbmVyIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24gJiZcbiAgICAgICghaXNTYW1lRGF5KHRoaXMucHJvcHMucHJlU2VsZWN0aW9uLCBwcmV2UHJvcHMucHJlU2VsZWN0aW9uKSB8fFxuICAgICAgICB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiAhPT0gcHJldlByb3BzLm1vbnRoU2VsZWN0ZWRJbilcbiAgICApIHtcbiAgICAgIGNvbnN0IGhhc01vbnRoQ2hhbmdlZCA9ICFpc1NhbWVNb250aChcbiAgICAgICAgdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICB0aGlzLnByb3BzLnByZVNlbGVjdGlvbixcbiAgICAgICk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICB7XG4gICAgICAgICAgZGF0ZTogdGhpcy5wcm9wcy5wcmVTZWxlY3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IGhhc01vbnRoQ2hhbmdlZCAmJiB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGUgJiZcbiAgICAgICFpc1NhbWVEYXkodGhpcy5wcm9wcy5vcGVuVG9EYXRlLCBwcmV2UHJvcHMub3BlblRvRGF0ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRlOiB0aGlzLnByb3BzLm9wZW5Ub0RhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgfTtcblxuICBzZXRDbGlja091dHNpZGVSZWYgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGlmIChpc0Ryb3Bkb3duU2VsZWN0KGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGdldERhdGVJblZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcmVTZWxlY3Rpb24sIHNlbGVjdGVkLCBvcGVuVG9EYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1pbkRhdGUgPSBnZXRFZmZlY3RpdmVNaW5EYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IG1heERhdGUgPSBnZXRFZmZlY3RpdmVNYXhEYXRlKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBuZXdEYXRlKCk7XG4gICAgY29uc3QgaW5pdGlhbERhdGUgPSBvcGVuVG9EYXRlIHx8IHNlbGVjdGVkIHx8IHByZVNlbGVjdGlvbjtcbiAgICBpZiAoaW5pdGlhbERhdGUpIHtcbiAgICAgIHJldHVybiBpbml0aWFsRGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1pbkRhdGUgJiYgaXNCZWZvcmUoY3VycmVudCwgbWluRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1pbkRhdGU7XG4gICAgICB9IGVsc2UgaWYgKG1heERhdGUgJiYgaXNBZnRlcihjdXJyZW50LCBtYXhEYXRlKSkge1xuICAgICAgICByZXR1cm4gbWF4RGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH07XG5cbiAgaW5jcmVhc2VNb250aCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRNb250aHMoZGF0ZSwgMSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICApO1xuICB9O1xuXG4gIGRlY3JlYXNlTW9udGggPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc3ViTW9udGhzKGRhdGUsIDEpLFxuICAgICAgfSksXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZU1vbnRoQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVEYXlDbGljayA9IChkYXksIGV2ZW50LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGRheSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbik7XG4gICAgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24gJiYgdGhpcy5wcm9wcy5zZXRQcmVTZWxlY3Rpb24oZGF5KTtcbiAgfTtcblxuICBoYW5kbGVEYXlNb3VzZUVudGVyID0gKGRheSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RpbmdEYXRlOiBkYXkgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIgJiYgdGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXIoZGF5KTtcbiAgfTtcblxuICBoYW5kbGVNb250aE1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gICAgdGhpcy5wcm9wcy5vbk1vbnRoTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlKCk7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlRW50ZXIgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW5nRGF0ZTogc2V0WWVhcihuZXdEYXRlKCksIHllYXIpIH0pO1xuICAgICEhdGhpcy5wcm9wcy5vblllYXJNb3VzZUVudGVyICYmIHRoaXMucHJvcHMub25ZZWFyTW91c2VFbnRlcihldmVudCwgeWVhcik7XG4gIH07XG5cbiAgaGFuZGxlWWVhck1vdXNlTGVhdmUgPSAoZXZlbnQsIHllYXIpID0+IHtcbiAgICAhIXRoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZSAmJiB0aGlzLnByb3BzLm9uWWVhck1vdXNlTGVhdmUoZXZlbnQsIHllYXIpO1xuICB9O1xuXG4gIGhhbmRsZVllYXJDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uWWVhckNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblllYXJDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICB0aGlzLmhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlKGRhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLmFkanVzdERhdGVPbkNoYW5nZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLnNldE9wZW4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uICYmIHRoaXMucHJvcHMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICB9O1xuXG4gIGhhbmRsZUN1c3RvbU1vbnRoQ2hhbmdlID0gKGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UoZGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vbnRoWWVhckNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKGRhdGUpO1xuICAgIHRoaXMuaGFuZGxlTW9udGhDaGFuZ2UoZGF0ZSk7XG4gIH07XG5cbiAgY2hhbmdlWWVhciA9ICh5ZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICh7IGRhdGUgfSkgPT4gKHtcbiAgICAgICAgZGF0ZTogc2V0WWVhcihkYXRlLCB5ZWFyKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjaGFuZ2VNb250aCA9IChtb250aCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldE1vbnRoKGRhdGUsIG1vbnRoKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVNb250aENoYW5nZSh0aGlzLnN0YXRlLmRhdGUpLFxuICAgICk7XG4gIH07XG5cbiAgY2hhbmdlTW9udGhZZWFyID0gKG1vbnRoWWVhcikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoeyBkYXRlIH0pID0+ICh7XG4gICAgICAgIGRhdGU6IHNldFllYXIoc2V0TW9udGgoZGF0ZSwgZ2V0TW9udGgobW9udGhZZWFyKSksIGdldFllYXIobW9udGhZZWFyKSksXG4gICAgICB9KSxcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlTW9udGhZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBoZWFkZXIgPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICBkYXRlLFxuICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgKTtcblxuICAgIGNvbnN0IGRheU5hbWVzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzKSB7XG4gICAgICBkYXlOYW1lcy5wdXNoKFxuICAgICAgICA8ZGl2IGtleT1cIldcIiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLndlZWtMYWJlbCB8fCBcIiNcIn1cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheU5hbWVzLmNvbmNhdChcbiAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2XS5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCBkYXkgPSBhZGREYXlzKHN0YXJ0T2ZXZWVrLCBvZmZzZXQpO1xuICAgICAgICBjb25zdCB3ZWVrRGF5TmFtZSA9IHRoaXMuZm9ybWF0V2Vla2RheShkYXksIHRoaXMucHJvcHMubG9jYWxlKTtcblxuICAgICAgICBjb25zdCB3ZWVrRGF5Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy53ZWVrRGF5Q2xhc3NOYW1lXG4gICAgICAgICAgPyB0aGlzLnByb3BzLndlZWtEYXlDbGFzc05hbWUoZGF5KVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtvZmZzZXR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Nsc3goXCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZVwiLCB3ZWVrRGF5Q2xhc3NOYW1lKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7d2Vla0RheU5hbWV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGZvcm1hdFdlZWtkYXkgPSAoZGF5LCBsb2NhbGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5KSB7XG4gICAgICByZXR1cm4gZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlKGRheSwgdGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5LCBsb2NhbGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wcy51c2VXZWVrZGF5c1Nob3J0XG4gICAgICA/IGdldFdlZWtkYXlTaG9ydEluTG9jYWxlKGRheSwgbG9jYWxlKVxuICAgICAgOiBnZXRXZWVrZGF5TWluSW5Mb2NhbGUoZGF5LCBsb2NhbGUpO1xuICB9O1xuXG4gIGRlY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBzdWJZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBjbGVhclNlbGVjdGluZ0RhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGluZ0RhdGU6IG51bGwgfSk7XG4gIH07XG5cbiAgcmVuZGVyUHJldmlvdXNCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbFByZXZEYXlzRGlzYWJsZWQ7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJEaXNhYmxlZEJlZm9yZSh0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsUHJldkRheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRCZWZvcmUodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOlxuICAgICAgICBhbGxQcmV2RGF5c0Rpc2FibGVkID0gcXVhcnRlckRpc2FibGVkQmVmb3JlKFxuICAgICAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgICAgICB0aGlzLnByb3BzLFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQmVmb3JlKHRoaXMuc3RhdGUuZGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICghdGhpcy5wcm9wcy5mb3JjZVNob3dNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgIXRoaXMucHJvcHMuc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uICYmXG4gICAgICAgIGFsbFByZXZEYXlzRGlzYWJsZWQpIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0T25seVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGljb25DbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLWljb25cIixcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uLS1wcmV2aW91c1wiLFxuICAgIF07XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLXByZXZpb3VzXCIsXG4gICAgXTtcblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmRlY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsUHJldkRheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tcHJldmlvdXMtLWRpc2FibGVkXCIpO1xuICAgICAgY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvclllYXIgPVxuICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIGNvbnN0IHsgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsLCBwcmV2aW91c1llYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsXG4gICAgICAgIDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsID0gdHlwZW9mIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gcHJldmlvdXNZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbihcIiBcIil9XG4gICAgICAgIG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNGb3JZZWFyID8gcHJldmlvdXNZZWFyQXJpYUxhYmVsIDogcHJldmlvdXNNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLnByZXZpb3VzWWVhckJ1dHRvbkxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIGluY3JlYXNlWWVhciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgKHsgZGF0ZSB9KSA9PiAoe1xuICAgICAgICBkYXRlOiBhZGRZZWFycyhcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIgPyB0aGlzLnByb3BzLnllYXJJdGVtTnVtYmVyIDogMSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKHRoaXMuc3RhdGUuZGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhbGxOZXh0RGF5c0Rpc2FibGVkO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjpcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCA9IHllYXJzRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXI6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSBxdWFydGVyRGlzYWJsZWRBZnRlcih0aGlzLnN0YXRlLmRhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsbE5leHREYXlzRGlzYWJsZWQgPSBtb250aERpc2FibGVkQWZ0ZXIodGhpcy5zdGF0ZS5kYXRlLCB0aGlzLnByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKCF0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbiAmJlxuICAgICAgICAhdGhpcy5wcm9wcy5zaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24gJiZcbiAgICAgICAgYWxsTmV4dERheXNEaXNhYmxlZCkgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvblwiLFxuICAgICAgXCJyZWFjdC1kYXRlcGlja2VyX19uYXZpZ2F0aW9uLS1uZXh0XCIsXG4gICAgXTtcbiAgICBjb25zdCBpY29uQ2xhc3NlcyA9IFtcbiAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi1pY29uXCIsXG4gICAgICBcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24taWNvbi0tbmV4dFwiLFxuICAgIF07XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdGltZVwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMudG9kYXlCdXR0b24pIHtcbiAgICAgIGNsYXNzZXMucHVzaChcInJlYWN0LWRhdGVwaWNrZXJfX25hdmlnYXRpb24tLW5leHQtLXdpdGgtdG9kYXktYnV0dG9uXCIpO1xuICAgIH1cblxuICAgIGxldCBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlTW9udGg7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyXG4gICAgKSB7XG4gICAgICBjbGlja0hhbmRsZXIgPSB0aGlzLmluY3JlYXNlWWVhcjtcbiAgICB9XG5cbiAgICBpZiAoYWxsTmV4dERheXNEaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fbmF2aWdhdGlvbi0tbmV4dC0tZGlzYWJsZWRcIik7XG4gICAgICBjbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yWWVhciA9XG4gICAgICB0aGlzLnByb3BzLnNob3dNb250aFllYXJQaWNrZXIgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICB0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyO1xuXG4gICAgY29uc3QgeyBuZXh0TW9udGhCdXR0b25MYWJlbCwgbmV4dFllYXJCdXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dE1vbnRoQnV0dG9uTGFiZWwgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBuZXh0TW9udGhCdXR0b25MYWJlbFxuICAgICAgICA6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dFllYXJBcmlhTGFiZWwgPSB0eXBlb2YgbmV4dFllYXJCdXR0b25MYWJlbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgOiBcIk5leHQgWWVhclwiLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICBhcmlhLWxhYmVsPXtpc0ZvclllYXIgPyBuZXh0WWVhckFyaWFMYWJlbCA6IG5leHRNb250aEFyaWFMYWJlbH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3Nlcy5qb2luKFwiIFwiKX0+XG4gICAgICAgICAge2lzRm9yWWVhclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDdXJyZW50TW9udGggPSAoZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoXCJdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzWWVhckRyb3Bkb3duXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhEcm9wZG93bikge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwicmVhY3QtZGF0ZXBpY2tlcl9fY3VycmVudC1tb250aC0taGFzTW9udGhEcm9wZG93blwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3duKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJyZWFjdC1kYXRlcGlja2VyX19jdXJyZW50LW1vbnRoLS1oYXNNb250aFllYXJEcm9wZG93blwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oXCIgXCIpfT5cbiAgICAgICAge2Zvcm1hdERhdGUoZGF0ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0aGlzLnByb3BzLmxvY2FsZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJEcm9wZG93biA9IChvdmVycmlkZUhpZGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zaG93WWVhckRyb3Bkb3duIHx8IG92ZXJyaWRlSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFllYXJEcm9wZG93blxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBkYXRlPXt0aGlzLnN0YXRlLmRhdGV9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLnByb3BzLm9uU2VsZWN0fVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnByb3BzLnNldE9wZW59XG4gICAgICAgIGRyb3Bkb3duTW9kZT17dGhpcy5wcm9wcy5kcm9wZG93bk1vZGV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZVllYXJ9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICB5ZWFyPXtnZXRZZWFyKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHNjcm9sbGFibGVZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZVllYXJEcm9wZG93bn1cbiAgICAgICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcj17dGhpcy5wcm9wcy55ZWFyRHJvcGRvd25JdGVtTnVtYmVyfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoRHJvcGRvd24gPSAob3ZlcnJpZGVIaWRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd24gfHwgb3ZlcnJpZGVIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TW9udGhEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aH1cbiAgICAgICAgbW9udGg9e2dldE1vbnRoKHRoaXMuc3RhdGUuZGF0ZSl9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlck1vbnRoWWVhckRyb3Bkb3duID0gKG92ZXJyaWRlSGlkZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93biB8fCBvdmVycmlkZUhpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb250aFllYXJEcm9wZG93blxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZU1vbnRoWWVhcn1cbiAgICAgICAgbWluRGF0ZT17dGhpcy5wcm9wcy5taW5EYXRlfVxuICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgIGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX1cbiAgICAgICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNjcm9sbGFibGVNb250aFllYXJEcm9wZG93bn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBoYW5kbGVUb2RheUJ1dHRvbkNsaWNrID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGdldFN0YXJ0T2ZUb2RheSgpLCBlKTtcbiAgICB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbiAmJiB0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbihnZXRTdGFydE9mVG9kYXkoKSk7XG4gIH07XG5cbiAgcmVuZGVyVG9kYXlCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnRvZGF5QnV0dG9uIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RvZGF5LWJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVRvZGF5QnV0dG9uQ2xpY2soZSl9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLnRvZGF5QnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJEZWZhdWx0SGVhZGVyID0gKHsgbW9udGhEYXRlLCBpIH0pID0+IChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19oZWFkZXIgJHtcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdFxuICAgICAgICAgID8gXCJyZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWhhcy10aW1lLXNlbGVjdFwiXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YH1cbiAgICA+XG4gICAgICB7dGhpcy5yZW5kZXJDdXJyZW50TW9udGgobW9udGhEYXRlKX1cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcmVhY3QtZGF0ZXBpY2tlcl9faGVhZGVyX19kcm9wZG93biByZWFjdC1kYXRlcGlja2VyX19oZWFkZXJfX2Ryb3Bkb3duLS0ke3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfWB9XG4gICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRHJvcGRvd25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhEcm9wZG93bihpICE9PSAwKX1cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGhZZWFyRHJvcGRvd24oaSAhPT0gMCl9XG4gICAgICAgIHt0aGlzLnJlbmRlclllYXJEcm9wZG93bihpICE9PSAwKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19kYXktbmFtZXNcIj5cbiAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZW5kZXJDdXN0b21IZWFkZXIgPSAoaGVhZGVyQXJncyA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyBtb250aERhdGUsIGkgfSA9IGhlYWRlckFyZ3M7XG5cbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJiAhdGhpcy5zdGF0ZS5tb250aENvbnRhaW5lcikgfHxcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5XG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCA9IG1vbnRoRGlzYWJsZWRBZnRlcihcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMsXG4gICAgKTtcblxuICAgIGNvbnN0IHByZXZZZWFyQnV0dG9uRGlzYWJsZWQgPSB5ZWFyRGlzYWJsZWRCZWZvcmUoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0WWVhckJ1dHRvbkRpc2FibGVkID0geWVhckRpc2FibGVkQWZ0ZXIoXG4gICAgICB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICB0aGlzLnByb3BzLFxuICAgICk7XG5cbiAgICBjb25zdCBzaG93RGF5TmFtZXMgPVxuICAgICAgIXRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciAmJlxuICAgICAgIXRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyICYmXG4gICAgICAhdGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyX19oZWFkZXItLWN1c3RvbVwiXG4gICAgICAgIG9uRm9jdXM9e3RoaXMucHJvcHMub25Ecm9wZG93bkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5yZW5kZXJDdXN0b21IZWFkZXIoe1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgICAgY3VzdG9tSGVhZGVyQ291bnQ6IGksXG4gICAgICAgICAgbW9udGhEYXRlLFxuICAgICAgICAgIGNoYW5nZU1vbnRoOiB0aGlzLmNoYW5nZU1vbnRoLFxuICAgICAgICAgIGNoYW5nZVllYXI6IHRoaXMuY2hhbmdlWWVhcixcbiAgICAgICAgICBkZWNyZWFzZU1vbnRoOiB0aGlzLmRlY3JlYXNlTW9udGgsXG4gICAgICAgICAgaW5jcmVhc2VNb250aDogdGhpcy5pbmNyZWFzZU1vbnRoLFxuICAgICAgICAgIGRlY3JlYXNlWWVhcjogdGhpcy5kZWNyZWFzZVllYXIsXG4gICAgICAgICAgaW5jcmVhc2VZZWFyOiB0aGlzLmluY3JlYXNlWWVhcixcbiAgICAgICAgICBwcmV2TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBuZXh0TW9udGhCdXR0b25EaXNhYmxlZCxcbiAgICAgICAgICBwcmV2WWVhckJ1dHRvbkRpc2FibGVkLFxuICAgICAgICAgIG5leHRZZWFyQnV0dG9uRGlzYWJsZWQsXG4gICAgICAgIH0pfVxuICAgICAgICB7c2hvd0RheU5hbWVzICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2RheS1uYW1lc1wiPlxuICAgICAgICAgICAge3RoaXMuaGVhZGVyKG1vbnRoRGF0ZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlclllYXJIZWFkZXIgPSAoeyBtb250aERhdGUgfSkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd1llYXJQaWNrZXIsIHllYXJJdGVtTnVtYmVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc3RhcnRQZXJpb2QsIGVuZFBlcmlvZCB9ID0gZ2V0WWVhcnNQZXJpb2QoXG4gICAgICBtb250aERhdGUsXG4gICAgICB5ZWFySXRlbU51bWJlcixcbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX2hlYWRlciByZWFjdC1kYXRlcGlja2VyLXllYXItaGVhZGVyXCI+XG4gICAgICAgIHtzaG93WWVhclBpY2tlciA/IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWAgOiBnZXRZZWFyKG1vbnRoRGF0ZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlciA9IChoZWFkZXJBcmdzKSA9PiB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMucHJvcHMucmVuZGVyQ3VzdG9tSGVhZGVyICE9PSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckN1c3RvbUhlYWRlcihoZWFkZXJBcmdzKTtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXI6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlclllYXJIZWFkZXIoaGVhZGVyQXJncyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEZWZhdWx0SGVhZGVyKGhlYWRlckFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJNb250aHMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtb250aExpc3QgPSBbXTtcbiAgICBjb25zdCBtb250aHNUb1N1YnRyYWN0ID0gdGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHNcbiAgICAgID8gdGhpcy5wcm9wcy5tb250aHNTaG93biAtIDFcbiAgICAgIDogMDtcbiAgICBjb25zdCBmcm9tTW9udGhEYXRlID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fCB0aGlzLnByb3BzLnNob3dRdWFydGVyWWVhclBpY2tlclxuICAgICAgICA/IGFkZFllYXJzKHRoaXMuc3RhdGUuZGF0ZSwgbW9udGhzVG9TdWJ0cmFjdClcbiAgICAgICAgOiBzdWJNb250aHModGhpcy5zdGF0ZS5kYXRlLCBtb250aHNUb1N1YnRyYWN0KTtcbiAgICBjb25zdCBtb250aFNlbGVjdGVkSW4gPSB0aGlzLnByb3BzLm1vbnRoU2VsZWN0ZWRJbiA/PyBtb250aHNUb1N1YnRyYWN0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5tb250aHNTaG93bjsgKytpKSB7XG4gICAgICBjb25zdCBtb250aHNUb0FkZCA9IGkgLSBtb250aFNlbGVjdGVkSW4gKyBtb250aHNUb1N1YnRyYWN0O1xuICAgICAgY29uc3QgbW9udGhEYXRlID1cbiAgICAgICAgdGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyIHx8IHRoaXMucHJvcHMuc2hvd1F1YXJ0ZXJZZWFyUGlja2VyXG4gICAgICAgICAgPyBhZGRZZWFycyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZClcbiAgICAgICAgICA6IGFkZE1vbnRocyhmcm9tTW9udGhEYXRlLCBtb250aHNUb0FkZCk7XG4gICAgICBjb25zdCBtb250aEtleSA9IGBtb250aC0ke2l9YDtcbiAgICAgIGNvbnN0IG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kID0gaSA8IHRoaXMucHJvcHMubW9udGhzU2hvd24gLSAxO1xuICAgICAgY29uc3QgbW9udGhTaG93c0R1cGxpY2F0ZURheXNTdGFydCA9IGkgPiAwO1xuICAgICAgbW9udGhMaXN0LnB1c2goXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e21vbnRoS2V5fVxuICAgICAgICAgIHJlZj17KGRpdikgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb250aENvbnRhaW5lciA9IGRpdjtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX21vbnRoLWNvbnRhaW5lclwiXG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoeyBtb250aERhdGUsIGkgfSl9XG4gICAgICAgICAgPE1vbnRoXG4gICAgICAgICAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICAgICAgZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMuZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBhcmlhTGFiZWxQcmVmaXg9e3RoaXMucHJvcHMubW9udGhBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VNb250aFllYXJ9XG4gICAgICAgICAgICBkYXk9e21vbnRoRGF0ZX1cbiAgICAgICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgICAgICBtb250aENsYXNzTmFtZT17dGhpcy5wcm9wcy5tb250aENsYXNzTmFtZX1cbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBoYW5kbGVPbktleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25EYXlLZXlEb3dufVxuICAgICAgICAgICAgaGFuZGxlT25Nb250aEtleURvd249e3RoaXMucHJvcHMuaGFuZGxlT25LZXlEb3dufVxuICAgICAgICAgICAgdXNlUG9pbnRlckV2ZW50PXt0aGlzLnByb3BzLnVzZVBvaW50ZXJFdmVudH1cbiAgICAgICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5oYW5kbGVEYXlNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vbnRoTW91c2VMZWF2ZX1cbiAgICAgICAgICAgIG9uV2Vla1NlbGVjdD17dGhpcy5wcm9wcy5vbldlZWtTZWxlY3R9XG4gICAgICAgICAgICBvcmRlckluRGlzcGxheT17aX1cbiAgICAgICAgICAgIGZvcm1hdFdlZWtOdW1iZXI9e3RoaXMucHJvcHMuZm9ybWF0V2Vla051bWJlcn1cbiAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgICBtaW5EYXRlPXt0aGlzLnByb3BzLm1pbkRhdGV9XG4gICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICAgICAgZXhjbHVkZURhdGVJbnRlcnZhbHM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVJbnRlcnZhbHN9XG4gICAgICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5wcm9wcy5oaWdobGlnaHREYXRlc31cbiAgICAgICAgICAgIGhvbGlkYXlzPXt0aGlzLnByb3BzLmhvbGlkYXlzfVxuICAgICAgICAgICAgc2VsZWN0aW5nRGF0ZT17dGhpcy5zdGF0ZS5zZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgaW5jbHVkZURhdGVzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlc31cbiAgICAgICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgICAgIHNob3VsZEZvY3VzRGF5SW5saW5lPXt0aGlzLnByb3BzLnNob3VsZEZvY3VzRGF5SW5saW5lfVxuICAgICAgICAgICAgZml4ZWRIZWlnaHQ9e3RoaXMucHJvcHMuZml4ZWRIZWlnaHR9XG4gICAgICAgICAgICBmaWx0ZXJEYXRlPXt0aGlzLnByb3BzLmZpbHRlckRhdGV9XG4gICAgICAgICAgICBwcmVTZWxlY3Rpb249e3RoaXMucHJvcHMucHJlU2VsZWN0aW9ufVxuICAgICAgICAgICAgc2V0UHJlU2VsZWN0aW9uPXt0aGlzLnByb3BzLnNldFByZVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgc2VsZWN0c1N0YXJ0PXt0aGlzLnByb3BzLnNlbGVjdHNTdGFydH1cbiAgICAgICAgICAgIHNlbGVjdHNFbmQ9e3RoaXMucHJvcHMuc2VsZWN0c0VuZH1cbiAgICAgICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGVzPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZXN9XG4gICAgICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgICAgIGVuZERhdGU9e3RoaXMucHJvcHMuZW5kRGF0ZX1cbiAgICAgICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgICAgIHNldE9wZW49e3RoaXMucHJvcHMuc2V0T3Blbn1cbiAgICAgICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICAgICAgcmVuZGVyTW9udGhDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlck1vbnRoQ29udGVudH1cbiAgICAgICAgICAgIHJlbmRlclF1YXJ0ZXJDb250ZW50PXt0aGlzLnByb3BzLnJlbmRlclF1YXJ0ZXJDb250ZW50fVxuICAgICAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgICAgIHNob3dNb250aFllYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyPXt0aGlzLnByb3BzLnNob3dGdWxsTW9udGhZZWFyUGlja2VyfVxuICAgICAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNob3dGb3VyQ29sdW1uTW9udGhZZWFyUGlja2VyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93WWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93WWVhclBpY2tlcn1cbiAgICAgICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgICAgICBzaG93V2Vla1BpY2tlcj17dGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcn1cbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnByb3BzLmlzSW5wdXRGb2N1c2VkfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXt0aGlzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzRW5kPXttb250aFNob3dzRHVwbGljYXRlRGF5c0VuZH1cbiAgICAgICAgICAgIG1vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnQ9e21vbnRoU2hvd3NEdXBsaWNhdGVEYXlzU3RhcnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbnRoTGlzdDtcbiAgfTtcblxuICByZW5kZXJZZWFycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9feWVhci0tY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKHsgbW9udGhEYXRlOiB0aGlzLnN0YXRlLmRhdGUgfSl9XG4gICAgICAgICAgPFllYXJcbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e3RoaXMuaGFuZGxlRGF5Q2xpY2t9XG4gICAgICAgICAgICBzZWxlY3RpbmdEYXRlPXt0aGlzLnN0YXRlLnNlbGVjdGluZ0RhdGV9XG4gICAgICAgICAgICBjbGVhclNlbGVjdGluZ0RhdGU9e3RoaXMuY2xlYXJTZWxlY3RpbmdEYXRlfVxuICAgICAgICAgICAgZGF0ZT17dGhpcy5zdGF0ZS5kYXRlfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLmhhbmRsZVllYXJNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25ZZWFyTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlclRpbWVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgJiZcbiAgICAgICh0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyIHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRpbWVcbiAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25UaW1lQ2hhbmdlfVxuICAgICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgICBmb3JtYXQ9e3RoaXMucHJvcHMudGltZUZvcm1hdH1cbiAgICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICAgIGludGVydmFscz17dGhpcy5wcm9wcy50aW1lSW50ZXJ2YWxzfVxuICAgICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgICBtYXhUaW1lPXt0aGlzLnByb3BzLm1heFRpbWV9XG4gICAgICAgICAgZXhjbHVkZVRpbWVzPXt0aGlzLnByb3BzLmV4Y2x1ZGVUaW1lc31cbiAgICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgICAgdGltZUNhcHRpb249e3RoaXMucHJvcHMudGltZUNhcHRpb259XG4gICAgICAgICAgdG9kYXlCdXR0b249e3RoaXMucHJvcHMudG9kYXlCdXR0b259XG4gICAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgICAgc2hvd01vbnRoWWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dNb250aFllYXJEcm9wZG93bn1cbiAgICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgICAgd2l0aFBvcnRhbD17dGhpcy5wcm9wcy53aXRoUG9ydGFsfVxuICAgICAgICAgIG1vbnRoUmVmPXt0aGlzLnN0YXRlLm1vbnRoQ29udGFpbmVyfVxuICAgICAgICAgIGluamVjdFRpbWVzPXt0aGlzLnByb3BzLmluamVjdFRpbWVzfVxuICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sb2NhbGV9XG4gICAgICAgICAgaGFuZGxlT25LZXlEb3duPXt0aGlzLnByb3BzLmhhbmRsZU9uS2V5RG93bn1cbiAgICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRUaW1lU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUodGhpcy5wcm9wcy5zZWxlY3RlZCk7XG4gICAgY29uc3QgdGltZVZhbGlkID0gaXNWYWxpZCh0aW1lKSAmJiBCb29sZWFuKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xuICAgIGNvbnN0IHRpbWVTdHJpbmcgPSB0aW1lVmFsaWRcbiAgICAgID8gYCR7YWRkWmVybyh0aW1lLmdldEhvdXJzKCkpfToke2FkZFplcm8odGltZS5nZXRNaW51dGVzKCkpfWBcbiAgICAgIDogXCJcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93VGltZUlucHV0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW5wdXRUaW1lXG4gICAgICAgICAgZGF0ZT17dGltZX1cbiAgICAgICAgICB0aW1lU3RyaW5nPXt0aW1lU3RyaW5nfVxuICAgICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVGltZUNoYW5nZX1cbiAgICAgICAgICBjdXN0b21UaW1lSW5wdXQ9e3RoaXMucHJvcHMuY3VzdG9tVGltZUlucHV0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQXJpYUxpdmVSZWdpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzdGFydFBlcmlvZCwgZW5kUGVyaW9kIH0gPSBnZXRZZWFyc1BlcmlvZChcbiAgICAgIHRoaXMuc3RhdGUuZGF0ZSxcbiAgICAgIHRoaXMucHJvcHMueWVhckl0ZW1OdW1iZXIsXG4gICAgKTtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGAke3N0YXJ0UGVyaW9kfSAtICR7ZW5kUGVyaW9kfWA7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd01vbnRoWWVhclBpY2tlciB8fFxuICAgICAgdGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJcbiAgICApIHtcbiAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGdldFllYXIodGhpcy5zdGF0ZS5kYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYCR7Z2V0TW9udGhJbkxvY2FsZShcbiAgICAgICAgZ2V0TW9udGgodGhpcy5zdGF0ZS5kYXRlKSxcbiAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICApfSAke2dldFllYXIodGhpcy5zdGF0ZS5kYXRlKX1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlbmRlckFyaWFMaXZlTWVzc2FnZSAmJiBhcmlhTGl2ZU1lc3NhZ2V9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDaGlsZHJlbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19jaGlsZHJlbi1jb250YWluZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgQ29udGFpbmVyID0gdGhpcy5wcm9wcy5jb250YWluZXIgfHwgQ2FsZW5kYXJDb250YWluZXI7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJjb250ZW50c1wiIH19IHJlZj17dGhpcy5jb250YWluZXJSZWZ9PlxuICAgICAgICA8Q29udGFpbmVyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbHN4KFwicmVhY3QtZGF0ZXBpY2tlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgICAgICAgXCJyZWFjdC1kYXRlcGlja2VyLS10aW1lLW9ubHlcIjogdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHksXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgc2hvd1RpbWU9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QgfHwgdGhpcy5wcm9wcy5zaG93VGltZUlucHV0fVxuICAgICAgICAgIHNob3dUaW1lU2VsZWN0T25seT17dGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclByZXZpb3VzQnV0dG9uKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTmV4dEJ1dHRvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck1vbnRocygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclllYXJzKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyVG9kYXlCdXR0b24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lU2VjdGlvbigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0VGltZVNlY3Rpb24oKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDaGlsZHJlbigpfVxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY29uc3QgQ2FsZW5kYXJJY29uID0gKHsgaWNvbiwgY2xhc3NOYW1lID0gXCJcIiwgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRDbGFzcyA9IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2FsZW5kYXItaWNvblwiO1xuXG4gIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChpY29uKSkge1xuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoaWNvbiwge1xuICAgICAgY2xhc3NOYW1lOiBgJHtpY29uLnByb3BzLmNsYXNzTmFtZSB8fCBcIlwifSAke2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YCxcbiAgICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaWNvbi5wcm9wcy5vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpY29uLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG9uQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGljb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtkZWZhdWx0Q2xhc3N9ICR7aWNvbn0gJHtjbGFzc05hbWV9YH1cbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgU1ZHIEljb25cbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICBjbGFzc05hbWU9e2Ake2RlZmF1bHRDbGFzc30gJHtjbGFzc05hbWV9YH1cbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgdmlld0JveD1cIjAgMCA0NDggNTEyXCJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgPlxuICAgICAgPHBhdGggZD1cIk05NiAzMlY2NEg0OEMyMS41IDY0IDAgODUuNSAwIDExMnY0OEg0NDhWMTEyYzAtMjYuNS0yMS41LTQ4LTQ4LTQ4SDM1MlYzMmMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMlY2NEgxNjBWMzJjMC0xNy43LTE0LjMtMzItMzItMzJTOTYgMTQuMyA5NiAzMnpNNDQ4IDE5MkgwVjQ2NGMwIDI2LjUgMjEuNSA0OCA0OCA0OEg0MDBjMjYuNSAwIDQ4LTIxLjUgNDgtNDhWMTkyelwiIC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5DYWxlbmRhckljb24ucHJvcFR5cGVzID0ge1xuICBpY29uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXJJY29uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBwb3J0YWxJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxIb3N0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFkb3dSb290KSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9ydGFsUm9vdCA9ICh0aGlzLnByb3BzLnBvcnRhbEhvc3QgfHwgZG9jdW1lbnQpLmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGhpcy5wcm9wcy5wb3J0YWxJZCxcbiAgICApO1xuICAgIGlmICghdGhpcy5wb3J0YWxSb290KSB7XG4gICAgICB0aGlzLnBvcnRhbFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5wb3J0YWxSb290LnNldEF0dHJpYnV0ZShcImlkXCIsIHRoaXMucHJvcHMucG9ydGFsSWQpO1xuICAgICAgKHRoaXMucHJvcHMucG9ydGFsSG9zdCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZCh0aGlzLnBvcnRhbFJvb3QpO1xuICAgIH1cbiAgICB0aGlzLnBvcnRhbFJvb3QuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnBvcnRhbFJvb3QucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbCh0aGlzLnByb3BzLmNoaWxkcmVuLCB0aGlzLmVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG4vLyBUYWJMb29wIHByZXZlbnRzIHRoZSB1c2VyIGZyb20gdGFiYmluZyBvdXRzaWRlIG9mIHRoZSBwb3BwZXJcbi8vIEl0IGNyZWF0ZXMgYSB0YWJpbmRleCBsb29wIHNvIHRoYXQgXCJUYWJcIiBvbiB0aGUgbGFzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGZpcnN0IGVsZW1lbnRcbi8vIGFuZCBcIlNoaWZ0IFRhYlwiIG9uIHRoZSBmaXJzdCBlbGVtZW50IHdpbGwgZm9jdXMgdGhlIGxhc3QgZWxlbWVudFxuXG5jb25zdCBmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yID1cbiAgXCJbdGFiaW5kZXhdLCBhLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCI7XG5jb25zdCBmb2N1c2FibGVGaWx0ZXIgPSAobm9kZSkgPT4gIW5vZGUuZGlzYWJsZWQgJiYgbm9kZS50YWJJbmRleCAhPT0gLTE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYkxvb3AgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW5hYmxlVGFiTG9vcDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMudGFiTG9vcFJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgLy8gcXVlcnkgYWxsIGZvY3VzYWJsZSBlbGVtZW50c1xuICAvLyB0cmltIGZpcnN0IGFuZCBsYXN0IGJlY2F1c2UgdGhleSBhcmUgdGhlIGZvY3VzIGd1YXJkc1xuICBnZXRUYWJDaGlsZHJlbiA9ICgpID0+XG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChcbiAgICAgICAgdGhpcy50YWJMb29wUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yKSxcbiAgICAgICAgMSxcbiAgICAgICAgLTEsXG4gICAgICApXG4gICAgICAuZmlsdGVyKGZvY3VzYWJsZUZpbHRlcik7XG5cbiAgaGFuZGxlRm9jdXNTdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJlxuICAgICAgdGFiQ2hpbGRyZW4ubGVuZ3RoID4gMSAmJlxuICAgICAgdGFiQ2hpbGRyZW5bdGFiQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgfTtcblxuICBoYW5kbGVGb2N1c0VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB0YWJDaGlsZHJlbiA9IHRoaXMuZ2V0VGFiQ2hpbGRyZW4oKTtcbiAgICB0YWJDaGlsZHJlbiAmJiB0YWJDaGlsZHJlbi5sZW5ndGggPiAxICYmIHRhYkNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5lbmFibGVUYWJMb29wKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fdGFiLWxvb3BcIiByZWY9e3RoaXMudGFiTG9vcFJlZn0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190YWItbG9vcF9fc3RhcnRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c1N0YXJ0fVxuICAgICAgICAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWRhdGVwaWNrZXJfX3RhYi1sb29wX19lbmRcIlxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c0VuZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIHVzZUZsb2F0aW5nLFxuICBhcnJvdyxcbiAgb2Zmc2V0LFxuICBmbGlwLFxuICBhdXRvVXBkYXRlLFxufSBmcm9tIFwiQGZsb2F0aW5nLXVpL3JlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgPSBbXG4gIFwidG9wLXN0YXJ0XCIsXG4gIFwidG9wLWVuZFwiLFxuICBcImJvdHRvbS1zdGFydFwiLFxuICBcImJvdHRvbS1lbmRcIixcbiAgXCJyaWdodC1zdGFydFwiLFxuICBcInJpZ2h0LWVuZFwiLFxuICBcImxlZnQtc3RhcnRcIixcbiAgXCJsZWZ0LWVuZFwiLFxuICBcInRvcFwiLFxuICBcInJpZ2h0XCIsXG4gIFwiYm90dG9tXCIsXG4gIFwibGVmdFwiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2l0aEZsb2F0aW5nKENvbXBvbmVudCkge1xuICBjb25zdCBXaXRoRmxvYXRpbmcgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBhbHRfcHJvcHMgPSB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIHBvcHBlck1vZGlmaWVyczogcHJvcHMucG9wcGVyTW9kaWZpZXJzIHx8IFtdLFxuICAgICAgcG9wcGVyUHJvcHM6IHByb3BzLnBvcHBlclByb3BzIHx8IHt9LFxuICAgICAgaGlkZVBvcHBlcjpcbiAgICAgICAgdHlwZW9mIHByb3BzLmhpZGVQb3BwZXIgPT09IFwiYm9vbGVhblwiID8gcHJvcHMuaGlkZVBvcHBlciA6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBhcnJvd1JlZiA9IFJlYWN0LnVzZVJlZigpO1xuICAgIGNvbnN0IGZsb2F0aW5nUHJvcHMgPSB1c2VGbG9hdGluZyh7XG4gICAgICBvcGVuOiAhYWx0X3Byb3BzLmhpZGVQb3BwZXIsXG4gICAgICB3aGlsZUVsZW1lbnRzTW91bnRlZDogYXV0b1VwZGF0ZSxcbiAgICAgIHBsYWNlbWVudDogYWx0X3Byb3BzLnBvcHBlclBsYWNlbWVudCxcbiAgICAgIG1pZGRsZXdhcmU6IFtcbiAgICAgICAgZmxpcCh7IHBhZGRpbmc6IDE1IH0pLFxuICAgICAgICBvZmZzZXQoMTApLFxuICAgICAgICBhcnJvdyh7IGVsZW1lbnQ6IGFycm93UmVmIH0pLFxuICAgICAgICAuLi5hbHRfcHJvcHMucG9wcGVyTW9kaWZpZXJzLFxuICAgICAgXSxcbiAgICAgIC4uLmFsdF9wcm9wcy5wb3BwZXJQcm9wcyxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHsuLi5hbHRfcHJvcHN9IHBvcHBlclByb3BzPXt7IC4uLmZsb2F0aW5nUHJvcHMsIGFycm93UmVmIH19IC8+XG4gICAgKTtcbiAgfTtcblxuICBXaXRoRmxvYXRpbmcucHJvcFR5cGVzID0ge1xuICAgIHBvcHBlclBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKHBvcHBlclBsYWNlbWVudFBvc2l0aW9ucyksXG4gICAgcG9wcGVyTW9kaWZpZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICByZXR1cm4gV2l0aEZsb2F0aW5nO1xufVxuIiwiaW1wb3J0IHsgY2xzeCB9IGZyb20gXCJjbHN4XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBGbG9hdGluZ0Fycm93IH0gZnJvbSBcIkBmbG9hdGluZy11aS9yZWFjdFwiO1xuaW1wb3J0IFRhYkxvb3AgZnJvbSBcIi4vdGFiX2xvb3BcIjtcbmltcG9ydCBQb3J0YWwgZnJvbSBcIi4vcG9ydGFsXCI7XG5pbXBvcnQgd2l0aEZsb2F0aW5nIGZyb20gXCIuL3dpdGhfZmxvYXRpbmdcIjtcblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbmV4cG9ydCBjbGFzcyBQb3BwZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlkZVBvcHBlcjogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd3JhcHBlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoaWRlUG9wcGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGFyZ2V0Q29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwb3BwZXJPbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgICBoaWRlUG9wcGVyLFxuICAgICAgcG9wcGVyQ29tcG9uZW50LFxuICAgICAgdGFyZ2V0Q29tcG9uZW50LFxuICAgICAgZW5hYmxlVGFiTG9vcCxcbiAgICAgIHBvcHBlck9uS2V5RG93bixcbiAgICAgIHBvcnRhbElkLFxuICAgICAgcG9ydGFsSG9zdCxcbiAgICAgIHBvcHBlclByb3BzLFxuICAgICAgc2hvd0Fycm93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHBvcHBlcjtcblxuICAgIGlmICghaGlkZVBvcHBlcikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IGNsc3goXCJyZWFjdC1kYXRlcGlja2VyLXBvcHBlclwiLCBjbGFzc05hbWUpO1xuICAgICAgcG9wcGVyID0gKFxuICAgICAgICA8VGFiTG9vcCBlbmFibGVUYWJMb29wPXtlbmFibGVUYWJMb29wfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0RmxvYXRpbmd9XG4gICAgICAgICAgICBzdHlsZT17cG9wcGVyUHJvcHMuZmxvYXRpbmdTdHlsZXN9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICBkYXRhLXBsYWNlbWVudD17cG9wcGVyUHJvcHMucGxhY2VtZW50fVxuICAgICAgICAgICAgb25LZXlEb3duPXtwb3BwZXJPbktleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BvcHBlckNvbXBvbmVudH1cbiAgICAgICAgICAgIHtzaG93QXJyb3cgJiYgKFxuICAgICAgICAgICAgICA8RmxvYXRpbmdBcnJvd1xuICAgICAgICAgICAgICAgIHJlZj17cG9wcGVyUHJvcHMuYXJyb3dSZWZ9XG4gICAgICAgICAgICAgICAgY29udGV4dD17cG9wcGVyUHJvcHMuY29udGV4dH1cbiAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezh9XG4gICAgICAgICAgICAgICAgd2lkdGg9ezE2fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKC0xcHgpXCIgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX190cmlhbmdsZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lcikge1xuICAgICAgcG9wcGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLnBvcHBlckNvbnRhaW5lciwge30sIHBvcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbElkICYmICFoaWRlUG9wcGVyKSB7XG4gICAgICBwb3BwZXIgPSAoXG4gICAgICAgIDxQb3J0YWwgcG9ydGFsSWQ9e3BvcnRhbElkfSBwb3J0YWxIb3N0PXtwb3J0YWxIb3N0fT5cbiAgICAgICAgICB7cG9wcGVyfVxuICAgICAgICA8L1BvcnRhbD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgd3JhcHBlckNsYXNzZXMgPSBjbHN4KFwicmVhY3QtZGF0ZXBpY2tlci13cmFwcGVyXCIsIHdyYXBwZXJDbGFzc05hbWUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPGRpdiByZWY9e3BvcHBlclByb3BzLnJlZnMuc2V0UmVmZXJlbmNlfSBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc2VzfT5cbiAgICAgICAgICB7dGFyZ2V0Q29tcG9uZW50fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3BvcHBlcn1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoRmxvYXRpbmcoUG9wcGVyQ29tcG9uZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBDYWxlbmRhciBmcm9tIFwiLi9jYWxlbmRhclwiO1xuaW1wb3J0IENhbGVuZGFySWNvbiBmcm9tIFwiLi9jYWxlbmRhcl9pY29uXCI7XG5pbXBvcnQgUG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuaW1wb3J0IFBvcHBlckNvbXBvbmVudCBmcm9tIFwiLi9wb3BwZXJfY29tcG9uZW50XCI7XG5pbXBvcnQgeyBwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMgfSBmcm9tIFwiLi93aXRoX2Zsb2F0aW5nXCI7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSBcImNsc3hcIjtcbmltcG9ydCB7IHNldCB9IGZyb20gXCJkYXRlLWZucy9zZXRcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvc3RhcnRPZkRheVwiO1xuaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiZGF0ZS1mbnMvZW5kT2ZEYXlcIjtcbmltcG9ydCB7IGlzVmFsaWQgfSBmcm9tIFwiZGF0ZS1mbnMvaXNWYWxpZFwiO1xuaW1wb3J0IHtcbiAgbmV3RGF0ZSxcbiAgaXNEYXRlLFxuICBpc0JlZm9yZSxcbiAgaXNBZnRlcixcbiAgaXNFcXVhbCxcbiAgc2V0VGltZSxcbiAgZ2V0U2Vjb25kcyxcbiAgZ2V0TWludXRlcyxcbiAgZ2V0SG91cnMsXG4gIGFkZERheXMsXG4gIGFkZE1vbnRocyxcbiAgYWRkV2Vla3MsXG4gIHN1YkRheXMsXG4gIHN1Yk1vbnRocyxcbiAgc3ViV2Vla3MsXG4gIGFkZFllYXJzLFxuICBzdWJZZWFycyxcbiAgaXNEYXlEaXNhYmxlZCxcbiAgaXNEYXlJblJhbmdlLFxuICBnZXRFZmZlY3RpdmVNaW5EYXRlLFxuICBnZXRFZmZlY3RpdmVNYXhEYXRlLFxuICBwYXJzZURhdGUsXG4gIHNhZmVEYXRlRm9ybWF0LFxuICBzYWZlRGF0ZVJhbmdlRm9ybWF0LFxuICBnZXRIaWdodExpZ2h0RGF5c01hcCxcbiAgZ2V0WWVhcixcbiAgZ2V0TW9udGgsXG4gIGdldFN0YXJ0T2ZXZWVrLFxuICBnZXRFbmRPZldlZWssXG4gIHJlZ2lzdGVyTG9jYWxlLFxuICBzZXREZWZhdWx0TG9jYWxlLFxuICBnZXREZWZhdWx0TG9jYWxlLFxuICBERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIsXG4gIGlzU2FtZURheSxcbiAgaXNNb250aERpc2FibGVkLFxuICBpc1llYXJEaXNhYmxlZCxcbiAgc2FmZU11bHRpcGxlRGF0ZXNGb3JtYXQsXG4gIGdldEhvbGlkYXlzTWFwLFxuICBpc0RhdGVCZWZvcmUsXG59IGZyb20gXCIuL2RhdGVfdXRpbHNcIjtcbmltcG9ydCBUYWJMb29wIGZyb20gXCIuL3RhYl9sb29wXCI7XG5pbXBvcnQgb25DbGlja091dHNpZGUgZnJvbSBcInJlYWN0LW9uY2xpY2tvdXRzaWRlXCI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FsZW5kYXJDb250YWluZXIgfSBmcm9tIFwiLi9jYWxlbmRhcl9jb250YWluZXJcIjtcblxuZXhwb3J0IHsgcmVnaXN0ZXJMb2NhbGUsIHNldERlZmF1bHRMb2NhbGUsIGdldERlZmF1bHRMb2NhbGUgfTtcblxuY29uc3Qgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MgPSBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCI7XG5jb25zdCBXcmFwcGVkQ2FsZW5kYXIgPSBvbkNsaWNrT3V0c2lkZShDYWxlbmRhcik7XG5cbi8vIENvbXBhcmVzIGRhdGVzIHllYXIrbW9udGggY29tYmluYXRpb25zXG5mdW5jdGlvbiBoYXNQcmVTZWxlY3Rpb25DaGFuZ2VkKGRhdGUxLCBkYXRlMikge1xuICBpZiAoZGF0ZTEgJiYgZGF0ZTIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ2V0TW9udGgoZGF0ZTEpICE9PSBnZXRNb250aChkYXRlMikgfHwgZ2V0WWVhcihkYXRlMSkgIT09IGdldFllYXIoZGF0ZTIpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlMSAhPT0gZGF0ZTI7XG59XG5cbi8qKlxuICogR2VuZXJhbCBkYXRlcGlja2VyIGNvbXBvbmVudC5cbiAqL1xuY29uc3QgSU5QVVRfRVJSXzEgPSBcIkRhdGUgaW5wdXQgbm90IHZhbGlkLlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFsbG93U2FtZURheTogZmFsc2UsXG4gICAgICBkYXRlRm9ybWF0OiBcIk1NL2RkL3l5eXlcIixcbiAgICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogXCJMTExMIHl5eXlcIixcbiAgICAgIG9uQ2hhbmdlKCkge30sXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICBkcm9wZG93bk1vZGU6IFwic2Nyb2xsXCIsXG4gICAgICBvbkZvY3VzKCkge30sXG4gICAgICBvbkJsdXIoKSB7fSxcbiAgICAgIG9uS2V5RG93bigpIHt9LFxuICAgICAgb25JbnB1dENsaWNrKCkge30sXG4gICAgICBvblNlbGVjdCgpIHt9LFxuICAgICAgb25DbGlja091dHNpZGUoKSB7fSxcbiAgICAgIG9uTW9udGhDaGFuZ2UoKSB7fSxcbiAgICAgIG9uQ2FsZW5kYXJPcGVuKCkge30sXG4gICAgICBvbkNhbGVuZGFyQ2xvc2UoKSB7fSxcbiAgICAgIHByZXZlbnRPcGVuT25Gb2N1czogZmFsc2UsXG4gICAgICBvblllYXJDaGFuZ2UoKSB7fSxcbiAgICAgIG9uSW5wdXRFcnJvcigpIHt9LFxuICAgICAgbW9udGhzU2hvd246IDEsXG4gICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICB3aXRoUG9ydGFsOiBmYWxzZSxcbiAgICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBmYWxzZSxcbiAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgICBzaG93VGltZVNlbGVjdDogZmFsc2UsXG4gICAgICBzaG93VGltZUlucHV0OiBmYWxzZSxcbiAgICAgIHNob3dQcmV2aW91c01vbnRoczogZmFsc2UsXG4gICAgICBzaG93TW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dGdWxsTW9udGhZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dUd29Db2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1llYXJQaWNrZXI6IGZhbHNlLFxuICAgICAgc2hvd1F1YXJ0ZXJZZWFyUGlja2VyOiBmYWxzZSxcbiAgICAgIHNob3dXZWVrUGlja2VyOiBmYWxzZSxcbiAgICAgIHN0cmljdFBhcnNpbmc6IGZhbHNlLFxuICAgICAgc3dhcFJhbmdlOiBmYWxzZSxcbiAgICAgIHRpbWVJbnRlcnZhbHM6IDMwLFxuICAgICAgdGltZUNhcHRpb246IFwiVGltZVwiLFxuICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbDogXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIE1vbnRoXCIsXG4gICAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFwiTmV4dCBNb250aFwiLFxuICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIHByZXZpb3VzWWVhckJ1dHRvbkxhYmVsOiBcIlByZXZpb3VzIFllYXJcIixcbiAgICAgIG5leHRZZWFyQXJpYUxhYmVsOiBcIk5leHQgWWVhclwiLFxuICAgICAgbmV4dFllYXJCdXR0b25MYWJlbDogXCJOZXh0IFllYXJcIixcbiAgICAgIHRpbWVJbnB1dExhYmVsOiBcIlRpbWVcIixcbiAgICAgIGVuYWJsZVRhYkxvb3A6IHRydWUsXG4gICAgICB5ZWFySXRlbU51bWJlcjogREVGQVVMVF9ZRUFSX0lURU1fTlVNQkVSLFxuICAgICAgZm9jdXNTZWxlY3RlZE1vbnRoOiBmYWxzZSxcbiAgICAgIHNob3dQb3BwZXJBcnJvdzogdHJ1ZSxcbiAgICAgIGV4Y2x1ZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICBjdXN0b21UaW1lSW5wdXQ6IG51bGwsXG4gICAgICBjYWxlbmRhclN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBmYWxzZSxcbiAgICAgIHVzZVBvaW50ZXJFdmVudDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWRqdXN0RGF0ZU9uQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhbGxvd1NhbWVEYXk6IFByb3BUeXBlcy5ib29sLFxuICAgIGFyaWFEZXNjcmliZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhSW52YWxpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxDbG9zZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhTGFiZWxsZWRCeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmlhUmVxdWlyZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2FsZW5kYXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FsZW5kYXJDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xvc2VPblNjcm9sbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1c3RvbUlucHV0OiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBjdXN0b21JbnB1dFJlZjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjYWxlbmRhclN0YXJ0RGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlc1xuICAgIGRhdGVGb3JtYXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheV0pLFxuICAgIGRhdGVGb3JtYXRDYWxlbmRhcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHdlZWtEYXlDbGFzc05hbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vbnRoQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWRLZXlib2FyZE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTW9kZTogUHJvcFR5cGVzLm9uZU9mKFtcInNjcm9sbFwiLCBcInNlbGVjdFwiXSkuaXNSZXF1aXJlZCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBleGNsdWRlRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLmlzUmVxdWlyZWQsXG4gICAgICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICApLFxuICAgIGV4Y2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICAgIH0pLFxuICAgICksXG4gICAgZmlsdGVyRGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZml4ZWRIZWlnaHQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvcm06IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9ybWF0V2Vla051bWJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGlnaGxpZ2h0RGF0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBob2xpZGF5czogUHJvcFR5cGVzLmFycmF5LFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluY2x1ZGVEYXRlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5jbHVkZVRpbWVzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaW5qZWN0VGltZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpbmxpbmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzQ2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgXSksXG4gICAgc2hvd0ljb246IFByb3BUeXBlcy5ib29sLFxuICAgIGljb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY2FsZW5kYXJJY29uQ2xhc3NuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHsgbG9jYWxlOiBQcm9wVHlwZXMub2JqZWN0IH0pLFxuICAgIF0pLFxuICAgIG1heERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1vbnRoc1Nob3duOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25XZWVrU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNsaWNrT3V0c2lkZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2VSYXc6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblllYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSW5wdXRFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DYWxlbmRhck9wZW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2FsZW5kYXJDbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3BlblRvRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgcGVla05leHRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcGxhY2Vob2xkZXJUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBvcHBlckNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcG9wcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJNb2RpZmllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihwb3BwZXJQbGFjZW1lbnRQb3NpdGlvbnMpLCAvLyA8UG9wcGVyQ29tcG9uZW50Lz4gcHJvcHNcbiAgICBwb3BwZXJQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwcmV2ZW50T3Blbk9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRPbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXG4gICAgc2VsZWN0c0VuZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VsZWN0c1N0YXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdHNEaXNhYmxlZERheXNJblJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWxlY3RzTXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNlbGVjdGVkRGF0ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpKSxcbiAgICBzaG93TW9udGhEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1ByZXZpb3VzTW9udGhzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyRHJvcGRvd246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrTnVtYmVyczogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1llYXJEcm9wZG93bjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RyaWN0UGFyc2luZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3dhcFJhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JjZVNob3dNb250aE5hdmlnYXRpb246IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcbiAgICBzdGFydE9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHRpbWVDYXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvZGF5QnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgICB1c2VXZWVrZGF5c1Nob3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JtYXRXZWVrRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB3ZWVrTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgd2l0aFBvcnRhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsSG9zdDogUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhZG93Um9vdCksXG4gICAgeWVhckl0ZW1OdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeWVhckRyb3Bkb3duSXRlbU51bWJlcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaG91bGRDbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93VGltZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TW9udGhZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dZZWFyUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93UXVhcnRlclllYXJQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dXZWVrUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93RGF0ZVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1RpbWVTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUaW1lU2VsZWN0T25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0aW1lSW50ZXJ2YWxzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIG1heFRpbWU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxuICAgIGV4Y2x1ZGVUaW1lczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGZpbHRlclRpbWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjbGVhckJ1dHRvblRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsZWFyQnV0dG9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXZpb3VzTW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcHJldmlvdXNNb250aEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKSxcbiAgICBuZXh0TW9udGhBcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dE1vbnRoQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLFxuICAgIHByZXZpb3VzWWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwcmV2aW91c1llYXJCdXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckFyaWFMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0WWVhckJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRpbWVJbnB1dExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmRlckN1c3RvbUhlYWRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyRGF5Q29udGVudHM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1vbnRoQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyUXVhcnRlckNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlclllYXJDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvY3VzU2VsZWN0ZWRNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25EYXlNb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbk1vbnRoTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VFbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25ZZWFyTW91c2VMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd1BvcHBlckFycm93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBleGNsdWRlU2Nyb2xsYmFyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlbmFibGVUYWJMb29wOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjdXN0b21UaW1lSW5wdXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHdlZWtBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9udGhBcmlhTGFiZWxQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlUG9pbnRlckV2ZW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB5ZWFyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5jYWxjSW5pdGlhbFN0YXRlKCk7XG4gICAgdGhpcy5wcmV2ZW50Rm9jdXNUaW1lb3V0ID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKFxuICAgICAgcHJldlByb3BzLmlubGluZSAmJlxuICAgICAgaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZChwcmV2UHJvcHMuc2VsZWN0ZWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFByZVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcHJldlByb3BzLm1vbnRoc1Nob3duICE9PSB0aGlzLnByb3BzLm1vbnRoc1Nob3duXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbW9udGhTZWxlY3RlZEluOiAwIH0pO1xuICAgIH1cbiAgICBpZiAocHJldlByb3BzLmhpZ2hsaWdodERhdGVzICE9PSB0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM6IGdldEhpZ2h0TGlnaHREYXlzTWFwKHRoaXMucHJvcHMuaGlnaGxpZ2h0RGF0ZXMpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICFwcmV2U3RhdGUuZm9jdXNlZCAmJlxuICAgICAgIWlzRXF1YWwocHJldlByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzLnNlbGVjdGVkKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZTdGF0ZS5vcGVuICE9PSB0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIGlmIChwcmV2U3RhdGUub3BlbiA9PT0gZmFsc2UgJiYgdGhpcy5zdGF0ZS5vcGVuID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhck9wZW4oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZTdGF0ZS5vcGVuID09PSB0cnVlICYmIHRoaXMuc3RhdGUub3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNsZWFyUHJldmVudEZvY3VzVGltZW91dCgpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICB9XG5cbiAgZ2V0UHJlU2VsZWN0aW9uID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW5Ub0RhdGVcbiAgICAgID8gdGhpcy5wcm9wcy5vcGVuVG9EYXRlXG4gICAgICA6IHRoaXMucHJvcHMuc2VsZWN0c0VuZCAmJiB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICA/IHRoaXMucHJvcHMuc3RhcnREYXRlXG4gICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzU3RhcnQgJiYgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLmVuZERhdGVcbiAgICAgICAgICA6IG5ld0RhdGUoKTtcblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGZyb20gc3RyaW5nIGZvcm1hdCB0byBzdGFuZGFyZCBEYXRlIGZvcm1hdFxuICBtb2RpZnlIb2xpZGF5cyA9ICgpID0+XG4gICAgdGhpcy5wcm9wcy5ob2xpZGF5cz8ucmVkdWNlKChhY2N1bXVsYXRvciwgaG9saWRheSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGhvbGlkYXkuZGF0ZSk7XG4gICAgICBpZiAoIWlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gWy4uLmFjY3VtdWxhdG9yLCB7IC4uLmhvbGlkYXksIGRhdGUgfV07XG4gICAgfSwgW10pO1xuXG4gIGNhbGNJbml0aWFsU3RhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFByZVNlbGVjdGlvbiA9IHRoaXMuZ2V0UHJlU2VsZWN0aW9uKCk7XG4gICAgY29uc3QgbWluRGF0ZSA9IGdldEVmZmVjdGl2ZU1pbkRhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IGdldEVmZmVjdGl2ZU1heERhdGUodGhpcy5wcm9wcyk7XG4gICAgY29uc3QgYm91bmRlZFByZVNlbGVjdGlvbiA9XG4gICAgICBtaW5EYXRlICYmIGlzQmVmb3JlKGRlZmF1bHRQcmVTZWxlY3Rpb24sIHN0YXJ0T2ZEYXkobWluRGF0ZSkpXG4gICAgICAgID8gbWluRGF0ZVxuICAgICAgICA6IG1heERhdGUgJiYgaXNBZnRlcihkZWZhdWx0UHJlU2VsZWN0aW9uLCBlbmRPZkRheShtYXhEYXRlKSlcbiAgICAgICAgICA/IG1heERhdGVcbiAgICAgICAgICA6IGRlZmF1bHRQcmVTZWxlY3Rpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IHRoaXMucHJvcHMuc3RhcnRPcGVuIHx8IGZhbHNlLFxuICAgICAgcHJldmVudEZvY3VzOiBmYWxzZSxcbiAgICAgIHByZVNlbGVjdGlvbjpcbiAgICAgICAgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlXG4gICAgICAgICAgPyB0aGlzLnByb3BzLnN0YXJ0RGF0ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZCkgPz8gYm91bmRlZFByZVNlbGVjdGlvbixcbiAgICAgIC8vIHRyYW5zZm9ybWluZyBoaWdobGlnaHRlZCBkYXlzIChwZXJoYXBzIG5lc3RlZCBhcnJheSlcbiAgICAgIC8vIHRvIGZsYXQgTWFwIGZvciBmYXN0ZXIgYWNjZXNzIGluIGRheS5qc3hcbiAgICAgIGhpZ2hsaWdodERhdGVzOiBnZXRIaWdodExpZ2h0RGF5c01hcCh0aGlzLnByb3BzLmhpZ2hsaWdodERhdGVzKSxcbiAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgLy8gdXNlZCB0byBmb2N1cyBkYXkgaW4gaW5saW5lIHZlcnNpb24gYWZ0ZXIgbW9udGggaGFzIGNoYW5nZWQsIGJ1dCBub3Qgb25cbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICBzaG91bGRGb2N1c0RheUlubGluZTogZmFsc2UsXG4gICAgICBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogZmFsc2UsXG4gICAgfTtcbiAgfTtcblxuICBjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmVudEZvY3VzVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIHNldEZvY3VzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZm9jdXMpIHtcbiAgICAgIHRoaXMuaW5wdXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZXRCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuYmx1cikge1xuICAgICAgdGhpcy5pbnB1dC5ibHVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgc2V0T3BlbiA9IChvcGVuLCBza2lwU2V0Qmx1ciA9IGZhbHNlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgb3Blbjogb3BlbixcbiAgICAgICAgcHJlU2VsZWN0aW9uOlxuICAgICAgICAgIG9wZW4gJiYgdGhpcy5zdGF0ZS5vcGVuXG4gICAgICAgICAgICA/IHRoaXMuc3RhdGUucHJlU2VsZWN0aW9uXG4gICAgICAgICAgICA6IHRoaXMuY2FsY0luaXRpYWxTdGF0ZSgpLnByZVNlbGVjdGlvbixcbiAgICAgICAgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUsXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgIGZvY3VzZWQ6IHNraXBTZXRCbHVyID8gcHJldi5mb2N1c2VkIDogZmFsc2UsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgIXNraXBTZXRCbHVyICYmIHRoaXMuc2V0Qmx1cigpO1xuXG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH07XG4gIGlucHV0T2sgPSAoKSA9PiBpc0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuXG4gIGlzQ2FsZW5kYXJPcGVuID0gKCkgPT5cbiAgICB0aGlzLnByb3BzLm9wZW4gPT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLnN0YXRlLm9wZW4gJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMucmVhZE9ubHlcbiAgICAgIDogdGhpcy5wcm9wcy5vcGVuO1xuXG4gIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnByZXZlbnRGb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgIGlmICghdGhpcy5wcm9wcy5wcmV2ZW50T3Blbk9uRm9jdXMgJiYgIXRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTtcbiAgfTtcblxuICBzZW5kRm9jdXNCYWNrVG9JbnB1dCA9ICgpID0+IHtcbiAgICAvLyBDbGVhciBwcmV2aW91cyB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuICAgIGlmICh0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQpIHtcbiAgICAgIHRoaXMuY2xlYXJQcmV2ZW50Rm9jdXNUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgdGhlIHBvcHBlciBhbmQgcmVmb2N1cyB0aGUgaW5wdXRcbiAgICAvLyBzdG9wIHRoZSBpbnB1dCBmcm9tIGF1dG8gb3BlbmluZyBvbkZvY3VzXG4gICAgLy8gc2V0Rm9jdXMgdG8gdGhlIGlucHV0XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogdHJ1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByZXZlbnRGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJldmVudEZvY3VzOiBmYWxzZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNhbmNlbEZvY3VzSW5wdXQgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQpO1xuICAgIHRoaXMuaW5wdXRGb2N1c1RpbWVvdXQgPSBudWxsO1xuICB9O1xuXG4gIGRlZmVyRm9jdXNJbnB1dCA9ICgpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzSW5wdXQoKTtcbiAgICB0aGlzLmlucHV0Rm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldEZvY3VzKCksIDEpO1xuICB9O1xuXG4gIGhhbmRsZURyb3Bkb3duRm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5jZWxGb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgaGFuZGxlQmx1ciA9IChldmVudCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5vcGVuIHx8IHRoaXMucHJvcHMud2l0aFBvcnRhbCB8fCB0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoUG9ydGFsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAoLi4uYWxsQXJncykgPT4ge1xuICAgIGxldCBldmVudCA9IGFsbEFyZ3NbMF07XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VSYXcpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VSYXcuYXBwbHkodGhpcywgYWxsQXJncyk7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnB1dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICBsYXN0UHJlU2VsZWN0Q2hhbmdlOiBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9JTlBVVCxcbiAgICB9KTtcbiAgICBsZXQgZGF0ZSA9IHBhcnNlRGF0ZShcbiAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgIHRoaXMucHJvcHMubG9jYWxlLFxuICAgICAgdGhpcy5wcm9wcy5zdHJpY3RQYXJzaW5nLFxuICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICk7XG4gICAgLy8gVXNlIGRhdGUgZnJvbSBgc2VsZWN0ZWRgIHByb3Agd2hlbiBtYW5pcHVsYXRpbmcgb25seSB0aW1lIGZvciBpbnB1dCB2YWx1ZVxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5ICYmXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICBkYXRlICYmXG4gICAgICAhaXNTYW1lRGF5KGRhdGUsIHRoaXMucHJvcHMuc2VsZWN0ZWQpXG4gICAgKSB7XG4gICAgICBkYXRlID0gc2V0KHRoaXMucHJvcHMuc2VsZWN0ZWQsIHtcbiAgICAgICAgaG91cnM6IGdldEhvdXJzKGRhdGUpLFxuICAgICAgICBtaW51dGVzOiBnZXRNaW51dGVzKGRhdGUpLFxuICAgICAgICBzZWNvbmRzOiBnZXRTZWNvbmRzKGRhdGUpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRlIHx8ICFldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3QgPSAoZGF0ZSwgZXZlbnQsIG1vbnRoU2VsZWN0ZWRJbikgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QgJiYgIXRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIC8vIFByZXZlbnRpbmcgb25Gb2N1cyBldmVudCB0byBmaXggaXNzdWVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9IYWNrZXIweDAxL3JlYWN0LWRhdGVwaWNrZXIvaXNzdWVzLzYyOFxuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVJhdykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVJhdyhldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2VsZWN0ZWQoZGF0ZSwgZXZlbnQsIGZhbHNlLCBtb250aFNlbGVjdGVkSW4pO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dEYXRlU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2U6IHRydWUgfSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGRhdGUpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmICFpc0RhdGVCZWZvcmUoZGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBzZXRTZWxlY3RlZCA9IChkYXRlLCBldmVudCwga2VlcElucHV0LCBtb250aFNlbGVjdGVkSW4pID0+IHtcbiAgICBsZXQgY2hhbmdlZERhdGUgPSBkYXRlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZERhdGUgIT09IG51bGwgJiZcbiAgICAgICAgaXNZZWFyRGlzYWJsZWQoZ2V0WWVhcihjaGFuZ2VkRGF0ZSksIHRoaXMucHJvcHMpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICBpZiAoY2hhbmdlZERhdGUgIT09IG51bGwgJiYgaXNNb250aERpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGFuZ2VkRGF0ZSAhPT0gbnVsbCAmJiBpc0RheURpc2FibGVkKGNoYW5nZWREYXRlLCB0aGlzLnByb3BzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsXG4gICAgICBzZWxlY3RzUmFuZ2UsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgc2VsZWN0c011bHRpcGxlLFxuICAgICAgc2VsZWN0ZWREYXRlcyxcbiAgICAgIG1pblRpbWUsXG4gICAgICBzd2FwUmFuZ2UsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICAhaXNFcXVhbCh0aGlzLnByb3BzLnNlbGVjdGVkLCBjaGFuZ2VkRGF0ZSkgfHxcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dTYW1lRGF5IHx8XG4gICAgICBzZWxlY3RzUmFuZ2UgfHxcbiAgICAgIHNlbGVjdHNNdWx0aXBsZVxuICAgICkge1xuICAgICAgaWYgKGNoYW5nZWREYXRlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkICYmXG4gICAgICAgICAgKCFrZWVwSW5wdXQgfHxcbiAgICAgICAgICAgICghdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdCAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5zaG93VGltZVNlbGVjdE9ubHkgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGNoYW5nZWREYXRlID0gc2V0VGltZShjaGFuZ2VkRGF0ZSwge1xuICAgICAgICAgICAgaG91cjogZ2V0SG91cnModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBtaW51dGU6IGdldE1pbnV0ZXModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgICBzZWNvbmQ6IGdldFNlY29uZHModGhpcy5wcm9wcy5zZWxlY3RlZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBtaW5UaW1lIGlzIHByZXNlbnQgdGhlbiBzZXQgdGhlIHRpbWUgdG8gbWluVGltZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWtlZXBJbnB1dCAmJlxuICAgICAgICAgICh0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobWluVGltZSkge1xuICAgICAgICAgICAgY2hhbmdlZERhdGUgPSBzZXRUaW1lKGNoYW5nZWREYXRlLCB7XG4gICAgICAgICAgICAgIGhvdXI6IG1pblRpbWUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgbWludXRlOiBtaW5UaW1lLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgc2Vjb25kOiBtaW5UaW1lLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHByZVNlbGVjdGlvbjogY2hhbmdlZERhdGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmZvY3VzU2VsZWN0ZWRNb250aCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb250aFNlbGVjdGVkSW46IG1vbnRoU2VsZWN0ZWRJbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdHNSYW5nZSkge1xuICAgICAgICBjb25zdCBub1JhbmdlcyA9ICFzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0UmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGU7XG4gICAgICAgIGNvbnN0IGlzUmFuZ2VGaWxsZWQgPSBzdGFydERhdGUgJiYgZW5kRGF0ZTtcbiAgICAgICAgaWYgKG5vUmFuZ2VzKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0UmFuZ2UpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlZERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKFtudWxsLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlQmVmb3JlKGNoYW5nZWREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgICBpZiAoc3dhcFJhbmdlKSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFtjaGFuZ2VkRGF0ZSwgc3RhcnREYXRlXSwgZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlLCBudWxsXSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbc3RhcnREYXRlLCBjaGFuZ2VkRGF0ZV0sIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmFuZ2VGaWxsZWQpIHtcbiAgICAgICAgICBvbkNoYW5nZShbY2hhbmdlZERhdGUsIG51bGxdLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0c011bHRpcGxlKSB7XG4gICAgICAgIGlmICghc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgb25DaGFuZ2UoW2NoYW5nZWREYXRlXSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZERhdGVzLnNvbWUoXG4gICAgICAgICAgICAoc2VsZWN0ZWREYXRlKSA9PiBpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBjaGFuZ2VkRGF0ZSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc0NoYW5nZWREYXRlQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RGF0ZXMgPSBzZWxlY3RlZERhdGVzLmZpbHRlcihcbiAgICAgICAgICAgICAgKHNlbGVjdGVkRGF0ZSkgPT4gIWlzU2FtZURheShzZWxlY3RlZERhdGUsIGNoYW5nZWREYXRlKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIG9uQ2hhbmdlKG5leHREYXRlcywgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNoYW5nZShbLi4uc2VsZWN0ZWREYXRlcywgY2hhbmdlZERhdGVdLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbkNoYW5nZShjaGFuZ2VkRGF0ZSwgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgha2VlcElucHV0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGNoYW5nZWREYXRlLCBldmVudCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbnVsbCB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gV2hlbiBjaGVja2luZyBwcmVTZWxlY3Rpb24gdmlhIG1pbi9tYXhEYXRlLCB0aW1lcyBuZWVkIHRvIGJlIG1hbmlwdWxhdGVkIHZpYSBzdGFydE9mRGF5L2VuZE9mRGF5XG4gIHNldFByZVNlbGVjdGlvbiA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgaGFzTWluRGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1pbkRhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgY29uc3QgaGFzTWF4RGF0ZSA9IHR5cGVvZiB0aGlzLnByb3BzLm1heERhdGUgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgbGV0IGlzVmFsaWREYXRlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGUpO1xuICAgICAgaWYgKGhhc01pbkRhdGUgJiYgaGFzTWF4RGF0ZSkge1xuICAgICAgICAvLyBpc0RheUluUmFuZ2UgdXNlcyBzdGFydE9mRGF5IGludGVybmFsbHksIHNvIG5vdCBuZWNlc3NhcnkgdG8gbWFuaXB1bGF0ZSB0aW1lcyBoZXJlXG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID0gaXNEYXlJblJhbmdlKFxuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgdGhpcy5wcm9wcy5taW5EYXRlLFxuICAgICAgICAgIHRoaXMucHJvcHMubWF4RGF0ZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWluRGF0ZSkge1xuICAgICAgICBjb25zdCBtaW5EYXRlU3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkodGhpcy5wcm9wcy5taW5EYXRlKTtcbiAgICAgICAgaXNWYWxpZERhdGVTZWxlY3Rpb24gPVxuICAgICAgICAgIGlzQWZ0ZXIoZGF0ZSwgbWluRGF0ZVN0YXJ0T2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWluRGF0ZVN0YXJ0T2ZEYXkpO1xuICAgICAgfSBlbHNlIGlmIChoYXNNYXhEYXRlKSB7XG4gICAgICAgIGNvbnN0IG1heERhdGVFbmRPZkRheSA9IGVuZE9mRGF5KHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgICAgIGlzVmFsaWREYXRlU2VsZWN0aW9uID1cbiAgICAgICAgICBpc0JlZm9yZShkYXRlLCBtYXhEYXRlRW5kT2ZEYXkpIHx8XG4gICAgICAgICAgaXNFcXVhbChkYXRlU3RhcnRPZkRheSwgbWF4RGF0ZUVuZE9mRGF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzVmFsaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcHJlU2VsZWN0aW9uOiBkYXRlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZUNhbGVuZGFyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0T3BlbighdGhpcy5zdGF0ZS5vcGVuKTtcbiAgfTtcblxuICBoYW5kbGVUaW1lQ2hhbmdlID0gKHRpbWUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZFxuICAgICAgOiB0aGlzLmdldFByZVNlbGVjdGlvbigpO1xuICAgIGxldCBjaGFuZ2VkRGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWRcbiAgICAgID8gdGltZVxuICAgICAgOiBzZXRUaW1lKHNlbGVjdGVkLCB7XG4gICAgICAgICAgaG91cjogZ2V0SG91cnModGltZSksXG4gICAgICAgICAgbWludXRlOiBnZXRNaW51dGVzKHRpbWUpLFxuICAgICAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlU2VsZWN0aW9uOiBjaGFuZ2VkRGF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hhbmdlZERhdGUpO1xuICAgIGlmICh0aGlzLnByb3BzLnNob3VsZENsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnNob3dUaW1lSW5wdXQpIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5IHx8IHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1JlbmRlckFyaWFMaXZlTWVzc2FnZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IG51bGwgfSk7XG4gIH07XG5cbiAgb25JbnB1dENsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiAhdGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25JbnB1dENsaWNrKCk7XG4gIH07XG5cbiAgb25JbnB1dEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5zdGF0ZS5vcGVuICYmXG4gICAgICAhdGhpcy5wcm9wcy5pbmxpbmUgJiZcbiAgICAgICF0aGlzLnByb3BzLnByZXZlbnRPcGVuT25Gb2N1c1xuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fFxuICAgICAgICBldmVudEtleSA9PT0gXCJBcnJvd1VwXCIgfHxcbiAgICAgICAgZXZlbnRLZXkgPT09IFwiRW50ZXJcIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub25JbnB1dENsaWNrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgY2FsZW5kYXIgaXMgb3BlbiwgdGhlc2Uga2V5cyB3aWxsIGZvY3VzIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50S2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzZWxlY3RvclN0cmluZyA9XG4gICAgICAgICAgdGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlciAmJiB0aGlzLnByb3BzLnNob3dXZWVrTnVtYmVyc1xuICAgICAgICAgICAgPyAnLnJlYWN0LWRhdGVwaWNrZXJfX3dlZWstbnVtYmVyW3RhYmluZGV4PVwiMFwiXSdcbiAgICAgICAgICAgIDogJy5yZWFjdC1kYXRlcGlja2VyX19kYXlbdGFiaW5kZXg9XCIwXCJdJztcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID1cbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUgJiZcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmNvbXBvbmVudE5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW0uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29weSA9IG5ld0RhdGUodGhpcy5zdGF0ZS5wcmVTZWxlY3Rpb24pO1xuICAgICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuaW5wdXRPaygpICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5sYXN0UHJlU2VsZWN0Q2hhbmdlID09PSBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAgICAgIXRoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdCAmJiB0aGlzLnNldFByZVNlbGVjdGlvbihjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiVGFiXCIpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlucHV0T2soKSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW5wdXRFcnJvcih7IGNvZGU6IDEsIG1zZzogSU5QVVRfRVJSXzEgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uUG9ydGFsS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChldmVudEtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBwcmV2ZW50Rm9jdXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRGb2N1czogZmFsc2UgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICAvLyBrZXlEb3duIGV2ZW50cyBwYXNzZWQgZG93biB0byBkYXkuanN4XG4gIG9uRGF5S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc1NoaWZ0S2V5QWN0aXZlID0gZXZlbnQuc2hpZnRLZXk7XG5cbiAgICBjb25zdCBjb3B5ID0gbmV3RGF0ZSh0aGlzLnN0YXRlLnByZVNlbGVjdGlvbik7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdChjb3B5LCBldmVudCk7XG4gICAgICAhdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uU2VsZWN0ICYmIHRoaXMuc2V0UHJlU2VsZWN0aW9uKGNvcHkpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRLZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICBpZiAoIXRoaXMuaW5wdXRPaygpKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnB1dEVycm9yKHsgY29kZTogMSwgbXNnOiBJTlBVVF9FUlJfMSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkS2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICBsZXQgbmV3U2VsZWN0aW9uO1xuICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1dlZWtQaWNrZXIpIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBzdWJEYXlzKGNvcHksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93V2Vla1BpY2tlcikge1xuICAgICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGFkZERheXMoY29weSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IHN1YldlZWtzKGNvcHksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gYWRkV2Vla3MoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQYWdlVXBcIjpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBpc1NoaWZ0S2V5QWN0aXZlXG4gICAgICAgICAgICA/IHN1YlllYXJzKGNvcHksIDEpXG4gICAgICAgICAgICA6IHN1Yk1vbnRocyhjb3B5LCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBhZ2VEb3duXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gaXNTaGlmdEtleUFjdGl2ZVxuICAgICAgICAgICAgPyBhZGRZZWFycyhjb3B5LCAxKVxuICAgICAgICAgICAgOiBhZGRNb250aHMoY29weSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJIb21lXCI6XG4gICAgICAgICAgbmV3U2VsZWN0aW9uID0gZ2V0U3RhcnRPZldlZWsoXG4gICAgICAgICAgICBjb3B5LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5sb2NhbGUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkVuZFwiOlxuICAgICAgICAgIG5ld1NlbGVjdGlvbiA9IGdldEVuZE9mV2Vlayhjb3B5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXdTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFuZXdTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25JbnB1dEVycm9yKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbklucHV0RXJyb3IoeyBjb2RlOiAxLCBtc2c6IElOUFVUX0VSUl8xIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFByZVNlbGVjdENoYW5nZTogUFJFU0VMRUNUX0NIQU5HRV9WSUFfTkFWSUdBVEUgfSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5hZGp1c3REYXRlT25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZChuZXdTZWxlY3Rpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRQcmVTZWxlY3Rpb24obmV3U2VsZWN0aW9uKTtcbiAgICAgIC8vIG5lZWQgdG8gZmlndXJlIG91dCB3aGV0aGVyIG1vbnRoIGhhcyBjaGFuZ2VkIHRvIGZvY3VzIGRheSBpbiBpbmxpbmUgdmVyc2lvblxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lKSB7XG4gICAgICAgIGNvbnN0IHByZXZNb250aCA9IGdldE1vbnRoKGNvcHkpO1xuICAgICAgICBjb25zdCBuZXdNb250aCA9IGdldE1vbnRoKG5ld1NlbGVjdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZZZWFyID0gZ2V0WWVhcihjb3B5KTtcbiAgICAgICAgY29uc3QgbmV3WWVhciA9IGdldFllYXIobmV3U2VsZWN0aW9uKTtcblxuICAgICAgICBpZiAocHJldk1vbnRoICE9PSBuZXdNb250aCB8fCBwcmV2WWVhciAhPT0gbmV3WWVhcikge1xuICAgICAgICAgIC8vIG1vbnRoIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1vbnRoIGhhc24ndCBjaGFuZ2VkXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3VsZEZvY3VzRGF5SW5saW5lOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBoYW5kbGUgZ2VuZXJpYyBrZXkgZG93biBldmVudHMgaW4gdGhlIHBvcHBlciB0aGF0IGRvIG5vdCBhZGp1c3Qgb3Igc2VsZWN0IGRhdGVzXG4gIC8vIGV4OiB3aGlsZSBmb2N1c2luZyBwcmV2IGFuZCBuZXh0IG1vbnRoIGJ1dHRvbnNcbiAgb25Qb3BwZXJLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGV2ZW50S2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZW5kRm9jdXNCYWNrVG9JbnB1dCgpO1xuICAgIH1cbiAgfTtcblxuICBvbkNsZWFyQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VuZEZvY3VzQmFja1RvSW5wdXQoKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdHNSYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbbnVsbCwgbnVsbF0sIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsLCBldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBudWxsIH0pO1xuICB9O1xuXG4gIGNsZWFyID0gKCkgPT4ge1xuICAgIHRoaXMub25DbGVhckNsaWNrKCk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsID09PSBcImJvb2xlYW5cIiAmJlxuICAgICAgdGhpcy5wcm9wcy5jbG9zZU9uU2Nyb2xsXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlT25TY3JvbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNjcm9sbChldmVudCkpIHtcbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlubGluZSAmJiAhdGhpcy5pc0NhbGVuZGFyT3BlbigpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxXcmFwcGVkQ2FsZW5kYXJcbiAgICAgICAgcmVmPXsoZWxlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbGVtO1xuICAgICAgICB9fVxuICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubG9jYWxlfVxuICAgICAgICBjYWxlbmRhclN0YXJ0RGF5PXt0aGlzLnByb3BzLmNhbGVuZGFyU3RhcnREYXl9XG4gICAgICAgIGNob29zZURheUFyaWFMYWJlbFByZWZpeD17dGhpcy5wcm9wcy5jaG9vc2VEYXlBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIGRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLmRpc2FibGVkRGF5QXJpYUxhYmVsUHJlZml4fVxuICAgICAgICB3ZWVrQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLndlZWtBcmlhTGFiZWxQcmVmaXh9XG4gICAgICAgIG1vbnRoQXJpYUxhYmVsUHJlZml4PXt0aGlzLnByb3BzLm1vbnRoQXJpYUxhYmVsUHJlZml4fVxuICAgICAgICBhZGp1c3REYXRlT25DaGFuZ2U9e3RoaXMucHJvcHMuYWRqdXN0RGF0ZU9uQ2hhbmdlfVxuICAgICAgICBzZXRPcGVuPXt0aGlzLnNldE9wZW59XG4gICAgICAgIHNob3VsZENsb3NlT25TZWxlY3Q9e3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPblNlbGVjdH1cbiAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0Q2FsZW5kYXJ9XG4gICAgICAgIHVzZVdlZWtkYXlzU2hvcnQ9e3RoaXMucHJvcHMudXNlV2Vla2RheXNTaG9ydH1cbiAgICAgICAgZm9ybWF0V2Vla0RheT17dGhpcy5wcm9wcy5mb3JtYXRXZWVrRGF5fVxuICAgICAgICBkcm9wZG93bk1vZGU9e3RoaXMucHJvcHMuZHJvcGRvd25Nb2RlfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cbiAgICAgICAgcHJlU2VsZWN0aW9uPXt0aGlzLnN0YXRlLnByZVNlbGVjdGlvbn1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICBvbldlZWtTZWxlY3Q9e3RoaXMucHJvcHMub25XZWVrU2VsZWN0fVxuICAgICAgICBvcGVuVG9EYXRlPXt0aGlzLnByb3BzLm9wZW5Ub0RhdGV9XG4gICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfVxuICAgICAgICBzZWxlY3RzU3RhcnQ9e3RoaXMucHJvcHMuc2VsZWN0c1N0YXJ0fVxuICAgICAgICBzZWxlY3RzRW5kPXt0aGlzLnByb3BzLnNlbGVjdHNFbmR9XG4gICAgICAgIHNlbGVjdHNSYW5nZT17dGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2V9XG4gICAgICAgIHNlbGVjdHNNdWx0aXBsZT17dGhpcy5wcm9wcy5zZWxlY3RzTXVsdGlwbGV9XG4gICAgICAgIHNlbGVjdGVkRGF0ZXM9e3RoaXMucHJvcHMuc2VsZWN0ZWREYXRlc31cbiAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cbiAgICAgICAgZW5kRGF0ZT17dGhpcy5wcm9wcy5lbmREYXRlfVxuICAgICAgICBleGNsdWRlRGF0ZXM9e3RoaXMucHJvcHMuZXhjbHVkZURhdGVzfVxuICAgICAgICBleGNsdWRlRGF0ZUludGVydmFscz17dGhpcy5wcm9wcy5leGNsdWRlRGF0ZUludGVydmFsc31cbiAgICAgICAgZmlsdGVyRGF0ZT17dGhpcy5wcm9wcy5maWx0ZXJEYXRlfVxuICAgICAgICBvbkNsaWNrT3V0c2lkZT17dGhpcy5oYW5kbGVDYWxlbmRhckNsaWNrT3V0c2lkZX1cbiAgICAgICAgZm9ybWF0V2Vla051bWJlcj17dGhpcy5wcm9wcy5mb3JtYXRXZWVrTnVtYmVyfVxuICAgICAgICBoaWdobGlnaHREYXRlcz17dGhpcy5zdGF0ZS5oaWdobGlnaHREYXRlc31cbiAgICAgICAgaG9saWRheXM9e2dldEhvbGlkYXlzTWFwKHRoaXMubW9kaWZ5SG9saWRheXMoKSl9XG4gICAgICAgIGluY2x1ZGVEYXRlcz17dGhpcy5wcm9wcy5pbmNsdWRlRGF0ZXN9XG4gICAgICAgIGluY2x1ZGVEYXRlSW50ZXJ2YWxzPXt0aGlzLnByb3BzLmluY2x1ZGVEYXRlSW50ZXJ2YWxzfVxuICAgICAgICBpbmNsdWRlVGltZXM9e3RoaXMucHJvcHMuaW5jbHVkZVRpbWVzfVxuICAgICAgICBpbmplY3RUaW1lcz17dGhpcy5wcm9wcy5pbmplY3RUaW1lc31cbiAgICAgICAgaW5saW5lPXt0aGlzLnByb3BzLmlubGluZX1cbiAgICAgICAgc2hvdWxkRm9jdXNEYXlJbmxpbmU9e3RoaXMuc3RhdGUuc2hvdWxkRm9jdXNEYXlJbmxpbmV9XG4gICAgICAgIHBlZWtOZXh0TW9udGg9e3RoaXMucHJvcHMucGVla05leHRNb250aH1cbiAgICAgICAgc2hvd01vbnRoRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoRHJvcGRvd259XG4gICAgICAgIHNob3dQcmV2aW91c01vbnRocz17dGhpcy5wcm9wcy5zaG93UHJldmlvdXNNb250aHN9XG4gICAgICAgIHVzZVNob3J0TW9udGhJbkRyb3Bkb3duPXt0aGlzLnByb3BzLnVzZVNob3J0TW9udGhJbkRyb3Bkb3dufVxuICAgICAgICBzaG93TW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2hvd01vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICBzaG93V2Vla051bWJlcnM9e3RoaXMucHJvcHMuc2hvd1dlZWtOdW1iZXJzfVxuICAgICAgICBzaG93WWVhckRyb3Bkb3duPXt0aGlzLnByb3BzLnNob3dZZWFyRHJvcGRvd259XG4gICAgICAgIHdpdGhQb3J0YWw9e3RoaXMucHJvcHMud2l0aFBvcnRhbH1cbiAgICAgICAgZm9yY2VTaG93TW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLmZvcmNlU2hvd01vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2hvd0Rpc2FibGVkTW9udGhOYXZpZ2F0aW9uPXt0aGlzLnByb3BzLnNob3dEaXNhYmxlZE1vbnRoTmF2aWdhdGlvbn1cbiAgICAgICAgc2Nyb2xsYWJsZVllYXJEcm9wZG93bj17dGhpcy5wcm9wcy5zY3JvbGxhYmxlWWVhckRyb3Bkb3dufVxuICAgICAgICBzY3JvbGxhYmxlTW9udGhZZWFyRHJvcGRvd249e3RoaXMucHJvcHMuc2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3dufVxuICAgICAgICB0b2RheUJ1dHRvbj17dGhpcy5wcm9wcy50b2RheUJ1dHRvbn1cbiAgICAgICAgd2Vla0xhYmVsPXt0aGlzLnByb3BzLndlZWtMYWJlbH1cbiAgICAgICAgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3M9e291dHNpZGVDbGlja0lnbm9yZUNsYXNzfVxuICAgICAgICBmaXhlZEhlaWdodD17dGhpcy5wcm9wcy5maXhlZEhlaWdodH1cbiAgICAgICAgbW9udGhzU2hvd249e3RoaXMucHJvcHMubW9udGhzU2hvd259XG4gICAgICAgIG1vbnRoU2VsZWN0ZWRJbj17dGhpcy5zdGF0ZS5tb250aFNlbGVjdGVkSW59XG4gICAgICAgIG9uRHJvcGRvd25Gb2N1cz17dGhpcy5oYW5kbGVEcm9wZG93bkZvY3VzfVxuICAgICAgICBvbk1vbnRoQ2hhbmdlPXt0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2V9XG4gICAgICAgIG9uWWVhckNoYW5nZT17dGhpcy5wcm9wcy5vblllYXJDaGFuZ2V9XG4gICAgICAgIGRheUNsYXNzTmFtZT17dGhpcy5wcm9wcy5kYXlDbGFzc05hbWV9XG4gICAgICAgIHdlZWtEYXlDbGFzc05hbWU9e3RoaXMucHJvcHMud2Vla0RheUNsYXNzTmFtZX1cbiAgICAgICAgbW9udGhDbGFzc05hbWU9e3RoaXMucHJvcHMubW9udGhDbGFzc05hbWV9XG4gICAgICAgIHRpbWVDbGFzc05hbWU9e3RoaXMucHJvcHMudGltZUNsYXNzTmFtZX1cbiAgICAgICAgc2hvd0RhdGVTZWxlY3Q9e3RoaXMucHJvcHMuc2hvd0RhdGVTZWxlY3R9XG4gICAgICAgIHNob3dUaW1lU2VsZWN0PXt0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0fVxuICAgICAgICBzaG93VGltZVNlbGVjdE9ubHk9e3RoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5fVxuICAgICAgICBvblRpbWVDaGFuZ2U9e3RoaXMuaGFuZGxlVGltZUNoYW5nZX1cbiAgICAgICAgdGltZUZvcm1hdD17dGhpcy5wcm9wcy50aW1lRm9ybWF0fVxuICAgICAgICB0aW1lSW50ZXJ2YWxzPXt0aGlzLnByb3BzLnRpbWVJbnRlcnZhbHN9XG4gICAgICAgIG1pblRpbWU9e3RoaXMucHJvcHMubWluVGltZX1cbiAgICAgICAgbWF4VGltZT17dGhpcy5wcm9wcy5tYXhUaW1lfVxuICAgICAgICBleGNsdWRlVGltZXM9e3RoaXMucHJvcHMuZXhjbHVkZVRpbWVzfVxuICAgICAgICBmaWx0ZXJUaW1lPXt0aGlzLnByb3BzLmZpbHRlclRpbWV9XG4gICAgICAgIHRpbWVDYXB0aW9uPXt0aGlzLnByb3BzLnRpbWVDYXB0aW9ufVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2FsZW5kYXJDbGFzc05hbWV9XG4gICAgICAgIGNvbnRhaW5lcj17dGhpcy5wcm9wcy5jYWxlbmRhckNvbnRhaW5lcn1cbiAgICAgICAgeWVhckl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckl0ZW1OdW1iZXJ9XG4gICAgICAgIHllYXJEcm9wZG93bkl0ZW1OdW1iZXI9e3RoaXMucHJvcHMueWVhckRyb3Bkb3duSXRlbU51bWJlcn1cbiAgICAgICAgcHJldmlvdXNNb250aEFyaWFMYWJlbD17dGhpcy5wcm9wcy5wcmV2aW91c01vbnRoQXJpYUxhYmVsfVxuICAgICAgICBwcmV2aW91c01vbnRoQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNNb250aEJ1dHRvbkxhYmVsfVxuICAgICAgICBuZXh0TW9udGhBcmlhTGFiZWw9e3RoaXMucHJvcHMubmV4dE1vbnRoQXJpYUxhYmVsfVxuICAgICAgICBuZXh0TW9udGhCdXR0b25MYWJlbD17dGhpcy5wcm9wcy5uZXh0TW9udGhCdXR0b25MYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLnByZXZpb3VzWWVhckFyaWFMYWJlbH1cbiAgICAgICAgcHJldmlvdXNZZWFyQnV0dG9uTGFiZWw9e3RoaXMucHJvcHMucHJldmlvdXNZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIG5leHRZZWFyQXJpYUxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQXJpYUxhYmVsfVxuICAgICAgICBuZXh0WWVhckJ1dHRvbkxhYmVsPXt0aGlzLnByb3BzLm5leHRZZWFyQnV0dG9uTGFiZWx9XG4gICAgICAgIHRpbWVJbnB1dExhYmVsPXt0aGlzLnByb3BzLnRpbWVJbnB1dExhYmVsfVxuICAgICAgICBkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbj17dGhpcy5wcm9wcy5kaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbn1cbiAgICAgICAgcmVuZGVyQ3VzdG9tSGVhZGVyPXt0aGlzLnByb3BzLnJlbmRlckN1c3RvbUhlYWRlcn1cbiAgICAgICAgcG9wcGVyUHJvcHM9e3RoaXMucHJvcHMucG9wcGVyUHJvcHN9XG4gICAgICAgIHJlbmRlckRheUNvbnRlbnRzPXt0aGlzLnByb3BzLnJlbmRlckRheUNvbnRlbnRzfVxuICAgICAgICByZW5kZXJNb250aENvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyTW9udGhDb250ZW50fVxuICAgICAgICByZW5kZXJRdWFydGVyQ29udGVudD17dGhpcy5wcm9wcy5yZW5kZXJRdWFydGVyQ29udGVudH1cbiAgICAgICAgcmVuZGVyWWVhckNvbnRlbnQ9e3RoaXMucHJvcHMucmVuZGVyWWVhckNvbnRlbnR9XG4gICAgICAgIG9uRGF5TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vbkRheU1vdXNlRW50ZXJ9XG4gICAgICAgIG9uTW9udGhNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uTW9udGhNb3VzZUxlYXZlfVxuICAgICAgICBvblllYXJNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uWWVhck1vdXNlRW50ZXJ9XG4gICAgICAgIG9uWWVhck1vdXNlTGVhdmU9e3RoaXMucHJvcHMub25ZZWFyTW91c2VMZWF2ZX1cbiAgICAgICAgc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2U9e3RoaXMucHJvcHMuc2VsZWN0c0Rpc2FibGVkRGF5c0luUmFuZ2V9XG4gICAgICAgIHNob3dUaW1lSW5wdXQ9e3RoaXMucHJvcHMuc2hvd1RpbWVJbnB1dH1cbiAgICAgICAgc2hvd01vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93RnVsbE1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93RnVsbE1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1R3b0NvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyfVxuICAgICAgICBzaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93Rm91ckNvbHVtbk1vbnRoWWVhclBpY2tlcn1cbiAgICAgICAgc2hvd1llYXJQaWNrZXI9e3RoaXMucHJvcHMuc2hvd1llYXJQaWNrZXJ9XG4gICAgICAgIHNob3dRdWFydGVyWWVhclBpY2tlcj17dGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXJ9XG4gICAgICAgIHNob3dXZWVrUGlja2VyPXt0aGlzLnByb3BzLnNob3dXZWVrUGlja2VyfVxuICAgICAgICBleGNsdWRlU2Nyb2xsYmFyPXt0aGlzLnByb3BzLmV4Y2x1ZGVTY3JvbGxiYXJ9XG4gICAgICAgIGhhbmRsZU9uS2V5RG93bj17dGhpcy5wcm9wcy5vbktleURvd259XG4gICAgICAgIGhhbmRsZU9uRGF5S2V5RG93bj17dGhpcy5vbkRheUtleURvd259XG4gICAgICAgIGlzSW5wdXRGb2N1c2VkPXt0aGlzLnN0YXRlLmZvY3VzZWR9XG4gICAgICAgIGN1c3RvbVRpbWVJbnB1dD17dGhpcy5wcm9wcy5jdXN0b21UaW1lSW5wdXR9XG4gICAgICAgIHNldFByZVNlbGVjdGlvbj17dGhpcy5zZXRQcmVTZWxlY3Rpb259XG4gICAgICAgIHVzZVBvaW50ZXJFdmVudD17dGhpcy5wcm9wcy51c2VQb2ludGVyRXZlbnR9XG4gICAgICAgIHllYXJDbGFzc05hbWU9e3RoaXMucHJvcHMueWVhckNsYXNzTmFtZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L1dyYXBwZWRDYWxlbmRhcj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckFyaWFMaXZlUmVnaW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0ZUZvcm1hdCwgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzQ29udGFpbnNUaW1lID1cbiAgICAgIHRoaXMucHJvcHMuc2hvd1RpbWVJbnB1dCB8fCB0aGlzLnByb3BzLnNob3dUaW1lU2VsZWN0O1xuICAgIGNvbnN0IGxvbmdEYXRlRm9ybWF0ID0gaXNDb250YWluc1RpbWUgPyBcIlBQUFBwXCIgOiBcIlBQUFBcIjtcbiAgICBsZXQgYXJpYUxpdmVNZXNzYWdlO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0c1JhbmdlKSB7XG4gICAgICBhcmlhTGl2ZU1lc3NhZ2UgPSBgU2VsZWN0ZWQgc3RhcnQgZGF0ZTogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRlRm9ybWF0OiBsb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgIH0sXG4gICAgICApfS4gJHtcbiAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlXG4gICAgICAgICAgPyBcIkVuZCBkYXRlOiBcIiArXG4gICAgICAgICAgICBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLmVuZERhdGUsIHtcbiAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd1RpbWVTZWxlY3RPbmx5KSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB0aW1lOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0LCBsb2NhbGUgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCB5ZWFyOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAgeyBkYXRlRm9ybWF0OiBcInl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93TW9udGhZZWFyUGlja2VyKSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBtb250aDogJHtzYWZlRGF0ZUZvcm1hdChcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgIHsgZGF0ZUZvcm1hdDogXCJNTU1NIHl5eXlcIiwgbG9jYWxlIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93UXVhcnRlclllYXJQaWNrZXIpIHtcbiAgICAgICAgYXJpYUxpdmVNZXNzYWdlID0gYFNlbGVjdGVkIHF1YXJ0ZXI6ICR7c2FmZURhdGVGb3JtYXQoXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiBcInl5eXksIFFRUVwiLFxuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyaWFMaXZlTWVzc2FnZSA9IGBTZWxlY3RlZCBkYXRlOiAke3NhZmVEYXRlRm9ybWF0KFxuICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogbG9uZ0RhdGVGb3JtYXQsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1kYXRlcGlja2VyX19hcmlhLWxpdmVcIlxuICAgICAgPlxuICAgICAgICB7YXJpYUxpdmVNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsc3godGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgIFtvdXRzaWRlQ2xpY2tJZ25vcmVDbGFzc106IHRoaXMuc3RhdGUub3BlbixcbiAgICB9KTtcblxuICAgIGNvbnN0IGN1c3RvbUlucHV0ID0gdGhpcy5wcm9wcy5jdXN0b21JbnB1dCB8fCA8aW5wdXQgdHlwZT1cInRleHRcIiAvPjtcbiAgICBjb25zdCBjdXN0b21JbnB1dFJlZiA9IHRoaXMucHJvcHMuY3VzdG9tSW5wdXRSZWYgfHwgXCJyZWZcIjtcbiAgICBjb25zdCBpbnB1dFZhbHVlID1cbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICA6IHR5cGVvZiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICA/IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RzUmFuZ2VcbiAgICAgICAgICAgID8gc2FmZURhdGVSYW5nZUZvcm1hdChcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdHNNdWx0aXBsZVxuICAgICAgICAgICAgICA/IHNhZmVNdWx0aXBsZURhdGVzRm9ybWF0KHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlcywgdGhpcy5wcm9wcylcbiAgICAgICAgICAgICAgOiBzYWZlRGF0ZUZvcm1hdCh0aGlzLnByb3BzLnNlbGVjdGVkLCB0aGlzLnByb3BzKTtcblxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY3VzdG9tSW5wdXQsIHtcbiAgICAgIFtjdXN0b21JbnB1dFJlZl06IChpbnB1dCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICB9LFxuICAgICAgdmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1cixcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25JbnB1dENsaWNrLFxuICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLFxuICAgICAgZm9ybTogdGhpcy5wcm9wcy5mb3JtLFxuICAgICAgYXV0b0ZvY3VzOiB0aGlzLnByb3BzLmF1dG9Gb2N1cyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyVGV4dCxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgYXV0b0NvbXBsZXRlOiB0aGlzLnByb3BzLmF1dG9Db21wbGV0ZSxcbiAgICAgIGNsYXNzTmFtZTogY2xzeChjdXN0b21JbnB1dC5wcm9wcy5jbGFzc05hbWUsIGNsYXNzTmFtZSksXG4gICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LFxuICAgICAgcmVxdWlyZWQ6IHRoaXMucHJvcHMucmVxdWlyZWQsXG4gICAgICB0YWJJbmRleDogdGhpcy5wcm9wcy50YWJJbmRleCxcbiAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiB0aGlzLnByb3BzLmFyaWFEZXNjcmliZWRCeSxcbiAgICAgIFwiYXJpYS1pbnZhbGlkXCI6IHRoaXMucHJvcHMuYXJpYUludmFsaWQsXG4gICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aGlzLnByb3BzLmFyaWFMYWJlbGxlZEJ5LFxuICAgICAgXCJhcmlhLXJlcXVpcmVkXCI6IHRoaXMucHJvcHMuYXJpYVJlcXVpcmVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlckNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ2xlYXJhYmxlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBjbGVhckJ1dHRvblRpdGxlLFxuICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUgPSBcIlwiLFxuICAgICAgYXJpYUxhYmVsQ2xvc2UgPSBcIkNsb3NlXCIsXG4gICAgICBzZWxlY3RlZERhdGVzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChcbiAgICAgIGlzQ2xlYXJhYmxlICYmXG4gICAgICAoc2VsZWN0ZWQgIT0gbnVsbCB8fFxuICAgICAgICBzdGFydERhdGUgIT0gbnVsbCB8fFxuICAgICAgICBlbmREYXRlICE9IG51bGwgfHxcbiAgICAgICAgc2VsZWN0ZWREYXRlcz8ubGVuZ3RoKVxuICAgICkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xzeChcbiAgICAgICAgICAgIFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvblwiLFxuICAgICAgICAgICAgY2xlYXJCdXR0b25DbGFzc05hbWUsXG4gICAgICAgICAgICB7IFwicmVhY3QtZGF0ZXBpY2tlcl9fY2xvc2UtaWNvbi0tZGlzYWJsZWRcIjogZGlzYWJsZWQgfSxcbiAgICAgICAgICApfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWxDbG9zZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xlYXJDbGlja31cbiAgICAgICAgICB0aXRsZT17Y2xlYXJCdXR0b25UaXRsZX1cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVySW5wdXRDb250YWluZXIoKSB7XG4gICAgY29uc3QgeyBzaG93SWNvbiwgaWNvbiwgY2FsZW5kYXJJY29uQ2xhc3NuYW1lLCB0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9wZW4gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2ByZWFjdC1kYXRlcGlja2VyX19pbnB1dC1jb250YWluZXIke1xuICAgICAgICAgIHNob3dJY29uID8gXCIgcmVhY3QtZGF0ZXBpY2tlcl9fdmlldy1jYWxlbmRhci1pY29uXCIgOiBcIlwiXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICB7c2hvd0ljb24gJiYgKFxuICAgICAgICAgIDxDYWxlbmRhckljb25cbiAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake2NhbGVuZGFySWNvbkNsYXNzbmFtZX0gJHtcbiAgICAgICAgICAgICAgb3BlbiAmJiBcInJlYWN0LWRhdGVwaWNrZXItaWdub3JlLW9uY2xpY2tvdXRzaWRlXCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgey4uLih0b2dnbGVDYWxlbmRhck9uSWNvbkNsaWNrXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy50b2dnbGVDYWxlbmRhcixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMuc3RhdGUuaXNSZW5kZXJBcmlhTGl2ZU1lc3NhZ2UgJiYgdGhpcy5yZW5kZXJBcmlhTGl2ZVJlZ2lvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJEYXRlSW5wdXQoKX1cbiAgICAgICAge3RoaXMucmVuZGVyQ2xlYXJCdXR0b24oKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2FsZW5kYXIgPSB0aGlzLnJlbmRlckNhbGVuZGFyKCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmUpIHJldHVybiBjYWxlbmRhcjtcblxuICAgIGlmICh0aGlzLnByb3BzLndpdGhQb3J0YWwpIHtcbiAgICAgIGxldCBwb3J0YWxDb250YWluZXIgPSB0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgIDxUYWJMb29wIGVuYWJsZVRhYkxvb3A9e3RoaXMucHJvcHMuZW5hYmxlVGFiTG9vcH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtZGF0ZXBpY2tlcl9fcG9ydGFsXCJcbiAgICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblBvcnRhbEtleURvd259XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NhbGVuZGFyfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RhYkxvb3A+XG4gICAgICApIDogbnVsbDtcblxuICAgICAgaWYgKHRoaXMuc3RhdGUub3BlbiAmJiB0aGlzLnByb3BzLnBvcnRhbElkKSB7XG4gICAgICAgIHBvcnRhbENvbnRhaW5lciA9IChcbiAgICAgICAgICA8UG9ydGFsXG4gICAgICAgICAgICBwb3J0YWxJZD17dGhpcy5wcm9wcy5wb3J0YWxJZH1cbiAgICAgICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cG9ydGFsQ29udGFpbmVyfVxuICAgICAgICAgIDwvUG9ydGFsPlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgICAge3BvcnRhbENvbnRhaW5lcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wcGVyQ29tcG9uZW50XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wb3BwZXJDbGFzc05hbWV9XG4gICAgICAgIHdyYXBwZXJDbGFzc05hbWU9e3RoaXMucHJvcHMud3JhcHBlckNsYXNzTmFtZX1cbiAgICAgICAgaGlkZVBvcHBlcj17IXRoaXMuaXNDYWxlbmRhck9wZW4oKX1cbiAgICAgICAgcG9ydGFsSWQ9e3RoaXMucHJvcHMucG9ydGFsSWR9XG4gICAgICAgIHBvcnRhbEhvc3Q9e3RoaXMucHJvcHMucG9ydGFsSG9zdH1cbiAgICAgICAgcG9wcGVyTW9kaWZpZXJzPXt0aGlzLnByb3BzLnBvcHBlck1vZGlmaWVyc31cbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50PXt0aGlzLnJlbmRlcklucHV0Q29udGFpbmVyKCl9XG4gICAgICAgIHBvcHBlckNvbnRhaW5lcj17dGhpcy5wcm9wcy5wb3BwZXJDb250YWluZXJ9XG4gICAgICAgIHBvcHBlckNvbXBvbmVudD17Y2FsZW5kYXJ9XG4gICAgICAgIHBvcHBlclBsYWNlbWVudD17dGhpcy5wcm9wcy5wb3BwZXJQbGFjZW1lbnR9XG4gICAgICAgIHBvcHBlclByb3BzPXt0aGlzLnByb3BzLnBvcHBlclByb3BzfVxuICAgICAgICBwb3BwZXJPbktleURvd249e3RoaXMub25Qb3BwZXJLZXlEb3dufVxuICAgICAgICBlbmFibGVUYWJMb29wPXt0aGlzLnByb3BzLmVuYWJsZVRhYkxvb3B9XG4gICAgICAgIHNob3dBcnJvdz17dGhpcy5wcm9wcy5zaG93UG9wcGVyQXJyb3d9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgUFJFU0VMRUNUX0NIQU5HRV9WSUFfSU5QVVQgPSBcImlucHV0XCI7XG5jb25zdCBQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSA9IFwibmF2aWdhdGVcIjtcbiJdLCJuYW1lcyI6WyJERUZBVUxUX1lFQVJfSVRFTV9OVU1CRVIiLCJsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsIm5ld0RhdGUiLCJ2YWx1ZSIsImQiLCJTdHJpbmciLCJwYXJzZUlTTyIsInRvRGF0ZSIsIkRhdGUiLCJpc1ZhbGlkIiwicGFyc2VEYXRlIiwiZGF0ZUZvcm1hdCIsImxvY2FsZSIsInN0cmljdFBhcnNpbmciLCJtaW5EYXRlIiwicGFyc2VkRGF0ZSIsImxvY2FsZU9iamVjdCIsImdldExvY2FsZU9iamVjdCIsImdldERlZmF1bHRMb2NhbGUiLCJzdHJpY3RQYXJzaW5nVmFsdWVNYXRjaCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJkZiIsInRyeVBhcnNlRGF0ZSIsInBhcnNlIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwidXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyIsImZvcm1hdERhdGUiLCJtYXRjaCIsIm1hcCIsInN1YnN0cmluZyIsImZpcnN0Q2hhcmFjdGVyIiwibG9uZ0Zvcm1hdHRlciIsImxvbmdGb3JtYXR0ZXJzIiwiZm9ybWF0TG9uZyIsImpvaW4iLCJsZW5ndGgiLCJzbGljZSIsImRhdGUiLCJpc1ZhbGlkRGF0ZSIsImlzQmVmb3JlIiwiZm9ybWF0U3RyIiwiZm9ybWF0IiwibG9jYWxlT2JqIiwiY29uc29sZSIsIndhcm4iLCJjb25jYXQiLCJzYWZlRGF0ZUZvcm1hdCIsIl9yZWYiLCJzYWZlRGF0ZVJhbmdlRm9ybWF0Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInByb3BzIiwiZm9ybWF0dGVkU3RhcnREYXRlIiwiZm9ybWF0dGVkRW5kRGF0ZSIsInNhZmVNdWx0aXBsZURhdGVzRm9ybWF0IiwiZGF0ZXMiLCJmb3JtYXR0ZWRGaXJzdERhdGUiLCJmb3JtYXR0ZWRTZWNvbmREYXRlIiwiZXh0cmFEYXRlc0NvdW50Iiwic2V0VGltZSIsIl9yZWYyIiwiX3JlZjIkaG91ciIsImhvdXIiLCJfcmVmMiRtaW51dGUiLCJtaW51dGUiLCJfcmVmMiRzZWNvbmQiLCJzZWNvbmQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwiZ2V0V2VlayIsImdldElTT1dlZWsiLCJnZXREYXlPZldlZWtDb2RlIiwiZGF5IiwiZ2V0U3RhcnRPZkRheSIsInN0YXJ0T2ZEYXkiLCJnZXRTdGFydE9mV2VlayIsImNhbGVuZGFyU3RhcnREYXkiLCJzdGFydE9mV2VlayIsIndlZWtTdGFydHNPbiIsImdldFN0YXJ0T2ZNb250aCIsInN0YXJ0T2ZNb250aCIsImdldFN0YXJ0T2ZZZWFyIiwic3RhcnRPZlllYXIiLCJnZXRTdGFydE9mUXVhcnRlciIsInN0YXJ0T2ZRdWFydGVyIiwiZ2V0U3RhcnRPZlRvZGF5IiwiZ2V0RW5kT2ZXZWVrIiwiZW5kT2ZXZWVrIiwiaXNTYW1lWWVhciIsImRhdGUxIiwiZGF0ZTIiLCJkZklzU2FtZVllYXIiLCJpc1NhbWVNb250aCIsImRmSXNTYW1lTW9udGgiLCJpc1NhbWVRdWFydGVyIiwiZGZJc1NhbWVRdWFydGVyIiwiaXNTYW1lRGF5IiwiZGZJc1NhbWVEYXkiLCJpc0VxdWFsIiwiZGZJc0VxdWFsIiwiaXNEYXlJblJhbmdlIiwidmFsaWQiLCJzdGFydCIsImVuZCIsImVuZE9mRGF5IiwiaXNXaXRoaW5JbnRlcnZhbCIsImVyciIsInJlZ2lzdGVyTG9jYWxlIiwibG9jYWxlTmFtZSIsImxvY2FsZURhdGEiLCJzY29wZSIsIndpbmRvdyIsImdsb2JhbFRoaXMiLCJfX2xvY2FsZURhdGFfXyIsInNldERlZmF1bHRMb2NhbGUiLCJfX2xvY2FsZUlkX18iLCJsb2NhbGVTcGVjIiwiZ2V0Rm9ybWF0dGVkV2Vla2RheUluTG9jYWxlIiwiZm9ybWF0RnVuYyIsImdldFdlZWtkYXlNaW5JbkxvY2FsZSIsImdldFdlZWtkYXlTaG9ydEluTG9jYWxlIiwiZ2V0TW9udGhJbkxvY2FsZSIsIm1vbnRoIiwic2V0TW9udGgiLCJnZXRNb250aFNob3J0SW5Mb2NhbGUiLCJnZXRRdWFydGVyU2hvcnRJbkxvY2FsZSIsInF1YXJ0ZXIiLCJzZXRRdWFydGVyIiwiaXNEYXlEaXNhYmxlZCIsIl9yZWYzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwibWF4RGF0ZSIsImV4Y2x1ZGVEYXRlcyIsImV4Y2x1ZGVEYXRlSW50ZXJ2YWxzIiwiaW5jbHVkZURhdGVzIiwiaW5jbHVkZURhdGVJbnRlcnZhbHMiLCJmaWx0ZXJEYXRlIiwiaXNPdXRPZkJvdW5kcyIsInNvbWUiLCJleGNsdWRlRGF0ZSIsIl9yZWY0IiwiaW5jbHVkZURhdGUiLCJfcmVmNSIsImlzRGF5RXhjbHVkZWQiLCJfcmVmNiIsIl9yZWY3IiwiaXNNb250aERpc2FibGVkIiwiX3JlZjgiLCJlbmRPZk1vbnRoIiwiaXNNb250aEluUmFuZ2UiLCJtIiwic3RhcnREYXRlWWVhciIsImdldFllYXIiLCJzdGFydERhdGVNb250aCIsImdldE1vbnRoIiwiZW5kRGF0ZVllYXIiLCJlbmREYXRlTW9udGgiLCJkYXlZZWFyIiwiaXNRdWFydGVyRGlzYWJsZWQiLCJfcmVmOSIsImlzWWVhckluUmFuZ2UiLCJ5ZWFyIiwic3RhcnRZZWFyIiwiZW5kWWVhciIsImlzWWVhckRpc2FibGVkIiwiX3JlZjEwIiwiZW5kT2ZZZWFyIiwiaXNRdWFydGVySW5SYW5nZSIsInEiLCJzdGFydERhdGVRdWFydGVyIiwiZ2V0UXVhcnRlciIsImVuZERhdGVRdWFydGVyIiwiX3JlZjExIiwiZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIiwiaXNUaW1lSW5MaXN0IiwidGltZSIsInRpbWVzIiwibGlzdFRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJpc1RpbWVEaXNhYmxlZCIsIl9yZWYxMiIsImV4Y2x1ZGVUaW1lcyIsImluY2x1ZGVUaW1lcyIsImZpbHRlclRpbWUiLCJpc1RpbWVJbkRpc2FibGVkUmFuZ2UiLCJfcmVmMTMiLCJtaW5UaW1lIiwibWF4VGltZSIsIkVycm9yIiwiYmFzZSIsImJhc2VUaW1lIiwibWluIiwibWF4IiwibW9udGhEaXNhYmxlZEJlZm9yZSIsIl9yZWYxNCIsInByZXZpb3VzTW9udGgiLCJzdWJNb250aHMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyIsImV2ZXJ5IiwibW9udGhEaXNhYmxlZEFmdGVyIiwiX3JlZjE1IiwibmV4dE1vbnRoIiwiYWRkTW9udGhzIiwicXVhcnRlckRpc2FibGVkQmVmb3JlIiwiX3JlZjE2IiwiZmlyc3REYXRlT2ZZZWFyIiwicHJldmlvdXNRdWFydGVyIiwic3ViUXVhcnRlcnMiLCJkaWZmZXJlbmNlSW5DYWxlbmRhclF1YXJ0ZXJzIiwicXVhcnRlckRpc2FibGVkQWZ0ZXIiLCJfcmVmMTciLCJsYXN0RGF0ZU9mWWVhciIsIm5leHRRdWFydGVyIiwiYWRkUXVhcnRlcnMiLCJ5ZWFyRGlzYWJsZWRCZWZvcmUiLCJfcmVmMTgiLCJwcmV2aW91c1llYXIiLCJzdWJZZWFycyIsImRpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMiLCJ5ZWFyc0Rpc2FibGVkQmVmb3JlIiwiX3JlZjE5IiwiX3JlZjE5JHllYXJJdGVtTnVtYmVyIiwieWVhckl0ZW1OdW1iZXIiLCJfZ2V0WWVhcnNQZXJpb2QiLCJnZXRZZWFyc1BlcmlvZCIsImVuZFBlcmlvZCIsIm1pbkRhdGVZZWFyIiwieWVhckRpc2FibGVkQWZ0ZXIiLCJfcmVmMjAiLCJuZXh0WWVhciIsImFkZFllYXJzIiwieWVhcnNEaXNhYmxlZEFmdGVyIiwiX3JlZjIxIiwiX3JlZjIxJHllYXJJdGVtTnVtYmVyIiwiX2dldFllYXJzUGVyaW9kMiIsInN0YXJ0UGVyaW9kIiwibWF4RGF0ZVllYXIiLCJnZXRFZmZlY3RpdmVNaW5EYXRlIiwiX3JlZjIyIiwibWluRGF0ZXMiLCJmaWx0ZXIiLCJnZXRFZmZlY3RpdmVNYXhEYXRlIiwiX3JlZjIzIiwibWF4RGF0ZXMiLCJnZXRIaWdodExpZ2h0RGF5c01hcCIsImhpZ2hsaWdodERhdGVzIiwiZGVmYXVsdENsYXNzTmFtZSIsImRhdGVDbGFzc2VzIiwiTWFwIiwiaSIsImxlbiIsIm9iaiIsImlzRGF0ZSIsImtleSIsImNsYXNzTmFtZXNBcnIiLCJnZXQiLCJpbmNsdWRlcyIsInB1c2giLCJzZXQiLCJfdHlwZW9mIiwia2V5cyIsIk9iamVjdCIsImNsYXNzTmFtZSIsImFyck9mRGF0ZXMiLCJjb25zdHJ1Y3RvciIsImsiLCJhcnJheXNBcmVFcXVhbCIsImFycmF5MSIsImFycmF5MiIsImluZGV4IiwiZ2V0SG9saWRheXNNYXAiLCJob2xpZGF5RGF0ZXMiLCJob2xpZGF5IiwiZGF0ZU9iaiIsImhvbGlkYXlOYW1lIiwiY2xhc3NOYW1lc09iaiIsImhvbGlkYXlOYW1lQXJyIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwidGltZXNUb0luamVjdEFmdGVyIiwiY3VycmVudFRpbWUiLCJjdXJyZW50TXVsdGlwbGllciIsImludGVydmFscyIsImluamVjdGVkVGltZXMiLCJsIiwiaW5qZWN0ZWRUaW1lIiwiYWRkSG91cnMiLCJhZGRNaW51dGVzIiwiYWRkU2Vjb25kcyIsImdldFNlY29uZHMiLCJuZXh0VGltZSIsImlzQWZ0ZXIiLCJhZGRaZXJvIiwiTWF0aCIsImNlaWwiLCJnZXRIb3Vyc0luRGF5IiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwic3RhcnRPZlRoZU5leHREYXkiLCJyb3VuZCIsInN0YXJ0T2ZNaW51dGUiLCJzZWNvbmRzIiwibWlsbGlzZWNvbmRzIiwiZ2V0TWlsbGlzZWNvbmRzIiwiZ2V0VGltZSIsImlzU2FtZU1pbnV0ZSIsImQxIiwiZDIiLCJnZXRNaWRuaWdodERhdGUiLCJkYXRlV2l0aG91dFRpbWUiLCJpc0RhdGVCZWZvcmUiLCJkYXRlVG9Db21wYXJlIiwibWlkbmlnaHREYXRlIiwibWlkbmlnaHREYXRlVG9Db21wYXJlIiwiaXNTcGFjZUtleURvd24iLCJldmVudCIsIlNQQUNFX0tFWSIsImdlbmVyYXRlWWVhcnMiLCJub09mWWVhciIsImxpc3QiLCJuZXdZZWFyIiwiaXNJblJhbmdlIiwiWWVhckRyb3Bkb3duT3B0aW9ucyIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9jYWxsU3VwZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJzZWxlY3RlZFllYXIiLCJvcHRpb25zIiwic3RhdGUiLCJ5ZWFyc0xpc3QiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJvbkNsaWNrIiwib25DaGFuZ2UiLCJiaW5kIiwibWluWWVhciIsIm1heFllYXIiLCJmaW5kIiwidW5zaGlmdCIsImluY3JlbWVudFllYXJzIiwiZGVjcmVtZW50WWVhcnMiLCJvbkNhbmNlbCIsImFtb3VudCIsInllYXJzIiwic2V0U3RhdGUiLCJzaGlmdFllYXJzIiwieWVhckRyb3Bkb3duSXRlbU51bWJlciIsInNjcm9sbGFibGVZZWFyRHJvcGRvd24iLCJkcm9wZG93blJlZiIsImNyZWF0ZVJlZiIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImNvbXBvbmVudERpZE1vdW50IiwiZHJvcGRvd25DdXJyZW50IiwiY3VycmVudCIsImRyb3Bkb3duQ3VycmVudENoaWxkcmVuIiwiY2hpbGRyZW4iLCJmcm9tIiwic2VsZWN0ZWRZZWFyT3B0aW9uRWwiLCJjaGlsZEVsIiwiYXJpYVNlbGVjdGVkIiwic2Nyb2xsVG9wIiwib2Zmc2V0VG9wIiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwicmVuZGVyIiwiZHJvcGRvd25DbGFzcyIsImNsc3giLCJyZWYiLCJyZW5kZXJPcHRpb25zIiwiQ29tcG9uZW50IiwiV3JhcHBlZFllYXJEcm9wZG93bk9wdGlvbnMiLCJvbkNsaWNrT3V0c2lkZSIsIlllYXJEcm9wZG93biIsIl9sZW4iLCJhcmdzIiwiX2tleSIsImRyb3Bkb3duVmlzaWJsZSIsImUiLCJ0YXJnZXQiLCJvblNlbGVjdENoYW5nZSIsInJlbmRlclNlbGVjdE9wdGlvbnMiLCJ2aXNpYmxlIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwidG9nZ2xlRHJvcGRvd24iLCJyZXN1bHQiLCJyZW5kZXJSZWFkVmlldyIsInJlbmRlckRyb3Bkb3duIiwiYWRqdXN0RGF0ZU9uQ2hhbmdlIiwiaGFuZGxlWWVhckNoYW5nZSIsIm9uU2VsZWN0Iiwic2V0T3BlbiIsInJlbmRlcmVkRHJvcGRvd24iLCJkcm9wZG93bk1vZGUiLCJyZW5kZXJTY3JvbGxNb2RlIiwicmVuZGVyU2VsZWN0TW9kZSIsIk1vbnRoRHJvcGRvd25PcHRpb25zIiwibW9udGhOYW1lcyIsImlzU2VsZWN0ZWRNb250aCIsIldyYXBwZWRNb250aERyb3Bkb3duT3B0aW9ucyIsIk1vbnRoRHJvcGRvd24iLCJNIiwiX3RoaXMyIiwidXNlU2hvcnRNb250aEluRHJvcGRvd24iLCJ1dGlscyIsImdlbmVyYXRlTW9udGhZZWFycyIsImN1cnJEYXRlIiwibGFzdERhdGUiLCJNb250aFllYXJEcm9wZG93bk9wdGlvbnMiLCJtb250aFllYXJzTGlzdCIsIm1vbnRoWWVhciIsIm1vbnRoWWVhclBvaW50IiwiaXNTYW1lTW9udGhZZWFyIiwic2Nyb2xsYWJsZU1vbnRoWWVhckRyb3Bkb3duIiwiV3JhcHBlZE1vbnRoWWVhckRyb3Bkb3duT3B0aW9ucyIsIk1vbnRoWWVhckRyb3Bkb3duIiwidGltZVBvaW50IiwieWVhck1vbnRoIiwiY2hhbmdlZERhdGUiLCJwYXJzZUludCIsIkRheSIsImlzRGlzYWJsZWQiLCJvbk1vdXNlRW50ZXIiLCJldmVudEtleSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlT25LZXlEb3duIiwib3RoZXIiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQiLCJkaXNhYmxlZEtleWJvYXJkTmF2aWdhdGlvbiIsImlzU2VsZWN0ZWREYXRlIiwic2VsZWN0c011bHRpcGxlIiwic2VsZWN0ZWREYXRlcyIsImlzU2FtZURheU9yV2VlayIsInNlbGVjdGVkIiwicHJlU2VsZWN0aW9uIiwic2hvd1dlZWtQaWNrZXIiLCJpc1NhbWVXZWVrIiwiX3RoaXMkcHJvcHMiLCJkYXlTdHIiLCJfdGhpcyRwcm9wczIiLCJob2xpZGF5cyIsImhhcyIsIl90aGlzJHByb3BzMyIsIl90aGlzJHByb3BzJHNlbGVjdGluZyIsIl90aGlzJHByb3BzNCIsInNlbGVjdHNTdGFydCIsInNlbGVjdHNFbmQiLCJzZWxlY3RzUmFuZ2UiLCJzZWxlY3RzRGlzYWJsZWREYXlzSW5SYW5nZSIsInNlbGVjdGluZ0RhdGUiLCJfdGhpcyRwcm9wcyRzZWxlY3RpbmcyIiwiaXNJblNlbGVjdGluZ1JhbmdlIiwiX3RoaXMkcHJvcHM1IiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nMyIsIl90aGlzJHByb3BzNiIsIl90aGlzJHByb3BzNyIsIl90aGlzJHByb3BzOCIsIndlZWtkYXkiLCJnZXREYXkiLCJfdGhpcyRwcm9wcyRzZWxlY3RlZEQyIiwiZGF5Q2xhc3NOYW1lIiwiaXNFeGNsdWRlZCIsImlzU2VsZWN0ZWQiLCJpc0tleWJvYXJkU2VsZWN0ZWQiLCJpc1JhbmdlU3RhcnQiLCJpc1JhbmdlRW5kIiwiaXNTZWxlY3RpbmdSYW5nZVN0YXJ0IiwiaXNTZWxlY3RpbmdSYW5nZUVuZCIsImlzQ3VycmVudERheSIsImlzV2Vla2VuZCIsImlzQWZ0ZXJNb250aCIsImlzQmVmb3JlTW9udGgiLCJnZXRIaWdoTGlnaHRlZENsYXNzIiwiZ2V0SG9saWRheXNDbGFzcyIsIl90aGlzJHByb3BzOSIsIl90aGlzJHByb3BzOSRhcmlhTGFiZSIsImFyaWFMYWJlbFByZWZpeFdoZW5FbmFibGVkIiwiX3RoaXMkcHJvcHM5JGFyaWFMYWJlMiIsImFyaWFMYWJlbFByZWZpeFdoZW5EaXNhYmxlZCIsInByZWZpeCIsIl90aGlzJHByb3BzMTAiLCJfdGhpcyRwcm9wczEwJGhvbGlkYXkiLCJjb21wYXJlRHQiLCJ0aXRsZXMiLCJhcHBseSIsImhvbGlkYXlOYW1lcyIsIm1lc3NhZ2UiLCJzZWxlY3RlZERheSIsInByZVNlbGVjdGlvbkRheSIsInRhYkluZGV4Iiwic2hvd1dlZWtOdW1iZXIiLCJpc1N0YXJ0T2ZXZWVrIiwiX3RoaXMkZGF5RWwkY3VycmVudCIsInByZXZQcm9wcyIsInNob3VsZEZvY3VzRGF5IiwiZ2V0VGFiSW5kZXgiLCJpc0lucHV0Rm9jdXNlZCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImJvZHkiLCJpbmxpbmUiLCJzaG91bGRGb2N1c0RheUlubGluZSIsImNvbnRhaW5lclJlZiIsImNvbnRhaW5zIiwiY2xhc3NMaXN0IiwibW9udGhTaG93c0R1cGxpY2F0ZURheXNFbmQiLCJtb250aFNob3dzRHVwbGljYXRlRGF5c1N0YXJ0IiwiZGF5RWwiLCJmb2N1cyIsInByZXZlbnRTY3JvbGwiLCJyZW5kZXJEYXlDb250ZW50cyIsImdldENsYXNzTmFtZXMiLCJvbktleURvd24iLCJoYW5kbGVDbGljayIsInVzZVBvaW50ZXJFdmVudCIsImhhbmRsZU1vdXNlRW50ZXIiLCJvblBvaW50ZXJFbnRlciIsImdldEFyaWFMYWJlbCIsInJvbGUiLCJ0aXRsZSIsImdldFRpdGxlIiwiaGFuZGxlRm9jdXNEYXkiLCJjb21wb25lbnREaWRVcGRhdGUiLCJXZWVrTnVtYmVyIiwic2hvdWxkRm9jdXNXZWVrTnVtYmVyIiwid2Vla051bWJlckVsIiwiaGFuZGxlRm9jdXNXZWVrTnVtYmVyIiwid2Vla051bWJlciIsIl90aGlzJHByb3BzJGFyaWFMYWJlbCIsImFyaWFMYWJlbFByZWZpeCIsIndlZWtOdW1iZXJDbGFzc2VzIiwiV2VlayIsIm9uRGF5Q2xpY2siLCJvbkRheU1vdXNlRW50ZXIiLCJvbldlZWtTZWxlY3QiLCJoYW5kbGVEYXlDbGljayIsInNob3VsZENsb3NlT25TZWxlY3QiLCJmb3JtYXRXZWVrTnVtYmVyIiwiZGF5cyIsIm9uQ2xpY2tBY3Rpb24iLCJoYW5kbGVXZWVrQ2xpY2siLCJvZmZzZXQiLCJhZGREYXlzIiwiY2hvb3NlRGF5QXJpYUxhYmVsUHJlZml4IiwiZGlzYWJsZWREYXlBcmlhTGFiZWxQcmVmaXgiLCJ2YWx1ZU9mIiwiaGFuZGxlRGF5TW91c2VFbnRlciIsInJlbmRlckRheXMiLCJGSVhFRF9IRUlHSFRfU1RBTkRBUkRfV0VFS19DT1VOVCIsIk1PTlRIX0NPTFVNTlNfTEFZT1VUIiwiVFdPX0NPTFVNTlMiLCJUSFJFRV9DT0xVTU5TIiwiRk9VUl9DT0xVTU5TIiwiTU9OVEhfQ09MVU1OUyIsImdyaWQiLCJ2ZXJ0aWNhbE5hdmlnYXRpb25PZmZzZXQiLCJNT05USF9OQVZJR0FUSU9OX0hPUklaT05UQUxfT0ZGU0VUIiwiZ2V0TW9udGhDb2x1bW5zTGF5b3V0Iiwic2hvd0ZvdXJDb2x1bW5Nb250aFllYXJQaWNrZXIiLCJzaG93VHdvQ29sdW1uTW9udGhZZWFyUGlja2VyIiwiTW9udGgiLCJvcmRlckluRGlzcGxheSIsIm9uTW91c2VMZWF2ZSIsImlzSW5TZWxlY3RpbmdSYW5nZU1vbnRoIiwiX21vbnRoIiwiX3RoaXMkcHJvcHMkc2VsZWN0aW5nNCIsIndlZWtzIiwiaXNGaXhlZEhlaWdodCIsImZpeGVkSGVpZ2h0IiwiYnJlYWtBZnRlck5leHRQdXNoIiwiY3VycmVudFdlZWtTdGFydCIsIndlZWtBcmlhTGFiZWxQcmVmaXgiLCJzaG93V2Vla051bWJlcnMiLCJpc0ZpeGVkQW5kRmluYWxXZWVrIiwiaXNOb25GaXhlZEFuZE91dE9mTW9udGgiLCJpc1dlZWtJbk1vbnRoIiwicGVla05leHRNb250aCIsImxhYmVsRGF0ZSIsIm5ld01vbnRoIiwic2V0UHJlU2VsZWN0aW9uIiwiTU9OVEhfUkVGUyIsImhhbmRsZU9uTW9udGhLZXlEb3duIiwibW9udGhDb2x1bW5zTGF5b3V0IiwidmVydGljYWxPZmZzZXQiLCJtb250aHNHcmlkIiwib25Nb250aENsaWNrIiwiaGFuZGxlTW9udGhOYXZpZ2F0aW9uIiwibmV3UXVhcnRlciIsIlFVQVJURVJfUkVGUyIsIm9uUXVhcnRlckNsaWNrIiwiaGFuZGxlUXVhcnRlck5hdmlnYXRpb24iLCJtb250aENsYXNzTmFtZSIsIl9tb250aENsYXNzTmFtZSIsImlzUmFuZ2VTdGFydE1vbnRoIiwiaXNSYW5nZUVuZE1vbnRoIiwiaXNTZWxlY3RpbmdNb250aFJhbmdlU3RhcnQiLCJpc1NlbGVjdGluZ01vbnRoUmFuZ2VFbmQiLCJpc0N1cnJlbnRNb250aCIsInByZVNlbGVjdGVkTW9udGgiLCJwcmVTZWxlY3RlZFF1YXJ0ZXIiLCJfdGhpcyRwcm9wczExIiwiX3RoaXMkcHJvcHMxMSRjaG9vc2VEIiwiX3RoaXMkcHJvcHMxMSRkaXNhYmxlIiwiX3RoaXMkcHJvcHMxMiIsImlzU2VsZWN0ZWRRdWFydGVyIiwiaXNJblNlbGVjdGluZ1JhbmdlUXVhcnRlciIsImlzUmFuZ2VTdGFydFF1YXJ0ZXIiLCJpc1JhbmdlRW5kUXVhcnRlciIsIl90aGlzJHByb3BzMTMiLCJzaG93RnVsbE1vbnRoWWVhclBpY2tlciIsInJlbmRlck1vbnRoQ29udGVudCIsInNob3J0TW9udGhUZXh0IiwiZnVsbE1vbnRoVGV4dCIsIl90aGlzJHByb3BzMTQiLCJyZW5kZXJRdWFydGVyQ29udGVudCIsInNob3J0UXVhcnRlciIsIl90aGlzJHByb3BzMTUiLCJtb250aENvbHVtbnMiLCJqIiwiZXYiLCJvbk1vbnRoS2V5RG93biIsIm9uTW9udGhNb3VzZUVudGVyIiwiZ2V0TW9udGhDbGFzc05hbWVzIiwiZ2V0TW9udGhDb250ZW50IiwiX3RoaXMkcHJvcHMxNiIsInF1YXJ0ZXJzIiwib25RdWFydGVyS2V5RG93biIsIm9uUXVhcnRlck1vdXNlRW50ZXIiLCJnZXRRdWFydGVyQ2xhc3NOYW1lcyIsImdldFF1YXJ0ZXJUYWJJbmRleCIsImlzQ3VycmVudFF1YXJ0ZXIiLCJnZXRRdWFydGVyQ29udGVudCIsIl90aGlzJHByb3BzMTciLCJzaG93TW9udGhZZWFyUGlja2VyIiwic2hvd1F1YXJ0ZXJZZWFyUGlja2VyIiwiX3RoaXMkcHJvcHMxOCIsIl90aGlzJHByb3BzMTgkYXJpYUxhYiIsImZvcm1hdHRlZEFyaWFMYWJlbFByZWZpeCIsInRyaW0iLCJoYW5kbGVNb3VzZUxlYXZlIiwib25Qb2ludGVyTGVhdmUiLCJyZW5kZXJNb250aHMiLCJyZW5kZXJRdWFydGVycyIsInJlbmRlcldlZWtzIiwiVGltZSIsImhlaWdodCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNlbnRlckxpIiwiY2FsY0NlbnRlclBvc2l0aW9uIiwibW9udGhSZWYiLCJoZWFkZXIiLCJjbGFzc2VzIiwidGltZUNsYXNzTmFtZSIsImlzU2VsZWN0ZWRUaW1lIiwiaXNEaXNhYmxlZFRpbWUiLCJpbmplY3RUaW1lcyIsInByZXZpb3VzU2libGluZyIsIm5leHRTaWJsaW5nIiwiYWN0aXZlRGF0ZSIsIm9wZW5Ub0RhdGUiLCJzb3J0ZWRJbmplY3RUaW1lcyIsInNvcnQiLCJhIiwiYiIsIm1pbnV0ZXNJbkRheSIsIm11bHRpcGxpZXIiLCJ0aW1lc1RvSW5qZWN0IiwidGltZVRvRm9jdXMiLCJyZWR1Y2UiLCJwcmV2IiwibGlDbGFzc2VzIiwibGkiLCJzY3JvbGxUb1RoZVNlbGVjdGVkVGltZSIsInRvZGF5QnV0dG9uIiwic2hvd1RpbWVTZWxlY3RPbmx5IiwidGltZUNhcHRpb24iLCJyZW5kZXJUaW1lcyIsIm9uVGltZUNoYW5nZSIsImxpc3RIZWlnaHQiLCJjZW50ZXJMaVJlZiIsIlllYXIiLCJyZWZJbmRleCIsIndhaXRGb3JSZVJlbmRlciIsIllFQVJfUkVGUyIsIl91dGlscyRnZXRZZWFyc1BlcmlvZCIsInVwZGF0ZUZvY3VzT25QYWdpbmF0ZSIsInkiLCJfeWVhciIsImhhbmRsZVllYXJDbGljayIsIm9uWWVhckNsaWNrIiwiaGFuZGxlWWVhck5hdmlnYXRpb24iLCJ5ZWFyQ2xhc3NOYW1lIiwiaXNDdXJyZW50WWVhciIsInByZVNlbGVjdGVkIiwicmVuZGVyWWVhckNvbnRlbnQiLCJvblllYXJNb3VzZUVudGVyIiwib25ZZWFyTW91c2VMZWF2ZSIsIl91dGlscyRnZXRZZWFyc1BlcmlvZDIiLCJfbG9vcCIsIm9uWWVhcktleURvd24iLCJnZXRZZWFyVGFiSW5kZXgiLCJnZXRZZWFyQ2xhc3NOYW1lcyIsImdldFllYXJDb250ZW50IiwiZ2V0WWVhckNvbnRhaW5lckNsYXNzTmFtZXMiLCJjbGVhclNlbGVjdGluZ0RhdGUiLCJpbnB1dFRpbWUiLCJwcm9wRGF0ZSIsImlzUHJvcERhdGVWYWxpZCIsImlzTmFOIiwic3BsaXQiLCJ0aW1lU3RyaW5nIiwiY3VzdG9tVGltZUlucHV0IiwiY2xvbmVFbGVtZW50IiwidHlwZSIsInBsYWNlaG9sZGVyIiwibmFtZSIsInJlcXVpcmVkIiwidGltZUlucHV0TGFiZWwiLCJyZW5kZXJUaW1lSW5wdXQiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJDYWxlbmRhckNvbnRhaW5lciIsIl9yZWYkc2hvd1RpbWVTZWxlY3RPbiIsIl9yZWYkc2hvd1RpbWUiLCJzaG93VGltZSIsImFyaWFMYWJlbCIsIkRST1BET1dOX0ZPQ1VTX0NMQVNTTkFNRVMiLCJpc0Ryb3Bkb3duU2VsZWN0IiwiZWxlbWVudCIsImNsYXNzTmFtZXMiLCJ0ZXN0Q2xhc3NuYW1lIiwiaW5kZXhPZiIsIkNhbGVuZGFyIiwib25Ecm9wZG93bkZvY3VzIiwiaW5pdGlhbERhdGUiLCJoYW5kbGVNb250aENoYW5nZSIsIm1vbnRoU2VsZWN0ZWRJbiIsIm9uTW9udGhNb3VzZUxlYXZlIiwic2V0WWVhciIsIm9uWWVhckNoYW5nZSIsImlzUmVuZGVyQXJpYUxpdmVNZXNzYWdlIiwiaGFuZGxlQ3VzdG9tTW9udGhDaGFuZ2UiLCJvbk1vbnRoQ2hhbmdlIiwiaGFuZGxlTW9udGhZZWFyQ2hhbmdlIiwiZGF5TmFtZXMiLCJ3ZWVrTGFiZWwiLCJ3ZWVrRGF5TmFtZSIsImZvcm1hdFdlZWtkYXkiLCJ3ZWVrRGF5Q2xhc3NOYW1lIiwiZm9ybWF0V2Vla0RheSIsInVzZVdlZWtkYXlzU2hvcnQiLCJzaG93WWVhclBpY2tlciIsInJlbmRlckN1c3RvbUhlYWRlciIsImFsbFByZXZEYXlzRGlzYWJsZWQiLCJmb3JjZVNob3dNb250aE5hdmlnYXRpb24iLCJzaG93RGlzYWJsZWRNb250aE5hdmlnYXRpb24iLCJpY29uQ2xhc3NlcyIsImNsaWNrSGFuZGxlciIsImRlY3JlYXNlTW9udGgiLCJkZWNyZWFzZVllYXIiLCJpc0ZvclllYXIiLCJwcmV2aW91c01vbnRoQnV0dG9uTGFiZWwiLCJwcmV2aW91c1llYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzMyRwcmV2aW91cyIsInByZXZpb3VzTW9udGhBcmlhTGFiZWwiLCJfdGhpcyRwcm9wczMkcHJldmlvdXMyIiwicHJldmlvdXNZZWFyQXJpYUxhYmVsIiwiYWxsTmV4dERheXNEaXNhYmxlZCIsInNob3dUaW1lU2VsZWN0IiwiaW5jcmVhc2VNb250aCIsImluY3JlYXNlWWVhciIsIm5leHRNb250aEJ1dHRvbkxhYmVsIiwibmV4dFllYXJCdXR0b25MYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0TW9udCIsIm5leHRNb250aEFyaWFMYWJlbCIsIl90aGlzJHByb3BzNSRuZXh0WWVhciIsIm5leHRZZWFyQXJpYUxhYmVsIiwic2hvd1llYXJEcm9wZG93biIsInNob3dNb250aERyb3Bkb3duIiwic2hvd01vbnRoWWVhckRyb3Bkb3duIiwib3ZlcnJpZGVIaWRlIiwiY2hhbmdlWWVhciIsImNoYW5nZU1vbnRoIiwiY2hhbmdlTW9udGhZZWFyIiwiaGFuZGxlVG9kYXlCdXR0b25DbGljayIsIm1vbnRoRGF0ZSIsInJlbmRlckN1cnJlbnRNb250aCIsIm9uRm9jdXMiLCJoYW5kbGVEcm9wZG93bkZvY3VzIiwicmVuZGVyTW9udGhEcm9wZG93biIsInJlbmRlck1vbnRoWWVhckRyb3Bkb3duIiwicmVuZGVyWWVhckRyb3Bkb3duIiwiaGVhZGVyQXJncyIsIm1vbnRoQ29udGFpbmVyIiwicHJldk1vbnRoQnV0dG9uRGlzYWJsZWQiLCJuZXh0TW9udGhCdXR0b25EaXNhYmxlZCIsInByZXZZZWFyQnV0dG9uRGlzYWJsZWQiLCJuZXh0WWVhckJ1dHRvbkRpc2FibGVkIiwic2hvd0RheU5hbWVzIiwiX29iamVjdFNwcmVhZCIsImN1c3RvbUhlYWRlckNvdW50IiwicmVuZGVyWWVhckhlYWRlciIsInJlbmRlckRlZmF1bHRIZWFkZXIiLCJfdGhpcyRwcm9wcyRtb250aFNlbGUiLCJtb250aExpc3QiLCJtb250aHNUb1N1YnRyYWN0Iiwic2hvd1ByZXZpb3VzTW9udGhzIiwibW9udGhzU2hvd24iLCJmcm9tTW9udGhEYXRlIiwibW9udGhzVG9BZGQiLCJtb250aEtleSIsImRpdiIsInJlbmRlckhlYWRlciIsIm1vbnRoQXJpYUxhYmVsUHJlZml4IiwiaGFuZGxlT25EYXlLZXlEb3duIiwiaGFuZGxlTW9udGhNb3VzZUxlYXZlIiwiX2V4dGVuZHMiLCJoYW5kbGVZZWFyTW91c2VFbnRlciIsImhhbmRsZVllYXJNb3VzZUxlYXZlIiwidGltZUZvcm1hdCIsInRpbWVJbnRlcnZhbHMiLCJ3aXRoUG9ydGFsIiwidGltZVZhbGlkIiwiQm9vbGVhbiIsInNob3dUaW1lSW5wdXQiLCJJbnB1dFRpbWUiLCJhcmlhTGl2ZU1lc3NhZ2UiLCJnZXREYXRlSW5WaWV3IiwiYXNzaWduTW9udGhDb250YWluZXIiLCJfdGhpczMiLCJoYXNNb250aENoYW5nZWQiLCJDb250YWluZXIiLCJjb250YWluZXIiLCJkaXNwbGF5IiwicmVuZGVyQXJpYUxpdmVSZWdpb24iLCJyZW5kZXJQcmV2aW91c0J1dHRvbiIsInJlbmRlck5leHRCdXR0b24iLCJyZW5kZXJZZWFycyIsInJlbmRlclRvZGF5QnV0dG9uIiwicmVuZGVyVGltZVNlY3Rpb24iLCJyZW5kZXJJbnB1dFRpbWVTZWN0aW9uIiwicmVuZGVyQ2hpbGRyZW4iLCJDYWxlbmRhckljb24iLCJpY29uIiwiX3JlZiRjbGFzc05hbWUiLCJkZWZhdWx0Q2xhc3MiLCJpc1ZhbGlkRWxlbWVudCIsInhtbG5zIiwidmlld0JveCIsIlBvcnRhbCIsImVsIiwicG9ydGFsUm9vdCIsInBvcnRhbEhvc3QiLCJnZXRFbGVtZW50QnlJZCIsInBvcnRhbElkIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUNoaWxkIiwiUmVhY3RET00iLCJjcmVhdGVQb3J0YWwiLCJmb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yIiwiZm9jdXNhYmxlRmlsdGVyIiwibm9kZSIsImRpc2FibGVkIiwiVGFiTG9vcCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YWJMb29wUmVmIiwicXVlcnlTZWxlY3RvckFsbCIsInRhYkNoaWxkcmVuIiwiZ2V0VGFiQ2hpbGRyZW4iLCJlbmFibGVUYWJMb29wIiwiaGFuZGxlRm9jdXNTdGFydCIsImhhbmRsZUZvY3VzRW5kIiwid2l0aEZsb2F0aW5nIiwiV2l0aEZsb2F0aW5nIiwiYWx0X3Byb3BzIiwicG9wcGVyTW9kaWZpZXJzIiwicG9wcGVyUHJvcHMiLCJoaWRlUG9wcGVyIiwiYXJyb3dSZWYiLCJ1c2VSZWYiLCJmbG9hdGluZ1Byb3BzIiwidXNlRmxvYXRpbmciLCJvcGVuIiwid2hpbGVFbGVtZW50c01vdW50ZWQiLCJhdXRvVXBkYXRlIiwicGxhY2VtZW50IiwicG9wcGVyUGxhY2VtZW50IiwibWlkZGxld2FyZSIsImZsaXAiLCJwYWRkaW5nIiwiYXJyb3ciLCJQb3BwZXJDb21wb25lbnQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwicG9wcGVyQ29tcG9uZW50IiwidGFyZ2V0Q29tcG9uZW50IiwicG9wcGVyT25LZXlEb3duIiwic2hvd0Fycm93IiwicG9wcGVyIiwicmVmcyIsInNldEZsb2F0aW5nIiwiZmxvYXRpbmdTdHlsZXMiLCJGbG9hdGluZ0Fycm93IiwiY29udGV4dCIsImZpbGwiLCJzdHJva2VXaWR0aCIsIndpZHRoIiwidHJhbnNmb3JtIiwicG9wcGVyQ29udGFpbmVyIiwid3JhcHBlckNsYXNzZXMiLCJGcmFnbWVudCIsInNldFJlZmVyZW5jZSIsIm91dHNpZGVDbGlja0lnbm9yZUNsYXNzIiwiV3JhcHBlZENhbGVuZGFyIiwiaGFzUHJlU2VsZWN0aW9uQ2hhbmdlZCIsIklOUFVUX0VSUl8xIiwiRGF0ZVBpY2tlciIsIl90aGlzJHByb3BzJGhvbGlkYXlzIiwiYWNjdW11bGF0b3IiLCJkZWZhdWx0UHJlU2VsZWN0aW9uIiwiZ2V0UHJlU2VsZWN0aW9uIiwiYm91bmRlZFByZVNlbGVjdGlvbiIsInN0YXJ0T3BlbiIsInByZXZlbnRGb2N1cyIsImZvY3VzZWQiLCJwcmV2ZW50Rm9jdXNUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaW5wdXQiLCJibHVyIiwiY2FuY2VsRm9jdXNJbnB1dCIsInNraXBTZXRCbHVyIiwiY2FsY0luaXRpYWxTdGF0ZSIsImxhc3RQcmVTZWxlY3RDaGFuZ2UiLCJQUkVTRUxFQ1RfQ0hBTkdFX1ZJQV9OQVZJR0FURSIsInNldEJsdXIiLCJpbnB1dFZhbHVlIiwicmVhZE9ubHkiLCJwcmV2ZW50T3Blbk9uRm9jdXMiLCJjbGVhclByZXZlbnRGb2N1c1RpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2V0Rm9jdXMiLCJpbnB1dEZvY3VzVGltZW91dCIsIm9uQmx1ciIsImFsbEFyZ3MiLCJvbkNoYW5nZVJhdyIsImlzRGVmYXVsdFByZXZlbnRlZCIsIlBSRVNFTEVDVF9DSEFOR0VfVklBX0lOUFVUIiwiaG91cnMiLCJtaW51dGVzIiwic2V0U2VsZWN0ZWQiLCJzZW5kRm9jdXNCYWNrVG9JbnB1dCIsInNob3dEYXRlU2VsZWN0Iiwia2VlcElucHV0Iiwic3dhcFJhbmdlIiwiYWxsb3dTYW1lRGF5IiwiZm9jdXNTZWxlY3RlZE1vbnRoIiwibm9SYW5nZXMiLCJoYXNTdGFydFJhbmdlIiwiaXNSYW5nZUZpbGxlZCIsImlzQ2hhbmdlZERhdGVBbHJlYWR5U2VsZWN0ZWQiLCJzZWxlY3RlZERhdGUiLCJuZXh0RGF0ZXMiLCJoYXNNaW5EYXRlIiwiaGFzTWF4RGF0ZSIsImlzVmFsaWREYXRlU2VsZWN0aW9uIiwiZGF0ZVN0YXJ0T2ZEYXkiLCJtaW5EYXRlU3RhcnRPZkRheSIsIm1heERhdGVFbmRPZkRheSIsIm9uSW5wdXRDbGljayIsInNlbGVjdG9yU3RyaW5nIiwic2VsZWN0ZWRJdGVtIiwiY2FsZW5kYXIiLCJjb21wb25lbnROb2RlIiwicXVlcnlTZWxlY3RvciIsImNvcHkiLCJpbnB1dE9rIiwiaGFuZGxlU2VsZWN0Iiwib25JbnB1dEVycm9yIiwiY29kZSIsIm1zZyIsImlzU2hpZnRLZXlBY3RpdmUiLCJzaGlmdEtleSIsIm5ld1NlbGVjdGlvbiIsInN1YldlZWtzIiwic3ViRGF5cyIsImFkZFdlZWtzIiwicHJldk1vbnRoIiwicHJldlllYXIiLCJvbkNsZWFyQ2xpY2siLCJjbG9zZU9uU2Nyb2xsIiwiZG9jdW1lbnRFbGVtZW50IiwiaXNDYWxlbmRhck9wZW4iLCJlbGVtIiwiZGF0ZUZvcm1hdENhbGVuZGFyIiwiaGFuZGxlQ2FsZW5kYXJDbGlja091dHNpZGUiLCJtb2RpZnlIb2xpZGF5cyIsImhhbmRsZVRpbWVDaGFuZ2UiLCJjYWxlbmRhckNsYXNzTmFtZSIsImNhbGVuZGFyQ29udGFpbmVyIiwiZXhjbHVkZVNjcm9sbGJhciIsIm9uRGF5S2V5RG93biIsImlzQ29udGFpbnNUaW1lIiwibG9uZ0RhdGVGb3JtYXQiLCJfUmVhY3QkY2xvbmVFbGVtZW50IiwiY3VzdG9tSW5wdXQiLCJjdXN0b21JbnB1dFJlZiIsImhhbmRsZUJsdXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVGb2N1cyIsIm9uSW5wdXRLZXlEb3duIiwiaWQiLCJmb3JtIiwiYXV0b0ZvY3VzIiwicGxhY2Vob2xkZXJUZXh0IiwiYXV0b0NvbXBsZXRlIiwiYXJpYURlc2NyaWJlZEJ5IiwiYXJpYUludmFsaWQiLCJhcmlhTGFiZWxsZWRCeSIsImFyaWFSZXF1aXJlZCIsImlzQ2xlYXJhYmxlIiwiY2xlYXJCdXR0b25UaXRsZSIsIl90aGlzJHByb3BzNCRjbGVhckJ1dCIsImNsZWFyQnV0dG9uQ2xhc3NOYW1lIiwiX3RoaXMkcHJvcHM0JGFyaWFMYWJlIiwiYXJpYUxhYmVsQ2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25TY3JvbGwiLCJwcmV2U3RhdGUiLCJvbkNhbGVuZGFyT3BlbiIsIm9uQ2FsZW5kYXJDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJJbnB1dENvbnRhaW5lciIsInNob3dJY29uIiwiY2FsZW5kYXJJY29uQ2xhc3NuYW1lIiwidG9nZ2xlQ2FsZW5kYXJPbkljb25DbGljayIsInRvZ2dsZUNhbGVuZGFyIiwicmVuZGVyRGF0ZUlucHV0IiwicmVuZGVyQ2xlYXJCdXR0b24iLCJyZW5kZXJDYWxlbmRhciIsInBvcnRhbENvbnRhaW5lciIsIm9uUG9ydGFsS2V5RG93biIsInBvcHBlckNsYXNzTmFtZSIsIm9uUG9wcGVyS2V5RG93biIsInNob3dQb3BwZXJBcnJvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyRE8sSUFBTUEsd0JBQXdCLEdBQUcsRUFBRSxDQUFBOztBQUUxQztBQUNBO0FBQ0EsSUFBTUMsMEJBQTBCLEdBQUcsbUNBQW1DLENBQUE7O0FBRXRFOztBQUVPLFNBQVNDLE9BQU9BLENBQUNDLEtBQUssRUFBRTtFQUM3QixJQUFNQyxDQUFDLEdBQUdELEtBQUssR0FDWCxPQUFPQSxLQUFLLEtBQUssUUFBUSxJQUFJQSxLQUFLLFlBQVlFLE1BQU0sR0FDbERDLFFBQVEsQ0FBQ0gsS0FBSyxDQUFDLEdBQ2ZJLE1BQU0sQ0FBQ0osS0FBSyxDQUFDLEdBQ2YsSUFBSUssSUFBSSxFQUFFLENBQUE7QUFDZCxFQUFBLE9BQU9DLE9BQU8sQ0FBQ0wsQ0FBQyxDQUFDLEdBQUdBLENBQUMsR0FBRyxJQUFJLENBQUE7QUFDOUIsQ0FBQTtBQUVPLFNBQVNNLFNBQVNBLENBQUNQLEtBQUssRUFBRVEsVUFBVSxFQUFFQyxNQUFNLEVBQUVDLGFBQWEsRUFBRUMsT0FBTyxFQUFFO0VBQzNFLElBQUlDLFVBQVUsR0FBRyxJQUFJLENBQUE7QUFDckIsRUFBQSxJQUFJQyxZQUFZLEdBQ2RDLGVBQWUsQ0FBQ0wsTUFBTSxDQUFDLElBQUlLLGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0VBQ2hFLElBQUlDLHVCQUF1QixHQUFHLElBQUksQ0FBQTtBQUNsQyxFQUFBLElBQUlDLEtBQUssQ0FBQ0MsT0FBTyxDQUFDVixVQUFVLENBQUMsRUFBRTtBQUM3QkEsSUFBQUEsVUFBVSxDQUFDVyxPQUFPLENBQUMsVUFBQ0MsRUFBRSxFQUFLO0FBQ3pCLE1BQUEsSUFBSUMsWUFBWSxHQUFHQyxLQUFLLENBQUN0QixLQUFLLEVBQUVvQixFQUFFLEVBQUUsSUFBSWYsSUFBSSxFQUFFLEVBQUU7QUFDOUNJLFFBQUFBLE1BQU0sRUFBRUksWUFBWTtBQUNwQlUsUUFBQUEsMkJBQTJCLEVBQUUsSUFBSTtBQUNqQ0MsUUFBQUEsNEJBQTRCLEVBQUUsSUFBQTtBQUNoQyxPQUFDLENBQUMsQ0FBQTtBQUNGLE1BQUEsSUFBSWQsYUFBYSxFQUFFO0FBQ2pCTSxRQUFBQSx1QkFBdUIsR0FDckJWLE9BQU8sQ0FBQ2UsWUFBWSxFQUFFVixPQUFPLENBQUMsSUFDOUJYLEtBQUssS0FBS3lCLFVBQVUsQ0FBQ0osWUFBWSxFQUFFRCxFQUFFLEVBQUVYLE1BQU0sQ0FBQyxDQUFBO0FBQ2xELE9BQUE7TUFDQSxJQUFJSCxPQUFPLENBQUNlLFlBQVksRUFBRVYsT0FBTyxDQUFDLElBQUlLLHVCQUF1QixFQUFFO0FBQzdESixRQUFBQSxVQUFVLEdBQUdTLFlBQVksQ0FBQTtBQUMzQixPQUFBO0FBQ0YsS0FBQyxDQUFDLENBQUE7QUFDRixJQUFBLE9BQU9ULFVBQVUsQ0FBQTtBQUNuQixHQUFBO0VBRUFBLFVBQVUsR0FBR1UsS0FBSyxDQUFDdEIsS0FBSyxFQUFFUSxVQUFVLEVBQUUsSUFBSUgsSUFBSSxFQUFFLEVBQUU7QUFDaERJLElBQUFBLE1BQU0sRUFBRUksWUFBWTtBQUNwQlUsSUFBQUEsMkJBQTJCLEVBQUUsSUFBSTtBQUNqQ0MsSUFBQUEsNEJBQTRCLEVBQUUsSUFBQTtBQUNoQyxHQUFDLENBQUMsQ0FBQTtBQUVGLEVBQUEsSUFBSWQsYUFBYSxFQUFFO0FBQ2pCTSxJQUFBQSx1QkFBdUIsR0FDckJWLE9BQU8sQ0FBQ00sVUFBVSxDQUFDLElBQ25CWixLQUFLLEtBQUt5QixVQUFVLENBQUNiLFVBQVUsRUFBRUosVUFBVSxFQUFFQyxNQUFNLENBQUMsQ0FBQTtBQUN4RCxHQUFDLE1BQU0sSUFBSSxDQUFDSCxPQUFPLENBQUNNLFVBQVUsQ0FBQyxFQUFFO0FBQy9CSixJQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FDcEJrQixLQUFLLENBQUM1QiwwQkFBMEIsQ0FBQyxDQUNqQzZCLEdBQUcsQ0FBQyxVQUFVQyxTQUFTLEVBQUU7QUFDeEIsTUFBQSxJQUFNQyxjQUFjLEdBQUdELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQyxNQUFBLElBQUlDLGNBQWMsS0FBSyxHQUFHLElBQUlBLGNBQWMsS0FBSyxHQUFHLEVBQUU7QUFDcEQsUUFBQSxJQUFNQyxhQUFhLEdBQUdDLGNBQWMsQ0FBQ0YsY0FBYyxDQUFDLENBQUE7UUFDcEQsT0FBT2hCLFlBQVksR0FDZmlCLGFBQWEsQ0FBQ0YsU0FBUyxFQUFFZixZQUFZLENBQUNtQixVQUFVLENBQUMsR0FDakRILGNBQWMsQ0FBQTtBQUNwQixPQUFBO0FBQ0EsTUFBQSxPQUFPRCxTQUFTLENBQUE7QUFDbEIsS0FBQyxDQUFDLENBQ0RLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUVYLElBQUEsSUFBSWpDLEtBQUssQ0FBQ2tDLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDcEJ0QixVQUFVLEdBQUdVLEtBQUssQ0FBQ3RCLEtBQUssRUFBRVEsVUFBVSxDQUFDMkIsS0FBSyxDQUFDLENBQUMsRUFBRW5DLEtBQUssQ0FBQ2tDLE1BQU0sQ0FBQyxFQUFFLElBQUk3QixJQUFJLEVBQUUsRUFBRTtBQUN2RWtCLFFBQUFBLDJCQUEyQixFQUFFLElBQUk7QUFDakNDLFFBQUFBLDRCQUE0QixFQUFFLElBQUE7QUFDaEMsT0FBQyxDQUFDLENBQUE7QUFDSixLQUFBO0FBRUEsSUFBQSxJQUFJLENBQUNsQixPQUFPLENBQUNNLFVBQVUsQ0FBQyxFQUFFO0FBQ3hCQSxNQUFBQSxVQUFVLEdBQUcsSUFBSVAsSUFBSSxDQUFDTCxLQUFLLENBQUMsQ0FBQTtBQUM5QixLQUFBO0FBQ0YsR0FBQTtFQUVBLE9BQU9NLE9BQU8sQ0FBQ00sVUFBVSxDQUFDLElBQUlJLHVCQUF1QixHQUFHSixVQUFVLEdBQUcsSUFBSSxDQUFBO0FBQzNFLENBQUE7QUFNTyxTQUFTTixPQUFPQSxDQUFDOEIsSUFBSSxFQUFFekIsT0FBTyxFQUFFO0VBQ3JDQSxPQUFPLEdBQUdBLE9BQU8sR0FBR0EsT0FBTyxHQUFHLElBQUlOLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtFQUNsRCxPQUFPZ0MsU0FBVyxDQUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDRSxRQUFRLENBQUNGLElBQUksRUFBRXpCLE9BQU8sQ0FBQyxDQUFBO0FBQ3RELENBQUE7O0FBRUE7O0FBRU8sU0FBU2MsVUFBVUEsQ0FBQ1csSUFBSSxFQUFFRyxTQUFTLEVBQUU5QixNQUFNLEVBQUU7RUFDbEQsSUFBSUEsTUFBTSxLQUFLLElBQUksRUFBRTtBQUNuQixJQUFBLE9BQU8rQixNQUFNLENBQUNKLElBQUksRUFBRUcsU0FBUyxFQUFFO0FBQzdCaEIsTUFBQUEsMkJBQTJCLEVBQUUsSUFBSTtBQUNqQ0MsTUFBQUEsNEJBQTRCLEVBQUUsSUFBQTtBQUNoQyxLQUFDLENBQUMsQ0FBQTtBQUNKLEdBQUE7QUFDQSxFQUFBLElBQUlpQixTQUFTLEdBQUczQixlQUFlLENBQUNMLE1BQU0sQ0FBQyxDQUFBO0FBQ3ZDLEVBQUEsSUFBSUEsTUFBTSxJQUFJLENBQUNnQyxTQUFTLEVBQUU7QUFDeEJDLElBQUFBLE9BQU8sQ0FBQ0MsSUFBSSxDQUFBLDJEQUFBLENBQUFDLE1BQUEsQ0FDaURuQyxNQUFNLFNBQ25FLENBQUMsQ0FBQTtBQUNILEdBQUE7QUFDQSxFQUFBLElBQ0UsQ0FBQ2dDLFNBQVMsSUFDVixDQUFDLENBQUMxQixnQkFBZ0IsRUFBRSxJQUNwQixDQUFDLENBQUNELGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBQyxFQUNyQztBQUNBMEIsSUFBQUEsU0FBUyxHQUFHM0IsZUFBZSxDQUFDQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUE7QUFDakQsR0FBQTtBQUNBLEVBQUEsT0FBT3lCLE1BQU0sQ0FBQ0osSUFBSSxFQUFFRyxTQUFTLEVBQUU7QUFDN0I5QixJQUFBQSxNQUFNLEVBQUVnQyxTQUFTLEdBQUdBLFNBQVMsR0FBRyxJQUFJO0FBQ3BDbEIsSUFBQUEsMkJBQTJCLEVBQUUsSUFBSTtBQUNqQ0MsSUFBQUEsNEJBQTRCLEVBQUUsSUFBQTtBQUNoQyxHQUFDLENBQUMsQ0FBQTtBQUNKLENBQUE7QUFFTyxTQUFTcUIsY0FBY0EsQ0FBQ1QsSUFBSSxFQUFBVSxJQUFBLEVBQTBCO0FBQUEsRUFBQSxJQUF0QnRDLFVBQVUsR0FBQXNDLElBQUEsQ0FBVnRDLFVBQVU7SUFBRUMsTUFBTSxHQUFBcUMsSUFBQSxDQUFOckMsTUFBTSxDQUFBO0VBQ3ZELE9BQ0cyQixJQUFJLElBQ0hYLFVBQVUsQ0FDUlcsSUFBSSxFQUNKbkIsS0FBSyxDQUFDQyxPQUFPLENBQUNWLFVBQVUsQ0FBQyxHQUFHQSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUdBLFVBQVUsRUFDdERDLE1BQ0YsQ0FBQyxJQUNILEVBQUUsQ0FBQTtBQUVOLENBQUE7QUFFTyxTQUFTc0MsbUJBQW1CQSxDQUFDQyxTQUFTLEVBQUVDLE9BQU8sRUFBRUMsS0FBSyxFQUFFO0VBQzdELElBQUksQ0FBQ0YsU0FBUyxFQUFFO0FBQ2QsSUFBQSxPQUFPLEVBQUUsQ0FBQTtBQUNYLEdBQUE7QUFFQSxFQUFBLElBQU1HLGtCQUFrQixHQUFHTixjQUFjLENBQUNHLFNBQVMsRUFBRUUsS0FBSyxDQUFDLENBQUE7RUFDM0QsSUFBTUUsZ0JBQWdCLEdBQUdILE9BQU8sR0FBR0osY0FBYyxDQUFDSSxPQUFPLEVBQUVDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUV0RSxFQUFBLE9BQUEsRUFBQSxDQUFBTixNQUFBLENBQVVPLGtCQUFrQixFQUFBUCxLQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQU1RLGdCQUFnQixDQUFBLENBQUE7QUFDcEQsQ0FBQTtBQUVPLFNBQVNDLHVCQUF1QkEsQ0FBQ0MsS0FBSyxFQUFFSixLQUFLLEVBQUU7RUFDcEQsSUFBSSxFQUFDSSxLQUFLLEtBQUxBLElBQUFBLElBQUFBLEtBQUssZUFBTEEsS0FBSyxDQUFFcEIsTUFBTSxDQUFFLEVBQUE7QUFDbEIsSUFBQSxPQUFPLEVBQUUsQ0FBQTtBQUNYLEdBQUE7RUFDQSxJQUFNcUIsa0JBQWtCLEdBQUdWLGNBQWMsQ0FBQ1MsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFSixLQUFLLENBQUMsQ0FBQTtBQUMxRCxFQUFBLElBQUlJLEtBQUssQ0FBQ3BCLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdEIsSUFBQSxPQUFPcUIsa0JBQWtCLENBQUE7QUFDM0IsR0FBQTtBQUNBLEVBQUEsSUFBSUQsS0FBSyxDQUFDcEIsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUN0QixJQUFNc0IsbUJBQW1CLEdBQUdYLGNBQWMsQ0FBQ1MsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFSixLQUFLLENBQUMsQ0FBQTtBQUMzRCxJQUFBLE9BQUEsRUFBQSxDQUFBTixNQUFBLENBQVVXLGtCQUFrQixFQUFBWCxJQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQUtZLG1CQUFtQixDQUFBLENBQUE7QUFDdEQsR0FBQTtBQUVBLEVBQUEsSUFBTUMsZUFBZSxHQUFHSCxLQUFLLENBQUNwQixNQUFNLEdBQUcsQ0FBQyxDQUFBO0FBQ3hDLEVBQUEsT0FBQSxFQUFBLENBQUFVLE1BQUEsQ0FBVVcsa0JBQWtCLEVBQUFYLEtBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBTWEsZUFBZSxFQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ25ELENBQUE7O0FBRUE7O0FBRU8sU0FBU0MsT0FBT0EsQ0FBQ3RCLElBQUksRUFBQXVCLEtBQUEsRUFBd0M7QUFBQSxFQUFBLElBQUFDLFVBQUEsR0FBQUQsS0FBQSxDQUFwQ0UsSUFBSTtBQUFKQSxJQUFBQSxJQUFJLEdBQUFELFVBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxDQUFDLEdBQUFBLFVBQUE7SUFBQUUsWUFBQSxHQUFBSCxLQUFBLENBQUVJLE1BQU07QUFBTkEsSUFBQUEsTUFBTSxHQUFBRCxZQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsQ0FBQyxHQUFBQSxZQUFBO0lBQUFFLFlBQUEsR0FBQUwsS0FBQSxDQUFFTSxNQUFNO0FBQU5BLElBQUFBLE1BQU0sR0FBQUQsWUFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLENBQUMsR0FBQUEsWUFBQSxDQUFBO0FBQzlELEVBQUEsT0FBT0UsUUFBUSxDQUFDQyxVQUFVLENBQUNDLFVBQVUsQ0FBQ2hDLElBQUksRUFBRTZCLE1BQU0sQ0FBQyxFQUFFRixNQUFNLENBQUMsRUFBRUYsSUFBSSxDQUFDLENBQUE7QUFDckUsQ0FBQTtBQW1CTyxTQUFTUSxPQUFPQSxDQUFDakMsSUFBSSxFQUFFM0IsTUFBTSxFQUFFO0FBQ3BDLEVBQUEsSUFBSWdDLFNBQVMsR0FDVmhDLE1BQU0sSUFBSUssZUFBZSxDQUFDTCxNQUFNLENBQUMsSUFDakNNLGdCQUFnQixFQUFFLElBQUlELGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBRSxDQUFBO0FBQzdELEVBQUEsT0FBT3VELFVBQVUsQ0FBQ2xDLElBQUksRUFBRUssU0FBUyxHQUFHO0FBQUVoQyxJQUFBQSxNQUFNLEVBQUVnQyxTQUFBQTtHQUFXLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDbkUsQ0FBQTtBQUVPLFNBQVM4QixnQkFBZ0JBLENBQUNDLEdBQUcsRUFBRS9ELE1BQU0sRUFBRTtBQUM1QyxFQUFBLE9BQU9nQixVQUFVLENBQUMrQyxHQUFHLEVBQUUsS0FBSyxFQUFFL0QsTUFBTSxDQUFDLENBQUE7QUFDdkMsQ0FBQTs7QUFFQTs7QUFFTyxTQUFTZ0UsYUFBYUEsQ0FBQ3JDLElBQUksRUFBRTtFQUNsQyxPQUFPc0MsVUFBVSxDQUFDdEMsSUFBSSxDQUFDLENBQUE7QUFDekIsQ0FBQTtBQUVPLFNBQVN1QyxjQUFjQSxDQUFDdkMsSUFBSSxFQUFFM0IsTUFBTSxFQUFFbUUsZ0JBQWdCLEVBQUU7QUFDN0QsRUFBQSxJQUFJbkMsU0FBUyxHQUFHaEMsTUFBTSxHQUNsQkssZUFBZSxDQUFDTCxNQUFNLENBQUMsR0FDdkJLLGVBQWUsQ0FBQ0MsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0VBQ3ZDLE9BQU84RCxXQUFXLENBQUN6QyxJQUFJLEVBQUU7QUFDdkIzQixJQUFBQSxNQUFNLEVBQUVnQyxTQUFTO0FBQ2pCcUMsSUFBQUEsWUFBWSxFQUFFRixnQkFBQUE7QUFDaEIsR0FBQyxDQUFDLENBQUE7QUFDSixDQUFBO0FBRU8sU0FBU0csZUFBZUEsQ0FBQzNDLElBQUksRUFBRTtFQUNwQyxPQUFPNEMsWUFBWSxDQUFDNUMsSUFBSSxDQUFDLENBQUE7QUFDM0IsQ0FBQTtBQUVPLFNBQVM2QyxjQUFjQSxDQUFDN0MsSUFBSSxFQUFFO0VBQ25DLE9BQU84QyxXQUFXLENBQUM5QyxJQUFJLENBQUMsQ0FBQTtBQUMxQixDQUFBO0FBRU8sU0FBUytDLGlCQUFpQkEsQ0FBQy9DLElBQUksRUFBRTtFQUN0QyxPQUFPZ0QsY0FBYyxDQUFDaEQsSUFBSSxDQUFDLENBQUE7QUFDN0IsQ0FBQTtBQUVPLFNBQVNpRCxlQUFlQSxHQUFHO0FBQ2hDLEVBQUEsT0FBT1gsVUFBVSxDQUFDM0UsT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUM5QixDQUFBOztBQUVBOztBQUVPLFNBQVN1RixZQUFZQSxDQUFDbEQsSUFBSSxFQUFFO0VBQ2pDLE9BQU9tRCxTQUFTLENBQUNuRCxJQUFJLENBQUMsQ0FBQTtBQUN4QixDQUFBO0FBNEJPLFNBQVNvRCxVQUFVQSxDQUFDQyxLQUFLLEVBQUVDLEtBQUssRUFBRTtFQUN2QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtBQUNsQixJQUFBLE9BQU9DLFlBQVksQ0FBQ0YsS0FBSyxFQUFFQyxLQUFLLENBQUMsQ0FBQTtBQUNuQyxHQUFDLE1BQU07QUFDTCxJQUFBLE9BQU8sQ0FBQ0QsS0FBSyxJQUFJLENBQUNDLEtBQUssQ0FBQTtBQUN6QixHQUFBO0FBQ0YsQ0FBQTtBQUVPLFNBQVNFLFdBQVdBLENBQUNILEtBQUssRUFBRUMsS0FBSyxFQUFFO0VBQ3hDLElBQUlELEtBQUssSUFBSUMsS0FBSyxFQUFFO0FBQ2xCLElBQUEsT0FBT0csYUFBYSxDQUFDSixLQUFLLEVBQUVDLEtBQUssQ0FBQyxDQUFBO0FBQ3BDLEdBQUMsTUFBTTtBQUNMLElBQUEsT0FBTyxDQUFDRCxLQUFLLElBQUksQ0FBQ0MsS0FBSyxDQUFBO0FBQ3pCLEdBQUE7QUFDRixDQUFBO0FBRU8sU0FBU0ksYUFBYUEsQ0FBQ0wsS0FBSyxFQUFFQyxLQUFLLEVBQUU7RUFDMUMsSUFBSUQsS0FBSyxJQUFJQyxLQUFLLEVBQUU7QUFDbEIsSUFBQSxPQUFPSyxlQUFlLENBQUNOLEtBQUssRUFBRUMsS0FBSyxDQUFDLENBQUE7QUFDdEMsR0FBQyxNQUFNO0FBQ0wsSUFBQSxPQUFPLENBQUNELEtBQUssSUFBSSxDQUFDQyxLQUFLLENBQUE7QUFDekIsR0FBQTtBQUNGLENBQUE7QUFFTyxTQUFTTSxTQUFTQSxDQUFDUCxLQUFLLEVBQUVDLEtBQUssRUFBRTtFQUN0QyxJQUFJRCxLQUFLLElBQUlDLEtBQUssRUFBRTtBQUNsQixJQUFBLE9BQU9PLFdBQVcsQ0FBQ1IsS0FBSyxFQUFFQyxLQUFLLENBQUMsQ0FBQTtBQUNsQyxHQUFDLE1BQU07QUFDTCxJQUFBLE9BQU8sQ0FBQ0QsS0FBSyxJQUFJLENBQUNDLEtBQUssQ0FBQTtBQUN6QixHQUFBO0FBQ0YsQ0FBQTtBQUVPLFNBQVNRLE9BQU9BLENBQUNULEtBQUssRUFBRUMsS0FBSyxFQUFFO0VBQ3BDLElBQUlELEtBQUssSUFBSUMsS0FBSyxFQUFFO0FBQ2xCLElBQUEsT0FBT1MsU0FBUyxDQUFDVixLQUFLLEVBQUVDLEtBQUssQ0FBQyxDQUFBO0FBQ2hDLEdBQUMsTUFBTTtBQUNMLElBQUEsT0FBTyxDQUFDRCxLQUFLLElBQUksQ0FBQ0MsS0FBSyxDQUFBO0FBQ3pCLEdBQUE7QUFDRixDQUFBO0FBRU8sU0FBU1UsWUFBWUEsQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRUMsT0FBTyxFQUFFO0FBQ3BELEVBQUEsSUFBSW9ELEtBQUssQ0FBQTtBQUNULEVBQUEsSUFBTUMsS0FBSyxHQUFHNUIsVUFBVSxDQUFDMUIsU0FBUyxDQUFDLENBQUE7QUFDbkMsRUFBQSxJQUFNdUQsR0FBRyxHQUFHQyxRQUFRLENBQUN2RCxPQUFPLENBQUMsQ0FBQTtFQUU3QixJQUFJO0FBQ0ZvRCxJQUFBQSxLQUFLLEdBQUdJLGdCQUFnQixDQUFDakMsR0FBRyxFQUFFO0FBQUU4QixNQUFBQSxLQUFLLEVBQUxBLEtBQUs7QUFBRUMsTUFBQUEsR0FBRyxFQUFIQSxHQUFBQTtBQUFJLEtBQUMsQ0FBQyxDQUFBO0dBQzlDLENBQUMsT0FBT0csR0FBRyxFQUFFO0FBQ1pMLElBQUFBLEtBQUssR0FBRyxLQUFLLENBQUE7QUFDZixHQUFBO0FBQ0EsRUFBQSxPQUFPQSxLQUFLLENBQUE7QUFDZCxDQUFBOztBQVFBOztBQUVPLFNBQVNNLGNBQWNBLENBQUNDLFVBQVUsRUFBRUMsVUFBVSxFQUFFO0VBQ3JELElBQU1DLEtBQUssR0FBRyxPQUFPQyxNQUFNLEtBQUssV0FBVyxHQUFHQSxNQUFNLEdBQUdDLFVBQVUsQ0FBQTtBQUVqRSxFQUFBLElBQUksQ0FBQ0YsS0FBSyxDQUFDRyxjQUFjLEVBQUU7QUFDekJILElBQUFBLEtBQUssQ0FBQ0csY0FBYyxHQUFHLEVBQUUsQ0FBQTtBQUMzQixHQUFBO0FBQ0FILEVBQUFBLEtBQUssQ0FBQ0csY0FBYyxDQUFDTCxVQUFVLENBQUMsR0FBR0MsVUFBVSxDQUFBO0FBQy9DLENBQUE7QUFFTyxTQUFTSyxnQkFBZ0JBLENBQUNOLFVBQVUsRUFBRTtFQUMzQyxJQUFNRSxLQUFLLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxHQUFHQyxVQUFVLENBQUE7RUFFakVGLEtBQUssQ0FBQ0ssWUFBWSxHQUFHUCxVQUFVLENBQUE7QUFDakMsQ0FBQTtBQUVPLFNBQVM3RixnQkFBZ0JBLEdBQUc7RUFDakMsSUFBTStGLEtBQUssR0FBRyxPQUFPQyxNQUFNLEtBQUssV0FBVyxHQUFHQSxNQUFNLEdBQUdDLFVBQVUsQ0FBQTtFQUVqRSxPQUFPRixLQUFLLENBQUNLLFlBQVksQ0FBQTtBQUMzQixDQUFBO0FBRU8sU0FBU3JHLGVBQWVBLENBQUNzRyxVQUFVLEVBQUU7QUFDMUMsRUFBQSxJQUFJLE9BQU9BLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDbEM7SUFDQSxJQUFNTixLQUFLLEdBQUcsT0FBT0MsTUFBTSxLQUFLLFdBQVcsR0FBR0EsTUFBTSxHQUFHQyxVQUFVLENBQUE7SUFDakUsT0FBT0YsS0FBSyxDQUFDRyxjQUFjLEdBQUdILEtBQUssQ0FBQ0csY0FBYyxDQUFDRyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUE7QUFDdkUsR0FBQyxNQUFNO0FBQ0w7QUFDQSxJQUFBLE9BQU9BLFVBQVUsQ0FBQTtBQUNuQixHQUFBO0FBQ0YsQ0FBQTtBQUVPLFNBQVNDLDJCQUEyQkEsQ0FBQ2pGLElBQUksRUFBRWtGLFVBQVUsRUFBRTdHLE1BQU0sRUFBRTtFQUNwRSxPQUFPNkcsVUFBVSxDQUFDN0YsVUFBVSxDQUFDVyxJQUFJLEVBQUUsTUFBTSxFQUFFM0IsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNyRCxDQUFBO0FBRU8sU0FBUzhHLHFCQUFxQkEsQ0FBQ25GLElBQUksRUFBRTNCLE1BQU0sRUFBRTtBQUNsRCxFQUFBLE9BQU9nQixVQUFVLENBQUNXLElBQUksRUFBRSxRQUFRLEVBQUUzQixNQUFNLENBQUMsQ0FBQTtBQUMzQyxDQUFBO0FBRU8sU0FBUytHLHVCQUF1QkEsQ0FBQ3BGLElBQUksRUFBRTNCLE1BQU0sRUFBRTtBQUNwRCxFQUFBLE9BQU9nQixVQUFVLENBQUNXLElBQUksRUFBRSxLQUFLLEVBQUUzQixNQUFNLENBQUMsQ0FBQTtBQUN4QyxDQUFBO0FBRU8sU0FBU2dILGdCQUFnQkEsQ0FBQ0MsS0FBSyxFQUFFakgsTUFBTSxFQUFFO0FBQzlDLEVBQUEsT0FBT2dCLFVBQVUsQ0FBQ2tHLFFBQVEsQ0FBQzVILE9BQU8sRUFBRSxFQUFFMkgsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFakgsTUFBTSxDQUFDLENBQUE7QUFDL0QsQ0FBQTtBQUVPLFNBQVNtSCxxQkFBcUJBLENBQUNGLEtBQUssRUFBRWpILE1BQU0sRUFBRTtBQUNuRCxFQUFBLE9BQU9nQixVQUFVLENBQUNrRyxRQUFRLENBQUM1SCxPQUFPLEVBQUUsRUFBRTJILEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRWpILE1BQU0sQ0FBQyxDQUFBO0FBQzlELENBQUE7QUFFTyxTQUFTb0gsdUJBQXVCQSxDQUFDQyxPQUFPLEVBQUVySCxNQUFNLEVBQUU7QUFDdkQsRUFBQSxPQUFPZ0IsVUFBVSxDQUFDc0csVUFBVSxDQUFDaEksT0FBTyxFQUFFLEVBQUUrSCxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUVySCxNQUFNLENBQUMsQ0FBQTtBQUNsRSxDQUFBOztBQUVBOztBQUVPLFNBQVN1SCxhQUFhQSxDQUMzQnhELEdBQUcsRUFVSDtBQUFBLEVBQUEsSUFBQXlELEtBQUEsR0FBQUMsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBREksRUFBRTtJQVBKdkgsT0FBTyxHQUFBc0gsS0FBQSxDQUFQdEgsT0FBTztJQUNQeUgsT0FBTyxHQUFBSCxLQUFBLENBQVBHLE9BQU87SUFDUEMsWUFBWSxHQUFBSixLQUFBLENBQVpJLFlBQVk7SUFDWkMsb0JBQW9CLEdBQUFMLEtBQUEsQ0FBcEJLLG9CQUFvQjtJQUNwQkMsWUFBWSxHQUFBTixLQUFBLENBQVpNLFlBQVk7SUFDWkMsb0JBQW9CLEdBQUFQLEtBQUEsQ0FBcEJPLG9CQUFvQjtJQUNwQkMsVUFBVSxHQUFBUixLQUFBLENBQVZRLFVBQVUsQ0FBQTtFQUdaLE9BQ0VDLGFBQWEsQ0FBQ2xFLEdBQUcsRUFBRTtBQUFFN0QsSUFBQUEsT0FBTyxFQUFQQSxPQUFPO0FBQUV5SCxJQUFBQSxPQUFPLEVBQVBBLE9BQUFBO0dBQVMsQ0FBQyxJQUN2Q0MsWUFBWSxJQUNYQSxZQUFZLENBQUNNLElBQUksQ0FBQyxVQUFDQyxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQzVCNUMsU0FBUyxDQUFDeEIsR0FBRyxFQUFFb0UsV0FBVyxDQUFDeEcsSUFBSSxHQUFHd0csV0FBVyxDQUFDeEcsSUFBSSxHQUFHd0csV0FBVyxDQUFDLENBQUE7R0FDbkUsQ0FBRSxJQUNITixvQkFBb0IsSUFDbkJBLG9CQUFvQixDQUFDSyxJQUFJLENBQUMsVUFBQUUsS0FBQSxFQUFBO0FBQUEsSUFBQSxJQUFHdkMsS0FBSyxHQUFBdUMsS0FBQSxDQUFMdkMsS0FBSztNQUFFQyxHQUFHLEdBQUFzQyxLQUFBLENBQUh0QyxHQUFHLENBQUE7SUFBQSxPQUNyQ0UsZ0JBQWdCLENBQUNqQyxHQUFHLEVBQUU7QUFBRThCLE1BQUFBLEtBQUssRUFBTEEsS0FBSztBQUFFQyxNQUFBQSxHQUFHLEVBQUhBLEdBQUFBO0FBQUksS0FBQyxDQUFDLENBQUE7R0FDdkMsQ0FBRSxJQUNIZ0MsWUFBWSxJQUNYLENBQUNBLFlBQVksQ0FBQ0ksSUFBSSxDQUFDLFVBQUNHLFdBQVcsRUFBQTtBQUFBLElBQUEsT0FBSzlDLFNBQVMsQ0FBQ3hCLEdBQUcsRUFBRXNFLFdBQVcsQ0FBQyxDQUFBO0dBQUUsQ0FBQSxJQUNsRU4sb0JBQW9CLElBQ25CLENBQUNBLG9CQUFvQixDQUFDRyxJQUFJLENBQUMsVUFBQUksS0FBQSxFQUFBO0FBQUEsSUFBQSxJQUFHekMsS0FBSyxHQUFBeUMsS0FBQSxDQUFMekMsS0FBSztNQUFFQyxHQUFHLEdBQUF3QyxLQUFBLENBQUh4QyxHQUFHLENBQUE7SUFBQSxPQUN0Q0UsZ0JBQWdCLENBQUNqQyxHQUFHLEVBQUU7QUFBRThCLE1BQUFBLEtBQUssRUFBTEEsS0FBSztBQUFFQyxNQUFBQSxHQUFHLEVBQUhBLEdBQUFBO0FBQUksS0FBQyxDQUFDLENBQUE7QUFBQSxHQUN2QyxDQUFFLElBQ0hrQyxVQUFVLElBQUksQ0FBQ0EsVUFBVSxDQUFDMUksT0FBTyxDQUFDeUUsR0FBRyxDQUFDLENBQUUsSUFDekMsS0FBSyxDQUFBO0FBRVQsQ0FBQTtBQUVPLFNBQVN3RSxhQUFhQSxDQUMzQnhFLEdBQUcsRUFFSDtBQUFBLEVBQUEsSUFBQXlFLEtBQUEsR0FBQWYsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRHlDLEVBQUU7SUFBekNHLFlBQVksR0FBQVksS0FBQSxDQUFaWixZQUFZO0lBQUVDLG9CQUFvQixHQUFBVyxLQUFBLENBQXBCWCxvQkFBb0IsQ0FBQTtBQUVwQyxFQUFBLElBQUlBLG9CQUFvQixJQUFJQSxvQkFBb0IsQ0FBQ3BHLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDM0QsSUFBQSxPQUFPb0csb0JBQW9CLENBQUNLLElBQUksQ0FBQyxVQUFBTyxLQUFBLEVBQUE7QUFBQSxNQUFBLElBQUc1QyxLQUFLLEdBQUE0QyxLQUFBLENBQUw1QyxLQUFLO1FBQUVDLEdBQUcsR0FBQTJDLEtBQUEsQ0FBSDNDLEdBQUcsQ0FBQTtNQUFBLE9BQzVDRSxnQkFBZ0IsQ0FBQ2pDLEdBQUcsRUFBRTtBQUFFOEIsUUFBQUEsS0FBSyxFQUFMQSxLQUFLO0FBQUVDLFFBQUFBLEdBQUcsRUFBSEEsR0FBQUE7QUFBSSxPQUFDLENBQUMsQ0FBQTtBQUFBLEtBQ3ZDLENBQUMsQ0FBQTtBQUNILEdBQUE7QUFDQSxFQUFBLE9BQ0c4QixZQUFZLElBQ1hBLFlBQVksQ0FBQ00sSUFBSSxDQUFDLFVBQUNDLFdBQVcsRUFBQTtBQUFBLElBQUEsT0FDNUI1QyxTQUFTLENBQUN4QixHQUFHLEVBQUVvRSxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLENBQUMsQ0FBQTtHQUNuRSxDQUFDLElBQ0gsS0FBSyxDQUFBO0FBRVQsQ0FBQTtBQUVPLFNBQVNPLGVBQWVBLENBQzdCekIsS0FBSyxFQUVMO0FBQUEsRUFBQSxJQUFBMEIsS0FBQSxHQUFBbEIsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRCtELEVBQUU7SUFBL0R2SCxPQUFPLEdBQUF5SSxLQUFBLENBQVB6SSxPQUFPO0lBQUV5SCxPQUFPLEdBQUFnQixLQUFBLENBQVBoQixPQUFPO0lBQUVDLFlBQVksR0FBQWUsS0FBQSxDQUFaZixZQUFZO0lBQUVFLFlBQVksR0FBQWEsS0FBQSxDQUFaYixZQUFZO0lBQUVFLFVBQVUsR0FBQVcsS0FBQSxDQUFWWCxVQUFVLENBQUE7RUFFMUQsT0FDRUMsYUFBYSxDQUFDaEIsS0FBSyxFQUFFO0FBQ25CL0csSUFBQUEsT0FBTyxFQUFFcUUsWUFBWSxDQUFDckUsT0FBTyxDQUFDO0lBQzlCeUgsT0FBTyxFQUFFaUIsVUFBVSxDQUFDakIsT0FBTyxDQUFBO0dBQzVCLENBQUMsSUFDREMsWUFBWSxJQUNYQSxZQUFZLENBQUNNLElBQUksQ0FBQyxVQUFDQyxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQUtoRCxXQUFXLENBQUM4QixLQUFLLEVBQUVrQixXQUFXLENBQUMsQ0FBQTtHQUFFLENBQUEsSUFDckVMLFlBQVksSUFDWCxDQUFDQSxZQUFZLENBQUNJLElBQUksQ0FBQyxVQUFDRyxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQUtsRCxXQUFXLENBQUM4QixLQUFLLEVBQUVvQixXQUFXLENBQUMsQ0FBQTtBQUFBLEdBQUEsQ0FBRSxJQUN0RUwsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQzFJLE9BQU8sQ0FBQzJILEtBQUssQ0FBQyxDQUFFLElBQzNDLEtBQUssQ0FBQTtBQUVULENBQUE7QUFFTyxTQUFTNEIsY0FBY0EsQ0FBQ3RHLFNBQVMsRUFBRUMsT0FBTyxFQUFFc0csQ0FBQyxFQUFFL0UsR0FBRyxFQUFFO0FBQ3pELEVBQUEsSUFBTWdGLGFBQWEsR0FBR0MsT0FBTyxDQUFDekcsU0FBUyxDQUFDLENBQUE7QUFDeEMsRUFBQSxJQUFNMEcsY0FBYyxHQUFHQyxRQUFRLENBQUMzRyxTQUFTLENBQUMsQ0FBQTtBQUMxQyxFQUFBLElBQU00RyxXQUFXLEdBQUdILE9BQU8sQ0FBQ3hHLE9BQU8sQ0FBQyxDQUFBO0FBQ3BDLEVBQUEsSUFBTTRHLFlBQVksR0FBR0YsUUFBUSxDQUFDMUcsT0FBTyxDQUFDLENBQUE7QUFDdEMsRUFBQSxJQUFNNkcsT0FBTyxHQUFHTCxPQUFPLENBQUNqRixHQUFHLENBQUMsQ0FBQTtBQUM1QixFQUFBLElBQUlnRixhQUFhLEtBQUtJLFdBQVcsSUFBSUosYUFBYSxLQUFLTSxPQUFPLEVBQUU7QUFDOUQsSUFBQSxPQUFPSixjQUFjLElBQUlILENBQUMsSUFBSUEsQ0FBQyxJQUFJTSxZQUFZLENBQUE7QUFDakQsR0FBQyxNQUFNLElBQUlMLGFBQWEsR0FBR0ksV0FBVyxFQUFFO0lBQ3RDLE9BQ0dFLE9BQU8sS0FBS04sYUFBYSxJQUFJRSxjQUFjLElBQUlILENBQUMsSUFDaERPLE9BQU8sS0FBS0YsV0FBVyxJQUFJQyxZQUFZLElBQUlOLENBQUUsSUFDN0NPLE9BQU8sR0FBR0YsV0FBVyxJQUFJRSxPQUFPLEdBQUdOLGFBQWMsQ0FBQTtBQUV0RCxHQUFBO0FBQ0YsQ0FBQTtBQUVPLFNBQVNPLGlCQUFpQkEsQ0FDL0JqQyxPQUFPLEVBRVA7QUFBQSxFQUFBLElBQUFrQyxLQUFBLEdBQUE5QixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FEK0QsRUFBRTtJQUEvRHZILE9BQU8sR0FBQXFKLEtBQUEsQ0FBUHJKLE9BQU87SUFBRXlILE9BQU8sR0FBQTRCLEtBQUEsQ0FBUDVCLE9BQU87SUFBRUMsWUFBWSxHQUFBMkIsS0FBQSxDQUFaM0IsWUFBWTtJQUFFRSxZQUFZLEdBQUF5QixLQUFBLENBQVp6QixZQUFZO0lBQUVFLFVBQVUsR0FBQXVCLEtBQUEsQ0FBVnZCLFVBQVUsQ0FBQTtFQUUxRCxPQUNFQyxhQUFhLENBQUNaLE9BQU8sRUFBRTtBQUFFbkgsSUFBQUEsT0FBTyxFQUFQQSxPQUFPO0FBQUV5SCxJQUFBQSxPQUFPLEVBQVBBLE9BQUFBO0dBQVMsQ0FBQyxJQUMzQ0MsWUFBWSxJQUNYQSxZQUFZLENBQUNNLElBQUksQ0FBQyxVQUFDQyxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQzVCOUMsYUFBYSxDQUFDZ0MsT0FBTyxFQUFFYyxXQUFXLENBQUMsQ0FBQTtHQUNyQyxDQUFFLElBQ0hMLFlBQVksSUFDWCxDQUFDQSxZQUFZLENBQUNJLElBQUksQ0FBQyxVQUFDRyxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQzdCaEQsYUFBYSxDQUFDZ0MsT0FBTyxFQUFFZ0IsV0FBVyxDQUFDLENBQUE7QUFBQSxHQUNyQyxDQUFFLElBQ0hMLFVBQVUsSUFBSSxDQUFDQSxVQUFVLENBQUMxSSxPQUFPLENBQUMrSCxPQUFPLENBQUMsQ0FBRSxJQUM3QyxLQUFLLENBQUE7QUFFVCxDQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNtQyxhQUFhQSxDQUFDQyxJQUFJLEVBQUU1RCxLQUFLLEVBQUVDLEdBQUcsRUFBRTtBQUM5QyxFQUFBLElBQUksQ0FBQ2xFLFNBQVcsQ0FBQ2lFLEtBQUssQ0FBQyxJQUFJLENBQUNqRSxTQUFXLENBQUNrRSxHQUFHLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQTtBQUMxRCxFQUFBLElBQU00RCxTQUFTLEdBQUdWLE9BQU8sQ0FBQ25ELEtBQUssQ0FBQyxDQUFBO0FBQ2hDLEVBQUEsSUFBTThELE9BQU8sR0FBR1gsT0FBTyxDQUFDbEQsR0FBRyxDQUFDLENBQUE7QUFFNUIsRUFBQSxPQUFPNEQsU0FBUyxJQUFJRCxJQUFJLElBQUlFLE9BQU8sSUFBSUYsSUFBSSxDQUFBO0FBQzdDLENBQUE7QUFFTyxTQUFTRyxjQUFjQSxDQUM1QkgsSUFBSSxFQUVKO0FBQUEsRUFBQSxJQUFBSSxNQUFBLEdBQUFwQyxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FEK0QsRUFBRTtJQUEvRHZILE9BQU8sR0FBQTJKLE1BQUEsQ0FBUDNKLE9BQU87SUFBRXlILE9BQU8sR0FBQWtDLE1BQUEsQ0FBUGxDLE9BQU87SUFBRUMsWUFBWSxHQUFBaUMsTUFBQSxDQUFaakMsWUFBWTtJQUFFRSxZQUFZLEdBQUErQixNQUFBLENBQVovQixZQUFZO0lBQUVFLFVBQVUsR0FBQTZCLE1BQUEsQ0FBVjdCLFVBQVUsQ0FBQTtFQUUxRCxJQUFNckcsSUFBSSxHQUFHLElBQUkvQixJQUFJLENBQUM2SixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ2pDLE9BQ0V4QixhQUFhLENBQUN0RyxJQUFJLEVBQUU7QUFDbEJ6QixJQUFBQSxPQUFPLEVBQUV1RSxXQUFXLENBQUN2RSxPQUFPLENBQUM7SUFDN0J5SCxPQUFPLEVBQUVtQyxTQUFTLENBQUNuQyxPQUFPLENBQUE7R0FDM0IsQ0FBQyxJQUNEQyxZQUFZLElBQ1hBLFlBQVksQ0FBQ00sSUFBSSxDQUFDLFVBQUNDLFdBQVcsRUFBQTtBQUFBLElBQUEsT0FBS3BELFVBQVUsQ0FBQ3BELElBQUksRUFBRXdHLFdBQVcsQ0FBQyxDQUFBO0dBQUUsQ0FBQSxJQUNuRUwsWUFBWSxJQUNYLENBQUNBLFlBQVksQ0FBQ0ksSUFBSSxDQUFDLFVBQUNHLFdBQVcsRUFBQTtBQUFBLElBQUEsT0FBS3RELFVBQVUsQ0FBQ3BELElBQUksRUFBRTBHLFdBQVcsQ0FBQyxDQUFBO0FBQUEsR0FBQSxDQUFFLElBQ3BFTCxVQUFVLElBQUksQ0FBQ0EsVUFBVSxDQUFDMUksT0FBTyxDQUFDcUMsSUFBSSxDQUFDLENBQUUsSUFDMUMsS0FBSyxDQUFBO0FBRVQsQ0FBQTtBQUVPLFNBQVNvSSxnQkFBZ0JBLENBQUN4SCxTQUFTLEVBQUVDLE9BQU8sRUFBRXdILENBQUMsRUFBRWpHLEdBQUcsRUFBRTtBQUMzRCxFQUFBLElBQU1nRixhQUFhLEdBQUdDLE9BQU8sQ0FBQ3pHLFNBQVMsQ0FBQyxDQUFBO0FBQ3hDLEVBQUEsSUFBTTBILGdCQUFnQixHQUFHQyxVQUFVLENBQUMzSCxTQUFTLENBQUMsQ0FBQTtBQUM5QyxFQUFBLElBQU00RyxXQUFXLEdBQUdILE9BQU8sQ0FBQ3hHLE9BQU8sQ0FBQyxDQUFBO0FBQ3BDLEVBQUEsSUFBTTJILGNBQWMsR0FBR0QsVUFBVSxDQUFDMUgsT0FBTyxDQUFDLENBQUE7QUFDMUMsRUFBQSxJQUFNNkcsT0FBTyxHQUFHTCxPQUFPLENBQUNqRixHQUFHLENBQUMsQ0FBQTtBQUM1QixFQUFBLElBQUlnRixhQUFhLEtBQUtJLFdBQVcsSUFBSUosYUFBYSxLQUFLTSxPQUFPLEVBQUU7QUFDOUQsSUFBQSxPQUFPWSxnQkFBZ0IsSUFBSUQsQ0FBQyxJQUFJQSxDQUFDLElBQUlHLGNBQWMsQ0FBQTtBQUNyRCxHQUFDLE1BQU0sSUFBSXBCLGFBQWEsR0FBR0ksV0FBVyxFQUFFO0lBQ3RDLE9BQ0dFLE9BQU8sS0FBS04sYUFBYSxJQUFJa0IsZ0JBQWdCLElBQUlELENBQUMsSUFDbERYLE9BQU8sS0FBS0YsV0FBVyxJQUFJZ0IsY0FBYyxJQUFJSCxDQUFFLElBQy9DWCxPQUFPLEdBQUdGLFdBQVcsSUFBSUUsT0FBTyxHQUFHTixhQUFjLENBQUE7QUFFdEQsR0FBQTtBQUNGLENBQUE7QUFFTyxTQUFTZCxhQUFhQSxDQUFDbEUsR0FBRyxFQUE2QjtBQUFBLEVBQUEsSUFBQXFHLE1BQUEsR0FBQTNDLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7SUFBdkJ2SCxPQUFPLEdBQUFrSyxNQUFBLENBQVBsSyxPQUFPO0lBQUV5SCxPQUFPLEdBQUF5QyxNQUFBLENBQVB6QyxPQUFPLENBQUE7RUFDbkQsT0FDR3pILE9BQU8sSUFBSW1LLHdCQUF3QixDQUFDdEcsR0FBRyxFQUFFN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUNyRHlILE9BQU8sSUFBSTBDLHdCQUF3QixDQUFDdEcsR0FBRyxFQUFFNEQsT0FBTyxDQUFDLEdBQUcsQ0FBRSxDQUFBO0FBRTNELENBQUE7QUFFTyxTQUFTMkMsWUFBWUEsQ0FBQ0MsSUFBSSxFQUFFQyxLQUFLLEVBQUU7QUFDeEMsRUFBQSxPQUFPQSxLQUFLLENBQUN0QyxJQUFJLENBQ2YsVUFBQ3VDLFFBQVEsRUFBQTtBQUFBLElBQUEsT0FDUEMsUUFBUSxDQUFDRCxRQUFRLENBQUMsS0FBS0MsUUFBUSxDQUFDSCxJQUFJLENBQUMsSUFDckNJLFVBQVUsQ0FBQ0YsUUFBUSxDQUFDLEtBQUtFLFVBQVUsQ0FBQ0osSUFBSSxDQUFDLENBQUE7QUFBQSxHQUM3QyxDQUFDLENBQUE7QUFDSCxDQUFBO0FBRU8sU0FBU0ssY0FBY0EsQ0FDNUJMLElBQUksRUFFSjtBQUFBLEVBQUEsSUFBQU0sTUFBQSxHQUFBcEQsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBRDZDLEVBQUU7SUFBN0NxRCxZQUFZLEdBQUFELE1BQUEsQ0FBWkMsWUFBWTtJQUFFQyxZQUFZLEdBQUFGLE1BQUEsQ0FBWkUsWUFBWTtJQUFFQyxVQUFVLEdBQUFILE1BQUEsQ0FBVkcsVUFBVSxDQUFBO0VBRXhDLE9BQ0dGLFlBQVksSUFBSVIsWUFBWSxDQUFDQyxJQUFJLEVBQUVPLFlBQVksQ0FBQyxJQUNoREMsWUFBWSxJQUFJLENBQUNULFlBQVksQ0FBQ0MsSUFBSSxFQUFFUSxZQUFZLENBQUUsSUFDbERDLFVBQVUsSUFBSSxDQUFDQSxVQUFVLENBQUNULElBQUksQ0FBRSxJQUNqQyxLQUFLLENBQUE7QUFFVCxDQUFBO0FBRU8sU0FBU1UscUJBQXFCQSxDQUFDVixJQUFJLEVBQUFXLE1BQUEsRUFBd0I7QUFBQSxFQUFBLElBQXBCQyxPQUFPLEdBQUFELE1BQUEsQ0FBUEMsT0FBTztJQUFFQyxPQUFPLEdBQUFGLE1BQUEsQ0FBUEUsT0FBTyxDQUFBO0FBQzVELEVBQUEsSUFBSSxDQUFDRCxPQUFPLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0FBQ3hCLElBQUEsTUFBTSxJQUFJQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQTtBQUM1RCxHQUFBO0FBQ0EsRUFBQSxJQUFNQyxJQUFJLEdBQUdoTSxPQUFPLEVBQUUsQ0FBQTtBQUN0QixFQUFBLElBQU1pTSxRQUFRLEdBQUc5SCxRQUFRLENBQUNDLFVBQVUsQ0FBQzRILElBQUksRUFBRVgsVUFBVSxDQUFDSixJQUFJLENBQUMsQ0FBQyxFQUFFRyxRQUFRLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUE7QUFDN0UsRUFBQSxJQUFNaUIsR0FBRyxHQUFHL0gsUUFBUSxDQUNsQkMsVUFBVSxDQUFDNEgsSUFBSSxFQUFFWCxVQUFVLENBQUNRLE9BQU8sQ0FBQyxDQUFDLEVBQ3JDVCxRQUFRLENBQUNTLE9BQU8sQ0FDbEIsQ0FBQyxDQUFBO0FBQ0QsRUFBQSxJQUFNTSxHQUFHLEdBQUdoSSxRQUFRLENBQ2xCQyxVQUFVLENBQUM0SCxJQUFJLEVBQUVYLFVBQVUsQ0FBQ1MsT0FBTyxDQUFDLENBQUMsRUFDckNWLFFBQVEsQ0FBQ1UsT0FBTyxDQUNsQixDQUFDLENBQUE7QUFFRCxFQUFBLElBQUl4RixLQUFLLENBQUE7RUFDVCxJQUFJO0FBQ0ZBLElBQUFBLEtBQUssR0FBRyxDQUFDSSxnQkFBZ0IsQ0FBQ3VGLFFBQVEsRUFBRTtBQUFFMUYsTUFBQUEsS0FBSyxFQUFFMkYsR0FBRztBQUFFMUYsTUFBQUEsR0FBRyxFQUFFMkYsR0FBQUE7QUFBSSxLQUFDLENBQUMsQ0FBQTtHQUM5RCxDQUFDLE9BQU94RixHQUFHLEVBQUU7QUFDWkwsSUFBQUEsS0FBSyxHQUFHLEtBQUssQ0FBQTtBQUNmLEdBQUE7QUFDQSxFQUFBLE9BQU9BLEtBQUssQ0FBQTtBQUNkLENBQUE7QUFFTyxTQUFTOEYsbUJBQW1CQSxDQUFDM0gsR0FBRyxFQUFrQztBQUFBLEVBQUEsSUFBQTRILE1BQUEsR0FBQWxFLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7SUFBNUJ2SCxPQUFPLEdBQUF5TCxNQUFBLENBQVB6TCxPQUFPO0lBQUU0SCxZQUFZLEdBQUE2RCxNQUFBLENBQVo3RCxZQUFZLENBQUE7QUFDOUQsRUFBQSxJQUFNOEQsYUFBYSxHQUFHQyxTQUFTLENBQUM5SCxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDdkMsRUFBQSxPQUNHN0QsT0FBTyxJQUFJNEwsMEJBQTBCLENBQUM1TCxPQUFPLEVBQUUwTCxhQUFhLENBQUMsR0FBRyxDQUFDLElBQ2pFOUQsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQ1Z5RCwwQkFBMEIsQ0FBQ3pELFdBQVcsRUFBRXVELGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtHQUM5RCxDQUFFLElBQ0osS0FBSyxDQUFBO0FBRVQsQ0FBQTtBQUVPLFNBQVNJLGtCQUFrQkEsQ0FBQ2pJLEdBQUcsRUFBa0M7QUFBQSxFQUFBLElBQUFrSSxNQUFBLEdBQUF4RSxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO0lBQTVCRSxPQUFPLEdBQUFzRSxNQUFBLENBQVB0RSxPQUFPO0lBQUVHLFlBQVksR0FBQW1FLE1BQUEsQ0FBWm5FLFlBQVksQ0FBQTtBQUM3RCxFQUFBLElBQU1vRSxTQUFTLEdBQUdDLFNBQVMsQ0FBQ3BJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuQyxFQUFBLE9BQ0c0RCxPQUFPLElBQUltRSwwQkFBMEIsQ0FBQ0ksU0FBUyxFQUFFdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUM3REcsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQUt5RCwwQkFBMEIsQ0FBQ0ksU0FBUyxFQUFFN0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ3pFLENBQUUsSUFDSixLQUFLLENBQUE7QUFFVCxDQUFBO0FBRU8sU0FBUytELHFCQUFxQkEsQ0FBQ3pLLElBQUksRUFBa0M7QUFBQSxFQUFBLElBQUEwSyxNQUFBLEdBQUE1RSxTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO0lBQTVCdkgsT0FBTyxHQUFBbU0sTUFBQSxDQUFQbk0sT0FBTztJQUFFNEgsWUFBWSxHQUFBdUUsTUFBQSxDQUFadkUsWUFBWSxDQUFBO0FBQ2pFLEVBQUEsSUFBTXdFLGVBQWUsR0FBRzdILFdBQVcsQ0FBQzlDLElBQUksQ0FBQyxDQUFBO0FBQ3pDLEVBQUEsSUFBTTRLLGVBQWUsR0FBR0MsV0FBVyxDQUFDRixlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFFdkQsRUFBQSxPQUNHcE0sT0FBTyxJQUFJdU0sNEJBQTRCLENBQUN2TSxPQUFPLEVBQUVxTSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQ3JFekUsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQ1ZvRSw0QkFBNEIsQ0FBQ3BFLFdBQVcsRUFBRWtFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtHQUNsRSxDQUFFLElBQ0osS0FBSyxDQUFBO0FBRVQsQ0FBQTtBQUVPLFNBQVNHLG9CQUFvQkEsQ0FBQy9LLElBQUksRUFBa0M7QUFBQSxFQUFBLElBQUFnTCxNQUFBLEdBQUFsRixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBSixFQUFFO0lBQTVCRSxPQUFPLEdBQUFnRixNQUFBLENBQVBoRixPQUFPO0lBQUVHLFlBQVksR0FBQTZFLE1BQUEsQ0FBWjdFLFlBQVksQ0FBQTtBQUNoRSxFQUFBLElBQU04RSxjQUFjLEdBQUc5QyxTQUFTLENBQUNuSSxJQUFJLENBQUMsQ0FBQTtBQUN0QyxFQUFBLElBQU1rTCxXQUFXLEdBQUdDLFdBQVcsQ0FBQ0YsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBRWxELEVBQUEsT0FDR2pGLE9BQU8sSUFBSThFLDRCQUE0QixDQUFDSSxXQUFXLEVBQUVsRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQ2pFRyxZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtBQUFBLElBQUEsT0FDVm9FLDRCQUE0QixDQUFDSSxXQUFXLEVBQUV4RSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7R0FDOUQsQ0FBRSxJQUNKLEtBQUssQ0FBQTtBQUVULENBQUE7QUFFTyxTQUFTMEUsa0JBQWtCQSxDQUFDaEosR0FBRyxFQUFrQztBQUFBLEVBQUEsSUFBQWlKLE1BQUEsR0FBQXZGLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7SUFBNUJ2SCxPQUFPLEdBQUE4TSxNQUFBLENBQVA5TSxPQUFPO0lBQUU0SCxZQUFZLEdBQUFrRixNQUFBLENBQVpsRixZQUFZLENBQUE7QUFDN0QsRUFBQSxJQUFNbUYsWUFBWSxHQUFHQyxRQUFRLENBQUNuSixHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDckMsRUFBQSxPQUNHN0QsT0FBTyxJQUFJaU4seUJBQXlCLENBQUNqTixPQUFPLEVBQUUrTSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQy9EbkYsWUFBWSxJQUNYQSxZQUFZLENBQUNpRSxLQUFLLENBQ2hCLFVBQUMxRCxXQUFXLEVBQUE7QUFBQSxJQUFBLE9BQ1Y4RSx5QkFBeUIsQ0FBQzlFLFdBQVcsRUFBRTRFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtHQUM1RCxDQUFFLElBQ0osS0FBSyxDQUFBO0FBRVQsQ0FBQTtBQUVPLFNBQVNHLG1CQUFtQkEsQ0FDakNySixHQUFHLEVBRUg7QUFBQSxFQUFBLElBQUFzSixNQUFBLEdBQUE1RixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FEeUQsRUFBRTtJQUF6RHZILE9BQU8sR0FBQW1OLE1BQUEsQ0FBUG5OLE9BQU87SUFBQW9OLHFCQUFBLEdBQUFELE1BQUEsQ0FBRUUsY0FBYztBQUFkQSxJQUFBQSxjQUFjLEdBQUFELHFCQUFBLEtBQUdsTyxLQUFBQSxDQUFBQSxHQUFBQSx3QkFBd0IsR0FBQWtPLHFCQUFBLENBQUE7RUFFcEQsSUFBTUwsWUFBWSxHQUFHekksY0FBYyxDQUFDMEksUUFBUSxDQUFDbkosR0FBRyxFQUFFd0osY0FBYyxDQUFDLENBQUMsQ0FBQTtBQUNsRSxFQUFBLElBQUFDLGVBQUEsR0FBc0JDLGNBQWMsQ0FBQ1IsWUFBWSxFQUFFTSxjQUFjLENBQUM7SUFBMURHLFNBQVMsR0FBQUYsZUFBQSxDQUFURSxTQUFTLENBQUE7QUFDakIsRUFBQSxJQUFNQyxXQUFXLEdBQUd6TixPQUFPLElBQUk4SSxPQUFPLENBQUM5SSxPQUFPLENBQUMsQ0FBQTtBQUMvQyxFQUFBLE9BQVF5TixXQUFXLElBQUlBLFdBQVcsR0FBR0QsU0FBUyxJQUFLLEtBQUssQ0FBQTtBQUMxRCxDQUFBO0FBRU8sU0FBU0UsaUJBQWlCQSxDQUFDN0osR0FBRyxFQUFrQztBQUFBLEVBQUEsSUFBQThKLE1BQUEsR0FBQXBHLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFKLEVBQUU7SUFBNUJFLE9BQU8sR0FBQWtHLE1BQUEsQ0FBUGxHLE9BQU87SUFBRUcsWUFBWSxHQUFBK0YsTUFBQSxDQUFaL0YsWUFBWSxDQUFBO0FBQzVELEVBQUEsSUFBTWdHLFFBQVEsR0FBR0MsUUFBUSxDQUFDaEssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLEVBQUEsT0FDRzRELE9BQU8sSUFBSXdGLHlCQUF5QixDQUFDVyxRQUFRLEVBQUVuRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQzNERyxZQUFZLElBQ1hBLFlBQVksQ0FBQ2lFLEtBQUssQ0FDaEIsVUFBQzFELFdBQVcsRUFBQTtBQUFBLElBQUEsT0FBSzhFLHlCQUF5QixDQUFDVyxRQUFRLEVBQUV6RixXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7R0FDdkUsQ0FBRSxJQUNKLEtBQUssQ0FBQTtBQUVULENBQUE7QUFFTyxTQUFTMkYsa0JBQWtCQSxDQUNoQ2pLLEdBQUcsRUFFSDtBQUFBLEVBQUEsSUFBQWtLLE1BQUEsR0FBQXhHLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUR5RCxFQUFFO0lBQXpERSxPQUFPLEdBQUFzRyxNQUFBLENBQVB0RyxPQUFPO0lBQUF1RyxxQkFBQSxHQUFBRCxNQUFBLENBQUVWLGNBQWM7QUFBZEEsSUFBQUEsY0FBYyxHQUFBVyxxQkFBQSxLQUFHOU8sS0FBQUEsQ0FBQUEsR0FBQUEsd0JBQXdCLEdBQUE4TyxxQkFBQSxDQUFBO0FBRXBELEVBQUEsSUFBTUosUUFBUSxHQUFHQyxRQUFRLENBQUNoSyxHQUFHLEVBQUV3SixjQUFjLENBQUMsQ0FBQTtBQUM5QyxFQUFBLElBQUFZLGdCQUFBLEdBQXdCVixjQUFjLENBQUNLLFFBQVEsRUFBRVAsY0FBYyxDQUFDO0lBQXhEYSxXQUFXLEdBQUFELGdCQUFBLENBQVhDLFdBQVcsQ0FBQTtBQUNuQixFQUFBLElBQU1DLFdBQVcsR0FBRzFHLE9BQU8sSUFBSXFCLE9BQU8sQ0FBQ3JCLE9BQU8sQ0FBQyxDQUFBO0FBQy9DLEVBQUEsT0FBUTBHLFdBQVcsSUFBSUEsV0FBVyxHQUFHRCxXQUFXLElBQUssS0FBSyxDQUFBO0FBQzVELENBQUE7QUFFTyxTQUFTRSxtQkFBbUJBLENBQUFDLE1BQUEsRUFBNEI7QUFBQSxFQUFBLElBQXpCck8sT0FBTyxHQUFBcU8sTUFBQSxDQUFQck8sT0FBTztJQUFFNEgsWUFBWSxHQUFBeUcsTUFBQSxDQUFaekcsWUFBWSxDQUFBO0VBQ3pELElBQUlBLFlBQVksSUFBSTVILE9BQU8sRUFBRTtBQUMzQixJQUFBLElBQUlzTyxRQUFRLEdBQUcxRyxZQUFZLENBQUMyRyxNQUFNLENBQ2hDLFVBQUNwRyxXQUFXLEVBQUE7QUFBQSxNQUFBLE9BQUtnQyx3QkFBd0IsQ0FBQ2hDLFdBQVcsRUFBRW5JLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUFBLEtBQ3RFLENBQUMsQ0FBQTtJQUNELE9BQU9zTCxHQUFHLENBQUNnRCxRQUFRLENBQUMsQ0FBQTtHQUNyQixNQUFNLElBQUkxRyxZQUFZLEVBQUU7SUFDdkIsT0FBTzBELEdBQUcsQ0FBQzFELFlBQVksQ0FBQyxDQUFBO0FBQzFCLEdBQUMsTUFBTTtBQUNMLElBQUEsT0FBTzVILE9BQU8sQ0FBQTtBQUNoQixHQUFBO0FBQ0YsQ0FBQTtBQUVPLFNBQVN3TyxtQkFBbUJBLENBQUFDLE1BQUEsRUFBNEI7QUFBQSxFQUFBLElBQXpCaEgsT0FBTyxHQUFBZ0gsTUFBQSxDQUFQaEgsT0FBTztJQUFFRyxZQUFZLEdBQUE2RyxNQUFBLENBQVo3RyxZQUFZLENBQUE7RUFDekQsSUFBSUEsWUFBWSxJQUFJSCxPQUFPLEVBQUU7QUFDM0IsSUFBQSxJQUFJaUgsUUFBUSxHQUFHOUcsWUFBWSxDQUFDMkcsTUFBTSxDQUNoQyxVQUFDcEcsV0FBVyxFQUFBO0FBQUEsTUFBQSxPQUFLZ0Msd0JBQXdCLENBQUNoQyxXQUFXLEVBQUVWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUFBLEtBQ3RFLENBQUMsQ0FBQTtJQUNELE9BQU84RCxHQUFHLENBQUNtRCxRQUFRLENBQUMsQ0FBQTtHQUNyQixNQUFNLElBQUk5RyxZQUFZLEVBQUU7SUFDdkIsT0FBTzJELEdBQUcsQ0FBQzNELFlBQVksQ0FBQyxDQUFBO0FBQzFCLEdBQUMsTUFBTTtBQUNMLElBQUEsT0FBT0gsT0FBTyxDQUFBO0FBQ2hCLEdBQUE7QUFDRixDQUFBO0FBRU8sU0FBU2tILG9CQUFvQkEsR0FHbEM7QUFBQSxFQUFBLElBRkFDLGNBQWMsR0FBQXJILFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEVBQUUsQ0FBQTtBQUFBLEVBQUEsSUFDbkJzSCxnQkFBZ0IsR0FBQXRILFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLG9DQUFvQyxDQUFBO0FBRXZELEVBQUEsSUFBTXVILFdBQVcsR0FBRyxJQUFJQyxHQUFHLEVBQUUsQ0FBQTtBQUM3QixFQUFBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUMsR0FBRyxHQUFHTCxjQUFjLENBQUNyTixNQUFNLEVBQUV5TixDQUFDLEdBQUdDLEdBQUcsRUFBRUQsQ0FBQyxFQUFFLEVBQUU7QUFDekQsSUFBQSxJQUFNRSxHQUFHLEdBQUdOLGNBQWMsQ0FBQ0ksQ0FBQyxDQUFDLENBQUE7QUFDN0IsSUFBQSxJQUFJRyxNQUFNLENBQUNELEdBQUcsQ0FBQyxFQUFFO0FBQ2YsTUFBQSxJQUFNRSxHQUFHLEdBQUd0TyxVQUFVLENBQUNvTyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUE7TUFDekMsSUFBTUcsYUFBYSxHQUFHUCxXQUFXLENBQUNRLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQ2hELE1BQUEsSUFBSSxDQUFDQyxhQUFhLENBQUNFLFFBQVEsQ0FBQ1YsZ0JBQWdCLENBQUMsRUFBRTtBQUM3Q1EsUUFBQUEsYUFBYSxDQUFDRyxJQUFJLENBQUNYLGdCQUFnQixDQUFDLENBQUE7QUFDcENDLFFBQUFBLFdBQVcsQ0FBQ1csR0FBRyxDQUFDTCxHQUFHLEVBQUVDLGFBQWEsQ0FBQyxDQUFBO0FBQ3JDLE9BQUE7QUFDRixLQUFDLE1BQU0sSUFBSUssT0FBQSxDQUFPUixHQUFHLENBQUEsS0FBSyxRQUFRLEVBQUU7QUFDbEMsTUFBQSxJQUFNUyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0QsSUFBSSxDQUFDVCxHQUFHLENBQUMsQ0FBQTtBQUM3QixNQUFBLElBQU1XLFNBQVMsR0FBR0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQ3pCLElBQU1HLFVBQVUsR0FBR1osR0FBRyxDQUFDUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUMvQixJQUFJLE9BQU9FLFNBQVMsS0FBSyxRQUFRLElBQUlDLFVBQVUsQ0FBQ0MsV0FBVyxLQUFLelAsS0FBSyxFQUFFO0FBQ3JFLFFBQUEsS0FBSyxJQUFJMFAsQ0FBQyxHQUFHLENBQUMsRUFBRWYsSUFBRyxHQUFHYSxVQUFVLENBQUN2TyxNQUFNLEVBQUV5TyxDQUFDLEdBQUdmLElBQUcsRUFBRWUsQ0FBQyxFQUFFLEVBQUU7VUFDckQsSUFBTVosSUFBRyxHQUFHdE8sVUFBVSxDQUFDZ1AsVUFBVSxDQUFDRSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQTtVQUNuRCxJQUFNWCxjQUFhLEdBQUdQLFdBQVcsQ0FBQ1EsR0FBRyxDQUFDRixJQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7QUFDaEQsVUFBQSxJQUFJLENBQUNDLGNBQWEsQ0FBQ0UsUUFBUSxDQUFDTSxTQUFTLENBQUMsRUFBRTtBQUN0Q1IsWUFBQUEsY0FBYSxDQUFDRyxJQUFJLENBQUNLLFNBQVMsQ0FBQyxDQUFBO0FBQzdCZixZQUFBQSxXQUFXLENBQUNXLEdBQUcsQ0FBQ0wsSUFBRyxFQUFFQyxjQUFhLENBQUMsQ0FBQTtBQUNyQyxXQUFBO0FBQ0YsU0FBQTtBQUNGLE9BQUE7QUFDRixLQUFBO0FBQ0YsR0FBQTtBQUNBLEVBQUEsT0FBT1AsV0FBVyxDQUFBO0FBQ3BCLENBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU21CLGNBQWNBLENBQUNDLE1BQU0sRUFBRUMsTUFBTSxFQUFFO0FBQzdDLEVBQUEsSUFBSUQsTUFBTSxDQUFDM08sTUFBTSxLQUFLNE8sTUFBTSxDQUFDNU8sTUFBTSxFQUFFO0FBQ25DLElBQUEsT0FBTyxLQUFLLENBQUE7QUFDZCxHQUFBO0FBRUEsRUFBQSxPQUFPMk8sTUFBTSxDQUFDckUsS0FBSyxDQUFDLFVBQUN4TSxLQUFLLEVBQUUrUSxLQUFLLEVBQUE7QUFBQSxJQUFBLE9BQUsvUSxLQUFLLEtBQUs4USxNQUFNLENBQUNDLEtBQUssQ0FBQyxDQUFBO0dBQUMsQ0FBQSxDQUFBO0FBQ2hFLENBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU0MsY0FBY0EsR0FHNUI7QUFBQSxFQUFBLElBRkFDLFlBQVksR0FBQS9JLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEVBQUUsQ0FBQTtBQUFBLEVBQUEsSUFDakJzSCxnQkFBZ0IsR0FBQXRILFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLGlDQUFpQyxDQUFBO0FBRXBELEVBQUEsSUFBTXVILFdBQVcsR0FBRyxJQUFJQyxHQUFHLEVBQUUsQ0FBQTtBQUM3QnVCLEVBQUFBLFlBQVksQ0FBQzlQLE9BQU8sQ0FBQyxVQUFDK1AsT0FBTyxFQUFLO0FBQ2hDLElBQUEsSUFBY0MsT0FBTyxHQUFrQkQsT0FBTyxDQUF0QzlPLElBQUk7TUFBV2dQLFdBQVcsR0FBS0YsT0FBTyxDQUF2QkUsV0FBVyxDQUFBO0FBQ2xDLElBQUEsSUFBSSxDQUFDdEIsTUFBTSxDQUFDcUIsT0FBTyxDQUFDLEVBQUU7QUFDcEIsTUFBQSxPQUFBO0FBQ0YsS0FBQTtBQUVBLElBQUEsSUFBTXBCLEdBQUcsR0FBR3RPLFVBQVUsQ0FBQzBQLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUM3QyxJQUFNRSxhQUFhLEdBQUc1QixXQUFXLENBQUNRLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2hELElBQ0UsV0FBVyxJQUFJc0IsYUFBYSxJQUM1QkEsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLN0IsZ0JBQWdCLElBQy9Db0IsY0FBYyxDQUFDUyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQ0QsV0FBVyxDQUFDLENBQUMsRUFDNUQ7QUFDQSxNQUFBLE9BQUE7QUFDRixLQUFBO0FBRUFDLElBQUFBLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRzdCLGdCQUFnQixDQUFBO0FBQzdDLElBQUEsSUFBTThCLGNBQWMsR0FBR0QsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQ3BEQSxJQUFBQSxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUdDLGNBQWMsTUFBQTFPLE1BQUEsQ0FBQTJPLGtCQUFBLENBQ3RDRCxjQUFjLENBQUVGLEVBQUFBLENBQUFBLFdBQVcsQ0FDL0IsQ0FBQSxHQUFBLENBQUNBLFdBQVcsQ0FBQyxDQUFBO0FBQ2pCM0IsSUFBQUEsV0FBVyxDQUFDVyxHQUFHLENBQUNMLEdBQUcsRUFBRXNCLGFBQWEsQ0FBQyxDQUFBO0FBQ3JDLEdBQUMsQ0FBQyxDQUFBO0FBQ0YsRUFBQSxPQUFPNUIsV0FBVyxDQUFBO0FBQ3BCLENBQUE7QUFFTyxTQUFTK0Isa0JBQWtCQSxDQUNoQzlNLFVBQVUsRUFDVitNLFdBQVcsRUFDWEMsaUJBQWlCLEVBQ2pCQyxTQUFTLEVBQ1RDLGFBQWEsRUFDYjtBQUNBLEVBQUEsSUFBTUMsQ0FBQyxHQUFHRCxhQUFhLENBQUMxUCxNQUFNLENBQUE7RUFDOUIsSUFBTStJLEtBQUssR0FBRyxFQUFFLENBQUE7RUFDaEIsS0FBSyxJQUFJMEUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0MsQ0FBQyxFQUFFbEMsQ0FBQyxFQUFFLEVBQUU7SUFDMUIsSUFBSW1DLFlBQVksR0FBR3BOLFVBQVUsQ0FBQTtBQUM3Qm9OLElBQUFBLFlBQVksR0FBR0MsUUFBUSxDQUFDRCxZQUFZLEVBQUUzRyxRQUFRLENBQUN5RyxhQUFhLENBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakVtQyxJQUFBQSxZQUFZLEdBQUdFLFVBQVUsQ0FBQ0YsWUFBWSxFQUFFMUcsVUFBVSxDQUFDd0csYUFBYSxDQUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JFbUMsSUFBQUEsWUFBWSxHQUFHRyxVQUFVLENBQUNILFlBQVksRUFBRUksVUFBVSxDQUFDTixhQUFhLENBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFFckUsSUFBQSxJQUFNd0MsUUFBUSxHQUFHSCxVQUFVLENBQ3pCdE4sVUFBVSxFQUNWLENBQUNnTixpQkFBaUIsR0FBRyxDQUFDLElBQUlDLFNBQzVCLENBQUMsQ0FBQTtBQUVELElBQUEsSUFDRVMsT0FBTyxDQUFDTixZQUFZLEVBQUVMLFdBQVcsQ0FBQyxJQUNsQ25QLFFBQVEsQ0FBQ3dQLFlBQVksRUFBRUssUUFBUSxDQUFDLEVBQ2hDO0FBQ0FsSCxNQUFBQSxLQUFLLENBQUNrRixJQUFJLENBQUN5QixhQUFhLENBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzlCLEtBQUE7QUFDRixHQUFBO0FBRUEsRUFBQSxPQUFPMUUsS0FBSyxDQUFBO0FBQ2QsQ0FBQTtBQUVPLFNBQVNvSCxPQUFPQSxDQUFDMUMsQ0FBQyxFQUFFO0VBQ3pCLE9BQU9BLENBQUMsR0FBRyxFQUFFLEdBQUEvTSxHQUFBQSxDQUFBQSxNQUFBLENBQU8rTSxDQUFDLENBQUEvTSxHQUFBQSxFQUFBQSxDQUFBQSxNQUFBLENBQVErTSxDQUFDLENBQUUsQ0FBQTtBQUNsQyxDQUFBO0FBRU8sU0FBU3pCLGNBQWNBLENBQzVCOUwsSUFBSSxFQUVKO0FBQUEsRUFBQSxJQURBNEwsY0FBYyxHQUFBOUYsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUdySSx3QkFBd0IsQ0FBQTtBQUV6QyxFQUFBLElBQU1zTyxTQUFTLEdBQUdtRSxJQUFJLENBQUNDLElBQUksQ0FBQzlJLE9BQU8sQ0FBQ3JILElBQUksQ0FBQyxHQUFHNEwsY0FBYyxDQUFDLEdBQUdBLGNBQWMsQ0FBQTtBQUM1RSxFQUFBLElBQU1hLFdBQVcsR0FBR1YsU0FBUyxJQUFJSCxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUE7RUFDcEQsT0FBTztBQUFFYSxJQUFBQSxXQUFXLEVBQVhBLFdBQVc7QUFBRVYsSUFBQUEsU0FBUyxFQUFUQSxTQUFBQTtHQUFXLENBQUE7QUFDbkMsQ0FBQTtBQUVPLFNBQVNxRSxhQUFhQSxDQUFDdlMsQ0FBQyxFQUFFO0VBQy9CLElBQU15RSxVQUFVLEdBQUcsSUFBSXJFLElBQUksQ0FBQ0osQ0FBQyxDQUFDd1MsV0FBVyxFQUFFLEVBQUV4UyxDQUFDLENBQUMwSixRQUFRLEVBQUUsRUFBRTFKLENBQUMsQ0FBQ3lTLE9BQU8sRUFBRSxDQUFDLENBQUE7RUFDdkUsSUFBTUMsaUJBQWlCLEdBQUcsSUFBSXRTLElBQUksQ0FDaENKLENBQUMsQ0FBQ3dTLFdBQVcsRUFBRSxFQUNmeFMsQ0FBQyxDQUFDMEosUUFBUSxFQUFFLEVBQ1oxSixDQUFDLENBQUN5UyxPQUFPLEVBQUUsRUFDWCxFQUNGLENBQUMsQ0FBQTtBQUVELEVBQUEsT0FBT0osSUFBSSxDQUFDTSxLQUFLLENBQUMsQ0FBQyxDQUFDRCxpQkFBaUIsR0FBRyxDQUFDak8sVUFBVSxJQUFJLE9BQVMsQ0FBQyxDQUFBO0FBQ25FLENBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU21PLGFBQWFBLENBQUM1UyxDQUFDLEVBQUU7QUFDL0IsRUFBQSxJQUFNNlMsT0FBTyxHQUFHN1MsQ0FBQyxDQUFDaVMsVUFBVSxFQUFFLENBQUE7QUFDOUIsRUFBQSxJQUFNYSxZQUFZLEdBQUc5UyxDQUFDLENBQUMrUyxlQUFlLEVBQUUsQ0FBQTtBQUV4QyxFQUFBLE9BQU81UyxNQUFNLENBQUNILENBQUMsQ0FBQ2dULE9BQU8sRUFBRSxHQUFHSCxPQUFPLEdBQUcsSUFBSSxHQUFHQyxZQUFZLENBQUMsQ0FBQTtBQUM1RCxDQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNHLFlBQVlBLENBQUNDLEVBQUUsRUFBRUMsRUFBRSxFQUFFO0FBQ25DLEVBQUEsT0FBT1AsYUFBYSxDQUFDTSxFQUFFLENBQUMsQ0FBQ0YsT0FBTyxFQUFFLEtBQUtKLGFBQWEsQ0FBQ08sRUFBRSxDQUFDLENBQUNILE9BQU8sRUFBRSxDQUFBO0FBQ3BFLENBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTSSxlQUFlQSxDQUFDalIsSUFBSSxFQUFFO0FBQ3BDLEVBQUEsSUFBSSxDQUFDME4sTUFBTSxDQUFDMU4sSUFBSSxDQUFDLEVBQUU7QUFDakIsSUFBQSxNQUFNLElBQUkwSixLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDakMsR0FBQTtBQUVBLEVBQUEsSUFBTXdILGVBQWUsR0FBRyxJQUFJalQsSUFBSSxDQUFDK0IsSUFBSSxDQUFDLENBQUE7RUFDdENrUixlQUFlLENBQUNwUCxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDcEMsRUFBQSxPQUFPb1AsZUFBZSxDQUFBO0FBQ3hCLENBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNDLFlBQVlBLENBQUNuUixJQUFJLEVBQUVvUixhQUFhLEVBQUU7RUFDaEQsSUFBSSxDQUFDMUQsTUFBTSxDQUFDMU4sSUFBSSxDQUFDLElBQUksQ0FBQzBOLE1BQU0sQ0FBQzBELGFBQWEsQ0FBQyxFQUFFO0FBQzNDLElBQUEsTUFBTSxJQUFJMUgsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUE7QUFDMUMsR0FBQTtBQUVBLEVBQUEsSUFBTTJILFlBQVksR0FBR0osZUFBZSxDQUFDalIsSUFBSSxDQUFDLENBQUE7QUFDMUMsRUFBQSxJQUFNc1IscUJBQXFCLEdBQUdMLGVBQWUsQ0FBQ0csYUFBYSxDQUFDLENBQUE7QUFFNUQsRUFBQSxPQUFPbFIsUUFBUSxDQUFDbVIsWUFBWSxFQUFFQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3RELENBQUE7QUFFTyxTQUFTQyxjQUFjQSxDQUFDQyxLQUFLLEVBQUU7RUFDcEMsSUFBTUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtBQUNyQixFQUFBLE9BQU9ELEtBQUssQ0FBQzdELEdBQUcsS0FBSzhELFNBQVMsQ0FBQTtBQUNoQzs7QUNoOUJBLFNBQVNDLGFBQWFBLENBQUM1SixJQUFJLEVBQUU2SixRQUFRLEVBQUVwVCxPQUFPLEVBQUV5SCxPQUFPLEVBQUU7RUFDdkQsSUFBTTRMLElBQUksR0FBRyxFQUFFLENBQUE7QUFDZixFQUFBLEtBQUssSUFBSXJFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxDQUFDLEdBQUdvRSxRQUFRLEdBQUcsQ0FBQyxFQUFFcEUsQ0FBQyxFQUFFLEVBQUU7QUFDekMsSUFBQSxJQUFNc0UsT0FBTyxHQUFHL0osSUFBSSxHQUFHNkosUUFBUSxHQUFHcEUsQ0FBQyxDQUFBO0lBQ25DLElBQUl1RSxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBRXBCLElBQUEsSUFBSXZULE9BQU8sRUFBRTtBQUNYdVQsTUFBQUEsU0FBUyxHQUFHekssT0FBTyxDQUFDOUksT0FBTyxDQUFDLElBQUlzVCxPQUFPLENBQUE7QUFDekMsS0FBQTtJQUVBLElBQUk3TCxPQUFPLElBQUk4TCxTQUFTLEVBQUU7QUFDeEJBLE1BQUFBLFNBQVMsR0FBR3pLLE9BQU8sQ0FBQ3JCLE9BQU8sQ0FBQyxJQUFJNkwsT0FBTyxDQUFBO0FBQ3pDLEtBQUE7QUFFQSxJQUFBLElBQUlDLFNBQVMsRUFBRTtBQUNiRixNQUFBQSxJQUFJLENBQUM3RCxJQUFJLENBQUM4RCxPQUFPLENBQUMsQ0FBQTtBQUNwQixLQUFBO0FBQ0YsR0FBQTtBQUVBLEVBQUEsT0FBT0QsSUFBSSxDQUFBO0FBQ2IsQ0FBQTtBQUFDLElBRW9CRyxtQkFBbUIsMEJBQUFDLGdCQUFBLEVBQUE7RUFXdEMsU0FBQUQsbUJBQUFBLENBQVlqUixLQUFLLEVBQUU7QUFBQSxJQUFBLElBQUFtUixLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBSCxtQkFBQSxDQUFBLENBQUE7QUFDakJFLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBSixJQUFBQSxFQUFBQSxtQkFBQSxHQUFNalIsS0FBSyxDQUFBLENBQUEsQ0FBQTtJQUFFc1IsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQW1DQyxZQUFNO0FBQ3BCLE1BQUEsSUFBTUksWUFBWSxHQUFHSixLQUFBLENBQUtuUixLQUFLLENBQUNnSCxJQUFJLENBQUE7TUFDcEMsSUFBTXdLLE9BQU8sR0FBR0wsS0FBQSxDQUFLTSxLQUFLLENBQUNDLFNBQVMsQ0FBQ2pULEdBQUcsQ0FBQyxVQUFDdUksSUFBSSxFQUFBO1FBQUEsb0JBQzVDMkssS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxVQUFBQSxTQUFTLEVBQ1BpRSxZQUFZLEtBQUt2SyxJQUFJLEdBQ2pCLDRFQUE0RSxHQUM1RSwrQkFDTDtBQUNENkYsVUFBQUEsR0FBRyxFQUFFN0YsSUFBSztVQUNWNkssT0FBTyxFQUFFVixLQUFBLENBQUtXLFFBQVEsQ0FBQ0MsSUFBSSxDQUFBWixLQUFBLEVBQU9uSyxJQUFJLENBQUU7QUFDeEMsVUFBQSxlQUFBLEVBQWV1SyxZQUFZLEtBQUt2SyxJQUFJLEdBQUcsTUFBTSxHQUFHL0IsU0FBQUE7QUFBVSxTQUFBLEVBRXpEc00sWUFBWSxLQUFLdkssSUFBSSxnQkFDcEIySyxLQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7QUFBTXRFLFVBQUFBLFNBQVMsRUFBQyx5Q0FBQTtBQUF5QyxTQUFBLEVBQUMsUUFBTyxDQUFDLEdBRWxFLEVBQ0QsRUFDQXRHLElBQ0UsQ0FBQyxDQUFBO0FBQUEsT0FDUCxDQUFDLENBQUE7QUFFRixNQUFBLElBQU1nTCxPQUFPLEdBQUdiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQU8sR0FBRzhJLE9BQU8sQ0FBQzRLLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtBQUN2RSxNQUFBLElBQU13VSxPQUFPLEdBQUdkLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2tGLE9BQU8sR0FBR3FCLE9BQU8sQ0FBQzRLLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2tGLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtBQUV2RSxNQUFBLElBQUksQ0FBQytNLE9BQU8sSUFBSSxDQUFDZCxLQUFBLENBQUtNLEtBQUssQ0FBQ0MsU0FBUyxDQUFDUSxJQUFJLENBQUMsVUFBQ2xMLElBQUksRUFBQTtRQUFBLE9BQUtBLElBQUksS0FBS2lMLE9BQU8sQ0FBQTtBQUFBLE9BQUEsQ0FBQyxFQUFFO0FBQ3RFVCxRQUFBQSxPQUFPLENBQUNXLE9BQU8sZUFDYlIsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxVQUFBQSxTQUFTLEVBQUMsK0JBQStCO0FBQ3pDVCxVQUFBQSxHQUFHLEVBQUUsVUFBVztVQUNoQmdGLE9BQU8sRUFBRVYsS0FBQSxDQUFLaUIsY0FBQUE7U0FFZFQsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsR0FBQSxFQUFBO0FBQUd0RSxVQUFBQSxTQUFTLEVBQUMsK0dBQUE7U0FBaUgsQ0FDM0gsQ0FDUCxDQUFDLENBQUE7QUFDSCxPQUFBO0FBRUEsTUFBQSxJQUFJLENBQUMwRSxPQUFPLElBQUksQ0FBQ2IsS0FBQSxDQUFLTSxLQUFLLENBQUNDLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDLFVBQUNsTCxJQUFJLEVBQUE7UUFBQSxPQUFLQSxJQUFJLEtBQUtnTCxPQUFPLENBQUE7QUFBQSxPQUFBLENBQUMsRUFBRTtBQUN0RVIsUUFBQUEsT0FBTyxDQUFDdkUsSUFBSSxlQUNWMEUsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxVQUFBQSxTQUFTLEVBQUMsK0JBQStCO0FBQ3pDVCxVQUFBQSxHQUFHLEVBQUUsVUFBVztVQUNoQmdGLE9BQU8sRUFBRVYsS0FBQSxDQUFLa0IsY0FBQUE7U0FFZFYsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsR0FBQSxFQUFBO0FBQUd0RSxVQUFBQSxTQUFTLEVBQUMsK0dBQUE7U0FBaUgsQ0FDM0gsQ0FDUCxDQUFDLENBQUE7QUFDSCxPQUFBO0FBRUEsTUFBQSxPQUFPa0UsT0FBTyxDQUFBO0tBQ2YsQ0FBQSxDQUFBO0FBQUFGLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDbkssSUFBSSxFQUFLO0FBQ25CbUssTUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDOFIsUUFBUSxDQUFDOUssSUFBSSxDQUFDLENBQUE7S0FDMUIsQ0FBQSxDQUFBO0lBQUFzSyxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUFNO0FBQ3pCQSxNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNzUyxRQUFRLEVBQUUsQ0FBQTtLQUN0QixDQUFBLENBQUE7QUFBQWhCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVZLFlBQUEsRUFBQSxVQUFDb0IsTUFBTSxFQUFLO0FBQ3ZCLE1BQUEsSUFBTUMsS0FBSyxHQUFHckIsS0FBQSxDQUFLTSxLQUFLLENBQUNDLFNBQVMsQ0FBQ2pULEdBQUcsQ0FBQyxVQUFVdUksSUFBSSxFQUFFO1FBQ3JELE9BQU9BLElBQUksR0FBR3VMLE1BQU0sQ0FBQTtBQUN0QixPQUFDLENBQUMsQ0FBQTtNQUVGcEIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQ1pmLFFBQUFBLFNBQVMsRUFBRWMsS0FBQUE7QUFDYixPQUFDLENBQUMsQ0FBQTtLQUNILENBQUEsQ0FBQTtJQUFBbEIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtBQUNyQixNQUFBLE9BQU9BLEtBQUEsQ0FBS3VCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMxQixDQUFBLENBQUE7SUFBQXBCLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFlBQU07QUFDckIsTUFBQSxPQUFPQSxLQUFBLENBQUt1QixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMzQixDQUFBLENBQUE7QUE5R0MsSUFBQSxJQUFRQyxzQkFBc0IsR0FBNkIzUyxLQUFLLENBQXhEMlMsc0JBQXNCO01BQUVDLHNCQUFzQixHQUFLNVMsS0FBSyxDQUFoQzRTLHNCQUFzQixDQUFBO0lBQ3RELElBQU0vQixRQUFRLEdBQ1o4QixzQkFBc0IsS0FBS0Msc0JBQXNCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBRTdEekIsS0FBQSxDQUFLTSxLQUFLLEdBQUc7TUFDWEMsU0FBUyxFQUFFZCxhQUFhLENBQ3RCTyxLQUFBLENBQUtuUixLQUFLLENBQUNnSCxJQUFJLEVBQ2Y2SixRQUFRLEVBQ1JNLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQU8sRUFDbEIwVCxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUNiLENBQUE7S0FDRCxDQUFBO0FBQ0RpTSxJQUFBQSxLQUFBLENBQUswQixXQUFXLGdCQUFHQyxTQUFTLEVBQUUsQ0FBQTtBQUFDLElBQUEsT0FBQTNCLEtBQUEsQ0FBQTtBQUNqQyxHQUFBO0VBQUM0QixTQUFBLENBQUE5QixtQkFBQSxFQUFBQyxnQkFBQSxDQUFBLENBQUE7RUFBQSxPQUFBOEIsWUFBQSxDQUFBL0IsbUJBQUEsRUFBQSxDQUFBO0lBQUFwRSxHQUFBLEVBQUEsbUJBQUE7SUFBQS9QLEtBQUEsRUFFRCxTQUFBbVcsaUJBQUFBLEdBQW9CO0FBQ2xCLE1BQUEsSUFBTUMsZUFBZSxHQUFHLElBQUksQ0FBQ0wsV0FBVyxDQUFDTSxPQUFPLENBQUE7QUFFaEQsTUFBQSxJQUFJRCxlQUFlLEVBQUU7QUFDbkI7QUFDQSxRQUFBLElBQU1FLHVCQUF1QixHQUFHRixlQUFlLENBQUNHLFFBQVEsR0FDcER0VixLQUFLLENBQUN1VixJQUFJLENBQUNKLGVBQWUsQ0FBQ0csUUFBUSxDQUFDLEdBQ3BDLElBQUksQ0FBQTtRQUNSLElBQU1FLG9CQUFvQixHQUFHSCx1QkFBdUIsR0FDaERBLHVCQUF1QixDQUFDbEIsSUFBSSxDQUFDLFVBQUNzQixPQUFPLEVBQUE7VUFBQSxPQUFLQSxPQUFPLENBQUNDLFlBQVksQ0FBQTtBQUFBLFNBQUEsQ0FBQyxHQUMvRCxJQUFJLENBQUE7QUFFUlAsUUFBQUEsZUFBZSxDQUFDUSxTQUFTLEdBQUdILG9CQUFvQixHQUM1Q0Esb0JBQW9CLENBQUNJLFNBQVMsR0FDOUIsQ0FBQ0osb0JBQW9CLENBQUNLLFlBQVksR0FBR1YsZUFBZSxDQUFDVSxZQUFZLElBQUksQ0FBQyxHQUN0RSxDQUFDVixlQUFlLENBQUNXLFlBQVksR0FBR1gsZUFBZSxDQUFDVSxZQUFZLElBQUksQ0FBQyxDQUFBO0FBQ3ZFLE9BQUE7QUFDRixLQUFBO0FBQUMsR0FBQSxFQUFBO0lBQUEvRyxHQUFBLEVBQUEsUUFBQTtJQUFBL1AsS0FBQSxFQWdGRCxTQUFBZ1gsTUFBQUEsR0FBUztNQUNQLElBQUlDLGFBQWEsR0FBR0MsSUFBSSxDQUFDO0FBQ3ZCLFFBQUEsaUNBQWlDLEVBQUUsSUFBSTtBQUN2QyxRQUFBLDZDQUE2QyxFQUMzQyxJQUFJLENBQUNoVSxLQUFLLENBQUM0UyxzQkFBQUE7QUFDZixPQUFDLENBQUMsQ0FBQTtNQUVGLG9CQUNFakIsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUt0RSxRQUFBQSxTQUFTLEVBQUV5RyxhQUFjO1FBQUNFLEdBQUcsRUFBRSxJQUFJLENBQUNwQixXQUFBQTtBQUFZLE9BQUEsRUFDbEQsSUFBSSxDQUFDcUIsYUFBYSxFQUNoQixDQUFDLENBQUE7QUFFVixLQUFBO0FBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLENBekk4Q3ZDLENBQUFBLEtBQUssQ0FBQ3dDLFNBQVMsQ0FBQTs7QUNyQmhFLElBQU1DLDBCQUEwQixHQUFHQyxjQUFjLENBQUNwRCxtQkFBbUIsQ0FBQyxDQUFBO0FBQUMsSUFFbERxRCxZQUFZLDBCQUFBcEQsZ0JBQUEsRUFBQTtBQUFBLEVBQUEsU0FBQW9ELFlBQUEsR0FBQTtBQUFBLElBQUEsSUFBQW5ELEtBQUEsQ0FBQTtBQUFBQyxJQUFBQSxlQUFBLE9BQUFrRCxZQUFBLENBQUEsQ0FBQTtBQUFBLElBQUEsS0FBQSxJQUFBQyxJQUFBLEdBQUF2UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF3VixJQUFBLEdBQUF6VyxJQUFBQSxLQUFBLENBQUF3VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtBQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXpQLEdBQUFBLFNBQUEsQ0FBQXlQLElBQUEsQ0FBQSxDQUFBO0FBQUEsS0FBQTtBQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBaUQsWUFBQSxFQUFBNVUsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBOFUsSUFBQSxDQUFBLENBQUEsQ0FBQTtJQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBZXZCLE9BQUEsRUFBQTtBQUNOdUQsTUFBQUEsZUFBZSxFQUFFLEtBQUE7S0FDbEIsQ0FBQSxDQUFBO0lBQUFwRCxlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUVxQixZQUFNO0FBQzFCLE1BQUEsSUFBTWEsT0FBTyxHQUFHYixLQUFBLENBQUtuUixLQUFLLENBQUN2QyxPQUFPLEdBQUc4SSxPQUFPLENBQUM0SyxLQUFBLENBQUtuUixLQUFLLENBQUN2QyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUE7QUFDdkUsTUFBQSxJQUFNd1UsT0FBTyxHQUFHZCxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFPLEdBQUdxQixPQUFPLENBQUM0SyxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUE7TUFFdkUsSUFBTXNNLE9BQU8sR0FBRyxFQUFFLENBQUE7TUFDbEIsS0FBSyxJQUFJL0UsQ0FBQyxHQUFHdUYsT0FBTyxFQUFFdkYsQ0FBQyxJQUFJd0YsT0FBTyxFQUFFeEYsQ0FBQyxFQUFFLEVBQUU7QUFDdkMrRSxRQUFBQSxPQUFPLENBQUN2RSxJQUFJLGVBQ1YwRSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFBUS9FLFVBQUFBLEdBQUcsRUFBRUosQ0FBRTtBQUFDM1AsVUFBQUEsS0FBSyxFQUFFMlAsQ0FBQUE7U0FDcEJBLEVBQUFBLENBQ0ssQ0FDVixDQUFDLENBQUE7QUFDSCxPQUFBO0FBQ0EsTUFBQSxPQUFPK0UsT0FBTyxDQUFBO0tBQ2YsQ0FBQSxDQUFBO0FBQUFGLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUN3RCxDQUFDLEVBQUs7TUFDdEJ4RCxLQUFBLENBQUtXLFFBQVEsQ0FBQzZDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDOVgsS0FBSyxDQUFDLENBQUE7S0FDOUIsQ0FBQSxDQUFBO0lBQUF3VSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxZQUFBO01BQUEsb0JBQ2pCUSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFDRTlVLFFBQUFBLEtBQUssRUFBRXFVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dILElBQUs7QUFDdkJzRyxRQUFBQSxTQUFTLEVBQUMsK0JBQStCO1FBQ3pDd0UsUUFBUSxFQUFFWCxLQUFBLENBQUswRCxjQUFBQTtBQUFlLE9BQUEsRUFFN0IxRCxLQUFBLENBQUsyRCxtQkFBbUIsRUFDbkIsQ0FBQyxDQUFBO0tBQ1YsQ0FBQSxDQUFBO0FBQUF4RCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxVQUFDNEQsT0FBTyxFQUFBO01BQUEsb0JBQ3ZCcEQsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0UvRSxRQUFBQSxHQUFHLEVBQUMsTUFBTTtBQUNWbUksUUFBQUEsS0FBSyxFQUFFO0FBQUVDLFVBQUFBLFVBQVUsRUFBRUYsT0FBTyxHQUFHLFNBQVMsR0FBRyxRQUFBO1NBQVc7QUFDdER6SCxRQUFBQSxTQUFTLEVBQUMsa0NBQWtDO1FBQzVDdUUsT0FBTyxFQUFFLFNBQUFBLE9BQUFBLENBQUNuQixLQUFLLEVBQUE7QUFBQSxVQUFBLE9BQUtTLEtBQUEsQ0FBSytELGNBQWMsQ0FBQ3hFLEtBQUssQ0FBQyxDQUFBO0FBQUEsU0FBQTtPQUU5Q2lCLGVBQUFBLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtBQUFNdEUsUUFBQUEsU0FBUyxFQUFDLDhDQUFBO0FBQThDLE9BQUUsQ0FBQyxlQUNqRXFFLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtBQUFNdEUsUUFBQUEsU0FBUyxFQUFDLGlEQUFBO0FBQWlELE9BQUEsRUFDOUQ2RCxLQUFBLENBQUtuUixLQUFLLENBQUNnSCxJQUNSLENBQ0gsQ0FBQyxDQUFBO0tBQ1AsQ0FBQSxDQUFBO0lBQUFzSyxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxZQUFBO0FBQUEsTUFBQSxvQkFDZlEsS0FBQSxDQUFBQyxhQUFBLENBQUN3QywwQkFBMEIsRUFBQTtBQUN6QnZILFFBQUFBLEdBQUcsRUFBQyxVQUFVO0FBQ2Q3RixRQUFBQSxJQUFJLEVBQUVtSyxLQUFBLENBQUtuUixLQUFLLENBQUNnSCxJQUFLO1FBQ3RCOEssUUFBUSxFQUFFWCxLQUFBLENBQUtXLFFBQVM7UUFDeEJRLFFBQVEsRUFBRW5CLEtBQUEsQ0FBSytELGNBQWU7QUFDOUJ6WCxRQUFBQSxPQUFPLEVBQUUwVCxLQUFBLENBQUtuUixLQUFLLENBQUN2QyxPQUFRO0FBQzVCeUgsUUFBQUEsT0FBTyxFQUFFaU0sS0FBQSxDQUFLblIsS0FBSyxDQUFDa0YsT0FBUTtBQUM1QjBOLFFBQUFBLHNCQUFzQixFQUFFekIsS0FBQSxDQUFLblIsS0FBSyxDQUFDNFMsc0JBQXVCO0FBQzFERCxRQUFBQSxzQkFBc0IsRUFBRXhCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJTLHNCQUFBQTtBQUF1QixPQUMzRCxDQUFDLENBQUE7S0FDSCxDQUFBLENBQUE7SUFBQXJCLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRWtCLFlBQU07QUFDdkIsTUFBQSxJQUFRdUQsZUFBZSxHQUFLdkQsS0FBQSxDQUFLTSxLQUFLLENBQTlCaUQsZUFBZSxDQUFBO01BQ3ZCLElBQUlTLE1BQU0sR0FBRyxDQUFDaEUsS0FBQSxDQUFLaUUsY0FBYyxDQUFDLENBQUNWLGVBQWUsQ0FBQyxDQUFDLENBQUE7QUFDcEQsTUFBQSxJQUFJQSxlQUFlLEVBQUU7UUFDbkJTLE1BQU0sQ0FBQ2hELE9BQU8sQ0FBQ2hCLEtBQUEsQ0FBS2tFLGNBQWMsRUFBRSxDQUFDLENBQUE7QUFDdkMsT0FBQTtBQUNBLE1BQUEsT0FBT0YsTUFBTSxDQUFBO0tBQ2QsQ0FBQSxDQUFBO0FBQUE3RCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVSxVQUFBLEVBQUEsVUFBQ25LLElBQUksRUFBSztNQUNuQm1LLEtBQUEsQ0FBSytELGNBQWMsRUFBRSxDQUFBO0FBQ3JCLE1BQUEsSUFBSWxPLElBQUksS0FBS21LLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dILElBQUksRUFBRSxPQUFBO0FBQzlCbUssTUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDOFIsUUFBUSxDQUFDOUssSUFBSSxDQUFDLENBQUE7S0FDMUIsQ0FBQSxDQUFBO0FBQUFzSyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7TUFDMUJTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWDtBQUNFaUMsUUFBQUEsZUFBZSxFQUFFLENBQUN2RCxLQUFBLENBQUtNLEtBQUssQ0FBQ2lELGVBQUFBO0FBQy9CLE9BQUMsRUFDRCxZQUFNO0FBQ0osUUFBQSxJQUFJdkQsS0FBQSxDQUFLblIsS0FBSyxDQUFDc1Ysa0JBQWtCLEVBQUU7VUFDakNuRSxLQUFBLENBQUtvRSxnQkFBZ0IsQ0FBQ3BFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2QsSUFBSSxFQUFFd1IsS0FBSyxDQUFDLENBQUE7QUFDL0MsU0FBQTtBQUNGLE9BQ0YsQ0FBQyxDQUFBO0tBQ0YsQ0FBQSxDQUFBO0FBQUFZLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRWtCLFVBQUNqUyxJQUFJLEVBQUV3UixLQUFLLEVBQUs7QUFDbENTLE1BQUFBLEtBQUEsQ0FBS3FFLFFBQVEsQ0FBQ3RXLElBQUksRUFBRXdSLEtBQUssQ0FBQyxDQUFBO01BQzFCUyxLQUFBLENBQUtzRSxPQUFPLEVBQUUsQ0FBQTtLQUNmLENBQUEsQ0FBQTtBQUFBbkUsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsVUFBQSxFQUVVLFVBQUNqUyxJQUFJLEVBQUV3UixLQUFLLEVBQUs7QUFDMUIsTUFBQSxJQUFJUyxLQUFBLENBQUtuUixLQUFLLENBQUN3VixRQUFRLEVBQUU7UUFDdkJyRSxLQUFBLENBQUtuUixLQUFLLENBQUN3VixRQUFRLENBQUN0VyxJQUFJLEVBQUV3UixLQUFLLENBQUMsQ0FBQTtBQUNsQyxPQUFBO0tBQ0QsQ0FBQSxDQUFBO0lBQUFZLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFNBQUEsRUFFUyxZQUFNO0FBQ2QsTUFBQSxJQUFJQSxLQUFBLENBQUtuUixLQUFLLENBQUN5VixPQUFPLEVBQUU7QUFDdEJ0RSxRQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUN5VixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDMUIsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBLElBQUEsT0FBQXRFLEtBQUEsQ0FBQTtBQUFBLEdBQUE7RUFBQTRCLFNBQUEsQ0FBQXVCLFlBQUEsRUFBQXBELGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUFzQixZQUFBLEVBQUEsQ0FBQTtJQUFBekgsR0FBQSxFQUFBLFFBQUE7SUFBQS9QLEtBQUEsRUFFRCxTQUFBZ1gsTUFBQUEsR0FBUztBQUNQLE1BQUEsSUFBSTRCLGdCQUFnQixDQUFBO0FBQ3BCLE1BQUEsUUFBUSxJQUFJLENBQUMxVixLQUFLLENBQUMyVixZQUFZO0FBQzdCLFFBQUEsS0FBSyxRQUFRO0FBQ1hELFVBQUFBLGdCQUFnQixHQUFHLElBQUksQ0FBQ0UsZ0JBQWdCLEVBQUUsQ0FBQTtBQUMxQyxVQUFBLE1BQUE7QUFDRixRQUFBLEtBQUssUUFBUTtBQUNYRixVQUFBQSxnQkFBZ0IsR0FBRyxJQUFJLENBQUNHLGdCQUFnQixFQUFFLENBQUE7QUFDMUMsVUFBQSxNQUFBO0FBQ0osT0FBQTtNQUVBLG9CQUNFbEUsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxRQUFBQSxTQUFTLDBGQUFBNU4sTUFBQSxDQUEwRixJQUFJLENBQUNNLEtBQUssQ0FBQzJWLFlBQVksQ0FBQTtBQUFHLE9BQUEsRUFFNUhELGdCQUNFLENBQUMsQ0FBQTtBQUVWLEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0ExSXVDL0QsQ0FBQUEsS0FBSyxDQUFDd0MsU0FBUyxDQUFBOztBQ1B0QixJQUVkMkIsb0JBQW9CLDBCQUFBNUUsZ0JBQUEsRUFBQTtBQUFBLEVBQUEsU0FBQTRFLG9CQUFBLEdBQUE7QUFBQSxJQUFBLElBQUEzRSxLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBMEUsb0JBQUEsQ0FBQSxDQUFBO0FBQUEsSUFBQSxLQUFBLElBQUF2QixJQUFBLEdBQUF2UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF3VixJQUFBLEdBQUF6VyxJQUFBQSxLQUFBLENBQUF3VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtBQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXpQLEdBQUFBLFNBQUEsQ0FBQXlQLElBQUEsQ0FBQSxDQUFBO0FBQUEsS0FBQTtBQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBeUUsb0JBQUEsRUFBQXBXLEVBQUFBLENBQUFBLE1BQUEsQ0FBQThVLElBQUEsQ0FBQSxDQUFBLENBQUE7QUFBQWxELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQVFyQixpQkFBQSxFQUFBLFVBQUMxRSxDQUFDLEVBQUE7QUFBQSxNQUFBLE9BQUswRSxLQUFBLENBQUtuUixLQUFLLENBQUN3RSxLQUFLLEtBQUtpSSxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtJQUFBNkUsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUUvQixZQUFNO01BQ3BCLE9BQU9BLEtBQUEsQ0FBS25SLEtBQUssQ0FBQytWLFVBQVUsQ0FBQ3RYLEdBQUcsQ0FBQyxVQUFDK0YsS0FBSyxFQUFFaUksQ0FBQyxFQUFBO1FBQUEsb0JBQ3hDa0YsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1VBQ0V0RSxTQUFTLEVBQ1A2RCxLQUFBLENBQUs2RSxlQUFlLENBQUN2SixDQUFDLENBQUMsR0FDbkIsK0VBQStFLEdBQy9FLGdDQUNMO0FBQ0RJLFVBQUFBLEdBQUcsRUFBRXJJLEtBQU07VUFDWHFOLE9BQU8sRUFBRVYsS0FBQSxDQUFLVyxRQUFRLENBQUNDLElBQUksQ0FBQVosS0FBQSxFQUFPMUUsQ0FBQyxDQUFFO1VBQ3JDLGVBQWUwRSxFQUFBQSxLQUFBLENBQUs2RSxlQUFlLENBQUN2SixDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUd4SCxTQUFBQTtTQUVqRGtNLEVBQUFBLEtBQUEsQ0FBSzZFLGVBQWUsQ0FBQ3ZKLENBQUMsQ0FBQyxnQkFDdEJrRixLQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7QUFBTXRFLFVBQUFBLFNBQVMsRUFBQywwQ0FBQTtBQUEwQyxTQUFBLEVBQUMsUUFBTyxDQUFDLEdBRW5FLEVBQ0QsRUFDQTlJLEtBQ0UsQ0FBQyxDQUFBO0FBQUEsT0FDUCxDQUFDLENBQUE7S0FDSCxDQUFBLENBQUE7QUFBQThNLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDM00sS0FBSyxFQUFBO0FBQUEsTUFBQSxPQUFLMk0sS0FBQSxDQUFLblIsS0FBSyxDQUFDOFIsUUFBUSxDQUFDdE4sS0FBSyxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtJQUFBOE0sZUFBQSxDQUFBSCxLQUFBLEVBRTNCLG9CQUFBLEVBQUEsWUFBQTtBQUFBLE1BQUEsT0FBTUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDc1MsUUFBUSxFQUFFLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBLElBQUEsT0FBQW5CLEtBQUEsQ0FBQTtBQUFBLEdBQUE7RUFBQTRCLFNBQUEsQ0FBQStDLG9CQUFBLEVBQUE1RSxnQkFBQSxDQUFBLENBQUE7RUFBQSxPQUFBOEIsWUFBQSxDQUFBOEMsb0JBQUEsRUFBQSxDQUFBO0lBQUFqSixHQUFBLEVBQUEsUUFBQTtJQUFBL1AsS0FBQSxFQUVoRCxTQUFBZ1gsTUFBQUEsR0FBUztNQUNQLG9CQUNFbkMsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUt0RSxRQUFBQSxTQUFTLEVBQUMsa0NBQUE7QUFBa0MsT0FBQSxFQUM5QyxJQUFJLENBQUM0RyxhQUFhLEVBQ2hCLENBQUMsQ0FBQTtBQUVWLEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0ExQytDdkMsQ0FBQUEsS0FBSyxDQUFDd0MsU0FBUyxDQUFBOztBQ0dqRSxJQUFNOEIsMkJBQTJCLEdBQUc1QixjQUFjLENBQUN5QixvQkFBb0IsQ0FBQyxDQUFBO0FBQUMsSUFFcERJLGFBQWEsMEJBQUFoRixnQkFBQSxFQUFBO0FBQUEsRUFBQSxTQUFBZ0YsYUFBQSxHQUFBO0FBQUEsSUFBQSxJQUFBL0UsS0FBQSxDQUFBO0FBQUFDLElBQUFBLGVBQUEsT0FBQThFLGFBQUEsQ0FBQSxDQUFBO0FBQUEsSUFBQSxLQUFBLElBQUEzQixJQUFBLEdBQUF2UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF3VixJQUFBLEdBQUF6VyxJQUFBQSxLQUFBLENBQUF3VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtBQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXpQLEdBQUFBLFNBQUEsQ0FBQXlQLElBQUEsQ0FBQSxDQUFBO0FBQUEsS0FBQTtBQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBNkUsYUFBQSxFQUFBeFcsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBOFUsSUFBQSxDQUFBLENBQUEsQ0FBQTtJQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBU3hCLE9BQUEsRUFBQTtBQUNOdUQsTUFBQUEsZUFBZSxFQUFFLEtBQUE7S0FDbEIsQ0FBQSxDQUFBO0FBQUFwRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDNEUsVUFBVSxFQUFBO0FBQUEsTUFBQSxPQUMvQkEsVUFBVSxDQUFDdFgsR0FBRyxDQUFDLFVBQUMwWCxDQUFDLEVBQUUxSixDQUFDLEVBQUE7UUFBQSxvQkFDbEJrRixLQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFBUS9FLFVBQUFBLEdBQUcsRUFBRUosQ0FBRTtBQUFDM1AsVUFBQUEsS0FBSyxFQUFFMlAsQ0FBQUE7QUFBRSxTQUFBLEVBQ3RCMEosQ0FDSyxDQUFDLENBQUE7QUFBQSxPQUNWLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQUE3RSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZSxrQkFBQSxFQUFBLFVBQUM0RSxVQUFVLEVBQUE7TUFBQSxvQkFDNUJwRSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFDRTlVLFFBQUFBLEtBQUssRUFBRXFVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3dFLEtBQU07QUFDeEI4SSxRQUFBQSxTQUFTLEVBQUMsZ0NBQWdDO1FBQzFDd0UsUUFBUSxFQUFFLFNBQUFBLFFBQUFBLENBQUM2QyxDQUFDLEVBQUE7VUFBQSxPQUFLeEQsS0FBQSxDQUFLVyxRQUFRLENBQUM2QyxDQUFDLENBQUNDLE1BQU0sQ0FBQzlYLEtBQUssQ0FBQyxDQUFBO0FBQUEsU0FBQTtBQUFDLE9BQUEsRUFFOUNxVSxLQUFBLENBQUsyRCxtQkFBbUIsQ0FBQ2lCLFVBQVUsQ0FDOUIsQ0FBQyxDQUFBO0tBQ1YsQ0FBQSxDQUFBO0FBQUF6RSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixVQUFDNEQsT0FBTyxFQUFFZ0IsVUFBVSxFQUFBO01BQUEsb0JBQ25DcEUsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0UvRSxRQUFBQSxHQUFHLEVBQUMsTUFBTTtBQUNWbUksUUFBQUEsS0FBSyxFQUFFO0FBQUVDLFVBQUFBLFVBQVUsRUFBRUYsT0FBTyxHQUFHLFNBQVMsR0FBRyxRQUFBO1NBQVc7QUFDdER6SCxRQUFBQSxTQUFTLEVBQUMsbUNBQW1DO1FBQzdDdUUsT0FBTyxFQUFFVixLQUFBLENBQUsrRCxjQUFBQTtPQUVkdkQsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU10RSxRQUFBQSxTQUFTLEVBQUMsK0NBQUE7QUFBK0MsT0FBRSxDQUFDLGVBQ2xFcUUsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU10RSxRQUFBQSxTQUFTLEVBQUMsbURBQUE7T0FDYnlJLEVBQUFBLFVBQVUsQ0FBQzVFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3dFLEtBQUssQ0FDeEIsQ0FDSCxDQUFDLENBQUE7S0FDUCxDQUFBLENBQUE7QUFBQThNLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUM0RSxVQUFVLEVBQUE7QUFBQSxNQUFBLG9CQUMxQnBFLEtBQUEsQ0FBQUMsYUFBQSxDQUFDcUUsMkJBQTJCLEVBQUE7QUFDMUJwSixRQUFBQSxHQUFHLEVBQUMsVUFBVTtBQUNkckksUUFBQUEsS0FBSyxFQUFFMk0sS0FBQSxDQUFLblIsS0FBSyxDQUFDd0UsS0FBTTtBQUN4QnVSLFFBQUFBLFVBQVUsRUFBRUEsVUFBVztRQUN2QmpFLFFBQVEsRUFBRVgsS0FBQSxDQUFLVyxRQUFTO1FBQ3hCUSxRQUFRLEVBQUVuQixLQUFBLENBQUsrRCxjQUFBQTtBQUFlLE9BQy9CLENBQUMsQ0FBQTtLQUNILENBQUEsQ0FBQTtBQUFBNUQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQzRFLFVBQVUsRUFBSztBQUNqQyxNQUFBLElBQVFyQixlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7QUFDdkIsTUFBQSxJQUFJUyxNQUFNLEdBQUcsQ0FBQ2hFLEtBQUEsQ0FBS2lFLGNBQWMsQ0FBQyxDQUFDVixlQUFlLEVBQUVxQixVQUFVLENBQUMsQ0FBQyxDQUFBO0FBQ2hFLE1BQUEsSUFBSXJCLGVBQWUsRUFBRTtRQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxDQUFDVSxVQUFVLENBQUMsQ0FBQyxDQUFBO0FBQ2pELE9BQUE7QUFDQSxNQUFBLE9BQU9aLE1BQU0sQ0FBQTtLQUNkLENBQUEsQ0FBQTtBQUFBN0QsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUMzTSxLQUFLLEVBQUs7TUFDcEIyTSxLQUFBLENBQUsrRCxjQUFjLEVBQUUsQ0FBQTtBQUNyQixNQUFBLElBQUkxUSxLQUFLLEtBQUsyTSxLQUFBLENBQUtuUixLQUFLLENBQUN3RSxLQUFLLEVBQUU7QUFDOUIyTSxRQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUM4UixRQUFRLENBQUN0TixLQUFLLENBQUMsQ0FBQTtBQUM1QixPQUFBO0tBQ0QsQ0FBQSxDQUFBO0lBQUE4TSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxZQUFBO01BQUEsT0FDZkEsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQ1ppQyxRQUFBQSxlQUFlLEVBQUUsQ0FBQ3ZELEtBQUEsQ0FBS00sS0FBSyxDQUFDaUQsZUFBQUE7QUFDL0IsT0FBQyxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBLElBQUEsT0FBQXZELEtBQUEsQ0FBQTtBQUFBLEdBQUE7RUFBQTRCLFNBQUEsQ0FBQW1ELGFBQUEsRUFBQWhGLGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUFrRCxhQUFBLEVBQUEsQ0FBQTtJQUFBckosR0FBQSxFQUFBLFFBQUE7SUFBQS9QLEtBQUEsRUFFSixTQUFBZ1gsTUFBQUEsR0FBUztBQUFBLE1BQUEsSUFBQXNDLE1BQUEsR0FBQSxJQUFBLENBQUE7QUFDUCxNQUFBLElBQU1MLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUN0WCxHQUFHLENBQzNELElBQUksQ0FBQ3VCLEtBQUssQ0FBQ3FXLHVCQUF1QixHQUM5QixVQUFDRixDQUFDLEVBQUE7UUFBQSxPQUFLRyxxQkFBMkIsQ0FBQ0gsQ0FBQyxFQUFFQyxNQUFJLENBQUNwVyxLQUFLLENBQUN6QyxNQUFNLENBQUMsQ0FBQTtBQUFBLE9BQUEsR0FDeEQsVUFBQzRZLENBQUMsRUFBQTtRQUFBLE9BQUtHLGdCQUFzQixDQUFDSCxDQUFDLEVBQUVDLE1BQUksQ0FBQ3BXLEtBQUssQ0FBQ3pDLE1BQU0sQ0FBQyxDQUFBO0FBQUEsT0FDekQsQ0FBQyxDQUFBO0FBRUQsTUFBQSxJQUFJbVksZ0JBQWdCLENBQUE7QUFDcEIsTUFBQSxRQUFRLElBQUksQ0FBQzFWLEtBQUssQ0FBQzJWLFlBQVk7QUFDN0IsUUFBQSxLQUFLLFFBQVE7QUFDWEQsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRSxnQkFBZ0IsQ0FBQ0csVUFBVSxDQUFDLENBQUE7QUFDcEQsVUFBQSxNQUFBO0FBQ0YsUUFBQSxLQUFLLFFBQVE7QUFDWEwsVUFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRyxnQkFBZ0IsQ0FBQ0UsVUFBVSxDQUFDLENBQUE7QUFDcEQsVUFBQSxNQUFBO0FBQ0osT0FBQTtNQUVBLG9CQUNFcEUsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxRQUFBQSxTQUFTLDRGQUFBNU4sTUFBQSxDQUE0RixJQUFJLENBQUNNLEtBQUssQ0FBQzJWLFlBQVksQ0FBQTtBQUFHLE9BQUEsRUFFOUhELGdCQUNFLENBQUMsQ0FBQTtBQUVWLEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0FuR3dDL0QsQ0FBQUEsS0FBSyxDQUFDd0MsU0FBUyxDQUFBOztBQ00xRCxTQUFTb0Msa0JBQWtCQSxDQUFDOVksT0FBTyxFQUFFeUgsT0FBTyxFQUFFO0VBQzVDLElBQU00TCxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBRWYsRUFBQSxJQUFJMEYsUUFBUSxHQUFHM1UsZUFBZSxDQUFDcEUsT0FBTyxDQUFDLENBQUE7QUFDdkMsRUFBQSxJQUFNZ1osUUFBUSxHQUFHNVUsZUFBZSxDQUFDcUQsT0FBTyxDQUFDLENBQUE7QUFFekMsRUFBQSxPQUFPLENBQUNnSyxPQUFPLENBQUNzSCxRQUFRLEVBQUVDLFFBQVEsQ0FBQyxFQUFFO0FBQ25DM0YsSUFBQUEsSUFBSSxDQUFDN0QsSUFBSSxDQUFDcFEsT0FBTyxDQUFDMlosUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUU1QkEsSUFBQUEsUUFBUSxHQUFHOU0sU0FBUyxDQUFDOE0sUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ25DLEdBQUE7QUFDQSxFQUFBLE9BQU8xRixJQUFJLENBQUE7QUFDYixDQUFBO0FBQUMsSUFFb0I0Rix3QkFBd0IsMEJBQUF4RixnQkFBQSxFQUFBO0VBWTNDLFNBQUF3Rix3QkFBQUEsQ0FBWTFXLEtBQUssRUFBRTtBQUFBLElBQUEsSUFBQW1SLEtBQUEsQ0FBQTtBQUFBQyxJQUFBQSxlQUFBLE9BQUFzRix3QkFBQSxDQUFBLENBQUE7QUFDakJ2RixJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQXFGLElBQUFBLEVBQUFBLHdCQUFBLEdBQU0xVyxLQUFLLENBQUEsQ0FBQSxDQUFBO0lBQUVzUixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBVUMsWUFBTTtNQUNwQixPQUFPQSxLQUFBLENBQUtNLEtBQUssQ0FBQ2tGLGNBQWMsQ0FBQ2xZLEdBQUcsQ0FBQyxVQUFDbVksU0FBUyxFQUFLO0FBQ2xELFFBQUEsSUFBTUMsY0FBYyxHQUFHOUcsT0FBTyxDQUFDNkcsU0FBUyxDQUFDLENBQUE7UUFDekMsSUFBTUUsZUFBZSxHQUNuQnhVLFVBQVUsQ0FBQzZPLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2QsSUFBSSxFQUFFMFgsU0FBUyxDQUFDLElBQ3RDbFUsV0FBVyxDQUFDeU8sS0FBQSxDQUFLblIsS0FBSyxDQUFDZCxJQUFJLEVBQUUwWCxTQUFTLENBQUMsQ0FBQTtRQUV6QyxvQkFDRWpGLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNFdEUsVUFBQUEsU0FBUyxFQUNQd0osZUFBZSxHQUNYLDBEQUEwRCxHQUMxRCxxQ0FDTDtBQUNEakssVUFBQUEsR0FBRyxFQUFFZ0ssY0FBZTtVQUNwQmhGLE9BQU8sRUFBRVYsS0FBQSxDQUFLVyxRQUFRLENBQUNDLElBQUksQ0FBQVosS0FBQSxFQUFPMEYsY0FBYyxDQUFFO1VBQ2xELGVBQWVDLEVBQUFBLGVBQWUsR0FBRyxNQUFNLEdBQUc3UixTQUFBQTtBQUFVLFNBQUEsRUFFbkQ2UixlQUFlLGdCQUNkbkYsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU10RSxVQUFBQSxTQUFTLEVBQUMsK0NBQUE7U0FBZ0QsRUFBQSxRQUUxRCxDQUFDLEdBRVAsRUFDRCxFQUNBL08sVUFBVSxDQUFDcVksU0FBUyxFQUFFekYsS0FBQSxDQUFLblIsS0FBSyxDQUFDMUMsVUFBVSxFQUFFNlQsS0FBQSxDQUFLblIsS0FBSyxDQUFDekMsTUFBTSxDQUM1RCxDQUFDLENBQUE7QUFFVixPQUFDLENBQUMsQ0FBQTtLQUNILENBQUEsQ0FBQTtBQUFBK1QsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUN5RixTQUFTLEVBQUE7QUFBQSxNQUFBLE9BQUt6RixLQUFBLENBQUtuUixLQUFLLENBQUM4UixRQUFRLENBQUM4RSxTQUFTLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUF0RixlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVuQyxZQUFNO0FBQ3pCQSxNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNzUyxRQUFRLEVBQUUsQ0FBQTtLQUN0QixDQUFBLENBQUE7SUEzQ0NuQixLQUFBLENBQUtNLEtBQUssR0FBRztBQUNYa0YsTUFBQUEsY0FBYyxFQUFFSixrQkFBa0IsQ0FDaENwRixLQUFBLENBQUtuUixLQUFLLENBQUN2QyxPQUFPLEVBQ2xCMFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDa0YsT0FDYixDQUFBO0tBQ0QsQ0FBQTtBQUFDLElBQUEsT0FBQWlNLEtBQUEsQ0FBQTtBQUNKLEdBQUE7RUFBQzRCLFNBQUEsQ0FBQTJELHdCQUFBLEVBQUF4RixnQkFBQSxDQUFBLENBQUE7RUFBQSxPQUFBOEIsWUFBQSxDQUFBMEQsd0JBQUEsRUFBQSxDQUFBO0lBQUE3SixHQUFBLEVBQUEsUUFBQTtJQUFBL1AsS0FBQSxFQXVDRCxTQUFBZ1gsTUFBQUEsR0FBUztNQUNQLElBQUlDLGFBQWEsR0FBR0MsSUFBSSxDQUFDO0FBQ3ZCLFFBQUEsdUNBQXVDLEVBQUUsSUFBSTtBQUM3QyxRQUFBLG1EQUFtRCxFQUNqRCxJQUFJLENBQUNoVSxLQUFLLENBQUMrVywyQkFBQUE7QUFDZixPQUFDLENBQUMsQ0FBQTtNQUVGLG9CQUFPcEYsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUt0RSxRQUFBQSxTQUFTLEVBQUV5RyxhQUFBQTtBQUFjLE9BQUEsRUFBRSxJQUFJLENBQUNHLGFBQWEsRUFBUSxDQUFDLENBQUE7QUFDcEUsS0FBQTtBQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7QUFBQSxDQXBFbUR2QyxDQUFBQSxLQUFLLENBQUN3QyxTQUFTLENBQUE7O0FDYnJFLElBQUk2QywrQkFBK0IsR0FBRzNDLGNBQWMsQ0FBQ3FDLHdCQUF3QixDQUFDLENBQUE7QUFBQyxJQUUxRE8saUJBQWlCLDBCQUFBL0YsZ0JBQUEsRUFBQTtBQUFBLEVBQUEsU0FBQStGLGlCQUFBLEdBQUE7QUFBQSxJQUFBLElBQUE5RixLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBNkYsaUJBQUEsQ0FBQSxDQUFBO0FBQUEsSUFBQSxLQUFBLElBQUExQyxJQUFBLEdBQUF2UCxTQUFBLENBQUFoRyxNQUFBLEVBQUF3VixJQUFBLEdBQUF6VyxJQUFBQSxLQUFBLENBQUF3VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtBQUFBRCxNQUFBQSxJQUFBLENBQUFDLElBQUEsQ0FBQXpQLEdBQUFBLFNBQUEsQ0FBQXlQLElBQUEsQ0FBQSxDQUFBO0FBQUEsS0FBQTtBQUFBdEQsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUEsSUFBQSxFQUFBNEYsaUJBQUEsRUFBQXZYLEVBQUFBLENBQUFBLE1BQUEsQ0FBQThVLElBQUEsQ0FBQSxDQUFBLENBQUE7SUFBQWxELGVBQUEsQ0FBQUgsS0FBQSxFQVk1QixPQUFBLEVBQUE7QUFDTnVELE1BQUFBLGVBQWUsRUFBRSxLQUFBO0tBQ2xCLENBQUEsQ0FBQTtJQUFBcEQsZUFBQSxDQUFBSCxLQUFBLEVBQUEscUJBQUEsRUFFcUIsWUFBTTtNQUMxQixJQUFJcUYsUUFBUSxHQUFHM1UsZUFBZSxDQUFDc1AsS0FBQSxDQUFLblIsS0FBSyxDQUFDdkMsT0FBTyxDQUFDLENBQUE7TUFDbEQsSUFBTWdaLFFBQVEsR0FBRzVVLGVBQWUsQ0FBQ3NQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2tGLE9BQU8sQ0FBQyxDQUFBO01BQ3BELElBQU1zTSxPQUFPLEdBQUcsRUFBRSxDQUFBO0FBRWxCLE1BQUEsT0FBTyxDQUFDdEMsT0FBTyxDQUFDc0gsUUFBUSxFQUFFQyxRQUFRLENBQUMsRUFBRTtBQUNuQyxRQUFBLElBQU1TLFNBQVMsR0FBR25ILE9BQU8sQ0FBQ3lHLFFBQVEsQ0FBQyxDQUFBO0FBQ25DaEYsUUFBQUEsT0FBTyxDQUFDdkUsSUFBSSxlQUNWMEUsS0FBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0FBQVEvRSxVQUFBQSxHQUFHLEVBQUVxSyxTQUFVO0FBQUNwYSxVQUFBQSxLQUFLLEVBQUVvYSxTQUFBQTtBQUFVLFNBQUEsRUFDdEMzWSxVQUFVLENBQUNpWSxRQUFRLEVBQUVyRixLQUFBLENBQUtuUixLQUFLLENBQUMxQyxVQUFVLEVBQUU2VCxLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFNLENBQ3hELENBQ1YsQ0FBQyxDQUFBO0FBRURpWixRQUFBQSxRQUFRLEdBQUc5TSxTQUFTLENBQUM4TSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDbkMsT0FBQTtBQUVBLE1BQUEsT0FBT2hGLE9BQU8sQ0FBQTtLQUNmLENBQUEsQ0FBQTtBQUFBRixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFZ0IsZ0JBQUEsRUFBQSxVQUFDd0QsQ0FBQyxFQUFLO01BQ3RCeEQsS0FBQSxDQUFLVyxRQUFRLENBQUM2QyxDQUFDLENBQUNDLE1BQU0sQ0FBQzlYLEtBQUssQ0FBQyxDQUFBO0tBQzlCLENBQUEsQ0FBQTtJQUFBd1UsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsWUFBQTtNQUFBLG9CQUNqQlEsS0FBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO1FBQ0U5VSxLQUFLLEVBQUVpVCxPQUFPLENBQUNsTyxlQUFlLENBQUNzUCxLQUFBLENBQUtuUixLQUFLLENBQUNkLElBQUksQ0FBQyxDQUFFO0FBQ2pEb08sUUFBQUEsU0FBUyxFQUFDLHFDQUFxQztRQUMvQ3dFLFFBQVEsRUFBRVgsS0FBQSxDQUFLMEQsY0FBQUE7QUFBZSxPQUFBLEVBRTdCMUQsS0FBQSxDQUFLMkQsbUJBQW1CLEVBQ25CLENBQUMsQ0FBQTtLQUNWLENBQUEsQ0FBQTtBQUFBeEQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsVUFBQzRELE9BQU8sRUFBSztNQUM1QixJQUFNb0MsU0FBUyxHQUFHNVksVUFBVSxDQUMxQjRTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2QsSUFBSSxFQUNmaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDMUMsVUFBVSxFQUNyQjZULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQ2IsQ0FBQyxDQUFBO01BRUQsb0JBQ0VvVSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDRS9FLFFBQUFBLEdBQUcsRUFBQyxNQUFNO0FBQ1ZtSSxRQUFBQSxLQUFLLEVBQUU7QUFBRUMsVUFBQUEsVUFBVSxFQUFFRixPQUFPLEdBQUcsU0FBUyxHQUFHLFFBQUE7U0FBVztBQUN0RHpILFFBQUFBLFNBQVMsRUFBQyx3Q0FBd0M7UUFDbER1RSxPQUFPLEVBQUUsU0FBQUEsT0FBQUEsQ0FBQ25CLEtBQUssRUFBQTtBQUFBLFVBQUEsT0FBS1MsS0FBQSxDQUFLK0QsY0FBYyxDQUFDeEUsS0FBSyxDQUFDLENBQUE7QUFBQSxTQUFBO09BRTlDaUIsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU10RSxRQUFBQSxTQUFTLEVBQUMsb0RBQUE7QUFBb0QsT0FBRSxDQUFDLGVBQ3ZFcUUsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU10RSxRQUFBQSxTQUFTLEVBQUMsNkRBQUE7T0FDYjZKLEVBQUFBLFNBQ0csQ0FDSCxDQUFDLENBQUE7S0FFVCxDQUFBLENBQUE7SUFBQTdGLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFlBQUE7QUFBQSxNQUFBLG9CQUNmUSxLQUFBLENBQUFDLGFBQUEsQ0FBQ29GLCtCQUErQixFQUFBO0FBQzlCbkssUUFBQUEsR0FBRyxFQUFDLFVBQVU7QUFDZDNOLFFBQUFBLElBQUksRUFBRWlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2QsSUFBSztBQUN0QjVCLFFBQUFBLFVBQVUsRUFBRTZULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzFDLFVBQVc7UUFDbEN3VSxRQUFRLEVBQUVYLEtBQUEsQ0FBS1csUUFBUztRQUN4QlEsUUFBUSxFQUFFbkIsS0FBQSxDQUFLK0QsY0FBZTtBQUM5QnpYLFFBQUFBLE9BQU8sRUFBRTBULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQVE7QUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVpTSxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFRO0FBQzVCNlIsUUFBQUEsMkJBQTJCLEVBQUU1RixLQUFBLENBQUtuUixLQUFLLENBQUMrVywyQkFBNEI7QUFDcEV4WixRQUFBQSxNQUFNLEVBQUU0VCxLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFBQTtBQUFPLE9BQzNCLENBQUMsQ0FBQTtLQUNILENBQUEsQ0FBQTtJQUFBK1QsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtBQUN2QixNQUFBLElBQVF1RCxlQUFlLEdBQUt2RCxLQUFBLENBQUtNLEtBQUssQ0FBOUJpRCxlQUFlLENBQUE7TUFDdkIsSUFBSVMsTUFBTSxHQUFHLENBQUNoRSxLQUFBLENBQUtpRSxjQUFjLENBQUMsQ0FBQ1YsZUFBZSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxNQUFBLElBQUlBLGVBQWUsRUFBRTtRQUNuQlMsTUFBTSxDQUFDaEQsT0FBTyxDQUFDaEIsS0FBQSxDQUFLa0UsY0FBYyxFQUFFLENBQUMsQ0FBQTtBQUN2QyxPQUFBO0FBQ0EsTUFBQSxPQUFPRixNQUFNLENBQUE7S0FDZCxDQUFBLENBQUE7QUFBQTdELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVVLFVBQUEsRUFBQSxVQUFDMEYsY0FBYyxFQUFLO01BQzdCMUYsS0FBQSxDQUFLK0QsY0FBYyxFQUFFLENBQUE7TUFFckIsSUFBTWtDLFdBQVcsR0FBR3ZhLE9BQU8sQ0FBQ3dhLFFBQVEsQ0FBQ1IsY0FBYyxDQUFDLENBQUMsQ0FBQTtNQUVyRCxJQUNFdlUsVUFBVSxDQUFDNk8sS0FBQSxDQUFLblIsS0FBSyxDQUFDZCxJQUFJLEVBQUVrWSxXQUFXLENBQUMsSUFDeEMxVSxXQUFXLENBQUN5TyxLQUFBLENBQUtuUixLQUFLLENBQUNkLElBQUksRUFBRWtZLFdBQVcsQ0FBQyxFQUN6QztBQUNBLFFBQUEsT0FBQTtBQUNGLE9BQUE7QUFFQWpHLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhSLFFBQVEsQ0FBQ3NGLFdBQVcsQ0FBQyxDQUFBO0tBQ2pDLENBQUEsQ0FBQTtJQUFBOUYsZUFBQSxDQUFBSCxLQUFBLEVBRWdCLGdCQUFBLEVBQUEsWUFBQTtNQUFBLE9BQ2ZBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUNaaUMsUUFBQUEsZUFBZSxFQUFFLENBQUN2RCxLQUFBLENBQUtNLEtBQUssQ0FBQ2lELGVBQUFBO0FBQy9CLE9BQUMsQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7QUFBQSxJQUFBLE9BQUF2RCxLQUFBLENBQUE7QUFBQSxHQUFBO0VBQUE0QixTQUFBLENBQUFrRSxpQkFBQSxFQUFBL0YsZ0JBQUEsQ0FBQSxDQUFBO0VBQUEsT0FBQThCLFlBQUEsQ0FBQWlFLGlCQUFBLEVBQUEsQ0FBQTtJQUFBcEssR0FBQSxFQUFBLFFBQUE7SUFBQS9QLEtBQUEsRUFFSixTQUFBZ1gsTUFBQUEsR0FBUztBQUNQLE1BQUEsSUFBSTRCLGdCQUFnQixDQUFBO0FBQ3BCLE1BQUEsUUFBUSxJQUFJLENBQUMxVixLQUFLLENBQUMyVixZQUFZO0FBQzdCLFFBQUEsS0FBSyxRQUFRO0FBQ1hELFVBQUFBLGdCQUFnQixHQUFHLElBQUksQ0FBQ0UsZ0JBQWdCLEVBQUUsQ0FBQTtBQUMxQyxVQUFBLE1BQUE7QUFDRixRQUFBLEtBQUssUUFBUTtBQUNYRixVQUFBQSxnQkFBZ0IsR0FBRyxJQUFJLENBQUNHLGdCQUFnQixFQUFFLENBQUE7QUFDMUMsVUFBQSxNQUFBO0FBQ0osT0FBQTtNQUVBLG9CQUNFbEUsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxRQUFBQSxTQUFTLHNHQUFBNU4sTUFBQSxDQUFzRyxJQUFJLENBQUNNLEtBQUssQ0FBQzJWLFlBQVksQ0FBQTtBQUFHLE9BQUEsRUFFeElELGdCQUNFLENBQUMsQ0FBQTtBQUVWLEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0FwSTRDL0QsQ0FBQUEsS0FBSyxDQUFDd0MsU0FBUyxDQUFBOztBQ0N4QyxJQUVEbUQsR0FBRywwQkFBQXBHLGdCQUFBLEVBQUE7QUFBQSxFQUFBLFNBQUFvRyxHQUFBLEdBQUE7QUFBQSxJQUFBLElBQUFuRyxLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBa0csR0FBQSxDQUFBLENBQUE7QUFBQSxJQUFBLEtBQUEsSUFBQS9DLElBQUEsR0FBQXZQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXdWLElBQUEsR0FBQXpXLElBQUFBLEtBQUEsQ0FBQXdXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0FBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBelAsR0FBQUEsU0FBQSxDQUFBeVAsSUFBQSxDQUFBLENBQUE7QUFBQSxLQUFBO0FBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFpRyxHQUFBLEVBQUE1WCxFQUFBQSxDQUFBQSxNQUFBLENBQUE4VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxPQUFBLGVBNERkUSxLQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQSxDQUFBO0FBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFWCxhQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0FBQ3ZCLE1BQUEsSUFBSSxDQUFDUyxLQUFBLENBQUtvRyxVQUFVLEVBQUUsSUFBSXBHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzZSLE9BQU8sRUFBRTtBQUM1Q1YsUUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDNlIsT0FBTyxDQUFDbkIsS0FBSyxDQUFDLENBQUE7QUFDM0IsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7QUFDNUIsTUFBQSxJQUFJLENBQUNTLEtBQUEsQ0FBS29HLFVBQVUsRUFBRSxJQUFJcEcsS0FBQSxDQUFLblIsS0FBSyxDQUFDd1gsWUFBWSxFQUFFO0FBQ2pEckcsUUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDd1gsWUFBWSxDQUFDOUcsS0FBSyxDQUFDLENBQUE7QUFDaEMsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7QUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDN0QsR0FBRyxDQUFBO01BQzFCLElBQUk0SyxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ3BCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7UUFDdEJoSCxLQUFLLENBQUM3RCxHQUFHLEdBQUcsT0FBTyxDQUFBO0FBQ3JCLE9BQUE7QUFFQXNFLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJYLGVBQWUsQ0FBQ2pILEtBQUssQ0FBQyxDQUFBO0tBQ2xDLENBQUEsQ0FBQTtBQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVyxXQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtNQUFBLE9BQUs5VSxTQUFTLENBQUNxTyxLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLEVBQUVzVyxLQUFLLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUF0RyxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVsQyxZQUFNO0FBQUEsTUFBQSxJQUFBMEcscUJBQUEsQ0FBQTtBQUN6QixNQUFBLElBQUkxRyxLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMEIsRUFBRTtBQUN6QyxRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtNQUVBLElBQU1DLGNBQWMsR0FBRzVHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dZLGVBQWUsR0FBQUgsQ0FBQUEscUJBQUEsR0FDN0MxRyxLQUFBLENBQUtuUixLQUFLLENBQUNpWSxhQUFhLE1BQUEsSUFBQSxJQUFBSixxQkFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUF4QkEscUJBQUEsQ0FBMEJwUyxJQUFJLENBQUMsVUFBQ3ZHLElBQUksRUFBQTtBQUFBLFFBQUEsT0FBS2lTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQ2haLElBQUksQ0FBQyxDQUFBO09BQUMsQ0FBQSxHQUNwRWlTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQy9HLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsQ0FBQyxDQUFBO0FBRTdDLE1BQUEsT0FBTyxDQUFDSixjQUFjLElBQUk1RyxLQUFBLENBQUsrRyxlQUFlLENBQUMvRyxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUMsQ0FBQTtLQUN4RSxDQUFBLENBQUE7SUFBQTlHLGVBQUEsQ0FBQUgsS0FBQSxFQUVZLFlBQUEsRUFBQSxZQUFBO01BQUEsT0FBTXJNLGFBQWEsQ0FBQ3FNLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsRUFBRTZQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7SUFBQXNSLGVBQUEsQ0FBQUgsS0FBQSxFQUUvQyxZQUFBLEVBQUEsWUFBQTtNQUFBLE9BQU1yTCxhQUFhLENBQUNxTCxLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLEVBQUU2UCxLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUFzUixlQUFBLENBQUFILEtBQUEsRUFFNUMsZUFBQSxFQUFBLFlBQUE7QUFBQSxNQUFBLE9BQ2RyTyxTQUFTLENBQ1BxTyxLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLEVBQ2RHLGNBQWMsQ0FDWjBQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsRUFDZDZQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakI0VCxLQUFBLENBQUtuUixLQUFLLENBQUMwQixnQkFDYixDQUNGLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQUE0UCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFVSxZQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtBQUFBLE1BQUEsT0FDakJ6RyxLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFjLElBQ3pCdlYsU0FBUyxDQUNQOFUsS0FBSyxFQUNMblcsY0FBYyxDQUNaMFAsS0FBQSxDQUFLblIsS0FBSyxDQUFDc0IsR0FBRyxFQUNkNlAsS0FBQSxDQUFLblIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBCLGdCQUNiLENBQ0YsQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7QUFBQTRQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVlLGlCQUFBLEVBQUEsVUFBQ3lHLEtBQUssRUFBQTtBQUFBLE1BQUEsT0FBS3pHLEtBQUEsQ0FBS3JPLFNBQVMsQ0FBQzhVLEtBQUssQ0FBQyxJQUFJekcsS0FBQSxDQUFLbUgsVUFBVSxDQUFDVixLQUFLLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUF0RyxlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUV0RCxZQUFNO0FBQzFCLE1BQUEsSUFBQW9ILFdBQUEsR0FBZ0NwSCxLQUFBLENBQUtuUixLQUFLO1FBQWxDc0IsR0FBRyxHQUFBaVgsV0FBQSxDQUFIalgsR0FBRztRQUFFK0ssY0FBYyxHQUFBa00sV0FBQSxDQUFkbE0sY0FBYyxDQUFBO01BRTNCLElBQUksQ0FBQ0EsY0FBYyxFQUFFO0FBQ25CLFFBQUEsT0FBTyxLQUFLLENBQUE7QUFDZCxPQUFBOztBQUVBO0FBQ0EsTUFBQSxJQUFNbU0sTUFBTSxHQUFHamEsVUFBVSxDQUFDK0MsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQzVDLE1BQUEsT0FBTytLLGNBQWMsQ0FBQ1UsR0FBRyxDQUFDeUwsTUFBTSxDQUFDLENBQUE7S0FDbEMsQ0FBQSxDQUFBO0FBRUQ7SUFBQWxILGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBQ21CLFlBQU07QUFDdkIsTUFBQSxJQUFBc0gsWUFBQSxHQUEwQnRILEtBQUEsQ0FBS25SLEtBQUs7UUFBNUJzQixHQUFHLEdBQUFtWCxZQUFBLENBQUhuWCxHQUFHO1FBQUVvWCxRQUFRLEdBQUFELFlBQUEsQ0FBUkMsUUFBUSxDQUFBO01BQ3JCLElBQUksQ0FBQ0EsUUFBUSxFQUFFO0FBQ2IsUUFBQSxPQUFPLEtBQUssQ0FBQTtBQUNkLE9BQUE7QUFDQSxNQUFBLElBQU1GLE1BQU0sR0FBR2phLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUM1QztBQUNBLE1BQUEsSUFBSW9YLFFBQVEsQ0FBQ0MsR0FBRyxDQUFDSCxNQUFNLENBQUMsRUFBRTtRQUN4QixPQUFPLENBQUNFLFFBQVEsQ0FBQzNMLEdBQUcsQ0FBQ3lMLE1BQU0sQ0FBQyxDQUFDbEwsU0FBUyxDQUFDLENBQUE7QUFDekMsT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBZ0UsZUFBQSxDQUFBSCxLQUFBLEVBQUEsV0FBQSxFQUVXLFlBQU07QUFDaEIsTUFBQSxJQUFBeUgsWUFBQSxHQUFvQ3pILEtBQUEsQ0FBS25SLEtBQUs7UUFBdENzQixHQUFHLEdBQUFzWCxZQUFBLENBQUh0WCxHQUFHO1FBQUV4QixTQUFTLEdBQUE4WSxZQUFBLENBQVQ5WSxTQUFTO1FBQUVDLE9BQU8sR0FBQTZZLFlBQUEsQ0FBUDdZLE9BQU8sQ0FBQTtBQUMvQixNQUFBLElBQUksQ0FBQ0QsU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtBQUMxQixRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtBQUNBLE1BQUEsT0FBT21ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRXhCLFNBQVMsRUFBRUMsT0FBTyxDQUFDLENBQUE7S0FDN0MsQ0FBQSxDQUFBO0lBQUF1UixlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUFNO0FBQUEsTUFBQSxJQUFBMEgscUJBQUEsQ0FBQTtBQUN6QixNQUFBLElBQUFDLFlBQUEsR0FRSTNILEtBQUEsQ0FBS25SLEtBQUs7UUFQWnNCLEdBQUcsR0FBQXdYLFlBQUEsQ0FBSHhYLEdBQUc7UUFDSHlYLFlBQVksR0FBQUQsWUFBQSxDQUFaQyxZQUFZO1FBQ1pDLFVBQVUsR0FBQUYsWUFBQSxDQUFWRSxVQUFVO1FBQ1ZDLFlBQVksR0FBQUgsWUFBQSxDQUFaRyxZQUFZO1FBQ1pDLDBCQUEwQixHQUFBSixZQUFBLENBQTFCSSwwQkFBMEI7UUFDMUJwWixTQUFTLEdBQUFnWixZQUFBLENBQVRoWixTQUFTO1FBQ1RDLE9BQU8sR0FBQStZLFlBQUEsQ0FBUC9ZLE9BQU8sQ0FBQTtBQUdULE1BQUEsSUFBTW9aLGFBQWEsR0FBQU4sQ0FBQUEscUJBQUEsR0FBRzFILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21aLGFBQWEsTUFBQU4sSUFBQUEsSUFBQUEscUJBQUEsY0FBQUEscUJBQUEsR0FBSTFILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29ZLFlBQVksQ0FBQTtBQUV6RSxNQUFBLElBQ0UsRUFBRVcsWUFBWSxJQUFJQyxVQUFVLElBQUlDLFlBQVksQ0FBQyxJQUM3QyxDQUFDRSxhQUFhLElBQ2IsQ0FBQ0QsMEJBQTBCLElBQUkvSCxLQUFBLENBQUtvRyxVQUFVLEVBQUcsRUFDbEQ7QUFDQSxRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtBQUVBLE1BQUEsSUFDRXdCLFlBQVksSUFDWmhaLE9BQU8sS0FDTlgsUUFBUSxDQUFDK1osYUFBYSxFQUFFcFosT0FBTyxDQUFDLElBQUlpRCxPQUFPLENBQUNtVyxhQUFhLEVBQUVwWixPQUFPLENBQUMsQ0FBQyxFQUNyRTtBQUNBLFFBQUEsT0FBT21ELFlBQVksQ0FBQzVCLEdBQUcsRUFBRTZYLGFBQWEsRUFBRXBaLE9BQU8sQ0FBQyxDQUFBO0FBQ2xELE9BQUE7QUFFQSxNQUFBLElBQ0VpWixVQUFVLElBQ1ZsWixTQUFTLEtBQ1JvUCxPQUFPLENBQUNpSyxhQUFhLEVBQUVyWixTQUFTLENBQUMsSUFBSWtELE9BQU8sQ0FBQ21XLGFBQWEsRUFBRXJaLFNBQVMsQ0FBQyxDQUFDLEVBQ3hFO0FBQ0EsUUFBQSxPQUFPb0QsWUFBWSxDQUFDNUIsR0FBRyxFQUFFeEIsU0FBUyxFQUFFcVosYUFBYSxDQUFDLENBQUE7QUFDcEQsT0FBQTtNQUVBLElBQ0VGLFlBQVksSUFDWm5aLFNBQVMsSUFDVCxDQUFDQyxPQUFPLEtBQ1BtUCxPQUFPLENBQUNpSyxhQUFhLEVBQUVyWixTQUFTLENBQUMsSUFBSWtELE9BQU8sQ0FBQ21XLGFBQWEsRUFBRXJaLFNBQVMsQ0FBQyxDQUFDLEVBQ3hFO0FBQ0EsUUFBQSxPQUFPb0QsWUFBWSxDQUFDNUIsR0FBRyxFQUFFeEIsU0FBUyxFQUFFcVosYUFBYSxDQUFDLENBQUE7QUFDcEQsT0FBQTtBQUVBLE1BQUEsT0FBTyxLQUFLLENBQUE7S0FDYixDQUFBLENBQUE7SUFBQTdILGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHVCQUFBLEVBRXVCLFlBQU07QUFBQSxNQUFBLElBQUFpSSxzQkFBQSxDQUFBO0FBQzVCLE1BQUEsSUFBSSxDQUFDakksS0FBQSxDQUFLa0ksa0JBQWtCLEVBQUUsRUFBRTtBQUM5QixRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtBQUVBLE1BQUEsSUFBQUMsWUFBQSxHQUF5Q25JLEtBQUEsQ0FBS25SLEtBQUs7UUFBM0NzQixHQUFHLEdBQUFnWSxZQUFBLENBQUhoWSxHQUFHO1FBQUV4QixTQUFTLEdBQUF3WixZQUFBLENBQVR4WixTQUFTO1FBQUVpWixZQUFZLEdBQUFPLFlBQUEsQ0FBWlAsWUFBWSxDQUFBO0FBQ3BDLE1BQUEsSUFBTUksYUFBYSxHQUFBQyxDQUFBQSxzQkFBQSxHQUFHakksS0FBQSxDQUFLblIsS0FBSyxDQUFDbVosYUFBYSxNQUFBQyxJQUFBQSxJQUFBQSxzQkFBQSxjQUFBQSxzQkFBQSxHQUFJakksS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBWSxDQUFBO0FBRXpFLE1BQUEsSUFBSVcsWUFBWSxFQUFFO0FBQ2hCLFFBQUEsT0FBT2pXLFNBQVMsQ0FBQ3hCLEdBQUcsRUFBRTZYLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLE9BQUMsTUFBTTtBQUNMLFFBQUEsT0FBT3JXLFNBQVMsQ0FBQ3hCLEdBQUcsRUFBRXhCLFNBQVMsQ0FBQyxDQUFBO0FBQ2xDLE9BQUE7S0FDRCxDQUFBLENBQUE7SUFBQXdSLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHFCQUFBLEVBRXFCLFlBQU07QUFBQSxNQUFBLElBQUFvSSxzQkFBQSxDQUFBO0FBQzFCLE1BQUEsSUFBSSxDQUFDcEksS0FBQSxDQUFLa0ksa0JBQWtCLEVBQUUsRUFBRTtBQUM5QixRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtBQUVBLE1BQUEsSUFBQUcsWUFBQSxHQUFtRHJJLEtBQUEsQ0FBS25SLEtBQUs7UUFBckRzQixHQUFHLEdBQUFrWSxZQUFBLENBQUhsWSxHQUFHO1FBQUV2QixPQUFPLEdBQUF5WixZQUFBLENBQVB6WixPQUFPO1FBQUVpWixVQUFVLEdBQUFRLFlBQUEsQ0FBVlIsVUFBVTtRQUFFQyxZQUFZLEdBQUFPLFlBQUEsQ0FBWlAsWUFBWSxDQUFBO0FBQzlDLE1BQUEsSUFBTUUsYUFBYSxHQUFBSSxDQUFBQSxzQkFBQSxHQUFHcEksS0FBQSxDQUFLblIsS0FBSyxDQUFDbVosYUFBYSxNQUFBSSxJQUFBQSxJQUFBQSxzQkFBQSxjQUFBQSxzQkFBQSxHQUFJcEksS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBWSxDQUFBO01BRXpFLElBQUlZLFVBQVUsSUFBSUMsWUFBWSxFQUFFO0FBQzlCLFFBQUEsT0FBT25XLFNBQVMsQ0FBQ3hCLEdBQUcsRUFBRTZYLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLE9BQUMsTUFBTTtBQUNMLFFBQUEsT0FBT3JXLFNBQVMsQ0FBQ3hCLEdBQUcsRUFBRXZCLE9BQU8sQ0FBQyxDQUFBO0FBQ2hDLE9BQUE7S0FDRCxDQUFBLENBQUE7SUFBQXVSLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGNBQUEsRUFFYyxZQUFNO0FBQ25CLE1BQUEsSUFBQXNJLFlBQUEsR0FBb0N0SSxLQUFBLENBQUtuUixLQUFLO1FBQXRDc0IsR0FBRyxHQUFBbVksWUFBQSxDQUFIblksR0FBRztRQUFFeEIsU0FBUyxHQUFBMlosWUFBQSxDQUFUM1osU0FBUztRQUFFQyxPQUFPLEdBQUEwWixZQUFBLENBQVAxWixPQUFPLENBQUE7QUFDL0IsTUFBQSxJQUFJLENBQUNELFNBQVMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7QUFDMUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtBQUNkLE9BQUE7QUFDQSxNQUFBLE9BQU8rQyxTQUFTLENBQUNoRCxTQUFTLEVBQUV3QixHQUFHLENBQUMsQ0FBQTtLQUNqQyxDQUFBLENBQUE7SUFBQWdRLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFlBQUEsRUFFWSxZQUFNO0FBQ2pCLE1BQUEsSUFBQXVJLFlBQUEsR0FBb0N2SSxLQUFBLENBQUtuUixLQUFLO1FBQXRDc0IsR0FBRyxHQUFBb1ksWUFBQSxDQUFIcFksR0FBRztRQUFFeEIsU0FBUyxHQUFBNFosWUFBQSxDQUFUNVosU0FBUztRQUFFQyxPQUFPLEdBQUEyWixZQUFBLENBQVAzWixPQUFPLENBQUE7QUFDL0IsTUFBQSxJQUFJLENBQUNELFNBQVMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7QUFDMUIsUUFBQSxPQUFPLEtBQUssQ0FBQTtBQUNkLE9BQUE7QUFDQSxNQUFBLE9BQU8rQyxTQUFTLENBQUMvQyxPQUFPLEVBQUV1QixHQUFHLENBQUMsQ0FBQTtLQUMvQixDQUFBLENBQUE7SUFBQWdRLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFdBQUEsRUFFVyxZQUFNO01BQ2hCLElBQU13SSxPQUFPLEdBQUdDLE1BQU0sQ0FBQ3pJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsQ0FBQyxDQUFBO0FBQ3RDLE1BQUEsT0FBT3FZLE9BQU8sS0FBSyxDQUFDLElBQUlBLE9BQU8sS0FBSyxDQUFDLENBQUE7S0FDdEMsQ0FBQSxDQUFBO0lBQUFySSxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLEVBRWMsWUFBTTtNQUNuQixPQUNFQSxLQUFBLENBQUtuUixLQUFLLENBQUN3RSxLQUFLLEtBQUtTLFNBQVMsSUFDOUIsQ0FBQ2tNLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3dFLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLaUMsUUFBUSxDQUFDMEssS0FBQSxDQUFLblIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLENBQUE7S0FFM0QsQ0FBQSxDQUFBO0lBQUFnUSxlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBRWUsWUFBTTtNQUNwQixPQUNFQSxLQUFBLENBQUtuUixLQUFLLENBQUN3RSxLQUFLLEtBQUtTLFNBQVMsSUFDOUIsQ0FBQ3dCLFFBQVEsQ0FBQzBLLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUs2UCxLQUFBLENBQUtuUixLQUFLLENBQUN3RSxLQUFLLENBQUE7S0FFM0QsQ0FBQSxDQUFBO0lBQUE4TSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsWUFBQTtBQUFBLE1BQUEsT0FBTUEsS0FBQSxDQUFLck8sU0FBUyxDQUFDakcsT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUF5VSxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRWpDLFlBQU07QUFDakIsTUFBQSxJQUFJQSxLQUFBLENBQUtuUixLQUFLLENBQUNnWSxlQUFlLEVBQUU7QUFBQSxRQUFBLElBQUE2QixzQkFBQSxDQUFBO0FBQzlCLFFBQUEsT0FBQSxDQUFBQSxzQkFBQSxHQUFPMUksS0FBQSxDQUFLblIsS0FBSyxDQUFDaVksYUFBYSxNQUFBNEIsSUFBQUEsSUFBQUEsc0JBQUEsdUJBQXhCQSxzQkFBQSxDQUEwQnBVLElBQUksQ0FBQyxVQUFDdkcsSUFBSSxFQUFBO0FBQUEsVUFBQSxPQUN6Q2lTLEtBQUEsQ0FBSytHLGVBQWUsQ0FBQ2haLElBQUksQ0FBQyxDQUFBO0FBQUEsU0FDNUIsQ0FBQyxDQUFBO0FBQ0gsT0FBQTtNQUNBLE9BQU9pUyxLQUFBLENBQUsrRyxlQUFlLENBQUMvRyxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUMsQ0FBQTtLQUNqRCxDQUFBLENBQUE7QUFBQTdHLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVlLGVBQUEsRUFBQSxVQUFDalMsSUFBSSxFQUFLO0FBQ3hCLE1BQUEsSUFBTTRhLFlBQVksR0FBRzNJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhaLFlBQVksR0FDeEMzSSxLQUFBLENBQUtuUixLQUFLLENBQUM4WixZQUFZLENBQUM1YSxJQUFJLENBQUMsR0FDN0IrRixTQUFTLENBQUE7QUFDYixNQUFBLE9BQU8rTyxJQUFJLENBQ1QsdUJBQXVCLEVBQ3ZCOEYsWUFBWSxFQUNaLHlCQUF5QixHQUFHelksZ0JBQWdCLENBQUM4UCxLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLENBQUMsRUFDNUQ7QUFDRSxRQUFBLGlDQUFpQyxFQUFFNlAsS0FBQSxDQUFLb0csVUFBVSxFQUFFO0FBQ3BELFFBQUEsaUNBQWlDLEVBQUVwRyxLQUFBLENBQUs0SSxVQUFVLEVBQUU7QUFDcEQsUUFBQSxpQ0FBaUMsRUFBRTVJLEtBQUEsQ0FBSzZJLFVBQVUsRUFBRTtBQUNwRCxRQUFBLDBDQUEwQyxFQUFFN0ksS0FBQSxDQUFLOEksa0JBQWtCLEVBQUU7QUFDckUsUUFBQSxvQ0FBb0MsRUFBRTlJLEtBQUEsQ0FBSytJLFlBQVksRUFBRTtBQUN6RCxRQUFBLGtDQUFrQyxFQUFFL0ksS0FBQSxDQUFLZ0osVUFBVSxFQUFFO0FBQ3JELFFBQUEsaUNBQWlDLEVBQUVoSixLQUFBLENBQUtILFNBQVMsRUFBRTtBQUNuRCxRQUFBLDJDQUEyQyxFQUFFRyxLQUFBLENBQUtrSSxrQkFBa0IsRUFBRTtBQUN0RSxRQUFBLDhDQUE4QyxFQUM1Q2xJLEtBQUEsQ0FBS2lKLHFCQUFxQixFQUFFO0FBQzlCLFFBQUEsNENBQTRDLEVBQzFDakosS0FBQSxDQUFLa0osbUJBQW1CLEVBQUU7QUFDNUIsUUFBQSw4QkFBOEIsRUFBRWxKLEtBQUEsQ0FBS21KLFlBQVksRUFBRTtBQUNuRCxRQUFBLGdDQUFnQyxFQUFFbkosS0FBQSxDQUFLb0osU0FBUyxFQUFFO1FBQ2xELHNDQUFzQyxFQUNwQ3BKLEtBQUEsQ0FBS3FKLFlBQVksRUFBRSxJQUFJckosS0FBQSxDQUFLc0osYUFBYSxFQUFDO0FBQzlDLE9BQUMsRUFDRHRKLEtBQUEsQ0FBS3VKLG1CQUFtQixDQUFDLG9DQUFvQyxDQUFDLEVBQzlEdkosS0FBQSxDQUFLd0osZ0JBQWdCLEVBQ3ZCLENBQUMsQ0FBQTtLQUNGLENBQUEsQ0FBQTtJQUFBckosZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07QUFDbkIsTUFBQSxJQUFBeUosWUFBQSxHQUlJekosS0FBQSxDQUFLblIsS0FBSztRQUhac0IsR0FBRyxHQUFBc1osWUFBQSxDQUFIdFosR0FBRztRQUFBdVoscUJBQUEsR0FBQUQsWUFBQSxDQUNIRSwwQkFBMEI7QUFBMUJBLFFBQUFBLDBCQUEwQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLFFBQVEsR0FBQUEscUJBQUE7UUFBQUUsc0JBQUEsR0FBQUgsWUFBQSxDQUNyQ0ksMkJBQTJCO0FBQTNCQSxRQUFBQSwyQkFBMkIsR0FBQUQsc0JBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxlQUFlLEdBQUFBLHNCQUFBLENBQUE7QUFHL0MsTUFBQSxJQUFNRSxNQUFNLEdBQ1Y5SixLQUFBLENBQUtvRyxVQUFVLEVBQUUsSUFBSXBHLEtBQUEsQ0FBSzRJLFVBQVUsRUFBRSxHQUNsQ2lCLDJCQUEyQixHQUMzQkYsMEJBQTBCLENBQUE7QUFFaEMsTUFBQSxPQUFBLEVBQUEsQ0FBQXBiLE1BQUEsQ0FBVXViLE1BQU0sRUFBQXZiLEdBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBSW5CLFVBQVUsQ0FBQytDLEdBQUcsRUFBRSxNQUFNLEVBQUU2UCxLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFNLENBQUMsQ0FBQSxDQUFBO0tBQy9ELENBQUEsQ0FBQTtBQUVEO0lBQUErVCxlQUFBLENBQUFILEtBQUEsRUFBQSxVQUFBLEVBQ1csWUFBTTtBQUNmLE1BQUEsSUFBQStKLGFBQUEsR0FBb0QvSixLQUFBLENBQUtuUixLQUFLO1FBQXREc0IsR0FBRyxHQUFBNFosYUFBQSxDQUFINVosR0FBRztRQUFBNloscUJBQUEsR0FBQUQsYUFBQSxDQUFFeEMsUUFBUTtRQUFSQSxRQUFRLEdBQUF5QyxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLElBQUkzTyxHQUFHLEVBQUUsR0FBQTJPLHFCQUFBO1FBQUVoVyxZQUFZLEdBQUErVixhQUFBLENBQVovVixZQUFZLENBQUE7QUFDL0MsTUFBQSxJQUFNaVcsU0FBUyxHQUFHN2MsVUFBVSxDQUFDK0MsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFBO01BQy9DLElBQU0rWixNQUFNLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLE1BQUEsSUFBSTNDLFFBQVEsQ0FBQ0MsR0FBRyxDQUFDeUMsU0FBUyxDQUFDLEVBQUU7QUFDM0JDLFFBQUFBLE1BQU0sQ0FBQ3BPLElBQUksQ0FBQXFPLEtBQUEsQ0FBWEQsTUFBTSxFQUFBaE4sa0JBQUEsQ0FBU3FLLFFBQVEsQ0FBQzNMLEdBQUcsQ0FBQ3FPLFNBQVMsQ0FBQyxDQUFDRyxZQUFZLENBQUMsQ0FBQSxDQUFBO0FBQ3RELE9BQUE7QUFDQSxNQUFBLElBQUlwSyxLQUFBLENBQUs0SSxVQUFVLEVBQUUsRUFBRTtBQUNyQnNCLFFBQUFBLE1BQU0sQ0FBQ3BPLElBQUksQ0FDVDlILFlBQVksS0FBWkEsSUFBQUEsSUFBQUEsWUFBWSxLQUFaQSxLQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxDQUFBQSxHQUFBQSxZQUFZLENBQ1I2RyxNQUFNLENBQUMsVUFBQ3RHLFdBQVcsRUFBQTtBQUFBLFVBQUEsT0FDbkI1QyxTQUFTLENBQUM0QyxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLENBQUN4RyxJQUFJLEdBQUd3RyxXQUFXLEVBQUVwRSxHQUFHLENBQUMsQ0FBQTtBQUFBLFNBQ25FLENBQUMsQ0FDQTdDLEdBQUcsQ0FBQyxVQUFDaUgsV0FBVyxFQUFBO1VBQUEsT0FBS0EsV0FBVyxDQUFDOFYsT0FBTyxDQUFBO0FBQUEsU0FBQSxDQUM3QyxDQUFDLENBQUE7QUFDSCxPQUFBO0FBQ0EsTUFBQSxPQUFPSCxNQUFNLENBQUN0YyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDekIsQ0FBQSxDQUFBO0FBQUF1UyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsVUFBQ2dILFFBQVEsRUFBRUMsWUFBWSxFQUFLO01BQ3hDLElBQU1xRCxXQUFXLEdBQUd0RCxRQUFRLElBQUloSCxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUE7TUFDbkQsSUFBTXVELGVBQWUsR0FBR3RELFlBQVksSUFBSWpILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29ZLFlBQVksQ0FBQTtNQUMvRCxJQUFNdUQsUUFBUSxHQUNaLEVBQ0V4SyxLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFjLEtBQ3hCbEgsS0FBQSxDQUFLblIsS0FBSyxDQUFDNGIsY0FBYyxJQUFJLENBQUN6SyxLQUFBLENBQUswSyxhQUFhLEVBQUUsQ0FBQyxDQUNyRCxLQUNBMUssS0FBQSxDQUFLOEksa0JBQWtCLEVBQUUsSUFDdkI5SSxLQUFBLENBQUtyTyxTQUFTLENBQUMyWSxXQUFXLENBQUMsSUFDMUIzWSxTQUFTLENBQUM0WSxlQUFlLEVBQUVELFdBQVcsQ0FBRSxDQUFDLEdBQ3pDLENBQUMsR0FDRCxDQUFDLENBQUMsQ0FBQTtBQUVSLE1BQUEsT0FBT0UsUUFBUSxDQUFBO0tBQ2hCLENBQUEsQ0FBQTtBQUVEO0FBQ0E7QUFDQTtJQUFBckssZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFDaUIsWUFBb0I7QUFBQSxNQUFBLElBQUEySyxtQkFBQSxDQUFBO0FBQUEsTUFBQSxJQUFuQkMsU0FBUyxHQUFBL1csU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO01BQzlCLElBQUlnWCxjQUFjLEdBQUcsS0FBSyxDQUFBO0FBQzFCO0FBQ0E7TUFDQSxJQUNFN0ssS0FBQSxDQUFLOEssV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUN4QixDQUFDRixTQUFTLENBQUNHLGNBQWMsSUFDekIvSyxLQUFBLENBQUtyTyxTQUFTLENBQUNxTyxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUMsRUFDdkM7QUFDQTtBQUNBLFFBQUEsSUFBSSxDQUFDK0QsUUFBUSxDQUFDQyxhQUFhLElBQUlELFFBQVEsQ0FBQ0MsYUFBYSxLQUFLRCxRQUFRLENBQUNFLElBQUksRUFBRTtBQUN2RUwsVUFBQUEsY0FBYyxHQUFHLElBQUksQ0FBQTtBQUN2QixTQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBQSxJQUFJN0ssS0FBQSxDQUFLblIsS0FBSyxDQUFDc2MsTUFBTSxJQUFJLENBQUNuTCxLQUFBLENBQUtuUixLQUFLLENBQUN1YyxvQkFBb0IsRUFBRTtBQUN6RFAsVUFBQUEsY0FBYyxHQUFHLEtBQUssQ0FBQTtBQUN4QixTQUFBO0FBQ0E7QUFDQSxRQUFBLElBQ0U3SyxLQUFBLENBQUtuUixLQUFLLENBQUN3YyxZQUFZLElBQ3ZCckwsS0FBQSxDQUFLblIsS0FBSyxDQUFDd2MsWUFBWSxDQUFDckosT0FBTyxJQUMvQmhDLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3djLFlBQVksQ0FBQ3JKLE9BQU8sQ0FBQ3NKLFFBQVEsQ0FBQ04sUUFBUSxDQUFDQyxhQUFhLENBQUMsSUFDaEVELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDTSxTQUFTLENBQUNELFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUNsRTtBQUNBVCxVQUFBQSxjQUFjLEdBQUcsSUFBSSxDQUFBO0FBQ3ZCLFNBQUE7QUFDQTtRQUNBLElBQUk3SyxLQUFBLENBQUtuUixLQUFLLENBQUMyYywwQkFBMEIsSUFBSXhMLEtBQUEsQ0FBS3FKLFlBQVksRUFBRSxFQUFFO0FBQ2hFd0IsVUFBQUEsY0FBYyxHQUFHLEtBQUssQ0FBQTtBQUN4QixTQUFBO1FBQ0EsSUFBSTdLLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRjLDRCQUE0QixJQUFJekwsS0FBQSxDQUFLc0osYUFBYSxFQUFFLEVBQUU7QUFDbkV1QixVQUFBQSxjQUFjLEdBQUcsS0FBSyxDQUFBO0FBQ3hCLFNBQUE7QUFDRixPQUFBO0FBRUFBLE1BQUFBLGNBQWMsS0FBQUYsQ0FBQUEsbUJBQUEsR0FBSTNLLEtBQUEsQ0FBSzBMLEtBQUssQ0FBQzFKLE9BQU8sTUFBQSxJQUFBLElBQUEySSxtQkFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFsQkEsbUJBQUEsQ0FBb0JnQixLQUFLLENBQUM7QUFBRUMsUUFBQUEsYUFBYSxFQUFFLElBQUE7QUFBSyxPQUFDLENBQUMsQ0FBQSxDQUFBO0tBQ3JFLENBQUEsQ0FBQTtJQUFBekwsZUFBQSxDQUFBSCxLQUFBLEVBQUEsbUJBQUEsRUFFbUIsWUFBTTtBQUN4QixNQUFBLElBQUlBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJjLDBCQUEwQixJQUFJeEwsS0FBQSxDQUFLcUosWUFBWSxFQUFFLEVBQzlELE9BQU8sSUFBSSxDQUFBO0FBQ2IsTUFBQSxJQUFJckosS0FBQSxDQUFLblIsS0FBSyxDQUFDNGMsNEJBQTRCLElBQUl6TCxLQUFBLENBQUtzSixhQUFhLEVBQUUsRUFDakUsT0FBTyxJQUFJLENBQUE7QUFDYixNQUFBLE9BQU90SixLQUFBLENBQUtuUixLQUFLLENBQUNnZCxpQkFBaUIsR0FDL0I3TCxLQUFBLENBQUtuUixLQUFLLENBQUNnZCxpQkFBaUIsQ0FBQ3hOLE9BQU8sQ0FBQzJCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsQ0FBQyxFQUFFNlAsS0FBQSxDQUFLblIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLEdBQ3JFa08sT0FBTyxDQUFDMkIsS0FBQSxDQUFLblIsS0FBSyxDQUFDc0IsR0FBRyxDQUFDLENBQUE7S0FDNUIsQ0FBQSxDQUFBO0lBQUFnUSxlQUFBLENBQUFILEtBQUEsRUFFUSxRQUFBLEVBQUEsWUFBQTtNQUFBLG9CQUNQUSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7UUFDRXFDLEdBQUcsRUFBRTlDLEtBQUEsQ0FBSzBMLEtBQU07UUFDaEJ2UCxTQUFTLEVBQUU2RCxLQUFBLENBQUs4TCxhQUFhLENBQUM5TCxLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLENBQUU7UUFDOUM0YixTQUFTLEVBQUUvTCxLQUFBLENBQUt3RyxlQUFnQjtRQUNoQzlGLE9BQU8sRUFBRVYsS0FBQSxDQUFLZ00sV0FBWTtBQUMxQjNGLFFBQUFBLFlBQVksRUFDVixDQUFDckcsS0FBQSxDQUFLblIsS0FBSyxDQUFDb2QsZUFBZSxHQUFHak0sS0FBQSxDQUFLa00sZ0JBQWdCLEdBQUdwWSxTQUN2RDtRQUNEcVksY0FBYyxFQUNabk0sS0FBQSxDQUFLblIsS0FBSyxDQUFDb2QsZUFBZSxHQUFHak0sS0FBQSxDQUFLa00sZ0JBQWdCLEdBQUdwWSxTQUN0RDtBQUNEMFcsUUFBQUEsUUFBUSxFQUFFeEssS0FBQSxDQUFLOEssV0FBVyxFQUFHO0FBQzdCLFFBQUEsWUFBQSxFQUFZOUssS0FBQSxDQUFLb00sWUFBWSxFQUFHO0FBQ2hDQyxRQUFBQSxJQUFJLEVBQUMsUUFBUTtBQUNiQyxRQUFBQSxLQUFLLEVBQUV0TSxLQUFBLENBQUt1TSxRQUFRLEVBQUc7QUFDdkIsUUFBQSxlQUFBLEVBQWV2TSxLQUFBLENBQUtvRyxVQUFVLEVBQUc7UUFDakMsY0FBY3BHLEVBQUFBLEtBQUEsQ0FBS21KLFlBQVksRUFBRSxHQUFHLE1BQU0sR0FBR3JWLFNBQVU7UUFDdkQsZUFBZWtNLEVBQUFBLEtBQUEsQ0FBSzZJLFVBQVUsRUFBRSxJQUFJN0ksS0FBQSxDQUFLSCxTQUFTLEVBQUM7QUFBRSxPQUFBLEVBRXBERyxLQUFBLENBQUs2TCxpQkFBaUIsRUFBRSxFQUN4QjdMLEtBQUEsQ0FBS3VNLFFBQVEsRUFBRSxLQUFLLEVBQUUsaUJBQ3JCL0wsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU10RSxRQUFBQSxTQUFTLEVBQUMsU0FBQTtBQUFTLE9BQUEsRUFBRTZELEtBQUEsQ0FBS3VNLFFBQVEsRUFBUyxDQUVoRCxDQUFDLENBQUE7S0FDUCxDQUFBLENBQUE7QUFBQSxJQUFBLE9BQUF2TSxLQUFBLENBQUE7QUFBQSxHQUFBO0VBQUE0QixTQUFBLENBQUF1RSxHQUFBLEVBQUFwRyxnQkFBQSxDQUFBLENBQUE7RUFBQSxPQUFBOEIsWUFBQSxDQUFBc0UsR0FBQSxFQUFBLENBQUE7SUFBQXpLLEdBQUEsRUFBQSxtQkFBQTtJQUFBL1AsS0FBQSxFQXhZRCxTQUFBbVcsaUJBQUFBLEdBQW9CO01BQ2xCLElBQUksQ0FBQzBLLGNBQWMsRUFBRSxDQUFBO0FBQ3ZCLEtBQUE7QUFBQyxHQUFBLEVBQUE7SUFBQTlRLEdBQUEsRUFBQSxvQkFBQTtBQUFBL1AsSUFBQUEsS0FBQSxFQUVELFNBQUE4Z0Isa0JBQW1CN0IsQ0FBQUEsU0FBUyxFQUFFO0FBQzVCLE1BQUEsSUFBSSxDQUFDNEIsY0FBYyxDQUFDNUIsU0FBUyxDQUFDLENBQUE7QUFDaEMsS0FBQTtBQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7QUFBQSxDQTFEOEJwSyxDQUFBQSxLQUFLLENBQUN3QyxTQUFTLENBQUE7O0FDakJQLElBRXBCMEosVUFBVSwwQkFBQTNNLGdCQUFBLEVBQUE7QUFBQSxFQUFBLFNBQUEyTSxVQUFBLEdBQUE7QUFBQSxJQUFBLElBQUExTSxLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBeU0sVUFBQSxDQUFBLENBQUE7QUFBQSxJQUFBLEtBQUEsSUFBQXRKLElBQUEsR0FBQXZQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXdWLElBQUEsR0FBQXpXLElBQUFBLEtBQUEsQ0FBQXdXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0FBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBelAsR0FBQUEsU0FBQSxDQUFBeVAsSUFBQSxDQUFBLENBQUE7QUFBQSxLQUFBO0FBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUF3TSxVQUFBLEVBQUFuZSxFQUFBQSxDQUFBQSxNQUFBLENBQUE4VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxjQUFBLGVBa0NkUSxLQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQSxDQUFBO0FBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFbEIsYUFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztBQUN2QixNQUFBLElBQUlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzZSLE9BQU8sRUFBRTtBQUN0QlYsUUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDNlIsT0FBTyxDQUFDbkIsS0FBSyxDQUFDLENBQUE7QUFDM0IsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7QUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDN0QsR0FBRyxDQUFBO01BQzFCLElBQUk0SyxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ3BCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7UUFDdEJoSCxLQUFLLENBQUM3RCxHQUFHLEdBQUcsT0FBTyxDQUFBO0FBQ3JCLE9BQUE7QUFFQXNFLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJYLGVBQWUsQ0FBQ2pILEtBQUssQ0FBQyxDQUFBO0tBQ2xDLENBQUEsQ0FBQTtJQUFBWSxlQUFBLENBQUFILEtBQUEsRUFFb0Isb0JBQUEsRUFBQSxZQUFBO0FBQUEsTUFBQSxPQUNuQixDQUFDQSxLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMEIsSUFDdEMsQ0FBQ2hWLFNBQVMsQ0FBQ3FPLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2QsSUFBSSxFQUFFaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxDQUFDLElBQ2hEclYsU0FBUyxDQUFDcU8sS0FBQSxDQUFLblIsS0FBSyxDQUFDZCxJQUFJLEVBQUVpUyxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUE5RyxlQUFBLENBQUFILEtBQUEsRUFFdkMsYUFBQSxFQUFBLFlBQUE7TUFBQSxPQUNaQSxLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFjLElBQ3pCbEgsS0FBQSxDQUFLblIsS0FBSyxDQUFDNGIsY0FBYyxLQUN4QnpLLEtBQUEsQ0FBSzhJLGtCQUFrQixFQUFFLElBQ3ZCblgsU0FBUyxDQUFDcU8sS0FBQSxDQUFLblIsS0FBSyxDQUFDZCxJQUFJLEVBQUVpUyxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUMsSUFDOUNyVixTQUFTLENBQUNxTyxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLEVBQUVqSCxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUUsQ0FBQyxHQUN6RCxDQUFDLEdBQ0QsQ0FBQyxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUVSO0FBQ0E7QUFDQTtJQUFBN0csZUFBQSxDQUFBSCxLQUFBLEVBQUEsdUJBQUEsRUFDd0IsWUFBb0I7QUFBQSxNQUFBLElBQW5CNEssU0FBUyxHQUFBL1csU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsRUFBRSxDQUFBO01BQ3JDLElBQUk4WSxxQkFBcUIsR0FBRyxLQUFLLENBQUE7QUFDakM7QUFDQTtNQUNBLElBQ0UzTSxLQUFBLENBQUs4SyxXQUFXLEVBQUUsS0FBSyxDQUFDLElBQ3hCLENBQUNGLFNBQVMsQ0FBQ0csY0FBYyxJQUN6QnBaLFNBQVMsQ0FBQ3FPLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2QsSUFBSSxFQUFFaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBWSxDQUFDLEVBQ25EO0FBQ0E7QUFDQSxRQUFBLElBQUksQ0FBQytELFFBQVEsQ0FBQ0MsYUFBYSxJQUFJRCxRQUFRLENBQUNDLGFBQWEsS0FBS0QsUUFBUSxDQUFDRSxJQUFJLEVBQUU7QUFDdkV5QixVQUFBQSxxQkFBcUIsR0FBRyxJQUFJLENBQUE7QUFDOUIsU0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUEsSUFBSTNNLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NjLE1BQU0sSUFBSSxDQUFDbkwsS0FBQSxDQUFLblIsS0FBSyxDQUFDdWMsb0JBQW9CLEVBQUU7QUFDekR1QixVQUFBQSxxQkFBcUIsR0FBRyxLQUFLLENBQUE7QUFDL0IsU0FBQTtBQUNBO0FBQ0EsUUFBQSxJQUNFM00sS0FBQSxDQUFLblIsS0FBSyxDQUFDd2MsWUFBWSxJQUN2QnJMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3djLFlBQVksQ0FBQ3JKLE9BQU8sSUFDL0JoQyxLQUFBLENBQUtuUixLQUFLLENBQUN3YyxZQUFZLENBQUNySixPQUFPLENBQUNzSixRQUFRLENBQUNOLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLElBQ2hFRCxRQUFRLENBQUNDLGFBQWEsSUFDdEJELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDTSxTQUFTLENBQUNELFFBQVEsQ0FDdkMsK0JBQ0YsQ0FBQyxFQUNEO0FBQ0FxQixVQUFBQSxxQkFBcUIsR0FBRyxJQUFJLENBQUE7QUFDOUIsU0FBQTtBQUNGLE9BQUE7QUFFQUEsTUFBQUEscUJBQXFCLElBQ25CM00sS0FBQSxDQUFLNE0sWUFBWSxDQUFDNUssT0FBTyxJQUN6QmhDLEtBQUEsQ0FBSzRNLFlBQVksQ0FBQzVLLE9BQU8sQ0FBQzJKLEtBQUssQ0FBQztBQUFFQyxRQUFBQSxhQUFhLEVBQUUsSUFBQTtBQUFLLE9BQUMsQ0FBQyxDQUFBO0tBQzNELENBQUEsQ0FBQTtBQUFBLElBQUEsT0FBQTVMLEtBQUEsQ0FBQTtBQUFBLEdBQUE7RUFBQTRCLFNBQUEsQ0FBQThLLFVBQUEsRUFBQTNNLGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUE2SyxVQUFBLEVBQUEsQ0FBQTtJQUFBaFIsR0FBQSxFQUFBLG1CQUFBO0lBQUEvUCxLQUFBLEVBL0VELFNBQUFtVyxpQkFBQUEsR0FBb0I7TUFDbEIsSUFBSSxDQUFDK0sscUJBQXFCLEVBQUUsQ0FBQTtBQUM5QixLQUFBO0FBQUMsR0FBQSxFQUFBO0lBQUFuUixHQUFBLEVBQUEsb0JBQUE7QUFBQS9QLElBQUFBLEtBQUEsRUFFRCxTQUFBOGdCLGtCQUFtQjdCLENBQUFBLFNBQVMsRUFBRTtBQUM1QixNQUFBLElBQUksQ0FBQ2lDLHFCQUFxQixDQUFDakMsU0FBUyxDQUFDLENBQUE7QUFDdkMsS0FBQTtBQUFDLEdBQUEsRUFBQTtJQUFBbFAsR0FBQSxFQUFBLFFBQUE7SUFBQS9QLEtBQUEsRUEyRUQsU0FBQWdYLE1BQUFBLEdBQVM7QUFDUCxNQUFBLElBQUF5RSxXQUFBLEdBQTJELElBQUksQ0FBQ3ZZLEtBQUs7UUFBN0RpZSxVQUFVLEdBQUExRixXQUFBLENBQVYwRixVQUFVO1FBQUFDLHFCQUFBLEdBQUEzRixXQUFBLENBQUU0RixlQUFlO0FBQWZBLFFBQUFBLGVBQWUsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxPQUFPLEdBQUFBLHFCQUFBO1FBQUVyTSxPQUFPLEdBQUEwRyxXQUFBLENBQVAxRyxPQUFPLENBQUE7QUFFdEQsTUFBQSxJQUFNdU0saUJBQWlCLEdBQUc7QUFDeEIsUUFBQSwrQkFBK0IsRUFBRSxJQUFJO1FBQ3JDLDBDQUEwQyxFQUFFLENBQUMsQ0FBQ3ZNLE9BQU87QUFDckQsUUFBQSx5Q0FBeUMsRUFDdkMsQ0FBQyxDQUFDQSxPQUFPLElBQUkvTyxTQUFTLENBQUMsSUFBSSxDQUFDOUMsS0FBSyxDQUFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDYyxLQUFLLENBQUNtWSxRQUFRLENBQUM7QUFDOUQsUUFBQSxrREFBa0QsRUFDaEQsSUFBSSxDQUFDOEIsa0JBQWtCLEVBQUM7T0FDM0IsQ0FBQTtNQUNELG9CQUNFdEksS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1FBQ0VxQyxHQUFHLEVBQUUsSUFBSSxDQUFDOEosWUFBYTtBQUN2QnpRLFFBQUFBLFNBQVMsRUFBRTBHLElBQUksQ0FBQ29LLGlCQUFpQixDQUFFO1FBQ25DLFlBQUExZSxFQUFBQSxFQUFBQSxDQUFBQSxNQUFBLENBQWV5ZSxlQUFlLEVBQUF6ZSxHQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQUksSUFBSSxDQUFDTSxLQUFLLENBQUNpZSxVQUFVLENBQUc7UUFDMURwTSxPQUFPLEVBQUUsSUFBSSxDQUFDc0wsV0FBWTtRQUMxQkQsU0FBUyxFQUFFLElBQUksQ0FBQ3ZGLGVBQWdCO0FBQ2hDZ0UsUUFBQUEsUUFBUSxFQUFFLElBQUksQ0FBQ00sV0FBVyxFQUFDO0FBQUUsT0FBQSxFQUU1QmdDLFVBQ0UsQ0FBQyxDQUFBO0FBRVYsS0FBQTtBQUFDLEdBQUEsQ0FBQSxFQUFBLENBQUE7SUFBQXBSLEdBQUEsRUFBQSxjQUFBO0lBQUFFLEdBQUEsRUFqSUQsU0FBQUEsR0FBQUEsR0FBMEI7TUFDeEIsT0FBTztBQUNMb1IsUUFBQUEsZUFBZSxFQUFFLE9BQUE7T0FDbEIsQ0FBQTtBQUNILEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0FMcUN4TSxDQUFBQSxLQUFLLENBQUN3QyxTQUFTLENBQUE7O0FDQ29CLElBRXREa0ssSUFBSSwwQkFBQW5OLGdCQUFBLEVBQUE7QUFBQSxFQUFBLFNBQUFtTixJQUFBLEdBQUE7QUFBQSxJQUFBLElBQUFsTixLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBaU4sSUFBQSxDQUFBLENBQUE7QUFBQSxJQUFBLEtBQUEsSUFBQTlKLElBQUEsR0FBQXZQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXdWLElBQUEsR0FBQXpXLElBQUFBLEtBQUEsQ0FBQXdXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0FBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBelAsR0FBQUEsU0FBQSxDQUFBeVAsSUFBQSxDQUFBLENBQUE7QUFBQSxLQUFBO0FBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFnTixJQUFBLEVBQUEzZSxFQUFBQSxDQUFBQSxNQUFBLENBQUE4VSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUFsRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQTBFTixVQUFDN1AsR0FBRyxFQUFFb1AsS0FBSyxFQUFLO0FBQy9CLE1BQUEsSUFBSVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDc2UsVUFBVSxFQUFFO1FBQ3pCbk4sS0FBQSxDQUFLblIsS0FBSyxDQUFDc2UsVUFBVSxDQUFDaGQsR0FBRyxFQUFFb1AsS0FBSyxDQUFDLENBQUE7QUFDbkMsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBWSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDN1AsR0FBRyxFQUFLO0FBQzdCLE1BQUEsSUFBSTZQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3VlLGVBQWUsRUFBRTtBQUM5QnBOLFFBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3VlLGVBQWUsQ0FBQ2pkLEdBQUcsQ0FBQyxDQUFBO0FBQ2pDLE9BQUE7S0FDRCxDQUFBLENBQUE7SUFBQWdRLGVBQUEsQ0FBQUgsS0FBQSxFQUVpQixpQkFBQSxFQUFBLFVBQUM3UCxHQUFHLEVBQUUyYyxVQUFVLEVBQUV2TixLQUFLLEVBQUs7TUFDNUMsSUFBSSxPQUFPUyxLQUFBLENBQUtuUixLQUFLLENBQUN3ZSxZQUFZLEtBQUssVUFBVSxFQUFFO1FBQ2pEck4sS0FBQSxDQUFLblIsS0FBSyxDQUFDd2UsWUFBWSxDQUFDbGQsR0FBRyxFQUFFMmMsVUFBVSxFQUFFdk4sS0FBSyxDQUFDLENBQUE7QUFDakQsT0FBQTtBQUNBLE1BQUEsSUFBSVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDcVksY0FBYyxFQUFFO0FBQzdCbEgsUUFBQUEsS0FBQSxDQUFLc04sY0FBYyxDQUFDbmQsR0FBRyxFQUFFb1AsS0FBSyxDQUFDLENBQUE7QUFDakMsT0FBQTtBQUNBLE1BQUEsSUFBSVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDMGUsbUJBQW1CLEVBQUU7QUFDbEN2TixRQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUN5VixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDM0IsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBbkUsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQ2pTLElBQUksRUFBSztBQUMzQixNQUFBLElBQUlpUyxLQUFBLENBQUtuUixLQUFLLENBQUMyZSxnQkFBZ0IsRUFBRTtBQUMvQixRQUFBLE9BQU94TixLQUFBLENBQUtuUixLQUFLLENBQUMyZSxnQkFBZ0IsQ0FBQ3pmLElBQUksQ0FBQyxDQUFBO0FBQzFDLE9BQUE7TUFDQSxPQUFPaUMsT0FBTyxDQUFDakMsSUFBSSxDQUFDLENBQUE7S0FDckIsQ0FBQSxDQUFBO0lBQUFvUyxlQUFBLENBQUFILEtBQUEsRUFBQSxZQUFBLEVBRVksWUFBTTtBQUNqQixNQUFBLElBQU14UCxXQUFXLEdBQUd3UCxLQUFBLENBQUt4UCxXQUFXLEVBQUUsQ0FBQTtNQUN0QyxJQUFNaWQsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNmLE1BQUEsSUFBTVgsVUFBVSxHQUFHOU0sS0FBQSxDQUFLd04sZ0JBQWdCLENBQUNoZCxXQUFXLENBQUMsQ0FBQTtBQUNyRCxNQUFBLElBQUl3UCxLQUFBLENBQUtuUixLQUFLLENBQUM0YixjQUFjLEVBQUU7UUFDN0IsSUFBTWlELGFBQWEsR0FDakIxTixLQUFBLENBQUtuUixLQUFLLENBQUN3ZSxZQUFZLElBQUlyTixLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFjLEdBQ2hEbEgsS0FBQSxDQUFLMk4sZUFBZSxDQUFDL00sSUFBSSxDQUFBWixLQUFBLEVBQU94UCxXQUFXLEVBQUVzYyxVQUFVLENBQUMsR0FDeERoWixTQUFTLENBQUE7QUFDZjJaLFFBQUFBLElBQUksQ0FBQzNSLElBQUksZUFDUDBFLEtBQUEsQ0FBQUMsYUFBQSxDQUFDaU0sVUFBVSxFQUFBO0FBQ1RoUixVQUFBQSxHQUFHLEVBQUMsR0FBRztBQUNQb1IsVUFBQUEsVUFBVSxFQUFFQSxVQUFXO0FBQ3ZCL2UsVUFBQUEsSUFBSSxFQUFFeUMsV0FBWTtBQUNsQmtRLFVBQUFBLE9BQU8sRUFBRWdOLGFBQWM7QUFDdkIxRyxVQUFBQSxRQUFRLEVBQUVoSCxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFTO0FBQzlCQyxVQUFBQSxZQUFZLEVBQUVqSCxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFhO0FBQ3RDK0YsVUFBQUEsZUFBZSxFQUFFaE4sS0FBQSxDQUFLblIsS0FBSyxDQUFDbWUsZUFBZ0I7QUFDNUM5RixVQUFBQSxjQUFjLEVBQUVsSCxLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFlO0FBQzFDdUQsVUFBQUEsY0FBYyxFQUFFekssS0FBQSxDQUFLblIsS0FBSyxDQUFDNGIsY0FBZTtBQUMxQzlELFVBQUFBLDBCQUEwQixFQUFFM0csS0FBQSxDQUFLblIsS0FBSyxDQUFDOFgsMEJBQTJCO0FBQ2xFSCxVQUFBQSxlQUFlLEVBQUV4RyxLQUFBLENBQUtuUixLQUFLLENBQUMyWCxlQUFnQjtBQUM1Q3VFLFVBQUFBLGNBQWMsRUFBRS9LLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2tjLGNBQWU7QUFDMUNNLFVBQUFBLFlBQVksRUFBRXJMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3djLFlBQUFBO0FBQWEsU0FDdkMsQ0FDSCxDQUFDLENBQUE7QUFDSCxPQUFBO01BQ0EsT0FBT29DLElBQUksQ0FBQ2xmLE1BQU0sQ0FDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQ2pCLEdBQUcsQ0FBQyxVQUFDc2dCLE1BQU0sRUFBSztBQUNwQyxRQUFBLElBQU16ZCxHQUFHLEdBQUcwZCxPQUFPLENBQUNyZCxXQUFXLEVBQUVvZCxNQUFNLENBQUMsQ0FBQTtBQUN4QyxRQUFBLG9CQUNFcE4sS0FBQSxDQUFBQyxhQUFBLENBQUMwRixHQUFHLEVBQUE7QUFDRndELFVBQUFBLDBCQUEwQixFQUFFM0osS0FBQSxDQUFLblIsS0FBSyxDQUFDaWYsd0JBQXlCO0FBQ2hFakUsVUFBQUEsMkJBQTJCLEVBQUU3SixLQUFBLENBQUtuUixLQUFLLENBQUNrZiwwQkFBMkI7QUFDbkVyUyxVQUFBQSxHQUFHLEVBQUV2TCxHQUFHLENBQUM2ZCxPQUFPLEVBQUc7QUFDbkI3ZCxVQUFBQSxHQUFHLEVBQUVBLEdBQUk7QUFDVGtELFVBQUFBLEtBQUssRUFBRTJNLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3dFLEtBQU07VUFDeEJxTixPQUFPLEVBQUVWLEtBQUEsQ0FBS3NOLGNBQWMsQ0FBQzFNLElBQUksQ0FBQVosS0FBQSxFQUFPN1AsR0FBRyxDQUFFO0FBQzdDOGIsVUFBQUEsZUFBZSxFQUFFak0sS0FBQSxDQUFLblIsS0FBSyxDQUFDb2QsZUFBZ0I7VUFDNUM1RixZQUFZLEVBQUVyRyxLQUFBLENBQUtpTyxtQkFBbUIsQ0FBQ3JOLElBQUksQ0FBQVosS0FBQSxFQUFPN1AsR0FBRyxDQUFFO0FBQ3ZEN0QsVUFBQUEsT0FBTyxFQUFFMFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDdkMsT0FBUTtBQUM1QnlILFVBQUFBLE9BQU8sRUFBRWlNLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2tGLE9BQVE7QUFDNUJ4RCxVQUFBQSxnQkFBZ0IsRUFBRXlQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBCLGdCQUFpQjtBQUM5Q3lELFVBQUFBLFlBQVksRUFBRWdNLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21GLFlBQWE7QUFDdENDLFVBQUFBLG9CQUFvQixFQUFFK0wsS0FBQSxDQUFLblIsS0FBSyxDQUFDb0Ysb0JBQXFCO0FBQ3REQyxVQUFBQSxZQUFZLEVBQUU4TCxLQUFBLENBQUtuUixLQUFLLENBQUNxRixZQUFhO0FBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRTZMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NGLG9CQUFxQjtBQUN0RCtHLFVBQUFBLGNBQWMsRUFBRThFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FNLGNBQWU7QUFDMUNxTSxVQUFBQSxRQUFRLEVBQUV2SCxLQUFBLENBQUtuUixLQUFLLENBQUMwWSxRQUFTO0FBQzlCUyxVQUFBQSxhQUFhLEVBQUVoSSxLQUFBLENBQUtuUixLQUFLLENBQUNtWixhQUFjO0FBQ3hDNVQsVUFBQUEsVUFBVSxFQUFFNEwsS0FBQSxDQUFLblIsS0FBSyxDQUFDdUYsVUFBVztBQUNsQzZTLFVBQUFBLFlBQVksRUFBRWpILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29ZLFlBQWE7QUFDdENELFVBQUFBLFFBQVEsRUFBRWhILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVM7QUFDOUJZLFVBQUFBLFlBQVksRUFBRTVILEtBQUEsQ0FBS25SLEtBQUssQ0FBQytZLFlBQWE7QUFDdENDLFVBQUFBLFVBQVUsRUFBRTdILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2daLFVBQVc7QUFDbENDLFVBQUFBLFlBQVksRUFBRTlILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2laLFlBQWE7QUFDdENaLFVBQUFBLGNBQWMsRUFBRWxILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FZLGNBQWU7QUFDMUN1RCxVQUFBQSxjQUFjLEVBQUV6SyxLQUFBLENBQUtuUixLQUFLLENBQUM0YixjQUFlO0FBQzFDMUMsVUFBQUEsMEJBQTBCLEVBQUUvSCxLQUFBLENBQUtuUixLQUFLLENBQUNrWiwwQkFBMkI7QUFDbEVsQixVQUFBQSxlQUFlLEVBQUU3RyxLQUFBLENBQUtuUixLQUFLLENBQUNnWSxlQUFnQjtBQUM1Q0MsVUFBQUEsYUFBYSxFQUFFOUcsS0FBQSxDQUFLblIsS0FBSyxDQUFDaVksYUFBYztBQUN4Q25ZLFVBQUFBLFNBQVMsRUFBRXFSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ0YsU0FBVTtBQUNoQ0MsVUFBQUEsT0FBTyxFQUFFb1IsS0FBQSxDQUFLblIsS0FBSyxDQUFDRCxPQUFRO0FBQzVCK1osVUFBQUEsWUFBWSxFQUFFM0ksS0FBQSxDQUFLblIsS0FBSyxDQUFDOFosWUFBYTtBQUN0Q2tELFVBQUFBLGlCQUFpQixFQUFFN0wsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ2QsaUJBQWtCO0FBQ2hEbEYsVUFBQUEsMEJBQTBCLEVBQUUzRyxLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMkI7QUFDbEVILFVBQUFBLGVBQWUsRUFBRXhHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJYLGVBQWdCO0FBQzVDdUUsVUFBQUEsY0FBYyxFQUFFL0ssS0FBQSxDQUFLblIsS0FBSyxDQUFDa2MsY0FBZTtBQUMxQ00sVUFBQUEsWUFBWSxFQUFFckwsS0FBQSxDQUFLblIsS0FBSyxDQUFDd2MsWUFBYTtBQUN0Q0YsVUFBQUEsTUFBTSxFQUFFbkwsS0FBQSxDQUFLblIsS0FBSyxDQUFDc2MsTUFBTztBQUMxQkMsVUFBQUEsb0JBQW9CLEVBQUVwTCxLQUFBLENBQUtuUixLQUFLLENBQUN1YyxvQkFBcUI7QUFDdERJLFVBQUFBLDBCQUEwQixFQUFFeEwsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmMsMEJBQTJCO0FBQ2xFQyxVQUFBQSw0QkFBNEIsRUFDMUJ6TCxLQUFBLENBQUtuUixLQUFLLENBQUM0Yyw0QkFDWjtBQUNEcmYsVUFBQUEsTUFBTSxFQUFFNFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDekMsTUFBQUE7QUFBTyxTQUMzQixDQUFDLENBQUE7QUFFTixPQUFDLENBQ0gsQ0FBQyxDQUFBO0tBQ0YsQ0FBQSxDQUFBO0lBQUErVCxlQUFBLENBQUFILEtBQUEsRUFFYSxhQUFBLEVBQUEsWUFBQTtBQUFBLE1BQUEsT0FDWjFQLGNBQWMsQ0FDWjBQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsRUFDZDZQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakI0VCxLQUFBLENBQUtuUixLQUFLLENBQUMwQixnQkFDYixDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtJQUFBNFAsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLG9CQUFBLEVBQUEsWUFBQTtBQUFBLE1BQUEsT0FDbkIsQ0FBQ0EsS0FBQSxDQUFLblIsS0FBSyxDQUFDOFgsMEJBQTBCLElBQ3RDLENBQUNoVixTQUFTLENBQUNxTyxLQUFBLENBQUt4UCxXQUFXLEVBQUUsRUFBRXdQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsQ0FBQyxJQUNuRHJWLFNBQVMsQ0FBQ3FPLEtBQUEsQ0FBS3hQLFdBQVcsRUFBRSxFQUFFd1AsS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBWSxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBLElBQUEsT0FBQWpILEtBQUEsQ0FBQTtBQUFBLEdBQUE7RUFBQTRCLFNBQUEsQ0FBQXNMLElBQUEsRUFBQW5OLGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUFxTCxJQUFBLEVBQUEsQ0FBQTtJQUFBeFIsR0FBQSxFQUFBLFFBQUE7SUFBQS9QLEtBQUEsRUFFeEQsU0FBQWdYLE1BQUFBLEdBQVM7QUFDUCxNQUFBLElBQU1zSyxpQkFBaUIsR0FBRztBQUN4QixRQUFBLHdCQUF3QixFQUFFLElBQUk7QUFDOUIsUUFBQSxrQ0FBa0MsRUFBRXRiLFNBQVMsQ0FDM0MsSUFBSSxDQUFDbkIsV0FBVyxFQUFFLEVBQ2xCLElBQUksQ0FBQzNCLEtBQUssQ0FBQ21ZLFFBQ2IsQ0FBQztBQUNELFFBQUEsMkNBQTJDLEVBQUUsSUFBSSxDQUFDOEIsa0JBQWtCLEVBQUM7T0FDdEUsQ0FBQTtNQUNELG9CQUFPdEksS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1FBQUt0RSxTQUFTLEVBQUUwRyxJQUFJLENBQUNvSyxpQkFBaUIsQ0FBQTtBQUFFLE9BQUEsRUFBRSxJQUFJLENBQUNpQixVQUFVLEVBQVEsQ0FBQyxDQUFBO0FBQzNFLEtBQUE7QUFBQyxHQUFBLENBQUEsRUFBQSxDQUFBO0lBQUF4UyxHQUFBLEVBQUEsY0FBQTtJQUFBRSxHQUFBLEVBaE5ELFNBQUFBLEdBQUFBLEdBQTBCO01BQ3hCLE9BQU87QUFDTDJSLFFBQUFBLG1CQUFtQixFQUFFLElBQUE7T0FDdEIsQ0FBQTtBQUNILEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0FMK0IvTSxDQUFBQSxLQUFLLENBQUN3QyxTQUFTLENBQUE7O0FDRmpELElBQU1tTCxnQ0FBZ0MsR0FBRyxDQUFDLENBQUE7QUFFMUMsSUFBTUMsb0JBQW9CLEdBQUc7QUFDM0JDLEVBQUFBLFdBQVcsRUFBRSxhQUFhO0FBQzFCQyxFQUFBQSxhQUFhLEVBQUUsZUFBZTtBQUM5QkMsRUFBQUEsWUFBWSxFQUFFLGNBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBQ0QsSUFBTUMsYUFBYSxHQUFBck8sZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FDaEJpTyxFQUFBQSxFQUFBQSxvQkFBb0IsQ0FBQ0MsV0FBVyxFQUFHO0FBQ2xDSSxFQUFBQSxJQUFJLEVBQUUsQ0FDSixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDVDtBQUNEQyxFQUFBQSx3QkFBd0IsRUFBRSxDQUFBO0FBQzVCLENBQUMsQ0FDQU4sRUFBQUEsb0JBQW9CLENBQUNFLGFBQWEsRUFBRztBQUNwQ0csRUFBQUEsSUFBSSxFQUFFLENBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1QsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUNaO0FBQ0RDLEVBQUFBLHdCQUF3QixFQUFFLENBQUE7QUFDNUIsQ0FBQyxDQUNBTixFQUFBQSxvQkFBb0IsQ0FBQ0csWUFBWSxFQUFHO0FBQ25DRSxFQUFBQSxJQUFJLEVBQUUsQ0FDSixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDZjtBQUNEQyxFQUFBQSx3QkFBd0IsRUFBRSxDQUFBO0FBQzVCLENBQUMsQ0FDRixDQUFBO0FBQ0QsSUFBTUMsa0NBQWtDLEdBQUcsQ0FBQyxDQUFBO0FBRTVDLFNBQVNDLHFCQUFxQkEsQ0FDNUJDLDZCQUE2QixFQUM3QkMsNEJBQTRCLEVBQzVCO0FBQ0EsRUFBQSxJQUFJRCw2QkFBNkIsRUFBRSxPQUFPVCxvQkFBb0IsQ0FBQ0csWUFBWSxDQUFBO0FBQzNFLEVBQUEsSUFBSU8sNEJBQTRCLEVBQUUsT0FBT1Ysb0JBQW9CLENBQUNDLFdBQVcsQ0FBQTtFQUN6RSxPQUFPRCxvQkFBb0IsQ0FBQ0UsYUFBYSxDQUFBO0FBQzNDLENBQUE7QUFBQyxJQUVvQlMsS0FBSywwQkFBQWhQLGdCQUFBLEVBQUE7QUFBQSxFQUFBLFNBQUFnUCxLQUFBLEdBQUE7QUFBQSxJQUFBLElBQUEvTyxLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBOE8sS0FBQSxDQUFBLENBQUE7QUFBQSxJQUFBLEtBQUEsSUFBQTNMLElBQUEsR0FBQXZQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXdWLElBQUEsR0FBQXpXLElBQUFBLEtBQUEsQ0FBQXdXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0FBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBelAsR0FBQUEsU0FBQSxDQUFBeVAsSUFBQSxDQUFBLENBQUE7QUFBQSxLQUFBO0FBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUE2TyxLQUFBLEVBQUF4Z0IsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBOFUsSUFBQSxDQUFBLENBQUEsQ0FBQTtJQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBQUEsWUFBQSxFQW1GWDlDLGtCQUFBLENBQUl0USxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUVVLENBQUFBLEdBQUcsQ0FBQyxZQUFBO0FBQUEsTUFBQSxvQkFBTWtULEtBQUssQ0FBQ21CLFNBQVMsRUFBRSxDQUFBO0tBQUMsQ0FBQSxDQUFBLENBQUE7SUFBQXhCLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGNBQUEsRUFDekM5QyxrQkFBQSxDQUFJdFEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFVSxDQUFBQSxHQUFHLENBQUMsWUFBQTtBQUFBLE1BQUEsb0JBQU1rVCxLQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQTtLQUFDLENBQUEsQ0FBQSxDQUFBO0FBQUF4QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFNUMsWUFBQSxFQUFBLFVBQUNqUyxJQUFJLEVBQUE7TUFBQSxPQUFLb1gsYUFBbUIsQ0FBQ3BYLElBQUksRUFBRWlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7QUFBQXNSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUUvQyxZQUFBLEVBQUEsVUFBQ2pTLElBQUksRUFBQTtNQUFBLE9BQUtvWCxhQUFtQixDQUFDcFgsSUFBSSxFQUFFaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBc1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFM0MsVUFBQzdQLEdBQUcsRUFBRW9QLEtBQUssRUFBSztBQUMvQixNQUFBLElBQUlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NlLFVBQVUsRUFBRTtBQUN6Qm5OLFFBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NlLFVBQVUsQ0FBQ2hkLEdBQUcsRUFBRW9QLEtBQUssRUFBRVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDbWdCLGNBQWMsQ0FBQyxDQUFBO0FBQzlELE9BQUE7S0FDRCxDQUFBLENBQUE7QUFBQTdPLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUM3UCxHQUFHLEVBQUs7QUFDN0IsTUFBQSxJQUFJNlAsS0FBQSxDQUFLblIsS0FBSyxDQUFDdWUsZUFBZSxFQUFFO0FBQzlCcE4sUUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDdWUsZUFBZSxDQUFDamQsR0FBRyxDQUFDLENBQUE7QUFDakMsT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBZ1EsZUFBQSxDQUFBSCxLQUFBLEVBQUEsa0JBQUEsRUFFa0IsWUFBTTtBQUN2QixNQUFBLElBQUlBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29nQixZQUFZLEVBQUU7QUFDM0JqUCxRQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNvZ0IsWUFBWSxFQUFFLENBQUE7QUFDM0IsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBOU8sSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW1CLG1CQUFBLEVBQUEsVUFBQzlLLENBQUMsRUFBSztBQUN6QixNQUFBLElBQUFrUyxXQUFBLEdBQW9DcEgsS0FBQSxDQUFLblIsS0FBSztRQUF0Q3NCLEdBQUcsR0FBQWlYLFdBQUEsQ0FBSGpYLEdBQUc7UUFBRXhCLFNBQVMsR0FBQXlZLFdBQUEsQ0FBVHpZLFNBQVM7UUFBRUMsT0FBTyxHQUFBd1ksV0FBQSxDQUFQeFksT0FBTyxDQUFBO0FBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0FBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7QUFDZCxPQUFBO0FBQ0EsTUFBQSxPQUFPdVcsV0FBaUIsQ0FBQ0EsUUFBYyxDQUFDaFYsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLEVBQUV2RyxTQUFTLENBQUMsQ0FBQTtLQUM1RCxDQUFBLENBQUE7QUFBQXdSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUM1SixDQUFDLEVBQUs7QUFDM0IsTUFBQSxJQUFBa1IsWUFBQSxHQUFvQ3RILEtBQUEsQ0FBS25SLEtBQUs7UUFBdENzQixHQUFHLEdBQUFtWCxZQUFBLENBQUhuWCxHQUFHO1FBQUV4QixTQUFTLEdBQUEyWSxZQUFBLENBQVQzWSxTQUFTO1FBQUVDLE9BQU8sR0FBQTBZLFlBQUEsQ0FBUDFZLE9BQU8sQ0FBQTtBQUMvQixNQUFBLElBQUksQ0FBQ0QsU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtBQUMxQixRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtBQUNBLE1BQUEsT0FBT3VXLGFBQW1CLENBQUNBLFVBQWdCLENBQUNoVixHQUFHLEVBQUVpRyxDQUFDLENBQUMsRUFBRXpILFNBQVMsQ0FBQyxDQUFBO0tBQ2hFLENBQUEsQ0FBQTtBQUFBd1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWlCLGlCQUFBLEVBQUEsVUFBQzlLLENBQUMsRUFBSztBQUN2QixNQUFBLElBQUF1UyxZQUFBLEdBQW9DekgsS0FBQSxDQUFLblIsS0FBSztRQUF0Q3NCLEdBQUcsR0FBQXNYLFlBQUEsQ0FBSHRYLEdBQUc7UUFBRXhCLFNBQVMsR0FBQThZLFlBQUEsQ0FBVDlZLFNBQVM7UUFBRUMsT0FBTyxHQUFBNlksWUFBQSxDQUFQN1ksT0FBTyxDQUFBO0FBQy9CLE1BQUEsSUFBSSxDQUFDRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0FBQzFCLFFBQUEsT0FBTyxLQUFLLENBQUE7QUFDZCxPQUFBO0FBQ0EsTUFBQSxPQUFPdVcsV0FBaUIsQ0FBQ0EsUUFBYyxDQUFDaFYsR0FBRyxFQUFFK0UsQ0FBQyxDQUFDLEVBQUV0RyxPQUFPLENBQUMsQ0FBQTtLQUMxRCxDQUFBLENBQUE7QUFBQXVSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUM1SixDQUFDLEVBQUs7QUFDekIsTUFBQSxJQUFBdVIsWUFBQSxHQUFvQzNILEtBQUEsQ0FBS25SLEtBQUs7UUFBdENzQixHQUFHLEdBQUF3WCxZQUFBLENBQUh4WCxHQUFHO1FBQUV4QixTQUFTLEdBQUFnWixZQUFBLENBQVRoWixTQUFTO1FBQUVDLE9BQU8sR0FBQStZLFlBQUEsQ0FBUC9ZLE9BQU8sQ0FBQTtBQUMvQixNQUFBLElBQUksQ0FBQ0QsU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtBQUMxQixRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtBQUNBLE1BQUEsT0FBT3VXLGFBQW1CLENBQUNBLFVBQWdCLENBQUNoVixHQUFHLEVBQUVpRyxDQUFDLENBQUMsRUFBRXhILE9BQU8sQ0FBQyxDQUFBO0tBQzlELENBQUEsQ0FBQTtBQUFBdVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXlCLHlCQUFBLEVBQUEsVUFBQzlLLENBQUMsRUFBSztBQUFBLE1BQUEsSUFBQXdTLHFCQUFBLENBQUE7QUFDL0IsTUFBQSxJQUFBUyxZQUFBLEdBQ0VuSSxLQUFBLENBQUtuUixLQUFLO1FBREpzQixHQUFHLEdBQUFnWSxZQUFBLENBQUhoWSxHQUFHO1FBQUV5WCxZQUFZLEdBQUFPLFlBQUEsQ0FBWlAsWUFBWTtRQUFFQyxVQUFVLEdBQUFNLFlBQUEsQ0FBVk4sVUFBVTtRQUFFQyxZQUFZLEdBQUFLLFlBQUEsQ0FBWkwsWUFBWTtRQUFFblosU0FBUyxHQUFBd1osWUFBQSxDQUFUeFosU0FBUztRQUFFQyxPQUFPLEdBQUF1WixZQUFBLENBQVB2WixPQUFPLENBQUE7QUFHdkUsTUFBQSxJQUFNb1osYUFBYSxHQUFBTixDQUFBQSxxQkFBQSxHQUFHMUgsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVosYUFBYSxNQUFBTixJQUFBQSxJQUFBQSxxQkFBQSxjQUFBQSxxQkFBQSxHQUFJMUgsS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBWSxDQUFBO01BRXpFLElBQUksRUFBRVcsWUFBWSxJQUFJQyxVQUFVLElBQUlDLFlBQVksQ0FBQyxJQUFJLENBQUNFLGFBQWEsRUFBRTtBQUNuRSxRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtNQUVBLElBQUlKLFlBQVksSUFBSWhaLE9BQU8sRUFBRTtRQUMzQixPQUFPdVcsY0FBb0IsQ0FBQzZDLGFBQWEsRUFBRXBaLE9BQU8sRUFBRXNHLENBQUMsRUFBRS9FLEdBQUcsQ0FBQyxDQUFBO0FBQzdELE9BQUE7TUFFQSxJQUFJMFgsVUFBVSxJQUFJbFosU0FBUyxFQUFFO1FBQzNCLE9BQU93VyxjQUFvQixDQUFDeFcsU0FBUyxFQUFFcVosYUFBYSxFQUFFOVMsQ0FBQyxFQUFFL0UsR0FBRyxDQUFDLENBQUE7QUFDL0QsT0FBQTtBQUVBLE1BQUEsSUFBSTJYLFlBQVksSUFBSW5aLFNBQVMsSUFBSSxDQUFDQyxPQUFPLEVBQUU7UUFDekMsT0FBT3VXLGNBQW9CLENBQUN4VyxTQUFTLEVBQUVxWixhQUFhLEVBQUU5UyxDQUFDLEVBQUUvRSxHQUFHLENBQUMsQ0FBQTtBQUMvRCxPQUFBO0FBRUEsTUFBQSxPQUFPLEtBQUssQ0FBQTtLQUNiLENBQUEsQ0FBQTtBQUFBZ1EsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRTRCLDRCQUFBLEVBQUEsVUFBQzlLLENBQUMsRUFBSztBQUFBLE1BQUEsSUFBQStTLHNCQUFBLENBQUE7QUFDbEMsTUFBQSxJQUFJLENBQUNqSSxLQUFBLENBQUtrUCx1QkFBdUIsQ0FBQ2hhLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLFFBQUEsT0FBTyxLQUFLLENBQUE7QUFDZCxPQUFBO0FBRUEsTUFBQSxJQUFBbVQsWUFBQSxHQUF5Q3JJLEtBQUEsQ0FBS25SLEtBQUs7UUFBM0NzQixHQUFHLEdBQUFrWSxZQUFBLENBQUhsWSxHQUFHO1FBQUV4QixTQUFTLEdBQUEwWixZQUFBLENBQVQxWixTQUFTO1FBQUVpWixZQUFZLEdBQUFTLFlBQUEsQ0FBWlQsWUFBWSxDQUFBO01BQ3BDLElBQU11SCxNQUFNLEdBQUdoSyxRQUFjLENBQUNoVixHQUFHLEVBQUUrRSxDQUFDLENBQUMsQ0FBQTtBQUNyQyxNQUFBLElBQU04UyxhQUFhLEdBQUFDLENBQUFBLHNCQUFBLEdBQUdqSSxLQUFBLENBQUtuUixLQUFLLENBQUNtWixhQUFhLE1BQUFDLElBQUFBLElBQUFBLHNCQUFBLGNBQUFBLHNCQUFBLEdBQUlqSSxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUE7QUFFekUsTUFBQSxJQUFJVyxZQUFZLEVBQUU7QUFDaEIsUUFBQSxPQUFPekMsV0FBaUIsQ0FBQ2dLLE1BQU0sRUFBRW5ILGFBQWEsQ0FBQyxDQUFBO0FBQ2pELE9BQUMsTUFBTTtBQUNMLFFBQUEsT0FBTzdDLFdBQWlCLENBQUNnSyxNQUFNLEVBQUV4Z0IsU0FBUyxDQUFDLENBQUE7QUFDN0MsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBd1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRTBCLDBCQUFBLEVBQUEsVUFBQzlLLENBQUMsRUFBSztBQUFBLE1BQUEsSUFBQWtULHNCQUFBLENBQUE7QUFDaEMsTUFBQSxJQUFJLENBQUNwSSxLQUFBLENBQUtrUCx1QkFBdUIsQ0FBQ2hhLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLFFBQUEsT0FBTyxLQUFLLENBQUE7QUFDZCxPQUFBO0FBRUEsTUFBQSxJQUFBb1QsWUFBQSxHQUFtRHRJLEtBQUEsQ0FBS25SLEtBQUs7UUFBckRzQixHQUFHLEdBQUFtWSxZQUFBLENBQUhuWSxHQUFHO1FBQUV2QixPQUFPLEdBQUEwWixZQUFBLENBQVAxWixPQUFPO1FBQUVpWixVQUFVLEdBQUFTLFlBQUEsQ0FBVlQsVUFBVTtRQUFFQyxZQUFZLEdBQUFRLFlBQUEsQ0FBWlIsWUFBWSxDQUFBO01BQzlDLElBQU1xSCxNQUFNLEdBQUdoSyxRQUFjLENBQUNoVixHQUFHLEVBQUUrRSxDQUFDLENBQUMsQ0FBQTtBQUNyQyxNQUFBLElBQU04UyxhQUFhLEdBQUFJLENBQUFBLHNCQUFBLEdBQUdwSSxLQUFBLENBQUtuUixLQUFLLENBQUNtWixhQUFhLE1BQUFJLElBQUFBLElBQUFBLHNCQUFBLGNBQUFBLHNCQUFBLEdBQUlwSSxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUE7TUFFekUsSUFBSVksVUFBVSxJQUFJQyxZQUFZLEVBQUU7QUFDOUIsUUFBQSxPQUFPM0MsV0FBaUIsQ0FBQ2dLLE1BQU0sRUFBRW5ILGFBQWEsQ0FBQyxDQUFBO0FBQ2pELE9BQUMsTUFBTTtBQUNMLFFBQUEsT0FBTzdDLFdBQWlCLENBQUNnSyxNQUFNLEVBQUV2Z0IsT0FBTyxDQUFDLENBQUE7QUFDM0MsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUFBdVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRTJCLDJCQUFBLEVBQUEsVUFBQzVKLENBQUMsRUFBSztBQUFBLE1BQUEsSUFBQWdaLHNCQUFBLENBQUE7QUFDakMsTUFBQSxJQUFBN0csWUFBQSxHQUNFdkksS0FBQSxDQUFLblIsS0FBSztRQURKc0IsR0FBRyxHQUFBb1ksWUFBQSxDQUFIcFksR0FBRztRQUFFeVgsWUFBWSxHQUFBVyxZQUFBLENBQVpYLFlBQVk7UUFBRUMsVUFBVSxHQUFBVSxZQUFBLENBQVZWLFVBQVU7UUFBRUMsWUFBWSxHQUFBUyxZQUFBLENBQVpULFlBQVk7UUFBRW5aLFNBQVMsR0FBQTRaLFlBQUEsQ0FBVDVaLFNBQVM7UUFBRUMsT0FBTyxHQUFBMlosWUFBQSxDQUFQM1osT0FBTyxDQUFBO0FBR3ZFLE1BQUEsSUFBTW9aLGFBQWEsR0FBQW9ILENBQUFBLHNCQUFBLEdBQUdwUCxLQUFBLENBQUtuUixLQUFLLENBQUNtWixhQUFhLE1BQUFvSCxJQUFBQSxJQUFBQSxzQkFBQSxjQUFBQSxzQkFBQSxHQUFJcFAsS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBWSxDQUFBO01BRXpFLElBQUksRUFBRVcsWUFBWSxJQUFJQyxVQUFVLElBQUlDLFlBQVksQ0FBQyxJQUFJLENBQUNFLGFBQWEsRUFBRTtBQUNuRSxRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtNQUVBLElBQUlKLFlBQVksSUFBSWhaLE9BQU8sRUFBRTtRQUMzQixPQUFPdVcsZ0JBQXNCLENBQUM2QyxhQUFhLEVBQUVwWixPQUFPLEVBQUV3SCxDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtBQUMvRCxPQUFBO01BRUEsSUFBSTBYLFVBQVUsSUFBSWxaLFNBQVMsRUFBRTtRQUMzQixPQUFPd1csZ0JBQXNCLENBQUN4VyxTQUFTLEVBQUVxWixhQUFhLEVBQUU1UixDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtBQUNqRSxPQUFBO0FBRUEsTUFBQSxJQUFJMlgsWUFBWSxJQUFJblosU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtRQUN6QyxPQUFPdVcsZ0JBQXNCLENBQUN4VyxTQUFTLEVBQUVxWixhQUFhLEVBQUU1UixDQUFDLEVBQUVqRyxHQUFHLENBQUMsQ0FBQTtBQUNqRSxPQUFBO0FBRUEsTUFBQSxPQUFPLEtBQUssQ0FBQTtLQUNiLENBQUEsQ0FBQTtBQUFBZ1EsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWUsZUFBQSxFQUFBLFVBQUN4UCxXQUFXLEVBQUs7QUFDL0IsTUFBQSxJQUFNTCxHQUFHLEdBQUc2UCxLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLENBQUE7TUFDMUIsSUFBTWUsU0FBUyxHQUFHaVUsT0FBYSxDQUFDM1UsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQy9DLE1BQUEsT0FDRTJVLFdBQWlCLENBQUMzVSxXQUFXLEVBQUVMLEdBQUcsQ0FBQyxJQUFJZ1YsV0FBaUIsQ0FBQ2pVLFNBQVMsRUFBRWYsR0FBRyxDQUFDLENBQUE7S0FFM0UsQ0FBQSxDQUFBO0FBQUFnUSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixVQUFDN1AsR0FBRyxFQUFFK0UsQ0FBQyxFQUFBO0FBQUEsTUFBQSxPQUN0QmlRLE9BQWEsQ0FBQ2hWLEdBQUcsQ0FBQyxLQUFLZ1YsT0FBYSxDQUFDQSxPQUFhLEVBQUUsQ0FBQyxJQUNyRGpRLENBQUMsS0FBS2lRLFFBQWMsQ0FBQ0EsT0FBYSxFQUFFLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQUFoRixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVwQixVQUFDN1AsR0FBRyxFQUFFaUcsQ0FBQyxFQUFBO0FBQUEsTUFBQSxPQUN4QitPLE9BQWEsQ0FBQ2hWLEdBQUcsQ0FBQyxLQUFLZ1YsT0FBYSxDQUFDQSxPQUFhLEVBQUUsQ0FBQyxJQUNyRC9PLENBQUMsS0FBSytPLFVBQWdCLENBQUNBLE9BQWEsRUFBRSxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtJQUFBaEYsZUFBQSxDQUFBSCxLQUFBLEVBRXZCLGlCQUFBLEVBQUEsVUFBQzdQLEdBQUcsRUFBRStFLENBQUMsRUFBRThSLFFBQVEsRUFBQTtNQUFBLE9BQ2pDN0IsUUFBYyxDQUFDNkIsUUFBUSxDQUFDLEtBQUs5UixDQUFDLElBQzlCaVEsT0FBYSxDQUFDaFYsR0FBRyxDQUFDLEtBQUtnVixPQUFhLENBQUM2QixRQUFRLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUE3RyxlQUFBLENBQUFILEtBQUEsRUFFNUIsbUJBQUEsRUFBQSxVQUFDN1AsR0FBRyxFQUFFaUcsQ0FBQyxFQUFFNFEsUUFBUSxFQUFBO01BQUEsT0FDbkM3QixVQUFnQixDQUFDaFYsR0FBRyxDQUFDLEtBQUtpRyxDQUFDLElBQzNCK08sT0FBYSxDQUFDaFYsR0FBRyxDQUFDLEtBQUtnVixPQUFhLENBQUM2QixRQUFRLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUE3RyxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWxDLFlBQU07TUFDbEIsSUFBTXFQLEtBQUssR0FBRyxFQUFFLENBQUE7QUFDaEIsTUFBQSxJQUFJQyxhQUFhLEdBQUd0UCxLQUFBLENBQUtuUixLQUFLLENBQUMwZ0IsV0FBVyxDQUFBO01BRTFDLElBQUlqVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO01BQ1QsSUFBSWtVLGtCQUFrQixHQUFHLEtBQUssQ0FBQTtBQUM5QixNQUFBLElBQUlDLGdCQUFnQixHQUFHdEssY0FBb0IsQ0FDekNBLGVBQXFCLENBQUNuRixLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLENBQUMsRUFDckM2UCxLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFNLEVBQ2pCNFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDMEIsZ0JBQ2IsQ0FBQyxDQUFBO0FBRUQsTUFBQSxJQUFNeVcsUUFBUSxHQUFHaEgsS0FBQSxDQUFLblIsS0FBSyxDQUFDcVksY0FBYyxHQUN0Qy9CLGNBQW9CLENBQ2xCbkYsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxFQUNuQmhILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU0sRUFDakI0VCxLQUFBLENBQUtuUixLQUFLLENBQUMwQixnQkFDYixDQUFDLEdBQ0R5UCxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUE7QUFFdkIsTUFBQSxJQUFNQyxZQUFZLEdBQUdqSCxLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFjLEdBQzFDL0IsY0FBb0IsQ0FDbEJuRixLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLEVBQ3ZCakgsS0FBQSxDQUFLblIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBCLGdCQUNiLENBQUMsR0FDRHlQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29ZLFlBQVksQ0FBQTtBQUUzQixNQUFBLE9BQU8sSUFBSSxFQUFFO0FBQ1hvSSxRQUFBQSxLQUFLLENBQUN2VCxJQUFJLGVBQ1IwRSxLQUFBLENBQUFDLGFBQUEsQ0FBQ3lNLElBQUksRUFBQTtBQUNIRixVQUFBQSxlQUFlLEVBQUVoTixLQUFBLENBQUtuUixLQUFLLENBQUM2Z0IsbUJBQW9CO0FBQ2hENUIsVUFBQUEsd0JBQXdCLEVBQUU5TixLQUFBLENBQUtuUixLQUFLLENBQUNpZix3QkFBeUI7QUFDOURDLFVBQUFBLDBCQUEwQixFQUFFL04sS0FBQSxDQUFLblIsS0FBSyxDQUFDa2YsMEJBQTJCO0FBQ2xFclMsVUFBQUEsR0FBRyxFQUFFSixDQUFFO0FBQ1BuTCxVQUFBQSxHQUFHLEVBQUVzZixnQkFBaUI7VUFDdEJwYyxLQUFLLEVBQUU4UixRQUFjLENBQUNuRixLQUFBLENBQUtuUixLQUFLLENBQUNzQixHQUFHLENBQUU7VUFDdENnZCxVQUFVLEVBQUVuTixLQUFBLENBQUtzTixjQUFlO0FBQ2hDckIsVUFBQUEsZUFBZSxFQUFFak0sS0FBQSxDQUFLblIsS0FBSyxDQUFDb2QsZUFBZ0I7VUFDNUNtQixlQUFlLEVBQUVwTixLQUFBLENBQUtpTyxtQkFBb0I7QUFDMUNaLFVBQUFBLFlBQVksRUFBRXJOLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3dlLFlBQWE7QUFDdENHLFVBQUFBLGdCQUFnQixFQUFFeE4sS0FBQSxDQUFLblIsS0FBSyxDQUFDMmUsZ0JBQWlCO0FBQzlDcGhCLFVBQUFBLE1BQU0sRUFBRTRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU87QUFDMUJFLFVBQUFBLE9BQU8sRUFBRTBULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQVE7QUFDNUJ5SCxVQUFBQSxPQUFPLEVBQUVpTSxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFRO0FBQzVCQyxVQUFBQSxZQUFZLEVBQUVnTSxLQUFBLENBQUtuUixLQUFLLENBQUNtRixZQUFhO0FBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRStMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29GLG9CQUFxQjtBQUN0REMsVUFBQUEsWUFBWSxFQUFFOEwsS0FBQSxDQUFLblIsS0FBSyxDQUFDcUYsWUFBYTtBQUN0Q0MsVUFBQUEsb0JBQW9CLEVBQUU2TCxLQUFBLENBQUtuUixLQUFLLENBQUNzRixvQkFBcUI7QUFDdERnWCxVQUFBQSxNQUFNLEVBQUVuTCxLQUFBLENBQUtuUixLQUFLLENBQUNzYyxNQUFPO0FBQzFCQyxVQUFBQSxvQkFBb0IsRUFBRXBMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3VjLG9CQUFxQjtBQUN0RGxRLFVBQUFBLGNBQWMsRUFBRThFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FNLGNBQWU7QUFDMUNxTSxVQUFBQSxRQUFRLEVBQUV2SCxLQUFBLENBQUtuUixLQUFLLENBQUMwWSxRQUFTO0FBQzlCUyxVQUFBQSxhQUFhLEVBQUVoSSxLQUFBLENBQUtuUixLQUFLLENBQUNtWixhQUFjO0FBQ3hDNVQsVUFBQUEsVUFBVSxFQUFFNEwsS0FBQSxDQUFLblIsS0FBSyxDQUFDdUYsVUFBVztBQUNsQzZTLFVBQUFBLFlBQVksRUFBRUEsWUFBYTtBQUMzQkQsVUFBQUEsUUFBUSxFQUFFQSxRQUFTO0FBQ25CWSxVQUFBQSxZQUFZLEVBQUU1SCxLQUFBLENBQUtuUixLQUFLLENBQUMrWSxZQUFhO0FBQ3RDQyxVQUFBQSxVQUFVLEVBQUU3SCxLQUFBLENBQUtuUixLQUFLLENBQUNnWixVQUFXO0FBQ2xDQyxVQUFBQSxZQUFZLEVBQUU5SCxLQUFBLENBQUtuUixLQUFLLENBQUNpWixZQUFhO0FBQ3RDQyxVQUFBQSwwQkFBMEIsRUFBRS9ILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2taLDBCQUEyQjtBQUNsRWxCLFVBQUFBLGVBQWUsRUFBRTdHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dZLGVBQWdCO0FBQzVDQyxVQUFBQSxhQUFhLEVBQUU5RyxLQUFBLENBQUtuUixLQUFLLENBQUNpWSxhQUFjO0FBQ3hDMkQsVUFBQUEsY0FBYyxFQUFFekssS0FBQSxDQUFLblIsS0FBSyxDQUFDOGdCLGVBQWdCO0FBQzNDekksVUFBQUEsY0FBYyxFQUFFbEgsS0FBQSxDQUFLblIsS0FBSyxDQUFDcVksY0FBZTtBQUMxQ3ZZLFVBQUFBLFNBQVMsRUFBRXFSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ0YsU0FBVTtBQUNoQ0MsVUFBQUEsT0FBTyxFQUFFb1IsS0FBQSxDQUFLblIsS0FBSyxDQUFDRCxPQUFRO0FBQzVCK1osVUFBQUEsWUFBWSxFQUFFM0ksS0FBQSxDQUFLblIsS0FBSyxDQUFDOFosWUFBYTtBQUN0Q3JFLFVBQUFBLE9BQU8sRUFBRXRFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3lWLE9BQVE7QUFDNUJpSixVQUFBQSxtQkFBbUIsRUFBRXZOLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBlLG1CQUFvQjtBQUNwRDVHLFVBQUFBLDBCQUEwQixFQUFFM0csS0FBQSxDQUFLblIsS0FBSyxDQUFDOFgsMEJBQTJCO0FBQ2xFa0YsVUFBQUEsaUJBQWlCLEVBQUU3TCxLQUFBLENBQUtuUixLQUFLLENBQUNnZCxpQkFBa0I7QUFDaERyRixVQUFBQSxlQUFlLEVBQUV4RyxLQUFBLENBQUtuUixLQUFLLENBQUMyWCxlQUFnQjtBQUM1Q3VFLFVBQUFBLGNBQWMsRUFBRS9LLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2tjLGNBQWU7QUFDMUNNLFVBQUFBLFlBQVksRUFBRXJMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3djLFlBQWE7QUFDdEM5YSxVQUFBQSxnQkFBZ0IsRUFBRXlQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBCLGdCQUFpQjtBQUM5Q2liLFVBQUFBLDBCQUEwQixFQUFFeEwsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmMsMEJBQTJCO0FBQ2xFQyxVQUFBQSw0QkFBNEIsRUFBRXpMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRjLDRCQUFBQTtBQUE2QixTQUN2RSxDQUNILENBQUMsQ0FBQTtBQUVELFFBQUEsSUFBSStELGtCQUFrQixFQUFFLE1BQUE7QUFFeEJsVSxRQUFBQSxDQUFDLEVBQUUsQ0FBQTtRQUNIbVUsZ0JBQWdCLEdBQUd0SyxRQUFjLENBQUNzSyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFdEQ7QUFDQTtBQUNBLFFBQUEsSUFBTUcsbUJBQW1CLEdBQ3ZCTixhQUFhLElBQUloVSxDQUFDLElBQUk2UyxnQ0FBZ0MsQ0FBQTtRQUN4RCxJQUFNMEIsdUJBQXVCLEdBQzNCLENBQUNQLGFBQWEsSUFBSSxDQUFDdFAsS0FBQSxDQUFLOFAsYUFBYSxDQUFDTCxnQkFBZ0IsQ0FBQyxDQUFBO1FBRXpELElBQUlHLG1CQUFtQixJQUFJQyx1QkFBdUIsRUFBRTtBQUNsRCxVQUFBLElBQUk3UCxLQUFBLENBQUtuUixLQUFLLENBQUNraEIsYUFBYSxFQUFFO0FBQzVCUCxZQUFBQSxrQkFBa0IsR0FBRyxJQUFJLENBQUE7QUFDM0IsV0FBQyxNQUFNO0FBQ0wsWUFBQSxNQUFBO0FBQ0YsV0FBQTtBQUNGLFNBQUE7QUFDRixPQUFBO0FBRUEsTUFBQSxPQUFPSCxLQUFLLENBQUE7S0FDYixDQUFBLENBQUE7QUFBQWxQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGNBQUEsRUFFYyxVQUFDd0QsQ0FBQyxFQUFFdE8sQ0FBQyxFQUFLO0FBQ3ZCLE1BQUEsSUFBTThhLFNBQVMsR0FBRzdLLFFBQWMsQ0FBQ25GLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFBO01BRW5ELElBQUlpUSxlQUFxQixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLblIsS0FBSyxDQUFDLEVBQUU7QUFDaEQsUUFBQSxPQUFBO0FBQ0YsT0FBQTtNQUVBbVIsS0FBQSxDQUFLc04sY0FBYyxDQUFDbkksZUFBcUIsQ0FBQzZLLFNBQVMsQ0FBQyxFQUFFeE0sQ0FBQyxDQUFDLENBQUE7S0FDekQsQ0FBQSxDQUFBO0FBQUFyRCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFbUIsbUJBQUEsRUFBQSxVQUFDOUssQ0FBQyxFQUFLO0FBQ3pCLE1BQUEsSUFBTThhLFNBQVMsR0FBRzdLLFFBQWMsQ0FBQ25GLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NCLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFBO01BRW5ELElBQUlpUSxlQUFxQixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLblIsS0FBSyxDQUFDLEVBQUU7QUFDaEQsUUFBQSxPQUFBO0FBQ0YsT0FBQTtNQUVBbVIsS0FBQSxDQUFLaU8sbUJBQW1CLENBQUM5SSxlQUFxQixDQUFDNkssU0FBUyxDQUFDLENBQUMsQ0FBQTtLQUMzRCxDQUFBLENBQUE7QUFBQTdQLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHVCQUFBLEVBRXVCLFVBQUNpUSxRQUFRLEVBQUV2a0IsT0FBTyxFQUFLO0FBQzdDLE1BQUEsSUFBSXNVLEtBQUEsQ0FBS29HLFVBQVUsQ0FBQzFhLE9BQU8sQ0FBQyxJQUFJc1UsS0FBQSxDQUFLNEksVUFBVSxDQUFDbGQsT0FBTyxDQUFDLEVBQUUsT0FBQTtBQUMxRHNVLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FoQixlQUFlLENBQUN4a0IsT0FBTyxDQUFDLENBQUE7QUFDbkNzVSxNQUFBQSxLQUFBLENBQUttUSxVQUFVLENBQUNGLFFBQVEsQ0FBQyxDQUFDak8sT0FBTyxJQUMvQmhDLEtBQUEsQ0FBS21RLFVBQVUsQ0FBQ0YsUUFBUSxDQUFDLENBQUNqTyxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtLQUM1QyxDQUFBLENBQUE7QUFBQXhMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFVBQUNULEtBQUssRUFBRWxNLEtBQUssRUFBSztBQUNqQyxNQUFBLElBQUFvVyxZQUFBLEdBUUl6SixLQUFBLENBQUtuUixLQUFLO1FBUFptWSxRQUFRLEdBQUF5QyxZQUFBLENBQVJ6QyxRQUFRO1FBQ1JDLFlBQVksR0FBQXdDLFlBQUEsQ0FBWnhDLFlBQVk7UUFDWk4sMEJBQTBCLEdBQUE4QyxZQUFBLENBQTFCOUMsMEJBQTBCO1FBQzFCbUksNEJBQTRCLEdBQUFyRixZQUFBLENBQTVCcUYsNEJBQTRCO1FBQzVCRCw2QkFBNkIsR0FBQXBGLFlBQUEsQ0FBN0JvRiw2QkFBNkI7UUFDN0JxQixlQUFlLEdBQUF6RyxZQUFBLENBQWZ5RyxlQUFlO1FBQ2ZFLG9CQUFvQixHQUFBM0csWUFBQSxDQUFwQjJHLG9CQUFvQixDQUFBO0FBRXRCLE1BQUEsSUFBTTlKLFFBQVEsR0FBRy9HLEtBQUssQ0FBQzdELEdBQUcsQ0FBQTtNQUMxQixJQUFJNEssUUFBUSxLQUFLLEtBQUssRUFBRTtBQUN0QjtRQUNBL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7QUFDeEIsT0FBQTtNQUNBLElBQUksQ0FBQ0ksMEJBQTBCLEVBQUU7QUFDL0IsUUFBQSxJQUFNMEosa0JBQWtCLEdBQUd6QixxQkFBcUIsQ0FDOUNDLDZCQUE2QixFQUM3QkMsNEJBQ0YsQ0FBQyxDQUFBO0FBQ0QsUUFBQSxJQUFNd0IsY0FBYyxHQUNsQjlCLGFBQWEsQ0FBQzZCLGtCQUFrQixDQUFDLENBQUMzQix3QkFBd0IsQ0FBQTtBQUM1RCxRQUFBLElBQU02QixVQUFVLEdBQUcvQixhQUFhLENBQUM2QixrQkFBa0IsQ0FBQyxDQUFDNUIsSUFBSSxDQUFBO0FBQ3pELFFBQUEsUUFBUW5JLFFBQVE7QUFDZCxVQUFBLEtBQUssT0FBTztBQUNWdEcsWUFBQUEsS0FBQSxDQUFLd1EsWUFBWSxDQUFDalIsS0FBSyxFQUFFbE0sS0FBSyxDQUFDLENBQUE7WUFDL0I2YyxlQUFlLENBQUNsSixRQUFRLENBQUMsQ0FBQTtBQUN6QixZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssWUFBWTtZQUNmaEgsS0FBQSxDQUFLeVEscUJBQXFCLENBQ3hCcGQsS0FBSyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUdBLEtBQUssR0FBR3NiLGtDQUFrQyxFQUM3RHhKLFNBQWUsQ0FBQzhCLFlBQVksRUFBRTBILGtDQUFrQyxDQUNsRSxDQUFDLENBQUE7QUFDRCxZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssV0FBVztZQUNkM08sS0FBQSxDQUFLeVEscUJBQXFCLENBQ3hCcGQsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUdBLEtBQUssR0FBR3NiLGtDQUFrQyxFQUM3RHhKLFNBQWUsQ0FBQzhCLFlBQVksRUFBRTBILGtDQUFrQyxDQUNsRSxDQUFDLENBQUE7QUFDRCxZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssU0FBUztBQUNaM08sWUFBQUEsS0FBQSxDQUFLeVEscUJBQXFCO0FBQ3hCO1lBQ0FGLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzFVLFFBQVEsQ0FBQ3hJLEtBQUssQ0FBQyxHQUN6QkEsS0FBSyxHQUFHLEVBQUUsR0FBR2lkLGNBQWMsR0FDM0JqZCxLQUFLLEdBQUdpZCxjQUFjLEVBQzFCbkwsU0FBZSxDQUFDOEIsWUFBWSxFQUFFcUosY0FBYyxDQUM5QyxDQUFDLENBQUE7QUFDRCxZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssV0FBVztBQUNkdFEsWUFBQUEsS0FBQSxDQUFLeVEscUJBQXFCO0FBQ3hCO0FBQ0FGLFlBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDMWlCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQ2dPLFFBQVEsQ0FBQ3hJLEtBQUssQ0FBQyxHQUM3Q0EsS0FBSyxHQUFHLEVBQUUsR0FBR2lkLGNBQWMsR0FDM0JqZCxLQUFLLEdBQUdpZCxjQUFjLEVBQzFCbkwsU0FBZSxDQUFDOEIsWUFBWSxFQUFFcUosY0FBYyxDQUM5QyxDQUFDLENBQUE7QUFDRCxZQUFBLE1BQUE7QUFDSixTQUFBO0FBQ0YsT0FBQTtBQUVBRixNQUFBQSxvQkFBb0IsSUFBSUEsb0JBQW9CLENBQUM3USxLQUFLLENBQUMsQ0FBQTtLQUNwRCxDQUFBLENBQUE7QUFBQVksSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsVUFBQ3dELENBQUMsRUFBRXBOLENBQUMsRUFBSztBQUN6QixNQUFBLElBQU00WixTQUFTLEdBQUc3SyxVQUFnQixDQUFDbkYsS0FBQSxDQUFLblIsS0FBSyxDQUFDc0IsR0FBRyxFQUFFaUcsQ0FBQyxDQUFDLENBQUE7TUFFckQsSUFBSStPLGlCQUF1QixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLblIsS0FBSyxDQUFDLEVBQUU7QUFDbEQsUUFBQSxPQUFBO0FBQ0YsT0FBQTtNQUVBbVIsS0FBQSxDQUFLc04sY0FBYyxDQUFDbkksaUJBQXVCLENBQUM2SyxTQUFTLENBQUMsRUFBRXhNLENBQUMsQ0FBQyxDQUFBO0tBQzNELENBQUEsQ0FBQTtBQUFBckQsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXFCLHFCQUFBLEVBQUEsVUFBQzVKLENBQUMsRUFBSztBQUMzQixNQUFBLElBQU00WixTQUFTLEdBQUc3SyxVQUFnQixDQUFDbkYsS0FBQSxDQUFLblIsS0FBSyxDQUFDc0IsR0FBRyxFQUFFaUcsQ0FBQyxDQUFDLENBQUE7TUFFckQsSUFBSStPLGlCQUF1QixDQUFDNkssU0FBUyxFQUFFaFEsS0FBQSxDQUFLblIsS0FBSyxDQUFDLEVBQUU7QUFDbEQsUUFBQSxPQUFBO0FBQ0YsT0FBQTtNQUVBbVIsS0FBQSxDQUFLaU8sbUJBQW1CLENBQUM5SSxpQkFBdUIsQ0FBQzZLLFNBQVMsQ0FBQyxDQUFDLENBQUE7S0FDN0QsQ0FBQSxDQUFBO0FBQUE3UCxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFBQSx5QkFBQSxFQUV5QixVQUFDMFEsVUFBVSxFQUFFaGxCLE9BQU8sRUFBSztBQUNqRCxNQUFBLElBQUlzVSxLQUFBLENBQUtvRyxVQUFVLENBQUMxYSxPQUFPLENBQUMsSUFBSXNVLEtBQUEsQ0FBSzRJLFVBQVUsQ0FBQ2xkLE9BQU8sQ0FBQyxFQUFFLE9BQUE7QUFDMURzVSxNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNxaEIsZUFBZSxDQUFDeGtCLE9BQU8sQ0FBQyxDQUFBO01BQ25Dc1UsS0FBQSxDQUFLMlEsWUFBWSxDQUFDRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMxTyxPQUFPLElBQ3ZDaEMsS0FBQSxDQUFLMlEsWUFBWSxDQUFDRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMxTyxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtLQUNwRCxDQUFBLENBQUE7QUFBQXhMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRWtCLFVBQUNULEtBQUssRUFBRTlMLE9BQU8sRUFBSztBQUNyQyxNQUFBLElBQU02UyxRQUFRLEdBQUcvRyxLQUFLLENBQUM3RCxHQUFHLENBQUE7QUFDMUIsTUFBQSxJQUFJLENBQUNzRSxLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMEIsRUFBRTtBQUMxQyxRQUFBLFFBQVFMLFFBQVE7QUFDZCxVQUFBLEtBQUssT0FBTztBQUNWdEcsWUFBQUEsS0FBQSxDQUFLNFEsY0FBYyxDQUFDclIsS0FBSyxFQUFFOUwsT0FBTyxDQUFDLENBQUE7WUFDbkN1TSxLQUFBLENBQUtuUixLQUFLLENBQUNxaEIsZUFBZSxDQUFDbFEsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxDQUFDLENBQUE7QUFDL0MsWUFBQSxNQUFBO0FBQ0YsVUFBQSxLQUFLLFlBQVk7WUFDZmhILEtBQUEsQ0FBSzZRLHVCQUF1QixDQUMxQnBkLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxPQUFPLEdBQUcsQ0FBQyxFQUMvQjBSLFdBQWlCLENBQUNuRixLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLEVBQUUsQ0FBQyxDQUM5QyxDQUFDLENBQUE7QUFDRCxZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssV0FBVztZQUNkakgsS0FBQSxDQUFLNlEsdUJBQXVCLENBQzFCcGQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUdBLE9BQU8sR0FBRyxDQUFDLEVBQy9CMFIsV0FBaUIsQ0FBQ25GLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29ZLFlBQVksRUFBRSxDQUFDLENBQzlDLENBQUMsQ0FBQTtBQUNELFlBQUEsTUFBQTtBQUNKLFNBQUE7QUFDRixPQUFBO0tBQ0QsQ0FBQSxDQUFBO0FBQUE5RyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFb0Isb0JBQUEsRUFBQSxVQUFDOUssQ0FBQyxFQUFLO0FBQzFCLE1BQUEsSUFBQTZVLGFBQUEsR0FXSS9KLEtBQUEsQ0FBS25SLEtBQUs7UUFWWnNCLEdBQUcsR0FBQTRaLGFBQUEsQ0FBSDVaLEdBQUc7UUFDSHhCLFNBQVMsR0FBQW9iLGFBQUEsQ0FBVHBiLFNBQVM7UUFDVEMsT0FBTyxHQUFBbWIsYUFBQSxDQUFQbmIsT0FBTztRQUNQb1ksUUFBUSxHQUFBK0MsYUFBQSxDQUFSL0MsUUFBUTtRQUNSMWEsT0FBTyxHQUFBeWQsYUFBQSxDQUFQemQsT0FBTztRQUNQeUgsT0FBTyxHQUFBZ1csYUFBQSxDQUFQaFcsT0FBTztRQUNQa1QsWUFBWSxHQUFBOEMsYUFBQSxDQUFaOUMsWUFBWTtRQUNaNkosY0FBYyxHQUFBL0csYUFBQSxDQUFkK0csY0FBYztRQUNkOWMsWUFBWSxHQUFBK1YsYUFBQSxDQUFaL1YsWUFBWTtRQUNaRSxZQUFZLEdBQUE2VixhQUFBLENBQVo3VixZQUFZLENBQUE7QUFFZCxNQUFBLElBQU02YyxlQUFlLEdBQUdELGNBQWMsR0FDbENBLGNBQWMsQ0FBQzNMLFFBQWMsQ0FBQ2hWLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFDLEdBQ3RDcEIsU0FBUyxDQUFBO01BQ2IsSUFBTWtjLFNBQVMsR0FBRzdLLFFBQWMsQ0FBQ2hWLEdBQUcsRUFBRStFLENBQUMsQ0FBQyxDQUFBO01BQ3hDLE9BQU8yTixJQUFJLENBQ1QsOEJBQThCLEVBQUEsMEJBQUEsQ0FBQXRVLE1BQUEsQ0FDSDJHLENBQUMsQ0FDNUI2YixFQUFBQSxlQUFlLEVBQ2Y7QUFDRSxRQUFBLHdDQUF3QyxFQUN0QyxDQUFDemtCLE9BQU8sSUFBSXlILE9BQU8sSUFBSUMsWUFBWSxJQUFJRSxZQUFZLEtBQ25EaVIsZUFBcUIsQ0FBQzZLLFNBQVMsRUFBRWhRLEtBQUEsQ0FBS25SLEtBQUssQ0FBQztRQUM5Qyx3Q0FBd0MsRUFBRW1SLEtBQUEsQ0FBSzZFLGVBQWUsQ0FDNUQxVSxHQUFHLEVBQ0grRSxDQUFDLEVBQ0Q4UixRQUNGLENBQUM7QUFDRCxRQUFBLGlEQUFpRCxFQUMvQyxDQUFDaEgsS0FBQSxDQUFLblIsS0FBSyxDQUFDOFgsMEJBQTBCLElBQ3RDM0csS0FBQSxDQUFLNkUsZUFBZSxDQUFDMVUsR0FBRyxFQUFFK0UsQ0FBQyxFQUFFK1IsWUFBWSxDQUFDO0FBQzVDLFFBQUEsa0RBQWtELEVBQ2hEakgsS0FBQSxDQUFLa1AsdUJBQXVCLENBQUNoYSxDQUFDLENBQUM7QUFDakMsUUFBQSx3Q0FBd0MsRUFBRWlRLGNBQW9CLENBQzVEeFcsU0FBUyxFQUNUQyxPQUFPLEVBQ1BzRyxDQUFDLEVBQ0QvRSxHQUNGLENBQUM7QUFDRCxRQUFBLDJDQUEyQyxFQUFFNlAsS0FBQSxDQUFLZ1IsaUJBQWlCLENBQUM5YixDQUFDLENBQUM7QUFDdEUsUUFBQSx5Q0FBeUMsRUFBRThLLEtBQUEsQ0FBS2lSLGVBQWUsQ0FBQy9iLENBQUMsQ0FBQztBQUNsRSxRQUFBLHFEQUFxRCxFQUNuRDhLLEtBQUEsQ0FBS2tSLDBCQUEwQixDQUFDaGMsQ0FBQyxDQUFDO0FBQ3BDLFFBQUEsbURBQW1ELEVBQ2pEOEssS0FBQSxDQUFLbVIsd0JBQXdCLENBQUNqYyxDQUFDLENBQUM7QUFDbEMsUUFBQSxxQ0FBcUMsRUFBRThLLEtBQUEsQ0FBS29SLGNBQWMsQ0FBQ2poQixHQUFHLEVBQUUrRSxDQUFDLENBQUE7QUFDbkUsT0FDRixDQUFDLENBQUE7S0FDRixDQUFBLENBQUE7QUFBQWlMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVhLGFBQUEsRUFBQSxVQUFDOUssQ0FBQyxFQUFLO01BQ25CLElBQU1tYyxnQkFBZ0IsR0FBR2xNLFFBQWMsQ0FBQ25GLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29ZLFlBQVksQ0FBQyxDQUFBO0FBQ2hFLE1BQUEsSUFBTXVELFFBQVEsR0FDWixDQUFDeEssS0FBQSxDQUFLblIsS0FBSyxDQUFDOFgsMEJBQTBCLElBQUl6UixDQUFDLEtBQUttYyxnQkFBZ0IsR0FDNUQsR0FBRyxHQUNILElBQUksQ0FBQTtBQUVWLE1BQUEsT0FBTzdHLFFBQVEsQ0FBQTtLQUNoQixDQUFBLENBQUE7QUFBQXJLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVvQixvQkFBQSxFQUFBLFVBQUM1SixDQUFDLEVBQUs7TUFDMUIsSUFBTWtiLGtCQUFrQixHQUFHbk0sVUFBZ0IsQ0FBQ25GLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29ZLFlBQVksQ0FBQyxDQUFBO0FBQ3BFLE1BQUEsSUFBTXVELFFBQVEsR0FDWixDQUFDeEssS0FBQSxDQUFLblIsS0FBSyxDQUFDOFgsMEJBQTBCLElBQUl2USxDQUFDLEtBQUtrYixrQkFBa0IsR0FDOUQsR0FBRyxHQUNILElBQUksQ0FBQTtBQUVWLE1BQUEsT0FBTzlHLFFBQVEsQ0FBQTtLQUNoQixDQUFBLENBQUE7QUFBQXJLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVjLGNBQUEsRUFBQSxVQUFDM00sS0FBSyxFQUFLO0FBQ3hCLE1BQUEsSUFBQWtlLGFBQUEsR0FJSXZSLEtBQUEsQ0FBS25SLEtBQUs7UUFBQTJpQixxQkFBQSxHQUFBRCxhQUFBLENBSFp6RCx3QkFBd0I7QUFBeEJBLFFBQUFBLHdCQUF3QixHQUFBMEQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxRQUFRLEdBQUFBLHFCQUFBO1FBQUFDLHFCQUFBLEdBQUFGLGFBQUEsQ0FDbkN4RCwwQkFBMEI7QUFBMUJBLFFBQUFBLDBCQUEwQixHQUFBMEQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxlQUFlLEdBQUFBLHFCQUFBO1FBQzVDdGhCLEdBQUcsR0FBQW9oQixhQUFBLENBQUhwaEIsR0FBRyxDQUFBO01BR0wsSUFBTTZmLFNBQVMsR0FBRzdLLFFBQWMsQ0FBQ2hWLEdBQUcsRUFBRWtELEtBQUssQ0FBQyxDQUFBO0FBQzVDLE1BQUEsSUFBTXlXLE1BQU0sR0FDVjlKLEtBQUEsQ0FBS29HLFVBQVUsQ0FBQzRKLFNBQVMsQ0FBQyxJQUFJaFEsS0FBQSxDQUFLNEksVUFBVSxDQUFDb0gsU0FBUyxDQUFDLEdBQ3BEakMsMEJBQTBCLEdBQzFCRCx3QkFBd0IsQ0FBQTtBQUU5QixNQUFBLE9BQUEsRUFBQSxDQUFBdmYsTUFBQSxDQUFVdWIsTUFBTSxFQUFBLEdBQUEsQ0FBQSxDQUFBdmIsTUFBQSxDQUFJNFcsVUFBZ0IsQ0FBQzZLLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQSxDQUFBO0tBQzdELENBQUEsQ0FBQTtBQUFBN1AsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXNCLHNCQUFBLEVBQUEsVUFBQzVKLENBQUMsRUFBSztBQUM1QixNQUFBLElBQUFzYixhQUFBLEdBU0kxUixLQUFBLENBQUtuUixLQUFLO1FBUlpzQixHQUFHLEdBQUF1aEIsYUFBQSxDQUFIdmhCLEdBQUc7UUFDSHhCLFNBQVMsR0FBQStpQixhQUFBLENBQVQvaUIsU0FBUztRQUNUQyxPQUFPLEdBQUE4aUIsYUFBQSxDQUFQOWlCLE9BQU87UUFDUG9ZLFFBQVEsR0FBQTBLLGFBQUEsQ0FBUjFLLFFBQVE7UUFDUjFhLE9BQU8sR0FBQW9sQixhQUFBLENBQVBwbEIsT0FBTztRQUNQeUgsT0FBTyxHQUFBMmQsYUFBQSxDQUFQM2QsT0FBTztRQUNQa1QsWUFBWSxHQUFBeUssYUFBQSxDQUFaekssWUFBWTtRQUNaTiwwQkFBMEIsR0FBQStLLGFBQUEsQ0FBMUIvSywwQkFBMEIsQ0FBQTtBQUU1QixNQUFBLE9BQU85RCxJQUFJLENBQ1QsZ0NBQWdDLCtCQUFBdFUsTUFBQSxDQUNINkgsQ0FBQyxDQUM5QixFQUFBO1FBQ0UsMENBQTBDLEVBQ3hDLENBQUM5SixPQUFPLElBQUl5SCxPQUFPLEtBQ25Cb1IsaUJBQXVCLENBQUNBLFVBQWdCLENBQUNoVixHQUFHLEVBQUVpRyxDQUFDLENBQUMsRUFBRTRKLEtBQUEsQ0FBS25SLEtBQUssQ0FBQztRQUMvRCwwQ0FBMEMsRUFBRW1SLEtBQUEsQ0FBSzJSLGlCQUFpQixDQUNoRXhoQixHQUFHLEVBQ0hpRyxDQUFDLEVBQ0Q0USxRQUNGLENBQUM7QUFDRCxRQUFBLG1EQUFtRCxFQUNqRCxDQUFDTCwwQkFBMEIsSUFDM0IzRyxLQUFBLENBQUsyUixpQkFBaUIsQ0FBQ3hoQixHQUFHLEVBQUVpRyxDQUFDLEVBQUU2USxZQUFZLENBQUM7QUFDOUMsUUFBQSxvREFBb0QsRUFDbERqSCxLQUFBLENBQUs0Uix5QkFBeUIsQ0FBQ3hiLENBQUMsQ0FBQztBQUNuQyxRQUFBLDBDQUEwQyxFQUFFK08sZ0JBQXNCLENBQ2hFeFcsU0FBUyxFQUNUQyxPQUFPLEVBQ1B3SCxDQUFDLEVBQ0RqRyxHQUNGLENBQUM7QUFDRCxRQUFBLDZDQUE2QyxFQUMzQzZQLEtBQUEsQ0FBSzZSLG1CQUFtQixDQUFDemIsQ0FBQyxDQUFDO0FBQzdCLFFBQUEsMkNBQTJDLEVBQUU0SixLQUFBLENBQUs4UixpQkFBaUIsQ0FBQzFiLENBQUMsQ0FBQTtBQUN2RSxPQUNGLENBQUMsQ0FBQTtLQUNGLENBQUEsQ0FBQTtBQUFBK0osSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWlCLGlCQUFBLEVBQUEsVUFBQzlLLENBQUMsRUFBSztBQUN2QixNQUFBLElBQUE2YyxhQUFBLEdBQ0UvUixLQUFBLENBQUtuUixLQUFLO1FBREptakIsdUJBQXVCLEdBQUFELGFBQUEsQ0FBdkJDLHVCQUF1QjtRQUFFQyxrQkFBa0IsR0FBQUYsYUFBQSxDQUFsQkUsa0JBQWtCO1FBQUU3bEIsTUFBTSxHQUFBMmxCLGFBQUEsQ0FBTjNsQixNQUFNO1FBQUUrRCxHQUFHLEdBQUE0aEIsYUFBQSxDQUFINWhCLEdBQUcsQ0FBQTtNQUVoRSxJQUFNK2hCLGNBQWMsR0FBRy9NLHFCQUEyQixDQUFDalEsQ0FBQyxFQUFFOUksTUFBTSxDQUFDLENBQUE7TUFDN0QsSUFBTStsQixhQUFhLEdBQUdoTixnQkFBc0IsQ0FBQ2pRLENBQUMsRUFBRTlJLE1BQU0sQ0FBQyxDQUFBO0FBQ3ZELE1BQUEsSUFBSTZsQixrQkFBa0IsRUFBRTtRQUN0QixPQUFPQSxrQkFBa0IsQ0FBQy9jLENBQUMsRUFBRWdkLGNBQWMsRUFBRUMsYUFBYSxFQUFFaGlCLEdBQUcsQ0FBQyxDQUFBO0FBQ2xFLE9BQUE7QUFDQSxNQUFBLE9BQU82aEIsdUJBQXVCLEdBQUdHLGFBQWEsR0FBR0QsY0FBYyxDQUFBO0tBQ2hFLENBQUEsQ0FBQTtBQUFBL1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW1CLG1CQUFBLEVBQUEsVUFBQzVKLENBQUMsRUFBSztBQUN6QixNQUFBLElBQUFnYyxhQUFBLEdBQXlDcFMsS0FBQSxDQUFLblIsS0FBSztRQUEzQ3dqQixvQkFBb0IsR0FBQUQsYUFBQSxDQUFwQkMsb0JBQW9CO1FBQUVqbUIsTUFBTSxHQUFBZ21CLGFBQUEsQ0FBTmhtQixNQUFNLENBQUE7TUFDcEMsSUFBTWttQixZQUFZLEdBQUduTix1QkFBNkIsQ0FBQy9PLENBQUMsRUFBRWhLLE1BQU0sQ0FBQyxDQUFBO01BQzdELE9BQU9pbUIsb0JBQW9CLEdBQ3ZCQSxvQkFBb0IsQ0FBQ2pjLENBQUMsRUFBRWtjLFlBQVksQ0FBQyxHQUNyQ0EsWUFBWSxDQUFBO0tBQ2pCLENBQUEsQ0FBQTtJQUFBblMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07QUFDbkIsTUFBQSxJQUFBdVMsYUFBQSxHQUtJdlMsS0FBQSxDQUFLblIsS0FBSztRQUpaaWdCLDRCQUE0QixHQUFBeUQsYUFBQSxDQUE1QnpELDRCQUE0QjtRQUM1QkQsNkJBQTZCLEdBQUEwRCxhQUFBLENBQTdCMUQsNkJBQTZCO1FBQzdCMWUsR0FBRyxHQUFBb2lCLGFBQUEsQ0FBSHBpQixHQUFHO1FBQ0g2VyxRQUFRLEdBQUF1TCxhQUFBLENBQVJ2TCxRQUFRLENBQUE7QUFHVixNQUFBLElBQU13TCxZQUFZLEdBQ2hCaEUsYUFBYSxDQUNYSSxxQkFBcUIsQ0FDbkJDLDZCQUE2QixFQUM3QkMsNEJBQ0YsQ0FBQyxDQUNGLENBQUNMLElBQUksQ0FBQTtBQUNSLE1BQUEsT0FBTytELFlBQVksQ0FBQ2xsQixHQUFHLENBQUMsVUFBQytGLEtBQUssRUFBRWlJLENBQUMsRUFBQTtRQUFBLG9CQUMvQmtGLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUFLdEUsVUFBQUEsU0FBUyxFQUFDLGlDQUFpQztBQUFDVCxVQUFBQSxHQUFHLEVBQUVKLENBQUFBO0FBQUUsU0FBQSxFQUNyRGpJLEtBQUssQ0FBQy9GLEdBQUcsQ0FBQyxVQUFDNEgsQ0FBQyxFQUFFdWQsQ0FBQyxFQUFBO1VBQUEsb0JBQ2RqUyxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDRXFDLFlBQUFBLEdBQUcsRUFBRTlDLEtBQUEsQ0FBS21RLFVBQVUsQ0FBQ2piLENBQUMsQ0FBRTtBQUN4QndHLFlBQUFBLEdBQUcsRUFBRStXLENBQUU7QUFDUC9SLFlBQUFBLE9BQU8sRUFBRSxTQUFBQSxPQUFDZ1MsQ0FBQUEsRUFBRSxFQUFLO0FBQ2YxUyxjQUFBQSxLQUFBLENBQUt3USxZQUFZLENBQUNrQyxFQUFFLEVBQUV4ZCxDQUFDLENBQUMsQ0FBQTthQUN4QjtBQUNGNlcsWUFBQUEsU0FBUyxFQUFFLFNBQUFBLFNBQUMyRyxDQUFBQSxFQUFFLEVBQUs7QUFDakIsY0FBQSxJQUFJdk4sY0FBb0IsQ0FBQ3VOLEVBQUUsQ0FBQyxFQUFFO2dCQUM1QkEsRUFBRSxDQUFDbk0sY0FBYyxFQUFFLENBQUE7Z0JBQ25CbU0sRUFBRSxDQUFDaFgsR0FBRyxHQUFHLE9BQU8sQ0FBQTtBQUNsQixlQUFBO0FBRUFzRSxjQUFBQSxLQUFBLENBQUsyUyxjQUFjLENBQUNELEVBQUUsRUFBRXhkLENBQUMsQ0FBQyxDQUFBO2FBQzFCO0FBQ0ZtUixZQUFBQSxZQUFZLEVBQ1YsQ0FBQ3JHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29kLGVBQWUsR0FDdkIsWUFBQTtBQUFBLGNBQUEsT0FBTWpNLEtBQUEsQ0FBSzRTLGlCQUFpQixDQUFDMWQsQ0FBQyxDQUFDLENBQUE7QUFBQSxhQUFBLEdBQy9CcEIsU0FDTDtBQUNEcVksWUFBQUEsY0FBYyxFQUNabk0sS0FBQSxDQUFLblIsS0FBSyxDQUFDb2QsZUFBZSxHQUN0QixZQUFBO0FBQUEsY0FBQSxPQUFNak0sS0FBQSxDQUFLNFMsaUJBQWlCLENBQUMxZCxDQUFDLENBQUMsQ0FBQTtBQUFBLGFBQUEsR0FDL0JwQixTQUNMO0FBQ0QwVyxZQUFBQSxRQUFRLEVBQUV4SyxLQUFBLENBQUs4SyxXQUFXLENBQUM1VixDQUFDLENBQUU7QUFDOUJpSCxZQUFBQSxTQUFTLEVBQUU2RCxLQUFBLENBQUs2UyxrQkFBa0IsQ0FBQzNkLENBQUMsQ0FBRTtBQUN0Q21YLFlBQUFBLElBQUksRUFBQyxRQUFRO0FBQ2IsWUFBQSxZQUFBLEVBQVlyTSxLQUFBLENBQUtvTSxZQUFZLENBQUNsWCxDQUFDLENBQUU7WUFDakMsY0FBYzhLLEVBQUFBLEtBQUEsQ0FBS29SLGNBQWMsQ0FBQ2poQixHQUFHLEVBQUUrRSxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUdwQixTQUFVO1lBQy9ELGVBQWVrTSxFQUFBQSxLQUFBLENBQUs2RSxlQUFlLENBQUMxVSxHQUFHLEVBQUUrRSxDQUFDLEVBQUU4UixRQUFRLENBQUE7QUFBRSxXQUFBLEVBRXJEaEgsS0FBQSxDQUFLOFMsZUFBZSxDQUFDNWQsQ0FBQyxDQUNwQixDQUFDLENBQUE7QUFBQSxTQUNQLENBQ0UsQ0FBQyxDQUFBO0FBQUEsT0FDUCxDQUFDLENBQUE7S0FDSCxDQUFBLENBQUE7SUFBQWlMLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGdCQUFBLEVBRWdCLFlBQU07QUFDckIsTUFBQSxJQUFBK1MsYUFBQSxHQUEwQi9TLEtBQUEsQ0FBS25SLEtBQUs7UUFBNUJzQixHQUFHLEdBQUE0aUIsYUFBQSxDQUFINWlCLEdBQUc7UUFBRTZXLFFBQVEsR0FBQStMLGFBQUEsQ0FBUi9MLFFBQVEsQ0FBQTtNQUNyQixJQUFNZ00sUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7TUFDN0Isb0JBQ0V4UyxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3RFLFFBQUFBLFNBQVMsRUFBQyxtQ0FBQTtBQUFtQyxPQUFBLEVBQy9DNlcsUUFBUSxDQUFDMWxCLEdBQUcsQ0FBQyxVQUFDOEksQ0FBQyxFQUFFcWMsQ0FBQyxFQUFBO1FBQUEsb0JBQ2pCalMsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0UvRSxVQUFBQSxHQUFHLEVBQUUrVyxDQUFFO0FBQ1AzUCxVQUFBQSxHQUFHLEVBQUU5QyxLQUFBLENBQUsyUSxZQUFZLENBQUM4QixDQUFDLENBQUU7QUFDMUJwRyxVQUFBQSxJQUFJLEVBQUMsUUFBUTtBQUNiM0wsVUFBQUEsT0FBTyxFQUFFLFNBQUFBLE9BQUNnUyxDQUFBQSxFQUFFLEVBQUs7QUFDZjFTLFlBQUFBLEtBQUEsQ0FBSzRRLGNBQWMsQ0FBQzhCLEVBQUUsRUFBRXRjLENBQUMsQ0FBQyxDQUFBO1dBQzFCO0FBQ0YyVixVQUFBQSxTQUFTLEVBQUUsU0FBQUEsU0FBQzJHLENBQUFBLEVBQUUsRUFBSztBQUNqQjFTLFlBQUFBLEtBQUEsQ0FBS2lULGdCQUFnQixDQUFDUCxFQUFFLEVBQUV0YyxDQUFDLENBQUMsQ0FBQTtXQUM1QjtBQUNGaVEsVUFBQUEsWUFBWSxFQUNWLENBQUNyRyxLQUFBLENBQUtuUixLQUFLLENBQUNvZCxlQUFlLEdBQ3ZCLFlBQUE7QUFBQSxZQUFBLE9BQU1qTSxLQUFBLENBQUtrVCxtQkFBbUIsQ0FBQzljLENBQUMsQ0FBQyxDQUFBO0FBQUEsV0FBQSxHQUNqQ3RDLFNBQ0w7QUFDRHFZLFVBQUFBLGNBQWMsRUFDWm5NLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29kLGVBQWUsR0FDdEIsWUFBQTtBQUFBLFlBQUEsT0FBTWpNLEtBQUEsQ0FBS2tULG1CQUFtQixDQUFDOWMsQ0FBQyxDQUFDLENBQUE7QUFBQSxXQUFBLEdBQ2pDdEMsU0FDTDtBQUNEcUksVUFBQUEsU0FBUyxFQUFFNkQsS0FBQSxDQUFLbVQsb0JBQW9CLENBQUMvYyxDQUFDLENBQUU7VUFDeEMsZUFBZTRKLEVBQUFBLEtBQUEsQ0FBSzJSLGlCQUFpQixDQUFDeGhCLEdBQUcsRUFBRWlHLENBQUMsRUFBRTRRLFFBQVEsQ0FBRTtBQUN4RHdELFVBQUFBLFFBQVEsRUFBRXhLLEtBQUEsQ0FBS29ULGtCQUFrQixDQUFDaGQsQ0FBQyxDQUFFO1VBQ3JDLGNBQWM0SixFQUFBQSxLQUFBLENBQUtxVCxnQkFBZ0IsQ0FBQ2xqQixHQUFHLEVBQUVpRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUd0QyxTQUFBQTtBQUFVLFNBQUEsRUFFaEVrTSxLQUFBLENBQUtzVCxpQkFBaUIsQ0FBQ2xkLENBQUMsQ0FDdEIsQ0FBQyxDQUFBO0FBQUEsT0FDUCxDQUNFLENBQUMsQ0FBQTtLQUVULENBQUEsQ0FBQTtJQUFBK0osZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFlBQU07QUFDcEIsTUFBQSxJQUFBdVQsYUFBQSxHQU9JdlQsS0FBQSxDQUFLblIsS0FBSztRQU5abVosYUFBYSxHQUFBdUwsYUFBQSxDQUFidkwsYUFBYTtRQUNiSixZQUFZLEdBQUEyTCxhQUFBLENBQVozTCxZQUFZO1FBQ1pDLFVBQVUsR0FBQTBMLGFBQUEsQ0FBVjFMLFVBQVU7UUFDVjJMLG1CQUFtQixHQUFBRCxhQUFBLENBQW5CQyxtQkFBbUI7UUFDbkJDLHFCQUFxQixHQUFBRixhQUFBLENBQXJCRSxxQkFBcUI7UUFDckJ2TSxjQUFjLEdBQUFxTSxhQUFBLENBQWRyTSxjQUFjLENBQUE7TUFHaEIsT0FBT3JFLElBQUksQ0FDVCx5QkFBeUIsRUFDekI7QUFDRSxRQUFBLDBDQUEwQyxFQUN4Q21GLGFBQWEsS0FBS0osWUFBWSxJQUFJQyxVQUFVLENBQUE7QUFDaEQsT0FBQyxFQUNEO0FBQUUsUUFBQSwrQkFBK0IsRUFBRTJMLG1CQUFBQTtBQUFvQixPQUFDLEVBQ3hEO0FBQUUsUUFBQSxpQ0FBaUMsRUFBRUMscUJBQUFBO0FBQXNCLE9BQUMsRUFDNUQ7QUFBRSxRQUFBLDhCQUE4QixFQUFFdk0sY0FBQUE7QUFBZSxPQUNuRCxDQUFDLENBQUE7S0FDRixDQUFBLENBQUE7QUFBQSxJQUFBLE9BQUFsSCxLQUFBLENBQUE7QUFBQSxHQUFBO0VBQUE0QixTQUFBLENBQUFtTixLQUFBLEVBQUFoUCxnQkFBQSxDQUFBLENBQUE7RUFBQSxPQUFBOEIsWUFBQSxDQUFBa04sS0FBQSxFQUFBLENBQUE7SUFBQXJULEdBQUEsRUFBQSxRQUFBO0lBQUEvUCxLQUFBLEVBRUQsU0FBQWdYLE1BQUFBLEdBQVM7QUFDUCxNQUFBLElBQUErUSxhQUFBLEdBS0ksSUFBSSxDQUFDN2tCLEtBQUs7UUFKWjJrQixtQkFBbUIsR0FBQUUsYUFBQSxDQUFuQkYsbUJBQW1CO1FBQ25CQyxxQkFBcUIsR0FBQUMsYUFBQSxDQUFyQkQscUJBQXFCO1FBQ3JCdGpCLEdBQUcsR0FBQXVqQixhQUFBLENBQUh2akIsR0FBRztRQUFBd2pCLHFCQUFBLEdBQUFELGFBQUEsQ0FDSDFHLGVBQWU7QUFBZkEsUUFBQUEsZUFBZSxHQUFBMkcscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxRQUFRLEdBQUFBLHFCQUFBLENBQUE7QUFHNUIsTUFBQSxJQUFNQyx3QkFBd0IsR0FBRzVHLGVBQWUsR0FDNUNBLGVBQWUsQ0FBQzZHLElBQUksRUFBRSxHQUFHLEdBQUcsR0FDNUIsRUFBRSxDQUFBO01BRU4sb0JBQ0VyVCxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDRXRFLFFBQUFBLFNBQVMsRUFBRSxJQUFJLENBQUMyUCxhQUFhLEVBQUc7QUFDaENtRCxRQUFBQSxZQUFZLEVBQ1YsQ0FBQyxJQUFJLENBQUNwZ0IsS0FBSyxDQUFDb2QsZUFBZSxHQUFHLElBQUksQ0FBQzZILGdCQUFnQixHQUFHaGdCLFNBQ3ZEO1FBQ0RpZ0IsY0FBYyxFQUNaLElBQUksQ0FBQ2xsQixLQUFLLENBQUNvZCxlQUFlLEdBQUcsSUFBSSxDQUFDNkgsZ0JBQWdCLEdBQUdoZ0IsU0FDdEQ7QUFDRCxRQUFBLFlBQUEsRUFBQSxFQUFBLENBQUF2RixNQUFBLENBQWVxbEIsd0JBQXdCLENBQUEsQ0FBQXJsQixNQUFBLENBQUc0VyxVQUFnQixDQUFDaFYsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFHO0FBQ2hGa2MsUUFBQUEsSUFBSSxFQUFDLFNBQUE7T0FFSm1ILEVBQUFBLG1CQUFtQixHQUNoQixJQUFJLENBQUNRLFlBQVksRUFBRSxHQUNuQlAscUJBQXFCLEdBQ25CLElBQUksQ0FBQ1EsY0FBYyxFQUFFLEdBQ3JCLElBQUksQ0FBQ0MsV0FBVyxFQUNuQixDQUFDLENBQUE7QUFFVixLQUFBO0FBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLENBcHhCZ0MxVCxDQUFBQSxLQUFLLENBQUN3QyxTQUFTLENBQUE7O0FDdkNaLElBRWpCbVIsSUFBSSwwQkFBQXBVLGdCQUFBLEVBQUE7QUFBQSxFQUFBLFNBQUFvVSxJQUFBLEdBQUE7QUFBQSxJQUFBLElBQUFuVSxLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBa1UsSUFBQSxDQUFBLENBQUE7QUFBQSxJQUFBLEtBQUEsSUFBQS9RLElBQUEsR0FBQXZQLFNBQUEsQ0FBQWhHLE1BQUEsRUFBQXdWLElBQUEsR0FBQXpXLElBQUFBLEtBQUEsQ0FBQXdXLElBQUEsR0FBQUUsSUFBQSxHQUFBLENBQUEsRUFBQUEsSUFBQSxHQUFBRixJQUFBLEVBQUFFLElBQUEsRUFBQSxFQUFBO0FBQUFELE1BQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBelAsR0FBQUEsU0FBQSxDQUFBeVAsSUFBQSxDQUFBLENBQUE7QUFBQSxLQUFBO0FBQUF0RCxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQSxJQUFBLEVBQUFpVSxJQUFBLEVBQUE1bEIsRUFBQUEsQ0FBQUEsTUFBQSxDQUFBOFUsSUFBQSxDQUFBLENBQUEsQ0FBQTtJQUFBbEQsZUFBQSxDQUFBSCxLQUFBLEVBd0NmLE9BQUEsRUFBQTtBQUNOb1UsTUFBQUEsTUFBTSxFQUFFLElBQUE7S0FDVCxDQUFBLENBQUE7SUFBQWpVLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHlCQUFBLEVBWXlCLFlBQU07QUFDOUJxVSxNQUFBQSxxQkFBcUIsQ0FBQyxZQUFNO0FBQzFCLFFBQUEsSUFBSSxDQUFDclUsS0FBQSxDQUFLTCxJQUFJLEVBQUUsT0FBQTtBQUVoQkssUUFBQUEsS0FBQSxDQUFLTCxJQUFJLENBQUM0QyxTQUFTLEdBQ2pCdkMsS0FBQSxDQUFLc1UsUUFBUSxJQUNiSCxJQUFJLENBQUNJLGtCQUFrQixDQUNyQnZVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJsQixRQUFRLEdBQ2Z4VSxLQUFBLENBQUtuUixLQUFLLENBQUMybEIsUUFBUSxDQUFDL1IsWUFBWSxHQUFHekMsS0FBQSxDQUFLeVUsTUFBTSxDQUFDaFMsWUFBWSxHQUMzRHpDLEtBQUEsQ0FBS0wsSUFBSSxDQUFDOEMsWUFBWSxFQUMxQnpDLEtBQUEsQ0FBS3NVLFFBQ1AsQ0FBQyxDQUFBO0FBQ0wsT0FBQyxDQUFDLENBQUE7S0FDSCxDQUFBLENBQUE7QUFBQW5VLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVhLGFBQUEsRUFBQSxVQUFDckosSUFBSSxFQUFLO01BQ3RCLElBQ0csQ0FBQ3FKLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBJLE9BQU8sSUFBSXlJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJJLE9BQU8sS0FDeENILHFCQUFxQixDQUFDVixJQUFJLEVBQUVxSixLQUFBLENBQUtuUixLQUFLLENBQUMsSUFDeEMsQ0FBQ21SLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FJLFlBQVksSUFDdkI4SSxLQUFBLENBQUtuUixLQUFLLENBQUNzSSxZQUFZLElBQ3ZCNkksS0FBQSxDQUFLblIsS0FBSyxDQUFDdUksVUFBVSxLQUNyQkosY0FBYyxDQUFDTCxJQUFJLEVBQUVxSixLQUFBLENBQUtuUixLQUFLLENBQUUsRUFDbkM7QUFDQSxRQUFBLE9BQUE7QUFDRixPQUFBO0FBQ0FtUixNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUM4UixRQUFRLENBQUNoSyxJQUFJLENBQUMsQ0FBQTtLQUMxQixDQUFBLENBQUE7QUFBQXdKLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUNySixJQUFJLEVBQUE7QUFBQSxNQUFBLE9BQ3BCcUosS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxJQUFJbkksWUFBWSxDQUFDbUIsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxFQUFFclEsSUFBSSxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBd0osSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRS9DLGdCQUFBLEVBQUEsVUFBQ3JKLElBQUksRUFBQTtNQUFBLE9BQ25CLENBQUNxSixLQUFBLENBQUtuUixLQUFLLENBQUMwSSxPQUFPLElBQUl5SSxLQUFBLENBQUtuUixLQUFLLENBQUMySSxPQUFPLEtBQ3hDSCxxQkFBcUIsQ0FBQ1YsSUFBSSxFQUFFcUosS0FBQSxDQUFLblIsS0FBSyxDQUFDLElBQ3hDLENBQUNtUixLQUFBLENBQUtuUixLQUFLLENBQUNxSSxZQUFZLElBQ3ZCOEksS0FBQSxDQUFLblIsS0FBSyxDQUFDc0ksWUFBWSxJQUN2QjZJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3VJLFVBQVUsS0FDckJKLGNBQWMsQ0FBQ0wsSUFBSSxFQUFFcUosS0FBQSxDQUFLblIsS0FBSyxDQUFFLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBc1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXpCLFdBQUEsRUFBQSxVQUFDckosSUFBSSxFQUFLO01BQ3BCLElBQUkrZCxPQUFPLEdBQUcsQ0FDWixrQ0FBa0MsRUFDbEMxVSxLQUFBLENBQUtuUixLQUFLLENBQUM4bEIsYUFBYSxHQUFHM1UsS0FBQSxDQUFLblIsS0FBSyxDQUFDOGxCLGFBQWEsQ0FBQ2hlLElBQUksQ0FBQyxHQUFHN0MsU0FBUyxDQUN0RSxDQUFBO0FBRUQsTUFBQSxJQUFJa00sS0FBQSxDQUFLNFUsY0FBYyxDQUFDamUsSUFBSSxDQUFDLEVBQUU7QUFDN0IrZCxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQTtBQUM1RCxPQUFBO0FBRUEsTUFBQSxJQUFJa0UsS0FBQSxDQUFLNlUsY0FBYyxDQUFDbGUsSUFBSSxDQUFDLEVBQUU7QUFDN0IrZCxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQTtBQUM1RCxPQUFBOztBQUVBO0FBQ0EsTUFBQSxJQUNFa0UsS0FBQSxDQUFLblIsS0FBSyxDQUFDaW1CLFdBQVcsSUFDdEIsQ0FBQ2hlLFFBQVEsQ0FBQ0gsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHSSxVQUFVLENBQUNKLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBR2tILFlBQVUsQ0FBQ2xILElBQUksQ0FBQyxLQUM5RHFKLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3lPLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FDM0IsQ0FBQyxFQUNIO0FBQ0FvWCxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQTtBQUM1RCxPQUFBO0FBRUEsTUFBQSxPQUFPNFksT0FBTyxDQUFDOW1CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUN6QixDQUFBLENBQUE7QUFBQXVTLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGlCQUFBLEVBRWlCLFVBQUNULEtBQUssRUFBRTVJLElBQUksRUFBSztBQUNqQyxNQUFBLElBQUk0SSxLQUFLLENBQUM3RCxHQUFHLEtBQUssR0FBRyxFQUFFO1FBQ3JCNkQsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7UUFDdEJoSCxLQUFLLENBQUM3RCxHQUFHLEdBQUcsT0FBTyxDQUFBO0FBQ3JCLE9BQUE7QUFFQSxNQUFBLElBQ0UsQ0FBQzZELEtBQUssQ0FBQzdELEdBQUcsS0FBSyxTQUFTLElBQUk2RCxLQUFLLENBQUM3RCxHQUFHLEtBQUssV0FBVyxLQUNyRDZELEtBQUssQ0FBQ2tFLE1BQU0sQ0FBQ3NSLGVBQWUsRUFDNUI7UUFDQXhWLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO0FBQ3RCaEgsUUFBQUEsS0FBSyxDQUFDa0UsTUFBTSxDQUFDc1IsZUFBZSxDQUFDcEosS0FBSyxFQUFFLENBQUE7QUFDdEMsT0FBQTtBQUNBLE1BQUEsSUFDRSxDQUFDcE0sS0FBSyxDQUFDN0QsR0FBRyxLQUFLLFdBQVcsSUFBSTZELEtBQUssQ0FBQzdELEdBQUcsS0FBSyxZQUFZLEtBQ3hENkQsS0FBSyxDQUFDa0UsTUFBTSxDQUFDdVIsV0FBVyxFQUN4QjtRQUNBelYsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7QUFDdEJoSCxRQUFBQSxLQUFLLENBQUNrRSxNQUFNLENBQUN1UixXQUFXLENBQUNySixLQUFLLEVBQUUsQ0FBQTtBQUNsQyxPQUFBO0FBRUEsTUFBQSxJQUFJcE0sS0FBSyxDQUFDN0QsR0FBRyxLQUFLLE9BQU8sRUFBRTtBQUN6QnNFLFFBQUFBLEtBQUEsQ0FBS2dNLFdBQVcsQ0FBQ3JWLElBQUksQ0FBQyxDQUFBO0FBQ3hCLE9BQUE7QUFDQXFKLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJYLGVBQWUsQ0FBQ2pILEtBQUssQ0FBQyxDQUFBO0tBQ2xDLENBQUEsQ0FBQTtJQUFBWSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsWUFBTTtNQUNsQixJQUFJcEosS0FBSyxHQUFHLEVBQUUsQ0FBQTtBQUNkLE1BQUEsSUFBTXpJLE1BQU0sR0FBRzZSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ1YsTUFBTSxHQUFHNlIsS0FBQSxDQUFLblIsS0FBSyxDQUFDVixNQUFNLEdBQUcsR0FBRyxDQUFBO0FBQzFELE1BQUEsSUFBTW1QLFNBQVMsR0FBRzBDLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3lPLFNBQVMsQ0FBQTtBQUV0QyxNQUFBLElBQU0yWCxVQUFVLEdBQ2RqVixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLElBQUloSCxLQUFBLENBQUtuUixLQUFLLENBQUNxbUIsVUFBVSxJQUFJeHBCLE9BQU8sRUFBRSxDQUFBO0FBRTNELE1BQUEsSUFBTWdNLElBQUksR0FBR3RILGFBQWEsQ0FBQzZrQixVQUFVLENBQUMsQ0FBQTtNQUN0QyxJQUFNRSxpQkFBaUIsR0FDckJuVixLQUFBLENBQUtuUixLQUFLLENBQUNpbUIsV0FBVyxJQUN0QjlVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2ltQixXQUFXLENBQUNNLElBQUksQ0FBQyxVQUFVQyxDQUFDLEVBQUVDLENBQUMsRUFBRTtRQUMxQyxPQUFPRCxDQUFDLEdBQUdDLENBQUMsQ0FBQTtBQUNkLE9BQUMsQ0FBQyxDQUFBO0FBRUosTUFBQSxJQUFNQyxZQUFZLEdBQUcsRUFBRSxHQUFHcFgsYUFBYSxDQUFDOFcsVUFBVSxDQUFDLENBQUE7QUFDbkQsTUFBQSxJQUFNTyxVQUFVLEdBQUdELFlBQVksR0FBR2pZLFNBQVMsQ0FBQTtNQUUzQyxLQUFLLElBQUloQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdrYSxVQUFVLEVBQUVsYSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFNOEIsV0FBVyxHQUFHTyxVQUFVLENBQUNqRyxJQUFJLEVBQUU0RCxDQUFDLEdBQUdnQyxTQUFTLENBQUMsQ0FBQTtBQUNuRDFHLFFBQUFBLEtBQUssQ0FBQ2tGLElBQUksQ0FBQ3NCLFdBQVcsQ0FBQyxDQUFBO0FBRXZCLFFBQUEsSUFBSStYLGlCQUFpQixFQUFFO0FBQ3JCLFVBQUEsSUFBTU0sYUFBYSxHQUFHdFksa0JBQWtCLENBQ3RDekYsSUFBSSxFQUNKMEYsV0FBVyxFQUNYOUIsQ0FBQyxFQUNEZ0MsU0FBUyxFQUNUNlgsaUJBQ0YsQ0FBQyxDQUFBO0FBQ0R2ZSxVQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ3JJLE1BQU0sQ0FBQ2tuQixhQUFhLENBQUMsQ0FBQTtBQUNyQyxTQUFBO0FBQ0YsT0FBQTs7QUFFQTtNQUNBLElBQU1DLFdBQVcsR0FBRzllLEtBQUssQ0FBQytlLE1BQU0sQ0FBQyxVQUFDQyxJQUFJLEVBQUVqZixJQUFJLEVBQUs7UUFDL0MsSUFBSUEsSUFBSSxDQUFDaUksT0FBTyxFQUFFLElBQUlxVyxVQUFVLENBQUNyVyxPQUFPLEVBQUUsRUFBRTtBQUMxQyxVQUFBLE9BQU9qSSxJQUFJLENBQUE7QUFDYixTQUFBO0FBQ0EsUUFBQSxPQUFPaWYsSUFBSSxDQUFBO0FBQ2IsT0FBQyxFQUFFaGYsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFFWixPQUFPQSxLQUFLLENBQUN0SixHQUFHLENBQUMsVUFBQ3FKLElBQUksRUFBRTJFLENBQUMsRUFBSztRQUM1QixvQkFDRWtGLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLElBQUEsRUFBQTtBQUNFL0UsVUFBQUEsR0FBRyxFQUFFSixDQUFFO1VBQ1BvRixPQUFPLEVBQUVWLEtBQUEsQ0FBS2dNLFdBQVcsQ0FBQ3BMLElBQUksQ0FBQVosS0FBQSxFQUFPckosSUFBSSxDQUFFO0FBQzNDd0YsVUFBQUEsU0FBUyxFQUFFNkQsS0FBQSxDQUFLNlYsU0FBUyxDQUFDbGYsSUFBSSxDQUFFO0FBQ2hDbU0sVUFBQUEsR0FBRyxFQUFFLFNBQUFBLEdBQUNnVCxDQUFBQSxFQUFFLEVBQUs7WUFDWCxJQUFJbmYsSUFBSSxLQUFLK2UsV0FBVyxFQUFFO2NBQ3hCMVYsS0FBQSxDQUFLc1UsUUFBUSxHQUFHd0IsRUFBRSxDQUFBO0FBQ3BCLGFBQUE7V0FDQTtBQUNGL0osVUFBQUEsU0FBUyxFQUFFLFNBQUFBLFNBQUMyRyxDQUFBQSxFQUFFLEVBQUs7QUFDakIxUyxZQUFBQSxLQUFBLENBQUt3RyxlQUFlLENBQUNrTSxFQUFFLEVBQUUvYixJQUFJLENBQUMsQ0FBQTtXQUM5QjtVQUNGNlQsUUFBUSxFQUFFN1QsSUFBSSxLQUFLK2UsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUU7QUFDeENySixVQUFBQSxJQUFJLEVBQUMsUUFBUTtVQUNiLGVBQWVyTSxFQUFBQSxLQUFBLENBQUs0VSxjQUFjLENBQUNqZSxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUc3QyxTQUFVO1VBQzlELGVBQWVrTSxFQUFBQSxLQUFBLENBQUs2VSxjQUFjLENBQUNsZSxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUc3QyxTQUFBQTtBQUFVLFNBQUEsRUFFN0QxRyxVQUFVLENBQUN1SixJQUFJLEVBQUV4SSxNQUFNLEVBQUU2UixLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFNLENBQ3pDLENBQUMsQ0FBQTtBQUVULE9BQUMsQ0FBQyxDQUFBO0tBQ0gsQ0FBQSxDQUFBO0FBQUEsSUFBQSxPQUFBNFQsS0FBQSxDQUFBO0FBQUEsR0FBQTtFQUFBNEIsU0FBQSxDQUFBdVMsSUFBQSxFQUFBcFUsZ0JBQUEsQ0FBQSxDQUFBO0VBQUEsT0FBQThCLFlBQUEsQ0FBQXNTLElBQUEsRUFBQSxDQUFBO0lBQUF6WSxHQUFBLEVBQUEsbUJBQUE7SUFBQS9QLEtBQUEsRUF6S0QsU0FBQW1XLGlCQUFBQSxHQUFvQjtBQUNsQjtNQUNBLElBQUksQ0FBQ2lVLHVCQUF1QixFQUFFLENBQUE7TUFDOUIsSUFBSSxJQUFJLENBQUNsbkIsS0FBSyxDQUFDMmxCLFFBQVEsSUFBSSxJQUFJLENBQUNDLE1BQU0sRUFBRTtRQUN0QyxJQUFJLENBQUNuVCxRQUFRLENBQUM7QUFDWjhTLFVBQUFBLE1BQU0sRUFBRSxJQUFJLENBQUN2bEIsS0FBSyxDQUFDMmxCLFFBQVEsQ0FBQy9SLFlBQVksR0FBRyxJQUFJLENBQUNnUyxNQUFNLENBQUNoUyxZQUFBQTtBQUN6RCxTQUFDLENBQUMsQ0FBQTtBQUNKLE9BQUE7QUFDRixLQUFBO0FBQUMsR0FBQSxFQUFBO0lBQUEvRyxHQUFBLEVBQUEsUUFBQTtJQUFBL1AsS0FBQSxFQW1LRCxTQUFBZ1gsTUFBQUEsR0FBUztBQUFBLE1BQUEsSUFBQXNDLE1BQUEsR0FBQSxJQUFBLENBQUE7QUFDUCxNQUFBLElBQVFtUCxNQUFNLEdBQUssSUFBSSxDQUFDOVQsS0FBSyxDQUFyQjhULE1BQU0sQ0FBQTtNQUVkLG9CQUNFNVQsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1FBQ0V0RSxTQUFTLEVBQUEsbUNBQUEsQ0FBQTVOLE1BQUEsQ0FDUCxJQUFJLENBQUNNLEtBQUssQ0FBQ21uQixXQUFXLEdBQ2xCLHFEQUFxRCxHQUNyRCxFQUFFLENBQUE7T0FHUnhWLGVBQUFBLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNFdEUsUUFBQUEsU0FBUyxFQUFBNU4sMERBQUFBLENBQUFBLE1BQUEsQ0FDUCxJQUFJLENBQUNNLEtBQUssQ0FBQ29uQixrQkFBa0IsR0FDekIsc0NBQXNDLEdBQ3RDLEVBQUUsQ0FDTDtBQUNIblQsUUFBQUEsR0FBRyxFQUFFLFNBQUFBLEdBQUMyUixDQUFBQSxNQUFNLEVBQUs7VUFDZnhQLE1BQUksQ0FBQ3dQLE1BQU0sR0FBR0EsTUFBTSxDQUFBO0FBQ3RCLFNBQUE7T0FFQWpVLGVBQUFBLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUFLdEUsUUFBQUEsU0FBUyxFQUFDLCtCQUFBO09BQ1osRUFBQSxJQUFJLENBQUN0TixLQUFLLENBQUNxbkIsV0FDVCxDQUNGLENBQUMsZUFDTjFWLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUFLdEUsUUFBQUEsU0FBUyxFQUFDLHdCQUFBO09BQ2JxRSxlQUFBQSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3RFLFFBQUFBLFNBQVMsRUFBQyw0QkFBQTtPQUNicUUsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsSUFBQSxFQUFBO0FBQ0V0RSxRQUFBQSxTQUFTLEVBQUMsNkJBQTZCO0FBQ3ZDMkcsUUFBQUEsR0FBRyxFQUFFLFNBQUFBLEdBQUNuRCxDQUFBQSxJQUFJLEVBQUs7VUFDYnNGLE1BQUksQ0FBQ3RGLElBQUksR0FBR0EsSUFBSSxDQUFBO1NBQ2hCO1FBQ0ZrRSxLQUFLLEVBQUV1USxNQUFNLEdBQUc7QUFBRUEsVUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtTQUFRLEdBQUcsRUFBRztBQUNoQy9ILFFBQUFBLElBQUksRUFBQyxTQUFTO1FBQ2QsWUFBWSxFQUFBLElBQUksQ0FBQ3hkLEtBQUssQ0FBQ3FuQixXQUFBQTtPQUV0QixFQUFBLElBQUksQ0FBQ0MsV0FBVyxFQUNmLENBQ0QsQ0FDRixDQUNGLENBQUMsQ0FBQTtBQUVWLEtBQUE7QUFBQyxHQUFBLENBQUEsRUFBQSxDQUFBO0lBQUF6YSxHQUFBLEVBQUEsY0FBQTtJQUFBRSxHQUFBLEVBaFFELFNBQUFBLEdBQUFBLEdBQTBCO01BQ3hCLE9BQU87QUFDTDBCLFFBQUFBLFNBQVMsRUFBRSxFQUFFO0FBQ2I4WSxRQUFBQSxZQUFZLEVBQUUsU0FBQUEsWUFBQSxHQUFNLEVBQUU7QUFDdEJKLFFBQUFBLFdBQVcsRUFBRSxJQUFJO0FBQ2pCRSxRQUFBQSxXQUFXLEVBQUUsTUFBQTtPQUNkLENBQUE7QUFDSCxLQUFBO0FBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLENBUitCMVYsQ0FBQUEsS0FBSyxDQUFDd0MsU0FBUyxDQUFBLENBQUE7QUFBQTdDLGVBQUEsQ0FBNUJnVSxJQUFJLEVBQUEsb0JBQUEsRUFVSyxVQUFDa0MsVUFBVSxFQUFFQyxXQUFXLEVBQUs7QUFDdkQsRUFBQSxPQUNFQSxXQUFXLENBQUM5VCxTQUFTLElBQUk2VCxVQUFVLEdBQUcsQ0FBQyxHQUFHQyxXQUFXLENBQUM3VCxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFFM0UsQ0FBQyxDQUFBOztBQzNCeUIsSUFFUDhULElBQUksMEJBQUF4VyxnQkFBQSxFQUFBO0VBc0N2QixTQUFBd1csSUFBQUEsQ0FBWTFuQixLQUFLLEVBQUU7QUFBQSxJQUFBLElBQUFtUixLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBc1csSUFBQSxDQUFBLENBQUE7QUFDakJ2VyxJQUFBQSxLQUFBLEdBQUFFLFVBQUEsQ0FBQXFXLElBQUFBLEVBQUFBLElBQUEsR0FBTTFuQixLQUFLLENBQUEsQ0FBQSxDQUFBO0FBQUVzUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFHSDlDLFdBQUFBLEVBQUFBLGtCQUFBLENBQUl0USxLQUFLLENBQUNvVCxLQUFBLENBQUtuUixLQUFLLENBQUM4SyxjQUFjLENBQUMsQ0FBQSxDQUFFck0sR0FBRyxDQUFDLFlBQUE7QUFBQSxNQUFBLG9CQUNwRGtULEtBQUssQ0FBQ21CLFNBQVMsRUFBRSxDQUFBO0FBQUEsS0FDbkIsQ0FBQyxDQUFBLENBQUE7QUFBQXhCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVZLFlBQUEsRUFBQSxVQUFDalMsSUFBSSxFQUFBO01BQUEsT0FBS29YLGFBQW1CLENBQUNwWCxJQUFJLEVBQUVpUyxLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQUFzUixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFL0MsWUFBQSxFQUFBLFVBQUNqUyxJQUFJLEVBQUE7TUFBQSxPQUFLb1gsYUFBbUIsQ0FBQ3BYLElBQUksRUFBRWlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7SUFBQXNSLGVBQUEsQ0FBQUgsS0FBQSxFQUU1QyxlQUFBLEVBQUEsWUFBQTtBQUFBLE1BQUEsSUFBQTBILHFCQUFBLENBQUE7QUFBQSxNQUFBLE9BQUEsQ0FBQUEscUJBQUEsR0FBTTFILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21aLGFBQWEsTUFBQSxJQUFBLElBQUFOLHFCQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUFBLHFCQUFBLEdBQUkxSCxLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBOUcsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWpELHVCQUFBLEVBQUEsVUFBQ3dXLFFBQVEsRUFBSztNQUNwQyxJQUFNQyxlQUFlLEdBQUcsWUFBWTtRQUNsQyxJQUFJLENBQUNDLFNBQVMsQ0FBQ0YsUUFBUSxDQUFDLENBQUN4VSxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtBQUMxQyxPQUFDLENBQUMvSyxJQUFJLENBQUFaLEtBQUssQ0FBQyxDQUFBO0FBRVp0TixNQUFBQSxNQUFNLENBQUMyaEIscUJBQXFCLENBQUNvQyxlQUFlLENBQUMsQ0FBQTtLQUM5QyxDQUFBLENBQUE7QUFBQXRXLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGlCQUFBLEVBRWlCLFVBQUM3UCxHQUFHLEVBQUVvUCxLQUFLLEVBQUs7QUFDaEMsTUFBQSxJQUFJUyxLQUFBLENBQUtuUixLQUFLLENBQUNzZSxVQUFVLEVBQUU7UUFDekJuTixLQUFBLENBQUtuUixLQUFLLENBQUNzZSxVQUFVLENBQUNoZCxHQUFHLEVBQUVvUCxLQUFLLENBQUMsQ0FBQTtBQUNuQyxPQUFBO0tBQ0QsQ0FBQSxDQUFBO0FBQUFZLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFVBQUNKLE9BQU8sRUFBRWxVLE9BQU8sRUFBSztBQUMzQyxNQUFBLElBQUEwYixXQUFBLEdBQWlDcEgsS0FBQSxDQUFLblIsS0FBSztRQUFuQ2QsSUFBSSxHQUFBcVosV0FBQSxDQUFKclosSUFBSTtRQUFFNEwsY0FBYyxHQUFBeU4sV0FBQSxDQUFkek4sY0FBYyxDQUFBO01BQzVCLElBQUFnZCxxQkFBQSxHQUF3QnhSLGNBQW9CLENBQUNwWCxJQUFJLEVBQUU0TCxjQUFjLENBQUM7UUFBMURhLFdBQVcsR0FBQW1jLHFCQUFBLENBQVhuYyxXQUFXLENBQUE7QUFFbkIsTUFBQSxJQUFJd0YsS0FBQSxDQUFLb0csVUFBVSxDQUFDMWEsT0FBTyxDQUFDLElBQUlzVSxLQUFBLENBQUs0SSxVQUFVLENBQUNsZCxPQUFPLENBQUMsRUFBRSxPQUFBO0FBQzFEc1UsTUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDcWhCLGVBQWUsQ0FBQ3hrQixPQUFPLENBQUMsQ0FBQTtBQUVuQyxNQUFBLElBQUlrVSxPQUFPLEdBQUdwRixXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDaEN3RixRQUFBQSxLQUFBLENBQUs0VyxxQkFBcUIsQ0FBQ2pkLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNoRCxPQUFDLE1BQU0sSUFBSWlHLE9BQU8sR0FBR3BGLFdBQVcsS0FBS2IsY0FBYyxFQUFFO0FBQ25EcUcsUUFBQUEsS0FBQSxDQUFLNFcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0IsT0FBQyxNQUFNNVcsS0FBQSxDQUFLMFcsU0FBUyxDQUFDOVcsT0FBTyxHQUFHcEYsV0FBVyxDQUFDLENBQUN3SCxPQUFPLENBQUMySixLQUFLLEVBQUUsQ0FBQTtLQUM3RCxDQUFBLENBQUE7QUFBQXhMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFdBQUEsRUFFVyxVQUFDNlcsQ0FBQyxFQUFFcFEsS0FBSyxFQUFBO0FBQUEsTUFBQSxPQUFLdEIsU0FBZSxDQUFDMFIsQ0FBQyxFQUFFcFEsS0FBSyxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBdEcsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW5DLGVBQUEsRUFBQSxVQUFDNlcsQ0FBQyxFQUFBO0FBQUEsTUFBQSxPQUFLQSxDQUFDLEtBQUt6aEIsT0FBTyxDQUFDMUosT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQUF5VSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaEMsY0FBQSxFQUFBLFVBQUM2VyxDQUFDLEVBQUE7QUFBQSxNQUFBLE9BQ2Y3VyxLQUFBLENBQUtuUixLQUFLLENBQUNGLFNBQVMsSUFDcEJxUixLQUFBLENBQUtuUixLQUFLLENBQUNELE9BQU8sSUFDbEJ1VyxVQUFnQixDQUFDQSxPQUFhLENBQUN6WixPQUFPLEVBQUUsRUFBRW1yQixDQUFDLENBQUMsRUFBRTdXLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ0YsU0FBUyxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBd1IsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRXhELFlBQUEsRUFBQSxVQUFDNlcsQ0FBQyxFQUFBO0FBQUEsTUFBQSxPQUNiN1csS0FBQSxDQUFLblIsS0FBSyxDQUFDRixTQUFTLElBQ3BCcVIsS0FBQSxDQUFLblIsS0FBSyxDQUFDRCxPQUFPLElBQ2xCdVcsVUFBZ0IsQ0FBQ0EsT0FBYSxDQUFDelosT0FBTyxFQUFFLEVBQUVtckIsQ0FBQyxDQUFDLEVBQUU3VyxLQUFBLENBQUtuUixLQUFLLENBQUNELE9BQU8sQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7QUFBQXVSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV2RCxXQUFBLEVBQUEsVUFBQzZXLENBQUMsRUFBQTtBQUFBLE1BQUEsT0FDWjFSLGFBQW1CLENBQUMwUixDQUFDLEVBQUU3VyxLQUFBLENBQUtuUixLQUFLLENBQUNGLFNBQVMsRUFBRXFSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ0QsT0FBTyxDQUFDLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBdVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRTdDLG9CQUFBLEVBQUEsVUFBQzZXLENBQUMsRUFBSztBQUMxQixNQUFBLElBQUF2UCxZQUFBLEdBQ0V0SCxLQUFBLENBQUtuUixLQUFLO1FBREorWSxZQUFZLEdBQUFOLFlBQUEsQ0FBWk0sWUFBWTtRQUFFQyxVQUFVLEdBQUFQLFlBQUEsQ0FBVk8sVUFBVTtRQUFFQyxZQUFZLEdBQUFSLFlBQUEsQ0FBWlEsWUFBWTtRQUFFblosU0FBUyxHQUFBMlksWUFBQSxDQUFUM1ksU0FBUztRQUFFQyxPQUFPLEdBQUEwWSxZQUFBLENBQVAxWSxPQUFPLENBQUE7QUFHbEUsTUFBQSxJQUNFLEVBQUVnWixZQUFZLElBQUlDLFVBQVUsSUFBSUMsWUFBWSxDQUFDLElBQzdDLENBQUM5SCxLQUFBLENBQUtnSSxhQUFhLEVBQUUsRUFDckI7QUFDQSxRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtNQUNBLElBQUlKLFlBQVksSUFBSWhaLE9BQU8sRUFBRTtBQUMzQixRQUFBLE9BQU91VyxhQUFtQixDQUFDMFIsQ0FBQyxFQUFFN1csS0FBQSxDQUFLZ0ksYUFBYSxFQUFFLEVBQUVwWixPQUFPLENBQUMsQ0FBQTtBQUM5RCxPQUFBO01BQ0EsSUFBSWlaLFVBQVUsSUFBSWxaLFNBQVMsRUFBRTtBQUMzQixRQUFBLE9BQU93VyxhQUFtQixDQUFDMFIsQ0FBQyxFQUFFbG9CLFNBQVMsRUFBRXFSLEtBQUEsQ0FBS2dJLGFBQWEsRUFBRSxDQUFDLENBQUE7QUFDaEUsT0FBQTtBQUNBLE1BQUEsSUFBSUYsWUFBWSxJQUFJblosU0FBUyxJQUFJLENBQUNDLE9BQU8sRUFBRTtBQUN6QyxRQUFBLE9BQU91VyxhQUFtQixDQUFDMFIsQ0FBQyxFQUFFbG9CLFNBQVMsRUFBRXFSLEtBQUEsQ0FBS2dJLGFBQWEsRUFBRSxDQUFDLENBQUE7QUFDaEUsT0FBQTtBQUNBLE1BQUEsT0FBTyxLQUFLLENBQUE7S0FDYixDQUFBLENBQUE7QUFBQTdILElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV1Qix1QkFBQSxFQUFBLFVBQUM2VyxDQUFDLEVBQUs7QUFDN0IsTUFBQSxJQUFJLENBQUM3VyxLQUFBLENBQUtrSSxrQkFBa0IsQ0FBQzJPLENBQUMsQ0FBQyxFQUFFO0FBQy9CLFFBQUEsT0FBTyxLQUFLLENBQUE7QUFDZCxPQUFBO0FBRUEsTUFBQSxJQUFBcFAsWUFBQSxHQUFvQ3pILEtBQUEsQ0FBS25SLEtBQUs7UUFBdENGLFNBQVMsR0FBQThZLFlBQUEsQ0FBVDlZLFNBQVM7UUFBRWlaLFlBQVksR0FBQUgsWUFBQSxDQUFaRyxZQUFZLENBQUE7TUFDL0IsSUFBTWtQLEtBQUssR0FBRzNSLE9BQWEsQ0FBQ3paLE9BQU8sRUFBRSxFQUFFbXJCLENBQUMsQ0FBQyxDQUFBO0FBRXpDLE1BQUEsSUFBSWpQLFlBQVksRUFBRTtRQUNoQixPQUFPekMsVUFBZ0IsQ0FBQzJSLEtBQUssRUFBRTlXLEtBQUEsQ0FBS2dJLGFBQWEsRUFBRSxDQUFDLENBQUE7QUFDdEQsT0FBQTtBQUNBLE1BQUEsT0FBTzdDLFVBQWdCLENBQUMyUixLQUFLLEVBQUVub0IsU0FBUyxDQUFDLENBQUE7S0FDMUMsQ0FBQSxDQUFBO0FBQUF3UixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDNlcsQ0FBQyxFQUFLO0FBQzNCLE1BQUEsSUFBSSxDQUFDN1csS0FBQSxDQUFLa0ksa0JBQWtCLENBQUMyTyxDQUFDLENBQUMsRUFBRTtBQUMvQixRQUFBLE9BQU8sS0FBSyxDQUFBO0FBQ2QsT0FBQTtBQUVBLE1BQUEsSUFBQWxQLFlBQUEsR0FBOEMzSCxLQUFBLENBQUtuUixLQUFLO1FBQWhERCxPQUFPLEdBQUErWSxZQUFBLENBQVAvWSxPQUFPO1FBQUVpWixVQUFVLEdBQUFGLFlBQUEsQ0FBVkUsVUFBVTtRQUFFQyxZQUFZLEdBQUFILFlBQUEsQ0FBWkcsWUFBWSxDQUFBO01BQ3pDLElBQU1nUCxLQUFLLEdBQUczUixPQUFhLENBQUN6WixPQUFPLEVBQUUsRUFBRW1yQixDQUFDLENBQUMsQ0FBQTtNQUV6QyxJQUFJaFAsVUFBVSxJQUFJQyxZQUFZLEVBQUU7UUFDOUIsT0FBTzNDLFVBQWdCLENBQUMyUixLQUFLLEVBQUU5VyxLQUFBLENBQUtnSSxhQUFhLEVBQUUsQ0FBQyxDQUFBO0FBQ3RELE9BQUE7QUFDQSxNQUFBLE9BQU83QyxVQUFnQixDQUFDMlIsS0FBSyxFQUFFbG9CLE9BQU8sQ0FBQyxDQUFBO0tBQ3hDLENBQUEsQ0FBQTtBQUFBdVIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRW9CLG9CQUFBLEVBQUEsVUFBQzZXLENBQUMsRUFBSztBQUMxQixNQUFBLElBQU05b0IsSUFBSSxHQUFHb1gsY0FBb0IsQ0FBQ0EsT0FBYSxDQUFDbkYsS0FBQSxDQUFLblIsS0FBSyxDQUFDZCxJQUFJLEVBQUU4b0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUNwRSxPQUNFLENBQUM3VyxLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMEIsSUFDdEMsQ0FBQzNHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NjLE1BQU0sSUFDbEIsQ0FBQ2hHLFNBQWUsQ0FBQ3BYLElBQUksRUFBRW9YLGNBQW9CLENBQUNuRixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUMsQ0FBQyxJQUNqRTdCLFNBQWUsQ0FBQ3BYLElBQUksRUFBRW9YLGNBQW9CLENBQUNuRixLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUMsQ0FBQyxDQUFBO0tBRXZFLENBQUEsQ0FBQTtBQUFBOUcsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQUEsYUFBQSxFQUVhLFVBQUN3RCxDQUFDLEVBQUVxVCxDQUFDLEVBQUs7QUFDdEIsTUFBQSxJQUFROW9CLElBQUksR0FBS2lTLEtBQUEsQ0FBS25SLEtBQUssQ0FBbkJkLElBQUksQ0FBQTtBQUNaaVMsTUFBQUEsS0FBQSxDQUFLK1csZUFBZSxDQUFDNVIsY0FBb0IsQ0FBQ0EsT0FBYSxDQUFDcFgsSUFBSSxFQUFFOG9CLENBQUMsQ0FBQyxDQUFDLEVBQUVyVCxDQUFDLENBQUMsQ0FBQTtLQUN0RSxDQUFBLENBQUE7QUFBQXJELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFZSxVQUFDd0QsQ0FBQyxFQUFFcVQsQ0FBQyxFQUFLO0FBQ3hCLE1BQUEsSUFBUW5iLEdBQUcsR0FBSzhILENBQUMsQ0FBVDlILEdBQUcsQ0FBQTtBQUNYLE1BQUEsSUFBUThLLGVBQWUsR0FBS3hHLEtBQUEsQ0FBS25SLEtBQUssQ0FBOUIyWCxlQUFlLENBQUE7QUFFdkIsTUFBQSxJQUFJLENBQUN4RyxLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMEIsRUFBRTtBQUMxQyxRQUFBLFFBQVFqTCxHQUFHO0FBQ1QsVUFBQSxLQUFLLE9BQU87QUFDVnNFLFlBQUFBLEtBQUEsQ0FBS2dYLFdBQVcsQ0FBQ3hULENBQUMsRUFBRXFULENBQUMsQ0FBQyxDQUFBO1lBQ3RCN1csS0FBQSxDQUFLblIsS0FBSyxDQUFDcWhCLGVBQWUsQ0FBQ2xRLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsQ0FBQyxDQUFBO0FBQy9DLFlBQUEsTUFBQTtBQUNGLFVBQUEsS0FBSyxZQUFZO0FBQ2ZoSCxZQUFBQSxLQUFBLENBQUtpWCxvQkFBb0IsQ0FDdkJKLENBQUMsR0FBRyxDQUFDLEVBQ0wxUixRQUFjLENBQUNuRixLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLEVBQUUsQ0FBQyxDQUMzQyxDQUFDLENBQUE7QUFDRCxZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssV0FBVztBQUNkakgsWUFBQUEsS0FBQSxDQUFLaVgsb0JBQW9CLENBQ3ZCSixDQUFDLEdBQUcsQ0FBQyxFQUNMMVIsUUFBYyxDQUFDbkYsS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBWSxFQUFFLENBQUMsQ0FDM0MsQ0FBQyxDQUFBO0FBQ0QsWUFBQSxNQUFBO0FBQ0osU0FBQTtBQUNGLE9BQUE7QUFFQVQsTUFBQUEsZUFBZSxJQUFJQSxlQUFlLENBQUNoRCxDQUFDLENBQUMsQ0FBQTtLQUN0QyxDQUFBLENBQUE7QUFBQXJELElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUM2VyxDQUFDLEVBQUs7QUFDekIsTUFBQSxJQUFBMU8sWUFBQSxHQVNJbkksS0FBQSxDQUFLblIsS0FBSztRQVJaZCxJQUFJLEdBQUFvYSxZQUFBLENBQUpwYSxJQUFJO1FBQ0p6QixPQUFPLEdBQUE2YixZQUFBLENBQVA3YixPQUFPO1FBQ1B5SCxPQUFPLEdBQUFvVSxZQUFBLENBQVBwVSxPQUFPO1FBQ1BpVCxRQUFRLEdBQUFtQixZQUFBLENBQVJuQixRQUFRO1FBQ1JoVCxZQUFZLEdBQUFtVSxZQUFBLENBQVpuVSxZQUFZO1FBQ1pFLFlBQVksR0FBQWlVLFlBQUEsQ0FBWmpVLFlBQVk7UUFDWkUsVUFBVSxHQUFBK1QsWUFBQSxDQUFWL1QsVUFBVTtRQUNWOGlCLGFBQWEsR0FBQS9PLFlBQUEsQ0FBYitPLGFBQWEsQ0FBQTtNQUdmLE9BQU9yVSxJQUFJLENBQ1QsNkJBQTZCLEVBQUEseUJBQUEsQ0FBQXRVLE1BQUEsQ0FDSHNvQixDQUFDLENBQzNCSyxFQUFBQSxhQUFhLEdBQUdBLGFBQWEsQ0FBQy9SLE9BQWEsQ0FBQ3BYLElBQUksRUFBRThvQixDQUFDLENBQUMsQ0FBQyxHQUFHL2lCLFNBQVMsRUFDakU7QUFDRSxRQUFBLHVDQUF1QyxFQUFFK2lCLENBQUMsS0FBS3poQixPQUFPLENBQUM0UixRQUFRLENBQUM7UUFDaEUsdUNBQXVDLEVBQ3JDLENBQUMxYSxPQUFPLElBQUl5SCxPQUFPLElBQUlDLFlBQVksSUFBSUUsWUFBWSxJQUFJRSxVQUFVLEtBQ2pFK1EsY0FBb0IsQ0FBQzBSLENBQUMsRUFBRTdXLEtBQUEsQ0FBS25SLEtBQUssQ0FBQztBQUNyQyxRQUFBLGdEQUFnRCxFQUM5Q21SLEtBQUEsQ0FBSzhJLGtCQUFrQixDQUFDK04sQ0FBQyxDQUFDO0FBQzVCLFFBQUEsMENBQTBDLEVBQUU3VyxLQUFBLENBQUsrSSxZQUFZLENBQUM4TixDQUFDLENBQUM7QUFDaEUsUUFBQSx3Q0FBd0MsRUFBRTdXLEtBQUEsQ0FBS2dKLFVBQVUsQ0FBQzZOLENBQUMsQ0FBQztBQUM1RCxRQUFBLHVDQUF1QyxFQUFFN1csS0FBQSxDQUFLSCxTQUFTLENBQUNnWCxDQUFDLENBQUM7QUFDMUQsUUFBQSxpREFBaUQsRUFDL0M3VyxLQUFBLENBQUtrSSxrQkFBa0IsQ0FBQzJPLENBQUMsQ0FBQztBQUM1QixRQUFBLG9EQUFvRCxFQUNsRDdXLEtBQUEsQ0FBS2lKLHFCQUFxQixDQUFDNE4sQ0FBQyxDQUFDO0FBQy9CLFFBQUEsa0RBQWtELEVBQ2hEN1csS0FBQSxDQUFLa0osbUJBQW1CLENBQUMyTixDQUFDLENBQUM7QUFDN0IsUUFBQSxvQ0FBb0MsRUFBRTdXLEtBQUEsQ0FBS21YLGFBQWEsQ0FBQ04sQ0FBQyxDQUFBO0FBQzVELE9BQ0YsQ0FBQyxDQUFBO0tBQ0YsQ0FBQSxDQUFBO0FBQUExVyxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDNlcsQ0FBQyxFQUFLO0FBQ3ZCLE1BQUEsSUFBSTdXLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhYLDBCQUEwQixFQUFFLE9BQU8sSUFBSSxDQUFBO01BQ3RELElBQU15USxXQUFXLEdBQUdqUyxPQUFhLENBQUNuRixLQUFBLENBQUtuUixLQUFLLENBQUNvWSxZQUFZLENBQUMsQ0FBQTtBQUUxRCxNQUFBLE9BQU80UCxDQUFDLEtBQUtPLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO0tBQ3RDLENBQUEsQ0FBQTtJQUFBalgsZUFBQSxDQUFBSCxLQUFBLEVBQUEsNEJBQUEsRUFFNEIsWUFBTTtBQUNqQyxNQUFBLElBQUFxSSxZQUFBLEdBQ0VySSxLQUFBLENBQUtuUixLQUFLO1FBREptWixhQUFhLEdBQUFLLFlBQUEsQ0FBYkwsYUFBYTtRQUFFSixZQUFZLEdBQUFTLFlBQUEsQ0FBWlQsWUFBWTtRQUFFQyxVQUFVLEdBQUFRLFlBQUEsQ0FBVlIsVUFBVTtRQUFFQyxZQUFZLEdBQUFPLFlBQUEsQ0FBWlAsWUFBWSxDQUFBO01BRTdELE9BQU9qRixJQUFJLENBQUMsd0JBQXdCLEVBQUU7QUFDcEMsUUFBQSx5Q0FBeUMsRUFDdkNtRixhQUFhLEtBQUtKLFlBQVksSUFBSUMsVUFBVSxJQUFJQyxZQUFZLENBQUE7QUFDaEUsT0FBQyxDQUFDLENBQUE7S0FDSCxDQUFBLENBQUE7QUFBQTNILElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUM2VyxDQUFDLEVBQUs7QUFDdEIsTUFBQSxPQUFPN1csS0FBQSxDQUFLblIsS0FBSyxDQUFDd29CLGlCQUFpQixHQUFHclgsS0FBQSxDQUFLblIsS0FBSyxDQUFDd29CLGlCQUFpQixDQUFDUixDQUFDLENBQUMsR0FBR0EsQ0FBQyxDQUFBO0tBQzFFLENBQUEsQ0FBQTtBQUFBLElBQUEsT0FBQTdXLEtBQUEsQ0FBQTtBQTdNRCxHQUFBO0VBQUM0QixTQUFBLENBQUEyVSxJQUFBLEVBQUF4VyxnQkFBQSxDQUFBLENBQUE7RUFBQSxPQUFBOEIsWUFBQSxDQUFBMFUsSUFBQSxFQUFBLENBQUE7SUFBQTdhLEdBQUEsRUFBQSxRQUFBO0lBQUEvUCxLQUFBLEVBK01ELFNBQUFnWCxNQUFBQSxHQUFTO0FBQUEsTUFBQSxJQUFBc0MsTUFBQSxHQUFBLElBQUEsQ0FBQTtNQUNQLElBQU0xRSxTQUFTLEdBQUcsRUFBRSxDQUFBO0FBQ3BCLE1BQUEsSUFBQStILFlBQUEsR0FDRSxJQUFJLENBQUN6WixLQUFLO1FBREpkLElBQUksR0FBQXVhLFlBQUEsQ0FBSnZhLElBQUk7UUFBRTRMLGNBQWMsR0FBQTJPLFlBQUEsQ0FBZDNPLGNBQWM7UUFBRTJkLGdCQUFnQixHQUFBaFAsWUFBQSxDQUFoQmdQLGdCQUFnQjtRQUFFQyxnQkFBZ0IsR0FBQWpQLFlBQUEsQ0FBaEJpUCxnQkFBZ0IsQ0FBQTtNQUVoRSxJQUFBQyxzQkFBQSxHQUFtQ3JTLGNBQW9CLENBQ3JEcFgsSUFBSSxFQUNKNEwsY0FDRixDQUFDO1FBSE9hLFdBQVcsR0FBQWdkLHNCQUFBLENBQVhoZCxXQUFXO1FBQUVWLFNBQVMsR0FBQTBkLHNCQUFBLENBQVQxZCxTQUFTLENBQUE7QUFHNUIsTUFBQSxJQUFBMmQsS0FBQSxHQUFBLFNBQUFBLEtBQUFaLENBQUFBLENBQUEsRUFFNkM7QUFDN0N0VyxRQUFBQSxTQUFTLENBQUN6RSxJQUFJLGVBQ1owRSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7VUFDRXFDLEdBQUcsRUFBRW1DLE1BQUksQ0FBQ3lSLFNBQVMsQ0FBQ0csQ0FBQyxHQUFHcmMsV0FBVyxDQUFFO0FBQ3JDa0csVUFBQUEsT0FBTyxFQUFFLFNBQUFBLE9BQUNnUyxDQUFBQSxFQUFFLEVBQUs7QUFDZnpOLFlBQUFBLE1BQUksQ0FBQytSLFdBQVcsQ0FBQ3RFLEVBQUUsRUFBRW1FLENBQUMsQ0FBQyxDQUFBO1dBQ3ZCO0FBQ0Y5SyxVQUFBQSxTQUFTLEVBQUUsU0FBQUEsU0FBQzJHLENBQUFBLEVBQUUsRUFBSztBQUNqQixZQUFBLElBQUl2TixjQUFvQixDQUFDdU4sRUFBRSxDQUFDLEVBQUU7Y0FDNUJBLEVBQUUsQ0FBQ25NLGNBQWMsRUFBRSxDQUFBO2NBQ25CbU0sRUFBRSxDQUFDaFgsR0FBRyxHQUFHLE9BQU8sQ0FBQTtBQUNsQixhQUFBO0FBRUF1SixZQUFBQSxNQUFJLENBQUN5UyxhQUFhLENBQUNoRixFQUFFLEVBQUVtRSxDQUFDLENBQUMsQ0FBQTtXQUN6QjtBQUNGck0sVUFBQUEsUUFBUSxFQUFFdkYsTUFBSSxDQUFDMFMsZUFBZSxDQUFDZCxDQUFDLENBQUU7QUFDbEMxYSxVQUFBQSxTQUFTLEVBQUU4SSxNQUFJLENBQUMyUyxpQkFBaUIsQ0FBQ2YsQ0FBQyxDQUFFO1VBQ3JDeFEsWUFBWSxFQUNWLENBQUNwQixNQUFJLENBQUNwVyxLQUFLLENBQUNvZCxlQUFlLEdBQ3ZCLFVBQUN5RyxFQUFFLEVBQUE7QUFBQSxZQUFBLE9BQUs0RSxnQkFBZ0IsQ0FBQzVFLEVBQUUsRUFBRW1FLENBQUMsQ0FBQyxDQUFBO0FBQUEsV0FBQSxHQUMvQi9pQixTQUNMO1VBQ0RxWSxjQUFjLEVBQ1psSCxNQUFJLENBQUNwVyxLQUFLLENBQUNvZCxlQUFlLEdBQ3RCLFVBQUN5RyxFQUFFLEVBQUE7QUFBQSxZQUFBLE9BQUs0RSxnQkFBZ0IsQ0FBQzVFLEVBQUUsRUFBRW1FLENBQUMsQ0FBQyxDQUFBO0FBQUEsV0FBQSxHQUMvQi9pQixTQUNMO1VBQ0RtYixZQUFZLEVBQ1YsQ0FBQ2hLLE1BQUksQ0FBQ3BXLEtBQUssQ0FBQ29kLGVBQWUsR0FDdkIsVUFBQ3lHLEVBQUUsRUFBQTtBQUFBLFlBQUEsT0FBSzZFLGdCQUFnQixDQUFDN0UsRUFBRSxFQUFFbUUsQ0FBQyxDQUFDLENBQUE7QUFBQSxXQUFBLEdBQy9CL2lCLFNBQ0w7VUFDRGlnQixjQUFjLEVBQ1o5TyxNQUFJLENBQUNwVyxLQUFLLENBQUNvZCxlQUFlLEdBQ3RCLFVBQUN5RyxFQUFFLEVBQUE7QUFBQSxZQUFBLE9BQUs2RSxnQkFBZ0IsQ0FBQzdFLEVBQUUsRUFBRW1FLENBQUMsQ0FBQyxDQUFBO0FBQUEsV0FBQSxHQUMvQi9pQixTQUNMO0FBQ0Q0SCxVQUFBQSxHQUFHLEVBQUVtYixDQUFFO1VBQ1AsY0FBYzVSLEVBQUFBLE1BQUksQ0FBQ2tTLGFBQWEsQ0FBQ04sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHL2lCLFNBQUFBO0FBQVUsU0FBQSxFQUV4RG1SLE1BQUksQ0FBQzRTLGNBQWMsQ0FBQ2hCLENBQUMsQ0FDbkIsQ0FDUCxDQUFDLENBQUE7T0FDRixDQUFBO01BM0NELEtBQUssSUFBSUEsQ0FBQyxHQUFHcmMsV0FBVyxFQUFFcWMsQ0FBQyxJQUFJL2MsU0FBUyxFQUFFK2MsQ0FBQyxFQUFFLEVBQUE7QUFBQVksUUFBQUEsS0FBQSxDQUFBWixDQUFBLENBQUEsQ0FBQTtBQUFBLE9BQUE7TUE2QzdDLG9CQUNFclcsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUt0RSxRQUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDMmIsMEJBQTBCLEVBQUM7T0FDOUN0WCxlQUFBQSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDRXRFLFFBQUFBLFNBQVMsRUFBQyxnQ0FBZ0M7QUFDMUM4UyxRQUFBQSxZQUFZLEVBQ1YsQ0FBQyxJQUFJLENBQUNwZ0IsS0FBSyxDQUFDb2QsZUFBZSxHQUN2QixJQUFJLENBQUNwZCxLQUFLLENBQUNrcEIsa0JBQWtCLEdBQzdCamtCLFNBQ0w7QUFDRGlnQixRQUFBQSxjQUFjLEVBQ1osSUFBSSxDQUFDbGxCLEtBQUssQ0FBQ29kLGVBQWUsR0FDdEIsSUFBSSxDQUFDcGQsS0FBSyxDQUFDa3BCLGtCQUFrQixHQUM3QmprQixTQUFBQTtPQUdMeU0sRUFBQUEsU0FDRSxDQUNGLENBQUMsQ0FBQTtBQUVWLEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0FoVStCQyxDQUFBQSxLQUFLLENBQUN3QyxTQUFTLENBQUE7O0FDTGQsSUFFZGdWLFNBQVMsMEJBQUFqWSxnQkFBQSxFQUFBO0VBUzVCLFNBQUFpWSxTQUFBQSxDQUFZbnBCLEtBQUssRUFBRTtBQUFBLElBQUEsSUFBQW1SLEtBQUEsQ0FBQTtBQUFBQyxJQUFBQSxlQUFBLE9BQUErWCxTQUFBLENBQUEsQ0FBQTtBQUNqQmhZLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBOFgsSUFBQUEsRUFBQUEsU0FBQSxHQUFNbnBCLEtBQUssQ0FBQSxDQUFBLENBQUE7QUFBRXNSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQWtCQSxjQUFBLEVBQUEsVUFBQ3JKLElBQUksRUFBSztNQUN2QnFKLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFM0ssUUFBQUEsSUFBSSxFQUFKQSxJQUFBQTtBQUFLLE9BQUMsQ0FBQyxDQUFBO0FBRXZCLE1BQUEsSUFBY3NoQixRQUFRLEdBQUtqWSxLQUFBLENBQUtuUixLQUFLLENBQTdCZCxJQUFJLENBQUE7TUFDWixJQUFNbXFCLGVBQWUsR0FBR0QsUUFBUSxZQUFZanNCLElBQUksSUFBSSxDQUFDbXNCLEtBQUssQ0FBQ0YsUUFBUSxDQUFDLENBQUE7TUFDcEUsSUFBTWxxQixJQUFJLEdBQUdtcUIsZUFBZSxHQUFHRCxRQUFRLEdBQUcsSUFBSWpzQixJQUFJLEVBQUUsQ0FBQTtBQUVwRCtCLE1BQUFBLElBQUksQ0FBQzhCLFFBQVEsQ0FBQzhHLElBQUksQ0FBQ3loQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQ3JxQixNQUFBQSxJQUFJLENBQUMrQixVQUFVLENBQUM2RyxJQUFJLENBQUN5aEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFFbkNwWSxNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUM4UixRQUFRLENBQUM1UyxJQUFJLENBQUMsQ0FBQTtLQUMxQixDQUFBLENBQUE7SUFBQW9TLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGlCQUFBLEVBRWlCLFlBQU07QUFDdEIsTUFBQSxJQUFRckosSUFBSSxHQUFLcUosS0FBQSxDQUFLTSxLQUFLLENBQW5CM0osSUFBSSxDQUFBO0FBQ1osTUFBQSxJQUFBeVEsV0FBQSxHQUE4Q3BILEtBQUEsQ0FBS25SLEtBQUs7UUFBaERkLElBQUksR0FBQXFaLFdBQUEsQ0FBSnJaLElBQUk7UUFBRXNxQixVQUFVLEdBQUFqUixXQUFBLENBQVZpUixVQUFVO1FBQUVDLGVBQWUsR0FBQWxSLFdBQUEsQ0FBZmtSLGVBQWUsQ0FBQTtBQUV6QyxNQUFBLElBQUlBLGVBQWUsRUFBRTtBQUNuQixRQUFBLG9CQUFPOVgsS0FBSyxDQUFDK1gsWUFBWSxDQUFDRCxlQUFlLEVBQUU7QUFDekN2cUIsVUFBQUEsSUFBSSxFQUFKQSxJQUFJO0FBQ0pwQyxVQUFBQSxLQUFLLEVBQUVnTCxJQUFJO1VBQ1hnSyxRQUFRLEVBQUVYLEtBQUEsQ0FBS29XLFlBQUFBO0FBQ2pCLFNBQUMsQ0FBQyxDQUFBO0FBQ0osT0FBQTtNQUVBLG9CQUNFNVYsS0FBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0UrWCxRQUFBQSxJQUFJLEVBQUMsTUFBTTtBQUNYcmMsUUFBQUEsU0FBUyxFQUFDLDhCQUE4QjtBQUN4Q3NjLFFBQUFBLFdBQVcsRUFBQyxNQUFNO0FBQ2xCQyxRQUFBQSxJQUFJLEVBQUMsWUFBWTtRQUNqQkMsUUFBUSxFQUFBLElBQUE7QUFDUmh0QixRQUFBQSxLQUFLLEVBQUVnTCxJQUFLO0FBQ1pnSyxRQUFBQSxRQUFRLEVBQUUsU0FBQUEsUUFBQytSLENBQUFBLEVBQUUsRUFBSztVQUNoQjFTLEtBQUEsQ0FBS29XLFlBQVksQ0FBQzFELEVBQUUsQ0FBQ2pQLE1BQU0sQ0FBQzlYLEtBQUssSUFBSTBzQixVQUFVLENBQUMsQ0FBQTtBQUNsRCxTQUFBO0FBQUUsT0FDSCxDQUFDLENBQUE7S0FFTCxDQUFBLENBQUE7SUF0RENyWSxLQUFBLENBQUtNLEtBQUssR0FBRztBQUNYM0osTUFBQUEsSUFBSSxFQUFFcUosS0FBQSxDQUFLblIsS0FBSyxDQUFDd3BCLFVBQUFBO0tBQ2xCLENBQUE7QUFBQyxJQUFBLE9BQUFyWSxLQUFBLENBQUE7QUFDSixHQUFBO0VBQUM0QixTQUFBLENBQUFvVyxTQUFBLEVBQUFqWSxnQkFBQSxDQUFBLENBQUE7RUFBQSxPQUFBOEIsWUFBQSxDQUFBbVcsU0FBQSxFQUFBLENBQUE7SUFBQXRjLEdBQUEsRUFBQSxRQUFBO0lBQUEvUCxLQUFBLEVBcURELFNBQUFnWCxNQUFBQSxHQUFTO01BQ1Asb0JBQ0VuQyxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3RFLFFBQUFBLFNBQVMsRUFBQyx3Q0FBQTtPQUNicUUsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUt0RSxRQUFBQSxTQUFTLEVBQUMsZ0NBQUE7T0FDWixFQUFBLElBQUksQ0FBQ3ROLEtBQUssQ0FBQytwQixjQUNULENBQUMsZUFDTnBZLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUFLdEUsUUFBQUEsU0FBUyxFQUFDLHdDQUFBO09BQ2JxRSxlQUFBQSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3RFLFFBQUFBLFNBQVMsRUFBQyw4QkFBQTtBQUE4QixPQUFBLEVBQzFDLElBQUksQ0FBQzBjLGVBQWUsRUFDbEIsQ0FDRixDQUNGLENBQUMsQ0FBQTtBQUVWLEtBQUE7QUFBQyxHQUFBLENBQUEsRUFBQSxDQUFBO0lBQUFuZCxHQUFBLEVBQUEsMEJBQUE7QUFBQS9QLElBQUFBLEtBQUEsRUFoRUQsU0FBQW10Qix3QkFBQUEsQ0FBZ0NqcUIsS0FBSyxFQUFFeVIsS0FBSyxFQUFFO0FBQzVDLE1BQUEsSUFBSXpSLEtBQUssQ0FBQ3dwQixVQUFVLEtBQUsvWCxLQUFLLENBQUMzSixJQUFJLEVBQUU7UUFDbkMsT0FBTztVQUNMQSxJQUFJLEVBQUU5SCxLQUFLLENBQUN3cEIsVUFBQUE7U0FDYixDQUFBO0FBQ0gsT0FBQTs7QUFFQTtBQUNBLE1BQUEsT0FBTyxJQUFJLENBQUE7QUFDYixLQUFBO0FBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLENBMUJvQzdYLENBQUFBLEtBQUssQ0FBQ3dDLFNBQVMsQ0FBQTs7QUNBdkMsU0FBUytWLGlCQUFpQkEsQ0FBQXRxQixJQUFBLEVBS3RDO0FBQUEsRUFBQSxJQUFBdXFCLHFCQUFBLEdBQUF2cUIsSUFBQSxDQUpEd25CLGtCQUFrQjtBQUFsQkEsSUFBQUEsa0JBQWtCLEdBQUErQyxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLEtBQUssR0FBQUEscUJBQUE7SUFBQUMsYUFBQSxHQUFBeHFCLElBQUEsQ0FDMUJ5cUIsUUFBUTtBQUFSQSxJQUFBQSxRQUFRLEdBQUFELGFBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxLQUFLLEdBQUFBLGFBQUE7SUFDaEI5YyxTQUFTLEdBQUExTixJQUFBLENBQVQwTixTQUFTO0lBQ1QrRixRQUFRLEdBQUF6VCxJQUFBLENBQVJ5VCxRQUFRLENBQUE7QUFFUixFQUFBLElBQUlpWCxTQUFTLEdBQUdsRCxrQkFBa0IsR0FDOUIsYUFBYSxHQUFBLGFBQUEsQ0FBQTFuQixNQUFBLENBQ0MycUIsUUFBUSxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUUsQ0FBQTtFQUUvQyxvQkFDRTFZLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNFdEUsSUFBQUEsU0FBUyxFQUFFQSxTQUFVO0FBQ3JCa1EsSUFBQUEsSUFBSSxFQUFDLFFBQVE7QUFDYixJQUFBLFlBQUEsRUFBWThNLFNBQVU7SUFDdEIsWUFBVyxFQUFBLE1BQUE7QUFBTSxHQUFBLEVBRWhCalgsUUFDRSxDQUFDLENBQUE7QUFFVjs7QUMwQkEsSUFBTWtYLHlCQUF5QixHQUFHLENBQ2hDLCtCQUErQixFQUMvQixnQ0FBZ0MsRUFDaEMscUNBQXFDLENBQ3RDLENBQUE7QUFFRCxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxHQUFxQjtBQUFBLEVBQUEsSUFBakJDLE9BQU8sR0FBQXpsQixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxFQUFFLENBQUE7QUFDcEMsRUFBQSxJQUFNMGxCLFVBQVUsR0FBRyxDQUFDRCxPQUFPLENBQUNuZCxTQUFTLElBQUksRUFBRSxFQUFFaWMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pELEVBQUEsT0FBT2dCLHlCQUF5QixDQUFDOWtCLElBQUksQ0FDbkMsVUFBQ2tsQixhQUFhLEVBQUE7QUFBQSxJQUFBLE9BQUtELFVBQVUsQ0FBQ0UsT0FBTyxDQUFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7QUFBQSxHQUMzRCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUE7QUFBQyxJQUVtQkUsUUFBUSwwQkFBQTNaLGdCQUFBLEVBQUE7RUFrSzNCLFNBQUEyWixRQUFBQSxDQUFZN3FCLEtBQUssRUFBRTtBQUFBLElBQUEsSUFBQW1SLEtBQUEsQ0FBQTtBQUFBQyxJQUFBQSxlQUFBLE9BQUF5WixRQUFBLENBQUEsQ0FBQTtBQUNqQjFaLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBd1osSUFBQUEsRUFBQUEsUUFBQSxHQUFNN3FCLEtBQUssQ0FBQSxDQUFBLENBQUE7QUFBRXNSLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQWtETSxvQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztBQUM5QlMsTUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDcVUsY0FBYyxDQUFDM0QsS0FBSyxDQUFDLENBQUE7S0FDakMsQ0FBQSxDQUFBO0lBQUFZLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW9CLFlBQU07QUFDekIsTUFBQSxPQUFPQSxLQUFBLENBQUtxTCxZQUFZLENBQUNySixPQUFPLENBQUE7S0FDakMsQ0FBQSxDQUFBO0FBQUE3QixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7QUFDL0IsTUFBQSxJQUFJOFosZ0JBQWdCLENBQUM5WixLQUFLLENBQUNrRSxNQUFNLENBQUMsRUFBRTtBQUNsQ3pELFFBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhxQixlQUFlLEVBQUUsQ0FBQTtBQUM5QixPQUFBO0tBQ0QsQ0FBQSxDQUFBO0lBQUF4WixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBRWUsWUFBTTtBQUNwQixNQUFBLElBQUFvSCxXQUFBLEdBQStDcEgsS0FBQSxDQUFLblIsS0FBSztRQUFqRG9ZLFlBQVksR0FBQUcsV0FBQSxDQUFaSCxZQUFZO1FBQUVELFFBQVEsR0FBQUksV0FBQSxDQUFSSixRQUFRO1FBQUVrTyxVQUFVLEdBQUE5TixXQUFBLENBQVY4TixVQUFVLENBQUE7QUFDMUMsTUFBQSxJQUFNNW9CLE9BQU8sR0FBR29PLG1CQUFtQixDQUFDc0YsS0FBQSxDQUFLblIsS0FBSyxDQUFDLENBQUE7QUFDL0MsTUFBQSxJQUFNa0YsT0FBTyxHQUFHK0csbUJBQW1CLENBQUNrRixLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUMvQyxNQUFBLElBQU1tVCxPQUFPLEdBQUd0VyxPQUFPLEVBQUUsQ0FBQTtBQUN6QixNQUFBLElBQU1rdUIsV0FBVyxHQUFHMUUsVUFBVSxJQUFJbE8sUUFBUSxJQUFJQyxZQUFZLENBQUE7QUFDMUQsTUFBQSxJQUFJMlMsV0FBVyxFQUFFO0FBQ2YsUUFBQSxPQUFPQSxXQUFXLENBQUE7QUFDcEIsT0FBQyxNQUFNO1FBQ0wsSUFBSXR0QixPQUFPLElBQUkyQixRQUFRLENBQUMrVCxPQUFPLEVBQUUxVixPQUFPLENBQUMsRUFBRTtBQUN6QyxVQUFBLE9BQU9BLE9BQU8sQ0FBQTtTQUNmLE1BQU0sSUFBSXlILE9BQU8sSUFBSWdLLE9BQU8sQ0FBQ2lFLE9BQU8sRUFBRWpPLE9BQU8sQ0FBQyxFQUFFO0FBQy9DLFVBQUEsT0FBT0EsT0FBTyxDQUFBO0FBQ2hCLFNBQUE7QUFDRixPQUFBO0FBQ0EsTUFBQSxPQUFPaU8sT0FBTyxDQUFBO0tBQ2YsQ0FBQSxDQUFBO0lBQUE3QixlQUFBLENBQUFILEtBQUEsRUFBQSxlQUFBLEVBRWUsWUFBTTtBQUNwQkEsTUFBQUEsS0FBQSxDQUFLc0IsUUFBUSxDQUNYLFVBQUE3UyxJQUFBLEVBQUE7QUFBQSxRQUFBLElBQUdWLElBQUksR0FBQVUsSUFBQSxDQUFKVixJQUFJLENBQUE7UUFBQSxPQUFRO0FBQ2JBLFVBQUFBLElBQUksRUFBRXdLLFNBQVMsQ0FBQ3hLLElBQUksRUFBRSxDQUFDLENBQUE7U0FDeEIsQ0FBQTtBQUFBLE9BQUMsRUFDRixZQUFBO1FBQUEsT0FBTWlTLEtBQUEsQ0FBSzZaLGlCQUFpQixDQUFDN1osS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLENBQUMsQ0FBQTtBQUFBLE9BQy9DLENBQUMsQ0FBQTtLQUNGLENBQUEsQ0FBQTtJQUFBb1MsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZUFBQSxFQUVlLFlBQU07QUFDcEJBLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBaFMsS0FBQSxFQUFBO0FBQUEsUUFBQSxJQUFHdkIsSUFBSSxHQUFBdUIsS0FBQSxDQUFKdkIsSUFBSSxDQUFBO1FBQUEsT0FBUTtBQUNiQSxVQUFBQSxJQUFJLEVBQUVrSyxTQUFTLENBQUNsSyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQ3hCLENBQUE7QUFBQSxPQUFDLEVBQ0YsWUFBQTtRQUFBLE9BQU1pUyxLQUFBLENBQUs2WixpQkFBaUIsQ0FBQzdaLEtBQUEsQ0FBS00sS0FBSyxDQUFDdlMsSUFBSSxDQUFDLENBQUE7QUFBQSxPQUMvQyxDQUFDLENBQUE7S0FDRixDQUFBLENBQUE7SUFBQW9TLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUM3UCxHQUFHLEVBQUVvUCxLQUFLLEVBQUV1YSxlQUFlLEVBQUs7TUFDaEQ5WixLQUFBLENBQUtuUixLQUFLLENBQUN3VixRQUFRLENBQUNsVSxHQUFHLEVBQUVvUCxLQUFLLEVBQUV1YSxlQUFlLENBQUMsQ0FBQTtBQUNoRDlaLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FoQixlQUFlLElBQUlsUSxLQUFBLENBQUtuUixLQUFLLENBQUNxaEIsZUFBZSxDQUFDL2YsR0FBRyxDQUFDLENBQUE7S0FDOUQsQ0FBQSxDQUFBO0FBQUFnUSxJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFcUIscUJBQUEsRUFBQSxVQUFDN1AsR0FBRyxFQUFLO01BQzdCNlAsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQUUwRyxRQUFBQSxhQUFhLEVBQUU3WCxHQUFBQTtBQUFJLE9BQUMsQ0FBQyxDQUFBO0FBQ3JDNlAsTUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDdWUsZUFBZSxJQUFJcE4sS0FBQSxDQUFLblIsS0FBSyxDQUFDdWUsZUFBZSxDQUFDamQsR0FBRyxDQUFDLENBQUE7S0FDOUQsQ0FBQSxDQUFBO0lBQUFnUSxlQUFBLENBQUFILEtBQUEsRUFBQSx1QkFBQSxFQUV1QixZQUFNO01BQzVCQSxLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRTBHLFFBQUFBLGFBQWEsRUFBRSxJQUFBO0FBQUssT0FBQyxDQUFDLENBQUE7TUFDdENoSSxLQUFBLENBQUtuUixLQUFLLENBQUNrckIsaUJBQWlCLElBQUkvWixLQUFBLENBQUtuUixLQUFLLENBQUNrckIsaUJBQWlCLEVBQUUsQ0FBQTtLQUMvRCxDQUFBLENBQUE7QUFBQTVaLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFVBQUNULEtBQUssRUFBRTFKLElBQUksRUFBSztNQUN0Q21LLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFMEcsUUFBQUEsYUFBYSxFQUFFZ1MsT0FBTyxDQUFDdHVCLE9BQU8sRUFBRSxFQUFFbUssSUFBSSxDQUFBO0FBQUUsT0FBQyxDQUFDLENBQUE7QUFDMUQsTUFBQSxDQUFDLENBQUNtSyxLQUFBLENBQUtuUixLQUFLLENBQUN5b0IsZ0JBQWdCLElBQUl0WCxLQUFBLENBQUtuUixLQUFLLENBQUN5b0IsZ0JBQWdCLENBQUMvWCxLQUFLLEVBQUUxSixJQUFJLENBQUMsQ0FBQTtLQUMxRSxDQUFBLENBQUE7QUFBQXNLLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFVBQUNULEtBQUssRUFBRTFKLElBQUksRUFBSztBQUN0QyxNQUFBLENBQUMsQ0FBQ21LLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBvQixnQkFBZ0IsSUFBSXZYLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBvQixnQkFBZ0IsQ0FBQ2hZLEtBQUssRUFBRTFKLElBQUksQ0FBQyxDQUFBO0tBQzFFLENBQUEsQ0FBQTtBQUFBc0ssSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQ2pTLElBQUksRUFBSztBQUMzQixNQUFBLElBQUlpUyxLQUFBLENBQUtuUixLQUFLLENBQUNvckIsWUFBWSxFQUFFO0FBQzNCamEsUUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDb3JCLFlBQVksQ0FBQ2xzQixJQUFJLENBQUMsQ0FBQTtRQUM3QmlTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFNFksVUFBQUEsdUJBQXVCLEVBQUUsSUFBQTtBQUFLLFNBQUMsQ0FBQyxDQUFBO0FBQ2xELE9BQUE7QUFDQSxNQUFBLElBQUlsYSxLQUFBLENBQUtuUixLQUFLLENBQUNzVixrQkFBa0IsRUFBRTtBQUNqQyxRQUFBLElBQUluRSxLQUFBLENBQUtuUixLQUFLLENBQUN3VixRQUFRLEVBQUU7QUFDdkJyRSxVQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUN3VixRQUFRLENBQUN0VyxJQUFJLENBQUMsQ0FBQTtBQUMzQixTQUFBO0FBQ0EsUUFBQSxJQUFJaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDeVYsT0FBTyxFQUFFO0FBQ3RCdEUsVUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDeVYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFCLFNBQUE7QUFDRixPQUFBO0FBRUF0RSxNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNxaEIsZUFBZSxJQUFJbFEsS0FBQSxDQUFLblIsS0FBSyxDQUFDcWhCLGVBQWUsQ0FBQ25pQixJQUFJLENBQUMsQ0FBQTtLQUMvRCxDQUFBLENBQUE7QUFBQW9TLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVtQixtQkFBQSxFQUFBLFVBQUNqUyxJQUFJLEVBQUs7QUFDNUJpUyxNQUFBQSxLQUFBLENBQUttYSx1QkFBdUIsQ0FBQ3BzQixJQUFJLENBQUMsQ0FBQTtBQUNsQyxNQUFBLElBQUlpUyxLQUFBLENBQUtuUixLQUFLLENBQUNzVixrQkFBa0IsRUFBRTtBQUNqQyxRQUFBLElBQUluRSxLQUFBLENBQUtuUixLQUFLLENBQUN3VixRQUFRLEVBQUU7QUFDdkJyRSxVQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUN3VixRQUFRLENBQUN0VyxJQUFJLENBQUMsQ0FBQTtBQUMzQixTQUFBO0FBQ0EsUUFBQSxJQUFJaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDeVYsT0FBTyxFQUFFO0FBQ3RCdEUsVUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDeVYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFCLFNBQUE7QUFDRixPQUFBO0FBRUF0RSxNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNxaEIsZUFBZSxJQUFJbFEsS0FBQSxDQUFLblIsS0FBSyxDQUFDcWhCLGVBQWUsQ0FBQ25pQixJQUFJLENBQUMsQ0FBQTtLQUMvRCxDQUFBLENBQUE7QUFBQW9TLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUV5Qix5QkFBQSxFQUFBLFVBQUNqUyxJQUFJLEVBQUs7QUFDbEMsTUFBQSxJQUFJaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDdXJCLGFBQWEsRUFBRTtBQUM1QnBhLFFBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3VyQixhQUFhLENBQUNyc0IsSUFBSSxDQUFDLENBQUE7UUFDOUJpUyxLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRTRZLFVBQUFBLHVCQUF1QixFQUFFLElBQUE7QUFBSyxTQUFDLENBQUMsQ0FBQTtBQUNsRCxPQUFBO0tBQ0QsQ0FBQSxDQUFBO0FBQUEvWixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFdUIsdUJBQUEsRUFBQSxVQUFDalMsSUFBSSxFQUFLO0FBQ2hDaVMsTUFBQUEsS0FBQSxDQUFLb0UsZ0JBQWdCLENBQUNyVyxJQUFJLENBQUMsQ0FBQTtBQUMzQmlTLE1BQUFBLEtBQUEsQ0FBSzZaLGlCQUFpQixDQUFDOXJCLElBQUksQ0FBQyxDQUFBO0tBQzdCLENBQUEsQ0FBQTtBQUFBb1MsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVksWUFBQSxFQUFBLFVBQUNuSyxJQUFJLEVBQUs7QUFDckJtSyxNQUFBQSxLQUFBLENBQUtzQixRQUFRLENBQ1gsVUFBQTFOLEtBQUEsRUFBQTtBQUFBLFFBQUEsSUFBRzdGLElBQUksR0FBQTZGLEtBQUEsQ0FBSjdGLElBQUksQ0FBQTtRQUFBLE9BQVE7QUFDYkEsVUFBQUEsSUFBSSxFQUFFaXNCLE9BQU8sQ0FBQ2pzQixJQUFJLEVBQUU4SCxJQUFJLENBQUE7U0FDekIsQ0FBQTtBQUFBLE9BQUMsRUFDRixZQUFBO1FBQUEsT0FBTW1LLEtBQUEsQ0FBS29FLGdCQUFnQixDQUFDcEUsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLENBQUMsQ0FBQTtBQUFBLE9BQzlDLENBQUMsQ0FBQTtLQUNGLENBQUEsQ0FBQTtBQUFBb1MsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWEsYUFBQSxFQUFBLFVBQUMzTSxLQUFLLEVBQUs7QUFDdkIyTSxNQUFBQSxLQUFBLENBQUtzQixRQUFRLENBQ1gsVUFBQTlNLEtBQUEsRUFBQTtBQUFBLFFBQUEsSUFBR3pHLElBQUksR0FBQXlHLEtBQUEsQ0FBSnpHLElBQUksQ0FBQTtRQUFBLE9BQVE7QUFDYkEsVUFBQUEsSUFBSSxFQUFFdUYsUUFBUSxDQUFDdkYsSUFBSSxFQUFFc0YsS0FBSyxDQUFBO1NBQzNCLENBQUE7QUFBQSxPQUFDLEVBQ0YsWUFBQTtRQUFBLE9BQU0yTSxLQUFBLENBQUs2WixpQkFBaUIsQ0FBQzdaLEtBQUEsQ0FBS00sS0FBSyxDQUFDdlMsSUFBSSxDQUFDLENBQUE7QUFBQSxPQUMvQyxDQUFDLENBQUE7S0FDRixDQUFBLENBQUE7QUFBQW9TLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVpQixpQkFBQSxFQUFBLFVBQUN5RixTQUFTLEVBQUs7QUFDL0J6RixNQUFBQSxLQUFBLENBQUtzQixRQUFRLENBQ1gsVUFBQTVNLEtBQUEsRUFBQTtBQUFBLFFBQUEsSUFBRzNHLElBQUksR0FBQTJHLEtBQUEsQ0FBSjNHLElBQUksQ0FBQTtRQUFBLE9BQVE7QUFDYkEsVUFBQUEsSUFBSSxFQUFFaXNCLE9BQU8sQ0FBQzFtQixRQUFRLENBQUN2RixJQUFJLEVBQUV1SCxRQUFRLENBQUNtUSxTQUFTLENBQUMsQ0FBQyxFQUFFclEsT0FBTyxDQUFDcVEsU0FBUyxDQUFDLENBQUE7U0FDdEUsQ0FBQTtBQUFBLE9BQUMsRUFDRixZQUFBO1FBQUEsT0FBTXpGLEtBQUEsQ0FBS3FhLHFCQUFxQixDQUFDcmEsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLENBQUMsQ0FBQTtBQUFBLE9BQ25ELENBQUMsQ0FBQTtLQUNGLENBQUEsQ0FBQTtJQUFBb1MsZUFBQSxDQUFBSCxLQUFBLEVBQUEsUUFBQSxFQUVRLFlBQTRCO0FBQUEsTUFBQSxJQUEzQmpTLElBQUksR0FBQThGLFNBQUEsQ0FBQWhHLE1BQUEsUUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUdtTSxDQUFBQSxDQUFBQSxHQUFBQSxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksQ0FBQTtBQUM5QixNQUFBLElBQU15QyxXQUFXLEdBQUdGLGNBQWMsQ0FDaEN2QyxJQUFJLEVBQ0ppUyxLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFNLEVBQ2pCNFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDMEIsZ0JBQ2IsQ0FBQyxDQUFBO01BRUQsSUFBTStwQixRQUFRLEdBQUcsRUFBRSxDQUFBO0FBQ25CLE1BQUEsSUFBSXRhLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhnQixlQUFlLEVBQUU7QUFDOUIySyxRQUFBQSxRQUFRLENBQUN4ZSxJQUFJLGVBQ1gwRSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBSy9FLFVBQUFBLEdBQUcsRUFBQyxHQUFHO0FBQUNTLFVBQUFBLFNBQVMsRUFBQyw0QkFBQTtTQUNwQjZELEVBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzByQixTQUFTLElBQUksR0FDdEIsQ0FDUCxDQUFDLENBQUE7QUFDSCxPQUFBO01BQ0EsT0FBT0QsUUFBUSxDQUFDL3JCLE1BQU0sQ0FDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQ2pCLEdBQUcsQ0FBQyxVQUFDc2dCLE1BQU0sRUFBSztBQUNwQyxRQUFBLElBQU16ZCxHQUFHLEdBQUcwZCxPQUFPLENBQUNyZCxXQUFXLEVBQUVvZCxNQUFNLENBQUMsQ0FBQTtBQUN4QyxRQUFBLElBQU00TSxXQUFXLEdBQUd4YSxLQUFBLENBQUt5YSxhQUFhLENBQUN0cUIsR0FBRyxFQUFFNlAsS0FBQSxDQUFLblIsS0FBSyxDQUFDekMsTUFBTSxDQUFDLENBQUE7QUFFOUQsUUFBQSxJQUFNc3VCLGdCQUFnQixHQUFHMWEsS0FBQSxDQUFLblIsS0FBSyxDQUFDNnJCLGdCQUFnQixHQUNoRDFhLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzZyQixnQkFBZ0IsQ0FBQ3ZxQixHQUFHLENBQUMsR0FDaEMyRCxTQUFTLENBQUE7UUFFYixvQkFDRTBNLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNFL0UsVUFBQUEsR0FBRyxFQUFFa1MsTUFBTztBQUNaelIsVUFBQUEsU0FBUyxFQUFFMEcsSUFBSSxDQUFDLDRCQUE0QixFQUFFNlgsZ0JBQWdCLENBQUE7QUFBRSxTQUFBLEVBRS9ERixXQUNFLENBQUMsQ0FBQTtBQUVWLE9BQUMsQ0FDSCxDQUFDLENBQUE7S0FDRixDQUFBLENBQUE7QUFBQXJhLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGVBQUEsRUFFZSxVQUFDN1AsR0FBRyxFQUFFL0QsTUFBTSxFQUFLO0FBQy9CLE1BQUEsSUFBSTRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhyQixhQUFhLEVBQUU7UUFDNUIsT0FBTzNuQiwyQkFBMkIsQ0FBQzdDLEdBQUcsRUFBRTZQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhyQixhQUFhLEVBQUV2dUIsTUFBTSxDQUFDLENBQUE7QUFDM0UsT0FBQTtBQUNBLE1BQUEsT0FBTzRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQytyQixnQkFBZ0IsR0FDOUJ6bkIsdUJBQXVCLENBQUNoRCxHQUFHLEVBQUUvRCxNQUFNLENBQUMsR0FDcEM4RyxxQkFBcUIsQ0FBQy9DLEdBQUcsRUFBRS9ELE1BQU0sQ0FBQyxDQUFBO0tBQ3ZDLENBQUEsQ0FBQTtJQUFBK1QsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07QUFDbkJBLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBMU0sS0FBQSxFQUFBO0FBQUEsUUFBQSxJQUFHN0csSUFBSSxHQUFBNkcsS0FBQSxDQUFKN0csSUFBSSxDQUFBO1FBQUEsT0FBUTtBQUNiQSxVQUFBQSxJQUFJLEVBQUV1TCxRQUFRLENBQ1p2TCxJQUFJLEVBQ0ppUyxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYyxHQUFHN2EsS0FBQSxDQUFLblIsS0FBSyxDQUFDOEssY0FBYyxHQUFHLENBQzFELENBQUE7U0FDRCxDQUFBO0FBQUEsT0FBQyxFQUNGLFlBQUE7UUFBQSxPQUFNcUcsS0FBQSxDQUFLb0UsZ0JBQWdCLENBQUNwRSxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksQ0FBQyxDQUFBO0FBQUEsT0FDOUMsQ0FBQyxDQUFBO0tBQ0YsQ0FBQSxDQUFBO0lBQUFvUyxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUFNO01BQ3pCQSxLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRTBHLFFBQUFBLGFBQWEsRUFBRSxJQUFBO0FBQUssT0FBQyxDQUFDLENBQUE7S0FDdkMsQ0FBQSxDQUFBO0lBQUE3SCxlQUFBLENBQUFILEtBQUEsRUFBQSxzQkFBQSxFQUVzQixZQUFNO0FBQzNCLE1BQUEsSUFBSUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDaXNCLGtCQUFrQixFQUFFO0FBQ2pDLFFBQUEsT0FBQTtBQUNGLE9BQUE7QUFFQSxNQUFBLElBQUlDLG1CQUFtQixDQUFBO0FBQ3ZCLE1BQUEsUUFBUSxJQUFJO0FBQ1YsUUFBQSxLQUFLL2EsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmtCLG1CQUFtQjtBQUNqQ3VILFVBQUFBLG1CQUFtQixHQUFHNWhCLGtCQUFrQixDQUFDNkcsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLEVBQUVpUyxLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUNyRSxVQUFBLE1BQUE7QUFDRixRQUFBLEtBQUttUixLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYztBQUM1QkUsVUFBQUEsbUJBQW1CLEdBQUd2aEIsbUJBQW1CLENBQUN3RyxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksRUFBRWlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyxDQUFBO0FBQ3RFLFVBQUEsTUFBQTtBQUNGLFFBQUEsS0FBS21SLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRrQixxQkFBcUI7QUFDbkNzSCxVQUFBQSxtQkFBbUIsR0FBR3ZpQixxQkFBcUIsQ0FDekN3SCxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksRUFDZmlTLEtBQUEsQ0FBS25SLEtBQ1AsQ0FBQyxDQUFBO0FBQ0QsVUFBQSxNQUFBO0FBQ0YsUUFBQTtBQUNFa3NCLFVBQUFBLG1CQUFtQixHQUFHampCLG1CQUFtQixDQUFDa0ksS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLEVBQUVpUyxLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUN0RSxVQUFBLE1BQUE7QUFDSixPQUFBO01BRUEsSUFDRyxDQUFDbVIsS0FBQSxDQUFLblIsS0FBSyxDQUFDbXNCLHdCQUF3QixJQUNuQyxDQUFDaGIsS0FBQSxDQUFLblIsS0FBSyxDQUFDb3NCLDJCQUEyQixJQUN2Q0YsbUJBQW1CLElBQ3JCL2EsS0FBQSxDQUFLblIsS0FBSyxDQUFDb25CLGtCQUFrQixFQUM3QjtBQUNBLFFBQUEsT0FBQTtBQUNGLE9BQUE7QUFFQSxNQUFBLElBQU1pRixXQUFXLEdBQUcsQ0FDbEIsbUNBQW1DLEVBQ25DLDZDQUE2QyxDQUM5QyxDQUFBO0FBRUQsTUFBQSxJQUFNeEcsT0FBTyxHQUFHLENBQ2QsOEJBQThCLEVBQzlCLHdDQUF3QyxDQUN6QyxDQUFBO0FBRUQsTUFBQSxJQUFJeUcsWUFBWSxHQUFHbmIsS0FBQSxDQUFLb2IsYUFBYSxDQUFBO0FBRXJDLE1BQUEsSUFDRXBiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJrQixtQkFBbUIsSUFDOUJ4VCxLQUFBLENBQUtuUixLQUFLLENBQUM0a0IscUJBQXFCLElBQ2hDelQsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ3NCLGNBQWMsRUFDekI7UUFDQU0sWUFBWSxHQUFHbmIsS0FBQSxDQUFLcWIsWUFBWSxDQUFBO0FBQ2xDLE9BQUE7QUFFQSxNQUFBLElBQUlOLG1CQUFtQixJQUFJL2EsS0FBQSxDQUFLblIsS0FBSyxDQUFDb3NCLDJCQUEyQixFQUFFO0FBQ2pFdkcsUUFBQUEsT0FBTyxDQUFDNVksSUFBSSxDQUFDLGtEQUFrRCxDQUFDLENBQUE7QUFDaEVxZixRQUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFBO0FBQ3JCLE9BQUE7QUFFQSxNQUFBLElBQU1HLFNBQVMsR0FDYnRiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJrQixtQkFBbUIsSUFDOUJ4VCxLQUFBLENBQUtuUixLQUFLLENBQUM0a0IscUJBQXFCLElBQ2hDelQsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ3NCLGNBQWMsQ0FBQTtBQUUzQixNQUFBLElBQUF2VCxZQUFBLEdBQThEdEgsS0FBQSxDQUFLblIsS0FBSztRQUFoRTBzQix3QkFBd0IsR0FBQWpVLFlBQUEsQ0FBeEJpVSx3QkFBd0I7UUFBRUMsdUJBQXVCLEdBQUFsVSxZQUFBLENBQXZCa1UsdUJBQXVCLENBQUE7QUFFekQsTUFBQSxJQUFBL1QsWUFBQSxHQU9JekgsS0FBQSxDQUFLblIsS0FBSztRQUFBNHNCLHFCQUFBLEdBQUFoVSxZQUFBLENBTlppVSxzQkFBc0I7QUFBdEJBLFFBQUFBLHNCQUFzQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLE9BQU9GLHdCQUF3QixLQUFLLFFBQVEsR0FDakVBLHdCQUF3QixHQUN4QixnQkFBZ0IsR0FBQUUscUJBQUE7UUFBQUUsc0JBQUEsR0FBQWxVLFlBQUEsQ0FDcEJtVSxxQkFBcUI7QUFBckJBLFFBQUFBLHFCQUFxQixHQUFBRCxzQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLE9BQU9ILHVCQUF1QixLQUFLLFFBQVEsR0FDL0RBLHVCQUF1QixHQUN2QixlQUFlLEdBQUFHLHNCQUFBLENBQUE7TUFHckIsb0JBQ0VuYixLQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFDRStYLFFBQUFBLElBQUksRUFBQyxRQUFRO0FBQ2JyYyxRQUFBQSxTQUFTLEVBQUV1WSxPQUFPLENBQUM5bUIsSUFBSSxDQUFDLEdBQUcsQ0FBRTtBQUM3QjhTLFFBQUFBLE9BQU8sRUFBRXlhLFlBQWE7QUFDdEJwUCxRQUFBQSxTQUFTLEVBQUUvTCxLQUFBLENBQUtuUixLQUFLLENBQUMyWCxlQUFnQjtRQUN0QyxZQUFZOFUsRUFBQUEsU0FBUyxHQUFHTSxxQkFBcUIsR0FBR0Ysc0JBQUFBO09BRWhEbGIsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU10RSxRQUFBQSxTQUFTLEVBQUUrZSxXQUFXLENBQUN0dEIsSUFBSSxDQUFDLEdBQUcsQ0FBQTtBQUFFLE9BQUEsRUFDcEMwdEIsU0FBUyxHQUNOdGIsS0FBQSxDQUFLblIsS0FBSyxDQUFDMnNCLHVCQUF1QixHQUNsQ3hiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBzQix3QkFDWCxDQUNBLENBQUMsQ0FBQTtLQUVaLENBQUEsQ0FBQTtJQUFBcGIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07QUFDbkJBLE1BQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFBek0sS0FBQSxFQUFBO0FBQUEsUUFBQSxJQUFHOUcsSUFBSSxHQUFBOEcsS0FBQSxDQUFKOUcsSUFBSSxDQUFBO1FBQUEsT0FBUTtBQUNiQSxVQUFBQSxJQUFJLEVBQUVvTSxRQUFRLENBQ1pwTSxJQUFJLEVBQ0ppUyxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYyxHQUFHN2EsS0FBQSxDQUFLblIsS0FBSyxDQUFDOEssY0FBYyxHQUFHLENBQzFELENBQUE7U0FDRCxDQUFBO0FBQUEsT0FBQyxFQUNGLFlBQUE7UUFBQSxPQUFNcUcsS0FBQSxDQUFLb0UsZ0JBQWdCLENBQUNwRSxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksQ0FBQyxDQUFBO0FBQUEsT0FDOUMsQ0FBQyxDQUFBO0tBQ0YsQ0FBQSxDQUFBO0lBQUFvUyxlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVrQixZQUFNO0FBQ3ZCLE1BQUEsSUFBSUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDaXNCLGtCQUFrQixFQUFFO0FBQ2pDLFFBQUEsT0FBQTtBQUNGLE9BQUE7QUFFQSxNQUFBLElBQUllLG1CQUFtQixDQUFBO0FBQ3ZCLE1BQUEsUUFBUSxJQUFJO0FBQ1YsUUFBQSxLQUFLN2IsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmtCLG1CQUFtQjtBQUNqQ3FJLFVBQUFBLG1CQUFtQixHQUFHN2hCLGlCQUFpQixDQUFDZ0csS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLEVBQUVpUyxLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUNwRSxVQUFBLE1BQUE7QUFDRixRQUFBLEtBQUttUixLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYztBQUM1QmdCLFVBQUFBLG1CQUFtQixHQUFHemhCLGtCQUFrQixDQUFDNEYsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLEVBQUVpUyxLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUNyRSxVQUFBLE1BQUE7QUFDRixRQUFBLEtBQUttUixLQUFBLENBQUtuUixLQUFLLENBQUM0a0IscUJBQXFCO0FBQ25Db0ksVUFBQUEsbUJBQW1CLEdBQUcvaUIsb0JBQW9CLENBQUNrSCxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksRUFBRWlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyxDQUFBO0FBQ3ZFLFVBQUEsTUFBQTtBQUNGLFFBQUE7QUFDRWd0QixVQUFBQSxtQkFBbUIsR0FBR3pqQixrQkFBa0IsQ0FBQzRILEtBQUEsQ0FBS00sS0FBSyxDQUFDdlMsSUFBSSxFQUFFaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDLENBQUE7QUFDckUsVUFBQSxNQUFBO0FBQ0osT0FBQTtNQUVBLElBQ0csQ0FBQ21SLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21zQix3QkFBd0IsSUFDbkMsQ0FBQ2hiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29zQiwyQkFBMkIsSUFDdkNZLG1CQUFtQixJQUNyQjdiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFDN0I7QUFDQSxRQUFBLE9BQUE7QUFDRixPQUFBO0FBRUEsTUFBQSxJQUFNdkIsT0FBTyxHQUFHLENBQ2QsOEJBQThCLEVBQzlCLG9DQUFvQyxDQUNyQyxDQUFBO0FBQ0QsTUFBQSxJQUFNd0csV0FBVyxHQUFHLENBQ2xCLG1DQUFtQyxFQUNuQyx5Q0FBeUMsQ0FDMUMsQ0FBQTtBQUNELE1BQUEsSUFBSWxiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFjLEVBQUU7QUFDN0JwSCxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsK0NBQStDLENBQUMsQ0FBQTtBQUMvRCxPQUFBO0FBQ0EsTUFBQSxJQUFJa0UsS0FBQSxDQUFLblIsS0FBSyxDQUFDbW5CLFdBQVcsRUFBRTtBQUMxQnRCLFFBQUFBLE9BQU8sQ0FBQzVZLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0FBQ3ZFLE9BQUE7QUFFQSxNQUFBLElBQUlxZixZQUFZLEdBQUduYixLQUFBLENBQUsrYixhQUFhLENBQUE7QUFFckMsTUFBQSxJQUNFL2IsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUM5QnhULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRrQixxQkFBcUIsSUFDaEN6VCxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYyxFQUN6QjtRQUNBTSxZQUFZLEdBQUduYixLQUFBLENBQUtnYyxZQUFZLENBQUE7QUFDbEMsT0FBQTtBQUVBLE1BQUEsSUFBSUgsbUJBQW1CLElBQUk3YixLQUFBLENBQUtuUixLQUFLLENBQUNvc0IsMkJBQTJCLEVBQUU7QUFDakV2RyxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQTtBQUM1RHFmLFFBQUFBLFlBQVksR0FBRyxJQUFJLENBQUE7QUFDckIsT0FBQTtBQUVBLE1BQUEsSUFBTUcsU0FBUyxHQUNidGIsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUM5QnhULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRrQixxQkFBcUIsSUFDaEN6VCxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYyxDQUFBO0FBRTNCLE1BQUEsSUFBQWxULFlBQUEsR0FBc0QzSCxLQUFBLENBQUtuUixLQUFLO1FBQXhEb3RCLG9CQUFvQixHQUFBdFUsWUFBQSxDQUFwQnNVLG9CQUFvQjtRQUFFQyxtQkFBbUIsR0FBQXZVLFlBQUEsQ0FBbkJ1VSxtQkFBbUIsQ0FBQTtBQUNqRCxNQUFBLElBQUEvVCxZQUFBLEdBT0luSSxLQUFBLENBQUtuUixLQUFLO1FBQUFzdEIscUJBQUEsR0FBQWhVLFlBQUEsQ0FOWmlVLGtCQUFrQjtBQUFsQkEsUUFBQUEsa0JBQWtCLEdBQUFELHFCQUFBLEtBQUcsS0FBQSxDQUFBLEdBQUEsT0FBT0Ysb0JBQW9CLEtBQUssUUFBUSxHQUN6REEsb0JBQW9CLEdBQ3BCLFlBQVksR0FBQUUscUJBQUE7UUFBQUUscUJBQUEsR0FBQWxVLFlBQUEsQ0FDaEJtVSxpQkFBaUI7QUFBakJBLFFBQUFBLGlCQUFpQixHQUFBRCxxQkFBQSxLQUFHLEtBQUEsQ0FBQSxHQUFBLE9BQU9ILG1CQUFtQixLQUFLLFFBQVEsR0FDdkRBLG1CQUFtQixHQUNuQixXQUFXLEdBQUFHLHFCQUFBLENBQUE7TUFHakIsb0JBQ0U3YixLQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFDRStYLFFBQUFBLElBQUksRUFBQyxRQUFRO0FBQ2JyYyxRQUFBQSxTQUFTLEVBQUV1WSxPQUFPLENBQUM5bUIsSUFBSSxDQUFDLEdBQUcsQ0FBRTtBQUM3QjhTLFFBQUFBLE9BQU8sRUFBRXlhLFlBQWE7QUFDdEJwUCxRQUFBQSxTQUFTLEVBQUUvTCxLQUFBLENBQUtuUixLQUFLLENBQUMyWCxlQUFnQjtRQUN0QyxZQUFZOFUsRUFBQUEsU0FBUyxHQUFHZ0IsaUJBQWlCLEdBQUdGLGtCQUFBQTtPQUU1QzViLGVBQUFBLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtBQUFNdEUsUUFBQUEsU0FBUyxFQUFFK2UsV0FBVyxDQUFDdHRCLElBQUksQ0FBQyxHQUFHLENBQUE7QUFBRSxPQUFBLEVBQ3BDMHRCLFNBQVMsR0FDTnRiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3F0QixtQkFBbUIsR0FDOUJsYyxLQUFBLENBQUtuUixLQUFLLENBQUNvdEIsb0JBQ1gsQ0FDQSxDQUFDLENBQUE7S0FFWixDQUFBLENBQUE7SUFBQTliLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG9CQUFBLEVBRW9CLFlBQTRCO0FBQUEsTUFBQSxJQUEzQmpTLElBQUksR0FBQThGLFNBQUEsQ0FBQWhHLE1BQUEsUUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUdtTSxDQUFBQSxDQUFBQSxHQUFBQSxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksQ0FBQTtBQUMxQyxNQUFBLElBQU0ybUIsT0FBTyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtBQUVuRCxNQUFBLElBQUkxVSxLQUFBLENBQUtuUixLQUFLLENBQUMwdEIsZ0JBQWdCLEVBQUU7QUFDL0I3SCxRQUFBQSxPQUFPLENBQUM1WSxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQTtBQUNsRSxPQUFBO0FBQ0EsTUFBQSxJQUFJa0UsS0FBQSxDQUFLblIsS0FBSyxDQUFDMnRCLGlCQUFpQixFQUFFO0FBQ2hDOUgsUUFBQUEsT0FBTyxDQUFDNVksSUFBSSxDQUFDLG1EQUFtRCxDQUFDLENBQUE7QUFDbkUsT0FBQTtBQUNBLE1BQUEsSUFBSWtFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzR0QixxQkFBcUIsRUFBRTtBQUNwQy9ILFFBQUFBLE9BQU8sQ0FBQzVZLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0FBQ3ZFLE9BQUE7TUFDQSxvQkFDRTBFLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUFLdEUsUUFBQUEsU0FBUyxFQUFFdVksT0FBTyxDQUFDOW1CLElBQUksQ0FBQyxHQUFHLENBQUE7QUFBRSxPQUFBLEVBQy9CUixVQUFVLENBQUNXLElBQUksRUFBRWlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzFDLFVBQVUsRUFBRTZULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU0sQ0FDdkQsQ0FBQyxDQUFBO0tBRVQsQ0FBQSxDQUFBO0lBQUErVCxlQUFBLENBQUFILEtBQUEsRUFBQSxvQkFBQSxFQUVvQixZQUEwQjtBQUFBLE1BQUEsSUFBekIwYyxZQUFZLEdBQUE3b0IsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsS0FBSyxDQUFBO01BQ3hDLElBQUksQ0FBQ21NLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzB0QixnQkFBZ0IsSUFBSUcsWUFBWSxFQUFFO0FBQ2hELFFBQUEsT0FBQTtBQUNGLE9BQUE7QUFDQSxNQUFBLG9CQUNFbGMsS0FBQSxDQUFBQyxhQUFBLENBQUMwQyxZQUFZLEVBQUE7QUFDWGdCLFFBQUFBLGtCQUFrQixFQUFFbkUsS0FBQSxDQUFLblIsS0FBSyxDQUFDc1Ysa0JBQW1CO0FBQ2xEcFcsUUFBQUEsSUFBSSxFQUFFaVMsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFLO0FBQ3RCc1csUUFBQUEsUUFBUSxFQUFFckUsS0FBQSxDQUFLblIsS0FBSyxDQUFDd1YsUUFBUztBQUM5QkMsUUFBQUEsT0FBTyxFQUFFdEUsS0FBQSxDQUFLblIsS0FBSyxDQUFDeVYsT0FBUTtBQUM1QkUsUUFBQUEsWUFBWSxFQUFFeEUsS0FBQSxDQUFLblIsS0FBSyxDQUFDMlYsWUFBYTtRQUN0QzdELFFBQVEsRUFBRVgsS0FBQSxDQUFLMmMsVUFBVztBQUMxQnJ3QixRQUFBQSxPQUFPLEVBQUUwVCxLQUFBLENBQUtuUixLQUFLLENBQUN2QyxPQUFRO0FBQzVCeUgsUUFBQUEsT0FBTyxFQUFFaU0sS0FBQSxDQUFLblIsS0FBSyxDQUFDa0YsT0FBUTtRQUM1QjhCLElBQUksRUFBRVQsT0FBTyxDQUFDNEssS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLENBQUU7QUFDL0IwVCxRQUFBQSxzQkFBc0IsRUFBRXpCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRTLHNCQUF1QjtBQUMxREQsUUFBQUEsc0JBQXNCLEVBQUV4QixLQUFBLENBQUtuUixLQUFLLENBQUMyUyxzQkFBQUE7QUFBdUIsT0FDM0QsQ0FBQyxDQUFBO0tBRUwsQ0FBQSxDQUFBO0lBQUFyQixlQUFBLENBQUFILEtBQUEsRUFBQSxxQkFBQSxFQUVxQixZQUEwQjtBQUFBLE1BQUEsSUFBekIwYyxZQUFZLEdBQUE3b0IsU0FBQSxDQUFBaEcsTUFBQSxHQUFBLENBQUEsSUFBQWdHLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUcsS0FBSyxDQUFBO01BQ3pDLElBQUksQ0FBQ21NLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJ0QixpQkFBaUIsSUFBSUUsWUFBWSxFQUFFO0FBQ2pELFFBQUEsT0FBQTtBQUNGLE9BQUE7QUFDQSxNQUFBLG9CQUNFbGMsS0FBQSxDQUFBQyxhQUFBLENBQUNzRSxhQUFhLEVBQUE7QUFDWlAsUUFBQUEsWUFBWSxFQUFFeEUsS0FBQSxDQUFLblIsS0FBSyxDQUFDMlYsWUFBYTtBQUN0Q3BZLFFBQUFBLE1BQU0sRUFBRTRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU87UUFDMUJ1VSxRQUFRLEVBQUVYLEtBQUEsQ0FBSzRjLFdBQVk7UUFDM0J2cEIsS0FBSyxFQUFFaUMsUUFBUSxDQUFDMEssS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLENBQUU7QUFDakNtWCxRQUFBQSx1QkFBdUIsRUFBRWxGLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FXLHVCQUFBQTtBQUF3QixPQUM3RCxDQUFDLENBQUE7S0FFTCxDQUFBLENBQUE7SUFBQS9FLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHlCQUFBLEVBRXlCLFlBQTBCO0FBQUEsTUFBQSxJQUF6QjBjLFlBQVksR0FBQTdvQixTQUFBLENBQUFoRyxNQUFBLEdBQUEsQ0FBQSxJQUFBZ0csU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxLQUFLLENBQUE7TUFDN0MsSUFBSSxDQUFDbU0sS0FBQSxDQUFLblIsS0FBSyxDQUFDNHRCLHFCQUFxQixJQUFJQyxZQUFZLEVBQUU7QUFDckQsUUFBQSxPQUFBO0FBQ0YsT0FBQTtBQUNBLE1BQUEsb0JBQ0VsYyxLQUFBLENBQUFDLGFBQUEsQ0FBQ3FGLGlCQUFpQixFQUFBO0FBQ2hCdEIsUUFBQUEsWUFBWSxFQUFFeEUsS0FBQSxDQUFLblIsS0FBSyxDQUFDMlYsWUFBYTtBQUN0Q3BZLFFBQUFBLE1BQU0sRUFBRTRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU87QUFDMUJELFFBQUFBLFVBQVUsRUFBRTZULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzFDLFVBQVc7UUFDbEN3VSxRQUFRLEVBQUVYLEtBQUEsQ0FBSzZjLGVBQWdCO0FBQy9CdndCLFFBQUFBLE9BQU8sRUFBRTBULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQVE7QUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVpTSxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFRO0FBQzVCaEcsUUFBQUEsSUFBSSxFQUFFaVMsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFLO0FBQ3RCNlgsUUFBQUEsMkJBQTJCLEVBQUU1RixLQUFBLENBQUtuUixLQUFLLENBQUMrVywyQkFBQUE7QUFBNEIsT0FDckUsQ0FBQyxDQUFBO0tBRUwsQ0FBQSxDQUFBO0FBQUF6RixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFd0Isd0JBQUEsRUFBQSxVQUFDd0QsQ0FBQyxFQUFLO01BQzlCeEQsS0FBQSxDQUFLblIsS0FBSyxDQUFDd1YsUUFBUSxDQUFDclQsZUFBZSxFQUFFLEVBQUV3UyxDQUFDLENBQUMsQ0FBQTtBQUN6Q3hELE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FoQixlQUFlLElBQUlsUSxLQUFBLENBQUtuUixLQUFLLENBQUNxaEIsZUFBZSxDQUFDbGYsZUFBZSxFQUFFLENBQUMsQ0FBQTtLQUM1RSxDQUFBLENBQUE7SUFBQW1QLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLG1CQUFBLEVBRW1CLFlBQU07QUFDeEIsTUFBQSxJQUFJLENBQUNBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21uQixXQUFXLElBQUloVyxLQUFBLENBQUtuUixLQUFLLENBQUNvbkIsa0JBQWtCLEVBQUU7QUFDNUQsUUFBQSxPQUFBO0FBQ0YsT0FBQTtNQUNBLG9CQUNFelYsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxRQUFBQSxTQUFTLEVBQUMsZ0NBQWdDO1FBQzFDdUUsT0FBTyxFQUFFLFNBQUFBLE9BQUFBLENBQUM4QyxDQUFDLEVBQUE7QUFBQSxVQUFBLE9BQUt4RCxLQUFBLENBQUs4YyxzQkFBc0IsQ0FBQ3RaLENBQUMsQ0FBQyxDQUFBO0FBQUEsU0FBQTtBQUFDLE9BQUEsRUFFOUN4RCxLQUFBLENBQUtuUixLQUFLLENBQUNtbkIsV0FDVCxDQUFDLENBQUE7S0FFVCxDQUFBLENBQUE7QUFBQTdWLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVxQixxQkFBQSxFQUFBLFVBQUFqTCxLQUFBLEVBQUE7QUFBQSxNQUFBLElBQUdnb0IsU0FBUyxHQUFBaG9CLEtBQUEsQ0FBVGdvQixTQUFTO1FBQUV6aEIsQ0FBQyxHQUFBdkcsS0FBQSxDQUFEdUcsQ0FBQyxDQUFBO01BQUEsb0JBQ25Da0YsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO1FBQ0V0RSxTQUFTLEVBQUEsMkJBQUEsQ0FBQTVOLE1BQUEsQ0FDUHlSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFjLEdBQ3JCLDJDQUEyQyxHQUMzQyxFQUFFLENBQUE7T0FHUDliLEVBQUFBLEtBQUEsQ0FBS2dkLGtCQUFrQixDQUFDRCxTQUFTLENBQUMsZUFDbkN2YyxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7UUFDRXRFLFNBQVMsRUFBQSx5RUFBQSxDQUFBNU4sTUFBQSxDQUE0RXlSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJWLFlBQVksQ0FBRztRQUMvR3lZLE9BQU8sRUFBRWpkLEtBQUEsQ0FBS2tkLG1CQUFBQTtBQUFvQixPQUFBLEVBRWpDbGQsS0FBQSxDQUFLbWQsbUJBQW1CLENBQUM3aEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNqQzBFLEtBQUEsQ0FBS29kLHVCQUF1QixDQUFDOWhCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDckMwRSxLQUFBLENBQUtxZCxrQkFBa0IsQ0FBQy9oQixDQUFDLEtBQUssQ0FBQyxDQUM3QixDQUFDLGVBQ05rRixLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3RFLFFBQUFBLFNBQVMsRUFBQyw2QkFBQTtBQUE2QixPQUFBLEVBQ3pDNkQsS0FBQSxDQUFLeVUsTUFBTSxDQUFDc0ksU0FBUyxDQUNuQixDQUNGLENBQUMsQ0FBQTtLQUNQLENBQUEsQ0FBQTtJQUFBNWMsZUFBQSxDQUFBSCxLQUFBLEVBQUEsb0JBQUEsRUFFb0IsWUFBcUI7QUFBQSxNQUFBLElBQXBCc2QsVUFBVSxHQUFBenBCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEVBQUUsQ0FBQTtBQUNuQyxNQUFBLElBQVFrcEIsU0FBUyxHQUFRTyxVQUFVLENBQTNCUCxTQUFTO1FBQUV6aEIsQ0FBQyxHQUFLZ2lCLFVBQVUsQ0FBaEJoaUIsQ0FBQyxDQUFBO0FBRXBCLE1BQUEsSUFDRzBFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFjLElBQUksQ0FBQzliLEtBQUEsQ0FBS00sS0FBSyxDQUFDaWQsY0FBYyxJQUN4RHZkLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFDN0I7QUFDQSxRQUFBLE9BQU8sSUFBSSxDQUFBO0FBQ2IsT0FBQTtBQUVBLE1BQUEsSUFBTXVILHVCQUF1QixHQUFHMWxCLG1CQUFtQixDQUNqRGtJLEtBQUEsQ0FBS00sS0FBSyxDQUFDdlMsSUFBSSxFQUNmaVMsS0FBQSxDQUFLblIsS0FDUCxDQUFDLENBQUE7QUFFRCxNQUFBLElBQU00dUIsdUJBQXVCLEdBQUdybEIsa0JBQWtCLENBQ2hENEgsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLEVBQ2ZpUyxLQUFBLENBQUtuUixLQUNQLENBQUMsQ0FBQTtBQUVELE1BQUEsSUFBTTZ1QixzQkFBc0IsR0FBR3ZrQixrQkFBa0IsQ0FDL0M2RyxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksRUFDZmlTLEtBQUEsQ0FBS25SLEtBQ1AsQ0FBQyxDQUFBO0FBRUQsTUFBQSxJQUFNOHVCLHNCQUFzQixHQUFHM2pCLGlCQUFpQixDQUM5Q2dHLEtBQUEsQ0FBS00sS0FBSyxDQUFDdlMsSUFBSSxFQUNmaVMsS0FBQSxDQUFLblIsS0FDUCxDQUFDLENBQUE7TUFFRCxJQUFNK3VCLFlBQVksR0FDaEIsQ0FBQzVkLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJrQixtQkFBbUIsSUFDL0IsQ0FBQ3hULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRrQixxQkFBcUIsSUFDakMsQ0FBQ3pULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dzQixjQUFjLENBQUE7TUFFNUIsb0JBQ0VyYSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDRXRFLFFBQUFBLFNBQVMsRUFBQywyREFBMkQ7QUFDckU4Z0IsUUFBQUEsT0FBTyxFQUFFamQsS0FBQSxDQUFLblIsS0FBSyxDQUFDOHFCLGVBQUFBO0FBQWdCLE9BQUEsRUFFbkMzWixLQUFBLENBQUtuUixLQUFLLENBQUNpc0Isa0JBQWtCLENBQUErQyxjQUFBLENBQUFBLGNBQUEsQ0FBQSxFQUFBLEVBQ3pCN2QsS0FBQSxDQUFLTSxLQUFLLENBQUEsRUFBQSxFQUFBLEVBQUE7QUFDYndkLFFBQUFBLGlCQUFpQixFQUFFeGlCLENBQUM7QUFDcEJ5aEIsUUFBQUEsU0FBUyxFQUFUQSxTQUFTO1FBQ1RILFdBQVcsRUFBRTVjLEtBQUEsQ0FBSzRjLFdBQVc7UUFDN0JELFVBQVUsRUFBRTNjLEtBQUEsQ0FBSzJjLFVBQVU7UUFDM0J2QixhQUFhLEVBQUVwYixLQUFBLENBQUtvYixhQUFhO1FBQ2pDVyxhQUFhLEVBQUUvYixLQUFBLENBQUsrYixhQUFhO1FBQ2pDVixZQUFZLEVBQUVyYixLQUFBLENBQUtxYixZQUFZO1FBQy9CVyxZQUFZLEVBQUVoYyxLQUFBLENBQUtnYyxZQUFZO0FBQy9Cd0IsUUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFBdUI7QUFDdkJDLFFBQUFBLHVCQUF1QixFQUF2QkEsdUJBQXVCO0FBQ3ZCQyxRQUFBQSxzQkFBc0IsRUFBdEJBLHNCQUFzQjtBQUN0QkMsUUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFBQUE7QUFBc0IsT0FBQSxDQUN2QixDQUFDLEVBQ0RDLFlBQVksaUJBQ1hwZCxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3RFLFFBQUFBLFNBQVMsRUFBQyw2QkFBQTtBQUE2QixPQUFBLEVBQ3pDNkQsS0FBQSxDQUFLeVUsTUFBTSxDQUFDc0ksU0FBUyxDQUNuQixDQUVKLENBQUMsQ0FBQTtLQUVULENBQUEsQ0FBQTtBQUFBNWMsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWtCLGtCQUFBLEVBQUEsVUFBQXJLLEtBQUEsRUFBbUI7QUFBQSxNQUFBLElBQWhCb25CLFNBQVMsR0FBQXBuQixLQUFBLENBQVRvbkIsU0FBUyxDQUFBO0FBQzdCLE1BQUEsSUFBQTFVLFlBQUEsR0FBMkNySSxLQUFBLENBQUtuUixLQUFLO1FBQTdDZ3NCLGNBQWMsR0FBQXhTLFlBQUEsQ0FBZHdTLGNBQWM7UUFBRWxoQixjQUFjLEdBQUEwTyxZQUFBLENBQWQxTyxjQUFjLENBQUE7QUFDdEMsTUFBQSxJQUFBQyxlQUFBLEdBQW1DQyxjQUFjLENBQy9Da2pCLFNBQVMsRUFDVHBqQixjQUNGLENBQUM7UUFIT2EsV0FBVyxHQUFBWixlQUFBLENBQVhZLFdBQVc7UUFBRVYsU0FBUyxHQUFBRixlQUFBLENBQVRFLFNBQVMsQ0FBQTtNQUk5QixvQkFDRTBHLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUFLdEUsUUFBQUEsU0FBUyxFQUFDLHVEQUFBO0FBQXVELE9BQUEsRUFDbkUwZSxjQUFjLEdBQUEsRUFBQSxDQUFBdHNCLE1BQUEsQ0FBTWlNLFdBQVcsRUFBQWpNLEtBQUFBLENBQUFBLENBQUFBLE1BQUEsQ0FBTXVMLFNBQVMsQ0FBSzFFLEdBQUFBLE9BQU8sQ0FBQzJuQixTQUFTLENBQ2xFLENBQUMsQ0FBQTtLQUVULENBQUEsQ0FBQTtBQUFBNWMsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRWMsY0FBQSxFQUFBLFVBQUNzZCxVQUFVLEVBQUs7QUFDN0IsTUFBQSxRQUFRLElBQUk7QUFDVixRQUFBLEtBQUt0ZCxLQUFBLENBQUtuUixLQUFLLENBQUNpc0Isa0JBQWtCLEtBQUtobkIsU0FBUztBQUM5QyxVQUFBLE9BQU9rTSxLQUFBLENBQUs4YSxrQkFBa0IsQ0FBQ3dDLFVBQVUsQ0FBQyxDQUFBO0FBQzVDLFFBQUEsS0FBS3RkLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJrQixtQkFBbUIsSUFDakN4VCxLQUFBLENBQUtuUixLQUFLLENBQUM0a0IscUJBQXFCLElBQ2hDelQsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ3NCLGNBQWM7QUFDekIsVUFBQSxPQUFPN2EsS0FBQSxDQUFLK2QsZ0JBQWdCLENBQUNULFVBQVUsQ0FBQyxDQUFBO0FBQzFDLFFBQUE7QUFDRSxVQUFBLE9BQU90ZCxLQUFBLENBQUtnZSxtQkFBbUIsQ0FBQ1YsVUFBVSxDQUFDLENBQUE7QUFDL0MsT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBbmQsZUFBQSxDQUFBSCxLQUFBLEVBQUEsY0FBQSxFQUVjLFlBQU07QUFBQSxNQUFBLElBQUFpZSxxQkFBQSxDQUFBO01BQ25CLElBQUlqZSxLQUFBLENBQUtuUixLQUFLLENBQUNvbkIsa0JBQWtCLElBQUlqVyxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYyxFQUFFO0FBQzlELFFBQUEsT0FBQTtBQUNGLE9BQUE7TUFFQSxJQUFNcUQsU0FBUyxHQUFHLEVBQUUsQ0FBQTtBQUNwQixNQUFBLElBQU1DLGdCQUFnQixHQUFHbmUsS0FBQSxDQUFLblIsS0FBSyxDQUFDdXZCLGtCQUFrQixHQUNsRHBlLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3d2QixXQUFXLEdBQUcsQ0FBQyxHQUMxQixDQUFDLENBQUE7QUFDTCxNQUFBLElBQU1DLGFBQWEsR0FDakJ0ZSxLQUFBLENBQUtuUixLQUFLLENBQUMya0IsbUJBQW1CLElBQUl4VCxLQUFBLENBQUtuUixLQUFLLENBQUM0a0IscUJBQXFCLEdBQzlEdFosUUFBUSxDQUFDNkYsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLEVBQUVvd0IsZ0JBQWdCLENBQUMsR0FDM0NsbUIsU0FBUyxDQUFDK0gsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLEVBQUVvd0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUNsRCxNQUFBLElBQU1yRSxlQUFlLEdBQUEsQ0FBQW1FLHFCQUFBLEdBQUdqZSxLQUFBLENBQUtuUixLQUFLLENBQUNpckIsZUFBZSxNQUFBbUUsSUFBQUEsSUFBQUEscUJBQUEsS0FBQUEsS0FBQUEsQ0FBQUEsR0FBQUEscUJBQUEsR0FBSUUsZ0JBQWdCLENBQUE7QUFDdEUsTUFBQSxLQUFLLElBQUk3aUIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHMEUsS0FBQSxDQUFLblIsS0FBSyxDQUFDd3ZCLFdBQVcsRUFBRSxFQUFFL2lCLENBQUMsRUFBRTtBQUMvQyxRQUFBLElBQU1pakIsV0FBVyxHQUFHampCLENBQUMsR0FBR3dlLGVBQWUsR0FBR3FFLGdCQUFnQixDQUFBO1FBQzFELElBQU1wQixTQUFTLEdBQ2IvYyxLQUFBLENBQUtuUixLQUFLLENBQUMya0IsbUJBQW1CLElBQUl4VCxLQUFBLENBQUtuUixLQUFLLENBQUM0a0IscUJBQXFCLEdBQzlEdFosUUFBUSxDQUFDbWtCLGFBQWEsRUFBRUMsV0FBVyxDQUFDLEdBQ3BDaG1CLFNBQVMsQ0FBQytsQixhQUFhLEVBQUVDLFdBQVcsQ0FBQyxDQUFBO0FBQzNDLFFBQUEsSUFBTUMsUUFBUSxHQUFBLFFBQUEsQ0FBQWp3QixNQUFBLENBQVkrTSxDQUFDLENBQUUsQ0FBQTtRQUM3QixJQUFNa1EsMEJBQTBCLEdBQUdsUSxDQUFDLEdBQUcwRSxLQUFBLENBQUtuUixLQUFLLENBQUN3dkIsV0FBVyxHQUFHLENBQUMsQ0FBQTtBQUNqRSxRQUFBLElBQU01Uyw0QkFBNEIsR0FBR25RLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUM0aUIsUUFBQUEsU0FBUyxDQUFDcGlCLElBQUksZUFDWjBFLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNFL0UsVUFBQUEsR0FBRyxFQUFFOGlCLFFBQVM7QUFDZDFiLFVBQUFBLEdBQUcsRUFBRSxTQUFBQSxHQUFDMmIsQ0FBQUEsR0FBRyxFQUFLO1lBQ1p6ZSxLQUFBLENBQUt1ZCxjQUFjLEdBQUdrQixHQUFHLENBQUE7V0FDekI7QUFDRnRpQixVQUFBQSxTQUFTLEVBQUMsbUNBQUE7U0FFVDZELEVBQUFBLEtBQUEsQ0FBSzBlLFlBQVksQ0FBQztBQUFFM0IsVUFBQUEsU0FBUyxFQUFUQSxTQUFTO0FBQUV6aEIsVUFBQUEsQ0FBQyxFQUFEQSxDQUFBQTtBQUFFLFNBQUMsQ0FBQyxlQUNwQ2tGLEtBQUEsQ0FBQUMsYUFBQSxDQUFDc08sS0FBSyxFQUFBO0FBQ0pqQixVQUFBQSx3QkFBd0IsRUFBRTlOLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2lmLHdCQUF5QjtBQUM5REMsVUFBQUEsMEJBQTBCLEVBQUUvTixLQUFBLENBQUtuUixLQUFLLENBQUNrZiwwQkFBMkI7QUFDbEUyQixVQUFBQSxtQkFBbUIsRUFBRTFQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzZnQixtQkFBb0I7QUFDcEQxQyxVQUFBQSxlQUFlLEVBQUVoTixLQUFBLENBQUtuUixLQUFLLENBQUM4dkIsb0JBQXFCO1VBQ2pEaGUsUUFBUSxFQUFFWCxLQUFBLENBQUs2YyxlQUFnQjtBQUMvQjFzQixVQUFBQSxHQUFHLEVBQUU0c0IsU0FBVTtBQUNmcFUsVUFBQUEsWUFBWSxFQUFFM0ksS0FBQSxDQUFLblIsS0FBSyxDQUFDOFosWUFBYTtBQUN0Q3BZLFVBQUFBLGdCQUFnQixFQUFFeVAsS0FBQSxDQUFLblIsS0FBSyxDQUFDMEIsZ0JBQWlCO0FBQzlDdWdCLFVBQUFBLGNBQWMsRUFBRTlRLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2lpQixjQUFlO1VBQzFDM0QsVUFBVSxFQUFFbk4sS0FBQSxDQUFLc04sY0FBZTtBQUNoQzlHLFVBQUFBLGVBQWUsRUFBRXhHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyt2QixrQkFBbUI7QUFDL0N4TyxVQUFBQSxvQkFBb0IsRUFBRXBRLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJYLGVBQWdCO0FBQ2pEeUYsVUFBQUEsZUFBZSxFQUFFak0sS0FBQSxDQUFLblIsS0FBSyxDQUFDb2QsZUFBZ0I7VUFDNUNtQixlQUFlLEVBQUVwTixLQUFBLENBQUtpTyxtQkFBb0I7VUFDMUNnQixZQUFZLEVBQUVqUCxLQUFBLENBQUs2ZSxxQkFBc0I7QUFDekN4UixVQUFBQSxZQUFZLEVBQUVyTixLQUFBLENBQUtuUixLQUFLLENBQUN3ZSxZQUFhO0FBQ3RDMkIsVUFBQUEsY0FBYyxFQUFFMVQsQ0FBRTtBQUNsQmtTLFVBQUFBLGdCQUFnQixFQUFFeE4sS0FBQSxDQUFLblIsS0FBSyxDQUFDMmUsZ0JBQWlCO0FBQzlDcGhCLFVBQUFBLE1BQU0sRUFBRTRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU87QUFDMUJFLFVBQUFBLE9BQU8sRUFBRTBULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQVE7QUFDNUJ5SCxVQUFBQSxPQUFPLEVBQUVpTSxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFRO0FBQzVCQyxVQUFBQSxZQUFZLEVBQUVnTSxLQUFBLENBQUtuUixLQUFLLENBQUNtRixZQUFhO0FBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRStMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29GLG9CQUFxQjtBQUN0RGlILFVBQUFBLGNBQWMsRUFBRThFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FNLGNBQWU7QUFDMUNxTSxVQUFBQSxRQUFRLEVBQUV2SCxLQUFBLENBQUtuUixLQUFLLENBQUMwWSxRQUFTO0FBQzlCUyxVQUFBQSxhQUFhLEVBQUVoSSxLQUFBLENBQUtNLEtBQUssQ0FBQzBILGFBQWM7QUFDeEM5VCxVQUFBQSxZQUFZLEVBQUU4TCxLQUFBLENBQUtuUixLQUFLLENBQUNxRixZQUFhO0FBQ3RDQyxVQUFBQSxvQkFBb0IsRUFBRTZMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NGLG9CQUFxQjtBQUN0RGdYLFVBQUFBLE1BQU0sRUFBRW5MLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NjLE1BQU87QUFDMUJDLFVBQUFBLG9CQUFvQixFQUFFcEwsS0FBQSxDQUFLblIsS0FBSyxDQUFDdWMsb0JBQXFCO0FBQ3REbUUsVUFBQUEsV0FBVyxFQUFFdlAsS0FBQSxDQUFLblIsS0FBSyxDQUFDMGdCLFdBQVk7QUFDcENuYixVQUFBQSxVQUFVLEVBQUU0TCxLQUFBLENBQUtuUixLQUFLLENBQUN1RixVQUFXO0FBQ2xDNlMsVUFBQUEsWUFBWSxFQUFFakgsS0FBQSxDQUFLblIsS0FBSyxDQUFDb1ksWUFBYTtBQUN0Q2lKLFVBQUFBLGVBQWUsRUFBRWxRLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FoQixlQUFnQjtBQUM1Q2xKLFVBQUFBLFFBQVEsRUFBRWhILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVM7QUFDOUJZLFVBQUFBLFlBQVksRUFBRTVILEtBQUEsQ0FBS25SLEtBQUssQ0FBQytZLFlBQWE7QUFDdENDLFVBQUFBLFVBQVUsRUFBRTdILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2daLFVBQVc7QUFDbENDLFVBQUFBLFlBQVksRUFBRTlILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2laLFlBQWE7QUFDdENDLFVBQUFBLDBCQUEwQixFQUFFL0gsS0FBQSxDQUFLblIsS0FBSyxDQUFDa1osMEJBQTJCO0FBQ2xFbEIsVUFBQUEsZUFBZSxFQUFFN0csS0FBQSxDQUFLblIsS0FBSyxDQUFDZ1ksZUFBZ0I7QUFDNUNDLFVBQUFBLGFBQWEsRUFBRTlHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2lZLGFBQWM7QUFDeEM2SSxVQUFBQSxlQUFlLEVBQUUzUCxLQUFBLENBQUtuUixLQUFLLENBQUM4Z0IsZUFBZ0I7QUFDNUNoaEIsVUFBQUEsU0FBUyxFQUFFcVIsS0FBQSxDQUFLblIsS0FBSyxDQUFDRixTQUFVO0FBQ2hDQyxVQUFBQSxPQUFPLEVBQUVvUixLQUFBLENBQUtuUixLQUFLLENBQUNELE9BQVE7QUFDNUJtaEIsVUFBQUEsYUFBYSxFQUFFL1AsS0FBQSxDQUFLblIsS0FBSyxDQUFDa2hCLGFBQWM7QUFDeEN6TCxVQUFBQSxPQUFPLEVBQUV0RSxLQUFBLENBQUtuUixLQUFLLENBQUN5VixPQUFRO0FBQzVCaUosVUFBQUEsbUJBQW1CLEVBQUV2TixLQUFBLENBQUtuUixLQUFLLENBQUMwZSxtQkFBb0I7QUFDcEQxQixVQUFBQSxpQkFBaUIsRUFBRTdMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dkLGlCQUFrQjtBQUNoRG9HLFVBQUFBLGtCQUFrQixFQUFFalMsS0FBQSxDQUFLblIsS0FBSyxDQUFDb2pCLGtCQUFtQjtBQUNsREksVUFBQUEsb0JBQW9CLEVBQUVyUyxLQUFBLENBQUtuUixLQUFLLENBQUN3akIsb0JBQXFCO0FBQ3REZ0YsVUFBQUEsaUJBQWlCLEVBQUVyWCxLQUFBLENBQUtuUixLQUFLLENBQUN3b0IsaUJBQWtCO0FBQ2hEMVEsVUFBQUEsMEJBQTBCLEVBQUUzRyxLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMkI7QUFDbEU2TSxVQUFBQSxtQkFBbUIsRUFBRXhULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJrQixtQkFBb0I7QUFDcER4QixVQUFBQSx1QkFBdUIsRUFBRWhTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21qQix1QkFBd0I7QUFDNURsRCxVQUFBQSw0QkFBNEIsRUFDMUI5TyxLQUFBLENBQUtuUixLQUFLLENBQUNpZ0IsNEJBQ1o7QUFDREQsVUFBQUEsNkJBQTZCLEVBQzNCN08sS0FBQSxDQUFLblIsS0FBSyxDQUFDZ2dCLDZCQUNaO0FBQ0RnTSxVQUFBQSxjQUFjLEVBQUU3YSxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBZTtBQUMxQ3BILFVBQUFBLHFCQUFxQixFQUFFelQsS0FBQSxDQUFLblIsS0FBSyxDQUFDNGtCLHFCQUFzQjtBQUN4RHZNLFVBQUFBLGNBQWMsRUFBRWxILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FZLGNBQWU7QUFDMUM2RCxVQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtuUixLQUFLLENBQUNrYyxjQUFlO1VBQzFDTSxZQUFZLEVBQUVyTCxLQUFBLENBQUtxTCxZQUFhO0FBQ2hDRyxVQUFBQSwwQkFBMEIsRUFBRUEsMEJBQTJCO0FBQ3ZEQyxVQUFBQSw0QkFBNEIsRUFBRUEsNEJBQUFBO1NBQy9CLENBQ0UsQ0FDUCxDQUFDLENBQUE7QUFDSCxPQUFBO0FBQ0EsTUFBQSxPQUFPeVMsU0FBUyxDQUFBO0tBQ2pCLENBQUEsQ0FBQTtJQUFBL2QsZUFBQSxDQUFBSCxLQUFBLEVBQUEsYUFBQSxFQUVhLFlBQU07QUFDbEIsTUFBQSxJQUFJQSxLQUFBLENBQUtuUixLQUFLLENBQUNvbkIsa0JBQWtCLEVBQUU7QUFDakMsUUFBQSxPQUFBO0FBQ0YsT0FBQTtBQUNBLE1BQUEsSUFBSWpXLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dzQixjQUFjLEVBQUU7UUFDN0Isb0JBQ0VyYSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3RFLFVBQUFBLFNBQVMsRUFBQyxtQ0FBQTtTQUNaNkQsRUFBQUEsS0FBQSxDQUFLMGUsWUFBWSxDQUFDO0FBQUUzQixVQUFBQSxTQUFTLEVBQUUvYyxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUFBO1NBQU0sQ0FBQyxlQUNsRHlTLEtBQUEsQ0FBQUMsYUFBQSxDQUFDOFYsSUFBSSxFQUFBdUksUUFBQSxDQUFBO1VBQ0gzUixVQUFVLEVBQUVuTixLQUFBLENBQUtzTixjQUFlO0FBQ2hDdEYsVUFBQUEsYUFBYSxFQUFFaEksS0FBQSxDQUFLTSxLQUFLLENBQUMwSCxhQUFjO1VBQ3hDK1Asa0JBQWtCLEVBQUUvWCxLQUFBLENBQUsrWCxrQkFBbUI7QUFDNUNocUIsVUFBQUEsSUFBSSxFQUFFaVMsS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFBQTtTQUNiaVMsRUFBQUEsS0FBQSxDQUFLblIsS0FBSyxFQUFBO1VBQ2R5b0IsZ0JBQWdCLEVBQUV0WCxLQUFBLENBQUsrZSxvQkFBcUI7VUFDNUN4SCxnQkFBZ0IsRUFBRXZYLEtBQUEsQ0FBS2dmLG9CQUFBQTtBQUFxQixTQUFBLENBQzdDLENBQ0UsQ0FBQyxDQUFBO0FBRVYsT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBN2UsZUFBQSxDQUFBSCxLQUFBLEVBQUEsbUJBQUEsRUFFbUIsWUFBTTtBQUN4QixNQUFBLElBQ0VBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFjLEtBQ3hCOWIsS0FBQSxDQUFLTSxLQUFLLENBQUNpZCxjQUFjLElBQUl2ZCxLQUFBLENBQUtuUixLQUFLLENBQUNvbkIsa0JBQWtCLENBQUMsRUFDNUQ7QUFDQSxRQUFBLG9CQUNFelYsS0FBQSxDQUFBQyxhQUFBLENBQUMwVCxJQUFJLEVBQUE7QUFDSG5OLFVBQUFBLFFBQVEsRUFBRWhILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVM7QUFDOUJrTyxVQUFBQSxVQUFVLEVBQUVsVixLQUFBLENBQUtuUixLQUFLLENBQUNxbUIsVUFBVztBQUNsQ3ZVLFVBQUFBLFFBQVEsRUFBRVgsS0FBQSxDQUFLblIsS0FBSyxDQUFDdW5CLFlBQWE7QUFDbEN6QixVQUFBQSxhQUFhLEVBQUUzVSxLQUFBLENBQUtuUixLQUFLLENBQUM4bEIsYUFBYztBQUN4Q3htQixVQUFBQSxNQUFNLEVBQUU2UixLQUFBLENBQUtuUixLQUFLLENBQUNvd0IsVUFBVztBQUM5QjluQixVQUFBQSxZQUFZLEVBQUU2SSxLQUFBLENBQUtuUixLQUFLLENBQUNzSSxZQUFhO0FBQ3RDbUcsVUFBQUEsU0FBUyxFQUFFMEMsS0FBQSxDQUFLblIsS0FBSyxDQUFDcXdCLGFBQWM7QUFDcEMzbkIsVUFBQUEsT0FBTyxFQUFFeUksS0FBQSxDQUFLblIsS0FBSyxDQUFDMEksT0FBUTtBQUM1QkMsVUFBQUEsT0FBTyxFQUFFd0ksS0FBQSxDQUFLblIsS0FBSyxDQUFDMkksT0FBUTtBQUM1Qk4sVUFBQUEsWUFBWSxFQUFFOEksS0FBQSxDQUFLblIsS0FBSyxDQUFDcUksWUFBYTtBQUN0Q0UsVUFBQUEsVUFBVSxFQUFFNEksS0FBQSxDQUFLblIsS0FBSyxDQUFDdUksVUFBVztBQUNsQzhlLFVBQUFBLFdBQVcsRUFBRWxXLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FuQixXQUFZO0FBQ3BDRixVQUFBQSxXQUFXLEVBQUVoVyxLQUFBLENBQUtuUixLQUFLLENBQUNtbkIsV0FBWTtBQUNwQ3dHLFVBQUFBLGlCQUFpQixFQUFFeGMsS0FBQSxDQUFLblIsS0FBSyxDQUFDMnRCLGlCQUFrQjtBQUNoREMsVUFBQUEscUJBQXFCLEVBQUV6YyxLQUFBLENBQUtuUixLQUFLLENBQUM0dEIscUJBQXNCO0FBQ3hERixVQUFBQSxnQkFBZ0IsRUFBRXZjLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzB0QixnQkFBaUI7QUFDOUM0QyxVQUFBQSxVQUFVLEVBQUVuZixLQUFBLENBQUtuUixLQUFLLENBQUNzd0IsVUFBVztBQUNsQzNLLFVBQUFBLFFBQVEsRUFBRXhVLEtBQUEsQ0FBS00sS0FBSyxDQUFDaWQsY0FBZTtBQUNwQ3pJLFVBQUFBLFdBQVcsRUFBRTlVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2ltQixXQUFZO0FBQ3BDMW9CLFVBQUFBLE1BQU0sRUFBRTRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQU87QUFDMUJvYSxVQUFBQSxlQUFlLEVBQUV4RyxLQUFBLENBQUtuUixLQUFLLENBQUMyWCxlQUFnQjtBQUM1Q3lQLFVBQUFBLGtCQUFrQixFQUFFalcsS0FBQSxDQUFLblIsS0FBSyxDQUFDb25CLGtCQUFBQTtBQUFtQixTQUNuRCxDQUFDLENBQUE7QUFFTixPQUFBO0tBQ0QsQ0FBQSxDQUFBO0lBQUE5VixlQUFBLENBQUFILEtBQUEsRUFBQSx3QkFBQSxFQUV3QixZQUFNO01BQzdCLElBQU1ySixJQUFJLEdBQUcsSUFBSTNLLElBQUksQ0FBQ2dVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsQ0FBQyxDQUFBO0FBQzFDLE1BQUEsSUFBTW9ZLFNBQVMsR0FBR256QixPQUFPLENBQUMwSyxJQUFJLENBQUMsSUFBSTBvQixPQUFPLENBQUNyZixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUMsQ0FBQTtNQUMvRCxJQUFNcVIsVUFBVSxHQUFHK0csU0FBUyxHQUFBN3dCLEVBQUFBLENBQUFBLE1BQUEsQ0FDckJ5UCxPQUFPLENBQUNySCxJQUFJLENBQUNHLFFBQVEsRUFBRSxDQUFDLEVBQUF2SSxHQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQUl5UCxPQUFPLENBQUNySCxJQUFJLENBQUNJLFVBQVUsRUFBRSxDQUFDLENBQUEsR0FDekQsRUFBRSxDQUFBO0FBQ04sTUFBQSxJQUFJaUosS0FBQSxDQUFLblIsS0FBSyxDQUFDeXdCLGFBQWEsRUFBRTtBQUM1QixRQUFBLG9CQUNFOWUsS0FBQSxDQUFBQyxhQUFBLENBQUM4ZSxTQUFTLEVBQUE7QUFDUnh4QixVQUFBQSxJQUFJLEVBQUU0SSxJQUFLO0FBQ1gwaEIsVUFBQUEsVUFBVSxFQUFFQSxVQUFXO0FBQ3ZCTyxVQUFBQSxjQUFjLEVBQUU1WSxLQUFBLENBQUtuUixLQUFLLENBQUMrcEIsY0FBZTtBQUMxQ2pZLFVBQUFBLFFBQVEsRUFBRVgsS0FBQSxDQUFLblIsS0FBSyxDQUFDdW5CLFlBQWE7QUFDbENrQyxVQUFBQSxlQUFlLEVBQUV0WSxLQUFBLENBQUtuUixLQUFLLENBQUN5cEIsZUFBQUE7QUFBZ0IsU0FDN0MsQ0FBQyxDQUFBO0FBRU4sT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBblksZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsWUFBTTtBQUMzQixNQUFBLElBQUF6RixnQkFBQSxHQUFtQ1YsY0FBYyxDQUMvQ21HLEtBQUEsQ0FBS00sS0FBSyxDQUFDdlMsSUFBSSxFQUNmaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDOEssY0FDYixDQUFDO1FBSE9hLFdBQVcsR0FBQUQsZ0JBQUEsQ0FBWEMsV0FBVztRQUFFVixTQUFTLEdBQUFTLGdCQUFBLENBQVRULFNBQVMsQ0FBQTtBQUk5QixNQUFBLElBQUkwbEIsZUFBZSxDQUFBO0FBRW5CLE1BQUEsSUFBSXhmLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dzQixjQUFjLEVBQUU7UUFDN0IyRSxlQUFlLEdBQUEsRUFBQSxDQUFBanhCLE1BQUEsQ0FBTWlNLFdBQVcsU0FBQWpNLE1BQUEsQ0FBTXVMLFNBQVMsQ0FBRSxDQUFBO0FBQ25ELE9BQUMsTUFBTSxJQUNMa0csS0FBQSxDQUFLblIsS0FBSyxDQUFDMmtCLG1CQUFtQixJQUM5QnhULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRrQixxQkFBcUIsRUFDaEM7UUFDQStMLGVBQWUsR0FBR3BxQixPQUFPLENBQUM0SyxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksQ0FBQyxDQUFBO0FBQzVDLE9BQUMsTUFBTTtBQUNMeXhCLFFBQUFBLGVBQWUsR0FBQWp4QixFQUFBQSxDQUFBQSxNQUFBLENBQU02RSxnQkFBZ0IsQ0FDbkNrQyxRQUFRLENBQUMwSyxLQUFBLENBQUtNLEtBQUssQ0FBQ3ZTLElBQUksQ0FBQyxFQUN6QmlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3pDLE1BQ2IsQ0FBQyxFQUFBLEdBQUEsQ0FBQSxDQUFBbUMsTUFBQSxDQUFJNkcsT0FBTyxDQUFDNEssS0FBQSxDQUFLTSxLQUFLLENBQUN2UyxJQUFJLENBQUMsQ0FBRSxDQUFBO0FBQ2pDLE9BQUE7TUFFQSxvQkFDRXlTLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtBQUNFNEwsUUFBQUEsSUFBSSxFQUFDLE9BQU87QUFDWixRQUFBLFdBQUEsRUFBVSxRQUFRO0FBQ2xCbFEsUUFBQUEsU0FBUyxFQUFDLDZCQUFBO0FBQTZCLE9BQUEsRUFFdEM2RCxLQUFBLENBQUtNLEtBQUssQ0FBQzRaLHVCQUF1QixJQUFJc0YsZUFDbkMsQ0FBQyxDQUFBO0tBRVYsQ0FBQSxDQUFBO0lBQUFyZixlQUFBLENBQUFILEtBQUEsRUFBQSxnQkFBQSxFQUVnQixZQUFNO0FBQ3JCLE1BQUEsSUFBSUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDcVQsUUFBUSxFQUFFO1FBQ3ZCLG9CQUNFMUIsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUt0RSxVQUFBQSxTQUFTLEVBQUMsc0NBQUE7QUFBc0MsU0FBQSxFQUNsRDZELEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FULFFBQ1QsQ0FBQyxDQUFBO0FBRVYsT0FBQTtLQUNELENBQUEsQ0FBQTtBQTMyQkNsQyxJQUFBQSxLQUFBLENBQUtxTCxZQUFZLGdCQUFHN0ssS0FBSyxDQUFDbUIsU0FBUyxFQUFFLENBQUE7SUFFckMzQixLQUFBLENBQUtNLEtBQUssR0FBRztBQUNYdlMsTUFBQUEsSUFBSSxFQUFFaVMsS0FBQSxDQUFLeWYsYUFBYSxFQUFFO0FBQzFCelgsTUFBQUEsYUFBYSxFQUFFLElBQUk7QUFDbkJ1VixNQUFBQSxjQUFjLEVBQUUsSUFBSTtBQUNwQnJELE1BQUFBLHVCQUF1QixFQUFFLEtBQUE7S0FDMUIsQ0FBQTtBQUFDLElBQUEsT0FBQWxhLEtBQUEsQ0FBQTtBQUNKLEdBQUE7RUFBQzRCLFNBQUEsQ0FBQThYLFFBQUEsRUFBQTNaLGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUE2WCxRQUFBLEVBQUEsQ0FBQTtJQUFBaGUsR0FBQSxFQUFBLG1CQUFBO0lBQUEvUCxLQUFBLEVBRUQsU0FBQW1XLGlCQUFBQSxHQUFvQjtBQUFBLE1BQUEsSUFBQW1ELE1BQUEsR0FBQSxJQUFBLENBQUE7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFBLElBQUksSUFBSSxDQUFDcFcsS0FBSyxDQUFDaXRCLGNBQWMsRUFBRTtRQUM3QixJQUFJLENBQUM0RCxvQkFBb0IsR0FBSSxZQUFNO1VBQ2pDemEsTUFBSSxDQUFDM0QsUUFBUSxDQUFDO1lBQUVpYyxjQUFjLEVBQUV0WSxNQUFJLENBQUNzWSxjQUFBQTtBQUFlLFdBQUMsQ0FBQyxDQUFBO0FBQ3hELFNBQUMsRUFBRyxDQUFBO0FBQ04sT0FBQTtBQUNGLEtBQUE7QUFBQyxHQUFBLEVBQUE7SUFBQTdoQixHQUFBLEVBQUEsb0JBQUE7QUFBQS9QLElBQUFBLEtBQUEsRUFFRCxTQUFBOGdCLGtCQUFtQjdCLENBQUFBLFNBQVMsRUFBRTtBQUFBLE1BQUEsSUFBQStVLE1BQUEsR0FBQSxJQUFBLENBQUE7QUFDNUIsTUFBQSxJQUNFLElBQUksQ0FBQzl3QixLQUFLLENBQUNvWSxZQUFZLEtBQ3RCLENBQUN0VixTQUFTLENBQUMsSUFBSSxDQUFDOUMsS0FBSyxDQUFDb1ksWUFBWSxFQUFFMkQsU0FBUyxDQUFDM0QsWUFBWSxDQUFDLElBQzFELElBQUksQ0FBQ3BZLEtBQUssQ0FBQ2lyQixlQUFlLEtBQUtsUCxTQUFTLENBQUNrUCxlQUFlLENBQUMsRUFDM0Q7QUFDQSxRQUFBLElBQU04RixlQUFlLEdBQUcsQ0FBQ3J1QixXQUFXLENBQ2xDLElBQUksQ0FBQytPLEtBQUssQ0FBQ3ZTLElBQUksRUFDZixJQUFJLENBQUNjLEtBQUssQ0FBQ29ZLFlBQ2IsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDM0YsUUFBUSxDQUNYO0FBQ0V2VCxVQUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDYyxLQUFLLENBQUNvWSxZQUFBQTtBQUNuQixTQUFDLEVBQ0QsWUFBQTtVQUFBLE9BQU0yWSxlQUFlLElBQUlELE1BQUksQ0FBQ3hGLHVCQUF1QixDQUFDd0YsTUFBSSxDQUFDcmYsS0FBSyxDQUFDdlMsSUFBSSxDQUFDLENBQUE7QUFBQSxTQUN4RSxDQUFDLENBQUE7T0FDRixNQUFNLElBQ0wsSUFBSSxDQUFDYyxLQUFLLENBQUNxbUIsVUFBVSxJQUNyQixDQUFDdmpCLFNBQVMsQ0FBQyxJQUFJLENBQUM5QyxLQUFLLENBQUNxbUIsVUFBVSxFQUFFdEssU0FBUyxDQUFDc0ssVUFBVSxDQUFDLEVBQ3ZEO1FBQ0EsSUFBSSxDQUFDNVQsUUFBUSxDQUFDO0FBQ1p2VCxVQUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDYyxLQUFLLENBQUNxbUIsVUFBQUE7QUFDbkIsU0FBQyxDQUFDLENBQUE7QUFDSixPQUFBO0FBQ0YsS0FBQTtBQUFDLEdBQUEsRUFBQTtJQUFBeFosR0FBQSxFQUFBLFFBQUE7SUFBQS9QLEtBQUEsRUErekJELFNBQUFnWCxNQUFBQSxHQUFTO01BQ1AsSUFBTWtkLFNBQVMsR0FBRyxJQUFJLENBQUNoeEIsS0FBSyxDQUFDaXhCLFNBQVMsSUFBSS9HLGlCQUFpQixDQUFBO01BQzNELG9CQUNFdlksS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUtvRCxRQUFBQSxLQUFLLEVBQUU7QUFBRWtjLFVBQUFBLE9BQU8sRUFBRSxVQUFBO1NBQWE7UUFBQ2pkLEdBQUcsRUFBRSxJQUFJLENBQUN1SSxZQUFBQTtBQUFhLE9BQUEsZUFDMUQ3SyxLQUFBLENBQUFDLGFBQUEsQ0FBQ29mLFNBQVMsRUFBQTtRQUNSMWpCLFNBQVMsRUFBRTBHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNoVSxLQUFLLENBQUNzTixTQUFTLEVBQUU7QUFDeEQsVUFBQSw2QkFBNkIsRUFBRSxJQUFJLENBQUN0TixLQUFLLENBQUNvbkIsa0JBQUFBO0FBQzVDLFNBQUMsQ0FBRTtRQUNIaUQsUUFBUSxFQUFFLElBQUksQ0FBQ3JxQixLQUFLLENBQUNpdEIsY0FBYyxJQUFJLElBQUksQ0FBQ2p0QixLQUFLLENBQUN5d0IsYUFBYztBQUNoRXJKLFFBQUFBLGtCQUFrQixFQUFFLElBQUksQ0FBQ3BuQixLQUFLLENBQUNvbkIsa0JBQUFBO09BRTlCLEVBQUEsSUFBSSxDQUFDK0osb0JBQW9CLEVBQUUsRUFDM0IsSUFBSSxDQUFDQyxvQkFBb0IsRUFBRSxFQUMzQixJQUFJLENBQUNDLGdCQUFnQixFQUFFLEVBQ3ZCLElBQUksQ0FBQ2xNLFlBQVksRUFBRSxFQUNuQixJQUFJLENBQUNtTSxXQUFXLEVBQUUsRUFDbEIsSUFBSSxDQUFDQyxpQkFBaUIsRUFBRSxFQUN4QixJQUFJLENBQUNDLGlCQUFpQixFQUFFLEVBQ3hCLElBQUksQ0FBQ0Msc0JBQXNCLEVBQUUsRUFDN0IsSUFBSSxDQUFDQyxjQUFjLEVBQ1gsQ0FDUixDQUFDLENBQUE7QUFFVixLQUFBO0FBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtJQUFBN2tCLEdBQUEsRUFBQSxjQUFBO0lBQUFFLEdBQUEsRUF4aUNELFNBQUFBLEdBQUFBLEdBQTBCO01BQ3hCLE9BQU87QUFDTCtkLFFBQUFBLGVBQWUsRUFBRSxTQUFBQSxlQUFBLEdBQU0sRUFBRTtBQUN6QjBFLFFBQUFBLFdBQVcsRUFBRSxDQUFDO0FBQ2RyRCxRQUFBQSx3QkFBd0IsRUFBRSxLQUFLO0FBQy9COUUsUUFBQUEsV0FBVyxFQUFFLE1BQU07QUFDbkJzRixRQUFBQSx1QkFBdUIsRUFBRSxlQUFlO0FBQ3hDVSxRQUFBQSxtQkFBbUIsRUFBRSxXQUFXO0FBQ2hDWCxRQUFBQSx3QkFBd0IsRUFBRSxnQkFBZ0I7QUFDMUNVLFFBQUFBLG9CQUFvQixFQUFFLFlBQVk7QUFDbEMzRCxRQUFBQSxlQUFlLEVBQUUsSUFBSTtBQUNyQjNlLFFBQUFBLGNBQWMsRUFBRW5PLHdCQUFBQTtPQUNqQixDQUFBO0FBQ0gsS0FBQTtBQUFDLEdBQUEsQ0FBQSxDQUFBLENBQUE7QUFBQSxDQWRtQ2dWLENBQUFBLEtBQUssQ0FBQ3dDLFNBQVMsQ0FBQTs7QUMzRHJELElBQU13ZCxZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBQS94QixJQUFBLEVBQTBDO0FBQUEsRUFBQSxJQUFwQ2d5QixJQUFJLEdBQUFoeUIsSUFBQSxDQUFKZ3lCLElBQUk7SUFBQUMsY0FBQSxHQUFBanlCLElBQUEsQ0FBRTBOLFNBQVM7QUFBVEEsSUFBQUEsU0FBUyxHQUFBdWtCLGNBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxFQUFFLEdBQUFBLGNBQUE7SUFBRWhnQixRQUFPLEdBQUFqUyxJQUFBLENBQVBpUyxPQUFPLENBQUE7RUFDbkQsSUFBTWlnQixZQUFZLEdBQUcsaUNBQWlDLENBQUE7QUFFdEQsRUFBQSxrQkFBSW5nQixLQUFLLENBQUNvZ0IsY0FBYyxDQUFDSCxJQUFJLENBQUMsRUFBRTtBQUM5QixJQUFBLG9CQUFPamdCLEtBQUssQ0FBQytYLFlBQVksQ0FBQ2tJLElBQUksRUFBRTtBQUM5QnRrQixNQUFBQSxTQUFTLEtBQUE1TixNQUFBLENBQUtreUIsSUFBSSxDQUFDNXhCLEtBQUssQ0FBQ3NOLFNBQVMsSUFBSSxFQUFFLEVBQUEsR0FBQSxDQUFBLENBQUE1TixNQUFBLENBQUlveUIsWUFBWSxPQUFBcHlCLE1BQUEsQ0FBSTROLFNBQVMsQ0FBRTtBQUN2RXVFLE1BQUFBLE9BQU8sRUFBRSxTQUFBQSxPQUFDOEMsQ0FBQUEsQ0FBQyxFQUFLO1FBQ2QsSUFBSSxPQUFPaWQsSUFBSSxDQUFDNXhCLEtBQUssQ0FBQzZSLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDNUMrZixVQUFBQSxJQUFJLENBQUM1eEIsS0FBSyxDQUFDNlIsT0FBTyxDQUFDOEMsQ0FBQyxDQUFDLENBQUE7QUFDdkIsU0FBQTtBQUVBLFFBQUEsSUFBSSxPQUFPOUMsUUFBTyxLQUFLLFVBQVUsRUFBRTtVQUNqQ0EsUUFBTyxDQUFDOEMsQ0FBQyxDQUFDLENBQUE7QUFDWixTQUFBO0FBQ0YsT0FBQTtBQUNGLEtBQUMsQ0FBQyxDQUFBO0FBQ0osR0FBQTtBQUVBLEVBQUEsSUFBSSxPQUFPaWQsSUFBSSxLQUFLLFFBQVEsRUFBRTtJQUM1QixvQkFDRWpnQixLQUFBLENBQUFDLGFBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDRXRFLE1BQUFBLFNBQVMsRUFBQTVOLEVBQUFBLENBQUFBLE1BQUEsQ0FBS295QixZQUFZLEVBQUFweUIsR0FBQUEsQ0FBQUEsQ0FBQUEsTUFBQSxDQUFJa3lCLElBQUksRUFBQWx5QixHQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQUk0TixTQUFTLENBQUc7QUFDbEQsTUFBQSxhQUFBLEVBQVksTUFBTTtBQUNsQnVFLE1BQUFBLE9BQU8sRUFBRUEsUUFBQUE7QUFBUSxLQUNsQixDQUFDLENBQUE7QUFFTixHQUFBOztBQUVBO0VBQ0Esb0JBQ0VGLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtJQUNFdEUsU0FBUyxFQUFBLEVBQUEsQ0FBQTVOLE1BQUEsQ0FBS295QixZQUFZLE9BQUFweUIsTUFBQSxDQUFJNE4sU0FBUyxDQUFHO0FBQzFDMGtCLElBQUFBLEtBQUssRUFBQyw0QkFBNEI7QUFDbENDLElBQUFBLE9BQU8sRUFBQyxhQUFhO0FBQ3JCcGdCLElBQUFBLE9BQU8sRUFBRUEsUUFBQUE7R0FFVEYsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0FBQU03VSxJQUFBQSxDQUFDLEVBQUMsNk5BQUE7QUFBNk4sR0FBRSxDQUNwTyxDQUFDLENBQUE7QUFFVixDQUFDLENBQUE7QUFRRCxxQkFBZTQwQixZQUFZOztBQ2hETSxJQUVaTyxNQUFNLDBCQUFBaGhCLGdCQUFBLEVBQUE7RUFPekIsU0FBQWdoQixNQUFBQSxDQUFZbHlCLEtBQUssRUFBRTtBQUFBLElBQUEsSUFBQW1SLEtBQUEsQ0FBQTtBQUFBQyxJQUFBQSxlQUFBLE9BQUE4Z0IsTUFBQSxDQUFBLENBQUE7QUFDakIvZ0IsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUE2Z0IsSUFBQUEsRUFBQUEsTUFBQSxHQUFNbHlCLEtBQUssQ0FBQSxDQUFBLENBQUE7SUFDWG1SLEtBQUEsQ0FBS2doQixFQUFFLEdBQUdoVyxRQUFRLENBQUN2SyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7QUFBQyxJQUFBLE9BQUFULEtBQUEsQ0FBQTtBQUMxQyxHQUFBO0VBQUM0QixTQUFBLENBQUFtZixNQUFBLEVBQUFoaEIsZ0JBQUEsQ0FBQSxDQUFBO0VBQUEsT0FBQThCLFlBQUEsQ0FBQWtmLE1BQUEsRUFBQSxDQUFBO0lBQUFybEIsR0FBQSxFQUFBLG1CQUFBO0lBQUEvUCxLQUFBLEVBRUQsU0FBQW1XLGlCQUFBQSxHQUFvQjtBQUNsQixNQUFBLElBQUksQ0FBQ21mLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQ3B5QixLQUFLLENBQUNxeUIsVUFBVSxJQUFJbFcsUUFBUSxFQUFFbVcsY0FBYyxDQUNsRSxJQUFJLENBQUN0eUIsS0FBSyxDQUFDdXlCLFFBQ2IsQ0FBQyxDQUFBO0FBQ0QsTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDSCxVQUFVLEVBQUU7UUFDcEIsSUFBSSxDQUFDQSxVQUFVLEdBQUdqVyxRQUFRLENBQUN2SyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDL0MsUUFBQSxJQUFJLENBQUN3Z0IsVUFBVSxDQUFDSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQ3h5QixLQUFLLENBQUN1eUIsUUFBUSxDQUFDLENBQUE7QUFDdkQsUUFBQSxDQUFDLElBQUksQ0FBQ3Z5QixLQUFLLENBQUNxeUIsVUFBVSxJQUFJbFcsUUFBUSxDQUFDRSxJQUFJLEVBQUVvVyxXQUFXLENBQUMsSUFBSSxDQUFDTCxVQUFVLENBQUMsQ0FBQTtBQUN2RSxPQUFBO01BQ0EsSUFBSSxDQUFDQSxVQUFVLENBQUNLLFdBQVcsQ0FBQyxJQUFJLENBQUNOLEVBQUUsQ0FBQyxDQUFBO0FBQ3RDLEtBQUE7QUFBQyxHQUFBLEVBQUE7SUFBQXRsQixHQUFBLEVBQUEsc0JBQUE7SUFBQS9QLEtBQUEsRUFFRCxTQUFBNDFCLG9CQUFBQSxHQUF1QjtNQUNyQixJQUFJLENBQUNOLFVBQVUsQ0FBQ08sV0FBVyxDQUFDLElBQUksQ0FBQ1IsRUFBRSxDQUFDLENBQUE7QUFDdEMsS0FBQTtBQUFDLEdBQUEsRUFBQTtJQUFBdGxCLEdBQUEsRUFBQSxRQUFBO0lBQUEvUCxLQUFBLEVBRUQsU0FBQWdYLE1BQUFBLEdBQVM7QUFDUCxNQUFBLG9CQUFPOGUsUUFBUSxDQUFDQyxZQUFZLENBQUMsSUFBSSxDQUFDN3lCLEtBQUssQ0FBQ3FULFFBQVEsRUFBRSxJQUFJLENBQUM4ZSxFQUFFLENBQUMsQ0FBQTtBQUM1RCxLQUFBO0FBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLENBOUJpQ3hnQixDQUFBQSxLQUFLLENBQUN3QyxTQUFTLENBQUE7O0FDRG5EO0FBQ0E7QUFDQTs7QUFFQSxJQUFNMmUseUJBQXlCLEdBQzdCLGdEQUFnRCxDQUFBO0FBQ2xELElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBZUEsQ0FBSUMsSUFBSSxFQUFBO0VBQUEsT0FBSyxDQUFDQSxJQUFJLENBQUNDLFFBQVEsSUFBSUQsSUFBSSxDQUFDclgsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQUEsQ0FBQSxDQUFBO0FBQUMsSUFFcER1WCxPQUFPLDBCQUFBaGlCLGdCQUFBLEVBQUE7RUFZMUIsU0FBQWdpQixPQUFBQSxDQUFZbHpCLEtBQUssRUFBRTtBQUFBLElBQUEsSUFBQW1SLEtBQUEsQ0FBQTtBQUFBQyxJQUFBQSxlQUFBLE9BQUE4aEIsT0FBQSxDQUFBLENBQUE7QUFDakIvaEIsSUFBQUEsS0FBQSxHQUFBRSxVQUFBLENBQUE2aEIsSUFBQUEsRUFBQUEsT0FBQSxHQUFNbHpCLEtBQUssQ0FBQSxDQUFBLENBQUE7QUFLYjtBQUNBO0lBQUFzUixlQUFBLENBQUFILEtBQUEsRUFDaUIsZ0JBQUEsRUFBQSxZQUFBO0FBQUEsTUFBQSxPQUNmcFQsS0FBSyxDQUFDbzFCLFNBQVMsQ0FBQ2wwQixLQUFLLENBQ2xCbTBCLElBQUksQ0FDSGppQixLQUFBLENBQUtraUIsVUFBVSxDQUFDbGdCLE9BQU8sQ0FBQ21nQixnQkFBZ0IsQ0FBQ1IseUJBQXlCLENBQUMsRUFDbkUsQ0FBQyxFQUNELENBQUMsQ0FDSCxDQUFDLENBQ0E5bUIsTUFBTSxDQUFDK21CLGVBQWUsQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7SUFBQXpoQixlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVULFlBQU07QUFDdkIsTUFBQSxJQUFNb2lCLFdBQVcsR0FBR3BpQixLQUFBLENBQUtxaUIsY0FBYyxFQUFFLENBQUE7QUFDekNELE1BQUFBLFdBQVcsSUFDVEEsV0FBVyxDQUFDdjBCLE1BQU0sR0FBRyxDQUFDLElBQ3RCdTBCLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDdjBCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzhkLEtBQUssRUFBRSxDQUFBO0tBQzlDLENBQUEsQ0FBQTtJQUFBeEwsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtBQUNyQixNQUFBLElBQU1vaUIsV0FBVyxHQUFHcGlCLEtBQUEsQ0FBS3FpQixjQUFjLEVBQUUsQ0FBQTtBQUN6Q0QsTUFBQUEsV0FBVyxJQUFJQSxXQUFXLENBQUN2MEIsTUFBTSxHQUFHLENBQUMsSUFBSXUwQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUN6VyxLQUFLLEVBQUUsQ0FBQTtLQUNoRSxDQUFBLENBQUE7QUF4QkMzTCxJQUFBQSxLQUFBLENBQUtraUIsVUFBVSxnQkFBRzFoQixLQUFLLENBQUNtQixTQUFTLEVBQUUsQ0FBQTtBQUFDLElBQUEsT0FBQTNCLEtBQUEsQ0FBQTtBQUN0QyxHQUFBO0VBQUM0QixTQUFBLENBQUFtZ0IsT0FBQSxFQUFBaGlCLGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUFrZ0IsT0FBQSxFQUFBLENBQUE7SUFBQXJtQixHQUFBLEVBQUEsUUFBQTtJQUFBL1AsS0FBQSxFQXlCRCxTQUFBZ1gsTUFBQUEsR0FBUztBQUNQLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQzlULEtBQUssQ0FBQ3l6QixhQUFhLEVBQUU7QUFDN0IsUUFBQSxPQUFPLElBQUksQ0FBQ3p6QixLQUFLLENBQUNxVCxRQUFRLENBQUE7QUFDNUIsT0FBQTtNQUNBLG9CQUNFMUIsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQUt0RSxRQUFBQSxTQUFTLEVBQUMsNEJBQTRCO1FBQUMyRyxHQUFHLEVBQUUsSUFBSSxDQUFDb2YsVUFBQUE7T0FDcEQxaEIsZUFBQUEsS0FBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0FBQ0V0RSxRQUFBQSxTQUFTLEVBQUMsbUNBQW1DO0FBQzdDcU8sUUFBQUEsUUFBUSxFQUFDLEdBQUc7UUFDWnlTLE9BQU8sRUFBRSxJQUFJLENBQUNzRixnQkFBQUE7T0FDZixDQUFDLEVBQ0QsSUFBSSxDQUFDMXpCLEtBQUssQ0FBQ3FULFFBQVEsZUFDcEIxQixLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDRXRFLFFBQUFBLFNBQVMsRUFBQyxpQ0FBaUM7QUFDM0NxTyxRQUFBQSxRQUFRLEVBQUMsR0FBRztRQUNaeVMsT0FBTyxFQUFFLElBQUksQ0FBQ3VGLGNBQUFBO0FBQWUsT0FDOUIsQ0FDRSxDQUFDLENBQUE7QUFFVixLQUFBO0FBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtJQUFBOW1CLEdBQUEsRUFBQSxjQUFBO0lBQUFFLEdBQUEsRUEzREQsU0FBQUEsR0FBQUEsR0FBMEI7TUFDeEIsT0FBTztBQUNMMG1CLFFBQUFBLGFBQWEsRUFBRSxJQUFBO09BQ2hCLENBQUE7QUFDSCxLQUFBO0FBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLENBTGtDOWhCLENBQUFBLEtBQUssQ0FBQ3dDLFNBQVMsQ0FBQTs7QUNjckMsU0FBU3lmLFlBQVlBLENBQUN6ZixTQUFTLEVBQUU7QUFDOUMsRUFBQSxJQUFNMGYsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUk3ekIsS0FBSyxFQUFLO0FBQzlCLElBQUEsSUFBTTh6QixTQUFTLEdBQUE5RSxjQUFBLENBQUFBLGNBQUEsS0FDVmh2QixLQUFLLENBQUEsRUFBQSxFQUFBLEVBQUE7QUFDUit6QixNQUFBQSxlQUFlLEVBQUUvekIsS0FBSyxDQUFDK3pCLGVBQWUsSUFBSSxFQUFFO0FBQzVDQyxNQUFBQSxXQUFXLEVBQUVoMEIsS0FBSyxDQUFDZzBCLFdBQVcsSUFBSSxFQUFFO01BQ3BDQyxVQUFVLEVBQ1IsT0FBT2owQixLQUFLLENBQUNpMEIsVUFBVSxLQUFLLFNBQVMsR0FBR2owQixLQUFLLENBQUNpMEIsVUFBVSxHQUFHLElBQUE7S0FDOUQsQ0FBQSxDQUFBO0FBQ0QsSUFBQSxJQUFNQyxRQUFRLEdBQUd2aUIsS0FBSyxDQUFDd2lCLE1BQU0sRUFBRSxDQUFBO0FBQy9CLElBQUEsSUFBTUMsYUFBYSxHQUFHQyxXQUFXLENBQUFyRixjQUFBLENBQUE7QUFDL0JzRixNQUFBQSxJQUFJLEVBQUUsQ0FBQ1IsU0FBUyxDQUFDRyxVQUFVO0FBQzNCTSxNQUFBQSxvQkFBb0IsRUFBRUMsVUFBVTtNQUNoQ0MsU0FBUyxFQUFFWCxTQUFTLENBQUNZLGVBQWU7TUFDcENDLFVBQVUsRUFBQSxDQUNSQyxJQUFJLENBQUM7QUFBRUMsUUFBQUEsT0FBTyxFQUFFLEVBQUE7T0FBSSxDQUFDLEVBQ3JCOVYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUNWK1YsS0FBSyxDQUFDO0FBQUVySyxRQUFBQSxPQUFPLEVBQUV5SixRQUFBQTtPQUFVLENBQUMsRUFBQXgwQixNQUFBLENBQUEyTyxrQkFBQSxDQUN6QnlsQixTQUFTLENBQUNDLGVBQWUsQ0FBQSxDQUFBO0FBQzdCLEtBQUEsRUFDRUQsU0FBUyxDQUFDRSxXQUFXLENBQ3pCLENBQUMsQ0FBQTtJQUVGLG9CQUNFcmlCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDdUMsU0FBUyxFQUFBOGIsUUFBQSxLQUFLNkQsU0FBUyxFQUFBO0FBQUVFLE1BQUFBLFdBQVcsRUFBQWhGLGNBQUEsQ0FBQUEsY0FBQSxLQUFPb0YsYUFBYSxDQUFBLEVBQUEsRUFBQSxFQUFBO0FBQUVGLFFBQUFBLFFBQVEsRUFBUkEsUUFBQUE7QUFBUSxPQUFBLENBQUE7QUFBRyxLQUFBLENBQUUsQ0FBQyxDQUFBO0dBRTVFLENBQUE7QUFTRCxFQUFBLE9BQU9MLFlBQVksQ0FBQTtBQUNyQjs7QUNyREE7QUFDYWtCLElBQUFBLGVBQWUsMEJBQUE3akIsZ0JBQUEsRUFBQTtBQUFBLEVBQUEsU0FBQTZqQixlQUFBLEdBQUE7QUFBQTNqQixJQUFBQSxlQUFBLE9BQUEyakIsZUFBQSxDQUFBLENBQUE7QUFBQSxJQUFBLE9BQUExakIsVUFBQSxDQUFBLElBQUEsRUFBQTBqQixlQUFBLEVBQUEvdkIsU0FBQSxDQUFBLENBQUE7QUFBQSxHQUFBO0VBQUErTixTQUFBLENBQUFnaUIsZUFBQSxFQUFBN2pCLGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUEraEIsZUFBQSxFQUFBLENBQUE7SUFBQWxvQixHQUFBLEVBQUEsUUFBQTtJQUFBL1AsS0FBQSxFQXNCMUIsU0FBQWdYLE1BQUFBLEdBQVM7QUFDUCxNQUFBLElBQUF5RSxXQUFBLEdBWUksSUFBSSxDQUFDdlksS0FBSztRQVhac04sU0FBUyxHQUFBaUwsV0FBQSxDQUFUakwsU0FBUztRQUNUMG5CLGdCQUFnQixHQUFBemMsV0FBQSxDQUFoQnljLGdCQUFnQjtRQUNoQmYsVUFBVSxHQUFBMWIsV0FBQSxDQUFWMGIsVUFBVTtRQUNWZ0IsZUFBZSxHQUFBMWMsV0FBQSxDQUFmMGMsZUFBZTtRQUNmQyxlQUFlLEdBQUEzYyxXQUFBLENBQWYyYyxlQUFlO1FBQ2Z6QixhQUFhLEdBQUFsYixXQUFBLENBQWJrYixhQUFhO1FBQ2IwQixlQUFlLEdBQUE1YyxXQUFBLENBQWY0YyxlQUFlO1FBQ2Y1QyxRQUFRLEdBQUFoYSxXQUFBLENBQVJnYSxRQUFRO1FBQ1JGLFVBQVUsR0FBQTlaLFdBQUEsQ0FBVjhaLFVBQVU7UUFDVjJCLFdBQVcsR0FBQXpiLFdBQUEsQ0FBWHliLFdBQVc7UUFDWG9CLFNBQVMsR0FBQTdjLFdBQUEsQ0FBVDZjLFNBQVMsQ0FBQTtBQUdYLE1BQUEsSUFBSUMsTUFBTSxDQUFBO01BRVYsSUFBSSxDQUFDcEIsVUFBVSxFQUFFO0FBQ2YsUUFBQSxJQUFNcE8sT0FBTyxHQUFHN1IsSUFBSSxDQUFDLHlCQUF5QixFQUFFMUcsU0FBUyxDQUFDLENBQUE7QUFDMUQrbkIsUUFBQUEsTUFBTSxnQkFDSjFqQixLQUFBLENBQUFDLGFBQUEsQ0FBQ3NoQixPQUFPLEVBQUE7QUFBQ08sVUFBQUEsYUFBYSxFQUFFQSxhQUFBQTtTQUN0QjloQixlQUFBQSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDRXFDLFVBQUFBLEdBQUcsRUFBRStmLFdBQVcsQ0FBQ3NCLElBQUksQ0FBQ0MsV0FBWTtVQUNsQ3ZnQixLQUFLLEVBQUVnZixXQUFXLENBQUN3QixjQUFlO0FBQ2xDbG9CLFVBQUFBLFNBQVMsRUFBRXVZLE9BQVE7VUFDbkIsZ0JBQWdCbU8sRUFBQUEsV0FBVyxDQUFDUyxTQUFVO0FBQ3RDdlgsVUFBQUEsU0FBUyxFQUFFaVksZUFBQUE7U0FFVkYsRUFBQUEsZUFBZSxFQUNmRyxTQUFTLGlCQUNSempCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDNmpCLGFBQWEsRUFBQTtVQUNaeGhCLEdBQUcsRUFBRStmLFdBQVcsQ0FBQ0UsUUFBUztVQUMxQndCLE9BQU8sRUFBRTFCLFdBQVcsQ0FBQzBCLE9BQVE7QUFDN0JDLFVBQUFBLElBQUksRUFBQyxjQUFjO0FBQ25CQyxVQUFBQSxXQUFXLEVBQUUsQ0FBRTtBQUNmclEsVUFBQUEsTUFBTSxFQUFFLENBQUU7QUFDVnNRLFVBQUFBLEtBQUssRUFBRSxFQUFHO0FBQ1Y3Z0IsVUFBQUEsS0FBSyxFQUFFO0FBQUU4Z0IsWUFBQUEsU0FBUyxFQUFFLGtCQUFBO1dBQXFCO0FBQ3pDeG9CLFVBQUFBLFNBQVMsRUFBQyw0QkFBQTtTQUNYLENBRUEsQ0FDRSxDQUNWLENBQUE7QUFDSCxPQUFBO0FBRUEsTUFBQSxJQUFJLElBQUksQ0FBQ3ROLEtBQUssQ0FBQysxQixlQUFlLEVBQUU7QUFDOUJWLFFBQUFBLE1BQU0sZ0JBQUcxakIsS0FBSyxDQUFDQyxhQUFhLENBQUMsSUFBSSxDQUFDNVIsS0FBSyxDQUFDKzFCLGVBQWUsRUFBRSxFQUFFLEVBQUVWLE1BQU0sQ0FBQyxDQUFBO0FBQ3RFLE9BQUE7QUFFQSxNQUFBLElBQUk5QyxRQUFRLElBQUksQ0FBQzBCLFVBQVUsRUFBRTtBQUMzQm9CLFFBQUFBLE1BQU0sZ0JBQ0oxakIsS0FBQSxDQUFBQyxhQUFBLENBQUNzZ0IsTUFBTSxFQUFBO0FBQUNLLFVBQUFBLFFBQVEsRUFBRUEsUUFBUztBQUFDRixVQUFBQSxVQUFVLEVBQUVBLFVBQUFBO0FBQVcsU0FBQSxFQUNoRGdELE1BQ0ssQ0FDVCxDQUFBO0FBQ0gsT0FBQTtBQUVBLE1BQUEsSUFBTVcsY0FBYyxHQUFHaGlCLElBQUksQ0FBQywwQkFBMEIsRUFBRWdoQixnQkFBZ0IsQ0FBQyxDQUFBO01BRXpFLG9CQUNFcmpCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDRCxLQUFLLENBQUNza0IsUUFBUSxFQUFBLElBQUEsZUFDYnRrQixLQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBS3FDLFFBQUFBLEdBQUcsRUFBRStmLFdBQVcsQ0FBQ3NCLElBQUksQ0FBQ1ksWUFBYTtBQUFDNW9CLFFBQUFBLFNBQVMsRUFBRTBvQixjQUFBQTtBQUFlLE9BQUEsRUFDaEVkLGVBQ0UsQ0FBQyxFQUNMRyxNQUNhLENBQUMsQ0FBQTtBQUVyQixLQUFBO0FBQUMsR0FBQSxDQUFBLEVBQUEsQ0FBQTtJQUFBeG9CLEdBQUEsRUFBQSxjQUFBO0lBQUFFLEdBQUEsRUF6RkQsU0FBQUEsR0FBQUEsR0FBMEI7TUFDeEIsT0FBTztBQUNMa25CLFFBQUFBLFVBQVUsRUFBRSxJQUFBO09BQ2IsQ0FBQTtBQUNILEtBQUE7QUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsQ0FMa0N0aUIsQ0FBQUEsS0FBSyxDQUFDd0MsU0FBUyxDQUFBLENBQUE7QUE2RnBELHdCQUFleWYsWUFBWSxDQUFDbUIsZUFBZSxDQUFDOztBQzFDNUMsSUFBTW9CLHVCQUF1QixHQUFHLHdDQUF3QyxDQUFBO0FBQ3hFLElBQU1DLGVBQWUsR0FBRy9oQixjQUFjLENBQUN3VyxRQUFRLENBQUMsQ0FBQTs7QUFFaEQ7QUFDQSxTQUFTd0wsc0JBQXNCQSxDQUFDOXpCLEtBQUssRUFBRUMsS0FBSyxFQUFFO0VBQzVDLElBQUlELEtBQUssSUFBSUMsS0FBSyxFQUFFO0FBQ2xCLElBQUEsT0FDRWlFLFFBQVEsQ0FBQ2xFLEtBQUssQ0FBQyxLQUFLa0UsUUFBUSxDQUFDakUsS0FBSyxDQUFDLElBQUkrRCxPQUFPLENBQUNoRSxLQUFLLENBQUMsS0FBS2dFLE9BQU8sQ0FBQy9ELEtBQUssQ0FBQyxDQUFBO0FBRTVFLEdBQUE7RUFFQSxPQUFPRCxLQUFLLEtBQUtDLEtBQUssQ0FBQTtBQUN4QixDQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQU04ekIsV0FBVyxHQUFHLHVCQUF1QixDQUFBO0FBRXRCQyxJQUFBQSxVQUFVLDBCQUFBcmxCLGdCQUFBLEVBQUE7RUE0UDdCLFNBQUFxbEIsVUFBQUEsQ0FBWXYyQixLQUFLLEVBQUU7QUFBQSxJQUFBLElBQUFtUixLQUFBLENBQUE7QUFBQUMsSUFBQUEsZUFBQSxPQUFBbWxCLFVBQUEsQ0FBQSxDQUFBO0FBQ2pCcGxCLElBQUFBLEtBQUEsR0FBQUUsVUFBQSxDQUFBa2xCLElBQUFBLEVBQUFBLFVBQUEsR0FBTXYyQixLQUFLLENBQUEsQ0FBQSxDQUFBO0lBQUVzUixlQUFBLENBQUFILEtBQUEsRUFrREcsaUJBQUEsRUFBQSxZQUFBO01BQUEsT0FDaEJBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FtQixVQUFVLEdBQ2pCbFYsS0FBQSxDQUFLblIsS0FBSyxDQUFDcW1CLFVBQVUsR0FDckJsVixLQUFBLENBQUtuUixLQUFLLENBQUNnWixVQUFVLElBQUk3SCxLQUFBLENBQUtuUixLQUFLLENBQUNGLFNBQVMsR0FDM0NxUixLQUFBLENBQUtuUixLQUFLLENBQUNGLFNBQVMsR0FDcEJxUixLQUFBLENBQUtuUixLQUFLLENBQUMrWSxZQUFZLElBQUk1SCxLQUFBLENBQUtuUixLQUFLLENBQUNELE9BQU8sR0FDM0NvUixLQUFBLENBQUtuUixLQUFLLENBQUNELE9BQU8sR0FDbEJsRCxPQUFPLEVBQUUsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0FBRW5CO0lBQUF5VSxlQUFBLENBQUFILEtBQUEsRUFDaUIsZ0JBQUEsRUFBQSxZQUFBO0FBQUEsTUFBQSxJQUFBcWxCLG9CQUFBLENBQUE7QUFBQSxNQUFBLE9BQUEsQ0FBQUEsb0JBQUEsR0FDZnJsQixLQUFBLENBQUtuUixLQUFLLENBQUMwWSxRQUFRLE1BQUE4ZCxJQUFBQSxJQUFBQSxvQkFBQSxLQUFuQkEsS0FBQUEsQ0FBQUEsR0FBQUEsS0FBQUEsQ0FBQUEsR0FBQUEsb0JBQUEsQ0FBcUIxUCxNQUFNLENBQUMsVUFBQzJQLFdBQVcsRUFBRXpvQixPQUFPLEVBQUs7UUFDcEQsSUFBTTlPLElBQUksR0FBRyxJQUFJL0IsSUFBSSxDQUFDNlEsT0FBTyxDQUFDOU8sSUFBSSxDQUFDLENBQUE7QUFDbkMsUUFBQSxJQUFJLENBQUM5QixTQUFPLENBQUM4QixJQUFJLENBQUMsRUFBRTtBQUNsQixVQUFBLE9BQU91M0IsV0FBVyxDQUFBO0FBQ3BCLFNBQUE7UUFFQSxPQUFBLzJCLEVBQUFBLENBQUFBLE1BQUEsQ0FBQTJPLGtCQUFBLENBQVdvb0IsV0FBVyxJQUFBekgsY0FBQSxDQUFBQSxjQUFBLENBQUEsRUFBQSxFQUFPaGhCLE9BQU8sQ0FBQSxFQUFBLEVBQUEsRUFBQTtBQUFFOU8sVUFBQUEsSUFBSSxFQUFKQSxJQUFBQTtBQUFJLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtPQUMzQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQUEsS0FBQSxDQUFBLENBQUE7SUFBQW9TLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGtCQUFBLEVBRVcsWUFBTTtBQUFBLE1BQUEsSUFBQXZSLElBQUEsQ0FBQTtBQUN2QixNQUFBLElBQU04MkIsbUJBQW1CLEdBQUd2bEIsS0FBQSxDQUFLd2xCLGVBQWUsRUFBRSxDQUFBO0FBQ2xELE1BQUEsSUFBTWw1QixPQUFPLEdBQUdvTyxtQkFBbUIsQ0FBQ3NGLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyxDQUFBO0FBQy9DLE1BQUEsSUFBTWtGLE9BQU8sR0FBRytHLG1CQUFtQixDQUFDa0YsS0FBQSxDQUFLblIsS0FBSyxDQUFDLENBQUE7QUFDL0MsTUFBQSxJQUFNNDJCLG1CQUFtQixHQUN2Qm41QixPQUFPLElBQUkyQixRQUFRLENBQUNzM0IsbUJBQW1CLEVBQUVsMUIsVUFBVSxDQUFDL0QsT0FBTyxDQUFDLENBQUMsR0FDekRBLE9BQU8sR0FDUHlILE9BQU8sSUFBSWdLLE9BQU8sQ0FBQ3duQixtQkFBbUIsRUFBRXB6QixRQUFRLENBQUM0QixPQUFPLENBQUMsQ0FBQyxHQUN4REEsT0FBTyxHQUNQd3hCLG1CQUFtQixDQUFBO01BQzNCLE9BQU87QUFDTHBDLFFBQUFBLElBQUksRUFBRW5qQixLQUFBLENBQUtuUixLQUFLLENBQUM2MkIsU0FBUyxJQUFJLEtBQUs7QUFDbkNDLFFBQUFBLFlBQVksRUFBRSxLQUFLO1FBQ25CMWUsWUFBWSxFQUFBLENBQUF4WSxJQUFBLEdBQ1R1UixLQUFBLENBQUtuUixLQUFLLENBQUNpWixZQUFZLEdBQ3BCOUgsS0FBQSxDQUFLblIsS0FBSyxDQUFDRixTQUFTLEdBQ3BCcVIsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxNQUFBLElBQUEsSUFBQXZZLElBQUEsS0FBQSxLQUFBLENBQUEsR0FBQUEsSUFBQSxHQUFLZzNCLG1CQUFtQjtBQUNqRDtBQUNBO1FBQ0F2cUIsY0FBYyxFQUFFRCxvQkFBb0IsQ0FBQytFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FNLGNBQWMsQ0FBQztBQUMvRDBxQixRQUFBQSxPQUFPLEVBQUUsS0FBSztBQUNkO0FBQ0E7QUFDQXhhLFFBQUFBLG9CQUFvQixFQUFFLEtBQUs7QUFDM0I4TyxRQUFBQSx1QkFBdUIsRUFBRSxLQUFBO09BQzFCLENBQUE7S0FDRixDQUFBLENBQUE7SUFBQS9aLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLDBCQUFBLEVBRTBCLFlBQU07TUFDL0IsSUFBSUEsS0FBQSxDQUFLNmxCLG1CQUFtQixFQUFFO0FBQzVCQyxRQUFBQSxZQUFZLENBQUM5bEIsS0FBQSxDQUFLNmxCLG1CQUFtQixDQUFDLENBQUE7QUFDeEMsT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBMWxCLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFVBQUEsRUFFVSxZQUFNO01BQ2YsSUFBSUEsS0FBQSxDQUFLK2xCLEtBQUssSUFBSS9sQixLQUFBLENBQUsrbEIsS0FBSyxDQUFDcGEsS0FBSyxFQUFFO0FBQ2xDM0wsUUFBQUEsS0FBQSxDQUFLK2xCLEtBQUssQ0FBQ3BhLEtBQUssQ0FBQztBQUFFQyxVQUFBQSxhQUFhLEVBQUUsSUFBQTtBQUFLLFNBQUMsQ0FBQyxDQUFBO0FBQzNDLE9BQUE7S0FDRCxDQUFBLENBQUE7SUFBQXpMLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLFNBQUEsRUFFUyxZQUFNO01BQ2QsSUFBSUEsS0FBQSxDQUFLK2xCLEtBQUssSUFBSS9sQixLQUFBLENBQUsrbEIsS0FBSyxDQUFDQyxJQUFJLEVBQUU7QUFDakNobUIsUUFBQUEsS0FBQSxDQUFLK2xCLEtBQUssQ0FBQ0MsSUFBSSxFQUFFLENBQUE7QUFDbkIsT0FBQTtNQUVBaG1CLEtBQUEsQ0FBS2ltQixnQkFBZ0IsRUFBRSxDQUFBO0tBQ3hCLENBQUEsQ0FBQTtBQUFBOWxCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVTLFNBQUEsRUFBQSxVQUFDbWpCLElBQUksRUFBMEI7QUFBQSxNQUFBLElBQXhCK0MsV0FBVyxHQUFBcnlCLFNBQUEsQ0FBQWhHLE1BQUEsR0FBQSxDQUFBLElBQUFnRyxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFDLFNBQUEsR0FBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLEtBQUssQ0FBQTtNQUNsQ21NLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWDtBQUNFNmhCLFFBQUFBLElBQUksRUFBRUEsSUFBSTtRQUNWbGMsWUFBWSxFQUNWa2MsSUFBSSxJQUFJbmpCLEtBQUEsQ0FBS00sS0FBSyxDQUFDNmlCLElBQUksR0FDbkJuakIsS0FBQSxDQUFLTSxLQUFLLENBQUMyRyxZQUFZLEdBQ3ZCakgsS0FBQSxDQUFLbW1CLGdCQUFnQixFQUFFLENBQUNsZixZQUFZO0FBQzFDbWYsUUFBQUEsbUJBQW1CLEVBQUVDLDZCQUFBQTtBQUN2QixPQUFDLEVBQ0QsWUFBTTtRQUNKLElBQUksQ0FBQ2xELElBQUksRUFBRTtBQUNUbmpCLFVBQUFBLEtBQUEsQ0FBS3NCLFFBQVEsQ0FDWCxVQUFDc1UsSUFBSSxFQUFBO1lBQUEsT0FBTTtBQUNUZ1EsY0FBQUEsT0FBTyxFQUFFTSxXQUFXLEdBQUd0USxJQUFJLENBQUNnUSxPQUFPLEdBQUcsS0FBQTthQUN2QyxDQUFBO0FBQUEsV0FBQyxFQUNGLFlBQU07QUFDSixZQUFBLENBQUNNLFdBQVcsSUFBSWxtQixLQUFBLENBQUtzbUIsT0FBTyxFQUFFLENBQUE7WUFFOUJ0bUIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQUVpbEIsY0FBQUEsVUFBVSxFQUFFLElBQUE7QUFBSyxhQUFDLENBQUMsQ0FBQTtBQUNyQyxXQUNGLENBQUMsQ0FBQTtBQUNILFNBQUE7QUFDRixPQUNGLENBQUMsQ0FBQTtLQUNGLENBQUEsQ0FBQTtJQUFBcG1CLGVBQUEsQ0FBQUgsS0FBQSxFQUNTLFNBQUEsRUFBQSxZQUFBO0FBQUEsTUFBQSxPQUFNdkUsTUFBTSxDQUFDdUUsS0FBQSxDQUFLTSxLQUFLLENBQUMyRyxZQUFZLENBQUMsQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0lBQUE5RyxlQUFBLENBQUFILEtBQUEsRUFFOUIsZ0JBQUEsRUFBQSxZQUFBO0FBQUEsTUFBQSxPQUNmQSxLQUFBLENBQUtuUixLQUFLLENBQUNzMEIsSUFBSSxLQUFLcnZCLFNBQVMsR0FDekJrTSxLQUFBLENBQUtNLEtBQUssQ0FBQzZpQixJQUFJLElBQUksQ0FBQ25qQixLQUFBLENBQUtuUixLQUFLLENBQUNpekIsUUFBUSxJQUFJLENBQUM5aEIsS0FBQSxDQUFLblIsS0FBSyxDQUFDMjNCLFFBQVEsR0FDL0R4bUIsS0FBQSxDQUFLblIsS0FBSyxDQUFDczBCLElBQUksQ0FBQTtBQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQUFoakIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVAsYUFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztBQUN2QixNQUFBLElBQUksQ0FBQ1MsS0FBQSxDQUFLTSxLQUFLLENBQUNxbEIsWUFBWSxFQUFFO0FBQzVCM2xCLFFBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ291QixPQUFPLENBQUMxZCxLQUFLLENBQUMsQ0FBQTtBQUN6QixRQUFBLElBQUksQ0FBQ1MsS0FBQSxDQUFLblIsS0FBSyxDQUFDNDNCLGtCQUFrQixJQUFJLENBQUN6bUIsS0FBQSxDQUFLblIsS0FBSyxDQUFDMjNCLFFBQVEsRUFBRTtBQUMxRHhtQixVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEIsU0FBQTtBQUNGLE9BQUE7TUFDQXRFLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFc2tCLFFBQUFBLE9BQU8sRUFBRSxJQUFBO0FBQUssT0FBQyxDQUFDLENBQUE7S0FDakMsQ0FBQSxDQUFBO0lBQUF6bEIsZUFBQSxDQUFBSCxLQUFBLEVBQUEsc0JBQUEsRUFFc0IsWUFBTTtBQUMzQjtNQUNBLElBQUlBLEtBQUEsQ0FBSzZsQixtQkFBbUIsRUFBRTtRQUM1QjdsQixLQUFBLENBQUswbUIsd0JBQXdCLEVBQUUsQ0FBQTtBQUNqQyxPQUFBOztBQUVBO0FBQ0E7QUFDQTtNQUNBMW1CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFcWtCLFFBQUFBLFlBQVksRUFBRSxJQUFBO0FBQUssT0FBQyxFQUFFLFlBQU07QUFDMUMzbEIsUUFBQUEsS0FBQSxDQUFLNmxCLG1CQUFtQixHQUFHYyxVQUFVLENBQUMsWUFBTTtVQUMxQzNtQixLQUFBLENBQUs0bUIsUUFBUSxFQUFFLENBQUE7VUFDZjVtQixLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRXFrQixZQUFBQSxZQUFZLEVBQUUsS0FBQTtBQUFNLFdBQUMsQ0FBQyxDQUFBO0FBQ3hDLFNBQUMsQ0FBQyxDQUFBO0FBQ0osT0FBQyxDQUFDLENBQUE7S0FDSCxDQUFBLENBQUE7SUFBQXhsQixlQUFBLENBQUFILEtBQUEsRUFBQSxrQkFBQSxFQUVrQixZQUFNO0FBQ3ZCOGxCLE1BQUFBLFlBQVksQ0FBQzlsQixLQUFBLENBQUs2bUIsaUJBQWlCLENBQUMsQ0FBQTtNQUNwQzdtQixLQUFBLENBQUs2bUIsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO0tBQzlCLENBQUEsQ0FBQTtJQUFBMW1CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGlCQUFBLEVBRWlCLFlBQU07TUFDdEJBLEtBQUEsQ0FBS2ltQixnQkFBZ0IsRUFBRSxDQUFBO0FBQ3ZCam1CLE1BQUFBLEtBQUEsQ0FBSzZtQixpQkFBaUIsR0FBR0YsVUFBVSxDQUFDLFlBQUE7QUFBQSxRQUFBLE9BQU0zbUIsS0FBQSxDQUFLNG1CLFFBQVEsRUFBRSxDQUFBO0FBQUEsT0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQzlELENBQUEsQ0FBQTtJQUFBem1CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHFCQUFBLEVBRXFCLFlBQU07TUFDMUJBLEtBQUEsQ0FBS2ltQixnQkFBZ0IsRUFBRSxDQUFBO0tBQ3hCLENBQUEsQ0FBQTtBQUFBOWxCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVZLFlBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7QUFDdEIsTUFBQSxJQUFJLENBQUNTLEtBQUEsQ0FBS00sS0FBSyxDQUFDNmlCLElBQUksSUFBSW5qQixLQUFBLENBQUtuUixLQUFLLENBQUNzd0IsVUFBVSxJQUFJbmYsS0FBQSxDQUFLblIsS0FBSyxDQUFDeXdCLGFBQWEsRUFBRTtBQUN6RXRmLFFBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2k0QixNQUFNLENBQUN2bkIsS0FBSyxDQUFDLENBQUE7QUFDMUIsT0FBQTtNQUVBUyxLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRXNrQixRQUFBQSxPQUFPLEVBQUUsS0FBQTtBQUFNLE9BQUMsQ0FBQyxDQUFBO0tBQ2xDLENBQUEsQ0FBQTtBQUFBemxCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUU0Qiw0QkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztBQUN0QyxNQUFBLElBQUksQ0FBQ1MsS0FBQSxDQUFLblIsS0FBSyxDQUFDc2MsTUFBTSxFQUFFO0FBQ3RCbkwsUUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3JCLE9BQUE7QUFDQXRFLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FVLGNBQWMsQ0FBQzNELEtBQUssQ0FBQyxDQUFBO0FBQ2hDLE1BQUEsSUFBSVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDc3dCLFVBQVUsRUFBRTtRQUN6QjVmLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO0FBQ3hCLE9BQUE7S0FDRCxDQUFBLENBQUE7SUFBQXBHLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGNBQUEsRUFFYyxZQUFnQjtBQUFBLE1BQUEsS0FBQSxJQUFBb0QsSUFBQSxHQUFBdlAsU0FBQSxDQUFBaEcsTUFBQSxFQUFaazVCLE9BQU8sR0FBQW42QixJQUFBQSxLQUFBLENBQUF3VyxJQUFBLEdBQUFFLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUYsSUFBQSxFQUFBRSxJQUFBLEVBQUEsRUFBQTtBQUFQeWpCLFFBQUFBLE9BQU8sQ0FBQXpqQixJQUFBLENBQUF6UCxHQUFBQSxTQUFBLENBQUF5UCxJQUFBLENBQUEsQ0FBQTtBQUFBLE9BQUE7QUFDeEIsTUFBQSxJQUFJL0QsS0FBSyxHQUFHd25CLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN0QixNQUFBLElBQUkvbUIsS0FBQSxDQUFLblIsS0FBSyxDQUFDbTRCLFdBQVcsRUFBRTtRQUMxQmhuQixLQUFBLENBQUtuUixLQUFLLENBQUNtNEIsV0FBVyxDQUFDN2MsS0FBSyxDQUFBbkssS0FBQSxFQUFPK21CLE9BQU8sQ0FBQyxDQUFBO0FBQzNDLFFBQUEsSUFDRSxPQUFPeG5CLEtBQUssQ0FBQzBuQixrQkFBa0IsS0FBSyxVQUFVLElBQzlDMW5CLEtBQUssQ0FBQzBuQixrQkFBa0IsRUFBRSxFQUMxQjtBQUNBLFVBQUEsT0FBQTtBQUNGLFNBQUE7QUFDRixPQUFBO01BQ0FqbkIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQ1ppbEIsUUFBQUEsVUFBVSxFQUFFaG5CLEtBQUssQ0FBQ2tFLE1BQU0sQ0FBQzlYLEtBQUs7QUFDOUJ5NkIsUUFBQUEsbUJBQW1CLEVBQUVjLDBCQUFBQTtBQUN2QixPQUFDLENBQUMsQ0FBQTtBQUNGLE1BQUEsSUFBSW41QixJQUFJLEdBQUc3QixTQUFTLENBQ2xCcVQsS0FBSyxDQUFDa0UsTUFBTSxDQUFDOVgsS0FBSyxFQUNsQnFVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzFDLFVBQVUsRUFDckI2VCxLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFNLEVBQ2pCNFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDeEMsYUFBYSxFQUN4QjJULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQ2IsQ0FBQyxDQUFBO0FBQ0Q7TUFDQSxJQUNFMFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDb25CLGtCQUFrQixJQUM3QmpXLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsSUFDbkJqWixJQUFJLElBQ0osQ0FBQzRELFNBQVMsQ0FBQzVELElBQUksRUFBRWlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsQ0FBQyxFQUNyQztRQUNBalosSUFBSSxHQUFHZ08sR0FBRyxDQUFDaUUsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxFQUFFO0FBQzlCbWdCLFVBQUFBLEtBQUssRUFBRXJ3QixRQUFRLENBQUMvSSxJQUFJLENBQUM7QUFDckJxNUIsVUFBQUEsT0FBTyxFQUFFcndCLFVBQVUsQ0FBQ2hKLElBQUksQ0FBQztVQUN6QjBRLE9BQU8sRUFBRVosVUFBVSxDQUFDOVAsSUFBSSxDQUFBO0FBQzFCLFNBQUMsQ0FBQyxDQUFBO0FBQ0osT0FBQTtNQUNBLElBQUlBLElBQUksSUFBSSxDQUFDd1IsS0FBSyxDQUFDa0UsTUFBTSxDQUFDOVgsS0FBSyxFQUFFO1FBQy9CcVUsS0FBQSxDQUFLcW5CLFdBQVcsQ0FBQ3Q1QixJQUFJLEVBQUV3UixLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDckMsT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBWSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsVUFBQ2pTLElBQUksRUFBRXdSLEtBQUssRUFBRXVhLGVBQWUsRUFBSztBQUMvQyxNQUFBLElBQUk5WixLQUFBLENBQUtuUixLQUFLLENBQUMwZSxtQkFBbUIsSUFBSSxDQUFDdk4sS0FBQSxDQUFLblIsS0FBSyxDQUFDaXRCLGNBQWMsRUFBRTtBQUNoRTtBQUNBO1FBQ0E5YixLQUFBLENBQUtzbkIsb0JBQW9CLEVBQUUsQ0FBQTtBQUM3QixPQUFBO0FBQ0EsTUFBQSxJQUFJdG5CLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ200QixXQUFXLEVBQUU7QUFDMUJobkIsUUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDbTRCLFdBQVcsQ0FBQ3puQixLQUFLLENBQUMsQ0FBQTtBQUMvQixPQUFBO01BQ0FTLEtBQUEsQ0FBS3FuQixXQUFXLENBQUN0NUIsSUFBSSxFQUFFd1IsS0FBSyxFQUFFLEtBQUssRUFBRXVhLGVBQWUsQ0FBQyxDQUFBO0FBQ3JELE1BQUEsSUFBSTlaLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzA0QixjQUFjLEVBQUU7UUFDN0J2bkIsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQUU0WSxVQUFBQSx1QkFBdUIsRUFBRSxJQUFBO0FBQUssU0FBQyxDQUFDLENBQUE7QUFDbEQsT0FBQTtBQUNBLE1BQUEsSUFBSSxDQUFDbGEsS0FBQSxDQUFLblIsS0FBSyxDQUFDMGUsbUJBQW1CLElBQUl2TixLQUFBLENBQUtuUixLQUFLLENBQUNpdEIsY0FBYyxFQUFFO0FBQ2hFOWIsUUFBQUEsS0FBQSxDQUFLa1EsZUFBZSxDQUFDbmlCLElBQUksQ0FBQyxDQUFBO09BQzNCLE1BQU0sSUFBSSxDQUFDaVMsS0FBQSxDQUFLblIsS0FBSyxDQUFDc2MsTUFBTSxFQUFFO0FBQzdCLFFBQUEsSUFBSSxDQUFDbkwsS0FBQSxDQUFLblIsS0FBSyxDQUFDaVosWUFBWSxFQUFFO0FBQzVCOUgsVUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3JCLFNBQUE7QUFFQSxRQUFBLElBQUE4QyxXQUFBLEdBQStCcEgsS0FBQSxDQUFLblIsS0FBSztVQUFqQ0YsU0FBUyxHQUFBeVksV0FBQSxDQUFUelksU0FBUztVQUFFQyxPQUFPLEdBQUF3WSxXQUFBLENBQVB4WSxPQUFPLENBQUE7QUFFMUIsUUFBQSxJQUFJRCxTQUFTLElBQUksQ0FBQ0MsT0FBTyxJQUFJLENBQUNzUSxZQUFZLENBQUNuUixJQUFJLEVBQUVZLFNBQVMsQ0FBQyxFQUFFO0FBQzNEcVIsVUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3JCLFNBQUE7QUFDRixPQUFBO0tBQ0QsQ0FBQSxDQUFBO0lBQUFuRSxlQUFBLENBQUFILEtBQUEsRUFBQSxhQUFBLEVBRWEsVUFBQ2pTLElBQUksRUFBRXdSLEtBQUssRUFBRWlvQixTQUFTLEVBQUUxTixlQUFlLEVBQUs7TUFDekQsSUFBSTdULFdBQVcsR0FBR2xZLElBQUksQ0FBQTtBQUV0QixNQUFBLElBQUlpUyxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYyxFQUFFO0FBQzdCLFFBQUEsSUFDRTVVLFdBQVcsS0FBSyxJQUFJLElBQ3BCalEsY0FBYyxDQUFDWixPQUFPLENBQUM2USxXQUFXLENBQUMsRUFBRWpHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQyxFQUNoRDtBQUNBLFVBQUEsT0FBQTtBQUNGLFNBQUE7QUFDRixPQUFDLE1BQU0sSUFBSW1SLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJrQixtQkFBbUIsRUFBRTtBQUN6QyxRQUFBLElBQUl2TixXQUFXLEtBQUssSUFBSSxJQUFJblIsZUFBZSxDQUFDbVIsV0FBVyxFQUFFakcsS0FBQSxDQUFLblIsS0FBSyxDQUFDLEVBQUU7QUFDcEUsVUFBQSxPQUFBO0FBQ0YsU0FBQTtBQUNGLE9BQUMsTUFBTTtBQUNMLFFBQUEsSUFBSW9YLFdBQVcsS0FBSyxJQUFJLElBQUl0UyxhQUFhLENBQUNzUyxXQUFXLEVBQUVqRyxLQUFBLENBQUtuUixLQUFLLENBQUMsRUFBRTtBQUNsRSxVQUFBLE9BQUE7QUFDRixTQUFBO0FBQ0YsT0FBQTtBQUVBLE1BQUEsSUFBQXlZLFlBQUEsR0FTSXRILEtBQUEsQ0FBS25SLEtBQUs7UUFSWjhSLFFBQVEsR0FBQTJHLFlBQUEsQ0FBUjNHLFFBQVE7UUFDUm1ILFlBQVksR0FBQVIsWUFBQSxDQUFaUSxZQUFZO1FBQ1puWixTQUFTLEdBQUEyWSxZQUFBLENBQVQzWSxTQUFTO1FBQ1RDLE9BQU8sR0FBQTBZLFlBQUEsQ0FBUDFZLE9BQU87UUFDUGlZLGVBQWUsR0FBQVMsWUFBQSxDQUFmVCxlQUFlO1FBQ2ZDLGFBQWEsR0FBQVEsWUFBQSxDQUFiUixhQUFhO1FBQ2J2UCxPQUFPLEdBQUErUCxZQUFBLENBQVAvUCxPQUFPO1FBQ1Brd0IsU0FBUyxHQUFBbmdCLFlBQUEsQ0FBVG1nQixTQUFTLENBQUE7TUFHWCxJQUNFLENBQUM1MUIsT0FBTyxDQUFDbU8sS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxFQUFFZixXQUFXLENBQUMsSUFDMUNqRyxLQUFBLENBQUtuUixLQUFLLENBQUM2NEIsWUFBWSxJQUN2QjVmLFlBQVksSUFDWmpCLGVBQWUsRUFDZjtRQUNBLElBQUlaLFdBQVcsS0FBSyxJQUFJLEVBQUU7QUFDeEIsVUFBQSxJQUNFakcsS0FBQSxDQUFLblIsS0FBSyxDQUFDbVksUUFBUSxLQUNsQixDQUFDd2dCLFNBQVMsSUFDUixDQUFDeG5CLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFjLElBQ3pCLENBQUM5YixLQUFBLENBQUtuUixLQUFLLENBQUNvbkIsa0JBQWtCLElBQzlCLENBQUNqVyxLQUFBLENBQUtuUixLQUFLLENBQUN5d0IsYUFBYyxDQUFDLEVBQy9CO0FBQ0FyWixZQUFBQSxXQUFXLEdBQUc1VyxPQUFPLENBQUM0VyxXQUFXLEVBQUU7Y0FDakN6VyxJQUFJLEVBQUVzSCxRQUFRLENBQUNrSixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUM7Y0FDbkN0WCxNQUFNLEVBQUVxSCxVQUFVLENBQUNpSixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUM7QUFDdkNwWCxjQUFBQSxNQUFNLEVBQUVpTyxVQUFVLENBQUNtQyxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLENBQUE7QUFDeEMsYUFBQyxDQUFDLENBQUE7QUFDSixXQUFBOztBQUVBO0FBQ0EsVUFBQSxJQUNFLENBQUN3Z0IsU0FBUyxLQUNUeG5CLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFjLElBQUk5YixLQUFBLENBQUtuUixLQUFLLENBQUNvbkIsa0JBQWtCLENBQUMsRUFDNUQ7QUFDQSxZQUFBLElBQUkxZSxPQUFPLEVBQUU7QUFDWDBPLGNBQUFBLFdBQVcsR0FBRzVXLE9BQU8sQ0FBQzRXLFdBQVcsRUFBRTtBQUNqQ3pXLGdCQUFBQSxJQUFJLEVBQUUrSCxPQUFPLENBQUNULFFBQVEsRUFBRTtBQUN4QnBILGdCQUFBQSxNQUFNLEVBQUU2SCxPQUFPLENBQUNSLFVBQVUsRUFBRTtBQUM1Qm5ILGdCQUFBQSxNQUFNLEVBQUUySCxPQUFPLENBQUNzRyxVQUFVLEVBQUM7QUFDN0IsZUFBQyxDQUFDLENBQUE7QUFDSixhQUFBO0FBQ0YsV0FBQTtBQUVBLFVBQUEsSUFBSSxDQUFDbUMsS0FBQSxDQUFLblIsS0FBSyxDQUFDc2MsTUFBTSxFQUFFO1lBQ3RCbkwsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQ1oyRixjQUFBQSxZQUFZLEVBQUVoQixXQUFBQTtBQUNoQixhQUFDLENBQUMsQ0FBQTtBQUNKLFdBQUE7QUFDQSxVQUFBLElBQUksQ0FBQ2pHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzg0QixrQkFBa0IsRUFBRTtZQUNsQzNuQixLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRXdZLGNBQUFBLGVBQWUsRUFBRUEsZUFBQUE7QUFBZ0IsYUFBQyxDQUFDLENBQUE7QUFDckQsV0FBQTtBQUNGLFNBQUE7QUFDQSxRQUFBLElBQUloUyxZQUFZLEVBQUU7QUFDaEIsVUFBQSxJQUFNOGYsUUFBUSxHQUFHLENBQUNqNUIsU0FBUyxJQUFJLENBQUNDLE9BQU8sQ0FBQTtBQUN2QyxVQUFBLElBQU1pNUIsYUFBYSxHQUFHbDVCLFNBQVMsSUFBSSxDQUFDQyxPQUFPLENBQUE7QUFDM0MsVUFBQSxJQUFNazVCLGFBQWEsR0FBR241QixTQUFTLElBQUlDLE9BQU8sQ0FBQTtBQUMxQyxVQUFBLElBQUlnNUIsUUFBUSxFQUFFO1lBQ1pqbkIsUUFBUSxDQUFDLENBQUNzRixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtXQUNyQyxNQUFNLElBQUlzb0IsYUFBYSxFQUFFO1lBQ3hCLElBQUk1aEIsV0FBVyxLQUFLLElBQUksRUFBRTtjQUN4QnRGLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRXBCLEtBQUssQ0FBQyxDQUFBO2FBQzlCLE1BQU0sSUFBSUwsWUFBWSxDQUFDK0csV0FBVyxFQUFFdFgsU0FBUyxDQUFDLEVBQUU7QUFDL0MsY0FBQSxJQUFJODRCLFNBQVMsRUFBRTtnQkFDYjltQixRQUFRLENBQUMsQ0FBQ3NGLFdBQVcsRUFBRXRYLFNBQVMsQ0FBQyxFQUFFNFEsS0FBSyxDQUFDLENBQUE7QUFDM0MsZUFBQyxNQUFNO2dCQUNMb0IsUUFBUSxDQUFDLENBQUNzRixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtBQUN0QyxlQUFBO0FBQ0YsYUFBQyxNQUFNO2NBQ0xvQixRQUFRLENBQUMsQ0FBQ2hTLFNBQVMsRUFBRXNYLFdBQVcsQ0FBQyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7QUFDM0MsYUFBQTtBQUNGLFdBQUE7QUFDQSxVQUFBLElBQUl1b0IsYUFBYSxFQUFFO1lBQ2pCbm5CLFFBQVEsQ0FBQyxDQUFDc0YsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7QUFDdEMsV0FBQTtTQUNELE1BQU0sSUFBSXNILGVBQWUsRUFBRTtVQUMxQixJQUFJLEVBQUNDLGFBQWEsS0FBYkEsSUFBQUEsSUFBQUEsYUFBYSxlQUFiQSxhQUFhLENBQUVqWixNQUFNLENBQUUsRUFBQTtBQUMxQjhTLFlBQUFBLFFBQVEsQ0FBQyxDQUFDc0YsV0FBVyxDQUFDLEVBQUUxRyxLQUFLLENBQUMsQ0FBQTtBQUNoQyxXQUFDLE1BQU07QUFDTCxZQUFBLElBQU13b0IsNEJBQTRCLEdBQUdqaEIsYUFBYSxDQUFDeFMsSUFBSSxDQUNyRCxVQUFDMHpCLFlBQVksRUFBQTtBQUFBLGNBQUEsT0FBS3IyQixTQUFTLENBQUNxMkIsWUFBWSxFQUFFL2hCLFdBQVcsQ0FBQyxDQUFBO0FBQUEsYUFDeEQsQ0FBQyxDQUFBO0FBRUQsWUFBQSxJQUFJOGhCLDRCQUE0QixFQUFFO0FBQ2hDLGNBQUEsSUFBTUUsU0FBUyxHQUFHbmhCLGFBQWEsQ0FBQ2pNLE1BQU0sQ0FDcEMsVUFBQ210QixZQUFZLEVBQUE7QUFBQSxnQkFBQSxPQUFLLENBQUNyMkIsU0FBUyxDQUFDcTJCLFlBQVksRUFBRS9oQixXQUFXLENBQUMsQ0FBQTtBQUFBLGVBQ3pELENBQUMsQ0FBQTtBQUVEdEYsY0FBQUEsUUFBUSxDQUFDc25CLFNBQVMsRUFBRTFvQixLQUFLLENBQUMsQ0FBQTtBQUM1QixhQUFDLE1BQU07Y0FDTG9CLFFBQVEsQ0FBQSxFQUFBLENBQUFwUyxNQUFBLENBQUEyTyxrQkFBQSxDQUFLNEosYUFBYSxDQUFFYixFQUFBQSxDQUFBQSxXQUFXLENBQUcxRyxDQUFBQSxFQUFBQSxLQUFLLENBQUMsQ0FBQTtBQUNsRCxhQUFBO0FBQ0YsV0FBQTtBQUNGLFNBQUMsTUFBTTtBQUNMb0IsVUFBQUEsUUFBUSxDQUFDc0YsV0FBVyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7QUFDOUIsU0FBQTtBQUNGLE9BQUE7TUFFQSxJQUFJLENBQUNpb0IsU0FBUyxFQUFFO1FBQ2R4bkIsS0FBQSxDQUFLblIsS0FBSyxDQUFDd1YsUUFBUSxDQUFDNEIsV0FBVyxFQUFFMUcsS0FBSyxDQUFDLENBQUE7UUFDdkNTLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFaWxCLFVBQUFBLFVBQVUsRUFBRSxJQUFBO0FBQUssU0FBQyxDQUFDLENBQUE7QUFDckMsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUVEO0FBQUFwbUIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBQ2tCLGlCQUFBLEVBQUEsVUFBQ2pTLElBQUksRUFBSztNQUMxQixJQUFNbTZCLFVBQVUsR0FBRyxPQUFPbG9CLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQU8sS0FBSyxXQUFXLENBQUE7TUFDNUQsSUFBTTY3QixVQUFVLEdBQUcsT0FBT25vQixLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFPLEtBQUssV0FBVyxDQUFBO01BQzVELElBQUlxMEIsb0JBQW9CLEdBQUcsSUFBSSxDQUFBO0FBQy9CLE1BQUEsSUFBSXI2QixJQUFJLEVBQUU7QUFDUixRQUFBLElBQU1zNkIsY0FBYyxHQUFHaDRCLFVBQVUsQ0FBQ3RDLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLElBQUltNkIsVUFBVSxJQUFJQyxVQUFVLEVBQUU7QUFDNUI7QUFDQUMsVUFBQUEsb0JBQW9CLEdBQUdyMkIsWUFBWSxDQUNqQ2hFLElBQUksRUFDSmlTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQU8sRUFDbEIwVCxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUNiLENBQUMsQ0FBQTtTQUNGLE1BQU0sSUFBSW0wQixVQUFVLEVBQUU7VUFDckIsSUFBTUksaUJBQWlCLEdBQUdqNEIsVUFBVSxDQUFDMlAsS0FBQSxDQUFLblIsS0FBSyxDQUFDdkMsT0FBTyxDQUFDLENBQUE7QUFDeEQ4N0IsVUFBQUEsb0JBQW9CLEdBQ2xCcnFCLE9BQU8sQ0FBQ2hRLElBQUksRUFBRXU2QixpQkFBaUIsQ0FBQyxJQUNoQ3oyQixPQUFPLENBQUN3MkIsY0FBYyxFQUFFQyxpQkFBaUIsQ0FBQyxDQUFBO1NBQzdDLE1BQU0sSUFBSUgsVUFBVSxFQUFFO1VBQ3JCLElBQU1JLGVBQWUsR0FBR3AyQixRQUFRLENBQUM2TixLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFPLENBQUMsQ0FBQTtBQUNwRHEwQixVQUFBQSxvQkFBb0IsR0FDbEJuNkIsUUFBUSxDQUFDRixJQUFJLEVBQUV3NkIsZUFBZSxDQUFDLElBQy9CMTJCLE9BQU8sQ0FBQ3cyQixjQUFjLEVBQUVFLGVBQWUsQ0FBQyxDQUFBO0FBQzVDLFNBQUE7QUFDRixPQUFBO0FBQ0EsTUFBQSxJQUFJSCxvQkFBb0IsRUFBRTtRQUN4QnBvQixLQUFBLENBQUtzQixRQUFRLENBQUM7QUFDWjJGLFVBQUFBLFlBQVksRUFBRWxaLElBQUFBO0FBQ2hCLFNBQUMsQ0FBQyxDQUFBO0FBQ0osT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBb1MsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtNQUNyQkEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLENBQUN0RSxLQUFBLENBQUtNLEtBQUssQ0FBQzZpQixJQUFJLENBQUMsQ0FBQTtLQUMvQixDQUFBLENBQUE7QUFBQWhqQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFa0Isa0JBQUEsRUFBQSxVQUFDckosSUFBSSxFQUFLO0FBQzNCLE1BQUEsSUFBTXFRLFFBQVEsR0FBR2hILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsR0FDaENoSCxLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLEdBQ25CaEgsS0FBQSxDQUFLd2xCLGVBQWUsRUFBRSxDQUFBO0FBQzFCLE1BQUEsSUFBSXZmLFdBQVcsR0FBR2pHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsR0FDakNyUSxJQUFJLEdBQ0p0SCxPQUFPLENBQUMyWCxRQUFRLEVBQUU7QUFDaEJ4WCxRQUFBQSxJQUFJLEVBQUVzSCxRQUFRLENBQUNILElBQUksQ0FBQztRQUNwQmpILE1BQU0sRUFBRXFILFVBQVUsQ0FBQ0osSUFBSSxDQUFBO0FBQ3pCLE9BQUMsQ0FBQyxDQUFBO01BRU5xSixLQUFBLENBQUtzQixRQUFRLENBQUM7QUFDWjJGLFFBQUFBLFlBQVksRUFBRWhCLFdBQUFBO0FBQ2hCLE9BQUMsQ0FBQyxDQUFBO0FBRUZqRyxNQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUM4UixRQUFRLENBQUNzRixXQUFXLENBQUMsQ0FBQTtBQUNoQyxNQUFBLElBQUlqRyxLQUFBLENBQUtuUixLQUFLLENBQUMwZSxtQkFBbUIsRUFBRTtRQUNsQ3ZOLEtBQUEsQ0FBS3NuQixvQkFBb0IsRUFBRSxDQUFBO0FBQzNCdG5CLFFBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNyQixPQUFBO0FBQ0EsTUFBQSxJQUFJdEUsS0FBQSxDQUFLblIsS0FBSyxDQUFDeXdCLGFBQWEsRUFBRTtBQUM1QnRmLFFBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNwQixPQUFBO01BQ0EsSUFBSXRFLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29uQixrQkFBa0IsSUFBSWpXLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFjLEVBQUU7UUFDOUQ5YixLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRTRZLFVBQUFBLHVCQUF1QixFQUFFLElBQUE7QUFBSyxTQUFDLENBQUMsQ0FBQTtBQUNsRCxPQUFBO01BQ0FsYSxLQUFBLENBQUtzQixRQUFRLENBQUM7QUFBRWlsQixRQUFBQSxVQUFVLEVBQUUsSUFBQTtBQUFLLE9BQUMsQ0FBQyxDQUFBO0tBQ3BDLENBQUEsQ0FBQTtJQUFBcG1CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLGNBQUEsRUFFYyxZQUFNO0FBQ25CLE1BQUEsSUFBSSxDQUFDQSxLQUFBLENBQUtuUixLQUFLLENBQUNpekIsUUFBUSxJQUFJLENBQUM5aEIsS0FBQSxDQUFLblIsS0FBSyxDQUFDMjNCLFFBQVEsRUFBRTtBQUNoRHhtQixRQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEIsT0FBQTtBQUVBdEUsTUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDMjVCLFlBQVksRUFBRSxDQUFBO0tBQzFCLENBQUEsQ0FBQTtBQUFBcm9CLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUVnQixnQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztBQUMxQlMsTUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDa2QsU0FBUyxDQUFDeE0sS0FBSyxDQUFDLENBQUE7QUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDN0QsR0FBRyxDQUFBO01BRTFCLElBQ0UsQ0FBQ3NFLEtBQUEsQ0FBS00sS0FBSyxDQUFDNmlCLElBQUksSUFDaEIsQ0FBQ25qQixLQUFBLENBQUtuUixLQUFLLENBQUNzYyxNQUFNLElBQ2xCLENBQUNuTCxLQUFBLENBQUtuUixLQUFLLENBQUM0M0Isa0JBQWtCLEVBQzlCO1FBQ0EsSUFDRW5nQixRQUFRLEtBQUssV0FBVyxJQUN4QkEsUUFBUSxLQUFLLFNBQVMsSUFDdEJBLFFBQVEsS0FBSyxPQUFPLEVBQ3BCO1VBQ0F0RyxLQUFBLENBQUt3b0IsWUFBWSxFQUFFLENBQUE7QUFDckIsU0FBQTtBQUNBLFFBQUEsT0FBQTtBQUNGLE9BQUE7O0FBRUE7QUFDQSxNQUFBLElBQUl4b0IsS0FBQSxDQUFLTSxLQUFLLENBQUM2aUIsSUFBSSxFQUFFO0FBQ25CLFFBQUEsSUFBSTdjLFFBQVEsS0FBSyxXQUFXLElBQUlBLFFBQVEsS0FBSyxTQUFTLEVBQUU7VUFDdEQvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtBQUN0QixVQUFBLElBQU1raUIsY0FBYyxHQUNsQnpvQixLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFjLElBQUlsSCxLQUFBLENBQUtuUixLQUFLLENBQUM4Z0IsZUFBZSxHQUNuRCw4Q0FBOEMsR0FDOUMsc0NBQXNDLENBQUE7QUFDNUMsVUFBQSxJQUFNK1ksWUFBWSxHQUNoQjFvQixLQUFBLENBQUsyb0IsUUFBUSxDQUFDQyxhQUFhLElBQzNCNW9CLEtBQUEsQ0FBSzJvQixRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsYUFBYSxDQUFDSixjQUFjLENBQUMsQ0FBQTtBQUMzREMsVUFBQUEsWUFBWSxJQUFJQSxZQUFZLENBQUMvYyxLQUFLLENBQUM7QUFBRUMsWUFBQUEsYUFBYSxFQUFFLElBQUE7QUFBSyxXQUFDLENBQUMsQ0FBQTtBQUUzRCxVQUFBLE9BQUE7QUFDRixTQUFBO1FBRUEsSUFBTWtkLElBQUksR0FBR3A5QixPQUFPLENBQUNzVSxLQUFBLENBQUtNLEtBQUssQ0FBQzJHLFlBQVksQ0FBQyxDQUFBO1FBQzdDLElBQUlYLFFBQVEsS0FBSyxPQUFPLEVBQUU7VUFDeEIvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtBQUN0QixVQUFBLElBQ0V2RyxLQUFBLENBQUsrb0IsT0FBTyxFQUFFLElBQ2Qvb0IsS0FBQSxDQUFLTSxLQUFLLENBQUM4bEIsbUJBQW1CLEtBQUtDLDZCQUE2QixFQUNoRTtBQUNBcm1CLFlBQUFBLEtBQUEsQ0FBS2dwQixZQUFZLENBQUNGLElBQUksRUFBRXZwQixLQUFLLENBQUMsQ0FBQTtZQUM5QixDQUFDUyxLQUFBLENBQUtuUixLQUFLLENBQUMwZSxtQkFBbUIsSUFBSXZOLEtBQUEsQ0FBS2tRLGVBQWUsQ0FBQzRZLElBQUksQ0FBQyxDQUFBO0FBQy9ELFdBQUMsTUFBTTtBQUNMOW9CLFlBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNyQixXQUFBO0FBQ0YsU0FBQyxNQUFNLElBQUlnQyxRQUFRLEtBQUssUUFBUSxFQUFFO1VBQ2hDL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7VUFDdEJ2RyxLQUFBLENBQUtzbkIsb0JBQW9CLEVBQUUsQ0FBQTtBQUMzQnRuQixVQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDckIsU0FBQyxNQUFNLElBQUlnQyxRQUFRLEtBQUssS0FBSyxFQUFFO0FBQzdCdEcsVUFBQUEsS0FBQSxDQUFLc0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3JCLFNBQUE7QUFFQSxRQUFBLElBQUksQ0FBQ3RFLEtBQUEsQ0FBSytvQixPQUFPLEVBQUUsRUFBRTtBQUNuQi9vQixVQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNvNkIsWUFBWSxDQUFDO0FBQUVDLFlBQUFBLElBQUksRUFBRSxDQUFDO0FBQUVDLFlBQUFBLEdBQUcsRUFBRWhFLFdBQUFBO0FBQVksV0FBQyxDQUFDLENBQUE7QUFDeEQsU0FBQTtBQUNGLE9BQUE7S0FDRCxDQUFBLENBQUE7QUFBQWhsQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFaUIsaUJBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7QUFDM0IsTUFBQSxJQUFNK0csUUFBUSxHQUFHL0csS0FBSyxDQUFDN0QsR0FBRyxDQUFBO01BQzFCLElBQUk0SyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ3pCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7UUFDdEJ2RyxLQUFBLENBQUtzQixRQUFRLENBQ1g7QUFDRXFrQixVQUFBQSxZQUFZLEVBQUUsSUFBQTtBQUNoQixTQUFDLEVBQ0QsWUFBTTtBQUNKM2xCLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNuQnFpQixVQUFBQSxVQUFVLENBQUMsWUFBTTtZQUNmM21CLEtBQUEsQ0FBSzRtQixRQUFRLEVBQUUsQ0FBQTtZQUNmNW1CLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFcWtCLGNBQUFBLFlBQVksRUFBRSxLQUFBO0FBQU0sYUFBQyxDQUFDLENBQUE7QUFDeEMsV0FBQyxDQUFDLENBQUE7QUFDSixTQUNGLENBQUMsQ0FBQTtBQUNILE9BQUE7S0FDRCxDQUFBLENBQUE7QUFFRDtBQUFBeGxCLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUNlLGNBQUEsRUFBQSxVQUFDVCxLQUFLLEVBQUs7QUFDeEJTLE1BQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2tkLFNBQVMsQ0FBQ3hNLEtBQUssQ0FBQyxDQUFBO0FBQzNCLE1BQUEsSUFBTStHLFFBQVEsR0FBRy9HLEtBQUssQ0FBQzdELEdBQUcsQ0FBQTtBQUMxQixNQUFBLElBQU0wdEIsZ0JBQWdCLEdBQUc3cEIsS0FBSyxDQUFDOHBCLFFBQVEsQ0FBQTtNQUV2QyxJQUFNUCxJQUFJLEdBQUdwOUIsT0FBTyxDQUFDc1UsS0FBQSxDQUFLTSxLQUFLLENBQUMyRyxZQUFZLENBQUMsQ0FBQTtNQUM3QyxJQUFJWCxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQ3hCL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7QUFDdEJ2RyxRQUFBQSxLQUFBLENBQUtncEIsWUFBWSxDQUFDRixJQUFJLEVBQUV2cEIsS0FBSyxDQUFDLENBQUE7UUFDOUIsQ0FBQ1MsS0FBQSxDQUFLblIsS0FBSyxDQUFDMGUsbUJBQW1CLElBQUl2TixLQUFBLENBQUtrUSxlQUFlLENBQUM0WSxJQUFJLENBQUMsQ0FBQTtBQUMvRCxPQUFDLE1BQU0sSUFBSXhpQixRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2hDL0csS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7QUFFdEJ2RyxRQUFBQSxLQUFBLENBQUtzRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbkIsUUFBQSxJQUFJLENBQUN0RSxLQUFBLENBQUsrb0IsT0FBTyxFQUFFLEVBQUU7QUFDbkIvb0IsVUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDbzZCLFlBQVksQ0FBQztBQUFFQyxZQUFBQSxJQUFJLEVBQUUsQ0FBQztBQUFFQyxZQUFBQSxHQUFHLEVBQUVoRSxXQUFBQTtBQUFZLFdBQUMsQ0FBQyxDQUFBO0FBQ3hELFNBQUE7T0FDRCxNQUFNLElBQUksQ0FBQ25sQixLQUFBLENBQUtuUixLQUFLLENBQUM4WCwwQkFBMEIsRUFBRTtBQUNqRCxRQUFBLElBQUkyaUIsWUFBWSxDQUFBO0FBQ2hCLFFBQUEsUUFBUWhqQixRQUFRO0FBQ2QsVUFBQSxLQUFLLFdBQVc7QUFDZCxZQUFBLElBQUl0RyxLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFjLEVBQUU7QUFDN0JvaUIsY0FBQUEsWUFBWSxHQUFHQyxRQUFRLENBQUNULElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNsQyxhQUFDLE1BQU07QUFDTFEsY0FBQUEsWUFBWSxHQUFHRSxPQUFPLENBQUNWLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqQyxhQUFBO0FBQ0EsWUFBQSxNQUFBO0FBQ0YsVUFBQSxLQUFLLFlBQVk7QUFDZixZQUFBLElBQUk5b0IsS0FBQSxDQUFLblIsS0FBSyxDQUFDcVksY0FBYyxFQUFFO0FBQzdCb2lCLGNBQUFBLFlBQVksR0FBR0csUUFBUSxDQUFDWCxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDbEMsYUFBQyxNQUFNO0FBQ0xRLGNBQUFBLFlBQVksR0FBR3piLE9BQU8sQ0FBQ2liLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqQyxhQUFBO0FBQ0EsWUFBQSxNQUFBO0FBQ0YsVUFBQSxLQUFLLFNBQVM7QUFDWlEsWUFBQUEsWUFBWSxHQUFHQyxRQUFRLENBQUNULElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNoQyxZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssV0FBVztBQUNkUSxZQUFBQSxZQUFZLEdBQUdHLFFBQVEsQ0FBQ1gsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ2hDLFlBQUEsTUFBQTtBQUNGLFVBQUEsS0FBSyxRQUFRO0FBQ1hRLFlBQUFBLFlBQVksR0FBR0YsZ0JBQWdCLEdBQzNCOXZCLFFBQVEsQ0FBQ3d2QixJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQ2pCN3dCLFNBQVMsQ0FBQzZ3QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDdEIsWUFBQSxNQUFBO0FBQ0YsVUFBQSxLQUFLLFVBQVU7QUFDYlEsWUFBQUEsWUFBWSxHQUFHRixnQkFBZ0IsR0FDM0JqdkIsUUFBUSxDQUFDMnVCLElBQUksRUFBRSxDQUFDLENBQUMsR0FDakJ2d0IsU0FBUyxDQUFDdXdCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN0QixZQUFBLE1BQUE7QUFDRixVQUFBLEtBQUssTUFBTTtBQUNUUSxZQUFBQSxZQUFZLEdBQUdoNUIsY0FBYyxDQUMzQnc0QixJQUFJLEVBQ0o5b0IsS0FBQSxDQUFLblIsS0FBSyxDQUFDekMsTUFBTSxFQUNqQjRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBCLGdCQUNiLENBQUMsQ0FBQTtBQUNELFlBQUEsTUFBQTtBQUNGLFVBQUEsS0FBSyxLQUFLO0FBQ1IrNEIsWUFBQUEsWUFBWSxHQUFHcjRCLFlBQVksQ0FBQzYzQixJQUFJLENBQUMsQ0FBQTtBQUNqQyxZQUFBLE1BQUE7QUFDRixVQUFBO0FBQ0VRLFlBQUFBLFlBQVksR0FBRyxJQUFJLENBQUE7QUFDbkIsWUFBQSxNQUFBO0FBQ0osU0FBQTtRQUNBLElBQUksQ0FBQ0EsWUFBWSxFQUFFO0FBQ2pCLFVBQUEsSUFBSXRwQixLQUFBLENBQUtuUixLQUFLLENBQUNvNkIsWUFBWSxFQUFFO0FBQzNCanBCLFlBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ282QixZQUFZLENBQUM7QUFBRUMsY0FBQUEsSUFBSSxFQUFFLENBQUM7QUFBRUMsY0FBQUEsR0FBRyxFQUFFaEUsV0FBQUE7QUFBWSxhQUFDLENBQUMsQ0FBQTtBQUN4RCxXQUFBO0FBQ0EsVUFBQSxPQUFBO0FBQ0YsU0FBQTtRQUNBNWxCLEtBQUssQ0FBQ2dILGNBQWMsRUFBRSxDQUFBO1FBQ3RCdkcsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQUU4a0IsVUFBQUEsbUJBQW1CLEVBQUVDLDZCQUFBQTtBQUE4QixTQUFDLENBQUMsQ0FBQTtBQUNyRSxRQUFBLElBQUlybUIsS0FBQSxDQUFLblIsS0FBSyxDQUFDc1Ysa0JBQWtCLEVBQUU7QUFDakNuRSxVQUFBQSxLQUFBLENBQUtxbkIsV0FBVyxDQUFDaUMsWUFBWSxDQUFDLENBQUE7QUFDaEMsU0FBQTtBQUNBdHBCLFFBQUFBLEtBQUEsQ0FBS2tRLGVBQWUsQ0FBQ29aLFlBQVksQ0FBQyxDQUFBO0FBQ2xDO0FBQ0EsUUFBQSxJQUFJdHBCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NjLE1BQU0sRUFBRTtBQUNyQixVQUFBLElBQU11ZSxTQUFTLEdBQUdwMEIsUUFBUSxDQUFDd3pCLElBQUksQ0FBQyxDQUFBO0FBQ2hDLFVBQUEsSUFBTTdZLFFBQVEsR0FBRzNhLFFBQVEsQ0FBQ2cwQixZQUFZLENBQUMsQ0FBQTtBQUN2QyxVQUFBLElBQU1LLFFBQVEsR0FBR3YwQixPQUFPLENBQUMwekIsSUFBSSxDQUFDLENBQUE7QUFDOUIsVUFBQSxJQUFNbHBCLE9BQU8sR0FBR3hLLE9BQU8sQ0FBQ2swQixZQUFZLENBQUMsQ0FBQTtBQUVyQyxVQUFBLElBQUlJLFNBQVMsS0FBS3paLFFBQVEsSUFBSTBaLFFBQVEsS0FBSy9wQixPQUFPLEVBQUU7QUFDbEQ7WUFDQUksS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQUU4SixjQUFBQSxvQkFBb0IsRUFBRSxJQUFBO0FBQUssYUFBQyxDQUFDLENBQUE7QUFDL0MsV0FBQyxNQUFNO0FBQ0w7WUFDQXBMLEtBQUEsQ0FBS3NCLFFBQVEsQ0FBQztBQUFFOEosY0FBQUEsb0JBQW9CLEVBQUUsS0FBQTtBQUFNLGFBQUMsQ0FBQyxDQUFBO0FBQ2hELFdBQUE7QUFDRixTQUFBO0FBQ0YsT0FBQTtLQUNELENBQUEsQ0FBQTtBQUVEO0FBQ0E7QUFBQWpMLElBQUFBLGVBQUEsQ0FBQUgsS0FBQSxFQUNrQixpQkFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztBQUMzQixNQUFBLElBQU0rRyxRQUFRLEdBQUcvRyxLQUFLLENBQUM3RCxHQUFHLENBQUE7TUFDMUIsSUFBSTRLLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDekIvRyxLQUFLLENBQUNnSCxjQUFjLEVBQUUsQ0FBQTtRQUN0QnZHLEtBQUEsQ0FBS3NuQixvQkFBb0IsRUFBRSxDQUFBO0FBQzdCLE9BQUE7S0FDRCxDQUFBLENBQUE7QUFBQW5uQixJQUFBQSxlQUFBLENBQUFILEtBQUEsRUFFYyxjQUFBLEVBQUEsVUFBQ1QsS0FBSyxFQUFLO0FBQ3hCLE1BQUEsSUFBSUEsS0FBSyxFQUFFO1FBQ1QsSUFBSUEsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFO1VBQ3hCaEgsS0FBSyxDQUFDZ0gsY0FBYyxFQUFFLENBQUE7QUFDeEIsU0FBQTtBQUNGLE9BQUE7TUFFQXZHLEtBQUEsQ0FBS3NuQixvQkFBb0IsRUFBRSxDQUFBO0FBRTNCLE1BQUEsSUFBSXRuQixLQUFBLENBQUtuUixLQUFLLENBQUNpWixZQUFZLEVBQUU7QUFDM0I5SCxRQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUM4UixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUVwQixLQUFLLENBQUMsQ0FBQTtBQUMxQyxPQUFDLE1BQU07UUFDTFMsS0FBQSxDQUFLblIsS0FBSyxDQUFDOFIsUUFBUSxDQUFDLElBQUksRUFBRXBCLEtBQUssQ0FBQyxDQUFBO0FBQ2xDLE9BQUE7TUFDQVMsS0FBQSxDQUFLc0IsUUFBUSxDQUFDO0FBQUVpbEIsUUFBQUEsVUFBVSxFQUFFLElBQUE7QUFBSyxPQUFDLENBQUMsQ0FBQTtLQUNwQyxDQUFBLENBQUE7SUFBQXBtQixlQUFBLENBQUFILEtBQUEsRUFBQSxPQUFBLEVBRU8sWUFBTTtNQUNaQSxLQUFBLENBQUs0cEIsWUFBWSxFQUFFLENBQUE7S0FDcEIsQ0FBQSxDQUFBO0FBQUF6cEIsSUFBQUEsZUFBQSxDQUFBSCxLQUFBLEVBRVUsVUFBQSxFQUFBLFVBQUNULEtBQUssRUFBSztBQUNwQixNQUFBLElBQ0UsT0FBT1MsS0FBQSxDQUFLblIsS0FBSyxDQUFDZzdCLGFBQWEsS0FBSyxTQUFTLElBQzdDN3BCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2c3QixhQUFhLEVBQ3hCO1FBQ0EsSUFDRXRxQixLQUFLLENBQUNrRSxNQUFNLEtBQUt1SCxRQUFRLElBQ3pCekwsS0FBSyxDQUFDa0UsTUFBTSxLQUFLdUgsUUFBUSxDQUFDOGUsZUFBZSxJQUN6Q3ZxQixLQUFLLENBQUNrRSxNQUFNLEtBQUt1SCxRQUFRLENBQUNFLElBQUksRUFDOUI7QUFDQWxMLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNyQixTQUFBO09BQ0QsTUFBTSxJQUFJLE9BQU90RSxLQUFBLENBQUtuUixLQUFLLENBQUNnN0IsYUFBYSxLQUFLLFVBQVUsRUFBRTtRQUN6RCxJQUFJN3BCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2c3QixhQUFhLENBQUN0cUIsS0FBSyxDQUFDLEVBQUU7QUFDbkNTLFVBQUFBLEtBQUEsQ0FBS3NFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNyQixTQUFBO0FBQ0YsT0FBQTtLQUNELENBQUEsQ0FBQTtJQUFBbkUsZUFBQSxDQUFBSCxLQUFBLEVBQUEsZ0JBQUEsRUFFZ0IsWUFBTTtBQUNyQixNQUFBLElBQUksQ0FBQ0EsS0FBQSxDQUFLblIsS0FBSyxDQUFDc2MsTUFBTSxJQUFJLENBQUNuTCxLQUFBLENBQUsrcEIsY0FBYyxFQUFFLEVBQUU7QUFDaEQsUUFBQSxPQUFPLElBQUksQ0FBQTtBQUNiLE9BQUE7QUFDQSxNQUFBLG9CQUNFdnBCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDd2tCLGVBQWUsRUFBQTtBQUNkbmlCLFFBQUFBLEdBQUcsRUFBRSxTQUFBQSxHQUFDa25CLENBQUFBLElBQUksRUFBSztVQUNiaHFCLEtBQUEsQ0FBSzJvQixRQUFRLEdBQUdxQixJQUFJLENBQUE7U0FDcEI7QUFDRjU5QixRQUFBQSxNQUFNLEVBQUU0VCxLQUFBLENBQUtuUixLQUFLLENBQUN6QyxNQUFPO0FBQzFCbUUsUUFBQUEsZ0JBQWdCLEVBQUV5UCxLQUFBLENBQUtuUixLQUFLLENBQUMwQixnQkFBaUI7QUFDOUN1ZCxRQUFBQSx3QkFBd0IsRUFBRTlOLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2lmLHdCQUF5QjtBQUM5REMsUUFBQUEsMEJBQTBCLEVBQUUvTixLQUFBLENBQUtuUixLQUFLLENBQUNrZiwwQkFBMkI7QUFDbEUyQixRQUFBQSxtQkFBbUIsRUFBRTFQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzZnQixtQkFBb0I7QUFDcERpUCxRQUFBQSxvQkFBb0IsRUFBRTNlLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzh2QixvQkFBcUI7QUFDdER4YSxRQUFBQSxrQkFBa0IsRUFBRW5FLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NWLGtCQUFtQjtRQUNsREcsT0FBTyxFQUFFdEUsS0FBQSxDQUFLc0UsT0FBUTtBQUN0QmlKLFFBQUFBLG1CQUFtQixFQUFFdk4sS0FBQSxDQUFLblIsS0FBSyxDQUFDMGUsbUJBQW9CO0FBQ3BEcGhCLFFBQUFBLFVBQVUsRUFBRTZULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ283QixrQkFBbUI7QUFDMUNyUCxRQUFBQSxnQkFBZ0IsRUFBRTVhLEtBQUEsQ0FBS25SLEtBQUssQ0FBQytyQixnQkFBaUI7QUFDOUNELFFBQUFBLGFBQWEsRUFBRTNhLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhyQixhQUFjO0FBQ3hDblcsUUFBQUEsWUFBWSxFQUFFeEUsS0FBQSxDQUFLblIsS0FBSyxDQUFDMlYsWUFBYTtBQUN0Q3dDLFFBQUFBLFFBQVEsRUFBRWhILEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVM7QUFDOUJDLFFBQUFBLFlBQVksRUFBRWpILEtBQUEsQ0FBS00sS0FBSyxDQUFDMkcsWUFBYTtRQUN0QzVDLFFBQVEsRUFBRXJFLEtBQUEsQ0FBS2dwQixZQUFhO0FBQzVCM2IsUUFBQUEsWUFBWSxFQUFFck4sS0FBQSxDQUFLblIsS0FBSyxDQUFDd2UsWUFBYTtBQUN0QzZILFFBQUFBLFVBQVUsRUFBRWxWLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FtQixVQUFXO0FBQ2xDNW9CLFFBQUFBLE9BQU8sRUFBRTBULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3ZDLE9BQVE7QUFDNUJ5SCxRQUFBQSxPQUFPLEVBQUVpTSxLQUFBLENBQUtuUixLQUFLLENBQUNrRixPQUFRO0FBQzVCNlQsUUFBQUEsWUFBWSxFQUFFNUgsS0FBQSxDQUFLblIsS0FBSyxDQUFDK1ksWUFBYTtBQUN0Q0MsUUFBQUEsVUFBVSxFQUFFN0gsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ1osVUFBVztBQUNsQ0MsUUFBQUEsWUFBWSxFQUFFOUgsS0FBQSxDQUFLblIsS0FBSyxDQUFDaVosWUFBYTtBQUN0Q2pCLFFBQUFBLGVBQWUsRUFBRTdHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2dZLGVBQWdCO0FBQzVDQyxRQUFBQSxhQUFhLEVBQUU5RyxLQUFBLENBQUtuUixLQUFLLENBQUNpWSxhQUFjO0FBQ3hDblksUUFBQUEsU0FBUyxFQUFFcVIsS0FBQSxDQUFLblIsS0FBSyxDQUFDRixTQUFVO0FBQ2hDQyxRQUFBQSxPQUFPLEVBQUVvUixLQUFBLENBQUtuUixLQUFLLENBQUNELE9BQVE7QUFDNUJvRixRQUFBQSxZQUFZLEVBQUVnTSxLQUFBLENBQUtuUixLQUFLLENBQUNtRixZQUFhO0FBQ3RDQyxRQUFBQSxvQkFBb0IsRUFBRStMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29GLG9CQUFxQjtBQUN0REcsUUFBQUEsVUFBVSxFQUFFNEwsS0FBQSxDQUFLblIsS0FBSyxDQUFDdUYsVUFBVztRQUNsQzhPLGNBQWMsRUFBRWxELEtBQUEsQ0FBS2txQiwwQkFBMkI7QUFDaEQxYyxRQUFBQSxnQkFBZ0IsRUFBRXhOLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJlLGdCQUFpQjtBQUM5Q3RTLFFBQUFBLGNBQWMsRUFBRThFLEtBQUEsQ0FBS00sS0FBSyxDQUFDcEYsY0FBZTtRQUMxQ3FNLFFBQVEsRUFBRTVLLGNBQWMsQ0FBQ3FELEtBQUEsQ0FBS21xQixjQUFjLEVBQUUsQ0FBRTtBQUNoRGoyQixRQUFBQSxZQUFZLEVBQUU4TCxLQUFBLENBQUtuUixLQUFLLENBQUNxRixZQUFhO0FBQ3RDQyxRQUFBQSxvQkFBb0IsRUFBRTZMLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NGLG9CQUFxQjtBQUN0RGdELFFBQUFBLFlBQVksRUFBRTZJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NJLFlBQWE7QUFDdEMyZCxRQUFBQSxXQUFXLEVBQUU5VSxLQUFBLENBQUtuUixLQUFLLENBQUNpbUIsV0FBWTtBQUNwQzNKLFFBQUFBLE1BQU0sRUFBRW5MLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3NjLE1BQU87QUFDMUJDLFFBQUFBLG9CQUFvQixFQUFFcEwsS0FBQSxDQUFLTSxLQUFLLENBQUM4SyxvQkFBcUI7QUFDdEQyRSxRQUFBQSxhQUFhLEVBQUUvUCxLQUFBLENBQUtuUixLQUFLLENBQUNraEIsYUFBYztBQUN4Q3lNLFFBQUFBLGlCQUFpQixFQUFFeGMsS0FBQSxDQUFLblIsS0FBSyxDQUFDMnRCLGlCQUFrQjtBQUNoRDRCLFFBQUFBLGtCQUFrQixFQUFFcGUsS0FBQSxDQUFLblIsS0FBSyxDQUFDdXZCLGtCQUFtQjtBQUNsRGxaLFFBQUFBLHVCQUF1QixFQUFFbEYsS0FBQSxDQUFLblIsS0FBSyxDQUFDcVcsdUJBQXdCO0FBQzVEdVgsUUFBQUEscUJBQXFCLEVBQUV6YyxLQUFBLENBQUtuUixLQUFLLENBQUM0dEIscUJBQXNCO0FBQ3hEOU0sUUFBQUEsZUFBZSxFQUFFM1AsS0FBQSxDQUFLblIsS0FBSyxDQUFDOGdCLGVBQWdCO0FBQzVDNE0sUUFBQUEsZ0JBQWdCLEVBQUV2YyxLQUFBLENBQUtuUixLQUFLLENBQUMwdEIsZ0JBQWlCO0FBQzlDNEMsUUFBQUEsVUFBVSxFQUFFbmYsS0FBQSxDQUFLblIsS0FBSyxDQUFDc3dCLFVBQVc7QUFDbENuRSxRQUFBQSx3QkFBd0IsRUFBRWhiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21zQix3QkFBeUI7QUFDOURDLFFBQUFBLDJCQUEyQixFQUFFamIsS0FBQSxDQUFLblIsS0FBSyxDQUFDb3NCLDJCQUE0QjtBQUNwRXhaLFFBQUFBLHNCQUFzQixFQUFFekIsS0FBQSxDQUFLblIsS0FBSyxDQUFDNFMsc0JBQXVCO0FBQzFEbUUsUUFBQUEsMkJBQTJCLEVBQUU1RixLQUFBLENBQUtuUixLQUFLLENBQUMrVywyQkFBNEI7QUFDcEVvUSxRQUFBQSxXQUFXLEVBQUVoVyxLQUFBLENBQUtuUixLQUFLLENBQUNtbkIsV0FBWTtBQUNwQ3VFLFFBQUFBLFNBQVMsRUFBRXZhLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzByQixTQUFVO0FBQ2hDeUssUUFBQUEsdUJBQXVCLEVBQUVBLHVCQUF3QjtBQUNqRHpWLFFBQUFBLFdBQVcsRUFBRXZQLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBnQixXQUFZO0FBQ3BDOE8sUUFBQUEsV0FBVyxFQUFFcmUsS0FBQSxDQUFLblIsS0FBSyxDQUFDd3ZCLFdBQVk7QUFDcEN2RSxRQUFBQSxlQUFlLEVBQUU5WixLQUFBLENBQUtNLEtBQUssQ0FBQ3daLGVBQWdCO1FBQzVDSCxlQUFlLEVBQUUzWixLQUFBLENBQUtrZCxtQkFBb0I7QUFDMUM5QyxRQUFBQSxhQUFhLEVBQUVwYSxLQUFBLENBQUtuUixLQUFLLENBQUN1ckIsYUFBYztBQUN4Q0gsUUFBQUEsWUFBWSxFQUFFamEsS0FBQSxDQUFLblIsS0FBSyxDQUFDb3JCLFlBQWE7QUFDdEN0UixRQUFBQSxZQUFZLEVBQUUzSSxLQUFBLENBQUtuUixLQUFLLENBQUM4WixZQUFhO0FBQ3RDK1IsUUFBQUEsZ0JBQWdCLEVBQUUxYSxLQUFBLENBQUtuUixLQUFLLENBQUM2ckIsZ0JBQWlCO0FBQzlDNUosUUFBQUEsY0FBYyxFQUFFOVEsS0FBQSxDQUFLblIsS0FBSyxDQUFDaWlCLGNBQWU7QUFDMUM2RCxRQUFBQSxhQUFhLEVBQUUzVSxLQUFBLENBQUtuUixLQUFLLENBQUM4bEIsYUFBYztBQUN4QzRTLFFBQUFBLGNBQWMsRUFBRXZuQixLQUFBLENBQUtuUixLQUFLLENBQUMwNEIsY0FBZTtBQUMxQ3pMLFFBQUFBLGNBQWMsRUFBRTliLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2l0QixjQUFlO0FBQzFDN0YsUUFBQUEsa0JBQWtCLEVBQUVqVyxLQUFBLENBQUtuUixLQUFLLENBQUNvbkIsa0JBQW1CO1FBQ2xERyxZQUFZLEVBQUVwVyxLQUFBLENBQUtvcUIsZ0JBQWlCO0FBQ3BDbkwsUUFBQUEsVUFBVSxFQUFFamYsS0FBQSxDQUFLblIsS0FBSyxDQUFDb3dCLFVBQVc7QUFDbENDLFFBQUFBLGFBQWEsRUFBRWxmLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3F3QixhQUFjO0FBQ3hDM25CLFFBQUFBLE9BQU8sRUFBRXlJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzBJLE9BQVE7QUFDNUJDLFFBQUFBLE9BQU8sRUFBRXdJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJJLE9BQVE7QUFDNUJOLFFBQUFBLFlBQVksRUFBRThJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FJLFlBQWE7QUFDdENFLFFBQUFBLFVBQVUsRUFBRTRJLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3VJLFVBQVc7QUFDbEM4ZSxRQUFBQSxXQUFXLEVBQUVsVyxLQUFBLENBQUtuUixLQUFLLENBQUNxbkIsV0FBWTtBQUNwQy9aLFFBQUFBLFNBQVMsRUFBRTZELEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3c3QixpQkFBa0I7QUFDeEN2SyxRQUFBQSxTQUFTLEVBQUU5ZixLQUFBLENBQUtuUixLQUFLLENBQUN5N0IsaUJBQWtCO0FBQ3hDM3dCLFFBQUFBLGNBQWMsRUFBRXFHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhLLGNBQWU7QUFDMUM2SCxRQUFBQSxzQkFBc0IsRUFBRXhCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJTLHNCQUF1QjtBQUMxRGthLFFBQUFBLHNCQUFzQixFQUFFMWIsS0FBQSxDQUFLblIsS0FBSyxDQUFDNnNCLHNCQUF1QjtBQUMxREgsUUFBQUEsd0JBQXdCLEVBQUV2YixLQUFBLENBQUtuUixLQUFLLENBQUMwc0Isd0JBQXlCO0FBQzlEYSxRQUFBQSxrQkFBa0IsRUFBRXBjLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3V0QixrQkFBbUI7QUFDbERILFFBQUFBLG9CQUFvQixFQUFFamMsS0FBQSxDQUFLblIsS0FBSyxDQUFDb3RCLG9CQUFxQjtBQUN0REwsUUFBQUEscUJBQXFCLEVBQUU1YixLQUFBLENBQUtuUixLQUFLLENBQUMrc0IscUJBQXNCO0FBQ3hESixRQUFBQSx1QkFBdUIsRUFBRXhiLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzJzQix1QkFBd0I7QUFDNURjLFFBQUFBLGlCQUFpQixFQUFFdGMsS0FBQSxDQUFLblIsS0FBSyxDQUFDeXRCLGlCQUFrQjtBQUNoREosUUFBQUEsbUJBQW1CLEVBQUVsYyxLQUFBLENBQUtuUixLQUFLLENBQUNxdEIsbUJBQW9CO0FBQ3BEdEQsUUFBQUEsY0FBYyxFQUFFNVksS0FBQSxDQUFLblIsS0FBSyxDQUFDK3BCLGNBQWU7QUFDMUNqUyxRQUFBQSwwQkFBMEIsRUFBRTNHLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzhYLDBCQUEyQjtBQUNsRW1VLFFBQUFBLGtCQUFrQixFQUFFOWEsS0FBQSxDQUFLblIsS0FBSyxDQUFDaXNCLGtCQUFtQjtBQUNsRCtILFFBQUFBLFdBQVcsRUFBRTdpQixLQUFBLENBQUtuUixLQUFLLENBQUNnMEIsV0FBWTtBQUNwQ2hYLFFBQUFBLGlCQUFpQixFQUFFN0wsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ2QsaUJBQWtCO0FBQ2hEb0csUUFBQUEsa0JBQWtCLEVBQUVqUyxLQUFBLENBQUtuUixLQUFLLENBQUNvakIsa0JBQW1CO0FBQ2xESSxRQUFBQSxvQkFBb0IsRUFBRXJTLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3dqQixvQkFBcUI7QUFDdERnRixRQUFBQSxpQkFBaUIsRUFBRXJYLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3dvQixpQkFBa0I7QUFDaERqSyxRQUFBQSxlQUFlLEVBQUVwTixLQUFBLENBQUtuUixLQUFLLENBQUN1ZSxlQUFnQjtBQUM1QzJNLFFBQUFBLGlCQUFpQixFQUFFL1osS0FBQSxDQUFLblIsS0FBSyxDQUFDa3JCLGlCQUFrQjtBQUNoRHpDLFFBQUFBLGdCQUFnQixFQUFFdFgsS0FBQSxDQUFLblIsS0FBSyxDQUFDeW9CLGdCQUFpQjtBQUM5Q0MsUUFBQUEsZ0JBQWdCLEVBQUV2WCxLQUFBLENBQUtuUixLQUFLLENBQUMwb0IsZ0JBQWlCO0FBQzlDeFAsUUFBQUEsMEJBQTBCLEVBQUUvSCxLQUFBLENBQUtuUixLQUFLLENBQUNrWiwwQkFBMkI7QUFDbEV1WCxRQUFBQSxhQUFhLEVBQUV0ZixLQUFBLENBQUtuUixLQUFLLENBQUN5d0IsYUFBYztBQUN4QzlMLFFBQUFBLG1CQUFtQixFQUFFeFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmtCLG1CQUFvQjtBQUNwRHhCLFFBQUFBLHVCQUF1QixFQUFFaFMsS0FBQSxDQUFLblIsS0FBSyxDQUFDbWpCLHVCQUF3QjtBQUM1RGxELFFBQUFBLDRCQUE0QixFQUFFOU8sS0FBQSxDQUFLblIsS0FBSyxDQUFDaWdCLDRCQUE2QjtBQUN0RUQsUUFBQUEsNkJBQTZCLEVBQUU3TyxLQUFBLENBQUtuUixLQUFLLENBQUNnZ0IsNkJBQThCO0FBQ3hFZ00sUUFBQUEsY0FBYyxFQUFFN2EsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ3NCLGNBQWU7QUFDMUNwSCxRQUFBQSxxQkFBcUIsRUFBRXpULEtBQUEsQ0FBS25SLEtBQUssQ0FBQzRrQixxQkFBc0I7QUFDeER2TSxRQUFBQSxjQUFjLEVBQUVsSCxLQUFBLENBQUtuUixLQUFLLENBQUNxWSxjQUFlO0FBQzFDcWpCLFFBQUFBLGdCQUFnQixFQUFFdnFCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzA3QixnQkFBaUI7QUFDOUMvakIsUUFBQUEsZUFBZSxFQUFFeEcsS0FBQSxDQUFLblIsS0FBSyxDQUFDa2QsU0FBVTtRQUN0QzZTLGtCQUFrQixFQUFFNWUsS0FBQSxDQUFLd3FCLFlBQWE7QUFDdEN6ZixRQUFBQSxjQUFjLEVBQUUvSyxLQUFBLENBQUtNLEtBQUssQ0FBQ3NsQixPQUFRO0FBQ25DdE4sUUFBQUEsZUFBZSxFQUFFdFksS0FBQSxDQUFLblIsS0FBSyxDQUFDeXBCLGVBQWdCO1FBQzVDcEksZUFBZSxFQUFFbFEsS0FBQSxDQUFLa1EsZUFBZ0I7QUFDdENqRSxRQUFBQSxlQUFlLEVBQUVqTSxLQUFBLENBQUtuUixLQUFLLENBQUNvZCxlQUFnQjtBQUM1Q2lMLFFBQUFBLGFBQWEsRUFBRWxYLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ3FvQixhQUFBQTtBQUFjLE9BQUEsRUFFdkNsWCxLQUFBLENBQUtuUixLQUFLLENBQUNxVCxRQUNHLENBQUMsQ0FBQTtLQUVyQixDQUFBLENBQUE7SUFBQS9CLGVBQUEsQ0FBQUgsS0FBQSxFQUFBLHNCQUFBLEVBRXNCLFlBQU07QUFDM0IsTUFBQSxJQUFBeUgsWUFBQSxHQUErQnpILEtBQUEsQ0FBS25SLEtBQUs7UUFBakMxQyxVQUFVLEdBQUFzYixZQUFBLENBQVZ0YixVQUFVO1FBQUVDLE1BQU0sR0FBQXFiLFlBQUEsQ0FBTnJiLE1BQU0sQ0FBQTtBQUMxQixNQUFBLElBQU1xK0IsY0FBYyxHQUNsQnpxQixLQUFBLENBQUtuUixLQUFLLENBQUN5d0IsYUFBYSxJQUFJdGYsS0FBQSxDQUFLblIsS0FBSyxDQUFDaXRCLGNBQWMsQ0FBQTtBQUN2RCxNQUFBLElBQU00TyxjQUFjLEdBQUdELGNBQWMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFBO0FBQ3hELE1BQUEsSUFBSWpMLGVBQWUsQ0FBQTtBQUVuQixNQUFBLElBQUl4ZixLQUFBLENBQUtuUixLQUFLLENBQUNpWixZQUFZLEVBQUU7UUFDM0IwWCxlQUFlLEdBQUEsdUJBQUEsQ0FBQWp4QixNQUFBLENBQTJCQyxjQUFjLENBQ3REd1IsS0FBQSxDQUFLblIsS0FBSyxDQUFDRixTQUFTLEVBQ3BCO0FBQ0V4QyxVQUFBQSxVQUFVLEVBQUV1K0IsY0FBYztBQUMxQnQrQixVQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0FBQ0YsU0FDRixDQUFDLEVBQUFtQyxJQUFBQSxDQUFBQSxDQUFBQSxNQUFBLENBQ0N5UixLQUFBLENBQUtuUixLQUFLLENBQUNELE9BQU8sR0FDZCxZQUFZLEdBQ1pKLGNBQWMsQ0FBQ3dSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ0QsT0FBTyxFQUFFO0FBQ2pDekMsVUFBQUEsVUFBVSxFQUFFdStCLGNBQWM7QUFDMUJ0K0IsVUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtTQUNELENBQUMsR0FDRixFQUFFLENBQ04sQ0FBQTtBQUNKLE9BQUMsTUFBTTtBQUNMLFFBQUEsSUFBSTRULEtBQUEsQ0FBS25SLEtBQUssQ0FBQ29uQixrQkFBa0IsRUFBRTtVQUNqQ3VKLGVBQWUsR0FBQSxpQkFBQSxDQUFBanhCLE1BQUEsQ0FBcUJDLGNBQWMsQ0FDaER3UixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLEVBQ25CO0FBQUU3YSxZQUFBQSxVQUFVLEVBQVZBLFVBQVU7QUFBRUMsWUFBQUEsTUFBTSxFQUFOQSxNQUFBQTtBQUFPLFdBQ3ZCLENBQUMsQ0FBRSxDQUFBO0FBQ0wsU0FBQyxNQUFNLElBQUk0VCxLQUFBLENBQUtuUixLQUFLLENBQUNnc0IsY0FBYyxFQUFFO1VBQ3BDMkUsZUFBZSxHQUFBLGlCQUFBLENBQUFqeEIsTUFBQSxDQUFxQkMsY0FBYyxDQUNoRHdSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsRUFDbkI7QUFBRTdhLFlBQUFBLFVBQVUsRUFBRSxNQUFNO0FBQUVDLFlBQUFBLE1BQU0sRUFBTkEsTUFBQUE7QUFBTyxXQUMvQixDQUFDLENBQUUsQ0FBQTtBQUNMLFNBQUMsTUFBTSxJQUFJNFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDMmtCLG1CQUFtQixFQUFFO1VBQ3pDZ00sZUFBZSxHQUFBLGtCQUFBLENBQUFqeEIsTUFBQSxDQUFzQkMsY0FBYyxDQUNqRHdSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsRUFDbkI7QUFBRTdhLFlBQUFBLFVBQVUsRUFBRSxXQUFXO0FBQUVDLFlBQUFBLE1BQU0sRUFBTkEsTUFBQUE7QUFBTyxXQUNwQyxDQUFDLENBQUUsQ0FBQTtBQUNMLFNBQUMsTUFBTSxJQUFJNFQsS0FBQSxDQUFLblIsS0FBSyxDQUFDNGtCLHFCQUFxQixFQUFFO1VBQzNDK0wsZUFBZSxHQUFBLG9CQUFBLENBQUFqeEIsTUFBQSxDQUF3QkMsY0FBYyxDQUNuRHdSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ21ZLFFBQVEsRUFDbkI7QUFDRTdhLFlBQUFBLFVBQVUsRUFBRSxXQUFXO0FBQ3ZCQyxZQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0FBQ0YsV0FDRixDQUFDLENBQUUsQ0FBQTtBQUNMLFNBQUMsTUFBTTtVQUNMb3pCLGVBQWUsR0FBQSxpQkFBQSxDQUFBanhCLE1BQUEsQ0FBcUJDLGNBQWMsQ0FDaER3UixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLEVBQ25CO0FBQ0U3YSxZQUFBQSxVQUFVLEVBQUV1K0IsY0FBYztBQUMxQnQrQixZQUFBQSxNQUFNLEVBQU5BLE1BQUFBO0FBQ0YsV0FDRixDQUFDLENBQUUsQ0FBQTtBQUNMLFNBQUE7QUFDRixPQUFBO01BRUEsb0JBQ0VvVSxLQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7QUFDRTRMLFFBQUFBLElBQUksRUFBQyxPQUFPO0FBQ1osUUFBQSxXQUFBLEVBQVUsUUFBUTtBQUNsQmxRLFFBQUFBLFNBQVMsRUFBQyw2QkFBQTtBQUE2QixPQUFBLEVBRXRDcWpCLGVBQ0csQ0FBQyxDQUFBO0tBRVYsQ0FBQSxDQUFBO0lBQUFyZixlQUFBLENBQUFILEtBQUEsRUFBQSxpQkFBQSxFQUVpQixZQUFNO0FBQUEsTUFBQSxJQUFBMnFCLG1CQUFBLENBQUE7TUFDdEIsSUFBTXh1QixTQUFTLEdBQUcwRyxJQUFJLENBQUM3QyxLQUFBLENBQUtuUixLQUFLLENBQUNzTixTQUFTLEVBQUFnRSxlQUFBLENBQ3hDNmtCLEVBQUFBLEVBQUFBLHVCQUF1QixFQUFHaGxCLEtBQUEsQ0FBS00sS0FBSyxDQUFDNmlCLElBQUksQ0FDM0MsQ0FBQyxDQUFBO01BRUYsSUFBTXlILFdBQVcsR0FBRzVxQixLQUFBLENBQUtuUixLQUFLLENBQUMrN0IsV0FBVyxpQkFBSXBxQixLQUFBLENBQUFDLGFBQUEsQ0FBQSxPQUFBLEVBQUE7QUFBTytYLFFBQUFBLElBQUksRUFBQyxNQUFBO0FBQU0sT0FBRSxDQUFDLENBQUE7TUFDbkUsSUFBTXFTLGNBQWMsR0FBRzdxQixLQUFBLENBQUtuUixLQUFLLENBQUNnOEIsY0FBYyxJQUFJLEtBQUssQ0FBQTtBQUN6RCxNQUFBLElBQU10RSxVQUFVLEdBQ2QsT0FBT3ZtQixLQUFBLENBQUtuUixLQUFLLENBQUNsRCxLQUFLLEtBQUssUUFBUSxHQUNoQ3FVLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ2xELEtBQUssR0FDaEIsT0FBT3FVLEtBQUEsQ0FBS00sS0FBSyxDQUFDaW1CLFVBQVUsS0FBSyxRQUFRLEdBQ3ZDdm1CLEtBQUEsQ0FBS00sS0FBSyxDQUFDaW1CLFVBQVUsR0FDckJ2bUIsS0FBQSxDQUFLblIsS0FBSyxDQUFDaVosWUFBWSxHQUNyQnBaLG1CQUFtQixDQUNqQnNSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ0YsU0FBUyxFQUNwQnFSLEtBQUEsQ0FBS25SLEtBQUssQ0FBQ0QsT0FBTyxFQUNsQm9SLEtBQUEsQ0FBS25SLEtBQ1AsQ0FBQyxHQUNEbVIsS0FBQSxDQUFLblIsS0FBSyxDQUFDZ1ksZUFBZSxHQUN4QjdYLHVCQUF1QixDQUFDZ1IsS0FBQSxDQUFLblIsS0FBSyxDQUFDaVksYUFBYSxFQUFFOUcsS0FBQSxDQUFLblIsS0FBSyxDQUFDLEdBQzdETCxjQUFjLENBQUN3UixLQUFBLENBQUtuUixLQUFLLENBQUNtWSxRQUFRLEVBQUVoSCxLQUFBLENBQUtuUixLQUFLLENBQUMsQ0FBQTtBQUUzRCxNQUFBLG9CQUFPMlIsS0FBSyxDQUFDK1gsWUFBWSxDQUFDcVMsV0FBVyxHQUFBRCxtQkFBQSxHQUFBeHFCLEVBQUFBLEVBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQXdxQixtQkFBQSxFQUNsQ0UsY0FBYyxFQUFHLFVBQUM5RSxLQUFLLEVBQUs7UUFDM0IvbEIsS0FBQSxDQUFLK2xCLEtBQUssR0FBR0EsS0FBSyxDQUFBO0FBQ3BCLE9BQUMsWUFDTVEsVUFBVSxDQUFBLEVBQUEsUUFBQSxFQUNUdm1CLEtBQUEsQ0FBSzhxQixVQUFVLENBQ2I5cUIsRUFBQUEsVUFBQUEsRUFBQUEsS0FBQSxDQUFLK3FCLFlBQVksY0FDbEIvcUIsS0FBQSxDQUFLd29CLFlBQVksQ0FBQSxFQUFBLFNBQUEsRUFDakJ4b0IsS0FBQSxDQUFLZ3JCLFdBQVcsQ0FDZGhyQixFQUFBQSxXQUFBQSxFQUFBQSxLQUFBLENBQUtpckIsY0FBYyxDQUFBLEVBQUEsSUFBQSxFQUMxQmpyQixLQUFBLENBQUtuUixLQUFLLENBQUNxOEIsRUFBRSxDQUNYbHJCLEVBQUFBLE1BQUFBLEVBQUFBLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzZwQixJQUFJLENBQ2YxWSxFQUFBQSxNQUFBQSxFQUFBQSxLQUFBLENBQUtuUixLQUFLLENBQUNzOEIsSUFBSSxDQUFBLEVBQUFockIsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUFBLGVBQUEsQ0FBQUEsZUFBQSxDQUFBd3FCLG1CQUFBLGVBQ1YzcUIsS0FBQSxDQUFLblIsS0FBSyxDQUFDdThCLFNBQVMsQ0FDbEJwckIsRUFBQUEsYUFBQUEsRUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDdzhCLGVBQWUsQ0FBQSxFQUFBLFVBQUEsRUFDN0JyckIsS0FBQSxDQUFLblIsS0FBSyxDQUFDaXpCLFFBQVEsQ0FBQSxFQUFBLGNBQUEsRUFDZjloQixLQUFBLENBQUtuUixLQUFLLENBQUN5OEIsWUFBWSxDQUMxQnpvQixFQUFBQSxXQUFBQSxFQUFBQSxJQUFJLENBQUMrbkIsV0FBVyxDQUFDLzdCLEtBQUssQ0FBQ3NOLFNBQVMsRUFBRUEsU0FBUyxDQUFDLENBQUEsRUFBQSxPQUFBLEVBQ2hENkQsS0FBQSxDQUFLblIsS0FBSyxDQUFDeWQsS0FBSyxlQUNidE0sS0FBQSxDQUFLblIsS0FBSyxDQUFDMjNCLFFBQVEsQ0FDbkJ4bUIsRUFBQUEsVUFBQUEsRUFBQUEsS0FBQSxDQUFLblIsS0FBSyxDQUFDOHBCLFFBQVEsQ0FBQSxFQUFBLFVBQUEsRUFDbkIzWSxLQUFBLENBQUtuUixLQUFLLENBQUMyYixRQUFRLENBQUEsRUFDN0Isa0JBQWtCLEVBQUV4SyxLQUFBLENBQUtuUixLQUFLLENBQUMwOEIsZUFBZSxHQUFBcHJCLGVBQUEsQ0FBQUEsZUFBQSxDQUFBQSxlQUFBLENBQUF3cUIsbUJBQUEsRUFDOUMsY0FBYyxFQUFFM3FCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzI4QixXQUFXLEdBQ3RDLGlCQUFpQixFQUFFeHJCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzQ4QixjQUFjLENBQzVDLEVBQUEsZUFBZSxFQUFFenJCLEtBQUEsQ0FBS25SLEtBQUssQ0FBQzY4QixZQUFZLEdBQ3hDLENBQUE7S0FDSCxDQUFBLENBQUE7SUFBQXZyQixlQUFBLENBQUFILEtBQUEsRUFBQSxtQkFBQSxFQUVtQixZQUFNO0FBQ3hCLE1BQUEsSUFBQTJILFlBQUEsR0FVSTNILEtBQUEsQ0FBS25SLEtBQUs7UUFUWjg4QixXQUFXLEdBQUFoa0IsWUFBQSxDQUFYZ2tCLFdBQVc7UUFDWDdKLFFBQVEsR0FBQW5hLFlBQUEsQ0FBUm1hLFFBQVE7UUFDUjlhLFFBQVEsR0FBQVcsWUFBQSxDQUFSWCxRQUFRO1FBQ1JyWSxTQUFTLEdBQUFnWixZQUFBLENBQVRoWixTQUFTO1FBQ1RDLE9BQU8sR0FBQStZLFlBQUEsQ0FBUC9ZLE9BQU87UUFDUGc5QixnQkFBZ0IsR0FBQWprQixZQUFBLENBQWhCaWtCLGdCQUFnQjtRQUFBQyxxQkFBQSxHQUFBbGtCLFlBQUEsQ0FDaEJta0Isb0JBQW9CO0FBQXBCQSxRQUFBQSxvQkFBb0IsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxFQUFFLEdBQUFBLHFCQUFBO1FBQUFFLHFCQUFBLEdBQUFwa0IsWUFBQSxDQUN6QnFrQixjQUFjO0FBQWRBLFFBQUFBLGNBQWMsR0FBQUQscUJBQUEsS0FBRyxLQUFBLENBQUEsR0FBQSxPQUFPLEdBQUFBLHFCQUFBO1FBQ3hCamxCLGFBQWEsR0FBQWEsWUFBQSxDQUFiYixhQUFhLENBQUE7TUFFZixJQUNFNmtCLFdBQVcsS0FDVjNrQixRQUFRLElBQUksSUFBSSxJQUNmclksU0FBUyxJQUFJLElBQUksSUFDakJDLE9BQU8sSUFBSSxJQUFJLElBQ2ZrWSxhQUFhLEtBQWJBLElBQUFBLElBQUFBLGFBQWEsZUFBYkEsYUFBYSxDQUFFalosTUFBTSxDQUFDLEVBQ3hCO1FBQ0Esb0JBQ0UyUyxLQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7QUFDRStYLFVBQUFBLElBQUksRUFBQyxRQUFRO0FBQ2JyYyxVQUFBQSxTQUFTLEVBQUUwRyxJQUFJLENBQ2IsOEJBQThCLEVBQzlCaXBCLG9CQUFvQixFQUNwQjtBQUFFLFlBQUEsd0NBQXdDLEVBQUVoSyxRQUFBQTtBQUFTLFdBQ3ZELENBQUU7QUFDRkEsVUFBQUEsUUFBUSxFQUFFQSxRQUFTO0FBQ25CLFVBQUEsWUFBQSxFQUFZa0ssY0FBZTtVQUMzQnRyQixPQUFPLEVBQUVWLEtBQUEsQ0FBSzRwQixZQUFhO0FBQzNCdGQsVUFBQUEsS0FBSyxFQUFFc2YsZ0JBQWlCO0FBQ3hCcGhCLFVBQUFBLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFBRSxTQUNkLENBQUMsQ0FBQTtBQUVOLE9BQUMsTUFBTTtBQUNMLFFBQUEsT0FBTyxJQUFJLENBQUE7QUFDYixPQUFBO0tBQ0QsQ0FBQSxDQUFBO0FBLzlCQ3hLLElBQUFBLEtBQUEsQ0FBS00sS0FBSyxHQUFHTixLQUFBLENBQUttbUIsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNwQ25tQixLQUFBLENBQUs2bEIsbUJBQW1CLEdBQUcsSUFBSSxDQUFBO0FBQUMsSUFBQSxPQUFBN2xCLEtBQUEsQ0FBQTtBQUNsQyxHQUFBO0VBQUM0QixTQUFBLENBQUF3akIsVUFBQSxFQUFBcmxCLGdCQUFBLENBQUEsQ0FBQTtFQUFBLE9BQUE4QixZQUFBLENBQUF1akIsVUFBQSxFQUFBLENBQUE7SUFBQTFwQixHQUFBLEVBQUEsbUJBQUE7SUFBQS9QLEtBQUEsRUFFRCxTQUFBbVcsaUJBQUFBLEdBQW9CO01BQ2xCcFAsTUFBTSxDQUFDdTVCLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUNDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN4RCxLQUFBO0FBQUMsR0FBQSxFQUFBO0lBQUF4d0IsR0FBQSxFQUFBLG9CQUFBO0FBQUEvUCxJQUFBQSxLQUFBLEVBRUQsU0FBQThnQixrQkFBQUEsQ0FBbUI3QixTQUFTLEVBQUV1aEIsU0FBUyxFQUFFO0FBQ3ZDLE1BQUEsSUFDRXZoQixTQUFTLENBQUNPLE1BQU0sSUFDaEIrWixzQkFBc0IsQ0FBQ3RhLFNBQVMsQ0FBQzVELFFBQVEsRUFBRSxJQUFJLENBQUNuWSxLQUFLLENBQUNtWSxRQUFRLENBQUMsRUFDL0Q7UUFDQSxJQUFJLENBQUNrSixlQUFlLENBQUMsSUFBSSxDQUFDcmhCLEtBQUssQ0FBQ21ZLFFBQVEsQ0FBQyxDQUFBO0FBQzNDLE9BQUE7QUFDQSxNQUFBLElBQ0UsSUFBSSxDQUFDMUcsS0FBSyxDQUFDd1osZUFBZSxLQUFLaG1CLFNBQVMsSUFDeEM4VyxTQUFTLENBQUN5VCxXQUFXLEtBQUssSUFBSSxDQUFDeHZCLEtBQUssQ0FBQ3d2QixXQUFXLEVBQ2hEO1FBQ0EsSUFBSSxDQUFDL2MsUUFBUSxDQUFDO0FBQUV3WSxVQUFBQSxlQUFlLEVBQUUsQ0FBQTtBQUFFLFNBQUMsQ0FBQyxDQUFBO0FBQ3ZDLE9BQUE7TUFDQSxJQUFJbFAsU0FBUyxDQUFDMVAsY0FBYyxLQUFLLElBQUksQ0FBQ3JNLEtBQUssQ0FBQ3FNLGNBQWMsRUFBRTtRQUMxRCxJQUFJLENBQUNvRyxRQUFRLENBQUM7QUFDWnBHLFVBQUFBLGNBQWMsRUFBRUQsb0JBQW9CLENBQUMsSUFBSSxDQUFDcE0sS0FBSyxDQUFDcU0sY0FBYyxDQUFBO0FBQ2hFLFNBQUMsQ0FBQyxDQUFBO0FBQ0osT0FBQTtBQUNBLE1BQUEsSUFDRSxDQUFDaXhCLFNBQVMsQ0FBQ3ZHLE9BQU8sSUFDbEIsQ0FBQy96QixPQUFPLENBQUMrWSxTQUFTLENBQUM1RCxRQUFRLEVBQUUsSUFBSSxDQUFDblksS0FBSyxDQUFDbVksUUFBUSxDQUFDLEVBQ2pEO1FBQ0EsSUFBSSxDQUFDMUYsUUFBUSxDQUFDO0FBQUVpbEIsVUFBQUEsVUFBVSxFQUFFLElBQUE7QUFBSyxTQUFDLENBQUMsQ0FBQTtBQUNyQyxPQUFBO01BRUEsSUFBSTRGLFNBQVMsQ0FBQ2hKLElBQUksS0FBSyxJQUFJLENBQUM3aUIsS0FBSyxDQUFDNmlCLElBQUksRUFBRTtBQUN0QyxRQUFBLElBQUlnSixTQUFTLENBQUNoSixJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQzdpQixLQUFLLENBQUM2aUIsSUFBSSxLQUFLLElBQUksRUFBRTtBQUN4RCxVQUFBLElBQUksQ0FBQ3QwQixLQUFLLENBQUN1OUIsY0FBYyxFQUFFLENBQUE7QUFDN0IsU0FBQTtBQUVBLFFBQUEsSUFBSUQsU0FBUyxDQUFDaEosSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUM3aUIsS0FBSyxDQUFDNmlCLElBQUksS0FBSyxLQUFLLEVBQUU7QUFDeEQsVUFBQSxJQUFJLENBQUN0MEIsS0FBSyxDQUFDdzlCLGVBQWUsRUFBRSxDQUFBO0FBQzlCLFNBQUE7QUFDRixPQUFBO0FBQ0YsS0FBQTtBQUFDLEdBQUEsRUFBQTtJQUFBM3dCLEdBQUEsRUFBQSxzQkFBQTtJQUFBL1AsS0FBQSxFQUVELFNBQUE0MUIsb0JBQUFBLEdBQXVCO01BQ3JCLElBQUksQ0FBQ21GLHdCQUF3QixFQUFFLENBQUE7TUFDL0JoMEIsTUFBTSxDQUFDNDVCLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUNKLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUMzRCxLQUFBO0FBQUMsR0FBQSxFQUFBO0lBQUF4d0IsR0FBQSxFQUFBLHNCQUFBO0lBQUEvUCxLQUFBLEVBazdCRCxTQUFBNGdDLG9CQUFBQSxHQUF1QjtBQUNyQixNQUFBLElBQUFwa0IsWUFBQSxHQUNFLElBQUksQ0FBQ3RaLEtBQUs7UUFESjI5QixRQUFRLEdBQUFya0IsWUFBQSxDQUFScWtCLFFBQVE7UUFBRS9MLElBQUksR0FBQXRZLFlBQUEsQ0FBSnNZLElBQUk7UUFBRWdNLHFCQUFxQixHQUFBdGtCLFlBQUEsQ0FBckJza0IscUJBQXFCO1FBQUVDLHlCQUF5QixHQUFBdmtCLFlBQUEsQ0FBekJ1a0IseUJBQXlCLENBQUE7QUFFeEUsTUFBQSxJQUFRdkosSUFBSSxHQUFLLElBQUksQ0FBQzdpQixLQUFLLENBQW5CNmlCLElBQUksQ0FBQTtNQUVaLG9CQUNFM2lCLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNFdEUsUUFBQUEsU0FBUyxzQ0FBQTVOLE1BQUEsQ0FDUGkrQixRQUFRLEdBQUcsdUNBQXVDLEdBQUcsRUFBRSxDQUFBO09BR3hEQSxFQUFBQSxRQUFRLGlCQUNQaHNCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDK2YsY0FBWSxFQUFBMUIsUUFBQSxDQUFBO0FBQ1gyQixRQUFBQSxJQUFJLEVBQUVBLElBQUs7UUFDWHRrQixTQUFTLEVBQUEsRUFBQSxDQUFBNU4sTUFBQSxDQUFLaytCLHFCQUFxQixPQUFBbCtCLE1BQUEsQ0FDakM0MEIsSUFBSSxJQUFJLHdDQUF3QyxDQUFBO0FBQy9DLE9BQUEsRUFDRXVKLHlCQUF5QixHQUMxQjtRQUNFaHNCLE9BQU8sRUFBRSxJQUFJLENBQUNpc0IsY0FBQUE7QUFDaEIsT0FBQyxHQUNELElBQUksQ0FDVCxDQUNGLEVBQ0EsSUFBSSxDQUFDcnNCLEtBQUssQ0FBQzRaLHVCQUF1QixJQUFJLElBQUksQ0FBQzhGLG9CQUFvQixFQUFFLEVBQ2pFLElBQUksQ0FBQzRNLGVBQWUsRUFBRSxFQUN0QixJQUFJLENBQUNDLGlCQUFpQixFQUNwQixDQUFDLENBQUE7QUFFVixLQUFBO0FBQUMsR0FBQSxFQUFBO0lBQUFueEIsR0FBQSxFQUFBLFFBQUE7SUFBQS9QLEtBQUEsRUFFRCxTQUFBZ1gsTUFBQUEsR0FBUztBQUNQLE1BQUEsSUFBTWdtQixRQUFRLEdBQUcsSUFBSSxDQUFDbUUsY0FBYyxFQUFFLENBQUE7QUFFdEMsTUFBQSxJQUFJLElBQUksQ0FBQ2orQixLQUFLLENBQUNzYyxNQUFNLEVBQUUsT0FBT3dkLFFBQVEsQ0FBQTtBQUV0QyxNQUFBLElBQUksSUFBSSxDQUFDOTVCLEtBQUssQ0FBQ3N3QixVQUFVLEVBQUU7QUFDekIsUUFBQSxJQUFJNE4sZUFBZSxHQUFHLElBQUksQ0FBQ3pzQixLQUFLLENBQUM2aUIsSUFBSSxnQkFDbkMzaUIsS0FBQSxDQUFBQyxhQUFBLENBQUNzaEIsT0FBTyxFQUFBO0FBQUNPLFVBQUFBLGFBQWEsRUFBRSxJQUFJLENBQUN6ekIsS0FBSyxDQUFDeXpCLGFBQUFBO1NBQ2pDOWhCLGVBQUFBLEtBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtBQUNFdEUsVUFBQUEsU0FBUyxFQUFDLDBCQUEwQjtVQUNwQ3FPLFFBQVEsRUFBRSxDQUFDLENBQUU7VUFDYnVCLFNBQVMsRUFBRSxJQUFJLENBQUNpaEIsZUFBQUE7QUFBZ0IsU0FBQSxFQUUvQnJFLFFBQ0UsQ0FDRSxDQUFDLEdBQ1IsSUFBSSxDQUFBO1FBRVIsSUFBSSxJQUFJLENBQUNyb0IsS0FBSyxDQUFDNmlCLElBQUksSUFBSSxJQUFJLENBQUN0MEIsS0FBSyxDQUFDdXlCLFFBQVEsRUFBRTtBQUMxQzJMLFVBQUFBLGVBQWUsZ0JBQ2J2c0IsS0FBQSxDQUFBQyxhQUFBLENBQUNzZ0IsTUFBTSxFQUFBO0FBQ0xLLFlBQUFBLFFBQVEsRUFBRSxJQUFJLENBQUN2eUIsS0FBSyxDQUFDdXlCLFFBQVM7QUFDOUJGLFlBQUFBLFVBQVUsRUFBRSxJQUFJLENBQUNyeUIsS0FBSyxDQUFDcXlCLFVBQUFBO0FBQVcsV0FBQSxFQUVqQzZMLGVBQ0ssQ0FDVCxDQUFBO0FBQ0gsU0FBQTtRQUVBLG9CQUNFdnNCLEtBQUEsQ0FBQUMsYUFBQSxDQUNHLEtBQUEsRUFBQSxJQUFBLEVBQUEsSUFBSSxDQUFDOHJCLG9CQUFvQixFQUFFLEVBQzNCUSxlQUNFLENBQUMsQ0FBQTtBQUVWLE9BQUE7QUFFQSxNQUFBLG9CQUNFdnNCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDbWpCLGlCQUFlLEVBQUE7QUFDZHpuQixRQUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDdE4sS0FBSyxDQUFDbytCLGVBQWdCO0FBQ3RDcEosUUFBQUEsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDaDFCLEtBQUssQ0FBQ2cxQixnQkFBaUI7QUFDOUNmLFFBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQ2lILGNBQWMsRUFBRztBQUNuQzNJLFFBQUFBLFFBQVEsRUFBRSxJQUFJLENBQUN2eUIsS0FBSyxDQUFDdXlCLFFBQVM7QUFDOUJGLFFBQUFBLFVBQVUsRUFBRSxJQUFJLENBQUNyeUIsS0FBSyxDQUFDcXlCLFVBQVc7QUFDbEMwQixRQUFBQSxlQUFlLEVBQUUsSUFBSSxDQUFDL3pCLEtBQUssQ0FBQyt6QixlQUFnQjtBQUM1Q21CLFFBQUFBLGVBQWUsRUFBRSxJQUFJLENBQUN3SSxvQkFBb0IsRUFBRztBQUM3QzNILFFBQUFBLGVBQWUsRUFBRSxJQUFJLENBQUMvMUIsS0FBSyxDQUFDKzFCLGVBQWdCO0FBQzVDZCxRQUFBQSxlQUFlLEVBQUU2RSxRQUFTO0FBQzFCcEYsUUFBQUEsZUFBZSxFQUFFLElBQUksQ0FBQzEwQixLQUFLLENBQUMwMEIsZUFBZ0I7QUFDNUNWLFFBQUFBLFdBQVcsRUFBRSxJQUFJLENBQUNoMEIsS0FBSyxDQUFDZzBCLFdBQVk7UUFDcENtQixlQUFlLEVBQUUsSUFBSSxDQUFDa0osZUFBZ0I7QUFDdEM1SyxRQUFBQSxhQUFhLEVBQUUsSUFBSSxDQUFDenpCLEtBQUssQ0FBQ3l6QixhQUFjO0FBQ3hDMkIsUUFBQUEsU0FBUyxFQUFFLElBQUksQ0FBQ3AxQixLQUFLLENBQUNzK0IsZUFBQUE7QUFBZ0IsT0FDdkMsQ0FBQyxDQUFBO0FBRU4sS0FBQTtBQUFDLEdBQUEsQ0FBQSxFQUFBLENBQUE7SUFBQXp4QixHQUFBLEVBQUEsY0FBQTtJQUFBRSxHQUFBLEVBcHpDRCxTQUFBQSxHQUFBQSxHQUEwQjtNQUN4QixPQUFPO0FBQ0w4ckIsUUFBQUEsWUFBWSxFQUFFLEtBQUs7QUFDbkJ2N0IsUUFBQUEsVUFBVSxFQUFFLFlBQVk7QUFDeEI4OUIsUUFBQUEsa0JBQWtCLEVBQUUsV0FBVztBQUMvQnRwQixRQUFBQSxRQUFRLEVBQUFBLFNBQUFBLFFBQUFBLEdBQUcsRUFBRTtBQUNibWhCLFFBQUFBLFFBQVEsRUFBRSxLQUFLO0FBQ2ZuYixRQUFBQSwwQkFBMEIsRUFBRSxLQUFLO0FBQ2pDbkMsUUFBQUEsWUFBWSxFQUFFLFFBQVE7QUFDdEJ5WSxRQUFBQSxPQUFPLEVBQUFBLFNBQUFBLE9BQUFBLEdBQUcsRUFBRTtBQUNaNkosUUFBQUEsTUFBTSxFQUFBQSxTQUFBQSxNQUFBQSxHQUFHLEVBQUU7QUFDWC9hLFFBQUFBLFNBQVMsRUFBQUEsU0FBQUEsU0FBQUEsR0FBRyxFQUFFO0FBQ2R5YyxRQUFBQSxZQUFZLEVBQUFBLFNBQUFBLFlBQUFBLEdBQUcsRUFBRTtBQUNqQm5rQixRQUFBQSxRQUFRLEVBQUFBLFNBQUFBLFFBQUFBLEdBQUcsRUFBRTtBQUNibkIsUUFBQUEsY0FBYyxFQUFBQSxTQUFBQSxjQUFBQSxHQUFHLEVBQUU7QUFDbkJrWCxRQUFBQSxhQUFhLEVBQUFBLFNBQUFBLGFBQUFBLEdBQUcsRUFBRTtBQUNsQmdTLFFBQUFBLGNBQWMsRUFBQUEsU0FBQUEsY0FBQUEsR0FBRyxFQUFFO0FBQ25CQyxRQUFBQSxlQUFlLEVBQUFBLFNBQUFBLGVBQUFBLEdBQUcsRUFBRTtBQUNwQjVGLFFBQUFBLGtCQUFrQixFQUFFLEtBQUs7QUFDekJ4TSxRQUFBQSxZQUFZLEVBQUFBLFNBQUFBLFlBQUFBLEdBQUcsRUFBRTtBQUNqQmdQLFFBQUFBLFlBQVksRUFBQUEsU0FBQUEsWUFBQUEsR0FBRyxFQUFFO0FBQ2pCNUssUUFBQUEsV0FBVyxFQUFFLENBQUM7QUFDZG1JLFFBQUFBLFFBQVEsRUFBRSxLQUFLO0FBQ2ZySCxRQUFBQSxVQUFVLEVBQUUsS0FBSztBQUNqQnBYLFFBQUFBLDBCQUEwQixFQUFFLEtBQUs7QUFDakN3RixRQUFBQSxtQkFBbUIsRUFBRSxJQUFJO0FBQ3pCdU8sUUFBQUEsY0FBYyxFQUFFLEtBQUs7QUFDckJ3RCxRQUFBQSxhQUFhLEVBQUUsS0FBSztBQUNwQmxCLFFBQUFBLGtCQUFrQixFQUFFLEtBQUs7QUFDekI1SyxRQUFBQSxtQkFBbUIsRUFBRSxLQUFLO0FBQzFCeEIsUUFBQUEsdUJBQXVCLEVBQUUsS0FBSztBQUM5QmxELFFBQUFBLDRCQUE0QixFQUFFLEtBQUs7QUFDbkNELFFBQUFBLDZCQUE2QixFQUFFLEtBQUs7QUFDcENnTSxRQUFBQSxjQUFjLEVBQUUsS0FBSztBQUNyQnBILFFBQUFBLHFCQUFxQixFQUFFLEtBQUs7QUFDNUJ2TSxRQUFBQSxjQUFjLEVBQUUsS0FBSztBQUNyQjdhLFFBQUFBLGFBQWEsRUFBRSxLQUFLO0FBQ3BCbzdCLFFBQUFBLFNBQVMsRUFBRSxLQUFLO0FBQ2hCdkksUUFBQUEsYUFBYSxFQUFFLEVBQUU7QUFDakJoSixRQUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNuQndGLFFBQUFBLHNCQUFzQixFQUFFLGdCQUFnQjtBQUN4Q0gsUUFBQUEsd0JBQXdCLEVBQUUsZ0JBQWdCO0FBQzFDYSxRQUFBQSxrQkFBa0IsRUFBRSxZQUFZO0FBQ2hDSCxRQUFBQSxvQkFBb0IsRUFBRSxZQUFZO0FBQ2xDTCxRQUFBQSxxQkFBcUIsRUFBRSxlQUFlO0FBQ3RDSixRQUFBQSx1QkFBdUIsRUFBRSxlQUFlO0FBQ3hDYyxRQUFBQSxpQkFBaUIsRUFBRSxXQUFXO0FBQzlCSixRQUFBQSxtQkFBbUIsRUFBRSxXQUFXO0FBQ2hDdEQsUUFBQUEsY0FBYyxFQUFFLE1BQU07QUFDdEIwSixRQUFBQSxhQUFhLEVBQUUsSUFBSTtBQUNuQjNvQixRQUFBQSxjQUFjLEVBQUVuTyx3QkFBd0I7QUFDeENtOEIsUUFBQUEsa0JBQWtCLEVBQUUsS0FBSztBQUN6QndGLFFBQUFBLGVBQWUsRUFBRSxJQUFJO0FBQ3JCNUMsUUFBQUEsZ0JBQWdCLEVBQUUsSUFBSTtBQUN0QmpTLFFBQUFBLGVBQWUsRUFBRSxJQUFJO0FBQ3JCL25CLFFBQUFBLGdCQUFnQixFQUFFdUQsU0FBUztBQUMzQjQ0QixRQUFBQSx5QkFBeUIsRUFBRSxLQUFLO0FBQ2hDemdCLFFBQUFBLGVBQWUsRUFBRSxLQUFBO09BQ2xCLENBQUE7QUFDSCxLQUFBO0FBQUMsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLENBNURxQ3pMLENBQUFBLEtBQUssQ0FBQ3dDLFNBQVMsRUFBQTtBQXd6Q3ZELElBQU1ra0IsMEJBQTBCLEdBQUcsT0FBTyxDQUFBO0FBQzFDLElBQU1iLDZCQUE2QixHQUFHLFVBQVU7Ozs7In0=
