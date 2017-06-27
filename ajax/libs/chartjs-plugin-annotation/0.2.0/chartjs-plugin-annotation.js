/*!
 * chartjs-plugin-annotation.js
 * http://chartjs.org/
 * Version: 0.2.0
 *
 * Copyright 2016 Evert Timberg
 * Released under the MIT license
 * https://github.com/chartjs/Chart.Annotation.js/blob/master/LICENSE.md
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// Box Annotation implementation
module.exports = function(Chart) {
	var BoxAnnotation = Chart.Element.extend({
		draw: function(ctx) {
			var view = this._view;

			// Canvas setup
			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;
			ctx.fillStyle = view.backgroundColor;

			// Draw
			var width = view.right - view.left,
				height = view.bottom - view.top;
			ctx.fillRect(view.left, view.top, width, height);
			ctx.strokeRect(view.left, view.top, width, height)
		}
	});

	function isValid(num) {
		return !isNaN(num) && isFinite(num);
	}

	// Function that updates a box annotation
	function boxUpdate(obj, options, chartInstance) {
		var model = obj._model = obj._model || {};

		var xScale = chartInstance.scales[options.xScaleID];
		var yScale = chartInstance.scales[options.yScaleID];
		var chartArea = chartInstance.chartArea;

		var left = chartArea.left, 
			top = chartArea.top, 
			right = chartArea.right, 
			bottom = chartArea.bottom;

		var min,max;

		if (xScale) {
			min = isValid(options.xMin) ? xScale.getPixelForValue(options.xMin) : chartArea.left;
			max = isValid(options.xMax) ? xScale.getPixelForValue(options.xMax) : chartArea.right;
			left = Math.min(min, max);
			right = Math.max(min, max);
		}

		if (yScale) {
			min = isValid(options.yMin) ? yScale.getPixelForValue(options.yMin) : chartArea.bottom;
			max = isValid(options.yMax) ? yScale.getPixelForValue(options.yMax) : chartArea.top;
			top = Math.min(min, max);
			bottom = Math.max(min, max);
		}

		// Ensure model has rect coordinates
		model.left = left;
		model.top = top;
		model.right = right;
		model.bottom = bottom;

		// Stylistic options
		model.borderColor = options.borderColor;
		model.borderWidth = options.borderWidth;
		model.backgroundColor = options.backgroundColor;
	}


	return {
		Constructor: BoxAnnotation,
		update: boxUpdate
	};
}

},{}],3:[function(require,module,exports){
// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;
var isArray = helpers.isArray;

// Take the zoom namespace of Chart
Chart.Annotation = Chart.Annotation || {};

// Default options if none are provided
var defaultOptions = Chart.Annotation.defaults = {
	drawTime: "afterDraw", // defaults to drawing after draw
	annotations: [] // default to no annotations
};

var lineAnnotation = require('./line.js')(Chart);
var boxAnnotation = require('./box.js')(Chart);

// Map of all types
var annotationTypes = Chart.Annotation.annotationTypes = {
	line: lineAnnotation.Constructor,
	box: boxAnnotation.Constructor
};

// Map of all update functions
var updateFunctions = Chart.Annotation.updateFunctions = {
	line: lineAnnotation.update,
	box: boxAnnotation.update
};

var drawTimeOptions = Chart.Annotation.drawTimeOptions = {
	afterDraw: "afterDraw",
	afterDatasetsDraw: "afterDatasetsDraw",
	beforeDatasetsDraw: "beforeDatasetsDraw",
};

function drawAnnotations(drawTime, chartInstance, easingDecimal) {
	var annotationOpts = chartInstance.options.annotation;
	if (annotationOpts.drawTime != drawTime) {
		return;
	}
	// If we have annotations, draw them
	var annotationObjects = chartInstance._annotationObjects;
	if (isArray(annotationObjects)) {
		var ctx = chartInstance.chart.ctx;

		annotationObjects.forEach(function(obj) {
			obj.transition(easingDecimal).draw(ctx);
		});
	}
}

// Chartjs Zoom Plugin
var annotationPlugin = {
	beforeInit: function(chartInstance) {
		var options = chartInstance.options;
		options.annotation = helpers.configMerge(Chart.Annotation.defaults, options.annotation);

		var annotationConfigs = options.annotation.annotations;
		if (isArray(annotationConfigs)) {
			var annotationObjects = chartInstance._annotationObjects = [];

			annotationConfigs.forEach(function(configuration, i) {
				var Constructor = annotationTypes[configuration.type];
				if (Constructor) {
					annotationObjects.push(new Constructor({
						_index: i
					}));
				}
			});
		}
	},
	afterScaleUpdate: function(chartInstance) {
		// Once scales are ready, update
		var annotationObjects = chartInstance._annotationObjects;
		var annotationOpts = chartInstance.options.annotation;

		if (isArray(annotationObjects)) {
			annotationObjects.forEach(function(annotationObject, i) {
				var opts = annotationOpts.annotations[annotationObject._index];
				var updateFunction = updateFunctions[opts.type];

				if (updateFunction) {
					updateFunction(annotationObject, opts, chartInstance);
				}
			});
		}
	},

	afterDraw: function(chartInstance, easingDecimal) {
		drawAnnotations(
			Chart.Annotation.drawTimeOptions.afterDraw,
			chartInstance,
			easingDecimal
		);
	},
	afterDatasetsDraw: function(chartInstance, easingDecimal) {
		drawAnnotations(
			Chart.Annotation.drawTimeOptions.afterDatasetsDraw,
			chartInstance,
			easingDecimal
		);
	},
	beforeDatasetsDraw: function(chartInstance, easingDecimal) {
		drawAnnotations(
			Chart.Annotation.drawTimeOptions.beforeDatasetsDraw,
			chartInstance,
			easingDecimal
		);
	}
};

module.exports = annotationPlugin;
Chart.pluginService.register(annotationPlugin);

},{"./box.js":2,"./line.js":4,"chart.js":1}],4:[function(require,module,exports){
// Line Annotation implementation
module.exports = function(Chart) {
	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	var LineAnnotation = Chart.Element.extend({

		draw: function(ctx) {
			var view = this._view;

			// Canvas setup
			ctx.save();
			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;

			if (ctx.setLineDash) {
				ctx.setLineDash(view.borderDash);
			}
			ctx.lineDashOffset = view.borderDashOffset;

			// Draw
			ctx.beginPath();
			ctx.moveTo(view.x1, view.y1);
			ctx.lineTo(view.x2, view.y2);
			ctx.stroke();
			ctx.restore();
		}
	});

	function isValid(num) {
		return !isNaN(num) && isFinite(num);
	}

	function lineUpdate(obj, options, chartInstance) {
		var model = obj._model = obj._model || {};

		var scale = chartInstance.scales[options.scaleID];
		var pixel = scale ? scale.getPixelForValue(options.value) : NaN;
		var endPixel = scale && isValid(options.endValue) ? scale.getPixelForValue(options.endValue) : NaN;
		if (isNaN(endPixel))
		    endPixel = pixel;
		var chartArea = chartInstance.chartArea;

		if (!isNaN(pixel)) {
			if (options.mode == horizontalKeyword) {
				model.x1 = chartArea.left;
				model.x2 = chartArea.right;
				model.y1 = pixel;
				model.y2 = endPixel;
			} else {
				model.y1 = chartArea.top;
				model.y2 = chartArea.bottom;
				model.x1 = pixel;
				model.x2 = endPixel;
			}
		}

		model.borderColor = options.borderColor;
		model.borderWidth = options.borderWidth;
		model.borderDash = options.borderDash || [];
		model.borderDashOffset = options.borderDashOffset || 0;
	}


	return {
		Constructor: LineAnnotation,
		update: lineUpdate
	};
};

},{}]},{},[3]);
