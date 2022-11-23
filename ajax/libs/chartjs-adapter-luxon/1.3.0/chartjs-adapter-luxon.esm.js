/*!
 * chartjs-adapter-luxon v1.3.0
 * https://www.chartjs.org
 * (c) 2022 chartjs-adapter-luxon Contributors
 * Released under the MIT license
 */
import { _adapters } from 'chart.js';
import { DateTime } from 'luxon';

const FORMATS = {
  datetime: DateTime.DATETIME_MED_WITH_SECONDS,
  millisecond: 'h:mm:ss.SSS a',
  second: DateTime.TIME_WITH_SECONDS,
  minute: DateTime.TIME_SIMPLE,
  hour: {hour: 'numeric'},
  day: {day: 'numeric', month: 'short'},
  week: 'DD',
  month: {month: 'short', year: 'numeric'},
  quarter: "'Q'q - yyyy",
  year: {year: 'numeric'}
};

_adapters._date.override({
  _id: 'luxon', // DEBUG

  /**
   * @private
   */
  _create: function(time) {
    return DateTime.fromMillis(time, this.options);
  },

  init(chartOptions) {
    if (!this.options.locale) {
      this.options.locale = chartOptions.locale;
    }
  },

  formats: function() {
    return FORMATS;
  },

  parse: function(value, format) {
    const options = this.options;

    const type = typeof value;
    if (value === null || type === 'undefined') {
      return null;
    }

    if (type === 'number') {
      value = this._create(value);
    } else if (type === 'string') {
      if (typeof format === 'string') {
        value = DateTime.fromFormat(value, format, options);
      } else {
        value = DateTime.fromISO(value, options);
      }
    } else if (value instanceof Date) {
      value = DateTime.fromJSDate(value, options);
    } else if (type === 'object' && !(value instanceof DateTime)) {
      value = DateTime.fromObject(value, options);
    }

    return value.isValid ? value.valueOf() : null;
  },

  format: function(time, format) {
    const datetime = this._create(time);
    return typeof format === 'string'
      ? datetime.toFormat(format)
      : datetime.toLocaleString(format);
  },

  add: function(time, amount, unit) {
    const args = {};
    args[unit] = amount;
    return this._create(time).plus(args).valueOf();
  },

  diff: function(max, min, unit) {
    return this._create(max).diff(this._create(min)).as(unit).valueOf();
  },

  startOf: function(time, unit, weekday) {
    if (unit === 'isoWeek') {
      weekday = Math.trunc(Math.min(Math.max(0, weekday), 6));
      const dateTime = this._create(time);
      return dateTime.minus({days: (dateTime.weekday - weekday + 7) % 7}).startOf('day').valueOf();
    }
    return unit ? this._create(time).startOf(unit).valueOf() : time;
  },

  endOf: function(time, unit) {
    return this._create(time).endOf(unit).valueOf();
  }
});
