/*
 * @license
 * chartjs-plugin-streaming
 * http://github.com/nagix/chartjs-plugin-streaming/
 * Version: 1.4.1
 *
 * Copyright 2018 Akihiko Kusanagi
 * Released under the MIT license
 * https://github.com/nagix/chartjs-plugin-streaming/blob/master/LICENSE.md
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['chart.js', 'moment'], factory) :
	(global['chartjs-plugin-streaming'] = factory(global.Chart,global.moment));
}(this, (function (Chart,moment) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;
moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

'use strict';

var realTimeScale = function(Chart$$1, moment$$1) {

	var helpers = Chart$$1.helpers;

	helpers.cancelAnimFrame = (function() {
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

	var realTimeScaleDefaultConfig = {
		position: 'bottom',
		distribution: 'linear',
		bounds: 'data',

		time: {
			parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
			format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
			unit: false, // false == automatic or override with week, month, year, etc.
			round: false, // none, or override with week, month, year, etc.
			displayFormat: false, // DEPRECATED
			isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
			minUnit: 'millisecond',

			// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
			displayFormats: {
				millisecond: 'h:mm:ss.SSS a', // 11:20:01.123 AM,
				second: 'h:mm:ss a', // 11:20:01 AM
				minute: 'h:mm a', // 11:20 AM
				hour: 'hA', // 5PM
				day: 'MMM D', // Sep 4
				week: 'll', // Week 46, or maybe "[W]WW - YYYY" ?
				month: 'MMM YYYY', // Sept 2015
				quarter: '[Q]Q - YYYY', // Q3
				year: 'YYYY' // 2015
			},
		},
		realtime: {
			duration: 10000,
			refresh: 1000,
			delay: 0,
			frameRate: 30,
			onRefresh: null
		},
		ticks: {
			autoSkip: false,
			source: 'auto',
			major: {
				enabled: true
			}
		}
	};

	// Ported from Chart.js 2.7.1 37ec838.
	var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

	// Ported from Chart.js 2.7.1 37ec838.
	var INTERVALS = {
		millisecond: {
			common: true,
			size: 1,
			steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
		},
		second: {
			common: true,
			size: 1000,
			steps: [1, 2, 5, 10, 30]
		},
		minute: {
			common: true,
			size: 60000,
			steps: [1, 2, 5, 10, 30]
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

	// Ported from Chart.js 2.7.1 37ec838.
	var UNITS = Object.keys(INTERVALS);

	// Ported from Chart.js 2.7.1 37ec838.
	function momentify(value, options) {
		var parser = options.parser;
		var format = options.parser || options.format;

		if (typeof parser === 'function') {
			return parser(value);
		}

		if (typeof value === 'string' && typeof format === 'string') {
			return moment$$1(value, format);
		}

		if (!(value instanceof moment$$1)) {
			value = moment$$1(value);
		}

		if (value.isValid()) {
			return value;
		}

		// Labels are in an incompatible moment format and no `parser` has been provided.
		// The user might still use the deprecated `format` option to convert his inputs.
		if (typeof format === 'function') {
			return format(value);
		}

		return value;
	}

	// Ported from Chart.js 2.7.1 37ec838.
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

	// Ported from Chart.js 2.7.1 37ec838.
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

	// Ported from Chart.js 2.7.1 37ec838.
	function determineUnitForFormatting(ticks, minUnit, min, max) {
		var duration = moment$$1.duration(moment$$1(max).diff(moment$$1(min)));
		var ilen = UNITS.length;
		var i, unit;

		for (i = ilen - 1; i >= UNITS.indexOf(minUnit); i--) {
			unit = UNITS[i];
			if (INTERVALS[unit].common && duration.as(unit) >= ticks.length) {
				return unit;
			}
		}

		return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
	}

	// Ported from Chart.js 2.7.1 37ec838.
	function determineMajorUnit(unit) {
		for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
			if (INTERVALS[UNITS[i]].common) {
				return UNITS[i];
			}
		}
	}

	// Ported from Chart.js 2.7.1 37ec838. Modified for realtime scale.
	function generate(min, max, capacity, options) {
		var timeOpts = options.time;
		var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
		var major = determineMajorUnit(minor);
		var stepSize = helpers.valueOrDefault(timeOpts.stepSize, timeOpts.unitStepSize);
		var weekday = minor === 'week' ? timeOpts.isoWeekday : false;
		// For realtime scale: Major ticks are always enabled.
		var majorTicksEnabled = true;
		var interval = INTERVALS[minor];
		var first = moment$$1(min);
		// For realtime scale: Add delay and refresh interval for scroll margin.
		var last = moment$$1(max + options.realtime.delay + options.realtime.refresh);
		var ticks = [];
		var time;

		if (!stepSize) {
			stepSize = determineStepSize(min, max, minor, capacity);
		}

		// For 'week' unit, handle the first day of week option
		if (weekday) {
			first = first.isoWeekday(weekday);
			last = last.isoWeekday(weekday);
		}

		// Align first/last ticks on unit
		first = first.startOf(weekday ? 'day' : minor);
		last = last.startOf(weekday ? 'day' : minor);

		// Make sure that the last tick include max
		if (last < max) {
			last.add(1, minor);
		}

		time = moment$$1(first);

		if (majorTicksEnabled && major && !weekday && !timeOpts.round) {
			// Align the first tick on the previous `minor` unit aligned on the `major` unit:
			// we first aligned time on the previous `major` unit then add the number of full
			// stepSize there is between first and the previous major time.
			time.startOf(major);
			time.add(~~((first - time) / (interval.size * stepSize)) * stepSize, minor);
		}

		for (; time < last; time.add(stepSize, minor)) {
			ticks.push(+time);
		}

		ticks.push(+time);

		return ticks;
	}

	// Ported from Chart.js 2.7.1 37ec838.
	function ticksFromTimestamps(values, majorUnit) {
		var ticks = [];
		var i, ilen, value, major;

		for (i = 0, ilen = values.length; i < ilen; ++i) {
			value = values[i];
			major = majorUnit ? value === +moment$$1(value).startOf(majorUnit) : false;

			ticks.push({
				value: value,
				major: major
			});
		}

		return ticks;
	}

	// Ported from Chart.js 2.7.1 37ec838.
	function determineLabelFormat(data, timeOpts) {
		var i, momentDate, hasTime;
		var ilen = data.length;

		// find the label with the most parts (milliseconds, minutes, etc.)
		// format all labels with the same level of detail as the most specific label
		for (i = 0; i < ilen; i++) {
			momentDate = momentify(data[i], timeOpts);
			if (momentDate.millisecond() !== 0) {
				return 'MMM D, YYYY h:mm:ss.SSS a';
			}
			if (momentDate.second() !== 0 || momentDate.minute() !== 0 || momentDate.hour() !== 0) {
				hasTime = true;
			}
		}
		if (hasTime) {
			return 'MMM D, YYYY h:mm:ss a';
		}
		return 'MMM D, YYYY';
	}

	var hidden, visibilityChange;
	if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
		hidden = 'hidden';
		visibilityChange = 'visibilitychange';
	} else if (typeof document.msHidden !== 'undefined') {
		hidden = 'msHidden';
		visibilityChange = 'msvisibilitychange';
	} else if (typeof document.webkitHidden !== 'undefined') {
		hidden = 'webkitHidden';
		visibilityChange = 'webkitvisibilitychange';
	}

	var transitionKeys = {
		x: {
			data: ['x', 'controlPointPreviousX', 'controlPointNextX'],
			dataset: ['x'],
			tooltip: ['x', 'caretX']
		},
		y: {
			data: ['y', 'controlPointPreviousY', 'controlPointNextY'],
			dataset: ['y'],
			tooltip: ['y', 'caretY']
		}
	};

	function transition(element, keys, translate) {
		var start = element._start || {};
		var view = element._view || {};
		var model = element._model || {};
		var i, ilen;

		for (i = 0, ilen = keys.length; i < ilen; ++i) {
			var key = keys[i];
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
	}

	var TimeScale = Chart$$1.scaleService.getScaleConstructor('time');

	Chart$$1.scaleService.getScaleConstructor = function(type) {
		// For backwards compatibility
		if (type === 'time') {
			type = 'realtime';
		}
		return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
	};

	var RealTimeScale = TimeScale.extend({
		initialize: function() {
			TimeScale.prototype.initialize.call(this);

			var me = this;
			var chart = me.chart;

			// For backwards compatibility
			if (me.options.type === 'time' && !chart.options.plugins.streaming) {
				return;
			}

			var prev = Date.now();
			var lastDrawn = 0;

			document.addEventListener(visibilityChange, function() {
				if (!document[hidden]) {
					chart.update(0);
					prev = Date.now();
				}
			}, false);

			var frameRefresh = function() {
				var realtimeOpts = me.options.realtime;
				var duration = realtimeOpts.duration;
				var id = me.id;
				var tooltip = chart.tooltip;
				var activeTooltip = tooltip._active;
				var frameDuration = 1000 / (Math.max(realtimeOpts.frameRate, 0) || 30);
				var keys, length, meta;

				if (me.isHorizontal()) {
					length = me.width;
					keys = transitionKeys.x;
				} else {
					length = me.height;
					keys = transitionKeys.y;
				}

				var now = Date.now();
				var offset = length * (now - prev) / duration;

				// Shift all the elements leftward or upward
				helpers.each(chart.data.datasets, function(dataset, datasetIndex) {
					meta = chart.getDatasetMeta(datasetIndex);
					if (id === meta.xAxisID || id === meta.yAxisID) {
						var elements = meta.data || [];
						var i, ilen;

						for (i = 0, ilen = elements.length; i < ilen; ++i) {
							transition(elements[i], keys.data, offset);
						}

						if (meta.dataset) {
							transition(meta.dataset, keys.dataset, offset);
						}
					}
				});

				// Shift tooltip leftward or upward
				if (activeTooltip && activeTooltip[0]) {
					meta = chart.getDatasetMeta(activeTooltip[0]._datasetIndex);
					if (id === meta.xAxisID || id === meta.yAxisID) {
						transition(tooltip, keys.tooltip, offset);
					}
				}

				me.max = me._table[1].time = now - realtimeOpts.delay;
				me.min = me._table[0].time = me.max - duration;

				if (lastDrawn + frameDuration <= now) {
					// Draw only when animation is inactive
					if (!chart.animating) {
						chart.draw();
					}
					lastDrawn += frameDuration;
					if (lastDrawn + frameDuration <= now) {
						lastDrawn = now;
					}
				}

				prev = now;

				me.frameRequestID = helpers.requestAnimFrame.call(window, frameRefresh);
			};
			me.frameRequestID = helpers.requestAnimFrame.call(window, frameRefresh);
		},

		buildTicks: function() {
			var me = this;
			var options = me.options;

			// For backwards compatibility
			if (options.type === 'time' && !me.chart.options.plugins.streaming) {
				return TimeScale.prototype.buildTicks.call(this);
			}

			var timeOpts = options.time;
			var realtimeOpts = options.realtime;
			var max = Date.now() - realtimeOpts.delay;
			var min = max - realtimeOpts.duration;
			var timestamps = [];

			switch (options.ticks.source) {
			case 'data':
				timestamps = me._timestamps.data;
				break;
			case 'labels':
				timestamps = me._timestamps.labels;
				break;
			case 'auto':
			default:
				timestamps = generate(min, max, me.getLabelCapacity(min), options);
			}

			me.min = min;
			me.max = max;

			// PRIVATE
			me._unit = timeOpts.unit || determineUnitForFormatting(timestamps, timeOpts.minUnit, me.min, me.max);
			me._majorUnit = determineMajorUnit(me._unit);
			// realtime scale only supports linear distribution.
			me._table = [{time: min, pos: 0}, {time: max, pos: 1}];
			// offset is always disabled.
			me._offsets = {left: 0, right: 0};
			me._labelFormat = determineLabelFormat(me._timestamps.data, timeOpts);

			return ticksFromTimestamps(timestamps, me._majorUnit);
		},

		fit: function() {
			TimeScale.prototype.fit.call(this);

			var me = this;
			var options = me.options;

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
				return TimeScale.prototype.draw.call(this, chartArea);
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

			// Clip and draw the scale
			helpers.canvas.clipArea(context, clipArea);
			TimeScale.prototype.draw.call(this, chartArea);
			helpers.canvas.unclipArea(context);
		},

		destroy: function() {
			var me = this;
			var frameRequestID = me.frameRequestID;

			if (frameRequestID) {
				helpers.cancelAnimFrame.call(window, frameRequestID);
			}
		}
	});

	Chart$$1.scaleService.registerScaleType('realtime', RealTimeScale, realTimeScaleDefaultConfig);
};

'use strict';

var streamingPlugin = function(Chart$$1) {

	Chart$$1.defaults.global.plugins.streaming = {
		duration: 10000,
		refresh: 1000,
		delay: 0,
		frameRate: 30,
		onRefresh: null
	};

	var realTimeScale = Chart$$1.scaleService.getScaleConstructor('realtime');

	function removeOldData(scale, lower, data, datasetIndex) {
		var i, ilen;

		for (i = 2, ilen = data.length; i < ilen; ++i) {
			if (!(scale.getPixelForValue(null, i, datasetIndex) <= lower)) {
				break;
			}
		}
		// Keep the last two data points outside the range not to affect the existing bezier curve
		data.splice(0, i - 2);
		if (typeof data[0] !== 'object') {
			return i - 2;
		}
	}

	function onRefresh(chart) {
		var streamingOpts = chart.options.plugins.streaming;
		var numToRemove;

		if (streamingOpts.onRefresh) {
			streamingOpts.onRefresh(chart);
		}

		// Remove old data
		chart.data.datasets.forEach(function(dataset, datasetIndex) {
			var meta = chart.getDatasetMeta(datasetIndex);
			var scale = meta.controller.getScaleForId(meta.xAxisID);
			if (scale instanceof realTimeScale) {
				numToRemove = removeOldData(scale, scale.left, dataset.data, datasetIndex);
			}
			scale = meta.controller.getScaleForId(meta.yAxisID);
			if (scale instanceof realTimeScale) {
				numToRemove = removeOldData(scale, scale.top, dataset.data, datasetIndex);
			}
		});
		if (numToRemove) {
			chart.data.labels.splice(0, numToRemove);
		}

		// Buffer any update calls so that renders do not occur
		chart._bufferedRender = true;
		chart.update();
		chart._bufferedRender = false;
		chart._bufferedRequest = null;
	}

	return {
		id: 'streaming',

		afterInit: function(chart, options) {
			chart.refreshTimerID = setInterval(function() {
				onRefresh(chart);
			}, options.refresh);
		},

		beforeUpdate: function(chart, options) {
			var chartOpts = chart.options;
			var scalesOpts = chartOpts.scales;
			var realtimeOpts;

			chartOpts.elements.line.capBezierPoints = false;

			scalesOpts.xAxes.concat(scalesOpts.yAxes).forEach(function(scaleOpts) {
				if (scaleOpts.type === 'realtime' || scaleOpts.type === 'time') {
					realtimeOpts = scaleOpts.realtime;

					// For backwards compatibility
					if (!realtimeOpts) {
						realtimeOpts = scaleOpts.realtime = {};
					}

					// Copy plugin options to scale options
					realtimeOpts.duration = options.duration;
					realtimeOpts.refresh = options.refresh;
					realtimeOpts.delay = options.delay;
					realtimeOpts.frameRate = options.frameRate;
					realtimeOpts.onRefresh = onRefresh;
				}
			});
			return true;
		},

		beforeDraw: function(chart) {
			// Dispach mouse event for scroll
			var event = chart.lastMouseMoveEvent;
			if (event) {
				if (typeof MouseEvent === 'function') {
					chart.canvas.dispatchEvent(event);
				} else {
					var newEvent = document.createEvent('MouseEvents');
					newEvent.initMouseEvent(
						event.type, event.bubbles, event.cancelable, event.view, event.detail,
						event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey,
						event.altKey, event.shiftKey, event.metaKey, event.button, event.relatedTarget
					);
					chart.canvas.dispatchEvent(newEvent);
				}
			}
			return true;
		},

		beforeEvent: function(chart, event) {
			if (event.type === 'mousemove') {
				// Save mousemove event for reuse
				chart.lastMouseMoveEvent = event.native;
			} else if (event.type === 'mouseout') {
				// Remove mousemove event
				delete chart.lastMouseMoveEvent;
			}
			return true;
		},

		destroy: function(chart) {
			var refreshTimerID = chart.refreshTimerID;

			if (refreshTimerID) {
				clearInterval(refreshTimerID);
			}
			Chart$$1.helpers.each(chart.scales, function(scale) {
				if (scale instanceof realTimeScale) {
					scale.destroy();
				}
			});
		}
	};
};

'use strict';

realTimeScale(Chart, moment);

var plugin = streamingPlugin(Chart);
Chart.plugins.register(plugin);

return plugin;

})));
