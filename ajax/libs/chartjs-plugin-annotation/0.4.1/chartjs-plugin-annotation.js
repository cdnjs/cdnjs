/*!
 * chartjs-plugin-annotation.js
 * http://chartjs.org/
 * Version: 0.4.1
 *
 * Copyright 2016 Evert Timberg
 * Released under the MIT license
 * https://github.com/chartjs/Chart.Annotation.js/blob/master/LICENSE.md
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
function isValid(num) {
	return !isNaN(num) && isFinite(num);
}

function decorate(obj, prop, func) {
	var prefix = '$';
	if (!obj[prefix + prop]) {
		obj[prefix + prop] = obj[prop].bind(obj);
		obj[prop] = function() {
			return func(obj[prefix + prop]);
		};
	}
}

module.exports = {
	isValid: isValid,
	decorate: decorate
};

},{}],3:[function(require,module,exports){
// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var chartHelpers = Chart.helpers;
var helpers = require('./helpers.js');

// Configure plugin namespace
Chart.Annotation = Chart.Annotation || {};

var DRAW_AFTER = 'afterDraw';
var DRAW_AFTER_DATASETS = 'afterDatasetsDraw';
var DRAW_BEFORE_DATASETS = 'beforeDatasetsDraw';

Chart.Annotation.drawTimeOptions = {
	afterDraw: DRAW_AFTER,
	afterDatasetsDraw: DRAW_AFTER_DATASETS,
	beforeDatasetsDraw: DRAW_BEFORE_DATASETS
};

var annotationTypes =
Chart.Annotation.types = {
	line: require('./types/line.js')(Chart),
	box: require('./types/box.js')(Chart)
};

// Default plugin options
var annotationDefaults =
Chart.Annotation.defaults = {
	drawTime: DRAW_AFTER,
	annotations: []
};

// Default annotation label options
var labelDefaults =
Chart.Annotation.labelDefaults = {
	backgroundColor: 'rgba(0,0,0,0.8)',
	fontFamily: Chart.defaults.global.defaultFontFamily,
	fontSize: Chart.defaults.global.defaultFontSize,
	fontStyle: 'bold',
	fontColor: '#fff',
	xPadding: 6,
	yPadding: 6,
	cornerRadius: 6,
	position: 'center',
	xAdjust: 0,
	yAdjust: 0,
	enabled: false,
	content: null
};

function draw(chartInstance, easingDecimal) {
	if (chartHelpers.isArray(chartInstance.annotations)) {
		chartInstance.annotations.forEach(function(annotation) {
			annotation.transition(easingDecimal)
				.draw(chartInstance.chart.ctx);
		});
	}
}

function initConfig(config) {
	config = chartHelpers.configMerge(annotationDefaults, config);
	if (chartHelpers.isArray(config.annotations)) {
		config.annotations.forEach(function(annotation) {
			annotation.label = chartHelpers.configMerge(labelDefaults, annotation.label);
		});
	}
	return config;
}

function build(configs, chartInstance) {
	return configs
		.filter(function(config) {
			return !!annotationTypes[config.type];
		})
		.map(function(config, i) {
			var annotation = annotationTypes[config.type];
			var annotationObject = new annotation({
				_index: i,
				config: config
			});

			// Set the data range for this annotation
			annotationObject.setRanges(config, chartInstance);

			return annotationObject;
		});
}

function getScaleLimits(scaleId, annotations, scaleMin, scaleMax) {
	var ranges = annotations.filter(function(annotation) {
		return !!annotation._model.ranges[scaleId];
	}).map(function(annotation) {
		return annotation._model.ranges[scaleId];
	});

	var min = ranges.map(function(range) {
		return Number(range.min);
	}).reduce(function(a, b) {
		return isFinite(b) && !isNaN(b) && b < a ? b : a;
	}, scaleMin);

	var max = ranges.map(function(range) {
		return Number(range.max);
	}).reduce(function(a, b) {
		return isFinite(b) && !isNaN(b) && b > a ? b : a;
	}, scaleMax);

	return {
		min: min,
		max: max
	};
}

var annotationPlugin = {
	beforeInit: function(chartInstance) {
		// Decorate Chart.Controller.buildScales() so we can decorate each scale
		// instance's determineDataLimits() method
		helpers.decorate(chartInstance, 'buildScales', function(previous) {
			previous();

			// Decorate Chart.Scale.determineDataLimits() so we can
			// check the annotation values and adjust the scale range
			Object.keys(chartInstance.scales).forEach(function(scaleId) {
				var scale = chartInstance.scales[scaleId];

				helpers.decorate(scale, 'determineDataLimits', function(previous) {
					previous();

					if (chartInstance.annotations) {
						var range = getScaleLimits(scaleId, chartInstance.annotations, scale.min, scale.max);
						scale.min = range.min;
						scale.max = range.max;
					}
				});
			});
		});
	},
	beforeUpdate: function(chartInstance) {
		// Build the configuration with all the defaults set
		var config = chartInstance.options.annotation;
		config = initConfig(config || {});

		if (chartHelpers.isArray(config.annotations)) {
			chartInstance.annotations = build(config.annotations, chartInstance);
			chartInstance.annotations._config = config;
		}
	},
	afterScaleUpdate: function(chartInstance) {
		if (chartHelpers.isArray(chartInstance.annotations)) {
			chartInstance.annotations.forEach(function(annotation) {
				annotation.configure(annotation.config, chartInstance);
			});
		}
	},
	afterDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_AFTER) {
			draw(chartInstance, easingDecimal);
		}
	},
	afterDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_AFTER_DATASETS) {
			draw(chartInstance, easingDecimal);
		}
	},
	beforeDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_BEFORE_DATASETS) {
			draw(chartInstance, easingDecimal);
		}
	}
};

module.exports = annotationPlugin;
Chart.pluginService.register(annotationPlugin);

},{"./helpers.js":2,"./types/box.js":4,"./types/line.js":5,"chart.js":1}],4:[function(require,module,exports){
var helpers = require('../helpers.js');

// Box Annotation implementation
module.exports = function(Chart) {
	var BoxAnnotation = Chart.Element.extend({
		setRanges: function(options, chartInstance) {
			var model = this._model = this._model || {};

			var xScale = chartInstance.scales[options.xScaleID];
			var yScale = chartInstance.scales[options.yScaleID];

			model.ranges = {};

			if (xScale) {
				min = helpers.isValid(options.xMin) ? options.xMin : xScale.getPixelForValue(chartArea.left);
				max = helpers.isValid(options.xMax) ? options.xMax : xScale.getPixelForValue(chartArea.right);

				model.ranges[options.xScaleID] = {
					min: Math.min(min, max),
					max: Math.max(min, max)
				};
			}

			if (yScale) {
				min = helpers.isValid(options.yMin) ? options.yMin : yScale.getPixelForValue(chartArea.bottom);
				max = helpers.isValid(options.yMax) ? options.yMax : yScale.getPixelForValue(chartArea.top);

				model.ranges[options.yScaleID] = {
					min: Math.min(min, max),
					max: Math.max(min, max)
				};
			}
		},
		configure: function(options, chartInstance) {
			var model = this._model = this._model || {};

			var xScale = chartInstance.scales[options.xScaleID];
			var yScale = chartInstance.scales[options.yScaleID];
			var chartArea = chartInstance.chartArea;

			// clip annotations to the chart area
			model.clip = {
				x1: chartArea.left,
				x2: chartArea.right,
				y1: chartArea.top,
				y2: chartArea.bottom
			};

			var left = chartArea.left, 
				top = chartArea.top, 
				right = chartArea.right, 
				bottom = chartArea.bottom;

			var min, max;

			if (xScale) {
				min = helpers.isValid(options.xMin) ? xScale.getPixelForValue(options.xMin) : chartArea.left;
				max = helpers.isValid(options.xMax) ? xScale.getPixelForValue(options.xMax) : chartArea.right;
				left = Math.min(min, max);
				right = Math.max(min, max);
			}

			if (yScale) {
				min = helpers.isValid(options.yMin) ? yScale.getPixelForValue(options.yMin) : chartArea.bottom;
				max = helpers.isValid(options.yMax) ? yScale.getPixelForValue(options.yMax) : chartArea.top;
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
		},
		draw: function(ctx) {
			var view = this._view;

			// Canvas setup
			ctx.save();
			ctx.beginPath();
			ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
			ctx.clip();

			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;
			ctx.fillStyle = view.backgroundColor;

			// Draw
			var width = view.right - view.left,
				height = view.bottom - view.top;
			ctx.fillRect(view.left, view.top, width, height);
			ctx.strokeRect(view.left, view.top, width, height);
		}
	});

	return BoxAnnotation;
};

},{"../helpers.js":2}],5:[function(require,module,exports){
// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var chartHelpers = Chart.helpers;
var helpers = require('../helpers.js');

// Line Annotation implementation
module.exports = function(Chart) {
	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	var LineAnnotation = Chart.Element.extend({
		setRanges: function(options) {
			var model = this._model = chartHelpers.clone(this._model) || {};

			model.ranges = {};
			model.ranges[options.scaleID] = {
				min: options.value,
				max: options.endValue || options.value
			};
		},
		configure: function(options, chartInstance) {
			var model = this._model = chartHelpers.clone(this._model) || {};

			var scale = chartInstance.scales[options.scaleID];
			var pixel, endPixel;
			if (scale) {
				pixel = helpers.isValid(options.value) ? scale.getPixelForValue(options.value) : NaN;
				endPixel = helpers.isValid(options.endValue) ? scale.getPixelForValue(options.endValue) : pixel;
			}

			var chartArea = chartInstance.chartArea;
			var ctx = chartInstance.chart.ctx;

			// clip annotations to the chart area
			model.clip = {
				x1: chartArea.left,
				x2: chartArea.right,
				y1: chartArea.top,
				y2: chartArea.bottom
			};

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

			model.mode = options.mode;

			// Figure out the label:
			model.labelBackgroundColor = options.label.backgroundColor;
			model.labelFontFamily = options.label.fontFamily;
			model.labelFontSize = options.label.fontSize;
			model.labelFontStyle = options.label.fontStyle;
			model.labelFontColor = options.label.fontColor;
			model.labelXPadding = options.label.xPadding;
			model.labelYPadding = options.label.yPadding;
			model.labelCornerRadius = options.label.cornerRadius;
			model.labelPosition = options.label.position;
			model.labelXAdjust = options.label.xAdjust;
			model.labelYAdjust = options.label.yAdjust;
			model.labelEnabled = options.label.enabled;
			model.labelContent = options.label.content;

			ctx.font = chartHelpers.fontString(model.labelFontSize, model.labelFontStyle, model.labelFontFamily);
			var textWidth = ctx.measureText(model.labelContent).width;
			var textHeight = ctx.measureText('M').width;
			var labelPosition = calculateLabelPosition(model, textWidth, textHeight, model.labelXPadding, model.labelYPadding);
			model.labelX = labelPosition.x - model.labelXPadding;
			model.labelY = labelPosition.y - model.labelYPadding;
			model.labelWidth = textWidth + (2 * model.labelXPadding);
			model.labelHeight = textHeight + (2 * model.labelYPadding);

			model.borderColor = options.borderColor;
			model.borderWidth = options.borderWidth;
			model.borderDash = options.borderDash || [];
			model.borderDashOffset = options.borderDashOffset || 0;
		},
		draw: function(ctx) {
			var view = this._view;

			// Canvas setup
			ctx.save();
			ctx.beginPath();
			ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
			ctx.clip();

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

			if (view.labelEnabled && view.labelContent) {
				ctx.beginPath();
				ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
				ctx.clip();

				ctx.fillStyle = view.labelBackgroundColor;
				// Draw the tooltip
				chartHelpers.drawRoundedRectangle(
					ctx,
					view.labelX, // x
					view.labelY, // y
					view.labelWidth, // width
					view.labelHeight, // height
					view.labelCornerRadius // radius
				);
				ctx.fill();

				// Draw the text
				ctx.font = chartHelpers.fontString(
					view.labelFontSize,
					view.labelFontStyle,
					view.labelFontFamily
				);
				ctx.fillStyle = view.labelFontColor;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(
					view.labelContent,
					view.labelX + (view.labelWidth / 2),
					view.labelY + (view.labelHeight / 2)
				);
			}
		}
	});

	function calculateLabelPosition(view, width, height, padWidth, padHeight) {
		// Describe the line in slope-intercept form (y = mx + b).
		// Note that the axes are rotated 90° CCW, which causes the
		// x- and y-axes to be swapped.
		var m = (view.x2 - view.x1) / (view.y2 - view.y1);
		var b = view.x1 || 0;

		var fy = function(y) {
			// Coordinates are relative to the origin of the canvas
			return m * (y - view.y1) + b;
		};
		var fx = function(x) {
			return ((x - b) / m) + view.y1;
		};

		var ret = {}, xa = 0, ya = 0;

		switch (true) {
			// top align
			case view.mode == verticalKeyword && view.labelPosition == "top":
				ya = padHeight + view.labelYAdjust;
				xa = (width / 2) + view.labelXAdjust;
				ret.y = view.y1 + ya;
				ret.x = (isFinite(m) ? fy(ret.y) : view.x1) - xa;
			break;
			
			// bottom align
			case view.mode == verticalKeyword && view.labelPosition == "bottom":
				ya = height + padHeight + view.labelYAdjust;
				xa = (width / 2) + view.labelXAdjust;
				ret.y = view.y2 - ya;
				ret.x = (isFinite(m) ? fy(ret.y) : view.x1) - xa;
			break;
			
			// left align
			case view.mode == horizontalKeyword && view.labelPosition == "left":
				xa = padWidth + view.labelXAdjust;
				ya = -(height / 2) + view.labelYAdjust;
				ret.x = view.x1 + xa;
				ret.y = fx(ret.x) + ya;
			break;
			
			// right align
			case view.mode == horizontalKeyword && view.labelPosition == "right":
				xa = width + padWidth + view.labelXAdjust;
				ya = -(height / 2) + view.labelYAdjust;
				ret.x = view.x2 - xa;
				ret.y = fx(ret.x) + ya;
			break;

			// center align
			default:
				ret.x = ((view.x1 + view.x2 - width) / 2) + view.labelXAdjust;
				ret.y = ((view.y1 + view.y2 - height) / 2) + view.labelYAdjust;
		}

		return ret;
	}

	return LineAnnotation;
};

},{"../helpers.js":2,"chart.js":1}]},{},[3]);
