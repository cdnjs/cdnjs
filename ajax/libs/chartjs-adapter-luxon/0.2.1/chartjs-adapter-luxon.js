/*!
 * chartjs-adapter-luxon v0.2.1
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('chart.js'), require('luxon')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'luxon'], factory) :
(global = global || self, factory(global.Chart, global.luxon));
}(this, (function (Chart, luxon) { 'use strict';

Chart = Chart && Object.prototype.hasOwnProperty.call(Chart, 'default') ? Chart['default'] : Chart;

const FORMATS = {
	datetime: luxon.DateTime.DATETIME_MED_WITH_SECONDS,
	millisecond: 'h:mm:ss.SSS a',
	second: luxon.DateTime.TIME_WITH_SECONDS,
	minute: luxon.DateTime.TIME_SIMPLE,
	hour: { hour: 'numeric' },
	day: { day: 'numeric', month: 'short' },
	week: 'DD',
	month: { month: 'short', year: 'numeric' },
	quarter: "'Q'q - yyyy",
	year: { year: 'numeric' }
};

Chart._adapters._date.override({
	_id: 'luxon', // DEBUG

	/**
	 * @private
	 */
	_create: function(time) {
		return luxon.DateTime.fromMillis(time, this.options);
	},

	formats: function() {
		return FORMATS;
	},

	parse: function(value, format) {
		const options = this.options;

		if (Chart.helpers.isNullOrUndef(value)) {
			return null;
		}

		const type = typeof value;
		if (type === 'number') {
			value = this._create(value);
		} else if (type === 'string') {
			if (typeof format === 'string') {
				value = luxon.DateTime.fromFormat(value, format, options);
			} else {
				value = luxon.DateTime.fromISO(value, options);
			}
		} else if (type === 'object' && !(value instanceof luxon.DateTime)) {
			value = luxon.DateTime.fromObject(value);
		} else if (value instanceof Date) {
			value = luxon.DateTime.fromJSDate(value, options);
		}

		return value.isValid ? value.valueOf() : null;
	},

	format: function(time, format) {
		const datetime = this._create(time);
		return typeof format === 'string'
			? datetime.toFormat(format, this.options)
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
			return this._create(time).isoWeekday(weekday).valueOf();
		}
		return unit ? this._create(time).startOf(unit).valueOf() : time;
	},

	endOf: function(time, unit) {
		return this._create(time).endOf(unit).valueOf();
	}
});

})));
