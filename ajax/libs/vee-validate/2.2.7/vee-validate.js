/**
  * vee-validate v2.2.7
  * (c) 2019 Abdelrahman Awad
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VeeValidate = factory());
}(this, function () { 'use strict';

  function toInteger (dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN
    }

    var number = Number(dirtyNumber);

    if (isNaN(number)) {
      return number
    }

    return number < 0 ? Math.ceil(number) : Math.floor(number)
  }

  var MILLISECONDS_IN_MINUTE = 60000;

  /**
   * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
   * They usually appear for dates that denote time before the timezones were introduced
   * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
   * and GMT+01:00:00 after that date)
   *
   * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
   * which would lead to incorrect calculations.
   *
   * This function returns the timezone offset in milliseconds that takes seconds in account.
   */
  function getTimezoneOffsetInMilliseconds (dirtyDate) {
    var date = new Date(dirtyDate.getTime());
    var baseTimezoneOffset = date.getTimezoneOffset();
    date.setSeconds(0, 0);
    var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE;

    return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset
  }

  var MILLISECONDS_IN_HOUR = 3600000;
  var MILLISECONDS_IN_MINUTE$1 = 60000;
  var DEFAULT_ADDITIONAL_DIGITS = 2;

  var patterns = {
    dateTimeDelimeter: /[T ]/,
    plainTime: /:/,
    timeZoneDelimeter: /[Z ]/i,

    // year tokens
    YY: /^(\d{2})$/,
    YYY: [
      /^([+-]\d{2})$/, // 0 additional digits
      /^([+-]\d{3})$/, // 1 additional digit
      /^([+-]\d{4})$/ // 2 additional digits
    ],
    YYYY: /^(\d{4})/,
    YYYYY: [
      /^([+-]\d{4})/, // 0 additional digits
      /^([+-]\d{5})/, // 1 additional digit
      /^([+-]\d{6})/ // 2 additional digits
    ],

    // date tokens
    MM: /^-(\d{2})$/,
    DDD: /^-?(\d{3})$/,
    MMDD: /^-?(\d{2})-?(\d{2})$/,
    Www: /^-?W(\d{2})$/,
    WwwD: /^-?W(\d{2})-?(\d{1})$/,

    HH: /^(\d{2}([.,]\d*)?)$/,
    HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
    HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,

    // timezone tokens
    timezone: /([Z+-].*)$/,
    timezoneZ: /^(Z)$/,
    timezoneHH: /^([+-])(\d{2})$/,
    timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
  };

  /**
   * @name toDate
   * @category Common Helpers
   * @summary Convert the given argument to an instance of Date.
   *
   * @description
   * Convert the given argument to an instance of Date.
   *
   * If the argument is an instance of Date, the function returns its clone.
   *
   * If the argument is a number, it is treated as a timestamp.
   *
   * If an argument is a string, the function tries to parse it.
   * Function accepts complete ISO 8601 formats as well as partial implementations.
   * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
   * If the function cannot parse the string or the values are invalid, it returns Invalid Date.
   *
   * If the argument is none of the above, the function returns Invalid Date.
   *
   * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
   * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
   *
   * @param {Date|String|Number} argument - the value to convert
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
   * @returns {Date} the parsed date in the local time zone
   * @throws {TypeError} 1 argument required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Convert string '2014-02-11T11:30:30' to date:
   * var result = toDate('2014-02-11T11:30:30')
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert string '+02014101' to date,
   * // if the additional number of digits in the extended year format is 1:
   * var result = toDate('+02014101', {additionalDigits: 1})
   * //=> Fri Apr 11 2014 00:00:00
   */
  function toDate (argument, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    if (argument === null) {
      return new Date(NaN)
    }

    var options = dirtyOptions || {};

    var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : toInteger(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError('additionalDigits must be 0, 1 or 2')
    }

    // Clone the date
    if (argument instanceof Date ||
      (typeof argument === 'object' && Object.prototype.toString.call(argument) === '[object Date]')
    ) {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime())
    } else if (typeof argument === 'number' || Object.prototype.toString.call(argument) === '[object Number]') {
      return new Date(argument)
    } else if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
      return new Date(NaN)
    }

    var dateStrings = splitDateString(argument);

    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    var year = parseYearResult.year;
    var restDateString = parseYearResult.restDateString;

    var date = parseDate(restDateString, year);

    if (isNaN(date)) {
      return new Date(NaN)
    }

    if (date) {
      var timestamp = date.getTime();
      var time = 0;
      var offset;

      if (dateStrings.time) {
        time = parseTime(dateStrings.time);

        if (isNaN(time)) {
          return new Date(NaN)
        }
      }

      if (dateStrings.timezone) {
        offset = parseTimezone(dateStrings.timezone);
        if (isNaN(offset)) {
          return new Date(NaN)
        }
      } else {
        // get offset accurate to hour in timezones that change offset
        offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time));
        offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time + offset));
      }

      return new Date(timestamp + time + offset)
    } else {
      return new Date(NaN)
    }
  }

  function splitDateString (dateString) {
    var dateStrings = {};
    var array = dateString.split(patterns.dateTimeDelimeter);
    var timeString;

    if (patterns.plainTime.test(array[0])) {
      dateStrings.date = null;
      timeString = array[0];
    } else {
      dateStrings.date = array[0];
      timeString = array[1];
      if (patterns.timeZoneDelimeter.test(dateStrings.date)) {
        dateStrings.date = dateString.split(patterns.timeZoneDelimeter)[0];
        timeString = dateString.substr(dateStrings.date.length, dateString.length);
      }
    }

    if (timeString) {
      var token = patterns.timezone.exec(timeString);
      if (token) {
        dateStrings.time = timeString.replace(token[1], '');
        dateStrings.timezone = token[1];
      } else {
        dateStrings.time = timeString;
      }
    }

    return dateStrings
  }

  function parseYear (dateString, additionalDigits) {
    var patternYYY = patterns.YYY[additionalDigits];
    var patternYYYYY = patterns.YYYYY[additionalDigits];

    var token;

    // YYYY or ±YYYYY
    token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
    if (token) {
      var yearString = token[1];
      return {
        year: parseInt(yearString, 10),
        restDateString: dateString.slice(yearString.length)
      }
    }

    // YY or ±YYY
    token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
    if (token) {
      var centuryString = token[1];
      return {
        year: parseInt(centuryString, 10) * 100,
        restDateString: dateString.slice(centuryString.length)
      }
    }

    // Invalid ISO-formatted year
    return {
      year: null
    }
  }

  function parseDate (dateString, year) {
    // Invalid ISO-formatted year
    if (year === null) {
      return null
    }

    var token;
    var date;
    var month;
    var week;

    // YYYY
    if (dateString.length === 0) {
      date = new Date(0);
      date.setUTCFullYear(year);
      return date
    }

    // YYYY-MM
    token = patterns.MM.exec(dateString);
    if (token) {
      date = new Date(0);
      month = parseInt(token[1], 10) - 1;

      if (!validateDate(year, month)) {
        return new Date(NaN)
      }

      date.setUTCFullYear(year, month);
      return date
    }

    // YYYY-DDD or YYYYDDD
    token = patterns.DDD.exec(dateString);
    if (token) {
      date = new Date(0);
      var dayOfYear = parseInt(token[1], 10);

      if (!validateDayOfYearDate(year, dayOfYear)) {
        return new Date(NaN)
      }

      date.setUTCFullYear(year, 0, dayOfYear);
      return date
    }

    // YYYY-MM-DD or YYYYMMDD
    token = patterns.MMDD.exec(dateString);
    if (token) {
      date = new Date(0);
      month = parseInt(token[1], 10) - 1;
      var day = parseInt(token[2], 10);

      if (!validateDate(year, month, day)) {
        return new Date(NaN)
      }

      date.setUTCFullYear(year, month, day);
      return date
    }

    // YYYY-Www or YYYYWww
    token = patterns.Www.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;

      if (!validateWeekDate(year, week)) {
        return new Date(NaN)
      }

      return dayOfISOWeekYear(year, week)
    }

    // YYYY-Www-D or YYYYWwwD
    token = patterns.WwwD.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      var dayOfWeek = parseInt(token[2], 10) - 1;

      if (!validateWeekDate(year, week, dayOfWeek)) {
        return new Date(NaN)
      }

      return dayOfISOWeekYear(year, week, dayOfWeek)
    }

    // Invalid ISO-formatted date
    return null
  }

  function parseTime (timeString) {
    var token;
    var hours;
    var minutes;

    // hh
    token = patterns.HH.exec(timeString);
    if (token) {
      hours = parseFloat(token[1].replace(',', '.'));

      if (!validateTime(hours)) {
        return NaN
      }

      return (hours % 24) * MILLISECONDS_IN_HOUR
    }

    // hh:mm or hhmm
    token = patterns.HHMM.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseFloat(token[2].replace(',', '.'));

      if (!validateTime(hours, minutes)) {
        return NaN
      }

      return (hours % 24) * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE$1
    }

    // hh:mm:ss or hhmmss
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseInt(token[2], 10);
      var seconds = parseFloat(token[3].replace(',', '.'));

      if (!validateTime(hours, minutes, seconds)) {
        return NaN
      }

      return (hours % 24) * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE$1 +
        seconds * 1000
    }

    // Invalid ISO-formatted time
    return null
  }

  function parseTimezone (timezoneString) {
    var token;
    var absoluteOffset;

    // Z
    token = patterns.timezoneZ.exec(timezoneString);
    if (token) {
      return 0
    }

    var hours;

    // ±hh
    token = patterns.timezoneHH.exec(timezoneString);
    if (token) {
      hours = parseInt(token[2], 10);

      if (!validateTimezone(hours)) {
        return NaN
      }

      absoluteOffset = hours * MILLISECONDS_IN_HOUR;
      return (token[1] === '+') ? -absoluteOffset : absoluteOffset
    }

    // ±hh:mm or ±hhmm
    token = patterns.timezoneHHMM.exec(timezoneString);
    if (token) {
      hours = parseInt(token[2], 10);
      var minutes = parseInt(token[3], 10);

      if (!validateTimezone(hours, minutes)) {
        return NaN
      }

      absoluteOffset = hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE$1;
      return (token[1] === '+') ? -absoluteOffset : absoluteOffset
    }

    return 0
  }

  function dayOfISOWeekYear (isoWeekYear, week, day) {
    week = week || 0;
    day = day || 0;
    var date = new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    var fourthOfJanuaryDay = date.getUTCDay() || 7;
    var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date
  }

  // Validation functions

  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function isLeapYearIndex (year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
  }

  function validateDate (year, month, date) {
    if (month < 0 || month > 11) {
      return false
    }

    if (date != null) {
      if (date < 1) {
        return false
      }

      var isLeapYear = isLeapYearIndex(year);
      if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
        return false
      }
      if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
        return false
      }
    }

    return true
  }

  function validateDayOfYearDate (year, dayOfYear) {
    if (dayOfYear < 1) {
      return false
    }

    var isLeapYear = isLeapYearIndex(year);
    if (isLeapYear && dayOfYear > 366) {
      return false
    }
    if (!isLeapYear && dayOfYear > 365) {
      return false
    }

    return true
  }

  function validateWeekDate (year, week, day) {
    if (week < 0 || week > 52) {
      return false
    }

    if (day != null && (day < 0 || day > 6)) {
      return false
    }

    return true
  }

  function validateTime (hours, minutes, seconds) {
    if (hours != null && (hours < 0 || hours >= 25)) {
      return false
    }

    if (minutes != null && (minutes < 0 || minutes >= 60)) {
      return false
    }

    if (seconds != null && (seconds < 0 || seconds >= 60)) {
      return false
    }

    return true
  }

  function validateTimezone (hours, minutes) {
    if (minutes != null && (minutes < 0 || minutes > 59)) {
      return false
    }

    return true
  }

  /**
   * @name addMilliseconds
   * @category Millisecond Helpers
   * @summary Add the specified number of milliseconds to the given date.
   *
   * @description
   * Add the specified number of milliseconds to the given date.
   *
   * @param {Date|String|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be added
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Date} the new date with the milliseconds added
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
   * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:30.750
   */
  function addMilliseconds (dirtyDate, dirtyAmount, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var timestamp = toDate(dirtyDate, dirtyOptions).getTime();
    var amount = toInteger(dirtyAmount);
    return new Date(timestamp + amount)
  }

  /**
   * @name isValid
   * @category Common Helpers
   * @summary Is the given date valid?
   *
   * @description
   * Returns false if argument is Invalid Date and true otherwise.
   * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * Invalid Date is a Date, whose time value is NaN.
   *
   * Time value of Date: http://es5.github.io/#x15.9.1.1
   *
   * @param {*} date - the date to check
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Boolean} the date is valid
   * @throws {TypeError} 1 argument required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // For the valid date:
   * var result = isValid(new Date(2014, 1, 31))
   * //=> true
   *
   * @example
   * // For the value, convertable into a date:
   * var result = isValid('2014-02-31')
   * //=> true
   *
   * @example
   * // For the invalid date:
   * var result = isValid(new Date(''))
   * //=> false
   */
  function isValid (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    return !isNaN(date)
  }

  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };

  function formatDistance (token, count, options) {
    options = options || {};

    var result;
    if (typeof formatDistanceLocale[token] === 'string') {
      result = formatDistanceLocale[token];
    } else if (count === 1) {
      result = formatDistanceLocale[token].one;
    } else {
      result = formatDistanceLocale[token].other.replace('{{count}}', count);
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  function buildFormatLongFn (args) {
    return function (dirtyOptions) {
      var options = dirtyOptions || {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format = args.formats[width] || args.formats[args.defaultWidth];
      return format
    }
  }

  var dateFormats = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy'
  };

  var timeFormats = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a'
  };

  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}'
  };

  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: 'full'
    }),

    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: 'full'
    }),

    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: 'full'
    })
  };

  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P'
  };

  function formatRelative (token, date, baseDate, options) {
    return formatRelativeLocale[token]
  }

  function buildLocalizeFn (args) {
    return function (dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var context = options.context ? String(options.context) : 'standalone';

      var valuesArray;
      if (context === 'formatting' && args.formattingValues) {
        valuesArray = args.formattingValues[width] || args.formattingValues[args.defaultFormattingWidth];
      } else {
        valuesArray = args.values[width] || args.values[args.defaultWidth];
      }
      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index]
    }
  }

  var eraValues = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini']
  };

  var quarterValues = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
  };

  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var monthValues = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  var dayValues = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };

  var dayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    }
  };

  function ordinalNumber (dirtyNumber, dirtyOptions) {
    var number = Number(dirtyNumber);

    // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`:
    //
    //   var options = dirtyOptions || {}
    //   var unit = String(options.unit)
    //
    // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'

    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + 'st'
        case 2:
          return number + 'nd'
        case 3:
          return number + 'rd'
      }
    }
    return number + 'th'
  }

  var localize = {
    ordinalNumber: ordinalNumber,

    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: 'wide'
    }),

    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: 'wide',
      argumentCallback: function (quarter) {
        return Number(quarter) - 1
      }
    }),

    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: 'wide'
    }),

    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: 'wide'
    }),

    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: 'wide',
      formattingValues: formattingDayPeriodValues,
      defaulFormattingWidth: 'wide'
    })
  };

  function buildMatchPatternFn (args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};

      var matchResult = string.match(args.matchPattern);
      if (!matchResult) {
        return null
      }
      var matchedString = matchResult[0];

      var parseResult = string.match(args.parsePattern);
      if (!parseResult) {
        return null
      }
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;

      return {
        value: value,
        rest: string.slice(matchedString.length)
      }
    }
  }

  function buildMatchFn (args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};
      var width = options.width;

      var matchPattern = (width && args.matchPatterns[width]) || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);

      if (!matchResult) {
        return null
      }
      var matchedString = matchResult[0];

      var parsePatterns = (width && args.parsePatterns[width]) || args.parsePatterns[args.defaultParseWidth];

      var value;
      if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
        value = parsePatterns.findIndex(function (pattern) {
          return pattern.test(string)
        });
      } else {
        value = findKey(parsePatterns, function (pattern) {
          return pattern.test(string)
        });
      }

      value = args.valueCallback ? args.valueCallback(value) : value;
      value = options.valueCallback ? options.valueCallback(value) : value;

      return {
        value: value,
        rest: string.slice(matchedString.length)
      }
    }
  }

  function findKey (object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key
      }
    }
  }

  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;

  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };

  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };

  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };

  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };

  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };

  var match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function (value) {
        return parseInt(value, 10)
      }
    }),

    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseEraPatterns,
      defaultParseWidth: 'any'
    }),

    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: 'any',
      valueCallback: function (index) {
        return index + 1
      }
    }),

    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: 'any'
    }),

    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseDayPatterns,
      defaultParseWidth: 'any'
    }),

    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: 'any',
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: 'any'
    })
  };

  /**
   * @type {Locale}
   * @category Locales
   * @summary English locale (United States).
   * @language English
   * @iso-639-2 eng
   * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
   * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
   */
  var locale = {
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
      weekStartsOn: 0 /* Sunday */,
      firstWeekContainsDate: 1
    }
  };

  var MILLISECONDS_IN_DAY = 86400000;

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function getUTCDayOfYear (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY) + 1
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function startOfUTCISOWeek (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var weekStartsOn = 1;

    var date = toDate(dirtyDate, dirtyOptions);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function getUTCISOWeekYear (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var year = date.getUTCFullYear();

    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear, dirtyOptions);

    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear, dirtyOptions);

    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year
    } else {
      return year - 1
    }
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function startOfUTCISOWeekYear (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var year = getUTCISOWeekYear(dirtyDate, dirtyOptions);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCISOWeek(fourthOfJanuary, dirtyOptions);
    return date
  }

  var MILLISECONDS_IN_WEEK = 604800000;

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function getUTCISOWeek (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var diff = startOfUTCISOWeek(date, dirtyOptions).getTime() - startOfUTCISOWeekYear(date, dirtyOptions).getTime();

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function startOfUTCWeek (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
    }

    var date = toDate(dirtyDate, options);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function getUTCWeekYear (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var year = date.getUTCFullYear();

    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale &&
      locale.options &&
      locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate =
      localeFirstWeekContainsDate == null
        ? 1
        : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate =
      options.firstWeekContainsDate == null
        ? defaultFirstWeekContainsDate
        : toInteger(options.firstWeekContainsDate);

    // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively')
    }

    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);

    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);

    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year
    } else {
      return year - 1
    }
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function startOfUTCWeekYear (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale &&
      locale.options &&
      locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate =
      localeFirstWeekContainsDate == null
        ? 1
        : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate =
      options.firstWeekContainsDate == null
        ? defaultFirstWeekContainsDate
        : toInteger(options.firstWeekContainsDate);

    var year = getUTCWeekYear(dirtyDate, dirtyOptions);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCWeek(firstWeek, dirtyOptions);
    return date
  }

  var MILLISECONDS_IN_WEEK$1 = 604800000;

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function getUTCWeek (dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var diff = startOfUTCWeek(date, dirtyOptions).getTime() - startOfUTCWeekYear(date, dirtyOptions).getTime();

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1
  }

  var dayPeriodEnum = {
    am: 'am',
    pm: 'pm',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  };

  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
   * |  p! | Long localized time            |  P! | Long localized date            |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   * - `P` is long localized date format
   * - `p` is long localized time format
   */

  var formatters = {
    // Era
    G: function (date, token, localize) {
      var era = date.getUTCFullYear() > 0 ? 1 : 0;
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return localize.era(era, {width: 'abbreviated'})
        // A, B
        case 'GGGGG':
          return localize.era(era, {width: 'narrow'})
        // Anno Domini, Before Christ
        case 'GGGG':
        default:
          return localize.era(era, {width: 'wide'})
      }
    },

    // Year
    y: function (date, token, localize, options) {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

      var signedYear = date.getUTCFullYear();

      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var year = signedYear > 0 ? signedYear : 1 - signedYear;

      // Two digit year
      if (token === 'yy') {
        var twoDigitYear = year % 100;
        return addLeadingZeros(twoDigitYear, 2)
      }

      // Ordinal number
      if (token === 'yo') {
        return localize.ordinalNumber(year, {unit: 'year'})
      }

      // Padding
      return addLeadingZeros(year, token.length)
    },

    // Local week-numbering year
    Y: function (date, token, localize, options) {
      var signedWeekYear = getUTCWeekYear(date, options);
      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

      // Two digit year
      if (token === 'YY') {
        var twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2)
      }

      // Ordinal number
      if (token === 'Yo') {
        return localize.ordinalNumber(weekYear, {unit: 'year'})
      }

      // Padding
      return addLeadingZeros(weekYear, token.length)
    },

    // ISO week-numbering year
    R: function (date, token, localize, options) {
      var isoWeekYear = getUTCISOWeekYear(date, options);

      // Padding
      return addLeadingZeros(isoWeekYear, token.length)
    },

    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function (date, token, localize, options) {
      var year = date.getUTCFullYear();
      return addLeadingZeros(year, token.length)
    },

    // Quarter
    Q: function (date, token, localize, options) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
          return String(quarter)
        // 01, 02, 03, 04
        case 'QQ':
          return addLeadingZeros(quarter, 2)
        // 1st, 2nd, 3rd, 4th
        case 'Qo':
          return localize.ordinalNumber(quarter, {unit: 'quarter'})
        // Q1, Q2, Q3, Q4
        case 'QQQ':
          return localize.quarter(quarter, {width: 'abbreviated', context: 'formatting'})
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'QQQQQ':
          return localize.quarter(quarter, {width: 'narrow', context: 'formatting'})
        // 1st quarter, 2nd quarter, ...
        case 'QQQQ':
        default:
          return localize.quarter(quarter, {width: 'wide', context: 'formatting'})
      }
    },

    // Stand-alone quarter
    q: function (date, token, localize, options) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
          return String(quarter)
        // 01, 02, 03, 04
        case 'qq':
          return addLeadingZeros(quarter, 2)
        // 1st, 2nd, 3rd, 4th
        case 'qo':
          return localize.ordinalNumber(quarter, {unit: 'quarter'})
        // Q1, Q2, Q3, Q4
        case 'qqq':
          return localize.quarter(quarter, {width: 'abbreviated', context: 'standalone'})
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'qqqqq':
          return localize.quarter(quarter, {width: 'narrow', context: 'standalone'})
        // 1st quarter, 2nd quarter, ...
        case 'qqqq':
        default:
          return localize.quarter(quarter, {width: 'wide', context: 'standalone'})
      }
    },

    // Month
    M: function (date, token, localize, options) {
      var month = date.getUTCMonth();
      switch (token) {
        // 1, 2, ..., 12
        case 'M':
          return String(month + 1)
        // 01, 02, ..., 12
        case 'MM':
          return addLeadingZeros(month + 1, 2)
        // 1st, 2nd, ..., 12th
        case 'Mo':
          return localize.ordinalNumber(month + 1, {unit: 'month'})
        // Jan, Feb, ..., Dec
        case 'MMM':
          return localize.month(month, {width: 'abbreviated', context: 'formatting'})
        // J, F, ..., D
        case 'MMMMM':
          return localize.month(month, {width: 'narrow', context: 'formatting'})
        // January, February, ..., December
        case 'MMMM':
        default:
          return localize.month(month, {width: 'wide', context: 'formatting'})
      }
    },

    // Stand-alone month
    L: function (date, token, localize, options) {
      var month = date.getUTCMonth();
      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return String(month + 1)
        // 01, 02, ..., 12
        case 'LL':
          return addLeadingZeros(month + 1, 2)
        // 1st, 2nd, ..., 12th
        case 'Lo':
          return localize.ordinalNumber(month + 1, {unit: 'month'})
        // Jan, Feb, ..., Dec
        case 'LLL':
          return localize.month(month, {width: 'abbreviated', context: 'standalone'})
        // J, F, ..., D
        case 'LLLLL':
          return localize.month(month, {width: 'narrow', context: 'standalone'})
        // January, February, ..., December
        case 'LLLL':
        default:
          return localize.month(month, {width: 'wide', context: 'standalone'})
      }
    },

    // Local week of year
    w: function (date, token, localize, options) {
      var week = getUTCWeek(date, options);

      if (token === 'wo') {
        return localize.ordinalNumber(week, {unit: 'week'})
      }

      return addLeadingZeros(week, token.length)
    },

    // ISO week of year
    I: function (date, token, localize, options) {
      var isoWeek = getUTCISOWeek(date, options);

      if (token === 'Io') {
        return localize.ordinalNumber(isoWeek, {unit: 'week'})
      }

      return addLeadingZeros(isoWeek, token.length)
    },

    // Day of the month
    d: function (date, token, localize, options) {
      var dayOfMonth = date.getUTCDate();

      if (token === 'do') {
        return localize.ordinalNumber(dayOfMonth, {unit: 'date'})
      }

      return addLeadingZeros(dayOfMonth, token.length)
    },

    // Day of year
    D: function (date, token, localize, options) {
      var dayOfYear = getUTCDayOfYear(date, options);

      if (token === 'Do') {
        return localize.ordinalNumber(dayOfYear, {unit: 'dayOfYear'})
      }

      return addLeadingZeros(dayOfYear, token.length)
    },

    // Day of week
    E: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return localize.day(dayOfWeek, {width: 'abbreviated', context: 'formatting'})
        // T
        case 'EEEEE':
          return localize.day(dayOfWeek, {width: 'narrow', context: 'formatting'})
        // Tu
        case 'EEEEEE':
          return localize.day(dayOfWeek, {width: 'short', context: 'formatting'})
        // Tuesday
        case 'EEEE':
        default:
          return localize.day(dayOfWeek, {width: 'wide', context: 'formatting'})
      }
    },

    // Local day of week
    e: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = ((dayOfWeek - options.weekStartsOn + 8) % 7) || 7;
      switch (token) {
        // Numerical value (Nth day of week with current locale or weekStartsOn)
        case 'e':
          return String(localDayOfWeek)
        // Padded numerical value
        case 'ee':
          return addLeadingZeros(localDayOfWeek, 2)
        // 1st, 2nd, ..., 7th
        case 'eo':
          return localize.ordinalNumber(localDayOfWeek, {unit: 'day'})
        case 'eee':
          return localize.day(dayOfWeek, {width: 'abbreviated', context: 'formatting'})
        // T
        case 'eeeee':
          return localize.day(dayOfWeek, {width: 'narrow', context: 'formatting'})
        // Tu
        case 'eeeeee':
          return localize.day(dayOfWeek, {width: 'short', context: 'formatting'})
        // Tuesday
        case 'eeee':
        default:
          return localize.day(dayOfWeek, {width: 'wide', context: 'formatting'})
      }
    },

    // Stand-alone local day of week
    c: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = ((dayOfWeek - options.weekStartsOn + 8) % 7) || 7;
      switch (token) {
        // Numerical value (same as in `e`)
        case 'c':
          return String(localDayOfWeek)
        // Padded numberical value
        case 'cc':
          return addLeadingZeros(localDayOfWeek, token.length)
        // 1st, 2nd, ..., 7th
        case 'co':
          return localize.ordinalNumber(localDayOfWeek, {unit: 'day'})
        case 'ccc':
          return localize.day(dayOfWeek, {width: 'abbreviated', context: 'standalone'})
        // T
        case 'ccccc':
          return localize.day(dayOfWeek, {width: 'narrow', context: 'standalone'})
        // Tu
        case 'cccccc':
          return localize.day(dayOfWeek, {width: 'short', context: 'standalone'})
        // Tuesday
        case 'cccc':
        default:
          return localize.day(dayOfWeek, {width: 'wide', context: 'standalone'})
      }
    },

    // ISO day of week
    i: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        // 2
        case 'i':
          return String(isoDayOfWeek)
        // 02
        case 'ii':
          return addLeadingZeros(isoDayOfWeek, token.length)
        // 2nd
        case 'io':
          return localize.ordinalNumber(isoDayOfWeek, {unit: 'day'})
        // Tue
        case 'iii':
          return localize.day(dayOfWeek, {width: 'abbreviated', context: 'formatting'})
        // T
        case 'iiiii':
          return localize.day(dayOfWeek, {width: 'narrow', context: 'formatting'})
        // Tu
        case 'iiiiii':
          return localize.day(dayOfWeek, {width: 'short', context: 'formatting'})
        // Tuesday
        case 'iiii':
        default:
          return localize.day(dayOfWeek, {width: 'wide', context: 'formatting'})
      }
    },

    // AM or PM
    a: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue = (hours / 12) >= 1 ? 'pm' : 'am';

      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'abbreviated', context: 'formatting'})
        case 'aaaaa':
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'narrow', context: 'formatting'})
        case 'aaaa':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'wide', context: 'formatting'})
      }
    },

    // AM, PM, midnight, noon
    b: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = (hours / 12) >= 1 ? 'pm' : 'am';
      }

      switch (token) {
        case 'b':
        case 'bb':
        case 'bbb':
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'abbreviated', context: 'formatting'})
        case 'bbbbb':
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'narrow', context: 'formatting'})
        case 'bbbb':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'wide', context: 'formatting'})
      }
    },

    // in the morning, in the afternoon, in the evening, at night
    B: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }

      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'abbreviated', context: 'formatting'})
        case 'BBBBB':
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'narrow', context: 'formatting'})
        case 'BBBB':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {width: 'wide', context: 'formatting'})
      }
    },

    // Hour [1-12]
    h: function (date, token, localize, options) {
      var hours = date.getUTCHours() % 12;

      if (hours === 0) {
        hours = 12;
      }

      if (token === 'ho') {
        return localize.ordinalNumber(hours, {unit: 'hour'})
      }

      return addLeadingZeros(hours, token.length)
    },

    // Hour [0-23]
    H: function (date, token, localize, options) {
      var hours = date.getUTCHours();

      if (token === 'Ho') {
        return localize.ordinalNumber(hours, {unit: 'hour'})
      }

      return addLeadingZeros(hours, token.length)
    },

    // Hour [0-11]
    K: function (date, token, localize, options) {
      var hours = date.getUTCHours() % 12;

      if (token === 'Ko') {
        return localize.ordinalNumber(hours, {unit: 'hour'})
      }

      return addLeadingZeros(hours, token.length)
    },

    // Hour [1-24]
    k: function (date, token, localize, options) {
      var hours = date.getUTCHours();

      if (hours === 0) {
        hours = 24;
      }

      if (token === 'ko') {
        return localize.ordinalNumber(hours, {unit: 'hour'})
      }

      return addLeadingZeros(hours, token.length)
    },

    // Minute
    m: function (date, token, localize, options) {
      var minutes = date.getUTCMinutes();

      if (token === 'mo') {
        return localize.ordinalNumber(minutes, {unit: 'minute'})
      }

      return addLeadingZeros(minutes, token.length)
    },

    // Second
    s: function (date, token, localize, options) {
      var seconds = date.getUTCSeconds();

      if (token === 'so') {
        return localize.ordinalNumber(seconds, {unit: 'second'})
      }

      return addLeadingZeros(seconds, token.length)
    },

    // Fraction of second
    S: function (date, token, localize, options) {
      var numberOfDigits = token.length;
      var milliseconds = date.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return addLeadingZeros(fractionalSeconds, numberOfDigits)
    },

    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function (date, token, localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      if (timezoneOffset === 0) {
        return 'Z'
      }

      switch (token) {
        // Hours and optional minutes
        case 'X':
          return formatTimezoneWithOptionalMinutes(timezoneOffset)

        // Hours, minutes and optional seconds without `:` delimeter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XX`
        case 'XXXX':
        case 'XX': // Hours and minutes without `:` delimeter
          return formatTimezone(timezoneOffset)

        // Hours, minutes and optional seconds with `:` delimeter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XXX`
        case 'XXXXX':
        case 'XXX': // Hours and minutes with `:` delimeter
        default:
          return formatTimezone(timezoneOffset, ':')
      }
    },

    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function (date, token, localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Hours and optional minutes
        case 'x':
          return formatTimezoneWithOptionalMinutes(timezoneOffset)

        // Hours, minutes and optional seconds without `:` delimeter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xx`
        case 'xxxx':
        case 'xx': // Hours and minutes without `:` delimeter
          return formatTimezone(timezoneOffset)

        // Hours, minutes and optional seconds with `:` delimeter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xxx`
        case 'xxxxx':
        case 'xxx': // Hours and minutes with `:` delimeter
        default:
          return formatTimezone(timezoneOffset, ':')
      }
    },

    // Timezone (GMT)
    O: function (date, token, localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Short
        case 'O':
        case 'OO':
        case 'OOO':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
        // Long
        case 'OOOO':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':')
      }
    },

    // Timezone (specific non-location)
    z: function (date, token, localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Short
        case 'z':
        case 'zz':
        case 'zzz':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
        // Long
        case 'zzzz':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':')
      }
    },

    // Seconds timestamp
    t: function (date, token, localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = Math.floor(originalDate.getTime() / 1000);
      return addLeadingZeros(timestamp, token.length)
    },

    // Milliseconds timestamp
    T: function (date, token, localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = originalDate.getTime();
      return addLeadingZeros(timestamp, token.length)
    }
  };

  function addLeadingZeros (number, targetLength) {
    var sign = number < 0 ? '-' : '';
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return sign + output
  }

  function formatTimezone (offset, dirtyDelimeter) {
    var delimeter = dirtyDelimeter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
    var minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimeter + minutes
  }

  function formatTimezoneWithOptionalMinutes (offset, dirtyDelimeter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? '-' : '+';
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2)
    }
    return formatTimezone(offset, dirtyDelimeter)
  }

  function formatTimezoneShort (offset, dirtyDelimeter) {
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours)
    }
    var delimeter = dirtyDelimeter || '';
    return sign + String(hours) + delimeter + addLeadingZeros(minutes, 2)
  }

  function dateLongFormatter (pattern, formatLong, options) {
    switch (pattern) {
      case 'P':
        return formatLong.date({width: 'short'})
      case 'PP':
        return formatLong.date({width: 'medium'})
      case 'PPP':
        return formatLong.date({width: 'long'})
      case 'PPPP':
      default:
        return formatLong.date({width: 'full'})
    }
  }

  function timeLongFormatter (pattern, formatLong, options) {
    switch (pattern) {
      case 'p':
        return formatLong.time({width: 'short'})
      case 'pp':
        return formatLong.time({width: 'medium'})
      case 'ppp':
        return formatLong.time({width: 'long'})
      case 'pppp':
      default:
        return formatLong.time({width: 'full'})
    }
  }

  function dateTimeLongFormatter (pattern, formatLong, options) {
    var matchResult = pattern.match(/(P+)(p+)?/);
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];

    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong, options)
    }

    var dateTimeFormat;

    switch (datePattern) {
      case 'P':
        dateTimeFormat = formatLong.dateTime({width: 'short'});
        break
      case 'PP':
        dateTimeFormat = formatLong.dateTime({width: 'medium'});
        break
      case 'PPP':
        dateTimeFormat = formatLong.dateTime({width: 'long'});
        break
      case 'PPPP':
      default:
        dateTimeFormat = formatLong.dateTime({width: 'full'});
        break
    }

    return dateTimeFormat
      .replace('{{date}}', dateLongFormatter(datePattern, formatLong, options))
      .replace('{{time}}', timeLongFormatter(timePattern, formatLong, options))
  }

  var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };

  /**
   * @name subMilliseconds
   * @category Millisecond Helpers
   * @summary Subtract the specified number of milliseconds from the given date.
   *
   * @description
   * Subtract the specified number of milliseconds from the given date.
   *
   * @param {Date|String|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be subtracted
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Date} the new date with the milliseconds subtracted
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
   * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:29.250
   */
  function subMilliseconds (dirtyDate, dirtyAmount, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var amount = toInteger(dirtyAmount);
    return addMilliseconds(dirtyDate, -amount, dirtyOptions)
  }

  var protectedTokens = ['D', 'DD', 'YY', 'YYYY'];

  function isProtectedToken(token) {
    return protectedTokens.indexOf(token) !== -1
  }

  function throwProtectedError(token) {
    throw new RangeError(
      '`options.awareOfUnicodeTokens` must be set to `true` to use `' +
        token +
        '` token; see: https://git.io/fxCyr'
    )
  }

  // This RegExp consists of three parts separated by `|`:
  // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
  //   (one of the certain letters followed by `o`)
  // - (\w)\1* matches any sequences of the same letter
  // - '' matches two quote characters in a row
  // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
  //   except a single quote symbol, which ends the sequence.
  //   Two quote characters do not end the sequence.
  //   If there is no matching single quote
  //   then the sequence will continue until the end of the string.
  // - . matches any single character unmatched by previous parts of the RegExps
  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

  // This RegExp catches symbols escaped by quotes, and also
  // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

  var escapedStringRegExp = /^'(.*?)'?$/;
  var doubleQuoteRegExp = /''/g;

  /**
   * @name format
   * @category Common Helpers
   * @summary Format the date.
   *
   * @description
   * Return the formatted date string in the given format. The result may vary by locale.
   *
   * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
   * > See: https://git.io/fxCyr
   *
   * The characters wrapped between two single quotes characters (') are escaped.
   * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
   * (see the last example)
   *
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * with a few additions (see note 7 below the table).
   *
   * Accepted patterns:
   * | Unit                            | Pattern | Result examples                   | Notes |
   * |---------------------------------|---------|-----------------------------------|-------|
   * | Era                             | G..GGG  | AD, BC                            |       |
   * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
   * |                                 | GGGGG   | A, B                              |       |
   * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
   * |                                 | yy      | 44, 01, 00, 17                    | 5     |
   * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
   * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
   * |                                 | yyyyy   | ...                               | 3,5   |
   * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
   * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
   * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
   * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
   * |                                 | YYYYY   | ...                               | 3,5   |
   * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
   * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
   * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
   * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
   * |                                 | RRRRR   | ...                               | 3,5,7 |
   * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
   * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
   * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
   * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
   * |                                 | uuuuu   | ...                               | 3,5   |
   * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
   * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | QQ      | 01, 02, 03, 04                    |       |
   * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
   * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
   * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | qq      | 01, 02, 03, 04                    |       |
   * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
   * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
   * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | MM      | 01, 02, ..., 12                   |       |
   * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
   * |                                 | MMMM    | January, February, ..., December  | 2     |
   * |                                 | MMMMM   | J, F, ..., D                      |       |
   * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
   * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | LL      | 01, 02, ..., 12                   |       |
   * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
   * |                                 | LLLL    | January, February, ..., December  | 2     |
   * |                                 | LLLLL   | J, F, ..., D                      |       |
   * | Local week of year              | w       | 1, 2, ..., 53                     |       |
   * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | ww      | 01, 02, ..., 53                   |       |
   * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
   * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | II      | 01, 02, ..., 53                   | 7     |
   * | Day of month                    | d       | 1, 2, ..., 31                     |       |
   * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
   * |                                 | dd      | 01, 02, ..., 31                   |       |
   * | Day of year                     | D       | 1, 2, ..., 365, 366               | 8     |
   * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
   * |                                 | DD      | 01, 02, ..., 365, 366             | 8     |
   * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
   * |                                 | DDDD    | ...                               | 3     |
   * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
   * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
   * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
   * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
   * |                                 | ii      | 01, 02, ..., 07                   | 7     |
   * |                                 | iii     | Mon, Tue, Wed, ..., Su            | 7     |
   * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
   * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
   * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
   * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
   * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | ee      | 02, 03, ..., 01                   |       |
   * |                                 | eee     | Mon, Tue, Wed, ..., Su            |       |
   * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
   * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
   * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | cc      | 02, 03, ..., 01                   |       |
   * |                                 | ccc     | Mon, Tue, Wed, ..., Su            |       |
   * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
   * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | AM, PM                          | a..aaa  | AM, PM                            |       |
   * |                                 | aaaa    | a.m., p.m.                        | 2     |
   * |                                 | aaaaa   | a, p                              |       |
   * | AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |
   * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
   * |                                 | bbbbb   | a, p, n, mi                       |       |
   * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
   * |                                 | BBBB    | at night, in the morning, ...     | 2     |
   * |                                 | BBBBB   | at night, in the morning, ...     |       |
   * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
   * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
   * |                                 | hh      | 01, 02, ..., 11, 12               |       |
   * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
   * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
   * |                                 | HH      | 00, 01, 02, ..., 23               |       |
   * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
   * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
   * |                                 | KK      | 1, 2, ..., 11, 0                  |       |
   * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
   * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
   * |                                 | kk      | 24, 01, 02, ..., 23               |       |
   * | Minute                          | m       | 0, 1, ..., 59                     |       |
   * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | mm      | 00, 01, ..., 59                   |       |
   * | Second                          | s       | 0, 1, ..., 59                     |       |
   * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | ss      | 00, 01, ..., 59                   |       |
   * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
   * |                                 | SS      | 00, 01, ..., 99                   |       |
   * |                                 | SSS     | 000, 0001, ..., 999               |       |
   * |                                 | SSSS    | ...                               | 3     |
   * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
   * |                                 | XX      | -0800, +0530, Z                   |       |
   * |                                 | XXX     | -08:00, +05:30, Z                 |       |
   * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
   * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
   * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
   * |                                 | xx      | -0800, +0530, +0000               |       |
   * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
   * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
   * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
   * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
   * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
   * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
   * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
   * | Seconds timestamp               | t       | 512969520                         | 7     |
   * |                                 | tt      | ...                               | 3,7   |
   * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
   * |                                 | TT      | ...                               | 3,7   |
   * | Long localized date             | P       | 05/29/1453                        | 7     |
   * |                                 | PP      | May 29, 1453                      | 7     |
   * |                                 | PPP     | May 29th, 1453                    | 7     |
   * |                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |
   * | Long localized time             | p       | 12:00 AM                          | 7     |
   * |                                 | pp      | 12:00:00 AM                       | 7     |
   * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
   * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
   * | Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |
   * |                                 | PPpp    | May 29, 1453, 12:00:00 AM         | 7     |
   * |                                 | PPPppp  | May 29th, 1453 at ...             | 7     |
   * |                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |
   * Notes:
   * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
   *    are the same as "stand-alone" units, but are different in some languages.
   *    "Formatting" units are declined according to the rules of the language
   *    in the context of a date. "Stand-alone" units are always nominative singular:
   *
   *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
   *
   *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
   *
   * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
   *    the single quote characters (see below).
   *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
   *    the output will be the same as default pattern for this unit, usually
   *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
   *    are marked with "2" in the last column of the table.
   *
   *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
   *
   * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
   *    The output will be padded with zeros to match the length of the pattern.
   *
   *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
   *
   * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
   *    These tokens represent the shortest form of the quarter.
   *
   * 5. The main difference between `y` and `u` patterns are B.C. years:
   *
   *    | Year | `y` | `u` |
   *    |------|-----|-----|
   *    | AC 1 |   1 |   1 |
   *    | BC 1 |   1 |   0 |
   *    | BC 2 |   2 |  -1 |
   *
   *    Also `yy` always returns the last two digits of a year,
   *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
   *
   *    | Year | `yy` | `uu` |
   *    |------|------|------|
   *    | 1    |   01 |   01 |
   *    | 14   |   14 |   14 |
   *    | 376  |   76 |  376 |
   *    | 1453 |   53 | 1453 |
   *
   *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
   *    except local week-numbering years are dependent on `options.weekStartsOn`
   *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
   *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
   *
   * 6. Specific non-location timezones are currently unavailable in `date-fns`,
   *    so right now these tokens fall back to GMT timezones.
   *
   * 7. These patterns are not in the Unicode Technical Standard #35:
   *    - `i`: ISO day of week
   *    - `I`: ISO week of year
   *    - `R`: ISO week-numbering year
   *    - `t`: seconds timestamp
   *    - `T`: milliseconds timestamp
   *    - `o`: ordinal number modifier
   *    - `P`: long localized date
   *    - `p`: long localized time
   *
   * 8. These tokens are often confused with others. See: https://git.io/fxCyr
   *
   * @param {Date|String|Number} date - the original date
   * @param {String} format - the string of tokens
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {Boolean} [options.awareOfUnicodeTokens=false] - if true, allows usage of Unicode tokens causes confusion:
   *   - Some of the day of year tokens (`D`, `DD`) that are confused with the day of month tokens (`d`, `dd`).
   *   - Some of the local week-numbering year tokens (`YY`, `YYYY`) that are confused with the calendar year tokens (`yy`, `yyyy`).
   *   See: https://git.io/fxCyr
   * @returns {String} the formatted date string
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   * @throws {RangeError} `options.locale` must contain `localize` property
   * @throws {RangeError} `options.locale` must contain `formatLong` property
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
   * @throws {RangeError} `options.awareOfUnicodeTokens` must be set to `true` to use `XX` token; see: https://git.io/fxCyr
   *
   * @example
   * // Represent 11 February 2014 in middle-endian format:
   * var result = format(
   *   new Date(2014, 1, 11),
   *   'MM/dd/yyyy'
   * )
   * //=> '02/11/2014'
   *
   * @example
   * // Represent 2 July 2014 in Esperanto:
   * import { eoLocale } from 'date-fns/locale/eo'
   * var result = format(
   *   new Date(2014, 6, 2),
   *   "do 'de' MMMM yyyy",
   *   {locale: eoLocale}
   * )
   * //=> '2-a de julio 2014'
   *
   * @example
   * // Escape string by single quote characters:
   * var result = format(
   *   new Date(2014, 6, 2, 15),
   *   "h 'o''clock'"
   * )
   * //=> "3 o'clock"
   */
  function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError(
        '2 arguments required, but only ' + arguments.length + ' present'
      )
    }

    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {};

    var locale$1 = options.locale || locale;

    var localeFirstWeekContainsDate =
      locale$1.options && locale$1.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate =
      localeFirstWeekContainsDate == null
        ? 1
        : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate =
      options.firstWeekContainsDate == null
        ? defaultFirstWeekContainsDate
        : toInteger(options.firstWeekContainsDate);

    // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError(
        'firstWeekContainsDate must be between 1 and 7 inclusively'
      )
    }

    var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
    var defaultWeekStartsOn =
      localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn =
      options.weekStartsOn == null
        ? defaultWeekStartsOn
        : toInteger(options.weekStartsOn);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
    }

    if (!locale$1.localize) {
      throw new RangeError('locale must contain localize property')
    }

    if (!locale$1.formatLong) {
      throw new RangeError('locale must contain formatLong property')
    }

    var originalDate = toDate(dirtyDate, options);

    if (!isValid(originalDate, options)) {
      return 'Invalid Date'
    }

    // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
    var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
    var utcDate = subMilliseconds(originalDate, timezoneOffset, options);

    var formatterOptions = {
      firstWeekContainsDate: firstWeekContainsDate,
      weekStartsOn: weekStartsOn,
      locale: locale$1,
      _originalDate: originalDate
    };

    var result = formatStr
      .match(longFormattingTokensRegExp)
      .map(function(substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          var longFormatter = longFormatters[firstCharacter];
          return longFormatter(substring, locale$1.formatLong, formatterOptions)
        }
        return substring
      })
      .join('')
      .match(formattingTokensRegExp)
      .map(function(substring) {
        // Replace two single quote characters with one single quote character
        if (substring === "''") {
          return "'"
        }

        var firstCharacter = substring[0];
        if (firstCharacter === "'") {
          return cleanEscapedString(substring)
        }

        var formatter = formatters[firstCharacter];
        if (formatter) {
          if (!options.awareOfUnicodeTokens && isProtectedToken(substring)) {
            throwProtectedError(substring);
          }
          return formatter(utcDate, substring, locale$1.localize, formatterOptions)
        }

        return substring
      })
      .join('');

    return result
  }

  function cleanEscapedString(input) {
    return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'")
  }

  /**
   * @name isAfter
   * @category Common Helpers
   * @summary Is the first date after the second one?
   *
   * @description
   * Is the first date after the second one?
   *
   * @param {Date|String|Number} date - the date that should be after the other one to return true
   * @param {Date|String|Number} dateToCompare - the date to compare with
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Boolean} the first date is after the second date
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Is 10 July 1989 after 11 February 1987?
   * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> true
   */
  function isAfter (dirtyDate, dirtyDateToCompare, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var dateToCompare = toDate(dirtyDateToCompare, dirtyOptions);
    return date.getTime() > dateToCompare.getTime()
  }

  /**
   * @name isBefore
   * @category Common Helpers
   * @summary Is the first date before the second one?
   *
   * @description
   * Is the first date before the second one?
   *
   * @param {Date|String|Number} date - the date that should be before the other one to return true
   * @param {Date|String|Number} dateToCompare - the date to compare with
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Boolean} the first date is before the second date
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Is 10 July 1989 before 11 February 1987?
   * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> false
   */
  function isBefore (dirtyDate, dirtyDateToCompare, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var dateToCompare = toDate(dirtyDateToCompare, dirtyOptions);
    return date.getTime() < dateToCompare.getTime()
  }

  /**
   * @name isDate
   * @category Common Helpers
   * @summary Is the given value a date?
   *
   * @description
   * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
   *
   * @param {*} value - the value to check
   * @param {Options} [options] - the object with options. Unused; present for FP submodule compatibility sake. See [Options]{@link https://date-fns.org/docs/Options}
   * @returns {boolean} true if the given value is a date
   * @throws {TypeError} 1 arguments required
   *
   * @example
   * // For a valid date:
   * var result = isDate(new Date())
   * //=> true
   *
   * @example
   * // For an invalid date:
   * var result = isDate(new Date(NaN))
   * //=> true
   *
   * @example
   * // For some value:
   * var result = isDate('2014-02-31')
   * //=> false
   *
   * @example
   * // For an object:
   * var result = isDate({})
   * //=> false
   */

  /**
   * @name isEqual
   * @category Common Helpers
   * @summary Are the given dates equal?
   *
   * @description
   * Are the given dates equal?
   *
   * @param {Date|String|Number} dateLeft - the first date to compare
   * @param {Date|String|Number} dateRight - the second date to compare
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Boolean} the dates are equal
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
   * var result = isEqual(
   *   new Date(2014, 6, 2, 6, 30, 45, 0)
   *   new Date(2014, 6, 2, 6, 30, 45, 500)
   * )
   * //=> false
   */
  function isEqual (dirtyLeftDate, dirtyRightDate, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var dateLeft = toDate(dirtyLeftDate, dirtyOptions);
    var dateRight = toDate(dirtyRightDate, dirtyOptions);
    return dateLeft.getTime() === dateRight.getTime()
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function setUTCDay (dirtyDate, dirtyDay, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var day = toInteger(dirtyDay);

    var currentDay = date.getUTCDay();

    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;

    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

    date.setUTCDate(date.getUTCDate() + diff);
    return date
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function setUTCWeek (dirtyDate, dirtyWeek, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var week = toInteger(dirtyWeek);
    var diff = getUTCWeek(date, dirtyOptions) - week;
    date.setUTCDate(date.getUTCDate() - diff * 7);
    return date
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function setUTCISODay (dirtyDate, dirtyDay, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var day = toInteger(dirtyDay);

    if (day % 7 === 0) {
      day = day - 7;
    }

    var weekStartsOn = 1;
    var date = toDate(dirtyDate, dirtyOptions);
    var currentDay = date.getUTCDay();

    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;

    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

    date.setUTCDate(date.getUTCDate() + diff);
    return date
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function setUTCISOWeek (dirtyDate, dirtyISOWeek, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var isoWeek = toInteger(dirtyISOWeek);
    var diff = getUTCISOWeek(date, dirtyOptions) - isoWeek;
    date.setUTCDate(date.getUTCDate() - diff * 7);
    return date
  }

  var MILLISECONDS_IN_HOUR$1 = 3600000;
  var MILLISECONDS_IN_MINUTE$2 = 60000;
  var MILLISECONDS_IN_SECOND = 1000;

  var numericPatterns = {
    month: /^(1[0-2]|0?\d)/, // 0 to 12
    date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
    dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
    week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
    hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
    hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
    hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
    hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
    minute: /^[0-5]?\d/, // 0 to 59
    second: /^[0-5]?\d/, // 0 to 59

    singleDigit: /^\d/, // 0 to 9
    twoDigits: /^\d{1,2}/, // 0 to 99
    threeDigits: /^\d{1,3}/, // 0 to 999
    fourDigits: /^\d{1,4}/, // 0 to 9999

    anyDigitsSigned: /^-?\d+/,
    singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
    twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
    threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
    fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999
  };

  var timezonePatterns = {
    basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
    basic: /^([+-])(\d{2})(\d{2})|Z/,
    basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    extended: /^([+-])(\d{2}):(\d{2})|Z/,
    extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
  };

  function parseNumericPattern (pattern, string, valueCallback) {
    var matchResult = string.match(pattern);

    if (!matchResult) {
      return null
    }

    var value = parseInt(matchResult[0], 10);

    return {
      value: valueCallback ? valueCallback(value) : value,
      rest: string.slice(matchResult[0].length)
    }
  }

  function parseTimezonePattern (pattern, string) {
    var matchResult = string.match(pattern);

    if (!matchResult) {
      return null
    }

    // Input is 'Z'
    if (matchResult[0] === 'Z') {
      return {
        value: 0,
        rest: string.slice(1)
      }
    }

    var sign = matchResult[1] === '+' ? 1 : -1;
    var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
    var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
    var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;

    return {
      value: sign * (
        hours * MILLISECONDS_IN_HOUR$1 +
          minutes * MILLISECONDS_IN_MINUTE$2 +
          seconds * MILLISECONDS_IN_SECOND
      ),
      rest: string.slice(matchResult[0].length)
    }
  }

  function parseAnyDigitsSigned (string, valueCallback) {
    return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback)
  }

  function parseNDigits (n, string, valueCallback) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback)
      case 2:
        return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback)
      case 3:
        return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback)
      case 4:
        return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback)
      default:
        return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), string, valueCallback)
    }
  }

  function parseNDigitsSigned (n, string, valueCallback) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback)
      case 2:
        return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback)
      case 3:
        return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback)
      case 4:
        return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback)
      default:
        return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), string, valueCallback)
    }
  }

  function dayPeriodEnumToHours (enumValue) {
    switch (enumValue) {
      case 'morning':
        return 4
      case 'evening':
        return 17
      case 'pm':
      case 'noon':
      case 'afternoon':
        return 12
      case 'am':
      case 'midnight':
      case 'night':
      default:
        return 0
    }
  }

  function normalizeTwoDigitYear (twoDigitYear, currentYear) {
    var isCommonEra = currentYear > 0;
    // Absolute number of the current year:
    // 1 -> 1 AC
    // 0 -> 1 BC
    // -1 -> 2 BC
    var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

    var result;
    if (absCurrentYear <= 50) {
      result = twoDigitYear || 100;
    } else {
      var rangeEnd = absCurrentYear + 50;
      var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
      var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
      result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
    }

    return isCommonEra ? result : 1 - result
  }

  var DAYS_IN_MONTH$1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var DAYS_IN_MONTH_LEAP_YEAR$1 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // User for validation
  function isLeapYearIndex$1 (year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
  }

  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
   * |  p  |                                |  P  |                                |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   */
  var parsers = {
    // Era
    G: {
      priority: 140,
      parse: function (string, token, match, options) {
        switch (token) {
          // AD, BC
          case 'G':
          case 'GG':
          case 'GGG':
            return match.era(string, {width: 'abbreviated'}) ||
              match.era(string, {width: 'narrow'})
          // A, B
          case 'GGGGG':
            return match.era(string, {width: 'narrow'})
          // Anno Domini, Before Christ
          case 'GGGG':
          default:
            return match.era(string, {width: 'wide'}) ||
              match.era(string, {width: 'abbreviated'}) ||
              match.era(string, {width: 'narrow'})
        }
      },
      set: function (date, value, options) {
        // Sets year 10 BC if BC, or 10 AC if AC
        date.setUTCFullYear(value === 1 ? 10 : -9, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Year
    y: {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

      priority: 130,
      parse: function (string, token, match, options) {
        var valueCallback = function (year) {
          return {
            year: year,
            isTwoDigitYear: token === 'yy'
          }
        };

        switch (token) {
          case 'y':
            return parseNDigits(4, string, valueCallback)
          case 'yo':
            return match.ordinalNumber(string, {unit: 'year', valueCallback: valueCallback})
          default:
            return parseNDigits(token.length, string, valueCallback)
        }
      },
      validate: function (date, value, options) {
        return value.isTwoDigitYear || value.year > 0
      },
      set: function (date, value, options) {
        var currentYear = getUTCWeekYear(date, options);

        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
          date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date
        }

        var year = currentYear > 0 ? value.year : 1 - value.year;
        date.setUTCFullYear(year, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Local week-numbering year
    Y: {
      priority: 130,
      parse: function (string, token, match, options) {
        var valueCallback = function (year) {
          return {
            year: year,
            isTwoDigitYear: token === 'YY'
          }
        };

        switch (token) {
          case 'Y':
            return parseNDigits(4, string, valueCallback)
          case 'Yo':
            return match.ordinalNumber(string, {unit: 'year', valueCallback: valueCallback})
          default:
            return parseNDigits(token.length, string, valueCallback)
        }
      },
      validate: function (date, value, options) {
        return value.isTwoDigitYear || value.year > 0
      },
      set: function (date, value, options) {
        var currentYear = date.getUTCFullYear();

        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
          date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
          date.setUTCHours(0, 0, 0, 0);
          return startOfUTCWeek(date, options)
        }

        var year = currentYear > 0 ? value.year : 1 - value.year;
        date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options)
      }
    },

    // ISO week-numbering year
    R: {
      priority: 130,
      parse: function (string, token, match, options) {
        if (token === 'R') {
          return parseNDigitsSigned(4, string)
        }

        return parseNDigitsSigned(token.length, string)
      },
      set: function (date, value, options) {
        var firstWeekOfYear = new Date(0);
        firstWeekOfYear.setUTCFullYear(value, 0, 4);
        firstWeekOfYear.setUTCHours(0, 0, 0, 0);
        return startOfUTCISOWeek(firstWeekOfYear)
      }
    },

    // Extended year
    u: {
      priority: 130,
      parse: function (string, token, match, options) {
        if (token === 'u') {
          return parseNDigitsSigned(4, string)
        }

        return parseNDigitsSigned(token.length, string)
      },
      set: function (date, value, options) {
        date.setUTCFullYear(value, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Quarter
    Q: {
      priority: 120,
      parse: function (string, token, match, options) {
        switch (token) {
          // 1, 2, 3, 4
          case 'Q':
          case 'QQ': // 01, 02, 03, 04
            return parseNDigits(token.length, string)
          // 1st, 2nd, 3rd, 4th
          case 'Qo':
            return match.ordinalNumber(string, {unit: 'quarter'})
          // Q1, Q2, Q3, Q4
          case 'QQQ':
            return match.quarter(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.quarter(string, {width: 'narrow', context: 'formatting'})
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case 'QQQQQ':
            return match.quarter(string, {width: 'narrow', context: 'formatting'})
          // 1st quarter, 2nd quarter, ...
          case 'QQQQ':
          default:
            return match.quarter(string, {width: 'wide', context: 'formatting'}) ||
              match.quarter(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.quarter(string, {width: 'narrow', context: 'formatting'})
        }
      },
      validate: function (date, value, options) {
        return value >= 1 && value <= 4
      },
      set: function (date, value, options) {
        date.setUTCMonth((value - 1) * 3, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Stand-alone quarter
    q: {
      priority: 120,
      parse: function (string, token, match, options) {
        switch (token) {
          // 1, 2, 3, 4
          case 'q':
          case 'qq': // 01, 02, 03, 04
            return parseNDigits(token.length, string)
          // 1st, 2nd, 3rd, 4th
          case 'qo':
            return match.ordinalNumber(string, {unit: 'quarter'})
          // Q1, Q2, Q3, Q4
          case 'qqq':
            return match.quarter(string, {width: 'abbreviated', context: 'standalone'}) ||
              match.quarter(string, {width: 'narrow', context: 'standalone'})
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case 'qqqqq':
            return match.quarter(string, {width: 'narrow', context: 'standalone'})
          // 1st quarter, 2nd quarter, ...
          case 'qqqq':
          default:
            return match.quarter(string, {width: 'wide', context: 'standalone'}) ||
              match.quarter(string, {width: 'abbreviated', context: 'standalone'}) ||
              match.quarter(string, {width: 'narrow', context: 'standalone'})
        }
      },
      validate: function (date, value, options) {
        return value >= 1 && value <= 4
      },
      set: function (date, value, options) {
        date.setUTCMonth((value - 1) * 3, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Month
    M: {
      priority: 110,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          return value - 1
        };

        switch (token) {
          // 1, 2, ..., 12
          case 'M':
            return parseNumericPattern(numericPatterns.month, string, valueCallback)
          // 01, 02, ..., 12
          case 'MM':
            return parseNDigits(2, string, valueCallback)
          // 1st, 2nd, ..., 12th
          case 'Mo':
            return match.ordinalNumber(string, {unit: 'month', valueCallback: valueCallback})
          // Jan, Feb, ..., Dec
          case 'MMM':
            return match.month(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.month(string, {width: 'narrow', context: 'formatting'})
          // J, F, ..., D
          case 'MMMMM':
            return match.month(string, {width: 'narrow', context: 'formatting'})
          // January, February, ..., December
          case 'MMMM':
          default:
            return match.month(string, {width: 'wide', context: 'formatting'}) ||
              match.month(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.month(string, {width: 'narrow', context: 'formatting'})
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 11
      },
      set: function (date, value, options) {
        date.setUTCMonth(value, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Stand-alone month
    L: {
      priority: 110,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          return value - 1
        };

        switch (token) {
          // 1, 2, ..., 12
          case 'L':
            return parseNumericPattern(numericPatterns.month, string, valueCallback)
          // 01, 02, ..., 12
          case 'LL':
            return parseNDigits(2, string, valueCallback)
          // 1st, 2nd, ..., 12th
          case 'Lo':
            return match.ordinalNumber(string, {unit: 'month', valueCallback: valueCallback})
          // Jan, Feb, ..., Dec
          case 'LLL':
            return match.month(string, {width: 'abbreviated', context: 'standalone'}) ||
              match.month(string, {width: 'narrow', context: 'standalone'})
          // J, F, ..., D
          case 'LLLLL':
            return match.month(string, {width: 'narrow', context: 'standalone'})
          // January, February, ..., December
          case 'LLLL':
          default:
            return match.month(string, {width: 'wide', context: 'standalone'}) ||
              match.month(string, {width: 'abbreviated', context: 'standalone'}) ||
              match.month(string, {width: 'narrow', context: 'standalone'})
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 11
      },
      set: function (date, value, options) {
        date.setUTCMonth(value, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Local week of year
    w: {
      priority: 100,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'w':
            return parseNumericPattern(numericPatterns.week, string)
          case 'wo':
            return match.ordinalNumber(string, {unit: 'week'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 1 && value <= 53
      },
      set: function (date, value, options) {
        return startOfUTCWeek(setUTCWeek(date, value, options), options)
      }
    },

    // ISO week of year
    I: {
      priority: 100,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'I':
            return parseNumericPattern(numericPatterns.week, string)
          case 'Io':
            return match.ordinalNumber(string, {unit: 'week'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 1 && value <= 53
      },
      set: function (date, value, options) {
        return startOfUTCISOWeek(setUTCISOWeek(date, value, options), options)
      }
    },

    // Day of the month
    d: {
      priority: 90,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'd':
            return parseNumericPattern(numericPatterns.date, string)
          case 'do':
            return match.ordinalNumber(string, {unit: 'date'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        var year = date.getUTCFullYear();
        var isLeapYear = isLeapYearIndex$1(year);
        var month = date.getUTCMonth();
        if (isLeapYear) {
          return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR$1[month]
        } else {
          return value >= 1 && value <= DAYS_IN_MONTH$1[month]
        }
      },
      set: function (date, value, options) {
        date.setUTCDate(value);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Day of year
    D: {
      priority: 90,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'D':
          case 'DD':
            return parseNumericPattern(numericPatterns.dayOfYear, string)
          case 'Do':
            return match.ordinalNumber(string, {unit: 'date'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        var year = date.getUTCFullYear();
        var isLeapYear = isLeapYearIndex$1(year);
        if (isLeapYear) {
          return value >= 1 && value <= 366
        } else {
          return value >= 1 && value <= 365
        }
      },
      set: function (date, value, options) {
        date.setUTCMonth(0, value);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Day of week
    E: {
      priority: 90,
      parse: function (string, token, match, options) {
        switch (token) {
          // Tue
          case 'E':
          case 'EE':
          case 'EEE':
            return match.day(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.day(string, {width: 'short', context: 'formatting'}) ||
              match.day(string, {width: 'narrow', context: 'formatting'})
          // T
          case 'EEEEE':
            return match.day(string, {width: 'narrow', context: 'formatting'})
          // Tu
          case 'EEEEEE':
            return match.day(string, {width: 'short', context: 'formatting'}) ||
            match.day(string, {width: 'narrow', context: 'formatting'})
          // Tuesday
          case 'EEEE':
          default:
            return match.day(string, {width: 'wide', context: 'formatting'}) ||
              match.day(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.day(string, {width: 'short', context: 'formatting'}) ||
              match.day(string, {width: 'narrow', context: 'formatting'})
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 6
      },
      set: function (date, value, options) {
        date = setUTCDay(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Local day of week
    e: {
      priority: 90,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays
        };

        switch (token) {
          // 3
          case 'e':
          case 'ee': // 03
            return parseNDigits(token.length, string, valueCallback)
          // 3rd
          case 'eo':
            return match.ordinalNumber(string, {unit: 'day', valueCallback: valueCallback})
          // Tue
          case 'eee':
            return match.day(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.day(string, {width: 'short', context: 'formatting'}) ||
              match.day(string, {width: 'narrow', context: 'formatting'})
          // T
          case 'eeeee':
            return match.day(string, {width: 'narrow', context: 'formatting'})
          // Tu
          case 'eeeeee':
            return match.day(string, {width: 'short', context: 'formatting'}) ||
            match.day(string, {width: 'narrow', context: 'formatting'})
          // Tuesday
          case 'eeee':
          default:
            return match.day(string, {width: 'wide', context: 'formatting'}) ||
              match.day(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.day(string, {width: 'short', context: 'formatting'}) ||
              match.day(string, {width: 'narrow', context: 'formatting'})
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 6
      },
      set: function (date, value, options) {
        date = setUTCDay(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // Stand-alone local day of week
    c: {
      priority: 90,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays
        };

        switch (token) {
          // 3
          case 'c':
          case 'cc': // 03
            return parseNDigits(token.length, string, valueCallback)
          // 3rd
          case 'co':
            return match.ordinalNumber(string, {unit: 'day', valueCallback: valueCallback})
          // Tue
          case 'ccc':
            return match.day(string, {width: 'abbreviated', context: 'standalone'}) ||
              match.day(string, {width: 'short', context: 'standalone'}) ||
              match.day(string, {width: 'narrow', context: 'standalone'})
          // T
          case 'ccccc':
            return match.day(string, {width: 'narrow', context: 'standalone'})
          // Tu
          case 'cccccc':
            return match.day(string, {width: 'short', context: 'standalone'}) ||
            match.day(string, {width: 'narrow', context: 'standalone'})
          // Tuesday
          case 'cccc':
          default:
            return match.day(string, {width: 'wide', context: 'standalone'}) ||
              match.day(string, {width: 'abbreviated', context: 'standalone'}) ||
              match.day(string, {width: 'short', context: 'standalone'}) ||
              match.day(string, {width: 'narrow', context: 'standalone'})
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 6
      },
      set: function (date, value, options) {
        date = setUTCDay(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // ISO day of week
    i: {
      priority: 90,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          if (value === 0) {
            return 7
          }
          return value
        };

        switch (token) {
          // 2
          case 'i':
          case 'ii': // 02
            return parseNDigits(token.length, string)
          // 2nd
          case 'io':
            return match.ordinalNumber(string, {unit: 'day'})
          // Tue
          case 'iii':
            return match.day(string, {width: 'abbreviated', context: 'formatting', valueCallback: valueCallback}) ||
              match.day(string, {width: 'short', context: 'formatting', valueCallback: valueCallback}) ||
              match.day(string, {width: 'narrow', context: 'formatting', valueCallback: valueCallback})
          // T
          case 'iiiii':
            return match.day(string, {width: 'narrow', context: 'formatting', valueCallback: valueCallback})
          // Tu
          case 'iiiiii':
            return match.day(string, {width: 'short', context: 'formatting', valueCallback: valueCallback}) ||
            match.day(string, {width: 'narrow', context: 'formatting', valueCallback: valueCallback})
          // Tuesday
          case 'iiii':
          default:
            return match.day(string, {width: 'wide', context: 'formatting', valueCallback: valueCallback}) ||
              match.day(string, {width: 'abbreviated', context: 'formatting', valueCallback: valueCallback}) ||
              match.day(string, {width: 'short', context: 'formatting', valueCallback: valueCallback}) ||
              match.day(string, {width: 'narrow', context: 'formatting', valueCallback: valueCallback})
        }
      },
      validate: function (date, value, options) {
        return value >= 1 && value <= 7
      },
      set: function (date, value, options) {
        date = setUTCISODay(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date
      }
    },

    // AM or PM
    a: {
      priority: 80,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'a':
          case 'aa':
          case 'aaa':
            return match.dayPeriod(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
          case 'aaaaa':
            return match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
          case 'aaaa':
          default:
            return match.dayPeriod(string, {width: 'wide', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
        }
      },
      set: function (date, value, options) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date
      }
    },

    // AM, PM, midnight
    b: {
      priority: 80,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'b':
          case 'bb':
          case 'bbb':
            return match.dayPeriod(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
          case 'bbbbb':
            return match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
          case 'bbbb':
          default:
            return match.dayPeriod(string, {width: 'wide', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
        }
      },
      set: function (date, value, options) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date
      }
    },

    // in the morning, in the afternoon, in the evening, at night
    B: {
      priority: 80,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'B':
          case 'BB':
          case 'BBB':
            return match.dayPeriod(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
          case 'BBBBB':
            return match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
          case 'BBBB':
          default:
            return match.dayPeriod(string, {width: 'wide', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'abbreviated', context: 'formatting'}) ||
              match.dayPeriod(string, {width: 'narrow', context: 'formatting'})
        }
      },
      set: function (date, value, options) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date
      }
    },

    // Hour [1-12]
    h: {
      priority: 70,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'h':
            return parseNumericPattern(numericPatterns.hour12h, string)
          case 'ho':
            return match.ordinalNumber(string, {unit: 'hour'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 1 && value <= 12
      },
      set: function (date, value, options) {
        var isPM = date.getUTCHours() >= 12;
        if (isPM && value < 12) {
          date.setUTCHours(value + 12, 0, 0, 0);
        } else if (!isPM && value === 12) {
          date.setUTCHours(0, 0, 0, 0);
        } else {
          date.setUTCHours(value, 0, 0, 0);
        }
        return date
      }
    },

    // Hour [0-23]
    H: {
      priority: 70,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'H':
            return parseNumericPattern(numericPatterns.hour23h, string)
          case 'Ho':
            return match.ordinalNumber(string, {unit: 'hour'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 23
      },
      set: function (date, value, options) {
        date.setUTCHours(value, 0, 0, 0);
        return date
      }
    },

    // Hour [0-11]
    K: {
      priority: 70,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'K':
            return parseNumericPattern(numericPatterns.hour11h, string)
          case 'Ko':
            return match.ordinalNumber(string, {unit: 'hour'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 11
      },
      set: function (date, value, options) {
        var isPM = date.getUTCHours() >= 12;
        if (isPM && value < 12) {
          date.setUTCHours(value + 12, 0, 0, 0);
        } else {
          date.setUTCHours(value, 0, 0, 0);
        }
        return date
      }
    },

    // Hour [1-24]
    k: {
      priority: 70,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'k':
            return parseNumericPattern(numericPatterns.hour24h, string)
          case 'ko':
            return match.ordinalNumber(string, {unit: 'hour'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 1 && value <= 24
      },
      set: function (date, value, options) {
        var hours = value <= 24 ? value % 24 : value;
        date.setUTCHours(hours, 0, 0, 0);
        return date
      }
    },

    // Minute
    m: {
      priority: 60,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'm':
            return parseNumericPattern(numericPatterns.minute, string)
          case 'mo':
            return match.ordinalNumber(string, {unit: 'minute'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 59
      },
      set: function (date, value, options) {
        date.setUTCMinutes(value, 0, 0);
        return date
      }
    },

    // Second
    s: {
      priority: 50,
      parse: function (string, token, match, options) {
        switch (token) {
          case 's':
            return parseNumericPattern(numericPatterns.second, string)
          case 'so':
            return match.ordinalNumber(string, {unit: 'second'})
          default:
            return parseNDigits(token.length, string)
        }
      },
      validate: function (date, value, options) {
        return value >= 0 && value <= 59
      },
      set: function (date, value, options) {
        date.setUTCSeconds(value, 0);
        return date
      }
    },

    // Fraction of second
    S: {
      priority: 40,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          return Math.floor(value * Math.pow(10, -token.length + 3))
        };
        return parseNDigits(token.length, string, valueCallback)
      },
      set: function (date, value, options) {
        date.setUTCMilliseconds(value);
        return date
      }
    },

    // Timezone (ISO-8601. +00:00 is `'Z'`)
    X: {
      priority: 20,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'X':
            return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string)
          case 'XX':
            return parseTimezonePattern(timezonePatterns.basic, string)
          case 'XXXX':
            return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string)
          case 'XXXXX':
            return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string)
          case 'XXX':
          default:
            return parseTimezonePattern(timezonePatterns.extended, string)
        }
      },
      set: function (date, value, options) {
        return new Date(date.getTime() - value)
      }
    },

    // Timezone (ISO-8601)
    x: {
      priority: 20,
      parse: function (string, token, match, options) {
        switch (token) {
          case 'x':
            return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string)
          case 'xx':
            return parseTimezonePattern(timezonePatterns.basic, string)
          case 'xxxx':
            return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string)
          case 'xxxxx':
            return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string)
          case 'xxx':
          default:
            return parseTimezonePattern(timezonePatterns.extended, string)
        }
      },
      set: function (date, value, options) {
        return new Date(date.getTime() - value)
      }
    },

    // Seconds timestamp
    t: {
      priority: 10,
      parse: function (string, token, match, options) {
        return parseAnyDigitsSigned(string)
      },
      set: function (date, value, options) {
        return new Date(value * 1000)
      }
    },

    // Milliseconds timestamp
    T: {
      priority: 10,
      parse: function (string, token, match, options) {
        return parseAnyDigitsSigned(string)
      },
      set: function (date, value, options) {
        return new Date(value)
      }
    }
  };

  var TIMEZONE_UNIT_PRIORITY = 20;

  // This RegExp consists of three parts separated by `|`:
  // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
  //   (one of the certain letters followed by `o`)
  // - (\w)\1* matches any sequences of the same letter
  // - '' matches two quote characters in a row
  // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
  //   except a single quote symbol, which ends the sequence.
  //   Two quote characters do not end the sequence.
  //   If there is no matching single quote
  //   then the sequence will continue until the end of the string.
  // - . matches any single character unmatched by previous parts of the RegExps
  var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

  var escapedStringRegExp$1 = /^'(.*?)'?$/;
  var doubleQuoteRegExp$1 = /''/g;

  var notWhitespaceRegExp = /\S/;

  /**
   * @name parse
   * @category Common Helpers
   * @summary Parse the date.
   *
   * @description
   * Return the date parsed from string using the given format string.
   *
   * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
   * > See: https://git.io/fxCyr
   *
   * The characters in the format string wrapped between two single quotes characters (') are escaped.
   * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
   *
   * Format of the format string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * with a few additions (see note 5 below the table).
   *
   * Accepted format string patterns:
   * | Unit                            |Prior| Pattern | Result examples                   | Notes |
   * |---------------------------------|-----|---------|-----------------------------------|-------|
   * | Era                             | 140 | G..GGG  | AD, BC                            |       |
   * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
   * |                                 |     | GGGGG   | A, B                              |       |
   * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
   * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
   * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
   * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
   * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
   * |                                 |     | yyyyy   | ...                               | 2,4   |
   * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
   * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
   * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
   * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
   * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
   * |                                 |     | YYYYY   | ...                               | 2,4   |
   * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
   * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
   * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
   * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
   * |                                 |     | RRRRR   | ...                               | 2,4,5 |
   * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
   * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
   * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
   * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
   * |                                 |     | uuuuu   | ...                               | 2,4   |
   * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
   * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
   * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
   * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
   * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
   * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
   * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
   * |                                 |     | qq      | 01, 02, 03, 04                    |       |
   * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
   * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
   * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
   * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
   * |                                 |     | MM      | 01, 02, ..., 12                   |       |
   * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
   * |                                 |     | MMMM    | January, February, ..., December  | 2     |
   * |                                 |     | MMMMM   | J, F, ..., D                      |       |
   * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
   * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
   * |                                 |     | LL      | 01, 02, ..., 12                   |       |
   * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
   * |                                 |     | LLLL    | January, February, ..., December  | 2     |
   * |                                 |     | LLLLL   | J, F, ..., D                      |       |
   * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
   * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
   * |                                 |     | ww      | 01, 02, ..., 53                   |       |
   * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
   * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
   * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
   * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
   * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
   * |                                 |     | dd      | 01, 02, ..., 31                   |       |
   * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 6     |
   * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
   * |                                 |     | DD      | 01, 02, ..., 365, 366             | 6     |
   * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
   * |                                 |     | DDDD    | ...                               | 2     |
   * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
   * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
   * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
   * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
   * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
   * |                                 |     | iii     | Mon, Tue, Wed, ..., Su            | 5     |
   * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
   * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
   * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 5     |
   * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
   * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
   * |                                 |     | ee      | 02, 03, ..., 01                   |       |
   * |                                 |     | eee     | Mon, Tue, Wed, ..., Su            |       |
   * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
   * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
   * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
   * |                                 |     | cc      | 02, 03, ..., 01                   |       |
   * |                                 |     | ccc     | Mon, Tue, Wed, ..., Su            |       |
   * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
   * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
   * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
   * |                                 |     | aaaaa   | a, p                              |       |
   * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
   * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
   * |                                 |     | bbbbb   | a, p, n, mi                       |       |
   * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
   * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
   * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
   * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
   * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
   * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
   * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
   * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
   * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
   * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
   * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
   * |                                 |     | KK      | 1, 2, ..., 11, 0                  |       |
   * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
   * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
   * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
   * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
   * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
   * |                                 |     | mm      | 00, 01, ..., 59                   |       |
   * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
   * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
   * |                                 |     | ss      | 00, 01, ..., 59                   |       |
   * | Fraction of second              |  40 | S       | 0, 1, ..., 9                      |       |
   * |                                 |     | SS      | 00, 01, ..., 99                   |       |
   * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
   * |                                 |     | SSSS    | ...                               | 2     |
   * | Timezone (ISO-8601 w/ Z)        |  20 | X       | -08, +0530, Z                     |       |
   * |                                 |     | XX      | -0800, +0530, Z                   |       |
   * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
   * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
   * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
   * | Timezone (ISO-8601 w/o Z)       |  20 | x       | -08, +0530, +00                   |       |
   * |                                 |     | xx      | -0800, +0530, +0000               |       |
   * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
   * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
   * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
   * | Seconds timestamp               |  10 | t       | 512969520                         |       |
   * |                                 |     | tt      | ...                               | 2     |
   * | Milliseconds timestamp          |  10 | T       | 512969520900                      |       |
   * |                                 |     | TT      | ...                               | 2     |
   * Notes:
   * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
   *    are the same as "stand-alone" units, but are different in some languages.
   *    "Formatting" units are declined according to the rules of the language
   *    in the context of a date. "Stand-alone" units are always nominative singular.
   *    In `format` function, they will produce different result:
   *
   *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
   *
   *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
   *
   *    `parse` will try to match both formatting and stand-alone units interchangably.
   *
   * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
   *    the single quote characters (see below).
   *    If the sequence is longer than listed in table:
   *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
   *      as wide as the sequence
   *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
   *      These variations are marked with "2" in the last column of the table.
   *
   * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
   *    These tokens represent the shortest form of the quarter.
   *
   * 4. The main difference between `y` and `u` patterns are B.C. years:
   *
   *    | Year | `y` | `u` |
   *    |------|-----|-----|
   *    | AC 1 |   1 |   1 |
   *    | BC 1 |   1 |   0 |
   *    | BC 2 |   2 |  -1 |
   *
   *    Also `yy` will try to guess the century of two digit year by proximity with `baseDate`:
   *
   *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
   *
   *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
   *
   *    while `uu` will just assign the year as is:
   *
   *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
   *
   *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
   *
   *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
   *    except local week-numbering years are dependent on `options.weekStartsOn`
   *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
   *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
   *
   * 5. These patterns are not in the Unicode Technical Standard #35:
   *    - `i`: ISO day of week
   *    - `I`: ISO week of year
   *    - `R`: ISO week-numbering year
   *    - `o`: ordinal number modifier
   *
   * 6. These tokens are often confused with others. See: https://git.io/fxCyr
   *
   * Values will be assigned to the date in the descending order of its unit's priority.
   * Units of an equal priority overwrite each other in the order of appearance.
   *
   * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
   * the values will be taken from 3rd argument `baseDate` which works as a context of parsing.
   *
   * `baseDate` must be passed for correct work of the function.
   * If you're not sure which `baseDate` to supply, create a new instance of Date:
   * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
   * In this case parsing will be done in the context of the current date.
   * If `baseDate` is `Invalid Date` or a value not convertible to valid `Date`,
   * then `Invalid Date` will be returned.
   *
   * The result may vary by locale.
   *
   * If `formatString` matches with `dateString` but does not provides tokens, `baseDate` will be returned.
   *
   * If parsing failed, `Invalid Date` will be returned.
   * Invalid Date is a Date, whose time value is NaN.
   * Time value of Date: http://es5.github.io/#x15.9.1.1
   *
   * @param {String} dateString - the string to parse
   * @param {String} formatString - the string of tokens
   * @param {Date|String|Number} baseDate - defines values missing from the parsed dateString
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
   * @param {Boolean} [options.awareOfUnicodeTokens=false] - if true, allows usage of Unicode tokens causes confusion:
   *   - Some of the day of year tokens (`D`, `DD`) that are confused with the day of month tokens (`d`, `dd`).
   *   - Some of the local week-numbering year tokens (`YY`, `YYYY`) that are confused with the calendar year tokens (`yy`, `yyyy`).
   *   See: https://git.io/fxCyr
   * @returns {Date} the parsed date
   * @throws {TypeError} 3 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
   * @throws {RangeError} `options.locale` must contain `match` property
   * @throws {RangeError} `options.awareOfUnicodeTokens` must be set to `true` to use `XX` token; see: https://git.io/fxCyr
   *
   * @example
   * // Parse 11 February 2014 from middle-endian format:
   * var result = parse(
   *   '02/11/2014',
   *   'MM/dd/yyyy',
   *   new Date()
   * )
   * //=> Tue Feb 11 2014 00:00:00
   *
   * @example
   * // Parse 28th of February in Esperanto locale in the context of 2010 year:
   * import eo from 'date-fns/locale/eo'
   * var result = parse(
   *   '28-a de februaro',
   *   "do 'de' MMMM",
   *   new Date(2010, 0, 1),
   *   {locale: eo}
   * )
   * //=> Sun Feb 28 2010 00:00:00
   */
  function parse(
    dirtyDateString,
    dirtyFormatString,
    dirtyBaseDate,
    dirtyOptions
  ) {
    if (arguments.length < 3) {
      throw new TypeError(
        '3 arguments required, but only ' + arguments.length + ' present'
      )
    }

    var dateString = String(dirtyDateString);
    var formatString = String(dirtyFormatString);
    var options = dirtyOptions || {};

    var locale$1 = options.locale || locale;

    if (!locale$1.match) {
      throw new RangeError('locale must contain match property')
    }

    var localeFirstWeekContainsDate =
      locale$1.options && locale$1.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate =
      localeFirstWeekContainsDate == null
        ? 1
        : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate =
      options.firstWeekContainsDate == null
        ? defaultFirstWeekContainsDate
        : toInteger(options.firstWeekContainsDate);

    // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError(
        'firstWeekContainsDate must be between 1 and 7 inclusively'
      )
    }

    var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
    var defaultWeekStartsOn =
      localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn =
      options.weekStartsOn == null
        ? defaultWeekStartsOn
        : toInteger(options.weekStartsOn);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
    }

    if (formatString === '') {
      if (dateString === '') {
        return toDate(dirtyBaseDate, options)
      } else {
        return new Date(NaN)
      }
    }

    var subFnOptions = {
      firstWeekContainsDate: firstWeekContainsDate,
      weekStartsOn: weekStartsOn,
      locale: locale$1
    };

    // If timezone isn't specified, it will be set to the system timezone
    var setters = [
      {
        priority: TIMEZONE_UNIT_PRIORITY,
        set: dateToSystemTimezone,
        index: 0
      }
    ];

    var i;

    var tokens = formatString.match(formattingTokensRegExp$1);

    for (i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (!options.awareOfUnicodeTokens && isProtectedToken(token)) {
        throwProtectedError(token);
      }

      var firstCharacter = token[0];
      var parser = parsers[firstCharacter];
      if (parser) {
        var parseResult = parser.parse(
          dateString,
          token,
          locale$1.match,
          subFnOptions
        );

        if (!parseResult) {
          return new Date(NaN)
        }

        setters.push({
          priority: parser.priority,
          set: parser.set,
          validate: parser.validate,
          value: parseResult.value,
          index: setters.length
        });

        dateString = parseResult.rest;
      } else {
        // Replace two single quote characters with one single quote character
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString$1(token);
        }

        // Cut token from string, or, if string doesn't match the token, return Invalid Date
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return new Date(NaN)
        }
      }
    }

    // Check if the remaining input contains something other than whitespace
    if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
      return new Date(NaN)
    }

    var uniquePrioritySetters = setters
      .map(function(setter) {
        return setter.priority
      })
      .sort(function(a, b) {
        return b - a
      })
      .filter(function(priority, index, array) {
        return array.indexOf(priority) === index
      })
      .map(function(priority) {
        return setters
          .filter(function(setter) {
            return setter.priority === priority
          })
          .reverse()
      })
      .map(function(setterArray) {
        return setterArray[0]
      });

    var date = toDate(dirtyBaseDate, options);

    if (isNaN(date)) {
      return new Date(NaN)
    }

    // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37
    var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));

    for (i = 0; i < uniquePrioritySetters.length; i++) {
      var setter = uniquePrioritySetters[i];

      if (
        setter.validate &&
        !setter.validate(utcDate, setter.value, subFnOptions)
      ) {
        return new Date(NaN)
      }

      utcDate = setter.set(utcDate, setter.value, subFnOptions);
    }

    return utcDate
  }

  function dateToSystemTimezone(date) {
    var convertedDate = new Date(0);
    convertedDate.setFullYear(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    convertedDate.setHours(
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    );
    return convertedDate
  }

  function cleanEscapedString$1(input) {
    return input.match(escapedStringRegExp$1)[1].replace(doubleQuoteRegExp$1, "'")
  }

  // This file is generated automatically by `scripts/build/indices.js`. Please, don't change it.

  // 

  /**
   * Custom parse behavior on top of date-fns parse function.
   */
  function parseDate$1 (date, format$1) {
    if (typeof date !== 'string') {
      return isValid(date) ? date : null;
    }

    var parsed = parse(date, format$1, new Date());

    // if date is not valid or the formatted output after parsing does not match
    // the string value passed in (avoids overflows)
    if (!isValid(parsed) || format(parsed, format$1) !== date) {
      return null;
    }

    return parsed;
  }

  var afterValidator = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var targetValue = ref.targetValue;
    var inclusion = ref.inclusion; if ( inclusion === void 0 ) inclusion = false;
    var format = ref.format;

    if (typeof format === 'undefined') {
      format = inclusion;
      inclusion = false;
    }

    value = parseDate$1(value, format);
    targetValue = parseDate$1(targetValue, format);

    // if either is not valid.
    if (!value || !targetValue) {
      return false;
    }

    return isAfter(value, targetValue) || (inclusion && isEqual(value, targetValue));
  };

  var options = {
    hasTarget: true,
    isDate: true
  };

  // required to convert from a list of array values to an object.
  var paramNames = ['targetValue', 'inclusion', 'format'];

  var after = {
    validate: afterValidator,
    options: options,
    paramNames: paramNames
  };

  /**
   * Some Alpha Regex helpers.
   * https://github.com/chriso/validator.js/blob/master/src/lib/alpha.js
   */

  var alpha = {
    en: /^[A-Z]*$/i,
    cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
    da: /^[A-ZÆØÅ]*$/i,
    de: /^[A-ZÄÖÜß]*$/i,
    es: /^[A-ZÁÉÍÑÓÚÜ]*$/i,
    fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
    it: /^[A-Z\xC0-\xFF]*$/i,
    lt: /^[A-ZĄČĘĖĮŠŲŪŽ]*$/i,
    nl: /^[A-ZÉËÏÓÖÜ]*$/i,
    hu: /^[A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
    pl: /^[A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
    pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
    ru: /^[А-ЯЁ]*$/i,
    sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
    sr: /^[A-ZČĆŽŠĐ]*$/i,
    sv: /^[A-ZÅÄÖ]*$/i,
    tr: /^[A-ZÇĞİıÖŞÜ]*$/i,
    uk: /^[А-ЩЬЮЯЄІЇҐ]*$/i,
    ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/,
    az: /^[A-ZÇƏĞİıÖŞÜ]*$/i
  };

  var alphaSpaces = {
    en: /^[A-Z\s]*$/i,
    cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]*$/i,
    da: /^[A-ZÆØÅ\s]*$/i,
    de: /^[A-ZÄÖÜß\s]*$/i,
    es: /^[A-ZÁÉÍÑÓÚÜ\s]*$/i,
    fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]*$/i,
    it: /^[A-Z\xC0-\xFF\s]*$/i,
    lt: /^[A-ZĄČĘĖĮŠŲŪŽ\s]*$/i,
    nl: /^[A-ZÉËÏÓÖÜ\s]*$/i,
    hu: /^[A-ZÁÉÍÓÖŐÚÜŰ\s]*$/i,
    pl: /^[A-ZĄĆĘŚŁŃÓŻŹ\s]*$/i,
    pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ\s]*$/i,
    ru: /^[А-ЯЁ\s]*$/i,
    sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ\s]*$/i,
    sr: /^[A-ZČĆŽŠĐ\s]*$/i,
    sv: /^[A-ZÅÄÖ\s]*$/i,
    tr: /^[A-ZÇĞİıÖŞÜ\s]*$/i,
    uk: /^[А-ЩЬЮЯЄІЇҐ\s]*$/i,
    ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ\s]*$/,
    az: /^[A-ZÇƏĞİıÖŞÜ\s]*$/i
  };

  var alphanumeric = {
    en: /^[0-9A-Z]*$/i,
    cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
    da: /^[0-9A-ZÆØÅ]$/i,
    de: /^[0-9A-ZÄÖÜß]*$/i,
    es: /^[0-9A-ZÁÉÍÑÓÚÜ]*$/i,
    fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
    it: /^[0-9A-Z\xC0-\xFF]*$/i,
    lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ]*$/i,
    hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
    nl: /^[0-9A-ZÉËÏÓÖÜ]*$/i,
    pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
    pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
    ru: /^[0-9А-ЯЁ]*$/i,
    sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
    sr: /^[0-9A-ZČĆŽŠĐ]*$/i,
    sv: /^[0-9A-ZÅÄÖ]*$/i,
    tr: /^[0-9A-ZÇĞİıÖŞÜ]*$/i,
    uk: /^[0-9А-ЩЬЮЯЄІЇҐ]*$/i,
    ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/,
    az: /^[0-9A-ZÇƏĞİıÖŞÜ]*$/i
  };

  var alphaDash = {
    en: /^[0-9A-Z_-]*$/i,
    cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ_-]*$/i,
    da: /^[0-9A-ZÆØÅ_-]*$/i,
    de: /^[0-9A-ZÄÖÜß_-]*$/i,
    es: /^[0-9A-ZÁÉÍÑÓÚÜ_-]*$/i,
    fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ_-]*$/i,
    it: /^[0-9A-Z\xC0-\xFF_-]*$/i,
    lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ_-]*$/i,
    nl: /^[0-9A-ZÉËÏÓÖÜ_-]*$/i,
    hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ_-]*$/i,
    pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ_-]*$/i,
    pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ_-]*$/i,
    ru: /^[0-9А-ЯЁ_-]*$/i,
    sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ_-]*$/i,
    sr: /^[0-9A-ZČĆŽŠĐ_-]*$/i,
    sv: /^[0-9A-ZÅÄÖ_-]*$/i,
    tr: /^[0-9A-ZÇĞİıÖŞÜ_-]*$/i,
    uk: /^[0-9А-ЩЬЮЯЄІЇҐ_-]*$/i,
    ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ_-]*$/,
    az: /^[0-9A-ZÇƏĞİıÖŞÜ_-]*$/i
  };

  var validate = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var locale = ref.locale;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alpha).some(function (loc) { return alpha[loc].test(value); });
    }

    return (alpha[locale] || alpha.en).test(value);
  };

  var paramNames$1 = ['locale'];

  var alpha$1 = {
    validate: validate,
    paramNames: paramNames$1
  };

  var validate$1 = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var locale = ref.locale;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$1(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alphaDash).some(function (loc) { return alphaDash[loc].test(value); });
    }

    return (alphaDash[locale] || alphaDash.en).test(value);
  };

  var paramNames$2 = ['locale'];

  var alpha_dash = {
    validate: validate$1,
    paramNames: paramNames$2
  };

  var validate$2 = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var locale = ref.locale;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$2(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alphanumeric).some(function (loc) { return alphanumeric[loc].test(value); });
    }

    return (alphanumeric[locale] || alphanumeric.en).test(value);
  };

  var paramNames$3 = ['locale'];

  var alpha_num = {
    validate: validate$2,
    paramNames: paramNames$3
  };

  var validate$3 = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var locale = ref.locale;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$3(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alphaSpaces).some(function (loc) { return alphaSpaces[loc].test(value); });
    }

    return (alphaSpaces[locale] || alphaSpaces.en).test(value);
  };

  var paramNames$4 = ['locale'];

  var alpha_spaces = {
    validate: validate$3,
    paramNames: paramNames$4
  };

  var validate$4 = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var targetValue = ref.targetValue;
    var inclusion = ref.inclusion; if ( inclusion === void 0 ) inclusion = false;
    var format = ref.format;

    if (typeof format === 'undefined') {
      format = inclusion;
      inclusion = false;
    }

    value = parseDate$1(value, format);
    targetValue = parseDate$1(targetValue, format);

    // if either is not valid.
    if (!value || !targetValue) {
      return false;
    }

    return isBefore(value, targetValue) || (inclusion && isEqual(value, targetValue));
  };

  var options$1 = {
    hasTarget: true,
    isDate: true
  };

  var paramNames$5 = ['targetValue', 'inclusion', 'format'];

  var before = {
    validate: validate$4,
    options: options$1,
    paramNames: paramNames$5
  };

  var validate$5 = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var min = ref.min;
    var max = ref.max;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$5(val, { min: min, max: max }); });
    }

    return Number(min) <= value && Number(max) >= value;
  };

  var paramNames$6 = ['min', 'max'];

  var between = {
    validate: validate$5,
    paramNames: paramNames$6
  };

  var validate$6 = function (value, ref) {
    var targetValue = ref.targetValue;

    return String(value) === String(targetValue);
  };
  var options$2 = {
    hasTarget: true
  };

  var paramNames$7 = ['targetValue'];

  var confirmed = {
    validate: validate$6,
    options: options$2,
    paramNames: paramNames$7
  };

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var assertString_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.default = assertString;
  function assertString(input) {
    var isString = typeof input === 'string' || input instanceof String;

    if (!isString) {
      var invalidType = void 0;
      if (input === null) {
        invalidType = 'null';
      } else {
        invalidType = typeof input === 'undefined' ? 'undefined' : _typeof(input);
        if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
          invalidType = input.constructor.name;
        } else {
          invalidType = 'a ' + invalidType;
        }
      }
      throw new TypeError('Expected string but received ' + invalidType + '.');
    }
  }
  module.exports = exports['default'];
  });

  unwrapExports(assertString_1);

  var isCreditCard_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isCreditCard;



  var _assertString2 = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /* eslint-disable max-len */
  var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
  /* eslint-enable max-len */

  function isCreditCard(str) {
    (0, _assertString2.default)(str);
    var sanitized = str.replace(/[- ]+/g, '');
    if (!creditCard.test(sanitized)) {
      return false;
    }
    var sum = 0;
    var digit = void 0;
    var tmpNum = void 0;
    var shouldDouble = void 0;
    for (var i = sanitized.length - 1; i >= 0; i--) {
      digit = sanitized.substring(i, i + 1);
      tmpNum = parseInt(digit, 10);
      if (shouldDouble) {
        tmpNum *= 2;
        if (tmpNum >= 10) {
          sum += tmpNum % 10 + 1;
        } else {
          sum += tmpNum;
        }
      } else {
        sum += tmpNum;
      }
      shouldDouble = !shouldDouble;
    }
    return !!(sum % 10 === 0 ? sanitized : false);
  }
  module.exports = exports['default'];
  });

  var isCreditCard = unwrapExports(isCreditCard_1);

  var validate$7 = function (value) { return isCreditCard(String(value)); };

  var credit_card = {
    validate: validate$7
  };

  var validate$8 = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var min = ref.min;
    var max = ref.max;
    var inclusivity = ref.inclusivity; if ( inclusivity === void 0 ) inclusivity = '()';
    var format = ref.format;

    if (typeof format === 'undefined') {
      format = inclusivity;
      inclusivity = '()';
    }

    var minDate = parseDate$1(String(min), format);
    var maxDate = parseDate$1(String(max), format);
    var dateVal = parseDate$1(String(value), format);

    if (!minDate || !maxDate || !dateVal) {
      return false;
    }

    if (inclusivity === '()') {
      return isAfter(dateVal, minDate) && isBefore(dateVal, maxDate);
    }

    if (inclusivity === '(]') {
      return isAfter(dateVal, minDate) && (isEqual(dateVal, maxDate) || isBefore(dateVal, maxDate));
    }

    if (inclusivity === '[)') {
      return isBefore(dateVal, maxDate) && (isEqual(dateVal, minDate) || isAfter(dateVal, minDate));
    }

    return isEqual(dateVal, maxDate) || isEqual(dateVal, minDate) ||
      (isBefore(dateVal, maxDate) && isAfter(dateVal, minDate));
  };

  var options$3 = {
    isDate: true
  };

  var paramNames$8 = ['min', 'max', 'inclusivity', 'format'];

  var date_between = {
    validate: validate$8,
    options: options$3,
    paramNames: paramNames$8
  };

  var validate$9 = function (value, ref) {
    var format = ref.format;

    return !!parseDate$1(value, format);
  };

  var options$4 = {
    isDate: true
  };

  var paramNames$9 = ['format'];

  var date_format = {
    validate: validate$9,
    options: options$4,
    paramNames: paramNames$9
  };

  // 

  var isTextInput = function (el) {
    return includes(['text', 'password', 'search', 'email', 'tel', 'url', 'textarea', 'number'], el.type);
  };

  var isCheckboxOrRadioInput = function (el) {
    return includes(['radio', 'checkbox'], el.type);
  };

  var isDateInput = function (el) {
    return includes(['date', 'week', 'month', 'datetime-local', 'time'], el.type);
  };

  /**
   * Gets the data attribute. the name must be kebab-case.
   */
  var getDataAttribute = function (el, name) { return el.getAttribute(("data-vv-" + name)); };

  var isNaN$1 = function (value) {
    if ('isNaN' in Number) {
      return Number.isNaN(value);
    }

    // eslint-disable-next-line
    return value === value;
  };

  /**
   * Checks if the values are either null or undefined.
   */
  var isNullOrUndefined = function () {
    var values = [], len = arguments.length;
    while ( len-- ) values[ len ] = arguments[ len ];

    return values.every(function (value) {
      return value === null || value === undefined;
    });
  };

  /**
   * Creates the default flags object.
   */
  var createFlags = function () { return ({
    untouched: true,
    touched: false,
    dirty: false,
    pristine: true,
    valid: null,
    invalid: null,
    validated: false,
    pending: false,
    required: false,
    changed: false
  }); };

  /**
   * Shallow object comparison.
   */
  var isEqual$1 = function (lhs, rhs) {
    if (lhs instanceof RegExp && rhs instanceof RegExp) {
      return isEqual$1(lhs.source, rhs.source) && isEqual$1(lhs.flags, rhs.flags);
    }

    if (Array.isArray(lhs) && Array.isArray(rhs)) {
      if (lhs.length !== rhs.length) { return false; }

      for (var i = 0; i < lhs.length; i++) {
        if (!isEqual$1(lhs[i], rhs[i])) {
          return false;
        }
      }

      return true;
    }

    // if both are objects, compare each key recursively.
    if (isObject(lhs) && isObject(rhs)) {
      return Object.keys(lhs).every(function (key) {
        return isEqual$1(lhs[key], rhs[key]);
      }) && Object.keys(rhs).every(function (key) {
        return isEqual$1(lhs[key], rhs[key]);
      });
    }

    if (isNaN$1(lhs) && isNaN$1(rhs)) {
      return true;
    }

    return lhs === rhs;
  };

  /**
   * Determines the input field scope.
   */
  var getScope = function (el) {
    var scope = getDataAttribute(el, 'scope');
    if (isNullOrUndefined(scope)) {
      var form = getForm(el);

      if (form) {
        scope = getDataAttribute(form, 'scope');
      }
    }

    return !isNullOrUndefined(scope) ? scope : null;
  };

  /**
   * Get the closest form element.
   */
  var getForm = function (el) {
    if (isNullOrUndefined(el)) { return null; }

    if (el.tagName === 'FORM') { return el; }

    if (!isNullOrUndefined(el.form)) { return el.form; }

    return !isNullOrUndefined(el.parentNode) ? getForm(el.parentNode) : null;
  };

  /**
   * Gets the value in an object safely.
   */
  var getPath = function (path, target, def) {
    if ( def === void 0 ) def = undefined;

    if (!path || !target) { return def; }

    var value = target;
    path.split('.').every(function (prop) {
      if (prop in value) {
        value = value[prop];

        return true;
      }

      value = def;

      return false;
    });

    return value;
  };

  /**
   * Checks if path exists within an object.
   */
  var hasPath = function (path, target) {
    var obj = target;
    var previousPath = null;
    var isNullOrNonObject = false;
    var isValidPath = path.split('.').reduce(function (reducer, prop) {
      if (obj == null || typeof obj !== 'object') {
        isNullOrNonObject = true;
        return reducer && false;
      }

      if (prop in obj) {
        obj = obj[prop];
        previousPath = previousPath === null ? prop : previousPath + '.' + prop;

        return reducer && true;
      }

      return reducer && false;
    }, true);

    {
      if (isNullOrNonObject) {
        throw new Error(previousPath + ' is not an object');
      }
    }

    return isValidPath;
  };

  /**
   * Parses a rule string expression.
   */
  var parseRule = function (rule) {
    var params = [];
    var name = rule.split(':')[0];

    if (includes(rule, ':')) {
      params = rule.split(':').slice(1).join(':').split(',');
    }

    return { name: name, params: params };
  };

  /**
   * Debounces a function.
   */
  var debounce = function (fn, wait, token) {
    if ( wait === void 0 ) wait = 0;
    if ( token === void 0 ) token = { cancelled: false };

    if (wait === 0) {
      return fn;
    }

    var timeout;

    return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var later = function () {
        timeout = null;

        // check if the fn call was cancelled.
        if (!token.cancelled) { fn.apply(void 0, args); }
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (!timeout) { fn.apply(void 0, args); }
    };
  };

  /**
   * Appends a rule definition to a list of rules.
   */
  var appendRule = function (rule, rules) {
    if (!rules) {
      return normalizeRules(rule);
    }

    if (!rule) {
      return normalizeRules(rules);
    }

    if (typeof rules === 'string') {
      rules = normalizeRules(rules);
    }

    return assign({}, rules, normalizeRules(rule));
  };

  /**
   * Normalizes the given rules expression.
   */
  var normalizeRules = function (rules) {
    // if falsy value return an empty object.
    if (!rules) {
      return {};
    }

    if (isObject(rules)) {
      // $FlowFixMe
      return Object.keys(rules).reduce(function (prev, curr) {
        var params = [];
        // $FlowFixMe
        if (rules[curr] === true) {
          params = [];
        } else if (Array.isArray(rules[curr])) {
          params = rules[curr];
        } else if (isObject(rules[curr])) {
          params = rules[curr];
        } else {
          params = [rules[curr]];
        }

        // $FlowFixMe
        if (rules[curr] !== false) {
          prev[curr] = params;
        }

        return prev;
      }, {});
    }

    if (typeof rules !== 'string') {
      warn('rules must be either a string or an object.');
      return {};
    }

    return rules.split('|').reduce(function (prev, rule) {
      var parsedRule = parseRule(rule);
      if (!parsedRule.name) {
        return prev;
      }

      prev[parsedRule.name] = parsedRule.params;
      return prev;
    }, {});
  };

  /**
   * Emits a warning to the console.
   */
  var warn = function (message) {
    console.warn(("[vee-validate] " + message)); // eslint-disable-line
  };

  /**
   * Creates a branded error object.
   */
  var createError = function (message) { return new Error(("[vee-validate] " + message)); };

  /**
   * Checks if the value is an object.
   */
  var isObject = function (obj) { return obj !== null && obj && typeof obj === 'object' && ! Array.isArray(obj); };

  /**
   * Checks if a function is callable.
   */
  var isCallable = function (func) { return typeof func === 'function'; };

  /**
   * Check if element has the css class on it.
   */
  var hasClass = function (el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }

    return !!el.className.match(new RegExp(("(\\s|^)" + className + "(\\s|$)")));
  };

  /**
   * Adds the provided css className to the element.
   */
  var addClass = function (el, className) {
    if (el.classList) {
      el.classList.add(className);
      return;
    }

    if (!hasClass(el, className)) {
      el.className += " " + className;
    }
  };

  /**
   * Remove the provided css className from the element.
   */
  var removeClass = function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
      return;
    }

    if (hasClass(el, className)) {
      var reg = new RegExp(("(\\s|^)" + className + "(\\s|$)"));
      el.className = el.className.replace(reg, ' ');
    }
  };

  /**
   * Adds or removes a class name on the input depending on the status flag.
   */
  var toggleClass = function (el, className, status) {
    if (!el || !className) { return; }

    if (Array.isArray(className)) {
      className.forEach(function (item) { return toggleClass(el, item, status); });
      return;
    }

    if (status) {
      return addClass(el, className);
    }

    removeClass(el, className);
  };

  /**
   * Converts an array-like object to array, provides a simple polyfill for Array.from
   */
  var toArray = function (arrayLike) {
    if (isCallable(Array.from)) {
      return Array.from(arrayLike);
    }

    var array = [];
    var length = arrayLike.length;
    /* istanbul ignore next */
    for (var i = 0; i < length; i++) {
      array.push(arrayLike[i]);
    }

    /* istanbul ignore next */
    return array;
  };

  /**
   * Converts an array-like object to array and place other elements in an array
   */
  var ensureArray = function (arrayLike) {
    if (Array.isArray(arrayLike)) {
      return [].concat( arrayLike );
    }
    var array = toArray(arrayLike);
    return isEmptyArray(array) ? [arrayLike] : array;
  };

  /**
   * Assign polyfill from the mdn.
   */
  var assign = function (target) {
    var others = [], len = arguments.length - 1;
    while ( len-- > 0 ) others[ len ] = arguments[ len + 1 ];

    /* istanbul ignore else */
    if (isCallable(Object.assign)) {
      return Object.assign.apply(Object, [ target ].concat( others ));
    }

    /* istanbul ignore next */
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    /* istanbul ignore next */
    var to = Object(target);
    /* istanbul ignore next */
    others.forEach(function (arg) {
      // Skip over if undefined or null
      if (arg != null) {
        Object.keys(arg).forEach(function (key) {
          to[key] = arg[key];
        });
      }
    });
    /* istanbul ignore next */
    return to;
  };

  var id = 0;
  var idTemplate = '{id}';

  /**
   * Generates a unique id.
   */
  var uniqId = function () {
    // handle too many uses of uniqId, although unlikely.
    if (id >= 9999) {
      id = 0;
      // shift the template.
      idTemplate = idTemplate.replace('{id}', '_{id}');
    }

    id++;
    var newId = idTemplate.replace('{id}', String(id));

    return newId;
  };

  var findIndex = function (arrayLike, predicate) {
    var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        return i;
      }
    }

    return -1;
  };

  /**
   * finds the first element that satisfies the predicate callback, polyfills array.find
   */
  var find = function (arrayLike, predicate) {
    var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
    var idx = findIndex(array, predicate);

    return idx === -1 ? undefined : array[idx];
  };

  var isBuiltInComponent = function (vnode) {
    if (!vnode) {
      return false;
    }

    var tag = vnode.componentOptions.tag;

    return /^(keep-alive|transition|transition-group)$/.test(tag);
  };

  var makeDelayObject = function (events, delay, delayConfig) {
    if (typeof delay === 'number') {
      return events.reduce(function (prev, e) {
        prev[e] = delay;
        return prev;
      }, {});
    }

    return events.reduce(function (prev, e) {
      if (typeof delay === 'object' && e in delay) {
        prev[e] = delay[e];
        return prev;
      }

      if (typeof delayConfig === 'number') {
        prev[e] = delayConfig;
        return prev;
      }

      prev[e] = (delayConfig && delayConfig[e]) || 0;

      return prev;
    }, {});
  };

  var deepParseInt = function (input) {
    if (typeof input === 'number') { return input; }

    if (typeof input === 'string') { return parseInt(input); }

    var map = {};
    for (var element in input) {
      map[element] = parseInt(input[element]);
    }

    return map;
  };

  var merge = function (target, source) {
    if (! (isObject(target) && isObject(source))) {
      return target;
    }

    Object.keys(source).forEach(function (key) {
      var obj, obj$1;

      if (isObject(source[key])) {
        if (! target[key]) {
          assign(target, ( obj = {}, obj[key] = {}, obj ));
        }

        merge(target[key], source[key]);
        return;
      }

      assign(target, ( obj$1 = {}, obj$1[key] = source[key], obj$1 ));
    });

    return target;
  };

  var fillRulesFromElement = function (el, rules) {
    if (el.required) {
      rules = appendRule('required', rules);
    }

    if (isTextInput(el)) {
      if (el.type === 'email') {
        rules = appendRule(("email" + (el.multiple ? ':multiple' : '')), rules);
      }

      if (el.pattern) {
        rules = appendRule({ regex: el.pattern }, rules);
      }

      // 524288 is the max on some browsers and test environments.
      if (el.maxLength >= 0 && el.maxLength < 524288) {
        rules = appendRule(("max:" + (el.maxLength)), rules);
      }

      if (el.minLength > 0) {
        rules = appendRule(("min:" + (el.minLength)), rules);
      }

      if (el.type === 'number') {
        rules = appendRule('decimal', rules);
        if (el.min !== '') {
          rules = appendRule(("min_value:" + (el.min)), rules);
        }

        if (el.max !== '') {
          rules = appendRule(("max_value:" + (el.max)), rules);
        }
      }

      return rules;
    }

    if (isDateInput(el)) {
      var timeFormat = el.step && Number(el.step) < 60 ? 'HH:mm:ss' : 'HH:mm';

      if (el.type === 'date') {
        return appendRule('date_format:yyyy-MM-dd', rules);
      }

      if (el.type === 'datetime-local') {
        return appendRule(("date_format:yyyy-MM-ddT" + timeFormat), rules);
      }

      if (el.type === 'month') {
        return appendRule('date_format:yyyy-MM', rules);
      }

      if (el.type === 'week') {
        return appendRule('date_format:yyyy-[W]WW', rules);
      }

      if (el.type === 'time') {
        return appendRule(("date_format:" + timeFormat), rules);
      }
    }

    return rules;
  };

  var values = function (obj) {
    if (isCallable(Object.values)) {
      return Object.values(obj);
    }

    // fallback to keys()
    /* istanbul ignore next */
    return Object.keys(obj).map(function (k) { return obj[k]; });
  };

  var parseSelector = function (selector) {
    var rule = null;
    if (includes(selector, ':')) {
      rule = selector.split(':').pop();
      selector = selector.replace((":" + rule), '');
    }

    if (selector[0] === '#') {
      return {
        id: selector.slice(1),
        rule: rule,
        name: null,
        scope: null
      };
    }

    var scope = null;
    var name = selector;
    if (includes(selector, '.')) {
      var parts = selector.split('.');
      scope = parts[0];
      name = parts.slice(1).join('.');
    }

    return {
      id: null,
      scope: scope,
      name: name,
      rule: rule
    };
  };

  var includes = function (collection, item) {
    return collection.indexOf(item) !== -1;
  };

  var isEmptyArray = function (arr) {
    return Array.isArray(arr) && arr.length === 0;
  };

  var defineNonReactive = function (obj, prop, value) {
    Object.defineProperty(obj, prop, {
      configurable: false,
      writable: true,
      value: value
    });
  };

  var validate$a = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var decimals = ref.decimals; if ( decimals === void 0 ) decimals = '*';
    var separator = ref.separator; if ( separator === void 0 ) separator = '.';

    if (isNullOrUndefined(value) || value === '') {
      return false;
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$a(val, { decimals: decimals, separator: separator }); });
    }

    // if is 0.
    if (Number(decimals) === 0) {
      return /^-?\d*$/.test(value);
    }

    var regexPart = decimals === '*' ? '+' : ("{1," + decimals + "}");
    var regex = new RegExp(("^[-+]?\\d*(\\" + separator + "\\d" + regexPart + ")?([eE]{1}[-]?\\d+)?$"));

    if (! regex.test(value)) {
      return false;
    }

    var parsedValue = parseFloat(value);

    // eslint-disable-next-line
    return parsedValue === parsedValue;
  };

  var paramNames$a = ['decimals', 'separator'];

  var decimal = {
    validate: validate$a,
    paramNames: paramNames$a
  };

  var validate$b = function (value, ref) {
    var length = ref[0];

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$b(val, [length]); });
    }
    var strVal = String(value);

    return /^[0-9]*$/.test(strVal) && strVal.length === Number(length);
  };

  var digits = {
    validate: validate$b
  };

  var imageRegex = /\.(jpg|svg|jpeg|png|bmp|gif)$/i;

  var validateImage = function (file, width, height) {
    var URL = window.URL || window.webkitURL;
    return new Promise(function (resolve) {
      var image = new Image();
      image.onerror = function () { return resolve({ valid: false }); };
      image.onload = function () { return resolve({
        valid: image.width === Number(width) && image.height === Number(height)
      }); };

      image.src = URL.createObjectURL(file);
    });
  };

  var validate$c = function (files, ref) {
    var width = ref[0];
    var height = ref[1];

    var images = ensureArray(files).filter(function (file) { return imageRegex.test(file.name); });
    if (images.length === 0) {
      return false;
    }
    return Promise.all(images.map(function (image) { return validateImage(image, width, height); }));
  };

  var dimensions = {
    validate: validate$c
  };

  var merge_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = merge;
  function merge() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaults = arguments[1];

    for (var key in defaults) {
      if (typeof obj[key] === 'undefined') {
        obj[key] = defaults[key];
      }
    }
    return obj;
  }
  module.exports = exports['default'];
  });

  unwrapExports(merge_1);

  var isByteLength_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.default = isByteLength;



  var _assertString2 = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /* eslint-disable prefer-rest-params */
  function isByteLength(str, options) {
    (0, _assertString2.default)(str);
    var min = void 0;
    var max = void 0;
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
      min = options.min || 0;
      max = options.max;
    } else {
      // backwards compatibility: isByteLength(str, min [, max])
      min = arguments[1];
      max = arguments[2];
    }
    var len = encodeURI(str).split(/%..|./).length - 1;
    return len >= min && (typeof max === 'undefined' || len <= max);
  }
  module.exports = exports['default'];
  });

  unwrapExports(isByteLength_1);

  var isFQDN_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFQDN;



  var _assertString2 = _interopRequireDefault(assertString_1);



  var _merge2 = _interopRequireDefault(merge_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var default_fqdn_options = {
    require_tld: true,
    allow_underscores: false,
    allow_trailing_dot: false
  };

  function isFQDN(str, options) {
    (0, _assertString2.default)(str);
    options = (0, _merge2.default)(options, default_fqdn_options);

    /* Remove the optional trailing dot before checking validity */
    if (options.allow_trailing_dot && str[str.length - 1] === '.') {
      str = str.substring(0, str.length - 1);
    }
    var parts = str.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 63) {
        return false;
      }
    }
    if (options.require_tld) {
      var tld = parts.pop();
      if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
        return false;
      }
      // disallow spaces
      if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
        return false;
      }
    }
    for (var part, _i = 0; _i < parts.length; _i++) {
      part = parts[_i];
      if (options.allow_underscores) {
        part = part.replace(/_/g, '');
      }
      if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
        return false;
      }
      // disallow full-width chars
      if (/[\uff01-\uff5e]/.test(part)) {
        return false;
      }
      if (part[0] === '-' || part[part.length - 1] === '-') {
        return false;
      }
    }
    return true;
  }
  module.exports = exports['default'];
  });

  var isFQDN = unwrapExports(isFQDN_1);

  var isIP_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIP;



  var _assertString2 = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  var ipv6Block = /^[0-9A-F]{1,4}$/i;

  function isIP(str) {
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    (0, _assertString2.default)(str);
    version = String(version);
    if (!version) {
      return isIP(str, 4) || isIP(str, 6);
    } else if (version === '4') {
      if (!ipv4Maybe.test(str)) {
        return false;
      }
      var parts = str.split('.').sort(function (a, b) {
        return a - b;
      });
      return parts[3] <= 255;
    } else if (version === '6') {
      var blocks = str.split(':');
      var foundOmissionBlock = false; // marker to indicate ::

      // At least some OS accept the last 32 bits of an IPv6 address
      // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
      // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
      // and '::a.b.c.d' is deprecated, but also valid.
      var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
      var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

      if (blocks.length > expectedNumberOfBlocks) {
        return false;
      }
      // initial or final ::
      if (str === '::') {
        return true;
      } else if (str.substr(0, 2) === '::') {
        blocks.shift();
        blocks.shift();
        foundOmissionBlock = true;
      } else if (str.substr(str.length - 2) === '::') {
        blocks.pop();
        blocks.pop();
        foundOmissionBlock = true;
      }

      for (var i = 0; i < blocks.length; ++i) {
        // test for a :: which can not be at the string start/end
        // since those cases have been handled above
        if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
          if (foundOmissionBlock) {
            return false; // multiple :: in address
          }
          foundOmissionBlock = true;
        } else if (foundIPv4TransitionBlock && i === blocks.length - 1) ; else if (!ipv6Block.test(blocks[i])) {
          return false;
        }
      }
      if (foundOmissionBlock) {
        return blocks.length >= 1;
      }
      return blocks.length === expectedNumberOfBlocks;
    }
    return false;
  }
  module.exports = exports['default'];
  });

  var isIP = unwrapExports(isIP_1);

  var isEmail_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEmail;



  var _assertString2 = _interopRequireDefault(assertString_1);



  var _merge2 = _interopRequireDefault(merge_1);



  var _isByteLength2 = _interopRequireDefault(isByteLength_1);



  var _isFQDN2 = _interopRequireDefault(isFQDN_1);



  var _isIP2 = _interopRequireDefault(isIP_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var default_email_options = {
    allow_display_name: false,
    require_display_name: false,
    allow_utf8_local_part: true,
    require_tld: true
  };

  /* eslint-disable max-len */
  /* eslint-disable no-control-regex */
  var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
  var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
  var gmailUserPart = /^[a-z\d]+$/;
  var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
  var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
  var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
  /* eslint-enable max-len */
  /* eslint-enable no-control-regex */

  function isEmail(str, options) {
    (0, _assertString2.default)(str);
    options = (0, _merge2.default)(options, default_email_options);

    if (options.require_display_name || options.allow_display_name) {
      var display_email = str.match(displayName);
      if (display_email) {
        str = display_email[1];
      } else if (options.require_display_name) {
        return false;
      }
    }

    var parts = str.split('@');
    var domain = parts.pop();
    var user = parts.join('@');

    var lower_domain = domain.toLowerCase();

    if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
      /*
        Previously we removed dots for gmail addresses before validating.
        This was removed because it allows `multiple..dots@gmail.com`
        to be reported as valid, but it is not.
        Gmail only normalizes single dots, removing them from here is pointless,
        should be done in normalizeEmail
      */
      user = user.toLowerCase();

      // Removing sub-address from username before gmail validation
      var username = user.split('+')[0];

      // Dots are not included in gmail length restriction
      if (!(0, _isByteLength2.default)(username.replace('.', ''), { min: 6, max: 30 })) {
        return false;
      }

      var _user_parts = username.split('.');
      for (var i = 0; i < _user_parts.length; i++) {
        if (!gmailUserPart.test(_user_parts[i])) {
          return false;
        }
      }
    }

    if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 254 })) {
      return false;
    }

    if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
      if (!options.allow_ip_domain) {
        return false;
      }

      if (!(0, _isIP2.default)(domain)) {
        if (!domain.startsWith('[') || !domain.endsWith(']')) {
          return false;
        }

        var noBracketdomain = domain.substr(1, domain.length - 2);

        if (noBracketdomain.length === 0 || !(0, _isIP2.default)(noBracketdomain)) {
          return false;
        }
      }
    }

    if (user[0] === '"') {
      user = user.slice(1, user.length - 1);
      return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
    }

    var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

    var user_parts = user.split('.');
    for (var _i = 0; _i < user_parts.length; _i++) {
      if (!pattern.test(user_parts[_i])) {
        return false;
      }
    }

    return true;
  }
  module.exports = exports['default'];
  });

  var isEmail = unwrapExports(isEmail_1);

  function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

  var validate$d = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var multiple = ref.multiple; if ( multiple === void 0 ) multiple = false;
    var rest = objectWithoutProperties( ref, ["multiple"] );
    var options = rest;

    if (multiple && !Array.isArray(value)) {
      value = String(value).split(',').map(function (emailStr) { return emailStr.trim(); });
    }

    var validatorOptions = assign({}, options);

    if (Array.isArray(value)) {
      return value.every(function (val) { return isEmail(String(val), validatorOptions); });
    }

    return isEmail(String(value), validatorOptions);
  };

  var email = {
    validate: validate$d
  };

  var validate$e = function (value, options) {
    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$e(val, options); });
    }

    return toArray(options).some(function (item) {
      // eslint-disable-next-line
      return item == value;
    });
  };

  var included = {
    validate: validate$e
  };

  var validate$f = function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return !validate$e.apply(void 0, args);
  };

  var excluded = {
    validate: validate$f
  };

  var validate$g = function (files, extensions) {
    var regex = new RegExp((".(" + (extensions.join('|')) + ")$"), 'i');
    return ensureArray(files).every(function (file) { return regex.test(file.name); });
  };

  var ext = {
    validate: validate$g
  };

  var validate$h = function (files) { return (Array.isArray(files) ? files : [files]).every(function (file) { return /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name); }); };

  var image = {
    validate: validate$h
  };

  var validate$i = function (value) {
    if (Array.isArray(value)) {
      return value.every(function (val) { return /^-?[0-9]+$/.test(String(val)); });
    }

    return /^-?[0-9]+$/.test(String(value));
  };

  var integer = {
    validate: validate$i
  };

  var validate$j = function (value, ref) {
    if ( ref === void 0 ) ref = {};
    var version = ref.version; if ( version === void 0 ) version = 4;

    if (isNullOrUndefined(value)) {
      value = '';
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return isIP(val, version); });
    }

    return isIP(value, version);
  };

  var paramNames$b = ['version'];

  var ip = {
    validate: validate$j,
    paramNames: paramNames$b
  };

  var validate$k = function (value) {
    if (isNullOrUndefined(value)) {
      value = '';
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return (isIP(val, '') || isFQDN(val)); });
    }

    return isIP(value, '') || isFQDN(value);
  };

  var ip_or_fqdn = {
    validate: validate$k
  };

  var validate$l = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var other = ref[0];

    return value === other;
  };

  var is = {
    validate: validate$l
  };

  var validate$m = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var other = ref[0];

    return value !== other;
  };

  var is_not = {
    validate: validate$m
  };

  /**
   * @param {Array|String} value
   * @param {Number} length
   * @param {Number} max
   */
  var compare = function (value, length, max) {
    if (max === undefined) {
      return value.length === length;
    }

    // cast to number.
    max = Number(max);

    return value.length >= length && value.length <= max;
  };

  var validate$n = function (value, ref) {
    var length = ref[0];
    var max = ref[1]; if ( max === void 0 ) max = undefined;

    if (isNullOrUndefined(value)) {
      return false;
    }

    length = Number(length);
    if (typeof value === 'number') {
      value = String(value);
    }

    if (!value.length) {
      value = toArray(value);
    }

    return compare(value, length, max);
  };

  var length = {
    validate: validate$n
  };

  var validate$o = function (value, ref) {
    var length = ref[0];

    if (isNullOrUndefined(value)) {
      return length >= 0;
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$o(val, [length]); });
    }

    return String(value).length <= length;
  };

  var max = {
    validate: validate$o
  };

  var validate$p = function (value, ref) {
    var max = ref[0];

    if (isNullOrUndefined(value) || value === '') {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0 && value.every(function (val) { return validate$p(val, [max]); });
    }

    return Number(value) <= max;
  };

  var max_value = {
    validate: validate$p
  };

  var validate$q = function (files, mimes) {
    var regex = new RegExp(((mimes.join('|').replace('*', '.+')) + "$"), 'i');
    return ensureArray(files).every(function (file) { return regex.test(file.type); });
  };

  var mimes = {
    validate: validate$q
  };

  var validate$r = function (value, ref) {
    var length = ref[0];

    if (isNullOrUndefined(value)) {
      return false;
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$r(val, [length]); });
    }

    return String(value).length >= length;
  };

  var min = {
    validate: validate$r
  };

  var validate$s = function (value, ref) {
    var min = ref[0];

    if (isNullOrUndefined(value) || value === '') {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0 && value.every(function (val) { return validate$s(val, [min]); });
    }

    return Number(value) >= min;
  };

  var min_value = {
    validate: validate$s
  };

  var ar = /^[٠١٢٣٤٥٦٧٨٩]+$/;
  var en = /^[0-9]+$/;

  var validate$t = function (value) {
    var testValue = function (val) {
      var strValue = String(val);

      return en.test(strValue) || ar.test(strValue);
    };

    if (Array.isArray(value)) {
      return value.every(testValue);
    }

    return testValue(value);
  };

  var numeric = {
    validate: validate$t
  };

  var validate$u = function (value, ref) {
    var expression = ref.expression;

    if (typeof expression === 'string') {
      expression = new RegExp(expression);
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$u(val, { expression: expression }); });
    }

    return expression.test(String(value));
  };

  var paramNames$c = ['expression'];

  var regex = {
    validate: validate$u,
    paramNames: paramNames$c
  };

  var validate$v = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var invalidateFalse = ref[0]; if ( invalidateFalse === void 0 ) invalidateFalse = false;

    if (isNullOrUndefined(value) || isEmptyArray(value)) {
      return false;
    }

    // incase a field considers `false` as an empty value like checkboxes.
    if (value === false && invalidateFalse) {
      return false;
    }

    return !!String(value).trim().length;
  };

  var required = {
    validate: validate$v
  };

  var validate$w = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var otherFieldVal = ref[0];
    var possibleVals = ref.slice(1);

    var required = possibleVals.includes(String(otherFieldVal).trim());

    if (!required) {
      return {
        valid: true,
        data: {
          required: required
        }
      };
    }

    var invalid = (isEmptyArray(value) || [false, null, undefined].includes(value));

    invalid = invalid || !String(value).trim().length;

    return {
      valid: !invalid,
      data: {
        required: required
      }
    };
  };

  var options$5 = {
    hasTarget: true,
    computesRequired: true
  };

  var required_if = {
    validate: validate$w,
    options: options$5
  };

  var validate$x = function (files, ref) {
    var size = ref[0];

    if (isNaN(size)) {
      return false;
    }
    var nSize = Number(size) * 1024;
    return ensureArray(files).every(function (file) { return file.size <= nSize; });
  };

  var size = {
    validate: validate$x
  };

  var isURL_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isURL;



  var _assertString2 = _interopRequireDefault(assertString_1);



  var _isFQDN2 = _interopRequireDefault(isFQDN_1);



  var _isIP2 = _interopRequireDefault(isIP_1);



  var _merge2 = _interopRequireDefault(merge_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var default_url_options = {
    protocols: ['http', 'https', 'ftp'],
    require_tld: true,
    require_protocol: false,
    require_host: true,
    require_valid_protocol: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false
  };

  var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

  function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  }

  function checkHost(host, matches) {
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i];
      if (host === match || isRegExp(match) && match.test(host)) {
        return true;
      }
    }
    return false;
  }

  function isURL(url, options) {
    (0, _assertString2.default)(url);
    if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
      return false;
    }
    if (url.indexOf('mailto:') === 0) {
      return false;
    }
    options = (0, _merge2.default)(options, default_url_options);
    var protocol = void 0,
        auth = void 0,
        host = void 0,
        hostname = void 0,
        port = void 0,
        port_str = void 0,
        split = void 0,
        ipv6 = void 0;

    split = url.split('#');
    url = split.shift();

    split = url.split('?');
    url = split.shift();

    split = url.split('://');
    if (split.length > 1) {
      protocol = split.shift().toLowerCase();
      if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
        return false;
      }
    } else if (options.require_protocol) {
      return false;
    } else if (url.substr(0, 2) === '//') {
      if (!options.allow_protocol_relative_urls) {
        return false;
      }
      split[0] = url.substr(2);
    }
    url = split.join('://');

    if (url === '') {
      return false;
    }

    split = url.split('/');
    url = split.shift();

    if (url === '' && !options.require_host) {
      return true;
    }

    split = url.split('@');
    if (split.length > 1) {
      auth = split.shift();
      if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
        return false;
      }
    }
    hostname = split.join('@');

    port_str = null;
    ipv6 = null;
    var ipv6_match = hostname.match(wrapped_ipv6);
    if (ipv6_match) {
      host = '';
      ipv6 = ipv6_match[1];
      port_str = ipv6_match[2] || null;
    } else {
      split = hostname.split(':');
      host = split.shift();
      if (split.length) {
        port_str = split.join(':');
      }
    }

    if (port_str !== null) {
      port = parseInt(port_str, 10);
      if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
        return false;
      }
    }

    if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6))) {
      return false;
    }

    host = host || ipv6;

    if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
      return false;
    }
    if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
      return false;
    }

    return true;
  }
  module.exports = exports['default'];
  });

  var isURL = unwrapExports(isURL_1);

  var validate$y = function (value, options) {
    if ( options === void 0 ) options = {};

    if (isNullOrUndefined(value)) {
      value = '';
    }

    var validatorOptions = assign({}, options);

    if (Array.isArray(value)) {
      return value.every(function (val) { return isURL(val, validatorOptions); });
    }

    return isURL(value, validatorOptions);
  };

  var url = {
    validate: validate$y
  };

  /* eslint-disable camelcase */

  var Rules = /*#__PURE__*/Object.freeze({
    after: after,
    alpha_dash: alpha_dash,
    alpha_num: alpha_num,
    alpha_spaces: alpha_spaces,
    alpha: alpha$1,
    before: before,
    between: between,
    confirmed: confirmed,
    credit_card: credit_card,
    date_between: date_between,
    date_format: date_format,
    decimal: decimal,
    digits: digits,
    dimensions: dimensions,
    email: email,
    ext: ext,
    image: image,
    included: included,
    integer: integer,
    length: length,
    ip: ip,
    ip_or_fqdn: ip_or_fqdn,
    is_not: is_not,
    is: is,
    max: max,
    max_value: max_value,
    mimes: mimes,
    min: min,
    min_value: min_value,
    excluded: excluded,
    numeric: numeric,
    regex: regex,
    required: required,
    required_if: required_if,
    size: size,
    url: url
  });

  // 

  var LOCALE = 'en';

  var Dictionary = function Dictionary (dictionary) {
    if ( dictionary === void 0 ) dictionary = {};

    this.container = {};
    this.merge(dictionary);
  };

  var prototypeAccessors = { locale: { configurable: true } };

  prototypeAccessors.locale.get = function () {
    return LOCALE;
  };

  prototypeAccessors.locale.set = function (value) {
    LOCALE = value || 'en';
  };

  Dictionary.prototype.hasLocale = function hasLocale (locale) {
    return !!this.container[locale];
  };

  Dictionary.prototype.setDateFormat = function setDateFormat (locale, format) {
    if (!this.container[locale]) {
      this.container[locale] = {};
    }

    this.container[locale].dateFormat = format;
  };

  Dictionary.prototype.getDateFormat = function getDateFormat (locale) {
    if (!this.container[locale] || !this.container[locale].dateFormat) {
      return null;
    }

    return this.container[locale].dateFormat;
  };

  Dictionary.prototype.getMessage = function getMessage (locale, key, data) {
    var message = null;
    if (!this.hasMessage(locale, key)) {
      message = this._getDefaultMessage(locale);
    } else {
      message = this.container[locale].messages[key];
    }

    return isCallable(message) ? message.apply(void 0, data) : message;
  };

  /**
   * Gets a specific message for field. falls back to the rule message.
   */
  Dictionary.prototype.getFieldMessage = function getFieldMessage (locale, field, key, data) {
    if (!this.hasLocale(locale)) {
      return this.getMessage(locale, key, data);
    }

    var dict = this.container[locale].custom && this.container[locale].custom[field];
    if (!dict || !dict[key]) {
      return this.getMessage(locale, key, data);
    }

    var message = dict[key];
    return isCallable(message) ? message.apply(void 0, data) : message;
  };

  Dictionary.prototype._getDefaultMessage = function _getDefaultMessage (locale) {
    if (this.hasMessage(locale, '_default')) {
      return this.container[locale].messages._default;
    }

    return this.container.en.messages._default;
  };

  Dictionary.prototype.getAttribute = function getAttribute (locale, key, fallback) {
      if ( fallback === void 0 ) fallback = '';

    if (!this.hasAttribute(locale, key)) {
      return fallback;
    }

    return this.container[locale].attributes[key];
  };

  Dictionary.prototype.hasMessage = function hasMessage (locale, key) {
    return !! (
      this.hasLocale(locale) &&
            this.container[locale].messages &&
            this.container[locale].messages[key]
    );
  };

  Dictionary.prototype.hasAttribute = function hasAttribute (locale, key) {
    return !! (
      this.hasLocale(locale) &&
            this.container[locale].attributes &&
            this.container[locale].attributes[key]
    );
  };

  Dictionary.prototype.merge = function merge$1 (dictionary) {
    merge(this.container, dictionary);
  };

  Dictionary.prototype.setMessage = function setMessage (locale, key, message) {
    if (! this.hasLocale(locale)) {
      this.container[locale] = {
        messages: {},
        attributes: {}
      };
    }

    this.container[locale].messages[key] = message;
  };

  Dictionary.prototype.setAttribute = function setAttribute (locale, key, attribute) {
    if (! this.hasLocale(locale)) {
      this.container[locale] = {
        messages: {},
        attributes: {}
      };
    }

    this.container[locale].attributes[key] = attribute;
  };

  Object.defineProperties( Dictionary.prototype, prototypeAccessors );

  var drivers = {
    default: new Dictionary({
      en: {
        messages: {},
        attributes: {},
        custom: {}
      }
    })
  };

  var currentDriver = 'default';

  var DictionaryResolver = function DictionaryResolver () {};

  DictionaryResolver._checkDriverName = function _checkDriverName (driver) {
    if (!driver) {
      throw createError('you must provide a name to the dictionary driver');
    }
  };

  DictionaryResolver.setDriver = function setDriver (driver, implementation) {
      if ( implementation === void 0 ) implementation = null;

    this._checkDriverName(driver);
    if (implementation) {
      drivers[driver] = implementation;
    }

    currentDriver = driver;
  };

  DictionaryResolver.getDriver = function getDriver () {
    return drivers[currentDriver];
  };

  // 

  var ErrorBag = function ErrorBag (errorBag, id) {
    if ( errorBag === void 0 ) errorBag = null;
    if ( id === void 0 ) id = null;

    this.vmId = id || null;
    // make this bag a mirror of the provided one, sharing the same items reference.
    if (errorBag && errorBag instanceof ErrorBag) {
      this.items = errorBag.items;
    } else {
      this.items = [];
    }
  };

  ErrorBag.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
      var this$1 = this;

    var index = 0;
    return {
      next: function () {
        return { value: this$1.items[index++], done: index > this$1.items.length };
      }
    };
  };

  /**
   * Adds an error to the internal array.
   */
  ErrorBag.prototype.add = function add (error) {
      var ref;

    (ref = this.items).push.apply(
      ref, this._normalizeError(error)
    );
  };

  /**
   * Normalizes passed errors to an error array.
   */
  ErrorBag.prototype._normalizeError = function _normalizeError (error) {
      var this$1 = this;

    if (Array.isArray(error)) {
      return error.map(function (e) {
        e.scope = !isNullOrUndefined(e.scope) ? e.scope : null;
        e.vmId = !isNullOrUndefined(e.vmId) ? e.vmId : (this$1.vmId || null);

        return e;
      });
    }

    error.scope = !isNullOrUndefined(error.scope) ? error.scope : null;
    error.vmId = !isNullOrUndefined(error.vmId) ? error.vmId : (this.vmId || null);

    return [error];
  };

  /**
   * Regenrates error messages if they have a generator function.
   */
  ErrorBag.prototype.regenerate = function regenerate () {
    this.items.forEach(function (i) {
      i.msg = isCallable(i.regenerate) ? i.regenerate() : i.msg;
    });
  };

  /**
   * Updates a field error with the new field scope.
   */
  ErrorBag.prototype.update = function update (id, error) {
    var item = find(this.items, function (i) { return i.id === id; });
    if (!item) {
      return;
    }

    var idx = this.items.indexOf(item);
    this.items.splice(idx, 1);
    item.scope = error.scope;
    this.items.push(item);
  };

  /**
   * Gets all error messages from the internal array.
   */
  ErrorBag.prototype.all = function all (scope) {
      var this$1 = this;

    var filterFn = function (item) {
      var matchesScope = true;
      var matchesVM = true;
      if (!isNullOrUndefined(scope)) {
        matchesScope = item.scope === scope;
      }

      if (!isNullOrUndefined(this$1.vmId)) {
        matchesVM = item.vmId === this$1.vmId;
      }

      return matchesVM && matchesScope;
    };

    return this.items.filter(filterFn).map(function (e) { return e.msg; });
  };

  /**
   * Checks if there are any errors in the internal array.
   */
  ErrorBag.prototype.any = function any (scope) {
      var this$1 = this;

    var filterFn = function (item) {
      var matchesScope = true;
      var matchesVM = true;
      if (!isNullOrUndefined(scope)) {
        matchesScope = item.scope === scope;
      }

      if (!isNullOrUndefined(this$1.vmId)) {
        matchesVM = item.vmId === this$1.vmId;
      }

      return matchesVM && matchesScope;
    };

    return !!this.items.filter(filterFn).length;
  };

  /**
   * Removes all items from the internal array.
   */
  ErrorBag.prototype.clear = function clear (scope) {
      var this$1 = this;

    var matchesVM = isNullOrUndefined(this.vmId) ? function () { return true; } : function (i) { return i.vmId === this$1.vmId; };
    if (isNullOrUndefined(scope)) {
      scope = null;
    }

    for (var i = 0; i < this.items.length; ++i) {
      if (matchesVM(this.items[i]) && this.items[i].scope === scope) {
        this.items.splice(i, 1);
        --i;
      }
    }
  };

  /**
   * Collects errors into groups or for a specific field.
   */
  ErrorBag.prototype.collect = function collect (field, scope, map) {
      var this$1 = this;
      if ( map === void 0 ) map = true;

    var isSingleField = !isNullOrUndefined(field) && !field.includes('*');
    var groupErrors = function (items) {
      var errors = items.reduce(function (collection, error) {
        if (!isNullOrUndefined(this$1.vmId) && error.vmId !== this$1.vmId) {
          return collection;
        }

        if (!collection[error.field]) {
          collection[error.field] = [];
        }

        collection[error.field].push(map ? error.msg : error);

        return collection;
      }, {});

      // reduce the collection to be a single array.
      if (isSingleField) {
        return values(errors)[0] || [];
      }

      return errors;
    };

    if (isNullOrUndefined(field)) {
      return groupErrors(this.items);
    }

    var selector = isNullOrUndefined(scope) ? String(field) : (scope + "." + field);
    var ref = this._makeCandidateFilters(selector);
      var isPrimary = ref.isPrimary;
      var isAlt = ref.isAlt;

    var collected = this.items.reduce(function (prev, curr) {
      if (isPrimary(curr)) {
        prev.primary.push(curr);
      }

      if (isAlt(curr)) {
        prev.alt.push(curr);
      }

      return prev;
    }, { primary: [], alt: [] });

    collected = collected.primary.length ? collected.primary : collected.alt;

    return groupErrors(collected);
  };

  /**
   * Gets the internal array length.
   */
  ErrorBag.prototype.count = function count () {
      var this$1 = this;

    if (this.vmId) {
      return this.items.filter(function (e) { return e.vmId === this$1.vmId; }).length;
    }

    return this.items.length;
  };

  /**
   * Finds and fetches the first error message for the specified field id.
   */
  ErrorBag.prototype.firstById = function firstById (id) {
    var error = find(this.items, function (i) { return i.id === id; });

    return error ? error.msg : undefined;
  };

  /**
   * Gets the first error message for a specific field.
   */
  ErrorBag.prototype.first = function first (field, scope) {
      if ( scope === void 0 ) scope = null;

    var selector = isNullOrUndefined(scope) ? field : (scope + "." + field);
    var match = this._match(selector);

    return match && match.msg;
  };

  /**
   * Returns the first error rule for the specified field
   */
  ErrorBag.prototype.firstRule = function firstRule (field, scope) {
    var errors = this.collect(field, scope, false);

    return (errors.length && errors[0].rule) || undefined;
  };

  /**
   * Checks if the internal array has at least one error for the specified field.
   */
  ErrorBag.prototype.has = function has (field, scope) {
      if ( scope === void 0 ) scope = null;

    return !!this.first(field, scope);
  };

  /**
   * Gets the first error message for a specific field and a rule.
   */
  ErrorBag.prototype.firstByRule = function firstByRule (name, rule, scope) {
      if ( scope === void 0 ) scope = null;

    var error = this.collect(name, scope, false).filter(function (e) { return e.rule === rule; })[0];

    return (error && error.msg) || undefined;
  };

  /**
   * Gets the first error message for a specific field that not match the rule.
   */
  ErrorBag.prototype.firstNot = function firstNot (name, rule, scope) {
      if ( rule === void 0 ) rule = 'required';
      if ( scope === void 0 ) scope = null;

    var error = this.collect(name, scope, false).filter(function (e) { return e.rule !== rule; })[0];

    return (error && error.msg) || undefined;
  };

  /**
   * Removes errors by matching against the id or ids.
   */
  ErrorBag.prototype.removeById = function removeById (id) {
    var condition = function (item) { return item.id === id; };
    if (Array.isArray(id)) {
      condition = function (item) { return id.indexOf(item.id) !== -1; };
    }

    for (var i = 0; i < this.items.length; ++i) {
      if (condition(this.items[i])) {
        this.items.splice(i, 1);
        --i;
      }
    }
  };

  /**
   * Removes all error messages associated with a specific field.
   */
  ErrorBag.prototype.remove = function remove (field, scope, vmId) {
    if (isNullOrUndefined(field)) {
      return;
    }

    var selector = isNullOrUndefined(scope) ? String(field) : (scope + "." + field);
    var ref = this._makeCandidateFilters(selector);
      var isPrimary = ref.isPrimary;
      var isAlt = ref.isAlt;
    var matches = function (item) { return isPrimary(item) || isAlt(item); };
    var shouldRemove = function (item) {
      if (isNullOrUndefined(vmId)) { return matches(item); }

      return matches(item) && item.vmId === vmId;
    };

    for (var i = 0; i < this.items.length; ++i) {
      if (shouldRemove(this.items[i])) {
        this.items.splice(i, 1);
        --i;
      }
    }
  };

  ErrorBag.prototype._makeCandidateFilters = function _makeCandidateFilters (selector) {
      var this$1 = this;

    var matchesRule = function () { return true; };
    var matchesScope = function () { return true; };
    var matchesName = function () { return true; };
    var matchesVM = function () { return true; };

    var ref = parseSelector(selector);
      var id = ref.id;
      var rule = ref.rule;
      var scope = ref.scope;
      var name = ref.name;

    if (rule) {
      matchesRule = function (item) { return item.rule === rule; };
    }

    // match by id, can be combined with rule selection.
    if (id) {
      return {
        isPrimary: function (item) { return matchesRule(item) && (function (item) { return id === item.id; }); },
        isAlt: function () { return false; }
      };
    }

    if (isNullOrUndefined(scope)) {
      // if no scope specified, make sure the found error has no scope.
      matchesScope = function (item) { return isNullOrUndefined(item.scope); };
    } else {
      matchesScope = function (item) { return item.scope === scope; };
    }

    if (!isNullOrUndefined(name) && name !== '*') {
      matchesName = function (item) { return item.field === name; };
    }

    if (!isNullOrUndefined(this.vmId)) {
      matchesVM = function (item) { return item.vmId === this$1.vmId; };
    }

    // matches the first candidate.
    var isPrimary = function (item) {
      return matchesVM(item) && matchesName(item) && matchesRule(item) && matchesScope(item);
    };

    // matches a second candidate, which is a field with a name containing the '.' character.
    var isAlt = function (item) {
      return matchesVM(item) && matchesRule(item) && item.field === (scope + "." + name);
    };

    return {
      isPrimary: isPrimary,
      isAlt: isAlt
    };
  };

  ErrorBag.prototype._match = function _match (selector) {
    if (isNullOrUndefined(selector)) {
      return undefined;
    }

    var ref = this._makeCandidateFilters(selector);
      var isPrimary = ref.isPrimary;
      var isAlt = ref.isAlt;

    return this.items.reduce(function (prev, item, idx, arr) {
      var isLast = idx === arr.length - 1;
      if (prev.primary) {
        return isLast ? prev.primary : prev;
      }

      if (isPrimary(item)) {
        prev.primary = item;
      }

      if (isAlt(item)) {
        prev.alt = item;
      }

      // keep going.
      if (!isLast) {
        return prev;
      }

      return prev.primary || prev.alt;
    }, {});
  };

  var DEFAULT_CONFIG = {
    locale: 'en',
    delay: 0,
    errorBagName: 'errors',
    dictionary: null,
    fieldsBagName: 'fields',
    classes: false,
    classNames: null,
    events: 'input',
    inject: true,
    fastExit: true,
    aria: true,
    validity: false,
    mode: 'aggressive',
    useConstraintAttrs: true,
    i18n: null,
    i18nRootKey: 'validation'
  };

  var currentConfig = assign({}, DEFAULT_CONFIG);

  var resolveConfig = function (ctx) {
    var selfConfig = getPath('$options.$_veeValidate', ctx, {});

    return assign({}, currentConfig, selfConfig);
  };

  var getConfig = function () { return currentConfig; };

  var setConfig = function (newConf) {
    currentConfig = assign({}, currentConfig, newConf);
  };

  // VNode Utils

  // Gets the model object on the vnode.
  function findModel (vnode) {
    if (!vnode.data) {
      return null;
    }

    // Component Model
    if (vnode.data.model) {
      return vnode.data.model;
    }

    return !!(vnode.data.directives) && find(vnode.data.directives, function (d) { return d.name === 'model'; });
  }

  function extractChildren (vnode) {
    if (Array.isArray(vnode)) {
      return vnode;
    }

    if (Array.isArray(vnode.children)) {
      return vnode.children;
    }

    if (vnode.componentOptions && Array.isArray(vnode.componentOptions.children)) {
      return vnode.componentOptions.children;
    }

    return [];
  }

  function extractVNodes (vnode) {
    if (findModel(vnode)) {
      return [vnode];
    }

    var children = extractChildren(vnode);

    return children.reduce(function (nodes, node) {
      var candidates = extractVNodes(node);
      if (candidates.length) {
        nodes.push.apply(nodes, candidates);
      }

      return nodes;
    }, []);
  }

  // Resolves v-model config if exists.
  function findModelConfig (vnode) {
    if (!vnode.componentOptions) { return null; }

    return vnode.componentOptions.Ctor.options.model;
  }
  // Adds a listener to vnode listener object.
  function mergeVNodeListeners (obj, eventName, handler) {
    // Has a single listener.
    if (isCallable(obj[eventName])) {
      var prevHandler = obj[eventName];
      obj[eventName] = [prevHandler];
    }

    // has other listeners.
    if (Array.isArray(obj[eventName])) {
      obj[eventName].push(handler);
      return;
    }

    // no listener at all.
    if (isNullOrUndefined(obj[eventName])) {
      obj[eventName] = [handler];
    }
  }

  // Adds a listener to a native HTML vnode.
  function addNativeNodeListener (node, eventName, handler) {
    if (isNullOrUndefined(node.data.on)) {
      node.data.on = {};
    }

    mergeVNodeListeners(node.data.on, eventName, handler);
  }

  // Adds a listener to a Vue component vnode.
  function addComponentNodeListener (node, eventName, handler) {
    /* istanbul ignore next */
    if (!node.componentOptions.listeners) {
      node.componentOptions.listeners = {};
    }

    mergeVNodeListeners(node.componentOptions.listeners, eventName, handler);
  }
  function addVNodeListener (vnode, eventName, handler) {
    if (vnode.componentOptions) {
      addComponentNodeListener(vnode, eventName, handler);
      return;
    }

    addNativeNodeListener(vnode, eventName, handler);
  }
  // Determines if `change` should be used over `input` for listeners.
  function getInputEventName (vnode, model) {
    // Is a component.
    if (vnode.componentOptions) {
      var ref = findModelConfig(vnode) || { event: 'input' };
      var event = ref.event;

      return event;
    }

    // Lazy Models and select tag typically use change event
    if ((model && model.modifiers && model.modifiers.lazy) || vnode.tag === 'select') {
      return 'change';
    }

    // is a textual-type input.
    if (vnode.data.attrs && isTextInput({ type: vnode.data.attrs.type || 'text' })) {
      return 'input';
    }

    return 'change';
  }

  function normalizeSlots (slots, ctx) {
    return Object.keys(slots).reduce(function (arr, key) {
      slots[key].forEach(function (vnode) {
        if (!vnode.context) {
          slots[key].context = ctx;
          if (!vnode.data) {
            vnode.data = {};
          }
          vnode.data.slot = key;
        }
      });

      return arr.concat(slots[key]);
    }, []);
  }

  /**
   * Generates the options required to construct a field.
   */
  var Resolver = function Resolver () {};

  Resolver.generate = function generate (el, binding, vnode) {
    var model = Resolver.resolveModel(binding, vnode);
    var options = resolveConfig(vnode.context);

    return {
      name: Resolver.resolveName(el, vnode),
      el: el,
      listen: !binding.modifiers.disable,
      bails: binding.modifiers.bails ? true : (binding.modifiers.continues === true ? false : undefined),
      scope: Resolver.resolveScope(el, binding, vnode),
      vm: vnode.context,
      expression: binding.value,
      component: vnode.componentInstance,
      classes: options.classes,
      classNames: options.classNames,
      getter: Resolver.resolveGetter(el, vnode, model),
      events: Resolver.resolveEvents(el, vnode) || options.events,
      model: model,
      delay: Resolver.resolveDelay(el, vnode, options),
      rules: Resolver.resolveRules(el, binding, vnode),
      immediate: !!binding.modifiers.initial || !!binding.modifiers.immediate,
      persist: !!binding.modifiers.persist,
      validity: options.validity && !vnode.componentInstance,
      aria: options.aria && !vnode.componentInstance,
      initialValue: Resolver.resolveInitialValue(vnode)
    };
  };

  Resolver.getCtorConfig = function getCtorConfig (vnode) {
    if (!vnode.componentInstance) { return null; }

    var config = getPath('componentInstance.$options.$_veeValidate', vnode);

    return config;
  };

  /**
   * Resolves the rules defined on an element.
   */
  Resolver.resolveRules = function resolveRules (el, binding, vnode) {
    var rules = '';
    if (!binding.value && (!binding || !binding.expression)) {
      rules = getDataAttribute(el, 'rules');
    }

    if (binding.value && includes(['string', 'object'], typeof binding.value.rules)) {
      rules = binding.value.rules;
    } else if (binding.value) {
      rules = binding.value;
    }

    if (vnode.componentInstance) {
      return rules;
    }

    // If validity is disabled, ignore field rules.
    var normalized = normalizeRules(rules);
    if (!getConfig().useConstraintAttrs) {
      return normalized;
    }

    return assign({}, fillRulesFromElement(el, {}), normalized);
  };

  /**
   * @param {*} vnode
   */
  Resolver.resolveInitialValue = function resolveInitialValue (vnode) {
    var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });

    return model && model.value;
  };

  /**
   * Resolves the delay value.
   * @param {*} el
   * @param {*} vnode
   * @param {Object} options
   */
  Resolver.resolveDelay = function resolveDelay (el, vnode, options) {
    var delay = getDataAttribute(el, 'delay');
    var globalDelay = (options && 'delay' in options) ? options.delay : 0;

    if (!delay && vnode.componentInstance && vnode.componentInstance.$attrs) {
      delay = vnode.componentInstance.$attrs['data-vv-delay'];
    }

    if (!isObject(globalDelay)) {
      return deepParseInt(delay || globalDelay);
    }

    if (!isNullOrUndefined(delay)) {
      globalDelay.input = delay;
    }

    return deepParseInt(globalDelay);
  };

  /**
   * Resolves the events to validate in response to.
   * @param {*} el
   * @param {*} vnode
   */
  Resolver.resolveEvents = function resolveEvents (el, vnode) {
    // resolve it from the root element.
    var events = getDataAttribute(el, 'validate-on');

    // resolve from data-vv-validate-on if its a vue component.
    if (!events && vnode.componentInstance && vnode.componentInstance.$attrs) {
      events = vnode.componentInstance.$attrs['data-vv-validate-on'];
    }

    // resolve it from $_veeValidate options.
    if (!events && vnode.componentInstance) {
      var config = Resolver.getCtorConfig(vnode);
      events = config && config.events;
    }

    if (!events && getConfig().events) {
      events = getConfig().events;
    }

    // resolve the model event if its configured for custom components.
    if (events && vnode.componentInstance && includes(events, 'input')) {
      var ref = vnode.componentInstance.$options.model || { event: 'input' };
        var event = ref.event;
      // if the prop was configured but not the model.
      if (!event) {
        return events;
      }

      events = events.replace('input', event);
    }

    return events;
  };

  /**
   * Resolves the scope for the field.
   * @param {*} el
   * @param {*} binding
   */
  Resolver.resolveScope = function resolveScope (el, binding, vnode) {
      if ( vnode === void 0 ) vnode = {};

    var scope = null;
    if (vnode.componentInstance && isNullOrUndefined(scope)) {
      scope = vnode.componentInstance.$attrs && vnode.componentInstance.$attrs['data-vv-scope'];
    }

    return !isNullOrUndefined(scope) ? scope : getScope(el);
  };

  /**
   * Checks if the node directives contains a v-model or a specified arg.
   * Args take priority over models.
   *
   * @return {Object}
   */
  Resolver.resolveModel = function resolveModel (binding, vnode) {
    if (binding.arg) {
      return { expression: binding.arg };
    }

    var model = findModel(vnode);
    if (!model) {
      return null;
    }

    // https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js#L26
    var watchable = !/[^\w.$]/.test(model.expression) && hasPath(model.expression, vnode.context);
    var lazy = !!(model.modifiers && model.modifiers.lazy);

    if (!watchable) {
      return { expression: null, lazy: lazy };
    }

    return { expression: model.expression, lazy: lazy };
  };

  /**
   * Resolves the field name to trigger validations.
   * @return {String} The field name.
   */
  Resolver.resolveName = function resolveName (el, vnode) {
    var name = getDataAttribute(el, 'name');

    if (!name && !vnode.componentInstance) {
      return el.name;
    }

    if (!name && vnode.componentInstance && vnode.componentInstance.$attrs) {
      name = vnode.componentInstance.$attrs['data-vv-name'] || vnode.componentInstance.$attrs['name'];
    }

    if (!name && vnode.componentInstance) {
      var config = Resolver.getCtorConfig(vnode);
      if (config && isCallable(config.name)) {
        var boundGetter = config.name.bind(vnode.componentInstance);

        return boundGetter();
      }

      return vnode.componentInstance.name;
    }

    return name;
  };

  /**
   * Returns a value getter input type.
   */
  Resolver.resolveGetter = function resolveGetter (el, vnode, model) {
    if (model && model.expression) {
      return function () {
        return getPath(model.expression, vnode.context);
      };
    }

    if (vnode.componentInstance) {
      var path = getDataAttribute(el, 'value-path') || (vnode.componentInstance.$attrs && vnode.componentInstance.$attrs['data-vv-value-path']);
      if (path) {
        return function () {
          return getPath(path, vnode.componentInstance);
        };
      }

      var config = Resolver.getCtorConfig(vnode);
      if (config && isCallable(config.value)) {
        var boundGetter = config.value.bind(vnode.componentInstance);

        return function () {
          return boundGetter();
        };
      }

      var ref = vnode.componentInstance.$options.model || { prop: 'value' };
        var prop = ref.prop;

      return function () {
        return vnode.componentInstance[prop];
      };
    }

    switch (el.type) {
    case 'checkbox': return function () {
      var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));

      els = toArray(els).filter(function (el) { return el.checked; });
      if (!els.length) { return undefined; }

      return els.map(function (checkbox) { return checkbox.value; });
    };
    case 'radio': return function () {
      var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));
      var elm = find(els, function (el) { return el.checked; });

      return elm && elm.value;
    };
    case 'file': return function (context) {
      return toArray(el.files);
    };
    case 'select-multiple': return function () {
      return toArray(el.options).filter(function (opt) { return opt.selected; }).map(function (opt) { return opt.value; });
    };
    default: return function () {
      return el && el.value;
    };
    }
  };

  var RULES = {};

  var RuleContainer = function RuleContainer () {};

  var staticAccessors = { rules: { configurable: true } };

  RuleContainer.add = function add (name, ref) {
      var validate = ref.validate;
      var options = ref.options;
      var paramNames = ref.paramNames;

    RULES[name] = {
      validate: validate,
      options: options,
      paramNames: paramNames
    };
  };

  staticAccessors.rules.get = function () {
    return RULES;
  };

  RuleContainer.has = function has (name) {
    return !!RULES[name];
  };

  RuleContainer.isImmediate = function isImmediate (name) {
    return !!(RULES[name] && RULES[name].options.immediate);
  };

  RuleContainer.isRequireRule = function isRequireRule (name) {
    return !!(RULES[name] && RULES[name].options.computesRequired);
  };

  RuleContainer.isTargetRule = function isTargetRule (name) {
    return !!(RULES[name] && RULES[name].options.hasTarget);
  };

  RuleContainer.remove = function remove (ruleName) {
    delete RULES[ruleName];
  };

  RuleContainer.getParamNames = function getParamNames (ruleName) {
    return RULES[ruleName] && RULES[ruleName].paramNames;
  };

  RuleContainer.getOptions = function getOptions (ruleName) {
    return RULES[ruleName] && RULES[ruleName].options;
  };

  RuleContainer.getValidatorMethod = function getValidatorMethod (ruleName) {
    return RULES[ruleName] ? RULES[ruleName].validate : null;
  };

  Object.defineProperties( RuleContainer, staticAccessors );

  // 

  var isEvent = function (evt) {
    return (typeof Event !== 'undefined' && isCallable(Event) && evt instanceof Event) || (evt && evt.srcElement);
  };

  var normalizeEvents = function (evts) {
    if (!evts) { return []; }

    return (typeof evts === 'string' ? evts.split('|') : evts);
  };

  var supportsPassive = true;

  var detectPassiveSupport = function () {
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get () {
          supportsPassive = true;
        }
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) {
      supportsPassive = false;
    }
    return supportsPassive;
  };

  var addEventListener = function (el, eventName, cb) {
    el.addEventListener(eventName, cb, supportsPassive ? { passive: true } : false);
  };

  // 

  var DEFAULT_OPTIONS = {
    targetOf: null,
    immediate: false,
    persist: false,
    scope: null,
    listen: true,
    name: null,
    rules: {},
    vm: null,
    classes: false,
    validity: true,
    aria: true,
    events: 'input|blur',
    delay: 0,
    classNames: {
      touched: 'touched', // the control has been blurred
      untouched: 'untouched', // the control hasn't been blurred
      valid: 'valid', // model is valid
      invalid: 'invalid', // model is invalid
      pristine: 'pristine', // control has not been interacted with
      dirty: 'dirty' // control has been interacted with
    }
  };

  var Field = function Field (options) {
    if ( options === void 0 ) options = {};

    this.id = uniqId();
    this.el = options.el;
    this.updated = false;
    this.vmId = options.vmId;
    defineNonReactive(this, 'dependencies', []);
    defineNonReactive(this, 'watchers', []);
    defineNonReactive(this, 'events', []);
    this.delay = 0;
    this.rules = {};
    this.forceRequired = false;
    this._cacheId(options);
    this.classNames = assign({}, DEFAULT_OPTIONS.classNames);
    options = assign({}, DEFAULT_OPTIONS, options);
    this._delay = !isNullOrUndefined(options.delay) ? options.delay : 0; // cache initial delay
    this.validity = options.validity;
    this.aria = options.aria;
    this.flags = options.flags || createFlags();
    defineNonReactive(this, 'vm', options.vm);
    defineNonReactive(this, 'componentInstance', options.component);
    this.ctorConfig = this.componentInstance ? getPath('$options.$_veeValidate', this.componentInstance) : undefined;
    this.update(options);
    // set initial value.
    this.initialValue = this.value;
    this.updated = false;
  };

  var prototypeAccessors$1 = { validator: { configurable: true },isRequired: { configurable: true },isDisabled: { configurable: true },alias: { configurable: true },value: { configurable: true },bails: { configurable: true },rejectsFalse: { configurable: true } };

  prototypeAccessors$1.validator.get = function () {
    if (!this.vm || !this.vm.$validator) {
      return { validate: function () {} };
    }

    return this.vm.$validator;
  };

  prototypeAccessors$1.isRequired.get = function () {
    return !!this.rules.required || this.forceRequired;
  };

  prototypeAccessors$1.isDisabled.get = function () {
    return !!(this.el && this.el.disabled);
  };

  /**
   * Gets the display name (user-friendly name).
   */
  prototypeAccessors$1.alias.get = function () {
    if (this._alias) {
      return this._alias;
    }

    var alias = null;
    if (this.ctorConfig && this.ctorConfig.alias) {
      alias = isCallable(this.ctorConfig.alias) ? this.ctorConfig.alias.call(this.componentInstance) : this.ctorConfig.alias;
    }

    if (!alias && this.el) {
      alias = getDataAttribute(this.el, 'as');
    }

    if (!alias && this.componentInstance) {
      return this.componentInstance.$attrs && this.componentInstance.$attrs['data-vv-as'];
    }

    return alias;
  };

  /**
   * Gets the input value.
   */

  prototypeAccessors$1.value.get = function () {
    if (!isCallable(this.getter)) {
      return undefined;
    }

    return this.getter();
  };

  prototypeAccessors$1.bails.get = function () {
    return this._bails;
  };

  /**
   * If the field rejects false as a valid value for the required rule.
   */

  prototypeAccessors$1.rejectsFalse.get = function () {
    if (this.componentInstance && this.ctorConfig) {
      return !!this.ctorConfig.rejectsFalse;
    }

    if (!this.el) {
      return false;
    }

    return this.el.type === 'checkbox';
  };

  /**
   * Determines if the instance matches the options provided.
   */
  Field.prototype.matches = function matches (options) {
      var this$1 = this;

    if (!options) {
      return true;
    }

    if (options.id) {
      return this.id === options.id;
    }

    var matchesComponentId = isNullOrUndefined(options.vmId) ? function () { return true; } : function (id) { return id === this$1.vmId; };
    if (!matchesComponentId(options.vmId)) {
      return false;
    }

    if (options.name === undefined && options.scope === undefined) {
      return true;
    }

    if (options.scope === undefined) {
      return this.name === options.name;
    }

    if (options.name === undefined) {
      return this.scope === options.scope;
    }

    return options.name === this.name && options.scope === this.scope;
  };

  /**
   * Caches the field id.
   */
  Field.prototype._cacheId = function _cacheId (options) {
    if (this.el && !options.targetOf) {
      this.el._veeValidateId = this.id;
    }
  };

  /**
   * Keeps a reference of the most current validation run.
   */
  Field.prototype.waitFor = function waitFor (pendingPromise) {
    this._waitingFor = pendingPromise;
  };

  Field.prototype.isWaitingFor = function isWaitingFor (promise) {
    return this._waitingFor === promise;
  };

  /**
   * Updates the field with changed data.
   */
  Field.prototype.update = function update (options) {
    this.targetOf = options.targetOf || null;
    this.immediate = options.immediate || this.immediate || false;
    this.persist = options.persist || this.persist || false;

    // update errors scope if the field scope was changed.
    if (!isNullOrUndefined(options.scope) && options.scope !== this.scope && isCallable(this.validator.update)) {
      this.validator.update(this.id, { scope: options.scope });
    }
    this.scope = !isNullOrUndefined(options.scope) ? options.scope
      : !isNullOrUndefined(this.scope) ? this.scope : null;
    this.name = (!isNullOrUndefined(options.name) ? String(options.name) : options.name) || this.name || null;
    this.rules = options.rules !== undefined ? normalizeRules(options.rules) : this.rules;
    this._bails = options.bails !== undefined ? options.bails : this._bails;
    this.model = options.model || this.model;
    this.listen = options.listen !== undefined ? options.listen : this.listen;
    this.classes = (options.classes || this.classes || false) && !this.componentInstance;
    this.classNames = isObject(options.classNames) ? merge(this.classNames, options.classNames) : this.classNames;
    this.getter = isCallable(options.getter) ? options.getter : this.getter;
    this._alias = options.alias || this._alias;
    this.events = (options.events) ? normalizeEvents(options.events) : this.events;
    this.delay = makeDelayObject(this.events, options.delay || this.delay, this._delay);
    this.updateDependencies();
    this.addActionListeners();

    if (!this.name && !this.targetOf) {
      warn('A field is missing a "name" or "data-vv-name" attribute');
    }

    // update required flag flags
    if (options.rules !== undefined) {
      this.flags.required = this.isRequired;
    }

    // validate if it was validated before and field was updated and there was a rules mutation.
    if (this.flags.validated && options.rules !== undefined && this.updated) {
      this.validator.validate(("#" + (this.id)));
    }

    this.updated = true;
    this.addValueListeners();

    // no need to continue.
    if (!this.el) {
      return;
    }
    this.updateClasses();
    this.updateAriaAttrs();
  };

  /**
   * Resets field flags and errors.
   */
  Field.prototype.reset = function reset () {
      var this$1 = this;

    if (this._cancellationToken) {
      this._cancellationToken.cancelled = true;
      delete this._cancellationToken;
    }

    var defaults = createFlags();
    Object.keys(this.flags).filter(function (flag) { return flag !== 'required'; }).forEach(function (flag) {
      this$1.flags[flag] = defaults[flag];
    });

    // update initial value
    this.initialValue = this.value;
    this.flags.changed = false;

    this.addValueListeners();
    this.addActionListeners();
    this.updateClasses(true);
    this.updateAriaAttrs();
    this.updateCustomValidity();
  };

  /**
   * Sets the flags and their negated counterparts, and updates the classes and re-adds action listeners.
   */
  Field.prototype.setFlags = function setFlags (flags) {
      var this$1 = this;

    var negated = {
      pristine: 'dirty',
      dirty: 'pristine',
      valid: 'invalid',
      invalid: 'valid',
      touched: 'untouched',
      untouched: 'touched'
    };

    Object.keys(flags).forEach(function (flag) {
      this$1.flags[flag] = flags[flag];
      // if it has a negation and was not specified, set it as well.
      if (negated[flag] && flags[negated[flag]] === undefined) {
        this$1.flags[negated[flag]] = !flags[flag];
      }
    });

    if (
      flags.untouched !== undefined ||
      flags.touched !== undefined ||
      flags.dirty !== undefined ||
      flags.pristine !== undefined
    ) {
      this.addActionListeners();
    }
    this.updateClasses();
    this.updateAriaAttrs();
    this.updateCustomValidity();
  };

  /**
   * Determines if the field requires references to target fields.
  */
  Field.prototype.updateDependencies = function updateDependencies () {
      var this$1 = this;

    // reset dependencies.
    this.dependencies.forEach(function (d) { return d.field.destroy(); });
    this.dependencies = [];

    // we get the selectors for each field.
    var fields = Object.keys(this.rules).reduce(function (prev, r) {
      if (RuleContainer.isTargetRule(r)) {
        prev.push({ selector: this$1.rules[r][0], name: r });
      }

      return prev;
    }, []);

    if (!fields.length || !this.vm || !this.vm.$el) { return; }

    // must be contained within the same component, so we use the vm root element constrain our dom search.
    fields.forEach(function (ref$1) {
        var selector = ref$1.selector;
        var name = ref$1.name;

      var ref = this$1.vm.$refs[selector];
      var el = Array.isArray(ref) ? ref[0] : ref;
      if (!el) {
        return;
      }

      var options = {
        vm: this$1.vm,
        classes: this$1.classes,
        classNames: this$1.classNames,
        delay: this$1.delay,
        scope: this$1.scope,
        events: this$1.events.join('|'),
        immediate: this$1.immediate,
        targetOf: this$1.id
      };

      // probably a component.
      if (isCallable(el.$watch)) {
        options.component = el;
        options.el = el.$el;
        options.getter = Resolver.resolveGetter(el.$el, el.$vnode);
      } else {
        options.el = el;
        options.getter = Resolver.resolveGetter(el, {});
      }

      this$1.dependencies.push({ name: name, field: new Field(options) });
    });
  };

  /**
   * Removes listeners.
   */
  Field.prototype.unwatch = function unwatch (tag) {
      if ( tag === void 0 ) tag = null;

    if (!tag) {
      this.watchers.forEach(function (w) { return w.unwatch(); });
      this.watchers = [];
      return;
    }

    this.watchers.filter(function (w) { return tag.test(w.tag); }).forEach(function (w) { return w.unwatch(); });
    this.watchers = this.watchers.filter(function (w) { return !tag.test(w.tag); });
  };

  /**
   * Updates the element classes depending on each field flag status.
   */
  Field.prototype.updateClasses = function updateClasses (isReset) {
      var this$1 = this;
      if ( isReset === void 0 ) isReset = false;

    if (!this.classes || this.isDisabled) { return; }
    var applyClasses = function (el) {
      toggleClass(el, this$1.classNames.dirty, this$1.flags.dirty);
      toggleClass(el, this$1.classNames.pristine, this$1.flags.pristine);
      toggleClass(el, this$1.classNames.touched, this$1.flags.touched);
      toggleClass(el, this$1.classNames.untouched, this$1.flags.untouched);

      // remove valid/invalid classes on reset.
      if (isReset) {
        toggleClass(el, this$1.classNames.valid, false);
        toggleClass(el, this$1.classNames.invalid, false);
      }

      // make sure we don't set any classes if the state is undetermined.
      if (!isNullOrUndefined(this$1.flags.valid) && this$1.flags.validated) {
        toggleClass(el, this$1.classNames.valid, this$1.flags.valid);
      }

      if (!isNullOrUndefined(this$1.flags.invalid) && this$1.flags.validated) {
        toggleClass(el, this$1.classNames.invalid, this$1.flags.invalid);
      }
    };

    if (!isCheckboxOrRadioInput(this.el)) {
      applyClasses(this.el);
      return;
    }

    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(applyClasses);
  };

  /**
   * Adds the listeners required for automatic classes and some flags.
   */
  Field.prototype.addActionListeners = function addActionListeners () {
      var this$1 = this;

    // remove previous listeners.
    this.unwatch(/class/);

    if (!this.el) { return; }

    var onBlur = function () {
      this$1.flags.touched = true;
      this$1.flags.untouched = false;
      if (this$1.classes) {
        toggleClass(this$1.el, this$1.classNames.touched, true);
        toggleClass(this$1.el, this$1.classNames.untouched, false);
      }

      // only needed once.
      this$1.unwatch(/^class_blur$/);
    };

    var inputEvent = isTextInput(this.el) ? 'input' : 'change';
    var onInput = function () {
      this$1.flags.dirty = true;
      this$1.flags.pristine = false;
      if (this$1.classes) {
        toggleClass(this$1.el, this$1.classNames.pristine, false);
        toggleClass(this$1.el, this$1.classNames.dirty, true);
      }

      // only needed once.
      this$1.unwatch(/^class_input$/);
    };

    if (this.componentInstance && isCallable(this.componentInstance.$once)) {
      this.componentInstance.$once('input', onInput);
      this.componentInstance.$once('blur', onBlur);
      this.watchers.push({
        tag: 'class_input',
        unwatch: function () {
          this$1.componentInstance.$off('input', onInput);
        }
      });
      this.watchers.push({
        tag: 'class_blur',
        unwatch: function () {
          this$1.componentInstance.$off('blur', onBlur);
        }
      });
      return;
    }

    if (!this.el) { return; }

    addEventListener(this.el, inputEvent, onInput);
    // Checkboxes and radio buttons on Mac don't emit blur naturally, so we listen on click instead.
    var blurEvent = isCheckboxOrRadioInput(this.el) ? 'change' : 'blur';
    addEventListener(this.el, blurEvent, onBlur);
    this.watchers.push({
      tag: 'class_input',
      unwatch: function () {
        this$1.el.removeEventListener(inputEvent, onInput);
      }
    });

    this.watchers.push({
      tag: 'class_blur',
      unwatch: function () {
        this$1.el.removeEventListener(blurEvent, onBlur);
      }
    });
  };

  Field.prototype.checkValueChanged = function checkValueChanged () {
    // handle some people initialize the value to null, since text inputs have empty string value.
    if (this.initialValue === null && this.value === '' && isTextInput(this.el)) {
      return false;
    }

    return this.value !== this.initialValue;
  };

  /**
   * Determines the suitable primary event to listen for.
   */
  Field.prototype._determineInputEvent = function _determineInputEvent () {
    // if its a custom component, use the customized model event or the input event.
    if (this.componentInstance) {
      return (this.componentInstance.$options.model && this.componentInstance.$options.model.event) || 'input';
    }

    if (this.model && this.model.lazy) {
      return 'change';
    }

    if (isTextInput(this.el)) {
      return 'input';
    }

    return 'change';
  };

  /**
   * Determines the list of events to listen to.
   */
  Field.prototype._determineEventList = function _determineEventList (defaultInputEvent) {
      var this$1 = this;

    // if no event is configured, or it is a component or a text input then respect the user choice.
    if (!this.events.length || this.componentInstance || isTextInput(this.el)) {
      return [].concat( this.events ).map(function (evt) {
        if (evt === 'input' && this$1.model && this$1.model.lazy) {
          return 'change';
        }

        return evt;
      });
    }

    // force suitable event for non-text type fields.
    return this.events.map(function (e) {
      if (e === 'input') {
        return defaultInputEvent;
      }

      return e;
    });
  };

  /**
   * Adds the listeners required for validation.
   */
  Field.prototype.addValueListeners = function addValueListeners () {
      var this$1 = this;

    this.unwatch(/^input_.+/);
    if (!this.listen || !this.el) { return; }

    var token = { cancelled: false };
    var fn = this.targetOf ? function () {
      var target = this$1.validator._resolveField(("#" + (this$1.targetOf)));
      if (target && target.flags.validated) {
        this$1.validator.validate(("#" + (this$1.targetOf)));
      }
    } : function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      // if its a DOM event, resolve the value, otherwise use the first parameter as the value.
      if (args.length === 0 || isEvent(args[0])) {
        args[0] = this$1.value;
      }

      this$1.flags.pending = true;
      this$1._cancellationToken = token;
      this$1.validator.validate(("#" + (this$1.id)), args[0]);
    };

    var inputEvent = this._determineInputEvent();
    var events = this._determineEventList(inputEvent);

    // if there is a model and an on input validation is requested.
    if (this.model && includes(events, inputEvent)) {
      var ctx = null;
      var expression = this.model.expression;
      // if its watchable from the context vm.
      if (this.model.expression) {
        ctx = this.vm;
        expression = this.model.expression;
      }

      // watch it from the custom component vm instead.
      if (!expression && this.componentInstance && this.componentInstance.$options.model) {
        ctx = this.componentInstance;
        expression = this.componentInstance.$options.model.prop || 'value';
      }

      if (ctx && expression) {
        var debouncedFn = debounce(fn, this.delay[inputEvent], token);
        var unwatch = ctx.$watch(expression, debouncedFn);
        this.watchers.push({
          tag: 'input_model',
          unwatch: function () {
            this$1.vm.$nextTick(function () {
              unwatch();
            });
          }
        });

        // filter out input event as it is already handled by the watcher API.
        events = events.filter(function (e) { return e !== inputEvent; });
      }
    }

    // Add events.
    events.forEach(function (e) {
      var debouncedFn = debounce(fn, this$1.delay[e], token);

      this$1._addComponentEventListener(e, debouncedFn);
      this$1._addHTMLEventListener(e, debouncedFn);
    });
  };

  Field.prototype._addComponentEventListener = function _addComponentEventListener (evt, validate) {
      var this$1 = this;

    if (!this.componentInstance) { return; }

    this.componentInstance.$on(evt, validate);
    this.watchers.push({
      tag: 'input_vue',
      unwatch: function () {
        this$1.componentInstance.$off(evt, validate);
      }
    });
  };

  Field.prototype._addHTMLEventListener = function _addHTMLEventListener (evt, validate) {
      var this$1 = this;

    if (!this.el || this.componentInstance) { return; }

    // listen for the current element.
    var addListener = function (el) {
      addEventListener(el, evt, validate);
      this$1.watchers.push({
        tag: 'input_native',
        unwatch: function () {
          el.removeEventListener(evt, validate);
        }
      });
    };

    addListener(this.el);
    if (!isCheckboxOrRadioInput(this.el)) {
      return;
    }

    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(function (el) {
      // skip if it is added by v-validate and is not the current element.
      if (el._veeValidateId && el !== this$1.el) {
        return;
      }

      addListener(el);
    });
  };

  /**
   * Updates aria attributes on the element.
   */
  Field.prototype.updateAriaAttrs = function updateAriaAttrs () {
      var this$1 = this;

    if (!this.aria || !this.el || !isCallable(this.el.setAttribute)) { return; }

    var applyAriaAttrs = function (el) {
      el.setAttribute('aria-required', this$1.isRequired ? 'true' : 'false');
      el.setAttribute('aria-invalid', this$1.flags.invalid ? 'true' : 'false');
    };

    if (!isCheckboxOrRadioInput(this.el)) {
      applyAriaAttrs(this.el);
      return;
    }

    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(applyAriaAttrs);
  };

  /**
   * Updates the custom validity for the field.
   */
  Field.prototype.updateCustomValidity = function updateCustomValidity () {
    if (!this.validity || !this.el || !isCallable(this.el.setCustomValidity) || !this.validator.errors) { return; }

    this.el.setCustomValidity(this.flags.valid ? '' : (this.validator.errors.firstById(this.id) || ''));
  };

  /**
   * Removes all listeners.
   */
  Field.prototype.destroy = function destroy () {
    // ignore the result of any ongoing validation.
    if (this._cancellationToken) {
      this._cancellationToken.cancelled = true;
    }

    this.unwatch();
    this.dependencies.forEach(function (d) { return d.field.destroy(); });
    this.dependencies = [];
  };

  Object.defineProperties( Field.prototype, prototypeAccessors$1 );

  // 

  var FieldBag = function FieldBag (items) {
    if ( items === void 0 ) items = [];

    this.items = items || [];
    this.itemsById = this.items.reduce(function (itemsById, item) {
      itemsById[item.id] = item;
      return itemsById;
    }, {});
  };

  var prototypeAccessors$2 = { length: { configurable: true } };

  FieldBag.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
      var this$1 = this;

    var index = 0;
    return {
      next: function () {
        return { value: this$1.items[index++], done: index > this$1.items.length };
      }
    };
  };

  /**
   * Gets the current items length.
   */

  prototypeAccessors$2.length.get = function () {
    return this.items.length;
  };

  /**
   * Finds the first field that matches the provided matcher object.
   */
  FieldBag.prototype.find = function find$1 (matcher) {
    return find(this.items, function (item) { return item.matches(matcher); });
  };

  /**
   * Finds the field with the given id, using a plain object as a map to link
   * ids to items faster than by looping over the array and matching.
   */
  FieldBag.prototype.findById = function findById (id) {
    return this.itemsById[id] || null;
  };

  /**
   * Filters the items down to the matched fields.
   */
  FieldBag.prototype.filter = function filter (matcher) {
    // multiple matchers to be tried.
    if (Array.isArray(matcher)) {
      return this.items.filter(function (item) { return matcher.some(function (m) { return item.matches(m); }); });
    }

    return this.items.filter(function (item) { return item.matches(matcher); });
  };

  /**
   * Maps the field items using the mapping function.
   */
  FieldBag.prototype.map = function map (mapper) {
    return this.items.map(mapper);
  };

  /**
   * Finds and removes the first field that matches the provided matcher object, returns the removed item.
   */
  FieldBag.prototype.remove = function remove (matcher) {
    var item = null;
    if (matcher instanceof Field) {
      item = matcher;
    } else {
      item = this.find(matcher);
    }

    if (!item) { return null; }

    var index = this.items.indexOf(item);
    this.items.splice(index, 1);
    delete this.itemsById[item.id];

    return item;
  };

  /**
   * Adds a field item to the list.
   */
  FieldBag.prototype.push = function push (item) {
    if (! (item instanceof Field)) {
      throw createError('FieldBag only accepts instances of Field that has an id defined.');
    }

    if (!item.id) {
      throw createError('Field id must be defined.');
    }

    if (this.findById(item.id)) {
      throw createError(("Field with id " + (item.id) + " is already added."));
    }

    this.items.push(item);
    this.itemsById[item.id] = item;
  };

  Object.defineProperties( FieldBag.prototype, prototypeAccessors$2 );

  var ScopedValidator = function ScopedValidator (base, vm) {
    this.id = vm._uid;
    this._base = base;
    this._paused = false;

    // create a mirror bag with limited component scope.
    this.errors = new ErrorBag(base.errors, this.id);
  };

  var prototypeAccessors$3 = { flags: { configurable: true },rules: { configurable: true },fields: { configurable: true },dictionary: { configurable: true },locale: { configurable: true } };

  prototypeAccessors$3.flags.get = function () {
      var this$1 = this;

    return this._base.fields.items.filter(function (f) { return f.vmId === this$1.id; }).reduce(function (acc, field) {
      if (field.scope) {
        if (!acc[("$" + (field.scope))]) {
          acc[("$" + (field.scope))] = {};
        }

        acc[("$" + (field.scope))][field.name] = field.flags;
      }

      acc[field.name] = field.flags;

      return acc;
    }, {});
  };

  prototypeAccessors$3.rules.get = function () {
    return this._base.rules;
  };

  prototypeAccessors$3.fields.get = function () {
    return new FieldBag(this._base.fields.filter({ vmId: this.id }));
  };

  prototypeAccessors$3.dictionary.get = function () {
    return this._base.dictionary;
  };

  prototypeAccessors$3.locale.get = function () {
    return this._base.locale;
  };

  prototypeAccessors$3.locale.set = function (val) {
    this._base.locale = val;
  };

  ScopedValidator.prototype.localize = function localize () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).localize.apply(ref, args);
  };

  ScopedValidator.prototype.update = function update () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).update.apply(ref, args);
  };

  ScopedValidator.prototype.attach = function attach (opts) {
    var attachOpts = assign({}, opts, { vmId: this.id });

    return this._base.attach(attachOpts);
  };

  ScopedValidator.prototype.pause = function pause () {
    this._paused = true;
  };

  ScopedValidator.prototype.resume = function resume () {
    this._paused = false;
  };

  ScopedValidator.prototype.remove = function remove (ruleName) {
    return this._base.remove(ruleName);
  };

  ScopedValidator.prototype.detach = function detach (name, scope) {
    return this._base.detach(name, scope, this.id);
  };

  ScopedValidator.prototype.extend = function extend () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).extend.apply(ref, args);
  };

  ScopedValidator.prototype.validate = function validate (descriptor, value, opts) {
      if ( opts === void 0 ) opts = {};

    if (this._paused) { return Promise.resolve(true); }

    return this._base.validate(descriptor, value, assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.verify = function verify () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).verify.apply(ref, args);
  };

  ScopedValidator.prototype.validateAll = function validateAll (values, opts) {
      if ( opts === void 0 ) opts = {};

    if (this._paused) { return Promise.resolve(true); }

    return this._base.validateAll(values, assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.validateScopes = function validateScopes (opts) {
      if ( opts === void 0 ) opts = {};

    if (this._paused) { return Promise.resolve(true); }

    return this._base.validateScopes(assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.destroy = function destroy () {
    delete this.id;
    delete this._base;
  };

  ScopedValidator.prototype.reset = function reset (matcher) {
    return this._base.reset(Object.assign({}, matcher || {}, { vmId: this.id }));
  };

  ScopedValidator.prototype.flag = function flag () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).flag.apply(ref, args.concat( [this.id] ));
  };

  ScopedValidator.prototype._resolveField = function _resolveField () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base)._resolveField.apply(ref, args);
  };

  Object.defineProperties( ScopedValidator.prototype, prototypeAccessors$3 );

  var VALIDATOR = null;

  var getValidator = function () {
    return VALIDATOR;
  };

  var setValidator = function (value) {
    VALIDATOR = value;

    return value;
  };

  // 

  /**
   * Checks if a parent validator instance was requested.
   */
  var requestsValidator = function (injections) {
    if (isObject(injections) && injections.$validator) {
      return true;
    }

    return false;
  };

  var mixin = {
    provide: function provide () {
      if (this.$validator && !isBuiltInComponent(this.$vnode)) {
        return {
          $validator: this.$validator
        };
      }

      return {};
    },
    beforeCreate: function beforeCreate () {
      // if built in do nothing.
      if (isBuiltInComponent(this.$vnode) || this.$options.$__veeInject === false) {
        return;
      }

      // if its a root instance set the config if it exists.
      if (!this.$parent) {
        setConfig(this.$options.$_veeValidate || {});
      }

      var options = resolveConfig(this);

      // if its a root instance, inject anyways, or if it requested a new instance.
      if (!this.$parent || (this.$options.$_veeValidate && /new/.test(this.$options.$_veeValidate.validator))) {
        this.$validator = new ScopedValidator(getValidator(), this);
      }

      var requested = requestsValidator(this.$options.inject);

      // if automatic injection is enabled and no instance was requested.
      if (! this.$validator && options.inject && !requested) {
        this.$validator = new ScopedValidator(getValidator(), this);
      }

      // don't inject errors or fieldBag as no validator was resolved.
      if (!requested && !this.$validator) {
        return;
      }

      // There is a validator but it isn't injected, mark as reactive.
      if (!requested && this.$validator) {
        var Vue = this.$options._base; // the vue constructor.
        Vue.util.defineReactive(this.$validator, 'errors', this.$validator.errors);
      }

      if (!this.$options.computed) {
        this.$options.computed = {};
      }

      this.$options.computed[options.errorBagName || 'errors'] = function errorBagGetter () {
        return this.$validator.errors;
      };
      this.$options.computed[options.fieldsBagName || 'fields'] = function fieldBagGetter () {
        return this.$validator.fields.items.reduce(function (acc, field) {
          if (field.scope) {
            if (!acc[("$" + (field.scope))]) {
              acc[("$" + (field.scope))] = {};
            }

            acc[("$" + (field.scope))][field.name] = field.flags;

            return acc;
          }

          acc[field.name] = field.flags;

          return acc;
        }, {});
      };
    },
    beforeDestroy: function beforeDestroy () {
      if (this.$validator && this._uid === this.$validator.id) {
        this.$validator.errors.clear(); // remove errors generated by this component.
      }
    }
  };

  // 

  /**
   * Finds the requested field by id from the context object.
   */
  function findField (el, context) {
    if (!context || !context.$validator) {
      return null;
    }

    return context.$validator.fields.findById(el._veeValidateId);
  }
  var directive = {
    bind: function bind (el, binding, vnode) {
      var validator = vnode.context.$validator;
      if (!validator) {
        {
          warn("No validator instance is present on vm, did you forget to inject '$validator'?");
        }

        return;
      }

      var fieldOptions = Resolver.generate(el, binding, vnode);
      validator.attach(fieldOptions);
    },
    inserted: function inserted (el, binding, vnode) {
      var field = findField(el, vnode.context);
      var scope = Resolver.resolveScope(el, binding, vnode);

      // skip if scope hasn't changed.
      if (!field || scope === field.scope) { return; }

      // only update scope.
      field.update({ scope: scope });

      // allows the field to re-evaluated once more in the update hook.
      field.updated = false;
    },
    update: function update (el, binding, vnode) {
      var field = findField(el, vnode.context);

      // make sure we don't do unneccasary work if no important change was done.
      if (!field || (field.updated && isEqual$1(binding.value, binding.oldValue))) { return; }
      var scope = Resolver.resolveScope(el, binding, vnode);
      var rules = Resolver.resolveRules(el, binding, vnode);

      field.update({
        scope: scope,
        rules: rules
      });
    },
    unbind: function unbind (el, binding, ref) {
      var context = ref.context;

      var field = findField(el, context);
      if (!field) { return; }

      context.$validator.detach(field);
    }
  };

  // 

  var Validator = function Validator (validations, options, pluginContainer) {
    if ( options === void 0 ) options = { fastExit: true };
    if ( pluginContainer === void 0 ) pluginContainer = null;

    this.errors = new ErrorBag();
    this.fields = new FieldBag();
    this._createFields(validations);
    this.paused = false;
    this.fastExit = !isNullOrUndefined(options && options.fastExit) ? options.fastExit : true;
    this.$vee = pluginContainer || {
      _vm: {
        $nextTick: function (cb) { return isCallable(cb) ? cb() : Promise.resolve(); },
        $emit: function () {},
        $off: function () {}
      }
    };
  };

  var prototypeAccessors$4 = { rules: { configurable: true },dictionary: { configurable: true },flags: { configurable: true },locale: { configurable: true } };
  var staticAccessors$1 = { rules: { configurable: true },dictionary: { configurable: true },locale: { configurable: true } };

  /**
   * @deprecated
   */
  staticAccessors$1.rules.get = function () {
    {
      warn('this accessor will be deprecated, use `import { rules } from "vee-validate"` instead.');
    }

    return RuleContainer.rules;
  };

  /**
   * @deprecated
   */
  prototypeAccessors$4.rules.get = function () {
    {
      warn('this accessor will be deprecated, use `import { rules } from "vee-validate"` instead.');
    }

    return RuleContainer.rules;
  };

  prototypeAccessors$4.dictionary.get = function () {
    return DictionaryResolver.getDriver();
  };

  staticAccessors$1.dictionary.get = function () {
    return DictionaryResolver.getDriver();
  };

  prototypeAccessors$4.flags.get = function () {
    return this.fields.items.reduce(function (acc, field) {
        var obj;

      if (field.scope) {
        acc[("$" + (field.scope))] = ( obj = {}, obj[field.name] = field.flags, obj );

        return acc;
      }

      acc[field.name] = field.flags;

      return acc;
    }, {});
  };

  /**
   * Getter for the current locale.
   */
  prototypeAccessors$4.locale.get = function () {
    return Validator.locale;
  };

  /**
   * Setter for the validator locale.
   */
  prototypeAccessors$4.locale.set = function (value) {
    Validator.locale = value;
  };

  staticAccessors$1.locale.get = function () {
    return DictionaryResolver.getDriver().locale;
  };

  /**
   * Setter for the validator locale.
   */
  staticAccessors$1.locale.set = function (value) {
    var hasChanged = value !== DictionaryResolver.getDriver().locale;
    DictionaryResolver.getDriver().locale = value;
    if (hasChanged && Validator.$vee && Validator.$vee._vm) {
      Validator.$vee._vm.$emit('localeChanged');
    }
  };

  /**
   * Static constructor.
   * @deprecated
   */
  Validator.create = function create (validations, options) {
    {
      warn('Please use `new` to create new validator instances.');
    }

    return new Validator(validations, options);
  };

  /**
   * Adds a custom validator to the list of validation rules.
   */
  Validator.extend = function extend (name, validator, options) {
      if ( options === void 0 ) options = {};

    Validator._guardExtend(name, validator);
    // rules imported from the minimal bundle
    // will have the options embedded in them
    var mergedOpts = validator.options || {};
    Validator._merge(name, {
      validator: validator,
      paramNames: (options && options.paramNames) || validator.paramNames,
      options: assign({ hasTarget: false, immediate: true }, mergedOpts, options || {})
    });
  };

  /**
   * Removes a rule from the list of validators.
   * @deprecated
   */
  Validator.remove = function remove (name) {
    {
      warn('this method will be deprecated, you can still override your rules with `extend`');
    }

    RuleContainer.remove(name);
  };

  /**
   * Adds and sets the current locale for the validator.
  */
  Validator.prototype.localize = function localize (lang, dictionary) {
    Validator.localize(lang, dictionary);
  };

  /**
   * Adds and sets the current locale for the validator.
   */
  Validator.localize = function localize (lang, dictionary) {
      var obj;

    if (isObject(lang)) {
      DictionaryResolver.getDriver().merge(lang);
      return;
    }

    // merge the dictionary.
    if (dictionary) {
      var locale = lang || dictionary.name;
      dictionary = assign({}, dictionary);
      DictionaryResolver.getDriver().merge(( obj = {}, obj[locale] = dictionary, obj ));
    }

    if (lang) {
      // set the locale.
      Validator.locale = lang;
    }
  };

  /**
   * Registers a field to be validated.
   */
  Validator.prototype.attach = function attach (fieldOpts) {
      var this$1 = this;

    // We search for a field with the same name & scope, having persist enabled
    var oldFieldMatcher = { name: fieldOpts.name, scope: fieldOpts.scope, persist: true };
    var oldField = fieldOpts.persist ? this.fields.find(oldFieldMatcher) : null;

    if (oldField) {
      // We keep the flags of the old field, then we remove its instance
      fieldOpts.flags = oldField.flags;
      oldField.destroy();
      this.fields.remove(oldField);
    }

    // fixes initial value detection with v-model and select elements.
    var value = fieldOpts.initialValue;
    var field = new Field(fieldOpts);
    this.fields.push(field);

    // validate the field initially
    if (field.immediate) {
      this.$vee._vm.$nextTick(function () { return this$1.validate(("#" + (field.id)), value || field.value, { vmId: fieldOpts.vmId }); });
    } else {
      this._validate(field, value || field.value, { initial: true }).then(function (result) {
        field.flags.valid = result.valid;
        field.flags.invalid = !result.valid;
      });
    }

    return field;
  };

  /**
   * Sets the flags on a field.
   */
  Validator.prototype.flag = function flag (name, flags, uid) {
      if ( uid === void 0 ) uid = null;

    var field = this._resolveField(name, undefined, uid);
    if (!field || !flags) {
      return;
    }

    field.setFlags(flags);
  };

  /**
   * Removes a field from the validator.
   */
  Validator.prototype.detach = function detach (name, scope, uid) {
    var field = isCallable(name.destroy) ? name : this._resolveField(name, scope, uid);
    if (!field) { return; }

    // We destroy/remove the field & error instances if it's not a `persist` one
    if (!field.persist) {
      field.destroy();
      this.errors.remove(field.name, field.scope, field.vmId);
      this.fields.remove(field);
    }
  };

  /**
   * Adds a custom validator to the list of validation rules.
   */
  Validator.prototype.extend = function extend (name, validator, options) {
      if ( options === void 0 ) options = {};

    Validator.extend(name, validator, options);
  };

  Validator.prototype.reset = function reset (matcher) {
      var this$1 = this;

    // two ticks
    return this.$vee._vm.$nextTick().then(function () {
      return this$1.$vee._vm.$nextTick();
    }).then(function () {
      this$1.fields.filter(matcher).forEach(function (field) {
        field.waitFor(null);
        field.reset(); // reset field flags.
        this$1.errors.remove(field.name, field.scope, matcher && matcher.vmId);
      });
    });
  };

  /**
   * Updates a field, updating both errors and flags.
   */
  Validator.prototype.update = function update (id, ref) {
      var scope = ref.scope;

    var field = this._resolveField(("#" + id));
    if (!field) { return; }

    // remove old scope.
    this.errors.update(id, { scope: scope });
  };

  /**
   * Removes a rule from the list of validators.
   * @deprecated
   */
  Validator.prototype.remove = function remove (name) {
    Validator.remove(name);
  };

  /**
   * Validates a value against a registered field validations.
   */
  Validator.prototype.validate = function validate (fieldDescriptor, value, ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var silent = ref.silent;
      var vmId = ref.vmId;

    if (this.paused) { return Promise.resolve(true); }

    // overload to validate all.
    if (isNullOrUndefined(fieldDescriptor)) {
      return this.validateScopes({ silent: silent, vmId: vmId });
    }

    // overload to validate scope-less fields.
    if (fieldDescriptor === '*') {
      return this.validateAll(undefined, { silent: silent, vmId: vmId });
    }

    // if scope validation was requested.
    if (/^(.+)\.\*$/.test(fieldDescriptor)) {
      var matched = fieldDescriptor.match(/^(.+)\.\*$/)[1];
      return this.validateAll(matched);
    }

    var field = this._resolveField(fieldDescriptor);
    if (!field) {
      return this._handleFieldNotFound(fieldDescriptor);
    }

    if (!silent) { field.flags.pending = true; }
    if (value === undefined) {
      value = field.value;
    }

    var validationPromise = this._validate(field, value);
    field.waitFor(validationPromise);

    return validationPromise.then(function (result) {
      if (!silent && field.isWaitingFor(validationPromise)) {
        // allow next validation to mutate the state.
        field.waitFor(null);
        this$1._handleValidationResults([result], vmId);
      }

      return result.valid;
    });
  };

  /**
   * Pauses the validator.
   */
  Validator.prototype.pause = function pause () {
    this.paused = true;

    return this;
  };

  /**
   * Resumes the validator.
   */
  Validator.prototype.resume = function resume () {
    this.paused = false;

    return this;
  };

  /**
   * Validates each value against the corresponding field validations.
   */
  Validator.prototype.validateAll = function validateAll (values, ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var silent = ref.silent;
      var vmId = ref.vmId;

    if (this.paused) { return Promise.resolve(true); }

    var matcher = null;
    var providedValues = false;

    if (typeof values === 'string') {
      matcher = { scope: values, vmId: vmId };
    } else if (isObject(values)) {
      matcher = Object.keys(values).map(function (key) {
        return { name: key, vmId: vmId, scope: null };
      });
      providedValues = true;
    } else if (Array.isArray(values)) {
      matcher = values.map(function (key) {
        return typeof key === 'object' ? Object.assign({ vmId: vmId }, key) : { name: key, vmId: vmId };
      });
    } else {
      matcher = { scope: null, vmId: vmId };
    }

    return Promise.all(
      this.fields.filter(matcher).map(function (field) { return this$1._validate(field, providedValues ? values[field.name] : field.value); })
    ).then(function (results) {
      if (!silent) {
        this$1._handleValidationResults(results, vmId);
      }

      return results.every(function (t) { return t.valid; });
    });
  };

  /**
   * Validates all scopes.
   */
  Validator.prototype.validateScopes = function validateScopes (ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var silent = ref.silent;
      var vmId = ref.vmId;

    if (this.paused) { return Promise.resolve(true); }

    return Promise.all(
      this.fields.filter({ vmId: vmId }).map(function (field) { return this$1._validate(field, field.value); })
    ).then(function (results) {
      if (!silent) {
        this$1._handleValidationResults(results, vmId);
      }

      return results.every(function (t) { return t.valid; });
    });
  };

  /**
   * Validates a value against the rules.
   */
  Validator.prototype.verify = function verify (value, rules, options) {
      if ( options === void 0 ) options = {};

    var field = {
      name: (options && options.name) || '{field}',
      rules: normalizeRules(rules),
      bails: getPath('bails', options, true),
      forceRequired: false,
      get isRequired () {
        return !!this.rules.required || this.forceRequired;
      }
    };

    var targetRules = Object.keys(field.rules).filter(RuleContainer.isTargetRule);
    if (targetRules.length && options && isObject(options.values)) {
      field.dependencies = targetRules.map(function (rule) {
        var ref = field.rules[rule];
          var targetKey = ref[0];

        return {
          name: rule,
          field: { value: options.values[targetKey] }
        };
      });
    }

    return this._validate(field, value).then(function (result) {
      var errors = [];
      var ruleMap = {};
      result.errors.forEach(function (e) {
        errors.push(e.msg);
        ruleMap[e.rule] = e.msg;
      });

      return {
        valid: result.valid,
        errors: errors,
        failedRules: ruleMap
      };
    });
  };

  /**
   * Perform cleanup.
   */
  Validator.prototype.destroy = function destroy () {
    this.$vee._vm.$off('localeChanged');
  };

  /**
   * Creates the fields to be validated.
   */
  Validator.prototype._createFields = function _createFields (validations) {
      var this$1 = this;

    if (!validations) { return; }

    Object.keys(validations).forEach(function (field) {
      var options = assign({}, { name: field, rules: validations[field] });
      this$1.attach(options);
    });
  };

  /**
   * Date rules need the existence of a format, so date_format must be supplied.
   */
  Validator.prototype._getDateFormat = function _getDateFormat (validations) {
    var format = null;
    if (validations.date_format && Array.isArray(validations.date_format)) {
      format = validations.date_format[0];
    }

    return format || DictionaryResolver.getDriver().getDateFormat(this.locale);
  };

  /**
   * Formats an error message for field and a rule.
   */
  Validator.prototype._formatErrorMessage = function _formatErrorMessage (field, rule, data, targetName) {
      if ( data === void 0 ) data = {};
      if ( targetName === void 0 ) targetName = null;

    var name = this._getFieldDisplayName(field);
    var params = this._getLocalizedParams(rule, targetName);

    return DictionaryResolver.getDriver().getFieldMessage(this.locale, field.name, rule.name, [name, params, data]);
  };

  /**
   * We need to convert any object param to an array format since the locales do not handle params as objects yet.
   */
  Validator.prototype._convertParamObjectToArray = function _convertParamObjectToArray (obj, ruleName) {
    if (Array.isArray(obj)) {
      return obj;
    }

    var paramNames = RuleContainer.getParamNames(ruleName);
    if (!paramNames || !isObject(obj)) {
      return obj;
    }

    return paramNames.reduce(function (prev, paramName) {
      if (paramName in obj) {
        prev.push(obj[paramName]);
      }

      return prev;
    }, []);
  };

  /**
   * Translates the parameters passed to the rule (mainly for target fields).
   */
  Validator.prototype._getLocalizedParams = function _getLocalizedParams (rule, targetName) {
      if ( targetName === void 0 ) targetName = null;

    var params = this._convertParamObjectToArray(rule.params, rule.name);
    if (rule.options.hasTarget && params && params[0]) {
      var localizedName = targetName || DictionaryResolver.getDriver().getAttribute(this.locale, params[0], params[0]);
      return [localizedName].concat(params.slice(1));
    }

    return params;
  };

  /**
   * Resolves an appropriate display name, first checking 'data-as' or the registered 'prettyName'
   */
  Validator.prototype._getFieldDisplayName = function _getFieldDisplayName (field) {
    return field.alias || DictionaryResolver.getDriver().getAttribute(this.locale, field.name, field.name);
  };

  /**
   * Converts an array of params to an object with named properties.
   * Only works if the rule is configured with a paramNames array.
   * Returns the same params if it cannot convert it.
   */
  Validator.prototype._convertParamArrayToObj = function _convertParamArrayToObj (params, ruleName) {
    var paramNames = RuleContainer.getParamNames(ruleName);
    if (!paramNames) {
      return params;
    }

    if (isObject(params)) {
      // check if the object is either a config object or a single parameter that is an object.
      var hasKeys = paramNames.some(function (name) { return Object.keys(params).indexOf(name) !== -1; });
      // if it has some of the keys, return it as is.
      if (hasKeys) {
        return params;
      }
      // otherwise wrap the object in an array.
      params = [params];
    }

    // Reduce the paramsNames to a param object.
    return params.reduce(function (prev, value, idx) {
      prev[paramNames[idx]] = value;

      return prev;
    }, {});
  };

  /**
   * Tests a single input value against a rule.
   */
  Validator.prototype._test = function _test (field, value, rule) {
      var this$1 = this;

    var validator = RuleContainer.getValidatorMethod(rule.name);
    var params = Array.isArray(rule.params) ? toArray(rule.params) : rule.params;
    if (!params) {
      params = [];
    }

    var targetName = null;
    if (!validator || typeof validator !== 'function') {
      return Promise.reject(createError(("No such validator '" + (rule.name) + "' exists.")));
    }

    // has field dependencies.
    if (rule.options.hasTarget && field.dependencies) {
      var target = find(field.dependencies, function (d) { return d.name === rule.name; });
      if (target) {
        targetName = target.field.alias;
        params = [target.field.value].concat(params.slice(1));
      }
    } else if (rule.name === 'required' && field.rejectsFalse) {
      // invalidate false if no args were specified and the field rejects false by default.
      params = params.length ? params : [true];
    }

    if (rule.options.isDate) {
      var dateFormat = this._getDateFormat(field.rules);
      if (rule.name !== 'date_format') {
        params.push(dateFormat);
      }
    }

    var result = validator(value, this._convertParamArrayToObj(params, rule.name));

    // If it is a promise.
    if (isCallable(result.then)) {
      return result.then(function (values) {
        var allValid = true;
        var data = {};
        if (Array.isArray(values)) {
          allValid = values.every(function (t) { return (isObject(t) ? t.valid : t); });
        } else { // Is a single object/boolean.
          allValid = isObject(values) ? values.valid : values;
          data = values.data;
        }

        return {
          valid: allValid,
          data: result.data,
          errors: allValid ? [] : [this$1._createFieldError(field, rule, data, targetName)]
        };
      });
    }

    if (!isObject(result)) {
      result = { valid: result, data: {} };
    }

    return {
      valid: result.valid,
      data: result.data,
      errors: result.valid ? [] : [this._createFieldError(field, rule, result.data, targetName)]
    };
  };

  /**
   * Merges a validator object into the RULES and Messages.
   */
  Validator._merge = function _merge (name, ref) {
      var validator = ref.validator;
      var options = ref.options;
      var paramNames = ref.paramNames;

    var validate = isCallable(validator) ? validator : validator.validate;
    if (validator.getMessage) {
      DictionaryResolver.getDriver().setMessage(Validator.locale, name, validator.getMessage);
    }

    RuleContainer.add(name, {
      validate: validate,
      options: options,
      paramNames: paramNames
    });
  };

  /**
   * Guards from extension violations.
   */
  Validator._guardExtend = function _guardExtend (name, validator) {
    if (isCallable(validator)) {
      return;
    }

    if (!isCallable(validator.validate)) {
      throw createError(
        ("Extension Error: The validator '" + name + "' must be a function or have a 'validate' method.")
      );
    }
  };

  /**
   * Creates a Field Error Object.
   */
  Validator.prototype._createFieldError = function _createFieldError (field, rule, data, targetName) {
      var this$1 = this;

    return {
      id: field.id,
      vmId: field.vmId,
      field: field.name,
      msg: this._formatErrorMessage(field, rule, data, targetName),
      rule: rule.name,
      scope: field.scope,
      regenerate: function () {
        return this$1._formatErrorMessage(field, rule, data, targetName);
      }
    };
  };

  /**
   * Tries different strategies to find a field.
   */
  Validator.prototype._resolveField = function _resolveField (name, scope, uid) {
    if (name[0] === '#') {
      return this.fields.findById(name.slice(1));
    }

    if (!isNullOrUndefined(scope)) {
      return this.fields.find({ name: name, scope: scope, vmId: uid });
    }

    if (includes(name, '.')) {
      var ref = name.split('.');
        var fieldScope = ref[0];
        var fieldName = ref.slice(1);
      var field = this.fields.find({ name: fieldName.join('.'), scope: fieldScope, vmId: uid });
      if (field) {
        return field;
      }
    }

    return this.fields.find({ name: name, scope: null, vmId: uid });
  };

  /**
   * Handles when a field is not found.
   */
  Validator.prototype._handleFieldNotFound = function _handleFieldNotFound (name, scope) {
    var fullName = isNullOrUndefined(scope) ? name : ("" + (!isNullOrUndefined(scope) ? scope + '.' : '') + name);

    return Promise.reject(createError(
      ("Validating a non-existent field: \"" + fullName + "\". Use \"attach()\" first.")
    ));
  };

  /**
   * Handles validation results.
   */
  Validator.prototype._handleValidationResults = function _handleValidationResults (results, vmId) {
      var this$1 = this;

    var matchers = results.map(function (result) { return ({ id: result.id }); });
    this.errors.removeById(matchers.map(function (m) { return m.id; }));
    // remove by name and scope to remove any custom errors added.
    results.forEach(function (result) {
      this$1.errors.remove(result.field, result.scope, vmId);
    });
    var allErrors = results.reduce(function (prev, curr) {
      prev.push.apply(prev, curr.errors);

      return prev;
    }, []);

    this.errors.add(allErrors);

    // handle flags.
    this.fields.filter(matchers).forEach(function (field) {
      var result = find(results, function (r) { return r.id === field.id; });
      field.setFlags({
        pending: false,
        valid: result.valid,
        validated: true
      });
    });
  };

  Validator.prototype._shouldSkip = function _shouldSkip (field, value) {
    // field is configured to run through the pipeline regardless
    if (field.bails === false) {
      return false;
    }

    // disabled fields are skipped if useConstraintAttrs is enabled in config
    if (field.isDisabled && getConfig().useConstraintAttrs) {
      return true;
    }

    // skip if the field is not required and has an empty value.
    return !field.isRequired && (isNullOrUndefined(value) || value === '' || isEmptyArray(value));
  };

  Validator.prototype._shouldBail = function _shouldBail (field) {
    // if the field was configured explicitly.
    if (field.bails !== undefined) {
      return field.bails;
    }

    return this.fastExit;
  };

  /**
   * Starts the validation process.
   */
  Validator.prototype._validate = function _validate (field, value, ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var initial = ref.initial;

    var requireRules = Object.keys(field.rules).filter(RuleContainer.isRequireRule);

    field.forceRequired = false;
    requireRules.forEach(function (rule) {
      var ruleOptions = RuleContainer.getOptions(rule);
      var result = this$1._test(field, value, { name: rule, params: field.rules[rule], options: ruleOptions });

      if (isCallable(result.then)) { throw createError('Require rules cannot be async'); }
      if (!isObject(result)) { throw createError('Require rules has to return an object (see docs)'); }

      if (result.data.required === true) {
        field.forceRequired = true;
      }
    });

    if (this._shouldSkip(field, value)) {
      return Promise.resolve({ valid: true, id: field.id, field: field.name, scope: field.scope, errors: [] });
    }

    var promises = [];
    var errors = [];
    var isExitEarly = false;
    if (isCallable(field.checkValueChanged)) {
      field.flags.changed = field.checkValueChanged();
    }

    // use of '.some()' is to break iteration in middle by returning true
    Object.keys(field.rules).filter(function (rule) {
      if (!initial || !RuleContainer.has(rule)) { return true; }

      return RuleContainer.isImmediate(rule);
    }).some(function (rule) {
      var ruleOptions = RuleContainer.getOptions(rule);
      var result = this$1._test(field, value, { name: rule, params: field.rules[rule], options: ruleOptions });
      if (isCallable(result.then)) {
        promises.push(result);
      } else if (!result.valid && this$1._shouldBail(field)) {
        errors.push.apply(errors, result.errors);
        isExitEarly = true;
      } else {
        // promisify the result.
        promises.push(new Promise(function (resolve) { return resolve(result); }));
      }

      return isExitEarly;
    });

    if (isExitEarly) {
      return Promise.resolve({ valid: false, errors: errors, id: field.id, field: field.name, scope: field.scope });
    }

    return Promise.all(promises).then(function (results) {
      return results.reduce(function (prev, v) {
          var ref;

        if (!v.valid) {
          (ref = prev.errors).push.apply(ref, v.errors);
        }

        prev.valid = prev.valid && v.valid;

        return prev;
      }, { valid: true, errors: errors, id: field.id, field: field.name, scope: field.scope });
    });
  };

  Object.defineProperties( Validator.prototype, prototypeAccessors$4 );
  Object.defineProperties( Validator, staticAccessors$1 );

  // 

  var normalizeValue = function (value) {
    if (isObject(value)) {
      return Object.keys(value).reduce(function (prev, key) {
        prev[key] = normalizeValue(value[key]);

        return prev;
      }, {});
    }

    if (isCallable(value)) {
      return value('{0}', ['{1}', '{2}', '{3}']);
    }

    return value;
  };

  var normalizeFormat = function (locale) {
    // normalize messages
    var dictionary = {};
    if (locale.messages) {
      dictionary.messages = normalizeValue(locale.messages);
    }

    if (locale.custom) {
      dictionary.custom = normalizeValue(locale.custom);
    }

    if (locale.attributes) {
      dictionary.attributes = locale.attributes;
    }

    if (!isNullOrUndefined(locale.dateFormat)) {
      dictionary.dateFormat = locale.dateFormat;
    }

    return dictionary;
  };

  var I18nDictionary = function I18nDictionary (i18n, rootKey) {
    this.i18n = i18n;
    this.rootKey = rootKey;
  };

  var prototypeAccessors$5 = { locale: { configurable: true } };

  prototypeAccessors$5.locale.get = function () {
    return this.i18n.locale;
  };

  prototypeAccessors$5.locale.set = function (value) {
    warn('Cannot set locale from the validator when using vue-i18n, use i18n.locale setter instead');
  };

  I18nDictionary.prototype.getDateFormat = function getDateFormat (locale) {
    return this.i18n.getDateTimeFormat(locale || this.locale);
  };

  I18nDictionary.prototype.setDateFormat = function setDateFormat (locale, value) {
    this.i18n.setDateTimeFormat(locale || this.locale, value);
  };

  I18nDictionary.prototype.getMessage = function getMessage (_, key, data) {
    var path = (this.rootKey) + ".messages." + key;
    var dataOptions = data;

    if (Array.isArray(data)) {
      dataOptions = [].concat.apply([], data);
    }

    if (this.i18n.te(path)) {
      return this.i18n.t(path, dataOptions);
    }

    // fallback to the fallback message
    if (this.i18n.te(path, this.i18n.fallbackLocale)) {
      return this.i18n.t(path, this.i18n.fallbackLocale, dataOptions);
    }

    // fallback to the root message
    return this.i18n.t(((this.rootKey) + ".messages._default"), dataOptions);
  };

  I18nDictionary.prototype.getAttribute = function getAttribute (_, key, fallback) {
      if ( fallback === void 0 ) fallback = '';

    var path = (this.rootKey) + ".attributes." + key;
    if (this.i18n.te(path)) {
      return this.i18n.t(path);
    }

    return fallback;
  };

  I18nDictionary.prototype.getFieldMessage = function getFieldMessage (_, field, key, data) {
    var path = (this.rootKey) + ".custom." + field + "." + key;
    if (this.i18n.te(path)) {
      return this.i18n.t(path, data);
    }

    return this.getMessage(_, key, data);
  };

  I18nDictionary.prototype.merge = function merge$1 (dictionary) {
      var this$1 = this;

    Object.keys(dictionary).forEach(function (localeKey) {
        var obj;

      // i18n doesn't deep merge
      // first clone the existing locale (avoid mutations to locale)
      var clone = merge({}, getPath((localeKey + "." + (this$1.rootKey)), this$1.i18n.messages, {}));
      // Merge cloned locale with new one
      var locale = merge(clone, normalizeFormat(dictionary[localeKey]));
      this$1.i18n.mergeLocaleMessage(localeKey, ( obj = {}, obj[this$1.rootKey] = locale, obj ));
      if (locale.dateFormat) {
        this$1.i18n.setDateTimeFormat(localeKey, locale.dateFormat);
      }
    });
  };

  I18nDictionary.prototype.setMessage = function setMessage (locale, key, value) {
      var obj, obj$1;

    this.merge(( obj$1 = {}, obj$1[locale] = {
        messages: ( obj = {}, obj[key] = value, obj )
      }, obj$1 ));
  };

  I18nDictionary.prototype.setAttribute = function setAttribute (locale, key, value) {
      var obj, obj$1;

    this.merge(( obj$1 = {}, obj$1[locale] = {
        attributes: ( obj = {}, obj[key] = value, obj )
      }, obj$1 ));
  };

  Object.defineProperties( I18nDictionary.prototype, prototypeAccessors$5 );

  var aggressive = function () { return ({
    on: ['input']
  }); };

  var lazy = function () { return ({
    on: ['change']
  }); };

  var eager = function (ref) {
    var errors = ref.errors;

    if (errors.length) {
      return {
        on: ['input']
      };
    }

    return {
      on: ['change', 'blur']
    };
  };

  var passive = function () { return ({
    on: []
  }); };

  var modes = {
    aggressive: aggressive,
    eager: eager,
    passive: passive,
    lazy: lazy
  };

  // 

  var Vue;
  var pendingPlugins;
  var pluginInstance;

  var VeeValidate$1 = function VeeValidate (config, _Vue) {
    this.configure(config);
    pluginInstance = this;
    if (_Vue) {
      Vue = _Vue;
    }
    this._validator = setValidator(
      new Validator(null, { fastExit: config && config.fastExit }, this)
    );
    this._initVM(this.config);
    this._initI18n(this.config);
  };

  var prototypeAccessors$6 = { i18nDriver: { configurable: true },config: { configurable: true } };
  var staticAccessors$2 = { i18nDriver: { configurable: true },config: { configurable: true } };

  VeeValidate$1.setI18nDriver = function setI18nDriver (driver, instance) {
    DictionaryResolver.setDriver(driver, instance);
  };

  VeeValidate$1.configure = function configure (cfg) {
    setConfig(cfg);
  };

  VeeValidate$1.setMode = function setMode (mode, implementation) {
    setConfig({ mode: mode });
    if (!implementation) {
      return;
    }

    if (!isCallable(implementation)) {
      throw new Error('A mode implementation must be a function');
    }

    modes[mode] = implementation;
  };

  VeeValidate$1.use = function use (plugin, options) {
      if ( options === void 0 ) options = {};

    if (!isCallable(plugin)) {
      return warn('The plugin must be a callable function');
    }

    // Don't install plugins until vee-validate is installed.
    if (!pluginInstance) {
      if (!pendingPlugins) {
        pendingPlugins = [];
      }
      pendingPlugins.push({ plugin: plugin, options: options });
      return;
    }

    plugin({ Validator: Validator, ErrorBag: ErrorBag, Rules: Validator.rules }, options);
  };
  VeeValidate$1.install = function install (_Vue, opts) {
    if (Vue && _Vue === Vue) {
      {
        warn('already installed, Vue.use(VeeValidate) should only be called once.');
      }
      return;
    }

    Vue = _Vue;
    pluginInstance = new VeeValidate$1(opts);
    // inject the plugin container statically into the validator class
    Validator.$vee = pluginInstance;

    detectPassiveSupport();

    Vue.mixin(mixin);
    Vue.directive('validate', directive);
    if (pendingPlugins) {
      pendingPlugins.forEach(function (ref) {
          var plugin = ref.plugin;
          var options = ref.options;

        VeeValidate$1.use(plugin, options);
      });
      pendingPlugins = null;
    }
  };

  prototypeAccessors$6.i18nDriver.get = function () {
    return DictionaryResolver.getDriver();
  };

  staticAccessors$2.i18nDriver.get = function () {
    return DictionaryResolver.getDriver();
  };

  prototypeAccessors$6.config.get = function () {
    return getConfig();
  };

  staticAccessors$2.config.get = function () {
    return getConfig();
  };

  VeeValidate$1.prototype._initVM = function _initVM (config) {
      var this$1 = this;

    this._vm = new Vue({
      data: function () { return ({
        errors: this$1._validator.errors,
        fields: this$1._validator.fields
      }); }
    });
  };

  VeeValidate$1.prototype._initI18n = function _initI18n (config) {
      var this$1 = this;

    var dictionary = config.dictionary;
      var i18n = config.i18n;
      var i18nRootKey = config.i18nRootKey;
      var locale = config.locale;
    var onLocaleChanged = function () {
      if (dictionary) {
        this$1.i18nDriver.merge(dictionary);
      }

      this$1._validator.errors.regenerate();
    };

    // i18 is being used for localization.
    if (i18n) {
      VeeValidate$1.setI18nDriver('i18n', new I18nDictionary(i18n, i18nRootKey));
      i18n._vm.$watch('locale', onLocaleChanged);
    } else if (typeof window !== 'undefined') {
      this._vm.$on('localeChanged', onLocaleChanged);
    }

    if (dictionary) {
      this.i18nDriver.merge(dictionary);
    }

    if (locale && !i18n) {
      this._validator.localize(locale);
    }
  };

  VeeValidate$1.prototype.configure = function configure (cfg) {
    setConfig(cfg);
  };

  Object.defineProperties( VeeValidate$1.prototype, prototypeAccessors$6 );
  Object.defineProperties( VeeValidate$1, staticAccessors$2 );

  VeeValidate$1.mixin = mixin;
  VeeValidate$1.directive = directive;
  VeeValidate$1.Validator = Validator;
  VeeValidate$1.ErrorBag = ErrorBag;

  // 

  var normalize = function (fields) {
    if (Array.isArray(fields)) {
      return fields.reduce(function (prev, curr) {
        if (includes(curr, '.')) {
          prev[curr.split('.')[1]] = curr;
        } else {
          prev[curr] = curr;
        }

        return prev;
      }, {});
    }

    return fields;
  };

  // Combines two flags using either AND or OR depending on the flag type.
  var combine = function (lhs, rhs) {
    var mapper = {
      pristine: function (lhs, rhs) { return lhs && rhs; },
      dirty: function (lhs, rhs) { return lhs || rhs; },
      touched: function (lhs, rhs) { return lhs || rhs; },
      untouched: function (lhs, rhs) { return lhs && rhs; },
      valid: function (lhs, rhs) { return lhs && rhs; },
      invalid: function (lhs, rhs) { return lhs || rhs; },
      pending: function (lhs, rhs) { return lhs || rhs; },
      required: function (lhs, rhs) { return lhs || rhs; },
      validated: function (lhs, rhs) { return lhs && rhs; }
    };

    return Object.keys(mapper).reduce(function (flags, flag) {
      flags[flag] = mapper[flag](lhs[flag], rhs[flag]);

      return flags;
    }, {});
  };

  var mapScope = function (scope, deep) {
    if ( deep === void 0 ) deep = true;

    return Object.keys(scope).reduce(function (flags, field) {
      if (!flags) {
        flags = assign({}, scope[field]);
        return flags;
      }

      // scope.
      var isScope = field.indexOf('$') === 0;
      if (deep && isScope) {
        return combine(mapScope(scope[field]), flags);
      } else if (!deep && isScope) {
        return flags;
      }

      flags = combine(flags, scope[field]);

      return flags;
    }, null);
  };

  /**
   * Maps fields to computed functions.
   */
  var mapFields = function (fields) {
    if (!fields) {
      return function () {
        return mapScope(this.$validator.flags);
      };
    }

    var normalized = normalize(fields);
    return Object.keys(normalized).reduce(function (prev, curr) {
      var field = normalized[curr];
      prev[curr] = function mappedField () {
        // if field exists
        if (this.$validator.flags[field]) {
          return this.$validator.flags[field];
        }

        // scopeless fields were selected.
        if (normalized[curr] === '*') {
          return mapScope(this.$validator.flags, false);
        }

        // if it has a scope defined
        var index = field.indexOf('.');
        if (index <= 0) {
          return {};
        }

        var ref = field.split('.');
        var scope = ref[0];
        var name = ref.slice(1);

        scope = this.$validator.flags[("$" + scope)];
        name = name.join('.');

        // an entire scope was selected: scope.*
        if (name === '*' && scope) {
          return mapScope(scope);
        }

        if (scope && scope[name]) {
          return scope[name];
        }

        return {};
      };

      return prev;
    }, {});
  };

  var $validator = null;

  var PROVIDER_COUNTER = 0;

  function createValidationCtx (ctx) {
    return {
      errors: ctx.messages,
      flags: ctx.flags,
      classes: ctx.classes,
      valid: ctx.isValid,
      failedRules: ctx.failedRules,
      reset: function () { return ctx.reset(); },
      validate: function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ctx.validate.apply(ctx, args);
    },
      aria: {
        'aria-invalid': ctx.flags.invalid ? 'true' : 'false',
        'aria-required': ctx.isRequired ? 'true' : 'false'
      }
    };
  }

  function normalizeValue$1 (value) {
    if (isEvent(value)) {
      return value.target.type === 'file' ? toArray(value.target.files) : value.target.value;
    }

    return value;
  }

  /**
   * Determines if a provider needs to run validation.
   */
  function shouldValidate (ctx, model) {
    // when an immediate/initial validation is needed and wasn't done before.
    if (!ctx._ignoreImmediate && ctx.immediate) {
      return true;
    }

    // when the value changes for whatever reason.
    if (ctx.value !== model.value) {
      return true;
    }

    // when it needs validation due to props/cross-fields changes.
    if (ctx._needsValidation) {
      return true;
    }

    // when the initial value is undefined and the field wasn't rendered yet.
    if (!ctx.initialized && model.value === undefined) {
      return true;
    }

    return false;
  }

  function computeModeSetting (ctx) {
    var compute = isCallable(ctx.mode) ? ctx.mode : modes[ctx.mode];

    return compute({
      errors: ctx.messages,
      value: ctx.value,
      flags: ctx.flags
    });
  }

  function onRenderUpdate (model) {
    if (!this.initialized) {
      this.initialValue = model.value;
    }

    var validateNow = shouldValidate(this, model);
    this._needsValidation = false;
    this.value = model.value;
    this._ignoreImmediate = true;

    if (!validateNow) {
      return;
    }

    this.validateSilent().then(this.immediate || this.flags.validated ? this.applyResult : function (x) { return x; });
  }

  // Creates the common handlers for a validatable context.
  function createCommonHandlers (ctx) {
    var onInput = function (e) {
      ctx.syncValue(e); // track and keep the value updated.
      ctx.setFlags({ dirty: true, pristine: false });
    };

    // Blur event listener.
    var onBlur = function () {
      ctx.setFlags({ touched: true, untouched: false });
    };

    var onValidate = ctx.$veeHandler;
    var mode = computeModeSetting(ctx);

    // Handle debounce changes.
    if (!onValidate || ctx.$veeDebounce !== ctx.debounce) {
      onValidate = debounce(
        function () {
          ctx.$nextTick(function () {
            var pendingPromise = ctx.validateSilent();
            // avoids race conditions between successive validations.
            ctx._pendingValidation = pendingPromise;
            pendingPromise.then(function (result) {
              if (pendingPromise === ctx._pendingValidation) {
                ctx.applyResult(result);
                ctx._pendingValidation = null;
              }
            });
          });
        },
        mode.debounce || ctx.debounce
      );

      // Cache the handler so we don't create it each time.
      ctx.$veeHandler = onValidate;
      // cache the debounce value so we detect if it was changed.
      ctx.$veeDebounce = ctx.debounce;
    }

    return { onInput: onInput, onBlur: onBlur, onValidate: onValidate };
  }

  // Adds all plugin listeners to the vnode.
  function addListeners (node) {
    var model = findModel(node);
    // cache the input eventName.
    this._inputEventName = this._inputEventName || getInputEventName(node, model);

    onRenderUpdate.call(this, model);

    var ref = createCommonHandlers(this);
    var onInput = ref.onInput;
    var onBlur = ref.onBlur;
    var onValidate = ref.onValidate;
    addVNodeListener(node, this._inputEventName, onInput);
    addVNodeListener(node, 'blur', onBlur);

    // add the validation listeners.
    this.normalizedEvents.forEach(function (evt) {
      addVNodeListener(node, evt, onValidate);
    });

    this.initialized = true;
  }

  function createValuesLookup (ctx) {
    var providers = ctx.$_veeObserver.refs;

    return ctx.fieldDeps.reduce(function (acc, depName) {
      if (!providers[depName]) {
        return acc;
      }

      acc[depName] = providers[depName].value;

      return acc;
    }, {});
  }

  function updateRenderingContextRefs (ctx) {
    // IDs should not be nullable.
    if (isNullOrUndefined(ctx.id) && ctx.id === ctx.vid) {
      ctx.id = PROVIDER_COUNTER;
      PROVIDER_COUNTER++;
    }

    var id = ctx.id;
    var vid = ctx.vid;
    // Nothing has changed.
    if (ctx.isDeactivated || (id === vid && ctx.$_veeObserver.refs[id])) {
      return;
    }

    // vid was changed.
    if (id !== vid && ctx.$_veeObserver.refs[id] === ctx) {
      ctx.$_veeObserver.unsubscribe(ctx);
    }

    ctx.$_veeObserver.subscribe(ctx);
    ctx.id = vid;
  }

  function createObserver () {
    return {
      refs: {},
      subscribe: function subscribe (ctx) {
        this.refs[ctx.vid] = ctx;
      },
      unsubscribe: function unsubscribe (ctx) {
        delete this.refs[ctx.vid];
      }
    };
  }

  var ValidationProvider = {
    $__veeInject: false,
    inject: {
      $_veeObserver: {
        from: '$_veeObserver',
        default: function default$1 () {
          if (!this.$vnode.context.$_veeObserver) {
            this.$vnode.context.$_veeObserver = createObserver();
          }

          return this.$vnode.context.$_veeObserver;
        }
      }
    },
    props: {
      vid: {
        type: [String, Number],
        default: function () {
          PROVIDER_COUNTER++;

          return ("_vee_" + PROVIDER_COUNTER);
        }
      },
      name: {
        type: String,
        default: null
      },
      mode: {
        type: [String, Function],
        default: function () {
          return getConfig().mode;
        }
      },
      events: {
        type: Array,
        validate: function () {
          /* istanbul ignore next */
          {
            warn('events prop and config will be deprecated in future version please use the interaction modes instead');
          }

          return true;
        },
        default: function () {
          var events = getConfig().events;
          if (typeof events === 'string') {
            return events.split('|');
          }

          return events;
        }
      },
      rules: {
        type: [Object, String],
        default: null
      },
      immediate: {
        type: Boolean,
        default: false
      },
      persist: {
        type: Boolean,
        default: false
      },
      bails: {
        type: Boolean,
        default: function () { return getConfig().fastExit; }
      },
      debounce: {
        type: Number,
        default: function () { return getConfig().delay || 0; }
      },
      tag: {
        type: String,
        default: 'span'
      }
    },
    watch: {
      rules: {
        deep: true,
        handler: function handler (val, oldVal) {
          this._needsValidation = !isEqual$1(val, oldVal);
        }
      }
    },
    data: function () { return ({
      messages: [],
      value: undefined,
      initialized: false,
      initialValue: undefined,
      flags: createFlags(),
      failedRules: {},
      forceRequired: false,
      isDeactivated: false,
      id: null
    }); },
    computed: {
      isValid: function isValid () {
        return this.flags.valid;
      },
      fieldDeps: function fieldDeps () {
        var this$1 = this;

        var rules = normalizeRules(this.rules);
        var providers = this.$_veeObserver.refs;

        return Object.keys(rules).filter(RuleContainer.isTargetRule).map(function (rule) {
          var depName = rules[rule][0];
          var watcherName = "$__" + depName;
          if (!isCallable(this$1[watcherName]) && providers[depName]) {
            this$1[watcherName] = providers[depName].$watch('value', function () {
              if (this$1.flags.validated) {
                this$1._needsValidation = true;
                this$1.validate();
              }
            });
          }

          return depName;
        });
      },
      normalizedEvents: function normalizedEvents () {
        var this$1 = this;

        var ref = computeModeSetting(this);
        var on = ref.on;

        return normalizeEvents(on || this.events || []).map(function (e) {
          if (e === 'input') {
            return this$1._inputEventName;
          }

          return e;
        });
      },
      isRequired: function isRequired () {
        var rules = normalizeRules(this.rules);
        var forceRequired = this.forceRequired;

        var isRequired = rules.required || forceRequired;
        this.flags.required = isRequired;

        return isRequired;
      },
      classes: function classes () {
        var this$1 = this;

        var names = getConfig().classNames;
        return Object.keys(this.flags).reduce(function (classes, flag) {
          var className = (names && names[flag]) || flag;
          if (isNullOrUndefined(this$1.flags[flag])) {
            return classes;
          }

          if (className) {
            classes[className] = this$1.flags[flag];
          }

          return classes;
        }, {});
      }
    },
    render: function render (h) {
      var this$1 = this;

      this.registerField();
      var ctx = createValidationCtx(this);

      // Gracefully handle non-existent scoped slots.
      var slot = this.$scopedSlots.default;
      /* istanbul ignore next */
      if (!isCallable(slot)) {
        {
          warn('ValidationProvider expects a scoped slot. Did you forget to add "slot-scope" to your slot?');
        }

        return h(this.tag, this.$slots.default);
      }

      var nodes = slot(ctx);
      // Handle single-root slot.
      extractVNodes(nodes).forEach(function (input) {
        addListeners.call(this$1, input);
      });

      return h(this.tag, nodes);
    },
    beforeDestroy: function beforeDestroy () {
      // cleanup reference.
      this.$_veeObserver.unsubscribe(this);
    },
    activated: function activated () {
      this.$_veeObserver.subscribe(this);
      this.isDeactivated = false;
    },
    deactivated: function deactivated () {
      this.$_veeObserver.unsubscribe(this);
      this.isDeactivated = true;
    },
    methods: {
      setFlags: function setFlags (flags) {
        var this$1 = this;

        Object.keys(flags).forEach(function (flag) {
          this$1.flags[flag] = flags[flag];
        });
      },
      syncValue: function syncValue (e) {
        var value = normalizeValue$1(e);
        this.value = value;
        this.flags.changed = this.initialValue !== value;
      },
      reset: function reset () {
        this.messages = [];
        this._pendingValidation = null;
        this.initialValue = this.value;
        var flags = createFlags();
        this.setFlags(flags);
      },
      validate: function validate () {
        var this$1 = this;
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        if (args.length > 0) {
          this.syncValue(args[0]);
        }

        return this.validateSilent().then(function (result) {
          this$1.applyResult(result);

          return result;
        });
      },
      validateSilent: function validateSilent () {
        var this$1 = this;

        this.setFlags({ pending: true });

        return $validator.verify(this.value, this.rules, {
          name: this.name,
          values: createValuesLookup(this),
          bails: this.bails
        }).then(function (result) {
          this$1.setFlags({ pending: false });
          if (!this$1.isRequired) {
            this$1.setFlags({ valid: result.valid, invalid: !result.valid });
          }

          return result;
        });
      },
      applyResult: function applyResult (ref) {
        var errors = ref.errors;
        var failedRules = ref.failedRules;

        this.messages = errors;
        this.failedRules = assign({}, failedRules);
        this.setFlags({
          valid: !errors.length,
          changed: this.value !== this.initialValue,
          invalid: !!errors.length,
          validated: true
        });
      },
      registerField: function registerField () {
        if (!$validator) {
          $validator = getValidator() || new Validator(null, { fastExit: getConfig().fastExit });
        }

        updateRenderingContextRefs(this);
      }
    }
  };

  var flagMergingStrategy = {
    pristine: 'every',
    dirty: 'some',
    touched: 'some',
    untouched: 'every',
    valid: 'every',
    invalid: 'some',
    pending: 'some',
    validated: 'every'
  };

  function mergeFlags (lhs, rhs, strategy) {
    var stratName = flagMergingStrategy[strategy];

    return [lhs, rhs][stratName](function (f) { return f; });
  }

  var OBSERVER_COUNTER = 0;

  var ValidationObserver = {
    name: 'ValidationObserver',
    provide: function provide () {
      return {
        $_veeObserver: this
      };
    },
    inject: {
      $_veeObserver: {
        from: '$_veeObserver',
        default: function default$1 () {
          if (!this.$vnode.context.$_veeObserver) {
            return null;
          }

          return this.$vnode.context.$_veeObserver;
        }
      }
    },
    props: {
      tag: {
        type: String,
        default: 'span'
      }
    },
    data: function () { return ({
      vid: ("obs_" + (OBSERVER_COUNTER++)),
      refs: {},
      observers: [],
    }); },
    computed: {
      ctx: function ctx () {
        var this$1 = this;

        var ctx = {
          errors: {},
          validate: function (arg) {
            var promise = this$1.validate(arg);

            return {
              then: function then (thenable) {
                promise.then(function (success) {
                  if (success && isCallable(thenable)) {
                    return Promise.resolve(thenable());
                  }

                  return Promise.resolve(success);
                });
              }
            };
          },
          reset: function () { return this$1.reset(); }
        };

        return values(this.refs).concat( this.observers ).reduce(function (acc, provider) {
          Object.keys(flagMergingStrategy).forEach(function (flag) {
            var flags = provider.flags || provider.ctx;
            if (!(flag in acc)) {
              acc[flag] = flags[flag];
              return;
            }

            acc[flag] = mergeFlags(acc[flag], flags[flag], flag);
          });

          acc.errors[provider.vid] = provider.messages || values(provider.ctx.errors).reduce(function (errs, obsErrors) {
            return errs.concat(obsErrors);
          }, []);

          return acc;
        }, ctx);
      }
    },
    created: function created () {
      if (this.$_veeObserver) {
        this.$_veeObserver.subscribe(this, 'observer');
      }
    },
    activated: function activated () {
      if (this.$_veeObserver) {
        this.$_veeObserver.subscribe(this, 'observer');
      }
    },
    deactivated: function deactivated () {
      if (this.$_veeObserver) {
        this.$_veeObserver.unsubscribe(this, 'observer');
      }
    },
    beforeDestroy: function beforeDestroy () {
      if (this.$_veeObserver) {
        this.$_veeObserver.unsubscribe(this, 'observer');
      }
    },
    render: function render (h) {
      var slots = this.$scopedSlots.default;
      this._persistedStore = this._persistedStore || {};
      if (!isCallable(slots)) {
        return h(this.tag, this.$slots.default);
      }

      return h(this.tag, {
        on: this.$listeners,
        attrs: this.$attrs
      }, slots(this.ctx));
    },
    methods: {
      subscribe: function subscribe (subscriber, kind) {
        var obj;

        if ( kind === void 0 ) kind = 'provider';
        if (kind === 'observer') {
          this.observers.push(subscriber);
          return;
        }

        this.refs = Object.assign({}, this.refs, ( obj = {}, obj[subscriber.vid] = subscriber, obj ));
        if (subscriber.persist && this._persistedStore[subscriber.vid]) {
          this.restoreProviderState(subscriber);
        }
      },
      unsubscribe: function unsubscribe (ref, kind) {
        var vid = ref.vid;
        if ( kind === void 0 ) kind = 'provider';

        if (kind === 'provider') {
          this.removeProvider(vid);
        }

        var idx = findIndex(this.observers, function (o) { return o.vid === vid; });
        if (idx !== -1) {
          this.observers.splice(idx, 1);
        }
      },
      validate: function validate (ref) {
        if ( ref === void 0 ) ref = { silent: false };
        var silent = ref.silent;

        return Promise.all(values(this.refs).map(function (ref) { return ref[silent ? 'validateSilent' : 'validate']().then(function (r) { return r.valid; }); }).concat( this.observers.map(function (obs) { return obs.validate({ silent: silent }); })
        )).then(function (results) { return results.every(function (r) { return r; }); });
      },
      reset: function reset () {
        return values(this.refs).concat( this.observers).forEach(function (ref) { return ref.reset(); });
      },
      restoreProviderState: function restoreProviderState (provider) {
        var state = this._persistedStore[provider.vid];
        provider.setFlags(state.flags);
        provider.applyResult(state);
        delete this._persistedStore[provider.vid];
      },
      removeProvider: function removeProvider (vid) {
        var provider = this.refs[vid];
        // save it for the next time.
        if (provider && provider.persist) {
          /* istanbul ignore else */
          {
            if (vid.indexOf('_vee_') === 0) {
              warn('Please provide a `vid` prop when using `persist`, there might be unexpected issues otherwise.');
            }
          }

          this._persistedStore[vid] = {
            flags: provider.flags,
            errors: provider.messages,
            failedRules: provider.failedRules
          };
        }

        this.$delete(this.refs, vid);
      },
    }
  };

  function withValidation (component, ctxToProps) {
    if ( ctxToProps === void 0 ) ctxToProps = null;

    var options = isCallable(component) ? component.options : component;
    options.$__veeInject = false;
    var hoc = {
      name: ((options.name || 'AnonymousHoc') + "WithValidation"),
      props: assign({}, ValidationProvider.props),
      data: ValidationProvider.data,
      computed: assign({}, ValidationProvider.computed),
      methods: assign({}, ValidationProvider.methods),
      $__veeInject: false,
      beforeDestroy: ValidationProvider.beforeDestroy,
      inject: ValidationProvider.inject
    };

    // Default ctx converts ctx props to component props.
    if (!ctxToProps) {
      ctxToProps = function (ctx) { return ctx; };
    }

    var eventName = (options.model && options.model.event) || 'input';

    hoc.render = function (h) {
      var obj;

      this.registerField();
      var vctx = createValidationCtx(this);
      var listeners = assign({}, this.$listeners);

      var model = findModel(this.$vnode);
      this._inputEventName = this._inputEventName || getInputEventName(this.$vnode, model);
      onRenderUpdate.call(this, model);

      var ref = createCommonHandlers(this);
      var onInput = ref.onInput;
      var onBlur = ref.onBlur;
      var onValidate = ref.onValidate;

      mergeVNodeListeners(listeners, eventName, onInput);
      mergeVNodeListeners(listeners, 'blur', onBlur);
      this.normalizedEvents.forEach(function (evt, idx) {
        mergeVNodeListeners(listeners, evt, onValidate);
      });

      // Props are any attrs not associated with ValidationProvider Plus the model prop.
      // WARNING: Accidental prop overwrite will probably happen.
      var ref$1 = findModelConfig(this.$vnode) || { prop: 'value' };
      var prop = ref$1.prop;
      var props = assign({}, this.$attrs, ( obj = {}, obj[prop] = model.value, obj ), ctxToProps(vctx));

      return h(options, {
        attrs: this.$attrs,
        props: props,
        on: listeners
      }, normalizeSlots(this.$slots, this.$vnode.context));
    };

    return hoc;
  }

  /**
   * Formates file size.
   *
   * @param {Number|String} size
   */
  var formatFileSize = function (size) {
    var units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var threshold = 1024;
    size = Number(size) * threshold;
    var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
    return (((size / Math.pow(threshold, i)).toFixed(2) * 1) + " " + (units[i]));
  };

  /**
   * Checks if vee-validate is defined globally.
   */
  var isDefinedGlobally = function () {
    return typeof VeeValidate !== 'undefined';
  };

  var obj;

  var messages = {
    _default: function (field) { return ("The " + field + " value is not valid."); },
    after: function (field, ref) {
      var target = ref[0];
      var inclusion = ref[1];

      return ("The " + field + " must be after " + (inclusion ? 'or equal to ' : '') + target + ".");
  },
    alpha: function (field) { return ("The " + field + " field may only contain alphabetic characters."); },
    alpha_dash: function (field) { return ("The " + field + " field may contain alpha-numeric characters as well as dashes and underscores."); },
    alpha_num: function (field) { return ("The " + field + " field may only contain alpha-numeric characters."); },
    alpha_spaces: function (field) { return ("The " + field + " field may only contain alphabetic characters as well as spaces."); },
    before: function (field, ref) {
      var target = ref[0];
      var inclusion = ref[1];

      return ("The " + field + " must be before " + (inclusion ? 'or equal to ' : '') + target + ".");
  },
    between: function (field, ref) {
      var min = ref[0];
      var max = ref[1];

      return ("The " + field + " field must be between " + min + " and " + max + ".");
  },
    confirmed: function (field) { return ("The " + field + " confirmation does not match."); },
    credit_card: function (field) { return ("The " + field + " field is invalid."); },
    date_between: function (field, ref) {
      var min = ref[0];
      var max = ref[1];

      return ("The " + field + " must be between " + min + " and " + max + ".");
  },
    date_format: function (field, ref) {
      var format = ref[0];

      return ("The " + field + " must be in the format " + format + ".");
  },
    decimal: function (field, ref) {
      if ( ref === void 0 ) ref = [];
      var decimals = ref[0]; if ( decimals === void 0 ) decimals = '*';

      return ("The " + field + " field must be numeric and may contain " + (!decimals || decimals === '*' ? '' : decimals) + " decimal points.");
  },
    digits: function (field, ref) {
      var length = ref[0];

      return ("The " + field + " field must be numeric and exactly contain " + length + " digits.");
  },
    dimensions: function (field, ref) {
      var width = ref[0];
      var height = ref[1];

      return ("The " + field + " field must be " + width + " pixels by " + height + " pixels.");
  },
    email: function (field) { return ("The " + field + " field must be a valid email."); },
    excluded: function (field) { return ("The " + field + " field must be a valid value."); },
    ext: function (field) { return ("The " + field + " field must be a valid file."); },
    image: function (field) { return ("The " + field + " field must be an image."); },
    included: function (field) { return ("The " + field + " field must be a valid value."); },
    integer: function (field) { return ("The " + field + " field must be an integer."); },
    ip: function (field) { return ("The " + field + " field must be a valid ip address."); },
    ip_or_fqdn: function (field) { return ("The " + field + " field must be a valid ip address or FQDN."); },
    length: function (field, ref) {
      var length = ref[0];
      var max = ref[1];

      if (max) {
        return ("The " + field + " length must be between " + length + " and " + max + ".");
      }

      return ("The " + field + " length must be " + length + ".");
    },
    max: function (field, ref) {
      var length = ref[0];

      return ("The " + field + " field may not be greater than " + length + " characters.");
  },
    max_value: function (field, ref) {
      var max = ref[0];

      return ("The " + field + " field must be " + max + " or less.");
  },
    mimes: function (field) { return ("The " + field + " field must have a valid file type."); },
    min: function (field, ref) {
      var length = ref[0];

      return ("The " + field + " field must be at least " + length + " characters.");
  },
    min_value: function (field, ref) {
      var min = ref[0];

      return ("The " + field + " field must be " + min + " or more.");
  },
    numeric: function (field) { return ("The " + field + " field may only contain numeric characters."); },
    regex: function (field) { return ("The " + field + " field format is invalid."); },
    required: function (field) { return ("The " + field + " field is required."); },
    required_if: function (field, ref) {
      var target = ref[0];

      return ("The " + field + " field is required when the " + target + " field has this value.");
  },
    size: function (field, ref) {
      var size = ref[0];

      return ("The " + field + " size must be less than " + (formatFileSize(size)) + ".");
  },
    url: function (field) { return ("The " + field + " field is not a valid URL."); }
  };

  var locale$1 = {
    name: 'en',
    messages: messages,
    attributes: {}
  };

  if (isDefinedGlobally()) {
    // eslint-disable-next-line
    VeeValidate.Validator.localize(( obj = {}, obj[locale$1.name] = locale$1, obj ));
  }

  // rules plugin definition.

  Object.keys(Rules).forEach(function (rule) {
    VeeValidate$1.Validator.extend(rule, Rules[rule].validate, assign({}, Rules[rule].options, { paramNames: Rules[rule].paramNames }));
  });

  // Merge the english messages.
  VeeValidate$1.Validator.localize({
    en: locale$1
  });

  VeeValidate$1.version = '2.2.7';
  VeeValidate$1.Rules = Rules;
  VeeValidate$1.mapFields = mapFields;
  VeeValidate$1.ValidationProvider = ValidationProvider;
  VeeValidate$1.ValidationObserver = ValidationObserver;
  VeeValidate$1.withValidation = withValidation;

  return VeeValidate$1;

}));
