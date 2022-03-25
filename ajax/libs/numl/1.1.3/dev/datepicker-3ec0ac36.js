import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, a as space, b as set_custom_element_data, c as insert, d as append, f as detach, t as text, l as listen, g as set_data, r as run_all, h as empty, n as noop, j as destroy_each, k as createEventDispatcher, m as binding_callbacks } from './index-ed13919c.js';
import { L as isValidDate, K as setTransitionTimeout } from './index-e74c1c40.js';
import { r as requiredArgs, t as toDate, s as startOfDay } from './index-41de65a4.js';

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */

function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */

function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.

  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();

  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfWeek(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

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
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

var MILLISECONDS_IN_DAY = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */

function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 */

function isSameDay(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2))
 * //=> 3
 */

function getQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
}

// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.

function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full days according to the local timezone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
//=> 92
 */


function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastDayNotFull = Number(compareLocalAsc(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */

function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */

function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */

function startOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */

function startOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var cleanDate = toDate(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */

function endOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name endOfQuarter
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */

function endOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be after the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */

function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */

function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `isWithinRange` to `isWithinInterval`.
 *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
 *
 *   ```
 *   2.1.3
 *   time interval
 *   part of the time axis limited by two instants
 *   ```
 *
 *   Also, this function now accepts an object with `start` and `end` properties
 *   instead of two arguments as an interval.
 *   This function now throws `RangeError` if the start of the interval is after its end
 *   or if any date in the interval is `Invalid Date`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   isWithinRange(
 *     new Date(2014, 0, 3),
 *     new Date(2014, 0, 1), new Date(2014, 0, 7)
 *   )
 *
 *   // v2.0.0 onward
 *
 *   isWithinInterval(
 *     new Date(2014, 0, 3),
 *     { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) }
 *   )
 *   ```
 *
 * @param {Date|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date }) // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end }) // => true
 */
function isWithinInterval(dirtyDate, interval) {
  requiredArgs(2, arguments);
  var time = toDate(dirtyDate).getTime();
  var startTime = toDate(interval.start).getTime();
  var endTime = toDate(interval.end).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  return time >= startTime && time <= endTime;
}

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `max` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   var date1 = new Date(1989, 6, 10)
 *   var date2 = new Date(1987, 1, 11)
 *   var maxDate = max(date1, date2)
 *
 *   // v2.0.0 onward:
 *   var dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   var maxDate = max(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} the latest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */

function max(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if (typeof dirtyDatesArray === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = toDate(dirtyDate);

    if (result === undefined || result < currentDate || isNaN(Number(currentDate))) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}

/**
 * @name min
 * @category Common Helpers
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `min` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   const date1 = new Date(1989, 6, 10)
 *   const date2 = new Date(1987, 1, 11)
 *   const minDate = min(date1, date2)
 *
 *   // v2.0.0 onward:
 *   const dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   const minDate = min(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} - the earliest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */

function min(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if (typeof dirtyDatesArray === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = toDate(dirtyDate);

    if (result === undefined || result > currentDate || isNaN(currentDate.getDate())) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */

function setYear(dirtyDate, dirtyYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var year = toInteger(dirtyYear); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }

  date.setFullYear(year);
  return date;
}

/* src/components/datepicker.svelte generated by Svelte v3.38.2 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[60] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[63] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[66] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[69] = list[i];
	return child_ctx;
}

// (25:8) {#each months as month}
function create_each_block_3(ctx) {
	let nu_option;
	let nu_datetime;
	let nu_datetime_value_value;
	let t;
	let nu_option_value_value;
	let nu_option_disabled_value;

	return {
		c() {
			nu_option = element("nu-option");
			nu_datetime = element("nu-datetime");
			t = space();
			set_custom_element_data(nu_datetime, "month", "");
			set_custom_element_data(nu_datetime, "value", nu_datetime_value_value = /*month*/ ctx[69]);
			set_custom_element_data(nu_option, "value", nu_option_value_value = /*month*/ ctx[69]);

			set_custom_element_data(nu_option, "disabled", nu_option_disabled_value = !/*isMonthInRange*/ ctx[17](/*month*/ ctx[69], /*beginDate*/ ctx[2], /*endDate*/ ctx[3])
			? ""
			: undefined);
		},
		m(target, anchor) {
			insert(target, nu_option, anchor);
			append(nu_option, nu_datetime);
			append(nu_option, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*months*/ 256 && nu_datetime_value_value !== (nu_datetime_value_value = /*month*/ ctx[69])) {
				set_custom_element_data(nu_datetime, "value", nu_datetime_value_value);
			}

			if (dirty[0] & /*months*/ 256 && nu_option_value_value !== (nu_option_value_value = /*month*/ ctx[69])) {
				set_custom_element_data(nu_option, "value", nu_option_value_value);
			}

			if (dirty[0] & /*months, beginDate, endDate*/ 268 && nu_option_disabled_value !== (nu_option_disabled_value = !/*isMonthInRange*/ ctx[17](/*month*/ ctx[69], /*beginDate*/ ctx[2], /*endDate*/ ctx[3])
			? ""
			: undefined)) {
				set_custom_element_data(nu_option, "disabled", nu_option_disabled_value);
			}
		},
		d(detaching) {
			if (detaching) detach(nu_option);
		}
	};
}

// (42:8) {#each years as year}
function create_each_block_2(ctx) {
	let nu_option;
	let nu_datetime;
	let nu_datetime_value_value;
	let t;
	let nu_option_value_value;
	let nu_option_disabled_value;

	return {
		c() {
			nu_option = element("nu-option");
			nu_datetime = element("nu-datetime");
			t = space();
			set_custom_element_data(nu_datetime, "year", "");
			set_custom_element_data(nu_datetime, "value", nu_datetime_value_value = /*year*/ ctx[66]);
			set_custom_element_data(nu_option, "value", nu_option_value_value = /*year*/ ctx[66]);

			set_custom_element_data(nu_option, "disabled", nu_option_disabled_value = !/*isMonthInRange*/ ctx[17](/*year*/ ctx[66], /*beginDate*/ ctx[2], /*endDate*/ ctx[3])
			? ""
			: undefined);
		},
		m(target, anchor) {
			insert(target, nu_option, anchor);
			append(nu_option, nu_datetime);
			append(nu_option, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*years*/ 512 && nu_datetime_value_value !== (nu_datetime_value_value = /*year*/ ctx[66])) {
				set_custom_element_data(nu_datetime, "value", nu_datetime_value_value);
			}

			if (dirty[0] & /*years*/ 512 && nu_option_value_value !== (nu_option_value_value = /*year*/ ctx[66])) {
				set_custom_element_data(nu_option, "value", nu_option_value_value);
			}

			if (dirty[0] & /*years, beginDate, endDate*/ 524 && nu_option_disabled_value !== (nu_option_disabled_value = !/*isMonthInRange*/ ctx[17](/*year*/ ctx[66], /*beginDate*/ ctx[2], /*endDate*/ ctx[3])
			? ""
			: undefined)) {
				set_custom_element_data(nu_option, "disabled", nu_option_disabled_value);
			}
		},
		d(detaching) {
			if (detaching) detach(nu_option);
		}
	};
}

// (67:2) {#each weekDays as weekDay}
function create_each_block_1(ctx) {
	let nu_el;
	let nu_datetime;
	let nu_datetime_value_value;
	let t;

	return {
		c() {
			nu_el = element("nu-el");
			nu_datetime = element("nu-datetime");
			t = space();
			set_custom_element_data(nu_datetime, "weekday", "short");
			set_custom_element_data(nu_datetime, "value", nu_datetime_value_value = /*weekDay*/ ctx[63]);
			set_custom_element_data(nu_el, "id", "weekday");
		},
		m(target, anchor) {
			insert(target, nu_el, anchor);
			append(nu_el, nu_datetime);
			append(nu_el, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*weekDays*/ 1024 && nu_datetime_value_value !== (nu_datetime_value_value = /*weekDay*/ ctx[63])) {
				set_custom_element_data(nu_datetime, "value", nu_datetime_value_value);
			}
		},
		d(detaching) {
			if (detaching) detach(nu_el);
		}
	};
}

// (91:2) {#each monthDays as day}
function create_each_block(ctx) {
	let nu_btn;
	let t0_value = /*day*/ ctx[60].date.getDate() + "";
	let t0;
	let t1;
	let nu_btn_as_value;
	let mounted;
	let dispose;

	function tap_handler() {
		return /*tap_handler*/ ctx[43](/*day*/ ctx[60]);
	}

	function mouseover_handler() {
		return /*mouseover_handler*/ ctx[44](/*day*/ ctx[60]);
	}

	return {
		c() {
			nu_btn = element("nu-btn");
			t0 = text(t0_value);
			t1 = space();
			set_custom_element_data(nu_btn, "as", nu_btn_as_value = /*day*/ ctx[60].modifiers);
			set_custom_element_data(nu_btn, "padding", ".5x 1x");
		},
		m(target, anchor) {
			insert(target, nu_btn, anchor);
			append(nu_btn, t0);
			append(nu_btn, t1);

			if (!mounted) {
				dispose = [
					listen(nu_btn, "tap", tap_handler),
					listen(nu_btn, "mouseover", mouseover_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*monthDays*/ 16 && t0_value !== (t0_value = /*day*/ ctx[60].date.getDate() + "")) set_data(t0, t0_value);

			if (dirty[0] & /*monthDays*/ 16 && nu_btn_as_value !== (nu_btn_as_value = /*day*/ ctx[60].modifiers)) {
				set_custom_element_data(nu_btn, "as", nu_btn_as_value);
			}
		},
		d(detaching) {
			if (detaching) detach(nu_btn);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (103:0) {#if isRange}
function create_if_block(ctx) {
	let nu_flex;
	let nu_attrs;
	let t0;
	let nu_btn0;
	let nu_datetime0;
	let t1;
	let nu_btn1;
	let t2;
	let t3;
	let t4;
	let nu_datetime1;
	let t5;
	let nu_btn2;
	let nu_datetime2;
	let mounted;
	let dispose;

	return {
		c() {
			nu_flex = element("nu-flex");
			nu_attrs = element("nu-attrs");
			t0 = space();
			nu_btn0 = element("nu-btn");
			nu_datetime0 = element("nu-datetime");
			t1 = space();
			nu_btn1 = element("nu-btn");
			t2 = text("Q");
			t3 = text(/*navQuater*/ ctx[7]);
			t4 = space();
			nu_datetime1 = element("nu-datetime");
			t5 = space();
			nu_btn2 = element("nu-btn");
			nu_datetime2 = element("nu-datetime");
			set_custom_element_data(nu_attrs, "for", "nu-btn");
			set_custom_element_data(nu_attrs, "special", "");
			set_custom_element_data(nu_attrs, "padding", "");
			set_custom_element_data(nu_datetime0, "year", "");
			set_custom_element_data(nu_datetime0, "value", /*navDate*/ ctx[0]);
			set_custom_element_data(nu_datetime1, "year", "");
			set_custom_element_data(nu_datetime1, "value", /*navDate*/ ctx[0]);
			set_custom_element_data(nu_datetime2, "year", "");
			set_custom_element_data(nu_datetime2, "month", "short");
			set_custom_element_data(nu_datetime2, "value", /*navDate*/ ctx[0]);
			set_custom_element_data(nu_flex, "gap", "");
			set_custom_element_data(nu_flex, "size", "xs");
		},
		m(target, anchor) {
			insert(target, nu_flex, anchor);
			append(nu_flex, nu_attrs);
			append(nu_flex, t0);
			append(nu_flex, nu_btn0);
			append(nu_btn0, nu_datetime0);
			append(nu_flex, t1);
			append(nu_flex, nu_btn1);
			append(nu_btn1, t2);
			append(nu_btn1, t3);
			append(nu_btn1, t4);
			append(nu_btn1, nu_datetime1);
			append(nu_flex, t5);
			append(nu_flex, nu_btn2);
			append(nu_btn2, nu_datetime2);

			if (!mounted) {
				dispose = [
					listen(nu_btn0, "tap", /*tap_handler_1*/ ctx[45]),
					listen(nu_btn1, "tap", /*tap_handler_2*/ ctx[46]),
					listen(nu_btn2, "tap", /*tap_handler_3*/ ctx[47])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*navDate*/ 1) {
				set_custom_element_data(nu_datetime0, "value", /*navDate*/ ctx[0]);
			}

			if (dirty[0] & /*navQuater*/ 128) set_data(t3, /*navQuater*/ ctx[7]);

			if (dirty[0] & /*navDate*/ 1) {
				set_custom_element_data(nu_datetime1, "value", /*navDate*/ ctx[0]);
			}

			if (dirty[0] & /*navDate*/ 1) {
				set_custom_element_data(nu_datetime2, "value", /*navDate*/ ctx[0]);
			}
		},
		d(detaching) {
			if (detaching) detach(nu_flex);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment(ctx) {
	let nu_pane2;
	let nu_attrs0;
	let t0;
	let nu_attrs1;
	let t1;
	let nu_attrs2;
	let t2;
	let nu_attrs3;
	let t3;
	let nu_pane0;
	let nu_btn0;
	let nu_datetime0;
	let t4;
	let nu_icon0;
	let t5;
	let nu_popuplistbox0;
	let t6;
	let nu_btn1;
	let nu_datetime1;
	let t7;
	let nu_icon1;
	let t8;
	let nu_popuplistbox1;
	let t9;
	let nu_pane1;
	let nu_btn2;
	let nu_icon2;
	let nu_btn2_disabled_value;
	let t10;
	let nu_btn3;
	let nu_icon3;
	let nu_btn3_disabled_value;
	let t11;
	let nu_grid0;
	let nu_attrs4;
	let t12;
	let t13;
	let nu_grid1;
	let nu_attrs5;
	let nu_attrs5_radius_value;
	let t14;
	let nu_attrs6;
	let t15;
	let nu_attrs7;
	let t16;
	let nu_attrs8;
	let t17;
	let nu_attrs9;
	let t18;
	let nu_attrs10;
	let t19;
	let nu_attrs11;
	let t20;
	let nu_attrs12;
	let nu_attrs12_radius_value;
	let t21;
	let nu_attrs13;
	let t22;
	let t23;
	let if_block_anchor;
	let mounted;
	let dispose;
	let each_value_3 = /*months*/ ctx[8];
	let each_blocks_3 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_3[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	let each_value_2 = /*years*/ ctx[9];
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value_1 = /*weekDays*/ ctx[10];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_value = /*monthDays*/ ctx[4];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block = /*isRange*/ ctx[1] && create_if_block(ctx);

	return {
		c() {
			nu_pane2 = element("nu-pane");
			nu_attrs0 = element("nu-attrs");
			t0 = space();
			nu_attrs1 = element("nu-attrs");
			t1 = space();
			nu_attrs2 = element("nu-attrs");
			t2 = space();
			nu_attrs3 = element("nu-attrs");
			t3 = space();
			nu_pane0 = element("nu-pane");
			nu_btn0 = element("nu-btn");
			nu_datetime0 = element("nu-datetime");
			t4 = space();
			nu_icon0 = element("nu-icon");
			t5 = space();
			nu_popuplistbox0 = element("nu-popuplistbox");

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].c();
			}

			t6 = space();
			nu_btn1 = element("nu-btn");
			nu_datetime1 = element("nu-datetime");
			t7 = space();
			nu_icon1 = element("nu-icon");
			t8 = space();
			nu_popuplistbox1 = element("nu-popuplistbox");

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t9 = space();
			nu_pane1 = element("nu-pane");
			nu_btn2 = element("nu-btn");
			nu_icon2 = element("nu-icon");
			t10 = space();
			nu_btn3 = element("nu-btn");
			nu_icon3 = element("nu-icon");
			t11 = space();
			nu_grid0 = element("nu-grid");
			nu_attrs4 = element("nu-attrs");
			t12 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t13 = space();
			nu_grid1 = element("nu-grid");
			nu_attrs5 = element("nu-attrs");
			t14 = space();
			nu_attrs6 = element("nu-attrs");
			t15 = space();
			nu_attrs7 = element("nu-attrs");
			t16 = space();
			nu_attrs8 = element("nu-attrs");
			t17 = space();
			nu_attrs9 = element("nu-attrs");
			t18 = space();
			nu_attrs10 = element("nu-attrs");
			t19 = space();
			nu_attrs11 = element("nu-attrs");
			t20 = space();
			nu_attrs12 = element("nu-attrs");
			t21 = space();
			nu_attrs13 = element("nu-attrs");
			t22 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t23 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			set_custom_element_data(nu_attrs0, "for", "arrow");
			set_custom_element_data(nu_attrs0, "radius", "round");
			set_custom_element_data(nu_attrs0, "padding", "0.5x .5x");
			set_custom_element_data(nu_attrs0, "special", "");
			set_custom_element_data(nu_attrs0, "border", "#special-bg");
			set_custom_element_data(nu_attrs1, "for", "dropdown-icon");
			set_custom_element_data(nu_attrs1, "name", "chevron-down");
			set_custom_element_data(nu_attrs1, "scale", "^:pressed[flip-y]");
			set_custom_element_data(nu_attrs1, "place", "right");
			set_custom_element_data(nu_attrs1, "height", "100%");
			set_custom_element_data(nu_attrs1, "size", "1em");
			set_custom_element_data(nu_attrs2, "for", "dropdown");
			set_custom_element_data(nu_attrs2, "size", "lg");
			set_custom_element_data(nu_attrs2, "text", "sb center");
			set_custom_element_data(nu_attrs2, "content", "stretch");
			set_custom_element_data(nu_attrs2, "columns", "1fr 1.5x");
			set_custom_element_data(nu_attrs2, "padding", ".25x .25x .25x .75x");
			set_custom_element_data(nu_attrs2, "grow", "1");
			set_custom_element_data(nu_attrs3, "for", "option");
			set_custom_element_data(nu_attrs3, "padding", "1x");
			set_custom_element_data(nu_attrs3, "content", "center");
			set_custom_element_data(nu_datetime0, "month", "short");
			set_custom_element_data(nu_datetime0, "value", /*navDate*/ ctx[0]);
			set_custom_element_data(nu_icon0, "id", "dropdown-icon");
			set_custom_element_data(nu_popuplistbox0, "height", "28x");
			set_custom_element_data(nu_popuplistbox0, "size", "md");
			set_custom_element_data(nu_btn0, "id", "dropdown");
			set_custom_element_data(nu_btn0, "type", "date");
			set_custom_element_data(nu_btn0, "clear", "");
			set_custom_element_data(nu_btn0, "value", /*navDate*/ ctx[0]);
			set_custom_element_data(nu_datetime1, "year", "");
			set_custom_element_data(nu_datetime1, "value", /*navDate*/ ctx[0]);
			set_custom_element_data(nu_icon1, "id", "dropdown-icon");
			set_custom_element_data(nu_popuplistbox1, "height", "28x");
			set_custom_element_data(nu_popuplistbox1, "size", "md");
			set_custom_element_data(nu_btn1, "id", "dropdown");
			set_custom_element_data(nu_btn1, "type", "date");
			set_custom_element_data(nu_btn1, "clear", "");
			set_custom_element_data(nu_btn1, "value", /*navDate*/ ctx[0]);
			set_custom_element_data(nu_icon2, "name", "chevron-left chevron-back-outline");
			set_custom_element_data(nu_icon2, "size", "1.25em");
			set_custom_element_data(nu_icon2, "move", "-.125x 0");
			set_custom_element_data(nu_btn2, "id", "arrow");
			set_custom_element_data(nu_btn2, "disabled", nu_btn2_disabled_value = /*havePrevMonth*/ ctx[12] ? undefined : "");
			set_custom_element_data(nu_icon3, "name", "chevron-right chevron-forward-outline");
			set_custom_element_data(nu_icon3, "size", "1.25em");
			set_custom_element_data(nu_icon3, "move", ".125x 0");
			set_custom_element_data(nu_btn3, "id", "arrow");
			set_custom_element_data(nu_btn3, "disabled", nu_btn3_disabled_value = /*haveNextMonth*/ ctx[11] ? undefined : "");
			set_custom_element_data(nu_pane2, "content", "space-between");
			set_custom_element_data(nu_attrs4, "for", "weekday");
			set_custom_element_data(nu_attrs4, "text", "h");
			set_custom_element_data(nu_attrs4, "size", "xs");
			set_custom_element_data(nu_grid0, "columns", "repeat(7, 1fr)");
			set_custom_element_data(nu_grid0, "text", "center");
			set_custom_element_data(nu_grid0, "color", "text 80%");
			set_custom_element_data(nu_attrs5, "for", "day");
			set_custom_element_data(nu_attrs5, "fill", "clear");

			set_custom_element_data(nu_attrs5, "radius", nu_attrs5_radius_value = /*isRange*/ ctx[1]
			? "1r :hover[1r 0 0 1r]"
			: "1r :hover[1r]");

			set_custom_element_data(nu_attrs5, "text", "n");
			set_custom_element_data(nu_attrs5, "inset", "#clear :active[#shadow.50]");
			set_custom_element_data(nu_attrs5, "border", "n");
			set_custom_element_data(nu_attrs5, "focus", "inset");
			set_custom_element_data(nu_attrs6, "for", "today");
			set_custom_element_data(nu_attrs6, "text", "h");
			set_custom_element_data(nu_attrs6, "color", "special");
			set_custom_element_data(nu_attrs6, "inset", "0 0 0 1bw #border :active[#shadow.50]");
			set_custom_element_data(nu_attrs7, "for", "other-month");
			set_custom_element_data(nu_attrs7, "color", "text 50% :hover[text]");
			set_custom_element_data(nu_attrs8, "for", "disabled");
			set_custom_element_data(nu_attrs8, "disabled", "");
			set_custom_element_data(nu_attrs8, "color", "text 50%");
			set_custom_element_data(nu_attrs9, "for", "start");
			set_custom_element_data(nu_attrs9, "special", "");
			set_custom_element_data(nu_attrs9, "fill", "special-bg");
			set_custom_element_data(nu_attrs9, "color", "");
			set_custom_element_data(nu_attrs9, "radius", "1r 0 0 1r");
			set_custom_element_data(nu_attrs10, "for", "end");
			set_custom_element_data(nu_attrs10, "radius", "0r 1r 1r 0r :hover[1r 0 0 1r]");
			set_custom_element_data(nu_attrs10, "special", "");
			set_custom_element_data(nu_attrs10, "fill", "special-bg");
			set_custom_element_data(nu_attrs10, "color", "");
			set_custom_element_data(nu_attrs11, "for", "selected");
			set_custom_element_data(nu_attrs11, "radius", "");
			set_custom_element_data(nu_attrs11, "special", "");
			set_custom_element_data(nu_attrs11, "fill", "special-bg");
			set_custom_element_data(nu_attrs11, "color", "special-text");
			set_custom_element_data(nu_attrs12, "for", "range");
			set_custom_element_data(nu_attrs12, "radius", nu_attrs12_radius_value = /*isRange*/ ctx[1] ? "0 :hover[0 1r 1r 0]" : "1r");
			set_custom_element_data(nu_attrs12, "fill", "special-bg 25%");
			set_custom_element_data(nu_attrs12, "color", "text");
			set_custom_element_data(nu_attrs12, "border", "0 0 0 1bw #bg");
			set_custom_element_data(nu_attrs13, "for", "range-inside");
			set_custom_element_data(nu_attrs13, "radius", "0 :hover[1r 0 0 1r]");
			set_custom_element_data(nu_attrs13, "fill", "special-bg 25%");
			set_custom_element_data(nu_attrs13, "color", "text");
			set_custom_element_data(nu_attrs13, "border", "0 0 0 1bw #bg");
			set_custom_element_data(nu_grid1, "columns", "repeat(7, 1fr)");
			set_custom_element_data(nu_grid1, "content", "start stretch");
			set_custom_element_data(nu_grid1, "text", "center");
			set_custom_element_data(nu_grid1, "gap", "1bw");
		},
		m(target, anchor) {
			insert(target, nu_pane2, anchor);
			append(nu_pane2, nu_attrs0);
			append(nu_pane2, t0);
			append(nu_pane2, nu_attrs1);
			append(nu_pane2, t1);
			append(nu_pane2, nu_attrs2);
			append(nu_pane2, t2);
			append(nu_pane2, nu_attrs3);
			append(nu_pane2, t3);
			append(nu_pane2, nu_pane0);
			append(nu_pane0, nu_btn0);
			append(nu_btn0, nu_datetime0);
			append(nu_btn0, t4);
			append(nu_btn0, nu_icon0);
			append(nu_btn0, t5);
			append(nu_btn0, nu_popuplistbox0);

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].m(nu_popuplistbox0, null);
			}

			/*nu_popuplistbox0_binding*/ ctx[39](nu_popuplistbox0);
			append(nu_pane0, t6);
			append(nu_pane0, nu_btn1);
			append(nu_btn1, nu_datetime1);
			append(nu_btn1, t7);
			append(nu_btn1, nu_icon1);
			append(nu_btn1, t8);
			append(nu_btn1, nu_popuplistbox1);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].m(nu_popuplistbox1, null);
			}

			/*nu_popuplistbox1_binding*/ ctx[41](nu_popuplistbox1);
			append(nu_pane2, t9);
			append(nu_pane2, nu_pane1);
			append(nu_pane1, nu_btn2);
			append(nu_btn2, nu_icon2);
			append(nu_pane1, t10);
			append(nu_pane1, nu_btn3);
			append(nu_btn3, nu_icon3);
			insert(target, t11, anchor);
			insert(target, nu_grid0, anchor);
			append(nu_grid0, nu_attrs4);
			append(nu_grid0, t12);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(nu_grid0, null);
			}

			insert(target, t13, anchor);
			insert(target, nu_grid1, anchor);
			append(nu_grid1, nu_attrs5);
			append(nu_grid1, t14);
			append(nu_grid1, nu_attrs6);
			append(nu_grid1, t15);
			append(nu_grid1, nu_attrs7);
			append(nu_grid1, t16);
			append(nu_grid1, nu_attrs8);
			append(nu_grid1, t17);
			append(nu_grid1, nu_attrs9);
			append(nu_grid1, t18);
			append(nu_grid1, nu_attrs10);
			append(nu_grid1, t19);
			append(nu_grid1, nu_attrs11);
			append(nu_grid1, t20);
			append(nu_grid1, nu_attrs12);
			append(nu_grid1, t21);
			append(nu_grid1, nu_attrs13);
			append(nu_grid1, t22);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(nu_grid1, null);
			}

			insert(target, t23, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);

			if (!mounted) {
				dispose = [
					listen(nu_btn0, "tap", /*toggle*/ ctx[22]),
					listen(nu_btn0, "input", /*input_handler*/ ctx[40]),
					listen(nu_btn1, "input", /*input_handler_1*/ ctx[42]),
					listen(nu_btn2, "tap", /*prevMonth*/ ctx[19]),
					listen(nu_btn3, "tap", /*nextMonth*/ ctx[18]),
					listen(nu_pane2, "focusin", /*touch*/ ctx[16])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*navDate*/ 1) {
				set_custom_element_data(nu_datetime0, "value", /*navDate*/ ctx[0]);
			}

			if (dirty[0] & /*months, isMonthInRange, beginDate, endDate*/ 131340) {
				each_value_3 = /*months*/ ctx[8];
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks_3[i]) {
						each_blocks_3[i].p(child_ctx, dirty);
					} else {
						each_blocks_3[i] = create_each_block_3(child_ctx);
						each_blocks_3[i].c();
						each_blocks_3[i].m(nu_popuplistbox0, null);
					}
				}

				for (; i < each_blocks_3.length; i += 1) {
					each_blocks_3[i].d(1);
				}

				each_blocks_3.length = each_value_3.length;
			}

			if (dirty[0] & /*navDate*/ 1) {
				set_custom_element_data(nu_btn0, "value", /*navDate*/ ctx[0]);
			}

			if (dirty[0] & /*navDate*/ 1) {
				set_custom_element_data(nu_datetime1, "value", /*navDate*/ ctx[0]);
			}

			if (dirty[0] & /*years, isMonthInRange, beginDate, endDate*/ 131596) {
				each_value_2 = /*years*/ ctx[9];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_2(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(nu_popuplistbox1, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_2.length;
			}

			if (dirty[0] & /*navDate*/ 1) {
				set_custom_element_data(nu_btn1, "value", /*navDate*/ ctx[0]);
			}

			if (dirty[0] & /*havePrevMonth*/ 4096 && nu_btn2_disabled_value !== (nu_btn2_disabled_value = /*havePrevMonth*/ ctx[12] ? undefined : "")) {
				set_custom_element_data(nu_btn2, "disabled", nu_btn2_disabled_value);
			}

			if (dirty[0] & /*haveNextMonth*/ 2048 && nu_btn3_disabled_value !== (nu_btn3_disabled_value = /*haveNextMonth*/ ctx[11] ? undefined : "")) {
				set_custom_element_data(nu_btn3, "disabled", nu_btn3_disabled_value);
			}

			if (dirty[0] & /*weekDays*/ 1024) {
				each_value_1 = /*weekDays*/ ctx[10];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(nu_grid0, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty[0] & /*isRange*/ 2 && nu_attrs5_radius_value !== (nu_attrs5_radius_value = /*isRange*/ ctx[1]
			? "1r :hover[1r 0 0 1r]"
			: "1r :hover[1r]")) {
				set_custom_element_data(nu_attrs5, "radius", nu_attrs5_radius_value);
			}

			if (dirty[0] & /*isRange*/ 2 && nu_attrs12_radius_value !== (nu_attrs12_radius_value = /*isRange*/ ctx[1] ? "0 :hover[0 1r 1r 0]" : "1r")) {
				set_custom_element_data(nu_attrs12, "radius", nu_attrs12_radius_value);
			}

			if (dirty[0] & /*monthDays, selectRange, setHover*/ 3145744) {
				each_value = /*monthDays*/ ctx[4];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(nu_grid1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*isRange*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(nu_pane2);
			destroy_each(each_blocks_3, detaching);
			/*nu_popuplistbox0_binding*/ ctx[39](null);
			destroy_each(each_blocks_2, detaching);
			/*nu_popuplistbox1_binding*/ ctx[41](null);
			if (detaching) detach(t11);
			if (detaching) detach(nu_grid0);
			destroy_each(each_blocks_1, detaching);
			if (detaching) detach(t13);
			if (detaching) detach(nu_grid1);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t23);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
			mounted = false;
			run_all(dispose);
		}
	};
}

const props = ["value", "locale", "begin", "end", "mode"];

function weekStart(region) {
	if (("AEAFBHDJDZEGIQIRJOKWLYOMQASDSY").match(/../g).includes(region)) {
		return 6;
	}

	if (("AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW").match(/../g).includes(region)) {
		return 0;
	}

	return 1;
}

function decodeLocale(locale) {
	return locale.match(/^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|\d{3})(?=$|[_-]+))?/);
}

function instance($$self, $$props, $$invalidate) {
	let isRange;
	let navQuater;
	let navMonthStartDate;
	let navMonthEndDate;
	let weekStartDate;
	let navStartDate;
	let navEndDate;
	let beginDate;
	let endDate;
	let monthDays;
	let months;
	let years;
	let weekDays;
	let haveNextMonth;
	let havePrevMonth;
	let yearRange;
	let quaterRange;
	let monthRange;
	let { value } = $$props;
	let { locale } = $$props;
	let { begin } = $$props;
	let { end } = $$props;
	let { mode } = $$props;
	let { host } = $$props;
	const dispatch = createEventDispatcher();

	function touch() {
		setTransitionTimeout(host, () => {
			$$invalidate(33, touched = true);
		});
	}

	let fromDate = value && startOfDay(Array.isArray(value)
	? value[0]
	: new Date(String(value).split(",")[0]));

	let toDate = value && startOfDay(Array.isArray(value)
	? value[1] || value[0]
	: new Date(String(value).split(",")[1] || String(value).split(",")[0]));

	if (!isValidDate(fromDate)) {
		fromDate = null;
	}

	if (!isValidDate(toDate)) {
		toDate = null;
	}

	if (mode === "range" && (fromDate && !toDate) || toDate && !fromDate) {
		fromDate = null;
		toDate = null;
	}

	let navDate = startOfMonth(toDate || new Date());
	let hoverDate;
	let todayDate = new Date();
	let yearPopup;
	let monthPopup;
	let touched = false;

	function isMonthInRange(monthDate, beginDate, endDate) {
		const monthBeginDate = startOfMonth(beginDate);
		const monthEndDate = endOfMonth(endDate);
		return isWithinInterval(monthDate, { start: monthBeginDate, end: monthEndDate });
	}

	function isYearInRange(yearDate, beginDate, endDate) {
		const yearBeginDate = startOfYear(beginDate);
		const yearEndDate = endOfYear(endDate);
		return isWithinInterval(yearDate, { start: yearBeginDate, end: yearEndDate });
	}

	function nextMonth() {
		$$invalidate(0, navDate = addMonths(navDate, 1));
	}

	function prevMonth() {
		$$invalidate(0, navDate = addMonths(navDate, -1));
	}

	function getDayModifiers(
		date,
	navMonthStartDate,
	navMonthEndDate,
	fromDate,
	toDate,
	hoverDate,
	beginDate,
	endDate
	) {
		const mods = ["day"];
		const rangeMod = fromDate && toDate ? "range-inside" : "range";

		if (isBefore(date, navMonthStartDate) || isAfter(date, navMonthEndDate)) {
			mods.push("other-month");
		}

		if (isSameDay(date, todayDate)) {
			mods.push("today");
		}

		if (!isWithinInterval(date, { start: beginDate, end: endDate })) {
			mods.push("disabled");
			return mods.join(" ");
		}

		if (fromDate && isSameDay(date, fromDate)) {
			mods.push("start");
		}

		if (toDate && isSameDay(date, toDate)) {
			mods.push("end");
		}

		if (isSameDay(date, fromDate) && isSameDay(fromDate, toDate)) {
			mods.push("selected");
		}

		if (fromDate && toDate && isAfter(date, fromDate) && isBefore(date, toDate)) {
			mods.push(rangeMod);
		} else if (fromDate && !toDate && isAfter(date, fromDate) && (isBefore(date, hoverDate) || isSameDay(date, hoverDate))) {
			mods.push(rangeMod);
		}

		return mods.join(" ");
	}

	function selectRange(date) {
		if (isRange) {
			if (fromDate && !toDate && (isAfter(date, fromDate) || isSameDay(date, fromDate))) {
				$$invalidate(31, toDate = date);
				dispatch("input", [fromDate, toDate]);
			} else {
				$$invalidate(30, fromDate = date);
				$$invalidate(31, toDate = null);
			}
		} else {
			$$invalidate(30, fromDate = date);
			$$invalidate(31, toDate = date);
			dispatch("input", date);
		}
	}

	function setHover(date) {
		$$invalidate(32, hoverDate = date);
	}

	function toggle() {
		$$invalidate(33, touched = true);
	}

	function setRange(range) {
		$$invalidate(30, fromDate = startOfDay(range[0]));
		$$invalidate(31, toDate = startOfDay(range[1]));
		dispatch("input", range);
	}

	function nu_popuplistbox0_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			monthPopup = $$value;
			$$invalidate(6, monthPopup);
		});
	}

	const input_handler = event => $$invalidate(0, navDate = event.detail);

	function nu_popuplistbox1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			yearPopup = $$value;
			$$invalidate(5, yearPopup);
		});
	}

	const input_handler_1 = event => $$invalidate(0, navDate = event.detail);
	const tap_handler = day => selectRange(day.date);
	const mouseover_handler = day => setHover(day.date);
	const tap_handler_1 = () => setRange(yearRange);
	const tap_handler_2 = () => setRange(quaterRange);
	const tap_handler_3 = () => setRange(monthRange);

	$$self.$$set = $$props => {
		if ("value" in $$props) $$invalidate(24, value = $$props.value);
		if ("locale" in $$props) $$invalidate(25, locale = $$props.locale);
		if ("begin" in $$props) $$invalidate(26, begin = $$props.begin);
		if ("end" in $$props) $$invalidate(27, end = $$props.end);
		if ("mode" in $$props) $$invalidate(28, mode = $$props.mode);
		if ("host" in $$props) $$invalidate(29, host = $$props.host);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*mode*/ 268435456) {
			$$invalidate(1, isRange = mode === "range");
		}

		if ($$self.$$.dirty[0] & /*navDate*/ 1) {
			setYear(new Date(navDate), todayDate.getFullYear());
		}

		if ($$self.$$.dirty[0] & /*host, isRange*/ 536870914) {
			host.setAttribute("type", isRange ? "daterange" : "date");
		}

		if ($$self.$$.dirty[0] & /*navDate*/ 1) {
			$$invalidate(7, navQuater = getQuarter(navDate));
		}

		if ($$self.$$.dirty[0] & /*navDate*/ 1) {
			$$invalidate(34, navMonthStartDate = navDate);
		}

		if ($$self.$$.dirty[0] & /*navDate*/ 1) {
			$$invalidate(35, navMonthEndDate = endOfMonth(navDate));
		}

		if ($$self.$$.dirty[0] & /*locale*/ 33554432) {
			$$invalidate(36, weekStartDate = weekStart(decodeLocale(locale)[4]));
		}

		if ($$self.$$.dirty[0] & /*navDate*/ 1 | $$self.$$.dirty[1] & /*weekStartDate*/ 32) {
			$$invalidate(37, navStartDate = startOfWeek(navDate, { weekStartsOn: weekStartDate }));
		}

		if ($$self.$$.dirty[1] & /*navMonthEndDate, weekStartDate, navStartDate*/ 112) {
			$$invalidate(38, navEndDate = (() => {
				let dt = endOfWeek(navMonthEndDate, { weekStartsOn: weekStartDate });

				while (differenceInDays(dt, navStartDate) < 41) {
					dt = addDays(dt, 7);
				}

				return dt;
			})());
		}

		if ($$self.$$.dirty[0] & /*begin*/ 67108864) {
			$$invalidate(2, beginDate = (() => {
				let date;

				if (begin) {
					date = startOfDay(new Date(begin));

					if (begin === "today" || begin === "now" || isAfter(date, todayDate)) {
						return todayDate;
					}

					return date;
				}

				return addYears(todayDate, -10);
			})());
		}

		if ($$self.$$.dirty[0] & /*end, beginDate*/ 134217732) {
			$$invalidate(3, endDate = (() => {
				let date;

				if (end) {
					date = endOfDay(new Date(end));

					if (end === "today" || end === "now" || isBefore(date, beginDate)) {
						return todayDate;
					}

					return date;
				}

				return addYears(todayDate, 10);
			})());
		}

		if ($$self.$$.dirty[0] & /*fromDate, beginDate, endDate*/ 1073741836 | $$self.$$.dirty[1] & /*navStartDate, navEndDate, navMonthStartDate, navMonthEndDate, toDate, hoverDate*/ 219) {
			$$invalidate(4, monthDays = (() => {
				let arr = [];
				let date = navStartDate;

				while (isBefore(date, navEndDate)) {
					arr.push({
						date,
						modifiers: getDayModifiers(date, navMonthStartDate, navMonthEndDate, fromDate, toDate, hoverDate, beginDate, endDate)
					});

					date = addDays(date, 1);
				}

				return arr;
			})());
		}

		if ($$self.$$.dirty[0] & /*navDate*/ 1) {
			startOfYear(navDate);
		}

		if ($$self.$$.dirty[0] & /*navDate*/ 1 | $$self.$$.dirty[1] & /*touched*/ 4) {
			$$invalidate(8, months = touched
			? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
					return addMonths(startOfYear(navDate), i);
				})
			: []);
		}

		if ($$self.$$.dirty[0] & /*beginDate, endDate, navDate*/ 13 | $$self.$$.dirty[1] & /*touched*/ 4) {
			$$invalidate(9, years = (() => {
				if (!touched) return [];
				const list = [];
				const startYear = beginDate.getFullYear();
				const endYear = endDate.getFullYear();

				for (let i = 0; i <= endYear - startYear; i++) {
					list.push(setYear(navDate, startYear + i));
				}

				return list;
			})());
		}

		if ($$self.$$.dirty[0] & /*monthDays*/ 16) {
			$$invalidate(10, weekDays = monthDays.slice(0, 7).map(day => day.date));
		}

		if ($$self.$$.dirty[0] & /*navDate, locale*/ 33554433) {
			navDate.toLocaleString(locale, { year: "numeric" });
		}

		if ($$self.$$.dirty[0] & /*navDate, locale*/ 33554433) {
			navDate.toLocaleString(locale, { month: "short" });
		}

		if ($$self.$$.dirty[0] & /*navDate, beginDate, endDate*/ 13) {
			$$invalidate(11, haveNextMonth = isMonthInRange(addMonths(navDate, 1), beginDate, endDate));
		}

		if ($$self.$$.dirty[0] & /*navDate, beginDate, endDate*/ 13) {
			$$invalidate(12, havePrevMonth = isMonthInRange(addMonths(navDate, -1), beginDate, endDate));
		}

		if ($$self.$$.dirty[0] & /*navDate, beginDate, endDate*/ 13) {
			isYearInRange(addYears(navDate, 1), beginDate, endDate);
		}

		if ($$self.$$.dirty[0] & /*navDate, beginDate, endDate*/ 13) {
			isYearInRange(addYears(navDate, -1), beginDate, endDate);
		}

		if ($$self.$$.dirty[0] & /*beginDate, navDate, endDate*/ 13) {
			$$invalidate(13, yearRange = (() => {
				return [
					max([beginDate, startOfYear(navDate)]),
					min([endDate, endOfYear(navDate)])
				];
			})());
		}

		if ($$self.$$.dirty[0] & /*beginDate, navDate, endDate*/ 13) {
			$$invalidate(14, quaterRange = (() => {
				return [
					max([beginDate, startOfQuarter(navDate)]),
					min([endDate, endOfQuarter(navDate)])
				];
			})());
		}

		if ($$self.$$.dirty[0] & /*beginDate, navDate, endDate*/ 13) {
			$$invalidate(15, monthRange = (() => {
				return [
					max([beginDate, startOfMonth(navDate)]),
					min([endDate, endOfMonth(navDate)])
				];
			})());
		}
	};

	return [
		navDate,
		isRange,
		beginDate,
		endDate,
		monthDays,
		yearPopup,
		monthPopup,
		navQuater,
		months,
		years,
		weekDays,
		haveNextMonth,
		havePrevMonth,
		yearRange,
		quaterRange,
		monthRange,
		touch,
		isMonthInRange,
		nextMonth,
		prevMonth,
		selectRange,
		setHover,
		toggle,
		setRange,
		value,
		locale,
		begin,
		end,
		mode,
		host,
		fromDate,
		toDate,
		hoverDate,
		touched,
		navMonthStartDate,
		navMonthEndDate,
		weekStartDate,
		navStartDate,
		navEndDate,
		nu_popuplistbox0_binding,
		input_handler,
		nu_popuplistbox1_binding,
		input_handler_1,
		tap_handler,
		mouseover_handler,
		tap_handler_1,
		tap_handler_2,
		tap_handler_3
	];
}

class Datepicker extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				value: 24,
				locale: 25,
				begin: 26,
				end: 27,
				mode: 28,
				host: 29
			},
			[-1, -1, -1]
		);
	}
}

export default Datepicker;
export { props };
