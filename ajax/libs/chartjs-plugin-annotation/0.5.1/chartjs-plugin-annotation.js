/*!
 * chartjs-plugin-annotation.js
 * http://chartjs.org/
 * Version: 0.5.1
 *
 * Copyright 2016 Evert Timberg
 * Released under the MIT license
 * https://github.com/chartjs/Chart.Annotation.js/blob/master/LICENSE.md
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
module.exports = function(Chart) {
	var AnnotationElement = Chart.Element.extend({
		initialize: function() {
			this.hidden = false;
			this.setDataLimits();
		},
		destroy: function() {},
		setDataLimits: function() {},
		configure: function() {},
		inRange: function() {},
		getCenterPoint: function() {},
		getWidth: function() {},
		getHeight: function() {},
		getArea: function() {},
		draw: function() {}
	});

	return AnnotationElement;
};

},{}],3:[function(require,module,exports){
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var chartHelpers = Chart.helpers;

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

function getEventHandlerName(eventName) {
	return 'on' + eventName[0].toUpperCase() + eventName.substring(1);
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

function getNearestItems(annotations, position) {
	var minDistance = Number.POSITIVE_INFINITY;

	return annotations
		.filter(function(element) {
			return element.inRange(position.x, position.y);
		})
		.reduce(function(nearestItems, element) {
			var center = element.getCenterPoint();
			var distance = chartHelpers.distanceBetweenPoints(position, center);

			if (distance < minDistance) {
				nearestItems = [element];
				minDistance = distance;
			} else if (distance === minDistance) {
				// Can have multiple items at the same distance in which case we sort by size
				nearestItems.push(element);
			}

			return nearestItems;
		}, [])
		.sort(function(a, b) {
			// If there are multiple elements equally close,
			// sort them by size, then by index
			var sizeA = a.getArea(), sizeB = b.getArea();
			return (sizeA > sizeB || sizeA < sizeB) ? sizeA - sizeB : a._index - b._index;
		})
		.slice(0, 1)[0]; // return only the top item
}

module.exports = {
	isValid: isValid,
	decorate: decorate,
	getEventHandlerName: getEventHandlerName,
	getScaleLimits: getScaleLimits,
	getNearestItems: getNearestItems
};

},{"chart.js":1}],4:[function(require,module,exports){
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

Chart.Annotation.Element = require('./element.js')(Chart);

var annotationTypes =
Chart.Annotation.types = {
	line: require('./types/line.js')(Chart),
	box: require('./types/box.js')(Chart)
};

// Default plugin options
var annotationDefaults =
Chart.Annotation.defaults = {
	drawTime: DRAW_AFTER,
	events: [],
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
			annotation.transition(easingDecimal).draw();
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
				options: config,
				chartInstance: chartInstance,
				ctx: chartInstance.chart.ctx
			});
			annotationObject.initialize();
			return annotationObject;
		});
}

function eventDispatcher(e) {
	var position = chartHelpers.getRelativePosition(e, this.chart);
	var element = helpers.getNearestItems(this.annotations, position);
	var eventHandlerName = helpers.getEventHandlerName(e.type);
	var options = (element || {}).options;
	if (element && options[eventHandlerName]) {
		e.stopImmediatePropagation();
		e.preventDefault();
		options[eventHandlerName].call(element, e);
	}
}

var annotationPlugin = {
	beforeInit: function(chartInstance) {
		chartInstance.annotations = [];

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
						var range = helpers.getScaleLimits(scaleId, chartInstance.annotations, scale.min, scale.max);
						if (typeof scale.options.ticks.min === 'undefined' && typeof scale.options.ticks.suggestedMin === 'undefined') {
							scale.min = range.min;
						}
						if (typeof scale.options.ticks.max === 'undefined' && typeof scale.options.ticks.suggestedMax === 'undefined') {
							scale.max = range.max;
						}
					}
				});
			});
		});

		// Detect and intercept events that happen on an annotation element
		var config = chartInstance.options.annotation || {};
		if (config.events) {
			chartInstance._annotationEventHandler = eventDispatcher.bind(chartInstance);
			config.events.forEach(function(eventName) {
				chartHelpers.addEvent(chartInstance.chart.canvas, eventName, chartInstance._annotationEventHandler);
			});
		}
	},
	destroy: function(chartInstance) {
		var config = chartInstance.annotations._config;
		if (config.events.length > 0) {
			config.events.forEach(function(eventName) {
				chartHelpers.removeEvent(chartInstance.chart.canvas, eventName, chartInstance._annotationEventHandler);
			});
		}
	},
	beforeUpdate: function(chartInstance) {
		// Build the configuration with all the defaults set
		var config = chartInstance.options.annotation;
		config = initConfig(config || {});

		if (chartHelpers.isArray(config.annotations)) {
			chartInstance.annotations.forEach(function(annotation) {
				annotation.destroy(chartInstance);
			});
			chartInstance.annotations = build(config.annotations, chartInstance);
			chartInstance.annotations._config = config;
		}
	},
	afterScaleUpdate: function(chartInstance) {
		if (chartHelpers.isArray(chartInstance.annotations)) {
			chartInstance.annotations.forEach(function(annotation) {
				annotation.configure();
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

},{"./element.js":2,"./helpers.js":3,"./types/box.js":5,"./types/line.js":6,"chart.js":1}],5:[function(require,module,exports){
var helpers = require('../helpers.js');

// Box Annotation implementation
module.exports = function(Chart) {
	var BoxAnnotation = Chart.Annotation.Element.extend({
		setDataLimits: function() {
			var model = this._model = this._model || {};
			var options = this.options;
			var chartInstance = this.chartInstance;

			var xScale = chartInstance.scales[options.xScaleID];
			var yScale = chartInstance.scales[options.yScaleID];
			var chartArea = chartInstance.chartArea;

			// Set the data range for this annotation
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
		configure: function() {
			var model = this._model = this._model || {};
			var options = this.options;
			var chartInstance = this.chartInstance;

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
		inRange: function(mouseX, mouseY) {
			return this._view &&
				mouseX >= this._view.left && 
				mouseX <= this._view.right && 
				mouseY >= this._view.top && 
				mouseY <= this._view.bottom;
		},
		getCenterPoint: function() {
			return {
				x: (this._view.right + this._view.left) / 2,
				y: (this._view.bottom + this._view.top) / 2
			};
		},
		getWidth: function() {
			return Math.abs(this._view.right - this._view.left);
		},
		getHeight: function() {
			return Math.abs(this._view.bottom - this._view.top);
		},
		getArea: function() {
			return this.getWidth() * this.getHeight();
		},
		draw: function() {
			var view = this._view;
			var ctx = this.ctx;

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

},{"../helpers.js":3}],6:[function(require,module,exports){
// Get the chart variable
var helpers = require('../helpers.js');

// Line Annotation implementation
module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;

	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	var LineAnnotation = Chart.Annotation.Element.extend({
		setDataLimits: function() {
			var model = this._model = chartHelpers.clone(this._model) || {};
			var options = this.options;

			// Set the data range for this annotation
			model.ranges = {};
			model.ranges[options.scaleID] = {
				min: options.value,
				max: options.endValue || options.value
			};
		},
		configure: function() {
			var model = this._model = chartHelpers.clone(this._model) || {};
			var options = this.options;
			var chartInstance = this.chartInstance;
			var ctx = this.ctx;

			var scale = chartInstance.scales[options.scaleID];
			var pixel, endPixel;
			if (scale) {
				pixel = helpers.isValid(options.value) ? scale.getPixelForValue(options.value) : NaN;
				endPixel = helpers.isValid(options.endValue) ? scale.getPixelForValue(options.endValue) : pixel;
			}

			if (isNaN(pixel)) {
				return;
			}

			var chartArea = chartInstance.chartArea;

			// clip annotations to the chart area
			model.clip = {
				x1: chartArea.left,
				x2: chartArea.right,
				y1: chartArea.top,
				y2: chartArea.bottom
			};

			if (this.options.mode == horizontalKeyword) {
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

			model.line = new LineFunction(model);
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
		inRange: function(mouseX, mouseY) {
			var model = this._model || {};
			return (model.line && model.line.intersects(mouseX, mouseY, this.getHeight()));
		},
		getCenterPoint: function() {
			return {
				x: (this._view.x2 + this._view.x1) / 2,
				y: (this._view.y2 + this._view.y1) / 2
			};
		},
		getWidth: function() {
			return Math.abs(this._view.right - this._view.left);
		},
		getHeight: function() {
			return this._view.borderWidth || 1;
		},
		getArea: function() {
			return Math.sqrt(Math.pow(this.getWidth(), 2) + Math.pow(this.getHeight(), 2));
		},
		draw: function() {
			var view = this._view;
			var ctx = this.ctx;
			
			if (!view.clip) {
				return;
			}

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

	function LineFunction(view) {
		// Describe the line in slope-intercept form (y = mx + b).
		// Note that the axes are rotated 90° CCW, which causes the
		// x- and y-axes to be swapped.
		var m = (view.x2 - view.x1) / (view.y2 - view.y1);
		var b = view.x1 || 0;

		this.m = m;
		this.b = b;

		this.getX = function(y) {
			// Coordinates are relative to the origin of the canvas
			return m * (y - view.y1) + b;
		};

		this.getY = function(x) {
			return ((x - b) / m) + view.y1;
		};

		this.intersects = function(x, y, epsilon) {
			epsilon = epsilon || 0.001;
			var dy = this.getY(x),
				dx = this.getX(y);
			return (
				(!isFinite(dy) || Math.abs(y - dy) < epsilon) && 
				(!isFinite(dx) || Math.abs(x - dx) < epsilon)
			);
		};
	}

	function calculateLabelPosition(view, width, height, padWidth, padHeight) {
		var line = view.line;
		var ret = {}, xa = 0, ya = 0;

		switch (true) {
			// top align
			case view.mode == verticalKeyword && view.labelPosition == "top":
				ya = padHeight + view.labelYAdjust;
				xa = (width / 2) + view.labelXAdjust;
				ret.y = view.y1 + ya;
				ret.x = (isFinite(line.m) ? line.getY(ret.y) : view.x1) - xa;
			break;
			
			// bottom align
			case view.mode == verticalKeyword && view.labelPosition == "bottom":
				ya = height + padHeight + view.labelYAdjust;
				xa = (width / 2) + view.labelXAdjust;
				ret.y = view.y2 - ya;
				ret.x = (isFinite(line.m) ? line.getX(ret.y) : view.x1) - xa;
			break;
			
			// left align
			case view.mode == horizontalKeyword && view.labelPosition == "left":
				xa = padWidth + view.labelXAdjust;
				ya = -(height / 2) + view.labelYAdjust;
				ret.x = view.x1 + xa;
				ret.y = line.getY(ret.x) + ya;
			break;
			
			// right align
			case view.mode == horizontalKeyword && view.labelPosition == "right":
				xa = width + padWidth + view.labelXAdjust;
				ya = -(height / 2) + view.labelYAdjust;
				ret.x = view.x2 - xa;
				ret.y = line.getY(ret.x) + ya;
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

},{"../helpers.js":3}]},{},[4]);
