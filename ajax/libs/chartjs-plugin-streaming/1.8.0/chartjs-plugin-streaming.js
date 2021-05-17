/*!
 * chartjs-plugin-streaming v1.8.0
 * https://nagix.github.io/chartjs-plugin-streaming
 * (c) 2019 Akihiko Kusanagi
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('moment')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'moment'], factory) :
(global = global || self, global.ChartStreaming = factory(global.Chart, global.moment));
}(this, function (Chart, moment) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;
moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

var helpers = Chart.helpers;

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

	startFrameRefreshTimer: function(context, func) {
		if (!context.frameRequestID) {
			var frameRefresh = function() {
				func();
				context.frameRequestID = helpers.requestAnimFrame.call(window, frameRefresh);
			};
			context.frameRequestID = helpers.requestAnimFrame.call(window, frameRefresh);
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

var helpers$1 = Chart.helpers;
var canvasHelpers = helpers$1.canvas;
var scaleService = Chart.scaleService;
var TimeScale = scaleService.getScaleConstructor('time');

scaleService.getScaleConstructor = function(type) {
	// For backwards compatibility
	if (type === 'time') {
		type = 'realtime';
	}
	return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
};

// For Chart.js 2.7.x backward compatibility
var defaultAdapter = {
	// Ported from Chart.js 2.8.0-rc.1 35273ee
	parse: function(value, format) {
		if (typeof value === 'string' && typeof format === 'string') {
			value = moment(value, format);
		} else if (!(value instanceof moment)) {
			value = moment(value);
		}
		return value.isValid() ? value.valueOf() : null;
	}
};

// Ported from Chart.js 2.8.0-rc.1 35273ee. Modified for Chart.js 2.7.x backward compatibility.
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

// Ported from Chart.js 2.8.0-rc.1 35273ee
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
		value = +scale._adapter.startOf(value, options.round);
	}

	return value;
}

function resolveOption(scale, key) {
	var realtimeOpts = scale.options.realtime;
	var streamingOpts = scale.chart.options.plugins.streaming;
	return helpers$1.valueOrDefault(realtimeOpts[key], streamingOpts[key]);
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
	var duration = resolveOption(scale, 'duration');
	var delay = resolveOption(scale, 'delay');
	var ttl = resolveOption(scale, 'ttl');
	var pause = resolveOption(scale, 'pause');
	var onRefresh = resolveOption(scale, 'onRefresh');
	var max = scale.max;
	var min = Date.now() - (isNaN(ttl) ? duration + delay : ttl);
	var meta, data, length, i, start, count, removalRange;

	if (onRefresh) {
		onRefresh(chart);
	}

	// Remove old data
	chart.data.datasets.forEach(function(dataset, datasetIndex) {
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
			datasetPropertyKeys.forEach(function(key) {
				if (dataset.hasOwnProperty(key) && helpers$1.isArray(dataset[key])) {
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
	var interval = resolveOption(scale, 'refresh');

	realtime.refreshTimerID = setInterval(function() {
		var newInterval = resolveOption(scale, 'refresh');

		refreshData(scale);
		if (realtime.refreshInterval !== newInterval && !isNaN(newInterval)) {
			stopDataRefreshTimer(scale);
			startDataRefreshTimer(scale);
		}
	}, interval);
	realtime.refreshInterval = interval;
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

function scroll(scale) {
	var chart = scale.chart;
	var realtime = scale.realtime;
	var duration = resolveOption(scale, 'duration');
	var delay = resolveOption(scale, 'delay');
	var id = scale.id;
	var tooltip = chart.tooltip;
	var activeTooltip = tooltip._active;
	var now = Date.now();
	var length, keys, offset, meta, elements, i, ilen;

	if (scale.isHorizontal()) {
		length = scale.width;
		keys = transitionKeys.x;
	} else {
		length = scale.height;
		keys = transitionKeys.y;
	}
	offset = length * (now - realtime.head) / duration;

	if (scale.options.ticks.reverse) {
		offset = -offset;
	}

	// Shift all the elements leftward or upward
	helpers$1.each(chart.data.datasets, function(dataset, datasetIndex) {
		meta = chart.getDatasetMeta(datasetIndex);
		if (id === meta.xAxisID || id === meta.yAxisID) {
			elements = meta.data || [];

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
		format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
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

		// For backwards compatibility
		if (me.options.type === 'time' && !me.chart.options.plugins.streaming) {
			return TimeScale.prototype.update.apply(me, arguments);
		}

		if (resolveOption(me, 'pause')) {
			StreamingHelper.stopFrameRefreshTimer(realtime);
		} else {
			StreamingHelper.startFrameRefreshTimer(realtime, function() {
				scroll(me);
			});
			realtime.head = Date.now();
		}

		return TimeScale.prototype.update.apply(me, arguments);
	},

	buildTicks: function() {
		var me = this;
		var options = me.options;

		// For backwards compatibility
		if (options.type === 'time' && !me.chart.options.plugins.streaming) {
			return TimeScale.prototype.buildTicks.apply(me, arguments);
		}

		var timeOpts = options.time;
		var majorTicksOpts = options.ticks.major;
		var duration = resolveOption(me, 'duration');
		var delay = resolveOption(me, 'delay');
		var refresh = resolveOption(me, 'refresh');
		var bounds = options.bounds;
		var distribution = options.distribution;
		var offset = options.offset;
		var minTime = timeOpts.min;
		var maxTime = timeOpts.max;
		var majorEnabled = majorTicksOpts.enabled;
		var max = me.realtime.head - delay;
		var min = max - duration;
		var maxArray = [max + refresh, max];
		var ticks;

		options.bounds = undefined;
		options.distribution = 'linear';
		options.offset = false;
		timeOpts.min = -1e15;
		timeOpts.max = 1e15;
		majorTicksOpts.enabled = true;

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
		options.bounds = bounds;
		options.distribution = distribution;
		options.offset = offset;
		timeOpts.min = minTime;
		timeOpts.max = maxTime;
		majorTicksOpts.enabled = majorEnabled;
		me._table = [{time: min, pos: 0}, {time: max, pos: 1}];

		return ticks;
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

		// Clip and draw the scale
		canvasHelpers.clipArea(context, clipArea);
		TimeScale.prototype.draw.apply(me, arguments);
		canvasHelpers.unclipArea(context);
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

var helpers$2 = Chart.helpers;
var canvasHelpers$1 = helpers$2.canvas;

Chart.defaults.global.plugins.streaming = {
	duration: 10000,
	delay: 0,
	frameRate: 30,
	refresh: 1000,
	onRefresh: null,
	pause: false,
	ttl: undefined
};

/**
 * Update the chart keeping the current animation but suppressing a new one
 * @param {object} config - animation options
 */
function update(config) {
	var me = this;
	var preservation = config && config.preservation;
	var tooltip, lastActive, tooltipLastActive, lastMouseEvent;

	if (preservation) {
		tooltip = me.tooltip;
		lastActive = me.lastActive;
		tooltipLastActive = tooltip._lastActive;
		me._bufferedRender = true;
	}

	Chart.prototype.update.apply(me, arguments);

	if (preservation) {
		me._bufferedRender = false;
		me._bufferedRequest = null;
		me.lastActive = lastActive;
		tooltip._lastActive = tooltipLastActive;

		if (me.animating) {
			// If the chart is animating, keep it until the duration is over
			Chart.animationService.animations.forEach(function(animation) {
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
			var pos = helpers$2.getRelativePosition(event, chart);
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

		if (chart.resetZoom) {
			Chart.Zoom.updateResetZoom(chart);
		}
	},

	beforeUpdate: function(chart) {
		var chartOpts = chart.options;
		var scalesOpts = chartOpts.scales;

		if (scalesOpts) {
			scalesOpts.xAxes.concat(scalesOpts.yAxes).forEach(function(scaleOpts) {
				if (scaleOpts.type === 'realtime' || scaleOpts.type === 'time') {
					// Allow Bézier control to be outside the chart
					chartOpts.elements.line.capBezierPoints = false;
				}
			});
		}
		return true;
	},

	afterUpdate: function(chart, options) {
		var streaming = chart.streaming;
		var pause = true;

		// if all scales are paused, stop refreshing frames
		helpers$2.each(chart.scales, function(scale) {
			if (scale instanceof RealTimeScale) {
				pause &= helpers$2.valueOrDefault(scale.options.realtime.pause, options.pause);
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
		canvasHelpers$1.clipArea(chart.ctx, clipArea);
		return true;
	},

	afterDatasetDraw: function(chart) {
		canvasHelpers$1.unclipArea(chart.ctx);
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

		canvas.removeEventListener('mousedown', mouseEventListener);
		canvas.removeEventListener('mouseup', mouseEventListener);

		helpers$2.each(chart.scales, function(scale) {
			if (scale instanceof RealTimeScale) {
				scale.destroy();
			}
		});
	}
};

var helpers$3 = Chart.helpers;

// Ported from chartjs-plugin-zoom 0.7.0 3c187b7
var zoomNS = Chart.Zoom = Chart.Zoom || {};

// Ported from chartjs-plugin-zoom 0.7.0 3c187b7
zoomNS.zoomFunctions = zoomNS.zoomFunctions || {};
zoomNS.panFunctions = zoomNS.panFunctions || {};

// Ported from chartjs-plugin-zoom 0.7.0 3c187b7
function rangeMaxLimiter(zoomPanOptions, newMax) {
	if (zoomPanOptions.scaleAxes && zoomPanOptions.rangeMax &&
			!helpers$3.isNullOrUndef(zoomPanOptions.rangeMax[zoomPanOptions.scaleAxes])) {
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
			!helpers$3.isNullOrUndef(zoomPanOptions.rangeMin[zoomPanOptions.scaleAxes])) {
		var rangeMin = zoomPanOptions.rangeMin[zoomPanOptions.scaleAxes];
		if (newMin < rangeMin) {
			newMin = rangeMin;
		}
	}
	return newMin;
}

function zoomRealTimeScale(scale, zoom, center, zoomOptions) {
	var realtimeOpts = scale.options.realtime;
	var streamingOpts = scale.chart.options.plugins.streaming;
	var duration = helpers$3.valueOrDefault(realtimeOpts.duration, streamingOpts.duration);
	var delay = helpers$3.valueOrDefault(realtimeOpts.delay, streamingOpts.delay);
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
	var streamingOpts = scale.chart.options.plugins.streaming;
	var delay = helpers$3.valueOrDefault(realtimeOpts.delay, streamingOpts.delay);
	var newDelay = delay + (scale.getValueForPixel(delta) - scale.getValueForPixel(0));

	if (delta > 0) {
		realtimeOpts.delay = rangeMaxLimiter(panOptions, newDelay);
	} else {
		realtimeOpts.delay = rangeMinLimiter(panOptions, newDelay);
	}
}

zoomNS.zoomFunctions.realtime = zoomRealTimeScale;
zoomNS.panFunctions.realtime = panRealTimeScale;

function updateResetZoom(chart) {
	// For chartjs-plugin-zoom 0.6.6 backward compatibility
	var zoom = chart.$zoom || {_originalOptions: {}};

	var resetZoom = chart.resetZoom;
	var update = chart.update;
	var resetZoomAndUpdate = function() {
		helpers$3.each(chart.scales, function(scale) {
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

zoomNS.updateResetZoom = updateResetZoom;

Chart.helpers.streaming = StreamingHelper;

Chart.plugins.register(StreamingPlugin);

return StreamingPlugin;

}));
