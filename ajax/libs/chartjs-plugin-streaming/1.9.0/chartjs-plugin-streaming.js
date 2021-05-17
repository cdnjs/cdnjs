/*!
 * chartjs-plugin-streaming v1.9.0
 * https://nagix.github.io/chartjs-plugin-streaming
 * (c) 2017-2021 Akihiko Kusanagi
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('moment')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'moment'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ChartStreaming = factory(global.Chart, global.moment));
}(this, (function (Chart, moment) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Chart__default = /*#__PURE__*/_interopDefaultLegacy(Chart);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var helpers$3 = Chart__default['default'].helpers;

var cancelAnimFrame = (function() {
	if (typeof window !== 'undefined') {
		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			function(id) {
				return window.clearTimeout(id);
			};
	}
}());

var StreamingHelper = {

	resolveOption(scale, key) {
		var realtimeOpts = scale.options.realtime;
		var streamingOpts = scale.chart.options.plugins.streaming;
		return helpers$3.valueOrDefault(realtimeOpts[key], streamingOpts[key]);
	},

	startFrameRefreshTimer: function(context, func) {
		if (!context.frameRequestID) {
			var frameRefresh = function() {
				func();
				context.frameRequestID = helpers$3.requestAnimFrame.call(window, frameRefresh);
			};
			context.frameRequestID = helpers$3.requestAnimFrame.call(window, frameRefresh);
		}
	},

	stopFrameRefreshTimer: function(context) {
		var frameRequestID = context.frameRequestID;

		if (frameRequestID) {
			cancelAnimFrame.call(window, frameRequestID);
			delete context.frameRequestID;
		}
	}

};

function isValid(rawValue) {
	if (rawValue === null || typeof rawValue === 'undefined') {
		return false;
	} else if (typeof rawValue === 'number') {
		return isFinite(rawValue);
	}
	return !!rawValue;
}

function scaleValue(scale, value, fallback) {
	return isValid(value) ?
		{value: scale.getPixelForValue(value), transitionable: true} :
		{value: fallback};
}

function updateBoxAnnotation(element) {
	var chart = element.chartInstance;
	var options = element.options;
	var scales = chart.scales;
	var chartArea = chart.chartArea;
	var xScaleID = options.xScaleID;
	var yScaleID = options.yScaleID;
	var xScale = scales[xScaleID];
	var yScale = scales[yScaleID];
	var streaming = element._streaming = {};
	var min, max, reverse;

	if (xScale) {
		min = scaleValue(xScale, options.xMin, chartArea.left);
		max = scaleValue(xScale, options.xMax, chartArea.right);
		reverse = min.value > max.value;

		if (min.transitionable) {
			streaming[reverse ? 'right' : 'left'] = {axisId: xScaleID};
		}
		if (max.transitionable) {
			streaming[reverse ? 'left' : 'right'] = {axisId: xScaleID};
		}
	}

	if (yScale) {
		min = scaleValue(yScale, options.yMin, chartArea.top);
		max = scaleValue(yScale, options.yMax, chartArea.bottom);
		reverse = min.value > max.value;

		if (min.transitionable) {
			streaming[reverse ? 'bottom' : 'top'] = {axisId: yScaleID};
		}
		if (max.transitionable) {
			streaming[reverse ? 'top' : 'bottom'] = {axisId: yScaleID};
		}
	}
}

function updateLineAnnotation(element) {
	var chart = element.chartInstance;
	var options = element.options;
	var scaleID = options.scaleID;
	var value = options.value;
	var scale = chart.scales[scaleID];
	var streaming = element._streaming = {};

	if (scale) {
		var isHorizontal = scale.isHorizontal();
		var pixel = scaleValue(scale, value);

		if (pixel.transitionable) {
			streaming[isHorizontal ? 'x1' : 'y1'] = {axisId: scaleID};
			streaming[isHorizontal ? 'x2' : 'y2'] = {axisId: scaleID};
			streaming[isHorizontal ? 'labelX' : 'labelY'] = {axisId: scaleID};
		}
	}
}

function initAnnotationPlugin() {
	var BoxAnnotation = Chart__default['default'].Annotation.types.box;
	var LineAnnotation = Chart__default['default'].Annotation.types.line;
	var configureBoxAnnotation = BoxAnnotation.prototype.configure;
	var configureLineAnnotation = LineAnnotation.prototype.configure;

	BoxAnnotation.prototype.configure = function() {
		updateBoxAnnotation(this);
		return configureBoxAnnotation.call(this);
	};

	LineAnnotation.prototype.configure = function() {
		updateLineAnnotation(this);
		return configureLineAnnotation.call(this);
	};
}

var AnnotationPlugin = {
	attachChart(chart) {
		var streaming = chart.streaming;

		if (!streaming.annotationPlugin) {
			initAnnotationPlugin();
			streaming.annotationPlugin = true;
		}
	},

	getElements(chart) {
		var annotation = chart.annotation;

		if (annotation) {
			var elements = annotation.elements;
			return Object.keys(elements).map(function(id) {
				return elements[id];
			});
		}
		return [];
	},

	detachChart(chart) {
		delete chart.streaming.annotationPlugin;
	}
};

var helpers$2 = Chart__default['default'].helpers;

// Ported from chartjs-plugin-zoom 0.7.0 3c187b7
var zoomNS = Chart__default['default'].Zoom = Chart__default['default'].Zoom || {};

// Ported from chartjs-plugin-zoom 0.7.0 3c187b7
zoomNS.zoomFunctions = zoomNS.zoomFunctions || {};
zoomNS.panFunctions = zoomNS.panFunctions || {};

// Ported from chartjs-plugin-zoom 0.7.0 3c187b7
function rangeMaxLimiter(zoomPanOptions, newMax) {
	if (zoomPanOptions.scaleAxes && zoomPanOptions.rangeMax &&
			!helpers$2.isNullOrUndef(zoomPanOptions.rangeMax[zoomPanOptions.scaleAxes])) {
		var rangeMax = zoomPanOptions.rangeMax[zoomPanOptions.scaleAxes];
		if (newMax > rangeMax) {
			newMax = rangeMax;
		}
	}
	return newMax;
}

// Ported from chartjs-plugin-zoom 0.7.0 3c187b7
function rangeMinLimiter(zoomPanOptions, newMin) {
	if (zoomPanOptions.scaleAxes && zoomPanOptions.rangeMin &&
			!helpers$2.isNullOrUndef(zoomPanOptions.rangeMin[zoomPanOptions.scaleAxes])) {
		var rangeMin = zoomPanOptions.rangeMin[zoomPanOptions.scaleAxes];
		if (newMin < rangeMin) {
			newMin = rangeMin;
		}
	}
	return newMin;
}

function zoomRealTimeScale(scale, zoom, center, zoomOptions) {
	var realtimeOpts = scale.options.realtime;
	var duration = StreamingHelper.resolveOption(scale, 'duration');
	var delay = StreamingHelper.resolveOption(scale, 'delay');
	var newDuration = duration * (2 - zoom);
	var maxPercent, limitedDuration;

	if (scale.isHorizontal()) {
		maxPercent = (scale.right - center.x) / (scale.right - scale.left);
	} else {
		maxPercent = (scale.bottom - center.y) / (scale.bottom - scale.top);
	}
	if (zoom < 1) {
		limitedDuration = rangeMaxLimiter(zoomOptions, newDuration);
	} else {
		limitedDuration = rangeMinLimiter(zoomOptions, newDuration);
	}
	realtimeOpts.duration = limitedDuration;
	realtimeOpts.delay = delay + maxPercent * (duration - limitedDuration);
}

function panRealTimeScale(scale, delta, panOptions) {
	var realtimeOpts = scale.options.realtime;
	var delay = StreamingHelper.resolveOption(scale, 'delay');
	var newDelay = delay + (scale.getValueForPixel(delta) - scale.getValueForPixel(0));

	if (delta > 0) {
		realtimeOpts.delay = rangeMaxLimiter(panOptions, newDelay);
	} else {
		realtimeOpts.delay = rangeMinLimiter(panOptions, newDelay);
	}
}

function updateResetZoom(chart) {
	// For chartjs-plugin-zoom 0.6.6 backward compatibility
	var zoom = chart.$zoom || {_originalOptions: {}};

	var resetZoom = chart.resetZoom;
	var update = chart.update;
	var resetZoomAndUpdate = function() {
		helpers$2.each(chart.scales, function(scale) {
			var realtimeOptions = scale.options.realtime;
			var originalOptions = zoom._originalOptions[scale.id] || scale.originalOptions;

			if (realtimeOptions) {
				if (originalOptions) {
					realtimeOptions.duration = originalOptions.realtime.duration;
					realtimeOptions.delay = originalOptions.realtime.delay;
				} else {
					delete realtimeOptions.duration;
					delete realtimeOptions.delay;
				}
			}
		});

		update.call(chart, {
			duration: 0
		});
	};

	chart.resetZoom = function() {
		chart.update = resetZoomAndUpdate;
		resetZoom();
		chart.update = update;
	};
}

function initZoomPlugin() {
	zoomNS.zoomFunctions.realtime = zoomRealTimeScale;
	zoomNS.panFunctions.realtime = panRealTimeScale;
}

var ZoomPlugin = {
	attachChart(chart) {
		var streaming = chart.streaming;

		if (!streaming.zoomPlugin) {
			initZoomPlugin();
			streaming.resetZoom = chart.resetZoom;
			updateResetZoom(chart);
			streaming.zoomPlugin = true;
		}
	},

	detachChart(chart) {
		var streaming = chart.streaming;

		if (streaming.zoomPlugin) {
			chart.resetZoom = streaming.resetZoom;
			delete streaming.resetZoom;
			delete streaming.zoomPlugin;
		}
	}
};

var helpers$1 = Chart__default['default'].helpers;
var canvasHelpers$1 = helpers$1.canvas;
var scaleService = Chart__default['default'].scaleService;
var TimeScale = scaleService.getScaleConstructor('time');

scaleService.getScaleConstructor = function(type) {
	// For backwards compatibility
	if (type === 'time') {
		type = 'realtime';
	}
	return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
};

// Ported from Chart.js 2.8.0 35273ee.
var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// Ported from Chart.js 2.8.0 35273ee.
var INTERVALS = {
	millisecond: {
		common: true,
		size: 1,
		steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
	},
	second: {
		common: true,
		size: 1000,
		steps: [1, 2, 5, 10, 15, 30]
	},
	minute: {
		common: true,
		size: 60000,
		steps: [1, 2, 5, 10, 15, 30]
	},
	hour: {
		common: true,
		size: 3600000,
		steps: [1, 2, 3, 6, 12]
	},
	day: {
		common: true,
		size: 86400000,
		steps: [1, 2, 5]
	},
	week: {
		common: false,
		size: 604800000,
		steps: [1, 2, 3, 4]
	},
	month: {
		common: true,
		size: 2.628e9,
		steps: [1, 2, 3]
	},
	quarter: {
		common: false,
		size: 7.884e9,
		steps: [1, 2, 3, 4]
	},
	year: {
		common: true,
		size: 3.154e10
	}
};

// Ported from Chart.js 2.8.0 35273ee.
var UNITS = Object.keys(INTERVALS);

// For Chart.js 2.7.x backward compatibility
var defaultAdapter = {
	// Ported from Chart.js 2.9.4 707e52a.
	parse: function(value, format) {
		if (typeof value === 'string' && typeof format === 'string') {
			value = moment__default['default'](value, format);
		} else if (!(value instanceof moment__default['default'])) {
			value = moment__default['default'](value);
		}
		return value.isValid() ? value.valueOf() : null;
	},

	// Ported from Chart.js 2.9.4 707e52a.
	add: function(time, amount, unit) {
		return moment__default['default'](time).add(amount, unit).valueOf();
	},

	// Ported from Chart.js 2.9.4 707e52a.
	startOf: function(time, unit, weekday) {
		time = moment__default['default'](time);
		if (unit === 'isoWeek') {
			return time.isoWeekday(weekday).valueOf();
		}
		return time.startOf(unit).valueOf();
	}
};

// Ported from Chart.js 2.8.0 35273ee. Modified for Chart.js 2.7.x backward compatibility.
function toTimestamp(scale, input) {
	var adapter = scale._adapter || defaultAdapter;
	var options = scale.options.time;
	var parser = options.parser;
	var format = parser || options.format;
	var value = input;

	if (typeof parser === 'function') {
		value = parser(value);
	}

	// Only parse if its not a timestamp already
	if (typeof value !== 'number' && !(value instanceof Number) || !isFinite(value)) {
		value = typeof format === 'string'
			? adapter.parse(value, format)
			: adapter.parse(value);
	}

	if (value !== null) {
		return +value;
	}

	// Labels are in an incompatible format and no `parser` has been provided.
	// The user might still use the deprecated `format` option for parsing.
	if (!parser && typeof format === 'function') {
		value = format(input);

		// `format` could return something else than a timestamp, if so, parse it
		if (typeof value !== 'number' && !(value instanceof Number) || !isFinite(value)) {
			value = adapter.parse(value);
		}
	}

	return value;
}

// Ported from Chart.js 2.8.0 35273ee. Modified for Chart.js 2.7.x backward compatibility.
function parse(scale, input) {
	if (helpers$1.isNullOrUndef(input)) {
		return null;
	}

	var options = scale.options.time;
	var value = toTimestamp(scale, scale.getRightValue(input));
	if (value === null) {
		return value;
	}

	if (options.round) {
		value = +(scale._adapter || defaultAdapter).startOf(value, options.round);
	}

	return value;
}

// Ported from Chart.js 2.8.0 35273ee.
function determineStepSize(min, max, unit, capacity) {
	var range = max - min;
	var interval = INTERVALS[unit];
	var milliseconds = interval.size;
	var steps = interval.steps;
	var i, ilen, factor;

	if (!steps) {
		return Math.ceil(range / (capacity * milliseconds));
	}

	for (i = 0, ilen = steps.length; i < ilen; ++i) {
		factor = steps[i];
		if (Math.ceil(range / (milliseconds * factor)) <= capacity) {
			break;
		}
	}

	return factor;
}

// Ported from Chart.js 2.8.0 35273ee.
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
	var ilen = UNITS.length;
	var i, interval, factor;

	for (i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
		interval = INTERVALS[UNITS[i]];
		factor = interval.steps ? interval.steps[interval.steps.length - 1] : MAX_INTEGER;

		if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
			return UNITS[i];
		}
	}

	return UNITS[ilen - 1];
}

// Ported from Chart.js 2.8.0 35273ee.
function determineMajorUnit(unit) {
	for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
		if (INTERVALS[UNITS[i]].common) {
			return UNITS[i];
		}
	}
}

// Ported from Chart.js 2.8.0 35273ee. Modified for Chart.js 2.7.x backward compatibility.
function generate(scale, min, max, capacity) {
	var adapter = scale._adapter || defaultAdapter;
	var options = scale.options;
	var timeOpts = options.time;
	var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
	var major = determineMajorUnit(minor);
	var stepSize = helpers$1.valueOrDefault(timeOpts.stepSize, timeOpts.unitStepSize);
	var weekday = minor === 'week' ? timeOpts.isoWeekday : false;
	var majorTicksEnabled = options.ticks.major.enabled;
	var interval = INTERVALS[minor];
	var first = min;
	var last = max;
	var ticks = [];
	var time;

	if (!stepSize) {
		stepSize = determineStepSize(min, max, minor, capacity);
	}

	// For 'week' unit, handle the first day of week option
	if (weekday) {
		first = +adapter.startOf(first, 'isoWeek', weekday);
		last = +adapter.startOf(last, 'isoWeek', weekday);
	}

	// Align first/last ticks on unit
	first = +adapter.startOf(first, weekday ? 'day' : minor);
	last = +adapter.startOf(last, weekday ? 'day' : minor);

	// Make sure that the last tick include max
	if (last < max) {
		last = +adapter.add(last, 1, minor);
	}

	time = first;

	if (majorTicksEnabled && major && !weekday && !timeOpts.round) {
		// Align the first tick on the previous `minor` unit aligned on the `major` unit:
		// we first aligned time on the previous `major` unit then add the number of full
		// stepSize there is between first and the previous major time.
		time = +adapter.startOf(time, major);
		time = +adapter.add(time, ~~((first - time) / (interval.size * stepSize)) * stepSize, minor);
	}

	for (; time < last; time = +adapter.add(time, stepSize, minor)) {
		ticks.push(+time);
	}

	ticks.push(+time);

	return ticks;
}

var datasetPropertyKeys = [
	'pointBackgroundColor',
	'pointBorderColor',
	'pointBorderWidth',
	'pointRadius',
	'pointRotation',
	'pointStyle',
	'pointHitRadius',
	'pointHoverBackgroundColor',
	'pointHoverBorderColor',
	'pointHoverBorderWidth',
	'pointHoverRadius',
	'backgroundColor',
	'borderColor',
	'borderSkipped',
	'borderWidth',
	'hoverBackgroundColor',
	'hoverBorderColor',
	'hoverBorderWidth',
	'hoverRadius',
	'hitRadius',
	'radius',
	'rotation'
];

function refreshData(scale) {
	var chart = scale.chart;
	var id = scale.id;
	var duration = StreamingHelper.resolveOption(scale, 'duration');
	var delay = StreamingHelper.resolveOption(scale, 'delay');
	var ttl = StreamingHelper.resolveOption(scale, 'ttl');
	var pause = StreamingHelper.resolveOption(scale, 'pause');
	var onRefresh = StreamingHelper.resolveOption(scale, 'onRefresh');
	var max = scale.max;
	var min = Date.now() - (isNaN(ttl) ? duration + delay : ttl);
	var meta, data, length, i, start, count, removalRange;

	if (onRefresh) {
		onRefresh(chart);
	}

	// Remove old data
	helpers$1.each(chart.data.datasets, function(dataset, datasetIndex) {
		meta = chart.getDatasetMeta(datasetIndex);
		if (id === meta.xAxisID || id === meta.yAxisID) {
			data = dataset.data;
			length = data.length;

			if (pause) {
				// If the scale is paused, preserve the visible data points
				for (i = 0; i < length; ++i) {
					if (!(scale._getTimeForIndex(i, datasetIndex) < max)) {
						break;
					}
				}
				start = i + 2;
			} else {
				start = 0;
			}

			for (i = start; i < length; ++i) {
				if (!(scale._getTimeForIndex(i, datasetIndex) <= min)) {
					break;
				}
			}
			count = i - start;
			if (isNaN(ttl)) {
				// Keep the last two data points outside the range not to affect the existing bezier curve
				count = Math.max(count - 2, 0);
			}

			data.splice(start, count);
			helpers$1.each(datasetPropertyKeys, function(key) {
				if (helpers$1.isArray(dataset[key])) {
					dataset[key].splice(start, count);
				}
			});
			helpers$1.each(dataset.datalabels, function(value) {
				if (helpers$1.isArray(value)) {
					value.splice(start, count);
				}
			});
			if (typeof data[0] !== 'object') {
				removalRange = {
					start: start,
					count: count
				};
			}
		}
	});
	if (removalRange) {
		chart.data.labels.splice(removalRange.start, removalRange.count);
	}

	chart.update({
		preservation: true
	});
}

function stopDataRefreshTimer(scale) {
	var realtime = scale.realtime;
	var refreshTimerID = realtime.refreshTimerID;

	if (refreshTimerID) {
		clearInterval(refreshTimerID);
		delete realtime.refreshTimerID;
		delete realtime.refreshInterval;
	}
}

function startDataRefreshTimer(scale) {
	var realtime = scale.realtime;
	var interval = StreamingHelper.resolveOption(scale, 'refresh');

	realtime.refreshTimerID = setInterval(function() {
		var newInterval = StreamingHelper.resolveOption(scale, 'refresh');

		refreshData(scale);
		if (realtime.refreshInterval !== newInterval && !isNaN(newInterval)) {
			stopDataRefreshTimer(scale);
			startDataRefreshTimer(scale);
		}
	}, interval);
	realtime.refreshInterval = interval;
}

function transition(element, id, translate) {
	var start = element._start || {};
	var view = element._view || {};
	var model = element._model || {};

	helpers$1.each(element._streaming, (item, key) => {
		if (item.axisId === id) {
			if (start.hasOwnProperty(key)) {
				start[key] -= translate;
			}
			if (view.hasOwnProperty(key) && view !== start) {
				view[key] -= translate;
			}
			if (model.hasOwnProperty(key) && model !== view) {
				model[key] -= translate;
			}
		}
	});
}

function scroll(scale) {
	var chart = scale.chart;
	var realtime = scale.realtime;
	var id = scale.id;
	var duration = StreamingHelper.resolveOption(scale, 'duration');
	var delay = StreamingHelper.resolveOption(scale, 'delay');
	var isHorizontal = scale.isHorizontal();
	var length = isHorizontal ? scale.width : scale.height;
	var now = Date.now();

	// For Chart.js 2.8.x backward compatibility
	var reverse = scale.options.ticks.reverse || !(isHorizontal || '_reversePixels' in scale);

	var tooltip = chart.tooltip;
	var annotations = AnnotationPlugin.getElements(chart);
	var offset = length * (now - realtime.head) / duration;
	var i, ilen;

	if (isHorizontal === reverse) {
		offset = -offset;
	}

	// Shift all the elements leftward or downward
	helpers$1.each(chart.data.datasets, function(dataset, datasetIndex) {
		var meta = chart.getDatasetMeta(datasetIndex);
		var elements = meta.data || [];
		var element = meta.dataset;

		for (i = 0, ilen = elements.length; i < ilen; ++i) {
			transition(elements[i], id, offset);
		}
		if (element) {
			transition(element, id, offset);
		}
	});

	// Shift all the annotation elements leftward or downward
	for (i = 0, ilen = annotations.length; i < ilen; ++i) {
		transition(annotations[i], id, offset);
	}

	// Shift tooltip leftward or downward
	transition(tooltip, id, offset);

	scale.max = scale._table[1].time = now - delay;
	scale.min = scale._table[0].time = scale.max - duration;

	realtime.head = now;
}

var defaultConfig = {
	position: 'bottom',
	distribution: 'linear',
	bounds: 'data',
	adapters: {},
	time: {
		parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
		unit: false, // false == automatic or override with week, month, year, etc.
		round: false, // none, or override with week, month, year, etc.
		displayFormat: false, // DEPRECATED
		isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
		minUnit: 'millisecond',

		// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
		displayFormats: {
			millisecond: 'h:mm:ss.SSS a',
			second: 'h:mm:ss a',
			minute: 'h:mm a',
			hour: 'hA',
			day: 'MMM D',
			week: 'll',
			month: 'MMM YYYY',
			quarter: '[Q]Q - YYYY',
			year: 'YYYY'
		},
	},
	realtime: {},
	ticks: {
		autoSkip: false,
		source: 'auto',
		major: {
			enabled: true
		}
	}
};

var RealTimeScale = TimeScale.extend({
	initialize: function() {
		var me = this;

		TimeScale.prototype.initialize.apply(me, arguments);

		// For backwards compatibility
		if (me.options.type === 'time' && !me.chart.options.plugins.streaming) {
			return;
		}

		me.realtime = me.realtime || {};

		startDataRefreshTimer(me);
	},

	update: function() {
		var me = this;
		var realtime = me.realtime;
		var options = me.options;
		var bounds = options.bounds;
		var distribution = options.distribution;
		var offset = options.offset;
		var ticksOpts = options.ticks;
		var autoSkip = ticksOpts.autoSkip;
		var source = ticksOpts.source;
		var minTick = ticksOpts.min;
		var maxTick = ticksOpts.max;
		var majorTicksOpts = ticksOpts.major;
		var majorEnabled = majorTicksOpts.enabled;
		var minSize;

		// For backwards compatibility
		if (options.type === 'time' && !me.chart.options.plugins.streaming) {
			return TimeScale.prototype.update.apply(me, arguments);
		}

		if (StreamingHelper.resolveOption(me, 'pause')) {
			StreamingHelper.stopFrameRefreshTimer(realtime);
		} else {
			StreamingHelper.startFrameRefreshTimer(realtime, function() {
				scroll(me);
			});
			realtime.head = Date.now();
		}

		options.bounds = undefined;
		options.distribution = 'linear';
		options.offset = false;
		ticksOpts.autoSkip = false;
		ticksOpts.source = source === 'auto' ? '' : source;
		ticksOpts.min = -1e15;
		ticksOpts.max = 1e15;
		majorTicksOpts.enabled = true;

		minSize = TimeScale.prototype.update.apply(me, arguments);

		options.bounds = bounds;
		options.distribution = distribution;
		options.offset = offset;
		ticksOpts.autoSkip = autoSkip;
		ticksOpts.source = source;
		ticksOpts.min = minTick;
		ticksOpts.max = maxTick;
		majorTicksOpts.enabled = majorEnabled;

		return minSize;
	},

	buildTicks: function() {
		var me = this;
		var options = me.options;

		// For backwards compatibility
		if (options.type === 'time' && !me.chart.options.plugins.streaming) {
			return TimeScale.prototype.buildTicks.apply(me, arguments);
		}

		var duration = StreamingHelper.resolveOption(me, 'duration');
		var delay = StreamingHelper.resolveOption(me, 'delay');
		var refresh = StreamingHelper.resolveOption(me, 'refresh');
		var ticksOpts = options.ticks;
		var source = ticksOpts.source;
		var timestamps = me._timestamps.data;
		var max = me.realtime.head - delay;
		var min = max - duration;
		var maxArray = [max + refresh, max];
		var ticks;

		if (source === '') {
			ticksOpts.source = 'data';
			me._timestamps.data = generate(me, min, max + refresh, me.getLabelCapacity(min));
		}

		Object.defineProperty(me, 'min', {
			get: function() {
				return min;
			},
			set: helpers$1.noop
		});
		Object.defineProperty(me, 'max', {
			get: function() {
				return maxArray.shift();
			},
			set: helpers$1.noop
		});

		ticks = TimeScale.prototype.buildTicks.apply(me, arguments);

		delete me.min;
		delete me.max;
		me.min = min;
		me.max = max;

		if (source === '') {
			ticksOpts.source = source;
			me._timestamps.data = timestamps;
		}

		me._table = [{time: min, pos: 0}, {time: max, pos: 1}];

		return ticks;
	},

	calculateTickRotation: function() {
		var me = this;
		var options = me.options;
		var ticksOpts = options.ticks;
		var maxRotation = ticksOpts.maxRotation;

		// For backwards compatibility
		if (options.type === 'time' && !me.chart.options.plugins.streaming) {
			TimeScale.prototype.calculateTickRotation.apply(me, arguments);
			return;
		}

		ticksOpts.maxRotation = ticksOpts.minRotation || 0;
		TimeScale.prototype.calculateTickRotation.apply(me, arguments);
		ticksOpts.maxRotation = maxRotation;
	},

	fit: function() {
		var me = this;
		var options = me.options;

		TimeScale.prototype.fit.apply(me, arguments);

		// For backwards compatibility
		if (options.type === 'time' && !me.chart.options.plugins.streaming) {
			return;
		}

		if (options.ticks.display && options.display && me.isHorizontal()) {
			me.paddingLeft = 3;
			me.paddingRight = 3;
			me.handleMargins();
		}
	},

	draw: function(chartArea) {
		var me = this;
		var chart = me.chart;

		// For backwards compatibility
		if (me.options.type === 'time' && !chart.options.plugins.streaming) {
			TimeScale.prototype.draw.apply(me, arguments);
			return;
		}

		var context = me.ctx;
		var	clipArea = me.isHorizontal() ?
			{
				left: chartArea.left,
				top: 0,
				right: chartArea.right,
				bottom: chart.height
			} : {
				left: 0,
				top: chartArea.top,
				right: chart.width,
				bottom: chartArea.bottom
			};

		me._gridLineItems = null;
		me._labelItems = null;

		// Clip and draw the scale
		canvasHelpers$1.clipArea(context, clipArea);
		TimeScale.prototype.draw.apply(me, arguments);
		canvasHelpers$1.unclipArea(context);
	},

	destroy: function() {
		var me = this;

		// For backwards compatibility
		if (me.options.type === 'time' && !me.chart.options.plugins.streaming) {
			return;
		}

		StreamingHelper.stopFrameRefreshTimer(me.realtime);
		stopDataRefreshTimer(me);
	},

	/*
	 * @private
	 */
	_getTimeForIndex: function(index, datasetIndex) {
		var me = this;
		var timestamps = me._timestamps;
		var time = timestamps.datasets[datasetIndex][index];
		var value;

		if (helpers$1.isNullOrUndef(time)) {
			value = me.chart.data.datasets[datasetIndex].data[index];
			if (helpers$1.isObject(value)) {
				time = parse(me, value);
			} else {
				time = parse(me, timestamps.labels[index]);
			}
		}

		return time;
	}
});

scaleService.registerScaleType('realtime', RealTimeScale, defaultConfig);

var helpers = Chart__default['default'].helpers;
var canvasHelpers = helpers.canvas;

Chart__default['default'].defaults.global.plugins.streaming = {
	duration: 10000,
	delay: 0,
	frameRate: 30,
	refresh: 1000,
	onRefresh: null,
	pause: false,
	ttl: undefined
};

// Ported from Chart.js 2.9.4 d6a5ea0. Modified for realtime scale.
Chart__default['default'].defaults.global.legend.onClick = function(e, legendItem) {
	var index = legendItem.datasetIndex;
	var ci = this.chart;
	var meta = ci.getDatasetMeta(index);

	meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
	ci.update({duration: 0});
};

function getAxisMap(element, keys, meta) {
	var axisMap = {};

	helpers.each(keys.x, function(key) {
		axisMap[key] = {axisId: meta.xAxisID};
	});
	helpers.each(keys.y, function(key) {
		axisMap[key] = {axisId: meta.yAxisID};
	});
	return axisMap;
}

var transitionKeys = {
	x: ['x', 'controlPointPreviousX', 'controlPointNextX', 'caretX'],
	y: ['y', 'controlPointPreviousY', 'controlPointNextY', 'caretY']
};

function updateElements(chart) {
	helpers.each(chart.data.datasets, function(dataset, datasetIndex) {
		var meta = chart.getDatasetMeta(datasetIndex);
		var elements = meta.data || [];
		var element = meta.dataset;
		var i, ilen;

		for (i = 0, ilen = elements.length; i < ilen; ++i) {
			elements[i]._streaming = getAxisMap(elements[i], transitionKeys, meta);
		}
		if (element) {
			element._streaming = getAxisMap(element, transitionKeys, meta);
		}
	});
}

/**
 * Update the chart keeping the current animation but suppressing a new one
 * @param {object} config - animation options
 */
function update(config) {
	var me = this;
	var preservation = config && config.preservation;
	var tooltip, lastActive, tooltipLastActive, lastMouseEvent, legend, legendUpdate;

	if (preservation) {
		tooltip = me.tooltip;
		lastActive = me.lastActive;
		tooltipLastActive = tooltip._lastActive;
		me._bufferedRender = true;
		legend = me.legend;

		// Skip legend update
		if (legend) {
			legendUpdate = legend.update;
			legend.update = helpers.noop;
		}
	}

	Chart__default['default'].prototype.update.apply(me, arguments);

	if (preservation) {
		me._bufferedRender = false;
		me._bufferedRequest = null;
		me.lastActive = lastActive;
		tooltip._lastActive = tooltipLastActive;

		if (legend) {
			legend.update = legendUpdate;
		}

		if (me.animating) {
			// If the chart is animating, keep it until the duration is over
			Chart__default['default'].animationService.animations.forEach(function(animation) {
				if (animation.chart === me) {
					me.render({
						duration: (animation.numSteps - animation.currentStep) * 16.66
					});
				}
			});
		} else {
			// If the chart is not animating, make sure that all elements are at the final positions
			me.data.datasets.forEach(function(dataset, datasetIndex) {
				me.getDatasetMeta(datasetIndex).controller.transition(1);
			});
		}

		if (tooltip._active) {
			tooltip.update(true);
		}

		lastMouseEvent = me.streaming.lastMouseEvent;
		if (lastMouseEvent) {
			me.eventHandler(lastMouseEvent);
		}
	}
}

function tooltipUpdate() {
	var me = this;
	var element = me._active && me._active[0];
	var meta;

	if (element) {
		meta = me._chart.getDatasetMeta(element._datasetIndex);
		me._streaming = getAxisMap(me, transitionKeys, meta);
	} else {
		me._streaming = {};
	}

	return Chart__default['default'].Tooltip.prototype.update.apply(me, arguments);
}

// Draw chart at frameRate
function drawChart(chart) {
	var streaming = chart.streaming;
	var frameRate = chart.options.plugins.streaming.frameRate;
	var frameDuration = 1000 / (Math.max(frameRate, 0) || 30);
	var next = streaming.lastDrawn + frameDuration || 0;
	var now = Date.now();
	var lastMouseEvent = streaming.lastMouseEvent;

	if (next <= now) {
		// Draw only when animation is inactive
		if (!chart.animating && !chart.tooltip._start) {
			chart.draw();
		}
		if (lastMouseEvent) {
			chart.eventHandler(lastMouseEvent);
		}
		streaming.lastDrawn = (next + frameDuration > now) ? next : now;
	}
}

var StreamingPlugin = {
	id: 'streaming',

	beforeInit: function(chart) {
		var streaming = chart.streaming = chart.streaming || {};
		var canvas = streaming.canvas = chart.canvas;
		var mouseEventListener = streaming.mouseEventListener = function(event) {
			var pos = helpers.getRelativePosition(event, chart);
			streaming.lastMouseEvent = {
				type: 'mousemove',
				chart: chart,
				native: event,
				x: pos.x,
				y: pos.y
			};
		};

		canvas.addEventListener('mousedown', mouseEventListener);
		canvas.addEventListener('mouseup', mouseEventListener);
	},

	afterInit: function(chart) {
		chart.update = update;
		chart.tooltip.update = tooltipUpdate;
	},

	beforeUpdate: function(chart) {
		var chartOpts = chart.options;
		var scalesOpts = chartOpts.scales;

		if (scalesOpts) {
			helpers.each(scalesOpts.xAxes.concat(scalesOpts.yAxes), function(scaleOpts) {
				if (scaleOpts.type === 'realtime' || scaleOpts.type === 'time') {
					// Allow Bézier control to be outside the chart
					chartOpts.elements.line.capBezierPoints = false;
				}
			});
		}

		if (chart.annotation) {
			AnnotationPlugin.attachChart(chart);
		} else {
			AnnotationPlugin.detachChart(chart);
		}

		if (chart.resetZoom) {
			ZoomPlugin.attachChart(chart);
		} else {
			ZoomPlugin.detachChart(chart);
		}

		return true;
	},

	afterUpdate: function(chart) {
		var streaming = chart.streaming;
		var pause = true;

		updateElements(chart);

		// if all scales are paused, stop refreshing frames
		helpers.each(chart.scales, function(scale) {
			if (scale instanceof RealTimeScale) {
				pause &= StreamingHelper.resolveOption(scale, 'pause');
			}
		});
		if (pause) {
			StreamingHelper.stopFrameRefreshTimer(streaming);
		} else {
			StreamingHelper.startFrameRefreshTimer(streaming, function() {
				drawChart(chart);
			});
		}
	},

	beforeDatasetDraw: function(chart, args) {
		var meta = args.meta;
		var chartArea = chart.chartArea;
		var clipArea = {
			left: 0,
			top: 0,
			right: chart.width,
			bottom: chart.height
		};
		if (meta.xAxisID && meta.controller.getScaleForId(meta.xAxisID) instanceof RealTimeScale) {
			clipArea.left = chartArea.left;
			clipArea.right = chartArea.right;
		}
		if (meta.yAxisID && meta.controller.getScaleForId(meta.yAxisID) instanceof RealTimeScale) {
			clipArea.top = chartArea.top;
			clipArea.bottom = chartArea.bottom;
		}
		canvasHelpers.clipArea(chart.ctx, clipArea);
		return true;
	},

	afterDatasetDraw: function(chart) {
		canvasHelpers.unclipArea(chart.ctx);
	},

	beforeEvent: function(chart, event) {
		var streaming = chart.streaming;

		if (event.type === 'mousemove') {
			// Save mousemove event for reuse
			streaming.lastMouseEvent = event;
		} else if (event.type === 'mouseout') {
			// Remove mousemove event
			delete streaming.lastMouseEvent;
		}
		return true;
	},

	destroy: function(chart) {
		var streaming = chart.streaming;
		var canvas = streaming.canvas;
		var mouseEventListener = streaming.mouseEventListener;

		StreamingHelper.stopFrameRefreshTimer(streaming);

		delete chart.update;
		delete chart.tooltip.update;

		canvas.removeEventListener('mousedown', mouseEventListener);
		canvas.removeEventListener('mouseup', mouseEventListener);

		helpers.each(chart.scales, function(scale) {
			if (scale instanceof RealTimeScale) {
				scale.destroy();
			}
		});
	}
};

Chart__default['default'].helpers.streaming = StreamingHelper;

Chart__default['default'].plugins.register(StreamingPlugin);

return StreamingPlugin;

})));
