/**
  * vee-validate v2.1.0-beta.6
  * (c) 2018 Abdelrahman Awad
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VeeValidate = factory());
}(this, (function () { 'use strict';

  var MILLISECONDS_IN_HOUR = 3600000;
  var MILLISECONDS_IN_MINUTE = 60000;
  var DEFAULT_ADDITIONAL_DIGITS = 2;

  var patterns = {
    dateTimeDelimeter: /[T ]/,
    plainTime: /:/,

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
   *
   * If the argument is null, it is treated as an invalid date.
   *
   * If all above fails, the function passes the given argument to Date constructor.
   *
   * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
   * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
   *
   * @param {*} argument - the value to convert
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

    var additionalDigits = options.additionalDigits === undefined ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError('additionalDigits must be 0, 1 or 2')
    }

    // Clone the date
    if (argument instanceof Date) {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime())
    } else if (typeof argument !== 'string') {
      return new Date(argument)
    }

    var dateStrings = splitDateString(argument);

    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    var year = parseYearResult.year;
    var restDateString = parseYearResult.restDateString;

    var date = parseDate(restDateString, year);

    if (date) {
      var timestamp = date.getTime();
      var time = 0;
      var offset;

      if (dateStrings.time) {
        time = parseTime(dateStrings.time);
      }

      if (dateStrings.timezone) {
        offset = parseTimezone(dateStrings.timezone);
      } else {
        // get offset accurate to hour in timezones that change offset
        offset = new Date(timestamp + time).getTimezoneOffset();
        offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
      }

      return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
    } else {
      return new Date(argument)
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
      date.setUTCFullYear(year, month);
      return date
    }

    // YYYY-DDD or YYYYDDD
    token = patterns.DDD.exec(dateString);
    if (token) {
      date = new Date(0);
      var dayOfYear = parseInt(token[1], 10);
      date.setUTCFullYear(year, 0, dayOfYear);
      return date
    }

    // YYYY-MM-DD or YYYYMMDD
    token = patterns.MMDD.exec(dateString);
    if (token) {
      date = new Date(0);
      month = parseInt(token[1], 10) - 1;
      var day = parseInt(token[2], 10);
      date.setUTCFullYear(year, month, day);
      return date
    }

    // YYYY-Www or YYYYWww
    token = patterns.Www.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      return dayOfISOYear(year, week)
    }

    // YYYY-Www-D or YYYYWwwD
    token = patterns.WwwD.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      var dayOfWeek = parseInt(token[2], 10) - 1;
      return dayOfISOYear(year, week, dayOfWeek)
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
      return (hours % 24) * MILLISECONDS_IN_HOUR
    }

    // hh:mm or hhmm
    token = patterns.HHMM.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseFloat(token[2].replace(',', '.'));
      return (hours % 24) * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE
    }

    // hh:mm:ss or hhmmss
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseInt(token[2], 10);
      var seconds = parseFloat(token[3].replace(',', '.'));
      return (hours % 24) * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE +
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

    // ±hh
    token = patterns.timezoneHH.exec(timezoneString);
    if (token) {
      absoluteOffset = parseInt(token[2], 10) * 60;
      return (token[1] === '+') ? -absoluteOffset : absoluteOffset
    }

    // ±hh:mm or ±hhmm
    token = patterns.timezoneHHMM.exec(timezoneString);
    if (token) {
      absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
      return (token[1] === '+') ? -absoluteOffset : absoluteOffset
    }

    return 0
  }

  function dayOfISOYear (isoYear, week, day) {
    week = week || 0;
    day = day || 0;
    var date = new Date(0);
    date.setUTCFullYear(isoYear, 0, 4);
    var fourthOfJanuaryDay = date.getUTCDay() || 7;
    var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date
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
    var amount = Number(dirtyAmount);
    return new Date(timestamp + amount)
  }

  function cloneObject (dirtyObject) {
    dirtyObject = dirtyObject || {};
    var object = {};

    for (var property in dirtyObject) {
      if (dirtyObject.hasOwnProperty(property)) {
        object[property] = dirtyObject[property];
      }
    }

    return object
  }

  var MILLISECONDS_IN_MINUTE$2 = 60000;

  /**
   * @name addMinutes
   * @category Minute Helpers
   * @summary Add the specified number of minutes to the given date.
   *
   * @description
   * Add the specified number of minutes to the given date.
   *
   * @param {Date|String|Number} date - the date to be changed
   * @param {Number} amount - the amount of minutes to be added
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Date} the new date with the minutes added
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Add 30 minutes to 10 July 2014 12:00:00:
   * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
   * //=> Thu Jul 10 2014 12:30:00
   */
  function addMinutes (dirtyDate, dirtyAmount, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var amount = Number(dirtyAmount);
    return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE$2, dirtyOptions)
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

  var tokensToBeShortedPattern = /MMMM|MM|DD|dddd/g;

  function buildShortLongFormat (format) {
    return format.replace(tokensToBeShortedPattern, function (token) {
      return token.slice(1)
    })
  }

  /**
   * @name buildFormatLongFn
   * @category Locale Helpers
   * @summary Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
   *
   * @description
   * Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
   * Returns a function which takes one of the following tokens as the argument:
   * `'LTS'`, `'LT'`, `'L'`, `'LL'`, `'LLL'`, `'l'`, `'ll'`, `'lll'`, `'llll'`
   * and returns a long format string written as `format` token strings.
   * See [format]{@link https://date-fns.org/docs/format}
   *
   * `'l'`, `'ll'`, `'lll'` and `'llll'` formats are built automatically
   * by shortening some of the tokens from corresponding unshortened formats
   * (e.g., if `LL` is `'MMMM DD YYYY'` then `ll` will be `MMM D YYYY`)
   *
   * @param {Object} obj - the object with long formats written as `format` token strings
   * @param {String} obj.LT - time format: hours and minutes
   * @param {String} obj.LTS - time format: hours, minutes and seconds
   * @param {String} obj.L - short date format: numeric day, month and year
   * @param {String} [obj.l] - short date format: numeric day, month and year (shortened)
   * @param {String} obj.LL - long date format: day, month in words, and year
   * @param {String} [obj.ll] - long date format: day, month in words, and year (shortened)
   * @param {String} obj.LLL - long date and time format
   * @param {String} [obj.lll] - long date and time format (shortened)
   * @param {String} obj.LLLL - long date, time and weekday format
   * @param {String} [obj.llll] - long date, time and weekday format (shortened)
   * @returns {Function} `formatLong` property of the locale
   *
   * @example
   * // For `en-US` locale:
   * locale.formatLong = buildFormatLongFn({
   *   LT: 'h:mm aa',
   *   LTS: 'h:mm:ss aa',
   *   L: 'MM/DD/YYYY',
   *   LL: 'MMMM D YYYY',
   *   LLL: 'MMMM D YYYY h:mm aa',
   *   LLLL: 'dddd, MMMM D YYYY h:mm aa'
   * })
   */
  function buildFormatLongFn (obj) {
    var formatLongLocale = {
      LTS: obj.LTS,
      LT: obj.LT,
      L: obj.L,
      LL: obj.LL,
      LLL: obj.LLL,
      LLLL: obj.LLLL,
      l: obj.l || buildShortLongFormat(obj.L),
      ll: obj.ll || buildShortLongFormat(obj.LL),
      lll: obj.lll || buildShortLongFormat(obj.LLL),
      llll: obj.llll || buildShortLongFormat(obj.LLLL)
    };

    return function (token) {
      return formatLongLocale[token]
    }
  }

  var formatLong = buildFormatLongFn({
    LT: 'h:mm aa',
    LTS: 'h:mm:ss aa',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D YYYY',
    LLL: 'MMMM D YYYY h:mm aa',
    LLLL: 'dddd, MMMM D YYYY h:mm aa'
  });

  var formatRelativeLocale = {
    lastWeek: '[last] dddd [at] LT',
    yesterday: '[yesterday at] LT',
    today: '[today at] LT',
    tomorrow: '[tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    other: 'L'
  };

  function formatRelative (token, date, baseDate, options) {
    return formatRelativeLocale[token]
  }

  /**
   * @name buildLocalizeFn
   * @category Locale Helpers
   * @summary Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale.
   *
   * @description
   * Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale
   * used by `format` function.
   * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
   *
   * `localize.weekday` function takes the weekday index as argument (0 - Sunday).
   * `localize.month` takes the month index (0 - January).
   * `localize.timeOfDay` takes the hours. Use `indexCallback` to convert them to an array index (see example).
   *
   * @param {Object} values - the object with arrays of values
   * @param {String} defaultType - the default type for the localize function
   * @param {Function} [indexCallback] - the callback which takes the resulting function argument
   *   and converts it into value array index
   * @returns {Function} the resulting function
   *
   * @example
   * var timeOfDayValues = {
   *   uppercase: ['AM', 'PM'],
   *   lowercase: ['am', 'pm'],
   *   long: ['a.m.', 'p.m.']
   * }
   * locale.localize.timeOfDay = buildLocalizeFn(timeOfDayValues, 'long', function (hours) {
   *   // 0 is a.m. array index, 1 is p.m. array index
   *   return (hours / 12) >= 1 ? 1 : 0
   * })
   * locale.localize.timeOfDay(16, {type: 'uppercase'}) //=> 'PM'
   * locale.localize.timeOfDay(5) //=> 'a.m.'
   */
  function buildLocalizeFn (values, defaultType, indexCallback) {
    return function (dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var type = options.type ? String(options.type) : defaultType;
      var valuesArray = values[type] || values[defaultType];
      var index = indexCallback ? indexCallback(Number(dirtyIndex)) : Number(dirtyIndex);
      return valuesArray[index]
    }
  }

  /**
   * @name buildLocalizeArrayFn
   * @category Locale Helpers
   * @summary Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
   *
   * @description
   * Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
   * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
   *
   * @param {Object} values - the object with arrays of values
   * @param {String} defaultType - the default type for the localize function
   * @returns {Function} the resulting function
   *
   * @example
   * var weekdayValues = {
   *   narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
   *   short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
   *   long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   * }
   * locale.localize.weekdays = buildLocalizeArrayFn(weekdayValues, 'long')
   * locale.localize.weekdays({type: 'narrow'}) //=> ['Su', 'Mo', ...]
   * locale.localize.weekdays() //=> ['Sunday', 'Monday', ...]
   */
  function buildLocalizeArrayFn (values, defaultType) {
    return function (dirtyOptions) {
      var options = dirtyOptions || {};
      var type = options.type ? String(options.type) : defaultType;
      return values[type] || values[defaultType]
    }
  }

  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var weekdayValues = {
    narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };

  var monthValues = {
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  // `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
  // Use the system which is used the most commonly in the locale.
  // For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
  //
  //   var timeOfDayValues = {
  //     any: ['in the night', 'in the morning', 'in the afternoon', 'in the evening']
  //   }
  //
  // And later:
  //
  //   var localize = {
  //     // The callback takes the hours as the argument and returns the array index
  //     timeOfDay: buildLocalizeFn(timeOfDayValues, 'any', function (hours) {
  //       if (hours >= 17) {
  //         return 3
  //       } else if (hours >= 12) {
  //         return 2
  //       } else if (hours >= 4) {
  //         return 1
  //       } else {
  //         return 0
  //       }
  //     }),
  //     timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'any')
  //   }
  var timeOfDayValues = {
    uppercase: ['AM', 'PM'],
    lowercase: ['am', 'pm'],
    long: ['a.m.', 'p.m.']
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
    // where `unit` can be 'month', 'quarter', 'week', 'isoWeek', 'dayOfYear',
    // 'dayOfMonth' or 'dayOfWeek'

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
    weekday: buildLocalizeFn(weekdayValues, 'long'),
    weekdays: buildLocalizeArrayFn(weekdayValues, 'long'),
    month: buildLocalizeFn(monthValues, 'long'),
    months: buildLocalizeArrayFn(monthValues, 'long'),
    timeOfDay: buildLocalizeFn(timeOfDayValues, 'long', function (hours) {
      return (hours / 12) >= 1 ? 1 : 0
    }),
    timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'long')
  };

  /**
   * @name buildMatchFn
   * @category Locale Helpers
   * @summary Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale.
   *
   * @description
   * Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale used by `parse` function.
   * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
   * The result of the match function will be passed into corresponding parser function
   * (`match.weekday`, `match.month` or `match.timeOfDay` respectively. See `buildParseFn`).
   *
   * @param {Object} values - the object with RegExps
   * @param {String} defaultType - the default type for the match function
   * @returns {Function} the resulting function
   *
   * @example
   * var matchWeekdaysPatterns = {
   *   narrow: /^(su|mo|tu|we|th|fr|sa)/i,
   *   short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
   *   long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
   * }
   * locale.match.weekdays = buildMatchFn(matchWeekdaysPatterns, 'long')
   * locale.match.weekdays('Sunday', {type: 'narrow'}) //=> ['Su', 'Su', ...]
   * locale.match.weekdays('Sunday') //=> ['Sunday', 'Sunday', ...]
   */
  function buildMatchFn (patterns, defaultType) {
    return function (dirtyString, dirtyOptions) {
      var options = dirtyOptions || {};
      var type = options.type ? String(options.type) : defaultType;
      var pattern = patterns[type] || patterns[defaultType];
      var string = String(dirtyString);
      return string.match(pattern)
    }
  }

  /**
   * @name buildParseFn
   * @category Locale Helpers
   * @summary Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale.
   *
   * @description
   * Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale used by `parse` function.
   * The argument of the resulting function is the result of the corresponding match function
   * (`match.weekdays`, `match.months` or `match.timesOfDay` respectively. See `buildMatchFn`).
   *
   * @param {Object} values - the object with arrays of RegExps
   * @param {String} defaultType - the default type for the parser function
   * @returns {Function} the resulting function
   *
   * @example
   * var parseWeekdayPatterns = {
   *   any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
   * }
   * locale.match.weekday = buildParseFn(matchWeekdaysPatterns, 'long')
   * var matchResult = locale.match.weekdays('Friday')
   * locale.match.weekday(matchResult) //=> 5
   */
  function buildParseFn (patterns, defaultType) {
    return function (matchResult, dirtyOptions) {
      var options = dirtyOptions || {};
      var type = options.type ? String(options.type) : defaultType;
      var patternsArray = patterns[type] || patterns[defaultType];
      var string = matchResult[1];

      return patternsArray.findIndex(function (pattern) {
        return pattern.test(string)
      })
    }
  }

  /**
   * @name buildMatchPatternFn
   * @category Locale Helpers
   * @summary Build match function from a single RegExp.
   *
   * @description
   * Build match function from a single RegExp.
   * Usually used for building `match.ordinalNumbers` property of the locale.
   *
   * @param {Object} pattern - the RegExp
   * @returns {Function} the resulting function
   *
   * @example
   * locale.match.ordinalNumbers = buildMatchPatternFn(/^(\d+)(th|st|nd|rd)?/i)
   * locale.match.ordinalNumbers('3rd') //=> ['3rd', '3', 'rd', ...]
   */
  function buildMatchPatternFn (pattern) {
    return function (dirtyString) {
      var string = String(dirtyString);
      return string.match(pattern)
    }
  }

  /**
   * @name parseDecimal
   * @category Locale Helpers
   * @summary Parses the match result into decimal number.
   *
   * @description
   * Parses the match result into decimal number.
   * Uses the string matched with the first set of parentheses of match RegExp.
   *
   * @param {Array} matchResult - the object returned by matching function
   * @returns {Number} the parsed value
   *
   * @example
   * locale.match = {
   *   ordinalNumbers: (dirtyString) {
   *     return String(dirtyString).match(/^(\d+)(th|st|nd|rd)?/i)
   *   },
   *   ordinalNumber: parseDecimal
   * }
   */
  function parseDecimal (matchResult) {
    return parseInt(matchResult[1], 10)
  }

  var matchOrdinalNumbersPattern = /^(\d+)(th|st|nd|rd)?/i;

  var matchWeekdaysPatterns = {
    narrow: /^(su|mo|tu|we|th|fr|sa)/i,
    short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };

  var parseWeekdayPatterns = {
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };

  var matchMonthsPatterns = {
    short: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    long: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };

  var parseMonthPatterns = {
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };

  // `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
  // Use the system which is used the most commonly in the locale.
  // For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
  //
  //   var matchTimesOfDayPatterns = {
  //     long: /^((in the)? (night|morning|afternoon|evening?))/i
  //   }
  //
  //   var parseTimeOfDayPatterns = {
  //     any: [/(night|morning)/i, /(afternoon|evening)/i]
  //   }
  var matchTimesOfDayPatterns = {
    short: /^(am|pm)/i,
    long: /^([ap]\.?\s?m\.?)/i
  };

  var parseTimeOfDayPatterns = {
    any: [/^a/i, /^p/i]
  };

  var match = {
    ordinalNumbers: buildMatchPatternFn(matchOrdinalNumbersPattern),
    ordinalNumber: parseDecimal,
    weekdays: buildMatchFn(matchWeekdaysPatterns, 'long'),
    weekday: buildParseFn(parseWeekdayPatterns, 'any'),
    months: buildMatchFn(matchMonthsPatterns, 'long'),
    month: buildParseFn(parseMonthPatterns, 'any'),
    timesOfDay: buildMatchFn(matchTimesOfDayPatterns, 'long'),
    timeOfDay: buildParseFn(parseTimeOfDayPatterns, 'any')
  };

  /**
   * @type {Locale}
   * @category Locales
   * @summary English locale (United States).
   * @language English
   * @iso-639-2 eng
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

  var MILLISECONDS_IN_DAY$1 = 86400000;

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function getUTCDayOfYear (dirtyDate, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY$1) + 1
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function startOfUTCISOWeek (dirtyDate, dirtyOptions) {
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
    var year = getUTCISOWeekYear(dirtyDate, dirtyOptions);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCISOWeek(fourthOfJanuary, dirtyOptions);
    return date
  }

  var MILLISECONDS_IN_WEEK$2 = 604800000;

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function getUTCISOWeek (dirtyDate, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var diff = startOfUTCISOWeek(date, dirtyOptions).getTime() - startOfUTCISOWeekYear(date, dirtyOptions).getTime();

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK$2) + 1
  }

  var formatters = {
    // Month: 1, 2, ..., 12
    'M': function (date) {
      return date.getUTCMonth() + 1
    },

    // Month: 1st, 2nd, ..., 12th
    'Mo': function (date, options) {
      var month = date.getUTCMonth() + 1;
      return options.locale.localize.ordinalNumber(month, {unit: 'month'})
    },

    // Month: 01, 02, ..., 12
    'MM': function (date) {
      return addLeadingZeros(date.getUTCMonth() + 1, 2)
    },

    // Month: Jan, Feb, ..., Dec
    'MMM': function (date, options) {
      return options.locale.localize.month(date.getUTCMonth(), {type: 'short'})
    },

    // Month: January, February, ..., December
    'MMMM': function (date, options) {
      return options.locale.localize.month(date.getUTCMonth(), {type: 'long'})
    },

    // Quarter: 1, 2, 3, 4
    'Q': function (date) {
      return Math.ceil((date.getUTCMonth() + 1) / 3)
    },

    // Quarter: 1st, 2nd, 3rd, 4th
    'Qo': function (date, options) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      return options.locale.localize.ordinalNumber(quarter, {unit: 'quarter'})
    },

    // Day of month: 1, 2, ..., 31
    'D': function (date) {
      return date.getUTCDate()
    },

    // Day of month: 1st, 2nd, ..., 31st
    'Do': function (date, options) {
      return options.locale.localize.ordinalNumber(date.getUTCDate(), {unit: 'dayOfMonth'})
    },

    // Day of month: 01, 02, ..., 31
    'DD': function (date) {
      return addLeadingZeros(date.getUTCDate(), 2)
    },

    // Day of year: 1, 2, ..., 366
    'DDD': function (date) {
      return getUTCDayOfYear(date)
    },

    // Day of year: 1st, 2nd, ..., 366th
    'DDDo': function (date, options) {
      return options.locale.localize.ordinalNumber(getUTCDayOfYear(date), {unit: 'dayOfYear'})
    },

    // Day of year: 001, 002, ..., 366
    'DDDD': function (date) {
      return addLeadingZeros(getUTCDayOfYear(date), 3)
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date, options) {
      return options.locale.localize.weekday(date.getUTCDay(), {type: 'narrow'})
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date, options) {
      return options.locale.localize.weekday(date.getUTCDay(), {type: 'short'})
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date, options) {
      return options.locale.localize.weekday(date.getUTCDay(), {type: 'long'})
    },

    // Day of week: 0, 1, ..., 6
    'd': function (date) {
      return date.getUTCDay()
    },

    // Day of week: 0th, 1st, 2nd, ..., 6th
    'do': function (date, options) {
      return options.locale.localize.ordinalNumber(date.getUTCDay(), {unit: 'dayOfWeek'})
    },

    // Day of ISO week: 1, 2, ..., 7
    'E': function (date) {
      return date.getUTCDay() || 7
    },

    // ISO week: 1, 2, ..., 53
    'W': function (date) {
      return getUTCISOWeek(date)
    },

    // ISO week: 1st, 2nd, ..., 53th
    'Wo': function (date, options) {
      return options.locale.localize.ordinalNumber(getUTCISOWeek(date), {unit: 'isoWeek'})
    },

    // ISO week: 01, 02, ..., 53
    'WW': function (date) {
      return addLeadingZeros(getUTCISOWeek(date), 2)
    },

    // Year: 00, 01, ..., 99
    'YY': function (date) {
      return addLeadingZeros(date.getUTCFullYear(), 4).substr(2)
    },

    // Year: 1900, 1901, ..., 2099
    'YYYY': function (date) {
      return addLeadingZeros(date.getUTCFullYear(), 4)
    },

    // ISO week-numbering year: 00, 01, ..., 99
    'GG': function (date) {
      return String(getUTCISOWeekYear(date)).substr(2)
    },

    // ISO week-numbering year: 1900, 1901, ..., 2099
    'GGGG': function (date) {
      return getUTCISOWeekYear(date)
    },

    // Hour: 0, 1, ... 23
    'H': function (date) {
      return date.getUTCHours()
    },

    // Hour: 00, 01, ..., 23
    'HH': function (date) {
      return addLeadingZeros(date.getUTCHours(), 2)
    },

    // Hour: 1, 2, ..., 12
    'h': function (date) {
      var hours = date.getUTCHours();
      if (hours === 0) {
        return 12
      } else if (hours > 12) {
        return hours % 12
      } else {
        return hours
      }
    },

    // Hour: 01, 02, ..., 12
    'hh': function (date) {
      return addLeadingZeros(formatters['h'](date), 2)
    },

    // Minute: 0, 1, ..., 59
    'm': function (date) {
      return date.getUTCMinutes()
    },

    // Minute: 00, 01, ..., 59
    'mm': function (date) {
      return addLeadingZeros(date.getUTCMinutes(), 2)
    },

    // Second: 0, 1, ..., 59
    's': function (date) {
      return date.getUTCSeconds()
    },

    // Second: 00, 01, ..., 59
    'ss': function (date) {
      return addLeadingZeros(date.getUTCSeconds(), 2)
    },

    // 1/10 of second: 0, 1, ..., 9
    'S': function (date) {
      return Math.floor(date.getUTCMilliseconds() / 100)
    },

    // 1/100 of second: 00, 01, ..., 99
    'SS': function (date) {
      return addLeadingZeros(Math.floor(date.getUTCMilliseconds() / 10), 2)
    },

    // Millisecond: 000, 001, ..., 999
    'SSS': function (date) {
      return addLeadingZeros(date.getUTCMilliseconds(), 3)
    },

    // Timezone: -01:00, +00:00, ... +12:00
    'Z': function (date, options) {
      var originalDate = options._originalDate || date;
      return formatTimezone(originalDate.getTimezoneOffset(), ':')
    },

    // Timezone: -0100, +0000, ... +1200
    'ZZ': function (date, options) {
      var originalDate = options._originalDate || date;
      return formatTimezone(originalDate.getTimezoneOffset())
    },

    // Seconds timestamp: 512969520
    'X': function (date, options) {
      var originalDate = options._originalDate || date;
      return Math.floor(originalDate.getTime() / 1000)
    },

    // Milliseconds timestamp: 512969520900
    'x': function (date, options) {
      var originalDate = options._originalDate || date;
      return originalDate.getTime()
    },

    // AM, PM
    'A': function (date, options) {
      return options.locale.localize.timeOfDay(date.getUTCHours(), {type: 'uppercase'})
    },

    // am, pm
    'a': function (date, options) {
      return options.locale.localize.timeOfDay(date.getUTCHours(), {type: 'lowercase'})
    },

    // a.m., p.m.
    'aa': function (date, options) {
      return options.locale.localize.timeOfDay(date.getUTCHours(), {type: 'long'})
    }
  };

  function formatTimezone (offset, delimeter) {
    delimeter = delimeter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
  }

  function addLeadingZeros (number, targetLength) {
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function addUTCMinutes (dirtyDate, dirtyAmount, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var amount = Number(dirtyAmount);
    date.setUTCMinutes(date.getUTCMinutes() + amount);
    return date
  }

  var longFormattingTokensRegExp = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
  var defaultFormattingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;

  /**
   * @name format
   * @category Common Helpers
   * @summary Format the date.
   *
   * @description
   * Return the formatted date string in the given format.
   *
   * Accepted tokens:
   * | Unit                    | Token | Result examples                  |
   * |-------------------------|-------|----------------------------------|
   * | Month                   | M     | 1, 2, ..., 12                    |
   * |                         | Mo    | 1st, 2nd, ..., 12th              |
   * |                         | MM    | 01, 02, ..., 12                  |
   * |                         | MMM   | Jan, Feb, ..., Dec               |
   * |                         | MMMM  | January, February, ..., December |
   * | Quarter                 | Q     | 1, 2, 3, 4                       |
   * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
   * | Day of month            | D     | 1, 2, ..., 31                    |
   * |                         | Do    | 1st, 2nd, ..., 31st              |
   * |                         | DD    | 01, 02, ..., 31                  |
   * | Day of year             | DDD   | 1, 2, ..., 366                   |
   * |                         | DDDo  | 1st, 2nd, ..., 366th             |
   * |                         | DDDD  | 001, 002, ..., 366               |
   * | Day of week             | d     | 0, 1, ..., 6                     |
   * |                         | do    | 0th, 1st, ..., 6th               |
   * |                         | dd    | Su, Mo, ..., Sa                  |
   * |                         | ddd   | Sun, Mon, ..., Sat               |
   * |                         | dddd  | Sunday, Monday, ..., Saturday    |
   * | Day of ISO week         | E     | 1, 2, ..., 7                     |
   * | ISO week                | W     | 1, 2, ..., 53                    |
   * |                         | Wo    | 1st, 2nd, ..., 53rd              |
   * |                         | WW    | 01, 02, ..., 53                  |
   * | Year                    | YY    | 00, 01, ..., 99                  |
   * |                         | YYYY  | 1900, 1901, ..., 2099            |
   * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
   * |                         | GGGG  | 1900, 1901, ..., 2099            |
   * | AM/PM                   | A     | AM, PM                           |
   * |                         | a     | am, pm                           |
   * |                         | aa    | a.m., p.m.                       |
   * | Hour                    | H     | 0, 1, ... 23                     |
   * |                         | HH    | 00, 01, ... 23                   |
   * |                         | h     | 1, 2, ..., 12                    |
   * |                         | hh    | 01, 02, ..., 12                  |
   * | Minute                  | m     | 0, 1, ..., 59                    |
   * |                         | mm    | 00, 01, ..., 59                  |
   * | Second                  | s     | 0, 1, ..., 59                    |
   * |                         | ss    | 00, 01, ..., 59                  |
   * | 1/10 of second          | S     | 0, 1, ..., 9                     |
   * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
   * | Millisecond             | SSS   | 000, 001, ..., 999               |
   * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
   * |                         | ZZ    | -0100, +0000, ..., +1200         |
   * | Seconds timestamp       | X     | 512969520                        |
   * | Milliseconds timestamp  | x     | 512969520900                     |
   * | Long format             | LT    | 05:30 a.m.                       |
   * |                         | LTS   | 05:30:15 a.m.                    |
   * |                         | L     | 07/02/1995                       |
   * |                         | l     | 7/2/1995                         |
   * |                         | LL    | July 2 1995                      |
   * |                         | ll    | Jul 2 1995                       |
   * |                         | LLL   | July 2 1995 05:30 a.m.           |
   * |                         | lll   | Jul 2 1995 05:30 a.m.            |
   * |                         | LLLL  | Sunday, July 2 1995 05:30 a.m.   |
   * |                         | llll  | Sun, Jul 2 1995 05:30 a.m.       |
   *
   * The characters wrapped in square brackets are escaped.
   *
   * The result may vary by locale.
   *
   * @param {Date|String|Number} date - the original date
   * @param {String} format - the string of tokens
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @returns {String} the formatted date string
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   * @throws {RangeError} `options.locale` must contain `localize` property
   * @throws {RangeError} `options.locale` must contain `formatLong` property
   *
   * @example
   * // Represent 11 February 2014 in middle-endian format:
   * var result = format(
   *   new Date(2014, 1, 11),
   *   'MM/DD/YYYY'
   * )
   * //=> '02/11/2014'
   *
   * @example
   * // Represent 2 July 2014 in Esperanto:
   * import { eoLocale } from 'date-fns/locale/eo'
   * var result = format(
   *   new Date(2014, 6, 2),
   *   'Do [de] MMMM YYYY',
   *   {locale: eoLocale}
   * )
   * //=> '2-a de julio 2014'
   */
  function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {};

    var locale$$1 = options.locale || locale;

    if (!locale$$1.localize) {
      throw new RangeError('locale must contain localize property')
    }

    if (!locale$$1.formatLong) {
      throw new RangeError('locale must contain formatLong property')
    }

    var localeFormatters = locale$$1.formatters || {};
    var formattingTokensRegExp = locale$$1.formattingTokensRegExp || defaultFormattingTokensRegExp;
    var formatLong = locale$$1.formatLong;

    var originalDate = toDate(dirtyDate, options);

    if (!isValid(originalDate, options)) {
      return 'Invalid Date'
    }

    // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
    var timezoneOffset = originalDate.getTimezoneOffset();
    var utcDate = addUTCMinutes(originalDate, -timezoneOffset, options);

    var formatterOptions = cloneObject(options);
    formatterOptions.locale = locale$$1;
    formatterOptions.formatters = formatters;

    // When UTC functions will be implemented, options._originalDate will likely be a part of public API.
    // Right now, please don't use it in locales. If you have to use an original date,
    // please restore it from `date`, adding a timezone offset to it.
    formatterOptions._originalDate = originalDate;

    var result = formatStr
      .replace(longFormattingTokensRegExp, function (substring) {
        if (substring[0] === '[') {
          return substring
        }

        if (substring[0] === '\\') {
          return cleanEscapedString(substring)
        }

        return formatLong(substring)
      })
      .replace(formattingTokensRegExp, function (substring) {
        var formatter = localeFormatters[substring] || formatters[substring];

        if (formatter) {
          return formatter(utcDate, formatterOptions)
        } else {
          return cleanEscapedString(substring)
        }
      });

    return result
  }

  function cleanEscapedString (input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|]$/g, '')
    }
    return input.replace(/\\/g, '')
  }

  /**
   * @name subMinutes
   * @category Minute Helpers
   * @summary Subtract the specified number of minutes from the given date.
   *
   * @description
   * Subtract the specified number of minutes from the given date.
   *
   * @param {Date|String|Number} date - the date to be changed
   * @param {Number} amount - the amount of minutes to be subtracted
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @returns {Date} the new date with the mintues subtracted
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Subtract 30 minutes from 10 July 2014 12:00:00:
   * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
   * //=> Thu Jul 10 2014 11:30:00
   */
  function subMinutes (dirtyDate, dirtyAmount, dirtyOptions) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
    }

    var amount = Number(dirtyAmount);
    return addMinutes(dirtyDate, -amount, dirtyOptions)
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

  var patterns$1 = {
    'M': /^(1[0-2]|0?\d)/, // 0 to 12
    'D': /^(3[0-1]|[0-2]?\d)/, // 0 to 31
    'DDD': /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
    'W': /^(5[0-3]|[0-4]?\d)/, // 0 to 53
    'YYYY': /^(\d{1,4})/, // 0 to 9999
    'H': /^(2[0-3]|[0-1]?\d)/, // 0 to 23
    'm': /^([0-5]?\d)/, // 0 to 59
    'Z': /^([+-])(\d{2}):(\d{2})/,
    'ZZ': /^([+-])(\d{2})(\d{2})/,
    singleDigit: /^(\d)/,
    twoDigits: /^(\d{2})/,
    threeDigits: /^(\d{3})/,
    fourDigits: /^(\d{4})/,
    anyDigits: /^(\d+)/
  };

  function parseDecimal$1 (matchResult) {
    return parseInt(matchResult[1], 10)
  }

  var parsers = {
    // Year: 00, 01, ..., 99
    'YY': {
      unit: 'twoDigitYear',
      match: patterns$1.twoDigits,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult)
      }
    },

    // Year: 1900, 1901, ..., 2099
    'YYYY': {
      unit: 'year',
      match: patterns$1.YYYY,
      parse: parseDecimal$1
    },

    // ISO week-numbering year: 00, 01, ..., 99
    'GG': {
      unit: 'isoYear',
      match: patterns$1.twoDigits,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult) + 1900
      }
    },

    // ISO week-numbering year: 1900, 1901, ..., 2099
    'GGGG': {
      unit: 'isoYear',
      match: patterns$1.YYYY,
      parse: parseDecimal$1
    },

    // Quarter: 1, 2, 3, 4
    'Q': {
      unit: 'quarter',
      match: patterns$1.singleDigit,
      parse: parseDecimal$1
    },

    // Ordinal quarter
    'Qo': {
      unit: 'quarter',
      match: function (string, options) {
        return options.locale.match.ordinalNumbers(string, {unit: 'quarter'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.ordinalNumber(matchResult, {unit: 'quarter'})
      }
    },

    // Month: 1, 2, ..., 12
    'M': {
      unit: 'month',
      match: patterns$1.M,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult) - 1
      }
    },

    // Ordinal month
    'Mo': {
      unit: 'month',
      match: function (string, options) {
        return options.locale.match.ordinalNumbers(string, {unit: 'month'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.ordinalNumber(matchResult, {unit: 'month'}) - 1
      }
    },

    // Month: 01, 02, ..., 12
    'MM': {
      unit: 'month',
      match: patterns$1.twoDigits,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult) - 1
      }
    },

    // Month: Jan, Feb, ..., Dec
    'MMM': {
      unit: 'month',
      match: function (string, options) {
        return options.locale.match.months(string, {type: 'short'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.month(matchResult, {type: 'short'})
      }
    },

    // Month: January, February, ..., December
    'MMMM': {
      unit: 'month',
      match: function (string, options) {
        return options.locale.match.months(string, {type: 'long'}) ||
          options.locale.match.months(string, {type: 'short'})
      },
      parse: function (matchResult, options) {
        var parseResult = options.locale.match.month(matchResult, {type: 'long'});

        if (parseResult == null) {
          parseResult = options.locale.match.month(matchResult, {type: 'short'});
        }

        return parseResult
      }
    },

    // ISO week: 1, 2, ..., 53
    'W': {
      unit: 'isoWeek',
      match: patterns$1.W,
      parse: parseDecimal$1
    },

    // Ordinal ISO week
    'Wo': {
      unit: 'isoWeek',
      match: function (string, options) {
        return options.locale.match.ordinalNumbers(string, {unit: 'isoWeek'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.ordinalNumber(matchResult, {unit: 'isoWeek'})
      }
    },

    // ISO week: 01, 02, ..., 53
    'WW': {
      unit: 'isoWeek',
      match: patterns$1.twoDigits,
      parse: parseDecimal$1
    },

    // Day of week: 0, 1, ..., 6
    'd': {
      unit: 'dayOfWeek',
      match: patterns$1.singleDigit,
      parse: parseDecimal$1
    },

    // Ordinal day of week
    'do': {
      unit: 'dayOfWeek',
      match: function (string, options) {
        return options.locale.match.ordinalNumbers(string, {unit: 'dayOfWeek'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.ordinalNumber(matchResult, {unit: 'dayOfWeek'})
      }
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': {
      unit: 'dayOfWeek',
      match: function (string, options) {
        return options.locale.match.weekdays(string, {type: 'narrow'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.weekday(matchResult, {type: 'narrow'})
      }
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': {
      unit: 'dayOfWeek',
      match: function (string, options) {
        return options.locale.match.weekdays(string, {type: 'short'}) ||
          options.locale.match.weekdays(string, {type: 'narrow'})
      },
      parse: function (matchResult, options) {
        var parseResult = options.locale.match.weekday(matchResult, {type: 'short'});

        if (parseResult == null) {
          parseResult = options.locale.match.weekday(matchResult, {type: 'narrow'});
        }

        return parseResult
      }
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': {
      unit: 'dayOfWeek',
      match: function (string, options) {
        return options.locale.match.weekdays(string, {type: 'long'}) ||
          options.locale.match.weekdays(string, {type: 'short'}) ||
          options.locale.match.weekdays(string, {type: 'narrow'})
      },
      parse: function (matchResult, options) {
        var parseResult = options.locale.match.weekday(matchResult, {type: 'long'});

        if (parseResult == null) {
          parseResult = options.locale.match.weekday(matchResult, {type: 'short'});

          if (parseResult == null) {
            parseResult = options.locale.match.weekday(matchResult, {type: 'narrow'});
          }
        }

        return parseResult
      }
    },

    // Day of ISO week: 1, 2, ..., 7
    'E': {
      unit: 'dayOfISOWeek',
      match: patterns$1.singleDigit,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult)
      }
    },

    // Day of month: 1, 2, ..., 31
    'D': {
      unit: 'dayOfMonth',
      match: patterns$1.D,
      parse: parseDecimal$1
    },

    // Ordinal day of month
    'Do': {
      unit: 'dayOfMonth',
      match: function (string, options) {
        return options.locale.match.ordinalNumbers(string, {unit: 'dayOfMonth'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.ordinalNumber(matchResult, {unit: 'dayOfMonth'})
      }
    },

    // Day of month: 01, 02, ..., 31
    'DD': {
      unit: 'dayOfMonth',
      match: patterns$1.twoDigits,
      parse: parseDecimal$1
    },

    // Day of year: 1, 2, ..., 366
    'DDD': {
      unit: 'dayOfYear',
      match: patterns$1.DDD,
      parse: parseDecimal$1
    },

    // Ordinal day of year
    'DDDo': {
      unit: 'dayOfYear',
      match: function (string, options) {
        return options.locale.match.ordinalNumbers(string, {unit: 'dayOfYear'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.ordinalNumber(matchResult, {unit: 'dayOfYear'})
      }
    },

    // Day of year: 001, 002, ..., 366
    'DDDD': {
      unit: 'dayOfYear',
      match: patterns$1.threeDigits,
      parse: parseDecimal$1
    },

    // AM, PM
    'A': {
      unit: 'timeOfDay',
      match: function (string, options) {
        return options.locale.match.timesOfDay(string, {type: 'short'})
      },
      parse: function (matchResult, options) {
        return options.locale.match.timeOfDay(matchResult, {type: 'short'})
      }
    },

    // a.m., p.m.
    'aa': {
      unit: 'timeOfDay',
      match: function (string, options) {
        return options.locale.match.timesOfDay(string, {type: 'long'}) ||
          options.locale.match.timesOfDay(string, {type: 'short'})
      },
      parse: function (matchResult, options) {
        var parseResult = options.locale.match.timeOfDay(matchResult, {type: 'long'});

        if (parseResult == null) {
          parseResult = options.locale.match.timeOfDay(matchResult, {type: 'short'});
        }

        return parseResult
      }
    },

    // Hour: 0, 1, ... 23
    'H': {
      unit: 'hours',
      match: patterns$1.H,
      parse: parseDecimal$1
    },

    // Hour: 00, 01, ..., 23
    'HH': {
      unit: 'hours',
      match: patterns$1.twoDigits,
      parse: parseDecimal$1
    },

    // Hour: 1, 2, ..., 12
    'h': {
      unit: 'timeOfDayHours',
      match: patterns$1.M,
      parse: parseDecimal$1
    },

    // Hour: 01, 02, ..., 12
    'hh': {
      unit: 'timeOfDayHours',
      match: patterns$1.twoDigits,
      parse: parseDecimal$1
    },

    // Minute: 0, 1, ..., 59
    'm': {
      unit: 'minutes',
      match: patterns$1.m,
      parse: parseDecimal$1
    },

    // Minute: 00, 01, ..., 59
    'mm': {
      unit: 'minutes',
      match: patterns$1.twoDigits,
      parse: parseDecimal$1
    },

    // Second: 0, 1, ..., 59
    's': {
      unit: 'seconds',
      match: patterns$1.m,
      parse: parseDecimal$1
    },

    // Second: 00, 01, ..., 59
    'ss': {
      unit: 'seconds',
      match: patterns$1.twoDigits,
      parse: parseDecimal$1
    },

    // 1/10 of second: 0, 1, ..., 9
    'S': {
      unit: 'milliseconds',
      match: patterns$1.singleDigit,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult) * 100
      }
    },

    // 1/100 of second: 00, 01, ..., 99
    'SS': {
      unit: 'milliseconds',
      match: patterns$1.twoDigits,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult) * 10
      }
    },

    // Millisecond: 000, 001, ..., 999
    'SSS': {
      unit: 'milliseconds',
      match: patterns$1.threeDigits,
      parse: parseDecimal$1
    },

    // Timezone: -01:00, +00:00, ... +12:00
    'Z': {
      unit: 'timezone',
      match: patterns$1.Z,
      parse: function (matchResult) {
        var sign = matchResult[1];
        var hours = parseInt(matchResult[2], 10);
        var minutes = parseInt(matchResult[3], 10);
        var absoluteOffset = hours * 60 + minutes;
        return (sign === '+') ? absoluteOffset : -absoluteOffset
      }
    },

    // Timezone: -0100, +0000, ... +1200
    'ZZ': {
      unit: 'timezone',
      match: patterns$1.ZZ,
      parse: function (matchResult) {
        var sign = matchResult[1];
        var hours = parseInt(matchResult[2], 10);
        var minutes = parseInt(matchResult[3], 10);
        var absoluteOffset = hours * 60 + minutes;
        return (sign === '+') ? absoluteOffset : -absoluteOffset
      }
    },

    // Seconds timestamp: 512969520
    'X': {
      unit: 'timestamp',
      match: patterns$1.anyDigits,
      parse: function (matchResult) {
        return parseDecimal$1(matchResult) * 1000
      }
    },

    // Milliseconds timestamp: 512969520900
    'x': {
      unit: 'timestamp',
      match: patterns$1.anyDigits,
      parse: parseDecimal$1
    }
  };

  parsers['a'] = parsers['A'];

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function setUTCDay (dirtyDate, dirtyDay, dirtyOptions) {
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn === undefined ? 0 : Number(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn === undefined ? defaultWeekStartsOn : Number(options.weekStartsOn);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
    }

    var date = toDate(dirtyDate, dirtyOptions);
    var day = Number(dirtyDay);

    var currentDay = date.getUTCDay();

    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;

    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

    date.setUTCDate(date.getUTCDate() + diff);
    return date
  }

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function setUTCISODay (dirtyDate, dirtyDay, dirtyOptions) {
    var day = Number(dirtyDay);

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
    var date = toDate(dirtyDate, dirtyOptions);
    var isoWeek = Number(dirtyISOWeek);
    var diff = getUTCISOWeek(date, dirtyOptions) - isoWeek;
    date.setUTCDate(date.getUTCDate() - diff * 7);
    return date
  }

  var MILLISECONDS_IN_DAY$3 = 86400000;

  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function setUTCISOWeekYear (dirtyDate, dirtyISOYear, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var isoYear = Number(dirtyISOYear);
    var dateStartOfYear = startOfUTCISOWeekYear(date, dirtyOptions);
    var diff = Math.floor((date.getTime() - dateStartOfYear.getTime()) / MILLISECONDS_IN_DAY$3);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(isoYear, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    date = startOfUTCISOWeekYear(fourthOfJanuary, dirtyOptions);
    date.setUTCDate(date.getUTCDate() + diff);
    return date
  }

  var MILLISECONDS_IN_MINUTE$6 = 60000;

  function setTimeOfDay (hours, timeOfDay) {
    var isAM = timeOfDay === 0;

    if (isAM) {
      if (hours === 12) {
        return 0
      }
    } else {
      if (hours !== 12) {
        return 12 + hours
      }
    }

    return hours
  }

  var units = {
    twoDigitYear: {
      priority: 10,
      set: function (dateValues, value) {
        var century = Math.floor(dateValues.date.getUTCFullYear() / 100);
        var year = century * 100 + value;
        dateValues.date.setUTCFullYear(year, 0, 1);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    year: {
      priority: 10,
      set: function (dateValues, value) {
        dateValues.date.setUTCFullYear(value, 0, 1);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    isoYear: {
      priority: 10,
      set: function (dateValues, value, options) {
        dateValues.date = startOfUTCISOWeekYear(setUTCISOWeekYear(dateValues.date, value, options), options);
        return dateValues
      }
    },

    quarter: {
      priority: 20,
      set: function (dateValues, value) {
        dateValues.date.setUTCMonth((value - 1) * 3, 1);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    month: {
      priority: 30,
      set: function (dateValues, value) {
        dateValues.date.setUTCMonth(value, 1);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    isoWeek: {
      priority: 40,
      set: function (dateValues, value, options) {
        dateValues.date = startOfUTCISOWeek(setUTCISOWeek(dateValues.date, value, options), options);
        return dateValues
      }
    },

    dayOfWeek: {
      priority: 50,
      set: function (dateValues, value, options) {
        dateValues.date = setUTCDay(dateValues.date, value, options);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    dayOfISOWeek: {
      priority: 50,
      set: function (dateValues, value, options) {
        dateValues.date = setUTCISODay(dateValues.date, value, options);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    dayOfMonth: {
      priority: 50,
      set: function (dateValues, value) {
        dateValues.date.setUTCDate(value);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    dayOfYear: {
      priority: 50,
      set: function (dateValues, value) {
        dateValues.date.setUTCMonth(0, value);
        dateValues.date.setUTCHours(0, 0, 0, 0);
        return dateValues
      }
    },

    timeOfDay: {
      priority: 60,
      set: function (dateValues, value, options) {
        dateValues.timeOfDay = value;
        return dateValues
      }
    },

    hours: {
      priority: 70,
      set: function (dateValues, value, options) {
        dateValues.date.setUTCHours(value, 0, 0, 0);
        return dateValues
      }
    },

    timeOfDayHours: {
      priority: 70,
      set: function (dateValues, value, options) {
        var timeOfDay = dateValues.timeOfDay;
        if (timeOfDay != null) {
          value = setTimeOfDay(value, timeOfDay);
        }
        dateValues.date.setUTCHours(value, 0, 0, 0);
        return dateValues
      }
    },

    minutes: {
      priority: 80,
      set: function (dateValues, value) {
        dateValues.date.setUTCMinutes(value, 0, 0);
        return dateValues
      }
    },

    seconds: {
      priority: 90,
      set: function (dateValues, value) {
        dateValues.date.setUTCSeconds(value, 0);
        return dateValues
      }
    },

    milliseconds: {
      priority: 100,
      set: function (dateValues, value) {
        dateValues.date.setUTCMilliseconds(value);
        return dateValues
      }
    },

    timezone: {
      priority: 110,
      set: function (dateValues, value) {
        dateValues.date = new Date(dateValues.date.getTime() - value * MILLISECONDS_IN_MINUTE$6);
        return dateValues
      }
    },

    timestamp: {
      priority: 120,
      set: function (dateValues, value) {
        dateValues.date = new Date(value);
        return dateValues
      }
    }
  };

  var TIMEZONE_UNIT_PRIORITY = 110;
  var MILLISECONDS_IN_MINUTE$7 = 60000;

  var longFormattingTokensRegExp$1 = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
  var defaultParsingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;

  /**
   * @name parse
   * @category Common Helpers
   * @summary Parse the date.
   *
   * @description
   * Return the date parsed from string using the given format.
   *
   * Accepted format tokens:
   * | Unit                    | Priority | Token | Input examples                   |
   * |-------------------------|----------|-------|----------------------------------|
   * | Year                    | 10       | YY    | 00, 01, ..., 99                  |
   * |                         |          | YYYY  | 1900, 1901, ..., 2099            |
   * | ISO week-numbering year | 10       | GG    | 00, 01, ..., 99                  |
   * |                         |          | GGGG  | 1900, 1901, ..., 2099            |
   * | Quarter                 | 20       | Q     | 1, 2, 3, 4                       |
   * |                         |          | Qo    | 1st, 2nd, 3rd, 4th               |
   * | Month                   | 30       | M     | 1, 2, ..., 12                    |
   * |                         |          | Mo    | 1st, 2nd, ..., 12th              |
   * |                         |          | MM    | 01, 02, ..., 12                  |
   * |                         |          | MMM   | Jan, Feb, ..., Dec               |
   * |                         |          | MMMM  | January, February, ..., December |
   * | ISO week                | 40       | W     | 1, 2, ..., 53                    |
   * |                         |          | Wo    | 1st, 2nd, ..., 53rd              |
   * |                         |          | WW    | 01, 02, ..., 53                  |
   * | Day of week             | 50       | d     | 0, 1, ..., 6                     |
   * |                         |          | do    | 0th, 1st, ..., 6th               |
   * |                         |          | dd    | Su, Mo, ..., Sa                  |
   * |                         |          | ddd   | Sun, Mon, ..., Sat               |
   * |                         |          | dddd  | Sunday, Monday, ..., Saturday    |
   * | Day of ISO week         | 50       | E     | 1, 2, ..., 7                     |
   * | Day of month            | 50       | D     | 1, 2, ..., 31                    |
   * |                         |          | Do    | 1st, 2nd, ..., 31st              |
   * |                         |          | DD    | 01, 02, ..., 31                  |
   * | Day of year             | 50       | DDD   | 1, 2, ..., 366                   |
   * |                         |          | DDDo  | 1st, 2nd, ..., 366th             |
   * |                         |          | DDDD  | 001, 002, ..., 366               |
   * | Time of day             | 60       | A     | AM, PM                           |
   * |                         |          | a     | am, pm                           |
   * |                         |          | aa    | a.m., p.m.                       |
   * | Hour                    | 70       | H     | 0, 1, ... 23                     |
   * |                         |          | HH    | 00, 01, ... 23                   |
   * | Time of day hour        | 70       | h     | 1, 2, ..., 12                    |
   * |                         |          | hh    | 01, 02, ..., 12                  |
   * | Minute                  | 80       | m     | 0, 1, ..., 59                    |
   * |                         |          | mm    | 00, 01, ..., 59                  |
   * | Second                  | 90       | s     | 0, 1, ..., 59                    |
   * |                         |          | ss    | 00, 01, ..., 59                  |
   * | 1/10 of second          | 100      | S     | 0, 1, ..., 9                     |
   * | 1/100 of second         | 100      | SS    | 00, 01, ..., 99                  |
   * | Millisecond             | 100      | SSS   | 000, 001, ..., 999               |
   * | Timezone                | 110      | Z     | -01:00, +00:00, ... +12:00       |
   * |                         |          | ZZ    | -0100, +0000, ..., +1200         |
   * | Seconds timestamp       | 120      | X     | 512969520                        |
   * | Milliseconds timestamp  | 120      | x     | 512969520900                     |
   *
   * Values will be assigned to the date in the ascending order of its unit's priority.
   * Units of an equal priority overwrite each other in the order of appearance.
   *
   * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
   * the values will be taken from 3rd argument `baseDate` which works as a context of parsing.
   *
   * `baseDate` must be passed for correct work of the function.
   * If you're not sure which `baseDate` to supply, create a new instance of Date:
   * `parse('02/11/2014', 'MM/DD/YYYY', new Date())`
   * In this case parsing will be done in the context of the current date.
   * If `baseDate` is `Invalid Date` or a value not convertible to valid `Date`,
   * then `Invalid Date` will be returned.
   *
   * Also, `parse` unfolds long formats like those in [format]{@link https://date-fns.org/docs/format}:
   * | Token | Input examples                 |
   * |-------|--------------------------------|
   * | LT    | 05:30 a.m.                     |
   * | LTS   | 05:30:15 a.m.                  |
   * | L     | 07/02/1995                     |
   * | l     | 7/2/1995                       |
   * | LL    | July 2 1995                    |
   * | ll    | Jul 2 1995                     |
   * | LLL   | July 2 1995 05:30 a.m.         |
   * | lll   | Jul 2 1995 05:30 a.m.          |
   * | LLLL  | Sunday, July 2 1995 05:30 a.m. |
   * | llll  | Sun, Jul 2 1995 05:30 a.m.     |
   *
   * The characters wrapped in square brackets in the format string are escaped.
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
   * @param {Date|String|Number} baseDate - the date to took the missing higher priority values from
   * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
   * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @returns {Date} the parsed date
   * @throws {TypeError} 3 arguments required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   * @throws {RangeError} `options.locale` must contain `match` property
   * @throws {RangeError} `options.locale` must contain `formatLong` property
   *
   * @example
   * // Parse 11 February 2014 from middle-endian format:
   * var result = parse(
   *   '02/11/2014',
   *   'MM/DD/YYYY',
   *   new Date()
   * )
   * //=> Tue Feb 11 2014 00:00:00
   *
   * @example
   * // Parse 28th of February in English locale in the context of 2010 year:
   * import eoLocale from 'date-fns/locale/eo'
   * var result = parse(
   *   '28-a de februaro',
   *   'Do [de] MMMM',
   *   new Date(2010, 0, 1)
   *   {locale: eoLocale}
   * )
   * //=> Sun Feb 28 2010 00:00:00
   */
  function parse (dirtyDateString, dirtyFormatString, dirtyBaseDate, dirtyOptions) {
    if (arguments.length < 3) {
      throw new TypeError('3 arguments required, but only ' + arguments.length + ' present')
    }

    var dateString = String(dirtyDateString);
    var options = dirtyOptions || {};

    var weekStartsOn = options.weekStartsOn === undefined ? 0 : Number(options.weekStartsOn);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
    }

    var locale$$1 = options.locale || locale;
    var localeParsers = locale$$1.parsers || {};
    var localeUnits = locale$$1.units || {};

    if (!locale$$1.match) {
      throw new RangeError('locale must contain match property')
    }

    if (!locale$$1.formatLong) {
      throw new RangeError('locale must contain formatLong property')
    }

    var formatString = String(dirtyFormatString)
      .replace(longFormattingTokensRegExp$1, function (substring) {
        if (substring[0] === '[') {
          return substring
        }

        if (substring[0] === '\\') {
          return cleanEscapedString$1(substring)
        }

        return locale$$1.formatLong(substring)
      });

    if (formatString === '') {
      if (dateString === '') {
        return toDate(dirtyBaseDate, options)
      } else {
        return new Date(NaN)
      }
    }

    var subFnOptions = cloneObject(options);
    subFnOptions.locale = locale$$1;

    var tokens = formatString.match(locale$$1.parsingTokensRegExp || defaultParsingTokensRegExp);
    var tokensLength = tokens.length;

    // If timezone isn't specified, it will be set to the system timezone
    var setters = [{
      priority: TIMEZONE_UNIT_PRIORITY,
      set: dateToSystemTimezone,
      index: 0
    }];

    var i;
    for (i = 0; i < tokensLength; i++) {
      var token = tokens[i];
      var parser = localeParsers[token] || parsers[token];
      if (parser) {
        var matchResult;

        if (parser.match instanceof RegExp) {
          matchResult = parser.match.exec(dateString);
        } else {
          matchResult = parser.match(dateString, subFnOptions);
        }

        if (!matchResult) {
          return new Date(NaN)
        }

        var unitName = parser.unit;
        var unit = localeUnits[unitName] || units[unitName];

        setters.push({
          priority: unit.priority,
          set: unit.set,
          value: parser.parse(matchResult, subFnOptions),
          index: setters.length
        });

        var substring = matchResult[0];
        dateString = dateString.slice(substring.length);
      } else {
        var head = tokens[i].match(/^\[.*]$/) ? tokens[i].replace(/^\[|]$/g, '') : tokens[i];
        if (dateString.indexOf(head) === 0) {
          dateString = dateString.slice(head.length);
        } else {
          return new Date(NaN)
        }
      }
    }

    var uniquePrioritySetters = setters
      .map(function (setter) {
        return setter.priority
      })
      .sort(function (a, b) {
        return a - b
      })
      .filter(function (priority, index, array) {
        return array.indexOf(priority) === index
      })
      .map(function (priority) {
        return setters
          .filter(function (setter) {
            return setter.priority === priority
          })
          .reverse()
      })
      .map(function (setterArray) {
        return setterArray[0]
      });

    var date = toDate(dirtyBaseDate, options);

    if (isNaN(date)) {
      return new Date(NaN)
    }

    // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37
    var utcDate = subMinutes(date, date.getTimezoneOffset());

    var dateValues = {date: utcDate};

    var settersLength = uniquePrioritySetters.length;
    for (i = 0; i < settersLength; i++) {
      var setter = uniquePrioritySetters[i];
      dateValues = setter.set(dateValues, setter.value, subFnOptions);
    }

    return dateValues.date
  }

  function dateToSystemTimezone (dateValues) {
    var date = dateValues.date;
    var time = date.getTime();

    // Get the system timezone offset at (moment of time - offset)
    var offset = date.getTimezoneOffset();

    // Get the system timezone offset at the exact moment of time
    offset = new Date(time + offset * MILLISECONDS_IN_MINUTE$7).getTimezoneOffset();

    // Convert date in timezone "UTC+00:00" to the system timezone
    dateValues.date = new Date(time + offset * MILLISECONDS_IN_MINUTE$7);

    return dateValues
  }

  function cleanEscapedString$1 (input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|]$/g, '')
    }
    return input.replace(/\\/g, '')
  }

  // This file is generated automatically by `scripts/build/indices.js`. Please, don't change it.

  // 

  /**
   * Custom parse behavior on top of date-fns parse function.
   */
  function parseDate$1 (date, format$$1) {
    if (typeof date !== 'string') {
      return isValid(date) ? date : null;
    }

    var parsed = parse(date, format$$1, new Date());

    // if date is not valid or the formatted output after parsing does not match
    // the string value passed in (avoids overflows)
    if (!isValid(parsed) || format(parsed, format$$1) !== date) {
      return null;
    }

    return parsed;
  }

  var afterValidator = function (value, ref) {
    var otherValue = ref[0];
    var inclusion = ref[1];
    var format$$1 = ref[2];

    if (typeof format$$1 === 'undefined') {
      format$$1 = inclusion;
      inclusion = false;
    }
    value = parseDate$1(value, format$$1);
    otherValue = parseDate$1(otherValue, format$$1);

    // if either is not valid.
    if (!value || !otherValue) {
      return false;
    }

    return isAfter(value, otherValue) || (inclusion && isEqual(value, otherValue));
  };

  var options = {
    hasTarget: true,
    isDate: true
  };

  var after = {
    validate: afterValidator,
    options: options
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
    lt: /^[A-ZĄČĘĖĮŠŲŪŽ]*$/i,
    nl: /^[A-ZÉËÏÓÖÜ]*$/i,
    hu: /^[A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
    pl: /^[A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
    pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
    ru: /^[А-ЯЁ]*$/i,
    sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
    sr: /^[A-ZČĆŽŠĐ]*$/i,
    tr: /^[A-ZÇĞİıÖŞÜ]*$/i,
    uk: /^[А-ЩЬЮЯЄІЇҐ]*$/i,
    ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
  };

  var alphaSpaces = {
    en: /^[A-Z\s]*$/i,
    cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]*$/i,
    da: /^[A-ZÆØÅ\s]*$/i,
    de: /^[A-ZÄÖÜß\s]*$/i,
    es: /^[A-ZÁÉÍÑÓÚÜ\s]*$/i,
    fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]*$/i,
    lt: /^[A-ZĄČĘĖĮŠŲŪŽ\s]*$/i,
    nl: /^[A-ZÉËÏÓÖÜ\s]*$/i,
    hu: /^[A-ZÁÉÍÓÖŐÚÜŰ\s]*$/i,
    pl: /^[A-ZĄĆĘŚŁŃÓŻŹ\s]*$/i,
    pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ\s]*$/i,
    ru: /^[А-ЯЁ\s]*$/i,
    sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ\s]*$/i,
    sr: /^[A-ZČĆŽŠĐ\s]*$/i,
    tr: /^[A-ZÇĞİıÖŞÜ\s]*$/i,
    uk: /^[А-ЩЬЮЯЄІЇҐ\s]*$/i,
    ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ\s]*$/
  };

  var alphanumeric = {
    en: /^[0-9A-Z]*$/i,
    cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
    da: /^[0-9A-ZÆØÅ]$/i,
    de: /^[0-9A-ZÄÖÜß]*$/i,
    es: /^[0-9A-ZÁÉÍÑÓÚÜ]*$/i,
    fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
    lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ]*$/i,
    hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
    nl: /^[0-9A-ZÉËÏÓÖÜ]*$/i,
    pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
    pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
    ru: /^[0-9А-ЯЁ]*$/i,
    sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
    sr: /^[0-9A-ZČĆŽŠĐ]*$/i,
    tr: /^[0-9A-ZÇĞİıÖŞÜ]*$/i,
    uk: /^[0-9А-ЩЬЮЯЄІЇҐ]*$/i,
    ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
  };

  var alphaDash = {
    en: /^[0-9A-Z_-]*$/i,
    cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ_-]*$/i,
    da: /^[0-9A-ZÆØÅ_-]*$/i,
    de: /^[0-9A-ZÄÖÜß_-]*$/i,
    es: /^[0-9A-ZÁÉÍÑÓÚÜ_-]*$/i,
    fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ_-]*$/i,
    lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ_-]*$/i,
    nl: /^[0-9A-ZÉËÏÓÖÜ_-]*$/i,
    hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ_-]*$/i,
    pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ_-]*$/i,
    pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ_-]*$/i,
    ru: /^[0-9А-ЯЁ_-]*$/i,
    sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ_-]*$/i,
    sr: /^[0-9A-ZČĆŽŠĐ_-]*$/i,
    tr: /^[0-9A-ZÇĞİıÖŞÜ_-]*$/i,
    uk: /^[0-9А-ЩЬЮЯЄІЇҐ_-]*$/i,
    ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ_-]*$/
  };

  var validate = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alpha).some(function (loc) { return alpha[loc].test(value); });
    }

    return (alpha[locale] || alpha.en).test(value);
  };

  var alpha$1 = {
    validate: validate
  };

  var validate$1 = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$1(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alphaDash).some(function (loc) { return alphaDash[loc].test(value); });
    }

    return (alphaDash[locale] || alphaDash.en).test(value);
  };

  var alpha_dash = {
    validate: validate$1
  };

  var validate$2 = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$2(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alphanumeric).some(function (loc) { return alphanumeric[loc].test(value); });
    }

    return (alphanumeric[locale] || alphanumeric.en).test(value);
  };

  var alpha_num = {
    validate: validate$2
  };

  var validate$3 = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$3(val, [locale]); });
    }

    // Match at least one locale.
    if (! locale) {
      return Object.keys(alphaSpaces).some(function (loc) { return alphaSpaces[loc].test(value); });
    }

    return (alphaSpaces[locale] || alphaSpaces.en).test(value);
  };

  var alpha_spaces = {
    validate: validate$3
  };

  var validate$4 = function (value, ref) {
    var otherValue = ref[0];
    var inclusion = ref[1];
    var format$$1 = ref[2];

    if (typeof format$$1 === 'undefined') {
      format$$1 = inclusion;
      inclusion = false;
    }
    value = parseDate$1(value, format$$1);
    otherValue = parseDate$1(otherValue, format$$1);

    // if either is not valid.
    if (!value || !otherValue) {
      return false;
    }

    return isBefore(value, otherValue) || (inclusion && isEqual(value, otherValue));
  };

  var options$1 = {
    hasTarget: true,
    isDate: true
  };

  var before = {
    validate: validate$4,
    options: options$1
  };

  var validate$5 = function (value, ref) {
    var min = ref[0];
    var max = ref[1];

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$5(val, [min, max]); });
    }

    return Number(min) <= value && Number(max) >= value;
  };

  var between = {
    validate: validate$5
  };

  var validate$6 = function (value, other) { return String(value) === String(other); };
  var options$2 = {
    hasTarget: true
  };

  var confirmed = {
    validate: validate$6,
    options: options$2
  };

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var assertString_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertString;
  function assertString(input) {
    var isString = typeof input === 'string' || input instanceof String;

    if (!isString) {
      throw new TypeError('This library (validator.js) validates strings only');
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

  var validate$8 = function (value, params) {
    var assign, assign$1;

    var min$$1;
    var max$$1;
    var format$$1;
    var inclusivity = '()';

    if (params.length > 3) {
      (assign = params, min$$1 = assign[0], max$$1 = assign[1], inclusivity = assign[2], format$$1 = assign[3]);
    } else {
      (assign$1 = params, min$$1 = assign$1[0], max$$1 = assign$1[1], format$$1 = assign$1[2]);
    }

    var minDate = parseDate$1(String(min$$1), format$$1);
    var maxDate = parseDate$1(String(max$$1), format$$1);
    var dateVal = parseDate$1(String(value), format$$1);

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

  var date_between = {
    validate: validate$8,
    options: options$3
  };

  var validate$9 = function (value, ref) {
    var format = ref[0];

    return !!parseDate$1(value, format);
  };

  var options$4 = {
    isDate: true
  };

  var date_format = {
    validate: validate$9,
    options: options$4
  };

  var validate$a = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var decimals = ref[0]; if ( decimals === void 0 ) decimals = '*';
    var separator = ref[1]; if ( separator === void 0 ) separator = '.';

    if (Array.isArray(value)) {
      return value.every(function (val) { return validate$a(val, [decimals, separator]); });
    }

    if (value === null || value === undefined || value === '') {
      return true;
    }

    // if is 0.
    if (Number(decimals) === 0) {
      return /^-?\d*$/.test(value);
    }

    var regexPart = decimals === '*' ? '+' : ("{1," + decimals + "}");
    var regex = new RegExp(("^-?\\d*(\\" + separator + "\\d" + regexPart + ")?$"));

    if (! regex.test(value)) {
      return false;
    }

    var parsedValue = parseFloat(value);

    // eslint-disable-next-line
      return parsedValue === parsedValue;
  };

  var decimal = {
    validate: validate$a
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

    var list = [];
    for (var i = 0; i < files.length; i++) {
      // if file is not an image, reject.
      if (! /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false;
      }

      list.push(files[i]);
    }

    return Promise.all(list.map(function (file) { return validateImage(file, width, height); }));
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

  unwrapExports(isFQDN_1);

  var isEmail_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEmail;



  var _assertString2 = _interopRequireDefault(assertString_1);



  var _merge2 = _interopRequireDefault(merge_1);



  var _isByteLength2 = _interopRequireDefault(isByteLength_1);



  var _isFQDN2 = _interopRequireDefault(isFQDN_1);

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

    if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
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
      return false;
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

  var validate$d = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var multiple = ref[0]; if ( multiple === void 0 ) multiple = false;

    if (multiple) {
      value = value.split(',').map(function (emailStr) { return emailStr.trim(); });
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return isEmail(String(val)); });
    }

    return isEmail(String(value));
  };

  var email = {
    validate: validate$d
  };

  // 

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

  var isTextInput = function (el) {
    return includes(['text', 'password', 'search', 'email', 'tel', 'url', 'textarea'], el.type);
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
    return path.split('.').every(function (prop) {
      if (prop in obj) {
        obj = obj[prop];

        return true;
      }

      return false;
    });
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
  var debounce = function (fn, wait, immediate, token) {
    if ( wait === void 0 ) wait = 0;
    if ( immediate === void 0 ) immediate = false;
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

        if (!immediate && !token.cancelled) { fn.apply(void 0, args); }
      };
      /* istanbul ignore next */
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      /* istanbul ignore next */
      if (callNow) { fn.apply(void 0, args); }
    };
  };

  /**
   * Appends a rule definition to a list of rules.
   */
  var appendRule = function (rule, rules) {
    if (!rules) {
      return rule;
    }

    if (!rule) {
      return rules;
    }

    if (typeof rules === 'string') {
      return (rules + "|" + rule);
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

  /**
   * finds the first element that satisfies the predicate callback, polyfills array.find
   */
  var find = function (arrayLike, predicate) {
    var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        return array[i];
      }
    }

    return undefined;
  };

  var isBuiltInComponent = function (vnode) {
    if (!vnode) {
      return false;
    }

    var tag = vnode.componentOptions.tag;

    return /^(keep-alive|transition|transition-group)$/.test(tag);
  };

  var makeEventsArray = function (events) {
    return (typeof events === 'string' && events.length) ? events.split('|') : [];
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

  var merge$1 = function (target, source) {
    if (! (isObject(target) && isObject(source))) {
      return target;
    }

    Object.keys(source).forEach(function (key) {
      var obj, obj$1;

      if (isObject(source[key])) {
        if (! target[key]) {
          assign(target, ( obj = {}, obj[key] = {}, obj ));
        }

        merge$1(target[key], source[key]);
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
        rules = appendRule(("regex:" + (el.pattern)), rules);
      }

      // 524288 is the max on some browsers and test environments.
      if (el.maxLength >= 0 && el.maxLength < 524288) {
        rules = appendRule(("max:" + (el.maxLength)), rules);
      }

      if (el.minLength > 0) {
        rules = appendRule(("min:" + (el.minLength)), rules);
      }

      return rules;
    }

    if (el.type === 'number') {
      rules = appendRule('decimal', rules);
      if (el.min !== '') {
        rules = appendRule(("min_value:" + (el.min)), rules);
      }

      if (el.max !== '') {
        rules = appendRule(("max_value:" + (el.max)), rules);
      }

      return rules;
    }

    if (isDateInput(el)) {
      var timeFormat = el.step && Number(el.step) < 60 ? 'HH:mm:ss' : 'HH:mm';

      if (el.type === 'date') {
        return appendRule('date_format:YYYY-MM-DD', rules);
      }

      if (el.type === 'datetime-local') {
        return appendRule(("date_format:YYYY-MM-DDT" + timeFormat), rules);
      }

      if (el.type === 'month') {
        return appendRule('date_format:YYYY-MM', rules);
      }

      if (el.type === 'week') {
        return appendRule('date_format:YYYY-[W]WW', rules);
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
    return obj[Object.keys(obj)[0]];
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

    return files.every(function (file) { return regex.test(file.name); });
  };

  var ext = {
    validate: validate$g
  };

  var validate$h = function (files) { return files.every(function (file) { return /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name); }); };

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

  var validate$j = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var version = ref[0]; if ( version === void 0 ) version = 4;

    if (isNullOrUndefined(value)) {
      value = '';
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return isIP(val, version); });
    }

    return isIP(value, version);
  };

  var ip = {
    validate: validate$j
  };

  var validate$k = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var other = ref[0];

    return value === other;
  };

  var is = {
    validate: validate$k
  };

  var validate$l = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var other = ref[0];

    return value !== other;
  };

  var is_not = {
    validate: validate$l
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

  var validate$m = function (value, ref) {
    var length = ref[0];
    var max = ref[1]; if ( max === void 0 ) max = undefined;

    length = Number(length);
    if (value === undefined || value === null) {
      return false;
    }

    if (typeof value === 'number') {
      value = String(value);
    }

    if (!value.length) {
      value = toArray(value);
    }

    return compare(value, length, max);
  };

  var length = {
    validate: validate$m
  };

  var validate$n = function (value, ref) {
    var length = ref[0];

    if (value === undefined || value === null) {
      return length >= 0;
    }

    return String(value).length <= length;
  };

  var max$1 = {
    validate: validate$n
  };

  var validate$o = function (value, ref) {
    var max = ref[0];

    if (Array.isArray(value) || value === null || value === undefined || value === '') {
      return false;
    }

    return Number(value) <= max;
  };

  var max_value = {
    validate: validate$o
  };

  var validate$p = function (files, mimes) {
    var regex = new RegExp(((mimes.join('|').replace('*', '.+')) + "$"), 'i');

    return files.every(function (file) { return regex.test(file.type); });
  };

  var mimes = {
    validate: validate$p
  };

  var validate$q = function (value, ref) {
    var length = ref[0];

    if (value === undefined || value === null) {
      return false;
    }
    return String(value).length >= length;
  };

  var min$1 = {
    validate: validate$q
  };

  var validate$r = function (value, ref) {
    var min = ref[0];

    if (Array.isArray(value) || value === null || value === undefined || value === '') {
      return false;
    }

    return Number(value) >= min;
  };

  var min_value = {
    validate: validate$r
  };

  var validate$s = function (value) {
    if (Array.isArray(value)) {
      return value.every(function (val) { return /^[0-9]+$/.test(String(val)); });
    }

    return /^[0-9]+$/.test(String(value));
  };

  var numeric = {
    validate: validate$s
  };

  var validate$t = function (value, ref) {
    var regex = ref[0];
    var flags = ref.slice(1);

    if (regex instanceof RegExp) {
      return regex.test(value);
    }

    return new RegExp(regex, flags).test(String(value));
  };

  var regex = {
    validate: validate$t
  };

  var validate$u = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var invalidateFalse = ref[0]; if ( invalidateFalse === void 0 ) invalidateFalse = false;

    if (Array.isArray(value)) {
      return !!value.length;
    }

    // incase a field considers `false` as an empty value like checkboxes.
    if (value === false && invalidateFalse) {
      return false;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return !!String(value).trim().length;
  };

  var required = {
    validate: validate$u
  };

  var validate$v = function (files, ref) {
    var size = ref[0];

    if (isNaN(size)) {
      return false;
    }

    var nSize = Number(size) * 1024;
    for (var i = 0; i < files.length; i++) {
      if (files[i].size > nSize) {
        return false;
      }
    }

    return true;
  };

  var size = {
    validate: validate$v
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
      protocol = split.shift();
      if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
        return false;
      }
    } else if (options.require_protocol) {
      return false;
    } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
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

  var validate$w = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var requireProtocol = ref[0]; if ( requireProtocol === void 0 ) requireProtocol = false;

    var options = { require_protocol: !!requireProtocol, allow_underscores: true };
    if (isNullOrUndefined(value)) {
      value = '';
    }

    if (Array.isArray(value)) {
      return value.every(function (val) { return isURL(val, options); });
    }

    return isURL(value, options);
  };

  var url = {
    validate: validate$w
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
    is_not: is_not,
    is: is,
    max: max$1,
    max_value: max_value,
    mimes: mimes,
    min: min$1,
    min_value: min_value,
    excluded: excluded,
    numeric: numeric,
    regex: regex,
    required: required,
    size: size,
    url: url
  });

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
    alpha_dash: function (field) { return ("The " + field + " field may contain alpha-numeric characters as well as dashes and underscores."); },
    alpha_num: function (field) { return ("The " + field + " field may only contain alpha-numeric characters."); },
    alpha_spaces: function (field) { return ("The " + field + " field may only contain alphabetic characters as well as spaces."); },
    alpha: function (field) { return ("The " + field + " field may only contain alphabetic characters."); },
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
    ext: function (field) { return ("The " + field + " field must be a valid file."); },
    image: function (field) { return ("The " + field + " field must be an image."); },
    included: function (field) { return ("The " + field + " field must be a valid value."); },
    integer: function (field) { return ("The " + field + " field must be an integer."); },
    ip: function (field) { return ("The " + field + " field must be a valid ip address."); },
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
    excluded: function (field) { return ("The " + field + " field must be a valid value."); },
    numeric: function (field) { return ("The " + field + " field may only contain numeric characters."); },
    regex: function (field) { return ("The " + field + " field format is invalid."); },
    required: function (field) { return ("The " + field + " field is required."); },
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

  Dictionary.prototype.merge = function merge$1$$1 (dictionary) {
    merge$1(this.container, dictionary);
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

  var prototypeAccessors$1 = { locale: { configurable: true } };

  prototypeAccessors$1.locale.get = function () {
    return this.i18n.locale;
  };

  prototypeAccessors$1.locale.set = function (value) {
    warn('Cannot set locale from the validator when using vue-i18n, use i18n.locale setter instead');
  };

  I18nDictionary.prototype.getDateFormat = function getDateFormat (locale) {
    return this.i18n.getDateTimeFormat(locale || this.locale);
  };

  I18nDictionary.prototype.setDateFormat = function setDateFormat (locale, value) {
    this.i18n.setDateTimeFormat(locale || this.locale, value);
  };

  I18nDictionary.prototype.getMessage = function getMessage (locale, key, data) {
    var path = (this.rootKey) + ".messages." + key;
    if (!this.i18n.te(path)) {
      return this.i18n.t(((this.rootKey) + ".messages._default"), locale, data);
    }

    return this.i18n.t(path, locale, data);
  };

  I18nDictionary.prototype.getAttribute = function getAttribute (locale, key, fallback) {
      if ( fallback === void 0 ) fallback = '';

    var path = (this.rootKey) + ".attributes." + key;
    if (!this.i18n.te(path)) {
      return fallback;
    }

    return this.i18n.t(path, locale);
  };

  I18nDictionary.prototype.getFieldMessage = function getFieldMessage (locale, field, key, data) {
    var path = (this.rootKey) + ".custom." + field + "." + key;
    if (this.i18n.te(path)) {
      return this.i18n.t(path);
    }

    return this.getMessage(locale, key, data);
  };

  I18nDictionary.prototype.merge = function merge$1$$1 (dictionary) {
      var this$1 = this;

    Object.keys(dictionary).forEach(function (localeKey) {
        var obj;

      // i18n doesn't deep merge
      // first clone the existing locale (avoid mutations to locale)
      var clone = merge$1({}, getPath((localeKey + "." + (this$1.rootKey)), this$1.i18n.messages, {}));
      // Merge cloned locale with new one
      var locale = merge$1(clone, normalizeFormat(dictionary[localeKey]));
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

  Object.defineProperties( I18nDictionary.prototype, prototypeAccessors$1 );

  // 

  var defaultConfig = {
    locale: 'en',
    delay: 0,
    errorBagName: 'errors',
    dictionary: null,
    strict: true,
    fieldsBagName: 'fields',
    classes: false,
    classNames: null,
    events: 'input',
    inject: true,
    fastExit: true,
    aria: true,
    validity: false,
    i18n: null,
    i18nRootKey: 'validation'
  };

  var currentConfig = assign({}, defaultConfig);
  var dependencies = {
    dictionary: new Dictionary({
      en: {
        messages: {},
        attributes: {},
        custom: {}
      }
    })
  };

  var Config = function Config () {};

  var staticAccessors = { default: { configurable: true },current: { configurable: true } };

  staticAccessors.default.get = function () {
    return defaultConfig;
  };

  staticAccessors.current.get = function () {
    return currentConfig;
  };

  Config.dependency = function dependency (key) {
    return dependencies[key];
  };

  /**
   * Merges the config with a new one.
   */
  Config.merge = function merge (config) {
    currentConfig = assign({}, currentConfig, config);
    if (currentConfig.i18n) {
      Config.register('dictionary', new I18nDictionary(currentConfig.i18n, currentConfig.i18nRootKey));
    }
  };

  /**
   * Registers a dependency.
   */
  Config.register = function register (key, value) {
    dependencies[key] = value;
  };

  /**
   * Resolves the working config from a Vue instance.
   */
  Config.resolve = function resolve (context) {
    var selfConfig = getPath('$options.$_veeValidate', context, {});

    return assign({}, Config.current, selfConfig);
  };

  Object.defineProperties( Config, staticAccessors );

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
      if (!isNullOrUndefined(scope)) {
        matchesScope = item.scope === scope;
      }

      if (!isNullOrUndefined(this$1.vmId)) {
        matchesScope = item.vmId === this$1.vmId;
      }

      return matchesScope;
    };

    return !!this.items.filter(filterFn).length;
  };

  /**
   * Removes all items from the internal array.
   */
  ErrorBag.prototype.clear = function clear (scope) {
      var this$1 = this;

    var matchesVM = isNullOrUndefined(this.id) ? function () { return true; } : function (i) { return i.vmId === this$1.vmId; };
    if (isNullOrUndefined(scope)) {
      scope = null;
    }

    for (var i = 0; i < this.items.length; ++i) {
      if (matchesVM(this$1.items[i]) && this$1.items[i].scope === scope) {
        this$1.items.splice(i, 1);
        --i;
      }
    }
  };

  /**
   * Collects errors into groups or for a specific field.
   */
  ErrorBag.prototype.collect = function collect (field, scope, map) {
      if ( map === void 0 ) map = true;

    var groupErrors = function (items) {
      var fieldsCount = 0;
      var errors = items.reduce(function (collection, error) {
        if (!collection[error.field]) {
          collection[error.field] = [];
          fieldsCount++;
        }

        collection[error.field].push(map ? error.msg : error);

        return collection;
      }, {});

      // reduce the collection to be a single array.
      if (fieldsCount <= 1) {
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
      var this$1 = this;

    var condition = function (item) { return item.id === id; };
    if (Array.isArray(id)) {
      condition = function (item) { return id.indexOf(item.id) !== -1; };
    }

    for (var i = 0; i < this.items.length; ++i) {
      if (condition(this$1.items[i])) {
        this$1.items.splice(i, 1);
        --i;
      }
    }
  };

  /**
   * Removes all error messages associated with a specific field.
   */
  ErrorBag.prototype.remove = function remove (field, scope) {
      var this$1 = this;

    if (isNullOrUndefined(field)) {
      return;
    }

    var selector = isNullOrUndefined(scope) ? String(field) : (scope + "." + field);
    var ref = this._makeCandidateFilters(selector);
      var isPrimary = ref.isPrimary;

    for (var i = 0; i < this.items.length; ++i) {
      if (isPrimary(this$1.items[i])) {
        this$1.items.splice(i, 1);
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

  /**
   * Generates the options required to construct a field.
   */
  var Resolver = function Resolver () {};

  Resolver.generate = function generate (el, binding, vnode) {
    var model = Resolver.resolveModel(binding, vnode);
    var options = Config.resolve(vnode.context);

    return {
      name: Resolver.resolveName(el, vnode),
      el: el,
      listen: !binding.modifiers.disable,
      bails: binding.modifiers.bails ? true : (binding.modifiers.continues === true ? false : undefined),
      scope: Resolver.resolveScope(el, binding, vnode),
      vm: Resolver.makeVM(vnode.context),
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
      validity: options.validity,
      aria: options.aria,
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

    return fillRulesFromElement(el, rules);
  };

  /**
   * @param {*} vnode
   */
  Resolver.resolveInitialValue = function resolveInitialValue (vnode) {
    var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });

    return model && model.value;
  };

  /**
   * Creates a non-circular partial VM instance from a Vue instance.
   * @param {*} vm
   */
  Resolver.makeVM = function makeVM (vm) {
    return {
      get $el () {
        return vm.$el;
      },
      get $refs () {
        return vm.$refs;
      },
      $watch: vm.$watch ? vm.$watch.bind(vm) : function () {},
      $validator: vm.$validator ? {
        errors: vm.$validator.errors,
        validate: vm.$validator.validate.bind(vm.$validator),
        update: vm.$validator.update.bind(vm.$validator)
      } : null
    };
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

    if (!events && Config.current.events) {
      events = Config.current.events;
    }

    // resolve the model event if its configured for custom components.
    if (events && vnode.componentInstance && includes(events, 'input')) {
      var ref = vnode.componentInstance.$options.model || { event: 'input' };
        var event = ref.event;
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

    var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });
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

  // 

  var RULES = {};
  var STRICT_MODE = true;

  var Validator = function Validator (validations, options) {
    if ( options === void 0 ) options = { fastExit: true };

    this.strict = STRICT_MODE;
    this.errors = new ErrorBag();
    this.fields = new FieldBag();
    this._createFields(validations);
    this.paused = false;
    this.fastExit = !isNullOrUndefined(options && options.fastExit) ? options.fastExit : true;
  };

  var prototypeAccessors$2 = { rules: { configurable: true },flags: { configurable: true },dictionary: { configurable: true },_vm: { configurable: true },locale: { configurable: true } };
  var staticAccessors$1 = { rules: { configurable: true },dictionary: { configurable: true },locale: { configurable: true } };

  staticAccessors$1.rules.get = function () {
    return RULES;
  };

  prototypeAccessors$2.rules.get = function () {
    return RULES;
  };

  prototypeAccessors$2.flags.get = function () {
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
   * Getter for the dictionary.
   */
  prototypeAccessors$2.dictionary.get = function () {
    return Config.dependency('dictionary');
  };

  staticAccessors$1.dictionary.get = function () {
    return Config.dependency('dictionary');
  };

  prototypeAccessors$2._vm.get = function () {
    return Config.dependency('vm');
  };

  /**
   * Getter for the current locale.
   */
  prototypeAccessors$2.locale.get = function () {
    return Validator.locale;
  };

  /**
   * Setter for the validator locale.
   */
  prototypeAccessors$2.locale.set = function (value) {
    Validator.locale = value;
  };

  staticAccessors$1.locale.get = function () {
    return this.dictionary.locale;
  };

  /**
   * Setter for the validator locale.
   */
  staticAccessors$1.locale.set = function (value) {
    var hasChanged = value !== Validator.dictionary.locale;
    Validator.dictionary.locale = value;
    if (hasChanged && Config.dependency('vm')) {
      Config.dependency('vm').$emit('localeChanged');
    }
  };

  /**
   * Static constructor.
   */
  Validator.create = function create (validations, options) {
    return new Validator(validations, options);
  };

  /**
   * Adds a custom validator to the list of validation rules.
   */
  Validator.extend = function extend (name, validator, options) {
      if ( options === void 0 ) options = {};

    Validator._guardExtend(name, validator);
    Validator._merge(name, {
      validator: validator,
      options: assign({}, { hasTarget: false, immediate: true }, options || {})
    });
  };

  /**
   * Removes a rule from the list of validators.
   */
  Validator.remove = function remove (name) {
    delete RULES[name];
  };

  /**
   * Checks if the given rule name is a rule that targets other fields.
   */
  Validator.isTargetRule = function isTargetRule (name) {
    return !!RULES[name] && RULES[name].options.hasTarget;
  };

  /**
   * Sets the operating mode for all newly created validators.
   * strictMode = true: Values without a rule are invalid and cause failure.
   * strictMode = false: Values without a rule are valid and are skipped.
   */
  Validator.setStrictMode = function setStrictMode (strictMode) {
      if ( strictMode === void 0 ) strictMode = true;

    STRICT_MODE = strictMode;
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
      Validator.dictionary.merge(lang);
      return;
    }

    // merge the dictionary.
    if (dictionary) {
      var locale = lang || dictionary.name;
      dictionary = assign({}, dictionary);
      Validator.dictionary.merge(( obj = {}, obj[locale] = dictionary, obj ));
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
    // fixes initial value detection with v-model and select elements.
    var value = fieldOpts.initialValue;
    var field = new Field(fieldOpts);
    this.fields.push(field);

    // validate the field initially
    if (field.immediate) {
      this.validate(("#" + (field.id)), value || field.value);
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

    field.destroy();
    this.errors.remove(field.name, field.scope, field.id);
    this.fields.remove(field);
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
    return this._vm.$nextTick().then(function () {
      return this$1._vm.$nextTick();
    }).then(function () {
      this$1.fields.filter(matcher).forEach(function (field) {
        field.reset(); // reset field flags.
        this$1.errors.remove(field.name, field.scope, field.id);
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
      return this._handleFieldNotFound(name);
    }

    if (!silent) { field.flags.pending = true; }
    if (value === undefined) {
      value = field.value;
    }

    return this._validate(field, value).then(function (result) {
      if (!silent) {
        this$1._handleValidationResults([result]);
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
  Validator.prototype.validateAll = function validateAll (values$$1, ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var silent = ref.silent;
      var vmId = ref.vmId;

    if (this.paused) { return Promise.resolve(true); }

    var matcher = null;
    var providedValues = false;

    if (typeof values$$1 === 'string') {
      matcher = { scope: values$$1, vmId: vmId };
    } else if (isObject(values$$1)) {
      matcher = Object.keys(values$$1).map(function (key) {
        return { name: key, vmId: vmId, scope: null };
      });
      providedValues = true;
    } else if (Array.isArray(values$$1)) {
      matcher = values$$1.map(function (key) {
        return { name: key, vmId: vmId };
      });
    } else {
      matcher = { scope: null, vmId: vmId };
    }

    return Promise.all(
      this.fields.filter(matcher).map(function (field) { return this$1._validate(field, providedValues ? values$$1[field.name] : field.value); })
    ).then(function (results) {
      if (!silent) {
        this$1._handleValidationResults(results);
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
        this$1._handleValidationResults(results);
      }

      return results.every(function (t) { return t.valid; });
    });
  };

  /**
   * Perform cleanup.
   */
  Validator.prototype.destroy = function destroy () {
    this._vm.$off('localeChanged');
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

    return format || this.dictionary.getDateFormat(this.locale);
  };

  /**
   * Formats an error message for field and a rule.
   */
  Validator.prototype._formatErrorMessage = function _formatErrorMessage (field, rule, data, targetName) {
      if ( data === void 0 ) data = {};
      if ( targetName === void 0 ) targetName = null;

    var name = this._getFieldDisplayName(field);
    var params = this._getLocalizedParams(rule, targetName);

    return this.dictionary.getFieldMessage(this.locale, field.name, rule.name, [name, params, data]);
  };

  /**
   * Translates the parameters passed to the rule (mainly for target fields).
   */
  Validator.prototype._getLocalizedParams = function _getLocalizedParams (rule, targetName) {
      if ( targetName === void 0 ) targetName = null;

    if (rule.options.hasTarget && rule.params && rule.params[0]) {
      var localizedName = targetName || this.dictionary.getAttribute(this.locale, rule.params[0], rule.params[0]);
      return [localizedName].concat(rule.params.slice(1));
    }

    return rule.params;
  };

  /**
   * Resolves an appropriate display name, first checking 'data-as' or the registered 'prettyName'
   */
  Validator.prototype._getFieldDisplayName = function _getFieldDisplayName (field) {
    return field.alias || this.dictionary.getAttribute(this.locale, field.name, field.name);
  };

  /**
   * Tests a single input value against a rule.
   */
  Validator.prototype._test = function _test (field, value, rule) {
      var this$1 = this;

    var validator = RULES[rule.name] ? RULES[rule.name].validate : null;
    var params = Array.isArray(rule.params) ? toArray(rule.params) : [];
    var targetName = null;
    if (!validator || typeof validator !== 'function') {
      return Promise.reject(createError(("No such validator '" + (rule.name) + "' exists.")));
    }

    // has field dependencies.
    if (rule.options.hasTarget) {
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

    var result = validator(value, params);

    // If it is a promise.
    if (isCallable(result.then)) {
      return result.then(function (values$$1) {
        var allValid = true;
        var data = {};
        if (Array.isArray(values$$1)) {
          allValid = values$$1.every(function (t) { return (isObject(t) ? t.valid : t); });
        } else { // Is a single object/boolean.
          allValid = isObject(values$$1) ? values$$1.valid : values$$1;
          data = values$$1.data;
        }

        return {
          valid: allValid,
          errors: allValid ? [] : [this$1._createFieldError(field, rule, data, targetName)]
        };
      });
    }

    if (!isObject(result)) {
      result = { valid: result, data: {} };
    }

    return {
      valid: result.valid,
      errors: result.valid ? [] : [this._createFieldError(field, rule, result.data, targetName)]
    };
  };

  /**
   * Merges a validator object into the RULES and Messages.
   */
  Validator._merge = function _merge (name, ref) {
      var validator = ref.validator;
      var options = ref.options;

    var validate = isCallable(validator) ? validator : validator.validate;
    if (validator.getMessage) {
      Validator.dictionary.setMessage(Validator.locale, name, validator.getMessage);
    }

    RULES[name] = {
      validate: validate,
      options: options
    };
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
      return this.fields.find({ id: name.slice(1) });
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
   * Handles when a field is not found depending on the strict flag.
   */
  Validator.prototype._handleFieldNotFound = function _handleFieldNotFound (name, scope) {
    if (!this.strict) { return Promise.resolve(true); }

    var fullName = isNullOrUndefined(scope) ? name : ("" + (!isNullOrUndefined(scope) ? scope + '.' : '') + name);

    return Promise.reject(createError(
      ("Validating a non-existent field: \"" + fullName + "\". Use \"attach()\" first.")
    ));
  };

  /**
   * Handles validation results.
   */
  Validator.prototype._handleValidationResults = function _handleValidationResults (results) {
      var this$1 = this;

    var matchers = results.map(function (result) { return ({ id: result.id }); });
    this.errors.removeById(matchers.map(function (m) { return m.id; }));
    // remove by name and scope to remove any custom errors added.
    results.forEach(function (result) {
      this$1.errors.remove(result.field, result.scope);
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

    // disabled fields are skipped
    if (field.isDisabled) {
      return true;
    }

    // skip if the field is not required and has an empty value.
    return !field.isRequired && (isNullOrUndefined(value) || value === '');
  };

  Validator.prototype._shouldBail = function _shouldBail (field, value) {
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

    if (this._shouldSkip(field, value)) {
      return Promise.resolve({ valid: true, id: field.id, field: field.name, scope: field.scope, errors: [] });
    }

    var promises = [];
    var errors = [];
    var isExitEarly = false;
    // use of '.some()' is to break iteration in middle by returning true
    Object.keys(field.rules).filter(function (rule) {
      if (!initial || !RULES[rule]) { return true; }

      return RULES[rule].options.immediate;
    }).some(function (rule) {
      var ruleOptions = RULES[rule] ? RULES[rule].options : {};
      var result = this$1._test(field, value, { name: rule, params: field.rules[rule], options: ruleOptions });
      if (isCallable(result.then)) {
        promises.push(result);
      } else if (!result.valid && this$1._shouldBail(field, value)) {
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

  Object.defineProperties( Validator.prototype, prototypeAccessors$2 );
  Object.defineProperties( Validator, staticAccessors$1 );

  // 

  var DEFAULT_OPTIONS = {
    targetOf: null,
    immediate: false,
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
    this.dependencies = [];
    this.vmId = options.vmId;
    this.watchers = [];
    this.events = [];
    this.delay = 0;
    this.rules = {};
    this._cacheId(options);
    this.classNames = assign({}, DEFAULT_OPTIONS.classNames);
    options = assign({}, DEFAULT_OPTIONS, options);
    this._delay = !isNullOrUndefined(options.delay) ? options.delay : 0; // cache initial delay
    this.validity = options.validity;
    this.aria = options.aria;
    this.flags = createFlags();
    this.vm = options.vm;
    this.componentInstance = options.component;
    this.ctorConfig = this.componentInstance ? getPath('$options.$_veeValidate', this.componentInstance) : undefined;
    this.update(options);
    // set initial value.
    this.initialValue = this.value;
    this.updated = false;
  };

  var prototypeAccessors$3 = { validator: { configurable: true },isRequired: { configurable: true },isDisabled: { configurable: true },alias: { configurable: true },value: { configurable: true },bails: { configurable: true },rejectsFalse: { configurable: true } };

  prototypeAccessors$3.validator.get = function () {
    if (!this.vm || !this.vm.$validator) {
      return { validate: function () {} };
    }

    return this.vm.$validator;
  };

  prototypeAccessors$3.isRequired.get = function () {
    return !!this.rules.required;
  };

  prototypeAccessors$3.isDisabled.get = function () {
    return !!(this.componentInstance && this.componentInstance.disabled) || !!(this.el && this.el.disabled);
  };

  /**
   * Gets the display name (user-friendly name).
   */
  prototypeAccessors$3.alias.get = function () {
    if (this._alias) {
      return this._alias;
    }

    var alias = null;
    if (this.el) {
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

  prototypeAccessors$3.value.get = function () {
    if (!isCallable(this.getter)) {
      return undefined;
    }

    return this.getter();
  };

  prototypeAccessors$3.bails.get = function () {
    return this._bails;
  };

  /**
   * If the field rejects false as a valid value for the required rule.
   */

  prototypeAccessors$3.rejectsFalse.get = function () {
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
   * Updates the field with changed data.
   */
  Field.prototype.update = function update (options) {
    this.targetOf = options.targetOf || null;
    this.immediate = options.immediate || this.immediate || false;

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
    this.classNames = isObject(options.classNames) ? merge$1(this.classNames, options.classNames) : this.classNames;
    this.getter = isCallable(options.getter) ? options.getter : this.getter;
    this._alias = options.alias || this._alias;
    this.events = (options.events) ? makeEventsArray(options.events) : this.events;
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

    this.addActionListeners();
    this.updateClasses();
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
      if (Validator.isTargetRule(r)) {
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
  Field.prototype.updateClasses = function updateClasses () {
      var this$1 = this;

    if (!this.classes || this.isDisabled) { return; }
    var applyClasses = function (el) {
      toggleClass(el, this$1.classNames.dirty, this$1.flags.dirty);
      toggleClass(el, this$1.classNames.pristine, this$1.flags.pristine);
      toggleClass(el, this$1.classNames.touched, this$1.flags.touched);
      toggleClass(el, this$1.classNames.untouched, this$1.flags.untouched);
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

    if (this.model) {
      return this.model.lazy ? 'change' : 'input';
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
    // if no event is configured, or it is a component or a text input then respect the user choice.
    if (!this.events.length || this.componentInstance || isTextInput(this.el)) {
      return [].concat( this.events );
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
      this$1.flags.changed = this$1.checkValueChanged();    this$1.validator.validate(("#" + (this$1.targetOf)));
    } : function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      // if its a DOM event, resolve the value, otherwise use the first parameter as the value.
      if (args.length === 0 || (isCallable(Event) && args[0] instanceof Event) || (args[0] && args[0].srcElement)) {
        args[0] = this$1.value;
      }

      this$1.flags.changed = this$1.checkValueChanged();
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
        var debouncedFn = debounce(fn, this.delay[inputEvent], false, token);
        var unwatch = ctx.$watch(expression, function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

          this$1.flags.pending = true;
          this$1._cancellationToken = token;
          debouncedFn.apply(void 0, args);
        });
        this.watchers.push({
          tag: 'input_model',
          unwatch: unwatch
        });

        // filter out input event as it is already handled by the watcher API.
        events = events.filter(function (e) { return e !== inputEvent; });
      }
    }

    // Add events.
    events.forEach(function (e) {
      var debouncedFn = debounce(fn, this$1.delay[e], false, token);
      var validate = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

        this$1.flags.pending = true;
        this$1._cancellationToken = token;
        debouncedFn.apply(void 0, args);
      };

      this$1._addComponentEventListener(e, validate);
      this$1._addHTMLEventListener(e, validate);
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
    this.unwatch();
    this.dependencies.forEach(function (d) { return d.field.destroy(); });
    this.dependencies = [];
  };

  Object.defineProperties( Field.prototype, prototypeAccessors$3 );

  // 

  var FieldBag = function FieldBag (items) {
    if ( items === void 0 ) items = [];

    this.items = items || [];
  };

  var prototypeAccessors$4 = { length: { configurable: true } };

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

  prototypeAccessors$4.length.get = function () {
    return this.items.length;
  };

  /**
   * Finds the first field that matches the provided matcher object.
   */
  FieldBag.prototype.find = function find$1 (matcher) {
    return find(this.items, function (item) { return item.matches(matcher); });
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

    if (this.find({ id: item.id })) {
      throw createError(("Field with id " + (item.id) + " is already added."));
    }

    this.items.push(item);
  };

  Object.defineProperties( FieldBag.prototype, prototypeAccessors$4 );

  var ScopedValidator = function ScopedValidator (base, vm) {
    this.id = vm._uid;
    this._base = base;

    // create a mirror bag with limited component scope.
    this.errors = new ErrorBag(base.errors, this.id);
  };

  var prototypeAccessors$5 = { flags: { configurable: true },rules: { configurable: true },fields: { configurable: true },dictionary: { configurable: true },locale: { configurable: true } };

  prototypeAccessors$5.flags.get = function () {
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

  prototypeAccessors$5.rules.get = function () {
    return this._base.rules;
  };

  prototypeAccessors$5.fields.get = function () {
    return new FieldBag(this._base.fields.filter({ vmId: this.id }));
  };

  prototypeAccessors$5.dictionary.get = function () {
    return this._base.dictionary;
  };

  prototypeAccessors$5.locale.get = function () {
    return this._base.locale;
  };

  prototypeAccessors$5.locale.set = function (val) {
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

  ScopedValidator.prototype.remove = function remove (ruleName) {
    return this._base.remove(ruleName);
  };

  ScopedValidator.prototype.detach = function detach () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).detach.apply(ref, args.concat( [this.id] ));
  };

  ScopedValidator.prototype.extend = function extend () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this._base).extend.apply(ref, args);
  };

  ScopedValidator.prototype.validate = function validate (descriptor, value, opts) {
      if ( opts === void 0 ) opts = {};

    return this._base.validate(descriptor, value, assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.validateAll = function validateAll (values$$1, opts) {
      if ( opts === void 0 ) opts = {};

    return this._base.validateAll(values$$1, assign({}, { vmId: this.id }, opts || {}));
  };

  ScopedValidator.prototype.validateScopes = function validateScopes (opts) {
      if ( opts === void 0 ) opts = {};

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

  Object.defineProperties( ScopedValidator.prototype, prototypeAccessors$5 );

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
      if (isBuiltInComponent(this.$vnode)) {
        return;
      }

      // if its a root instance set the config if it exists.
      if (!this.$parent) {
        Config.merge(this.$options.$_veeValidate || {});
      }

      var options = Config.resolve(this);

      // if its a root instance, inject anyways, or if it requested a new instance.
      if (!this.$parent || (this.$options.$_veeValidate && /new/.test(this.$options.$_veeValidate.validator))) {
        this.$validator = new ScopedValidator(Config.dependency('validator'), this);
      }

      var requested = requestsValidator(this.$options.inject);

      // if automatic injection is enabled and no instance was requested.
      if (! this.$validator && options.inject && !requested) {
        this.$validator = new ScopedValidator(Config.dependency('validator'), this);
      }

      // don't inject errors or fieldBag as no validator was resolved.
      if (! requested && ! this.$validator) {
        return;
      }

      // There is a validator but it isn't injected, mark as reactive.
      if (!requested && this.$validator) {
        var Vue = this.$options._base; // the vue constructor.
        Vue.util.defineReactive(this.$validator, 'errors', this.$validator.errors);
      }

      if (! this.$options.computed) {
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

    return context.$validator.fields.find({ id: el._veeValidateId });
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

  var Vue;

  function install (_Vue, options) {
    if ( options === void 0 ) options = {};

    if (Vue && _Vue === Vue) {
      {
        warn('already installed, Vue.use(VeeValidate) should only be called once.');
      }
      return;
    }

    detectPassiveSupport();
    Vue = _Vue;
    var validator = new Validator(null, options);
    var localVue = new Vue({
      data: function () { return ({
        errors: validator.errors,
        fields: validator.fields
      }); }
    });
    Config.register('vm', localVue);
    Config.register('validator', validator);
    Config.merge(options);

    var ref = Config.current;
    var dictionary = ref.dictionary;
    var i18n = ref.i18n;

    if (dictionary) {
      validator.localize(dictionary); // merge the dictionary.
    }

    var onLocaleChanged = function () {
      validator.errors.regenerate();
    };

    // watch locale changes using localVue instance or i18n.
    if (!i18n) {
      if (typeof window !== 'undefined') {
        localVue.$on('localeChanged', onLocaleChanged);
      }
    } else {
      i18n._vm.$watch('locale', onLocaleChanged);
    }

    if (!i18n && options.locale) {
      validator.localize(options.locale); // set the locale
    }

    Validator.setStrictMode(Config.current.strict);

    Vue.mixin(mixin);
    Vue.directive('validate', directive);
  }

  // 

  function use (plugin, options) {
    if ( options === void 0 ) options = {};

    if (!isCallable(plugin)) {
      return warn('The plugin must be a callable function');
    }

    plugin({ Validator: Validator, ErrorBag: ErrorBag, Rules: Validator.rules }, options);
  }

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

  var ErrorComponent = {
    name: 'vv-error',
    inject: ['$validator'],
    functional: true,
    props: {
      for: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        default: 'span'
      }
    },
    render: function render (createElement, ref) {
      var props = ref.props;
      var injections = ref.injections;

      return createElement(props.tag, injections.$validator.errors.first(props.for));
    }
  };

  var minimal = {
    install: install,
    use: use,
    directive: directive,
    mixin: mixin,
    mapFields: mapFields,
    Validator: Validator,
    ErrorBag: ErrorBag,
    ErrorComponent: ErrorComponent,
    version: '2.1.0-beta.6'
  };

  // rules plugin definition.
  var rulesPlugin = function (ref) {
    var Validator = ref.Validator;

    Object.keys(Rules).forEach(function (rule) {
      Validator.extend(rule, Rules[rule].validate, Rules[rule].options);
    });

    // Merge the english messages.
    Validator.localize('en', locale$1);
  };

  // install the rules via the plugin API.
  minimal.use(rulesPlugin);

  minimal.Rules = Rules;

  return minimal;

})));
