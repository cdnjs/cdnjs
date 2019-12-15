/*!
 * Chart.Zoom.js
 * http://chartjs.org/
 * Version: 0.1.3
 *
 * Copyright 2016 Evert Timberg
 * Released under the MIT license
 * https://github.com/chartjs/Chart.Zoom.js/blob/master/LICENSE.md
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// hammer JS for touch support
var Hammer = require('hammerjs'); 
Hammer = typeof(Hammer) === 'function' ? Hammer : window.Hammer;

// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;

// Take the zoom namespace of Chart
var zoomNS = Chart.Zoom = Chart.Zoom || {};

// Where we store functions to handle different scale types
var zoomFunctions = zoomNS.zoomFunctions = zoomNS.zoomFunctions || {};
var panFunctions = zoomNS.panFunctions = zoomNS.panFunctions || {}; 

// Default options if none are provided
var defaultOptions = zoomNS.defaults = {
	pan: {
		enabled: true,
		mode: 'xy',
		threshold: 10,
	},
	zoom: {
		enabled: true,
		mode: 'xy',
	}
};

function directionEnabled(mode, dir) {
	if (mode === undefined) {
		return true;
	} else if (typeof mode === 'string') {
		return mode.indexOf(dir) !== -1;
	}

	return false;
}

function zoomIndexScale(scale, zoom, center) {

}


function zoomTimeScale(scale, zoom, center) {
	var options = scale.options;
	var minDelta, maxDelta;
	var newDiff;

	if (scale.isHorizontal()) {
		newDiff = (scale.right - scale.left) * (zoom - 1);
	} else {
		newDiff = (scale.bottom - scale.top) * (zoom - 1);
	}

	// Apply evenly for now until center is used
	minDelta = maxDelta = newDiff / 2;

	options.time.min = scale.getValueForPixel(scale.getPixelForValue(scale.firstTick) + minDelta);
	options.time.max = scale.getValueForPixel(scale.getPixelForValue(scale.lastTick) - maxDelta);
}

function zoomNumericalScale(scale, zoom, center) {
	var newDiff = (scale.max - scale.min) * (zoom - 1);
	scale.options.ticks.min = scale.min + (newDiff / 2);
	scale.options.ticks.max = scale.max - (newDiff / 2);
}



function zoomScale(scale, zoom, center) {
	var fn = zoomFunctions[scale.options.type];
	if (fn) {
		fn(scale, zoom, center);
	}
}

function doZoom(chartInstance, zoom, center) {
	var ca = chartInstance.chartArea;
	if (!center) {
		center = {
			x: (ca.left + ca.right) / 2,
			y: (ca.top + ca.bottom) / 2,
		};
	}

	var zoomOptions = chartInstance.options.zoom;

	if (zoomOptions && helpers.getValueOrDefault(zoomOptions.enabled, defaultOptions.zoom.enabled)) {
		// Do the zoom here
		var zoomMode = helpers.getValueOrDefault(chartInstance.options.zoom.mode, defaultOptions.zoom.mode);

		helpers.each(chartInstance.scales, function(scale, id) {
			if (scale.isHorizontal() && directionEnabled(zoomMode, 'x')) {
				zoomScale(scale, zoom, center);
			} else if (directionEnabled(zoomMode, 'y')) {
				// Do Y zoom
				zoomScale(scale, zoom, center);
			}
		});

		chartInstance.update(0);
	}
}

function panIndexScale(scale, delta) {
	/*var options = scale.options;
	var labels = scale.chart.data.labels;
	var lastLabelIndex = labels.length - 1;

	var minIndex = Math.max(0, Math.round(scale.getValueForPixel(scale.getPixelForValue(null, scale.minIndex, null, true) - delta)));
	var maxIndex = Math.min(lastLabelIndex, Math.round(scale.getValueForPixel(scale.getPixelForValue(null, scale.maxIndex, null, true) - delta)))
	options.ticks.min = labels[minIndex];
	options.ticks.max = labels[maxIndex];*/
}

function panTimeScale(scale, delta) {
	var options = scale.options;
	options.time.min = scale.getValueForPixel(scale.getPixelForValue(scale.firstTick) - delta);
	options.time.max = scale.getValueForPixel(scale.getPixelForValue(scale.lastTick) - delta);
}

function panNumericalScale(scale, delta) {
	var tickOpts = scale.options.ticks;
	var start = scale.start,
		end = scale.end;

	if (tickOpts.reverse) {
		tickOpts.max = scale.getValueForPixel(scale.getPixelForValue(start) - delta);
		tickOpts.min = scale.getValueForPixel(scale.getPixelForValue(end) - delta);
	} else {
		tickOpts.min = scale.getValueForPixel(scale.getPixelForValue(start) - delta);
		tickOpts.max = scale.getValueForPixel(scale.getPixelForValue(end) - delta);
	}
}

function panScale(scale, delta) {
	var fn = panFunctions[scale.options.type];
	if (fn) {
		fn(scale, delta);
	}
}

function doPan(chartInstance, deltaX, deltaY) {
	var panOptions = chartInstance.options.pan;
	if (panOptions && helpers.getValueOrDefault(panOptions.enabled, defaultOptions.pan.enabled)) {
		var panMode = helpers.getValueOrDefault(chartInstance.options.pan.mode, defaultOptions.pan.mode);

		helpers.each(chartInstance.scales, function(scale, id) {
			if (scale.isHorizontal() && directionEnabled(panMode, 'x') && deltaX !== 0) {
				panScale(scale, deltaX);
			} else if (directionEnabled(panMode, 'y') && deltaY !== 0) {
				panScale(scale, deltaY);
			}
		});

		chartInstance.update(0);
	}
}

function positionInChartArea(chartInstance, position) {
	return 	(position.x >= chartInstance.chartArea.left && position.x <= chartInstance.chartArea.right) &&
			(position.y >= chartInstance.chartArea.top && position.y <= chartInstance.chartArea.bottom);
}

// Store these for later
zoomNS.zoomFunctions.category = zoomIndexScale;
zoomNS.zoomFunctions.time = zoomTimeScale;
zoomNS.zoomFunctions.linear = zoomNumericalScale;
zoomNS.zoomFunctions.logarithmic = zoomNumericalScale;
zoomNS.panFunctions.category = panIndexScale;
zoomNS.panFunctions.time = panTimeScale;
zoomNS.panFunctions.linear = panNumericalScale;
zoomNS.panFunctions.logarithmic = panNumericalScale;

// Chartjs Zoom Plugin
var zoomPlugin = {
	beforeInit: function(chartInstance) {
		var node = chartInstance.chart.ctx.canvas;
		var options = chartInstance.options;
		var panThreshold = helpers.getValueOrDefault(options.pan ? options.pan.threshold : undefined, zoomNS.defaults.pan.threshold);

		var wheelHandler = function(e) {
			if (e.deltaY < 0) {
				doZoom(chartInstance, 1.1);
			} else {
				doZoom(chartInstance, 0.909);
			}
		};
		chartInstance._wheelHandler = wheelHandler;

		node.addEventListener('wheel', wheelHandler);

		if (Hammer) {
			var mc = new Hammer.Manager(node);
			mc.add(new Hammer.Pinch());
			mc.add(new Hammer.Pan({
				threshold: panThreshold
			}));

			// Hammer reports the total scaling. We need the incremental amount
			var currentPinchScaling;
			var handlePinch = function handlePinch(e) {
				var diff = 1 / (currentPinchScaling) * e.scale;
				doZoom(chartInstance, diff, e.center);

				// Keep track of overall scale
				currentPinchScaling = e.scale;
			};
			
			mc.on('pinchstart', function(e) {
				currentPinchScaling = 1; // reset tracker
			});
			mc.on('pinch', handlePinch);
			mc.on('pinchend', function(e) {
				handlePinch(e);
				currentPinchScaling = null; // reset
			});

			var currentDeltaX = null, currentDeltaY = null;
			var handlePan = function handlePan(e) {
				if (currentDeltaX !== null && currentDeltaY !== null) {
					var deltaX = e.deltaX - currentDeltaX;
					var deltaY = e.deltaY - currentDeltaY;
					currentDeltaX = e.deltaX;
					currentDeltaY = e.deltaY;

					doPan(chartInstance, deltaX, deltaY);
				}
			};

			mc.on('panstart', function(e) {
				currentDeltaX = 0;
				currentDeltaY = 0;
				handlePan(e);
			});
			mc.on('panmove', handlePan);
			mc.on('panend', function(e) {
				currentDeltaX = null;
				currentDeltaY = null;
			});
			chartInstance._mc = mc;
		}
	},

	beforeDatasetsDraw: function(chartInstance) {
		var ctx = chartInstance.chart.ctx;
		var chartArea = chartInstance.chartArea;
		ctx.save();
		ctx.beginPath();
		ctx.rect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
		ctx.clip();
	},

	afterDatasetsDraw: function(chartInstance) {
		chartInstance.chart.ctx.restore();
	},

	destroy: function(chartInstance) {
		var node = chartInstance.chart.ctx.canvas;

		var mc = chartInstance._mc;
		if (mc) {
			mc.remove('pinchstart');
			mc.remove('pinch');
			mc.remove('pinchend');
			mc.remove('panstart');
			mc.remove('pan');
			mc.remove('panend');
		}
	}
};

Chart.pluginService.register(zoomPlugin);

},{"chart.js":1,"hammerjs":1}]},{},[2]);
