/*
Copyright 2014, gregorian-calendar@1.0.4
MIT Licensed
build time: Thu, 16 Oct 2014 06:56:35 GMT
*/
modulex.add("gregorian-calendar", ["i18n!gregorian-calendar"], function(require, exports, module) {
var i18nGregorianCalendar = require("i18n!gregorian-calendar");
/*
combined modules:
gregorian-calendar
gregorian-calendar/utils
gregorian-calendar/const
*/
var gregorianCalendarConst, gregorianCalendarUtils, gregorianCalendar;
gregorianCalendarConst = function (exports) {
  /**
   * @ignore
   * const for gregorian date
   * @author yiminghe@gmail.com
   */
  exports = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11
  };
  return exports;
}();
gregorianCalendarUtils = function (exports) {
  exports = {};
  var Const = gregorianCalendarConst;
  var floor = Math.floor;
  var ACCUMULATED_DAYS_IN_MONTH = [
      0,
      31,
      59,
      90,
      120,
      151,
      181,
      212,
      243,
      273,
      304,
      334
    ], ACCUMULATED_DAYS_IN_MONTH_LEAP = [
      0,
      31,
      59 + 1,
      90 + 1,
      120 + 1,
      151 + 1,
      181 + 1,
      212 + 1,
      243 + 1,
      273 + 1,
      304 + 1,
      334 + 1
    ], DAYS_OF_YEAR = 365, DAYS_OF_4YEAR = 365 * 4 + 1, DAYS_OF_100YEAR = DAYS_OF_4YEAR * 25 - 1, DAYS_OF_400YEAR = DAYS_OF_100YEAR * 4 + 1;
  function getDayOfYear(year, month, dayOfMonth) {
    return dayOfMonth + (exports.isLeapYear(year) ? ACCUMULATED_DAYS_IN_MONTH_LEAP[month] : ACCUMULATED_DAYS_IN_MONTH[month]);
  }
  function getDayOfWeekFromFixedDate(fixedDate) {
    if (fixedDate >= 0) {
      return fixedDate % 7;
    }
    return exports.mod(fixedDate, 7);
  }
  function getGregorianYearFromFixedDate(fixedDate) {
    var d0;
    var d1, d2, d3;
    var n400, n100, n4, n1;
    var year;
    d0 = fixedDate - 1;
    n400 = floor(d0 / DAYS_OF_400YEAR);
    d1 = exports.mod(d0, DAYS_OF_400YEAR);
    n100 = floor(d1 / DAYS_OF_100YEAR);
    d2 = exports.mod(d1, DAYS_OF_100YEAR);
    n4 = floor(d2 / DAYS_OF_4YEAR);
    d3 = exports.mod(d2, DAYS_OF_4YEAR);
    n1 = floor(d3 / DAYS_OF_YEAR);
    year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
    if (!(n100 === 4 || n1 === 4)) {
      ++year;
    }
    return year;
  }
  var exports = exports = {
    each: function (arr, fn) {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (fn(arr[i], i, arr) === false) {
          break;
        }
      }
    },
    mix: function (t, s) {
      for (var p in s) {
        t[p] = s[p];
      }
    },
    isLeapYear: function (year) {
      if ((year & 3) !== 0) {
        return false;
      }
      return year % 100 !== 0 || year % 400 === 0;
    },
    mod: function (x, y) {
      return x - y * floor(x / y);
    },
    getFixedDate: function (year, month, dayOfMonth) {
      var prevYear = year - 1;
      return DAYS_OF_YEAR * prevYear + floor(prevYear / 4) - floor(prevYear / 100) + floor(prevYear / 400) + getDayOfYear(year, month, dayOfMonth);
    },
    getGregorianDateFromFixedDate: function (fixedDate) {
      var year = getGregorianYearFromFixedDate(fixedDate);
      var jan1 = exports.getFixedDate(year, Const.JANUARY, 1);
      var isLeap = exports.isLeapYear(year);
      var ACCUMULATED_DAYS = isLeap ? ACCUMULATED_DAYS_IN_MONTH_LEAP : ACCUMULATED_DAYS_IN_MONTH;
      var daysDiff = fixedDate - jan1;
      var month, i;
      for (i = 0; i < ACCUMULATED_DAYS.length; i++) {
        if (ACCUMULATED_DAYS[i] <= daysDiff) {
          month = i;
        } else {
          break;
        }
      }
      var dayOfMonth = fixedDate - jan1 - ACCUMULATED_DAYS[month] + 1;
      var dayOfWeek = getDayOfWeekFromFixedDate(fixedDate);
      return {
        year: year,
        month: month,
        dayOfMonth: dayOfMonth,
        dayOfWeek: dayOfWeek,
        isLeap: isLeap
      };
    }
  };
  return exports;
}();
gregorianCalendar = function (exports) {
  var toInt = parseInt;
  var Utils = gregorianCalendarUtils;
  var requireFn = require;
  var defaultLocale;
  if (typeof process !== 'undefined') {
    defaultLocale = requireFn('./gregorian-calendar/i18n/en-us');
  } else {
    defaultLocale = i18nGregorianCalendar;
  }
  var Const = gregorianCalendarConst;
  function GregorianCalendar(timezoneOffset, locale) {
    var args = [].slice.call(arguments, 0);
    if (typeof timezoneOffset === 'object') {
      locale = timezoneOffset;
      timezoneOffset = locale.timezoneOffset;
    } else if (args.length >= 3) {
      timezoneOffset = locale = null;
    }
    locale = locale || defaultLocale;
    this.locale = locale;
    this.fields = [];
    this.time = undefined;
    this.timezoneOffset = timezoneOffset || locale.timezoneOffset;
    this.firstDayOfWeek = locale.firstDayOfWeek;
    this.minimalDaysInFirstWeek = locale.minimalDaysInFirstWeek;
    this.fieldsComputed = false;
    if (arguments.length >= 3) {
      this.set.apply(this, args);
    }
  }
  Utils.mix(GregorianCalendar, Const);
  Utils.mix(GregorianCalendar, {
    Utils: Utils,
    isLeapYear: Utils.isLeapYear,
    YEAR: 1,
    MONTH: 2,
    DAY_OF_MONTH: 3,
    HOUR_OF_DAY: 4,
    MINUTES: 5,
    SECONDS: 6,
    MILLISECONDS: 7,
    WEEK_OF_YEAR: 8,
    WEEK_OF_MONTH: 9,
    DAY_OF_YEAR: 10,
    DAY_OF_WEEK: 11,
    DAY_OF_WEEK_IN_MONTH: 12,
    AM: 0,
    PM: 1
  });
  var fields = [
    '',
    'Year',
    'Month',
    'DayOfMonth',
    'HourOfDay',
    'Minutes',
    'Seconds',
    'Milliseconds',
    'WeekOfYear',
    'WeekOfMonth',
    'DayOfYear',
    'DayOfWeek',
    'DayOfWeekInMonth'
  ];
  var YEAR = GregorianCalendar.YEAR;
  var MONTH = GregorianCalendar.MONTH;
  var DAY_OF_MONTH = GregorianCalendar.DAY_OF_MONTH;
  var HOUR_OF_DAY = GregorianCalendar.HOUR_OF_DAY;
  var MINUTE = GregorianCalendar.MINUTES;
  var SECONDS = GregorianCalendar.SECONDS;
  var MILLISECONDS = GregorianCalendar.MILLISECONDS;
  var DAY_OF_WEEK_IN_MONTH = GregorianCalendar.DAY_OF_WEEK_IN_MONTH;
  var DAY_OF_YEAR = GregorianCalendar.DAY_OF_YEAR;
  var DAY_OF_WEEK = GregorianCalendar.DAY_OF_WEEK;
  var WEEK_OF_MONTH = GregorianCalendar.WEEK_OF_MONTH;
  var WEEK_OF_YEAR = GregorianCalendar.WEEK_OF_YEAR;
  var MONTH_LENGTH = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];
  var LEAP_MONTH_LENGTH = [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];
  var ONE_SECOND = 1000;
  var ONE_MINUTE = 60 * ONE_SECOND;
  var ONE_HOUR = 60 * ONE_MINUTE;
  var ONE_DAY = 24 * ONE_HOUR;
  var ONE_WEEK = ONE_DAY * 7;
  var EPOCH_OFFSET = 719163;
  var mod = Utils.mod, isLeapYear = Utils.isLeapYear, floorDivide = Math.floor;
  var MIN_VALUES = [
    undefined,
    1,
    GregorianCalendar.JANUARY,
    1,
    0,
    0,
    0,
    0,
    1,
    undefined,
    1,
    GregorianCalendar.SUNDAY,
    1
  ];
  var MAX_VALUES = [
    undefined,
    292278994,
    GregorianCalendar.DECEMBER,
    undefined,
    23,
    59,
    59,
    999,
    undefined,
    undefined,
    undefined,
    GregorianCalendar.SATURDAY,
    undefined
  ];
  GregorianCalendar.prototype = {
    constructor: GregorianCalendar,
    isLeapYear: function () {
      return isLeapYear(this.getYear());
    },
    getLocale: function () {
      return this.locale;
    },
    getActualMinimum: function (field) {
      if (MIN_VALUES[field] !== undefined) {
        return MIN_VALUES[field];
      }
      var fields = this.fields;
      if (field === WEEK_OF_MONTH) {
        var cal = new GregorianCalendar(fields[YEAR], fields[MONTH], 1);
        return cal.get(WEEK_OF_MONTH);
      }
      throw new Error('minimum value not defined!');
    },
    getActualMaximum: function (field) {
      if (MAX_VALUES[field] !== undefined) {
        return MAX_VALUES[field];
      }
      var value, fields = this.fields;
      switch (field) {
      case DAY_OF_MONTH:
        value = getMonthLength(fields[YEAR], fields[MONTH]);
        break;
      case WEEK_OF_YEAR:
        var endOfYear = new GregorianCalendar(fields[YEAR], GregorianCalendar.DECEMBER, 31);
        value = endOfYear.get(WEEK_OF_YEAR);
        if (value === 1) {
          value = 52;
        }
        break;
      case WEEK_OF_MONTH:
        var endOfMonth = new GregorianCalendar(fields[YEAR], fields[MONTH], getMonthLength(fields[YEAR], fields[MONTH]));
        value = endOfMonth.get(WEEK_OF_MONTH);
        break;
      case DAY_OF_YEAR:
        value = getYearLength(fields[YEAR]);
        break;
      case DAY_OF_WEEK_IN_MONTH:
        value = toInt((getMonthLength(fields[YEAR], fields[MONTH]) - 1) / 7) + 1;
        break;
      }
      if (value === undefined) {
        throw new Error('maximum value not defined!');
      }
      return value;
    },
    isSet: function (field) {
      return this.fields[field] !== undefined;
    },
    computeFields: function () {
      var time = this.time;
      var timezoneOffset = this.timezoneOffset * ONE_MINUTE;
      var fixedDate = toInt(timezoneOffset / ONE_DAY);
      var timeOfDay = timezoneOffset % ONE_DAY;
      fixedDate += toInt(time / ONE_DAY);
      timeOfDay += time % ONE_DAY;
      if (timeOfDay >= ONE_DAY) {
        timeOfDay -= ONE_DAY;
        fixedDate++;
      } else {
        while (timeOfDay < 0) {
          timeOfDay += ONE_DAY;
          fixedDate--;
        }
      }
      fixedDate += EPOCH_OFFSET;
      var date = Utils.getGregorianDateFromFixedDate(fixedDate);
      var year = date.year;
      var fields = this.fields;
      fields[YEAR] = year;
      fields[MONTH] = date.month;
      fields[DAY_OF_MONTH] = date.dayOfMonth;
      fields[DAY_OF_WEEK] = date.dayOfWeek;
      if (timeOfDay !== 0) {
        fields[HOUR_OF_DAY] = toInt(timeOfDay / ONE_HOUR);
        var r = timeOfDay % ONE_HOUR;
        fields[MINUTE] = toInt(r / ONE_MINUTE);
        r %= ONE_MINUTE;
        fields[SECONDS] = toInt(r / ONE_SECOND);
        fields[MILLISECONDS] = r % ONE_SECOND;
      } else {
        fields[HOUR_OF_DAY] = fields[MINUTE] = fields[SECONDS] = fields[MILLISECONDS] = 0;
      }
      var fixedDateJan1 = Utils.getFixedDate(year, GregorianCalendar.JANUARY, 1);
      var dayOfYear = fixedDate - fixedDateJan1 + 1;
      var fixDateMonth1 = fixedDate - date.dayOfMonth + 1;
      fields[DAY_OF_YEAR] = dayOfYear;
      fields[DAY_OF_WEEK_IN_MONTH] = toInt((date.dayOfMonth - 1) / 7) + 1;
      var weekOfYear = getWeekNumber(this, fixedDateJan1, fixedDate);
      if (weekOfYear === 0) {
        var fixedDec31 = fixedDateJan1 - 1;
        var prevJan1 = fixedDateJan1 - getYearLength(year - 1);
        weekOfYear = getWeekNumber(this, prevJan1, fixedDec31);
      } else if (weekOfYear >= 52) {
        var nextJan1 = fixedDateJan1 + getYearLength(year);
        var nextJan1st = getDayOfWeekDateOnOrBefore(nextJan1 + 6, this.firstDayOfWeek);
        var nDays = nextJan1st - nextJan1;
        if (nDays >= this.minimalDaysInFirstWeek && fixedDate >= nextJan1st - 7) {
          weekOfYear = 1;
        }
      }
      fields[WEEK_OF_YEAR] = weekOfYear;
      fields[WEEK_OF_MONTH] = getWeekNumber(this, fixDateMonth1, fixedDate);
      this.fieldsComputed = true;
    },
    computeTime: function () {
      if (!this.isSet(YEAR)) {
        throw new Error('year must be set for KISSY GregorianCalendar');
      }
      var fields = this.fields;
      var year = fields[YEAR];
      var timeOfDay = 0;
      if (this.isSet(HOUR_OF_DAY)) {
        timeOfDay += fields[HOUR_OF_DAY];
      }
      timeOfDay *= 60;
      timeOfDay += fields[MINUTE] || 0;
      timeOfDay *= 60;
      timeOfDay += fields[SECONDS] || 0;
      timeOfDay *= 1000;
      timeOfDay += fields[MILLISECONDS] || 0;
      var fixedDate = 0;
      fields[YEAR] = year;
      fixedDate = fixedDate + this.getFixedDate();
      var millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;
      millis -= this.timezoneOffset * ONE_MINUTE;
      this.time = millis;
      this.computeFields();
    },
    complete: function () {
      if (this.time === undefined) {
        this.computeTime();
      }
      if (!this.fieldsComputed) {
        this.computeFields();
      }
    },
    getFixedDate: function () {
      var self = this;
      var fields = self.fields;
      var firstDayOfWeekCfg = self.firstDayOfWeek;
      var year = fields[YEAR];
      var month = GregorianCalendar.JANUARY;
      if (self.isSet(MONTH)) {
        month = fields[MONTH];
        if (month > GregorianCalendar.DECEMBER) {
          year += toInt(month / 12);
          month %= 12;
        } else if (month < GregorianCalendar.JANUARY) {
          year += floorDivide(month / 12);
          month = mod(month, 12);
        }
      }
      var fixedDate = Utils.getFixedDate(year, month, 1);
      var firstDayOfWeek;
      var dayOfWeek = self.firstDayOfWeek;
      if (self.isSet(DAY_OF_WEEK)) {
        dayOfWeek = fields[DAY_OF_WEEK];
      }
      if (self.isSet(MONTH)) {
        if (self.isSet(DAY_OF_MONTH)) {
          fixedDate += fields[DAY_OF_MONTH] - 1;
        } else {
          if (self.isSet(WEEK_OF_MONTH)) {
            firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
            if (firstDayOfWeek - fixedDate >= self.minimalDaysInFirstWeek) {
              firstDayOfWeek -= 7;
            }
            if (dayOfWeek !== firstDayOfWeekCfg) {
              firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
            }
            fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_MONTH] - 1);
          } else {
            var dowim;
            if (self.isSet(DAY_OF_WEEK_IN_MONTH)) {
              dowim = fields[DAY_OF_WEEK_IN_MONTH];
            } else {
              dowim = 1;
            }
            var lastDate = 7 * dowim;
            if (dowim < 0) {
              lastDate = getMonthLength(year, month) + 7 * (dowim + 1);
            }
            fixedDate = getDayOfWeekDateOnOrBefore(fixedDate + lastDate - 1, dayOfWeek);
          }
        }
      } else {
        if (self.isSet(DAY_OF_YEAR)) {
          fixedDate += fields[DAY_OF_YEAR] - 1;
        } else {
          firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
          if (firstDayOfWeek - fixedDate >= self.minimalDaysInFirstWeek) {
            firstDayOfWeek -= 7;
          }
          if (dayOfWeek !== firstDayOfWeekCfg) {
            firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
          }
          fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_YEAR] - 1);
        }
      }
      return fixedDate;
    },
    getTime: function () {
      if (this.time === undefined) {
        this.computeTime();
      }
      return this.time;
    },
    setTime: function (time) {
      this.time = time;
      this.fieldsComputed = false;
      this.complete();
    },
    get: function (field) {
      this.complete();
      return this.fields[field];
    },
    set: function (field, v) {
      var len = arguments.length;
      if (len === 2) {
        this.fields[field] = v;
      } else if (len < MILLISECONDS + 1) {
        for (var i = 0; i < len; i++) {
          this.fields[YEAR + i] = arguments[i];
        }
      } else {
        throw new Error('illegal arguments for KISSY GregorianCalendar set');
      }
      this.time = undefined;
    },
    add: function (field, amount) {
      if (!amount) {
        return;
      }
      var self = this;
      var fields = self.fields;
      var value = self.get(field);
      if (field === YEAR) {
        value += amount;
        self.set(YEAR, value);
        adjustDayOfMonth(self);
      } else if (field === MONTH) {
        value += amount;
        var yearAmount = floorDivide(value / 12);
        value = mod(value, 12);
        if (yearAmount) {
          self.set(YEAR, fields[YEAR] + yearAmount);
        }
        self.set(MONTH, value);
        adjustDayOfMonth(self);
      } else {
        switch (field) {
        case HOUR_OF_DAY:
          amount *= ONE_HOUR;
          break;
        case MINUTE:
          amount *= ONE_MINUTE;
          break;
        case SECONDS:
          amount *= ONE_SECOND;
          break;
        case MILLISECONDS:
          break;
        case WEEK_OF_MONTH:
        case WEEK_OF_YEAR:
        case DAY_OF_WEEK_IN_MONTH:
          amount *= ONE_WEEK;
          break;
        case DAY_OF_WEEK:
        case DAY_OF_YEAR:
        case DAY_OF_MONTH:
          amount *= ONE_DAY;
          break;
        default:
          throw new Error('illegal field for add');
        }
        self.setTime(self.time + amount);
      }
    },
    getRolledValue: function (value, amount, min, max) {
      var diff = value - min;
      var range = max - min + 1;
      amount %= range;
      return min + (diff + amount + range) % range;
    },
    roll: function (field, amount) {
      if (!amount) {
        return;
      }
      var self = this;
      var value = self.get(field);
      var min = self.getActualMinimum(field);
      var max = self.getActualMaximum(field);
      value = self.getRolledValue(value, amount, min, max);
      self.set(field, value);
      switch (field) {
      case MONTH:
        adjustDayOfMonth(self);
        break;
      default:
        self.updateFieldsBySet(field);
        break;
      }
    },
    updateFieldsBySet: function (field) {
      var fields = this.fields;
      switch (field) {
      case WEEK_OF_MONTH:
        fields[DAY_OF_MONTH] = undefined;
        break;
      case DAY_OF_YEAR:
        fields[MONTH] = undefined;
        break;
      case DAY_OF_WEEK:
        fields[DAY_OF_MONTH] = undefined;
        break;
      case WEEK_OF_YEAR:
        fields[DAY_OF_YEAR] = undefined;
        fields[MONTH] = undefined;
        break;
      }
    },
    getTimezoneOffset: function () {
      return this.timezoneOffset;
    },
    setTimezoneOffset: function (timezoneOffset) {
      if (this.timezoneOffset !== timezoneOffset) {
        this.fieldsComputed = undefined;
        this.timezoneOffset = timezoneOffset;
      }
    },
    setFirstDayOfWeek: function (firstDayOfWeek) {
      if (this.firstDayOfWeek !== firstDayOfWeek) {
        this.firstDayOfWeek = firstDayOfWeek;
        this.fieldsComputed = false;
      }
    },
    getFirstDayOfWeek: function () {
      return this.firstDayOfWeek;
    },
    setMinimalDaysInFirstWeek: function (minimalDaysInFirstWeek) {
      if (this.minimalDaysInFirstWeek !== minimalDaysInFirstWeek) {
        this.minimalDaysInFirstWeek = minimalDaysInFirstWeek;
        this.fieldsComputed = false;
      }
    },
    getMinimalDaysInFirstWeek: function () {
      return this.minimalDaysInFirstWeek;
    },
    getWeeksInWeekYear: function () {
      var weekYear = this.getWeekYear();
      if (weekYear === this.get(YEAR)) {
        return this.getActualMaximum(WEEK_OF_YEAR);
      }
      var gc = this.clone();
      gc.setWeekDate(weekYear, 2, this.get(DAY_OF_WEEK));
      return gc.getActualMaximum(WEEK_OF_YEAR);
    },
    getWeekYear: function () {
      var year = this.get(YEAR);
      var weekOfYear = this.get(WEEK_OF_YEAR);
      var month = this.get(MONTH);
      if (month === GregorianCalendar.JANUARY) {
        if (weekOfYear >= 52) {
          --year;
        }
      } else if (month === GregorianCalendar.DECEMBER) {
        if (weekOfYear === 1) {
          ++year;
        }
      }
      return year;
    },
    setWeekDate: function (weekYear, weekOfYear, dayOfWeek) {
      if (dayOfWeek < GregorianCalendar.SUNDAY || dayOfWeek > GregorianCalendar.SATURDAY) {
        throw new Error('invalid dayOfWeek: ' + dayOfWeek);
      }
      var fields = this.fields;
      var gc = this.clone();
      gc.clear();
      gc.setTimezoneOffset(0);
      gc.set(YEAR, weekYear);
      gc.set(WEEK_OF_YEAR, 1);
      gc.set(DAY_OF_WEEK, this.getFirstDayOfWeek());
      var days = dayOfWeek - this.getFirstDayOfWeek();
      if (days < 0) {
        days += 7;
      }
      days += 7 * (weekOfYear - 1);
      if (days !== 0) {
        gc.add(DAY_OF_YEAR, days);
      } else {
        gc.complete();
      }
      fields[YEAR] = gc.get(YEAR);
      fields[MONTH] = gc.get(MONTH);
      fields[DAY_OF_MONTH] = gc.get(DAY_OF_MONTH);
      this.complete();
    },
    clone: function () {
      if (this.time === undefined) {
        this.computeTime();
      }
      var cal = new GregorianCalendar(this.timezoneOffset, this.locale);
      cal.setTime(this.time);
      return cal;
    },
    equals: function (obj) {
      return this.getTime() === obj.getTime() && this.firstDayOfWeek === obj.firstDayOfWeek && this.timezoneOffset === obj.timezoneOffset && this.minimalDaysInFirstWeek === obj.minimalDaysInFirstWeek;
    },
    clear: function (field) {
      if (field === undefined) {
        this.field = [];
      } else {
        this.fields[field] = undefined;
      }
      this.time = undefined;
      this.fieldsComputed = false;
    }
  };
  var GregorianCalendarProto = GregorianCalendar.prototype;
  Utils.each(fields, function (f, index) {
    if (f) {
      GregorianCalendarProto['get' + f] = function () {
        return this.get(index);
      };
      GregorianCalendarProto['isSet' + f] = function () {
        return this.isSet(index);
      };
      GregorianCalendarProto['set' + f] = function (v) {
        return this.set(index, v);
      };
      GregorianCalendarProto['add' + f] = function (v) {
        return this.add(index, v);
      };
      GregorianCalendarProto['roll' + f] = function (v) {
        return this.roll(index, v);
      };
    }
  });
  function adjustDayOfMonth(self) {
    var fields = self.fields;
    var year = fields[YEAR];
    var month = fields[MONTH];
    var monthLen = getMonthLength(year, month);
    var dayOfMonth = fields[DAY_OF_MONTH];
    if (dayOfMonth > monthLen) {
      self.set(DAY_OF_MONTH, monthLen);
    }
  }
  function getMonthLength(year, month) {
    return isLeapYear(year) ? LEAP_MONTH_LENGTH[month] : MONTH_LENGTH[month];
  }
  function getYearLength(year) {
    return isLeapYear(year) ? 366 : 365;
  }
  function getWeekNumber(self, fixedDay1, fixedDate) {
    var fixedDay1st = getDayOfWeekDateOnOrBefore(fixedDay1 + 6, self.firstDayOfWeek);
    var nDays = fixedDay1st - fixedDay1;
    if (nDays >= self.minimalDaysInFirstWeek) {
      fixedDay1st -= 7;
    }
    var normalizedDayOfPeriod = fixedDate - fixedDay1st;
    return floorDivide(normalizedDayOfPeriod / 7) + 1;
  }
  function getDayOfWeekDateOnOrBefore(fixedDate, dayOfWeek) {
    return fixedDate - mod(fixedDate - dayOfWeek, 7);
  }
  exports = GregorianCalendar;
  GregorianCalendar.version = '1.0.4';
  GregorianCalendar.locales = { 'default': defaultLocale };
  return exports;
}();
module.exports = gregorianCalendar;
});